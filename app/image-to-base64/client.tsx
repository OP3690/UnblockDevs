'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, Upload, ImageIcon, Trash2, FileImage } from 'lucide-react';
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

type OutputFormat = 'datauri' | 'css' | 'html' | 'raw';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getOutputValue(info: ImageInfo, format: OutputFormat): string {
  switch (format) {
    case 'datauri': return info.dataUri;
    case 'css': return `background-image: url("${info.dataUri}");`;
    case 'html': return `<img src="${info.dataUri}" alt="${info.name.replace(/\.[^.]+$/, '')}" width="${info.width}" height="${info.height}">`;
    case 'raw': return info.raw;
  }
}

// ── Copy Button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={handle}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition shadow-sm ${ok ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-700'}`}>
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

// ── Main Tool ─────────────────────────────────────────────────────────────────

function ImageToBase64Tool() {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [format, setFormat] = useState<OutputFormat>('datauri');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.svg')) {
      setError('Please upload an image file (PNG, JPG, SVG, GIF, WebP, etc.)');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const raw = dataUri.split(',')[1] ?? '';
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageInfo({
          name: file.name,
          type: file.type || 'image/svg+xml',
          originalSize: file.size,
          base64Size: raw.length,
          dataUri,
          raw,
          width: img.width || 0,
          height: img.height || 0,
        });
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

  const loadSampleSvg = useCallback((sample: typeof SAMPLES[0]) => {
    const blob = new Blob([sample.svg], { type: sample.type });
    const file = new File([blob], `${sample.label.toLowerCase().replace(/ /g, '-')}.svg`, { type: sample.type });
    processFile(file);
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const clear = useCallback(() => {
    setImageInfo(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const FORMAT_OPTIONS: { id: OutputFormat; label: string; desc: string; color: string }[] = [
    { id: 'datauri', label: 'Data URI', desc: 'data:image/png;base64,…', color: 'blue' },
    { id: 'css', label: 'CSS Background', desc: 'background-image: url(…)', color: 'violet' },
    { id: 'html', label: 'HTML <img>', desc: '<img src="…" alt="…">', color: 'emerald' },
    { id: 'raw', label: 'Raw Base64', desc: 'iVBORw0KGgo…', color: 'amber' },
  ];

  const outputValue = imageInfo ? getOutputValue(imageInfo, format) : '';
  const sizeIncrease = imageInfo ? Math.round((imageInfo.base64Size / (imageInfo.originalSize * (4 / 3)) - 1) * 100) : 0;

  return (
    <div className="divide-y divide-zinc-100">
      {/* Sample images */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-2.5 sm:px-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Try samples:</span>
        {SAMPLES.map(s => (
          <button key={s.label} onClick={() => loadSampleSvg(s)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm">
            {s.label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

        {/* Left — Upload */}
        <div className="p-5 flex flex-col gap-4">
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-all min-h-[200px] ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100'}`}
          >
            <input ref={fileInputRef} type="file" accept="image/*,.svg" onChange={handleFileChange} className="sr-only" />
            {imageInfo ? (
              <div className="flex flex-col items-center gap-2 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imgRef} src={imageInfo.dataUri} alt={imageInfo.name}
                  className="max-h-32 max-w-full rounded-xl object-contain shadow-md" />
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

          {/* File stats */}
          {imageInfo && (
            <div className="rounded-xl border border-zinc-100 bg-white divide-y divide-zinc-100">
              {[
                ['File name', imageInfo.name],
                ['Type', imageInfo.type],
                ['Dimensions', imageInfo.width > 0 ? `${imageInfo.width} × ${imageInfo.height}px` : 'Unknown'],
                ['Original size', formatBytes(imageInfo.originalSize)],
                ['Base64 size', formatBytes(Math.ceil(imageInfo.base64Size * 3 / 4))],
                ['Size overhead', `+${Math.round(imageInfo.base64Size / imageInfo.originalSize * 75 - 75)}% vs original`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[11px] font-medium text-zinc-400">{k}</span>
                  <span className="text-[12px] font-semibold text-zinc-700 truncate max-w-[60%] text-right">{v}</span>
                </div>
              ))}
            </div>
          )}

          {imageInfo && (
            <button onClick={clear}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-4 py-2 text-[12px] font-semibold text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition">
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
                {FORMAT_OPTIONS.map(opt => (
                  <button key={opt.id} onClick={() => setFormat(opt.id)}
                    className={`rounded-xl border p-3 text-left transition ${format === opt.id ? 'border-blue-300 bg-blue-50' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'}`}>
                    <p className={`text-[12px] font-bold ${format === opt.id ? 'text-blue-700' : 'text-zinc-700'}`}>{opt.label}</p>
                    <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>

              {/* Output area */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                    {FORMAT_OPTIONS.find(o => o.id === format)?.label} Output
                  </span>
                  <span className="text-[11px] text-zinc-400 tabular-nums">
                    {outputValue.length.toLocaleString()} chars
                  </span>
                </div>

                <div className="flex-1 rounded-xl bg-zinc-950 p-4 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-auto break-all"
                  style={{ minHeight: '140px', maxHeight: '240px' }}>
                  {outputValue.length > 500
                    ? outputValue.slice(0, 200) + '…[' + (outputValue.length - 200).toLocaleString() + ' more chars]…' + outputValue.slice(-50)
                    : outputValue
                  }
                </div>

                <CopyBtn text={outputValue} label={`Copy ${FORMAT_OPTIONS.find(o => o.id === format)?.label}`} />
              </div>

              {/* Usage tip */}
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                <p className="text-[11px] font-bold text-amber-700 mb-0.5">Usage tip</p>
                {format === 'datauri' && <p className="text-[11px] text-amber-700 leading-relaxed">Paste as the value of <code className="font-mono bg-amber-100 px-1 rounded">src</code>, <code className="font-mono bg-amber-100 px-1 rounded">href</code>, or <code className="font-mono bg-amber-100 px-1 rounded">url()</code> in CSS.</p>}
                {format === 'css' && <p className="text-[11px] text-amber-700 leading-relaxed">Paste directly into a CSS class. Works in any stylesheet or <code className="font-mono bg-amber-100 px-1 rounded">&lt;style&gt;</code> block.</p>}
                {format === 'html' && <p className="text-[11px] text-amber-700 leading-relaxed">Drop directly into any HTML file. No external image file needed.</p>}
                {format === 'raw' && <p className="text-[11px] text-amber-700 leading-relaxed">Raw Base64 without the data URI prefix. Use with APIs that expect the encoded string only (e.g. OpenAI Vision, Claude).</p>}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 min-h-[360px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                <FileImage className="h-8 w-8" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-600">No image loaded</p>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">Upload an image on the left to see the Base64 output — Data URI, CSS, HTML, and raw formats</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
