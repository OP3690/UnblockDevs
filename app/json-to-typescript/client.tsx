'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, AlertCircle, Sparkles, RefreshCw, ChevronDown, Download } from 'lucide-react';
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

// ── TS → JSON scaffold ────────────────────────────────────────────────────

type InterfaceMap = Map<string, Array<{ name: string; type: string; optional: boolean }>>;

function parseFieldsFromBody(body: string): Array<{ name: string; type: string; optional: boolean }> {
  const fields: Array<{ name: string; type: string; optional: boolean }> = [];
  for (const line of body.split('\n')) {
    const trimmed = line.trim().replace(/[;,]$/, '');
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    const m = trimmed.match(/^(\w+)(\?)?:\s*(.+)$/);
    if (m) fields.push({ name: m[1], type: m[3].trim(), optional: m[2] === '?' });
  }
  return fields;
}

function tsTypeToValue(tsType: string, iMap: InterfaceMap, depth: number): unknown {
  if (depth > 5) return null;
  const t = tsType.replace(/\s+/g, ' ').trim();
  if (t.includes(' | ')) {
    const parts = t.split(' | ').map(p => p.trim());
    if (parts.includes('null')) return null;
    if (parts.includes('undefined')) return undefined;
    const nonNull = parts.find(p => p !== 'null' && p !== 'undefined');
    return nonNull ? tsTypeToValue(nonNull, iMap, depth) : null;
  }
  if (t.endsWith('[]') || t.startsWith('Array<')) return [];
  if (t === 'string') return '';
  if (t === 'number' || t === 'integer') return 0;
  if (t === 'boolean') return false;
  if (t === 'null') return null;
  if (t === 'any' || t === 'unknown' || t === 'never') return null;
  if (t === 'Date') return '2024-01-01T00:00:00.000Z';
  if (t === 'object') return {};
  if (iMap.has(t)) {
    const obj: Record<string, unknown> = {};
    for (const f of iMap.get(t)!) {
      const val = tsTypeToValue(f.type, iMap, depth + 1);
      if (val !== undefined) obj[f.name] = val;
    }
    return obj;
  }
  return null;
}

function tsToJsonScaffold(input: string): { json: string; error: string } {
  const iMap: InterfaceMap = new Map();
  const iRe = /(?:export\s+)?interface\s+(\w+)[^{]*\{([^}]*)\}/g;
  const tRe = /(?:export\s+)?type\s+(\w+)\s*=\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = iRe.exec(input)) !== null) iMap.set(m[1], parseFieldsFromBody(m[2]));
  while ((m = tRe.exec(input)) !== null) iMap.set(m[1], parseFieldsFromBody(m[2]));
  if (iMap.size === 0) return { json: '', error: 'No interface or type alias found. Paste a TypeScript interface or type.' };
  const [, rootFields] = [...iMap.entries()][0];
  const obj: Record<string, unknown> = {};
  for (const f of rootFields) {
    const val = tsTypeToValue(f.type, iMap, 0);
    if (val !== undefined) obj[f.name] = val;
  }
  return { json: JSON.stringify(obj, null, 2), error: '' };
}

// ── JSON Schema → TypeScript ───────────────────────────────────────────────

