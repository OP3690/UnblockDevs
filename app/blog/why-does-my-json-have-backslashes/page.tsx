import type { Metadata } from 'next';
import WhyDoesMyJsonHaveBackslashesClient from './client';

export const metadata: Metadata = {
  title: 'Why Does My JSON Have Backslashes? Explained & Fixed | UnblockDevs',
  description: 'Why does my JSON have backslashes? Learn why JSON escapes quotes and backslashes, and how to fix or remove them correctly.',
  keywords: [
    'why does my json have backslashes',
    'json backslashes',
    'json escape backslash',
    'json escaped quotes',
    'remove backslashes from json',
    'json string escape',
    'json backslash explained',
  ],
  openGraph: {
    title: 'Why Does My JSON Have Backslashes? Explained & Fixed',
    description: 'Why does my JSON have backslashes? Learn why JSON escapes quotes and backslashes, and how to fix or remove them correctly.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-does-my-json-have-backslashes',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20Does%20My%20JSON%20Have%20Backslashes%3F%20Explained%20%26%20Fixed&emoji=%F0%9F%93%9D&desc=Why%20does%20my%20JSON%20have%20backslashes%3F%20Learn%20why%20JSON%20escapes%20quotes%20and%20backslashes', width: 1200, height: 630, alt: 'Why Does My JSON Have Backslashes? Explained & Fixed — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Does My JSON Have Backslashes? Explained & Fixed',
    description: 'Why does my JSON have backslashes? Learn why JSON escapes quotes and backslashes, and how to fix or remove them correctly.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-does-my-json-have-backslashes' },
};

export default function WhyDoesMyJsonHaveBackslashesPage() {
  return <WhyDoesMyJsonHaveBackslashesClient />;
}
