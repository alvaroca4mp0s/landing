#!/usr/bin/env node
/**
 * Reprocesa los leads que quedaron en disco (fallback del CRM) reenviándolos
 * al endpoint /api/lead una vez que Twenty vuelve a estar disponible.
 *
 * Uso:
 *   BASE_URL=https://redlocal.cl LEADS_DIR=/var/lib/redlocal/leads \
 *     node scripts/reprocess-leads.mjs
 *
 * Los leads procesados con éxito se mueven a <LEADS_DIR>/processed/.
 * Requiere que el sitio esté corriendo y con TWENTY_API_KEY configurada.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), "data", "leads");
const PROCESSED = path.join(DIR, "processed");

function post(lead) {
  return fetch(`${BASE_URL}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

async function main() {
  let files;
  try {
    files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    console.log(`No hay directorio de leads en ${DIR}. Nada que hacer.`);
    return;
  }

  if (files.length === 0) {
    console.log("No hay leads pendientes.");
    return;
  }

  await fs.mkdir(PROCESSED, { recursive: true });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let ok = 0;
  let fail = 0;

  for (const file of files) {
    const full = path.join(DIR, file);
    const lead = JSON.parse(await fs.readFile(full, "utf8"));
    try {
      let res = await post(lead);
      // Respeta el rate limit del endpoint: si 429, espera y reintenta una vez.
      if (res.status === 429) {
        const wait = Number(res.headers.get("Retry-After") ?? "60") + 1;
        console.log(`… rate limit; esperando ${wait}s`);
        await sleep(wait * 1000);
        res = await post(lead);
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        await fs.rename(full, path.join(PROCESSED, file));
        console.log(`✓ ${file}`);
        ok++;
      } else {
        console.error(`✗ ${file} → ${res.status} ${JSON.stringify(data)}`);
        fail++;
      }
    } catch (err) {
      console.error(`✗ ${file} → ${err.message}`);
      fail++;
    }
    await sleep(250);
  }

  console.log(`\nListo. ${ok} reenviados, ${fail} con error.`);
  if (fail > 0) process.exitCode = 1;
}

main();
