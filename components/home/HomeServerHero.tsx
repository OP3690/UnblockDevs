import Link from 'next/link';
import { Check } from 'lucide-react';
import HomeHeroCodePreview from '@/components/home/HomeHeroCodePreview';

/**
 * Server-rendered hero + stats (LCP-friendly) — matches privacy-first landing mockup.
 */
export default function HomeServerHero() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-[#FAFAFA]" aria-labelledby="home-hero-heading">
        {/* Tighter top padding — nav is directly above; matches flush-top redesign */}
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 pb-12 pt-8 sm:gap-16 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-16 lg:pb-[4.5rem] lg:pt-12">
          <div className="min-w-0">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[11px] font-medium text-emerald-800">
              <Check className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
              100% client-side — nothing leaves your browser
            </p>

            <h1
              id="home-hero-heading"
              className="text-[clamp(2rem,3.5vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-zinc-900"
            >
              Developer tools
              <br />
              that <span className="text-emerald-700">respect your data</span>
            </h1>

            <p className="mt-4 max-w-[min(32rem,100%)] text-base leading-relaxed text-zinc-600 text-pretty">
              30+ free browser-based tools for JSON, SQL, APIs, and AI workflows. Mask sensitive data before sending to
              ChatGPT. Format, debug, and convert — all without uploading anything to a server.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/tools/json"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Explore all tools
              </Link>
              <Link
                href="/ai-schema-masker"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Mask SQL for AI
              </Link>
              <Link href="#active-tool" className="text-sm font-medium text-emerald-700 underline-offset-4 hover:underline">
                JSON Beautifier on this page ↓
              </Link>
            </div>

            <ul className="mt-9 flex flex-wrap gap-2.5 sm:gap-3" aria-label="Trust">
              <li className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/70 bg-emerald-50/90 px-3 py-1.5 text-[13px] font-medium text-emerald-950 shadow-sm shadow-emerald-900/[0.04]">
                <span className="text-base leading-none text-emerald-600" aria-hidden>
                  ★
                </span>
                No signup required
              </li>
              <li className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/70 bg-emerald-50/90 px-3 py-1.5 text-[13px] font-medium text-emerald-950 shadow-sm shadow-emerald-900/[0.04]">
                <span className="text-base leading-none text-emerald-600" aria-hidden>
                  🔒
                </span>
                Zero data stored
              </li>
              <li className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/70 bg-emerald-50/90 px-3 py-1.5 text-[13px] font-medium text-emerald-950 shadow-sm shadow-emerald-900/[0.04]">
                <span className="text-base leading-none text-emerald-600" aria-hidden>
                  ✓
                </span>
                Free forever
              </li>
            </ul>
          </div>

          {/* Code preview — animated before/after; hidden &lt; lg */}
          <div className="hidden min-w-0 lg:block">
            <HomeHeroCodePreview />
          </div>
        </div>
      </section>

      <div className="border-y border-zinc-200 bg-white">
        {/* No border-x / vertical cell borders on mobile — those read as a random “line down the middle”. */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 sm:grid-cols-4">
          {[
            { n: '30+', l: 'Developer tools' },
            { n: '100%', l: 'Client-side processing' },
            { n: '0', l: 'Bytes sent to our servers' },
            { n: 'Free', l: 'No account, no limits' },
          ].map((s, i) => (
            <div
              key={s.l}
              className="border-zinc-200 px-4 py-5 text-center max-sm:[&:nth-child(-n+2)]:border-b sm:border-r sm:px-6 sm:py-5 sm:last:border-r-0"
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
