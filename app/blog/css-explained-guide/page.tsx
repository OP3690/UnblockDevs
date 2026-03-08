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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/css-explained-guide' },

};

export default function CSSExplainedGuide() {
  return <CSSExplainedClient />;
}

