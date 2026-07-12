# RedLocal — sitio

Sitio comercial de **RedLocal**: sistemas que detectan lo que importa y hacen que alguien actúe. Reducimos el tiempo entre un evento importante y una acción correcta.

> Cuando ocurra algo importante, lo sabrás a tiempo.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** estricto
- **Tailwind CSS v4** (configuración CSS-first, sistema "señal sobre papel")
- Contenido en **Markdown** con frontmatter validado por **Zod** (`gray-matter` + `react-markdown`, render 100% en servidor)
- **Plausible** para analítica sin cookies
- Fuentes autohospedadas vía `next/font` (sin peticiones externas en runtime)

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional: configura Twenty CRM
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (`output: standalone`) |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint (flat config de Next) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (schema del lead, rate limiter) |
| `npm run reprocess-leads` | Empuja leads en cola (fallback) a Twenty CRM; ver `docs/CRM_INTEGRATION.md` |

## Estructura

```
app/              Rutas (App Router), API route del lead, sitemap, robots
components/       Componentes UI y de contenido (server + client)
components/ui/    Primitivas (button, section)
lib/              site, seo, analytics, leads (Zod), content loader, crm/
content/          Markdown editable: articles/ cases/ tools/
docs/             Estrategia, IA, diseño, integración CRM, SEO, seguridad, a11y, deploy
legacy/           Sitio estático anterior (RestoRdL), intacto — no borrar
```

## Contenido

Ver [`docs/CONTENT.md`](docs/CONTENT.md). Para publicar un artículo, agrega un `.md` en `content/articles/` con su frontmatter; el frontmatter se valida en build.

## Integración con Twenty CRM

Ver [`docs/CRM_INTEGRATION.md`](docs/CRM_INTEGRATION.md). El token vive solo en el servidor; el formulario nunca habla directo con el CRM desde el navegador. Si el CRM no está configurado o no responde, el lead se persiste en disco.

## Despliegue

Ver [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Objetivo: droplet propio con Node (`standalone`) tras nginx; alternativa documentada: Vercel.

## Documentación

- [`docs/STRATEGY.md`](docs/STRATEGY.md) — tesis, posicionamiento, hero, conversión
- [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) — mapa del sitio
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — tokens, tipografía, componentes, motion
- [`docs/SEO.md`](docs/SEO.md) · [`docs/ANALYTICS.md`](docs/ANALYTICS.md) · [`docs/SECURITY.md`](docs/SECURITY.md) · [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md)
- [`docs/DECISIONS.md`](docs/DECISIONS.md) · [`docs/LOOP_REPORT.md`](docs/LOOP_REPORT.md) — bitácora de ciclos
- [`docs/competitive-analysis.md`](docs/competitive-analysis.md) · [`docs/COMMERCIAL_REVIEW.md`](docs/COMMERCIAL_REVIEW.md) — análisis competitivo y revisión por perfiles
