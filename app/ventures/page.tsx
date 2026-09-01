import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '../components/Reveal';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import { ventures } from '../lib/ventures';

export const metadata: Metadata = {
  title: 'Төслүүд',
  description: 'OCTA SAR-ийн тэргүүлэх Manai Cercle болон THE RISE төслүүд.',
};

function ProjectPreview({ slug }: { slug: string }) {
  const isCercle = slug === 'manai-cercle';
  return (
    <div className={`ap-project-preview ap-project-preview--${slug}`} aria-hidden="true">
      <div className="ap-browser">
        <div className="ap-browser__bar"><i /><i /><i /><span>{isCercle ? 'manai cercle' : 'THE RISE · dashboard'}</span></div>
        <div className="ap-browser__screen">
          <small>{isCercle ? 'ТАНЫ ХҮРЭЭЛЭЛ' : 'ҮЙЛ АЖИЛЛАГААНЫ СИСТЕМ'}</small>
          <strong>{isCercle ? <>Зөв хүнээ.<br />Зөв хүрээллээс</> : <>Нэг урсгал.<br />Нэг систем.</>}</strong>
          <div className="ap-ui-blocks"><i /><i /><i /></div>
        </div>
      </div>
      <div className="ap-phone"><span /><b>{isCercle ? 'cercle' : 'THE RISE'}</b><div /><div /></div>
    </div>
  );
}

export default function VenturesPage() {
  return (
    <main className="apple-page" id="main-content">
      <SiteHeader light />

      <section className="ap-hero ap-hero--compact" aria-labelledby="ventures-title">
        <div className="ap-hero__copy">
          <p className="ap-eyebrow">OCTA SAR-ийн төслүүд</p>
          <h1 id="ventures-title">Тэргүүлэх<br />төслүүд.</h1>
          <p>Хэрэглэгчийн туршлагаас үйл ажиллагааны дэд бүтэц хүртэл.</p>
        </div>
      </section>

      <div className="ap-project-list">
        {ventures.map((venture) => (
          <section className={`ap-project-unit ap-project-unit--${venture.slug}`} key={venture.slug} aria-labelledby={`${venture.slug}-title`}>
            <Reveal className="ap-project-unit__copy">
              <p className="ap-status"><i /> {venture.status} · Төсөл {venture.index}</p>
              <h2 id={`${venture.slug}-title`}>{venture.slug === 'the-rise' ? 'Цааснаас систем рүү' : 'Manai Cercle'}</h2>
              <p>{venture.slug === 'the-rise' ? 'THE RISE-ийн үйл ажиллагааны цахим шилжилт.' : 'Зөв хүнээ. Зөв хүрээллээс'}</p>
              <Link className="ap-button" href={`/ventures/${venture.slug}`}>Дэлгэрэнгүй</Link>
            </Reveal>
            <Reveal className="ap-project-unit__visual"><ProjectPreview slug={venture.slug} /></Reveal>
          </section>
        ))}
      </div>

      <section className="ap-small-cta ap-shell">
        <p>Шинэ бүтээгдэхүүн эсвэл системийн санаа байна уу?</p>
        <Link href="/contact">Холбоо барих <span>›</span></Link>
      </section>
      <SiteFooter light />
    </main>
  );
}
