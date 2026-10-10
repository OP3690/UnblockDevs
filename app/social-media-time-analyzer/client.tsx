'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import InstagramAnalyzerClient from '../instagram-reels-analyzer/client';

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: 'instagram',
    label: 'Instagram',
    emoji: '📸',
    color: '#E1306C',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
    bg: 'bg-gradient-to-br from-pink-50 to-orange-50',
    available: true,
    tagline: 'Reels, Stories, DMs & more',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    emoji: '▶',
    color: '#FF0000',
    gradient: 'from-red-600 to-red-400',
    bg: 'bg-gradient-to-br from-red-50 to-orange-50',
    available: false,
    tagline: 'Watch time, playlists & searches',
    features: [
      'Total videos watched & estimated hours',
      'Watch history heatmap by day/hour',
      'Top channels you watched most',
      'Search history word cloud',
      'Liked & saved videos count',
      'Comments written over time',
    ],
    exportPath: 'Google Takeout → YouTube',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    emoji: '👍',
    color: '#1877F2',
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    available: false,
    tagline: 'Posts, reactions & messages',
    features: [
      'Posts, reactions & comments history',
      'Videos watched & time estimate',
      'Messages sent vs received',
      'Groups activity over time',
      'Advertisers who targeted you',
      'Pages you followed & unfollowed',
    ],
    exportPath: 'Facebook → Settings → Your Facebook Information',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    emoji: '𝕏',
    color: '#000000',
    gradient: 'from-gray-900 to-gray-600',
    bg: 'bg-gradient-to-br from-gray-50 to-slate-100',
    available: false,
    tagline: 'Tweets, likes & browsing time',
    features: [
      'Total tweets posted over the years',
      'Likes given — topics & patterns',
      'DMs sent & received',
      'Replies vs original tweets',
      'Account age & activity streaks',
      'Monthly engagement breakdown',
    ],
    exportPath: 'Settings → Your Account → Download an archive',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    emoji: '🎵',
    color: '#010101',
    gradient: 'from-gray-900 via-pink-600 to-cyan-400',
    bg: 'bg-gradient-to-br from-pink-50 to-cyan-50',
    available: false,
    tagline: 'Videos watched & time in app',
    features: [
      'Total videos watched & estimated hours',
      'Days of life spent scrolling TikTok',
      'Liked & shared videos count',
      'Comments & DMs sent',
      'Search history topics',
      'Monthly watch trend over time',
    ],
    exportPath: 'Profile → Settings → Privacy → Personalization & Data',
  },
] as const;

type PlatformId = (typeof PLATFORMS)[number]['id'];

// ─── Coming Soon card ─────────────────────────────────────────────────────────

function ComingSoon({ p }: { p: (typeof PLATFORMS)[number] }) {
  return (
    <div className={`min-h-screen ${p.bg}`}>
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-8">

        {/* Big icon */}
        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-xl`}>
          <span className="text-4xl">{p.emoji}</span>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 shadow-sm">
            Coming Soon
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{p.label} Time Analyzer</h2>
          <p className="text-lg text-gray-500">{p.tagline}</p>
        </div>

        {/* Features grid */}
        {'features' in p && (
          <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What we&apos;ll analyze</p>
            <ul className="space-y-3">
              {(p.features as readonly string[]).map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: p.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How to export */}
        {'exportPath' in p && (
          <div className="w-full bg-white rounded-2xl border border-dashed border-gray-200 p-5 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">How to export your data</p>
            <p className="text-sm font-medium text-gray-700">{p.exportPath as string}</p>
          </div>
        )}

        <p className="text-sm text-gray-400">
          The user will provide their own data export — everything is processed 100% in your browser. No uploads, no servers.
        </p>
      </div>
    </div>
  );
}

// ─── Platform tab bar ─────────────────────────────────────────────────────────

function PlatformTabs({ active, onChange }: { active: PlatformId; onChange: (id: PlatformId) => void }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`
                flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all
                ${active === p.id
                  ? 'border-current text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-600'}
                ${!p.available && active !== p.id ? 'opacity-60' : ''}
              `}
              style={active === p.id ? { color: p.color, borderColor: p.color } : {}}
            >
              <span className="text-base leading-none">{p.emoji}</span>
              {p.label}
              {!p.available && (
                <span className="text-[10px] font-bold bg-gray-100 text-gray-400 rounded-full px-1.5 py-0.5 leading-none">
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SocialMediaTimeAnalyzerClient() {
  const [platform, setPlatform] = useState<PlatformId>('instagram');
  const current = PLATFORMS.find(p => p.id === platform)!;

  return (
    <div className="min-h-screen">
      {/* Site nav */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4" /> UnblockDevs Tools
          </Link>
        </div>
      </div>

      {/* Hero headline — visible before platform content */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-black text-gray-900">Social Media Time Analyzer</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload your data export to see exactly how much of your life you&apos;ve spent scrolling.
            100% private — processed in your browser, nothing uploaded.
          </p>
        </div>
      </div>

      {/* Platform tabs */}
      <PlatformTabs active={platform} onChange={setPlatform} />

      {/* Content */}
      {platform === 'instagram' ? (
        <div className="instagram-embed">
          <InstagramAnalyzerClient hideNav />
        </div>
      ) : (
        <ComingSoon p={current} />
      )}
    </div>
  );
}
