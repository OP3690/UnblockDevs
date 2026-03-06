/**
 * Advanced JSON Fixer & Recovery Engine
 * - Extract JSON from logs
 * - Repair truncated JSON
 * - Convert JS-like (unquoted keys) to JSON
 * - Multiple JSON objects → array
 * - Duplicate key detection
 * - JSON statistics
 */

export interface JsonStats {
  objects: number;
  arrays: number;
  keys: number;
  maxDepth: number;
  size: number;
  sizeFormatted: string;
}

export interface DuplicateKeyInfo {
  key: string;
  count: number;
  paths?: string[];
}

/** Extract JSON from log lines (e.g. payload={"a":1} or DEBUG {"b":2}) */
export function extractJsonFromLogs(text: string): string {
  const trimmed = text.trim();
  // Try to find JSON object/array in the line
  const objectMatch = trimmed.match(/\{[\s\S]*\}/);
  const arrayMatch = trimmed.match(/\[[\s\S]*\]/);
  // Prefer the one that parses
  for (const match of [objectMatch, arrayMatch].filter(Boolean)) {
    if (!match) continue;
    const candidate = match[0];
    // Find the shortest valid JSON from this match (nested can have multiple braces)
    let depth = 0;
    let start = -1;
    const open = candidate[0] === '[' ? '[' : '{';
    const close = candidate[0] === '[' ? ']' : '}';
    for (let i = 0; i < candidate.length; i++) {
      if (candidate[i] === open) {
        if (depth === 0) start = i;
        depth++;
      } else if (candidate[i] === close) {
        depth--;
        if (depth === 0 && start >= 0) {
          const slice = candidate.slice(start, i + 1);
          try {
            JSON.parse(slice);
            return slice;
          } catch {
            // try next matching close
          }
        }
      }
    }
  }
  // Fallback: try to find key=value JSON pattern
  const eqMatch = trimmed.match(/(?:payload|data|json|body)\s*=\s*(\{[\s\S]*\}|\[[\s\S]*\])/i);
  if (eqMatch) {
    const inner = eqMatch[1];
    let depth = 0;
    const open = inner[0];
    const close = inner[0] === '[' ? ']' : '}';
    for (let i = 0; i < inner.length; i++) {
      if (inner[i] === open) depth++;
      else if (inner[i] === close) {
        depth--;
        if (depth === 0) {
          try {
            JSON.parse(inner.slice(0, i + 1));
            return inner.slice(0, i + 1);
          } catch {
            //
          }
        }
      }
    }
  }
  return trimmed;
}

/**
 * Wrap content that starts with a key (missing root object) in {}.
 * Valid JSON must start with { or [. Input like "data":[...] is invalid; wrap to {"data":[...]}.
 */
export function wrapMissingRootObject(text: string): { text: string; applied: boolean } {
  const s = text.trim();
  if (!s) return { text, applied: false };
  if (s[0] === '{' || s[0] === '[') return { text, applied: false };
  // Case 1: starts with "key":
  if (/^"[^"]+"\s*:/.test(s)) return { text: '{' + text.trim() + '}', applied: true };
  // Case 2: starts with unquoted key (identifier then colon)
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/.test(s)) return { text: '{' + text.trim() + '}', applied: true };
  return { text, applied: false };
}

/** Repair truncated JSON by appending missing closing brackets/braces. Returns { text, addedBrackets, addedBraces }. */
export function repairTruncatedJson(text: string): { text: string; addedBrackets: number; addedBraces: number } {
  let s = text.trim();
  const openBraces = (s.match(/{/g) || []).length;
  const closeBraces = (s.match(/}/g) || []).length;
  const openBrackets = (s.match(/\[/g) || []).length;
  const closeBrackets = (s.match(/]/g) || []).length;
  const needBraces = Math.max(0, openBraces - closeBraces);
  const needBrackets = Math.max(0, openBrackets - closeBrackets);
  s = s.replace(/,\s*$/, '');
  for (let i = 0; i < needBrackets; i++) s += ']';
  for (let i = 0; i < needBraces; i++) s += '}';
  return { text: s, addedBrackets: needBrackets, addedBraces: needBraces };
}

/** Convert JavaScript-like object (unquoted keys) to valid JSON */
export function repairUnquotedKeys(text: string): string {
  // Match unquoted keys: word characters, optional dots (for keys like "a.b"), then :
  // Be careful not to match values. Keys appear after { or , and before :
  return text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$.]*)\s*(\s*:)/g, '$1"$2"$3');
}

