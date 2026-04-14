'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';

/* ─── reduced-motion hook ─────────────────────────────────────── */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

/* ─── Scene definitions ───────────────────────────────────────── */
type Scene = {
  id: string;
  file: string;
  tool: string;
  toolEmoji: string;
  href: string;
  accent: string;         // Tailwind text color for accents
  accentBg: string;       // bg for badge
  accentRing: string;     // ring for badge
  trust: string;          // footer line
  beforeLines: Line[];
  afterLines: Line[];
};

type Line = {
  parts: Part[];
};

type Part = {
  text: string;
  cls?: string;           // extra classes
  pulse?: boolean;        // danger pulse
  token?: boolean;        // safe-token highlight
};

const SCENES: Scene[] = [
  /* ── 1. AI Schema Masker ────────────────────────────────────── */
  {
    id: 'schema',
    file: 'query.sql',
    tool: 'AI Schema Masker',
    toolEmoji: '🛡️',
    href: '/ai-schema-masker',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/15',
    accentRing: 'ring-emerald-400/40',
    trust: 'Schema never leaves your browser',
    beforeLines: [
      { parts: [{ text: '// Before: raw SQL — contains PII ⚠️', cls: 'text-zinc-500' }] },
      { parts: [
        { text: 'SELECT', cls: 'text-red-400' }, { text: ' ' },
        { text: 'u.customer_name, u.email, u.credit_score', cls: 'text-zinc-100', pulse: true },
      ]},
      { parts: [
        { text: 'FROM', cls: 'text-red-400' }, { text: ' ' },
        { text: 'banking.customer_details', cls: 'text-emerald-400', pulse: true }, { text: ' u', cls: 'text-zinc-500' },
      ]},
      { parts: [
        { text: 'WHERE', cls: 'text-red-400' }, { text: ' u.status = ' },
        { text: "'ACTIVE'", cls: 'text-amber-300' }, { text: ';', cls: 'text-amber-300' },
      ]},
    ],
    afterLines: [
      { parts: [{ text: '// After: masked — safe for any AI', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [
        { text: 'SELECT', cls: 'text-red-400' }, { text: ' ' },
        { text: 'C_00001', cls: 'text-sky-400', token: true }, { text: ', ' },
        { text: 'C_00002', cls: 'text-sky-400', token: true }, { text: ', ' },
        { text: 'C_00003', cls: 'text-sky-400', token: true },
      ]},
      { parts: [
        { text: 'FROM', cls: 'text-red-400' }, { text: ' ' },
        { text: 'T_00001', cls: 'text-violet-400', token: true }, { text: '.', cls: 'text-zinc-500' },
        { text: 'A_00001', cls: 'text-sky-400', token: true },
      ]},
      { parts: [
        { text: 'WHERE', cls: 'text-red-400' }, { text: ' ' },
        { text: 'C_00001', cls: 'text-sky-400', token: true }, { text: ' = ' },
        { text: "'S_00001'", cls: 'text-emerald-400' }, { text: ';', cls: 'text-emerald-400' },
      ]},
    ],
  },

  /* ── 2. JSON Formatter ──────────────────────────────────────── */
  {
    id: 'json',
    file: 'api-response.json',
    tool: 'JSON Formatter',
    toolEmoji: '{ }',
    href: '/json-formatter',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500/15',
    accentRing: 'ring-cyan-400/40',
    trust: 'Runs entirely in your browser',
    beforeLines: [
      { parts: [{ text: '// Before: minified API response', cls: 'text-zinc-500' }] },
      { parts: [{ text: '{"user":{"id":1,"name":"Alice","email":', cls: 'text-amber-300' }] },
      { parts: [{ text: '"alice@acme.io","role":"admin","plan":', cls: 'text-amber-300' }] },
      { parts: [{ text: '"pro"},"tokens":{"access":"eyJh...","refresh":', cls: 'text-amber-300' }] },
      { parts: [{ text: '"dGh0..."}}', cls: 'text-amber-300' }] },
    ],
    afterLines: [
      { parts: [{ text: '// After: beautifully formatted ✨', cls: 'text-zinc-500' }] },
      { parts: [{ text: '{', cls: 'text-zinc-300' }] },
      { parts: [
        { text: '  ' }, { text: '"user"', cls: 'text-sky-300' }, { text: ': {', cls: 'text-zinc-300' },
      ]},
      { parts: [
        { text: '    ' }, { text: '"id"', cls: 'text-sky-300' }, { text: ': ' }, { text: '1', cls: 'text-violet-400' }, { text: ',' },
      ]},
      { parts: [
        { text: '    ' }, { text: '"name"', cls: 'text-sky-300' }, { text: ': ' }, { text: '"Alice"', cls: 'text-emerald-400' }, { text: ',' },
      ]},
      { parts: [
        { text: '    ' }, { text: '"role"', cls: 'text-sky-300' }, { text: ': ' }, { text: '"admin"', cls: 'text-emerald-400' },
      ]},
      { parts: [{ text: '  }', cls: 'text-zinc-300' }] },
      { parts: [{ text: '}', cls: 'text-zinc-300' }] },
    ],
  },

  /* ── 3. JWT Decoder ─────────────────────────────────────────── */
  {
    id: 'jwt',
    file: 'auth-token.jwt',
    tool: 'JWT Decoder',
    toolEmoji: '🔑',
    href: '/jwt-decoder',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/15',
    accentRing: 'ring-amber-400/40',
    trust: 'Token never sent anywhere',
    beforeLines: [
      { parts: [{ text: '// Raw JWT — looks like gibberish', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [
        { text: 'eyJhbGciOiJIUzI1NiIs', cls: 'text-red-400' },
        { text: '.', cls: 'text-zinc-500' },
        { text: 'eyJ1c2VySWQiOjQ', cls: 'text-amber-300' },
        { text: '.', cls: 'text-zinc-500' },
        { text: 'SflKxw...', cls: 'text-violet-400' },
      ]},
    ],
    afterLines: [
      { parts: [{ text: '// Decoded — instant clarity ✓', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [{ text: 'HEADER', cls: 'text-red-400 font-bold' }] },
      { parts: [
        { text: '  alg', cls: 'text-sky-300' }, { text: '  → ' }, { text: 'HS256', cls: 'text-emerald-400', token: true },
      ]},
      { parts: [{ text: '' }] },
      { parts: [{ text: 'PAYLOAD', cls: 'text-amber-400 font-bold' }] },
      { parts: [
        { text: '  userId', cls: 'text-sky-300' }, { text: ' → ' }, { text: '42', cls: 'text-violet-400', token: true },
      ]},
      { parts: [
        { text: '  role  ', cls: 'text-sky-300' }, { text: ' → ' }, { text: '"admin"', cls: 'text-emerald-400', token: true },
      ]},
      { parts: [
        { text: '  exp   ', cls: 'text-sky-300' }, { text: ' → ' }, { text: '2026-12-31', cls: 'text-amber-400', token: true },
      ]},
    ],
  },

  /* ── 4. Code Prompt Shield ──────────────────────────────────── */
  {
    id: 'code',
    file: 'config.ts',
    tool: 'Code Prompt Shield',
    toolEmoji: '🔐',
    href: '/code-prompt-shield',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/15',
    accentRing: 'ring-violet-400/40',
    trust: 'Secrets stay on your machine',
    beforeLines: [
      { parts: [{ text: '// Before: real secrets exposed ⚠️', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [
        { text: 'const ', cls: 'text-red-400' }, { text: 'STRIPE_KEY', cls: 'text-zinc-100' }, { text: ' = ' },
        { text: '"sk_live_9xKZ..."', cls: 'text-rose-400', pulse: true },
      ]},
      { parts: [
        { text: 'const ', cls: 'text-red-400' }, { text: 'DB_URL', cls: 'text-zinc-100' }, { text: ' = ' },
        { text: '"postgres://admin:pwd@host/db"', cls: 'text-rose-400', pulse: true },
      ]},
      { parts: [
        { text: 'const ', cls: 'text-red-400' }, { text: 'API_KEY', cls: 'text-zinc-100' }, { text: ' = ' },
        { text: '"AIzaSy_abc123..."', cls: 'text-rose-400', pulse: true },
      ]},
    ],
    afterLines: [
      { parts: [{ text: '// After: safe to share with AI ✓', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [
        { text: 'const ', cls: 'text-sky-400' }, { text: 'SECRET_1', cls: 'text-zinc-100', token: true }, { text: ' = ' },
        { text: '"[MASKED]"', cls: 'text-violet-400', token: true },
      ]},
      { parts: [
        { text: 'const ', cls: 'text-sky-400' }, { text: 'SECRET_2', cls: 'text-zinc-100', token: true }, { text: ' = ' },
        { text: '"[MASKED]"', cls: 'text-violet-400', token: true },
      ]},
      { parts: [
        { text: 'const ', cls: 'text-sky-400' }, { text: 'SECRET_3', cls: 'text-zinc-100', token: true }, { text: ' = ' },
        { text: '"[MASKED]"', cls: 'text-violet-400', token: true },
      ]},
      { parts: [{ text: '' }] },
      { parts: [
        { text: '// 3 secrets masked · 18 languages', cls: 'text-emerald-500' },
      ]},
    ],
  },

  /* ── 5. cURL Converter ──────────────────────────────────────── */
  {
    id: 'curl',
    file: 'request.sh',
    tool: 'cURL Converter',
    toolEmoji: '⚡',
    href: '/curl-converter',
    accent: 'text-sky-400',
    accentBg: 'bg-sky-500/15',
    accentRing: 'ring-sky-400/40',
    trust: 'Converts instantly, client-side',
    beforeLines: [
      { parts: [{ text: '# Input: cURL command', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [{ text: 'curl \\', cls: 'text-amber-300' }] },
      { parts: [{ text: "  -X POST 'https://api.stripe.com/v1/charges' \\", cls: 'text-zinc-100' }] },
      { parts: [{ text: "  -H 'Authorization: Bearer sk_...' \\", cls: 'text-rose-400', pulse: true }] },
      { parts: [{ text: "  -d 'amount=2000&currency=usd'", cls: 'text-zinc-400' }] },
    ],
    afterLines: [
      { parts: [{ text: '// Output: fetch() — paste & go ✓', cls: 'text-zinc-500' }] },
      { parts: [{ text: '' }] },
      { parts: [
        { text: 'const ', cls: 'text-red-400' }, { text: 'res', cls: 'text-zinc-100' }, { text: ' = ' },
        { text: 'await ', cls: 'text-red-400' }, { text: 'fetch', cls: 'text-sky-300' }, { text: '(' },
      ]},
      { parts: [{ text: "  'https://api.stripe.com/v1/charges',", cls: 'text-emerald-400' }] },
      { parts: [{ text: '  { method: ', cls: 'text-zinc-300' }, { text: "'POST'", cls: 'text-amber-300' }, { text: ',', cls: 'text-zinc-300' }]},
      { parts: [
        { text: '    headers: { ', cls: 'text-zinc-300' },
        { text: 'Authorization', cls: 'text-sky-300', token: true },
        { text: ': ', cls: 'text-zinc-300' },
        { text: "'Bearer sk_...'", cls: 'text-violet-400' },
        { text: ' }', cls: 'text-zinc-300' },
      ]},
      { parts: [{ text: '  }', cls: 'text-zinc-300' }, { text: ');' }] },
    ],
  },
];

/* ─── Phase machine ───────────────────────────────────────────── */
type Phase = 'before' | 'typing' | 'after' | 'exit';

const BEFORE_MS  = 1800;
const TYPING_MS  = 50;   // ms per char (typing speed)
const AFTER_MS   = 4200;
const EXIT_MS    = 400;

/* ─── Main export ─────────────────────────────────────────────── */
export default function HomeHeroCodePreview() {
  const reduced = usePrefersReducedMotion();
  const s = SCENES[0];

  if (reduced) {
    return (
      <StaticPreview scene={s} />
    );
  }

  return <AnimatedShowcase />;
}

/* ─── Static fallback ─────────────────────────────────────────── */
function StaticPreview({ scene }: { scene: Scene }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
      <Chrome file={scene.file} accent={scene.accent} />
      <div className="p-5 font-mono text-[13px] leading-[1.8]">
        <CodeLines lines={scene.afterLines} />
        <FooterTrust trust={scene.trust} accent={scene.accent} />
      </div>
    </div>
  );
}

/* ─── Animated showcase ───────────────────────────────────────── */
function AnimatedShowcase() {
  const [sceneIdx, setSceneIdx]   = useState(0);
  const [phase, setPhase]         = useState<Phase>('before');
  const [typed, setTyped]         = useState(0);
  const [visible, setVisible]     = useState(true);

  const scene = SCENES[sceneIdx];
  const typingText = `// Using ${scene.tool}…`;

  const nextScene = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
      setPhase('before');
      setTyped(0);
      setVisible(true);
    }, EXIT_MS);
  }, []);

  /* Phase timer */
  useEffect(() => {
    if (phase === 'before') {
      const t = setTimeout(() => setPhase('typing'), BEFORE_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'after') {
      const t = setTimeout(nextScene, AFTER_MS);
      return () => clearTimeout(t);
    }
  }, [phase, nextScene]);

  /* Typing */
  useEffect(() => {
    if (phase !== 'typing') return;
    if (typed >= typingText.length) {
      const t = setTimeout(() => setPhase('after'), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), TYPING_MS);
    return () => clearTimeout(t);
  }, [phase, typed, typingText.length]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-zinc-900/50"
      role="img"
      aria-label="Animated demo cycling through UnblockDevs tools"
    >
      {/* Window chrome */}
      <Chrome file={scene.file} accent={scene.accent} animated />

      {/* Code body */}
      <div
        className="relative min-h-[300px] p-5 font-mono text-[13px] leading-[1.8] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* BEFORE */}
        {(phase === 'before' || phase === 'typing') && (
          <div>
            <CodeLines lines={scene.beforeLines} />
            {phase === 'before' && (
              <div className="mt-1">
                <span className="animate-hero-cursor-blink text-emerald-400">▍</span>
              </div>
            )}
          </div>
        )}

        {/* TYPING line */}
        {phase === 'typing' && (
          <div className={`mt-4 text-[13px] leading-relaxed`}>
            <span className={scene.accent}>
              {typingText.slice(0, typed)}
            </span>
            <span className="animate-hero-cursor-blink text-emerald-400">▍</span>
          </div>
        )}

        {/* AFTER */}
        {phase === 'after' && (
          <div className="animate-hero-after-sql-in">
            {/* Tool badge */}
            <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${scene.accentBg} ${scene.accentRing}`}>
              <span>{scene.toolEmoji}</span>
              <span className={scene.accent}>{scene.tool}</span>
              <Check className={`h-3 w-3 ${scene.accent}`} strokeWidth={2.5} />
            </div>
            <CodeLines lines={scene.afterLines} showTokenGlow />
            <FooterTrust trust={scene.trust} accent={scene.accent} href={scene.href} />
          </div>
        )}
      </div>

      {/* Progress dots + tool pills */}
      <div className="border-t border-zinc-800/60 bg-zinc-950 px-5 py-3">
        {/* Dot indicators */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setSceneIdx(i); setPhase('before'); setTyped(0); setVisible(true); }}
                aria-label={`View ${s.tool} demo`}
                className="group relative flex items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === sceneIdx
                      ? 'w-8 bg-emerald-400'
                      : 'w-1.5 bg-zinc-700 group-hover:bg-zinc-500'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Current tool pill */}
          <Link
            href={scene.href}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 transition-all hover:opacity-90 ${scene.accentBg} ${scene.accentRing}`}
          >
            <span>{scene.toolEmoji}</span>
            <span className={scene.accent}>{scene.tool}</span>
            <ChevronRight className={`h-3 w-3 ${scene.accent}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Chrome bar ──────────────────────────────────────────────── */
function Chrome({ file, accent, animated = false }: { file: string; accent: string; animated?: boolean }) {
  return (
    <div className={`flex items-center gap-2 border-b border-zinc-800 bg-[#1C1C1C] px-4 py-3 ${animated ? 'relative overflow-hidden' : ''}`}>
      {animated && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent bg-[length:200%_100%] animate-hero-title-shimmer"
          aria-hidden
        />
      )}
      <span className="relative flex gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </span>
      <span className={`relative ml-2 font-mono text-[11px] transition-colors duration-300 ${accent}`}>{file}</span>
    </div>
  );
}

/* ─── Render code lines ───────────────────────────────────────── */
function CodeLines({ lines, showTokenGlow = false }: { lines: Line[]; showTokenGlow?: boolean }) {
  return (
    <>
      {lines.map((line, li) => (
        <div key={li}>
          {line.parts.length === 0 || (line.parts.length === 1 && line.parts[0].text === '') ? (
            <br />
          ) : (
            line.parts.map((part, pi) => {
              const base = part.cls ?? 'text-zinc-300';
              const pulse = part.pulse
                ? 'rounded bg-rose-500/20 animate-hero-sensitive-pulse px-0.5'
                : '';
              const glow = showTokenGlow && part.token
                ? 'rounded bg-emerald-500/10 ring-1 ring-emerald-500/20 px-0.5'
                : '';
              return (
                <span key={pi} className={`${base} ${pulse} ${glow}`}>
                  {part.text}
                </span>
              );
            })
          )}
        </div>
      ))}
    </>
  );
}

/* ─── Footer trust pill ───────────────────────────────────────── */
function FooterTrust({ trust, accent, href }: { trust: string; accent: string; href?: string }) {
  const inner = (
    <span className={`inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs ${accent} mt-4 ${href ? 'hover:bg-emerald-500/15 transition-colors' : ''}`}>
      <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} aria-hidden />
      {trust}
    </span>
  );
  if (href) {
    return <Link href={href} className="block">{inner}</Link>;
  }
  return <p className="block">{inner}</p>;
}
