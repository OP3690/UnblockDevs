import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import FixUnexpectedEndOfJsonInputClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected end of JSON input" Error | UnblockDevs',
  description: 'Fix "Unexpected end of JSON input" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix unexpected end of json input',
    'unexpected end of json input error',
    'json parse error unexpected end',
    'fix json input error',
    'json input error solution',
    'unexpected end of json',
    'json parse error fix',
    'invalid json input',
    'json error fixer',
    'fix broken json'
  ],
  openGraph: {
    title: 'Fix "Unexpected end of JSON input" Error - Complete Guide',
    description: 'Learn how to fix "Unexpected end of JSON input" error instantly with examples and free tools.',
    type: 'article',
  },
  alternates: { canonical: 'https://unblockdevs.com/fix-unexpected-end-of-json-input' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Unexpected End of JSON Input',
  url: 'https://unblockdevs.com/fix-unexpected-end-of-json-input',
  description: 'Fix "Unexpected end of JSON input" errors instantly. Detect truncated JSON, missing closing brackets, and empty strings passed to JSON.parse(). 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes "Unexpected end of JSON input"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The JSON was truncated before it was complete. Common causes: missing closing brackets or braces at the end of the document, a partial API response due to a network timeout, or passing an empty string to JSON.parse().',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the missing closing brackets in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your JSON into the fixer above. It counts opening and closing brackets and braces to identify which ones are missing and at what nesting level.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I call JSON.parse(\'\') with an empty string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON.parse(\'\') throws "Unexpected end of JSON input" because an empty string is not valid JSON. Always check that your string is non-empty before parsing. Use a try/catch block and validate that the input is a non-empty string first.',
      },
    },
  ],
};

export default function FixUnexpectedEndOfJsonInput() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FixUnexpectedEndOfJsonInputClient />

      <ToolSEOContent>
        <SEOSection id="what" heading={'Fix "Unexpected End of JSON Input" Error'}>
          <SEOProse>
            <strong>"Unexpected end of JSON input"</strong> means the JSON parser reached the end of the string before the JSON was structurally complete. The most common causes are missing closing brackets <C>]</C> or braces <C>{'}'}</C>, a truncated API response (network timeout or partial read), or passing an empty string directly to <C>JSON.parse()</C>.
          </SEOProse>
          <SEOProse>
            This error is easy to reproduce: remove the last few characters from any valid JSON object and you will get this error. The JSON Fixer above detects the imbalance between opening and closing brackets, shows you what is missing, and can automatically close any unclosed structures.
          </SEOProse>
        </SEOSection>
        <SEOSection id="how" eyebrow="How to fix" heading="Fix This JSON Error in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your broken JSON', desc: 'Paste the truncated or incomplete JSON into the fixer above.' },
            { n: '02', title: 'Error is highlighted', desc: 'The tool shows where the input ends unexpectedly and what closing characters are missing.' },
            { n: '03', title: 'Click Auto-Fix', desc: 'The auto-fixer appends missing closing brackets and braces to complete the structure.' },
            { n: '04', title: 'Copy fixed JSON', desc: 'Copy the valid JSON output — verify it matches your expected data before using it.' },
          ]} />
        </SEOSection>
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What causes "Unexpected end of JSON input"?',
              a: 'The JSON was truncated before it was complete. Common causes: missing closing brackets or braces at the end of the document, a partial API response due to a network timeout, or passing an empty string to JSON.parse().',
            },
            {
              q: 'How do I find the missing closing brackets in JSON?',
              a: 'Paste your JSON into the fixer above. It counts opening and closing brackets and braces to identify which ones are missing and at what nesting level.',
            },
            {
              q: 'What happens if I call JSON.parse(\'\') with an empty string?',
              a: 'JSON.parse(\'\') throws "Unexpected end of JSON input" because an empty string is not valid JSON. Always check that your string is non-empty before parsing. Use a try/catch block and validate the input is a non-empty string first.',
            },
          ]} />
        </SEOSection>
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-fixer-online', label: 'JSON Fixer Online', desc: 'Auto-fix all common JSON errors in one click', icon: '🔧' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate JSON with inline error highlighting', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax and report all errors', icon: '✅' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Compare fixed vs original JSON to see what changed', icon: '🔀' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="fix_unexpected_end_of_json_input" />
    </>
  );
}
