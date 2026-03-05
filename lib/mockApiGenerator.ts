/**
 * Advanced Mock API Generator – template placeholders, code generation, exports.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type AuthType = 'none' | 'api_key' | 'bearer' | 'basic';
export type ResponseMode = 'static' | 'template' | 'random';

export const STATUS_CODES = [200, 201, 400, 401, 403, 404, 500] as const;
export type StatusCode = (typeof STATUS_CODES)[number];

const FAKE_NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
const FAKE_LAST = ['Smith', 'Jones', 'Brown', 'Lee', 'Wilson', 'Taylor', 'Clark', 'White', 'Harris', 'Martin'];
const FAKE_COUNTRIES = ['US', 'UK', 'DE', 'FR', 'IN', 'CA', 'AU', 'JP', 'BR', 'ES'];

let seed = 12345;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (seededRandom() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomInt(min: number = 0, max: number = 100): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

/** Resolve a single placeholder. */
export function resolvePlaceholder(placeholder: string, index: number = 0): string | number | boolean {
  const key = placeholder.toLowerCase().replace(/\s/g, '');
  if (key === 'uuid') return uuid();
  if (key === 'name') return FAKE_NAMES[index % FAKE_NAMES.length] + ' ' + FAKE_LAST[index % FAKE_LAST.length];
  if (key === 'firstname' || key === 'first_name') return FAKE_NAMES[index % FAKE_NAMES.length];
  if (key === 'lastname' || key === 'last_name') return FAKE_LAST[index % FAKE_LAST.length];
  if (key === 'email') return `user${index + 1}@example.com`;
  if (key === 'timestamp' || key === 'date') return Math.floor(Date.now() / 1000).toString();
  if (key === 'isodate') return new Date().toISOString();
  if (key === 'random_int') return randomInt(0, 100);
  const intMatch = key.match(/random_int\((\d+),(\d+)\)/);
  if (intMatch) return randomInt(parseInt(intMatch[1], 10), parseInt(intMatch[2], 10));
  if (key === 'random_bool' || key === 'boolean') return seededRandom() > 0.5;
  if (key === 'ip') return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 255)}`;
  if (key === 'country') return FAKE_COUNTRIES[index % FAKE_COUNTRIES.length];
  if (key === 'id') return String(index + 1);
  return placeholder;
}

/** Replace {{placeholder}} in a string. */
function replacePlaceholdersInString(str: string, index: number = 0): string {
  return str.replace(/\{\{(\w+(?:\([^)]*\))?)\}\}/gi, (_, key) => {
    const val = resolvePlaceholder(key.trim(), index);
    return String(val);
  });
}

/** Recursively resolve placeholders in an object. */
export function resolveTemplate(obj: unknown, itemIndex: number = 0): unknown {
  if (typeof obj === 'string') {
    return replacePlaceholdersInString(obj, itemIndex);
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) => resolveTemplate(item, itemIndex * 10 + i));
  }
  if (obj !== null && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = resolveTemplate(v, itemIndex);
    }
    return out;
  }
  return obj;
}

/** Resolve template and optionally repeat array items (e.g. users array with 10 items). */
export function resolveTemplateWithCount(
  template: string,
  options: { count?: number; page?: number; limit?: number }
): { body: unknown; total?: number } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(template);
  } catch {
    return { body: {} };
  }
  const limit = options.limit ?? 10;
  const page = options.page ?? 1;
  const total = options.count ?? limit;
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, total);

  const resolved = resolveTemplate(parsed, 0);
  if (Array.isArray(resolved)) {
    const filled: unknown[] = [];
    for (let i = start; i < end; i++) {
      const itemTemplate = (parsed as unknown[])[0];
      if (itemTemplate !== undefined) filled.push(resolveTemplate(JSON.parse(JSON.stringify(itemTemplate)), i));
      else filled.push(resolved[i] ?? resolveTemplate({ id: i + 1 }, i));
    }
    return { body: filled, total: options.count ?? filled.length };
  }
  if (resolved !== null && typeof resolved === 'object') {
    const obj = resolved as Record<string, unknown>;
    if ('data' in obj && Array.isArray(obj.data) && obj.data.length > 0) {
      const itemTemplate = obj.data[0];
      const data: unknown[] = [];
      for (let i = start; i < end; i++) {
        data.push(resolveTemplate(JSON.parse(JSON.stringify(itemTemplate)), i));
      }
      return {
        body: { ...obj, data, page, limit, total: options.count ?? total },
        total: options.count ?? total,
      };
    }
  }

  const out = resolveTemplate(parsed, 0);
  return { body: out, total };
}

export interface ConditionalRule {
  id: string;
  condition: 'body_contains' | 'body_missing' | 'query_has' | 'header_missing';
  value: string;
  statusCode: StatusCode;
}

export interface MockApiConfig {
  endpoint: string;
  method: HttpMethod;
  statusCode: StatusCode;
  latencyMs: number;
  responseMode: ResponseMode;
  responseJson: string;
  authType: AuthType;
  authHeaderValue?: string;
  rateLimitPerMinute?: number;
  failureRatePercent?: number;
  requestBodySchema?: string;
  conditionalRules: ConditionalRule[];
  maskPii: boolean;
  itemCount?: number;
}

const DEFAULT_CONFIG: MockApiConfig = {
  endpoint: '/api/users',
  method: 'GET',
  statusCode: 200,
  latencyMs: 0,
  responseMode: 'template',
  responseJson: '{\n  "id": "{{uuid}}",\n  "name": "{{name}}",\n  "email": "{{email}}",\n  "created_at": "{{timestamp}}"\n}',
  authType: 'none',
  conditionalRules: [],
  maskPii: false,
  itemCount: 10,
};

export function getDefaultConfig(): MockApiConfig {
  return { ...DEFAULT_CONFIG };
}

/** Generate Express server code with auth, rate limit, latency, status, conditionals, failure rate. */
export function generateExpressCode(config: MockApiConfig): string {
  const authCheck =
    config.authType === 'none'
      ? ''
      : config.authType === 'bearer'
        ? `
  const auth = req.headers.authorization;
  if (!auth || auth !== 'Bearer ${config.authHeaderValue || 'demo-token'}') {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or missing token' });
  }`
        : config.authType === 'api_key'
          ? `
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (apiKey !== '${config.authHeaderValue || 'your-api-key'}') {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid API key' });
  }`
          : config.authType === 'basic'
            ? `
  const auth = req.headers.authorization;
  const expected = Buffer.from('user:pass').toString('base64');
  if (!auth || auth !== 'Basic ' + expected) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid Basic auth' });
  }`
            : '';

  const rateLimitCode =
    config.rateLimitPerMinute && config.rateLimitPerMinute > 0
      ? `
  const rateLimitKey = req.ip || 'anonymous';
  const now = Date.now();
  if (!global.__mockRate[rateLimitKey]) global.__mockRate[rateLimitKey] = { count: 0, resetAt: now + 60000 };
  const r = global.__mockRate[rateLimitKey];
  if (now > r.resetAt) { r.count = 0; r.resetAt = now + 60000; }
  r.count++;
  if (r.count > ${config.rateLimitPerMinute}) {
    return res.status(429).json({ error: 'Too Many Requests', retryAfter: 60 });
  }`
      : '';

  const failureRate =
    config.failureRatePercent && config.failureRatePercent > 0
      ? `
  if (Math.random() * 100 < ${config.failureRatePercent}) {
    return res.status(500).json({ error: 'Internal Server Error', message: 'Simulated failure' });
  }
  if (Math.random() * 100 < ${config.failureRatePercent}) {
    return res.status(429).json({ error: 'Too Many Requests', message: 'Simulated rate limit' });
  }`
      : '';

  const conditionals = config.conditionalRules
    .map((r) => {
      const cond =
        r.condition === 'body_contains'
          ? `req.body && JSON.stringify(req.body).includes(${JSON.stringify(r.value)})`
          : r.condition === 'body_missing'
            ? `(!req.body || !req.body[${JSON.stringify(r.value)}])`
            : r.condition === 'query_has'
              ? `req.query[${JSON.stringify(r.value)}]`
              : `!req.headers[${JSON.stringify(r.value.toLowerCase())}]`;
      return `  if (${cond}) { return res.status(${r.statusCode}).json({ error: 'Condition met' }); }`;
    })
    .join('\n');

  const staticPayload = config.responseMode === 'static'
    ? `JSON.parse(\`${config.responseJson.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`)`
    : null;
  const templatePayload = config.responseMode !== 'static'
    ? `resolveTemplate(JSON.parse(\`${config.responseJson.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`), ${config.itemCount ?? 10})`
    : null;
  const responseData = staticPayload || templatePayload || '{}';
  const templateHelper =
    config.responseMode !== 'static'
      ? `
