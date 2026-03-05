/**
 * HAR to cURL – parse HAR files, clean headers, mask secrets, multi-language output.
 * Works with curlConverter ParsedCurl for convertToLanguage, Postman, OpenAPI, AI prompt.
 */

import type { ParsedCurl, CurlTarget } from './curlConverter';
import {
  convertToLanguage,
  generateAIPrompt,
  generatePostmanCollection,
  generateOpenAPISpec,
  beautifyCurl,
} from './curlConverter';

// ─── HAR types (minimal) ─────────────────────────────────────────────────────
export interface HarHeader {
  name: string;
  value: string;
}

export interface HarPostData {
  mimeType?: string;
  text?: string;
  params?: Array<{ name: string; value: string }>;
}

export interface HarRequest {
  method: string;
  url: string;
  headers?: HarHeader[];
  postData?: HarPostData;
  queryString?: Array<{ name: string; value: string }>;
}

export interface HarTimings {
  send?: number;
  wait?: number;
  receive?: number;
  ssl?: number;
  connect?: number;
  dns?: number;
  blocked?: number;
}

export interface HarResponse {
  status?: number;
  statusText?: string;
  headers?: HarHeader[];
  content?: { mimeType?: string; text?: string; size?: number };
  _transferSize?: number;
}

export interface HarEntry {
  request: HarRequest;
  response?: HarResponse;
  startedDateTime?: string;
  time?: number;
  timings?: HarTimings;
  _resourceType?: string;
}

export interface HarLog {
  entries: HarEntry[];
}

export interface HarFile {
  log: HarLog;
}

// ─── Normalized entry (with parsed URL and resource type) ───────────────────
export interface NormalizedHarEntry {
  index: number;
  entry: HarEntry;
  method: string;
  url: string;
  pathname: string;
  domain: string;
  status: number;
  statusText: string;
  time: number;
  resourceType: string;
  requestSize?: number;
  responseSize?: number;
}

