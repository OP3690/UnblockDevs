'use client';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type KeyboardEvent,
} from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Zap,
  AlertTriangle,
  Info,
  ChevronDown,
  X,
  Code2,
  Wand2,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ErrorSeverity = 'critical' | 'warning' | 'info';

type ErrorCategory =
  | 'trailing_comma'
  | 'single_quotes'
  | 'unquoted_key'
  | 'invalid_value'
  | 'unclosed_bracket'
  | 'comment'
  | 'duplicate_key'
  | 'invalid_escape'
  | 'control_char'
  | 'leading_zeros'
  | 'python_value'
  | 'extra_data'
  | 'mismatched_bracket'
  | 'bom'
  | 'empty'
  | 'plus_number'
  | 'syntax';

interface JsonError {
  id: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  line: number;
  col: number;
  title: string;
  icon: string;
  message: string;
  explanation: string;
  spec: string;
  howToFix: string;
  autoFixable: boolean;
  snippet?: string;
  fixedSnippet?: string;
  codeJS?: string;
  codePython?: string;
  count?: number;
  allLines?: number[];
}

interface SourceInfo {
  name: string;
  icon: string;
  tip: string;
  confidence: 'high' | 'medium' | 'low';
}

interface DetectionResult {
  errors: JsonError[];
  isValid: boolean;
  source: SourceInfo | null;
  healthScore: number;
}

interface FixResult {
  fixed: string;
  appliedFixes: string[];
  isNowValid: boolean;
}

type DiffLine = { type: 'same' | 'removed' | 'added'; text: string };

// ─────────────────────────────────────────────────────────────────────────────
// Examples
// ─────────────────────────────────────────────────────────────────────────────

