import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  alt = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-line py-16 md:py-24",
        alt && "bg-paper-2",
        className,
      )}
    >
      <div className="container-rl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="meta mb-4">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl leading-tight md:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}
