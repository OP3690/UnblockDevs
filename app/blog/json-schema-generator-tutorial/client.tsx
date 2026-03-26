'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function JsonSchemaGeneratorTutorialClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Schema Generator Tutorial — Validate Any JSON Structure</h1>
      <p className="lead">
        JSON Schema lets you define the exact structure, types, and constraints for your JSON
        data. Once defined, you can validate any JSON against it automatically. This tutorial
        covers writing schemas from scratch and generating them from sample data.
      </p>

      <StatGrid stats={[
        { value: 'Draft 2020-12', label: 'latest JSON Schema specification', color: 'blue' },
        { value: 'Ajv', label: 'most popular JSON Schema validator (JavaScript)', color: 'green' },
        { value: 'Auto-generate', label: 'tools that create schema from sample JSON', color: 'purple' },
        { value: 'OpenAPI', label: 'uses JSON Schema for API documentation', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="JSON Schema Basics" />
      <QuickFact>
        A JSON Schema is a JSON document that describes the structure of another JSON document.
        It defines what types are allowed, which fields are required, what values are valid,
        and how nested objects are structured. Validation engines check JSON against the schema
        and report detailed errors when data doesn't match.
      </QuickFact>

      <CodeBlock language="json" filename="JSON Schema for a user object">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/user.json",
  "title": "User",
  "description": "A user object in our system",
  "type": "object",
  "required": ["id", "email", "name"],
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1,
      "description": "Unique user identifier"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "User email address"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "role": {
      "type": "string",
      "enum": ["admin", "user", "moderator"]
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "uniqueItems": true
    },
    "address": {
      "type": "object",
      "required": ["city", "country"],
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string", "minLength": 2, "maxLength": 2 }
      }
    }
  },
  "additionalProperties": false
}`}
      </CodeBlock>

      <SectionHeader number={2} title="Validating JSON with Ajv (JavaScript)" />
      <CodeBlock language="javascript" filename="Validate JSON against schema with Ajv">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats'; // for email, date, uri formats

const ajv = new Ajv({ allErrors: true }); // show all errors, not just first
addFormats(ajv);

const userSchema = {
  type: 'object',
  required: ['id', 'email', 'name'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 1 },
    role: { type: 'string', enum: ['admin', 'user'] },
  },
  additionalProperties: false,
};

const validate = ajv.compile(userSchema);

// Valid data
const validUser = { id: 1, email: 'alice@example.com', name: 'Alice', role: 'admin' };
console.log(validate(validUser));  // true

// Invalid data
const invalidUser = { id: 0, email: 'not-an-email', name: '' };
console.log(validate(invalidUser));  // false
console.log(validate.errors);
// [
//   { message: 'must be >= 1', instancePath: '/id' },
//   { message: 'must match format "email"', instancePath: '/email' },
//   { message: 'must NOT have fewer than 1 characters', instancePath: '/name' },
//   { message: 'must have required property \'role\'', instancePath: '' }
// ]`}
      </CodeBlock>

      <SectionHeader number={3} title="Auto-Generate Schema from Sample JSON" />
      <CodeBlock language="python" filename="Generate schema from example data (Python)">
{`# pip install genson
from genson import SchemaBuilder
import json

# Sample JSON data
sample_data = {
    "id": 123,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "scores": [95, 87, 92],
    "active": True,
    "address": {
        "city": "Boston",
        "country": "USA"
    }
}

# Build schema from sample
builder = SchemaBuilder()
builder.add_object(sample_data)
schema = builder.to_schema()

print(json.dumps(schema, indent=2))
# {
#   "$schema": "http://json-schema.org/schema#",
#   "type": "object",
#   "properties": {
#     "id": {"type": "integer"},
#     "name": {"type": "string"},
#     "email": {"type": "string"},
#     "scores": {"type": "array", "items": {"type": "integer"}},
#     "active": {"type": "boolean"},
#     "address": {
#       "type": "object",
#       "properties": {
#         "city": {"type": "string"},
#         "country": {"type": "string"}
#       },
#       "required": ["city", "country"]
#     }
#   },
#   "required": ["id", "name", ...]
# }

# Add more samples to handle union types
builder.add_object({"id": "abc123", "name": "Bob"})  # id could be string too
# Schema becomes: "id": {"type": ["integer", "string"]}`}
      </CodeBlock>

      <SectionHeader number={4} title="Key JSON Schema Keywords" />
      <KeyPointsGrid columns={2} items={[
        { title: 'type', description: '"string", "number", "integer", "boolean", "array", "object", "null". Can be an array: ["string", "null"] for nullable fields.' },
        { title: 'required', description: 'Array of property names that must be present: "required": ["id", "email"]. Missing required property = validation error.' },
        { title: 'enum', description: 'Restrict value to one of a specific set: "enum": ["active", "inactive", "pending"]. Works for any type.' },
        { title: 'pattern', description: 'Regex for string validation: "pattern": "^[0-9]{3}-[0-9]{4}$" for phone numbers. Uses ECMAScript regex syntax.' },
      ]} />

      <AlertBox type="tip" title="Use our JSON Schema Generator">
        Paste any JSON at unblockdevs.com/json-schema-generation and get a complete JSON Schema
        instantly — with required fields, types, and format constraints detected automatically.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between JSON Schema and TypeScript interfaces?',
          answer: 'TypeScript interfaces are compile-time only — they\'re erased at runtime. JSON Schema validates actual data at runtime and can be used in any language. They complement each other: use TypeScript for type safety in your code, JSON Schema for validating data from external sources (APIs, user input, files).',
        },
        {
          question: 'Which JSON Schema validator should I use?',
          answer: 'JavaScript: Ajv (fastest, most compatible). Python: jsonschema library or fastjsonschema. Java: json-schema-validator by networknt. Go: gojsonschema or santhosh-tekuri/jsonschema. All support JSON Schema Draft 7 and most support Draft 2020-12.',
        },
        {
          question: 'Can I use JSON Schema for OpenAPI/Swagger documentation?',
          answer: 'Yes — OpenAPI 3.0+ uses a subset of JSON Schema for request/response schemas. OpenAPI 3.1 is fully compatible with JSON Schema Draft 2020-12. Writing JSON Schemas for your data models is the same as documenting your API schemas in OpenAPI.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
