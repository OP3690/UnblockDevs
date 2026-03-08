'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  FileUp,
  Image as ImageIcon,
  RotateCcw,
  Download,
  Share2,
  ClipboardPaste,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  encodeBase64,
  decodeBase64,
  sanitizeInput,
  detectContentType,
  runSecurityScan,
  getAllEncodingVariants,
  BASE64_CHARS,
  getUsedBase64Chars,
  formatBytes,
  isValidBase64,
  getMaxInputChars,
  getLargeInputWarnChars,
  type Variant,
  type DetectedContent,
  type EncodingVariantRow,
} from '@/lib/base64Engine';

const MODES = ['encode', 'decode', 'file', 'image'] as const;
type Mode = (typeof MODES)[number];

const VARIANT_OPTIONS: { value: Variant; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'url', label: 'Base64URL' },
  { value: 'mime', label: 'MIME' },
  { value: 'nopad', label: 'No-Padding' },
];

const HISTORY_KEY = 'base64-encoder-history';
const HISTORY_MAX = 15;
const DEBOUNCE_MS = 300;
const SAMPLE_PLAIN = 'Hello World';
const SAMPLE_B64 = 'SGVsbG8gV29ybGQ=';

function getByteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

export default function Base64EncoderClient() {
  const [mode, setMode] = useState<Mode>('encode');
  const [variant, setVariant] = useState<Variant>('standard');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operationsCount, setOperationsCount] = useState(0);
  const [lastProcessTime, setLastProcessTime] = useState<number | null>(null);
  const [detected, setDetected] = useState<DetectedContent | null>(null);
  const [securityResult, setSecurityResult] = useState<ReturnType<typeof runSecurityScan> | null>(null);
  const [history, setHistory] = useState<{ type: string; preview: string; bytes: number; variant: string; time: string }[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number; mime: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [variantsOpen, setVariantsOpen] = useState(false);
  const [charMapOpen, setCharMapOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [variantPanelOpen, setVariantPanelOpen] = useState(false);
  const [fileProgress, setFileProgress] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  const inputBytes = getByteLength(input);
  const outputBytes = getByteLength(output);
  const sizeRatio = inputBytes > 0 ? Math.round((outputBytes / inputBytes) * 100) : 0;
  const paddingCount = (output.match(/=/g) || []).length;
  const validB64 = output.trim() ? isValidBase64(output) : null;

  const processInput = useCallback(() => {
    const raw = sanitizeInput(input);
    if (raw.length > getMaxInputChars()) {
      toast.error(`Input exceeds maximum ${getMaxInputChars().toLocaleString()} characters`);
      return;
    }
    if (raw.length > getLargeInputWarnChars()) {
      toast('Consider using File mode for large content', { icon: '⚠️', duration: 4000 });
    }
    const start = performance.now();
    if (mode === 'encode') {
      const result = encodeBase64(raw, variant);
      setOutput(result);
      const decoded = decodeBase64(result);
      setDetected(detectContentType(raw, null));
      setSecurityResult(runSecurityScan(raw));
      setImagePreviewUrl(null);
    } else if (mode === 'decode' || mode === 'image') {
      const result = decodeBase64(raw);
      if (result.success && result.text !== undefined) {
        setOutput(result.text);
        setDetected(detectContentType(raw, result.bytes ?? undefined));
        setSecurityResult(runSecurityScan(result.text));
        if (result.bytes && result.bytes.length >= 4) {
          const u8 = result.bytes;
          const isPng = u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47;
          const isJpeg = u8[0] === 0xff && u8[1] === 0xd8;
          const isGif = u8[0] === 0x47 && u8[1] === 0x49 && u8[2] === 0x46;
          const isWebP = u8.length >= 12 && u8[0] === 0x52 && u8[8] === 0x57 && u8[9] === 0x45 && u8[10] === 0x42 && u8[11] === 0x50;
          const isSvg = result.text.trimStart().startsWith('<svg');
          let mime = 'application/octet-stream';
          if (isPng) mime = 'image/png';
          else if (isJpeg) mime = 'image/jpeg';
          else if (isGif) mime = 'image/gif';
          else if (isWebP) mime = 'image/webp';
          else if (isSvg) mime = 'image/svg+xml';
          if (isPng || isJpeg || isGif || isWebP || isSvg) {
            const bytes = result.bytes!;
            const blob = new Blob([bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)], { type: mime });
            const url = URL.createObjectURL(blob);
            setImagePreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return url;
            });
          } else {
            setImagePreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return null;
            });
          }
        } else {
          setImagePreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
          });
        }
      } else {
        setOutput(result.error || 'Decode failed');
        setDetected(null);
        setSecurityResult(null);
        setImagePreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
      }
    } else {
      setLastProcessTime(performance.now() - start);
      return;
    }
    setLastProcessTime(performance.now() - start);
    setOperationsCount((c) => c + 1);
    const entry = {
      type: mode === 'encode' ? 'ENCODE' : 'DECODE',
      preview: raw.slice(0, 60) + (raw.length > 60 ? '…' : ''),
      bytes: getByteLength(raw),
      variant: variant,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
    };
    setHistory((prev) => {
      const next = [entry, ...prev.filter((h) => h.preview !== entry.preview || h.time !== entry.time)].slice(0, HISTORY_MAX);
      try {
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setHistoryOpen(true);
  }, [input, mode, variant]);

  useEffect(() => {
    if (mode === 'file' || !input.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(processInput, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, mode, variant, processInput]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    const data = params.get('data') || (hash ? decodeURIComponent(hash) : '');
    const modeParam = (params.get('mode') || 'encode') as Mode;
    const variantParam = (params.get('variant') || 'standard') as Variant;
    if (data) {
      setInput(data);
      setMode(MODES.includes(modeParam) ? modeParam : 'encode');
      setVariant(VARIANT_OPTIONS.some((o) => o.value === variantParam) ? variantParam : 'standard');
      toast.success('Loaded from shared link', { icon: '🔗' });
    }
    try {
      const raw = sessionStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
      setVariantPanelOpen(sessionStorage.getItem('base64-variants-open') === '1');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem('base64-variants-open', variantPanelOpen ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [variantPanelOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShortcutsOpen(false);
      setVariantsOpen(false);
      setCharMapOpen(false);
      return;
    }
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processInput();
        return;
      }
      if (e.shiftKey && e.key === 'C') {
        e.preventDefault();
        if (output) copyOutput();
        return;
      }
      if (e.shiftKey && e.key === 'X') {
        e.preventDefault();
        swapPanels();
        return;
      }
      if (e.shiftKey && e.key === 'V') {
        e.preventDefault();
        pasteFromClipboard();
        return;
      }
      if (e.key === 'K') {
        e.preventDefault();
        clearAll();
        return;
      }
      if (e.key === 'D') {
        e.preventDefault();
        downloadOutput();
        return;
      }
      if (e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        setMode(MODES[parseInt(e.key, 10) - 1]);
        return;
      }
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(
      () => {
        setCopied('output');
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(null), 2000);
      },
      () => toast.error('Copy failed')
    );
  };

  const swapPanels = () => {
    setInput(output);
    setOutput(input);
    toast('Panels swapped', { icon: '⇅' });
  };

  const pasteFromClipboard = () => {
    navigator.clipboard.readText().then(
      (text) => {
        setInput(sanitizeInput(text));
        toast.success('Pasted from clipboard');
      },
      () => toast.error('Clipboard access denied')
    );
  };

  const loadSample = () => {
    if (mode === 'encode') {
      setInput(SAMPLE_PLAIN);
      toast.success('Sample loaded');
    } else {
      setInput(SAMPLE_B64);
      toast.success('Sample loaded');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setDetected(null);
    setSecurityResult(null);
    setImagePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setFileMeta(null);
    setHistory([]);
    try {
      sessionStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
    toast('Cleared all', { icon: '🗑️' });
  };

  const shareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('data', encodeURIComponent(input.slice(0, 2000)));
    url.searchParams.set('mode', mode);
    url.searchParams.set('variant', variant);
    navigator.clipboard.writeText(url.toString()).then(
      () => toast.success('Share link copied'),
      () => toast.error('Copy failed')
    );
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Download started');
  };

  const handleFile = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File too large (max 50MB)');
      return;
    }
    setFileMeta({ name: file.name, size: file.size, mime: file.type || 'application/octet-stream' });
    const useWorker = file.size > 5 * 1024 * 1024;
    if (useWorker) {
      setFileProgress(0);
      const worker = new Worker('/workers/base64-file.js');
      workerRef.current = worker;
      worker.onmessage = (ev: MessageEvent) => {
        if (ev.data.type === 'progress') {
          setFileProgress(ev.data.percent);
        } else if (ev.data.type === 'complete') {
          setInput('');
          setOutput(ev.data.base64);
          setDetected(detectContentType(ev.data.base64, null));
          setImagePreviewUrl(null);
          setOperationsCount((c) => c + 1);
          setFileProgress(null);
          worker.terminate();
          workerRef.current = null;
          toast.success('File encoded');
        } else if (ev.data.type === 'error') {
          toast.error(ev.data.message || 'Encoding failed');
          setFileProgress(null);
          worker.terminate();
          workerRef.current = null;
        }
      };
      worker.onerror = () => {
        toast.error('Worker error');
        setFileProgress(null);
        workerRef.current = null;
      };
      worker.postMessage({ file, variant });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.replace(/^data:[^;]+;base64,/, '');
        setInput('');
        setOutput(base64);
        setDetected(detectContentType(base64, null));
        if (dataUrl.startsWith('data:image/')) {
          setImagePreviewUrl(dataUrl);
        } else {
          setImagePreviewUrl(null);
        }
        setOperationsCount((c) => c + 1);
      };
      reader.readAsDataURL(file);
    }
  };

  const allVariants: EncodingVariantRow[] = input.trim() ? getAllEncodingVariants(sanitizeInput(input)) : [];
  const usedChars = output.trim() ? getUsedBase64Chars(output) : { used: new Set<string>(), paddingCount: 0 };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb — outside container */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors">Home</Link>
          <span aria-hidden className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium" aria-current="page">Base64 Encoder</span>
        </nav>

        <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden">
          {/* Privacy badge */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Runs fully in browser
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              No data leaves your device
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Privacy-first
            </span>
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts"
            >
              <HelpCircle className="w-4 h-4" /> Shortcuts
            </button>
          </div>

          {/* Mode tabs */}
          <div className="px-6 pt-4">
            <nav className="flex flex-wrap gap-2" aria-label="Mode">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    mode === m
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {m === 'encode' && <ArrowUp className="w-4 h-4" />}
                  {m === 'decode' && <ArrowDown className="w-4 h-4" />}
                  {m === 'file' && <FileUp className="w-4 h-4" />}
                  {m === 'image' && <ImageIcon className="w-4 h-4" />}
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Stats bar */}
          <div className="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-gray-100">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              {operationsCount} ops
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              Input {formatBytes(inputBytes)}
            </span>
            {output && (
              <>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                  Ratio {sizeRatio}%
                </span>
                {detected && (
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {detected.badge}
                  </span>
                )}
              </>
            )}
            {lastProcessTime != null && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                {lastProcessTime.toFixed(1)} ms
              </span>
            )}
          </div>

          {/* Main workspace: up-down layout, symmetric input & output */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Input panel */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-sm font-semibold text-gray-800">
                  Input — {mode === 'encode' ? 'Plain text' : mode === 'file' ? 'File' : 'Base64'}
                </span>
                <div className="flex items-center gap-1.5">
                  {mode !== 'file' && (
                    <>
                      <button
                        type="button"
                        onClick={pasteFromClipboard}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        title="Paste from clipboard"
                      >
                        <ClipboardPaste className="w-3.5 h-3.5" /> Paste
                      </button>
                      <button type="button" onClick={loadSample} className="rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors">
                        Sample
                      </button>
                      <button type="button" onClick={() => setInput('')} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                        Clear
                      </button>
                      <button type="button" onClick={clearAll} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                        Clear all
                      </button>
                    </>
                  )}
                </div>
              </div>
              {mode === 'file' ? (
                <div
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center min-h-[220px] flex flex-col items-center justify-center bg-gray-50/50 hover:border-primary-200 hover:bg-primary-50/30 transition-colors cursor-pointer group"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-primary-300', 'bg-primary-50/50'); }}
                  onDragLeave={(e) => { e.currentTarget.classList.remove('border-primary-300', 'bg-primary-50/50'); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-primary-300', 'bg-primary-50/50');
                    const f = e.dataTransfer.files[0];
                    if (f) handleFile(f);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                      e.target.value = '';
                    }}
                  />
                  <div className="rounded-2xl bg-white p-4 shadow-sm mb-3 group-hover:scale-105 transition-transform">
                    <FileUp className="w-10 h-10 text-primary-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Drop a file or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">Max 50MB · Images, PDF, text, any file</p>
                  {fileProgress != null && (
                    <div className="w-full max-w-xs mt-4">
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 rounded-full transition-all duration-300 ease-out" style={{ width: `${fileProgress}%` }} />
                      </div>
                      <p className="text-xs font-medium text-primary-600 mt-1.5">{Math.round(fileProgress)}%</p>
                    </div>
                  )}
                  {fileMeta && fileProgress == null && (
                    <p className="text-xs text-gray-600 mt-2 font-medium">{fileMeta.name} · {formatBytes(fileMeta.size)}</p>
                  )}
                </div>
              ) : (
                <>
                  {mode === 'encode' && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {VARIANT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setVariant(opt.value)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            variant === opt.value
                              ? 'bg-primary-600 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? 'Paste or type text to encode to Base64…' : 'Paste Base64 string to decode…'}
                    rows={10}
                    className="w-full min-h-[260px] px-4 py-3.5 border border-gray-200 rounded-xl font-mono text-sm leading-relaxed resize-y max-h-[400px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow placeholder:text-gray-400"
                    style={{ tabSize: 2 }}
                    spellCheck={false}
                    aria-label="Input"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {input.length.toLocaleString()} chars · {formatBytes(inputBytes)}
                    {input.split('\n').length > 1 && ` · ${input.split('\n').length} lines`}
                  </p>
                </>
              )}
            </div>

            {/* Center actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-2">
              <button
                type="button"
                onClick={processInput}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 text-white px-5 py-3 font-semibold text-sm shadow-lg shadow-primary-200/50 hover:bg-primary-700 hover:shadow-primary-300/50 transition-all"
              >
                {mode === 'encode' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </button>
              <button
                type="button"
                onClick={swapPanels}
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                title="Swap input and output"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={copyOutput}
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                title="Copy output"
              >
                {copied === 'output' ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
              <span className="text-[10px] text-gray-400">⌘Enter</span>
            </div>

            {/* Output panel — symmetric to input */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-sm font-semibold text-gray-800">
                  Output — {mode === 'encode' ? 'Base64' : 'Decoded'}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button type="button" onClick={copyOutput} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                  <button type="button" onClick={downloadOutput} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button type="button" onClick={shareLink} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  {detected?.type === 'json' && output.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(output);
                          setOutput(JSON.stringify(parsed, null, 2));
                          toast.success('Formatted JSON');
                        } catch {
                          toast.error('Invalid JSON');
                        }
                      }}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      Format JSON
                    </button>
                  )}
                  {mode === 'encode' && output && (
                    <>
                      <button type="button" onClick={() => { setOutput(`data:text/plain;base64,${output}`); toast.success('Wrapped in Data URI'); }} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">Data URI</button>
                      <button type="button" onClick={() => { const blob = new Blob([`BASE64_VALUE="${output.replace(/"/g, '\\"')}"\n`], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'base64.env'; a.click(); URL.revokeObjectURL(a.href); toast.success('Exported .env'); }} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">.env</button>
                      <button type="button" onClick={() => { const blob = new Blob([`#!/bin/sh\ncurl -H "Authorization: Basic ${output}" "https://api.example.com/"\n`], { type: 'text/x-shellscript' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'request.sh'; a.click(); URL.revokeObjectURL(a.href); toast.success('Exported cURL'); }} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">cURL</button>
                    </>
                  )}
                  {output && (
                    <button
                      type="button"
                      onClick={() => {
                        const md = `# Base64 ${mode === 'encode' ? 'Encode' : 'Decode'} Report\n\n` + `- **Mode:** ${mode}\n` + (mode === 'encode' ? `- **Variant:** ${variant}\n` : '') + `- **Input size:** ${formatBytes(inputBytes)}\n` + `- **Output size:** ${formatBytes(outputBytes)}\n` + (detected ? `- **Detected:** ${detected.badge}\n` : '') + `\n## Input\n\`\`\`\n${input.slice(0, 2000)}${input.length > 2000 ? '\n...' : ''}\n\`\`\`\n\n## Output\n\`\`\`\n${output.slice(0, 2000)}${output.length > 2000 ? '\n...' : ''}\n\`\`\`\n`;
                        const blob = new Blob([md], { type: 'text/markdown' });
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = 'base64-report.md';
                        a.click();
                        URL.revokeObjectURL(a.href);
                        toast.success('Exported .md');
                      }}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      .md
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Your result will appear here after encode or decode."
                rows={10}
                className="w-full min-h-[260px] px-4 py-3.5 border border-gray-200 rounded-xl font-mono text-sm leading-relaxed resize-y max-h-[400px] bg-gray-50/80 text-gray-800 placeholder:text-gray-400"
                style={{ tabSize: 2 }}
                aria-label="Output"
              />
              <div className="text-xs text-gray-500 mt-2 flex flex-wrap items-center gap-3">
                <span>{formatBytes(outputBytes)} output</span>
                {output && input && (
                  <span className={sizeRatio > 100 ? 'text-amber-600' : 'text-emerald-600'}>
                    {sizeRatio > 100 ? '+' : ''}{sizeRatio - 100}% size
                  </span>
                )}
                {paddingCount > 0 && <span>{paddingCount} padding</span>}
                {validB64 !== null && (validB64 ? <span className="text-emerald-600 font-medium">Valid Base64 ✓</span> : <span className="text-red-600 font-medium">Invalid Base64</span>)}
              </div>
            </div>
          </div>

          {/* Detection badges */}
          {detected && (
            <div className="px-6 md:px-8 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    detected.badgeClass === 'badge-jwt' ? 'bg-violet-100 text-violet-800' :
                    detected.badgeClass === 'badge-png' || detected.badgeClass === 'badge-jpeg' ? 'bg-sky-100 text-sky-800' :
                    detected.badgeClass === 'badge-json' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {detected.badge}
                  {detected.meta && <span className="ml-1.5 opacity-90">· {detected.meta}</span>}
                </span>
                {detected.action?.href && (
                  <Link
                    href={detected.action.href}
                    className="inline-flex items-center rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    {detected.action.label}
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Security panel */}
          {securityResult && securityResult.findings.length > 0 && (
            <div className="px-6 md:px-8 pb-4">
              <div className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/80">
                <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Security scan — {securityResult.score}/10 risk
                </h3>
                <ul className="space-y-2 text-sm">
                  {securityResult.findings.map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 rounded-lg px-2 py-1 ${
                        f.level === 'CRITICAL' ? 'bg-red-50 text-red-800' : f.level === 'HIGH' ? 'bg-orange-50 text-orange-800' : 'text-amber-800'
                      }`}
                    >
                      <span className="font-semibold shrink-0">{f.level}:</span>
                      <span>{f.message}</span>
                      <span className="text-gray-500 truncate max-w-[140px]" title={f.snippet}>{f.snippet}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/json-formatter" className="inline-flex items-center mt-3 text-xs font-medium text-primary-600 hover:text-primary-700">
                  Mask sensitive fields →
                </Link>
              </div>
            </div>
          )}

          {/* Image preview */}
          {imagePreviewUrl && (
            <div className="px-6 md:px-8 pb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Image preview</h3>
              <div
                className="inline-block max-w-full rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
                style={{ maxHeight: 400, background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50% / 16px 16px' }}
              >
                <img
                  src={imagePreviewUrl}
                  alt="Decoded Base64 image preview"
                  className="max-w-full max-h-[400px] object-contain block"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={imagePreviewUrl}
                  download="decoded-image.png"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download image
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const dataUri = imagePreviewUrl.startsWith('data:') ? imagePreviewUrl : `data:image/png;base64,${output}`;
                    navigator.clipboard.writeText(dataUri).then(() => toast.success('Data URI copied'));
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Data URI
                </button>
              </div>
            </div>
          )}

          {/* All 8 variants panel */}
          <div className="px-6 md:px-8 pb-4 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => setVariantPanelOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
            >
              {variantPanelOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              All encoding variants
            </button>
            {variantPanelOpen && allVariants.length > 0 && (
              <div className="mt-3 space-y-2">
                {allVariants.map((row, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2 text-xs p-3 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-700 w-44 shrink-0">{row.name}</span>
                    <code className="flex-1 min-w-0 truncate text-gray-600" title={row.value}>{row.value.slice(0, 80)}{row.value.length > 80 ? '…' : ''}</code>
                    <span className="text-gray-500 shrink-0">{row.byteLength} B</span>
                    <button type="button" onClick={() => { navigator.clipboard.writeText(row.value); toast.success('Copied'); }} className="shrink-0 rounded-lg bg-white border border-gray-200 px-2 py-1 text-primary-600 hover:bg-primary-50 transition-colors">Copy</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Character map */}
          <div className="px-6 md:px-8 pb-4">
            <button
              type="button"
              onClick={() => setCharMapOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
            >
              {charMapOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              Character map
            </button>
            {charMapOpen && (
              <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 max-w-md">
                  {BASE64_CHARS.split('').map((c) => (
                    <div
                      key={c}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono border transition-colors ${
                        usedChars.used.has(c)
                          ? c === '='
                            ? 'bg-amber-100 border-amber-300 text-amber-800'
                            : 'bg-primary-100 border-primary-300 text-primary-800'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}
                      title={`${c} — ASCII ${c.charCodeAt(0)}`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Used {usedChars.used.size}/64 · Padding {usedChars.paddingCount}
                </p>
              </div>
            )}
          </div>

          {/* Session history */}
          <div className="px-6 md:px-8 pb-8">
            <button
              type="button"
              onClick={() => setHistoryOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
            >
              {historyOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              Recent operations {history.length > 0 && `(${history.length})`}
            </button>
            {historyOpen && history.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {history.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setInput(h.preview.replace(/…$/, '')); toast.success('Restored'); }}
                    className="block w-full text-left text-xs p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors"
                  >
                    <span className="font-medium text-gray-500">{h.type}</span> · {h.preview} · {formatBytes(h.bytes)} · {h.time}
                  </button>
                ))}
                <button type="button" onClick={() => { setHistory([]); sessionStorage.removeItem(HISTORY_KEY); setHistoryOpen(false); toast('History cleared'); }} className="text-xs text-red-600 hover:underline mt-2 font-medium">Clear history</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <p className="text-center">⌘Enter process · ⌘⇧C copy · ⌘⇧X swap · ⌘K clear</p>
          <Link href="/jwt-decoder" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">
            JWT Decoder
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/password-generator" className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:text-primary-700">
            Password Generator
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Shortcuts modal */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShortcutsOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Keyboard shortcuts</h3>
              <button type="button" onClick={() => setShortcutsOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + Enter</dt><dd>Process now</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + Shift + C</dt><dd>Copy output</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + Shift + X</dt><dd>Swap panels</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + Shift + V</dt><dd>Paste</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + K</dt><dd>Clear all</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + D</dt><dd>Download output</dd></div>
              <div className="flex justify-between gap-4"><dt>Cmd/Ctrl + 1–4</dt><dd>Encode / Decode / File / Image</dd></div>
              <div className="flex justify-between gap-4"><dt>Escape</dt><dd>Close modal</dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
