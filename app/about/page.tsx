import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs — Free Browser-Based Developer Tools | UnblockDevs',
  description:
    'UnblockDevs is a free suite of 50+ browser-based developer tools — JSON formatter, CORS tester, SQL formatter, JWT decoder, cURL converter, and more. 100% client-side and GDPR-safe: your data never leaves your browser. No signup, no account, free forever.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'browser-based developer tools',
    'client-side developer tools',
    'gdpr safe developer tools',
    'json formatter online free',
    'cors tester online',
    'sql formatter online',
    'jwt decoder online',
    'curl converter online',
    'data privacy developer tools',
    'no signup developer tools',
    'free online developer utilities',
    'privacy first developer tools',
  ],
  openGraph: {
    title: 'About UnblockDevs — 50+ Free Browser-Based Developer Tools',
    description:
      'UnblockDevs offers 50+ free developer tools that run entirely in your browser. JSON, CORS, SQL, JWT, cURL, and more — GDPR-safe, no signup, no data sent to servers, free forever.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UnblockDevs — 50+ Free Browser-Based Developer Tools',
    description:
      '50+ free developer tools: JSON, CORS, SQL, JWT, cURL and more. 100% in-browser, GDPR-safe — no signup, no data transmitted, free forever.',
  },
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
