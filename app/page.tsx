import { Button } from "../components/Button";
import { Container } from "../components/Container";

const capabilityCards = [
  {
    title: "Buyer CRM",
    body: "Segment by tags, markets, and intent with saved filters, notes, and contact history.",
    icon: "🗂️",
  },
  {
    title: "Deal Pipeline",
    body: "Track properties, offers, and status so acquisitions and dispo stay in lockstep.",
    icon: "📊",
  },
  {
    title: "Deal Distribution",
    body: "Send opportunities to the right buyers with context on price, terms, and timelines.",
    icon: "📨",
  },
  {
    title: "Team Workflow",
    body: "Assign work, capture follow-ups, and keep every touchpoint visible to the team.",
    icon: "🤝",
  },
  {
    title: "Import/Export",
    body: "Clean CSV imports, bulk updates, and exports that keep your buyer list healthy.",
    icon: "📥",
  },
  {
    title: "Activity Timeline",
    body: "Know who did what and when with a running log across buyers, deals, and sends.",
    icon: "📜",
  },
];

const steps = [
  { title: "Add buyers", description: "Import your list, tag key criteria, and save VIP or market-specific segments." },
  { title: "Add a deal", description: "Log property details, offers, status, and owners so the team has a single source of truth." },
  { title: "Distribute to matched buyers", description: "Choose the best segment and share the deal with the right investors fast." },
];

const builtFor = ["Wholesalers", "Agents", "Investor teams", "Dispo managers"];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">ListHit for real estate teams</div>
              <h1 className="hero-title">Buyer CRM & Deal Distribution for Real Estate Teams</h1>
              <p className="lead">
                Organize buyers, manage deals and offers, and distribute opportunities to the right investors fast. ListHit keeps your pipeline,
                buyer segments, and team workflow in one workspace.
              </p>
              <div className="cta-row" style={{ marginTop: 18 }}>
                <Button href="/login">Log in</Button>
                <Button variant="secondary" href="/contact">
                  Request access
                </Button>
              </div>
              <div className="hero-meta">
                <div className="pill">
                  <span role="img" aria-label="Workflow">
                    ⚡
                  </span>
                  <span>Distribute deals in minutes</span>
                </div>
                <div className="pill" aria-label="Support email">
                  <span>Support</span>
                  <span className="muted">support@listhit.io</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="card highlight-box" style={{ borderRadius: 20 }}>
                <div className="pill" style={{ marginBottom: 10, width: "fit-content" }}>
                  <span role="img" aria-label="Dashboard">
                    📈
                  </span>
                  <span>Buyer performance</span>
                </div>
                <div className="hero-chart">
                  <div className="hero-chart__stat">
                    <span className="stat-value">2,184</span>
                    <span className="stat-label">Active buyers</span>
                  </div>
                  <div className="hero-chart__stat">
                    <span className="stat-value">38</span>
                    <span className="stat-label">Deals this month</span>
                  </div>
                  <div className="hero-chart__stat">
                    <span className="stat-value">92%</span>
                    <span className="stat-label">Engaged segments</span>
                  </div>
                </div>
                <div className="card" style={{ marginTop: 12, borderRadius: 14, background: "#f8fafc", borderColor: "#e2e8f0" }}>
                  <h3 style={{ marginBottom: 6 }}>Next actions</h3>
                  <ul className="list" style={{ margin: 0, paddingLeft: 18 }}>
                    <li>
                      <strong>Segment VIP buyers</strong> based on tags and market focus.
                    </li>
                    <li>
                      <strong>Attach deals</strong> with pricing, offers, and owners so nothing slips.
                    </li>
                    <li>
                      <strong>Send to the right list</strong> using saved segments and templates.
                    </li>
                  </ul>
                </div>
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
          <div className="features-grid" style={{ marginTop: 24 }}>
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
