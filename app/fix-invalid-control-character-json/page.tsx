import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import FixInvalidControlCharacterClient from './client';

export const metadata: Metadata = {
  title: 'Fix "Invalid Control Character" JSON Error | UnblockDevs',
  description: 'Fix "Invalid control character" JSON error instantly. Escape raw newlines, tabs, and control characters. Free guide with examples and JSON fixer tool.',
  keywords: [
    'fix invalid control character json',
    'invalid control character json error',
    'json control character error',
    'fix json newline error',
    'json escape characters',
    'invalid control character fix',
    'json parse error',
    'json fixer tool',
  ],
  openGraph: {
    title: 'Fix "Invalid Control Character" JSON Error | UnblockDevs',
    description: 'Fix the "Invalid control character" JSON error. Learn what causes raw control characters in JSON strings, how to escape them, and use our free JSON fixer tool. Browser-based, no signup.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-invalid-control-character-json',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Free%20Guide%3A%20Fix&emoji=%7B%7D&desc=Step-by-step%20guide%20to%20fixing%20unescaped%20control%20characters%20in%20JSON%20strings', width: 1200, height: 630, alt: 'Free Guide: Fix — UnblockDevs' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Invalid Control Character JSON Error | UnblockDevs', description: 'Fix "Invalid control character" JSON error. Escape raw newlines, tabs, and special chars in JSON strings. Free fixer tool included, no signup.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-invalid-control-character-json' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Invalid Control Character in JSON',
  url: 'https://unblockdevs.com/fix-invalid-control-character-json',
  description: 'Fix "Invalid control character" JSON errors instantly. Auto-detect and escape raw control characters in JSON strings. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix "Invalid Control Character" JSON Error',
  description: 'Step-by-step guide to fixing unescaped control characters in JSON strings.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the control character',
      text: 'The error names the position of the invalid character. Common culprits: raw newlines (\\n), tabs (\\t), or null bytes (\\0) inside JSON string values.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste your broken JSON into the fixer',
      text: 'Copy your JSON and paste it into the JSON Fixer above. The tool scans for raw control characters and highlights them.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Click Auto-Fix',
      text: 'The fixer replaces all raw control characters with their proper JSON escape sequences (\\n for newlines, \\t for tabs, etc.).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Use JSON.stringify for future serialization',
      text: 'Always use JSON.stringify() to generate JSON, which automatically escapes all control characters. Avoid manual string building.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does JSON.parse() throw "Invalid control character" when I paste terminal output into a string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Terminal output and log files often contain raw control characters (ASCII codes 0–31) like newlines, tabs, and null bytes. When you paste this text directly into a JSON string without escaping it, the parser throws an "Invalid control character" error. Always use JSON.stringify() to serialize values containing user or terminal input, as it escapes these characters automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the invalid control character error happen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It usually happens when JSON is generated from user input, terminal output, or a text editor that includes raw newlines, tabs, or null bytes inside strings without escaping them first.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prevent control character errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Always serialize JSON using a proper library (JSON.stringify in JavaScript, json.dumps in Python) rather than building JSON strings manually. These libraries automatically escape control characters.',
      },
    },
  ],
};

export default function FixInvalidControlCharacter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <FixInvalidControlCharacterClient />

      <ToolSEOContent>
        <SEOSection id="what" heading={'Fix "Invalid Control Character" JSON Error'}>
          <SEOProse>
            Control characters are ASCII characters with codes 0–31. Common examples include tab (<C>{'\t'}</C> or <C>\t</C>), newline (<C>{'\n'}</C> or <C>\n</C>), carriage return (<C>{'\r'}</C> or <C>\r</C>), and null (<C>\0</C> or <C>\u0000</C>). The JSON specification requires that these characters appear inside strings as their escape sequences — raw control characters are strictly forbidden.
          </SEOProse>
          <SEOProse>
            When a raw control character slips into a JSON string — usually from copy-pasted terminal output, log files, or user-supplied text — JSON parsers throw an "Invalid control character" error. The auto-fixer scans the input, finds unescaped control characters, and replaces them with the correct escape sequences.
          </SEOProse>
        </SEOSection>
        <SEOSection id="how" eyebrow="How to fix" heading="Fix This JSON Error in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your broken JSON', desc: 'Paste the JSON with the error into the JSON Fixer above.' },
            { n: '02', title: 'Error is highlighted', desc: 'The tool shows the exact line and character where the error is detected.' },
            { n: '03', title: 'Click Auto-Fix', desc: 'The auto-fixer escapes all raw control characters to their valid JSON escape sequences.' },
            { n: '04', title: 'Copy fixed JSON', desc: 'Copy the valid JSON output — or switch to the JSON Beautifier for formatting.' },
          ]} />
        </SEOSection>
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Why does JSON.parse() throw "Invalid control character" when I paste terminal output into a string?',
              a: 'Terminal output and log files often contain raw control characters like newlines, tabs, and null bytes. When pasted directly into a JSON string without escaping, the parser throws this error. Always use JSON.stringify() to serialize values containing user or terminal input — it escapes these characters automatically.',
            },
            {
              q: 'Why does the invalid control character error happen?',
              a: 'It usually occurs when JSON is generated from user input, terminal output, or a text editor that includes raw newlines, tabs, or null bytes inside strings without escaping them first.',
            },
            {
              q: 'How do I prevent control character errors in the future?',
              a: 'Always serialize JSON using a proper library — JSON.stringify in JavaScript or json.dumps in Python. These libraries automatically escape control characters. Avoid building JSON strings manually using string concatenation.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Related Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/25-broken-json-examples-fix', label: '25 Broken JSON Examples' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="fix_invalid_control_character_json" />
    </>
  );
}
