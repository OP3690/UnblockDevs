'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToValidateApiResponseUsingJsonSchemaClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Validate API Response Using JSON Schema (Complete Guide)</h1>
      <p className="lead">
        API response validation using JSON Schema is the practice of verifying that data returned from an API endpoint conforms to a predefined structure — correct types, required fields, valid formats, and constraint satisfaction. Without validation, your application silently processes incorrect data, leading to mysterious bugs, security issues, and hard-to-debug failures. This guide covers everything from basic schema creation to advanced conditional validation, with working code examples in JavaScript, Python, and TypeScript.
      </p>

      <StatGrid stats={[
        { value: 'ajv', label: 'Fastest JS validator (130M downloads/week)', color: 'blue' },
        { value: 'Draft 7', label: 'Most widely supported JSON Schema version', color: 'green' },
        { value: '< 1ms', label: 'Typical validation time with compiled schemas', color: 'amber' },
        { value: '100%', label: 'Runtime type safety without TypeScript', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Is API Response Validation Using JSON Schema?" />
      <p>
        JSON Schema is a vocabulary for annotating and validating JSON documents. It lets you describe the expected structure of any JSON data — what properties it should have, what types those properties should be, which are required, and what additional constraints they must satisfy (minimum values, string patterns, array lengths, etc.).
      </p>
      <p>
        API response validation means taking the JSON data returned by an HTTP endpoint and checking it against a pre-written JSON Schema to confirm it matches expectations. If the response passes validation, you know it's safe to process. If it fails, you get detailed error messages explaining exactly what's wrong — which field is missing, which type is incorrect, which constraint is violated.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'What JSON Schema Validates', description: 'Data types (string, number, boolean, object, array, null), required fields, field formats (email, date, URI), value constraints (min/max, pattern, enum), and nested structures.' },
        { title: 'What JSON Schema Does NOT Validate', description: 'Business logic ("is this user authorized?"), database consistency ("does this ID exist?"), or cross-field relationships beyond simple conditionals. Schema validation is structural, not semantic.' },
        { title: 'When to Validate', description: 'At runtime when consuming third-party APIs, in automated tests to catch breaking changes, in API monitoring to detect schema drift, and in data pipelines before processing.' },
        { title: 'Why It Matters', description: 'API responses change over time. Third-party APIs add, remove, or change fields without warning. Schema validation is your safety net — it catches problems before they corrupt your data or crash your application.' },
      ]} />

      <SectionHeader number={2} title="JSON Schema Structure: The Fundamentals" />
      <p>
        Before writing validation code, you need to understand JSON Schema syntax. Every schema is a JSON object with keywords that describe constraints.
      </p>

      <CodeBlock language="json" filename="Basic JSON Schema Structure">
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "User API Response",
  "description": "Schema for a single user object returned by /api/users/:id",
  "properties": {
    "id": {
      "type": "integer",
      "description": "Unique user identifier",
      "minimum": 1
    },
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50,
      "pattern": "^[a-zA-Z0-9_]+$"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "role": {
      "type": "string",
      "enum": ["admin", "editor", "viewer"]
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "profile": {
      "type": "object",
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "avatarUrl": { "type": "string", "format": "uri" }
      },
      "required": ["firstName", "lastName"]
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "uniqueItems": true
    }
  },
  "required": ["id", "username", "email", "role", "createdAt"],
  "additionalProperties": false
}`}
      </CodeBlock>

      <QuickFact>
        Setting <code>additionalProperties: false</code> is a strict mode that rejects any properties not listed in your schema. This is excellent for catching unexpected fields in API responses — but can be too strict if APIs are expected to add new fields over time.
      </QuickFact>

      <SectionHeader number={3} title="Method 1: Validate API Responses in JavaScript with ajv" />
      <p>
        ajv (Another JSON Validator) is the de-facto standard for JSON Schema validation in JavaScript and Node.js. It compiles schemas into optimized validation functions and supports all major JSON Schema drafts.
      </p>

      <CodeBlock language="bash" filename="Install ajv">
{`npm install ajv ajv-formats
# ajv-formats adds support for: email, date, date-time, uri, ipv4, ipv6, etc.`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Basic ajv Validation">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize ajv with all errors (not just the first one)
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Define your schema
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 1 },
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'editor', 'viewer'] },
    createdAt: { type: 'string', format: 'date-time' }
  },
  required: ['id', 'username', 'email', 'role', 'createdAt']
};

