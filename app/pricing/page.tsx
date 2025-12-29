import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "Pricing",
  description: "Transparent plans for transactional messaging with consent controls and compliance built in.",
};

const plans = [
  {
    name: "Starter",
    price: "$49/mo",
    description: "For new teams establishing compliant workflows.",
    features: ["5,000 messages/month", "Opt-in list enforcement", "Unsubscribe + bounce handling"],
    cta: "Start now",
    href: "https://app.listhit.io/signup",
  },
  {
    name: "Growth",
    price: "$149/mo",
    description: "For active dispo teams with frequent updates.",
    features: ["50,000 messages/month", "Complaint monitoring & suppression", "Team roles and audit logs"],
    cta: "Upgrade",
    href: "https://app.listhit.io/signup",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For multi-market operators needing custom throughput.",
    features: ["Custom volume", "Dedicated deliverability reviews", "Priority support and onboarding"],
    cta: "Talk to us",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Pricing</div>
        <h1>Plans focused on transactional deliverability.</h1>
        <p>
          Every plan includes permission-based sending, unsubscribe handling, bounce suppression, and
          compliance guidance that aligns with AWS SES expectations.
        </p>
      </section>

      <section className="section card-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`card ${plan.featured ? "highlight-box" : ""}`}>
            <div className="pill" style={{ marginBottom: 8 }}>
              <strong>{plan.name}</strong>
              <span className="muted">{plan.price}</span>
            </div>
            <p className="muted">{plan.description}</p>
            <ul className="list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Button href={plan.href} style={{ marginTop: 12 }}>
              {plan.cta}
            </Button>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="card highlight-box">
          <div className="two-column" style={{ alignItems: "center" }}>
            <div>
              <h3>Need a throughput review?</h3>
              <p className="muted">
                We’ll help you map your sending patterns to SES requirements, set up suppression rules,
                and provide sample logs for production access requests.
              </p>
            </div>
            <Button href="/contact">Schedule a review</Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
