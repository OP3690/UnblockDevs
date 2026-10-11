'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'ud_social_analyzer_popup_v1';

const PLATFORMS = [
  { emoji: '📸', label: 'Instagram', color: '#E1306C' },
  { emoji: '▶',  label: 'YouTube',   color: '#FF0000' },
  { emoji: '🎵', label: 'TikTok',    color: '#69C9D0' },
  { emoji: '👍', label: 'Facebook',  color: '#1877F2' },
  { emoji: '𝕏',  label: 'Twitter',   color: '#fff'    },
];

export default function SocialMediaFeaturePopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch { /* localStorage blocked */ }
  }, [mounted]);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* blocked */ }
    }, 280);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-[3px] smf-backdrop"
        aria-hidden
        onClick={dismiss}
      />

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/2 z-[9999] w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${closing ? 'smf-modal-out' : 'smf-modal-in'}`}
        role="dialog"
        aria-labelledby="smf-title"
        aria-modal="true"
      >
        {/* Gradient border shell */}
        <div className="relative rounded-2xl p-[1.5px] shadow-2xl shadow-black/60" style={{ background: 'linear-gradient(135deg,#E1306C,#a855f7,#3b82f6)' }}>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950 px-6 pb-7 pt-5">

            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #E1306C, transparent 70%)' }} aria-hidden />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} aria-hidden />

            {/* Close */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Live badge */}
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                New Feature Live
              </span>
            </div>

            {/* Shock number */}
            <div className="mb-1 text-center">
              <span
                className="block text-[3.5rem] font-black leading-none tracking-tighter"
                style={{ backgroundImage: 'linear-gradient(135deg,#f472b6,#a855f7,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                37 days
              </span>
            </div>

            {/* Headline */}
            <h2 id="smf-title" className="mb-1 text-center text-[17px] font-bold leading-snug text-white">
              You&apos;ve lost to social media this year.
            </h2>
            <p className="mb-5 text-center text-[12.5px] leading-relaxed text-zinc-400">
              That&apos;s the average. What&apos;s{' '}
              <span className="font-semibold text-zinc-200">your</span> number?{' '}
              Upload your data — 100% private, runs in your browser.
            </p>

            {/* Platform chips */}
            <div className="mb-5 flex items-center justify-center gap-2 flex-wrap">
              {PLATFORMS.map((p) => (
                <span
                  key={p.label}
                  className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
                >
                  <span className="leading-none">{p.emoji}</span>
                  {p.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/social-media-time-analyzer"
                onClick={dismiss}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-[14px] font-bold text-white shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl active:scale-[0.99]"
                style={{ background: 'linear-gradient(135deg,#E1306C,#a855f7,#3b82f6)' }}
              >
                {/* Shimmer layer */}
                <span className="pointer-events-none absolute inset-0 smf-shimmer" aria-hidden />
                Reveal my Instagram activity →
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="w-full rounded-xl py-2.5 text-[13px] font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
              >
                Maybe later
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