// Compile schema once — reuse the compiled function for performance
const validateUser = ajv.compile(userSchema);

// Use in an API fetch function
async function fetchUser(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);

  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }

  const data = await response.json();

  // Validate the response
  const valid = validateUser(data);

  if (!valid) {
    // validateUser.errors contains detailed error info
    const errors = validateUser.errors.map(err =>
      \`\${err.instancePath} \${err.message}\`
    );
    throw new Error(\`API response validation failed:\\n\${errors.join('\\n')}\`);
  }

  return data; // TypeScript users: you can cast here after validation
}

// Example usage
try {
  const user = await fetchUser(123);
  console.log('Valid user:', user);
} catch (error) {
  console.error('Validation error:', error.message);
  // Handle gracefully — don't crash the app
}`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="TypeScript with ajv — Type-Safe Validation">
{`import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Define TypeScript interface
interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
}

// JSONSchemaType makes TypeScript validate the schema against your interface
const userSchema: JSONSchemaType<UserResponse> = {
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 1 },
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'editor', 'viewer'] },
    createdAt: { type: 'string', format: 'date-time' }
  },
  required: ['id', 'username', 'email', 'role', 'createdAt'],
  additionalProperties: false
};

const validateUser = ajv.compile<UserResponse>(userSchema);

async function fetchUser(userId: number): Promise<UserResponse> {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const data: unknown = await response.json();

  if (validateUser(data)) {
    // TypeScript now knows data is UserResponse — fully type-safe
    return data;
  }

  throw new Error(\`Validation failed: \${ajv.errorsText(validateUser.errors)}\`);
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Method 2: Validate API Responses in Python with jsonschema" />

      <CodeBlock language="bash" filename="Install jsonschema">
{`pip install jsonschema requests
# jsonschema supports Draft 4, 6, 7, 2019-09, and 2020-12`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python Validation with jsonschema">
{`import requests
from jsonschema import validate, ValidationError, Draft7Validator

# Define schema
user_schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "id": {"type": "integer", "minimum": 1},
        "username": {"type": "string", "minLength": 3},
        "email": {"type": "string", "format": "email"},
        "role": {"type": "string", "enum": ["admin", "editor", "viewer"]},
        "createdAt": {"type": "string", "format": "date-time"}
    },
    "required": ["id", "username", "email", "role", "createdAt"]
}

def fetch_and_validate_user(user_id: int) -> dict:
    """Fetch a user from the API and validate the response schema."""
    response = requests.get(f"https://api.example.com/users/{user_id}")
    response.raise_for_status()

    data = response.json()

    # Option 1: Simple validation (raises on first error)
    try:
        validate(instance=data, schema=user_schema)
        return data
    except ValidationError as e:
        raise ValueError(f"API response validation failed: {e.message}") from e

def fetch_user_with_all_errors(user_id: int) -> dict:
    """Validate and collect ALL errors before raising."""
    response = requests.get(f"https://api.example.com/users/{user_id}")
    data = response.json()

    # Draft7Validator collects all errors
    validator = Draft7Validator(user_schema)
    errors = list(validator.iter_errors(data))

    if errors:
        error_messages = [
            f"{'.'.join(str(p) for p in e.absolute_path)}: {e.message}"
            for e in errors
        ]
        raise ValueError(
            f"Validation failed with {len(errors)} error(s):\\n" +
            "\\n".join(error_messages)
        )

    return data`}
      </CodeBlock>

      <SectionHeader number={5} title="Method 3: Advanced Schema Patterns" />
      <p>
        Real-world APIs return complex nested structures. Here are the most important advanced schema patterns you'll need.
      </p>

      <CodeBlock language="javascript" filename="Nested Objects and Arrays">
{`const paginatedUsersSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' }
        },
        required: ['id', 'username', 'email']
      },
      minItems: 0
    },
    pagination: {
      type: 'object',
      properties: {
        total: { type: 'integer', minimum: 0 },
        page: { type: 'integer', minimum: 1 },
        perPage: { type: 'integer', minimum: 1, maximum: 100 },
        totalPages: { type: 'integer', minimum: 0 }
      },
      required: ['total', 'page', 'perPage', 'totalPages']
    },
    meta: {
      type: 'object',
      properties: {
        requestId: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' }
      }
    }
  },
  required: ['data', 'pagination']
};`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Conditional Validation (if/then/else)">
{`// Schema with different required fields based on user type
const userSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['admin', 'standard', 'guest'] },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    permissions: {
      type: 'array',
      items: { type: 'string' }
    },
    temporaryToken: {
      type: 'string',
      description: 'Only for guest users'
    }
  },
  required: ['type', 'username'],
  // Admin users MUST have email and permissions
  if: {
    properties: { type: { const: 'admin' } }
  },
  then: {
    required: ['email', 'permissions'],
    properties: {
      permissions: { minItems: 1 }
    }
  },
  // Guest users MUST have temporaryToken, must NOT have email
  else: {
    if: {
      properties: { type: { const: 'guest' } }
    },
    then: {
      required: ['temporaryToken']
    }
  }
};`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Schema Reuse with $ref and $defs">
{`// Define reusable sub-schemas and reference them throughout
const apiSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  // Reusable definitions
  $defs: {
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string', minLength: 2, maxLength: 2 },
        postalCode: { type: 'string' }
      },
      required: ['street', 'city', 'country']
    },

    timestamp: {
      type: 'string',
      format: 'date-time',
      description: 'ISO 8601 timestamp'
    },

    errorResponse: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        statusCode: { type: 'integer' }
      },
      required: ['error', 'statusCode']
    }
  },

  // Use $ref to reference definitions
  type: 'object',
  properties: {
    billingAddress: { '$ref': '#/$defs/address' },
    shippingAddress: { '$ref': '#/$defs/address' },
    createdAt: { '$ref': '#/$defs/timestamp' },
    updatedAt: { '$ref': '#/$defs/timestamp' }
  },
  required: ['billingAddress', 'createdAt']
};`}
      </CodeBlock>

      <SectionHeader number={6} title="Method 4: API Testing with Schema Validation" />
      <p>
        Schema validation in automated tests is one of the highest-value uses of JSON Schema. It creates a living specification that catches API breaking changes immediately.
      </p>

      <CodeBlock language="javascript" filename="Jest API Tests with Schema Validation">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Shared schemas — define once, test everywhere
const schemas = {
  user: ajv.compile({
    type: 'object',
    properties: {
      id: { type: 'integer', minimum: 1 },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' }
    },
    required: ['id', 'username', 'email']
  }),

  userList: ajv.compile({
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' }
          },
          required: ['id', 'username']
        }
      },
      total: { type: 'integer', minimum: 0 }
    },
    required: ['data', 'total']
  })
};

// Custom Jest matcher for clean test assertions
expect.extend({
  toMatchSchema(received, validate) {
    const valid = validate(received);
    if (valid) {
      return { pass: true, message: () => 'Schema matched' };
    }
    const errors = validate.errors.map(e => \`\${e.instancePath} \${e.message}\`);
    return {
      pass: false,
      message: () => \`Schema validation failed:\\n\${errors.join('\\n')}\`
    };
  }
});

// Clean, readable tests
describe('Users API', () => {
  test('GET /users/:id returns valid user schema', async () => {
    const response = await fetch('http://localhost:3000/api/users/1');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchSchema(schemas.user);
  });

  test('GET /users returns valid paginated list', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchSchema(schemas.userList);
    expect(data.data.length).toBeGreaterThanOrEqual(0);
  });

  test('POST /users creates and returns valid user', async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: 'test@example.com' })
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toMatchSchema(schemas.user);
  });
});`}
      </CodeBlock>

      <CodeBlock language="python" filename="pytest API Tests with jsonschema">
{`import pytest
import requests
from jsonschema import validate, Draft7Validator

BASE_URL = "http://localhost:3000/api"

# Shared schema definitions
USER_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "integer", "minimum": 1},
        "username": {"type": "string", "minLength": 1},
        "email": {"type": "string", "format": "email"},
        "role": {"type": "string", "enum": ["admin", "editor", "viewer"]}
    },
    "required": ["id", "username", "email", "role"]
}

# Fixture for reusable validation
@pytest.fixture
def validate_user():
    validator = Draft7Validator(USER_SCHEMA)
    def _validate(data):
        errors = list(validator.iter_errors(data))
        if errors:
            messages = [f"{e.json_path}: {e.message}" for e in errors]
            pytest.fail(f"Schema validation failed:\\n" + "\\n".join(messages))
    return _validate

class TestUsersAPI:
    def test_get_user_by_id(self, validate_user):
        response = requests.get(f"{BASE_URL}/users/1")
        assert response.status_code == 200

        data = response.json()
        validate_user(data)  # Fails with clear error if schema doesn't match

    def test_create_user_returns_valid_schema(self, validate_user):
        payload = {"username": "newuser", "email": "new@example.com"}
        response = requests.post(f"{BASE_URL}/users", json=payload)

        assert response.status_code == 201
        validate_user(response.json())`}
      </CodeBlock>

      <SectionHeader number={7} title="Handling Validation Errors Gracefully in Production" />
      <p>
        In production, you need more than just "throw an error." Here's a robust error handling pattern that logs validation failures for debugging while keeping the application functional.
      </p>

      <CodeBlock language="javascript" filename="Production-Ready Validation Error Handler">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

/**
 * Validates API response data with structured error reporting.
 * Returns { valid: true, data } or { valid: false, errors: [] }
 */
function validateResponse(data, schema, context = '') {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    return { valid: true, data };
  }

  const errors = validate.errors.map(err => ({
    field: err.instancePath || 'root',
    message: err.message,
    value: err.data,
    keyword: err.keyword
  }));

  // Log for debugging — never expose to end users
  console.error(\`[Schema Validation] \${context} failed:\`, {
    errors,
    receivedData: data
  });

  return { valid: false, errors };
}

// Example: graceful degradation for API responses
async function fetchUserProfile(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();

  const result = validateResponse(data, userSchema, \`GET /api/users/\${userId}\`);

  if (!result.valid) {
    // Option 1: Return null and let the UI handle missing data
    // Option 2: Return partial data — only validated fields
    // Option 3: Throw — crash the request, not the app

    // For non-critical data: return safe defaults
    return {
      id: data.id || null,
      username: data.username || 'Unknown',
      email: data.email || null,
      _validationWarning: true
    };
  }

  return result.data;
}`}
      </CodeBlock>

      <SectionHeader number={8} title="Common Validation Mistakes and How to Fix Them" />

      <ErrorFix
        bad={`// Validates ONCE — but never recompiles the schema
// Incorrect: ajv.validate() recompiles the schema every call
async function checkUser(data) {
  const valid = ajv.validate(userSchema, data);
  // This is slow — schema is compiled on every call
  if (!valid) throw new Error(ajv.errorsText());
  return data;
}`}
        good={`// Compile schema once outside the function — fast and correct
const validateUser = ajv.compile(userSchema);

async function checkUser(data) {
  if (!validateUser(data)) {
    throw new Error(ajv.errorsText(validateUser.errors));
  }
  return data;
  // Compiled function is reused — 10-100x faster
}`}
        badLabel="Slow: Schema recompiled on every call"
        goodLabel="Fast: Schema compiled once, reused"
      />

      <ErrorFix
        bad={`// Missing additionalProperties and allErrors
const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
  // Extra fields silently accepted
  // Only reports first error
};`}
        good={`// Strict schema with full error collection
const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' }
  },
  required: ['id', 'name'],
  additionalProperties: false  // Reject unexpected fields
};

// Initialize with allErrors: true
const ajv = new Ajv({ allErrors: true });
// Now you see ALL validation errors, not just the first`}
        badLabel="Missing: Extra fields and error collection"
        goodLabel="Strict: All errors, no extra fields"
      />

      <SectionHeader number={9} title="JSON Schema Validation Libraries Compared" />

      <CompareTable
        leftLabel="JavaScript / Node.js"
        rightLabel="Python"
        rows={[
          { label: 'Primary Library', left: 'ajv — fastest, 130M weekly downloads', right: 'jsonschema — most widely used' },
          { label: 'Installation', left: 'npm install ajv ajv-formats', right: 'pip install jsonschema' },
          { label: 'Schema Drafts', left: 'Draft 4, 6, 7, 2019-09, 2020-12', right: 'Draft 3, 4, 6, 7, 2019-09, 2020-12' },
          { label: 'Format Support', left: 'Requires ajv-formats package', right: 'Built-in with format_checker' },
          { label: 'Error Detail', left: 'Very detailed — instancePath, keyword, data', right: 'Detailed — path, message, schema_path' },
          { label: 'Performance', left: 'Compiles to fast JS function', right: 'Pure Python — slower for high volume' },
          { label: 'TypeScript', left: 'Excellent with JSONSchemaType', right: 'N/A' },
          { label: 'All errors mode', left: 'new Ajv({ allErrors: true })', right: 'Draft7Validator.iter_errors()' },
        ]}
      />

      <SectionHeader number={10} title="When to Use Strict vs. Lenient Validation" />

      <CompareTable
        leftLabel="Strict Validation"
        rightLabel="Lenient Validation"
        rows={[
          { label: 'additionalProperties', left: 'false — reject unknown fields', right: 'true (default) — allow extra fields' },
          { label: 'Best for', left: 'Internal APIs you control', right: 'Third-party APIs that evolve frequently' },
          { label: 'Breaking change risk', left: 'New API fields break your schema', right: 'New API fields pass through silently' },
          { label: 'Security', left: 'Prevents unexpected data injection', right: 'May pass through unexpected data' },
          { label: 'Recommended in', left: 'Tests, security-sensitive contexts', right: 'Production consumers of external APIs' },
        ]}
      />

      <AlertBox type="tip" title="Best Practice: Strict in Tests, Lenient in Production">
        Use strict validation (additionalProperties: false) in your automated tests to catch breaking changes early. Use lenient validation in production consumers of third-party APIs — you don't want new fields the API adds to break your application, but you do want to be alerted when required fields are missing or types change.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I validate API response using JSON Schema in JavaScript?',
          answer: 'Install ajv and ajv-formats: npm install ajv ajv-formats. Create a schema object defining the expected structure, compile it with ajv.compile(schema), then call the compiled function with your API response data. Check the boolean return value and inspect the .errors property for failure details. Always compile schemas once outside your fetch function and reuse the compiled validator for performance.',
        },
        {
          question: 'What is the best library to validate API responses?',
          answer: 'For JavaScript/Node.js: ajv is the fastest and most widely used, with 130M+ weekly downloads. For TypeScript: ajv with JSONSchemaType provides compile-time schema type checking. For Python: jsonschema is the standard choice. For testing frameworks: Jest with ajv, or pytest with jsonschema. All support JSON Schema Draft 7, which is the most widely implemented version.',
        },
        {
          question: 'Should I validate API responses in production or just in tests?',
          answer: 'Both. In tests: use strict validation to catch breaking changes before deployment — this is your most valuable use case. In production: use lenient validation to detect missing required fields or wrong types, but allow extra fields so new API additions don\'t break your app. Log validation failures in production for monitoring. A brief validation check on every API response is worth the negligible performance cost.',
        },
        {
          question: 'How do I generate a JSON Schema from an existing API response?',
          answer: 'Several approaches: (1) Use an online tool like jsonschema.net — paste a sample JSON response and it generates a schema. (2) Use the json-schema-generator npm package for Node.js. (3) Use Quicktype (quicktype.io) which generates schemas and TypeScript interfaces simultaneously. (4) Use Postman\'s built-in schema generation from response examples. After generating, always review and tighten the schema — add required fields, format validators, and remove overly permissive patterns.',
        },
        {
          question: 'What\'s the difference between JSON Schema Draft 4, 7, and 2020-12?',
          answer: 'Draft 7 is the sweet spot — widely supported by all major libraries and tooling, with useful additions like if/then/else conditionals, readOnly/writeOnly keywords, and the $comment keyword. Draft 2020-12 (the latest) adds $defs (replacing definitions), more powerful if/then/else, and better $ref handling. Most projects should target Draft 7 for maximum library compatibility. Avoid Draft 4 for new projects — it lacks if/then/else and other useful features.',
        },
        {
          question: 'How do I handle nested object validation errors clearly?',
          answer: 'With ajv, validation errors include instancePath (e.g., "/profile/firstName") showing exactly where in the nested structure the error occurred. Use ajv.errorsText(errors, { separator: "\\n", dataVar: "response" }) for human-readable output. For your own error formatting, map over validate.errors and combine instancePath + message. Collecting all errors at once (allErrors: true option) is much more useful than stopping at the first error, especially for debugging API response issues.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
