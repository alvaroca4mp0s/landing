---
title: "Twenty CRM"
description: "Un CRM open source con modelo de datos limpio y API. Lo autohospedamos y lo usamos como nuestro sistema comercial."
date: "2026-07-08"
category: "CRM"
tags: ["CRM", "open source", "self-hosting", "API"]
toolUrl: "https://twenty.com"
license: "AGPL-3.0"
evidenceLevel: "produccion"
featured: true
---

> **Estado de la experiencia: en producción.** Autohospedamos Twenty en `crm.redlocal.cl` y lo usamos como nuestro CRM comercial real. Lo que sigue viene de operarlo, no de leer su documentación.

## Qué es

Twenty es un CRM open source. Maneja las entidades que uno espera —personas, empresas, oportunidades, notas, tareas— con un modelo de datos limpio y personalizable, y expone API REST y GraphQL.

## Qué problema resuelve

Ordenar la relación con clientes y prospectos cuando una planilla deja de alcanzar: quién es cada contacto, a qué empresa pertenece, en qué etapa está cada oportunidad, de dónde vino y quién le hace seguimiento.

## Para quién sirve

Equipos que quieren control de sus datos comerciales, capacidad de integrar el CRM con sus propios sistemas y una alternativa autohospedable a las suites cerradas.

## Para quién no sirve

Quien necesite hoy un ecosistema maduro de automatización de marketing, integraciones nativas con decenas de servicios o soporte empresarial contractual. Twenty avanza rápido pero es más joven que las suites establecidas.

## Arquitectura

Aplicación web con backend en Node y base de datos PostgreSQL, más una capa de almacenamiento. Se despliega con contenedores detrás de un reverse proxy con TLS.

## Requisitos

Un servidor con Docker, Postgres, un dominio con certificado y capacidad para mantener actualizaciones. Nada exótico, pero sí una operación sostenida.

## Instalación resumida

El proyecto ofrece despliegue con Docker Compose. Levantarlo para verlo funcionando es cuestión de una tarde. Que quede listo para depender de él es otra conversación —ver *costos ocultos*—.

## Seguridad

- Nunca exponer la API sin autenticación fuerte.
- El token de la API es sensible: en integraciones, vive solo en el servidor, jamás en el navegador.
- Mantener actualizado y detrás de TLS.

## Backups

PostgreSQL más el almacenamiento de archivos. La regla que aplicamos: un backup no probado es una hipótesis. Los nuestros se restauran de prueba.

## Operación

Actualizaciones planificadas (Twenty se mueve rápido y a veces cambia el modelo), monitoreo de disponibilidad y una rutina de respaldo verificada.

## Integraciones

API REST y GraphQL. Nosotros integramos nuestro formulario comercial: un manejador en el servidor crea o actualiza persona y oportunidad, con deduplicación por correo. El navegador nunca toca el CRM.

## Costos ocultos

El costo no es la licencia —es gratis— sino el tiempo de operarlo: actualizaciones, backups probados, seguridad y el conocimiento de cómo funciona, que no puede vivir en una sola cabeza.

## Alternativas

Las suites cerradas resuelven la operación a cambio de control y costo recurrente. Otros CRM open source existen; la elección depende de cuánto pesa la API y el control del dato en tu caso.

## Evaluación de RedLocal

Para nosotros fue la decisión correcta: queríamos control, API y coherencia con lo que proponemos. No es la respuesta universal. Como todo self-hosting, [instalar no es operar](/ideas/instalar-no-es-operar).

---

*¿Quieres un CRM open source integrado con tus sistemas, operado en serio? [Conversemos tu caso](/contacto).*
