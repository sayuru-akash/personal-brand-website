"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CONTACT_FORM_ACTION } from "@/types/contact";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileWidgetId = string;

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light";
  size: "flexible";
  appearance: "interaction-only";
  execution: "render";
  language: "auto";
  responseField: false;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "error-callback": (code: string) => boolean;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => TurnstileWidgetId;
  reset: (widgetId: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
};

const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey, onVerify, onExpire, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<TurnstileWidgetId | null>(null);
    const callbacksRef = useRef({ onVerify, onExpire, onError });
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
      callbacksRef.current = { onVerify, onExpire, onError };
    }, [onError, onExpire, onVerify]);

    useImperativeHandle(ref, () => ({
      reset() {
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!siteKey) {
        const frame = window.requestAnimationFrame(() => callbacksRef.current.onError());
        return () => window.cancelAnimationFrame(frame);
      }

      let disposed = false;
      const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

      const renderWidget = () => {
        if (disposed || widgetIdRef.current || !containerRef.current || !window.turnstile) {
          return;
        }

        setLoadError(false);
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: CONTACT_FORM_ACTION,
          theme: "light",
          size: "flexible",
          appearance: "interaction-only",
          execution: "render",
          language: "auto",
          responseField: false,
          callback: (token) => callbacksRef.current.onVerify(token),
          "expired-callback": () => {
            callbacksRef.current.onExpire();
            if (window.turnstile && widgetIdRef.current) {
              window.turnstile.reset(widgetIdRef.current);
            }
          },
          "timeout-callback": () => {
            callbacksRef.current.onExpire();
            if (window.turnstile && widgetIdRef.current) {
              window.turnstile.reset(widgetIdRef.current);
            }
          },
          "error-callback": () => {
            callbacksRef.current.onError();
            return true;
          },
        });
      };

      const handleLoad = () => window.requestAnimationFrame(renderWidget);
      const handleError = () => {
        if (!disposed) {
          setLoadError(true);
          callbacksRef.current.onError();
        }
      };

      let script = existingScript;
      if (window.turnstile) {
        handleLoad();
      } else if (script) {
        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError);
      } else {
        script = document.createElement("script");
        script.id = TURNSTILE_SCRIPT_ID;
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError);
        document.head.appendChild(script);
      }

      return () => {
        disposed = true;
        script?.removeEventListener("load", handleLoad);
        script?.removeEventListener("error", handleError);
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [siteKey]);

    return (
      <div className="min-w-0">
        <div ref={containerRef} className="min-h-16 w-full" aria-label="Security verification" />
        {!siteKey || loadError ? (
          <p className="mt-2 text-sm leading-6 text-[var(--aka)]" role="alert">
            Verification could not load. You can still use the direct email above.
          </p>
        ) : null}
      </div>
    );
  },
);

export default TurnstileWidget;
