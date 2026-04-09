import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import FixInvalidControlCharacterClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Invalid Control Character" JSON Error | UnblockDevs',
  description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix invalid control character json',
    'invalid control character json error',
    'json control character error',
    'fix json newline error',
    'json escape characters',
    'invalid control character fix'
  ],
  openGraph: {
    title: 'Fix "Invalid Control Character" JSON Error | UnblockDevs',
    description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-invalid-control-character-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Invalid Control Character JSON Error | UnblockDevs', description: 'Fix "Invalid control character" JSON error instantly. Free guide with examples and JSON fixer tool.' },
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
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '630',
    bestRating: '5',
  },
};

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
      name: 'What are control characters in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Control characters are ASCII characters with codes 0–31, including tab (\\t), newline (\\n), carriage return (\\r), and null (\\0). JSON requires these to be represented as escape sequences inside strings — raw control characters are not allowed.',
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
              q: 'What are control characters in JSON?',
              a: 'Control characters are ASCII characters with codes 0–31, including tab (\\t), newline (\\n), carriage return (\\r), and null (\\0). JSON requires these to be represented as escape sequences — raw control characters are not allowed inside JSON strings.',
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
      </ToolSEOContent>

      <ToolPageFooterBand toolName="fix_invalid_control_character_json" />
    </>
  );
}