function resolveTemplate(obj, count) {
  const names = ['Alice','Bob','Carol','Dave','Eve'];
  const repl = (v, i) => {
    if (typeof v === 'string') {
      return v.replace(/\\\\{\\\\{\\\\s*(\\\\w+)\\\\}\\\\}/gi, (_, k) => {
        if (k === 'uuid') return require('crypto').randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        if (k === 'name') return names[i % names.length] + ' User';
        if (k === 'email') return 'user' + (i+1) + '@example.com';
        if (k === 'timestamp') return Math.floor(Date.now()/1000);
        if (k === 'random_int') return Math.floor(Math.random()*100);
        if (k === 'random_bool') return Math.random() > 0.5;
        if (k === 'id') return i + 1;
        return '{{' + k + '}}';
      });
    }
    if (Array.isArray(v)) return v.map((x, j) => repl(x, i));
    if (v && typeof v === 'object') { const o = {}; for (const key of Object.keys(v)) o[key] = repl(v[key], i); return o; }
    return v;
  };
  const one = repl(obj, 0);
  if (Array.isArray(one)) return one;
  if (count <= 1) return one;
  const out = []; for (let i = 0; i < count; i++) out.push(repl(JSON.parse(JSON.stringify(obj)), i)); return out;
}`
      : '';

  return `// Mock API Server - Generated by UnblockDevs Mock API Generator
