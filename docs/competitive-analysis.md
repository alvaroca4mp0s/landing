# Análisis competitivo (documento interno)

Fecha: 2026-07-11. Uso interno; no citar competidores en la página pública.

## Metodología

Se revisaron tres grupos: (1) agencias de IA/automatización chilenas encontradas por búsqueda real (agentesdeiachile.cl, automatizalo.cl, iagentes.cl, neuronet.cl, codelan.cl, agenciaiachile.com, jhedai.com); (2) productos globales de incident management y alerting (PagerDuty, incident.io, Opsgenie/Jira, Grafana OnCall); (3) plataformas de observabilidad y automatización (Datadog, Grafana, n8n, Zapier). "Meridian IA" y "Piramid" no aparecieron con sitios verificables en la búsqueda; se cubren por su categoría (agencia IA local).

## Grupo 1: agencias de IA chilenas

**Promesa típica**: "automatiza tu negocio con IA", "agentes de IA para empresas", "reduce costos". Genérica, intercambiable entre sitios.

**Tono**: entusiasmo tecnológico; la IA es el producto, no el resultado. Abuso de "inteligente", "revolucionario", "el futuro".

**CTA**: "agenda una reunión" / "cotiza" sin reducir el riesgo ni calificar el problema.

**Diseño**: plantilla SaaS con degradados morados/azules, mockups de chat, iconografía stock.

**Debilidades explotables**:
- Nadie formula el problema del cliente mejor que el cliente; todos venden capacidad ("hacemos agentes") en vez de resultado ("lo sabrás a tiempo").
- Cero evidencia técnica verificable: sin arquitectura, sin casos etiquetados honestamente, sin contenido profundo.
- Ningún actor local ocupa el territorio "detección de eventos + señal a la persona correcta + escalamiento".

**Oportunidad RedLocal**: posicionarse por resultado y clase de problema (eventos que se pierden), con evidencia técnica real (CRM propio en producción, arquitectura publicada) y una voz sobria que contrasta con el entusiasmo vacío del segmento.

## Grupo 2: incident management (PagerDuty, incident.io, Opsgenie, Grafana OnCall)

**Qué hacen bien** (patrones a aprender, no copiar):
- Venden el momento crítico ("when every second counts"), no la tecnología.
- Escalamiento y on-call como conceptos de producto claros.
- Documentación técnica como herramienta de venta.
- Precios y demos concretas reducen la incertidumbre.

**Límites de su modelo frente al mercado RedLocal**:
- Presuponen equipos DevOps maduros y fuentes ya instrumentadas (métricas, monitores).
- No cubren fuentes no técnicas (páginas web, licitaciones, correos, PLC/SCADA legado sin conector, WhatsApp del negocio).
- Son producto autoservicio en inglés; una pyme o planta chilena no se sube sola.

**Oportunidad RedLocal**: ocupar el espacio "PagerDuty-para-el-mundo-real-no-instrumentado": diseño e integración a medida, fuentes heterogéneas, canales que la gente realmente mira (WhatsApp), en español y con acompañamiento.

## Grupo 3: observabilidad y automatización (Datadog, Grafana, n8n, Zapier)

- Observabilidad vende visibilidad (dashboards); la acción sigue dependiendo de que alguien mire y de configurar bien las alertas. Refuerza nuestro diferenciador: "un dashboard espera que alguien mire".
- n8n/Zapier venden lego de automatización: potentes para quien arma; nadie diseña el flujo por ti ni se hace cargo del criterio (qué merece interrumpir, a quién, cuándo escalar).
- Ambos generan alarm fatigue documentada cuando se configuran sin disciplina → NOISE es la respuesta editorial.

## Patrones visuales (Awwwards / estudios con narrativa tecnológica)

Patrones extraídos (sin copiar ejecuciones):
- Tipografía display grande con interlineado apretado como elemento identitario.
- Storytelling por scroll con diagramas que se explican solos, no decoración.
- Detalles "técnicos" discretos (monospace, coordenadas, timestamps, líneas de 1px) que transmiten precisión.
- Una sola familia de acento cromático sobre base neutra de alto contraste.
- Motion contenido: transiciones de estado, no fuegos artificiales.

Anti-patrones a evitar (saturados): fondo oscuro + partículas + degradado morado; clones de Linear/Vercel; glassmorphism genérico; mockups 3D flotantes.

## Síntesis

| Dimensión | Segmento agencias IA CL | Incident mgmt global | RedLocal (objetivo) |
|---|---|---|---|
| Promesa | capacidad ("hacemos IA") | momento crítico | resultado: "lo sabrás a tiempo" |
| Evidencia | ninguna | docs + logos | arquitectura real + estados honestos |
| Fuentes | chat/web | sistemas instrumentados | heterogéneas (industrial + web + correo) |
| Canal | chat web | apps propias/on-call | WhatsApp/Telegram/SMS (lo que la gente mira) |
| Entrada | "agenda reunión" | free trial | describir el evento (bajo riesgo, alto valor diagnóstico) |
