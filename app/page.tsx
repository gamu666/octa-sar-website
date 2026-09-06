import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from './components/SiteChrome';
import { Reveal } from './components/Reveal';
import { ventures } from './lib/ventures';
import './home.css';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const principles = [
  ['01', 'Хэрэгцээнээс эхэлнэ', 'Бодит амьдралд байгаа асуудлыг олж, хамгийн энгийн зөв шийдлийг хайна.'],
  ['02', 'Итгэлцлийг бүтээнэ', 'Аюулгүй байдал, ойлгомжтой хэрэглээг бүтээгдэхүүний суурь болгоно.'],
  ['03', 'Системээр сэтгэнэ', 'Нэг удаагийн нээлт биш, удаан амьдрах бүтээгдэхүүн ба үйл ажиллагааг хамтад нь төлөвлөнө.'],
  ['04', 'Нягт гүйцэтгэнэ', 'Шийдэл бүрийг ойлгомжтой хэрэглээ, тогтвортой ажиллагаа, нарийн детальтайгаар бодит болгоно.'],
];

const evolutionLabels: Record<string, string> = {
  '01': 'Судалгаа · Ноорог',
  '02': 'Хэлбэр · Бүтэц',
  '03': 'Нарийвчлал · Систем',
  '04': 'Бэлэн дүр · Илэрхийлэл',
};

function PrincipleVisual({ step }: { step: string }) {
  return (
    <div className={`ap-logo-evolution ap-logo-evolution--${step}`} aria-hidden="true">
      <span className="ap-logo-evolution__grid" />
      <span className="ap-logo-evolution__orbit ap-logo-evolution__orbit--outer" />
      <span className="ap-logo-evolution__orbit ap-logo-evolution__orbit--inner" />
      <span className="ap-logo-evolution__axis ap-logo-evolution__axis--x" />
      <span className="ap-logo-evolution__axis ap-logo-evolution__axis--y" />
      <Mark />
      <svg className="ap-logo-evolution__sketch" viewBox="0 0 320 180" fill="none">
        <g className="ap-logo-evolution__rough-outline">
          <path d="M75 126C52 92 63 52 96 31C128 10 187 8 225 27C264 47 276 85 259 119C242 151 205 165 158 164C119 164 92 151 75 126Z" />
          <path d="M72 122C49 88 66 47 100 27C137 7 190 9 229 31C266 52 273 90 255 123C237 153 199 168 154 163C116 160 87 146 72 122Z" />
        </g>
        <g className="ap-logo-evolution__rough-bars">
          <path d="M73 111C68 92 70 71 82 55M83 55C76 75 77 104 82 124" />
          <path d="M99 139C92 110 93 65 101 41M110 32C103 68 104 116 109 146" />
          <path d="M126 154C121 111 122 59 128 26M139 20C134 63 135 119 138 158" />
          <path d="M155 161C151 116 152 61 156 20M170 19C167 63 168 116 169 160" />
          <path d="M187 156C184 116 184 64 184 25M200 29C199 66 199 113 197 151" />
          <path d="M216 143C218 108 217 69 211 38M227 46C232 77 231 111 226 133" />
          <path d="M246 119C252 98 250 77 240 59M255 72C261 88 259 105 253 117" />
        </g>
        <g className="ap-logo-evolution__rough-moon">
          <path d="M124 28C124 44 135 54 149 53C163 52 173 40 172 26C166 35 158 40 149 40C139 40 131 35 124 28Z" />
          <path d="M127 26C127 41 136 50 150 50C160 49 169 41 171 30" />
        </g>
        <path className="ap-logo-evolution__guide" d="M53 90C98 84 147 81 267 88M160 13C156 58 157 112 162 168" />
      </svg>
      <span className="ap-logo-evolution__measure ap-logo-evolution__measure--top">08 / ∞</span>
      <span className="ap-logo-evolution__measure ap-logo-evolution__measure--side">FORM 04</span>
      <span className="ap-logo-evolution__flare" />
    </div>
  );
}

