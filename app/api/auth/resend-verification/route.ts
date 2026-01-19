import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendVerificationEmail } from "../../../../lib/ses";
import { verifyTurnstileToken } from "../../../../lib/turnstile";

export const runtime = "nodejs";

type ResendVerificationPayload = {
  email?: string;
  fullName?: string;
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
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = req.ip || ipHeader?.split(",")[0]?.trim() || "unknown";
  const remoteIp = ip !== "unknown" ? ip : undefined;

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "You’ve reached the resend limit. Please wait a bit and try again." },
      { status: 429 },
    );
  }

  let body: ResendVerificationPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { email, fullName, turnstileToken } = body;

  if (!turnstileToken) {
    return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
  }

  const verification = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!verification.ok) {
    return NextResponse.json(
      { error: verification.message || "We couldn’t verify your submission. Please try again." },
      { status: verification.status ?? 400 },
    );
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { error: "Verification resend is unavailable. Please contact support@listhit.io." },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    const redirectTo = process.env.APP_URL ?? "https://app.listhit.io";
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        data: {
          full_name: fullName || null,
        },
        redirectTo,
      },
    });

    const actionLink = data?.properties?.action_link;
    if (error || !actionLink) {
      throw error || new Error("Supabase did not return an action link.");
    }

    await sendVerificationEmail({
      toEmail: email,
      toName: fullName || "there",
      actionLink,
    });

    return NextResponse.json({ message: "Check your email for a new verification link." });
  } catch (error) {
    console.error("Resend verification failed", error);
    return NextResponse.json({ error: "Could not resend verification email. Please try again." }, { status: 500 });
  }
}
