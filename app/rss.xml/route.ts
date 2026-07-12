import { getAll } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getAll("articles");
  const items = articles
    .map((a) => {
      const url = `${site.url}/ideas/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(a.frontmatter.description)}</description>
      ${a.frontmatter.category ? `<category>${escapeXml(a.frontmatter.category)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RedLocal · Ideas</title>
    <link>${site.url}/ideas</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Señales, atención, alertas, automatización y open source aplicado.</description>
    <language>es-CL</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
