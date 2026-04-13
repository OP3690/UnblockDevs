'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldOff, Shield, Copy, Check,
  ChevronDown, ChevronUp, Globe, Server, Zap, Info, X,
  AlertTriangle, ExternalLink, Lock, Eye, Cpu, BarChart3,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

type HeaderStatus = 'secure' | 'warning' | 'missing' | 'info';
type Tab = 'security' | 'overview' | 'cors' | 'config';
type ConfigLang = 'express' | 'nginx' | 'apache' | 'nextjs';

interface ParsedHeader { name: string; value: string; lname: string; }

interface HeaderAssessment {
  name: string; lname: string; status: HeaderStatus;
  value?: string; score: number; maxScore: number;
  title: string; description: string; assessment: string;
  recommendation: string; mdn?: string; attack?: string;
}

// ── Examples ─────────────────────────────────────────────────────────────────

const EXAMPLES: { label: string; description: string; emoji: string; headers: string }[] = [
  {
    label: 'A+ Grade Site',
    description: 'Fully hardened production headers',
    emoji: '🏆',
    headers: `HTTP/2 200 OK
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
x-xss-protection: 0
cross-origin-opener-policy: same-origin
cross-origin-embedder-policy: require-corp
cross-origin-resource-policy: same-origin
cache-control: no-store, must-revalidate`,
  },
  {
    label: 'Typical Web App',
    description: 'Common headers — room to improve',
    emoji: '⚠️',
    headers: `HTTP/1.1 200 OK
content-type: text/html; charset=utf-8
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
strict-transport-security: max-age=31536000; includeSubDomains
cache-control: no-cache, no-store, must-revalidate
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
server: nginx/1.18.0
x-powered-by: Express`,
  },
  {
    label: 'REST API Server',
    description: 'JSON API with CORS headers',
    emoji: '🔌',
    headers: `HTTP/2 200 OK
content-type: application/json; charset=utf-8
access-control-allow-origin: https://app.example.com
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: Content-Type, Authorization, X-Requested-With
access-control-allow-credentials: true
access-control-max-age: 86400
x-content-type-options: nosniff
x-frame-options: DENY
cache-control: no-store
vary: Origin`,
  },
  {
    label: 'Vulnerable Site',
    description: 'Missing critical security headers',
    emoji: '🚨',
    headers: `HTTP/1.1 200 OK
content-type: text/html
server: Apache/2.4.51 (Ubuntu)
x-powered-by: PHP/8.1.0
date: Mon, 01 Apr 2026 12:00:00 GMT
content-length: 4821`,
  },
  {
    label: 'CDN Edge',
    description: 'Cloudflare-style edge headers',
    emoji: '☁️',
    headers: `HTTP/2 200 OK
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=()
x-xss-protection: 0
cross-origin-opener-policy: same-origin
cross-origin-embedder-policy: require-corp
cross-origin-resource-policy: same-site
cache-control: public, max-age=0, must-revalidate
cf-cache-status: DYNAMIC
cf-ray: 8a1b2c3d4e5f6789-SJC
server: cloudflare
vary: Accept-Encoding`,
  },
];

// ── Header DB ─────────────────────────────────────────────────────────────────

