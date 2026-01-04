"use client";

type TurnstileWidgetProps = {
  action?: string;
  className?: string;
};

export function TurnstileWidget({ action = "form", className }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <p className="muted" style={{ fontSize: 13 }}>
        Human verification is unavailable. Please email support@listhit.io if this form does not submit.
      </p>
    );
  }

  return (
    <div
      className={["cf-turnstile", className].filter(Boolean).join(" ")}
      data-sitekey={siteKey}
      data-action={action}
      data-size="flexible"
    />
  );
}
