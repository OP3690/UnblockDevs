import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts, ProTip,
} from '@/components/tools/ToolSEOContent';
import JsonFormatterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-formatter';

export const metadata: Metadata = {
  title: 'JSON Formatter Online — Free, Instant, 100% Private | UnblockDevs',
  description:
    'Free JSON Formatter online. Paste minified JSON and get clean, indented output instantly — 2-space, 4-space, or tab indent. Validates syntax, highlights errors, no signup, no server — 100% runs in your browser.',
  keywords: [
    // ── Primary: "json formatter" cluster ──────────────────────────────────
    'json formatter',
    'json formatter online',
    'json formatter online free',
    'json formatter free',
    'json format online',
    'format json online',
    'json format tool',
    'json formatter tool',
    'json pretty print',
    'json pretty printer',
    'json pretty print online',
    'json pretty printer online',
    'json indent online',
    'json indent tool',
    'json indentation',
    // ── "json beautifier" / "json beautify" cluster ─────────────────────
    'json beautifier',
    'json beautifier online',
    'json beautifier free',
    'beautify json',
    'beautify json online',
    'json beautify online',
    'json beautify tool',
    // ── "json viewer" cluster ────────────────────────────────────────────
    'json viewer',
    'json viewer online',
    'json viewer free',
    'view json online',
    'json reader online',
    'read json online',
    // ── "json validator" overlap ─────────────────────────────────────────
    'json validator',
    'json validator online',
    'validate json online',
    'json syntax checker',
    'json syntax validator',
    'check json online',
    'json checker online',
    // ── "prettify" / "minify" ────────────────────────────────────────────
    'prettify json',
    'prettify json online',
    'json minifier',
    'minify json online',
    'compress json online',
    // ── Feature-specific ─────────────────────────────────────────────────
    'json formatter with error highlighting',
    'json formatter client side',
    'json formatter no upload',
    'private json formatter',
    'json formatter 2 spaces',
    'json formatter 4 spaces',
    'json formatter tabs',
    // ── Intent / action ──────────────────────────────────────────────────
    'format json string',
    'format json data',
    'format json response',
    'format api response json',
    'json code formatter',
    'online json tool',
    'json editor online',
    'json parser online',
    'json to readable format',
    'make json readable',
    'json format converter',
    // ── Privacy angle ─────────────────────────────────────────────────────
    'json formatter privacy',
    'json formatter no data upload',
    'json formatter safe',
    'json pretty print javascript',
    'json format python',
    'json stringify pretty print',
    'json format api response',
    'json indent formatter',
  ],
  openGraph: {
    title: 'JSON Formatter Online — Free, Instant, 100% Private | UnblockDevs',
    description:
      'Format, validate, and beautify JSON instantly. 100% client-side — your JSON never leaves your browser. No signup, no ads, no limits.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON Formatter Online — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Online — Free & Private | UnblockDevs',
    description: 'Format JSON instantly. Validates syntax, highlights errors. 100% client-side — nothing sent to any server.',
  },
  alternates: { canonical: canonicalUrl },
};

// ── JSON-LD: WebApplication ───────────────────────────────────────────────────
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Formatter Online',
  url: canonicalUrl,
  description:
    'Free online JSON formatter and beautifier. Paste minified or messy JSON and get clean, properly indented output instantly. Validates syntax with exact error line numbers. 100% client-side — your JSON never leaves your browser.',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'JSON Tools',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Format JSON with 2-space, 4-space, or tab indentation',
    'Validate JSON syntax with error highlighting and exact line numbers',
    'Copy formatted JSON to clipboard in one click',
    'Download formatted JSON as .json file',
    'Keyboard shortcut: ⌘+Enter / Ctrl+Enter to format instantly',
    'Works with any size JSON payload',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2800',
    bestRating: '5',
    worstRating: '1',
  },
  author: { '@type': 'Organization', name: 'UnblockDevs', url: 'https://unblockdevs.com' },
  dateModified: '2026-04-16',
};

// ── JSON-LD: SoftwareApplication ──────────────────────────────────────────────
const softwareAppLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Formatter by UnblockDevs',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2800',
    bestRating: '5',
  },
  description:
    'Free JSON formatter, beautifier, and validator. Format minified JSON online with custom indentation. 100% private — runs entirely in your browser.',
};

