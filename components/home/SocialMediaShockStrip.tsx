'use client';

import Link from 'next/link';

const PLATFORMS = [
  { emoji: '📸', label: 'Instagram', avg: '2h 27m' },
  { emoji: '▶',  label: 'YouTube',   avg: '1h 3m'  },
  { emoji: '🎵', label: 'TikTok',    avg: '1h 38m' },
  { emoji: '👍', label: 'Facebook',  avg: '58m'    },
  { emoji: '𝕏',  label: 'Twitter',   avg: '34m'    },
];

export default function SocialMediaShockStrip() {
  return (
    <div className="relative overflow-hidden border-b border-zinc-200 bg-zinc-950">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute -left-16 top-0 h-full w-64 opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #E1306C, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-full w-64 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #a855f7, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">

          {/* Shock badge + headline */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              This might shock you
            </span>
            <p className="text-sm font-bold leading-tight text-white sm:text-[15px]">
              You&apos;ve wasted{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #f472b6, #a855f7, #60a5fa)' }}
              >
                37 days
              </span>
              {' '}on social media this year.
            </p>

            {/* Platform chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {PLATFORMS.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/55 whitespace-nowrap"
                >
                  <span className="leading-none">{p.emoji}</span>
                  <span className="text-white/35">{p.avg}</span>
                </span>
              ))}
              <span className="text-[10.5px] text-zinc-600">avg/day</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/social-media-time-analyzer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-pink-500/25 sm:text-[13px]"
            style={{ background: 'linear-gradient(135deg, #E1306C, #a855f7 60%, #3b82f6)' }}
          >
            Find out how many days <em>you</em> wasted →
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-1 text-[10.5px] text-zinc-600 sm:mt-0.5">
          100% private · runs in your browser · no upload
        </p>
      </div>
    </div>
  );
}
