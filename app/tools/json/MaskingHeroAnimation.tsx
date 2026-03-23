'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

type Phase = {
  href: string;
  name: string;
  subtitle: string;
  before: string;
  after: string;
  accent: string;
  glow: string;
  afterPanel: string;
  afterLabel: string;
  afterText: string;
};

const PHASES: Phase[] = [
  {
    href: '/ai-schema-masker',
    name: 'AI Schema Masker',
    subtitle: 'SQL & MySQL schema → safe for ChatGPT',
    before: 'SELECT * FROM user_orders WHERE customer_id = ?',
    after: 'SELECT * FROM T_00001 WHERE C_00001 = ?',
    accent: 'text-emerald-300',
    glow: 'shadow-emerald-500/25',
    afterPanel: 'border-emerald-500/35 bg-emerald-950/35',
    afterLabel: 'text-emerald-300/90',
    afterText: 'text-emerald-100/95',
  },
  {
    href: '/code-prompt-shield',
    name: 'Code Prompt Shield',
    subtitle: 'API keys & secrets in code',
    before: 'headers["Authorization"] = "Bearer sk_live_…"',
    after: 'headers["V_00001"] = "Bearer ••••••••"',
    accent: 'text-amber-300',
    glow: 'shadow-amber-500/20',
    afterPanel: 'border-amber-500/35 bg-amber-950/40',
    afterLabel: 'text-amber-300/90',
    afterText: 'text-amber-100/95',
  },
  {
    href: '/json-prompt-shield',
    name: 'JSON Prompt Shield',
    subtitle: 'Keys & string values abstracted',
    before: '{"apiKey":"pk_secret","user":"alice"}',
    after: '{"K_00001":"S_00001","K_00002":"S_00002"}',
    accent: 'text-violet-300',
    glow: 'shadow-violet-500/25',
    afterPanel: 'border-violet-500/35 bg-violet-950/40',
    afterLabel: 'text-violet-300/90',
    afterText: 'text-violet-100/95',
  },
];

const PHASE_MS = 5200;
const REVEAL_CONNECT_MS = 550;
const REVEAL_AFTER_MS = 1050;

export default function MaskingHeroAnimation() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [reveal, setReveal] = useState(0); // 0: before, 1: connector, 2: after
  const [reduceMotion, setReduceMotion] = useState(false);

  const phase = PHASES[phaseIndex]!;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setReveal(2);
      return;
    }
    setReveal(0);
    const t1 = window.setTimeout(() => setReveal(1), REVEAL_CONNECT_MS);
    const t2 = window.setTimeout(() => setReveal(2), REVEAL_AFTER_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phaseIndex, reduceMotion]);

  return (
    <div
      className={`relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl backdrop-blur-md sm:min-h-[300px] sm:p-6 ${phase.glow}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="How AI masking tools work"
    >
      {/* Progress */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {reduceMotion ? (
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Choose masking tool preview">
            {PHASES.map((p, i) => (
              <button
                key={p.href}
                type="button"
                role="tab"
                aria-selected={i === phaseIndex}
                onClick={() => setPhaseIndex(i)}
                className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  i === phaseIndex
                    ? 'border-white/30 bg-white/15 text-white'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                {i === 0 ? 'SQL' : i === 1 ? 'Code' : 'JSON'}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-1.5" aria-hidden>
            {PHASES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === phaseIndex ? 'w-8 bg-white/90' : 'w-1.5 bg-white/25'
                }`}
              />
            ))}
          </div>
        )}
        <span className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${phase.accent}`}>
          {reduceMotion ? 'Preview' : 'Live preview'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center" key={phaseIndex}>
        <p className="text-center font-mono text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Before → masked
        </p>

        {/* Before */}
        <div
          className={`mt-3 rounded-xl border border-rose-500/30 bg-rose-950/40 px-3 py-3 ${
            reduceMotion
              ? 'opacity-100'
              : `transition-all duration-500 ${reveal >= 2 ? 'scale-[0.98] opacity-55' : 'scale-100 opacity-100'}`
          }`}
        >
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-rose-300/90">
            Sensitive input
          </span>
          <code className="block break-all font-mono text-[11px] leading-relaxed text-rose-100/95 sm:text-xs">
            {phase.before}
          </code>
        </div>

        {/* Connector */}
        <div
          className={`flex flex-col items-center justify-center py-2 ${
            reduceMotion ? 'opacity-100' : `transition-all duration-300 ${reveal >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 ${
              reveal >= 1 && !reduceMotion ? 'animate-hub-shield-pop' : ''
            }`}
          >
            <Shield className={`h-5 w-5 ${phase.accent}`} strokeWidth={2} aria-hidden />
          </div>
          <span className="mt-1 font-mono text-[10px] text-zinc-500">Mask in your browser</span>
        </div>

        {/* After */}
        <div
          className={`rounded-xl border px-3 py-3 ${phase.afterPanel} ${
            reduceMotion
              ? 'opacity-100'
              : `transition-all duration-500 ${reveal >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`
          }`}
        >
          <span className={`mb-1 block text-[10px] font-semibold uppercase tracking-wider ${phase.afterLabel}`}>
            Safe to paste into AI
          </span>
          <code className={`block break-all font-mono text-[11px] leading-relaxed sm:text-xs ${phase.afterText}`}>
            {phase.after}
          </code>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4" aria-live="polite">
        <p className="text-center text-sm font-semibold text-white">{phase.name}</p>
        <p className="mt-0.5 text-center text-xs text-zinc-400">{phase.subtitle}</p>
        <Link
          href={phase.href}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
        >
          Try {phase.name}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
