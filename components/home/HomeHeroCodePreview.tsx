'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const PROMO_PREFIX = 'Using ';
const PROMO_HIGHLIGHT = 'AI Schema Masker';
const PROMO_SUFFIX = ' by UnblockDevs';
const PROMO_FULL = PROMO_PREFIX + PROMO_HIGHLIGHT + PROMO_SUFFIX;
const PROMO_HIGHLIGHT_END = PROMO_PREFIX.length + PROMO_HIGHLIGHT.length;

type StoryStep = 'before' | 'promo' | 'after';

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

/** Hero demo: Before SQL (2s) → type promo on same view → masked After view (loops). */
export default function HomeHeroCodePreview() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <WindowChrome />
        <div className="p-5 font-mono text-[13px] leading-[1.8]">
          <BeforeSqlDemo showTrailingCursor={false} />
          <div className="typing-promo-wrap mt-5">
            <Link
              href="/ai-schema-masker"
              className="pointer-events-auto text-[13px] leading-relaxed text-zinc-300 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm"
            >
              <span className="text-zinc-300">Using </span>
              <span className="rounded bg-emerald-500/20 px-0.5 font-semibold text-emerald-200 ring-1 ring-emerald-400/45">
                AI Schema Masker
              </span>
              <span className="text-zinc-300"> by UnblockDevs</span>
            </Link>
          </div>
          <div className="after-sql-block mt-6">
            <AfterSqlDemo />
          </div>
          <FooterTrust />
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl"
      role="img"
      aria-label="Demo: sample SQL, then masking with AI Schema Masker, then safe masked SQL for AI."
    >
      <WindowChrome animated />
      <div className="relative min-h-[320px] p-5 font-mono text-[13px] leading-[1.8] sm:min-h-[360px]">
        <HeroCodeStory />
      </div>
    </div>
  );
}

function HeroCodeStory() {
  const [step, setStep] = useState<StoryStep>('before');
  const [cycle, setCycle] = useState(0);

  const goAfter = useCallback(() => setStep('after'), []);

  useEffect(() => {
    if (step !== 'before') return;
    const t = window.setTimeout(() => setStep('promo'), 2000);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 'after') return;
    const t = window.setTimeout(() => {
      setStep('before');
      setCycle((c) => c + 1);
    }, 6000);
    return () => window.clearTimeout(t);
  }, [step]);

  if (step === 'after') {
    return (
      <>
        <div className="after-sql-block opacity-0 animate-hero-after-sql-in">
          <AfterSqlDemo />
        </div>
        <FooterTrust />
      </>
    );
  }

  return (
    <>
      <BeforeSqlDemo showTrailingCursor={step === 'before'} />
      {step === 'promo' ? (
        <TypingPromoOnce key={cycle} onComplete={goAfter} />
      ) : null}
    </>
  );
}

