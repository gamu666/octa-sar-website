import type { Metadata } from 'next';
import { AdminPortal } from '../components/AdminPortal';
import { SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Төслийн явц',
  description: 'НАЙМАН САР-ийн бүртгэлтэй хэрэглэгчийн төслийн явц.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main-content" className="admin-page apple-page">
      <SiteHeader light />
      <AdminPortal />
    </main>
  );
}
