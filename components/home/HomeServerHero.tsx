import Link from 'next/link';
import { LayoutGrid, ShieldCheck, Lock, Zap, Globe } from 'lucide-react';
import HomeHeroCodePreview from '@/components/home/HomeHeroCodePreview';

export default function HomeServerHero() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-[#FAFAFA]" aria-labelledby="home-hero-heading">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:px-8 pb-14 pt-10 sm:gap-16 sm:pb-18 sm:pt-14 lg:grid-cols-2 lg:gap-20 lg:pb-[5rem] lg:pt-16">

          {/* Left: copy */}
          <div className="min-w-0">
            {/* Badges row */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 font-mono text-[11px] font-medium text-emerald-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                100% client-side
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 font-mono text-[11px] font-medium text-violet-700">
                <Globe className="h-3 w-3" aria-hidden />
                GDPR-safe
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-zinc-600">
                No signup
              </div>
            </div>

            {/* Headline */}
            <h1
              id="home-hero-heading"
              className="text-[clamp(2.1rem,3.8vw,3rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-900"
            >
              Developer tools
              <br />
              that{' '}
              <span className="text-emerald-700">respect your data</span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-zinc-500 text-pretty">
              JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and 45+ more — all free,
              all in your browser. Mask sensitive data before sending to ChatGPT. Nothing is ever uploaded to a server.
            </p>

            {/* Tool quick-links */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                { label: 'JSON Formatter', href: '/json-formatter' },
                { label: 'JWT Decoder', href: '/jwt-decoder' },
                { label: 'cURL Converter', href: '/curl-converter' },
                { label: 'CORS Tester', href: '/cors-tester' },
                { label: 'SQL Formatter', href: '/sql-formatter' },
                { label: 'AI Schema Masker', href: '/ai-schema-masker' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/tools/json"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                Browse all 50+ tools
              </Link>
              <Link
                href="/ai-schema-masker"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Mask data for AI
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3" aria-label="Trust signals">
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white px-4 py-2.5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden />
                </span>
                <div>
                  <p className="text-[12px] font-bold leading-tight text-emerald-900">No signup required</p>
                  <p className="text-[10.5px] leading-tight text-emerald-600">Start using instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white px-4 py-2.5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100">
                  <Lock className="h-4 w-4 text-sky-700" aria-hidden />
                </span>
                <div>
                  <p className="text-[12px] font-bold leading-tight text-sky-900">Zero data stored</p>
                  <p className="text-[10.5px] leading-tight text-sky-600">GDPR-safe · runs in browser</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white px-4 py-2.5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Zap className="h-4 w-4 text-amber-600" aria-hidden />
                </span>
                <div>
                  <p className="text-[12px] font-bold leading-tight text-amber-900">Free forever</p>
                  <p className="text-[10.5px] leading-tight text-amber-600">No hidden fees, ever</p>
                </div>
              </div>
            </div>

            {/* Mobile visual — shown instead of code preview on sm/md screens */}
            <div className="lg:hidden mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4" aria-label="Available tools">
              {[
                { emoji: '{}', label: 'JSON Formatter' },
                { emoji: '🔐', label: 'JWT Decoder' },
                { emoji: '🌐', label: 'CORS Tester' },
                { emoji: '⚡', label: 'cURL Converter' },
                { emoji: '🗄️', label: 'SQL Formatter' },
                { emoji: '🔍', label: 'Regex Tester' },
                { emoji: '🤖', label: 'AI Masker' },
                { emoji: '📝', label: 'Markdown' },
              ].map(({ emoji, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-zinc-100 bg-white p-3 text-center shadow-sm">
                  <span className="text-2xl" aria-hidden>{emoji}</span>
                  <span className="text-[10px] font-medium text-zinc-500 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated code preview — desktop only */}
          <div className="hidden min-w-0 lg:block">
            <HomeHeroCodePreview />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-4">
          {[
            { n: '50+', l: 'Free developer tools' },
            { n: '100%', l: 'Client-side · GDPR-safe' },
            { n: '0', l: 'Bytes sent to servers' },
            { n: 'Free', l: 'No account · no limits' },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`px-6 py-5 text-center ${
                i < 3 ? 'max-sm:[&:nth-child(-n+2)]:border-b sm:border-r' : ''
              } border-zinc-200`}
            >
              <span className="block text-[22px] font-semibold tracking-[-0.02em] text-zinc-900">{s.n}</span>
              <span className="mt-0.5 block text-[13px] text-zinc-500">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