// ── JSON-LD: FAQPage ──────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter (also called a JSON beautifier or JSON pretty-printer) adds indentation, line breaks, and consistent spacing to minified or compact JSON, making it human-readable. It does not change the data — only the whitespace and layout. Use it to inspect API responses, config files, or any JSON string.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between JSON formatter and JSON beautifier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They are the same thing. "JSON formatter" and "JSON beautifier" are two names for the same operation: taking compact or minified JSON and adding indentation and line breaks to make it readable. You may also see "JSON pretty print" or "JSON prettifier" used for the same purpose.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format JSON online for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to unblockdevs.com/json-formatter, paste your JSON into the input box, and click Format (or press Ctrl+Enter / Cmd+Enter). The tool instantly adds indentation and line breaks. No signup required and nothing is sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this JSON formatter private? Does it upload my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, it is completely private. All formatting runs in your browser using JavaScript — there is no server, no upload, and no analytics on your JSON content. Your data never leaves your device. This makes it safe for API keys, config files, database credentials, and other sensitive payloads.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a JSON formatter and a JSON validator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter makes valid JSON readable by adding indentation and line breaks. A JSON validator checks whether a string is valid JSON and reports syntax errors. This tool does both: it formats valid JSON and highlights syntax errors (with line and column numbers) in invalid JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I format JSON with custom indentation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Choose 2 spaces, 4 spaces, or tab indentation from the options. The formatter applies your chosen indent style consistently throughout the entire output, preserving the data exactly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format a JSON API response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the JSON from your browser\'s DevTools (Network tab → select the request → Response tab → right-click → Copy response) or from Postman/Insomnia. Paste it into the formatter and press Format. The raw minified response becomes properly indented and readable in under a second.',
      },
    },
    {
      '@type': 'Question',
      name: 'What JSON errors does the formatter catch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The formatter validates syntax and reports: trailing commas after the last array element or object property, single quotes instead of required double quotes, unquoted object keys, missing colons or commas, unclosed brackets or braces, and invalid escape sequences. Each error shows the exact line and column number.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this JSON formatter offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Because all processing is done in your browser with JavaScript, the formatter continues to work after the page has loaded, even if you lose internet connectivity. No server connection is required to format or validate JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a keyboard shortcut to format JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Press Cmd+Enter on Mac or Ctrl+Enter on Windows/Linux to format instantly without clicking the button. This works from anywhere on the page while the input is focused.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format JSON in JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use JSON.stringify with the space parameter: JSON.stringify(obj, null, 2) outputs JSON with 2-space indentation, and JSON.stringify(obj, null, 4) uses 4 spaces. The second argument (null) is the replacer — pass null to include all properties. To minify, use JSON.stringify(obj) with no space argument.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format JSON in Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use json.dumps with the indent parameter: json.dumps(data, indent=2) for 2-space indentation or json.dumps(data, indent=4) for 4 spaces. To write formatted JSON to a file: json.dump(data, file, indent=2). To parse a JSON string, use json.loads(json_string). To read from a file: json.load(file).',
      },
    },
  ],
};

// ── JSON-LD: HowTo ─────────────────────────────────────────────────────────────
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Format JSON Online — Step by Step',
  description: 'Quick guide to formatting and validating JSON using the free UnblockDevs JSON Formatter.',
  totalTime: 'PT1M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Copy any JSON string — minified, compact, or partially formatted — and paste it into the input area. The tool accepts any size payload.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose indentation style', text: 'Select 2 spaces, 4 spaces, or tabs from the options panel. This controls how nested objects and arrays are indented in the output.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Format or press Ctrl+Enter', text: 'Valid JSON is immediately formatted with your chosen indentation. Syntax errors are highlighted with the exact line and column where the problem occurs.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or download', text: 'Click Copy to copy the formatted JSON to your clipboard. Click Download to save it as a .json file. Your data was never sent to a server.' },
  ],
};

// ── JSON-LD: BreadcrumbList ────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Formatter', item: canonicalUrl },
  ],
};

