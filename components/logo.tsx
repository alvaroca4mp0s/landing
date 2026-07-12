import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark RedLocal: "Red" (rojo de marca) + "Local" (azul de estructura).
 * El punto es la señal — pulsa solo si el usuario permite movimiento.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight",
        className,
      )}
      aria-label="RedLocal — inicio"
    >
      <span
        aria-hidden
        className="signal-dot inline-block h-2 w-2 rounded-full bg-signal"
      />
      <span>
        <span className="text-signal">Red</span>
        <span className="text-structure">Local</span>
      </span>
    </Link>
  );
}
