'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, AlertCircle, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── TypeScript generator engine ────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^./, c => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

interface GenOptions {
  mode: 'interface' | 'type' | 'zod';
  rootName: string;
  optionals: boolean;
  semicolons: boolean;
  exportAll: boolean;
}

class TsGenerator {
  private defs = new Map<string, string>();
  private nameCount = new Map<string, number>();

  private uniqueName(base: string): string {
    const count = this.nameCount.get(base) ?? 0;
    this.nameCount.set(base, count + 1);
    return count === 0 ? base : `${base}${count}`;
  }

  private inferType(value: unknown, name: string, opts: GenOptions): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    const t = typeof value;
    if (t === 'string') return 'string';
    if (t === 'number') return Number.isInteger(value) ? 'number' : 'number';
    if (t === 'boolean') return 'boolean';

    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]';
      const childName = `${name}Item`;
      const types = [...new Set(value.map(v => this.inferType(v, childName, opts)))];
      const inner = types.length === 1 ? types[0] : `(${types.join(' | ')})`;
      return `${inner}[]`;
    }

    if (t === 'object') {
      return this.processObject(value as Record<string, unknown>, name, opts);
    }

    return 'unknown';
  }

  private processObject(obj: Record<string, unknown>, name: string, opts: GenOptions): string {
    const iname = this.uniqueName(toPascalCase(name || 'Object'));
    const sc = opts.semicolons ? ';' : ',';
    const entries = Object.entries(obj);

    if (entries.length === 0) {
      const body = `Record<string, unknown>`;
      const ex = opts.exportAll ? 'export ' : '';
      if (opts.mode === 'interface') {
        this.defs.set(iname, `${ex}interface ${iname} {}\n`);
      } else if (opts.mode === 'type') {
        this.defs.set(iname, `${ex}type ${iname} = {}\n`);
      } else {
        this.defs.set(iname, `${ex}const ${iname}Schema = z.object({})\n`);
      }
      return iname;
    }

    const fields = entries.map(([key, val]) => {
      const childName = toPascalCase(key);
      const tsType = this.inferType(val, childName, opts);
      const optional = opts.optionals && val === null ? '?' : '';
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;

      if (opts.mode === 'zod') {
        const zodType = this.toZodType(tsType, val);
        return `  ${safeKey}: ${zodType}`;
      }
      return `  ${safeKey}${optional}: ${tsType}${sc}`;
    });

    const ex = opts.exportAll ? 'export ' : '';
    let def = '';
    if (opts.mode === 'interface') {
      def = `${ex}interface ${iname} {\n${fields.join('\n')}\n}`;
    } else if (opts.mode === 'type') {
      def = `${ex}type ${iname} = {\n${fields.join('\n')}\n}`;
    } else {
      def = `${ex}const ${iname}Schema = z.object({\n${fields.join(',\n')},\n})`;
    }
    this.defs.set(iname, def);
    return iname;
  }

  private toZodType(tsType: string, val: unknown): string {
    if (val === null) return 'z.null()';
    if (typeof val === 'string') return 'z.string()';
    if (typeof val === 'number') return Number.isInteger(val) ? 'z.number().int()' : 'z.number()';
    if (typeof val === 'boolean') return 'z.boolean()';
    if (Array.isArray(val)) {
      if (val.length === 0) return 'z.array(z.unknown())';
      const inner = this.toZodType('', val[0]);
      return `z.array(${inner})`;
    }
    if (typeof val === 'object') {
      return `${tsType}Schema`;
    }
    return 'z.unknown()';
  }

  generate(json: string, opts: GenOptions): string {
    this.defs.clear();
    this.nameCount.clear();

    const parsed = JSON.parse(json);
    const root = Array.isArray(parsed) ? parsed : parsed;
    this.inferType(root, opts.rootName, opts);

    const defs = [...this.defs.values()].reverse();

    if (opts.mode === 'zod') {
      return `import { z } from 'zod';\n\n${defs.join('\n\n')}`;
    }
    return defs.join('\n\n');
  }
}

// ── Samples ────────────────────────────────────────────────────────────────

const SAMPLES: { label: string; icon: string; json: string; name: string }[] = [
  {
    label: 'User profile',
    icon: '👤',
    name: 'User',
    json: JSON.stringify({
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 29,
      isVerified: true,
      avatar: null,
      address: { street: '123 Main St', city: 'San Francisco', country: 'US', zip: '94102' },
      tags: ['developer', 'designer'],
      scores: [98, 87, 94],
    }, null, 2),
  },
  {
    label: 'API response',
    icon: '🔗',
    name: 'ApiResponse',
    json: JSON.stringify({
      success: true,
      status: 200,
      message: 'OK',
      data: { items: [{ id: 'abc', title: 'Hello', views: 1200, published: true }], total: 1, page: 1, perPage: 20 },
      meta: { requestId: 'req_123', latencyMs: 42 },
    }, null, 2),
  },
  {
    label: 'Config file',
    icon: '⚙️',
    name: 'AppConfig',
    json: JSON.stringify({
      appName: 'MyApp',
      version: '2.1.0',
      debug: false,
      database: { host: 'localhost', port: 5432, name: 'mydb', ssl: true },
      cache: { ttl: 3600, maxSize: 1000, strategy: 'lru' },
      features: ['auth', 'api', 'webhooks'],
    }, null, 2),
  },
];

// ── Copy button ────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{ok ? 'Copied!' : label}</span>
    </button>
  );
}

// ── Syntax highlight (simple) ──────────────────────────────────────────────

