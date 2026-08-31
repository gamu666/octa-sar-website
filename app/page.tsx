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

      <section className="home-hero shell">
        <p className="home-kicker">Бие даасан бүтээгдэхүүн ба технологийн компани</p>
        <h1>Санааг<br /><span>бодит болгоно.</span></h1>
        <p className="home-hero__lede">Монгол хүний бодит хэрэгцээнээс эхэлж, дэлхийн түвшинд хүрэх дижитал бүтээгдэхүүн бүтээнэ.</p>
        <Link className="home-hero__link" href="#flagships">Бидний бүтээж буй зүйлс <span>↓</span></Link>
        <div className="home-hero__mark" aria-hidden="true"><Mark /></div>
        <p className="home-hero__note">Улаанбаатар · 2026</p>
      </section>

      <section className="flagship-intro shell" id="flagships">
        <Reveal className="flagship-intro__top"><p className="home-label">Тэргүүлэх төслүүд</p><span>01—02</span></Reveal>
        <Reveal><h2>Одоо бүтээж буй<br /><span>хоёр шинэ систем.</span></h2></Reveal>
      </section>

      <section className="showcase showcase--cercle" aria-labelledby="cercle-title">
        <div className="showcase__inner shell">
          <Reveal className="showcase__head">
            <span className="project-index">01</span>
            <div><p className="project-status"><i /> Хөгжүүлэлтийн шатанд</p><h2 id="cercle-title">Манай<br />Cercle</h2></div>
            <p className="project-summary">Итгэлцэлд суурилсан шинэ үеийн нийгмийн харилцааны орон зай.</p>
          </Reveal>
          <Reveal className="showcase__visual"><CercleVisual /></Reveal>
          <Reveal className="showcase__foot"><span>Community</span><span>Matching</span><span>Events</span><span>Web + App</span><Link href="/ventures/manai-cercle">Төслийг нээх <b>↗</b></Link></Reveal>
        </div>
      </section>

      <section className="showcase showcase--rise" aria-labelledby="rise-title">
        <div className="showcase__inner shell">
          <Reveal className="showcase__head">
            <span className="project-index">02</span>
            <div><p className="project-status"><i /> Хөгжүүлэлтийн шатанд</p><h2 id="rise-title">Цааснаас<br />систем рүү.</h2></div>
            <p className="project-summary">THE RISE-ийн бүртгэл, төлбөр, хяналтыг нэг урсгалд оруулах цахим шилжилт.</p>
          </Reveal>
          <Reveal className="showcase__visual"><RiseVisual /></Reveal>
          <Reveal className="rise-impact"><div><strong>10,000–15,000</strong><span>хуудас / жил</span></div><p>Систем бүрэн нэвтэрсний дараа бууруулах боломжтой гэж тооцсон цаасны хэрэглээ.</p><small>Төлөвлөсөн нөлөө · Бодит үр дүн биш</small></Reveal>
          <Reveal className="showcase__foot"><span>Бүртгэл</span><span>Төлбөр</span><span>Automation</span><span>Web + App</span><Link href="/contact?venture=the-rise">Төслийн талаар <b>↗</b></Link></Reveal>
        </div>
      </section>

      <section className="selected shell" id="selected-work" aria-labelledby="selected-title">
        <Reveal className="selected__heading"><p className="home-label">Сонгосон ажлууд</p><h2 id="selected-title">Төвлөрсөн санаа.<br /><span>Цэвэр гүйцэтгэл.</span></h2><p>Website, digital identity болон туршилтын бүтээгдэхүүнүүд.</p></Reveal>
        <div className="work-grid">
          <Reveal className="work-tile work-tile--hunnu">
            <div className="work-tile__meta"><span>Website</span><span>2026</span></div>
            <div className="hunnu-preview"><div className="hunnu-nav"><b>HUNNU</b><span>STUDIO&nbsp;&nbsp; ARTISTS&nbsp;&nbsp; CONTACT</span></div><div><small>ULAANBAATAR · MONGOLIA</small><strong>Skin holds<br />the story.</strong><i /></div></div>
            <div className="work-tile__title"><h3>Hunnu Tattoo Studio</h3><span>↗</span></div>
          </Reveal>
          <Reveal className="work-tile work-tile--octa">
            <div className="work-tile__meta"><span>Digital identity</span><span>2026</span></div>
            <div className="octa-preview"><Mark /><span>08 / ∞</span></div>
            <div className="work-tile__title"><h3>OCTA SAR</h3><span>↗</span></div>
          </Reveal>
          <Reveal className="work-tile work-tile--next">
            <div className="work-tile__meta"><span>Web & Product</span><span>Удахгүй</span></div>
            <div className="next-preview"><span>+</span><p>Дараагийн<br />бүтээлүүд</p></div>
            <div className="work-tile__title"><h3>2026 Collection</h3><span>→</span></div>
          </Reveal>
        </div>
      </section>

      <section className="home-about shell">
        <Reveal><p className="home-label">OCTA SAR-ийн тухай</p><h2>Технологийг хүний<br /><span>амьдралд ойртуулна.</span></h2></Reveal>
        <Reveal className="home-about__aside"><p>Сайн бүтээгдэхүүн төвөгтэй харагдах албагүй. Бид хэрэгцээг ойлгож, санааг цэгцэлж, хэрэглэгчид танил мэт санагдах шинэ туршлага бүтээнэ.</p><Link href="/about">Бидний үзэл <span>↗</span></Link></Reveal>
      </section>

      <section className="home-contact-new shell" id="contact"><Reveal><p className="home-label">Хамтдаа бүтээе</p><h2>Сайн санаа байна уу?</h2><Link href="/contact">Яриа эхлүүлэх <span>↗</span></Link></Reveal></section>
      <SiteFooter light />
    </main>
  );
}
