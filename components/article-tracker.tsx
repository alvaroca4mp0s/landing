"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Dispara un evento de vista una vez al montar. Sin PII: solo el slug. */
export function ArticleTracker({ slug, event = "article_viewed" }: { slug: string; event?: AnalyticsEvent }) {
  useEffect(() => {
    track(event, { slug });
  }, [slug, event]);
  return null;
}
