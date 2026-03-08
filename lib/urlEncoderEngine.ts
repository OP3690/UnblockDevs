/**
 * URL Encoder / Decoder Engine — encode, decode, parse, query editor, security analysis.
 * RFC 3986, application/x-www-form-urlencoded, encodeURI, encodeURIComponent.
 */

export type EncodeMode = 'encode' | 'decode' | 'auto';
export type EncodingStandard = 'rfc3986' | 'form' | 'uri' | 'uriComponent';

export interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  path: string;
  query: string;
  queryParams: { key: string; value: string }[];
  fragment: string;
  valid: boolean;
  raw: string;
}

export interface SecurityWarning {
  type: 'xss' | 'script' | 'redirect' | 'double-encode';
  message: string;
  decoded?: string;
  position?: number;
}

export interface DoubleEncodeInfo {
  detected: boolean;
  original: string;
  decoded: string;
  example: string;
}

const RFC3986_UNRESERVED = /^[A-Za-z0-9\-._~]$/;
const PERCENT = /%[0-9A-Fa-f]{2}/g;

export function encodeRFC3986(s: string): string {
  return Array.from(s).map((c) => {
    if (RFC3986_UNRESERVED.test(c)) return c;
    return '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
  }).join('');
}

export function decodeUrl(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  } catch {
    return s;
  }
}

export function encodeByStandard(s: string, standard: EncodingStandard): string {
  try {
    switch (standard) {
      case 'rfc3986':
        return encodeRFC3986(s);
      case 'form':
        return encodeURIComponent(s).replace(/%20/g, '+');
      case 'uri':
        return encodeURI(s);
      case 'uriComponent':
        return encodeURIComponent(s);
      default:
        return encodeURIComponent(s);
    }
  } catch {
    return s;
  }
}

export function decodeByStandard(s: string, standard: EncodingStandard): string {
  const normalized = standard === 'form' ? s.replace(/\+/g, ' ') : s;
  try {
    return decodeURIComponent(normalized);
  } catch {
    return s;
  }
}

export function isLikelyEncoded(s: string): boolean {
  return /%[0-9A-Fa-f]{2}/.test(s) || /\+/.test(s);
}

export function autoTransform(s: string, standard: EncodingStandard): { result: string; mode: 'encode' | 'decode' } {
  const trimmed = s.trim();
  if (!trimmed) return { result: '', mode: 'encode' };
  if (isLikelyEncoded(trimmed)) {
    return { result: decodeByStandard(trimmed, standard), mode: 'decode' };
  }
  return { result: encodeByStandard(trimmed, standard), mode: 'encode' };
}

export function parseUrl(input: string): ParsedUrl {
  const raw = input.trim();
  const empty: ParsedUrl = {
    protocol: '',
    hostname: '',
    port: '',
    path: '',
    query: '',
    queryParams: [],
    fragment: '',
    valid: false,
    raw,
  };
  if (!raw) return empty;
  try {
    let url = raw;
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) url = 'https://' + url;
    const u = new URL(url);
    const queryParams = Array.from(u.searchParams.entries()).map(([key, value]) => ({ key, value }));
    return {
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      port: u.port || '',
      path: u.pathname,
      query: u.search.slice(1),
      queryParams,
      fragment: u.hash.slice(1),
      valid: true,
      raw,
    };
  } catch {
    return empty;
  }
}

export function buildUrlFromParsed(p: ParsedUrl): string {
  const protocol = p.protocol ? p.protocol + ':' : 'https:';
  const host = p.port ? `${p.hostname}:${p.port}` : p.hostname;
  const origin = p.hostname ? `${protocol}//${host}` : '';
  const path = p.path || (p.hostname ? '/' : '');
  const search = p.queryParams.length
    ? '?' + p.queryParams.map(({ key, value }) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')
    : '';
  const hash = p.fragment ? '#' + encodeURIComponent(p.fragment) : '';
  return origin + path + search + hash;
}

export function detectDoubleEncoding(s: string): DoubleEncodeInfo {
  const decodedOnce = tryDecode(s);
  const decodedTwice = tryDecode(decodedOnce);
  const hasPercentEncoded = /%25[0-9A-Fa-f]{2}/.test(s);
  if (hasPercentEncoded && decodedOnce !== s) {
    return {
      detected: true,
      original: s,
      decoded: decodedOnce,
      example: '%2520 → %20 → space',
    };
  }
  return { detected: false, original: s, decoded: s, example: '' };
}

function tryDecode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  } catch {
    return s;
  }
}

