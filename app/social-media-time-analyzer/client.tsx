'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import InstagramAnalyzerClient, { decodeShare } from '../instagram-reels-analyzer/client';
import type { ShareSummary } from '../instagram-reels-analyzer/client';
import SharedView from './shared-view';
import ThreadsAnalyzerClient from '../threads-analyzer/client';

// ─── Platform logo SVG components ─────────────────────────────────────────────

function InstagramIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 3364.7 3364.7" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-bg0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse">
          <stop offset=".09" stopColor="#fa8f21"/>
          <stop offset=".78" stopColor="#d82d7e"/>
        </radialGradient>
        <radialGradient id="ig-bg1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse">
          <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"/>
          <stop offset="1" stopColor="#8c3aaa"/>
        </radialGradient>
      </defs>
      <path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#ig-bg0)"/>
      <path d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9" fill="url(#ig-bg1)"/>
      <path d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57" fill="#ffffff"/>
    </svg>
  );
}

function FacebookIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="126.445 2.281 589 589" xmlns="http://www.w3.org/2000/svg">
      <circle cx="420.945" cy="296.781" r="294.5" fill="#1877F2"/>
      <path d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z" fill="#ffffff"/>
    </svg>
  );
}

function TwitterXIcon({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size, background: '#000', borderRadius: size * 0.22 }}
      className="flex items-center justify-center"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" fill="white"/>
      </svg>
    </div>
  );
}

function YouTubeIcon({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size, background: '#FF0000', borderRadius: size * 0.22 }}
      className="flex items-center justify-center"
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 6.2s-.3-2-1.1-2.8c-1-.9-2.1-.9-2.6-.9C17 2.3 12 2.3 12 2.3s-5 0-7.8.2c-.5.1-1.6.1-2.6.9C.8 4.2.5 6.2.5 6.2S.2 8.5.2 10.8v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.1 2.8c1 .9 2.3.9 2.9.9C6.6 21.4 12 21.5 12 21.5s5 0 7.8-.3c.5-.1 1.6-.1 2.6-.9.8-.8 1.1-2.8 1.1-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.6zm-13.8 9.4V8.4l7 3.6-7 3.6z" fill="white"/>
      </svg>
    </div>
  );
}

function TikTokIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 250 195" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: size * 0.22, overflow: 'hidden' }}>
      <g clipRule="evenodd" fillRule="evenodd">
        <path d="M25 0h200c13.808 0 25 11.192 25 25v170H0V25C0 11.192 11.192 0 25 0z" fill="#010101"/>
        <path d="M156.98 140c7.607 0 13.774-6.117 13.774-13.662s-6.167-13.663-13.774-13.663h-2.075c7.607 0 13.774 6.118 13.774 13.663S162.512 140 154.905 140z" fill="#ee1d51"/>
        <path d="M154.717 112.675h-2.075c-7.607 0-13.775 6.118-13.775 13.663S145.035 140 152.642 140h2.075c-7.608 0-13.775-6.117-13.775-13.662s6.167-13.663 13.775-13.663z" fill="#66c8cf"/>
        <ellipse cx="154.811" cy="126.338" fill="#010101" rx="6.699" ry="6.643"/>
        <path d="M161.167 81.186c10.944 7.819 24.352 12.42 38.832 12.42V65.755a39.26 39.26 0 0 1-8.155-.853v21.923c-14.479 0-27.885-4.601-38.832-12.42v56.835c0 28.432-23.06 51.479-51.505 51.479-10.613 0-20.478-3.207-28.673-8.707C82.187 183.57 95.23 189.5 109.66 189.5c28.447 0 51.508-23.047 51.508-51.48V81.186zm10.06-28.098c-5.593-6.107-9.265-14-10.06-22.726V26.78h-7.728c1.945 11.09 8.58 20.565 17.788 26.308zm-80.402 99.107a23.445 23.445 0 0 1-4.806-14.256c0-13.004 10.548-23.547 23.561-23.547a23.6 23.6 0 0 1 7.147 1.103V87.022a51.97 51.97 0 0 0-8.152-.469v22.162a23.619 23.619 0 0 0-7.15-1.103c-13.013 0-23.56 10.543-23.56 23.548 0 9.195 5.272 17.157 12.96 21.035z" fill="#ee1d52"/>
        <path d="M153.012 74.405c10.947 7.819 24.353 12.42 38.832 12.42V64.902c-8.082-1.72-15.237-5.942-20.617-11.814-9.208-5.743-15.843-15.218-17.788-26.308H133.14v111.239c-.046 12.968-10.576 23.468-23.561 23.468-7.652 0-14.45-3.645-18.755-9.292-7.688-3.878-12.96-11.84-12.96-21.035 0-13.005 10.547-23.548 23.56-23.548 2.493 0 4.896.388 7.15 1.103V86.553c-27.945.577-50.42 23.399-50.42 51.467 0 14.011 5.597 26.713 14.68 35.993 8.195 5.5 18.06 8.707 28.673 8.707 28.445 0 51.505-23.048 51.505-51.479z" fill="#ffffff"/>
        <path d="M191.844 64.902v-5.928a38.84 38.84 0 0 1-20.617-5.887 38.948 38.948 0 0 0 20.617 11.815zM153.439 26.78a39.524 39.524 0 0 1-.427-3.198V20h-28.028v111.24c-.045 12.967-10.574 23.467-23.56 23.467-3.813 0-7.412-.904-10.6-2.512 4.305 5.647 11.103 9.292 18.755 9.292 12.984 0 23.515-10.5 23.561-23.468V26.78zm-44.864 59.773v-6.311a51.97 51.97 0 0 0-7.067-.479C73.06 79.763 50 102.811 50 131.24c0 17.824 9.063 33.532 22.835 42.772-9.083-9.28-14.68-21.982-14.68-35.993 0-28.067 22.474-50.889 50.42-51.466z" fill="#69c9d0"/>
      </g>
    </svg>
  );
}

function ThreadsIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
      <path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z"/>
      <path fill="#fff" fillRule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"/>
    </svg>
  );
}

function PlatformIcon({ id, size = 40 }: { id: string; size?: number }) {
  switch (id) {
    case 'instagram': return <InstagramIcon size={size} />;
    case 'facebook':  return <FacebookIcon size={size} />;
    case 'twitter':   return <TwitterXIcon size={size} />;
    case 'youtube':   return <YouTubeIcon size={size} />;
    case 'tiktok':    return <TikTokIcon size={size} />;
    case 'threads':   return <ThreadsIcon size={size} />;
    default:          return null;
  }
}

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
    bg: 'bg-gradient-to-br from-pink-50 to-orange-50',
    available: true,
    tagline: 'Reels, Stories, DMs & more',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    color: '#FF0000',
    gradient: 'from-red-600 to-red-400',
    bg: 'bg-gradient-to-br from-red-50 to-orange-50',
    available: false,
    tagline: 'Watch time & top channels',
    features: [
      'Total videos watched & estimated hours',
      'Top 10 channels you watched most',
      'Monthly watch count chart (last 12 months)',
    ],
    exportPath: 'Google Takeout → YouTube',
  },
  {
    id: 'facebook',
    label: 'Facebook',
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
  {
    id: 'threads',
    label: 'Threads',
    color: '#1c1c1c',
    gradient: 'from-gray-900 to-gray-700',
    bg: 'bg-gradient-to-br from-gray-50 to-slate-100',
    available: true,
    tagline: 'Posts, replies & activity',
    features: [
      'Total threads & replies posted',
      'Likes given & received over time',
      'Followers & following history',
      'Most active days & time patterns',
      'Reposts and quote threads',
      'Monthly engagement breakdown',
    ],
    exportPath: 'Meta Accounts Center → Download your information → Threads',
  },
];

type PlatformId = (typeof PLATFORMS)[number]['id'];

// ─── Coming Soon card ─────────────────────────────────────────────────────────

function ComingSoon({ p }: { p: (typeof PLATFORMS)[number] }) {
  return (
    <div className={`min-h-screen ${p.bg}`}>
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-8">

        <div className="w-20 h-20 flex items-center justify-center">
          <PlatformIcon id={p.id} size={80} />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 shadow-sm">
            Coming Soon
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{p.label} Time Analyzer</h2>
          <p className="text-lg text-gray-500">{p.tagline}</p>
        </div>

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

        {'exportPath' in p && (
          <div className="w-full bg-white rounded-2xl border border-dashed border-gray-200 p-5 text-left">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">How to export your data</p>
            <p className="text-sm font-medium text-gray-700">{p.exportPath as string}</p>
          </div>
        )}

        <p className="text-sm text-gray-400">
          Everything is processed 100% in your browser. No uploads, no servers.
        </p>
      </div>
    </div>
  );
}

// ─── YouTube Analyzer ────────────────────────────────────────────────────────

