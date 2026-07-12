---
title: "Una bomba deja de entregar presión a las 03:17"
description: "Detección de una caída de presión fuera de horario, con escalamiento por Telegram, WhatsApp y SMS hasta que alguien responde."
date: "2026-06-30"
status: "prototipo"
category: "Alertas operacionales"
tags: ["industrial", "sensores", "escalamiento", "MQTT"]
problem: "Una condición crítica ocurre en un turno sin gente mirando la pantalla."
outcome: "El evento encuentra a una persona disponible en minutos, con registro completo."
featured: true
---

> **Estado: prototipo.** Este caso describe un flujo que hemos construido y probado en banco, no un despliegue en un cliente. Lo etiquetamos así a propósito.

## El problema

Las condiciones críticas no respetan el horario de oficina. Una bomba que pierde presión a las 03:17 lo hace exista o no alguien mirando el SCADA en ese momento. En muchas operaciones, ese momento es justamente cuando hay menos gente atenta.

## El flujo

1. **Detección.** El sensor reporta presión bajo el umbral. La lectura llega por MQTT.
2. **Evaluación.** No se dispara con una lectura aislada: se confirma que la condición persiste, para no reaccionar a un pico transitorio.
3. **Primera señal.** Telegram al operador de turno, con el contexto: qué bajó, desde cuándo, dónde.
4. **Escalamiento 1.** Sin respuesta en unos minutos → WhatsApp al supervisor.
5. **Escalamiento 2.** Aún sin respuesta → SMS, que no depende de datos ni de una app abierta.
6. **Registro.** Todo queda como incidente con su línea de tiempo: cuándo se detectó, a quién se avisó, quién respondió.

## Por qué está diseñado así

- **La persistencia antes de avisar** evita la fatiga de alertas por ruido transitorio.
- **El escalamiento en canales distintos** cubre el caso real: la primera persona puede estar durmiendo, sin señal o sin batería.
- **El SMS al final** es deliberado: es el canal más robusto cuando todo lo demás falla.

## Qué demuestra

Que sabemos construir la cadena completa —fuente industrial, evaluación, multicanal, escalamiento y registro— y que la diseñamos pensando en el momento en que **nadie está mirando**. Lo que falta para producción no es la lógica: es la integración con la instalación real, sus umbrales y sus responsables.

---

*¿Tienes una condición crítica que hoy solo se ve en una pantalla? [Descríbela](/contacto) y estudiamos cómo detectarla.*
