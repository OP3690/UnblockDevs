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
    'fix broken json online',
    'json fixer free',
    'fix malformed json',
    'json error fixer',
    'fix json parse error',
    'trailing comma json fix',
    'single quote json fix',
    'fix json quotes',
    'unquoted keys json fix',
    'json comment remover',
    'fix json encoding',
    'json string escape fix',
    'fix truncated json',
    'incomplete json fix',
    'missing bracket json',
    'extra comma json',
    'json validation fixer',
    'fix json online no signup',
    'json cleaner online',
    'json sanitizer',
    'json corrector',
    'fix json response api',
    'fix json from api',
    'fix invalid json string',
    'json parse error fix javascript',
    'json decode error fix python',
    'json.parse fix',
    'JSON.parse SyntaxError',
    'json error line number',
    'json error position',
    'json error highlighter',
    'fix json trailing comma javascript',
    'fix json single quotes python',
    'json5 parser',
    'jsonc parser',
    'hjson parser',
    'relaxed json',
    'lenient json parser',
    'json repair npm',
    'json-repair library',
    'fix json python',
    'fix json node js',
    'fix json online browser',
    'json fixer chrome extension',
    'json error undefined',
    'json null fix',
    'json number fix',
    'json boolean fix',
    'json auto repair online',
    'repair malformed json free',
    'json fix tool developer',
    'online json repair tool',
    'json invalid syntax fix',
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
    {
      '@type': 'Question',
      name: 'What is the most common JSON syntax error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common JSON syntax error is a trailing comma — a comma placed after the last element of an array or object. Standard JSON parsers reject this. Other very common errors include single-quoted strings instead of double-quoted, unquoted object keys, and JavaScript-style comments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can JSON have single quotes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The JSON specification requires all strings — both keys and values — to be enclosed in double quotes. Single-quoted strings are valid JavaScript but not valid JSON. This tool automatically converts single quotes to double quotes when fixing your JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix JSON that contains comments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard JSON does not support comments. If your JSON contains // or /* */ comments (common in configuration files), you must strip them before parsing. This fixer removes comments automatically. Alternatively, consider JSONC or JSON5 formats, which both allow comments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix a truncated or incomplete JSON string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Truncated JSON is missing closing brackets, braces, or quotes. This fixer attempts to recover incomplete JSON by inferring the intended structure and appending missing closing tokens. Results should always be reviewed manually, as the recovery may not match the original intent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix JSON with unquoted keys?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON requires all object keys to be quoted with double quotes. Keys without quotes are valid in JavaScript but cause a parse error in JSON. Paste your JSON here and the fixer wraps all unquoted keys in double quotes automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between JSON and JSON5?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON5 is a superset of JSON that adds ECMAScript 5 features: single-quoted strings, unquoted keys, trailing commas, comments, hexadecimal numbers, and multi-line strings. JSON5 files are typically used in configuration. Standard JSON parsers cannot parse JSON5 — you need the json5 npm package or equivalent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the exact line where a JSON error occurs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool highlights the exact line and character position of each JSON error. In Node.js, the JSON.parse() SyntaxError message includes position information. In Python, json.JSONDecodeError includes lineno and colno attributes. Knowing the exact position helps you locate the error quickly in large files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix JSON in a JavaScript fetch response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If response.json() throws a SyntaxError, first call response.text() to get the raw string, then inspect it for syntax errors. Paste the raw string into this fixer to repair it. Common causes include an API returning an error page in HTML or a server-side logging decorator wrapping the JSON body.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I auto-fix JSON in Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install the json-repair library (pip install json-repair) and call repair_json(bad_string). For simpler issues like trailing commas, a regex substitution can strip them before passing to json.loads(). For JSON5 content, use the json5 package (pip install json5).',
      },
    },
    {
      '@type': 'Question',
      name: 'What tools can repair malformed JSON automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Online tools include this JSON Fixer at unblockdevs.com/json-fixer-online. For programmatic use: json-repair (Python and npm), jsonrepair (npm), and the json5 package for JSON5 content. For command-line use, jq --sort-keys normalizes well-formed JSON while jq -e checks validity.',
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
            {
              q: 'What is the most common JSON syntax error?',
              a: 'The most common JSON syntax error is a trailing comma after the last element of an array or object. Other frequent errors include single-quoted strings, unquoted keys, and JavaScript-style comments, all of which are rejected by standard JSON parsers.',
            },
            {
              q: 'Can JSON have single quotes?',
              a: 'No. The JSON specification requires all strings to be enclosed in double quotes. Single-quoted strings are valid JavaScript but not valid JSON. This tool automatically converts single quotes to double quotes during the fix.',
            },
            {
              q: 'How do I fix JSON that contains comments?',
              a: 'Standard JSON does not support comments. This fixer strips // and /* */ comments automatically. If you frequently work with commented JSON, consider using JSONC or JSON5 formats, which natively support comments.',
            },
            {
              q: 'How do I fix a truncated or incomplete JSON string?',
              a: 'Paste the incomplete JSON here. The fixer attempts to close any open strings, arrays, or objects to produce parseable output. Always review the result manually, as the recovery may not precisely match the original intent.',
            },
            {
              q: 'How do I fix JSON with unquoted keys?',
              a: 'JSON requires all object keys to be double-quoted. Paste your JSON here and the fixer wraps all unquoted keys in double quotes automatically — useful for JavaScript object literals that need to be converted to strict JSON.',
            },
            {
              q: 'What is the difference between JSON and JSON5?',
              a: 'JSON5 extends JSON with ECMAScript 5 features: single-quoted strings, unquoted keys, trailing commas, comments, and multi-line strings. It is popular for configuration files. Standard JSON parsers cannot read JSON5 — you need the json5 npm package or the json5 Python library.',
            },
            {
              q: 'How do I find the exact line where a JSON error occurs?',
              a: 'This tool highlights the exact line and character position of each error. In Node.js, JSON.parse() SyntaxError messages include position info. In Python, json.JSONDecodeError includes lineno and colno attributes.',
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
