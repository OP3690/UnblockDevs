'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FBAnalysis {
  totalPosts: number;
  totalReactions: number;
  totalComments: number;
  totalGroupComments: number;
  reactionBreakdown: { type: string; count: number; emoji: string; color: string; label: string }[];
  byYear: { year: number; count: number }[];
  byHour: { hour: number; count: number }[];
  earliestYear: number;
  latestYear: number;
  estimatedHours: number;
  estimatedDays: number;
  peakHour: number;
  peakYear: number;
  userName: string;
  foundFiles: string[];
}

const REACTION_META: Record<string, { emoji: string; color: string; label: string }> = {
  LIKE:    { emoji: '👍', color: '#1877F2', label: 'Like' },
  LOVE:    { emoji: '❤️', color: '#f43f5e', label: 'Love' },
  HAHA:    { emoji: '😂', color: '#f59e0b', label: 'Haha' },
  WOW:     { emoji: '😮', color: '#8b5cf6', label: 'Wow' },
  SORRY:   { emoji: '😢', color: '#64748b', label: 'Sad' },
  ANGER:   { emoji: '😠', color: '#ef4444', label: 'Angry' },
  THANKFUL:{ emoji: '🙏', color: '#10b981', label: 'Thankful' },
  PRIDE:   { emoji: '🏳️‍🌈', color: '#e879f9', label: 'Pride' },
  CARE:    { emoji: '🤗', color: '#fb923c', label: 'Care' },
};

// ─── ZIP parser ───────────────────────────────────────────────────────────────

