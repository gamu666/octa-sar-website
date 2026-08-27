import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from './components/SiteChrome';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow"><span /> Бие даасан бүтээн байгуулагч компани · Улаанбаатар</p>
          <h1>Утга учиртай<br />санааг <em>үнэ цэнтэй</em><br />бүтээл болгоно.</h1>
          <p className="hero__lede">
            OCTA SAR нь технологи, соёл, кино, уран бүтээл болон хүний харилцааны
            огтлолцолд шинэ төсөл санаачлан хөгжүүлдэг бие даасан компани.
          </p>
          <div className="hero__actions">
            <Link className="button button--light" href="#ventures">
              Төслүүдтэй танилцах <span>↗</span>
            </Link>
            <Link className="text-link" href="#contact">Хөрөнгө оруулалтын танилцуулга авах <span>→</span></Link>
          </div>
        </div>
        <div className="hero__symbol">
          <p>Нэгэн тойрог.<br />Олон боломж.</p>
          <Mark />
          <span className="orbit-note">08 / ∞</span>
        </div>
      </section>

      <section className="manifesto shell" id="philosophy">
        <p className="section-label">Бидний итгэл үнэмшил</p>
        <p className="manifesto__statement">
          Монголоос төрөх дараагийн нөлөө бүхий компаниуд бэлэн загварыг хуулбарлахгүй.
          Тэд <span>Монгол ахуйн бодит хэрэгцээг</span> <span>дэлхийн түвшний тэмүүлэлтэй</span> нэгтгэнэ.
        </p>
      </section>

      <section className="ventures shell" id="ventures">
        <div className="section-heading">
          <div>
            <p className="section-label">01 · Одоо хөгжүүлж буй төсөл</p>
            <h2>Байх учиртайг<br />бүтээнэ.</h2>
          </div>
          <p>Хүний бодит хэрэгцээг итгэлцэл, мэдрэмж, технологиор шийдэх төвлөрсөн төслүүдийг бид бүтээн хөгжүүлдэг.</p>
        </div>

        <Link className="venture-card" href="/ventures/manai-cercle">
          <div className="venture-card__top">
            <span className="status"><i /> Хөгжүүлэлтийн шатанд</span>
            <span>Төсөл 01</span>
          </div>
          <div className="venture-card__body">
            <div>
              <p className="venture-kicker">Баталгаажуулалттай нийгмийн харилцааны экосистем</p>
              <h3>MANAI<br />CERCLE</h3>
            </div>
            <div className="venture-card__aside">
              <p>Монголчууд зорилго нийлэх хүнтэйгээ аюулгүй танилцаж, хүрээллээ тэлэх шинэ орон зай.</p>
              <span className="round-arrow">↗</span>
            </div>
          </div>
          <div className="venture-card__footer">
            <span>Технологи</span><span>Хамтын нийгэмлэг</span><span>Итгэлцэл ба аюулгүй байдал</span>
          </div>
        </Link>
      </section>

      <section className="home-contact shell" id="contact">
        <p className="section-label">Хөрөнгө оруулагчид</p>
        <h2>Бидний бүтээж буй<br />ирээдүйд нэгдмээр байна уу?</h2>
        <Link className="button button--light" href="/contact">Яриа эхлүүлэх <span>↗</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
