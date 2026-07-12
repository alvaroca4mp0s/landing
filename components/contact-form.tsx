"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, CHANNELS, URGENCIES } from "@/lib/leads";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FormState = {
  eventDescription: string;
  location: string;
  locationDetail: string;
  audience: string;
  impact: string;
  channel: string;
  urgency: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
  website: string; // honeypot
};

const EMPTY: FormState = {
  eventDescription: "", location: "", locationDetail: "", audience: "",
  impact: "", channel: "", urgency: "", name: "", email: "", company: "",
  phone: "", consent: false, website: "",
};

const EXAMPLES = [
  "cuando una bomba deja de entregar presión",
  "cuando un producto baja de precio en la competencia",
  "cuando un cliente escribe fuera de horario y nadie responde",
  "cuando aparece una licitación de mi rubro",
  "cuando un servidor deja de responder",
  "cuando una orden queda detenida más de 2 horas",
];

const STEP_EVENTS = ["form_step_completed"] as const;
const STORAGE_KEY = "rl_lead_draft";

const STEPS = [
  "¿Qué te gustaría detectar?",
  "¿Dónde ocurre hoy?",
  "¿Quién necesita enterarse?",
  "¿Qué ocurre si nadie lo detecta?",
  "¿Cómo debería llegar la alerta?",
  "¿Cómo te contactamos?",
];

