"use client";

type TurnstileWidgetProps = {
  action?: string;
  className?: string;
};

export function TurnstileWidget({ action = "form", className }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@listhit.io";

  // If Turnstile isn't configured, avoid showing a broken-looking callout in production.
  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <p className="text-sm text-slate-500">
          Human verification isn&apos;t configured. Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> (and
          <code>TURNSTILE_SECRET_KEY</code>) in your environment. If you need help, email{" "}
          <a className="underline" href={`mailto:${supportEmail}`}>
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
      // Explicitly set the response field name so server code can consistently read it.
      data-response-field-name="cf-turnstile-response"
    />
  );
}
