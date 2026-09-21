import type { Metadata } from 'next';
import { RequestDashboard } from '../components/RequestDashboard';
import { SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Ирсэн хүсэлтүүд',
  description: 'НАЙМАН САР-ын админ хүсэлтийн самбар.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main-content" className="admin-page apple-page apple-page--home-header">
      <SiteHeader light />
      <RequestDashboard admin />
    </main>
  );
}
