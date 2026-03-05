/**
 * Advanced cURL Converter – parse, sanitize, multi-language code gen, Postman/OpenAPI.
 */

export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  data: string;
  auth: { type: 'basic' | 'bearer' | 'api_key'; username?: string; password?: string; token?: string; header?: string } | null;
  queryParams: Record<string, string>;
  cookies: Record<string, string>;
  isMultipart: boolean;
  formData?: Array<{ key: string; value: string; file?: boolean }>;
}

export type CurlTarget =
  | 'js_fetch'
  | 'js_axios'
  | 'python_requests'
  | 'python_httpx'
  | 'go'
  | 'java'
  | 'php'
  | 'csharp'
  | 'rust'
  | 'node_fetch';

const SECRET_PATTERNS = {
  bearer: /Bearer\s+[^\s'"]+/gi,
  basic: /Basic\s+[A-Za-z0-9+/=]+/gi,
  apiKey: /(?:api[_-]?key|apikey|x-api-key)\s*[:=]\s*['"]?[^\s'"]+['"]?/gi,
  cookie: /(?:cookie|session|token)\s*[:=]\s*['"]?[^\s'"]+['"]?/gi,
};

/** Parse a cURL command into structured data. */
export function parseCurl(curl: string): ParsedCurl | null {
  const normalized = curl.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized.toLowerCase().startsWith('curl')) return null;

  let url = '';
  let method = 'GET';
  const headers: Record<string, string> = {};
  let data = '';
  let auth: ParsedCurl['auth'] = null;
  const queryParams: Record<string, string> = {};
  const cookies: Record<string, string> = {};
  let isMultipart = false;
  const formData: Array<{ key: string; value: string; file?: boolean }> = [];

  // URL: after optional flags and optional method word (e.g. "curl -X GET https://...")
  const urlMatch = normalized.match(/(?:^curl\s+)(?:-[^\s]+[\s]+)*(?:\w+\s+)?(?:['"]?)(https?:\/\/[^\s'"]+)(?:['"]?)/);
  if (urlMatch) {
    url = urlMatch[1];
    try {
      const u = new URL(url);
      u.searchParams.forEach((v, k) => {
        queryParams[k] = v;
      });
    } catch {
      // keep url as-is
    }
  }

  // Method
  const methodMatch = normalized.match(/-X\s+(\w+)/i);
  if (methodMatch) method = methodMatch[1].toUpperCase();

  // Headers -H or --header
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = headerRegex.exec(normalized)) !== null) {
    const idx = m[1].indexOf(':');
    if (idx > 0) {
      const key = m[1].slice(0, idx).trim();
      const value = m[1].slice(idx + 1).trim();
      headers[key] = value;
    }
  }

  // Data -d, --data, --data-raw, --data-binary
  const dataRegex = /(?:-d|--data|--data-raw|--data-binary)\s+['"]([^'"]*)['"]|(?:-d|--data|--data-raw|--data-binary)\s+([^\s-][^\s]*)/g;
  let dataMatch;
  while ((dataMatch = dataRegex.exec(normalized)) !== null) {
    data = (dataMatch[1] ?? dataMatch[2] ?? '').replace(/\\'/g, "'");
  }

  // Basic auth -u
  const authMatch = normalized.match(/(?:-u|--user)\s+['"]?([^'"]+)['"]?/);
  if (authMatch) {
    const authStr = authMatch[1];
    const colonIdx = authStr.indexOf(':');
    if (colonIdx >= 0) {
      auth = {
        type: 'basic',
        username: authStr.slice(0, colonIdx),
        password: authStr.slice(colonIdx + 1),
      };
    }
  }

  // Bearer from Authorization header
  if (!auth && headers['Authorization']?.startsWith('Bearer ')) {
    auth = { type: 'bearer', token: headers['Authorization'].replace(/Bearer\s+/i, '').trim() };
  }

  // Cookie --cookie or -b
  const cookieRegex = /(?:--cookie|-b)\s+['"]?([^'"]+)['"]?/g;
  let cookieMatch;
  while ((cookieMatch = cookieRegex.exec(normalized)) !== null) {
    const parts = cookieMatch[1].split(';').map((p) => p.trim());
    for (const p of parts) {
      const eq = p.indexOf('=');
      if (eq > 0) cookies[p.slice(0, eq).trim()] = p.slice(eq + 1).trim();
    }
  }

  // Multipart -F / --form
  const formRegex = /(?:-F|--form)\s+['"]([^'"]+)['"]/g;
  while ((m = formRegex.exec(normalized)) !== null) {
    isMultipart = true;
    const formPart = m[1];
    if (formPart.includes('=@')) {
      const eq = formPart.indexOf('=@');
      formData.push({ key: formPart.slice(0, eq).trim(), value: formPart.slice(eq + 2).trim(), file: true });
    } else {
      const eq = formPart.indexOf('=');
      if (eq > 0) formData.push({ key: formPart.slice(0, eq), value: formPart.slice(eq + 1), file: false });
    }
  }

  if (!url) return null;

  return {
    url,
    method,
    headers,
    data,
    auth,
    queryParams,
    cookies,
    isMultipart,
    formData: formData.length ? formData : undefined,
  };
}

