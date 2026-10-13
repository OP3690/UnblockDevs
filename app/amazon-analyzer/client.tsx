'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AmazonAnalysis {
  totalOrders: number;
  totalItems: number;
  totalSpend: number;
  currency: string;
  avgOrderValue: number;
  firstOrderYear: number;
  lastOrderYear: number;
  byYear: { year: number; spend: number; count: number }[];
  byMonth: { month: string; spend: number; count: number }[];
  topCategories: { name: string; count: number; spend: number }[];
  topItems: { title: string; count: number; spend: number }[];
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE: AmazonAnalysis = {
  totalOrders: 184,
  totalItems: 267,
  totalSpend: 48320,
  currency: 'INR',
  avgOrderValue: 263,
  firstOrderYear: 2021,
  lastOrderYear: 2024,
  byYear: [
    { year: 2021, spend: 8240, count: 32 },
    { year: 2022, spend: 14180, count: 56 },
    { year: 2023, spend: 16490, count: 62 },
    { year: 2024, spend: 9410, count: 34 },
  ],
  byMonth: [
    { month: 'Jan 2024', spend: 1200, count: 4 },
    { month: 'Feb 2024', spend: 890, count: 3 },
    { month: 'Mar 2024', spend: 2100, count: 7 },
    { month: 'Apr 2024', spend: 780, count: 3 },
    { month: 'May 2024', spend: 640, count: 2 },
    { month: 'Jun 2024', spend: 1450, count: 5 },
    { month: 'Jul 2024', spend: 890, count: 3 },
    { month: 'Aug 2024', spend: 720, count: 2 },
    { month: 'Sep 2024', spend: 1030, count: 4 },
    { month: 'Oct 2024', spend: 1820, count: 6 },
    { month: 'Nov 2024', spend: 3410, count: 12 },
    { month: 'Dec 2024', spend: 2640, count: 9 },
  ],
  topCategories: [
    { name: 'Books', count: 48, spend: 6820 },
    { name: 'Electronics', count: 31, spend: 18430 },
    { name: 'Home & Kitchen', count: 28, spend: 4210 },
    { name: 'Clothing', count: 24, spend: 3890 },
    { name: 'Sports & Fitness', count: 18, spend: 3640 },
    { name: 'Personal Care', count: 16, spend: 2180 },
    { name: 'Stationery', count: 14, spend: 1480 },
    { name: 'Grocery', count: 11, spend: 980 },
  ],
  topItems: [
    { title: 'Atomic Habits — James Clear', count: 2, spend: 598 },
    { title: 'Protein Powder (1kg) — MyFitnessFuel', count: 4, spend: 3920 },
    { title: 'USB-C Charging Cable (2m)', count: 3, spend: 897 },
    { title: 'Python Crash Course — Eric Matthes', count: 1, spend: 449 },
    { title: 'Wireless Mouse — Logitech M235', count: 2, spend: 1998 },
    { title: 'Notebook A5 — Classmate (pack of 6)', count: 5, spend: 540 },
    { title: 'Whey Protein Bar (box of 12)', count: 3, spend: 1350 },
    { title: 'HDMI Cable 3m', count: 2, spend: 498 },
    { title: 'Face Wash — Himalaya Purifying Neem', count: 4, spend: 596 },
    { title: 'Cotton T-Shirt (pack of 3)', count: 2, spend: 998 },
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

function parseMoney(s: string): { amount: number; currency: string } {
  const str = (s ?? '').trim();
  if (!str) return { amount: 0, currency: '' };
  if (str.includes('₹') || str.toUpperCase().startsWith('INR')) {
    const n = parseFloat(str.replace(/[₹,\s]/gi, '').replace(/INR/gi, '')) || 0;
    return { amount: n, currency: 'INR' };
  }
  if (str.startsWith('$') || str.toUpperCase().includes('USD')) {
    const n = parseFloat(str.replace(/[$,\s]/g, '').replace(/USD/gi, '')) || 0;
    return { amount: n, currency: 'USD' };
  }
  const n = parseFloat(str.replace(/,/g, '')) || 0;
  return { amount: n, currency: '' };
}

function parseDate(s: string): Date | null {
  if (!s) return null;
  // Try ISO first
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d;
  // Try DD/MM/YYYY
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(`${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`);
  // Try DD-MM-YYYY
  const m2 = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (m2) return new Date(`${m2[3]}-${m2[2].padStart(2, '0')}-${m2[1].padStart(2, '0')}`);
  return null;
}

function fmtCurrency(amount: number, currency: string): string {
  const code = currency || 'USD';
  const locale = code === 'INR' ? 'en-IN' : 'en-US';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: code, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${code} ${Math.round(amount).toLocaleString()}`;
  }
}

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseAmazonCSV(text: string): AmazonAnalysis {
  const rows = parseCSV(text);
  if (rows.length === 0) throw new Error('File appears to be empty or in an unrecognised format.');

  // Detect column names (Amazon data export vs order report)
  const first = rows[0];
  const keys = Object.keys(first);
  const hasOrderId = keys.includes('Order ID');
  const hasTitle = keys.includes('Title');
  const hasCategory = keys.includes('Category');

  if (!hasOrderId || !hasTitle) {
    throw new Error(
      'Unrecognised CSV format. Please upload the order history CSV from Amazon\'s "Request My Data" page. Expected columns: Order ID, Order Date, Title, Category, Item Total.'
    );
  }

  const totalCol = keys.find(k => k.toLowerCase().includes('item total')) ?? 'Item Total';
  const dateCol = keys.find(k => k.toLowerCase().includes('order date')) ?? 'Order Date';
  const qtyCol = keys.find(k => k.toLowerCase() === 'quantity') ?? 'Quantity';
  const currencyCol = keys.find(k => k.toLowerCase() === 'currency');

  const orderTotals: Record<string, number> = {};
  const yearSpend: Record<number, number> = {};
  const yearCount: Record<number, number> = {};
  const monthData: Record<string, { spend: number; count: number; ts: number }> = {};
  const categoryCount: Record<string, number> = {};
  const categorySpend: Record<string, number> = {};
  const itemCount: Record<string, number> = {};
  const itemSpend: Record<string, number> = {};
  let detectedCurrency = '';
  const seenOrderMonths = new Set<string>(); // (orderId+month) for order-level month counting

  for (const row of rows) {
    const orderId = (row['Order ID'] ?? '').trim();
    const dateStr = (row[dateCol] ?? '').trim();
    const title = (row['Title'] ?? '').trim();
    const category = hasCategory ? (row['Category'] ?? '').trim() : '';
    const totalStr = (row[totalCol] ?? '').trim();
    const qty = parseInt(row[qtyCol] ?? '1') || 1;

    if (!orderId) continue;

    const { amount, currency } = parseMoney(totalStr);
    if (!detectedCurrency && currency) detectedCurrency = currency;
    if (!detectedCurrency && currencyCol) {
      const c = (row[currencyCol] ?? '').trim().toUpperCase();
      if (c) detectedCurrency = c;
    }

    const date = parseDate(dateStr);

    if (date && !isNaN(date.getTime())) {
      const year = date.getFullYear();
      const monthKey = date.toLocaleString('en-US', { month: 'short' }) + ' ' + year;
      const ts = date.getTime();

      yearSpend[year] = (yearSpend[year] ?? 0) + amount;
      yearCount[year] = (yearCount[year] ?? 0) + 1;

      monthData[monthKey] = {
        spend: (monthData[monthKey]?.spend ?? 0) + amount,
        count: (monthData[monthKey]?.count ?? 0) + 1,
        ts: Math.max(monthData[monthKey]?.ts ?? 0, ts),
      };
    }

    orderTotals[orderId] = (orderTotals[orderId] ?? 0) + amount;

    if (category) {
      categoryCount[category] = (categoryCount[category] ?? 0) + qty;
      categorySpend[category] = (categorySpend[category] ?? 0) + amount;
    }

    if (title) {
      const shortTitle = title.slice(0, 60);
      itemCount[shortTitle] = (itemCount[shortTitle] ?? 0) + qty;
      itemSpend[shortTitle] = (itemSpend[shortTitle] ?? 0) + amount;
    }
  }

  if (Object.keys(orderTotals).length === 0) throw new Error('No orders found in this file.');

  const totalOrders = Object.keys(orderTotals).length;
  const totalItems = rows.reduce((s, r) => s + (parseInt(r[qtyCol] ?? '1') || 1), 0);
  const totalSpend = Math.round(Object.values(orderTotals).reduce((s, v) => s + v, 0));
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSpend / totalOrders) : 0;

  const byYear = Object.entries(yearSpend)
    .map(([y, spend]) => ({ year: Number(y), spend: Math.round(spend), count: yearCount[Number(y)] ?? 0 }))
    .sort((a, b) => a.year - b.year);

  const sortedMonths = Object.entries(monthData)
    .sort((a, b) => a[1].ts - b[1].ts)
    .slice(-12);
  const byMonth = sortedMonths.map(([month, d]) => ({ month, spend: Math.round(d.spend), count: d.count }));

  const topCategories = Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count, spend: Math.round(categorySpend[name] ?? 0) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const topItems = Object.entries(itemCount)
    .map(([title, count]) => ({ title, count, spend: Math.round(itemSpend[title] ?? 0) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const years = byYear.map(y => y.year);

  return {
    totalOrders,
    totalItems,
    totalSpend,
    currency: detectedCurrency || 'USD',
    avgOrderValue,
    firstOrderYear: years[0] ?? new Date().getFullYear(),
    lastOrderYear: years[years.length - 1] ?? new Date().getFullYear(),
    byYear,
    byMonth,
    topCategories,
    topItems,
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

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.max(2, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10.5px] text-gray-500 w-24 flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full flex items-center pl-2" style={{ width: `${pct}%`, background: color }}>
          {value > 0 && <span className="text-[9px] text-white font-bold whitespace-nowrap">{value.toLocaleString()}</span>}
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
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl" style={{ background: '#FF9900' }}>
          📦
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Amazon Order Analyzer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your Amazon order history CSV to see how much you&apos;ve spent, your top categories, and shopping patterns.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-3">How to export your Amazon order history</p>
        <ol className="space-y-3">
          {[
            { n: 1, t: 'Go to amazon.in or amazon.com', b: 'Sign in to your Amazon account.' },
            { n: 2, t: 'Open "Request My Data"', b: 'Go to Account → Privacy Settings → Request My Data (or search "download order history" in account settings).' },
            { n: 3, t: 'Select Retail Order History', b: 'Choose "Retail Order History" from the data types. Set date range to "All time".' },
            { n: 4, t: 'Download the CSV', b: 'Amazon will email you a link to download the data as a ZIP containing a CSV file.' },
            { n: 5, t: 'Upload the CSV here', b: 'Extract the ZIP and upload the Retail.OrderHistory.1.csv file below.' },
          ].map(s => (
            <li key={s.n} className="flex gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center mt-0.5"
                style={{ background: '#FF9900' }}
              >{s.n}</span>
              <div>
                <div className="text-sm font-bold text-gray-800">{s.t}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.b}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-orange-400 bg-orange-50 scale-[1.01]' : 'border-orange-200 hover:bg-orange-50 hover:border-orange-300'}`}
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }}
      >
        <input ref={ref} type="file" accept=".csv" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        {loading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-orange-700">Analyzing your order history…</p>
            <p className="text-xs text-gray-400">Parsing orders from your CSV</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📄</div>
            <p className="text-sm font-bold text-gray-700">Drop your Amazon CSV here</p>
            <p className="text-xs text-gray-400 mt-1">or click to browse · .csv files only</p>
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
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
      >
        <span>👀</span> See a sample result first
      </button>

      <p className="text-center text-xs text-gray-400">100% private — everything is processed in your browser. Nothing is uploaded.</p>
    </div>
  );
}

