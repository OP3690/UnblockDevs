'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Clock,
  Copy,
  Check,
  RefreshCw,
  Play,
  Calendar,
  ChevronRight,
  AlarmClock,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ─── Cron Parser ──────────────────────────────────────────────────────────────

const MONTH_NAMES: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};
const DOW_NAMES: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
};

function resolveToken(token: string, isMonth: boolean, isDow: boolean): number {
  const upper = token.toUpperCase();
  if (isMonth && MONTH_NAMES[upper] !== undefined) return MONTH_NAMES[upper];
  if (isDow && DOW_NAMES[upper] !== undefined) return DOW_NAMES[upper];
  const n = parseInt(token, 10);
  if (isNaN(n)) throw new Error(`Unknown token: ${token}`);
  return n;
}

interface FieldDef {
  min: number;
  max: number;
  isMonth?: boolean;
  isDow?: boolean;
}

function parseField(field: string, def: FieldDef): number[] {
  const { min, max, isMonth = false, isDow = false } = def;
  const result = new Set<number>();

  const parts = field.split(',');
  for (const part of parts) {
    if (part === '*') {
      for (let i = min; i <= max; i++) result.add(i);
      continue;
    }
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
      const [, base, stepStr] = stepMatch;
      const step = parseInt(stepStr, 10);
      let start = min;
      let end = max;
      if (base !== '*') {
        const rangeMatch = base.match(/^(.+)-(.+)$/);
        if (rangeMatch) {
          start = resolveToken(rangeMatch[1], isMonth, isDow);
          end = resolveToken(rangeMatch[2], isMonth, isDow);
        } else {
          start = resolveToken(base, isMonth, isDow);
        }
      }
      for (let i = start; i <= end; i += step) result.add(i);
      continue;
    }
    const rangeMatch = part.match(/^(.+)-(.+)$/);
    if (rangeMatch) {
      const start = resolveToken(rangeMatch[1], isMonth, isDow);
      const end = resolveToken(rangeMatch[2], isMonth, isDow);
      for (let i = start; i <= end; i++) result.add(i);
      continue;
    }
    result.add(resolveToken(part, isMonth, isDow));
  }
  return Array.from(result).sort((a, b) => a - b);
}

interface ParsedCron {
  minutes: number[];
  hours: number[];
  doms: number[];
  months: number[];
  dows: number[];
}

const ALIASES: Record<string, string> = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *',
};

function parseCron(expr: string): ParsedCron {
  const normalized = ALIASES[expr.trim().toLowerCase()] ?? expr.trim();
  const parts = normalized.split(/\s+/);
  if (parts.length !== 5) throw new Error('Cron expression must have exactly 5 fields (min hour dom month dow)');

  const [minF, hourF, domF, monF, dowF] = parts;
  return {
    minutes: parseField(minF, { min: 0, max: 59 }),
    hours: parseField(hourF, { min: 0, max: 23 }),
    doms: parseField(domF, { min: 1, max: 31 }),
    months: parseField(monF, { min: 1, max: 12, isMonth: true }),
    dows: parseField(dowF, { min: 0, max: 6, isDow: true }),
  };
}

function matchesCron(date: Date, parsed: ParsedCron): boolean {
  const m = date.getMonth() + 1; // 1-12
  const dom = date.getDate();    // 1-31
  const dow = date.getDay();     // 0-6
  const h = date.getHours();
  const min = date.getMinutes();

  if (!parsed.months.includes(m)) return false;
  if (!parsed.hours.includes(h)) return false;
  if (!parsed.minutes.includes(min)) return false;
  // cron uses OR logic when both dom and dow are restricted
  const domWild = parsed.doms.length === 31; // * means all 31
  const dowWild = parsed.dows.length === 7;
  if (domWild && dowWild) return true;
  if (domWild) return parsed.dows.includes(dow);
  if (dowWild) return parsed.doms.includes(dom);
  return parsed.doms.includes(dom) || parsed.dows.includes(dow);
}

