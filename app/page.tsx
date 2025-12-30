import Image from "next/image";
import { Button } from "../components/Button";
import { Container } from "../components/Container";

const capabilityCards = [
  {
    title: "Buyer CRM",
    body: "Tag buyers by market, price band, and intent. Save segments, notes, and contact history in one place.",
    icon: "🗂️",
  },
  {
    title: "Deal pipeline",
    body: "Track properties, offers, status, and owners so acquisitions and dispo stay aligned.",
    icon: "📊",
  },
  {
    title: "Deal distribution",
    body: "Share opportunities with the right buyers using targeted sends and clear context on each property.",
    icon: "📨",
  },
  {
    title: "Team workflow",
    body: "Work with agents and coordinators, keep activity history, and know who’s following up next.",
    icon: "🤝",
  },
];

const steps = [
  { title: "Add buyers", description: "Import your list, tag key criteria, and save VIP or market-specific segments." },
  { title: "Add a deal", description: "Log property details, offers, status, and owners so the team has a single source of truth." },
  { title: "Distribute to matched buyers", description: "Choose the best segment and share the deal with the right investors fast." },
];

const builtFor = ["Wholesalers", "Agents", "Investor teams", "Dispo managers"];

const screenshots = [
  { src: "/screenshots/dashboard.svg", alt: "ListHit dashboard preview" },
  { src: "/screenshots/properties.svg", alt: "Deal pipeline preview" },
  { src: "/screenshots/messaging.svg", alt: "Buyer segment send preview" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div>
              <div className="eyebrow">ListHit for real estate teams</div>
              <h1 style={{ marginTop: 14, fontSize: 44 }}>Buyer CRM & Deal Distribution for Real Estate Teams</h1>
              <p style={{ maxWidth: 720 }}>
                Organize buyers, manage deals and offers, and distribute opportunities to the right investors fast. ListHit keeps your pipeline,
                buyer segments, and team workflow in one workspace.
              </p>
              <div className="cta-row" style={{ marginTop: 18 }}>
                <Button href="/login">Log in</Button>
                <Button variant="secondary" href="/contact">
                  Request access
                </Button>
              </div>
            </div>
            <div className="card highlight-box" style={{ borderRadius: 20 }}>
              <h3 style={{ marginBottom: 12 }}>Built to move deals faster</h3>
              <ul className="list">
                <li>Buyer CRM with tags, segments, saved filters, and import/export.</li>
                <li>Deal pipeline that tracks properties, offers, and status in one view.</li>
                <li>Targeted distribution so the right buyers see the right opportunities.</li>
                <li>Team activity history so everyone knows the next best action.</li>
              </ul>
              <div className="pill" style={{ marginTop: 12, width: "fit-content" }}>
                <span>Support</span>
                <span className="muted">support@listhit.io</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">What you can do with ListHit</div>
            <h2>Keep buyers organized and distribute deals with confidence.</h2>
            <p>Everything needed to manage investor relationships, track offers, and send opportunities to the right people.</p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {capabilityCards.map((feature) => (
              <div key={feature.title} className="card">
                <div className="pill" style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>{feature.icon}</span>
                  <span>{feature.title}</span>
                </div>
                <p className="muted" style={{ marginTop: 6 }}>{feature.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">How it works</div>
            <h2>From buyer list to distributed deal in minutes.</h2>
            <p>ListHit keeps every step simple so teams can focus on closing.</p>
          </div>
          <div className="card-grid" style={{ marginTop: 16 }}>
            {steps.map((step) => (
              <div key={step.title} className="card">
                <div className="pill" style={{ marginBottom: 8 }}>
                  <span>{step.title}</span>
                </div>
                <p className="muted" style={{ marginTop: 4 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Screenshots</div>
            <h2>Product previews</h2>
            <p>See the buyer CRM, deal pipeline, and distribution workflow.</p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {screenshots.map((shot) => (
              <div key={shot.src} className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="pill" style={{ width: "fit-content" }}>
                  <span role="img" aria-label="Screenshot">
                    🖼️
                  </span>
                  <span>Dashboard preview</span>
                </div>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 2.5", borderRadius: 12, overflow: "hidden" }}>
                  <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <p className="muted" style={{ margin: 0 }}>{shot.alt}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Built for</div>
            <h2>Teams that need to move inventory fast.</h2>
            <p>ListHit fits into existing workflows for modern real estate operators.</p>
          </div>
          <div className="badge-list" style={{ marginTop: 12 }}>
            {builtFor.map((item) => (
              <div key={item} className="pill">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <Container>
          <div className="card highlight-box">
            <div className="two-column" style={{ alignItems: "center" }}>
              <div>
                <h2>Ready to move deals faster?</h2>
                <p>Log in to work with your current buyers or request access and we’ll help you get set up.</p>
              </div>
              <div className="cta-row" style={{ justifyContent: "flex-end" }}>
                <Button href="/login">Log in</Button>
                <Button variant="secondary" href="/contact">
                  Request access
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
