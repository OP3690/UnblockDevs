import type { Metadata } from 'next';
import JsonApiDesignPatternsClient from './client';

export const metadata: Metadata = {
  title: 'JSON API Design Patterns | UnblockDevs',
  description: 'JSON API design: RESTful patterns, response structure, error handling, pagination. Industry standards.',
  keywords: [
    'JSON API design',
    'RESTful API',
    'API design patterns',
    'JSON API structure',
    'API best practices',
    'REST API design',
    'JSON response format',
    'API pagination',
    'API filtering',
    'JSON API standards',
    'API versioning',
    'JSON API examples'
  ],
  openGraph: {
    title: 'JSON API Design Patterns: RESTful Best Practices & Examples',
    description: 'JSON API design: RESTful patterns, response structure, industry standards.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'API Design', 'REST', 'Web Development'],
    url: 'https://unblockdevs.com/blog/json-api-design-patterns',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON API Design Patterns: RESTful Best Practices',
    description: 'JSON API design: RESTful patterns, pagination, error handling.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-api-design-patterns' },

};

export default function JsonApiDesignPatterns() {
  return <JsonApiDesignPatternsClient />;
}

