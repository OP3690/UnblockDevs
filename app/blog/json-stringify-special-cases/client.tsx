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

export default function JsonStringifySpecialCasesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON.stringify() Edge Cases — undefined, null, Dates, Circular References, BigInt &amp; More</h1>
      <p className="lead">
        <code>JSON.stringify()</code> seems simple until it silently drops data you expected,
        throws on inputs that look fine, or produces output that does not round-trip back
        correctly. This guide covers every edge case developers actually hit: undefined vs null,
        Date serialization, circular references, BigInt, NaN, Infinity, functions, Symbols,
        Map, Set, and how to handle each one correctly.
      </p>

      <StatGrid stats={[
        { value: 'silent', label: 'undefined in object properties — silently dropped with no warning', color: 'red' },
        { value: 'throws', label: 'Circular references and BigInt — TypeError at runtime', color: 'orange' },
        { value: 'null', label: 'NaN, Infinity, -Infinity — all become null in JSON output', color: 'blue' },
      ]} />

      <SectionHeader number={1} title="undefined — The Silent Data Killer" />
      <p>
        The most common JSON.stringify() bug: <code>undefined</code> silently disappears from
        object properties. No error, no warning — the key is simply absent in the output. This
        causes real bugs when sending PATCH requests, logging state, or saving to storage.
      </p>

      <CodeBlock lang="javascript" title="How undefined is handled in objects, arrays, and at the top level">
{`// In object properties: undefined is OMITTED (key disappears)
JSON.stringify({ a: 1, b: undefined, c: 3 });
// '{"a":1,"c":3}'   ← b is gone

// In arrays: undefined becomes null (index is preserved)
JSON.stringify([1, undefined, 3]);
// '[1,null,3]'   ← null preserves the array position

// At top level: returns the JS value undefined (not a string!)
JSON.stringify(undefined);
// undefined   ← not the string "undefined"
typeof JSON.stringify(undefined); // 'undefined'

// Functions — same as undefined in all positions
JSON.stringify({ fn: () => 'hello', name: 'Alice' });
// '{"name":"Alice"}'   ← fn silently omitted

JSON.stringify([() => 'a', 'b', () => 'c']);
// '[null,"b",null]'   ← functions become null in arrays`}
      </CodeBlock>

      <AlertBox type="warning" title="Silent drops cause PATCH vs PUT semantic bugs">
        When you send a PATCH request with <code>JSON.stringify(data)</code> and{' '}
        <code>data.field</code> is <code>undefined</code>, the field is absent from the
        request body. The server-side handler never sees the field and leaves it unchanged.
        This is different from passing <code>null</code>, which tells the server to explicitly
        clear the value. Always use <code>null</code> for intentionally absent fields.
      </AlertBox>

      <ErrorFix
        title="undefined silently removed from PATCH payload"
        bad={`// User cleared the phone field — you want to remove it server-side
const updates = {
  name: 'Alice Smith',
  phone: undefined,  // user removed their phone number
  email: 'alice@new.com',
};

const body = JSON.stringify(updates);
// '{"name":"Alice Smith","email":"alice@new.com"}'
// phone field is ABSENT — server keeps the old phone number unchanged!`}
        good={`// Use null to explicitly clear a value server-side
const updates = {
  name: 'Alice Smith',
  phone: null,  // explicit: clear this field
  email: 'alice@new.com',
};

JSON.stringify(updates);
// '{"name":"Alice Smith","phone":null,"email":"alice@new.com"}'
// Server sees phone: null and clears it

// Or: convert all undefined to null with a replacer
JSON.stringify(updates, (key, val) => (val === undefined ? null : val));`}
        badLabel="undefined omitted — server keeps old value (wrong!)"
        goodLabel="null sent — server explicitly clears the field"
      />

      <SectionHeader number={2} title="null — The Safe Stand-In for Absent Values" />
      <p>
        Unlike <code>undefined</code>, <code>null</code> is a valid JSON value. It is
        preserved in objects, arrays, and as a top-level value. Use <code>null</code> whenever
        you need to represent an intentionally absent or cleared value.
      </p>

      <CodeBlock lang="javascript" title="null behavior vs undefined">
{`// null is preserved everywhere
JSON.stringify({ a: null, b: null, c: 3 });
// '{"a":null,"b":null,"c":3}'   ← null is kept

JSON.stringify([1, null, 3]);
// '[1,null,3]'   ← null in arrays also preserved

JSON.stringify(null);
// 'null'   ← valid JSON string!

// null is the correct JSON "no value" type
// Parsing null back gives null (round-trips perfectly)
JSON.parse(JSON.stringify(null)); // null`}
      </CodeBlock>

      <SectionHeader number={3} title="Date Objects — Automatic ISO 8601 Conversion" />
      <p>
        <code>Date</code> objects are not valid JSON — but they have a <code>toJSON()</code>
        method that returns an ISO 8601 string. <code>JSON.stringify()</code> calls{' '}
        <code>toJSON()</code> automatically, so Dates serialize to readable timestamp strings.
        The round-trip is not automatic — you get a string back, not a Date.
      </p>

      <CodeBlock lang="javascript" title="Date serialization and round-trip">
{`const event = {
  title: 'Team Meeting',
  start: new Date('2024-11-15T09:00:00Z'),
  end: new Date('2024-11-15T10:30:00Z'),
  created: new Date(),
};

const json = JSON.stringify(event, null, 2);
// {
//   "title": "Team Meeting",
//   "start": "2024-11-15T09:00:00.000Z",
//   "end": "2024-11-15T10:30:00.000Z",
//   "created": "2024-11-15T14:22:33.456Z"
// }
// Dates are automatically converted to ISO 8601 strings

// Round-trip: parsing gives back strings, not Date objects!
const parsed = JSON.parse(json);
parsed.start;             // '2024-11-15T09:00:00.000Z' — a string
parsed.start instanceof Date; // false

// Re-construct dates after parsing
const restored = {
  ...parsed,
  start: new Date(parsed.start),
  end: new Date(parsed.end),
  created: new Date(parsed.created),
};
restored.start instanceof Date; // true`}
      </CodeBlock>

      <QuickFact color="blue" label="Date.toJSON() is called before replacer">
        The <code>toJSON()</code> method is called before the replacer function runs. So in a
        replacer, <code>value</code> for a Date property will already be an ISO string, not a
        Date object. Check <code>typeof value === 'string'</code> and validate with{' '}
        <code>Date.parse()</code> if you need to detect serialized dates in a replacer.
      </QuickFact>

      <SectionHeader number={4} title="NaN, Infinity, -Infinity — All Become null" />
      <p>
        IEEE 754 special numbers — <code>NaN</code>, <code>Infinity</code>, and{' '}
        <code>-Infinity</code> — have no JSON representation. <code>JSON.stringify()</code>{' '}
        converts all three to <code>null</code>. This is a silent lossy conversion that can
        corrupt numerical data.
      </p>

      <CodeBlock lang="javascript" title="NaN and Infinity become null">
{`// All three become null — silently
JSON.stringify({ a: NaN, b: Infinity, c: -Infinity });
// '{"a":null,"b":null,"c":null}'

JSON.stringify([NaN, Infinity, -Infinity, 42]);
// '[null,null,null,42]'

// This is particularly dangerous in calculated fields
const stats = {
  mean: 100,
  stddev: 0 / 0,  // division by zero → NaN
  max: Infinity,
  min: 10,
};
JSON.stringify(stats);
// '{"mean":100,"stddev":null,"max":null,"min":10}'
// stddev and max silently corrupted`}
      </CodeBlock>

      <ErrorFix
        title="NaN from division or failed parse silently becomes null in JSON"
        bad={`const score = parseInt('not a number');  // NaN
const stats = { userId: 42, score };

JSON.stringify(stats);
// '{"userId":42,"score":null}'
// score is null — not NaN — in the API payload
// Server receives null and may store it as 0 or null, not as an error`}
        good={`// Validate before serializing
const rawScore = parseInt('not a number');
const score = Number.isFinite(rawScore) ? rawScore : 0;  // fallback to 0

const stats = { userId: 42, score };
JSON.stringify(stats);
// '{"userId":42,"score":0}'

// Or: use replacer to catch all NaN/Infinity
JSON.stringify(stats, (key, val) => {
  if (typeof val === 'number' && !isFinite(val)) return null; // or 0, or throw
  return val;
});`}
        badLabel="NaN silently becomes null — server receives wrong type"
        goodLabel="Validate numbers before serialize — no silent corruption"
      />

      <SectionHeader number={5} title="Circular References — TypeError at Runtime" />
      <p>
        If an object references itself (directly or through a chain), JSON.stringify() throws
        <code>TypeError: Converting circular structure to JSON</code>. This happens with DOM
        nodes, error objects, and manually constructed trees.
      </p>

      <CodeBlock lang="javascript" title="Circular reference — when and why it throws">
{`// Direct circular reference
const obj = { name: 'Alice' };
obj.self = obj;  // obj.self points back to obj
JSON.stringify(obj);
// TypeError: Converting circular structure to JSON

// Indirect circular reference
const parent = { name: 'Parent' };
const child = { name: 'Child', parent };
parent.child = child;   // parent → child → parent → ...
JSON.stringify(parent);
// TypeError: Converting circular structure to JSON

// Common sources of circular references:
// - DOM nodes (node.parentNode, node.childNodes)
// - Express req/res objects
// - Error objects with .cause chains
// - Custom linked list/tree nodes`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Fix circular references — three approaches">
{`// Approach 1: replacer that tracks seen objects
function safeStringify(obj, space) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  }, space);
}

const obj = { name: 'Alice' };
obj.self = obj;
safeStringify(obj);
// '{"name":"Alice","self":"[Circular]"}'

// Approach 2: install the 'flatted' package (drop-in replacement)
import { stringify, parse } from 'flatted';
stringify(circularObj); // handles circular structures natively

// Approach 3: restructure the data before serializing
// If you control the data model, avoid circular refs from the start`}
      </CodeBlock>

      <SectionHeader number={6} title="BigInt — Throws TypeError" />
      <p>
        <code>JSON.stringify()</code> throws <code>TypeError: Do not know how to serialize a BigInt</code>{' '}
        when it encounters a BigInt value. Convert BigInt to string or number before
        serializing.
      </p>

      <CodeBlock lang="javascript" title="BigInt — fix strategies">
{`// BigInt throws
JSON.stringify({ id: 9007199254740993n });
// TypeError: Do not know how to serialize a BigInt

// Fix 1: convert to string (safest — no precision loss)
JSON.stringify({ id: 9007199254740993n.toString() });
// '{"id":"9007199254740993"}'

// Fix 2: convert to number (only if value fits safely in Number)
// Number.MAX_SAFE_INTEGER = 9007199254740991
const safe = 9007199254740991n;
JSON.stringify({ id: Number(safe) });
// '{"id":9007199254740991}'

// Fix 3: replacer to auto-convert all BigInt to strings
JSON.stringify(data, (key, val) => {
  if (typeof val === 'bigint') return val.toString();
  return val;
});

// Fix 4: add BigInt.prototype.toJSON (affects all BigInt globally)
BigInt.prototype.toJSON = function() { return this.toString(); };
JSON.stringify({ id: 42n }); // '{"id":"42"}'`}
      </CodeBlock>

      <SectionHeader number={7} title="Map and Set — Become Empty Objects" />
      <p>
        <code>Map</code> and <code>Set</code> are not JSON-serializable types.{' '}
        <code>JSON.stringify()</code> does not throw — it silently converts them to empty
        objects <code>{'{}'}</code>, losing all data.
      </p>

      <CodeBlock lang="javascript" title="Map and Set lose their data silently">
{`// Map → empty object (silent data loss!)
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
JSON.stringify(map);
// '{}'  ← all data lost, no error!

// Set → empty object (silent data loss!)
const set = new Set([1, 2, 3, 4]);
JSON.stringify(set);
// '{}'  ← all data lost, no error!

// Fix for Map: convert to array of entries or plain object first
JSON.stringify([...map.entries()]);
// '[["a",1],["b",2],["c",3]]'

JSON.stringify(Object.fromEntries(map));
// '{"a":1,"b":2,"c":3}'

// Fix for Set: convert to array
JSON.stringify([...set]);
// '[1,2,3,4]'

// Round-trip: restore after parsing
const entries = JSON.parse(JSON.stringify([...map.entries()]));
const restoredMap = new Map(entries);`}
      </CodeBlock>

      <SectionHeader number={8} title="Symbol — Always Omitted" />

      <CodeBlock lang="javascript" title="Symbol keys and values are omitted">
{`const sym = Symbol('id');

// Symbol-keyed properties are omitted
const obj = { [sym]: 42, name: 'Alice' };
JSON.stringify(obj);
// '{"name":"Alice"}'  ← sym key omitted

// Symbol values in objects are omitted
JSON.stringify({ key: Symbol('value'), name: 'Alice' });
// '{"name":"Alice"}'  ← Symbol value omitted like undefined

// Symbol values in arrays become null
JSON.stringify([Symbol('a'), 'b', Symbol('c')]);
// '[null,"b",null]'

// Symbol properties are fundamentally non-enumerable in JSON context
// Use string keys for data you need to serialize`}
      </CodeBlock>

      <SectionHeader number={9} title="Quick Reference — All Special Cases" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'undefined (object prop) → omitted',
          description: 'Key silently disappears. Fix: use null instead, or replacer: (k,v) => v === undefined ? null : v',
        },
        {
          title: 'undefined (array element) → null',
          description: 'Index preserved as null. JSON has no undefined type — null is the closest equivalent.',
        },
        {
          title: 'Function (object prop) → omitted',
          description: 'Functions have no JSON representation. Silently dropped. Use toJSON() or build a plain data object.',
        },
        {
          title: 'Symbol (object prop) → omitted',
          description: 'Both Symbol keys and Symbol values in objects are omitted. In arrays, Symbol values become null.',
        },
        {
          title: 'Date → ISO 8601 string',
          description: 'Date.toJSON() produces "2024-11-15T10:30:00.000Z". Parsing gives back a string — re-construct with new Date(str).',
        },
        {
          title: 'NaN, Infinity, -Infinity → null',
          description: 'Silent lossy conversion. Validate numbers before serializing: if (!Number.isFinite(val)) throw or substitute.',
        },
        {
          title: 'Circular reference → TypeError',
          description: 'Throws at runtime. Fix: replacer with WeakSet to track seen objects, or use the flatted package.',
        },
        {
          title: 'BigInt → TypeError',
          description: 'Throws at runtime. Fix: convert to string (bigInt.toString()) or number (Number(bigInt)) before serializing.',
        },
        {
          title: 'Map → empty object {}',
          description: 'Silent data loss. Fix: Object.fromEntries(map) or [...map.entries()] before stringifying.',
        },
        {
          title: 'Set → empty object {}',
          description: 'Silent data loss. Fix: [...set] or Array.from(set) before stringifying.',
        },
      ]} />

      <AlertBox type="tip" title="Test edge cases instantly — no setup needed">
        Paste any JavaScript object with unusual values (undefined, BigInt, circular refs via
        toJSON override) into the{' '}
        <a href="https://unblockdevs.com/json-stringify-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          JSON.stringify() online tool
        </a>{' '}
        to see exactly how they serialize. Faster than opening a browser console.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does JSON.stringify() remove undefined values?',
          answer: 'The JSON specification (RFC 8259) defines only six value types: null, boolean, number, string, array, and object. There is no undefined type in JSON. When JSON.stringify() encounters undefined as an object property value, it omits the key entirely (it cannot represent it). When undefined appears in an array, it becomes null to preserve the array length and indices.',
        },
        {
          question: 'What is the difference between null and undefined in JSON.stringify()?',
          answer: 'null is a valid JSON type and is always preserved — in objects, in arrays, and as a top-level value. undefined is not a JSON type and is silently omitted from object properties, becomes null in arrays, and returns the JS value undefined (not a string) when passed as the top-level argument. Use null for intentionally absent values; avoid undefined in data you plan to serialize.',
        },
        {
          question: 'How does JSON.stringify() handle Date objects?',
          answer: 'Date objects have a built-in toJSON() method that returns an ISO 8601 string like "2024-11-15T10:30:00.000Z". JSON.stringify() calls toJSON() automatically, so dates serialize to ISO strings without any extra code. However, JSON.parse() does not automatically reconstruct Date objects — it produces a plain string. Re-construct dates with new Date(parsed.dateField) after parsing.',
        },
        {
          question: 'How do I fix "Converting circular structure to JSON"?',
          answer: 'This error means an object references itself directly or through a chain. Fix: (1) Use a replacer that tracks seen objects with a WeakSet and replaces circular refs with "[Circular]". (2) Use the flatted npm package as a drop-in JSON replacement that handles circular structures. (3) Restructure your data to avoid circular references before serializing.',
        },
        {
          question: 'How do I serialize a JavaScript Map or Set to JSON?',
          answer: 'Map and Set are not JSON-serializable — JSON.stringify() silently produces "{}" for both, losing all data. For Map: convert to a plain object with Object.fromEntries(map), or to an array of entries with [...map.entries()]. For Set: convert to an array with [...set] or Array.from(set). Then stringify the converted value.',
        },
        {
          question: 'What happens to NaN and Infinity in JSON.stringify()?',
          answer: 'NaN, Infinity, and -Infinity all become null in JSON output — silently. JSON number format (IEEE 754 standard JSON subset) does not support these special values. This is a silent lossy conversion that can corrupt numerical data. Validate all numbers with Number.isFinite(val) before serializing, and use a replacer to catch any that slip through.',
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
