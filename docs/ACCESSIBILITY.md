# Accesibilidad — objetivo WCAG 2.2 AA

## Implementado

- **HTML semántico**: `header`/`main`/`footer`/`nav`/`section`/`article`/`ol`/`ul`/`figure`/`dl`. Un solo `h1` por página; jerarquía de encabezados coherente.
- **Skip link** ("Saltar al contenido") al inicio del `body`, visible al foco.
- **Foco visible** consistente (`:focus-visible` con outline azul de estructura, en `globals.css`).
- **Navegación por teclado**: menú móvil como botón con `aria-expanded`/`aria-controls`; formulario 100% operable por teclado; chips como `radio` reales dentro de `fieldset`/`legend`.
- **Formularios**: cada control con `label` (visible o `sr-only`); `aria-current` en navegación activa; errores en `role="alert"`; honeypot fuera de foco (`tabIndex=-1`, `aria-hidden`).
- **Diagrama SignalFlow**: `role="img"` con `aria-label` descriptivo completo del flujo; `figcaption` en `sr-only`.
- **Movimiento**: `prefers-reduced-motion` respetado global y en el diagrama.
- **Contraste**: paleta de alto contraste (ver `DESIGN_SYSTEM.md`); el rojo se usa en texto grande o sobre `signal-wash`.
- **Color no es el único canal**: los estados usan además texto/íconos/posición (badges con texto, no solo color).
- **Enlaces descriptivos**: se evita "click aquí"; los CTA describen la acción.
- **Reflow / zoom**: layout con unidades relativas, flex/grid; tablas y bloques anchos con `overflow-x: auto` (prosa).
- **Objetivos táctiles**: botones ≥ 40px de alto; chips con padding generoso.

## Verificación

- Revisión de estructura y roles durante la implementación.
- Smoke test de navegación por HTTP (todas las rutas 200).

## Deuda / siguiente

- Pasar **axe-core**/Lighthouse a11y en las páginas clave y registrar el resultado.
- Revisión manual con lector de pantalla (VoiceOver) del flujo del formulario y del diagrama.
- Verificar contraste exacto del rojo en cada uso con herramienta (algunos usos en texto pequeño deben ir sobre `signal-wash`).
