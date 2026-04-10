import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonFixerOnlineClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-fixer-online';

export const metadata: Metadata = {
  title: 'JSON Fixer Online — Fix Invalid JSON, Repair Syntax Errors Instantly | UnblockDevs',
  description: 'Fix invalid JSON instantly. Repair trailing commas, single quotes, unquoted keys, unexpected tokens, and more. JSON auto fixer — 100% client-side, nothing uploaded.',
  keywords: [
    'json fixer online',
    'fix invalid json',
    'json repair tool',
    'fix json syntax error',
    'json auto fixer',
    'remove trailing comma json',
    'advanced json fixer',
    'repair json',
    'json syntax fixer',
    'fix json from api error',
    'extract json from logs',
    'fix ai generated json',
    'broken json fixer',
  ],
  openGraph: {
    title: 'JSON Fixer Online — Fix Invalid JSON Instantly | UnblockDevs',
    description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Fixer Online — Fix Invalid JSON | UnblockDevs',
    description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Fixer Online',
  url: canonicalUrl,
  description: 'Fix invalid JSON instantly. Repair trailing commas, single quotes, unquoted keys, and unexpected tokens. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Auto-fix trailing commas in JSON',
    'Fix single quotes to double quotes',
    'Repair unquoted object keys',
    'Detect and fix unexpected tokens',
    'Recover truncated or partial JSON',
    'Extract JSON from log lines or mixed text',
    '100% client-side — nothing uploaded',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2800',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I fix invalid JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your broken JSON into this tool and click Fix. The fixer automatically detects and repairs common errors such as trailing commas, single quotes, unquoted keys, and missing brackets — then returns valid, parseable JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a JSON syntax error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON syntax error occurs when the JSON text does not follow the JSON specification. Common causes include trailing commas after the last item in an array or object, using single quotes instead of double quotes, leaving keys unquoted, or unclosed brackets and braces.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix a trailing comma in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON does not allow trailing commas — a comma after the last element of an array or object causes a parse error. Paste your JSON into this fixer and it will automatically detect and remove all trailing commas to produce valid JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "Unexpected token" mean in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An "Unexpected token" error means the JSON parser found a character it did not expect at that position. This often happens with trailing commas, single-quoted strings, JavaScript comments, or undefined/NaN values that are not valid JSON. Paste your JSON here to auto-fix most of these cases.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix Invalid JSON Online',
  description: 'Step-by-step guide to repairing broken or invalid JSON automatically.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your broken JSON', text: 'Copy your invalid or broken JSON and paste it into the input box. The tool automatically detects errors as you type.' },
    { '@type': 'HowToStep', position: 2, name: 'Click Auto-Fix', text: 'Click the Auto-Fix button. The fixer repairs trailing commas, single quotes, unquoted keys, missing brackets, and more.' },
    { '@type': 'HowToStep', position: 3, name: 'Review the fixed JSON', text: 'The repaired JSON appears in the output. A list of applied fixes is shown so you know exactly what was changed.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the valid JSON', text: 'Click Copy to copy the valid JSON to your clipboard and use it in your application or API.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Fixer Online', item: canonicalUrl },
  ],
};

