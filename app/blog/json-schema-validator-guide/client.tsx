'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function JsonSchemaValidatorGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Schema Validation Guide — Draft 7, 2020-12, AJV &amp; OpenAPI Explained</h1>
      <p className="lead">
        JSON Schema is the standard way to describe and validate the structure of JSON data.
        A schema defines which fields are required, what types values must be, what patterns
        strings must match, and what ranges numbers must fall within. This guide covers the
        JSON Schema keywords you actually use, the differences between drafts, how to use
        AJV in Node.js, and how to validate JSON against a schema online without writing code.
      </p>

      <StatGrid stats={[
        { value: '5 drafts', label: 'Draft 4, 6, 7, 2019-09, 2020-12 — each adds new keywords and fixes', color: 'blue' },
        { value: 'AJV', label: 'Most popular JSON Schema validator — used in Express, Fastify, OpenAPI tooling', color: 'green' },
        { value: '1 paste', label: 'Validate any JSON against any schema online — no code required', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="What Is JSON Schema and Why Use It?" />
      <p>
        JSON Schema is a vocabulary for describing the shape of JSON data. A JSON Schema
        document (itself written in JSON) specifies the rules that a JSON value must follow.
        Validators check JSON data against the schema and report every violation.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'API request validation',
          description:
            'Reject invalid API payloads before your business logic runs. Return a detailed 400 error showing exactly which fields are wrong — better UX than a cryptic 500 from a downstream null reference.',
        },
        {
          title: 'Config file validation',
          description:
            'Validate CI configs, Docker Compose overrides, and app config files against a schema. Catch missing required fields and wrong value types before deploying.',
        },
        {
          title: 'Data pipeline validation',
          description:
            'Validate each record in a data pipeline before ingestion. Schema validation at the entry point prevents corrupt data from propagating to databases and downstream consumers.',
        },
        {
          title: 'OpenAPI / Swagger schemas',
          description:
            'OpenAPI 3.0 uses JSON Schema Draft 7 for request/response body schemas. OpenAPI 3.1 uses Draft 2020-12. API code generators use schemas to produce typed clients automatically.',
        },
      ]} />

      <SectionHeader number={2} title="Core JSON Schema Keywords You Use Every Day" />

      <CodeBlock lang="json" title="Essential JSON Schema — full reference with examples">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",

  "required": ["id", "name", "email", "role"],

  "properties": {

    "id": {
      "type": "integer",
      "minimum": 1
    },

    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100,
      "pattern": "^[A-Za-z ]+$"
    },

    "email": {
      "type": "string",
      "format": "email"
    },

    "role": {
      "type": "string",
      "enum": ["admin", "editor", "viewer", "guest"]
    },

    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },

    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "maxItems": 10,
      "uniqueItems": true
    },

    "score": {
      "type": "number",
      "multipleOf": 0.5
    },

    "metadata": {
      "type": ["object", "null"]
    }
  },

  "additionalProperties": false
}`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'type — value type constraint',
          description:
            'Valid types: "string", "number", "integer", "boolean", "array", "object", "null". Use an array to allow multiple types: "type": ["string", "null"] for nullable strings.',
        },
        {
          title: 'required — mandatory fields',
          description:
            'An array of property names that must be present. Validation fails if any required property is missing from the object. Fields in properties but not required are optional.',
        },
        {
          title: 'enum — fixed set of allowed values',
          description:
            '"enum": ["admin", "editor", "viewer"] — value must exactly match one of the listed values. Works for any type. For a single allowed value, use "const": "active" instead.',
        },
        {
          title: 'format — semantic string validation',
          description:
            'Built-in formats (with ajv-formats): "email", "uri", "url", "date", "date-time", "time", "uuid", "ipv4", "ipv6", "hostname". Not validated by default — requires ajv-formats plugin.',
        },
      ]} />

      <SectionHeader number={3} title="JSON Schema Drafts — Which One to Use" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Draft 7 — most widely supported',
          description:
            'Last draft before the 2019 redesign. Supported by AJV 6, OpenAPI 3.0, and most existing tooling. $schema: "http://json-schema.org/draft-07/schema#". Use for OpenAPI 3.0 and legacy projects.',
        },
        {
          title: 'Draft 2020-12 — current standard',
          description:
            'Current release. Uses $defs (not definitions), adds unevaluatedProperties and prefixItems. Required by OpenAPI 3.1. $schema: "https://json-schema.org/draft/2020-12/schema". Use for new projects.',
        },
        {
          title: 'Draft 2019-09',
          description:
            'Intermediate between 7 and 2020-12. Renamed definitions to $defs, changed $ref. Mostly superseded by 2020-12. Supported by AJV 8 with draft2019 option.',
        },
        {
          title: 'Draft 4 and 6 — legacy',
          description:
            'Draft 4 still used in MongoDB and some enterprise tooling. Draft 6 added const and contains. Both superseded by Draft 7. Supported in AJV 8 via legacy meta-schemas.',
        },
      ]} />

      <CodeBlock lang="json" title="Draft 7 vs 2020-12 — key syntax differences">
{`// ---- Draft 7 ----
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Address": {
      "type": "object",
      "required": ["city", "country"],
      "properties": {
        "city": { "type": "string" },
        "country": { "type": "string" }
      }
    }
  },
  "type": "object",
  "properties": {
    "address": { "$ref": "#/definitions/Address" }
  }
}

