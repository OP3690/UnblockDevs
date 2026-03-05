/**
 * Token Analyzer – detect type, decode JWT, security audit, entropy, metadata.
 * 100% client-side token analysis for Token Comparator & JWT Debugger.
 */

export type TokenType =
  | 'JWT'
  | 'API Key'
  | 'UUID'
  | 'Base64'
  | 'Hex Token'
  | 'SHA Hash'
  | 'Bearer Token'
  | 'Unknown';

export interface TokenDetection {
  type: TokenType;
  confidence: number;
  structure?: string;
}

export interface JwtDecoded {
  header: string;
  payload: string;
  signature: string;
  decodedHeader: Record<string, unknown>;
  decodedPayload: Record<string, unknown>;
}

export interface SecurityWarning {
  level: 'info' | 'warning' | 'error';
  message: string;
}

export interface SecurityAudit {
  algorithm: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  warnings: SecurityWarning[];
}

export interface TokenLifetime {
  iat: number | null;
  exp: number | null;
  issuedAt: string | null;
  expiresAt: string | null;
  ageMs: number | null;
  remainingMs: number | null;
  progressPercent: number | null; // 0 = just issued, 100 = expired
}

export interface EntropyResult {
  bitsPerChar: number;
  strength: 'Weak' | 'Medium' | 'Strong';
}

export interface TokenMetadata {
  length: number;
  segments: number;
  encoding: string;
  alphabetSize: number;
}

const JWT_REGEX = /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BASE64_REGEX = /^[A-Za-z0-9+/=_-]+$/;
const HEX_REGEX = /^[0-9a-fA-F]+$/;
const SHA256_HEX_LEN = 64;
const SHA512_HEX_LEN = 128;

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad) base64 += '===='.slice(0, 4 - pad);
  try {
    return atob(base64);
  } catch {
    return '';
  }
}

/** Detect token type and confidence (0-100). */
export function detectTokenType(token: string): TokenDetection {
  const t = token.trim();
  if (!t) return { type: 'Unknown', confidence: 0 };

  if (JWT_REGEX.test(t) || (t.split('.').length === 3 && t.split('.').every((s) => /^[A-Za-z0-9_-]+$/.test(s)))) {
    try {
      const parts = t.split('.');
      const payload = JSON.parse(base64UrlDecode(parts[1]) || '{}');
      if (typeof payload === 'object' && (payload.iat != null || payload.exp != null || payload.sub != null)) {
        return { type: 'JWT', confidence: 98, structure: 'Header.Payload.Signature' };
      }
      return { type: 'JWT', confidence: 85, structure: 'Header.Payload.Signature' };
    } catch {
      return { type: 'JWT', confidence: 75, structure: 'Header.Payload.Signature' };
    }
  }

  if (t.toLowerCase().startsWith('bearer ')) {
    return { type: 'Bearer Token', confidence: 90, structure: 'Bearer <token>' };
  }

  if (UUID_REGEX.test(t)) {
    return { type: 'UUID', confidence: 95 };
  }

  if (HEX_REGEX.test(t)) {
    if (t.length === SHA256_HEX_LEN) return { type: 'SHA Hash', confidence: 88 };
    if (t.length === SHA512_HEX_LEN) return { type: 'SHA Hash', confidence: 88 };
    return { type: 'Hex Token', confidence: 70 };
  }

  if (BASE64_REGEX.test(t) && t.length >= 20) {
    return { type: 'Base64', confidence: 65 };
  }

  if (/^[A-Za-z0-9_-]{20,}$/.test(t) && /^[a-zA-Z0-9]/.test(t)) {
    return { type: 'API Key', confidence: 55 };
  }

  return { type: 'Unknown', confidence: 0 };
}

/** Decode JWT; returns null if invalid. */
export function decodeJwt(token: string): JwtDecoded | null {
  const t = token.replace(/^Bearer\s+/i, '').trim();
  const parts = t.split('.');
  if (parts.length !== 3) return null;
  try {
    const decodedHeader = JSON.parse(base64UrlDecode(parts[0]) || '{}') as Record<string, unknown>;
    const decodedPayload = JSON.parse(base64UrlDecode(parts[1]) || '{}') as Record<string, unknown>;
    return {
      header: parts[0],
      payload: parts[1],
      signature: parts[2],
      decodedHeader,
      decodedPayload,
    };
  } catch {
    return null;
  }
}

const WEAK_ALGOS = ['none', 'HS256', 'HS384', 'HS512'];
const MEDIUM_ALGOS = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'];

/** Security audit for decoded JWT. */
export function securityAudit(decoded: JwtDecoded): SecurityAudit {
  const warnings: SecurityWarning[] = [];
  const alg = (decoded.decodedHeader.alg as string) || 'unknown';
  let riskLevel: SecurityAudit['riskLevel'] = 'Low';

  if (alg === 'none' || !alg) {
    warnings.push({ level: 'error', message: 'Algorithm "none" or missing – token may be accepted without verification' });
    riskLevel = 'Critical';
  } else if (WEAK_ALGOS.includes(alg)) {
    warnings.push({ level: 'warning', message: `Symmetric algorithm ${alg} – ensure secret is never exposed` });
    if (riskLevel === 'Low') riskLevel = 'Medium';
  }

  const exp = decoded.decodedPayload.exp as number | undefined;
  const iat = decoded.decodedPayload.iat as number | undefined;
  if (exp != null) {
    const now = Math.floor(Date.now() / 1000);
    if (exp < now) {
      warnings.push({ level: 'warning', message: 'Token has expired' });
    } else {
      const hours = (exp - now) / 3600;
      if (hours > 24) {
        warnings.push({ level: 'warning', message: 'Token expiration longer than 24 hours' });
        if (riskLevel === 'Low') riskLevel = 'Medium';
      }
    }
  } else {
    warnings.push({ level: 'warning', message: 'No expiration (exp) claim present' });
  }

  if (decoded.decodedPayload.aud == null) {
    warnings.push({ level: 'info', message: 'No audience (aud) claim present' });
  }
  if (decoded.decodedPayload.iss == null) {
    warnings.push({ level: 'info', message: 'No issuer (iss) claim present' });
  }

  if (decoded.signature.length < 20) {
    warnings.push({ level: 'warning', message: 'Signature appears short – verify algorithm and key' });
  }

  return {
    algorithm: alg,
    riskLevel,
    warnings,
  };
}

