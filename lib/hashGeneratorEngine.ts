/**
 * Hash Generator Engine — multi-algorithm hashing, HMAC, password hashes, verification.
 * Uses @noble/hashes (and bcryptjs for bcrypt). All processing is designed for client/browser.
 */

import { md5, sha1 } from '@noble/hashes/legacy';
import { sha224, sha256, sha384, sha512 } from '@noble/hashes/sha2';
import { sha3_256, sha3_512 } from '@noble/hashes/sha3';
import { blake2b, blake2s } from '@noble/hashes/blake2';
import { hmac } from '@noble/hashes/hmac';
import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { scryptAsync } from '@noble/hashes/scrypt';
import { argon2idAsync } from '@noble/hashes/argon2';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';
import bcrypt from 'bcryptjs';

// ─── Algorithm IDs and metadata ───────────────────────────────────────────
export const CLASSIC_ALGORITHMS = [
  { id: 'md5', name: 'MD5', secure: 'broken' as const },
  { id: 'sha1', name: 'SHA-1', secure: 'weak' as const },
  { id: 'sha224', name: 'SHA-224', secure: 'secure' as const },
  { id: 'sha256', name: 'SHA-256', secure: 'secure' as const },
  { id: 'sha384', name: 'SHA-384', secure: 'secure' as const },
  { id: 'sha512', name: 'SHA-512', secure: 'secure' as const },
] as const;

export const MODERN_ALGORITHMS = [
  { id: 'sha3-256', name: 'SHA3-256', secure: 'secure' as const },
  { id: 'sha3-512', name: 'SHA3-512', secure: 'secure' as const },
  { id: 'blake2b', name: 'BLAKE2b', secure: 'secure' as const },
  { id: 'blake2s', name: 'BLAKE2s', secure: 'secure' as const },
] as const;

export type ClassicAlgId = (typeof CLASSIC_ALGORITHMS)[number]['id'];
export type ModernAlgId = (typeof MODERN_ALGORITHMS)[number]['id'];
export type HashAlgId = ClassicAlgId | ModernAlgId;

export const ALL_HASH_ALGORITHMS = [...CLASSIC_ALGORITHMS, ...MODERN_ALGORITHMS];

export type OutputEncoding = 'hex' | 'base64' | 'hex-upper';

const UTF8 = new TextEncoder();

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(bytes).toString('base64');
}

function formatHash(raw: string, encoding: OutputEncoding): string {
  if (encoding === 'hex-upper') return raw.toUpperCase();
  return raw;
}

// ─── Single hash from bytes ──────────────────────────────────────────────────
function hashBytesInternal(algId: HashAlgId, data: Uint8Array): Uint8Array {
  switch (algId) {
    case 'md5':
      return md5(data);
    case 'sha1':
      return sha1(data);
    case 'sha224':
      return sha224(data);
    case 'sha256':
      return sha256(data);
    case 'sha384':
      return sha384(data);
    case 'sha512':
      return sha512(data);
    case 'sha3-256':
      return sha3_256(data);
    case 'sha3-512':
      return sha3_512(data);
    case 'blake2b':
      return blake2b(data, { dkLen: 64 });
    case 'blake2s':
      return blake2s(data, { dkLen: 32 });
    default:
      return sha256(data);
  }
}

export function hashBytes(algId: HashAlgId, data: Uint8Array, encoding: OutputEncoding = 'hex'): string {
  const out = hashBytesInternal(algId, data);
  const hex = bytesToHex(out);
  if (encoding === 'base64') return bytesToBase64(out);
  return formatHash(hex, encoding);
}

export function hashText(algId: HashAlgId, text: string, encoding: OutputEncoding = 'hex'): string {
  return hashBytes(algId, UTF8.encode(text), encoding);
}

export async function hashFile(
  algId: HashAlgId,
  file: File,
  encoding: OutputEncoding = 'hex',
  onProgress?: (pct: number) => void
): Promise<string> {
  const buf = await file.arrayBuffer();
  if (onProgress) onProgress(100);
  return hashBytes(algId, new Uint8Array(buf), encoding);
}

