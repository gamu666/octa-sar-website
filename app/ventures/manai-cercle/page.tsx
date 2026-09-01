import type { Metadata } from 'next';
import { getVenture } from '../../lib/ventures';
import { VentureDetail } from '../VentureDetail';

const venture = getVenture('manai-cercle')!;

export const metadata: Metadata = {
  title: venture.name,
  description: venture.oneLiner,
  openGraph: { title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
  twitter: { card: 'summary', title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
};

export default function ManaiCerclePage() {
  return <VentureDetail venture={venture} />;
}
