import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lead } from "@/lib/leads";

/**
 * Fallback: si Twenty no está configurado o no responde, el lead se persiste
 * en disco para no perderlo nunca. Directorio configurable con LEADS_DIR.
 * Este directorio NO se versiona (ver .gitignore) y no debe exponerse.
 */
const DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), "data", "leads");

export async function persistLead(lead: Lead): Promise<void> {
  await fs.mkdir(DIR, { recursive: true });
  const file = path.join(DIR, `${lead.receivedAt.slice(0, 10)}_${lead.id}.json`);
  await fs.writeFile(file, JSON.stringify(lead, null, 2), "utf8");
}
