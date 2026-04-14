'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Zap } from 'lucide-react';

/* ─── reduced-motion ──────────────────────────────────────────── */
function usePrefersReducedMotion(): boolean {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setV(mq.matches);
    const fn = () => setV(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return v;
}

/* ─── Types ───────────────────────────────────────────────────── */
type Part = {
  t: string;            // text
  c?: string;           // class
  pulse?: boolean;      // danger red glow
  glow?: boolean;       // safe token glow (after phase)
};
type Line = Part[];
type Scene = {
  id: string;
  file: string;
  tool: string;
  label: string;        // short name for filmstrip
  emoji: string;
  href: string;
  accent: string;       // e.g. 'text-emerald-400'
  accentHex: string;    // e.g. '#34d399'  (for glow shadows)
  bgChip: string;       // badge bg
  ringChip: string;     // badge ring
  stat: string;         // "3 identifiers masked"
  before: Line[];
  after: Line[];
};

/* ─── Scene data ──────────────────────────────────────────────── */
const SCENES: Scene[] = [
  /* 1 ── AI Schema Masker ────────────────────────────────────── */
  {
    id: 'schema', file: 'query.sql',
    tool: 'AI Schema Masker', label: 'Schema Masker', emoji: '🛡️',
    href: '/ai-schema-masker',
    accent: 'text-emerald-400', accentHex: '#34d399',
    bgChip: 'bg-emerald-500/15', ringChip: 'ring-emerald-400/40',
    stat: '4 identifiers masked',
    before: [
      [{ t: '-- ⚠️  Raw SQL — contains PII', c: 'text-zinc-500' }],
      [],
      [
        { t: 'SELECT ', c: 'text-red-400' },
        { t: 'u.customer_name, u.email,', c: 'text-zinc-100', pulse: true },
      ],
      [
        { t: '       ', c: 'text-red-400' },
        { t: 'u.credit_score, u.ssn', c: 'text-zinc-100', pulse: true },
      ],
      [
        { t: 'FROM ', c: 'text-red-400' },
        { t: 'banking.customer_details ', c: 'text-amber-300', pulse: true },
        { t: 'u', c: 'text-zinc-500' },
      ],
      [
        { t: 'WHERE ', c: 'text-red-400' },
        { t: 'u.status = ', c: 'text-zinc-300' },
        { t: "'ACTIVE';", c: 'text-emerald-400' },
      ],
    ],
    after: [
      [{ t: '-- ✓  Masked — safe for any AI', c: 'text-zinc-500' }],
      [],
      [
        { t: 'SELECT ', c: 'text-sky-400' },
        { t: 'C_00001, C_00002,', c: 'text-violet-300', glow: true },
      ],
      [
        { t: '       ', c: 'text-sky-400' },
        { t: 'C_00003, C_00004', c: 'text-violet-300', glow: true },
      ],
      [
        { t: 'FROM ', c: 'text-sky-400' },
        { t: 'T_00001', c: 'text-violet-400', glow: true },
        { t: '.', c: 'text-zinc-500' },
        { t: 'A_00001', c: 'text-sky-400', glow: true },
      ],
      [
        { t: 'WHERE ', c: 'text-sky-400' },
        { t: "C_00001 = 'S_00001';", c: 'text-emerald-400' },
      ],
    ],
  },

  /* 2 ── JSON Formatter ──────────────────────────────────────── */
  {
    id: 'json', file: 'api-response.json',
    tool: 'JSON Formatter', label: 'JSON Format', emoji: '{ }',
    href: '/json-formatter',
    accent: 'text-cyan-400', accentHex: '#22d3ee',
    bgChip: 'bg-cyan-500/15', ringChip: 'ring-cyan-400/40',
    stat: '8 levels indented',
    before: [
      [{ t: '// ⚠️  Minified — unreadable API blob', c: 'text-zinc-500' }],
      [],
      [{ t: '{"user":{"id":1,"name":"Alice",', c: 'text-amber-300/80' }],
      [{ t: '"role":"admin","plan":"pro",', c: 'text-amber-300/80' }],
      [{ t: '"meta":{"created":"2024-01","active":', c: 'text-amber-300/80' }],
      [{ t: 'true}}}', c: 'text-amber-300/80' }],
    ],
    after: [
      [{ t: '// ✓  Beautifully formatted ✨', c: 'text-zinc-500' }],
      [{ t: '{', c: 'text-zinc-300' }],
      [
        { t: '  ' },
        { t: '"user"', c: 'text-sky-300', glow: true },
        { t: ': {', c: 'text-zinc-300' },
      ],
      [
        { t: '    ' },
        { t: '"id"', c: 'text-sky-300' },
        { t: ': ', c: 'text-zinc-400' },
        { t: '1', c: 'text-violet-400', glow: true },
        { t: ',' },
      ],
      [
        { t: '    ' },
        { t: '"name"', c: 'text-sky-300' },
        { t: ': ', c: 'text-zinc-400' },
        { t: '"Alice"', c: 'text-emerald-400', glow: true },
        { t: ',' },
      ],
      [
        { t: '    ' },
        { t: '"role"', c: 'text-sky-300' },
        { t: ': ', c: 'text-zinc-400' },
        { t: '"admin"', c: 'text-emerald-400', glow: true },
      ],
      [{ t: '  }', c: 'text-zinc-300' }],
      [{ t: '}', c: 'text-zinc-300' }],
    ],
  },

  /* 3 ── JWT Decoder ─────────────────────────────────────────── */
  {
    id: 'jwt', file: 'auth.jwt',
    tool: 'JWT Decoder', label: 'JWT Decode', emoji: '🔑',
    href: '/jwt-decoder',
    accent: 'text-amber-400', accentHex: '#fbbf24',
    bgChip: 'bg-amber-500/15', ringChip: 'ring-amber-400/40',
    stat: '4 claims decoded',
    before: [
      [{ t: '// ⚠️  Encoded JWT — looks like noise', c: 'text-zinc-500' }],
      [],
      [
        { t: 'eyJhbGciOiJIUzI1NiJ9', c: 'text-red-400', pulse: true },
        { t: '.', c: 'text-zinc-600' },
      ],
      [
        { t: 'eyJ1c2VySWQiOjQyLCJyb2xl', c: 'text-amber-300', pulse: true },
        { t: '.', c: 'text-zinc-600' },
      ],
      [
        { t: 'SflKxwRJSMeKKF2QT4fwpMeJ...', c: 'text-violet-400', pulse: true },
      ],
    ],
    after: [
      [{ t: '// ✓  Decoded — instant clarity', c: 'text-zinc-500' }],
      [],
      [{ t: '■ HEADER', c: 'text-red-400' }],
      [
        { t: '  alg', c: 'text-sky-300', glow: true },
        { t: '  →  ' },
        { t: '"HS256"', c: 'text-emerald-400', glow: true },
      ],
      [],
      [{ t: '■ PAYLOAD', c: 'text-amber-400' }],
      [
        { t: '  userId', c: 'text-sky-300', glow: true },
        { t: ' →  ' },
        { t: '42', c: 'text-violet-400', glow: true },
      ],
      [
        { t: '  role  ', c: 'text-sky-300', glow: true },
        { t: ' →  ' },
        { t: '"admin"', c: 'text-emerald-400', glow: true },
      ],
      [
        { t: '  exp   ', c: 'text-sky-300', glow: true },
        { t: ' →  ' },
        { t: '2026-12-31', c: 'text-amber-400', glow: true },
      ],
    ],
  },

  /* 4 ── Code Prompt Shield ──────────────────────────────────── */
  {
    id: 'code', file: 'config.ts',
    tool: 'Code Prompt Shield', label: 'Code Shield', emoji: '🔐',
    href: '/code-prompt-shield',
    accent: 'text-violet-400', accentHex: '#a78bfa',
    bgChip: 'bg-violet-500/15', ringChip: 'ring-violet-400/40',
    stat: '3 secrets stripped',
    before: [
      [{ t: '// ⚠️  Real credentials — never share!', c: 'text-zinc-500' }],
      [],
      [
        { t: 'const ', c: 'text-red-400' },
        { t: 'STRIPE = ', c: 'text-zinc-300' },
        { t: '"sk_live_9xKZabc..."', c: 'text-rose-400', pulse: true },
      ],
      [
        { t: 'const ', c: 'text-red-400' },
        { t: 'DB_URL = ', c: 'text-zinc-300' },
        { t: '"postgres://admin:pwd@host"', c: 'text-rose-400', pulse: true },
      ],
      [
        { t: 'const ', c: 'text-red-400' },
        { t: 'GOOG  = ', c: 'text-zinc-300' },
        { t: '"AIzaSyD_fake123xyz"', c: 'text-rose-400', pulse: true },
      ],
    ],
    after: [
      [{ t: '// ✓  Safe to share with AI ✨', c: 'text-zinc-500' }],
      [],
      [
        { t: 'const ', c: 'text-sky-400' },
        { t: 'STRIPE = ', c: 'text-zinc-300' },
        { t: '"SECRET_1"', c: 'text-violet-400', glow: true },
      ],
      [
        { t: 'const ', c: 'text-sky-400' },
        { t: 'DB_URL = ', c: 'text-zinc-300' },
        { t: '"SECRET_2"', c: 'text-violet-400', glow: true },
      ],
      [
        { t: 'const ', c: 'text-sky-400' },
        { t: 'GOOG   = ', c: 'text-zinc-300' },
        { t: '"SECRET_3"', c: 'text-violet-400', glow: true },
      ],
      [],
      [{ t: '// 18 languages · pre-scan · restore', c: 'text-emerald-500/80' }],
    ],
  },

  /* 5 ── cURL Converter ──────────────────────────────────────── */
  {
    id: 'curl', file: 'request.sh',
    tool: 'cURL Converter', label: 'cURL Convert', emoji: '⚡',
    href: '/curl-converter',
    accent: 'text-sky-400', accentHex: '#38bdf8',
    bgChip: 'bg-sky-500/15', ringChip: 'ring-sky-400/40',
    stat: 'Converted to fetch()',
    before: [
      [{ t: '# Input: cURL from browser devtools', c: 'text-zinc-500' }],
      [],
      [{ t: 'curl -X POST \\', c: 'text-amber-300' }],
      [{ t: "  'https://api.stripe.com/charges' \\", c: 'text-zinc-300' }],
      [
        { t: "  -H 'Authorization: Bearer sk...' \\", c: 'text-rose-400', pulse: true },
      ],
      [{ t: "  -d 'amount=2000&currency=usd'", c: 'text-zinc-400' }],
    ],
    after: [
      [{ t: '// ✓  fetch() — paste & run', c: 'text-zinc-500' }],
      [],
      [
        { t: 'const ', c: 'text-red-400' },
        { t: 'res ', c: 'text-zinc-100' },
        { t: '= await ', c: 'text-red-400' },
        { t: 'fetch', c: 'text-sky-300', glow: true },
        { t: '(' },
      ],
      [{ t: "  'https://api.stripe.com/charges',", c: 'text-emerald-400', glow: true }],
      [
        { t: '  { method: ', c: 'text-zinc-300' },
        { t: "'POST'", c: 'text-amber-300', glow: true },
        { t: ', headers: {', c: 'text-zinc-300' },
      ],
      [
        { t: '    Authorization', c: 'text-sky-300', glow: true },
        { t: ": 'Bearer sk...'", c: 'text-violet-400' },
      ],
      [{ t: '  }, body: ... }', c: 'text-zinc-300' }],
      [{ t: ');', c: 'text-zinc-400' }],
    ],
  },

  /* 6 ── Regex Tester ─────────────────────────────────────────── */
  {
    id: 'regex', file: 'pattern.regex',
    tool: 'Regex Tester', label: 'Regex Test', emoji: '🔍',
    href: '/regex-tester',
    accent: 'text-pink-400', accentHex: '#f472b6',
    bgChip: 'bg-pink-500/15', ringChip: 'ring-pink-400/40',
    stat: '3 matches found',
    before: [
      [{ t: '// Testing email extraction pattern', c: 'text-zinc-500' }],
      [],
      [
        { t: 'pattern ', c: 'text-red-400' },
        { t: '= ', c: 'text-zinc-400' },
        { t: '/[\\w.-]+@[\\w.-]+\\.\\w+/g', c: 'text-amber-300', pulse: true },
      ],
      [],
      [{ t: 'text = `', c: 'text-zinc-400' }],
      [{ t: '  Contact alice@acme.io or', c: 'text-zinc-300' }],
      [{ t: '  bob@corp.dev or eve@example.com', c: 'text-zinc-300' }],
      [{ t: '`', c: 'text-zinc-400' }],
    ],
    after: [
      [{ t: '// ✓  3 matches found instantly', c: 'text-zinc-500' }],
      [],
      [{ t: 'MATCH  0  →  ', c: 'text-zinc-500' }, { t: 'alice@acme.io', c: 'text-pink-400', glow: true }],
      [{ t: 'MATCH  1  →  ', c: 'text-zinc-500' }, { t: 'bob@corp.dev', c: 'text-pink-400', glow: true }],
      [{ t: 'MATCH  2  →  ', c: 'text-zinc-500' }, { t: 'eve@example.com', c: 'text-pink-400', glow: true }],
      [],
      [{ t: '//  Flags: global · index · span', c: 'text-emerald-500/80' }],
    ],
  },

  /* 7 ── Base64 Encoder ───────────────────────────────────────── */
  {
    id: 'b64', file: 'encode.b64',
    tool: 'Base64 Encoder', label: 'Base64', emoji: '🔗',
    href: '/base64-encoder',
    accent: 'text-orange-400', accentHex: '#fb923c',
    bgChip: 'bg-orange-500/15', ringChip: 'ring-orange-400/40',
    stat: '28 chars encoded',
    before: [
      [{ t: '// Encode credentials for API header', c: 'text-zinc-500' }],
      [],
      [{ t: 'INPUT:', c: 'text-red-400' }],
      [{ t: '  "admin:myS3cretP@ssword!"', c: 'text-rose-400', pulse: true }],
      [],
      [{ t: 'TARGET: Authorization header', c: 'text-zinc-500' }],
    ],
    after: [
      [{ t: '// ✓  Base64 encoded — safe to send', c: 'text-zinc-500' }],
      [],
      [{ t: 'OUTPUT:', c: 'text-orange-400' }],
      [{ t: '  YWRtaW46bXlTM2NyZXRQ', c: 'text-orange-300', glow: true }],
      [{ t: '  QHNzd29yZCE=', c: 'text-orange-300', glow: true }],
      [],
      [
        { t: 'Authorization: ', c: 'text-sky-300', glow: true },
        { t: 'Basic YWRtaW4...', c: 'text-emerald-400', glow: true },
      ],
    ],
  },

  /* 8 ── Hash Generator ───────────────────────────────────────── */
  {
    id: 'hash', file: 'hash.sha256',
    tool: 'Hash Generator', label: 'Hash Gen', emoji: '#️⃣',
    href: '/hash-generator',
    accent: 'text-teal-400', accentHex: '#2dd4bf',
    bgChip: 'bg-teal-500/15', ringChip: 'ring-teal-400/40',
    stat: 'SHA-256 · 64 chars',
    before: [
      [{ t: '// Generate cryptographic digest', c: 'text-zinc-500' }],
      [],
      [{ t: 'INPUT:    ', c: 'text-red-400' }, { t: '"myPassword2024!"', c: 'text-rose-400', pulse: true }],
      [{ t: 'ALGO:     ', c: 'text-zinc-400' }, { t: 'SHA-256', c: 'text-amber-300' }],
      [{ t: 'ENCODING: ', c: 'text-zinc-400' }, { t: 'hex', c: 'text-zinc-300' }],
      [],
      [{ t: 'OUTPUT:  ', c: 'text-zinc-600' }, { t: 'computing...', c: 'text-zinc-600' }],
    ],
    after: [
      [{ t: '// ✓  Cryptographic hash ready', c: 'text-zinc-500' }],
      [],
      [{ t: 'SHA-256:', c: 'text-teal-400' }],
      [{ t: '  a3f2b8c9d4e1f0ab', c: 'text-teal-300', glow: true }],
      [{ t: '  52c7891023def456', c: 'text-teal-300', glow: true }],
      [{ t: '  78a9b0c1d2e3f4a5', c: 'text-teal-300', glow: true }],
      [{ t: '  1b2c3d4e5f6a7b8c', c: 'text-teal-300', glow: true }],
      [],
      [{ t: '//  Also: MD5 · SHA-1 · SHA-512 · HMAC', c: 'text-emerald-500/80' }],
    ],
  },

  /* 9 ── SQL Formatter ────────────────────────────────────────── */
  {
    id: 'sqlfmt', file: 'messy.sql',
    tool: 'SQL Formatter', label: 'SQL Format', emoji: '🗄️',
    href: '/sql-formatter',
    accent: 'text-fuchsia-400', accentHex: '#e879f9',
    bgChip: 'bg-fuchsia-500/15', ringChip: 'ring-fuchsia-400/40',
    stat: '12 lines formatted',
    before: [
      [{ t: '-- ⚠️  Unreadable one-liner', c: 'text-zinc-500' }],
      [],
      [{ t: 'select u.id,u.name,o.total,o.status', c: 'text-amber-300/80', pulse: true }],
      [{ t: 'from users u inner join orders o on', c: 'text-amber-300/80', pulse: true }],
      [{ t: "u.id=o.user_id where o.status='paid'", c: 'text-amber-300/80', pulse: true }],
      [{ t: 'and o.total>100 order by o.total desc', c: 'text-amber-300/80', pulse: true }],
    ],
    after: [
      [{ t: '-- ✓  Clean, readable SQL', c: 'text-zinc-500' }],
      [],
      [{ t: 'SELECT', c: 'text-fuchsia-400' }],
      [
        { t: '  u.id, u.name,', c: 'text-zinc-300', glow: true },
        { t: ' o.total, o.status', c: 'text-zinc-300', glow: true },
      ],
      [{ t: 'FROM', c: 'text-fuchsia-400' }, { t: ' users ', c: 'text-zinc-300' }, { t: 'u', c: 'text-sky-400', glow: true }],
      [
        { t: 'INNER JOIN', c: 'text-fuchsia-400' },
        { t: ' orders ', c: 'text-zinc-300' },
        { t: 'o', c: 'text-sky-400', glow: true },
        { t: ' ON u.id = o.user_id', c: 'text-zinc-300' },
      ],
      [
        { t: 'WHERE', c: 'text-fuchsia-400' },
        { t: " o.status = ", c: 'text-zinc-300' },
        { t: "'paid'", c: 'text-emerald-400', glow: true },
        { t: ' AND o.total > ', c: 'text-zinc-300' },
        { t: '100', c: 'text-violet-400', glow: true },
      ],
      [{ t: 'ORDER BY', c: 'text-fuchsia-400' }, { t: ' o.total ', c: 'text-zinc-300' }, { t: 'DESC', c: 'text-fuchsia-300', glow: true }],
    ],
  },

  /* 10 ── Smart JSON Diff ─────────────────────────────────────── */
  {
    id: 'diff', file: 'compare.json',
    tool: 'Smart JSON Diff', label: 'JSON Diff', emoji: '🔀',
    href: '/json-comparator',
    accent: 'text-lime-400', accentHex: '#a3e635',
    bgChip: 'bg-lime-500/15', ringChip: 'ring-lime-400/40',
    stat: '3 changes detected',
    before: [
      [{ t: '// Comparing v1 → v2 API response', c: 'text-zinc-500' }],
      [],
      [{ t: 'V1: ', c: 'text-zinc-600' }, { t: '{ "plan":"free",  "limit":100,', c: 'text-amber-300/80', pulse: true }],
      [{ t: '      ', c: 'text-zinc-600' }, { t: '"active":false, "seats":1 }', c: 'text-amber-300/80', pulse: true }],
      [],
      [{ t: 'V2: ', c: 'text-zinc-600' }, { t: '{ "plan":"pro",   "limit":5000,', c: 'text-amber-300/80', pulse: true }],
      [{ t: '      ', c: 'text-zinc-600' }, { t: '"active":true,  "seats":10 }', c: 'text-amber-300/80', pulse: true }],
    ],
    after: [
      [{ t: '// ✓  Exact diff — 3 fields changed', c: 'text-zinc-500' }],
      [],
      [{ t: '  plan   ', c: 'text-zinc-500' }, { t: '"free"', c: 'text-rose-400' }, { t: ' → ', c: 'text-zinc-600' }, { t: '"pro"', c: 'text-lime-400', glow: true }],
      [{ t: '  limit  ', c: 'text-zinc-500' }, { t: '100', c: 'text-rose-400' }, { t: '   → ', c: 'text-zinc-600' }, { t: '5000', c: 'text-lime-400', glow: true }],
      [{ t: '  active ', c: 'text-zinc-500' }, { t: 'false', c: 'text-rose-400' }, { t: ' → ', c: 'text-zinc-600' }, { t: 'true', c: 'text-lime-400', glow: true }],
      [{ t: '  seats  ', c: 'text-zinc-500' }, { t: '1', c: 'text-rose-400' }, { t: '     → ', c: 'text-zinc-600' }, { t: '10', c: 'text-lime-400', glow: true }],
      [],
      [{ t: '//  Unchanged: 0  Added: 0  Modified: 4', c: 'text-emerald-500/80' }],
    ],
  },

  /* 11 ── JSON Fixer ──────────────────────────────────────────── */
  {
    id: 'fixer', file: 'broken.json',
    tool: 'JSON Fixer', label: 'JSON Fixer', emoji: '🔧',
    href: '/json-fixer-online',
    accent: 'text-rose-400', accentHex: '#fb7185',
    bgChip: 'bg-rose-500/15', ringChip: 'ring-rose-400/40',
    stat: '4 errors auto-fixed',
    before: [
      [{ t: '// ⚠️  Broken JSON from AI response', c: 'text-zinc-500' }],
      [],
      [{ t: '{', c: 'text-zinc-400' }],
      [
        { t: "  'name'", c: 'text-rose-400', pulse: true },
        { t: ': ', c: 'text-zinc-400' },
        { t: '"Alice"', c: 'text-emerald-400' },
        { t: '  // ← single quotes', c: 'text-red-500' },
      ],
      [
        { t: '  "age": ', c: 'text-zinc-300' },
        { t: '30,', c: 'text-violet-400' },
        { t: '  // ← trailing comma', c: 'text-red-500', pulse: true },
      ],
      [
        { t: '  "active": ', c: 'text-zinc-300' },
        { t: 'True', c: 'text-rose-400', pulse: true },
        { t: '  // ← wrong casing', c: 'text-red-500' },
      ],
      [{ t: '}', c: 'text-zinc-400' }],
    ],
    after: [
      [{ t: '// ✓  All errors fixed automatically', c: 'text-zinc-500' }],
      [],
      [{ t: '{', c: 'text-zinc-400' }],
      [
        { t: '  "name"', c: 'text-sky-300', glow: true },
        { t: ': ', c: 'text-zinc-400' },
        { t: '"Alice"', c: 'text-emerald-400', glow: true },
      ],
      [
        { t: '  "age"', c: 'text-sky-300', glow: true },
        { t: ': ', c: 'text-zinc-400' },
        { t: '30', c: 'text-violet-400', glow: true },
      ],
      [
        { t: '  "active"', c: 'text-sky-300', glow: true },
        { t: ': ', c: 'text-zinc-400' },
        { t: 'true', c: 'text-amber-400', glow: true },
      ],
      [{ t: '}', c: 'text-zinc-400' }],
      [],
      [{ t: '//  Fixes: quotes · comma · casing · spacing', c: 'text-emerald-500/80' }],
    ],
  },
];

/* ─── Phase timing ────────────────────────────────────────────── */
type Phase = 'before' | 'typing' | 'scanning' | 'after' | 'exit';
const BEFORE_MS   = 1500;
const CHAR_MS     = 36;    // slightly faster typing
const SCAN_MS     = 650;
const AFTER_MS    = 4200;
const EXIT_MS     = 320;

/* ─── Main export ─────────────────────────────────────────────── */
export default function HomeHeroCodePreview() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticFallback />;
  return <AnimatedShowcase />;
}

