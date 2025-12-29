import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "About",
  description:
    "ListHit is a transactional messaging platform for real estate teams that keeps buyers informed with permission-based updates.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">About ListHit</div>
        <h1>Purpose-built messaging for real estate buyers.</h1>
        <p>
          ListHit was created for acquisition and dispo teams who need reliable, compliant messaging
          without blasting inboxes. We focus on transactional updates—deal announcements, offer status,
          account notices, and billing confirmations—for buyers who asked to stay informed.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Who we serve</h3>
          <ul className="list">
            <li>Dispositions teams that need timely, opt-in property updates.</li>
            <li>Operators who want clear unsubscribe handling and consent records.</li>
            <li>Teams preparing for AWS SES production access with a compliant footprint.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Our mission</h3>
          <p className="muted">
            Help real estate operators deliver trusted, permission-based communications that respect
            inboxes and keep buyers engaged. We prioritize deliverability, consent, and fast responses
            to abuse or security concerns.
          </p>
          <div className="callout" style={{ marginTop: 12 }}>
            <strong>Contact us</strong>
            <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              Questions about compliance or onboarding? We respond quickly at support@listhit.io.
            </p>
            <Button href="/contact" style={{ marginTop: 12 }}>
              Talk with our team
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
