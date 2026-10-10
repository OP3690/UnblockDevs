'use client';

import Link from 'next/link';
import { Results, analysisFromShare } from '../instagram-reels-analyzer/client';
import type { ShareSummary } from '../instagram-reels-analyzer/client';

export default function SharedView({ share }: { share: ShareSummary }) {
  const name = share.u || 'Someone';
  const analysis = analysisFromShare(share);

  return (
    <div>
      {/* Sticky viral banner */}
      <div className="sticky top-0 z-50 bg-zinc-950 text-white text-center py-3 px-4 border-b border-white/10">
        <p className="text-sm font-medium">
          Seeing <strong>{name}&apos;s</strong> Instagram report.{' '}
          <Link
            href="/social-media-time-analyzer"
            className="underline font-bold text-pink-400 hover:text-pink-300 transition-colors"
          >
            Analyze yours too →
          </Link>
          <span className="text-white/40 ml-2 text-xs">free · 100% private · no upload</span>
        </p>
      </div>

      {/* Full results — identical to what the owner saw */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-4"
              style={{ background: '#fdf4ff', color: '#c026d3', borderColor: '#f5d0fe' }}>
              <span className="text-base">📸</span>
              {name}&apos;s Instagram Activity Report — shared with you
            </div>
          </div>

          <Results a={analysis} />

          {/* Bottom CTA */}
          <div className="rounded-3xl overflow-hidden mt-8"
            style={{ background: 'linear-gradient(135deg, #1e0533 0%, #0c1a2e 100%)' }}>
            <div className="px-8 py-10 text-center">
              <p className="text-2xl sm:text-3xl font-black text-white mb-2">
                Curious about your own numbers?
              </p>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                Upload your Instagram data export and see your complete breakdown in seconds.
                100% private — nothing leaves your browser.
              </p>
              <Link
                href="/social-media-time-analyzer"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #E1306C, #a855f7, #3b82f6)' }}
              >
                Analyze my Instagram →
              </Link>
              <p className="text-xs text-gray-600 mt-4">Free · No signup · Runs in your browser</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
