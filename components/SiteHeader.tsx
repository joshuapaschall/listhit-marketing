import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/signup", label: "Start free trial" },
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
            <Image src="/logo-mark.svg" alt="ListHit logo" width={32} height={32} className="brand-mark" priority />
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
            <Button href="/signup" className="nav-cta">
              Start free trial
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
