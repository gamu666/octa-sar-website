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
    <header className={`site-header shell${light ? ' site-header--light' : ''}`}>
      <Link className="brand" href="/" aria-label="OCTA SAR нүүр хуудас">
        <Mark compact />
        <span>OCTA SAR</span>
      </Link>
      <nav aria-label="Үндсэн цэс">
        <Link href="/about">Бидний үзэл</Link>
        <Link href="/ventures">Төслүүд</Link>
        <Link className="nav-cta" href="/contact">Хөрөнгө оруулагчид</Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ light = false }: { light?: boolean }) {
  return (
    <footer className={`site-footer shell${light ? ' site-footer--light' : ''}`}>
      <Link className="brand" href="/"><Mark compact /><span>OCTA SAR</span></Link>
      <p>Улаанбаатар, Монгол Улс<br />© 2026 OCTA SAR</p>
      <Link href="/contact">Хөрөнгө оруулалтын хүсэлт ↗</Link>
    </footer>
  );
}
