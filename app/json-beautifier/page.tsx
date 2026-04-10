import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonBeautifierClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-beautifier';

export const metadata: Metadata = {
  title: 'JSON Beautifier & Formatter — Format, Validate, Fix, Tree View, TypeScript & SQL Generator Online Free | UnblockDevs',
  description:
    'Format and beautify JSON instantly. Validate syntax, auto-fix errors, explore with tree view and JSONPath, generate TypeScript interfaces or SQL from JSON. 100% browser-based, nothing sent to servers.',
  keywords: [
    'json beautifier online', 'json formatter online free', 'format json online',
    'json validator online', 'json fixer online', 'json tree view',
    'json to typescript generator', 'json to sql generator', 'jsonpath online',
    'prettify json', 'minify json online', 'json parser online',
    'fix invalid json', 'json syntax error fix', 'json workbench',
  ],
  openGraph: {
    title: 'JSON Beautifier & Formatter — Format, Validate, Fix, TypeScript & SQL Generator | UnblockDevs',
    description: 'Format, validate, fix JSON. Tree view, JSONPath, TypeScript & SQL generator. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JSON Beautifier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Beautifier & Formatter — Format, Validate, Fix | UnblockDevs',
    description: 'Format, validate, fix, tree view, TypeScript/SQL gen. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Beautifier & Formatter',
  url: canonicalUrl,
  description: 'Format, validate, fix JSON. Tree view, JSONPath, TypeScript & SQL generator. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Format and beautify JSON with 2 or 4-space indent',
    'Minify JSON for production',
    'Validate JSON syntax with inline error highlighting',
    'Auto-fix common JSON errors (trailing commas, single quotes)',
    'Interactive tree view explorer',
    'JSONPath query support',
    'Generate TypeScript interfaces from JSON',
    'Generate SQL INSERT statements from JSON arrays',
    '100% client-side — no data leaves your device',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '3100',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the difference between JSON beautifier and JSON formatter?', acceptedAnswer: { '@type': 'Answer', text: 'They are the same thing. A JSON beautifier adds indentation and line breaks to make JSON human-readable. A formatter does the same. Both terms refer to pretty-printing minified JSON.' } },
    { '@type': 'Question', name: 'How do I fix a JSON parse error?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON into this tool. It highlights the exact line and character where the error occurs. The auto-fix feature resolves common issues like trailing commas, single quotes instead of double quotes, and unquoted keys.' } },
    { '@type': 'Question', name: 'Is it safe to paste sensitive JSON here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Everything runs in your browser. Your JSON is never uploaded or sent to any server.' } },
    { '@type': 'Question', name: 'Can I generate TypeScript from JSON?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Paste any JSON object and switch to the TypeScript tab. The tool infers types from the values and generates a typed interface tree — useful for typing API responses.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Beautify and Format JSON Online',
  description: 'Step-by-step guide to formatting, validating, and fixing JSON using the JSON Beautifier.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Paste or type your raw or minified JSON into the input editor on the left.' },
    { '@type': 'HowToStep', position: 2, name: 'Click Beautify JSON or press ⌘+Enter', text: 'The tool instantly formats your JSON with proper indentation and line breaks, highlighting any syntax errors.' },
    { '@type': 'HowToStep', position: 3, name: 'Fix errors if needed', text: 'If your JSON has errors, click Auto-Fix to repair trailing commas, single quotes, and other common issues automatically.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or explore the output', text: 'Copy the formatted JSON, or switch to Tree View to explore the structure interactively with JSONPath support.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Beautifier', item: canonicalUrl },
  ],
};

