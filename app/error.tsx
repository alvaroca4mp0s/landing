"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // No volcamos datos sensibles: solo el digest para correlación en logs.
    console.error("[app error]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="container-rl flex min-h-[60vh] max-w-2xl flex-col items-center justify-center py-20 text-center">
      <p className="meta text-signal">Algo falló</p>
      <h1 className="mt-3 text-3xl leading-tight md:text-5xl">Tuvimos un problema al procesar esto.</h1>
      <p className="mt-4 text-lg text-ink-soft">
        No es tu culpa. Puedes intentar de nuevo; si persiste, escríbenos a{" "}
        <a href="mailto:hola@redlocal.cl" className="underline hover:text-ink">hola@redlocal.cl</a>.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-signal px-6 text-[0.95rem] font-medium text-white hover:bg-signal-strong"
        >
          Intentar de nuevo
        </button>
        <ButtonLink href="/" size="lg" variant="structure">Volver al inicio</ButtonLink>
      </div>
    </div>
  );
}
