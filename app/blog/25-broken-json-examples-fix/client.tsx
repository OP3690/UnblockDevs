'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function BrokenJsonExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>25 Broken JSON Examples and How to Fix Them</h1>
      <p className="lead">
        JSON parse errors are among the most frustrating bugs in web development — and they are almost always caused by the same small set of syntax mistakes. This comprehensive guide walks through 25 real broken JSON examples, explains exactly why each one fails, and shows the corrected version. Whether you are debugging an API response, fixing a config file, or learning JSON from scratch, these examples will sharpen your eye for errors instantly.
      </p>

      <StatGrid stats={[
        { value: '25', label: 'Broken JSON patterns covered', color: 'red' },
        { value: '8', label: 'Root cause categories', color: 'blue' },
        { value: '100%', label: 'Browser-parseable fixes', color: 'green' },
        { value: '5min', label: 'Time to master all patterns', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why JSON Breaks: The Root Causes" />
      <p>
        JSON (JavaScript Object Notation) is strict by design. Unlike JavaScript, it has no tolerance for comments, trailing commas, single quotes, or unquoted keys. Understanding the root cause categories helps you spot errors before you even run a parser.
      </p>

      <KeyPointsGrid columns={4} items={[
        { title: 'Quote Errors', description: 'Single quotes, unescaped quotes, missing quotes around keys or string values.' },
        { title: 'Comma Errors', description: 'Trailing commas, double commas, missing commas between values.' },
        { title: 'Bracket Errors', description: 'Missing closing braces { }, brackets [ ], or mismatched pairs.' },
        { title: 'Invalid Values', description: 'NaN, Infinity, undefined, Date objects, comments — none are valid JSON.' },
      ]} />

      <AlertBox type="info" title="Quick Reference: What JSON Does and Does Not Allow">
        Allowed: strings (double-quoted), numbers, booleans (true/false), null, arrays, objects. NOT allowed: single quotes, comments, trailing commas, undefined, NaN, Infinity, Date objects, functions, or unquoted keys.
      </AlertBox>

      <SectionHeader number={2} title="Quote Errors: Examples 1–5" />

      <ErrorFix
        bad={`{'name': 'John', 'age': 30}`}
        good={`{"name": "John", "age": 30}`}
        badLabel="Single quotes — invalid JSON"
        goodLabel="Double quotes — valid JSON"
      />

      <p>JSON requires double quotes for all strings, both keys and values. Single quotes are valid in JavaScript but cause a parse error in any strict JSON parser.</p>

      <ErrorFix
        bad={`{name: "John", age: 30}`}
        good={`{"name": "John", "age": 30}`}
        badLabel="Unquoted keys — JavaScript style, not JSON"
        goodLabel="All keys must be double-quoted strings"
      />

      <ErrorFix
        bad={`{"key": "value"}`}
        good={`{"key": "value"}`}
        badLabel='{"message": "He said "Hello""}'
        goodLabel='{"message": "He said \\"Hello\\""}'
      />

      <CodeBlock language="json" filename="Example 3: Unescaped quotes inside strings">
{`// BROKEN: unescaped inner quotes break the string boundary
{"message": "He said "Hello" to me"}

// FIXED: escape inner double quotes with backslash
{"message": "He said \\"Hello\\" to me"}`}
      </CodeBlock>

      <ErrorFix
        bad={`{"key": "value"}`}
        good={`{"key": "value"}`}
        badLabel='{"text": "Line 1\nLine 2"} — raw newline in string'
        goodLabel='{"text": "Line 1\\nLine 2"} — escaped newline'
      />

      <CodeBlock language="json" filename="Example 4 & 5: Newlines and special characters in strings">
{`// BROKEN: literal newline inside a JSON string
{"text": "Line 1
Line 2"}

// FIXED: use escape sequences
{"text": "Line 1\\nLine 2"}

// Other common escapes:
// \\t  = tab
// \\r  = carriage return
// \\\\ = literal backslash
// \\"  = literal double quote`}
      </CodeBlock>

      <SectionHeader number={3} title="Comma Errors: Examples 6–10" />

      <ErrorFix
        bad={`{"name": "John", "age": 30,}`}
        good={`{"name": "John", "age": 30}`}
        badLabel="Trailing comma after last property — not valid in JSON"
        goodLabel="No comma after the final property"
      />

      <QuickFact>Trailing commas are allowed in modern JavaScript (ES5+) and TypeScript, but are strictly forbidden in JSON. This is the #1 source of JSON errors when copy-pasting from JS code.</QuickFact>

      <ErrorFix
        bad={`[1, 2, 3,]`}
        good={`[1, 2, 3]`}
        badLabel="Trailing comma in array — invalid JSON"
        goodLabel="Clean array without trailing comma"
      />

      <CodeBlock language="json" filename="Examples 8–10: Missing commas and double commas">
{`// BROKEN: missing comma between properties
{"name": "John" "age": 30}

// FIXED:
{"name": "John", "age": 30}

// BROKEN: double comma
{"name": "John",, "age": 30}

// FIXED:
{"name": "John", "age": 30}

// BROKEN: missing comma and missing quotes on key
{"name": "John" age: 30}

// FIXED:
{"name": "John", "age": 30}`}
      </CodeBlock>

      <SectionHeader number={4} title="Bracket and Brace Errors: Examples 11–15" />

      <ErrorFix
        bad={`{"users": [{"name": "John"}]`}
        good={`{"users": [{"name": "John"}]}`}
        badLabel="Missing closing brace — object never closed"
        goodLabel="All opened braces and brackets must be closed"
      />

      <CodeBlock language="json" filename="Examples 12–15: Mixed bracket/brace mismatches">
{`// BROKEN: array opened with [ but closed with }
{"items": [1, 2, 3}

// FIXED:
{"items": [1, 2, 3]}

// BROKEN: nested object missing closing brace
{"nested": {"key": "value"}

// FIXED:
{"nested": {"key": "value"}}

// BROKEN: array tag never closed
{"tags": ["red", "blue"]

// FIXED:
{"tags": ["red", "blue"]}

// BROKEN: multiple levels unclosed
{"a": {"b": [1, 2

// FIXED:
{"a": {"b": [1, 2]}}`}
      </CodeBlock>

      <AlertBox type="tip" title="Bracket Counting Trick">
        For every opening brace or bracket you see, there must be a matching closing one. Count: opened braces minus closed braces should equal zero. Same for brackets. Most IDEs have bracket matching built in — use it.
      </AlertBox>

      <SectionHeader number={5} title="Invalid Value Errors: Examples 16–20" />

      <ErrorFix
        bad={`{"price": NaN}`}
        good={`{"price": null}`}
        badLabel="NaN is not a valid JSON value"
        goodLabel="Use null to represent missing numeric values"
      />

      <ErrorFix
        bad={`{"count": Infinity}`}
        good={`{"count": null}`}
        badLabel="Infinity is not a valid JSON value"
        goodLabel="Use null or omit the field entirely"
      />

      <CodeBlock language="json" filename="Examples 18–20: undefined, Date objects, and functions">
{`// BROKEN: undefined is a JS concept, not valid JSON
{"middleName": undefined}

// FIXED: use null
{"middleName": null}

// BROKEN: Date object is not a JSON primitive
{"date": new Date()}

// FIXED: use ISO 8601 string
{"date": "2026-03-25T00:00:00.000Z"}

// BROKEN: function values cannot be serialized to JSON
{"calculate": function() { return 42; }}

// FIXED: omit function fields or store as string description
{"calculate": "returns 42"}`}
      </CodeBlock>

      <SectionHeader number={6} title="Structural Errors: Examples 21–25" />

      <ErrorFix
        bad={`{"a": 1}{"b": 2}`}
        good={`[{"a": 1}, {"b": 2}]`}
        badLabel="Multiple root objects — JSON allows only one root value"
        goodLabel="Wrap in an array if you need multiple root-level objects"
      />

      <CodeBlock language="json" filename="Examples 22–25: Octal numbers, comments, unquoted values, whitespace">
{`// BROKEN: octal number literals not valid in JSON
{"code": 0123}

// FIXED: use decimal
{"code": 83}

// BROKEN: comments are not allowed in JSON
{
  // This is a comment
  "name": "John"
}

// FIXED: remove all comments
{
  "name": "John"
}

// BROKEN: unquoted string value
{"key": value}

// FIXED: all string values must be double-quoted
{"key": "value"}

// BROKEN: boolean value with wrong case
{"active": True}

// FIXED: JSON booleans are lowercase only
{"active": true}`}
      </CodeBlock>

      <CompareTable
        leftLabel="JavaScript (lenient)"
        rightLabel="JSON (strict)"
        rows={[
          { label: 'String quotes', left: "Single or double quotes OK", right: 'Double quotes only' },
          { label: 'Object keys', left: 'Can be unquoted identifiers', right: 'Must be double-quoted strings' },
          { label: 'Trailing commas', left: 'Allowed in ES5+', right: 'Not allowed' },
          { label: 'Comments', left: '// and /* */ both work', right: 'No comments of any kind' },
          { label: 'Special values', left: 'undefined, NaN, Infinity', right: 'Only null, true, false' },
          { label: 'Date objects', left: 'new Date() works', right: 'Must be ISO string' },
          { label: 'Functions', left: 'Can be values', right: 'Not serializable' },
          { label: 'Boolean casing', left: 'True, False, TRUE work', right: 'Only true and false (lowercase)' },
        ]}
      />

      <SectionHeader number={7} title="Quick Fix Reference: All 25 Patterns" />

      <KeyPointsGrid columns={2} items={[
        { title: 'Pattern 1: Single quotes', description: "Replace all ' with \" for strings and keys." },
        { title: 'Pattern 2: Trailing comma (object)', description: 'Remove comma after last key-value pair.' },
        { title: 'Pattern 3: Unquoted keys', description: 'Wrap every key in double quotes.' },
        { title: 'Pattern 4: Missing comma', description: 'Add comma between every key-value pair.' },
        { title: 'Pattern 5: Missing closing brace', description: 'Match every { with a }.' },
        { title: 'Pattern 6: Unescaped inner quotes', description: 'Replace " inside strings with \\".' },
        { title: 'Pattern 7: Comments', description: 'Remove all // and /* */ comments.' },
        { title: 'Pattern 8: NaN value', description: 'Replace NaN with null.' },
        { title: 'Pattern 9: Infinity', description: 'Replace Infinity with null.' },
        { title: 'Pattern 10: undefined value', description: 'Replace undefined with null.' },
        { title: 'Pattern 11: Trailing comma (array)', description: 'Remove comma after last array element.' },
        { title: 'Pattern 12: Date object', description: 'Replace new Date() with ISO 8601 string.' },
        { title: 'Pattern 13: Multiple root objects', description: 'Wrap all root objects in a single array.' },
        { title: 'Pattern 14: Octal number', description: 'Replace 0123-style with decimal equivalent.' },
        { title: 'Pattern 15: Literal newline in string', description: 'Replace newline with \\n escape.' },
        { title: 'Pattern 16: Double comma', description: 'Remove duplicate comma.' },
        { title: 'Pattern 17: Missing closing bracket', description: 'Match every [ with a ].' },
        { title: 'Pattern 18: Nested missing brace', description: 'Check inner objects for unclosed { }.' },
        { title: 'Pattern 19: Trailing comma in nested array', description: 'Remove trailing comma in any nested array.' },
        { title: 'Pattern 20: Boolean + missing comma', description: 'Add comma and verify boolean is one value per key.' },
        { title: 'Pattern 21: Missing comma + missing quotes', description: 'Fix key quoting and add separator comma.' },
        { title: 'Pattern 22: Unescaped newline in string', description: 'Use \\n escape sequence instead of literal newline.' },
        { title: 'Pattern 23: Empty object (valid)', description: '{"data": {}} is actually valid JSON — empty objects are fine.' },
        { title: 'Pattern 24: Missing closing bracket (long array)', description: 'Count array elements and verify ] is present.' },
        { title: 'Pattern 25: Unquoted string value', description: 'Any non-number, non-boolean, non-null value must be quoted.' },
      ]} />

      <SectionHeader number={8} title="How to Debug JSON Errors Systematically" />

      <FlowDiagram steps={[
        { label: 'Copy JSON', color: 'blue' },
        { label: 'Run JSON.parse()', color: 'blue' },
        { label: 'Read error line/col', color: 'amber' },
        { label: 'Check pattern list', color: 'amber' },
        { label: 'Apply fix', color: 'green' },
        { label: 'Validate again', color: 'green' },
      ]} />

      <CodeBlock language="javascript" filename="Debugging JSON errors in Node.js or browser console">
{`// Step 1: Try to parse and get the error location
try {
  const data = JSON.parse(yourJsonString);
  console.log('Valid!', data);
} catch (e) {
  console.error('Parse error:', e.message);
  // Output: "Unexpected token ' in JSON at position 1"
  // The position number tells you WHERE the error is
}

// Step 2: Extract the problem area
const position = 42; // from error message
const snippet = yourJsonString.substring(
  Math.max(0, position - 20),
  Math.min(yourJsonString.length, position + 20)
);
console.log('Problem area:', snippet);

// Step 3: Use a JSON linter for complex structures
// jsonlint.com, jsonformatter.curiousconcept.com, or VSCode`}
      </CodeBlock>

      <AlertBox type="tip" title="VSCode JSON Validation">
        In VSCode, files ending in .json automatically get JSON validation highlighting. For inline JSON strings, install the "JSON Tools" extension to format and validate JSON anywhere in your codebase.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the most common JSON error?',
          answer: 'Trailing commas are the single most common JSON error, especially when developers copy-paste from JavaScript code or TypeScript interfaces. Always check for commas after the last item in objects and arrays.'
        },
        {
          question: 'Why does JSON not allow comments?',
          answer: 'JSON was designed as a minimal data interchange format by Douglas Crockford. Comments were intentionally excluded to keep parsing simple and deterministic. For config files that need comments, consider JSONC (JSON with Comments) used by VSCode, or switch to YAML/TOML.'
        },
        {
          question: 'Can I use JSON5 to avoid these restrictions?',
          answer: 'Yes. JSON5 is a superset of JSON that allows single quotes, trailing commas, comments, and unquoted keys. It is useful for config files but not suitable for API data interchange since most servers and parsers expect strict JSON.'
        },
        {
          question: 'How do I convert a JavaScript object to valid JSON?',
          answer: 'Use JSON.stringify(obj). This automatically handles quote conversion, escaping, and removal of undefined values and functions. To pretty-print: JSON.stringify(obj, null, 2). Note that functions, undefined values, and circular references will cause issues.'
        },
        {
          question: 'What should I use instead of NaN and Infinity in JSON?',
          answer: 'Use null for missing or invalid numeric values. If you need to distinguish between "not applicable" and "infinite", add a companion flag field: {"value": null, "valueType": "infinity"}. Some APIs use string representations like "Infinity" but these require custom parsing logic on the client.'
        },
        {
          question: 'Is there a tool to automatically fix broken JSON?',
          answer: 'Yes. Our JSON Fixer tool handles all 25 error patterns automatically. It detects and repairs trailing commas, quote issues, missing brackets, and common invalid values. Paste your broken JSON and get the corrected version instantly.'
        },
      ]} />

      <AlertBox type="success" title="Summary">
        JSON errors fall into 5 categories: quote errors, comma errors, bracket errors, invalid values, and structural errors. Memorize the key rule: JSON is stricter than JavaScript. Double quotes everywhere, no trailing commas, no comments, no undefined/NaN/Infinity, and exactly one root value.
      </AlertBox>
    </BlogLayoutWithSidebarAds>
  );
}
