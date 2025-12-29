import Image from "next/image";
import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "Product",
  description: "See how ListHit helps real estate teams manage buyers, deals, and communications.",
};

const features = [
  {
    title: "Buyer CRM with segments",
    body: "Centralize every buyer, tag markets and capital preferences, and save segments for hot, VIP, or inactive lists.",
  },
  {
    title: "Deals, offers, and tasks",
    body: "Track properties, offers, assignments, and follow-ups with owners and collaborators across your team.",
  },
  {
    title: "Messaging built for consent",
    body: "Send targeted alerts and transactional notifications with opt-out controls, suppression, and engagement tracking.",
  },
  {
    title: "Inbox + activity timeline",
    body: "View every touch—emails, SMS, calls, and tasks—in one place so context is never lost between agents.",
  },
  {
    title: "Team roles & audit trail",
    body: "Role-based permissions for owners, agents, and partners with immutable logs for edits, sends, and imports.",
  },
  {
    title: "Data portability",
    body: "Import/export buyers with CSV, sync tags and segments, and keep clean records when moving between systems.",
  },
];

const screenshots = [
  { src: "/screenshots/dashboard.svg", alt: "Buyer dashboard with KPIs and saved segments" },
  { src: "/screenshots/properties.svg", alt: "Deal board showing properties, offers, and owners" },
  { src: "/screenshots/messaging.svg", alt: "Messaging composer with buyer segments and preview" },
];

const steps = [
  { title: "Import buyers & define segments", detail: "Upload CSVs, map tags, and save filters for markets, price bands, and VIP lists." },
  { title: "Track deals and offers", detail: "Log properties, offers, and follow-ups with clear owners, due dates, and reminders." },
  { title: "Send targeted alerts", detail: "Choose a segment, confirm opt-in, and send tailored alerts with transparent unsubscribe options." },
  { title: "Review engagement", detail: "See opens, clicks, replies, and tasks per buyer so you can prioritize the next outreach." },
];

export default function ProductPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Product</div>
        <h1>Feature-rich dispositions CRM with buyer communications built in.</h1>
        <p style={{ maxWidth: 760 }}>
          ListHit gives investors and dispo teams the tools to manage buyers, track deals, and communicate with permission-based alerts. No fluff—just
          the workflows that move deals to closing.
        </p>
        <div className="cta-row" style={{ marginTop: 16 }}>
          <Button href="/login">Log in</Button>
          <Button variant="secondary" href="/contact">
            Request a walkthrough
          </Button>
        </div>
      </section>

      <section className="section card-grid">
        {features.map((feature) => (
          <div key={feature.title} className="card">
            <div className="pill" style={{ marginBottom: 10 }}>
              <span>{feature.title}</span>
            </div>
            <p className="muted" style={{ marginTop: 4 }}>
              {feature.body}
            </p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">Product screenshots</div>
          <h2>A clear view for every stage of the dispo process.</h2>
          <p>Dashboards, buyer records, and messaging screens that keep your team aligned.</p>
        </div>
        <div className="card-grid" style={{ marginTop: 20 }}>
          {screenshots.map((shot) => (
            <div key={shot.src} className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="pill" style={{ width: "fit-content" }}>
                <span role="img" aria-label="Screenshot">
                  🖼️
                </span>
                <span>Preview</span>
              </div>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 2.5", borderRadius: 12, overflow: "hidden" }}>
                <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <p className="muted" style={{ margin: 0 }}>{shot.alt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div className="card highlight-box">
          <h3>How it works</h3>
          <ul className="list">
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}:</strong> {step.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Messaging & compliance</h3>
          <p className="muted">
            ListHit is permission-first: opt-in confirmations, unsubscribe links, complaint suppression, and transparent activity logs. We keep messaging
            aligned to buyers’ expectations and provide clear references for your policies.
          </p>
          <div className="cta-row" style={{ marginTop: 10 }}>
            <Button variant="secondary" href="/acceptable-use">
              Acceptable use
            </Button>
            <Button variant="secondary" href="/privacy">
              Privacy
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <div className="two-column" style={{ alignItems: "center" }}>
            <div>
              <h3>See ListHit for your team</h3>
              <p className="muted">
                Share your markets, buyers, and messaging goals. We’ll tailor a workspace and send a guided walkthrough.
              </p>
            </div>
            <div className="cta-row" style={{ justifyContent: "flex-end" }}>
              <Button href="/contact">Request access</Button>
              <Button variant="secondary" href="/about">
                Learn about us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
