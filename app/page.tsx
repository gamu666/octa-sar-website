import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from './components/SiteChrome';
import { Reveal } from './components/Reveal';
import './home.css';

function CercleVisual() {
  return (
    <div className="product-scene product-scene--cercle" aria-label="MANAI CERCLE web болон app интерфейсийн загвар">
      <div className="browser-mock browser-mock--cercle">
        <div className="browser-bar"><i /><i /><i /><span>manai cercle</span></div>
        <div className="cercle-web">
          <div className="mock-nav"><b>cercle</b><span>Танилцах&nbsp;&nbsp; Хүрээлэл&nbsp;&nbsp; Үйл явдал</span><i /></div>
          <div className="cercle-web__copy">
            <span>ТАНЫ ХҮРЭЭЛЭЛ. ТАНЫ ХЭМНЭЛ.</span>
            <strong>Зөв хүнээ<br />зөв орчноос.</strong>
            <p>Итгэлтэй танилц. Бодитоор холбогд.</p>
          </div>
          <div className="cercle-web__people"><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="phone-mock phone-mock--cercle">
        <div className="phone-island" />
        <div className="phone-screen cercle-app">
          <div className="app-top"><b>cercle</b><i /></div>
          <span className="app-caption">ӨНӨӨДРИЙН СОНГОЛТ</span>
          <div className="profile-card"><span>86%</span><div><b>Номин, 27</b><small>Улаанбаатар · 3 км</small></div></div>
          <div className="app-actions"><i>×</i><i>♡</i><i>→</i></div>
        </div>
      </div>
    </div>
  );
}

