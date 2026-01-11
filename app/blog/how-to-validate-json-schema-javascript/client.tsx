'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Globe, FileCheck } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToValidateJsonSchemaJavaScriptClient() {
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
              <h1 className="text-3xl font-bold text-gray-900">How to Validate JSON Schema in JavaScript</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to JSON Schema Validation in JavaScript (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Validate JSON Schema in JavaScript"
        description="Complete Guide to JSON Schema Validation in JavaScript (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I validate JSON schema in JavaScript?',
              answer: 'Use a JSON Schema validation library like ajv or jsonschema. With ajv: import Ajv from "ajv"; const ajv = new Ajv(); const validate = ajv.compile(schema); const valid = validate(data). If valid is true, data matches the schema. Check validate.errors for validation errors.',
            },
            {
              question: 'What is the best JSON schema validator for JavaScript?',
              answer: 'ajv (Another JSON Schema Validator) is the most popular and fastest JSON Schema validator for JavaScript. It supports JSON Schema draft-04, draft-06, draft-07, and draft-2019-09. It\'s lightweight, fast, and has excellent TypeScript support.',
            },
            {
              question: 'How do I validate JSON data against a schema?',
              answer: 'Create a JSON Schema object defining the expected structure, then use a validator library to check if your JSON data matches the schema. The schema defines required fields, data types, formats, constraints, and nested structures.',
            },
            {
              question: 'What is JSON Schema?',
              answer: 'JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It describes the structure of JSON data, including required fields, data types, formats, constraints, and validation rules. It\'s like a blueprint for JSON data.',
            },
            {
              question: 'How do I handle validation errors in JavaScript?',
              answer: 'Check the validation result and access error details. With ajv: if (!valid) then console.log(validate.errors). Errors include the path to the invalid field, the error message, and the schema path. Use this information to provide user-friendly error messages.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is JSON Schema Validation?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>JSON Schema validation</strong> is the process of checking whether JSON data conforms to a predefined schema (structure and rules). JSON Schema is a vocabulary that allows you to annotate and validate JSON documents, describing the expected structure, data types, formats, and constraints of JSON data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A JSON Schema is itself a JSON object that defines the rules for validating JSON data. It specifies required properties, data types (string, number, boolean, object, array), formats (email, date, URI), constraints (minimum, maximum, pattern), and nested structures. Validation libraries compare JSON data against the schema to ensure it meets all requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON Schema validation is essential for API development, data processing, form validation, and ensuring data integrity. It helps catch errors early, provides clear error messages, and ensures data consistency across applications. Popular validation libraries include ajv (Another JSON Schema Validator) and jsonschema.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> JSON Schema validation ensures data integrity by checking that JSON data matches expected structure and rules before processing. It prevents errors, improves data quality, and provides clear validation feedback.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding JSON Schema Validation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON Schema validation involves several components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  JSON Schema Definition
                </h3>
                <p className="text-gray-700 text-sm mb-2">A JSON Schema is a JSON object that defines the structure and validation rules for JSON data. It includes properties like <code className="bg-gray-100 px-1 rounded">type</code>, <code className="bg-gray-100 px-1 rounded">properties</code>, <code className="bg-gray-100 px-1 rounded">required</code>, <code className="bg-gray-100 px-1 rounded">format</code>, and constraints like <code className="bg-gray-100 px-1 rounded">minimum</code>, <code className="bg-gray-100 px-1 rounded">maximum</code>, <code className="bg-gray-100 px-1 rounded">pattern</code>.</p>
                <p className="text-gray-600 text-xs">Example: {"{"} "type": "object", "properties": {"{"} "name": {"{"} "type": "string" {"}"} {"}"} {"}"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Validation Libraries
                </h3>
                <p className="text-gray-700 text-sm mb-2">Validation libraries like ajv and jsonschema compare JSON data against schemas. They check data types, required fields, formats, constraints, and nested structures. They return validation results and detailed error messages for invalid data.</p>
                <p className="text-gray-600 text-xs">Popular libraries: ajv (fastest), jsonschema (simple), tv4 (lightweight)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  Validation Process
                </h3>
                <p className="text-gray-700 text-sm mb-2">The validation process: 1) Define a JSON Schema, 2) Load the schema into a validator, 3) Validate JSON data against the schema, 4) Check the validation result, 5) Handle errors if validation fails. Validators return boolean results and detailed error information.</p>
                <p className="text-gray-600 text-xs">Process: Schema → Validator → Data → Result (valid/invalid + errors)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Error Handling
                </h3>
                <p className="text-gray-700 text-sm mb-2">Validation errors include the path to invalid fields, error messages, and schema paths. Error objects contain properties like <code className="bg-gray-100 px-1 rounded">instancePath</code>, <code className="bg-gray-100 px-1 rounded">message</code>, <code className="bg-gray-100 px-1 rounded">params</code>, and <code className="bg-gray-100 px-1 rounded">schemaPath</code> for debugging and user feedback.</p>
                <p className="text-gray-600 text-xs">Errors help identify which fields are invalid and why validation failed.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> JSON Schema validation ensures data quality and consistency. It catches errors early, provides clear feedback, and helps maintain data integrity across applications. Choose the right validation library based on your needs (speed, features, bundle size).
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Validate JSON Schema</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You should validate JSON schema in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">API Request Validation</h3>
                  <p className="text-gray-700 text-sm">When building REST APIs or web services, validate incoming JSON request data against schemas to ensure required fields are present, data types are correct, and constraints are met. This prevents invalid data from reaching your application logic.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Form Data Validation</h3>
                  <p className="text-gray-700 text-sm">When processing form submissions or user input, validate JSON data to ensure it matches expected structure and rules. This provides immediate feedback to users and prevents invalid data from being stored or processed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Data Import and Processing</h3>
                  <p className="text-gray-700 text-sm">When importing or processing JSON data from external sources (files, APIs, databases), validate the data structure to ensure it matches expected format. This catches data quality issues early and prevents processing errors.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Configuration File Validation</h3>
                  <p className="text-gray-700 text-sm">When loading configuration files in JSON format, validate them against schemas to ensure all required settings are present and values are within acceptable ranges. This prevents configuration errors that could break your application.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Common Scenario:</strong> JSON Schema validation is most common in API development, form processing, and data import workflows. It ensures data quality and prevents errors before data reaches your application logic.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step JSON Schema Validation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these methods to validate JSON schema in JavaScript:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Using ajv (Another JSON Schema Validator)</h3>
              <p className="text-gray-700 mb-4">ajv is the fastest and most popular JSON Schema validator for JavaScript:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Installation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`npm install ajv
# or
yarn add ajv`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Validation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';

