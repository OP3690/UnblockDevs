/**
 * Base64 Encoder / Decoder Engine
 * RFC 4648 Standard, Base64URL, MIME, No-Padding. Content detection, security scan.
 * 100% client-side.
 */

export type Variant = 'standard' | 'url' | 'mime' | 'nopad';

const MAX_INPUT_CHARS = 500_000;
const LARGE_INPUT_WARN = 100_000;

export function getMaxInputChars(): number {
  return MAX_INPUT_CHARS;
}

export function getLargeInputWarnChars(): number {
  return LARGE_INPUT_WARN;
}

/** Normalize pasted input: strip Bearer, whitespace, quotes */
export function sanitizeInput(raw: string): string {
  return raw
    .trim()
    .replace(/^Bearer\s+/i, '')
    .replace(/[\r\n]+/g, '\n')
    .replace(/^['"]|['"]$/g, '');
}

/** Apply variant to standard Base64 string */
export function applyVariant(b64: string, variant: Variant): string {
  switch (variant) {
    case 'url':
      return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    case 'mime': {
      const lines = b64.match(/.{1,76}/g) || [];
      return lines.join('\r\n');
    }
    case 'nopad':
      return b64.replace(/=/g, '');
    default:
      return b64;
  }
}

/** Encode text to Base64 with chosen variant */
export function encodeBase64(text: string, variant: Variant): string {
  const bytes = new TextEncoder().encode(text);
  const binaryStr = String.fromCharCode(...bytes);
  const b64 = btoa(binaryStr);
  return applyVariant(b64, variant);
}

/** Normalize Base64 string before decoding (URL-safe → standard, strip whitespace, add padding) */
export function normalizeForDecode(input: string): string {
  let s = input.trim();
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  s = s.replace(/%2B/gi, '+').replace(/%2F/gi, '/');
  s = s.replace(/[\s\r\n]/g, '');
  const padLen = (4 - (s.length % 4)) % 4;
  return s + '='.repeat(padLen);
}

export interface DecodeResult {
  success: boolean;
  text?: string;
  bytes?: Uint8Array;
  error?: string;
  position?: number;
  char?: string;
  partialBytes?: number;
}

/** Decode Base64 to text; attempt partial decode on failure */
export function decodeBase64(input: string): DecodeResult {
  if (!input.trim()) {
    return { success: true, text: '', bytes: new Uint8Array(0) };
  }
  const normalized = normalizeForDecode(input);
  const invalidMatch = normalized.match(/[^A-Za-z0-9+/=]/);
  if (invalidMatch && invalidMatch.index !== undefined) {
    return {
      success: false,
      error: `Invalid Base64 — unexpected character at position ${invalidMatch.index}: ${invalidMatch[0]}`,
      position: invalidMatch.index,
      char: invalidMatch[0],
    };
  }
  try {
    const binaryStr = atob(normalized);
    const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { success: true, text, bytes };
  } catch (e) {
    const msg = (e as Error).message || 'Decode failed';
    let partialBytes = 0;
    try {
      for (let len = normalized.length; len >= 4; len -= 4) {
        const sub = normalized.slice(0, len);
        atob(sub);
        partialBytes = Math.floor((len * 3) / 4);
        break;
      }
    } catch {
      /* ignore */
    }
    return {
      success: false,
      error: msg,
      partialBytes: partialBytes || undefined,
    };
  }
}

/** Content type detection result */
export interface DetectedContent {
  type: string;
  badge: string;
  badgeClass: string;
  meta?: string;
  action?: { label: string; href?: string };
}

/** Detect content type of input (encoded or plain) */
export function detectContentType(input: string, decodedBytes?: Uint8Array | null): DetectedContent | null {
  const t = input.trim();
  if (!t) return null;

  const decoded = decodedBytes ?? (() => {
    const res = decodeBase64(t);
    return res.success && res.bytes ? res.bytes : null;
  })();

  const decodedStr = decoded ? new TextDecoder('utf-8', { fatal: false }).decode(decoded) : '';

  // 1. JWT: three dot-separated Base64URL parts
  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(t)) {
    try {
      const parts = t.split('.');
      const headerB64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
      const padded = headerB64 + '='.repeat((4 - (headerB64.length % 4)) % 4);
      const h = JSON.parse(atob(padded)) as { alg?: string; typ?: string };
      if (h.alg != null || h.typ === 'JWT') {
        let meta = '';
        try {
          const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const pPad = payloadB64 + '='.repeat((4 - (payloadB64.length % 4)) % 4);
          const pl = JSON.parse(atob(pPad)) as { exp?: number };
          if (pl.exp != null) meta = `Expires ${new Date(pl.exp * 1000).toISOString()}`;
        } catch {
          /* ignore */
        }
        return {
          type: 'jwt',
          badge: 'JWT Token',
          badgeClass: 'badge-jwt',
          meta: meta || undefined,
          action: { label: 'Open in JWT Decoder', href: '/jwt-decoder' },
        };
      }
    } catch {
      /* not JWT */
    }
  }

  // 2. Data URI
  if (t.startsWith('data:')) {
    const mimeMatch = t.match(/^data:([^;]+);/);
    const mime = mimeMatch ? mimeMatch[1].trim() : 'application/octet-stream';
    if (/^image\//i.test(mime)) {
      return { type: 'data-uri-image', badge: 'Data URI (Image)', badgeClass: 'badge-data-uri', meta: mime };
    }
    return { type: 'data-uri', badge: 'Data URI', badgeClass: 'badge-data-uri', meta: mime };
  }

  if (decoded && decoded.length >= 4) {
    const u8 = decoded;
    // 3. PNG
    if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47) {
      const dims = getImageDimensions(u8, 'png');
      return { type: 'png', badge: 'PNG Image', badgeClass: 'badge-png', meta: dims };
    }
    // 4. JPEG
    if (u8[0] === 0xff && u8[1] === 0xd8) {
      const dims = getImageDimensions(u8, 'jpeg');
      return { type: 'jpeg', badge: 'JPEG Image', badgeClass: 'badge-jpeg', meta: dims };
    }
    // 5. GIF
    if (u8[0] === 0x47 && u8[1] === 0x49 && u8[2] === 0x46 && (u8[3] === 0x38 && (u8[4] === 0x37 || u8[4] === 0x39) && u8[5] === 0x61)) {
      const dims = getImageDimensions(u8, 'gif');
      return { type: 'gif', badge: 'GIF Image', badgeClass: 'badge-gif', meta: dims };
    }
    // 6. WebP
    if (u8.length >= 12 && u8[0] === 0x52 && u8[1] === 0x49 && u8[2] === 0x46 && u8[3] === 0x46 && u8[8] === 0x57 && u8[9] === 0x45 && u8[10] === 0x42 && u8[11] === 0x50) {
      const dims = getImageDimensions(u8, 'webp');
      return { type: 'webp', badge: 'WebP Image', badgeClass: 'badge-webp', meta: dims };
    }
    // 7. PDF
    if (u8[0] === 0x25 && u8[1] === 0x50 && u8[2] === 0x44 && u8[3] === 0x46) {
      return { type: 'pdf', badge: 'PDF Document', badgeClass: 'badge-pdf', action: { label: 'Download .pdf' } };
    }
  }

  // 8. JSON (decoded string)
  if (decodedStr) {
    const stripped = decodedStr.trim();
    if ((stripped.startsWith('{') || stripped.startsWith('[')) && stripped.length >= 2) {
      try {
        const parsed = JSON.parse(decodedStr);
        const keyCount = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0;
        return { type: 'json', badge: 'JSON Data', badgeClass: 'badge-json', meta: keyCount ? `${keyCount} keys` : undefined, action: { label: 'Format JSON' } };
      } catch {
        /* not JSON */
      }
    }
  }

  // 9. HTML
  if (decodedStr && /<\s*html|<\s*!DOCTYPE/i.test(decodedStr)) {
    return { type: 'html', badge: 'HTML Document', badgeClass: 'badge-html' };
  }

  // 10. URL
  if (decodedStr && /^https?:\/\/\S+/.test(decodedStr.trim())) {
    return { type: 'url', badge: 'URL', badgeClass: 'badge-url' };
  }

  // 11. Valid Base64 (input looks like B64 but decode didn't match above)
  if (/^[A-Za-z0-9+/=_-]+$/.test(t.replace(/\s/g, '')) && t.length >= 4) {
    return { type: 'base64', badge: 'Base64 Encoded', badgeClass: 'badge-base64' };
  }

  // 12. Plain text
  return { type: 'text', badge: 'Plain Text', badgeClass: 'badge-text' };
}

