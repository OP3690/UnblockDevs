import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs – Free Dev Tools, No Signup | UnblockDevs',
  description: 'Free developer tools for JSON, API testing, code conversion. Privacy-focused, no signup, in-browser.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'privacy focused tools',
    'json tools',
    'developer utilities'
  ],
  openGraph: {
    title: 'About UnblockDevs | UnblockDevs',
    description: 'Free developer tools for JSON, API testing, code conversion. Privacy-focused, no signup, in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'About UnblockDevs | UnblockDevs', description: 'Free developer tools for JSON, API testing, code conversion. Privacy-focused, no signup, in-browser.' },
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
