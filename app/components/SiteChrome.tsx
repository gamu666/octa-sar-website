import Link from 'next/link';

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-hidden="true">
      <span className="mark__crop">
        <img src="/brand/octa-sar-source.png" alt="" />
      </span>
    </span>
  );
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Үндсэн агуулга руу очих</a>
      <header className={`site-header${light ? ' site-header--light' : ''}`}>
        <div className="site-header__inner shell">
          <Link className="brand" href="/" aria-label="OCTA SAR нүүр хуудас">
            <Mark compact />
            <span>OCTA SAR</span>
          </Link>
          <nav className="desktop-nav" aria-label="Үндсэн цэс">
            <Link href="/about">Бидний үзэл</Link>
            <Link href="/ventures">Төслүүд</Link>
            <Link className="nav-cta" href="/contact">Хөрөнгө оруулагчид</Link>
          </nav>
          <details className="mobile-menu">
            <summary aria-label="Цэс нээх"><span>Цэс</span><i /><i /></summary>
            <nav aria-label="Гар утасны цэс">
              <Link href="/about"><span>01</span> Бидний үзэл</Link>
              <Link href="/ventures"><span>02</span> Төслүүд</Link>
              <Link href="/contact"><span>03</span> Хөрөнгө оруулагчид</Link>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ light = false }: { light?: boolean }) {
  return (
    <footer className={`site-footer shell${light ? ' site-footer--light' : ''}`}>
      <div className="site-footer__brand">
        <Link className="brand" href="/"><Mark compact /><span>OCTA SAR</span></Link>
        <p>Утга учиртай санааг<br />үнэ цэнтэй бүтээл болгоно.</p>
      </div>
      <nav aria-label="Хөлийн цэс">
        <Link href="/about"><span>01</span> Бидний үзэл</Link>
        <Link href="/ventures"><span>02</span> Төслүүд</Link>
        <Link href="/contact"><span>03</span> Хөрөнгө оруулагчид</Link>
      </nav>
      <div className="site-footer__meta">
        <span>Улаанбаатар, Монгол Улс</span>
        <span>Хувийн танилцуулгын орчин</span>
        <span>© 2026 OCTA SAR</span>
      </div>
    </footer>
  );
}
