import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import MockApiGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/mock-api-generator';

export const metadata: Metadata = {
  title: 'Mock API Generator — Generate JSON Mock Data, Fake REST API Endpoints & Test Responses Online Free | UnblockDevs',
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
    'mock json data',
    'generate mock data',
  ],
  openGraph: {
    title: 'Mock API Generator — Generate JSON Mock Data & Fake REST API Endpoints | UnblockDevs',
    description: 'Dynamic mock APIs with auth, rate limit, latency. Export Postman & OpenAPI. No signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mock API Generator | UnblockDevs',
    description: 'Generate fake REST API endpoints and JSON mock data. 100% browser-based, no signup.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mock API Generator',
  url: canonicalUrl,
  description: 'Generate fake REST API endpoints and JSON mock data for frontend development and testing. All processing is 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Generate fake REST API endpoints',
    'Configurable JSON mock responses',
    'Auth simulation (API key, Bearer)',
    'Response latency and rate limit simulation',
    'Export to Postman collection',
    'Export to OpenAPI (Swagger) spec',
    '100% client-side — no data leaves your device',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '1050',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a mock API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A mock API is a simulated REST API that returns predefined responses without connecting to a real backend. Developers use mock APIs to build and test frontend applications when the real API is not yet available, unstable, or too expensive to call during development.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate mock JSON data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Mock API Generator to define an endpoint, choose the HTTP method and status code, and write or generate the JSON response body. The tool supports realistic field types like names, emails, UUIDs, dates, and phone numbers so your mock data looks like real production data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a mock, a stub, and a fake?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A stub returns hardcoded responses with no logic. A mock verifies that specific calls were made (commonly used in unit tests). A fake is a working implementation that replaces the real service — like an in-memory database. In everyday usage, developers often use "mock API" to mean any of these: a server that returns realistic fake responses for development and testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use a mock API instead of the real API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a mock API when the real API is not ready yet, when it has rate limits or costs money per call, when you need to reliably reproduce error states or edge cases, or when you want to develop offline. Switch to the real API before shipping to production.',
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
    { '@type': 'ListItem', position: 3, name: 'Mock API Generator', item: canonicalUrl },
  ],
};

