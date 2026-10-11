'use client';

import { useState, useCallback, useMemo, startTransition } from 'react';
import { Copy, Check, Minimize2, Maximize2, RotateCcw, ArrowLeftRight, Download, ChevronDown } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── HTML Formatter Logic ─────────────────────────────────────────────────────

type IndentStyle = '2' | '4' | 'tab';

const VOID_ELEMENTS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const INLINE_ELEMENTS = new Set(['a','abbr','acronym','b','bdo','big','br','button','cite','code','dfn','em','i','img','input','kbd','label','map','object','output','q','samp','select','small','span','strong','sub','sup','textarea','time','tt','u','var']);
const PRE_ELEMENTS = new Set(['pre','script','style','textarea']);

function getIndent(style: IndentStyle): string {
  return style === 'tab' ? '\t' : ' '.repeat(Number(style));
}

type ValidationIssue = { type: 'warn' | 'error'; msg: string };

function tryFormatAttrsPerLine(tag: string, padStr: string, oneIndent: string): string | null {
  const m = tag.match(/^<([a-zA-Z][a-zA-Z0-9:-]*)(\s[\s\S]*?)?(\/?>)$/);
  if (!m) return null;
  const [, tagName, rawAttrs, closing] = m;
  if (!rawAttrs || !rawAttrs.trim()) return null;
  const attrs: string[] = [];
  const attrRe = /(?:^|\s+)([a-zA-Z_:][a-zA-Z0-9:._\-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*))?/g;
  let am: RegExpExecArray | null;
  while ((am = attrRe.exec(rawAttrs)) !== null) {
    const a = am[0].trim();
    if (a) attrs.push(a);
  }
  if (attrs.length < 2) return null;
  const attrPad = padStr + oneIndent;
  return `${padStr}<${tagName}\n${attrs.map(a => `${attrPad}${a}`).join('\n')}\n${padStr}${closing}`;
}

function beautifyHtml(html: string, indentStyle: IndentStyle, attrPerLine = false): string {
  const indent = getIndent(indentStyle);
  const text = html.trim();

  // Simple but effective HTML formatter
  const lines: string[] = [];
  let depth = 0;
  let i = 0;
  let inPre = false;

  function pad() { return indent.repeat(depth); }

  while (i < text.length) {
    // Comment
    if (text.startsWith('<!--', i)) {
      const end = text.indexOf('-->', i);
      if (end === -1) { lines.push(pad() + text.slice(i)); break; }
      const comment = text.slice(i, end + 3);
      lines.push(pad() + comment.trim());
      i = end + 3;
      continue;
    }

    // DOCTYPE
    if (text.slice(i, i + 9).toLowerCase() === '<!doctype') {
      const end = text.indexOf('>', i);
      lines.push(text.slice(i, end + 1).trim());
      i = end + 1;
      continue;
    }

    // Opening tag, closing tag, self-closing tag
    if (text[i] === '<') {
      const end = text.indexOf('>', i);
      if (end === -1) { lines.push(pad() + text.slice(i)); break; }

      const tag = text.slice(i, end + 1);
      const isClosing = tag[1] === '/';
      const isSelfClosing = tag[tag.length - 2] === '/' || VOID_ELEMENTS.has(tag.slice(1).split(/[\s>]/)[0].toLowerCase());
      const tagName = (isClosing ? tag.slice(2) : tag.slice(1)).split(/[\s>\/]/)[0].toLowerCase();
      const isInlineLike = INLINE_ELEMENTS.has(tagName);
      const isPre = PRE_ELEMENTS.has(tagName);

      if (isPre && !isClosing) inPre = true;
      if (isPre && isClosing) inPre = false;

      if (isClosing) depth = Math.max(0, depth - 1);

      if (inPre || isInlineLike) {
        // For inline elements, just append to last line if possible
        const lastLine = lines[lines.length - 1] ?? '';
        if (lastLine !== '' && !lastLine.endsWith('>') && !isClosing) {
          lines[lines.length - 1] = lastLine + tag;
        } else {
          lines.push(pad() + tag);
        }
      } else {
        const fmtTag = attrPerLine ? tryFormatAttrsPerLine(tag, pad(), indent) : null;
        lines.push(fmtTag ?? (pad() + tag));
      }

      if (!isClosing && !isSelfClosing) depth++;
      if (isSelfClosing && !isClosing) depth = Math.max(0, depth - 1);

      i = end + 1;

      // Consume text content after opening tag until next tag
      if (!isClosing && !isSelfClosing) {
        const nextTag = text.indexOf('<', i);
        if (nextTag === -1) {
          lines[lines.length - 1] += text.slice(i).trim();
          break;
        }
        const textContent = text.slice(i, nextTag).trim();
        if (textContent) {
          const lastLine = lines[lines.length - 1];
          const lastTagName = (lastLine.trim().match(/^<([a-z0-9]+)/i) ?? [])[1]?.toLowerCase() ?? '';
          if (INLINE_ELEMENTS.has(lastTagName) || textContent.length < 80) {
            lines[lines.length - 1] += textContent;
          } else {
            lines.push(pad() + textContent);
          }
          i = nextTag;
        }
      }
      continue;
    }

    // Plain text
    const nextTag = text.indexOf('<', i);
    const textContent = (nextTag === -1 ? text.slice(i) : text.slice(i, nextTag)).trim();
    if (textContent) lines.push(pad() + textContent);
    i = nextTag === -1 ? text.length : nextTag;
  }

  return lines.filter(l => l.trim() !== '').join('\n');
}

