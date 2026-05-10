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

export default function JsonSyntaxErrorFixClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Fix JSON Syntax Errors — Every Common JSON Error Explained &amp; Fixed</h1>
      <p className="lead">
        "Unexpected token", "Expected comma or ]", "Unterminated string" — JSON parse errors
        are cryptic, and the error position often points to the wrong place. This guide
        covers every common JSON syntax error developers hit: what causes it, what the error
        message actually means, and exactly how to fix it. Plus the tools that catch and
        auto-fix most errors in one click.
      </p>

      <StatGrid stats={[
        { value: '#1', label: 'Trailing comma — the most common JSON error from JS developers', color: 'red' },
        { value: '← -1', label: 'Error position is often one character past the actual mistake', color: 'orange' },
        { value: 'Auto-fix', label: 'Most common errors can be repaired automatically in one click', color: 'green' },
      ]} />

      <SectionHeader number={1} title="How JSON Error Positions Work — Read This First" />
      <p>
        JSON parse errors report the position where the parser gave up, not always where you
        made the mistake. The parser reads left-to-right and stops at the first character it
        cannot handle. The actual bug is often one character earlier.
      </p>

      <AlertBox type="warning" title="Error position is where the parser failed — not where you made the mistake">
        If you see <code>Unexpected token {'}'} in JSON at position 42</code>, the{' '}
        <code>{'}'}</code> at position 42 is where the parser stopped. The real problem is
        usually the character just before it — a trailing comma after the last property that
        made the parser expect another property when it saw <code>{'}'}</code> instead. Always
        look <strong>one to two characters before</strong> the reported error position.
      </AlertBox>

      <SectionHeader number={2} title="Error 1: Trailing Comma (Most Common)" />

      <ErrorFix
        title="Trailing comma after last property or array element"
        bad={`// JSON.parse error: Unexpected token } in JSON at position 28
{
  "name": "Alice",
  "age": 30,       ← trailing comma — parser expects another property
}

// Also fails in arrays:
// JSON.parse error: Unexpected token ] in JSON at position 15
["apple", "banana",]  ← trailing comma before ]`}
        good={`// No comma after the last property
{
  "name": "Alice",
  "age": 30
}

// No comma after the last array element
["apple", "banana"]`}
        badLabel="Invalid — trailing comma causes Unexpected token } or ] error"
        goodLabel="Valid — no comma after last property or element"
      />

      <QuickFact color="blue" label="Why this happens — JavaScript allows trailing commas, JSON does not">
        JavaScript object literals and arrays allow trailing commas since ES5:{' '}
        <code>{'{'} a: 1, b: 2, {'}'}</code> is valid JS. Developers writing JSON by hand
        often apply the same habit. But the JSON spec (RFC 8259) explicitly forbids trailing
        commas — every comma must be followed by another value.
      </QuickFact>

      <SectionHeader number={3} title="Error 2: Single Quotes Instead of Double Quotes" />

      <ErrorFix
        title="Single-quoted strings — valid JavaScript, invalid JSON"
        bad={`// JSON.parse error: Unexpected token ' in JSON at position 1
{
  'name': 'Alice',
  'city': 'London'
}
// Both keys AND values must use double quotes in JSON`}
        good={`{
  "name": "Alice",
  "city": "London"
}`}
        badLabel="Invalid — single quotes not allowed in JSON"
        goodLabel="Valid — all strings use double quotes"
      />

      <SectionHeader number={4} title="Error 3: Unquoted Property Keys" />

      <ErrorFix
        title="Unquoted keys — valid in JavaScript objects, invalid in JSON"
        bad={`// JSON.parse error: Unexpected token n in JSON at position 4
{
  name: "Alice",     ← unquoted key
  age: 30,
  active: true
}`}
        good={`{
  "name": "Alice",
  "age": 30,
  "active": true
}`}
        badLabel="Invalid — property keys must be quoted strings"
        goodLabel="Valid — all keys are double-quoted strings"
      />

      <SectionHeader number={5} title="Error 4: Comments — Not Allowed in JSON" />

      <ErrorFix
        title="JavaScript comments in JSON — common in config files"
        bad={`// JSON.parse error: Unexpected token / in JSON at position 0
// App configuration
{
  "theme": "dark",
  /* display settings */
  "language": "en",
  "debug": false  // set to true for verbose logging
}`}
        good={`{
  "theme": "dark",
  "language": "en",
  "debug": false
}
// Comments must be removed before parsing standard JSON
// If you need comments: use JSONC (.jsonc files) or JSON5 format`}
        badLabel="Invalid — comments (// and /* */) not allowed in JSON"
        goodLabel="Valid — no comments; use JSONC or JSON5 if you need comments"
      />

      <QuickFact color="violet" label="JSONC and JSON5 support comments — tsconfig.json is JSONC">
        TypeScript config files (<code>tsconfig.json</code>) are actually JSONC (JSON with
        Comments) — parsed by a special JSONC parser, not standard JSON.parse(). VS Code
        also supports JSONC in settings.json. These are not standard JSON and will fail in
        any JSON.parse() call. Use JSON5 (<code>json5</code> npm package) if you need
        comments in JSON files you parse in code.
      </QuickFact>

      <SectionHeader number={6} title="Error 5: Missing Commas Between Properties" />

      <ErrorFix
        title="Missing comma between properties — parser expects } or , but finds a key"
        bad={`// JSON.parse error: Unexpected string in JSON at position 22
{
  "name": "Alice"   ← missing comma here
  "age": 30,
  "city": "London"
}`}
        good={`{
  "name": "Alice",
  "age": 30,
  "city": "London"
}`}
        badLabel="Missing comma after &quot;Alice&quot; — parser sees second key unexpectedly"
        goodLabel="Commas after every property except the last one"
      />

      <SectionHeader number={7} title="Error 6: Mismatched or Missing Brackets/Braces" />

      <ErrorFix
        title="Array closed with } or object closed with ] — mismatched brackets"
        bad={`// JSON.parse error: Expected , or ] in JSON at position 58
{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  }    ← should be ] to close the array, not }
}`}
        good={`{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}`}
        badLabel="Mismatched bracket — } closes the object but the array [ is still open"
        goodLabel="] closes the array correctly, then } closes the outer object"
      />

      <CodeBlock lang="javascript" title="Track nesting depth to find mismatched brackets">
{`// Debugging tip: count brackets manually for small JSON
function checkBrackets(json) {
  const stack = [];
  const pairs = { '{': '}', '[': ']' };
  const closing = new Set(['}', ']']);

  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    if (pairs[char]) {
      stack.push({ char, pos: i });
    } else if (closing.has(char)) {
      const last = stack.pop();
      if (!last || pairs[last.char] !== char) {
        return \`Mismatch at position \${i}: found \${char}, expected \${last ? pairs[last.char] : 'nothing'}\`;
      }
    }
  }

  if (stack.length > 0) {
    const { char, pos } = stack[stack.length - 1];
    return \`Unclosed \${char} at position \${pos}\`;
  }
  return 'Brackets balanced';
}`}
      </CodeBlock>

      <SectionHeader number={8} title="Error 7: Unterminated String" />

      <ErrorFix
        title="String that never closes — missing closing quote"
        bad={`// JSON.parse error: Unterminated string in JSON at position 10
{
  "name": "Alice Smith,   ← missing closing " before comma
  "age": 30
}`}
        good={`{
  "name": "Alice Smith",
  "age": 30
}`}
        badLabel="Unterminated string — parser reads to end of line without finding closing &quot;"
        goodLabel="String properly closed with double quote before the comma"
      />

      <SectionHeader number={9} title="Error 8: Invalid Escape Sequences in Strings" />

      <ErrorFix
        title="Backslash in string values — must be escaped"
        bad={`// JSON.parse error: Bad escape character in string literal
{
  "path": "C:\Users\Alice\Documents",    ← backslashes not escaped
  "regex": "\d+\.\d+"
}`}
        good={`{
  "path": "C:\\\\Users\\\\Alice\\\\Documents",
  "regex": "\\\\d+\\\\.\\\\d+"
}
// In JSON strings: backslash must be written as \\
// Valid escape sequences: \\\\ \\" \\/ \\b \\f \\n \\r \\t \\uXXXX`}
        badLabel="Unescaped backslash — parse error in paths and regex patterns"
        goodLabel="Backslash escaped as \\\\ — valid in JSON strings"
      />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Valid JSON escape sequences',
          description:
            '\\\\ (backslash), \\" (double quote), \\/ (forward slash), \\b (backspace), \\f (form feed), \\n (newline), \\r (carriage return), \\t (tab), \\uXXXX (Unicode codepoint). Any other backslash sequence is invalid.',
        },
        {
          title: 'Forward slash is optionally escaped',
          description:
            '\\/ is valid but not required. JSON.stringify() does not escape forward slashes. Some output from other systems may include \\/ for HTML safety — this is valid JSON.',
        },
        {
          title: 'Newlines inside strings must be \\n',
          description:
            'Literal newlines inside a JSON string value (pressing Enter inside the string) are invalid JSON. Represent newlines as \\n in the string value.',
        },
        {
          title: 'Unicode: use \\uXXXX',
          description:
            'Non-ASCII characters can appear directly in JSON (UTF-8 is valid) or as \\uXXXX escape sequences. Both are valid. JSON.stringify() with default settings keeps non-ASCII characters as-is.',
        },
      ]} />

      <SectionHeader number={10} title="Auto-Fix JSON Errors in One Click" />
      <p>
        For common errors — trailing commas, single quotes, unquoted keys, and comments —
        the JSON Beautifier auto-fix feature repairs the JSON automatically without you
        reading every error.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Paste the broken JSON',
          desc: 'Go to unblockdevs.com/json-beautifier or unblockdevs.com/json-validator. Paste the invalid JSON. The error is highlighted immediately with exact line and column numbers.',
        },
        {
          title: 'Click Auto-Fix',
          desc: 'The auto-fix feature corrects: trailing commas, single-quoted strings, unquoted keys, and JavaScript comments. Click once and the JSON is repaired.',
        },
        {
          title: 'Review the fixed output',
          desc: 'The corrected JSON appears in the output panel, formatted and valid. Review the diff to understand what was changed.',
        },
        {
          title: 'For complex errors, use the line:column position',
          desc: 'If auto-fix cannot repair the JSON (mismatched brackets, unterminated strings), use the exact line and column number from the error report to find and fix the issue manually.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why does JSON say "Unexpected token" — what does it mean?',
          answer: '"Unexpected token X in JSON at position N" means the parser found character X at position N and could not make sense of it given what came before. Common causes: trailing comma (parser finds } or ] after a comma but expects a value), unquoted key (parser finds a letter where it expects " to start a key), single quote (parser finds \' where it expects "). The bug is usually one character before the reported position.',
        },
        {
          question: 'How do I fix a trailing comma in JSON?',
          answer: 'Remove the comma after the last property in an object or the last element in an array. In objects: the last property should have no comma: \\"age\\": 30 (no comma). In arrays: the last element should have no comma: \\"banana\\" (no comma before the closing ]). Use the Auto-Fix button in the JSON Beautifier at unblockdevs.com/json-beautifier to fix all trailing commas at once.',
        },
        {
          question: 'Can JSON have comments?',
          answer: 'No — standard JSON (RFC 8259) does not support comments. Neither // nor /* */ comments are allowed. If you need comments in JSON-like config files, use JSONC (JSON with Comments, used by VS Code and TypeScript), JSON5 (a superset with comments and other extensions), or YAML. To parse JSONC in code, use the jsonc-parser npm package. For JSON5: use the json5 npm package.',
        },
        {
          question: 'Why does my JSON parse work in one tool but fail in another?',
          answer: 'Different tools have different parsers with different levels of leniency. Some parsers (JavaScript eval, JSON5, Python demjson) accept trailing commas, single quotes, and comments. Standard JSON parsers (JSON.parse(), Python json.loads()) strictly follow RFC 8259 and reject these. Always validate against a strict parser if your JSON will be consumed by standard library code.',
        },
        {
          question: 'How do I fix "Unterminated string in JSON"?',
          answer: 'A string value or key is missing its closing double quote. Find the string that starts with " but never closes before the end of the line or before the next property. Add the missing closing ". Also check for unescaped double quotes inside string values — use \\" to include a literal double quote inside a JSON string.',
        },
        {
          question: 'How do I include a backslash in a JSON string?',
          answer: 'Use double backslash: \\\\. In JSON, \\ is the escape character, so \\\\ produces a literal \\. For Windows file paths: C:\\\\Users\\\\Alice becomes the string C:\\Users\\Alice after parsing. The valid JSON escape sequences are: \\\\ \\\" \\/ \\b \\f \\n \\r \\t \\uXXXX. Any other \\X combination is invalid JSON and will cause a parse error.',
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
