# LOOP_REPORT — Bitácora de ciclos autónomos

Registro de cada ciclo de trabajo: objetivo, cambios, pruebas, hallazgos y siguiente acción.

---

## Ciclo 0 — Diagnóstico inicial (2026-07-10)

### Objetivo

Inspeccionar el repositorio, identificar stack, activos y restricciones antes de tocar código.

### Hallazgos

**Repositorio actual**

- Landing estática (HTML + CSS + JS vanilla), sin framework ni `package.json` raíz.
- El contenido actual es un pivot a "RestoRdL" (agente WhatsApp para restaurantes) — no representa el posicionamiento objetivo de RedLocal como empresa de sistemas de detección y señales.
- Deploy actual: `rsync` de una carpeta `dist/` a un droplet (nginx en `/var/www/redlocal.cl/`), documentado en `legacy/README_DEPLOY.md`.
- Analítica: Plausible (`data-domain="redlocal.cl"`) ya en producción. Sin cookies, sin tracking invasivo. Se conserva.
- Marca existente: rojo `#E21D2D` ("Red") + azul `#1E4F9C` ("Local"), isotipo en `legacy/assets/iso.png`. Correo `hola@redlocal.cl`. WhatsApp comercial `+56 9 4581 8860`.
- Carpeta `remotion/` con composiciones de video para la landing anterior (archivada en `legacy/`).

**Activos externos verificados**

- `crm.redlocal.cl`: instancia Twenty CRM **viva** (HTTP 200, Express, detrás de Cloudflare). `/rest/*` responde 403 sin token → API REST operativa y protegida. No hay API key disponible en este entorno: la integración se implementa como adaptador completo + mocks + pruebas + documentación de configuración.
- `redlocal.cl`: sitio actual en producción (HTTP 200).
- Proyecto hermano `~/Proyectos/NOISE`: filosofía NOISE documentada y real (attention ledger, Next.js + Supabase). Frase fundacional: "Attention separates signal from noise". Fuente primaria para la página `/noise`.
- `beacon-bootstrap`: no está clonado en esta máquina. Evidencia indirecta de su stack multicanal (credencial TextBee/Firebase para SMS en ~/Downloads, fuera del repo). Se describe según el brief del dueño; el estado se etiqueta honestamente como "sistema interno".

**Restricciones**

- Deploy objetivo: droplet propio (nginx). El sitio nuevo usa Next.js con servidor Node (necesario para el route handler del formulario → CRM). Se documenta despliegue con `output: standalone` + systemd + nginx reverse proxy, y alternativa Vercel.
- No hay `gh` CLI ni credenciales de Twenty en el entorno.
- No inventar clientes, cifras ni casos desplegados.

### Decisiones

1. Trabajar en rama `feat/redlocal-site`; el sitio legacy queda íntegro en `legacy/` (no se borra nada).
2. Stack: Next.js App Router + TypeScript estricto + Tailwind CSS v4 + Zod + contenido en Markdown con frontmatter validado. Sin CMS externo.
3. Mantener Plausible como analítica (ya pagada/configurada, respeta privacidad).
4. Conservar rojo/azul de marca como anclas, evolucionando a una paleta "señal sobre papel" de alto contraste.

### Siguiente acción

Fase 1: estrategia, análisis competitivo y arquitectura de información en `docs/`.

---

## Ciclo 1 — Andamiaje + slice vertical de conversión (2026-07-11)

### Objetivo

Dejar el proyecto ejecutable y probar el núcleo comercial extremo a extremo: hero + diagrama evento→señal→acción + CTA + formulario + integración CRM segura.

### Cambios

- **Toolchain**: `tsconfig` estricto (`noUncheckedIndexedAccess`), `next.config.ts` (`output: standalone` + headers de seguridad), `postcss`, `eslint.config.mjs` (flat config nativo de Next 16), `vitest.config.ts`, scripts en `package.json`, `type: module`. Se instaló `server-only`.
- **Sistema de diseño** "señal sobre papel" en `app/globals.css` (tokens `@theme`, prosa, keyframes de ruido/señal/pulso).
- **Layout + fuentes** autohospedadas (Inter/Space Grotesk/JetBrains Mono), Plausible, JSON-LD Organization/WebSite, skip link.
- **SignalFlow** (`components/signal-flow.tsx`): diagrama SVG que explica el flujo; rota escenarios (Telegram/WhatsApp/CRM/SMS); respeta reduced-motion vía `useReducedMotion` (`useSyncExternalStore`).
- **Home** completa (`app/page.tsx`) con las 11 funciones narrativas de la IA.
- **Conversión**: `lib/leads.ts` (Zod + honeypot + summarize), `lib/crm/twenty.ts` (adaptador REST, token server-only, timeouts), `lib/crm/store.ts` (fallback a disco), `lib/rate-limit.ts`, `app/api/lead/route.ts`, `components/contact-form.tsx` (6 pasos), `/contacto`, `/gracias`.

