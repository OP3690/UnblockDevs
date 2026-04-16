import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';

const canonicalUrl = 'https://unblockdevs.com/json-builder';

export const metadata: Metadata = {
  title: 'JSON Builder Online — Visual JSON Editor, Create & Edit JSON Objects Free | UnblockDevs',
  description:
    'Build and edit JSON objects visually. Add keys, values, nested objects, and arrays without writing raw JSON. 100% browser-based, no signup required.',
  keywords: [
    'json builder online',
    'json editor online',
    'visual json builder',
    'json constructor',
    'build json online',
    'create json object',
    'json creator tool',
    'json form builder',
    'json node editor',
    'json tree editor',
    'json visual editor',
    'interactive json builder',
    'json structure builder',
    'json key value editor',
    'add json fields',
    'json gui editor',
    'json formatter editor',
    'json editor no signup',
    'json builder browser',
    'json builder tool free',
    'json object builder free',
    'json array builder',
    'nested json builder',
    'json property editor',
    'json path builder',
    'jsonpath editor',
    'json builder vscode',
    'json builder chrome',
    'build json from template',
    'json generate from schema',
    'json mock generator',
    'json fixture builder',
    'json test data builder',
    'json example generator',
    'json sample creator',
    'json builder javascript',
    'json builder python',
    'json object creator',
    'json builder library',
    'build api payload json',
    'json constructor javascript',
    'json template builder',
    'json schema guided builder',
    'json builder drag drop',
    'json builder export',
    'create json from form',
    'json online editor free',
    'json builder tool developer',
    'json structure creator',
    'json editor free tool',
    'json object editor online',
    'json build and download',
    'json builder no code',
    'json key value pair editor',
    'edit json visually',
    'json builder web app',
    'json create and copy',
    'json builder for apis',
    'json payload builder',
    'json builder download',
    'json builder import export',
    'json builder format',
    'json builder validate',
    'json editor with tree view',
    'json add field online',
    'json remove field online',
  ],
  openGraph: {
    title: 'JSON Builder Online — Visual JSON Editor, Create & Edit JSON Free | UnblockDevs',
    description: 'Build JSON objects visually. Add keys, values, nested objects, and arrays. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Builder Online — Visual JSON Editor Free | UnblockDevs',
    description: 'Build JSON objects visually. Add nested objects, arrays, and key-value pairs. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Builder Online',
  description:
    'Build and edit JSON objects visually. Add keys, values, nested objects, and arrays without writing raw JSON. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Visual key-value JSON editor',
    'Nested object and array support',
    'Real-time JSON preview',
    'Import existing JSON for editing',
    'Export and copy JSON output',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1200',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JSON builder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON builder is a visual tool that lets you construct JSON objects and arrays through a graphical interface — adding keys, values, nested objects, and arrays — without needing to write raw JSON text. It is useful for developers who want to quickly create JSON payloads, API request bodies, or configuration files without worrying about syntax errors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create a JSON object online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this JSON builder at unblockdevs.com/json-builder. Click "Add field" to add a key-value pair, select the value type (string, number, boolean, null, object, or array), and enter the value. The JSON output is shown in real time. Click Copy to use it in your project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I build JSON from a template?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can import existing JSON into the builder to use it as a starting template, then modify keys and values visually. This is useful when you want to create multiple JSON objects with the same structure but different values.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add nested objects in a JSON builder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set the field type to "object" when adding a key. This creates a nested object node you can expand and add child fields to. Nesting can go as deep as needed — each nested level follows the same add-field workflow.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I build a JSON array?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set the field type to "array" when adding a key. Then add items to the array — each item can be a primitive value, an object, or another array. The builder handles the correct JSON array syntax automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate JSON from a schema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you have a JSON Schema, you can use the JSON Schema Generator tool at unblockdevs.com/json-schema-generation to understand the structure, then use this builder to create sample data that conforms to it. The builder ensures valid JSON output at every step.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I export built JSON to a file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click the Download button to save the built JSON as a .json file directly to your device. All processing is in your browser — the file is generated client-side and never sent to a server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use the JSON builder to create API payloads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Build your request body structure visually by adding the fields your API expects. Set the correct types (string, number, boolean, array, object) for each field. When finished, copy the JSON and paste it into your API client (Postman, Insomnia, curl, or fetch body).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the JSON builder safe — does it send data to servers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No data is sent to any server. The JSON builder runs entirely in your browser using JavaScript. Your JSON content is never uploaded, logged, or stored anywhere. Safe for building payloads that contain sensitive fields.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I import existing JSON into the builder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your existing JSON into the import input or upload a .json file. The builder parses the structure and populates the visual editor with the existing keys and values, ready for editing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I build JSON with optional fields?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add all fields you need, then delete or leave blank any fields that are optional for your use case. The builder only includes fields with values in the output. You can also set a field value to null to explicitly include it as a null JSON value.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a JSON builder and a JSON editor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON builder lets you construct JSON from scratch through a visual interface — adding fields, choosing types, and entering values — without writing raw text. A JSON editor is a text editor with syntax highlighting and validation for existing JSON. Both serve different workflows: builders are great for creating new JSON; editors are better for modifying existing JSON.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a JSON Object Online',
  description: 'Step-by-step guide to creating a JSON object visually using the JSON builder.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Click Add Field', text: 'Click the "Add Field" button to start adding key-value pairs to your JSON object.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the key and select the type', text: 'Type the field name and choose the value type: string, number, boolean, null, object, or array.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter the value', text: 'Fill in the value for the field. For nested objects or arrays, add child fields recursively.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy or download the JSON', text: 'Preview the JSON output in real time, then click Copy or Download to use it in your project.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Builder', item: canonicalUrl },
  ],
};

