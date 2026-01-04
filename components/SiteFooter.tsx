import Link from "next/link";

export function SiteFooter() {
  // These are safe to render publicly. Keep them configurable so you can match whatever
  // you put in your SES production access request (brand name, support, abuse, mailing address).
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "ListHit";
  const tagline =
    process.env.NEXT_PUBLIC_TAGLINE ||
    "Buyer CRM and deal distribution for real estate teams.";

  const legalEntityName =
    process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME || brandName;

  const mailingAddress =
    process.env.NEXT_PUBLIC_MAILING_ADDRESS ||
    "2261 Market Street #5480, San Francisco, CA 94114";

  const supportEmail =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@listhit.io";

  const abuseEmail = process.env.NEXT_PUBLIC_ABUSE_EMAIL || "abuse@listhit.io";

  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "";

  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-base font-semibold text-gray-900">{brandName}</div>
            <p className="mt-2 text-sm text-gray-600">{tagline}</p>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div>{legalEntityName}</div>
              <div>{mailingAddress}</div>
              <div>
                Support:{" "}
                <a
                  className="underline"
                  href={`mailto:${supportEmail}`}
                >
                  {supportEmail}
                </a>
              </div>
              <div>
                Abuse:{" "}
                <a className="underline" href={`mailto:${abuseEmail}`}>
                  {abuseEmail}
                </a>
              </div>
              {supportPhone ? (
                <div>
                  Phone:{" "}
                  <a className="underline" href={`tel:${supportPhone}`}>
                    {supportPhone}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Company</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/pricing" className="hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Legal</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/acceptable-use" className="hover:text-gray-900">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Email compliance</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/anti-spam" className="hover:text-gray-900">
                  Anti-Spam
                </Link>
              </li>
              <li>
                <Link href="/email-compliance" className="hover:text-gray-900">
                  Email Compliance
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-gray-900">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          © {year} {brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
