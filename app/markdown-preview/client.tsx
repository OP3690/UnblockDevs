'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Eye,
  Edit3,
  Columns,
  Copy,
  Check,
  Download,
  Trash2,
  FileText,
  BookOpen,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Markdown Parser ─────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseInline(text: string): string {
  // Bold + italic ***text***
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic *text* (not followed by another *)
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  // Bold + italic ___text___
  text = text.replace(/___([^_]+)___/g, '<strong><em>$1</em></strong>');
  // Bold __text__
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  // Italic _text_
  text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>');
  // Strikethrough ~~text~~
  text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  // Inline code `code`
  text = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
  // Images ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="md-img" />`;
  });
  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="md-link">${label}</a>`;
  });
  return text;
}

interface ListItem {
  indent: number;
  ordered: boolean;
  start: number;
  content: string;
  taskState: 'checked' | 'unchecked' | null;
}

function buildListHtml(items: ListItem[]): string {
  if (items.length === 0) return '';
  const out: string[] = [];

  function render(startIdx: number, baseIndent: number): number {
    const first = items[startIdx];
    if (!first) return startIdx;
    const isOrdered = first.ordered;
    const tag = isOrdered ? 'ol' : 'ul';
    const cls = isOrdered ? 'md-ol' : 'md-ul';
    out.push(`<${tag} class="${cls}">`);
    let i = startIdx;
    while (i < items.length && items[i].indent === baseIndent) {
      const item = items[i];
      // Peek next to check for nested list
      const nextItem = items[i + 1];
      let liContent = parseInline(item.content);
      if (item.taskState !== null) {
        const checked = item.taskState === 'checked';
        liContent = `<input type="checkbox" class="md-task-checkbox" ${checked ? 'checked' : ''} disabled /> ${liContent}`;
      }
      // Check if next items are nested
      if (nextItem && nextItem.indent > baseIndent) {
        out.push(`<li class="md-li">${liContent}`);
        i = render(i + 1, nextItem.indent);
        out.push('</li>');
      } else {
        out.push(`<li class="md-li">${liContent}</li>`);
        i++;
      }
    }
    out.push(`</${tag}>`);
    return i;
  }

  render(0, items[0].indent);
  return out.join('');
}

function parseMarkdown(input: string): string {
  if (!input.trim()) return '';

  try {
    const lines = input.split('\n');
    const blocks: string[] = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // ── Fenced code blocks ```lang\n...\n``` ──
      const fenceMatch = line.match(/^(`{3,}|~{3,})([\w-]*)/);
      if (fenceMatch) {
        const fence = fenceMatch[1];
        const lang = fenceMatch[2] || '';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith(fence)) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing fence
        const codeContent = escapeHtml(codeLines.join('\n'));
        const langBadge = lang
          ? `<span class="md-code-lang">${escapeHtml(lang)}</span>`
          : '';
        blocks.push(
          `<div class="md-code-block">${langBadge}<pre class="md-pre"><code>${codeContent}</code></pre></div>`
        );
        continue;
      }

      // ── Headings ──
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = parseInline(headingMatch[2]);
        const clsMap: Record<number, string> = {
          1: 'md-h1', 2: 'md-h2', 3: 'md-h3',
          4: 'md-h4', 5: 'md-h5', 6: 'md-h6',
        };
        blocks.push(`<h${level} class="${clsMap[level]}">${content}</h${level}>`);
        i++;
        continue;
      }

      // ── Horizontal rule ──
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
        blocks.push('<hr class="md-hr" />');
        i++;
        continue;
      }

      // ── Blockquote ──
      if (line.startsWith('> ') || line === '>') {
        const quoteLines: string[] = [];
        while (i < lines.length && (lines[i].startsWith('> ') || lines[i] === '>')) {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        const inner = parseMarkdown(quoteLines.join('\n'));
        blocks.push(`<blockquote class="md-blockquote">${inner}</blockquote>`);
        continue;
      }

      // ── Tables ──
      if (line.includes('|') && i + 1 < lines.length && lines[i + 1].match(/^\|?[\s:|-]+\|/)) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        if (tableLines.length >= 2) {
          const parseRow = (row: string): string[] =>
            row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

          const headerCells = parseRow(tableLines[0]);
          // Parse alignment from separator row
          const separatorCells = parseRow(tableLines[1]);
          const aligns = separatorCells.map((cell) => {
            if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
            if (cell.endsWith(':')) return 'right';
            return 'left';
          });

          const thead = headerCells
            .map((cell, ci) => `<th class="md-th" style="text-align:${aligns[ci] || 'left'}">${parseInline(cell)}</th>`)
            .join('');
          const bodyRows = tableLines.slice(2).map((row) => {
            const cells = parseRow(row);
            const tds = cells
              .map((cell, ci) => `<td class="md-td" style="text-align:${aligns[ci] || 'left'}">${parseInline(cell)}</td>`)
              .join('');
            return `<tr class="md-tr">${tds}</tr>`;
          });
          blocks.push(
            `<div class="md-table-wrap"><table class="md-table"><thead><tr class="md-tr">${thead}</tr></thead><tbody>${bodyRows.join('')}</tbody></table></div>`
          );
          continue;
        }
      }

      // ── Lists (ordered, unordered, task) ──
      const listItemMatch = line.match(/^(\s*)(-|\*|\+|\d+\.)\s+(.*)/);
      if (listItemMatch) {
        const listItems: ListItem[] = [];
        while (i < lines.length) {
          const l = lines[i];
          const m = l.match(/^(\s*)(-|\*|\+|(\d+)\.)\s+(.*)/);
          if (!m) break;
          const indent = m[1].length;
          const bullet = m[2];
          const num = m[3];
          let content = m[4];
          const isOrdered = /^\d+\.$/.test(bullet);
          let taskState: 'checked' | 'unchecked' | null = null;
          if (content.startsWith('[ ] ')) {
            taskState = 'unchecked';
            content = content.slice(4);
          } else if (content.startsWith('[x] ') || content.startsWith('[X] ')) {
            taskState = 'checked';
            content = content.slice(4);
          }
          listItems.push({
            indent,
            ordered: isOrdered,
            start: num ? parseInt(num, 10) : 1,
            content,
            taskState,
          });
          i++;
        }
        blocks.push(buildListHtml(listItems));
        continue;
      }

      // ── Blank line ──
      if (line.trim() === '') {
        i++;
        continue;
      }

      // ── Paragraph ──
      const paraLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !lines[i].match(/^#{1,6}\s/) &&
        !lines[i].match(/^(`{3,}|~{3,})/) &&
        !lines[i].match(/^(-{3,}|\*{3,}|_{3,})\s*$/) &&
        !lines[i].startsWith('> ') &&
        !lines[i].match(/^(\s*)(-|\*|\+|\d+\.)\s+/) &&
        !lines[i].includes('|')
      ) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        const content = paraLines.map((l) => parseInline(l)).join('<br />');
        blocks.push(`<p class="md-p">${content}</p>`);
      }
    }

    return blocks.join('\n');
  } catch {
    return `<p>Error parsing Markdown.</p>`;
  }
}

// ── Stats ─────────────────────────────────────────────────────────────────

function getStats(text: string) {
  if (!text.trim()) return { words: 0, chars: 0, readingTime: '0 min' };
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const minutes = Math.ceil(words / 200);
  return {
    words,
    chars,
    readingTime: minutes <= 1 ? '< 1 min' : `${minutes} min`,
  };
}

// ── Sample content ────────────────────────────────────────────────────────

const SAMPLE_MARKDOWN = `# GitHub Flavored Markdown Preview

Welcome to the **Markdown Preview & Editor** — a free, real-time Markdown renderer with GFM support.

## Text Formatting

Here is some *italic*, **bold**, and ***bold italic*** text. You can also use ~~strikethrough~~ for deletions.

Inline \`code\` is rendered with a monospace font and highlighted background.

## Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print([fibonacci(i) for i in range(10)])
\`\`\`

## Lists

### Unordered list

- Frontend Development
  - React
  - Vue
  - Svelte
- Backend Development
  - Node.js
  - Python
  - Go

### Ordered list

1. Install dependencies
2. Configure your environment
3. Run the development server
4. Deploy to production

### Task list

- [x] Set up project structure
- [x] Install dependencies
- [ ] Write unit tests
- [ ] Add CI/CD pipeline
- [ ] Deploy to production

## Blockquotes

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
>
> — Martin Fowler

## Tables

| Language   | Type       | Year | Popularity |
|:-----------|:----------:|-----:|:----------:|
| JavaScript | Dynamic    | 1995 | ⭐⭐⭐⭐⭐ |
| TypeScript | Static     | 2012 | ⭐⭐⭐⭐   |
| Python     | Dynamic    | 1991 | ⭐⭐⭐⭐⭐ |
| Rust       | Static     | 2010 | ⭐⭐⭐     |
| Go         | Static     | 2009 | ⭐⭐⭐⭐   |

## Links & Images

Visit [UnblockDevs](https://unblockdevs.com) for more free developer tools.

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

## Horizontal Rule

---

## More Formatting

This paragraph has a line break
right here (two trailing spaces).

Here is a second paragraph with **nested *emphasis* inside bold** text.
`;

// ── View modes ───────────────────────────────────────────────────────────

type ViewMode = 'split' | 'preview' | 'editor';

// ── Main component ────────────────────────────────────────────────────────

export default function MarkdownPreviewClient() {
  const [markdown, setMarkdown] = useState('');
  const [renderedHtml, setRenderedHtml] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [copied, setCopied] = useState<'html' | 'md' | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stats = getStats(markdown);

  // Debounced parse
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setRenderedHtml(parseMarkdown(markdown));
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [markdown]);

  // ⌘+Enter shortcut → copy HTML
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCopyHtml();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedHtml]);

  const handleCopyHtml = useCallback(async () => {
    if (!renderedHtml) {
      toast.error('Nothing to copy — write some Markdown first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(renderedHtml);
      setCopied('html');
      setTimeout(() => setCopied(null), 2000);
      toast.success('HTML copied to clipboard!');
      trackCopy('markdown_preview_html');
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  }, [renderedHtml]);

  const handleCopyMarkdown = useCallback(async () => {
    if (!markdown) {
      toast.error('Nothing to copy — write some Markdown first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied('md');
      setTimeout(() => setCopied(null), 2000);
      toast.success('Markdown copied to clipboard!');
      trackCopy('markdown_preview_md');
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  }, [markdown]);

  const handleDownloadHtml = useCallback(() => {
    if (!renderedHtml) {
      toast.error('Nothing to download — write some Markdown first.');
      return;
    }
    const full = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Markdown Export</title>\n<style>\nbody { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #18181b; line-height: 1.7; }\nh1,h2,h3,h4,h5,h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; }\npre { background: #18181b; color: #e4e4e7; padding: 1rem; border-radius: 8px; overflow-x: auto; }\ncode { background: #f4f4f5; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.875em; }\ntable { border-collapse: collapse; width: 100%; }\nth,td { border: 1px solid #e4e4e7; padding: 0.5rem 1rem; text-align: left; }\nth { background: #f4f4f5; font-weight: 600; }\nblockquote { border-left: 4px solid #10b981; margin: 0; padding: 0.5rem 1rem; background: #f0fdf4; color: #166534; }\n</style>\n</head>\n<body>\n${renderedHtml}\n</body>\n</html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded!');
    trackCtaClick('markdown_preview', 'download_html');
  }, [renderedHtml]);

  const handleDownloadMd = useCallback(() => {
    if (!markdown) {
      toast.error('Nothing to download — write some Markdown first.');
      return;
    }
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Markdown file downloaded!');
    trackCtaClick('markdown_preview', 'download_md');
  }, [markdown]);

  const handleClear = useCallback(() => {
    setMarkdown('');
    setRenderedHtml('');
  }, []);

  const handleLoadSample = useCallback(() => {
    setMarkdown(SAMPLE_MARKDOWN);
    trackCtaClick('markdown_preview', 'load_sample');
  }, []);

  const showEditor = viewMode === 'split' || viewMode === 'editor';
  const showPreview = viewMode === 'split' || viewMode === 'preview';

  const toolContent = (<>
      {/* ── Inline styles for preview ─────────────────────── */}
      <style>{`
        .md-preview h1,.md-h1{font-size:2em;font-weight:700;margin:0.67em 0;color:#18181b;border-bottom:2px solid #e4e4e7;padding-bottom:0.3em;line-height:1.2;}
        .md-preview h2,.md-h2{font-size:1.5em;font-weight:700;margin:0.75em 0 0.5em;color:#18181b;border-bottom:1px solid #e4e4e7;padding-bottom:0.25em;line-height:1.3;}
        .md-preview h3,.md-h3{font-size:1.25em;font-weight:600;margin:1em 0 0.4em;color:#27272a;line-height:1.4;}
        .md-preview h4,.md-h4{font-size:1.1em;font-weight:600;margin:1em 0 0.4em;color:#3f3f46;line-height:1.4;}
        .md-preview h5,.md-h5{font-size:1em;font-weight:600;margin:1em 0 0.4em;color:#52525b;}
        .md-preview h6,.md-h6{font-size:0.9em;font-weight:600;margin:1em 0 0.4em;color:#71717a;}
        .md-preview p,.md-p{margin:0.8em 0;line-height:1.8;color:#27272a;}
        .md-preview a,.md-link{color:#059669;text-decoration:underline;text-underline-offset:2px;}
        .md-preview a:hover,.md-link:hover{color:#047857;}
        .md-preview strong{font-weight:700;color:#18181b;}
        .md-preview em{font-style:italic;}
        .md-preview del{text-decoration:line-through;color:#71717a;}
        .md-preview code,.md-inline-code{background:#f4f4f5;border:1px solid #e4e4e7;border-radius:4px;padding:0.15em 0.45em;font-family:'Fira Mono','Courier New',monospace;font-size:0.875em;color:#be185d;}
        .md-code-block{position:relative;margin:1.2em 0;border-radius:10px;overflow:hidden;background:#18181b;border:1px solid #27272a;}
        .md-code-lang{position:absolute;top:8px;right:12px;font-size:11px;font-family:monospace;color:#a1a1aa;background:#27272a;padding:2px 8px;border-radius:4px;text-transform:lowercase;letter-spacing:0.05em;}
        .md-pre{margin:0;padding:1.25rem 1.25rem 1rem;overflow-x:auto;}
        .md-pre code{background:transparent;border:none;padding:0;font-size:0.85em;color:#e4e4e7;font-family:'Fira Mono','Cascadia Code','Courier New',monospace;line-height:1.6;}
        .md-blockquote{border-left:4px solid #10b981;margin:1em 0;padding:0.6em 1.2em;background:#f0fdf4;border-radius:0 8px 8px 0;color:#166534;}
        .md-blockquote p{margin:0;color:#166534;}
        .md-ul,.md-ol{margin:0.8em 0;padding-left:1.75em;color:#27272a;}
        .md-ul{list-style-type:disc;}
        .md-ol{list-style-type:decimal;}
        .md-ul .md-ul{list-style-type:circle;margin:0.3em 0;}
        .md-ul .md-ul .md-ul{list-style-type:square;}
        .md-li{margin:0.3em 0;line-height:1.7;}
        .md-task-checkbox{margin-right:0.4em;accent-color:#10b981;width:14px;height:14px;cursor:default;}
        .md-table-wrap{overflow-x:auto;margin:1.2em 0;}
        .md-table{border-collapse:collapse;width:100%;font-size:0.9em;}
        .md-th{background:#f4f4f5;font-weight:600;padding:0.6rem 1rem;border:1px solid #e4e4e7;color:#18181b;white-space:nowrap;}
        .md-td{padding:0.55rem 1rem;border:1px solid #e4e4e7;color:#27272a;}
        .md-tr:nth-child(even) .md-td{background:#fafafa;}
        .md-tr:hover .md-td{background:#f0fdf4;}
        .md-hr{border:none;border-top:2px solid #e4e4e7;margin:1.5em 0;}
        .md-img{max-width:100%;height:auto;border-radius:8px;margin:0.5em 0;}
      `}</style>

      <div className="flex flex-col gap-4">
        {/* ── Toolbar ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggles */}
          <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 gap-0.5">
            {([
              { mode: 'split', icon: <Columns className="h-3.5 w-3.5" />, label: 'Split' },
              { mode: 'preview', icon: <Eye className="h-3.5 w-3.5" />, label: 'Preview' },
              { mode: 'editor', icon: <Edit3 className="h-3.5 w-3.5" />, label: 'Editor' },
            ] as { mode: ViewMode; icon: React.ReactNode; label: string }[]).map(({ mode, icon, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-500">
            <span><strong className="text-zinc-700">{stats.words.toLocaleString()}</strong> words</span>
            <span className="text-zinc-300">|</span>
            <span><strong className="text-zinc-700">{stats.chars.toLocaleString()}</strong> chars</span>
            <span className="text-zinc-300">|</span>
            <span><strong className="text-zinc-700">{stats.readingTime}</strong> read</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyHtml}
              title="Copy HTML (⌘+Enter)"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
            >
              {copied === 'html' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Copy HTML</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              title="Copy Markdown"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              {copied === 'md' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <FileText className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Copy MD</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              title="Download as HTML"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">.html</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMd}
              title="Download as Markdown"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">.md</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              title="Clear editor"
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm transition-all hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* ── Editor + Preview panes ────────────────────────── */}
        <div className={`grid gap-4 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>

          {/* Editor pane */}
          {showEditor && (
            <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-lg">
              {/* Pane header */}
              <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2">
                <Edit3 className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400">Markdown</span>
                <div className="flex-1" />
                {!markdown && (
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="flex items-center gap-1.5 rounded-md border border-zinc-600 bg-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-all hover:border-emerald-500 hover:bg-emerald-900 hover:text-emerald-300"
                  >
                    <BookOpen className="h-3 w-3" />
                    Load sample
                  </button>
                )}
                {markdown && (
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="flex items-center gap-1.5 rounded-md border border-zinc-600 bg-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-300"
                    title="Replace with sample content"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Sample
                  </button>
                )}
              </div>

              {/* Textarea */}
              {markdown === '' && (
                <div className="pointer-events-none absolute inset-0 hidden" />
              )}
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="# Start typing Markdown here...\n\nOr click **Load sample** to see a full example."
                className="flex-1 resize-none bg-zinc-900 p-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none min-h-[500px] leading-relaxed"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          )}

          {/* Preview pane */}
          {showPreview && (
            <div className="flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
              {/* Pane header */}
              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2">
                <Eye className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-500">Preview</span>
                <div className="flex-1" />
                <span className="text-xs text-zinc-400">GitHub Flavored Markdown</span>
              </div>

              {/* Rendered output */}
              <div className="flex-1 overflow-y-auto p-6 min-h-[500px]">
                {renderedHtml ? (
                  <div
                    className="md-preview"
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16 text-zinc-400 gap-4">
                    <Eye className="h-12 w-12 opacity-20" />
                    <div>
                      <p className="text-sm font-medium text-zinc-500">No content yet</p>
                      <p className="text-xs mt-1">Start typing Markdown in the editor to see a live preview</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 transition-all hover:bg-emerald-100"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Load sample content
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Keyboard shortcut hint ───────────────────────── */}
        <p className="text-center text-xs text-zinc-400">
          Press <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600">⌘+Enter</kbd> (Mac) or <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600">Ctrl+Enter</kbd> (Windows) to copy HTML
        </p>
      </div>
    </>);

  return (
    <ToolPageShell
      title="Markdown Preview & Editor"
      subtitle="Live GitHub Flavored Markdown renderer — write on the left, preview on the right."
      backHref="/tools"
      backLabel="All tools"
      toolName="markdown_preview"
      icon="📝"
      features={['GFM support', 'No signup', 'Free forever']}
      showFooterBand={false}
      tool={toolContent}
    />
  );
}
