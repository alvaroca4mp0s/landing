import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad",
  description: "Qué datos recopila RedLocal, para qué y cómo los protege. Minimización, consentimiento y sin marketing automático.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <div className="container-rl max-w-3xl py-16 md:py-24">
      <p className="meta mb-4">Privacidad</p>
      <h1 className="text-3xl leading-tight md:text-5xl">Política de privacidad</h1>
      <p className="mt-3 text-sm text-ink-faint">Última actualización: julio de 2026.</p>

      <div className="prose-rl mt-10">
        <p>
          En RedLocal recopilamos la mínima cantidad de datos necesaria para
          responder a tu consulta y mejorar este sitio. Este documento explica qué
          datos, para qué y cómo los tratamos.
        </p>

        <h2>Qué datos recopilamos</h2>
        <ul>
          <li>
            <strong>Los que nos entregas en el formulario:</strong> la descripción
            del evento que quieres detectar, dónde ocurre, quién debe enterarse, el
            impacto, el canal deseado y tus datos de contacto (nombre, correo y,
            opcionalmente, empresa y teléfono).
          </li>
          <li>
            <strong>Analítica sin cookies:</strong> usamos Plausible Analytics, que
            mide visitas de forma agregada y <strong>sin cookies ni identificadores
            personales</strong>. No construimos perfiles ni te seguimos entre sitios.
          </li>
        </ul>

        <h2>Para qué los usamos</h2>
        <ul>
          <li>Para responder a tu consulta con una evaluación de tu caso.</li>
          <li>Para gestionar la conversación comercial en nuestro CRM.</li>
          <li>Para entender, de forma agregada, qué contenido es útil.</li>
        </ul>
        <p>
          <strong>No</strong> usamos tus datos para marketing automático, ni los
          vendemos, ni los cedemos a terceros con fines publicitarios.
        </p>

        <h2>Dónde se almacenan</h2>
        <p>
          Los datos del formulario se registran en nuestro sistema comercial
          (una instancia de Twenty CRM que operamos nosotros). Aplicamos medidas
          razonables de seguridad: acceso restringido, cifrado en tránsito y
          minimización de datos.
        </p>

        <h2>Consentimiento</h2>
        <p>
          Al enviar el formulario nos autorizas expresamente a usar esos datos para
          los fines descritos. Es un consentimiento específico: no lo interpretamos
          como permiso para nada más.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes pedirnos acceder, corregir o eliminar tus datos escribiendo a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Responderemos en un
          plazo razonable.
        </p>

        <h2>Contacto</h2>
        <p>
          Ante cualquier duda sobre esta política, escríbenos a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </div>
  );
}
