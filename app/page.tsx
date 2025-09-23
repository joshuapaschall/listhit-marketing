// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <Image src="/logo.png" alt="ListHit logo" width={36} height={36} />
          <strong style={styles.brandText}>ListHit</strong>
        </div>
        <nav style={styles.nav}>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#pricing" style={styles.navLink}>Pricing</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
          <a href="https://app.listhit.io" style={styles.navCta}>Launch App</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.h1}>
          Dispo deals faster with <span style={styles.accent}>ListHit</span>
        </h1>
        <p style={styles.sub}>
          A focused dispositions workspace for real estate investors:
          manage buyers, market properties, and close more assignments—faster.
        </p>

        <div style={styles.ctaRow}>
          <a href="https://app.listhit.io" style={styles.ctaPrimary}>
            Launch App
          </a>
          <a href="#features" style={styles.ctaGhost}>
            See Features
          </a>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" style={styles.features}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🎯</div>
          <h3 style={styles.cardTitle}>Targeted Buyer Matching</h3>
          <p style={styles.cardBody}>
            Get your deals in front of the right buyers with smart grouping,
            tags, and saved lists tailored to your markets.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📣</div>
          <h3 style={styles.cardTitle}>Frictionless Outreach</h3>
          <p style={styles.cardBody}>
            One dashboard to announce new deals, track engagement, and follow up
            without losing momentum.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📈</div>
          <h3 style={styles.cardTitle}>Closing Clarity</h3>
          <p style={styles.cardBody}>
            Stay on top of offers, counters, and timelines with a clean pipeline
            built for fast assignments.
          </p>
        </div>
      </section>

      {/* Simple pricing teaser (optional anchor) */}
      <section id="pricing" style={styles.pricing}>
        <div style={styles.priceBadge}>Early Access</div>
        <h2 style={styles.h2}>Simple, transparent pricing</h2>
        <p style={styles.priceCopy}>
          Pay for what helps you dispo faster. No contracts. Cancel anytime.
        </p>
        <a href="https://app.listhit.io" style={styles.ctaPrimary}>
          Start Now
        </a>
      </section>

      {/* Footer */}
      <footer id="contact" style={styles.footer}>
        <div>© {new Date().getFullYear()} ListHit. All rights reserved.</div>
        <div style={{ opacity: 0.7 }}>
          <a href="mailto:support@listhit.io" style={styles.footerLink}>support@listhit.io</a>
        </div>
      </footer>
    </main>
  );
}

// --- styles ---
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 600px at 20% -10%, #191919, transparent), #0b0b0b",
    color: "white",
    padding: "24px",
  },
  header: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "8px 8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandText: { fontSize: 18, letterSpacing: 0.2 as any },
  nav: { display: "flex", alignItems: "center", gap: 18 },
  navLink: { color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14 },
  navCta: {
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 10,
    background: "#e53935",
    color: "white",
    fontWeight: 600,
    marginLeft: 6,
  },

  hero: {
    maxWidth: 1080,
    margin: "72px auto 0",
    padding: "0 8px",
  },
  h1: {
    fontSize: 56,
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: -0.5 as any,
  },
  accent: { color: "#ff4d4a" },
  sub: { marginTop: 14, opacity: 0.8, fontSize: 18, maxWidth: 760 },

  ctaRow: { display: "flex", gap: 12, marginTop: 26 },
  ctaPrimary: {
    background: "#e53935",
    padding: "12px 18px",
    borderRadius: 12,
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    boxShadow: "0 6px 20px rgba(229,57,53,0.35)",
  },
  ctaGhost: {
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "12px 18px",
    borderRadius: 12,
    color: "#fff",
    textDecoration: "none",
  },

  features: {
    maxWidth: 1080,
    margin: "64px auto 0",
    padding: "0 8px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  card: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 18,
  },
  cardIcon: { fontSize: 22, marginBottom: 8 },
  cardTitle: { margin: "4px 0 4px", fontSize: 16 },
  cardBody: { opacity: 0.8, fontSize: 14, lineHeight: 1.5 },

  pricing: {
    maxWidth: 900,
    margin: "72px auto 0",
    padding: "0 8px",
    textAlign: "center" as const,
  },
  priceBadge: {
    display: "inline-block",
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    marginBottom: 10,
  },
  h2: { margin: "6px 0 8px", fontSize: 28 },
  priceCopy: { opacity: 0.75, marginBottom: 16 },

  footer: {
    maxWidth: 1080,
    margin: "80px auto 20px",
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0.7,
    fontSize: 12,
  },
  footerLink: { color: "rgba(255,255,255,0.9)", textDecoration: "none" },
};
