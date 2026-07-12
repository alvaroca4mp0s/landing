import { describe, it, expect } from "vitest";
import { leadSchema, summarizeLead } from "./leads";

const valid = {
  eventDescription: "Quiero saber cuando una bomba deja de entregar presión",
  location: "Un sensor",
  audience: "el operador de turno",
  impact: "se detiene la producción",
  channel: "Telegram",
  name: "Álvaro Campos",
  email: "Persona@Ejemplo.CL",
  consent: true,
};

describe("leadSchema", () => {
  it("acepta un lead válido y normaliza el correo", () => {
    const r = leadSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("persona@ejemplo.cl");
  });

  it("rechaza sin consentimiento", () => {
    const r = leadSchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
  });

  it("rechaza descripción demasiado corta", () => {
    const r = leadSchema.safeParse({ ...valid, eventDescription: "corto" });
    expect(r.success).toBe(false);
  });

  it("rechaza correo inválido", () => {
    const r = leadSchema.safeParse({ ...valid, email: "no-es-correo" });
    expect(r.success).toBe(false);
  });

  it("rechaza canal fuera del enum", () => {
    const r = leadSchema.safeParse({ ...valid, channel: "Paloma mensajera" });
    expect(r.success).toBe(false);
  });

  it("honeypot: rechaza cuando 'website' viene con contenido", () => {
    const r = leadSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(r.success).toBe(false);
  });

  it("honeypot: acepta 'website' vacío", () => {
    const r = leadSchema.safeParse({ ...valid, website: "" });
    expect(r.success).toBe(true);
  });

  it("urgencia opcional: acepta cadena vacía (usuario no eligió) y la normaliza a undefined", () => {
    const r = leadSchema.safeParse({ ...valid, urgency: "" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.urgency).toBeUndefined();
  });

  it("urgencia: acepta un valor válido del enum", () => {
    const r = leadSchema.safeParse({ ...valid, urgency: "El mismo día" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.urgency).toBe("El mismo día");
  });

  it("urgencia: rechaza un valor fuera del enum", () => {
    const r = leadSchema.safeParse({ ...valid, urgency: "Crítica (minutos)" });
    expect(r.success).toBe(false);
  });
});

describe("summarizeLead", () => {
  it("incluye las claves del caso", () => {
    const s = summarizeLead({
      eventDescription: "bomba sin presión",
      location: "Un sensor",
      locationDetail: "planta norte",
      audience: "operador",
      impact: "para la línea",
      channel: "SMS",
      urgency: "Inmediata (minutos)",
    });
    expect(s).toContain("Qué detectar: bomba sin presión");
    expect(s).toContain("Dónde ocurre: Un sensor — planta norte");
    expect(s).toContain("Canal deseado: SMS");
    expect(s).toContain("Urgencia: Inmediata (minutos)");
  });
});
