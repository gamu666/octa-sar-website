import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import { ventures } from '../lib/ventures';

export const metadata: Metadata = {
  title: 'Төслүүд',
  description: 'OCTA SAR-ийн бүтээн хөгжүүлж буй компани, бүтээлч төслүүдтэй танилцана уу.',
};

export default function VenturesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero inner-hero--compact shell">
        <p className="eyebrow"><span /> OCTA SAR-ийн төслүүд</p>
        <h1>Зорилгоос төрсөн<br /><em>бүтээл.</em></h1>
        <div className="inner-hero__foot">
          <p>Хүний утга учиртай хэрэгцээ, соёлын нарийн мэдрэмж, технологийн боломжийг нэгтгэсэн цөөн бөгөөд төвлөрсөн төсөл.</p>
          <span>{ventures.length.toString().padStart(2, '0')} идэвхтэй төсөл</span>
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
        <div className="venture-row venture-row--future" aria-label="Цаашдын төслүүдийн хэсэг">
          <div className="venture-row__meta"><span>02—08</span><span>Дараагийн тойргууд</span></div>
          <div><p>OCTA SAR-ийн хэмжээнд</p><h2>Дараагийнх</h2></div>
          <div className="venture-row__end"><p>Контент, кино, урлаг, технологийн дараагийн төслүүд энэ багцад нэмэгдэнэ.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
