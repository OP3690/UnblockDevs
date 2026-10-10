'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const PLATFORMS = [
  { label: 'Instagram', emoji: '📸', color: '#E1306C', bg: 'bg-pink-500',   avg: '2h 27m' },
  { label: 'YouTube',   emoji: '▶',  color: '#FF0000', bg: 'bg-red-500',    avg: '1h 3m'  },
  { label: 'TikTok',   emoji: '🎵', color: '#69C9D0', bg: 'bg-cyan-400',   avg: '1h 38m' },
  { label: 'Facebook',  emoji: '👍', color: '#1877F2', bg: 'bg-blue-600',   avg: '58m'    },
  { label: 'Twitter',   emoji: '𝕏',  color: '#aaaaaa', bg: 'bg-gray-500',   avg: '34m'    },
];

const TOTAL_DAYS_PER_YEAR = 37; // avg ~6.7h/day on social media × 365 / 3600 / 24 ≈ 37 days

function AnimatedCounter({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function SocialMediaViralBanner() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-950 overflow-hidden relative">
      {/* Subtle glow blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E1306C, transparent)' }} />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

          {/* Left: the hook */}
          <div className="flex-1 min-w-0">
            {/* Warning badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-1.5 text-[11px] font-bold text-red-400 uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              This might shock you
            </div>

            <h2 className="text-[clamp(1.7rem,3.5vw,2.8rem)] font-black leading-[1.08] tracking-tight text-white mb-4">
              You&apos;ve wasted{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a855f7, #3b82f6)' }}>
                <AnimatedCounter target={TOTAL_DAYS_PER_YEAR} />&nbsp;days
              </span>
              <br />
              <span className="text-zinc-300">on social media this year.</span>
            </h2>

            <p className="text-zinc-400 text-[14px] leading-relaxed max-w-md mb-6">
              The average person spends <strong className="text-white">6+ hours/day</strong> across Instagram, YouTube, TikTok,
              Facebook &amp; Twitter. Upload your own data export and see the exact number for <em>you</em>.
            </p>

            {/* Platform strip */}
            <div className="flex flex-wrap gap-2 mb-7">
              {PLATFORMS.map(p => (
                <div key={p.label}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
                  <span className="text-sm leading-none">{p.emoji}</span>
                  <span>{p.label}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50 font-normal">{p.avg}/day avg</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/social-media-time-analyzer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-pink-500/30"
                style={{ background: 'linear-gradient(135deg, #E1306C, #a855f7, #3b82f6)' }}
              >
                Find out how many days <em>you</em> wasted
                <span className="text-base">→</span>
              </Link>
              <span className="text-zinc-500 text-xs">100% private · runs in your browser · no upload</span>
            </div>
          </div>

          {/* Right: visual card stack */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="relative">
              {/* Back cards */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/3 rotate-3 scale-95" />
              <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/3 -rotate-2 scale-97" />

              {/* Main stat card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Your social media bill</p>

                <div className="space-y-3">
                  {PLATFORMS.map(p => (
                    <div key={p.label} className="flex items-center gap-3">
                      <span className="text-lg leading-none w-6 text-center">{p.emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-zinc-400 mb-1">
                          <span>{p.label}</span>
                          <span style={{ color: p.color }}>{p.avg}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full transition-all"
                            style={{
                              width: p.label === 'Instagram' ? '76%'
                                : p.label === 'YouTube' ? '52%'
                                : p.label === 'TikTok' ? '63%'
                                : p.label === 'Facebook' ? '42%'
                                : '28%',
                              background: p.color,
                              opacity: 0.7,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/8 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Per year, that&apos;s</p>
                    <p className="text-3xl font-black text-white tabular-nums">
                      <AnimatedCounter target={TOTAL_DAYS_PER_YEAR} /> <span className="text-lg font-bold text-zinc-400">days</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 mb-0.5">In 10 years</p>
                    <p className="text-xl font-black tabular-nums"
                      style={{ color: '#f472b6' }}>
                      <AnimatedCounter target={TOTAL_DAYS_PER_YEAR * 10} /> <span className="text-sm font-bold text-zinc-400">days</span>
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-600 mt-3">* Global average. Your number could be higher.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
