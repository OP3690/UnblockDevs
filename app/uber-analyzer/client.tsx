'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UberAnalysis {
  totalTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  totalSpend: number;
  currency: string;
  totalKm: number;
  totalHours: number;
  avgFare: number;
  avgDistKm: number;
  avgDurMins: number;
  surgedCount: number;
  airportCount: number;
  cities: { name: string; count: number }[];
  products: { name: string; count: number }[];
  byYear: { year: number; count: number }[];
  byHour: { hour: number; count: number }[];
  byDow: { dow: number; count: number }[];
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE: UberAnalysis = {
  totalTrips: 312,
  completedTrips: 267,
  cancelledTrips: 45,
  totalSpend: 72480,
  currency: 'INR',
  totalKm: 3241,
  totalHours: 112.4,
  avgFare: 271,
  avgDistKm: 12.1,
  avgDurMins: 25,
  surgedCount: 38,
  airportCount: 21,
  cities: [
    { name: 'Bengaluru', count: 198 },
    { name: 'Delhi', count: 34 },
    { name: 'Mumbai', count: 18 },
    { name: 'Hyderabad', count: 11 },
    { name: 'Chennai', count: 6 },
  ],
  products: [
    { name: 'UberGo', count: 142 },
    { name: 'Auto', count: 71 },
    { name: 'UberX', count: 34 },
    { name: 'Moto', count: 14 },
    { name: 'Premier', count: 6 },
  ],
  byYear: [
    { year: 2018, count: 12 }, { year: 2019, count: 48 }, { year: 2020, count: 21 },
    { year: 2021, count: 34 }, { year: 2022, count: 67 }, { year: 2023, count: 54 },
    { year: 2024, count: 31 },
  ],
  byHour: Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: [4,2,1,0,0,2,8,18,32,22,14,10,16,18,12,14,18,24,38,42,36,28,18,10][h],
  })),
  byDow: [
    { dow: 0, count: 28 }, { dow: 1, count: 31 }, { dow: 2, count: 29 },
    { dow: 3, count: 34 }, { dow: 4, count: 38 }, { dow: 5, count: 58 },
    { dow: 6, count: 49 },
  ],
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (c === ',' && !inQ) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function parseCSV(text: string): Record<string, string>[] {
  const clean = text.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = clean.split('\n');
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1)
    .filter(l => l.trim())
    .map(l => {
      const vals = parseCSVLine(l);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = (vals[i] ?? '').trim(); });
      return obj;
    });
}

function fmtCurrency(amount: number, currency: string): string {
  try {
    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

function fmtHour(h: number): string {
  if (h === 0) return '12am';
  if (h < 12) return `${h}am`;
  if (h === 12) return '12pm';
  return `${h - 12}pm`;
}

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── ZIP parser ───────────────────────────────────────────────────────────────

async function parseUberZip(file: File): Promise<UberAnalysis> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(file);

  let tripsContent = '';
  for (const [name, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const lower = name.toLowerCase();
    if (lower.includes('rider_lifetime_trips') && lower.endsWith('.csv')) {
      tripsContent = await entry.async('text');
      break;
    }
  }

  if (!tripsContent) {
    throw new Error(
      'No trips data found in this ZIP. Make sure you uploaded the official Uber data export from uber.com/account/privacy.'
    );
  }

  const trips = parseCSV(tripsContent);
  if (trips.length === 0) throw new Error('Trips file appears empty or unreadable.');

  const completed: Record<string, string>[] = [];
  const cancelled: Record<string, string>[] = [];

  for (const t of trips) {
    const done = (t['is_completed'] ?? '').toLowerCase();
    if (done === 'true') completed.push(t);
    else if (done === 'false') cancelled.push(t);
  }

  let totalSpend = 0;
  let totalMiles = 0;
  let totalSeconds = 0;
  let surgedCount = 0;
  let airportCount = 0;
  const cityCounts: Record<string, number> = {};
  const productCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};
  const hourCounts: Record<number, number> = {};
  const dowCounts: Record<number, number> = {};
  const currencyCounts: Record<string, number> = {};

  for (const t of completed) {
    totalSpend += parseFloat(t['original_fare_local'] ?? '0') || 0;
    totalMiles += parseFloat(t['trip_distance_miles'] ?? '0') || 0;
    totalSeconds += parseFloat(t['trip_duration_seconds'] ?? '0') || 0;

    if ((t['is_surged'] ?? '').toLowerCase() === 'true') surgedCount++;
    if ((t['is_airport_trip'] ?? '').toLowerCase() === 'true') airportCount++;

    const city = (t['city_name'] ?? '').trim();
    if (city) cityCounts[city] = (cityCounts[city] ?? 0) + 1;

    const product = (t['product_type_name'] ?? '').trim();
    if (product) productCounts[product] = (productCounts[product] ?? 0) + 1;

    const currency = (t['currency_code'] ?? '').trim();
    if (currency) currencyCounts[currency] = (currencyCounts[currency] ?? 0) + 1;

    const ts = (t['request_timestamp_local'] ?? '').trim();
    if (ts) {
      const d = new Date(ts);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const h = d.getHours();
        const dow = d.getDay();
        yearCounts[y] = (yearCounts[y] ?? 0) + 1;
        hourCounts[h] = (hourCounts[h] ?? 0) + 1;
        dowCounts[dow] = (dowCounts[dow] ?? 0) + 1;
      }
    }
  }

  const currency = Object.entries(currencyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'USD';

  return {
    totalTrips: trips.length,
    completedTrips: completed.length,
    cancelledTrips: cancelled.length,
    totalSpend: Math.round(totalSpend),
    currency,
    totalKm: Math.round(totalMiles * 1.609),
    totalHours: Math.round(totalSeconds / 3600 * 10) / 10,
    avgFare: completed.length > 0 ? Math.round(totalSpend / completed.length) : 0,
    avgDistKm: completed.length > 0 ? Math.round(totalMiles * 1.609 / completed.length * 10) / 10 : 0,
    avgDurMins: completed.length > 0 ? Math.round(totalSeconds / completed.length / 60) : 0,
    surgedCount,
    airportCount,
    cities: Object.entries(cityCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8),
    products: Object.entries(productCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6),
    byYear: Object.entries(yearCounts).map(([y, c]) => ({ year: Number(y), count: c })).sort((a, b) => a.year - b.year),
    byHour: Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourCounts[h] ?? 0 })),
    byDow: Array.from({ length: 7 }, (_, d) => ({ dow: d, count: dowCounts[d] ?? 0 })),
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

