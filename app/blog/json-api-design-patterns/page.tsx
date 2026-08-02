import type { Metadata } from 'next';
import JsonApiDesignPatternsClient from './client';

export const metadata: Metadata = {
  title: 'JSON API Design Patterns: RESTful Best Practices | UnblockDevs',
  description: 'JSON API design patterns for RESTful services: response structure, error handling, pagination, filtering, and versioning with practical code examples.',
  keywords: [
    'JSON API design patterns',
    'RESTful API design',
    'JSON API response structure',
    'API pagination best practices',
    'JSON API error handling',
    'REST API best practices',
    'JSON response format',
    'API versioning patterns',
    'JSON API standards',
    'API filtering design',
    'how to design a JSON API',
    'JSON API design best practices guide',
  ],
  openGraph: {
    title: 'JSON API Design Patterns: RESTful Best Practices & Examples for Developers',
    description: 'Learn battle-tested JSON API design patterns: consistent response structure, error handling, cursor pagination, field filtering, and versioning strategies with real code examples.',
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
    description: 'Master JSON API design: response structure, error handling, pagination, filtering, and versioning with practical real-world examples.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/json-api-design-patterns' },

};

export default function JsonApiDesignPatterns() {
  return <JsonApiDesignPatternsClient />;
}

