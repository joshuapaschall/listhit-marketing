import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutSessionPayload = {
  email?: string;
  name?: string;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.SITE_URL;

const stripe =
  stripeSecretKey &&
  new Stripe(stripeSecretKey, {
    apiVersion: "2025-01-27.acacia",
  });

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe secret key is not configured." }, { status: 500 });
  }

  if (!siteUrl) {
    return NextResponse.json({ error: "SITE_URL is not configured." }, { status: 500 });
  }

  let body: CheckoutSessionPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const priceId = process.env.STRIPE_PRICE_ID_PRO;

  if (!priceId) {
    return NextResponse.json({ error: "Stripe price id is not configured." }, { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded",
      customer_email: body.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
      },
      return_url: `${siteUrl}/signup/complete?session_id={CHECKOUT_SESSION_ID}`,
      customer_creation: "always",
      billing_address_collection: "required",
      metadata: {
        full_name: body.name || "",
      },
    });

    if (!session.client_secret) {
      return NextResponse.json({ error: "Could not initialize checkout session." }, { status: 500 });
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Failed to create Stripe checkout session", error);
    return NextResponse.json({ error: "Unable to create Stripe checkout session." }, { status: 500 });
  }
}
