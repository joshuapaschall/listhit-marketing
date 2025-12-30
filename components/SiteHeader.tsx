import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/get-started", label: "Get started" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__bar">
          <Link className="brand" href="/">
            <Image src="/icon.png" alt="ListHit logo" width={32} height={32} className="brand-mark" priority />
            <span>ListHit</span>
          </Link>
          <div className="nav-links" style={{ alignItems: "center" }}>
            <nav className="nav-links" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link key={link.href} className="nav-link" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button href="/get-started" className="nav-cta">
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
