'use client';

import { useState, useCallback, useRef } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';
import Link from 'next/link';
import { ArrowLeft, Upload, Shield, Clock, TrendingUp, Calendar, Flame } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReelEntry {
  timestamp: number; // unix seconds
  href?: string;
  author?: string;
}

interface AnalysisResult {
  total: number;
  earliest: number;     // unix ts
  latest: number;       // unix ts
  byMonth: { label: string; count: number; year: number; month: number }[];
  byYear: { year: number; count: number }[];
  byDow: { day: string; count: number }[];
  byHour: { hour: number; label: string; count: number }[];
  peakMonth: string;
  peakYear: number;
  dailyAvg: number;
  totalSeconds: number;
  source: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AVG_REEL_SECONDS = 22; // average reel duration

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const COMPARISONS = [
  { icon: '📚', label: 'Books you could have read',  unit: 'books',   perHour: 1 / 5 },
  { icon: '🏃', label: 'km you could have run',      unit: 'km',      perHour: 8 },
  { icon: '🎸', label: 'Songs learned on guitar',    unit: 'songs',   perHour: 0.5 },
  { icon: '🌍', label: 'Languages started (Duolingo)',unit: 'langs',  perHour: 1 / 200 },
  { icon: '🍳', label: 'Recipes mastered',            unit: 'recipes', perHour: 1 },
  { icon: '💪', label: 'Full gym workouts',           unit: 'sessions',perHour: 1 / 1.2 },
];

// ─── Parser ───────────────────────────────────────────────────────────────────

function extractTimestamps(obj: unknown): ReelEntry[] {
  const out: ReelEntry[] = [];

  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }

    const o = node as Record<string, unknown>;

    // Pattern A: Instagram Reels watch history
    // { title, string_list_data: [{ href, value, timestamp }] }
    if ('string_list_data' in o && Array.isArray(o.string_list_data)) {
      for (const item of o.string_list_data as Record<string, unknown>[]) {
        const ts = Number(item.timestamp);
        if (ts > 1_000_000_000 && ts < 9_999_999_999) {
          out.push({
            timestamp: ts,
            href: typeof item.href === 'string' ? item.href : undefined,
            author: typeof item.value === 'string' ? item.value : undefined,
          });
        }
      }
      return;
    }

    // Pattern B: flat array with timestamp at top level
    if ('timestamp' in o) {
      const ts = Number(o.timestamp);
      if (ts > 1_000_000_000 && ts < 9_999_999_999) {
        out.push({ timestamp: ts });
      }
    }

    // Recurse into all values
    for (const v of Object.values(o)) walk(v);
  }

  walk(obj);
  return out;
}

async function parseZip(file: File): Promise<{ entries: ReelEntry[]; source: string }> {
  // Dynamic import to avoid SSR issues
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(file);

  const PRIORITY_PATHS = [
    'reels_watch_history.json',
    'videos_watched.json',
    'posts_viewed.json',
    'reels.json',
  ];

  // Find candidate files
  const candidates: { name: string; content: string }[] = [];

  // First pass: priority filenames
  for (const name of Object.keys(zip.files)) {
    const lower = name.toLowerCase().replace(/\\/g, '/');
    const base = lower.split('/').pop() ?? '';
    if (PRIORITY_PATHS.includes(base) && !zip.files[name].dir) {
      const text = await zip.files[name].async('text');
      candidates.push({ name, content: text });
    }
  }

  // Second pass: any JSON with reel/video/watch in name
  if (candidates.length === 0) {
    for (const name of Object.keys(zip.files)) {
      if (zip.files[name].dir) continue;
      const lower = name.toLowerCase();
      if (lower.endsWith('.json') && /reel|video|watch|view/.test(lower)) {
        const text = await zip.files[name].async('text');
        candidates.push({ name, content: text });
      }
    }
  }

  if (candidates.length === 0) {
    throw new Error('No Reels watch history found in this ZIP. Instagram may not have included it in your export.');
  }

  const allEntries: ReelEntry[] = [];
  for (const c of candidates) {
    try {
      const json = JSON.parse(c.content);
      allEntries.push(...extractTimestamps(json));
    } catch {
      // skip unparseable files
    }
  }

  const source = candidates.map(c => c.name.split('/').pop()).join(', ');
  return { entries: allEntries, source };
}

async function parseJsonFile(file: File): Promise<{ entries: ReelEntry[]; source: string }> {
  const text = await file.text();
  const json = JSON.parse(text);
  const entries = extractTimestamps(json);
  return { entries, source: file.name };
}

// ─── Analyser ─────────────────────────────────────────────────────────────────

