/**
 * JWT Decoder Engine — parse, analyze claims, verify signature.
 * 100% client-side; uses Web Crypto API for verification.
 */

export class JWTError extends Error {
  constructor(
    public code: 'INVALID_STRUCTURE' | 'DECODE_FAILED' | 'INVALID_JSON',
    message: string
  ) {
    super(message);
    this.name = 'JWTError';
  }
}

export const SUPPORTED_ALGORITHMS: Record<
  string,
  { type: string; hash?: string; keyType?: string; curve?: string; warning?: string }
> = {
  HS256: { type: 'HMAC', hash: 'SHA-256', keyType: 'secret' },
  HS384: { type: 'HMAC', hash: 'SHA-384', keyType: 'secret' },
  HS512: { type: 'HMAC', hash: 'SHA-512', keyType: 'secret' },
  RS256: { type: 'RSA', hash: 'SHA-256', keyType: 'public' },
  RS384: { type: 'RSA', hash: 'SHA-384', keyType: 'public' },
  RS512: { type: 'RSA', hash: 'SHA-512', keyType: 'public' },
  ES256: { type: 'ECDSA', hash: 'SHA-256', curve: 'P-256' },
  ES384: { type: 'ECDSA', hash: 'SHA-384', curve: 'P-384' },
  ES512: { type: 'ECDSA', hash: 'SHA-512', curve: 'P-521' },
  PS256: { type: 'RSA-PSS', hash: 'SHA-256', keyType: 'public' },
  PS384: { type: 'RSA-PSS', hash: 'SHA-384', keyType: 'public' },
  PS512: { type: 'RSA-PSS', hash: 'SHA-512', keyType: 'public' },
  none: { type: 'NONE', warning: 'CRITICAL_SECURITY_RISK' },
};