// Install: npm install express cors
// Run: node mock-server.js

const express = require('express');
const cors = require('cors');
const app = express();
if (typeof global.__mockRate === 'undefined') global.__mockRate = {};
${templateHelper}
app.use(cors());
app.use(express.json());

app.${config.method.toLowerCase()}('${config.endpoint}', (req, res) => {
  ${failureRate}
  ${authCheck}
  ${rateLimitCode}
  ${conditionals}
  setTimeout(() => {
    try {
      const data = ${responseData};
      res.status(${config.statusCode}).json(data);
    } catch (e) {
      res.status(500).json({ error: 'Invalid response template' });
    }
  }, ${config.latencyMs});
});

app.listen(3001, () => {
  console.log('Mock API: http://localhost:3001${config.endpoint}');
});
`;
}

/** Generate Postman Collection v2.1. */
export function generatePostmanCollection(config: MockApiConfig): string {
  const auth =
    config.authType === 'bearer'
      ? { type: 'bearer', bearer: [{ key: 'token', value: config.authHeaderValue || 'demo-token' }] }
      : config.authType === 'api_key'
        ? { type: 'apikey', apikey: [{ key: 'key', value: 'X-Api-Key' }, { key: 'value', value: config.authHeaderValue || 'your-api-key' }] }
        : undefined;
  return JSON.stringify(
    {
      info: { name: 'Mock API - UnblockDevs', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
      item: [
        {
          name: config.method + ' ' + config.endpoint,
          request: {
            method: config.method,
            header: [],
            url: { raw: `http://localhost:3001${config.endpoint}`, host: ['localhost'], port: '3001', path: config.endpoint.split('/').filter(Boolean) },
            auth: auth ? { type: auth.type, [auth.type]: auth[auth.type as keyof typeof auth] } : undefined,
          },
        },
      ],
    },
    null,
    2
  );
}

/** Generate OpenAPI 3.0 snippet. */
export function generateOpenAPISpec(config: MockApiConfig): string {
  let exampleBody: unknown = {};
  try {
    const { body } = resolveTemplateWithCount(config.responseJson, { count: config.itemCount ?? 5 });
    exampleBody = body;
  } catch {
    exampleBody = { example: 'response' };
  }
  return JSON.stringify(
    {
      openapi: '3.0.0',
      info: { title: 'Mock API', version: '1.0.0' },
      paths: {
        [config.endpoint]: {
          [config.method.toLowerCase()]: {
            summary: config.method + ' ' + config.endpoint,
            responses: {
              [config.statusCode]: {
                description: 'Success',
                content: { 'application/json': { schema: { type: 'object' }, example: exampleBody } },
              },
            },
          },
        },
      },
    },
    null,
    2
  );
}

/** Simulate response for "Test API" panel (client-side). */
export function simulateMockResponse(
  config: MockApiConfig,
  options: { page?: number; limit?: number } = {}
): Promise<{ status: number; latencyMs: number; headers: Record<string, string>; body: unknown }> {
  const start = Date.now();
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = config.statusCode;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      let body: unknown;
      try {
        if (config.responseMode === 'static') {
          body = JSON.parse(config.responseJson);
        } else {
          const { body: resolved } = resolveTemplateWithCount(config.responseJson, {
            count: config.itemCount ?? 10,
            page: options.page ?? 1,
            limit: options.limit ?? 10,
          });
          body = resolved;
        }
      } catch {
        body = { error: 'Invalid response template' };
      }
      resolve({
        status,
        latencyMs: Date.now() - start,
        headers,
        body,
      });
    }, config.latencyMs);
  });
}

export const PLACEHOLDERS = [
  '{{uuid}}',
  '{{name}}',
  '{{email}}',
  '{{timestamp}}',
  '{{random_int}}',
  '{{random_bool}}',
  '{{ip}}',
  '{{country}}',
  '{{id}}',
] as const;
