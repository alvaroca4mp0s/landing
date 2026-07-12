---
title: "n8n"
description: "Automatización de flujos con nodos, autohospedable. Útil para conectar servicios sin escribir todo desde cero."
date: "2026-07-01"
category: "Automatización"
tags: ["automatización", "workflows", "open source", "integración"]
toolUrl: "https://n8n.io"
license: "Sustainable Use License"
evidenceLevel: "implementado"
featured: false
---

> **Estado de la experiencia: implementado internamente.** Lo hemos usado para orquestar flujos; no es el motor de nuestras integraciones críticas, pero sí una herramienta que conocemos operando.

## Qué es

n8n es una plataforma de automatización basada en nodos: conectas disparadores y acciones en un lienzo visual para mover datos entre servicios y ejecutar lógica sin construir cada integración a mano.

## Qué problema resuelve

Conectar sistemas que no se hablan entre sí: "cuando pase X en el servicio A, haz Y en el servicio B". Reduce el código repetitivo de integraciones comunes.

## Para quién sirve

Equipos que necesitan orquestar flujos entre servicios y prefieren un lienzo visual mantenible antes que scripts sueltos. Autohospedable, lo que da control sobre datos y credenciales.

## Para quién no sirve

Casos donde la lógica es tan específica o el rendimiento tan crítico que conviene código dedicado. Un lienzo con demasiada lógica puede volverse difícil de mantener: es un riesgo real.

## Arquitectura

Aplicación Node con base de datos para estado y credenciales. Se autohospeda con contenedores.

## Requisitos

Servidor con Docker, base de datos, y gestión cuidadosa de las credenciales que almacena (son la llave a todos los servicios conectados).

## Instalación resumida

Docker Compose para levantarlo. Como siempre, verlo andar es rápido; operarlo con credenciales reales exige cuidado.

## Seguridad

n8n guarda credenciales de terceros: es un objetivo valioso. Autenticación fuerte, cifrado, acceso restringido y actualizaciones al día son innegociables.

## Backups

Base de datos con los flujos y las credenciales. Respaldar y probar la restauración; perder los flujos es perder trabajo, perder las credenciales es un incidente.

## Operación

Monitorear ejecuciones fallidas, versionar los flujos importantes y evitar que el lienzo acumule lógica crítica sin documentar.

## Integraciones

Cientos de nodos para servicios comunes, más nodos genéricos (HTTP, webhook) para lo que no tiene nodo propio.

## Costos ocultos

La facilidad inicial invita a poner lógica de negocio crítica en flujos visuales. Cuando esa lógica crece, mantenerla y depurarla cuesta. La disciplina de mantenerlo simple es el costo real.

## Alternativas

Automatizaciones gestionadas en la nube (menos control, menos operación) o código propio (más control, más trabajo). n8n queda en el medio.

## Evaluación de RedLocal

Buena herramienta para orquestación y prototipos, y para flujos no críticos. Para lo crítico preferimos control explícito. La distinción entre [instalar y operar](/ideas/instalar-no-es-operar) aplica de lleno.

---

*¿Quieres conectar tus sistemas sin que se vuelva inmanejable? [Cuéntanos qué necesitas mover](/contacto).*
