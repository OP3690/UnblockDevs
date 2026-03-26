import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import FixJsonParseErrorJavascriptClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix JSON.parse() Errors in JavaScript | UnblockDevs',
  description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples, error handling, and free JSON fixer tool. No signup required.',
  keywords: [
    'fix json.parse error javascript',
    'json.parse error handling',
    'json parse error javascript',
    'handle json parse error',
    'json.parse try catch',
    'fix json parse error',
    'javascript json error'
  ],
  openGraph: {
    title: 'Fix JSON.parse() Errors in JavaScript | UnblockDevs',
    description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples, error handling, and free JSON fixer tool. No signup required.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-json-parse-error-javascript',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix JSON.parse() Errors in JavaScript | UnblockDevs', description: 'Learn how to fix JSON.parse() errors in JavaScript. Complete guide with examples and free JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-json-parse-error-javascript' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix JSON.parse() Errors in JavaScript',
  url: 'https://unblockdevs.com/fix-json-parse-error-javascript',
  description: 'Fix JavaScript JSON.parse() SyntaxError instantly. Identify and repair malformed JSON caused by undefined values, HTML responses, double-encoding, or truncation. 100% browser-based.',
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
      name: 'What are the most common JSON.parse() errors in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common are: passing undefined or null to JSON.parse(), receiving an HTML error page (404/500) instead of JSON, double-encoded JSON (a JSON string inside another JSON string), and truncated API responses. All of these throw SyntaxError.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I debug when fetch returns HTML instead of JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the response Content-Type header and HTTP status before calling .json(). If status is 404 or 500, the server returned an HTML error page. Use response.text() first to inspect the raw body.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if a response is JSON before parsing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check response.headers.get("content-type") — it should include "application/json". Also check response.ok or response.status before calling response.json(). Wrap JSON.parse() in a try/catch to handle unexpected errors gracefully.',
      },
    },
  ],
};

export default function FixJsonParseErrorJavascript() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FixJsonParseErrorJavascriptClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Fix JSON.parse() Errors in JavaScript">
          <SEOProse>
            The JavaScript error <C>SyntaxError: Unexpected token ... in JSON at position X</C> is thrown by <C>JSON.parse()</C> when the string you pass is not valid JSON. Common causes include: passing <C>undefined</C> or <C>null</C> (which stringify to the string <C>"undefined"</C> — not valid JSON), getting a 404 or 500 HTML error page from a <C>fetch()</C> call instead of a JSON body, double-encoding (a JSON string nested inside another), or a truncated response that ends before the closing bracket.
          </SEOProse>
          <SEOProse>
            Paste the broken JSON string into the fixer above to see exactly where the parser fails. The tool highlights the problematic character and offers one-click auto-fix for common structural issues.
          </SEOProse>
        </SEOSection>
        <SEOSection id="how" eyebrow="How to fix" heading="Fix This JSON Error in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your broken JSON', desc: 'Paste the JSON string that caused the JSON.parse() error into the fixer above.' },
            { n: '02', title: 'Error is highlighted', desc: 'The tool shows the exact position where the parser stopped and what it found.' },
            { n: '03', title: 'Click Auto-Fix', desc: 'The auto-fixer repairs structural issues — missing brackets, trailing commas, and more.' },
            { n: '04', title: 'Copy fixed JSON', desc: 'Copy the valid JSON output to use safely with JSON.parse() in your code.' },
          ]} />
        </SEOSection>
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What are the most common JSON.parse() errors in JavaScript?',
              a: 'The most common are: passing undefined or null to JSON.parse(), receiving an HTML error page (404/500) instead of JSON, double-encoded JSON (a JSON string inside another JSON string), and truncated API responses. All of these throw SyntaxError.',
            },
            {
              q: 'How do I debug when fetch returns HTML instead of JSON?',
              a: 'Check the response Content-Type header and HTTP status before calling .json(). If status is 404 or 500, the server returned an HTML error page. Use response.text() to inspect the raw body and confirm.',
            },
            {
              q: 'How do I check if a response is JSON before parsing?',
              a: 'Check response.headers.get("content-type") — it should include "application/json". Also verify response.ok or response.status before calling response.json(). Always wrap JSON.parse() in a try/catch to handle unexpected errors gracefully.',
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

      <ToolPageFooterBand toolName="fix_json_parse_error_javascript" />
    </>
  );
}