export interface ParsedJWT {
  raw: { header: string; payload: string; signature: string };
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeBase64URL(str: string): Record<string, unknown> {
  const base64 = str
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(str.length + ((4 - (str.length % 4)) % 4), '=');
  try {
    const decoded = atob(base64);
    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    const text = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(text) as Record<string, unknown>;
  } catch (e) {
    throw new JWTError('DECODE_FAILED', `Could not decode segment: ${(e as Error).message}`);
  }
}

export function sanitizeToken(token: string): string {
  return token
    .trim()
    .replace(/^Bearer\s+/i, '')
    .replace(/[\r\n\s]/g, '')
    .replace(/['"]/g, '');
}

export function parseJWT(token: string): ParsedJWT {
  const cleaned = sanitizeToken(token);
  const parts = cleaned.split('.');
  if (parts.length !== 3) {
    throw new JWTError('INVALID_STRUCTURE', `Expected 3 parts, got ${parts.length}`);
  }
  const header = decodeBase64URL(parts[0]);
  const payload = decodeBase64URL(parts[1]);
  return {
    raw: { header: parts[0], payload: parts[1], signature: parts[2] },
    header,
    payload,
    signature: parts[2],
  };
}

export interface TemporalAnalysis {
  issuedAt: string | null;
  expiresAt: string | null;
  notBefore: string | null;
  isExpired: boolean | null;
  isActive: boolean;
  timeToExpiry: string | null;
  tokenAge: string | null;
  totalLifespan: string | null;
  percentUsed: number | null;
}

export function formatDuration(seconds: number): string {
  if (seconds < 0) return `${formatDuration(-seconds)} ago`;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function analyzeTemporal(payload: Record<string, unknown>, now: number): TemporalAnalysis {
  const iat = payload.iat as number | undefined;
  const exp = payload.exp as number | undefined;
  const nbf = payload.nbf as number | undefined;

  const issuedAt = iat != null ? new Date(iat * 1000).toISOString() : null;
  const expiresAt = exp != null ? new Date(exp * 1000).toISOString() : null;
  const notBefore = nbf != null ? new Date(nbf * 1000).toISOString() : null;
  const isExpired = exp != null ? now > exp : null;
  const isActive = nbf != null ? now >= nbf : true;
  const timeToExpiry =
    exp != null ? formatDuration(exp - now) : null;
  const tokenAge = iat != null ? formatDuration(now - iat) : null;
  const totalLifespan =
    iat != null && exp != null ? formatDuration(exp - iat) : null;
  const percentUsed =
    iat != null && exp != null && exp > iat
      ? Math.min(100, Math.round(((now - iat) / (exp - iat)) * 100))
      : null;

  return {
    issuedAt,
    expiresAt,
    notBefore,
    isExpired,
    isActive,
    timeToExpiry,
    tokenAge,
    totalLifespan,
    percentUsed,
  };
}

export interface ProviderInfo {
  name: string;
  icon: string;
  color: string;
}

export interface ProviderInfoExtended extends ProviderInfo {
  detectedVia?: string[];
}

export function detectProvider(payload: Record<string, unknown>): ProviderInfoExtended {
  const iss = (payload.iss as string) || '';
  const aud = payload.aud;
  const kid = (payload as { kid?: string }).kid;
  const via: string[] = [];
  if (iss) via.push('iss');
  if (aud != null) via.push('aud');
  if (kid != null) via.push('kid');

  if (iss.includes('accounts.google.com'))
    return { name: 'Google', icon: '🔵', color: '#4285F4', detectedVia: via };
  if (iss.includes('cognito') || payload['cognito:username'])
    return { name: 'AWS Cognito', icon: '🟠', color: '#FF9900', detectedVia: via };
  if (iss.includes('auth0.com'))
    return { name: 'Auth0', icon: '⚫', color: '#EB5424', detectedVia: via };
  if (iss.includes('okta.com'))
    return { name: 'Okta', icon: '🔵', color: '#007DC1', detectedVia: via };
  if (iss.includes('login.microsoftonline.com'))
    return { name: 'Microsoft Azure AD', icon: '🔷', color: '#0078D4', detectedVia: via };
  if (iss.includes('firebase') || iss.includes('securetoken'))
    return { name: 'Firebase Authentication', icon: '🔶', color: '#FFCA28', detectedVia: via };
  if (iss.includes('supabase') || (typeof aud === 'string' && aud.includes('supabase')))
    return { name: 'Supabase', icon: '🟢', color: '#3ECF8E', detectedVia: via };
  if (iss.includes('clerk.') || payload['org_id'] != null)
    return { name: 'Clerk', icon: '🟣', color: '#6C47FF', detectedVia: via };
  if (payload['https://hasura.io/jwt/claims'])
    return { name: 'Hasura', icon: '🔷', color: '#1EB4D4', detectedVia: via };
  if (payload.realm_access || payload.resource_access)
    return { name: 'Keycloak', icon: '🔴', color: '#E74C3C', detectedVia: via };
  return { name: 'Unknown / Custom', icon: '⚪', color: '#64748b', detectedVia: via.length ? via : undefined };
}

export interface RiskItem {
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  code: string;
  message: string;
}

export function detectRisks(
  payload: Record<string, unknown>,
  header?: Record<string, unknown>
): RiskItem[] {
  const risks: RiskItem[] = [];
  const now = Math.floor(Date.now() / 1000);
  const iat = payload.iat as number | undefined;
  const exp = payload.exp as number | undefined;
  const iss = payload.iss;
  const alg = (header?.alg as string) || '';

  if (alg === 'none' || alg === '')
    risks.push({
      level: 'CRITICAL',
      code: 'ALG_NONE',
      message: 'JWT uses "none" algorithm → Signature bypass possible',
    });

  if (exp == null)
    risks.push({
      level: 'HIGH',
      code: 'NO_EXPIRY',
      message: 'Token has no expiration (exp) — valid forever unless revoked',
    });

  if (exp != null && iat != null) {
    const lifespan = exp - iat;
    if (lifespan > 86400 * 365 * 10)
      risks.push({
        level: 'HIGH',
        code: 'EXTREME_LIFESPAN',
        message: `Security risk: extremely long expiration (${Math.round(lifespan / 86400 / 365)} years)`,
      });
    else if (lifespan > 86400 * 24)
      risks.push({
        level: 'MEDIUM',
        code: 'LONG_LIVED',
        message: `Token expiration longer than recommended (> 24 hours). Lifespan: ${formatDuration(lifespan)}`,
      });
  }

  if (iss == null)
    risks.push({
      level: 'MEDIUM',
      code: 'NO_ISSUER',
      message: 'No issuer claim (iss)',
    });

  if (payload.aud == null)
    risks.push({
      level: 'LOW',
      code: 'NO_AUDIENCE',
      message: 'No audience restriction (aud)',
    });

  if (payload.jti == null && payload.exp == null)
    risks.push({
      level: 'MEDIUM',
      code: 'REPLAY_RISK',
      message: 'Token replay risk: no jti (JWT ID) and no exp — hard to invalidate',
    });
  else if (payload.jti == null)
    risks.push({
      level: 'LOW',
      code: 'NO_JTI',
      message: 'No jti claim — replay detection per token not possible',
    });

  if (payload.sub === payload.iss)
    risks.push({
      level: 'LOW',
      code: 'SUB_EQUALS_ISS',
      message: 'Subject equals Issuer — unusual pattern',
    });

  const sensitivePatterns: { pattern: RegExp; code: string }[] = [
    { pattern: /password/i, code: 'SENSITIVE_PASSWORD' },
    { pattern: /secret/i, code: 'SENSITIVE_SECRET' },
    { pattern: /credit.?card/i, code: 'SENSITIVE_CC' },
    { pattern: /ssn/i, code: 'SENSITIVE_SSN' },
    { pattern: /private.?key/i, code: 'SENSITIVE_KEY' },
  ];
  const payloadStr = JSON.stringify(payload);
  for (const { pattern, code } of sensitivePatterns) {
    if (pattern.test(payloadStr))
      risks.push({
        level: 'CRITICAL',
        code,
        message: `Payload may contain sensitive data matching pattern`,
      });
  }

  const order = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  return risks.sort(
    (a, b) => order.indexOf(a.level) - order.indexOf(b.level)
  );
}

export const REGISTERED_CLAIMS: Record<string, { name: string; type: string }> = {
  iss: { name: 'Issuer', type: 'string' },
  sub: { name: 'Subject', type: 'string' },
  aud: { name: 'Audience', type: 'string|array' },
  exp: { name: 'Expiration Time', type: 'timestamp' },
  nbf: { name: 'Not Before', type: 'timestamp' },
  iat: { name: 'Issued At', type: 'timestamp' },
  jti: { name: 'JWT ID', type: 'string' },
};

export const CLAIM_DOCS: Record<string, string> = {
  iss: 'Issuer — who issued the token',
  sub: 'Subject — principal (e.g. user id)',
  aud: 'Audience — intended recipient(s)',
  exp: 'Expiration time — token is invalid after this Unix timestamp',
  nbf: 'Not before — token is invalid before this Unix timestamp',
  iat: 'Issued at — when the token was created',
  jti: 'JWT ID — unique identifier for the token (helps with replay detection)',
};

export type AlgorithmSafety = 'safe' | 'dangerous';

export function getAlgorithmSafety(alg: string): AlgorithmSafety {
  const a = (alg || '').toLowerCase();
  if (a === 'none' || a === '') return 'dangerous';
  return 'safe';
}

export interface SecurityScoreBreakdown {
  expiration: number;
  issuer: number;
  algorithm: number;
  audience: number;
  replayProtection: number;
  lifespan: number;
}

export function getSecurityScore(
  payload: Record<string, unknown>,
  header?: Record<string, unknown>
): { score: number; max: number; breakdown: SecurityScoreBreakdown } {
  const breakdown: SecurityScoreBreakdown = {
    expiration: 0,
    issuer: 0,
    algorithm: 0,
    audience: 0,
    replayProtection: 0,
    lifespan: 0,
  };
  const alg = (header?.alg as string) || '';
  if (getAlgorithmSafety(alg) === 'safe') breakdown.algorithm = 20;
  if (payload.exp != null) breakdown.expiration = 25;
  if (payload.iss != null) breakdown.issuer = 15;
  if (payload.aud != null) breakdown.audience = 15;
  if (payload.jti != null) breakdown.replayProtection = 15;
  const iat = payload.iat as number | undefined;
  const exp = payload.exp as number | undefined;
  if (iat != null && exp != null) {
    const lifespan = exp - iat;
    if (lifespan <= 86400) breakdown.lifespan = 10;
    else if (lifespan <= 86400 * 24) breakdown.lifespan = 8;
    else if (lifespan <= 86400 * 30) breakdown.lifespan = 5;
    else breakdown.lifespan = 0;
  }
  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);
  return { score: Math.min(100, score), max: 100, breakdown };
}

export function getTokenSize(token: string): { bytes: number; chars: number } {
  const cleaned = sanitizeToken(token);
  const bytes = new TextEncoder().encode(cleaned).length;
  return { bytes, chars: cleaned.length };
}

export const TOKEN_SIZE_WARN_BYTES = 2048;

export function humanizeClaim(key: string, value: unknown): string {
  if (key === 'iat' || key === 'exp' || key === 'nbf') {
    if (typeof value === 'number')
      return new Date(value * 1000).toISOString();
  }
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
}

function base64URLtoBuffer(str: string): ArrayBuffer {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export interface VerifyResult {
  valid: boolean;
  error?: string;
  algorithm?: string;
  risk?: string;
  message?: string;
}

export async function verifyHMAC(
  token: string,
  secret: string,
  algorithm: string
): Promise<VerifyResult> {
  const algo = SUPPORTED_ALGORITHMS[algorithm.toUpperCase()];
  if (!algo || algo.type !== 'HMAC')
    return { valid: false, error: `Unsupported algorithm: ${algorithm}` };

  const parts = token.split('.');
  if (parts.length !== 3)
    return { valid: false, error: 'Invalid token structure' };

  const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
  const signature = base64URLtoBuffer(parts[2]);
  const keyData = new TextEncoder().encode(secret);

  const hashMap = { 'SHA-256': 'SHA-256', 'SHA-384': 'SHA-384', 'SHA-512': 'SHA-512' } as const;
  const hash = hashMap[algo.hash as keyof typeof hashMap] || 'SHA-256';

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify('HMAC', key, signature, data);
    return { valid, algorithm: algo.type };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}
