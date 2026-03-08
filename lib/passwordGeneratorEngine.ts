/**
 * Advanced Password Generator Engine
 * Crypto-secure random, passphrase, pattern, entropy, crack time, presets.
 * 100% client-side.
 */

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = '0O1lI|'; // exclude these when "exclude ambiguous" is on

/** Small Diceware-style word list (subset for passphrase) */
const WORDLIST = [
  'apple', 'beach', 'cactus', 'dragon', 'eagle', 'flame', 'grape', 'honey', 'island', 'jewel',
  'kite', 'laser', 'mountain', 'night', 'ocean', 'planet', 'quiet', 'river', 'sunset', 'tiger',
  'umbrella', 'valley', 'water', 'xray', 'yellow', 'zebra', 'anchor', 'bridge', 'cloud', 'desert',
  'earth', 'forest', 'galaxy', 'horizon', 'ice', 'jungle', 'kingdom', 'lighthouse', 'meadow', 'north',
  'oasis', 'pearl', 'quartz', 'rainbow', 'storm', 'temple', 'universe', 'volcano', 'waterfall', 'yacht',
  'alphabet', 'butterfly', 'crystal', 'diamond', 'elephant', 'firefly', 'guitar', 'harbor', 'infinity', 'journey',
  'keyboard', 'lightning', 'magnet', 'nebula', 'octopus', 'penguin', 'quasar', 'robot', 'shadow', 'telescope',
  'ultra', 'violet', 'winter', 'xenon', 'yoga', 'zenith', 'amber', 'blaze', 'comet', 'delta',
  'echo', 'falcon', 'glacier', 'haze', 'iris', 'jasmine', 'karma', 'lunar', 'mirage', 'nova',
  'orbit', 'prism', 'quest', 'radar', 'sierra', 'tango', 'unity', 'vortex', 'wizard', 'zephyr',
  'alpha', 'beta', 'gamma', 'delta', 'cosmic', 'dynamic', 'elastic', 'fusion', 'harmonic', 'ionic',
  'jade', 'keen', 'linear', 'mystic', 'noble', 'optic', 'prime', 'quantum', 'rapid', 'static',
  'titan', 'urban', 'vivid', 'wild', 'axis', 'blade', 'cipher', 'drift', 'ember', 'flux',
  'grid', 'haven', 'index', 'jolt', 'knife', 'logic', 'matrix', 'nexus', 'pulse', 'query',
  'rebel', 'scope', 'trace', 'ultra', 'vault', 'warp', 'zero', 'arc', 'bolt', 'core',
  'dash', 'edge', 'flare', 'glow', 'hex', 'iron', 'jade', 'kite', 'lock', 'mint',
  'node', 'opal', 'peak', 'quill', 'rust', 'spark', 'teal', 'unit', 'veil', 'wave',
];

export type GenerationMode = 'random' | 'passphrase' | 'pattern';

export interface CharSetOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  customSymbols?: string;
}

export interface PassphraseOptions {
  wordCount: number;
  separator: '-' | '_' | '.' | ' ';
  capitalize: boolean;
  addNumber: boolean;
  addSymbol: boolean;
}

export interface PolicyOptions {
  minLength: number;
  minNumbers: number;
  minSymbols: number;
  noRepeating: boolean;
}

export const PRESETS = [
  { id: 'ultra', name: 'Ultra Secure', length: 24, desc: '24 chars, all character types' },
  { id: 'website', name: 'Website Login', length: 16, desc: '16 chars, balanced' },
  { id: 'wifi', name: 'WiFi Password', length: 16, desc: '16 chars, easy to type' },
  { id: 'api', name: 'API Secret Key', length: 32, desc: '32 chars, high entropy' },
  { id: 'database', name: 'Database Password', length: 20, desc: '20 chars, strong' },
] as const;

const CRACK_SPEEDS = {
  offlineSlow: 1e9,      // 1B guesses/s
  offlineFast: 1e12,     // 1T guesses/s
  online: 10,            // 10 guesses/s
};

function getCharset(opts: CharSetOptions): string {
  let s = '';
  if (opts.uppercase) s += opts.excludeAmbiguous ? UPPER.replace(/O|I/g, '') : UPPER;
  if (opts.lowercase) s += opts.excludeAmbiguous ? LOWER.replace(/l|o/g, '') : LOWER;
  if (opts.numbers) s += opts.excludeAmbiguous ? DIGITS.replace(/0|1/g, '') : DIGITS;
  if (opts.symbols) s += opts.customSymbols?.trim() || SYMBOLS;
  return s || LOWER; // fallback
}

