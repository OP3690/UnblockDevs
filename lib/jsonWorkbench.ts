/**
 * Developer JSON Workbench – shared utilities for error detection,
 * sensitive data detection, code generation, and analysis.
 */

export interface JsonIssue {
  line: number;
  column?: number;
  message: string;
  type: 'syntax' | 'structure';
}

export interface JsonFixResult {
  valid: boolean;
  errors: JsonIssue[];
  suggestedFix: string;
}

export interface SensitiveMatch {
  kind: 'email' | 'phone' | 'token' | 'password' | 'api_key' | 'jwt' | 'url_secret';
  path: string;
  value: string; // masked for display
}

export interface ArrayAnalysis {
  length: number;
  commonKeys: string[];
  uniqueKeys: string[];
  sampleKeys: string[];
}

const NOISE_KEYS = new Set([
  'timestamp', 'request_id', 'trace_id', 'session_id', 'requestId', 'traceId', 'sessionId',
  'correlation_id', 'correlationId', 'x_request_id', 'x_trace_id', 'debug', '_meta',
]);

/** Detect JSON errors and produce a suggested fix (trailing comma, missing comma, etc.). */
export function detectJsonErrorsAndFix(text: string): JsonFixResult {
  const errors: JsonIssue[] = [];
  let fixed = text;

  try {
    JSON.parse(text);
    return { valid: true, errors: [], suggestedFix: text };
  } catch {
    // invalid
  }

  const lines = text.split('\n');

  // Trailing commas
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

  // Missing comma between properties (heuristic: "value"\n  "key":
  const lines2 = fixed.split('\n');
  for (let i = 0; i < lines2.length - 1; i++) {
    const line = lines2[i];
    const trimmed = line.trim();
    const next = lines2[i + 1].trim();
    if (trimmed.match(/^"[^"]+"\s*:\s*("[^"]+"|\d+|true|false|null)\s*$/) && !trimmed.endsWith(',')) {
      if (next.match(/^"[^"]+"\s*:/) && !next.startsWith('}')) {
        lines2[i] = line + ',';
        errors.push({ line: i + 1, message: 'Missing comma after property', type: 'syntax' });
      }
    }
  }
  fixed = lines2.join('\n');

  // Single quotes to double (value part only)
  fixed = fixed.replace(/(:\s*)'([^']*)'(\s*[,}\]])/g, '$1"$2"$3');

  try {
    const parsed = JSON.parse(fixed);
    return {
      valid: false,
      errors,
      suggestedFix: JSON.stringify(parsed, null, 2),
    };
  } catch {
    return {
      valid: false,
      errors: [{ line: 1, message: 'Could not auto-fix. Check brackets and commas.', type: 'structure' }],
      suggestedFix: fixed,
    };
  }
}

/** Find duplicate keys in raw JSON string (same object level). */
export function getDuplicateKeys(text: string): string[] {
  const dupes = new Set<string>();
  const keyRe = /"([^"]+)"\s*:/g;
  const keyStack: Set<string>[] = [new Set()];
  let m;
  while ((m = keyRe.exec(text)) !== null) {
    const key = m[1];
    const before = text.slice(0, m.index);
    const open = (before.match(/{/g) || []).length;
    const close = (before.match(/}/g) || []).length;
    let depth = open - close;
    while (keyStack.length > depth + 1) keyStack.pop();
    while (keyStack.length < depth + 1) keyStack.push(new Set());
    const current = keyStack[depth];
    if (current.has(key)) dupes.add(key);
    else current.add(key);
  }
  return Array.from(dupes);
}

/** Recursively find sensitive-looking values and their paths. */
export function detectSensitiveInJson(obj: unknown, path: string = '$'): SensitiveMatch[] {
  const out: SensitiveMatch[] = [];
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[\d\s\-()]{10,}$/;
  const jwtRe = /^eyJ[A-Za-z0-9_-]+\.eyJ/;
  const apiKeyRe = /^(sk|pk)_[A-Za-z0-9]{20,}$|^AKIA[A-Z0-9]{16}$/;
  const urlSecretRe = /^(https?:\/\/[^:]+:)([^@/]+)(@|\/)/;

  function walk(val: unknown, p: string) {
    if (val === null || val === undefined) return;
    if (typeof val === 'string') {
      if (emailRe.test(val)) {
        out.push({ kind: 'email', path: p, value: val.replace(/(.{2}).*(@.*)/, '$1***$2') });
        return;
      }
      if (phoneRe.test(val) && val.replace(/\D/g, '').length >= 10) {
        out.push({ kind: 'phone', path: p, value: '***' + val.slice(-4) });
        return;
      }
      if (jwtRe.test(val)) {
        out.push({ kind: 'jwt', path: p, value: val.slice(0, 20) + '...' });
        return;
      }
      if (apiKeyRe.test(val) || (val.length > 24 && /^[A-Za-z0-9_-]+$/.test(val))) {
        out.push({ kind: 'api_key', path: p, value: val.slice(0, 8) + '...' });
        return;
      }
      if (urlSecretRe.test(val)) {
        out.push({ kind: 'url_secret', path: p, value: '(credentials in URL)' });
        return;
      }
      return;
    }
    if (Array.isArray(val)) {
      val.forEach((item, i) => walk(item, `${p}[${i}]`));
      return;
    }
    if (typeof val === 'object') {
      for (const k of Object.keys(val)) {
        const key = k.toLowerCase();
        const v = (val as Record<string, unknown>)[k];
        const nextPath = p === '$' ? `$.${k}` : `${p}.${k}`;
        if (key.includes('password') || key.includes('secret') || key.includes('token') || key.includes('apikey') || key.includes('api_key')) {
          if (typeof v === 'string') {
            out.push({ kind: 'password', path: nextPath, value: '***' });
          } else {
            walk(v, nextPath);
          }
        } else {
          walk(v, nextPath);
        }
      }
    }
  }

  walk(obj, path);
  return out;
}

