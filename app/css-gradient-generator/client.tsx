'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Copy, Check, RotateCcw, Plus, Trash2, Shuffle, Repeat2, Share2, Download } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';
import { createPortal } from 'react-dom';

// ── Types ────────────────────────────────────────────────────────────────────

type GradientType = 'linear' | 'radial' | 'conic';
type PreviewShape = 'rect' | 'circle' | 'pill' | 'button' | 'card' | 'text';
type RadialSize  = 'farthest-corner' | 'farthest-side' | 'closest-corner' | 'closest-side';
type ExportTab   = 'css' | 'tailwind' | 'scss' | 'cssvar' | 'animation' | 'svg';
type AnimStyle   = 'shift' | 'pulse' | 'rotate';

interface ColorStop {
  id: number;
  color: string;    // 6-digit hex
  position: number; // 0–100
  opacity: number;  // 0–100
}

// ── Helpers ──────────────────────────────────────────────────────────────────

let _id = 1;
const uid = () => _id++;

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function stopColor(s: ColorStop): string {
  if (s.opacity === 100) return s.color;
  const r = parseInt(s.color.slice(1, 3), 16);
  const g = parseInt(s.color.slice(3, 5), 16);
  const b = parseInt(s.color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${(s.opacity / 100).toFixed(2)})`;
}

function buildCss(
  type: GradientType,
  stops: ColorStop[],
  angle: number,
  radialShape: string,
  radialSize: RadialSize,
  radialX: number,
  radialY: number,
  conicFrom: number,
  conicX: number,
  conicY: number,
  repeating: boolean,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map(s => `${stopColor(s)} ${s.position}%`).join(', ');
  const pre = repeating ? 'repeating-' : '';
  if (type === 'linear') return `${pre}linear-gradient(${angle}deg, ${stopsStr})`;
  if (type === 'radial')  return `${pre}radial-gradient(${radialShape} ${radialSize} at ${radialX}% ${radialY}%, ${stopsStr})`;
  return `${pre}conic-gradient(from ${conicFrom}deg at ${conicX}% ${conicY}%, ${stopsStr})`;
}

function buildAnimationCss(
  type: GradientType,
  stops: ColorStop[],
  angle: number,
  radialShape: string,
  radialSize: RadialSize,
  radialX: number,
  radialY: number,
  conicFrom: number,
  conicX: number,
  conicY: number,
  repeating: boolean,
  duration: number,
  animStyle: AnimStyle,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);

  if (animStyle === 'shift') {
    const doubled = [
      ...sorted.map(s => `${stopColor(s)} ${(s.position / 2).toFixed(1)}%`),
      ...sorted.map(s => `${stopColor(s)} ${(50 + s.position / 2).toFixed(1)}%`),
    ].join(', ');
    let bg: string;
    if (type === 'linear')      bg = `linear-gradient(${angle}deg, ${doubled})`;
    else if (type === 'radial') bg = `radial-gradient(${radialShape} ${radialSize} at ${radialX}% ${radialY}%, ${doubled})`;
    else                        bg = `conic-gradient(from ${conicFrom}deg at ${conicX}% ${conicY}%, ${doubled})`;
    return `.animated-gradient {
  background: ${bg};
  background-size: 200% 100%;
  animation: gradientShift ${duration}s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
  }

  if (animStyle === 'pulse') {
    const baseCss = buildCss(type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating);
    return `.animated-gradient {
  background: ${baseCss};
  animation: gradientPulse ${duration}s ease-in-out infinite;
}

@keyframes gradientPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
}`;
  }

  // rotate — linear only
  if (type === 'linear') {
    const stopsStr = sorted.map(s => `${stopColor(s)} ${s.position}%`).join(', ');
    return `.animated-gradient {
  --grad-angle: ${angle}deg;
  background: linear-gradient(var(--grad-angle), ${stopsStr});
  animation: gradientRotate ${duration}s linear infinite;
}

/* @property enables custom property interpolation */
@property --grad-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes gradientRotate {
  0%   { --grad-angle: 0deg; }
  100% { --grad-angle: 360deg; }
}`;
  }

  // Rotate on non-linear: fall back to pulse
  const baseCss = buildCss(type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating);
  return `.animated-gradient {
  background: ${baseCss};
  animation: gradientPulse ${duration}s ease-in-out infinite;
}

/* Note: Rotate only works on linear gradients — falling back to Pulse */
@keyframes gradientPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
}`;
}

