import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { LeadSummary } from "@/components/lead-summary";

export const metadata: Metadata = {
  title: "Recibimos tu caso",
  description: "Gracias. Revisaremos el evento que quieres detectar y te responderemos con una primera evaluación.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <div className="container-rl max-w-2xl py-20 text-center md:py-28">
      <span aria-hidden className="signal-dot mx-auto block h-3 w-3 rounded-full bg-signal" />
      <p className="meta mt-6">Caso recibido</p>
      <h1 className="mt-3 text-3xl leading-tight md:text-5xl">
        Gracias. Ya tenemos tu caso.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        Vamos a revisar el evento que quieres detectar y te responderemos con una
        primera evaluación de factibilidad al correo que nos dejaste. Si necesitamos
        entender mejor el contexto, te escribiremos con preguntas concretas.
      </p>

      <LeadSummary />

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/casos" variant="structure" size="lg">Ver casos y demostraciones</ButtonLink>
        <ButtonLink href="/ideas" variant="ghost" size="lg">Leer nuestras ideas</ButtonLink>
      </div>
      <p className="mt-8 text-sm text-ink-faint">
        No enviamos correos automáticos de marketing. Solo te escribiremos sobre tu caso.
      </p>
    </div>
  );
}
