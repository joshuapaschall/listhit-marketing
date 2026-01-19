"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { TurnstileWidget } from "../../components/TurnstileWidget";

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

export function SignupForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function requestTurnstileToken(form: HTMLFormElement) {
    const existingToken = new FormData(form).get("cf-turnstile-response")?.toString() || "";
    if (existingToken) {
      return existingToken;
    }

    if (typeof window === "undefined" || !window.turnstile?.execute) {
      return "";
    }

    try {
      const executeResult = window.turnstile.execute();
      if (typeof executeResult === "string") {
        return executeResult;
      }
      if (executeResult && "then" in executeResult) {
        const token = await executeResult;
        if (token) {
          return token;
        }
      }
    } catch (error) {
      console.error("Turnstile execution failed", error);
    }

    return new Promise<string>((resolve) => {
      const start = Date.now();
      const interval = window.setInterval(() => {
        const token = new FormData(form).get("cf-turnstile-response")?.toString() || "";
        if (token || Date.now() - start > 4000) {
          window.clearInterval(interval);
          resolve(token);
        }
      }, 200);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const resetTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile) {
        window.turnstile.reset();
      }
    };

    setState({ status: "loading", message: "" });

    const turnstileToken = await requestTurnstileToken(form);
    if (!turnstileToken) {
      setState({ status: "error", message: "We couldn’t verify your submission. Please try again." });
      resetTurnstile();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      acceptedTerms: formData.get("acceptedTerms") === "on",
      turnstileToken,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as SignupResponse;

      if (!response.ok) {
        setState({ status: "error", message: data.error || "Could not create your account. Please try again." });
        resetTurnstile();
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: data.message || "Check your email to verify your account.",
        emailDelivery: data.emailDelivery,
      });
      resetTurnstile();
    } catch (error) {
      console.error("Signup failed", error);
      setState({
        status: "error",
        message: "We could not create your account automatically. Please try again or contact support@listhit.io.",
      });
      resetTurnstile();
    }
  }

  if (state.status === "success") {
    return (
      <div className="card">
        <h3>Check your email to verify</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          {state.message} After verifying, you can sign in at{" "}
          <Link href="/login" className="nav-link" style={{ padding: 0 }}>
            app.listhit.io
          </Link>
          .
        </p>
        {state.emailDelivery === "pending" ? (
          <p className="muted" style={{ marginTop: 6 }}>
            If you don&apos;t receive the verification email soon, please contact{" "}
            <a href="mailto:support@listhit.io" className="nav-link" style={{ padding: 0 }}>
              support@listhit.io
            </a>
            .
          </p>
        ) : null}
        <div className="cta-row" style={{ marginTop: 12 }}>
          <Button href="/login" variant="secondary">
            Go to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Create account</h3>
      <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
          <input type="checkbox" name="acceptedTerms" required style={{ marginTop: 4 }} />{" "}
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
        <TurnstileWidget action="signup" />
        <Button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? "Creating account..." : "Create account"}
        </Button>
        {state.status === "error" && state.message ? <div className="form-status error">{state.message}</div> : null}
      </form>
    </div>
  );
}
