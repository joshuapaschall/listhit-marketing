import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendVerificationEmail } from "../../../../lib/ses";
import { verifyTurnstileToken } from "../../../../lib/turnstile";

export const runtime = "nodejs";

const GENERIC_RESPONSE = {
  message: "If an account exists for that email, we’ll send a verification email shortly.",
};

type ResendPayload = {
  email?: string;
  turnstileToken?: string;
};

type RateLimitRecord = {
  count: number;
  expires: number;
};

const ipRateLimitWindowMs = 10 * 60 * 1000;
const ipRateLimitMax = 3;
const emailRateLimitWindowMs = 30 * 60 * 1000;
const emailRateLimitMax = 3;
const globalRateLimitWindowMs = 10 * 60 * 1000;
const globalRateLimitMax = 200;

const ipRateLimitStore = new Map<string, RateLimitRecord>();
const emailRateLimitStore = new Map<string, RateLimitRecord>();
const globalRateLimitStore = new Map<string, RateLimitRecord>();

function rateLimit(identifier: string, max: number, windowMs: number, store: Map<string, RateLimitRecord>) {
  const now = Date.now();
  const record = store.get(identifier);
  if (record && record.expires > now) {
    if (record.count >= max) return false;
    record.count += 1;
    store.set(identifier, record);
    return true;
  }
  store.set(identifier, { count: 1, expires: now + windowMs });
  return true;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function getRemoteIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getRemoteIp(req);
  const remoteIp = ip !== "unknown" ? ip : undefined;

  if (!rateLimit("global", globalRateLimitMax, globalRateLimitWindowMs, globalRateLimitStore)) {
    return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  if (!rateLimit(ip, ipRateLimitMax, ipRateLimitWindowMs, ipRateLimitStore)) {
    return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: ResendPayload = {};
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(GENERIC_RESPONSE);
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const email = normalizeEmail(rawEmail);
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const emailIdentifier = email || rawEmail || "unknown";

  if (email && !rateLimit(email, emailRateLimitMax, emailRateLimitWindowMs, emailRateLimitStore)) {
    return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://listhit.io";

  if (!turnstileToken) {
    await logResendAttempt({
      email: emailIdentifier,
      ip,
      success: false,
      errorMessage: "Missing Turnstile token",
      supabaseUrl,
      supabaseServiceRoleKey,
    });
    return NextResponse.json(GENERIC_RESPONSE);
  }

  const verification = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!verification.success) {
    await logResendAttempt({
      email: emailIdentifier,
      ip,
      success: false,
      errorMessage: verification.message || "Turnstile verification failed",
      supabaseUrl,
      supabaseServiceRoleKey,
    });
    return NextResponse.json(GENERIC_RESPONSE);
  }

  if (!email || !isValidEmail(email)) {
    await logResendAttempt({
      email: emailIdentifier,
      ip,
      success: false,
      errorMessage: "Invalid email",
      supabaseUrl,
      supabaseServiceRoleKey,
    });
    return NextResponse.json(GENERIC_RESPONSE);
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    await logResendAttempt({
      email,
      ip,
      success: false,
      errorMessage: "Supabase service role not configured",
      supabaseUrl,
      supabaseServiceRoleKey,
    });
    return NextResponse.json(GENERIC_RESPONSE);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const marketingSchema = supabase.schema("marketing");
  const redirectTo = `${siteUrl}/signup/verify`;

  let success = false;
  let errorMessage: string | null = null;

  try {
    const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email);

    if (userError || !userData?.user) {
      errorMessage = userError?.message || "User not found";
    } else {
      const { data, error } = await supabase.auth.admin.generateLink({
        type: "signup",
        email,
        password: crypto.randomUUID(),
        options: {
          redirectTo,
        },
      });

      const actionLink = data?.properties?.action_link;

      if (!error && actionLink) {
        try {
          await sendVerificationEmail({
            toEmail: email,
            toName: "",
            actionLink,
          });
          success = true;
        } catch (sendError) {
          errorMessage = sendError instanceof Error ? sendError.message : "Unknown email send error";
        }
      } else {
        const { data: fallbackData, error: fallbackError } = await supabase.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: {
            redirectTo,
          },
        });

        const fallbackLink = fallbackData?.properties?.action_link;

        if (fallbackError || !fallbackLink) {
          errorMessage = fallbackError?.message || error?.message || "Supabase link generation failed";
        } else {
          try {
            await sendVerificationEmail({
              toEmail: email,
              toName: "",
              actionLink: fallbackLink,
            });
            success = true;
          } catch (sendError) {
            errorMessage = sendError instanceof Error ? sendError.message : "Unknown email send error";
          }
        }
      }
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  try {
    await marketingSchema.from("verification_email_resends").insert({
      email,
      ip,
      success,
      error_message: errorMessage,
    });
  } catch (error) {
    console.error("Failed to log verification resend attempt", error);
  }

  return NextResponse.json(GENERIC_RESPONSE);
}

type ResendLogInput = {
  email: string;
  ip: string;
  success: boolean;
  errorMessage: string | null;
  supabaseUrl?: string;
  supabaseServiceRoleKey?: string;
};

async function logResendAttempt({
  email,
  ip,
  success,
  errorMessage,
  supabaseUrl,
  supabaseServiceRoleKey,
}: ResendLogInput) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    await supabase.schema("marketing").from("verification_email_resends").insert({
      email,
      ip,
      success,
      error_message: errorMessage,
    });
  } catch (error) {
    console.error("Failed to log verification resend attempt", error);
  }
}
