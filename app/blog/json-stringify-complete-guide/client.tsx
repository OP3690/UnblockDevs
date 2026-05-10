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

export default function JsonStringifyCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON.stringify() Complete Guide — Options, Replacer, Space &amp; Real-World Examples</h1>
      <p className="lead">
        <code>JSON.stringify()</code> converts JavaScript objects to JSON strings — but most
        developers only ever use its simplest form. The function takes three parameters, handles
        a dozen special value types differently, and has a replacer function that can filter and
        transform your data on the fly. This guide covers everything: the full signature, all
        three parameters, output formatting, real-world patterns, and the most common mistakes.
      </p>

      <StatGrid stats={[
        { value: '3 params', label: 'value, replacer, space — most devs only ever use the first', color: 'blue' },
        { value: 'undefined', label: 'Silently stripped from objects — the #1 cause of data loss bugs', color: 'red' },
        { value: '1 tool', label: 'Simulate JSON.stringify() instantly — no Node.js or browser console needed', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="JSON.stringify() Signature — All Three Parameters" />
      <p>
        Most code uses only the first parameter. Understanding all three unlocks formatting
        control, field filtering, and data transformation that would otherwise require manual
        loops.
      </p>

      <CodeBlock lang="javascript" title="Full JSON.stringify() signature">
{`JSON.stringify(value, replacer, space)

// value    — required: the value to serialize
//             objects, arrays, strings, numbers, booleans, null
// replacer — optional: controls which fields are included
//             Array<string> → whitelist of keys to keep
//             Function(key, value) → return value to keep, undefined to omit
// space    — optional: indentation
//             0 or omit → compact, single-line output
//             2 → 2-space indent (most common for readability)
//             4 → 4-space indent
//             '\\t' → tab indent

// Returns: a JSON string, or undefined for top-level undefined/Function/Symbol
// Throws:  TypeError for circular references or BigInt values`}
      </CodeBlock>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'value (required)',
          description:
            'Any JavaScript value. Objects and arrays are recursively serialized. Primitives become their JSON representation. undefined, Symbol, and Function values are stripped from object properties or become null in arrays.',
        },
        {
          title: 'replacer (optional)',
          description:
            'An array of strings to whitelist specific keys, or a function called for every key-value pair that returns the value to serialize — or undefined to omit it. Pass null to skip replacer while still using the space parameter.',
        },
        {
          title: 'space (optional)',
          description:
            'A number (1–10) of spaces, or a string (up to 10 chars) used as the indent. Omit for compact output. Use 2 for standard pretty-print. Numbers above 10 and strings longer than 10 chars are capped automatically.',
        },
        {
          title: 'Return value',
          description:
            'A valid JSON string, or the JavaScript value undefined (not a string) if the top-level input is undefined, a Function, or a Symbol. Throws TypeError for circular references and BigInt values.',
        },
      ]} />

      <SectionHeader number={2} title="Compact vs. Pretty-Print — the space Parameter" />
      <p>
        The <code>space</code> parameter controls output format. Compact is smaller — ideal for
        API payloads, localStorage, and cookies. Pretty is human-readable — ideal for debugging,
        config files, and log entries.
      </p>

      <CodeBlock lang="javascript" title="space parameter examples — all formats">
{`const user = {
  id: 42,
  name: 'Alice',
  roles: ['admin', 'editor'],
  address: { city: 'London', country: 'UK' },
};

// Compact — no space argument
JSON.stringify(user);
// '{"id":42,"name":"Alice","roles":["admin","editor"],"address":{"city":"London","country":"UK"}}'

// 2-space indent — most common for readability
JSON.stringify(user, null, 2);
// {
//   "id": 42,
//   "name": "Alice",
//   "roles": [
//     "admin",
//     "editor"
//   ],
//   "address": {
//     "city": "London",
//     "country": "UK"
//   }
// }

// Tab indent — preferred for some config file formats
JSON.stringify(user, null, '\t');

// space: 0 — explicit compact (same as omitting space)
JSON.stringify(user, null, 0);`}
      </CodeBlock>

      <AlertBox type="tip" title="See the output instantly — no code required">
        Paste any JavaScript object into the{' '}
        <a href="https://unblockdevs.com/json-stringify-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          JSON.stringify() online tool
        </a>{' '}
        and switch between compact, 2-space, 4-space, and tab output. Also shows byte count
        so you can see exactly how much space pretty-printing adds.
      </AlertBox>

      <SectionHeader number={3} title="The replacer Parameter — Filter and Transform Fields" />
      <p>
        Pass an array to whitelist keys. Pass a function to apply custom transformation or
        omission logic to every value, recursively.
      </p>

      <CodeBlock lang="javascript" title="replacer array — key whitelist">
{`const user = {
  id: 42,
  name: 'Alice',
  email: 'alice@example.com',
  passwordHash: '$2b$10$...',
  apiKey: 'sk-live-xyz789',
  roles: ['admin', 'editor'],
};

// Only include id, name, roles — silently omit everything else
JSON.stringify(user, ['id', 'name', 'roles'], 2);
// {
//   "id": 42,
//   "name": "Alice",
//   "roles": ["admin", "editor"]
// }`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="replacer function — dynamic transform">
{`const data = {
  userId: 42,
  name: 'Alice',
  password: 'hunter2',
  apiKey: 'sk-live-xyz789',
  lastLogin: new Date('2024-11-15T10:30:00Z'),
  balance: 9.876543,
};

const safeReplacer = (key, value) => {
  // Root call always has key === '' — pass through unchanged
  if (key === '') return value;

  // Omit secrets
  if (key === 'password' || key === 'apiKey') return undefined;

  // Dates are already serialized to ISO string by Date.toJSON() before
  // replacer runs — value will be a string like '2024-11-15T10:30:00.000Z'

  // Round floating-point numbers to 2 decimal places
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return parseFloat(value.toFixed(2));
  }

  return value;
};

JSON.stringify(data, safeReplacer, 2);
// {
//   "userId": 42,
//   "name": "Alice",
//   "lastLogin": "2024-11-15T10:30:00.000Z",
//   "balance": 9.88
// }`}
      </CodeBlock>

      <QuickFact color="violet" label="Replacer receives all keys recursively">
        The replacer function is called for every key-value pair at every depth level.
        For the root object, <code>key</code> is an empty string{' '}
        (<code>key === ''</code>). Always return <code>value</code> for the root call —
        returning <code>undefined</code> at the root produces the JavaScript value{' '}
        <code>undefined</code>, not a JSON string.
      </QuickFact>

      <SectionHeader number={4} title="toJSON() — Custom Serialization per Class" />
      <p>
        Objects with a <code>toJSON()</code> method control their own serialization.{' '}
        <code>JSON.stringify()</code> calls <code>toJSON()</code> and stringifies the return
        value. This is how <code>Date</code> objects produce ISO strings automatically.
      </p>

      <CodeBlock lang="javascript" title="toJSON() examples">
{`// Date.prototype.toJSON() exists — produces ISO 8601 strings
const event = { name: 'Launch', at: new Date('2024-11-15T10:00:00Z') };
JSON.stringify(event);
// '{"name":"Launch","at":"2024-11-15T10:00:00.000Z"}'

// Custom toJSON() on your own class
class Price {
  constructor(cents, currency) {
    this.cents = cents;
    this.currency = currency;
  }

  toJSON() {
    // Serialize as a compact single value instead of {cents, currency}
    return (this.cents / 100).toFixed(2) + ' ' + this.currency;
  }
}

const order = { id: 'ORD-1', subtotal: new Price(4999, 'USD') };
JSON.stringify(order);
// '{"id":"ORD-1","subtotal":"49.99 USD"}'`}
      </CodeBlock>

      <SectionHeader number={5} title="Practical Patterns — Real-World JSON.stringify() Usage" />

      <CodeBlock lang="javascript" title="API requests — always stringify the body">
{`// fetch() requires a string body — JSON.stringify converts the payload
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

// Axios does this automatically (pass an object, Axios calls JSON.stringify)
const { data } = await axios.post('/users', { name: 'Alice', email: 'alice@example.com' });`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="localStorage — objects must be stringified">
{`// localStorage only stores strings
const cart = {
  items: [{ id: 'SKU-1', qty: 2 }, { id: 'SKU-3', qty: 1 }],
  coupon: 'SAVE10',
};

// Save (compact — no need for pretty-print in storage)
localStorage.setItem('cart', JSON.stringify(cart));

// Retrieve and restore
const savedCart = JSON.parse(localStorage.getItem('cart') ?? '{}');
console.log(savedCart.items.length); // 2`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Quick deep clone (with caveats)">
{`// Fast deep clone — works for plain objects with JSON-compatible values
const original = { name: 'Alice', scores: [10, 20, 30], meta: { active: true } };
const clone = JSON.parse(JSON.stringify(original));

clone.scores.push(40);
console.log(original.scores); // [10, 20, 30] — unchanged
console.log(clone.scores);    // [10, 20, 30, 40]

// Caveats: undefined removed, Date becomes string, no Map/Set/Function
// For production cloning: use structuredClone() (Node 17+, all modern browsers)
const betterClone = structuredClone(original); // preserves all types`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Readable object logging">
{`// Avoid [object Object] in string concatenation and some loggers
const user = { id: 42, name: 'Alice', role: 'admin' };

console.log('User: ' + user);                          // 'User: [object Object]'
console.log('User:', JSON.stringify(user));             // 'User: {"id":42,...}'
console.log('User:', JSON.stringify(user, null, 2));   // multi-line, pretty

// Compact for one-liners in structured logs
logger.info({ event: 'login', user: JSON.stringify(user) });`}
      </CodeBlock>

      <SectionHeader number={6} title="Common JSON.stringify() Mistakes" />

      <ErrorFix
        title="Expecting undefined values to be preserved in objects"
        bad={`const form = {
  name: 'Alice',
  middleName: undefined, // user left it blank
  age: 30,
};

const body = JSON.stringify(form);
// '{"name":"Alice","age":30}'
// middleName is GONE — the PATCH request won't clear it on the server`}
        good={`// Use null to explicitly represent "no value"
const form = { name: 'Alice', middleName: null, age: 30 };
JSON.stringify(form);
// '{"name":"Alice","middleName":null,"age":30}'

// Or convert undefined to null with a replacer:
JSON.stringify(form, (k, v) => (v === undefined ? null : v));
// '{"name":"Alice","middleName":null,"age":30}'`}
        badLabel="undefined silently dropped — server never sees the field"
        goodLabel="null preserved — server knows the field was intentionally cleared"
      />

      <ErrorFix
        title="Using JSON.stringify() to compare objects with different key insertion order"
        bad={`const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 };  // same data, different key order

JSON.stringify(a) === JSON.stringify(b);
// false — key order differs, even though values are identical`}
        good={`// Sort keys first for stable, order-independent comparison
const sortedStringify = (obj) =>
  JSON.stringify(obj, Object.keys(obj).sort());

sortedStringify(a) === sortedStringify(b); // true

// For production: use a deep equality library
// import { isEqual } from 'lodash';  → isEqual(a, b) === true`}
        badLabel="Key order dependent — breaks silently on different data sources"
        goodLabel="Sort keys first for reliable structural comparison"
      />

      <SectionHeader number={7} title="Try JSON.stringify() Online" />
      <p>
        For quick experiments, debugging, or checking how a specific value serializes — the
        online tool is faster than opening a browser console.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Paste any JavaScript object or JSON',
          desc: 'The tool accepts JavaScript object literals (unquoted keys, trailing commas) and strict JSON. It normalizes the input before running stringify.',
        },
        {
          title: 'Choose indent level',
          desc: 'Switch between compact (0), 2-space, 4-space, and tab. The byte count updates instantly so you can see the cost of pretty-printing.',
        },
        {
          title: 'View the exact output',
          desc: 'The result is the exact string JSON.stringify() produces — all keys quoted, special characters escaped, undefined removed, null and boolean values serialized correctly.',
        },
        {
          title: 'Copy or download',
          desc: 'Copy the string to clipboard for use in code, or download as a .json file for use in fixtures, config files, or API mock data.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What does JSON.stringify() do in JavaScript?',
          answer: 'JSON.stringify() converts a JavaScript value — object, array, string, number, boolean, or null — into a JSON string. The output is valid JSON that can be sent over HTTP, stored in localStorage or a file, or passed to JSON.parse() to reconstruct the original value. It takes three parameters: the value to serialize, an optional replacer for filtering or transforming values, and an optional space parameter for indentation.',
        },
        {
          question: 'How do I pretty-print JSON with JSON.stringify()?',
          answer: 'Pass a number as the third argument: JSON.stringify(obj, null, 2) for 2-space indent, JSON.stringify(obj, null, 4) for 4-space, or JSON.stringify(obj, null, "\\t") for tab indentation. The second argument is null (no replacer). For compact single-line output, omit the third argument entirely or pass 0.',
        },
        {
          question: 'Why does JSON.stringify() remove undefined values?',
          answer: 'The JSON spec (RFC 8259) has no undefined type — only null, boolean, number, string, array, and object. When JSON.stringify() encounters undefined as an object value, it omits the key entirely. When undefined appears in an array, it becomes null to preserve array indices. To explicitly represent "no value", use null in your data model instead of undefined.',
        },
        {
          question: 'How does the replacer parameter work in JSON.stringify()?',
          answer: 'The replacer is the second parameter. Pass an array of strings to keep only those property names: JSON.stringify(obj, ["id", "name"]) omits every other key. Pass a function that receives (key, value) — return the value to include it, return undefined to omit it, return a different value to transform it. The function is called for every property at every depth level, starting with a root call where key is an empty string.',
        },
        {
          question: 'Can JSON.stringify() handle circular references?',
          answer: 'No — JSON.stringify() throws a TypeError ("Converting circular structure to JSON") when it encounters a circular reference. To handle circular references, use a replacer that tracks seen objects, or install a library like flatted (JSON.stringify replacement) or circular-json. Most real objects are not circular, but objects from certain libraries (like error objects or DOM nodes) can be.',
        },
        {
          question: 'Is there a JSON.stringify() online tool?',
          answer: 'Yes — the JSON.stringify() online tool at unblockdevs.com/json-stringify-online runs entirely in your browser. Paste any JavaScript object or JSON value, choose compact or pretty-print output, and copy or download the result. No account, no Node.js, and your data never leaves your browser.',
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
