/**
 * Reproceso de leads en cola (fallback → Twenty CRM).
 *
 * Cuando Twenty no está configurado o no responde, cada lead se guarda como JSON
 * en `data/leads/` (ver lib/crm/store.ts) para no perderlo nunca. Este script
 * empuja esos leads a Twenty una vez que el CRM vuelve a estar disponible, usando
 * exactamente la misma lógica que el formulario (lib/crm/twenty-core.ts).
 *
 * Uso (desde la raíz del repo, con TWENTY_API_KEY en el entorno):
 *   TWENTY_API_KEY=xxxx npm run reprocess-leads
 *   TWENTY_API_KEY=xxxx npm run reprocess-leads -- --dry-run
 *
 * Los leads procesados con éxito se mueven a `data/leads/processed/`; no se borran.
 * Los que fallan se quedan en su sitio para reintentar. Es idempotente por email
 * en Twenty (findPersonByEmail) salvo por la oportunidad, que se crea siempre —
 * por eso movemos el archivo tras el éxito para no duplicar en una segunda pasada.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { upsertLeadTo } from "../lib/crm/twenty-core";
import type { Lead } from "../lib/leads";

const DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), "data", "leads");
const PROCESSED = path.join(DIR, "processed");
const API_URL = (process.env.TWENTY_API_URL ?? "https://crm.redlocal.cl/rest").replace(/\/$/, "");
const API_KEY = process.env.TWENTY_API_KEY;
const DRY = process.argv.includes("--dry-run");

async function main() {
  if (!API_KEY || API_KEY.length <= 10) {
    console.error("✗ Falta TWENTY_API_KEY (o es demasiado corta). Aborto sin tocar nada.");
    process.exit(1);
  }

  let files: string[];
  try {
    files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    console.log(`No existe ${DIR}. Nada que reprocesar.`);
    return;
  }

  if (files.length === 0) {
    console.log("Cola vacía: no hay leads pendientes.");
    return;
  }

  console.log(`${files.length} lead(s) en cola${DRY ? " (dry-run: no se envía nada)" : ""}.`);
  const cfg = { apiUrl: API_URL, apiKey: API_KEY };
  let ok = 0;
  let failed = 0;

  for (const file of files) {
    const full = path.join(DIR, file);
    let lead: Lead;
    try {
      lead = JSON.parse(await fs.readFile(full, "utf8")) as Lead;
    } catch {
      console.warn(`  ! ${file}: JSON ilegible, se omite.`);
      failed++;
      continue;
    }

    if (DRY) {
      console.log(`  · ${file}: se enviaría (${lead.email})`);
      continue;
    }

    const res = await upsertLeadTo(cfg, lead);
    if (res.ok) {
      await fs.mkdir(PROCESSED, { recursive: true });
      await fs.rename(full, path.join(PROCESSED, file));
      console.log(`  ✓ ${file}: creado en Twenty (persona ${res.personId ?? "?"}).`);
      ok++;
    } else {
      console.warn(`  ✗ ${file}: ${res.reason}. Se mantiene en cola para reintentar.`);
      failed++;
    }
  }

  console.log(`\nListo. Éxitos: ${ok} · Fallidos/omitidos: ${failed}.`);
  if (failed > 0 && !DRY) process.exit(2);
}

main().catch((err) => {
  console.error("Error inesperado:", err);
  process.exit(1);
});
