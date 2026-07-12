/**
 * Analítica sin cookies (Plausible). No se envía texto libre ni PII como
 * propiedades de evento — solo categorías acotadas. Ver docs/ANALYTICS.md.
 */

type PlausibleProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: PlausibleProps; callback?: () => void },
    ) => void;
  }
}

export type AnalyticsEvent =
  | "hero_cta_clicked"
  | "use_case_opened"
  | "scenario_viewed"
  | "article_viewed"
  | "article_cta_clicked"
  | "tool_viewed"
  | "tool_cta_clicked"
  | "case_viewed"
  | "form_started"
  | "form_step_completed"
  | "form_submitted"
  | "form_error"
  | "contact_channel_selected"
  | "outbound_crm"
  | "outbound_whatsapp"
  | "email_copied";

export function track(event: AnalyticsEvent, props?: PlausibleProps): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* la analítica nunca debe romper la experiencia */
  }
}