const EXAMPLES: { name: string; icon: string; json: string }[] = [
  {
    name: 'AI Output',
    icon: '🤖',
    json: `{
  "name": "Alice Chen",
  "age": 30,
  "hobbies": ["reading", "coding",],
  "active": undefined,
  "score": NaN,
  "balance": Infinity,
}`,
  },
  {
    name: 'Python Dict',
    icon: '🐍',
    json: `{
  "user": "Bob",
  "admin": False,
  "data": None,
  "verified": True,
  "count": 5
}`,
  },
  {
    name: 'JS Object',
    icon: '🟨',
    json: `{
  name: 'Charlie',
  age: 25,
  tags: ['dev', 'js'],
  active: true
}`,
  },
  {
    name: 'Config File',
    icon: '⚙️',
    json: `{
  // Application config
  "port": 3000,
  "debug": true, /* enable in dev only */
  "host": "localhost",
  "timeout": 030
}`,
  },
  {
    name: 'Multi-Error',
    icon: '🧨',
    json: `{
  name: 'Dave',
  "roles": ["admin", "user",],
  active: True,
  // system flags
  "score": NaN,
  "data": {
    "id": 01,
    "value": undefined
  },
}`,
  },
  {
    name: 'Unclosed',
    icon: '📂',
    json: `{
  "users": [
    {"id": 1, "name": "Eve"},
    {"id": 2, "name": "Frank"}
  ,
  "total": 2`,
  },
  {
    name: 'Mismatched',
    icon: '🔀',
    json: `{
  "items": [1, 2, 3},
  "count": 3
]`,
  },
  {
    name: 'Duplicate Keys',
    icon: '🔁',
    json: `{
  "status": "active",
  "role": "admin",
  "status": "inactive",
  "email": "user@example.com",
  "role": "user"
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers
// ─────────────────────────────────────────────────────────────────────────────

function posFromIndex(text: string, idx: number): { line: number; col: number } {
  let line = 1;
  let col = 1;
  for (let i = 0; i < idx && i < text.length; i++) {
    if (text[i] === '\n') {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

/** Build a boolean[] — true when that char index is inside a JSON string literal. */
function buildStringMap(text: string): boolean[] {
  const map: boolean[] = new Array(text.length).fill(false);
  let inStr = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\\' && inStr) {
      map[i] = true;
      if (i + 1 < text.length) map[i + 1] = true;
      i++;
      continue;
    }
    if (text[i] === '"') {
      inStr = !inStr;
      continue;
    }
    if (inStr) map[i] = true;
  }
  return map;
}

// ─────────────────────────────────────────────────────────────────────────────
// Error Detection Engine
// ─────────────────────────────────────────────────────────────────────────────

function detectAllErrors(text: string): DetectionResult {
  if (!text.trim()) {
    return {
      errors: [],
      isValid: false,
      source: null,
      healthScore: 0,
    };
  }

  const errors: JsonError[] = [];
  const seenIds = new Set<string>();
  const add = (e: JsonError) => {
    if (!seenIds.has(e.id)) {
      seenIds.add(e.id);
      errors.push(e);
    }
  };

  const inStr = buildStringMap(text);

  // ── 0. BOM ──────────────────────────────────────────────────────────────
  if (text.startsWith('﻿')) {
    add({
      id: 'bom',
      category: 'bom',
      severity: 'critical',
      line: 1,
      col: 1,
      title: 'BOM Character',
      icon: '⚡',
      message: 'File starts with a UTF-8 Byte Order Mark — all parsers reject this',
      explanation:
        'A BOM (\\uFEFF) is an invisible Unicode character placed at the start of some UTF-8 files to signal encoding. JSON parsers treat it as an unexpected character and immediately fail. This often happens when saving JSON from Windows Notepad or certain editors.',
      spec: 'RFC 8259 §8.1: JSON must not begin with a BOM',
      howToFix:
        'Save the file as "UTF-8 without BOM". In VS Code: bottom-right corner → click "UTF-8 with BOM" → "Save with Encoding" → "UTF-8".',
      autoFixable: true,
      fixedSnippet: '(BOM stripped from start)',
    });
  }

  // ── 1. Python-style values ─────────────────────────────────────────────
  const pyRe = /\b(True|False|None)\b/g;
  let m: RegExpExecArray | null;
  const pyHits: Array<{ idx: number; val: string }> = [];
  while ((m = pyRe.exec(text)) !== null) {
    if (!inStr[m.index]) pyHits.push({ idx: m.index, val: m[1] });
  }
  if (pyHits.length > 0) {
    const vals = [...new Set(pyHits.map((h) => h.val))];
    const pos = posFromIndex(text, pyHits[0].idx);
    add({
      id: 'python_value',
      category: 'python_value',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Python Boolean / None Values',
      icon: '🐍',
      message: `Found Python-style literals: ${vals.join(', ')} — JSON requires lowercase`,
      explanation:
        'JSON literals must be lowercase: `true`, `false`, `null`. Python capitalises them as `True`, `False`, `None`. This JSON was almost certainly produced by Python\'s `str(obj)` instead of `json.dumps(obj)`. Every standard JSON parser rejects the capitalised forms.',
      spec: 'RFC 8259 §3: Literal names are true, false, null — case-sensitive',
      howToFix:
        'In Python use `json.dumps(obj)` instead of `str(obj)`. Or replace True→true, False→false, None→null globally.',
      autoFixable: true,
      snippet: vals.join(', '),
      fixedSnippet: vals.map((v) => (v === 'True' ? 'true' : v === 'False' ? 'false' : 'null')).join(', '),
      codeJS: `// JS already uses lowercase:\nconst obj = { flag: true, data: null };\nconst json = JSON.stringify(obj); // ✓`,
      codePython: `import json\n\n# ❌ Wrong — produces True/False/None\nbad = str(my_dict)\n\n# ✓ Right — produces true/false/null\ngood = json.dumps(my_dict)`,
      count: pyHits.length,
      allLines: [...new Set(pyHits.map((h) => posFromIndex(text, h.idx).line))],
    });
  }

  // ── 2. JS-only values (undefined, NaN, Infinity) ───────────────────────
  const jsValRe = /\b(undefined|NaN|Infinity|-Infinity)\b/g;
  const jsHits: Array<{ idx: number; val: string }> = [];
  while ((m = jsValRe.exec(text)) !== null) {
    if (!inStr[m.index]) jsHits.push({ idx: m.index, val: m[1] });
  }
  if (jsHits.length > 0) {
    const vals = [...new Set(jsHits.map((h) => h.val))];
    const pos = posFromIndex(text, jsHits[0].idx);
    add({
      id: 'invalid_value',
      category: 'invalid_value',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'JavaScript-Only Values',
      icon: '🟡',
      message: `Found JS-only values: ${vals.join(', ')} — these do not exist in JSON`,
      explanation:
        '`undefined`, `NaN`, and `Infinity` are JavaScript primitives that have no JSON equivalent. The JSON specification only allows: string, number, object, array, `true`, `false`, and `null`. Auto-fix replaces them all with `null`. This is extremely common in AI-generated JSON.',
      spec: 'RFC 8259 §5–7: Valid JSON values are object, array, number, string, true, false, null',
      howToFix:
        'Replace with `null` or a valid fallback. In JavaScript, `JSON.stringify()` automatically omits `undefined` keys and converts `NaN`/`Infinity` to `null`.',
      autoFixable: true,
      snippet: vals.join(', '),
      fixedSnippet: 'null (all replaced)',
      codeJS: `const obj = { a: undefined, b: NaN, c: Infinity };\nconst json = JSON.stringify(obj);\n// → {"b":null,"c":null}  (undefined keys are omitted)`,
      codePython: `import json, math\nobj = {"a": float('nan'), "b": float('inf')}\n# Fix — clean before serializing:\nfor k, v in obj.items():\n    if isinstance(v, float) and not math.isfinite(v):\n        obj[k] = None\njson.dumps(obj)  # ✓`,
      count: jsHits.length,
      allLines: [...new Set(jsHits.map((h) => posFromIndex(text, h.idx).line))],
    });
  }

  // ── 3. Comments ────────────────────────────────────────────────────────
  const lcRe = /\/\/[^\n]*/g;
  const bcRe = /\/\*[\s\S]*?\*\//g;
  const commentHits: number[] = [];
  while ((m = lcRe.exec(text)) !== null) {
    if (!inStr[m.index]) commentHits.push(m.index);
  }
  while ((m = bcRe.exec(text)) !== null) {
    if (!inStr[m.index]) commentHits.push(m.index);
  }
  if (commentHits.length > 0) {
    const pos = posFromIndex(text, commentHits[0]);
    add({
      id: 'comment',
      category: 'comment',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'JavaScript-Style Comments',
      icon: '💬',
      message: `${commentHits.length} comment(s) found — JSON has no comment syntax`,
      explanation:
        'Standard JSON (RFC 8259) does not support comments of any kind — not `//` and not `/* */`. This is intentional: JSON is a pure data format, not a configuration language. If your JSON looks like a config file with comments, consider using JSONC or JSON5 which do support comments.',
      spec: 'RFC 8259 §2: JSON has no comment syntax whatsoever',
      howToFix:
        'Remove all comments before parsing. For config files use JSONC (VS Code, TypeScript tsconfig.json support it natively) or JSON5.',
      autoFixable: true,
      codeJS: `// Strip comments before parsing:\nconst stripped = text\n  .replace(/\\/\\/[^\\n]*/g, '')\n  .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');\nconst parsed = JSON.parse(stripped);`,
      codePython: `import re, json\n\nstripped = re.sub(r'//[^\\n]*', '', text)\nstripped = re.sub(r'/\\*[\\s\\S]*?\\*/', '', stripped)\nparsed = json.loads(stripped)`,
      count: commentHits.length,
      allLines: [...new Set(commentHits.map((i) => posFromIndex(text, i).line))],
    });
  }

  // ── 4. Trailing commas ────────────────────────────────────────────────
  const tcRe = /,(\s*[}\]])/g;
  const tcHits: number[] = [];
  while ((m = tcRe.exec(text)) !== null) {
    if (!inStr[m.index]) tcHits.push(m.index);
  }
  if (tcHits.length > 0) {
    const pos = posFromIndex(text, tcHits[0]);
    add({
      id: 'trailing_comma',
      category: 'trailing_comma',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Trailing Comma',
      icon: '⚠️',
      message: `${tcHits.length} trailing comma${tcHits.length > 1 ? 's' : ''} — comma after the last element is forbidden`,
      explanation:
        'A trailing comma is a comma placed after the last element in an array `[1, 2,]` or the last key in an object `{"a":1,}`. JSON strictly forbids this. While ES2017+ JavaScript and JSON5 allow trailing commas, every standard JSON parser will reject them. This is the single most common error in AI-generated JSON.',
      spec: 'RFC 8259 §4–5: No trailing comma allowed before ] or }',
      howToFix: 'Remove the comma immediately before each closing `]` or `}`. Search your editor for `,]` and `,}`.',
      autoFixable: true,
      snippet: '[1, 2, 3,]  or  {"a":1,}',
      fixedSnippet: '[1, 2, 3]  or  {"a":1}',
      codeJS: `// JSON.parse rejects trailing commas:\nJSON.parse('{"a":1,}')  // ❌ SyntaxError\n\n// Strip them before parsing:\nconst fixed = text.replace(/,(?=\\s*[}\\]])/g, '');\nJSON.parse(fixed); // ✓`,
      codePython: `import re, json\n\nfixed = re.sub(r',(?=\\s*[}\\]])', '', text)\nparsed = json.loads(fixed)  # ✓`,
      count: tcHits.length,
      allLines: [...new Set(tcHits.map((i) => posFromIndex(text, i).line))],
    });
  }

  // ── 5. Single-quoted strings ──────────────────────────────────────────
  let sqCount = 0;
  const sqLines: number[] = [];
  let firstSqIdx: number | null = null;
  {
    let insideDouble = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\\' && insideDouble) {
        i++;
        continue;
      }
      if (text[i] === '"') {
        insideDouble = !insideDouble;
        continue;
      }
      if (text[i] === "'" && !insideDouble) {
        sqCount++;
        if (firstSqIdx === null) firstSqIdx = i;
        const ln = posFromIndex(text, i).line;
        if (!sqLines.includes(ln)) sqLines.push(ln);
      }
    }
  }
  if (sqCount > 0 && firstSqIdx !== null) {
    const pos = posFromIndex(text, firstSqIdx);
    add({
      id: 'single_quotes',
      category: 'single_quotes',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Single-Quoted Strings',
      icon: '🔤',
      message: `${sqCount} single quote(s) found — JSON mandates double quotes for all strings`,
      explanation:
        'JSON requires all strings — both keys and values — to be enclosed in double quotes (`"..."`. Single quotes (`\'...\'`) are valid JavaScript and Python but are explicitly rejected by the JSON specification. This is the most frequent error when copy-pasting JavaScript object literals or Python strings into JSON.',
      spec: 'RFC 8259 §7: A string begins and ends with a quotation mark (U+0022, the double-quote character)',
      howToFix:
        'Replace all single-quoted strings with double quotes. Make sure to escape any literal double quotes inside the string as `\\"`.',
      autoFixable: true,
      snippet: "{'key': 'value'}",
      fixedSnippet: '{"key": "value"}',
      codeJS: `JSON.parse("{'key': 'val'}")  // ❌ SyntaxError\nJSON.parse('{"key": "val"}') // ✓\n\n// Convert a JS object properly:\nconst obj = { key: 'val' };\nconst json = JSON.stringify(obj); // ✓`,
      codePython: `import json\njson.loads("{'k':'v'}")  # ❌ JSONDecodeError\njson.loads('{"k":"v"}')  # ✓\n\n# From a dict:\nobj = {'k': 'v'}\njson.dumps(obj)  # ✓ — always double-quotes`,
      count: sqCount,
      allLines: sqLines,
    });
  }

  // ── 6. Unquoted keys ─────────────────────────────────────────────────
  const ukRe = /(?:[{,])\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g;
  const ukHits: Array<{ idx: number; key: string }> = [];
  while ((m = ukRe.exec(text)) !== null) {
    if (inStr[m.index]) continue;
    // make sure the character before the key isn't a "
    const keyStart = text.indexOf(m[1], m.index);
    if (keyStart > 0 && text[keyStart - 1] === '"') continue;
    ukHits.push({ idx: m.index, key: m[1] });
  }
  if (ukHits.length > 0) {
    const pos = posFromIndex(text, ukHits[0].idx);
    add({
      id: 'unquoted_key',
      category: 'unquoted_key',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Unquoted Object Keys',
      icon: '🔑',
      message: `Key "${ukHits[0].key}" is unquoted — all JSON keys must be double-quoted strings`,
      explanation:
        'In JavaScript you can write `{ name: "Alice" }` with an unquoted key. JSON is stricter: every key must be a double-quoted string `{ "name": "Alice" }`. This difference trips up everyone who writes JavaScript object literals and tries to use them directly as JSON.',
      spec: 'RFC 8259 §4: Object members consist of a string (the name) followed by a colon',
      howToFix: 'Wrap each unquoted key in double quotes. Most editors can auto-format this via "Paste as JSON".',
      autoFixable: true,
      snippet: `{${ukHits[0].key}: "value"}`,
      fixedSnippet: `{"${ukHits[0].key}": "value"}`,
      codeJS: `const obj = { name: "Alice" }; // JS ✓\nconst json = JSON.stringify(obj); // → '{"name":"Alice"}' ✓`,
      codePython: `import json\nobj = {'name': 'Alice'}  # Python dict ✓\njson.dumps(obj)  # → '{"name": "Alice"}' ✓`,
      count: ukHits.length,
      allLines: [...new Set(ukHits.map((h) => posFromIndex(text, h.idx).line))],
    });
  }

  // ── 7. Invalid escape sequences ───────────────────────────────────────
  const validEsc = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
  const escHits: Array<{ idx: number; seq: string }> = [];
  {
    let inside = false;
    let i = 0;
    while (i < text.length) {
      if (text[i] === '"' && !inside) {
        inside = true;
        i++;
        continue;
      }
      if (inside) {
        if (text[i] === '"') {
          inside = false;
          i++;
          continue;
        }
        if (text[i] === '\\') {
          i++;
          if (i < text.length) {
            if (!validEsc.has(text[i])) {
              escHits.push({ idx: i - 1, seq: text[i] });
            } else if (text[i] === 'u') {
              const hex = text.slice(i + 1, i + 5);
              if (!/^[0-9A-Fa-f]{4}$/.test(hex)) {
                escHits.push({ idx: i - 1, seq: `u${hex}` });
              }
              i += 5;
              continue;
            }
          }
        }
      }
      i++;
    }
  }
  if (escHits.length > 0) {
    const pos = posFromIndex(text, escHits[0].idx);
    add({
      id: 'invalid_escape',
      category: 'invalid_escape',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Invalid Escape Sequence',
      icon: '🔴',
      message: `\\${escHits[0].seq} is not a valid JSON escape — allowed: \\" \\\\ \\/ \\b \\f \\n \\r \\t \\uXXXX`,
      explanation:
        'JSON string escape sequences are strictly limited to eight forms: `\\"`, `\\\\`, `\\/`, `\\b`, `\\f`, `\\n`, `\\r`, `\\t`, and `\\uXXXX` (4-hex-digit Unicode). Anything else — like `\\x41`, `\\p`, or `\\0` — is a syntax error. JavaScript supports more escapes, but JSON does not.',
      spec: 'RFC 8259 §7: Only specific escape sequences are allowed in JSON strings',
      howToFix: `Replace \\${escHits[0].seq} with a valid escape or encode the character as \\uXXXX.`,
      autoFixable: false,
      count: escHits.length,
      allLines: [...new Set(escHits.map((h) => posFromIndex(text, h.idx).line))],
    });
  }

  // ── 8. Leading zeros ─────────────────────────────────────────────────
  const lzRe = /:\s*(-?)0(\d)/g;
  const lzHits: number[] = [];
  while ((m = lzRe.exec(text)) !== null) {
    if (!inStr[m.index]) lzHits.push(m.index);
  }
  if (lzHits.length > 0) {
    const pos = posFromIndex(text, lzHits[0]);
    add({
      id: 'leading_zeros',
      category: 'leading_zeros',
      severity: 'warning',
      line: pos.line,
      col: pos.col,
      title: 'Leading Zeros in Numbers',
      icon: '0️⃣',
      message: 'Numbers with leading zeros (e.g. 007, 0123) are not valid JSON',
      explanation:
        'JSON disallows leading zeros in integer parts to avoid ambiguity with octal notation used in some languages. `007` must be written as `7`. The only valid leading zero is `0.5` (zero before a decimal point). Most parsers will either reject or silently strip leading zeros.',
      spec: 'RFC 8259 §6: Integer component must not begin with a leading zero unless it is 0 itself',
      howToFix: 'Remove leading zeros from all integer values.',
      autoFixable: true,
      snippet: '007  or  0123',
      fixedSnippet: '7  or  123',
      count: lzHits.length,
      allLines: [...new Set(lzHits.map((i) => posFromIndex(text, i).line))],
    });
  }

  // ── 9. Bracket matching ──────────────────────────────────────────────
  {
    const stack: Array<{ char: string; idx: number }> = [];
    let inside = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\\' && inside) {
        i++;
        continue;
      }
      if (text[i] === '"') {
        inside = !inside;
        continue;
      }
      if (inside) continue;

      if (text[i] === '{' || text[i] === '[') {
        stack.push({ char: text[i], idx: i });
      } else if (text[i] === '}' || text[i] === ']') {
        if (stack.length === 0) {
          const pos = posFromIndex(text, i);
          add({
            id: `extra_close_${i}`,
            category: 'mismatched_bracket',
            severity: 'critical',
            line: pos.line,
            col: pos.col,
            title: 'Unexpected Closing Bracket',
            icon: '🚫',
            message: `Unexpected '${text[i]}' at line ${pos.line}:${pos.col} — no matching opening bracket`,
            explanation: `A closing ${text[i] === '}' ? 'brace `}`' : 'bracket `]`'} was found with no corresponding opening bracket. This usually means an extra closing character was accidentally added, or an opening bracket was deleted while editing.`,
            spec: 'RFC 8259: Brackets must be properly opened before they are closed',
            howToFix: `Delete the extra '${text[i]}' at line ${pos.line} or add a matching opening bracket earlier.`,
            autoFixable: false,
          });
        } else {
          const top = stack[stack.length - 1];
          const expected = top.char === '{' ? '}' : ']';
          if (text[i] !== expected) {
            const pos = posFromIndex(text, i);
            const openPos = posFromIndex(text, top.idx);
            add({
              id: `mismatched_${i}`,
              category: 'mismatched_bracket',
              severity: 'critical',
              line: pos.line,
              col: pos.col,
              title: 'Mismatched Brackets',
              icon: '🔀',
              message: `'${text[i]}' at line ${pos.line} doesn't match '${top.char}' from line ${openPos.line}`,
              explanation: `The closing '${text[i]}' doesn't match the opening '${top.char}' started at line ${openPos.line}. Arrays use [ / ] and objects use { / }. Mixing them is always a bug — usually caused by editing a nested structure and losing track of bracket types.`,
              spec: 'RFC 8259: [ must be closed with ] and { must be closed with }',
              howToFix: `Change '${text[i]}' to '${expected}', or check if '${top.char}' at line ${openPos.line} should be a different bracket type.`,
              autoFixable: false,
            });
          } else {
            stack.pop();
          }
        }
      }
    }
    for (const { char, idx } of stack) {
      const pos = posFromIndex(text, idx);
      add({
        id: `unclosed_${idx}`,
        category: 'unclosed_bracket',
        severity: 'critical',
        line: pos.line,
        col: pos.col,
        title: 'Unclosed Bracket',
        icon: '📂',
        message: `'${char}' opened at line ${pos.line}:${pos.col} is never closed`,
        explanation: `Every opening bracket or brace must have a matching closer. This '${char}' opened at line ${pos.line} was never closed. This frequently happens with copy-pasted or truncated JSON, or when editing deeply nested structures and losing count of closing brackets needed.`,
        spec: 'RFC 8259: Every [ must have a ] and every { must have a }',
        howToFix: `Add a closing '${char === '{' ? '}' : ']'}' at the appropriate nesting level.`,
        autoFixable: true,
        snippet: `${char}...`,
        fixedSnippet: `${char}...${char === '{' ? '}' : ']'}`,
      });
    }
  }

  // ── 10. Control characters inside strings ────────────────────────────
  const ctrlRe = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
  const ctrlHits: number[] = [];
  while ((m = ctrlRe.exec(text)) !== null) {
    if (inStr[m.index]) ctrlHits.push(m.index);
  }
  if (ctrlHits.length > 0) {
    const pos = posFromIndex(text, ctrlHits[0]);
    add({
      id: 'control_char',
      category: 'control_char',
      severity: 'critical',
      line: pos.line,
      col: pos.col,
      title: 'Raw Control Character in String',
      icon: '🔋',
      message: `${ctrlHits.length} raw control character(s) inside a string — must be escaped as \\uXXXX`,
      explanation:
        'JSON strings cannot contain unescaped control characters (ASCII code < 0x20, except when escaped). These invisible characters (null, bell, escape, etc.) must be written as \\u0000 through \\u001F. They usually enter JSON from copy-pasting terminal output, log files, or binary data.',
      spec: 'RFC 8259 §7: Characters U+0000–U+001F must be escaped',
      howToFix: 'Replace each control character with its \\uXXXX Unicode escape (e.g. \\u0000 for null, \\u001B for escape).',
      autoFixable: false,
      count: ctrlHits.length,
      allLines: [...new Set(ctrlHits.map((i) => posFromIndex(text, i).line))],
    });
  }

  // ── 11. Duplicate keys ───────────────────────────────────────────────
  {
    const keyRe = /"((?:[^"\\]|\\.)*)"\s*:/g;
    const keyOccurrences = new Map<string, number[]>();
    while ((m = keyRe.exec(text)) !== null) {
      if (inStr[m.index]) continue;
      const key = m[1];
      if (!keyOccurrences.has(key)) keyOccurrences.set(key, []);
      keyOccurrences.get(key)!.push(posFromIndex(text, m.index).line);
    }
    for (const [key, lines] of keyOccurrences) {
      if (lines.length > 1) {
        add({
          id: `duplicate_key_${key}`,
          category: 'duplicate_key',
          severity: 'warning',
          line: lines[0],
          col: 1,
          title: 'Duplicate Object Key',
          icon: '🔁',
          message: `"${key}" appears ${lines.length}× — parsers silently keep only the last value`,
          explanation: `The key "${key}" is defined ${lines.length} times (lines ${lines.join(', ')}). The JSON spec says names "should" be unique but doesn't forbid duplicates. In practice every major parser silently discards all but the last value — a silent data loss bug that can be very hard to debug.`,
          spec: 'RFC 8259 §4: Keys "SHOULD" be unique (not MUST, but duplicates cause silent data loss)',
          howToFix: `Keep only one definition of "${key}". Decide which value you want and remove the others.`,
          autoFixable: false,
          allLines: lines,
        });
      }
    }
  }

  // ── 12. Plus sign on numbers ─────────────────────────────────────────
  const plusRe = /:\s*\+\d/g;
  const plusHits: number[] = [];
  while ((m = plusRe.exec(text)) !== null) {
    if (!inStr[m.index]) plusHits.push(m.index);
  }
  if (plusHits.length > 0) {
    const pos = posFromIndex(text, plusHits[0]);
    add({
      id: 'plus_number',
      category: 'plus_number',
      severity: 'warning',
      line: pos.line,
      col: pos.col,
      title: 'Positive Sign on Number',
      icon: '➕',
      message: '+N is not valid JSON — the plus sign on positive numbers must be omitted',
      explanation:
        'JSON numbers may begin with `-` but not `+`. A positive number is written without any sign prefix: just `42`, not `+42`. The plus sign is valid in many programming languages and calculators but is rejected by the JSON number grammar.',
      spec: 'RFC 8259 §6: number = [ minus ] int [ frac ] [ exp ]  — no plus sign',
      howToFix: 'Remove the leading `+` from positive numbers.',
      autoFixable: true,
      snippet: '+42',
      fixedSnippet: '42',
      count: plusHits.length,
      allLines: [...new Set(plusHits.map((i) => posFromIndex(text, i).line))],
    });
  }

  // ── Validity check ───────────────────────────────────────────────────
  let isValid = false;
  if (errors.filter((e) => e.severity === 'critical').length === 0) {
    try {
      JSON.parse(text);
      isValid = true;
    } catch {}
  }

  // If no specific error caught the problem, try JSON.parse and add a generic syntax error
  if (!isValid && errors.length === 0) {
    try {
      JSON.parse(text);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'JSON syntax error';
      const posMatch = msg.match(/position (\d+)/i);
      const lineColMatch = msg.match(/line (\d+) col(?:umn)? (\d+)/i);
      let line = 1;
      let col = 1;
      if (posMatch) {
        const p = posFromIndex(text, parseInt(posMatch[1], 10));
        line = p.line;
        col = p.col;
      } else if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        col = parseInt(lineColMatch[2], 10);
      }
      add({
        id: 'syntax_error',
        category: 'syntax',
        severity: 'critical',
        line,
        col,
        title: 'JSON Syntax Error',
        icon: '❌',
        message: msg,
        explanation:
          'The JSON parser encountered a character or token it did not expect. This catch-all error means the structure of the JSON does not conform to the specification at this position. Check the indicated line for misplaced characters, missing commas, or broken values.',
        spec: 'RFC 8259: JSON must be a valid serialized value',
        howToFix: 'Review the indicated line and column. Look for missing commas between elements, unmatched quotes, or unexpected characters.',
        autoFixable: false,
      });
    }
  }

  // ── Health score ─────────────────────────────────────────────────────
  const critCount = errors.filter((e) => e.severity === 'critical').length;
  const warnCount = errors.filter((e) => e.severity === 'warning').length;
  const healthScore = isValid
    ? 100
    : Math.max(0, 100 - critCount * 20 - warnCount * 5);

  const source = detectSource(text);
  return { errors, isValid, source, healthScore };
}

