import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to View JSON in Readable Format (Free Online Tool)',
  description: 'JSON look like a wall of text? Here\'s how to view JSON in a readable format instantly — with a tree viewer, formatter, and syntax highlighting. Free, no signup.',
  keywords: [
    'how to view json in readable format',
    'how to format json online free',
    'how to beautify json data quickly',
    'best way to read large json file',
    'how to pretty print json online',
    'json viewer that shows tree structure',
    'how to clean messy json data',
    'tool to format json instantly',
    'how to fix invalid json format online',
    'why is my json not formatting properly',
  ],
  openGraph: {
    title: 'How to View JSON in Readable Format (Free Online Tool)',
    description: 'JSON look like a wall of text? Here\'s how to view JSON in a readable format instantly — with a tree viewer, formatter, and syntax highlighting. Free, no signup.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-view-json-in-readable-format',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to View JSON in Readable Format (Free Online Tool)',
    description: 'JSON look like a wall of text? Here\'s how to view JSON in a readable format instantly — with a tree viewer, formatter, and syntax highlighting. Free, no signup.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-view-json-in-readable-format' },
};

export default function HowToViewJsonInReadableFormat() {
  return <BlogPostClient />;
}
