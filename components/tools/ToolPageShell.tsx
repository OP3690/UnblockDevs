'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import Breadcrumb, { type BreadcrumbItem } from '@/components/Breadcrumb';
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
  breadcrumbItems?: BreadcrumbItem[];
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
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="ud-content-tool py-7 sm:py-10">
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <div className="mb-5">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          )}

          {/* Back */}
          <Link
            href={backHref}
            className="mb-6 inline-flex touch-manipulation items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {backLabel}
          </Link>

          {/* Title row */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className="hidden shrink-0 sm:flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-2xl shadow-sm">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.025em] text-zinc-900 sm:text-[2.1rem]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 max-w-[46rem] text-[15px] leading-relaxed text-zinc-500">
                  {subtitle}
                </p>
              )}

              {/* Trust + feature pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-800">
                  <Lock className="h-3 w-3" aria-hidden />
                  Data never leaves your browser
                </span>
                {features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[12px] font-medium text-zinc-600 shadow-sm"
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
        <div className="ud-content-tool py-6 sm:py-8">
          {embedTool ? (
            <div id="tool" className="scroll-mt-24">
              {tool}
            </div>
          ) : (
            <div
              id="tool"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08),0_1px_4px_-2px_rgba(0,0,0,0.04)]"
            >
              <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" aria-hidden />
              <div className="p-5 sm:p-8 lg:p-10">{tool}</div>
            </div>
          )}
        </div>
      )}

      {/* ── Below-card SEO content ─────────────────────── */}
      {belowCard != null && (
        <div className="ud-content-tool pb-10 sm:pb-12">
          <div className="rounded-xl border border-zinc-100 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
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
