import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PartnerForm } from '../components/PartnerForm';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Хамтрах хүсэлт',
  description: 'НАЙМАН САР-тай хамтран ажиллах хүсэлтээ илгээнэ үү.',
};

export default function RequestPage() {
  return (
    <main className="apple-page apple-page--home-header" id="main-content">
      <SiteHeader light />
      <section className="ap-hero ap-hero--contact" aria-labelledby="request-title">
        <div className="ap-hero__copy">
          <p className="ap-eyebrow">НАЙМАН САР-тай хамтрах</p>
          <h1 id="request-title">Сайн санаа байна уу?</h1>
          <p>Ярилцаад шууд эхэлье.</p>
        </div>
      </section>
      <section className="ap-contact ap-shell">
        <aside className="ap-contact__note">
          <p className="ap-eyebrow">Товч мэдээлэл</p>
          <h2>Юу бүтээхээ<br />хуваалцаарай.</h2>
          <p>Төслийнхөө зорилго, хэрэгцээг товч хуваалцаарай.</p>
          <dl>
            <div><dt>Хариу</dt><dd>1–2 цагийн дотор</dd></div>
            <div><dt>Байршил</dt><dd>Улаанбаатар</dd></div>
            <div><dt>Нууцлал</dt><dd>Хаалттай сувгаар</dd></div>
          </dl>
        </aside>
        <Suspense fallback={<div className="contact-form" aria-hidden="true" />}><PartnerForm /></Suspense>
      </section>
      <SiteFooter light />
    </main>
  );
}
