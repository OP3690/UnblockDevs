'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import FeedbackNewsletterSplit from '@/components/home/FeedbackNewsletterSplit';

/** Feedback + newsletter + ad slot */
export function ToolPageFooterBand({
  toolName,
  showFeedbackNewsletter = true,
}: {
  toolName?: string;
  showFeedbackNewsletter?: boolean;
}) {
  return (
    <>
      {showFeedbackNewsletter ? (
        <FeedbackNewsletterSplit layout="split" feedbackToolName={toolName} useWideContainer />
      ) : null}
      <div
        id="ezoic-pub-ad-placeholder-103"
        role="region"
        aria-label="Advertisement"
        className="min-h-[50px] w-full sm:min-h-[90px]"
        style={{ contain: 'layout' }}
      />
    </>
  );
}

export type ToolPageShellProps = {
  breadcrumbItems?: BreadcrumbItem[]; // kept for API compat, no longer rendered
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  toolName?: string;
  tool?: ReactNode;
  belowCard?: ReactNode;
  badges?: ReactNode;
  showFeedbackNewsletter?: boolean;
  embedTool?: boolean;
  showFooterBand?: boolean;
  /** Emoji icon displayed in the header */
  icon?: string;
  /** Extra feature pill labels shown after the privacy badge */
  features?: string[];
};

const DEFAULT_FEATURES = ['No signup', 'Free forever'];

export default function ToolPageShell({
  breadcrumbItems,
  title,
  subtitle,
  backHref = '/tools/json',
  backLabel = 'All tools',
  toolName,
  tool,
  belowCard,
  badges,
  showFeedbackNewsletter = true,
  embedTool = false,
  showFooterBand = true,
  icon,
  features = DEFAULT_FEATURES,
}: ToolPageShellProps) {
  return (
    <div className="w-full">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50/80 to-white">
        <div className="mx-auto w-full max-w-[min(100%,72rem)] px-4 sm:px-6 lg:px-8 py-6 sm:py-9">

          {/* Back button */}
          <Link
            href={backHref}
            className="mb-5 inline-flex touch-manipulation items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-500 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <ArrowLeft className="h-3 w-3 shrink-0" aria-hidden />
            {backLabel}
            <ChevronRight className="h-3 w-3 text-zinc-300" aria-hidden />
          </Link>

          {/* Title row */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className="hidden shrink-0 sm:flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-3xl shadow-sm">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-[1.65rem] font-bold leading-[1.12] tracking-[-0.03em] text-zinc-900 sm:text-[2rem] lg:text-[2.25rem]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2.5 max-w-[52rem] text-[14.5px] leading-relaxed text-zinc-500">
                  {subtitle}
                </p>
              )}

              {/* Trust + feature pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11.5px] font-semibold text-emerald-800">
                  <Lock className="h-3 w-3" aria-hidden />
                  Data never leaves your browser
                </span>
                {features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11.5px] font-medium text-zinc-600 shadow-sm"
                  >
                    {f}
                  </span>
                ))}
                {badges}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tool card ─────────────────────────────────────── */}
      {tool != null && (
        <div className="mx-auto w-full max-w-[min(100%,72rem)] px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          {embedTool ? (
            <div id="tool" className="scroll-mt-24">
              {tool}
            </div>
          ) : (
            <div
              id="tool"
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_4px_24px_-6px_rgba(0,0,0,0.1),0_2px_8px_-3px_rgba(0,0,0,0.06)]"
            >
              {/* Color accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" aria-hidden />
              <div className="p-5 sm:p-7 lg:p-9">{tool}</div>
            </div>
          )}
        </div>
      )}

      {/* ── Below-card SEO content ─────────────────────── */}
      {belowCard != null && (
        <div className="mx-auto w-full max-w-[min(100%,72rem)] px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
          <div className="rounded-2xl border border-zinc-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            {belowCard}
          </div>
        </div>
      )}

      {showFooterBand && (
        <ToolPageFooterBand toolName={toolName} showFeedbackNewsletter={showFeedbackNewsletter} />
      )}
    </div>
  );
}
