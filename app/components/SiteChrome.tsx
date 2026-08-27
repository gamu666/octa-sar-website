import Link from 'next/link';

export function Mark({ compact = false }: { compact?: boolean }) {
  const lines = [34, 48, 64, 78, 88, 78, 64, 48, 34];

  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-hidden="true">
      <span className="mark__lines">
        {lines.map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </span>
    </span>
  );
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header shell${light ? ' site-header--light' : ''}`}>
      <Link className="brand" href="/" aria-label="OCTA SAR home">
        <Mark compact />
        <span>OCTA SAR</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/about">Philosophy</Link>
        <Link href="/ventures">Ventures</Link>
        <Link className="nav-cta" href="/contact">Investor contact</Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ light = false }: { light?: boolean }) {
  return (
    <footer className={`site-footer shell${light ? ' site-footer--light' : ''}`}>
      <Link className="brand" href="/"><Mark compact /><span>OCTA SAR</span></Link>
      <p>Ulaanbaatar, Mongolia<br />© 2026 OCTA SAR</p>
      <Link href="/contact">Investor enquiries ↗</Link>
    </footer>
  );
}
