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
// Twitter exports: window.YTD.xxx.partN = [...]

function parseYTDFile(text: string): unknown[] {
  try {
    const m = text.match(/window\.YTD\.\w+\.part\d+\s*=\s*(\[[\s\S]*\])/);
    if (m) return JSON.parse(m[1]) as unknown[];
  } catch { /* skip */ }
  try { return JSON.parse(text) as unknown[]; } catch { /* skip */ }
  return [];
}

// ─── Core processing: fileMap → TWAnalysis ───────────────────────────────────

function processFileMap(fileMap: Map<string, string>): TWAnalysis {
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

  for (const [name, text] of fileMap) {
    const base = name.split('/').pop()?.toLowerCase() ?? '';

    // Account info
    if (base === 'account.js') {
      try {
        const items = parseYTDFile(text);
        const acct = (items[0] as Record<string, unknown>)?.account as Record<string, string> | undefined;
        if (acct) {
          userName = acct.username ?? '';
          displayName = acct.accountDisplayName ?? '';
          accountCreatedAt = acct.createdAt ?? '';
        }
      } catch { /* skip */ }
      continue;
    }

    // Profile
    if (base === 'profile.js') {
      try {
        const items = parseYTDFile(text);
        const p = (items[0] as Record<string, unknown>)?.profile as Record<string, unknown> | undefined;
        const desc = p?.description as Record<string, string> | undefined;
        if (desc?.location) location = desc.location;
      } catch { /* skip */ }
      continue;
    }

    // Personalization
    if (base === 'personalization.js') {
      try {
        const items = parseYTDFile(text);
        const p13n = (items[0] as Record<string, unknown>)?.p13nData as Record<string, unknown> | undefined;
        const demo = p13n?.demographics as Record<string, unknown> | undefined;
        const langs = demo?.languages as { language: string }[] | undefined;
        if (langs) langs.forEach(l => { if (l.language) languages.push(l.language); });
      } catch { /* skip */ }
      continue;
    }

    // Tweets
    if (/^tweets(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(text);
        for (const item of items) {
          const t = (item as Record<string, unknown>).tweet as Tweet | undefined;
          if (!t) continue;
          tweets.push(t);
          try {
            const d = new Date(t.created_at);
            if (!isNaN(d.getTime())) {
              hourCounts[d.getHours()] = (hourCounts[d.getHours()] ?? 0) + 1;
              yearCounts[d.getFullYear()] = (yearCounts[d.getFullYear()] ?? 0) + 1;
            }
          } catch { /* skip */ }
          const ttext = t.full_text ?? '';
          if (t.retweeted_status_id || ttext.startsWith('RT @')) {
            retweetCount++;
          } else if (t.in_reply_to_user_id || t.in_reply_to_screen_name) {
            replyCount++;
            if (t.in_reply_to_screen_name) {
              const h = t.in_reply_to_screen_name;
              mentionCounts[h] = (mentionCounts[h] ?? 0) + 1;
            }
          } else {
            originalCount++;
          }
          for (const m of ttext.matchAll(/@(\w+)/g)) {
            const h = m[1].toLowerCase();
            if (h !== userName.toLowerCase()) mentionCounts[h] = (mentionCounts[h] ?? 0) + 1;
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
        const items = parseYTDFile(text);
        totalLikes += items.filter(i => (i as Record<string, unknown>).like).length;
      } catch { /* skip */ }
      continue;
    }

    // Followers
    if (/^follower(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(text);
        totalFollowers += items.filter(i => (i as Record<string, unknown>).follower).length;
      } catch { /* skip */ }
      continue;
    }

    // Following
    if (/^following(-part\d+)?\.js$/.test(base)) {
      try {
        const items = parseYTDFile(text);
        totalFollowing += items.filter(i => (i as Record<string, unknown>).following).length;
      } catch { /* skip */ }
      continue;
    }
  }

  if (!userName && !accountCreatedAt) {
    throw new Error(
      'Could not find account data. Make sure you included account.js from the data/ folder.'
    );
  }

  const byYear = Object.entries(yearCounts)
    .map(([y, c]) => ({ year: Number(y), count: c }))
    .sort((a, b) => a.year - b.year);

  const byHour = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourCounts[h] ?? 0 }));

  const topMentions = Object.entries(mentionCounts)
    .sort(([, a], [, b]) => b - a).slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const totalTweets = tweets.length;
  const avgLikesPerTweet = totalTweets > 0 ? likesPerTweetSum / totalTweets : 0;
  const avgRetweetsPerTweet = totalTweets > 0 ? retweetsPerTweetSum / totalTweets : 0;
  const estimatedMinutes = (originalCount * 8) + (replyCount * 3) + (retweetCount * 1) + (totalLikes * 0.5);
  const estimatedHours = Math.max(1, Math.round(estimatedMinutes / 60));
  const peakHour = byHour.reduce((a, b) => b.count > a.count ? b : a, { hour: 0, count: 0 }).hour;
  const peakYear = byYear.length > 0 ? byYear.reduce((a, b) => b.count > a.count ? b : a).year : new Date().getFullYear();
  const createdDate = accountCreatedAt ? new Date(accountCreatedAt) : null;
  const accountAgeYears = createdDate
    ? Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) : 0;

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

