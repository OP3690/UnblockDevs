'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { trackCtaClick, trackCopy } from '@/lib/analytics';
import { CheckCircle, AlertTriangle, Clipboard, ClipboardCheck, Maximize2, Minimize2, BarChart2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const SAMPLES = [
  { label: 'Simple', json: '{\n  "name": "Alice",\n  "age": 30,\n  "active": true,\n  "score": null\n}' },
  {
    label: 'Nested',
    json: '{\n  "user": {\n    "id": 1,\n    "profile": { "name": "Bob", "city": "NYC" },\n    "tags": ["admin", "user"]\n  }\n}',
  },
  {
    label: 'Array',
    json: '[{"id":1,"name":"Widget A","price":9.99,"inStock":true},{"id":2,"name":"Widget B","price":24.5,"inStock":false}]',
  },
  {
    label: 'API response',
    json: '{\n  "status": "success",\n  "data": {\n    "items": [{"id": 1, "title": "Item A"}, {"id": 2, "title": "Item B"}],\n    "total": 2,\n    "page": 1\n  },\n  "meta": {"requestId": "req_abc123", "timestamp": 1710000000}\n}',
  },
  {
    label: '❌ Invalid',
    json: '{\n  "name": "broken",\n  "values": [1, 2, 3,],\n  key_no_quotes: "oops"\n}',
  },
];

function computeJsonStats(json: string): {
  keyCount: number; depth: number; arrayCount: number;
  nullCount: number; strCount: number; numCount: number; boolCount: number;
} | null {
  try {
    const parsed = JSON.parse(json);
    let keyCount = 0, arrayCount = 0, nullCount = 0, strCount = 0, numCount = 0, boolCount = 0, maxDepth = 0;
    function walk(val: unknown, d: number) {
      maxDepth = Math.max(maxDepth, d);
      if (val === null) { nullCount++; return; }
      if (typeof val === 'string') { strCount++; return; }
      if (typeof val === 'number') { numCount++; return; }
      if (typeof val === 'boolean') { boolCount++; return; }
      if (Array.isArray(val)) { arrayCount++; val.forEach((v) => walk(v, d + 1)); return; }
      if (typeof val === 'object') {
        const keys = Object.keys(val as object);
        keyCount += keys.length;
        keys.forEach((k) => walk((val as Record<string, unknown>)[k], d + 1));
      }
    }
    walk(parsed, 0);
    return { keyCount, depth: maxDepth, arrayCount, nullCount, strCount, numCount, boolCount };
  } catch { return null; }
}

const BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/json' },
  { label: 'JSON', href: '/tools/json' },
  { label: 'JSON Validator' },
];

function JsonValidatorTool() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  type ValidationResult =
    | { valid: true }
    | { valid: false; error: string; line?: number; col?: number };

  const result: ValidationResult | null = useMemo(() => {
    if (!input.trim()) return null;
    try {
      JSON.parse(input);
      return { valid: true };
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : String(e);
      const lineColMatch = msg.match(/line (\d+) column (\d+)/);
      if (lineColMatch) {
        return { valid: false, error: msg, line: parseInt(lineColMatch[1]), col: parseInt(lineColMatch[2]) };
      }
      return { valid: false, error: msg };
    }
  }, [input]);

  const stats = useMemo(
    () => (result?.valid ? computeJsonStats(input) : null),
    [result, input]
  );

  const handleCopy = useCallback(() => {
    if (!input) return;
    trackCopy('json_validator');
    navigator.clipboard.writeText(input).then(
      () => {
        setCopied(true);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      },
      () => toast.error('Copy failed'),
    );
  }, [input]);

  const handleClear = useCallback(() => {
    trackCtaClick('json_validator', 'clear');
    setInput('');
  }, []);

  const handlePaste = useCallback(async () => {
    trackCtaClick('json_validator', 'paste_clipboard');
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      toast.error('Paste failed — use Ctrl+V in the textarea');
    }
  }, []);

  const handleFormat = useCallback(() => {
    try {
      const pretty = JSON.stringify(JSON.parse(input), null, 2);
      setInput(pretty);
      trackCtaClick('json_validator', 'format');
      toast.success('Formatted');
    } catch { toast.error('Cannot format — invalid JSON'); }
  }, [input]);

  const handleMinify = useCallback(() => {
    try {
      const compact = JSON.stringify(JSON.parse(input));
      setInput(compact);
      trackCtaClick('json_validator', 'minify');
      toast.success('Minified');
    } catch { toast.error('Cannot minify — invalid JSON'); }
  }, [input]);

  // ⌘+Enter / Ctrl+Enter → format JSON
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (input.trim()) handleFormat();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="space-y-4">
      {/* Sample buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500 font-medium">Samples:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => { trackCtaClick('json_validator', 'load_sample'); setInput(s.json); }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <Zap className="w-3 h-3 text-amber-500" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-zinc-500">Paste JSON below. All validation runs in your browser.</p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleFormat}
            disabled={!input}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
            title="Pretty-print JSON with 2-space indentation (⌘+Enter)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Format
            <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-300 bg-zinc-100 px-1 py-0.5 font-mono text-[9px] text-zinc-400">⌘↵</kbd>
          </button>
          <button
            type="button"
            onClick={handleMinify}
            disabled={!input}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
            title="Remove all whitespace"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            Minify
          </button>
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <Clipboard className="w-3.5 h-3.5" />
            Paste
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!input}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
          >
            {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
            Copy
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40"
          >
            Clear
          </button>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'{\n  "key": "value"\n}'}
        rows={16}
        spellCheck={false}
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-y"
      />

      {result !== null && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            result.valid
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {result.valid ? (
            <>
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" aria-hidden />
              <p className="font-semibold">Valid JSON</p>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" aria-hidden />
              <div>
                <p className="font-semibold mb-0.5">Invalid JSON</p>
                <p className="font-mono text-xs leading-relaxed text-red-700">{result.error}</p>
                {result.line !== undefined && (
                  <p className="text-xs mt-1 text-red-600">
                    Line {result.line}{result.col !== undefined ? `, column ${result.col}` : ''}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Stats panel */}
      {stats && (
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <BarChart2 className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-semibold text-zinc-600">JSON Stats</span>
            <span className="text-xs text-zinc-400">{input.length.toLocaleString()} chars</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="text-center">
              <div className="text-lg font-bold text-zinc-800">{stats.keyCount}</div>
              <div className="text-zinc-500">keys</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-zinc-800">{stats.depth}</div>
              <div className="text-zinc-500">max depth</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-zinc-800">{stats.arrayCount}</div>
              <div className="text-zinc-500">arrays</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-zinc-800">{stats.nullCount}</div>
              <div className="text-zinc-500">nulls</div>
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {stats.strCount > 0 && <span className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-xs text-blue-700">{stats.strCount} strings</span>}
            {stats.numCount > 0 && <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs text-emerald-700">{stats.numCount} numbers</span>}
            {stats.boolCount > 0 && <span className="rounded-full bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-xs text-amber-700">{stats.boolCount} booleans</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JsonValidatorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="JSON Validator"
      subtitle="Validate JSON syntax instantly — detailed error messages, 100% in browser"
      toolName="json_validator"
      icon="✅"
      features={['Syntax validation', 'Error location', 'No signup', 'Free forever']}
      tool={<JsonValidatorTool />}
    />
  );
}
