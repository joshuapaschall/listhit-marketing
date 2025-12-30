import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendVerificationEmail } from "../../../lib/ses";

export const runtime = "nodejs";

type SignupPayload = {
  fullName?: string;
  email?: string;
  password?: string;
  company?: string;
  acceptedTerms?: boolean;
};

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: SignupPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { fullName, email, password, company, acceptedTerms } = body;

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Full name, email, and password are required." }, { status: 400 });
  }

  if (!acceptedTerms) {
    return NextResponse.json({ error: "You must agree to the Terms of Service and Privacy Policy." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
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
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from("waitlist_requests").insert(waitlistPayload);
    if (insertError) {
      console.error("Failed to capture signup in waitlist_requests", insertError);
    }

    await sendVerificationEmail({
      toEmail: email,
      toName: fullName,
      actionLink,
    });

    return NextResponse.json({ message: "Check your email to verify your account." });
  } catch (error) {
    console.error("Signup handler failed", error);
    return NextResponse.json(
      { error: "We could not create your account automatically. Please try again or contact support@listhit.io." },
      { status: 500 },
    );
  }
}
