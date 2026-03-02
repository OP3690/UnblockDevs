/**
 * Log Unpacker & Sanitizer Engine
 * 100% client-side. No network. No storage. No telemetry.
 * Recursive unescape, JWT/epoch/base64 detection, path scrubber, AI-safe output.
 *
 * Detection priority (deterministic):
 * 1. Recursive JSON parse
 * 2. JWT detection
 * 3. Base64 detection
 * 4. Epoch detection (numbers)
 * 5. Path scrub
 * 6. (Future) Generic PII detection
 */

const MAX_DEPTH = 8;
const MAX_INPUT_BYTES = 5_000_000;
const DEFAULT_MAX_TIME_MS = 100;

export type AnnotationType = 'jwt' | 'epoch' | 'path' | 'base64';
export type RiskLevel = 'high' | 'medium' | 'low';

export interface AnnotationMeta {
  type: AnnotationType;
  confidence?: number;
  risk?: RiskLevel;
  source?: string;
  source_context?: string;
}

/** Side-channel annotation item (path-based, for schema-safe output). */
export interface PathAnnotationItem {
  path: string;
  type: AnnotationType;
  risk?: RiskLevel;
  confidence?: number;
  decoded?: unknown;
  scrubbed?: string;
  original?: unknown;
  source_context?: string;
}

export interface SideChannelResult {
  data: unknown;
  __annotations: PathAnnotationItem[];
}

// --- Types ---
export interface EpochAnnotation {
  type: 'epoch';
  original: number;
  decoded: string;
  raw: number;
}

export interface JwtAnnotation {
  type: 'jwt';
  original: string;
  decoded: { header: unknown; payload: unknown };
  display: string;
}

export interface Base64Annotation {
  type: 'base64';
  original: string;
  decoded: string | null;
  valid: boolean;
}

export interface PathAnnotation {
  type: 'path';
  original: string;
  scrubbed: string;
}

export type AnnotatedValue =
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'epoch'; value: EpochAnnotation }
  | { type: 'jwt'; value: JwtAnnotation }
  | { type: 'base64'; value: Base64Annotation }
  | { type: 'path'; value: PathAnnotation }
  | { type: 'primitive'; value: unknown };

export interface UnpackResult {
  success: boolean;
  data: unknown;
  error?: string;
  annotations?: Map<string, AnnotatedValue>;
}

// --- Recursive JSON Unpacker ---
export function recursiveParse(input: string, maxDepth: number = MAX_DEPTH): { data: unknown; depth: number } {
  let current: unknown = input.trim();
  let depth = 0;

  while (depth < maxDepth) {
    if (typeof current !== 'string') break;
    const trimmed = current.trim();
    if (trimmed.length === 0) break;
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'string' && parsed === current) break;
      current = parsed;
      depth++;
    } catch {
      break;
    }
  }

  return { data: current, depth };
}

// --- Epoch detector (confidence 0.8 if plausible range) ---
const EPOCH_SECONDS_REGEX = /^1[5-9]\d{8}$/;
const EPOCH_MS_REGEX = /^1[5-9]\d{11}$/;
const EPOCH_PLAUSIBLE_YEAR_MIN = 2015;
const EPOCH_PLAUSIBLE_YEAR_MAX = 2035;

function epochConfidence(decodedIso: string): number {
  const year = new Date(decodedIso).getUTCFullYear();
  return year >= EPOCH_PLAUSIBLE_YEAR_MIN && year <= EPOCH_PLAUSIBLE_YEAR_MAX ? 0.8 : 0.5;
}

function detectEpoch(val: number): (EpochAnnotation & { confidence: number }) | null {
  const str = String(val);
  if (EPOCH_SECONDS_REGEX.test(str)) {
    const date = new Date(val * 1000);
    const decoded = date.toISOString();
    return { type: 'epoch', original: val, decoded, raw: val, confidence: epochConfidence(decoded) };
  }
  if (EPOCH_MS_REGEX.test(str)) {
    const date = new Date(val);
    const decoded = date.toISOString();
    return { type: 'epoch', original: val, decoded, raw: val, confidence: epochConfidence(decoded) };
  }
  return null;
}

// --- JWT detector & decoder (strict) ---
const BASE64URL_SEGMENT = /^[A-Za-z0-9\-_]+$/;

