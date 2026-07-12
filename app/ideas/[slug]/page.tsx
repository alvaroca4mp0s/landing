import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAll, getEntry, getSlugs } from "@/lib/content";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Markdown } from "@/components/markdown";
import { Breadcrumbs, formatDate } from "@/components/content-bits";
import { ButtonLink } from "@/components/ui/button";
import { ArticleTracker } from "@/components/article-tracker";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSlugs("articles")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("articles", slug);
  if (!entry) return {};
  const fm = entry.frontmatter;
  return buildMetadata({
    title: fm.seoTitle ?? fm.title,
    description: fm.seoDescription ?? fm.description,
    path: `/ideas/${slug}`,
    type: "article",
    publishedTime: fm.date,
    modifiedTime: fm.updated ?? fm.date,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry("articles", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const related = (await getAll("articles")).filter((a) => a.slug !== slug).slice(0, 2);
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Ideas", path: "/ideas" },
    { name: fm.title, path: `/ideas/${slug}` },
  ];

  return (
    <article className="container-rl max-w-3xl py-14 md:py-20">
      <ArticleTracker slug={slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title: fm.title, description: fm.description, path: `/ideas/${slug}`, published: fm.date, updated: fm.updated })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <Breadcrumbs items={crumbs} />

      <header>
        <p className="meta">{fm.category ?? "Idea"} · {entry.readingMinutes} min de lectura · {formatDate(fm.date)}</p>
        <h1 className="mt-3 text-3xl leading-[1.1] md:text-5xl">{fm.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-soft">{fm.description}</p>
      </header>

      <hr className="rule my-10" />

      <Markdown>{entry.content}</Markdown>

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-8">
          <p className="meta mb-4">Sigue leyendo</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/ideas/${r.slug}`} className="group block rounded-[var(--radius)] border border-line p-5 hover:border-line-strong">
                  <h3 className="font-semibold leading-snug group-hover:text-signal">{r.frontmatter.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{r.frontmatter.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <aside className="mt-14 rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8 text-center">
        <p className="text-lg font-display md:text-xl">¿Esto te suena a un problema que tienes?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">Describe el evento que quieres detectar y te respondemos con una primera evaluación.</p>
        <div className="mt-5 flex justify-center">
          <ButtonLink href="/contacto" size="lg" className="plausible-event-name=article_cta_clicked">Cuéntanos qué debería avisarte</ButtonLink>
        </div>
      </aside>
    </article>
  );
}
