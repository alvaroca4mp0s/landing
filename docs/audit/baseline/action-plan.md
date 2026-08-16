# ACTION PLAN — redlocal.cl (SEO Health 70/100)

Priorizado: Critical > High > Medium > Low.

## Phase 1 — Critical/High (Semana 1)
1. **[High] Soft-404** — agregar `404.html` en la raíz del repo. Cloudflare Pages lo sirve con status 404 para rutas no encontradas. Hoy `/cualquier-cosa` → 200 con la home (páginas duplicadas indexables).
2. **[Medium→High] URLs `.html` con redirect + canonical mal apuntado** — `/privacidad.html` hace 308 → `/privacidad`, pero el canonical, el `sitemap.xml` y los enlaces internos apuntan a `/privacidad.html`. Corregir a `/privacidad` (extensionless) en: canonical tag, sitemap, y enlaces del footer/oferta.
3. **[High] Keyword en el `<title>` de la home** — hoy el keyword central no está en title ni H1. Cambiar a `RedLocal — Sistemas de alertas y detección de eventos` (≤60 chars).

## Phase 2 — High-Impact (Semanas 2-3)
4. **[High] Página Nosotros/About** (`/nosotros`) — historia, equipo, experiencia, ubicación. Señal E-E-A-T clave hoy ausente.
5. **[Medium] Restaurar Términos** + enlace en footer (se fue con `legacy/`).

## Phase 3 — Contenido & Autoridad (Mes 2)
6. **[Low] Schema** — `Organization.sameAs` (perfiles) + `WebSite.potentialAction` (SearchAction); `BreadcrumbList` en páginas internas.
7. **[Low] FAQPage schema** + pasajes citables (mejora GEO / AI Overviews).
8. **[Low] `llms.txt` real** (opcional; Google lo ignora).

## Phase 4 — Monitoreo (Continuo)
9. Conectar **GSC + PageSpeed/CrUX** para verificar CWV de campo e indexación.
10. Seguir posiciones del keyword objetivo.

> Nota: los cambios de esta sesión (self-host de fuentes, CSP sin orígenes externos, contraste AA, tokens) ya están en producción y verificados en vivo; deberían ayudar al LCP.
