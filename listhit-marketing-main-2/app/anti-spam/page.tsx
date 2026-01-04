import { Container } from "../../components/Container";

export const metadata = {
  title: "Anti-Spam Policy",
  description: "ListHit’s rules to prevent spam and ensure permission-based messaging.",
};

export default function AntiSpamPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Anti-Spam</div>
        <h1>We enforce permission-based messaging.</h1>
        <p>
          ListHit is designed for transactional and opt-in communications only. Customers must have
          documented consent from recipients. We ban purchased or scraped lists and require clear
          unsubscribe handling.
        </p>
        <p className="muted" style={{ marginTop: 10 }}>
          Only permission-based email. No cold outreach or purchased lists.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Sender obligations</h3>
          <ul className="list">
            <li>Send only to contacts who opted in or have a legitimate expectation of messages.</li>
            <li>Include unsubscribe instructions and honor opt-outs immediately.</li>
            <li>Keep auditable records of consent, bounces, and complaints.</li>
          </ul>
        </div>
        <div className="card">
          <h3>How we enforce</h3>
          <ul className="list">
            <li>Complaint and bounce monitoring with automatic suppression.</li>
            <li>Rate limiting and abuse detection to protect deliverability.</li>
            <li>Suspension or termination for spam, list scraping, or purchased data.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <h3>Report spam</h3>
          <p className="muted">
            If you received unwanted messages sent through ListHit, email{" "}
            <a href="mailto:support@listhit.io">support@listhit.io</a> with headers and the message
            body. We investigate quickly and suppress offending senders and addresses.
          </p>
        </div>
      </section>
    </Container>
  );
}
