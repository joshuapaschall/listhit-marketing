import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "About",
  description: "ListHit is a dispositions CRM built for real estate investors and teams to move deals faster.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">About ListHit</div>
        <h1>Dispositions CRM built for real estate investors and teams.</h1>
        <p style={{ maxWidth: 760 }}>
          ListHit helps investor-friendly brokerages and dispo teams manage buyers, track offers, and deliver timely,
          permission-based updates. The goal: move deals faster while keeping every communication clear, compliant, and
          welcome.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Who we serve</h3>
          <ul className="list">
            <li>Dispositions teams sharing new properties with curated buyer segments.</li>
            <li>Investors who need a single system to manage buyers, offers, and follow-ups.</li>
            <li>Teams that prioritize permission-based messaging and clean audit trails.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Our mission</h3>
          <p className="muted">
            Give real estate teams a product-first CRM that respects buyers and keeps deals moving. We believe in
            permission-based messaging, transparent opt-outs, and reliable tracking for every interaction—no tricks to
            “pass” approvals, just respectful communication.
          </p>
          <div className="callout" style={{ marginTop: 12 }}>
            <strong>How we work</strong>
            <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              We build alongside real operators. Clear opt-in policies, practical workflows, and responsive support are
              core to the product.
            </p>
          </div>
        </div>
      </section>

      <section className="section card-grid">
        <div className="card">
          <h3>Messaging & compliance</h3>
          <p className="muted">
            Every alert is permission-based with unsubscribe controls, complaint suppression, and activity logs that show
            who sent what and when. It’s compliance as a principle, not a checkbox.
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
        <div className="card highlight-box">
          <h3>Company info</h3>
          <ul className="list">
            <li>
              Support:{" "}
              <a href="mailto:support@listhit.io" style={{ color: "#dbeafe" }}>
                support@listhit.io
              </a>
            </li>
            <li>ListHit LLC — [Your Business Address]</li>
          </ul>
          <Button href="/contact" style={{ marginTop: 10 }}>
            Talk with our team
          </Button>
        </div>
      </section>
    </Container>
  );
}
