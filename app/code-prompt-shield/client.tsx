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
} from 'lucide-react';
import toast from 'react-hot-toast';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'go', name: 'Go' },
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

const COMMON_KEYWORDS = new Set(['int', 'string', 'bool', 'void', 'null', 'true', 'false', 'new', 'return', 'import']);

function getKeywords(lang: LangId): Set<string> {
  if (lang === 'python') return PYTHON_KEYWORDS;
  if (lang === 'javascript' || lang === 'typescript') return JS_TS_KEYWORDS;
  return COMMON_KEYWORDS;
}

function simpleHash(str: string, seed = 0): string {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).slice(0, 6);
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

function maskCode(
  source: string,
  language: LangId,
  options: { maskIdentifiers: boolean; maskSecrets: boolean; maskPII: boolean }
): { masked: string; mapping: CodeShieldMapping } {
  const keywords = getKeywords(language);
  const map: Record<string, string> = {};
  const reverseMap: Record<string, string> = {};
  let counter = 0;

  const salt = `code-shield-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const ensureMask = (original: string, prefix: string): string => {
    if (reverseMap[original]) return reverseMap[original];
    const masked = `${prefix}_${simpleHash(original + salt)}${counter > 0 ? String(counter) : ''}`;
    counter++;
    map[masked] = original;
    reverseMap[original] = masked;
    return masked;
  };

  let result = source;

  if (options.maskSecrets || options.maskPII) {
    const stringLiteralRegex = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
    const secretPatterns = [
      /api[_-]?key|secret|password|token|bearer|auth|credential|private[_-]?key|connection[_-]?string/i,
      /postgres:\/\//i,
      /mysql:\/\//i,
      /mongodb(\+srv)?:\/\//i,
      /sk-[a-zA-Z0-9]+|pk_[a-zA-Z0-9]+/i,
    ];
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const piiPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;

    result = result.replace(stringLiteralRegex, (match) => {
      const inner = match.slice(1, -1);
      const unescaped = inner.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`');
      if (options.maskPII && emailRegex.test(unescaped)) {
        const masked = ensureMask(unescaped, 'PII');
        return match[0] + masked + match[match.length - 1];
      }
      if (options.maskPII && piiPhone.test(unescaped)) {
        const masked = ensureMask(unescaped, 'PII');
        return match[0] + masked + match[match.length - 1];
      }
      if (options.maskSecrets && secretPatterns.some((p) => p.test(inner) || p.test(match))) {
        const masked = ensureMask(unescaped, 'SECRET');
        return match[0] + masked + match[match.length - 1];
      }
      return match;
    });
  }

  if (options.maskIdentifiers) {
    const identifierRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    result = result.replace(identifierRegex, (word) => {
      if (keywords.has(word)) return word;
      if (reverseMap[word]) return reverseMap[word];
      const masked = ensureMask(word, 'VAR');
      return masked;
    });
  }

  const mapping: CodeShieldMapping = {
    version: '1.0',
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

  const copyMasked = async () => {
    if (!maskedCode) return;
    try {
      await navigator.clipboard.writeText(maskedCode);
      toast.success('Masked code copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const downloadMapping = () => {
    if (!mapping) return;
    try {
      const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-shield-mapping-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Mapping downloaded');
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
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-slate-500" aria-hidden />
            Source code
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LangId)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Masked code</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{mapCount} tokens masked</span>
                <button
                  type="button"
                  onClick={copyMasked}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" aria-hidden />
                  Copy
                </button>
                <button
                  type="button"
                  onClick={downloadMapping}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" aria-hidden />
                  Download mapping
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" aria-hidden />
                  Load mapping
                  <input type="file" accept=".json" onChange={loadMappingFile} className="sr-only" />
                </label>
              </div>
            </div>
            <textarea
              readOnly
              value={maskedCode}
              className="w-full h-40 p-4 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl resize-y"
              aria-label="Masked code"
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
