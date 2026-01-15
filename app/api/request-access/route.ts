import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendRequestAccessConfirmationEmail, sendRequestAccessInternalNotification } from "../../../lib/ses";
import { verifyTurnstileToken } from "../../../lib/turnstile";

type RequestAccessPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  role?: string;
  message?: string;
  agreeToTerms?: boolean;
  marketingOptIn?: boolean;
  website?: string;
  turnstileToken?: string;
};

const rateLimitWindowMs = 10 * 60 * 1000; // 10 minutes
const rateLimitMax = 5;
const rateLimitStore = new Map<string, { count: number; expires: number }>();

function rateLimit(identifier: string) {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  if (record && record.expires > now) {
    if (record.count >= rateLimitMax) return false;
    record.count += 1;
    rateLimitStore.set(identifier, record);
    return true;
  }
  rateLimitStore.set(identifier, { count: 1, expires: now + rateLimitWindowMs });
  return true;
}

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const remoteIp = typeof ip === "string" && ip !== "unknown" ? ip.split(",")[0]?.trim() : undefined;

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: RequestAccessPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { fullName, email, company, role, message, agreeToTerms, marketingOptIn, website, turnstileToken } = body;

  if (website && website.trim().length > 0) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (!fullName || !email || !company || !role) {
    return NextResponse.json({ error: "Full name, email, company, and role are required." }, { status: 400 });
  }

  if (!agreeToTerms) {
    return NextResponse.json({ error: "You must agree to the Terms of Service and Privacy Policy." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const verification = await verifyTurnstileToken(turnstileToken ?? "", remoteIp);
  if (!verification.success) {
    return NextResponse.json({ error: verification.message || "Captcha verification failed. Please try again." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const payload = {
    full_name: fullName,
    email,
    company,
    role,
    message: message || "",
    agree_to_terms: Boolean(agreeToTerms),
    marketing_opt_in: Boolean(marketingOptIn),
    ip: String(ip),
    user_agent: userAgent,
    source: "listhit.io/request-access",
    created_at: new Date().toISOString(),
  };

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase is not configured for request access submissions.");
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { error } = await supabase.from("leads").insert(payload);

      if (error) {
        console.error("Supabase insert failed", error);
      }
    } catch (error) {
      console.error("Request access submission failed", error);
    }
  }

  try {
    await sendRequestAccessConfirmationEmail({
      toEmail: email,
      toName: fullName,
      company,
    });
  } catch (error) {
    console.error("Failed to send request access confirmation email", error);
  }

  try {
    await sendRequestAccessInternalNotification({ leadPayload: payload });
  } catch (error) {
    console.error("Failed to send request access internal notification", error);
  }

  return NextResponse.json({
    message: "We received your request. You’ll get a confirmation email shortly.",
  });
}