async function parseFBZip(file: File): Promise<FBAnalysis> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(file);

  const allTimestamps: number[] = [];
  let totalPosts = 0;
  let totalReactions = 0;
  let totalComments = 0;
  let totalGroupComments = 0;
  const reactionCounts: Record<string, number> = {};
  const hourCounts: Record<number, number> = {};
  const yearCounts: Record<number, number> = {};
  const foundFiles: string[] = [];
  let userName = '';

  // Helper to record a timestamp
  function recordTs(ts: number) {
    if (ts < 1_000_000_000 || ts > 9_999_999_999) return;
    allTimestamps.push(ts);
    const d = new Date(ts * 1000);
    const h = d.getHours();
    const y = d.getFullYear();
    hourCounts[h] = (hourCounts[h] ?? 0) + 1;
    yearCounts[y] = (yearCounts[y] ?? 0) + 1;
  }

  const files = Object.entries(zip.files);

  // Try to get user name from profile info
  for (const [name, entry] of files) {
    if (entry.dir) continue;
    if (name.includes('profile_information/profile_information.json') ||
        name.includes('profile_information.json')) {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown>;
        // Try multiple paths
        const profile = (json['profile_v2'] as Record<string, unknown>[])?.[0];
        if (profile?.name) { userName = String(profile.name); break; }
      } catch { /* skip */ }
    }
  }

  for (const [name, entry] of files) {
    if (entry.dir) continue;
    const base = name.split('/').pop()?.toLowerCase() ?? '';
    const pathLower = name.toLowerCase();

    // Posts
    if (pathLower.includes('/posts/') && base.startsWith('your_posts__check_ins')) {
      try {
        const json = JSON.parse(await entry.async('text')) as unknown[];
        if (Array.isArray(json)) {
          for (const item of json) {
            const ts = (item as Record<string, number>).timestamp;
            if (ts) { recordTs(ts); totalPosts++; }
          }
          foundFiles.push('posts');
        }
      } catch { /* skip */ }
      continue;
    }

    // Reactions / likes  (likes_and_reactions*.json)
    if (base.startsWith('likes_and_reactions') && base.endsWith('.json') &&
        pathLower.includes('comments_and_reactions')) {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown>;
        // Key is "reactions_v2" or top-level array
        let items: unknown[] = [];
        if (Array.isArray(json)) {
          items = json;
        } else {
          const key = Object.keys(json).find(k => k.includes('reaction') || k.includes('like'));
          if (key && Array.isArray(json[key])) items = json[key] as unknown[];
        }
        for (const item of items) {
          const i = item as Record<string, unknown>;
          const ts = Number(i.timestamp);
          if (ts) { recordTs(ts); totalReactions++; }
          // Extract reaction type from data array
          const dataArr = i.data as Record<string, unknown>[] | undefined;
          if (Array.isArray(dataArr)) {
            for (const d of dataArr) {
              const reaction = (d.reaction as Record<string, string> | undefined)?.reaction;
              if (reaction) {
                reactionCounts[reaction] = (reactionCounts[reaction] ?? 0) + 1;
              }
            }
          }
        }
        if (items.length > 0) foundFiles.push('reactions');
      } catch { /* skip */ }
      continue;
    }

    // Comments (comments.json)
    if (base === 'comments.json' && pathLower.includes('comments_and_reactions')) {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown>;
        const key = Object.keys(json).find(k => k.startsWith('comments'));
        const items = key ? (json[key] as unknown[]) : [];
        if (Array.isArray(items)) {
          for (const item of items) {
            const ts = (item as Record<string, number>).timestamp;
            if (ts) { recordTs(ts); totalComments++; }
          }
          foundFiles.push('comments');
        }
      } catch { /* skip */ }
      continue;
    }

    // Group comments
    if (base === 'your_comments_in_groups.json') {
      try {
        const json = JSON.parse(await entry.async('text')) as Record<string, unknown>;
        const key = Object.keys(json).find(k => k.startsWith('group_comment'));
        const items = key ? (json[key] as unknown[]) : [];
        if (Array.isArray(items)) {
          for (const item of items) {
            const ts = (item as Record<string, number>).timestamp;
            if (ts) { recordTs(ts); totalGroupComments++; }
          }
          foundFiles.push('group_comments');
        }
      } catch { /* skip */ }
      continue;
    }
  }

  if (allTimestamps.length === 0 && totalPosts === 0 && totalReactions === 0) {
    throw new Error(
      'No Facebook activity data found. Make sure you uploaded the correct ZIP from Facebook → Settings → Your Facebook Information → Download your information.'
    );
  }

  // Build charts
  const byYear = Object.entries(yearCounts)
    .map(([y, c]) => ({ year: Number(y), count: c }))
    .sort((a, b) => a.year - b.year);

  const byHour = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourCounts[h] ?? 0 }));

  const reactionBreakdown = Object.entries(reactionCounts)
    .map(([type, count]) => ({
      type,
      count,
      emoji: REACTION_META[type]?.emoji ?? '👍',
      color: REACTION_META[type]?.color ?? '#1877F2',
      label: REACTION_META[type]?.label ?? type,
    }))
    .sort((a, b) => b.count - a.count);

  const allTs = allTimestamps.sort((a, b) => a - b);
  const earliestYear = allTs.length ? new Date(allTs[0] * 1000).getFullYear() : 2008;
  const latestYear = allTs.length ? new Date(allTs[allTs.length - 1] * 1000).getFullYear() : new Date().getFullYear();

  // Time estimate: 2min per reaction + 5min per post + 3min per comment + browsing
  const totalActions = totalReactions + totalPosts + totalComments + totalGroupComments;
  const estimatedMinutes = (totalReactions * 2) + (totalPosts * 5) + ((totalComments + totalGroupComments) * 3);
  const estimatedHours = Math.round(estimatedMinutes / 60);
  const estimatedDays = Math.round(estimatedMinutes / (60 * 24));

  const peakHour = byHour.reduce((a, b) => b.count > a.count ? b : a, byHour[0])?.hour ?? 0;
  const peakYear = byYear.reduce((a, b) => b.count > a.count ? b : a, byYear[0])?.year ?? latestYear;

  return {
    totalPosts, totalReactions, totalComments, totalGroupComments,
    reactionBreakdown, byYear, byHour, earliestYear, latestYear,
    estimatedHours, estimatedDays, peakHour, userName,
    peakYear, foundFiles: [...new Set(foundFiles)],
  };
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-black" style={{ color: accent ?? '#1877F2' }}>{value}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Bar chart (pure CSS) ─────────────────────────────────────────────────────

