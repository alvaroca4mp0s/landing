# Analítica orientada a decisiones

Herramienta: **Plausible** (sin cookies, script `script.tagged-events.js` cargado en `app/layout.tsx`, `data-domain=redlocal.cl`). Wrapper: `lib/analytics.ts` (`track(event, props)`), que nunca rompe la experiencia si el script no cargó.

**No se recopila texto libre ni PII** como propiedad de evento. Solo categorías acotadas (canal, ubicación, slug, paso, status).

## Plan de medición

| Evento | Propósito | Propiedades | Criterio de éxito | Hipótesis |
|---|---|---|---|---|
| `hero_cta_clicked` | ¿El CTA principal atrae? | — | CTR hero saludable | El hero comunica valor en <5 s |
| `form_started` | Entrada al embudo | — | Ratio visita→inicio | El formulario baja la fricción de iniciar |
| `form_step_completed` | Dónde se cae el embudo | `step` | Retención por paso | Las 6 preguntas no cansan |
| `contact_channel_selected` | Qué canal prefieren | `channel` | Distribución de canal | WhatsApp/Telegram dominan |
| `form_submitted` | **Conversión principal** | `channel`, `location` | Tasa de conversión | El caso se describe sin tecnicismos |
| `form_error` | Fricción/errores | `status` | Errores < umbral | Validación clara |
| `article_viewed` / `article_cta_clicked` | ¿El contenido convierte? | `slug` | CTR artículo→contacto | El contenido genera confianza |
| `case_viewed` / `tool_viewed` | Interés en evidencia | `slug` | Vistas de casos/tools | La evidencia importa |
| `tool_cta_clicked` | Demanda de implementación | — | CTR ficha→contacto | "instalar no es operar" resuena |
| `email_copied` / `outbound_whatsapp` / `outbound_crm` | Conversiones secundarias | — | Volumen | Canales alternativos de contacto |

Los CTA con clase `plausible-event-name=<evento>` disparan el evento vía tagged-events; los eventos con propiedades se disparan con `track()` desde componentes cliente (formulario, trackers de artículo).

## Jerarquía de conversión

1. **Principal**: `form_submitted`.
2. **Secundarias**: `case_viewed`, `tool_viewed`, `article_viewed`, `email_copied`, `outbound_whatsapp`, `outbound_crm`.

Una sola acción dominante por vista. Ver `docs/STRATEGY.md §6`.