/** Only true if token has 3 base64url segments and decoded header contains alg. */
function isLikelyJwt(token: string): boolean {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return false;
  if (!parts.every((p) => BASE64URL_SEGMENT.test(p))) return false;
  try {
    const header = decodeJwtSegment(parts[0]);
    return typeof header === 'object' && header !== null && 'alg' in header;
  } catch {
    return false;
  }
}

/** Extract JWT from "Bearer <token>" or return whole string if it's a JWT. */
function extractJwt(value: string): string | null {
  const trimmed = value.trim();
  const bearerMatch = trimmed.match(/^Bearer\s+(.+)$/);
  if (bearerMatch) {
    const token = bearerMatch[1].trim();
    return isLikelyJwt(token) ? token : null;
  }
  return isLikelyJwt(trimmed) ? trimmed : null;
}

function decodeJwtSegment(segment: string): unknown {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return JSON.parse(atob(padded));
}

function decodeJwt(token: string): { header: unknown; payload: unknown } | null {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return null;
  try {
    return {
      header: decodeJwtSegment(parts[0]),
      payload: decodeJwtSegment(parts[1]),
    };
  } catch {
    return null;
  }
}

// --- Base64 detector ---
const BASE64_REGEX = /^[A-Za-z0-9+/]+=*$/;

function isLikelyBase64(str: string): boolean {
  if (str.length < 20) return false;
  if (str.length % 4 !== 0 && !str.endsWith('=')) return false;
  return BASE64_REGEX.test(str);
}

function tryDecodeBase64(str: string): Base64Annotation {
  try {
    const decoded = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const printable = /^[\x20-\x7E\n\r\t]*$/.test(decoded);
    return {
      type: 'base64',
      original: str,
      decoded: printable ? decoded : null,
      valid: true,
    };
  } catch {
    return { type: 'base64', original: str, decoded: null, valid: false };
  }
}

// --- Path scrubber (production: users, Lambda, Docker, AppData, node_modules) ---
function scrubPath(str: string): string {
  return str
    .replace(/([A-Z]:\\Users\\)[^\\]+/g, '$1~')
    .replace(/(\/Users\/)[^/]+/g, '$1~')
    .replace(/(\/home\/)[^/]+/g, '$1~')
    .replace(/([A-Z]:\\Users\\[^\\]*\\AppData\\)[^\\]+/g, '$1~')
    .replace(/\/var\/task\/[^/]+/, '/var/task/~')
    .replace(/\/app\/[^/]+/, '/app/~')
    .replace(/\/usr\/src\/app\/[^/]+/, '/usr/src/app/~')
    .replace(/\/node_modules\/[^/]+/, '/node_modules/~')
    .replace(/\\node_modules\\[^\\]+/, '\\node_modules\\~');
}

const WINDOWS_PATH_REGEX = /[A-Z]:\\Users\\[^\\]+/;
const UNIX_PATH_REGEX = /\/Users\/[^/]+/;
const LINUX_PATH_REGEX = /\/home\/[^/]+/;
const APPDATA_REGEX = /[A-Z]:\\Users\\[^\\]+\\AppData\\/;
const VAR_TASK_REGEX = /\/var\/task\//;
const DOCKER_APP_REGEX = /\/app\/[^/]/;
const USR_SRC_APP_REGEX = /\/usr\/src\/app\//;
const NODE_MODULES_REGEX = /[/\\]node_modules[/\\]/;

function isLikelyPath(str: string): boolean {
  return (
    WINDOWS_PATH_REGEX.test(str) ||
    UNIX_PATH_REGEX.test(str) ||
    LINUX_PATH_REGEX.test(str) ||
    APPDATA_REGEX.test(str) ||
    VAR_TASK_REGEX.test(str) ||
    DOCKER_APP_REGEX.test(str) ||
    USR_SRC_APP_REGEX.test(str) ||
    NODE_MODULES_REGEX.test(str)
  );
}

// --- JWT payload PII masking ---
const JWT_PII_KEYS = new Set(['sub', 'name', 'email', 'preferred_username', 'username', 'user_id', 'uid']);

function maskJwtPayload(payload: unknown, maskPii: boolean): unknown {
  if (!maskPii || payload === null || typeof payload !== 'object') return payload;
  const obj = payload as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const k = key.toLowerCase();
    if (JWT_PII_KEYS.has(k) && typeof obj[key] === 'string') {
      if (k === 'email') out[key] = '<EMAIL_REDACTED>';
      else if (k === 'name' || k === 'preferred_username' || k === 'username') out[key] = '<NAME_REDACTED>';
      else out[key] = '<ID_REDACTED>';
    } else {
      out[key] = obj[key];
    }
  }
  return out;
}