function WindowChrome({ animated = false }: { animated?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 border-b border-zinc-800 bg-[#1C1C1C] px-4 py-3 ${
        animated ? 'relative overflow-hidden' : ''
      }`}
    >
      {animated ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent bg-[length:200%_100%] animate-hero-title-shimmer"
          aria-hidden
        />
      ) : null}
      <span className="relative flex gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </span>
      <span className="relative ml-2 font-mono text-[11px] text-zinc-500">ai-schema-masker.ts</span>
    </div>
  );
}

function BeforeSqlDemo({ showTrailingCursor }: { showTrailingCursor: boolean }) {
  return (
    <>
      <div>
        <span className="text-zinc-500">// Before: raw SQL sent to ChatGPT</span>
      </div>
      <div>
        <span className="text-red-400">SELECT</span>{' '}
        <span className="inline-block rounded bg-rose-500/15 px-0.5 text-zinc-100 animate-hero-sensitive-pulse">
          u.customer_name, u.mobile_number, u.email, u.credit_score
        </span>
      </div>
      <div>
        <span className="text-red-400">FROM</span>{' '}
        <span className="inline-block rounded bg-rose-500/15 text-emerald-400 animate-hero-sensitive-pulse">
          banking.customer_details
        </span>{' '}
        <span className="text-zinc-500">u</span>
      </div>
      <div>
        <span className="text-red-400">WHERE</span>{' '}
        <span className="text-zinc-100">u.transactions_status = </span>
        <span className="text-emerald-400">&apos;SUCCESS&apos;</span>
        <span className="text-emerald-400">;</span>
      </div>
      {showTrailingCursor ? (
        <div className="mt-0.5">
          <span className="animate-hero-cursor-blink text-emerald-400">▍</span>
        </div>
      ) : null}
    </>
  );
}

function AfterSqlDemo() {
  return (
    <>
      <div>
        <span className="text-zinc-500">// After: masked — safe for AI</span>
      </div>
      <br />
      <div>
        <span className="text-red-400">SELECT</span>{' '}
        <span className="text-sky-400">C_00001</span>
        <span className="text-zinc-500">, </span>
        <span className="text-sky-400">C_00002</span>
        <span className="text-zinc-500">, </span>
        <span className="text-sky-400">C_00003</span>
        <span className="text-zinc-500">, </span>
        <span className="text-sky-400">C_00004</span>
      </div>
      <div>
        <span className="text-red-400">FROM</span>{' '}
        <span className="text-violet-400">T_00001</span>
        <span className="text-zinc-500">.</span>
        <span className="text-sky-400">A_00001</span>
      </div>
      <div>
        <span className="text-red-400">WHERE</span>{' '}
        <span className="text-sky-400">C_00003</span>
        <span className="text-zinc-100"> = </span>
        <span className="text-emerald-400">&apos;S_00001&apos;</span>
        <span className="text-emerald-400">;</span>
      </div>
      <br />
      <div>
        <span className="text-zinc-500">
          // Restore original names after AI responds in{' '}
          <span className="font-semibold text-emerald-400/90">AI Schema Masker</span>
          {' by '}
          <span className="text-zinc-400">UnblockDevs</span>
        </span>
      </div>
    </>
  );
}

function renderPromoTyped(visibleLen: number) {
  if (visibleLen <= 0) return null;
  if (visibleLen <= PROMO_PREFIX.length) {
    return <span className="text-zinc-300">{PROMO_FULL.slice(0, visibleLen)}</span>;
  }
  if (visibleLen <= PROMO_HIGHLIGHT_END) {
    const hl = PROMO_HIGHLIGHT.slice(0, visibleLen - PROMO_PREFIX.length);
    return (
      <>
        <span className="text-zinc-300">{PROMO_PREFIX}</span>
        <span className="rounded bg-emerald-500/20 font-semibold text-emerald-200 ring-1 ring-emerald-400/45">{hl}</span>
      </>
    );
  }
  const rest = PROMO_SUFFIX.slice(0, visibleLen - PROMO_HIGHLIGHT_END);
  return (
    <>
      <span className="text-zinc-300">{PROMO_PREFIX}</span>
      <span className="rounded bg-emerald-500/20 font-semibold text-emerald-200 ring-1 ring-emerald-400/45">{PROMO_HIGHLIGHT}</span>
      <span className="text-zinc-300">{rest}</span>
    </>
  );
}

/** Types the promo line once, then calls onComplete (no loop). */
function TypingPromoOnce({ onComplete }: { onComplete: () => void }) {
  const [len, setLen] = useState(0);
  const firedRef = useRef(false);
  const charMs = 46;

  useEffect(() => {
    let cancelled = false;
    let tid: number | undefined;
    let i = 0;

    const clearT = () => {
      if (tid !== undefined) window.clearTimeout(tid);
      tid = undefined;
    };

    const tick = () => {
      if (cancelled) return;
      if (i < PROMO_FULL.length) {
        i += 1;
        setLen(i);
        tid = window.setTimeout(tick, charMs);
      }
    };

    tick();
    return () => {
      cancelled = true;
      clearT();
    };
  }, []);

  useEffect(() => {
    if (len !== PROMO_FULL.length || firedRef.current) return;
    firedRef.current = true;
    const t = window.setTimeout(() => onComplete(), 450);
    return () => window.clearTimeout(t);
  }, [len, onComplete]);

  const complete = len >= PROMO_FULL.length;

  return (
    <div className="typing-promo-wrap mt-5 min-h-[1.6rem] text-[13px] leading-relaxed">
      <Link
        href="/ai-schema-masker"
        tabIndex={complete ? 0 : -1}
        aria-busy={!complete}
        className="pointer-events-auto inline text-left hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm"
      >
        {renderPromoTyped(len)}
        <span className="inline-block w-[0.35em] animate-hero-cursor-blink text-emerald-400" aria-hidden>
          ▍
        </span>
      </Link>
    </div>
  );
}

function FooterTrust() {
  return (
    <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
      <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} aria-hidden />
      Schema never leaves your browser
    </p>
  );
}
