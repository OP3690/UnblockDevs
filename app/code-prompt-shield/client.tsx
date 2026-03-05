'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Lock,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Code2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  MessageSquare,
  FileJson,
} from 'lucide-react';
import toast from 'react-hot-toast';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'go', name: 'Go' },
  { id: 'sql', name: 'SQL' },
  { id: 'json', name: 'JSON' },
  { id: 'csharp', name: 'C#' },
  { id: 'php', name: 'PHP' },
  { id: 'rust', name: 'Rust' },
] as const;

type LangId = (typeof LANGUAGES)[number]['id'];

const JS_TS_KEYWORDS = new Set([
  'function', 'const', 'let', 'var', 'if', 'else', 'return', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof', 'in', 'of', 'async', 'await', 'class', 'extends',
  'import', 'export', 'default', 'from', 'true', 'false', 'null', 'undefined', 'this', 'super', 'static', 'get', 'set',
  'delete', 'void', 'yield', 'interface', 'type', 'enum', 'implements', 'private', 'protected', 'public', 'abstract',
  'constructor', 'async', 'await', 'as', 'is', 'keyof', 'readonly', 'namespace', 'declare', 'module', 'require',
]);

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally',
  'with', 'lambda', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'pass', 'break', 'continue', 'yield',
  'raise', 'assert', 'global', 'nonlocal', 'async', 'await', 'match', 'case',
]);

const SQL_KEYWORDS = new Set([
  'select', 'from', 'where', 'join', 'inner', 'left', 'right', 'on', 'and', 'or', 'in', 'insert', 'into', 'values',
  'update', 'set', 'delete', 'create', 'table', 'index', 'order', 'group', 'by', 'having', 'limit', 'offset',
  'as', 'null', 'true', 'false', 'between', 'like', 'exists', 'union', 'all', 'distinct', 'asc', 'desc',
  'primary', 'key', 'foreign', 'references', 'constraint', 'default', 'check', 'unique', 'drop', 'alter',
]);

const COMMON_KEYWORDS = new Set(['int', 'string', 'bool', 'void', 'null', 'true', 'false', 'new', 'return', 'import']);

function getKeywords(lang: LangId): Set<string> {
  if (lang === 'python') return PYTHON_KEYWORDS;
  if (lang === 'javascript' || lang === 'typescript') return JS_TS_KEYWORDS;
  if (lang === 'sql') return SQL_KEYWORDS;
  if (lang === 'json') return new Set();
  return COMMON_KEYWORDS;
}

/** Deterministic hash: same input → same output (for consistent mapping across prompts). */
function deterministicHash(str: string, prefix: string): string {
  let h = 0;
  const s = prefix + str;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  const hex = Math.abs(h).toString(36).slice(0, 4);
  return hex.toUpperCase().replace(/\d/g, (d) => String.fromCharCode(65 + parseInt(d, 10)));
}

export interface CodeShieldMapping {
  version: string;
  language: LangId;
  createdAt: string;
  maskIdentifiers: boolean;
  maskSecrets: boolean;
  maskPII: boolean;
  map: Record<string, string>;
  reverseMap: Record<string, string>;
}

const DEFAULT_EXAMPLE = `function getUserEmail(userId) {
  const apiKey = process.env.STRIPE_SECRET;
  return fetchCustomerEmail(userId, apiKey);
}`;

/** Deterministic placeholder: same original + prefix → same masked token (consistent across sessions). */
function ensureMask(
  original: string,
  prefix: string,
  map: Record<string, string>,
  reverseMap: Record<string, string>,
  counterByPrefix: Record<string, number>
): string {
  if (reverseMap[original]) return reverseMap[original];
  const n = (counterByPrefix[prefix] ?? 0) + 1;
  counterByPrefix[prefix] = n;
  const suffix = deterministicHash(original, prefix) + (n > 1 ? String(n) : '');
  const masked = `${prefix}_${suffix}`;
  map[masked] = original;
  reverseMap[original] = masked;
  return masked;
}

