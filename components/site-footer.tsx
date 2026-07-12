import Link from "next/link";
import { nav, site, primaryCta, waLink } from "@/lib/site";
import { Logo } from "@/components/logo";
import { CopyEmail } from "@/components/copy-email";

const extra = [
  { href: "/noise", label: "NOISE" },
  { href: "/privacidad", label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="container-rl grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Sistemas que detectan lo que importa y hacen que alguien actúe.
            Reducimos el tiempo entre un evento y una acción correcta.
          </p>
          <p className="meta mt-6">Santiago · Chile</p>
        </div>

        <nav aria-label="Navegación del sitio" className="text-sm">
          <p className="meta mb-3">Explorar</p>
          <ul className="space-y-2">
            {[...nav, ...extra].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/rss.xml" className="text-ink-soft hover:text-ink">
                RSS
              </a>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="meta mb-3">Conversar</p>
          <ul className="space-y-2">
            <li>
              <Link href={primaryCta.href} className="text-ink hover:text-signal">
                {primaryCta.label} →
              </Link>
            </li>
            <li>
              <CopyEmail email={site.email} />
            </li>
            <li>
              <a
                href={waLink("Hola, quiero conversar sobre detectar un evento con RedLocal.")}
                className="plausible-event-name=outbound_whatsapp text-ink-soft hover:text-ink"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.crmUrl}
                className="plausible-event-name=outbound_crm text-ink-soft hover:text-ink"
                rel="noopener noreferrer"
                target="_blank"
              >
                CRM comercial (Twenty)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-rl flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.</p>
          <p className="meta">evento → señal → acción</p>
        </div>
      </div>
    </footer>
  );
}
