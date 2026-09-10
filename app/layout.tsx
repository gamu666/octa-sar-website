import type { Metadata } from 'next';
import './globals.css';
import './apple-pages.css';
import './gallery.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://gamu666.github.io/octa-sar-website/'),
  title: {
    default: 'НАЙМАН САР — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
    template: '%s — НАЙМАН САР',
  },
  description:
    'НАЙМАН САР нь технологи, соёл, кино, уран бүтээл, хүний харилцааны огтлолцолд шинэ төсөл санаачлан хөгжүүлдэг бие даасан компани.',
  openGraph: {
    type: 'website',
    siteName: 'НАЙМАН САР',
    title: 'НАЙМАН САР — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
    description:
      'Технологи, соёл, кино, уран бүтээл, хүний харилцааны огтлолцолд шинэ төсөл санаачлан хөгжүүлнэ.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'НАЙМАН САР — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'НАЙМАН САР — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
    description:
      'Технологи, соёл, кино, уран бүтээл, хүний харилцааны огтлолцолд шинэ төсөл санаачлан хөгжүүлнэ.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
