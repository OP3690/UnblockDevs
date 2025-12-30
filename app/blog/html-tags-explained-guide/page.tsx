import type { Metadata } from 'next';
import HTMLTagsGuideClient from './client';

export const metadata: Metadata = {
  title: 'HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips | UnblockDevs Blog',
  description: 'Master HTML tags with this comprehensive guide. Learn essential HTML tags, best practices, lesser-known facts, and pro tips to write cleaner, smarter HTML code. Interactive HTML simulator included.',
  keywords: [
    'HTML tags',
    'HTML guide',
    'HTML best practices',
    'HTML tutorial',
    'HTML5',
    'web development',
    'HTML tips',
    'HTML simulator',
    'HTML examples',
    'HTML semantic tags',
    'HTML cheat sheet',
    'learn HTML',
    'HTML for beginners',
    'HTML advanced',
    'HTML tricks',
    'HTML tips and tricks'
  ],
  openGraph: {
    title: 'HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips',
    description: 'Master HTML tags with this comprehensive guide. Learn essential HTML tags, best practices, and pro tips.',
    type: 'article',
    publishedTime: '2024-01-20T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function HTMLTagsGuide() {
  return <HTMLTagsGuideClient />;
}