function BarRow({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = Math.max(2, Math.round((count / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10.5px] text-gray-400 w-9 flex-shrink-0 text-right tabular-nums">{label}</span>
      <div className="flex-1 h-5 bg-blue-50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full flex items-center pl-2 transition-all duration-300"
          style={{ width: `${pct}%`, background: color }}
        >
          {count > 0 && <span className="text-[9px] text-white font-bold whitespace-nowrap">{count.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Hour heatmap ─────────────────────────────────────────────────────────────

function HourHeatmap({ byHour }: { byHour: { hour: number; count: number }[] }) {
  const max = Math.max(...byHour.map(h => h.count), 1);
  const fmt = (h: number) => {
    if (h === 0) return '12am';
    if (h < 12) return `${h}am`;
    if (h === 12) return '12pm';
    return `${h - 12}pm`;
  };
  return (
    <div className="grid grid-cols-12 gap-1">
      {byHour.map(({ hour, count }) => {
        const intensity = count / max;
        const alpha = Math.max(0.07, intensity);
        return (
          <div
            key={hour}
            title={`${fmt(hour)}: ${count.toLocaleString()} actions`}
            className="flex flex-col items-center gap-1 cursor-default"
          >
            <div
              className="w-full aspect-square rounded-md transition-all"
              style={{ background: `rgba(24, 119, 242, ${alpha})` }}
            />
            {(hour % 3 === 0) && (
              <span className="text-[8px] text-gray-400 leading-none">{fmt(hour)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Reaction emoji bar ───────────────────────────────────────────────────────

function ReactionBar({ breakdown, total }: { breakdown: FBAnalysis['reactionBreakdown']; total: number }) {
  return (
    <div className="space-y-3">
      {breakdown.slice(0, 6).map(r => {
        const pct = total > 0 ? ((r.count / total) * 100).toFixed(1) : '0';
        return (
          <div key={r.type} className="flex items-center gap-3">
            <span className="text-base w-6 flex-shrink-0">{r.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">{r.label}</span>
                <span className="text-xs tabular-nums text-gray-500">{r.count.toLocaleString()} · {pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: r.color }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Upload zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFile, loading, error }: {
  onFile: (f: File) => void;
  loading: boolean;
  error: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ background: '#1877F2' }}>
          <svg width={36} height={36} viewBox="126.445 2.281 589 589" xmlns="http://www.w3.org/2000/svg">
            <circle cx="420.945" cy="296.781" r="294.5" fill="#1877F2"/>
            <path d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z" fill="#fff"/>
          </svg>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">
            Now Live
          </div>
          <h2 className="text-2xl font-black text-gray-900">Facebook Activity Analyzer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your Facebook data export to see how much of your life you&apos;ve spent on Facebook.
          </p>
        </div>
      </div>

      {/* How to export */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-3">How to export your data</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Go to Facebook Settings', b: 'Click your profile → Settings & Privacy → Settings.' },
            { n: 2, t: 'Your Facebook Information', b: 'In the left panel, click "Your Facebook Information".' },
            { n: 3, t: 'Download your information', b: 'Click "Download your information" → "Download or transfer information".' },
            { n: 4, t: 'Select JSON format', b: 'Choose "Some of your information", set format to JSON, date range "All time".' },
            { n: 5, t: 'Select and download', b: 'Include at minimum: Posts, Comments & Reactions. Click "Request a download" then download the ZIP.' },
          ].map(s => (
            <li key={s.n} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{s.n}</span>
              <div>
                <div className="text-sm font-bold text-gray-800">{s.t}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.b}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-blue-400 bg-blue-50 scale-[1.01]' : 'border-blue-200 hover:bg-blue-50 hover:border-blue-300'}`}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input ref={ref} type="file" accept=".zip" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        {loading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-blue-600">Analyzing your Facebook data…</p>
            <p className="text-xs text-gray-400">This may take a moment for large exports</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📦</div>
            <p className="text-sm font-bold text-gray-700">Drop your Facebook ZIP here</p>
            <p className="text-xs text-gray-400 mt-1">or click to browse · .zip files only</p>
          </>
        )}
      </div>

      {error && (
        <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
          <strong>Error: </strong>{error}
        </div>
      )}

      <p className="text-center text-xs text-gray-400">100% private — everything is processed in your browser. Nothing is uploaded.</p>
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────────

function ResultsView({ data, onReset }: { data: FBAnalysis; onReset: () => void }) {
  const totalActions = data.totalPosts + data.totalReactions + data.totalComments + data.totalGroupComments;
  const maxYear = Math.max(...data.byYear.map(y => y.count), 1);

  const fmtHour = (h: number) => {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };

  const yearsOnFB = data.latestYear - data.earliestYear + 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">
            {data.userName ? `${data.userName}'s Facebook` : 'Your Facebook'} Story
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{data.earliestYear}–{data.latestYear} · {yearsOnFB} year{yearsOnFB !== 1 ? 's' : ''} on Facebook</p>
        </div>
        <button onClick={onReset} className="text-xs text-blue-500 hover:text-blue-700 font-medium">
          Analyze another file
        </button>
      </div>

      {/* Shock stat */}
      <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #1877F2 0%, #0a5cbf 100%)' }}>
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Estimated time on Facebook</p>
        <p className="text-white text-5xl font-black">{data.estimatedDays > 0 ? `${data.estimatedDays}d` : `${data.estimatedHours}h`}</p>
        <p className="text-white/80 text-sm mt-1">
          That&apos;s ~{data.estimatedHours.toLocaleString()} hours across {yearsOnFB} year{yearsOnFB !== 1 ? 's' : ''}
        </p>
        <p className="text-white/50 text-[10px] mt-2">Based on {totalActions.toLocaleString()} tracked actions</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total reactions" value={data.totalReactions.toLocaleString()} sub="posts you reacted to" accent="#1877F2" />
        <StatCard label="Posts created" value={data.totalPosts.toLocaleString()} sub="posts, check-ins & photos" accent="#1877F2" />
        <StatCard label="Comments" value={(data.totalComments + data.totalGroupComments).toLocaleString()} sub={`${data.totalComments} on posts · ${data.totalGroupComments} in groups`} accent="#1877F2" />
        <StatCard label="Peak year" value={String(data.peakYear)} sub="most active year" accent="#1877F2" />
      </div>

      {/* Reaction breakdown */}
      {data.reactionBreakdown.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-4">Your Reaction Personality</h3>
          <ReactionBar breakdown={data.reactionBreakdown} total={data.totalReactions} />
          {data.reactionBreakdown[0] && (
            <p className="mt-4 text-xs text-gray-500 text-center">
              You mostly react with {data.reactionBreakdown[0].emoji} <strong>{data.reactionBreakdown[0].label}</strong> — {((data.reactionBreakdown[0].count / data.totalReactions) * 100).toFixed(0)}% of all reactions
            </p>
          )}
        </div>
      )}

      {/* Activity by year */}
      {data.byYear.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Activity by Year</h3>
          <p className="text-xs text-gray-400 mb-4">All tracked actions (posts, reactions, comments)</p>
          <div className="space-y-2">
            {data.byYear.map(({ year, count }) => (
              <BarRow key={year} label={String(year)} count={count} max={maxYear} color="#1877F2" />
            ))}
          </div>
        </div>
      )}

      {/* Hour heatmap */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-black text-gray-900 mb-1">When You&apos;re Most Active</h3>
        <p className="text-xs text-gray-400 mb-4">Hour of day — darker = more activity</p>
        <HourHeatmap byHour={data.byHour} />
        <p className="text-xs text-gray-500 text-center mt-4">
          Peak hour: <strong className="text-blue-600">{fmtHour(data.peakHour)}</strong>
        </p>
      </div>

      {/* Fun insights */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 space-y-3">
        <h3 className="text-sm font-black text-gray-900">Did You Know?</h3>
        <div className="space-y-2">
          {data.totalReactions >= 10000 && (
            <p className="text-xs text-gray-700">
              👍 You&apos;ve reacted <strong>{data.totalReactions.toLocaleString()}</strong> times — that&apos;s about <strong>{Math.round(data.totalReactions / Math.max(yearsOnFB, 1)).toLocaleString()}</strong> reactions per year.
            </p>
          )}
          {yearsOnFB >= 5 && (
            <p className="text-xs text-gray-700">
              🗓️ You&apos;ve been on Facebook for <strong>{yearsOnFB} years</strong>, since <strong>{data.earliestYear}</strong>.
            </p>
          )}
          {(data.totalComments + data.totalGroupComments) > 100 && (
            <p className="text-xs text-gray-700">
              💬 You left <strong>{(data.totalComments + data.totalGroupComments).toLocaleString()}</strong> comments over the years — you&apos;re not just scrolling, you&apos;re engaging!
            </p>
          )}
          {data.estimatedDays >= 7 && (
            <p className="text-xs text-gray-700">
              ⏱️ Based on your activity, you&apos;ve spent roughly <strong>{data.estimatedDays} days</strong> worth of time on Facebook. That&apos;s {Math.round(data.estimatedDays / 7)} week{data.estimatedDays >= 14 ? 's' : ''}.
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">All processing happened in your browser. Nothing was uploaded. ✓</p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function FacebookAnalyzerClient({ hideNav }: { hideNav?: boolean }) {
  const [state, setState] = useState<'upload' | 'loading' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<FBAnalysis | null>(null);
  const [error, setError] = useState('');

  function handleFile(file: File) {
    setState('loading');
    setError('');
    parseFBZip(file)
      .then(result => { setAnalysis(result); setState('done'); })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Failed to parse file. Make sure you uploaded a valid Facebook data export ZIP.');
        setState('error');
      });
  }

  if (state === 'done' && analysis) {
    return <ResultsView data={analysis} onReset={() => { setState('upload'); setAnalysis(null); setError(''); }} />;
  }

  return (
    <UploadZone
      onFile={handleFile}
      loading={state === 'loading'}
      error={state === 'error' ? error : ''}
    />
  );
}
