# Registro de decisiones

Formato: fecha — decisión — razón — alternativas descartadas.

## 2026-07-11 — Rama `feat/redlocal-site`; legacy archivado, no borrado
El sitio RestoRdL vigente queda íntegro en `legacy/` y en producción hasta el switch. Alternativa descartada: borrar (pierde referencia de marca, pricing y analítica previa).

## 2026-07-11 — Stack: Next.js App Router + TypeScript estricto + Tailwind v4 + Zod
El repo no tenía framework; el formulario→CRM exige backend (no exponer tokens al navegador), lo que descarta seguir con HTML estático. Next.js permite RSC (mínimo JS cliente), route handlers para el lead, metadata API para SEO. Alternativas descartadas: Astro (menos conocido por el mantenedor actual de los proyectos hermanos, que ya usan Next); seguir estático + microservicio aparte (dos deploys, más superficie).

## 2026-07-11 — Contenido: Markdown + gray-matter + react-markdown en RSC, frontmatter validado con Zod
Render 100% en servidor: cero JS de markdown al cliente. Alternativas: MDX (@next/mdx) — descartado por ahora: no se necesita JSX dentro del contenido y complica la validación; CMS externo — sin necesidad demostrable.

## 2026-07-11 — Analítica: mantener Plausible (ya en producción en redlocal.cl)
Sin cookies, sin banner necesario, eventos custom soportados. Alternativa descartada: Vercel Analytics (el deploy objetivo es droplet propio).

## 2026-07-11 — Deploy: droplet existente con Node (output standalone) + nginx reverse proxy; Vercel documentado como alternativa
El dominio y el droplet ya existen y sirven redlocal.cl. Documentado en docs/DEPLOYMENT.md.

## 2026-07-11 — Hero: H1 "Cuando ocurra algo importante, lo sabrás a tiempo." + kicker "Lo importante no debería depender de que alguien esté mirando."
Scoring de 8 variantes × 8 criterios en docs/STRATEGY.md. Las dos mejores se componen: comprensión inmediata (H1) + diferenciación memorable (kicker).

## 2026-07-11 — Dirección visual: "señal sobre papel" (elegida entre 3 direcciones)
Ver docs/DESIGN_SYSTEM.md. Direcciones exploradas:
- A. "Sala de control" (fondo oscuro, verdes fosforescentes, densidad de terminal). Riesgo: cliché dashboard-oscuro-con-partículas; excluye al visitante no técnico; contradice "no parecer proveedor de dashboards".
- B. "Editorial suizo" (blanco, tipografía gigante, casi sin color). Riesgo: se lee estudio de diseño, no empresa de sistemas; débil para mostrar flujos técnicos.
- C. **"Señal sobre papel"** (elegida): base papel de alto contraste (tinta casi negra sobre blanco roto), rojo de marca #E21D2D reservado casi exclusivamente para LA SEÑAL (el evento que importa), azul de marca para estructura, monospace para metadatos técnicos, diagramas de rutas con líneas de 1px. Ventajas: hereda el rojo/azul de la marca existente; el sistema cromático ES el mensaje (todo es tinta, la señal es roja); legible, accesible, distinta del segmento (que es oscuro+morado); funciona igual en móvil.

## 2026-07-11 — NOISE fuera de la navegación principal
La filosofía se descubre desde la home, footer y artículos. Obligar a la teoría antes del valor contradice el brief (§4).

## 2026-07-11 — /laboratorio pospuesto
Sin contenido real suficiente; no se publican páginas vacías (§32).

## 2026-07-11 — Integración Twenty CRM como adaptador servidor con REST API + fallback a archivo
Sin API key en este entorno: se implementa adaptador completo (crear/actualizar persona+empresa+oportunidad+nota con el caso), mocks y pruebas; si `TWENTY_API_KEY` no está configurada o Twenty no responde, el lead se persiste en disco (`data/leads/`) y el usuario recibe confirmación igual. Nunca se pierde un lead por caída del CRM.