function buildSvgExport(
  type: GradientType,
  stops: ColorStop[],
  angle: number,
  radialX: number,
  radialY: number,
): { svg: string; note: string | null } {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsXml = sorted
    .map(s => `      <stop offset="${s.position}%" style="stop-color:${s.color};stop-opacity:${(s.opacity / 100).toFixed(2)}" />`)
    .join('\n');

  if (type === 'conic') {
    const s0 = sorted[0];
    const sN = sorted[sorted.length - 1];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="${s0.position}%" style="stop-color:${s0.color};stop-opacity:${(s0.opacity / 100).toFixed(2)}" />
      <stop offset="${sN.position}%" style="stop-color:${sN.color};stop-opacity:${(sN.opacity / 100).toFixed(2)}" />
    </linearGradient>
  </defs>
  <rect width="400" height="200" fill="url(#grad)" />
</svg>`;
    return { svg, note: 'Conic gradients are not supported in SVG — exported as linear' };
  }

  if (type === 'linear') {
    const rad = ((angle - 90) * Math.PI) / 180;
    const x1 = Math.round((0.5 - Math.sin(rad) * 0.5) * 100);
    const y1 = Math.round((0.5 - Math.cos(rad) * 0.5) * 100);
    const x2 = Math.round((0.5 + Math.sin(rad) * 0.5) * 100);
    const y2 = Math.round((0.5 + Math.cos(rad) * 0.5) * 100);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${stopsXml}
    </linearGradient>
  </defs>
  <rect width="400" height="200" fill="url(#grad)" />
</svg>`;
    return { svg, note: null };
  }

  // radial
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <radialGradient id="grad" cx="${radialX}%" cy="${radialY}%" r="50%" fx="${radialX}%" fy="${radialY}%">
${stopsXml}
    </radialGradient>
  </defs>
  <rect width="400" height="200" fill="url(#grad)" />
</svg>`;
  return { svg, note: null };
}

// ── Presets ──────────────────────────────────────────────────────────────────

interface Preset {
  name: string;
  type: GradientType;
  angle: number;
  stops: Omit<ColorStop, 'id'>[];
}

const PRESETS: Preset[] = [
  // ── Linear
  { name: 'Ocean Drift',  type: 'linear', angle: 135, stops: [{ color: '#667eea', position: 0, opacity: 100 }, { color: '#764ba2', position: 100, opacity: 100 }] },
  { name: 'Sunset',       type: 'linear', angle: 120, stops: [{ color: '#f093fb', position: 0, opacity: 100 }, { color: '#f5576c', position: 100, opacity: 100 }] },
  { name: 'Neon City',    type: 'linear', angle: 90,  stops: [{ color: '#06b6d4', position: 0, opacity: 100 }, { color: '#a855f7', position: 50, opacity: 100 }, { color: '#ec4899', position: 100, opacity: 100 }] },
  { name: 'Candy',        type: 'linear', angle: 135, stops: [{ color: '#f43f5e', position: 0, opacity: 100 }, { color: '#f59e0b', position: 50, opacity: 100 }, { color: '#a855f7', position: 100, opacity: 100 }] },
  { name: 'Midnight',     type: 'linear', angle: 180, stops: [{ color: '#0f0c29', position: 0, opacity: 100 }, { color: '#302b63', position: 50, opacity: 100 }, { color: '#24243e', position: 100, opacity: 100 }] },
  { name: 'Forest',       type: 'linear', angle: 135, stops: [{ color: '#134e5e', position: 0, opacity: 100 }, { color: '#71b280', position: 100, opacity: 100 }] },
  { name: 'Fire',         type: 'linear', angle: 45,  stops: [{ color: '#f7971e', position: 0, opacity: 100 }, { color: '#ff5e62', position: 100, opacity: 100 }] },
  { name: 'Rose Gold',    type: 'linear', angle: 135, stops: [{ color: '#f4a261', position: 0, opacity: 100 }, { color: '#e76f51', position: 50, opacity: 100 }, { color: '#b5838d', position: 100, opacity: 100 }] },
  { name: 'Peach',        type: 'linear', angle: 135, stops: [{ color: '#ffecd2', position: 0, opacity: 100 }, { color: '#fcb69f', position: 100, opacity: 100 }] },
  { name: 'Mint Fresh',   type: 'linear', angle: 135, stops: [{ color: '#a8edea', position: 0, opacity: 100 }, { color: '#fed6e3', position: 100, opacity: 100 }] },
  { name: 'Silver',       type: 'linear', angle: 135, stops: [{ color: '#bdc3c7', position: 0, opacity: 100 }, { color: '#2c3e50', position: 100, opacity: 100 }] },
  { name: 'Deep Sea',     type: 'linear', angle: 180, stops: [{ color: '#00243c', position: 0, opacity: 100 }, { color: '#00617a', position: 50, opacity: 100 }, { color: '#00b5b5', position: 100, opacity: 100 }] },
  { name: 'Fade Black',   type: 'linear', angle: 180, stops: [{ color: '#000000', position: 0, opacity: 0 }, { color: '#000000', position: 100, opacity: 100 }] },
  { name: 'Glass',        type: 'linear', angle: 135, stops: [{ color: '#ffffff', position: 0, opacity: 25 }, { color: '#ffffff', position: 100, opacity: 5 }] },
  // ── Radial
  { name: 'Aurora',       type: 'radial', angle: 0, stops: [{ color: '#2af598', position: 0, opacity: 100 }, { color: '#009efd', position: 50, opacity: 100 }, { color: '#7928ca', position: 100, opacity: 100 }] },
  { name: 'Solar',        type: 'radial', angle: 0, stops: [{ color: '#fff176', position: 0, opacity: 100 }, { color: '#ffd600', position: 40, opacity: 100 }, { color: '#ff6f00', position: 100, opacity: 100 }] },
  { name: 'Neon Pulse',   type: 'radial', angle: 0, stops: [{ color: '#39ff14', position: 0, opacity: 100 }, { color: '#0d0d0d', position: 100, opacity: 100 }] },
  { name: 'Soft Glow',    type: 'radial', angle: 0, stops: [{ color: '#f8f9fa', position: 0, opacity: 100 }, { color: '#e2d9f3', position: 100, opacity: 100 }] },
  // ── Conic
  { name: 'Rainbow',      type: 'conic', angle: 0, stops: [{ color: '#f43f5e', position: 0, opacity: 100 }, { color: '#f59e0b', position: 17, opacity: 100 }, { color: '#22c55e', position: 33, opacity: 100 }, { color: '#06b6d4', position: 50, opacity: 100 }, { color: '#6366f1', position: 67, opacity: 100 }, { color: '#ec4899', position: 83, opacity: 100 }, { color: '#f43f5e', position: 100, opacity: 100 }] },
  { name: 'Color Wheel',  type: 'conic', angle: 0, stops: [{ color: '#ff0000', position: 0, opacity: 100 }, { color: '#ffff00', position: 25, opacity: 100 }, { color: '#00ff00', position: 50, opacity: 100 }, { color: '#0000ff', position: 75, opacity: 100 }, { color: '#ff0000', position: 100, opacity: 100 }] },
  { name: 'Conic Soft',   type: 'conic', angle: 45, stops: [{ color: '#a855f7', position: 0, opacity: 100 }, { color: '#ec4899', position: 50, opacity: 100 }, { color: '#a855f7', position: 100, opacity: 100 }] },
];

function presetCss(p: Preset): string {
  return buildCss(p.type, p.stops.map((s, i) => ({ ...s, id: i })), p.angle, 'ellipse', 'farthest-corner', 50, 50, 0, 50, 50, false);
}

// ── CopyBtn ──────────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} }}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
      {ok ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

// ── GradientBar (interactive) ─────────────────────────────────────────────────

function GradientBar({ css, stops, onAdd, onUpdate, onRemove }: {
  css: string;
  stops: ColorStop[];
  onAdd: (position: number) => void;
  onUpdate: (id: number, patch: Partial<ColorStop>) => void;
  onRemove: (id: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<number | null>(null);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-handle]')) return;
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    onAdd(pos);
  };

  const startDrag = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    draggingId.current = id;

    const onMove = (ev: MouseEvent) => {
      if (!barRef.current || draggingId.current === null) return;
      const rect = barRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min(100, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
      onUpdate(draggingId.current, { position: pos });
    };
    const onUp = () => {
      draggingId.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Gradient Bar</p>
        <p className="text-[10px] text-zinc-400">Click to add · Drag to move · Double-click to remove</p>
      </div>
      <div
        ref={barRef}
        onClick={handleBarClick}
        className="relative h-10 w-full rounded-xl cursor-crosshair select-none border border-zinc-200 shadow-inner"
        style={{ background: css }}
      >
        <div className="absolute inset-0 rounded-xl -z-10"
          style={{ backgroundImage: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%)', backgroundSize: '12px 12px' }} />
        {stops.map(stop => (
          <div
            key={stop.id}
            data-handle="true"
            onMouseDown={e => startDrag(e, stop.id)}
            onDoubleClick={e => { e.stopPropagation(); onRemove(stop.id); }}
            title={`${stop.color} at ${stop.position}%\n(double-click to remove)`}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-7 w-3.5 rounded cursor-grab active:cursor-grabbing shadow-lg border-2 border-white ring-1 ring-black/10 transition-transform hover:scale-110 z-10"
            style={{ left: `${stop.position}%`, background: stopColor(stop) }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Tool ─────────────────────────────────────────────────────────────────

function GradientTool() {
  // gradient state
  const [type,        setType]        = useState<GradientType>('linear');
  const [angle,       setAngle]       = useState(135);
  const [radialShape, setRadialShape] = useState<'ellipse' | 'circle'>('ellipse');
  const [radialSize,  setRadialSize]  = useState<RadialSize>('farthest-corner');
  const [radialX,     setRadialX]     = useState(50);
  const [radialY,     setRadialY]     = useState(50);
  const [conicFrom,   setConicFrom]   = useState(0);
  const [conicX,      setConicX]      = useState(50);
  const [conicY,      setConicY]      = useState(50);
  const [repeating,   setRepeating]   = useState(false);
  const [stops,       setStops]       = useState<ColorStop[]>([
    { id: uid(), color: '#667eea', position: 0,   opacity: 100 },
    { id: uid(), color: '#764ba2', position: 100, opacity: 100 },
  ]);

  // ── Undo/Redo history ─────────────────────────────────────────────────────
  const histRef    = useRef<ColorStop[][]>([]);
  const histIdxRef = useRef(-1);
  const [histMeta, setHistMeta] = useState({ index: 0, total: 1 });

  // Seed history with initial stops on mount
  useEffect(() => {
    setStops(prev => {
      histRef.current    = [prev];
      histIdxRef.current = 0;
      setHistMeta({ index: 0, total: 1 });
      return prev;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const commitStops = useCallback((updater: ColorStop[] | ((prev: ColorStop[]) => ColorStop[])) => {
    setStops(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const trimmed = histRef.current.slice(0, histIdxRef.current + 1);
      const newHist = [...trimmed, next].slice(-50);
      histRef.current    = newHist;
      histIdxRef.current = newHist.length - 1;
      setHistMeta({ index: histIdxRef.current, total: newHist.length });
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (histIdxRef.current <= 0) return;
    histIdxRef.current -= 1;
    setStops(histRef.current[histIdxRef.current]);
    setHistMeta({ index: histIdxRef.current, total: histRef.current.length });
  }, []);

  const redo = useCallback(() => {
    if (histIdxRef.current >= histRef.current.length - 1) return;
    histIdxRef.current += 1;
    setStops(histRef.current[histIdxRef.current]);
    setHistMeta({ index: histIdxRef.current, total: histRef.current.length });
  }, []);

  // Keyboard shortcuts: Cmd+Z / Cmd+Shift+Z / Cmd+Y
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? e.metaKey : e.ctrlKey;
      if (!mod) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  // ── Animation state ───────────────────────────────────────────────────────
  const [animDuration, setAnimDuration] = useState(4);
  const [animStyle,    setAnimStyle]    = useState<AnimStyle>('shift');
  const [animPreview,  setAnimPreview]  = useState(false);

  // UI state
  const [previewShape, setPreviewShape] = useState<PreviewShape>('rect');
  const [activePreset, setActivePreset] = useState<string | null>('Ocean Drift');
  const [exportTab,    setExportTab]    = useState<ExportTab>('css');
  const [mounted,      setMounted]      = useState(false);
  const [toast,        setToast]        = useState('');

  useEffect(() => { setMounted(true); }, []);

  // computed
  const css = useMemo(
    () => buildCss(type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating),
    [type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating],
  );

  const exports = useMemo(() => ({
    css:    `background: ${css};`,
    tw:     `bg-[${css.replace(/ /g, '_')}]`,
    scss:   `$gradient: ${css};\n\n.element {\n  background: $gradient;\n}`,
    cssvar: `:root {\n  --gradient: ${css};\n}\n\n.element {\n  background: var(--gradient);\n}`,
  }), [css]);

  const animCss = useMemo(
    () => buildAnimationCss(type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating, animDuration, animStyle),
    [type, stops, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating, animDuration, animStyle],
  );

  const svgExport = useMemo(
    () => buildSvgExport(type, stops, angle, radialX, radialY),
    [type, stops, angle, radialX, radialY],
  );

  // Animation live-preview inline styles
  const animPreviewStyle = useMemo((): React.CSSProperties => {
    if (!animPreview) return { background: css };
    const sorted = [...stops].sort((a, b) => a.position - b.position);

    if (animStyle === 'shift') {
      const doubled = [
        ...sorted.map(s => `${stopColor(s)} ${(s.position / 2).toFixed(1)}%`),
        ...sorted.map(s => `${stopColor(s)} ${(50 + s.position / 2).toFixed(1)}%`),
      ].join(', ');
      let bg: string;
      if (type === 'linear')      bg = `linear-gradient(${angle}deg, ${doubled})`;
      else if (type === 'radial') bg = `radial-gradient(${radialShape} ${radialSize} at ${radialX}% ${radialY}%, ${doubled})`;
      else                        bg = `conic-gradient(from ${conicFrom}deg at ${conicX}% ${conicY}%, ${doubled})`;
      return { background: bg, backgroundSize: '200% 100%', animation: `liveGradShift ${animDuration}s ease infinite` };
    }

    if (animStyle === 'pulse') {
      return { background: css, animation: `liveGradPulse ${animDuration}s ease-in-out infinite` };
    }

    // rotate
    if (type === 'linear') {
      const stopsStr = sorted.map(s => `${stopColor(s)} ${s.position}%`).join(', ');
      return {
        background: `linear-gradient(var(--grad-angle-live), ${stopsStr})`,
        animation: `liveGradRotate ${animDuration}s linear infinite`,
      } as React.CSSProperties;
    }
    // non-linear rotate → pulse fallback
    return { background: css, animation: `liveGradPulse ${animDuration}s ease-in-out infinite` };
  }, [animPreview, animStyle, animDuration, stops, type, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, css]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  // actions
  const applyPreset = useCallback((p: Preset) => {
    setType(p.type);
    setAngle(p.angle);
    commitStops(p.stops.map(s => ({ ...s, id: uid() })));
    setActivePreset(p.name);
    setRepeating(false);
  }, [commitStops]);

  const addStop = useCallback((position = 50) => {
    commitStops(prev => [...prev, { id: uid(), color: randomHex(), position, opacity: 100 }]);
    setActivePreset(null);
  }, [commitStops]);

  const removeStop = useCallback((id: number) => {
    commitStops(prev => prev.length > 2 ? prev.filter(s => s.id !== id) : prev);
  }, [commitStops]);

  const updateStop = useCallback((id: number, patch: Partial<ColorStop>) => {
    commitStops(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
    setActivePreset(null);
  }, [commitStops]);

  const randomize = useCallback(() => {
    commitStops(prev => prev.map(s => ({ ...s, color: randomHex() })));
    setActivePreset(null);
  }, [commitStops]);

  const reverse = useCallback(() => {
    commitStops(prev => {
      const sorted = [...prev].sort((a, b) => a.position - b.position);
      return sorted.map((s, i) => ({ ...s, position: sorted[sorted.length - 1 - i].position }));
    });
    setActivePreset(null);
  }, [commitStops]);

  const downloadSvg = useCallback(() => {
    const { svg } = buildSvgExport(type, stops, angle, radialX, radialY);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'gradient.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [type, stops, angle, radialX, radialY]);

  const handleShare = useCallback(() => {
    try {
      const data = { type, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating, stops };
      const enc = btoa(encodeURIComponent(JSON.stringify(data)));
      navigator.clipboard.writeText(`${location.origin}${location.pathname}#g=${enc}`);
      showToast('Share URL copied!');
    } catch { showToast('Failed to copy'); }
  }, [type, angle, radialShape, radialSize, radialX, radialY, conicFrom, conicX, conicY, repeating, stops, showToast]);

  // load from URL hash
  useEffect(() => {
    try {
      const h = location.hash;
      if (!h.startsWith('#g=')) return;
      const d = JSON.parse(decodeURIComponent(atob(h.slice(3))));
      if (d.type)       setType(d.type);
      if (d.angle !== undefined) setAngle(d.angle);
      if (d.radialShape) setRadialShape(d.radialShape);
      if (d.radialSize)  setRadialSize(d.radialSize);
      if (d.radialX !== undefined) setRadialX(d.radialX);
      if (d.radialY !== undefined) setRadialY(d.radialY);
      if (d.conicFrom !== undefined) setConicFrom(d.conicFrom);
      if (d.conicX !== undefined) setConicX(d.conicX);
      if (d.conicY !== undefined) setConicY(d.conicY);
      if (d.repeating !== undefined) setRepeating(d.repeating);
      if (Array.isArray(d.stops)) {
        const newStops = d.stops.map((s: ColorStop) => ({ ...s, id: uid() }));
        histRef.current    = [newStops];
        histIdxRef.current = 0;
        setHistMeta({ index: 0, total: 1 });
        setStops(newStops);
      }
      setActivePreset(null);
    } catch {}
  }, []);

  // click on preview to set radial/conic center
  const handlePreviewClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (type !== 'radial' && type !== 'conic') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    if (type === 'radial') { setRadialX(x); setRadialY(y); }
    else { setConicX(x); setConicY(y); }
    setActivePreset(null);
  }, [type]);

  // Export tab content
  const exportContent = useMemo(() => {
    switch (exportTab) {
      case 'css':       return { text: exports.css,    color: 'text-emerald-400' };
      case 'tailwind':  return { text: exports.tw,     color: 'text-sky-400' };
      case 'scss':      return { text: exports.scss,   color: 'text-pink-400' };
      case 'cssvar':    return { text: exports.cssvar, color: 'text-violet-400' };
      case 'animation': return { text: animCss,        color: 'text-orange-400' };
      case 'svg':       return { text: svgExport.svg,  color: 'text-cyan-400' };
    }
  }, [exportTab, exports, animCss, svgExport]);

  const SHAPES: { id: PreviewShape; label: string }[] = [
    { id: 'rect',   label: '▬ Rect' },
    { id: 'circle', label: '● Circle' },
    { id: 'pill',   label: '⬭ Pill' },
    { id: 'button', label: '▣ Button' },
    { id: 'card',   label: '🃏 Card' },
    { id: 'text',   label: 'A Text' },
  ];

  const RADIAL_SIZES: { value: RadialSize; label: string }[] = [
    { value: 'farthest-corner', label: 'Farthest Corner' },
    { value: 'farthest-side',   label: 'Farthest Side' },
    { value: 'closest-corner',  label: 'Closest Corner' },
    { value: 'closest-side',    label: 'Closest Side' },
  ];

  const DIR_GRID: (number | null)[] = [315, 0, 45, 270, null, 90, 225, 180, 135];
  const DIR_ARROW = ['↖','↑','↗','←','','→','↙','↓','↘'];

  const canUndo = histMeta.index > 0;
  const canRedo = histMeta.index < histMeta.total - 1;

  const exportCopyLabel: Record<ExportTab, string> = {
    css: 'Copy CSS', tailwind: 'Copy Tailwind', scss: 'Copy SCSS',
    cssvar: 'Copy CSS Var', animation: 'Copy Animation', svg: 'Copy SVG',
  };

  return (
    <div className="divide-y divide-zinc-100">

      {/* Injected keyframes for live animation preview */}
      <style>{`
        @keyframes liveGradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes liveGradPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }
        @property --grad-angle-live {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes liveGradRotate {
          0%   { --grad-angle-live: 0deg; }
          100% { --grad-angle-live: 360deg; }
        }
      `}</style>

      {/* ── Presets ── */}
      <div className="bg-zinc-50 px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Presets <span className="text-zinc-300 font-normal normal-case">({PRESETS.length})</span></p>
          <button onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-zinc-500 bg-white border border-zinc-200 hover:border-blue-300 hover:text-blue-600 transition">
            <Share2 className="h-3 w-3" /> Share
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => applyPreset(p)} title={p.name}
              className={`h-7 w-7 rounded-lg border-2 transition hover:scale-110 active:scale-95 ${activePreset === p.name ? 'border-blue-500 scale-110 shadow-md' : 'border-white shadow-sm'}`}
              style={{ background: presetCss(p) }}
            />
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="grid lg:grid-cols-[1fr_360px] lg:divide-x lg:divide-zinc-100">

        {/* Left — preview + bar + export */}
        <div className="flex flex-col divide-y divide-zinc-100">

          {/* Preview canvas */}
          <div
            onClick={handlePreviewClick}
            className={`relative flex items-center justify-center p-6 min-h-[260px] ${(type === 'radial' || type === 'conic') ? 'cursor-crosshair' : ''}`}
            style={{ background: 'radial-gradient(#ddd 1px, #f8f8f8 1px)', backgroundSize: '16px 16px' }}
          >
            {(type === 'radial' || type === 'conic') && (
              <div className="absolute top-2 right-2 rounded-lg bg-white/80 px-2 py-1 text-[10px] text-zinc-500 backdrop-blur-sm border border-zinc-200 pointer-events-none">
                Click to move center
              </div>
            )}
            {animPreview && (
              <div className="absolute top-2 left-2 rounded-lg bg-orange-50 border border-orange-200 px-2 py-1 text-[10px] text-orange-600 font-semibold pointer-events-none">
                ▶ Animating
              </div>
            )}

            {previewShape === 'rect' && (
              <div className="w-full max-w-sm h-44 rounded-2xl shadow-xl" style={animPreviewStyle} />
            )}
            {previewShape === 'circle' && (
              <div className="h-44 w-44 rounded-full shadow-xl" style={animPreviewStyle} />
            )}
            {previewShape === 'pill' && (
              <div className="h-14 w-60 rounded-full shadow-xl" style={animPreviewStyle} />
            )}
            {previewShape === 'button' && (
              <button className="px-8 py-3 rounded-xl text-white font-bold text-lg shadow-xl select-none pointer-events-none" style={animPreviewStyle}>
                Click me
              </button>
            )}
            {previewShape === 'text' && (
              <div className="text-5xl font-black tracking-tight select-none"
                style={{ ...animPreviewStyle, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Hello World
              </div>
            )}
            {previewShape === 'card' && (
              <div className="w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden pointer-events-none">
                <div className="h-24" style={animPreviewStyle} />
                <div className="bg-white p-4">
                  <div className="h-3 w-24 rounded-full bg-zinc-200 mb-2" />
                  <div className="h-2 w-40 rounded-full bg-zinc-100 mb-1" />
                  <div className="h-2 w-32 rounded-full bg-zinc-100" />
                  <div className="mt-3 h-7 w-20 rounded-lg" style={animPreviewStyle} />
                </div>
              </div>
            )}
          </div>

          {/* Preview shape selector */}
          <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-white">
            {SHAPES.map(s => (
              <button key={s.id} onClick={() => setPreviewShape(s.id)}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${previewShape === s.id ? 'bg-blue-50 text-blue-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Interactive gradient bar */}
          <div className="px-4 py-3">
            <GradientBar css={css} stops={stops} onAdd={addStop} onUpdate={updateStop} onRemove={removeStop} />
          </div>

          {/* Export */}
          <div className="p-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Export</p>

            {/* Tab row 1: CSS / Tailwind / SCSS / CSS Var */}
            <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
              {(['css','tailwind','scss','cssvar'] as ExportTab[]).map(t => (
                <button key={t} onClick={() => setExportTab(t)}
                  className={`flex-1 rounded-md py-1 text-[11px] font-semibold transition capitalize ${exportTab === t ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                  {t === 'cssvar' ? 'CSS Var' : t === 'tailwind' ? 'Tailwind' : t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab row 2: Animation / SVG */}
            <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
              <button onClick={() => setExportTab('animation')}
                className={`flex-1 rounded-md py-1 text-[11px] font-semibold transition ${exportTab === 'animation' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                Animation
              </button>
              <button onClick={() => setExportTab('svg')}
                className={`flex-1 rounded-md py-1 text-[11px] font-semibold transition ${exportTab === 'svg' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                SVG
              </button>
            </div>

            {/* Animation controls */}
            {exportTab === 'animation' && (
              <div className="flex flex-wrap items-center gap-3 rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600">
                  Duration
                  <input type="number" min={1} max={10} value={animDuration}
                    onChange={e => setAnimDuration(Math.max(1, Math.min(10, Number(e.target.value))))}
                    className="w-12 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 text-[11px] text-center outline-none focus:border-blue-400" />
                  <span className="text-zinc-400 font-normal">s</span>
                </label>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600">
                  Style
                  <select value={animStyle} onChange={e => setAnimStyle(e.target.value as AnimStyle)}
                    className="rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 text-[11px] outline-none focus:border-blue-400 cursor-pointer">
                    <option value="shift">Shift</option>
                    <option value="pulse">Pulse</option>
                    <option value="rotate">Rotate{type !== 'linear' ? ' (linear only)' : ''}</option>
                  </select>
                </label>
                <button onClick={() => setAnimPreview(v => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${animPreview ? 'bg-orange-100 text-orange-700' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                  {animPreview ? '⏸ Stop preview' : '▶ Preview animation'}
                </button>
              </div>
            )}

            {/* SVG conic note */}
            {exportTab === 'svg' && svgExport.note && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-[11px] text-amber-700">
                ⚠ {svgExport.note}
              </div>
            )}

            {/* Code block */}
            <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] leading-relaxed break-all min-h-[56px] max-h-[220px] overflow-auto">
              <span className={`${exportContent.color} whitespace-pre-wrap`}>{exportContent.text}</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <CopyBtn text={exportContent.text} label={exportCopyLabel[exportTab]} />
              {exportTab === 'svg' && (
                <button onClick={downloadSvg}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 transition">
                  <Download className="h-3 w-3" /> Download SVG
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right — controls */}
        <div className="flex flex-col divide-y divide-zinc-100 overflow-y-auto" style={{ maxHeight: '900px' }}>

          {/* Type + Repeating */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Type</p>
              <button onClick={() => setRepeating(v => !v)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition ${repeating ? 'bg-violet-100 text-violet-700' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                <Repeat2 className="h-3 w-3" /> Repeating
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-zinc-100 p-1">
              {(['linear','radial','conic'] as GradientType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`rounded-lg py-1.5 text-[11px] font-semibold capitalize transition ${type === t ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* ── Linear controls ── */}
            {type === 'linear' && (
              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Direction</p>
                  <div className="grid grid-cols-3 gap-1.5" style={{ width: 120 }}>
                    {DIR_GRID.map((deg, i) =>
                      deg === null ? (
                        <div key={i} className="h-9 w-9 flex items-center justify-center text-[10px] font-bold text-zinc-500 rounded-lg bg-blue-50 border border-blue-100">
                          {angle}°
                        </div>
                      ) : (
                        <button key={i} onClick={() => setAngle(deg)} title={`${deg}°`}
                          className={`h-9 w-9 rounded-lg text-base transition ${angle === deg ? 'bg-blue-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
                          {DIR_ARROW[i]}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Angle</span>
                    <span className="text-[12px] font-bold text-zinc-700 tabular-nums">{angle}°</span>
                  </div>
                  <input type="range" min={0} max={360} value={angle}
                    onChange={e => { setAngle(Number(e.target.value)); setActivePreset(null); }}
                    className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                </div>
              </div>
            )}

            {/* ── Radial controls ── */}
            {type === 'radial' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {(['ellipse','circle'] as const).map(s => (
                    <button key={s} onClick={() => setRadialShape(s)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold capitalize transition ${radialShape === s ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Size</p>
                  <select value={radialSize} onChange={e => setRadialSize(e.target.value as RadialSize)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[12px] text-zinc-700 outline-none focus:border-blue-400 cursor-pointer">
                    {RADIAL_SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Center Position <span className="font-normal normal-case text-zinc-300">(or click preview)</span></p>
                  <div className="grid grid-cols-2 gap-3">
                    {[['X', radialX, setRadialX] as const, ['Y', radialY, setRadialY] as const].map(([label, val, setter]) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">{label}</span>
                          <span className="text-[12px] font-bold text-zinc-700 tabular-nums">{val}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={val}
                          onChange={e => { setter(Number(e.target.value)); setActivePreset(null); }}
                          className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Conic controls ── */}
            {type === 'conic' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">From Angle</span>
                    <span className="text-[12px] font-bold text-zinc-700 tabular-nums">{conicFrom}°</span>
                  </div>
                  <input type="range" min={0} max={360} value={conicFrom}
                    onChange={e => { setConicFrom(Number(e.target.value)); setActivePreset(null); }}
                    className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Center Position <span className="font-normal normal-case text-zinc-300">(or click preview)</span></p>
                  <div className="grid grid-cols-2 gap-3">
                    {[['X', conicX, setConicX] as const, ['Y', conicY, setConicY] as const].map(([label, val, setter]) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">{label}</span>
                          <span className="text-[12px] font-bold text-zinc-700 tabular-nums">{val}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={val}
                          onChange={e => { setter(Number(e.target.value)); setActivePreset(null); }}
                          className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color stops */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Color Stops <span className="text-zinc-300 font-normal">({stops.length})</span>
              </p>
              <div className="flex items-center gap-1">
                {/* Undo / step count / Redo */}
                <button onClick={undo} disabled={!canUndo} title="Undo (Cmd+Z)"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-[13px] text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 transition select-none">
                  ⟲
                </button>
                <span className="text-[9px] text-zinc-400 tabular-nums select-none px-0.5">
                  {histMeta.index + 1}/{histMeta.total}
                </span>
                <button onClick={redo} disabled={!canRedo} title="Redo (Cmd+Shift+Z)"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-[13px] text-zinc-500 hover:bg-zinc-200 disabled:opacity-30 transition select-none">
                  ⟳
                </button>
                <div className="w-px h-4 bg-zinc-200 mx-0.5" />
                <button onClick={randomize} title="Randomize colors"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-violet-100 hover:text-violet-600 transition">
                  <Shuffle className="h-3 w-3" />
                </button>
                <button onClick={reverse} title="Reverse order"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-amber-100 hover:text-amber-600 transition">
                  <RotateCcw className="h-3 w-3" />
                </button>
                <button onClick={() => addStop()} title="Add stop"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {[...stops].sort((a, b) => a.position - b.position).map(stop => (
                <div key={stop.id} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-2.5 space-y-2">
                  {/* Color + position header */}
                  <div className="flex items-center gap-2">
                    <input type="color" value={stop.color}
                      onChange={e => updateStop(stop.id, { color: e.target.value })}
                      className="h-8 w-8 cursor-pointer rounded-lg border border-zinc-200 bg-white p-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-zinc-600 leading-none">{stop.color}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">at {stop.position}%</p>
                    </div>
                    {/* Color preview with transparency */}
                    <div className="h-7 w-7 rounded-lg border border-zinc-200 shrink-0 overflow-hidden relative">
                      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%)', backgroundSize: '6px 6px' }} />
                      <div className="absolute inset-0 rounded-lg" style={{ background: stopColor(stop) }} />
                    </div>
                    <button onClick={() => removeStop(stop.id)} disabled={stops.length <= 2}
                      className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 hover:text-red-500 disabled:opacity-30 transition shrink-0">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  {/* Position slider */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[9px] font-bold uppercase tracking-wide text-zinc-400 shrink-0">Position</span>
                    <input type="range" min={0} max={100} value={stop.position}
                      onChange={e => updateStop(stop.id, { position: Number(e.target.value) })}
                      className="flex-1 h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                    <span className="w-7 text-[10px] text-zinc-400 tabular-nums text-right shrink-0">{stop.position}%</span>
                  </div>
                  {/* Opacity slider */}
                  <div className="flex items-center gap-2">
                    <span className="w-14 text-[9px] font-bold uppercase tracking-wide text-zinc-400 shrink-0">Opacity</span>
                    <input type="range" min={0} max={100} value={stop.opacity}
                      onChange={e => updateStop(stop.id, { opacity: Number(e.target.value) })}
                      className="flex-1 h-1.5 rounded-full accent-violet-600 cursor-pointer" />
                    <span className="w-7 text-[10px] text-zinc-400 tabular-nums text-right shrink-0">{stop.opacity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Toast portal */}
      {mounted && toast && createPortal(
        <div className="fixed top-6 right-6 z-[99999] flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-[#0d1a12] px-5 py-3 shadow-2xl shadow-black/40">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
            <Check className="h-3 w-3 text-emerald-400" />
          </span>
          <span className="text-[13px] font-medium text-emerald-100">{toast}</span>
        </div>,
        document.body
      )}
    </div>
  );
}

// ── Shell wrapper ─────────────────────────────────────────────────────────────

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'CSS Tools', href: '/' },
  { label: 'CSS Gradient Generator' },
];

export default function CssGradientGeneratorClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="CSS Gradient Generator"
      subtitle="Build linear, radial & conic gradients — drag stops, adjust opacity, click preview to move center, export CSS / Tailwind / SCSS / Animation / SVG"
      toolName="css_gradient_generator"
      icon="🎨"
      features={['Linear · Radial · Conic', 'Repeating gradients', 'Opacity per stop', 'CSS · Tailwind · SCSS · CSS Var · Animation · SVG']}
      tool={<GradientTool />}
    />
  );
}
