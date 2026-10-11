'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Copy, Check, Upload, ImageIcon, Trash2, FileImage,
  Download, ArrowLeftRight, Layers, Sliders,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ────────────────────────────────────────────────────────────────────

interface ImageInfo {
  name: string;
  type: string;
  originalSize: number;
  base64Size: number;
  dataUri: string;
  raw: string;
  width: number;
  height: number;
}

interface BatchFile {
  id: string;
  name: string;
  type: string;
  originalSize: number;
  dataUri: string;
  raw: string;
  thumbnailUrl: string;
}

interface DecodedImage {
  uri: string;
  type: string;
  base64Size: number;
  decodedSize: number;
}

type OutputFormat = 'datauri' | 'css' | 'html' | 'raw';
type Direction = 'encode' | 'decode';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function supportsCompression(type: string): boolean {
  return type === 'image/jpeg' || type === 'image/webp';
}

function getOutputValue(
  info: ImageInfo,
  format: OutputFormat,
  compressedUri: string | null,
): string {
  const uri = compressedUri ?? info.dataUri;
  const raw = compressedUri ? (compressedUri.split(',')[1] ?? '') : info.raw;
  switch (format) {
    case 'datauri': return uri;
    case 'css':     return `background-image: url("${uri}");`;
    case 'html':    return `<img src="${uri}" alt="${info.name.replace(/\.[^.]+$/, '')}" width="${info.width}" height="${info.height}">`;
    case 'raw':     return raw;
  }
}

function getBatchOutputValue(file: BatchFile, format: OutputFormat): string {
  switch (format) {
    case 'datauri': return file.dataUri;
    case 'css':     return `background-image: url("${file.dataUri}");`;
    case 'html':    return `<img src="${file.dataUri}" alt="${file.name.replace(/\.[^.]+$/, '')}">`;
    case 'raw':     return file.raw;
  }
}

function imageExtFromMime(mime: string): string {
  if (mime === 'image/svg+xml') return 'svg';
  if (mime === 'image/jpeg') return 'jpg';
  return mime.split('/')[1] || 'png';
}

