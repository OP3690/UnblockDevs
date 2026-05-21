'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Zap, Wrench, Code2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ToolConfig {
  href: string;
  label: string;
  verb: string;
  icon: 'zap' | 'wrench' | 'code';
  color: 'emerald' | 'violet' | 'blue' | 'amber';
}

function detectToolForPath(pathname: string): ToolConfig {
  const p = pathname ?? '';
  if (/\/blog\/jwt/i.test(p))
    return { href: '/jwt-decoder', label: 'JWT Decoder', verb: 'Decode', icon: 'code', color: 'violet' };
  if (/\/blog\/(har-to-curl|curl)/i.test(p))
    return { href: '/curl-converter', label: 'cURL Converter', verb: 'Convert', icon: 'code', color: 'blue' };
  if (/\/blog\/(sql|mysql)/i.test(p))
    return { href: '/sql-formatter', label: 'SQL Formatter', verb: 'Format', icon: 'wrench', color: 'blue' };
  if (/\/blog\/oauth/i.test(p))
    return { href: '/jwt-decoder', label: 'Token Decoder', verb: 'Decode', icon: 'code', color: 'violet' };
  if (/\/blog\/rest-api/i.test(p))
    return { href: '/api-comparator', label: 'API Comparator', verb: 'Compare', icon: 'zap', color: 'blue' };
  if (/\/blog\/websocket|sse|polling/i.test(p))
    return { href: '/json-beautifier', label: 'JSON Formatter', verb: 'Format', icon: 'wrench', color: 'emerald' };
  // Default — JSON error fixer for all JSON/AI/general blogs
  return { href: '/json-error-explainer', label: 'AI JSON Fixer', verb: 'Fix', icon: 'zap', color: 'emerald' };
}

const colorMap = {
  emerald: {
    bar:    'bg-zinc-900 border-t border-zinc-800',
    btn:    'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-900/30',
    icon:   'bg-emerald-500/15 text-emerald-400',
    dot:    'bg-emerald-400',
  },
  violet: {
    bar:    'bg-zinc-900 border-t border-zinc-800',
    btn:    'bg-violet-500 hover:bg-violet-400 text-white shadow-violet-900/30',
    icon:   'bg-violet-500/15 text-violet-400',
    dot:    'bg-violet-400',
  },
  blue: {
    bar:    'bg-zinc-900 border-t border-zinc-800',
    btn:    'bg-blue-500 hover:bg-blue-400 text-white shadow-blue-900/30',
    icon:   'bg-blue-500/15 text-blue-400',
    dot:    'bg-blue-400',
  },
  amber: {
    bar:    'bg-zinc-900 border-t border-zinc-800',
    btn:    'bg-amber-400 hover:bg-amber-300 text-zinc-900 shadow-amber-900/30',
    icon:   'bg-amber-500/15 text-amber-400',
    dot:    'bg-amber-400',
  },
};

export default function BlogStickyToolBar() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname                   = usePathname();
  const tool                       = detectToolForPath(pathname ?? '');
  const colors                     = colorMap[tool.color];
  const shownRef                   = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('ud-stickybar-dismissed')) {
        setDismissed(true);
        return;
      }
    } catch { /* private browsing */ }

    const onScroll = () => {
      if (!shownRef.current && window.scrollY > 550) {
        shownRef.current = true;
        setVisible(true);
      }
    };

    // Show after scroll OR after 12 seconds (for slow readers)
    const timer = setTimeout(() => {
      if (!shownRef.current) { shownRef.current = true; setVisible(true); }
    }, 12_000);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try { sessionStorage.setItem('ud-stickybar-dismissed', '1'); } catch { /* ok */ }
  }, []);

  if (dismissed) return null;

  const IconEl = tool.icon === 'wrench' ? Wrench : tool.icon === 'code' ? Code2 : Zap;

  return (
    <div
      role="complementary"
      aria-label="Quick tool access"
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-500 ease-out will-change-transform ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className={`${colors.bar} shadow-[0_-6px_32px_rgba(0,0,0,0.35)]`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center gap-3">

          {/* Animated icon */}
          <div className={`flex-shrink-0 h-9 w-9 rounded-xl ${colors.icon} flex items-center justify-center`}>
            <IconEl className="h-4 w-4" aria-hidden />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight truncate">
              Using this guide to fix a live error?
            </p>
            <p className="text-xs text-zinc-400 mt-0.5 hidden sm:block">
              {tool.verb} it instantly with our free <strong className="text-zinc-200">{tool.label}</strong> — no sign-up
            </p>
          </div>

          {/* Primary CTA */}
          <Link
            href={tool.href}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl ${colors.btn} px-4 py-2 text-sm font-bold transition-colors shadow-lg`}
            onClick={dismiss}
          >
            <IconEl className="w-3.5 h-3.5" aria-hidden />
            <span className="hidden sm:inline">{tool.verb} it free →</span>
            <span className="sm:hidden">Open →</span>
          </Link>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
