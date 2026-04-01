import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────

export type FAQItem = { q: string; a: ReactNode };
export type RelatedTool = { href: string; label: string; desc: string; icon?: string };
export type UseCase = { icon: string; title: string; desc: string };
export type HowItWorksStep = { n: string; title: string; desc: string };

// ── Sub-components ─────────────────────────────────────────

/** Section heading with pill eyebrow label */
export function SEOSection({
  eyebrow,
  heading,
  children,
  id,
}: {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="scroll-mt-24" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
          {eyebrow}
        </span>
      )}
      <h2
        id={id ? `${id}-h` : undefined}
        className="mb-5 text-[1.25rem] font-bold tracking-[-0.025em] text-zinc-900 sm:text-[1.45rem]"
      >
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

/** Prose paragraph */
export function SEOProse({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14.5px] leading-[1.8] text-zinc-600">{children}</p>
  );
}

/** Inline code */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[12.5px] text-zinc-700">
      {children}
    </code>
  );
}

/** Pro tip callout */
export function ProTip({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <span className="mt-0.5 text-lg leading-none">💡</span>
      <p className="text-[13.5px] leading-relaxed text-amber-900">{children}</p>
    </div>
  );
}

/** How It Works steps with gradient numbered circles */
export function HowItWorks({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div
          key={s.n}
          className="relative flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          {/* connector line between cards (hidden on mobile) */}
          {i < steps.length - 1 && (
            <div className="absolute -right-2 top-8 z-10 hidden h-px w-4 bg-gradient-to-r from-emerald-300 to-transparent lg:block" />
          )}
          {/* step number bubble */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[13px] font-bold text-white shadow-sm">
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="text-[14px] font-semibold text-zinc-900">{s.title}</h3>
          <p className="text-[13px] leading-relaxed text-zinc-500">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Use-case cards grid with icon bubbles and hover state */
export function UseCases({ cases }: { cases: UseCase[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((c) => (
        <div
          key={c.title}
          className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-md"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 text-xl transition-all group-hover:border-emerald-200 group-hover:bg-emerald-50">
            {c.icon}
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-zinc-900 group-hover:text-emerald-800">
              {c.title}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** FAQ accordion — native details/summary, no JS required */
export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <details
          key={i}
          className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all open:border-emerald-200 open:shadow-sm"
        >
          <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 marker:hidden">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700">
                {i + 1}
              </span>
              <span className="text-[14px] font-semibold text-zinc-900">{item.q}</span>
            </div>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-zinc-100 px-5 pb-5 pt-4 text-[13.5px] leading-[1.75] text-zinc-600">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Related tools grid — arrow animation on hover */
export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md"
        >
          {t.icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 text-lg transition-all group-hover:border-emerald-200 group-hover:bg-emerald-50">
              {t.icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-zinc-900 group-hover:text-emerald-800">
              {t.label}
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-zinc-500">{t.desc}</p>
          </div>
          <ArrowRight
            className="mt-0.5 h-4 w-4 shrink-0 translate-x-0 text-zinc-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-500 group-hover:opacity-100"
            aria-hidden
          />
        </Link>
      ))}
    </div>
  );
}

/** Feature check-list — compact bullet points with check icons */
export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-zinc-600">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main wrapper ───────────────────────────────────────────

/**
 * Polished container for all below-fold SEO content on tool pages.
 * Use inside page.tsx directly (outside ToolPageShell) or as `belowCard` prop.
 */
export default function ToolSEOContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[min(100%,96rem)] px-4 pb-12 sm:px-6 lg:px-10 xl:px-16 ${className}`}
    >
      <div className="space-y-14">{children}</div>
    </div>
  );
}
