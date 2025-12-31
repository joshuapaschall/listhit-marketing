import Link from "next/link";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";

export const metadata = {
  title: "Get started",
  description: "Create your ListHit account to access buyer CRM and deal distribution tools.",
};

export default function GetStartedPage() {
  return (
    <Container>
      <section className="section" style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="eyebrow">Get started</div>
        <h1>Create your ListHit account</h1>
        <p>
          Create your ListHit account to access buyer CRM and deal distribution tools. By creating an account you agree to our{" "}
          <Link href="/terms" className="nav-link" style={{ padding: 0 }}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="nav-link" style={{ padding: 0 }}>
            Privacy Policy
          </Link>
          .
        </p>
        <div className="card" style={{ marginTop: 18 }}>
          <div className="two-column" style={{ alignItems: "center" }}>
            <div>
              <h3 style={{ marginBottom: 6 }}>Start with a free trial</h3>
              <p className="muted" style={{ marginTop: 0 }}>
                Create your workspace to manage buyers, deals, and distribution in one place. Invite your team when you’re ready.
              </p>
            </div>
            <div className="cta-row" style={{ justifyContent: "flex-end" }}>
              <Button href="/signup">Continue to signup</Button>
              <Button variant="secondary" href="/contact">
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
