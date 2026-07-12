# Seguridad y privacidad

## Formulario / API del lead (`app/api/lead/route.ts`)

- **Validación en servidor** con Zod (`lib/leads.ts`). No se confía en nada del cliente.
- **Honeypot silencioso**: campo `website` oculto; si viene lleno, se responde `200` falso sin procesar (no se le da pista al bot).
- **Rate limiting** por IP (`lib/rate-limit.ts`): 5 req/min. Best-effort en memoria; para multi-instancia, mover a Redis/KV.
- **Sanitización de longitudes** y tipos en el schema (máximos por campo).
- **Secretos solo en servidor**: `TWENTY_API_KEY` nunca llega al bundle cliente (`server-only` en `lib/crm/*`).
- **Logging sin PII**: solo se registran motivos técnicos e IDs/digests, nunca el texto del caso ni datos de contacto.
- **Fallback seguro**: si el CRM cae, el lead se guarda en `data/leads/` (fuera del webroot, en `.gitignore`).

## Headers (`next.config.ts`)

`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo deshabilitados), `Strict-Transport-Security` (HSTS). `poweredByHeader: false`.

### Content Security Policy

Pendiente de endurecer (deuda, ver LOOP_REPORT). Consideraciones: Plausible (`plausible.io`) como `script-src`/`connect-src`; fuentes autohospedadas (no requieren host externo). Como el sitio no usa scripts inline críticos salvo el JSON-LD (`dangerouslySetInnerHTML` con contenido propio, no de usuario), una CSP con `script-src 'self' plausible.io` es viable en una iteración siguiente.

## Enlaces externos

Todos con `rel="noopener noreferrer"` y `target="_blank"` cuando corresponde (footer, fichas open source, markdown externo).

## Dependencias

Mínimas y justificadas (ver `DECISIONS.md`). `npm audit` reporta 2 vulnerabilidades moderadas transitivas de tooling (no en runtime de producción); revisar en mantenimiento. Sin dependencias de tracking invasivo.

## Privacidad

- Analítica **sin cookies** (Plausible): sin banner necesario, sin perfiles.
- **Minimización de datos**: el formulario pide lo mínimo; empresa y teléfono son opcionales.
- **Consentimiento explícito** en el paso final, enlazado a `/privacidad`.
- Sin marketing automático ni cesión a terceros (declarado en `/privacidad`).
- El borrador del formulario se guarda en `localStorage` **sin** datos de contacto (solo pasos 1–5).