/** Mask secrets for display. */
export function sanitizeForDisplay(parsed: ParsedCurl): { headers: Record<string, string>; authSummary: string } {
  const headers = { ...parsed.headers };
  let authSummary = 'None';

  if (parsed.auth?.type === 'bearer') {
    authSummary = 'Bearer ***';
    if (headers['Authorization']) headers['Authorization'] = 'Bearer ***';
  } else if (parsed.auth?.type === 'basic') {
    authSummary = 'Basic ***';
    if (headers['Authorization']) headers['Authorization'] = 'Basic ***';
  } else if (parsed.auth?.type === 'api_key') {
    authSummary = 'API Key ***';
  }

  for (const key of Object.keys(headers)) {
    const lower = key.toLowerCase();
    if (lower.includes('authorization') || lower.includes('api-key') || lower.includes('token')) {
      if (!headers[key].startsWith('***')) headers[key] = headers[key].slice(0, 10) + '***';
    }
  }
  return { headers, authSummary };
}

/** Detect auth type for breakdown. */
export function detectAuthType(parsed: ParsedCurl): string {
  if (parsed.auth?.type === 'bearer') return 'Bearer Token';
  if (parsed.auth?.type === 'basic') return 'Basic Auth';
  if (parsed.auth?.type === 'api_key') return 'API Key';
  for (const k of Object.keys(parsed.headers)) {
    if (k.toLowerCase().includes('authorization') && parsed.headers[k].startsWith('Bearer')) return 'Bearer Token';
    if (k.toLowerCase().includes('api-key') || k.toLowerCase().includes('apikey')) return 'API Key';
  }
  if (Object.keys(parsed.cookies).length) return 'Cookie';
  return 'None';
}

/** Request breakdown for debug view. */
export function getRequestBreakdown(parsed: ParsedCurl) {
  const { headers, authSummary } = sanitizeForDisplay(parsed);
  const queryCount = Object.keys(parsed.queryParams).length;
  let bodyType = 'None';
  let bodySize = 0;
  if (parsed.data) {
    bodySize = new Blob([parsed.data]).size;
    const trimmed = parsed.data.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) bodyType = 'JSON';
    else bodyType = 'Raw';
  }
  if (parsed.isMultipart) bodyType = 'Multipart';
  return {
    method: parsed.method,
    url: parsed.url,
    queryParams: parsed.queryParams,
    headerCount: Object.keys(headers).length,
    headers,
    authSummary,
    bodyType,
    bodySize,
  };
}

/** Warnings and errors. */
export function getCurlWarnings(parsed: ParsedCurl): { type: 'warning' | 'error'; message: string }[] {
  const out: { type: 'warning' | 'error'; message: string }[] = [];
  const trimmed = parsed.data?.trim() ?? '';
  const looksLikeJson = trimmed.startsWith('{') || trimmed.startsWith('[');
  if (looksLikeJson && parsed.data) {
    const ct = parsed.headers['Content-Type'] ?? parsed.headers['content-type'];
    if (!ct || !ct.includes('application/json')) {
      out.push({ type: 'warning', message: 'JSON body detected but Content-Type: application/json header may be missing.' });
    }
    try {
      JSON.parse(parsed.data);
    } catch {
      out.push({ type: 'error', message: 'Request body contains invalid JSON.' });
    }
  }
  return out;
}

