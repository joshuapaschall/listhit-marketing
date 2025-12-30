import { Container } from "../../components/Container";
import { Button } from "../../components/Button";

export const metadata = {
  title: "About",
  description: "ListHit is a buyer CRM and deal distribution platform built for real estate teams.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="section">
        <div className="eyebrow">About ListHit</div>
        <h1>Buyer CRM and deal distribution for modern real estate teams.</h1>
        <p style={{ maxWidth: 760 }}>
          ListHit was built for investors, agents, and dispo managers who need a clean, purpose-built workspace for buyers and deals. Organize every
          relationship, track offers, and share opportunities without slowing the team down.
        </p>
      </section>

      <section className="section two-column">
        <div className="card">
          <h3>Who we serve</h3>
          <ul className="list">
            <li>Dispositions teams sharing new properties with curated buyer segments.</li>
            <li>Agents and investor teams managing VIP buyers and active deals in one place.</li>
            <li>Operators who want clear ownership, notes, and history on every buyer and property.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Our mission</h3>
          <p className="muted">
            Help real estate teams move deals faster with a product that keeps buyers organized and communications focused. We build alongside operators
            to keep the workflows practical and ready for day-to-day use.
          </p>
          <div className="callout" style={{ marginTop: 12 }}>
            <strong>How we work</strong>
            <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
              Clear workflows, fast support, and a focus on buyer relationships guide what we ship.
            </p>
          </div>
        </div>
      </section>

      <section className="section card-grid">
        <div className="card">
          <h3>What we’re building</h3>
          <p className="muted">
            A dedicated buyer CRM with deal management, distribution, and reporting built for real estate operators. No generic tools—just what teams
            need to keep buyers engaged and inventory moving.
          </p>
          <Button variant="secondary" href="/product" style={{ marginTop: 10 }}>
            Explore the product
          </Button>
        </div>
        <div className="card highlight-box">
          <h3>Company info</h3>
          <ul className="list">
            <li>
              Support:{" "}
              <a href="mailto:support@listhit.io" style={{ color: "#dbeafe" }}>
                support@listhit.io
              </a>
            </li>
            <li>Company: ListHit</li>
            <li>Based in the United States</li>
          </ul>
          <Button href="/contact" style={{ marginTop: 10 }}>
            Talk with our team
          </Button>
        </div>
      </section>
    </Container>
  );
}
