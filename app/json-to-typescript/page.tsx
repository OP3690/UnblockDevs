import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonToTypescriptClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-to-typescript';

export const metadata: Metadata = {
  title: 'JSON to TypeScript Types Generator — Interface, Type, Zod | UnblockDevs',
  description:
    'Instantly convert any JSON to TypeScript interfaces, type aliases, or Zod schemas. Handles nested objects, arrays, null values, and optional fields. 100% browser-based — no signup required.',
  keywords: [
    'json to typescript',
    'json to typescript interface',
    'json to ts',
    'generate typescript types from json',
    'json to type',
    'json to interface',
    'json typescript generator',
    'json to zod schema',
    'typescript interface generator',
    'convert json to typescript',
    'json type generator online',
    'json to typescript converter',
    'json to typescript types',
    'json to ts interface',
    'json to typescript online',
    'infer typescript types from json',
    'json schema to typescript',
    'json to interface typescript',
    'json to type typescript',
    'quicktype json typescript',
    'json typegen',
    'json to typescript free',
    'nested json typescript types',
    'json array typescript type',
    'json object typescript type',
    'json to yup schema',
    'json to class typescript',
    'json to dto typescript',
    'json to pydantic python',
    'json to dataclass python',
    'json to c# class',
    'json to java class',
    'json to golang struct',
    'json to swift struct',
    'json to kotlin data class',
    'json to rust struct',
    'json to graphql type',
    'json to mongoose schema',
    'json to prisma schema',
    'json to typeorm entity',
    'typescript interface from api',
    'api response typescript',
    'typescript api types',
    'generate types from swagger',
    'openapi typescript generator',
    'json type inference',
    'static typing json',
    'typescript strict json',
    'typescript json parse',
    'json parse typescript safe',
    'json type assertion',
    'zod parse json typescript',
    'io-ts json typescript',
    'runtypes json',
    'typescript type generator free',
    'generate typescript from json',
    'json to typescript generator online',
    'json to ts types free',
    'typescript types from json response',
    'generate ts interface from json',
  ],
  openGraph: {
    title: 'JSON to TypeScript Types Generator | UnblockDevs',
    description: 'Convert JSON to TypeScript interfaces, type aliases, or Zod schemas instantly. Handles nesting, arrays, and nulls. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs JSON to TypeScript Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON to TypeScript Types Generator | UnblockDevs',
    description: 'Paste JSON → get TypeScript interfaces instantly. Handles nested objects, arrays, null values, and Zod schemas.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON to TypeScript Types Generator',
  url: canonicalUrl,
  description: 'Convert any JSON to TypeScript interfaces, type aliases, or Zod schemas. Handles nested objects, arrays, and optional fields.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Generate TypeScript interfaces from JSON',
    'Generate type aliases',
    'Generate Zod schemas',
    'Nested object support',
    'Array type inference',
    'Optional field detection',
    '100% client-side',
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1870', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I convert JSON to a TypeScript interface?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON in the left editor and the TypeScript interface appears instantly on the right. The tool infers all field types including nested objects, arrays, strings, numbers, and booleans.' } },
    { '@type': 'Question', name: 'What is the difference between interface and type in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Both interface and type can describe the shape of an object. Interfaces support declaration merging and are generally preferred for defining object shapes. Type aliases are more flexible — they can represent unions, intersections, and primitives. For plain JSON data structures, both work identically.' } },
    { '@type': 'Question', name: 'Can this tool generate Zod schemas?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Switch to "Zod" mode in the output options to generate a Zod schema from your JSON. The output includes the z.object() definition and correct z.string(), z.number(), z.boolean(), z.null(), and z.array() types.' } },
    { '@type': 'Question', name: 'How are nested objects handled?', acceptedAnswer: { '@type': 'Answer', text: 'Each nested object becomes its own named interface. The name is derived from the parent key (converted to PascalCase). The parent interface references the child by name.' } },
    { '@type': 'Question', name: 'How do I handle optional fields in TypeScript types?', acceptedAnswer: { '@type': 'Answer', text: 'Fields whose value is null in the JSON are generated as optional (field?: Type | null). You can toggle the "optional nulls" option to control whether null values produce optional fields or required nullable fields. After generation, manually mark additional fields as optional using the ? operator.' } },
    { '@type': 'Question', name: 'How do I generate TypeScript from an API response?', acceptedAnswer: { '@type': 'Answer', text: 'Open your browser DevTools, go to the Network tab, find the API request, right-click the response body and copy it, then paste it into this tool. The TypeScript interface is generated instantly. This is the fastest way to type API responses without writing types by hand.' } },
    { '@type': 'Question', name: 'How do I convert nested JSON to TypeScript interfaces?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your nested JSON and the tool generates a separate named interface for each nested object. For example, a JSON object with a nested address object generates both a root interface and an Address interface, with the root referencing Address by name.' } },
    { '@type': 'Question', name: 'What is Quicktype and how does it compare?', acceptedAnswer: { '@type': 'Answer', text: 'Quicktype is a popular open-source type generator that supports many output languages (TypeScript, Python, Go, Rust, etc.) from JSON, JSON Schema, or GraphQL. This tool focuses specifically on TypeScript with a fast, no-signup browser experience. Quicktype offers more language targets; this tool offers a simpler, faster workflow for TypeScript.' } },
    { '@type': 'Question', name: 'How do I safely parse JSON in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'JSON.parse() returns any, which is unsafe. Safe approaches: (1) use Zod — generate a Zod schema with this tool, then call schema.parse(JSON.parse(text)); (2) use io-ts or runtypes for runtime validation; (3) use a type assertion with your generated interface and validate manually.' } },
    { '@type': 'Question', name: 'How do I convert JSON to a TypeScript class?', acceptedAnswer: { '@type': 'Answer', text: 'Select "class" as the output format in this tool to generate a TypeScript class with typed properties instead of an interface. Classes support constructor initialization and methods, making them suitable for domain models. For simple data transfer objects, interfaces or type aliases are usually preferred.' } },
    { '@type': 'Question', name: 'How do I generate types from a JSON Schema?', acceptedAnswer: { '@type': 'Answer', text: 'Use json-schema-to-typescript (npm install -g json-schema-to-typescript) and run json2ts schema.json > types.ts. This tool converts sample JSON to types directly, which is simpler when you have a JSON example but no formal schema.' } },
    { '@type': 'Question', name: 'How do I convert JSON to types in languages other than TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'For Python use Quicktype (quicktype --lang python) or datamodel-code-generator to generate Pydantic models. For Go, Java, Kotlin, Swift, Rust, and C#, Quicktype supports all of these from JSON input. Run quicktype --lang <language> --out output_file < data.json.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert JSON to TypeScript Types Online',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste JSON', text: 'Paste your JSON object or array in the left editor, or load one of the sample presets.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose output format', text: 'Select interface, type alias, or Zod schema in the options bar below the editor.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy the result', text: 'Click "Copy" to copy the generated TypeScript types to your clipboard.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON to TypeScript', item: canonicalUrl },
  ],
};

