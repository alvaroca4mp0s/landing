import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";
import { SignalFlow } from "@/components/signal-flow";
import { process } from "@/lib/home-content";

export const metadata: Metadata = buildMetadata({
  title: "Cómo funciona",
  description:
    "La arquitectura conceptual de RedLocal: observar, detectar, interpretar, enrutar, escalar, registrar y actuar. Beacon es el motor de señales detrás de todo.",
  path: "/como-funciona",
});

export default function ComoFuncionaPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-rl">
        <header className="max-w-2xl">
          <p className="meta mb-4">Cómo funciona</p>
          <h1 className="text-3xl leading-tight md:text-5xl">De la fuente a la acción.</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            No necesitas entender la arquitectura para trabajar con nosotros. Pero
            si te interesa el detalle, esto es lo que ocurre entre un evento y la
            acción correcta.
          </p>
        </header>

        <div className="mt-12 rounded-[var(--radius-lg)] border border-line bg-paper p-5 md:p-8">
          <SignalFlow />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl leading-tight md:text-3xl">Las siete etapas</h2>
          <ol className="mt-8 space-y-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line">
            {process.map((p) => (
              <li key={p.n} className="grid gap-4 bg-paper p-6 sm:grid-cols-[4rem_1fr] md:p-8">
                <span className="font-display text-3xl text-signal">{p.n}</span>
                <div>
                  <h3 className="text-lg font-semibold">{p.v}</h3>
                  <p className="mt-1 text-ink-soft">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="meta mb-4 text-signal">El motor</p>
            <h2 className="text-2xl leading-tight md:text-3xl">Beacon</h2>
          </div>
          <div className="text-lg leading-relaxed text-ink-soft">
            <p>
              Detrás de cada implementación hay un mismo motor de señales: observa
              fuentes, interpreta contexto, decide, distribuye por el canal
              correcto, escala cuando nadie responde, registra evidencia y ejecuta
              acciones cuando corresponde.
            </p>
            <p className="mt-4">
              Beacon <strong className="text-ink">no es un chatbot.</strong> Es la
              infraestructura de eventos que convierte datos dispersos en una señal
              accionable. La conversación por WhatsApp o Telegram es solo la última
              capa —la que ve la persona—; debajo hay detección, evaluación y
              enrutamiento.
            </p>
          </div>
        </section>

        <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8 text-center md:p-12">
          <h2 className="text-2xl leading-tight md:text-3xl">No necesitas saber qué tecnología usar.</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">Solo dinos qué necesitas saber y cuándo. Del resto nos encargamos nosotros.</p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/contacto" size="lg">Cuéntanos qué debería avisarte</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
