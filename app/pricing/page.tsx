import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "Pricing",
  description: "Simple pricing for ListHit’s dispositions CRM and buyer communications.",
};

const plans = [
  {
    name: "Starter",
    price: "$79/mo",
    description: "For solo investors validating a market.",
    features: [
      "1 user",
      "5,000 buyers",
      "Saved segments & tags",
      "Deal/offer tracking",
      "Email updates with opt-out",
    ],
    cta: "Request access",
    href: "/contact",
  },
  {
    name: "Team",
    price: "$199/mo",
    description: "For dispo teams collaborating on multiple deals.",
    features: [
      "Up to 5 users",
      "20,000 buyers",
      "Campaigns & alerts",
      "Inbox + activity timeline",
      "Engagement tracking & click metrics",
      "Role-based access",
    ],
    cta: "Talk to sales",
    href: "/contact",
    featured: true,
  },
  {
    name: "Scale",
    price: "Contact us",
    description: "For multi-market operators and brokerage teams.",
    features: [
      "Unlimited users",
      "High-volume buyers & imports",
      "Advanced permissions & SSO",
      "Deliverability & compliance reviews",
      "Custom onboarding & migration",
    ],
    cta: "Contact sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Pricing</div>
        <h1>Pricing that scales with your dispo pipeline.</h1>
        <p>Every plan includes permission-based messaging, clean audit logs, and fast support.</p>
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
              <h3>Not sure which plan fits?</h3>
              <p className="muted">Tell us about your buyers, markets, and messaging goals. We’ll recommend a plan and set up your workspace.</p>
            </div>
            <Button href="/contact">Talk with sales</Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