// ---- Draft 2020-12 ----
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "Address": {
      "type": "object",
      "required": ["city", "country"],
      "properties": {
        "city": { "type": "string" },
        "country": { "type": "string" }
      }
    }
  },
  "type": "object",
  "properties": {
    "address": { "$ref": "#/$defs/Address" }
  }
}
// Key differences:
// definitions → $defs
// $ref works correctly alongside other keywords in 2020-12
// unevaluatedProperties available in 2020-12`}
      </CodeBlock>

      <SectionHeader number={4} title="Schema Composition — allOf, anyOf, oneOf, not" />

      <CodeBlock lang="json" title="Composition keywords with practical examples">
{`// allOf — must satisfy ALL sub-schemas (AND)
// Use for extending a base schema:
{
  "allOf": [
    { "$ref": "#/$defs/BaseUser" },
    {
      "required": ["adminSince"],
      "properties": { "adminSince": { "type": "string", "format": "date" } }
    }
  ]
}

// anyOf — must satisfy AT LEAST ONE sub-schema (OR)
// Use for union types — accepts string or number ID:
{
  "anyOf": [
    { "type": "string", "pattern": "^usr_" },
    { "type": "integer", "minimum": 1 }
  ]
}

// oneOf — must satisfy EXACTLY ONE sub-schema (XOR)
// Use for mutually exclusive payment methods:
{
  "type": "object",
  "oneOf": [
    { "required": ["bankAccount"], "not": { "required": ["creditCard"] } },
    { "required": ["creditCard"], "not": { "required": ["bankAccount"] } }
  ]
}

// if / then / else — conditional validation (Draft 7+)
// Require zipCode for US, postcode for other countries:
{
  "if": { "properties": { "country": { "const": "US" } }, "required": ["country"] },
  "then": { "required": ["zipCode"] },
  "else": { "required": ["postcode"] }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="AJV — JSON Schema Validation in Node.js" />

      <CodeBlock lang="javascript" title="AJV setup and usage — complete example">
{`// npm install ajv ajv-formats
import Ajv from 'ajv';            // AJV 8 — Draft 7 by default
import Ajv2020 from 'ajv/dist/2020'; // Draft 2020-12
import addFormats from 'ajv-formats';

// ---- Draft 7 setup ----
const ajv = new Ajv({
  allErrors: true,     // report ALL errors, not just the first
  strict: true,        // error on unknown keywords
  coerceTypes: false,  // never coerce "42" string to 42 integer
});
addFormats(ajv);  // enables email, uri, date-time, uuid, etc.

// ---- Draft 2020-12 setup ----
const ajv2020 = new Ajv2020({ allErrors: true });
addFormats(ajv2020);

// Compile schema ONCE at startup — expensive operation
const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'editor', 'viewer'] },
  },
  additionalProperties: false,
};
const validateUser = ajv.compile(userSchema);

