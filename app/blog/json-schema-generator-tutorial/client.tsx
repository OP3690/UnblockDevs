'use client';

import Link from 'next/link';
import { ArrowLeft, FileCode, Copy, CheckCircle, ExternalLink, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function JsonSchemaGeneratorTutorialClient() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const sampleData = [
    {
      id: 'user',
      title: 'User Object',
      json: JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        active: true,
        createdAt: '2024-01-15T10:30:00Z'
      }, null, 2),
      schema: JSON.stringify({
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          age: { type: 'integer', minimum: 0 },
          active: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' }
        },
        required: ['id', 'name', 'email', 'age', 'active', 'createdAt']
      }, null, 2)
    },
    {
      id: 'product',
      title: 'Product Array',
      json: JSON.stringify([
        { id: 1, name: 'Laptop', price: 999.99, inStock: true },
        { id: 2, name: 'Mouse', price: 25.50, inStock: false }
      ], null, 2),
      schema: JSON.stringify({
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            price: { type: 'number' },
            inStock: { type: 'boolean' }
          },
          required: ['id', 'name', 'price', 'inStock']
        }
      }, null, 2)
    },
    {
      id: 'nested',
      title: 'Nested Object',
      json: JSON.stringify({
        user: {
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            address: {
              street: '123 Main St',
              city: 'New York',
              zipCode: '10001'
            }
          }
        }
      }, null, 2),
      schema: JSON.stringify({
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              profile: {
                type: 'object',
                properties: {
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  address: {
                    type: 'object',
                    properties: {
                      street: { type: 'string' },
                      city: { type: 'string' },
                      zipCode: { type: 'string' }
                    },
                    required: ['street', 'city', 'zipCode']
                  }
                },
                required: ['firstName', 'lastName', 'address']
              }
            },
            required: ['profile']
          }
        },
        required: ['user']
      }, null, 2)
    }
  ];

  const validJson = JSON.stringify({ name: 'John', email: 'john@example.com', age: 30 }, null, 2);
  const invalidJson = JSON.stringify({ name: 'John', email: 'invalid-email', age: 'thirty' }, null, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileCode className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">JSON Schema Generator Tutorial</h1>
              <p className="text-sm text-gray-500 mt-1">Create Schemas from JSON - Complete Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="JSON Schema Generator Tutorial"
        description="Create Schemas from JSON - Complete Guide"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is JSON Schema and why do I need it?',
              answer: 'JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It helps ensure data consistency, provides documentation, and enables automatic validation of API requests and responses.',
            },
            {
              question: 'How do I generate a JSON Schema from sample JSON?',
              answer: 'Use our free JSON Schema Generator tool. Simply paste your sample JSON, choose your preferred format (Draft 7 or OpenAPI), and click Generate. The tool automatically analyzes your JSON structure and creates a complete schema.',
            },
            {
              question: 'What is the difference between JSON Schema Draft 7 and OpenAPI Schema?',
              answer: 'JSON Schema Draft 7 is the standard JSON Schema format used for validation. OpenAPI Schema is a variant used in OpenAPI/Swagger specifications for API documentation. Both are compatible, but OpenAPI Schema is optimized for API documentation.',
            },
            {
              question: 'Can I validate JSON against a generated schema?',
              answer: 'Yes! Our JSON Schema Generator includes a built-in validator. After generating a schema, paste any JSON to validate it against the schema and see detailed error messages if validation fails.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              JSON Schema is a powerful tool for validating and documenting JSON data structures. Whether you're building APIs, 
              working with configuration files, or ensuring data consistency, JSON Schema helps you define the structure your JSON must follow.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this comprehensive tutorial, we'll show you how to generate JSON Schema from sample JSON, validate JSON against schemas, 
              and use schemas in your applications. Use our free <Link href="/" className="text-blue-600 hover:underline font-semibold">JSON Schema Generator</Link> to create schemas instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is JSON Schema?</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="text-gray-700 mb-3">
                <strong>JSON Schema</strong> is a specification for describing the structure of JSON data. It allows you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Define required and optional fields</li>
                <li>Specify data types (string, number, boolean, object, array)</li>
                <li>Set validation rules (min/max values, patterns, formats)</li>
                <li>Document your data structure</li>
                <li>Validate JSON at runtime</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try These Sample Data Examples</h2>
            <p className="text-gray-700 mb-6">
              Copy these examples and paste them into our <Link href="/" className="text-blue-600 hover:underline">JSON Schema Generator</Link> to see how schemas are created:
            </p>
            <div className="space-y-6">
              {sampleData.map((example) => (
                <div key={example.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{example.title}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-blue-900 text-sm">Sample JSON:</p>
                        <button
                          onClick={() => copyToClipboard(example.json, `${example.id}-json`)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {copiedExample === `${example.id}-json` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="bg-white p-3 rounded border border-blue-200 text-xs overflow-x-auto max-h-64 overflow-y-auto">
                        <code>{example.json}</code>
                      </pre>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-green-900 text-sm">Generated Schema:</p>
                        <button
                          onClick={() => copyToClipboard(example.schema, `${example.id}-schema`)}
                          className="text-green-600 hover:text-green-700"
                        >
                          {copiedExample === `${example.id}-schema` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="bg-white p-3 rounded border border-green-200 text-xs overflow-x-auto max-h-64 overflow-y-auto">
                        <code>{example.schema}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Tip:</strong> Copy the JSON above and paste it into our <Link href="/" className="font-semibold underline">JSON Schema Generator</Link> to see the schema generation in action!
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: Generate Your First Schema</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prepare Your Sample JSON</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Start with a representative JSON object or array. Include all fields you want in your schema, even if some are null or empty.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <pre className="text-xs overflow-x-auto">
{`{
  "name": "John",
  "email": "john@example.com",
  "age": 30
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Choose Schema Format</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Select JSON Schema Draft 7 (for validation) or OpenAPI Schema (for API documentation).
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="font-semibold text-sm text-blue-900 mb-1">Draft 7</p>
                      <p className="text-xs text-blue-700">Best for validation and general use</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="font-semibold text-sm text-green-900 mb-1">OpenAPI</p>
                      <p className="text-xs text-green-700">Best for API documentation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generate Schema</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Click Generate and our tool automatically analyzes your JSON structure, detects types, formats, and required fields.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Validate & Use</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Use the built-in validator to test JSON against your schema, then copy or download the schema for use in your application.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Validation Examples</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">Valid JSON</h3>
                </div>
                <p className="text-sm text-green-800 mb-3">This JSON matches the schema requirements:</p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <pre className="text-xs flex-1 overflow-x-auto">
                      <code>{validJson}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(validJson, 'valid-json')}
                      className="ml-2 text-green-600 hover:text-green-700"
                    >
                      {copiedExample === 'valid-json' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-900">Invalid JSON</h3>
                </div>
                <p className="text-sm text-red-800 mb-3">This JSON fails validation (invalid email format, wrong age type):</p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <pre className="text-xs flex-1 overflow-x-auto">
                      <code>{invalidJson}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(invalidJson, 'invalid-json')}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      {copiedExample === 'invalid-json' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-red-700 mt-2">
                  <strong>Errors:</strong> email format invalid, age should be integer not string
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">API Documentation</h3>
                <p className="text-sm text-gray-700">
                  Generate schemas for API request/response bodies. Use with OpenAPI/Swagger for complete API documentation.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Data Validation</h3>
                <p className="text-sm text-gray-700">
                  Validate user input, configuration files, or API responses against schemas to ensure data consistency.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Type Generation</h3>
                <p className="text-sm text-gray-700">
                  Use schemas to generate TypeScript types, Python dataclasses, or other language-specific types automatically.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Testing</h3>
                <p className="text-sm text-gray-700">
                  Create test data that matches your schema or validate test responses against expected schemas.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <FileCode className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Generate JSON Schema Instantly</h2>
                <p className="text-purple-100">
                  Use our free JSON Schema Generator to create schemas from your JSON in seconds. 
                  Supports Draft 7 and OpenAPI formats with built-in validation.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=schema"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Try JSON Schema Generator Now
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/json-schema-generation" className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Schema Generation Tool</h3>
                <p className="text-sm text-gray-600">Free online JSON Schema generator with validation</p>
              </Link>
              <Link href="/blog/json-schema-generator-validation-guide" className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Schema Validation Guide</h3>
                <p className="text-sm text-gray-600">Learn how to validate JSON against schemas</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

