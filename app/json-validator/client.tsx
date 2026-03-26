'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import { useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, Clipboard, ClipboardCheck } from 'lucide-react';
import toast from 'react-hot-toast';

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

  const result: ValidationResult | null = (() => {
    if (!input.trim()) return null;
    try {
      JSON.parse(input);
      return { valid: true };
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : String(e);
      // Extract line/col from browser error messages like "at position 42" or "at line 3 column 5"
      const lineColMatch = msg.match(/line (\d+) column (\d+)/);
      if (lineColMatch) {
        return { valid: false, error: msg, line: parseInt(lineColMatch[1]), col: parseInt(lineColMatch[2]) };
      }
      return { valid: false, error: msg };
    }
  })();

  const handleCopy = useCallback(() => {
    if (!input) return;
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
    setInput('');
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      toast.error('Paste failed — use Ctrl+V in the textarea');
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-zinc-500">Paste JSON below. All validation runs in your browser.</p>
        <div className="flex items-center gap-2">
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
    </div>
  );
}

export default function JsonValidatorClient() {
  return (
    <ToolPageShell
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