/* ─── Static fallback ─────────────────────────────────────────── */
function StaticFallback() {
  const s = SCENES[0];
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
      <Chrome file={s.file} accent={s.accent} />
      <div className="p-5 font-mono text-[13px] leading-[1.8]">
        <RenderLines lines={s.after} />
        <Trust text={s.stat} accent={s.accent} />
      </div>
    </div>
  );
}

/* ─── Main animated component ─────────────────────────────────── */
function AnimatedShowcase() {
  const [idx, setIdx]     = useState(0);
  const [phase, setPhase] = useState<Phase>('before');
  const [typed, setTyped] = useState(0);
  const [reveal, setReveal] = useState<number>(0);   // lines revealed (after phase)
  const [fade, setFade]   = useState(true);           // visibility
  const [progKey, setProgKey] = useState(0);           // remount progress bar

  const scene      = SCENES[idx];
  const typingText = `// Analysing with ${scene.tool}…`;

  /* advance to next scene */
  const advance = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIdx(i => (i + 1) % SCENES.length);
      setPhase('before');
      setTyped(0);
      setReveal(0);
      setFade(true);
    }, EXIT_MS);
  }, []);

  /* phase timer */
  useEffect(() => {
    if (phase === 'before') {
      const t = setTimeout(() => setPhase('typing'), BEFORE_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'scanning') {
      const t = setTimeout(() => {
        setReveal(0);
        setProgKey(k => k + 1);
        setPhase('after');
      }, SCAN_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'after') {
      const t = setTimeout(advance, AFTER_MS);
      return () => clearTimeout(t);
    }
  }, [phase, advance]);

  /* typing effect */
  useEffect(() => {
    if (phase !== 'typing') return;
    if (typed >= typingText.length) {
      const t = setTimeout(() => setPhase('scanning'), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped(n => n + 1), CHAR_MS);
    return () => clearTimeout(t);
  }, [phase, typed, typingText.length]);

  /* staggered line reveal in 'after' phase */
  useEffect(() => {
    if (phase !== 'after') return;
    if (reveal >= scene.after.length) return;
    const t = setTimeout(() => setReveal(r => r + 1), 90);
    return () => clearTimeout(t);
  }, [phase, reveal, scene.after.length]);

  const isAfter = phase === 'after';

  /* jump to scene helper */
  const jumpTo = (i: number) => {
    setFade(false);
    setTimeout(() => { setIdx(i); setPhase('before'); setTyped(0); setReveal(0); setFade(true); }, EXIT_MS);
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/50"
      role="img"
      aria-label="Animated demo cycling through UnblockDevs developer tools"
    >
      {/* ── Window chrome — traffic lights · filename · counter ── */}
      <div className="relative flex items-center border-b border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent bg-[length:200%_100%] animate-hero-title-shimmer"
          aria-hidden
        />
        {/* Traffic lights */}
        <span className="relative flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        {/* Filename — centred */}
        <span className={`relative mx-auto font-mono text-[10.5px] transition-colors duration-300 ${scene.accent}`}>
          {scene.file}
        </span>
        {/* Scene counter — far right */}
        <span className="relative shrink-0 font-mono text-[10px] text-zinc-600 tabular-nums">
          {String(idx + 1).padStart(2, '0')}&nbsp;/&nbsp;{SCENES.length}
        </span>
      </div>

      {/* ── Filmstrip carousel ────────────────────────────────── */}
      <Filmstrip scenes={SCENES} idx={idx} scene={scene} onJump={jumpTo} />

      {/* ── Code body ─────────────────────────────────────────── */}
      <div
        className="relative min-h-[310px] overflow-hidden p-5 font-mono text-[12.5px] leading-[1.85] transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {/* State label — top right corner */}
        <div className="absolute right-4 top-4 z-10">
          {(phase === 'before' || phase === 'typing' || phase === 'scanning') && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-hero-cursor-blink" />
              BEFORE
            </span>
          )}
          {isAfter && (
            <span className={`inline-flex items-center gap-1.5 animate-badge-slide rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${scene.bgChip} ${scene.ringChip} ${scene.accent}`}>
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              AFTER
            </span>
          )}
        </div>

        {/* BEFORE state */}
        {(phase === 'before' || phase === 'typing' || phase === 'scanning') && (
          <div>
            <RenderLines lines={scene.before} />
            {phase === 'before' && (
              <div className="mt-0.5">
                <span className="animate-hero-cursor-blink text-emerald-400">▍</span>
              </div>
            )}
          </div>
        )}

        {/* TYPING overlay */}
        {(phase === 'typing' || phase === 'scanning') && (
          <div className="mt-4 text-[12.5px] leading-relaxed">
            <span className={scene.accent}>{typingText.slice(0, typed)}</span>
            {phase === 'typing' && (
              <span className="animate-hero-cursor-blink text-emerald-400">▍</span>
            )}
          </div>
        )}

        {/* SCAN LINE — double beam for drama */}
        {phase === 'scanning' && (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 h-[2px] animate-scan-line"
              style={{
                top: '15%',
                background: `linear-gradient(90deg, transparent, ${scene.accentHex}60, ${scene.accentHex}, ${scene.accentHex}60, transparent)`,
                boxShadow: `0 0 16px 3px ${scene.accentHex}70`,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 h-px animate-scan-line"
              style={{
                top: '15%',
                animationDelay: '80ms',
                background: `linear-gradient(90deg, transparent, ${scene.accentHex}30, ${scene.accentHex}80, ${scene.accentHex}30, transparent)`,
              }}
              aria-hidden
            />
            {/* dim overlay while scanning */}
            <div className="pointer-events-none absolute inset-0 bg-zinc-950/40" aria-hidden />
          </>
        )}

        {/* AFTER state — staggered reveal */}
        {isAfter && (
          <div>
            {/* success badge */}
            <div className={`mb-3 inline-flex animate-badge-slide items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${scene.bgChip} ${scene.ringChip}`}>
              <span>{scene.emoji}</span>
              <span className={scene.accent}>{scene.tool}</span>
              <Check className={`h-3 w-3 ${scene.accent}`} strokeWidth={2.5} />
            </div>

            {scene.after.map((line, li) => (
              <div
                key={li}
                className="transition-all duration-200"
                style={{
                  opacity: li < reveal ? 1 : 0,
                  transform: li < reveal ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                <RenderAfterLine line={line} accentHex={scene.accentHex} />
              </div>
            ))}

            {/* stat pill */}
            {reveal >= scene.after.length && (
              <div className="mt-3 animate-badge-slide">
                <span className={`inline-flex items-center gap-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold ${scene.accent}`}>
                  <Zap className="h-3 w-3" strokeWidth={2} aria-hidden />
                  {scene.stat}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div className="h-[3px] w-full bg-zinc-800/70">
        {isAfter && (
          <div
            key={progKey}
            className="h-full animate-progress-fill"
            style={{
              background: `linear-gradient(90deg, ${scene.accentHex}cc, ${scene.accentHex}, ${scene.accentHex}cc)`,
              boxShadow: `0 0 8px 1px ${scene.accentHex}60`,
            }}
          />
        )}
      </div>

      {/* ── Bottom CTA row ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-t border-zinc-800/50 bg-zinc-900/30 px-4 py-3">
        {/* Left: current tool full info */}
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base ring-1 ${scene.bgChip} ${scene.ringChip}`}
            aria-hidden
          >
            {scene.emoji}
          </span>
          <div className="min-w-0">
            <p className={`text-[12px] font-bold leading-tight truncate ${scene.accent}`}>{scene.tool}</p>
            <p className="text-[10px] text-zinc-500 leading-tight">100% client-side · free</p>
          </div>
        </div>

        {/* Right: Open tool link */}
        <Link
          href={scene.href}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold ring-1 transition-all hover:opacity-90 active:scale-95 ${scene.bgChip} ${scene.ringChip} ${scene.accent}`}
        >
          Open tool
          <ChevronRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/* ─── Filmstrip carousel ──────────────────────────────────────── */
function Filmstrip({
  scenes, idx, scene, onJump,
}: {
  scenes: Scene[];
  idx: number;
  scene: Scene;
  onJump: (i: number) => void;
}) {
  const n = scenes.length;
  const VISIBLE = 5;
  const half = Math.floor(VISIBLE / 2); // 2

  /* Build array of { offset, sceneIdx } centred on current */
  const slots = Array.from({ length: VISIBLE }, (_, k) => {
    const offset = k - half;
    const sceneIdx = ((idx + offset) % n + n) % n;
    return { offset, sceneIdx };
  });

  const prevIdx = ((idx - 1) % n + n) % n;
  const nextIdx = (idx + 1) % n;

  return (
    <div className="relative flex items-center border-b border-zinc-800/60 bg-[#111111] px-3 py-2.5">
      {/* Prev arrow */}
      <button
        type="button"
        onClick={() => onJump(prevIdx)}
        aria-label="Previous tool"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Film items */}
      <div className="relative flex flex-1 items-center justify-center gap-1.5 overflow-hidden">
        {slots.map(({ offset, sceneIdx }) => {
          const s = scenes[sceneIdx];
          const isActive = offset === 0;
          const dist = Math.abs(offset);
          /* visual weight by distance */
          const opacity = isActive ? 1 : dist === 1 ? 0.5 : 0.22;
          const scale   = isActive ? 1 : dist === 1 ? 0.9 : 0.78;

          return (
            <button
              key={`${sceneIdx}-${offset}`}
              type="button"
              onClick={() => onJump(sceneIdx)}
              aria-label={`View ${s.tool}`}
              title={s.tool}
              style={{ opacity, transform: `scale(${scale})`, transformOrigin: 'center' }}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-300"
            >
              {isActive ? (
                /* Active slot: accent pill with glow */
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ring-1 transition-all duration-300 ${scene.bgChip} ${scene.ringChip}`}
                  style={{ boxShadow: `0 0 12px 2px ${scene.accentHex}30` }}
                >
                  <span aria-hidden className="text-[13px]">{s.emoji}</span>
                  <span className={scene.accent}>{s.label}</span>
                </span>
              ) : (
                /* Inactive slot: plain muted pill */
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800/50 px-2.5 py-1 text-[10.5px] font-medium text-zinc-500 ring-1 ring-zinc-700/40">
                  <span aria-hidden className="text-[12px]">{s.emoji}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              )}
            </button>
          );
        })}

        {/* Fade-out edge masks so items bleed away */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#111111] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#111111] to-transparent" aria-hidden />
      </div>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => onJump(nextIdx)}
        aria-label="Next tool"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── Window chrome ───────────────────────────────────────────── */
function Chrome({ file, accent, animated = false }: { file: string; accent: string; animated?: boolean }) {
  return (
    <div className={`flex items-center gap-2 border-b border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 ${animated ? 'relative overflow-hidden' : ''}`}>
      {animated && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent bg-[length:200%_100%] animate-hero-title-shimmer"
          aria-hidden
        />
      )}
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className={`ml-2 font-mono text-[10.5px] transition-colors duration-300 ${accent}`}>{file}</span>
    </div>
  );
}

/* ─── Render BEFORE lines ─────────────────────────────────────── */
function RenderLines({ lines }: { lines: Line[] }) {
  return (
    <>
      {lines.map((line, li) => (
        <div key={li} className="flex">
          {/* line number */}
          <span className="mr-4 select-none text-[10px] text-zinc-700 w-4 shrink-0 text-right pt-px">
            {li + 1}
          </span>
          <span>
            {line.length === 0
              ? <br />
              : line.map((p, pi) => (
                <span
                  key={pi}
                  className={[
                    p.c ?? 'text-zinc-300',
                    p.pulse ? 'rounded bg-rose-500/20 px-0.5 animate-hero-sensitive-pulse' : '',
                  ].join(' ')}
                >
                  {p.t}
                </span>
              ))
            }
          </span>
        </div>
      ))}
    </>
  );
}

/* ─── Render AFTER line (with glow) ──────────────────────────── */
function RenderAfterLine({ line, accentHex }: { line: Line; accentHex: string }) {
  return (
    <div className="flex">
      <span className="mr-4 select-none text-[10px] text-zinc-700 w-4 shrink-0 text-right pt-px" aria-hidden>·</span>
      <span>
        {line.length === 0
          ? <br />
          : line.map((p, pi) => (
            <span
              key={pi}
              className={[
                p.c ?? 'text-zinc-300',
                p.glow ? 'rounded px-0.5 ring-1' : '',
              ].join(' ')}
              style={p.glow ? {
                background: `${accentHex}12`,
                boxShadow: `0 0 0 1px ${accentHex}30`,
              } : undefined}
            >
              {p.t}
            </span>
          ))
        }
      </span>
    </div>
  );
}

/* ─── Trust / stat footer ─────────────────────────────────────── */
function Trust({ text, accent }: { text: string; accent: string }) {
  return (
    <p className={`mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold ${accent}`}>
      <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} aria-hidden />
      {text}
    </p>
  );
}
