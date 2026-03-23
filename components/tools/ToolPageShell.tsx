'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Breadcrumb, { type BreadcrumbItem } from '@/components/Breadcrumb';
import FeedbackNewsletterSplit from '@/components/home/FeedbackNewsletterSplit';

/** Feedback + newsletter + ad slot — use after server-rendered SEO when `showFooterBand={false}` on the shell. */
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
  /** Passed to the feedback form in the bottom band (e.g. `json_comparator`). */
  toolName?: string;
  /** Main interactive UI — rendered inside the privacy-first card. Omit if the page is content-only. */
  tool?: ReactNode;
  /** Long-form SEO / help content below the tool card. */
  belowCard?: ReactNode;
  /** Optional row under the subtitle (badges, micro-copy). */
  badges?: ReactNode;
  showFeedbackNewsletter?: boolean;
  /**
   * When true, skip the default `ud-card-redesign` wrapper — use for tools that already render a full card UI.
   * The `#tool` anchor is still applied for deep links.
   */
  embedTool?: boolean;
  /**
   * When false, omit feedback + newsletter + mid-page ad from the shell (render `ToolPageFooterBand` after SEO on the page).
   */
  showFooterBand?: boolean;
};

/**
 * Shared shell for standalone tool routes: matches home JSON Beautifier rhythm
 * (`ud-content-tool`, emerald accent card, zinc typography, feedback + newsletter band).
 */
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
}: ToolPageShellProps) {
  return (
    <div className="w-full pb-4 sm:pb-6">
      <div className="ud-content-tool relative z-[2] pt-6 sm:pt-8 pb-2 sm:pb-4">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}
        <Link
          href={backHref}
          className="relative z-[1] mb-4 inline-flex touch-manipulation items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-900"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          {backLabel}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">{subtitle}</p>
        ) : null}
        {badges ? <div className="mt-3 flex flex-wrap gap-2">{badges}</div> : null}
      </div>

      {tool != null ? (
        <div className="ud-content pb-6 sm:pb-8">
          {embedTool ? (
            <div id="tool" className="scroll-mt-28 sm:scroll-mt-32">
              {toolName ? (
                <div className="sr-only" aria-hidden>
                  {/* Feedback API receives toolName from form */}
                </div>
              ) : null}
              {tool}
            </div>
          ) : (
            <div
              id="tool"
              className="ud-card-redesign scroll-mt-28 overflow-hidden shadow-md sm:scroll-mt-32"
            >
              <div className="h-1 w-full bg-gradient-to-r from-emerald-600 to-emerald-500" aria-hidden />
              <div className="p-6 sm:p-10 lg:p-12">
                {toolName ? (
                  <div className="sr-only" aria-hidden>
                    {/* Feedback API receives toolName from form; keep for a11y context if needed */}
                  </div>
                ) : null}
                {tool}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {belowCard != null ? (
        <div className="ud-content-tool pb-8 sm:pb-10">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
            {belowCard}
          </div>
        </div>
      ) : null}

      {showFooterBand ? (
        <ToolPageFooterBand toolName={toolName} showFeedbackNewsletter={showFeedbackNewsletter} />
      ) : null}
    </div>
  );
}
