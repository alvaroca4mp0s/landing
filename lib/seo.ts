import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Construye metadata por página con canonical y OG coherentes. */
export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${site.url}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      url,
      title: input.title,
      description: input.description,
      siteName: site.name,
      locale: "es_CL",
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed: "CL",
    knowsAbout: [
      "Sistemas de alertas",
      "Detección de eventos",
      "Automatización orientada a eventos",
      "Integración industrial (MQTT, OPC UA, SCADA)",
      "Monitoreo de precios y oportunidades",
      "Software open source autohospedado",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: ["es"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "es-CL",
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: "es-CL",
    datePublished: input.published,
    dateModified: input.updated ?? input.published,
    mainEntityOfPage: `${site.url}${input.path}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "CL",
    url: `${site.url}${input.path}`,
  };
}
