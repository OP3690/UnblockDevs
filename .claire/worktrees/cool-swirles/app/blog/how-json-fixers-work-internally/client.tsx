'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowJsonFixersWorkClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How JSON Fixers Work Internally (And Why Manual Fixing Fails)</h1>
      <p className="lead">
        You paste broken JSON into a fixer, click a button, and get back clean JSON in milliseconds.
        What actually happened? This guide pulls back the curtain on how intelligent JSON repair tools
        work — from lexer-based error recovery to heuristic bracket matching — and explains why
        trying to fix JSON by hand is slower and more error-prone than you might think.
      </p>

      <StatGrid stats={[
        { value: '7', label: 'Common JSON error types', color: 'red' },
        { value: '3 stages', label: 'Parsing pipeline (lex → parse → repair)', color: 'blue' },
        { value: '100ms', label: 'Typical auto-repair time for any size JSON', color: 'green' },
        { value: '0', label: 'Manual eyeballing needed with a good fixer', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Invalid JSON?" />

      <p>
        JSON (JavaScript Object Notation) has a strict formal grammar. A JSON document is invalid
        if it violates any rule of that grammar. Common violations:
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'Trailing commas', description: '{"a":1,} — the comma after the last value is illegal in JSON but valid in JavaScript.' },
        { title: 'Single quotes', description: "{\"name\": 'Alice'} — JSON requires double quotes for all strings." },
        { title: 'Unquoted keys', description: '{name: "Alice"} — property names must be quoted strings.' },
        { title: 'Missing commas', description: '{"a":1 "b":2} — objects and arrays must have commas between elements.' },
        { title: 'Unclosed brackets', description: '{"users": [{"id":1}' — missing closing ] and }.' },
        { title: 'Comments', description: '// this is a comment — JSON does not support comments.' },
        { title: 'Undefined / NaN values', description: '{value: undefined} — only null, not undefined, is valid JSON.' },
        { title: 'Smart/curly quotes', description: '{"name": "Alice"} — smart quotes from word processors break JSON.' },
      ]} />

      <SectionHeader number={2} title="The 3-Stage JSON Repair Pipeline" />

      <ArchDiagram
        boxes={[
          { label: 'Stage 1: Lexical Analysis (tokenise)', color: 'blue' },
          { label: 'Stage 2: Parsing (build AST)', color: 'purple' },
          { label: 'Stage 3: Error Recovery & Repair', color: 'green' },
          { label: 'Valid JSON output', color: 'green' },
        ]}
        arrows={['→', '→', '→']}
      />

      <SectionHeader number={3} title="Stage 1 — Lexical Analysis" />

      <p>
        The lexer (tokeniser) reads the input character by character and produces a flat stream of
        tokens. This stage is forgiving — it categorises characters even when the structure is broken.
      </p>

      <CodeBlock language="python" filename="lexer-concept.py">
{`# Simplified lexer concept
def tokenise(text: str) -> list[tuple[str, str]]:
    tokens = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch in '{':   tokens.append(('LBRACE', '{'));   i += 1
        elif ch in '}': tokens.append(('RBRACE', '}'));   i += 1
        elif ch in '[': tokens.append(('LBRACKET', '[')); i += 1
        elif ch in ']': tokens.append(('RBRACKET', ']')); i += 1
        elif ch == ':': tokens.append(('COLON', ':'));     i += 1
        elif ch == ',': tokens.append(('COMMA', ','));     i += 1
        elif ch == '"': # string
            j = i + 1
            while j < len(text) and text[j] != '"':
                j += 1
            tokens.append(('STRING', text[i+1:j]))
            i = j + 1
        # ... handle numbers, booleans, null, whitespace
    return tokens

tokens = tokenise('{"name": "Alice",}')
# → [('LBRACE','{'), ('STRING','name'), ('COLON',':'),
#    ('STRING','Alice'), ('COMMA',','), ('RBRACE','}')]
# The trailing comma before } is now visible as a token-level problem`}
      </CodeBlock>

      <SectionHeader number={4} title="Stage 2 — Parsing with Error Recovery" />

      <p>
        A standard JSON parser throws an exception at the first error. A <strong>repair parser</strong>
        uses error-recovery strategies to continue past errors and build as much of the AST as possible.
      </p>

      <CodeBlock language="python" filename="error-recovery-concept.py">
{`# Panic-mode error recovery strategy (simplified concept)
class RepairParser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.errors = []

    def parse_object(self):
        obj = {}
        self.expect('LBRACE')
        while self.peek() != 'RBRACE':
            key = self.parse_string()
            self.expect('COLON')
            value = self.parse_value()
            obj[key] = value
            if self.peek() == 'COMMA':
                self.consume('COMMA')
                # Trailing comma recovery: if next is }, just continue
                if self.peek() == 'RBRACE':
                    self.errors.append('trailing_comma_removed')
                    break
            elif self.peek() != 'RBRACE':
                # Missing comma: log and continue
                self.errors.append(f'inserted_comma_before_{key}')
        self.expect('RBRACE')
        return obj`}
      </CodeBlock>

      <SectionHeader number={5} title="Stage 3 — Heuristic Repair Strategies" />

      <p>
        Once parsing has identified errors, the repair engine applies heuristics to fix them.
        Each error type has a specific repair rule:
      </p>

      <VerticalSteps steps={[
        {
          title: 'Trailing comma removal',
          description: 'If a comma is followed immediately by } or ], remove it. 100% safe repair.',
          code: '{"a":1,}  →  {"a":1}',
        },
        {
          title: 'Missing comma insertion',
          description: 'If two values are adjacent without a separator, insert a comma. Heuristic: works for simple cases.',
          code: '{"a":1 "b":2}  →  {"a":1,"b":2}',
        },
        {
          title: 'Unclosed bracket completion',
          description: 'Track bracket depth via a stack. At end of input, if stack is not empty, append the missing closing brackets in reverse order.',
          code: '{"users":[{"id":1}  →  {"users":[{"id":1}]}',
        },
        {
          title: 'Quote normalisation',
          description: 'Replace curly/smart quotes (U+201C, U+201D) with straight double quotes. Replace single-quoted strings with double-quoted ones.',
          code: "{name: 'Alice'}  →  {\"name\": \"Alice\"}",
        },
        {
          title: 'Comment stripping',
          description: 'Remove // line comments and /* block comments */ before parsing. JSON5-style comments are very common in config files.',
          code: '{"timeout": 30 // seconds\n}  →  {"timeout": 30}',
        },
      ]} />

      <SectionHeader number={6} title="Why Manual Fixing Fails" />

      <ErrorFix
        badLabel="Trying to fix 5000-line JSON by eye"
        bad={`{
  "users": [
    {"id": 1, "name": "Alice",  // ← comment here breaks JSON
     "roles": ["admin" "editor"]  // ← missing comma in array
    }
    {"id": 2}  // ← missing comma between objects
  ]  // ← forgot to close outer object
}`}
        goodLabel="JSON fixer handles all of these automatically"
        good={`{
  "users": [
    {"id": 1, "name": "Alice",
     "roles": ["admin", "editor"]
    },
    {"id": 2}
  ]
}`}
      />

      <AlertBox type="warning" title="Nested structure errors are nearly impossible to spot manually">
        In a 10,000-line JSON file, a single missing brace on line 847 can make the entire file
        invalid — and the error message will point to line 10,000, not line 847. The repair algorithm
        uses bracket depth tracking to find the actual location.
      </AlertBox>

      <SectionHeader number={7} title="Comparison: Manual vs Automated JSON Repair" />

      <CompareTable
        leftLabel="Manual repair"
        rightLabel="Automated JSON fixer"
        rows={[
          { label: 'Time for 100-line JSON', left: '2-10 minutes', right: '< 100ms' },
          { label: 'Time for 10,000-line JSON', left: 'Hours to impossible', right: '< 500ms' },
          { label: 'Trailing comma (50 instances)', left: 'Tedious, error-prone', right: 'Automatic batch removal' },
          { label: 'Missing bracket location', left: 'Requires counter-counting from end', right: 'Stack-based tracking finds exact line' },
          { label: 'Nested comment stripping', left: 'Regex risk of false positives', right: 'Lexer-aware stripping, no false positives' },
          { label: 'Error introduced by fixer', left: 'High (fatigue)', right: 'Low (deterministic algorithm)' },
        ]}
      />

      <SectionHeader number={8} title="Implementing a Simple JSON Fixer" />

      <CodeBlock language="ts" filename="simple-json-fixer.ts">
{`/**
 * Basic JSON repair — handles common issues
 * For production use, use the json-fixer or jsonrepair npm packages
 */
export function basicJsonRepair(input: string): string {
  let json = input.trim();

  // 1. Strip single-line comments
  json = json.replace(/\/\/[^\n]*/g, '');

  // 2. Strip block comments
  json = json.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Replace smart/curly quotes with straight quotes
  json = json
    .replace(/[\u201C\u201D]/g, '"')   // curly double quotes
    .replace(/[\u2018\u2019]/g, "'");  // curly single quotes

  // 4. Replace single-quoted strings with double-quoted
  // (simplified — doesn't handle escaped single quotes inside)
  json = json.replace(/'([^']*)'/g, '"$1"');

  // 5. Remove trailing commas before ] or }
  json = json.replace(/,\s*([}\]])/g, '$1');

  // 6. Try to parse; if still fails, return with error
  try {
    JSON.parse(json);
    return json;
  } catch {
    // For unclosed brackets and missing commas, use a proper library
    // import { jsonrepair } from 'jsonrepair';
    // return jsonrepair(input);
    throw new Error('JSON repair failed — try jsonrepair library');
  }
}`}
      </CodeBlock>

      <SectionHeader number={9} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'How does a JSON fixer find the real location of an error?',
          answer: 'Most JSON parsers report the position where parsing failed (often the end of file), not where the error originated. JSON repair tools use bracket-stack tracking during lexing: they push to a stack on { and [, pop on } and ]. At the end of input, any unclosed brackets in the stack reveal the location of the first structural error. This is far more precise than the native JSON.parse() error position.',
        },
        {
          question: 'Can a JSON fixer ever produce wrong output?',
          answer: 'Yes. For genuinely ambiguous inputs, the fixer must make assumptions. For example, {"a": 1 "b": 2} could be missing a comma (→ {"a":1,"b":2}) or the second key might be part of the first value. Most fixers choose the comma-insertion interpretation. If the repair logic guesses wrong, you get syntactically valid but semantically incorrect JSON. Always review the repaired output for critical data.',
        },
        {
          question: 'Why does JSON not allow trailing commas or comments?',
          answer: 'JSON was designed by Douglas Crockford as a minimal data interchange format, intentionally stripped of any features that could cause parsing ambiguity or variation across implementations. Comments were excluded because different languages handle them differently (and because it kept the grammar tiny). Trailing commas were excluded for consistency. JSON5 is a superset that adds these features for human-authored config files.',
        },
        {
          question: 'What is the best npm package for JSON repair in Node.js?',
          answer: 'The most popular and comprehensive packages are: jsonrepair (by josdejong) — handles the broadest range of errors including truncated JSON and streaming repair; json-fixer — lighter weight with good trailing comma and comment support. For Python, the json-repair or demjson3 packages serve the same purpose. For TypeScript/JavaScript applications, jsonrepair is the current recommendation.',
        },
        {
          question: 'Why do LLMs often return invalid JSON?',
          answer: 'LLMs generate tokens probabilistically and do not have a strict JSON-grammar constraint enforcing valid structure during generation. Common issues: the LLM truncates output due to token limits (unclosed brackets), generates markdown code fences around the JSON (```json...```), adds explanatory text before or after the JSON object, or uses incorrect escaping for special characters. Constrained decoding (structured outputs mode in OpenAI API) forces grammatically valid JSON output.',
        },
        {
          question: 'What is the UnblockDevs JSON fixer doing differently?',
          answer: 'The UnblockDevs JSON fixer runs entirely in your browser — no data is sent to a server. It uses a multi-pass repair strategy: lexer-based comment and quote normalisation first, then parser-based error recovery for structural issues, then heuristic trailing comma and bracket completion. It shows you exactly which repairs were made and lets you compare the original and fixed versions side by side.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
