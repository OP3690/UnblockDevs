import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import JsonValidatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-validator';

export const metadata: Metadata = {
  title: 'JSON Validator — Validate JSON Syntax, JSON Schema (Draft 7/2020), AJV & OpenAPI Online Free | UnblockDevs',
  description:
    'Validate JSON syntax and structure instantly. Check against JSON Schema Draft 4, 6, 7, 2019-09, and 2020-12. Detailed error messages with line and column numbers. 100% browser-based — nothing sent to servers.',
  keywords: [
    'json validator',
    'json validator online',
    'json schema validator',
    'validate json syntax',
    'json schema draft 7',
    'json schema 2020',
    'ajv json validator',
    'openapi json validator',
    'json checker',
    'json validation tool',
    'validate json online free',
  ],
  openGraph: {
    title: 'JSON Validator — Syntax & Schema Validation Online | UnblockDevs',
    description: 'Validate JSON syntax and JSON Schema instantly. Draft 7, 2020-12, AJV. Detailed errors with line numbers. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JSON Validator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Validator — Syntax & Schema Validation | UnblockDevs',
    description: 'Validate JSON syntax and JSON Schema instantly. Draft 7, 2020-12. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Validator',
  url: canonicalUrl,
  description: 'Validate JSON syntax and JSON Schema (Draft 7, 2020-12, AJV, OpenAPI). Detailed error messages with line and column numbers. 100% client-side.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'JSON syntax validation',
    'JSON Schema Draft 4 / 6 / 7 / 2019-09 / 2020-12',
    'AJV-compatible validation',
    'Detailed error messages with line and column',
    'Required fields validation',
    'Pattern and format checking',
    '100% client-side — nothing stored or sent',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2100',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I validate JSON syntax online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your JSON into the validator and click Validate. The tool uses JSON.parse() to check for syntax errors and immediately reports the exact line and column where the error occurred — for example a missing comma, trailing comma after the last item, or an unquoted object key.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between JSON Schema Draft 7 and Draft 2020-12?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Draft 7 added features like if/then/else conditionals and readOnly/writeOnly. Draft 2019-09 introduced $recursiveRef and unevaluatedProperties. Draft 2020-12 refined those with $dynamicRef, prefixItems for arrays, and separated $defs from definitions. Most production APIs use Draft 7; newer tooling increasingly targets 2020-12.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AJV and how does it relate to JSON Schema validation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AJV (Another JSON Validator) is the most widely used JavaScript JSON Schema validation library. It compiles schemas to optimised validation functions and supports all major draft versions including Draft 7 and 2020-12. Many Node.js frameworks like Fastify use AJV internally. This tool uses AJV-compatible validation logic.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common JSON validation errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most frequent errors are: trailing commas after the last array element or object property (not valid in JSON, unlike JavaScript); unquoted keys (JSON requires double-quoted keys); single quotes instead of double quotes; missing colons between key and value; and unclosed brackets or braces. The validator shows the exact position of each error.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Validator', item: canonicalUrl },
  ],
};

