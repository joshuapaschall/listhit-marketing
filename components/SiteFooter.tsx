import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "../lib/siteConfig";

const footerLinkSections = [
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/acceptable-use", label: "Acceptable Use" },
    ],
  },
  {
    title: "Email compliance",
    links: [
      { href: "/anti-spam", label: "Anti-Spam" },
      { href: "/email-compliance", label: "Email Compliance" },
      { href: "/security", label: "Security" },
    ],
  },
];

const footerBottomLinks = [
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const {
    companyName,
    companyTagline,
    companyAddress,
    supportEmail,
    abuseEmail,
    supportPhone,
  } = siteConfig;

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="footer-title">{companyName}</div>
            <p className="footer-tagline">{companyTagline}</p>
            <div className="footer-contact">
              <p className="footer-text">{companyAddress}</p>
              <p className="footer-text">
                Support:{" "}
                <a className="footer-link" href={`mailto:${supportEmail}`}>
                  {supportEmail}
                </a>
              </p>
              <p className="footer-text">
                Abuse:{" "}
                <a className="footer-link" href={`mailto:${abuseEmail}`}>
                  {abuseEmail}
                </a>
              </p>
              {supportPhone ? (
                <p className="footer-text">
                  Phone:{" "}
                  <a className="footer-link" href={`tel:${supportPhone}`}>
                    {supportPhone}
                  </a>
                </p>
              ) : null}
            </div>
          </div>

          {footerLinkSections.map((section) => (
            <div key={section.title} className="footer-col">
              <div className="footer-heading">{section.title}</div>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link className="footer-link" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            © {year} {companyName}. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            {footerBottomLinks.map((link) => (
              <Link key={link.href} className="footer-link" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
