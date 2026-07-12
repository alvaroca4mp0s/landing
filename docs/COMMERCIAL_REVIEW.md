# Revisión comercial (Fase 6)

Simulación de 7 perfiles de visitante sobre el sitio verificado en navegador (desktop 1280px y móvil 375px). Para cada uno: ¿entiende la oferta? ¿se reconoce en un problema? ¿confía? ¿encuentra evidencia? ¿sabe qué hacer? ¿qué objeción queda abierta? ¿qué fricción?

Fecha: 2026-07-11.

## 1. Gerente industrial (planta, operaciones)

- **Entiende**: sí. El H1 "Cuando ocurra algo importante, lo sabrás a tiempo" + el escenario "Una bomba deja de entregar presión a las 03:17" con escalamiento Telegram→WhatsApp→SMS le habla directo.
- **Se reconoce**: sí. "Saberlo cuando un equipo deja de responder", "cuando una temperatura supera un límite". Categoría "Integración y eventos industriales" (PLC/SCADA/Historian/MQTT/OPC UA) confirma que hablamos su idioma.
- **Confía**: alto. La matriz de capacidades lista fuentes industriales reales; el caso está etiquetado PROTOTIPO (no se le miente).
- **Evidencia**: sí (capacidades + caso etiquetado).
- **Sabe qué hacer**: sí, CTA dominante.
- **Objeción abierta**: "¿lo han hecho en una planta real como la mía?" — mitigada por honestidad (prototipo), pero es la tensión esperada de una empresa joven. Se aborda en la conversación, no ocultándolo.
- **Fricción**: ninguna relevante.

## 2. Dueño de pyme

- **Entiende**: sí, sin tecnicismos. "Cuando un cliente escribe fuera de horario y nadie responde" es su dolor.
- **Se reconoce**: sí. Categoría "Atención y seguimiento".
- **Confía**: media-alta. El lenguaje es sobrio, no de agencia. El caso "cliente fuera de horario" (SISTEMA INTERNO) muestra el flujo hasta el CRM.
- **Evidencia**: sí.
- **Sabe qué hacer**: sí. El formulario no exige vocabulario técnico.
- **Objeción abierta**: precio (no se muestra, decisión correcta: es a medida). Puede generar duda de "¿será caro?".
- **Fricción**: baja. El formulario de 6 pasos podría intimidar, pero el paso 1 es una sola pregunta abierta y amable.

## 3. Encargado de TI

- **Entiende**: sí, y aprecia la precisión. "Un dashboard espera que alguien mire" resuena con su fatiga de alertas.
- **Se reconoce**: sí. "Demasiadas notificaciones / cuando todo avisa, nada avisa".
- **Confía**: alta. La sección NOISE (deduplicación, ventanas, escalamiento) demuestra criterio de diseño, no solo tecnología. La página de Twenty CRM (token solo en servidor, backups probados) habla su idioma de operación.
- **Evidencia**: fuerte. CRM propio EN PRODUCCIÓN verificable en crm.redlocal.cl.
- **Sabe qué hacer**: sí.
- **Objeción abierta**: "¿se integra con mi stack (Grafana, n8n)?" — respondida: la home dice "no reemplazamos, trabajamos sobre" y hay fichas de n8n/Grafana.
- **Fricción**: ninguna.

## 4. Profesional que monitorea precios / oportunidades

- **Entiende**: sí. Categoría "Vigilancia de oportunidades" + caso "producto baja de precio" (DEMOSTRACIÓN).
- **Se reconoce**: sí. "cuando aparece una licitación", "cuando vuelve el stock".
- **Confía**: media-alta (caso etiquetado demostración, honesto).
- **Evidencia**: sí.
- **Sabe qué hacer**: sí.
- **Objeción abierta**: legalidad/estabilidad del scraping — no se promete nada irreal; se estudia el caso.
- **Fricción**: ninguna.

## 5. Persona con idea imprecisa

- **Entiende**: sí. No necesita saber la solución. La pregunta "¿Qué te gustaría saber antes, sin depender de que alguien esté mirando?" y el paso 1 abierto ("Descríbelo con tus palabras") están hechos para ella.
- **Se reconoce**: sí, en la lista de situaciones.
- **Confía**: media. Aún no sabe si "esto aplica a lo suyo", pero el "Todavía no lo sé" en el paso 2 baja la barrera.
- **Sabe qué hacer**: sí. Este es el perfil mejor atendido por el diseño del formulario.
- **Objeción abierta**: "¿mi caso es demasiado raro?" — mitigada por "Si puedes describir el evento, podemos estudiar cómo detectarlo".
- **Fricción**: mínima.

## 6. Visitante técnico (evalúa competencia)

- **Entiende**: sí, y busca profundidad.
- **Confía**: alta. `/como-funciona` (Beacon como motor, no chatbot), matriz de capacidades honesta ("no mostramos tecnologías que no operemos"), artículos que diferencian hecho/experiencia/inferencia, y el CRM real.
- **Evidencia**: la más fuerte del sitio para este perfil.
- **Objeción abierta**: querer ver repos/código — parcialmente abierta (hay proyecto Twenty enlazado; beacon-bootstrap no es público). Aceptable.
- **Fricción**: ninguna.

## 7. Visitante móvil con poca paciencia

- **Entiende**: sí, en <5s. Verificado a 375px: H1 grande, CTA rojo full-width dominante inmediato, secundario outline.
- **Se reconoce**: sí al primer scroll.
- **Sabe qué hacer**: sí. "Contáctanos" fijo en header + CTA en hero.
- **Objeción/fricción**: ninguna de bloqueo. Jerarquía y tap targets correctos.

## Hallazgos accionados en esta fase

1. **BUG de conversión (corregido)**: el paso 5 (urgencia) es opcional; si el usuario no elegía, el formulario enviaba `urgency: ""` y el servidor lo rechazaba con 422 → **nadie que omitiera urgencia podía enviar el caso**. Corregido en `lib/leads.ts` (`""` → `undefined`) + 3 tests de regresión + reverificado en navegador (llega a `/gracias`). Este es el defecto de mayor impacto comercial encontrado en toda la construcción.
2. **RSS no descubrible (corregido)**: la ruta `/rss.xml` existía pero no estaba enlazada; añadido `<link rel="alternate">` en `/ideas` y enlace en footer.

## Objeciones estructurales que NO se ocultan (decisión de marca)

- Empresa joven / casos aún no en producción para terceros: se declara con etiquetas honestas. Intentar disimularlo violaría la tesis y el §6 (no inventar). La conversación comercial es el lugar para resolverlo.
- Precio a medida: no se publica porque la oferta es diagnóstica, no un SKU. Coherente con "describe el evento → evaluación".

## Veredicto

El sitio cumple los criterios de aceptación de claridad comercial, credibilidad y conversión para los 7 perfiles. La conversión principal funciona extremo a extremo (formulario → `/api/lead` → Twenty o fallback a disco → `/gracias`). No se detectan fricciones de bloqueo pendientes.
