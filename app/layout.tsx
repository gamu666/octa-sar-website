import type { Metadata } from 'next';
import './globals.css';
import './apple-pages.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://octa-sar.ftrga1030.chatgpt.site'),
  title: {
    default: 'OCTA SAR — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
    template: '%s — OCTA SAR',
  },
  description:
    'OCTA SAR нь технологи, соёл, кино, уран бүтээл, хүний харилцааны огтлолцолд шинэ төсөл санаачлан хөгжүүлдэг бие даасан компани.',
  openGraph: {
    type: 'website',
    siteName: 'OCTA SAR',
    title: 'OCTA SAR — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
    description:
      'Технологи, соёл, кино, уран бүтээл, хүний харилцааны огтлолцолд шинэ төсөл санаачлан хөгжүүлнэ.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'OCTA SAR — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCTA SAR — Утга учиртай санааг үнэ цэнтэй бүтээл болгоно',
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