export default function JsonFixerOnline() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonFixerOnlineClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JSON Fixer?">
          <SEOProse>
            A <strong>JSON fixer</strong> is a tool that automatically detects and repairs common JSON
            syntax errors so you do not have to hunt through hundreds of lines by hand. JSON is strict —
            even a single misplaced comma, a single-quoted string, or an unquoted key will prevent
            <code>JSON.parse()</code> from working and crash the application reading the data.
          </SEOProse>
          <SEOProse>
            Broken JSON shows up everywhere in real development: AI models produce JSON with trailing
            commas or comments, APIs sometimes return malformed responses, config files get edited by
            hand and pick up errors, and copy-pasting JavaScript object literals brings in single quotes
            and unquoted keys. This tool handles all of those cases — paste broken JSON and get valid,
            parseable output in one click.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Fix Broken JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your broken JSON', desc: 'Type or paste any invalid JSON, including minified payloads, API responses, AI output, or JavaScript object literals.' },
            { n: '02', title: 'See errors highlighted', desc: 'The tool immediately flags every syntax error with the exact line and character position, so you know what is wrong.' },
            { n: '03', title: 'Auto-fix applies', desc: 'Click Fix to automatically repair trailing commas, single quotes, unquoted keys, missing brackets, and other common errors.' },
            { n: '04', title: 'Copy fixed JSON', desc: 'Copy the repaired JSON to your clipboard or download it — ready to paste back into your code, config, or API request.' },
          ]} />
        </SEOSection>

        {/* Common errors table */}
        <SEOSection id="errors" heading="Common JSON Errors and How to Fix Them">
          <SEOProse>
            The table below covers the most frequent JSON syntax errors developers encounter and how the
            fixer handles each one.
          </SEOProse>
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Error</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Example (broken)</th>
                  <th className="pb-3 font-semibold text-zinc-700">Fix applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['Trailing comma', '{"a":1,"b":2,}', 'Remove the comma before the closing brace or bracket'],
                  ['Single quotes', "{'key':'value'}", 'Replace single quotes with double quotes'],
                  ['Unquoted keys', '{key: "value"}', 'Wrap the key in double quotes'],
                  ['Missing quotes on string value', '{"name": Alice}', 'Wrap the value in double quotes'],
                  ['Unexpected token', '{"x": undefined}', 'Replace undefined/NaN/Infinity with null or a valid value'],
                  ['Unterminated string', '{"msg": "hello', 'Close the string and any open brackets'],
                ].map(([err, ex, fix]) => (
                  <tr key={err}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{err}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-zinc-600 break-all">{ex}</td>
                    <td className="py-3 text-zinc-500">{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When You Need a JSON Fixer">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug API Responses', desc: 'Fix malformed JSON returned by third-party APIs that breaks your application at runtime.' },
            { icon: '⚙️', title: 'Fix Config Files', desc: 'Repair hand-edited JSON config files where trailing commas or missing quotes slipped in.' },
            { icon: '📦', title: 'Repair Exported Data', desc: 'Clean up JSON exports from databases, spreadsheets, or tools that produce non-standard output.' },
            { icon: '🔧', title: 'Fix JS Object Literals', desc: 'Convert JavaScript object literals — with single quotes and unquoted keys — into valid JSON.' },
            { icon: '🕸️', title: 'Clean Scraped JSON', desc: 'Repair JSON extracted from web pages or logs that contains extra text, comments, or broken nesting.' },
            { icon: '📋', title: 'Fix Copy-Paste Errors', desc: 'Recover JSON that was copy-pasted from documentation, Slack, or emails and lost its formatting.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I fix invalid JSON?',
              a: 'Paste your broken JSON into this tool and click Fix. The fixer automatically detects and repairs trailing commas, single quotes, unquoted keys, and missing brackets — then returns valid, parseable JSON.',
            },
            {
              q: 'What is a JSON syntax error?',
              a: 'A JSON syntax error occurs when the text does not follow the JSON specification. Common causes include trailing commas after the last array or object item, single quotes instead of double quotes, unquoted keys, and unclosed brackets or braces.',
            },
            {
              q: 'How do I fix a trailing comma in JSON?',
              a: 'JSON does not allow trailing commas. Paste your JSON here and the fixer automatically removes all trailing commas to produce valid output.',
            },
            {
              q: 'What does "Unexpected token" mean in JSON?',
              a: 'It means the parser found a character it did not expect. This often happens with trailing commas, single-quoted strings, JavaScript comments, or undefined values. Paste your JSON here to auto-fix most of these cases.',
            },
            {
              q: 'Is my JSON sent to a server?',
              a: 'No. All fixing runs entirely in your browser. Your JSON is never uploaded or stored anywhere — safe for API keys, tokens, and production payloads.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print your fixed JSON with syntax highlighting', icon: '✨' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON objects side-by-side to spot differences', icon: '🔀' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Generate a JSON Schema from any valid JSON object', icon: '📐' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Hash JSON payloads for integrity checks or caching keys', icon: '🔑' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/25-broken-json-examples-fix', label: '25 Broken JSON Examples' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/json-stringify-vs-json-parse-difference', label: 'stringify vs parse' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_fixer" />
    </>
  );
}
