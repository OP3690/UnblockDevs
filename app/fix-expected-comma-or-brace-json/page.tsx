import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import FixExpectedCommaOrBraceClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Expected Comma or Brace" JSON Error | UnblockDevs',
  description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix expected comma or brace json',
    'expected comma or } after property value',
    'json missing comma error',
    'fix json comma error',
    'json syntax error comma',
    'expected comma json fix'
  ],
  openGraph: {
    title: 'Fix "Expected Comma or Brace" JSON Error | UnblockDevs',
    description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-expected-comma-or-brace-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Expected Comma or Brace JSON Error | UnblockDevs', description: 'Fix "Expected comma or closing brace" JSON error instantly. Free guide with examples and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-expected-comma-or-brace-json' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Expected Comma or Brace JSON Error',
  url: 'https://unblockdevs.com/fix-expected-comma-or-brace-json',
  description: 'Fix "Expected comma or closing brace" JSON errors instantly. Auto-detect and fix missing commas, trailing commas, and missing brackets. 100% browser-based.',
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
      name: 'What causes "Expected comma or closing brace" in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Missing comma between properties, trailing comma after the last property, or a missing closing brace/bracket. Paste your JSON into the fixer above to see the exact location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are trailing commas valid in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Trailing commas (like {"key": "value",}) are valid in JavaScript but are illegal in strict JSON. The auto-fixer removes them automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the line with the error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The JSON Fixer highlights the exact line and character position where the parser stopped. Look for a missing comma between two properties or a missing closing brace.',
      },
    },
  ],
};

export default function FixExpectedCommaOrBrace() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FixExpectedCommaOrBraceClient />

      <ToolSEOContent>
        <SEOSection id="what" heading={'Fix "Expected Comma or Closing Brace" JSON Error'}>
          <SEOProse>
            The <strong>"Expected comma or closing brace after property value"</strong> error means your JSON is missing a comma between two properties or between an array element and the next one, or it has a missing closing brace <C>{'}'}</C> or bracket <C>]</C>. This is one of the most common JSON syntax errors and is usually caused by copy-pasting or manually editing JSON without checking the structure.
          </SEOProse>
          <SEOProse>
            Common triggers: trailing commas after the last property (valid in JavaScript but invalid in JSON), missing comma between two objects in an array, or a forgotten closing brace at the end of a nested object.
          </SEOProse>
        </SEOSection>
        <SEOSection id="how" eyebrow="How to fix" heading="Fix This JSON Error in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your broken JSON', desc: 'Paste the JSON with the error into the JSON Fixer above.' },
            { n: '02', title: 'Error is highlighted', desc: 'The tool shows the exact line and character where the error is detected.' },
            { n: '03', title: 'Click Auto-Fix', desc: 'The auto-fixer adds missing commas, removes trailing commas, and adds missing brackets.' },
            { n: '04', title: 'Copy fixed JSON', desc: 'Copy the valid JSON output — or switch to the JSON Beautifier for formatting.' },
          ]} />
        </SEOSection>
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What causes "Expected comma or closing brace" in JSON?',
              a: 'Missing comma between properties, trailing comma after the last property, or a missing closing brace/bracket. Paste your JSON into the fixer above to see the exact location.',
            },
            {
              q: 'Are trailing commas valid in JSON?',
              a: 'No. Trailing commas (like {"key": "value",}) are valid in JavaScript but are illegal in strict JSON. The auto-fixer removes them automatically.',
            },
            {
              q: 'How do I find the line with the error?',
              a: 'The JSON Fixer highlights the exact line and character position where the parser stopped. Look for a missing comma between two properties or a missing closing brace.',
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

      <ToolPageFooterBand toolName="fix_expected_comma_or_brace_json" />
    </>
  );
}
