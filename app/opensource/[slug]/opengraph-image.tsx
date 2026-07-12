import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getEntry, getSlugs } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Evaluación open source de RedLocal";

export async function generateStaticParams() {
  return (await getSlugs("tools")).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry("tools", slug);
  return renderOgImage({
    eyebrow: `Open source · ${entry?.frontmatter.category ?? ""}`,
    title: entry?.frontmatter.title ?? "RedLocal",
  });
}
