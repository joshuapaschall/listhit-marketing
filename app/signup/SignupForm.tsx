"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import TurnstileWidget from "../../components/TurnstileWidget";
import { EmbeddedCheckoutStep } from "./EmbeddedCheckoutStep";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  emailDelivery?: "sent" | "pending";
};

type SignupResponse = {
  message?: string;
  emailDelivery?: "sent" | "pending";
  error?: string;
};

type BillingState = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const initialBillingState: BillingState = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

export function SignupForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [accountEmail, setAccountEmail] = useState(initialEmail);
  const [accountName, setAccountName] = useState("");
  const [billingInfo, setBillingInfo] = useState<BillingState>(initialBillingState);
  const tokenRef = useRef("");

  const handleTurnstileToken = useCallback((token: string) => {
    tokenRef.current = token;
    setTurnstileToken(token);
  }, []);

  async function waitForTurnstileToken(maxMs = 10_000) {
    const existingToken = tokenRef.current;
    if (existingToken) {
      return existingToken;
    }

    return new Promise<string>((resolve) => {
      const startedAt = Date.now();
      const interval = window.setInterval(() => {
        if (tokenRef.current || Date.now() - startedAt >= maxMs) {
          window.clearInterval(interval);
          resolve(tokenRef.current);
        }
      }, 150);
    });
  }

  async function handleAccountSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const resetTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile?.reset) {
        window.turnstile.reset();
      }
      tokenRef.current = "";
      setTurnstileToken("");
    };

    setState({ status: "loading", message: "" });

    const resolvedToken = turnstileToken || (await waitForTurnstileToken(10_000));
    if (!resolvedToken) {
      setState({
        status: "error",
        message: "We couldn’t confirm verification in time. Please try again (disable ad blockers if enabled).",
      });
      return;
    }

    const formData = new FormData(form);
    const payload = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      acceptedTerms: formData.get("acceptedTerms") === "on",
      turnstileToken: resolvedToken,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as SignupResponse;

      if (!response.ok) {
        const isTurnstileVerificationFailure =
          response.status === 400 && (data.error || "").toLowerCase().includes("could not verify");

        if (isTurnstileVerificationFailure) {
          setState({
            status: "error",
            message: "Verification failed. Please try again.",
          });
          resetTurnstile();
          return;
        }

        setState({ status: "error", message: data.error || "Could not create your account. Please try again." });
        return;
      }

      setAccountEmail(payload.email);
      setAccountName(payload.fullName);
      setState({
        status: "success",
        message: data.message || "Check your email to verify your account.",
        emailDelivery: data.emailDelivery,
      });
      resetTurnstile();
      setStep(2);
    } catch (error) {
      console.error("Signup failed", error);
      setState({
        status: "error",
        message: "We could not create your account automatically. Please try again or contact support@listhit.io.",
      });
      resetTurnstile();
    }
  }

  function handleBillingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(3);
  }

  return (
    <div className="card">
      <h3>Create account</h3>
      <p className="muted" style={{ marginTop: 6 }}>
        Step {step} of 3 — ListHit Pro ($197/month) starts with a 14-day free trial.
      </p>

      {step === 1 ? (
        <form onSubmit={handleAccountSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input className="input" id="fullName" name="fullName" type="text" required placeholder="Your name" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Work email</label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                defaultValue={initialEmail}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
              />
            </div>
            <div className="form-field">
              <label htmlFor="company">Company (optional)</label>
              <input className="input" id="company" name="company" type="text" placeholder="Company name" />
            </div>
          </div>
          <label className="muted" style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input type="checkbox" name="acceptedTerms" required style={{ marginTop: 4 }} />
            <span>
              I agree to the{" "}
              <a href="/terms" className="nav-link" style={{ padding: 0 }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="nav-link" style={{ padding: 0 }}>
                Privacy Policy
              </a>
              .
            </span>
          </label>
          <TurnstileWidget action="signup" onToken={handleTurnstileToken} />
          <Button type="submit" disabled={state.status === "loading"}>
            {state.status === "loading" ? "Creating account..." : "Continue to billing"}
          </Button>
          {state.status === "error" && state.message ? <div className="form-status error">{state.message}</div> : null}
        </form>
      ) : null}

      {step === 2 ? (
        <form onSubmit={handleBillingSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="muted" style={{ margin: 0 }}>
            {state.message} Stripe will collect billing details again during checkout.
          </p>
          {state.emailDelivery === "pending" ? (
            <p className="muted" style={{ margin: 0 }}>
              If verification email does not arrive soon, contact{" "}
              <a href="mailto:support@listhit.io" className="nav-link" style={{ padding: 0 }}>
                support@listhit.io
              </a>
              .
            </p>
          ) : null}
          <div className="form-field">
            <label htmlFor="addressLine1">Address line 1</label>
            <input
              className="input"
              id="addressLine1"
              name="addressLine1"
              type="text"
              required
              value={billingInfo.addressLine1}
              onChange={(event) => setBillingInfo((prev) => ({ ...prev, addressLine1: event.target.value }))}
            />
          </div>
          <div className="form-field">
            <label htmlFor="addressLine2">Address line 2 (optional)</label>
            <input
              className="input"
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={billingInfo.addressLine2}
              onChange={(event) => setBillingInfo((prev) => ({ ...prev, addressLine2: event.target.value }))}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input
                className="input"
                id="city"
                name="city"
                type="text"
                required
                value={billingInfo.city}
                onChange={(event) => setBillingInfo((prev) => ({ ...prev, city: event.target.value }))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="state">State / Region</label>
              <input
                className="input"
                id="state"
                name="state"
                type="text"
                required
                value={billingInfo.state}
                onChange={(event) => setBillingInfo((prev) => ({ ...prev, state: event.target.value }))}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="postalCode">Postal code</label>
              <input
                className="input"
                id="postalCode"
                name="postalCode"
                type="text"
                required
                value={billingInfo.postalCode}
                onChange={(event) => setBillingInfo((prev) => ({ ...prev, postalCode: event.target.value }))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="country">Country</label>
              <input
                className="input"
                id="country"
                name="country"
                type="text"
                required
                value={billingInfo.country}
                onChange={(event) => setBillingInfo((prev) => ({ ...prev, country: event.target.value }))}
              />
            </div>
          </div>
          <div className="cta-row">
            <Button type="button" variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit">Continue to secure checkout</Button>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="muted" style={{ margin: 0 }}>
            Complete payment below to start your 14-day trial. You will return to this site after checkout.
          </p>
          <EmbeddedCheckoutStep email={accountEmail} name={accountName} />
          <p className="muted" style={{ marginTop: 4 }}>
            Need to edit billing details? Go back or contact support at{" "}
            <a href="mailto:support@listhit.io" className="nav-link" style={{ padding: 0 }}>
              support@listhit.io
            </a>
            .
          </p>
          <div className="cta-row">
            <Button type="button" variant="secondary" onClick={() => setStep(2)}>
              Back to billing info
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
