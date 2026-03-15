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
  alternates: { canonical: 'https://unblockdevs.com/blog/why-does-my-json-have-backslashes' },
};

export default function WhyDoesMyJsonHaveBackslashesPage() {
  return <WhyDoesMyJsonHaveBackslashesClient />;
}
