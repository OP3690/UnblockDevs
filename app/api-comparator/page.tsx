import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import ApiComparatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/api-comparator';

export const metadata: Metadata = {
  title: 'API Comparator — Compare API Responses Side by Side, Detect Breaking Changes Online Free | UnblockDevs',
  description:
    'Compare two API responses side-by-side. Semantic JSON diff, detect breaking changes, added or removed fields, type changes. Paste two responses and see the diff instantly. Free, 100% browser-based.',
  keywords: [
    'api comparator online',
    'compare api responses',
    'api response diff',
    'api json diff tool',
    'compare two api responses',
    'api breaking changes detector',
    'api schema diff',
    'api regression testing tool',
    'rest api response comparator',
    'json diff tool online',
    'api versioning diff',
    'debug api changes',
  ],
  openGraph: {
    title: 'API Comparator — Compare API Responses & Detect Breaking Changes Online | UnblockDevs',
    description: 'Semantic diff two API JSON responses. Detect breaking changes, added/removed fields, type changes. Free, 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs API Comparator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Comparator — Compare API Responses & Detect Breaking Changes | UnblockDevs',
    description: 'Semantic diff two API JSON responses. Detect breaking changes, added/removed fields, type changes. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'API Comparator — Compare API Responses & Detect Breaking Changes',
  url: canonicalUrl,
  description: 'Compare two API JSON responses side-by-side. Semantic diff, detect breaking changes, added/removed fields, type changes. Free, 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Semantic JSON diff of two API responses',
    'Detect added, removed, and modified fields',
    'Type change detection (string → number etc.)',
    'Nested object diff with path display',
    'Copy diff to clipboard',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1100',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I compare two API responses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the first API response in the left panel and the second in the right panel. The comparator instantly shows added fields (green), removed fields (red), and changed values (yellow) with the full JSON path.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a breaking API change?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A breaking change is any modification that causes existing clients to fail: removing a field, changing a field type, renaming a key, or changing a required field to optional. The API Comparator highlights these automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my API response data sent to any server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All comparison logic runs entirely in your browser. Your API responses never leave your device, making it safe for production data, auth tokens, and sensitive payloads.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Two API Responses',
  description: 'Use the API Comparator to diff two API JSON responses and detect breaking changes, added or removed fields, and type changes.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your API URL or response', text: 'Enter the API endpoint URL or paste two API responses you want to compare.' },
    { '@type': 'HowToStep', position: 2, name: 'Set headers and authentication', text: 'Add any required headers (Authorization, Content-Type) for the API calls.' },
    { '@type': 'HowToStep', position: 3, name: 'Run the comparison', text: 'Click Compare. The tool shows the structural diff between the two responses.' },
    { '@type': 'HowToStep', position: 4, name: 'Identify differences', text: 'Added, removed, and changed fields are highlighted. Use this to detect API breaking changes.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'API Comparator', item: canonicalUrl },
  ],
};

export default function ApiComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ApiComparatorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is an API Comparator?">
          <SEOProse>
            An <strong>API comparator</strong> performs a semantic diff between two JSON API responses, showing exactly what changed — which fields were added, removed, renamed, or had their values or types change. Unlike a plain text diff, a semantic JSON diff understands the structure: it matches object keys rather than lines, so reordered keys or reformatted whitespace do not show as false positives.
          </SEOProse>
          <SEOProse>
            The primary use case is <strong>API regression testing</strong>: comparing a response from a stable version against a new version before deploying to catch breaking changes. It is also valuable for debugging unexpected API behavior when a response has changed between environments.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Compare API Responses in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste response A', desc: 'Paste the first API response JSON into the left panel — this is typically the baseline or previous version.' },
            { n: '02', title: 'Paste response B', desc: 'Paste the second API response JSON into the right panel — this is the new or modified version you want to compare.' },
            { n: '03', title: 'Review the diff', desc: 'Added fields highlight green, removed fields red, changed values yellow. The full JSON path (e.g. $.user.roles[0]) is shown for each change.' },
            { n: '04', title: 'Copy or share', desc: 'Copy the diff summary to clipboard for a PR comment, bug report, or changelog entry.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Compare API Responses">
          <UseCases cases={[
            { icon: '🔄', title: 'API Version Migration', desc: 'Validate that a v2 API still returns all required fields before migrating your frontend.' },
            { icon: '🐛', title: 'Debug Environment Differences', desc: 'Compare staging vs production responses to diagnose why a feature works in one environment but not another.' },
            { icon: '✅', title: 'Regression Testing', desc: 'Catch unintended field removals or type changes introduced by a backend refactor before users do.' },
            { icon: '🔗', title: 'Third-Party API Changes', desc: 'Detect when a third-party API silently changes its response schema — common with beta or deprecated endpoints.' },
            { icon: '📝', title: 'Changelog Generation', desc: 'Use the diff output to automatically document what changed between API versions for your changelog.' },
            { icon: '🔌', title: 'Webhook Debugging', desc: 'Compare two webhook payloads from different events to understand how the structure varies between event types.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I compare two API responses?',
              a: 'Paste the baseline response in the left panel and the new response in the right. The comparator shows added, removed, and changed fields with their full JSON paths instantly.',
            },
            {
              q: 'What is a breaking API change?',
              a: 'A breaking change causes existing clients to fail: removing a required field, changing a field type (string → number), renaming a key, or changing a 200 response to a 4xx. The comparator highlights these in red.',
            },
            {
              q: 'Can this compare nested objects and arrays?',
              a: 'Yes. The diff is fully recursive — it matches nested object keys and array elements by index. Changes deep inside nested structures are shown with their full path.',
            },
            {
              q: 'Is my API data sent to any server?',
              a: 'No. All comparison logic runs entirely in your browser. Your API responses never leave your device, making it safe for production tokens, PII, and sensitive payloads.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Deep semantic diff for any two JSON objects', icon: '🔀' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate JSON before comparing', icon: '{}' },
            { href: '/cors-tester', label: 'CORS Tester', desc: 'Test the CORS headers on the API endpoints you are comparing', icon: '🌐' },
            { href: '/har-to-curl', label: 'HAR to cURL', desc: 'Convert browser network requests to cURL commands for API testing', icon: '🔄' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="api_comparator" />
    </>
  );
}