### Comandos / pruebas

- `npm run build` ✓ (tras corregir `type: commonjs`→`module` y quitar `eslint` de NextConfig).
- Smoke API: lead válido → `{ok, id}` + archivo en `data/leads/`; honeypot lleno → `200` silencioso sin archivo; inválido → `422` con field errors. **Verificado por curl contra dev server.**

### Decisiones

- Deuda de tooling: `next lint` fue removido en Next 16 → `lint` usa `eslint .` con flat config nativo.

### Siguiente acción

Sistema de contenido + páginas secundarias + docs.

---

## Ciclo 2 — Contenido, páginas secundarias, SEO, tests, docs (2026-07-11)

### Objetivo

Sitio navegable sin páginas vacías; blog y open source operativos; verificación en verde; documentación completa.

### Cambios

- **Sistema de contenido** (`lib/content.ts`): Markdown + gray-matter + Zod, colecciones articles/cases/tools, frontmatter validado (build falla si inválido), reading time, drafts ocultos en prod. `components/markdown.tsx` (react-markdown en RSC) + prosa en `globals.css`.
- **Contenido real**: 5 artículos, 3 casos (etiquetados prototipo/demostración/sistema interno), 3 fichas open source (Twenty en producción, n8n, Grafana).
- **Páginas**: `/soluciones`, `/como-funciona` (Beacon como motor, no chatbot), `/casos` + `[slug]`, `/opensource` + `[slug]`, `/ideas` + `[slug]`, `/noise`, `/privacidad`, `not-found`, `error`, `sitemap.ts`, `robots.ts`.
- **SEO**: metadata por página, canonical, OG/Twitter, JSON-LD Article/Breadcrumb/Service, sitemap dinámico.
- **Analítica**: `lib/analytics.ts` + eventos en form, artículos, casos, tools, CTAs.
- **Tests**: `lib/leads.test.ts`, `lib/rate-limit.test.ts` (11 tests).
- **Docs**: README, CRM_INTEGRATION, DESIGN_SYSTEM, SECURITY, ANALYTICS, SEO, ACCESSIBILITY, DEPLOYMENT, CONTENT, `.env.example`.

### Comandos / pruebas

- `npm run lint` ✓ · `npm run typecheck` ✓ · `npm run test` ✓ (11/11) · `npm run build` ✓ (25 rutas, contenido SSG).
- Smoke HTTP: todas las rutas 200; 404 correcto; sitemap.xml y robots.txt 200.
- Corregido: `react-hooks/set-state-in-effect` (React 19) → `useSyncExternalStore` + timers en callbacks; 2 hidrataciones SSR-safe con disable justificado.

### Deuda pendiente

- **Verificación visual en navegador real** (desktop/móvil) y consola: hecha por HTML/curl; falta captura visual y Lighthouse a11y/perf.
- **CSP** endurecida (hoy: resto de headers sí).
- **OG dinámico** por página y **RSS** de /ideas.
- **Script de reproceso** de leads del fallback hacia Twenty.
- **Campos personalizados** de Twenty (mapeo documentado, adaptador aislado).
- `npm audit`: 2 moderadas transitivas de tooling.

### Siguiente acción de mayor valor

Fase 6 (revisión comercial por perfiles) y captura visual/Lighthouse; luego endurecer CSP y OG dinámico.

---

## Ciclo 3 — Verificación visual real, Fase 6 y cierre de deuda (2026-07-11)

### Objetivo

Verificar el sitio en navegador real (desktop + móvil), completar la revisión comercial por 7 perfiles y cerrar la deuda pendiente de alto valor.

### Cambios

- **BUG de conversión corregido** (el más importante de todo el proyecto): el paso de urgencia es opcional, pero el formulario enviaba `urgency: ""` y `z.enum(URGENCIES).optional()` lo rechazaba con **422 → cualquier usuario que no eligiera urgencia no podía enviar el caso**. Fix en `lib/leads.ts` con `z.preprocess("" → undefined)` + 3 tests de regresión. Descubierto conduciendo el formulario real en el navegador.
- **RSS descubrible**: la ruta `/rss.xml` ya existía pero no estaba enlazada. Añadido `<link rel="alternate" type="application/rss+xml">` en `/ideas` y enlace en el footer. (Se creó por error un `/ideas/feed.xml` duplicado y se eliminó al detectar la ruta existente.)
- **Script de reproceso de leads implementado**: `npm run reprocess-leads [-- --dry-run]`. Se refactorizó el adaptador Twenty extrayendo el núcleo REST a `lib/crm/twenty-core.ts` (funciones puras, sin `server-only`, credenciales por parámetro); `lib/crm/twenty.ts` queda como wrapper que lee el token del entorno. El script (`scripts/reprocess-leads.ts`, ejecutado con `tsx`) reutiliza el núcleo sin duplicar lógica: leads exitosos se **mueven** a `data/leads/processed/`.
- **package.json**: `private: true`, descripción real, se quitó `main: index.js` (no aplica a una app Next).
- **Dependencia nueva**: `tsx` (devDependency). Propósito: correr scripts TS operativos resolviendo los paths de tsconfig sin un build aparte. Peso: dev-only, no entra al bundle. Mantenimiento: activo (ecosistema esbuild). Alternativa nativa: type-stripping de Node no resuelve alias `@/`. Riesgo: bajo.

