'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Code2,
  Copy,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Replace,
  Download,
  BarChart2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';

const FLAGS = [
  { id: 'g', label: 'Global', title: 'All matches' },
  { id: 'i', label: 'i', title: 'Case-insensitive' },
  { id: 'm', label: 'm', title: 'Multiline (^$ per line)' },
  { id: 's', label: 's', title: 'Dotall (. matches newline)' },
  { id: 'u', label: 'u', title: 'Unicode' },
  { id: 'y', label: 'y', title: 'Sticky' },
] as const;

const SAMPLES: { name: string; pattern: string; text: string }[] = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', text: 'Contact us at support@example.com or sales@company.co.uk for help.' },
  { name: 'URL', pattern: 'https?://[^\\s]+', text: 'Visit https://example.com and http://test.org for more.' },
  { name: 'Phone (US)', pattern: '\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b', text: 'Call 555-123-4567 or 555.987.6543' },
  { name: 'Numbers', pattern: '\\d+(?:\\.\\d+)?', text: 'Prices: 99.99, 42, 3.14' },
  { name: 'Words', pattern: '\\b\\w+\\b', text: 'Hello world from regex tester.' },
  { name: 'Capture groups', pattern: '(\\w+)\\s*=\\s*([^;]+)', text: 'name = John; age = 30; city = NYC' },
];

interface MatchResult {
  index: number;
  match: string;
  groups: string[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function runRegex(
  pattern: string,
  flags: string,
  text: string
): { error: string | null; matches: MatchResult[] } {
  if (!pattern.trim()) {
    return { error: null, matches: [] };
  }
  try {
    const re = new RegExp(pattern, flags);
    const matches: MatchResult[] = [];
    let execResult: RegExpExecArray | null;
    const reCopy = new RegExp(re.source, re.flags);
    while ((execResult = reCopy.exec(text)) !== null) {
      const groups = execResult.slice(1).map((g) => g ?? '');
      matches.push({
        index: execResult.index,
        match: execResult[0],
        groups,
      });
      if (!re.global) break;
    }
    return { error: null, matches };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : 'Invalid regular expression',
      matches: [],
    };
  }
}

function buildHighlightedHtml(text: string, matches: MatchResult[]): string {
  if (matches.length === 0) return escapeHtml(text);
  const parts: Array<{ start: number; end: number; match: boolean }> = [];
  matches.forEach((m) => {
    parts.push({ start: m.index, end: m.index + m.match.length, match: true });
  });
  parts.sort((a, b) => a.start - b.start);
  const merged: Array<{ start: number; end: number; match: boolean }> = [];
  for (const p of parts) {
    if (merged.length > 0 && p.start < merged[merged.length - 1].end) continue;
    merged.push(p);
  }
  let last = 0;
  const out: string[] = [];
  for (const p of merged) {
    if (p.start > last) {
      out.push('<span>', escapeHtml(text.slice(last, p.start)), '</span>');
    }
    out.push('<mark class="regex-highlight-mark">', escapeHtml(text.slice(p.start, p.end)), '</mark>');
    last = p.end;
  }
  if (last < text.length) {
    out.push('<span>', escapeHtml(text.slice(last)), '</span>');
  }
  return out.join('');
}

function replaceAll(
  text: string,
  pattern: string,
  flags: string,
  replacement: string
): { error: string | null; result: string } {
  if (!pattern.trim()) return { error: null, result: text };
  try {
    const re = new RegExp(pattern, flags);
    const result = text.replace(re, replacement);
    return { error: null, result };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : 'Invalid regular expression',
      result: text,
    };
  }
}

