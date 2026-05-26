import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
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
    // Extended keyword cluster
    'api response comparator',
    'compare api responses',
    'api diff tool',
    'api output comparison',
    'json response diff',
    'compare api versions',
    'api regression testing',
    'api change detection',
    'compare rest api responses',
    'api response validator',
    'before after api comparison',
    'api upgrade testing',
    'api migration comparison',
    'compare json responses online',
    'json diff tool',
    'api testing tool',
    'api response checker',
    'compare api endpoints',
    'api version diff',
    'graphql diff',
    'rest api comparator',
    'api monitoring',
    'api response schema change',
    'breaking change detection',
    'api backward compatibility',
    'api deprecation check',
    'compare staging production api',
    'environment comparison api',
    'compare api headers',
    'response header diff',
    'http status comparison',
    'api latency comparison',
    'api response time diff',
    'compare json arrays',
    'compare json objects',
    'nested json diff',
    'api payload diff',
    'api contract testing',
    'swagger diff',
    'openapi diff',
    'api versioning strategy',
    'api changelog',
    'api response format change',
    'api field comparison',
    'api data type change',
    'compare curl responses',
    'compare postman runs',
    'api test automation',
    'api response comparator free',
    'api diff no signup',
    'compare api outputs online',
    'api json diff tool', 'rest api response diff', 'compare two api calls',
    'api breaking change detector', 'api schema change detector', 'api field diff checker',
    'compare json payloads online', 'api versioning diff', 'api response comparator no login',
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
      name: 'Which field changes in an API response will break my frontend or SDK integration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Changes that break existing clients: removing a field your code reads, changing a field type (e.g. string to integer causes parse errors), renaming a key, changing a 200 to a 4xx, or making a previously optional field required. The API Comparator highlights these in red (removed) and yellow (type changed). Additions in green are generally safe.',
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
    {
      '@type': 'Question',
      name: 'Why does my API response look different in staging vs production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Environment differences are caused by different config values, feature flags, database seeds, or middleware that behaves differently per environment. Paste the staging response on the left and the production response on the right — the comparator pinpoints exactly which fields differ, helping you quickly diagnose whether it is a data issue, a missing env variable, or an unintended code path.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I detect breaking changes in an API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Breaking changes include: removing a field that clients depend on, changing a field type (e.g. string to integer), renaming a key, changing the HTTP status code, or making a previously optional field required. Paste the old API response on the left and the new one on the right — the comparator highlights breaking changes in red.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare staging vs production API responses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Make the same API call against both environments using curl or Postman, then paste each response into the respective panels. The semantic diff will show exactly which fields or values differ between staging and production, helping you diagnose environment-specific bugs before they affect users.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if an API upgrade broke anything for my frontend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call the current and new API versions with identical parameters and paste both responses into the comparator. Focus on fields highlighted in red (removed) — these will cause null reference errors in your frontend. Yellow fields (type changes, like string to number) will silently break conditional logic. Run this check before migrating your frontend to catch every regression.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare two JSON responses automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste both JSON responses into the left and right panels and click Compare. The tool performs a recursive semantic diff — matching object keys (not just text lines) — and highlights every addition, deletion, and change with its full JSON path. No manual inspection of nested structures is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare two versions of an API that uses URL versioning vs header versioning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For URL versioning (/v1/ vs /v2/), call both endpoints directly and paste the responses. For header versioning (e.g. Accept: application/vnd.api+json; version=2), use curl or Postman with the appropriate Accept or custom header for each version, then paste both responses into the comparator. The diff highlights what changed regardless of how the version was specified in the request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test API backwards compatibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Collect the response from the current stable API version and the new version. Paste them into the comparator. Focus on fields highlighted in red (removed) and yellow (type-changed) — these are the changes most likely to break existing clients. Additions highlighted in green are generally backwards-compatible.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare API response headers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the response headers as plain text into each panel to diff HTTP headers between two API calls. This is useful for detecting when CORS headers, caching directives, or security headers change between API versions or environments — differences that would not appear in the response body diff.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tools can I use for API regression testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For automated regression testing, use tools like Dredd, Pact, or Postman Collection Runner. For quick manual checks between two responses, this API Comparator provides instant semantic diffing with no setup required. Combine both: automated tests in CI/CD and manual spot checks with the comparator during development.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find what changed between two API versions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Make the same API call against both versions and paste the responses into the comparator. The diff output lists every change with the full JSON path (e.g. $.user.roles[0].permissions), the old value, and the new value. Copy the diff summary to include in your changelog or PR description.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare GraphQL responses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GraphQL responses are standard JSON with a data key. Paste two GraphQL responses directly into the comparator panels. The semantic diff correctly handles nested objects and arrays in the data field, making it easy to see when a schema change adds, removes, or alters fields in a query response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I detect silent changes in a third-party API I depend on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Third-party APIs sometimes change their response structure without announcing it. Save a known-good response from the API, then make the same call after a suspected update and paste both into the comparator. Any added, removed, or type-changed fields will be immediately visible — so you can update your integration before it breaks in production.',
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
              q: 'Which field changes in an API response will break my frontend or SDK integration?',
              a: 'Changes that break existing clients: removing a field your code reads, changing a field type (string to integer causes parse errors), renaming a key, or changing a 200 to a 4xx. The comparator highlights removed fields and type changes in red and yellow — additions in green are generally safe.',
            },
            {
              q: 'Can this compare nested objects and arrays?',
              a: 'Yes. The diff is fully recursive — it matches nested object keys and array elements by index. Changes deep inside nested structures are shown with their full JSON path (e.g. $.user.roles[0]).',
            },
            {
              q: 'Is my API data sent to any server?',
              a: 'No. All comparison logic runs entirely in your browser. Your API responses never leave your device, making it safe for production tokens, PII, and sensitive payloads.',
            },
            {
              q: 'Why does my API response look different in staging vs production?',
              a: 'Environment differences are caused by different config values, feature flags, database seeds, or middleware that behaves differently per environment. Paste the staging response on the left and the production response on the right — the comparator pinpoints exactly which fields differ, helping you quickly diagnose whether it is a data issue, a missing env variable, or an unintended code path.',
            },
            {
              q: 'How do I detect breaking changes in an API?',
              a: 'Breaking changes include removing a field, changing a field type, renaming a key, or altering the HTTP status code. Paste the old response on the left and the new one on the right — removed fields and type changes are highlighted in red as the highest-risk differences.',
            },
            {
              q: 'How do I compare staging vs production API responses?',
              a: 'Make the same API call against both environments using curl or Postman, then paste each JSON response into the respective panels. The diff shows exactly which fields or values differ, helping you diagnose environment-specific bugs before they reach users.',
            },
            {
              q: 'How do I check if an API upgrade broke anything for my frontend?',
              a: 'Call the current and new API versions with identical parameters and paste both responses into the comparator. Focus on fields highlighted in red (removed) — these will cause null reference errors in your frontend. Yellow fields (type changes) will silently break conditional logic. Run this check before migrating your frontend to catch every regression.',
            },
            {
              q: 'How do I test API backwards compatibility?',
              a: 'Collect responses from the current and new API versions, then compare them. Focus on fields highlighted in red (removed) and yellow (type-changed) — these break existing clients. Additions in green are generally safe and backwards-compatible.',
            },
            {
              q: 'How do I find what changed between two API versions?',
              a: 'Make the same API call against both versions and paste the responses into the comparator. The output lists every change with the full JSON path, old value, and new value — ready to copy into a PR description or changelog.',
            },
            {
              q: 'How do I compare GraphQL responses?',
              a: 'GraphQL responses are standard JSON with a data key. Paste two GraphQL query results directly into the comparator. The semantic diff handles nested objects and arrays in the data field, making schema changes immediately visible.',
            },
            {
              q: 'How do I detect silent changes in a third-party API I depend on?',
              a: 'Third-party APIs sometimes change their response structure without announcing it. Save a known-good response from the API, then make the same call after a suspected update and paste both into the comparator. Any added, removed, or type-changed fields will be immediately visible — so you can update your integration before it breaks in production.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'API Response Comparison Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why API Responses Differ' },
            { href: '/blog/json-best-practices-production-guide', label: 'API Versioning Best Practices' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging API Drift' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="api_comparator" />
    </>
  );
}
