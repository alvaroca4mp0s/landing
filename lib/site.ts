/**
 * Constantes del sitio RedLocal. Fuente única para metadata, navegación,
 * contacto y datos estructurados. No contiene secretos.
 */

export const site = {
  name: "RedLocal",
  domain: "redlocal.cl",
  url: "https://redlocal.cl",
  legalName: "RedLocal SpA",
  tagline: "Cuando ocurra algo importante, lo sabrás a tiempo.",
  description:
    "RedLocal diseña sistemas que detectan eventos, filtran el ruido y avisan a la persona correcta por WhatsApp, Telegram, SMS o el canal que tu operación necesite.",
  email: "hola@redlocal.cl",
  // WhatsApp comercial (formato E.164 sin +, para wa.me)
  whatsapp: "56945818860",
  whatsappDisplay: "+56 9 4581 8860",
  crmUrl: "https://crm.redlocal.cl",
  locale: "es-CL",
  country: "CL",
} as const;

export const nav = [
  { href: "/soluciones", label: "Soluciones" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/casos", label: "Casos" },
  { href: "/opensource", label: "Open source" },
  { href: "/ideas", label: "Ideas" },
] as const;

export const primaryCta = {
  href: "/contacto",
  label: "Cuéntanos qué debería avisarte",
} as const;

export function waLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
