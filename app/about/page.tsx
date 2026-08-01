import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs — Free Browser-Based Developer Tools | UnblockDevs',
  description:
    'UnblockDevs is a free suite of 19+ browser-based developer tools — JSON formatter, CORS tester, SQL formatter, JWT decoder, and more. 100% client-side: your data never leaves your browser. No signup, no account, free forever. Built by developers, for developers since 2024.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'browser-based developer tools',
    'client-side tools',
    'json tools online',
    'cors tester',
    'sql formatter online',
    'jwt decoder',
    'data privacy developers',
    'no signup developer tools',
    'free online developer utilities',
  ],
  openGraph: {
    title: 'About UnblockDevs — Free Browser-Based Developer Tools',
    description:
      'UnblockDevs offers 19+ free developer tools that run entirely in your browser. JSON, CORS, SQL, JWT, and more — no signup, no data sent to servers, free forever.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UnblockDevs — Free Browser-Based Developer Tools',
    description:
      '19+ free developer tools: JSON, CORS, SQL, JWT and more. 100% in-browser — no signup, no data transmitted, free forever.',
  },
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
