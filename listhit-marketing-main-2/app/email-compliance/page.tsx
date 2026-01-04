import { Container } from "../../components/Container";

export const metadata = {
  title: "Email Compliance",
  description: "How ListHit manages permission-based email, suppression, and abuse handling.",
};

const abuseEmail = "abuse@listhit.io";
const supportEmail = "support@listhit.io";

export default function EmailCompliancePage() {
  const abuseContact = abuseEmail || supportEmail;

  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Email Compliance</div>
        <h1>How ListHit protects recipients and deliverability.</h1>
        <p>
          ListHit is built for permission-based messaging only. We require customer-supplied, opt-in contacts and apply safeguards that
          respect unsubscribe requests, suppress risky addresses, and block unsolicited outreach.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>What ListHit is</h3>
          <p className="muted">
            ListHit is a B2B buyer CRM and deal distribution platform for real estate teams. Customers manage their own buyer relationships,
            log deals, and send transactional or consented updates to existing contacts.
          </p>
        </div>
        <div className="card">
          <h3>Where email addresses come from</h3>
          <p className="muted">
            All contacts are provided by the customer. We require explicit opt-in or a documented business relationship with clear expectations
            for communication. We do not supply contacts or permit scraped, purchased, or rented lists.
          </p>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Unsubscribe handling</h3>
          <p className="muted">
            Every message must include a one-click unsubscribe link and a List-Unsubscribe header. Opt-outs are honored immediately and the
            address is suppressed from future sends across the customer&apos;s workspace.
          </p>
        </div>
        <div className="card">
          <h3>Bounces & complaints</h3>
          <p className="muted">
            We use Amazon SES event data to automatically suppress hard bounces and complaint addresses. These contacts cannot be messaged
            again unless the recipient&apos;s status is cleared after investigation.
          </p>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Prohibited use</h3>
          <ul className="list">
            <li>No scraping or harvesting addresses.</li>
            <li>No purchased, rented, or third-party lists.</li>
            <li>No cold outreach or messages without clear consent.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Abuse reporting</h3>
          <p className="muted">
            Report abuse to <a href={`mailto:${abuseContact}`}>{abuseContact}</a>. Provide message headers and details so we can investigate,
            suspend offending senders, and suppress affected addresses quickly.
          </p>
        </div>
      </section>
    </Container>
  );
}
