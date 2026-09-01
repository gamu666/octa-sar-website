import type { Metadata } from 'next';
import { HomeRedirect } from '../components/HomeRedirect';

export const metadata: Metadata = {
  title: 'OCTA SAR-ийн тухай',
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return <HomeRedirect anchor="about" />;
}
