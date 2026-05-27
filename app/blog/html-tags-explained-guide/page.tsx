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
    images: [{ url: 'https://unblockdevs.com/api/og?title=HTML%20Tags%20Explained%3A%20Must%E2%80%91Do%20Practices%2C%20Hidden%20Facts%20%26%20Pro%20Tips&emoji=%F0%9F%A4%96&desc=HTML%20tags%20guide%3A%20essentials%2C%20best%20practices%2C%20pro%20tips', width: 1200, height: 630, alt: 'HTML Tags Explained: Must‑Do Practices, Hidden Facts & Pro Tips — UnblockDevs Blog' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/html-tags-explained-guide' },

};

export default function HTMLTagsGuide() {
  return <HTMLTagsGuideClient />;
}
