'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, FileCheck, Server } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToValidateApiResponseUsingJsonSchemaClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Validate API Response Using JSON Schema</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to API Response Validation with JSON Schema (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I validate API response using JSON Schema?',
              answer: 'Use a JSON Schema validation library like ajv (JavaScript), jsonschema (Python), or json-schema-validator (Java). Create a schema defining the expected API response structure, then validate the response data against the schema. This ensures the API returns data in the expected format with correct types and required fields.',
            },
            {
              question: 'What is the best library to validate API responses?',
              answer: 'For JavaScript/Node.js: ajv (Another JSON Schema Validator) is the fastest and most popular. For Python: jsonschema library. For Java: json-schema-validator. For automated API testing: Postman, Jest with ajv, or pytest with jsonschema. Choose based on your tech stack and performance requirements.',
            },
            {
              question: 'Why should I validate API responses?',
              answer: 'Validating API responses ensures data integrity, catches breaking changes early, improves error handling, prevents runtime errors, and maintains API contract compliance. It helps detect when APIs return unexpected data structures, missing fields, or incorrect data types before they cause issues in production.',
            },
            {
              question: 'How do I create a JSON Schema for API response?',
              answer: 'Define a JSON Schema object with type, properties, required fields, and validation rules. Example: {"type": "object", "properties": {"id": {"type": "number"}, "name": {"type": "string"}}, "required": ["id", "name"]}. Use online tools or generate schemas from sample API responses.',
            },
            {
              question: 'Can I validate API responses in automated tests?',
              answer: 'Yes, integrate JSON Schema validation into your API tests using Jest (JavaScript), pytest (Python), or JUnit (Java). Validate responses in unit tests, integration tests, and end-to-end tests. Use tools like Postman, Newman, or REST Assured for automated API testing with schema validation.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is API Response Validation Using JSON Schema?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>API Response Validation Using JSON Schema</strong> is the process of verifying that API responses conform to a predefined JSON Schema structure. JSON Schema is a vocabulary that describes the expected structure, data types, formats, and constraints of JSON data, acting as a contract between API consumers and providers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This validation ensures that API responses contain the expected fields, use correct data types (string, number, boolean, object, array), meet format requirements (email, date, URI), and satisfy constraints (minimum/maximum values, string length, pattern matching). Validation can be performed at runtime in applications, during automated testing, or in API monitoring tools.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              API response validation using JSON Schema is essential for maintaining data integrity, catching breaking changes early, preventing runtime errors, and ensuring API contract compliance. It serves as a safety net that validates data before it's processed by your application, reducing bugs and improving reliability.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> API response validation using JSON Schema verifies that API responses match expected structures and data types. It acts as a contract between API consumers and providers, ensuring data integrity and preventing runtime errors from unexpected response formats.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding API Response Validation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              API response validation using JSON Schema involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  JSON Schema Definition
                </h3>
                <p className="text-gray-700 text-sm mb-2">A JSON Schema is a JSON object that describes the structure of valid JSON data. It defines properties, data types, required fields, formats, constraints, and nested structures. Schemas can be simple (single object) or complex (nested objects, arrays, conditional validation).</p>
                <p className="text-gray-600 text-xs">Example: Schema defines that a user object must have id (number), name (string), and email (string with email format)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Validation Library
                </h3>
                <p className="text-gray-700 text-sm mb-2">Validation libraries (ajv, jsonschema, json-schema-validator) compile schemas and validate JSON data against them. They check data types, required fields, formats, constraints, and nested structures. Libraries return validation results with detailed error messages.</p>
                <p className="text-gray-600 text-xs">Example: ajv validates JavaScript objects, jsonschema validates Python dictionaries, json-schema-validator validates Java objects</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-600" />
                  API Response Data
                </h3>
                <p className="text-gray-700 text-sm mb-2">API responses are JSON data returned from REST APIs, GraphQL APIs, or other HTTP endpoints. Response data can be objects, arrays, or primitives. Validation checks if response data matches the expected schema structure and constraints.</p>
                <p className="text-gray-600 text-xs">Example: API returns {'{'}"id": 1, "name": "John", "email": "john@example.com"{'}'} which is validated against user schema</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Validation Results
                </h3>
                <p className="text-gray-700 text-sm mb-2">Validation returns a boolean (valid/invalid) and detailed error messages. Errors specify which fields failed validation, why they failed (wrong type, missing required field, constraint violation), and how to fix them. Results are used for error handling and debugging.</p>
                <p className="text-gray-600 text-xs">Example: Validation fails with error: "email" must be a valid email format, "age" must be greater than 0</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Understanding JSON Schema structure, validation libraries, and error handling is key to effective API response validation. Schemas define contracts, libraries perform validation, and error messages guide fixes.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Validate API Responses</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You should validate API responses in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Integration Development</h3>
                  <p className="text-gray-700 text-sm">When integrating third-party APIs or building API clients, validate responses to ensure data matches expected structures. This catches integration issues early and prevents runtime errors from unexpected response formats.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Automated API Testing</h3>
                  <p className="text-gray-700 text-sm">When writing API tests (unit, integration, E2E), validate responses to ensure APIs return correct data structures. Schema validation in tests catches breaking changes and ensures API contract compliance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Monitoring and Health Checks</h3>
                  <p className="text-gray-700 text-sm">When monitoring API health or implementing health checks, validate responses to detect API issues, breaking changes, or data corruption. Schema validation in monitoring catches problems before they affect users.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Data Processing Pipelines</h3>
                  <p className="text-gray-700 text-sm">When processing API data in ETL pipelines, data transformations, or analytics, validate responses to ensure data quality and prevent pipeline failures from unexpected data structures.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> Validate API responses during development, testing, monitoring, and data processing. Schema validation is most critical when integrating external APIs, writing automated tests, or processing data in production pipelines.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Validate API Responses Using JSON Schema</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to validate API responses using JSON Schema:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: JavaScript/Node.js with ajv</h3>
              <p className="text-gray-700 mb-4">Validate API responses in JavaScript using ajv:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Install ajv</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`npm install ajv`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Validation Example</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Create schema
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 0 }
  },
  required: ['id', 'name', 'email']
};

