/** Copy de la home. Editable sin tocar componentes. Español de Chile neutro. */

export const situations = [
  "cuando un equipo deja de responder",
  "cuando una temperatura supera un límite",
  "cuando un precio cambia",
  "cuando aparece una licitación",
  "cuando vuelve el stock de un producto",
  "cuando una orden queda detenida",
  "cuando vence un contrato",
  "cuando un cliente espera demasiado",
  "cuando un proceso depende de que alguien mire una pantalla",
  "cuando nadie está mirando",
];

export const friction = [
  { t: "Demasiados sistemas", d: "La información existe, pero vive repartida en pantallas que nadie revisa a la vez." },
  { t: "Demasiadas notificaciones", d: "Cuando todo avisa, nada avisa. La alerta importante queda enterrada." },
  { t: "Información sin dueño", d: "El dato llega, pero no a la persona que puede actuar sobre él." },
  { t: "Alarmas sin contexto", d: "Un número rojo no dice qué pasó, qué tan grave es ni qué hacer." },
  { t: "Sin escalamiento", d: "Si el primero no responde, no hay un segundo. El evento se apaga solo." },
  { t: "Depende de una persona", d: "Todo funciona… mientras esa persona esté mirando. Después, silencio." },
];

export const process = [
  { n: "01", v: "Observamos", d: "Conectamos tus fuentes: máquinas, sensores, sitios, correos, bases de datos, sistemas internos." },
  { n: "02", v: "Detectamos", d: "Reconocemos el evento en medio del flujo, aunque llegue en formatos distintos." },
  { n: "03", v: "Evaluamos", d: "Aplicamos contexto y prioridad: ¿esto merece interrumpir a alguien ahora?" },
  { n: "04", v: "Avisamos", d: "Enviamos una señal clara a la persona correcta, por el canal que ya usa." },
  { n: "05", v: "Escalamos", d: "Si nadie responde a tiempo, subimos al siguiente responsable. No se pierde." },
  { n: "06", v: "Registramos", d: "Queda evidencia: qué pasó, cuándo, a quién se avisó y qué se hizo." },
  { n: "07", v: "Actuamos", d: "Cuando corresponde y con reglas claras, ejecutamos la acción automática." },
];

export const categories = [
  {
    slug: "alertas-operacionales",
    title: "Alertas operacionales",
    d: "Detección de fallas, desviaciones, detenciones, vencimientos o condiciones críticas antes de que escalen.",
  },
  {
    slug: "vigilancia-de-oportunidades",
    title: "Vigilancia de oportunidades",
    d: "Monitoreo de precios, stock, licitaciones, publicaciones y cambios que abren una ventana comercial.",
  },
  {
    slug: "atencion-y-seguimiento",
    title: "Atención y seguimiento",
    d: "Detección, respuesta, derivación y escalamiento de solicitudes de clientes, soporte o ventas.",
  },
  {
    slug: "integracion-y-eventos-industriales",
    title: "Integración y eventos industriales",
    d: "Conexión con sensores, PLC, SCADA, Historian, MQTT, OPC UA, APIs y bases de datos.",
  },
];

export const scenarios = [
  {
    tag: "Prototipo",
    title: "Una bomba deja de entregar presión a las 03:17",
    steps: [
      "El sensor reporta presión bajo el umbral.",
      "Se evalúa: no es una lectura aislada, la condición persiste.",
      "Telegram al operador de turno con el contexto.",
      "Sin respuesta en 4 minutos → WhatsApp al supervisor.",
      "Aún sin respuesta → SMS como último escalamiento.",
      "Todo queda registrado como incidente con su línea de tiempo.",
    ],
  },
  {
    tag: "Demostración",
    title: "Un producto baja de precio en un supermercado",
    steps: [
      "Un crawler revisa la página y detecta el cambio de precio.",
      "Valida la condición: cae bajo el umbral definido.",
      "Evita duplicados: no repite una alerta ya enviada.",
      "Avisa a las personas interesadas por su canal.",
      "Guarda el histórico para comparar en el tiempo.",
    ],
  },
  {
    tag: "Sistema interno",
    title: "Un cliente escribe fuera de horario",
    steps: [
      "El mensaje entra por WhatsApp fuera de horario.",
      "Se clasifica la intención y la urgencia.",
      "Responde de inmediato con un primer acuse útil.",
      "Crea una oportunidad en Twenty CRM.",
      "La asigna a la persona correcta para el seguimiento.",
    ],
  },
];

export const capabilities = {
  Fuentes: ["APIs", "Bases de datos", "Sitios web", "MQTT", "OPC UA", "Correo", "Formularios", "Archivos", "Sensores", "PLC", "SCADA", "Historian"],
  "Inteligencia y reglas": ["Reglas de negocio", "Ventanas temporales", "Correlación", "Deduplicación", "Clasificación", "Modelos de IA cuando aportan valor"],
  Canales: ["WhatsApp", "Telegram", "SMS", "Email", "Webhook", "CRM", "Ticket", "Dashboard"],
  Operación: ["Auditoría", "Logs", "Reintentos", "Escalamiento", "Trazabilidad", "Despliegue local o cloud"],
} as const;
