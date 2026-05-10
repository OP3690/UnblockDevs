'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Upload, Download, Copy, Check, X, ChevronDown, ChevronUp,
  Loader2, CheckCircle2, AlertCircle, Scan, ZoomIn, ZoomOut,
  FileText, Settings2, Eye, EyeOff, Languages, BarChart2,
  RefreshCw, Layers, AlignLeft, Table2, Image as ImageIcon,
  Maximize2,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface BBox { x0: number; y0: number; x1: number; y1: number; }

interface OcrWord {
  text: string;
  confidence: number;
  bbox: BBox;
}

interface OcrLine {
  text: string;
  confidence: number;
  bbox: BBox;
  words: OcrWord[];
}

interface OcrParagraph {
  text: string;
  confidence: number;
  bbox: BBox;
  lines: OcrLine[];
}

interface OcrResult {
  id: string;
  fileName: string;
  fileSize: number;
  imageUrl: string;
  naturalWidth: number;
  naturalHeight: number;
  text: string;
  hocr?: string;
  paragraphs: OcrParagraph[];
  words: OcrWord[];
  confidence: number;
  wordCount: number;
  charCount: number;
  processingMs: number;
  language: string;
  psmLabel: string;
  hasTable: boolean;
  tableData?: string[][];
  preprocessApplied: string[];
}

interface Options {
  language: string;
  psm: string;
  oem: number;
  preprocess: {
    grayscale: boolean;
    contrast: boolean;    // enhance contrast
    sharpen: boolean;     // unsharp mask
    upscale: boolean;     // 2× upscale for small images
    threshold: boolean;   // binarize
    denoise: boolean;     // median blur
  };
  outputMode: 'plain' | 'structured' | 'confidence' | 'table';
  confidenceFilter: number; // hide words below this %
  showBboxOverlay: boolean;
}

// ── Language / PSM maps ───────────────────────────────────────────────────────

const LANGUAGES: { code: string; label: string }[] = [
  { code: 'eng', label: 'English' },
  { code: 'fra', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'spa', label: 'Spanish' },
  { code: 'por', label: 'Portuguese' },
  { code: 'ita', label: 'Italian' },
  { code: 'nld', label: 'Dutch' },
  { code: 'pol', label: 'Polish' },
  { code: 'rus', label: 'Russian' },
  { code: 'ara', label: 'Arabic' },
  { code: 'hin', label: 'Hindi' },
  { code: 'chi_sim', label: 'Chinese (Simplified)' },
  { code: 'chi_tra', label: 'Chinese (Traditional)' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'kor', label: 'Korean' },
  { code: 'vie', label: 'Vietnamese' },
  { code: 'tur', label: 'Turkish' },
  { code: 'ukr', label: 'Ukrainian' },
];

const PSM_MODES: { value: string; label: string; desc: string }[] = [
  { value: '3',  label: 'Auto',            desc: 'Best for mixed content (default)' },
  { value: '6',  label: 'Single block',    desc: 'One uniform block of text' },
  { value: '4',  label: 'Single column',   desc: 'Newspaper / magazine column' },
  { value: '11', label: 'Sparse text',     desc: 'Text scattered across image' },
  { value: '7',  label: 'Single line',     desc: 'One line only' },
  { value: '8',  label: 'Single word',     desc: 'One word only' },
  { value: '13', label: 'Raw line',        desc: 'Raw single line, no classification' },
];

// ── Image pre-processing (canvas) ────────────────────────────────────────────

