'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToValidateJsonSchemaJavaScriptClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Validate JSON Schema in JavaScript (Complete Guide 2026)</h1>
      <p className="lead">
        JSON Schema validation in JavaScript lets you verify that any JSON data matches a predefined structure before you process it. Whether you're validating API request bodies, form submissions, configuration files, or third-party API responses, JSON Schema gives you a declarative way to define what valid data looks like — and libraries like ajv check your data against that definition in under a millisecond. This guide covers everything from basic type checking to advanced conditional schemas, with real-world patterns for Node.js, TypeScript, and browser environments.
      </p>

      <StatGrid stats={[
        { value: 'ajv', label: 'Fastest JS validator — #1 by downloads', color: 'blue' },
        { value: 'Draft 7', label: 'Most compatible schema version', color: 'green' },
        { value: '< 1ms', label: 'Validation time with compiled schemas', color: 'amber' },
        { value: '130M+', label: 'Weekly npm downloads for ajv', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Is JSON Schema Validation in JavaScript?" />
      <p>
        JSON Schema is a specification for describing the structure of JSON data. It's a JSON document that says: "valid data must have these properties, with these types, meeting these constraints." A JSON Schema validator takes your schema definition and a piece of data, then checks whether the data satisfies every rule in the schema.
      </p>
      <p>
        In JavaScript, this means you can write a schema object once and validate any data against it — API responses, user-submitted forms, parsed JSON files, or WebSocket messages — with a simple function call that returns true/false plus detailed error information.
      </p>

      <FlowDiagram steps={[
        { label: 'Write JSON Schema', color: 'blue' },
        { label: 'Compile schema', color: 'blue' },
        { label: 'Receive JSON data', color: 'amber' },
        { label: 'Run validator', color: 'amber' },
        { label: 'Valid / Errors', color: 'green' },
      ]} />

      <KeyPointsGrid columns={2} items={[
        { title: 'Type Validation', description: 'Verify that fields are strings, numbers, booleans, arrays, objects, or null — and reject data with wrong types before it reaches your application logic.' },
        { title: 'Required Field Checking', description: 'Specify which properties must be present. The validator rejects any object missing a required field, giving you a clear error identifying the missing property.' },
        { title: 'Format Validation', description: 'Validate that strings match specific formats: email addresses, dates, URIs, UUIDs, IP addresses, and more — using the ajv-formats plugin.' },
        { title: 'Constraint Validation', description: 'Enforce numeric ranges (minimum/maximum), string lengths (minLength/maxLength), array sizes (minItems/maxItems), and string patterns (regex pattern keyword).' },
      ]} />

      <SectionHeader number={2} title="Quick Start: Validate JSON in 5 Lines" />
      <p>
        The fastest way to get started is with ajv. Install it, compile your schema, and validate.
      </p>

      <CodeBlock language="bash" filename="Install ajv">
{`npm install ajv ajv-formats
# ajv: the validator engine
# ajv-formats: adds email, date, uri, uuid, and other format support`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Minimal Validation Example">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0 }
  },
  required: ['name', 'email']
};

// Compile once
const validate = ajv.compile(schema);

// Validate data
const data = { name: 'Alice', email: 'alice@example.com', age: 28 };
const valid = validate(data);

console.log(valid); // true

// Test with invalid data
const bad = { name: 'Bob', email: 'not-an-email' };
console.log(validate(bad)); // false
console.log(validate.errors);
// [{ instancePath: '/email', message: 'must match format "email"', ... }]`}
      </CodeBlock>

      <SectionHeader number={3} title="JSON Schema Keywords: The Complete Reference" />
      <p>
        Every JSON Schema is built from a set of keywords. Understanding them lets you write precise, expressive schemas.
      </p>

      <CodeBlock language="javascript" filename="Complete Keyword Reference">
{`const comprehensiveSchema = {
  // Root type
  type: 'object',           // string | number | integer | boolean | array | object | null

  // Properties: define each field's schema
  properties: {
    // String constraints
    username: {
      type: 'string',
      minLength: 3,          // minimum character count
      maxLength: 50,         // maximum character count
      pattern: '^[a-z0-9_]+$' // regex the string must match
    },

    // Number constraints
    score: {
      type: 'number',
      minimum: 0,           // >= this value
      maximum: 100,         // <= this value
      exclusiveMinimum: -1, // > this value (not >=)
      multipleOf: 0.5       // must be divisible by this
    },

    // Enum: one of a set of allowed values
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'pending', 'banned']
    },

    // Format: semantic string validation
    email: { type: 'string', format: 'email' },
    website: { type: 'string', format: 'uri' },
    createdAt: { type: 'string', format: 'date-time' },
    birthDate: { type: 'string', format: 'date' },
    userId: { type: 'string', format: 'uuid' },

    // Array with item schema
    tags: {
      type: 'array',
      items: { type: 'string', minLength: 1 }, // each item must match
      minItems: 0,           // minimum array length
      maxItems: 10,          // maximum array length
      uniqueItems: true      // no duplicate values allowed
    },

    // Nested object
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string', minLength: 2, maxLength: 2 }
      },
      required: ['street', 'city', 'country']
    },

    // Nullable field (string OR null)
    middleName: {
      type: ['string', 'null']
    },

    // Constant value
    version: { const: '2.0' }
  },

  // Required fields: these must be present
  required: ['username', 'email', 'status'],

  // Reject extra properties not listed above
  additionalProperties: false
};`}
      </CodeBlock>

      <SectionHeader number={4} title="Advanced Schema Patterns" />

      <CodeBlock language="javascript" filename="Conditional Validation with if/then/else">
{`// Different required fields based on a property value
const paymentSchema = {
  type: 'object',
  properties: {
    method: { type: 'string', enum: ['card', 'bank_transfer', 'crypto'] },
    amount: { type: 'number', minimum: 0.01 },
    // Card-specific fields
    cardNumber: { type: 'string', pattern: '^[0-9]{16}$' },
    cardCvv: { type: 'string', pattern: '^[0-9]{3,4}$' },
    // Bank transfer fields
    routingNumber: { type: 'string' },
    accountNumber: { type: 'string' },
    // Crypto fields
    walletAddress: { type: 'string' }
  },
  required: ['method', 'amount'],
  // Conditionally require fields based on payment method
  if: { properties: { method: { const: 'card' } } },
  then: { required: ['cardNumber', 'cardCvv'] },
  else: {
    if: { properties: { method: { const: 'bank_transfer' } } },
    then: { required: ['routingNumber', 'accountNumber'] },
    else: { required: ['walletAddress'] } // crypto
  }
};`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Schema Composition with allOf, anyOf, oneOf">
{`// allOf: data must match ALL sub-schemas
const strictUserSchema = {
  allOf: [
    {
      type: 'object',
      properties: { id: { type: 'integer' } },
      required: ['id']
    },
    {
      type: 'object',
      properties: { email: { type: 'string', format: 'email' } },
      required: ['email']
    }
  ]
};

// anyOf: data must match AT LEAST ONE sub-schema
const flexibleIdSchema = {
  anyOf: [
    { type: 'string', format: 'uuid' },
    { type: 'integer', minimum: 1 }
  ]
};

// oneOf: data must match EXACTLY ONE sub-schema
const strictTypeSchema = {
  oneOf: [
    { type: 'string' },
    { type: 'number' }
    // will fail if data matches both (impossible here, but useful for discriminated unions)
  ]
};

// not: data must NOT match this schema
const nonNullSchema = {
  not: { type: 'null' }
};`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Reusable Sub-Schemas with $defs and $ref">
{`// Define shared schemas and reference them throughout
const apiResponseSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  // Define reusable schemas
  $defs: {
    userId: {
      type: 'integer',
      minimum: 1,
      description: 'Positive integer user ID'
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
      description: 'ISO 8601 timestamp'
    },
    user: {
      type: 'object',
      properties: {
        id: { '$ref': '#/$defs/userId' },
        email: { type: 'string', format: 'email' },
        createdAt: { '$ref': '#/$defs/timestamp' }
      },
      required: ['id', 'email', 'createdAt']
    }
  },

  // Use $ref to reference definitions
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: { '$ref': '#/$defs/user' }
    },
    total: { type: 'integer', minimum: 0 },
    fetchedAt: { '$ref': '#/$defs/timestamp' }
  },
  required: ['data', 'total']
};`}
      </CodeBlock>

      <SectionHeader number={5} title="Common Mistakes and How to Fix Them" />

      <ErrorFix
        bad={`// BAD: Recompiling on every validation call
function validateUser(data) {
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema); // slow!
  return validate(data);
}`}
        good={`// GOOD: Compile once, call many times
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

// Compiled at module load — reused on every call
const validateUser = ajv.compile(userSchema);

function checkUser(data) {
  return validateUser(data);
  // ~100x faster than re-compiling each time
}`}
        badLabel="Slow: Schema recompiled on every validation"
        goodLabel="Fast: Schema compiled once at module load"
      />

      <ErrorFix
        bad={`// BAD: Missing allErrors — stops at first error
const ajv = new Ajv(); // default: stops at first error

// User gets one error, fixes it, submits again, gets another error
// Poor developer and user experience`}
        good={`// GOOD: allErrors: true — collect all errors at once
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

validate(data); // Now reports ALL failures simultaneously
// e.g.: "email is required, age must be >= 0, status must be enum value"
// User or developer can fix everything in one pass`}
        badLabel="Single error: stops at first failure"
        goodLabel="All errors: see every problem at once"
      />

      <ErrorFix
        bad={`// BAD: No error message formatting
if (!validate(data)) {
  console.log(validate.errors); // raw ajv error objects — hard to read
  throw new Error('Invalid'); // no context
}`}
        good={`// GOOD: Format errors clearly for debugging and logging
if (!validate(data)) {
  const errors = validate.errors.map(err => ({
    field: err.instancePath || 'root',
    message: err.message,
    rejected: err.data
  }));

  console.error('Validation failed:', errors);
  // Or use ajv's built-in formatter:
  throw new Error(ajv.errorsText(validate.errors, { separator: '; ' }));
}`}
        badLabel="Raw errors: cryptic and hard to use"
        goodLabel="Formatted errors: clear field paths and messages"
      />

      <SectionHeader number={6} title="Validate Different JSON Structures" />

      <CodeBlock language="javascript" filename="Validate an Array Response">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Validate an array of objects (e.g., GET /api/users response)
const usersArraySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'integer', minimum: 1 },
      username: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      active: { type: 'boolean' }
    },
    required: ['id', 'username', 'email']
  },
  minItems: 0 // empty array is valid
};