function analyse(entries: ReelEntry[], source: string): AnalysisResult {
  if (entries.length === 0) throw new Error('No Reel entries found in the data.');

  // Deduplicate by timestamp (same reel opened twice in same second)
  const seen = new Set<number>();
  const unique = entries.filter(e => {
    if (seen.has(e.timestamp)) return false;
    seen.add(e.timestamp);
    return true;
  });

  unique.sort((a, b) => a.timestamp - b.timestamp);

  const earliest = unique[0].timestamp;
  const latest = unique[unique.length - 1].timestamp;
  const spanDays = Math.max(1, (latest - earliest) / 86400);

  // By month
  const monthMap = new Map<string, { count: number; year: number; month: number }>();
  const yearMap = new Map<number, number>();
  const dowMap: Record<number, number> = {};
  const hourMap: Record<number, number> = {};

  for (const e of unique) {
    const d = new Date(e.timestamp * 1000);
    const y = d.getFullYear(), m = d.getMonth();
    const key = `${y}-${String(m + 1).padStart(2, '0')}`;
    const label = `${MONTHS[m]} ${y}`;
    if (!monthMap.has(key)) monthMap.set(key, { count: 0, year: y, month: m });
    monthMap.get(key)!.count++;
    yearMap.set(y, (yearMap.get(y) ?? 0) + 1);
    dowMap[d.getDay()] = (dowMap[d.getDay()] ?? 0) + 1;
    hourMap[d.getHours()] = (hourMap[d.getHours()] ?? 0) + 1;
  }

  const byMonth = [...monthMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ label: `${MONTHS[v.month]} ${v.year}`, year: v.year, month: v.month, count: v.count }));

  const byYear = [...yearMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([year, count]) => ({ year, count }));

  const byDow = DOW.map((day, i) => ({ day, count: dowMap[i] ?? 0 }));
  const byHour = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    label: h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`,
    count: hourMap[h] ?? 0,
  }));

  const peak = byMonth.reduce((a, b) => (b.count > a.count ? b : a));
  const peakYear = byYear.reduce((a, b) => (b.count > a.count ? b : a)).year;

  return {
    total: unique.length,
    earliest, latest,
    byMonth, byYear, byDow, byHour,
    peakMonth: peak.label,
    peakYear,
    dailyAvg: unique.length / spanDays,
    totalSeconds: unique.length * AVG_REEL_SECONDS,
    source,
  };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtTime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hrs = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (days > 0) return { primary: `${days}d ${hrs}h`, days, hrs, mins };
  if (hrs > 0) return { primary: `${hrs}h ${mins}m`, days: 0, hrs, mins };
  return { primary: `${mins}m`, days: 0, hrs: 0, mins };
}

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtNum(n: number) {
  return n.toLocaleString('en-IN');
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
      <p className="font-semibold mb-0.5">{label}</p>
      <p className="text-pink-400 font-bold">{fmtNum(payload[0].value)} reels</p>
    </div>
  );
}

// ─── Upload zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handle = useCallback((f: File) => {
    if (f.name.endsWith('.zip') || f.name.endsWith('.json')) onFile(f);
  }, [onFile]);

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
      className="relative flex flex-col items-center justify-center gap-5 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all"
      style={{
        borderColor: drag ? '#e879f9' : '#d1d5db',
        background: drag ? '#fdf4ff' : '#fafafa',
      }}
    >
      <input ref={ref} type="file" accept=".zip,.json" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #c026d3, #7c3aed)' }}>
        <Upload className="w-7 h-7 text-white" />
      </div>
      <div className="text-center">
        <p className="text-base font-bold text-gray-900">Drop your Instagram data export here</p>
        <p className="text-sm text-gray-500 mt-1">
          Accepts <strong>.zip</strong> (full export) or <strong>reels_watch_history.json</strong>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-500" /> 100% private — processed in your browser</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" /> Never uploaded to any server</span>
      </div>
    </div>
  );
}

// ─── How-to steps ─────────────────────────────────────────────────────────────

const STEPS = [
  'Open Instagram → <strong>Settings and activity</strong>',
  'Go to <strong>Accounts Center</strong>',
  'Select <strong>Your information and permissions</strong>',
  'Tap <strong>Download your information</strong>',
  'Choose your account → <strong>All available information</strong>',
  'Set date range: <strong>All time</strong>, format: <strong>JSON</strong>',
  'Request download — Instagram emails you a link (takes a few minutes to hours)',
  'Upload the <strong>.zip</strong> file here',
];

// ─── Results ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent = '#c026d3' }: {
  label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-3xl font-black leading-none tabular-nums" style={{ color: accent }}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function Results({ r }: { r: AnalysisResult }) {
  const time = fmtTime(r.totalSeconds);
  const hours = Math.round(r.totalSeconds / 3600);
  const peakMonthCount = r.byMonth.reduce((a, b) => Math.max(a, b.count), 0);
  const peakBar = peakMonthCount || 1;

  const monthChartData = r.byMonth.slice(-24); // last 24 months

  return (
    <div className="space-y-8">

      {/* ── HERO ── */}
      <div className="rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1e0533 50%, #0c1a2e 100%)' }}>
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#a855f7' }}>Your Instagram Reels Report</p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
            <div>
              <p className="text-5xl sm:text-7xl font-black tabular-nums leading-none"
                style={{ color: '#f0abfc' }}>
                {fmtNum(r.total)}
              </p>
              <p className="text-lg font-semibold mt-2" style={{ color: '#d8b4fe' }}>Reels watched</p>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-12"
              style={{ borderColor: '#4c1d95' }}>
              <p className="text-4xl sm:text-6xl font-black tabular-nums leading-none"
                style={{ color: '#fb923c' }}>
                {time.days > 0 ? time.days : time.hrs}
              </p>
              <p className="text-lg font-semibold mt-2" style={{ color: '#fdba74' }}>
                {time.days > 0 ? `days ${time.hrs} hours wasted` : `hours wasted`}
              </p>
            </div>
          </div>
          <p className="text-sm mt-6 leading-relaxed" style={{ color: '#94a3b8' }}>
            Based on {fmtDate(r.earliest)} → {fmtDate(r.latest)} · avg {AVG_REEL_SECONDS}s per Reel · source: <em>{r.source}</em>
          </p>
        </div>
      </div>

      {/* ── STAT GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total hours" value={fmtNum(hours)} sub={`≈ ${(hours / 24).toFixed(1)} 24-hour days`} />
        <StatCard label="Daily average" value={r.dailyAvg.toFixed(1)} sub="Reels per day" accent="#7c3aed" />
        <StatCard label="Peak month" value={r.peakMonth.split(' ')[0]} sub={`${r.peakMonth} — most addictive`} accent="#0284c7" />
        <StatCard label="Peak year" value={r.peakYear} sub="Most Reels watched" accent="#059669" />
      </div>

      {/* ── WHAT YOU COULD HAVE DONE ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" /> In {hours} hours you could have…
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMPARISONS.map(c => {
            const val = Math.round(hours * c.perHour);
            return (
              <div key={c.label} className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-100">
                <p className="text-2xl mb-1.5">{c.icon}</p>
                <p className="text-2xl font-black text-gray-900 tabular-nums">{fmtNum(val)}</p>
                <p className="text-xs text-gray-500 leading-snug mt-0.5">{c.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MONTHLY TREND ── */}
      {r.byMonth.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-500" /> Monthly Reel Activity
          </h2>
          <p className="text-xs text-gray-400 mb-5">Last {monthChartData.length} months</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c026d3" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#c026d3" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }}
                interval={Math.max(0, Math.floor(monthChartData.length / 8) - 1)}
                tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Area type="monotone" dataKey="count" stroke="#c026d3" strokeWidth={2.5}
                fill="url(#rGrad)" dot={false} activeDot={{ r: 4, fill: '#c026d3' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── YEAR BY YEAR + DOW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Year breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-violet-500" /> Year by Year
          </h2>
          <div className="space-y-3">
            {r.byYear.map(({ year, count }) => {
              const pct = (count / r.total) * 100;
              const yHours = Math.round((count * AVG_REEL_SECONDS) / 3600);
              return (
                <div key={year}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-semibold text-gray-800">{year}</span>
                    <span className="text-gray-500 tabular-nums">{fmtNum(count)} <span className="text-gray-400">({yHours}h)</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #c026d3, #7c3aed)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day of week */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">By Day of Week</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={r.byDow} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {r.byDow.map((_, i) => (
                  <Cell key={i} fill={i === 0 || i === 6 ? '#e879f9' : '#c084fc'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">
            Weekends highlighted in brighter pink
          </p>
        </div>
      </div>

      {/* ── HOUR OF DAY ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">When do you scroll most?</h2>
        <p className="text-xs text-gray-400 mb-4">Reels watched by hour of day</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={r.byHour} margin={{ top: 0, right: 4, left: -24, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#94a3b8' }}
              interval={2} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="count" radius={[3, 3, 0, 0]}>
              {r.byHour.map((d, i) => {
                // night = dark red, morning = blue, afternoon = purple, evening = pink
                const hue = d.hour < 6 ? '#ef4444' : d.hour < 12 ? '#3b82f6' : d.hour < 18 ? '#8b5cf6' : '#ec4899';
                return <Cell key={i} fill={hue} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1 align-middle" />Night (0–5am)</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1 align-middle" />Morning (6–11am)</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-violet-500 mr-1 align-middle" />Afternoon (12–5pm)</span>
          <span><span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1 align-middle" />Evening (6–11pm)</span>
        </div>
      </div>

      {/* ── PEAK MONTH DETAIL ── */}
      <div className="rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)', border: '1px solid #f5d0fe' }}>
        <h2 className="text-base font-bold text-gray-900 mb-4">Monthly breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pink-100">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Month</th>
                <th className="text-right py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reels</th>
                <th className="text-right py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Hours</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Bar</th>
              </tr>
            </thead>
            <tbody>
              {r.byMonth.slice(-12).map(m => (
                <tr key={m.label} className="border-b border-pink-50">
                  <td className="py-2 pr-4 font-medium text-gray-800">{m.label}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-gray-700">{fmtNum(m.count)}</td>
                  <td className="py-2 pr-4 text-right tabular-nums text-gray-500">{Math.round(m.count * AVG_REEL_SECONDS / 3600)}h</td>
                  <td className="py-2">
                    <div className="h-2 rounded-full bg-pink-100 w-32 overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${(m.count / peakBar) * 100}%`, background: '#c026d3' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <p className="text-xs text-gray-400 text-center">
        * Assumes ~{AVG_REEL_SECONDS}s average Reel. Your actual watch time may differ.
        Data sourced from <em>{r.source}</em>. Nothing is uploaded — all processing runs in your browser.
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type State = 'idle' | 'loading' | 'done' | 'error';

