"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      track("email_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-ink-soft hover:text-ink"
      aria-label={`Copiar correo ${email}`}
    >
      {copied ? "¡Copiado!" : email}
    </button>
  );
}
