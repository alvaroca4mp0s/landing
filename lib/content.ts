import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Sistema de contenido basado en archivos Markdown con frontmatter validado.
 * Tres colecciones: articles (/ideas), cases (/casos), tools (/opensource).
 * Render 100% en servidor → cero JS de markdown al cliente.
 */

export const EVIDENCE_LEVELS = ["investigado", "probado", "implementado", "produccion"] as const;
export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];

export const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  investigado: "Investigado",
  probado: "Probado",
  implementado: "Implementado internamente",
  produccion: "En producción",
};

const baseFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  author: z.string().default("RedLocal"),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  evidenceLevel: z.enum(EVIDENCE_LEVELS).optional(),
});

const collections = {
  articles: baseFrontmatter,
  cases: baseFrontmatter.extend({
    status: z.enum(["prototipo", "demostracion", "sistema-interno", "piloto", "produccion"]),
    problem: z.string().optional(),
    outcome: z.string().optional(),
  }),
  tools: baseFrontmatter.extend({
    toolUrl: z.string().optional(),
    license: z.string().optional(),
  }),
} as const;

export type Collection = keyof typeof collections;

export type Entry<C extends Collection = Collection> = {
  slug: string;
  collection: C;
  frontmatter: z.infer<(typeof collections)[C]>;
  content: string;
  readingMinutes: number;
};

const ROOT = path.join(process.cwd(), "content");

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function readCollection<C extends Collection>(collection: C): Promise<Entry<C>[]> {
  const dir = path.join(ROOT, collection);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const schema = collections[collection];
  const entries: Entry<C>[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Frontmatter inválido en ${collection}/${file}: ${parsed.error.message}`);
    }
    if (parsed.data.draft && process.env.NODE_ENV === "production") continue;
    entries.push({
      slug: file.replace(/\.md$/, ""),
      collection,
      frontmatter: parsed.data as Entry<C>["frontmatter"],
      content,
      readingMinutes: readingTime(content),
    });
  }
  entries.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return entries;
}

export async function getAll<C extends Collection>(collection: C): Promise<Entry<C>[]> {
  return readCollection(collection);
}

export async function getEntry<C extends Collection>(collection: C, slug: string): Promise<Entry<C> | null> {
  const all = await readCollection(collection);
  return all.find((e) => e.slug === slug) ?? null;
}

export async function getSlugs(collection: Collection): Promise<string[]> {
  const all = await readCollection(collection);
  return all.map((e) => e.slug);
}
