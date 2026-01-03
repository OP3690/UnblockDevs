import type { Metadata } from 'next';
import WhyJsonBreaksInApisClient from './client';

export const metadata: Metadata = {
  title: 'Why JSON Breaks in Real-World APIs (And How to Fix It) | UnblockDevs',
  description: 'Learn why JSON breaks in real-world APIs: trailing commas, unescaped characters, partial responses, backend logging. Real examples and how to fix malformed API JSON instantly.',
  keywords: [
    'why json breaks in apis',
    'broken json from api',
    'malformed api json',
    'fix api json response',
    'api json error',
    'broken json api',
    'fix malformed api json',
    'api response json error',
    'json api error fix'
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

