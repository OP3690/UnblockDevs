import Link from 'next/link';
import { LayoutGrid, ShieldCheck, Lock, Zap, Globe, ChevronRight } from 'lucide-react';
import HomeHeroCodePreview from '@/components/home/HomeHeroCodePreview';
import HomeHeroCtaRow from '@/components/home/HomeHeroCtaRow';

export default function HomeServerHero() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white" aria-labelledby="home-hero-heading">
        {/* Top accent gradient bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" aria-hidden />

        {/* Background radial glow blobs */}
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-emerald-100/70 blur-[80px]" />
          <div className="absolute -right-28 -top-20 h-[380px] w-[380px] rounded-full bg-sky-100/50 blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 h-[260px] w-[340px] -translate-x-1/2 rounded-full bg-violet-100/30 blur-[60px]" />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:px-8 pb-12 pt-10 sm:gap-14 sm:pb-16 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-16 lg:pt-14">

          {/* ── Left: copy ─────────────────────────────────── */}
          <div className="min-w-0">

            {/* Trust badges row */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[11px] font-semibold text-emerald-800">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
                100% client-side
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 font-mono text-[11px] font-semibold text-violet-700">
                <Globe className="h-3 w-3" aria-hidden />
                GDPR-safe
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-zinc-600 shadow-sm">
                No signup
              </div>
            </div>

            {/* Headline */}
            <h1
              id="home-hero-heading"
              className="text-[clamp(2.3rem,4.2vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-zinc-900"
            >
              60+ tools you keep Googling.
              <br />
              All here.{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                Paste, Fix and Go.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-4 max-w-[32rem] text-[15px] leading-relaxed text-zinc-500 text-pretty">
              JSON formatter, JWT decoder, cURL converter, SQL formatter, regex tester, and 55 more —
              all free, all in your browser.{' '}
              <strong className="font-semibold text-zinc-700">Nothing ever leaves your machine.</strong>
            </p>

            {/* Tool quick-links */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                { label: 'JSON Formatter',  href: '/json-formatter',   color: 'text-amber-700  bg-amber-50  border-amber-200  hover:border-amber-300'  },
                { label: 'JWT Decoder',      href: '/jwt-decoder',      color: 'text-violet-700 bg-violet-50 border-violet-200 hover:border-violet-300' },
                { label: 'cURL Converter',   href: '/curl-converter',   color: 'text-blue-700   bg-blue-50   border-blue-200   hover:border-blue-300'   },
                { label: 'Regex Tester',     href: '/regex-tester',     color: 'text-rose-700   bg-rose-50   border-rose-200   hover:border-rose-300'   },
                { label: 'SQL Formatter',    href: '/sql-formatter',    color: 'text-sky-700    bg-sky-50    border-sky-200    hover:border-sky-300'    },
                { label: 'AI Schema Masker', href: '/ai-schema-masker', color: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-300' },
              ].map(({ label, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors ${color}`}
                >
                  {label}
                  <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <HomeHeroCtaRow />

            {/* Compact trust row — replaces big card badges */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                No signup needed
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <Lock className="h-3.5 w-3.5 shrink-0 text-sky-600" aria-hidden />
                Zero data stored
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <Zap className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden />
                Free forever
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                <span className="font-bold text-emerald-600" aria-hidden>0</span>
                bytes sent to any server
              </span>
            </div>

            {/* Mobile tool grid — shown instead of code preview on sm/md */}
            <div className="mt-8 grid grid-cols-4 gap-2 lg:hidden" aria-label="Available tools">
              {[
                { emoji: '{}',  label: 'JSON Format', href: '/json-formatter'   },
                { emoji: '🔐', label: 'JWT Decode',   href: '/jwt-decoder'      },
                { emoji: '🌐', label: 'CORS Tester',  href: '/cors-tester'      },
                { emoji: '⚡', label: 'cURL Convert', href: '/curl-converter'   },
                { emoji: '🗄️', label: 'SQL Format',   href: '/sql-formatter'    },
                { emoji: '🔍', label: 'Regex Test',   href: '/regex-tester'     },
                { emoji: '🤖', label: 'AI Masker',    href: '/ai-schema-masker' },
                { emoji: '📝', label: 'Markdown',     href: '/markdown-preview' },
              ].map(({ emoji, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-100 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                  <span className="text-xl" aria-hidden>{emoji}</span>
                  <span className="text-[10px] font-medium leading-tight text-zinc-500">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: animated code preview — desktop only ── */}
          <div className="hidden min-w-0 lg:block">
            <HomeHeroCodePreview />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-4">
          {[
            { n: '60+',   l: 'Free developer tools'   },
            { n: '100%',  l: 'Client-side · GDPR-safe' },
            { n: '0',     l: 'Bytes sent to servers'   },
            { n: 'Free',  l: 'No account · no limits'  },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`border-zinc-200 px-6 py-5 text-center ${
                i < 3 ? 'max-sm:[&:nth-child(-n+2)]:border-b sm:border-r' : ''
              }`}
            >
              <span className="block text-[22px] font-bold tracking-[-0.02em] text-zinc-900">{s.n}</span>
              <span className="mt-0.5 block text-[13px] text-zinc-500">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
