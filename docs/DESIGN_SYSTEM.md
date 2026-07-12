# Sistema de diseño — "Señal sobre papel"

Dirección elegida entre tres (ver `DECISIONS.md`). Idea rectora: **todo es tinta sobre papel; el rojo es LA señal —el evento que importa—.** El sistema cromático es el mensaje.

## Tokens (en `app/globals.css`, `@theme`)

### Color

| Token | Valor | Uso |
|---|---|---|
| `paper` | `#fbfaf7` | Fondo base |
| `paper-2` | `#f3f1ea` | Secciones alternas, cards suaves |
| `paper-3` | `#ece9e0` | Rellenos terciarios |
| `ink` | `#17161b` | Texto principal (casi negro) |
| `ink-soft` | `#56535e` | Texto secundario |
| `ink-faint` | `#8a8790` | Metadatos, deshabilitado |
| `line` / `line-strong` | `#e3dfd4` / `#cfc9ba` | Bordes, reglas, rutas |
| **`signal`** | **`#e21d2d`** | **LA señal. Reservado al evento que importa, CTA principal, foco narrativo.** |
| `signal-strong` | `#c00f1e` | Hover de la señal |
| `signal-wash` | `#fdecec` | Fondos de selección/activo |
| `structure` | `#1e4f9c` | Enlaces, andamiaje, rutas base (azul de marca) |
| `ok` / `warn` | `#1b7a4b` / `#9a6a00` | Acción completada / advertencia |

**Regla de oro:** el rojo `signal` no se usa como color decorativo. Aparece donde hay una señal real o el CTA dominante. Si todo es rojo, nada es señal.

Contraste: `ink` sobre `paper` ≈ 15:1; `ink-soft` sobre `paper` ≈ 6.5:1; `signal` sobre blanco ≈ 4.6:1 (texto ≥ el mínimo AA para tamaños usados; el rojo se usa en texto grande o sobre `signal-wash`).

### Tipografía

- **Display** (`--font-display`): Space Grotesk — titulares, con `letter-spacing: -0.02em` y `text-wrap: balance`.
- **Sans** (`--font-inter`): Inter — cuerpo y UI.
- **Mono** (`--font-mono`): JetBrains Mono — metadatos técnicos (`.meta`), etiquetas, capacidades, el diagrama.

Todas vía `next/font` (autohospedadas, `display: swap`, sin CLS ni peticiones externas).

### Espaciado, radios, formas

- Radios: `--radius-sm` 6px · `--radius` 10px · `--radius-lg` 16px.
- Contenedor: `.container-rl` (max 74rem, padding responsivo).
- Sin sombras dramáticas: la jerarquía viene del contraste y de las reglas de 1px, no de elevación. Estética de precisión.

## Componentes

| Componente | Archivo |
|---|---|
| Header + nav móvil | `components/site-header.tsx` |
| Footer | `components/site-footer.tsx` |
| Logo (wordmark + punto-señal) | `components/logo.tsx` |
| Botón / ButtonLink (signal · structure · ghost) | `components/ui/button.tsx` |
| Section / SectionHeading / Eyebrow | `components/ui/section.tsx` |
| **SignalFlow** (diagrama evento→señal→acción) | `components/signal-flow.tsx` |
| Markdown (prosa) | `components/markdown.tsx` |
| StatusBadge / EvidenceBadge / Breadcrumbs | `components/content-bits.tsx` |
| ContactForm (6 pasos) | `components/contact-form.tsx` |

## Motion

Movimiento solo con función (explicar, dirigir atención, mostrar causalidad, dar feedback).

- El **SignalFlow** es la pieza de motion central: los dots de ruido se disipan en el filtro; la señal (rojo) atraviesa y llega al canal. Explica, no decora.
- **`prefers-reduced-motion` se respeta** globalmente (reset en `globals.css`) y en el diagrama (hook `useReducedMotion` → versión estática, sin dots viajando, con la ruta marcada).
- El punto del logo pulsa solo si hay movimiento permitido.

## Estética "ruido → selección → señal → destino"

Se expresa con: rutas de 1px que convergen en un filtro, dots de ruido que se apagan, una señal roja que persiste, un canal que se enciende. No se abusa de ondas/radares: la metáfora aparece una vez, bien, en el diagrama.
