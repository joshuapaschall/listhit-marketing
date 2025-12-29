import Link from "next/link";
import { Container } from "./Container";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/anti-spam", label: "Anti-Spam" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

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
              Deliver permission-based updates buyers trust.
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
