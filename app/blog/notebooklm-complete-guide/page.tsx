import type { Metadata } from 'next';
import NotebooklmCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'NotebookLM Complete Guide | UnblockDevs',
  description: 'NotebookLM guide: what it is, how to use, tips. Google\'s AI notebook for research and writing.',
  keywords: [
    'notebooklm',
    'notebooklm guide',
    'google notebooklm',
    'ai notebook',
    'notebooklm tutorial',
    'how to use notebooklm',
    'notebooklm best practices',
    'ai research tool',
    'notebooklm study guide features',
    'notebooklm effective usage guide',
    'notebooklm generate checklists',
    'notebooklm features',
    'notebooklm complete guide',
    'notebooklm audio overview',
    'notebooklm for research',
    'notebooklm prompts guide'
  ],
  openGraph: {
    title: 'NotebookLM Complete Guide',
    description: "NotebookLM guide: what it is, how to use, tips. Google's AI notebook for research and writing.",
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/notebooklm-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=NotebookLM%20Complete%20Guide&emoji=%F0%9F%93%9D&desc=NotebookLM%20guide%3A%20what%20it%20is%2C%20how%20to%20use%2C%20tips.%20Google%E2%80%99s%20AI%20notebook%20for%20research', width: 1200, height: 630, alt: 'NotebookLM Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotebookLM Complete Guide',
    description: "NotebookLM guide: what it is, how to use, tips. Google's AI notebook for research and writing.",
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/notebooklm-complete-guide' },

};

export default function NotebooklmCompleteGuide() {
  return <NotebooklmCompleteGuideClient />;
}

