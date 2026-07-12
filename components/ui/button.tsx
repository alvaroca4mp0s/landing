import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "signal" | "structure" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2";

const variants: Record<Variant, string> = {
  // La señal: CTA principal. Rojo de marca.
  signal:
    "bg-signal text-white hover:bg-signal-strong shadow-[0_1px_0_rgba(0,0,0,0.04)]",
  // Estructura: acción secundaria.
  structure: "border border-line-strong bg-paper text-ink hover:bg-paper-2",
  ghost: "text-ink hover:bg-paper-2",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "signal",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "signal",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
