import type { Metadata } from 'next';
import { InvestorForm } from '../components/InvestorForm';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Хөрөнгө оруулагчид',
  description: 'OCTA SAR-тай хөрөнгө оруулалт болон стратегийн түншлэлийн хаалттай яриа эхлүүлнэ үү.',
};

export default function ContactPage() {
  return (
    <main className="light-page">
      <SiteHeader light />
      <section className="contact-hero shell">
        <div>
          <p className="eyebrow"><span /> Хөрөнгө оруулагчтай харилцах</p>
          <h1>Нэг зорилгын<br /><em>тойрогт</em> нэгдье.</h1>
        </div>
        <p>Хариуцлагатай, урт хугацааны компанийн хөгжилд итгэдэг хөрөнгө оруулагч, бүтээн байгуулагч удирдагч, стратегийн түнштэй бодит яриа өрнүүлэхэд бид нээлттэй.</p>
      </section>
      <section className="contact-body shell">
        <div className="contact-note">
          <p className="section-label">Холбогдохын өмнө</p>
          <h2>Хамтын зорилгоо хуваалцаарай.</h2>
          <p>Сонирхож буй төсөл эсвэл хамтын ажиллагааны чиглэлээ сонгоно уу. Анхан шатны танилцалтын дараа тохирох нээлттэй болон нууц материалыг хуваалцана.</p>
          <dl>
            <div><dt>Хариу өгөх хугацаа</dt><dd>Ажлын 2 өдрийн дотор</dd></div>
            <div><dt>Байршил</dt><dd>Улаанбаатар, Монгол Улс</dd></div>
            <div><dt>Нууцлал</dt><dd>Эмзэг мэдээллийг зөвхөн хаалттай сувгаар</dd></div>
          </dl>
        </div>
        <InvestorForm />
      </section>
      <SiteFooter light />
    </main>
  );
}