// ─── HMAC ───────────────────────────────────────────────────────────────────
function getHmacHash(algId: HashAlgId): typeof sha256 {
  switch (algId) {
    case 'md5':
      return md5 as unknown as typeof sha256;
    case 'sha1':
      return sha1 as unknown as typeof sha256;
    case 'sha224':
      return sha224;
    case 'sha256':
      return sha256;
    case 'sha384':
      return sha384;
    case 'sha512':
      return sha512;
    case 'sha3-256':
      return sha3_256 as unknown as typeof sha256;
    case 'sha3-512':
      return sha3_512 as unknown as typeof sha256;
    case 'blake2b':
      return blake2b as unknown as typeof sha256;
    case 'blake2s':
      return blake2s as unknown as typeof sha256;
    default:
      return sha256;
  }
}

export function hmacHash(algId: HashAlgId, key: string, message: string, encoding: OutputEncoding = 'hex'): string {
  const keyBytes = UTF8.encode(key);
  const msgBytes = UTF8.encode(message);
  const hashFn = getHmacHash(algId);
  const out = hmac(hashFn, keyBytes, msgBytes);
  const hex = bytesToHex(out);
  if (encoding === 'base64') return bytesToBase64(out);
  return formatHash(hex, encoding);
}

// ─── Password hashes ─────────────────────────────────────────────────────────
export function generateSalt(bytes: number = 16): string {
  return bytesToHex(randomBytes(bytes));
}

export function bcryptHash(password: string, rounds: number = 10): string {
  const s = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(password, s);
}

export function pbkdf2Hash(
  password: string,
  salt: string,
  iterations: number = 100000,
  keyLen: number = 32,
  alg: 'sha256' | 'sha512' = 'sha256',
  encoding: OutputEncoding = 'hex'
): string {
  const hashFn = alg === 'sha512' ? sha512 : sha256;
  const out = pbkdf2(hashFn, UTF8.encode(password), UTF8.encode(salt), { c: iterations, dkLen: keyLen });
  const hex = bytesToHex(out);
  if (encoding === 'base64') return bytesToBase64(out);
  return formatHash(hex, encoding);
}

export async function scryptHash(
  password: string,
  salt: string,
  N: number = 16384,
  r: number = 8,
  p: number = 1,
  dkLen: number = 32,
  encoding: OutputEncoding = 'hex'
): Promise<string> {
  const out = await scryptAsync(UTF8.encode(password), UTF8.encode(salt), { N, r, p, dkLen });
  const hex = bytesToHex(out);
  if (encoding === 'base64') return bytesToBase64(out);
  return formatHash(hex, encoding);
}

export async function argon2Hash(
  password: string,
  salt: string,
  options: { m?: number; t?: number; p?: number } = {},
  encoding: OutputEncoding = 'hex'
): Promise<string> {
  const { m = 65536, t = 3, p = 4 } = options;
  const saltBytes = UTF8.encode(salt).length >= 8 ? UTF8.encode(salt) : randomBytes(16);
  const out = await argon2idAsync(UTF8.encode(password), saltBytes, { m, t, p, dkLen: 32 });
  const hex = bytesToHex(out);
  if (encoding === 'base64') return bytesToBase64(out);
  return formatHash(hex, encoding);
}

// ─── Verify & compare ────────────────────────────────────────────────────────
export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function compareTwoHashes(hashA: string, hashB: string): { match: boolean; diffIndices: number[] } {
  const na = hashA.replace(/\s/g, '').toLowerCase();
  const nb = hashB.replace(/\s/g, '').toLowerCase();
  const diffIndices: number[] = [];
  const len = Math.max(na.length, nb.length);
  for (let i = 0; i < len; i++) {
    if (na[i] !== nb[i]) diffIndices.push(i);
  }
  return { match: diffIndices.length === 0, diffIndices };
}

