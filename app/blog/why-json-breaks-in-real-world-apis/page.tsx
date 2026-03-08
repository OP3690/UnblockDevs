import type { Metadata } from 'next';
import WhyJsonBreaksInApisClient from './client';

export const metadata: Metadata = {
  title: 'Why JSON Breaks in Real-World APIs – Fix Guide | UnblockDevs',
  description: 'Why API JSON breaks: trailing commas, partial responses. Fix malformed JSON. Paste to fix.',
  keywords: [
    'how to fix invalid json',
    'clean api response',
    'why json breaks in apis',
    'broken json from api',
    'fix api json response',
    'resolve json errors',
    'fix malformed api json',
    'api response json error',
  ],
  openGraph: {
    title: 'Why JSON Breaks in Real-World APIs (And How to Fix It)',
    description: 'Learn why APIs return broken JSON in production and how to fix it instantly.',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    url: 'https://unblockdevs.com/blog/why-json-breaks-in-real-world-apis',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-json-breaks-in-real-world-apis' },

};

export default function WhyJsonBreaksInApis() {
  return <WhyJsonBreaksInApisClient />;
}

