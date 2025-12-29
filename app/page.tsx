import { Button } from "../components/Button";
import { Container } from "../components/Container";

const features = [
  {
    title: "Purpose-built buyer lists",
    body: "Organize buyers by market, price band, and preferences so each update stays relevant and welcome.",
    icon: "📂",
  },
  {
    title: "Permission-based messaging",
    body: "Send opt-in alerts, assignments, and account notifications with unsubscribe and complaint handling baked in.",
    icon: "✅",
  },
  {
    title: "Reliable deliverability",
    body: "Bounce monitoring, complaint logging, and rate-aware sending keep your updates compliant with SES policies.",
    icon: "📡",
  },
];

const complianceItems = [
  "Only send to buyers who have requested updates or given explicit permission.",
  "Honor unsubscribe requests automatically and provide a clear opt-out path.",
  "Monitor bounces and complaints and remove problematic addresses quickly.",
  "Never use purchased, scraped, or third-party lists without consent.",
];

const stats = [
  { label: "Deliverability focus", value: "SES-ready" },
  { label: "Messaging type", value: "Transactional updates" },
  { label: "Opt-out handling", value: "Built-in" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Transactional messaging for real estate</div>
              <h1 style={{ marginTop: 14, fontSize: 44 }}>
                Keep buyers informed with compliant, permission-based updates.
              </h1>
              <p style={{ maxWidth: 620 }}>
                ListHit helps real estate teams deliver deal announcements, account notices, and
                important updates only to subscribers who asked for them. Built for AWS SES review
                standards with clear consent, opt-out, and monitoring controls.
              </p>
              <div className="cta-row" style={{ marginTop: 18 }}>
                <Button href="https://app.listhit.io/signup">Start free</Button>
                <Button variant="secondary" href="/contact">
                  Talk to us
                </Button>
              </div>
              <div className="badge-list">
                {stats.map((stat) => (
                  <div key={stat.label} className="pill">
                    <span className="stat-value" style={{ fontSize: 16 }}>
                      {stat.value}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card highlight-box" style={{ borderRadius: 20 }}>
              <h3 style={{ marginBottom: 12 }}>Send updates with confidence</h3>
              <ul className="list">
                <li>Opt-in lists only—no purchased or scraped contacts.</li>
                <li>Clear unsubscribe links and automated suppression.</li>
                <li>Rate-aware sending tuned for transactional messages.</li>
                <li>Delivery, bounce, and complaint logging for audits.</li>
              </ul>
              <div className="callout" style={{ marginTop: 16 }}>
                <strong>Use cases:</strong>
                <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
                  Property updates, offer status, closing timelines, account security notices, billing
                  confirmations, and opted-in marketing follow-ups with consent.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Platform</div>
            <h2>Built for reliable, permission-based outreach.</h2>
            <p>
              A focused workflow that respects inboxes, keeps lists clean, and makes it easy to prove
              compliance during SES production reviews.
            </p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div className="pill" style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>{feature.icon}</span>
                  <span>{feature.title}</span>
                </div>
                <p className="muted" style={{ marginTop: 6 }}>{feature.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Compliance</div>
            <h2>Respect consent, handle opt-outs, and prevent abuse.</h2>
            <p>
              ListHit enforces permission-based messaging. We prohibit purchased or scraped lists and
              require verifiable consent to receive updates. Every send includes unsubscribe support and
              automatic suppression for complaints or hard bounces.
            </p>
          </div>
          <div className="two-column" style={{ marginTop: 16 }}>
            <div className="card">
              <h3>What we expect</h3>
              <ul className="list">
                {complianceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Monitoring & controls</h3>
              <ul className="list">
                <li>Complaint and bounce monitoring with suppression rules.</li>
                <li>Access controls for team roles and audit-friendly logs.</li>
                <li>Data retention policies with timely removal on request.</li>
                <li>Dedicated support for abuse reports at support@listhit.io.</li>
              </ul>
              <div className="callout" style={{ marginTop: 12 }}>
                <strong>Fast resolutions.</strong>
                <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
                  We respond to abuse or security reports quickly and remove non-compliant senders to
                  protect deliverability for everyone.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <div className="eyebrow">Pricing</div>
            <h2>Predictable plans for transactional messaging.</h2>
            <p>
              Choose the plan that fits your volume and team size. All plans include consent-based
              sending, unsubscribe handling, and monitoring.
            </p>
          </div>
          <div className="card-grid" style={{ marginTop: 20 }}>
            <div className="card">
              <h3>Starter</h3>
              <p className="muted">For small teams validating workflows.</p>
              <ul className="list">
                <li>Up to 5,000 messages/month</li>
                <li>Opt-in list enforcement</li>
                <li>Unsubscribe + bounce handling</li>
              </ul>
              <Button href="https://app.listhit.io/signup" style={{ marginTop: 12 }}>
                Start now
              </Button>
            </div>
            <div className="card highlight-box">
              <h3>Growth</h3>
              <p className="muted">For active dispo teams sending frequent updates.</p>
              <ul className="list">
                <li>Up to 50,000 messages/month</li>
                <li>Complaint monitoring & suppression</li>
                <li>Team roles and audit-friendly logs</li>
              </ul>
              <Button href="https://app.listhit.io/signup" style={{ marginTop: 12 }}>
                Upgrade
              </Button>
            </div>
            <div className="card">
              <h3>Scale</h3>
              <p className="muted">For multi-market operations with custom needs.</p>
              <ul className="list">
                <li>Custom volume and throughput</li>
                <li>Dedicated deliverability reviews</li>
                <li>Priority support and onboarding</li>
              </ul>
              <Button href="/contact" style={{ marginTop: 12 }}>
                Talk to us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <Container>
          <div className="card highlight-box">
            <div className="two-column" style={{ alignItems: "center" }}>
              <div>
                <h2>Ready to show SES how you handle compliance?</h2>
                <p>
                  Set up your lists, send verified updates, and keep clean records of consent,
                  unsubscribes, and complaints. ListHit makes it straightforward to demonstrate
                  transactional-only usage.
                </p>
              </div>
              <div className="cta-row" style={{ justifyContent: "flex-end" }}>
                <Button href="https://app.listhit.io/signup">Create account</Button>
                <Button variant="secondary" href="/contact">
                  Ask a question
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
