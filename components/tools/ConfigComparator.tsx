'use client';

import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Settings, Eye, EyeOff, Copy, Download, FileCode, Filter, Plus, Minus, RefreshCw, ArrowRightLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';
import { trackCtaClick, trackCopy } from '@/lib/analytics';

interface DiffItem {
  key: string;
  status: 'added' | 'removed' | 'changed' | 'unchanged';
  val1?: any;
  val2?: any;
  isSecret?: boolean;
}

type StatusFilter = 'all' | 'changed' | 'added' | 'removed' | 'unchanged';
type InputFormat = 'json' | 'env' | 'yaml';
type EnvLabel = 'development' | 'staging' | 'production' | 'local' | 'custom';

// Minimal inline YAML→JSON converter (same approach as SmartJsonDiff)
function parseYamlConfig(text: string): Record<string, unknown> {
  function parseVal(s: string): unknown {
    const t = s.trim();
    if (t === '' || t === 'null' || t === '~') return null;
    if (t === 'true') return true;
    if (t === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
    if ((t[0] === '"' && t[t.length - 1] === '"') || (t[0] === "'" && t[t.length - 1] === "'")) return t.slice(1, -1);
    return t;
  }
  function indOf(l: string) { let n = 0; while (n < l.length && l[n] === ' ') n++; return n; }
  const lines = text.split('\n');
  function parseBlock(idx: number, baseInd: number): [unknown, number] {
    let i = idx;
    while (i < lines.length && (!lines[i].trim() || lines[i].trim().startsWith('#'))) i++;
    if (i >= lines.length) return [{}, i];
    const fTr = lines[i].trim();
    if (fTr.startsWith('- ') || fTr === '-') {
      const arr: unknown[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim() || l.trim().startsWith('#')) { i++; continue; }
        if (indOf(l) < baseInd) break;
        const tr = l.trim();
        if (!tr.startsWith('- ') && tr !== '-') break;
        const ad = tr.slice(2).trim();
        if (!ad) { const [v, n] = parseBlock(i + 1, indOf(l) + 2); arr.push(v); i = n; }
        else { arr.push(parseVal(ad)); i++; }
      }
      return [arr, i];
    } else {
      const obj: Record<string, unknown> = {};
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim() || l.trim().startsWith('#')) { i++; continue; }
        const ind = indOf(l);
        if (ind < baseInd) break;
        const tr = l.trim();
        if (tr.startsWith('- ')) break;
        const ci = tr.indexOf(':');
        if (ci < 0) { i++; continue; }
        const key = tr.slice(0, ci).trim().replace(/^["']|["']$/g, '');
        const rest = tr.slice(ci + 1).trim();
        if (!rest) {
          const ni = i + 1;
          if (ni < lines.length && lines[ni].trim() && !lines[ni].trim().startsWith('#') && indOf(lines[ni]) > ind) {
            const [v, n] = parseBlock(ni, indOf(lines[ni])); obj[key] = v; i = n;
          } else { obj[key] = null; i++; }
        } else { obj[key] = parseVal(rest); i++; }
      }
      return [obj, i];
    }
  }
  const [result] = parseBlock(0, 0);
  return result as Record<string, unknown>;
}

const ENV_LABEL_CONFIG: Record<EnvLabel, { label: string; badge: string }> = {
  development: { label: 'Development', badge: 'bg-blue-100 text-blue-800 border border-blue-200' },
  staging:     { label: 'Staging',     badge: 'bg-amber-100 text-amber-800 border border-amber-200' },
  production:  { label: 'Production',  badge: 'bg-green-100 text-green-800 border border-green-200' },
  local:       { label: 'Local',       badge: 'bg-purple-100 text-purple-800 border border-purple-200' },
  custom:      { label: 'Custom',      badge: 'bg-gray-100 text-gray-700 border border-gray-200' },
};

const SECRET_KEYS_DEFAULT = ['password', 'secret', 'token', 'api_key', 'apikey', 'auth', 'credential', 'private'];

// Regex patterns for secret detection — used in addition to substring matching
const SECRET_REGEX_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /pass(word)?/i,     label: 'password pattern' },
  { pattern: /secret/i,          label: 'secret pattern' },
  { pattern: /token/i,           label: 'token pattern' },
  { pattern: /api[_-]?key/i,     label: 'api key pattern' },
  { pattern: /auth/i,            label: 'auth pattern' },
  { pattern: /private/i,         label: 'private pattern' },
  { pattern: /credential/i,      label: 'credential pattern' },
  { pattern: /cert(ificate)?/i,  label: 'certificate pattern' },
];

