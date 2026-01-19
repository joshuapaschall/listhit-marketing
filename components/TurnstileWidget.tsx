"use client";

import { siteConfig } from "../lib/siteConfig";

type TurnstileWidgetProps = {
  action?: string;
  className?: string;
};

export function TurnstileWidget({ action = "form", className }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const supportEmail = siteConfig.supportEmail;

  // If Turnstile isn't configured, avoid showing a broken-looking callout in production.
  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <p className="turnstile-warning">
          <strong>Human verification isn&apos;t configured.</strong> Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>{" "}
          and <code>TURNSTILE_SECRET_KEY</code> in your environment. If you need help, email{" "}
          <a href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          .
        </p>
      );
    }
    return null;
  }

  const classes = ["cf-turnstile", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-sitekey={siteKey}
      data-action={action}
      data-size="invisible"
      // Explicitly set the response field name so server code can consistently read it.
      data-response-field-name="cf-turnstile-response"
    />
  );
}
