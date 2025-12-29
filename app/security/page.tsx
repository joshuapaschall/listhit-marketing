import { Container } from "../../components/Container";

export const metadata = {
  title: "Security",
  description: "Security practices that help keep ListHit reliable and trustworthy.",
};

export default function SecurityPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Security</div>
        <h1>Security controls that protect your data and recipients.</h1>
        <p>
          We design ListHit with security and deliverability in mind: encrypted transport, access
          controls, logging, and prompt incident response for transactional messaging.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Data protection</h3>
          <ul className="list">
            <li>Encryption in transit using TLS for all connections.</li>
            <li>Role-based access and least-privilege permissions.</li>
            <li>Regular backups and secure storage for message metadata.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Monitoring & logging</h3>
          <ul className="list">
            <li>Audit-friendly activity logs for account actions.</li>
            <li>Bounce and complaint tracking to protect deliverability.</li>
            <li>Alerting on suspicious authentication or sending patterns.</li>
          </ul>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Data retention</h3>
          <p className="muted">
            We keep message metadata only as long as needed for delivery, troubleshooting, and legal
            obligations. You can request deletion of account data where allowed.
          </p>
        </div>
        <div className="card">
          <h3>Incident response</h3>
          <p className="muted">
            We respond quickly to security and abuse reports. If you suspect unauthorized activity,
            contact <a href="mailto:support@listhit.io">support@listhit.io</a>. We will investigate,
            notify impacted users when appropriate, and take steps to contain issues.
          </p>
        </div>
      </section>
    </Container>
  );
}
