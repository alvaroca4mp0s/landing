---
title: "Un producto cambia de precio en la competencia"
description: "Un crawler detecta cambios de precio en línea, valida la condición, evita duplicados y avisa solo cuando importa."
date: "2026-06-20"
status: "demostracion"
category: "Vigilancia de oportunidades"
tags: ["crawler", "precios", "retail", "monitoreo"]
problem: "Los precios cambian a cualquier hora y revisarlos a mano no escala."
outcome: "Una alerta accionable cuando un precio cruza el umbral, sin repetir lo ya avisado."
featured: true
---

> **Estado: demostración.** Flujo funcional que mostramos como concepto verificable. Los umbrales y las fuentes se ajustan a cada caso.

## El problema

Vigilar precios a mano no escala. Cambian a cualquier hora, en muchas páginas, y para cuando alguien revisa, la ventana de decisión puede haberse cerrado. Además, la mayoría de los cambios no importan: el desafío no es ver todos, es enterarse de los pocos que sí.

## El flujo

1. **Observación.** Un crawler revisa las páginas objetivo con una frecuencia definida.
2. **Detección.** Compara el precio actual con el anterior y detecta el cambio.
3. **Validación.** ¿El nuevo precio cruza el umbral que definimos? Si no, no es evento.
4. **Deduplicación.** Si ya avisamos por este cambio, no lo repetimos. Una causa, una señal.
5. **Aviso.** A las personas interesadas, por su canal.
6. **Histórico.** Se guarda la serie para comparar en el tiempo, no solo el último valor.

## Las decisiones que lo hacen útil

- **El umbral** convierte "cambió el precio" en "cambió lo suficiente como para que te importe".
- **La deduplicación** es lo que evita que el canal se vuelva ruido y la gente lo silencie.
- **El histórico** permite responder preguntas que una alerta suelta no puede: ¿esto es tendencia o un pulso?

## Qué demuestra

Que sabemos observar fuentes web, distinguir la señal del cambio irrelevante y respetar la atención de quien recibe. La ética importa aquí: monitoreamos información públicamente disponible y respetamos los términos y la carga de los sitios de origen.

---

*¿Hay precios, stock o publicaciones que quisieras vigilar sin revisarlos a mano? [Cuéntanos](/contacto).*
