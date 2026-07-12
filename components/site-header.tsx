"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, primaryCta } from "@/lib/site";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="container-rl flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink",
                  active && "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={primaryCta.href} size="md" className="plausible-event-name=hero_cta_clicked">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ButtonLink
            href={primaryCta.href}
            size="md"
            className="plausible-event-name=hero_cta_clicked h-9 px-3 text-sm"
          >
            Contáctanos
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="border-t border-line bg-paper md:hidden">
          <nav aria-label="Principal móvil" className="container-rl flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base text-ink"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={primaryCta.href}
              size="lg"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              {primaryCta.label}
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