// ─────────────────────────────────────────────────────────────────────────────
// Source Detection
// ─────────────────────────────────────────────────────────────────────────────

function detectSource(text: string): SourceInfo | null {
  const hasPy = /\b(True|False|None)\b/.test(text);
  const hasJs = /\b(undefined|NaN|Infinity)\b/.test(text);
  const hasTC = /,\s*[}\]]/.test(text);
  const hasComments = /\/\/|\/\*/.test(text);
  const hasSQ = /(?<![\\])'/.test(text) && !/^"/.test(text.trim());
  const hasUQ =
    /(?:[{,])\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/.test(text) &&
    !/"[a-zA-Z_$][a-zA-Z0-9_$]*"\s*:/.test(text);

  if (hasPy)
    return {
      name: 'Python Dict (str())',
      icon: '🐍',
      tip: 'Use `json.dumps(obj)` instead of `str(obj)` to get valid JSON from Python.',
      confidence: 'high',
    };
  if (hasJs && hasTC)
    return {
      name: 'AI-Generated JSON',
      icon: '🤖',
      tip: 'AI models often produce trailing commas and JS-only values because they train on JavaScript code.',
      confidence: 'high',
    };
  if (hasTC && !hasUQ)
    return {
      name: 'AI Output or JSON5',
      icon: '🤖',
      tip: 'Trailing commas are the #1 AI JSON error. Add a JSON schema validator to your LLM output pipeline.',
      confidence: 'medium',
    };
  if (hasComments)
    return {
      name: 'Config File (JSONC/JSON5)',
      icon: '⚙️',
      tip: 'VS Code and TypeScript natively support JSONC (JSON with Comments). Standard parsers do not.',
      confidence: 'high',
    };
  if (hasSQ || hasUQ)
    return {
      name: 'JavaScript Object Literal',
      icon: '🟨',
      tip: 'Use `JSON.stringify(obj)` to convert a JS object to valid JSON.',
      confidence: hasSQ ? 'high' : 'medium',
    };
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-Fix Engine
// ─────────────────────────────────────────────────────────────────────────────

function autoFix(text: string, errors: JsonError[]): FixResult {
  let result = text;
  const applied: string[] = [];
  const has = (cat: ErrorCategory) => errors.some((e) => e.category === cat);

  if (result.startsWith('﻿')) {
    result = result.slice(1);
    applied.push('Removed UTF-8 BOM');
  }
  if (has('comment')) {
    result = result.replace(/\/\/[^\n]*/g, '');
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    applied.push('Stripped // and /* */ comments');
  }
  if (has('python_value')) {
    result = result.replace(/(?<!["\w])(True)(?!["\w])/g, 'true');
    result = result.replace(/(?<!["\w])(False)(?!["\w])/g, 'false');
    result = result.replace(/(?<!["\w])(None)(?!["\w])/g, 'null');
    applied.push('True→true, False→false, None→null');
  }
  if (has('invalid_value')) {
    result = result.replace(/:\s*undefined\b/g, ': null');
    result = result.replace(/:\s*NaN\b/g, ': null');
    result = result.replace(/:\s*-?Infinity\b/g, ': null');
    applied.push('undefined / NaN / Infinity → null');
  }
  if (has('single_quotes')) {
    result = result.replace(/'([^'\\]|\\.)*'/g, (match) => {
      const inner = match.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"');
      return `"${inner}"`;
    });
    applied.push("Single quotes → double quotes");
  }
  if (has('unquoted_key')) {
    result = result.replace(
      /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g,
      (full, before, key, after) => {
        const trimmedBefore = before.trimEnd();
        if (trimmedBefore.endsWith('"')) return full;
        return `${before}"${key}"${after}`;
      }
    );
    applied.push('Wrapped unquoted keys in double quotes');
  }
  if (has('trailing_comma')) {
    let prev = '';
    while (prev !== result) {
      prev = result;
      result = result.replace(/,(\s*[}\]])/g, '$1');
    }
    applied.push('Removed trailing commas');
  }
  if (has('leading_zeros')) {
    result = result.replace(/:\s*(-?)0+(\d)/g, ': $1$2');
    applied.push('Removed leading zeros from numbers');
  }
  if (has('plus_number')) {
    result = result.replace(/:\s*\+(\d)/g, ': $1');
    applied.push('Removed leading + from numbers');
  }

  // Close unclosed brackets
  const unclosed = errors.filter((e) => e.category === 'unclosed_bracket');
  if (unclosed.length > 0) {
    for (const err of unclosed) {
      result += err.snippet?.includes('{') ? '}' : ']';
    }
    applied.push(`Closed ${unclosed.length} unclosed bracket(s)`);
  }

  let isNowValid = false;
  try {
    const parsed = JSON.parse(result);
    result = JSON.stringify(parsed, null, 2);
    isNowValid = true;
    if (applied.length > 0) applied.push('Pretty-printed fixed JSON');
  } catch {}

  return { fixed: result, appliedFixes: applied, isNowValid };
}