// Use the compiled validator — fast, reusable
function validateAndCreate(data) {
  const valid = validateUser(data);
  if (!valid) {
    const errors = validateUser.errors.map(e => ({
      path: e.instancePath || '(root)',
      message: e.message,
    }));
    throw new ValidationError('Invalid user data', errors);
  }
  return createUser(data);
}`}
      </CodeBlock>

      <AlertBox type="info" title="Compile once — validate many times">
        <code>ajv.compile(schema)</code> compiles the schema into an optimized JS function.
        Call it once at application startup, store the compiled validator. Calling the
        compiled validator (<code>validate(data)</code>) is ~100x faster than compiling
        on each request. Never call <code>compile()</code> inside a request handler.
      </AlertBox>

      <ErrorFix
        title="additionalProperties vs unevaluatedProperties — getting it wrong breaks composition"
        bad={`// additionalProperties: false breaks when using allOf/anyOf/$ref
{
  "allOf": [
    { "$ref": "#/$defs/BaseUser" },
    {
      "additionalProperties": false,  // only sees local properties!
      "properties": { "adminSince": { "type": "string" } }
    }
  ]
}
// Result: id, name, email from BaseUser are flagged as "additional properties"
// because additionalProperties doesn't look at $ref properties`}
        good={`// unevaluatedProperties: false works correctly with composition (Draft 2019-09+)
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
    { "$ref": "#/$defs/BaseUser" }
  ],
  "properties": { "adminSince": { "type": "string" } },
  "unevaluatedProperties": false  // sees ALL properties including from $ref
}
// Result: id, name, email (from BaseUser) + adminSince are all allowed
// Any other property causes a validation error`}
        badLabel="additionalProperties ignores $ref properties — false positives"
        goodLabel="unevaluatedProperties sees all evaluated properties — correct"
      />

      <SectionHeader number={6} title="Validate JSON Against a Schema Online" />

      <VerticalSteps steps={[
        {
          title: 'Paste your JSON data',
          desc: 'Go to unblockdevs.com/json-validator. Paste the JSON you want to validate in the data panel. Syntax errors appear immediately with line and column numbers.',
        },
        {
          title: 'Paste your JSON Schema',
          desc: 'Add your schema in the schema panel. You can use schemas from your codebase, from API documentation (OpenAPI), or write a new schema to test validation rules.',
        },
        {
          title: 'Select the schema draft',
          desc: 'Choose Draft 7 for OpenAPI 3.0 and most existing schemas. Choose Draft 2020-12 for new projects and OpenAPI 3.1. The validator auto-detects the draft from the $schema field.',
        },
        {
          title: 'Review validation errors',
          desc: 'Each error shows the JSON path (e.g., /user/email), the constraint that failed (format, minLength, required), and the actual value. Fix the JSON or refine the schema based on the report.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is JSON Schema and what is it used for?',
          answer: 'JSON Schema is a vocabulary for describing the structure of JSON data. It specifies required fields, value types, string patterns, number ranges, and array constraints. Uses: (1) API request validation — reject malformed payloads with detailed 400 errors, (2) config file validation — catch missing fields before deploy, (3) data pipeline validation — prevent corrupt records from reaching databases, (4) OpenAPI documentation — JSON Schema defines request/response body shapes in Swagger UI.',
        },
        {
          question: 'What is the difference between JSON Schema Draft 7 and 2020-12?',
          answer: 'Draft 7: definitions (renamed to $defs in 2020-12), $ref cannot appear alongside other keywords (they were merged in 2020-12), no unevaluatedProperties. Draft 2020-12: uses $defs, $ref works alongside siblings, adds unevaluatedProperties and prefixItems, cleaner semantics for complex compositions. Use Draft 7 for OpenAPI 3.0. Use 2020-12 for new projects and OpenAPI 3.1.',
        },
        {
          question: 'How do I validate JSON against a schema with AJV in Node.js?',
          answer: 'npm install ajv ajv-formats. Create: const ajv = new Ajv({ allErrors: true }); addFormats(ajv). Compile once: const validate = ajv.compile(yourSchema). Use anywhere: const valid = validate(data); if (!valid) console.log(validate.errors). Set allErrors: true to get all errors at once instead of stopping at the first. Never compile inside a request handler — compile once at startup.',
        },
        {
          question: 'How do I make fields required in JSON Schema?',
          answer: 'Add field names to the required array at the same level as properties: { "required": ["id", "name", "email"], "properties": {...} }. Fields listed in required but absent from the data cause a validation error with the message "must have required property". Fields in properties but not in required are optional.',
        },
        {
          question: 'What is the difference between additionalProperties and unevaluatedProperties?',
          answer: 'additionalProperties: false rejects properties not listed in properties at the same schema level — but it does not see properties validated by $ref, allOf, anyOf, or oneOf. This causes false validation errors when using schema composition. unevaluatedProperties: false (Draft 2019-09+) accounts for all properties validated by any sub-schema before deciding what is unevaluated. Always use unevaluatedProperties when composing schemas with $ref or allOf.',
        },
        {
          question: 'Can I validate JSON against a schema online without writing code?',
          answer: 'Yes — the JSON Validator at unblockdevs.com/json-validator lets you paste JSON in one panel and a JSON Schema in another. Select the draft (7, 2020-12, etc.) and get instant validation results — every error with JSON path, constraint, and actual value. Supports Draft 4, 6, 7, 2019-09, and 2020-12. All processing runs in your browser, no account required.',
        },
      ]} />
    
      {/* ── AI JSON Error Explainer CTA ── */}
      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer — New Tool</p>
        <p className="text-sm text-zinc-600 mb-4">Paste broken JSON and instantly get clear explanations of every error — trailing commas, Python True/False/None, invalid escapes, duplicate keys — with one-click auto-fix and RFC spec references.</p>
        <a href="/json-error-explainer" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Explain My JSON Errors →
        </a>
      </div>
    </BlogLayoutWithSidebarAds>
  );
}