const HEADER_DB: Record<string, { title: string; description: string; mdn?: string; category: string; attack?: string }> = {
  'content-security-policy': { title: 'Content-Security-Policy', description: 'Defines trusted sources for scripts, styles, images, and other resources. The #1 defense against XSS attacks.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy', category: 'security', attack: 'Cross-Site Scripting (XSS)' },
  'strict-transport-security': { title: 'Strict-Transport-Security', description: 'Forces browsers to use HTTPS, preventing SSL stripping attacks and unencrypted connections.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security', category: 'security', attack: 'SSL Stripping, MITM' },
  'x-frame-options': { title: 'X-Frame-Options', description: 'Prevents your page from being embedded in iframes on other domains. Stops clickjacking attacks.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options', category: 'security', attack: 'Clickjacking' },
  'x-content-type-options': { title: 'X-Content-Type-Options', description: 'Stops browsers from guessing the content type. Prevents MIME-sniffing attacks.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options', category: 'security', attack: 'MIME Sniffing' },
  'referrer-policy': { title: 'Referrer-Policy', description: 'Controls how much URL information is sent when navigating away. Protects user privacy.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy', category: 'security', attack: 'Information Leakage' },
  'permissions-policy': { title: 'Permissions-Policy', description: 'Restricts browser features like camera, microphone, geolocation, and payment API access.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy', category: 'security', attack: 'Feature Abuse' },
  'x-xss-protection': { title: 'X-XSS-Protection', description: 'Legacy XSS filter (deprecated). Setting to 0 disables the buggy IE/Chrome filter; prefer CSP.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection', category: 'security' },
  'cross-origin-opener-policy': { title: 'Cross-Origin-Opener-Policy', description: 'Isolates browsing context from cross-origin windows. Enables SharedArrayBuffer and high-res timers.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy', category: 'security', attack: 'Cross-Window Attack' },
  'cross-origin-embedder-policy': { title: 'Cross-Origin-Embedder-Policy', description: 'Requires explicit permission from cross-origin resources before loading them.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy', category: 'security', attack: 'Spectre' },
  'cross-origin-resource-policy': { title: 'Cross-Origin-Resource-Policy', description: 'Prevents cross-origin reads of your resources, protecting against Spectre-like timing attacks.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy', category: 'security', attack: 'Cross-Origin Read' },
  'cache-control': { title: 'Cache-Control', description: 'Controls caching behavior. Critical for sensitive pages — use no-store to prevent caching of auth/personal data.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control', category: 'caching' },
  'access-control-allow-origin': { title: 'Access-Control-Allow-Origin', description: 'Specifies which origins can read the response in cross-origin requests.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin', category: 'cors' },
  'access-control-allow-methods': { title: 'Access-Control-Allow-Methods', description: 'HTTP methods allowed in CORS requests.', category: 'cors' },
  'access-control-allow-headers': { title: 'Access-Control-Allow-Headers', description: 'HTTP headers allowed in CORS requests.', category: 'cors' },
  'access-control-allow-credentials': { title: 'Access-Control-Allow-Credentials', description: 'Whether cookies/auth headers are included in cross-origin requests.', category: 'cors' },
  'content-type': { title: 'Content-Type', description: 'Media type of the response. Important for correct content interpretation and XSS prevention.', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type', category: 'content' },
  'server': { title: 'Server', description: 'Identifies server software. Exposing version numbers helps attackers target known vulnerabilities.', category: 'info' },
  'x-powered-by': { title: 'X-Powered-By', description: 'Reveals framework/runtime. Remove this — attackers use it to find version-specific exploits.', category: 'info' },
  'vary': { title: 'Vary', description: 'Tells caches which request headers affect the response. Important for correct cache behavior.', category: 'caching' },
  'etag': { title: 'ETag', description: 'Validator for conditional requests. Used for cache validation and efficient bandwidth use.', category: 'caching' },
};

// ── Security scoring ──────────────────────────────────────────────────────────

function assessHeaders(headers: ParsedHeader[]): { assessments: HeaderAssessment[]; totalScore: number; maxScore: number } {
  const map = new Map(headers.map(h => [h.lname, h.value]));
  const assessments: HeaderAssessment[] = [];
  let totalScore = 0;
  const maxScore = 100;

  const push = (a: HeaderAssessment) => { assessments.push(a); totalScore += a.score; };

  // CSP — 20 pts
  {
    const v = map.get('content-security-policy');
    const d = HEADER_DB['content-security-policy'];
    if (!v) { push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'missing', score: 0, maxScore: 20, ...d, assessment: 'Missing. Pages have no XSS protection from CSP. Browsers allow any resource to load.', recommendation: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'" });
    } else {
      const unsafe = v.includes("'unsafe-inline'"), unsafeEval = v.includes("'unsafe-eval'"), wildcard = /script-src[^;]*\*/.test(v);
      if (unsafe || unsafeEval || wildcard) {
        push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'warning', value: v, score: 10, maxScore: 20, ...d, assessment: `CSP weakened by: ${[unsafe && "'unsafe-inline'", unsafeEval && "'unsafe-eval'", wildcard && 'wildcard'].filter(Boolean).join(', ')}. These allow inline scripts/styles which XSS exploits.`, recommendation: "Remove 'unsafe-inline'/'unsafe-eval'. Use nonces (nonce-abc123) or hashes instead." });
      } else {
        push({ name: 'Content-Security-Policy', lname: 'content-security-policy', status: 'secure', value: v, score: 20, maxScore: 20, ...d, assessment: 'CSP is present with no unsafe directives. Strong XSS protection active.', recommendation: 'Add report-to directive for real-time violation monitoring in production.' });
      }
    }
  }

  // HSTS — 15 pts
  {
    const v = map.get('strict-transport-security');
    const d = HEADER_DB['strict-transport-security'];
    if (!v) { push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'missing', score: 0, maxScore: 15, ...d, assessment: 'Missing. Browsers can connect over HTTP. SSL stripping attacks are possible.', recommendation: 'max-age=63072000; includeSubDomains; preload' });
    } else {
      const ageMatch = v.match(/max-age=(\d+)/i), maxAge = ageMatch ? parseInt(ageMatch[1]) : 0;
      const subD = v.toLowerCase().includes('includesubdomains'), preload = v.toLowerCase().includes('preload');
      if (maxAge < 31536000) { push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'warning', value: v, score: 8, maxScore: 15, ...d, assessment: `max-age=${maxAge}s (${Math.round(maxAge/86400)} days). Minimum recommended: 31536000s (1 year).`, recommendation: 'Set max-age=63072000; includeSubDomains; preload' });
      } else if (!subD || !preload) { push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'warning', value: v, score: 12, maxScore: 15, ...d, assessment: `HSTS set but missing: ${[!subD && 'includeSubDomains', !preload && 'preload'].filter(Boolean).join(', ')}.`, recommendation: 'Add includeSubDomains; preload for maximum HTTPS enforcement.' });
      } else { push({ name: 'Strict-Transport-Security', lname: 'strict-transport-security', status: 'secure', value: v, score: 15, maxScore: 15, ...d, assessment: 'Perfect. Long max-age with includeSubDomains and preload. HTTPS enforced for all sub-domains.', recommendation: 'Submit to the HTTPS Preload List at hstspreload.org for browser-level enforcement.' }); }
    }
  }

  // X-Frame-Options — 10 pts
  {
    const v = map.get('x-frame-options');
    const d = HEADER_DB['x-frame-options'];
    if (!v) { push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'missing', score: 0, maxScore: 10, ...d, assessment: 'Missing. Your page can be embedded in iframes on any site — clickjacking is possible.', recommendation: 'DENY (or SAMEORIGIN if you embed your own content in iframes)' });
    } else {
      const upper = v.toUpperCase().trim();
      if (upper === 'DENY' || upper === 'SAMEORIGIN') { push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'secure', value: v, score: 10, maxScore: 10, ...d, assessment: `${upper} — clickjacking protection is active.`, recommendation: "Also add frame-ancestors 'none' to CSP for modern browser support." });
      } else { push({ name: 'X-Frame-Options', lname: 'x-frame-options', status: 'warning', value: v, score: 5, maxScore: 10, ...d, assessment: `Unknown value "${v}". Should be DENY or SAMEORIGIN.`, recommendation: 'Set to DENY unless you need same-origin iframe embedding.' }); }
    }
  }

  // X-Content-Type-Options — 10 pts
  {
    const v = map.get('x-content-type-options');
    const d = HEADER_DB['x-content-type-options'];
    if (!v) { push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'missing', score: 0, maxScore: 10, ...d, assessment: 'Missing. Browser may guess content type — scripts disguised as images could execute.', recommendation: 'nosniff' });
    } else if (v.toLowerCase().trim() === 'nosniff') { push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'secure', value: v, score: 10, maxScore: 10, ...d, assessment: 'nosniff is set. MIME-type sniffing is disabled.', recommendation: 'No action needed.' });
    } else { push({ name: 'X-Content-Type-Options', lname: 'x-content-type-options', status: 'warning', value: v, score: 5, maxScore: 10, ...d, assessment: `Value should be exactly "nosniff". Got: "${v}".`, recommendation: 'Set to: nosniff' }); }
  }

  // Referrer-Policy — 10 pts
  {
    const v = map.get('referrer-policy');
    const d = HEADER_DB['referrer-policy'];
    const strict = ['no-referrer', 'no-referrer-when-downgrade', 'strict-origin', 'strict-origin-when-cross-origin', 'same-origin'];
    if (!v) { push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'missing', score: 0, maxScore: 10, ...d, assessment: 'Missing. Full URL including query strings may be sent as referrer to third-party sites.', recommendation: 'strict-origin-when-cross-origin' });
    } else if (strict.includes(v.toLowerCase().trim())) { push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'secure', value: v, score: 10, maxScore: 10, ...d, assessment: `"${v}" — referrer is properly restricted.`, recommendation: 'No action needed.' });
    } else { push({ name: 'Referrer-Policy', lname: 'referrer-policy', status: 'warning', value: v, score: 5, maxScore: 10, ...d, assessment: `"${v}" may send full URL as referrer. Use a stricter policy.`, recommendation: 'Use strict-origin-when-cross-origin or no-referrer' }); }
  }

  // Permissions-Policy — 10 pts
  {
    const v = map.get('permissions-policy');
    const d = HEADER_DB['permissions-policy'];
    if (!v) { push({ name: 'Permissions-Policy', lname: 'permissions-policy', status: 'missing', score: 0, maxScore: 10, ...d, assessment: 'Missing. No restrictions on camera, microphone, geolocation, or payment API access.', recommendation: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" });
    } else { push({ name: 'Permissions-Policy', lname: 'permissions-policy', status: 'secure', value: v, score: 10, maxScore: 10, ...d, assessment: 'Permissions-Policy is set. Browser feature access is restricted.', recommendation: 'Review each allowed feature — only grant access to features your app uses.' }); }
  }

  // X-XSS-Protection — 5 pts
  {
    const v = map.get('x-xss-protection');
    const d = HEADER_DB['x-xss-protection'];
    if (!v) { push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'info', score: 3, maxScore: 5, ...d, assessment: 'Not set. This legacy header is deprecated — use CSP instead.', recommendation: 'Set to 0 to disable the buggy legacy XSS filter.' });
    } else if (v.trim() === '0') { push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'secure', value: v, score: 5, maxScore: 5, ...d, assessment: 'Set to 0 (disabled). Correct — disable the legacy filter and rely on CSP.', recommendation: 'No action needed. Ensure CSP is properly configured.' });
    } else { push({ name: 'X-XSS-Protection', lname: 'x-xss-protection', status: 'info', value: v, score: 3, maxScore: 5, ...d, assessment: `Legacy header set to "${v}". Can cause issues — set to 0 and use CSP instead.`, recommendation: 'Set to: 0' }); }
  }

  // COOP — 5 pts
  {
    const v = map.get('cross-origin-opener-policy');
    const d = HEADER_DB['cross-origin-opener-policy'];
    if (!v) { push({ name: 'Cross-Origin-Opener-Policy', lname: 'cross-origin-opener-policy', status: 'missing', score: 0, maxScore: 5, ...d, assessment: 'Missing. Your window object is accessible from cross-origin windows.', recommendation: 'same-origin' });
    } else { push({ name: 'Cross-Origin-Opener-Policy', lname: 'cross-origin-opener-policy', status: 'secure', value: v, score: 5, maxScore: 5, ...d, assessment: 'COOP is configured. Browsing context is isolated from cross-origin windows.', recommendation: 'No action needed.' }); }
  }

  // COEP — 5 pts
  {
    const v = map.get('cross-origin-embedder-policy');
    const d = HEADER_DB['cross-origin-embedder-policy'];
    if (!v) { push({ name: 'Cross-Origin-Embedder-Policy', lname: 'cross-origin-embedder-policy', status: 'missing', score: 0, maxScore: 5, ...d, assessment: 'Missing. Cross-origin resources can load without explicit CORS permission.', recommendation: 'require-corp' });
    } else { push({ name: 'Cross-Origin-Embedder-Policy', lname: 'cross-origin-embedder-policy', status: 'secure', value: v, score: 5, maxScore: 5, ...d, assessment: 'COEP is configured.', recommendation: 'No action needed.' }); }
  }

  // CORP — 5 pts
  {
    const v = map.get('cross-origin-resource-policy');
    const d = HEADER_DB['cross-origin-resource-policy'];
    if (!v) { push({ name: 'Cross-Origin-Resource-Policy', lname: 'cross-origin-resource-policy', status: 'missing', score: 0, maxScore: 5, ...d, assessment: 'Missing. Your resources can be loaded by cross-origin pages.', recommendation: 'same-origin (or same-site for CDN assets)' });
    } else { push({ name: 'Cross-Origin-Resource-Policy', lname: 'cross-origin-resource-policy', status: 'secure', value: v, score: 5, maxScore: 5, ...d, assessment: 'CORP is configured.', recommendation: 'No action needed.' }); }
  }

  // Warn about info leakage
  const sv = map.get('server');
  if (sv) assessments.push({ name: 'Server', lname: 'server', status: 'warning', value: sv, score: 0, maxScore: 0, ...HEADER_DB['server'], assessment: `Reveals: "${sv}". Version numbers help attackers look up CVEs.`, recommendation: 'Remove or set to a generic value: Server: web' });
  const xpb = map.get('x-powered-by');
  if (xpb) assessments.push({ name: 'X-Powered-By', lname: 'x-powered-by', status: 'warning', value: xpb, score: 0, maxScore: 0, ...HEADER_DB['x-powered-by'], assessment: `Reveals: "${xpb}". Remove to prevent framework fingerprinting.`, recommendation: "Express: app.disable('x-powered-by'). Nginx: more_clear_headers 'X-Powered-By'" });

  return { assessments, totalScore: Math.min(totalScore, maxScore), maxScore };
}

