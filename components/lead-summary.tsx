"use client";

import { useEffect, useState } from "react";

type Summary = {
  eventDescription: string;
  location: string;
  audience: string;
  channel: string;
};

export function LeadSummary() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rl_lead_summary");
      // Hidratación una sola vez tras montar: leer en render rompería el SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSummary(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  if (!summary) return null;

  const rows: Array<[string, string]> = [
    ["Qué detectar", summary.eventDescription],
    ["Dónde ocurre", summary.location],
    ["Quién se entera", summary.audience],
    ["Canal", summary.channel],
  ];

  return (
    <dl className="mt-8 divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-paper text-left">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 px-5 py-3.5">
          <dt className="meta">{k}</dt>
          <dd className="text-sm text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
