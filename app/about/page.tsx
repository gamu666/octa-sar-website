import type { Metadata } from 'next';
import Link from 'next/link';
import { Mark, SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Үзэл баримтлал',
  description: 'OCTA SAR яагаад оршдог, Монголоос үнэ цэнтэй шинэ компаниудыг хэрхэн бүтээдэг тухай.',
};

const principles = [
  ['01', 'Хүний бодит хэрэгцээнээс эхэлнэ', 'Бид моодонд орсон салбараас асуудал хайдаггүй. Харин хүмүүсийн амьдрал, харилцаа, бүтээлд бодитоор тулгарч буй зөрчил, дутагдлыг олж хардаг.'],
  ['02', 'Итгэлцлийг суурь болгоно', 'Итгэлцэл бол нэмэлт хамгаалалт бус, бүтээгдэхүүний үндсэн дэд бүтэц. Бид үүнийг хэрэглээний туршлага, бизнесийн загвар, харилцаа бүрд санаатайгаар шингээнэ.'],
  ['03', 'Нээлтээс цаадахыг харна', 'Чанартай анхны бүтээгдэхүүн чухал. Түүнийг урт настай, хариуцлагатай компани болгох сахилга бат түүнээс дутахгүй чухал.'],
  ['04', 'Монголын гүнээс, дэлхийн түвшинд', 'Бид Монголын ахуй, хэрэгцээнээс эхэлж, хаана ч өрсөлдөхүйц тодорхой сэтгэлгээ, нарийн хийц, том зорилгоор бүтээнэ.'],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero shell">
        <p className="eyebrow"><span /> OCTA SAR-ийн тухай</p>
        <h1>Нэгэн төв.<br />Олон <em>тойрог.</em></h1>
        <div className="inner-hero__foot">
          <p>Бид технологи, соёл, кино, уран бүтээлийн салбарт тодорхой зорилготой шинэ төсөл бүтээдэг бие даасан компани.</p>
          <span>Улаанбаатарт үүсгэн байгуулав</span>
        </div>
      </section>

      <section className="about-origin shell">
        <div className="about-origin__mark"><Mark /></div>
        <div>
          <p className="section-label">Бидний орших шалтгаан</p>
          <h2>Үнэ цэнтэй шинэ компани бусдын анзаараагүй хэрэгцээнээс төрдөг.</h2>
          <p>Тийм санааг бодит бизнес болгоход шаардлагатай стратеги, загварчлал, технологи, тууштай анхаарлыг нэг дор төвлөрүүлэхийн төлөө OCTA SAR оршдог.</p>
        </div>
      </section>

      <section className="principles shell">
        <div className="section-heading">
          <div><p className="section-label">Бид хэрхэн бүтээдэг вэ</p><h2>Баримтлах<br />зарчмууд.</h2></div>
        </div>
        <div className="principle-list">
          {principles.map(([index, title, text]) => (
            <article key={index}>
              <span>{index}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta shell">
        <p className="section-label">Бидний ажил</p>
        <h2>Одоо бүтээж буй<br />төслүүдтэй танилцаарай.</h2>
        <Link className="button button--light" href="/ventures">Төслүүдийг үзэх <span>↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
