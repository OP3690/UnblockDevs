import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs – AI-Safe Tools, Client-Side JSON & SQL | UnblockDevs',
  description:
    'AI-safe developer tools: JSON Shield, SQL schema masking, 19+ utilities. 100% client-side—no server storage, no signup. Mask before ChatGPT, restore locally.',
  keywords: [
    'about unblockdevs',
    'AI safe developer tools',
    'JSON masking',
    'SQL schema masker',
    'client-side tools',
    'data privacy developers',
    'free developer tools',
    'json tools',
  ],
  openGraph: {
    title: 'About UnblockDevs | UnblockDevs',
    description:
      'AI-safe, client-side tools for JSON and SQL. Data masking, no uploads, compliance-friendly—free forever, no signup.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UnblockDevs | UnblockDevs',
    description:
      'AI-safe JSON & SQL tools—client-side only, reversible masking, no signup.',
  },
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
