import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'OCTA SAR — Ideas into enduring ventures',
    template: '%s — OCTA SAR',
  },
  description:
    'OCTA SAR builds thoughtful ventures across technology, culture, film and creative work — from Mongolia to the world.',
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
