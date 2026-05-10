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
  Sparkles,
  Shield,
  GitCompare,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ErrorSeverity = 'critical' | 'warning' | 'info';

type ErrorCategory =
  | 'trailing_comma' | 'single_quotes' | 'unquoted_key' | 'invalid_value'
  | 'unclosed_bracket' | 'comment' | 'duplicate_key' | 'invalid_escape'
  | 'control_char' | 'leading_zeros' | 'python_value' | 'extra_data'
  | 'mismatched_bracket' | 'bom' | 'empty' | 'plus_number' | 'syntax';

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
  name: string; icon: string; tip: string; confidence: 'high' | 'medium' | 'low';
}

interface DetectionResult {
  errors: JsonError[]; isValid: boolean; source: SourceInfo | null; healthScore: number;
}

interface FixResult {
  fixed: string; appliedFixes: string[]; isNowValid: boolean;
}

type DiffLine = { type: 'same' | 'removed' | 'added'; text: string };

// ─────────────────────────────────────────────────────────────────────────────
// Examples
// ─────────────────────────────────────────────────────────────────────────────

const EXAMPLES: { name: string; icon: string; desc: string; json: string }[] = [
  {
    name: 'AI Output',
    icon: '🤖',
    desc: 'Trailing commas + JS values',
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
    desc: 'True / False / None literals',
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
    desc: 'Unquoted keys + single quotes',
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
    desc: 'Comments + leading zeros',
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
    desc: '6 different error types',
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
    desc: 'Missing closing brackets',
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
    desc: 'Wrong bracket type used',
    json: `{
  "items": [1, 2, 3},
  "count": 3
]`,
  },
  {
    name: 'Duplicates',
    icon: '🔁',
    desc: 'Duplicate keys (silent loss)',
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
  let line = 1, col = 1;
  for (let i = 0; i < idx && i < text.length; i++) {
    if (text[i] === '\n') { line++; col = 1; } else col++;
  }
  return { line, col };
}

function buildStringMap(text: string): boolean[] {
  const map: boolean[] = new Array(text.length).fill(false);
  let inStr = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\\' && inStr) { map[i] = true; if (i + 1 < text.length) map[i + 1] = true; i++; continue; }
    if (text[i] === '"') { inStr = !inStr; continue; }
    if (inStr) map[i] = true;
  }
  return map;
}

// ─────────────────────────────────────────────────────────────────────────────
// Error Detection Engine
// ─────────────────────────────────────────────────────────────────────────────

