import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from './components/SiteChrome';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow"><span /> Independent venture studio · Ulaanbaatar</p>
          <h1>We turn<br />meaningful ideas<br />into <em>enduring ventures.</em></h1>
          <p className="hero__lede">
            OCTA SAR creates and grows products at the intersection of technology,
            culture, film and human connection.
          </p>
          <div className="hero__actions">
            <Link className="button button--light" href="#ventures">
              Explore ventures <span>↗</span>
            </Link>
            <Link className="text-link" href="#contact">Request investor deck <span>→</span></Link>
          </div>
        </div>
        <div className="hero__symbol">
          <p>One orbit.<br />Many possibilities.</p>
          <Mark />
          <span className="orbit-note">08 / ∞</span>
        </div>
      </section>

      <section className="manifesto shell" id="philosophy">
        <p className="section-label">Our point of view</p>
        <p className="manifesto__statement">
          The next defining companies from Mongolia will not simply copy what exists.
          They will combine <span>local truth</span> with <span>global ambition.</span>
        </p>
      </section>

      <section className="ventures shell" id="ventures">
        <div className="section-heading">
          <div>
            <p className="section-label">01 · Current venture</p>
            <h2>Building what<br />should exist.</h2>
          </div>
          <p>We back focused teams solving human problems with trust, taste and technology.</p>
        </div>

        <Link className="venture-card" href="/ventures/manai-cercle">
          <div className="venture-card__top">
            <span className="status"><i /> In development</span>
            <span>Venture 01</span>
          </div>
          <div className="venture-card__body">
            <div>
              <p className="venture-kicker">Verified social ecosystem</p>
              <h3>MANAI<br />CERCLE</h3>
            </div>
            <div className="venture-card__aside">
              <p>A safer, more intentional way for Mongolians to meet, connect and belong.</p>
              <span className="round-arrow">↗</span>
            </div>
          </div>
          <div className="venture-card__footer">
            <span>Technology</span><span>Community</span><span>Trust &amp; safety</span>
          </div>
        </Link>
      </section>

      <section className="home-contact shell" id="contact">
        <p className="section-label">Investor relations</p>
        <h2>Interested in what<br />we’re building?</h2>
        <Link className="button button--light" href="/contact">Start a conversation <span>↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
