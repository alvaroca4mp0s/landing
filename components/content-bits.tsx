import Link from "next/link";
import { cn } from "@/lib/utils";
import { EVIDENCE_LABEL, type EvidenceLevel } from "@/lib/content";

const CASE_STATUS: Record<string, string> = {
  prototipo: "Prototipo",
  demostracion: "Demostración",
  "sistema-interno": "Sistema interno",
  piloto: "Piloto",
  produccion: "En producción",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="meta inline-flex w-fit items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-0.5">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-structure" />
      {CASE_STATUS[status] ?? status}
    </span>
  );
}

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const strong = level === "produccion" || level === "implementado";
  return (
    <span
      className={cn(
        "meta inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        strong ? "border-signal text-signal-strong" : "border-line-strong",
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", strong ? "bg-signal" : "bg-ink-faint")} />
      {EVIDENCE_LABEL[level]}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link href={item.path} className="hover:text-ink">{item.name}</Link>
            ) : (
              <span aria-current="page" className="text-ink-soft">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