// ── Copy Button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button
      onClick={handle}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition shadow-sm ${ok ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-700'}`}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

// ── Sample images (SVG data URIs for demo) ───────────────────────────────────

const SAMPLES = [
  {
    label: 'Blue Circle',
    type: 'image/svg+xml',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#3b82f6" opacity="0.9"/><circle cx="40" cy="40" r="22" fill="white" opacity="0.3"/></svg>`,
  },
  {
    label: 'Gradient Square',
    type: 'image/svg+xml',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#ec4899"/></linearGradient></defs><rect width="80" height="80" rx="16" fill="url(#g)"/></svg>`,
  },
  {
    label: 'Star Icon',
    type: 'image/svg+xml',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><polygon points="40,8 49,31 74,31 54,47 61,71 40,56 19,71 26,47 6,31 31,31" fill="#f59e0b"/></svg>`,
  },
];

const FORMAT_OPTIONS: { id: OutputFormat; label: string; desc: string }[] = [
  { id: 'datauri', label: 'Data URI',       desc: 'data:image/png;base64,…' },
  { id: 'css',     label: 'CSS Background', desc: 'background-image: url(…)' },
  { id: 'html',    label: 'HTML <img>',     desc: '<img src="…" alt="…">' },
  { id: 'raw',     label: 'Raw Base64',     desc: 'iVBORw0KGgo…' },
];

// ── Main Tool ─────────────────────────────────────────────────────────────────

function ImageToBase64Tool() {
  // ── Direction ─────────────────────────────────────────────────────────────
  const [direction, setDirection] = useState<Direction>('encode');

  // ── Encode (single) state ─────────────────────────────────────────────────
  const [imageInfo, setImageInfo]     = useState<ImageInfo | null>(null);
  const [format, setFormat]           = useState<OutputFormat>('datauri');
  const [isDragging, setIsDragging]   = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const fileInputRef                  = useRef<HTMLInputElement>(null);

  // ── Batch mode ────────────────────────────────────────────────────────────
  const [batchMode, setBatchMode]     = useState(false);
  const [batchFiles, setBatchFiles]   = useState<BatchFile[]>([]);
  const batchInputRef                 = useRef<HTMLInputElement>(null);

  // ── Compression ───────────────────────────────────────────────────────────
  const [quality, setQuality]               = useState(0.9);
  const [compressedUri, setCompressedUri]   = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  // ── Decode state ──────────────────────────────────────────────────────────
  const [decodeInput, setDecodeInput]   = useState('');
  const [decodedImage, setDecodedImage] = useState<DecodedImage | null>(null);
  const [decodeError, setDecodeError]   = useState<string | null>(null);
  const decodeTimerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Compression effect ────────────────────────────────────────────────────

  useEffect(() => {
    if (!imageInfo || !supportsCompression(imageInfo.type) || quality >= 1.0) {
      setCompressedUri(null);
      setCompressedSize(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas  = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx     = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const mimeOut   = imageInfo.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const reencoded = canvas.toDataURL(mimeOut, quality);
      const raw       = reencoded.split(',')[1] ?? '';
      setCompressedUri(reencoded);
      setCompressedSize(Math.ceil(raw.length * 3 / 4));
    };
    img.src = imageInfo.dataUri;
  }, [quality, imageInfo]);

  // ── Decode logic ──────────────────────────────────────────────────────────

  const decodeBase64 = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) { setDecodedImage(null); setDecodeError(null); return; }

    let uri  = trimmed;
    let type = 'image/png';

    if (trimmed.startsWith('data:')) {
      const match = trimmed.match(/^data:(image\/[^;]+);base64,/);
      if (!match) {
        setDecodeError('Invalid data URI — expected: data:image/TYPE;base64,…');
        setDecodedImage(null);
        return;
      }
      type = match[1];
      uri  = trimmed;
    } else {
      // Raw base64 — detect type from magic bytes
      try {
        const clean  = trimmed.replace(/\s/g, '');
        const binary = atob(clean.slice(0, 16));
        const bytes  = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        if      (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) type = 'image/png';
        else if (bytes[0] === 0xFF && bytes[1] === 0xD8)                                            type = 'image/jpeg';
        else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46)                      type = 'image/gif';
        else if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) type = 'image/webp';

        uri = `data:${type};base64,${clean}`;
      } catch {
        setDecodeError('Invalid base64 string. Please paste a valid base64-encoded image.');
        setDecodedImage(null);
        return;
      }
    }

    const img = new Image();
    img.onload = () => {
      const raw         = uri.split(',')[1] ?? '';
      const base64Size  = raw.length;
      const decodedSize = Math.ceil(base64Size * 3 / 4);
      setDecodedImage({ uri, type, base64Size, decodedSize });
      setDecodeError(null);
    };
    img.onerror = () => {
      setDecodeError('Could not decode as an image. Please check the input.');
      setDecodedImage(null);
    };
    img.src = uri;
  }, []);

  const handleDecodeInputChange = useCallback((val: string) => {
    setDecodeInput(val);
    if (decodeTimerRef.current) clearTimeout(decodeTimerRef.current);
    decodeTimerRef.current = setTimeout(() => decodeBase64(val), 300);
  }, [decodeBase64]);

  // ── Process single file ───────────────────────────────────────────────────

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.svg')) {
      setError('Please upload an image file (PNG, JPG, SVG, GIF, WebP, etc.)');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const raw     = dataUri.split(',')[1] ?? '';
      const img     = new Image();
      img.onload = () => {
        setImageInfo({
          name: file.name,
          type: file.type || 'image/svg+xml',
          originalSize: file.size,
          base64Size: raw.length,
          dataUri,
          raw,
          width:  img.width  || 0,
          height: img.height || 0,
        });
        setQuality(0.9);
        setCompressedUri(null);
        setCompressedSize(null);
      };
      img.onerror = () => {
        setImageInfo({
          name: file.name,
          type: file.type || 'image/svg+xml',
          originalSize: file.size,
          base64Size: raw.length,
          dataUri,
          raw,
          width: 0,
          height: 0,
        });
      };
      img.src = dataUri;
    };
    reader.readAsDataURL(file);
  }, []);

  // ── Batch file processing ─────────────────────────────────────────────────

  const processBatchFiles = useCallback((files: FileList | File[]) => {
    const fileArr = Array.from(files).filter(
      (f) => f.type.startsWith('image/') || f.name.endsWith('.svg'),
    );
    if (fileArr.length === 0) { setError('No valid image files found.'); return; }
    setError(null);

    Promise.all(
      fileArr.map(
        (file) =>
          new Promise<BatchFile>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUri = e.target?.result as string;
              const raw     = dataUri.split(',')[1] ?? '';
              resolve({
                id: Math.random().toString(36).slice(2),
                name: file.name,
                type: file.type || 'image/svg+xml',
                originalSize: file.size,
                dataUri,
                raw,
                thumbnailUrl: dataUri,
              });
            };
            reader.readAsDataURL(file);
          }),
      ),
    ).then((newFiles) => {
      setBatchFiles((prev) => {
        const remaining = 20 - prev.length;
        if (remaining <= 0) {
          setError('Maximum 20 files reached. Clear some to add more.');
          return prev;
        }
        const toAdd = newFiles.slice(0, remaining);
        if (newFiles.length > remaining) {
          setError(`Only added ${remaining} file${remaining !== 1 ? 's' : ''}. Maximum 20 files limit.`);
        }
        return [...prev, ...toAdd];
      });
    });
  }, []);

  // ── Sample / drag / file-change handlers ─────────────────────────────────

  const loadSampleSvg = useCallback(
    (sample: (typeof SAMPLES)[0]) => {
      const blob = new Blob([sample.svg], { type: sample.type });
      const file = new File(
        [blob],
        `${sample.label.toLowerCase().replace(/ /g, '-')}.svg`,
        { type: sample.type },
      );
      if (batchMode) {
        processBatchFiles([file]);
      } else {
        processFile(file);
      }
    },
    [processFile, processBatchFiles, batchMode],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (batchMode) {
        processBatchFiles(e.dataTransfer.files);
      } else {
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
      }
    },
    [processFile, processBatchFiles, batchMode],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (batchMode) {
        if (e.target.files) processBatchFiles(e.target.files);
      } else {
        const file = e.target.files?.[0];
        if (file) processFile(file);
      }
    },
    [processFile, processBatchFiles, batchMode],
  );

  const clear = useCallback(() => {
    setImageInfo(null);
    setError(null);
    setCompressedUri(null);
    setCompressedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  // ── Derived values ────────────────────────────────────────────────────────

  const activeUri   = compressedUri ?? imageInfo?.dataUri ?? '';
  const outputValue = imageInfo ? getOutputValue(imageInfo, format, compressedUri) : '';

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Top bar: direction toggle + batch toggle ──────────────────── */}
      <div className="flex flex-wrap items-center gap-3 bg-zinc-50 px-4 py-2.5 sm:px-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Mode:</span>
        <div className="flex rounded-lg border border-zinc-200 bg-white overflow-hidden text-[12px] font-semibold shadow-sm">
          <button
            onClick={() => setDirection('encode')}
            className={`px-4 py-1.5 transition ${direction === 'encode' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
          >
            Image → Base64
          </button>
          <button
            onClick={() => setDirection('decode')}
            className={`px-4 py-1.5 transition border-l border-zinc-200 ${direction === 'decode' ? 'bg-violet-600 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
          >
            Base64 → Image
          </button>
        </div>

        {direction === 'encode' && (
          <>
            <div className="w-px h-4 bg-zinc-200 mx-1" />
            <button
              onClick={() => { setBatchMode((m) => !m); setBatchFiles([]); setError(null); }}
              className="flex items-center gap-2 select-none"
            >
              <div className={`relative w-8 h-4 rounded-full transition ${batchMode ? 'bg-violet-500' : 'bg-zinc-300'}`}>
                <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${batchMode ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-[11px] font-semibold text-zinc-500">Batch mode</span>
            </button>
          </>
        )}
      </div>

      {/* ── Sample images strip (encode only) ────────────────────────── */}
      {direction === 'encode' && (
        <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-2.5 sm:px-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Try samples:</span>
          {SAMPLES.map((s) => (
            <button
              key={s.label}
              onClick={() => loadSampleSvg(s)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          DECODE mode
      ════════════════════════════════════════════════════════════════ */}
      {direction === 'decode' && (
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

          {/* Left — paste area */}
          <div className="p-5 flex flex-col gap-4">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-zinc-400">
              Paste Base64 or Data URI
            </label>
            <textarea
              value={decodeInput}
              onChange={(e) => handleDecodeInputChange(e.target.value)}
              placeholder="Paste a data URI (data:image/png;base64,…) or raw base64 string here — auto-decodes on paste"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-[11px] font-mono text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none leading-relaxed"
              rows={10}
            />
            <button
              onClick={() => decodeBase64(decodeInput)}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-violet-700 transition shadow-sm w-fit"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Decode
            </button>
            {decodeError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{decodeError}</div>
            )}
          </div>

          {/* Right — decoded preview */}
          <div className="p-5 flex flex-col gap-4">
            {decodedImage ? (
              <>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 flex items-center justify-center p-6 min-h-[200px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={decodedImage.uri}
                    alt="Decoded image"
                    className="max-h-48 max-w-full rounded-xl object-contain shadow-md"
                  />
                </div>

                {/* Metadata */}
                <div className="rounded-xl border border-zinc-100 bg-white divide-y divide-zinc-100">
                  {(
                    [
                      ['Detected type',         decodedImage.type],
                      ['Base64 string size',     formatBytes(decodedImage.base64Size)],
                      ['Estimated decoded size', formatBytes(decodedImage.decodedSize)],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-[11px] font-medium text-zinc-400">{k}</span>
                      <span className="text-[12px] font-semibold text-zinc-700 truncate max-w-[60%] text-right">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Download */}
                <a
                  href={decodedImage.uri}
                  download={`decoded-image.${imageExtFromMime(decodedImage.type)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-emerald-700 transition shadow-sm w-fit"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download image
                </a>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 min-h-[360px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-zinc-600">No decoded image yet</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Paste a Base64 string or Data URI on the left to preview the decoded image
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          ENCODE — single file mode
      ════════════════════════════════════════════════════════════════ */}
      {direction === 'encode' && !batchMode && (
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

          {/* Left — Upload */}
          <div className="p-5 flex flex-col gap-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all min-h-[200px] ${
                isDragging ? 'border-blue-400 bg-blue-50' : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              <input ref={fileInputRef} type="file" accept="image/*,.svg" onChange={handleFileChange} className="sr-only" />
              {imageInfo ? (
                <div className="flex flex-col items-center gap-2 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeUri || imageInfo.dataUri}
                    alt={imageInfo.name}
                    className="max-h-32 max-w-full rounded-xl object-contain shadow-md"
                  />
                  <p className="text-sm font-semibold text-zinc-700 truncate max-w-full">{imageInfo.name}</p>
                  <p className="text-xs text-zinc-400">{imageInfo.type}</p>
                </div>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-zinc-400">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-700">Drop your image here</p>
                    <p className="text-xs text-zinc-400 mt-0.5">or click to browse — PNG, JPG, SVG, GIF, WebP</p>
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            {/* ── Compression slider — JPEG / WebP only ────────────────── */}
            {imageInfo && supportsCompression(imageInfo.type) && (
              <div className="rounded-xl border border-zinc-200 bg-white p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">Compression quality</span>
                  <span className="ml-auto text-[12px] font-bold text-blue-600">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>10% (smaller)</span>
                  <span>100% (original)</span>
                </div>
                {compressedUri && compressedSize !== null && (
                  <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-[11px] text-blue-700 font-medium">
                    Original: {formatBytes(imageInfo.originalSize)} → Compressed: {formatBytes(compressedSize)}{' '}
                    <span className="font-bold text-emerald-600">
                      ({Math.round((1 - compressedSize / imageInfo.originalSize) * 100)}% smaller)
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* PNG note */}
            {imageInfo && imageInfo.type === 'image/png' && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-[11px] text-zinc-500">
                PNG is lossless — compression slider not applicable.
              </div>
            )}

            {/* File stats */}
            {imageInfo && (
              <div className="rounded-xl border border-zinc-100 bg-white divide-y divide-zinc-100">
                {(
                  [
                    ['File name',     imageInfo.name],
                    ['Type',          imageInfo.type],
                    ['Dimensions',    imageInfo.width > 0 ? `${imageInfo.width} × ${imageInfo.height}px` : 'Unknown'],
                    ['Original size', formatBytes(imageInfo.originalSize)],
                    ['Base64 size',   formatBytes(Math.ceil(imageInfo.base64Size * 3 / 4))],
                    ['Size overhead', `+${Math.round(imageInfo.base64Size / imageInfo.originalSize * 75 - 75)}% vs original`],
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[11px] font-medium text-zinc-400">{k}</span>
                    <span className="text-[12px] font-semibold text-zinc-700 truncate max-w-[60%] text-right">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {imageInfo && (
              <button
                onClick={clear}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2 text-[12px] font-semibold text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Image
              </button>
            )}
          </div>

          {/* Right — Output */}
          <div className="flex flex-col p-5 gap-4">
            {imageInfo ? (
              <>
                {/* Format picker */}
                <div className="grid grid-cols-2 gap-2">
                  {FORMAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormat(opt.id)}
                      className={`rounded-xl border p-3 text-left transition ${
                        format === opt.id
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <p className={`text-[12px] font-bold ${format === opt.id ? 'text-blue-700' : 'text-zinc-700'}`}>{opt.label}</p>
                      <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Output area */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                      {FORMAT_OPTIONS.find((o) => o.id === format)?.label} Output
                    </span>
                    <span className="text-[11px] text-zinc-400 tabular-nums">
                      {outputValue.length.toLocaleString()} chars
                    </span>
                  </div>

                  <div
                    className="flex-1 rounded-xl bg-zinc-950 p-4 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-auto break-all"
                    style={{ minHeight: '140px', maxHeight: '240px' }}
                  >
                    {outputValue.length > 500
                      ? outputValue.slice(0, 200) + '…[' + (outputValue.length - 200).toLocaleString() + ' more chars]…' + outputValue.slice(-50)
                      : outputValue}
                  </div>

                  <CopyBtn text={outputValue} label={`Copy ${FORMAT_OPTIONS.find((o) => o.id === format)?.label}`} />
                </div>

                {/* Usage tip */}
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <p className="text-[11px] font-bold text-amber-700 mb-0.5">Usage tip</p>
                  {format === 'datauri' && (
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Paste as the value of{' '}
                      <code className="font-mono bg-amber-100 px-1 rounded">src</code>,{' '}
                      <code className="font-mono bg-amber-100 px-1 rounded">href</code>, or{' '}
                      <code className="font-mono bg-amber-100 px-1 rounded">url()</code> in CSS.
                    </p>
                  )}
                  {format === 'css' && (
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Paste directly into a CSS class. Works in any stylesheet or{' '}
                      <code className="font-mono bg-amber-100 px-1 rounded">&lt;style&gt;</code> block.
                    </p>
                  )}
                  {format === 'html' && (
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Drop directly into any HTML file. No external image file needed.
                    </p>
                  )}
                  {format === 'raw' && (
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Raw Base64 without the data URI prefix. Use with APIs that expect the encoded string only (e.g. OpenAI Vision, Claude).
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 min-h-[360px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                  <FileImage className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-zinc-600">No image loaded</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Upload an image on the left to see the Base64 output — Data URI, CSS, HTML, and raw formats
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          ENCODE — batch mode
      ════════════════════════════════════════════════════════════════ */}
      {direction === 'encode' && batchMode && (
        <div className="p-5 flex flex-col gap-4">
          {/* Batch drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => batchInputRef.current?.click()}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all min-h-[140px] ${
              isDragging ? 'border-violet-400 bg-violet-50' : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100'
            }`}
          >
            <input ref={batchInputRef} type="file" accept="image/*,.svg" multiple onChange={handleFileChange} className="sr-only" />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-zinc-400">
              <Layers className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-700">Drop multiple images here</p>
              <p className="text-xs text-zinc-400 mt-0.5">or click to browse — up to 20 files at once</p>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {batchFiles.length > 0 && (
            <>
              {/* Format selector */}
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormat(opt.id)}
                    className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                      format === opt.id
                        ? 'border-blue-300 bg-blue-50 text-blue-700'
                        : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Batch controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-zinc-500">
                  {batchFiles.length} file{batchFiles.length !== 1 ? 's' : ''} / 20
                </span>
                <div className="ml-auto flex gap-2 flex-wrap">
                  <CopyBtn
                    text={batchFiles.map((f) => getBatchOutputValue(f, format)).join('\n')}
                    label="Copy all"
                  />
                  <button
                    onClick={() => {
                      const data = batchFiles.map((f) => ({
                        name:   f.name,
                        type:   f.type,
                        size:   f.originalSize,
                        base64: f.raw,
                      }));
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url  = URL.createObjectURL(blob);
                      const a    = document.createElement('a');
                      a.href     = url;
                      a.download = 'images-base64.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" /> Download as JSON
                  </button>
                  <button
                    onClick={() => { setBatchFiles([]); setError(null); }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear all
                  </button>
                </div>
              </div>

              {/* File list */}
              <div className="flex flex-col gap-2">
                {batchFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-3">
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="h-8 w-8 rounded object-cover flex-shrink-0 border border-zinc-100"
                    />
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-zinc-700 truncate">{file.name}</p>
                      <p className="text-[10px] text-zinc-400">{file.type} · {formatBytes(file.originalSize)}</p>
                    </div>
                    {/* Per-file copy */}
                    <CopyBtn text={getBatchOutputValue(file, format)} label="Copy" />
                    {/* Remove */}
                    <button
                      onClick={() => setBatchFiles((prev) => prev.filter((f) => f.id !== file.id))}
                      className="p-1.5 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {batchFiles.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                <Layers className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-zinc-600">No files yet</p>
              <p className="text-xs text-zinc-400 max-w-xs">
                Drop or click above to add up to 20 images at once
              </p>
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
  { label: 'Encoding Tools', href: '/' },
  { label: 'Image to Base64' },
];

export default function ImageToBase64Client() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="Image to Base64 Converter"
      subtitle="Convert PNG, JPG, SVG, GIF and WebP to Base64 data URIs — CSS, HTML, and raw formats"
      toolName="image_to_base64"
      icon="🖼️"
      features={['PNG · JPG · SVG · GIF', 'CSS & HTML output', 'AI API format', 'Browser-only']}
      tool={<ImageToBase64Tool />}
    />
  );
}
