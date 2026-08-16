# Auditoría SEO — redlocal.cl

Registro interno de la auditoría SEO del sitio y de las correcciones aplicadas.
**No es una página pública** del sitio: `robots.txt` bloquea `/docs/` y no está
enlazada ni en el sitemap. La versión visual privada vive como Artifact en claude.ai.

## Estado

| | SEO Health |
|---|---|
| Baseline (auditoría inicial) | **70 / 100** |
| Actual (tras correcciones) | **83 / 100** |

## Qué se corrigió

- **Técnico:** `404.html` (fin del soft-404), `/privacidad` extensionless con canonical/sitemap/enlaces alineados y 301 de la URL vieja, keyword en el `<title>` de la home, `llms.txt` real.
- **Contenido / E-E-A-T:** página `/nosotros/` (con la tesis NOISE ↔ *Attention Is All You Need* y `AboutPage` JSON-LD), y el par legal completo `/terminos/` + `/privacidad/` (17 secciones, Ley 19.628), consistentes y enlazados. Identificación legal real: RedLocal SpA, RUT 78.388.986-2.
- **Privacidad / performance:** se eliminó Plausible por completo y se activó **Cloudflare Web Analytics** (sin cookies, sin banner de consentimiento).

## Pendiente (necesita insumos reales, no se fabrica)

- `Organization.sameAs` — cuando existan perfiles sociales oficiales.
- `WebSite.potentialAction` (SearchAction) — cuando exista un buscador on-site.
- Verificar Core Web Vitals de campo conectando GSC + PageSpeed/CrUX (falta API key).

## Archivos

- [`report.html`](./report.html) — informe visual (estado actual, 83/100).
- [`baseline/`](./baseline/) — auditoría inicial sin editar (70/100): reporte completo, plan de acción y datos por categoría.
