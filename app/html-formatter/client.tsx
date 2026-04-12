'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, Minimize2, Maximize2, RotateCcw, ArrowLeftRight } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── HTML Formatter Logic ─────────────────────────────────────────────────────

type IndentStyle = '2' | '4' | 'tab';

const VOID_ELEMENTS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const INLINE_ELEMENTS = new Set(['a','abbr','acronym','b','bdo','big','br','button','cite','code','dfn','em','i','img','input','kbd','label','map','object','output','q','samp','select','small','span','strong','sub','sup','textarea','time','tt','u','var']);
const PRE_ELEMENTS = new Set(['pre','script','style','textarea']);

function getIndent(style: IndentStyle): string {
  return style === 'tab' ? '\t' : ' '.repeat(Number(style));
}

function beautifyHtml(html: string, indentStyle: IndentStyle): string {
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
        lines.push(pad() + tag);
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

  const inputStats = useMemo(() => countStats(input), [input]);
  const outputStats = useMemo(() => countStats(output), [output]);

  const process = useCallback((html: string, m: typeof mode, ind: IndentStyle) => {
    if (!html.trim()) { setOutput(''); setError(null); return; }
    try {
      const result = m === 'beautify' ? beautifyHtml(html, ind) : minifyHtml(html);
      setOutput(result);
      setError(null);
    } catch (e) {
      setError(String(e));
    }
  }, []);

  const handleInput = useCallback((val: string) => {
    setInput(val);
    process(val, mode, indent);
  }, [mode, indent, process]);

  const handleMode = useCallback((m: typeof mode) => {
    setMode(m);
    process(input, m, indent);
  }, [input, indent, process]);

  const handleIndent = useCallback((ind: IndentStyle) => {
    setIndent(ind);
    process(input, mode, ind);
  }, [input, mode, process]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE);
    process(SAMPLE, mode, indent);
  }, [mode, indent, process]);

  const clear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  const swapInOut = useCallback(() => {
    if (output) {
      setInput(output);
      process(output, mode, indent);
      setSwapped(v => !v);
    }
  }, [output, mode, indent, process]);

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
            <div className="flex items-center gap-3 text-[11px] text-zinc-400 tabular-nums">
              {output && !error && (
                <>
                  {savings !== null && mode === 'minify' && savings > 0 && (
                    <span className="text-emerald-600 font-semibold">−{savings}% size</span>
                  )}
                  <span>{outputStats.lines} lines</span>
                  <span>{outputStats.chars} chars</span>
                </>
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

          {/* Actions */}
          {output && !error && (
            <div className="flex items-center gap-2 border-t border-zinc-100 px-4 py-2.5 bg-white">
              <CopyBtn text={output} label={mode === 'beautify' ? 'Copy Formatted' : 'Copy Minified'} />
              <button onClick={swapInOut}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition">
                <ArrowLeftRight className="h-3.5 w-3.5" /> Use as Input
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