const DEFAULT_PATTERN = '\\b\\w+\\b';
const DEFAULT_TEXT = 'The quick brown fox jumps over the lazy dog.';

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState(DEFAULT_PATTERN);
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false, y: false });
  const [text, setText] = useState(DEFAULT_TEXT);
  const [replacement, setReplacement] = useState('');
  const [replaceResult, setReplaceResult] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);

  const flagsStr = useMemo(
    () => FLAGS.filter((f) => flags[f.id as keyof typeof flags]).map((f) => f.id).join(''),
    [flags]
  );

  const { error, matches } = useMemo(
    () => runRegex(pattern, flagsStr, text),
    [pattern, flagsStr, text]
  );

  const highlightedHtml = useMemo(
    () => buildHighlightedHtml(text, matches),
    [text, matches]
  );

  // Extract named capture group names from pattern
  const namedGroups = useMemo(() => {
    const names: string[] = [];
    const re = /\(\?<([a-zA-Z_][a-zA-Z0-9_]*)>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(pattern)) !== null) names.push(m[1]);
    return names;
  }, [pattern]);

  // Match statistics
  const matchStats = useMemo(() => {
    if (!matches.length || !text.length) return null;
    const uniqueCount = new Set(matches.map((m) => m.match)).size;
    const totalChars = matches.reduce((sum, m) => sum + m.match.length, 0);
    const avgLength = (totalChars / matches.length).toFixed(1);
    const coverage = ((totalChars / text.length) * 100).toFixed(1);
    return { uniqueCount, avgLength, coverage };
  }, [matches, text]);

  const handleReplace = () => {
    const { error: replaceError, result } = replaceAll(text, pattern, flagsStr, replacement);
    if (replaceError) {
      toast.error(replaceError);
      return;
    }
    setReplaceResult(result);
    toast.success('Replace applied');
  };

  const copyPattern = async () => {
    try {
      await navigator.clipboard.writeText(pattern);
      trackCopy('regex_tester');
      toast.success('Pattern copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyMatches = async () => {
    const lines = matches.map((m) => `[${m.index}] ${m.match}${m.groups.length ? ' | Groups: ' + m.groups.join(', ') : ''}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      trackCopy('regex_tester');
      toast.success('Matches copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const exportMatches = (format: 'json' | 'csv') => {
    if (!matches.length) return;
    const maxGroups = Math.max(...matches.map((m) => m.groups.length), 0);
    const groupHeaders = namedGroups.length
      ? namedGroups
      : Array.from({ length: maxGroups }, (_, i) => `Group${i + 1}`);
    let content: string;
    let filename: string;
    let mimeType: string;
    if (format === 'json') {
      const data = matches.map((m, i) => ({
        n: i + 1,
        index: m.index,
        match: m.match,
        ...(m.groups.length
          ? { groups: Object.fromEntries(groupHeaders.map((g, j) => [g, m.groups[j] ?? ''])) }
          : {}),
      }));
      content = JSON.stringify(data, null, 2);
      filename = 'regex-matches.json';
      mimeType = 'application/json';
    } else {
      const rows = matches.map((m, i) =>
        [i + 1, m.index, `"${m.match.replace(/"/g, '""')}"`, ...m.groups.map((g) => `"${(g ?? '').replace(/"/g, '""')}"`)].join(',')
      );
      content = [['#', 'Index', 'Match', ...groupHeaders].join(','), ...rows].join('\n');
      filename = 'regex-matches.csv';
      mimeType = 'text/csv';
    }
    const blob = new Blob([content], { type: mimeType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    trackCopy('regex_tester');
    toast.success(`Exported ${filename}`);
  };

  const copyReplaceResult = async () => {
    if (!replaceResult) return;
    try {
      await navigator.clipboard.writeText(replaceResult);
      trackCopy('regex_tester');
      toast.success('Result copied');
    } catch {
      toast.error('Copy failed');
    }
  };

  const setSample = (s: (typeof SAMPLES)[number]) => {
    setPattern(s.pattern);
    setText(s.text);
    setReplaceResult(null);
    setShowSamples(false);
  };

  const toggleFlag = (id: string) => {
    setFlags((prev) => ({ ...prev, [id]: !(prev as Record<string, boolean>)[id] }));
  };

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
              <Code2 className="w-8 h-8 text-primary-600" aria-hidden />
              Regex Tester — Test JavaScript Regular Expressions Online, Capture Groups, Replace &amp; Flags Real-Time Free
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Test regex in real time. See all matches, capture groups, and match indexes highlighted. Test replace with $1 $2. JavaScript RegExp, all flags (g i m s u y). Free, 100% browser-based.
          </p>
        </div>
      </header>

      <main id="tool" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Sample patterns */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden ring-1 ring-slate-900/5">
          <button
            type="button"
            onClick={() => setShowSamples(!showSamples)}
            className="w-full flex items-center justify-between px-5 py-3 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden />
              Sample patterns
            </span>
            {showSamples ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showSamples && (
            <div className="px-5 pb-5 pt-0 border-t border-slate-100 flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => {
                    trackCtaClick('regex_tester', 'load_sample', { sample_name: s.name });
                    setSample(s);
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Pattern + flags */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <label className="text-sm font-semibold text-slate-800">Regular expression</label>
            <button
              type="button"
              onClick={copyPattern}
              className="cta-regex-copy inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100"
            >
              <Copy className="w-4 h-4" aria-hidden />
              Copy
            </button>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-slate-400 font-mono text-lg">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter pattern..."
              className="flex-1 min-w-[200px] px-4 py-2.5 font-mono text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              spellCheck={false}
            />
            <span className="text-slate-400 font-mono text-lg">/</span>
            <div className="flex flex-wrap gap-2">
              {FLAGS.map((f) => (
                <label
                  key={f.id}
                  title={f.title}
                  className="inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={flags[f.id as keyof typeof flags]}
                    onChange={() => toggleFlag(f.id)}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-mono font-medium text-slate-700">{f.label}</span>
                </label>
              ))}
            </div>
          </div>
          {flagsStr && (
            <p className="mt-2 text-xs text-slate-500">Flags: <span className="font-mono">{flagsStr || '(none)'}</span></p>
          )}
        </section>

        {/* Test string */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <label className="block text-sm font-semibold text-slate-800 mb-2">Test string</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste text to test against..."
            className="regex-tester-textarea w-full h-40 px-4 py-3 font-mono text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y text-slate-900 placeholder:text-slate-500"
            spellCheck={false}
          />
        </section>

        {/* Error or results */}
        {pattern.trim() && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
            {error ? (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-medium text-red-800">Invalid regex</p>
                  <p className="text-sm text-red-700 mt-1 font-mono">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden />
                      <span className="font-semibold text-slate-800">
                        {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                      </span>
                    </div>
                    {matchStats && (
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <BarChart2 className="w-3.5 h-3.5" />
                          Unique: <strong className="text-slate-700">{matchStats.uniqueCount}</strong>
                        </span>
                        <span>Avg length: <strong className="text-slate-700">{matchStats.avgLength}</strong></span>
                        <span>Coverage: <strong className="text-slate-700">{matchStats.coverage}%</strong></span>
                        {namedGroups.length > 0 && (
                          <span className="text-violet-600 font-medium">Named groups: {namedGroups.join(', ')}</span>
                        )}
                      </div>
                    )}
                  </div>
                  {matches.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={copyMatches}
                        className="cta-regex-copy-matches inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100"
                      >
                        <Copy className="w-4 h-4" aria-hidden />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => exportMatches('json')}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100"
                      >
                        <Download className="w-4 h-4" aria-hidden />
                        JSON
                      </button>
                      <button
                        type="button"
                        onClick={() => exportMatches('csv')}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100"
                      >
                        <Download className="w-4 h-4" aria-hidden />
                        CSV
                      </button>
                    </div>
                  )}
                </div>

                {/* Highlighted text */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-slate-500 mb-2">Highlighted in test string</p>
                  <div
                    className="regex-highlighted-text w-full min-h-[80px] p-4 font-mono text-sm border border-slate-200 rounded-xl bg-slate-50/50 whitespace-pre-wrap break-words text-slate-900"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                  />
                </div>

                {/* Matches table */}
                {matches.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-slate-200 text-slate-500">
                          <th className="py-2 pr-4">#</th>
                          <th className="py-2 pr-4">Index</th>
                          <th className="py-2 pr-4">Match</th>
                          <th className="py-2">
                            {namedGroups.length > 0
                              ? `Groups (${namedGroups.join(', ')})`
                              : 'Groups'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((m, i) => (
                          <tr key={i} className="border-b border-slate-100 last:border-0">
                            <td className="py-2 pr-4 font-medium text-slate-600">{i + 1}</td>
                            <td className="py-2 pr-4 font-mono text-slate-600">{m.index}</td>
                            <td className="py-2 pr-4 font-mono">
                              <span className="bg-amber-100 px-1 rounded">{m.match || '(empty)'}</span>
                            </td>
                            <td className="py-2 font-mono text-slate-600">
                              {m.groups.length ? m.groups.join(', ') : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* Replace */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Replace className="w-5 h-5 text-slate-500" aria-hidden />
            Replace
          </h2>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-slate-500 mb-1">Replacement string</label>
              <input
                type="text"
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
                placeholder='e.g. [$1] or ***'
                className="w-full px-4 py-2.5 font-mono text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <button
              type="button"
              onClick={handleReplace}
              disabled={!pattern.trim()}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Replace
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Use $1, $2, … for capture groups; $& for full match.</p>
          {replaceResult !== null && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500">Result</p>
                <button
                  type="button"
                  onClick={copyReplaceResult}
                  className="text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  Copy
                </button>
              </div>
              <pre className="w-full p-4 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto whitespace-pre-wrap break-words">
                {replaceResult}
              </pre>
            </div>
          )}
        </section>
      </main>

      {/* SEO: educational content for developers */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden p-8 md:p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is a Regular Expression?</h2>
            <p className="text-slate-700 leading-relaxed">
              A regular expression (regex) is a sequence of characters that defines a search pattern. It&apos;s used to find, match, validate, and replace text in strings. Regex is supported in virtually every programming language — JavaScript, Python, Java, Go, PHP, Ruby — making it one of the most universally useful developer skills. This tester uses the JavaScript RegExp engine (ECMAScript) and runs entirely in your browser; nothing is sent to any server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Regex Quick Reference</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Character classes</h3>
                <ul className="space-y-1 font-mono">
                  <li><code className="bg-slate-100 px-1 rounded">.</code> — any character except newline</li>
                  <li><code className="bg-slate-100 px-1 rounded">\d</code> — digit [0-9]</li>
                  <li><code className="bg-slate-100 px-1 rounded">\D</code> — non-digit</li>
                  <li><code className="bg-slate-100 px-1 rounded">\w</code> — word character [a-zA-Z0-9_]</li>
                  <li><code className="bg-slate-100 px-1 rounded">\W</code> — non-word character</li>
                  <li><code className="bg-slate-100 px-1 rounded">\s</code> — whitespace</li>
                  <li><code className="bg-slate-100 px-1 rounded">\S</code> — non-whitespace</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Quantifiers</h3>
                <ul className="space-y-1 font-mono">
                  <li><code className="bg-slate-100 px-1 rounded">*</code> — 0 or more</li>
                  <li><code className="bg-slate-100 px-1 rounded">+</code> — 1 or more</li>
                  <li><code className="bg-slate-100 px-1 rounded">?</code> — 0 or 1</li>
                  <li><code className="bg-slate-100 px-1 rounded">{'{n}'}</code> — exactly n</li>
                  <li><code className="bg-slate-100 px-1 rounded">{'{n,}'}</code> — n or more</li>
                  <li><code className="bg-slate-100 px-1 rounded">{'{n,m}'}</code> — between n and m</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Anchors &amp; groups</h3>
                <ul className="space-y-1 font-mono">
                  <li><code className="bg-slate-100 px-1 rounded">^</code> — start of string/line</li>
                  <li><code className="bg-slate-100 px-1 rounded">$</code> — end of string/line</li>
                  <li><code className="bg-slate-100 px-1 rounded">\b</code> — word boundary</li>
                  <li><code className="bg-slate-100 px-1 rounded">(abc)</code> — capture group</li>
                  <li><code className="bg-slate-100 px-1 rounded">(?:abc)</code> — non-capturing</li>
                  <li><code className="bg-slate-100 px-1 rounded">(?&lt;name&gt;abc)</code> — named group</li>
                  <li><code className="bg-slate-100 px-1 rounded">(?=abc)</code> — positive lookahead</li>
                  <li><code className="bg-slate-100 px-1 rounded">(?!abc)</code> — negative lookahead</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">JavaScript flags</h3>
                <ul className="space-y-1 font-mono">
                  <li><code className="bg-slate-100 px-1 rounded">g</code> — global (find all matches)</li>
                  <li><code className="bg-slate-100 px-1 rounded">i</code> — case insensitive</li>
                  <li><code className="bg-slate-100 px-1 rounded">m</code> — multiline (^ $ per line)</li>
                  <li><code className="bg-slate-100 px-1 rounded">s</code> — dotAll (. matches newline)</li>
                  <li><code className="bg-slate-100 px-1 rounded">u</code> — unicode</li>
                  <li><code className="bg-slate-100 px-1 rounded">y</code> — sticky</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Regex Patterns</h2>
            <p className="text-slate-700 text-sm mb-4">Try these in the tester above — use the Sample patterns dropdown to load them.</p>
            <ul className="space-y-3 text-sm">
              <li>
                <strong className="text-slate-800">Email:</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs break-all">{'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'}</code>
              </li>
              <li>
                <strong className="text-slate-800">URL:</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs break-all">{'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}'}</code>
              </li>
              <li>
                <strong className="text-slate-800">Phone (US):</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">{'^\\+?1?\\s?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$'}</code>
              </li>
              <li>
                <strong className="text-slate-800">Date (YYYY-MM-DD):</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs break-all">{'^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'}</code>
              </li>
              <li>
                <strong className="text-slate-800">IPv4:</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">{'^(\\d{1,3}\\.){3}\\d{1,3}$'}</code>
              </li>
              <li>
                <strong className="text-slate-800">Password (min 8 chars, upper, lower, number):</strong>{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs break-all">{'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'}</code>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              <div>
                <dt className="font-semibold text-slate-900 mb-2">How do I test a regex pattern online?</dt>
                <dd className="text-slate-700 pl-4 border-l-2 border-slate-200">
                  Paste your regular expression in the pattern field and your test string below it. Matches highlight instantly in real time. The results table shows every match, its position index, and any capture groups. No clicking required — results update as you type.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-2">What is the g flag in JavaScript regex?</dt>
                <dd className="text-slate-700 pl-4 border-l-2 border-slate-200">
                  The g (global) flag makes the regex find ALL matches in the string instead of stopping after the first one. Without g, only the first match is returned. Most use cases require the g flag when searching or replacing in strings.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-2">How do I use capture groups in regex replace?</dt>
                <dd className="text-slate-700 pl-4 border-l-2 border-slate-200">
                  Wrap the part you want to capture in parentheses in your pattern. In the replacement field, reference it with $1 (first group), $2 (second group), and so on. For example: pattern <code className="bg-slate-100 px-1 rounded">(\w+)\s(\w+)</code> with replacement <code className="bg-slate-100 px-1 rounded">$2 $1</code> swaps the first two words.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-2">What is the difference between + and * in regex?</dt>
                <dd className="text-slate-700 pl-4 border-l-2 border-slate-200">
                  * matches 0 or more occurrences — it can match nothing. + matches 1 or more — it requires at least one match. Use + when the character must appear at least once. Use * when it&apos;s optional.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-2">What does \d mean in regex?</dt>
                <dd className="text-slate-700 pl-4 border-l-2 border-slate-200">
                  \d matches any digit character — equivalent to the character class [0-9]. Use \d+ to match one or more digits, \d{4} to match exactly 4 digits. Use \D (uppercase) for the opposite — any non-digit character.
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
            <p className="text-slate-700 text-sm mb-4">
              Pair regex with these developer tools:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/url-encoder" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/20 transition-colors">
                <h3 className="font-semibold text-slate-900 mb-1">URL Encoder</h3>
                <p className="text-sm text-slate-600">Encode special regex characters for sharing</p>
              </Link>
              <Link href="/json-comparator" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/20 transition-colors">
                <h3 className="font-semibold text-slate-900 mb-1">JSON Comparator</h3>
                <p className="text-sm text-slate-600">Compare JSON; use regex to match or extract fields</p>
              </Link>
              <Link href="/hash-generator" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/20 transition-colors">
                <h3 className="font-semibold text-slate-900 mb-1">Hash Generator</h3>
                <p className="text-sm text-slate-600">Validate hash formats with regex</p>
              </Link>
              <Link href="/base64-encoder" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/20 transition-colors">
                <h3 className="font-semibold text-slate-900 mb-1">Base64 Encoder</h3>
                <p className="text-sm text-slate-600">Validate base64 patterns with regex</p>
              </Link>
              <Link href="/test-data-generator" className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-primary-300 hover:bg-primary-50/20 transition-colors">
                <h3 className="font-semibold text-slate-900 mb-1">Test Data Generator</h3>
                <p className="text-sm text-slate-600">Generate data to test your regex against</p>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
