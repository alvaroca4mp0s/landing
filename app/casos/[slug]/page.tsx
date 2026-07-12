import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntry, getSlugs } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Markdown } from "@/components/markdown";
import { Breadcrumbs, StatusBadge, formatDate } from "@/components/content-bits";
import { ButtonLink } from "@/components/ui/button";
import { ArticleTracker } from "@/components/article-tracker";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSlugs("cases")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("cases", slug);
  if (!entry) return {};
  const fm = entry.frontmatter;
  return buildMetadata({
    title: fm.seoTitle ?? fm.title,
    description: fm.seoDescription ?? fm.description,
    path: `/casos/${slug}`,
    type: "article",
    publishedTime: fm.date,
  });
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry("cases", slug);
  if (!entry) notFound();
  const fm = entry.frontmatter;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Casos", path: "/casos" },
    { name: fm.title, path: `/casos/${slug}` },
  ];

  return (
    <article className="container-rl max-w-3xl py-14 md:py-20">
      <ArticleTracker slug={slug} event="case_viewed" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <Breadcrumbs items={crumbs} />

      <header>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={fm.status} />
          <span className="meta">{fm.category} · {formatDate(fm.date)}</span>
        </div>
        <h1 className="mt-4 text-3xl leading-[1.1] md:text-5xl">{fm.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-soft">{fm.description}</p>
      </header>

      <hr className="rule my-10" />
      <Markdown>{entry.content}</Markdown>

      <aside className="mt-14 rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8 text-center">
        <p className="text-lg font-display md:text-xl">¿Tu caso se parece a este?</p>
        <div className="mt-5 flex justify-center">
          <ButtonLink href="/contacto" size="lg" className="plausible-event-name=article_cta_clicked">Cuéntanos qué debería avisarte</ButtonLink>
        </div>
      </aside>
    </article>
  );
}
