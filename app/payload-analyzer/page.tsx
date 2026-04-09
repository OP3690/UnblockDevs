import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import PayloadAnalyzerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/payload-analyzer';

export const metadata: Metadata = {
  title: 'Payload Analyzer – HTTP Request & API Payload Inspector | UnblockDevs',
  description: 'Analyze HTTP request bodies and API payloads instantly. Inspect JSON, form data, XML, and multipart payloads. Free online payload analyzer — no signup.',
  keywords: [
    'payload analyzer',
    'http request analyzer',
    'api payload inspector',
    'request body analyzer',
    'api payload analyzer',
    'analyze api payload',
    'payload size analyzer',
    'api response analyzer',
    'request payload analyzer',
    'payload optimization',
    'http body parser',
    'api payload tool',
  ],
  openGraph: {
    title: 'Payload Analyzer | UnblockDevs',
    description: 'Analyze HTTP request bodies and API payloads instantly. Supports JSON, form data, XML, and multipart. Free, client-side.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payload Analyzer | UnblockDevs',
    description: 'Analyze HTTP request bodies and API payloads instantly. Free, client-side.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Payload Analyzer',
  url: canonicalUrl,
  description: 'Analyze HTTP request bodies and API payloads. Supports JSON, form-encoded, multipart, XML, and plain text. All processing is 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Analyze JSON, form-urlencoded, multipart, XML, and plain-text payloads',
    'Inspect payload structure and field types',
    'Measure payload size and identify large fields',
    'Detect content type automatically',
    'Privacy-first — all processing happens in your browser',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '540',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an HTTP payload?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An HTTP payload is the body of an HTTP request or response — the actual data being transmitted, separate from the headers. Request payloads carry data sent to a server (such as JSON in a POST request), while response payloads carry the data returned from the server. Common payload formats include JSON, form-urlencoded, multipart/form-data, and XML.',
      },
    },
    {
      '@type': 'Question',
      name: 'What content types does the Payload Analyzer support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool supports application/json, application/x-www-form-urlencoded, multipart/form-data, text/xml, application/xml, and text/plain. It auto-detects the content type when you paste a payload, or you can select it manually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my payload data sent to any server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All analysis runs entirely in your browser using JavaScript. Your payload data never leaves your device, making it safe to use with production payloads, authentication tokens, and other sensitive request bodies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a payload analyzer different from a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter only pretty-prints JSON. A payload analyzer goes further: it handles multiple content types (not just JSON), measures payload size, inspects field-level data, detects data types, and provides structural insights useful for debugging, documentation, and optimization.',
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
    { '@type': 'ListItem', position: 3, name: 'Payload Analyzer', item: canonicalUrl },
  ],
};

