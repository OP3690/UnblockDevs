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

export default function HowToValidateJsonClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Validate JSON — Syntax Checking, Schema Validation &amp; Error Fixes</h1>
      <p className="lead">
        Validating JSON means two different things: checking that the syntax is correct (the
        JSON can be parsed), and checking that the structure matches what your application
        expects (the right fields, types, and required values are present). This guide covers
        both — syntax validation with exact error messages, schema validation with JSON Schema
        drafts, and how to fix the most common JSON validation failures.
      </p>

      <StatGrid stats={[
        { value: 'Syntax', label: 'Is this valid JSON? — quotes, brackets, commas, no comments', color: 'blue' },
        { value: 'Schema', label: 'Does this JSON have the right fields and types? — JSON Schema validation', color: 'green' },
        { value: 'Line:col', label: 'Exact error position — not just "invalid JSON", but where and why', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Two Types of JSON Validation — Syntax vs. Schema" />
      <p>
        Most developers think of JSON validation as syntax checking. But in production
        systems, schema validation is equally important — it catches valid-syntax JSON that
        still breaks your application because a required field is missing or a value has the
        wrong type.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Syntax validation',
          description:
            'Checks that the JSON string is parseable — correct use of quotes, brackets, commas, and no forbidden characters like comments. A syntax error means JSON.parse() will throw. All major programming languages have built-in JSON parsers that do this.',
        },
        {
          title: 'Schema validation',
          description:
            'Checks that the parsed JSON conforms to an expected structure — required fields present, values have the right types, strings match patterns, numbers are in range. JSON Schema (Draft 4–2020-12) is the standard format for defining these constraints.',
        },
        {
          title: 'When syntax validation is enough',
          description:
            'For ad-hoc debugging, quick checks before committing a JSON config file, and formatting tools that need to parse before pretty-printing. Most developer tools and online formatters do syntax validation.',
        },
        {
          title: 'When schema validation is required',
          description:
            'For API request validation (reject invalid payloads before processing), CI pipeline checks (config files match expected schema), and data pipeline validation (incoming records have all required fields with correct types).',
        },
      ]} />

      <SectionHeader number={2} title="Syntax Validation — Is This Valid JSON?" />
      <p>
        The JSON specification (RFC 8259) is strict: double-quoted strings, no trailing
        commas, no comments, no undefined, no single quotes. Any deviation is a syntax error.
      </p>

      <CodeBlock lang="javascript" title="Syntax validation in JavaScript">
{`// Built-in: JSON.parse() throws SyntaxError for invalid JSON
function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// Better: get the error message with position
function validateJson(str) {
  try {
    const parsed = JSON.parse(str);
    return { valid: true, data: parsed };
  } catch (e) {
    return {
      valid: false,
      error: e.message,  // e.g. "Unexpected token , in JSON at position 45"
    };
  }
}

// Usage
const result = validateJson('{"name": "Alice",}');
// { valid: false, error: "Unexpected token } in JSON at position 18" }`}
      </CodeBlock>

      <CodeBlock lang="python" title="Syntax validation in Python">
{`import json

def validate_json(json_string: str) -> dict:
    try:
        data = json.loads(json_string)
        return {'valid': True, 'data': data}
    except json.JSONDecodeError as e:
        return {
            'valid': False,
            'error': str(e),
            'line': e.lineno,
            'column': e.colno,
            'position': e.pos,
        }

result = validate_json('{"name": "Alice",}')
# {'valid': False, 'error': 'Trailing comma...', 'line': 1, 'column': 18}`}
      </CodeBlock>

      <AlertBox type="tip" title="Validate without writing code">
        Paste any JSON into the{' '}
        <a href="https://unblockdevs.com/json-validator" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          JSON Validator at unblockdevs.com/json-validator
        </a>{' '}
        — it shows the exact line and column of every error, auto-highlights the problem in
        the editor, and suggests the fix. Works for syntax validation and JSON Schema
        validation in one tool.
      </AlertBox>

      <SectionHeader number={3} title="Schema Validation — Does the JSON Have the Right Structure?" />
      <p>
        JSON Schema defines the expected shape of JSON data. It specifies required fields,
        value types, string patterns, number ranges, and array constraints. A validator
        checks your JSON against the schema and reports every mismatch.
      </p>

      <CodeBlock lang="json" title="JSON Schema example — user object validation">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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
      "maxLength": 100
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
    }
  },
  "additionalProperties": false
}`}
      </CodeBlock>

      <CodeBlock lang="json" title="Valid JSON — passes all schema checks">
{`{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "admin"
}
// ✓ All required fields present
// ✓ id is integer ≥ 1
// ✓ name is string 2–100 chars
// ✓ email matches email format
// ✓ role is one of allowed enum values`}
      </CodeBlock>

      <CodeBlock lang="json" title="Invalid JSON — schema validation errors">
{`{
  "id": "forty-two",
  "name": "A",
  "email": "not-an-email",
  "role": "superuser",
  "unexpectedField": true
}
// ✗ id: must be integer (got string)
// ✗ name: must be at least 2 characters (got 1)
// ✗ email: must match email format
// ✗ role: must be one of ["admin","editor","viewer","guest"]
// ✗ unexpectedField: additional properties not allowed`}
      </CodeBlock>

      <SectionHeader number={4} title="Validate JSON in Code — Express, Fastify, Python" />

      <CodeBlock lang="javascript" title="JSON Schema validation with AJV in Node.js">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';  // for email, uri, date-time formats

const ajv = new Ajv({ allErrors: true }); // allErrors: report ALL errors, not just first
addFormats(ajv);

const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email', 'role'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 2, maxLength: 100 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'editor', 'viewer', 'guest'] },
  },
  additionalProperties: false,
};

