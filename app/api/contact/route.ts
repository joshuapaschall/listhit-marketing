import { NextRequest, NextResponse } from "next/server";
import { sendContactInternalNotification, sendContactReceiptEmail } from "../../../lib/ses";
import { verifyTurnstileToken } from "../../../lib/turnstile";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
  website?: string;
  turnstileToken?: string;
  verificationPending?: boolean;
};

const rateLimitWindowMs = 10 * 60 * 1000; // 10 minutes
const rateLimitMax = 5;
const rateLimitPendingMax = 2;
const rateLimitStore = new Map<string, { count: number; expires: number }>();
const rateLimitPendingStore = new Map<string, { count: number; expires: number }>();

const fallbackMailto = "mailto:support@listhit.io?subject=ListHit%20Support%20Request";

function rateLimit(identifier: string, max: number, store: Map<string, { count: number; expires: number }>) {
  const now = Date.now();
  const record = store.get(identifier);
  if (record && record.expires > now) {
    if (record.count >= max) return false;
    record.count += 1;
    store.set(identifier, record);
    return true;
  }
  store.set(identifier, { count: 1, expires: now + rateLimitWindowMs });
  return true;
}

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { name, email, phone, subject, message, company, website, turnstileToken, verificationPending } = body;
  const remoteIp = typeof ip === "string" && ip !== "unknown" ? ip.split(",")[0]?.trim() : undefined;
  const isVerificationPending = Boolean(verificationPending) && !turnstileToken;

  if (
    !rateLimit(
      String(ip),
      isVerificationPending ? rateLimitPendingMax : rateLimitMax,
      isVerificationPending ? rateLimitPendingStore : rateLimitStore,
    )
  ) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  if ((company && company.trim().length > 0) || (website && website.trim().length > 0)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Name, email, subject, and message are required." }, { status: 400 });
  }

  if (!isVerificationPending) {
    const verification = await verifyTurnstileToken(turnstileToken ?? "", remoteIp);
    if (!verification.success) {
      return NextResponse.json({ error: verification.message || "Captcha verification failed. Please try again." }, { status: 400 });
    }
  }

  if (message.trim().length < 12) {
    return NextResponse.json({ error: "Please include a bit more detail so we can help." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const endpoint = process.env.SUPPORT_CONTACT_ENDPOINT || "";
  const payload = {
    name,
    email,
    phone,
    subject,
    message,
    source: "listhit.io/contact",
    verification_pending: isVerificationPending,
  };

  const emailResults = await Promise.allSettled([
    sendContactReceiptEmail({ toEmail: email, toName: name, subject }),
    sendContactInternalNotification({
      payload: {
        ...payload,
        ip: remoteIp,
        userAgent: req.headers.get("user-agent") || undefined,
        receivedAt: new Date().toISOString(),
      },
    }),
  ]);

  const emailFailures = emailResults.filter((result) => result.status === "rejected");
  if (emailFailures.length > 0) {
    emailFailures.forEach((result) => {
      console.error("Contact email failed", result);
    });
  }

  if (!endpoint) {
    if (emailFailures.length > 0) {
      const fallbackMessage =
        "We received your request. For the fastest response, email support@listhit.io or click the link below to open your email client.";
      return NextResponse.json({ message: fallbackMessage, mailto: fallbackMailto });
    }

    return NextResponse.json({ message: "Thanks! We received your message and will respond shortly." });
  }

  let endpointDelivered = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error("Support endpoint responded with status", response.status);
    } else {
      endpointDelivered = true;
    }
  } catch (error) {
    console.error("Contact submission failed", error);
  }

  if (!endpointDelivered && emailFailures.length > 0) {
    const fallbackMessage =
      "We could not deliver your request automatically. Please email support@listhit.io so we can respond quickly.";
    return NextResponse.json({ message: fallbackMessage, mailto: fallbackMailto }, { status: 200 });
  }

  return NextResponse.json({ message: "Thanks! We received your message and will respond shortly." });
}
