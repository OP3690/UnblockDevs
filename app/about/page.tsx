import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About Us - UnblockDevs | Free JSON Tools for Developers',
  description: 'Learn about UnblockDevs - a free online platform providing JSON Viewer, JSON Parser, JSON Beautifier, JSON to Excel converter, and other essential developer tools. Built by developers, for developers.',
  keywords: [
    'about unblockdevs',
    'JSON tools',
    'developer tools',
    'free JSON tools',
    'JSON viewer',
    'JSON parser',
    'JSON beautifier'
  ],
  openGraph: {
    title: 'About Us - UnblockDevs | Free JSON Tools for Developers',
    description: 'Learn about UnblockDevs - a free online platform providing essential JSON and developer tools.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

