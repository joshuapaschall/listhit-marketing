import Link from "next/link";
import { Container } from "../../../components/Container";

export const metadata = {
  title: "Signup complete",
  description: "Your ListHit Pro checkout is complete.",
};

export default function SignupCompletePage() {
  return (
    <Container>
      <section className="section" style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="eyebrow">Signup complete</div>
        <h1>You&apos;re all set</h1>
        <p>
          Your checkout is complete. Please verify your email to activate your account access, then continue to the app.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0, maxWidth: 800, margin: "0 auto" }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3>Next steps</h3>
          <ul className="list" style={{ margin: 0 }}>
            <li>Check your inbox for your verification email from ListHit.</li>
            <li>Click the verification link to confirm your account.</li>
            <li>Sign in and start your 14-day ListHit Pro trial.</li>
          </ul>
          <div className="cta-row" style={{ marginTop: 8 }}>
            <Link href="/login" className="btn btn-primary">
              Continue to login
            </Link>
            <Link href="mailto:support@listhit.io" className="btn btn-secondary">
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
