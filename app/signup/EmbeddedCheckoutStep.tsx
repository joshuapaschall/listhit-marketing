"use client";

import { useMemo, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type CheckoutSessionResponse = {
  clientSecret?: string;
  error?: string;
};

export function EmbeddedCheckoutStep({ email, name }: { email: string; name?: string }) {
  const [error, setError] = useState<string>("");

  const fetchClientSecret = useMemo(
    () => async () => {
      setError("");

      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = (await response.json()) as CheckoutSessionResponse;

      if (!response.ok || !data.clientSecret) {
        const message = data.error || "Unable to initialize checkout. Please refresh and try again.";
        setError(message);
        throw new Error(message);
      }

      return data.clientSecret;
    },
    [email, name],
  );

  if (!publishableKey || !stripePromise) {
    return <div className="form-status error">Stripe is not configured. Please contact support.</div>;
  }

  return (
    <div style={{ minHeight: 540 }}>
      {error ? <div className="form-status error">{error}</div> : null}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
