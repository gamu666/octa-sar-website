import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import { ventures } from '../lib/ventures';

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Explore the companies and creative ventures being built by OCTA SAR.',
};

export default function VenturesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero inner-hero--compact shell">
        <p className="eyebrow"><span /> OCTA SAR portfolio</p>
        <h1>Built with<br /><em>intent.</em></h1>
        <div className="inner-hero__foot">
          <p>Focused ventures at the intersection of meaningful human needs, cultural insight and technology.</p>
          <span>{ventures.length.toString().padStart(2, '0')} active venture</span>
        </div>
      </section>

      <section className="venture-index shell">
        {ventures.map((venture) => (
          <Link className="venture-row" href={`/ventures/${venture.slug}`} key={venture.slug}>
            <div className="venture-row__meta">
              <span>{venture.index}</span>
              <span className="status"><i /> {venture.status}</span>
            </div>
            <div>
              <p>{venture.label}</p>
              <h2>{venture.name}</h2>
            </div>
            <div className="venture-row__end">
              <p>{venture.oneLiner}</p>
              <span className="round-arrow">↗</span>
            </div>
          </Link>
        ))}
        <div className="venture-row venture-row--future" aria-label="Future venture placeholder">
          <div className="venture-row__meta"><span>02—08</span><span>Future orbits</span></div>
          <div><p>Across the studio</p><h2>Next</h2></div>
          <div className="venture-row__end"><p>Content, film, art and technology ventures will join the portfolio here.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
