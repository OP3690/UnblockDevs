/**
 * CORS Tester Engine
 * Analyzes CORS response headers, security misconfigurations, generates cURL and code snippets.
 * Actual requests are made from the client (fetch); this module provides analysis and helpers.
 */

export interface CorsHeaders {
  allowOrigin: string | null;
  allowMethods: string | null;
  allowHeaders: string | null;
  allowCredentials: string | null;
  maxAge: string | null;
  exposeHeaders: string | null;
  raw: Record<string, string>;
}

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface SecurityFinding {
  severity: Severity;
  title: string;
  message: string;
  recommendation?: string;
}

export interface CorsAnalysis {
  headers: CorsHeaders;
  findings: SecurityFinding[];
  score: number; // 0-100
  summary: string;
  preflightCachedSeconds: number | null;
}

const CORS_HEADER_KEYS = [
  'access-control-allow-origin',
  'access-control-allow-methods',
  'access-control-allow-headers',
  'access-control-allow-credentials',
  'access-control-max-age',
  'access-control-expose-headers',
];

export function parseCorsHeaders(headers: Headers): CorsHeaders {
  const raw: Record<string, string> = {};
  headers.forEach((value, key) => {
    raw[key] = value;
  });
  const get = (name: string): string | null => {
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(raw)) {
      if (k.toLowerCase() === lower) return v;
    }
    return null;
  };
  return {
    allowOrigin: get('access-control-allow-origin'),
    allowMethods: get('access-control-allow-methods'),
    allowHeaders: get('access-control-allow-headers'),
    allowCredentials: get('access-control-allow-credentials'),
    maxAge: get('access-control-max-age'),
    exposeHeaders: get('access-control-expose-headers'),
    raw,
  };
}

export function analyzeCors(headers: CorsHeaders, options: { withCredentials: boolean; origin: string }): CorsAnalysis {
  const findings: SecurityFinding[] = [];
  let score = 100;

  const allowOrigin = headers.allowOrigin?.trim() ?? null;
  const allowCredentials = headers.allowCredentials?.toLowerCase() === 'true';
  const wildcardOrigin = allowOrigin === '*';

  // CRITICAL: wildcard + credentials
  if (wildcardOrigin && allowCredentials) {
    findings.push({
      severity: 'CRITICAL',
      title: 'Wildcard origin with credentials',
      message: 'Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true is forbidden by the spec. Browsers will reject it.',
      recommendation: 'Use a specific origin list or reflect the request Origin instead of *.',
    });
    score -= 40;
  }

  // HIGH: wildcard when credentials are used in request
  if (wildcardOrigin && options.withCredentials) {
    findings.push({
      severity: 'HIGH',
      title: 'Wildcard allows any origin',
      message: 'Access-Control-Allow-Origin: * allows any website to call this API. With credentials, this is a security risk.',
      recommendation: 'Restrict to specific origins (e.g. https://yourdomain.com).',
    });
    score -= 25;
  }

  // HIGH: sensitive API with wildcard
  if (wildcardOrigin && !options.withCredentials) {
    findings.push({
      severity: 'MEDIUM',
      title: 'Wildcard origin',
      message: 'Any origin can access this resource. Acceptable for public APIs; avoid for authenticated or sensitive data.',
      recommendation: 'Consider restricting to known origins for better security.',
    });
    score -= 10;
  }

  // MEDIUM: missing Max-Age for preflight
  const maxAge = headers.maxAge ? parseInt(headers.maxAge, 10) : null;
  if (!headers.maxAge && (headers.allowMethods || headers.allowHeaders)) {
    findings.push({
      severity: 'LOW',
      title: 'No Access-Control-Max-Age',
      message: 'Preflight responses are not cached. Each non-simple request will trigger a new OPTIONS request.',
      recommendation: 'Set Access-Control-Max-Age (e.g. 86400) to cache preflight for 24 hours.',
    });
    score -= 5;
  }

  // Credentials mismatch
  if (options.withCredentials && allowOrigin === '*') {
    findings.push({
      severity: 'HIGH',
      title: 'Credentials with wildcard',
      message: 'You sent credentials (cookies/auth) but server responded with *. Browsers block this.',
      recommendation: 'Server must echo the request Origin (e.g. Access-Control-Allow-Origin: ' + options.origin + ') and set Allow-Credentials: true.',
    });
  }

  // Reflected origin - good
  if (allowOrigin && allowOrigin !== '*' && allowOrigin === options.origin) {
    findings.push({
      severity: 'INFO',
      title: 'Origin reflected',
      message: 'Server reflects your origin. This is correct for credential-including requests.',
    });
  }

  const preflightCachedSeconds = maxAge && !Number.isNaN(maxAge) ? maxAge : null;
  let summary = 'CORS headers present. ';
  if (findings.some((f) => f.severity === 'CRITICAL' || f.severity === 'HIGH')) {
    summary = 'Security issues detected. ';
  }
  if (wildcardOrigin) summary += 'Any origin is allowed. ';
  else if (allowOrigin) summary += `Allowed origin: ${allowOrigin}. `;
  if (allowCredentials) summary += 'Credentials allowed. ';
  if (preflightCachedSeconds != null) summary += `Preflight cached ${preflightCachedSeconds}s. `;

  return {
    headers,
    findings,
    score: Math.max(0, score),
    summary: summary.trim(),
    preflightCachedSeconds,
  };
}

