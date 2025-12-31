import Link from "next/link";
import { Container } from "./Container";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/anti-spam", label: "Anti-Spam" },
  { href: "/email-compliance", label: "Email Compliance" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

const companyName = "ListHit, Inc.";
const mailingAddress = "2261 Market Street #5480, San Francisco, CA 94114";
const supportEmail = "support@listhit.io";
const abuseEmail = "abuse@listhit.io";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ gap: 6, fontSize: 16 }}>
              <span>ListHit</span>
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              Buyer CRM and deal distribution for real estate teams.
            </div>
            <div className="muted" style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>
              <div>{companyName}</div>
              <div>{mailingAddress}</div>
              <div>
                Support: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </div>
              <div>
                Abuse: <a href={`mailto:${abuseEmail}`}>{abuseEmail}</a>
              </div>
            </div>
          </div>
          <div className="footer-links" aria-label="Secondary navigation">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="muted" style={{ textAlign: "right" }}>
            © {new Date().getFullYear()} ListHit. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