export function analyzeSecurity(decoded: string): SecurityWarning[] {
  const warnings: SecurityWarning[] = [];
  const lower = decoded.toLowerCase();
  if (/<script\b/i.test(decoded) || /javascript:/i.test(decoded)) {
    warnings.push({ type: 'script', message: 'Suspicious encoded script or javascript: detected', decoded });
  }
  if (/<[^>]*on\w+\s*=/i.test(decoded) || /%3Cscript%3E/i.test(decoded.toLowerCase())) {
    warnings.push({ type: 'xss', message: 'Possible XSS payload (encoded script/event)', decoded });
  }
  if (/\b(https?:%2F%2F|https?:\/\/).*%2F/i.test(decoded) && /redirect|url=|next=|return=/i.test(decoded)) {
    warnings.push({ type: 'redirect', message: 'Open redirect parameter pattern detected' });
  }
  return warnings;
}

export function normalizeUrl(url: string): string {
  try {
    let u = url.trim();
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(u)) u = 'https://' + u;
    const parsed = new URL(u);
    parsed.protocol = parsed.protocol.toLowerCase();
    parsed.hostname = parsed.hostname.toLowerCase();
    const path = parsed.pathname.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    const search = parsed.search;
    const hash = parsed.hash;
    return parsed.origin + path + search + hash;
  } catch {
    return url;
  }
}

export function encodingVisualization(encoded: string): { char: string; raw: string }[] {
  const result: { char: string; raw: string }[] = [];
  let i = 0;
  while (i < encoded.length) {
    const match = encoded.slice(i).match(/^%[0-9A-Fa-f]{2}/);
    if (match) {
      const hex = match[0].slice(1);
      const code = parseInt(hex, 16);
      const char = code === 32 ? '[space]' : code < 32 || code > 126 ? `[U+${code.toString(16).toUpperCase()}]` : String.fromCharCode(code);
      result.push({ raw: match[0], char });
      i += match[0].length;
    } else {
      result.push({ raw: encoded[i], char: encoded[i] });
      i++;
    }
  }
  return result;
}

export function getRequestSimulation(method: string, url: string, host?: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    const pathQuery = u.pathname + u.search;
    const h = host || u.host;
    return `${method.toUpperCase()} ${pathQuery} HTTP/1.1\nHost: ${h}`;
  } catch {
    return `${method.toUpperCase()} ${url} HTTP/1.1\nHost: `;
  }
}

const IE_URL_LIMIT = 2083;
export function getUrlLengthInfo(url: string): { total: number; queryLength: number; pathLength: number; warning: string | null } {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    const queryLength = u.search.length;
    const pathLength = u.pathname.length;
    const total = url.length;
    let warning: string | null = null;
    if (total > IE_URL_LIMIT) warning = `URL exceeds Internet Explorer limit (${IE_URL_LIMIT} characters).`;
    return { total, queryLength, pathLength, warning };
  } catch {
    return { total: url.length, queryLength: 0, pathLength: 0, warning: null };
  }
}

const BASE64_REGEX = /^[A-Za-z0-9+/]+=*$/;
export function detectBase64(s: string): { detected: boolean; decoded: string } {
  const trimmed = s.trim().replace(/\s/g, '');
  if (trimmed.length < 4 || trimmed.length % 4 !== 0) return { detected: false, decoded: '' };
  if (!BASE64_REGEX.test(trimmed)) return { detected: false, decoded: '' };
  try {
    const decoded = atob(trimmed);
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(decoded)) return { detected: false, decoded: '' };
    return { detected: true, decoded };
  } catch {
    return { detected: false, decoded: '' };
  }
}

export const CODE_SNIPPETS = {
  js: `// encode
encodeURIComponent("hello world")  // "hello%20world"
encodeURI("https://example.com/path")  // path not encoded

// decode
decodeURIComponent("hello%20world")  // "hello world"`,
  py: `import urllib.parse

# encode
urllib.parse.quote("hello world")  # "hello%20world"
urllib.parse.quote_plus("hello world")  # "hello+world"

# decode
urllib.parse.unquote("hello%20world")  # "hello world"`,
  go: `import "net/url"

// encode
url.QueryEscape("hello world")  // "hello%20world"

// decode
url.QueryUnescape("hello%20world")  // "hello world", error`,
};

export const ENCODING_STANDARDS: { id: EncodingStandard; label: string; description: string }[] = [
  { id: 'rfc3986', label: 'RFC 3986', description: 'Reserved chars encoded; space → %20' },
  { id: 'form', label: 'application/x-www-form-urlencoded', description: 'Space → +; used in form submissions' },
  { id: 'uri', label: 'encodeURI', description: 'Does not encode : / ? # [ ] @ ! $ & \' ( ) * + , ; =' },
  { id: 'uriComponent', label: 'encodeURIComponent', description: 'Encodes everything except A-Z a-z 0-9 - _ . ! ~ * \' ( )' },
];

export const SAMPLE_URL = 'https://example.com:8080/users?id=42&name=John Doe#profile';