export default function PayloadAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PayloadAnalyzerClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Payload Analyzer?">
          <SEOProse>
            An <strong>HTTP payload</strong> is the body of a request or response — the data
            transmitted alongside headers. When a frontend sends a login form, POST request, or
            webhook event, the payload carries the actual content: user credentials, JSON objects,
            file uploads, or XML documents. Understanding that content is essential for debugging
            APIs, auditing integrations, and optimizing performance.
          </SEOProse>
          <SEOProse>
            A <strong>payload analyzer</strong> parses and inspects that body data regardless of
            its encoding. Instead of manually decoding a URL-encoded form string or counting bytes
            in a nested JSON tree, the analyzer surfaces structure, field types, size metrics, and
            content at a glance. It supports all common{' '}
            <C>Content-Type</C> values — JSON, form-urlencoded, multipart, XML, and plain text —
            so you can work with any API or webhook payload without switching tools.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Analyze Payloads in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or type your payload', desc: 'Paste the raw request body — JSON, form-encoded string, multipart data, XML, or plain text — directly into the editor.' },
            { n: '02', title: 'Select the content type', desc: 'Choose the Content-Type that matches your payload, or let the tool auto-detect it from the input format.' },
            { n: '03', title: 'Inspect structure and fields', desc: 'View a parsed breakdown of all fields, nested objects, arrays, data types, and individual field sizes.' },
            { n: '04', title: 'Identify issues and optimize', desc: 'Spot oversized fields, unexpected null values, missing keys, or structural mismatches against your API documentation.' },
          ]} />
        </SEOSection>

        {/* Content types */}
        <SEOSection id="content-types" heading="Supported Content Types">
          <SEOProse>
            The analyzer handles the six content types most commonly found in REST, GraphQL, and
            webhook payloads:
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Content-Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Common use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>application/json</C></td>
                  <td className="px-4 py-3 text-zinc-600">REST API request and response bodies, webhooks, GraphQL</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>application/x-www-form-urlencoded</C></td>
                  <td className="px-4 py-3 text-zinc-600">HTML form submissions, OAuth token requests</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>multipart/form-data</C></td>
                  <td className="px-4 py-3 text-zinc-600">File uploads, mixed form fields and binary data</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>text/xml</C></td>
                  <td className="px-4 py-3 text-zinc-600">Legacy REST APIs, RSS/Atom feeds, configuration payloads</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>application/xml</C></td>
                  <td className="px-4 py-3 text-zinc-600">SOAP services, enterprise integrations, XML-based APIs</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3"><C>text/plain</C></td>
                  <td className="px-4 py-3 text-zinc-600">Raw text bodies, log payloads, simple string data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Analyze Payloads">
          <UseCases cases={[
            { icon: '🐛', title: 'API Debugging', desc: 'Inspect the exact body sent to an endpoint when a request returns unexpected results — no guesswork about what was actually transmitted.' },
            { icon: '🔔', title: 'Webhook Inspection', desc: 'Paste a raw webhook event body to decode its structure and verify fields before writing handler logic.' },
            { icon: '🔐', title: 'Security Testing', desc: 'Examine request bodies for sensitive data exposure, unexpected fields, or injection payloads during penetration testing.' },
            { icon: '📄', title: 'API Documentation', desc: 'Explore an undocumented payload to understand its schema and generate accurate field-level documentation.' },
            { icon: '🧪', title: 'Integration Testing', desc: 'Verify that the payload a service sends during integration tests matches the expected contract before deploying.' },
            { icon: '📱', title: 'Mobile App Debugging', desc: 'Analyze payloads from mobile apps to identify oversized responses or unnecessary fields that affect bandwidth and battery.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is an HTTP payload?',
              a: 'An HTTP payload is the body of a request or response — the actual data being sent, separate from the URL and headers. Request payloads carry data to the server (for example, a JSON object in a POST request), while response payloads carry data back to the client.',
            },
            {
              q: 'What content types does the Payload Analyzer support?',
              a: 'The tool supports application/json, application/x-www-form-urlencoded, multipart/form-data, text/xml, application/xml, and text/plain. Auto-detection works for most standard payloads.',
            },
            {
              q: 'Is my payload data sent to any server?',
              a: 'No. All analysis runs entirely in your browser. Your payload data never leaves your device, making it safe to use with production credentials, tokens, and other sensitive request bodies.',
            },
            {
              q: 'How is a payload analyzer different from a JSON formatter?',
              a: 'A JSON formatter only pretty-prints JSON. A payload analyzer handles multiple content types, measures size, inspects individual fields and data types, and surfaces structural information useful for debugging, security review, and documentation.',
            },
            {
              q: 'Can I use this to inspect webhook payloads?',
              a: 'Yes. Copy the raw webhook body from your server logs, debugging proxy, or request inspector and paste it into the analyzer. The tool will parse and display its structure regardless of content type.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Extract and replay HTTP requests — including their bodies — from browser HAR exports', icon: '📦' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode and inspect JWT tokens found in Authorization headers or request bodies', icon: '🪙' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and syntax-highlight JSON payloads for easier reading', icon: '✨' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Compare two auth tokens side-by-side to spot differences in claims', icon: '🔀' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="payload_analyzer" />
    </>
  );
}