// ─────────────────────────────────────────────────────────────────────────────
// Line Diff
// ─────────────────────────────────────────────────────────────────────────────

function buildLineDiff(a: string, b: string): DiffLine[] {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  // LCS table
  const m = Math.min(aLines.length, 200);
  const n = Math.min(bLines.length, 200);
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        aLines[i - 1] === bLines[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const result: DiffLine[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
      result.unshift({ type: 'same', text: aLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', text: bLines[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', text: aLines[i - 1] });
      i--;
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Helpers
// ─────────────────────────────────────────────────────────────────────────────

function cn(...cls: (string | false | undefined | null)[]): string {
  return cls.filter(Boolean).join(' ');
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string, label?: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success(label ?? 'Copied!', { duration: 1800 });
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);
  return { copied, copy };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: ErrorSeverity }) {
  const cfg = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
  }[severity];
  return (
    <span className={cn('text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border', cfg)}>
      {severity}
    </span>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const { copy, copied } = useCopy();
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-zinc-800 rounded-t-lg px-3 py-1.5">
        <span className="text-[11px] text-zinc-400 font-mono">{lang}</span>
        <button
          onClick={() => copy(code, 'Code copied!')}
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="bg-zinc-900 text-zinc-100 text-[11px] leading-relaxed font-mono p-3 rounded-b-lg overflow-x-auto whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  );
}

function ErrorCard({
  error,
  expanded,
  onToggle,
  onJumpToLine,
}: {
  error: JsonError;
  expanded: boolean;
  onToggle: () => void;
  onJumpToLine: (line: number) => void;
}) {
  const severityBorder = {
    critical: 'border-red-200 hover:border-red-300',
    warning: 'border-amber-200 hover:border-amber-300',
    info: 'border-blue-200 hover:border-blue-300',
  }[error.severity];

  const severityBg = {
    critical: 'bg-red-50/60',
    warning: 'bg-amber-50/60',
    info: 'bg-blue-50/60',
  }[error.severity];

  return (
    <div
      className={cn(
        'border rounded-xl overflow-hidden transition-all duration-200',
        severityBorder,
        expanded ? 'shadow-md' : 'shadow-sm'
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-start gap-3 px-3 py-3 text-left transition-colors',
          expanded ? severityBg : 'bg-white hover:bg-zinc-50/80'
        )}
      >
        <span className="text-lg shrink-0 mt-0.5">{error.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
            <span className="font-semibold text-sm text-zinc-900">{error.title}</span>
            <SeverityBadge severity={error.severity} />
            {error.autoFixable && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                auto-fix ✓
              </span>
            )}
            {error.count && error.count > 1 && (
              <span className="text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-200 px-1.5 py-0.5 rounded font-medium">
                ×{error.count}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{error.message}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onJumpToLine(error.line);
            }}
            className="text-[11px] font-mono text-emerald-600 hover:text-emerald-800 hover:underline px-1.5 py-0.5 rounded hover:bg-emerald-50 transition-colors"
          >
            L{error.line}
          </button>
          <ChevronDown
            className={cn('w-4 h-4 text-zinc-400 transition-transform duration-200', expanded && 'rotate-180')}
          />
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-zinc-100 px-4 py-4 space-y-4 bg-white">
          {/* Explanation */}
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> What happened
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">{error.explanation}</p>
          </div>

          {/* Spec */}
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" /> JSON Spec Reference
            </p>
            <p className="text-xs text-zinc-500 font-mono bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 leading-relaxed">
              {error.spec}
            </p>
          </div>

          {/* How to fix */}
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Wand2 className="w-3 h-3" /> How to fix
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">{error.howToFix}</p>
          </div>

          {/* Before / After */}
          {error.snippet && error.fixedSnippet && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[11px] font-bold text-red-500 uppercase tracking-wide mb-1">❌ Before</p>
                <pre className="text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2 overflow-x-auto font-mono text-red-800 whitespace-pre-wrap">
                  {error.snippet}
                </pre>
              </div>
              <div>
                <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide mb-1">✅ After</p>
                <pre className="text-xs bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 overflow-x-auto font-mono text-emerald-800 whitespace-pre-wrap">
                  {error.fixedSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* Lines affected */}
          {error.allLines && error.allLines.length > 1 && (
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">All occurrences</p>
              <div className="flex flex-wrap gap-1.5">
                {error.allLines.map((ln) => (
                  <button
                    key={ln}
                    onClick={() => onJumpToLine(ln)}
                    className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 hover:bg-emerald-100 transition-colors"
                  >
                    Line {ln}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Code examples */}
          {error.codeJS && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Code2 className="w-3 h-3" /> Code examples
              </p>
              <CodeBlock code={error.codeJS} lang="JavaScript" />
              {error.codePython && <CodeBlock code={error.codePython} lang="Python" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HealthBar({ score }: { score: number }) {
  const color =
    score === 100
      ? 'bg-emerald-500'
      : score >= 60
      ? 'bg-amber-500'
      : 'bg-red-500';
  const label = score === 100 ? 'Perfect' : score >= 80 ? 'Good' : score >= 50 ? 'Poor' : 'Critical';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn('text-xs font-bold', score === 100 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600')}>
        {score}/100 {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Tool Component
// ─────────────────────────────────────────────────────────────────────────────

export default function JsonErrorExplainerClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [fixResult, setFixResult] = useState<FixResult | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [filterSeverity, setFilterSeverity] = useState<ErrorSeverity | 'all'>('all');
  const [activeOutputTab, setActiveOutputTab] = useState<'fixed' | 'diff'>('fixed');
  const [showExamples, setShowExamples] = useState(false);
  const [showFixPanel, setShowFixPanel] = useState(false);
  const [analysed, setAnalysed] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Sync gutter scroll with textarea scroll
  const handleEditorScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const lines = useMemo(() => input.split('\n'), [input]);

  const errorLineSet = useMemo(() => {
    const s = new Set<number>();
    if (result) {
      for (const e of result.errors) {
        if (e.severity === 'critical') s.add(e.line);
        for (const l of e.allLines ?? []) s.add(l);
      }
    }
    return s;
  }, [result]);

  const warningLineSet = useMemo(() => {
    const s = new Set<number>();
    if (result) {
      for (const e of result.errors) {
        if (e.severity === 'warning') s.add(e.line);
      }
    }
    return s;
  }, [result]);

  const analyse = useCallback(() => {
    const r = detectAllErrors(input);
    setResult(r);
    setFixResult(null);
    setShowFixPanel(false);
    setAnalysed(true);
    if (r.errors.length > 0) {
      setExpandedIds(new Set([r.errors[0].id]));
    } else {
      setExpandedIds(new Set());
    }
  }, [input]);

  // Auto-analyse with debounce
  useEffect(() => {
    if (!input.trim()) {
      setResult(null);
      setFixResult(null);
      setAnalysed(false);
      return;
    }
    const t = setTimeout(analyse, 400);
    return () => clearTimeout(t);
  }, [input, analyse]);

  const handleFix = useCallback(() => {
    if (!result) return;
    const fr = autoFix(input, result.errors);
    setFixResult(fr);
    setShowFixPanel(true);
    setActiveOutputTab('fixed');
    if (fr.isNowValid) toast.success('JSON fixed and validated! ✓');
    else toast('Applied fixes — manual review may still be needed.', { icon: '⚠️' });
  }, [input, result]);

  const applyFixed = useCallback(() => {
    if (!fixResult) return;
    setInput(fixResult.fixed);
    setFixResult(null);
    setShowFixPanel(false);
    toast.success('Fixed JSON applied to editor');
  }, [fixResult]);

  const jumpToLine = useCallback((line: number) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const lns = ta.value.split('\n');
    let offset = 0;
    for (let i = 0; i < line - 1 && i < lns.length; i++) offset += lns[i].length + 1;
    ta.focus();
    ta.setSelectionRange(offset, offset + (lns[line - 1]?.length ?? 0));
    // Scroll into view
    const lineH = 24; // px per line
    ta.scrollTop = Math.max(0, (line - 5) * lineH);
    if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop;
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // Tab → insert 2 spaces
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
        setInput(newVal);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
      // Ctrl/Cmd+Enter → analyse
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyse();
      }
    },
    [analyse]
  );

  const filteredErrors = useMemo(() => {
    if (!result) return [];
    return filterSeverity === 'all'
      ? result.errors
      : result.errors.filter((e) => e.severity === filterSeverity);
  }, [result, filterSeverity]);

  const autoFixableCount = useMemo(
    () => (result ? result.errors.filter((e) => e.autoFixable).length : 0),
    [result]
  );

  const { copy: copyFixed, copied: copiedFixed } = useCopy();

  const diffLines = useMemo(() => {
    if (!fixResult || !showFixPanel) return [];
    return buildLineDiff(input, fixResult.fixed);
  }, [fixResult, showFixPanel, input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="w-px h-5 bg-zinc-200" />
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-zinc-900 text-base leading-tight">AI JSON Error Explainer</h1>
                <span className="text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0">
                  Smart
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Detects every error · Deep explanations · One-click fix · 100% client-side
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowExamples((s) => !s)}
              className="text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> Examples
            </button>
          </div>
        </div>
      </div>

      {/* Examples drawer */}
      {showExamples && (
        <div className="border-b border-zinc-200 bg-white shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Load Example</p>
              <button onClick={() => setShowExamples(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => {
                    setInput(ex.json.trim());
                    setShowExamples(false);
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-200 hover:border-violet-300 hover:bg-violet-50 px-3 py-3 transition-all text-center group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{ex.icon}</span>
                  <span className="text-[11px] font-medium text-zinc-600 group-hover:text-violet-700 leading-tight">
                    {ex.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Source detection banner */}
        {result?.source && (
          <div className="flex items-start gap-3 rounded-xl bg-violet-50 border border-violet-200 px-4 py-3">
            <span className="text-2xl shrink-0">{result.source.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-violet-900">Source detected: {result.source.name}</span>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border',
                    result.source.confidence === 'high'
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-amber-100 text-amber-700 border-amber-200'
                  )}
                >
                  {result.source.confidence} confidence
                </span>
              </div>
              <p className="text-xs text-violet-700 mt-0.5 leading-relaxed">{result.source.tip}</p>
            </div>
          </div>
        )}

        {/* Stats bar */}
        {result && analysed && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Critical',
                count: result.errors.filter((e) => e.severity === 'critical').length,
                color: 'text-red-600 bg-red-50 border-red-200',
                icon: <AlertCircle className="w-4 h-4" />,
              },
              {
                label: 'Warnings',
                count: result.errors.filter((e) => e.severity === 'warning').length,
                color: 'text-amber-600 bg-amber-50 border-amber-200',
                icon: <AlertTriangle className="w-4 h-4" />,
              },
              {
                label: 'Auto-fixable',
                count: autoFixableCount,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                icon: <Wand2 className="w-4 h-4" />,
              },
              {
                label: result.isValid ? 'Valid JSON ✓' : 'Not Valid',
                count: null,
                color: result.isValid
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-red-700 bg-red-50 border-red-200',
                icon: result.isValid ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />,
              },
            ].map(({ label, count, color, icon }) => (
              <div key={label} className={cn('rounded-xl border px-4 py-3 flex items-center gap-3', color)}>
                {icon}
                <div>
                  <p className="text-lg font-bold leading-tight">{count !== null ? count : ''}</p>
                  <p className="text-[11px] font-medium leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4">
          {/* ── Left: Editor ────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">JSON Input</span>
                <kbd className="text-[10px] text-zinc-400 border border-zinc-200 rounded px-1.5 py-0.5 font-mono hidden sm:inline">
                  Ctrl+Enter
                </kbd>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">to analyse</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">
                  {lines.length} line{lines.length !== 1 ? 's' : ''}
                </span>
                {input && (
                  <button
                    onClick={() => {
                      setInput('');
                      setResult(null);
                      setFixResult(null);
                      setAnalysed(false);
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 border border-zinc-200 hover:border-zinc-300 rounded-lg px-2 py-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Code editor */}
            <div className="rounded-2xl overflow-hidden border border-zinc-300 shadow-lg">
              <div className="flex h-[420px] sm:h-[500px]">
                {/* Gutter */}
                <div
                  ref={gutterRef}
                  className="w-12 bg-zinc-800 text-zinc-500 text-right text-[11px] leading-6 select-none overflow-hidden flex-shrink-0 font-mono pt-4 pb-4"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {lines.map((_, i) => {
                    const ln = i + 1;
                    const isErr = errorLineSet.has(ln);
                    const isWarn = warningLineSet.has(ln);
                    return (
                      <div
                        key={i}
                        className={cn(
                          'h-6 flex items-center justify-end pr-2 transition-colors',
                          isErr ? 'text-red-400' : isWarn ? 'text-amber-400' : 'text-zinc-600'
                        )}
                      >
                        {isErr ? '●' : isWarn ? '◐' : ln}
                      </div>
                    );
                  })}
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onScroll={handleEditorScroll}
                  onKeyDown={handleKeyDown}
                  placeholder={`Paste your JSON here… or load an example above.\n\nThis tool detects ALL errors at once — trailing commas, single quotes,\npython values (True/False/None), invalid escapes, duplicate keys, and more.\n\nCtrl+Enter to analyse manually.`}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="flex-1 bg-zinc-900 text-zinc-100 font-mono text-[13px] leading-6 resize-none outline-none px-4 py-4 placeholder:text-zinc-600 overflow-auto"
                />
              </div>

              {/* Editor footer */}
              <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                  <span>{input.length.toLocaleString()} chars</span>
                  {result && (
                    <>
                      <span className="text-zinc-600">·</span>
                      {result.isValid ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid JSON
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold flex items-center gap-1">
                          <X className="w-3 h-3" /> {result.errors.length} error{result.errors.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {!input && (
                  <span className="text-[11px] text-zinc-500">JSON analysed as you type</span>
                )}
              </div>
            </div>

            {/* Health bar */}
            {result && analysed && (
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-500">JSON Health Score</span>
                </div>
                <HealthBar score={result.healthScore} />
              </div>
            )}

            {/* Fix output panel */}
            {showFixPanel && fixResult && (
              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-md">
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-violet-600" />
                    <span className="font-semibold text-sm text-zinc-900">Fixed Output</span>
                    {fixResult.isNowValid && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5 font-bold uppercase">
                        Valid ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-xs">
                      {(['fixed', 'diff'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveOutputTab(tab)}
                          className={cn(
                            'px-3 py-1.5 font-medium capitalize transition-colors',
                            activeOutputTab === tab
                              ? 'bg-zinc-900 text-white'
                              : 'bg-white text-zinc-600 hover:bg-zinc-50'
                          )}
                        >
                          {tab === 'diff' ? '± Diff' : 'Fixed'}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => copyFixed(fixResult.fixed, 'Fixed JSON copied!')}
                      className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 rounded-lg px-2.5 py-1.5 transition-colors"
                    >
                      {copiedFixed ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy
                    </button>
                    <button
                      onClick={applyFixed}
                      className="flex items-center gap-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-2.5 py-1.5 transition-colors font-medium"
                    >
                      Apply to editor
                    </button>
                  </div>
                </div>

                {/* Applied fixes list */}
                {fixResult.appliedFixes.length > 0 && (
                  <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 flex flex-wrap gap-2">
                    {fixResult.appliedFixes.map((fix, i) => (
                      <span key={i} className="text-[11px] text-zinc-600 bg-white border border-zinc-200 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-emerald-500" /> {fix}
                      </span>
                    ))}
                  </div>
                )}

                {/* Fixed JSON or Diff */}
                {activeOutputTab === 'fixed' ? (
                  <pre className="text-[12px] font-mono text-zinc-800 leading-relaxed p-4 max-h-[350px] overflow-auto whitespace-pre-wrap break-words bg-white">
                    {fixResult.fixed}
                  </pre>
                ) : (
                  <div className="font-mono text-[11px] leading-6 max-h-[350px] overflow-auto bg-white p-4">
                    {diffLines.map((dl, i) => (
                      <div
                        key={i}
                        className={cn(
                          'px-2 rounded whitespace-pre-wrap break-words',
                          dl.type === 'removed' && 'bg-red-50 text-red-700 line-through opacity-70',
                          dl.type === 'added' && 'bg-emerald-50 text-emerald-800',
                          dl.type === 'same' && 'text-zinc-500'
                        )}
                      >
                        <span className="select-none mr-2 text-[10px] opacity-60">
                          {dl.type === 'removed' ? '−' : dl.type === 'added' ? '+' : ' '}
                        </span>
                        {dl.text || ' '}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right: Analysis Panel ────────────────────────────── */}
          <div className="flex flex-col gap-3">
            {/* Analysis header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Error Analysis
                {result && result.errors.length > 0 && (
                  <span className="ml-2 text-zinc-400 font-normal normal-case tracking-normal">
                    {result.errors.length} issue{result.errors.length !== 1 ? 's' : ''}
                  </span>
                )}
              </span>

              {/* Filter tabs */}
              {result && result.errors.length > 0 && (
                <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-[11px]">
                  {([['all', 'All'], ['critical', '🔴 Critical'], ['warning', '🟡 Warn']] as const).map(
                    ([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setFilterSeverity(val)}
                        className={cn(
                          'px-2.5 py-1.5 font-medium transition-colors',
                          filterSeverity === val
                            ? 'bg-zinc-900 text-white'
                            : 'bg-white text-zinc-600 hover:bg-zinc-50'
                        )}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Error list */}
            <div
              className={cn(
                'flex flex-col gap-2 overflow-y-auto',
                fixResult && showFixPanel ? 'max-h-[320px]' : 'max-h-[600px]'
              )}
            >
              {!input.trim() && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 py-16 px-6 text-center">
                  <span className="text-5xl mb-4">🔍</span>
                  <p className="font-semibold text-zinc-700 mb-1">Paste JSON to begin</p>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-[260px]">
                    Every error is detected instantly as you type — trailing commas, wrong quotes, Python values, and more.
                  </p>
                  <button
                    onClick={() => setShowExamples(true)}
                    className="mt-4 text-xs text-violet-600 hover:text-violet-800 border border-violet-200 hover:border-violet-300 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Load an example →
                  </button>
                </div>
              )}

              {result?.isValid && input.trim() && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-emerald-200 bg-emerald-50 py-12 px-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                  <p className="font-bold text-emerald-800 text-lg mb-1">Perfect JSON!</p>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    No errors detected. Your JSON is fully valid and RFC 8259-compliant.
                  </p>
                  <div className="mt-3 bg-white border border-emerald-200 rounded-xl px-4 py-2 text-xs text-emerald-700 font-mono">
                    JSON.parse() ✓ &nbsp;·&nbsp; RFC 8259 compliant ✓
                  </div>
                </div>
              )}

              {result && !result.isValid && filteredErrors.length === 0 && filterSeverity !== 'all' && (
                <div className="text-center py-8 text-sm text-zinc-400">
                  No {filterSeverity} errors
                </div>
              )}

              {filteredErrors.map((error) => (
                <ErrorCard
                  key={error.id}
                  error={error}
                  expanded={expandedIds.has(error.id)}
                  onToggle={() =>
                    setExpandedIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(error.id)) next.delete(error.id);
                      else next.add(error.id);
                      return next;
                    })
                  }
                  onJumpToLine={jumpToLine}
                />
              ))}
            </div>

            {/* Fix All CTA */}
            {result && !result.isValid && autoFixableCount > 0 && (
              <div className="mt-auto pt-2">
                <button
                  onClick={handleFix}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-3.5 px-4 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <Wand2 className="w-4 h-4" />
                  Fix {autoFixableCount} auto-fixable error{autoFixableCount !== 1 ? 's' : ''}
                  <span className="ml-1 bg-white/20 rounded-lg px-2 py-0.5 text-xs font-bold">
                    {result.errors.filter((e) => !e.autoFixable).length > 0
                      ? `${result.errors.filter((e) => !e.autoFixable).length} need manual review`
                      : 'all fixed'}
                  </span>
                </button>
                {result.errors.some((e) => !e.autoFixable) && (
                  <p className="text-center text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                    {result.errors.filter((e) => !e.autoFixable).length} error(s) require manual fixing
                    (invalid escapes, mismatched brackets, duplicate keys)
                  </p>
                )}
              </div>
            )}

            {/* Expand/collapse all */}
            {filteredErrors.length > 1 && (
              <div className="flex items-center justify-center gap-4 text-xs text-zinc-400">
                <button
                  onClick={() => setExpandedIds(new Set(filteredErrors.map((e) => e.id)))}
                  className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Expand all
                </button>
                <span>·</span>
                <button
                  onClick={() => setExpandedIds(new Set())}
                  className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Collapse all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* What we detect */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6">
          <h2 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-600" />
            What this tool detects
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            {[
              { icon: '⚠️', name: 'Trailing Commas', badge: 'auto-fix' },
              { icon: '🐍', name: 'Python Values (True/None)', badge: 'auto-fix' },
              { icon: '🟡', name: 'JS Values (NaN/undefined)', badge: 'auto-fix' },
              { icon: '💬', name: 'Comments (// and /* */)', badge: 'auto-fix' },
              { icon: '🔤', name: 'Single-Quoted Strings', badge: 'auto-fix' },
              { icon: '🔑', name: 'Unquoted Keys', badge: 'auto-fix' },
              { icon: '0️⃣', name: 'Leading Zeros', badge: 'auto-fix' },
              { icon: '➕', name: 'Plus-signed Numbers', badge: 'auto-fix' },
              { icon: '📂', name: 'Unclosed Brackets', badge: 'auto-fix' },
              { icon: '🔀', name: 'Mismatched Brackets', badge: 'manual' },
              { icon: '🔁', name: 'Duplicate Keys', badge: 'manual' },
              { icon: '🔴', name: 'Invalid Escape Sequences', badge: 'manual' },
              { icon: '🔋', name: 'Raw Control Characters', badge: 'manual' },
              { icon: '⚡', name: 'UTF-8 BOM', badge: 'auto-fix' },
            ].map(({ icon, name, badge }) => (
              <div key={name} className="flex items-center gap-2 text-xs text-zinc-600">
                <span className="text-base shrink-0">{icon}</span>
                <span className="min-w-0 truncate">{name}</span>
                <span
                  className={cn(
                    'shrink-0 text-[9px] uppercase font-bold px-1 py-0.5 rounded',
                    badge === 'auto-fix'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-zinc-100 text-zinc-500'
                  )}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related tools */}
        <div className="pb-6">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Related Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['/json-beautifier', '✨ JSON Beautifier'],
              ['/json-fixer-online', '🔧 JSON Fixer'],
              ['/json-comparator', '🔀 JSON Comparator'],
              ['/json-schema-generation', '📐 Schema Generator'],
              ['/json-stringify-online', '📦 JSON.stringify()'],
              ['/json-to-typescript', '🔷 JSON to TypeScript'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-emerald-700 hover:text-emerald-900 border border-emerald-200 hover:border-emerald-300 rounded-lg px-3 py-1.5 hover:bg-emerald-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
