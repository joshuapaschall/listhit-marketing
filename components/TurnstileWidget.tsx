"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { siteConfig } from "../lib/siteConfig";

type TurnstileWidgetProps = {
  action?: string;
  className?: string;
};

export type TurnstileWidgetHandle = {
  execute: () => Promise<string>;
  reset: () => void;
};

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  ({ action = "form", className }: TurnstileWidgetProps, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const supportEmail = siteConfig.supportEmail;
    const widgetIdRef = useRef<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const tokenResolverRef = useRef<((token: string) => void) | null>(null);

    useImperativeHandle(ref, () => ({
      execute: () => {
        if (typeof window === "undefined" || !window.turnstile || !widgetIdRef.current) {
          return Promise.resolve("");
        }

        return new Promise((resolve) => {
          tokenResolverRef.current = resolve;
          window.turnstile.execute(widgetIdRef.current as string);
        });
      },
      reset: () => {
        if (typeof window === "undefined" || !window.turnstile || !widgetIdRef.current) {
          return;
        }
        window.turnstile.reset(widgetIdRef.current as string);
      },
    }));

    useEffect(() => {
      if (!siteKey) {
        return;
      }

      let interval: ReturnType<typeof setInterval> | null = null;
      let cancelled = false;

      const renderWidget = () => {
        if (cancelled || !containerRef.current || typeof window === "undefined" || !window.turnstile) {
          return false;
        }

        if (widgetIdRef.current) {
          return true;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          size: "invisible",
          appearance: "interaction-only",
          callback: (token: string) => {
            if (tokenResolverRef.current) {
              tokenResolverRef.current(token);
              tokenResolverRef.current = null;
            }
          },
          "error-callback": () => {
            if (tokenResolverRef.current) {
              tokenResolverRef.current("");
              tokenResolverRef.current = null;
            }
          },
          "expired-callback": () => {
            if (tokenResolverRef.current) {
              tokenResolverRef.current("");
              tokenResolverRef.current = null;
            }
          },
          "response-field-name": "cf-turnstile-response",
        });

        return Boolean(widgetIdRef.current);
      };

      if (!renderWidget()) {
        interval = setInterval(() => {
          if (renderWidget() && interval) {
            clearInterval(interval);
            interval = null;
          }
        }, 250);
      }

      return () => {
        cancelled = true;
        if (interval) {
          clearInterval(interval);
        }
        if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
        }
      };
    }, [action, siteKey]);

    // If Turnstile isn't configured, avoid showing a broken-looking callout in production.
    if (!siteKey) {
      if (process.env.NODE_ENV !== "production") {
        return (
          <p className="turnstile-warning">
            <strong>Turnstile is disabled in this environment.</strong> Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> and{" "}
            <code>TURNSTILE_SECRET_KEY</code>. If you need help, email{" "}
            <a href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            .
          </p>
        );
      }
      return null;
    }

    const classes = [className].filter(Boolean).join(" ");

    return <div ref={containerRef} className={classes} />;
  },
);

TurnstileWidget.displayName = "TurnstileWidget";
