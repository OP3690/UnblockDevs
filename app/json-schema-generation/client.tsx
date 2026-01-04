'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';

export default function JsonSchemaGenerationClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">JSON Schema Generation - Free Online Generator</h1>
          <p className="text-sm text-gray-500 mt-1">Generate JSON Schema from sample JSON automatically. Supports Draft 7 and OpenAPI formats.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I generate a JSON Schema?',
              answer: 'Simply paste your sample JSON into our JSON Schema Generator, and it will automatically analyze the structure and generate a complete JSON Schema for you. No manual coding required.',
            },
            {
              question: 'What JSON Schema formats are supported?',
              answer: 'Our generator supports JSON Schema Draft 7 (the most widely used version) and OpenAPI Schema format. You can choose your preferred format before generating.',
            },
            {
              question: 'Can I validate JSON against a generated schema?',
              answer: 'Yes! Our tool includes a built-in validator that lets you test any JSON against your generated schema to ensure it matches the expected structure.',
            },
            {
              question: 'Does the generator handle nested objects and arrays?',
              answer: 'Yes, our generator automatically handles nested objects, arrays, and complex data structures. It analyzes all levels of nesting to create a complete schema.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our <strong>JSON Schema Generator</strong> is a free online tool that automatically generates JSON Schema from sample JSON. 
              Perfect for API documentation, data validation, and ensuring consistent data structures.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Use our <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Schema Generator</Link> to create schemas instantly. 
              Supports JSON Schema Draft 7 and OpenAPI formats. Validate JSON against schemas. No signup required, 100% free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Automatic Generation</h3>
                <p className="text-sm text-gray-700">Analyzes your JSON and generates a complete schema automatically</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Multiple Formats</h3>
                <p className="text-sm text-gray-700">Supports JSON Schema Draft 7 and OpenAPI Schema formats</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Built-in Validator</h3>
                <p className="text-sm text-gray-700">Validate any JSON against your generated schema</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <CheckCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Smart Detection</h3>
                <p className="text-sm text-gray-700">Automatically detects types, formats (email, URI, date), and required fields</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Paste Your JSON</h3>
                  <p className="text-gray-700 text-sm">Paste your sample JSON object or array into the generator</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Choose Format</h3>
                  <p className="text-gray-700 text-sm">Select JSON Schema Draft 7 or OpenAPI Schema format</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Generate Schema</h3>
                  <p className="text-gray-700 text-sm">Click Generate and get your complete JSON Schema instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Validate & Download</h3>
                  <p className="text-gray-700 text-sm">Validate JSON against your schema, copy, or download the schema file</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: JSON Schema Generation</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Sample JSON:</p>
                <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true
}`}
                </pre>
              </div>
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <p className="font-semibold text-green-900 mb-2">Generated JSON Schema (Draft 7):</p>
                <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer" },
    "active": { "type": "boolean" }
  },
  "required": ["name", "email", "age", "active"]
}`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <FileCode className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Generate JSON Schema Instantly</h2>
                <p className="text-purple-100">
                  Use our free JSON Schema Generator to create schemas from your JSON in seconds. No coding required.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Try JSON Schema Generator Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

