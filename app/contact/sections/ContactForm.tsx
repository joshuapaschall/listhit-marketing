"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "../../../components/Button";
import TurnstileWidget from "../../../components/TurnstileWidget";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [mailtoLink, setMailtoLink] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const tokenRef = useRef("");

  const handleTurnstileToken = useCallback((token: string) => {
    tokenRef.current = token;
    setTurnstileToken(token);
  }, []);

  async function waitForTurnstileToken(maxMs = 4_000) {
    if (tokenRef.current) {
      return tokenRef.current;
    }

    return new Promise<string>((resolve) => {
      const start = Date.now();
      const interval = window.setInterval(() => {
        if (tokenRef.current || Date.now() - start > maxMs) {
          window.clearInterval(interval);
          resolve(tokenRef.current);
        }
      }, 200);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("loading");
    setMessage("");
    setMailtoLink(null);

    const resetTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile?.reset) {
        window.turnstile.reset();
      }
      tokenRef.current = "";
      setTurnstileToken("");
    };

    const resolvedToken = turnstileToken || (await waitForTurnstileToken());
    if (!resolvedToken) {
      setStatus("error");
      setMessage("We couldn’t verify your submission. Please try again.");
      resetTurnstile();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      website: formData.get("website")?.toString() || "",
      turnstileToken: resolvedToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thanks! We received your message.");
        setMailtoLink(data.mailto || null);
        form.reset();
        resetTurnstile();
      } else {
        if (data.mailto) {
          setStatus("success");
          setMessage(data.message || "Please email support@listhit.io so we can respond quickly.");
          setMailtoLink(data.mailto);
          form.reset();
          resetTurnstile();
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setStatus("success");
      setMessage("We could not submit automatically. Please email support@listhit.io so we can assist right away.");
      setMailtoLink("mailto:support@listhit.io?subject=ListHit%20Support%20Request");
      resetTurnstile();
    }
  }

  return (
    <div className="card">
      <h3>Send us a message</h3>
      <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "none" }}>
          <label>
            Company
            <input name="company" type="text" autoComplete="off" />
          </label>
          <label>
            Website
            <input name="website" type="text" autoComplete="off" />
          </label>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input className="input" id="name" name="name" type="text" required placeholder="Your name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Work email</label>
            <input className="input" id="email" name="email" type="email" required placeholder="you@company.com" />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone (optional)</label>
          <input className="input" id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="form-field">
          <label htmlFor="subject">Subject</label>
          <input className="input" id="subject" name="subject" type="text" required placeholder="How can we help?" />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea className="textarea" id="message" name="message" required placeholder="Share details so we can help quickly." />
        </div>
        <TurnstileWidget action="contact" onToken={handleTurnstileToken} />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </Button>
        {status !== "idle" && message && (
          <div className={`form-status ${status === "success" ? "success" : "error"}`}>
            {message}{" "}
            {mailtoLink ? (
              <a href={mailtoLink} style={{ color: "#dbeafe", textDecoration: "underline" }}>
                Email support
              </a>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
