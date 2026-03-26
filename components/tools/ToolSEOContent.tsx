import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, HelpCircle, ExternalLink } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────

export type FAQItem = { q: string; a: ReactNode };
export type RelatedTool = { href: string; label: string; desc: string; icon?: string };
export type UseCase = { icon: string; title: string; desc: string };
export type HowItWorksStep = { n: string; title: string; desc: string };

// ── Sub-components ─────────────────────────────────────────

/** Section heading with eyebrow label */
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
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.13em] text-emerald-700">
          {eyebrow}
        </p>
      )}
      <h2
        id={id ? `${id}-h` : undefined}
        className="mb-4 text-[1.2rem] font-semibold tracking-[-0.02em] text-zinc-900 sm:text-[1.35rem]"
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

/** Prose paragraph */
export function SEOProse({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14.5px] leading-[1.75] text-zinc-600">{children}</p>
  );
}

/** Inline code */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[12.5px] text-zinc-700">
      {children}
    </code>
  );
}

/** How It Works 4-step grid */
export function HowItWorks({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <div key={s.n} className="flex flex-col gap-2.5 bg-white p-5 sm:p-6">
          <span className="font-mono text-[11px] font-medium text-zinc-400">{s.n}</span>
          <h3 className="text-[14px] font-semibold text-zinc-900">{s.title}</h3>
          <p className="text-[13px] leading-relaxed text-zinc-500">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Use-case cards grid */
export function UseCases({ cases }: { cases: UseCase[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((c) => (
        <div
          key={c.title}
          className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4"
        >
          <span className="mt-0.5 text-xl leading-none">{c.icon}</span>
          <div>
            <p className="text-[13.5px] font-semibold text-zinc-900">{c.title}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** FAQ accordion (static — JS not required) */
export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden">
      {items.map((item, i) => (
        <details key={i} className="group bg-white first:rounded-t-xl last:rounded-b-xl">
          <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-zinc-900 marker:hidden list-none hover:bg-zinc-50">
            {item.q}
            <ChevronRight
              className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-90"
              aria-hidden
            />
          </summary>
          <div className="px-5 pb-5 pt-1 text-[13.5px] leading-relaxed text-zinc-600">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Related tools grid */
export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-sm"
        >
          {t.icon && <span className="mt-0.5 text-xl leading-none">{t.icon}</span>}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-zinc-900 group-hover:text-emerald-800">
              {t.label}
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-zinc-500">{t.desc}</p>
          </div>
          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-300 group-hover:text-emerald-500" aria-hidden />
        </Link>
      ))}
    </div>
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
      className={`mx-auto max-w-[min(100%,72rem)] px-4 pb-12 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="space-y-12">{children}</div>
    </div>
  );
}
