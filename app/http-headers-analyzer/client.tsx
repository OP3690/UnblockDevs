'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldOff, Shield, Copy, Check,
  ChevronDown, ChevronUp, Globe, Server, Zap, Info,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

type HeaderStatus = 'secure' | 'warning' | 'missing' | 'info';

interface ParsedHeader { name: string; value: string; lname: string; }

interface HeaderAssessment {
  name: string;
  lname: string;
  status: HeaderStatus;
  value?: string;
  score: number;
  maxScore: number;
  title: string;
  description: string;
  assessment: string;
  recommendation: string;
  mdn?: string;
}

type Tab = 'overview' | 'security' | 'cors' | 'config';
type ConfigLang = 'express' | 'nginx' | 'apache';

// ── Header database ──────────────────────────────────────────────────────────

interface HeaderDef {
  title: string;
  description: string;
  mdn?: string;
  category: 'security' | 'cors' | 'caching' | 'content' | 'info';
}

const HEADER_DB: Record<string, HeaderDef> = {
  'content-security-policy': {
    title: 'Content-Security-Policy',
    description: 'Controls which resources the browser can load. Prevents XSS attacks by defining trusted sources for scripts, styles, images, and more.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy',
    category: 'security',
  },
  'strict-transport-security': {
    title: 'Strict-Transport-Security',
    description: 'Forces browsers to use HTTPS for your domain. Prevents SSL stripping attacks and mixed content issues.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
    category: 'security',
  },
  'x-frame-options': {
    title: 'X-Frame-Options',
    description: 'Controls whether your page can be embedded in an iframe. Prevents clickjacking attacks.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
    category: 'security',
  },
  'x-content-type-options': {
    title: 'X-Content-Type-Options',
    description: 'Prevents browsers from MIME-type sniffing. Stops browsers from interpreting files as a different MIME type.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
    category: 'security',
  },
  'referrer-policy': {
    title: 'Referrer-Policy',
    description: 'Controls how much referrer information is included with requests. Protects user privacy and prevents information leakage.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
    category: 'security',
  },
  'permissions-policy': {
    title: 'Permissions-Policy',
    description: 'Controls which browser features and APIs can be used on your page (camera, microphone, geolocation, etc.).',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy',
    category: 'security',
  },
  'x-xss-protection': {
    title: 'X-XSS-Protection',
    description: 'Legacy XSS filter header (deprecated in modern browsers). Setting to 0 disables the buggy filter; CSP is preferred.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
    category: 'security',
  },
  'cross-origin-opener-policy': {
    title: 'Cross-Origin-Opener-Policy',
    description: 'Isolates your browsing context from cross-origin windows. Required for SharedArrayBuffer and high-resolution timers.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy',
    category: 'security',
  },
  'cross-origin-embedder-policy': {
    title: 'Cross-Origin-Embedder-Policy',
    description: 'Prevents a document from loading cross-origin resources that don\'t grant explicit permission.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy',
    category: 'security',
  },
  'cross-origin-resource-policy': {
    title: 'Cross-Origin-Resource-Policy',
    description: 'Prevents cross-origin read of your resources (images, JSON, etc.) to protect against Spectre-like attacks.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy',
    category: 'security',
  },
  'cache-control': {
    title: 'Cache-Control',
    description: 'Controls how, and for how long, the browser and intermediate caches store the response.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control',
    category: 'caching',
  },
  'access-control-allow-origin': {
    title: 'Access-Control-Allow-Origin',
    description: 'Specifies which origins are permitted to read the response. Part of the CORS protocol.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin',
    category: 'cors',
  },
  'access-control-allow-methods': {
    title: 'Access-Control-Allow-Methods',
    description: 'Specifies HTTP methods allowed in CORS requests.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods',
    category: 'cors',
  },
  'access-control-allow-headers': {
    title: 'Access-Control-Allow-Headers',
    description: 'Specifies which HTTP headers can be used in CORS requests.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers',
    category: 'cors',
  },
  'access-control-allow-credentials': {
    title: 'Access-Control-Allow-Credentials',
    description: 'Indicates whether the response can be shared with requesting code when credentials are included.',
    category: 'cors',
  },
  'content-type': {
    title: 'Content-Type',
    description: 'Indicates the media type of the resource. Important for correct content interpretation.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type',
    category: 'content',
  },
  'server': {
    title: 'Server',
    description: 'Identifies the server software. Consider removing or masking to reduce information exposure.',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server',
    category: 'info',
  },
  'x-powered-by': {
    title: 'X-Powered-By',
    description: 'Identifies the technology powering the site. Should be removed to reduce information leakage.',
    category: 'info',
  },
};

