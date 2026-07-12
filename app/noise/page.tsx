import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "NOISE — menos mensajes, más señales",
  description:
    "NOISE es la disciplina de RedLocal: la atención es el recurso más escaso de una organización. Diseñamos sistemas para interrumpir solo cuando hay razón para actuar.",
  path: "/noise",
});

const dimensions = [
  { t: "Contexto", d: "La alerta trae la respuesta a «¿y ahora qué?». No un número rojo suelto." },
  { t: "Prioridad", d: "No todo lo anómalo es urgente. La señal se gana el derecho a interrumpir." },
  { t: "Destinatario", d: "A quien puede actuar, no a todos. Si le llega a todos, no es de nadie." },
  { t: "Horario", d: "Interrumpir de noche es una decisión, no un default." },
  { t: "Canal", d: "Por donde la persona ya mira, no uno que la obligue a un hábito nuevo." },
  { t: "Escalamiento", d: "El silencio del primero no es el final: la señal sube al siguiente." },
  { t: "Deduplicación", d: "Una causa, una señal. Cien avisos de lo mismo son uno que sigue vigente." },
  { t: "Evidencia", d: "Qué pasó, a quién se avisó y qué se hizo. Para aprender y para confiar." },
];

export default function NoisePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-rl max-w-3xl">
        <p className="meta mb-4 text-signal">NOISE · el marco</p>
        <h1 className="text-4xl leading-[1.05] md:text-6xl">Menos mensajes. Más señales.</h1>

        <div className="prose-rl mt-8">
          <p className="text-xl">
            La atención es uno de los recursos más escasos de una persona y de una
            organización. NOISE es la hipótesis que guía nuestro trabajo:{" "}
            <strong>el problema no es la falta de datos, es el exceso de ruido.</strong>
          </p>
          <p>
            Cada alerta innecesaria consume atención. Cada alerta perdida genera
            riesgo. Entre esos dos errores —interrumpir de más e interrumpir de
            menos— vive todo el diseño de un buen sistema de señales.
          </p>
          <p>
            Por eso no buscamos enviar más notificaciones. Buscamos identificar qué
            información merece interrumpir a una persona. NOISE no es una teoría
            abstracta: es una disciplina de diseño con ocho dimensiones concretas.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2">
          {dimensions.map((dim, i) => (
            <div key={dim.t} className="bg-paper p-6">
              <div className="flex items-baseline gap-3">
                <span className="meta text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-lg font-semibold">{dim.t}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dim.d}</p>
            </div>
          ))}
        </div>

        <div className="prose-rl mt-12">
          <blockquote>
            El activo más frágil y más valioso de todo el sistema es que, cuando
            avisa, se le crea.
          </blockquote>
          <p>
            Una señal diseñada con estos criterios se atiende porque se la ganó.
            Profundizamos en cómo aplicarla en{" "}
            <Link href="/ideas/de-evento-a-senal">De evento a señal</Link>.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-display">¿Tienes un canal que la gente ya aprendió a ignorar?</p>
          <ButtonLink href="/contacto" size="lg">Rediseñemos la señal</ButtonLink>
        </div>
      </div>
    </div>
  );
}