// ─── Security analyzer ──────────────────────────────────────────────────────
export const SECURITY_ANALYSIS: Record<string, { status: string; short: string; risk: string }> = {
  md5: { status: 'Broken', short: 'Collision attacks possible', risk: 'High' },
  sha1: { status: 'Weak', short: 'Deprecated for security', risk: 'Medium' },
  sha224: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  sha256: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  sha384: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  sha512: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  'sha3-256': { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  'sha3-512': { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  blake2b: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
  blake2s: { status: 'Secure', short: 'Recommended', risk: 'Extremely low' },
};

// ─── Hash visualization (chunked) ────────────────────────────────────────────
export function hashChunks(hash: string, chunkLen: number = 8): string[] {
  const clean = hash.replace(/\s/g, '');
  const chunks: string[] = [];
  for (let i = 0; i < clean.length; i += chunkLen) chunks.push(clean.slice(i, i + chunkLen));
  return chunks;
}

// ─── API request string (for signing) ──────────────────────────────────────────
export function buildRequestString(method: string, url: string, body: string): string {
  return [method.toUpperCase(), url.trim(), body].join('\n');
}

// ─── Cracking difficulty estimator ──────────────────────────────────────────
const HASHES_PER_SEC_GPU = 1e9; // rough
const SEC_PER_YEAR = 365.25 * 24 * 60 * 60;

export function estimateCrackTime(
  passwordLength: number,
  charsetSize: number
): { combinations: string; years: number; label: string } {
  const combinations = Math.pow(charsetSize, passwordLength);
  const seconds = combinations / HASHES_PER_SEC_GPU;
  const years = seconds / SEC_PER_YEAR;
  let label = 'Milliseconds';
  if (years >= 1e9) label = 'Billions of years';
  else if (years >= 1e6) label = 'Millions of years';
  else if (years >= 1000) label = 'Thousands of years';
  else if (years >= 1) label = `${Math.round(years)} years`;
  else if (seconds >= 3600) label = `${Math.round(seconds / 3600)} hours`;
  else if (seconds >= 60) label = `${Math.round(seconds / 60)} minutes`;
  else if (seconds >= 1) label = `${Math.round(seconds)} seconds`;
  return {
    combinations: combinations.toExponential(2),
    years,
    label,
  };
}

export const CHARSET_SIZES = [
  { id: 10, label: 'Digits (10)' },
  { id: 26, label: 'Lowercase (26)' },
  { id: 52, label: 'Letters (52)' },
  { id: 62, label: 'Alphanumeric (62)' },
  { id: 95, label: 'Printable ASCII (95)' },
];

// ─── Code examples ──────────────────────────────────────────────────────────
export function getCodeExample(algId: HashAlgId, lang: 'js' | 'py' | 'go', inputVar: string = 'hello'): string {
  const algName = algId === 'sha3-256' ? 'sha3-256' : algId === 'sha3-512' ? 'sha3-512' : algId;
  switch (lang) {
    case 'js':
      return `const crypto = require("crypto");
crypto.createHash("${algName}").update("${inputVar}").digest("hex");`;
    case 'py':
      return `import hashlib
hashlib.${algId.replace('-', '_')}(b"${inputVar}").hexdigest()`;
    case 'go':
      return `import "crypto/sha256"
h := sha256.Sum256([]byte("${inputVar}"))
hex.EncodeToString(h[:])`;
    default:
      return '';
  }
}

export const CODE_EXAMPLES = {
  js: `const crypto = require("crypto");
const hash = crypto.createHash("sha256").update("hello").digest("hex");
console.log(hash);`,
  py: `import hashlib
h = hashlib.sha256(b"hello").hexdigest()
print(h)`,
  go: `package main
import ("crypto/sha256"; "encoding/hex")
func main() {
  h := sha256.Sum256([]byte("hello"))
  println(hex.EncodeToString(h[:]))
}`,
};

// ─── Export report ──────────────────────────────────────────────────────────
export function buildHashReport(
  input: string,
  hashes: Record<string, string>,
  meta?: { fileName?: string; fileSize?: number }
): string {
  return JSON.stringify(
    {
      input: input || (meta?.fileName ?? 'file'),
      ...(meta && { file: meta }),
      hashes,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildHashCsv(rows: { input: string; algorithm: string; hash: string }[]): string {
  const header = 'Input,Algorithm,Hash';
  const body = rows.map((r) => `"${r.input.replace(/"/g, '""')}","${r.algorithm}","${r.hash}"`).join('\n');
  return header + '\n' + body;
}