/**
 * Repair missing quotes around keys.
 * E.g. data":[...] → "data":[...]
 * E.g. name": "John" → "name": "John"
 */
export function repairMissingQuotes(text: string): { text: string; count: number; fixedKeys: string[] } {
  let count = 0;
  const fixedKeys: string[] = [];
  
  // Fix keys missing opening quote: data": → "data":
  // Pattern: start of key position (after { or ,) followed by unquoted word then "
  let result = text.replace(
    /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)("\s*:)/g,
    (match, prefix, key, suffix) => {
      count++;
      fixedKeys.push(key);
      return prefix + '"' + key + suffix;
    }
  );
  
  // Also fix at the very start if it's a root-level key missing opening quote
  // Pattern: starts with word then ": 
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*"\s*:/.test(result.trim())) {
    result = result.replace(
      /^(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)("\s*:)/,
      (match, whitespace, key, suffix) => {
        count++;
        fixedKeys.push(key);
        return whitespace + '"' + key + suffix;
      }
    );
  }
  
  return { text: result, count, fixedKeys };
}

/**
 * Repair missing commas between a value and the next key.
 * E.g. "NIFTY 50""open": → "NIFTY 50","open":
 * E.g. 24615.95"high": → 24615.95,"high":
 * E.g. true"next": → true,"next":
 * This handles the case where a comma is missing after any value before the next key.
 */
export function repairMissingCommas(text: string): { text: string; count: number } {
  let count = 0;
  let result = text;
  
  // Case 1: String value followed by string key
  // "string value" followed by "key": (the next key-value pair)
  result = result.replace(
    /("(?:[^"\\]|\\.)*")(\s*)("(?:[^"\\]|\\.)*"\s*:)/g,
    (match, value, whitespace, keyWithColon) => {
      count++;
      return value + ',' + (whitespace || '') + keyWithColon;
    }
  );
  
  // Case 2: Number value followed by string key
  // 123.45"key": → 123.45,"key":
  result = result.replace(
    /([-+]?\d+\.?\d*(?:[eE][-+]?\d+)?)(\s*)("(?:[^"\\]|\\.)*"\s*:)/g,
    (match, number, whitespace, keyWithColon) => {
      count++;
      return number + ',' + (whitespace || '') + keyWithColon;
    }
  );
  
  // Case 3: Boolean/null value followed by string key
  // true"key": → true,"key":
  result = result.replace(
    /\b(true|false|null)(\s*)("(?:[^"\\]|\\.)*"\s*:)/g,
    (match, value, whitespace, keyWithColon) => {
      count++;
      return value + ',' + (whitespace || '') + keyWithColon;
    }
  );
  
  // Case 4: Closing bracket/brace followed by string key (missing comma after array/object)
  // }"key": → },"key": or ]"key": → ],"key":
  result = result.replace(
    /([}\]])(\s*)("(?:[^"\\]|\\.)*"\s*:)/g,
    (match, bracket, whitespace, keyWithColon) => {
      count++;
      return bracket + ',' + (whitespace || '') + keyWithColon;
    }
  );
  
  return { text: result, count };
}

/**
 * Repair missing colons between keys and values.
 * E.g. "yearHigh"26373.2 → "yearHigh":26373.2
 * But NOT "value""key": (that's a missing comma case, not missing colon)
 * Returns the fixed text, count, and the keys that were fixed (for highlighting)
 */
export function repairMissingColons(text: string): { text: string; count: number; fixedKeys: string[] } {
  let count = 0;
  const fixedKeys: string[] = [];
  // Pattern: "key" followed directly by a value (number, string, true, false, null, { or [)
  // Without a colon in between
  // IMPORTANT: Exclude cases where the next thing is a string followed by : (that's a missing comma)
  const result = text.replace(
    /("(?:[^"\\]|\\.)*")(\s*)(?!:)([-+]?\d|\{|\[|true|false|null)/g,
    (match, key, whitespace, valueStart) => {
      count++;
      // Extract the key name without quotes
      const keyName = key.replace(/^"|"$/g, '');
      fixedKeys.push(keyName);
      return key + ':' + valueStart;
    }
  );
  
  // Also handle "key""value" where value is a string NOT followed by : (so it's really a value, not a key)
  let result2 = result;
  const stringValuePattern = /("(?:[^"\\]|\\.)*")(\s*)("(?:[^"\\]|\\.)*")(?!\s*:)/g;
  result2 = result.replace(stringValuePattern, (match, key, whitespace, value) => {
    count++;
    const keyName = key.replace(/^"|"$/g, '');
    fixedKeys.push(keyName);
    return key + ':' + value;
  });
  
  return { text: result2, count, fixedKeys };
}

