import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import TestDataGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/test-data-generator';

export const metadata: Metadata = {
  title:
    'Test Data Generator — Generate Realistic Fake Names, Emails, Addresses, JSON & SQL Online Free | UnblockDevs',
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
    'faker.js alternative',
    'generate test data jest',
    'mock data react testing library',
    'test fixtures node.js',
  ],
  openGraph: {
    title:
      'Test Data Generator — Generate Realistic Fake Names, Emails, Addresses, JSON & SQL Online Free | UnblockDevs',
    description:
      'Generate realistic test data with 11 templates or custom JSON Schema. Users, invoices, banking, API logs, security events, AI training data. Free, browser-based, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Data Generator — Fake Names, Emails, Addresses, JSON & SQL Free | UnblockDevs',
    description:
      '11 templates + custom JSON Schema. Users, invoices, banking, API logs, security events, AI training data. Free, browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test Data Generator — Generate Realistic Fake Names, Emails, Addresses, JSON & SQL',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1200',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a test data generator and why do developers use it?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A test data generator is a tool that creates synthetic, realistic data — names, emails, addresses, UUIDs, dates — for use in development, testing, and demos instead of real production data. Developers use it to seed databases, write unit tests, build UI prototypes, and run load tests safely without exposing real user information.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I generate fake data online for free?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Visit unblockdevs.com/test-data-generator, choose one of 11 built-in templates (or define a custom JSON Schema), set the record count (up to 50), and click Generate. Copy the output as JSON or CSV — no signup, no install, 100% browser-based.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between fake data and mock data?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'They mean the same thing in practice. "Fake data" and "mock data" both refer to synthetic data generated for development and testing instead of real production records. "Test data" is the more formal term, and "dummy data" is the colloquial one. All are safe to use in non-production environments.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is generated test data GDPR compliant?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. All data is entirely synthetic — no real names, email addresses, phone numbers, or personal information are used. Because no real personal data is involved, GDPR and similar privacy regulations do not apply. It is safe to use in demos, staging environments, and public-facing prototypes.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Test Data Generator', item: canonicalUrl },
  ],
};

export default function TestDataGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TestDataGeneratorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Test Data Generator?">
          <SEOProse>
            A <strong>test data generator</strong> creates realistic synthetic data — names, email addresses,
            phone numbers, addresses, UUIDs, and more — that developers use instead of copying real production
            records. Fake data lets you build features, run tests, seed databases, and demo products without
            touching real user information or violating privacy regulations.
          </SEOProse>
          <SEOProse>
            <strong>Fake data vs real data:</strong> Real data carries privacy risk, GDPR obligations, and
            potential exposure. Synthetic test data is structurally identical but contains no real personal
            information — safe to commit, share, and use in any environment. A good generator produces data
            that looks real (valid email formats, plausible names, realistic address patterns) so your UI and
            logic behave exactly as they would in production.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate Test Data in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Select fields or template', desc: 'Pick one of 11 built-in templates (users, invoices, banking, API logs…) or paste your own JSON Schema.' },
            { n: '02', title: 'Set quantity', desc: 'Choose how many records you need — from 1 up to 50 — with a single slider.' },
            { n: '03', title: 'Pick format', desc: 'Select JSON for nested objects or CSV for spreadsheets and database imports.' },
            { n: '04', title: 'Export or copy', desc: 'Copy to clipboard or download — ready to paste into your tests, seed scripts, or mock APIs.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Need Test Data">
          <UseCases cases={[
            { icon: '🧪', title: 'Unit & Integration Testing', desc: 'Create deterministic fixtures for Jest, Vitest, or pytest without hardcoding brittle values.' },
            { icon: '🗄️', title: 'Database Seeding', desc: 'Populate dev and staging databases with realistic rows so pagination, search, and filters behave realistically.' },
            { icon: '🖼️', title: 'UI Prototypes', desc: 'Feed Storybook, Figma dev mode, or staging apps with real-looking data before the backend exists.' },
            { icon: '⚡', title: 'Load & Performance Testing', desc: 'Generate bulk JSON payloads to simulate traffic spikes and measure throughput without production data.' },
            { icon: '🎪', title: 'Demo Environments', desc: 'Populate client demos and screenshots with plausible names and transactions — no real user data risk.' },
            { icon: '📡', title: 'API Contract Testing', desc: 'Build request and response payloads that match your OpenAPI schema to validate consumer-driven contracts.' },
          ]} />
        </SEOSection>

        {/* Supported types */}
        <SEOSection id="types" heading="Supported Data Types">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-6 font-semibold text-zinc-700">Type</th>
                  <th className="pb-3 font-semibold text-zinc-700">Example output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['Name', 'Emily Thornton, Carlos Vega'],
                  ['Email', 'emily.thornton@example.com'],
                  ['Phone', '+1 (415) 555-0182'],
                  ['Address', '742 Evergreen Terrace, Springfield, IL 62701'],
                  ['UUID', '7f3c8b2e-4a1d-4f9e-b6c0-1e2d3a4b5c6f'],
                  ['Date / Time', '2024-03-14T09:26:00Z'],
                  ['Number', '4821, 3.14, -99'],
                  ['Boolean / Status', 'true, "active", "pending"'],
                ].map(([type, example]) => (
                  <tr key={type}>
                    <td className="py-3 pr-6 font-semibold text-zinc-900">{type}</td>
                    <td className="py-3 font-mono text-zinc-500">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Is the generated data GDPR compliant?',
              a: 'Yes. Every record is entirely synthetic — no real names, emails, or personal identifiers. Because no actual personal data is involved, GDPR and equivalent privacy regulations do not apply. Safe for demos, staging, and public repos.',
            },
            {
              q: 'How realistic is the generated data?',
              a: 'Very realistic. Names follow natural first/last patterns, emails use valid formats, phone numbers match country patterns, and addresses use real city/state/ZIP combinations. The goal is data that passes real validation logic.',
            },
            {
              q: 'What export formats are supported?',
              a: <>JSON and CSV. JSON supports nested objects and arrays, making it ideal for API testing and ORMs. CSV works directly with spreadsheets, SQL <C>COPY</C> statements, and most database import tools.</>,
            },
            {
              q: 'Can I generate hundreds of records at once?',
              a: 'Up to 50 records per run in the browser tool. For larger volumes, use the Custom JSON Schema option with a script that calls a library like Faker.js or generate multiple batches and combine them.',
            },
            {
              q: 'Can I define my own schema?',
              a: 'Yes. Select the Custom Schema option, paste any valid JSON Schema, and the tool generates data that matches your exact property names, types, and nested structures — without writing code.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate v4/v7 UUIDs for primary keys and IDs', icon: '🔑' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and prettify generated JSON output', icon: '✨' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Create a schema from sample JSON, then generate data', icon: '📐' },
            { href: '/mock-api-generator', label: 'Mock API Generator', desc: 'Serve generated test data through a mock endpoint', icon: '📡' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="test_data_generator" />
    </>
  );
}
