---
title: "Grafana"
description: "Visualización y dashboards para métricas de todo tipo. Excelente para ver; por sí solo, no avisa."
date: "2026-06-15"
category: "Observabilidad"
tags: ["observabilidad", "dashboards", "métricas", "open source"]
toolUrl: "https://grafana.com/oss/"
license: "AGPL-3.0"
evidenceLevel: "probado"
featured: false
---

> **Estado de la experiencia: probado.** Lo hemos levantado y usado para visualizar métricas. Lo incluimos aquí, además, para ser consecuentes: un dashboard es útil, pero [no es un sistema de alertas](/ideas/dashboard-no-es-sistema-de-alertas).

## Qué es

Grafana es una plataforma open source para visualizar datos de series temporales y otras fuentes: dashboards, paneles y exploración de métricas provenientes de bases de datos, sistemas de monitoreo y más.

## Qué problema resuelve

Ver. Reúne métricas dispersas en una vista coherente y permite explorar, comparar y entender tendencias. Para investigar y para reuniones, es excelente.

## Para quién sirve

Equipos que ya recolectan métricas y necesitan visualizarlas y explorarlas en un solo lugar.

## Para quién no sirve

Quien crea que un dashboard lo mantendrá informado sin mirarlo. Grafana tiene alertas, pero un tablero abierto no es una estrategia de alerta: alguien tiene que mirarlo, o algo tiene que actuar cuando nadie mira.

## Arquitectura

Servidor Grafana que se conecta a fuentes de datos (Prometheus, bases de datos, etc.). No almacena las métricas: las lee de donde viven.

## Requisitos

Un servidor y, sobre todo, fuentes de datos ya existentes. Grafana visualiza; alguien más recolecta.

## Instalación resumida

Contenedor o paquete. Levantarlo es simple; el trabajo real está en las fuentes de datos y en diseñar tableros que digan algo.

## Seguridad

Autenticación, control de acceso a los tableros y cuidado con qué fuentes de datos expone y a quién.

## Backups

Configuración, tableros y fuentes de datos. Los tableros bien hechos son trabajo valioso: versiónalos.

## Operación

Mantener tableros que sigan siendo relevantes (los que nadie mira son deuda visual) y decidir qué de todo esto merece convertirse en una alerta real.

## Integraciones

Amplio ecosistema de fuentes de datos y de plugins.

## Costos ocultos

El costo no es el software: es la disciplina de que los tableros signifiquen algo y no se multipliquen sin dueño. Y el riesgo de fondo: confundir "lo tenemos en un dashboard" con "nos vamos a enterar".

## Evaluación de RedLocal

Excelente para su propósito. Lo recomendamos para ver. Para *enterarse cuando nadie está mirando*, hace falta la capa que actúa —que es, justamente, lo que hacemos—.

---

*¿Tienes Grafana y aun así se te escapan cosas? Probablemente no te falta otra pantalla. [Conversemos](/contacto).*