/** Convert path like "user.profile.name" or "root.profile[0].name" to JSONPath $.user.profile.name */
export function pathToJsonPath(path: string): string {
  if (path === 'root' || path === '') return '$';
  const normalized = path.replace(/^root\.?/, '').replace(/\.\[/g, '[');
  return '$.' + normalized;
}

/** Infer TS type from value. */
function tsType(val: unknown): string {
  if (val === null) return 'null';
  if (Array.isArray(val)) {
    if (val.length === 0) return 'any[]';
    return tsType(val[0]) + '[]';
  }
  if (typeof val === 'object') return 'object'; // will be expanded
  if (typeof val === 'number') return Number.isInteger(val) ? 'number' : 'number';
  if (typeof val === 'boolean') return 'boolean';
  return 'string';
}

/** Generate TypeScript interface from JSON object (single interface, nested as inline types). */
export function jsonToTypeScript(obj: unknown, name: string = 'Root'): string {
  if (obj === null || obj === undefined) return `interface ${name} {\n  // null\n}\n`;
  if (Array.isArray(obj)) {
    const item = obj[0];
    const itemName = name.replace(/s$/, '') || 'Item';
    if (item != null && typeof item === 'object' && !Array.isArray(item)) {
      return jsonToTypeScript(item, itemName) + `\ntype ${name} = ${itemName}[];\n`;
    }
    return `type ${name} = ${tsType(item)}[];\n`;
  }
  if (typeof obj !== 'object') return `type ${name} = ${tsType(obj)};\n`;

  const entries: string[] = [];
  const nested: string[] = [];
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    const v = (obj as Record<string, unknown>)[key];
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const subName = key.charAt(0).toUpperCase() + key.slice(1).replace(/[^a-zA-Z0-9]/g, '') || 'Nested';
      entries.push(`  ${safeKey}: ${subName};`);
      const sub = jsonToTypeScript(v, subName);
      if (!sub.startsWith('type ')) nested.push(sub);
    } else if (Array.isArray(v)) {
      const first = v[0];
      if (first != null && typeof first === 'object') {
        const subName = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/s$/, '') || 'Item';
        entries.push(`  ${safeKey}: ${subName}[];`);
        const sub = jsonToTypeScript(first, subName);
        if (!sub.startsWith('type ')) nested.push(sub);
      } else {
        entries.push(`  ${safeKey}: ${tsType(first)}[];`);
      }
    } else {
      entries.push(`  ${safeKey}: ${tsType(v)};`);
    }
  }
  return `interface ${name} {\n${entries.join('\n')}\n}\n${nested.join('')}`;
}

/** Generate a single TypeScript interface from object (flat, no nested interfaces). */
export function jsonToTypeScriptFlat(obj: Record<string, unknown>, name: string = 'Root'): string {
  const lines: string[] = [`export interface ${name} {`];
  for (const [key, val] of Object.entries(obj)) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
    lines.push(`  ${safeKey}: ${tsType(val)};`);
  }
  lines.push('}');
  return lines.join('\n');
}

/** Infer SQL type from value. */
function sqlType(val: unknown): string {
  if (val === null || typeof val === 'number') return 'INT';
  if (typeof val === 'boolean') return 'BOOLEAN';
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) return 'DATE';
    if (val.length > 255) return 'TEXT';
    return 'VARCHAR(255)';
  }
  if (Array.isArray(val) || typeof val === 'object') return 'JSON';
  return 'VARCHAR(255)';
}

/** Generate CREATE TABLE from first object or array of objects. */
export function jsonToSqlTable(obj: unknown, tableName: string = 'items'): string {
  let record: Record<string, unknown>;
  if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
    record = obj[0] as Record<string, unknown>;
  } else if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    record = obj as Record<string, unknown>;
  } else {
    return '-- No object or array of objects found';
  }
  const cols = Object.entries(record).map(([k, v]) => `  ${k.replace(/[^a-zA-Z0-9_]/g, '_')} ${sqlType(v)}`);
  return `CREATE TABLE ${tableName.replace(/[^a-zA-Z0-9_]/g, '_')} (\n${cols.join(',\n')}\n);`;
}

