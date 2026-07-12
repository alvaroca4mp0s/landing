---
title: "Un dashboard no es un sistema de alertas"
description: "Un dashboard responde cuando alguien pregunta. Un sistema de alertas habla cuando nadie preguntó. La diferencia decide si te enteras a tiempo."
date: "2026-06-18"
category: "Señales"
tags: ["dashboards", "alertas", "observabilidad"]
featured: true
seoTitle: "Un dashboard no es un sistema de alertas"
seoDescription: "Por qué un dashboard no reemplaza a un sistema de alertas, y cómo diseñar la capa que sí actúa cuando nadie está mirando."
---

Casi toda empresa que quiere "ver mejor lo que pasa" termina comprando un dashboard. Es una decisión razonable: los dashboards son visibles, se ven bien en una reunión y dan la sensación de estar en control. El problema aparece un martes a las tres de la mañana, cuando la condición que el dashboard mostraba perfectamente no le avisó a nadie.

## La diferencia es quién inicia la conversación

Un dashboard es una interfaz **pull**: la información está ahí, pero alguien tiene que ir a buscarla. Responde cuando le preguntan. Si nadie abre la pantalla, el dato importante espera, silencioso, junto a otros cuarenta datos que no importan.

Un sistema de alertas es **push**: cuando ocurre algo que cumple una condición, la información va a buscar a la persona. No espera a que la miren.

Esta distinción parece obvia escrita así, pero se pierde en la práctica porque ambos parten del mismo lugar —los mismos datos— y por un rato hacen sentir lo mismo: que la operación está cubierta.

## Dónde falla el dashboard como sustituto de alerta

- **Depende de la atención humana continua.** Nadie mira una pantalla 24/7. El dashboard cubre el horario en que alguien lo mira; el resto del tiempo es decorativo.
- **No prioriza.** Muestra todo con el mismo peso visual. El número que debería gritar se ve igual que el que no importa.
- **No escala.** Si la persona que debía reaccionar no estaba, no hay un plan B. El dashboard no sabe que nadie lo vio.
- **No deja rastro de la decisión.** Muestra el estado actual, no la historia de quién se enteró de qué y cuándo.

## Esto no es "dashboards malos, alertas buenas"

Un dashboard es excelente para lo que fue hecho: explorar, comparar, entender tendencias, investigar después del hecho. La capa de alertas no lo reemplaza; lo completa. La regla práctica:

> Usa un dashboard para las preguntas que **tú** haces. Usa un sistema de alertas para los eventos que deberían hacerte **a ti** una pregunta.

## Cómo se ve la capa que falta

Un sistema de alertas bien diseñado hace cuatro cosas que un dashboard no hace solo:

1. **Evalúa contexto**: no toda lectura fuera de rango es un evento. ¿Persiste? ¿Es horario hábil? ¿Ya avisamos por esto?
2. **Elige destinatario y canal**: la persona correcta, por donde ya mira (WhatsApp, Telegram, SMS, correo).
3. **Escala**: si el primero no responde en X minutos, sube al siguiente. El evento no se apaga solo.
4. **Registra**: qué pasó, a quién se avisó, qué se hizo. Evidencia, no memoria.

Si tienes dashboards y sientes que "igual se nos escapan cosas", probablemente no te falta otra pantalla. Te falta la capa que actúa cuando nadie está mirando la que ya tienes.

---

*¿Hay un evento que hoy solo ves si abres una pantalla? [Cuéntanos qué debería avisarte](/contacto) y estudiamos cómo detectarlo.*
