import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
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
            <Button variant="primary" href="https://app.listhit.io/signup">
              Get Started
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
