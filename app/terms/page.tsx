import { Container } from "../../components/Container";

export const metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the ListHit platform.",
};

export default function TermsPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Terms</div>
        <h1>Terms of Service</h1>
        <p>
          These terms govern your use of ListHit. By accessing the platform, you agree to comply with
          these conditions and our Acceptable Use Policy.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Account responsibilities</h3>
          <ul className="list">
            <li>Provide accurate account information and keep credentials secure.</li>
            <li>Ensure your senders and recipients have provided necessary consent.</li>
            <li>Use the service only for lawful, permission-based communications.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Acceptable use</h3>
          <p className="muted">
            You must follow our Acceptable Use and Anti-Spam policies. We may suspend or terminate
            accounts that violate these rules or harm deliverability for others.
          </p>
        </div>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Service & availability</h3>
          <p className="muted">
            We strive for high availability and will communicate planned maintenance. Temporary
            interruptions may occur for security or operational reasons.
          </p>
        </div>
        <div className="card">
          <h3>Limitation of liability</h3>
          <p className="muted">
            The service is provided “as is” without warranties. To the fullest extent permitted by law,
            ListHit is not liable for indirect, incidental, or consequential damages.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="card highlight-box">
          <h3>Questions</h3>
          <p className="muted">
            Contact <a href="mailto:support@listhit.io">support@listhit.io</a> with any questions about
            these terms.
          </p>
        </div>
      </section>
    </Container>
  );
}
