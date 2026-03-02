/**
 * Smart JSON Data Diff — client-side, semantic comparison.
 * Normalizes dynamic noise (UUID, ISO date, epoch, JWT, hash) then structural diff.
 */

const MAX_INPUT_BYTES = 5_000_000;
const MAX_DEPTH = 20;

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export interface EntropyEntry {
  path: string;
  key: string;
  reason: string;
}

export interface NormalizationConfig {
  maskUUID: boolean;
  maskISODate: boolean;
  maskEpoch: boolean;
  maskJWT: boolean;
  maskHash: boolean;
  maskPrefixedId?: boolean;
  ignoreKeyPatterns?: RegExp[];
  arrayIdentityKeys?: string[];
  /** 'ordered' = index/order matters; 'unordered' = treat arrays as sets (canonical sort) */
  arrayMode?: 'ordered' | 'unordered';
  /** If provided, will be filled with masked paths for entropy report */
  entropyLog?: EntropyEntry[];
}

export type DiffType = 'added' | 'removed' | 'changed' | 'value_changed' | 'type_changed';

export interface DiffEntry {
  path: string;
  type: DiffType;
  before?: JSONValue;
  after?: JSONValue;
}

// --- Safe parse + guards ---
function getDepth(value: unknown, current = 0): number {
  if (current > MAX_DEPTH) return current;
  if (value === null || typeof value !== 'object') return current;
  if (Array.isArray(value)) {
    let max = current + 1;
    for (let i = 0; i < value.length; i++) {
      const d = getDepth(value[i], current + 1);
      if (d > max) max = d;
    }
    return max;
  }
  let max = current + 1;
  for (const k in value as Record<string, unknown>) {
    const d = getDepth((value as Record<string, unknown>)[k], current + 1);
    if (d > max) max = d;
  }
  return max;
}

export function safeParse(input: string): JSONValue {
  if (typeof input !== 'string') throw new Error('Input must be a string');
  if (new Blob([input]).size > MAX_INPUT_BYTES) throw new Error('Input too large (max 5MB)');
  const parsed = JSON.parse(input) as JSONValue;
  if (getDepth(parsed) > MAX_DEPTH) throw new Error('JSON nesting too deep (max 20)');
  return parsed;
}

// --- Pattern regexes ---
const uuidRegex =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i;
const isoRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z\b/;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
const hashRegex = /\b[a-f0-9]{32,64}\b/i;
/** Runtime IDs like rec_998877, ord_abc123 */
const prefixedIdRegex = /^[a-z]{2,}_[a-z0-9]+$/i;
const tokenKeyRegex = /^(session_token|auth_token|access_token|api_key)$/i;

function normalizeString(
  val: string,
  config: NormalizationConfig,
  currentKey?: string,
  path?: string
): string {
  const log = (reason: string) => {
    if (path !== undefined && config.entropyLog && currentKey) config.entropyLog.push({ path, key: currentKey, reason });
  };
  if (config.maskJWT && currentKey && tokenKeyRegex.test(currentKey)) {
    log('JWT (key)');
    return '<JWT>';
  }
  if (config.maskUUID && uuidRegex.test(val)) {
    log('UUID');
    return '<UUID>';
  }
  if (config.maskISODate && isoRegex.test(val)) {
    log('ISO_DATE');
    return '<ISO_DATE>';
  }
  if (config.maskJWT && jwtRegex.test(val)) {
    log('JWT');
    return '<JWT>';
  }
  if (config.maskHash && hashRegex.test(val)) {
    log('HASH');
    return '<HASH>';
  }
  if (config.maskPrefixedId && prefixedIdRegex.test(val) && val.length < 64) {
    log('PREFIXED_ID');
    return '<ID>';
  }
  if (config.maskJWT) {
    const replaced = val.replace(/Bearer\s+[A-Za-z0-9\-_.]+/i, 'Bearer <JWT>');
    if (replaced !== val) log('JWT (Bearer)');
    return replaced;
  }
  return val;
}