// ─── Parse from multiple JS files ────────────────────────────────────────────

async function parseJsFiles(files: File[]): Promise<TWAnalysis> {
  const fileMap = new Map<string, string>();
  await Promise.all(files.map(async f => {
    fileMap.set(f.name, await f.text());
  }));
  return processFileMap(fileMap);
}

// ─── Parse from ZIP (manual ZIP64 parser — avoids fflate high-level API bugs) ──

async function parseTWZip(file: File): Promise<TWAnalysis> {
  const RELEVANT = /\/(account|profile|personalization|tweets|like|follower|following)(-part\d+)?\.js$/;
  const buf = await file.arrayBuffer();
  const dv  = new DataView(buf);
  const u8  = new Uint8Array(buf);
  const dec = new TextDecoder();

  // Find EOCD signature (scan backwards from end)
  let eocdOff = -1;
  for (let i = dv.byteLength - 22; i >= Math.max(0, dv.byteLength - 65558); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocdOff = i; break; }
  }
  if (eocdOff < 0) throw new Error('Not a valid ZIP file');

  // Resolve central directory offset — handle ZIP64
  let cdOff: number, cdSize: number;
  const z64LocOff = eocdOff - 20;
  if (z64LocOff >= 0 && dv.getUint32(z64LocOff, true) === 0x07064b50) {
    const z64EocdOff = Number(dv.getBigUint64(z64LocOff + 8, true));
    if (dv.getUint32(z64EocdOff, true) !== 0x06064b50) throw new Error('Invalid ZIP64 EOCD');
    cdSize = Number(dv.getBigUint64(z64EocdOff + 40, true));
    cdOff  = Number(dv.getBigUint64(z64EocdOff + 48, true));
  } else {
    cdOff  = dv.getUint32(eocdOff + 16, true);
    cdSize = dv.getUint32(eocdOff + 12, true);
  }

  const { inflateSync } = await import('fflate');
  const fileMap = new Map<string, string>();
  let pos = cdOff;

  while (pos < cdOff + cdSize) {
    if (dv.getUint32(pos, true) !== 0x02014b50) break;

    const method   = dv.getUint16(pos + 10, true);
    let compSz     = dv.getUint32(pos + 20, true);
    let uncompSz   = dv.getUint32(pos + 24, true);
    const fnLen    = dv.getUint16(pos + 28, true);
    const extraLen = dv.getUint16(pos + 30, true);
    const cmtLen   = dv.getUint16(pos + 32, true);
    let localOff   = dv.getUint32(pos + 42, true);
    const name     = dec.decode(u8.subarray(pos + 46, pos + 46 + fnLen));

    // Read ZIP64 extra field for any 0xFFFFFFFF sentinels
    if (compSz === 0xFFFFFFFF || uncompSz === 0xFFFFFFFF || localOff === 0xFFFFFFFF) {
      let xp = pos + 46 + fnLen, xe = xp + extraLen;
      while (xp + 4 <= xe) {
        const xId = dv.getUint16(xp, true);
        const xSz = dv.getUint16(xp + 2, true);
        if (xId === 0x0001) {
          let xi = xp + 4;
          if (uncompSz === 0xFFFFFFFF) { uncompSz = Number(dv.getBigUint64(xi, true)); xi += 8; }
          if (compSz   === 0xFFFFFFFF) { compSz   = Number(dv.getBigUint64(xi, true)); xi += 8; }
          if (localOff === 0xFFFFFFFF) { localOff = Number(dv.getBigUint64(xi, true)); }
          break;
        }
        xp += 4 + xSz;
      }
    }

    pos += 46 + fnLen + extraLen + cmtLen;

    if (!RELEVANT.test(name) || compSz === 0) continue;

    // Locate compressed data via local file header
    const lfhFnLen    = dv.getUint16(localOff + 26, true);
    const lfhExtraLen = dv.getUint16(localOff + 28, true);
    const dataOff     = localOff + 30 + lfhFnLen + lfhExtraLen;
    const compressed  = u8.subarray(dataOff, dataOff + compSz);

    const content = method === 0
      ? compressed.slice()
      : inflateSync(compressed);

    fileMap.set(name.split('/').pop() ?? name, dec.decode(content));
  }

  if (fileMap.size === 0) {
    throw new Error('No relevant .js files found in this ZIP. Make sure it is a valid Twitter/X data archive.');
  }
  return processFileMap(fileMap);
}

