# SEO técnico

## Implementado

- **Metadata por página** vía Metadata API (`lib/seo.ts` → `buildMetadata`): title, description, canonical, Open Graph, Twitter card, locale `es_CL`.
- **Title template** global: `%s · RedLocal` (`app/layout.tsx`).
- **Canonical** por ruta (relativa, resuelta con `metadataBase`).
- **Sitemap** dinámico (`app/sitemap.ts`) con estáticas + artículos/casos/tools y `lastModified`.
- **Robots** (`app/robots.ts`): permite todo salvo `/api/` y `/gracias`; declara sitemap.
- **JSON-LD**:
  - `Organization` + `WebSite` (global, en layout).
  - `Service` (home, soluciones).
  - `Article` (ideas, casos con `datePublished`/`dateModified`).
  - `BreadcrumbList` (detalles de ideas/casos/opensource).
- **Breadcrumbs** visibles y estructurados en las páginas de detalle.
- `/gracias` marcada `noindex`.

## Clusters temáticos (intención real, sin keyword stuffing)

Cubiertos por el contenido actual y la arquitectura:

- Sistemas de alertas · alertas por WhatsApp/Telegram/SMS → home, soluciones, `de-evento-a-senal`.
- Un dashboard no es un sistema de alertas → `dashboard-no-es-sistema-de-alertas`.
- Monitoreo de precios / oportunidades → soluciones, caso `monitoreo-precios-retail`.
- Monitoreo industrial, SCADA, MQTT, OPC UA, sensores → soluciones, caso `bomba-presion-madrugada`.
- Reducción de alarm fatigue / arquitectura orientada a eventos → NOISE, `de-evento-a-senal`.
- Software open source para empresas / self-hosting / Twenty CRM Chile → `/opensource`, `instalar-no-es-operar`, `crm-open-source-para-oportunidades`.

## Honestidad estructurada

No se inventan ubicaciones, precios, valoraciones ni FAQ sin contenido visible. No hay datos estructurados falsos. `FAQPage` se agregará solo cuando exista una sección FAQ real y visible.

## Deuda / siguiente

- **Open Graph dinámico** (imágenes OG por página con `opengraph-image`): pendiente. Hoy se usa OG textual heredado del layout.
- **RSS** de `/ideas`: pendiente.
- Verificar títulos/descripcodes por longitud en Search Console tras publicar.