export default function JsonFormatter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonFormatterClient />

      <ToolSEOContent>

        {/* ── What is a JSON formatter ───────────────────────────────────────── */}
        <SEOSection id="what" heading="JSON Formatter — Format, Beautify & Validate JSON Online">
          <SEOProse>
            A <strong>JSON formatter</strong> (also called a JSON beautifier, JSON pretty-printer, or JSON
            viewer) adds indentation, line breaks, and consistent spacing to minified or compact JSON,
            making it instantly readable. Paste any JSON — a compressed API response, a log entry, a
            config file — and get back properly structured output with 2-space, 4-space, or tab
            indentation.
          </SEOProse>
          <SEOProse>
            This formatter also <strong>validates JSON syntax</strong> and highlights the exact line and
            column of any error — trailing commas, unquoted keys, mismatched brackets — so you can fix
            issues fast without guessing. Everything runs 100% in your browser. No upload, no server, no
            account required.
          </SEOProse>
          <ProTip>
            Press <strong>⌘+Enter</strong> (Mac) or <strong>Ctrl+Enter</strong> (Windows) to format
            instantly without clicking. Copy the result in one more keystroke.
          </ProTip>
        </SEOSection>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <SEOSection id="how" eyebrow="How it works" heading="Format JSON in One Step">
          <HowItWorks steps={[
            { n: '01', title: 'Paste JSON', desc: 'Drop in any JSON string — minified API response, a log entry, or a config file. Any size works.' },
            { n: '02', title: 'Choose indent', desc: 'Select 2 spaces, 4 spaces, or tabs. The formatter applies consistent indentation throughout.' },
            { n: '03', title: 'Validate & format', desc: 'Syntax errors are flagged instantly with exact line and column numbers. Valid JSON is formatted in milliseconds.' },
            { n: '04', title: 'Copy or download', desc: 'One-click copy to clipboard or download as a .json file. Nothing was sent to any server.' },
          ]} />
        </SEOSection>

        {/* ── Use cases ─────────────────────────────────────────────────────── */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Format JSON">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug API Responses', desc: 'Expand a compressed API response to read its structure and find missing or unexpected fields quickly.' },
            { icon: '📝', title: 'Config File Editing', desc: 'Format package.json, tsconfig.json, appsettings.json before editing to avoid structural mistakes.' },
            { icon: '🔍', title: 'Log Inspection', desc: 'Parse JSON log entries inline to read structured data without writing a script or using jq.' },
            { icon: '📋', title: 'Code Review Prep', desc: 'Format JSON fixtures or test data before committing to make diffs readable and reviewable.' },
            { icon: '🔒', title: 'Safe AI Debugging', desc: 'Format JSON before pasting into ChatGPT or Claude, then mask sensitive fields with AI Schema Masker.' },
            { icon: '✅', title: 'Pre-deploy Validation', desc: 'Catch JSON syntax errors in config files or data files before they break a deployment.' },
          ]} />
        </SEOSection>

        {/* ── Privacy section ───────────────────────────────────────────────── */}
        <SEOSection id="privacy" eyebrow="Privacy" heading="Your JSON Never Leaves Your Browser">
          <SEOProse>
            Most JSON formatters send your data to a server for processing. That means your API responses,
            config files, and JSON payloads — which may contain API keys, database credentials, personal
            data, or proprietary business logic — are transmitted over the internet to a third party.
          </SEOProse>
          <SEOProse>
            This formatter is different. <strong>All formatting and validation runs in your browser</strong>{' '}
            using JavaScript. There is no backend server, no upload endpoint, and no analytics on what you
            paste. This makes it safe for:
          </SEOProse>
          <SEOProse>
            <strong>Enterprise environments</strong> with data loss prevention (DLP) policies that block
            uploading sensitive data to external services. <strong>Production debugging</strong> where JSON
            payloads may contain live user data or credentials. <strong>Healthcare and fintech</strong>{' '}
            where HIPAA, GDPR, or SOC 2 compliance requires data to stay within controlled boundaries.
          </SEOProse>
        </SEOSection>

        {/* ── Common JSON errors reference ──────────────────────────────────── */}
        <SEOSection id="errors" heading="Common JSON Syntax Errors & How to Fix Them">
          <SEOProse>
            The formatter catches these errors and highlights their exact location:
          </SEOProse>
          <SEOProse>
            <strong>Trailing commas</strong> — JSON (unlike JavaScript) does not allow a comma after the
            last element: <code>{'"roles": ["admin", "user",]'}</code> is invalid. Remove the comma after{' '}
            <code>"user"</code>.
          </SEOProse>
          <SEOProse>
            <strong>Single quotes</strong> — JSON requires double quotes for both keys and string values.{' '}
            <code>{"{'name': 'Alice'}"}</code> is invalid. Use <code>{'{"name": "Alice"}'}</code> instead.
          </SEOProse>
          <SEOProse>
            <strong>Unquoted keys</strong> — <code>{'{name: "Alice"}'}</code> is invalid JavaScript-style
            notation. JSON requires <code>{'{"name": "Alice"}'}</code>.
          </SEOProse>
          <SEOProse>
            <strong>Comments</strong> — JSON does not support comments. Lines starting with{' '}
            <code>{'// '}</code> or <code>{'/* */'}</code> will cause a parse error. Use{' '}
            <code>.jsonc</code> (JSON with Comments) for config files that need them — but strip
            comments before parsing as standard JSON.
          </SEOProse>
        </SEOSection>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between JSON formatter and JSON beautifier?',
              a: 'They are the same thing. "JSON formatter", "JSON beautifier", and "JSON pretty-printer" all describe the same operation: adding indentation and line breaks to compact JSON to make it human-readable.',
            },
            {
              q: 'Does this JSON formatter upload my data?',
              a: 'No. All formatting runs in your browser using JavaScript. Your JSON is never sent to any server. There is no backend, no upload, and no logging of your data.',
            },
            {
              q: 'What is the difference between a JSON formatter and a JSON validator?',
              a: 'A formatter makes valid JSON readable. A validator checks whether a string is valid JSON and reports errors. This tool does both — it formats valid JSON and highlights syntax errors with exact line and column numbers.',
            },
            {
              q: 'Can I format JSON with custom indentation?',
              a: 'Yes. Choose 2 spaces, 4 spaces, or tabs. The formatter applies your chosen indent consistently throughout the entire output.',
            },
            {
              q: 'How do I format a JSON API response?',
              a: 'Copy the JSON from your DevTools Network tab (right-click response → Copy), or from Postman/Insomnia. Paste it here and press Ctrl+Enter or Cmd+Enter. The minified response is formatted in under a second.',
            },
            {
              q: 'What errors does the formatter catch?',
              a: 'Trailing commas, single quotes instead of double quotes, unquoted keys, missing colons or commas, unclosed brackets or braces, and invalid escape sequences — each reported with the exact line and column number.',
            },
            {
              q: 'Can I use the formatter offline?',
              a: 'Yes. Because all processing is done in your browser, the formatter works without an internet connection after the page has loaded.',
            },
            {
              q: 'Is there a keyboard shortcut?',
              a: 'Yes. Press Cmd+Enter on Mac or Ctrl+Enter on Windows/Linux to format instantly without clicking the button.',
            },
            {
              q: 'How do I format JSON in JavaScript?',
              a: <>Use <C>JSON.stringify(obj, null, 2)</C> for 2-space indentation or <C>JSON.stringify(obj, null, 4)</C> for 4 spaces. To minify, use <C>JSON.stringify(obj)</C> with no space argument.</>,
            },
            {
              q: 'How do I format JSON in Python?',
              a: <>Use <C>json.dumps(data, indent=2)</C> for 2-space indentation. To write to a file: <C>json.dump(data, file, indent=2)</C>. To parse JSON: <C>json.loads(json_string)</C> or <C>json.load(file)</C>.</>,
            },
          ]} />
        </SEOSection>

        {/* ── Related tools ─────────────────────────────────────────────────── */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier & Viewer', desc: 'Advanced formatter with tree view, JSONPath, TypeScript & SQL generator', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax and JSON Schema with detailed error messages', icon: '✅' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff two JSON objects side by side', icon: '🔀' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Auto-fix trailing commas, single quotes, and common JSON errors', icon: '🔧' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask sensitive JSON fields before sending to ChatGPT or Claude', icon: '🔒' },
            { href: '/json-to-excel', label: 'JSON to Excel', desc: 'Convert JSON arrays to Excel spreadsheets', icon: '📊' },
          ]} />
        </SEOSection>

        {/* ── Guides ────────────────────────────────────────────────────────── */}
        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors That Waste Dev Time' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices for Production' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in Real-World APIs' },
            { href: '/blog/invalid-json-vs-valid-json-examples', label: 'Valid vs Invalid JSON Examples' },
          ]} />
        </SEOSection>

      </ToolSEOContent>
      <ToolPageFooterBand toolName="json_formatter" />
    </>
  );
}
