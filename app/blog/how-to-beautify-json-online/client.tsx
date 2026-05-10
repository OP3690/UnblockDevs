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

export default function HowToBeautifyJsonOnlineClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Beautify &amp; Format JSON Online — Pretty Print, Indent &amp; Minify</h1>
      <p className="lead">
        Raw JSON from an API, database dump, or log file is usually a single compressed line
        with no whitespace — nearly impossible to read. Beautifying JSON adds consistent
        indentation so the structure becomes instantly visible. This guide explains how to
        beautify JSON online in seconds, when to use 2-space vs 4-space indent, how to minify
        it back for production, and how to fix common formatting errors along the way.
      </p>

      <StatGrid stats={[
        { value: '1 paste', label: 'Paste compressed JSON → get readable formatted output instantly', color: 'blue' },
        { value: '2 or 4', label: 'Space indent — 2 is standard in JS/JSON, 4 is common in Python ecosystem', color: 'green' },
        { value: '0 bytes', label: 'Sent to any server — all formatting happens in your browser', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="What Does Beautifying JSON Mean?" />
      <p>
        Beautifying (also called pretty-printing or formatting) JSON means converting a
        compressed single-line JSON string into a multi-line, indented structure. The JSON
        data itself does not change — only the whitespace is added to make it human-readable.
      </p>

      <ErrorFix
        title="Raw compressed JSON vs beautified output"
        bad={`{"id":42,"name":"Alice Smith","email":"alice@example.com","roles":["admin","editor"],"address":{"street":"123 Main St","city":"London","country":"UK","postcode":"EC1A 1BB"},"settings":{"theme":"dark","notifications":true,"language":"en"}}`}
        good={`{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "roles": [
    "admin",
    "editor"
  ],
  "address": {
    "street": "123 Main St",
    "city": "London",
    "country": "UK",
    "postcode": "EC1A 1BB"
  },
  "settings": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  }
}`}
        badLabel="Compressed — impossible to read or debug"
        goodLabel="Beautified — structure, nesting, and values instantly visible"
      />

      <SectionHeader number={2} title="How to Beautify JSON Online — Step by Step" />

      <VerticalSteps steps={[
        {
          title: 'Copy your raw JSON',
          desc: 'From an API response (Postman, browser DevTools, curl output), a database dump, a log file, or any other source. It can be a single long line, partially formatted, or even slightly broken.',
        },
        {
          title: 'Open the JSON Beautifier',
          desc: 'Go to unblockdevs.com/json-beautifier. No login or account required. Your data stays in your browser — nothing is sent to any server.',
        },
        {
          title: 'Paste and format',
          desc: 'Paste the JSON into the left panel. The tool validates and formats it instantly. If there are syntax errors (trailing commas, unquoted keys), the auto-fix feature corrects them automatically.',
        },
        {
          title: 'Choose indent level',
          desc: 'Switch between 2-space and 4-space indentation depending on your team\'s convention. The output updates immediately.',
        },
        {
          title: 'Copy or download',
          desc: 'Click Copy to copy the formatted JSON to your clipboard, or Download to save as a .json file. Use it in your code editor, share with teammates, or add to your project.',
        },
      ]} />

      <AlertBox type="tip" title="Beautify JSON instantly — no setup">
        Paste any JSON at{' '}
        <a href="https://unblockdevs.com/json-beautifier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          unblockdevs.com/json-beautifier
        </a>{' '}
        and get formatted output in one click. Handles compressed, partially formatted, and
        slightly broken JSON. Free, browser-only, no account required.
      </AlertBox>

      <SectionHeader number={3} title="2-Space vs 4-Space vs Tab Indent — Which to Use?" />
      <p>
        The indent size is a style preference, but ecosystem conventions are strong. Using the
        wrong indent size breaks consistency with your team's linter and editor settings.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: '2-space indent (most common)',
          description:
            'Standard in JavaScript, TypeScript, JSON config files (package.json, tsconfig.json, .eslintrc), and most Node.js projects. JSON.stringify(obj, null, 2) is the idiomatic JS pretty-print call. Prettier and ESLint default to 2 spaces.',
        },
        {
          title: '4-space indent',
          description:
            'Common in Python projects (PEP 8 for Python code — often carried over to JSON configs), Java, C#, and .NET ecosystems. Preferred in many enterprise style guides. VS Code\'s default for JSON files is 4 spaces.',
        },
        {
          title: 'Tab indent',
          description:
            'Preferred by some teams for accessibility (tab width is user-configurable in editors). Some project configs (Go, Makefile-adjacent tooling) use tabs. Less common in JSON specifically. JSON.stringify(obj, null, "\\t") produces tab-indented output.',
        },
        {
          title: 'Compact (no indent)',
          description:
            'Used for production: API payloads, localStorage, cookies, Kafka messages, and any case where wire transfer size matters. Removing all whitespace from a large JSON response can reduce transfer size by 20-40%.',
        },
      ]} />

      <CodeBlock lang="javascript" title="Indent options in JSON.stringify()">
{`const data = {
  user: { id: 42, name: 'Alice' },
  roles: ['admin', 'editor'],
};

// 2-space (JavaScript standard)
JSON.stringify(data, null, 2);

// 4-space (Python / enterprise convention)
JSON.stringify(data, null, 4);

// Tab indent
JSON.stringify(data, null, '\t');

// Compact (production / wire transfer)
JSON.stringify(data);
// '{"user":{"id":42,"name":"Alice"},"roles":["admin","editor"]}'`}
      </CodeBlock>

      <SectionHeader number={4} title="Minify JSON — Compress Back to Production Format" />
      <p>
        Minifying reverses beautification — it removes all non-essential whitespace to produce
        the smallest possible JSON string. Use minified JSON for API responses, message queues,
        cache storage, and any performance-sensitive transfer.
      </p>

      <CodeBlock lang="javascript" title="Minify JSON in JavaScript">
{`// Minify by stringifying without a space argument
const minified = JSON.stringify(JSON.parse(prettyJson));

// Or: remove whitespace without parsing (risky — may corrupt string values with newlines)
// Always prefer parse → stringify for safe minification

// Size comparison example:
const pretty = JSON.stringify(data, null, 2);   // 312 bytes
const compact = JSON.stringify(data);            // 198 bytes
// 37% smaller — significant for large payloads or frequent calls`}
      </CodeBlock>

      <QuickFact color="blue" label="Never manually remove whitespace from JSON">
        String values in JSON can contain whitespace and newline characters (as{' '}
        <code>\n</code>, <code>\t</code>, etc.) that must not be removed. Always minify JSON
        by parsing it to a JavaScript object first and re-stringifying — never use a regex
        or string replace on raw JSON.
      </QuickFact>

      <SectionHeader number={5} title="Why Your JSON Might Not Beautify — Common Issues" />
      <p>
        If pasting JSON into a beautifier produces an error instead of formatted output, the
        input has a syntax problem. The JSON Beautifier auto-fixes many common issues — here
        are the most frequent ones and their fixes.
      </p>

      <ErrorFix
        title="Trailing commas — valid in JavaScript, invalid in JSON"
        bad={`{
  "name": "Alice",
  "age": 30,      ← trailing comma after last property
}`}
        good={`{
  "name": "Alice",
  "age": 30
}`}
        badLabel="Invalid JSON — trailing comma causes parse error"
        goodLabel="Valid JSON — no comma after last property or array element"
      />

      <ErrorFix
        title="Single-quoted strings — valid in JavaScript, invalid in JSON"
        bad={`{
  'name': 'Alice',
  'city': 'London'
}`}
        good={`{
  "name": "Alice",
  "city": "London"
}`}
        badLabel="Invalid JSON — single quotes not allowed"
        goodLabel="Valid JSON — all strings use double quotes"
      />

      <ErrorFix
        title="Unquoted keys — valid in JavaScript objects, invalid in JSON"
        bad={`{
  name: "Alice",
  age: 30,
  city: "London"
}`}
        good={`{
  "name": "Alice",
  "age": 30,
  "city": "London"
}`}
        badLabel="Invalid JSON — keys must be quoted strings"
        goodLabel="Valid JSON — all keys are double-quoted strings"
      />

      <ErrorFix
        title="Comments — valid in JavaScript/JSONC, invalid in standard JSON"
        bad={`{
  // User settings
  "theme": "dark",
  /* display preferences */
  "language": "en"
}`}
        good={`{
  "theme": "dark",
  "language": "en"
}`}
        badLabel="Invalid JSON — comments not allowed in standard JSON"
        goodLabel="Valid JSON — remove comments before parsing"
      />

      <SectionHeader number={6} title="When to Beautify JSON in Your Workflow" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Debugging API responses',
          description:
            'Chrome DevTools shows responses compressed. Copy the response body, paste into the beautifier to see the structure clearly — especially useful for deeply nested objects and large arrays.',
        },
        {
          title: 'Reading error logs',
          description:
            'Production logging often serializes error context as compact JSON inline in log lines. Extract the JSON, beautify it, and you can see all nested error fields, stack frames, and metadata at a glance.',
        },
        {
          title: 'Writing JSON config files',
          description:
            'package.json, tsconfig.json, .eslintrc, docker-compose.yml overrides, and CI config often include JSON snippets. Beautify to verify the structure before saving.',
        },
        {
          title: 'Reviewing data exports',
          description:
            'Database exports, analytics snapshots, and data warehouse dumps often produce compressed JSON. Beautify to audit structure, spot missing fields, and verify data integrity.',
        },
        {
          title: 'Sharing JSON with teammates',
          description:
            'Compressed JSON in a Slack message or PR comment is unreadable. Beautify before sharing — or use a link to the beautifier with the JSON pre-pasted.',
        },
        {
          title: 'Generating test fixtures',
          description:
            'Test data and mock API responses should be pretty-printed in your repo for readability in code review. Beautify once, commit, and future reviewers can read the data without tooling.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is a JSON beautifier and what does it do?',
          answer: 'A JSON beautifier (also called a JSON formatter or JSON pretty printer) converts compressed, single-line JSON into a multi-line, indented structure. The data itself is unchanged — only whitespace is added to make the JSON human-readable. It also validates the JSON syntax and reports any errors (trailing commas, missing quotes, etc.) that would prevent the JSON from being parsed.',
        },
        {
          question: 'How do I format JSON online for free?',
          answer: 'Go to unblockdevs.com/json-beautifier, paste your JSON in the left panel, and the formatted output appears instantly on the right. Choose 2-space or 4-space indentation depending on your project\'s style. Copy the result or download as a .json file. No account, no upload — all processing happens in your browser.',
        },
        {
          question: 'What is the difference between 2-space and 4-space JSON indentation?',
          answer: '2-space indent is the JavaScript standard — used in package.json, tsconfig.json, and by tools like Prettier. 4-space indent is common in Python, Java, and enterprise environments. Both produce identical JSON data — the indent width is purely cosmetic. Match whatever your project\'s .editorconfig or Prettier config specifies.',
        },
        {
          question: 'How do I minify JSON back to compact format?',
          answer: 'In the JSON Beautifier tool, click the Minify button to get the compressed single-line output. In JavaScript code: JSON.stringify(JSON.parse(jsonString)) removes all whitespace safely. Never use string.replace() or regex to minify JSON — string values can contain whitespace characters that must be preserved.',
        },
        {
          question: 'Why does my JSON fail to beautify?',
          answer: 'Your JSON has a syntax error. Common causes: trailing commas after the last property (invalid in JSON but valid in JS), single-quoted strings instead of double-quoted, unquoted property keys, comments (not allowed in JSON), or a missing/extra bracket. The JSON Beautifier shows the exact line and column of the error and auto-fixes many common mistakes.',
        },
        {
          question: 'Is it safe to paste sensitive JSON into an online beautifier?',
          answer: 'The UnblockDevs JSON Beautifier processes everything in your browser — no data is sent to any server. You can verify this by opening your browser\'s DevTools Network tab while using the tool — you will see no network requests when you paste and format. For maximum caution with very sensitive data, use the browser\'s built-in console: JSON.stringify(JSON.parse(rawJson), null, 2).',
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