function detectAllErrors(text: string): DetectionResult {
  if (!text.trim()) return { errors: [], isValid: false, source: null, healthScore: 0 };

  const errors: JsonError[] = [];
  const seenIds = new Set<string>();
  const add = (e: JsonError) => { if (!seenIds.has(e.id)) { seenIds.add(e.id); errors.push(e); } };
  const inStr = buildStringMap(text);

  // 0. BOM
  if (text.startsWith('﻿')) {
    add({ id: 'bom', category: 'bom', severity: 'critical', line: 1, col: 1, title: 'BOM Character', icon: '⚡',
      message: 'File starts with a UTF-8 Byte Order Mark — all parsers reject this',
      explanation: 'A BOM (\\uFEFF) is an invisible Unicode character placed at the start of some UTF-8 files to signal encoding. JSON parsers treat it as an unexpected character and immediately fail. This often happens when saving JSON from Windows Notepad or certain editors.',
      spec: 'RFC 8259 §8.1: JSON must not begin with a BOM',
      howToFix: 'Save the file as "UTF-8 without BOM". In VS Code: bottom-right → click "UTF-8 with BOM" → "Save with Encoding" → "UTF-8".',
      autoFixable: true, fixedSnippet: '(BOM stripped from start)' });
  }

  // 1. Python values
  const pyRe = /\b(True|False|None)\b/g;
  let m: RegExpExecArray | null;
  const pyHits: Array<{ idx: number; val: string }> = [];
  while ((m = pyRe.exec(text)) !== null) { if (!inStr[m.index]) pyHits.push({ idx: m.index, val: m[1] }); }
  if (pyHits.length > 0) {
    const vals = [...new Set(pyHits.map(h => h.val))];
    const pos = posFromIndex(text, pyHits[0].idx);
    add({ id: 'python_value', category: 'python_value', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Python Boolean / None Values', icon: '🐍',
      message: `Found Python-style literals: ${vals.join(', ')} — JSON requires lowercase`,
      explanation: 'JSON literals must be lowercase: `true`, `false`, `null`. Python capitalises them as `True`, `False`, `None`. This JSON was almost certainly produced by Python\'s `str(obj)` instead of `json.dumps(obj)`. Every standard JSON parser rejects the capitalised forms.',
      spec: 'RFC 8259 §3: Literal names are true, false, null — case-sensitive',
      howToFix: 'In Python use `json.dumps(obj)` instead of `str(obj)`. Or replace True→true, False→false, None→null globally.',
      autoFixable: true, snippet: vals.join(', '),
      fixedSnippet: vals.map(v => v === 'True' ? 'true' : v === 'False' ? 'false' : 'null').join(', '),
      codeJS: `// JS already uses lowercase:\nconst obj = { flag: true, data: null };\nconst json = JSON.stringify(obj); // ✓`,
      codePython: `import json\n\n# ❌ Wrong — produces True/False/None\nbad = str(my_dict)\n\n# ✓ Right — produces true/false/null\ngood = json.dumps(my_dict)`,
      count: pyHits.length, allLines: [...new Set(pyHits.map(h => posFromIndex(text, h.idx).line))] });
  }

  // 2. JS-only values
  const jsValRe = /\b(undefined|NaN|Infinity|-Infinity)\b/g;
  const jsHits: Array<{ idx: number; val: string }> = [];
  while ((m = jsValRe.exec(text)) !== null) { if (!inStr[m.index]) jsHits.push({ idx: m.index, val: m[1] }); }
  if (jsHits.length > 0) {
    const vals = [...new Set(jsHits.map(h => h.val))];
    const pos = posFromIndex(text, jsHits[0].idx);
    add({ id: 'invalid_value', category: 'invalid_value', severity: 'critical', line: pos.line, col: pos.col,
      title: 'JavaScript-Only Values', icon: '🟡',
      message: `Found JS-only values: ${vals.join(', ')} — these do not exist in JSON`,
      explanation: '`undefined`, `NaN`, and `Infinity` are JavaScript primitives with no JSON equivalent. JSON only allows: string, number, object, array, `true`, `false`, and `null`. Auto-fix replaces them all with `null`. This is extremely common in AI-generated JSON.',
      spec: 'RFC 8259 §5–7: Valid JSON values are object, array, number, string, true, false, null',
      howToFix: 'Replace with `null` or a valid fallback. In JavaScript, `JSON.stringify()` automatically omits `undefined` keys and converts `NaN`/`Infinity` to `null`.',
      autoFixable: true, snippet: vals.join(', '), fixedSnippet: 'null (all replaced)',
      codeJS: `const obj = { a: undefined, b: NaN, c: Infinity };\nconst json = JSON.stringify(obj);\n// → {"b":null,"c":null}  (undefined keys are omitted)`,
      codePython: `import json, math\nobj = {"a": float('nan'), "b": float('inf')}\nfor k, v in obj.items():\n    if isinstance(v, float) and not math.isfinite(v):\n        obj[k] = None\njson.dumps(obj)  # ✓`,
      count: jsHits.length, allLines: [...new Set(jsHits.map(h => posFromIndex(text, h.idx).line))] });
  }

  // 3. Comments
  const lcRe = /\/\/[^\n]*/g, bcRe = /\/\*[\s\S]*?\*\//g;
  const commentHits: number[] = [];
  while ((m = lcRe.exec(text)) !== null) { if (!inStr[m.index]) commentHits.push(m.index); }
  while ((m = bcRe.exec(text)) !== null) { if (!inStr[m.index]) commentHits.push(m.index); }
  if (commentHits.length > 0) {
    const pos = posFromIndex(text, commentHits[0]);
    add({ id: 'comment', category: 'comment', severity: 'critical', line: pos.line, col: pos.col,
      title: 'JavaScript-Style Comments', icon: '💬',
      message: `${commentHits.length} comment(s) found — JSON has no comment syntax`,
      explanation: 'Standard JSON (RFC 8259) does not support comments of any kind. This is intentional: JSON is a pure data format, not a configuration language. If your JSON looks like a config file with comments, consider using JSONC or JSON5 which do support comments.',
      spec: 'RFC 8259 §2: JSON has no comment syntax whatsoever',
      howToFix: 'Remove all comments before parsing. For config files use JSONC (VS Code support natively) or JSON5.',
      autoFixable: true,
      codeJS: `const stripped = text\n  .replace(/\\/\\/[^\\n]*/g, '')\n  .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');\nconst parsed = JSON.parse(stripped);`,
      codePython: `import re, json\nstripped = re.sub(r'//[^\\n]*', '', text)\nstripped = re.sub(r'/\\*[\\s\\S]*?\\*/', '', stripped)\nparsed = json.loads(stripped)`,
      count: commentHits.length, allLines: [...new Set(commentHits.map(i => posFromIndex(text, i).line))] });
  }

  // 4. Trailing commas
  const tcRe = /,(\s*[}\]])/g;
  const tcHits: number[] = [];
  while ((m = tcRe.exec(text)) !== null) { if (!inStr[m.index]) tcHits.push(m.index); }
  if (tcHits.length > 0) {
    const pos = posFromIndex(text, tcHits[0]);
    add({ id: 'trailing_comma', category: 'trailing_comma', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Trailing Comma', icon: '⚠️',
      message: `${tcHits.length} trailing comma${tcHits.length > 1 ? 's' : ''} — comma after the last element is forbidden`,
      explanation: 'A trailing comma appears after the last element in an array `[1,2,]` or object `{"a":1,}`. JSON strictly forbids this. While ES2017+ JavaScript and JSON5 allow trailing commas, every standard JSON parser rejects them. The #1 most common error in AI-generated JSON.',
      spec: 'RFC 8259 §4–5: No trailing comma allowed before ] or }',
      howToFix: 'Remove the comma immediately before each closing `]` or `}`. Search your editor for `,]` and `,}`.',
      autoFixable: true, snippet: '[1, 2, 3,]  or  {"a":1,}', fixedSnippet: '[1, 2, 3]  or  {"a":1}',
      codeJS: `JSON.parse('{"a":1,}')  // ❌ SyntaxError\n\nconst fixed = text.replace(/,(?=\\s*[}\\]])/g, '');\nJSON.parse(fixed); // ✓`,
      codePython: `import re, json\nfixed = re.sub(r',(?=\\s*[}\\]])', '', text)\nparsed = json.loads(fixed)  # ✓`,
      count: tcHits.length, allLines: [...new Set(tcHits.map(i => posFromIndex(text, i).line))] });
  }

  // 5. Single-quoted strings
  let sqCount = 0; const sqLines: number[] = []; let firstSqIdx: number | null = null;
  { let inside = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\\' && inside) { i++; continue; }
      if (text[i] === '"') { inside = !inside; continue; }
      if (text[i] === "'" && !inside) {
        sqCount++; if (firstSqIdx === null) firstSqIdx = i;
        const ln = posFromIndex(text, i).line; if (!sqLines.includes(ln)) sqLines.push(ln);
      }
    }
  }
  if (sqCount > 0 && firstSqIdx !== null) {
    const pos = posFromIndex(text, firstSqIdx);
    add({ id: 'single_quotes', category: 'single_quotes', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Single-Quoted Strings', icon: '🔤',
      message: `${sqCount} single quote(s) found — JSON mandates double quotes for all strings`,
      explanation: 'JSON requires all strings — both keys and values — to be enclosed in double quotes. Single quotes are valid JavaScript and Python but are explicitly rejected by the JSON specification. The most frequent error when copy-pasting JavaScript object literals into a JSON context.',
      spec: 'RFC 8259 §7: A string begins and ends with a quotation mark (U+0022, the double-quote character)',
      howToFix: 'Replace all single-quoted strings with double quotes. Escape any literal double quotes inside as `\\"`.',
      autoFixable: true, snippet: "{'key': 'value'}", fixedSnippet: '{"key": "value"}',
      codeJS: `JSON.parse("{'key': 'val'}")  // ❌ SyntaxError\nJSON.parse('{"key": "val"}') // ✓`,
      codePython: `import json\njson.loads("{'k':'v'}")  # ❌ JSONDecodeError\njson.dumps({'k': 'v'})    # ✓ — always double-quotes`,
      count: sqCount, allLines: sqLines });
  }

  // 6. Unquoted keys
  const ukRe = /(?:[{,])\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g;
  const ukHits: Array<{ idx: number; key: string }> = [];
  while ((m = ukRe.exec(text)) !== null) {
    if (inStr[m.index]) continue;
    const keyStart = text.indexOf(m[1], m.index);
    if (keyStart > 0 && text[keyStart - 1] === '"') continue;
    ukHits.push({ idx: m.index, key: m[1] });
  }
  if (ukHits.length > 0) {
    const pos = posFromIndex(text, ukHits[0].idx);
    add({ id: 'unquoted_key', category: 'unquoted_key', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Unquoted Object Keys', icon: '🔑',
      message: `Key "${ukHits[0].key}" is unquoted — all JSON keys must be double-quoted strings`,
      explanation: 'In JavaScript you can write `{ name: "Alice" }` with an unquoted key. JSON is stricter: every key must be a double-quoted string `{ "name": "Alice" }`. This trips up everyone who writes JavaScript object literals and tries to use them directly as JSON.',
      spec: 'RFC 8259 §4: Object members consist of a string (the name) followed by a colon',
      howToFix: 'Wrap each unquoted key in double quotes.',
      autoFixable: true, snippet: `{${ukHits[0].key}: "value"}`, fixedSnippet: `{"${ukHits[0].key}": "value"}`,
      codeJS: `const obj = { name: "Alice" };\nconst json = JSON.stringify(obj); // → '{"name":"Alice"}' ✓`,
      codePython: `import json\nobj = {'name': 'Alice'}\njson.dumps(obj)  # → '{"name": "Alice"}' ✓`,
      count: ukHits.length, allLines: [...new Set(ukHits.map(h => posFromIndex(text, h.idx).line))] });
  }

  // 7. Invalid escape sequences
  const validEsc = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
  const escHits: Array<{ idx: number; seq: string }> = [];
  { let inside = false, i = 0;
    while (i < text.length) {
      if (text[i] === '"' && !inside) { inside = true; i++; continue; }
      if (inside) {
        if (text[i] === '"') { inside = false; i++; continue; }
        if (text[i] === '\\') {
          i++;
          if (i < text.length) {
            if (!validEsc.has(text[i])) escHits.push({ idx: i - 1, seq: text[i] });
            else if (text[i] === 'u') {
              const hex = text.slice(i + 1, i + 5);
              if (!/^[0-9A-Fa-f]{4}$/.test(hex)) escHits.push({ idx: i - 1, seq: `u${hex}` });
              i += 5; continue;
            }
          }
        }
      }
      i++;
    }
  }
  if (escHits.length > 0) {
    const pos = posFromIndex(text, escHits[0].idx);
    add({ id: 'invalid_escape', category: 'invalid_escape', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Invalid Escape Sequence', icon: '🔴',
      message: `\\${escHits[0].seq} is not a valid JSON escape — allowed: \\" \\\\ \\/ \\b \\f \\n \\r \\t \\uXXXX`,
      explanation: 'JSON string escape sequences are strictly limited to eight forms. Anything else — like `\\x41`, `\\p`, or `\\0` — is a syntax error. JavaScript supports more escapes, but JSON does not.',
      spec: 'RFC 8259 §7: Only specific escape sequences are allowed in JSON strings',
      howToFix: `Replace \\${escHits[0].seq} with a valid escape or encode the character as \\uXXXX.`,
      autoFixable: false, count: escHits.length,
      allLines: [...new Set(escHits.map(h => posFromIndex(text, h.idx).line))] });
  }

  // 8. Leading zeros
  const lzRe = /:\s*(-?)0(\d)/g; const lzHits: number[] = [];
  while ((m = lzRe.exec(text)) !== null) { if (!inStr[m.index]) lzHits.push(m.index); }
  if (lzHits.length > 0) {
    const pos = posFromIndex(text, lzHits[0]);
    add({ id: 'leading_zeros', category: 'leading_zeros', severity: 'warning', line: pos.line, col: pos.col,
      title: 'Leading Zeros in Numbers', icon: '0️⃣',
      message: 'Numbers with leading zeros (e.g. 007, 0123) are not valid JSON',
      explanation: 'JSON disallows leading zeros in integer parts to avoid ambiguity with octal notation. `007` must be written as `7`. The only valid leading zero is `0.5` (zero before a decimal point).',
      spec: 'RFC 8259 §6: Integer component must not begin with a leading zero unless it is 0 itself',
      howToFix: 'Remove leading zeros from all integer values.',
      autoFixable: true, snippet: '007  or  0123', fixedSnippet: '7  or  123',
      count: lzHits.length, allLines: [...new Set(lzHits.map(i => posFromIndex(text, i).line))] });
  }

  // 9. Bracket matching
  { const stack: Array<{ char: string; idx: number }> = []; let inside = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\\' && inside) { i++; continue; }
      if (text[i] === '"') { inside = !inside; continue; }
      if (inside) continue;
      if (text[i] === '{' || text[i] === '[') { stack.push({ char: text[i], idx: i }); }
      else if (text[i] === '}' || text[i] === ']') {
        if (stack.length === 0) {
          const pos = posFromIndex(text, i);
          add({ id: `extra_close_${i}`, category: 'mismatched_bracket', severity: 'critical', line: pos.line, col: pos.col,
            title: 'Unexpected Closing Bracket', icon: '🚫',
            message: `Unexpected '${text[i]}' at line ${pos.line}:${pos.col} — no matching opening bracket`,
            explanation: `A closing ${text[i] === '}' ? 'brace }' : 'bracket ]'} was found with no corresponding opening bracket. Usually means an extra closing character was accidentally added, or an opening bracket was deleted.`,
            spec: 'RFC 8259: Brackets must be properly opened before they are closed',
            howToFix: `Delete the extra '${text[i]}' at line ${pos.line} or add a matching opening bracket earlier.`,
            autoFixable: false });
        } else {
          const top = stack[stack.length - 1];
          const expected = top.char === '{' ? '}' : ']';
          if (text[i] !== expected) {
            const pos = posFromIndex(text, i); const openPos = posFromIndex(text, top.idx);
            add({ id: `mismatched_${i}`, category: 'mismatched_bracket', severity: 'critical', line: pos.line, col: pos.col,
              title: 'Mismatched Brackets', icon: '🔀',
              message: `'${text[i]}' at line ${pos.line} doesn't match '${top.char}' from line ${openPos.line}`,
              explanation: `The closing '${text[i]}' doesn't match the opening '${top.char}' started at line ${openPos.line}. Arrays use [ / ] and objects use { / }. Mixing them is always a bug.`,
              spec: 'RFC 8259: [ must be closed with ] and { must be closed with }',
              howToFix: `Change '${text[i]}' to '${expected}', or check if '${top.char}' at line ${openPos.line} should be a different bracket type.`,
              autoFixable: false });
          } else { stack.pop(); }
        }
      }
    }
    for (const { char, idx } of stack) {
      const pos = posFromIndex(text, idx);
      add({ id: `unclosed_${idx}`, category: 'unclosed_bracket', severity: 'critical', line: pos.line, col: pos.col,
        title: 'Unclosed Bracket', icon: '📂',
        message: `'${char}' opened at line ${pos.line}:${pos.col} is never closed`,
        explanation: `Every opening bracket or brace must have a matching closer. This '${char}' opened at line ${pos.line} was never closed.`,
        spec: 'RFC 8259: Every [ must have a ] and every { must have a }',
        howToFix: `Add a closing '${char === '{' ? '}' : ']'}' at the appropriate nesting level.`,
        autoFixable: true, snippet: `${char}...`, fixedSnippet: `${char}...${char === '{' ? '}' : ']'}` });
    }
  }

  // 10. Control characters
  const ctrlRe = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g; const ctrlHits: number[] = [];
  while ((m = ctrlRe.exec(text)) !== null) { if (inStr[m.index]) ctrlHits.push(m.index); }
  if (ctrlHits.length > 0) {
    const pos = posFromIndex(text, ctrlHits[0]);
    add({ id: 'control_char', category: 'control_char', severity: 'critical', line: pos.line, col: pos.col,
      title: 'Raw Control Character in String', icon: '🔋',
      message: `${ctrlHits.length} raw control character(s) inside a string — must be escaped as \\uXXXX`,
      explanation: 'JSON strings cannot contain unescaped control characters (ASCII code < 0x20). These invisible characters must be written as \\u0000 through \\u001F.',
      spec: 'RFC 8259 §7: Characters U+0000–U+001F must be escaped',
      howToFix: 'Replace each control character with its \\uXXXX Unicode escape.',
      autoFixable: false, count: ctrlHits.length,
      allLines: [...new Set(ctrlHits.map(i => posFromIndex(text, i).line))] });
  }

  // 11. Duplicate keys
  { const keyRe = /"((?:[^"\\]|\\.)*)"\s*:/g;
    const keyOccurrences = new Map<string, number[]>();
    while ((m = keyRe.exec(text)) !== null) {
      if (inStr[m.index]) continue;
      const key = m[1]; if (!keyOccurrences.has(key)) keyOccurrences.set(key, []);
      keyOccurrences.get(key)!.push(posFromIndex(text, m.index).line);
    }
    for (const [key, lines] of keyOccurrences) {
      if (lines.length > 1) {
        add({ id: `duplicate_key_${key}`, category: 'duplicate_key', severity: 'warning', line: lines[0], col: 1,
          title: 'Duplicate Object Key', icon: '🔁',
          message: `"${key}" appears ${lines.length}× — parsers silently keep only the last value`,
          explanation: `The key "${key}" is defined ${lines.length} times (lines ${lines.join(', ')}). Parsers silently discard all but the last value — a silent data loss bug.`,
          spec: 'RFC 8259 §4: Keys "SHOULD" be unique (not MUST, but duplicates cause silent data loss)',
          howToFix: `Keep only one definition of "${key}". Decide which value you want and remove the others.`,
          autoFixable: false, allLines: lines });
      }
    }
  }

  // 12. Plus sign on numbers
  const plusRe = /:\s*\+\d/g; const plusHits: number[] = [];
  while ((m = plusRe.exec(text)) !== null) { if (!inStr[m.index]) plusHits.push(m.index); }
  if (plusHits.length > 0) {
    const pos = posFromIndex(text, plusHits[0]);
    add({ id: 'plus_number', category: 'plus_number', severity: 'warning', line: pos.line, col: pos.col,
      title: 'Positive Sign on Number', icon: '➕',
      message: '+N is not valid JSON — the plus sign on positive numbers must be omitted',
      explanation: 'JSON numbers may begin with `-` but not `+`. A positive number is written without any sign prefix: just `42`, not `+42`.',
      spec: 'RFC 8259 §6: number = [ minus ] int [ frac ] [ exp ] — no plus sign',
      howToFix: 'Remove the leading `+` from positive numbers.',
      autoFixable: true, snippet: '+42', fixedSnippet: '42',
      count: plusHits.length, allLines: [...new Set(plusHits.map(i => posFromIndex(text, i).line))] });
  }

  // Validity check
  let isValid = false;
  if (errors.filter(e => e.severity === 'critical').length === 0) {
    try { JSON.parse(text); isValid = true; } catch {}
  }
  if (!isValid && errors.length === 0) {
    try { JSON.parse(text); } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'JSON syntax error';
      const posMatch = msg.match(/position (\d+)/i);
      const lineColMatch = msg.match(/line (\d+) col(?:umn)? (\d+)/i);
      let line = 1, col = 1;
      if (posMatch) { const p = posFromIndex(text, parseInt(posMatch[1], 10)); line = p.line; col = p.col; }
      else if (lineColMatch) { line = parseInt(lineColMatch[1], 10); col = parseInt(lineColMatch[2], 10); }
      add({ id: 'syntax_error', category: 'syntax', severity: 'critical', line, col,
        title: 'JSON Syntax Error', icon: '❌', message: msg,
        explanation: 'The JSON parser encountered a character or token it did not expect. Check the indicated line for misplaced characters, missing commas, or broken values.',
        spec: 'RFC 8259: JSON must be a valid serialized value',
        howToFix: 'Review the indicated line and column. Look for missing commas, unmatched quotes, or unexpected characters.',
        autoFixable: false });
    }
  }

  const critCount = errors.filter(e => e.severity === 'critical').length;
  const warnCount = errors.filter(e => e.severity === 'warning').length;
  const healthScore = isValid ? 100 : Math.max(0, 100 - critCount * 20 - warnCount * 5);
  return { errors, isValid, source: detectSource(text), healthScore };
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
  const hasUQ = /(?:[{,])\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/.test(text) && !/"[a-zA-Z_$][a-zA-Z0-9_$]*"\s*:/.test(text);
  if (hasPy) return { name: 'Python Dict (str())', icon: '🐍', tip: 'Use `json.dumps(obj)` instead of `str(obj)` to get valid JSON from Python.', confidence: 'high' };
  if (hasJs && hasTC) return { name: 'AI-Generated JSON', icon: '🤖', tip: 'AI models often produce trailing commas and JS-only values because they train on JavaScript code.', confidence: 'high' };
  if (hasTC && !hasUQ) return { name: 'AI Output or JSON5', icon: '🤖', tip: 'Trailing commas are the #1 AI JSON error. Add a JSON schema validator to your LLM output pipeline.', confidence: 'medium' };
  if (hasComments) return { name: 'Config File (JSONC/JSON5)', icon: '⚙️', tip: 'VS Code and TypeScript natively support JSONC (JSON with Comments). Standard parsers do not.', confidence: 'high' };
  if (hasSQ || hasUQ) return { name: 'JavaScript Object Literal', icon: '🟨', tip: 'Use `JSON.stringify(obj)` to convert a JS object to valid JSON.', confidence: hasSQ ? 'high' : 'medium' };
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-Fix Engine
// ─────────────────────────────────────────────────────────────────────────────

function autoFix(text: string, errors: JsonError[]): FixResult {
  let result = text;
  const applied: string[] = [];
  const has = (cat: ErrorCategory) => errors.some(e => e.category === cat);
  if (result.startsWith('﻿')) { result = result.slice(1); applied.push('Removed UTF-8 BOM'); }
  if (has('comment')) { result = result.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, ''); applied.push('Stripped // and /* */ comments'); }
  if (has('python_value')) { result = result.replace(/(?<!["\w])(True)(?!["\w])/g, 'true').replace(/(?<!["\w])(False)(?!["\w])/g, 'false').replace(/(?<!["\w])(None)(?!["\w])/g, 'null'); applied.push('True→true, False→false, None→null'); }
  if (has('invalid_value')) { result = result.replace(/:\s*undefined\b/g, ': null').replace(/:\s*NaN\b/g, ': null').replace(/:\s*-?Infinity\b/g, ': null'); applied.push('undefined / NaN / Infinity → null'); }
  if (has('single_quotes')) { result = result.replace(/'([^'\\]|\\.)*'/g, m => `"${m.slice(1,-1).replace(/\\'/g,"'").replace(/"/g,'\\"')}"`); applied.push('Single quotes → double quotes'); }
  if (has('unquoted_key')) { result = result.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, (full, before, key, after) => before.trimEnd().endsWith('"') ? full : `${before}"${key}"${after}`); applied.push('Wrapped unquoted keys in double quotes'); }
  if (has('trailing_comma')) { let prev = ''; while (prev !== result) { prev = result; result = result.replace(/,(\s*[}\]])/g, '$1'); } applied.push('Removed trailing commas'); }
  if (has('leading_zeros')) { result = result.replace(/:\s*(-?)0+(\d)/g, ': $1$2'); applied.push('Removed leading zeros from numbers'); }
  if (has('plus_number')) { result = result.replace(/:\s*\+(\d)/g, ': $1'); applied.push('Removed leading + from numbers'); }
  const unclosed = errors.filter(e => e.category === 'unclosed_bracket');
  if (unclosed.length > 0) { for (const err of unclosed) result += err.snippet?.includes('{') ? '}' : ']'; applied.push(`Closed ${unclosed.length} unclosed bracket(s)`); }
  let isNowValid = false;
  try { const parsed = JSON.parse(result); result = JSON.stringify(parsed, null, 2); isNowValid = true; if (applied.length > 0) applied.push('Pretty-printed fixed JSON'); } catch {}
  return { fixed: result, appliedFixes: applied, isNowValid };
}

