import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://octa-sar.ftrga1030.chatgpt.site'),
  title: {
    default: 'OCTA SAR — Ideas into enduring ventures',
    template: '%s — OCTA SAR',
  },
  description:
    'OCTA SAR builds thoughtful ventures across technology, culture, film and creative work — from Mongolia to the world.',
  openGraph: {
    type: 'website',
    siteName: 'OCTA SAR',
    title: 'OCTA SAR — Ideas into enduring ventures',
    description:
      'OCTA SAR builds thoughtful ventures across technology, culture, film and creative work — from Mongolia to the world.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'OCTA SAR — Ideas into enduring ventures' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCTA SAR — Ideas into enduring ventures',
    description:
      'OCTA SAR builds thoughtful ventures across technology, culture, film and creative work — from Mongolia to the world.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
