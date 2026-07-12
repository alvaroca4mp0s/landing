# Arquitectura de información

## Mapa del sitio (v1 — solo páginas con contenido real)

```
/                  Home comercial (conversación progresiva)
/soluciones        4 categorías + casos de uso por categoría
/como-funciona     Arquitectura conceptual: observar→detectar→evaluar→avisar→escalar→registrar→actuar
/casos             Fichas con estado honesto (sistema interno / prototipo / demostración)
/casos/[slug]      Detalle de caso
/opensource        Directorio editorial de herramientas evaluadas/implementadas
/opensource/[slug] Ficha editorial completa (16 secciones)
/ideas             Publicación editorial
/ideas/[slug]      Artículo
/noise             Manifiesto y disciplina de diseño NOISE
/contacto          Formulario conversacional (conversión principal)
/privacidad        Política de privacidad
/gracias           Confirmación post-envío (resumen del caso + qué sigue)
404                Página no encontrada con rutas de rescate
error              Error de aplicación
```

`/laboratorio` queda fuera de v1 (sin contenido suficiente; los experimentos viven en /casos con estado "prototipo" y en /ideas). La navegación y el contenido no lo mencionan. Se agrega cuando exista material.

## Navegación

**Header** (desktop): Soluciones · Cómo funciona · Casos · Open source · Ideas — CTA: "Cuéntanos qué debería avisarte".
**Header** (móvil): menú accesible con las mismas entradas + CTA fija.
NOISE no va en navegación principal: se descubre desde la home (sección 9.8), footer y artículos. Decisión: filosofía se revela, no se impone.

**Footer**: navegación completa + NOISE + Privacidad + contacto directo (correo copiable, WhatsApp) + CRM propio mencionado como parte del sistema comercial.

## Mapa narrativo de la home

1. **Hero** — promesa + kicker identitario + bajada con fuentes/canales + CTA doble + diagrama animado evento→evaluación→señal→canal→acción.
2. **Identificación** — "¿Te serviría saberlo antes?" — 10 situaciones reconocibles → cierre: "Si puedes describir el evento, podemos estudiar cómo detectarlo."
3. **Fricción** — por qué hoy se pierde lo importante (estructural, sin culpar).
4. **Propuesta** — 7 verbos: Observamos/Detectamos/Evaluamos/Avisamos/Escalamos/Registramos/Actuamos.
5. **Categorías** — 4 áreas como ejemplos, no límites.
6. **Escenarios** — 3 demostraciones paso a paso (bomba 03:17, precio supermercado, cliente fuera de horario) con etiquetas honestas.
7. **Diferenciador** — dashboards vs. RedLocal, con matiz (complementamos, no sustituimos).
8. **NOISE** — "Menos mensajes. Más señales." + 8 dimensiones de diseño de una interrupción.
9. **Evidencia técnica** — matriz de capacidades por función (fuentes/inteligencia/canales/operación).
10. **Cómo comenzar** — Evaluación inicial de señales: qué describe el visitante, qué responde RedLocal.
11. **CTA final** — "No necesitas saber qué tecnología usar."

## Jerarquía de conversión por página

Toda página tiene exactamente un CTA dominante → `/contacto`. CTAs secundarios (leer caso, explorar herramienta) tienen peso visual menor y nunca aparecen a la par del dominante.