function jsonSchemaToTs(input: string, rootName: string, opts: GenOptions): string {
  const schema = JSON.parse(input) as Record<string, unknown>;
  const defs: string[] = [];
  const seen = new Set<string>();
  const nameCount = new Map<string, number>();

  function uniq(base: string): string {
    const c = nameCount.get(base) ?? 0;
    nameCount.set(base, c + 1);
    return c === 0 ? base : `${base}${c}`;
  }

  function processNode(node: unknown, name: string): string {
    if (node === null || typeof node !== 'object') return 'unknown';
    const s = node as Record<string, unknown>;
    const sc = opts.semicolons ? ';' : ',';

    if (typeof s.$ref === 'string') {
      const parts = (s.$ref as string).split('/');
      return toPascalCase(parts[parts.length - 1]);
    }

    const variants = (s.anyOf || s.oneOf) as unknown[] | undefined;
    if (variants) return variants.map((v, i) => processNode(v, `${name}${i}`)).join(' | ');

    const type = s.type;
    if (type === 'string') return 'string';
    if (type === 'number' || type === 'integer') return 'number';
    if (type === 'boolean') return 'boolean';
    if (type === 'null') return 'null';
    if (type === 'array') {
      const items = s.items;
      if (!items) return 'unknown[]';
      return `${processNode(items, `${name}Item`)}[]`;
    }
    if (Array.isArray(type)) {
      return (type as string[]).map(t => {
        if (t === 'string') return 'string';
        if (t === 'number' || t === 'integer') return 'number';
        if (t === 'boolean') return 'boolean';
        if (t === 'null') return 'null';
        return 'unknown';
      }).join(' | ');
    }
    if (type === 'object' || s.properties) {
      const iname = uniq(toPascalCase(name || 'Root'));
      if (seen.has(iname)) return iname;
      seen.add(iname);
      const props = (s.properties as Record<string, unknown>) || {};
      const required = (s.required as string[]) || [];
      const ex = opts.exportAll ? 'export ' : '';
      const fields = Object.entries(props).map(([key, val]) => {
        const isOpt = !required.includes(key);
        const ft = processNode(val, toPascalCase(key));
        return `  ${key}${isOpt ? '?' : ''}: ${ft}${sc}`;
      });
      const def = opts.mode === 'interface'
        ? `${ex}interface ${iname} {\n${fields.join('\n')}\n}`
        : `${ex}type ${iname} = {\n${fields.join('\n')}\n}`;
      defs.push(def);
      return iname;
    }
    return 'unknown';
  }

  processNode(schema, rootName);
  const defs2 = schema.$defs || schema.definitions;
  if (defs2 && typeof defs2 === 'object') {
    for (const [key, val] of Object.entries(defs2 as Record<string, unknown>)) processNode(val, key);
  }
  if (defs.length === 0) return `// No object types found in this schema`;
  return defs.join('\n\n');
}

// ── TsToJson Tab ───────────────────────────────────────────────────────────

const TS_SAMPLE = `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  role: 'admin' | 'user' | null;
  address: Address;
  tags: string[];
}

interface Address {
  street: string;
  city: string;
  country: string;
}`;