/** Beautify cURL command. */
export function beautifyCurl(curl: string): string {
  const normalized = curl.replace(/\\\n/g, '\n').replace(/\s+/g, ' ').trim();
  if (!normalized.toLowerCase().startsWith('curl')) return curl;
  let out = 'curl';
  const rest = normalized.slice(4).trim();
  const parts: string[] = [];
  let i = 0;
  while (i < rest.length) {
    if (rest[i] === '-' && rest[i + 1] === '-') {
      const end = rest.indexOf(' ', i + 2);
      const flag = end > 0 ? rest.slice(i, end) : rest.slice(i);
      i = end > 0 ? end + 1 : rest.length;
      if (flag === '--data' || flag === '--data-raw' || flag === '-d') {
        const quote = rest[i] === "'" ? "'" : '"';
        const close = rest.indexOf(quote, i + 1);
        const value = close > 0 ? rest.slice(i, close + 1) : rest.slice(i);
        parts.push(flag + ' ' + value);
        i = close > 0 ? close + 1 : rest.length;
      } else parts.push(flag);
    } else if (rest[i] === '-' && rest[i + 1] !== ' ') {
      const flag = rest.slice(i, i + 2);
      i += 2;
      if ((flag === '-d' || flag === '-H') && rest[i] === ' ') {
        i++;
        const quote = rest[i];
        const close = rest.indexOf(quote, i + 1);
        const value = close > 0 ? rest.slice(i, close + 1) : rest.slice(i).trim();
        parts.push(flag + ' ' + value);
        i = close > 0 ? close + 1 : rest.length;
      } else parts.push(flag);
    } else if (rest[i] === ' ') {
      i++;
    } else {
      const quote = rest[i] === "'" || rest[i] === '"' ? rest[i] : null;
      const start = i;
      if (quote) {
        i++;
        const close = rest.indexOf(quote, i);
        const value = close > 0 ? rest.slice(start, close + 1) : rest.slice(start);
        parts.push(value);
        i = close > 0 ? close + 1 : rest.length;
      } else {
        const space = rest.indexOf(' ', i);
        const value = space > 0 ? rest.slice(i, space) : rest.slice(i);
        parts.push(value);
        i = space > 0 ? space + 1 : rest.length;
      }
    }
  }
  return 'curl \\\n  ' + parts.join(' \\\n  ');
}