/** Human-readable lifetime from decoded JWT payload. */
export function getTokenLifetime(decodedPayload: Record<string, unknown>): TokenLifetime {
  const iat = decodedPayload.iat as number | undefined;
  const exp = decodedPayload.exp as number | undefined;
  const now = Date.now();

  const formatUtc = (sec: number) => {
    const d = new Date(sec * 1000);
    return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  };

  if (iat == null && exp == null) {
    return {
      iat: null,
      exp: null,
      issuedAt: null,
      expiresAt: null,
      ageMs: null,
      remainingMs: null,
      progressPercent: null,
    };
  }

  const iatMs = iat != null ? iat * 1000 : null;
  const expMs = exp != null ? exp * 1000 : null;
  let ageMs: number | null = iatMs != null ? now - iatMs : null;
  let remainingMs: number | null = expMs != null ? expMs - now : null;
  let progressPercent: number | null = null;
  if (iatMs != null && expMs != null && expMs > iatMs) {
    const total = expMs - iatMs;
    const elapsed = now - iatMs;
    progressPercent = Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  return {
    iat: iat ?? null,
    exp: exp ?? null,
    issuedAt: iat != null ? formatUtc(iat) : null,
    expiresAt: exp != null ? formatUtc(exp) : null,
    ageMs,
    remainingMs,
    progressPercent,
  };
}

/** Entropy in bits per character and strength. */
export function getEntropy(token: string): EntropyResult {
  const t = token.replace(/\s/g, '');
  if (!t.length) return { bitsPerChar: 0, strength: 'Weak' };

  const freq: Record<string, number> = {};
  for (const c of t) {
    freq[c] = (freq[c] || 0) + 1;
  }
  let bits = 0;
  const len = t.length;
  for (const count of Object.values(freq)) {
    const p = count / len;
    bits -= p * Math.log2(p);
  }
  const bitsPerChar = Math.round(bits * 100) / 100;
  let strength: EntropyResult['strength'] = 'Weak';
  if (bitsPerChar >= 4.5) strength = 'Strong';
  else if (bitsPerChar >= 3) strength = 'Medium';
  return { bitsPerChar, strength };
}

/** Token metadata (length, segments, encoding). */
export function getTokenMetadata(token: string): TokenMetadata {
  const t = token.trim();
  const segments = t.includes('.') ? t.split('.').length : 1;
  const chars = new Set(t.replace(/\s/g, '').split(''));
  let encoding = 'Unknown';
  if (/^[A-Za-z0-9_-]+$/.test(t) && t.includes('.')) encoding = 'Base64URL';
  else if (/^[A-Za-z0-9+/=]+$/.test(t)) encoding = 'Base64';
  else if (/^[0-9a-fA-F]+$/.test(t)) encoding = 'Hex';
  return {
    length: t.length,
    segments,
    encoding,
    alphabetSize: chars.size,
  };
}

/** JWT claim short meanings for visualizer. */
export const JWT_CLAIM_MEANINGS: Record<string, string> = {
  sub: 'Subject (user ID)',
  iat: 'Issued At (timestamp)',
  exp: 'Expiration (timestamp)',
  aud: 'Audience',
  iss: 'Issuer',
  jti: 'JWT ID',
  nbf: 'Not Before',
  azp: 'Authorized party',
  scope: 'OAuth scope',
  name: 'Full name',
  email: 'Email address',
  preferred_username: 'Username',
};

/** Compare two tokens; return first mismatch position (0-based) and stats. */
export function compareTokens(
  token1: string,
  token2: string
): {
  firstMismatchPosition: number | null;
  expectedChar: string;
  actualChar: string;
  token1Length: number;
  token2Length: number;
  matches: number;
  mismatches: number;
  matchPercentage: number;
} {
  const n1 = token1.replace(/\s/g, '');
  const n2 = token2.replace(/\s/g, '');
  const maxLen = Math.max(n1.length, n2.length);
  let matches = 0;
  let mismatches = 0;
  let firstMismatch: number | null = null;
  let expectedChar = '';
  let actualChar = '';

  for (let i = 0; i < maxLen; i++) {
    const c1 = i < n1.length ? n1[i] : '';
    const c2 = i < n2.length ? n2[i] : '';
    if (c1 === c2 && c1 !== '') {
      matches++;
    } else {
      mismatches++;
      if (firstMismatch === null) {
        firstMismatch = i;
        expectedChar = c1 || '(none)';
        actualChar = c2 || '(none)';
      }
    }
  }

  return {
    firstMismatchPosition: firstMismatch,
    expectedChar,
    actualChar,
    token1Length: n1.length,
    token2Length: n2.length,
    matches,
    mismatches,
    matchPercentage: maxLen > 0 ? Math.round((matches / maxLen) * 100) : 0,
  };
}
