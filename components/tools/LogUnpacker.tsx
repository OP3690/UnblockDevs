'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  UnfoldVertical,
  Copy,
  Shield,
  AlertCircle,
  Loader2,
  Trash2,
  FileJson,
  Check,
  Lock,
  Download,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import { processLog, getAiSafeCopy, type AnnotationMode } from '@/lib/logUnpackerEngine';

const PLACEHOLDER = `Paste log or stringified JSON here...

Example:
{"timestamp":1740932654000,"level":"ERROR","context":"{\\"service\\":\\"billing-api\\"}"}`;

// ~400 chars: timestamp, JWT, path — enough to demo unpack + decode + scrub
const SAMPLE_LOGS = [
  {
    label: 'JWT + Timestamp',
    log: `{"ts":1740932654000,"level":"ERROR","ctx":"{\\"auth\\":\\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\\"}","err":"at (/Users/dev/app/src/db.js:45:12)"}`,
  },
  {
    label: 'Nested JSON',
    log: `{"level":"WARN","message":"Payment failed","payload":"{\\"userId\\":9001,\\"amount\\":199.99,\\"ts\\":1700000000,\\"retry\\":{\\"count\\":3,\\"nextAt\\":1700003600}}"}`,
  },
  {
    label: 'Paths + Error',
    log: `{"level":"ERROR","msg":"Config not found","path":"/Users/alice/projects/myapp/config/production.json","stack":"Error at /Users/alice/projects/myapp/src/server.ts:22:8","ts":1710000000000}`,
  },
  {
    label: 'K8s pod log',
    log: `{"time":"2024-03-15T10:22:31.456Z","stream":"stderr","log":"{\\"severity\\":\\"ERROR\\",\\"caller\\":\\"handlers/payments.go:88\\",\\"msg\\":\\"charge failed\\",\\"userId\\":\\"usr_9a1b2c\\",\\"traceId\\":\\"abc123def456\\",\\"err\\":\\"context deadline exceeded\\"}"}`,
  },
  {
    label: 'Multi-service',
    log: `{"service":"api-gateway","traceId":"t-9f8e7d","spans":"[{\\"svc\\":\\"auth-service\\",\\"ms\\":12},{\\"svc\\":\\"user-service\\",\\"ms\\":45},{\\"svc\\":\\"billing-service\\",\\"ms\\":230}]","status":500,"ts":1720000000000}`,
  },
];


