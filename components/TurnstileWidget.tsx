"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "../lib/siteConfig";

type TurnstileWidgetProps = {
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
  className?: string;
  onToken?: (token: string) => void;
  size?: "normal" | "compact" | "flexible";
};

export default function TurnstileWidget({
  action = "form",
  appearance = "interaction-only",
  className,
  onToken,
  size = "flexible",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const supportEmail = siteConfig.supportEmail;

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return;
    }

    let active = true;
    const start = Date.now();
    const timeoutMs = 10_000;
    const pollIntervalMs = 100;

    const interval = window.setInterval(() => {
      if (!active || !containerRef.current) {
        return;
      }

      if (!window.turnstile?.render) {
        if (Date.now() - start > timeoutMs) {
          window.clearInterval(interval);
        }
        return;
      }

      window.clearInterval(interval);

      if (widgetIdRef.current) {
        window.turnstile.remove?.(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      const widgetId = window.turnstile.render(containerRef.current, {
        action,
        appearance,
        callback: (token: string) => {
          onToken?.(token || "");
        },
        size,
        sitekey: siteKey,
      });

      widgetIdRef.current = widgetId;
    }, pollIntervalMs);

    return () => {
      active = false;
      window.clearInterval(interval);
      if (window.turnstile?.remove && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, appearance, onToken, siteKey, size]);

  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <p className="turnstile-warning">
          <strong>Human verification isn&apos;t configured.</strong> Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>{" "}
          and <code>TURNSTILE_SECRET_KEY</code> in your environment. If you need help, email{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
      );
    }
    return null;
  }

  return <div ref={containerRef} className={className} />;
}