interface YTEntry { title: string; titleUrl?: string; time?: string; subtitles?: { name: string }[] }

interface YTAnalysis {
  totalVideos: number;
  estimatedHours: number;
  topChannels: { name: string; count: number }[];
  byMonth: { label: string; count: number }[];
}

function parseYouTubeHistory(json: unknown): YTAnalysis {
  if (!Array.isArray(json)) throw new Error('Expected an array of watch history entries. Make sure you uploaded watch-history.json from Google Takeout → YouTube.');
  const entries = json as YTEntry[];
  if (entries.length === 0) throw new Error('No watch history entries found in this file.');
  // Top channels
  const channelMap: Record<string, number> = {};
  const monthMap: Record<string, number> = {};
  for (const e of entries) {
    const channel = e.subtitles?.[0]?.name ?? '';
    if (channel) channelMap[channel] = (channelMap[channel] ?? 0) + 1;
    if (e.time) {
      try {
        const d = new Date(e.time);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
          monthMap[key] = (monthMap[key] ?? 0) + 1;
        }
      } catch { /* skip */ }
    }
  }
  const topChannels = Object.entries(channelMap)
    .sort(([,a],[,b]) => b - a).slice(0, 10)
    .map(([name, count]) => ({ name, count }));
  // Last 12 months
  const allKeys = Object.keys(monthMap).sort().slice(-12);
  const byMonth = allKeys.map(key => {
    const [yr, mo] = key.split('-');
    const d = new Date(Number(yr), Number(mo) - 1, 1);
    return { label: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }), count: monthMap[key] };
  });
  return {
    totalVideos: entries.length,
    estimatedHours: Math.round(entries.length * 5 / 60),
    topChannels,
    byMonth,
  };
}

