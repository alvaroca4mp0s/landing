# Integración con Twenty CRM

El formulario comercial ("Cuéntanos qué debería avisarte") crea o actualiza registros en la instancia autohospedada de Twenty CRM (`crm.redlocal.cl`). Este documento describe el diseño, la configuración, el modelo de datos y la contingencia.

## Principio de seguridad

- **El token vive solo en el servidor** (`TWENTY_API_KEY`). Nunca se expone al navegador.
- El navegador envía el caso a `POST /api/lead` (route handler Node). Ese handler valida, sanea y recién ahí habla con Twenty.
- Si el CRM no está configurado o no responde, el lead se **persiste en disco** (`data/leads/*.json`) y el usuario recibe confirmación igual. **Nunca se pierde un lead por una caída del CRM.**

## Flujo

```
navegador ──POST /api/lead──> route handler (Node)
                                 │ 1. rate limit por IP
                                 │ 2. Zod: valida + honeypot
                                 │ 3. arma el Lead
                                 ├─ isConfigured() ─► Twenty REST API
                                 │                      person → opportunity → note
                                 └─ si falla/no config ─► persistLead() en disco
                                 4. responde { ok, id }
```

Código: `app/api/lead/route.ts`, `lib/crm/twenty.ts`, `lib/crm/store.ts`, `lib/leads.ts`.

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `TWENTY_API_URL` | Base REST de Twenty | `https://crm.redlocal.cl/rest` |
| `TWENTY_API_KEY` | API key (Bearer). Si falta, se usa el fallback a disco. | — |
| `LEADS_DIR` | Carpeta del fallback | `./data/leads` |

Obtén la API key en Twenty: **Settings → API & Webhooks → generar API key**. Guárdala en el entorno del servidor (systemd `Environment=` o `.env` no versionado), nunca en el repo.

## Modelo de datos

Con cada envío, el adaptador (`upsertLead`) hace:

1. **Persona** — busca por `emails.primaryEmail` (deduplicación). Si no existe, la crea con `name` (nombre/apellido), `emails`, `phones` (si hay), `jobTitle` (empresa, si hay).
2. **Oportunidad** — crea una con nombre `Detectar: <evento…>`, `stage: NEW`, `pointOfContactId` = persona.
3. **Nota** — adjunta el caso completo (resumen legible) vinculado a persona y oportunidad.

El **caso completo** (qué detectar, dónde, quién, impacto, canal, urgencia, origen, campaña, consentimiento) viaja en la nota y en el nombre de la oportunidad, de modo que la integración **funciona aunque no existan campos personalizados**.

### Campos personalizados (opcional, recomendado)

Para explotar los datos en Twenty, crea estos campos personalizados en la entidad **Opportunity** y extiende `createOpportunity` en `lib/crm/twenty.ts`:

| Campo | Tipo | Origen |
|---|---|---|
| `eventType` / `sourceType` | Texto | `location` + `locationDetail` |
| `channel` | Select | `channel` |
| `urgency` | Select | `urgency` |
| `impact` | Texto largo | `impact` |
| `origin` | Texto | `sourcePage` |
| `campaign` | Texto | `campaign` |
| `consent` | Booleano | `consent` |

> El mapeo exacto de nombres/estructura puede variar según la versión de Twenty. El adaptador está aislado para ajustarlo en un solo lugar.

## Deduplicación

Por `email` (normalizado a minúsculas en el schema). Si la persona existe, se reutiliza y se le asocia una nueva oportunidad + nota. No se duplican personas.

## Contingencia (fallback)

Si `TWENTY_API_KEY` no está o Twenty responde error/timeout (6 s):

- El lead se guarda como JSON en `LEADS_DIR` (`YYYY-MM-DD_<uuid>.json`).
- El usuario ve `/gracias` con normalidad.

`LEADS_DIR` está en `.gitignore` y debe quedar **fuera del webroot**.

### Reproceso de la cola (fallback → Twenty)

Una vez restaurado el CRM, empuja los leads acumulados con el mismo código que usa el formulario:

```bash
# Ver qué se enviaría, sin tocar nada:
TWENTY_API_KEY=xxxx npm run reprocess-leads -- --dry-run

# Enviar de verdad:
TWENTY_API_KEY=xxxx npm run reprocess-leads
```

- Cada lead exitoso se **mueve** a `data/leads/processed/` (no se borra), evitando duplicados en una segunda pasada.
- Los que fallan se quedan en cola para reintentar; el script sale con código ≠ 0 si hubo fallos.
- Reutiliza `lib/crm/twenty-core.ts` (mismas llamadas REST que el formulario). El adaptador `lib/crm/twenty.ts` es el único que lee el token del entorno y lleva `server-only`; el núcleo recibe las credenciales por parámetro para poder correr también fuera de Next.

## Pruebas

- `lib/leads.test.ts` — validación del schema, honeypot, normalización, resumen.
- Prueba manual del endpoint:

```bash
curl -X POST localhost:3000/api/lead -H "Content-Type: application/json" -d '{
  "eventDescription":"Quiero saber cuando una bomba deja de entregar presión",
  "location":"Un sensor","audience":"el operador","impact":"se detiene la línea",
  "channel":"Telegram","name":"Prueba","email":"prueba@ejemplo.cl","consent":true}'
# → {"ok":true,"id":"..."}  (con CRM: crea en Twenty; sin CRM: escribe en data/leads/)
```

## Qué falta para producción con CRM real

- Configurar `TWENTY_API_KEY` en el servidor.
- Verificar el mapeo de campos contra la versión desplegada de Twenty (nombres exactos de `stage`, estructura de `note`).
- (Opcional) crear los campos personalizados y extender el adaptador en `lib/crm/twenty-core.ts`.

Script de reproceso del fallback: **implementado** (`npm run reprocess-leads`, ver arriba).