export default function JsonToTypescriptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonToTypescriptClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Stop Writing TypeScript Types by Hand">
          <SEOProse>
            Every time you add a new API endpoint or change a response shape, you update the TypeScript interfaces
            by hand — copy the JSON from the browser network tab, mentally map each field to a type, handle
            nested objects, figure out what is optional, and hope you did not miss anything. It is the most
            repetitive part of front-end development.
          </SEOProse>
          <SEOProse>
            Paste any JSON — user objects, API responses, config files, database records — and get immediately
            correct <C>interface</C>, <C>type</C>, or <C>Zod</C> definitions. Nested objects become separate named
            interfaces. Arrays are correctly typed as <C>string[]</C>, <C>User[]</C>, or union types.
            <C>null</C> values become optional fields. Copy and paste the result into your codebase.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Paste JSON, Get Types in One Step">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Paste any valid JSON object or array into the left editor. Use a sample preset to try it instantly.' },
            { n: '02', title: 'Pick your output format', desc: 'Choose interface (default), type alias, or Zod schema. Set the root interface name and toggle options like "export all" and "optional nulls".' },
            { n: '03', title: 'Copy and use', desc: 'The TypeScript output updates in real-time. Click Copy to grab it and paste it straight into your project.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Use a JSON to TypeScript Generator">
          <UseCases cases={[
            { icon: '🔗', title: 'API Integration', desc: 'Copy a JSON response from your browser DevTools network tab and instantly get the TypeScript interface for the API data.' },
            { icon: '🗃️', title: 'Database Schema Typing', desc: 'Take a sample record from your database and generate TypeScript types for your ORM or data access layer.' },
            { icon: '📦', title: 'Third-party SDK Types', desc: 'When a library ships without TypeScript types, paste its JSON payload format to generate your own type declarations.' },
            { icon: '🤖', title: 'AI Response Typing', desc: 'Generate TypeScript interfaces for ChatGPT, Claude, or Gemini API JSON responses before integrating them into your app.' },
            { icon: '⚙️', title: 'Config File Types', desc: 'Create typed configuration objects for app settings, feature flags, or environment variable schemas.' },
            { icon: '🧪', title: 'Test Fixture Types', desc: 'Generate types from test fixture JSON files to ensure your mock data matches your production interface shapes.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'How do I convert JSON to TypeScript types?', a: 'Paste your JSON in the left editor — TypeScript interfaces appear instantly on the right. The tool infers all types including nested objects, arrays, strings, numbers, and booleans. Click Copy to use the result in your project.' },
            { q: 'What is the difference between interface and type in TypeScript?', a: 'Both can describe an object shape. Interfaces support declaration merging and are preferred for object shapes. Type aliases are more flexible — they can represent unions, intersections, and primitives. For plain JSON, both work identically.' },
            { q: 'How do I handle optional fields in TypeScript types?', a: <>Fields whose JSON value is null are generated as optional (<C>field?: Type | null</C>). Toggle "optional nulls" to control whether null produces optional or nullable fields. Manually add the <C>?</C> operator to any other fields that should be optional.</> },
            { q: 'How do I generate TypeScript from an API response?', a: 'Open browser DevTools, go to the Network tab, find the API request, copy the response body, then paste it here. TypeScript interfaces are generated instantly — the fastest way to type API responses without writing them by hand.' },
            { q: 'How do I convert nested JSON to TypeScript interfaces?', a: 'Paste your nested JSON and the tool generates a separate named interface for each nested object. Each nested object key becomes a PascalCase interface name referenced from the parent interface.' },
            { q: 'Can this tool generate Zod schemas?', a: <>Yes. Switch to "Zod" in the output options to get a <C>z.object()</C> schema with correct <C>z.string()</C>, <C>z.number()</C>, <C>z.boolean()</C>, <C>z.null()</C>, and <C>z.array()</C> types.</> },
            { q: 'How do I safely parse JSON in TypeScript?', a: <>Use Zod for safe parsing: generate a Zod schema with this tool, then call <C>schema.parse(JSON.parse(text))</C>. This validates the shape at runtime and gives you a fully typed result. <C>JSON.parse()</C> alone returns <C>any</C>, which bypasses TypeScript safety.</> },
            { q: 'How do I convert JSON to a TypeScript class?', a: 'Select "class" as the output format to generate a TypeScript class with typed properties. Classes support constructors and methods, suitable for domain models. For simple data transfer objects, interfaces are usually preferred.' },
            { q: 'What is Quicktype and how does it compare?', a: 'Quicktype is an open-source type generator supporting many languages (TypeScript, Python, Go, Rust, etc.) from JSON or JSON Schema. This tool focuses on TypeScript with a fast browser experience. Use Quicktype when you need multi-language output; use this tool for a simpler TypeScript-only workflow.' },
            { q: 'How do I generate types from a JSON Schema?', a: <>Use json-schema-to-typescript: <C>npm install -g json-schema-to-typescript</C>, then run <C>json2ts schema.json &gt; types.ts</C>. This tool converts sample JSON directly without needing a formal schema.</> },
            { q: 'How do I use the generated TypeScript types in my project?', a: 'Copy the generated types, paste them into a .ts file in your project (e.g. types/api.ts), and import them: import type { UserResponse } from "./types/api". Use the interface to type API responses, function parameters, and state variables.' },
            { q: 'How do I convert JSON to types in languages other than TypeScript?', a: 'Use Quicktype: quicktype --lang python, --lang go, --lang java, --lang rust, etc. For Python specifically, datamodel-code-generator generates Pydantic models from JSON or JSON Schema. For C#, use json2csharp.com or Quicktype.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format and validate JSON before converting it to TypeScript', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Catch JSON errors before generating types', icon: '✓' },
            { href: '/json-schema-generation', label: 'JSON Schema Generator', desc: 'Generate JSON Schema (Draft 7) from sample data', icon: '📐' },
            { href: '/text-diff', label: 'Text Diff', desc: 'Compare two TypeScript type definitions side by side', icon: '↕️' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'TypeScript Best Practices' },
            { href: '/blog/json-best-practices-production-guide', label: 'Typed API Clients in TypeScript' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Zod Schema Validation Guide' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'JSON Schema vs TypeScript Types' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="json_to_typescript" />
    </>
  );
}
