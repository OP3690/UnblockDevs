import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileCode, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JSON Schema & Stringify Complete Guide – Generate, Validate, Format | UnblockDevs',
  description: 'JSON Schema generation and validation, JSON.stringify best practices, and JSON format standards. One guide with examples and free tools.',
  keywords: [
    'JSON schema',
    'JSON schema generator',
    'JSON schema validation',
    'JSON.stringify',
    'JSON format standards',
    'validate JSON',
    'schema generator',
    'API schema',
  ],
  openGraph: {
    title: 'JSON Schema & Stringify Complete Guide – Generate, Validate, Format',
    description: 'JSON Schema generation and validation, JSON.stringify, and format standards. One guide.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-schema-complete-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-schema-complete-guide' },
};

export default function JsonSchemaCompleteGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer&apos;s Study Materials
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">JSON Tools</span>
            <time className="text-sm text-gray-500" dateTime="2026-03-02">March 2, 2026</time>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">JSON Schema & Stringify: Complete Guide</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Generate and validate JSON schemas, use JSON.stringify correctly, and follow JSON format standards. One guide with examples and free tools.
          </p>
        </header>

        <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-md p-8">
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileCode className="w-8 h-8 text-blue-600" />
              What is JSON Schema?
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>JSON Schema</strong> is a vocabulary for annotating and validating JSON. It describes expected properties, types, formats, and constraints. A <strong>JSON Schema Generator</strong> builds schema definitions from sample JSON so you don’t have to write them by hand.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Use schemas to validate API requests/responses, generate docs, enforce types, and generate client code. Our free <Link href="/" className="text-primary-600 hover:underline font-medium">JSON Schema Generator</Link> creates Draft 7 and OpenAPI-style schemas from your JSON.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of JSON Schema</h2>
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
              <li><strong>Data validation:</strong> Ensure payloads match the expected structure before processing.</li>
              <li><strong>API documentation:</strong> Document request/response shapes for humans and tools.</li>
              <li><strong>Type safety:</strong> Define types and constraints in a standard way.</li>
              <li><strong>Code generation:</strong> Generate types, clients, or tests from schemas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">JSON.stringify: Basics and Gotchas</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <code className="bg-gray-100 px-1 rounded">JSON.stringify(value)</code> turns a JavaScript value into a JSON string. Keys and string values use double quotes; numbers, booleans, and null are literal. <strong>Properties with value <code className="bg-gray-100 px-1 rounded">undefined</code> are omitted.</strong> Functions and symbols are also omitted. Use the optional <code className="bg-gray-100 px-1 rounded">replacer</code> (function or array of keys) to customize output, and the third argument for indentation (e.g. <code className="bg-gray-100 px-1 rounded">2</code> for pretty-print).
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For consistent formatting in APIs and configs, use a fixed indentation (e.g. 2 spaces) and validate the result with a <Link href="/json-beautifier" className="text-primary-600 hover:underline font-medium">JSON validator</Link> or schema.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">JSON Format Standards</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              JSON has strict syntax: double quotes for strings and keys, no trailing commas, no comments, and valid escape sequences. For readability, many teams use 2-space indentation and UTF-8 encoding. When generating JSON for APIs, keep payloads minimal (no extra whitespace) unless the API expects pretty-printed JSON. Our <Link href="/json-stringify-online" className="text-primary-600 hover:underline font-medium">JSON stringify tool</Link> lets you stringify with custom indentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Validation Techniques</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>JSON Schema validation</strong> checks that data conforms to a schema. Common checks: type (string, number, boolean, object, array, null), required fields, format (email, date, URI), min/max length or range, pattern (regex), and enum. Validate in JavaScript with a library like Ajv or in the browser with our <Link href="/" className="text-primary-600 hover:underline font-medium">JSON Schema Generator</Link> (generate schema from sample, then validate).
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
              <li>Validate API responses before use.</li>
              <li>Validate user input or config files.</li>
              <li>Use schema generation from samples to bootstrap new APIs.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Schema Generation Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Infer required vs optional</h3>
                  <p className="text-gray-700 text-sm">Use multiple samples to decide which properties are always present (required) vs optional.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Detect types accurately</h3>
                  <p className="text-gray-700 text-sm">Handle strings, numbers, booleans, arrays, objects, and null; support nested structures.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I validate JSON against a schema in JavaScript?</h3>
                <p className="text-gray-700">Use a library like Ajv: compile the schema with <code className="bg-gray-100 px-1 rounded">ajv.compile(schema)</code>, then call <code className="bg-gray-100 px-1 rounded">validate(data)</code>. For a quick check, paste your JSON and schema into our <Link href="/" className="text-primary-600 hover:underline">JSON Schema Generator</Link> and use the validation option.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does JSON.stringify drop some keys?</h3>
                <p className="text-gray-700">Properties whose value is <code className="bg-gray-100 px-1 rounded">undefined</code>, or that are functions/symbols, are omitted. Use a replacer to serialize undefined as null if you need the key in the output.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between JSON Schema and OpenAPI?</h3>
                <p className="text-gray-700">JSON Schema is a generic vocabulary for describing JSON. OpenAPI uses a subset of JSON Schema (and extensions) to describe REST APIs. Our generator can output both Draft 7 and OpenAPI-style schemas.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold mb-2">Ready to generate or validate JSON schemas?</p>
              <p className="text-gray-700 text-sm mb-4">
                Use our free <strong>JSON Schema Generator</strong> to create schemas from JSON and validate data. Also try the <Link href="/json-beautifier" className="text-primary-600 hover:underline">JSON Beautifier</Link> and <Link href="/json-stringify-online" className="text-primary-600 hover:underline">JSON stringify</Link> tools.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileCode className="w-5 h-5" />
                Open JSON Schema Generator
              </Link>
            </div>
          </section>
        </div>
              <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
          <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer — New Tool</p>
          <p className="text-sm text-zinc-600 mb-4">Paste broken JSON and instantly get clear explanations of every error — trailing commas, Python True/False/None, invalid escapes, duplicate keys — with one-click auto-fix.</p>
          <a href="/json-error-explainer" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
            Explain My JSON Errors →
          </a>
        </div>
</article>
    </div>
  );
}
