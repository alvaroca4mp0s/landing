import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { StatusBadge } from "@/components/content-bits";

export const metadata: Metadata = buildMetadata({
  title: "Casos y demostraciones",
  description:
    "Casos reales, sistemas internos, prototipos y demostraciones. Cada uno etiquetado con honestidad sobre su estado.",
  path: "/casos",
});

export default async function CasosPage() {
  const cases = await getAll("cases");

  return (
    <div className="container-rl py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="meta mb-4">Casos</p>
        <h1 className="text-3xl leading-tight md:text-5xl">Evidencia, etiquetada con honestidad.</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          No inventamos clientes ni resultados. Cada caso indica su estado real:
          prototipo, demostración o sistema interno. Si algo no está en producción
          para un tercero, lo decimos.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {cases.map((c) => (
          <li key={c.slug}>
            <Link href={`/casos/${c.slug}`} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors hover:border-line-strong">
              <div className="flex items-center justify-between gap-3">
                <StatusBadge status={c.frontmatter.status} />
                <span className="meta">{c.frontmatter.category}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-snug group-hover:text-signal">{c.frontmatter.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.frontmatter.description}</p>
              {c.frontmatter.outcome && (
                <p className="mt-4 border-t border-line pt-3 text-sm text-ink">
                  <span className="meta mr-2">Resultado</span>{c.frontmatter.outcome}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