function parseEnv(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 1) continue;
    const k = trimmed.slice(0, eqIdx).trim();
    let v = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding quotes
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    result[k] = v;
  }
  return result;
}

function flattenObject(obj: any, prefix = '', result: Map<string, any> = new Map()): Map<string, any> {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result);
    } else {
      result.set(newKey, obj[key]);
    }
  }
  return result;
}

function displayValue(val: any, masked: boolean, isSecret: boolean): string {
  if (masked && isSecret) return '●●●●●●●●';
  if (val === null) return 'null';
  if (val === undefined) return '—';
  if (typeof val === 'string') return `"${val}"`;
  return JSON.stringify(val);
}

const SAMPLE_JSON = {
  staging: JSON.stringify({ database_url: 'postgres://localhost/staging_db', redis_url: 'redis://localhost:6379', api_key: 'sk-staging-xyz123', debug: true, log_level: 'debug', max_connections: 5, feature_flags: { new_dashboard: true, beta_api: false } }, null, 2),
  production: JSON.stringify({ database_url: 'postgres://prod.db.internal/app_db', redis_url: 'redis://prod-cache:6379', api_key: 'sk-prod-abc789', debug: false, log_level: 'warn', max_connections: 50, rate_limit: 1000, feature_flags: { new_dashboard: true, beta_api: true } }, null, 2),
};

const SAMPLE_ENV = {
  staging: 'DATABASE_URL=postgres://localhost/staging_db\nREDIS_URL=redis://localhost:6379\nAPI_KEY=sk-staging-xyz123\nDEBUG=true\nLOG_LEVEL=debug\nMAX_CONNECTIONS=5',
  production: 'DATABASE_URL=postgres://prod.db.internal/app_db\nREDIS_URL=redis://prod-cache:6379\nAPI_KEY=sk-prod-abc789\nDEBUG=false\nLOG_LEVEL=warn\nMAX_CONNECTIONS=50\nRATE_LIMIT=1000',
};