/** Generate API model (class/struct) in given language. */
export function jsonToModel(
  obj: unknown,
  lang: 'typescript' | 'python' | 'go' | 'java' | 'csharp',
  name: string = 'Model'
): string {
  let record: Record<string, unknown>;
  if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
    record = obj[0] as Record<string, unknown>;
  } else if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    record = obj as Record<string, unknown>;
  } else {
    return `// No object to generate model from`;
  }

  const typeMap: Record<string, Record<string, string>> = {
    typescript: { string: 'string', number: 'number', boolean: 'boolean', object: 'object', array: 'any[]' },
    python: { string: 'str', number: 'float', boolean: 'bool', object: 'dict', array: 'list' },
    go: { string: 'string', number: 'float64', boolean: 'bool', object: 'map[string]interface{}', array: '[]interface{}' },
    java: { string: 'String', number: 'Double', boolean: 'Boolean', object: 'Object', array: 'List<?>' },
    csharp: { string: 'string', number: 'double', boolean: 'bool', object: 'object', array: 'List<object>' },
  };
  const types = typeMap[lang];
  const fields = Object.entries(record).map(([k, v]) => ({ key: k, type: types[tsType(v).replace('[]', '')] || types.string }));

  if (lang === 'typescript') {
    return `interface ${name} {\n` + fields.map(f => `  ${f.key}: ${f.type};`).join('\n') + '\n}';
  }
  if (lang === 'python') {
    return `class ${name}:\n` + fields.map(f => `    ${f.key}: ${f.type}`).join('\n');
  }
  if (lang === 'go') {
    return `type ${name} struct {\n` + fields.map(f => `\t${f.key} ${f.type}`).join('\n') + '\n}';
  }
  if (lang === 'java') {
    return `public class ${name} {\n` + fields.map(f => `    public ${f.type} ${f.key};`).join('\n') + '\n}';
  }
  if (lang === 'csharp') {
    return `public class ${name}\n{\n` + fields.map(f => `    public ${f.type} ${f.key} { get; set; }`).join('\n') + '\n}';
  }
  return '';
}

/** Generate JSON Schema (Draft-7 style) from object. */
export function jsonToJsonSchema(obj: unknown): object {
  if (obj === null) return { type: 'null' };
  if (Array.isArray(obj)) {
    const item = obj[0];
    return { type: 'array', items: item !== undefined ? jsonToJsonSchema(item) : {} };
  }
  if (typeof obj === 'object') {
    const properties: Record<string, object> = {};
    for (const key of Object.keys(obj as Record<string, unknown>)) {
      properties[key] = jsonToJsonSchema((obj as Record<string, unknown>)[key]);
    }
    return { type: 'object', properties };
  }
  if (typeof obj === 'string') return { type: 'string' };
  if (typeof obj === 'number') return { type: Number.isInteger(obj) ? 'integer' : 'number' };
  if (typeof obj === 'boolean') return { type: 'boolean' };
  return { type: 'string' };
}

/** Analyze array of objects: length, common keys, unique keys. */
export function analyzeArray(arr: unknown): ArrayAnalysis | null {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const first = arr[0];
  if (typeof first !== 'object' || first === null) {
    return { length: arr.length, commonKeys: [], uniqueKeys: [], sampleKeys: [] };
  }
  const keySets = arr.map(item => typeof item === 'object' && item !== null ? new Set(Object.keys(item as object)) : new Set<string>());
  const allKeys = new Set<string>();
  keySets.forEach(s => s.forEach(k => allKeys.add(k)));
  const commonKeys = Array.from(allKeys).filter(k => keySets.every(s => s.has(k)));
  const uniqueKeys = Array.from(allKeys).filter(k => keySets.filter(s => s.has(k)).length === 1);
  return {
    length: arr.length,
    commonKeys,
    uniqueKeys,
    sampleKeys: Object.keys(first as object),
  };
}

/** Remove common API noise fields from object (recursive on first level). */
export function removeNoiseFields(obj: unknown, keysToRemove: Set<string> = NOISE_KEYS): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => removeNoiseFields(item, keysToRemove));
  const next: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (keysToRemove.has(k) || keysToRemove.has(k.toLowerCase())) continue;
    next[k] = removeNoiseFields(v, keysToRemove);
  }
  return next;
}

/** Generate N fake user-like objects for testing. */
export function generateRandomJson(count: number): object[] {
  const out: Array<{ id: number; name: string; email: string }> = [];
  for (let i = 1; i <= count; i++) {
    out.push({
      id: 1000 + i,
      name: `User_${1000 + i}`,
      email: `user${1000 + i}@test.com`,
    });
  }
  return out;
}