function getGrade(score: number) {
  if (score >= 95) return { grade: 'A+', label: 'Excellent', color: 'text-emerald-700', ring: 'ring-emerald-200', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' };
  if (score >= 85) return { grade: 'A', label: 'Strong', color: 'text-emerald-600', ring: 'ring-emerald-200', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' };
  if (score >= 70) return { grade: 'B', label: 'Good', color: 'text-blue-700', ring: 'ring-blue-200', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500' };
  if (score >= 55) return { grade: 'C', label: 'Fair', color: 'text-amber-700', ring: 'ring-amber-200', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' };
  if (score >= 40) return { grade: 'D', label: 'Weak', color: 'text-orange-700', ring: 'ring-orange-200', bg: 'bg-orange-50', border: 'border-orange-200', bar: 'bg-orange-500' };
  return { grade: 'F', label: 'Critical', color: 'text-red-700', ring: 'ring-red-200', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500' };
}

function parseHeaders(raw: string): ParsedHeader[] {
  return raw.split(/\r?\n/).flatMap(line => {
    const t = line.trim();
    if (!t || /^HTTP\/[\d.]+ \d+/.test(t)) return [];
    const i = t.indexOf(':');
    if (i === -1) return [];
    return [{ name: t.slice(0, i).trim(), value: t.slice(i + 1).trim(), lname: t.slice(0, i).trim().toLowerCase() }];
  });
}

// ── Config generators ─────────────────────────────────────────────────────────

const RECOMMENDED_HEADERS: Record<string, string> = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': "camera=(), microphone=(), geolocation=(), payment=()",
  'X-XSS-Protection': '0',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

function generateConfig(lang: ConfigLang): string {
  const h = RECOMMENDED_HEADERS;
  if (lang === 'express') return `// Express.js — Security Headers Middleware
// npm install helmet  ←  production-ready alternative
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "${h['Content-Security-Policy']}");
  res.setHeader('Strict-Transport-Security', '${h['Strict-Transport-Security']}');
  res.setHeader('X-Frame-Options', '${h['X-Frame-Options']}');
  res.setHeader('X-Content-Type-Options', '${h['X-Content-Type-Options']}');
  res.setHeader('Referrer-Policy', '${h['Referrer-Policy']}');
  res.setHeader('Permissions-Policy', '${h['Permissions-Policy']}');
  res.setHeader('X-XSS-Protection', '${h['X-XSS-Protection']}');
  res.setHeader('Cross-Origin-Opener-Policy', '${h['Cross-Origin-Opener-Policy']}');
  res.setHeader('Cross-Origin-Embedder-Policy', '${h['Cross-Origin-Embedder-Policy']}');
  res.setHeader('Cross-Origin-Resource-Policy', '${h['Cross-Origin-Resource-Policy']}');
  next();
});`;

  if (lang === 'nginx') return `# Nginx — Security Headers
# Place inside server {} or location {} block

server_tokens off;

add_header Content-Security-Policy "${h['Content-Security-Policy']}" always;
add_header Strict-Transport-Security "${h['Strict-Transport-Security']}" always;
add_header X-Frame-Options "${h['X-Frame-Options']}" always;
add_header X-Content-Type-Options "${h['X-Content-Type-Options']}" always;
add_header Referrer-Policy "${h['Referrer-Policy']}" always;
add_header Permissions-Policy "${h['Permissions-Policy']}" always;
add_header X-XSS-Protection "${h['X-XSS-Protection']}" always;
add_header Cross-Origin-Opener-Policy "${h['Cross-Origin-Opener-Policy']}" always;
add_header Cross-Origin-Embedder-Policy "${h['Cross-Origin-Embedder-Policy']}" always;
add_header Cross-Origin-Resource-Policy "${h['Cross-Origin-Resource-Policy']}" always;
more_clear_headers 'X-Powered-By' 'Server';`;

  if (lang === 'apache') return `# Apache — Security Headers
# Requires: a2enmod headers

<IfModule mod_headers.c>
  Header always set Content-Security-Policy "${h['Content-Security-Policy']}"
  Header always set Strict-Transport-Security "${h['Strict-Transport-Security']}"
  Header always set X-Frame-Options "${h['X-Frame-Options']}"
  Header always set X-Content-Type-Options "${h['X-Content-Type-Options']}"
  Header always set Referrer-Policy "${h['Referrer-Policy']}"
  Header always set Permissions-Policy "${h['Permissions-Policy']}"
  Header always set X-XSS-Protection "${h['X-XSS-Protection']}"
  Header always set Cross-Origin-Opener-Policy "${h['Cross-Origin-Opener-Policy']}"
  Header always set Cross-Origin-Embedder-Policy "${h['Cross-Origin-Embedder-Policy']}"
  Header always set Cross-Origin-Resource-Policy "${h['Cross-Origin-Resource-Policy']}"
  Header always unset X-Powered-By
  Header always unset Server
</IfModule>
# Also: ServerTokens Prod + ServerSignature Off in httpd.conf`;

  // next.js
  return `// next.config.js — Security Headers
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "${h['Content-Security-Policy']}" },
          { key: 'Strict-Transport-Security', value: '${h['Strict-Transport-Security']}' },
          { key: 'X-Frame-Options', value: '${h['X-Frame-Options']}' },
          { key: 'X-Content-Type-Options', value: '${h['X-Content-Type-Options']}' },
          { key: 'Referrer-Policy', value: '${h['Referrer-Policy']}' },
          { key: 'Permissions-Policy', value: '${h['Permissions-Policy']}' },
          { key: 'X-XSS-Protection', value: '${h['X-XSS-Protection']}' },
          { key: 'Cross-Origin-Opener-Policy', value: '${h['Cross-Origin-Opener-Policy']}' },
          { key: 'Cross-Origin-Embedder-Policy', value: '${h['Cross-Origin-Embedder-Policy']}' },
          { key: 'Cross-Origin-Resource-Policy', value: '${h['Cross-Origin-Resource-Policy']}' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;`;
}

// ── Reusable components ───────────────────────────────────────────────────────

function StatusIcon({ status }: { status: HeaderStatus }) {
  if (status === 'secure') return <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />;
  if (status === 'warning') return <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />;
  if (status === 'missing') return <ShieldOff className="h-4 w-4 text-red-600 shrink-0" />;
  return <Shield className="h-4 w-4 text-sky-600 shrink-0" />;
}

function StatusBadge({ status }: { status: HeaderStatus }) {
  const s = {
    secure: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    missing: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };
  const l = { secure: '✓ Secure', warning: '⚠ Warning', missing: '✕ Missing', info: 'ℹ Info' };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s[status]}`}>{l[status]}</span>;
}

function CopyBtn({ text, label = 'Copy', size = 'md' }: { text: string; label?: string; size?: 'sm' | 'md' }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1800); } catch {} }, [text]);
  if (size === 'sm') return (
    <button onClick={copy} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition" title="Copy">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300">
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

function AssessmentCard({ a }: { a: HeaderAssessment }) {
  const [open, setOpen] = useState(false);
  const pct = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0;
  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${
      a.status === 'secure' ? 'border-emerald-200 bg-emerald-50/30' :
      a.status === 'warning' ? 'border-amber-200 bg-amber-50/30' :
      a.status === 'missing' ? 'border-red-200 bg-red-50/30' :
      'border-sky-200 bg-sky-50/30'
    }`}>
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-start gap-3 px-4 py-3.5 text-left hover:bg-white/60 transition">
        <div className="mt-0.5"><StatusIcon status={a.status} /></div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[13px] font-semibold text-gray-900 tracking-tight">{a.name}</span>
            <StatusBadge status={a.status} />
            {a.maxScore > 0 && <span className="text-[10px] text-gray-400 font-mono">{a.score}/{a.maxScore}pts</span>}
            {a.attack && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">Prevents: {a.attack}</span>}
          </div>
          {a.value && <p className="font-mono text-[11px] text-gray-500 truncate leading-relaxed">{a.value}</p>}
          {a.maxScore > 0 && (
            <div className="h-1 w-full max-w-[120px] rounded-full bg-gray-200 overflow-hidden">
              <div className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
        <div className="shrink-0 mt-0.5 text-gray-400">{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
      </button>
      {open && (
        <div className="border-t border-gray-100 px-4 py-4 space-y-3 bg-white/40">
          <p className="text-[13px] text-gray-600 leading-relaxed">{a.description}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Assessment</p>
              <p className="text-[12px] text-gray-700 leading-relaxed">{a.assessment}</p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Fix</p>
              <p className="font-mono text-[11px] text-emerald-800 break-all leading-relaxed">{a.recommendation}</p>
            </div>
          </div>
          {a.mdn && (
            <a href={a.mdn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-sky-600 hover:text-sky-700 transition">
              <ExternalLink className="h-3 w-3" /> MDN Reference
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── CORS Analysis ─────────────────────────────────────────────────────────────

function CorsAnalysis({ headers }: { headers: ParsedHeader[] }) {
  const map = new Map(headers.map(h => [h.lname, h.value]));
  const acao = map.get('access-control-allow-origin');
  const acam = map.get('access-control-allow-methods');
  const acah = map.get('access-control-allow-headers');
  const acac = map.get('access-control-allow-credentials');
  const acma = map.get('access-control-max-age');
  const vary = map.get('vary');

  if (!acao && !acam && !acah) return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center space-y-2">
      <Globe className="mx-auto h-10 w-10 text-gray-300" />
      <p className="text-gray-600 font-medium">No CORS headers detected</p>
      <p className="text-gray-400 text-sm">CORS headers are only needed for APIs accessed from browsers across origins.</p>
    </div>
  );

  const issues: string[] = [], ok: string[] = [];
  if (acao === '*') issues.push("Access-Control-Allow-Origin: * — any origin can read responses. Dangerous with credentials.");
  else if (acao) ok.push(`Origin restricted to: ${acao}`);
  if (acac === 'true' && acao === '*') issues.push("Credentials + wildcard origin is invalid — browsers will reject this combination.");
  else if (acac === 'true') ok.push("Credentials allowed. Origin must be a specific domain, not *.");
  if (acam?.includes('*')) issues.push("Access-Control-Allow-Methods: * is overly permissive. List only required methods.");
  else if (acam) ok.push(`Allowed methods: ${acam}`);
  if (!vary?.toLowerCase().includes('origin') && acao) issues.push("Missing Vary: Origin header. Proxies may cache CORS responses incorrectly.");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[['Allow-Origin', acao], ['Allow-Methods', acam], ['Allow-Headers', acah], ['Allow-Credentials', acac], ['Max-Age', acma], ['Vary', vary]].map(([label, value]) => (
          <div key={label as string} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
            <p className={`font-mono text-xs break-all leading-relaxed ${value ? 'text-gray-800' : 'text-gray-300 italic'}`}>{value || 'not set'}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {issues.map((i, idx) => <div key={idx} className="flex gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3"><AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /><p className="text-sm text-red-800">{i}</p></div>)}
        {ok.map((o, idx) => <div key={idx} className="flex gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"><ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /><p className="text-sm text-emerald-800">{o}</p></div>)}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HttpHeadersAnalyzerClient() {
  const [raw, setRaw] = useState(EXAMPLES[1].headers);
  const [analyzed, setAnalyzed] = useState(EXAMPLES[1].headers);
  const [tab, setTab] = useState<Tab>('security');
  const [configLang, setConfigLang] = useState<ConfigLang>('express');

  const headers = useMemo(() => parseHeaders(analyzed), [analyzed]);
  const { assessments, totalScore, maxScore } = useMemo(() => assessHeaders(headers), [headers]);
  const grade = useMemo(() => getGrade(totalScore), [totalScore]);

  const secureCount = assessments.filter(a => a.status === 'secure').length;
  const warnCount = assessments.filter(a => a.status === 'warning').length;
  const missingCount = assessments.filter(a => a.status === 'missing').length;
  const missingCritical = assessments.filter(a => a.status === 'missing' && a.maxScore >= 10);
  const configCode = useMemo(() => generateConfig(configLang), [configLang]);

  const analyze = useCallback(() => setAnalyzed(raw), [raw]);
  const clear = useCallback(() => { setRaw(''); setAnalyzed(''); }, []);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'security', label: 'Security Analysis', icon: <Shield className="h-3.5 w-3.5" />, count: assessments.length },
    { id: 'overview', label: 'All Headers', icon: <BarChart3 className="h-3.5 w-3.5" />, count: headers.length },
    { id: 'cors', label: 'CORS', icon: <Globe className="h-3.5 w-3.5" /> },
    { id: 'config', label: 'Config Generator', icon: <Server className="h-3.5 w-3.5" /> },
  ];

  const tool = (
    <div className="space-y-6">

      {/* Examples strip */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Load an example</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setRaw(ex.headers); setAnalyzed(ex.headers); }}
              className="flex flex-col items-start gap-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/30">
              <span className="text-xl">{ex.emoji}</span>
              <span className="text-sm font-semibold text-gray-900 leading-tight">{ex.label}</span>
              <span className="text-xs text-gray-500 leading-tight">{ex.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">HTTP Response Headers</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Tip: DevTools → Network → any request → Response Headers</span>
            {raw && <button onClick={clear} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition"><X className="h-3 w-3" /> Clear</button>}
          </div>
        </div>
        <textarea value={raw} onChange={e => setRaw(e.target.value)} rows={7} spellCheck={false}
          placeholder={`HTTP/2 200 OK\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000\n...\n\nPaste raw headers here`}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-mono text-sm leading-relaxed text-gray-800 placeholder-gray-300 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 shadow-sm transition" />
        <button onClick={analyze}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98] shadow-sm">
          <Zap className="h-4 w-4" /> Analyze Headers
        </button>
      </div>

      {/* Score panel */}
      {headers.length > 0 && (
        <div className={`rounded-2xl border ${grade.border} ${grade.bg} p-6`}>
          <div className="flex flex-wrap items-center gap-5">
            {/* Grade circle */}
            <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ring-4 ${grade.ring} ${grade.bg} border ${grade.border}`}>
              <div className="text-center">
                <div className={`text-3xl font-black leading-none ${grade.color}`}>{grade.grade}</div>
                <div className={`text-[9px] font-bold uppercase tracking-wider ${grade.color} opacity-70`}>{grade.label}</div>
              </div>
            </div>
            {/* Score bar */}
            <div className="flex-1 min-w-[180px] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-700">Security Score</span>
                <span className={`text-2xl font-black ${grade.color}`}>{totalScore}<span className="text-sm text-gray-400 font-normal">/{maxScore}</span></span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${grade.bar}`} style={{ width: `${(totalScore / maxScore) * 100}%` }} />
              </div>
            </div>
            {/* Counts */}
            <div className="flex gap-5">
              {[['✓', secureCount, 'text-emerald-700', 'Secure'], ['⚠', warnCount, 'text-amber-700', 'Warnings'], ['✕', missingCount, 'text-red-700', 'Missing']].map(([icon, n, cls, lbl]) => (
                <div key={lbl as string} className="text-center">
                  <div className={`text-2xl font-black ${cls}`}>{n as number}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick fixes */}
          {missingCritical.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Critical missing headers</p>
              <div className="flex flex-wrap gap-2">
                {missingCritical.map(a => (
                  <span key={a.name} className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 font-mono text-[11px] text-red-700">
                    <ShieldOff className="h-3 w-3" /> {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs + content */}
      {headers.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm whitespace-nowrap transition ${
                  tab === t.id
                    ? 'bg-white border border-gray-200 text-gray-900 font-semibold shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}>
                {t.icon} {t.label}
                {t.count !== undefined && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    tab === t.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-400'
                  }`}>{t.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Security tab */}
          {tab === 'security' && <div className="space-y-2">{assessments.map((a, i) => <AssessmentCard key={i} a={a} />)}</div>}

          {/* Overview tab */}
          {tab === 'overview' && (
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">Header</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">Value</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">Category</th>
                </tr></thead>
                <tbody>
                  {headers.map((h, i) => {
                    const cat = HEADER_DB[h.lname]?.category ?? 'other';
                    const catCls: Record<string, string> = {
                      security: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                      cors: 'text-sky-700 bg-sky-50 border-sky-200',
                      caching: 'text-amber-700 bg-amber-50 border-amber-200',
                      content: 'text-violet-700 bg-violet-50 border-violet-200',
                      info: 'text-gray-600 bg-gray-100 border-gray-200',
                      other: 'text-gray-600 bg-gray-100 border-gray-200',
                    };
                    return (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-mono text-[12px] font-semibold text-gray-900">{h.name}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-gray-500 max-w-xs truncate">{h.value}</td>
                        <td className="px-4 py-3"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${catCls[cat]}`}>{cat}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* CORS tab */}
          {tab === 'cors' && <CorsAnalysis headers={headers} />}

          {/* Config tab */}
          {tab === 'config' && (
            <div className="space-y-4">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 flex-wrap">
                {(['express', 'nginx', 'apache', 'nextjs'] as ConfigLang[]).map(lang => (
                  <button key={lang} onClick={() => setConfigLang(lang)}
                    className={`rounded-md px-4 py-1.5 text-sm font-semibold capitalize transition ${
                      configLang === lang
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}>
                    {lang === 'nextjs' ? 'Next.js' : lang === 'express' ? 'Express.js' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5 bg-gray-50">
                  <span className="font-mono text-xs text-gray-500">{configLang === 'nextjs' ? 'next.config.js' : configLang === 'express' ? 'middleware.js' : configLang === 'nginx' ? 'nginx.conf' : '.htaccess'}</span>
                  <CopyBtn text={configCode} />
                </div>
                <pre className="overflow-x-auto bg-gray-900 p-5 text-[12px] leading-relaxed text-gray-100 font-mono whitespace-pre">{configCode}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {headers.length === 0 && analyzed.trim() && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <ShieldOff className="mx-auto h-10 w-10 text-gray-300 mb-3" />
          <p className="text-gray-600 font-medium">No headers could be parsed</p>
          <p className="text-gray-400 text-sm mt-1">Expected format: <code className="font-mono text-gray-600">Header-Name: value</code> (one per line)</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolPageShell
      title="HTTP Security Headers Analyzer"
      subtitle="Paste HTTP response headers, get an A+ to F security grade, detect vulnerabilities, and generate server configs"
      icon="🔒"
      tool={tool}
    />
  );
}
