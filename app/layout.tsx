import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Script from "next/script";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { siteConfig } from "../lib/siteConfig";

const siteName = "ListHit";
const description =
  "ListHit is a buyer CRM and deal distribution platform for real estate teams—organize buyers, manage deals, and share opportunities fast.";
const baseUrl = "https://listhit.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url: baseUrl,
    siteName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ListHit" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const showTurnstileWarning = !turnstileSiteKey && process.env.NODE_ENV !== "production";
  const supportEmail = siteConfig.supportEmail;

  return (
    <html lang="en">
      <body className="page-shell">
        {showTurnstileWarning ? (
          <div className="dev-banner">
            Cloudflare Turnstile is not configured. Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> and{" "}
            <code>TURNSTILE_SECRET_KEY</code>. Need help?{" "}
            <a href={`mailto:${supportEmail}`}>Email support</a>.
          </div>
        ) : null}
        {turnstileSiteKey ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
            strategy="afterInteractive"
          />
        ) : null}
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