/** Cryptographically secure random string from charset */
export function randomFromCharset(length: number, charset: string): string {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  let out = '';
  const n = charset.length;
  for (let i = 0; i < length; i++) {
    out += charset[arr[i] % n];
  }
  return out;
}

/** Shuffle string (Fisher–Yates) using crypto random */
function shuffle(str: string): string {
  const a = str.split('');
  for (let i = a.length - 1; i > 0; i--) {
    const j = new Uint8Array(1);
    crypto.getRandomValues(j);
    const k = j[0] % (i + 1);
    [a[i], a[k]] = [a[k], a[i]];
  }
  return a.join('');
}

/** Generate random password satisfying policy (min numbers, min symbols) */
export function generateRandom(
  length: number,
  opts: CharSetOptions,
  policy?: Partial<PolicyOptions>
): string {
  const charset = getCharset(opts);
  const minN = policy?.minNumbers ?? 0;
  const minS = policy?.minSymbols ?? 0;
  const numSet = opts.numbers ? (opts.excludeAmbiguous ? '23456789' : DIGITS) : '';
  const symSet = opts.symbols ? (opts.customSymbols?.trim() || SYMBOLS) : '';

  let result = '';
  const used = new Set<string>();

  // Ensure minimums
  for (let i = 0; i < minN && numSet; i++) {
    result += numSet[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * numSet.length)];
  }
  for (let i = 0; i < minS && symSet; i++) {
    result += symSet[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * symSet.length)];
  }

  // Fill rest from full charset
  const need = length - result.length;
  if (need > 0) {
    result += randomFromCharset(need, charset);
  }

  if (policy?.noRepeating) {
    const arr = result.split('');
    const used = new Set<string>();
    for (let i = 0; i < arr.length; i++) {
      if (used.has(arr[i])) {
        for (let t = 0; t < 20; t++) {
          const alt = charset[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * charset.length)];
          if (!used.has(alt)) {
            arr[i] = alt;
            used.add(alt);
            break;
          }
        }
      } else {
        used.add(arr[i]);
      }
    }
    return shuffle(arr.join(''));
  }

  return shuffle(result);
}

/** Generate passphrase (Diceware-style) */
export function generatePassphrase(opts: PassphraseOptions): string {
  const words: string[] = [];
  for (let i = 0; i < opts.wordCount; i++) {
    const idx = crypto.getRandomValues(new Uint8Array(1))[0] % WORDLIST.length;
    let w = WORDLIST[idx];
    if (opts.capitalize && crypto.getRandomValues(new Uint8Array(1))[0] > 128) {
      w = w.charAt(0).toUpperCase() + w.slice(1);
    }
    words.push(w);
  }
  const sep = opts.separator === ' ' ? ' ' : opts.separator;
  let out = words.join(sep);
  if (opts.addNumber) {
    const n = Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * 10);
    out += sep + n;
  }
  if (opts.addSymbol) {
    const sym = '!@#$%^&*'[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * 8)];
    out += sep + sym;
  }
  return out;
}

/** Expand pattern A=upper, a=lower, 1=digit, !=symbol */
export function generateFromPattern(pattern: string, opts: CharSetOptions): string {
  const upper = opts.excludeAmbiguous ? UPPER.replace(/O|I/g, '') : UPPER;
  const lower = opts.excludeAmbiguous ? LOWER.replace(/l|o/g, '') : LOWER;
  const num = opts.excludeAmbiguous ? DIGITS.replace(/0|1/g, '') : DIGITS;
  const sym = opts.customSymbols?.trim() || SYMBOLS;
  const map: Record<string, string> = {
    A: upper, a: lower, '1': num, '!': sym,
  };
  let out = '';
  for (const c of pattern) {
    const set = map[c];
    if (set) {
      out += set[Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256 * set.length)];
    } else {
      out += c;
    }
  }
  return out;
}

