import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { buildMetadata } from "@/lib/seo";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cuéntanos qué debería avisarte",
  description:
    "Describe el evento que necesitas detectar y te respondemos con una primera evaluación de factibilidad. No necesitas saber qué tecnología usar.",
  path: "/contacto",
});

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ utm_campaign?: string; campaign?: string }>;
}) {
  const params = await searchParams;
  const campaign = params.campaign ?? params.utm_campaign ?? "";

  return (
    <div className="container-rl grid gap-12 py-16 md:grid-cols-[1fr_1.15fr] md:py-24">
      <div className="md:sticky md:top-24 md:self-start">
        <p className="meta mb-4 text-signal">Evaluación inicial de señales</p>
        <h1 className="text-3xl leading-tight md:text-5xl">
          No necesitas saber qué tecnología usar.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Solo dinos qué necesitas saber y cuándo necesitas saberlo. Son seis
          preguntas cortas. Con eso te respondemos con una primera evaluación de
          factibilidad, sin compromiso.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-ink-soft">
          {[
            "Describe el evento con tus palabras, sin tecnicismos.",
            "Nos dices dónde ocurre y quién debe enterarse.",
            "Te respondemos si es factible detectarlo y cómo.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-line pt-6 text-sm text-ink-faint">
          <p>¿Prefieres escribir directo?</p>
          <p className="mt-1">
            <a href={`mailto:${site.email}`} className="text-ink-soft underline hover:text-ink">{site.email}</a>
            {" · "}
            <a
              href={waLink("Hola, quiero conversar sobre detectar un evento con RedLocal.")}
              target="_blank"
              rel="noopener noreferrer"
              className="plausible-event-name=outbound_whatsapp text-ink-soft underline hover:text-ink"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
          </p>
        </div>
      </div>

      <ContactForm campaign={campaign} sourcePage="/contacto" />
    </div>
  );
}
