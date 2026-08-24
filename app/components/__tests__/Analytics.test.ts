import { sendGAEvent } from "@next/third-parties/google";
import { reportWebVital, trackContactLead } from "@/app/components/Analytics";

jest.mock("@next/third-parties/google", () => ({
  sendGAEvent: jest.fn(),
}));

jest.mock("next/web-vitals", () => ({
  useReportWebVitals: jest.fn(),
}));

type AnalyticsWindow = Window & { dataLayer?: unknown[] };

const mockedSendGAEvent = jest.mocked(sendGAEvent);

describe("analytics events", () => {
  afterEach(() => {
    mockedSendGAEvent.mockClear();
    delete (window as AnalyticsWindow).dataLayer;
  });

  it("does not send events before Google Analytics is ready", () => {
    trackContactLead("Web design");

    expect(mockedSendGAEvent).not.toHaveBeenCalled();
  });

  it("reports web vitals using Google Analytics-compatible values", () => {
    (window as AnalyticsWindow).dataLayer = [];

    reportWebVital({
      id: "v4-123",
      name: "CLS",
      value: 0.1234,
      rating: "needs-improvement",
      delta: 0.1234,
      entries: [],
      navigationType: "navigate",
    });

    expect(mockedSendGAEvent).toHaveBeenCalledWith("event", "CLS", {
      value: 123,
      event_label: "v4-123",
      metric_rating: "needs-improvement",
      non_interaction: true,
    });
  });

  it("tracks a successful contact submission without personal fields", () => {
    (window as AnalyticsWindow).dataLayer = [];

    trackContactLead("Software / product");

    expect(mockedSendGAEvent).toHaveBeenCalledWith("event", "generate_lead", {
      method: "contact_form",
      contact_topic: "Software / product",
    });
  });
});
