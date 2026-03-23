'use client';

import FeedbackForm from '@/components/FeedbackForm';
import NewsletterSignup from '@/components/NewsletterSignup';

export type FeedbackNewsletterLayout = 'split' | 'feedback-only';

type Props = {
  /** `split`: feedback + newsletter (home beautifier). `feedback-only`: single column (home converter tab). */
  layout?: FeedbackNewsletterLayout;
  /** Optional — tags feedback on tool pages (e.g. `json_comparator`). */
  feedbackToolName?: string;
  /** Match wider tool page column (ToolPageShell); home uses default `ud-content`. */
  useWideContainer?: boolean;
};

export default function FeedbackNewsletterSplit({
  layout = 'split',
  feedbackToolName,
  useWideContainer = false,
}: Props) {
  return (
    <section className="border-t border-zinc-200 bg-[#FAFAFA] py-6 sm:py-8">
      <div className={`${useWideContainer ? 'ud-content-tool' : 'ud-content'} container-padding`}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/[0.04]">
          {layout === 'split' ? (
            <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-zinc-200 lg:items-stretch">
              <div className="flex h-full min-h-0 flex-col p-6 sm:p-8">
                <FeedbackForm variant="embedded" toolName={feedbackToolName} />
              </div>
              <div className="flex h-full min-h-0 flex-col bg-zinc-50/70 p-6 sm:p-8">
                <NewsletterSignup variant="embedded" />
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <FeedbackForm variant="embedded" toolName={feedbackToolName} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