export default function MockApiGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MockApiGeneratorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Mock API?">
          <SEOProse>
            A <strong>mock API</strong> is a simulated REST API that returns predefined responses
            without connecting to a real backend. Instead of wiring up a database and server, you
            define routes, status codes, and JSON bodies — and the mock behaves exactly like a real
            API from the perspective of any client calling it.
          </SEOProse>
          <SEOProse>
            Mock APIs are a standard practice in modern frontend development. They let you build and
            test UI components before the backend exists, reproduce error scenarios that are hard to
            trigger in production, and run automated tests without network dependencies. When the real
            API is ready, you simply swap the base URL and nothing in your frontend code changes.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate Mock Data in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Define your endpoint', desc: 'Set the HTTP method (GET, POST, PUT, DELETE, PATCH), the route path, and an optional response delay to simulate latency.' },
            { n: '02', title: 'Configure the response', desc: 'Choose a status code, write or auto-generate the JSON body using realistic field types: names, emails, UUIDs, dates, and more.' },
            { n: '03', title: 'Add optional rules', desc: 'Simulate auth (API key or Bearer token), configure rate limits, or set up conditional responses based on request parameters.' },
            { n: '04', title: 'Export and integrate', desc: 'Copy the mock config, export a Postman collection or OpenAPI spec, and point your frontend at the mock to start developing immediately.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use Mock APIs">
          <UseCases cases={[
            { icon: '🖥️', title: 'Frontend Without Backend', desc: 'Build complete UI features and data flows before the backend API exists — no blockers, no waiting on other teams.' },
            { icon: '🧪', title: 'Unit & Integration Tests', desc: 'Write deterministic tests against a mock that always returns the same response, no matter the network state.' },
            { icon: '🎨', title: 'Demo & Prototype Data', desc: 'Populate a product demo or clickable prototype with realistic-looking data without exposing real user information.' },
            { icon: '📄', title: 'API Documentation', desc: 'Pair your API docs with a live mock so readers can make real requests against working endpoints immediately.' },
            { icon: '📈', title: 'Load & Performance Testing', desc: 'Run load tests against a mock that responds instantly to benchmark your client code without hitting production rate limits.' },
            { icon: '✈️', title: 'Offline Development', desc: 'Keep working on planes, trains, and coffee shops where the real API is unreachable by switching to a local mock.' },
          ]} />
        </SEOSection>

        {/* Supported data types */}
        <SEOSection id="data-types" heading="Supported Mock Data Types">
          <SEOProse>
            The generator supports realistic field types so your mock responses look like real
            production data:
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                  <th className="px-4 py-3 font-semibold text-zinc-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Example Output</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Common Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Name</td><td className="px-4 py-3 text-zinc-500"><C>Jane Doe</C></td><td className="px-4 py-3 text-zinc-500">User profiles, author fields</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Email</td><td className="px-4 py-3 text-zinc-500"><C>jane@example.com</C></td><td className="px-4 py-3 text-zinc-500">Account data, contact lists</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">UUID</td><td className="px-4 py-3 text-zinc-500"><C>a1b2c3d4-…</C></td><td className="px-4 py-3 text-zinc-500">Resource IDs, entity keys</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Date</td><td className="px-4 py-3 text-zinc-500"><C>2024-06-15T10:30:00Z</C></td><td className="px-4 py-3 text-zinc-500">Created/updated timestamps</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Phone</td><td className="px-4 py-3 text-zinc-500"><C>+1-555-123-4567</C></td><td className="px-4 py-3 text-zinc-500">Contact forms, user records</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Address</td><td className="px-4 py-3 text-zinc-500"><C>123 Main St, Springfield</C></td><td className="px-4 py-3 text-zinc-500">Shipping, billing, location data</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Number</td><td className="px-4 py-3 text-zinc-500"><C>42</C> / <C>3.14</C></td><td className="px-4 py-3 text-zinc-500">Counts, prices, scores</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 text-zinc-800">Boolean</td><td className="px-4 py-3 text-zinc-500"><C>true</C> / <C>false</C></td><td className="px-4 py-3 text-zinc-500">Feature flags, status fields</td></tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a mock API?',
              a: 'A mock API is a fake REST API that returns predefined responses without a real backend. It is used during frontend development and testing to simulate API behavior when the real service is not available or too costly to call.',
            },
            {
              q: 'What is the difference between a mock, a stub, and a fake?',
              a: 'A stub returns hardcoded responses with no logic. A mock verifies that specific calls were made — commonly used in unit tests. A fake is a working substitute for a real service. In practice, "mock API" is used loosely to mean any server that returns realistic fake responses for development.',
            },
            {
              q: 'Can I simulate errors and edge cases?',
              a: 'Yes. You can configure any HTTP status code (400, 401, 404, 500, etc.) as the response, add a delay to simulate timeout conditions, and set up conditional rules to return different responses based on query parameters or request body fields.',
            },
            {
              q: 'When should I use a mock API instead of the real one?',
              a: 'Use a mock when the real API is not ready, has rate limits or per-call costs, when you need deterministic test data, when you want to develop offline, or when you need to reliably reproduce edge cases and error states.',
            },
            {
              q: 'Is my mock data sent to a server?',
              a: 'No. All mock generation happens entirely in your browser. Your endpoint definitions, JSON bodies, and any sensitive field values never leave your device.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate the JSON bodies you use in mock responses', icon: '✨' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs to use as mock resource IDs in your responses', icon: '🆔' },
            { href: '/curl-converter', label: 'cURL Converter', desc: 'Convert cURL commands to code after testing against your mock', icon: '⚡' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Hash mock passwords or tokens for realistic auth response payloads', icon: '🔑' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="mock_api_generator" />
    </>
  );
}
