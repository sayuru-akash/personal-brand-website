"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useReportWebVitals } from "next/web-vitals";

type AnalyticsWindow = Window & { dataLayer?: unknown[] };
type WebVitalsReporter = Parameters<typeof useReportWebVitals>[0];

function isAnalyticsReady() {
  return typeof window !== "undefined" && Array.isArray((window as AnalyticsWindow).dataLayer);
}

export const reportWebVital: WebVitalsReporter = (metric) => {
  if (!isAnalyticsReady()) {
    return;
  }

  sendGAEvent("event", metric.name, {
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    metric_rating: metric.rating,
    non_interaction: true,
  });
};

export function trackContactLead(topic: string) {
  if (!isAnalyticsReady()) {
    return;
  }

  sendGAEvent("event", "generate_lead", {
    method: "contact_form",
    contact_topic: topic,
  });
}

export default function AnalyticsWebVitals() {
  useReportWebVitals(reportWebVital);
  return null;
}
