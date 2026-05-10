import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
  RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonErrorExplainerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-error-explainer';

export const metadata: Metadata = {
  title: 'AI JSON Error Explainer — Understand & Fix Every JSON Error Instantly | UnblockDevs',
  description:
    'Paste broken JSON and instantly get clear explanations of every error — trailing commas, Python values, invalid escapes, duplicate keys — with one-click auto-fix, code examples, and smart source detection. 100% client-side.',
  keywords: [
    'json error explainer',
    'json error debugger',
    'explain json error',
    'json syntax error explained',
    'json parse error fix',
    'json error checker',
    'what is json error',
    'json trailing comma error',
    'json single quote error',
    'json unquoted key fix',
    'json undefined value fix',
    'json nan value fix',
    'json infinity value fix',
    'python dict to json error',
    'json true false none fix',
    'json comment error',
    'json duplicate key warning',
    'json unclosed bracket error',
    'json mismatched bracket',
    'json invalid escape sequence',
    'json control character error',
    'json leading zeros error',
    'json bom error',
    'fix json online',
    'json debugger online',
    'json error line number',
    'json error position',
    'json error message explained',
    'unexpected token json',
    'json parse error javascript',
    'json decode error python',
    'json syntax error online checker',
    'free json error explainer',
    'json error auto fix',
    'json error fixer online',
    'json ai error explainer',
    'ai json output fix',
    'json error education',
  ],
  openGraph: {
    title: 'AI JSON Error Explainer — Understand & Fix Every JSON Error | UnblockDevs',
    description:
      'Paste broken JSON → every error explained with deep context, JSON spec references, and one-click auto-fix. Detects trailing commas, Python values, invalid escapes, duplicate keys & more.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI JSON Error Explainer — Understand & Fix JSON Errors | UnblockDevs',
    description:
      'Paste broken JSON → every error explained with fix examples and code snippets. 100% client-side, free.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI JSON Error Explainer',
  url: canonicalUrl,
  description:
    'Detects every JSON error simultaneously with deep explanations, JSON spec references, code fix examples, source detection, and one-click auto-fix. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Multi-error detection — all errors at once, not just the first',
    'Deep explanations with JSON spec references',
    'Smart source detection: AI output, Python dict, JS object, config file',
    'One-click auto-fix for trailing commas, Python values, comments, and more',
    'Before/after diff view showing exactly what changed',
    'Code examples in JavaScript and Python for every error type',
    'Duplicate key detection with line numbers',
    'Bracket matching and unclosed structure detection',
    'Health score from 0 to 100',
    '100% client-side — nothing uploaded',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1240',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does "Unexpected token" mean in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An "Unexpected token" error means the JSON parser found a character it did not expect at that position. Common causes include trailing commas (,}) , single-quoted strings (\'key\'), JavaScript values like undefined or NaN, or unquoted object keys. Paste your JSON into this tool to see a plain-English explanation of each error.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my JSON from Python have True, False, and None?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Python capitalises its boolean and null literals as True, False, and None. When you convert a Python dict to a string using str(obj), these capitalised values end up in the output and are rejected by JSON parsers. The fix is simple: use json.dumps(obj) instead of str(obj) in Python.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does AI-generated JSON often have errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI models are trained on large amounts of JavaScript and Python source code that allows trailing commas, single-quoted strings, and values like undefined and NaN. When asked to output JSON, models sometimes produce these JavaScript-style constructs that are invalid in strict JSON. Always validate AI-generated JSON before parsing it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most common JSON error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common JSON error is a trailing comma — a comma after the last element in an array or the last key in an object, placed immediately before the closing ] or }. JSON strictly forbids this, though JavaScript ES2017 and JSON5 allow it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can JSON have comments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Standard JSON (RFC 8259) has no comment syntax. Neither // single-line nor /* */ block comments are allowed. If you need comments in configuration files, use JSONC (supported by VS Code and TypeScript) or JSON5. This tool strips comments automatically as part of the auto-fix.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a duplicate key in JSON and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A duplicate key means the same key appears more than once in the same JSON object. The spec says keys "should" be unique but doesn\'t forbid duplicates — so parsers won\'t throw an error. Instead they silently discard all but the last value, causing subtle data loss bugs. This tool highlights duplicate keys with all their line numbers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix JSON invalid escape sequence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON strings only allow these escape sequences: \\" \\\\ \\/ \\b \\f \\n \\r \\t and \\uXXXX. Any other backslash combination like \\x41 or \\p is invalid. Replace the invalid escape with its \\uXXXX equivalent or remove the backslash. Unlike Python or JavaScript, JSON does not support \\x hex escapes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my JSON data safe to paste here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All analysis and fixing runs entirely in your browser using JavaScript. Nothing is sent to a server. Your JSON — including API keys, tokens, or production data — never leaves your machine.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'JSON Tools', item: 'https://unblockdevs.com/json-beautifier' },
    { '@type': 'ListItem', position: 3, name: 'AI JSON Error Explainer', item: canonicalUrl },
  ],
};

