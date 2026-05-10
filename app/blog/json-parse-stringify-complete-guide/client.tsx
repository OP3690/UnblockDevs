'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function JsonParseStringifyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON.parse() and JSON.stringify() — The Complete Developer Guide</h1>
      <p className="lead">
        <code>JSON.parse()</code> and <code>JSON.stringify()</code> are two of the most-called functions
        in JavaScript — and most developers use only 10% of what they can do. Both functions accept
        powerful second and third arguments that most tutorials skip entirely. This guide covers
        everything: every parameter, every edge case, error handling patterns, TypeScript-safe usage,
        performance tips, and the surprising behaviour that catches experienced developers off guard.
      </p>

      <StatGrid stats={[
        { value: '3', label: 'arguments JSON.stringify() accepts — most devs use only 1', color: 'blue' },
        { value: '2', label: 'arguments JSON.parse() accepts — the reviver is rarely taught', color: 'amber' },
        { value: '9007199254740991', label: 'max safe integer — JSON loses precision beyond this', color: 'red' },
        { value: 'toJSON()', label: 'the custom serialization hook that changes everything', color: 'green' },
      ]} />

      <SectionHeader number={1} title="JSON.stringify() — Full Signature and Every Parameter" />

      <CodeBlock language="javascript" filename="JSON.stringify() — complete signature">
{`JSON.stringify(value, replacer, space)

// value    — the JavaScript value to convert to a JSON string
// replacer — (optional) Array or Function that filters/transforms output
// space    — (optional) String or Number for indentation

// Examples:
JSON.stringify({ a: 1 })               // '{"a":1}'  — compact, no indent
JSON.stringify({ a: 1 }, null, 2)      // pretty-printed with 2-space indent
JSON.stringify({ a: 1 }, null, '\\t')   // pretty-printed with tab indent
JSON.stringify({ a: 1 }, ['a'])        // '{"a":1}'  — only include key 'a'
JSON.stringify({ a: 1 }, (k, v) => v) // '{"a":1}'  — identity replacer`}
      </CodeBlock>

      <SectionHeader number={2} title="The replacer — Filter and Transform with Precision" />
      <p>
        The second argument to <code>JSON.stringify()</code> is the most powerful feature most
        developers never use. It can be an array of keys to include, or a function that transforms
        or filters every value during serialization.
      </p>

      <CodeBlock language="javascript" filename="replacer as an Array — whitelist keys">
{`const user = {
  id: 1,
  name: 'Alice',
  password: 'secret123',    // ← we NEVER want this in output
  apiKey: 'sk-...',          // ← or this
  email: 'alice@example.com',
  createdAt: '2026-01-15',
};

// Array replacer: only these keys will appear in the output
const safe = JSON.stringify(user, ['id', 'name', 'email']);
// → '{"id":1,"name":"Alice","email":"alice@example.com"}'
// password and apiKey are completely absent — safe to send to client

// Useful for: safe serialization of objects that contain sensitive fields
// Limitation: must enumerate keys manually; doesn't apply recursively in a smart way`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="replacer as a Function — transform every value">
{`// Function signature: (key: string, value: any) => any
// Return undefined to OMIT the key entirely
// Return any other value to use that value

const data = {
  name: 'Alice',
  password: 'secret',
  balance: 1234567.891234567890,  // floating point precision issue
  createdAt: new Date('2026-01-15'),
  tags: null,
  score: undefined,               // will be omitted by default
  callback: () => {},             // functions are always omitted
};

const clean = JSON.stringify(data, (key, value) => {
  // Skip sensitive fields
  if (key === 'password' || key === 'apiKey') return undefined;

  // Format dates as ISO strings (Date objects become strings automatically,
  // but you can control the format here)
  if (value instanceof Date) return value.toISOString().split('T')[0]; // date only

  // Round floating point numbers to 2 decimal places
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return Math.round(value * 100) / 100;
  }

  return value; // return everything else as-is
}, 2);

console.log(clean);
// {
//   "name": "Alice",
//   "balance": 1234567.89,
//   "createdAt": "2026-01-15",
//   "tags": null
// }
// password: omitted by replacer
// score: omitted (undefined values are always skipped in objects)
// callback: omitted (functions are always skipped)`}
      </CodeBlock>

      <AlertBox type="tip" title="The root call — replacer receives key='' first">
        When using a function replacer, the very first call is <code>(key='', value=theWholeObject)</code>.
        The empty string key represents the root. This lets you transform or replace the entire
        top-level value before recursion begins. If you return <code>undefined</code> at the root,
        <code>JSON.stringify()</code> returns <code>undefined</code> (not a string).
      </AlertBox>

      <CodeBlock language="javascript" filename="Practical replacer — omit undefined and circular-safe">
{`// Production-safe replacer that handles common edge cases
function safeReplacer(key, value) {
  // Skip undefined (JSON.stringify already does this for objects,
  // but arrays turn undefined into null — this keeps them out entirely)
  if (value === undefined) return '[undefined]'; // or return undefined to omit

  // Skip functions
  if (typeof value === 'function') return '[Function]';

  // Skip Symbol values
  if (typeof value === 'symbol') return '[Symbol]';

  // Represent BigInt (throws by default)
  if (typeof value === 'bigint') return value.toString();

  return value;
}

JSON.stringify({ a: undefined, b: null, fn: () => {} }, safeReplacer);
// → '{"a":"[undefined]","b":null,"fn":"[Function]"}'

// Default behaviour without replacer:
JSON.stringify({ a: undefined, b: null, fn: () => {} });
// → '{"b":null}'  — a and fn are silently gone`}
      </CodeBlock>

      <SectionHeader number={3} title="JSON.stringify() Edge Cases That Surprise Everyone" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'undefined is omitted from objects',
          description: 'JSON.stringify({ a: undefined, b: 1 }) → \'{"b":1}\'. The key "a" disappears entirely. This is intentional — JSON has no undefined. In arrays, undefined becomes null: [undefined, 1] → "[null,1]".',
        },
        {
          title: 'NaN and Infinity become null',
          description: 'JSON.stringify({ x: NaN, y: Infinity, z: -Infinity }) → \'{"x":null,"y":null,"z":null}\'. JSON has no NaN or Infinity. They are replaced by null silently — no error, no warning.',
        },
        {
          title: 'Date objects become ISO strings',
          description: 'Date objects have a toJSON() method that returns the ISO 8601 string. JSON.stringify(new Date()) → \'"2026-01-15T10:30:00.000Z"\'. When you parse this back, it comes back as a string, not a Date — you must convert it in a reviver.',
        },
        {
          title: 'BigInt throws a TypeError',
          description: 'JSON.stringify(42n) throws "TypeError: Do not know how to serialize a BigInt". Fix: use a replacer that converts BigInt to string, or use Number() if it fits in safe integer range.',
        },
        {
          title: 'Circular references throw',
          description: 'const obj = {}; obj.self = obj; JSON.stringify(obj) throws "TypeError: Converting circular structure to JSON". Fix: use a WeakSet in a replacer to track visited objects and skip them.',
        },
        {
          title: 'toJSON() method is called automatically',
          description: 'If a value has a toJSON() method, JSON.stringify() calls it and uses the return value. Date uses this. You can add toJSON() to any custom class to control how it serializes.',
        },
        {
          title: 'Functions, Symbols, undefined are dropped',
          description: 'Object properties with function, symbol, or undefined values are silently omitted. This is by design — these types have no JSON representation. This can cause subtle bugs if you rely on these properties surviving a stringify/parse round-trip.',
        },
        {
          title: 'Number precision is limited',
          description: 'JSON.stringify(9007199254740993) → "9007199254740992" — the value changes! Numbers beyond Number.MAX_SAFE_INTEGER lose precision. Use BigInt and a custom replacer, or keep large integers as strings in JSON.',
        },
      ]} />

      <CodeBlock language="javascript" filename="Handling circular references">
{`// Circular reference example:
const obj = { name: 'Alice' };
obj.self = obj; // circular!
JSON.stringify(obj); // ❌ TypeError: Converting circular structure to JSON

// Fix 1: replacer with WeakSet
function circularReplacer() {
  const seen = new WeakSet();
  return function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  };
}
JSON.stringify(obj, circularReplacer()); // → '{"name":"Alice","self":"[Circular]"}'

// Fix 2: npm install flatted (preserves circular refs round-trip)
import { stringify, parse } from 'flatted';
const str = stringify(obj);
const restored = parse(str); // ✅ circular reference preserved`}
      </CodeBlock>

      <SectionHeader number={4} title="JSON.parse() — Full Signature and the Reviver" />

      <CodeBlock language="javascript" filename="JSON.parse() — complete signature">
{`JSON.parse(text, reviver)

// text    — the JSON string to parse
// reviver — (optional) Function called on each parsed value during deserialization

// Basic usage:
JSON.parse('{"a":1}')              // → { a: 1 }
JSON.parse('[1,2,3]')              // → [1, 2, 3]
JSON.parse('"hello"')              // → 'hello'  (a JSON string)
JSON.parse('null')                 // → null
JSON.parse('true')                 // → true

// With reviver:
JSON.parse('{"d":"2026-01-15"}', (key, value) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value);  // convert date strings back to Date objects
  }
  return value;
});
// → { d: Date(2026-01-15) }  — dates are real Date objects again!`}
      </CodeBlock>

      <p>
        The reviver function is called <em>bottom-up</em> — deepest nested values first, then
        their parents. The final call is on the root with key <code>{'""'}</code>.
        If the reviver returns <code>undefined</code>, the key is deleted from the parsed result.
      </p>

      <CodeBlock language="javascript" filename="Powerful reviver patterns">
{`// Pattern 1: Restore Date objects from ISO strings
const withDates = JSON.parse(jsonString, (key, value) => {
  if (typeof value === 'string') {
    // ISO 8601 date-time pattern
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(value)) {
      return new Date(value);
    }
  }
  return value;
});

// Pattern 2: Restore BigInt values (stored as strings)
const withBigInt = JSON.parse(jsonString, (key, value) => {
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
});

// Pattern 3: Delete keys from parsed result
const filtered = JSON.parse(jsonString, (key, value) => {
  if (key === 'password' || key === 'apiKey') return undefined; // delete
  return value;
});

// Pattern 4: Transform numbers to strings (prevent precision loss for large IDs)
const safeIds = JSON.parse(jsonString, (key, value) => {
  if (key.endsWith('Id') && typeof value === 'number') {
    return String(value); // keep as string to prevent precision loss
  }
  return value;
});

// Pattern 5: Full round-trip — Date objects survive stringify/parse
function stringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) return { __type: 'Date', __value: value.toISOString() };
    return value;
  });
}
function parse(json) {
  return JSON.parse(json, (key, value) => {
    if (value?.__type === 'Date') return new Date(value.__value);
    return value;
  });
}
const restored = parse(stringify({ created: new Date() }));
// restored.created is a real Date object, not a string`}
      </CodeBlock>

      <SectionHeader number={5} title="Error Handling — The Patterns You Must Use" />
      <QuickFact color="red" label="JSON.parse() throws — always use try-catch">
        <code>JSON.parse()</code> throws a <code>SyntaxError</code> for any invalid JSON input.
        Unlike many async APIs, this is a synchronous throw. If you do not wrap it in a
        <code>try-catch</code>, an invalid input will crash your entire function call stack.
        Every production <code>JSON.parse()</code> call must be wrapped.
      </QuickFact>

      <ErrorFix
        bad={`// ❌ No error handling — one bad response crashes everything
async function loadUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();  // throws if response is not JSON
  return data;
}`}
        good={`// ✅ Full error handling — safe for production
async function loadUserData(userId) {
  let response;
  try {
    response = await fetch(\`/api/users/\${userId}\`);
  } catch (networkError) {
    throw new Error(\`Network error fetching user \${userId}: \${networkError.message}\`);
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '(unreadable)');
    throw new Error(\`API returned \${response.status}: \${errorText.slice(0, 200)}\`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(\`Expected JSON, got \${contentType}. Body: \${text.slice(0, 200)}\`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (parseError) {
    throw new Error(\`JSON parse failed: \${parseError.message}. Raw: \${text.slice(0, 500)}\`);
  }
}`}
        badLabel="No error handling — brittle"
        goodLabel="Full error handling — production-grade"
      />

      <CodeBlock language="javascript" filename="Utility functions — safe parse with Result type">
{`// Option 1: Return { data, error } — never throws
function safeParse(text) {
  try {
    return { data: JSON.parse(text), error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// Usage:
const { data, error } = safeParse(apiResponse);
if (error) { console.error('Parse failed:', error); return; }
console.log(data.name);

// Option 2: TypeScript version with generic type
function safeParseTyped<T>(text: string): { data: T; error: null } | { data: null; error: string } {
  try {
    return { data: JSON.parse(text) as T, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// Usage with TypeScript:
const result = safeParseTyped<{ name: string; age: number }>(apiResponse);
if (result.error) { return; }
console.log(result.data.name); // TypeScript knows the type

// Option 3: Default value fallback
function parseOrDefault<T>(text: string, defaultValue: T): T {
  try { return JSON.parse(text) as T; }
  catch { return defaultValue; }
}
const settings = parseOrDefault(localStorage.getItem('settings') ?? '', { theme: 'light' });`}
      </CodeBlock>

      <SectionHeader number={6} title="toJSON() — Custom Serialization for Your Classes" />
      <p>
        Any object with a <code>toJSON()</code> method controls how it is serialized by
        <code>JSON.stringify()</code>. The return value of <code>toJSON()</code> replaces
        the object in the output. This is how <code>Date</code> objects work — and you can
        use the same mechanism for your own classes.
      </p>

      <CodeBlock language="javascript" filename="toJSON() — custom class serialization">
{`class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  // JSON.stringify() calls this automatically
  toJSON() {
    return {
      amount: this.amount,
      currency: this.currency,
      formatted: \`\${this.currency} \${this.amount.toFixed(2)}\`,
    };
  }

  // Static factory — parse back from JSON
  static fromJSON(obj) {
    return new Money(obj.amount, obj.currency);
  }
}

const price = new Money(29.99, 'USD');
const json = JSON.stringify({ item: 'Book', price });
// → '{"item":"Book","price":{"amount":29.99,"currency":"USD","formatted":"USD 29.99"}}'

// Useful for: sensitive fields, computed properties, class instances, version tagging

// ── Hiding sensitive fields with toJSON() ──────────────────────────────────
class User {
  constructor(id, name, email, passwordHash) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash; // NEVER expose this
  }

  toJSON() {
    // Return only safe fields — passwordHash never appears in JSON output
    return { id: this.id, name: this.name, email: this.email };
  }
}

const user = new User(1, 'Alice', 'alice@example.com', '$2b$10$...');
JSON.stringify(user);
// → '{"id":1,"name":"Alice","email":"alice@example.com"}'
// passwordHash is completely absent ✅`}
      </CodeBlock>

      <SectionHeader number={7} title="TypeScript — Type-Safe JSON Parsing" />
      <p>
        TypeScript makes JSON safer but requires deliberate patterns. <code>JSON.parse()</code>
        returns <code>any</code> in TypeScript, which silently bypasses type checking.
        You must validate the parsed shape explicitly.
      </p>

      <CodeBlock language="typescript" filename="TypeScript-safe JSON parsing patterns">
{`import { z } from 'zod'; // npm install zod

// ── Pattern 1: Zod schema validation ─────────────────────────────────────
const UserSchema = z.object({
  id:    z.number(),
  name:  z.string(),
  email: z.string().email(),
  role:  z.enum(['admin', 'editor', 'viewer']),
});

type User = z.infer<typeof UserSchema>; // TypeScript type from schema

function parseUser(json: string): User {
  const raw = JSON.parse(json); // any
  return UserSchema.parse(raw); // throws ZodError if schema doesn't match
}

// ── Pattern 2: Type assertion with guard ─────────────────────────────────
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof (value as { id: unknown }).id === 'number' &&
    'name' in value && typeof (value as { name: unknown }).name === 'string' &&
    'email' in value && typeof (value as { email: unknown }).email === 'string'
  );
}

function parseUserGuard(json: string): User {
  const raw: unknown = JSON.parse(json);
  if (!isUser(raw)) throw new TypeError('Parsed JSON is not a valid User');
  return raw; // TypeScript now knows the type
}

// ── Pattern 3: Generic safe parse with Zod ────────────────────────────────
function parseJson<T>(schema: z.ZodType<T>, json: string): T {
  const raw = JSON.parse(json);
  return schema.parse(raw);
}

// Usage:
const user = parseJson(UserSchema, apiResponseText);
// user is fully typed as User — no any, no unsafe casts`}
      </CodeBlock>

      <SectionHeader number={8} title="Performance — When Speed Matters" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'JSON.stringify() is fast — use it',
          description: 'For objects under a few MB, JSON.stringify() is extremely fast — typically sub-millisecond. For deep cloning small-to-medium objects, JSON.parse(JSON.stringify(obj)) is often faster than recursive clone libraries for pure-JSON-compatible data.',
        },
        {
          title: 'Avoid for very large objects',
          description: 'For objects over 10 MB, JSON.stringify() blocks the event loop. Use streaming JSON libraries (JSONStream, stream-json) for large payloads. In Node.js, consider worker threads to offload heavy serialization.',
        },
        {
          title: 'space argument has a cost',
          description: 'Adding indentation (space parameter) increases output size by 15–40% and adds measurable serialization time for large objects. Only use it for debugging and logging, never for API responses or storage.',
        },
        {
          title: 'JSON vs other serialization formats',
          description: 'JSON is slower and larger than MessagePack or Protocol Buffers for high-throughput internal APIs. For browser-to-server communication where human-readability matters, JSON is the right choice. For microservice-to-microservice with millions of messages, consider binary formats.',
        },
      ]} />

      <CodeBlock language="javascript" filename="Performance comparison patterns">
{`// Deep clone — JSON round-trip (fast for JSON-compatible data)
const clone = JSON.parse(JSON.stringify(original));
// ✅ Fast, works for all JSON-compatible types
// ❌ Loses Date objects (become strings), functions, undefined, circular refs

// Measuring JSON performance:
console.time('stringify');
const str = JSON.stringify(largeObject);
console.timeEnd('stringify');

console.time('parse');
const obj = JSON.parse(str);
console.timeEnd('parse');

// For streaming large JSON responses:
// npm install stream-json
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { createReadStream } from 'fs';

const pipeline = createReadStream('large.json')
  .pipe(parser())
  .pipe(streamArray());

pipeline.on('data', ({ key, value }) => {
  // Process each array element as it streams — no full parse in memory
  processItem(value);
});`}
      </CodeBlock>

      <SectionHeader number={9} title="JSON.stringify() vs JSON.parse() — Common Patterns Compared" />

      <CodeBlock language="javascript" filename="Every common use case at a glance">
{`// ── Pretty printing for debugging ──────────────────────────────────────────
console.log(JSON.stringify(complexObj, null, 2));   // 2-space indent
console.log(JSON.stringify(complexObj, null, '\\t')); // tab indent

// ── Deep clone (JSON-compatible objects only) ──────────────────────────────
const clone = JSON.parse(JSON.stringify(original));

// ── Filtering sensitive keys ───────────────────────────────────────────────
const safe = JSON.stringify(user, ['id', 'name', 'email']);

// ── Compact JSON for storage/transfer ─────────────────────────────────────
const compact = JSON.stringify(data); // no space argument

// ── Storing to localStorage ────────────────────────────────────────────────
localStorage.setItem('settings', JSON.stringify(settings));
const settings = JSON.parse(localStorage.getItem('settings') ?? '{}');

// ── API request body ───────────────────────────────────────────────────────
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

// ── Comparing objects by value ─────────────────────────────────────────────
function jsonEqual(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
// ⚠️ Warning: JSON.stringify() is not order-independent for object keys
// {a:1,b:2} === {b:2,a:1} fails with this approach
// Better: use a deep equal library like lodash.isEqual

// ── Detecting changes ──────────────────────────────────────────────────────
const snapshot = JSON.stringify(state);
// ... later ...
if (JSON.stringify(state) !== snapshot) { console.log('State changed!'); }

// ── Safely reading API responses ───────────────────────────────────────────
const response = await fetch('/api/data');
if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
const data = await response.json(); // shorthand for JSON.parse(await response.text())`}
      </CodeBlock>

      <AlertBox type="warning" title="JSON.stringify() key ordering is not guaranteed">
        ECMAScript specifies a specific key ordering algorithm (integer keys first, then string keys in
        insertion order, then Symbol keys), but this is a JavaScript engine detail. Different JSON
        parsers in other languages may return keys in different orders. Never rely on JSON key order
        for equality checks — use a deep-equal library instead. For API contracts, this means two
        semantically identical JSON objects may produce different strings.
      </AlertBox>

      <div className="my-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 text-center">
        <p className="text-sm font-semibold text-violet-900 mb-1">🔍 AI JSON Error Explainer</p>
        <p className="text-sm text-zinc-600 mb-4">
          When JSON.parse() throws an error, paste the broken JSON into our free AI JSON Error Explainer.
          It detects all errors simultaneously — trailing commas, Python True/False/None, single quotes,
          unquoted keys — explains each one with RFC spec references, and fixes them with one click.
        </p>
        <a href="/json-error-explainer"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
          Explain My JSON Errors →
        </a>
      </div>

      <FAQAccordion items={[
        {
          question: 'What does JSON.stringify() return for undefined, null, and NaN?',
          answer: 'JSON.stringify(undefined) returns undefined (not the string "undefined"). JSON.stringify(null) returns the string "null". JSON.stringify(NaN) returns the string "null". JSON.stringify(Infinity) returns "null". In objects: undefined and function values make the key disappear entirely. In arrays: undefined and function values become null. This inconsistent behaviour surprises many developers — always use a replacer if you need predictable output for these values.',
        },
        {
          question: 'How do I stringify an object that contains a Date and parse it back as a Date?',
          answer: 'Dates become ISO strings during stringify. To get them back as Date objects, use a reviver: JSON.parse(json, (key, value) => { if (typeof value === "string" && /^\\d{4}-\\d{2}-\\d{2}T/.test(value)) return new Date(value); return value; }). Alternatively, tag the type: store { __type: "Date", value: date.toISOString() } and convert in the reviver. Libraries like devalue and superjson handle this automatically.',
        },
        {
          question: 'Why does JSON.stringify(9007199254740993) produce the wrong number?',
          answer: 'JavaScript\'s Number type uses IEEE 754 double-precision floating point, which can only represent integers exactly up to 2^53-1 = 9007199254740991. Larger integers are rounded to the nearest representable value. JSON does not have a BigInt type, so you must store large integers as strings in JSON. To convert: BigInt(myNumber).toString() to store, BigInt(parsedString) to restore. The JSON.stringify() BigInt error (TypeError: Do not know how to serialize a BigInt) is deliberate — use a replacer: (key, value) => typeof value === "bigint" ? value.toString() : value.',
        },
        {
          question: 'Is JSON.parse(JSON.stringify()) a good way to deep clone an object?',
          answer: 'It is fast and works well for plain objects containing only JSON-compatible types (string, number, boolean, null, arrays, plain objects). It fails silently for: Date objects (become strings), undefined values (disappear), functions (disappear), Symbols (disappear), Infinity (becomes null), NaN (becomes null), circular references (throws). For deep cloning arbitrary JavaScript objects, use structuredClone() (modern browsers/Node 17+) which handles Date, RegExp, Map, Set, Uint8Array, and circular references correctly.',
        },
        {
          question: 'What is the difference between response.json() and JSON.parse(await response.text())?',
          answer: 'response.json() is literally shorthand for JSON.parse(await response.text()) with the same error behaviour. The key difference is error inspection: if you use response.json() and it throws, you have already consumed the response stream and cannot call response.text() again to see what was returned. For debugging, use response.text() first, log the raw string, then JSON.parse() it manually. This gives you the actual server response when the parse fails.',
        },
        {
          question: 'How do I handle BigInt in JSON without losing precision?',
          answer: 'BigInt throws by default in JSON.stringify(). The two common approaches: (1) Store as string — use a replacer: (key, value) => typeof value === "bigint" ? value.toString() : value, and a reviver to convert back. (2) Store as a tagged object: { __type: "bigint", value: "9007199254740993" }. For database IDs larger than 2^53, this is critical — PostgreSQL BIGINT (up to 9.2×10^18) and MongoDB ObjectIds frequently exceed JavaScript safe integer range.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