export function ContactForm({ campaign = "", sourcePage = "/contacto" }: { campaign?: string; sourcePage?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(EMPTY);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exampleIdx, setExampleIdx] = useState(0);

  // Restaurar borrador (solo campos no sensibles: pasos 1–5)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Hidratación una sola vez tras montar: leer en render rompería el SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch { /* noop */ }
  }, []);

  // Rotar ejemplos en el placeholder
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setExampleIdx((i) => (i + 1) % EXAMPLES.length), 3500);
    return () => clearInterval(id);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!started) {
      setStarted(true);
      track("form_started");
    }
    setState((s) => {
      const next = { ...s, [key]: value };
      try {
        const { name, email, company, phone, consent, website, ...safe } = next;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      } catch { /* noop */ }
      return next;
    });
    setError(null);
  }

  const stepValid = useMemo(() => {
    switch (step) {
      case 0: return state.eventDescription.trim().length >= 10;
      case 1: return state.location !== "";
      case 2: return state.audience.trim().length >= 2;
      case 3: return state.impact.trim().length >= 2;
      case 4: return state.channel !== "";
      case 5: return state.name.trim().length >= 2 && /.+@.+\..+/.test(state.email) && state.consent;
      default: return false;
    }
  }, [step, state]);

  function next() {
    if (!stepValid) return;
    track(STEP_EVENTS[0], { step: step + 1 });
    if (step === 4 && state.channel) track("contact_channel_selected", { channel: state.channel });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!stepValid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, sourcePage, campaign }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        track("form_error", { status: res.status });
        setError(data.error ?? "No pudimos enviar tu caso. Intenta nuevamente o escríbenos a hola@redlocal.cl.");
        setSubmitting(false);
        return;
      }
      track("form_submitted", { channel: state.channel, location: state.location });
      try {
        sessionStorage.setItem("rl_lead_summary", JSON.stringify({
          eventDescription: state.eventDescription,
          location: state.locationDetail ? `${state.location} — ${state.locationDetail}` : state.location,
          audience: state.audience,
          channel: state.channel,
        }));
        localStorage.removeItem(STORAGE_KEY);
      } catch { /* noop */ }
      router.push("/gracias");
    } catch {
      track("form_error", { status: 0 });
      setError("Hubo un problema de conexión. Intenta nuevamente en un momento.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[var(--radius-lg)] border border-line bg-paper p-6 md:p-8" noValidate>
      {/* Progreso */}
      <div className="mb-6 flex items-center justify-between">
        <p className="meta">Paso {step + 1} de {STEPS.length}</p>
        <div className="flex gap-1" aria-hidden>
          {STEPS.map((_, i) => (
            <span key={i} className={cn("h-1 w-6 rounded-full", i <= step ? "bg-signal" : "bg-line")} />
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold md:text-2xl">{STEPS[step]}</h2>

      <div className="mt-5">
        {step === 0 && (
          <div>
            <label htmlFor="eventDescription" className="sr-only">Qué te gustaría detectar</label>
            <textarea
              id="eventDescription"
              value={state.eventDescription}
              onChange={(e) => update("eventDescription", e.target.value)}
              rows={5}
              autoFocus
              placeholder={`Por ejemplo: quiero enterarme ${EXAMPLES[exampleIdx]}…`}
              className="w-full resize-y rounded-[var(--radius)] border border-line-strong bg-paper px-4 py-3 text-base outline-none focus:border-structure"
            />
            <p className="mt-2 text-sm text-ink-faint">No necesitas tecnicismos. Descríbelo con tus palabras.</p>
          </div>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="sr-only">Dónde ocurre</legend>
            <div className="flex flex-wrap gap-2">
              {LOCATIONS.map((opt) => (
                <ChipRadio key={opt} name="location" value={opt} checked={state.location === opt} onChange={() => update("location", opt)} />
              ))}
            </div>
            <input
              value={state.locationDetail}
              onChange={(e) => update("locationDetail", e.target.value)}
              placeholder="Opcional: cuéntanos un poco más de dónde ocurre"
              className="mt-4 w-full rounded-[var(--radius)] border border-line-strong bg-paper px-4 py-3 text-base outline-none focus:border-structure"
            />
          </fieldset>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="audience" className="sr-only">Quién necesita enterarse</label>
            <input
              id="audience"
              autoFocus
              value={state.audience}
              onChange={(e) => update("audience", e.target.value)}
              placeholder="Ej.: el operador de turno, yo, el equipo comercial…"
              className="w-full rounded-[var(--radius)] border border-line-strong bg-paper px-4 py-3 text-base outline-none focus:border-structure"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label htmlFor="impact" className="sr-only">Qué ocurre si nadie lo detecta</label>
            <textarea
              id="impact"
              autoFocus
              rows={4}
              value={state.impact}
              onChange={(e) => update("impact", e.target.value)}
              placeholder="Ej.: se detiene la producción, perdemos la venta, el cliente se va…"
              className="w-full resize-y rounded-[var(--radius)] border border-line-strong bg-paper px-4 py-3 text-base outline-none focus:border-structure"
            />
            <p className="mt-2 text-sm text-ink-faint">Esto nos ayuda a entender qué tan importante es la señal.</p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Canal deseado</legend>
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((opt) => (
                  <ChipRadio key={opt} name="channel" value={opt} checked={state.channel === opt} onChange={() => update("channel", opt)} />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Urgencia <span className="font-normal text-ink-faint">(opcional)</span></legend>
              <div className="flex flex-wrap gap-2">
                {URGENCIES.map((opt) => (
                  <ChipRadio key={opt} name="urgency" value={opt} checked={state.urgency === opt} onChange={() => update("urgency", opt)} />
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <Field id="name" label="Nombre" value={state.name} onChange={(v) => update("name", v)} autoFocus required />
            <Field id="email" label="Correo" type="email" value={state.email} onChange={(v) => update("email", v)} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="company" label="Empresa (opcional)" value={state.company} onChange={(v) => update("company", v)} />
              <Field id="phone" label="Teléfono (opcional)" value={state.phone} onChange={(v) => update("phone", v)} />
            </div>
            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={state.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 h-4 w-4 accent-[color:var(--color-signal)]"
                required
              />
              <span>
                Autorizo a RedLocal a usar estos datos para responder a mi consulta, según su{" "}
                <a href="/privacidad" className="underline hover:text-ink">política de privacidad</a>. No los usaremos para otra cosa.
              </span>
            </label>
            {/* Honeypot: invisible para personas, tentador para bots */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
              <label htmlFor="website">No completar</label>
              <input id="website" name="website" autoComplete="off" tabIndex={-1} value={state.website} onChange={(e) => update("website", e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-[var(--radius)] border border-signal bg-signal-wash px-4 py-3 text-sm text-signal-strong">
          {error}
        </p>
      )}

      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="text-sm text-ink-soft hover:text-ink disabled:opacity-0"
        >
          ← Atrás
        </button>
        {step < STEPS.length - 1 ? (
          <Button type="button" size="lg" onClick={next} disabled={!stepValid} variant={stepValid ? "signal" : "structure"}>
            Continuar
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={!stepValid || submitting}>
            {submitting ? "Enviando…" : "Enviar mi caso"}
          </Button>
        )}
      </div>
    </form>
  );
}

function ChipRadio({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={cn(
      "cursor-pointer select-none rounded-full border px-3.5 py-2 text-sm transition-colors",
      checked ? "border-signal bg-signal-wash text-signal-strong" : "border-line-strong text-ink-soft hover:border-ink-faint",
    )}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {value}
    </label>
  );
}

function Field({ id, label, value, onChange, type = "text", required, autoFocus }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; autoFocus?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoFocus={autoFocus}
        autoComplete={id === "email" ? "email" : id === "name" ? "name" : id === "phone" ? "tel" : "organization"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[var(--radius)] border border-line-strong bg-paper px-4 py-3 text-base outline-none focus:border-structure"
      />
    </div>
  );
}
