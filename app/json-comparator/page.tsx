import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import JsonComparatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-comparator';

export const metadata: Metadata = {
  title:
    'JSON Comparator — Compare Two JSON Objects, Diff API Responses & Detect Semantic Changes Online Free | UnblockDevs',
  description:
    'Compare two JSON objects or API responses side-by-side. Semantic diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes show. Free, 100% browser-based, no data sent to servers.',
  keywords: [
    'json comparator online',
    'compare json online',
    'json diff tool',
    'json compare tool',
    'json diff online',
    'compare two json objects',
    'semantic json diff',
    'json diff ignore timestamps',
    'json compare ignore uuids',
    'compare api responses online',
    'api response diff tool',
    'compare json dev vs production',
    'compare expected actual json',
    'how to compare two json objects online',
    'how to compare api responses',
    'JSON Comparator',
  ],
  openGraph: {
    title: 'JSON Comparator — Compare JSON, Diff API Responses & Semantic Changes Online Free | UnblockDevs',
    description:
      'Compare two JSON objects or API responses. Semantic diff normalizes UUIDs, timestamps, JWTs so only real logic changes show. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Comparator — Compare JSON & Diff API Responses Online Free | UnblockDevs',
    description: 'Semantic diff: normalizes UUIDs, timestamps, JWTs. Only real logic changes show. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Comparator — Compare Two JSON Objects, Diff API Responses & Semantic Changes',
  description:
    'Compare two JSON objects or API responses side-by-side. Semantic diff normalizes UUIDs, timestamps, JWTs, and hashes so only real logic changes appear. Free, 100% browser-based. No data sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Semantic JSON diff — normalizes UUIDs, timestamps, JWTs, hashes',
    'Side-by-side comparison with line numbers',
    'Unordered array comparison',
    'API response and config comparison',
    '100% client-side — no data sent to any server',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JSON objects online?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your first JSON into the left panel and your second JSON into the right panel at unblockdevs.com/json-comparator, then click Compare. Added fields show in green, removed in red, modified in yellow — with full nested object and array support.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is semantic JSON diff?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Semantic diff normalizes auto-generated dynamic values like UUIDs, timestamps, JWTs, and hashes before comparing. This filters out noise so only real logic and structure changes appear — unlike raw text diff which flags every changed character.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare JSON and ignore timestamps and UUIDs?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Enable UUID, ISO date, Epoch, JWT, and Hash normalization options in JSON Comparator before clicking Compare. Dynamic fields are replaced with placeholders so they don\'t appear as false differences in the result.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I detect breaking API changes with JSON comparison?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your old API response in JSON A and new response in JSON B at unblockdevs.com/json-comparator. Enable semantic normalization to filter dynamic noise. Any remaining differences represent real structural or logic changes that may be breaking changes.',
      },
    },
  ],
};

export default function JsonComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonComparatorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JSON Comparator?">
          <SEOProse>
            A <strong>JSON Comparator</strong> is a tool that finds the differences between two JSON documents and
            presents them in a readable, colour-coded view. Unlike a plain text diff, a semantic JSON diff
            understands the structure of JSON: it compares keys and values at every level of nesting rather
            than comparing raw character sequences line by line.
          </SEOProse>
          <SEOProse>
            The key advantage over raw text diff is <strong>noise reduction</strong>. API responses often
            contain auto-generated values — UUIDs, ISO timestamps, JWT tokens, hash digests — that change on
            every request without reflecting any logic change. Raw diff flags all of these as differences.
            Semantic diff normalizes them to placeholders first, so only real structural and value changes
            surface in the result.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Compare JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Drop JSON A into the left panel and JSON B into the right — from API responses, config files, or test fixtures.' },
            { n: '02', title: 'Run comparison', desc: 'Click Compare. The tool parses both documents and computes a deep structural diff.' },
            { n: '03', title: 'See the diff', desc: 'Added keys appear in green, removed in red, modified values in yellow. Array items and nested objects are handled automatically.' },
            { n: '04', title: 'Ignore noise', desc: 'Toggle UUID, timestamp, JWT, hash, and prefixed-ID normalization to suppress dynamic fields and focus on real changes.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Compare JSON">
          <UseCases cases={[
            { icon: '🔀', title: 'API Response Diff', desc: 'Compare dev vs production responses to catch environment-specific regressions before they reach users.' },
            { icon: '⚙️', title: 'Config Change Review', desc: 'Diff infrastructure or app config snapshots to audit exactly what changed between deployments.' },
            { icon: '🧪', title: 'Test Expected vs Actual', desc: 'Put expected JSON on one side and actual test output on the other. Normalize dynamic fields to eliminate false failures.' },
            { icon: '🗄️', title: 'DB Migration Validation', desc: 'Compare records exported before and after a migration to confirm data integrity.' },
            { icon: '🔍', title: 'PR Review', desc: 'Paste API contract snapshots from a pull request to verify backward compatibility and catch breaking changes.' },
            { icon: '📡', title: 'GraphQL Response Testing', desc: 'Compare GraphQL responses across schema versions to identify field additions, removals, or type changes.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I compare two JSON objects online?',
              a: 'Paste your first JSON into the left panel and your second JSON into the right panel, then click Compare. Added fields show in green, removed in red, and modified values in yellow — with full nested object and array support.',
            },
            {
              q: 'What is the difference between semantic JSON diff and raw text diff?',
              a: 'Raw diff flags every character change including auto-generated values like UUIDs, timestamps, and JWTs that change between responses but represent no logic change. Semantic diff normalizes these dynamic fields first so only meaningful structure and value differences appear.',
            },
            {
              q: 'How do I compare JSON and ignore timestamps and UUIDs?',
              a: <>Enable the normalization toggles — UUID, ISO date, Epoch, JWT, Hash, and Prefixed ID — before clicking Compare. Dynamic fields are replaced with a single placeholder token so they don&apos;t register as differences.</>,
            },
            {
              q: 'How do I detect breaking API changes?',
              a: 'Paste the old API response in JSON A and the new response in JSON B. Enable semantic normalization to filter dynamic noise. Any remaining differences represent real structural or logic changes — candidates for breaking changes to document or fix.',
            },
            {
              q: 'Is it safe to paste sensitive API payloads?',
              a: 'Yes. This tool runs 100% in your browser. No JSON data is ever sent to a server, logged, or stored. Safe for production responses, credentials in config files, and any confidential data.',
            },
            {
              q: 'Does it handle arrays and deeply nested objects?',
              a: <>Yes. The comparator recursively traverses every level of nesting. For arrays it supports both ordered comparison and unordered set comparison — useful when array item order is not significant.</>,
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print JSON before comparing', icon: '✨' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Inspect JWT payloads found in API responses', icon: '🔑' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Character-level diff for tokens and short strings', icon: '🔍' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs to use as test fixture IDs', icon: '🆔' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_comparator" />
    </>
  );
}
