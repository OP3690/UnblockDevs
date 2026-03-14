import type { Metadata } from 'next';
import MockApiGeneratorClient from './client';

export const metadata: Metadata = {
  title: 'Mock API Generator – Fake REST APIs | UnblockDevs',
  description: 'Create mock REST APIs with dynamic responses, auth, latency, rate limits. Export Postman, OpenAPI. No signup.',
  keywords: [
    'mock api generator',
    'fake api',
    'mock rest api',
    'generate test api',
    'mock api online',
    'fake rest api',
    'postman mock',
    'openapi mock',
  ],
  openGraph: {
    title: 'Mock API Generator | UnblockDevs',
    description: 'Dynamic mock APIs with auth, rate limit, latency. Export Postman & OpenAPI.',
    type: 'website',
    url: 'https://unblockdevs.com/mock-api-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/mock-api-generator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a mock API generator?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A mock API generator creates fake REST API endpoints that return configurable responses. You define routes, status codes, delays, and optional auth or rate limits so frontends and tests can run without a real backend. Many tools also export to Postman or OpenAPI.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is it free and do I need to sign up?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The Mock API Generator at UnblockDevs is free with no signup. You create endpoints in your browser; you can export collections for Postman or OpenAPI and use them locally or in your CI pipeline.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I simulate auth, latency, or rate limits?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. You can add optional auth (e.g. API key or Bearer), set response delay/latency, and configure rate limits or conditional responses so your mock behaves like a real API during development and testing.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use the mock with Postman or OpenAPI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use the export options to download a Postman collection or OpenAPI (Swagger) spec. Import the file into Postman or any OpenAPI-compatible client to call your mock endpoints. You can also share the collection with your team.',
      },
    },
  ],
};

export default function MockApiGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MockApiGeneratorClient />
    </>
  );
}