export default function JsonBeautifierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonBeautifierClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JSON Beautifier?">
          <SEOProse>
            A <strong>JSON beautifier</strong> (also called a JSON formatter or JSON pretty-printer) adds
            indentation and line breaks to minified JSON, turning a compressed single-line string into
            readable, structured output. APIs and config files often deliver JSON without whitespace to
            save bytes — beautifying it is the first step in debugging any JSON payload.
          </SEOProse>
          <div className="my-4 rounded-lg bg-zinc-100 px-4 py-3 font-mono text-[12.5px] text-zinc-700 overflow-x-auto">
            <span className="text-zinc-400">{/* before */}</span>
            {'{"name":"Alice","roles":["admin","editor"],"active":true}'}<br />
            <span className="text-zinc-400 text-[11px] mt-2 block">{/* after */}</span>
            {'{'}<br />
            {'  "name": "Alice",'}<br />
            {'  "roles": ["admin", "editor"],'}<br />
            {'  "active": true'}<br />
            {'}'}
          </div>
          <SEOProse>
            This tool goes beyond basic formatting: it validates syntax, highlights errors inline,
            auto-fixes common mistakes, explores structure via tree view and JSONPath, and generates
            TypeScript interfaces or SQL from JSON — all without leaving your browser.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Format, Fix, and Explore JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste or upload JSON', desc: 'Type, paste, or drop a .json file. The tool accepts minified, pretty-printed, or partially broken JSON.' },
            { n: '02', title: 'Beautify or minify', desc: 'Click Format for 2-space indent, 4-space, or compact. Errors are highlighted inline with the exact line and character.' },
            { n: '03', title: 'Explore or transform', desc: 'Switch to Tree view, run a JSONPath query, generate TypeScript interfaces, or produce SQL INSERT statements.' },
            { n: '04', title: 'Copy or download', desc: 'Copy to clipboard or download the formatted result as a .json file.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a JSON Formatter">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug API Responses', desc: 'Paste a minified API response to instantly see its structure and find missing or unexpected fields.' },
            { icon: '🔧', title: 'Fix Invalid JSON', desc: 'Auto-fix trailing commas, single quotes, unquoted keys, and other common JSON syntax errors.' },
            { icon: '🌲', title: 'Explore Nested Data', desc: 'Use tree view or JSONPath (e.g. $.users[*].email) to navigate and query deeply nested structures.' },
            { icon: '📐', title: 'Generate TypeScript', desc: 'Instantly generate TypeScript interface definitions from any JSON object to type API responses.' },
            { icon: '🗄️', title: 'Generate SQL Inserts', desc: 'Convert a JSON array of objects into SQL INSERT statements for seeding databases.' },
            { icon: '🔒', title: 'Audit Config Files', desc: 'Validate and format .json config files before committing — all in-browser, nothing uploaded.' },
          ]} />
        </SEOSection>

        {/* JSON syntax guide */}
        <SEOSection id="syntax" heading="JSON Syntax Quick Reference">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Type</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Example</th>
                  <th className="pb-3 font-semibold text-zinc-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['String', '"hello world"', 'Double quotes only — single quotes are invalid JSON'],
                  ['Number', '42 / 3.14 / -1e10', 'No leading zeros, NaN or Infinity not allowed'],
                  ['Boolean', 'true / false', 'Lowercase only — True or False are invalid'],
                  ['Null', 'null', 'Lowercase only'],
                  ['Array', '["a", 1, true]', 'No trailing comma after last element'],
                  ['Object', '{"key": "value"}', 'Keys must be double-quoted strings'],
                ].map(([type, ex, note]) => (
                  <tr key={type}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{type}</td>
                    <td className="py-3 pr-4 font-mono text-[12.5px] text-zinc-600">{ex}</td>
                    <td className="py-3 text-zinc-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between JSON beautifier and JSON formatter?',
              a: 'They are the same thing. A JSON beautifier adds indentation and line breaks to make minified JSON human-readable. A formatter does the same. Both terms describe pretty-printing compact JSON output.',
            },
            {
              q: 'How do I fix a JSON parse error?',
              a: 'Paste your JSON into the tool. It highlights the exact line and character where the error occurs. The auto-fix feature resolves common issues: trailing commas, single quotes instead of double quotes, unquoted keys, and missing brackets.',
            },
            {
              q: 'Can I generate TypeScript interfaces from JSON?',
              a: 'Yes. Paste any JSON object and switch to the TypeScript tab. The tool infers types from the values — string, number, boolean, arrays, nested objects — and generates a typed interface tree, useful for typing REST API responses.',
            },
            {
              q: 'How do I convert a JSON array to SQL?',
              a: 'Paste a JSON array of objects and switch to the SQL tab. The tool detects the keys as column names and generates SQL INSERT statements, which you can copy directly into a migration or seed script.',
            },
            {
              q: 'What is JSONPath?',
              a: 'JSONPath is a query language for JSON, similar to XPath for XML. Use it to extract specific values — for example $.users[0].email extracts the email of the first user. This tool runs JSONPath queries live as you type.',
            },
            {
              q: 'Is it safe to paste sensitive JSON here?',
              a: 'Yes. All formatting runs entirely in your browser. Your JSON is never uploaded or sent to any server. Nothing leaves your device.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Auto-repair invalid JSON — trailing commas, single quotes, broken brackets', icon: '🔧' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax and get exact error line numbers', icon: '✅' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff two JSON objects and highlight changes', icon: '🔀' },
            { href: '/jwt-decoder', label: 'JWT Decoder', desc: 'Decode and inspect JWT tokens containing JSON claims', icon: '🪙' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask sensitive JSON fields before sending to AI', icon: '🔒' },
            { href: '/json-to-excel', label: 'JSON to Excel', desc: 'Convert JSON arrays to Excel spreadsheets instantly', icon: '📊' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/25-broken-json-examples-fix', label: '25 Broken JSON Examples' },
            { href: '/blog/json-stringify-vs-json-parse-difference', label: 'stringify vs parse' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_beautifier" />
    </>
  );
}
