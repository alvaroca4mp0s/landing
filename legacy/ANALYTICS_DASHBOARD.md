# RedLocal — Dashboard mínimo de conversión

Este tablero está pensado para revisar rápido qué tan bien está convirtiendo la landing a conversaciones de WhatsApp.

## 1) KPI principal (el que manda)

- **WhatsApp Click Rate** = `whatsapp_click / page_view`
- Objetivo inicial sugerido: **8%–15%** (ajustar con datos reales de tráfico de pago vs orgánico).

## 2) KPIs secundarios

- **Hero CTA CTR** = `whatsapp_click` con `section=hero` / `page_view`
- **CTA Final CTR** = `whatsapp_click` con `section=cta_final` / `page_view`
- **Header CTR** = `cta_click` con `section=header` / `page_view`
- **Depth 50%** = `scroll_50 / page_view`
- **Depth 90%** = `scroll_90 / page_view`
- **FAQ engagement** = `faq_open / page_view`

## 3) Embudo recomendado

1. `page_view`
2. `section_view` (hero, planes, contacto)
3. `whatsapp_click`

Mirar abandono entre pasos para detectar fricción.

## 4) Cortes obligatorios (segmentación)

- `device` (mobile vs desktop)
- `utm_source`
- `utm_medium`
- `utm_campaign`

> Con esto podrás responder: qué canal trae tráfico que sí inicia conversación por WhatsApp.

## 5) Paneles sugeridos

### Panel A — Resumen ejecutivo (semanal)
- Page views
- WhatsApp clicks
- WhatsApp Click Rate
- Top 3 campañas por click rate

### Panel B — Performance por canal
- Tabla por `utm_source / utm_campaign`
- Columnas: page_view, whatsapp_click, click rate

### Panel C — UX/Contenido
- Scroll 50/90
- Section views
- FAQ top preguntas abiertas

## 6) Alertas prácticas

- **Alerta 1:** si WhatsApp Click Rate cae >20% vs semana anterior
- **Alerta 2:** si mobile convierte <60% de desktop
- **Alerta 3:** si sube page_view pero no sube whatsapp_click

## 7) Cadencia de revisión

- **Diaria (10 min):** KPI principal + campañas activas
- **Semanal (30 min):** ajustar copy/CTA y pausar campañas débiles
- **Mensual (45 min):** revisar tendencias y estacionalidad

## 8) Checklist de higiene de datos

- Todos los links de campaña con UTM (`source`, `medium`, `campaign`)
- Mantener nombres consistentes (ej: `meta`, `google`, `organic`)
- Evitar campañas sin UTM
- Revisar que eventos `whatsapp_click` estén llegando con `section`

---

## Eventos actualmente instrumentados

- `page_view`
- `cta_click`
- `whatsapp_click`
- `scroll_50`
- `scroll_90`
- `section_view`
- `faq_open`

Implementación en `tracking.js`.
