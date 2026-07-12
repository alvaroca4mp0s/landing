import "server-only";
import type { Lead } from "@/lib/leads";
import { upsertLeadTo, type TwentyResult } from "@/lib/crm/twenty-core";

/**
 * Adaptador para la instancia autohospedada de Twenty CRM (crm.redlocal.cl).
 *
 * Reglas de seguridad:
 *  - El token vive SOLO en el servidor (TWENTY_API_KEY). Nunca en el bundle cliente.
 *    Por eso este módulo lleva `server-only`: importarlo desde un componente cliente
 *    rompe el build en vez de filtrar el secreto.
 *  - La lógica REST pura vive en `twenty-core.ts` (sin secretos, reutilizable por el
 *    script de reproceso). Aquí solo inyectamos la configuración desde el entorno.
 *  - Si no hay token configurado, el adaptador se declara "no configurado" y el
 *    route handler persiste el lead en disco (fallback). Ver docs/CRM_INTEGRATION.md.
 */

const API_URL = process.env.TWENTY_API_URL?.replace(/\/$/, "") ?? "https://crm.redlocal.cl/rest";
const API_KEY = process.env.TWENTY_API_KEY;

export function isConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.length > 10);
}

/** Crea/actualiza persona + oportunidad + nota. Nunca lanza: devuelve el resultado. */
export async function upsertLead(lead: Lead): Promise<TwentyResult> {
  if (!isConfigured()) return { ok: false, reason: "not_configured" };
  return upsertLeadTo({ apiUrl: API_URL, apiKey: API_KEY! }, lead);
}
