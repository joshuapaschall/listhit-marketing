import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const siteName = "ListHit";
const description =
  "ListHit is a dispositions CRM and buyer communications platform for real estate teams—manage buyers, track deals, and send permission-based alerts.";
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
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "ListHit" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/logo.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="page-shell">
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
