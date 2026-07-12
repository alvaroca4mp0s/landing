import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { EvidenceBadge } from "@/components/content-bits";

export const metadata: Metadata = buildMetadata({
  title: "Open source",
  description:
    "Directorio editorial de herramientas open source: qué resuelven, cuándo conviene autohospedarlas y qué complejidad real implica operarlas.",
  path: "/opensource",
});

export default async function OpenSourcePage() {
  const tools = await getAll("tools");

  return (
    <div className="container-rl py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="meta mb-4">Directorio editorial</p>
        <h1 className="text-3xl leading-tight md:text-5xl">Open source, evaluado con honestidad.</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Te mostramos cómo funciona cada herramienta, qué resuelve, cuándo tiene
          sentido autohospedarla y qué complejidad real implica operarla. Porque{" "}
          <Link href="/ideas/instalar-no-es-operar" className="underline hover:text-ink">instalar no es operar</Link>.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link href={`/opensource/${t.slug}`} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors hover:border-line-strong">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold group-hover:text-signal">{t.frontmatter.title}</h2>
                <span className="meta">{t.frontmatter.category}</span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.frontmatter.description}</p>
              <div className="mt-5">
                {t.frontmatter.evidenceLevel && <EvidenceBadge level={t.frontmatter.evidenceLevel} />}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
