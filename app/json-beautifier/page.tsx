import type { Metadata } from 'next';
import JsonBeautifierClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Beautifier Online - Format & Prettify JSON Instantly | UnblockDevs',
  description: 'Beautify and format JSON instantly with our free online JSON beautifier. Prettify JSON with customizable indentation, syntax highlighting, and structure visualization. No signup required.',
  keywords: [
    'json beautifier',
    'json formatter',
    'format json online',
    'prettify json',
    'json prettifier',
    'beautify json online',
    'json formatter online',
    'json beautifier free'
  ],
  openGraph: {
    title: 'Free JSON Beautifier Online - Format & Prettify JSON Instantly',
    description: 'Beautify and format JSON instantly with our free online JSON beautifier. No signup required.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-beautifier',
  },
};

export default function JsonBeautifierPage() {
  return <JsonBeautifierClient />;
}