export default function LogUnpacker() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [lastData, setLastData] = useState<unknown>(null);
  const [maskJwtPii, setMaskJwtPii] = useState(false);
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('inline');
  const [copiedWhich, setCopiedWhich] = useState<'output' | 'aisafe' | null>(null);

  const run = useCallback(() => {
    trackCtaClick('log_unpacker', 'unpack');
    setError(null);
    setOutput(null);
    setLastData(null);
    setCopiedWhich(null);
    if (!input.trim()) {
      setError('Enter or paste log content.');
      return;
    }
    setProcessing(true);
    try {
      const result = processLog(input.trim(), {
        scrubPaths: true,
        maskJwtPii,
        annotationMode,
      });
      if (!result.success) {
        setError(result.error || 'Processing failed.');
        setOutput(null);
        return;
      }
      setLastData(result.data);
      setOutput(JSON.stringify(result.data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error.');
      setOutput(null);
    } finally {
      setProcessing(false);
    }
  }, [input, maskJwtPii, annotationMode]);

  const copyAiSafe = useCallback(() => {
    trackCopy('log_unpacker');
    if (lastData == null) {
      toast.error('Run Unpack first.');
      return;
    }
    const safe = getAiSafeCopy(lastData);
    navigator.clipboard.writeText(safe).then(
      () => {
        setCopiedWhich('aisafe');
        setTimeout(() => setCopiedWhich(null), 2000);
        toast.success('AI-safe copy ready for prompts.');
      },
      () => toast.error('Copy failed.')
    );
  }, [lastData]);

  const copyOutput = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(
      () => {
        trackCopy('log_unpacker');
        setCopiedWhich('output');
        setTimeout(() => setCopiedWhich(null), 2000);
        toast.success('Output copied.');
      },
      () => toast.error('Copy failed.')
    );
  }, [output]);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `log-unpacked-${Date.now()}.json`;
    a.click();
    toast.success('Output downloaded.');
  }, [output]);

  const loadSample = useCallback((log: string, label: string) => {
    trackCtaClick('log_unpacker', 'load_sample');
    setInput(log);
    setError(null);
    setOutput(null);
    setLastData(null);
    toast.success(`${label} sample loaded. Click Unpack to process.`);
  }, []);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput(null);
    setError(null);
    setLastData(null);
    setCopiedWhich(null);
    toast.success('Cleared.');
  }, []);

  const charCount = input.length;
  const hasOutput = !!output;

  // Output stats derived from JSON text
  const outputStats = useMemo(() => {
    if (!output) return null;
    const jwtCount = (output.match(/"__decoded":/g) || []).length;
    const tsCount = (output.match(/"__human_time":/g) || []).length;
    const pathCount = (output.match(/"__scrubbed":\s*true/g) || []).length;
    return { jwtCount, tsCount, pathCount };
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/50">
        <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <FileJson className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Raw log / stringified JSON</h2>
                <p className="text-xs text-gray-500">Paste from logs, APIs, or error messages</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {charCount.toLocaleString()} chars
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_LOGS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => loadSample(s.log, s.label)}
                    className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 inline-flex items-center gap-1"
                  >
                    <Zap className="h-3 w-3 text-amber-500" />
                    {s.label}
                  </button>
                ))}
              </div>
              {input.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  title="Clear all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDER}
            className="min-h-[180px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50/80 p-4 font-mono text-sm leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400/20"
            spellCheck={false}
            aria-label="Log or JSON input"
          />

          {/* Options row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-100 pt-4">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={maskJwtPii}
                onChange={(e) => setMaskJwtPii(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-700">Mask PII in JWT (sub, name, email)</span>
            </label>
            <div className="flex items-center gap-2">
              <label htmlFor="log-unpacker-output-mode" className="text-sm text-gray-600">Output:</label>
              <select
                id="log-unpacker-output-mode"
                value={annotationMode}
                onChange={(e) => setAnnotationMode(e.target.value as AnnotationMode)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
                aria-label="Output annotation mode"
              >
                <option value="inline">Inline (developer)</option>
                <option value="sideChannel">Side-channel (schema-safe)</option>
              </select>
            </div>
          </div>

          {/* Primary action */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 disabled:opacity-60 disabled:shadow-none"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UnfoldVertical className="h-4 w-4" />
              )}
              {processing ? 'Unpacking…' : 'Unpack & Sanitize'}
            </button>
            <span className="text-xs text-gray-500">100% client-side · nothing sent to servers</span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-amber-900 shadow-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Output card */}
      {hasOutput && (
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/50">
          <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Processed output</h2>
                <p className="text-xs text-gray-500">
                  {annotationMode === 'sideChannel'
                    ? 'Structure intact; see __annotations for decoded/scrubbed metadata'
                    : 'Decoded and annotated inline (__meta, __decoded, __original)'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyOutput}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    copiedWhich === 'output'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {copiedWhich === 'output' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedWhich === 'output' ? 'Copied' : 'Copy output'}
                </button>
                <button
                  type="button"
                  onClick={copyAiSafe}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    copiedWhich === 'aisafe'
                      ? 'border-emerald-400 bg-emerald-100 text-emerald-800'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {copiedWhich === 'aisafe' ? <Check className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                  {copiedWhich === 'aisafe' ? 'Copied' : 'Copy AI-safe'}
                </button>
                <button
                  type="button"
                  onClick={downloadOutput}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  title="Download processed output as JSON"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <pre className="max-h-[480px] overflow-auto rounded-xl border border-gray-100 bg-slate-50/80 p-4 font-mono text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap break-words">
              <code>{output}</code>
            </pre>
            {outputStats && (outputStats.jwtCount > 0 || outputStats.tsCount > 0 || outputStats.pathCount > 0) && (
              <div className="mt-3 flex flex-wrap gap-3">
                {outputStats.jwtCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                    🔑 {outputStats.jwtCount} JWT{outputStats.jwtCount !== 1 ? 's' : ''} decoded
                  </span>
                )}
                {outputStats.tsCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    🕐 {outputStats.tsCount} timestamp{outputStats.tsCount !== 1 ? 's' : ''} converted
                  </span>
                )}
                {outputStats.pathCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    📁 {outputStats.pathCount} path{outputStats.pathCount !== 1 ? 's' : ''} scrubbed
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy note - highlighted */}
      <div className="flex items-start gap-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 px-5 py-4 shadow-md shadow-emerald-100/50">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Lock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold text-emerald-900">Privacy first</p>
          <p className="mt-1 text-sm text-emerald-800/90">
            All processing runs in your browser. No network requests, no storage, no telemetry. Safe to paste
            sensitive or production logs.
          </p>
        </div>
      </div>
    </div>
  );
}