// Define JSON Schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number', minimum: 0, maximum: 150 },
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'email'],
  additionalProperties: false
};

// Create validator
const ajv = new Ajv();
const validate = ajv.compile(schema);

// JSON data to validate
const data = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

// Validate
const valid = validate(data);

if (valid) {
  console.log('Valid JSON data');
} else {
  console.log('Validation errors:', validate.errors);
}`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Error Handling</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true }); // Show all errors
const validate = ajv.compile(schema);

const data = { name: 'John' }; // Missing required 'email'

if (!validate(data)) {
  validate.errors.forEach(error => {
    console.log('Error at ' + error.instancePath + ': ' + error.message);
    console.log('Schema path:', error.schemaPath);
    console.log('Params:', error.params);
  });
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Using jsonschema Library</h3>
              <p className="text-gray-700 mb-4">jsonschema is a simple and straightforward JSON Schema validator:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Installation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`npm install jsonschema
# or
yarn add jsonschema`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Validation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`const Validator = require('jsonschema').Validator;
const v = new Validator();

// Define schema
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    age: { type: 'number', minimum: 0 },
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'email']
};

// Validate
const result = v.validate(data, schema);

if (result.valid) {
  console.log('Valid JSON data');
} else {
  console.log('Validation errors:', result.errors);
  result.errors.forEach(error => {
    console.log(error.property + ': ' + error.message);
  });
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Advanced Schema Examples</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Nested Objects and Arrays</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';

const schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: {
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            zipCode: { type: 'string', pattern: '^[0-9]{5}$' }
          },
          required: ['street', 'city']
        }
      },
      required: ['name']
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true
    }
  },
  required: ['user']
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

const data = {
  user: {
    name: 'John',
    address: {
      street: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    }
  },
  tags: ['developer', 'javascript']
};

