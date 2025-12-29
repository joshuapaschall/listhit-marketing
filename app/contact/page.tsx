import { Container } from "../../components/Container";
import { ContactForm } from "./sections/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Reach the ListHit team for support, compliance questions, or onboarding help.",
};

export default function ContactPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Contact</div>
        <h1>We respond quickly to support and compliance requests.</h1>
        <p>
          Email us at <a href="mailto:support@listhit.io">support@listhit.io</a> or use the form below.
          We typically respond within one business day for onboarding and compliance questions.
        </p>
      </section>

      <section className="section two-column">
        <ContactForm />
        <div className="card">
          <h3>What to expect</h3>
          <ul className="list">
            <li>We only contact you about your request—no unsolicited outreach.</li>
            <li>Compliance questions are answered by a human with deliverability experience.</li>
            <li>Abuse reports are prioritized and acted on promptly.</li>
          </ul>
          <div className="callout" style={{ marginTop: 12 }}>
            <strong>Need faster help?</strong>
            <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              Email <a href="mailto:support@listhit.io">support@listhit.io</a> with “Urgent” in the
              subject for time-sensitive compliance or security issues.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
