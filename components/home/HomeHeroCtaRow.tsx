'use client';

import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { trackHeroCta } from '@/lib/analytics';

export default function HomeHeroCtaRow() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Link
        href="/#main-content"
        onClick={() => trackHeroCta('browse_all_tools')}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30"
      >
        <LayoutGrid className="h-4 w-4" aria-hidden />
        Browse all 60+ tools
      </Link>
      <Link
        href="/ai-schema-masker"
        onClick={() => trackHeroCta('mask_data_for_ai')}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-400 hover:shadow-md"
      >
        Mask data for AI
      </Link>
    </div>
  );
}
