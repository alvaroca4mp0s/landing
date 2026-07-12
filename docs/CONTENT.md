# Contenido administrable

Todo el contenido editorial vive en `content/` como Markdown con frontmatter validado por Zod (`lib/content.ts`). Render 100% en servidor: cero JS de markdown al cliente.

## Colecciones

| Carpeta | Ruta | Esquema extra |
|---|---|---|
| `content/articles/` | `/ideas/<slug>` | — |
| `content/cases/` | `/casos/<slug>` | `status` (obligatorio), `problem`, `outcome` |
| `content/tools/` | `/opensource/<slug>` | `toolUrl`, `license` |

El `<slug>` = nombre del archivo sin `.md`.

## Frontmatter

Comunes: `title`, `description`, `date` (obligatorios); `updated`, `author` (default RedLocal), `category`, `tags[]`, `featured`, `draft`, `seoTitle`, `seoDescription`, `evidenceLevel`.

`evidenceLevel` ∈ `investigado | probado | implementado | produccion` — se muestra como badge de honestidad en `/opensource`.

`status` (solo cases) ∈ `prototipo | demostracion | sistema-interno | piloto | produccion` — badge en `/casos`.

Si el frontmatter no valida, **el build falla** con el archivo y el motivo. Los `draft: true` se ocultan en producción.

## Publicar un artículo

1. Crear `content/articles/mi-articulo.md`.
2. Frontmatter mínimo:

```yaml
---
title: "Título"
description: "Bajada de una frase."
date: "2026-07-11"
category: "Señales"
tags: ["alertas"]
---
```

3. Escribir en Markdown (GFM soportado: tablas, listas, blockquote, código). Termina con un CTA contextual enlazando a `/contacto`.
4. `npm run build` valida y genera la ruta estática.

## Reglas editoriales

- Español de Chile neutro. Sin lorem ipsum. Sin relleno.
- Diferenciar **hecho / experiencia / inferencia**.
- No inventar clientes, cifras ni casos desplegados. Etiquetar el estado con honestidad (`status`, `evidenceLevel`).
- Enlazar contenido relacionado (`[[...]]` conceptual → enlaces markdown reales entre piezas).

## Inventario actual

- **Artículos (5)**: dashboard-no-es-sistema-de-alertas, que-ocurre-cuando-nadie-esta-mirando, instalar-no-es-operar, crm-open-source-para-oportunidades, de-evento-a-senal.
- **Casos (3)**: bomba-presion-madrugada (prototipo), monitoreo-precios-retail (demostración), cliente-fuera-de-horario (sistema interno).
- **Tools (3)**: twenty-crm (producción), n8n (implementado), grafana (probado).
