import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendVerificationEmail } from "../../../lib/ses";
import { verifyTurnstileToken } from "../../../lib/turnstile";

export const runtime = "nodejs";

type SignupPayload = {
  fullName?: string;
  email?: string;
  password?: string;
  company?: string;
  acceptedTerms?: boolean;
  turnstileToken?: string;
};

const rateLimitWindowMs = 10 * 60 * 1000; // 10 minutes
const rateLimitMax = 5;
const rateLimitStore = new Map<string, { count: number; expires: number }>();

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
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = req.ip || ipHeader?.split(",")[0]?.trim() || "unknown";
  const remoteIp = ip !== "unknown" ? ip : undefined;

  let body: SignupPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { fullName, email, password, company, acceptedTerms, turnstileToken } = body;

  if (!rateLimit(ip, rateLimitMax, rateLimitStore)) {
    return NextResponse.json(
      { error: "You’ve reached the signup limit. Please wait a bit and try again." },
      { status: 429 },
    );
  }

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Full name, email, and password are required." }, { status: 400 });
  }

  if (!acceptedTerms) {
    return NextResponse.json({ error: "You must agree to the Terms of Service and Privacy Policy." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!turnstileToken) {
    return NextResponse.json({ error: "Verification took too long. Please try again." }, { status: 400 });
  }

  const verification = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!verification.success) {
    return NextResponse.json({ error: verification.message || "Verification failed. Please try again." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { error: "Signup is unavailable. Please contact support@listhit.io so we can assist you directly." },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const marketingSchema = supabase.schema("marketing");
  const redirectTo = process.env.APP_URL ?? "https://app.listhit.io";

  try {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "signup",
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company: company || null,
          signup_source: "listhit.io",
        },
        redirectTo,
      },
    });

    const actionLink = data?.properties?.action_link;

    if (error || !actionLink) {
      console.error("Supabase signup link generation failed", error || data?.properties);
      return NextResponse.json({ error: "Could not create your account. Please try again." }, { status: 500 });
    }

    const waitlistPayload = {
      email,
      full_name: fullName,
      company: company || null,
      source: "signup",
      accepted_terms: true,
      ip,
    };

    const { error: insertError } = await marketingSchema.from("waitlist_requests").insert(waitlistPayload);
    if (insertError) {
      console.error("Failed to capture signup in waitlist_requests", insertError);
    }

    try {
      await sendVerificationEmail({
        toEmail: email,
        toName: fullName,
        actionLink,
      });
    } catch (error) {
      console.error("Failed to send verification email", error);

      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const { error: failureInsertError } = await marketingSchema.from("signup_email_failures").insert({
        email,
        full_name: fullName,
        error_message: errorMessage,
        ip,
      });

      if (failureInsertError) {
        console.error("Failed to capture signup email failure", failureInsertError);
      }

      return NextResponse.json({
        message: "Thanks for signing up! We are finishing your signup and will email your verification link shortly.",
        emailDelivery: "pending",
      });
    }

    return NextResponse.json({
      message: "Check your email to verify your account.",
      emailDelivery: "sent",
    });
  } catch (error) {
    console.error("Signup handler failed", error);
    return NextResponse.json(
      { error: "We could not create your account automatically. Please try again or contact support@listhit.io." },
      { status: 500 },
    );
  }
}
