export const siteConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "ListHit",
  companyTagline:
    process.env.NEXT_PUBLIC_COMPANY_TAGLINE ||
    "Buyer CRM and deal distribution for real estate teams.",
  companyAddress:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
    "2261 Market Street #5480, San Francisco, CA 94114",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@listhit.io",
  abuseEmail: process.env.NEXT_PUBLIC_ABUSE_EMAIL || "abuse@listhit.io",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "",
};