export default function InstagramAnalyzerClient() {
  const [state, setState] = useState<State>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [showSteps, setShowSteps] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setState('loading');
    setError('');
    try {
      let entries: ReelEntry[];
      let source: string;
      if (file.name.endsWith('.zip')) {
        ({ entries, source } = await parseZip(file));
      } else {
        ({ entries, source } = await parseJsonFile(file));
      }
      const r = analyse(entries, source);
      setResult(r);
      setState('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse file.');
      setState('error');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            UnblockDevs Tools
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Instagram Reels Analyzer</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Hero text */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-4"
            style={{ background: '#fdf4ff', color: '#c026d3', borderColor: '#f5d0fe' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c026d3' }} />
            100% Private — No Upload
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
            How Many Days Did Instagram Steal?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Upload your Instagram data export to see exactly how many Reels you watched, how many hours you lost,
            and what you could have done instead.
          </p>
        </div>

        {state === 'idle' || state === 'error' ? (
          <div className="space-y-6">
            <UploadZone onFile={handleFile} />

            {state === 'error' && (
              <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* How to get the export */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowSteps(s => !s)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-sm">How to get your Instagram data export</span>
                <span className="text-gray-400 text-lg">{showSteps ? '−' : '+'}</span>
              </button>
              {showSteps && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <ol className="space-y-3 mt-4">
                    {STEPS.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: '#c026d3' }}>{i + 1}</span>
                        <span dangerouslySetInnerHTML={{ __html: step }} className="mt-0.5" />
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 p-4 rounded-xl text-xs text-amber-700 bg-amber-50 border border-amber-200">
                    <strong>Note:</strong> Instagram may not include full watch history in all exports. If no Reels data
                    is found, try uploading <code>reels_watch_history.json</code> from inside the ZIP directly.
                  </div>
                </div>
              )}
            </div>

            {/* What data is used */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'Zero data leaves your device', body: 'All parsing runs in your browser using JavaScript. Nothing is sent to any server.' },
                { icon: '📦', title: 'Accepts .zip or .json', body: 'Drop the full export ZIP or just the reels_watch_history.json file.' },
                { icon: '📊', title: 'Full timeline analytics', body: 'Monthly trends, peak hours, day of week, year breakdown, and time estimates.' },
              ].map(c => (
                <div key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-2xl mb-2">{c.icon}</p>
                  <p className="text-sm font-bold text-gray-900 mb-1">{c.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        ) : state === 'loading' ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
            <p className="text-gray-500 text-sm">Analysing your Instagram data…</p>
          </div>
        ) : result ? (
          <div className="space-y-6">
            <button
              onClick={() => { setResult(null); setState('idle'); }}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Analyse another file
            </button>
            <Results r={result} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
