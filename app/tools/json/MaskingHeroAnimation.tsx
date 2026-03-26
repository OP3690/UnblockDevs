'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Sparkles, Zap } from 'lucide-react';

type Phase = {
  href: string;
  name: string;
  subtitle: string;
  tag: string;
  before: string[];
  after: string[];
  accent: string;
  glow: string;
  glowRing: string;
  afterPanel: string;
  afterLabel: string;
  afterText: string;
  beforeLabel: string;
  tabLabel: string;
};

const PHASES: Phase[] = [
  {
    href: '/ai-schema-masker',
    name: 'AI Schema Masker',
    subtitle: 'SQL schema safe for ChatGPT',
    tag: 'SQL',
    before: [
      'SELECT * FROM user_orders',
      '  WHERE customer_id = ?',
      '  AND status = "active"',
    ],
    after: [
      'SELECT * FROM T_00001',
      '  WHERE C_00001 = ?',
      '  AND C_00002 = "active"',
    ],
    accent: 'text-emerald-300',
    glow: 'shadow-emerald-500/20',
    glowRing: 'ring-emerald-500/30',
    afterPanel: 'border-emerald-500/40 bg-emerald-950/50',
    afterLabel: 'text-emerald-300',
    afterText: 'text-emerald-100',
    beforeLabel: 'text-rose-300',
    tabLabel: 'SQL',
  },
  {
    href: '/code-prompt-shield',
    name: 'Code Prompt Shield',
    subtitle: 'API secrets scrubbed before AI',
    tag: 'Code',
    before: [
      'const API_KEY = "sk_live_8f2k…"',
      'const DB_URL = "postgres://prod"',
      'Authorization: Bearer <token>',
    ],
    after: [
      'const V_00001 = "••••••••••••"',
      'const V_00002 = "postgres://…"',
      'Authorization: Bearer ••••••',
    ],
    accent: 'text-amber-300',
    glow: 'shadow-amber-500/15',
    glowRing: 'ring-amber-500/30',
    afterPanel: 'border-amber-500/40 bg-amber-950/50',
    afterLabel: 'text-amber-300',
    afterText: 'text-amber-100',
    beforeLabel: 'text-rose-300',
    tabLabel: 'Code',
  },
  {
    href: '/json-prompt-shield',
    name: 'JSON Prompt Shield',
    subtitle: 'JSON keys & values abstracted',
    tag: 'JSON',
    before: [
      '{ "apiKey": "pk_live_secret",',
      '  "user": "alice@corp.com",',
      '  "role": "admin" }',
    ],
    after: [
      '{ "K_00001": "S_00001",',
      '  "K_00002": "S_00002",',
      '  "K_00003": "S_00003" }',
    ],
    accent: 'text-violet-300',
    glow: 'shadow-violet-500/20',
    glowRing: 'ring-violet-500/30',
    afterPanel: 'border-violet-500/40 bg-violet-950/50',
    afterLabel: 'text-violet-300',
    afterText: 'text-violet-100',
    beforeLabel: 'text-rose-300',
    tabLabel: 'JSON',
  },
];

const PHASE_MS = 5000;

export default function MaskingHeroAnimation() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0=before, 1=arrow, 2=after
  const [typed, setTyped] = useState(0);           // how many "after" lines revealed
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const phase = PHASES[phaseIdx]!;

  // detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const h = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  // cycle phases
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setPhaseIdx((i) => (i + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // animate within a phase
  useEffect(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    if (reduceMotion) { setStep(2); setTyped(phase.after.length); return; }

    setStep(0); setTyped(0);
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => { setStep(2); setTyped(1); }, 1300);
    const t3 = setTimeout(() => setTyped(2), 1750);
    const t4 = setTimeout(() => setTyped(3), 2200);
    timerRef.current = [t1, t2, t3, t4];
    return () => timerRef.current.forEach(clearTimeout);
  }, [phaseIdx, reduceMotion, phase.after.length]);

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900 shadow-2xl ring-1 ${phase.glowRing} transition-all duration-700`}
      role="region"
      aria-label="Live AI masking demo"
    >
      {/* ── window chrome ── */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-500/70" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          AI Masking Preview
        </span>
        <div className="flex gap-1">
          {PHASES.map((p, i) => (
            <button
              key={p.href}
              type="button"
              onClick={() => setPhaseIdx(i)}
              aria-label={`Switch to ${p.tabLabel} demo`}
              className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold transition-all ${
                i === phaseIdx
                  ? `${phase.accent} bg-white/10`
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {p.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* ── body ── */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* label row */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
            <Zap className="h-3 w-3 text-amber-400" />
            100% in-browser · nothing sent to servers
          </span>
        </div>

        {/* BEFORE panel */}
        <div className={`rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-3 transition-all duration-500 ${
          step >= 2 ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
        }`}>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${phase.beforeLabel}`}>
              Sensitive — unsafe to share
            </span>
          </div>
          {phase.before.map((line, i) => (
            <code key={i} className="block font-mono text-[11.5px] leading-[1.7] text-rose-100/90">
              {line}
            </code>
          ))}
        </div>

        {/* connector arrow */}
        <div className={`flex items-center justify-center gap-3 transition-all duration-400 ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}>
          <div className="h-px flex-1 bg-white/10" />
          <div className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] transition-all duration-500 ${
            step >= 1 ? 'ring-2 ring-offset-1 ring-offset-zinc-900' : ''
          } ${step >= 1 ? phase.glowRing : ''}`}>
            <Shield className={`h-4 w-4 ${phase.accent}`} strokeWidth={2.5} aria-hidden />
          </div>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* AFTER panel */}
        <div className={`rounded-xl border px-3.5 py-3 ${phase.afterPanel} transition-all duration-500 ${
          step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${phase.afterLabel}`}>
              Masked — safe for AI
            </span>
            <Sparkles className={`ml-auto h-3 w-3 ${phase.afterLabel}`} aria-hidden />
          </div>
          {phase.after.map((line, i) => (
            <code
              key={i}
              className={`block font-mono text-[11.5px] leading-[1.7] transition-all duration-300 ${phase.afterText} ${
                typed > i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {line}
            </code>
          ))}
        </div>
      </div>

      {/* ── footer CTA ── */}
      <div className="border-t border-white/[0.07] px-4 py-3">
        <div className="mb-0.5 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-white">{phase.name}</p>
          <span className="font-mono text-[10px] text-zinc-500">{phase.subtitle}</span>
        </div>
        <Link
          href={phase.href}
          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 py-2 text-[13px] font-semibold text-zinc-900 transition-all hover:bg-white hover:shadow-lg hover:shadow-black/30`}
        >
          Try {phase.name}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {/* progress bar */}
      {!reduceMotion && (
        <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
          <div
            key={phaseIdx}
            className={`h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[progress_5s_linear_forwards]`}
            style={{
              animation: `progress ${PHASE_MS}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}