function highlight(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    // Color keywords
    const colored = line
      .replace(/(export|interface|type|const|import|from)/g, '<kw>$1</kw>')
      .replace(/(\bstring\b|\bnumber\b|\bboolean\b|\bnull\b|\bundefined\b|\bunknown\b)/g, '<ty>$1</ty>')
      .replace(/(z\.[a-z]+\(\)(?:\.[a-z]+\(\))*)/g, '<fn>$1</fn>');

    return (
      <div key={i} className="flex">
        <span className="w-8 shrink-0 select-none text-right pr-3 text-[11px] text-zinc-600">{i + 1}</span>
        <span
          className="flex-1 whitespace-pre"
          dangerouslySetInnerHTML={{
            __html: colored
              .replace(/<kw>(.*?)<\/kw>/g, '<span class="text-violet-400">$1</span>')
              .replace(/<ty>(.*?)<\/ty>/g, '<span class="text-sky-400">$1</span>')
              .replace(/<fn>(.*?)<\/fn>/g, '<span class="text-emerald-400">$1</span>'),
          }}
        />
      </div>
    );
  });
}

// ── Main tool ──────────────────────────────────────────────────────────────

function JsonToTsTool() {
  const [json, setJson] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [mode, setMode] = useState<'interface' | 'type' | 'zod'>('interface');
  const [optionals, setOptionals] = useState(true);
  const [semicolons, setSemicolons] = useState(true);
  const [exportAll, setExportAll] = useState(false);
  const [error, setError] = useState('');

  const opts: GenOptions = { mode, rootName, optionals, semicolons, exportAll };

  const output = useMemo(() => {
    if (!json.trim()) return '';
    try {
      setError('');
      return new TsGenerator().generate(json, opts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      return '';
    }
  }, [json, mode, rootName, optionals, semicolons, exportAll]);

  const loadSample = (s: typeof SAMPLES[0]) => {
    setJson(s.json);
    setRootName(s.name);
    setError('');
  };

  const lineCount = output.split('\n').length;

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Top bar: samples + options ─────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Samples:</span>
        {SAMPLES.map(s => (
          <button
            key={s.label}
            onClick={() => loadSample(s)}
            className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      {/* ── Editor + Output ─────────────────────────────────── */}
      <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-zinc-100">

        {/* Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-1 text-[11px] text-zinc-400 font-medium">data.json</span>
            </div>
            <div className="flex items-center gap-2">
              {json && !error && <span className="text-[10px] text-zinc-500">{json.split('\n').length} lines</span>}
              {error && <span className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="h-3.5 w-3.5" /> Invalid JSON</span>}
              {json && <button onClick={() => { setJson(''); setError(''); }} className="text-[11px] text-zinc-500 hover:text-zinc-300 transition">Clear</button>}
            </div>
          </div>
          <textarea
            value={json}
            onChange={e => setJson(e.target.value)}
            placeholder={'{\n  "id": 1,\n  "name": "Paste JSON here…"\n}'}
            spellCheck={false}
            className={`h-72 lg:h-[420px] w-full resize-none bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-200 outline-none placeholder-zinc-600 transition ${error ? 'bg-red-950/20' : ''}`}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-1 text-[11px] text-zinc-400 font-medium">types.ts</span>
            </div>
            <div className="flex items-center gap-2">
              {output && <span className="text-[10px] text-zinc-500">{lineCount} lines</span>}
              {output && (
                <CopyBtn
                  text={output}
                  label="Copy"
                  className="rounded-md bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1"
                />
              )}
            </div>
          </div>
          <div className="h-72 lg:h-[420px] overflow-auto bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-300">
            {output ? (
              <div className="space-y-0">{highlight(output)}</div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <Sparkles className="h-8 w-8 text-zinc-700" />
                <p className="text-[13px] text-zinc-600">TypeScript types will appear here</p>
                <p className="text-[11px] text-zinc-700">Paste JSON on the left or load a sample</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Options bar ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 bg-white px-4 py-4 sm:px-6">

        {/* Mode */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Output</span>
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
            {(['interface', 'type', 'zod'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 text-[11.5px] font-semibold capitalize transition ${mode === m ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
              >
                {m === 'zod' ? 'Zod' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Root name */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Root name</span>
          <input
            type="text"
            value={rootName}
            onChange={e => setRootName(e.target.value)}
            className="w-28 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[12.5px] text-zinc-800 outline-none focus:border-zinc-400"
          />
        </div>

        <div className="h-4 w-px bg-zinc-200 hidden sm:block" />

        {/* Toggles */}
        {[
          { label: 'Optional nulls', value: optionals, set: setOptionals },
          { label: 'Semicolons', value: semicolons, set: setSemicolons },
          { label: 'Export all', value: exportAll, set: setExportAll },
        ].map(({ label, value, set }) => (
          <label key={label} className="flex cursor-pointer items-center gap-1.5 text-[12px] text-zinc-600 select-none">
            <input type="checkbox" checked={value} onChange={e => set(e.target.checked)} className="h-3.5 w-3.5 accent-zinc-900 rounded" />
            {label}
          </label>
        ))}
      </div>

    </div>
  );
}

export default function JsonToTypescriptClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="JSON to TypeScript Types Generator"
      subtitle="Paste any JSON and instantly get TypeScript interfaces, type aliases, or Zod schemas. Handles nested objects, arrays, null values, and optional fields — 100% in-browser."
      toolName="json_to_typescript"
      icon="🔷"
      features={['Interface · Type · Zod', 'Nested objects', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<JsonToTsTool />}
    />
  );
}
