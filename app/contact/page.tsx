import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PartnerForm } from '../components/PartnerForm';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Холбоо барих',
  description: 'OCTA SAR-тай бүтээгдэхүүн, дизайн, технологийн шийдлийн талаар холбоо барина уу.',
};

export default function ContactPage() {
  return (
    <main className="apple-page" id="main-content">
      <SiteHeader light />

      <section className="ap-hero ap-hero--contact" aria-labelledby="contact-title">
        <div className="ap-hero__copy">
          <p className="ap-eyebrow">OCTA SAR-тай холбоо барих</p>
          <h1 id="contact-title">Сайн санаа байна уу?</h1>
          <p>Ярианаас эхэлье.</p>
        </div>
      </section>

      <section className="ap-contact ap-shell">
        <aside className="ap-contact__note">
          <p className="ap-eyebrow">Товч мэдээлэл</p>
          <h2>Юу бүтээхээ<br />хуваалцаарай.</h2>
          <p>Сонирхож буй төсөл эсвэл хамтын ажиллагааны чиглэлээ сонгоод товч зурвас үлдээнэ үү.</p>
          <dl>
            <div><dt>Хариу</dt><dd>Ажлын 2 өдөрт</dd></div>
            <div><dt>Байршил</dt><dd>Улаанбаатар</dd></div>
            <div><dt>Нууцлал</dt><dd>Хаалттай сувгаар</dd></div>
          </dl>
        </aside>
        <Suspense fallback={<div className="contact-form" aria-hidden="true" />}>
          <PartnerForm />
        </Suspense>
      </section>

      <SiteFooter light />
    </main>
  );
}