export function buildPreflightCurl(
  url: string,
  method: string,
  origin: string,
  requestHeaders: string[]
): string {
  const lines = [
    `curl -X OPTIONS "${url}"`,
    `  -H "Origin: ${origin}"`,
    `  -H "Access-Control-Request-Method: ${method}"`,
  ];
  if (requestHeaders.length > 0) {
    const headerList = requestHeaders.map((h) => h.trim()).filter(Boolean);
    if (headerList.length > 0) {
      lines.push(`  -H "Access-Control-Request-Headers: ${headerList.join(', ')}"`);
    }
  }
  lines.push('  -v');
  return lines.join(' \\\n');
}

export function buildActualCurl(
  url: string,
  method: string,
  origin: string,
  headers: Record<string, string>,
  withCredentials: boolean
): string {
  const lines = [`curl -X ${method} "${url}"`, `  -H "Origin: ${origin}"`];
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === 'origin') continue;
    lines.push(`  -H "${k}: ${v}"`);
  }
  if (withCredentials) {
    lines.push('  --cookie "session=YOUR_SESSION_COOKIE"');
  }
  lines.push('  -v');
  return lines.join(' \\\n');
}

export function getPreflightRequestHeaders(method: string, customHeaders: string[]): Record<string, string> {
  const h: Record<string, string> = {
    'Origin': 'https://example.com', // placeholder for display
    'Access-Control-Request-Method': method,
  };
  const headers = customHeaders.map((x) => x.split(':')[0]?.trim()).filter(Boolean);
  if (headers.length > 0) {
    h['Access-Control-Request-Headers'] = headers.join(', ');
  }
  return h;
}

export const CODE_SNIPPETS = {
  fetch: (url: string, method: string, withCredentials: boolean, headers: Record<string, string>) => {
    const opts: string[] = [`  method: "${method}"`, `  credentials: "${withCredentials ? 'include' : 'omit'}"`];
    if (Object.keys(headers).length > 0) {
      opts.push('  headers: {');
      for (const [k, v] of Object.entries(headers)) {
        opts.push(`    "${k}": "${v.replace(/"/g, '\\"')}"`);
      }
      opts.push('  }');
    }
    return `fetch("${url}", {\n${opts.join(',\n')}\n});`;
  },
  axios: (url: string, method: string, withCredentials: boolean, headers: Record<string, string>) => {
    const opts = [`method: '${method}'`, `url: '${url}'`, `withCredentials: ${withCredentials}`];
    if (Object.keys(headers).length > 0) {
      opts.push(`headers: ${JSON.stringify(headers)}`);
    }
    return `axios({ ${opts.join(', ')} });`;
  },
  python: (url: string, method: string, _credentials: boolean, headers: Record<string, string>) => {
    const h = { Origin: 'https://example.com', ...headers };
    return `import requests\nrequests.${method.toLowerCase()}("${url}", headers=${JSON.stringify(h)})`;
  },
};

export const MULTI_ORIGIN_PRESETS = [
  { label: 'Current page', value: '' },
  { label: 'localhost', value: 'https://localhost:3000' },
  { label: 'evil.com (test)', value: 'https://evil.com' },
  { label: 'null', value: 'null' },
  { label: 'Subdomain', value: 'https://app.example.com' },
];

export function explainBlockedReason(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
    return 'Request failed. Common causes: CORS policy blocked (no Allow-Origin or origin mismatch), network error, or server not responding.';
  }
  if (msg.includes('CORS') || msg.includes('cross-origin')) {
    return 'CORS policy blocked the response. The server may not include your origin in Access-Control-Allow-Origin, or credentials were sent but server returned *.';
  }
  return msg;
}

export function needsPreflight(method: string, headers: Record<string, string>): boolean {
  const simpleMethods = ['GET', 'HEAD', 'POST'];
  const simpleHeaders = ['accept', 'accept-language', 'content-language', 'content-type'];
  const contentTypeValues = ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'];
  if (!simpleMethods.includes(method.toUpperCase())) return true;
  for (const key of Object.keys(headers)) {
    const k = key.toLowerCase();
    if (!simpleHeaders.includes(k)) return true;
    if (k === 'content-type') {
      const v = (headers[key] || '').toLowerCase();
      if (!contentTypeValues.some((t) => v.includes(t))) return true;
    }
  }
  return false;
}
