'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumb from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';

const SchemaGenerator = dynamic(() => import('@/components/tools/SchemaGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});

export default function JsonSchemaGenerationClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools/json' }, { label: 'JSON', href: '/tools/json' }, { label: 'JSON schema generator' }]} />
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">JSON Schema Generator - Generate Schemas Instantly</h1>
          <p className="text-sm text-gray-500 mt-1">Generate JSON Schema from sample JSON automatically. Supports Draft 7 and OpenAPI formats.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Component */}
        <div className="mb-8">
          <SchemaGenerator />
        </div>
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
        {/* SEO Content Section - 1000-1200 words */}
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Problem Does JSON Schema Generator Solve?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Creating JSON schemas manually is time-consuming and error-prone, especially for complex nested structures. JSON schemas 
              are essential for API documentation, data validation, and ensuring consistent data structures, but writing them from 
              scratch requires deep knowledge of JSON Schema syntax and careful attention to detail.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The core problem:</strong> Without a schema generator, developers struggle with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Manually writing JSON schemas which is tedious and error-prone</li>
              <li>Understanding complex JSON Schema syntax and structure</li>
              <li>Creating schemas for nested objects and arrays correctly</li>
              <li>Ensuring schemas match actual JSON data structures</li>
              <li>Time-consuming schema creation for large JSON objects</li>
              <li>Difficulty maintaining schemas when JSON structures change</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our JSON Schema Generator solves all these problems by automatically analyzing your JSON and generating complete, 
              accurate schemas instantly. Simply paste your JSON, and the generator creates a schema that matches your data structure 
              perfectly. This saves hours of manual work and ensures your schemas are always accurate.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Real-World Example</p>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Scenario:</strong> You need to document your API response structure with a JSON schema.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Solution:</strong> Paste a sample API response into our generator. It instantly creates a complete JSON 
                Schema with all fields, types, and constraints, ready for API documentation.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Is JSON Schema Generator For?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              JSON Schema Generator is essential for anyone who needs to create, document, or validate JSON data structures:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">API Developers</h3>
                <p className="text-gray-700 mb-3">
                  API developers need JSON schemas for API documentation, request/response validation, and OpenAPI specifications. 
                  A schema generator helps them create accurate schemas quickly without manual coding.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> API documentation, OpenAPI specs, request validation, response validation
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Backend Developers</h3>
                <p className="text-gray-700 mb-3">
                  Backend developers use JSON schemas for data validation, API contracts, and ensuring data consistency. A schema 
                  generator helps them create schemas from existing data structures quickly.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Data validation, API contracts, schema-first development, data modeling
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Frontend Developers</h3>
                <p className="text-gray-700 mb-3">
                  Frontend developers need schemas to understand API responses and validate data. A schema generator helps them 
                  create schemas from API responses for type safety and validation.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> API integration, type generation, data validation, TypeScript types
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">QA Engineers</h3>
                <p className="text-gray-700 mb-3">
                  QA engineers use JSON schemas to validate API responses and test data structures. A schema generator helps them 
                  create test schemas and validate responses against expected structures.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> API testing, response validation, test data validation, contract testing
                </p>
              </div>
            </div>
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features of Our JSON Schema Generator</h2>
            <div className="space-y-4">
              <div className="p-5 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Automatic Schema Generation</h3>
                <p className="text-gray-700 text-sm">
                  Automatically analyzes your JSON and generates complete schemas with types, formats, and constraints. Handles 
                  nested objects, arrays, and complex structures automatically.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Schema Formats</h3>
                <p className="text-gray-700 text-sm">
                  Support for JSON Schema Draft 7 (most widely used) and OpenAPI Schema format. Generate schemas in the format 
                  that works best for your use case.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Built-in Validator</h3>
                <p className="text-gray-700 text-sm">
                  Validate any JSON against your generated schema instantly. Test schemas, verify data structures, and ensure 
                  JSON matches expected formats.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Smart Type Detection</h3>
                <p className="text-gray-700 text-sm">
                  Automatically detects data types, formats (email, URI, date), required fields, and constraints. Creates accurate 
                  schemas that match your data perfectly.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy-First</h3>
                <p className="text-gray-700 text-sm">
                  All schema generation happens in your browser. No data is sent to servers. Your JSON stays private and secure. 
                  Perfect for sensitive data or confidential structures.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Guides and Resources</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn more about JSON schemas, validation, and best practices with these comprehensive guides:
            </p>
            
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-validate-json-schema-javascript" className="text-blue-600 hover:text-blue-700 underline">
                    How to Validate JSON Schema in JavaScript
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to validate JSON data against schemas using JavaScript. Understand validation libraries, 
                  error handling, and best practices for JSON validation.
                </p>
                <p className="text-xs text-gray-600">Covers: JSON validation, schema validation, JavaScript libraries, error handling</p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-validate-api-response-using-json-schema" className="text-green-600 hover:text-green-700 underline">
                    How to Validate API Response Using JSON Schema
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to validate API responses against JSON schemas. Understand validation strategies, error handling, 
                  and best practices for API response validation.
                </p>
                <p className="text-xs text-gray-600">Covers: API validation, JSON schema, response validation, testing</p>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/json-schema-generation-complete-guide" className="text-purple-600 hover:text-purple-700 underline">
                    JSON Schema Generation: Complete Guide
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Complete guide to JSON schema generation. Learn how to create schemas, understand schema syntax, and use 
                  schemas for validation and documentation.
                </p>
                <p className="text-xs text-gray-600">Covers: Schema generation, JSON schema, API documentation, validation</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enhance your JSON workflow with these complementary tools:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/json-validator" className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Validator</h3>
                <p className="text-sm text-gray-700">Validate JSON against schemas</p>
              </Link>
              <Link href="/json-beautifier" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Beautifier</h3>
                <p className="text-sm text-gray-700">Format JSON data structures</p>
              </Link>
              <Link href="/json-fixer-online" className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Fixer</h3>
                <p className="text-sm text-gray-700">Fix broken JSON before generating schemas</p>
              </Link>
              <Link href="/json-builder" className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Builder</h3>
                <p className="text-sm text-gray-700">Build JSON structures interactively</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