// ── Security scoring ──────────────────────────────────────────────────────────

function assessHeaders(headers: ParsedHeader[]): { assessments: HeaderAssessment[]; totalScore: number; maxScore: number } {
  const map = new Map(headers.map(h => [h.lname, h.value]));
  const assessments: HeaderAssessment[] = [];
  let totalScore = 0;
  const maxScore = 100;

  // Content-Security-Policy — 20 pts
  {
    const v = map.get('content-security-policy');
    const def = HEADER_DB['content-security-policy'];
    if (!v) {
      assessments.push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'missing', score: 0, maxScore: 20, title: def.title, description: def.description, assessment: 'Missing. No XSS protection from CSP.', recommendation: "Add CSP: default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'", mdn: def.mdn });
    } else {
      const hasUnsafeInline = v.includes("'unsafe-inline'");
      const hasUnsafeEval = v.includes("'unsafe-eval'");
      const hasWildcard = /script-src[^;]*\*/.test(v);
      if (hasUnsafeInline || hasUnsafeEval || hasWildcard) {
        assessments.push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'warning', value: v, score: 10, maxScore: 20, title: def.title, description: def.description, assessment: `CSP present but weakened by: ${[hasUnsafeInline && "'unsafe-inline'", hasUnsafeEval && "'unsafe-eval'", hasWildcard && 'wildcard in script-src'].filter(Boolean).join(', ')}.`, recommendation: "Remove 'unsafe-inline' and 'unsafe-eval'. Use nonces or hashes instead.", mdn: def.mdn });
        totalScore += 10;
      } else {
        assessments.push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'secure', value: v, score: 20, maxScore: 20, title: def.title, description: def.description, assessment: 'CSP is present and does not use unsafe directives. Excellent.', recommendation: 'Consider adding report-uri or report-to for violation monitoring.', mdn: def.mdn });
        totalScore += 20;
      }
    }
  }

  // HSTS — 15 pts
  {
    const v = map.get('strict-transport-security');
    const def = HEADER_DB['strict-transport-security'];
    if (!v) {
      assessments.push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'missing', score: 0, maxScore: 15, title: def.title, description: def.description, assessment: 'Missing. Browsers may fall back to HTTP.', recommendation: 'Add: Strict-Transport-Security: max-age=63072000; includeSubDomains; preload', mdn: def.mdn });
    } else {
      const maxAgeMatch = v.match(/max-age=(\d+)/i);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : 0;
      const hasSubDomains = v.toLowerCase().includes('includesubdomains');
      const hasPreload = v.toLowerCase().includes('preload');
      if (maxAge < 31536000) {
        assessments.push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'warning', value: v, score: 8, maxScore: 15, title: def.title, description: def.description, assessment: `max-age is ${maxAge}s (${Math.round(maxAge/86400)} days). Recommended minimum is 31536000s (1 year).`, recommendation: 'Set max-age=63072000; includeSubDomains; preload for maximum protection.', mdn: def.mdn });
        totalScore += 8;
      } else if (!hasSubDomains || !hasPreload) {
        assessments.push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'warning', value: v, score: 12, maxScore: 15, title: def.title, description: def.description, assessment: `HSTS configured but missing: ${[!hasSubDomains && 'includeSubDomains', !hasPreload && 'preload'].filter(Boolean).join(', ')}.`, recommendation: 'Add includeSubDomains and preload directives for full protection.', mdn: def.mdn });
        totalScore += 12;
      } else {
        assessments.push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'secure', value: v, score: 15, maxScore: 15, title: def.title, description: def.description, assessment: 'HSTS is fully configured with includeSubDomains and preload. Excellent.', recommendation: 'Consider submitting your domain to the HTTPS preload list.', mdn: def.mdn });
        totalScore += 15;
      }
    }
  }

  // X-Frame-Options — 10 pts
  {
    const v = map.get('x-frame-options');
    const def = HEADER_DB['x-frame-options'];
    if (!v) {
      assessments.push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'missing', score: 0, maxScore: 10, title: def.title, description: def.description, assessment: 'Missing. Page may be embeddable in iframes on other sites (clickjacking risk).', recommendation: "Add: X-Frame-Options: DENY (or SAMEORIGIN if you need same-origin iframes)", mdn: def.mdn });
    } else {
      const upper = v.toUpperCase().trim();
      if (upper === 'DENY' || upper === 'SAMEORIGIN') {
        assessments.push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'secure', value: v, score: 10, maxScore: 10, title: def.title, description: def.description, assessment: `Set to ${upper}. Clickjacking protection is active.`, recommendation: 'Consider also adding frame-ancestors directive in CSP for modern browsers.', mdn: def.mdn });
        totalScore += 10;
      } else {
        assessments.push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'warning', value: v, score: 5, maxScore: 10, title: def.title, description: def.description, assessment: 'Value is not DENY or SAMEORIGIN. Limited protection.', recommendation: "Use DENY or SAMEORIGIN instead.", mdn: def.mdn });
        totalScore += 5;
      }
    }
  }

  // X-Content-Type-Options — 10 pts
  {
    const v = map.get('x-content-type-options');
    const def = HEADER_DB['x-content-type-options'];
    if (!v) {
      assessments.push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'missing', score: 0, maxScore: 10, title: def.title, description: def.description, assessment: 'Missing. Browsers may MIME-sniff responses.', recommendation: 'Add: X-Content-Type-Options: nosniff', mdn: def.mdn });
    } else if (v.toLowerCase().trim() === 'nosniff') {
      assessments.push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'secure', value: v, score: 10, maxScore: 10, title: def.title, description: def.description, assessment: 'Set to nosniff. MIME type sniffing is blocked.', recommendation: 'No action needed.', mdn: def.mdn });
      totalScore += 10;
    } else {
      assessments.push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'warning', value: v, score: 5, maxScore: 10, title: def.title, description: def.description, assessment: 'Value should be exactly "nosniff".', recommendation: 'Set to: X-Content-Type-Options: nosniff', mdn: def.mdn });
      totalScore += 5;
    }
  }

  // Referrer-Policy — 10 pts
  {
    const v = map.get('referrer-policy');
    const def = HEADER_DB['referrer-policy'];
    const strictPolicies = ['no-referrer', 'no-referrer-when-downgrade', 'strict-origin', 'strict-origin-when-cross-origin', 'same-origin'];
    if (!v) {
      assessments.push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'missing', score: 0, maxScore: 10, title: def.title, description: def.description, assessment: 'Missing. Browser defaults may send full URL as referrer.', recommendation: 'Add: Referrer-Policy: strict-origin-when-cross-origin', mdn: def.mdn });
    } else if (strictPolicies.includes(v.toLowerCase().trim())) {
      assessments.push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'secure', value: v, score: 10, maxScore: 10, title: def.title, description: def.description, assessment: `Set to "${v}". Referrer information is properly controlled.`, recommendation: 'No action needed.', mdn: def.mdn });
      totalScore += 10;
    } else {
      assessments.push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'warning', value: v, score: 5, maxScore: 10, title: def.title, description: def.description, assessment: `"${v}" may leak referrer data. Consider a stricter policy.`, recommendation: 'Use: strict-origin-when-cross-origin or no-referrer', mdn: def.mdn });
      totalScore += 5;
    }
  }

  // Permissions-Policy — 10 pts
  {
    const v = map.get('permissions-policy');
    const def = HEADER_DB['permissions-policy'];
    if (!v) {
      assessments.push({ name: 'Permissions-Policy', lname: 'permissions-policy', status: 'missing', score: 0, maxScore: 10, title: def.title, description: def.description, assessment: 'Missing. No restrictions on browser features like camera and microphone.', recommendation: "Add: Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()", mdn: def.mdn });
    } else {
      assessments.push({ name: 'Permissions-Policy', lname: 'permissions-policy', status: 'secure', value: v, score: 10, maxScore: 10, title: def.title, description: def.description, assessment: 'Permissions-Policy is configured. Browser features are restricted.', recommendation: 'Review which features you have allowed and restrict any you don\'t use.', mdn: def.mdn });
      totalScore += 10;
    }
  }

  // X-XSS-Protection — 5 pts (deprecated, 0 = best)
  {
    const v = map.get('x-xss-protection');
    const def = HEADER_DB['x-xss-protection'];
    if (!v) {
      assessments.push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'info', score: 3, maxScore: 5, title: def.title, description: def.description, assessment: 'Not set. This header is deprecated — modern browsers use CSP instead.', recommendation: 'Set to 0 to disable the buggy legacy filter: X-XSS-Protection: 0', mdn: def.mdn });
      totalScore += 3;
    } else if (v.trim() === '0') {
      assessments.push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'secure', value: v, score: 5, maxScore: 5, title: def.title, description: def.description, assessment: 'Set to 0 (disabled). Correct for modern sites that use CSP.', recommendation: 'No action needed. Ensure you have a strong CSP instead.', mdn: def.mdn });
      totalScore += 5;
    } else {
      assessments.push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'info', value: v, score: 3, maxScore: 5, title: def.title, description: def.description, assessment: 'This legacy header is deprecated. Rely on CSP for XSS protection instead.', recommendation: 'Set to 0: X-XSS-Protection: 0', mdn: def.mdn });
      totalScore += 3;
    }
  }

  // Cross-Origin-Opener-Policy — 5 pts
  {
    const v = map.get('cross-origin-opener-policy');
    const def = HEADER_DB['cross-origin-opener-policy'];
    if (!v) {
      assessments.push({ name: 'Cross-Origin-Opener-Policy', lname: 'cross-origin-opener-policy', status: 'missing', score: 0, maxScore: 5, title: def.title, description: def.description, assessment: 'Missing. Required for cross-origin isolation and SharedArrayBuffer access.', recommendation: 'Add: Cross-Origin-Opener-Policy: same-origin', mdn: def.mdn });
    } else {
      assessments.push({ name: 'Cross-Origin-Opener-Policy', lname: 'cross-origin-opener-policy', status: 'secure', value: v, score: 5, maxScore: 5, title: def.title, description: def.description, assessment: 'COOP is configured. Browsing context is isolated.', recommendation: 'No action needed.', mdn: def.mdn });
      totalScore += 5;
    }
  }

  // Cross-Origin-Embedder-Policy — 5 pts
  {
    const v = map.get('cross-origin-embedder-policy');
    const def = HEADER_DB['cross-origin-embedder-policy'];
    if (!v) {
      assessments.push({ name: 'Cross-Origin-Embedder-Policy', lname: 'cross-origin-embedder-policy', status: 'missing', score: 0, maxScore: 5, title: def.title, description: def.description, assessment: 'Missing. Cross-origin resources can be loaded without explicit permission.', recommendation: 'Add: Cross-Origin-Embedder-Policy: require-corp', mdn: def.mdn });
    } else {
      assessments.push({ name: 'Cross-Origin-Embedder-Policy', lname: 'cross-origin-embedder-policy', status: 'secure', value: v, score: 5, maxScore: 5, title: def.title, description: def.description, assessment: 'COEP is configured.', recommendation: 'No action needed.', mdn: def.mdn });
      totalScore += 5;
    }
  }

  // Cross-Origin-Resource-Policy — 5 pts
  {
    const v = map.get('cross-origin-resource-policy');
    const def = HEADER_DB['cross-origin-resource-policy'];
    if (!v) {
      assessments.push({ name: 'Cross-Origin-Resource-Policy', lname: 'cross-origin-resource-policy', status: 'missing', score: 0, maxScore: 5, title: def.title, description: def.description, assessment: 'Missing. Resources can be read by cross-origin requests.', recommendation: 'Add: Cross-Origin-Resource-Policy: same-origin (or same-site)', mdn: def.mdn });
    } else {
      assessments.push({ name: 'Cross-Origin-Resource-Policy', lname: 'cross-origin-resource-policy', status: 'secure', value: v, score: 5, maxScore: 5, title: def.title, description: def.description, assessment: 'CORP is configured.', recommendation: 'No action needed.', mdn: def.mdn });
      totalScore += 5;
    }
  }

  // Bonus: warn about Server / X-Powered-By info leakage
  const serverVal = map.get('server');
  if (serverVal) {
    assessments.push({ name: 'Server', lname: 'server', status: 'info', value: serverVal, score: 0, maxScore: 0, title: HEADER_DB['server'].title, description: HEADER_DB['server'].description, assessment: `Server header reveals: "${serverVal}". Consider removing or masking this.`, recommendation: 'Remove the Server header or set it to a generic value to reduce fingerprinting.' });
  }
  const xpbVal = map.get('x-powered-by');
  if (xpbVal) {
    assessments.push({ name: 'X-Powered-By', lname: 'x-powered-by', status: 'warning', value: xpbVal, score: 0, maxScore: 0, title: HEADER_DB['x-powered-by'].title, description: HEADER_DB['x-powered-by'].description, assessment: `X-Powered-By reveals: "${xpbVal}". Attackers can target known vulnerabilities in this framework.`, recommendation: 'Remove this header. In Express.js: app.disable("x-powered-by")' });
  }

  return { assessments, totalScore: Math.min(totalScore, maxScore), maxScore };
}