export default function JsonErrorExplainerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <JsonErrorExplainerClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="What Is the AI JSON Error Explainer?">
          <SEOProse>
            Most JSON debugging tools show you one error and stop. The{' '}
            <strong>AI JSON Error Explainer</strong> detects every error simultaneously, explains each
            one in plain English, references the exact RFC 8259 rule being violated, and provides one-click
            auto-fix for the most common issues.
          </SEOProse>
          <SEOProse>
            Instead of cryptic messages like <code>SyntaxError: Unexpected token &#39;,&#39;</code>, you get:
            what went wrong, why JSON forbids it, which language or tool likely produced it, how to fix it
            manually, and how to prevent it in JavaScript or Python code. All in your browser — nothing uploaded.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Deep Error Analysis in Seconds">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Paste or load broken JSON',
                desc: 'Type or paste any invalid JSON — AI output, Python dicts, JavaScript object literals, config files, truncated API responses, anything.',
              },
              {
                n: '02',
                title: 'All errors detected instantly',
                desc: 'Unlike JSON.parse() which stops at the first error, this tool finds every issue at once: trailing commas, wrong quotes, Python values, invalid escapes, duplicate keys, unclosed brackets, and more.',
              },
              {
                n: '03',
                title: 'Read plain-English explanations',
                desc: 'Each error card shows what went wrong, why JSON forbids it (with the RFC reference), how to fix it manually, and code examples in JavaScript and Python.',
              },
              {
                n: '04',
                title: 'One-click auto-fix',
                desc: 'Click "Fix all auto-fixable errors" to apply all safe fixes at once. A diff view shows exactly what changed. Apply to the editor or copy the fixed JSON.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="errors" heading="Every JSON Error Type — Explained">
          <SEOProse>
            Below is a complete reference for every error type this tool detects, with causes and fixes.
          </SEOProse>
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[560px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Error</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Cause</th>
                  <th className="pb-3 pr-4 font-semibold text-zinc-700">Auto-fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  ['Trailing comma', 'Last array/object element followed by ,', 'Yes'],
                  ['Single quotes', 'Strings wrapped in \' instead of "', 'Yes'],
                  ['Unquoted keys', 'JS-style { key: "value" } object literals', 'Yes'],
                  ['Python values', 'str(dict) producing True/False/None', 'Yes'],
                  ['JS-only values', 'undefined, NaN, Infinity from JavaScript', 'Yes'],
                  ['Comments', '// and /* */ from config files or AI output', 'Yes'],
                  ['Leading zeros', '007, 0123 — octal-style number literals', 'Yes'],
                  ['Plus-signed numbers', '+42 — valid in many languages but not JSON', 'Yes'],
                  ['Unclosed brackets', 'Missing } or ] at end of file', 'Yes'],
                  ['Mismatched brackets', '{ closed with ] instead of }', 'No'],
                  ['Duplicate keys', 'Same key twice in one object', 'No'],
                  ['Invalid escape', '\\x41, \\p — not in the JSON escape set', 'No'],
                  ['Control characters', 'Raw ASCII 0–31 chars inside strings', 'No'],
                  ['UTF-8 BOM', '\\uFEFF at start of file from some editors', 'Yes'],
                ].map(([err, cause, fix]) => (
                  <tr key={err}>
                    <td className="py-3 pr-4 font-semibold text-zinc-900">{err}</td>
                    <td className="py-3 pr-4 text-zinc-500">{cause}</td>
                    <td className="py-3">
                      <span
                        className={
                          fix === 'Yes'
                            ? 'text-emerald-600 font-semibold'
                            : 'text-zinc-400'
                        }
                      >
                        {fix === 'Yes' ? '✓ Auto-fix' : '– Manual'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When You Need This Tool">
          <UseCases
            cases={[
              {
                icon: '🤖',
                title: 'Fix AI-Generated JSON',
                desc: 'LLMs frequently produce trailing commas, undefined values, and JS-style syntax. Paste the output, fix in one click.',
              },
              {
                icon: '🐍',
                title: 'Convert Python Dicts',
                desc: 'When Python\'s str(dict) produces True/False/None, this tool explains why and fixes it with the json.dumps() alternative.',
              },
              {
                icon: '🟨',
                title: 'Parse JS Object Literals',
                desc: 'Copy-pasted JavaScript objects with single quotes and unquoted keys are automatically detected and converted to valid JSON.',
              },
              {
                icon: '⚙️',
                title: 'Debug Config Files',
                desc: 'JSONC config files with // comments fail in strict parsers. The tool strips comments and explains the difference between JSON and JSONC.',
              },
              {
                icon: '🔁',
                title: 'Find Silent Bugs',
                desc: 'Duplicate keys cause silent data loss — parsers keep only the last value. This tool highlights every duplicate with exact line numbers.',
              },
              {
                icon: '📚',
                title: 'Learn JSON Rules',
                desc: 'Each error card references the exact RFC 8259 clause being violated, with code examples in JavaScript and Python — perfect for learning.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'What does "Unexpected token" mean in JSON?',
                a: 'It means the parser found a character it did not expect. Common causes: trailing comma (,}), single-quoted string, a JS value like undefined, or an unquoted key. Paste your JSON here to get a specific explanation.',
              },
              {
                q: 'Why does my JSON from Python have True, False, and None?',
                a: 'Python capitalises its booleans. When you use str(obj) on a dict, these appear in the output and break JSON parsers. Use json.dumps(obj) instead — it always produces valid, lowercase JSON.',
              },
              {
                q: 'Why does AI-generated JSON have errors?',
                a: 'AI models train on JavaScript and Python code that allows trailing commas, single quotes, and undefined values. They sometimes apply those rules when generating JSON. Always validate AI output before parsing.',
              },
              {
                q: 'Is my JSON data safe to paste here?',
                a: 'Yes. All analysis runs entirely in your browser — nothing is sent to any server. This is safe for API keys, tokens, and production data.',
              },
              {
                q: 'What is a trailing comma in JSON?',
                a: 'A trailing comma is a comma after the last element in an array [1,2,] or the last key in an object {"a":1,}. JSON strictly forbids this, unlike JavaScript ES2017+ or JSON5.',
              },
              {
                q: 'Why do duplicate keys cause problems?',
                a: 'The JSON spec says keys "should" be unique — so parsers don\'t error on duplicates. They silently keep only the last value, discarding earlier ones. This causes subtle, hard-to-debug data loss.',
              },
              {
                q: 'Can JSON have comments?',
                a: 'No. Standard JSON has no comment syntax. For config files that need comments, use JSONC (VS Code supports it natively) or JSON5.',
              },
              {
                q: 'What JSON escape sequences are valid?',
                a: 'Only these eight: \\" \\\\ \\/ \\b \\f \\n \\r \\t and \\uXXXX (4 hex digits). Anything else — like \\x41 or \\0 — is a syntax error in JSON even though it works in JavaScript.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="More JSON Tools">
          <RelatedTools
            tools={[
              { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Auto-repair broken JSON in one click', icon: '🔧' },
              { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print valid JSON', icon: '✨' },
              { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON objects side by side', icon: '🔀' },
              { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Generate schema from any JSON', icon: '📐' },
            ]}
          />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts
            posts={[
              { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
              { href: '/blog/25-broken-json-examples-fix', label: '25 Broken JSON Examples' },
              { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
              { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
              { href: '/blog/json-schema-complete-guide', label: 'JSON Schema Guide' },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_error_explainer" />
    </>
  );
}