// --- Deep traversal with inspection ---
type VisitorResult = unknown;

interface TraverseContext {
  depthLeft: number;
  startTime: number;
  maxTimeMs: number;
  maskJwtPii: boolean;
}

function isOverBudget(ctx: TraverseContext): boolean {
  return ctx.depthLeft <= 0 || Date.now() - ctx.startTime > ctx.maxTimeMs;
}

/** Try to parse string as JSON and recursively inspect; only if it looks like JSON and within depth. */
function tryParseAndInspectString(value: string, ctx: TraverseContext): VisitorResult | null {
  if (isOverBudget(ctx)) return null;
  const trimmed = value.trim();
  if (trimmed.length < 2) return null;
  if (trimmed[0] !== '{' && trimmed[0] !== '[') return null;
  try {
    const parsed = JSON.parse(trimmed);
    return deepInspect(parsed, { ...ctx, depthLeft: ctx.depthLeft - 1 });
  } catch {
    return null;
  }
}

/** Run detection pipeline on decoded JWT payload/header so iat → epoch, etc. */
function inspectJwtDecoded(decoded: unknown, ctx: TraverseContext): unknown {
  if (decoded === null || typeof decoded !== 'object') return decoded;
  return deepInspect(decoded, { ...ctx, depthLeft: ctx.depthLeft - 1 });
}

function inspectString(value: string, ctx: TraverseContext): VisitorResult {
  // 1. Recursive JSON parse (priority 1)
  const parsed = tryParseAndInspectString(value, ctx);
  if (parsed !== null) return parsed;

  // 2. JWT (priority 2) — run detection on decoded payload/header; risk high
  const token = extractJwt(value);
  if (token) {
    const rawDecoded = decodeJwt(token);
    if (rawDecoded) {
      const header = inspectJwtDecoded(rawDecoded.header, ctx) as unknown;
      let payload = inspectJwtDecoded(rawDecoded.payload, ctx);
      payload = maskJwtPayload(payload, ctx.maskJwtPii);
      const fromBearer = value.trim().toLowerCase().startsWith('bearer');
      return {
        __meta: {
          type: 'jwt' as const,
          confidence: 1,
          risk: 'high' as const,
          source: fromBearer ? 'auth_header' : undefined,
          source_context: fromBearer ? 'Authorization: Bearer' : undefined,
        },
        __original: value,
        __decoded: { header, payload },
      };
    }
  }

  // 3. Base64 (priority 3) — confidence 0.6, risk low
  if (isLikelyBase64(value)) {
    const ann = tryDecodeBase64(value);
    if (ann.valid && ann.decoded) {
      return {
        __meta: { type: 'base64' as const, confidence: 0.6, risk: 'low' as const },
        __decoded: ann.decoded,
        __original: value.length > 50 ? value.substring(0, 50) + '...' : value,
      };
    }
  }

  // 4. Path (priority 5) — confidence 0.95, risk medium
  if (isLikelyPath(value)) {
    return {
      __meta: { type: 'path' as const, confidence: 0.95, risk: 'medium' as const },
      __scrubbed: scrubPath(value),
      __original: value,
    };
  }

  return value;
}

function inspectNumber(value: number): VisitorResult {
  const epoch = detectEpoch(value);
  if (epoch) {
    return {
      __meta: { type: 'epoch' as const, confidence: epoch.confidence, risk: 'low' as const },
      __decoded: epoch.decoded,
      __original: value,
    };
  }
  return value;
}

function deepInspect(value: unknown, ctx: TraverseContext): VisitorResult {
  if (isOverBudget(ctx)) return value;
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((v) => deepInspect(v, { ...ctx, depthLeft: ctx.depthLeft - 1 }));
  }
  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    const nextCtx = { ...ctx, depthLeft: ctx.depthLeft - 1 };
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepInspect((value as Record<string, unknown>)[key], nextCtx);
      }
    }
    return result;
  }
  if (typeof value === 'string') return inspectString(value, ctx);
  if (typeof value === 'number') return inspectNumber(value);
  return value;
}

// --- Side-channel: data intact + path-based annotations ---
interface SideChannelAcc {
  data: unknown;
  annotations: PathAnnotationItem[];
}

function pathJoin(prefix: string, key: string | number): string {
  return prefix ? `${prefix}.${key}` : String(key);
}