// ─── Results view ─────────────────────────────────────────────────────────────

function ResultsView({ data, onReset }: { data: AmazonAnalysis; onReset: () => void }) {
  const maxYear = Math.max(...data.byYear.map(y => y.spend), 1);
  const maxMonth = Math.max(...data.byMonth.map(m => m.spend), 1);
  const maxCat = Math.max(...data.topCategories.map(c => c.count), 1);
  const yearsActive = data.lastOrderYear - data.firstOrderYear + 1;

  const ACCENT = '#FF9900';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Your Amazon Story</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {data.firstOrderYear}–{data.lastOrderYear} · {yearsActive} year{yearsActive !== 1 ? 's' : ''} of orders
          </p>
        </div>
        <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-800 font-medium">
          Analyze another file
        </button>
      </div>

      {/* Hero card */}
      <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #FF9900 0%, #e67e00 100%)' }}>
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Total spent on Amazon</p>
        <p className="text-white text-5xl font-black">{fmtCurrency(data.totalSpend, data.currency)}</p>
        <p className="text-white/80 text-sm mt-1">
          across {data.totalOrders.toLocaleString()} orders · {data.totalItems.toLocaleString()} items
        </p>
        <p className="text-white/60 text-[10px] mt-2">avg {fmtCurrency(data.avgOrderValue, data.currency)} per order</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total orders" value={data.totalOrders.toLocaleString()} sub={`${yearsActive} years of shopping`} />
        <StatCard label="Items purchased" value={data.totalItems.toLocaleString()} sub={`avg ${(data.totalItems / Math.max(data.totalOrders, 1)).toFixed(1)} per order`} />
        <StatCard label="Avg order value" value={fmtCurrency(data.avgOrderValue, data.currency)} sub="per order placed" />
        <StatCard label="Peak year" value={String(data.byYear.reduce((a, b) => b.spend > a.spend ? b : a, data.byYear[0])?.year ?? data.lastOrderYear)} sub="highest spending year" />
      </div>

      {/* Spend by year */}
      {data.byYear.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Spend by Year</h3>
          <p className="text-xs text-gray-400 mb-4">Total amount spent per year</p>
          <div className="space-y-2">
            {data.byYear.map(({ year, spend }) => (
              <BarRow key={year} label={String(year)} value={spend} max={maxYear} color={ACCENT} />
            ))}
          </div>
        </div>
      )}

      {/* Monthly trend */}
      {data.byMonth.length > 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Monthly Spend (last 12 months)</h3>
          <p className="text-xs text-gray-400 mb-4">Taller bar = more spent that month</p>
          <div className="flex items-end gap-1 h-16">
            {data.byMonth.map(({ month, spend }) => {
              const pct = maxMonth > 0 ? (spend / maxMonth) * 100 : 0;
              return (
                <div key={month} className="flex-1 flex flex-col items-center" title={`${month}: ${fmtCurrency(spend, data.currency)}`}>
                  <div className="w-full rounded-t-sm" style={{ height: `${Math.max(pct, 2)}%`, background: ACCENT }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-400">{data.byMonth[0]?.month}</span>
            <span className="text-[9px] text-gray-400">{data.byMonth[data.byMonth.length - 1]?.month}</span>
          </div>
          {data.byMonth.some(m => m.month.includes('Nov') || m.month.includes('Dec')) && (
            <p className="text-xs text-gray-500 text-center mt-2">💡 Nov–Dec spike? Probably Big Billion Day + year-end sales.</p>
          )}
        </div>
      )}

      {/* Top categories */}
      {data.topCategories.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-1">Top Categories</h3>
          <p className="text-xs text-gray-400 mb-4">By number of items ordered</p>
          <div className="space-y-2">
            {data.topCategories.map(({ name, count }) => (
              <BarRow key={name} label={name} value={count} max={maxCat} color={ACCENT} />
            ))}
          </div>
        </div>
      )}

      {/* Top items */}
      {data.topItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-gray-900 mb-4">Most Ordered Items</h3>
          <div className="space-y-3">
            {data.topItems.map(({ title, count, spend }, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-300 w-4 flex-shrink-0 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{title}</p>
                  <p className="text-[10px] text-gray-400">{count}× ordered · {fmtCurrency(spend, data.currency)} total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">All processing happened in your browser. Nothing was uploaded. ✓</p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AmazonAnalyzerClient() {
  const [state, setState] = useState<'upload' | 'loading' | 'done' | 'error'>('upload');
  const [analysis, setAnalysis] = useState<AmazonAnalysis | null>(null);
  const [error, setError] = useState('');
  const [isSample, setIsSample] = useState(false);

  function handleFile(file: File) {
    setState('loading');
    setError('');
    setIsSample(false);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const result = parseAmazonCSV(text);
        setAnalysis(result);
        setState('done');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to parse file. Make sure you uploaded the Amazon order history CSV.');
        setState('error');
      }
    };
    reader.onerror = () => { setError('Failed to read file.'); setState('error'); };
    reader.readAsText(file);
  }

  const reset = () => { setState('upload'); setAnalysis(null); setError(''); setIsSample(false); };

  if (state === 'done' && analysis) {
    return (
      <div>
        {isSample && (
          <div className="max-w-2xl mx-auto px-4 pt-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
              <span className="text-sm text-amber-800 font-medium">📊 Sample data — not your real orders</span>
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
