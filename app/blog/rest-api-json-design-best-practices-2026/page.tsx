import type { Metadata } from 'next';
import RestApiJsonBestPracticesClient from './client';

export const metadata: Metadata = {
  title: 'REST API JSON Design Best Practices 2026: 8 Rules Every Developer Must Follow | UnblockDevs',
  description: 'Build APIs developers actually love. The 8 REST API JSON design rules covering response envelopes, error format, status codes, pagination, ISO dates, versioning, and naming conventions — with real code.',
  keywords: [
    'rest api best practices 2026',
    'rest api json format',
    'api json response format',
    'rest api design patterns',
    'api versioning best practices',
    'rest api error response format',
    'json api naming conventions',
    'rest api pagination',
    'api response envelope',
    'rest api status codes',
    'json api design guide',
    'api design developer experience',
    'rest api null vs undefined',
    'iso 8601 dates api',
    'rest vs graphql vs grpc',
  ],
  openGraph: {
    title: 'REST API JSON Design Best Practices 2026: 8 Rules Every Developer Must Follow',
    description: 'Response envelopes, error formats, status codes, pagination, ISO dates, API versioning — the 8 rules that separate great APIs from frustrating ones.',
    type: 'article',
    publishedTime: '2026-05-15T14:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/rest-api-json-design-best-practices-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — REST API JSON Best Practices 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REST API JSON Design Best Practices 2026',
    description: '8 rules that separate great APIs from frustrating ones — with real JSON examples.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/rest-api-json-design-best-practices-2026' },
};

export default function RestApiJsonBestPracticesPage() {
  return <RestApiJsonBestPracticesClient />;
}
