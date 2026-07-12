import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { SignalFlow } from "@/components/signal-flow";
import { site } from "@/lib/site";
import { serviceJsonLd } from "@/lib/seo";
import {
  situations,
  friction,
  process,
  categories,
  scenarios,
  capabilities,
} from "@/lib/home-content";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Sistemas de detección de eventos y alertas",
              description: site.description,
              path: "/",
            }),
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="border-b border-line">
        <div className="container-rl grid items-center gap-12 py-16 md:grid-cols-[1.05fr_1fr] md:py-24">
          <div>
            <p className="meta mb-5 text-signal">
              Lo importante no debería depender de que alguien esté mirando
            </p>
            <h1 className="text-4xl leading-[1.05] md:text-6xl">
              Cuando ocurra algo importante, lo sabrás a tiempo.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Diseñamos sistemas que observan tus fuentes de información
              —máquinas, sensores, sitios web, correos, sistemas internos—,
              detectan los eventos que importan, filtran el ruido y avisan a la
              persona correcta por WhatsApp, Telegram, SMS, correo o el canal
              que tu operación necesite.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contacto"
                size="lg"
                className="plausible-event-name=hero_cta_clicked"
              >
                Cuéntanos qué debería avisarte
              </ButtonLink>
              <ButtonLink href="/soluciones" size="lg" variant="structure">
                Ver qué podemos detectar
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-line bg-paper p-4 md:p-6">
            <SignalFlow />
          </div>
        </div>
      </section>

      {/* ── Identificación ── */}
      <Section alt>
        <SectionHeading
          eyebrow="Reconocimiento"
          title="¿Te serviría saberlo antes?"
          lead="Piensa en tu operación. Casi siempre hay un momento que, de haberlo sabido a tiempo, habría cambiado la decisión."
        />
        <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-2">
          {situations.map((s) => (
            <li key={s} className="flex items-start gap-3 border-t border-line pt-3 text-ink-soft">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              <span>Saberlo {s}.</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xl font-display text-ink md:text-2xl">
          Si puedes describir el evento, podemos estudiar cómo detectarlo.
        </p>
      </Section>

      {/* ── Fricción ── */}
      <Section>
        <SectionHeading
          eyebrow="Por qué hoy se pierde"
          title="El problema rara vez es tu equipo. Es estructural."
          lead="La información importante ya existe. El punto es que llega tarde, llega incompleta o llega a quien no puede hacer nada con ella."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {friction.map((f) => (
            <div key={f.t} className="bg-paper p-6">
              <h3 className="text-base font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Propuesta / proceso ── */}
      <Section alt>
        <SectionHeading
          eyebrow="Cómo trabajamos el evento"
          title="De la fuente a la acción, sin silencios en el medio."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <li key={p.n} className="border-t-2 border-ink pt-4">
              <span className="meta">{p.n}</span>
              <h3 className="mt-1 text-lg font-semibold">{p.v}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Categorías ── */}
      <Section>
        <SectionHeading
          eyebrow="Dónde suele empezar"
          title="Cuatro formas de entrar. No son los límites."
          lead="Son puntos de partida frecuentes. Si tu caso no encaja exactamente en uno, probablemente igual podemos abordarlo."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/soluciones#${c.slug}`}
              className="group rounded-[var(--radius)] border border-line bg-paper p-6 transition-colors hover:border-line-strong"
            >
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.d}</p>
              <span className="mt-4 inline-block text-sm text-structure group-hover:text-signal">
                Ver ejemplos →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Escenarios ── */}
      <Section alt>
        <SectionHeading
          eyebrow="Escenarios"
          title="Así se ve un evento convertido en señal."
          lead="Ejemplos concretos, etiquetados con honestidad: lo que hoy es prototipo, demostración o sistema interno."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {scenarios.map((sc) => (
            <article key={sc.title} className="flex flex-col rounded-[var(--radius)] border border-line bg-paper p-6">
              <span className="meta mb-3 inline-flex w-fit items-center rounded-full border border-line-strong px-2 py-0.5">
                {sc.tag}
              </span>
              <h3 className="text-base font-semibold leading-snug">{sc.title}</h3>
              <ol className="mt-4 space-y-2.5">
                {sc.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-soft">
                    <span className="meta mt-0.5 shrink-0 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Diferenciador ── */}
      <Section>
        <div className="max-w-3xl">
          <Eyebrow>La diferencia</Eyebrow>
          <p className="text-2xl leading-snug md:text-4xl">
            Los dashboards sirven cuando alguien tiene tiempo para mirar.{" "}
            <span className="text-signal">RedLocal existe para cuando nadie está mirando.</span>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            No venimos a reemplazar tus dashboards, tu observabilidad ni tus
            sistemas actuales. Trabajamos sobre ellos: los convertimos en algo
            que actúa cuando la información lo exige, en lugar de esperar a que
            alguien la note.
          </p>
        </div>
      </Section>

      {/* ── NOISE ── */}
      <Section alt>
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>NOISE · nuestra disciplina</Eyebrow>
            <h2 className="text-2xl leading-tight md:text-4xl">Menos mensajes. Más señales.</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Cada alerta innecesaria consume atención. Cada alerta perdida
              genera riesgo. Diseñamos sistemas para interrumpir solo cuando
              existe una razón real para actuar.
            </p>
            <Link href="/noise" className="mt-6 inline-block text-structure hover:text-signal">
              Leer el marco NOISE →
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-[var(--radius)] border border-line bg-line">
            {["Contexto", "Prioridad", "Destinatario", "Horario", "Canal", "Escalamiento", "Deduplicación", "Evidencia"].map((d) => (
              <li key={d} className="bg-paper-2 px-4 py-5 text-sm font-medium">{d}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Evidencia técnica ── */}
      <Section>
        <SectionHeading
          eyebrow="Capacidades"
          title="Competencia técnica, agrupada por función."
          lead="No mostramos tecnologías que no operemos. Esto es lo que efectivamente conectamos, evaluamos y enviamos."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(capabilities).map(([group, items]) => (
            <div key={group}>
              <h3 className="meta border-b border-line pb-2 text-ink">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((it) => (
                  <li key={it} className="rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink-soft">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Cómo comenzar / CTA final ── */}
      <Section alt className="border-b-0">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Cómo comenzar</Eyebrow>
          <h2 className="text-3xl leading-tight md:text-5xl">
            No necesitas saber qué tecnología usar.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Solo dinos qué necesitas saber y cuándo necesitas saberlo. Describes
            el evento, dónde ocurre, quién debe enterarse y qué pasa hoy si nadie
            lo detecta. Te respondemos con una primera evaluación de factibilidad.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contacto" size="lg" className="plausible-event-name=hero_cta_clicked">
              Cuéntanos qué debería avisarte
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
