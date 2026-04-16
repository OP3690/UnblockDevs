import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts, ProTip,
} from '@/components/tools/ToolSEOContent';
import JsonValidatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-validator';

export const metadata: Metadata = {
  title: 'JSON Validator Online — Free Syntax & Schema Checker | UnblockDevs',
  description:
    'Free JSON Validator online. Check JSON syntax instantly and validate against JSON Schema (Draft 4/6/7/2019-09/2020-12). Exact error line numbers, AJV-compatible. 100% client-side — your JSON never leaves your browser.',
  keywords: [
    // ── Primary: "json validator" cluster ─────────────────────────────────
    'json validator',
    'json validator online',
    'json validator online free',
    'json validator free',
    'validate json online',
    'validate json online free',
    'json validation online',
    'json validation tool',
    'json validation free',
    'json syntax validator',
    'json syntax checker',
    'json syntax checker online',
    'json checker',
    'json checker online',
    'check json online',
    'check json validity',
    'is my json valid',
    'is this valid json',
    // ── JSON schema validation cluster ─────────────────────────────────
    'json schema validator',
    'json schema validator online',
    'json schema validator free',
    'validate json schema',
    'json schema validation',
    'json schema checker',
    'json schema draft 7',
    'json schema draft 7 validator',
    'json schema 2020',
    'json schema 2020-12 validator',
    'json schema 2019-09 validator',
    'ajv json validator',
    'ajv validator online',
    'ajv schema validator',
    'openapi json validator',
    'openapi schema validator',
    // ── Error / fix overlap ───────────────────────────────────────────
    'json parse error checker',
    'json error checker',
    'json error highlighter',
    'json linter',
    'json linter online',
    'json lint',
    'json lint online',
    'json format checker',
    // ── Feature-specific ──────────────────────────────────────────────
    'json validator with line numbers',
    'json validator client side',
    'json validator no upload',
    'private json validator',
    'json validator safe',
    // ── "formatter" overlap for cross-ranking ─────────────────────────
    'json validator and formatter',
    'json formatter and validator',
    'json checker and formatter',
    'online json tool',
    'json parser online',
    'json parser checker',
    // ── Long-tail ─────────────────────────────────────────────────────
    'best json validator online',
    'best free json validator',
    'json validator no login',
    'json validator no signup',
    'json validator 2026',
    'json required fields validator',
    'json type validator',
    'validate json against schema online',
  ],
  openGraph: {
    title: 'JSON Validator Online — Syntax & Schema Checker, Free & Private | UnblockDevs',
    description:
      'Validate JSON syntax and JSON Schema (Draft 7, 2020-12, AJV). Exact error line numbers. 100% client-side — nothing sent to servers. No signup.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON Validator Online — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Validator Online — Free & Private | UnblockDevs',
    description: 'Validate JSON syntax and JSON Schema instantly. Draft 7, 2020-12, AJV. Exact error lines. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

// ── JSON-LD: WebApplication ────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Validator Online',
  url: canonicalUrl,
  description:
    'Free online JSON validator. Check JSON syntax instantly with exact error line and column numbers. Validate against JSON Schema Draft 4, 6, 7, 2019-09, and 2020-12. AJV-compatible. 100% client-side — nothing is sent to any server.',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'JSON Tools',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'JSON syntax validation with exact error line and column numbers',
    'JSON Schema validation: Draft 4, Draft 6, Draft 7, 2019-09, 2020-12',
    'AJV-compatible validation logic',
    'OpenAPI 3.0 and 3.1 schema support',
    'Required fields validation',
    'Pattern and format keyword checking',
    'Real-time validation as you type',
    '100% client-side — nothing stored or sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2400',
    bestRating: '5',
    worstRating: '1',
  },
  author: { '@type': 'Organization', name: 'UnblockDevs', url: 'https://unblockdevs.com' },
  dateModified: '2026-04-16',
};

// ── JSON-LD: SoftwareApplication ───────────────────────────────────────────────
const softwareAppLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Validator by UnblockDevs',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2400',
    bestRating: '5',
  },
  description:
    'Free JSON syntax and schema validator. Supports JSON Schema Draft 7 and 2020-12. AJV-compatible. Real-time error highlighting with exact line numbers. 100% private — runs in your browser.',
};