function getGrade(score: number): { grade: string; color: string; bg: string; border: string } {
  if (score >= 95) return { grade: 'A+', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
  if (score >= 85) return { grade: 'A', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
  if (score >= 70) return { grade: 'B', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' };
  if (score >= 55) return { grade: 'C', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  if (score >= 40) return { grade: 'D', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
  return { grade: 'F', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
}

// ── Header parser ─────────────────────────────────────────────────────────────

function parseHeaders(raw: string): ParsedHeader[] {
  const lines = raw.split(/\r?\n/);
  const headers: ParsedHeader[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Skip HTTP status line
    if (/^HTTP\/[\d.]+ \d+/.test(trimmed)) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const name = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();
    if (name && value !== undefined) {
      headers.push({ name, value, lname: name.toLowerCase() });
    }
  }
  return headers;
}

// ── Config generators ─────────────────────────────────────────────────────────

function generateExpressConfig(assessments: HeaderAssessment[]): string {
  const missing = assessments.filter(a => a.status === 'missing' || a.status === 'warning');
  const recommendations: Record<string, string> = {
    'content-security-policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; object-src 'none'; frame-ancestors 'none'",
    'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
    'x-frame-options': 'DENY',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'x-xss-protection': '0',
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-embedder-policy': 'require-corp',
    'cross-origin-resource-policy': 'same-origin',
  };

  const entries = Object.entries(recommendations)
    .map(([h, v]) => `  res.setHeader('${HEADER_DB[h]?.title || h}', '${v}');`)
    .join('\n');

  return `// Express.js — Security Headers Middleware
// Install helmet for a production-ready solution: npm install helmet
// Or use this manual approach:

app.use((req, res, next) => {
${entries}
  next();
});

// Also disable the X-Powered-By header:
app.disable('x-powered-by');`;
}

function generateNginxConfig(assessments: HeaderAssessment[]): string {
  const recommendations: Record<string, string> = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'X-XSS-Protection': '0',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };

  const entries = Object.entries(recommendations)
    .map(([h, v]) => `    add_header ${h} "${v}" always;`)
    .join('\n');

  return `# Nginx — Security Headers Configuration
# Add to your server {} or location {} block:

server {
    # ... your existing config ...

${entries}

    # Hide server version
    server_tokens off;
    # Remove X-Powered-By
    more_clear_headers 'X-Powered-By';
}`;
}

function generateApacheConfig(assessments: HeaderAssessment[]): string {
  const recommendations: Record<string, string> = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'X-XSS-Protection': '0',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };

  const entries = Object.entries(recommendations)
    .map(([h, v]) => `    Header always set ${h} "${v}"`)
    .join('\n');

  return `# Apache — Security Headers Configuration (.htaccess or VirtualHost)
# Requires mod_headers to be enabled: a2enmod headers

<IfModule mod_headers.c>
${entries}
    Header always unset X-Powered-By
    Header always unset Server
</IfModule>

# Also add in httpd.conf or apache2.conf:
# ServerTokens Prod
# ServerSignature Off`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: HeaderStatus }) {
  if (status === 'secure') return <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />;
  if (status === 'warning') return <ShieldAlert className="h-4 w-4 text-yellow-400 shrink-0" />;
  if (status === 'missing') return <ShieldOff className="h-4 w-4 text-red-400 shrink-0" />;
  return <Shield className="h-4 w-4 text-sky-400 shrink-0" />;
}

function StatusBadge({ status }: { status: HeaderStatus }) {
  const map = {
    secure: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    missing: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };
  const label = { secure: 'Secure', warning: 'Warning', missing: 'Missing', info: 'Info' };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${map[status]}`}>
      {label[status]}
    </span>
  );
}

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  }, [text]);
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

function AssessmentCard({ a }: { a: HeaderAssessment }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700/20 transition"
      >
        <StatusIcon status={a.status} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-medium text-zinc-200">{a.name}</span>
            <StatusBadge status={a.status} />
            {a.maxScore > 0 && (
              <span className="text-[10px] text-zinc-500">{a.score}/{a.maxScore} pts</span>
            )}
          </div>
          {a.value && (
            <p className="mt-0.5 font-mono text-[11px] text-zinc-400 truncate">{a.value}</p>
          )}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-zinc-700/40 px-4 py-3 space-y-3 bg-zinc-900/40">
          <p className="text-xs text-zinc-400 leading-relaxed">{a.description}</p>
          <div className="rounded-lg bg-zinc-800 p-3 space-y-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Assessment</span>
              <p className="mt-0.5 text-xs text-zinc-300">{a.assessment}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Recommendation</span>
              <p className="mt-0.5 font-mono text-[11px] text-emerald-300 break-all">{a.recommendation}</p>
            </div>
          </div>
          {a.mdn && (
            <a href={a.mdn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-sky-400 hover:text-sky-300 transition">
              <Globe className="h-3 w-3" /> MDN Documentation
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── CORS Analyzer ─────────────────────────────────────────────────────────────

function CorsAnalysis({ headers }: { headers: ParsedHeader[] }) {
  const map = new Map(headers.map(h => [h.lname, h.value]));
  const acao = map.get('access-control-allow-origin');
  const acam = map.get('access-control-allow-methods');
  const acah = map.get('access-control-allow-headers');
  const acac = map.get('access-control-allow-credentials');
  const acma = map.get('access-control-max-age');

  if (!acao && !acam && !acah) {
    return (
      <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-6 text-center">
        <Globe className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
        <p className="text-zinc-400 text-sm">No CORS headers detected in these headers.</p>
        <p className="text-zinc-500 text-xs mt-1">CORS headers are typically only needed for APIs accessed from browsers.</p>
      </div>
    );
  }

  const issues: string[] = [];
  const ok: string[] = [];

  if (acao === '*') {
    issues.push("Access-Control-Allow-Origin: * allows any origin. Combined with credentials, this is a security risk.");
  } else if (acao) {
    ok.push(`Access-Control-Allow-Origin is restricted to: ${acao}`);
  }

  if (acac === 'true' && acao === '*') {
    issues.push("Credentials (cookies, auth) with wildcard origin (*) is invalid and rejected by browsers.");
  } else if (acac === 'true') {
    ok.push("Credentials are allowed. Ensure ACAO is a specific origin, not *.");
  }

  if (acam) {
    const methods = acam.split(',').map(m => m.trim().toUpperCase());
    if (methods.includes('*')) {
      issues.push("Access-Control-Allow-Methods: * is overly permissive. List only required methods.");
    } else {
      ok.push(`Allowed methods: ${methods.join(', ')}`);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { label: 'Allow-Origin', value: acao, key: 'acao' },
          { label: 'Allow-Methods', value: acam, key: 'acam' },
          { label: 'Allow-Headers', value: acah, key: 'acah' },
          { label: 'Allow-Credentials', value: acac, key: 'acac' },
          { label: 'Max-Age', value: acma, key: 'acma' },
        ].map(({ label, value, key }) => (
          <div key={key} className="rounded-lg border border-zinc-700/40 bg-zinc-800/50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
            <p className={`mt-1 font-mono text-sm break-all ${value ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
              {value || 'not set'}
            </p>
          </div>
        ))}
      </div>

      {(issues.length > 0 || ok.length > 0) && (
        <div className="space-y-2">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
              <ShieldOff className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">{issue}</p>
            </div>
          ))}
          {ok.map((note, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300">{note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Default sample ────────────────────────────────────────────────────────────

const SAMPLE_HEADERS = `HTTP/2 200 OK
content-type: text/html; charset=utf-8
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
strict-transport-security: max-age=31536000; includeSubDomains
cache-control: no-cache, no-store, must-revalidate
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
server: nginx/1.18.0
x-powered-by: Express`;

// ── Main client component ─────────────────────────────────────────────────────

export default function HttpHeadersAnalyzerClient() {
  const [raw, setRaw] = useState(SAMPLE_HEADERS);
  const [analyzed, setAnalyzed] = useState<string>(SAMPLE_HEADERS);
  const [tab, setTab] = useState<Tab>('security');
  const [configLang, setConfigLang] = useState<ConfigLang>('express');

  const headers = useMemo(() => parseHeaders(analyzed), [analyzed]);
  const { assessments, totalScore, maxScore } = useMemo(() => assessHeaders(headers), [headers]);
  const grade = useMemo(() => getGrade(totalScore), [totalScore]);

  const secureCount = assessments.filter(a => a.status === 'secure').length;
  const warnCount = assessments.filter(a => a.status === 'warning').length;
  const missingCount = assessments.filter(a => a.status === 'missing').length;

  const configCode = useMemo(() => {
    if (configLang === 'express') return generateExpressConfig(assessments);
    if (configLang === 'nginx') return generateNginxConfig(assessments);
    return generateApacheConfig(assessments);
  }, [configLang, assessments]);

  const analyze = useCallback(() => setAnalyzed(raw), [raw]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'All Headers', icon: <Info className="h-3.5 w-3.5" /> },
    { id: 'security', label: 'Security Analysis', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { id: 'cors', label: 'CORS', icon: <Globe className="h-3.5 w-3.5" /> },
    { id: 'config', label: 'Config Generator', icon: <Server className="h-3.5 w-3.5" /> },
  ];

  const tool = (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">Paste Raw HTTP Response Headers</label>
          <button onClick={() => setRaw(SAMPLE_HEADERS)} className="text-xs text-zinc-500 hover:text-zinc-300 transition">Load example</button>
        </div>
        <textarea
          value={raw}
          onChange={e => setRaw(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder={`HTTP/2 200 OK\ncontent-type: text/html\nstrict-transport-security: max-age=31536000\n...`}
          className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/80 px-4 py-3 font-mono text-sm text-zinc-200 placeholder-zinc-600 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={analyze}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 active:scale-95"
          >
            <Zap className="h-4 w-4" /> Analyze Headers
          </button>
          <p className="text-xs text-zinc-500">
            Get headers: DevTools → Network → any request → Response Headers
          </p>
        </div>
      </div>

      {/* Score bar */}
      {headers.length > 0 && (
        <div className={`flex flex-wrap items-center gap-4 rounded-xl border ${grade.border} ${grade.bg} p-4`}>
          <div className="text-center">
            <div className={`text-5xl font-black ${grade.color}`}>{grade.grade}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mt-0.5">Security Grade</div>
          </div>
          <div className="h-12 w-px bg-zinc-700/50 hidden sm:block" />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Score</span>
              <span className={`font-bold ${grade.color}`}>{totalScore}/{maxScore}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  totalScore >= 85 ? 'bg-emerald-500' : totalScore >= 70 ? 'bg-teal-500' : totalScore >= 55 ? 'bg-yellow-500' : totalScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${(totalScore / maxScore) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div><div className="text-lg font-bold text-emerald-400">{secureCount}</div><div className="text-[10px] text-zinc-500">Secure</div></div>
            <div><div className="text-lg font-bold text-yellow-400">{warnCount}</div><div className="text-[10px] text-zinc-500">Warnings</div></div>
            <div><div className="text-lg font-bold text-red-400">{missingCount}</div><div className="text-[10px] text-zinc-500">Missing</div></div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {headers.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-1 rounded-xl border border-zinc-700/40 bg-zinc-900/60 p-1 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition ${
                  tab === t.id
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Overview tab */}
          {tab === 'overview' && (
            <div className="overflow-x-auto rounded-xl border border-zinc-700/40">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700/40 bg-zinc-800/60">
                    <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Header</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Value</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((h, i) => {
                    const def = HEADER_DB[h.lname];
                    const catColors: Record<string, string> = {
                      security: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                      cors: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
                      caching: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
                      content: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
                      info: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
                    };
                    const cat = def?.category ?? 'info';
                    return (
                      <tr key={i} className="border-b border-zinc-700/20 hover:bg-zinc-800/30 transition">
                        <td className="px-4 py-2.5 font-mono text-xs text-zinc-200 font-medium">{h.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-zinc-400 max-w-sm truncate">{h.value}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${catColors[cat]}`}>
                            {cat}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Security tab */}
          {tab === 'security' && (
            <div className="space-y-2">
              {assessments.map((a, i) => (
                <AssessmentCard key={i} a={a} />
              ))}
            </div>
          )}

          {/* CORS tab */}
          {tab === 'cors' && <CorsAnalysis headers={headers} />}

          {/* Config tab */}
          {tab === 'config' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['express', 'nginx', 'apache'] as ConfigLang[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setConfigLang(lang)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                      configLang === lang
                        ? 'bg-emerald-600 text-white'
                        : 'border border-zinc-700/50 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {lang === 'express' ? 'Express.js' : lang === 'nginx' ? 'Nginx' : 'Apache'}
                  </button>
                ))}
              </div>
              <div className="relative rounded-xl border border-zinc-700/40 bg-zinc-900">
                <div className="flex items-center justify-between border-b border-zinc-700/40 px-4 py-2">
                  <span className="font-mono text-xs text-zinc-500">{configLang === 'express' ? 'middleware.js' : configLang === 'nginx' ? 'nginx.conf' : '.htaccess'}</span>
                  <CopyBtn text={configCode} />
                </div>
                <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300 font-mono whitespace-pre">{configCode}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {headers.length === 0 && analyzed.trim() && (
        <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-8 text-center">
          <ShieldOff className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
          <p className="text-zinc-400 text-sm">No headers could be parsed from the input.</p>
          <p className="text-zinc-500 text-xs mt-1">Make sure to paste raw HTTP headers in the format: HeaderName: value</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageShell
      title="HTTP Headers Analyzer"
      subtitle="Paste HTTP response headers to get an instant security grade (A+ to F) and generate server configs"
      icon="🔒"
      tool={tool}
    />
  );
}
