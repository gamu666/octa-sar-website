import Link from 'next/link';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-hidden="true">
      <img src={`${assetBase}/brand/octa-sar-mark.png`} alt="" />
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
            <Link href="/#about">OCTA SAR</Link>
            <Link href="/#projects">Төслүүд</Link>
            <Link className="nav-cta" href="/#contact">Холбоо барих</Link>
          </nav>
          <details className="mobile-menu">
            <summary aria-label="Цэс нээх"><span>Цэс</span><i /><i /></summary>
            <nav aria-label="Гар утасны цэс">
              <Link href="/#about"><span>01</span> OCTA SAR</Link>
              <Link href="/#projects"><span>02</span> Төслүүд</Link>
              <Link href="/#contact"><span>03</span> Холбоо барих</Link>
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
        <p>Санааг бодит болгоно.</p>
      </div>
      <nav aria-label="Хөлийн цэс">
        <Link href="/#about"><span>01</span> OCTA SAR</Link>
        <Link href="/#projects"><span>02</span> Төслүүд</Link>
        <Link href="/#contact"><span>03</span> Холбоо барих</Link>
      </nav>
      <div className="site-footer__meta">
        <span>Улаанбаатар, Монгол Улс</span>
        <span>Монголд бүтээв</span>
        <span>© 2026 OCTA SAR</span>
      </div>
    </footer>
  );
}
