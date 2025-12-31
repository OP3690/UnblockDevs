import type { Metadata } from 'next';
import JsonApiDesignPatternsClient from './client';

export const metadata: Metadata = {
  title: 'JSON API Design Patterns: RESTful Best Practices & Examples | UnblockDevs',
  description: 'Master JSON API design patterns with this comprehensive guide. Learn RESTful API design, response structures, error handling, pagination, filtering, and industry-standard patterns used by top tech companies.',
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
    description: 'Master JSON API design patterns with this comprehensive guide. Learn RESTful API design, response structures, and industry-standard patterns.',
    type: 'article',
    publishedTime: '2025-01-31T00:00:00.000Z',
    authors: ['UnblockDevs'],
    tags: ['JSON', 'API Design', 'REST', 'Web Development'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON API Design Patterns: RESTful Best Practices',
    description: 'Master JSON API design patterns with this comprehensive guide.',
  },
};

export default function JsonApiDesignPatterns() {
  return <JsonApiDesignPatternsClient />;
}

