import type { Metadata } from 'next';
import { RequestDashboard } from '../components/RequestDashboard';
import { SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Миний хүсэлтүүд',
  description: 'НАЙМАН САР-д илгээсэн хүсэлтүүдээ харах хувийн орчин.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main id="main-content" className="dashboard-page apple-page">
      <SiteHeader light />
      <RequestDashboard />
    </main>
  );
}
