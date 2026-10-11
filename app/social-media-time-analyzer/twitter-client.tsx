'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tweet {
  created_at: string;
  full_text: string;
  in_reply_to_screen_name?: string;
  in_reply_to_user_id?: string;
  retweet_count: string;
  favorite_count: string;
  retweeted_status_id?: string;
}

interface TWAnalysis {
  userName: string;
  displayName: string;
  accountCreatedAt: string;
  accountAgeYears: number;
  totalTweets: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
  originalTweets: number;
  replies: number;
  retweets: number;
  byYear: { year: number; count: number }[];
  byHour: { hour: number; count: number }[];
  topMentions: { name: string; count: number }[];
  avgLikesPerTweet: number;
  avgRetweetsPerTweet: number;
  estimatedHours: number;
  peakHour: number;
  peakYear: number;
  location: string;
  languages: string[];
}

// ─── Parse Twitter JS file format ────────────────────────────────────────────
// Twitter exports use: window.YTD.xxx.partN = [...]

function parseYTDFile(text: string): unknown[] {
  try {
    const m = text.match(/window\.YTD\.\w+\.part\d+\s*=\s*(\[[\s\S]*\])/);
    if (m) return JSON.parse(m[1]) as unknown[];
  } catch { /* skip */ }
  // Fallback: try raw JSON
  try { return JSON.parse(text) as unknown[]; } catch { /* skip */ }
  return [];
}

// Parse Twitter date format: "Mon May 01 03:30:49 +0000 2022"
function parseTwitterDate(dateStr: string): Date | null {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
  } catch { /* skip */ }
  return null;
}

// ─── ZIP parser ───────────────────────────────────────────────────────────────