function applyPreprocessing(
  img: HTMLImageElement,
  opts: Options['preprocess'],
): { canvas: HTMLCanvasElement; applied: string[] } {
  const applied: string[] = [];

  let scale = 1;
  if (opts.upscale && (img.naturalWidth < 1200 || img.naturalHeight < 900)) {
    scale = 2;
    applied.push('2× upscale');
  }

  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // White background (important for transparent PNGs)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  // Apply CSS filter chain via offscreen approach
  const filters: string[] = [];
  if (opts.grayscale) { filters.push('grayscale(1)'); applied.push('Grayscale'); }
  if (opts.contrast)  { filters.push('contrast(1.4) brightness(1.05)'); applied.push('Contrast+'); }
  if (opts.sharpen)   { applied.push('Sharpen'); } // handled via convolution below

  if (filters.length) {
    // Re-draw with CSS filter using a temp canvas
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const tmpCtx = tmp.getContext('2d')!;
    tmpCtx.filter = filters.join(' ');
    tmpCtx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(tmp, 0, 0);
  }

  // Sharpen via unsharp mask convolution
  if (opts.sharpen) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const sharpened = unsharpenMask(imageData, 1.5);
    ctx.putImageData(sharpened, 0, 0);
  }

  // Threshold (binarize)
  if (opts.threshold) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const binarized = otsuThreshold(imageData);
    ctx.putImageData(binarized, 0, 0);
    applied.push('Binarize');
  }

  return { canvas, applied };
}

function unsharpenMask(imageData: ImageData, amount: number): ImageData {
  const { data, width, height } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  // Simple 3×3 sharpening kernel: [0,-1,0,-1,5,-1,0,-1,0]
  const kernel = [0, -amount, 0, -amount, 1 + 4 * amount, -amount, 0, -amount, 0];
  const side = 3, half = 1;
  for (let y = half; y < height - half; y++) {
    for (let x = half; x < width - half; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const ki = (ky + half) * side + (kx + half);
          const pi = ((y + ky) * width + (x + kx)) * 4;
          r += data[pi]     * kernel[ki];
          g += data[pi + 1] * kernel[ki];
          b += data[pi + 2] * kernel[ki];
        }
      }
      const i = (y * width + x) * 4;
      result.data[i]     = Math.max(0, Math.min(255, r));
      result.data[i + 1] = Math.max(0, Math.min(255, g));
      result.data[i + 2] = Math.max(0, Math.min(255, b));
    }
  }
  return result;
}

// Otsu's method: find optimal binarization threshold
function otsuThreshold(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  // Build histogram of gray values
  const hist = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    hist[gray]++;
  }
  const total = width * height;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  let sumB = 0, wB = 0, wF = 0;
  let maxVar = 0, threshold = 128;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const varBetween = wB * wF * (mB - mF) ** 2;
    if (varBetween > maxVar) { maxVar = varBetween; threshold = t; }
  }
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  for (let i = 0; i < result.data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    const v = gray > threshold ? 255 : 0;
    result.data[i] = result.data[i + 1] = result.data[i + 2] = v;
    result.data[i + 3] = 255;
  }
  return result;
}

// ── Table detection from OCR words ───────────────────────────────────────────

function detectTableFromWords(words: OcrWord[], imgHeight: number): string[][] | null {
  if (words.length < 6) return null;

  // Cluster words into rows by Y coordinate
  const ROW_TOL = imgHeight * 0.012;
  const rowGroups: OcrWord[][] = [];
  for (const w of [...words].sort((a, b) => a.bbox.y0 - b.bbox.y0)) {
    const existing = rowGroups.find(g => Math.abs(g[0].bbox.y0 - w.bbox.y0) <= ROW_TOL);
    if (existing) existing.push(w);
    else rowGroups.push([w]);
  }
  rowGroups.forEach(g => g.sort((a, b) => a.bbox.x0 - b.bbox.x0));

  if (rowGroups.length < 2) return null;

  // Collect all unique X starts → column positions
  const allX = rowGroups.flatMap(g => g.map(w => w.bbox.x0));
  const COL_TOL = 15;
  const colStarts: number[] = [];
  for (const x of allX.sort((a, b) => a - b)) {
    if (!colStarts.some(c => Math.abs(c - x) <= COL_TOL)) colStarts.push(x);
  }

  // Need ≥2 columns appearing in ≥50% of rows
  const threshold = rowGroups.length * 0.4;
  const validCols = colStarts.filter(c =>
    rowGroups.filter(row => row.some(w => Math.abs(w.bbox.x0 - c) <= COL_TOL)).length >= threshold
  );

  if (validCols.length < 2) return null;

  // Build table grid
  const table: string[][] = rowGroups.map(row => {
    const cells: string[] = Array(validCols.length).fill('');
    for (const w of row) {
      let bestI = 0, bestDist = Infinity;
      for (let i = 0; i < validCols.length; i++) {
        const d = Math.abs(w.bbox.x0 - validCols[i]);
        if (d < bestDist) { bestDist = d; bestI = i; }
      }
      if (bestDist <= COL_TOL * 2) {
        cells[bestI] = cells[bestI] ? `${cells[bestI]} ${w.text}` : w.text;
      }
    }
    return cells;
  });

  return table;
}

