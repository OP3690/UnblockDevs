import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonSchemaGenerationClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-schema-generation';

export const metadata: Metadata = {
  title: 'Free JSON Schema Generator — Auto-Generate Draft 7 & OpenAPI Schemas | UnblockDevs',
  description:
    'Generate JSON Schema from sample JSON instantly. Supports Draft 7 and OpenAPI formats. Built-in validator, smart type detection, 100% browser-based. No signup required.',
  keywords: [
    'json schema generation',
    'json schema generator',
    'generate json schema',
    'schema generator json',
    'creating a json schema',
    'json schema creation',
    'json schema from json',
    'auto generate json schema',
    'json schema draft 7',
    'openapi schema generator',
    'json schema validator online',
    'json schema to typescript',
    'ajv json schema',
    'json schema required fields',
    'jsonschema npm addformat',
    'jsonschema addformat npm',
    'ajv addformat json schema',
    'json schema addformat',
  ],
  openGraph: {
    title: 'Free JSON Schema Generator — Auto-Generate Draft 7 & OpenAPI Schemas | UnblockDevs',
    description:
      'Generate JSON Schema from sample JSON. Supports Draft 7 and OpenAPI. Built-in validator, 100% browser-based. No signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Generator — Draft 7 & OpenAPI, Free Online | UnblockDevs',
    description: 'Paste JSON, get a complete Draft 7 or OpenAPI schema instantly. Validate JSON against it in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Schema Generator',
  description:
    'Generate JSON Schema from sample JSON automatically. Supports Draft 7 and OpenAPI formats with built-in validator. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Auto-generate JSON Schema from sample JSON',
    'Supports JSON Schema Draft 7 and OpenAPI',
    'Smart type detection (email, URI, date formats)',
    'Built-in JSON validator against generated schema',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '960',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is JSON Schema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON Schema is a vocabulary for annotating and validating JSON documents. It describes the structure, types, and constraints of your JSON so tools and APIs can validate data automatically. Draft 7 and OpenAPI-style schemas are widely supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate a JSON Schema from sample JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your sample JSON into the generator at unblockdevs.com/json-schema-generation. The tool infers types (string, number, boolean, array, object) and required fields, then outputs a Draft 7 or OpenAPI-compatible schema you can edit or use in validation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the generated schema free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The JSON Schema Generator is free with no signup. All processing runs in your browser — your data is never sent to any server. Copy and use the schema in any project, API, or validation tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the schema with OpenAPI or AJV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The generator outputs schemas compatible with OpenAPI 3.0 and AJV (the most popular JavaScript JSON Schema validator). Use the schema in your OpenAPI spec or pass it directly to AJV to validate request and response bodies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the generator handle nested objects and arrays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The generator recursively analyzes all levels of nesting to produce a complete schema including nested object properties, array item schemas, and inferred formats like email and URI.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate JSON Schema from Sample JSON Online',
  description: 'Step-by-step guide to generating a JSON Schema automatically from a sample JSON object in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Drop a sample JSON object or array into the input panel — from an API response, config file, or data export.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose format', text: 'Select JSON Schema Draft 7 (widest library support) or OpenAPI Schema for use in OpenAPI specs.' },
    { '@type': 'HowToStep', position: 3, name: 'Generate', text: 'Click Generate. The tool infers types, formats, and required fields to produce a complete schema instantly.' },
    { '@type': 'HowToStep', position: 4, name: 'Validate & export', text: 'Test any JSON against the schema using the built-in validator, then copy or download the schema file.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Free JSON Schema Generator', item: canonicalUrl },
  ],
};

