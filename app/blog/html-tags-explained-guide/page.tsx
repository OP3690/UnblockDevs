import type { Metadata } from 'next';
import HTMLTagsGuideClient from './client';

export const metadata: Metadata = {
  title: 'HTML Tags Explained – Practices & Pro Tips | UnblockDevs',
  description: 'HTML tags guide: essentials, best practices, pro tips. Interactive simulator included.',
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
    description: 'HTML tags guide: essentials, best practices, pro tips. Interactive simulator included.',
    type: 'article',
    publishedTime: '2024-01-20T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/html-tags-explained-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/html-tags-explained-guide' },

};

export default function HTMLTagsGuide() {
  return <HTMLTagsGuideClient />;
}
