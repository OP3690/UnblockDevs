'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function JsonSchemaGeneratorTutorialClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Schema Generator Tutorial — Validate Any JSON Structure</h1>
      <p className="lead">
        JSON Schema lets you define the exact structure, types, and constraints for your JSON data.
        Once defined, you can validate any JSON against it automatically — catching missing required fields,
        wrong types, invalid formats, and out-of-range values before they cause bugs. This tutorial covers
        writing schemas from scratch, all key keywords with examples, validating with Ajv in JavaScript,
        auto-generating schemas from sample data in Python, and common patterns for API contracts, form validation,
        and OpenAPI integration.
      </p>

      <StatGrid stats={[
        { value: 'Draft 2020-12', label: 'latest JSON Schema specification', color: 'blue' },
        { value: 'Ajv', label: 'most popular JSON Schema validator for JavaScript', color: 'green' },
        { value: 'Auto-generate', label: 'tools that create schema from sample JSON instantly', color: 'purple' },
        { value: 'OpenAPI 3.1', label: 'fully compatible with JSON Schema Draft 2020-12', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="JSON Schema Basics — What It Is and Why It Matters" />
      <QuickFact color="blue" label="What JSON Schema does">
        A JSON Schema is a JSON document that describes the structure of another JSON document.
        It defines what types are allowed, which fields are required, what values are valid,
        and how nested objects and arrays are structured. Validation engines check JSON against
        the schema and report detailed errors when data doesn't match — with the exact field path
        and what was wrong.
      </QuickFact>
      <p>
        Without JSON Schema, you write manual validation logic: <code>if (!data.email) throw Error()</code>,
        <code>if (data.age &lt; 0) throw Error()</code>, scattered throughout your codebase. With JSON Schema,
        you define all constraints once in a single declarative document, and any compatible validator
        enforces all of them automatically — in JavaScript, Python, Java, Go, or any other language.
      </p>

      <SectionHeader number={2} title="Complete Schema Example — User Object" />
      <CodeBlock lang="json" title="JSON Schema for a user object — all common keywords">
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
      "uniqueItems": true,
      "maxItems": 20
    },
    "address": {
      "type": "object",
      "required": ["city", "country"],
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string", "minLength": 2, "maxLength": 2 }
      },
      "additionalProperties": false
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "score": {
      "type": ["number", "null"],
      "minimum": 0,
      "maximum": 100
    }
  },
  "additionalProperties": false
}`}
      </CodeBlock>

      <SectionHeader number={3} title="Validating JSON with Ajv (JavaScript)" />
      <CodeBlock lang="javascript" title="Validate JSON against schema with Ajv — complete setup">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats'; // adds email, date-time, uri, etc.

const ajv = new Ajv({ allErrors: true }); // show ALL errors (not just first)
addFormats(ajv);

const userSchema = {
  type: 'object',
  required: ['id', 'email', 'name'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    role: { type: 'string', enum: ['admin', 'user', 'moderator'] },
    age: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
};

// Compile schema once, validate many times (compile is expensive)
const validate = ajv.compile(userSchema);

// ✅ Valid data
const validUser = { id: 1, email: 'alice@example.com', name: 'Alice', role: 'admin' };
console.log(validate(validUser));  // true

// ❌ Invalid data — multiple errors
const invalidUser = { id: 0, email: 'not-an-email', name: '', unknownField: true };
console.log(validate(invalidUser));  // false
console.log(validate.errors);
// [
//   { instancePath: '/id', message: 'must be >= 1' },
//   { instancePath: '/email', message: 'must match format "email"' },
//   { instancePath: '/name', message: 'must NOT have fewer than 1 characters' },
//   { instancePath: '', keyword: 'additionalProperties', params: { additionalProperty: 'unknownField' } }
// ]

// Utility function for clean error messages:
function validateUser(data) {
  const valid = validate(data);
  if (!valid) {
    const errors = validate.errors.map(e => \`\${e.instancePath || 'root'}: \${e.message}\`);
    throw new Error('Validation failed:\\n' + errors.join('\\n'));
  }
  return data;
}

// Express.js middleware using Ajv:
function validateBody(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (validate(req.body)) {
      next();
    } else {
      res.status(400).json({ errors: validate.errors });
    }
  };
}

app.post('/users', validateBody(userSchema), createUserHandler);`}
      </CodeBlock>

      <SectionHeader number={4} title="Auto-Generate Schema from Sample JSON" />
      <CodeBlock lang="python" title="Generate schema from example data (Python — genson)">
{`# pip install genson
from genson import SchemaBuilder
import json

# Sample JSON data representing a typical response
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
#   "required": ["id", "name", "email", "scores", "active", "address"]
# }

# Add multiple samples to handle union types and optional fields
builder2 = SchemaBuilder()
builder2.add_object({"id": 123, "name": "Alice", "role": "admin"})
builder2.add_object({"id": "abc", "name": "Bob"})   # id can be string too
builder2.add_object({"id": 456, "name": "Carol", "age": 30})  # age is optional

schema2 = builder2.to_schema()
# "id" becomes {"type": ["integer", "string"]}
# "age" is absent from required (only present in 1 of 3 samples)
print(json.dumps(schema2, indent=2))`}
      </CodeBlock>

      <SectionHeader number={5} title="Key JSON Schema Keywords Reference" />
      <KeyPointsGrid columns={2} items={[
        { title: 'type', description: '"string", "number", "integer", "boolean", "array", "object", "null". Array for nullable: ["string", "null"] allows the field to be a string or null. "integer" only allows whole numbers; "number" allows decimals too.' },
        { title: 'required', description: 'Array of property names that MUST be present in the object. Missing required property = validation error. Optional fields are simply omitted from "required" — no separate keyword needed.' },
        { title: 'enum', description: 'Restricts to a specific set of values: "enum": ["active", "inactive", "pending"]. Works for any type. All values must match the specified type. Case-sensitive for strings.' },
        { title: 'pattern', description: 'Regular expression for string validation. "pattern": "^[0-9]{3}-[0-9]{4}$" validates phone numbers. Uses ECMAScript regex syntax. Anchors (^ and $) recommended to match full string.' },
        { title: 'format', description: 'Semantic string validation: "email", "date-time", "date", "uri", "uuid", "ipv4", "hostname". Requires ajv-formats plugin in Ajv. Draft 2020-12 treats format as annotation only unless configured otherwise.' },
        { title: 'additionalProperties', description: 'Set to false to reject properties not listed in "properties". Critical for security — prevents extra unknown fields from being accepted. Can also be a schema to validate additional properties.' },
        { title: '$ref and $defs', description: 'Reuse schema definitions. "$defs": {"Address": {...}} defines a reusable schema. "$ref": "#/$defs/Address" references it. Eliminates copy-paste between related schemas. Supports recursive schemas too.' },
        { title: 'oneOf / anyOf / allOf', description: '"anyOf": must match at least one schema. "oneOf": must match exactly one schema. "allOf": must match all schemas (merging). Used for union types and schema composition.' },
      ]} />

      <SectionHeader number={6} title="Common Validation Patterns" />
      <ErrorFix
        title="Nullable fields, optional fields, and union types"
        bad={`// ❌ Trying to use null without declaring it in type
{
  "properties": {
    "middleName": { "type": "string" }  // fails if middleName is null
  }
}
// null → fails: 'must be string'

// ❌ Forgetting that additionalProperties: false blocks extra fields
{
  "properties": { "id": {"type": "integer"} },
  "additionalProperties": false
}
// {id: 1, extra: "data"} → fails: 'must NOT have additional properties'`}
        good={`// ✅ Nullable field — type as array
{
  "properties": {
    "middleName": { "type": ["string", "null"] },
    "score": { "type": ["number", "null"], "minimum": 0 }
  }
}

// ✅ Optional field — just omit from required
{
  "required": ["id", "email"],  // name not here = optional
  "properties": {
    "id": {"type": "integer"},
    "email": {"type": "string"},
    "name": {"type": "string"}  // present in properties but not required
  }
}

// ✅ Union type with different shapes (discriminated union)
{
  "oneOf": [
    {
      "type": "object",
      "required": ["type", "email"],
      "properties": {
        "type": {"const": "email_user"},
        "email": {"type": "string", "format": "email"}
      }
    },
    {
      "type": "object",
      "required": ["type", "phone"],
      "properties": {
        "type": {"const": "phone_user"},
        "phone": {"type": "string", "pattern": "^\\\\+[0-9]{10,15}$"}
      }
    }
  ]
}`}
        badLabel="Missing null type, additionalProperties surprises"
        goodLabel="Explicit nullable types, optional vs required, discriminated unions"
      />

      <SectionHeader number={7} title="JSON Schema vs TypeScript vs Zod" />
      <CompareTable
        leftLabel="JSON Schema"
        rightLabel="TypeScript / Zod"
        rows={[
          { label: 'When validation runs', left: 'Runtime — validates actual data values', right: 'TypeScript: compile-time only (erased at runtime). Zod: runtime.' },
          { label: 'Language support', left: 'Language-agnostic — works in JS, Python, Java, Go, etc.', right: 'TypeScript: JS/TS only. Zod: JS/TS only.' },
          { label: 'Schema format', left: 'JSON document — human-readable, shareable across services', right: 'TypeScript code / Zod chain calls — tightly coupled to language' },
          { label: 'OpenAPI integration', left: '✅ Native — OpenAPI uses JSON Schema directly', right: '❌ Requires conversion tools (zod-to-openapi, etc.)' },
          { label: 'Error messages', left: 'Standard error objects with instancePath, keyword, message', right: 'Zod: excellent custom error messages. TypeScript: compile errors only.' },
          { label: 'Best use case', left: 'API contracts, cross-service data validation, config files', right: 'Zod: within a TypeScript codebase, form validation with type inference' },
        ]}
      />

      <AlertBox type="tip" title="Use our JSON Schema Generator">
        Paste any JSON at our JSON Schema Generator and get a complete JSON Schema instantly —
        with required fields, types, format constraints, and nested object schemas detected automatically.
        No setup required.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between JSON Schema and TypeScript interfaces?',
          answer: 'TypeScript interfaces are compile-time only — they\'re completely erased at runtime. JSON Schema validates actual data values at runtime and works in any language. They complement each other well: use TypeScript for type safety in your code, use JSON Schema for validating data from external sources (APIs, user input, database records, config files). Tools like json-schema-to-typescript can generate TypeScript types from your JSON Schema automatically.',
        },
        {
          question: 'Which JSON Schema validator should I use for my language?',
          answer: 'JavaScript/Node.js: Ajv (fastest, most compatible, 50M weekly downloads). Python: jsonschema library (pip install jsonschema) or fastjsonschema for performance. Java: json-schema-validator by networknt (Maven). Go: santhosh-tekuri/jsonschema or gojsonschema. Ruby: json-schema gem. PHP: opis/json-schema. All major validators support Draft 7 and most support Draft 2020-12.',
        },
        {
          question: 'Can I use JSON Schema for OpenAPI/Swagger documentation?',
          answer: 'Yes — OpenAPI 3.0+ uses a subset of JSON Schema for request/response schemas. OpenAPI 3.1 is fully aligned with JSON Schema Draft 2020-12. Writing JSON Schemas for your data models is equivalent to writing OpenAPI component schemas. Tools like swagger-ui, Redoc, and Stoplight can render your schemas as interactive documentation automatically.',
        },
        {
          question: 'How do I handle $ref and schema composition for complex objects?',
          answer: 'Use "$defs" to define reusable schemas and "$ref" to reference them. Example: define Address once in "$defs" then reference it as "$ref": "#/$defs/Address" in both ShippingAddress and BillingAddress properties. For combining schemas: "allOf" merges multiple schemas (use for extending a base schema), "anyOf" accepts data matching any of the schemas, "oneOf" requires exactly one to match. "$ref" also supports cross-file references: "$ref": "address.json" for separate schema files.',
        },
        {
          question: 'How do I validate arrays with specific item types and lengths?',
          answer: '"items" defines the schema for all array elements: "items": {"type": "string"} means every element must be a string. "minItems" and "maxItems" constrain array length. "uniqueItems": true prevents duplicates. For tuples (fixed-length arrays with different types per position): use "prefixItems" (Draft 2020-12) or "items" as array (older drafts). Example: "prefixItems": [{"type": "string"}, {"type": "integer"}] validates a [name, id] pair.',
        },
        {
          question: 'What is the difference between format validation and pattern validation?',
          answer: '"format" uses predefined format names like "email", "date-time", "uri", "uuid" — validators know the rules for these. "pattern" is a regex you define. Format is more readable and maintainable; pattern is more flexible. Note: in JSON Schema Draft 2020-12, "format" is an annotation only by default (not validated) — you must configure your validator to enforce it. In Ajv: new Ajv({formats: "fast"}) or addFormats(ajv). Always test that format validation is actually running in your stack.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