function minifyHtml(html: string): string {
  return html
    .replace(/<!--(?![\s\S]*?\[if )[\s\S]*?-->/g, '')  // remove comments (keep IE conditionals)
    .replace(/\s+/g, ' ')                                // collapse whitespace
    .replace(/>\s+</g, '><')                             // remove whitespace between tags
    .replace(/\s+>/g, '>')                               // remove whitespace before >
    .replace(/<\s+/g, '<')                               // remove whitespace after <
    .trim();
}

function validateHtml(html: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const htmlTag = html.match(/<html(?:\s[^>]*)?\s*>/i);
  if (htmlTag && !/\blang\s*=/i.test(htmlTag[0])) {
    issues.push({ type: 'warn', msg: 'Missing lang attribute on <html> tag' });
  }
  const imgTags = html.match(/<img(?:\s[^>]*)?\/?>/gi) || [];
  imgTags.forEach((imgTag, idx) => {
    if (!/\balt\s*=/i.test(imgTag)) {
      issues.push({ type: 'warn', msg: `<img> #${idx + 1} missing alt attribute` });
    }
  });
  (['center', 'font', 'b', 'i'] as const).forEach(tag => {
    if (new RegExp(`<${tag}(?:\\s|>)`, 'i').test(html)) {
      issues.push({ type: 'warn', msg: `Deprecated tag <${tag}> found` });
    }
  });
  ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'ul', 'ol', 'table', 'form'].forEach(tag => {
    const opens = (html.match(new RegExp(`<${tag}(?:\\s|>)`, 'gi')) || []).length;
    const closes = (html.match(new RegExp(`<\\/${tag}>`, 'gi')) || []).length;
    if (opens > closes) issues.push({ type: 'error', msg: `<${tag}> opened ${opens}× but closed only ${closes}×` });
  });
  return issues;
}

function countStats(html: string) {
  const chars = html.length;
  const lines = html.split('\n').length;
  const tags = (html.match(/<[a-z][^>]*>/gi) ?? []).length;
  return { chars, lines, tags };
}

// ── Copy Button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={handle} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'} ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

// ── Sample HTML ───────────────────────────────────────────────────────────────