function normalizeNumber(
  val: number,
  config: NormalizationConfig,
  currentKey?: string,
  path?: string
): JSONValue {
  if (config.maskEpoch && val > 1_000_000_000 && val < 9_999_999_999_999) {
    if (path !== undefined && config.entropyLog && currentKey) config.entropyLog.push({ path, key: currentKey, reason: 'EPOCH' });
    return '<EPOCH>';
  }
  return val;
}

export function normalize(
  value: JSONValue,
  config: NormalizationConfig,
  currentKey?: string,
  path = ''
): JSONValue {
  const fullPath = path ? (currentKey ? `${path}.${currentKey}` : path) : currentKey || '';

  if (currentKey && config.ignoreKeyPatterns?.length) {
    if (config.ignoreKeyPatterns.some((r) => r.test(currentKey))) {
      if (config.entropyLog) config.entropyLog.push({ path: fullPath, key: currentKey, reason: 'IGNORED_KEY' });
      return '<IGNORED>';
    }
  }
  if (Array.isArray(value)) {
    return value.map((v, i) => normalize(v, config, undefined, `${path}${path ? '.' : ''}[${i}]`));
  }
  if (value && typeof value === 'object') {
    const result: JSONObject = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = normalize(value[key], config, key, path ? `${path}.${key}` : key);
      }
    }
    return result;
  }
  if (typeof value === 'string') return normalizeString(value, config, currentKey, fullPath);
  if (typeof value === 'number') return normalizeNumber(value, config, currentKey, fullPath);
  return value;
}

export function canonicalize(value: JSONValue, config?: NormalizationConfig): JSONValue {
  if (Array.isArray(value)) {
    const mapped = value.map((v) => canonicalize(v, config)) as JSONArray;
    if (config?.arrayMode === 'unordered') {
      return [...mapped].sort((a, b) => {
        const sa = JSON.stringify(a);
        const sb = JSON.stringify(b);
        return sa < sb ? -1 : sa > sb ? 1 : 0;
      }) as JSONArray;
    }
    return mapped;
  }
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonicalize((value as JSONObject)[key], config);
        return acc;
      }, {} as JSONObject);
  }
  return value;
}

function buildIdentityMap(
  arr: JSONArray,
  identityKeys: string[]
): Map<string, JSONValue> {
  const map = new Map<string, JSONValue>();
  for (const item of arr) {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      const obj = item as JSONObject;
      for (const key of identityKeys) {
        if (key in obj) {
          map.set(String(obj[key]), item);
          break;
        }
      }
    }
  }
  return map;
}