// Headers to strip for "clean minimal cURL" (browser noise)
const NOISE_HEADERS = new Set([
  'sec-ch-ua',
  'sec-ch-ua-mobile',
  'sec-ch-ua-platform',
  'sec-fetch-site',
  'sec-fetch-mode',
  'sec-fetch-dest',
  'sec-fetch-user',
  'accept-language',
  'priority',
  'upgrade-insecure-requests',
  'dnt',
  'connection',
  'cache-control',
  'pragma',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

// Secret patterns for masking (same idea as curlConverter)
const JWT_REGEX = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
const BEARER_REGEX = /Bearer\s+[^\s'"]+/gi;
const BASIC_REGEX = /Basic\s+[A-Za-z0-9+/=]+/gi;
const API_KEY_REGEX = /(?:api[_-]?key|apikey|x-api-key)\s*[:=]\s*['"]?[^\s'"]+['"]?/gi;
const COOKIE_VALUE_REGEX = /(?:cookie|session|token|auth)\s*[:=]\s*['"]?([^'";\s]+)/gi;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
const PHONE_REGEX = /\+?\d{10,15}/g;

export const PLACEHOLDERS = {
  JWT: '<JWT_TOKEN>',
  BEARER: '<TOKEN>',
  BASIC: '<BASIC_AUTH>',
  API_KEY: '<API_KEY>',
  SESSION: '<SESSION_ID>',
  EMAIL: '<EMAIL>',
  UUID: '<UUID>',
  PHONE: '<PHONE>',
};

/** Parse HAR JSON and return normalized entries. */
export function parseHarFile(content: string): NormalizedHarEntry[] {
  let har: HarFile;
  try {
    har = JSON.parse(content);
  } catch {
    throw new Error('Invalid HAR JSON');
  }
  if (!har?.log?.entries?.length) throw new Error('No entries found in HAR file');

  const out: NormalizedHarEntry[] = [];
  har.log.entries.forEach((entry, index) => {
    const req = entry.request;
    const method = (req.method || 'GET').toUpperCase();
    const url = req.url || '';
    let domain = '';
    let pathname = url;
    try {
      const u = new URL(url);
      domain = u.hostname;
      pathname = u.pathname || '/';
    } catch {
      // keep pathname as url slice
    }
    const res = entry.response;
    const status = res?.status ?? 0;
    const statusText = res?.statusText ?? '';
    const time = entry.time ?? 0;
    const resourceType =
      entry._resourceType ||
      inferResourceType(res?.content?.mimeType, url, method) ||
      'other';
    out.push({
      index,
      entry,
      method,
      url,
      pathname,
      domain,
      status,
      statusText,
      time,
      resourceType,
      requestSize: req.postData?.text?.length,
      responseSize: res?.content?.size ?? res?._transferSize,
    });
  });
  return out;
}

function inferResourceType(mime: string | undefined, url: string, method: string): string {
  if (!mime) {
    if (/\.(js|mjs|chunk\.js)(\?|$)/i.test(url)) return 'script';
    if (/\.(css)(\?|$)/i.test(url)) return 'stylesheet';
    if (/\.(png|jpg|jpeg|gif|webp|ico|svg)(\?|$)/i.test(url)) return 'image';
    if (/\.(woff2?|ttf|otf)(\?|$)/i.test(url)) return 'font';
    if (method !== 'GET' || /\/api\//.test(url) || /graphql/i.test(url)) return 'xhr';
    return 'other';
  }
  if (/json|xml|text\/plain/.test(mime) && (method !== 'GET' || /\/api\//.test(url))) return 'xhr';
  if (mime.includes('javascript')) return 'script';
  if (mime.includes('css')) return 'stylesheet';
  if (mime.startsWith('image/')) return 'image';
  if (mime.includes('font')) return 'font';
  return 'other';
}

/** Options for cleaning and masking. */
export interface HarConvertOptions {
  cleanHeaders?: boolean;
  maskSecrets?: boolean;
  maskData?: boolean; // email, phone, uuid in body
}

/** Build headers map from HAR request, optionally clean and mask. */
export function getHeadersFromHar(
  req: HarRequest,
  options: HarConvertOptions = {}
): Record<string, string> {
  const headers: Record<string, string> = {};
  (req.headers || []).forEach((h) => {
    const name = h.name.trim();
    let value = h.value;
    if (options.cleanHeaders && NOISE_HEADERS.has(name.toLowerCase())) return;
    if (options.maskSecrets) value = maskSecretInHeaderValue(name, value);
    if (name) headers[name] = value;
  });
  return headers;
}

function maskSecretInHeaderValue(name: string, value: string): string {
  const n = name.toLowerCase();
  if (n === 'authorization') {
    if (value.startsWith('Bearer ')) return `Bearer ${PLACEHOLDERS.BEARER}`;
    if (value.startsWith('Basic ')) return `Basic ${PLACEHOLDERS.BASIC}`;
  }
  if (/api[-_]?key|x-api-key|apikey/i.test(n)) return PLACEHOLDERS.API_KEY;
  if (/cookie|session|token/i.test(n)) return value.replace(/[^=]+=([^;]+)/g, (_, v) => `session=${PLACEHOLDERS.SESSION}`);
  if (BEARER_REGEX.test(value)) return value.replace(BEARER_REGEX, `Bearer ${PLACEHOLDERS.BEARER}`);
  if (JWT_REGEX.test(value)) return value.replace(JWT_REGEX, PLACEHOLDERS.JWT);
  return value;
}

/** Get post body text, optionally decoded and masked. */
export function getPostData(entry: HarEntry, options: HarConvertOptions = {}): string {
  const pd = entry.request?.postData;
  if (!pd) return '';
  let text = pd.text ?? '';
  if (pd.params?.length && !text) {
    const ct = (pd.mimeType || '').toLowerCase();
    if (ct.includes('application/x-www-form-urlencoded')) {
      text = pd.params.map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`).join('&');
    } else if (ct.includes('multipart')) {
      text = pd.params.map((p) => `${p.name}=${p.value}`).join('\n');
    }
  }
  if (options.maskSecrets) text = maskSecretsInBody(text);
  if (options.maskData) text = maskDataInPayload(text);
  return text;
}

function maskSecretsInBody(text: string): string {
  return text
    .replace(JWT_REGEX, PLACEHOLDERS.JWT)
    .replace(BEARER_REGEX, `Bearer ${PLACEHOLDERS.BEARER}`)
    .replace(BASIC_REGEX, `Basic ${PLACEHOLDERS.BASIC}`)
    .replace(API_KEY_REGEX, (m) => m.replace(/[:=]\s*['"]?[^\s'"]+/, `: ${PLACEHOLDERS.API_KEY}`))
    .replace(COOKIE_VALUE_REGEX, (m, v) => m.replace(v, PLACEHOLDERS.SESSION));
}

export function maskDataInPayload(text: string): string {
  return text
    .replace(EMAIL_REGEX, PLACEHOLDERS.EMAIL)
    .replace(UUID_REGEX, PLACEHOLDERS.UUID)
    .replace(PHONE_REGEX, PLACEHOLDERS.PHONE)
    .replace(JWT_REGEX, PLACEHOLDERS.JWT);
}

/** Convert HAR entry to ParsedCurl for use with curlConverter. */
export function harEntryToParsedCurl(
  normalized: NormalizedHarEntry,
  options: HarConvertOptions = {}
): ParsedCurl {
  const { entry, method, url } = normalized;
  const req = entry.request;
  const headers = getHeadersFromHar(req, options);
  const data = getPostData(entry, options);

  const queryParams: Record<string, string> = {};
  try {
    const u = new URL(url);
    u.searchParams.forEach((v, k) => {
      queryParams[k] = v;
    });
  } catch {
    // ignore
  }

  let auth: ParsedCurl['auth'] = null;
  const authHeader = headers['Authorization'] || headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) {
    auth = { type: 'bearer', token: authHeader.replace(/Bearer\s+/i, '').trim() };
  } else if (authHeader?.startsWith('Basic ')) {
    auth = { type: 'basic', username: '', password: '' }; // already masked or we don't decode
  }

  const cookies: Record<string, string> = {};
  const cookieHeader = headers['Cookie'] || headers['cookie'];
  if (cookieHeader) {
    cookieHeader.split(';').forEach((p) => {
      const eq = p.indexOf('=');
      if (eq > 0) cookies[p.slice(0, eq).trim()] = p.slice(eq + 1).trim();
    });
  }

  return {
    url,
    method,
    headers,
    data,
    auth,
    queryParams,
    cookies,
    isMultipart: (req.postData?.mimeType || '').toLowerCase().includes('multipart'),
  };
}

/** Build cURL command string from ParsedCurl. */
export function buildCurlFromParsed(parsed: ParsedCurl): string {
  const { url, method, headers, data } = parsed;
  let curl = `curl -X ${method}`;
  Object.entries(headers).forEach(([k, v]) => {
    const safe = v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    curl += ` \\\n  -H "${k}: ${safe}"`;
  });
  if (data && !['GET', 'HEAD'].includes(method)) {
    const safe = data.replace(/'/g, "'\\''");
    curl += ` \\\n  -d '${safe}'`;
  }
  curl += ` \\\n  "${url}"`;
  return curl;
}

/** Generate clean cURL for one HAR entry (with optional beautify). */
export function generateCurlFromHarEntry(
  normalized: NormalizedHarEntry,
  options: HarConvertOptions & { beautify?: boolean } = {}
): string {
  const parsed = harEntryToParsedCurl(normalized, options);
  let curl = buildCurlFromParsed(parsed);
  if (options.beautify) curl = beautifyCurl(curl);
  return curl;
}

/** Get timing breakdown for an entry (ms). */
export function getHarTiming(entry: HarEntry): {
  dns: number;
  connect: number;
  ssl: number;
  ttfb: number;
  download: number;
  total: number;
} {
  const t = entry.timings || {};
  const dns = t.dns ?? 0;
  const connect = t.connect ?? 0;
  const ssl = t.ssl ?? 0;
  const wait = t.wait ?? 0;
  const receive = t.receive ?? 0;
  const total = entry.time ?? 0;
  return {
    dns: Math.round(dns),
    connect: Math.round(connect),
    ssl: Math.round(ssl),
    ttfb: Math.round(wait),
    download: Math.round(receive),
    total: Math.round(total),
  };
}

/** Filter normalized entries by domain, method, type, status, minTime. */
export interface HarFilters {
  domain?: string;
  method?: string;
  resourceType?: 'all' | 'xhr' | 'fetch' | 'api'; // api = xhr + fetch
  statusMin?: number;
  statusMax?: number;
  minTime?: number;
}

export function filterHarEntries(
  entries: NormalizedHarEntry[],
  filters: HarFilters
): NormalizedHarEntry[] {
  return entries.filter((e) => {
    if (filters.domain && e.domain !== filters.domain) return false;
    if (filters.method && e.method !== filters.method) return false;
    if (filters.resourceType && filters.resourceType !== 'all') {
      // 'api' = only XHR/fetch-like (skip script, css, image, font)
      if (filters.resourceType === 'api') {
        if (!['xhr', 'fetch', 'other'].includes(e.resourceType)) return false;
        if (e.resourceType === 'other' && e.method === 'GET' && !/\/api\/|graphql/i.test(e.url)) return false;
      }
      if (filters.resourceType === 'xhr' && e.resourceType !== 'xhr') return false;
      if (filters.resourceType === 'fetch' && e.resourceType !== 'fetch') return false;
    }
    if (filters.statusMin != null && e.status < filters.statusMin) return false;
    if (filters.statusMax != null && e.status > filters.statusMax) return false;
    if (filters.minTime != null && e.time < filters.minTime) return false;
    return true;
  });
}

/** Decode payload for inspector: JSON, form, base64, GraphQL. */
export function decodePayload(text: string, mimeType?: string): { type: string; decoded: string } {
  if (!text?.trim()) return { type: 'empty', decoded: '' };
  const mime = (mimeType || '').toLowerCase();
  if (mime.includes('json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(text);
      return { type: 'JSON', decoded: JSON.stringify(parsed, null, 2) };
    } catch {
      return { type: 'JSON (invalid)', decoded: text };
    }
  }
  if (mime.includes('graphql') || text.trim().startsWith('query ') || text.trim().startsWith('mutation ')) {
    return { type: 'GraphQL', decoded: text };
  }
  if (mime.includes('x-www-form-urlencoded')) {
    try {
      const params = new URLSearchParams(text);
      const obj: Record<string, string> = {};
      params.forEach((v, k) => {
        obj[k] = v;
      });
      return { type: 'Form', decoded: JSON.stringify(obj, null, 2) };
    } catch {
      return { type: 'Form', decoded: text };
    }
  }
  if (/^[A-Za-z0-9+/=]+=*$/.test(text.trim()) && text.length > 20) {
    try {
      const decoded = atob(text.trim());
      return { type: 'Base64', decoded };
    } catch {
      // not base64
    }
  }
  return { type: 'Raw', decoded: text };
}

/** Batch: generate a shell script with one curl per request. */
export function generateBatchScript(
  entries: NormalizedHarEntry[],
  options: HarConvertOptions = {}
): string {
  const lines = ['#!/bin/bash', '# Generated from HAR – replay API calls', ''];
  entries.forEach((e) => {
    const curl = generateCurlFromHarEntry(e, options);
    lines.push(curl.replace(/\s*\\\s*\n\s*/g, ' '));
    lines.push('');
  });
  return lines.join('\n');
}

/** AI debug prompt for one request. */
export function generateHarAIDebugPrompt(normalized: NormalizedHarEntry, options: HarConvertOptions = {}): string {
  const parsed = harEntryToParsedCurl(normalized, { ...options, maskSecrets: true });
  const timing = getHarTiming(normalized.entry);
  return `I'm debugging this API request.

Endpoint: ${parsed.method} ${normalized.pathname}
URL: ${parsed.url}
Status: ${normalized.status} ${normalized.statusText}
Timing: Total ${timing.total}ms (DNS ${timing.dns}ms, Connect ${timing.connect}ms, TTFB ${timing.ttfb}ms, Download ${timing.download}ms)

Headers:
${Object.entries(parsed.headers).map(([k, v]) => `  ${k}: ${v}`).join('\n')}
${parsed.data ? `\nPayload:\n${parsed.data}` : ''}

The API returns ${normalized.status} error. What could be wrong?`;
}

/** Convert HAR entry to target language (uses curlConverter). */
export function harEntryToLanguage(
  normalized: NormalizedHarEntry,
  target: CurlTarget,
  options: HarConvertOptions = {}
): string {
  const parsed = harEntryToParsedCurl(normalized, options);
  return convertToLanguage(parsed, target);
}

/** Ruby (Net::HTTP) – not in curlConverter, so we add here. */
export function harEntryToRuby(normalized: NormalizedHarEntry, options: HarConvertOptions = {}): string {
  const parsed = harEntryToParsedCurl(normalized, options);
  const { url, method, headers, data } = parsed;
  const uri = `URI("${url}")`;
  const lines = [
    'require "net/http"',
    'require "json"',
    '',
    `url = ${uri}`,
    `http = Net::HTTP.new(url.host, url.port)`,
    `http.use_ssl = (url.scheme == "https")`,
    '',
    `request = Net::HTTP::${method === 'GET' ? 'Get' : method === 'POST' ? 'Post' : method === 'PUT' ? 'Put' : method === 'PATCH' ? 'Patch' : method === 'DELETE' ? 'Delete' : method === 'HEAD' ? 'Head' : 'Get'}.new(url.request_uri)`,
  ];
  Object.entries(headers).forEach(([k, v]) => {
    lines.push(`request["${k}"] = "${v.replace(/"/g, '\\"')}"`);
  });
  if (data && !['GET', 'HEAD'].includes(method)) {
    lines.push(`request.body = ${data.trim().startsWith('{') ? data : `'${data.replace(/'/g, "\\'")}'`}`);
  }
  lines.push('', 'response = http.request(request)', 'puts response.body');
  return lines.join('\n');
}

/** Re-export for UI: Postman / OpenAPI from parsed. */
export {
  generatePostmanCollection,
  generateOpenAPISpec,
  generateAIPrompt,
};
export type { CurlTarget };