const valid = validate(data);`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Custom Format Validation</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv); // Add format validation (email, date, etc.)

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    date: { type: 'string', format: 'date' },
    uri: { type: 'string', format: 'uri' },
    uuid: { type: 'string', format: 'uuid' }
  }
};

const validate = ajv.compile(schema);`}</code></pre>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Async Validation with Remote Schemas</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                  <pre className="text-sm"><code>{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ loadSchema: loadSchema });
addFormats(ajv);

async function loadSchema(uri) {
  const response = await fetch(uri);
  return response.json();
}

// Schema with reference (use $ref in actual code)
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
};

const validate = await ajv.compileAsync(schema);
const valid = validate(data);`}</code></pre>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-800 text-sm">
                <strong>Best Practice:</strong> Always validate JSON data before processing, handle validation errors gracefully, provide clear error messages to users, and use appropriate validation libraries based on your needs (ajv for speed, jsonschema for simplicity).
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Validate JSON Schema</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Validating JSON schema is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Data Integrity
                </h3>
                <p className="text-gray-700 text-sm">JSON Schema validation ensures data integrity by checking that JSON data matches expected structure and rules. It prevents invalid data from entering your system and causing errors or data corruption.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  Early Error Detection
                </h3>
                <p className="text-gray-700 text-sm">Validation catches errors early in the data processing pipeline, before data reaches your application logic. This prevents runtime errors, reduces debugging time, and improves application reliability.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  API Security
                </h3>
                <p className="text-gray-700 text-sm">Validating API requests ensures that incoming data matches expected structure, preventing malformed requests and potential security vulnerabilities. It's a first line of defense against invalid or malicious input.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  Clear Error Messages
                </h3>
                <p className="text-gray-700 text-sm">JSON Schema validation provides detailed error messages that identify which fields are invalid and why. This helps developers debug issues and provides users with clear feedback about data validation problems.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> JSON Schema validation is essential for building robust applications. It ensures data quality, prevents errors, improves security, and provides clear feedback. Always validate JSON data before processing, especially when receiving data from external sources.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best JSON schema validator for JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed"><strong>ajv</strong> (Another JSON Schema Validator) is the most popular and fastest JSON Schema validator for JavaScript. It supports JSON Schema draft-04, draft-06, draft-07, and draft-2019-09. It's lightweight, fast, and has excellent TypeScript support. For simpler use cases, <code className="bg-gray-100 px-1 rounded">jsonschema</code> is also a good choice.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I validate nested JSON objects?</h3>
                <p className="text-gray-700 leading-relaxed">Define nested schemas using the <code className="bg-gray-100 px-1 rounded">properties</code> keyword within parent object schemas. For nested objects, create a schema object with its own <code className="bg-gray-100 px-1 rounded">type: "object"</code> and <code className="bg-gray-100 px-1 rounded">properties</code>. Validators automatically validate nested structures recursively.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I validate JSON arrays with JSON Schema?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, use <code className="bg-gray-100 px-1 rounded">type: "array"</code> with the <code className="bg-gray-100 px-1 rounded">items</code> keyword to define the schema for array elements. You can also use <code className="bg-gray-100 px-1 rounded">minItems</code>, <code className="bg-gray-100 px-1 rounded">maxItems</code>, and <code className="bg-gray-100 px-1 rounded">uniqueItems</code> to add constraints to arrays.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I handle validation errors in JavaScript?</h3>
                <p className="text-gray-700 leading-relaxed">Check the validation result and access error details. With ajv: <code className="bg-gray-100 px-1 rounded">if (!valid) then console.log(validate.errors)</code>. Errors include the path to invalid fields, error messages, and schema paths. Use this information to provide user-friendly error messages or log debugging information.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What JSON Schema versions are supported?</h3>
                <p className="text-gray-700 leading-relaxed">Most validators support JSON Schema draft-04, draft-06, draft-07, and draft-2019-09. ajv supports all these versions and can be configured to use specific drafts. Check your validator library documentation for supported versions and how to specify the draft version.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="How to Validate JSON Schema in JavaScript"
            description="Complete Guide to JSON Schema Validation in JavaScript (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Validate JSON Schema in JavaScript Guide" />
        </section>
      </main>
    </div>
  );
}
