import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "Product",
  description: "ListHit combines buyer CRM, deal management, and distribution so real estate teams can move inventory faster.",
};

const pillars = [
  {
    title: "Buyer CRM",
    body: "Organize buyers with tags, segments, saved filters, notes, and history. Import/export via CSV to keep records in sync.",
  },
  {
    title: "Deal management",
    body: "Log properties, offers, status, and owners. Keep acquisitions, dispo, and agents working from the same pipeline.",
  },
  {
    title: "Distribution to buyers",
    body: "Send opportunities to targeted segments with the context buyers need to respond quickly.",
  },
  {
    title: "Reporting",
    body: "Keep a pulse on pipeline health and buyer activity with straightforward performance insights.",
  },
];

const flow = [
  { title: "Import or add buyers", detail: "Tag by market, budget, and interest. Save segments for VIPs and priority buyers." },
  { title: "Create and manage deals", detail: "Track properties, offers, assignments, and follow-ups with clear owners." },
  { title: "Distribute to matched buyers", detail: "Send the deal to the right segment, fast. Keep replies and notes with the record." },
  { title: "Review performance", detail: "See responses and pipeline movement so the team knows what’s working." },
];

export default function ProductPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Product</div>
        <h1>Buyer CRM + deal distribution in one workspace.</h1>
        <p style={{ maxWidth: 760 }}>
          ListHit gives real estate teams a clean way to manage buyers, track deals and offers, and share opportunities with the right investors without
          slowing down.
        </p>
        <div className="cta-row" style={{ marginTop: 16 }}>
          <Button href="/login">Log in</Button>
          <Button variant="secondary" href="/contact">
            Request a walkthrough
          </Button>
        </div>
      </section>

      <section className="section card-grid">
        {pillars.map((feature) => (
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

      <section className="section two-column">
        <div className="card highlight-box">
          <h3>How it works</h3>
          <ul className="list">
            {flow.map((step) => (
              <li key={step.title}>
                <strong>{step.title}:</strong> {step.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Built for real teams</h3>
          <p className="muted">
            ListHit helps dispositions managers, agents, and investors keep buyers organized, share deals quickly, and stay aligned on follow-ups.
            It’s focused on the workflows that move inventory, not extra fluff.
          </p>
          <div className="cta-row" style={{ marginTop: 10 }}>
            <Button variant="secondary" href="/pricing">
              View pricing
            </Button>
            <Button variant="secondary" href="/contact">
              Talk with us
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <div className="two-column" style={{ alignItems: "center" }}>
            <div>
              <h3>See ListHit for your team</h3>
              <p className="muted">Share your markets and pipeline goals. We’ll set up a workspace and walkthrough tailored to you.</p>
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