function TsToJsonTab() {
  const [tsInput, setTsInput] = useState('');
  const [error, setError] = useState('');

  const result = useMemo(() => {
    if (!tsInput.trim()) return '';
    const { json, error: err } = tsToJsonScaffold(tsInput);
    setError(err);
    return json;
  }, [tsInput]);

  return (
    <div className="divide-y divide-zinc-100">
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Sample:</span>
        <button onClick={() => { setTsInput(TS_SAMPLE); setError(''); }}
          className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 active:scale-95">
          👤 User + Address
        </button>
        <span className="ml-auto text-[11px] text-zinc-400">Best-effort scaffold — not a full TS parser</span>
      </div>
      <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-zinc-100">
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
            {error && <span className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="h-3.5 w-3.5" />{error}</span>}
          </div>
          <textarea value={tsInput} onChange={e => { setTsInput(e.target.value); setError(''); }}
            placeholder={'interface User {\n  id: number;\n  name: string;\n  // Paste TypeScript interface here…\n}'}
            spellCheck={false}
            className="h-72 lg:h-[420px] w-full resize-none bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-200 outline-none placeholder-zinc-600" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-1 text-[11px] text-zinc-400 font-medium">scaffold.json</span>
            </div>
            {result && <CopyBtn text={result} label="Copy" className="rounded-md bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1" />}
          </div>
          <div className="h-72 lg:h-[420px] overflow-auto bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-300">
            {result ? (
              <div className="whitespace-pre text-emerald-300">{result}</div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <Sparkles className="h-8 w-8 text-zinc-700" />
                <p className="text-[13px] text-zinc-600">JSON scaffold will appear here</p>
                <p className="text-[11px] text-zinc-700">Paste a TypeScript interface on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── JsonSchema Tab ─────────────────────────────────────────────────────────

const SCHEMA_SAMPLE = JSON.stringify({
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "User",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "age": { "type": "number" },
    "isActive": { "type": "boolean" },
    "role": { "anyOf": [{ "type": "string" }, { "type": "null" }] },
    "tags": { "type": "array", "items": { "type": "string" } },
    "address": {
      "type": "object",
      "required": ["city"],
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string" }
      }
    }
  }
}, null, 2);

function JsonSchemaTab() {
  const [schemaInput, setSchemaInput] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [mode, setMode] = useState<'interface' | 'type'>('interface');
  const [exportAll, setExportAll] = useState(false);
  const [semicolons, setSemicolons] = useState(true);
  const [error, setError] = useState('');

  const opts: GenOptions = { mode, rootName, optionals: true, semicolons, exportAll };

  const output = useMemo(() => {
    if (!schemaInput.trim()) return '';
    try {
      setError('');
      return jsonSchemaToTs(schemaInput, rootName, opts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON Schema');
      return '';
    }
  }, [schemaInput, rootName, mode, exportAll, semicolons]);

  return (
    <div className="divide-y divide-zinc-100">
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Sample:</span>
        <button onClick={() => { setSchemaInput(SCHEMA_SAMPLE); setRootName('User'); setError(''); }}
          className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 active:scale-95">
          📋 User schema (Draft 7)
        </button>
      </div>
      <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-zinc-100">
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-1 text-[11px] text-zinc-400 font-medium">schema.json</span>
            </div>
            {error && <span className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle className="h-3.5 w-3.5" />{error}</span>}
          </div>
          <textarea value={schemaInput} onChange={e => { setSchemaInput(e.target.value); setError(''); }}
            placeholder={'{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "type": "object",\n  "properties": { … }\n}'}
            spellCheck={false}
            className="h-72 lg:h-[420px] w-full resize-none bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-200 outline-none placeholder-zinc-600" />
        </div>
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
            {output && <CopyBtn text={output} label="Copy" className="rounded-md bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1" />}
          </div>
          <div className="h-72 lg:h-[420px] overflow-auto bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-300">
            {output ? (
              <div className="space-y-0">{highlight(output)}</div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <Sparkles className="h-8 w-8 text-zinc-700" />
                <p className="text-[13px] text-zinc-600">TypeScript types will appear here</p>
                <p className="text-[11px] text-zinc-700">Paste a JSON Schema on the left or load a sample</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Output</span>
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
            {(['interface', 'type'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 text-[11.5px] font-semibold capitalize transition ${mode === m ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Root name</span>
          <input type="text" value={rootName} onChange={e => setRootName(e.target.value)}
            className="w-28 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[12.5px] text-zinc-800 outline-none focus:border-zinc-400" />
        </div>
        <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
        {[{ label: 'Semicolons', value: semicolons, set: setSemicolons }, { label: 'Export all', value: exportAll, set: setExportAll }].map(({ label, value, set }) => (
          <label key={label} className="flex cursor-pointer items-center gap-1.5 text-[12px] text-zinc-600 select-none">
            <input type="checkbox" checked={value} onChange={e => set(e.target.checked)} className="h-3.5 w-3.5 accent-zinc-900 rounded" />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
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
  const [mainTab, setMainTab] = useState<'json-ts' | 'ts-json' | 'json-schema'>('json-ts');

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

  const downloadTs = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/typescript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(rootName || 'types').toLowerCase()}.ts`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [output, rootName]);

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Main tabs ─────────────────────────────────────── */}
      <div className="flex items-center bg-white px-4 sm:px-6">
        {([['json-ts', 'JSON → TS'], ['ts-json', 'TS → JSON'], ['json-schema', 'JSON Schema']] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setMainTab(tab)}
            className={`px-4 py-2.5 text-[12.5px] font-semibold border-b-2 transition ${mainTab === tab ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {mainTab === 'ts-json' && <TsToJsonTab />}
      {mainTab === 'json-schema' && <JsonSchemaTab />}
      {mainTab === 'json-ts' && <>

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
                <>
                  <CopyBtn
                    text={output}
                    label="Copy"
                    className="rounded-md bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1"
                  />
                  <button onClick={downloadTs} title="Download as .ts file"
                    className="inline-flex items-center gap-1.5 rounded-md bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 transition-all active:scale-95">
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .ts</span>
                  </button>
                </>
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

      </>}
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
