import type { Metadata } from 'next';
import CSSExplainedClient from './client';

export const metadata: Metadata = {
  title: 'CSS Explained: Must-Do Practices, Hidden Facts & Pro Tips | UnblockDevs Blog',
  description: 'Master CSS with this comprehensive guide. Learn CSS fundamentals, best practices, lesser-known features, and pro tips to write cleaner, smarter CSS code. Interactive CSS simulator included.',
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
    description: 'Master CSS with this comprehensive guide. Learn CSS fundamentals, best practices, and pro tips.',
    type: 'article',
    publishedTime: '2024-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function CSSExplainedGuide() {
  return <CSSExplainedClient />;
}