export default function JsonValidatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonValidatorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JSON Validator?">
          <SEOProse>
            A <strong>JSON validator</strong> checks whether a string conforms to the JSON specification
            (RFC 8259). <strong>Syntax validation</strong> uses <C>JSON.parse()</C> to confirm the document
            is well-formed: properly quoted keys, no trailing commas, balanced brackets, and valid escape
            sequences. A syntax error means the document cannot be parsed at all.
          </SEOProse>
          <SEOProse>
            <strong>Schema validation</strong> goes further: it checks that the parsed data matches a
            declared structure — required properties are present, string fields match patterns, numbers fall
            within ranges, and arrays contain the right types. JSON Schema (Draft 7, 2019-09, 2020-12)
            provides the vocabulary for these constraints and is the standard used by OpenAPI, Fastify, and
            most modern API tooling. Both levels of validation are essential: syntax errors break parsers;
            schema errors break application logic.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Validate JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Copy and paste any JSON string, API response, config file, or fixture into the input area.' },
            { n: '02', title: 'Validate syntax', desc: 'The tool parses the JSON and instantly reports any syntax errors with the exact line and column number.' },
            { n: '03', title: 'Optionally add a schema', desc: 'Paste a JSON Schema (Draft 7 or 2020-12) to validate structure, required fields, types, and patterns.' },
            { n: '04', title: 'Fix with detailed errors', desc: 'Each error shows the JSON Pointer path, the rule that failed, and what was expected vs. what was found.' },
          ]} />
        </SEOSection>

        {/* Schema draft versions table */}
        <SEOSection id="schemas" heading="JSON Schema Draft Versions">
          <SEOProse>
            JSON Schema has evolved through several draft versions. Understanding the differences helps when
            choosing which draft to target for API contracts, form validation, or code generation.
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
                  <td className="px-4 py-3 text-zinc-500">OpenAPI 3.0, most production APIs, AJV default</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="px-4 py-3 font-mono text-zinc-900">2019-09</td>
                  <td className="px-4 py-3 text-zinc-600"><C>$recursiveRef</C>, <C>unevaluatedProperties</C>, anchors</td>
                  <td className="px-4 py-3 text-zinc-500">OpenAPI 3.1 subset, AJV 8+</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono text-zinc-900">2020-12</td>
                  <td className="px-4 py-3 text-zinc-600"><C>$dynamicRef</C>, <C>prefixItems</C>, separated <C>$defs</C></td>
                  <td className="px-4 py-3 text-zinc-500">OpenAPI 3.1 full, AJV 8+ with flag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Validate JSON">
          <UseCases cases={[
            { icon: '🔌', title: 'API Response Testing', desc: 'Validate that your API returns the expected shape before writing integration tests.' },
            { icon: '⚙️', title: 'Config File Validation', desc: 'Check package.json, tsconfig, ESLint, or custom app configs for schema compliance.' },
            { icon: '🔄', title: 'CI/CD Pipeline Checks', desc: 'Fail builds early if generated JSON artefacts violate the declared schema contract.' },
            { icon: '📝', title: 'Form Input Validation', desc: 'Validate user-submitted JSON payloads server-side before persisting to a database.' },
            { icon: '📦', title: 'Data Ingestion', desc: 'Validate batch data files or event streams against a schema before loading into a data warehouse.' },
            { icon: '📃', title: 'Contract Testing', desc: 'Use JSON Schema as a contract between microservices and validate both producer and consumer sides.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between syntax and schema validation?',
              a: <>Syntax validation checks that the JSON string is parseable — balanced braces, quoted keys, no trailing commas. Schema validation checks that the parsed data matches a declared structure: required fields are present, types are correct, values meet constraints. You can have syntactically valid JSON that fails schema validation (e.g. a required field is missing).</>,
            },
            {
              q: 'What is AJV and should I use it?',
              a: 'AJV (Another JSON Validator) is the de facto standard JSON Schema validation library for JavaScript and Node.js. It compiles schemas to fast validation functions and supports Draft 7 and 2020-12. Fastify, OpenAPI tools, and many testing frameworks use AJV internally. If you\'re validating JSON in a JavaScript environment, AJV is the recommended choice.',
            },
            {
              q: 'How do I mark fields as required in JSON Schema?',
              a: <>Add a <C>"required"</C> array at the same level as <C>"properties"</C> listing the required field names: <C>{'"required": ["id", "name"]'}</C>. Fields not listed are optional by default. This applies to Draft 4 through 2020-12.</>,
            },
            {
              q: 'How do pattern matching and format keywords work?',
              a: <>The <C>"pattern"</C> keyword validates a string against a regular expression. The <C>"format"</C> keyword annotates a string as a known format (e.g. <C>"email"</C>, <C>"date-time"</C>, <C>"uri"</C>) but validation depends on whether the validator enables format checking — AJV requires explicit opt-in via <C>{'{ formats: { ... } }'}</C>.</>,
            },
            {
              q: 'What does additionalProperties do in JSON Schema?',
              a: <>Setting <C>{"\"additionalProperties\": false"}</C> disallows any object keys not listed in <C>"properties"</C> or <C>"patternProperties"</C>. This is useful for strict API contracts but can cause issues when combining schemas with <C>allOf</C> — in that case, consider using <C>"unevaluatedProperties": false</C> instead (available in Draft 2019-09+).</>,
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format, prettify, and explore JSON with tree view and JSONPath', icon: '✨' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Auto-generate a Draft 7 or OpenAPI schema from sample JSON', icon: '📐' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON documents and highlight structural differences', icon: '🔀' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Automatically repair common JSON syntax errors', icon: '🔧' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_validator" />
    </>
  );
}