function inspectStringSideChannel(
  value: string,
  ctx: TraverseContext,
  path: string
): SideChannelAcc {
  const parsed = tryParseAndInspectString(value, ctx);
  if (parsed !== null) {
    const next = deepInspectSideChannel(parsed, { ...ctx, depthLeft: ctx.depthLeft - 1 }, path);
    return { data: next.data, annotations: next.annotations };
  }
  const token = extractJwt(value);
  if (token) {
    const rawDecoded = decodeJwt(token);
    if (rawDecoded) {
      const header = inspectJwtDecoded(rawDecoded.header, ctx) as unknown;
      let payload = inspectJwtDecoded(rawDecoded.payload, ctx);
      payload = maskJwtPayload(payload, ctx.maskJwtPii);
      const fromBearer = value.trim().toLowerCase().startsWith('bearer');
      return {
        data: value,
        annotations: [
          {
            path,
            type: 'jwt',
            risk: 'high',
            confidence: 1,
            decoded: { header, payload },
            original: value,
            source_context: fromBearer ? 'Authorization: Bearer' : undefined,
          },
        ],
      };
    }
  }
  if (isLikelyBase64(value)) {
    const ann = tryDecodeBase64(value);
    if (ann.valid && ann.decoded) {
      return {
        data: value,
        annotations: [
          { path, type: 'base64', confidence: 0.6, risk: 'low', decoded: ann.decoded, original: value },
        ],
      };
    }
  }
  if (isLikelyPath(value)) {
    return {
      data: value,
      annotations: [
        { path, type: 'path', confidence: 0.95, risk: 'medium', scrubbed: scrubPath(value), original: value },
      ],
    };
  }
  return { data: value, annotations: [] };
}

function deepInspectSideChannel(value: unknown, ctx: TraverseContext, pathPrefix: string): SideChannelAcc {
  if (isOverBudget(ctx)) return { data: value, annotations: [] };
  if (value === null || value === undefined) return { data: value, annotations: [] };
  if (Array.isArray(value)) {
    const arr: unknown[] = [];
    const annotations: PathAnnotationItem[] = [];
    const nextCtx = { ...ctx, depthLeft: ctx.depthLeft - 1 };
    value.forEach((v, i) => {
      const { data: d, annotations: a } = deepInspectSideChannel(v, nextCtx, pathJoin(pathPrefix, i));
      arr.push(d);
      annotations.push(...a);
    });
    return { data: arr, annotations };
  }
  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    const annotations: PathAnnotationItem[] = [];
    const nextCtx = { ...ctx, depthLeft: ctx.depthLeft - 1 };
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const subPath = pathJoin(pathPrefix, key);
        const child = (value as Record<string, unknown>)[key];
        if (typeof child === 'string') {
          const { data: d, annotations: a } = inspectStringSideChannel(child, nextCtx, subPath);
          result[key] = d;
          annotations.push(...a);
        } else if (typeof child === 'number') {
          const epoch = detectEpoch(child);
          if (epoch) {
            result[key] = child;
            annotations.push({
              path: subPath,
              type: 'epoch',
              confidence: epoch.confidence,
              risk: 'low',
              decoded: epoch.decoded,
              original: child,
            });
          } else {
            result[key] = child;
          }
        } else {
          const { data: d, annotations: a } = deepInspectSideChannel(child, nextCtx, subPath);
          result[key] = d;
          annotations.push(...a);
        }
      }
    }
    return { data: result, annotations };
  }
  if (typeof value === 'string') {
    return inspectStringSideChannel(value, ctx, pathPrefix);
  }
  if (typeof value === 'number') {
    const epoch = detectEpoch(value);
    if (epoch) {
      return {
        data: value,
        annotations: [
          {
            path: pathPrefix,
            type: 'epoch',
            confidence: epoch.confidence,
            risk: 'low',
            decoded: epoch.decoded,
            original: value,
          },
        ],
      };
    }
    return { data: value, annotations: [] };
  }
  return { data: value, annotations: [] };
}

// --- AI-safe: strip annotations and use scrubbed/redacted values ---
function annotationType(v: Record<string, unknown>): AnnotationType | undefined {
  const meta = v.__meta as AnnotationMeta | undefined;
  if (meta?.type) return meta.type;
  return (v.__annotation as AnnotationType) ?? undefined;
}