/** Detect multiple JSON objects (one per line or concatenated) and wrap in array */
export function multipleObjectsToArray(text: string): string {
  const trimmed = text.trim();
  const lines = trimmed.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const objects: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('{')) {
      let depth = 0;
      let start = i;
      let str = '';
      for (let j = i; j < lines.length; j++) {
        const l = lines[j];
        for (const c of l) {
          if (c === '{') depth++;
          else if (c === '}') depth--;
        }
        str += (str ? '\n' : '') + l;
        if (depth === 0) {
          try {
            JSON.parse(str);
            objects.push(str);
            i = j + 1;
            break;
          } catch {
            //
          }
        }
      }
      if (depth !== 0) i++;
    } else if (line.startsWith('[')) {
      let depth = 0;
      let str = '';
      for (let j = i; j < lines.length; j++) {
        const l = lines[j];
        for (const c of l) {
          if (c === '[') depth++;
          else if (c === ']') depth--;
        }
        str += (str ? '\n' : '') + l;
        if (depth === 0) {
          try {
            JSON.parse(str);
            objects.push(str);
            i = j + 1;
            break;
          } catch {
            //
          }
        }
      }
      if (depth !== 0) i++;
    } else {
      i++;
    }
  }
  if (objects.length <= 1) return trimmed;
  try {
    const arr = objects.map((o) => JSON.parse(o));
    return JSON.stringify(arr, null, 2);
  } catch {
    return trimmed;
  }
}

/** Get duplicate keys in JSON string (parse with no reviver to detect last-wins; we need custom parse to track duplicates) */
export function detectDuplicateKeys(text: string): DuplicateKeyInfo[] {
  const keys: { key: string; count: number }[] = [];
  const keyCount = new Map<string, number>();
  // Simple heuristic: find "key": or "key": in the string and count occurrences of same key at same depth
  const keyRegex = /"(?:[^"\\]|\\.)*"\s*:/g;
  let m;
  const list: string[] = [];
  while ((m = keyRegex.exec(text)) !== null) {
    list.push(m[0].replace(/\s*:\s*$/, '').replace(/^"|"$/g, ''));
  }
  list.forEach((k) => keyCount.set(k, (keyCount.get(k) || 0) + 1));
  const duplicates = Array.from(keyCount.entries())
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }));
  return duplicates;
}

/** Fix duplicate keys: JSON.parse keeps last key, then stringify. Use after repair so JSON is valid. */
export function fixDuplicateKeysKeepLast(text: string): string {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return text;
  }
}

/** Get JSON statistics from parsed object */
export function getJsonStats(obj: any): JsonStats {
  let objects = 0;
  let arrays = 0;
  let keys = 0;
  let maxDepth = 0;

  function walk(o: any, depth: number) {
    maxDepth = Math.max(maxDepth, depth);
    if (o === null || typeof o !== 'object') return;
    if (Array.isArray(o)) {
      arrays++;
      o.forEach((item) => walk(item, depth + 1));
    } else {
      objects++;
      keys += Object.keys(o).length;
      Object.values(o).forEach((v) => walk(v, depth + 1));
    }
  }
  walk(obj, 1);

  const str = JSON.stringify(obj);
  const size = new Blob([str]).size;
  const sizeFormatted = size < 1024 ? `${size} B` : size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB` : `${(size / (1024 * 1024)).toFixed(2)} MB`;

  return { objects, arrays, keys, maxDepth, size, sizeFormatted };
}

/** Parse "position 245" or "at position 245" from error message */
export function parsePositionFromError(message: string): number | null {
  const m = message.match(/position\s+(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Get line and column from position in text */
export function positionToLineColumn(text: string, position: number): { line: number; column: number } {
  const lines = text.slice(0, position).split('\n');
  return { line: lines.length, column: (lines[lines.length - 1] || '').length + 1 };
}