const SAMPLE = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Page</title><link rel="stylesheet" href="styles.css"></head><body><header class="site-header"><nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul></nav></header><main><section class="hero"><h1>Welcome to My Site</h1><p>This is the hero section of the landing page.</p><a href="/get-started" class="btn btn-primary">Get Started</a></section><section class="features"><div class="feature-card"><h2>Feature One</h2><p>Description of the first feature goes here.</p></div><div class="feature-card"><h2>Feature Two</h2><p>Description of the second feature goes here.</p></div></section></main><footer><p>&copy; 2026 My Site. All rights reserved.</p></footer></body></html>`;

// ── Main Tool ─────────────────────────────────────────────────────────────────

function HtmlFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [indent, setIndent] = useState<IndentStyle>('2');
  const [error, setError] = useState<string | null>(null);
  const [swapped, setSwapped] = useState(false);
  const [attrPerLine, setAttrPerLine]   = useState(false);
  const [validation, setValidation]     = useState<ValidationIssue[]>([]);
  const [validOpen, setValidOpen]       = useState(false);

  const inputStats = useMemo(() => countStats(input), [input]);
  const outputStats = useMemo(() => countStats(output), [output]);

  const process = useCallback((html: string, m: typeof mode, ind: IndentStyle, apl: boolean) => {
    if (!html.trim()) { setOutput(''); setError(null); setValidation([]); return; }
    try {
      const result = m === 'beautify' ? beautifyHtml(html, ind, apl) : minifyHtml(html);
      setOutput(result);
      setError(null);
      setValidation(validateHtml(html));
    } catch (e) {
      setError(String(e));
    }
  }, []);

  const handleInput = useCallback((val: string) => {
    setInput(val);
    startTransition(() => {
      process(val, mode, indent, attrPerLine);
    });
  }, [mode, indent, attrPerLine, process]);

  const handleMode = useCallback((m: typeof mode) => {
    setMode(m);
    process(input, m, indent, attrPerLine);
  }, [input, indent, attrPerLine, process]);

  const handleIndent = useCallback((ind: IndentStyle) => {
    setIndent(ind);
    process(input, mode, ind, attrPerLine);
  }, [input, mode, attrPerLine, process]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE);
    process(SAMPLE, mode, indent, attrPerLine);
  }, [mode, indent, attrPerLine, process]);

  const clear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setValidation([]);
  }, []);

  const downloadHtml = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'beautify' ? 'formatted.html' : 'minified.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [output, mode]);

  const handleAttrPerLine = useCallback((val: boolean) => {
    setAttrPerLine(val);
    process(input, mode, indent, val);
  }, [input, mode, indent, process]);

  const swapInOut = useCallback(() => {
    if (output) {
      setInput(output);
      process(output, mode, indent, attrPerLine);
      setSwapped(v => !v);
    }
  }, [output, mode, indent, attrPerLine, process]);

  const savings = input.length > 0 && output.length > 0
    ? Math.round((1 - output.length / input.length) * 100)
    : null;

  return (
    <div className="divide-y divide-zinc-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-2.5 sm:px-5">
        {/* Mode toggle */}
        <div className="flex rounded-xl bg-zinc-200 p-0.5 gap-0.5">
          <button onClick={() => handleMode('beautify')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${mode === 'beautify' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
            <Maximize2 className="h-3.5 w-3.5" /> Beautify
          </button>
          <button onClick={() => handleMode('minify')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${mode === 'minify' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
            <Minimize2 className="h-3.5 w-3.5" /> Minify
          </button>
        </div>

        {/* Indent (only for beautify) */}
        {mode === 'beautify' && (
          <div className="flex rounded-xl bg-zinc-200 p-0.5 gap-0.5">
            {(['2', '4', 'tab'] as IndentStyle[]).map(s => (
              <button key={s} onClick={() => handleIndent(s)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${indent === s ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                {s === 'tab' ? 'Tab' : `${s} Spaces`}
              </button>
            ))}
          </div>
        )}

        {/* One attr/line toggle (beautify only) */}
        {mode === 'beautify' && (
          <button onClick={() => handleAttrPerLine(!attrPerLine)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[12px] font-semibold transition shadow-sm ${
              attrPerLine
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
            }`}>
            One attr/line
          </button>
        )}

        <div className="flex-1" />

        <button onClick={loadSample} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm">
          Sample
        </button>
        <button onClick={clear} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm">
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>

      {/* Editor panels */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

        {/* Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-400" />
              <span className="text-[12px] font-semibold text-zinc-600">Input HTML</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400 tabular-nums">
              {input && <><span>{inputStats.lines} lines</span><span>{inputStats.chars} chars</span></>}
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => handleInput(e.target.value)}
            placeholder="Paste your HTML here — minified, messy, or partial…"
            className="flex-1 resize-none bg-white p-4 font-mono text-[12px] text-zinc-800 outline-none placeholder:text-zinc-300 leading-relaxed"
            style={{ minHeight: '360px' }}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${error ? 'bg-red-400' : output ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
              <span className="text-[12px] font-semibold text-zinc-600">
                {mode === 'beautify' ? 'Formatted HTML' : 'Minified HTML'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 tabular-nums flex-wrap">
              {output && !error && (
                <>
                  {savings !== null && mode === 'minify' && savings > 0 && (
                    <span className="text-emerald-600 font-semibold">−{savings}% size</span>
                  )}
                  <span>{outputStats.lines} lines</span>
                  <span>{outputStats.chars} chars</span>
                </>
              )}
              {validation.length > 0 && !error && (
                <button onClick={() => setValidOpen(v => !v)}
                  className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold border transition ${
                    validation.some(v => v.type === 'error')
                      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}>
                  {validation.some(v => v.type === 'error')
                    ? `${validation.filter(v => v.type === 'error').length} error${validation.filter(v => v.type === 'error').length !== 1 ? 's' : ''}`
                    : `${validation.length} warning${validation.length !== 1 ? 's' : ''}`}
                  <ChevronDown className={`h-2.5 w-2.5 ml-0.5 transition-transform ${validOpen ? '' : '-rotate-90'}`} />
                </button>
              )}
            </div>
          </div>

          {error ? (
            <div className="flex-1 p-4">
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
            </div>
          ) : (
            <pre className="flex-1 overflow-auto p-4 font-mono text-[12px] text-zinc-800 bg-zinc-50 leading-relaxed whitespace-pre-wrap"
              style={{ minHeight: '360px' }}>
              {output || <span className="text-zinc-300">Formatted output will appear here…</span>}
            </pre>
          )}

          {/* Validation details */}
          {validOpen && validation.length > 0 && !error && (
            <div className="border-t border-zinc-100 bg-amber-50/60 px-4 py-3 space-y-1.5">
              {validation.map((issue, i) => (
                <div key={i} className={`flex items-start gap-2 text-[11px] ${issue.type === 'error' ? 'text-red-600' : 'text-amber-700'}`}>
                  <span className="shrink-0 font-bold mt-px">{issue.type === 'error' ? '✖' : '⚠'}</span>
                  <span>{issue.msg}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          {output && !error && (
            <div className="flex items-center gap-2 border-t border-zinc-100 px-4 py-2.5 bg-white flex-wrap">
              <CopyBtn text={output} label={mode === 'beautify' ? 'Copy Formatted' : 'Copy Minified'} />
              <button onClick={swapInOut}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition">
                <ArrowLeftRight className="h-3.5 w-3.5" /> Use as Input
              </button>
              <button onClick={downloadHtml}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition">
                <Download className="h-3.5 w-3.5" /> Download .html
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {input && output && !error && (
        <div className="flex flex-wrap items-center gap-4 bg-zinc-50 px-5 py-2.5 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span>Input: <strong className="text-zinc-700">{inputStats.chars.toLocaleString()} chars</strong> · {inputStats.lines} lines · {inputStats.tags} tags</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Output: <strong className="text-zinc-700">{outputStats.chars.toLocaleString()} chars</strong> · {outputStats.lines} lines</span>
          </div>
          {mode === 'minify' && savings !== null && (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span>Saved: <strong className="text-blue-700">{(inputStats.chars - outputStats.chars).toLocaleString()} chars ({savings}%)</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Shell wrapper ─────────────────────────────────────────────────────────────

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Developer Tools', href: '/' },
  { label: 'HTML Formatter' },
];

export default function HtmlFormatterClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="HTML Formatter"
      subtitle="Beautify or minify HTML instantly — fix indentation, clean code, compress for production"
      toolName="html_formatter"
      icon="🗂️"
      features={['Beautify & Minify', 'Custom indent', 'Size savings %', 'Browser-only']}
      tool={<HtmlFormatterTool />}
    />
  );
}