// ── Tesseract worker pool ─────────────────────────────────────────────────────

let globalWorker: any = null;
let globalWorkerLang = '';
let workerInitializing = false;
let workerInitQueue: Array<(w: any) => void> = [];

async function getWorker(
  lang: string,
  oem: number,
  onStatus: (msg: string) => void,
): Promise<any> {
  // Reuse worker if same language
  if (globalWorker && globalWorkerLang === lang) return globalWorker;

  // Terminate old worker if language changed
  if (globalWorker) {
    try { await globalWorker.terminate(); } catch {}
    globalWorker = null;
    globalWorkerLang = '';
    tesseractReady = false;
  }

  if (workerInitializing) {
    return new Promise(resolve => workerInitQueue.push(resolve));
  }

  workerInitializing = true;
  onStatus('Initializing OCR engine…');

  const Tesseract = await import('tesseract.js');
  const worker = await Tesseract.createWorker(lang, oem, {
    workerPath: '/tesseract.worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/',
    logger: (m: any) => {
      if (m.status === 'loading tesseract core') onStatus('Loading OCR core…');
      if (m.status === 'loading language traineddata') onStatus(`Downloading ${lang} language model…`);
      if (m.status === 'initializing tesseract') onStatus('Initializing Tesseract…');
      if (m.status === 'initialized tesseract') onStatus('OCR engine ready');
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onStatus(`Recognizing… ${Math.round(m.progress * 100)}%`);
      }
    },
  });

  globalWorker = worker;
  globalWorkerLang = lang;
  workerInitializing = false;

  // Flush queue
  const queue = [...workerInitQueue];
  workerInitQueue = [];
  for (const resolve of queue) resolve(worker);

  return worker;
}

let tesseractReady = false;

// ── OCR runner ────────────────────────────────────────────────────────────────

async function runOCR(
  file: File,
  options: Options,
  onStatus: (msg: string) => void,
): Promise<OcrResult> {
  const t0 = performance.now();
  const imageUrl = URL.createObjectURL(file);

  // Load image to canvas for preprocessing
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = document.createElement('img');
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = imageUrl;
  });

  onStatus('Pre-processing image…');
  const { canvas, applied: preprocessApplied } = applyPreprocessing(img, options.preprocess);

  onStatus('Starting OCR…');
  const worker = await getWorker(options.language, options.oem, onStatus);

  // Set page segmentation mode
  await worker.setParameters({ tessedit_pageseg_mode: options.psm });

  const psmLabel = PSM_MODES.find(p => p.value === options.psm)?.label ?? 'Auto';

  onStatus('Recognizing text…');
  const { data } = await worker.recognize(canvas, {}, {
    text: true,
    hocr: false,
    tsv: false,
    blocks: true,
    layoutBlocks: false,
  });

  const t1 = performance.now();

  // Build structured data
  const paragraphs: OcrParagraph[] = (data.blocks ?? []).flatMap((block: any) =>
    (block.paragraphs ?? []).map((para: any) => ({
      text: para.text ?? '',
      confidence: para.confidence ?? 0,
      bbox: para.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
      lines: (para.lines ?? []).map((line: any) => ({
        text: line.text ?? '',
        confidence: line.confidence ?? 0,
        bbox: line.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
        words: (line.words ?? []).map((w: any) => ({
          text: w.text ?? '',
          confidence: w.confidence ?? 0,
          bbox: w.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
        })),
      })),
    }))
  );

  const words: OcrWord[] = paragraphs.flatMap(p => p.lines.flatMap(l => l.words));
  const filteredWords = words.filter(w => w.confidence >= options.confidenceFilter && w.text.trim());
  const text = data.text ?? '';
  const confidence = words.length
    ? Math.round(words.reduce((s, w) => s + w.confidence, 0) / words.length)
    : 0;

  // Table detection
  const tableData = detectTableFromWords(filteredWords, img.naturalHeight);
  const hasTable = tableData !== null && tableData.length >= 3;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fileName: file.name,
    fileSize: file.size,
    imageUrl,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    text: text.trim(),
    paragraphs,
    words: filteredWords,
    confidence,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    charCount: text.replace(/\s/g, '').length,
    processingMs: Math.round(t1 - t0),
    language: options.language,
    psmLabel,
    hasTable,
    tableData: hasTable ? tableData! : undefined,
    preprocessApplied,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(b: number) {
  return b < 1024 ? `${b}B` : b < 1048576 ? `${(b / 1024).toFixed(1)}KB` : `${(b / 1048576).toFixed(1)}MB`;
}