// ─────────────────────────────────────────────────────────────────────────────
// Line Diff
// ─────────────────────────────────────────────────────────────────────────────

function buildLineDiff(a: string, b: string): DiffLine[] {
  const aLines = a.split('\n'), bLines = b.split('\n');
  const m = Math.min(aLines.length, 200), n = Math.min(bLines.length, 200);
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = aLines[i-1] === bLines[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
  const result: DiffLine[] = []; let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i-1] === bLines[j-1]) { result.unshift({ type: 'same', text: aLines[i-1] }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: 'added', text: bLines[j-1] }); j--; }
    else { result.unshift({ type: 'removed', text: aLines[i-1] }); i--; }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────────────────────────────

function cn(...cls: (string | false | undefined | null)[]): string { return cls.filter(Boolean).join(' '); }

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string, label?: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); toast.success(label ?? 'Copied!', { duration: 1800 }); setTimeout(() => setCopied(false), 2000); });
  }, []);
  return { copied, copy };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SeverityPill({ severity }: { severity: ErrorSeverity }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
      severity === 'critical' ? 'bg-red-50 text-red-600 border-red-200' :
      severity === 'warning'  ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                'bg-blue-50 text-blue-600 border-blue-200')}>
      {severity === 'critical' ? '●' : severity === 'warning' ? '◆' : '○'} {severity}
    </span>
  );
}

