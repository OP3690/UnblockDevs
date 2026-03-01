'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Palette,
  Square,
  Minus,
  Frame,
  Image as ImageIcon,
  FlipHorizontal,
  FlipVertical,
  Download,
  Code2,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="85" fill="url(#g)" stroke="#1e40af" stroke-width="4"/>
  <path d="M80 100 L95 115 L130 80" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function parseColor(input: string): string {
  const v = (input || '').trim();
  if (/^#[0-9A-Fa-f]{3,8}$/.test(v)) return v;
  if (v.startsWith('rgb')) return v;
  return '#000000';
}

function stripScripts(svgString: string): string {
  return svgString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function makeSvgExportSafe(svgString: string): string {
  return svgString.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, content) => {
    const safe = content
      .replace(/\brx\s*:\s*[^;}\s]+;?/gi, '')
      .replace(/\bry\s*:\s*[^;}\s]+;?/gi, '');
    return '<style' + attrs + '>' + safe + '</style>';
  });
}

/** Remove style blocks we inject (svg * { ... }) so we don't stack when re-applying or baking */
function stripInjectedStyles(svgString: string): string {
  if (!svgString?.trim()) return svgString;
  return svgString.replace(
    /<style([^>]*)>([\s\S]*?)<\/style>/gi,
    (_match, attrs, content) =>
      /svg\s*\*[\s\{]/.test(content) ? '' : `<style${attrs}>${content}</style>`
  );
}

/** Replace one color with another across the SVG (exact hex match, case-insensitive) */
function replaceColorInSvg(svgString: string, fromHex: string, toHex: string): string {
  if (!fromHex || !toHex || fromHex === toHex) return svgString;
  const normalizedFrom = fromHex.trim().toLowerCase();
  const escaped = normalizedFrom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return svgString.replace(new RegExp(escaped, 'gi'), toHex);
}

export interface SvgOverrides {
  fillOverride: boolean;
  fillColor: string;
  strokeOverride: boolean;
  strokeColor: string;
  fillOpacityOverride: boolean;
  fillOpacity: number;
  strokeOpacityOverride: boolean;
  strokeOpacity: number;
  strokeWidthOverride: boolean;
  strokeWidth: number;
  strokeDashArray: string;
  strokeLinecap: 'butt' | 'round' | 'square';
  strokeLinejoin: 'miter' | 'round' | 'bevel';
  replaceColorFrom: string;
  replaceColorTo: string;
  replaceColorEnabled: boolean;
}

function applyOverrides(svgString: string, opts: SvgOverrides): string {
  if (!svgString?.trim()) return svgString;
  let s = svgString;
  if (opts.replaceColorEnabled && opts.replaceColorFrom && opts.replaceColorTo) {
    s = replaceColorInSvg(s, opts.replaceColorFrom, parseColor(opts.replaceColorTo));
  }
  const rules: string[] = [];
  if (opts.fillOverride) rules.push(`fill: ${parseColor(opts.fillColor)} !important`);
  if (opts.strokeOverride) rules.push(`stroke: ${parseColor(opts.strokeColor)} !important`);
  if (opts.fillOpacityOverride) rules.push(`fill-opacity: ${opts.fillOpacity} !important`);
  if (opts.strokeOpacityOverride) rules.push(`stroke-opacity: ${opts.strokeOpacity} !important`);
  if (opts.strokeWidthOverride) rules.push(`stroke-width: ${opts.strokeWidth} !important`);
  if (opts.strokeDashArray.trim()) rules.push(`stroke-dasharray: ${opts.strokeDashArray} !important`);
  rules.push(`stroke-linecap: ${opts.strokeLinecap} !important`);
  rules.push(`stroke-linejoin: ${opts.strokeLinejoin} !important`);
  if (rules.length === 0) return s;
  const style = '<style>svg * {' + rules.join('; ') + '}</style>';
  const openTagEnd = s.indexOf('>');
  if (openTagEnd === -1) return s;
  return s.slice(0, openTagEnd + 1) + style + s.slice(openTagEnd + 1);
}

function getSvgDimensionsFromString(
  raw: string,
  outWidth: string,
  outHeight: string
): { w: number; h: number } {
  if (!raw?.trim()) return { w: 200, h: 200 };
  let w: number | null = outWidth ? parseInt(outWidth, 10) : null;
  let h: number | null = outHeight ? parseInt(outHeight, 10) : null;
  const widthMatch = raw.match(/width\s*=\s*["']?([\d.]+)/i);
  const heightMatch = raw.match(/height\s*=\s*["']?([\d.]+)/i);
  const viewBoxMatch = raw.match(/viewBox\s*=\s*["'][\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)/i);
  if (w == null) w = widthMatch ? parseFloat(widthMatch[1]) : (viewBoxMatch ? parseFloat(viewBoxMatch[1]) : 200);
  if (h == null) h = heightMatch ? parseFloat(heightMatch[1]) : (viewBoxMatch ? parseFloat(viewBoxMatch[2]) : 200);
  return { w: Math.max(1, w!), h: Math.max(1, h!) };
}

function downloadBlob(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

const defaultOverrides: SvgOverrides = {
  fillOverride: false,
  fillColor: '#3b82f6',
  strokeOverride: false,
  strokeColor: '#1e40af',
  fillOpacityOverride: false,
  fillOpacity: 1,
  strokeOpacityOverride: false,
  strokeOpacity: 1,
  strokeWidthOverride: false,
  strokeWidth: 2,
  strokeDashArray: '',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  replaceColorFrom: '',
  replaceColorTo: '#000000',
  replaceColorEnabled: false,
};

export default function SvgToImageClient() {
  const [svgInput, setSvgInput] = useState('');
  const [scale, setScale] = useState(1);
  const [outWidth, setOutWidth] = useState('');
  const [outHeight, setOutHeight] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgTransparent, setBgTransparent] = useState(true);
  const [jpegQuality, setJpegQuality] = useState(0.92);
  const [previewStatus, setPreviewStatus] = useState<'success' | 'error' | ''>('');
  const previewWrapRef = useRef<HTMLDivElement>(null);

  // Advanced: overrides (colors, lines, borders)
  const [overrides, setOverrides] = useState<SvgOverrides>(defaultOverrides);

  // Shape & transform
  const [rotateDeg, setRotateDeg] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [padding, setPadding] = useState(0);

  // Border / frame
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#e5e7eb');

  // Advanced panels open
  const [openColors, setOpenColors] = useState(true);
  const [openShape, setOpenShape] = useState(true);
  const [openLines, setOpenLines] = useState(true);
  const [openBorder, setOpenBorder] = useState(false);

  const getPreviewSvgString = useCallback(() => {
    const raw = svgInput.trim();
    if (!raw) return raw;
    return applyOverrides(stripInjectedStyles(raw), overrides);
  }, [svgInput, overrides]);

  /** When user changes tools (color, shape, lines, etc.), bake that into the code so code and preview stay in sync */
  const hasOverrideActive = Boolean(
    overrides.replaceColorEnabled ||
    overrides.fillOverride ||
    overrides.strokeOverride ||
    overrides.fillOpacityOverride ||
    overrides.strokeOpacityOverride ||
    overrides.strokeWidthOverride ||
    (overrides.strokeDashArray?.trim() ?? '').length > 0
  );
  const prevOverridesRef = useRef<SvgOverrides | null>(null);
  useEffect(() => {
    if (!svgInput.trim()) return;
    const prev = prevOverridesRef.current;
    prevOverridesRef.current = overrides;
    if (prev === null) return;

    if (!hasOverrideActive) {
      const stripped = stripInjectedStyles(svgInput.trim());
      if (stripped !== svgInput.trim()) setSvgInput(stripped);
      return;
    }
    const stripped = stripInjectedStyles(svgInput.trim());
    const baked = applyOverrides(stripped, overrides);
    setSvgInput(baked);
  }, [overrides, hasOverrideActive]);

  useEffect(() => {
    const raw = svgInput.trim();
    if (!raw) {
      if (previewWrapRef.current) previewWrapRef.current.innerHTML = '';
      setPreviewStatus('');
      return;
    }
    const svgString = getPreviewSvgString();
    try {
      if (previewWrapRef.current) {
        previewWrapRef.current.innerHTML = stripScripts(svgString);
        const svgEl = previewWrapRef.current.querySelector('svg');
        if (svgEl) {
          const w = parseFloat(svgEl.getAttribute('width') || '') || (svgEl.viewBox?.baseVal?.width ?? 200);
          const h = parseFloat(svgEl.getAttribute('height') || '') || (svgEl.viewBox?.baseVal?.height ?? 200);
          if (!svgEl.hasAttribute('viewBox')) svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
          const scaledW = w * scale;
          const scaledH = h * scale;
          svgEl.setAttribute('width', String(scaledW));
          svgEl.setAttribute('height', String(scaledH));
          svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          svgEl.removeAttribute('style');
        }
      }
      setPreviewStatus('success');
    } catch {
      if (previewWrapRef.current) previewWrapRef.current.innerHTML = '';
      setPreviewStatus('error');
    }
  }, [svgInput, getPreviewSvgString, scale]);

  const getExportSvgString = useCallback((): string => {
    const svgEl = previewWrapRef.current?.querySelector('svg');
    if (svgEl) {
      const serialized = new XMLSerializer().serializeToString(svgEl);
      return makeSvgExportSafe(serialized);
    }
    return makeSvgExportSafe(getPreviewSvgString());
  }, [getPreviewSvgString]);

  const exportToCanvas = useCallback(
    (mimeType: 'image/png' | 'image/jpeg', quality?: number): Promise<HTMLCanvasElement> => {
      return new Promise((resolve, reject) => {
        const svgString = getExportSvgString();
        if (!svgString.trim()) {
          reject(new Error('No SVG content'));
          return;
        }
        const { w: baseW, h: baseH } = getSvgDimensionsFromString(svgInput.trim(), outWidth, outHeight);
        const contentW = Math.round(baseW * scale);
        const contentH = Math.round(baseH * scale);
        const rad = (rotateDeg * Math.PI) / 180;
        const rotW =
          contentW * Math.abs(Math.cos(rad)) + contentH * Math.abs(Math.sin(rad));
        const rotH =
          contentW * Math.abs(Math.sin(rad)) + contentH * Math.abs(Math.cos(rad));
        const pad = Math.max(0, padding);
        const border = Math.max(0, borderWidth);
        const totalW = Math.round(2 * border + 2 * pad + rotW);
        const totalH = Math.round(2 * border + 2 * pad + rotH);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = contentW;
        tempCanvas.height = contentH;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        const useBg = mimeType === 'image/jpeg' || !bgTransparent;
        if (useBg) {
          tempCtx.fillStyle = parseColor(bgColor);
          tempCtx.fillRect(0, 0, contentW, contentH);
        }
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0, contentW, contentH);
          URL.revokeObjectURL(url);

          const canvas = document.createElement('canvas');
          canvas.width = totalW;
          canvas.height = totalH;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }
          // Border
          if (border > 0) {
            ctx.fillStyle = parseColor(borderColor);
            ctx.fillRect(0, 0, totalW, totalH);
          }
          // Background (inside border)
          const innerLeft = border;
          const innerTop = border;
          const innerW = totalW - 2 * border;
          const innerH = totalH - 2 * border;
          if (useBg) {
            ctx.fillStyle = parseColor(bgColor);
            ctx.fillRect(innerLeft, innerTop, innerW, innerH);
          }
          // Content area: center the rotated content
          const cx = border + pad + rotW / 2;
          const cy = border + pad + rotH / 2;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rad);
          ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
          ctx.translate(-contentW / 2, -contentH / 2);
          ctx.drawImage(tempCanvas, 0, 0, contentW, contentH);
          ctx.restore();
          resolve(canvas);
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load SVG'));
        };
        img.src = url;
      });
    },
    [
      getExportSvgString,
      svgInput,
      outWidth,
      outHeight,
      scale,
      bgTransparent,
      bgColor,
      rotateDeg,
      flipX,
      flipY,
      padding,
      borderWidth,
      borderColor,
    ]
  );

  const handleExportPng = useCallback(() => {
    exportToCanvas('image/png')
      .then((canvas) => {
        downloadBlob(canvas.toDataURL('image/png'), 'image.png');
        toast.success('PNG downloaded');
      })
      .catch(() => {
        setPreviewStatus('error');
        toast.error('Add valid SVG first');
      });
  }, [exportToCanvas]);

  const handleExportJpeg = useCallback(() => {
    exportToCanvas('image/jpeg', jpegQuality)
      .then((canvas) => {
        downloadBlob(canvas.toDataURL('image/jpeg', jpegQuality), 'image.jpg');
        toast.success('JPEG downloaded');
      })
      .catch(() => {
        setPreviewStatus('error');
        toast.error('Add valid SVG first');
      });
  }, [exportToCanvas, jpegQuality]);

  const updateOverride = useCallback(<K extends keyof SvgOverrides>(key: K, value: SvgOverrides[K]) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/20">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors mb-4 rounded-lg px-2 py-1 -ml-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Back to Tools
          </Link>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              SVG to JPEG / PNG
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
              <Lock className="w-3 h-3" aria-hidden />
              Client-side only
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Edit SVG code, tweak colors and strokes, then export. Nothing is uploaded—everything runs in your browser.
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-12rem)]">
          {/* Left: SVG code (30%) + controls */}
          <div className="lg:w-[30%] lg:min-w-[280px] lg:max-w-[420px] flex flex-col gap-4 shrink-0">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col flex-1 min-h-[240px] lg:min-h-0 ring-1 ring-slate-900/5">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 shrink-0">
                <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-slate-500" aria-hidden />
                  SVG Code
                </h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSvgInput(SAMPLE_SVG)}
                    className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
                  >
                    Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSvgInput('');
                      setPreviewStatus('');
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                placeholder="Paste your SVG code here, or click Sample to try an example…"
                className="w-full flex-1 min-h-[200px] p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 border-0 focus:ring-2 focus:ring-inset focus:ring-primary-500/20 resize-none custom-scrollbar"
                spellCheck={false}
                aria-label="SVG code editor"
              />
            </section>

            {/* Controls - scrollable in left column */}
            <aside className="space-y-4 overflow-y-auto lg:max-h-[50vh] custom-scrollbar pr-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-5 ring-1 ring-slate-900/5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-500" aria-hidden />
                Export
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scale</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0.25}
                    max={4}
                    step={0.25}
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none bg-gray-200 accent-primary-600"
                  />
                  <span className="text-sm font-medium text-gray-600 w-10">{scale}×</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output size (optional)</label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Width"
                    value={outWidth}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setOutWidth(v);
                    }}
                    className="flex-1 min-w-[3.5rem] w-0 text-center px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                  <span className="flex-shrink-0 text-gray-400 font-medium" aria-hidden>×</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Height"
                    value={outHeight}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setOutHeight(v);
                    }}
                    className="flex-1 min-w-[3.5rem] w-0 text-center px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Leave empty to use SVG size</p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={bgTransparent}
                    onChange={(e) => setBgTransparent(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  Transparent background (PNG only)
                </label>
              </div>
              {!bgTransparent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background color</label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-9 w-11 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 min-w-0 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      maxLength={9}
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">JPEG quality</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={jpegQuality}
                    onChange={(e) => setJpegQuality(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none bg-gray-200 accent-primary-600"
                  />
                  <span className="text-sm font-medium text-gray-600 w-10">{Math.round(jpegQuality * 100)}%</span>
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleExportPng}
                  className="w-full px-4 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" aria-hidden />
                  Export PNG
                </button>
                <button
                  type="button"
                  onClick={handleExportJpeg}
                  className="w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" aria-hidden />
                  Export JPEG
                </button>
              </div>
            </div>

            {/* Advanced: Colors */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
              <button
                type="button"
                onClick={() => setOpenColors(!openColors)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500/20 rounded-t-2xl"
                aria-expanded={openColors}
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Colors
                </span>
                {openColors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openColors && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={overrides.replaceColorEnabled}
                        onChange={(e) => updateOverride('replaceColorEnabled', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      Replace color (find → replace)
                    </label>
                    {(overrides.replaceColorEnabled) && (
                      <div className="mt-3 flex items-stretch gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <div className="flex flex-1 min-w-0 items-center gap-2">
                          <input
                            type="color"
                            value={overrides.replaceColorFrom || '#000000'}
                            onChange={(e) => updateOverride('replaceColorFrom', e.target.value)}
                            className="h-9 w-10 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            value={overrides.replaceColorFrom}
                            onChange={(e) => updateOverride('replaceColorFrom', e.target.value)}
                            placeholder="From #hex"
                            className="min-w-0 flex-1 px-2 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                          />
                        </div>
                        <span className="flex flex-shrink-0 items-center text-gray-400 font-medium">→</span>
                        <div className="flex flex-1 min-w-0 items-center gap-2">
                          <input
                            type="color"
                            value={overrides.replaceColorTo}
                            onChange={(e) => updateOverride('replaceColorTo', e.target.value)}
                            className="h-9 w-10 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            value={overrides.replaceColorTo}
                            onChange={(e) => updateOverride('replaceColorTo', e.target.value)}
                            placeholder="To #hex"
                            className="min-w-0 flex-1 px-2 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={overrides.fillOverride}
                        onChange={(e) => updateOverride('fillOverride', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      Override fill color
                    </label>
                    {overrides.fillOverride && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <input
                          type="color"
                          value={overrides.fillColor}
                          onChange={(e) => updateOverride('fillColor', e.target.value)}
                          className="h-9 w-10 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={overrides.fillColor}
                          onChange={(e) => updateOverride('fillColor', e.target.value)}
                          className="min-w-0 flex-1 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={overrides.strokeOverride}
                        onChange={(e) => updateOverride('strokeOverride', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      Override stroke color
                    </label>
                    {overrides.strokeOverride && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <input
                          type="color"
                          value={overrides.strokeColor}
                          onChange={(e) => updateOverride('strokeColor', e.target.value)}
                          className="h-9 w-10 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={overrides.strokeColor}
                          onChange={(e) => updateOverride('strokeColor', e.target.value)}
                          className="min-w-0 flex-1 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 p-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={overrides.fillOpacityOverride}
                          onChange={(e) => updateOverride('fillOpacityOverride', e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        Fill opacity
                      </label>
                      {overrides.fillOpacityOverride && (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={overrides.fillOpacity}
                            onChange={(e) => updateOverride('fillOpacity', Number(e.target.value))}
                            className="min-w-0 flex-1 h-2 rounded-lg accent-primary-600"
                          />
                          <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-gray-500">
                            {Math.round(overrides.fillOpacity * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 p-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={overrides.strokeOpacityOverride}
                          onChange={(e) => updateOverride('strokeOpacityOverride', e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        Stroke opacity
                      </label>
                      {overrides.strokeOpacityOverride && (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={overrides.strokeOpacity}
                            onChange={(e) => updateOverride('strokeOpacity', Number(e.target.value))}
                            className="min-w-0 flex-1 h-2 rounded-lg accent-primary-600"
                          />
                          <span className="w-8 flex-shrink-0 text-right text-xs font-medium text-gray-500">
                            {Math.round(overrides.strokeOpacity * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced: Shape & transform */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
              <button
                type="button"
                onClick={() => setOpenShape(!openShape)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500/20 rounded-t-2xl"
                aria-expanded={openShape}
              >
                <span className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Shape & transform
                </span>
                {openShape ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openShape && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rotate (degrees)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={15}
                        value={rotateDeg}
                        onChange={(e) => setRotateDeg(Number(e.target.value))}
                        className="flex-1 h-2 rounded-lg accent-primary-600"
                      />
                      <span className="text-sm font-medium text-gray-600 w-10">{rotateDeg}°</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFlipX(!flipX)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                        flipX
                          ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-sm focus:ring-primary-500/40'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 focus:ring-slate-400/40'
                      }`}
                    >
                      <FlipHorizontal className="w-4 h-4 shrink-0" aria-hidden />
                      Flip X
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlipY(!flipY)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                        flipY
                          ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-sm focus:ring-primary-500/40'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 focus:ring-slate-400/40'
                      }`}
                    >
                      <FlipVertical className="w-4 h-4 shrink-0" aria-hidden />
                      Flip Y
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Padding (px)
                    </label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                      <input
                        type="number"
                        min={0}
                        max={200}
                        value={padding}
                        onChange={(e) => setPadding(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced: Lines & strokes */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
              <button
                type="button"
                onClick={() => setOpenLines(!openLines)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500/20 rounded-t-2xl"
                aria-expanded={openLines}
              >
                <span className="flex items-center gap-2">
                  <Minus className="w-4 h-4" />
                  Lines & strokes
                </span>
                {openLines ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openLines && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={overrides.strokeWidthOverride}
                        onChange={(e) => updateOverride('strokeWidthOverride', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      Override stroke width
                    </label>
                    {overrides.strokeWidthOverride && (
                      <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <input
                          type="number"
                          min={0}
                          step={0.5}
                          value={overrides.strokeWidth}
                          onChange={(e) => updateOverride('strokeWidth', Math.max(0, Number(e.target.value) || 0))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stroke dash (e.g. 5,5 or 10,5,2,5)
                    </label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                      <input
                        type="text"
                        value={overrides.strokeDashArray}
                        onChange={(e) => updateOverride('strokeDashArray', e.target.value)}
                        placeholder="Solid line if empty"
                        className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Line cap</label>
                      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <select
                          value={overrides.strokeLinecap}
                          onChange={(e) => updateOverride('strokeLinecap', e.target.value as SvgOverrides['strokeLinecap'])}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        >
                          <option value="butt">Butt</option>
                          <option value="round">Round</option>
                          <option value="square">Square</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Line join</label>
                      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <select
                          value={overrides.strokeLinejoin}
                          onChange={(e) => updateOverride('strokeLinejoin', e.target.value as SvgOverrides['strokeLinejoin'])}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        >
                          <option value="miter">Miter</option>
                          <option value="round">Round</option>
                          <option value="bevel">Bevel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced: Border / frame */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden ring-1 ring-slate-900/5 transition-shadow hover:shadow-md">
              <button
                type="button"
                onClick={() => setOpenBorder(!openBorder)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500/20 rounded-t-2xl"
                aria-expanded={openBorder}
              >
                <span className="flex items-center gap-2">
                  <Frame className="w-4 h-4" />
                  Border / frame
                </span>
                {openBorder ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openBorder && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border width (px)</label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  {borderWidth > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Border color</label>
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2">
                        <input
                          type="color"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className="h-9 w-11 flex-shrink-0 rounded border border-gray-300 cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className="min-w-0 flex-1 px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
          </div>

          {/* Right: Preview (70%) - aligned after the 30% code column */}
          <section className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col ring-1 ring-slate-900/5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 shrink-0">
              <h2 className="text-base font-semibold text-slate-800">Preview</h2>
              {previewStatus === 'success' && (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md ring-1 ring-emerald-600/20">
                  Live
                </span>
              )}
              {previewStatus === 'error' && (
                <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-md ring-1 ring-red-600/20">
                  Invalid SVG
                </span>
              )}
            </div>
            <div
              className="flex-1 min-h-[280px] p-6 flex items-center justify-center overflow-auto"
              style={{
                backgroundImage: 'linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                backgroundColor: '#e2e8f0',
              }}
            >
              {!svgInput.trim() ? (
                <div className="text-center max-w-sm">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-slate-200/80 flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6 text-slate-500" aria-hidden />
                  </div>
                  <p className="text-slate-600 font-medium">Preview will appear here</p>
                  <p className="text-sm text-slate-500 mt-1">Paste SVG code or click Sample to get started</p>
                </div>
              ) : (
                <div
                  className="inline-block"
                  style={{
                    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : undefined,
                    backgroundColor: borderWidth > 0 ? borderColor : undefined,
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      padding: padding > 0 ? `${padding}px` : undefined,
                      backgroundColor: !bgTransparent ? bgColor : undefined,
                      display: 'inline-block',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        transform: `rotate(${rotateDeg}deg) scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <div ref={previewWrapRef} className="[&_svg]:block" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 flex items-center justify-center gap-2 flex-wrap">
          <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden />
          All processing runs in your browser. Your SVG and exports never leave your device.
        </p>
      </main>
    </div>
  );
}
