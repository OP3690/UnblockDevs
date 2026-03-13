import type { Metadata } from 'next';
import TestDataGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/test-data-generator';

export const metadata: Metadata = {
  title:
    'Test Data Generator — Generate Fake User, Invoice, Banking & API Log Test Data from JSON Schema Online Free | UnblockDevs',
  description:
    'Generate realistic test data instantly. Choose from 11 templates — users, invoices, banking, API logs, security events, AI training data — or define custom JSON Schema. Free, 100% browser-based, no signup.',
  keywords: [
    'test data generator',
    'fake data generator',
    'random data generator',
    'mock data generator',
    'dummy data generator',
    'fake user data generator',
    'json test data generator',
    'test data generator online',
    'fake data generator online',
    'mock data generator free',
    'generate test data from json schema',
    'json schema test data generator',
    'fake invoice data generator',
    'security test data generator',
    'ai training data generator',
    'database test data generator',
    'qa test data generator',
    'generate test data for development',
    'mock data for api testing',
    'seed database test data',
  ],
  openGraph: {
    title:
      'Test Data Generator — Fake User, Invoice, Banking & API Log Test Data from JSON Schema Online Free | UnblockDevs',
    description:
      'Generate realistic test data with 11 templates or custom JSON Schema. Users, invoices, banking, API logs, security events, AI training data. Free, browser-based, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Data Generator — Fake User, Invoice, Banking & API Log Test Data from JSON Schema Free | UnblockDevs',
    description:
      '11 templates + custom JSON Schema. Users, invoices, banking, API logs, security events, AI training data. Free, browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test Data Generator — Generate Fake User, Invoice, Banking & API Log Test Data from JSON Schema',
  description:
    'Generate realistic test data with 11 predefined templates (users, invoices, banking, API logs, security events, AI training data) or custom JSON Schema. Up to 50 records. Free, 100% browser-based, no signup.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    '11 templates: user, invoice, banking, API logs, security events, AI training data, and more',
    'Custom JSON Schema support — generate data from your own schema',
    'Up to 50 records per run in JSON or CSV',
    '100% browser-based — no data sent to servers',
    'No signup required',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is the difference between test data, mock data, and fake data?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'They mean the same thing in practice — data generated specifically for development and testing rather than from real production sources. "Test data" is the technical term, "mock data" is common in API testing, and "fake data" is used colloquially. All refer to realistic synthetic data safe to use in development.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I generate data from my own JSON Schema?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Select the Custom Schema option at unblockdevs.com/test-data-generator, paste your JSON Schema into the schema field defining your object properties and types, set the record count (up to 50), and click Generate. The tool creates realistic data matching your exact schema structure.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I use this for database seeding?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Generate up to 50 records in JSON or CSV format and use the output to seed your development or staging database. The JSON output can be imported directly into most databases and ORMs.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is the generated data safe to use in demos?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes — all data is completely synthetic. No real names, emails, account numbers, or personal information are used. Safe for client demos, screenshots, presentations, and public-facing prototypes.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What makes the AI training data template unique?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'It generates realistic ML training records with model names, dataset sizes, epoch counts, accuracy metrics, precision, recall, latency, and cost data — structured like real ML experiment tracking logs. Useful for testing AI dashboards and ML pipeline tooling.',
      },
    },
  ],
};

export default function TestDataGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TestDataGeneratorClient />
    </>
  );
}