function AutoFixBadge() {
  return <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">✦ auto-fix</span>;
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const { copy, copied } = useCopy();
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800">
      <div className="flex items-center justify-between bg-zinc-900 px-3 py-2">
        <span className="text-[11px] text-zinc-400 font-mono font-medium">{lang}</span>
        <button onClick={() => copy(code, 'Copied!')} className="text-zinc-500 hover:text-zinc-200 transition-colors p-0.5 rounded">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="bg-zinc-950 text-zinc-200 text-[11px] leading-relaxed font-mono px-4 py-3 overflow-x-auto whitespace-pre-wrap break-words">{code}</pre>
    </div>
  );
}

function ErrorCard({ error, expanded, onToggle, onJumpToLine }: {
  error: JsonError; expanded: boolean; onToggle: () => void; onJumpToLine: (line: number) => void;
}) {
  const stripe = error.severity === 'critical' ? 'bg-red-500' : error.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400';
  const headerBg = expanded
    ? error.severity === 'critical' ? 'bg-red-50/80' : error.severity === 'warning' ? 'bg-amber-50/80' : 'bg-blue-50/80'
    : 'bg-white hover:bg-zinc-50/60';

  return (
    <div className={cn('relative rounded-xl border overflow-hidden transition-all duration-150',
      expanded ? 'border-zinc-300 shadow-md' : 'border-zinc-200 shadow-sm hover:border-zinc-300')}>
      {/* Left severity stripe */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-[3px]', stripe)} />

      {/* Header row */}
      <button onClick={onToggle} className={cn('w-full flex items-start gap-3 pl-4 pr-3 py-3 text-left transition-colors', headerBg)}>
        <span className="text-base shrink-0 mt-0.5 select-none">{error.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="font-semibold text-[13px] text-zinc-900 leading-tight">{error.title}</span>
            {error.count && error.count > 1 && (
              <span className="text-[10px] font-bold bg-zinc-100 text-zinc-500 border border-zinc-200 px-1.5 py-0.5 rounded-full">×{error.count}</span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 leading-snug line-clamp-2">{error.message}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0 ml-1">
          <button onClick={e => { e.stopPropagation(); onJumpToLine(error.line); }}
            className="text-[10px] font-mono font-semibold text-violet-600 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded px-1.5 py-0.5 transition-colors">
            L{error.line}
          </button>
          <ChevronDown className={cn('w-3.5 h-3.5 text-zinc-400 transition-transform duration-200', expanded && 'rotate-180')} />
        </div>
      </button>

      {/* Badge row */}
      <div className={cn('flex items-center gap-1.5 pl-[3px] pr-3 pb-2.5 pl-4', headerBg)}>
        <SeverityPill severity={error.severity} />
        {error.autoFixable && <AutoFixBadge />}
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-zinc-100 divide-y divide-zinc-50 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Section label="What happened" icon={<BookOpen className="w-3 h-3" />}>
              <p className="text-[13px] text-zinc-700 leading-relaxed">{error.explanation}</p>
            </Section>
            <Section label="JSON Spec" icon={<ExternalLink className="w-3 h-3" />}>
              <p className="text-[11px] text-zinc-500 font-mono bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 leading-relaxed">{error.spec}</p>
            </Section>
            <Section label="How to fix" icon={<Wand2 className="w-3 h-3" />}>
              <p className="text-[13px] text-zinc-700 leading-relaxed">{error.howToFix}</p>
            </Section>
          </div>

          {error.snippet && error.fixedSnippet && (
            <div className="px-4 py-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1.5">❌ Before</p>
                <pre className="text-[11px] bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 font-mono text-red-800 overflow-x-auto whitespace-pre-wrap">{error.snippet}</pre>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">✅ After</p>
                <pre className="text-[11px] bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2.5 font-mono text-emerald-800 overflow-x-auto whitespace-pre-wrap">{error.fixedSnippet}</pre>
              </div>
            </div>
          )}

          {error.allLines && error.allLines.length > 1 && (
            <div className="px-4 py-3">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">All occurrences</p>
              <div className="flex flex-wrap gap-1.5">
                {error.allLines.map(ln => (
                  <button key={ln} onClick={() => onJumpToLine(ln)}
                    className="text-[11px] font-mono text-violet-700 bg-violet-50 border border-violet-200 rounded-lg px-2 py-0.5 hover:bg-violet-100 transition-colors">
                    Line {ln}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error.codeJS && (
            <div className="px-4 py-3 space-y-2">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
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

function Section({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.1em] mb-1.5 flex items-center gap-1">{icon} {label}</p>
      {children}
    </div>
  );
}

function HealthRing({ score }: { score: number }) {
  const color = score === 100 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  const label = score === 100 ? 'Perfect' : score >= 80 ? 'Good' : score >= 50 ? 'Poor' : 'Critical';
  const r = 20; const circ = 2 * Math.PI * r; const dash = (score / 100) * circ;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 shrink-0">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={r} fill="none" stroke="#e4e4e7" strokeWidth="4" />
          <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.7s ease' }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold" style={{ color }}>{score}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-800">{label}</p>
        <p className="text-[11px] text-zinc-400">Health score</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function JsonErrorExplainerClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [fixResult, setFixResult] = useState<FixResult | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [filterSeverity, setFilterSeverity] = useState<ErrorSeverity | 'all'>('all');
  const [activeOutputTab, setActiveOutputTab] = useState<'fixed' | 'diff'>('fixed');
  const [showFixPanel, setShowFixPanel] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const handleEditorScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) gutterRef.current.scrollTop = textareaRef.current.scrollTop;
  }, []);

  const lines = useMemo(() => input.split('\n'), [input]);

  const errorLineSet = useMemo(() => {
    const s = new Set<number>();
    if (result) { for (const e of result.errors) { if (e.severity === 'critical') s.add(e.line); for (const l of e.allLines ?? []) s.add(l); } }
    return s;
  }, [result]);

  const warningLineSet = useMemo(() => {
    const s = new Set<number>();
    if (result) { for (const e of result.errors) { if (e.severity === 'warning') { s.add(e.line); for (const l of e.allLines ?? []) s.add(l); } } }
    return s;
  }, [result]);

  const analyse = useCallback(() => {
    const r = detectAllErrors(input);
    setResult(r);
    setFixResult(null);
    setShowFixPanel(false);
    setAnalysing(false);
    if (r.errors.length > 0) setExpandedIds(new Set([r.errors[0].id]));
    else setExpandedIds(new Set());
  }, [input]);

  useEffect(() => {
    if (!input.trim()) { setResult(null); setFixResult(null); setAnalysing(false); return; }
    setAnalysing(true);
    const t = setTimeout(analyse, 350);
    return () => clearTimeout(t);
  }, [input, analyse]);

  const handleFix = useCallback(() => {
    if (!result) return;
    const fr = autoFix(input, result.errors);
    setFixResult(fr);
    setShowFixPanel(true);
    setActiveOutputTab('fixed');
    if (fr.isNowValid) toast.success('JSON fixed and validated ✓');
    else toast('Fixes applied — review manually for remaining issues', { icon: '⚠️' });
  }, [input, result]);

  const applyFixed = useCallback(() => {
    if (!fixResult) return;
    setInput(fixResult.fixed); setFixResult(null); setShowFixPanel(false);
    toast.success('Fixed JSON loaded into editor');
  }, [fixResult]);

  const jumpToLine = useCallback((line: number) => {
    const ta = textareaRef.current; if (!ta) return;
    const lns = ta.value.split('\n'); let offset = 0;
    for (let i = 0; i < line - 1 && i < lns.length; i++) offset += lns[i].length + 1;
    ta.focus(); ta.setSelectionRange(offset, offset + (lns[line - 1]?.length ?? 0));
    const lineH = 24;
    ta.scrollTop = Math.max(0, (line - 5) * lineH);
    if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop;
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget; const start = ta.selectionStart; const end = ta.selectionEnd;
      setInput(ta.value.slice(0, start) + '  ' + ta.value.slice(end));
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); analyse(); }
  }, [analyse]);

  const filteredErrors = useMemo(() => {
    if (!result) return [];
    return filterSeverity === 'all' ? result.errors : result.errors.filter(e => e.severity === filterSeverity);
  }, [result, filterSeverity]);

  const autoFixableCount = useMemo(() => result ? result.errors.filter(e => e.autoFixable).length : 0, [result]);
  const criticalCount = useMemo(() => result ? result.errors.filter(e => e.severity === 'critical').length : 0, [result]);
  const warningCount = useMemo(() => result ? result.errors.filter(e => e.severity === 'warning').length : 0, [result]);

  const { copy: copyFixed, copied: copiedFixed } = useCopy();

  const diffLines = useMemo(() => {
    if (!fixResult || !showFixPanel) return [];
    return buildLineDiff(input, fixResult.fixed);
  }, [fixResult, showFixPanel, input]);

  const clearAll = useCallback(() => { setInput(''); setResult(null); setFixResult(null); setShowFixPanel(false); }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      {/* ── Top nav bar ──────────────────────────────────────────────── */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 transition-colors shrink-0 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium hidden sm:inline">Home</span>
          </Link>
          <div className="w-px h-5 bg-zinc-200" />
          <div className="flex-1 min-w-0 flex items-center gap-2.5">
            <span className="text-sm font-bold text-zinc-900">AI JSON Error Explainer</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200/80 rounded-full px-2 py-0.5 uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Smart
            </span>
            <span className="hidden md:inline text-[11px] text-zinc-400">· Detects all errors at once · One-click fix · 100% client-side</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400 border border-zinc-200 rounded-lg px-2.5 py-1.5 font-mono bg-zinc-50">
              <kbd className="font-mono">⌘</kbd><kbd className="font-mono">↵</kbd> to analyse
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="pt-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight mb-2">
                JSON Error Explainer
              </h1>
              <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                Paste any broken JSON — every error is detected instantly with plain-English explanations,
                RFC spec references, and one-click auto-fix.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {[
                  { icon: <Shield className="w-3 h-3" />, text: '14 error types' },
                  { icon: <Wand2 className="w-3 h-3" />, text: 'One-click fix' },
                  { icon: <GitCompare className="w-3 h-3" />, text: 'Diff view' },
                  { icon: <Zap className="w-3 h-3" />, text: 'Live analysis' },
                ].map(({ icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-full px-2.5 py-1">
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Example picker — always visible, horizontal scroll on mobile */}
            <div className="shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 mb-2">Try an example</p>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:max-w-[380px]" style={{ scrollbarWidth: 'none' }}>
                {EXAMPLES.map(ex => (
                  <button key={ex.name} onClick={() => setInput(ex.json.trim())}
                    className="flex-none flex flex-col items-center gap-1 bg-white hover:bg-violet-50 border border-zinc-200 hover:border-violet-300 rounded-xl px-3 py-2.5 transition-all group min-w-[72px] sm:min-w-0">
                    <span className="text-xl group-hover:scale-110 transition-transform select-none">{ex.icon}</span>
                    <span className="text-[10px] font-semibold text-zinc-600 group-hover:text-violet-700 leading-tight whitespace-nowrap">{ex.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Source detection + stats row ─────────────────────────── */}
        {result && input.trim() && (
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            {/* Source badge */}
            {result.source && (
              <div className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3 flex-1 min-w-0">
                <span className="text-2xl shrink-0 select-none">{result.source.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-violet-900 leading-tight">Source: {result.source.name}</span>
                    <span className={cn('text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border',
                      result.source.confidence === 'high' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-600 border-amber-200')}>
                      {result.source.confidence} confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-violet-700/80 mt-0.5 leading-snug truncate">{result.source.tip}</p>
                </div>
              </div>
            )}

            {/* Stats cards */}
            <div className="grid grid-cols-4 gap-2 shrink-0">
              {[
                { n: criticalCount, label: 'Critical', color: criticalCount > 0 ? 'text-red-600 bg-red-50 border-red-200' : 'text-zinc-400 bg-white border-zinc-200', icon: <AlertCircle className="w-3.5 h-3.5" /> },
                { n: warningCount, label: 'Warnings', color: warningCount > 0 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-zinc-400 bg-white border-zinc-200', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
                { n: autoFixableCount, label: 'Auto-fix', color: autoFixableCount > 0 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-zinc-400 bg-white border-zinc-200', icon: <Wand2 className="w-3.5 h-3.5" /> },
                { n: null, label: result.isValid ? 'Valid ✓' : 'Invalid', color: result.isValid ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-600 bg-red-50 border-red-200', icon: result.isValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" /> },
              ].map(({ n, label, color, icon }) => (
                <div key={label} className={cn('flex flex-col items-center justify-center rounded-2xl border px-3 py-3 text-center min-w-[72px]', color)}>
                  <div className="flex items-center gap-1 mb-0.5">{icon}<span className="text-base font-extrabold leading-none">{n ?? ''}</span></div>
                  <span className="text-[10px] font-semibold leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Main 2-col grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 items-start">

          {/* ── LEFT: Editor + fix panel ────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Editor card */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800/90 shadow-xl bg-zinc-950">

              {/* Editor top bar */}
              <div className="flex items-center justify-between bg-zinc-900 border-b border-zinc-800 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  {/* Traffic lights */}
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400 font-mono ml-1">JSON Input</span>
                  {analysing && (
                    <span className="text-[10px] text-violet-400 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" /> analysing…
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500 font-mono">{lines.length} lines</span>
                  {input && (
                    <button onClick={clearAll} className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500 rounded-lg px-2.5 py-1 transition-colors">
                      <RotateCcw className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Editor area */}
              <div className="flex" style={{ height: '480px' }}>
                {/* Gutter */}
                <div ref={gutterRef} className="w-12 bg-zinc-900 select-none overflow-hidden flex-shrink-0 font-mono py-4 border-r border-zinc-800" style={{ scrollbarWidth: 'none' }}>
                  {lines.map((_, i) => {
                    const ln = i + 1;
                    const isErr = errorLineSet.has(ln);
                    const isWarn = !isErr && warningLineSet.has(ln);
                    return (
                      <div key={i} className={cn('h-6 text-[11px] leading-6 flex items-center justify-end pr-2.5 transition-colors select-none',
                        isErr ? 'text-red-400 font-bold' : isWarn ? 'text-amber-400' : 'text-zinc-600')}>
                        {isErr ? <span className="text-red-400">●</span> : isWarn ? <span className="text-amber-400">◆</span> : ln}
                      </div>
                    );
                  })}
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onScroll={handleEditorScroll}
                  onKeyDown={handleKeyDown}
                  placeholder={'Paste your JSON here…\n\nDetects ALL errors at once:\ntrailing commas · Python True/False/None · JS undefined/NaN\nsingle quotes · unquoted keys · duplicate keys · and more\n\n⌘+Enter to force re-analyse'}
                  spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off"
                  className="flex-1 bg-zinc-950 text-zinc-100 font-mono text-[13px] leading-6 resize-none outline-none px-4 py-4 placeholder:text-zinc-700 overflow-auto caret-violet-400"
                />
              </div>

              {/* Editor bottom bar */}
              <div className="flex items-center justify-between bg-zinc-900 border-t border-zinc-800 px-4 py-2">
                <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
                  <span>{input.length.toLocaleString()} chars</span>
                  {result && (<>
                    <span className="text-zinc-700">·</span>
                    {result.isValid
                      ? <span className="text-emerald-400 flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3 h-3" /> Valid JSON</span>
                      : <span className="text-red-400 flex items-center gap-1 font-semibold"><X className="w-3 h-3" /> {result.errors.length} error{result.errors.length !== 1 ? 's' : ''}</span>}
                  </>)}
                </div>
                {!input && <span className="text-[11px] text-zinc-600 font-mono">live analysis · no upload</span>}
              </div>
            </div>

            {/* Fix output panel */}
            {showFixPanel && fixResult && (
              <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-md">
                {/* Fix panel header */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 bg-gradient-to-r from-violet-50 to-indigo-50">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                      <Wand2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-900">Fixed JSON</span>
                        {fixResult.isNowValid && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5 font-bold uppercase tracking-wide">✓ Valid</span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500">{fixResult.appliedFixes.length} fix{fixResult.appliedFixes.length !== 1 ? 'es' : ''} applied</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Tabs */}
                    <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-[11px] bg-white">
                      {(['fixed', 'diff'] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveOutputTab(tab)}
                          className={cn('px-3 py-1.5 font-semibold transition-colors', activeOutputTab === tab ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50')}>
                          {tab === 'diff' ? '± Diff' : '{ } Fixed'}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => copyFixed(fixResult.fixed, 'Fixed JSON copied!')}
                      className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 rounded-lg px-2.5 py-1.5 bg-white transition-colors">
                      {copiedFixed ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy
                    </button>
                    <button onClick={applyFixed}
                      className="flex items-center gap-1.5 text-[11px] text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-3 py-1.5 font-semibold transition-colors">
                      Apply to editor <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Applied fixes chips */}
                {fixResult.appliedFixes.length > 0 && (
                  <div className="px-4 py-2.5 border-b border-zinc-100 bg-zinc-50 flex flex-wrap gap-1.5">
                    {fixResult.appliedFixes.map((fix, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-full px-2.5 py-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-500" /> {fix}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                {activeOutputTab === 'fixed' ? (
                  <pre className="text-[12px] font-mono text-zinc-800 leading-relaxed p-4 max-h-[320px] overflow-auto whitespace-pre-wrap break-words">{fixResult.fixed}</pre>
                ) : (
                  <div className="font-mono text-[11px] leading-6 max-h-[320px] overflow-auto p-4 space-y-px">
                    {diffLines.map((dl, i) => (
                      <div key={i} className={cn('px-2 py-0.5 rounded whitespace-pre-wrap break-words',
                        dl.type === 'removed' && 'bg-red-50 text-red-700 line-through opacity-70',
                        dl.type === 'added' && 'bg-emerald-50 text-emerald-800',
                        dl.type === 'same' && 'text-zinc-400')}>
                        <span className="select-none mr-2 opacity-60 font-bold">{dl.type === 'removed' ? '−' : dl.type === 'added' ? '+' : ' '}</span>
                        {dl.text || ' '}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: Analysis panel (sticky) ─────────────────────── */}
          <div className="lg:sticky lg:top-[56px]">
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden" style={{ maxHeight: 'calc(100vh - 76px)' }}>

              {/* Panel header */}
              <div className="flex-none flex items-center justify-between border-b border-zinc-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900">Error Analysis</span>
                  {result && result.errors.length > 0 && (
                    <span className="text-[11px] text-zinc-400 font-mono">{result.errors.length} issue{result.errors.length !== 1 ? 's' : ''}</span>
                  )}
                </div>
                {/* Severity filter */}
                {result && result.errors.length > 0 && (
                  <div className="flex rounded-lg border border-zinc-200 overflow-hidden text-[10px]">
                    {([['all', 'All'], ['critical', '🔴'], ['warning', '🟡']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setFilterSeverity(val)}
                        className={cn('px-2.5 py-1.5 font-bold transition-colors', filterSeverity === val ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-500 hover:bg-zinc-50')}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Source banner (inside panel, compact) */}
              {result?.source && (
                <div className="flex-none flex items-center gap-2 px-4 py-2 bg-violet-50/80 border-b border-violet-100">
                  <span className="text-base select-none">{result.source.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-violet-800">{result.source.name}</span>
                    <span className={cn('ml-1.5 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border',
                      result.source.confidence === 'high' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-600 border-amber-200')}>
                      {result.source.confidence}
                    </span>
                  </div>
                </div>
              )}

              {/* Scrollable error list */}
              <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2">

                {/* Empty / placeholder state */}
                {!input.trim() && (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                      <span className="text-3xl select-none">🔍</span>
                    </div>
                    <p className="font-semibold text-zinc-700 mb-1.5">Paste JSON to begin</p>
                    <p className="text-[12px] text-zinc-400 leading-relaxed max-w-[220px]">
                      Every error is found instantly — trailing commas, Python values, bad escapes, and 11 more types.
                    </p>
                  </div>
                )}

                {/* Valid state */}
                {result?.isValid && input.trim() && (
                  <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <p className="font-bold text-emerald-800 text-base mb-1">Perfect JSON!</p>
                    <p className="text-[12px] text-emerald-700/80 leading-relaxed mb-3">No errors detected. Fully RFC 8259-compliant.</p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-[11px] text-emerald-700 font-mono">
                      JSON.parse() ✓ · RFC 8259 ✓
                    </div>
                  </div>
                )}

                {/* No filter match */}
                {result && !result.isValid && filteredErrors.length === 0 && filterSeverity !== 'all' && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <p className="text-sm text-zinc-400">No {filterSeverity} errors</p>
                  </div>
                )}

                {/* Error cards */}
                {filteredErrors.map(error => (
                  <ErrorCard key={error.id} error={error} expanded={expandedIds.has(error.id)}
                    onToggle={() => setExpandedIds(prev => { const next = new Set(prev); if (next.has(error.id)) next.delete(error.id); else next.add(error.id); return next; })}
                    onJumpToLine={jumpToLine} />
                ))}
              </div>

              {/* Panel footer: health + fix button */}
              {result && input.trim() && (
                <div className="flex-none border-t border-zinc-100 p-4 space-y-3 bg-zinc-50/60">

                  {/* Health ring + fix button row */}
                  <div className="flex items-center gap-3">
                    <HealthRing score={result.healthScore} />
                    {!result.isValid && autoFixableCount > 0 && (
                      <button onClick={handleFix}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl py-3 px-3 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                        <Wand2 className="w-4 h-4 shrink-0" />
                        Fix {autoFixableCount} error{autoFixableCount !== 1 ? 's' : ''}
                      </button>
                    )}
                    {result.isValid && (
                      <div className="flex-1 text-center">
                        <span className="text-sm font-semibold text-emerald-600">All good! ✓</span>
                      </div>
                    )}
                  </div>

                  {/* Expand / collapse + manual-fix note */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    {filteredErrors.length > 1 ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => setExpandedIds(new Set(filteredErrors.map(e => e.id)))} className="flex items-center gap-1 hover:text-zinc-600 transition-colors">
                          <Eye className="w-3 h-3" /> Expand all
                        </button>
                        <span>·</span>
                        <button onClick={() => setExpandedIds(new Set())} className="flex items-center gap-1 hover:text-zinc-600 transition-colors">
                          <EyeOff className="w-3 h-3" /> Collapse
                        </button>
                      </div>
                    ) : <span />}
                    {result.errors.filter(e => !e.autoFixable).length > 0 && (
                      <span className="text-zinc-400">{result.errors.filter(e => !e.autoFixable).length} need manual fix</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Feature grid ─────────────────────────────────────────── */}
        <div className="mt-10 mb-2">
          <div className="rounded-2xl bg-white border border-zinc-200 px-6 py-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <h2 className="font-bold text-zinc-900">What this tool detects</h2>
              <span className="text-xs text-zinc-400 ml-1">14 error types</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
              {[
                { icon: '⚠️', name: 'Trailing Commas',        fix: true },
                { icon: '🐍', name: 'Python True/False/None', fix: true },
                { icon: '🟡', name: 'NaN / undefined',        fix: true },
                { icon: '💬', name: 'JS Comments',            fix: true },
                { icon: '🔤', name: 'Single Quotes',          fix: true },
                { icon: '🔑', name: 'Unquoted Keys',          fix: true },
                { icon: '0️⃣', name: 'Leading Zeros',          fix: true },
                { icon: '➕', name: 'Plus Numbers',           fix: true },
                { icon: '📂', name: 'Unclosed Brackets',      fix: true },
                { icon: '⚡', name: 'UTF-8 BOM',              fix: true },
                { icon: '🔀', name: 'Mismatched Brackets',    fix: false },
                { icon: '🔁', name: 'Duplicate Keys',         fix: false },
                { icon: '🔴', name: 'Invalid Escapes',        fix: false },
                { icon: '🔋', name: 'Control Characters',     fix: false },
              ].map(({ icon, name, fix }) => (
                <div key={name} className="flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                  <span className="text-base shrink-0 select-none">{icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium text-zinc-700 leading-tight truncate">{name}</p>
                    <p className={cn('text-[9px] font-bold uppercase tracking-wider mt-0.5', fix ? 'text-emerald-600' : 'text-zinc-400')}>
                      {fix ? '✦ auto-fix' : 'manual'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related tools ────────────────────────────────────────── */}
        <div className="py-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 mb-3">Related JSON tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['/json-beautifier', '✨ JSON Beautifier'],
              ['/json-fixer-online', '🔧 JSON Fixer'],
              ['/json-comparator', '🔀 JSON Comparator'],
              ['/json-schema-generation', '📐 Schema Generator'],
              ['/json-stringify-online', '📦 JSON Stringify'],
              ['/json-to-typescript', '🔷 JSON → TypeScript'],
              ['/json-validator', '✅ JSON Validator'],
            ].map(([href, label]) => (
              <Link key={href} href={href}
                className="text-xs text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 hover:border-emerald-300 rounded-xl px-3 py-2 hover:bg-emerald-50 transition-colors font-medium">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
