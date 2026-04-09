'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, X } from 'lucide-react';

const UD_RECENT_KEY = 'ud_recent_tools';

type RecentEntry = { href: string; title: string; ts: number };

function getShortTitle(title: string): string {
  // Trim trailing " — ..." suffixes common in tool titles
  return title.replace(/\s*[—–-].*$/, '').trim();
}

export default function RecentlyUsedTools() {
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const stored: RecentEntry[] = JSON.parse(localStorage.getItem(UD_RECENT_KEY) || '[]');
      setRecent(stored.filter((e) => e.href && e.title));
    } catch {
      // ignore
    }
  }, []);

  function clearRecent() {
    try {
      localStorage.removeItem(UD_RECENT_KEY);
    } catch { /* ignore */ }
    setDismissed(true);
  }

  if (dismissed || recent.length === 0) return null;

  return (
    <section
      aria-label="Recently used tools"
      className="border-b border-zinc-100 bg-gradient-to-r from-emerald-50/60 to-sky-50/40 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-[min(100%,96rem)] flex-wrap items-center gap-2">
        {/* Label */}
        <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-zinc-500">
          <Clock className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
          Recently used
        </span>

        {/* Tool pills */}
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {recent.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="inline-flex touch-manipulation items-center rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md"
            >
              {getShortTitle(entry.title)}
            </Link>
          ))}
        </div>

        {/* Clear button */}
        <button
          type="button"
          onClick={clearRecent}
          aria-label="Clear recently used tools"
          className="ml-auto shrink-0 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
