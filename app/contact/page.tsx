import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Холбоо барих',
  description: 'НАЙМАН САР-ын утас, цахим шуудан болон сошиал сувгууд.',
};

export default function ContactPage() {
  return (
    <main className="apple-page apple-page--home-header" id="main-content">
      <SiteHeader light />
      <section className="ap-hero ap-hero--contact" aria-labelledby="contact-title">
        <div className="ap-hero__copy">
          <p className="ap-eyebrow">НАЙМАН САР-тай холбоо барих</p>
          <h1 id="contact-title">Холбогдох сувгаа<br />сонгоорой.</h1>
          <p>Шууд ярилцах бол утас, имэйл эсвэл сошиал сувгаар холбогдоно уу.</p>
        </div>
      </section>
      <section className="ap-contact-links ap-shell" aria-label="Холбоо барих мэдээлэл">
        <a className="ap-contact-link" href="tel:+97680114941"><span>Утас</span><strong>+976 8011 4941</strong><i>Залгах ↗</i></a>
        <a className="ap-contact-link" href="mailto:gaorm0206@gmail.com"><span>Имэйл</span><strong>gaorm0206@gmail.com</strong><i>Имэйл бичих ↗</i></a>
        <a className="ap-contact-link" href="https://www.instagram.com/naiman__sar/" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@naiman__sar</strong><i>Нээх ↗</i></a>
        <a className="ap-contact-link" href="https://www.facebook.com/profile.php?id=61594140354144" target="_blank" rel="noreferrer"><span>Facebook</span><strong>НАЙМАН САР</strong><i>Нээх ↗</i></a>
      </section>
      <section className="ap-contact-request ap-shell">
        <div><p className="ap-eyebrow">Хамтран ажиллах</p><h2>Төслийн хүсэлт илгээх үү?</h2></div>
        <Link className="ap-button" href="/request">Хамтрах хүсэлт ↗</Link>
      </section>
      <SiteFooter light />
    </main>
  );
}