function structuralDiff(
  a: JSONValue,
  b: JSONValue,
  config: NormalizationConfig,
  path: string
): DiffEntry[] {
  const changes: DiffEntry[] = [];

  if (typeof a !== typeof b) {
    changes.push({ path: path || 'root', type: 'type_changed', before: a, after: b });
    return changes;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (config.arrayIdentityKeys?.length) {
      const mapA = buildIdentityMap(a, config.arrayIdentityKeys);
      const mapB = buildIdentityMap(b, config.arrayIdentityKeys);
      const prefix = path ? `${path}.` : '';
      for (const [id, itemA] of mapA) {
        if (!mapB.has(id)) {
          changes.push({ path: `${prefix}[id=${id}]`, type: 'removed', before: itemA });
        } else {
          changes.push(
            ...structuralDiff(itemA, mapB.get(id)!, config, `${prefix}[id=${id}]`)
          );
        }
      }
      for (const [id, itemB] of mapB) {
        if (!mapA.has(id)) {
          changes.push({ path: `${prefix}[id=${id}]`, type: 'added', after: itemB });
        }
      }
      return changes;
    }
    const maxLen = Math.max(a.length, b.length);
    const prefix = path ? `${path}.` : '';
    for (let i = 0; i < maxLen; i++) {
      const aVal = a[i];
      const bVal = b[i];
      if (i >= a.length) {
        changes.push({ path: `${prefix}[${i}]`, type: 'added', after: bVal });
      } else if (i >= b.length) {
        changes.push({ path: `${prefix}[${i}]`, type: 'removed', before: aVal });
      } else {
        changes.push(...structuralDiff(aVal, bVal, config, `${prefix}[${i}]`));
      }
    }
    return changes;
  }

  if (a !== null && typeof a === 'object' && b !== null && typeof b === 'object') {
    const objA = a as JSONObject;
    const objB = b as JSONObject;
    const keys = new Set([...Object.keys(objA), ...Object.keys(objB)]);
    const prefix = path ? `${path}.` : '';
    for (const key of keys) {
      const subPath = prefix ? `${path}.${key}` : key;
      if (!(key in objA)) {
        changes.push({ path: subPath, type: 'added', after: objB[key] });
      } else if (!(key in objB)) {
        changes.push({ path: subPath, type: 'removed', before: objA[key] });
      } else {
        changes.push(...structuralDiff(objA[key], objB[key], config, subPath));
      }
    }
    return changes;
  }

  if (a !== b) {
    const type: DiffType = typeof a === typeof b ? 'value_changed' : 'type_changed';
    changes.push({ path: path || 'root', type, before: a, after: b });
  }
  return changes;
}

function countKeys(value: unknown): number {
  if (value === null || typeof value !== 'object') return 0;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countKeys(v), 0);
  let n = Object.keys(value as object).length;
  for (const k of Object.keys(value as object)) {
    n += countKeys((value as Record<string, unknown>)[k]);
  }
  return n;
}

export interface SmartDiffResult {
  changes: DiffEntry[];
  entropyReport: EntropyEntry[];
  normalizedA: string;
  normalizedB: string;
  payloadSizeA: number;
  payloadSizeB: number;
  depthA: number;
  depthB: number;
  fieldCountA: number;
  fieldCountB: number;
}

export function smartDiff(
  rawA: string,
  rawB: string,
  config: NormalizationConfig
): SmartDiffResult {
  const entropyLog: EntropyEntry[] = [];
  const configWithLog = { ...config, entropyLog };
  const parsedA = safeParse(rawA);
  const parsedB = safeParse(rawB);
  const normA = canonicalize(normalize(parsedA, configWithLog), configWithLog);
  const normB = canonicalize(normalize(parsedB, config), config);
  const changes = structuralDiff(normA, normB, configWithLog, '');
  const seen = new Set<string>();
  const entropyReport = entropyLog.filter((e) => {
    const id = `${e.path}.${e.key}.${e.reason}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  return {
    changes,
    entropyReport,
    normalizedA: JSON.stringify(normA, null, 2),
    normalizedB: JSON.stringify(normB, null, 2),
    payloadSizeA: new Blob([rawA]).size,
    payloadSizeB: new Blob([rawB]).size,
    depthA: getDepth(parsedA),
    depthB: getDepth(parsedB),
    fieldCountA: countKeys(parsedA),
    fieldCountB: countKeys(parsedB),
  };
}

/** Default ignore patterns: request_id, trace_id, correlation_id, session_id, tokens, timestamps (camel + snake) */
const DEFAULT_IGNORE_KEY_PATTERNS = [
  /\b(request_id|trace_id|correlation_id|session_id|requestId|traceId|correlationId|timestamp|createdAt|updatedAt)\b/i,
  /\b(session_token|auth_token|access_token)\b/i,
];

export const defaultNormalizationConfig: NormalizationConfig = {
  maskUUID: true,
  maskISODate: true,
  maskEpoch: true,
  maskJWT: true,
  maskHash: true,
  maskPrefixedId: true,
  ignoreKeyPatterns: DEFAULT_IGNORE_KEY_PATTERNS,
  arrayIdentityKeys: ['id', 'user_id', '_id'],
  arrayMode: 'unordered',
};