// Initialize validator
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(userSchema);

// Validate API response
async function validateApiResponse() {
  const response = await fetch('https://api.example.com/users/1');
  const data = await response.json();
  
  const valid = validate(data);
  if (!valid) {
    console.error('Validation errors:', validate.errors);
    throw new Error('API response validation failed');
  }
  
  return data;
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Python with jsonschema</h3>
              <p className="text-gray-700 mb-4">Validate API responses in Python using jsonschema:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Install jsonschema</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`pip install jsonschema`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Python Validation Example</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import requests
from jsonschema import validate, ValidationError

# Define schema
user_schema = {
    "type": "object",
    "properties": {
        "id": {"type": "number"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "age": {"type": "number", "minimum": 0}
    },
    "required": ["id", "name", "email"]
}

# Validate API response
def validate_api_response():
    response = requests.get('https://api.example.com/users/1')
    data = response.json()
    
    try:
        validate(instance=data, schema=user_schema)
        return data
    except ValidationError as e:
        print(f'Validation error: {e.message}')
        raise`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Automated API Testing</h3>
              <p className="text-gray-700 mb-4">Validate API responses in automated tests:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Jest with ajv (JavaScript)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' }
  },
  required: ['id', 'name']
};

test('API response matches schema', async () => {
  const response = await fetch('https://api.example.com/users/1');
  const data = await response.json();
  
  const validate = ajv.compile(userSchema);
  const valid = validate(data);
  
  expect(valid).toBe(true);
  if (!valid) {
    console.error(validate.errors);
  }
});`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">pytest with jsonschema (Python)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import pytest
import requests
from jsonschema import validate

user_schema = {
    "type": "object",
    "properties": {
        "id": {"type": "number"},
        "name": {"type": "string"}
    },
    "required": ["id", "name"]
}

def test_api_response_schema():
    response = requests.get('https://api.example.com/users/1')
    data = response.json()
    
    validate(instance=data, schema=user_schema)
    assert data['id'] is not None
    assert data['name'] is not None`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Advanced Schema Features</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Nested Objects and Arrays</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const complexSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' }
      },
      required: ['id', 'name']
    },
    posts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' }
        },
        required: ['id', 'title']
      }
    }
  },
  required: ['user', 'posts']
};`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Conditional Validation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const conditionalSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['admin', 'user'] },
    permissions: { type: 'array' }
  },
  required: ['type'],
  if: {
    properties: { type: { const: 'admin' } }
  },
  then: {
    properties: {
      permissions: { type: 'array', minItems: 1 }
    },
    required: ['permissions']
  }
};`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Use JSON Schema validation in development, testing, and production. Create reusable schema definitions, handle validation errors gracefully, and log validation failures for debugging. Validate early to catch issues before they cause runtime errors.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Validate API Responses</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Validating API responses using JSON Schema is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Data Integrity
                </h3>
                <p className="text-gray-700 text-sm">Schema validation ensures API responses contain expected data structures, correct data types, and required fields. This prevents runtime errors from missing fields, wrong types, or unexpected data formats. Validation catches data corruption and API contract violations early.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  Early Error Detection
                </h3>
                <p className="text-gray-700 text-sm">Schema validation detects API breaking changes, unexpected response formats, and data issues before they cause production errors. Validation in tests and monitoring catches problems during development and deployment, reducing bug reports and support tickets.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-600" />
                  API Contract Compliance
                </h3>
                <p className="text-gray-700 text-sm">Schema validation enforces API contracts between consumers and providers. It ensures APIs return data matching documented schemas, maintaining consistency and reliability. Contract validation prevents integration issues and maintains API compatibility.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Improved Debugging
                </h3>
                <p className="text-gray-700 text-sm">Schema validation provides detailed error messages specifying which fields failed validation and why. This makes debugging faster and more accurate compared to generic runtime errors. Validation errors guide developers to fix issues quickly.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> Validating API responses using JSON Schema is essential for data integrity, early error detection, API contract compliance, and improved debugging. It reduces production errors, improves reliability, and maintains API compatibility.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I validate API response using JSON Schema?</h3>
                <p className="text-gray-700 leading-relaxed">Use a JSON Schema validation library like ajv (JavaScript), jsonschema (Python), or json-schema-validator (Java). Create a schema defining the expected API response structure, then validate the response data against the schema. This ensures the API returns data in the expected format with correct types and required fields.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best library to validate API responses?</h3>
                <p className="text-gray-700 leading-relaxed">For JavaScript/Node.js: ajv (Another JSON Schema Validator) is the fastest and most popular. For Python: jsonschema library. For Java: json-schema-validator. For automated API testing: Postman, Jest with ajv, or pytest with jsonschema. Choose based on your tech stack and performance requirements.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why should I validate API responses?</h3>
                <p className="text-gray-700 leading-relaxed">Validating API responses ensures data integrity, catches breaking changes early, improves error handling, prevents runtime errors, and maintains API contract compliance. It helps detect when APIs return unexpected data structures, missing fields, or incorrect data types before they cause issues in production.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I create a JSON Schema for API response?</h3>
                <p className="text-gray-700 leading-relaxed">Define a JSON Schema object with type, properties, required fields, and validation rules. Example: {"{"}"type": "object", "properties": {"{"}"id": {"{"}"type": "number"{"}"}, "name": {"{"}"type": "string"{"}"}{"}"}, "required": ["id", "name"]{"}"}. Use online tools or generate schemas from sample API responses.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I validate API responses in automated tests?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, integrate JSON Schema validation into your API tests using Jest (JavaScript), pytest (Python), or JUnit (Java). Validate responses in unit tests, integration tests, and end-to-end tests. Use tools like Postman, Newman, or REST Assured for automated API testing with schema validation.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Validate API Response Using JSON Schema Guide" />
        </section>
      </main>
    </div>
  );
}