// ─── Key files the user needs ─────────────────────────────────────────────────

const KEY_FILES = ['account.js', 'tweets.js', 'like.js', 'follower.js', 'following.js', 'profile.js'];

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_TW: TWAnalysis = {
  userName: 'sample_account',
  displayName: 'Sample User',
  accountCreatedAt: '2015-03-14T10:30:00Z',
  accountAgeYears: 9,
  totalTweets: 4847,
  totalLikes: 23891,
  totalFollowers: 2841,
  totalFollowing: 1204,
  originalTweets: 2847,
  replies: 1204,
  retweets: 796,
  byYear: [
    { year: 2015, count: 234 }, { year: 2016, count: 582 }, { year: 2017, count: 847 },
    { year: 2018, count: 1023 }, { year: 2019, count: 748 }, { year: 2020, count: 892 },
    { year: 2021, count: 634 }, { year: 2022, count: 411 }, { year: 2023, count: 382 }, { year: 2024, count: 94 },
  ],
  byHour: Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: [45,28,15,8,5,12,56,128,203,287,321,298,267,241,258,282,312,334,378,421,456,489,412,312][h],
  })),
  topMentions: [
    { name: 'elonmusk', count: 47 }, { name: 'naval', count: 32 }, { name: 'paulg', count: 28 },
    { name: 'sama', count: 24 }, { name: 'balajis', count: 19 }, { name: 'levelsio', count: 17 },
    { name: 'pmarca', count: 15 }, { name: 'benedictevans', count: 13 },
  ],
  avgLikesPerTweet: 4.9,
  avgRetweetsPerTweet: 1.6,
  estimatedHours: 241,
  peakHour: 21,
  peakYear: 2018,
  location: 'Mumbai, India',
  languages: ['en'],
};

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

