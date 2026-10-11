'use client';

import { useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';
import { Upload, Users, Heart, Calendar, TrendingUp, Shield, UserPlus, Ban } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FollowerEntry {
  username: string;
  displayName: string;
  timestamp: number;
}

interface LikeEntry {
  author: string;
  postUrl: string;
  timestamp: number;
}

interface ThreadsData {
  username: string;
  displayName: string;
  followers: FollowerEntry[];
  following: FollowerEntry[];
  likes: LikeEntry[];
  blocked: number;
  restricted: number;
  pendingRequests: number;
  recentFollowRequests: number;
}

interface MonthBar {
  month: string;
  likes: number;
  following: number;
}

interface ThreadsAnalysis {
  data: ThreadsData;
  joinedDate: number;
  latestDate: number;
  spanDays: number;
  likesPerDay: number;
  peakMonthLabel: string;
  peakMonthLikes: number;
  byMonth: MonthBar[];
  topLikedAccounts: { name: string; count: number }[];
  followingRatio: number;
  heatmapData: { dateStr: string; count: number; dow: number; weekIdx: number }[];
  mostActiveDay: string;
  mostActiveHour: number;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

function buildSampleThreads(): ThreadsAnalysis {
  const todayDate = new Date(); todayDate.setHours(0,0,0,0);
  const startDate = new Date(todayDate); startDate.setDate(startDate.getDate() - 364);
  const heatmapData: { dateStr: string; count: number; dow: number; weekIdx: number }[] = [];
  let dayIdx = 0;
  let maxCount = 0, maxDateStr = '';
  for (let cur = new Date(startDate); cur <= todayDate; cur.setDate(cur.getDate() + 1)) {
    const ds = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`;
    const weekIdx = Math.floor(dayIdx / 7);
    const base = [0, 6].includes(cur.getDay()) ? 15 : 10;
    const count = Math.max(0, Math.round(base + Math.sin(dayIdx * 0.15) * 7 + Math.sin(dayIdx * 0.7) * 3));
    if (count > maxCount) { maxCount = count; maxDateStr = ds; }
    heatmapData.push({ dateStr: ds, count, dow: cur.getDay(), weekIdx });
    dayIdx++;
  }
  const mostActiveDay = maxDateStr
    ? new Date(maxDateStr + 'T12:00:00').toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'short', year:'numeric' })
    : 'Saturday, 14 Dec 2024';
  const joinedDate = 1690848000; // Aug 1, 2023
  const latestDate = Math.floor(todayDate.getTime() / 1000);
  const spanDays = Math.max(1, Math.floor((latestDate - joinedDate) / 86400));
  const totalLikes = 8492;
  return {
    data: {
      username: 'sample_account',
      displayName: 'Sample User',
      followers: Array<FollowerEntry>(1847).fill({ username: '', displayName: '', timestamp: 0 }),
      following: Array<FollowerEntry>(892).fill({ username: '', displayName: '', timestamp: 0 }),
      likes: Array<LikeEntry>(totalLikes).fill({ author: '', postUrl: '', timestamp: 0 }),
      blocked: 12, restricted: 8, pendingRequests: 3, recentFollowRequests: 7,
    },
    joinedDate, latestDate, spanDays,
    likesPerDay: totalLikes / spanDays,
    peakMonthLabel: 'December 2023',
    peakMonthLikes: 847,
    byMonth: [
      { month: 'Aug 2023', likes: 234, following: 156 }, { month: 'Sep 2023', likes: 412, following: 89 },
      { month: 'Oct 2023', likes: 589, following: 67 }, { month: 'Nov 2023', likes: 734, following: 52 },
      { month: 'Dec 2023', likes: 847, following: 81 }, { month: 'Jan 2024', likes: 712, following: 43 },
      { month: 'Feb 2024', likes: 634, following: 38 }, { month: 'Mar 2024', likes: 698, following: 55 },
      { month: 'Apr 2024', likes: 523, following: 29 }, { month: 'May 2024', likes: 612, following: 47 },
      { month: 'Jun 2024', likes: 589, following: 33 }, { month: 'Jul 2024', likes: 534, following: 28 },
      { month: 'Aug 2024', likes: 487, following: 22 }, { month: 'Sep 2024', likes: 456, following: 19 },
      { month: 'Oct 2024', likes: 431, following: 31 },
    ],
    topLikedAccounts: [
      { name: 'design_inspo', count: 234 }, { name: 'techbuilder', count: 189 },
      { name: 'mindful_dev', count: 156 }, { name: 'frontend_tips', count: 134 },
      { name: 'startup_founder', count: 112 }, { name: 'code_daily', count: 98 },
      { name: 'ux_patterns', count: 87 }, { name: 'nomad_life', count: 76 },
      { name: 'book_notes_', count: 65 }, { name: 'ai_weekly', count: 58 },
    ],
    followingRatio: 892 / 1847,
    heatmapData, mostActiveDay, mostActiveHour: 21,
  };
}

const SAMPLE_THREADS = buildSampleThreads();

// ─── ZIP parser ────────────────────────────────────────────────────────────────

function extractFollowers(raw: unknown): FollowerEntry[] {
  const out: FollowerEntry[] = [];
  try {
    const obj = raw as Record<string, unknown>;
    const key = Object.keys(obj).find(k => k.includes('follower') || k.includes('following'));
    const list = key ? (obj[key] as unknown[]) : (raw as unknown[]);
    for (const item of list) {
      const it = item as { title: string; string_list_data?: { href: string; value: string; timestamp: number }[] };
      const sld = it.string_list_data?.[0];
      if (sld?.timestamp) {
        out.push({
          username: sld.value ?? '',
          displayName: it.title ?? '',
          timestamp: sld.timestamp,
        });
      }
    }
  } catch { /* skip */ }
  return out;
}

function extractLikes(raw: unknown): LikeEntry[] {
  const out: LikeEntry[] = [];
  try {
    const obj = raw as Record<string, unknown>;
    const key = Object.keys(obj).find(k => k.includes('like') || k.includes('media'));
    const list = key ? (obj[key] as unknown[]) : (raw as unknown[]);
    for (const item of list) {
      const it = item as { title: string; string_list_data?: { href: string; value: string; timestamp: number }[] };
      const sld = it.string_list_data?.[0];
      if (sld?.timestamp) {
        out.push({
          author: it.title ?? '',
          postUrl: sld.href ?? '',
          timestamp: sld.timestamp,
        });
      }
    }
  } catch { /* skip */ }
  return out;
}

async function parseThreadsZip(file: File): Promise<ThreadsData> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(file);

  const result: ThreadsData = {
    username: '', displayName: '',
    followers: [], following: [], likes: [],
    blocked: 0, restricted: 0, pendingRequests: 0, recentFollowRequests: 0,
  };

  for (const [name, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const base = name.split('/').pop()?.toLowerCase() ?? '';
    let json: unknown;
    try { json = JSON.parse(await entry.async('text')); } catch { continue; }

    if (base === 'personal_information.json' && name.includes('threads')) {
      try {
        const obj = json as Record<string, unknown>;
        const key = Object.keys(obj)[0];
        const profile = (obj[key] as { string_map_data?: Record<string, { value?: string }> }[])[0];
        const smd = profile?.string_map_data ?? {};
        result.username = smd['Username']?.value ?? '';
        result.displayName = smd['Name']?.value ?? '';
      } catch { /* skip */ }
      continue;
    }

    if (base === 'followers.json')              { result.followers = extractFollowers(json); continue; }
    if (base === 'following.json')              { result.following = extractFollowers(json); continue; }
    if (base === 'liked_threads.json')          { result.likes = extractLikes(json); continue; }
    if (base === 'blocked_profiles.json')       { result.blocked = Array.isArray(json) ? json.length : 0; continue; }
    if (base === 'restricted_profiles.json')    { result.restricted = Array.isArray(json) ? json.length : 0; continue; }
    if (base === 'pending_follow_requests.json'){ result.pendingRequests = Array.isArray(json) ? json.length : (json as Record<string, unknown[]>)[Object.keys(json as object)[0]]?.length ?? 0; continue; }
    if (base === 'recent_follow_requests.json') { result.recentFollowRequests = Array.isArray(json) ? json.length : (json as Record<string, unknown[]>)[Object.keys(json as object)[0]]?.length ?? 0; continue; }
  }

  return result;
}

// ─── Analysis ──────────────────────────────────────────────────────────────────

function computeAnalysis(data: ThreadsData): ThreadsAnalysis {
  const allTs = [
    ...data.likes.map(l => l.timestamp),
    ...data.following.map(f => f.timestamp),
    ...data.followers.map(f => f.timestamp),
  ].filter(Boolean).sort((a, b) => a - b);

  const joinedDate = allTs[0] ?? 0;
  const latestDate = allTs[allTs.length - 1] ?? 0;
  const spanDays = joinedDate && latestDate ? Math.round((latestDate - joinedDate) / 86400) : 0;
  const likesPerDay = spanDays > 0 ? data.likes.length / spanDays : 0;

  // Monthly breakdown for likes + following
  const monthLikes: Record<string, number> = {};
  const monthFollowing: Record<string, number> = {};

  for (const l of data.likes) {
    const d = new Date(l.timestamp * 1000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthLikes[key] = (monthLikes[key] ?? 0) + 1;
  }
  for (const f of data.following) {
    const d = new Date(f.timestamp * 1000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthFollowing[key] = (monthFollowing[key] ?? 0) + 1;
  }

  // Build sorted month list from min to max
  const allKeys = new Set([...Object.keys(monthLikes), ...Object.keys(monthFollowing)]);
  const byMonth: MonthBar[] = Array.from(allKeys)
    .sort()
    .map(key => {
      const [yr, mo] = key.split('-');
      const d = new Date(Number(yr), Number(mo) - 1, 1);
      return {
        month: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        likes: monthLikes[key] ?? 0,
        following: monthFollowing[key] ?? 0,
      };
    });

  // Peak month
  let peakKey = '', peakMonthLikes = 0;
  for (const [k, v] of Object.entries(monthLikes)) {
    if (v > peakMonthLikes) { peakMonthLikes = v; peakKey = k; }
  }
  const peakMonthLabel = peakKey
    ? new Date(Number(peakKey.split('-')[0]), Number(peakKey.split('-')[1]) - 1, 1)
        .toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '';

  // Top liked accounts
  const authorCount: Record<string, number> = {};
  for (const l of data.likes) authorCount[l.author] = (authorCount[l.author] ?? 0) + 1;
  const topLikedAccounts = Object.entries(authorCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const followingRatio = data.followers.length > 0 ? data.following.length / data.followers.length : 0;

  // Heatmap: daily like counts for last ~52 weeks
  const dayCount: Record<string, number> = {};
  for (const l of data.likes) {
    const d = new Date(l.timestamp * 1000);
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    dayCount[ds] = (dayCount[ds] ?? 0) + 1;
  }
  const todayDate = new Date(); todayDate.setHours(0,0,0,0);
  const startDate = new Date(todayDate); startDate.setDate(startDate.getDate() - 364);
  const heatmapData: { dateStr: string; count: number; dow: number; weekIdx: number }[] = [];
  for (let cur = new Date(startDate); cur <= todayDate; cur.setDate(cur.getDate() + 1)) {
    const ds = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`;
    const weekIdx = Math.floor((cur.getTime() - startDate.getTime()) / (7 * 86400000));
    heatmapData.push({ dateStr: ds, count: dayCount[ds] ?? 0, dow: cur.getDay(), weekIdx });
  }
  let maxDayCount = 0, maxDayStr = '';
  for (const [ds, cnt] of Object.entries(dayCount)) { if (cnt > maxDayCount) { maxDayCount = cnt; maxDayStr = ds; } }
  const mostActiveDay = maxDayStr
    ? new Date(maxDayStr + 'T12:00:00').toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'short', year:'numeric' })
    : '';
  const hourCount: Record<number, number> = {};
  for (const l of data.likes) { const h = new Date(l.timestamp * 1000).getHours(); hourCount[h] = (hourCount[h] ?? 0) + 1; }
  let mostActiveHour = 0, maxHC = 0;
  for (const [h, c] of Object.entries(hourCount)) { if (c > maxHC) { maxHC = c; mostActiveHour = Number(h); } }

  return { data, joinedDate, latestDate, spanDays, likesPerDay, peakMonthLabel, peakMonthLikes, byMonth, topLikedAccounts, followingRatio, heatmapData, mostActiveDay, mostActiveHour };
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Upload screen ─────────────────────────────────────────────────────────────

function UploadScreen({ onFile, onSample }: { onFile: (f: File) => void; onSample?: () => void }) {
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (f.name.endsWith('.zip')) onFile(f);
  }, [onFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-xl mx-auto px-4 pt-16 pb-20">
        {/* Intro */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black shadow-xl mb-4">
            <svg width="36" height="36" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z"/>
              <path fill="#fff" fillRule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Threads Data Analyzer</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Drop your Threads data export ZIP to see your activity — likes, social graph, and more.
          </p>
        </div>

        {/* Download guide */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">How to download your Threads data</p>
          <ol className="space-y-4">
            {[
              { n: 1, title: 'Open Meta Accounts Center', body: 'Go to accountscenter.facebook.com or open Instagram → Menu → Accounts Center.' },
              { n: 2, title: 'Tap "Your information and permissions"', body: 'Then select "Download your information".' },
              { n: 3, title: 'Choose "Download or transfer information"', body: 'Select your Threads account.' },
              { n: 4, title: 'Pick "Some of your information"', body: 'Then choose Threads-specific data (followers, following, likes).' },
              { n: 5, title: 'Set Format to JSON', body: 'This is critical — select JSON, not HTML. Then tap "Create files".' },
              { n: 6, title: 'Wait for the email & download', body: 'Meta sends an email when ready. Download the ZIP and drop it here.' },
            ].map(step => (
              <li key={step.n} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {step.n}
                </span>
                <div>
                  <div className="text-sm font-bold text-gray-800">{step.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer
            ${dragging ? 'border-black bg-gray-50 scale-[1.01]' : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'}`}
          onClick={() => document.getElementById('threads-file-input')?.click()}
        >
          <input
            id="threads-file-input"
            type="file"
            accept=".zip"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-bold text-gray-700 mb-1">Drop your Threads ZIP here</p>
          <p className="text-xs text-gray-400">or click to browse · .zip file only</p>
        </div>

        {onSample && (
          <button
            type="button"
            onClick={onSample}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-300"
          >
            <span>👀</span> See a sample result first
          </button>
        )}

        <p className="text-center text-xs text-gray-400 mt-4">
          100% private — all processing happens in your browser. Nothing is uploaded.
        </p>
      </div>
    </div>
  );
}

// ─── Activity Heatmap ─────────────────────────────────────────────────────────

function ActivityHeatmap({ heatmapData, mostActiveDay, mostActiveHour }: {
  heatmapData: ThreadsAnalysis['heatmapData'];
  mostActiveDay: string;
  mostActiveHour: number;
}) {
  const maxCount = Math.max(...heatmapData.map(d => d.count), 1);
  const weeks = Math.max(...heatmapData.map(d => d.weekIdx), 0) + 1;
  const DOW_LABELS = ['S','M','T','W','T','F','S'];

  function shade(count: number): string {
    if (count === 0) return '#f3f4f6';
    const r = count / maxCount;
    if (r < 0.2) return '#d1d5db';
    if (r < 0.4) return '#6b7280';
    if (r < 0.6) return '#374151';
    if (r < 0.8) return '#1f2937';
    return '#111827';
  }

  const hourLabel = mostActiveHour === 0 ? '12am' : mostActiveHour < 12 ? `${mostActiveHour}am` : mostActiveHour === 12 ? '12pm' : `${mostActiveHour - 12}pm`;

  // Build a 2D map for lookup: weekIdx-dow → count
  const cellMap: Record<string, number> = {};
  for (const d of heatmapData) cellMap[`${d.weekIdx}-${d.dow}`] = d.count;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-black text-gray-900 mb-1">Like Activity Heatmap</h3>
      <p className="text-xs text-gray-400 mb-4">Daily likes given — last 52 weeks</p>
      <div className="flex gap-2 items-start" style={{ overflowX: 'auto' }}>
        {/* Day labels */}
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 10px)', gap: '2px', paddingTop: 0 }}>
          {DOW_LABELS.map((l, i) => (
            <span key={i} style={{ fontSize: 8, color: '#9ca3af', lineHeight: '10px', width: 8 }}>{l}</span>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 10px)', gridTemplateColumns: `repeat(${weeks}, 10px)`, gap: '2px', flexShrink: 0 }}>
          {Array.from({ length: weeks }, (_, wi) =>
            Array.from({ length: 7 }, (_, dow) => {
              const count = cellMap[`${wi}-${dow}`] ?? 0;
              return (
                <div
                  key={`${wi}-${dow}`}
                  title={count > 0 ? `${count} likes` : ''}
                  style={{ gridRow: dow + 1, gridColumn: wi + 1, width: 10, height: 10, borderRadius: 2, background: shade(count) }}
                />
              );
            })
          )}
        </div>
      </div>
      {(mostActiveDay || mostActiveHour !== undefined) && (
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
          {mostActiveDay && <span>Most active day: <span className="font-bold text-gray-800">{mostActiveDay}</span></span>}
          <span>Most active hour: <span className="font-bold text-gray-800">{hourLabel}</span></span>
        </div>
      )}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
        <span>Less</span>
        {['#f3f4f6','#d1d5db','#6b7280','#374151','#1f2937','#111827'].map(c => (
          <span key={c} style={{ width: 10, height: 10, background: c, borderRadius: 2, display: 'inline-block' }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ─── Share Insights Modal ─────────────────────────────────────────────────────

function ShareInsightsModal({ analysis, onClose }: { analysis: ThreadsAnalysis; onClose: () => void }) {
  const { data, topLikedAccounts } = analysis;
  const [copied, setCopied] = useState(false);
  const text = `I analyzed my Threads data: ${data.followers.length.toLocaleString()} followers, ${data.following.length.toLocaleString()} following, ${data.likes.length.toLocaleString()} likes given. Most liked: @${topLikedAccounts[0]?.name ?? 'N/A'}. Generated with unblockdevs.com`;
  const shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`;

  function copyText() {
    navigator.clipboard.writeText(text).catch(() => {}).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-sm font-black text-gray-900 mb-1">Share your Threads insights</h3>
        <p className="text-xs text-gray-400 mb-4">Pre-formatted text ready to share</p>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-4 leading-relaxed border border-gray-200 select-all">
          {text}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyText}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 text-center hover:bg-gray-200 transition-all"
          >
            Share on Threads
          </a>
          <button onClick={onClose} className="py-2.5 px-3 rounded-xl text-sm text-gray-400 hover:text-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Analysis results ─────────────────────────────────────────────────────────

const CHART_COLORS = ['#111827', '#374151', '#6b7280', '#9ca3af'];

function StatCard({ icon, label, value, sub, accent = false }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? 'bg-black text-white' : 'bg-white border border-gray-100 shadow-sm'}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent ? 'bg-white/10' : 'bg-gray-50'}`}>
        <span className={accent ? 'text-white' : 'text-gray-600'}>{icon}</span>
      </div>
      <div className={`text-2xl font-black leading-none mb-1 ${accent ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className={`text-xs font-bold uppercase tracking-wide ${accent ? 'text-white/60' : 'text-gray-400'}`}>
        {label}
      </div>
      {sub && (
        <div className={`text-[11px] mt-1.5 ${accent ? 'text-white/50' : 'text-gray-400'}`}>{sub}</div>
      )}
    </div>
  );
}

function ResultsScreen({ analysis }: { analysis: ThreadsAnalysis }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const { data, joinedDate, spanDays, likesPerDay, peakMonthLabel, peakMonthLikes, byMonth, topLikedAccounts, followingRatio, heatmapData, mostActiveDay, mostActiveHour } = analysis;

  const joinedYear = joinedDate ? new Date(joinedDate * 1000).getFullYear() : null;
  const likesPerDayLabel = likesPerDay < 0.1 ? 'very low' : likesPerDay < 0.5 ? 'light' : likesPerDay < 2 ? 'moderate' : 'active';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path fill="#fff" fillRule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"/>
              </svg>
            </div>
            <div>
              <div className="text-lg font-black">
                {data.displayName || data.username || 'Your Threads'}
              </div>
              {data.username && data.displayName && (
                <div className="text-sm text-white/50">@{data.username}</div>
              )}
            </div>
          </div>
          <p className="text-white/60 text-sm">
            {joinedYear && `On Threads since ${joinedYear} · `}
            {spanDays > 0 && `${spanDays.toLocaleString()} days of activity`}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Core stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Heart size={18} />}
            label="Likes Given"
            value={data.likes.length.toLocaleString('en-IN')}
            sub={`${likesPerDay.toFixed(2)}/day avg — ${likesPerDayLabel}`}
            accent
          />
          <StatCard
            icon={<Users size={18} />}
            label="Followers"
            value={data.followers.length}
          />
          <StatCard
            icon={<UserPlus size={18} />}
            label="Following"
            value={data.following.length}
            sub={followingRatio > 1 ? `${followingRatio.toFixed(1)}× more than follow you` : undefined}
          />
          <StatCard
            icon={<Calendar size={18} />}
            label="Days Active"
            value={spanDays > 0 ? spanDays.toLocaleString('en-IN') : '—'}
            sub={joinedDate ? `Joined ${fmtDate(joinedDate)}` : undefined}
          />
        </div>

        {/* Insight cards */}
        {(data.blocked > 0 || peakMonthLabel) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.blocked > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Ban size={18} className="text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{data.blocked.toLocaleString('en-IN')}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Accounts Blocked</div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    You&apos;ve actively curated your feed — that&apos;s {Math.round(data.blocked / Math.max(data.following.length, 1))}× your following count.
                  </div>
                </div>
              </div>
            )}
            {peakMonthLabel && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} className="text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{peakMonthLikes}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">Likes in Peak Month</div>
                  <div className="text-[11px] text-gray-400 mt-1">Your most active period was {peakMonthLabel}.</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Monthly likes chart */}
        {byMonth.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-gray-900 mb-1">Monthly Activity</h3>
            <p className="text-xs text-gray-400 mb-5">Likes you gave per month</p>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byMonth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number | string | undefined, name?: string) => [v ?? 0, name === 'likes' ? 'Likes' : 'New Following'] as [number | string, string]}
                  />
                  <Bar dataKey="likes" name="likes" fill="#111827" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Activity heatmap */}
        {heatmapData.some(d => d.count > 0) && (
          <ActivityHeatmap heatmapData={heatmapData} mostActiveDay={mostActiveDay} mostActiveHour={mostActiveHour} />
        )}

        {/* Two-column: top accounts + social graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Top liked accounts */}
          {topLikedAccounts.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-black text-gray-900 mb-1">Most Liked Accounts</h3>
              <p className="text-xs text-gray-400 mb-4">Accounts whose threads you liked most</p>
              <ul className="space-y-2.5">
                {topLikedAccounts.slice(0, 8).map((acc, i) => {
                  const engRate = data.likes.length > 0 ? (acc.count / data.likes.length) * 100 : 0;
                  return (
                    <li key={acc.name} className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-gray-300 w-4 text-right">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">@{acc.name}</div>
                        <div className="text-[10px] text-gray-400">~{engRate.toFixed(1)}% interaction rate</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-1.5 rounded-full bg-black"
                          style={{ width: `${Math.max(8, Math.round((acc.count / topLikedAccounts[0].count) * 60))}px` }}
                        />
                        <span className="text-xs font-bold text-gray-400 w-5 text-right">{acc.count}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Social graph */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-gray-900 mb-1">Social Graph</h3>
            <p className="text-xs text-gray-400 mb-4">Your network on Threads</p>
            <div className="space-y-4">
              {[
                { label: 'Followers', value: data.followers.length, color: '#111827' },
                { label: 'Following', value: data.following.length, color: '#6b7280' },
                { label: 'Pending requests sent', value: data.pendingRequests, color: '#d1d5db' },
                { label: 'Recent follow requests', value: data.recentFollowRequests, color: '#e5e7eb' },
              ].map(row => {
                const max = Math.max(data.followers.length, data.following.length, 1);
                return (
                  <div key={row.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 font-medium">{row.label}</span>
                      <span className="text-xs font-black text-gray-900">{row.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.max(2, Math.round((row.value / max) * 100))}%`, background: row.color }}
                      />
                    </div>
                  </div>
                );
              })}

              {data.restricted > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Shield size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{data.restricted} restricted accounts</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insight summary */}
        <div className="bg-black rounded-2xl p-5 text-white">
          <h3 className="text-sm font-black mb-3">Your Threads in a nutshell</h3>
          <ul className="space-y-2 text-sm text-white/75">
            {joinedDate && (
              <li>→ You&apos;ve been on Threads since <span className="text-white font-bold">{fmtDate(joinedDate)}</span></li>
            )}
            <li>→ You&apos;ve liked <span className="text-white font-bold">{data.likes.length} threads</span> at a rate of <span className="text-white font-bold">{likesPerDay.toFixed(2)}/day</span></li>
            {data.following.length > data.followers.length && (
              <li>→ You follow <span className="text-white font-bold">{data.following.length - data.followers.length} more people</span> than follow you back</li>
            )}
            {data.following.length < data.followers.length && (
              <li>→ More people follow you than you follow — a <span className="text-white font-bold">{(data.followers.length / Math.max(data.following.length, 1)).toFixed(1)}× follower ratio</span></li>
            )}
            {data.blocked > 0 && (
              <li>→ You&apos;ve blocked <span className="text-white font-bold">{data.blocked} accounts</span> — you take your feed quality seriously</li>
            )}
            {peakMonthLabel && (
              <li>→ Your most active month was <span className="text-white font-bold">{peakMonthLabel}</span> with {peakMonthLikes} likes</li>
            )}
          </ul>
        </div>

        {/* Share insights */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold bg-black text-white hover:bg-gray-800 transition-all shadow-sm"
          >
            Share insights
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          All data processed 100% in your browser · Nothing uploaded or stored
        </p>
      </div>
      {showShareModal && <ShareInsightsModal analysis={analysis} onClose={() => setShowShareModal(false)} />}
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function ThreadsAnalyzerClient({ hideNav }: { hideNav?: boolean }) {
  const [state, setState] = useState<'upload' | 'parsing' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<ThreadsAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSample, setIsSample] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setState('parsing');
    setIsSample(false);
    try {
      const data = await parseThreadsZip(file);
      const result = computeAnalysis(data);
      setAnalysis(result);
      setState('done');
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Failed to parse file');
      setState('error');
    }
  }, []);

  const reset = useCallback(() => { setState('upload'); setAnalysis(null); setErrorMsg(''); setIsSample(false); }, []);

  if (state === 'parsing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-black mx-auto mb-4 flex items-center justify-center animate-pulse">
            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path fill="#fff" fillRule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"/>
            </svg>
          </div>
          <p className="text-sm font-bold text-gray-700">Analyzing your Threads data…</p>
          <p className="text-xs text-gray-400 mt-1">100% private — nothing leaves your browser</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-bold text-red-600 mb-2">Failed to parse file</p>
          <p className="text-xs text-gray-400 mb-4">{errorMsg}</p>
          <button onClick={reset} className="text-sm font-bold text-black underline">Try again</button>
        </div>
      </div>
    );
  }

  if (state === 'done' && analysis) {
    return (
      <div>
        {isSample && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-sm text-amber-800 font-medium">📊 Sample data — not your real account</span>
            <button onClick={reset} className="text-xs font-bold text-amber-700 hover:text-amber-900 whitespace-nowrap">
              Analyze yours →
            </button>
          </div>
        )}
        <ResultsScreen analysis={analysis} />
      </div>
    );
  }

  return (
    <UploadScreen
      onFile={handleFile}
      onSample={() => { setAnalysis(SAMPLE_THREADS); setState('done'); setIsSample(true); }}
    />
  );
}