function getImageDimensions(u8: Uint8Array, format: string): string {
  try {
    if (format === 'png' && u8.length >= 24) {
      const w = (u8[16] << 24) | (u8[17] << 16) | (u8[18] << 8) | u8[19];
      const h = (u8[20] << 24) | (u8[21] << 16) | (u8[22] << 8) | u8[23];
      return `${w}×${h} px`;
    }
    if (format === 'jpeg' && u8.length >= 2) {
      let i = 2;
      while (i < u8.length - 9) {
        if (u8[i] !== 0xff) break;
        if (u8[i + 1] === 0xc0 || u8[i + 1] === 0xc2) {
          const h = (u8[i + 5] << 8) | u8[i + 6];
          const w = (u8[i + 7] << 8) | u8[i + 8];
          return `${w}×${h} px`;
        }
        i += 2 + (u8[i + 2] << 8) | u8[i + 3];
      }
    }
    if ((format === 'gif' || format === 'webp') && u8.length >= 10) {
      const w = u8[6] | (u8[7] << 8);
      const h = u8[8] | (u8[9] << 8);
      return `${w}×${h} px`;
    }
  } catch {
    /* ignore */
  }
  return '';
}

/** Security scan result item */
export interface SecurityFinding {
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  snippet: string;
}

const SECURITY_PATTERNS: { pattern: RegExp; level: SecurityFinding['level']; message: string }[] = [
  { pattern: /-----BEGIN\s+.+KEY-----/i, level: 'CRITICAL', message: 'Private key block detected — never share this' },
  { pattern: /AKIA[0-9A-Z]{16}/i, level: 'CRITICAL', message: 'AWS Access Key ID pattern detected' },
  { pattern: /ghp_[A-Za-z0-9]{36}/i, level: 'CRITICAL', message: 'GitHub Personal Access Token detected' },
  { pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, level: 'CRITICAL', message: 'Credit card number pattern detected' },
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/, level: 'CRITICAL', message: 'Social Security Number pattern detected' },
  { pattern: /password\s*[:=]\s*\S+/gi, level: 'HIGH', message: 'Password field detected in payload' },
  { pattern: /secret\s*[:=]\s*\S+/gi, level: 'HIGH', message: 'Secret or API key field detected' },
  { pattern: /api[_-]?key\s*[:=]\s*\S+/gi, level: 'HIGH', message: 'API key reference found' },
  { pattern: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\./i, level: 'MEDIUM', message: 'JWT token embedded in payload' },
  { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, level: 'LOW', message: 'Email address found in payload' },
  { pattern: /[A-Za-z0-9]{40,}/, level: 'LOW', message: 'Long alphanumeric string — possible secret or hash' },
  { pattern: /192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\./, level: 'LOW', message: 'Private IP address range found' },
];

