import type { Lead } from "@/lib/leads";
import { summarizeLead } from "@/lib/leads";

/**
 * Núcleo REST de Twenty CRM: funciones puras, SIN acceso a variables de entorno
 * y SIN `server-only`. Reciben la configuración (apiUrl + apiKey) por parámetro.
 *
 * Esto permite reutilizar exactamente la misma lógica desde:
 *  - el adaptador de request (`lib/crm/twenty.ts`, que lee el token del entorno
 *    y añade la guarda `server-only`);
 *  - el script de reproceso de leads en cola (`scripts/reprocess-leads.mjs`).
 *
 * Al no leer secretos por sí mismo, es seguro que este módulo no esté guardado:
 * quien lo use debe proveer las credenciales explícitamente.
 */

export type TwentyConfig = { apiUrl: string; apiKey: string; timeoutMs?: number };
export type TwentyResult =
  | { ok: true; personId?: string; opportunityId?: string }
  | { ok: false; reason: string };

async function req<T>(cfg: TwentyConfig, method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${cfg.apiUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(cfg.timeoutMs ?? 6000),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twenty ${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0]!, lastName: "" };
  return { firstName: parts[0]!, lastName: parts.slice(1).join(" ") };
}

async function findPersonByEmail(cfg: TwentyConfig, email: string): Promise<string | undefined> {
  const q = encodeURIComponent(`emails.primaryEmail[eq]:${email}`);
  const data = await req<{ data?: { people?: Array<{ id: string }> } }>(
    cfg,
    "GET",
    `/people?filter=${q}&limit=1`,
  );
  return data.data?.people?.[0]?.id;
}

async function createPerson(cfg: TwentyConfig, lead: Lead): Promise<string | undefined> {
  const name = splitName(lead.name);
  const body: Record<string, unknown> = {
    name,
    emails: { primaryEmail: lead.email },
  };
  if (lead.phone) body.phones = { primaryPhoneNumber: lead.phone };
  if (lead.company) body.jobTitle = lead.company;
  const data = await req<{ data?: { createPerson?: { id: string } } }>(cfg, "POST", "/people", body);
  return data.data?.createPerson?.id;
}

async function createOpportunity(cfg: TwentyConfig, lead: Lead, personId?: string): Promise<string | undefined> {
  const body: Record<string, unknown> = {
    name: `Detectar: ${lead.eventDescription.slice(0, 70)}`,
    stage: "NEW",
  };
  if (personId) body.pointOfContactId = personId;
  const data = await req<{ data?: { createOpportunity?: { id: string } } }>(
    cfg,
    "POST",
    "/opportunities",
    body,
  );
  return data.data?.createOpportunity?.id;
}

async function attachNote(
  cfg: TwentyConfig,
  lead: Lead,
  targets: { personId?: string; opportunityId?: string },
): Promise<void> {
  const bodyText = [
    summarizeLead(lead),
    "",
    `Origen: ${lead.sourcePage}${lead.campaign ? ` · campaña ${lead.campaign}` : ""}`,
    `Consentimiento: sí (${lead.receivedAt})`,
  ].join("\n");

  const note = await req<{ data?: { createNote?: { id: string } } }>(cfg, "POST", "/notes", {
    title: `Caso descrito — ${lead.name}`,
    body: bodyText,
  });
  const noteId = note.data?.createNote?.id;
  if (!noteId) return;

  const links: Array<Record<string, string>> = [];
  if (targets.personId) links.push({ noteId, personId: targets.personId });
  if (targets.opportunityId) links.push({ noteId, opportunityId: targets.opportunityId });
  for (const link of links) {
    await req(cfg, "POST", "/noteTargets", link).catch(() => undefined);
  }
}

/** Crea/actualiza persona + oportunidad + nota. Nunca lanza: devuelve el resultado. */
export async function upsertLeadTo(cfg: TwentyConfig, lead: Lead): Promise<TwentyResult> {
  try {
    let personId = await findPersonByEmail(cfg, lead.email).catch(() => undefined);
    if (!personId) personId = await createPerson(cfg, lead);
    const opportunityId = await createOpportunity(cfg, lead, personId);
    await attachNote(cfg, lead, { personId, opportunityId }).catch(() => undefined);
    return { ok: true, personId, opportunityId };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "unknown" };
  }
}
