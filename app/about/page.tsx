import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs — Free Browser-Based Developer Tools | UnblockDevs',
  description:
    'UnblockDevs provides 25+ free browser-based developer tools: JSON formatter, CORS tester, JWT decoder, SQL formatter, regex tester, cURL converter, and more. 100% client-side — your data never leaves your device. No signup, no tracking, free forever.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'browser based developer tools',
    'JSON formatter',
    'CORS tester',
    'JWT decoder',
    'SQL formatter',
    'cURL converter',
    'client-side tools',
    'no signup developer tools',
    'data privacy developers',
    'AI safe developer tools',
  ],
  openGraph: {
    title: 'About UnblockDevs — Free Browser-Based Developer Tools',
    description:
      '25+ free browser-based tools: JSON formatter, CORS tester, JWT decoder, SQL formatter, and more. 100% client-side, no signup, no tracking.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=About%20UnblockDevs&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=25%2B%20free%20browser-based%20developer%20tools%20%E2%80%94%20no%20signup%20required', width: 1200, height: 630, alt: 'About UnblockDevs — Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UnblockDevs — Free Browser-Based Developer Tools',
    description:
      '25+ free developer tools — JSON, CORS, JWT, SQL, regex, cURL. 100% in-browser, no signup, no tracking.',
    images: ['https://unblockdevs.com/api/og?title=About%20UnblockDevs&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=25%2B%20free%20browser-based%20developer%20tools%20%E2%80%94%20no%20signup%20required'],
  },
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
