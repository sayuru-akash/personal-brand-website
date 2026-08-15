export const CONTACT_FORM_ACTION = "contact";

export type ContactApiResponse =
  | {
      ok: true;
      message: string;
      reference: string;
    }
  | {
      ok: false;
      message: string;
      code: "invalid_request" | "verification_failed" | "delivery_failed" | "unavailable";
      fields?: string[];
    };
