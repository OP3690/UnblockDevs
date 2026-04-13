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

export default function HowToConvertJavascriptObjectToJsonStringClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Convert a JavaScript Object to a JSON String — JSON.stringify() Explained</h1>
      <p className="lead">
        Every JavaScript developer needs to convert objects to JSON strings — for API requests,
        localStorage, config files, logs, and test fixtures. This guide explains every way to
        do it: <code>JSON.stringify()</code> for standard cases, the <code>space</code> parameter
        for readable output, the <code>replacer</code> for filtering sensitive fields, and the
        free online tool for instant conversion without writing any code.
      </p>

      <StatGrid stats={[
        { value: 'JSON.stringify()', label: 'The built-in JS method — no install, works in every browser and Node.js', color: 'blue' },
        { value: 'null, 2', label: 'The magic second and third arguments for pretty-printed output', color: 'green' },
        { value: '5 ways', label: 'Different methods to serialize objects — each best for different scenarios', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="The Simplest Way: JSON.stringify(object)" />
      <p>
        For the most common case — serializing a plain JavaScript object to a compact JSON
        string — pass the object directly to <code>JSON.stringify()</code> with no other
        arguments.
      </p>

      <CodeBlock lang="javascript" title="Basic object to JSON string">
{`// Plain JavaScript object
const user = {
  id: 42,
  name: 'Alice',
  email: 'alice@example.com',
  age: 28,
  isActive: true,
  tags: ['admin', 'editor'],
};

// Convert to JSON string
const jsonString = JSON.stringify(user);

console.log(jsonString);
// '{"id":42,"name":"Alice","email":"alice@example.com","age":28,"isActive":true,"tags":["admin","editor"]}'

console.log(typeof jsonString); // 'string'

// Round-trip: parse it back to an object
const parsedBack = JSON.parse(jsonString);
console.log(parsedBack.name); // 'Alice'`}
      </CodeBlock>

      <AlertBox type="info" title="Result is always a string">
        <code>JSON.stringify()</code> always returns a <code>string</code> (or{' '}
        <code>undefined</code> for non-JSON-representable inputs). The quotes around keys and
        string values, the colon separators, and the lack of trailing commas are all part of
        valid JSON format — required by the spec.
      </AlertBox>

      <SectionHeader number={2} title="Pretty-Print: Readable Multi-Line JSON String" />
      <p>
        The default output is a compact single line — hard to read for complex objects. Pass a{' '}
        <code>space</code> value as the third argument to get indented, multi-line output.
      </p>

      <CodeBlock lang="javascript" title="Pretty-print with 2-space indent">
{`const config = {
  server: {
    host: 'api.example.com',
    port: 443,
    ssl: true,
  },
  database: {
    host: 'db.internal',
    port: 5432,
    name: 'production',
  },
  features: ['auth', 'analytics', 'notifications'],
};

// Compact — for sending over the network
const compact = JSON.stringify(config);
// '{"server":{"host":"api.example.com","port":443,"ssl":true},...}'

// Pretty — for config files, debugging, logs
const pretty = JSON.stringify(config, null, 2);
console.log(pretty);
// {
//   "server": {
//     "host": "api.example.com",
//     "port": 443,
//     "ssl": true
//   },
//   "database": {
//     "host": "db.internal",
//     "port": 5432,
//     "name": "production"
//   },
//   "features": [
//     "auth",
//     "analytics",
//     "notifications"
//   ]
// }

// 4-space indent — common in Python ecosystem
const wide = JSON.stringify(config, null, 4);

// Tab indent — common in some editors
const tabbed = JSON.stringify(config, null, '\t');`}
      </CodeBlock>

      <QuickFact color="blue" label="null, 2 — the most used stringify call">
        <code>JSON.stringify(obj, null, 2)</code> is the most common form after the basic
        one-argument call. The <code>null</code> skips the replacer (no field filtering),
        and <code>2</code> adds 2-space indentation. It appears in config generation, test
        fixtures, pretty-printing API responses, and writing JSON files in Node.js.
      </QuickFact>

      <SectionHeader number={3} title="Filter Fields — Only Include What You Need" />
      <p>
        When an object has sensitive data, internal fields, or too many properties for the
        use case, the <code>replacer</code> parameter filters the output.
      </p>

      <CodeBlock lang="javascript" title="Array replacer — whitelist specific keys">
{`const user = {
  id: 42,
  name: 'Alice',
  email: 'alice@example.com',
  passwordHash: '$2b$10$...',
  apiKey: 'sk-live-abc123',
  sessionToken: 'tok_xyz',
  createdAt: '2024-01-15',
  updatedAt: '2024-11-10',
};

// Only serialize id, name, email — everything else is omitted
const publicUser = JSON.stringify(user, ['id', 'name', 'email'], 2);
// {
//   "id": 42,
//   "name": "Alice",
//   "email": "alice@example.com"
// }
// passwordHash, apiKey, sessionToken, createdAt, updatedAt are NOT included`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Function replacer — dynamic field exclusion">
{`const record = {
  id: 'rec-001',
  title: 'Q4 Report',
  content: 'Full report content...',
  author: 'Alice',
  internalNotes: 'Draft — do not share',
  _metadata: { version: 3, checksum: 'abc123' },
  publishedAt: new Date('2024-11-01'),
};

// Function: called for every key-value pair at every depth
const cleanReplacer = (key, value) => {
  if (key === '') return value;            // always return root object
  if (key.startsWith('_')) return undefined; // omit private _fields
  if (key === 'internalNotes') return undefined;
  return value;
};

JSON.stringify(record, cleanReplacer, 2);
// {
//   "id": "rec-001",
//   "title": "Q4 Report",
//   "content": "Full report content...",
//   "author": "Alice",
//   "publishedAt": "2024-11-01T00:00:00.000Z"
// }`}
      </CodeBlock>

      <SectionHeader number={4} title="Convert Nested Objects and Arrays" />
      <p>
        <code>JSON.stringify()</code> handles nested objects and arrays recursively. The depth
        is unlimited — it serializes the entire object graph in one call.
      </p>

      <CodeBlock lang="javascript" title="Deeply nested objects and arrays">
{`const order = {
  id: 'ORD-9001',
  customer: {
    id: 'CUST-42',
    name: 'Alice Smith',
    address: {
      street: '123 Main St',
      city: 'London',
      country: 'UK',
      postcode: 'EC1A 1BB',
    },
  },
  items: [
    { sku: 'PROD-1', name: 'Widget A', qty: 2, price: 9.99 },
    { sku: 'PROD-2', name: 'Widget B', qty: 1, price: 19.99 },
  ],
  total: 39.97,
  status: 'pending',
  createdAt: new Date().toISOString(),
};

const json = JSON.stringify(order, null, 2);
// Produces a fully nested, 30+ line JSON string
// Every array item gets its own indented block
// Date is already an ISO string`}
      </CodeBlock>

      <SectionHeader number={5} title="Converting Objects in Common Scenarios" />

      <CodeBlock lang="javascript" title="Scenario 1: Send object to a REST API (fetch)">
{`const newProduct = {
  name: 'Wireless Mouse',
  price: 29.99,
  category: 'electronics',
  inStock: true,
  tags: ['wireless', 'peripheral', 'office'],
};

const response = await fetch('https://api.example.com/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN',
  },
  body: JSON.stringify(newProduct),  // MUST be a string — not an object
});

const created = await response.json();
console.log('Created product ID:', created.id);`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Scenario 2: Save object to localStorage">
{`// localStorage can only store strings
const userPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: { email: true, push: false, sms: false },
  dashboardWidgets: ['revenue', 'users', 'conversion'],
};

// Save
localStorage.setItem('prefs', JSON.stringify(userPreferences));

// Load
const prefs = JSON.parse(localStorage.getItem('prefs') ?? '{}');
console.log(prefs.theme); // 'dark'
console.log(prefs.notifications.email); // true`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Scenario 3: Write a JSON file in Node.js">
{`import fs from 'fs';

const data = {
  version: '2.1.0',
  generatedAt: new Date().toISOString(),
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'viewer' },
  ],
};

// Write with 2-space indent for human-readable JSON files
fs.writeFileSync('./output/users.json', JSON.stringify(data, null, 2), 'utf8');

// For compact files (smaller, machine-readable)
fs.writeFileSync('./cache/users.min.json', JSON.stringify(data), 'utf8');`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Scenario 4: Log objects in structured logging">
{`// Many log transports expect string values or JSON serializable structures
// JSON.stringify prevents [object Object] in string concatenation

const requestContext = {
  requestId: 'req-abc123',
  userId: 42,
  path: '/api/orders',
  method: 'POST',
  durationMs: 143,
};

// Simple string concat — broken
console.log('Request finished: ' + requestContext);
// 'Request finished: [object Object]'  ← not useful

// Correct
console.log('Request finished:', JSON.stringify(requestContext));
// 'Request finished: {"requestId":"req-abc123","userId":42,...}'`}
      </CodeBlock>

      <SectionHeader number={6} title="What JSON.stringify() Cannot Convert" />
      <p>
        Not all JavaScript values can be represented in JSON. Knowing which values get silently
        dropped vs. which throw errors saves hours of debugging.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'undefined → omitted or null',
          description:
            'In object properties: silently omitted. In arrays: becomes null (to preserve index). As the top-level value: returns the JS value undefined (not a string). Use null to represent intentionally absent values.',
        },
        {
          title: 'Functions → omitted',
          description:
            'Object properties with function values are silently omitted. Functions in arrays become null. JSON cannot represent executable code — this is intentional for security. Classes serialize as empty objects {} unless they have toJSON().',
        },
        {
          title: 'Symbol → omitted',
          description:
            'Symbol-keyed properties are always omitted. Symbol values in objects are omitted; in arrays they become null. Symbols are JavaScript-internal identifiers with no JSON equivalent.',
        },
        {
          title: 'Circular references → throws',
          description:
            'If an object references itself (directly or indirectly), JSON.stringify() throws TypeError: "Converting circular structure to JSON". Use the flatted package or a custom replacer that tracks seen objects to handle circular structures.',
        },
        {
          title: 'BigInt → throws',
          description:
            'JSON.stringify() throws TypeError: "Do not know how to serialize a BigInt". Convert BigInt to string or number first: JSON.stringify({ id: bigIntValue.toString() }). JSON numbers have precision limits that BigInt was designed to exceed.',
        },
        {
          title: 'Date → ISO string (via toJSON)',
          description:
            'Date objects have a built-in toJSON() method that produces an ISO 8601 string. So JSON.stringify(new Date()) produces the current time as a quoted string — not a Date object. Parsing it back gives a string, not a Date; re-construct with new Date(str).',
        },
      ]} />

      <ErrorFix
        title="Forgetting that functions in objects are silently dropped"
        bad={`const service = {
  name: 'UserService',
  baseUrl: 'https://api.example.com',
  fetch: async (id) => { /* ... */ },  // a method
  validate: (data) => data.id > 0,    // another method
};

JSON.stringify(service);
// '{"name":"UserService","baseUrl":"https://api.example.com"}'
// fetch and validate silently disappeared!
// Logging this gives a false picture of the object`}
        good={`// Option 1: build a plain serializable object for logging/transfer
const serializable = {
  name: service.name,
  baseUrl: service.baseUrl,
  // methods listed by name only for documentation
  methods: ['fetch', 'validate'],
};
JSON.stringify(serializable, null, 2);

// Option 2: use .toJSON() to control serialization
class UserService {
  constructor() { this.name = 'UserService'; this.baseUrl = '...'; }
  toJSON() { return { name: this.name, baseUrl: this.baseUrl }; }
  async fetch(id) { /* ... */ }
}`}
        badLabel="Functions silently vanish — no warning, no error"
        goodLabel="Explicitly define what to serialize via toJSON() or plain data object"
      />

      <SectionHeader number={7} title="Use the JSON.stringify() Online Tool" />
      <p>
        For converting complex objects without opening a browser console or Node.js REPL, the
        online tool handles it instantly.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Paste your JavaScript object',
          desc: 'The tool accepts JavaScript object literals with unquoted keys, single-quoted strings, trailing commas, and comments — not just strict JSON. It normalizes the input automatically.',
        },
        {
          title: 'Choose compact or pretty output',
          desc: 'Select your indent level — compact (0), 2-space, 4-space, or tab. The byte count updates instantly so you can see the size difference.',
        },
        {
          title: 'Review the JSON string',
          desc: 'The output is the exact string JSON.stringify() produces: all keys quoted, special characters escaped, undefined removed, null and boolean values correctly formatted.',
        },
        {
          title: 'Copy or download the result',
          desc: 'Copy the JSON string to your clipboard for pasting into code, or download as a .json file for use in fixtures, mock data, or config files.',
        },
      ]} />

      <AlertBox type="tip" title="Convert any JS object to JSON string instantly">
        Paste any JavaScript object at{' '}
        <a href="https://unblockdevs.com/json-stringify-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          unblockdevs.com/json-stringify-online
        </a>{' '}
        — get compact or pretty-printed JSON in one click. All processing happens in your
        browser — your data never leaves your machine.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I convert a JavaScript object to a JSON string?',
          answer: 'Use JSON.stringify(object). Pass the object as the first argument and it returns a JSON-formatted string. For pretty-printed output: JSON.stringify(object, null, 2). For field filtering: JSON.stringify(object, ["id", "name"]) keeps only those keys. The result is always a string (typeof result === "string").',
        },
        {
          question: 'How do I pretty-print a JavaScript object as JSON?',
          answer: 'Use JSON.stringify(obj, null, 2) for 2-space indent, JSON.stringify(obj, null, 4) for 4-space, or JSON.stringify(obj, null, "\\t") for tabs. The second argument null means no field filtering. The third argument is the indent size — any number from 1 to 10, or a string up to 10 characters used as the indent token.',
        },
        {
          question: 'What is the difference between JSON.stringify and JSON.parse?',
          answer: 'They are inverse operations. JSON.stringify() converts a JavaScript value TO a JSON string (object → string). JSON.parse() converts a JSON string BACK to a JavaScript value (string → object). Typical pattern: JSON.stringify to store or send data, JSON.parse to retrieve and use it. Note that the round-trip is not lossless — undefined values are dropped and Date objects become ISO strings.',
        },
        {
          question: 'How do I convert a JavaScript object to JSON without certain fields?',
          answer: 'Use the replacer parameter (second argument). Pass an array of key names to keep: JSON.stringify(obj, ["id", "name", "email"]). Or pass a function: JSON.stringify(obj, (key, val) => key === "password" ? undefined : val) to dynamically exclude sensitive fields. Return undefined from the replacer function to omit any property.',
        },
        {
          question: 'Can I convert a JavaScript object to JSON online?',
          answer: 'Yes — the JSON.stringify() online tool at unblockdevs.com/json-stringify-online converts any JavaScript object to a JSON string in your browser. Paste the object, choose compact or pretty output, and copy or download the result. It accepts JavaScript syntax (unquoted keys, trailing commas) as well as strict JSON.',
        },
        {
          question: 'Why does JSON.stringify return undefined for some values?',
          answer: 'JSON.stringify() returns the JavaScript value undefined (not the string "undefined") when the top-level input is: a JavaScript function, a Symbol, or the value undefined itself. These have no JSON representation. For object properties, undefined and function values are silently omitted. For array elements, they become null. Use null instead of undefined in your data model to ensure values survive serialization.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