function RiseVisual() {
  return (
    <div className="product-scene product-scene--rise" aria-label="THE RISE web dashboard болон app интерфейсийн загвар">
      <div className="browser-mock browser-mock--rise">
        <div className="browser-bar"><i /><i /><i /><span>THE RISE · Үйл ажиллагааны систем</span></div>
        <div className="rise-dashboard">
          <aside><b>R</b><i /><i /><i /><i /></aside>
          <div className="rise-main">
            <div className="rise-head"><div><small>2026 / ХАВАР</small><strong>Өдрийн мэнд.</strong></div><span>Шинэ бүртгэл +</span></div>
            <div className="rise-stats"><article><small>ИДЭВХТЭЙ СУРАЛЦАГЧ</small><b>1,248</b><em>+12.4%</em></article><article><small>ӨНӨӨДРИЙН ТӨЛБӨР</small><b>₮8.4m</b><em>Төлөвлөгөө 86%</em></article><article><small>АВТОМАТ УРСГАЛ</small><b>94%</b><em>Хэвийн</em></article></div>
            <div className="rise-chart"><div className="chart-title"><b>Бүртгэлийн хөдөлгөөн</b><small>Сүүлийн 7 хоног</small></div><span /><span /><span /><span /><span /><span /><span /></div>
          </div>
        </div>
      </div>
      <div className="phone-mock phone-mock--rise">
        <div className="phone-island" />
        <div className="phone-screen rise-app">
          <div className="app-top"><b>THE RISE</b><i /></div>
          <small>Сайн уу, Ану</small>
          <strong>Миний сургалт</strong>
          <div className="course-card"><span>Идэвхтэй</span><b>IELTS ADVANCED</b><small>Дараагийн хичээл · 18:30</small><i>72%</i></div>
          <div className="mini-row"><i>✓</i><span><b>Төлбөр баталгаажсан</b><small>2026.08.28</small></span></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-redesign">
      <SiteHeader light />

      <section className="apple-hero apple-unit" aria-labelledby="hero-title">
        <div className="unit-copy">
          <p className="unit-eyebrow">Бүтээгдэхүүн · Технологи · Бүтээл</p>
          <h1 id="hero-title">OCTA SAR</h1>
          <p className="unit-subhead">Санааг бодит болгоно.</p>
          <p className="unit-description">Монгол хүний бодит хэрэгцээнээс эхэлсэн<br />дижитал бүтээгдэхүүнүүд.</p>
          <div className="unit-actions">
            <Link className="apple-button" href="#flagships">Төслүүдийг үзэх</Link>
            <Link className="apple-button apple-button--outline" href="/about">Бидний тухай</Link>
          </div>
        </div>
        <div className="hero-product" aria-hidden="true">
          <span className="hero-glow" />
          <Mark />
        </div>
      </section>

      <section className="project-unit project-unit--cercle apple-unit" id="flagships" aria-labelledby="cercle-title">
        <Reveal className="unit-copy unit-copy--light">
          <p className="unit-eyebrow"><i /> Хөгжүүлэлтийн шатанд · Төсөл 01</p>
          <h2 id="cercle-title">Манай Cercle</h2>
          <p className="unit-subhead">Зөв хүнээ. Зөв орчноос.</p>
          <div className="unit-actions">
            <Link className="apple-button" href="/ventures/manai-cercle">Дэлгэрэнгүй</Link>
            <Link className="apple-button apple-button--outline apple-button--light" href="/contact?venture=manai-cercle">Хамтрах</Link>
          </div>
        </Reveal>
        <Reveal className="unit-product"><CercleVisual /></Reveal>
      </section>

      <section className="project-unit project-unit--rise apple-unit" aria-labelledby="rise-title">
        <Reveal className="unit-copy">
          <p className="unit-eyebrow"><i /> Хөгжүүлэлтийн шатанд · Төсөл 02</p>
          <h2 id="rise-title">Цааснаас систем рүү</h2>
          <p className="unit-subhead">THE RISE-ийн үйл ажиллагааны цахим шилжилт.</p>
          <div className="unit-actions">
            <Link className="apple-button apple-button--green" href="/contact?venture=the-rise">Төслийн талаар</Link>
            <a className="apple-text-link" href="#rise-impact">Төлөвлөсөн нөлөө <span>›</span></a>
          </div>
        </Reveal>
        <Reveal className="unit-product"><RiseVisual /></Reveal>
        <Reveal className="impact-strip" id="rise-impact">
          <div><strong>10,000–15,000</strong><span>хуудас / жил</span></div>
          <p>Систем бүрэн нэвтэрсний дараа бууруулах боломжтой гэж тооцсон цаасны хэрэглээ.</p>
          <small>Төлөвлөсөн нөлөө · Бодит үр дүн биш</small>
        </Reveal>
      </section>

      <section className="work-section" id="selected-work" aria-labelledby="selected-title">
        <h2 className="work-section__title" id="selected-title">Сонгосон ажлууд</h2>
        <div className="apple-grid">
          <Reveal className="apple-tile apple-tile--hunnu">
            <div className="tile-copy tile-copy--light"><p>Website · 2026</p><h3>Hunnu Tattoo Studio</h3><span>Брэндийн мэдрэмжийг web-д.</span><a href="#contact">Дэлгэрэнгүй ›</a></div>
            <div className="hunnu-preview"><div className="hunnu-nav"><b>HUNNU</b><span>STUDIO&nbsp;&nbsp; ARTISTS&nbsp;&nbsp; CONTACT</span></div><div><small>ULAANBAATAR · MONGOLIA</small><strong>Skin holds<br />the story.</strong><i /></div></div>
          </Reveal>
          <Reveal className="apple-tile apple-tile--octa">
            <div className="tile-copy"><p>Digital identity · 2026</p><h3>OCTA SAR</h3><span>Нэг тэмдэг. Олон боломж.</span><Link href="/about">Бидний тухай ›</Link></div>
            <div className="octa-preview"><Mark /><span>08 / ∞</span></div>
          </Reveal>
          <Reveal className="apple-tile apple-tile--next">
            <div className="tile-copy"><p>Web & Product · 2026</p><h3>Дараагийн бүтээлүүд</h3><span>Шинэ санаанууд хөгжүүлэлтийн шатанд.</span><a href="#contact">Хамтдаа бүтээх ›</a></div>
            <div className="next-preview"><span>+</span></div>
          </Reveal>
          <Reveal className="apple-tile apple-tile--about">
            <div className="tile-copy"><p>OCTA SAR</p><h3>Хүний амьдралд ойр технологи.</h3><span>Сайн бүтээгдэхүүн төвөгтэй харагдах албагүй.</span><Link href="/about">Бидний үзэл ›</Link></div>
            <div className="about-rings" aria-hidden="true"><i /><i /><i /></div>
          </Reveal>
        </div>
      </section>

      <section className="contact-unit apple-unit" id="contact">
        <Reveal className="unit-copy">
          <p className="unit-eyebrow">OCTA SAR-тай хамтрах</p>
          <h2>Сайн санаа байна уу?</h2>
          <p className="unit-subhead">Ярианаас эхэлье.</p>
          <div className="unit-actions"><Link className="apple-button" href="/contact">Яриа эхлүүлэх</Link></div>
        </Reveal>
      </section>
      <SiteFooter light />
    </main>
  );
}