### Comandos / pruebas

- Navegador real (Browser pane): home desktop 1280px + móvil 375px, `/contacto`, `/gracias`, `/opensource/twenty-crm`, `/casos`.
- **Conversión E2E verificada en navegador**: formulario completo dejando urgencia vacía (el caso que estaba roto) → llega a `/gracias` con resumen del caso → lead persistido en `data/leads/` (fallback, sin `TWENTY_API_KEY`). Leads de prueba limpiados.
- Consola: solo warnings dev de `eval()` del sandbox del Browser pane (React nunca usa eval en producción); sin errores propios.
- `npm run reprocess-leads -- --dry-run` con lead de prueba → `tsx` resuelve alias y lee la cola correctamente.
- `npm run typecheck` ✓ · `lint` ✓ · `test` ✓ (14/14) · `build` ✓ (38 rutas).
- **CSP ya estaba endurecida** en `next.config.ts` (edición de un ciclo previo). **OG dinámico ya existía** (rutas `opengraph-image` por página en el build). Ambos ítems de deuda quedaban cubiertos.

### Resultado

- `docs/COMMERCIAL_REVIEW.md`: los 7 perfiles entienden la oferta, se reconocen, confían y saben qué hacer; sin fricción de bloqueo. Objeciones estructurales (empresa joven, precio a medida) se declaran con honestidad por decisión de marca, no se ocultan.
- Verificación visual desktop + móvil: excelente; "señal sobre papel" coherente; jerarquía de CTA correcta.

### Deuda pendiente

- Lighthouse formal a11y/perf (revisión manual + semántica hechas; falta la corrida de la herramienta).
- Campos personalizados de Twenty: mapeo documentado; creación real depende de credenciales.
- `npm audit`: 2 moderadas transitivas de tooling (postcss vía next dev; no afecta runtime de producción).
- Endurecer CSP a nonce estricto (hoy `unsafe-inline` acotado y documentado).

### Siguiente acción de mayor valor

Fase 7: README + `docs/DEPLOYMENT.md` finales, verificación del build de producción arrancando el servidor standalone, y commit del trabajo.

---

## Ciclo 4 — Fase 7: verificación de producción y commit (2026-07-11)

### Objetivo

Cerrar la entrega: confirmar que el build de producción arranca y es seguro, finalizar docs y versionar el trabajo.

### Comandos / pruebas (servidor de producción real, `npm run start` en :3100)

- Home responde `200`.
- **Los 6 headers de seguridad presentes**, incluida la CSP completa (verificado por `curl -I`).
- **Sin filtración del token**: `TWENTY_API_KEY` de prueba NO aparece ni en el HTML ni en los bundles de `.next/static/`.
- **Contingencia CRM en producción**: con token inválido, Twenty responde `401`; el route lo registra sin datos sensibles (solo id + error) y cae al fallback en disco; el usuario recibe `{ok:true}`. Honeypot → `200` silencioso con id falso, sin persistir. Leads de prueba limpiados.
- README y `docs/DEPLOYMENT.md` revisados y completos (standalone + systemd + nginx con `x-forwarded-for`; caveat de Vercel por FS efímero).

### Resultado

- Commit `50161ba` en `feat/redlocal-site`: 110 archivos, +15 455 líneas. Sin secretos, sin `data/`, sin `settings.local.json`. Sitio legacy intacto en `legacy/`.
- Estado de aceptación: promesa clara en <5s, CTA dominante, formulario sin exigir tecnicismos, no parece agencia de IA genérica, NOISE y Beacon en su rol, casos etiquetados con honestidad, blog y open source operativos, formulario funcional, integración CRM segura + adaptador verificable con instrucciones, móvil excelente, sin errores de consola propios, lint/typecheck/test/build en verde, SEO y analítica presentes, docs completas, sin contenido inventado ni relleno, desplegable.

### Deuda pendiente (no bloqueante para desplegar)

- Lighthouse formal a11y/perf (revisión manual + semántica hechas).
- Campos personalizados de Twenty (dependen de credenciales reales).
- `npm audit`: 2 moderadas transitivas de tooling (no afectan runtime de producción).
- CSP a nonce estricto (hoy `unsafe-inline` acotado y documentado en SECURITY).
- Push a `origin` y switch de nginx desde legacy: acciones del operador (requieren credenciales/decisión humana).

### Siguiente acción de mayor valor

Configurar `TWENTY_API_KEY` en el servidor y ejecutar el switch de nginx cuando el equipo valide el preview. El repositorio queda listo para desplegar.

---
