import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "Pricing",
  description: "Straightforward plans for ListHit’s buyer CRM and deal distribution platform.",
};

const plans = [
  {
    name: "Starter",
    price: "$79/mo",
    description: "For solo investors and new dispo managers.",
    features: ["1 user", "5,000 buyers", "Tags, notes, saved segments", "Deal & offer tracking", "Targeted deal distribution"],
    cta: "Sign up",
    href: "/signup",
  },
  {
    name: "Team",
    price: "$199/mo",
    description: "For teams running multiple deals at once.",
    features: ["Up to 5 users", "20,000 buyers", "Buyer CRM with import/export", "Deal pipeline & ownership", "Distribution with segments", "Activity history & notes"],
    cta: "Talk with us",
    href: "/contact",
    featured: true,
  },
  {
    name: "Scale",
    price: "Contact us",
    description: "For multi-market operators and brokerage teams.",
    features: ["Unlimited users", "High-volume buyers & imports", "Advanced permissions", "Team workflows & roles", "Dedicated onboarding"],
    cta: "Contact us",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">Pricing</div>
        <h1>Pricing that matches your pipeline.</h1>
        <p>Choose a plan that fits how your team manages buyers and distributes deals.</p>
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