// ─── Bar row ──────────────────────────────────────────────────────────────────

function BarRow({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = Math.max(2, Math.round((count / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10.5px] text-gray-400 w-20 flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full flex items-center pl-2"
          style={{ width: `${pct}%`, background: color }}
        >
          {count > 0 && <span className="text-[9px] text-white font-bold whitespace-nowrap">{count.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Upload zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFile, loading, error, onSample }: {
  onFile: (f: File) => void;
  loading: boolean;
  error: string;
  onSample: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-black flex items-center justify-center text-2xl">
          🚗
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Uber Data Analyzer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your Uber data export ZIP to see your complete ride history, total spend, and patterns.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-3">How to get your Uber data</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Go to uber.com/account/privacy', b: 'Log in to Uber and visit your Privacy Settings page.' },
            { n: 2, t: 'Request data download', b: 'Click "Download your data" and select the data categories you want.' },
            { n: 3, t: 'Wait for the email', b: 'Uber will email you a download link within a few minutes to hours.' },
            { n: 4, t: 'Download the ZIP', b: 'Click the link in the email to download your data as a ZIP file.' },
            { n: 5, t: 'Upload here', b: 'Drop the ZIP file below — everything is processed locally in your browser.' },
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

      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-gray-600 bg-gray-50 scale-[1.01]' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'}`}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
      >
        <input ref={ref} type="file" accept=".zip" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        {loading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-gray-700">Analyzing your Uber data…</p>
            <p className="text-xs text-gray-400">Parsing trips from your CSV</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📦</div>
            <p className="text-sm font-bold text-gray-700">Drop your Uber ZIP here</p>
            <p className="text-xs text-gray-400 mt-1">or click to browse · .zip files only</p>
          </>
        )}
      </div>

      {error && (
        <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-sm text-red-700">
          <strong>Error: </strong>{error}
        </div>
      )}

      <button
        type="button"
        onClick={onSample}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
      >
        <span>👀</span> See a sample result first
      </button>

      <p className="text-center text-xs text-gray-400">100% private — everything is processed in your browser. Nothing is uploaded.</p>
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────────

function ResultsView({ data, onReset }: { data: UberAnalysis; onReset: () => void }) {
  const maxYear = Math.max(...data.byYear.map(y => y.count), 1);
  const maxHour = Math.max(...data.byHour.map(h => h.count), 1);
  const maxDow = Math.max(...data.byDow.map(d => d.count), 1);
  const maxCity = Math.max(...data.cities.map(c => c.count), 1);
  const maxProduct = Math.max(...data.products.map(p => p.count), 1);
  const peakHour = data.byHour.reduce((a, b) => b.count > a.count ? b : a, data.byHour[0])?.hour ?? 0;
  const peakDow = data.byDow.reduce((a, b) => b.count > a.count ? b : a, data.byDow[0])?.dow ?? 0;

  const cancelRate = data.totalTrips > 0
    ? ((data.cancelledTrips / data.totalTrips) * 100).toFixed(0)
    : '0';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Your Uber Story</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {data.byYear[0]?.year ?? '—'}–{data.byYear[data.byYear.length - 1]?.year ?? '—'} · {data.byYear.length} year{data.byYear.length !== 1 ? 's' : ''} of rides
          </p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-800 font-medium">
          Analyze another file
        </button>
      </div>

      {/* Hero spend card */}
      <div className="rounded-2xl p-6 text-center bg-black">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total spent on Uber</p>
        <p className="text-white text-5xl font-black">{fmtCurrency(data.totalSpend, data.currency)}</p>
        <p className="text-white/70 text-sm mt-1">
          across {data.completedTrips.toLocaleString()} completed rides
        </p>
        <p className="text-white/40 text-[10px] mt-2">{data.totalKm.toLocaleString()} km · {data.totalHours.toLocaleString()} hours in Ubers</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total rides" value={data.totalTrips.toLocaleString()} sub={`${data.completedTrips} completed · ${data.cancelledTrips} cancelled (${cancelRate}%)`} />
        <StatCard label="Avg fare" value={fmtCurrency(data.avgFare, data.currency)} sub={`avg ${data.avgDistKm} km per ride`} />
        <StatCard label="Distance covered" value={`${data.totalKm.toLocaleString()} km`} sub={`avg ${data.avgDistKm} km per trip`} />
        <StatCard label="Time in Ubers" value={`${data.totalHours}h`} sub={`avg ${data.avgDurMins} min per ride`} />
        {data.surgedCount > 0 && (
          <StatCard label="Surge rides" value={data.surgedCount.toLocaleString()} sub={`${((data.surgedCount / data.completedTrips) * 100).toFixed(0)}% of completed trips`} />
        )}
        {data.airportCount > 0 && (
          <StatCard label="Airport trips" value={data.airportCount.toLocaleString()} sub="rides to/from airports" />
        )}
      </div>

      {/* Rides by year */}
      {data.byYear.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Rides by Year</h3>
          <p className="text-xs text-gray-400 mb-4">Completed trips per year</p>
          <div className="space-y-2">
            {data.byYear.map(({ year, count }) => (
              <BarRow key={year} label={String(year)} count={count} max={maxYear} color="#000000" />
            ))}
          </div>
        </div>
      )}

      {/* Cities */}
      {data.cities.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Top Cities</h3>
          <p className="text-xs text-gray-400 mb-4">Where you ride most</p>
          <div className="space-y-2">
            {data.cities.map(({ name, count }) => (
              <BarRow key={name} label={name} count={count} max={maxCity} color="#1C1C1E" />
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {data.products.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Ride Types</h3>
          <p className="text-xs text-gray-400 mb-4">Your most-used Uber products</p>
          <div className="space-y-2">
            {data.products.map(({ name, count }) => (
              <BarRow key={name} label={name} count={count} max={maxProduct} color="#3D3D3D" />
            ))}
          </div>
        </div>
      )}

      {/* Time of day */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-black text-gray-900 mb-1">When You Ride</h3>
        <p className="text-xs text-gray-400 mb-4">Hour of day — taller = more rides</p>
        <div className="flex items-end gap-0.5 h-16">
          {data.byHour.map(({ hour, count }) => {
            const pct = maxHour > 0 ? (count / maxHour) * 100 : 0;
            return (
              <div key={hour} className="flex-1 flex flex-col items-center gap-1" title={`${fmtHour(hour)}: ${count} rides`}>
                <div
                  className="w-full rounded-sm transition-all"
                  style={{ height: `${Math.max(pct, 2)}%`, background: hour === peakHour ? '#000000' : '#D1D5DB' }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-gray-400">12am</span>
          <span className="text-[9px] text-gray-400">6am</span>
          <span className="text-[9px] text-gray-400">12pm</span>
          <span className="text-[9px] text-gray-400">6pm</span>
          <span className="text-[9px] text-gray-400">11pm</span>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Peak time: <strong>{fmtHour(peakHour)}</strong></p>
      </div>

      {/* Day of week */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-black text-gray-900 mb-1">Day of Week</h3>
        <p className="text-xs text-gray-400 mb-4">Which day you take most rides</p>
        <div className="space-y-2">
          {data.byDow.map(({ dow, count }) => (
            <BarRow key={dow} label={DOW_LABELS[dow]} count={count} max={maxDow} color={dow === peakDow ? '#000000' : '#6B7280'} />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">You ride most on <strong>{DOW_LABELS[peakDow]}</strong></p>
      </div>

      <p className="text-center text-xs text-gray-400">All processing happened in your browser. Nothing was uploaded. ✓</p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function UberAnalyzerClient() {
  const [state, setState] = useState<'upload' | 'loading' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<UberAnalysis | null>(null);
  const [error, setError] = useState('');
  const [isSample, setIsSample] = useState(false);

  function handleFile(file: File) {
    setState('loading');
    setError('');
    setIsSample(false);
    parseUberZip(file)
      .then(result => { setAnalysis(result); setState('done'); })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Failed to parse file. Make sure you uploaded a valid Uber data export ZIP.');
        setState('error');
      });
  }

  const reset = () => { setState('upload'); setAnalysis(null); setError(''); setIsSample(false); };

  if (state === 'done' && analysis) {
    return (
      <div>
        {isSample && (
          <div className="max-w-2xl mx-auto px-4 pt-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
              <span className="text-sm text-amber-800 font-medium">📊 Sample data — not your real rides</span>
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
      onFile={handleFile}
      loading={state === 'loading'}
      error={state === 'error' ? error : ''}
      onSample={() => { setAnalysis(SAMPLE); setState('done'); setIsSample(true); }}
    />
  );
}