const validateUsers = ajv.compile(usersArraySchema);

const response = [
  { id: 1, username: 'alice', email: 'alice@example.com', active: true },
  { id: 2, username: 'bob', email: 'bob@example.com' }
];

console.log(validateUsers(response)); // true`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Validate Configuration Files">
{`// JSON config file validation — great for app startup
const configSchema = {
  type: 'object',
  properties: {
    server: {
      type: 'object',
      properties: {
        host: { type: 'string' },
        port: { type: 'integer', minimum: 1, maximum: 65535 }
      },
      required: ['host', 'port']
    },
    database: {
      type: 'object',
      properties: {
        url: { type: 'string', format: 'uri' },
        maxConnections: { type: 'integer', minimum: 1, maximum: 100 },
        ssl: { type: 'boolean' }
      },
      required: ['url']
    },
    features: {
      type: 'object',
      additionalProperties: { type: 'boolean' } // any string key → boolean value
    }
  },
  required: ['server', 'database'],
  additionalProperties: false
};

const validateConfig = ajv.compile(configSchema);

// Validate at app startup — fail fast if config is wrong
function loadConfig(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  if (!validateConfig(config)) {
    const errors = validateConfig.errors.map(e => \`\${e.instancePath}: \${e.message}\`);
    throw new Error(\`Invalid config:\\n\${errors.join('\\n')}\`);
  }

  return config;
}`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="TypeScript — Type-Safe Validation with JSONSchemaType">
{`import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// TypeScript interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'food';
  inStock: boolean;
  tags: string[];
}

// JSONSchemaType<T> ensures schema matches your TypeScript type
// TypeScript will catch mismatches at compile time
const productSchema: JSONSchemaType<Product> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    price: { type: 'number', minimum: 0 },
    category: { type: 'string', enum: ['electronics', 'clothing', 'food'] },
    inStock: { type: 'boolean' },
    tags: { type: 'array', items: { type: 'string' } }
  },
  required: ['id', 'name', 'price', 'category', 'inStock', 'tags'],
  additionalProperties: false
};

const validateProduct = ajv.compile<Product>(productSchema);

function processProduct(data: unknown): Product {
  if (validateProduct(data)) {
    // After validation, TypeScript knows data is Product — fully typed
    return data; // no cast needed
  }

  throw new Error(\`Invalid product: \${ajv.errorsText(validateProduct.errors)}\`);
}`}
      </CodeBlock>

      <SectionHeader number={7} title="Validation in Express.js API (Middleware Pattern)" />

      <CodeBlock language="javascript" filename="Express Middleware for Request Validation">
{`import express from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const app = express();
app.use(express.json());

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Schema for creating a user
const createUserSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3, maxLength: 30, pattern: '^[a-z0-9_]+$' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false
};

// Reusable validation middleware factory
function validateBody(schema) {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    if (validate(req.body)) {
      next(); // valid — proceed to handler
    } else {
      // Format errors for API response
      const errors = validate.errors.map(err => ({
        field: err.instancePath.replace('/', '') || 'body',
        message: err.message
      }));

      res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }
  };
}

// Apply middleware to route
app.post('/api/users',
  validateBody(createUserSchema),
  async (req, res) => {
    // req.body is valid — safe to use
    const user = await createUser(req.body);
    res.status(201).json(user);
  }
);`}
      </CodeBlock>

      <SectionHeader number={8} title="ajv vs. Other JavaScript Validators" />

      <CompareTable
        leftLabel="ajv"
        rightLabel="zod"
        rows={[
          { label: 'Paradigm', left: 'JSON Schema standard (declarative JSON)', right: 'TypeScript-first (code-based schema)' },
          { label: 'Performance', left: 'Fastest — compiles to JS functions', right: 'Slower — JavaScript class chain' },
          { label: 'Schema format', left: 'JSON — shareable, language-agnostic', right: 'TypeScript code — not JSON-serializable' },
          { label: 'TypeScript support', left: 'Good — JSONSchemaType utility', right: 'Excellent — schemas ARE type definitions' },
          { label: 'Browser bundle', left: 'Smaller with tree-shaking', right: 'Moderate size' },
          { label: 'Error messages', left: 'Detailed but verbose', right: 'Clean, developer-friendly' },
          { label: 'Best for', left: 'APIs, config validation, cross-language schemas', right: 'TypeScript projects, form validation' },
        ]}
      />

      <AlertBox type="tip" title="When to Use ajv vs. zod vs. yup">
        Use ajv when you need JSON Schema compatibility (OpenAPI, server-side validation, language-agnostic schemas). Use zod when you're building a TypeScript project and want schema and type definitions to be the same thing. Use yup when you need extensive form validation with async validators and transformation support.
      </AlertBox>

      <SectionHeader number={9} title="Performance Tips for High-Volume Validation" />

      <VerticalSteps steps={[
        {
          title: 'Compile schemas once at module load',
          description: 'Never call ajv.compile() inside a request handler or loop. Compile all schemas when the module loads and store the compiled validators in constants. Compiled validators are 10-100x faster than re-compiling on each call.',
        },
        {
          title: 'Use ajv.compile() not ajv.validate()',
          description: 'ajv.validate(schema, data) is a convenience method that compiles the schema on every call. Always use ajv.compile(schema) to get a reusable validator function, then call that function with your data.',
        },
        {
          title: 'Enable removeAdditional for input sanitization',
          description: 'new Ajv({ removeAdditional: true }) automatically strips properties not listed in the schema. This is useful for API request validation — it sanitizes input while validating, removing the need for a separate sanitization step.',
        },
        {
          title: 'Use useDefaults to populate missing optional fields',
          description: 'new Ajv({ useDefaults: true }) automatically fills in default values defined in the schema for missing optional properties. This simplifies your handler code — you can always rely on all fields being present after validation.',
        },
      ]} />

      <CodeBlock language="javascript" filename="ajv Performance and Convenience Options">
{`const ajv = new Ajv({
  allErrors: true,        // Collect all errors, not just the first
  removeAdditional: true, // Strip extra properties automatically
  useDefaults: true,      // Fill in default values
  coerceTypes: false,     // Don't auto-convert types (safer for strict validation)
  verbose: false          // Don't include schema in errors (smaller error objects)
});

// With these options, your schema can include default values:
const schema = {
  type: 'object',
  properties: {
    role: { type: 'string', enum: ['user', 'admin'], default: 'user' }, // filled in if missing
    active: { type: 'boolean', default: true }
  }
};`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'How do I validate JSON schema in JavaScript?',
          answer: 'Install ajv and ajv-formats with npm. Create a JSON Schema object describing the expected data structure. Call ajv.compile(schema) once to get a compiled validator function. Call that validator function with your data — it returns true if valid, false if not. When false, inspect validate.errors for detailed error information including which fields failed and why.',
        },
        {
          question: 'What is the best JSON schema validator for JavaScript?',
          answer: 'ajv (Another JSON Schema Validator) is the best choice for most use cases — it\'s the fastest validator, supports all major JSON Schema drafts (4, 6, 7, 2019-09, 2020-12), has excellent TypeScript support, and has 130M+ weekly downloads. For TypeScript-first projects where you want schemas and types to be the same definition, consider zod instead.',
        },
        {
          question: 'How do I show user-friendly validation error messages?',
          answer: 'ajv errors include instancePath (the field path like "/email"), message (the error reason like "must match format email"), and params (additional details). Map over validate.errors to format them: errors.map(e => `${e.instancePath.replace("/", "")} ${e.message}`). For form validation, group errors by field path so you can display each error next to its field. Use ajv.errorsText() for a quick single string of all errors.',
        },
        {
          question: 'Can I validate JSON schema in the browser?',
          answer: 'Yes, ajv works in both Node.js and browser environments. For browser use, import ajv via npm and bundle with webpack, Vite, or Rollup. The bundle size is moderate (~40KB minified+gzipped for ajv + ajv-formats). For very bundle-size-sensitive applications, consider tree-shaking or using a smaller validator like djv or a custom validation function for simple schemas.',
        },
        {
          question: 'How do I validate that one of many schemas matches (union types)?',
          answer: 'Use the anyOf keyword to specify that data must match at least one of several schemas. For discriminated unions (like TypeScript\'s), use oneOf combined with if/then/else based on a discriminator field. Example: if type === "admin" then require permissions array; if type === "guest" then require temporaryToken. The if/then/else pattern handles most real-world conditional validation scenarios.',
        },
        {
          question: 'Does JSON Schema validation work with TypeScript types?',
          answer: 'Yes, excellently. ajv provides JSONSchemaType<T> which creates a TypeScript type for schemas that match your interface T. If your schema doesn\'t match your TypeScript interface, TypeScript gives a compile-time error. After validating with a compiled typed validator, TypeScript narrows the type — so data is typed as your interface without needing an explicit cast. For a fully integrated type-safe experience, also consider io-ts or zod.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