async function parseTWZip(file: File): Promise<TWAnalysis> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(file);

  const tweets: Tweet[] = [];
  let totalLikes = 0;
  let totalFollowers = 0;
  let totalFollowing = 0;
  let userName = '';
  let displayName = '';
  let accountCreatedAt = '';
  let location = '';
  const languages: string[] = [];
  const hourCounts: Record<number, number> = {};
  const yearCounts: Record<number, number> = {};
  const mentionCounts: Record<string, number> = {};
  let likesPerTweetSum = 0;
  let retweetsPerTweetSum = 0;
  let originalCount = 0;
  let replyCount = 0;
  let retweetCount = 0;

  const files = Object.entries(zip.files);

  for (const [name, entry] of files) {
    if (entry.dir) continue;
    const base = name.split('/').pop()?.toLowerCase() ?? '';

    // Account info
    if (base === 'account.js') {
      try {
        const items = parseYTDFile(await entry.async('text'));
        const acct = (items[0] as Record<string, unknown>)?.account as Record<string, string> | undefined;
        if (acct) {
          userName = acct.username ?? '';
          displayName = acct.accountDisplayName ?? '';
          accountCreatedAt = acct.createdAt ?? '';
        }
      } catch { /* skip */ }
      continue;
    }

    // Profile (location)
    if (base === 'profile.js') {
      try {
        const items = parseYTDFile(await entry.async('text'));
        const p = (items[0] as Record<string, unknown>)?.profile as Record<string, unknown> | undefined;
        const desc = p?.description as Record<string, string> | undefined;
        if (desc?.location) location = desc.location;
      } catch { /* skip */ }
      continue;
    }

    // Personalization (languages)
    if (base === 'personalization.js') {
      try {
        const items = parseYTDFile(await entry.async('text'));
        const p13n = (items[0] as Record<string, unknown>)?.p13nData as Record<string, unknown> | undefined;
        const demo = p13n?.demographics as Record<string, unknown> | undefined;
        const langs = demo?.languages as { language: string }[] | undefined;
        if (langs) langs.forEach(l => { if (l.language) languages.push(l.language); });
      } catch { /* skip */ }
      continue;
    }

    // Tweets (tweets.js, tweets-part1.js, tweets-part2.js, ...)
    if (/^tweets(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(await entry.async('text'));
        for (const item of items) {
          const t = (item as Record<string, unknown>).tweet as Tweet | undefined;
          if (!t) continue;
          tweets.push(t);

          const d = parseTwitterDate(t.created_at);
          if (d) {
            hourCounts[d.getHours()] = (hourCounts[d.getHours()] ?? 0) + 1;
            yearCounts[d.getFullYear()] = (yearCounts[d.getFullYear()] ?? 0) + 1;
          }

          // Type classification
          const text = t.full_text ?? '';
          if (t.retweeted_status_id || text.startsWith('RT @')) {
            retweetCount++;
          } else if (t.in_reply_to_user_id || t.in_reply_to_screen_name) {
            replyCount++;
            // Extract mention for top mentions
            const mentioned = t.in_reply_to_screen_name;
            if (mentioned) mentionCounts[mentioned] = (mentionCounts[mentioned] ?? 0) + 1;
          } else {
            originalCount++;
          }

          // Extract @mentions from text
          const mentionMatches = text.matchAll(/@(\w+)/g);
          for (const m of mentionMatches) {
            const handle = m[1].toLowerCase();
            if (handle !== userName.toLowerCase()) {
              mentionCounts[handle] = (mentionCounts[handle] ?? 0) + 1;
            }
          }

          likesPerTweetSum += Number(t.favorite_count ?? 0);
          retweetsPerTweetSum += Number(t.retweet_count ?? 0);
        }
      } catch { /* skip */ }
      continue;
    }

    // Likes
    if (/^like(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(await entry.async('text'));
        totalLikes += items.filter(i => (i as Record<string, unknown>).like).length;
      } catch { /* skip */ }
      continue;
    }

    // Followers
    if (/^follower(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(await entry.async('text'));
        totalFollowers += items.filter(i => (i as Record<string, unknown>).follower).length;
      } catch { /* skip */ }
      continue;
    }

    // Following
    if (/^following(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(await entry.async('text'));
        totalFollowing += items.filter(i => (i as Record<string, unknown>).following).length;
      } catch { /* skip */ }
      continue;
    }
  }

  if (!userName && !accountCreatedAt) {
    throw new Error(
      'No Twitter account data found. Make sure you uploaded the correct ZIP — it should contain a "data/" folder with account.js, tweets.js, etc.'
    );
  }

  // Build charts
  const byYear = Object.entries(yearCounts)
    .map(([y, c]) => ({ year: Number(y), count: c }))
    .sort((a, b) => a.year - b.year);

  const byHour = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourCounts[h] ?? 0 }));

  const topMentions = Object.entries(mentionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const totalTweets = tweets.length;
  const avgLikesPerTweet = totalTweets > 0 ? likesPerTweetSum / totalTweets : 0;
  const avgRetweetsPerTweet = totalTweets > 0 ? retweetsPerTweetSum / totalTweets : 0;

  // Time estimate: 8 min per original tweet, 3 min per reply, 1 min per retweet, 30s per like
  const estimatedMinutes = (originalCount * 8) + (replyCount * 3) + (retweetCount * 1) + (totalLikes * 0.5);
  const estimatedHours = Math.max(1, Math.round(estimatedMinutes / 60));

  const peakHour = byHour.reduce((a, b) => b.count > a.count ? b : a, { hour: 0, count: 0 }).hour;
  const peakYear = byYear.length > 0
    ? byYear.reduce((a, b) => b.count > a.count ? b : a).year
    : new Date().getFullYear();

  const createdDate = accountCreatedAt ? new Date(accountCreatedAt) : null;
  const accountAgeYears = createdDate
    ? Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0;

  return {
    userName, displayName, accountCreatedAt, accountAgeYears,
    totalTweets, totalLikes, totalFollowers, totalFollowing,
    originalTweets: originalCount, replies: replyCount, retweets: retweetCount,
    byYear, byHour, topMentions,
    avgLikesPerTweet: Math.round(avgLikesPerTweet * 10) / 10,
    avgRetweetsPerTweet: Math.round(avgRetweetsPerTweet * 10) / 10,
    estimatedHours, peakHour, peakYear, location, languages,
  };
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Bar chart row ────────────────────────────────────────────────────────────

function BarRow({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = Math.max(2, Math.round((count / Math.max(max, 1)) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10.5px] text-gray-400 w-9 flex-shrink-0 text-right tabular-nums">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full flex items-center pl-2" style={{ width: `${pct}%`, background: '#000' }}>
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
        const alpha = Math.max(0.07, count / max);
        return (
          <div key={hour} title={`${fmt(hour)}: ${count} tweets`} className="flex flex-col items-center gap-1">
            <div
              className="w-full aspect-square rounded-md"
              style={{ background: `rgba(0,0,0,${alpha})` }}
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
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-black">
          <svg width={32} height={32} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" fill="white"/>
          </svg>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">
            Now Live
          </div>
          <h2 className="text-2xl font-black text-gray-900">Twitter / X Analyzer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your X data archive to see your complete Twitter history — tweets, likes, and more.
          </p>
        </div>
      </div>

      {/* How to export */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-3">How to export from X (Twitter)</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Open X Settings', b: 'Go to x.com → click your profile → Settings and Support → Settings.' },
            { n: 2, t: 'Your Account', b: 'Click "Your Account" in the left menu.' },
            { n: 3, t: 'Download an archive', b: 'Click "Download an archive of your data".' },
            { n: 4, t: 'Verify your identity', b: 'Confirm with your password and verification code.' },
            { n: 5, t: 'Download and upload here', b: 'X will email you a link. Download the ZIP and drop it below.' },
          ].map(s => (
            <li key={s.n} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{s.n}</span>
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
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-gray-800 bg-gray-50 scale-[1.01]' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input ref={ref} type="file" accept=".zip" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        {loading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-gray-700">Analyzing your X archive…</p>
            <p className="text-xs text-gray-400">Processing tweet history…</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">🐦</div>
            <p className="text-sm font-bold text-gray-700">Drop your X / Twitter ZIP here</p>
            <p className="text-xs text-gray-400 mt-1">or click to browse · .zip files only</p>
          </>
        )}
      </div>

      {error && (
        <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
          <strong>Error: </strong>{error}
        </div>
      )}
      <p className="text-center text-xs text-gray-400">100% private — processed in your browser, nothing uploaded.</p>
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────────

function ResultsView({ data, onReset }: { data: TWAnalysis; onReset: () => void }) {
  const maxYear = Math.max(...data.byYear.map(y => y.count), 1);
  const maxMention = data.topMentions[0]?.count ?? 1;
  const fmtHour = (h: number) => {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };
  const createdYear = data.accountCreatedAt ? new Date(data.accountCreatedAt).getFullYear() : null;
  const hasActivity = data.totalTweets > 0 || data.totalLikes > 0;
  const typeTotal = data.originalTweets + data.replies + data.retweets;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">
            {data.displayName || data.userName || 'Your'} on X
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            @{data.userName}
            {createdYear && ` · on X since ${createdYear}`}
            {data.location && ` · ${data.location}`}
          </p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-700 font-medium">
          Analyze another file
        </button>
      </div>

      {/* Shock / summary card */}
      <div className="rounded-2xl p-6 text-center bg-black">
        {data.totalTweets > 0 ? (
          <>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Estimated time spent tweeting</p>
            <p className="text-white text-5xl font-black">{data.estimatedHours}h</p>
            <p className="text-white/70 text-sm mt-1">Across {data.totalTweets.toLocaleString()} tweets &amp; {data.totalLikes.toLocaleString()} likes</p>
          </>
        ) : (
          <>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Account summary</p>
            <p className="text-white text-4xl font-black">{data.accountAgeYears}y old account</p>
            <p className="text-white/70 text-sm mt-2">
              {data.totalLikes > 0
                ? `${data.totalLikes} likes · mostly a reader`
                : 'Light user · mostly browsing'}
            </p>
          </>
        )}
        {data.languages.length > 0 && (
          <p className="text-white/40 text-[10px] mt-3">{data.languages.join(' · ')}</p>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Tweets posted" value={data.totalTweets.toLocaleString()} sub={typeTotal > 0 ? `${data.originalTweets} original · ${data.replies} replies · ${data.retweets} RTs` : undefined} />
        <StatCard label="Likes given" value={data.totalLikes.toLocaleString()} sub="tweets you liked" />
        <StatCard label="Followers" value={data.totalFollowers.toLocaleString()} />
        <StatCard label="Following" value={data.totalFollowing.toLocaleString()} />
      </div>

      {/* Tweet type breakdown */}
      {typeTotal > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-4">Your Twitter Personality</h3>
          <div className="space-y-3">
            {[
              { label: 'Original tweets', count: data.originalTweets, pct: Math.round((data.originalTweets / typeTotal) * 100) },
              { label: 'Replies', count: data.replies, pct: Math.round((data.replies / typeTotal) * 100) },
              { label: 'Retweets', count: data.retweets, pct: Math.round((data.retweets / typeTotal) * 100) },
            ].filter(t => t.count > 0).map(t => (
              <div key={t.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{t.label}</span>
                  <span className="text-xs tabular-nums text-gray-500">{t.count.toLocaleString()} · {t.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          {data.avgLikesPerTweet > 0 && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Avg <strong className="text-gray-800">{data.avgLikesPerTweet}</strong> likes per tweet
              {data.avgRetweetsPerTweet > 0 && <> · <strong className="text-gray-800">{data.avgRetweetsPerTweet}</strong> RTs</>}
            </p>
          )}
        </div>
      )}

      {/* Activity by year */}
      {data.byYear.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Tweets by Year</h3>
          <p className="text-xs text-gray-400 mb-4">Your posting history over time</p>
          <div className="space-y-2">
            {data.byYear.map(({ year, count }) => (
              <BarRow key={year} label={String(year)} count={count} max={maxYear} />
            ))}
          </div>
        </div>
      )}

      {/* Hour heatmap */}
      {hasActivity && data.totalTweets > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">When You Tweet</h3>
          <p className="text-xs text-gray-400 mb-4">Hour of day — darker = more tweets</p>
          <HourHeatmap byHour={data.byHour} />
          <p className="text-xs text-gray-500 text-center mt-4">
            Most active at <strong>{fmtHour(data.peakHour)}</strong>
          </p>
        </div>
      )}

      {/* Top mentions */}
      {data.topMentions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-4">People You Talk to Most</h3>
          <div className="space-y-2.5">
            {data.topMentions.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 w-5 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 truncate pr-2">@{m.name}</span>
                    <span className="text-xs tabular-nums text-gray-500 flex-shrink-0">{m.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: `${(m.count / maxMention) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Light user card */}
      {!hasActivity && (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center space-y-2">
          <div className="text-3xl">👀</div>
          <h3 className="text-sm font-bold text-gray-900">You&apos;re a lurker</h3>
          <p className="text-xs text-gray-500">
            Your archive shows minimal posting activity — you&apos;re on X to read, not to tweet.
            That&apos;s actually pretty healthy.
          </p>
          {data.accountCreatedAt && (
            <p className="text-xs text-gray-400 mt-2">
              Account created {new Date(data.accountCreatedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              {data.accountAgeYears > 0 && ` · ${data.accountAgeYears} year${data.accountAgeYears !== 1 ? 's' : ''} ago`}
            </p>
          )}
        </div>
      )}

      <p className="text-center text-xs text-gray-400">All processing happened in your browser. Nothing was uploaded. ✓</p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function TwitterAnalyzerClient({ hideNav }: { hideNav?: boolean }) {
  const [state, setState] = useState<'upload' | 'loading' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<TWAnalysis | null>(null);
  const [error, setError] = useState('');

  function handleFile(file: File) {
    setState('loading');
    setError('');
    parseTWZip(file)
      .then(result => { setAnalysis(result); setState('done'); })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Failed to parse file. Make sure it is a valid X/Twitter data archive ZIP.');
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
