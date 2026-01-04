import { Container } from "../../components/Container";
import { RequestAccessForm } from "./RequestAccessForm";

export const metadata = {
  title: "Request access",
  description: "Request a ListHit demo or onboarding conversation.",
};

export default function RequestAccessPage() {
  return (
    <Container>
      <section className="section" style={{ maxWidth: 840, margin: "0 auto" }}>
        <div className="eyebrow">Request access</div>
        <h1>Talk with us about your buyer CRM and deal workflow.</h1>
        <p>
          Share your team goals and we’ll walk through ListHit for buyer management, deal tracking, and distribution. We’ll confirm access and help
          you set up your workspace.
        </p>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <RequestAccessForm />
      </section>
    </Container>
  );
}