/** Escape string for code gen. */
function esc(s: string, lang: string): string {
  const d = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  if (lang === 'python' || lang === 'js') return d.replace(/'/g, "\\'");
  return d;
}

/** Convert parsed cURL to target language code. */
export function convertToLanguage(parsed: ParsedCurl, target: CurlTarget): string {
  const { url, method, headers, data, auth } = parsed;
  const hasBody = !!data && method !== 'GET';
  const isJson = data?.trim().startsWith('{') || data?.trim().startsWith('[');

  const allHeaders = { ...headers };
  if (auth?.type === 'bearer' && !allHeaders['Authorization']) {
    allHeaders['Authorization'] = `Bearer ${auth.token}`;
  }
  if (auth?.type === 'basic') {
    const cred = typeof btoa !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
    allHeaders['Authorization'] = `Basic ${cred}`;
  }

  const headerEntries = Object.entries(allHeaders);

  switch (target) {
    case 'js_fetch': {
      const bodyLine = hasBody ? (isJson ? `body: JSON.stringify(${data}),` : `body: \`${esc(data, 'js')}\`,`) : '';
      const headersStr = headerEntries.map(([k, v]) => `  '${k}': '${esc(v, 'js')}'`).join(',\n  ');
      return `const response = await fetch('${url}', {
  method: '${method}',
  headers: {
${headersStr}
  }${bodyLine ? ',\n  ' + bodyLine : ''}
});
const data = await response.json();
console.log(data);
`;
    }

    case 'js_axios': {
      const bodyLine = hasBody ? (isJson ? `data: ${data},` : `data: \`${esc(data, 'js')}\`,`) : '';
      const headersStr = headerEntries.map(([k, v]) => `    '${k}': '${esc(v, 'js')}'`).join(',\n');
      return `const axios = require('axios');

const response = await axios.${method.toLowerCase()}({
  url: '${url}',
  headers: {
${headersStr}
  }${bodyLine ? ',\n  ' + bodyLine : ''}
});
console.log(response.data);
`;
    }

    case 'python_requests': {
      const authLine = auth?.type === 'basic' ? `    auth=('${auth.username}', '${auth.password}'),\n` : '';
      const bodyLine = hasBody ? (isJson ? `    json=${data},\n` : `    data='${esc(data, 'python')}',\n`) : '';
      const headersStr = headerEntries.map(([k, v]) => `    "${k}": "${esc(v, 'python')}"`).join(',\n  ');
      return `import requests

response = requests.${method.toLowerCase()}(
    "${url}",
    headers={\n  ${headersStr}\n}${authLine}${bodyLine})
print(response.json())
`;
    }

    case 'python_httpx': {
      const authLine = auth?.type === 'basic' ? `    auth=("${auth.username}", "${auth.password}"),\n` : '';
      const bodyLine = hasBody ? (isJson ? `    json=${data},\n` : `    content=b'${esc(data, 'python')}',\n`) : '';
      const headersStr = headerEntries.map(([k, v]) => `    "${k}": "${esc(v, 'python')}"`).join(',\n  ');
      return `import httpx

with httpx.Client() as client:
    response = client.${method.toLowerCase()}(
        "${url}",
        headers={\n  ${headersStr}\n}${authLine}${bodyLine})
    print(response.json())
`;
    }

    case 'go': {
      const bodyParam = hasBody ? `strings.NewReader(\`${data.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)` : 'nil';
      const headerLines = headerEntries.map(([k, v]) => `    req.Header.Set("${k}", "${esc(v, 'go')}")`).join('\n');
      return `package main

import (
    "io"
    "net/http"
    "strings"
)

func main() {
    req, _ := http.NewRequest("${method}", "${url}", ${bodyParam})
${headerLines}
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    println(string(body))
}
`;
    }

    case 'java': {
      const headerLines = headerEntries.map(([k, v]) => `        .header("${k}", "${esc(v, 'java')}")`).join('\n');
      const bodyPub = hasBody ? `HttpRequest.BodyPublishers.ofString("${esc(data, 'java')}")` : 'HttpRequest.BodyPublishers.noBody()';
      return `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .method("${method}", ${bodyPub})
${headerLines}
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
`;
    }

    case 'php': {
      const headerLines = headerEntries.map(([k, v]) => `    '${k}: ${esc(v, 'php')}'`).join(",\n");
      const bodyLine = hasBody ? `curl_setopt($ch, CURLOPT_POSTFIELDS, ${isJson ? data : `'${esc(data, 'php')}'`});\n` : '';
      return `<?php
$ch = curl_init('${url}');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');
curl_setopt($ch, CURLOPT_HTTPHEADER, [\n${headerLines}\n]);
${bodyLine}$response = curl_exec($ch);
curl_close($ch);
echo $response;
`;
    }

    case 'csharp': {
      const headerLines = headerEntries.map(([k, v]) => `request.Headers.Add("${k}", "${esc(v, 'csharp')}");`).join('\n');
      const bodyLine = hasBody ? `request.Content = new StringContent("${esc(data, 'csharp')}", System.Text.Encoding.UTF8, "application/json");\n        ` : '';
      return `using System.Net.Http;

using var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");
${headerLines}
${bodyLine}
var response = await client.SendAsync(request);
var body = await response.Content.ReadAsStringAsync();
Console.WriteLine(body);
`;
    }

    case 'rust': {
      const headerLines = headerEntries.map(([k, v]) => `    .header("${k}", "${esc(v, 'rust')}")`).join('\n');
      const bodyLine = hasBody ? `    .body("${esc(data, 'rust')}")` : '';
      return `let client = reqwest::blocking::Client::new();
let res = client
    .${method.toLowerCase()}("${url}")
${headerLines}
${bodyLine ? '    ' + bodyLine : '    .body("")'}
    .send()?;
let text = res.text()?;
println!("{}", text);
`;
    }

    case 'node_fetch': {
      const bodyLine = hasBody ? (isJson ? `body: JSON.stringify(${data}),` : `body: '${esc(data, 'js')}',`) : '';
      const headersStr = headerEntries.map(([k, v]) => `  '${k}': '${esc(v, 'js')}'`).join(',\n  ');
      return `const fetch = require('node-fetch');

const response = await fetch('${url}', {
  method: '${method}',
  headers: {\n${headersStr}\n}${bodyLine ? ',\n  ' + bodyLine : ''}
});
const data = await response.json();
console.log(data);
`;
    }

    default:
      return convertToLanguage(parsed, 'js_fetch');
  }
}

/** Generate Postman Collection v2.1. */
export function generatePostmanCollection(parsed: ParsedCurl): string {
  const headers: { key: string; value: string }[] = Object.entries(parsed.headers).map(([key, value]) => ({ key, value }));
  if (parsed.auth?.type === 'bearer' && !parsed.headers['Authorization']) {
    headers.push({ key: 'Authorization', value: `Bearer ${parsed.auth.token}` });
  }
  if (parsed.auth?.type === 'basic') {
    const cred = typeof btoa !== 'undefined' ? btoa(`${parsed.auth.username}:${parsed.auth.password}`) : '';
    headers.push({ key: 'Authorization', value: `Basic ${cred}` });
  }
  return JSON.stringify(
    {
      info: { name: 'cURL Import', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
      item: [
        {
          name: `${parsed.method} ${new URL(parsed.url).pathname || '/'}`,
          request: {
            method: parsed.method,
            header: headers.map((h) => ({ key: h.key, value: h.value })),
            body: parsed.data ? { mode: 'raw', raw: parsed.data } : undefined,
            url: parsed.url,
          },
        },
      ],
    },
    null,
    2
  );
}

/** Generate OpenAPI 3.0 path snippet. */
export function generateOpenAPISpec(parsed: ParsedCurl): string {
  let path = '/';
  try {
    path = new URL(parsed.url).pathname || '/';
  } catch {
    path = '/';
  }
  const params = Object.entries(parsed.queryParams).map(([name]) => ({
    name,
    in: 'query',
    schema: { type: 'string' },
  }));
  const op: Record<string, unknown> = {
    summary: `${parsed.method} ${path}`,
    responses: { 200: { description: 'OK' } },
  };
  if (params.length) op.parameters = params;
  if (parsed.data?.trim().startsWith('{')) {
    op.requestBody = {
      content: { 'application/json': { schema: { type: 'object' } } },
    };
  }
  return JSON.stringify(
    {
      openapi: '3.0.0',
      info: { title: 'API', version: '1.0.0' },
      paths: { [path]: { [parsed.method.toLowerCase()]: op } },
    },
    null,
    2
  );
}

/** Generate AI prompt for "Explain this request". */
export function generateAIPrompt(parsed: ParsedCurl): string {
  const breakdown = getRequestBreakdown(parsed);
  return `Explain what this API request does and suggest improvements.

Method: ${breakdown.method}
URL: ${breakdown.url}
Headers: ${Object.keys(breakdown.headers).length}
Auth: ${breakdown.authSummary}
Body type: ${breakdown.bodyType}
Body size: ${breakdown.bodySize} bytes

Headers:
${Object.entries(breakdown.headers).map(([k, v]) => `  ${k}: ${v}`).join('\n')}
${parsed.data ? `\nBody (first 500 chars):\n${parsed.data.slice(0, 500)}` : ''}
`;
}

/** Detect if request contains secrets (for security banner). */
export function detectSecrets(parsed: ParsedCurl): string[] {
  const found: string[] = [];
  const str = JSON.stringify(parsed.headers) + parsed.data + (parsed.auth ? JSON.stringify(parsed.auth) : '');
  if (/Bearer\s+[A-Za-z0-9_-]{20,}/i.test(str)) found.push('Bearer token');
  if (/Basic\s+[A-Za-z0-9+/=]+/.test(str)) found.push('Basic auth');
  if (/api[_-]?key|apikey|x-api-key/i.test(str) && /[:=]\s*['"]?[^\s'"]{10,}/.test(str)) found.push('API key');
  if (/password|secret/i.test(str) && /[:=]\s*['"]?[^\s'"]+/.test(str)) found.push('Password/secret');
  if (/eyJ[A-Za-z0-9_-]+\.eyJ/.test(str)) found.push('JWT');
  return found;
}