export function runSecurityScan(text: string): { findings: SecurityFinding[]; score: number; maxScore: number } {
  const findings: SecurityFinding[] = [];
  const seen = new Set<string>();
  for (const { pattern, level, message } of SECURITY_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      const key = `${level}:${m.index}:${m[0].slice(0, 30)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const snippet = m[0].length > 50 ? m[0].slice(0, 50) + '…' : m[0];
      findings.push({ level, message, snippet });
    }
  }
  const points = { CRITICAL: 10, HIGH: 5, MEDIUM: 2, LOW: 1 };
  const score = Math.min(10, findings.reduce((acc, f) => acc + points[f.level], 0));
  return { findings, score, maxScore: 10 };
}

/** All 8 encoding forms for reference panel */
export interface EncodingVariantRow {
  name: string;
  description: string;
  value: string;
  byteLength: number;
}

export function getAllEncodingVariants(text: string): EncodingVariantRow[] {
  const bytes = new TextEncoder().encode(text);
  const binaryStr = String.fromCharCode(...bytes);
  const standard = btoa(binaryStr);
  const url = applyVariant(standard, 'url');
  const mime = applyVariant(standard, 'mime');
  const nopad = applyVariant(standard, 'nopad');
  const dataUri = `data:text/plain;base64,${standard}`;
  const htmlSafe = standard.replace(/"/g, '&quot;');
  const urlEncoded = encodeURIComponent(standard);
  const hex = Array.from(standard).map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');

  return [
    { name: 'Standard Base64 (RFC 4648)', description: 'Uses +, /, = padding', value: standard, byteLength: new TextEncoder().encode(standard).length },
    { name: 'Base64URL (RFC 4648 §5)', description: 'Uses -, _, no padding', value: url, byteLength: new TextEncoder().encode(url).length },
    { name: 'MIME Base64 (RFC 2045)', description: 'Line-wrapped at 76 chars with CRLF', value: mime, byteLength: new TextEncoder().encode(mime).length },
    { name: 'No-Padding Base64', description: 'Standard but strips =', value: nopad, byteLength: new TextEncoder().encode(nopad).length },
    { name: 'Data URI', description: 'data:text/plain;base64,...', value: dataUri, byteLength: new TextEncoder().encode(dataUri).length },
    { name: 'HTML-Safe Base64', description: 'Replaces " with &quot;', value: htmlSafe, byteLength: new TextEncoder().encode(htmlSafe).length },
    { name: 'URL-Encoded Base64', description: 'encodeURIComponent(Standard)', value: urlEncoded, byteLength: new TextEncoder().encode(urlEncoded).length },
    { name: 'Hex of encoded bytes', description: 'Hex representation', value: hex, byteLength: hex.length },
  ];
}

/** Base64 character set for character map */
export const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export function getUsedBase64Chars(b64String: string): { used: Set<string>; paddingCount: number } {
  const used = new Set<string>();
  let paddingCount = 0;
  const normalized = b64String.replace(/[\s-_]/g, (c) => (c === '-' ? '+' : c === '_' ? '/' : c));
  for (const c of normalized) {
    if (BASE64_CHARS.includes(c)) {
      used.add(c);
      if (c === '=') paddingCount++;
    }
  }
  return { used, paddingCount };
}

/** Human-readable byte size */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/** Check if string is valid Base64 (after normalization) */
export function isValidBase64(input: string): boolean {
  const n = normalizeForDecode(input);
  return /^[A-Za-z0-9+/]+=*$/.test(n) && n.length % 4 === 0;
}
