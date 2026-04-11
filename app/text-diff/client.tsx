'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { Copy, Check, Trash2, ArrowLeftRight, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Diff engine ────────────────────────────────────────────────────────────

type DiffOp = 'equal' | 'insert' | 'delete';
type DiffPart = { op: DiffOp; text: string };

/** LCS-based line-level diff */
function diffLines(a: string, b: string): DiffPart[] {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const m = aLines.length, n = bLines.length;

  // LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (aLines[i - 1] === bLines[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack
  const parts: DiffPart[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
      parts.unshift({ op: 'equal', text: aLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      parts.unshift({ op: 'insert', text: bLines[j - 1] });
      j--;
    } else {
      parts.unshift({ op: 'delete', text: aLines[i - 1] });
      i--;
    }
  }
  return parts;
}

/** Character-level inline diff for changed lines */
function diffChars(a: string, b: string): DiffPart[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const parts: DiffPart[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      parts.unshift({ op: 'equal', text: a[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      parts.unshift({ op: 'insert', text: b[j - 1] });
      j--;
    } else {
      parts.unshift({ op: 'delete', text: a[i - 1] });
      i--;
    }
  }

  // Merge consecutive same-op chars
  const merged: DiffPart[] = [];
  for (const p of parts) {
    if (merged.length && merged[merged.length - 1].op === p.op) {
      merged[merged.length - 1].text += p.text;
    } else {
      merged.push({ ...p });
    }
  }
  return merged;
}

// ── Stats helper ───────────────────────────────────────────────────────────

function computeStats(parts: DiffPart[]) {
  let added = 0, removed = 0, unchanged = 0;
  for (const p of parts) {
    if (p.op === 'insert') added++;
    else if (p.op === 'delete') removed++;
    else unchanged++;
  }
  return { added, removed, unchanged };
}

// ── Unified view ───────────────────────────────────────────────────────────

function UnifiedView({ parts, inline }: { parts: DiffPart[]; inline: boolean }) {
  // Pair up delete/insert adjacent lines for inline char diff
  const rows: { type: 'equal' | 'delete' | 'insert' | 'pair'; aText?: string; bText?: string; text?: string }[] = [];

  if (inline) {
    let i = 0;
    while (i < parts.length) {
      const p = parts[i];
      if (p.op === 'delete' && i + 1 < parts.length && parts[i + 1].op === 'insert') {
        rows.push({ type: 'pair', aText: p.text, bText: parts[i + 1].text });
        i += 2;
      } else if (p.op === 'equal') {
        rows.push({ type: 'equal', text: p.text });
        i++;
      } else {
        rows.push({ type: p.op, text: p.text });
        i++;
      }
    }
  }

  if (!inline) {
    return (
      <div className="font-mono text-[12.5px] leading-6">
        {parts.map((p, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 px-3 py-0.5 ${
              p.op === 'insert' ? 'bg-emerald-50 text-emerald-900' :
              p.op === 'delete' ? 'bg-red-50 text-red-900' :
              'text-zinc-600'
            }`}
          >
            <span className="shrink-0 w-4 font-bold select-none opacity-60">
              {p.op === 'insert' ? '+' : p.op === 'delete' ? '−' : ' '}
            </span>
            <span className="whitespace-pre-wrap break-all">{p.text || '\u00a0'}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="font-mono text-[12.5px] leading-6">
      {rows.map((row, idx) => {
        if (row.type === 'equal') {
          return (
            <div key={idx} className="flex items-start gap-2 px-3 py-0.5 text-zinc-600">
              <span className="shrink-0 w-4 select-none opacity-60"> </span>
              <span className="whitespace-pre-wrap break-all">{row.text || '\u00a0'}</span>
            </div>
          );
        }
        if (row.type === 'delete') {
          return (
            <div key={idx} className="flex items-start gap-2 px-3 py-0.5 bg-red-50 text-red-900">
              <span className="shrink-0 w-4 font-bold select-none opacity-60">−</span>
              <span className="whitespace-pre-wrap break-all">{row.text || '\u00a0'}</span>
            </div>
          );
        }
        if (row.type === 'insert') {
          return (
            <div key={idx} className="flex items-start gap-2 px-3 py-0.5 bg-emerald-50 text-emerald-900">
              <span className="shrink-0 w-4 font-bold select-none opacity-60">+</span>
              <span className="whitespace-pre-wrap break-all">{row.text || '\u00a0'}</span>
            </div>
          );
        }
        // pair — show char-level diff
        const charDiff = diffChars(row.aText ?? '', row.bText ?? '');
        return (
          <div key={idx} className="flex flex-col">
            <div className="flex items-start gap-2 px-3 py-0.5 bg-red-50 text-red-900">
              <span className="shrink-0 w-4 font-bold select-none opacity-60">−</span>
              <span className="whitespace-pre-wrap break-all">
                {charDiff.map((c, ci) =>
                  c.op === 'delete'
                    ? <mark key={ci} className="rounded bg-red-300/60 text-red-900">{c.text}</mark>
                    : c.op === 'equal'
                    ? <span key={ci}>{c.text}</span>
                    : null
                )}
                {'\u00a0'}
              </span>
            </div>
            <div className="flex items-start gap-2 px-3 py-0.5 bg-emerald-50 text-emerald-900">
              <span className="shrink-0 w-4 font-bold select-none opacity-60">+</span>
              <span className="whitespace-pre-wrap break-all">
                {charDiff.map((c, ci) =>
                  c.op === 'insert'
                    ? <mark key={ci} className="rounded bg-emerald-300/60 text-emerald-900">{c.text}</mark>
                    : c.op === 'equal'
                    ? <span key={ci}>{c.text}</span>
                    : null
                )}
                {'\u00a0'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Side-by-side view ──────────────────────────────────────────────────────

function SideBySideView({ parts }: { parts: DiffPart[] }) {
  const left: { op: DiffOp; text: string }[] = [];
  const right: { op: DiffOp; text: string }[] = [];

  let i = 0;
  while (i < parts.length) {
    const p = parts[i];
    if (p.op === 'delete' && i + 1 < parts.length && parts[i + 1].op === 'insert') {
      left.push({ op: 'delete', text: p.text });
      right.push({ op: 'insert', text: parts[i + 1].text });
      i += 2;
    } else if (p.op === 'delete') {
      left.push({ op: 'delete', text: p.text });
      right.push({ op: 'equal', text: '' });
      i++;
    } else if (p.op === 'insert') {
      left.push({ op: 'equal', text: '' });
      right.push({ op: 'insert', text: p.text });
      i++;
    } else {
      left.push({ op: 'equal', text: p.text });
      right.push({ op: 'equal', text: p.text });
      i++;
    }
  }

  const lineCount = left.length;
  const lineNums = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 divide-x divide-zinc-200 font-mono text-[12px] leading-6 overflow-x-auto">
      {/* Left */}
      <div>
        <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Original
        </div>
        {left.map((l, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 px-3 py-0.5 ${
              l.op === 'delete' ? 'bg-red-50 text-red-900' : 'text-zinc-600'
            }`}
          >
            <span className="shrink-0 w-7 text-right text-[10px] text-zinc-300 select-none pt-0.5">
              {l.text !== '' ? lineNums[idx] : ''}
            </span>
            <span className="whitespace-pre-wrap break-all">{l.text || '\u00a0'}</span>
          </div>
        ))}
      </div>
      {/* Right */}
      <div>
        <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Changed
        </div>
        {right.map((r, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 px-3 py-0.5 ${
              r.op === 'insert' ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-600'
            }`}
          >
            <span className="shrink-0 w-7 text-right text-[10px] text-zinc-300 select-none pt-0.5">
              {r.text !== '' ? lineNums[idx] : ''}
            </span>
            <span className="whitespace-pre-wrap break-all">{r.text || '\u00a0'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Copy button ─────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* blocked */ }
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ── Sample texts ───────────────────────────────────────────────────────────

const SAMPLE_A = `function fetchUser(id) {
  const url = "/api/users/" + id;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));
}`;

const SAMPLE_B = `async function fetchUser(id: string) {
  const url = \`/api/v2/users/\${id}\`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
}`;

// ── Main component ──────────────────────────────────────────────────────────

function TextDiffTool() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [inlineChars, setInlineChars] = useState(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [showOnlyChanges, setShowOnlyChanges] = useState(false);

  const normalize = useCallback((t: string) => {
    let s = t;
    if (ignoreCase) s = s.toLowerCase();
    if (ignoreWhitespace) s = s.split('\n').map(l => l.trim()).join('\n');
    return s;
  }, [ignoreCase, ignoreWhitespace]);

  const parts = useMemo(() => diffLines(normalize(textA), normalize(textB)), [textA, textB, normalize]);

  const filteredParts = useMemo(() =>
    showOnlyChanges ? parts.filter(p => p.op !== 'equal') : parts,
    [parts, showOnlyChanges]
  );

  const { added, removed, unchanged } = useMemo(() => computeStats(parts), [parts]);

  const swap = useCallback(() => {
    setTextA(textB);
    setTextB(textA);
  }, [textA, textB]);

  const loadSample = useCallback(() => {
    setTextA(SAMPLE_A);
    setTextB(SAMPLE_B);
  }, []);

  const hasDiff = textA.trim() || textB.trim();
  const hasChanges = added > 0 || removed > 0;

  return (
    <div className="space-y-4 p-3 sm:p-5">

      {/* ── Inputs ──────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-[9px] font-bold text-zinc-600">A</span>
              Original
            </label>
            <button
              onClick={() => setTextA('')}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
          <textarea
            value={textA}
            onChange={e => setTextA(e.target.value)}
            placeholder="Paste original text or code here…"
            rows={12}
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-mono text-[12.5px] leading-6 text-zinc-800 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 placeholder-zinc-300"
            spellCheck={false}
          />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700">B</span>
              Changed
            </label>
            <button
              onClick={() => setTextB('')}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
          <textarea
            value={textB}
            onChange={e => setTextB(e.target.value)}
            placeholder="Paste changed text or code here…"
            rows={12}
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-mono text-[12.5px] leading-6 text-zinc-800 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 placeholder-zinc-300"
            spellCheck={false}
          />
        </div>
      </div>

      {/* ── Action row ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={swap}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[12px] font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Swap A ↔ B
        </button>
        <button
          onClick={loadSample}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[12px] font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50"
        >
          <FileText className="h-3.5 w-3.5" />
          Load sample
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Options */}
        {[
          { label: 'Ignore whitespace', value: ignoreWhitespace, set: setIgnoreWhitespace },
          { label: 'Ignore case', value: ignoreCase, set: setIgnoreCase },
          { label: 'Changes only', value: showOnlyChanges, set: setShowOnlyChanges },
        ].map(({ label, value, set }) => (
          <label key={label} className="flex cursor-pointer items-center gap-1.5 text-[12px] text-zinc-600 select-none">
            <input
              type="checkbox"
              checked={value}
              onChange={e => set(e.target.checked)}
              className="h-3.5 w-3.5 accent-zinc-900 rounded"
            />
            {label}
          </label>
        ))}
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      {hasDiff && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11.5px] font-semibold text-emerald-700">
            +{added} added
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11.5px] font-semibold text-red-600">
            −{removed} removed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11.5px] font-semibold text-zinc-500">
            {unchanged} unchanged
          </span>
          {!hasChanges && <span className="text-[12px] text-emerald-600 font-semibold">✓ Files are identical</span>}
        </div>
      )}

      {/* ── Diff output ─────────────────────────────────────── */}
      {hasDiff && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2.5">
            {/* View mode tabs */}
            <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5">
              {(['unified', 'split'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`rounded-md px-3 py-1 text-[11.5px] font-semibold capitalize transition ${
                    viewMode === m
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {viewMode === 'unified' && (
              <label className="flex cursor-pointer items-center gap-1.5 text-[12px] text-zinc-600 select-none">
                <input
                  type="checkbox"
                  checked={inlineChars}
                  onChange={e => setInlineChars(e.target.checked)}
                  className="h-3.5 w-3.5 accent-zinc-900 rounded"
                />
                Inline char diff
              </label>
            )}

            <div className="flex-1" />
            <CopyBtn
              text={parts.map(p => `${p.op === 'insert' ? '+' : p.op === 'delete' ? '-' : ' '} ${p.text}`).join('\n')}
              label="Copy diff"
            />
          </div>

          {/* Output */}
          <div className="max-h-[600px] overflow-y-auto">
            {viewMode === 'unified'
              ? <UnifiedView parts={filteredParts} inline={inlineChars} />
              : <SideBySideView parts={filteredParts} />
            }
          </div>
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────── */}
      {!hasDiff && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 py-14 text-center">
          <span className="text-3xl">↕️</span>
          <p className="text-sm font-medium text-zinc-500">Paste text in both boxes above to see the diff</p>
          <button
            onClick={loadSample}
            className="mt-1 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-medium text-zinc-600 shadow-sm hover:bg-zinc-50"
          >
            Try a sample
          </button>
        </div>
      )}
    </div>
  );
}

export default function TextDiffClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Text & Code Diff Checker"
      subtitle="Instantly compare two texts or code files. See added, removed, and unchanged lines highlighted. Unified or side-by-side view with inline character-level diffs — 100% in-browser."
      toolName="text_diff"
      icon="↕️"
      features={['Line & char diff', 'Side-by-side', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<TextDiffTool />}
    />
  );
}
