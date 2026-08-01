import type { Metadata } from 'next';
import HowToFixBrokenJsonWithoutUnderstandingClient from './client';

export const metadata: Metadata = {
  title: 'Fix Broken JSON Without Understanding It | UnblockDevs',
  description: 'Fix broken JSON without coding. Step-by-step for non-devs, students. Free JSON Fixer tool.',
  keywords: [
    'fix broken json without coding',
    'fix json for beginners',
    'repair json no coding',
    'fix json simple guide',
    'json fixer for non developers',
    'fix json without understanding',
    'simple json fixer'
  ],
  openGraph: {
    title: 'Fix Broken JSON Without Understanding It',
    description: 'Fix broken JSON without coding. Step-by-step for non-devs, students. Free JSON Fixer tool.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-broken-json-without-understanding',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20Broken%20JSON%20Without%20Understanding%20It&emoji=%F0%9F%93%9D&desc=Fix%20broken%20JSON%20without%20coding.%20Step-by-step%20for%20non-devs%2C%20students.%20Free%20JSON%20F', width: 1200, height: 630, alt: 'Fix Broken JSON Without Understanding It — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Broken JSON Without Understanding It',
    description: 'Fix broken JSON without coding. Step-by-step for non-devs, students. Free JSON Fixer tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-broken-json-without-understanding' },

};

export default function HowToFixBrokenJsonWithoutUnderstanding() {
  return <HowToFixBrokenJsonWithoutUnderstandingClient />;
}

