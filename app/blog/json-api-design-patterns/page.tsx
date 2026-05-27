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
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20API%20Design%20Patterns%3A%20RESTful%20Best%20Practices%20%26%20Examples&emoji=%7B%7D&desc=JSON%20API%20design%3A%20RESTful%20patterns%2C%20response%20structure%2C%20industry%20standards', width: 1200, height: 630, alt: 'JSON API Design Patterns: RESTful Best Practices & Examples — UnblockDevs Blog' }],

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

