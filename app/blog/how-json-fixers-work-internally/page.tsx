import type { Metadata } from 'next';
import HowJsonFixersWorkClient from './client';

export const metadata: Metadata = {
  title: 'How JSON Fixers Work Internally | UnblockDevs',
  description: 'How JSON fixers work: tokenization, error recovery, trailing comma and quote fixes. Fix AI JSON.',
  keywords: [
    'how to fix invalid json from ai',
    'fix invalid json',
    'how json fixers work',
    'json fixer algorithm',
    'json error recovery',
    'resolve json errors',
    'json tokenization',
  ],
  openGraph: {
    title: 'How JSON Fixers Work Internally',
    description: 'How JSON fixers work: tokenization, error recovery, trailing comma and quote',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-json-fixers-work-internally',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20JSON%20Fixers%20Work%20Internally&emoji=%7B%7D&desc=How%20JSON%20fixers%20work%3A%20tokenization%2C%20error%20recovery%2C%20trailing%20comma%20and%20quote', width: 1200, height: 630, alt: 'How JSON Fixers Work Internally — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How JSON Fixers Work Internally',
    description: 'How JSON fixers work: tokenization, error recovery, trailing comma and quote',
    images: ['https://unblockdevs.com/api/og?title=How%20JSON%20Fixers%20Work%20Internally&emoji=%7B%7D&desc=How%20JSON%20fixers%20work%3A%20tokenization%2C%20error%20recovery%2C%20trailing%20comma%20and%20quote'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-json-fixers-work-internally' },

};

export default function HowJsonFixersWork() {
  return <HowJsonFixersWorkClient />;
}

