import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="container-rl flex min-h-[60vh] max-w-2xl flex-col items-center justify-center py-20 text-center">
      <p className="meta text-signal">Error 404</p>
      <h1 className="mt-3 text-3xl leading-tight md:text-5xl">Esta señal no llegó a destino.</h1>
      <p className="mt-4 text-lg text-ink-soft">
        La página que buscas no existe o cambió de lugar. Pero desde aquí puedes
        volver a lo importante.
      </p>
      <div className="mt-8">
        <ButtonLink href="/" size="lg">Volver al inicio</ButtonLink>
      </div>
      <nav aria-label="Rutas de rescate" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-soft">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-ink">{item.label}</Link>
        ))}
      </nav>
    </div>
  );
}
