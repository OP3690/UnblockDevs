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
  alternates: { canonical: 'https://unblockdevs.com/about' },
};

export default function About() {
  return <AboutClient />;
}
