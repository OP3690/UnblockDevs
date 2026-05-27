import type { Metadata } from 'next';
import CSSExplainedClient from './client';

export const metadata: Metadata = {
  title: 'CSS Explained – Practices & Pro Tips | UnblockDevs',
  description: 'CSS guide: fundamentals, best practices, pro tips. Interactive simulator included.',
  keywords: [
    'CSS guide',
    'CSS tutorial',
    'CSS best practices',
    'CSS tips',
    'CSS tricks',
    'CSS fundamentals',
    'Flexbox',
    'CSS Grid',
    'CSS variables',
    'responsive CSS',
    'CSS animation',
    'modern CSS',
    'CSS interview',
    'CSS examples'
  ],
  openGraph: {
    title: 'CSS Explained: Must-Do Practices, Hidden Facts & Pro Tips',
    description: 'CSS guide: fundamentals, best practices, pro tips.',
    type: 'article',
    publishedTime: '2024-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/css-explained-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=CSS%20Explained%3A%20Must-Do%20Practices%2C%20Hidden%20Facts%20%26%20Pro%20Tips&emoji=%F0%9F%A4%96&desc=CSS%20guide%3A%20fundamentals%2C%20best%20practices%2C%20pro%20tips', width: 1200, height: 630, alt: 'CSS Explained: Must-Do Practices, Hidden Facts & Pro Tips — UnblockDevs Blog' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/css-explained-guide' },

};

export default function CSSExplainedGuide() {
  return <CSSExplainedClient />;
}

