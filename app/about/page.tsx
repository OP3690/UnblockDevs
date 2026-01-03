import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs - Free Developer Tools | Privacy-Focused & No Signup Required',
  description: 'Learn about UnblockDevs - free online developer tools for JSON, API testing, and code conversion. Privacy-focused, no signup required, all processing in your browser.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'privacy focused tools',
    'json tools',
    'developer utilities'
  ],
};

export default function About() {
  return <AboutClient />;
}
