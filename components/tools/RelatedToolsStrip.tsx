'use client';

/**
 * RelatedToolsStrip
 *
 * A horizontally scrollable row of related-tool cards, shown below the main
 * tool widget. Helps new users who land on one tool discover the rest of the
 * site without having to navigate to the homepage.
 *
 * Usage: rendered automatically by ToolPageShell when `toolName` is provided.
 */

import Link from 'next/link';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { getRelatedTools, type ToolMeta } from '@/lib/toolCatalog';

interface Props {
  toolName: string;
  /** Max number of related tools to surface. Default: 5 */
  limit?: number;
}

export default function RelatedToolsStrip({ toolName, limit = 5 }: Props) {
  const related = getRelatedTools(toolName, limit);
  if (related.length === 0) return null;

  return (
    <section
      aria-label="Related tools"
      className="w-full border-t border-zinc-100 bg-zinc-50/70 px-3 sm:px-5 lg:px-6 xl:px-8 py-4"
    >
      <div className="mx-auto max-w-[min(100%,96rem)]">
        {/* Header row */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
            <span className="text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
              You might also need
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-[11.5px] font-medium text-zinc-400 transition-colors hover:text-emerald-600"
          >
            Browse all tools
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>

        {/* Scrollable card row */}
        <div
          className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none"
          role="list"
        >
          {related.map((tool: ToolMeta) => (
            <ToolCard key={tool.toolName} tool={tool} />
          ))}

          {/* "See all" ghost card */}
          <Link
            href="/"
            role="listitem"
            className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-200 bg-white px-4 py-3 text-center transition-all hover:border-emerald-300 hover:bg-emerald-50 min-w-[110px]"
          >
            <LayoutGrid className="h-5 w-5 text-zinc-300" aria-hidden />
            <span className="text-[11px] font-semibold text-zinc-400">
              All tools
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      href={tool.href}
      role="listitem"
      className="group flex shrink-0 flex-col gap-1 rounded-xl border border-zinc-200 bg-white px-3.5 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md min-w-[120px] max-w-[148px]"
    >
      {/* Emoji icon */}
      <span className="text-xl leading-none" aria-hidden>
        {tool.emoji}
      </span>

      {/* Tool name */}
      <span className="mt-0.5 text-[12.5px] font-semibold leading-tight text-zinc-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
        {tool.label}
      </span>

      {/* Short description */}
      <span className="text-[11px] leading-snug text-zinc-400 line-clamp-2">
        {tool.shortDesc}
      </span>
    </Link>
  );
}
