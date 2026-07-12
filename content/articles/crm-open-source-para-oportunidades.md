---
title: "Cómo implementamos un CRM open source para gestionar oportunidades"
description: "Autohospedamos Twenty CRM para que cada conversación comercial quede registrada y asignada. Esto es lo que aprendimos operándolo."
date: "2026-07-08"
category: "Open source"
tags: ["Twenty CRM", "self-hosting", "CRM", "open source"]
featured: true
evidenceLevel: "produccion"
---

Predicamos que un evento importante debe terminar en una acción con dueño y con registro. Sería incoherente no aplicarlo a nuestra propia operación comercial. Por eso autohospedamos un CRM open source —[Twenty](https://twenty.com)— en `crm.redlocal.cl`, y lo usamos de verdad: cada conversación que empieza en este sitio puede convertirse en una oportunidad registrada y asignada.

Este artículo documenta **solo lo que podemos verificar de nuestra propia implementación.** No es una guía universal ni una comparativa exhaustiva.

## Por qué Twenty y no una planilla

Una planilla funciona hasta que deja de funcionar: cuando hay más de una persona, cuando importa quién hace seguimiento, cuando quieres saber de dónde vino cada conversación. Necesitábamos tres cosas concretas:

- Un lugar donde **persona, empresa y oportunidad** sean entidades reales y relacionadas.
- **Origen** de cada oportunidad (qué página, qué campaña).
- Que fuera **autohospedable** y con una API para integrarlo con nuestros propios sistemas.

Twenty cumple las tres. Es open source, tiene un modelo de datos limpio y expone una API REST y GraphQL.

## La arquitectura, en simple

- Twenty corre en nuestra infraestructura, detrás de un reverse proxy con TLS.
- El formulario de este sitio **no habla directo con el CRM desde el navegador.** Un manejador en el servidor recibe el caso, lo valida y recién ahí usa la API de Twenty con un token que nunca sale del backend.
- Si el CRM no está disponible en ese instante, el caso se persiste igual y no se pierde. La conversación con el cliente no depende de que un servicio interno esté arriba.

Esa última decisión es deliberada: un lead nunca debería perderse porque una pieza de infraestructura tuvo un mal momento.

## Lo que aprendimos operándolo

- **El token es lo más sensible.** Vive solo en el servidor, en variables de entorno, nunca en el bundle del cliente. Exponerlo sería regalar acceso de escritura al CRM.
- **La deduplicación importa desde el día uno.** Buscar la persona por correo antes de crearla evita duplicados que después cuesta limpiar.
- **Actualizar requiere plan.** Twenty avanza rápido. Las actualizaciones traen mejoras reales, y por eso mismo hay que leerlas: un modelo de datos que cambia puede afectar una integración.
- **Los backups se prueban.** Un respaldo que nunca se restauró es una hipótesis. Los nuestros se verifican.

## Lo que este caso demuestra —y lo que no

Demuestra que operamos infraestructura propia, que integramos de forma segura y que aplicamos a nosotros mismos lo que proponemos. **No** afirma que Twenty sea la respuesta correcta para cualquier empresa: como todo self-hosting, [instalar no es operar](/ideas/instalar-no-es-operar), y esa distinción decide si conviene o no en cada caso.

---

*¿Quieres un CRM open source integrado con tus sistemas, sin exponer nada que no debas? [Conversemos tu caso](/contacto).*
