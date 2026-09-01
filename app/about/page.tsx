import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '../components/Reveal';
import { Mark, SiteFooter, SiteHeader } from '../components/SiteChrome';
import { ventures } from '../lib/ventures';

export const metadata: Metadata = {
  title: 'OCTA SAR-ийн тухай',
  description: 'OCTA SAR хүний бодит хэрэгцээнээс эхэлсэн дижитал бүтээгдэхүүнүүдийг хэрхэн бүтээдэг тухай.',
};

const principles = [
  ['01', 'Хэрэгцээнээс эхэлнэ', 'Бодит амьдралд байгаа асуудлыг олж, хамгийн энгийн зөв шийдлийг хайна.'],
  ['02', 'Итгэлцлийг бүтээнэ', 'Аюулгүй байдал, ойлгомжтой хэрэглээг бүтээгдэхүүний суурь болгоно.'],
  ['03', 'Системээр сэтгэнэ', 'Нэг удаагийн нээлт биш, удаан амьдрах бүтээгдэхүүн ба үйл ажиллагааг хамтад нь төлөвлөнө.'],
  ['04', 'Монголд ойр байна', 'Эндхийн онцлогоос эхэлж, дэлхийн түвшний чанар, хийцээр гүйцэтгэнэ.'],
];

function InlineProjectPreview({ slug }: { slug: string }) {
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

export default function AboutPage() {
  return (
    <main className="apple-page" id="main-content">
      <SiteHeader light />

      <section className="ap-hero ap-hero--about" aria-labelledby="about-title">
        <div className="ap-hero__copy">
          <p className="ap-eyebrow">OCTA SAR-ийн тухай</p>
          <h1 id="about-title">Хүний амьдралд<br />ойр технологи.</h1>
          <p>Бид асуудлыг ойлгож, хэрэглэхэд энгийн дижитал бүтээгдэхүүн болгодог.</p>
        </div>
        <div className="ap-brand-stage" aria-hidden="true">
          <span className="ap-brand-stage__glow" />
          <Mark />
        </div>
      </section>

      <section className="ap-statement ap-shell">
        <Reveal>
          <p className="ap-eyebrow">Бидний зорилго</p>
          <h2>Сайн санаа зөвхөн гоё харагдах биш, бодитоор ажиллах ёстой.</h2>
          <p>Стратеги, дизайн, технологийг нэг багц болгон хөгжүүлж, санааг ашиглаж болох систем болгоно.</p>
        </Reveal>
      </section>

      <section className="ap-inline-projects" id="projects" aria-labelledby="projects-title">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Одоо хөгжүүлж буй</p>
          <h2 id="projects-title">Хоёр шинэ систем.</h2>
        </div>
        <div className="ap-project-list">
          {ventures.map((venture) => {
            const isRise = venture.slug === 'the-rise';
            return (
              <article className={`ap-project-unit ap-project-unit--${venture.slug}`} key={venture.slug}>
                <Reveal className="ap-project-unit__copy">
                  <p className="ap-status"><i /> {venture.status} · Төсөл {venture.index}</p>
                  <h2>{isRise ? 'Цааснаас систем рүү' : 'Манай Cercle'}</h2>
                  <p>{isRise ? 'THE RISE-ийн үйл ажиллагааны цахим шилжилт.' : 'Зөв хүнээ. Зөв орчноос.'}</p>
                  <Link className="ap-button" href={`/contact?venture=${venture.slug}`}>Хамтрах</Link>
                </Reveal>
                <Reveal className="ap-project-unit__visual"><InlineProjectPreview slug={venture.slug} /></Reveal>
                {venture.plannedImpact && (
                  <p className="ap-inline-impact">
                    <strong>{venture.plannedImpact.value}</strong>
                    <span>{venture.plannedImpact.unit} · төлөвлөсөн бууралт</span>
                    <small>Бодит үр дүн биш</small>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="ap-selected-work" id="selected-work" aria-labelledby="selected-work-title">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Web · Identity · Product</p>
          <h2 id="selected-work-title">Сонгосон ажлууд.</h2>
        </div>
        <div className="ap-work-grid">
          <Reveal className="ap-work-tile ap-work-tile--featured ap-work-tile--hunnu">
            <div className="ap-work-copy ap-work-copy--light">
              <p>Website · 2026</p>
              <h3>Hunnu Tattoo Studio</h3>
              <span>Брэнд, үйлчилгээ, цаг захиалгыг нэг урсгалд.</span>
              <a className="ap-work-link" href="https://hunnutattoo.com" target="_blank" rel="noreferrer">Live сайтыг үзэх ›</a>
            </div>
            <div className="ap-web-stage" aria-hidden="true">
              <div className="ap-web-browserbar">
                <span className="ap-web-lights"><i /><i /><i /></span>
                <span className="ap-web-address">hunnutattoo.com</span>
              </div>
              <img className="ap-web-site-shot" src="/work/hunnu-website-booking.png" alt="" />
            </div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--featured ap-work-tile--dudu">
            <div className="ap-work-copy ap-work-copy--light">
              <p>Website · 2026</p>
              <h3>Dudu Prime</h3>
              <span>Хайлт, ангилал, холбоо барилтыг нэг урсгалд.</span>
              <a className="ap-work-link" href="https://gamu666.github.io/dudu-prime/" target="_blank" rel="noreferrer">Live сайтыг үзэх ›</a>
            </div>
            <div className="ap-web-stage ap-web-stage--dudu" aria-hidden="true">
              <div className="ap-web-browserbar">
                <span className="ap-web-lights"><i /><i /><i /></span>
                <span className="ap-web-address">gamu666.github.io/dudu-prime</span>
              </div>
              <img className="ap-web-site-shot" src="/work/dudu-prime-home.png" alt="" />
            </div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--identity">
            <div className="ap-work-copy">
              <p>Digital identity · 2026</p>
              <h3>OCTA SAR</h3>
              <span>Нэг тэмдэг. Олон боломж.</span>
            </div>
            <div className="ap-identity-stage" aria-hidden="true"><Mark /><small>08 / ∞</small></div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--systems">
            <div className="ap-work-copy">
              <p>Web systems · 2026</p>
              <h3>Жижиг урсгалууд</h3>
              <span>Өдөр тутмын ажлыг ойлгомжтой болгоно.</span>
            </div>
            <div className="ap-system-stage" aria-hidden="true">
              <div className="ap-system-nav"><i /><b>Overview</b><span>•••</span></div>
              <div className="ap-system-cards"><i /><i /><i /></div>
              <div className="ap-system-lines"><i /><i /><i /><i /></div>
            </div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--next">
            <div className="ap-work-copy">
              <p>Next · In development</p>
              <h3>Дараагийн бүтээлүүд</h3>
              <span>Шинэ санаанууд хөгжүүлэлтийн шатанд.</span>
            </div>
            <div className="ap-next-stage" aria-hidden="true"><span>+</span><i /><i /><i /></div>
          </Reveal>
        </div>
      </section>

      <section className="ap-principles" aria-labelledby="principles-title">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Бид хэрхэн бүтээдэг вэ</p>
          <h2 id="principles-title">Дөрвөн зарчим.</h2>
        </div>
        <div className="ap-card-grid ap-shell">
          {principles.map(([index, title, text]) => (
            <Reveal className="ap-card" key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ap-callout">
        <Reveal className="ap-callout__copy">
          <p className="ap-eyebrow">OCTA SAR-тай хамтрах</p>
          <h2>Сайн санаа байна уу?</h2>
          <p>Ярианаас эхэлье.</p>
          <Link className="ap-button" href="/contact">Яриа эхлүүлэх</Link>
        </Reveal>
      </section>

      <SiteFooter light />
    </main>
  );
}
