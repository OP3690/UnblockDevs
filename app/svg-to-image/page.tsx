import type { Metadata } from 'next';
import SvgToImageClient from './client';

export const metadata: Metadata = {
  title: 'Convert SVG to JPEG or PNG - Free Online Tool | UnblockDevs',
  description: 'Convert SVG code to JPEG or PNG instantly. Paste your SVG, preview, set size and scale, then export. 100% client-side — your files never leave your device.',
  keywords: [
    'svg to jpeg',
    'svg to png',
    'convert svg to image',
    'svg export',
    'svg converter',
    'svg to jpg',
  ],
  openGraph: {
    title: 'Convert SVG to JPEG or PNG - Free Online | UnblockDevs',
    description: 'Convert SVG to JPEG or PNG in your browser. No uploads, no signup.',
    type: 'website',
    url: 'https://unblockdevs.com/svg-to-image',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/svg-to-image',
  },
};

export default function SvgToImagePage() {
  return <SvgToImageClient />;
}
