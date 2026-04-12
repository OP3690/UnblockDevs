import Link from 'next/link';
import { LayoutGrid, Plus, ShieldCheck, Lock, Zap } from 'lucide-react';
import HomeHeroCodePreview from '@/components/home/HomeHeroCodePreview';

/**
 * Server-rendered hero + stats — clean two-column layout.
 */
export default function HomeServerHero() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-[#FAFAFA]" aria-labelledby="home-hero-heading">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:px-8 pb-14 pt-10 sm:gap-16 sm:pb-18 sm:pt-14 lg:grid-cols-2 lg:gap-20 lg:pb-[5rem] lg:pt-16">

          {/* Left: copy */}
          <div className="min-w-0">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 font-mono text-[11px] font-medium text-emerald-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              100% client-side — nothing leaves your browser
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
              50+ free browser-based tools for JSON, SQL, APIs, AI, color, diff, and CSS. Mask sensitive data
              before sending to ChatGPT. Format, debug, and convert — all without uploading anything to a
              server.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/tools/json"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                Explore all tools
              </Link>
              <Link
                href="/ai-schema-masker"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Mask SQL for AI
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
                  <p className="text-[10.5px] leading-tight text-sky-600">100% runs in your browser</p>
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
            { n: '50+', l: 'Developer tools' },
            { n: '100%', l: 'Client-side processing' },
            { n: '0', l: 'Bytes sent to servers' },
            { n: 'Free', l: 'No account, no limits' },
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
