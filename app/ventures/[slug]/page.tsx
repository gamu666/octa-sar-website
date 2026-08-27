import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '../../components/SiteChrome';
import { getVenture, ventures } from '../../lib/ventures';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return {
    title: venture.name,
    description: venture.oneLiner,
    openGraph: { title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
    twitter: { card: 'summary', title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
  };
}

export default async function VentureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();

  return (
    <main className="project-page">
      <SiteHeader />
      <section className="project-hero shell">
        <div className="project-hero__meta">
          <Link href="/ventures">← All ventures</Link>
          <span>Venture {venture.index}</span>
          <span className="status"><i /> {venture.status}</span>
        </div>
        <p className="venture-kicker">{venture.label}</p>
        <h1>{venture.name}</h1>
        <div className="project-hero__foot">
          <p>{venture.oneLiner}</p>
          <div>{venture.sectors.map((sector) => <span key={sector}>{sector}</span>)}</div>
        </div>
      </section>

      <section className="project-intro shell">
        <p className="section-label">The proposition</p>
        <h2>{venture.summary}</h2>
      </section>

      <section className="project-section shell">
        <div className="project-section__title">
          <span>01</span><p className="section-label">The problem</p>
        </div>
        <div className="problem-list">
          {venture.problem.map((problem, index) => (
            <article key={problem}><span>0{index + 1}</span><p>{problem}</p></article>
          ))}
        </div>
      </section>

      <section className="solution-panel">
        <div className="shell">
          <div className="project-section__title"><span>02</span><p className="section-label">Our answer</p></div>
          <h2>{venture.solution}</h2>
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>03</span><p className="section-label">Product flow</p></div>
        <div className="flow-grid">
          {venture.flow.map((item) => (
            <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="evidence-section shell">
        <div className="evidence-copy">
          <p className="section-label">Market &amp; validation</p>
          <h2>Evidence before noise.</h2>
          <p>Public pages show only the thesis. Verified market sizing, research, pilot results and cohort data will be added as they become investor-ready.</p>
        </div>
        <div className="evidence-grid">
          <article><span>Market</span><strong>Research in progress</strong><p>TAM / SAM / SOM shared in the private deck.</p></article>
          <article><span>Traction</span><strong>Pre-launch</strong><p>Pilot KPIs published after a meaningful cohort.</p></article>
          <article><span>Data room</span><strong>By request</strong><p>Assumptions, evidence and model shared under NDA.</p></article>
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>04</span><p className="section-label">Business model</p></div>
        <div className="model-grid">
          {venture.businessModel.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>05</span><p className="section-label">Roadmap</p></div>
        <div className="roadmap">
          {venture.roadmap.map((item) => (
            <article key={item.phase}><span>{item.phase}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="people-section shell">
        <div>
          <p className="section-label">Team &amp; partners</p>
          <h2>Built by a focused founding team, with specialist partners introduced as the venture matures.</h2>
        </div>
        <p>Founder bios, relevant track record and confirmed advisors belong here after permission is secured. No unconfirmed names are published.</p>
      </section>

      <section className="investment-cta shell">
        <div>
          <p className="section-label">Private investor conversation</p>
          <h2>Help build Mongolia’s trusted connection layer.</h2>
        </div>
        <div>
          <p>The raise structure, use of funds and milestones are shared directly with aligned investors. No confidential terms are published here.</p>
          <Link className="button button--light" href="/contact?venture=manai-cercle" data-analytics-event="request_deck_project">
            Request the deck <span>↗</span>
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
