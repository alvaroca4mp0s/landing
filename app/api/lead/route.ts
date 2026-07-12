import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { leadSchema, type Lead } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";
import { isConfigured, upsertLead } from "@/lib/crm/twenty";
import { persistLead } from "@/lib/crm/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  // 1. Rate limit por IP
  const ip = clientIp(req);
  const rl = rateLimit(`lead:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta nuevamente en un momento." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // 2. Parseo seguro
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // 3. Validación (incluye honeypot: website debe venir vacío)
  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    // Honeypot lleno → respondemos 200 silencioso para no dar pistas al bot.
    if (typeof (json as Record<string, unknown>)?.website === "string" && (json as Record<string, unknown>).website) {
      return NextResponse.json({ ok: true, id: "ok" });
    }
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Revisa los campos marcados.", fields: fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const lead: Lead = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    eventDescription: data.eventDescription,
    location: data.location,
    locationDetail: data.locationDetail,
    audience: data.audience,
    impact: data.impact,
    channel: data.channel,
    urgency: data.urgency,
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    consent: data.consent,
    sourcePage: data.sourcePage,
    campaign: data.campaign,
  };

  // 4. Enviar a CRM; si falla o no está configurado, persistir en disco.
  let delivered = false;
  if (isConfigured()) {
    const result = await upsertLead(lead);
    delivered = result.ok;
    if (!result.ok) {
      // Log sin PII sensible: solo el motivo técnico.
      console.error(`[lead] CRM no aceptó el lead ${lead.id}: ${result.reason}`);
    }
  }

  if (!delivered) {
    try {
      await persistLead(lead);
    } catch (err) {
      console.error(`[lead] Falló persistencia en disco del lead ${lead.id}:`, err instanceof Error ? err.message : err);
      // Último recurso: registrar en logs que existió el lead (sin volcar todo el texto).
      return NextResponse.json(
        { ok: false, error: "No pudimos registrar tu caso. Escríbenos a hola@redlocal.cl." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
