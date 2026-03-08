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
  alternates: { canonical: 'https://unblockdevs.com/blog/how-json-fixers-work-internally' },

};

export default function HowJsonFixersWork() {
  return <HowJsonFixersWorkClient />;
}

