import type { Metadata } from 'next';
import { HomeRedirect } from '../components/HomeRedirect';

export const metadata: Metadata = {
  title: 'НАЙМАН САР-ийн тухай',
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return <HomeRedirect anchor="about" />;
}
