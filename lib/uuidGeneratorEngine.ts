/**
 * Advanced UUID / GUID Generator Engine
 * Supports v1, v3, v4, v5, v6, v7, v8. Validation, analysis, namespaces, export.
 * Uses crypto.getRandomValues / crypto.randomUUID. No server round-trip.
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_REGEX_LOOSE = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-8][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;

export const NAMESPACES = {
  DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
} as const;

export type UUIDVersion = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type OutputFormat = 'hyphenated' | 'uppercase' | 'no-hyphens' | 'urn';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  version?: number;
  variant?: string;
  normalized?: string;
}

export interface AnalysisResult {
  version: number;
  variant: string;
  timestamp?: string; // ISO / UTC
  timestampRaw?: number;
  timeLow?: string;
  timeMid?: string;
  timeHigh?: string;
  clockSeq?: string;
  node?: string;
  randomBits?: number;
  description: string;
}

export interface CompareResult {
  sameVersion: boolean;
  timestampDiffMs?: number;
  bitSimilarity: number; // 0-100
  aVersion: number;
  bVersion: number;
}

function hexToBytes(hex: string): Uint8Array {
  const h = hex.replace(/-/g, '');
  const arr = new Uint8Array(h.length / 2);
  for (let i = 0; i < h.length; i += 2) arr[i / 2] = parseInt(h.slice(i, i + 2), 16);
  return arr;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function normalize(uuid: string): string {
  const h = uuid.replace(/-/g, '').toLowerCase();
  if (h.length !== 32) return uuid;
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

export function validateUUID(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) return { valid: false, error: 'Empty input' };
  const normalized = normalize(trimmed);
  if (!UUID_REGEX_LOOSE.test(trimmed.replace(/-/g, ''))) return { valid: false, error: 'Invalid format (expected 32 hex chars, optional hyphens)' };
  const version = parseInt(normalized[14], 16);
  const variantNibble = parseInt(normalized[19], 16);
  const variant = (variantNibble & 0x8) ? 'RFC 4122' : (variantNibble & 0x4) ? 'Microsoft' : (variantNibble & 0x2) ? 'Reserved' : 'NCS';
  if (version < 1 || version > 8) return { valid: false, error: 'Invalid version bits', normalized };
  return { valid: true, version, variant, normalized };
}

export function parseUUID(uuid: string): { version: number; variant: string; bytes: Uint8Array } | null {
  const r = validateUUID(uuid);
  if (!r.valid || !r.normalized) return null;
  return {
    version: r.version!,
    variant: r.variant!,
    bytes: hexToBytes(r.normalized),
  };
}

export function getVersion(uuid: string): number | null {
  const n = normalize(uuid);
  if (n.length !== 36) return null;
  return parseInt(n[14], 16);
}

export function getVariant(uuid: string): string {
  const n = normalize(uuid);
  if (n.length !== 36) return 'Unknown';
  const v = parseInt(n[19], 16);
  if (v & 0x8) return 'RFC 4122';
  if (v & 0x4) return 'Microsoft';
  if (v & 0x2) return 'Reserved';
  return 'NCS';
}

export function formatUUID(uuid: string, format: OutputFormat): string {
  const n = normalize(uuid);
  if (format === 'urn') return `urn:uuid:${n.replace(/-/g, '')}`;
  if (format === 'no-hyphens') return n.replace(/-/g, '');
  if (format === 'uppercase') return n.toUpperCase();
  return n;
}

export function formatUUIDWithOptions(uuid: string, opts: { uppercase?: boolean; hyphens?: boolean; urn?: boolean }): string {
  let out = normalize(uuid);
  if (opts.urn) return `urn:uuid:${out.replace(/-/g, '')}`;
  if (opts.hyphens === false) out = out.replace(/-/g, '');
  if (opts.uppercase) out = out.toUpperCase();
  return out;
}

// --- Generation ---

const GREGORIAN_EPOCH_MS = new Date('1582-10-15T00:00:00Z').getTime();

function getRandomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
}

export function generateV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  const bytes = getRandomBytes(16);
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export function generateV1(): string {
  const now = Date.now();
  const ticks = (now - GREGORIAN_EPOCH_MS) * 10000; // 100ns units
  const timeLow = (ticks & 0xffffffff) >>> 0;
  const timeMid = ((ticks / 0x100000000) & 0xffff) >>> 0;
  const timeHigh = ((ticks / 0x1000000000000) & 0x0fff) >>> 0;
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, timeLow, false);
  view.setUint16(4, timeMid, false);
  view.setUint16(6, (0x1000 | timeHigh), false); // version 1
  const clockSeq = getRandomBytes(2);
  bytes[8] = (clockSeq[0]! & 0x3f) | 0x80;
  bytes[9] = clockSeq[1]!;
  const node = getRandomBytes(6);
  node[0] = (node[0]! | 0x01) & 0xfe; // multicast bit
  bytes.set(node, 10);
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

// Minimal MD5 for v3 (browser has no native MD5). Input: raw bytes with RFC 1321 padding.
function md5Bytes(data: Uint8Array): Uint8Array {
  const len = data.length;
  const bitLen = len * 8;
  const k = ((55 - len) % 64 + 64) % 64;
  const paddedLen = len + 1 + k + 8;
  const padded = new Uint8Array(paddedLen);
  padded.set(data);
  padded[len] = 0x80;
  const view = new DataView(padded.buffer, padded.byteOffset, padded.byteLength);
  view.setUint32(paddedLen - 8, bitLen >>> 0, true);
  view.setUint32(paddedLen - 4, Math.floor(bitLen / 0x100000000), true);
  const binStr = Array.from(padded).map((b) => String.fromCharCode(b)).join('');
  const md5hex = md5HexBinary(binStr);
  return hexToBytes(md5hex);
}

function md5HexBinary(s: string): string {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0]!, b = x[1]!, c = x[2]!, d = x[3]!;
    const F = (q: number, w: number, e: number) => (q & w) | (~q & e);
    const G = (q: number, w: number, e: number) => (q & e) | (w & ~e);
    const H = (q: number, w: number, e: number) => q ^ w ^ e;
    const I = (q: number, w: number, e: number) => w ^ (q | ~e);
    const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = (a + F(b, c, d) + x + ac) | 0;
      a = (((a << s) | (a >>> (32 - s))) + b) | 0;
      return a;
    };
    const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = (a + G(b, c, d) + x + ac) | 0;
      a = (((a << s) | (a >>> (32 - s))) + b) | 0;
      return a;
    };
    const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = (a + H(b, c, d) + x + ac) | 0;
      a = (((a << s) | (a >>> (32 - s))) + b) | 0;
      return a;
    };
    const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = (a + I(b, c, d) + x + ac) | 0;
      a = (((a << s) | (a >>> (32 - s))) + b) | 0;
      return a;
    };
    a = FF(a, b, c, d, k[0]!, 7, -680876936);
    d = FF(d, a, b, c, k[1]!, 12, -389564586);
    c = FF(c, d, a, b, k[2]!, 17, 606105819);
    b = FF(b, c, d, a, k[3]!, 22, -1044525330);
    a = FF(a, b, c, d, k[4]!, 7, -176418897);
    d = FF(d, a, b, c, k[5]!, 12, 1200080426);
    c = FF(c, d, a, b, k[6]!, 17, -1473231341);
    b = FF(b, c, d, a, k[7]!, 22, -45705983);
    a = FF(a, b, c, d, k[8]!, 7, 1770035416);
    d = FF(d, a, b, c, k[9]!, 12, -1958414417);
    c = FF(c, d, a, b, k[10]!, 17, -42063);
    b = FF(b, c, d, a, k[11]!, 22, -1990404162);
    a = FF(a, b, c, d, k[12]!, 7, 1804603682);
    d = FF(d, a, b, c, k[13]!, 12, -40341101);
    c = FF(c, d, a, b, k[14]!, 17, -1502002290);
    b = FF(b, c, d, a, k[15]!, 22, 1236535329);
    a = GG(a, b, c, d, k[1]!, 5, -165796510);
    d = GG(d, a, b, c, k[6]!, 9, -1069501632);
    c = GG(c, d, a, b, k[11]!, 14, 643717713);
    b = GG(b, c, d, a, k[0]!, 20, -373897302);
    a = GG(a, b, c, d, k[5]!, 5, -701558691);
    d = GG(d, a, b, c, k[10]!, 9, 38016083);
    c = GG(c, d, a, b, k[15]!, 14, -660478335);
    b = GG(b, c, d, a, k[4]!, 20, -405537848);
    a = GG(a, b, c, d, k[9]!, 5, 568446438);
    d = GG(d, a, b, c, k[14]!, 9, -1019803690);
    c = GG(c, d, a, b, k[3]!, 14, -187363961);
    b = GG(b, c, d, a, k[8]!, 20, 1163531501);
    a = GG(a, b, c, d, k[13]!, 5, -1444681467);
    d = GG(d, a, b, c, k[2]!, 9, -51403784);
    c = GG(c, d, a, b, k[7]!, 14, 1735328473);
    b = GG(b, c, d, a, k[12]!, 20, -1926607734);
    a = HH(a, b, c, d, k[5]!, 4, -378558);
    d = HH(d, a, b, c, k[8]!, 11, -2022574463);
    c = HH(c, d, a, b, k[11]!, 16, 1839030562);
    b = HH(b, c, d, a, k[14]!, 23, -35309556);
    a = HH(a, b, c, d, k[1]!, 4, -1530992060);
    d = HH(d, a, b, c, k[4]!, 11, 1272893353);
    c = HH(c, d, a, b, k[7]!, 16, -155497632);
    b = HH(b, c, d, a, k[10]!, 23, -1094730640);
    a = HH(a, b, c, d, k[13]!, 4, 681279174);
    d = HH(d, a, b, c, k[0]!, 11, -358537222);
    c = HH(c, d, a, b, k[3]!, 16, -722521979);
    b = HH(b, c, d, a, k[6]!, 23, 76029189);
    a = HH(a, b, c, d, k[9]!, 4, -640364487);
    d = HH(d, a, b, c, k[12]!, 11, -421815835);
    c = HH(c, d, a, b, k[15]!, 16, 530742520);
    b = HH(b, c, d, a, k[2]!, 23, -995338651);
    a = II(a, b, c, d, k[0]!, 6, -198630844);
    d = II(d, a, b, c, k[7]!, 10, 1126891415);
    c = II(c, d, a, b, k[14]!, 15, -1416354905);
    b = II(b, c, d, a, k[5]!, 21, -57434055);
    a = II(a, b, c, d, k[12]!, 6, 1700485571);
    d = II(d, a, b, c, k[3]!, 10, -1894986606);
    c = II(c, d, a, b, k[10]!, 15, -1051523);
    b = II(b, c, d, a, k[1]!, 21, -2054922799);
    a = II(a, b, c, d, k[8]!, 6, 1873313359);
    d = II(d, a, b, c, k[15]!, 10, -30611744);
    c = II(c, d, a, b, k[6]!, 15, -1560198380);
    b = II(b, c, d, a, k[13]!, 21, 1309151649);
    a = II(a, b, c, d, k[4]!, 6, -145523070);
    d = II(d, a, b, c, k[11]!, 10, -1120210379);
    c = II(c, d, a, b, k[2]!, 15, 718787259);
    b = II(b, c, d, a, k[9]!, 21, -343485551);
    x[0] = (a + x[0]!) | 0;
    x[1] = (b + x[1]!) | 0;
    x[2] = (c + x[2]!) | 0;
    x[3] = (d + x[3]!) | 0;
  }
  function md5blk(block: string): number[] {
    const out: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      out.push(
        (block.charCodeAt(i)!
          | (block.charCodeAt(i + 1)! << 8)
          | (block.charCodeAt(i + 2)! << 16)
          | (block.charCodeAt(i + 3)! << 24))
          >>> 0
      );
    }
    return out;
  }
  function toHex(w: number): string {
    let out = '';
    for (let j = 0; j < 4; j++) {
      const b = (w >> (j * 8)) & 0xff;
      out += (b < 16 ? '0' : '') + b.toString(16);
    }
    return out;
  }
  const state = [1732584193, -271733879, -1732584194, 271733878];
  for (let i = 0; i < s.length; i += 64) {
    const block = s.slice(i, i + 64);
    const x = md5blk(block);
    const a = state[0]!, b = state[1]!, c = state[2]!, d = state[3]!;
    md5cycle(state, x);
    state[0] = (state[0]! + a) | 0;
    state[1] = (state[1]! + b) | 0;
    state[2] = (state[2]! + c) | 0;
    state[3] = (state[3]! + d) | 0;
  }
  return state.map(toHex).join('');
}

// UTF-8 encode string to bytes for hashing
function utf8Encode(s: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(s);
}

function namespaceBytes(ns: string): Uint8Array {
  return hexToBytes(ns.replace(/-/g, ''));
}

export function generateV3(namespace: string, name: string): string {
  const nsBytes = namespaceBytes(namespace);
  const nameBytes = utf8Encode(name);
  const combined = new Uint8Array(nsBytes.length + nameBytes.length);
  combined.set(nsBytes);
  combined.set(nameBytes, nsBytes.length);
  const hash = md5Bytes(combined);
  hash[6] = (hash[6]! & 0x0f) | 0x30;
  hash[8] = (hash[8]! & 0x3f) | 0x80;
  return bytesToHex(hash).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export async function generateV5(namespace: string, name: string): Promise<string> {
  const nsBytes = namespaceBytes(namespace);
  const nameBytes = utf8Encode(name);
  const combined = new Uint8Array(nsBytes.length + nameBytes.length);
  combined.set(nsBytes);
  combined.set(nameBytes, nsBytes.length);
  const hash = await crypto.subtle.digest('SHA-1', combined);
  const bytes = new Uint8Array(hash).slice(0, 16);
  bytes[6] = (bytes[6]! & 0x0f) | 0x50;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export function generateV6(): string {
  const now = Date.now();
  const ticks = (now - GREGORIAN_EPOCH_MS) * 10000;
  const timeHigh = ((ticks / 0x1000000000000) & 0x0fff) >>> 0;
  const timeMid = ((ticks / 0x100000000) & 0xffff) >>> 0;
  const timeLow = (ticks & 0xffffffff) >>> 0;
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, timeHigh, false);
  view.setUint16(4, timeMid, false);
  view.setUint16(6, (0x6000 | (timeLow >>> 16)), false);
  view.setUint16(8, timeLow & 0xffff, false);
  const clockSeq = getRandomBytes(2);
  bytes[8] = (clockSeq[0]! & 0x3f) | 0x80;
  bytes[9] = clockSeq[1]!;
  bytes.set(getRandomBytes(6), 10);
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export function generateV7(): string {
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);
  const unixMs = Date.now();
  view.setUint32(0, Math.floor(unixMs / 0x100000000), false);
  view.setUint16(4, (unixMs >>> 16) & 0xffff, false);
  view.setUint16(6, (0x7000 | (unixMs & 0x0fff)), false);
  const rand = getRandomBytes(10);
  bytes[8] = (rand[0]! & 0x3f) | 0x80;
  bytes.set(rand.subarray(1), 9);
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export function generateV8(): string {
  const bytes = getRandomBytes(16);
  bytes[6] = (bytes[6]! & 0x0f) | 0x80;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  return bytesToHex(bytes).replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export function generate(version: UUIDVersion, options?: { namespace?: string; name?: string }): string | Promise<string> {
  switch (version) {
    case 1: return generateV1();
    case 3: return options?.namespace && options?.name ? generateV3(options.namespace, options.name) : generateV4();
    case 4: return generateV4();
    case 5: return options?.namespace && options?.name ? generateV5(options.namespace, options.name) : Promise.resolve(generateV4());
    case 6: return generateV6();
    case 7: return generateV7();
    case 8: return generateV8();
    default: return generateV4();
  }
}

// --- Analysis ---

export function analyzeUUID(uuid: string): AnalysisResult | null {
  const v = validateUUID(uuid);
  if (!v.valid || !v.normalized) return null;
  const n = v.normalized.replace(/-/g, '');
  const version = v.version!;
  const timeLow = n.slice(0, 8);
  const timeMid = n.slice(8, 12);
  const timeHigh = n.slice(12, 16);
  const clockSeq = n.slice(16, 20);
  const node = n.slice(20, 32);
  let description = `Version ${version}, variant ${v.variant}. `;
  let timestamp: string | undefined;
  let timestampRaw: number | undefined;
  if (version === 1 || version === 6) {
    const tl = parseInt(timeLow + timeMid + timeHigh.slice(0, 2), 16);
    const t = GREGORIAN_EPOCH_MS + tl / 10000;
    timestampRaw = t;
    timestamp = new Date(t).toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' UTC');
    description += 'Timestamp-based (100ns since 1582-10-15). ';
  } else if (version === 7) {
    const high = parseInt(n.slice(0, 8), 16);
    const low = parseInt(n.slice(8, 12), 16) & 0x0fff;
    const unixMs = high * 0x100000000 + (low >>> 0);
    timestampRaw = unixMs;
    timestamp = new Date(unixMs).toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' UTC');
    description += 'Unix timestamp (ms). ';
  }
  if (version === 4 || version === 8) description += 'Random bits: 122 (v4) or custom (v8). ';
  return {
    version,
    variant: v.variant!,
    timestamp,
    timestampRaw,
    timeLow,
    timeMid,
    timeHigh,
    clockSeq,
    node,
    randomBits: (version === 4 || version === 8) ? 122 : undefined,
    description: description.trim(),
  };
}

export function extractTimestamp(uuid: string): string | null {
  const a = analyzeUUID(uuid);
  return a?.timestamp ?? null;
}

// --- Collision probability ---

export function collisionProbability(count: number): number {
  if (count <= 0) return 0;
  const n = BigInt(count);
  const space = BigInt('0x100000000000000000000000000000000');
  let p = BigInt(1);
  for (let i = BigInt(0); i < n; i++) {
    p = (p * (space - i)) / space;
  }
  const prob = 1 - Number(p);
  return prob < 0 ? 0 : prob;
}

export function collisionProbabilityFormatted(count: number): string {
  const p = collisionProbability(count);
  if (p === 0) return '0%';
  if (p < 1e-15) return '< 0.0000000000001%';
  return `${(p * 100).toExponential(2)}%`;
}

// --- Compare ---

export function compareUUIDs(a: string, b: string): CompareResult | null {
  const va = validateUUID(a);
  const vb = validateUUID(b);
  if (!va.valid || !vb.valid) return null;
  const bytesA = hexToBytes(va.normalized!);
  const bytesB = hexToBytes(vb.normalized!);
  let same = 0;
  for (let i = 0; i < 16; i++) {
    for (let bit = 0; bit < 8; bit++) {
      if (((bytesA[i]! >> bit) & 1) === ((bytesB[i]! >> bit) & 1)) same++;
    }
  }
  let timestampDiffMs: number | undefined;
  const aa = analyzeUUID(a);
  const ab = analyzeUUID(b);
  if (aa?.timestampRaw != null && ab?.timestampRaw != null) {
    timestampDiffMs = Math.abs(aa.timestampRaw - ab.timestampRaw);
  }
  return {
    sameVersion: va.version === vb.version,
    timestampDiffMs,
    bitSimilarity: Math.round((same / 128) * 100),
    aVersion: va.version!,
    bVersion: vb.version!,
  };
}

// --- Export helpers ---

export function toSqlInsert(uuids: string[], tableName: string, columnName: string): string {
  const values = uuids.map((u) => `('${u}')`).join(',\n  ');
  return `INSERT INTO ${tableName} (${columnName})\nVALUES\n  ${values};`;
}

export function getSegmentDisplay(uuid: string): { part: string; label: string }[] {
  const n = normalize(uuid).split('-');
  if (n.length !== 5) return [];
  return [
    { part: n[0]!, label: 'time_low' },
    { part: n[1]!, label: 'time_mid' },
    { part: n[2]!, label: 'time_high_and_version' },
    { part: n[3]!, label: 'variant_and_clock_seq' },
    { part: n[4]!, label: 'node' },
  ];
}

export const DB_TIPS = [
  { title: 'Use UUID v7 for new databases', body: 'Time-sortable, better index performance than v4. Supported in PostgreSQL and many ORMs.' },
  { title: 'UUID v4 is widely supported', body: 'Fully random. Good default when you do not need time ordering.' },
  { title: 'UUID v6 for legacy compatibility', body: 'Reordered v1 for lexicographic time sort. Use if you need timestamp ordering with v1-style semantics.' },
  { title: 'Avoid storing as string when possible', body: 'Store as BINARY(16) or native UUID type to save space and speed up comparisons.' },
];

export const CODE_SNIPPETS: { lang: string; label: string; code: string }[] = [
  { lang: 'javascript', label: 'JavaScript (browser)', code: 'crypto.randomUUID()' },
  { lang: 'python', label: 'Python', code: 'import uuid\nuuid.uuid4()' },
  { lang: 'go', label: 'Go', code: 'import "github.com/google/uuid"\nuuid.New()' },
  { lang: 'node', label: 'Node.js', code: 'const { randomUUID } = require(\'crypto\');\nrandomUUID();' },
  { lang: 'sql', label: 'PostgreSQL', code: 'gen_random_uuid()' },
  { lang: 'csharp', label: 'C#', code: 'Guid.NewGuid()' },
];
