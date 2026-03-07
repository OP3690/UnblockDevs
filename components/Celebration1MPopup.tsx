'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'unblockdevs_1m_celebration_seen';

export default function Celebration1MPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      // Small delay so page paints first, then show celebration
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      //
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm opacity-0 celebration-backdrop"
        aria-hidden
      />

      {/* Confetti layer (CSS-only) */}
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" aria-hidden>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="celebration-confetti absolute w-2 h-2 rounded-sm opacity-90"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDelay: `${(i * 0.08) % 2}s`,
              animationDuration: `${2.5 + (i % 3) * 0.5}s`,
              background: ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6', '#f97316'][i % 6],
              transform: `rotate(${i * 12}deg)`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-[10000] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 pointer-events-auto celebration-modal"
        role="dialog"
        aria-labelledby="celebration-title"
        aria-modal="true"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-[3px] shadow-2xl">
          <div className="rounded-2xl bg-white p-6 sm:p-8 text-center">
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close celebration"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <Sparkles className="w-8 h-8" />
              </span>
            </div>

            <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-2">
              We hit a milestone
            </p>
            <h2 id="celebration-title" className="text-4xl sm:text-5xl font-black text-gray-900 mb-1">
              1,000,000
            </h2>
            <p className="text-2xl font-bold text-gray-700 mb-2">visits</p>
            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-sm mx-auto">
              Thank you for being part of our journey. We&apos;re building free tools for developers—and you made this possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                onClick={dismiss}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
              >
                Explore tools
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Celebrate with us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
