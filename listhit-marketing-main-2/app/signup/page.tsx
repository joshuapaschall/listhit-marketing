import Link from "next/link";
import { Container } from "../../components/Container";
import { SignupForm } from "./SignupForm";

export const metadata = {
  title: "Sign up",
  description: "Create your ListHit account to access buyer CRM and deal distribution tools.",
};

export default function SignupPage({
  searchParams,
}: {
  searchParams?: {
    email?: string;
  };
}) {
  const initialEmail = searchParams?.email ?? "";

  return (
    <Container>
      <section className="section" style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="eyebrow">Sign up</div>
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
      </section>
      <section className="section" style={{ paddingTop: 0, maxWidth: 800, margin: "0 auto" }}>
        <SignupForm initialEmail={initialEmail} />
      </section>
    </Container>
  );
}