function InlineProjectPreview({ slug }: { slug: string }) {
  const isCercle = slug === 'manai-cercle';

  return (
    <div className={`ap-detail-visual ap-detail-visual--${slug}`} aria-hidden="true">
      <div className="ap-detail-browser">
        <div className="ap-detail-browser__bar"><i /><i /><i /><span>{isCercle ? 'manai cercle' : 'THE RISE · system'}</span></div>
        <div className="ap-detail-browser__body">
          <small>{isCercle ? 'ТАНЫ ХҮРЭЭЛЭЛ' : 'ҮЙЛ АЖИЛЛАГААНЫ НЭГДСЭН ОРЧИН'}</small>
          <strong>{isCercle ? <>Зөв хүнээ.<br />Зөв хүрээллээс</> : <>Цааснаас<br />систем рүү.</>}</strong>
          <div className="ap-detail-widgets"><i /><i /><i /></div>
        </div>
      </div>
      <div className="ap-detail-phone"><span /><b>{isCercle ? 'cercle' : 'THE RISE'}</b><small>{isCercle ? '86% нийцэл' : 'Миний хуваарь'}</small><i /><i /></div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-redesign apple-page">
      <SiteHeader light />

      <section className="apple-hero apple-unit" aria-labelledby="hero-title">
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-atmosphere__blue" />
          <span className="hero-atmosphere__violet" />
          <span className="hero-atmosphere__grid" />
        </div>
        <div className="unit-copy">
          <p className="unit-eyebrow">НАЙМАН САР · УЛААНБААТАР</p>
          <h1 id="hero-title">Санааг бодит болгоно.</h1>
          <p className="unit-description">Дижитал бүтээгдэхүүн, веб систем, брэндийн шийдэл.</p>
          <div className="unit-actions">
            <Link className="apple-button" href="#projects">Тэргүүлэх төслүүд</Link>
            <Link className="apple-button apple-button--outline" href="#selected-work">Захиалгат ажлууд</Link>
          </div>
        </div>
        <div className="hero-product" aria-hidden="true">
          <span className="hero-glow" />
          <span className="hero-orbit hero-orbit--outer" />
          <span className="hero-orbit hero-orbit--inner" />
          <div className="hero-mark-shell"><Mark /></div>
          <span className="hero-floor" />
        </div>
      </section>

      <section className="ap-statement ap-shell" id="about" aria-labelledby="about-title">
        <Reveal>
          <p className="ap-eyebrow">Бидний тухай</p>
          <h2 id="about-title">Санаанаас бодит бүтээгдэхүүн хүртэл.</h2>
          <p>НАЙМАН САР нь санааг хэрэглэгчдэд хүрэх бодит бүтээгдэхүүн болгон хөгжүүлэх бүхий л үе шатанд стратеги, дизайн, технологийн шийдлийг нэгдсэн байдлаар хэрэгжүүлдэг.</p>
        </Reveal>
      </section>

      <section className="ap-inline-projects" id="projects" aria-labelledby="projects-title">
        <div className="ap-section-heading ap-shell">
          <p className="ap-eyebrow">Хөгжүүлэлтийн шатанд</p>
          <h2 id="projects-title">Тэргүүлэх төслүүд.</h2>
        </div>
        <div className="ap-project-list">
          {ventures.map((venture) => {
            const isRise = venture.slug === 'the-rise';

            return (
              <article className={`ap-project-unit ap-project-unit--${venture.slug}`} key={venture.slug}>
                <Reveal className="ap-project-unit__copy">
                  <p className="ap-status"><i /> {venture.status} · Төсөл {venture.index}</p>
                  <h2>{isRise ? 'Цааснаас систем рүү' : 'Manai Cercle'}</h2>
                  <p>{isRise ? 'THE RISE-ийн үйл ажиллагааны цахим шилжилт.' : 'Зөв хүнээ. Зөв хүрээллээс'}</p>
                  <Link className="ap-button" href={`/contact?venture=${venture.slug}`}>Дэлгэрэнгүй</Link>
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
          <h2 id="selected-work-title">Захиалгат ажлууд.</h2>
        </div>
        <div className="ap-work-grid">
          <Reveal className="ap-work-tile ap-work-tile--featured ap-work-tile--hunnu">
            <div className="ap-work-copy ap-work-copy--light">
              <p>Online booking experience · 2026</p>
              <h3>Hunnu Tattoo Studio</h3>
              <span>Үйлчилгээ, артист, өдөр цаг, санааны зураг, хүсэлт баталгаажуулалтыг нэг веб урсгалд.</span>
              <a className="ap-work-link" href="https://hunnutattoo.com" target="_blank" rel="noreferrer">Live сайтыг үзэх ›</a>
            </div>
            <div className="ap-hunnu-showcase">
              <div className="ap-web-stage" aria-hidden="true">
                <div className="ap-web-browserbar">
                  <span className="ap-web-lights"><i /><i /><i /></span>
                  <span className="ap-web-address">hunnutattoo.com · home</span>
                </div>
                <img className="ap-web-site-shot" src={`${assetBase}/work/hunnu-hero-2026.png`} alt="" />
              </div>
              <div className="ap-hunnu-showcase__grid" aria-hidden="true">
                <figure className="ap-hunnu-panel">
                  <figcaption>Артист · Чиглэл · Танилцуулга</figcaption>
                  <img src={`${assetBase}/work/hunnu-artists-2026.png`} alt="" />
                </figure>
                <figure className="ap-hunnu-panel">
                  <figcaption>Үйлчилгээ · Өдөр · Цаг · Хүсэлт</figcaption>
                  <img src={`${assetBase}/work/hunnu-booking-2026.png`} alt="" />
                </figure>
              </div>
              <ul className="ap-hunnu-features" aria-label="Hunnu Tattoo Studio вебийн үндсэн боломжууд">
                <li>Үйлчилгээ сонгох</li>
                <li>Артист сонгох</li>
                <li>Өдөр · цаг</li>
                <li>Зураг хавсаргах</li>
                <li>Хүсэлт баталгаажуулах</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--featured ap-work-tile--dudu">
            <div className="ap-work-copy ap-work-copy--light">
              <p>Real estate platform · 2026</p>
              <h3>Dudu Prime</h3>
              <span>Хайлт, газрын зураг, хадгалалт, харьцуулалт, дэлгэрэнгүй мэдээллийг агентын нэг веб орчинд.</span>
              <a className="ap-work-link" href="https://gamu666.github.io/dudu-prime/" target="_blank" rel="noreferrer">Live сайтыг үзэх ›</a>
            </div>
            <div className="ap-dudu-showcase">
              <div className="ap-web-stage ap-web-stage--dudu" aria-hidden="true">
                <div className="ap-web-browserbar">
                  <span className="ap-web-lights"><i /><i /><i /></span>
                  <span className="ap-web-address">dudu-prime · home</span>
                </div>
                <img className="ap-web-site-shot" src={`${assetBase}/work/dudu-prime-hero-2026.png`} alt="" />
              </div>
              <div className="ap-dudu-showcase__grid" aria-hidden="true">
                <figure className="ap-dudu-panel">
                  <figcaption>Хайлт · Ангилал · Харьцуулалт</figcaption>
                  <img src={`${assetBase}/work/dudu-prime-listings-2026.png`} alt="" />
                </figure>
                <figure className="ap-dudu-panel">
                  <figcaption>Зарын дэлгэрэнгүй · Галерей · Агент</figcaption>
                  <img src={`${assetBase}/work/dudu-prime-detail-2026.png`} alt="" />
                </figure>
              </div>
              <ul className="ap-dudu-features" aria-label="Dudu Prime үндсэн боломжууд">
                <li>Ухаалаг хайлт</li>
                <li>Газрын зураг</li>
                <li>Хадгалсан зар</li>
                <li>Харьцуулалт</li>
                <li>Quick view</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="ap-work-tile ap-work-tile--identity">
            <div className="ap-work-copy">
              <p>Digital identity · 2026</p>
              <h3>НАЙМАН САР</h3>
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
            <Reveal className={`ap-card ap-card--principle ap-card--principle-${index}`} key={index}>
              <div className="ap-card__meta"><span>{index}</span><span>{evolutionLabels[index]}</span></div>
              <PrincipleVisual step={index} />
              <div className="ap-card__copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ap-callout" id="contact">
        <Reveal className="ap-callout__copy">
          <p className="ap-eyebrow">НАЙМАН САР-тай холбоо барих</p>
          <h2>Сайн санаа байна уу?</h2>
          <p>Ярианаас эхэлье.</p>
          <Link className="ap-button" href="/contact">Холбоо барих</Link>
        </Reveal>
      </section>

      <SiteFooter light />
    </main>
  );
}
