import Link from 'next/link';
import { Reveal } from '../components/Reveal';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import type { Venture } from '../lib/ventures';

function DetailVisual({ slug }: { slug: string }) {
  const isCercle = slug === 'manai-cercle';
  return (
    <div className={`ap-detail-visual ap-detail-visual--${slug}`} aria-hidden="true">
      <div className="ap-detail-browser">
        <div className="ap-detail-browser__bar"><i /><i /><i /><span>{isCercle ? 'manai cercle' : 'THE RISE · system'}</span></div>
        <div className="ap-detail-browser__body">
          <small>{isCercle ? 'ТАНЫ ХҮРЭЭЛЭЛ' : 'ҮЙЛ АЖИЛЛАГААНЫ НЭГДСЭН ОРЧИН'}</small>
          <strong>{isCercle ? <>Зөв хүнээ.<br />Зөв орчноос.</> : <>Цааснаас<br />систем рүү.</>}</strong>
          <div className="ap-detail-widgets"><i /><i /><i /></div>
        </div>
      </div>
      <div className="ap-detail-phone"><span /><b>{isCercle ? 'cercle' : 'THE RISE'}</b><small>{isCercle ? '86% нийцэл' : 'Миний хуваарь'}</small><i /><i /></div>
    </div>
  );
}

export function VentureDetail({ venture }: { venture: Venture }) {
  const isRise = venture.slug === 'the-rise';

  return (
    <main className={`apple-page apple-project apple-project--${venture.slug}`} id="main-content">
      <SiteHeader light />

      <section className="ap-detail-hero" aria-labelledby="project-title">
        <div className="ap-detail-hero__copy">
          <Link className="ap-back-link" href="/ventures">‹ Бүх төсөл</Link>
          <p className="ap-status"><i /> {venture.status} · Төсөл {venture.index}</p>
          <h1 id="project-title">{isRise ? 'Цааснаас систем рүү' : 'Манай Cercle'}</h1>
          <p>{isRise ? 'THE RISE-ийн үйл ажиллагааны цахим шилжилт.' : 'Зөв хүнээ. Зөв орчноос.'}</p>
        </div>
        <div className="ap-detail-hero__visual"><DetailVisual slug={venture.slug} /></div>
      </section>

      <section className="ap-overview ap-shell">
        <p className="ap-eyebrow">Үндсэн санаа</p>
        <h2>{venture.summary}</h2>
        <div className="ap-pills">{venture.sectors.map((sector) => <span key={sector}>{sector}</span>)}</div>
      </section>

      <section className="ap-feature-section">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Шийдэх асуудал</p>
          <h2>Өнөөдрийн зөрүү.</h2>
        </div>
        <div className="ap-card-grid ap-shell">
          {venture.problem.map((problem, index) => (
            <Reveal className="ap-card ap-card--problem" key={problem}>
              <span>0{index + 1}</span>
              <p>{problem}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ap-solution">
        <Reveal className="ap-solution__copy ap-shell">
          <p className="ap-eyebrow">Шийдэл</p>
          <h2>{venture.solution}</h2>
        </Reveal>
      </section>

      <section className="ap-feature-section">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Бүтээгдэхүүний урсгал</p>
          <h2>Гурван алхам.</h2>
        </div>
        <div className="ap-card-grid ap-card-grid--three ap-shell">
          {venture.flow.map((item) => (
            <Reveal className="ap-card ap-card--step" key={item.step}>
              <span>{item.step}</span><h3>{item.title}</h3><p>{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {venture.plannedImpact && (
        <section className="ap-impact ap-shell">
          <div><strong>{venture.plannedImpact.value}</strong><span>{venture.plannedImpact.unit}</span></div>
          <p>{venture.plannedImpact.detail}</p>
          <small>Төлөвлөсөн нөлөө · Бодит үр дүн биш</small>
        </section>
      )}

      <section className="ap-feature-section ap-feature-section--soft">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">{isRise ? 'Системийн бүтэц' : 'Бизнесийн бүтэц'}</p>
          <h2>{isRise ? 'Нэг өгөгдөл. Гурван орчин.' : 'Урт хугацаанд ажиллах загвар.'}</h2>
        </div>
        <div className="ap-card-grid ap-card-grid--three ap-shell">
          {venture.businessModel.map((item, index) => (
            <Reveal className="ap-card" key={item.title}>
              <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ap-roadmap ap-shell">
        <div className="ap-section-heading">
          <p className="ap-eyebrow">Хөгжлийн зураглал</p>
          <h2>Дараагийн алхам.</h2>
        </div>
        <div className="ap-roadmap__list">
          {venture.roadmap.map((item) => (
            <article key={item.phase}><span>{item.phase}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="ap-callout ap-callout--project">
        <Reveal className="ap-callout__copy">
          <p className="ap-eyebrow">Хамтын ажиллагаа</p>
          <h2>Хамтдаа дараагийн алхмыг бүтээе.</h2>
          <Link className="ap-button" href={`/contact?venture=${venture.slug}`}>Яриа эхлүүлэх</Link>
        </Reveal>
      </section>

      <SiteFooter light />
    </main>
  );
}
