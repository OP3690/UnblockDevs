'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, Code2, Wrench, Database, Globe, Key, GitCompare } from 'lucide-react';

/* ─── Tool chips shown under the textarea ─────────────────────────────── */
const QUICK_TOOLS = [
  { label: 'JSON Error Fixer',  href: '/json-error-explainer', icon: Wrench,    hint: '{ broken json }',            color: 'emerald' },
  { label: 'JWT Decoder',       href: '/jwt-decoder',          icon: Key,        hint: 'eyJhbGciOi...',              color: 'violet'  },
  { label: 'cURL Converter',    href: '/curl-converter',       icon: Code2,      hint: 'curl -X POST ...',           color: 'blue'    },
  { label: 'SQL Formatter',     href: '/sql-formatter',        icon: Database,   hint: 'SELECT * FROM ...',          color: 'amber'   },
  { label: 'JSON Formatter',    href: '/json-beautifier',      icon: GitCompare, hint: '{"valid":"json"}',           color: 'emerald' },
  { label: 'URL Encoder',       href: '/url-encoder',          icon: Globe,      hint: 'https://example.com/...',    color: 'blue'    },
] as const;

type ToolColor = 'emerald' | 'violet' | 'blue' | 'amber';

const chipColors: Record<ToolColor, string> = {
  emerald: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300',
  violet:  'border-violet-200  text-violet-700  hover:bg-violet-50  hover:border-violet-300',
  blue:    'border-blue-200    text-blue-700    hover:bg-blue-50    hover:border-blue-300',
  amber:   'border-amber-200   text-amber-700   hover:bg-amber-50   hover:border-amber-300',
};

/* ─── Smart content detection ─────────────────────────────────────────── */
function detectTool(content: string): { href: string; label: string } {
  const s = content.trim();
  if (!s) return { href: '/json-error-explainer', label: 'AI JSON Fixer' };

  // cURL command
  if (/^curl\s/i.test(s))
    return { href: '/curl-converter', label: 'cURL Converter' };

  // JWT — three base64url segments separated by dots
  if (/^[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}$/.test(s))
    return { href: '/jwt-decoder', label: 'JWT Decoder' };

  // SQL
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|EXPLAIN)\s/i.test(s))
    return { href: '/sql-formatter', label: 'SQL Formatter' };

  // JSON-like — try to parse
  if (s.startsWith('{') || s.startsWith('[') || s.startsWith('"')) {
    try {
      JSON.parse(s);
      return { href: '/json-beautifier', label: 'JSON Formatter' };
    } catch {
      return { href: '/json-error-explainer', label: 'AI JSON Fixer' };
    }
  }

  // Base64 (at least 24 chars, valid charset, padded)
  if (/^[A-Za-z0-9+/]+=*$/.test(s) && s.length >= 24 && s.length % 4 === 0)
    return { href: '/base64-encoder', label: 'Base64 Decoder' };

  // URL
  if (/^https?:\/\//i.test(s))
    return { href: '/url-encoder', label: 'URL Encoder' };

  // Fallback
  return { href: '/json-error-explainer', label: 'AI JSON Fixer' };
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function HomePasteRouter() {
  const [value, setValue]           = useState('');
  const [detected, setDetected]     = useState<{ href: string; label: string } | null>(null);
  const [focused, setFocused]       = useState(false);
  const [animating, setAnimating]   = useState(false);
  const router                      = useRouter();
  const textareaRef                  = useRef<HTMLTextAreaElement>(null);

  // Debounced detection while typing
  const detectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValue(v);

    if (detectTimer.current) clearTimeout(detectTimer.current);
    if (!v.trim()) { setDetected(null); return; }

    detectTimer.current = setTimeout(() => {
      const result = detectTool(v);
      setDetected(result);
    }, 200);
  }, []);

  useEffect(() => () => {
    if (detectTimer.current) clearTimeout(detectTimer.current);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!value.trim()) {
      textareaRef.current?.focus();
      return;
    }
    const tool = detectTool(value);
    // Store in localStorage so tools can optionally pre-fill
    try { localStorage.setItem('ud-paste-input', value.trim()); } catch { /* ok */ }
    setAnimating(true);
    setTimeout(() => router.push(tool.href), 150);
  }, [value, router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <section
      className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white py-8 sm:py-10"
      aria-label="Paste and detect tool"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">

        {/* Label */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-500 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
            Paste anything — we&apos;ll find the right tool instantly
          </span>
        </div>

        {/* Paste card */}
        <div
          className={`relative rounded-2xl border-2 bg-white shadow-sm transition-all duration-200 ${
            focused
              ? 'border-emerald-400 shadow-emerald-100 shadow-md'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste your JSON, cURL command, JWT token, SQL query, API response, Base64 string... we detect what it is and open the right tool."
            rows={5}
            className="w-full resize-none rounded-2xl bg-transparent px-4 pt-4 pb-14 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none font-mono leading-relaxed"
            aria-label="Paste content to detect the right tool"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />

          {/* Bottom bar inside card */}
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-2 px-4 pb-3.5">
            {/* Detection badge */}
            {detected ? (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-all">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Detected: {detected.label}
              </span>
            ) : (
              <span className="text-[11px] text-zinc-400 select-none">
                ⌘ Enter to open tool
              </span>
            )}

            {/* CTA */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={animating}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-bold transition-all duration-150 ${
                value.trim()
                  ? 'bg-zinc-900 hover:bg-zinc-700 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              } ${animating ? 'scale-95 opacity-70' : ''}`}
              aria-label={detected ? `Open ${detected.label}` : 'Find the right tool'}
            >
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              {detected ? `Open ${detected.label}` : 'Find Tool'}
            </button>
          </div>
        </div>

        {/* Quick-access tool chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list" aria-label="Popular tools">
          {QUICK_TOOLS.map(({ label, href, icon: Icon, color }) => (
            <a
              key={href}
              href={href}
              role="listitem"
              className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium transition-colors ${chipColors[color as ToolColor]}`}
            >
              <Icon className="h-3 w-3" aria-hidden />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
