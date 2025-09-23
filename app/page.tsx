// app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0b0b",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: 920, width: "100%" }}>
        <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/logo.png" width={40} height={40} alt="ListHit logo" />
          <strong style={{ fontSize: 20 }}>ListHit</strong>
        </header>

        <section style={{ marginTop: 56 }}>
          <h1 style={{ fontSize: 48, lineHeight: 1.1, margin: 0 }}>
            Dispo deals faster with <span style={{ color: "#e53935" }}>ListHit</span>
          </h1>
          <p style={{ marginTop: 16, opacity: 0.8, fontSize: 18 }}>
            Power dialer with Telnyx. Buyer CRM with SendFox. Built for real estate wholesalers.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <a
              href="https://app.listhit.io"
              style={{
                background: "#e53935",
                padding: "12px 20px",
                borderRadius: 12,
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Launch App
            </a>
            <a
              href="/about"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px 20px",
                borderRadius: 12,
                color: "white",
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </div>
        </section>

        <footer style={{ marginTop: 80, opacity: 0.5, fontSize: 12 }}>
          © {new Date().getFullYear()} ListHit. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
