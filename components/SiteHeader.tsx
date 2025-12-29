import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/anti-spam", label: "Anti-Spam" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__bar">
          <Link className="brand" href="/">
            <Image src="/logo.png" alt="ListHit logo" width={32} height={32} />
            <span>ListHit</span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.href} className="nav-link" href={link.href}>
                {link.label}
              </Link>
            ))}
            <details className="nav-link" style={{ padding: 0, position: "relative" }}>
              <summary className="nav-link" style={{ listStyle: "none" }}>
                Legal
              </summary>
              <div className="card" style={{ position: "absolute", marginTop: 8, padding: 12, minWidth: 180 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {legalLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="nav-link" style={{ padding: "6px 8px" }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            <Button variant="primary" href="/login">
              Log in
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
