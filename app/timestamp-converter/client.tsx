'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Copy, Check, RefreshCw, Clock, ArrowDown } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Helpers ────────────────────────────────────────────────────────────────

const TIMEZONES = [
  { label: 'UTC', tz: 'UTC' },
  { label: 'US/Eastern', tz: 'America/New_York' },
  { label: 'US/Pacific', tz: 'America/Los_Angeles' },
  { label: 'US/Central', tz: 'America/Chicago' },
  { label: 'London', tz: 'Europe/London' },
  { label: 'Paris', tz: 'Europe/Paris' },
  { label: 'Berlin', tz: 'Europe/Berlin' },
  { label: 'Mumbai', tz: 'Asia/Kolkata' },
  { label: 'Singapore', tz: 'Asia/Singapore' },
  { label: 'Tokyo', tz: 'Asia/Tokyo' },
  { label: 'Sydney', tz: 'Australia/Sydney' },
  { label: 'Dubai', tz: 'Asia/Dubai' },
  { label: 'São Paulo', tz: 'America/Sao_Paulo' },
  { label: 'Toronto', tz: 'America/Toronto' },
];

function formatInTz(date: Date, tz: string, fmt: Intl.DateTimeFormatOptions): string {
  try { return new Intl.DateTimeFormat('en-US', { ...fmt, timeZone: tz }).format(date); }
  catch { return 'Invalid timezone'; }
}

function relativeTime(unix: number): string {
  const diff = Math.floor(Date.now() / 1000) - unix;
  const abs = Math.abs(diff);
  const future = diff < 0;
  const fmt = (n: number, u: string) => `${n} ${u}${n !== 1 ? 's' : ''} ${future ? 'from now' : 'ago'}`;
  if (abs < 60) return fmt(abs, 'second');
  if (abs < 3600) return fmt(Math.floor(abs / 60), 'minute');
  if (abs < 86400) return fmt(Math.floor(abs / 3600), 'hour');
  if (abs < 86400 * 30) return fmt(Math.floor(abs / 86400), 'day');
  if (abs < 86400 * 365) return fmt(Math.floor(abs / (86400 * 30)), 'month');
  return fmt(Math.floor(abs / (86400 * 365)), 'year');
}

function isValidUnix(v: string): boolean {
  const n = Number(v.trim());
  return !isNaN(n) && v.trim() !== '' && n > 0 && n < 9999999999999;
}

// ── Copy btn ───────────────────────────────────────────────────────────────