function getNextRuns(expr: string, count: number = 10): Date[] {
  const parsed = parseCron(expr);
  const results: Date[] = [];
  // Start from next minute
  const start = new Date();
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() + 1);

  let cursor = new Date(start);
  const limit = new Date(start);
  limit.setFullYear(limit.getFullYear() + 2); // safety limit

  while (results.length < count && cursor < limit) {
    if (matchesCron(cursor, parsed)) {
      results.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

// ─── Human-readable Explainer ─────────────────────────────────────────────────

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOW_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DOW_LABELS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function describeField(values: number[], allCount: number, labels?: string[], unit?: string): string {
  if (values.length === allCount) return 'every ' + (unit ?? 'value');
  if (values.length === 1) {
    const v = values[0];
    return labels ? labels[v] ?? String(v) : String(v);
  }
  // Check for step pattern
  if (values.length > 1) {
    const diffs = values.slice(1).map((v, i) => v - values[i]);
    const allSame = diffs.every(d => d === diffs[0]);
    if (allSame && values[0] === 0) {
      return `every ${diffs[0]} ${unit ?? 'value'}s`;
    }
    if (allSame && diffs[0] > 0) {
      return `every ${diffs[0]} ${unit ?? 'value'}s starting at ${labels ? labels[values[0]] : values[0]}`;
    }
    // Check for contiguous range
    const isRange = diffs.every(d => d === 1);
    if (isRange) {
      const from = labels ? labels[values[0]] ?? values[0] : values[0];
      const to = labels ? labels[values[values.length - 1]] ?? values[values.length - 1] : values[values.length - 1];
      return `${from} through ${to}`;
    }
    const parts = values.map(v => labels ? labels[v] ?? String(v) : String(v));
    if (parts.length <= 4) return parts.join(', ');
    return `${parts.slice(0, 3).join(', ')} and ${parts.length - 3} more`;
  }
  return String(values[0]);
}

function formatTime(h: number, m: number): string {
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, '0');
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${hh}:${mm} ${ampm}`;
}

function explain(expr: string): string {
  try {
    const normalized = ALIASES[expr.trim().toLowerCase()];
    if (normalized) {
      const aliasMap: Record<string, string> = {
        '0 0 1 1 *': 'Once a year at midnight on January 1st (@yearly)',
        '0 0 1 * *': 'At midnight on the 1st of every month (@monthly)',
        '0 0 * * 0': 'At midnight every Sunday (@weekly)',
        '0 0 * * *': 'Every day at midnight (@daily)',
        '0 * * * *': 'At the start of every hour (@hourly)',
      };
      if (aliasMap[normalized]) return aliasMap[normalized];
    }

    const parsed = parseCron(expr);
    const { minutes, hours, doms, months, dows } = parsed;

    const allMins = minutes.length === 60;
    const allHours = hours.length === 24;
    const allDoms = doms.length === 31;
    const allMonths = months.length === 12;
    const allDows = dows.length === 7;

    const parts: string[] = [];

    // Time part
    if (allMins && allHours) {
      parts.push('every minute');
    } else if (allMins) {
      parts.push(`every minute of ${describeField(hours, 24, undefined, 'hour')} o'clock`);
    } else if (minutes.length === 1 && minutes[0] === 0) {
      if (hours.length === 1) {
        parts.push(`at ${formatTime(hours[0], 0)}`);
      } else if (allHours) {
        parts.push('at the top of every hour');
      } else {
        parts.push(`at the top of ${describeField(hours, 24, undefined, 'hour')}`);
      }
    } else if (hours.length === 1 && minutes.length === 1) {
      parts.push(`at ${formatTime(hours[0], minutes[0])}`);
    } else if (allHours) {
      // Check step for minutes
      const diffs = minutes.slice(1).map((v, i) => v - minutes[i]);
      const allSame = diffs.length > 0 && diffs.every(d => d === diffs[0]);
      if (allSame && minutes[0] === 0) {
        parts.push(`every ${diffs[0]} minutes`);
      } else {
        parts.push(`at minute ${describeField(minutes, 60, undefined, 'minute')} of every hour`);
      }
    } else {
      const minDesc = describeField(minutes, 60, undefined, 'minute');
      const hourDesc = describeField(hours, 24, undefined, 'hour');
      parts.push(`at minute ${minDesc} past ${hourDesc}`);
    }

    // Day/weekday part
    if (!allDoms && !allDows) {
      const domDesc = doms.map(d => ordinal(d)).join(', ');
      const dowDesc = dows.map(d => DOW_LABELS[d]).join(', ');
      parts.push(`on ${domDesc} and on ${dowDesc}`);
    } else if (!allDoms) {
      const domDesc = doms.length === 1 ? ordinal(doms[0]) : doms.map(d => ordinal(d)).join(', ');
      parts.push(`on the ${domDesc} of the month`);
    } else if (!allDows) {
      if (dows.length === 5 && !dows.includes(0) && !dows.includes(6)) {
        parts.push('every weekday (Mon–Fri)');
      } else if (dows.length === 2 && dows.includes(0) && dows.includes(6)) {
        parts.push('on weekends');
      } else {
        const dowDesc = dows.map(d => DOW_LABELS_SHORT[d]).join(', ');
        parts.push(`on ${dowDesc}`);
      }
    }

    // Month part
    if (!allMonths) {
      const monthDesc = months.map(m => MONTH_LABELS[m - 1]).join(', ');
      parts.push(`in ${monthDesc}`);
    }

    return parts.map((p, i) => i === 0 ? p.charAt(0).toUpperCase() + p.slice(1) : p).join(', ');
  } catch {
    return 'Invalid cron expression';
  }
}