// ── JSON-LD: FAQPage ───────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I validate JSON online for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to unblockdevs.com/json-validator, paste your JSON into the input box, and click Validate (or press Ctrl+Enter). The tool instantly reports whether your JSON is valid and, if not, shows the exact line and column of every syntax error. No signup and no data upload required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between JSON syntax validation and JSON Schema validation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Syntax validation checks that the JSON string is parseable — balanced braces, quoted keys, no trailing commas. Schema validation goes further and checks that the parsed data matches a declared structure: required fields are present, types are correct, values meet constraints. You can have syntactically valid JSON that fails schema validation (e.g. a required field is missing or a number is out of range).',
      },
    },
    {
      '@type': 'Question',
      name: 'What JSON Schema versions does this validator support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This validator supports JSON Schema Draft 4, Draft 6, Draft 7, Draft 2019-09, and Draft 2020-12. You can choose the draft version to target. Most production APIs use Draft 7; OpenAPI 3.1 uses Draft 2020-12.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AJV and how does this validator relate to it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AJV (Another JSON Validator) is the most widely used JSON Schema validation library for JavaScript and Node.js. It compiles schemas to optimised validation functions and is used internally by Fastify, OpenAPI tooling, and many testing frameworks. This validator uses AJV-compatible validation logic, so schemas that work with AJV will work here.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common JSON validation errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most frequent errors are: trailing commas after the last array element or object property (valid in JavaScript but not in JSON); unquoted keys (JSON requires double-quoted keys); single quotes instead of double quotes; missing colons between key and value; and unclosed brackets or braces. The validator highlights the exact position of each error.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I mark fields as required in JSON Schema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add a "required" array at the same object level as "properties", listing the required field names: {"required": ["id", "name"], "properties": {...}}. Fields not listed in "required" are optional by default. This syntax applies to all draft versions from Draft 4 through 2020-12.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between JSON Schema Draft 7 and Draft 2020-12?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Draft 7 added if/then/else conditionals and readOnly/writeOnly. Draft 2019-09 introduced $recursiveRef and unevaluatedProperties. Draft 2020-12 refined those with $dynamicRef, prefixItems for typed arrays, and separated $defs. Most production APIs use Draft 7; OpenAPI 3.1 targets Draft 2020-12.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my JSON safe to paste into this validator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All validation runs entirely in your browser using JavaScript. Your JSON — including any credentials, user data, or API responses — is never uploaded or sent to any server. There is no backend, no logging, and no analytics on your data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I validate JSON in real time as I type?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The validator checks your JSON as you type and updates the error indicators in real time, so you can see immediately when a fix resolves an error without clicking a button.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does additionalProperties: false do in JSON Schema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Setting "additionalProperties": false disallows any object keys not listed in "properties" or "patternProperties". This enforces strict contracts but can cause issues when composing schemas with allOf. In that case, consider "unevaluatedProperties": false instead, available in Draft 2019-09 and later.',
      },
    },
  ],
};

// ── JSON-LD: HowTo ─────────────────────────────────────────────────────────────
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Validate JSON Online — Step by Step',
  description: 'Quick guide to validating JSON syntax and JSON Schema using the free UnblockDevs JSON Validator.',
  totalTime: 'PT1M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Paste any JSON string, API response, config file, or fixture into the input area. The validator checks syntax in real time as you type.' },
    { '@type': 'HowToStep', position: 2, name: 'Review syntax errors', text: 'Syntax errors are highlighted in red with the exact line and column number where the error occurs and a plain-English description of what went wrong.' },
    { '@type': 'HowToStep', position: 3, name: 'Optionally paste a JSON Schema', text: 'To validate structure, paste a JSON Schema (Draft 7 or 2020-12) into the schema panel. The validator will check that required fields are present, types are correct, and constraints are met.' },
    { '@type': 'HowToStep', position: 4, name: 'Fix errors and confirm valid', text: 'Use the error messages to fix your JSON. When all errors are resolved, a green checkmark confirms the JSON is valid and ready to parse, store, or send.' },
  ],
};

// ── JSON-LD: BreadcrumbList ────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Validator', item: canonicalUrl },
  ],
};