const validate = ajv.compile(userSchema);

// In an Express route
app.post('/users', (req, res) => {
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      error: 'Validation failed',
      details: validate.errors,  // array of all validation errors
    });
  }
  // proceed with valid data
  createUser(req.body);
});`}
      </CodeBlock>

      <CodeBlock lang="python" title="JSON Schema validation with jsonschema in Python">
{`import json
import jsonschema
from jsonschema import validate, ValidationError

schema = {
    "type": "object",
    "required": ["id", "name", "email"],
    "properties": {
        "id": {"type": "integer", "minimum": 1},
        "name": {"type": "string", "minLength": 2},
        "email": {"type": "string", "format": "email"},
    }
}

def validate_user(data: dict) -> list[str]:
    validator = jsonschema.Draft202012Validator(schema)
    errors = list(validator.iter_errors(data))
    return [e.message for e in errors]

# Usage
user = {"id": "not-an-int", "name": "A", "email": "bad-email"}
errors = validate_user(user)
# ['\'not-an-int\' is not of type \'integer\'',
#  '\'A\' is too short',
#  '\'bad-email\' is not a \'email\'']`}
      </CodeBlock>

      <SectionHeader number={5} title="Common JSON Validation Errors and How to Fix Them" />

      <ErrorFix
        title="Required field missing"
        bad={`// Schema requires: id, name, email, role
// Submitted JSON:
{
  "id": 42,
  "name": "Alice"
  // email and role are missing
}
// Validation error: required fields 'email', 'role' are missing`}
        good={`// All required fields present
{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "editor"
}`}
        badLabel="Missing required fields — API returns 400"
        goodLabel="All required fields present — validation passes"
      />

      <ErrorFix
        title="Wrong type — string sent where integer expected"
        bad={`// Schema: { "id": { "type": "integer" } }
// Common when reading from form inputs or URL params:
{
  "id": "42",     ← string "42", not integer 42
  "name": "Alice"
}
// Validation error: /id must be integer`}
        good={`// Parse/cast before sending to API
const id = parseInt(formData.get('id'), 10);
const payload = { id, name: formData.get('name') };

// Or in the JSON:
{
  "id": 42,      ← integer 42, no quotes
  "name": "Alice"
}`}
        badLabel="String &quot;42&quot; fails integer type check"
        goodLabel="Integer 42 — no quotes, passes integer validation"
      />

      <SectionHeader number={6} title="Validate JSON Online — Without Writing Code" />

      <VerticalSteps steps={[
        {
          title: 'Paste your JSON into the validator',
          desc: 'Go to unblockdevs.com/json-validator. Paste the JSON you want to validate in the left panel. Syntax errors appear immediately with line and column numbers.',
        },
        {
          title: 'Add a JSON Schema (optional)',
          desc: 'Paste your JSON Schema in the right panel. The validator checks the JSON against the schema and lists every mismatch — missing required fields, wrong types, enum violations, and additional properties.',
        },
        {
          title: 'Read the error report',
          desc: 'Each error shows the JSON path (e.g., /user/email), the constraint that failed, and the actual value. Use these to fix the JSON or update the schema.',
        },
        {
          title: 'Test different JSON Schema drafts',
          desc: 'The validator supports Draft 4, 6, 7, 2019-09, and 2020-12. Select the draft your schema targets — different drafts support different keywords ($defs vs definitions, unevaluatedProperties, etc.).',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'How do I validate JSON syntax online?',
          answer: 'Go to unblockdevs.com/json-validator and paste your JSON. The tool checks syntax instantly and highlights any errors with the exact line and column number. Alternatively, open your browser console and run: try { JSON.parse(yourJsonString); console.log("valid"); } catch(e) { console.log(e.message); }',
        },
        {
          question: 'What is the difference between JSON syntax validation and JSON Schema validation?',
          answer: 'Syntax validation checks that the JSON is parseable — correct quotes, brackets, commas, and no comments. Schema validation checks that the parsed JSON has the right structure — required fields present, values have correct types, strings match patterns. Syntax validation is always the first step (you cannot validate a schema against unparseable JSON). Schema validation is the second step for ensuring the data structure is correct.',
        },
        {
          question: 'How do I validate JSON against a schema in JavaScript?',
          answer: 'Use the AJV library: npm install ajv ajv-formats. Create a validator: const validate = new Ajv().compile(schema). Call validate(data) — it returns true or false. Check validate.errors for all error details. AJV supports all JSON Schema drafts (4, 6, 7, 2019-09, 2020-12) and is the most widely used JSON Schema validator in the JavaScript ecosystem.',
        },
        {
          question: 'Why does my JSON fail validation even though it looks correct?',
          answer: 'Common causes: (1) trailing comma after the last property or array element, (2) single-quoted strings instead of double-quoted, (3) JavaScript comments in the JSON (not allowed), (4) unquoted property keys. Check the exact error position — the validator shows line and column numbers so you can find the exact character causing the failure.',
        },
        {
          question: 'Which JSON Schema draft should I use?',
          answer: 'For new projects, use Draft 2020-12 (the current standard). For projects using AJV 6, use Draft 7 (the last version AJV 6 supports). For OpenAPI 3.0 schemas, use Draft 7. For OpenAPI 3.1, use Draft 2020-12. The JSON Validator at unblockdevs.com/json-validator supports all drafts — select the one matching your schema\'s $schema declaration.',
        },
        {
          question: 'Can I validate JSON for free online?',
          answer: 'Yes — the JSON Validator at unblockdevs.com/json-validator validates JSON syntax and structure (against a JSON Schema) entirely in your browser. No account, no upload — your data never leaves your machine. Supports JSON Schema Draft 4, 6, 7, 2019-09, and 2020-12. Reports exact error positions with line and column numbers.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
