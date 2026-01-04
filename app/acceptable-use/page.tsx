import { Container } from "../../components/Container";

export const metadata = {
  title: "Acceptable Use",
  description: "Rules for using ListHit responsibly and in compliance with anti-spam laws.",
};

export default function AcceptableUsePage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Acceptable Use</div>
        <h1>Use ListHit responsibly.</h1>
        <p>
          ListHit is for permission-based communications only. We prohibit purchased lists, scraped
          contacts, or any outreach that lacks clear consent. This policy helps keep deliverability
          healthy and protects recipients.
        </p>
        <p className="muted" style={{ marginTop: 10 }}>
          Only permission-based email. No cold outreach or purchased lists.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Prohibited uses</h3>
          <ul className="list">
            <li>Sending to purchased, rented, or scraped lists.</li>
            <li>Sending without verifiable consent or legitimate interest.</li>
            <li>Misleading sender identities, subject lines, or content.</li>
            <li>Illegal content, harassment, or violating CAN-SPAM/TCPA or similar laws.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Required practices</h3>
          <ul className="list">
            <li>Maintain opt-in records and honor unsubscribe requests promptly.</li>
            <li>Remove bounced or complained addresses quickly.</li>
            <li>Include accurate sender details and contact information.</li>
            <li>Use ListHit for transactional updates and consented communications only.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <h3>Reporting</h3>
          <p className="muted">
            Report abuse or violations to <a href="mailto:support@listhit.io">support@listhit.io</a>.
            We investigate quickly and may suspend access to protect recipients and platform
            deliverability.
          </p>
        </div>
      </section>
    </Container>
  );
}