export default function JsonSchemaGenerationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonSchemaGenerationClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is JSON Schema?">
          <SEOProse>
            <strong>JSON Schema</strong> is a vocabulary for annotating and validating JSON documents. A schema
            describes the shape of your data — which fields exist, what types they are, which are required, and
            what formats or constraints apply. Tools like AJV, jsonschema (Python), and OpenAPI use schemas to
            validate requests and responses automatically at runtime.
          </SEOProse>
          <SEOProse>
            Writing schemas by hand is tedious and error-prone, especially for deeply nested payloads. This
            generator analyzes a sample JSON document and outputs a complete, accurate schema in seconds —
            inferring types, detecting formats like <C>email</C>, <C>uri</C>, and <C>date-time</C>, and
            marking all present fields as required by default.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Generate a Schema in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Drop a sample JSON object or array into the input panel — from an API response, config file, or data export.' },
            { n: '02', title: 'Choose format', desc: 'Select JSON Schema Draft 7 (widest library support) or OpenAPI Schema for use in OpenAPI specs.' },
            { n: '03', title: 'Generate', desc: 'Click Generate. The tool infers types, formats, and required fields to produce a complete schema instantly.' },
            { n: '04', title: 'Validate & export', desc: 'Test any JSON against the schema using the built-in validator, then copy or download the schema file.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use JSON Schema">
          <UseCases cases={[
            { icon: '🛡️', title: 'TypeScript Validation', desc: 'Generate a schema from a sample response and use it with AJV to add runtime validation that complements your TypeScript types.' },
            { icon: '📖', title: 'API Documentation', desc: 'Bootstrap OpenAPI component schemas from existing response payloads instead of writing them from scratch.' },
            { icon: '📋', title: 'Form Validation', desc: 'Use the generated schema with react-hook-form, Formik, or any JSON-Schema-aware form library to validate user input.' },
            { icon: '💡', title: 'IDE Autocomplete', desc: 'Add the schema to your VS Code settings to get autocomplete and inline validation for JSON config files.' },
            { icon: '🤝', title: 'Data Contracts', desc: 'Share the schema with upstream or downstream teams as a machine-readable contract for what your API accepts or produces.' },
            { icon: '⚙️', title: 'Config File Validation', desc: 'Validate application config files on startup against a schema to catch misconfiguration before it causes runtime errors.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is the difference between JSON Schema Draft 7 and OpenAPI Schema?',
              a: 'Draft 7 is the standalone JSON Schema specification with full support for features like $ref, allOf, anyOf, and oneOf. OpenAPI Schema is a subset/superset used inside OpenAPI 3.0 specs — it removes some Draft 7 features and adds OpenAPI-specific extensions. Choose OpenAPI if the schema goes into an OpenAPI spec; choose Draft 7 for everything else.',
            },
            {
              q: 'Which JSON Schema validators work with the generated schema?',
              a: <>The generated Draft 7 schema works with AJV (JavaScript/Node.js), jsonschema (Python), Json.NET (C#), and most other major validators. The OpenAPI schema is compatible with Swagger UI, Redoc, and OpenAPI validator tools.</>,
            },
            {
              q: 'Does it detect email, URI, and date formats automatically?',
              a: <>Yes. The generator checks string values against common formats — <C>email</C>, <C>uri</C>, <C>date-time</C>, and <C>date</C> — and adds the corresponding <C>format</C> keyword to the schema property automatically.</>,
            },
            {
              q: 'Are all fields marked as required?',
              a: 'By default the generator marks every key present in the sample as required. You can edit the schema after generation to remove fields from the required array for optional properties.',
            },
            {
              q: 'How does it handle arrays with mixed types?',
              a: <>If an array contains items of a single type the generator emits <C>items: &#123;"type": "..."&#125;</C>. For mixed-type arrays it uses <C>items: &#123;&#125;</C> (any type) — you can refine this manually with <C>oneOf</C> or <C>anyOf</C>.</>,
            },
            {
              q: 'Is my data sent to any server?',
              a: 'No. All schema generation and validation happens entirely in your browser. Your JSON is never transmitted to any server, logged, or stored.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print JSON before generating a schema', icon: '✨' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Diff two JSON objects or API responses semantically', icon: '🔀' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate UUIDs for test fixtures and sample data', icon: '🆔' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Compute SHA-256 or MD5 hashes for data integrity', icon: '#️⃣' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'JSON Schema Guide' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'API Validation with Schemas' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Validation Errors' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_schema_generation" />
    </>
  );
}