export default function JsonBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a JSON Builder?">
          <SEOProse>
            A <strong>JSON builder</strong> is a visual tool that lets you construct JSON objects and arrays through
            a graphical interface — adding keys, values, nested objects, and arrays — without needing to write raw
            JSON text. It prevents syntax errors like missing commas, unquoted keys, or mismatched brackets by
            handling structure automatically.
          </SEOProse>
          <SEOProse>
            JSON builders are especially useful for creating API request payloads, configuration files, test
            fixtures, and mock data. Instead of carefully typing JSON by hand and running it through a validator,
            you build the structure visually and copy valid, formatted JSON output directly to your clipboard.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Build JSON in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Add fields', desc: 'Click "Add Field" to add key-value pairs. Choose the value type: string, number, boolean, null, object, or array.' },
            { n: '02', title: 'Add nested structures', desc: 'Set a field type to "object" or "array" to nest deeper structures. Each level follows the same workflow.' },
            { n: '03', title: 'Preview in real time', desc: 'The JSON output panel updates as you build, so you always see the exact JSON being produced.' },
            { n: '04', title: 'Copy or export', desc: 'Click Copy to grab the JSON string, or Download to save it as a .json file. Nothing is sent to any server.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a JSON Builder">
          <UseCases cases={[
            { icon: '📡', title: 'API Request Payloads', desc: 'Build POST or PUT request bodies visually and paste them into Postman, curl, or your fetch() call.' },
            { icon: '⚙️', title: 'Config File Creation', desc: 'Create JSON configuration files for applications without worrying about syntax errors.' },
            { icon: '🧪', title: 'Test Fixtures', desc: 'Build mock JSON data for unit tests or integration tests with the exact structure your code expects.' },
            { icon: '📋', title: 'Form Data to JSON', desc: 'Convert form inputs into a JSON object structure for API submission or storage.' },
            { icon: '🔌', title: 'Webhook Payloads', desc: 'Construct webhook event payloads to test your webhook handler endpoints locally.' },
            { icon: '📦', title: 'Mock API Responses', desc: 'Generate realistic JSON response objects to use with mock servers or MSW (Mock Service Worker).' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a JSON builder?',
              a: 'A JSON builder is a visual tool that lets you construct JSON objects through a graphical interface — adding keys, values, nested objects, and arrays — without writing raw JSON text. It prevents syntax errors and speeds up JSON creation.',
            },
            {
              q: 'How do I create a JSON object online?',
              a: 'Click "Add Field" to start adding key-value pairs. Select the value type for each field (string, number, boolean, null, object, array). The JSON output updates in real time — click Copy when done.',
            },
            {
              q: 'How do I add nested objects in a JSON builder?',
              a: 'Set the field type to "object" when adding a key. This creates a nested object node you can expand and add child fields to. Nesting can go as deep as needed.',
            },
            {
              q: 'How do I build a JSON array?',
              a: 'Set the field type to "array" when adding a key, then add items to the array. Each item can be a primitive, an object, or another array. The builder handles the correct array syntax automatically.',
            },
            {
              q: 'How do I use the JSON builder to create API payloads?',
              a: 'Build your request body structure visually, adding the fields your API expects with correct types. When finished, copy the JSON and paste it into Postman, Insomnia, curl, or your fetch() body.',
            },
            {
              q: 'Is the JSON builder safe — does it send data to servers?',
              a: 'No data is sent to any server. The JSON builder runs entirely in your browser. Your JSON content is never uploaded, logged, or stored anywhere.',
            },
            {
              q: 'How do I import existing JSON into the builder?',
              a: 'Paste your existing JSON into the import input or upload a .json file. The builder parses the structure and populates the visual editor with existing keys and values, ready for editing.',
            },
            {
              q: 'How do I export built JSON to a file?',
              a: 'Click the Download button to save the built JSON as a .json file to your device. The file is generated client-side and never sent to a server.',
            },
            {
              q: 'Can I build JSON from a template?',
              a: 'Yes. Import existing JSON to use as a template, then modify keys and values visually. Useful for creating multiple JSON objects with the same structure but different values.',
            },
            {
              q: 'How do I build JSON with optional fields?',
              a: 'Add all fields you need, then delete any that are not required for your current use case. Set a field value to null to explicitly include it as a JSON null value.',
            },
            {
              q: 'Can I generate JSON from a schema?',
              a: <>Yes. Use the JSON Schema Generator at unblockdevs.com/json-schema-generation to understand the required structure, then use this builder to create sample data that conforms to it. The builder ensures valid JSON at every step.</>,
            },
            {
              q: 'What is the difference between a JSON builder and a JSON editor?',
              a: 'A JSON builder constructs JSON from scratch through a visual interface. A JSON editor is a text editor with syntax highlighting for existing JSON. Builders are ideal for creating new JSON; editors are better for modifying existing JSON.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print existing JSON', icon: '✨' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax before using it', icon: '✅' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Generate a JSON Schema from sample JSON', icon: '📐' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Repair malformed JSON automatically', icon: '🔧' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Top 10 JSON Errors' },
            { href: '/blog/json-best-practices-production-guide', label: 'JSON Best Practices' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Why JSON Breaks in APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Fix JSON Errors Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_builder" />
    </>
  );
}