export default function ConfigComparator() {
  const [config1, setConfig1] = useState('');
  const [config2, setConfig2] = useState('');
  const [label1, setLabel1] = useState('Config 1');
  const [label2, setLabel2] = useState('Config 2');
  const [diffResults, setDiffResults] = useState<DiffItem[]>([]);
  const [maskSecrets, setMaskSecrets] = useState(true);
  const [secretKeys, setSecretKeys] = useState(SECRET_KEYS_DEFAULT.join(', '));
  const [format, setFormat] = useState<InputFormat>('json');
  const [envLabel1, setEnvLabel1] = useState<EnvLabel>('development');
  const [envLabel2, setEnvLabel2] = useState<EnvLabel>('staging');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortAlpha, setSortAlpha] = useState(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const parsedSecretKeys = useMemo(() => secretKeys.split(',').map((s) => s.trim()).filter(Boolean), [secretKeys]);

  const isSecretKey = useCallback((key: string) => {
    // Check substring list
    if (parsedSecretKeys.some((s) => key.toLowerCase().includes(s.toLowerCase()))) return true;
    // Check regex patterns
    return SECRET_REGEX_PATTERNS.some(({ pattern }) => pattern.test(key));
  }, [parsedSecretKeys]);

  const secretMatchLabel = useCallback((key: string): string => {
    const sub = parsedSecretKeys.find((s) => key.toLowerCase().includes(s.toLowerCase()));
    if (sub) return `Matched substring: "${sub}"`;
    const reg = SECRET_REGEX_PATTERNS.find(({ pattern }) => pattern.test(key));
    return reg ? `Pattern matched: ${reg.label}` : 'Secret';
  }, [parsedSecretKeys]);

  const parseInput = useCallback((text: string, fmt: InputFormat) => {
    if (fmt === 'env') return parseEnv(text);
    if (fmt === 'yaml') return parseYamlConfig(text);
    const v = validateJson(text);
    if (!v.valid) throw new Error('Invalid JSON');
    return v.data;
  }, []);

  // ⌘+Enter / Ctrl+Enter to compare
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        compareConfigs();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareConfigs = useCallback(() => {
    trackCtaClick('config_comparator', 'compare');
    try {
      const obj1 = parseInput(config1, format);
      const obj2 = parseInput(config2, format);
      const flat1 = format === 'env' ? new Map(Object.entries(obj1)) : flattenObject(obj1);
      const flat2 = format === 'env' ? new Map(Object.entries(obj2)) : flattenObject(obj2);
      const allKeys = new Set([...flat1.keys(), ...flat2.keys()]);

      const results: DiffItem[] = [];
      for (const key of allKeys) {
        const v1 = flat1.get(key);
        const v2 = flat2.get(key);
        const secret = isSecretKey(key);
        if (v1 === undefined) results.push({ key, status: 'added', val2: v2, isSecret: secret });
        else if (v2 === undefined) results.push({ key, status: 'removed', val1: v1, isSecret: secret });
        else if (JSON.stringify(v1) !== JSON.stringify(v2)) results.push({ key, status: 'changed', val1: v1, val2: v2, isSecret: secret });
        else results.push({ key, status: 'unchanged', val1: v1, val2: v2, isSecret: secret });
      }

      setDiffResults(results);
      toast.success(`${results.length} keys compared`);
      setTimeout(() => resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (e: any) {
      const fmtLabel = format === 'yaml' ? 'YAML' : format === 'env' ? '.env' : 'JSON';
      toast.error(e.message || `Both configs must be valid ${fmtLabel}`);
    }
  }, [config1, config2, format, isSecretKey, parseInput]);

  const filtered = useMemo(() => {
    let list = statusFilter === 'all' ? diffResults : diffResults.filter((d) => d.status === statusFilter);
    if (sortAlpha) list = [...list].sort((a, b) => a.key.localeCompare(b.key));
    return list;
  }, [diffResults, statusFilter, sortAlpha]);

  const counts = useMemo(() => ({
    all: diffResults.length,
    added: diffResults.filter((d) => d.status === 'added').length,
    removed: diffResults.filter((d) => d.status === 'removed').length,
    changed: diffResults.filter((d) => d.status === 'changed').length,
    unchanged: diffResults.filter((d) => d.status === 'unchanged').length,
  }), [diffResults]);

  const exportDiff = (type: 'json' | 'markdown') => {
    trackCopy('config_comparator');
    if (type === 'json') {
      const payload = {
        generatedAt: new Date().toISOString(),
        labels: { config1: label1, config2: label2 },
        summary: counts,
        changes: diffResults.filter((d) => d.status !== 'unchanged').map((d) => ({
          key: d.key,
          status: d.status,
          before: d.status !== 'added' ? displayValue(d.val1, maskSecrets, d.isSecret || false) : undefined,
          after: d.status !== 'removed' ? displayValue(d.val2, maskSecrets, d.isSecret || false) : undefined,
        })),
      };
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast.success('JSON diff copied');
    } else {
      const lines = [
        `# Config Diff: ${label1} (${ENV_LABEL_CONFIG[envLabel1].label}) vs ${label2} (${ENV_LABEL_CONFIG[envLabel2].label})`,
        `Generated: ${new Date().toISOString()}`,
        '',
        `## Summary`,
        `- Added: ${counts.added}`,
        `- Removed: ${counts.removed}`,
        `- Changed: ${counts.changed}`,
        `- Unchanged: ${counts.unchanged}`,
        '',
        `## Changes`,
        ...diffResults.filter((d) => d.status !== 'unchanged').map((d) => {
          if (d.status === 'added') return `+ \`${d.key}\`: ${displayValue(d.val2, maskSecrets, d.isSecret || false)}`;
          if (d.status === 'removed') return `- \`${d.key}\`: ${displayValue(d.val1, maskSecrets, d.isSecret || false)}`;
          return `~ \`${d.key}\`: ${displayValue(d.val1, maskSecrets, d.isSecret || false)} → ${displayValue(d.val2, maskSecrets, d.isSecret || false)}`;
        }),
      ];
      navigator.clipboard.writeText(lines.join('\n'));
      toast.success('Markdown diff copied');
    }
  };

  const downloadDiff = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      labels: { config1: label1, config2: label2 },
      summary: counts,
      diff: diffResults.map((d) => ({ key: d.key, status: d.status, val1: d.status !== 'added' ? displayValue(d.val1, maskSecrets, d.isSecret || false) : undefined, val2: d.status !== 'removed' ? displayValue(d.val2, maskSecrets, d.isSecret || false) : undefined })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'config-diff.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded config-diff.json');
  };

  const STATUS_STYLES = {
    added: { border: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-800', icon: <Plus className="w-3 h-3" /> },
    removed: { border: 'border-red-200 bg-red-50', badge: 'bg-red-100 text-red-800', icon: <Minus className="w-3 h-3" /> },
    changed: { border: 'border-amber-200 bg-amber-50', badge: 'bg-amber-100 text-amber-800', icon: <RefreshCw className="w-3 h-3" /> },
    unchanged: { border: 'border-gray-100 bg-gray-50', badge: 'bg-gray-100 text-gray-600', icon: null },
  };

  const FILTER_TABS: { key: StatusFilter; label: string; countKey: keyof typeof counts }[] = [
    { key: 'all', label: 'All', countKey: 'all' },
    { key: 'changed', label: 'Changed', countKey: 'changed' },
    { key: 'added', label: 'Added', countKey: 'added' },
    { key: 'removed', label: 'Removed', countKey: 'removed' },
    { key: 'unchanged', label: 'Same', countKey: 'unchanged' },
  ];

  return (
    <div className="space-y-5 tool-panel-contain">
      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-600" />
            Config Comparator
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {/* Format toggle */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-medium">
              {(['json', 'env', 'yaml'] as InputFormat[]).map((f) => (
                <button key={f} type="button" onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 transition-colors ${format === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                  {f === 'json' ? 'JSON' : f === 'env' ? '.env' : 'YAML'}
                </button>
              ))}
            </div>
            {/* Mask toggle */}
            <button
              type="button"
              onClick={() => { trackCtaClick('config_comparator', 'toggle_mask'); setMaskSecrets((m) => !m); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${maskSecrets ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
            >
              {maskSecrets ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {maskSecrets ? 'Secrets masked' : 'Secrets visible'}
            </button>
            {/* Sample */}
            <button type="button" onClick={() => { const s = format === 'json' ? SAMPLE_JSON : SAMPLE_ENV; setConfig1(s.staging); setConfig2(s.production); setLabel1('Staging'); setLabel2('Production'); }}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
              Load Sample
            </button>
          </div>
        </div>

        {/* Labels row */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex flex-col gap-1.5">
            <input type="text" value={label1} onChange={(e) => setLabel1(e.target.value)} placeholder="Config 1 label" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium text-gray-700" />
            <div className="flex items-center gap-2">
              <select value={envLabel1} onChange={(e) => setEnvLabel1(e.target.value as EnvLabel)} className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-700 bg-white">
                {(Object.keys(ENV_LABEL_CONFIG) as EnvLabel[]).map((k) => <option key={k} value={k}>{ENV_LABEL_CONFIG[k].label}</option>)}
              </select>
              <span className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-semibold ${ENV_LABEL_CONFIG[envLabel1].badge}`}>{ENV_LABEL_CONFIG[envLabel1].label}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <input type="text" value={label2} onChange={(e) => setLabel2(e.target.value)} placeholder="Config 2 label" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium text-gray-700" />
            <div className="flex items-center gap-2">
              <select value={envLabel2} onChange={(e) => setEnvLabel2(e.target.value as EnvLabel)} className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-700 bg-white">
                {(Object.keys(ENV_LABEL_CONFIG) as EnvLabel[]).map((k) => <option key={k} value={k}>{ENV_LABEL_CONFIG[k].label}</option>)}
              </select>
              <span className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-semibold ${ENV_LABEL_CONFIG[envLabel2].badge}`}>{ENV_LABEL_CONFIG[envLabel2].label}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-xs font-semibold text-gray-600">{label1}</label>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${ENV_LABEL_CONFIG[envLabel1].badge}`}>{ENV_LABEL_CONFIG[envLabel1].label}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">{format === 'env' ? '.env' : format === 'yaml' ? 'YAML' : 'JSON'}</span>
            </div>
            <textarea
              value={config1}
              onChange={(e) => setConfig1(e.target.value)}
              placeholder={format === 'json' ? '{"api_url": "https://staging.api.com", "debug": true}' : format === 'yaml' ? 'api_url: https://staging.api.com\ndebug: true' : 'API_URL=https://staging.api.com\nDEBUG=true'}
              className="w-full h-56 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <label className="text-xs font-semibold text-gray-600">{label2}</label>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${ENV_LABEL_CONFIG[envLabel2].badge}`}>{ENV_LABEL_CONFIG[envLabel2].label}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">{format === 'env' ? '.env' : format === 'yaml' ? 'YAML' : 'JSON'}</span>
            </div>
            <textarea
              value={config2}
              onChange={(e) => setConfig2(e.target.value)}
              placeholder={format === 'json' ? '{"api_url": "https://api.com", "debug": false}' : format === 'yaml' ? 'api_url: https://api.com\ndebug: false\nrate_limit: 1000' : 'API_URL=https://api.com\nDEBUG=false\nRATE_LIMIT=1000'}
              className="w-full h-56 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50/50"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Secret keys config */}
        <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Secret key patterns (comma-separated)</label>
          <input type="text" value={secretKeys} onChange={(e) => setSecretKeys(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-mono" />
        </div>

        <button
          type="button"
          onClick={compareConfigs}
          disabled={!config1.trim() || !config2.trim()}
          className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" /> Compare Configs
          <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
        </button>
      </div>

      {diffResults.length > 0 && (
        <div ref={resultsSectionRef} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 scroll-mt-4">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex gap-2 text-xs font-medium">
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">+{counts.added} added</span>
              <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">−{counts.removed} removed</span>
              <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800">~{counts.changed} changed</span>
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">={counts.unchanged} same</span>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <button type="button" onClick={() => exportDiff('json')} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
              <button type="button" onClick={() => exportDiff('markdown')} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                <FileCode className="w-3.5 h-3.5" /> Copy MD
              </button>
              <button type="button" onClick={downloadDiff} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1 mb-4 border-b border-gray-100 pb-3">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === tab.key ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Filter className="w-3 h-3" />
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusFilter === tab.key ? 'bg-white/20 text-white' : 'bg-white text-gray-600'}`}>
                  {counts[tab.countKey]}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSortAlpha((a) => !a)}
              className={`ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortAlpha ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              A→Z
            </button>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((item, idx) => {
              const style = STATUS_STYLES[item.status];
              return (
                <div key={idx} className={`rounded-lg border px-4 py-3 ${style.border}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="font-mono text-sm font-semibold text-gray-800 truncate">{item.key}</code>
                        {item.isSecret && <span title={secretMatchLabel(item.key)} className="shrink-0 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold cursor-help">SECRET ⓘ</span>}
                      </div>
                      <div className="text-sm space-y-0.5">
                        {item.status === 'added' && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-emerald-600">Added in {label2}:</span>
                            <code className="bg-white px-2 py-0.5 rounded text-sm font-mono text-gray-800 border border-emerald-100">{displayValue(item.val2, maskSecrets, item.isSecret || false)}</code>
                            <button type="button" onClick={() => { navigator.clipboard.writeText(String(item.val2 ?? '')); toast.success('Copied'); }} className="text-gray-400 hover:text-gray-700">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        {item.status === 'removed' && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-red-600">Only in {label1}:</span>
                            <code className="bg-white px-2 py-0.5 rounded text-sm font-mono text-gray-800 border border-red-100">{displayValue(item.val1, maskSecrets, item.isSecret || false)}</code>
                          </div>
                        )}
                        {item.status === 'changed' && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs w-16 text-red-600 font-semibold">{label1}:</span>
                              <code className="bg-white px-2 py-0.5 rounded text-sm font-mono text-gray-800 border border-red-100 line-through opacity-70">{displayValue(item.val1, maskSecrets, item.isSecret || false)}</code>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs w-16 text-emerald-600 font-semibold">{label2}:</span>
                              <code className="bg-white px-2 py-0.5 rounded text-sm font-mono text-gray-800 border border-emerald-100">{displayValue(item.val2, maskSecrets, item.isSecret || false)}</code>
                              <button type="button" onClick={() => { navigator.clipboard.writeText(String(item.val2 ?? '')); toast.success('Copied'); }} className="text-gray-400 hover:text-gray-700">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                        {item.status === 'unchanged' && (
                          <code className="text-xs text-gray-500 font-mono">{displayValue(item.val1, maskSecrets, item.isSecret || false)}</code>
                        )}
                      </div>
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${style.badge}`}>
                      {style.icon}
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-10">No items match the selected filter.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