export default function JsonValidatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonValidatorClient />

      <ToolSEOContent>

        {/* ── What is a JSON validator ───────────────────────────────────────── */}
        <SEOSection id="what" heading="JSON Validator — Syntax & Schema Validation Online">
          <SEOProse>
            A <strong>JSON validator</strong> checks whether a string conforms to the JSON specification
            (RFC 8259). <strong>Syntax validation</strong> uses <C>JSON.parse()</C> to confirm the document
            is well-formed: properly double-quoted keys, no trailing commas, balanced brackets, and valid
            escape sequences. A syntax error means the document cannot be parsed at all.
          </SEOProse>
          <SEOProse>
            <strong>Schema validation</strong> goes further: it checks that the parsed data matches a
            declared structure — required properties are present, string fields match patterns, numbers fall
            within ranges, and arrays contain the correct types. JSON Schema (Draft 7, 2019-09, 2020-12)
            provides the vocabulary for these constraints and is the standard used by OpenAPI, Fastify, and
            most modern API tooling.
          </SEOProse>
          <SEOProse>
            Both levels of validation are essential: <strong>syntax errors break parsers</strong>; schema
            errors break application logic. This tool handles both, with exact line and column numbers for
            every error — and runs 100% in your browser with no data upload.
          </SEOProse>
          <ProTip>
            Press <strong>⌘+Enter</strong> (Mac) or <strong>Ctrl+Enter</strong> (Windows) to validate
            instantly. Errors are highlighted with exact line and column numbers.
          </ProTip>
        </SEOSection>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <SEOSection id="how" eyebrow="How it works" heading="Validate JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Copy and paste any JSON string — API response, config file, fixture, or log entry. Validation runs in real time as you type.' },
            { n: '02', title: 'Review syntax errors', desc: 'The tool parses the JSON and instantly reports any syntax errors with the exact line and column number and a plain-English description.' },
            { n: '03', title: 'Optionally validate against a schema', desc: 'Paste a JSON Schema (Draft 7 or 2020-12) to validate structure, required fields, types, and patterns against your data.' },
            { n: '04', title: 'Fix and confirm valid', desc: 'Use the error messages to fix your JSON. A green checkmark confirms valid, parseable JSON. Nothing was sent to any server.' },
          ]} />
        </SEOSection>

        {/* ── JSON Schema draft versions ─────────────────────────────────────── */}
        <SEOSection id="schemas" heading="JSON Schema Draft Versions — Which Should You Use?">
          <SEOProse>
            JSON Schema has evolved through several draft versions. Understanding the differences helps
            when choosing which draft to target for API contracts, form validation, or code generation.
          </SEOProse>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 mt-4">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Draft</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Key additions</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Common use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">Draft 4</td>
                  <td className="px-4 py-3 text-zinc-600">Core vocabulary, <C>$ref</C>, <C>allOf</C>/<C>anyOf</C>/<C>oneOf</C></td>
                  <td className="px-4 py-3 text-zinc-500">Legacy Swagger 2.0 / OpenAPI 2.0</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="px-4 py-3 font-mono text-zinc-900">Draft 6</td>
                  <td className="px-4 py-3 text-zinc-600"><C>const</C>, <C>contains</C>, <C>propertyNames</C></td>
                  <td className="px-4 py-3 text-zinc-500">Transitional; rarely targeted directly</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">Draft 7</td>
                  <td className="px-4 py-3 text-zinc-600"><C>if</C>/<C>then</C>/<C>else</C>, <C>readOnly</C>/<C>writeOnly</C>, <C>$comment</C></td>
                  <td className="px-4 py-3 text-zinc-500"><strong>Most common</strong> — OpenAPI 3.0, AJV default, most production APIs</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="px-4 py-3 font-mono text-zinc-900">2019-09</td>
                  <td className="px-4 py-3 text-zinc-600"><C>$recursiveRef</C>, <C>unevaluatedProperties</C>, anchors</td>
                  <td className="px-4 py-3 text-zinc-500">OpenAPI 3.1 subset, AJV 8+</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">2020-12</td>
                  <td className="px-4 py-3 text-zinc-600"><C>$dynamicRef</C>, <C>prefixItems</C>, separated <C>$defs</C></td>
                  <td className="px-4 py-3 text-zinc-500">OpenAPI 3.1 full, AJV 8+ with flag — growing adoption</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* ── Use cases ─────────────────────────────────────────────────────── */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Validate JSON">
          <UseCases cases={[
            { icon: '🔌', title: 'API Response Testing', desc: 'Validate that your API returns the expected structure before writing integration tests — catch breaking changes early.' },
            { icon: '⚙️', title: 'Config File Validation', desc: 'Check package.json, tsconfig.json, ESLint, or custom app configs for schema compliance before deploying.' },
            { icon: '🔄', title: 'CI/CD Pipeline Checks', desc: 'Fail builds early if generated JSON artefacts violate the declared schema contract.' },
            { icon: '📝', title: 'Form Input Validation', desc: 'Validate user-submitted JSON payloads before storing to a database or passing to a downstream service.' },
            { icon: '📦', title: 'Data Ingestion', desc: 'Validate batch data files or event streams against a schema before loading into a data warehouse or data lake.' },
            { icon: '📃', title: 'Contract Testing', desc: 'Use JSON Schema as a formal contract between microservices — validate both producer and consumer against the same schema.' },
          ]} />
        </SEOSection>

        {/* ── Common errors reference ────────────────────────────────────────── */}
        <SEOSection id="errors" heading="Most Common JSON Validation Errors">
          <SEOProse>
            <strong>Trailing comma</strong> — <code>{'{"a": 1,}'}</code> is valid JavaScript but invalid JSON.
            Remove the comma after the last property or array element.
          </SEOProse>
          <SEOProse>
            <strong>Single quotes</strong> — <code>{"{'key': 'value'}"}</code> is JavaScript object
            syntax, not JSON. JSON requires double quotes: <code>{'{"key": "value"}'}</code>.
          </SEOProse>
          <SEOProse>
            <strong>Unquoted keys</strong> — <code>{'{key: "value"}'}</code> is invalid. JSON
            requires all keys to be double-quoted strings: <code>{'{"key": "value"}'}</code>.
          </SEOProse>
          <SEOProse>
            <strong>Comments</strong> — <code>{'// comments'}</code> and <code>{'/* comments */'}</code>{' '}
            are not valid in JSON (only in JSONC). Strip them before parsing.
          </SEOProse>
          <SEOProse>
            <strong>Undefined / NaN / Infinity</strong> — JavaScript values like <code>undefined</code>,{' '}
            <code>NaN</code>, and <code>Infinity</code> are not valid JSON values.{' '}
            <code>JSON.stringify()</code> replaces them with <code>null</code> or omits them.
          </SEOProse>
        </SEOSection>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between syntax and schema validation?',
              a: <>Syntax validation checks that the JSON string is parseable — balanced braces, double-quoted keys, no trailing commas. Schema validation checks that the parsed data matches a declared structure: required fields are present, types are correct, values meet constraints. You can have syntactically valid JSON that fails schema validation (e.g. a required field is missing).</>,
            },
            {
              q: 'What JSON Schema versions does this validator support?',
              a: 'Draft 4, Draft 6, Draft 7, 2019-09, and 2020-12. Most production APIs use Draft 7; OpenAPI 3.1 uses 2020-12.',
            },
            {
              q: 'What is AJV and should I use it?',
              a: 'AJV (Another JSON Validator) is the de facto standard JSON Schema validation library for JavaScript and Node.js. It compiles schemas to fast validation functions and supports Draft 7 and 2020-12. Fastify, OpenAPI tools, and many testing frameworks use AJV internally. This validator uses AJV-compatible logic.',
            },
            {
              q: 'How do I mark fields as required in JSON Schema?',
              a: <>Add a <C>"required"</C> array at the same level as <C>"properties"</C> listing the required field names: <C>{'"required": ["id", "name"]'}</C>. Fields not listed are optional by default. Applies to all draft versions.</>,
            },
            {
              q: 'What does additionalProperties: false do?',
              a: <>Setting <C>{"\"additionalProperties\": false"}</C> disallows any object keys not listed in <C>"properties"</C>. Useful for strict API contracts but can cause issues when composing schemas with <C>allOf</C>. Consider <C>"unevaluatedProperties": false</C> instead (Draft 2019-09+) for composed schemas.</>,
            },
            {
              q: 'Is my JSON safe to paste here?',
              a: 'Yes. All validation runs entirely in your browser. Your JSON is never uploaded or sent to any server — there is no backend, no logging, and no analytics on your data.',
            },
            {
              q: 'What are the most common JSON syntax errors?',
              a: 'Trailing commas after the last element, single quotes instead of double quotes, unquoted object keys, missing colons or commas, unclosed brackets or braces, and comments (which JSON does not support). Each is reported with the exact line and column number.',
            },
            {
              q: 'Can I validate JSON in real time as I type?',
              a: 'Yes. The validator checks your JSON as you type and updates error indicators in real time, so you see immediately when a fix resolves an error without pressing any button.',
            },
          ]} />
        </SEOSection>

        {/* ── Related tools ─────────────────────────────────────────────────── */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier & Viewer', desc: 'Format, prettify, and explore JSON with tree view, JSONPath, TypeScript & SQL', icon: '✨' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Auto-generate a Draft 7 or OpenAPI schema from sample JSON data', icon: '📐' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON documents and highlight structural differences', icon: '🔀' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Automatically repair common JSON syntax errors', icon: '🔧' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask sensitive JSON fields before sending to AI tools', icon: '🔒' },
            { href: '/json-formatter', label: 'JSON Formatter', desc: 'Fast focused JSON formatting with custom indentation', icon: '{}' },
          ]} />
        </SEOSection>

        {/* ── Guides ────────────────────────────────────────────────────────── */}
        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/invalid-json-vs-valid-json-examples', label: 'Valid vs Invalid JSON Examples' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors — Complete Guide' },
            { href: '/blog/how-to-validate-api-response-using-json-schema', label: 'Validate API Responses with JSON Schema' },
            { href: '/blog/how-to-validate-json-schema-javascript', label: 'JSON Schema Validation in JavaScript' },
          ]} />
        </SEOSection>

      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_validator" />
    </>
  );
}