/** Entropy in bits (log2(charsetSize^length)) */
export function entropy(password: string, charsetSize?: number): number {
  const n = password.length;
  if (n === 0) return 0;
  const size = charsetSize ?? 0;
  if (size > 0) return n * Math.log2(size);
  // Estimate charset from password
  let s = 0;
  if (/[A-Z]/.test(password)) s += 26;
  if (/[a-z]/.test(password)) s += 26;
  if (/[0-9]/.test(password)) s += 10;
  if (/[^A-Za-z0-9]/.test(password)) s += 32;
  return s <= 0 ? 0 : n * Math.log2(Math.max(s, 26));
}

/** Crack time in seconds at given guesses per second */
export function crackTimeSeconds(entropyBits: number, guessesPerSec: number): number {
  const combinations = Math.pow(2, entropyBits);
  return combinations / guessesPerSec;
}

export function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'instant';
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
  if (seconds < 86400 * 365) return `${(seconds / 86400).toFixed(0)} days`;
  if (seconds < 86400 * 365 * 1000) return `${(seconds / (86400 * 365)).toFixed(0)} years`;
  if (seconds < 86400 * 365 * 1e6) return `${(seconds / (86400 * 365 * 1000)).toFixed(0)} thousand years`;
  if (seconds < 86400 * 365 * 1e9) return `${(seconds / (86400 * 365 * 1e6)).toFixed(0)} million years`;
  return `${(seconds / (86400 * 365 * 1e9)).toFixed(0)} billion years`;
}

export type StrengthLevel = 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong' | 'Extreme';

export function getStrength(entropyBits: number): StrengthLevel {
  if (entropyBits < 28) return 'Very Weak';
  if (entropyBits < 36) return 'Weak';
  if (entropyBits < 60) return 'Fair';
  if (entropyBits < 80) return 'Strong';
  if (entropyBits < 100) return 'Very Strong';
  return 'Extreme';
}

/** Common weak patterns to avoid */
const WEAK_PATTERNS = [
  /^123456/, /^password$/i, /^qwerty$/i, /^abc123/, /^111111/, /^000000/,
  /^admin$/i, /^letmein$/i, /^welcome$/i, /^monkey$/i, /^dragon$/i, /^master$/i,
  /^sunshine$/i, /^princess$/i, /^football$/i, /^iloveyou$/i, /^admin123/,
  /^password1/, /^qwerty123/, /^12345678/, /^123456789/, /^1234567890/,
];

export function isCommonWeak(password: string): boolean {
  return WEAK_PATTERNS.some((r) => r.test(password));
}

/** Secret key types */
export const SECRET_KEY_TYPES = [
  { id: 'jwt', name: 'JWT Secret', length: 32, encoding: 'base64' as const },
  { id: 'api', name: 'API Key', length: 32, encoding: 'hex' as const },
  { id: 'oauth', name: 'OAuth Secret', length: 32, encoding: 'hex' as const },
  { id: 'encryption', name: 'Encryption Key', length: 32, encoding: 'hex' as const },
];

export function generateSecretKey(length: number, encoding: 'hex' | 'base64'): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  if (encoding === 'hex') {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Hash password with Web Crypto (SHA-256, SHA-512) */
export async function hashPassword(password: string, algorithm: 'SHA-256' | 'SHA-512'): Promise<string> {
  const enc = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest(algorithm, enc);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Have I Been Pwned k-anonymity check: SHA-1 prefix to API, compare suffix locally */
export async function checkPwned(password: string): Promise<{ pwned: boolean; count?: number }> {
  const enc = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', enc);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { Accept: 'text/plain' },
    });
    if (!res.ok) return { pwned: false };
    const text = await res.text();
    const lines = text.split('\r\n');
    for (const line of lines) {
      const [h, countStr] = line.split(':');
      if (h?.trim() === suffix) {
        return { pwned: true, count: parseInt(countStr || '0', 10) };
      }
    }
    return { pwned: false };
  } catch {
    return { pwned: false };
  }
}

/** Charset size for entropy from options */
export function getCharsetSize(opts: CharSetOptions): number {
  let n = 0;
  if (opts.uppercase) n += opts.excludeAmbiguous ? 24 : 26;
  if (opts.lowercase) n += opts.excludeAmbiguous ? 24 : 26;
  if (opts.numbers) n += opts.excludeAmbiguous ? 8 : 10;
  if (opts.symbols) n += (opts.customSymbols?.trim() || SYMBOLS).length;
  return n || 26;
}