function CopyBtn({ text, className = '' }: { text: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1400); } catch {}
  }, [text]);
  return (
    <button onClick={copy} title="Copy" className={`inline-flex shrink-0 items-center justify-center rounded-lg transition ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ── Format output row ──────────────────────────────────────────────────────

function OutputRow({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-2.5 shadow-sm hover:border-zinc-200 transition-colors">
      <span className="w-28 shrink-0 text-[11px] font-semibold text-zinc-400">{label}</span>
      <span className={`flex-1 truncate text-[12.5px] text-zinc-700 ${mono ? 'font-mono' : ''}`}>{value}</span>
      <CopyBtn text={value} className="text-zinc-300 hover:bg-zinc-100 hover:text-zinc-600 p-1" />
    </div>
  );
}

// ── Live clock display ─────────────────────────────────────────────────────

function LiveClock({ tz }: { tz: string }) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const unix = Math.floor(now.getTime() / 1000);
  const time = formatInTz(now, tz, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const date = formatInTz(now, tz, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return { now, unix, time, date };
}

// ── Main tool ──────────────────────────────────────────────────────────────

function TimestampTool() {
  const [tz, setTz] = useState('UTC');
  const [unixInput, setUnixInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [mode, setMode] = useState<'unix-to-date' | 'date-to-unix'>('unix-to-date');
  const [nowTick, setNowTick] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNowTick(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nowUnix = Math.floor(nowTick.getTime() / 1000);
  const nowMs = nowTick.getTime();

  // Parse the selected unix timestamp
  const selectedDate = useMemo((): Date | null => {
    if (mode === 'unix-to-date') {
      if (!unixInput.trim() || !isValidUnix(unixInput)) return null;
      const n = Number(unixInput.trim());
      return new Date(n > 9999999999 ? n : n * 1000);
    } else {
      if (!dateInput.trim()) return null;
      const d = new Date(dateInput);
      return isNaN(d.getTime()) ? null : d;
    }
  }, [unixInput, dateInput, mode]);

  const useNow = useCallback(() => {
    if (mode === 'unix-to-date') {
      setUnixInput(String(nowUnix));
    } else {
      setDateInput(nowTick.toISOString().slice(0, 16));
    }
  }, [mode, nowUnix, nowTick]);

  const nowTime = formatInTz(nowTick, tz, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const nowDate = formatInTz(nowTick, tz, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  // Build output rows for selected date
  const outputRows = useMemo(() => {
    if (!selectedDate) return [];
    const unix = Math.floor(selectedDate.getTime() / 1000);
    const ms = selectedDate.getTime();
    const iso = selectedDate.toISOString();
    return [
      { label: 'Unix (seconds)', value: String(unix) },
      { label: 'Unix (ms)', value: String(ms) },
      { label: 'ISO 8601', value: iso },
      { label: 'UTC string', value: selectedDate.toUTCString() },
      { label: `Date (${tz})`, value: formatInTz(selectedDate, tz, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
      { label: `Time (${tz})`, value: formatInTz(selectedDate, tz, { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', hour12: false }) },
      { label: 'Relative', value: relativeTime(unix), mono: false },
      { label: 'Day of week', value: formatInTz(selectedDate, tz, { weekday: 'long' }), mono: false },
      { label: 'Day of year', value: String(Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 86400000)), },
    ];
  }, [selectedDate, tz]);

  // World clock rows for selected date
  const worldClocks = useMemo(() => {
    if (!selectedDate) return [];
    return TIMEZONES.map(({ label, tz: zone }) => ({
      label,
      tz: zone,
      value: formatInTz(selectedDate, zone, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
    }));
  }, [selectedDate]);

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Live "now" banner ────────────────────────────────── */}
      <div className="bg-zinc-950 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Current time — {tz}</p>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[32px] sm:text-[40px] font-black tracking-tight text-white leading-none tabular-nums">
                {nowTime}
              </span>
              <span className="text-zinc-400 text-[13px]">{nowDate}</span>
            </div>
            <p className="mt-1.5 font-mono text-[13px] text-zinc-500">Unix: <span className="text-emerald-400">{nowUnix}</span></p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={tz}
              onChange={e => setTz(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-[12.5px] text-zinc-200 outline-none focus:border-zinc-500"
            >
              {TIMEZONES.map(t => <option key={t.tz} value={t.tz}>{t.label}</option>)}
            </select>
            <CopyBtn text={String(nowUnix)} className="border border-zinc-700 bg-zinc-800 p-2.5 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200" />
          </div>
        </div>
      </div>

      {/* ── Mode toggle ─────────────────────────────────────── */}
      <div className="flex items-center gap-3 bg-zinc-50 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Convert</span>
        <div className="flex rounded-xl border border-zinc-200 bg-white p-0.5 shadow-sm">
          <button
            onClick={() => setMode('unix-to-date')}
            className={`rounded-lg px-4 py-1.5 text-[12px] font-semibold transition ${mode === 'unix-to-date' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            Unix → Date
          </button>
          <button
            onClick={() => setMode('date-to-unix')}
            className={`rounded-lg px-4 py-1.5 text-[12px] font-semibold transition ${mode === 'date-to-unix' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            Date → Unix
          </button>
        </div>
      </div>

      {/* ── Input ───────────────────────────────────────────── */}
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {mode === 'unix-to-date' ? 'Unix timestamp (seconds or ms)' : 'Date / time string or local datetime'}
            </label>
            {mode === 'unix-to-date' ? (
              <input
                type="text"
                value={unixInput}
                onChange={e => setUnixInput(e.target.value)}
                placeholder={`e.g. ${nowUnix}`}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-[14px] text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              />
            ) : (
              <input
                type="datetime-local"
                value={dateInput}
                onChange={e => setDateInput(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-[14px] text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              />
            )}
          </div>
          <button
            onClick={useNow}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[12.5px] font-semibold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 whitespace-nowrap"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Use now
          </button>
        </div>

        {/* Validation */}
        {mode === 'unix-to-date' && unixInput && !isValidUnix(unixInput) && (
          <p className="mt-2 text-[12px] text-red-500">Enter a valid Unix timestamp (e.g. {nowUnix})</p>
        )}
      </div>

      {/* ── Output ──────────────────────────────────────────── */}
      {selectedDate && (
        <>
          <div className="px-4 py-5 sm:px-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">All Formats</p>
            <div className="space-y-2">
              {outputRows.map(r => (
                <OutputRow key={r.label} label={r.label} value={r.value} mono={r.mono ?? true} />
              ))}
            </div>
          </div>

          {/* World clock */}
          <div className="px-4 py-5 sm:px-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">World Clock — same moment</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {worldClocks.map(({ label, tz: zone, value }) => (
                <div
                  key={zone}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 transition ${zone === tz ? 'border-zinc-300 bg-zinc-900 shadow-md' : 'border-zinc-100 bg-white shadow-sm hover:border-zinc-200'}`}
                >
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${zone === tz ? 'text-emerald-400' : 'text-zinc-400'}`}>{label}</p>
                    <p className={`font-mono text-[12px] mt-0.5 ${zone === tz ? 'text-white' : 'text-zinc-700'}`}>{value}</p>
                  </div>
                  <CopyBtn text={value} className={`p-1.5 rounded-lg ${zone === tz ? 'text-zinc-400 hover:bg-zinc-700' : 'text-zinc-300 hover:bg-zinc-100 hover:text-zinc-600'}`} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Empty state ─────────────────────────────────────── */}
      {!selectedDate && (
        <div className="flex flex-col items-center gap-3 bg-white px-6 py-14 text-center">
          <Clock className="h-10 w-10 text-zinc-200" />
          <p className="text-[13px] text-zinc-400">Enter a Unix timestamp or pick a date above</p>
          <button
            onClick={useNow}
            className="mt-1 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-[12.5px] font-semibold text-zinc-600 transition hover:bg-zinc-100 active:scale-95"
          >
            Use current time →
          </button>
        </div>
      )}

    </div>
  );
}

export default function TimestampConverterClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Unix Timestamp Converter"
      subtitle="Convert Unix timestamps to human-readable dates in any timezone — or convert dates back to Unix. Live clock, world clock, relative time, and 9 output formats. 100% in-browser."
      toolName="timestamp_converter"
      icon="⏱️"
      features={['Unix ↔ Date', 'World clock', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<TimestampTool />}
    />
  );
}
