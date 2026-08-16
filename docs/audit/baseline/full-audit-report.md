# FULL SEO AUDIT — redlocal.cl

- **SEO Health Score:** 70/100
- **Tipo de negocio:** servicios técnicos B2B — sistemas de detección de eventos y alertas (Coquimbo, Chile); componente local ligero
- **Páginas rastreadas:** 3 (`/`, `/diagnostico-ot/`, `/privacidad`)
- **Método:** scripts en vivo (seo-audit-basic + seo-audit-full) + análisis inline de especialistas (technical, content, on-page, schema, performance, GEO, images). Fan-out de subagentes omitido por ser un sitio de 3 páginas ya rastreado.

## Executive Summary
**Top 5 issues:** soft-404 (200 en todo) · `.html` 308 + canonical/sitemap desalineados · keyword ausente en title/H1 de la home · sin About ni Términos (E-E-A-T) · schema sin campos recomendados.
**Top 5 quick wins:** `404.html` · canonical/sitemap/links a `/privacidad` · keyword en title · `sameAs`+`SearchAction` · restaurar Términos.

## Scores por categoría (ponderados)
| Categoría | Peso | Score |
|---|---|---|
| Technical SEO | 22% | 68 |
| Content Quality (E-E-A-T) | 23% | 62 |
| On-Page SEO | 20% | 72 |
| Schema | 10% | 80 |
| Performance (CWV, estimado) | 10% | 85 |
| AI Search Readiness (GEO) | 10% | 60 |
| Images | 5% | 85 |
| **Total** | | **70/100** |

Ver `audit-data.json` para hallazgos detallados por categoría y `ACTION-PLAN.md` para el plan priorizado.

## Notas de método / límites
- **Performance:** no medido en campo (falta API key de PageSpeed / acceso GSC-CrUX). Score estimado por indicadores de laboratorio (sitio estático liviano, fuentes self-host con preload+swap, sin terceros bloqueantes).
- **Soft-404 contamina detección:** como todo devuelve 200, chequeos de existencia (llms.txt, About, Términos) requirieron verificación manual del cuerpo servido.
