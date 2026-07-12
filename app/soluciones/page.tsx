import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";
import { getAll } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Soluciones — qué podemos detectar",
  description:
    "Cuatro formas de entrar: alertas operacionales, vigilancia de oportunidades, atención y seguimiento, e integración industrial. Son ejemplos, no límites.",
  path: "/soluciones",
});

const solutions = [
  {
    slug: "alertas-operacionales",
    title: "Alertas operacionales",
    lead: "Detección de fallas, desviaciones, detenciones, vencimientos o condiciones críticas antes de que escalen.",
    examples: [
      "Un equipo deja de responder o sale de su rango normal.",
      "Una temperatura, presión o nivel cruza un umbral.",
      "Una orden o proceso queda detenido más de lo aceptable.",
      "Un contrato, certificación o licencia está por vencer.",
    ],
  },
  {
    slug: "vigilancia-de-oportunidades",
    title: "Vigilancia de oportunidades",
    lead: "Monitoreo de precios, stock, licitaciones, publicaciones y cambios que abren una ventana comercial.",
    examples: [
      "Un precio de la competencia cruza un umbral definido.",
      "Vuelve el stock de un producto que esperabas.",
      "Aparece una licitación o publicación de tu rubro.",
      "Cambia una condición en un marketplace o sitio.",
    ],
  },
  {
    slug: "atencion-y-seguimiento",
    title: "Atención y seguimiento",
    lead: "Detección, respuesta, derivación y escalamiento de solicitudes de clientes, soporte o ventas.",
    examples: [
      "Un cliente escribe fuera de horario y nadie responde.",
      "Una solicitud lleva demasiado tiempo sin dueño.",
      "Un caso necesita derivarse a la persona correcta.",
      "Un mensaje debe convertirse en oportunidad en el CRM.",
    ],
  },
  {
    slug: "integracion-y-eventos-industriales",
    title: "Integración y eventos industriales",
    lead: "Conexión con sensores, PLC, SCADA, Historian, MQTT, OPC UA, APIs y bases de datos.",
    examples: [
      "Leer eventos desde un PLC o SCADA existente.",
      "Suscribirse a tópicos MQTT o nodos OPC UA.",
      "Correlacionar señales de varias fuentes.",
      "Llevar un evento industrial a un canal humano.",
    ],
  },
];

export default async function SolucionesPage() {
  const cases = await getAll("cases");

  return (
    <div className="py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd({ name: "Detección de eventos y alertas multicanal", description: metadata.description as string, path: "/soluciones" })) }} />

      <div className="container-rl">
        <header className="max-w-2xl">
          <p className="meta mb-4">Soluciones</p>
          <h1 className="text-3xl leading-tight md:text-5xl">Qué podemos detectar.</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Cuatro puntos de partida frecuentes. No son los límites: si tu caso no
            encaja exactamente en uno, probablemente igual podemos abordarlo. La
            regla es simple —si puedes describir el evento, podemos estudiar cómo
            detectarlo—.
          </p>
        </header>

        <div className="mt-14 space-y-16">
          {solutions.map((s) => {
            const relatedCase = cases.find((c) => c.frontmatter.category === s.title);
            return (
              <section key={s.slug} id={s.slug} className="scroll-mt-24 border-t border-line pt-8">
                <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
                  <div>
                    <h2 className="text-2xl leading-tight md:text-3xl">{s.title}</h2>
                    <p className="mt-3 text-ink-soft">{s.lead}</p>
                    {relatedCase && (
                      <Link href={`/casos/${relatedCase.slug}`} className="mt-4 inline-block text-sm text-structure hover:text-signal">
                        Ver caso: {relatedCase.frontmatter.title} →
                      </Link>
                    )}
                  </div>
                  <ul className="grid gap-px self-start overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
                    {s.examples.map((ex) => (
                      <li key={ex} className="bg-paper p-5 text-sm text-ink-soft">{ex}</li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-paper-2 p-8 text-center md:p-12">
          <h2 className="text-2xl leading-tight md:text-3xl">¿Tu caso no está en la lista?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">Mejor. Las listas son ejemplos. Descríbenos el evento que quieres detectar y te decimos si es factible.</p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/contacto" size="lg">Cuéntanos qué debería avisarte</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
