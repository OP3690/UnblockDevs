import type { Metadata } from 'next';
import WhyJsonBreaksInApisClient from './client';

export const metadata: Metadata = {
  title: 'Why JSON Breaks in Real-World APIs – How to Fix Invalid JSON & Resolve Errors | UnblockDevs',
  description: 'Why JSON breaks in real-world APIs and how to fix invalid JSON: trailing commas, partial responses, clean API response. Resolve malformed API JSON instantly. Paste to instant fix.',
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
  },
};

export default function WhyJsonBreaksInApis() {
  return <WhyJsonBreaksInApisClient />;
}