// ─── Field Descriptor (colored badge text) ───────────────────────────────────

function fieldDescription(field: string, def: FieldDef, labels?: string[]): string {
  try {
    const vals = parseField(field, def);
    const allCount = def.max - def.min + 1;
    if (field === '*') return 'every ' + (labels ? labels[0]?.split(' ')[0] ?? 'value' : 'value') + ' (*)';
    if (vals.length === allCount) return 'every value';
    if (vals.length === 1) return labels ? (labels[vals[0]] ?? String(vals[0])) : String(vals[0]);
    const unit = labels ? undefined : undefined;
    return describeField(vals, allCount, labels, unit);
  } catch {
    return 'invalid';
  }
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS = [
  { label: '@hourly', value: '0 * * * *', desc: 'Every hour' },
  { label: '@daily', value: '0 0 * * *', desc: 'Every day at midnight' },
  { label: '@weekly', value: '0 0 * * 0', desc: 'Every Sunday at midnight' },
  { label: '@monthly', value: '0 0 1 * *', desc: 'First of every month' },
  { label: '@yearly', value: '0 0 1 1 *', desc: 'Jan 1st every year' },
  { label: 'Weekdays 9 AM', value: '0 9 * * 1-5', desc: 'Mon–Fri at 9:00 AM' },
  { label: 'Every 5 min', value: '*/5 * * * *', desc: 'Every 5 minutes' },
  { label: 'Every 15 min', value: '*/15 * * * *', desc: 'Every 15 minutes' },
  { label: 'Every 30 min', value: '*/30 * * * *', desc: 'Every 30 minutes' },
  { label: 'Midnight Mon', value: '0 0 * * 1', desc: 'Every Monday at midnight' },
  { label: '2 AM daily', value: '0 2 * * *', desc: 'Daily at 2:00 AM' },
  { label: '1st of month', value: '0 8 1 * *', desc: '1st of month at 8 AM' },
];

// ─── Visual Builder state ─────────────────────────────────────────────────────

interface BuilderState {
  minuteMode: 'every' | 'specific' | 'every-n' | 'range';
  minuteVal: string;
  minuteEveryN: string;
  minuteRangeFrom: string;
  minuteRangeTo: string;
  hourMode: 'every' | 'specific' | 'every-n' | 'range';
  hourVal: string;
  hourEveryN: string;
  hourRangeFrom: string;
  hourRangeTo: string;
  domMode: 'every' | 'specific';
  domVal: string;
  monthMode: 'every' | 'specific';
  monthVal: string;
  dowMode: 'every' | 'specific' | 'weekdays' | 'weekends';
  dowVal: string;
}

function builderToExpr(b: BuilderState): string {
  const minF = (() => {
    if (b.minuteMode === 'every') return '*';
    if (b.minuteMode === 'every-n') return `*/${b.minuteEveryN || '5'}`;
    if (b.minuteMode === 'range') return `${b.minuteRangeFrom || '0'}-${b.minuteRangeTo || '59'}`;
    return b.minuteVal || '0';
  })();
  const hourF = (() => {
    if (b.hourMode === 'every') return '*';
    if (b.hourMode === 'every-n') return `*/${b.hourEveryN || '2'}`;
    if (b.hourMode === 'range') return `${b.hourRangeFrom || '9'}-${b.hourRangeTo || '17'}`;
    return b.hourVal || '0';
  })();
  const domF = b.domMode === 'every' ? '*' : b.domVal || '1';
  const monF = b.monthMode === 'every' ? '*' : b.monthVal || '1';
  const dowF = (() => {
    if (b.dowMode === 'every') return '*';
    if (b.dowMode === 'weekdays') return '1-5';
    if (b.dowMode === 'weekends') return '0,6';
    return b.dowVal || '0';
  })();
  return `${minF} ${hourF} ${domF} ${monF} ${dowF}`;
}

// ─── Format helpers ───────────────────────────────────────────────────────────

function formatRunDate(d: Date): string {
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── Badge color per field ────────────────────────────────────────────────────

const FIELD_COLORS = [
  'bg-violet-100 text-violet-800 border-violet-200',
  'bg-sky-100 text-sky-800 border-sky-200',
  'bg-emerald-100 text-emerald-800 border-emerald-200',
  'bg-amber-100 text-amber-800 border-amber-200',
  'bg-rose-100 text-rose-800 border-rose-200',
];

// ─── Main Component ───────────────────────────────────────────────────────────

const DEFAULT_EXPR = '0 9 * * 1-5';

export default function CronExpressionClient() {
  const [input, setInput] = useState(DEFAULT_EXPR);
  const [expr, setExpr] = useState(DEFAULT_EXPR);
  const [error, setError] = useState<string | null>(null);
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [explanation, setExplanation] = useState('');
  const [copied, setCopied] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [builder, setBuilder] = useState<BuilderState>({
    minuteMode: 'specific', minuteVal: '0', minuteEveryN: '5', minuteRangeFrom: '0', minuteRangeTo: '30',
    hourMode: 'specific', hourVal: '9', hourEveryN: '2', hourRangeFrom: '9', hourRangeTo: '17',
    domMode: 'every', domVal: '1',
    monthMode: 'every', monthVal: '1',
    dowMode: 'weekdays', dowVal: '1',
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const parse = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    try {
      const runs = getNextRuns(trimmed);
      const desc = explain(trimmed);
      setExpr(trimmed);
      setNextRuns(runs);
      setExplanation(desc);
      setError(null);
      trackCtaClick('cron_expression', 'parse');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid cron expression');
      setNextRuns([]);
      setExplanation('');
    }
  }, []);

  // Parse on mount
  useEffect(() => {
    parse(DEFAULT_EXPR);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⌘+Enter shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        parse(input);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [input, parse]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(expr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCopy('cron_expression');
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  }, [expr]);

  const applyPreset = useCallback((value: string) => {
    setInput(value);
    parse(value);
  }, [parse]);

  // Sync builder -> expression
  const handleBuilderChange = useCallback((updates: Partial<BuilderState>) => {
    setBuilder(prev => {
      const next = { ...prev, ...updates };
      const generated = builderToExpr(next);
      setInput(generated);
      parse(generated);
      return next;
    });
  }, [parse]);

  // Parse the fields for breakdown display
  const fields: { label: string; raw: string; desc: string }[] = (() => {
    try {
      const normalized = ALIASES[expr.trim().toLowerCase()] ?? expr.trim();
      const parts = normalized.split(/\s+/);
      if (parts.length !== 5) return [];
      return [
        { label: 'minute', raw: parts[0], desc: fieldDescription(parts[0], { min: 0, max: 59 }) },
        { label: 'hour', raw: parts[1], desc: fieldDescription(parts[1], { min: 0, max: 23 }) },
        { label: 'day (month)', raw: parts[2], desc: fieldDescription(parts[2], { min: 1, max: 31 }) },
        { label: 'month', raw: parts[3], desc: fieldDescription(parts[3], { min: 1, max: 12, isMonth: true }, MONTH_LABELS) },
        { label: 'weekday', raw: parts[4], desc: fieldDescription(parts[4], { min: 0, max: 6, isDow: true }, DOW_LABELS_SHORT) },
      ];
    } catch {
      return [];
    }
  })();

  return (
    <ToolPageShell
      showFooterBand={false}
      title="Cron Expression Builder & Explainer"
      subtitle="Build and explain cron expressions instantly. See next 10 run times, get human-readable descriptions, and generate crontab syntax."
      toolName="cron_expression"
      icon="⏰"
      tool={
        <div className="space-y-6">

          {/* ── Input ─────────────────────────────────────── */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-zinc-700">
              Cron Expression
              <span className="ml-2 font-normal text-zinc-400 text-xs">(5 fields: min hour dom month dow)</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={1}
                  spellCheck={false}
                  placeholder="e.g. 0 9 * * 1-5"
                  className="w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <button
                type="button"
                onClick={() => parse(input)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
              >
                <Play className="h-4 w-4" aria-hidden />
                Parse
              </button>
            </div>
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <p className="text-[11.5px] text-zinc-400">
              Press <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px]">⌘</kbd>
              +<kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px]">Enter</kbd> to parse
            </p>
          </div>

          {/* ── Presets ───────────────────────────────────── */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Common Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => applyPreset(p.value)}
                  title={p.desc}
                  className={`group flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all ${
                    input === p.value
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-700'
                  }`}
                >
                  <Zap className="h-3 w-3 opacity-60" aria-hidden />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Explanation + Copy ────────────────────────── */}
          {explanation && !error && (
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <AlarmClock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">Human-readable</p>
                    <p className="text-base font-semibold text-zinc-900 leading-snug">{explanation}</p>
                    <p className="mt-1 font-mono text-sm text-zinc-500">{expr}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[12px] font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-100 active:scale-95"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* ── Field breakdown ───────────────────────────── */}
          {fields.length > 0 && !error && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Field Breakdown</p>
              <div className="flex flex-wrap gap-2">
                {fields.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] ${FIELD_COLORS[i]}`}
                  >
                    <span className="font-semibold">{f.label}:</span>
                    <code className="font-mono font-bold">{f.raw}</code>
                    <ChevronRight className="h-3 w-3 opacity-40" aria-hidden />
                    <span>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Next Run Times ────────────────────────────── */}
          {nextRuns.length > 0 && !error && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Next 10 Run Times (local time)</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                {nextRuns.map((d, i) => (
                  <div
                    key={d.toISOString()}
                    className={`flex items-center gap-3 px-4 py-2.5 ${i < nextRuns.length - 1 ? 'border-b border-zinc-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/60'}`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                      {i + 1}
                    </span>
                    <Clock className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
                    <span className="font-mono text-[12.5px] text-zinc-700">{formatRunDate(d)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Visual Builder ────────────────────────────── */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <button
              type="button"
              onClick={() => setBuilderOpen(o => !o)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-zinc-50"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-zinc-500" aria-hidden />
                <span className="text-sm font-semibold text-zinc-800">Visual Builder</span>
                <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10.5px] font-medium text-zinc-500">
                  interactive
                </span>
              </div>
              <ChevronRight
                className={`h-4 w-4 text-zinc-400 transition-transform ${builderOpen ? 'rotate-90' : ''}`}
                aria-hidden
              />
            </button>

            {builderOpen && (
              <div className="border-t border-zinc-200 px-5 py-5 space-y-5">
                <p className="text-[12px] text-zinc-500">
                  Adjust each field — the cron expression and explanation update instantly.
                </p>

                {/* Minute */}
                <BuilderField
                  label="Minute"
                  color="violet"
                  modes={[
                    { value: 'every', label: 'Every minute (*)' },
                    { value: 'specific', label: 'Specific minute' },
                    { value: 'every-n', label: 'Every N minutes' },
                    { value: 'range', label: 'Range' },
                  ]}
                  mode={builder.minuteMode}
                  onModeChange={m => handleBuilderChange({ minuteMode: m as BuilderState['minuteMode'] })}
                >
                  {builder.minuteMode === 'specific' && (
                    <NumInput label="Minute (0–59)" min={0} max={59} value={builder.minuteVal}
                      onChange={v => handleBuilderChange({ minuteVal: v })} />
                  )}
                  {builder.minuteMode === 'every-n' && (
                    <NumInput label="Every N minutes" min={1} max={30} value={builder.minuteEveryN}
                      onChange={v => handleBuilderChange({ minuteEveryN: v })} />
                  )}
                  {builder.minuteMode === 'range' && (
                    <RangeInput
                      fromVal={builder.minuteRangeFrom} toVal={builder.minuteRangeTo}
                      min={0} max={59}
                      onFrom={v => handleBuilderChange({ minuteRangeFrom: v })}
                      onTo={v => handleBuilderChange({ minuteRangeTo: v })}
                    />
                  )}
                </BuilderField>

                {/* Hour */}
                <BuilderField
                  label="Hour"
                  color="sky"
                  modes={[
                    { value: 'every', label: 'Every hour (*)' },
                    { value: 'specific', label: 'Specific hour' },
                    { value: 'every-n', label: 'Every N hours' },
                    { value: 'range', label: 'Range' },
                  ]}
                  mode={builder.hourMode}
                  onModeChange={m => handleBuilderChange({ hourMode: m as BuilderState['hourMode'] })}
                >
                  {builder.hourMode === 'specific' && (
                    <NumInput label="Hour (0–23)" min={0} max={23} value={builder.hourVal}
                      onChange={v => handleBuilderChange({ hourVal: v })} />
                  )}
                  {builder.hourMode === 'every-n' && (
                    <NumInput label="Every N hours" min={1} max={12} value={builder.hourEveryN}
                      onChange={v => handleBuilderChange({ hourEveryN: v })} />
                  )}
                  {builder.hourMode === 'range' && (
                    <RangeInput
                      fromVal={builder.hourRangeFrom} toVal={builder.hourRangeTo}
                      min={0} max={23}
                      onFrom={v => handleBuilderChange({ hourRangeFrom: v })}
                      onTo={v => handleBuilderChange({ hourRangeTo: v })}
                    />
                  )}
                </BuilderField>

                {/* Day of month */}
                <BuilderField
                  label="Day (month)"
                  color="emerald"
                  modes={[
                    { value: 'every', label: 'Every day (*)' },
                    { value: 'specific', label: 'Specific day' },
                  ]}
                  mode={builder.domMode}
                  onModeChange={m => handleBuilderChange({ domMode: m as BuilderState['domMode'] })}
                >
                  {builder.domMode === 'specific' && (
                    <NumInput label="Day (1–31)" min={1} max={31} value={builder.domVal}
                      onChange={v => handleBuilderChange({ domVal: v })} />
                  )}
                </BuilderField>

                {/* Month */}
                <BuilderField
                  label="Month"
                  color="amber"
                  modes={[
                    { value: 'every', label: 'Every month (*)' },
                    { value: 'specific', label: 'Specific month' },
                  ]}
                  mode={builder.monthMode}
                  onModeChange={m => handleBuilderChange({ monthMode: m as BuilderState['monthMode'] })}
                >
                  {builder.monthMode === 'specific' && (
                    <SelectInput
                      label="Month"
                      value={builder.monthVal}
                      onChange={v => handleBuilderChange({ monthVal: v })}
                      options={MONTH_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))}
                    />
                  )}
                </BuilderField>

                {/* Weekday */}
                <BuilderField
                  label="Weekday"
                  color="rose"
                  modes={[
                    { value: 'every', label: 'Every day (*)' },
                    { value: 'weekdays', label: 'Weekdays (Mon–Fri)' },
                    { value: 'weekends', label: 'Weekends (Sat–Sun)' },
                    { value: 'specific', label: 'Specific day' },
                  ]}
                  mode={builder.dowMode}
                  onModeChange={m => handleBuilderChange({ dowMode: m as BuilderState['dowMode'] })}
                >
                  {builder.dowMode === 'specific' && (
                    <SelectInput
                      label="Weekday"
                      value={builder.dowVal}
                      onChange={v => handleBuilderChange({ dowVal: v })}
                      options={DOW_LABELS.map((l, i) => ({ value: String(i), label: l }))}
                    />
                  )}
                </BuilderField>

                {/* Generated expression */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">Generated Expression</p>
                  <code className="font-mono text-sm font-bold text-zinc-900">{input}</code>
                </div>
              </div>
            )}
          </div>

        </div>
      }
    />
  );
}

// ─── Builder Sub-components ───────────────────────────────────────────────────

type ColorKey = 'violet' | 'sky' | 'emerald' | 'amber' | 'rose';

const COLOR_MAP: Record<ColorKey, { badge: string; select: string }> = {
  violet: { badge: 'bg-violet-100 text-violet-700 border-violet-200', select: 'border-violet-300 focus:ring-violet-200' },
  sky:    { badge: 'bg-sky-100 text-sky-700 border-sky-200',          select: 'border-sky-300 focus:ring-sky-200' },
  emerald:{ badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', select: 'border-emerald-300 focus:ring-emerald-200' },
  amber:  { badge: 'bg-amber-100 text-amber-700 border-amber-200',    select: 'border-amber-300 focus:ring-amber-200' },
  rose:   { badge: 'bg-rose-100 text-rose-700 border-rose-200',       select: 'border-rose-300 focus:ring-rose-200' },
};

function BuilderField({
  label, color, modes, mode, onModeChange, children,
}: {
  label: string;
  color: ColorKey;
  modes: { value: string; label: string }[];
  mode: string;
  onModeChange: (m: string) => void;
  children?: React.ReactNode;
}) {
  const colors = COLOR_MAP[color];
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
      <span className={`inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[11px] font-semibold ${colors.badge} sm:w-28 sm:justify-center`}>
        {label}
      </span>
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <select
          value={mode}
          onChange={e => onModeChange(e.target.value)}
          className={`rounded-lg border px-3 py-1.5 text-[12.5px] text-zinc-700 focus:outline-none focus:ring-2 ${colors.select} bg-white`}
        >
          {modes.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        {children}
      </div>
    </div>
  );
}

function NumInput({
  label, min, max, value, onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="number"
      aria-label={label}
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-20 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-center font-mono text-[13px] text-zinc-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
    />
  );
}

function RangeInput({
  fromVal, toVal, min, max, onFrom, onTo,
}: {
  fromVal: string;
  toVal: string;
  min: number;
  max: number;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        aria-label="Range from"
        min={min} max={max}
        value={fromVal}
        onChange={e => onFrom(e.target.value)}
        className="w-16 rounded-lg border border-zinc-300 px-2 py-1.5 text-center font-mono text-[13px] text-zinc-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
      <span className="text-xs text-zinc-400">to</span>
      <input
        type="number"
        aria-label="Range to"
        min={min} max={max}
        value={toVal}
        onChange={e => onTo(e.target.value)}
        className="w-16 rounded-lg border border-zinc-300 px-2 py-1.5 text-center font-mono text-[13px] text-zinc-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}

function SelectInput({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-[12.5px] text-zinc-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