function toAiSafe(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(toAiSafe);
  if (typeof value === 'object' && value !== null) {
    const v = value as Record<string, unknown>;
    const type = annotationType(v);
    if (type === 'jwt') return '[JWT]';
    if (type === 'base64') return '[Base64]';
    if (type === 'path') return v.__scrubbed;
    if (type === 'epoch') return v.__decoded;
    const result: Record<string, unknown> = {};
    for (const key in v) {
      if (!key.startsWith('__')) result[key] = toAiSafe(v[key]);
    }
    return result;
  }
  return value;
}

// --- Main pipeline ---
export type AnnotationMode = 'inline' | 'sideChannel';

export interface ProcessLogOptions {
  scrubPaths?: boolean;
  aiSafeOutput?: boolean;
  /** Mask PII inside decoded JWT payload (sub, name, email, etc.). */
  maskJwtPii?: boolean;
  /** Abort traversal after this many ms (default 100). */
  maxTimeMs?: number;
  /** Inline: replace values with { __meta, __decoded, __original }. SideChannel: { data, __annotations } with structure intact. */
  annotationMode?: AnnotationMode;
}

export function processLog(inputRaw: string, options: ProcessLogOptions = {}): UnpackResult {
  if (typeof inputRaw !== 'string') {
    return { success: false, data: null, error: 'Input must be a string' };
  }
  if (new Blob([inputRaw]).size > MAX_INPUT_BYTES) {
    return { success: false, data: null, error: `Input too large (max ${MAX_INPUT_BYTES / 1_000_000}MB)` };
  }

  try {
    const { data: unpacked } = recursiveParse(inputRaw);
    const ctx: TraverseContext = {
      depthLeft: MAX_DEPTH,
      startTime: Date.now(),
      maxTimeMs: options.maxTimeMs ?? DEFAULT_MAX_TIME_MS,
      maskJwtPii: options.maskJwtPii ?? false,
    };
    const mode = options.annotationMode ?? 'inline';
    if (mode === 'sideChannel') {
      const { data, annotations } = deepInspectSideChannel(unpacked, ctx, '');
      const output: SideChannelResult = { data, __annotations: annotations };
      const final = options.aiSafeOutput ? getSanitizedFromSideChannel(output) : output;
      return { success: true, data: final };
    }
    const inspected = deepInspect(unpacked, ctx);
    const output = options.aiSafeOutput ? toAiSafe(inspected) : inspected;
    return { success: true, data: output };
  } catch (e) {
    return {
      success: false,
      data: null,
      error: e instanceof Error ? e.message : 'Parse failed',
    };
  }
}

/** Sanitized export: no __original, no __meta; only safe values (decoded timestamps, scrubbed paths, redacted JWTs). */
export function getSanitizedExport(input: unknown): unknown {
  if (isSideChannelResult(input)) return getSanitizedFromSideChannel(input);
  return toAiSafe(input);
}

function isSideChannelResult(v: unknown): v is SideChannelResult {
  return (
    typeof v === 'object' &&
    v !== null &&
    Array.isArray((v as SideChannelResult).__annotations) &&
    'data' in v
  );
}

/** Build sanitized object from side-channel result: data with values at annotation paths replaced by safe form. */
function getSanitizedFromSideChannel(result: SideChannelResult): unknown {
  const { data, __annotations } = result;
  if (__annotations.length === 1 && __annotations[0].path === '') return sanitizedValue(__annotations[0]);
  const out = JSON.parse(JSON.stringify(data));
  for (const a of __annotations) {
    if (a.path === '') continue;
    setByPath(out, a.path, sanitizedValue(a));
  }
  return out;
}

function sanitizedValue(a: PathAnnotationItem): unknown {
  if (a.type === 'epoch' && a.decoded != null) return a.decoded;
  if (a.type === 'path' && a.scrubbed != null) return a.scrubbed;
  if (a.type === 'jwt') return '[JWT]';
  if (a.type === 'base64') return '[Base64]';
  return a.original;
}

function setByPath(obj: unknown, path: string, value: unknown): void {
  const parts = path.split('.');
  let current: unknown = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = (current as Record<string, unknown>)?.[key];
    if (next === undefined || next === null) return;
    current = next;
  }
  const lastKey = parts[parts.length - 1];
  if (current !== null && typeof current === 'object' && lastKey !== undefined) {
    (current as Record<string, unknown>)[lastKey] = value;
  }
}

export function getAiSafeCopy(data: unknown): string {
  const safe = getSanitizedExport(data);
  return JSON.stringify(safe, null, 2);
}
