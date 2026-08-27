import type { Metadata } from 'next';
import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Philosophy',
  description: 'Why OCTA SAR exists and how we build enduring ventures from Mongolia.',
};

const principles = [
  ['01', 'Begin with human truth', 'We look for real tension in how people live, connect and create—not a fashionable category in search of a problem.'],
  ['02', 'Earn trust by design', 'Trust is product infrastructure. We build it deliberately into the experience, business and way we communicate.'],
  ['03', 'Think beyond the launch', 'A sharp first product matters. So does the discipline to turn it into an enduring, responsible company.'],
  ['04', 'Local depth, global standard', 'We begin with Mongolian context and build with the clarity, craft and ambition to travel further.'],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero shell">
        <p className="eyebrow"><span /> About OCTA SAR</p>
        <h1>One studio.<br />Many <em>orbits.</em></h1>
        <div className="inner-hero__foot">
          <p>We are an independent company creating focused ventures across technology, culture, film and creative work.</p>
          <span>Est. Ulaanbaatar</span>
        </div>
      </section>

      <section className="about-origin shell">
        <div className="about-origin__mark"><Mark /></div>
        <div>
          <p className="section-label">Why we exist</p>
          <h2>Original companies can emerge from overlooked contexts.</h2>
          <p>OCTA SAR exists to give those ideas the strategy, design, technology and patient attention they need to become real businesses.</p>
        </div>
      </section>

      <section className="principles shell">
        <div className="section-heading">
          <div><p className="section-label">How we build</p><h2>Our operating<br />principles.</h2></div>
        </div>
        <div className="principle-list">
          {principles.map(([index, title, text]) => (
            <article key={index}>
              <span>{index}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta shell">
        <p className="section-label">The work</p>
        <h2>See what we’re<br />building now.</h2>
        <Link className="button button--light" href="/ventures">Explore ventures <span>↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
