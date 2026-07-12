import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAll } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/soluciones`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/como-funciona`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/casos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/opensource`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/ideas`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/noise`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [articles, cases, tools] = await Promise.all([
    getAll("articles"),
    getAll("cases"),
    getAll("tools"),
  ]);

  const dynamic: MetadataRoute.Sitemap = [
    ...articles.map((a) => ({
      url: `${site.url}/ideas/${a.slug}`,
      lastModified: new Date(a.frontmatter.updated ?? a.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...cases.map((c) => ({
      url: `${site.url}/casos/${c.slug}`,
      lastModified: new Date(c.frontmatter.updated ?? c.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...tools.map((t) => ({
      url: `${site.url}/opensource/${t.slug}`,
      lastModified: new Date(t.frontmatter.updated ?? t.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamic];
}
