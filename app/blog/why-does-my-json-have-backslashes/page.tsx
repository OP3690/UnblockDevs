import type { Metadata } from 'next';
import WhyDoesMyJsonHaveBackslashesClient from './client';

export const metadata: Metadata = {
  title: 'Why Does My JSON Have Backslashes? Fix It | UnblockDevs',
  description: 'Discover why your JSON has backslashes and when they indicate a bug. Learn the difference between correct escaping and double-encoding, with fixes and examples.',
  keywords: [
    'why does my json have backslashes',
    'json backslashes explained',
    'json escape backslash',
    'json escaped quotes',
    'remove backslashes from json',
    'json string escape',
    'json double encoding fix',
    'json backslash bug',
    'fix json backslashes javascript',
    'json stringify backslashes',
    'how to remove backslashes from json',
    'json escape characters explained'
  ],
  openGraph: {
    title: 'Why Does My JSON Have Backslashes? Causes and Fixes',
    description: 'Backslashes in JSON are often correct — but sometimes they signal a double-encoding bug. Learn when to remove them, how to fix the root cause, and when your JSON is actually valid.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-does-my-json-have-backslashes',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20Does%20My%20JSON%20Have%20Backslashes%3F%20Explained%20%26%20Fixed&emoji=%F0%9F%93%9D&desc=Why%20does%20my%20JSON%20have%20backslashes%3F%20Learn%20why%20JSON%20escapes%20quotes%20and%20backslashes', width: 1200, height: 630, alt: 'Why Does My JSON Have Backslashes? Explained & Fixed — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Does My JSON Have Backslashes? Fix It',
    description: "JSON backslashes are often valid escapes, but sometimes indicate double-encoding. Learn when they're a bug and how to fix them in your JavaScript code.",
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-does-my-json-have-backslashes' },
};

export default function WhyDoesMyJsonHaveBackslashesPage() {
  return <WhyDoesMyJsonHaveBackslashesClient />;
}
