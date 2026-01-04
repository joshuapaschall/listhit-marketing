"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { TurnstileWidget } from "../../components/TurnstileWidget";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export function RequestAccessForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const turnstileToken = formData.get("cf-turnstile-response")?.toString() || "";

    setState({ status: "loading", message: "" });

    const payload = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      role: formData.get("role")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      agreeToTerms: formData.get("agreeToTerms") === "on",
      marketingOptIn: formData.get("marketingOptIn") === "on",
      website: formData.get("website")?.toString() || "",
      turnstileToken,
    };

    const resetTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile) {
        window.turnstile.reset();
      }
    };

    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setState({ status: "error", message: data.error || "Something went wrong. Please try again." });
        resetTurnstile();
        return;
      }

      form.reset();
      setState({ status: "success", message: data.message || "Thanks — we received your request." });
      resetTurnstile();
    } catch (error) {
      console.error("Request access failed", error);
      setState({
        status: "error",
        message: "We could not submit your request automatically. Please email support@listhit.io.",
      });
      resetTurnstile();
    }
  }

  if (state.status === "success") {
    return (
      <div className="card">
        <h3>Thanks — we received your request.</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          We’ll email you about your request. If you opted into updates, you can opt out anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Request access or a demo</h3>
      <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "none" }} aria-hidden>
          <label>
            Website
            <input name="website" type="text" autoComplete="off" />
          </label>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="fullName">Full name</label>
            <input className="input" id="fullName" name="fullName" type="text" required placeholder="Your name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Work email</label>
            <input className="input" id="email" name="email" type="email" required placeholder="you@company.com" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="company">Company</label>
            <input className="input" id="company" name="company" type="text" required placeholder="Company name" />
          </div>
          <div className="form-field">
            <label htmlFor="role">Role</label>
            <input className="input" id="role" name="role" type="text" required placeholder="Your role" />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">What would you like to accomplish?</label>
          <textarea className="textarea" id="message" name="message" placeholder="Share context so we can tailor a demo." />
        </div>
        <div className="form-field" style={{ gap: 10 }}>
          <label className="muted" style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input type="checkbox" name="agreeToTerms" required style={{ marginTop: 4 }} />{" "}
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
          <label className="muted" style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input type="checkbox" name="marketingOptIn" style={{ marginTop: 4 }} />{" "}
            <span>Send me product updates and announcements (optional).</span>
          </label>
        </div>
        <TurnstileWidget action="request_access" />
        <Button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? "Submitting..." : "Submit request"}
        </Button>
        {state.status === "error" && state.message ? <div className="form-status error">{state.message}</div> : null}
      </form>
    </div>
  );
}
