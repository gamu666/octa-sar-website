import type { Metadata } from 'next';
import { PartnerForm } from '../components/PartnerForm';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Хамтын ажиллагаа',
  description: 'OCTA SAR-тай бүтээлч болон стратегийн хамтын ажиллагааны яриа эхлүүлнэ үү.',
};

export default function ContactPage() {
  return (
    <main className="light-page" id="main-content">
      <SiteHeader light />
      <section className="contact-hero shell">
        <span className="contact-hero__number" aria-hidden="true">IR</span>
        <div>
          <p className="eyebrow"><span /> Хамтын ажиллагаа</p>
          <h1>Нэг зорилгын<br /><em>тойрогт</em> нэгдье.</h1>
        </div>
        <p>Урт хугацааны үнэ цэнэ бүтээхэд итгэдэг бүтээгч, байгууллага, мэргэшсэн баг, стратегийн түнштэй бодит яриа өрнүүлэхэд бид нээлттэй.</p>
      </section>
      <section className="contact-body shell">
        <div className="contact-note">
          <div className="contact-note__label"><p className="section-label">Холбогдохын өмнө</p><span>Хувийн prototype</span></div>
          <h2>Хамтын зорилгоо хуваалцаарай.</h2>
          <p>Сонирхож буй төсөл эсвэл хамтын ажиллагааны чиглэлээ сонгоно уу. Анхан шатны танилцалтын дараа тохирох нээлттэй болон нууц материалыг хуваалцана.</p>
          <dl>
            <div><dt>Хариу өгөх хугацаа</dt><dd>Ажлын 2 өдрийн дотор</dd></div>
            <div><dt>Байршил</dt><dd>Улаанбаатар, Монгол Улс</dd></div>
            <div><dt>Нууцлал</dt><dd>Эмзэг мэдээллийг зөвхөн хаалттай сувгаар</dd></div>
          </dl>
        </div>
        <PartnerForm />
      </section>
      <SiteFooter light />
    </main>
  );
}
