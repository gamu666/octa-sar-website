'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'mark mark--compact' : 'mark'} aria-hidden="true">
      <img src={`${assetBase}/brand/octa-sar-mark.png`} alt="" />
    </span>
  );
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const sections = ['projects', 'selected-work', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    const update = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * .42, 360);
      let current = '';
      sections.forEach((section) => { if (section.offsetTop <= marker) current = section.id; });
      setActiveSection(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const returnHome = () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });

  return (
    <>
      <a className="skip-link" href="#main-content">Үндсэн агуулга руу очих</a>
      <header className={`site-header${light ? ' site-header--light' : ''}`}>
        <div
          className="site-header__inner shell"
          style={light ? { backdropFilter: 'blur(15px) saturate(125%) brightness(.78)', WebkitBackdropFilter: 'blur(15px) saturate(125%) brightness(.78)' } : undefined}
        >
          <Link className="brand" href="/" onClick={returnHome} aria-label="НАЙМАН САР нүүр хуудас">
            <Mark compact />
            <span>НАЙМАН САР</span>
          </Link>
          <nav className="desktop-nav" aria-label="Үндсэн цэс">
            <Link className={activeSection === 'projects' ? 'is-active' : ''} href="/#projects">Төслүүд</Link>
            <Link className={activeSection === 'selected-work' ? 'is-active' : ''} href="/#selected-work">Захиалгат ажил</Link>
            <Link className={activeSection === 'contact' ? 'is-active' : ''} href="/#contact">Холбоо барих</Link>
          </nav>
          <div className="site-header__actions" aria-label="Сошиал ба хэрэглэгчийн хэсэг">
            <a className="header-icon" href="https://www.facebook.com/profile.php?id=61594140354144" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.25" /><path d="M13.6 7.2h2V4.3c-.35-.05-1.55-.15-2.98-.15-2.95 0-4.97 1.8-4.97 5.12v2.86H4.3v3.25h3.35v8.18h4.1v-8.18h3.2l.51-3.25h-3.71V9.6c0-.94.25-1.58 1.85-1.58Z" fill="currentColor" transform="scale(.72) translate(4.7 3.6)" /></svg>
            </a>
            <a className="header-icon" href="https://www.instagram.com/naiman__sar/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.1" /><circle cx="12" cy="12" r="4.05" /><circle cx="17.55" cy="6.65" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <Link className="header-icon header-icon--account" href="/dashboard" aria-label="Хэрэглэгчийн нэвтрэх хэсэг">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.25" /><circle cx="12" cy="9" r="3.1" /><path d="M6.45 18.15c1.23-2.55 3.08-3.82 5.55-3.82s4.32 1.27 5.55 3.82" /></svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ light = false }: { light?: boolean }) {
  return (
    <footer className={`site-footer shell${light ? ' site-footer--light' : ''}`}>
      <div className="site-footer__brand">
        <Link className="brand" href="/" aria-label="НАЙМАН САР нүүр хуудас"><Mark compact /><span>НАЙМАН САР</span></Link>
      </div>
      <p className="site-footer__tagline">Санааг бодит болгоно.</p>
      <div className="site-footer__meta">
        <span>Улаанбаатар, Монгол Улс</span>
        <div className="site-footer__socials" role="navigation" aria-label="Сошиал сувгууд">
          <a href="https://www.instagram.com/naiman__sar/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://www.facebook.com/profile.php?id=61594140354144" target="_blank" rel="noreferrer">Facebook ↗</a>
        </div>
        <span>© 2026 НАЙМАН САР</span>
      </div>
    </footer>
  );
}
