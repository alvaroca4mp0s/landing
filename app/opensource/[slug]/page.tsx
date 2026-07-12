import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, getSlugs } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Markdown } from "@/components/markdown";
import { Breadcrumbs, EvidenceBadge, formatDate } from "@/components/content-bits";
import { ButtonLink } from "@/components/ui/button";
import { ArticleTracker } from "@/components/article-tracker";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSlugs("tools")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("tools", slug);
  if (!entry) return {};
  const fm = entry.frontmatter;
  return buildMetadata({
    title: `${fm.seoTitle ?? fm.title} — evaluación open source`,
    description: fm.seoDescription ?? fm.description,
    path: `/opensource/${slug}`,
    type: "article",
    publishedTime: fm.date,
  });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry("tools", slug);
  if (!entry) notFound();
  const fm = entry.frontmatter;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Open source", path: "/opensource" },
    { name: fm.title, path: `/opensource/${slug}` },
  ];

  return (
    <article className="container-rl max-w-3xl py-14 md:py-20">
      <ArticleTracker slug={slug} event="tool_viewed" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <Breadcrumbs items={crumbs} />

      <header>
        <div className="flex flex-wrap items-center gap-3">
          {fm.evidenceLevel && <EvidenceBadge level={fm.evidenceLevel} />}
          <span className="meta">{fm.category}{fm.license ? ` · ${fm.license}` : ""} · {formatDate(fm.date)}</span>
        </div>
        <h1 className="mt-4 text-3xl leading-[1.1] md:text-5xl">{fm.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-soft">{fm.description}</p>
        {fm.toolUrl && (
          <a href={fm.toolUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-structure underline hover:text-signal">
            Sitio del proyecto ↗
          </a>
        )}
      </header>

      <hr className="rule my-10" />
      <Markdown>{entry.content}</Markdown>

      <aside className="mt-14 rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8">
        <p className="text-lg font-display md:text-xl">¿Evalúas esta herramienta para tu caso?</p>
        <p className="mt-2 text-sm text-ink-soft">Podemos ayudarte a decidir si sirve, a implementarla o a integrarla con tus sistemas.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/contacto" size="md" className="plausible-event-name=tool_cta_clicked">Necesito ayuda para implementarlo</ButtonLink>
          <ButtonLink href="/contacto" size="md" variant="structure">Quiero integrarlo con mis sistemas</ButtonLink>
        </div>
      </aside>
    </article>
  );
}
