import Image from "next/image";
import { Button } from "../components/Button";
import { Container } from "../components/Container";

const featureBlocks = [
  {
    title: "Manage buyers + segments",
    body: "Centralize every investor, tag markets and price bands, and save reusable filters for hot, VIP, or inactive buyers.",
    icon: "📂",
  },
  {
    title: "Track deals & offers",
    body: "Log properties, offers, and status updates in one view so acquisitions, dispo, and ops stay aligned.",
    icon: "🏠",
  },
  {
    title: "Opt-in alerts & notifications",
    body: "Send targeted deal drops, offer follow-ups, and account notices with opt-out handling and clear preferences.",
    icon: "📢",
  },
  {
    title: "Inbox + activity timeline",
    body: "See every touch—emails, SMS, calls, clicks, and tasks—in a single buyer timeline with engagement signals.",
    icon: "📬",
  },
  {
    title: "Team roles & audit trail",
    body: "Granular roles for owners, agents, and collaborators plus immutable logs for edits, sends, and list changes.",
    icon: "🛡️",
  },
];

const screenshots = [
  { src: "/screenshots/dashboard.svg", alt: "ListHit buyer dashboard showing segments and KPIs" },
  { src: "/screenshots/properties.svg", alt: "ListHit property and offer tracking board" },
  { src: "/screenshots/messaging.svg", alt: "Messaging composer with opt-in buyer alerts" },
];

const useCases = [
  "Dispositions teams announcing new properties to qualified buyer segments.",
  "Investors managing VIP lists with saved filters and market-specific alerts.",
  "Coordinators tracking offers, assignments, and follow-ups in one timeline.",
  "Teams sending transactional notifications with clear opt-out controls.",
];

const trustSignals = [
  { label: "Buyer records managed", value: "Thousands" },
  { label: "Built for", value: "Dispo + acquisitions teams" },
  { label: "Support", value: "support@listhit.io" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Real estate dispositions CRM</div>
              <h1 style={{ marginTop: 14, fontSize: 44 }}>Dispositions CRM + Buyer Communications for Real Estate Teams</h1>
              <p style={{ maxWidth: 720 }}>
                ListHit helps investors and dispo teams manage buyers, track deals, and send permission-based alerts from
                one place. Keep segments warm, follow offers through closing, and communicate with confidence.
              </p>
              <div className="cta-row" style={{ marginTop: 18 }}>
                <Button href="/login">Log in</Button>
                <Button variant="secondary" href="/contact">
                  Request access
                </Button>
              </div>
              <div className="badge-list">
                {trustSignals.map((stat) => (
                  <div key={stat.label} className="pill">
                    <span className="stat-value" style={{ fontSize: 16 }}>
                      {stat.value}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card highlight-box" style={{ borderRadius: 20 }}>
              <h3 style={{ marginBottom: 12 }}>Purpose-built for dispo teams</h3>
              <ul className="list">
                <li>Buyer CRM with segments, saved filters, CSV import/export, and bulk updates.</li>
                <li>Deal + offer tracking with statuses, notes, and agent ownership.</li>
                <li>Inbox and activity timelines that keep context for every buyer and property.</li>
                <li>Opt-in alerts, transactional notifications, and engagement tracking.</li>
              </ul>
              <div className="callout" style={{ marginTop: 16 }}>
                <strong>Built to move deals faster.</strong>
                <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
                  Keep your best buyers close, send targeted updates they expect, and keep teams aligned from assignment
                  to closing.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Platform</div>
            <h2>Everything you need to run dispositions in one workspace.</h2>
            <p>
              ListHit keeps your buyers, deals, messaging, and team workflows together so every update is timely,
              relevant, and compliant with permission-based outreach.
            </p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {featureBlocks.map((feature) => (
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
            <div className="eyebrow">Product screenshots</div>
            <h2>See ListHit in action.</h2>
            <p>Buyer CRM, offer tracking, and messaging workflows designed for dispo and acquisitions teams.</p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {screenshots.map((shot) => (
              <div key={shot.src} className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="pill" style={{ width: "fit-content" }}>
                  <span role="img" aria-label="Screenshot">
                    🖼️
                  </span>
                  <span>Product view</span>
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
            <div className="eyebrow">Use cases</div>
            <h2>Built for the way real estate teams work.</h2>
            <p>ListHit is the operational hub for investor relations, dispo, and acquisitions coordination.</p>
          </div>
          <div className="two-column" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>How teams use ListHit</h3>
              <ul className="list">
                {useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card highlight-box">
              <h3>Messaging & compliance</h3>
              <p className="muted">
                Permission-based messaging is built in: unsubscribe handling, complaint suppression, and audit-ready
                activity logs with role-based access. Deliver updates buyers expect—no tricks or gray-area sending.
              </p>
              <div className="pill" style={{ marginTop: 10, width: "fit-content" }}>
                <span>Fast support</span>
                <span className="muted">support@listhit.io</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <Container>
          <div className="card highlight-box">
            <div className="two-column" style={{ alignItems: "center" }}>
              <div>
                <h2>Ready to move deals faster?</h2>
                <p>
                  Log in to manage your buyers and deals today, or request access and we’ll help set up segments, alerts,
                  and tracking tailored to your markets.
                </p>
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
