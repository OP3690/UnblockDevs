'use client';

import Link from 'next/link';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact, ErrorFix, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function JsonStringifyVsJsonParseDifferenceClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON.stringify() vs JSON.parse() — Complete Difference Guide</h1>
      <p className="lead">
        <code>JSON.stringify()</code> and <code>JSON.parse()</code> are the two most important JSON methods
        in JavaScript. One converts objects to strings; the other converts strings back to objects. Understanding
        both — including their edge cases and gotchas — is essential for every developer working with APIs,
        localStorage, or any data exchange.
      </p>

      <StatGrid
        stats={[
          { value: 'Object→String', label: 'JSON.stringify() direction', color: 'blue' },
          { value: 'String→Object', label: 'JSON.parse() direction', color: 'green' },
          { value: 'Serialization', label: 'what stringify is called', color: 'purple' },
          { value: 'Deserialization', label: 'what parse is called', color: 'amber' },
        ]}
      />

      <SectionHeader number={1} title="The Core Difference" />
      <p>
        These two methods are inverse operations. <strong>JSON.stringify()</strong> converts a JavaScript value
        (object, array, primitive) into a JSON-formatted string. <strong>JSON.parse()</strong> takes a JSON
        string and converts it back into a JavaScript value. They form a complete serialization cycle.
      </p>

      <QuickFact>
        JSON stands for JavaScript Object Notation. Despite the name, JSON is a language-independent format
        used across Python, Java, Ruby, Go, and virtually every other programming language.
      </QuickFact>

      <SectionHeader number={2} title="JSON.stringify() — Object to String" />
      <p>
        Use <code>JSON.stringify()</code> whenever you need to convert a JavaScript value into a string for
        transmission or storage: sending to an API, saving in localStorage, writing to a file, or logging
        objects as readable text.
      </p>

      <CodeBlock lang="javascript" title="JSON.stringify() Basic Usage">{`const user = { name: "Alice", age: 30, active: true };

// Basic stringify
const json = JSON.stringify(user);
console.log(json);
// → '{"name":"Alice","age":30,"active":true}'
console.log(typeof json);
// → 'string'

// With indentation (pretty print)
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);
// → {
//     "name": "Alice",
//     "age": 30,
//     "active": true
//   }

// Arrays work too
const items = [1, "hello", true, null];
console.log(JSON.stringify(items));
// → '[1,"hello",true,null]'`}</CodeBlock>

      <AlertBox type="info" title="The replacer parameter">
        JSON.stringify() accepts a second argument — a replacer — that lets you filter or transform which
        properties get included. Pass an array of strings to include only specific keys, or a function
        for custom logic.
      </AlertBox>

      <CodeBlock lang="javascript" title="JSON.stringify() Advanced — Replacer and Indentation">{`const data = {
  id: 1,
  name: "Alice",
  password: "secret123",  // we want to exclude this
  createdAt: new Date("2024-01-01"),
};

// Array replacer: only include these keys
const safe = JSON.stringify(data, ["id", "name"]);
console.log(safe);
// → '{"id":1,"name":"Alice"}'

// Function replacer: custom logic
const result = JSON.stringify(data, (key, value) => {
  if (key === "password") return undefined;  // exclude
  if (value instanceof Date) return value.toISOString(); // transform
  return value;
});
console.log(result);
// → '{"id":1,"name":"Alice","createdAt":"2024-01-01T00:00:00.000Z"}'

// Third argument: indentation (2 or 4 spaces, or a string like "\t")
console.log(JSON.stringify({ a: 1 }, null, 4));
// → {
//       "a": 1
//   }`}</CodeBlock>

      <SectionHeader number={3} title="JSON.parse() — String to Object" />
      <p>
        Use <code>JSON.parse()</code> whenever you receive a JSON string and need to work with it as a
        JavaScript value: reading from an API response, loading from localStorage, or parsing JSON files.
      </p>

      <CodeBlock lang="javascript" title="JSON.parse() Basic Usage">{`const jsonString = '{"name":"Bob","age":25,"tags":["js","react"]}';

// Basic parse
const obj = JSON.parse(jsonString);
console.log(obj.name);    // → 'Bob'
console.log(obj.tags[0]); // → 'js'
console.log(typeof obj);  // → 'object'

// Parse numbers and booleans
const config = JSON.parse('{"debug":true,"maxRetries":3,"timeout":5000}');
console.log(config.debug);      // → true  (boolean, not string)
console.log(config.maxRetries); // → 3     (number, not string)

// Parse arrays
const ids = JSON.parse('[1, 2, 3, 4, 5]');
console.log(ids.length); // → 5`}</CodeBlock>

      <CodeBlock lang="javascript" title="JSON.parse() with Reviver Function">{`// The reviver runs on every parsed key-value pair
const json = '{"name":"Alice","createdAt":"2024-01-15T10:30:00.000Z","score":95}';

const data = JSON.parse(json, (key, value) => {
  // Convert date strings back to Date objects
  if (key === "createdAt") return new Date(value);
  return value;
});

console.log(data.createdAt instanceof Date); // → true
console.log(data.createdAt.getFullYear());   // → 2024`}</CodeBlock>

      <SectionHeader number={4} title="Error Handling — Never Skip Try-Catch" />
      <p>
        <code>JSON.parse()</code> throws a <code>SyntaxError</code> if the string is not valid JSON.
        In production code, always wrap it in a try-catch. <code>JSON.stringify()</code> can also throw
        for circular references.
      </p>

      <ErrorFix
        bad={`// No error handling — crashes on invalid JSON
function loadConfig(jsonStr) {
  return JSON.parse(jsonStr); // throws SyntaxError if invalid
}

// Calling with malformed JSON
loadConfig("{broken json,}"); // Uncaught SyntaxError!`}
        good={`// Always wrap JSON.parse in try-catch
function safeParseJSON(jsonStr, fallback = null) {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('JSON parse failed:', error.message);
    return fallback;
  }
}

// Safe — returns null instead of throwing
const result = safeParseJSON("{broken}", null);
console.log(result); // → null`}
      />

      <CodeBlock lang="javascript" title="Handling Circular Reference in JSON.stringify()">{`// Circular reference causes TypeError
const obj = { name: "Alice" };
obj.self = obj;  // circular!

// This throws: TypeError: Converting circular structure to JSON
// JSON.stringify(obj);

// Solution 1: Remove circular references before stringify
const { self, ...safeObj } = obj;
console.log(JSON.stringify(safeObj)); // → '{"name":"Alice"}'

// Solution 2: Use a library like flatted or json-stringify-safe
// import { stringify } from 'flatted';
// console.log(stringify(obj)); // handles circular refs`}</CodeBlock>

      <SectionHeader number={5} title="What Gets Lost in Stringify" />
      <p>
        JSON only supports a subset of JavaScript types. Several things are silently dropped or transformed
        when you stringify an object. This is a very common source of bugs.
      </p>

      <AlertBox type="warning" title="Types lost during JSON.stringify()">
        undefined values (property is omitted), functions (omitted), Symbols (omitted), Date objects
        (converted to ISO string — not restored on parse), NaN and Infinity (converted to null),
        and Map/Set objects (converted to empty object).
      </AlertBox>

      <CodeBlock lang="javascript" title="Values That Get Lost or Changed">{`const data = {
  name: "Alice",
  fn: () => "hello",         // function → omitted
  sym: Symbol("id"),         // Symbol → omitted
  undef: undefined,           // undefined → omitted
  date: new Date("2024-01-01"), // Date → ISO string
  nan: NaN,                   // NaN → null
  inf: Infinity,              // Infinity → null
  map: new Map([["a", 1]]),   // Map → {} (empty object!)
  set: new Set([1, 2, 3]),    // Set → {} (empty object!)
};

const json = JSON.stringify(data);
const parsed = JSON.parse(json);

console.log(parsed);
// → {
//     name: "Alice",
//     date: "2024-01-01T00:00:00.000Z",  // string, not Date!
//     nan: null,
//     inf: null,
//     map: {},   // lost all data!
//     set: {},   // lost all data!
//   }
// fn, sym, undef are completely gone!`}</CodeBlock>

      <SectionHeader number={6} title="Common Use Cases with Code" />

      <CodeBlock lang="javascript" title="API Request with fetch()">{`// Sending JSON to an API
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),  // ← stringify for transmission
  });

  if (!response.ok) throw new Error('Request failed');

  const newUser = await response.json(); // ← response.json() calls JSON.parse internally
  return newUser;
}

const user = await createUser({ name: "Carol", email: "carol@example.com" });`}</CodeBlock>

      <CodeBlock lang="javascript" title="localStorage — Persist Objects">{`// Save object to localStorage
function saveSettings(settings) {
  localStorage.setItem('app-settings', JSON.stringify(settings));
}

// Load object from localStorage
function loadSettings(defaults = {}) {
  const stored = localStorage.getItem('app-settings');
  if (!stored) return defaults;
  try {
    return JSON.parse(stored);
  } catch {
    return defaults;
  }
}

saveSettings({ theme: 'dark', fontSize: 14 });
const settings = loadSettings({ theme: 'light', fontSize: 12 });
console.log(settings.theme); // → 'dark'`}</CodeBlock>

      <CodeBlock lang="javascript" title="Deep Clone an Object (Simple Objects Only)">{`// Quick deep clone using stringify + parse
// WARNING: only works for JSON-safe values (no functions, Dates, etc.)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = { user: { name: "Dave", scores: [10, 20, 30] } };
const clone = deepClone(original);

clone.user.name = "Eve";
clone.user.scores.push(40);

console.log(original.user.name);    // → 'Dave' (unchanged)
console.log(original.user.scores);  // → [10, 20, 30] (unchanged)

// For production: use structuredClone() instead (handles Dates, Maps, etc.)`}</CodeBlock>

      <SectionHeader number={7} title="Performance Considerations" />

      <KeyPointsGrid
        items={[
          {
            title: 'JSON.stringify is expensive for large objects',
            description: 'For deeply nested or large objects (thousands of keys), stringify can be a bottleneck. Profile before optimizing — usually it\'s not the bottleneck.',
          },
          {
            title: 'JSON.parse is generally fast',
            description: 'V8 and other engines have heavily optimized JSON.parse. For most use cases, parsing even large JSON strings is very fast.',
          },
          {
            title: 'Avoid parsing the same string multiple times',
            description: 'If you need to read a JSON string multiple times, parse it once and reuse the object. Parsing is idempotent but not free.',
          },
          {
            title: 'Use streaming parsers for huge data',
            description: 'For files or API responses over several MB, use streaming JSON parsers (like node-JSONStream) instead of parsing the entire string at once.',
          },
        ]}
      />

      <SectionHeader number={8} title="Quick Reference" />

      <CodeBlock lang="javascript" title="Complete Cheat Sheet">{`// ═══════════════════════════════════════════
// JSON.stringify() — JavaScript → JSON string
// ═══════════════════════════════════════════

JSON.stringify(value)              // basic
JSON.stringify(value, null, 2)     // pretty print (2 spaces)
JSON.stringify(value, ["key1"])    // only include these keys
JSON.stringify(value, replacerFn)  // custom transform

// ════════════════════════════════════════════
// JSON.parse() — JSON string → JavaScript value
// ════════════════════════════════════════════

JSON.parse(jsonString)             // basic
JSON.parse(jsonString, reviverFn)  // with type transformation

// ═══════════════════
// ALWAYS use try-catch
// ═══════════════════

try {
  const data = JSON.parse(maybeJson);
} catch (e) {
  // handle invalid JSON
}

// ════════════════════════════════════════════════
// What JSON supports:
// string, number, boolean, null, object, array
//
// What JSON does NOT support:
// undefined, function, Symbol, Date, NaN, Infinity
// Map, Set, BigInt
// ════════════════════════════════════════════════`}</CodeBlock>

      <FAQAccordion
        items={[
          {
            question: 'What is the difference between JSON.stringify() and JSON.parse()?',
            answer: 'JSON.stringify() converts JavaScript objects/arrays/values INTO a JSON string. JSON.parse() converts a JSON string BACK INTO a JavaScript value. They are inverse operations — stringify serializes, parse deserializes.',
          },
          {
            question: 'Why does JSON.stringify(undefined) return undefined (not a string)?',
            answer: 'When undefined is passed as the top-level value, JSON.stringify returns undefined (not a string). When undefined appears as an object property value, that property is silently omitted. This is because JSON has no concept of undefined — it only supports null, not undefined.',
          },
          {
            question: 'How do I stringify a JavaScript Date and parse it back as a Date?',
            answer: 'JSON.stringify converts Dates to ISO strings (e.g. "2024-01-15T10:30:00.000Z"). JSON.parse does NOT automatically restore them to Date objects — they come back as strings. Use a reviver function: JSON.parse(str, (key, value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : value)',
          },
          {
            question: 'Can I use JSON.stringify to deep clone an object?',
            answer: 'For simple objects with only JSON-safe values (strings, numbers, booleans, null, plain objects, arrays), yes. But it loses functions, Dates (converted to strings), undefined (omitted), NaN (converted to null), and does not handle Maps or Sets. For production deep cloning, use structuredClone() which handles more types correctly.',
          },
          {
            question: 'What causes "Converting circular structure to JSON"?',
            answer: 'When an object references itself (directly or indirectly), JSON.stringify cannot serialize it. For example: const a = {}; a.self = a; JSON.stringify(a) throws TypeError. Fix by removing circular references before stringify, or use a library like flatted that supports circular references.',
          },
          {
            question: 'Is JSON.parse safe? Can it execute code?',
            answer: 'JSON.parse is safe — it only parses JSON data, it cannot execute JavaScript code. This is different from eval(), which is dangerous. Always use JSON.parse (not eval) to parse JSON strings from untrusted sources.',
          },
          {
            question: 'What is the reviver function in JSON.parse?',
            answer: 'The second argument to JSON.parse is a reviver function (key, value) => newValue. It runs on every key-value pair in the parsed result, bottom-up. You can use it to transform values — most commonly to restore Date strings back to Date objects, or to convert number strings to BigInt.',
          },
          {
            question: 'How do I parse JSON from a fetch() API response?',
            answer: 'response.json() is a shorthand that reads the response body and calls JSON.parse for you. It returns a Promise. Use it like: const data = await response.json(). You can also do: const text = await response.text(); const data = JSON.parse(text); — both are equivalent.',
          },
        ]}
      />

      <p className="mt-6 text-sm text-gray-600">
        Need to work with JSON data? Try our free{' '}
        <Link href="/?tab=beautifier" className="text-blue-600 hover:underline font-medium">JSON Parser and Beautifier</Link>{' '}
        and{' '}
        <Link href="/json-stringify-online" className="text-blue-600 hover:underline font-medium">JSON.stringify() online tool</Link>.
      </p>
    
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
