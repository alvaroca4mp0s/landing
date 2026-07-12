import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getEntry, getSlugs } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Caso de RedLocal";

export async function generateStaticParams() {
  return (await getSlugs("cases")).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry("cases", slug);
  return renderOgImage({
    eyebrow: entry?.frontmatter.category ?? "Casos",
    title: entry?.frontmatter.title ?? "RedLocal",
  });
}
