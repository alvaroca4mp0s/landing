import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/components/content-bits";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Ideas",
    description:
      "Escribimos sobre señales, atención, alertas, automatización, observabilidad y software open source aplicado. Sin relleno.",
    path: "/ideas",
  }),
  alternates: {
    canonical: "/ideas",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default async function IdeasPage() {
  const articles = await getAll("articles");
  const [lead, ...rest] = articles;

  return (
    <div className="container-rl py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="meta mb-4">Publicación editorial</p>
        <h1 className="text-3xl leading-tight md:text-5xl">Ideas</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Señales, atención, alertas, automatización y open source aplicado.
          Contenido basado en lo que hacemos, con hechos, experiencia e
          inferencias diferenciados.
        </p>
      </header>

      {lead && (
        <Link
          href={`/ideas/${lead.slug}`}
          className="group mt-12 block rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8 transition-colors hover:border-line-strong md:p-10"
        >
          <span className="meta">{lead.frontmatter.category ?? "Destacado"} · lectura {lead.readingMinutes} min</span>
          <h2 className="mt-3 text-2xl leading-tight md:text-3xl">{lead.frontmatter.title}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{lead.frontmatter.description}</p>
          <span className="mt-5 inline-block text-structure group-hover:text-signal">Leer →</span>
        </Link>
      )}

      <ul className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-2">
        {rest.map((a) => (
          <li key={a.slug} className="bg-paper">
            <Link href={`/ideas/${a.slug}`} className="group block h-full p-7 transition-colors hover:bg-paper-2">
              <span className="meta">{a.frontmatter.category ?? "Idea"} · {a.readingMinutes} min · {formatDate(a.frontmatter.date)}</span>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{a.frontmatter.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