function maskCode(
  source: string,
  language: LangId,
  options: { maskIdentifiers: boolean; maskSecrets: boolean; maskPII: boolean }
): { masked: string; mapping: CodeShieldMapping } {
  const keywords = getKeywords(language);
  const map: Record<string, string> = {};
  const reverseMap: Record<string, string> = {};
  const counterByPrefix: Record<string, number> = {};
  const ensure = (original: string, prefix: string) => ensureMask(original, prefix, map, reverseMap, counterByPrefix);

  let result = source;

  const stringLiteralRegex = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
  const secretPatterns = [
    /api[_-]?key|secret|password|token|bearer|auth|credential|private[_-]?key|connection[_-]?string/i,
    /postgres:\/\//i, /mysql:\/\//i, /mongodb(\+srv)?:\/\//i,
    /sk-[a-zA-Z0-9]{20,}|pk_[a-zA-Z0-9]+/i,
    /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/i,
    /AKIA[0-9A-Z]{16}/i,
    /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  ];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const piiPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;

  if (options.maskSecrets || options.maskPII) {
    result = result.replace(stringLiteralRegex, (match) => {
      const inner = match.slice(1, -1);
      const unescaped = inner.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`');
      if (options.maskPII && emailRegex.test(unescaped)) return match[0] + ensure(unescaped, 'PII') + match[match.length - 1];
      if (options.maskPII && piiPhone.test(unescaped)) return match[0] + ensure(unescaped, 'PII') + match[match.length - 1];
      if (options.maskPII && ipRegex.test(unescaped)) return match[0] + ensure(unescaped, 'PII') + match[match.length - 1];
      if (options.maskSecrets && secretPatterns.some((p) => p.test(inner) || p.test(match))) return match[0] + ensure(unescaped, 'SECRET') + match[match.length - 1];
      return match;
    });
  }

  if (language === 'sql' && options.maskIdentifiers) {
    const sqlKeywords = SQL_KEYWORDS;
    result = result.replace(/\b(FROM|JOIN|INTO|UPDATE)\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi, (_, kw, id) => {
      if (sqlKeywords.has(id.toLowerCase())) return _;
      return kw + ' ' + ensure(id, 'TABLE');
    });
    result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (word) => {
      if (reverseMap[word]) return reverseMap[word];
      if (sqlKeywords.has(word.toLowerCase())) return word;
      return ensure(word, 'COL');
    });
  } else if (language === 'json' && options.maskIdentifiers) {
    result = result.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"\s*:/g, (match, key) => {
      const unescaped = key.replace(/\\"/g, '"');
      if (/^\s*$/.test(unescaped)) return match;
      return `"${ensure(unescaped, 'KEY')}" :`;
    });
  } else if (options.maskIdentifiers) {
    const identifierRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    result = result.replace(identifierRegex, (word) => {
      if (keywords.has(word)) return word;
      if (reverseMap[word]) return reverseMap[word];
      return ensure(word, 'VAR');
    });
  }

  const mapping: CodeShieldMapping = {
    version: '2.0',
    language,
    createdAt: new Date().toISOString(),
    maskIdentifiers: options.maskIdentifiers,
    maskSecrets: options.maskSecrets,
    maskPII: options.maskPII,
    map,
    reverseMap,
  };

  return { masked: result, mapping };
}

export type RiskItem = { type: string; label: string };
export function analyzePromptRisk(source: string): { score: number; risks: RiskItem[] } {
  const risks: RiskItem[] = [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
  const jwtRegex = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/gi;
  const apiKeyRegex = /(?:api[_-]?key|secret|password|token|bearer)\s*[:=]\s*["']?[a-zA-Z0-9_\-]{20,}/gi;
  const connStrRegex = /(postgres|mysql|mongodb)(\+srv)?:\/\/[^\s'"]+/gi;
  const stripeRegex = /sk-[a-zA-Z0-9]{20,}|pk_[a-zA-Z0-9]+/gi;
  if (emailRegex.test(source)) risks.push({ type: 'pii', label: 'Email addresses detected' });
  if (phoneRegex.test(source)) risks.push({ type: 'pii', label: 'Phone numbers detected' });
  if (ipRegex.test(source)) risks.push({ type: 'pii', label: 'IP addresses detected' });
  if (jwtRegex.test(source)) risks.push({ type: 'secret', label: 'JWT tokens detected' });
  if (apiKeyRegex.test(source)) risks.push({ type: 'secret', label: 'API keys / secrets detected' });
  if (connStrRegex.test(source)) risks.push({ type: 'secret', label: 'Database connection strings detected' });
  if (stripeRegex.test(source)) risks.push({ type: 'secret', label: 'Stripe keys detected' });
  if (/\b(FROM|JOIN|INTO|UPDATE)\s+[a-zA-Z_][a-zA-Z0-9_]*/i.test(source) && /\b(SELECT|WHERE|SET)\s+[a-zA-Z_][a-zA-Z0-9_]*/i.test(source)) risks.push({ type: 'schema', label: 'Database schema (tables/columns) detected' });
  const score = Math.max(0, 100 - risks.length * 18);
  return { score, risks };
}

export function detectSensitiveFile(source: string): boolean {
  const lines = source.split(/\r?\n/).slice(0, 20);
  const envLike = lines.filter((l) => /^\s*[A-Z_][A-Z0-9_]*\s*=\s*.+/.test(l) || /^\s*["']?[a-z_]+["']?\s*:\s*["']?.+["']?\s*,?\s*$/.test(l)).length;
  return envLike >= 2 || /\b(api_key|secret|password|token)\s*[:=]/i.test(source.slice(0, 500));
}

function restoreCode(maskedCode: string, mapping: CodeShieldMapping): string {
  const sorted = Object.entries(mapping.map).sort((a, b) => b[0].length - a[0].length);
  let result = maskedCode;
  for (const [masked, original] of sorted) {
    const re = new RegExp(escapeRegex(masked), 'g');
    result = result.replace(re, original);
  }
  return result;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function CodePromptShieldClient() {
  const [sourceCode, setSourceCode] = useState(DEFAULT_EXAMPLE);
  const [language, setLanguage] = useState<LangId>('javascript');
  const [maskIdentifiers, setMaskIdentifiers] = useState(true);
  const [maskSecrets, setMaskSecrets] = useState(true);
  const [maskPII, setMaskPII] = useState(true);
  const [maskedCode, setMaskedCode] = useState('');
  const [mapping, setMapping] = useState<CodeShieldMapping | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [restoredCode, setRestoredCode] = useState('');
  const [showMapping, setShowMapping] = useState(false);
  const [diffView, setDiffView] = useState<'original' | 'masked'>('masked');
  const [addTemplate, setAddTemplate] = useState(false);
  const [riskResult, setRiskResult] = useState<{ score: number; risks: RiskItem[] } | null>(null);

  const sensitiveWarning = detectSensitiveFile(sourceCode);

  const handleMask = useCallback(() => {
    if (!sourceCode.trim()) {
      toast.error('Paste or enter code first');
      return;
    }
    const { masked, mapping: m } = maskCode(sourceCode, language, {
      maskIdentifiers,
      maskSecrets,
      maskPII,
    });
    setMaskedCode(masked);
    setMapping(m);
    setShowMapping(true);
    setRiskResult(analyzePromptRisk(sourceCode));
    toast.success(`Masked ${Object.keys(m.map).length} tokens`);
  }, [sourceCode, language, maskIdentifiers, maskSecrets, maskPII]);

  const handleRestore = useCallback(() => {
    if (!mapping || !aiResponse.trim()) {
      toast.error('Load a mapping and paste AI response first');
      return;
    }
    const restored = restoreCode(aiResponse.trim(), mapping);
    setRestoredCode(restored);
    toast.success('Code restored');
  }, [mapping, aiResponse]);

  const PROMPT_TEMPLATE = 'I am sharing masked code where identifiers are replaced with placeholders. Please provide logic improvements without renaming variables. Use the same placeholder names in your response.\n\n';

  const copyMasked = async () => {
    if (!maskedCode) return;
    try {
      await navigator.clipboard.writeText(maskedCode);
      toast.success('Masked code copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyForAI = async (tool: 'chatgpt' | 'claude' | 'copilot') => {
    if (!maskedCode) return;
    const text = addTemplate ? PROMPT_TEMPLATE + maskedCode : maskedCode;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied for ${tool === 'chatgpt' ? 'ChatGPT' : tool === 'claude' ? 'Claude' : 'Copilot'}`);
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadMapping = (ext: 'json' | 'maskmap' = 'json') => {
    if (!mapping) return;
    try {
      const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ext === 'maskmap' ? `code-shield.maskmap` : `code-shield-mapping-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(ext === 'maskmap' ? 'Downloaded .maskmap' : 'Mapping downloaded');
    } catch {
      toast.error('Download failed');
    }
  };

  const loadMappingFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const loaded = JSON.parse(reader.result as string) as CodeShieldMapping;
        setMapping(loaded);
        toast.success('Mapping loaded');
      } catch {
        toast.error('Invalid mapping file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const mapCount = mapping ? Object.keys(mapping.map).length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/20">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors mb-4 rounded-lg px-2 py-1 -ml-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Back to Tools
          </Link>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary-600" aria-hidden />
              Code Prompt Shield
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
              <Lock className="w-3 h-3" aria-hidden />
              Client-side only
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Mask variables, function names, secrets, and PII in your code before sending to AI. Send the masked code to the model, then restore the AI response with original identifiers. Deterministic and reversible.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {sensitiveWarning && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-amber-900">Sensitive config detected</p>
              <p className="text-sm text-amber-800 mt-0.5">This looks like .env or config with secrets. Mask before sending to AI.</p>
            </div>
          </div>
        )}

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-slate-500" aria-hidden />
            Source code
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label htmlFor="code-shield-language" className="block text-sm font-medium text-slate-700 mb-1">Language</label>
              <select
                id="code-shield-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LangId)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                aria-label="Source code language"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={maskIdentifiers}
                  onChange={(e) => setMaskIdentifiers(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Identifiers (vars, functions, classes)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={maskSecrets}
                  onChange={(e) => setMaskSecrets(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Secrets (API keys, tokens, connection strings)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={maskPII}
                  onChange={(e) => setMaskPII(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                PII (emails, phones)
              </label>
            </div>
          </div>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your code here…"
            className="w-full h-48 p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y"
            spellCheck={false}
            aria-label="Source code"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={handleMask}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Shield className="w-4 h-4" aria-hidden />
              Mask code
            </button>
            <button
              type="button"
              onClick={() => setSourceCode(DEFAULT_EXAMPLE)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Sample
            </button>
          </div>
        </section>

        {maskedCode && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
            {riskResult && (
              <div className={`mb-4 p-4 rounded-xl border ${riskResult.risks.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                <p className="text-sm font-semibold text-slate-800">
                  Prompt safety score: <span className={riskResult.risks.length > 0 ? 'text-amber-700' : 'text-emerald-700'}>{riskResult.score}%</span>
                </p>
                {riskResult.risks.length > 0 && (
                  <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-0.5">
                    {riskResult.risks.map((r) => (
                      <li key={r.label}>{r.label}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-lg font-semibold text-slate-800">What AI sees</h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{mapCount} tokens masked</span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => copyForAI('chatgpt')} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg" title="Copy safe prompt for ChatGPT">ChatGPT</button>
                  <button type="button" onClick={() => copyForAI('claude')} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg" title="Copy for Claude">Claude</button>
                  <button type="button" onClick={() => copyForAI('copilot')} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg" title="Copy for Copilot">Copilot</button>
                </div>
                <button type="button" onClick={copyMasked} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  <Copy className="w-4 h-4" aria-hidden /> Copy
                </button>
                <button type="button" onClick={() => downloadMapping('maskmap')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg" title="Download .maskmap (open mapping format)">
                  <FileJson className="w-4 h-4" aria-hidden /> .maskmap
                </button>
                <button type="button" onClick={() => downloadMapping('json')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  <Download className="w-4 h-4" aria-hidden /> Mapping
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer">
                  <Upload className="w-4 h-4" aria-hidden /> Load mapping
                  <input type="file" accept=".json,.maskmap" onChange={loadMappingFile} className="sr-only" />
                </label>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <input type="checkbox" checked={addTemplate} onChange={(e) => setAddTemplate(e.target.checked)} className="rounded border-slate-300 text-primary-600" />
              Add instruction: &quot;I am sharing masked code...&quot; when copying for AI
            </label>

            <div className="mb-3 flex gap-2 border-b border-slate-200">
              <button type="button" onClick={() => setDiffView('original')} className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${diffView === 'original' ? 'bg-slate-100 text-slate-900 border border-slate-200 border-b-0 -mb-px' : 'text-slate-500 hover:text-slate-700'}`}>
                Original code
              </button>
              <button type="button" onClick={() => setDiffView('masked')} className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${diffView === 'masked' ? 'bg-slate-100 text-slate-900 border border-slate-200 border-b-0 -mb-px' : 'text-slate-500 hover:text-slate-700'}`}>
                Masked (what AI sees)
              </button>
            </div>
            <textarea
              readOnly
              value={diffView === 'original' ? sourceCode : maskedCode}
              className="w-full h-40 p-4 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl resize-y"
              aria-label={diffView === 'original' ? 'Original code' : 'Masked code'}
            />
            {mapping && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowMapping(!showMapping)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  {showMapping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Mapping table
                </button>
                {showMapping && (
                  <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-48 overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-500 border-b border-slate-200">
                          <th className="py-2 pr-4">Masked</th>
                          <th className="py-2">Original</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(mapping.map).map(([masked, original]) => (
                          <tr key={masked} className="border-b border-slate-100 last:border-0">
                            <td className="py-1.5 pr-4 font-mono text-slate-600">{masked}</td>
                            <td className="py-1.5 font-mono text-slate-800">{original}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-slate-500" aria-hidden />
            Restore from AI response
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Paste the code that the AI returned (with masked tokens). Use the same mapping you used when masking. Click Restore to replace masked tokens with your original identifiers.
          </p>
          <textarea
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
            placeholder="Paste AI response code here…"
            className="w-full h-40 p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y mb-3"
            spellCheck={false}
            aria-label="AI response code"
          />
          <button
            type="button"
            onClick={handleRestore}
            disabled={!mapping || !aiResponse.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-4 h-4" aria-hidden />
            Restore code
          </button>
          {restoredCode && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Restored code</label>
              <textarea
                readOnly
                value={restoredCode}
                className="w-full h-48 p-4 font-mono text-sm text-slate-800 bg-emerald-50/50 border border-emerald-200 rounded-xl resize-y"
                aria-label="Restored code"
              />
            </div>
          )}
        </section>

        <p className="text-center text-sm text-slate-500 flex items-center justify-center gap-2 flex-wrap">
          <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden />
          All masking and restoration runs in your browser. Your code and mapping never leave your device.
        </p>
      </main>
    </div>
  );
}
