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

export default function JsonFormatterGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Formatter Guide — Format, Validate, Auto-Fix &amp; Minify JSON in One Tool</h1>
      <p className="lead">
        A proper JSON formatter does much more than add indentation. It validates syntax,
        pinpoints errors with exact line and column numbers, auto-fixes common mistakes like
        trailing commas and single quotes, and can minify output for production. This guide
        covers what to look for in a JSON formatter, how to use each feature, and the full
        workflow from raw API response to clean, validated JSON.
      </p>

      <StatGrid stats={[
        { value: 'Format', label: 'Pretty-print with 2-space, 4-space, or tab indentation', color: 'blue' },
        { value: 'Validate', label: 'Syntax checking with exact line:column error positions', color: 'green' },
        { value: 'Auto-fix', label: 'Trailing commas, single quotes, unquoted keys — repaired automatically', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="What a Good JSON Formatter Does" />
      <p>
        Not all JSON formatters are equal. A basic one just adds indentation. A good one
        validates the structure, explains errors, and helps you fix them without leaving the
        tool.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Format with configurable indent',
          description:
            'Converts compressed single-line JSON to indented multi-line output. Supports 2-space (JavaScript standard), 4-space (Python/enterprise), and tab indent. Lets you switch between formats instantly.',
        },
        {
          title: 'Validate syntax in real time',
          description:
            'Highlights syntax errors as you type. Shows the exact line number and column where the parser failed. Good formatters also suggest the likely fix — not just where the error is.',
        },
        {
          title: 'Auto-fix common mistakes',
          description:
            'Trailing commas, single-quoted strings, unquoted keys, and JavaScript comments are all invalid JSON but extremely common. Auto-fix converts these to valid JSON automatically.',
        },
        {
          title: 'Minify to compact output',
          description:
            'Strips all whitespace to produce the smallest valid JSON string. Essential for production API payloads, cache values, and message queue messages where size matters.',
        },
      ]} />

      <SectionHeader number={2} title="Format JSON — From Raw to Readable" />
      <p>
        The most common use case: you have a compressed API response or log line and need to
        read it. Formatting adds the indentation that makes nesting, arrays, and field names
        visible.
      </p>

      <CodeBlock lang="bash" title="Typical raw API response — needs formatting">
{`# curl output — one long line, hard to read
curl -s https://api.example.com/users/42
{"id":42,"name":"Alice Smith","email":"alice@example.com","role":"admin","permissions":["read","write","delete"],"lastLogin":"2024-11-15T10:30:00Z","profile":{"avatar":"https://cdn.example.com/avatars/42.jpg","bio":"Senior Developer","timezone":"Europe/London","company":{"id":7,"name":"Acme Corp","plan":"enterprise"}}}`}
      </CodeBlock>

      <CodeBlock lang="json" title="After formatting with 2-space indent">
{`{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "admin",
  "permissions": [
    "read",
    "write",
    "delete"
  ],
  "lastLogin": "2024-11-15T10:30:00Z",
  "profile": {
    "avatar": "https://cdn.example.com/avatars/42.jpg",
    "bio": "Senior Developer",
    "timezone": "Europe/London",
    "company": {
      "id": 7,
      "name": "Acme Corp",
      "plan": "enterprise"
    }
  }
}`}
      </CodeBlock>

      <AlertBox type="tip" title="Format curl output directly in the terminal">
        Pipe curl output through Python for instant formatting without leaving the terminal:{' '}
        <code>curl -s https://api.example.com/users/42 | python3 -m json.tool</code>. Or use{' '}
        <code>jq .</code> if jq is installed:{' '}
        <code>curl -s https://api.example.com/users/42 | jq .</code>. For a GUI with copy,
        download, and tree view: use the online JSON Formatter.
      </AlertBox>

      <SectionHeader number={3} title="Validate JSON — Find Errors Before They Hit Production" />
      <p>
        JSON validation catches syntax errors before your code does. A validation error in a
        config file or API payload causes cryptic runtime errors — finding it at the source
        saves significant debugging time.
      </p>

      <CodeBlock lang="json" title="Common validation errors with explanations">
{`// Error: Trailing comma after last property
{
  "name": "Alice",
  "age": 30,    ← SyntaxError: Unexpected token } in JSON at position 34
}

// Error: Missing comma between properties
{
  "name": "Alice"    ← SyntaxError: Expected comma or }
  "age": 30
}

// Error: Unquoted key
{
  name: "Alice",    ← SyntaxError: Expected property name or }
  "age": 30
}

// Error: Incorrect nesting — array closed with }
{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  }    ← SyntaxError: Expected , or ] — mismatched bracket
}`}
      </CodeBlock>

      <QuickFact color="blue" label="Error messages point to where the parser got confused, not where the bug is">
        JSON parse errors report the position where the parser gave up — not where you made
        the mistake. A missing comma on line 5 might cause a parse error reported on line 6
        when the parser hits an unexpected character. Always look a few lines{' '}
        <em>before</em> the reported error position for the actual mistake.
      </QuickFact>

      <SectionHeader number={4} title="Auto-Fix — Repair JavaScript-Style JSON Automatically" />
      <p>
        Developers often write JSON the same way they write JavaScript object literals — with
        trailing commas, single quotes, unquoted keys, and comments. These are all invalid in
        strict JSON. The auto-fix feature handles all of them in one step.
      </p>

      <ErrorFix
        title="JavaScript object literal vs valid JSON"
        bad={`// This is valid JavaScript, but NOT valid JSON:
{
  // User config
  name: 'Alice',         // unquoted key, single-quoted string
  age: 30,              // trailing comma
  roles: ['admin',],    // trailing comma in array
  active: true,
}`}
        good={`{
  "name": "Alice",
  "age": 30,
  "roles": ["admin"],
  "active": true
}`}
        badLabel="JavaScript syntax — 4 JSON violations, fails in any JSON parser"
        goodLabel="Valid JSON — all keys quoted, double quotes, no trailing commas, no comments"
      />

      <CodeBlock lang="javascript" title="Auto-fix in code — safe parser libraries">
{`// json5 — parses JSON5 superset (comments, single quotes, trailing commas)
import JSON5 from 'json5';
const parsed = JSON5.parse(\`{
  // config
  name: 'Alice',
  roles: ['admin',],
}\`);
// Returns { name: 'Alice', roles: ['admin'] }

// json-parse-even-better-errors — better error messages for debugging
import parseJson from 'json-parse-even-better-errors';
try {
  parseJson('{"name": "Alice",}');
} catch (e) {
  console.log(e.message);
  // JSON5: invalid character '}' at 1:18 — more actionable than native
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Minify JSON — Optimize for Production" />
      <p>
        Minified JSON is compact JSON with all non-essential whitespace removed. For large
        API payloads and frequently cached data, minification meaningfully reduces transfer
        time and storage costs.
      </p>

      <CodeBlock lang="json" title="Pretty vs minified — size comparison">
{`// Pretty-printed: 245 bytes
{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "roles": [
    "admin",
    "editor"
  ],
  "active": true
}

// Minified: 83 bytes (66% smaller)
{"id":42,"name":"Alice Smith","email":"alice@example.com","roles":["admin","editor"],"active":true}`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Minify JSON safely in code">
{`// Safe: parse then re-stringify without space parameter
const minified = JSON.stringify(JSON.parse(prettyJson));

// Node.js script: minify a JSON file
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
fs.writeFileSync('./data.min.json', JSON.stringify(data));

// Express middleware: always send minified JSON
app.use((req, res, next) => {
  res.json = (obj) => {
    res.type('json').send(JSON.stringify(obj)); // no pretty-print
  };
  next();
});`}
      </CodeBlock>

      <SectionHeader number={6} title="JSON Formatter in Development Workflows" />

      <VerticalSteps steps={[
        {
          title: 'Inspect API responses during development',
          desc: 'Copy response body from browser DevTools Network tab → paste into JSON Formatter → instantly see nested structure, array sizes, and data types. Faster than reading compressed output.',
        },
        {
          title: 'Validate JSON config files before deploying',
          desc: 'Paste your package.json, tsconfig.json, docker-compose.json, or CI pipeline config into the formatter before committing. Catch trailing commas and syntax errors before they break a build.',
        },
        {
          title: 'Format test fixtures for readability',
          desc: 'JSON test fixtures committed to your repo should be pretty-printed for code review readability. Format all fixtures consistently and configure Prettier to maintain that format automatically.',
        },
        {
          title: 'Debug serialization bugs in API integrations',
          desc: 'When an API integration returns unexpected data, format the raw response to see the actual field names (snake_case vs camelCase), unexpected null values, and nested array structures that may differ from documentation.',
        },
      ]} />

      <AlertBox type="tip" title="Use the JSON Formatter + Beautifier at unblockdevs.com/json-beautifier">
        The{' '}
        <a href="https://unblockdevs.com/json-beautifier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          UnblockDevs JSON workbench
        </a>{' '}
        combines formatting, validation, auto-fix, tree view, and TypeScript/SQL generation
        in one tool. Paste your JSON once and get everything you need.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is a JSON formatter?',
          answer: 'A JSON formatter converts compressed or poorly-indented JSON into a readable, consistently-indented format. It also validates the JSON syntax, reports errors with line and column numbers, and often includes auto-fix for common mistakes like trailing commas. Good formatters also support minification (removing all whitespace) for production use.',
        },
        {
          question: 'How do I format JSON online for free?',
          answer: 'Go to unblockdevs.com/json-beautifier, paste your JSON, and the formatted output appears instantly. Choose 2-space or 4-space indentation. The tool validates the JSON, auto-fixes common mistakes, and lets you copy or download the formatted result. No account, no login, and your data never leaves your browser.',
        },
        {
          question: 'What is the difference between JSON formatting and JSON validation?',
          answer: 'Formatting adds whitespace for readability — it does not check whether the JSON is correct. Validation checks whether the JSON is syntactically valid according to the JSON spec (RFC 8259) — quoted keys, double-quoted strings, no trailing commas, no comments. A formatter validates first, then formats if valid (or auto-fixes if possible). A pure validator only checks correctness without changing the format.',
        },
        {
          question: 'Why does my JSON fail to format?',
          answer: 'Your JSON has a syntax error. The most common causes are: (1) trailing comma after the last property or array element, (2) single-quoted strings instead of double-quoted, (3) unquoted property keys, (4) JavaScript comments, (5) missing or extra brackets/braces. The JSON Formatter shows the exact error location and auto-fixes many of these automatically.',
        },
        {
          question: 'How do I minify JSON for production?',
          answer: 'In the JSON Formatter tool, click Minify to get compact single-line output. In JavaScript: JSON.stringify(JSON.parse(jsonString)) — never use string manipulation to remove whitespace as it will break string values that contain spaces or newlines. For build pipelines, use json-minifier-webpack-plugin or similar tools to minify JSON assets automatically.',
        },
        {
          question: 'Can I format JSON directly in the terminal?',
          answer: 'Yes — two commands work well. If Python is installed: echo \'{"key":"value"}\' | python3 -m json.tool. If jq is installed: echo \'{"key":"value"}\' | jq . (jq has more options and handles large files better). For JSON files: python3 -m json.tool input.json > output.json. For GUI with tree view, copy, and download: use the online JSON Formatter.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
