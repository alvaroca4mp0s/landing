import { z } from "zod";

/**
 * Modelo del lead comercial ("Cuéntanos qué debería avisarte").
 * Validado en servidor. No se confía en nada que venga del navegador.
 */

export const LOCATIONS = [
  "Un sistema o software",
  "Una máquina o equipo",
  "Una página web",
  "Correo electrónico",
  "Una base de datos",
  "Un documento",
  "Un sensor",
  "CRM",
  "ERP",
  "Todavía no lo sé",
  "Otro",
] as const;

export const CHANNELS = [
  "WhatsApp",
  "Telegram",
  "SMS",
  "Email",
  "Un sistema interno",
  "No lo sé todavía",
] as const;

export const URGENCIES = [
  "Inmediata (minutos)",
  "El mismo día",
  "Puede esperar",
  "No lo sé",
] as const;

const trimmed = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

export const leadSchema = z.object({
  // Paso 1 — qué detectar (esencial)
  eventDescription: trimmed(10, 1200),
  // Paso 2 — dónde ocurre
  location: z.enum(LOCATIONS),
  locationDetail: z.string().trim().max(300).optional().default(""),
  // Paso 3 — quién debe enterarse
  audience: trimmed(2, 300),
  // Paso 4 — impacto si nadie lo detecta
  impact: trimmed(2, 800),
  // Paso 5 — canal deseado
  channel: z.enum(CHANNELS),
  // Urgencia es opcional en la UI: el navegador envía "" cuando no se elige.
  // Normalizamos "" → undefined para no rechazar un envío legítimo.
  urgency: z.preprocess((v) => (v === "" ? undefined : v), z.enum(URGENCIES).optional()),
  // Paso 6 — contacto
  name: trimmed(2, 120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  consent: z.literal(true),
  // Metadatos de origen (no PII sensible)
  sourcePage: z.string().trim().max(300).optional().default("/contacto"),
  campaign: z.string().trim().max(120).optional().default(""),
  // Honeypot: debe venir vacío. Un bot lo rellena.
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Lead ya validado y enriquecido para persistir/enviar. */
export type Lead = Omit<LeadInput, "website"> & {
  id: string;
  receivedAt: string;
};

/** Resumen legible del caso para nota de CRM y pantalla de gracias. */
export function summarizeLead(lead: Pick<LeadInput,
  "eventDescription" | "location" | "locationDetail" | "audience" | "impact" | "channel" | "urgency">): string {
  const where = lead.locationDetail
    ? `${lead.location} — ${lead.locationDetail}`
    : lead.location;
  const lines = [
    `Qué detectar: ${lead.eventDescription}`,
    `Dónde ocurre: ${where}`,
    `Quién debe enterarse: ${lead.audience}`,
    `Impacto si nadie lo detecta: ${lead.impact}`,
    `Canal deseado: ${lead.channel}`,
  ];
  if (lead.urgency) lines.push(`Urgencia: ${lead.urgency}`);
  return lines.join("\n");
}
