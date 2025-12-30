import { Container } from "../../components/Container";

export const metadata = {
  title: "Privacy Policy",
  description: "How ListHit collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Privacy</div>
        <h1>Privacy Policy</h1>
        <p>
          ListHit is committed to protecting your data and only using it to provide our transactional
          messaging services. This policy explains what we collect, how we use it, and the controls you
          have.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Data we collect</h3>
          <ul className="list">
            <li>Account details you provide, such as name, email, and company.</li>
            <li>Message metadata (timestamps, recipient addresses, bounce/complaint status).</li>
            <li>Usage data for security, abuse prevention, and reliability.</li>
          </ul>
        </div>
        <div className="card">
          <h3>How we use data</h3>
          <ul className="list">
            <li>Operate and improve the ListHit platform.</li>
            <li>Provide support and respond to your requests.</li>
            <li>Detect, investigate, and prevent abuse or security incidents.</li>
          </ul>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Sharing</h3>
          <p className="muted">
            We do not sell or rent personal data. We share data only with trusted processors (like
            infrastructure providers) as needed to deliver the service, subject to confidentiality and
            security obligations.
          </p>
        </div>
        <div className="card">
          <h3>Retention & deletion</h3>
          <p className="muted">
            We retain data for as long as necessary to provide the service and meet legal obligations.
            You may request deletion of your account data by contacting support@listhit.io, subject to
            applicable retention requirements.
          </p>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Security</h3>
          <p className="muted">
            Data is encrypted in transit, access is role-based, and we monitor for unauthorized access.
            See our Security page for more details.
          </p>
        </div>
        <div className="card">
          <h3>Your rights</h3>
          <p className="muted">
            You can access, correct, or delete your data where applicable. Contact us to exercise these
            rights or to ask privacy questions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <h3>Contact</h3>
          <p className="muted">
            For privacy requests or questions, email us at <a href="mailto:support@listhit.io">support@listhit.io</a>.
          </p>
        </div>
      </section>
    </Container>
  );
}