function confidenceColor(conf: number): string {
  if (conf >= 90) return 'text-emerald-700 bg-emerald-50';
  if (conf >= 70) return 'text-yellow-700 bg-yellow-50';
  if (conf >= 50) return 'text-orange-700 bg-orange-50';
  return 'text-red-700 bg-red-50';
}

function confidenceBg(conf: number): string {
  if (conf >= 90) return 'rgba(16,185,129,0.15)';
  if (conf >= 70) return 'rgba(245,158,11,0.18)';
  if (conf >= 50) return 'rgba(249,115,22,0.18)';
  return 'rgba(239,68,68,0.18)';
}

function copyToClipboard(text: string, onDone: () => void) {
  navigator.clipboard.writeText(text).then(onDone).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    onDone();
  });
}

function downloadText(text: string, fileName: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.replace(/\.[^.]+$/, '') + '_ocr.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJson(result: OcrResult) {
  const payload = {
    fileName: result.fileName,
    language: result.language,
    confidence: result.confidence,
    wordCount: result.wordCount,
    charCount: result.charCount,
    processingMs: result.processingMs,
    text: result.text,
    paragraphs: result.paragraphs.map(p => ({
      text: p.text,
      confidence: p.confidence,
      lines: p.lines.map(l => ({
        text: l.text,
        confidence: l.confidence,
        words: l.words.map(w => ({ text: w.text, confidence: w.confidence, bbox: w.bbox })),
      })),
    })),
    ...(result.hasTable ? { table: result.tableData } : {}),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = result.fileName.replace(/\.[^.]+$/, '') + '_ocr.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ── BBox Overlay Canvas ───────────────────────────────────────────────────────

function BBoxOverlay({ result, imgDisplayW, imgDisplayH }: {
  result: OcrResult;
  imgDisplayW: number;
  imgDisplayH: number;
}) {
  const scaleX = imgDisplayW / result.naturalWidth;
  const scaleY = imgDisplayH / result.naturalHeight;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={imgDisplayW}
      height={imgDisplayH}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {result.words.map((w, i) => (
        <g key={i}>
          <rect
            x={w.bbox.x0 * scaleX}
            y={w.bbox.y0 * scaleY}
            width={(w.bbox.x1 - w.bbox.x0) * scaleX}
            height={(w.bbox.y1 - w.bbox.y0) * scaleY}
            fill={confidenceBg(w.confidence)}
            stroke={w.confidence >= 90 ? '#059669' : w.confidence >= 70 ? '#d97706' : '#ef4444'}
            strokeWidth="0.8"
            rx="1"
          />
        </g>
      ))}
    </svg>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────

function ResultCard({
  result,
  outputMode,
  confidenceFilter,
  showBboxOverlay,
  onRemove,
}: {
  result: OcrResult;
  outputMode: Options['outputMode'];
  confidenceFilter: number;
  showBboxOverlay: boolean;
  onRemove: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imgDisplaySize, setImgDisplaySize] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [showFullImg, setShowFullImg] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'structured' | 'confidence' | 'table'>(
    outputMode === 'table' && result.hasTable ? 'table' : 'text'
  );

  useEffect(() => {
    const updateSize = () => {
      if (imgRef.current) {
        setImgDisplaySize({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleCopy = () => {
    copyToClipboard(result.text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const visibleWords = result.words.filter(w => w.confidence >= confidenceFilter);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 bg-zinc-50">
        <div className="flex items-center gap-2 min-w-0">
          <ImageIcon className="h-4 w-4 text-zinc-400 shrink-0" />
          <span className="text-sm font-semibold text-zinc-800 truncate">{result.fileName}</span>
          <span className="text-xs text-zinc-400 shrink-0">{formatBytes(result.fileSize)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${confidenceColor(result.confidence)}`}>
            {result.confidence}% confident
          </span>
          <button onClick={onRemove} className="rounded-lg p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
        {/* Left: Image preview */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Preview</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-100 transition-colors">
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-zinc-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-100 transition-colors">
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setShowFullImg(true)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-100 transition-colors ml-1">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="relative overflow-auto rounded-xl bg-zinc-100 border border-zinc-200" style={{ maxHeight: '360px' }}>
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', display: 'inline-block' }}>
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={result.imageUrl}
                  alt={result.fileName}
                  className="block max-w-full"
                  style={{ maxHeight: '340px', objectFit: 'contain' }}
                  onLoad={() => {
                    if (imgRef.current)
                      setImgDisplaySize({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight });
                  }}
                />
                {showBboxOverlay && imgDisplaySize.w > 0 && (
                  <BBoxOverlay
                    result={result}
                    imgDisplayW={imgDisplaySize.w}
                    imgDisplayH={imgDisplaySize.h}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Words', value: result.wordCount },
              { label: 'Chars', value: result.charCount },
              { label: 'Time', value: `${(result.processingMs / 1000).toFixed(1)}s` },
            ].map(s => (
              <div key={s.label} className="rounded-lg bg-zinc-50 border border-zinc-100 px-2 py-1.5 text-center">
                <div className="text-base font-bold text-zinc-900">{s.value}</div>
                <div className="text-[10px] text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
          {result.preprocessApplied.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {result.preprocessApplied.map(p => (
                <span key={p} className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Text output */}
        <div className="p-4 flex flex-col">
          {/* Tabs */}
          <div className="flex gap-1 mb-3 border-b border-zinc-100 pb-2">
            {([
              { id: 'text',       label: 'Plain',       icon: AlignLeft },
              { id: 'structured', label: 'Structured',  icon: Layers },
              { id: 'confidence', label: 'Confidence',  icon: BarChart2 },
              ...(result.hasTable ? [{ id: 'table', label: 'Table', icon: Table2 }] : []),
            ] as { id: string; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-violet-100 text-violet-800'
                    : 'text-zinc-500 hover:bg-zinc-100'
                }`}
              >
                <Icon className="h-3 w-3" /> {label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <button onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button onClick={() => downloadText(result.text, result.fileName)}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Download className="h-3 w-3" /> TXT
              </button>
              <button onClick={() => downloadJson(result)}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Download className="h-3 w-3" /> JSON
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto max-h-[300px] rounded-xl bg-zinc-50 border border-zinc-100 p-3 text-sm">
            {activeTab === 'text' && (
              <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-800 leading-relaxed">
                {result.text || <span className="text-zinc-400 italic">No text extracted</span>}
              </pre>
            )}

            {activeTab === 'structured' && (
              <div className="space-y-3">
                {result.paragraphs.length === 0 && (
                  <p className="text-zinc-400 italic text-xs">No structured content found</p>
                )}
                {result.paragraphs.map((para, pi) => (
                  <div key={pi} className="border-l-2 border-violet-200 pl-3">
                    {para.lines.map((line, li) => (
                      <p key={li} className="text-xs text-zinc-800 leading-relaxed mb-0.5">
                        {line.text.trim()}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'confidence' && (
              <div className="flex flex-wrap gap-1 leading-loose">
                {visibleWords.length === 0 && (
                  <p className="text-zinc-400 italic text-xs">No words above {confidenceFilter}% confidence</p>
                )}
                {visibleWords.map((w, i) => (
                  <span
                    key={i}
                    title={`${Math.round(w.confidence)}% confidence`}
                    className={`inline-block rounded px-1 py-0.5 text-xs font-mono cursor-default ${
                      w.confidence >= 90 ? 'bg-emerald-100 text-emerald-800' :
                      w.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      w.confidence >= 50 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {w.text}
                  </span>
                ))}
              </div>
            )}

            {activeTab === 'table' && result.tableData && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    {result.tableData.map((row, ri) => (
                      <tr key={ri} className={ri === 0 ? 'bg-violet-50 font-semibold' : ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="border border-zinc-200 px-2 py-1.5 text-zinc-700 max-w-[200px]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Confidence legend */}
          {activeTab === 'confidence' && (
            <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
              {[
                { label: '≥90% high', cls: 'bg-emerald-100 text-emerald-700' },
                { label: '70–89% good', cls: 'bg-yellow-100 text-yellow-700' },
                { label: '50–69% fair', cls: 'bg-orange-100 text-orange-700' },
                { label: '<50% low', cls: 'bg-red-100 text-red-700' },
              ].map(({ label, cls }) => (
                <span key={label} className={`rounded px-1.5 py-0.5 font-medium ${cls}`}>{label}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen image modal */}
      {showFullImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowFullImg(false)}
        >
          <button className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30">
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.imageUrl}
            alt={result.fileName}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

// ── Processing card ───────────────────────────────────────────────────────────

function ProcessingCard({ fileName, status }: { fileName: string; status: string }) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
        <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-violet-900 truncate">{fileName}</p>
        <p className="text-xs text-violet-600 mt-0.5">{status}</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const ACCEPT = '.jpg,.jpeg,.png,.webp,.bmp,.tiff,.tif,.gif';
const ACCEPT_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff', 'image/gif'];

export default function ImageToTextClient() {
  const [results, setResults] = useState<OcrResult[]>([]);
  const [queue, setQueue] = useState<{ file: File; status: string }[]>([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<Options>({
    language: 'eng',
    psm: '3',
    oem: 1,
    preprocess: {
      grayscale: false,
      contrast: true,
      sharpen: false,
      upscale: true,
      threshold: false,
      denoise: false,
    },
    outputMode: 'text',
    confidenceFilter: 0,
    showBboxOverlay: false,
  });

  const processFiles = useCallback(async (files: File[]) => {
    const valid = files.filter(f => ACCEPT_MIME.includes(f.type) || /\.(tiff?|bmp)$/i.test(f.name));
    if (!valid.length) {
      setError('Please select image files (JPEG, PNG, WebP, BMP, TIFF, GIF).');
      return;
    }
    if (valid.length > 10) {
      setError('Maximum 10 images at once.');
      return;
    }
    setError('');

    for (const file of valid) {
      setQueue(q => [...q, { file, status: 'Queued…' }]);

      try {
        const updateStatus = (status: string) =>
          setQueue(q => q.map(item => item.file === file ? { ...item, status } : item));

        const result = await runOCR(file, options, updateStatus);
        setResults(prev => [result, ...prev]);
      } catch (e) {
        setError(`Failed to process "${file.name}": ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setQueue(q => q.filter(item => item.file !== file));
      }
    }
  }, [options]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  }, [processFiles]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFiles(Array.from(e.target.files));
  }, [processFiles]);

  const removeResult = (id: string) => {
    setResults(prev => {
      const r = prev.find(x => x.id === id);
      if (r) URL.revokeObjectURL(r.imageUrl);
      return prev.filter(x => x.id !== id);
    });
  };

  const isProcessing = queue.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl shadow-lg">
              🔍
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Image to Text — OCR Online
              </h1>
              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                Extract text from photos, scanned documents, and images with advanced OCR.
                Confidence scoring, table detection, 18 languages. 100% in-browser — nothing uploaded.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['18 languages', 'Scanned photos', 'Table detection', 'Confidence scoring', 'Batch processing', '100% in-browser'].map(f => (
                  <span key={f} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-800">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-5">

        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed py-14 transition-all duration-200 ${
            dragging
              ? 'border-violet-400 bg-violet-50/80 scale-[1.01]'
              : 'border-zinc-300 bg-white hover:border-violet-400 hover:bg-violet-50/30'
          }`}
        >
          <input ref={inputRef} type="file" accept={ACCEPT} multiple className="hidden" onChange={handleInput} />
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${dragging ? 'bg-violet-100' : 'bg-zinc-100'}`}>
            <Scan className={`h-8 w-8 transition-colors ${dragging ? 'text-violet-600' : 'text-zinc-400'}`} />
          </div>
          <p className="mt-4 text-lg font-semibold text-zinc-700">Drop images here</p>
          <p className="mt-1 text-sm text-zinc-400">or click to browse • up to 10 images at once</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['JPEG', 'PNG', 'WebP', 'BMP', 'TIFF', 'GIF'].map(f => (
              <span key={f} className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 shadow-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Options panel */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          <button
            onClick={() => setShowOptions(o => !o)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-700"
          >
            <span className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-zinc-400" /> OCR Settings
            </span>
            {showOptions
              ? <ChevronUp className="h-4 w-4 text-zinc-400" />
              : <ChevronDown className="h-4 w-4 text-zinc-400" />}
          </button>

          {showOptions && (
            <div className="border-t border-zinc-100 px-5 py-5 space-y-6">

              {/* Row 1: Language + PSM */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <Languages className="h-3.5 w-3.5 text-violet-500" /> Language
                  </p>
                  <select
                    value={options.language}
                    onChange={e => setOptions(o => ({ ...o, language: e.target.value }))}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    {LANGUAGES.map(l => (
                      <option key={l.code} value={l.code}>{l.label}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    First use downloads the language model (~5–15 MB) from Tesseract CDN.
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <AlignLeft className="h-3.5 w-3.5 text-violet-500" /> Page layout mode
                  </p>
                  <select
                    value={options.psm}
                    onChange={e => setOptions(o => ({ ...o, psm: e.target.value }))}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    {PSM_MODES.map(m => (
                      <option key={m.value} value={m.value}>{m.label} — {m.desc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Pre-processing */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Image Pre-processing
                </p>
                <div className="flex flex-wrap gap-2">
                  {([
                    { key: 'grayscale', label: 'Grayscale', desc: 'Convert to B&W before OCR' },
                    { key: 'contrast',  label: 'Boost contrast', desc: 'Improves faded or low-contrast scans' },
                    { key: 'sharpen',   label: 'Sharpen', desc: 'Unsharp mask for blurry images' },
                    { key: 'upscale',   label: '2× upscale', desc: 'Scale up small images for better accuracy' },
                    { key: 'threshold', label: 'Binarize (Otsu)', desc: 'Convert to pure black & white using Otsu threshold' },
                  ] as { key: keyof Options['preprocess']; label: string; desc: string }[]).map(({ key, label, desc }) => (
                    <button
                      key={key}
                      title={desc}
                      onClick={() => setOptions(o => ({
                        ...o, preprocess: { ...o.preprocess, [key]: !o.preprocess[key] }
                      }))}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                        options.preprocess[key]
                          ? 'border-violet-300 bg-violet-50 text-violet-800'
                          : 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                      }`}
                    >
                      {options.preprocess[key] ? '✓ ' : ''}{label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Output options */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <BarChart2 className="h-3.5 w-3.5 text-violet-500" /> Confidence filter
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={0} max={90} step={5}
                      value={options.confidenceFilter}
                      onChange={e => setOptions(o => ({ ...o, confidenceFilter: +e.target.value }))}
                      className="flex-1 accent-violet-500"
                    />
                    <span className="text-sm font-semibold text-zinc-700 w-14 text-right">
                      ≥{options.confidenceFilter}%
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400">Hide words below this confidence in the Confidence tab</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-violet-500" /> Word bounding boxes
                  </p>
                  <button
                    onClick={() => setOptions(o => ({ ...o, showBboxOverlay: !o.showBboxOverlay }))}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                      options.showBboxOverlay
                        ? 'border-violet-300 bg-violet-50 text-violet-800'
                        : 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    {options.showBboxOverlay ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {options.showBboxOverlay ? 'Overlays on' : 'Overlays off'}
                  </button>
                  <p className="mt-1 text-[11px] text-zinc-400">Color-coded bounding boxes by confidence</p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Processing queue */}
        {queue.map(({ file, status }) => (
          <ProcessingCard key={file.name + file.size} fileName={file.name} status={status} />
        ))}

        {/* Results */}
        {results.map(result => (
          <ResultCard
            key={result.id}
            result={result}
            outputMode={options.outputMode}
            confidenceFilter={options.confidenceFilter}
            showBboxOverlay={options.showBboxOverlay}
            onRemove={() => removeResult(result.id)}
          />
        ))}

        {/* Empty state */}
        {!isProcessing && results.length === 0 && !error && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="font-semibold text-zinc-900 mb-5 flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-zinc-400" /> What can this tool do?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: '📸',
                  title: 'Photos & Screenshots',
                  desc: 'Extract text from smartphone photos, screenshots, and digital images with high accuracy.',
                },
                {
                  icon: '🖨️',
                  title: 'Scanned Documents',
                  desc: 'Process scanned PDFs, physical document scans, and faxes — even low-quality scans.',
                },
                {
                  icon: '🌐',
                  title: '18 Languages',
                  desc: 'English, French, German, Spanish, Arabic, Hindi, Chinese, Japanese, Korean and more.',
                },
                {
                  icon: '📊',
                  title: 'Table Detection',
                  desc: 'Automatically detects tables in the image and renders them as a structured grid.',
                },
                {
                  icon: '🎨',
                  title: 'Confidence Coloring',
                  desc: 'Every word is color-coded by OCR confidence — instantly spot unreliable results.',
                },
                {
                  icon: '⚙️',
                  title: 'Image Pre-processing',
                  desc: 'Grayscale, contrast boost, sharpening, 2× upscale, and Otsu binarization improve accuracy on difficult images.',
                },
                {
                  icon: '🔍',
                  title: 'Bounding Box Overlay',
                  desc: 'Toggle word-level bounding boxes directly on the image, color-coded by confidence.',
                },
                {
                  icon: '📦',
                  title: 'Batch Processing',
                  desc: 'Upload and process up to 10 images at once — each result shown as a separate card.',
                },
                {
                  icon: '💾',
                  title: 'Export: TXT & JSON',
                  desc: 'Download plain text or structured JSON with full word-level data and bounding boxes.',
                },
              ].map(f => (
                <div key={f.title} className="flex gap-3 rounded-xl bg-zinc-50 border border-zinc-100 p-4">
                  <span className="text-2xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{f.title}</p>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
              <strong>Privacy note:</strong> All processing happens entirely in your browser using the Tesseract OCR engine.
              No image is ever uploaded to any server. The language model is downloaded once from the Tesseract CDN and cached locally.
            </div>
          </div>
        )}

        {/* Tips */}
        {results.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Tips for better accuracy</p>
            <ul className="grid gap-1.5 sm:grid-cols-2 text-xs text-zinc-600">
              {[
                'Enable "Boost contrast" for faded or low-contrast documents',
                'Use "2× upscale" for small or low-resolution images',
                'Try "Binarize (Otsu)" for very noisy scanned documents',
                '"Sparse text" mode works best for labels, screenshots with scattered text',
                'Use "Single column" for newspaper columns or narrow text layouts',
                'For receipts or forms, "Single block" mode often performs better',
              ].map((tip, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-violet-400 mt-0.5 shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