function YouTubeAnalyzer() {
  const [state, setState] = useState<'upload' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<YTAnalysis | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    file.text().then(text => {
      try {
        const json = JSON.parse(text);
        const result = parseYouTubeHistory(json);
        setAnalysis(result);
        setState('done');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to parse file.');
        setState('error');
      }
    }).catch(() => { setError('Could not read file.'); setState('error'); });
  }

  if (state === 'done' && analysis) {
    const maxChannel = analysis.topChannels[0]?.count ?? 1;
    const maxMonth = Math.max(...analysis.byMonth.map(m => m.count), 1);
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900">YouTube Watch History</h2>
          <button onClick={() => { setState('upload'); setAnalysis(null); }} className="text-sm text-red-500 hover:text-red-600 font-medium">
            Analyze another file
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Videos watched</p>
            <p className="text-3xl font-black text-red-600">{analysis.totalVideos.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Estimated hours</p>
            <p className="text-3xl font-black text-red-600">{analysis.estimatedHours.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-0.5">~5 min avg per video</p>
          </div>
        </div>
        {/* Top Channels */}
        {analysis.topChannels.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-gray-900 mb-4">Top 10 Channels</h3>
            <div className="space-y-2.5">
              {analysis.topChannels.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300 w-5 text-right flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800 truncate pr-2">{c.name}</span>
                      <span className="text-xs tabular-nums text-gray-500 flex-shrink-0">{c.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-red-50 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(c.count / maxChannel) * 100}%`, background: i === 0 ? '#ef4444' : '#fca5a5' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Monthly chart */}
        {analysis.byMonth.length > 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-gray-900 mb-1">Monthly Watch Count</h3>
            <p className="text-xs text-gray-400 mb-4">Last 12 months</p>
            <div className="space-y-2">
              {analysis.byMonth.map(m => (
                <div key={m.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-12 flex-shrink-0">{m.label}</span>
                  <div className="flex-1 h-5 bg-red-50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full flex items-center pl-2" style={{ width: `${Math.max(4, (m.count / maxMonth) * 100)}%`, background: '#ef4444' }}>
                      <span className="text-[10px] text-white font-bold whitespace-nowrap">{m.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <p className="text-center text-xs text-gray-400">All processing happens in your browser. Nothing is uploaded.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <YouTubeIcon size={64} />
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1 text-xs font-bold text-red-600 uppercase tracking-wide mt-4 mb-2">
          Beta
        </div>
        <h2 className="text-2xl font-black text-gray-900 mt-2">YouTube Watch History</h2>
        <p className="text-sm text-gray-500 mt-1">Upload your <strong>watch-history.json</strong> from Google Takeout</p>
      </div>
      {/* How to export */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How to export from Google Takeout</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Open Google Takeout', b: 'Go to takeout.google.com and sign in.' },
            { n: 2, t: 'Deselect All, then select YouTube', b: 'Click "Deselect all", scroll down and check only YouTube.' },
            { n: 3, t: 'Choose watch-history only', b: 'Under YouTube, click "All YouTube data included" and select only "history".' },
            { n: 4, t: 'Set format to JSON', b: 'Change the export format from HTML to JSON.' },
            { n: 5, t: 'Download and extract', b: 'Download the ZIP and find watch-history.json inside the Takeout/YouTube/history/ folder.' },
          ].map(s => (
            <li key={s.n} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{s.n}</span>
              <div>
                <div className="text-sm font-bold text-gray-800">{s.t}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.b}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Upload zone */}
      <div
        className="border-2 border-dashed border-red-200 rounded-2xl p-8 text-center cursor-pointer hover:bg-red-50 transition-all"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept=".json" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-sm font-bold text-gray-700 mb-1">Drop watch-history.json here</p>
        <p className="text-xs text-gray-400">or click to browse · .json file only</p>
      </div>
      {state === 'error' && (
        <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
          <strong>Error:</strong> {error}
          <p className="text-xs mt-1 text-red-600">
            Make sure you selected the <strong>JSON format</strong> in Google Takeout, not HTML.{' '}
            <a href="https://takeout.google.com" target="_blank" rel="noopener noreferrer" className="underline">Go to Takeout</a>
          </p>
        </div>
      )}
      <p className="text-center text-xs text-gray-400">100% private — processing happens in your browser</p>
    </div>
  );
}

// ─── Platform selector cards ──────────────────────────────────────────────────

function PlatformSelector({ active, onChange }: { active: PlatformId; onChange: (id: PlatformId) => void }) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Choose your platform
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {PLATFORMS.map(p => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange(p.id)}
                className={`
                  relative flex flex-col items-center gap-2.5 py-3.5 px-2 rounded-2xl border-2 transition-all duration-200
                  ${isActive
                    ? 'shadow-lg'
                    : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm'}
                  ${!p.available && !isActive ? 'opacity-60' : ''}
                `}
                style={isActive ? {
                  borderColor: p.color,
                  backgroundColor: `${p.color}0f`,
                  boxShadow: `0 4px 18px ${p.color}28`,
                } : {}}
              >
                {/* Official logo */}
                <div className="flex items-center justify-center">
                  <PlatformIcon id={p.id} size={44} />
                </div>

                {/* Platform name */}
                <div className="text-center">
                  <div className={`text-[11px] font-bold leading-tight ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {p.label}
                  </div>
                  {!p.available && (
                    <div className="text-[9px] font-bold text-gray-300 mt-0.5 uppercase tracking-wide">
                      Soon
                    </div>
                  )}
                  {p.available && (
                    <div className="text-[9px] font-bold mt-0.5 uppercase tracking-wide" style={{ color: p.color }}>
                      Available
                    </div>
                  )}
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ background: p.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SocialMediaTimeAnalyzerClient() {
  const [platform, setPlatform] = useState<PlatformId>('instagram');
  const [sharedData, setSharedData] = useState<ShareSummary | null>(null);
  const current = PLATFORMS.find(p => p.id === platform)!;

  useEffect(() => {
    // New format: ?share= (query param — social bots can crawl for OG preview)
    const params = new URLSearchParams(window.location.search);
    const shareParam = params.get('share');
    if (shareParam) {
      const decoded = decodeShare(shareParam);
      if (decoded) { setSharedData(decoded); return; }
    }
    // Backward compat: old #share= hash format
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      const decoded = decodeShare(hash.slice(7));
      if (decoded) setSharedData(decoded);
    }
  }, []);

  if (sharedData) return <SharedView share={sharedData} />;

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

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-black text-gray-900">Social Media Time Analyzer</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-lg">
            Upload your data export to see exactly how much of your life you&apos;ve spent scrolling.
            100% private — processed in your browser, nothing uploaded.
          </p>
        </div>
      </div>

      {/* Platform selector */}
      <PlatformSelector active={platform} onChange={setPlatform} />

      {/* Content */}
      {platform === 'instagram' ? (
        <div className="instagram-embed">
          <InstagramAnalyzerClient hideNav />
        </div>
      ) : platform === 'threads' ? (
        <ThreadsAnalyzerClient hideNav />
      ) : (
        <ComingSoon p={current} />
      )}
    </div>
  );
}