function HourHeatmap({ byHour }: { byHour: { hour: number; count: number }[] }) {
  const max = Math.max(...byHour.map(h => h.count), 1);
  const fmt = (h: number) => h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`;
  return (
    <div className="grid grid-cols-12 gap-1">
      {byHour.map(({ hour, count }) => (
        <div key={hour} title={`${fmt(hour)}: ${count} tweets`} className="flex flex-col items-center gap-1">
          <div className="w-full aspect-square rounded-md" style={{ background: `rgba(0,0,0,${Math.max(0.07, count / max)})` }} />
          {hour % 3 === 0 && <span className="text-[8px] text-gray-400 leading-none">{fmt(hour)}</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Upload zone (dual mode) ──────────────────────────────────────────────────

function UploadZone({ onJsFiles, onZip, loading, error, onSample }: {
  onJsFiles: (files: File[]) => void;
  onZip: (file: File) => void;
  loading: boolean;
  error: string;
  onSample?: () => void;
}) {
  const jsRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    const jsFiles = dropped.filter(f => f.name.endsWith('.js'));
    const zipFile = dropped.find(f => f.name.endsWith('.zip'));
    if (jsFiles.length > 0) onJsFiles(jsFiles);
    else if (zipFile) onZip(zipFile);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
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
          <p className="text-sm text-gray-500 mt-1">Upload your X data archive to see your tweet history, likes & more.</p>
        </div>
      </div>

      {/* How to export */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-3">How to get your data</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Request your archive', b: 'Go to x.com → Settings → Your Account → Download an archive of your data.' },
            { n: 2, t: 'Download the ZIP', b: 'X emails you a link. Download the ZIP file.' },
            { n: 3, t: 'Extract the ZIP', b: 'Unzip it on your computer. Open the data/ folder inside.' },
            { n: 4, t: 'Select files below', b: `Pick these files from the data/ folder: ${KEY_FILES.join(', ')}` },
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

      {/* Primary upload — JS files */}
      <div
        className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${dragOver ? 'border-gray-800 bg-gray-50 scale-[1.01]' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'}`}
        onClick={() => jsRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={jsRef}
          type="file"
          accept=".js"
          multiple
          className="hidden"
          onChange={e => { const fs = Array.from(e.target.files ?? []); if (fs.length) onJsFiles(fs); }}
        />
        {loading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-gray-700">Analyzing your X data…</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📂</div>
            <p className="text-sm font-bold text-gray-800">Select .js files from the data/ folder</p>
            <p className="text-xs text-gray-500 mt-1">Pick multiple files at once · account.js, tweets.js, like.js, etc.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {KEY_FILES.map(f => (
                <span key={f} className="text-[10px] bg-gray-100 text-gray-500 rounded px-2 py-0.5 font-mono">{f}</span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Secondary — try ZIP */}
      {!loading && (
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Or try uploading the ZIP directly</p>
          <button
            type="button"
            onClick={() => zipRef.current?.click()}
            className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700"
          >
            Upload ZIP file
          </button>
          <input
            ref={zipRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) onZip(f); }}
          />
          <p className="text-[10px] text-gray-400 mt-1">(May fail for large archives — use the JS files method above if it does)</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700 space-y-2">
          <p><strong>Error: </strong>{error}</p>
          <p className="text-xs text-red-600">
            Try the <strong>JS files method</strong> — extract the ZIP, open the <code className="bg-red-100 px-1 rounded">data/</code> folder, and select the .js files directly.
          </p>
        </div>
      )}

      {onSample && (
        <button
          type="button"
          onClick={onSample}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-300"
        >
          <span>👀</span> See a sample result first
        </button>
      )}

      <p className="text-center text-xs text-gray-400">100% private — processed in your browser, nothing uploaded.</p>
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────────

function ResultsView({ data, onReset }: { data: TWAnalysis; onReset: () => void }) {
  const maxYear = Math.max(...data.byYear.map(y => y.count), 1);
  const maxMention = data.topMentions[0]?.count ?? 1;
  const fmtHour = (h: number) => h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
  const createdYear = data.accountCreatedAt ? new Date(data.accountCreatedAt).getFullYear() : null;
  const hasActivity = data.totalTweets > 0 || data.totalLikes > 0;
  const typeTotal = data.originalTweets + data.replies + data.retweets;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">{data.displayName || data.userName || 'Your'} on X</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            @{data.userName}
            {createdYear && ` · on X since ${createdYear}`}
            {data.location && ` · ${data.location}`}
          </p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-700 font-medium">Analyze another file</button>
      </div>

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
              {data.totalLikes > 0 ? `${data.totalLikes} likes · mostly a reader` : 'Light user · mostly browsing'}
            </p>
          </>
        )}
        {data.languages.length > 0 && <p className="text-white/40 text-[10px] mt-3">{data.languages.join(' · ')}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Tweets posted" value={data.totalTweets.toLocaleString()} sub={typeTotal > 0 ? `${data.originalTweets} original · ${data.replies} replies · ${data.retweets} RTs` : undefined} />
        <StatCard label="Likes given" value={data.totalLikes.toLocaleString()} sub="tweets you liked" />
        <StatCard label="Followers" value={data.totalFollowers.toLocaleString()} />
        <StatCard label="Following" value={data.totalFollowing.toLocaleString()} />
      </div>

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

      {data.byYear.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Tweets by Year</h3>
          <p className="text-xs text-gray-400 mb-4">Your posting history over time</p>
          <div className="space-y-2">
            {data.byYear.map(({ year, count }) => <BarRow key={year} label={String(year)} count={count} max={maxYear} />)}
          </div>
        </div>
      )}

      {data.totalTweets > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">When You Tweet</h3>
          <p className="text-xs text-gray-400 mb-4">Hour of day — darker = more tweets</p>
          <HourHeatmap byHour={data.byHour} />
          <p className="text-xs text-gray-500 text-center mt-4">Most active at <strong>{fmtHour(data.peakHour)}</strong></p>
        </div>
      )}

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

      {!hasActivity && (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center space-y-2">
          <div className="text-3xl">👀</div>
          <h3 className="text-sm font-bold text-gray-900">You&apos;re a lurker</h3>
          <p className="text-xs text-gray-500">Your archive shows minimal posting — you&apos;re on X to read, not to tweet. That&apos;s actually healthy.</p>
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
  const [isSample, setIsSample] = useState(false);

  function run(promise: Promise<TWAnalysis>) {
    setState('loading');
    setError('');
    setIsSample(false);
    promise
      .then(result => { setAnalysis(result); setState('done'); })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Failed to parse. Try uploading the .js files from the data/ folder instead.');
        setState('error');
      });
  }

  const reset = () => { setState('upload'); setAnalysis(null); setError(''); setIsSample(false); };

  if (state === 'done' && analysis) {
    return (
      <div>
        {isSample && (
          <div className="max-w-2xl mx-auto px-4 pt-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3 mb-1">
              <span className="text-sm text-amber-800 font-medium">📊 Sample data — not your real account</span>
              <button onClick={reset} className="text-xs font-bold text-amber-700 hover:text-amber-900 whitespace-nowrap">
                Analyze yours →
              </button>
            </div>
          </div>
        )}
        <ResultsView data={analysis} onReset={reset} />
      </div>
    );
  }

  return (
    <UploadZone
      onJsFiles={files => run(parseJsFiles(files))}
      onZip={file => run(parseTWZip(file))}
      loading={state === 'loading'}
      error={state === 'error' ? error : ''}
      onSample={() => { setAnalysis(SAMPLE_TW); setState('done'); setIsSample(true); }}
    />
  );
}
