import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonComparatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-comparator';

export const metadata: Metadata = {
  title: 'JSON Comparator Free — Diff & Compare JSON Online | UnblockDevs',
  description:
    'Compare two JSON objects side-by-side with semantic diff. Normalizes UUIDs, timestamps, and JWTs to show only real logic changes. Free, 100% browser-based.',
  keywords: [
    'json comparator online',
    'compare json online',
    'json diff tool',
    'json diff online',
    'compare two json objects',
    'api response diff',
    'semantic json diff',
    'json diff ignore timestamps',
    'how to compare two json objects',
    'json compare tool free',
    'compare api responses online',
    'diff json online',
  ],
  openGraph: {
    title: 'JSON Comparator — Compare JSON & Diff API Responses Online Free | UnblockDevs',
    description:
      'Compare two JSON objects or API responses side-by-side. Semantic diff normalizes UUIDs, timestamps, and JWTs so only real logic changes appear. 100% browser-based, nothing uploaded.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Comparator%20%E2%80%94%20Diff%20%26%20Compare%20JSON%20Objects&emoji=%7B%7D&desc=Compare%20two%20JSON%20objects%20or%20API%20responses', width: 1200, height: 630, alt: 'JSON Comparator — Diff & Compare JSON Objects — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Comparator — Diff & Compare JSON Objects Free Online',
    description: 'Semantic diff normalizes UUIDs, timestamps, and JWTs so only real logic changes show. Compare API responses side-by-side. 100% browser-based.',
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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Semantic JSON diff — normalizes UUIDs, timestamps, JWTs, hashes',
    'Side-by-side comparison with line numbers',
    'Unordered array comparison',
    'API response and config comparison',
    '100% client-side — no data sent to any server',
  ],};

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
    {
      '@type': 'Question' as const,
      name: 'Why does my JSON diff show hundreds of changes when almost nothing changed?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A plain text diff flags every character change including auto-generated values — UUIDs, timestamps, JWTs, and request IDs — that differ on every response but carry no logic change. Enable semantic normalization in this tool: it replaces those dynamic fields with placeholders before comparing, so only real structural and value differences appear in the result.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare two JSON objects in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The simplest approach is JSON.stringify(a) === JSON.stringify(b), but this fails when key order differs. For a reliable deep comparison use a library like lodash\'s _.isEqual(), or for a full diff with added/removed keys use jsondiffpatch or json-diff on npm.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does key order matter when comparing JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON object keys are unordered per the specification, so {\"a\":1,\"b\":2} and {\"b\":2,\"a\":1} are semantically identical. A structural JSON comparator handles this correctly, whereas a plain text diff or JSON.stringify comparison would report them as different.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare JSON arrays where order matters?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use ordered array comparison mode, which treats array position as significant. This is the default in most JSON diff tools. If you need unordered set comparison — useful for permission lists or tag arrays — switch to set mode so items are matched by value regardless of position.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I find the difference between two API responses?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Copy both API responses (e.g., from browser DevTools or Postman), paste them into the left and right panels of the JSON comparator, enable semantic normalization to suppress dynamic fields like request IDs and timestamps, then click Compare to see only the meaningful differences.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I verify that a PATCH request only changes what I intended?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste the original API response in JSON A and the response after your PATCH in JSON B, then click Compare. The comparator highlights exactly which fields changed, were added, or were removed — making it easy to confirm that your partial update only touched the intended properties and did not cause unintended side effects.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare JSON in Python?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Load both JSON strings with json.loads() into Python dicts, then compare with == for equality or use the deepdiff library (pip install deepdiff) for a detailed diff that shows added, removed, and changed values including nested structures.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare large JSON files?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'For large files (megabytes), browser-based tools may be slow. Consider command-line tools such as jq with diff, json-diff via npm (json-diff file1.json file2.json), or Python\'s deepdiff library which handles streaming and large structures efficiently.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is a deep equality check in JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Deep equality checks whether two JSON values are structurally and value-identical at every level of nesting, including nested objects and arrays. Shallow equality only checks the top-level references or keys. Deep equality is what you need when validating that two API responses carry the same data.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use JSON diff in CI/CD pipelines?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Install json-diff (npm install -g json-diff) or use jq in your pipeline script to compare expected and actual JSON output. Exit code 1 on any difference allows your CI step to fail automatically. Tools like jsondiffpatch also provide a programmatic API for integration in Jest or Mocha tests.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I compare JSON with different formatting?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. A structural JSON comparator parses both inputs before comparing, so whitespace, indentation, and newline differences are irrelevant. Minified and pretty-printed versions of the same JSON will always compare as equal.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I compare two API versions to check for breaking changes?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your old API response in JSON A and the new version in JSON B, then enable semantic normalization to suppress noise from dynamic fields. Any remaining differences — removed keys, type changes, renamed fields — are candidates for breaking changes. Review the highlighted diff before publishing or deprecating an API version.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Two JSON Objects Online',
  description: 'Step-by-step guide to diffing JSON and spotting differences between two JSON documents.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste JSON into both panels', text: 'Paste the original JSON on the left and the updated or expected JSON on the right.' },
    { '@type': 'HowToStep', position: 2, name: 'Click Compare', text: 'Click Compare to run the diff. The tool highlights added, removed, and changed keys in distinct colors.' },
    { '@type': 'HowToStep', position: 3, name: 'Review the diff results', text: 'Green items are additions, red items are removals, and orange items are value changes. A summary shows the total count of each type.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or export the diff', text: 'Copy individual differences, or export the full diff report for code review or documentation.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Comparator', item: canonicalUrl },
  ],
};

export default function JsonComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            {
              q: 'Why does my JSON diff show hundreds of changes when almost nothing changed?',
              a: 'A plain text diff flags every character change including auto-generated values — UUIDs, timestamps, JWTs — that differ on every response. Enable semantic normalization in this tool to replace those dynamic fields with placeholders before comparing, so only real structural and value differences appear.',
            },
            {
              q: 'How do I compare two JSON objects in JavaScript?',
              a: 'The simplest approach is JSON.stringify(a) === JSON.stringify(b), but this fails when key order differs. For reliable deep comparison use lodash\'s _.isEqual(), or for a full diff with added/removed keys use jsondiffpatch or json-diff on npm.',
            },
            {
              q: 'Does key order matter when comparing JSON?',
              a: 'JSON object keys are unordered per the specification, so {"a":1,"b":2} and {"b":2,"a":1} are semantically identical. A structural JSON comparator handles this correctly, whereas a plain text diff or JSON.stringify comparison would report them as different.',
            },
            {
              q: 'How do I compare JSON arrays where order matters?',
              a: 'Use ordered array comparison mode, which treats array position as significant. This is the default in most JSON diff tools. If you need unordered set comparison — useful for permission lists or tag arrays — switch to set mode so items are matched by value regardless of position.',
            },
            {
              q: 'How do I verify that a PATCH request only changes what I intended?',
              a: 'Paste the original API response in JSON A and the response after your PATCH in JSON B, then click Compare. The comparator highlights exactly which fields changed, were added, or were removed — confirming your partial update only touched the intended properties.',
            },
            {
              q: 'How do I compare two API versions to check for breaking changes?',
              a: 'Paste your old API response in JSON A and the new version in JSON B, then enable semantic normalization to suppress noise from dynamic fields. Any remaining differences — removed keys, type changes, renamed fields — are candidates for breaking changes to document or fix.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_comparator" />
    </>
  );
}
