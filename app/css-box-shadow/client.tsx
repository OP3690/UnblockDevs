'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, Plus, Trash2, Eye, EyeOff, Code2, RotateCcw } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ──────────────────────────────────────────────────────────────────

interface Shadow {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  alpha: number;
  inset: boolean;
  enabled: boolean;
}

type ShapeId = 'card' | 'button' | 'circle' | 'pill' | 'avatar' | 'input' | 'badge' | 'image' | 'fab' | 'chip';

interface ShapeDef {
  id: ShapeId;
  label: string;
  icon: string;
  desc: string;
  // Style applied to the preview element
  style: React.CSSProperties;
  // What renders inside
  content: React.ReactNode;
}

let _id = 1;
function makeShadow(p: Partial<Shadow> = {}): Shadow {
  return { id: _id++, x: 0, y: 4, blur: 16, spread: 0, color: '#000000', alpha: 15, inset: false, enabled: true, ...p };
}

function toRgba(color: string, alpha: number) {
  const h = color.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${(alpha / 100).toFixed(2)})`;
}

function shadowToCss(s: Shadow): string {
  return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${toRgba(s.color, s.alpha)}`;
}

function shadowsToProperty(shadows: Shadow[]): string {
  const active = shadows.filter(s => s.enabled);
  return active.length === 0 ? 'none' : active.map(shadowToCss).join(',\n       ');
}

function hexToRgba(color: string, alpha: number) {
  const h = color.replace('#', '');
  return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${(alpha/100).toFixed(2)})`;
}

// ── Shape definitions ─────────────────────────────────────────────────────

const SHAPES: ShapeDef[] = [
  {
    id: 'card',
    label: 'Card',
    icon: '🃏',
    desc: 'Dashboard card / panel',
    style: { width: 280, height: 160, borderRadius: 16, background: '#ffffff', border: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 },
    content: (
      <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f4f4f5', margin: '0 auto 8px' }} />
        <div style={{ width: 80, height: 8, borderRadius: 4, background: '#e4e4e7', marginBottom: 6 }} />
        <div style={{ width: 120, height: 6, borderRadius: 4, background: '#f4f4f5' }} />
      </div>
    ),
  },
  {
    id: 'button',
    label: 'Button',
    icon: '🔘',
    desc: 'Primary CTA button',
    style: { width: 180, height: 48, borderRadius: 12, background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, fontFamily: 'system-ui', pointerEvents: 'none' }}>Get started →</span>,
  },
  {
    id: 'circle',
    label: 'Circle',
    icon: '⭕',
    desc: 'Icon container / avatar',
    style: { width: 120, height: 120, borderRadius: '50%', background: '#ffffff', border: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: <span style={{ fontSize: 36, pointerEvents: 'none' }}>🦋</span>,
  },
  {
    id: 'pill',
    label: 'Pill',
    icon: '💊',
    desc: 'Tag / badge / status',
    style: { width: 140, height: 44, borderRadius: 999, background: '#ffffff', border: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'block', flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#18181b', fontFamily: 'system-ui' }}>Active</span>
      </div>
    ),
  },
  {
    id: 'avatar',
    label: 'Avatar',
    icon: '👤',
    desc: 'User / profile image',
    style: { width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: <span style={{ fontSize: 32, pointerEvents: 'none' }}>👤</span>,
  },
  {
    id: 'input',
    label: 'Input',
    icon: '📝',
    desc: 'Text field / search bar',
    style: { width: 280, height: 48, borderRadius: 12, background: '#ffffff', border: '1px solid #d4d4d8', display: 'flex', alignItems: 'center', paddingLeft: 14, paddingRight: 14, gap: 8 },
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', pointerEvents: 'none' }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#e4e4e7', flexShrink: 0 }} />
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#f4f4f5' }} />
      </div>
    ),
  },
  {
    id: 'badge',
    label: 'Badge',
    icon: '🏷️',
    desc: 'Notification / count badge',
    style: { width: 48, height: 28, borderRadius: 999, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'system-ui', pointerEvents: 'none' }}>99+</span>,
  },
  {
    id: 'image',
    label: 'Image',
    icon: '🖼️',
    desc: 'Photo / media card',
    style: { width: 200, height: 140, borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg,#0ea5e9 0%,#8b5cf6 50%,#ec4899 100%)', display: 'flex', alignItems: 'flex-end' },
    content: (
      <div style={{ width: '100%', padding: '8px 12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.5))', pointerEvents: 'none' }}>
        <div style={{ width: '60%', height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.8)', marginBottom: 4 }} />
        <div style={{ width: '40%', height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.5)' }} />
      </div>
    ),
  },
  {
    id: 'fab',
    label: 'FAB',
    icon: '⚡',
    desc: 'Floating action button',
    style: { width: 64, height: 64, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: <Plus style={{ color: '#fff', width: 28, height: 28, pointerEvents: 'none' }} />,
  },
  {
    id: 'chip',
    label: 'Chip',
    icon: '🍪',
    desc: 'Filter / selection chip',
    style: { width: 110, height: 36, borderRadius: 8, background: '#f4f4f5', border: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
        <span style={{ fontSize: 14 }}>🎨</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#52525b', fontFamily: 'system-ui' }}>Design</span>
      </div>
    ),
  },
];

// ── Presets ────────────────────────────────────────────────────────────────

const PRESETS: { label: string; icon: string; tag?: string; shadows: Partial<Shadow>[] }[] = [
  {
    label: 'Soft',
    icon: '☁️',
    tag: 'neutral',
    shadows: [
      { x: 0, y: 2, blur: 8, spread: 0, color: '#000000', alpha: 7 },
      { x: 0, y: 8, blur: 24, spread: -4, color: '#000000', alpha: 11 },
    ],
  },
  {
    label: 'Float',
    icon: '🪁',
    tag: 'elevated',
    shadows: [
      { x: 0, y: 4, blur: 12, spread: -4, color: '#000000', alpha: 10 },
      { x: 0, y: 12, blur: 40, spread: -8, color: '#000000', alpha: 18 },
    ],
  },
  {
    label: 'Deep',
    icon: '🌊',
    tag: 'dramatic',
    shadows: [
      { x: 0, y: 4, blur: 6, spread: -2, color: '#000000', alpha: 10 },
      { x: 0, y: 20, blur: 60, spread: -12, color: '#000000', alpha: 28 },
    ],
  },
  {
    label: 'Glow',
    icon: '✨',
    tag: 'color',
    shadows: [
      { x: 0, y: 0, blur: 20, spread: 2, color: '#6366f1', alpha: 55 },
      { x: 0, y: 0, blur: 60, spread: 8, color: '#6366f1', alpha: 20 },
    ],
  },
  {
    label: 'Neon',
    icon: '🌈',
    tag: 'color',
    shadows: [
      { x: 0, y: 0, blur: 8, spread: 0, color: '#22d3ee', alpha: 80 },
      { x: 0, y: 0, blur: 30, spread: 4, color: '#22d3ee', alpha: 40 },
      { x: 0, y: 0, blur: 80, spread: 12, color: '#06b6d4', alpha: 15 },
    ],
  },
  {
    label: 'Brutal',
    icon: '🗿',
    tag: 'sharp',
    shadows: [
      { x: 4, y: 4, blur: 0, spread: 0, color: '#000000', alpha: 100 },
    ],
  },
  {
    label: 'Stack',
    icon: '📚',
    tag: 'sharp',
    shadows: [
      { x: 2, y: 2, blur: 0, spread: 0, color: '#000000', alpha: 30 },
      { x: 4, y: 4, blur: 0, spread: 0, color: '#000000', alpha: 18 },
      { x: 6, y: 6, blur: 0, spread: 0, color: '#000000', alpha: 9 },
    ],
  },
  {
    label: 'Pressed',
    icon: '🖱️',
    tag: 'inset',
    shadows: [
      { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', alpha: 14, inset: true },
      { x: 0, y: 3, blur: 6, spread: 0, color: '#000000', alpha: 8, inset: true },
    ],
  },
  {
    label: 'Glass',
    icon: '🔮',
    tag: 'inset',
    shadows: [
      { x: 0, y: 1, blur: 0, spread: 2, color: '#ffffff', alpha: 22, inset: true },
      { x: 0, y: -1, blur: 0, spread: 1, color: '#000000', alpha: 14, inset: true },
      { x: 0, y: 8, blur: 32, spread: -4, color: '#000000', alpha: 16 },
    ],
  },
  {
    label: 'Long',
    icon: '🌒',
    tag: 'dramatic',
    shadows: [
      { x: 12, y: 20, blur: 0, spread: 0, color: '#000000', alpha: 20 },
      { x: 6, y: 10, blur: 0, spread: 0, color: '#000000', alpha: 12 },
    ],
  },
  {
    label: 'Layered',
    icon: '🎂',
    tag: 'elevated',
    shadows: [
      { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', alpha: 8 },
      { x: 0, y: 4, blur: 8, spread: -2, color: '#000000', alpha: 10 },
      { x: 0, y: 12, blur: 24, spread: -4, color: '#000000', alpha: 12 },
      { x: 0, y: 32, blur: 48, spread: -8, color: '#000000', alpha: 10 },
    ],
  },
  {
    label: 'Retro',
    icon: '🕹️',
    tag: 'sharp',
    shadows: [
      { x: 3, y: 3, blur: 0, spread: 0, color: '#000000', alpha: 100 },
      { x: -1, y: -1, blur: 0, spread: 0, color: '#ffffff', alpha: 60, inset: true },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  neutral: 'bg-zinc-100 text-zinc-500',
  elevated: 'bg-sky-50 text-sky-600',
  dramatic: 'bg-indigo-50 text-indigo-600',
  color: 'bg-violet-50 text-violet-600',
  sharp: 'bg-amber-50 text-amber-600',
  inset: 'bg-emerald-50 text-emerald-600',
};

// ── Slider ─────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, unit = 'px', onChange }: {
  label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="grid grid-cols-[72px_1fr_52px_52px] items-center gap-2">
      <span className="text-[11px] font-semibold text-zinc-500 truncate">{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer accent-zinc-900 rounded-full"
      />
      <span className="text-right font-mono text-[11.5px] text-zinc-500 tabular-nums">{value}{unit}</span>
      <input
        type="number" min={min} max={max} value={value}
        onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-1.5 py-1 text-center font-mono text-[11px] text-zinc-700 outline-none focus:border-zinc-400"
      />
    </div>
  );
}

// ── Copy btn ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all active:scale-95 ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
      <span>{ok ? 'Copied!' : label}</span>
    </button>
  );
}

// ── Preview backgrounds ────────────────────────────────────────────────────

const PREVIEW_BG = [
  { label: 'White', value: '#ffffff', dark: false },
  { label: 'Light grey', value: '#f4f4f5', dark: false },
  { label: 'Warm', value: '#fef9ef', dark: false },
  { label: 'Dark', value: '#18181b', dark: true },
  { label: 'Navy', value: '#0f172a', dark: true },
  { label: 'Purple', value: '#2e1065', dark: true },
  { label: 'Forest', value: '#052e16', dark: true },
];

// ── Main tool ──────────────────────────────────────────────────────────────

function CssBoxShadowTool() {
  const [shadows, setShadows] = useState<Shadow[]>([makeShadow({ y: 8, blur: 24, spread: -4, alpha: 14 })]);
  const [activeId, setActiveId] = useState<number>(shadows[0].id);
  const [shapeId, setShapeId] = useState<ShapeId>('card');
  const [previewBg, setPreviewBg] = useState('#ffffff');
  const [shapeBgColor, setShapeBgColor] = useState('#ffffff');
  const [useCustomBg, setUseCustomBg] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const active = shadows.find(s => s.id === activeId) ?? shadows[0];
  const shape = SHAPES.find(s => s.id === shapeId)!;
  const bgMeta = PREVIEW_BG.find(b => b.value === previewBg) ?? PREVIEW_BG[0];

  const update = useCallback((id: number, patch: Partial<Shadow>) => {
    setShadows(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  }, []);

  const updateActive = useCallback((patch: Partial<Shadow>) => update(activeId, patch), [activeId, update]);

  const addShadow = useCallback(() => {
    const s = makeShadow({ y: 8, blur: 24, alpha: 12 });
    setShadows(prev => [...prev, s]);
    setActiveId(s.id);
  }, []);

  const removeShadow = useCallback((id: number) => {
    setShadows(prev => {
      const next = prev.filter(s => s.id !== id);
      if (id === activeId && next.length > 0) setActiveId(next[0].id);
      return next;
    });
  }, [activeId]);

  const loadPreset = useCallback((preset: typeof PRESETS[0]) => {
    const ns = preset.shadows.map(s => makeShadow(s));
    setShadows(ns);
    setActiveId(ns[0].id);
  }, []);

  const resetShadows = useCallback(() => {
    const s = makeShadow({ y: 8, blur: 24, spread: -4, alpha: 14 });
    setShadows([s]);
    setActiveId(s.id);
  }, []);

  const cssProp = useMemo(() => shadowsToProperty(shadows), [shadows]);

  // Build the full CSS snippet
  const fullCss = useMemo(() => {
    const lines = shadows.filter(s => s.enabled).map(shadowToCss);
    return lines.length === 0
      ? `.element {\n  box-shadow: none;\n}`
      : `.element {\n  box-shadow:\n    ${lines.join(',\n    ')};\n}`;
  }, [shadows]);

  // Compute effective shape style (merge shadow + custom bg if enabled)
  const effectiveShapeStyle: React.CSSProperties = {
    ...shape.style,
    boxShadow: cssProp === 'none' ? 'none' : cssProp,
    transition: 'box-shadow 0.15s ease',
    ...(useCustomBg ? { background: shapeBgColor } : {}),
  };

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Presets ──────────────────────────────────────────── */}
      <div className="bg-zinc-50 px-4 py-3 sm:px-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => loadPreset(p)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:shadow-md active:scale-95"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
              {p.tag && (
                <span className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-bold uppercase ${TAG_COLORS[p.tag] ?? ''}`}>
                  {p.tag}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={resetShadows}
            className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] text-zinc-400 shadow-sm transition hover:border-zinc-300 hover:text-zinc-600 active:scale-95"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* ── Shape selector ───────────────────────────────────── */}
      <div className="bg-white px-4 py-3 sm:px-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Preview Shape</p>
        <div className="flex flex-wrap gap-1.5">
          {SHAPES.map(s => (
            <button
              key={s.id}
              onClick={() => setShapeId(s.id)}
              title={s.desc}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11.5px] font-semibold transition active:scale-95 ${
                shapeId === s.id
                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-zinc-400">{shape.desc}</p>
      </div>

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className="grid lg:grid-cols-[1fr_360px] lg:divide-x lg:divide-zinc-100">

        {/* Left: preview + code */}
        <div className="flex flex-col">

          {/* Preview toolbar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 sm:px-5">
            {/* Background swatches */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Canvas</span>
              <div className="flex gap-1.5">
                {PREVIEW_BG.map(bg => (
                  <button
                    key={bg.value}
                    onClick={() => setPreviewBg(bg.value)}
                    title={bg.label}
                    className={`h-5 w-5 rounded-full border-2 transition ${previewBg === bg.value ? 'border-zinc-900 scale-110 shadow-sm' : 'border-zinc-200 hover:border-zinc-400'}`}
                    style={{ background: bg.value }}
                  />
                ))}
              </div>
            </div>

            {/* Shape bg override */}
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-1.5 select-none text-[11px] text-zinc-500">
                <input
                  type="checkbox"
                  checked={useCustomBg}
                  onChange={e => setUseCustomBg(e.target.checked)}
                  className="h-3 w-3 accent-zinc-900 rounded"
                />
                Shape bg
              </label>
              {useCustomBg && (
                <label className="relative cursor-pointer">
                  <div className="h-5 w-5 rounded-md border border-zinc-200 shadow-sm" style={{ background: shapeBgColor }} />
                  <input type="color" value={shapeBgColor} onChange={e => setShapeBgColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>
              )}
            </div>

            <button
              onClick={() => setShowCode(v => !v)}
              className={`ml-auto flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${showCode ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300'}`}
            >
              <Code2 className="h-3.5 w-3.5" /> Code
            </button>
          </div>

          {/* Preview canvas */}
          <div
            className="flex flex-1 items-center justify-center p-10 sm:p-16 min-h-[280px] transition-colors duration-300"
            style={{ background: previewBg }}
          >
            <div style={effectiveShapeStyle}>
              {shape.content}
            </div>
          </div>

          {/* Code panel */}
          {showCode && (
            <div className="border-t border-zinc-200 bg-zinc-950">
              <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="ml-1 text-[11px] text-zinc-500">styles.css</span>
                </div>
                <div className="flex items-center gap-2">
                  <CopyBtn
                    text={fullCss}
                    label="Copy CSS"
                    className="rounded-lg bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600"
                  />
                  <CopyBtn
                    text={`box-shadow: ${cssProp};`}
                    label="Copy value"
                    className="rounded-lg bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-400 hover:bg-zinc-700"
                  />
                </div>
              </div>
              <pre className="overflow-x-auto px-5 pb-4 text-[12.5px] leading-[1.8]">
                <span className="text-zinc-500">.element</span>
                <span className="text-zinc-400"> {'{'}</span>{'\n'}
                <span className="text-violet-400">{'  '}box-shadow</span>
                <span className="text-zinc-400">:</span>{'\n'}
                {shadows.filter(s => s.enabled).length === 0 ? (
                  <><span className="text-zinc-600">{'    '}none</span>{'\n'}</>
                ) : (
                  shadows.filter(s => s.enabled).map((s, i, arr) => (
                    <span key={s.id}>
                      <span className="text-zinc-600">{'    '}</span>
                      <span className={s.inset ? 'text-amber-400' : 'text-emerald-400'}>{shadowToCss(s)}</span>
                      {i < arr.length - 1 && <span className="text-zinc-600">,</span>}
                      {'\n'}
                    </span>
                  ))
                )}
                <span className="text-zinc-400">{'  '}</span>
                <span className="text-zinc-500">;</span>{'\n'}
                <span className="text-zinc-400">{'}'}</span>
              </pre>
            </div>
          )}
        </div>

        {/* Right: layers + controls */}
        <div className="flex flex-col divide-y divide-zinc-100">

          {/* Layers */}
          <div className="px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Shadow Layers <span className="ml-1 rounded-full bg-zinc-100 px-1.5 py-0.5 font-bold text-zinc-500">{shadows.length}</span>
              </span>
              <button
                onClick={addShadow}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:shadow-md active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-1.5">
              {shadows.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 transition-all ${
                    s.id === activeId
                      ? 'border-zinc-900 bg-zinc-900 shadow-sm'
                      : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm'
                  }`}
                >
                  {/* Color swatch */}
                  <div
                    className="h-7 w-7 shrink-0 rounded-lg border border-white/20 shadow-sm"
                    style={{ background: hexToRgba(s.color, s.alpha) }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-mono text-[11.5px] truncate ${s.id === activeId ? 'text-zinc-200' : 'text-zinc-600'}`}>
                      {s.inset ? <span className={s.id === activeId ? 'text-amber-400' : 'text-amber-600'}>inset </span> : ''}
                      {s.x}px {s.y}px {s.blur}px {s.spread}px
                    </p>
                    <p className={`text-[10px] ${s.id === activeId ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {s.color.toUpperCase()} · {s.alpha}% opacity
                    </p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); update(s.id, { enabled: !s.enabled }); }}
                    className={`rounded p-1 transition ${s.id === activeId ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-300 hover:text-zinc-600'}`}
                  >
                    {s.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  {shadows.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); removeShadow(s.id); }}
                      className={`rounded p-1 transition ${s.id === activeId ? 'text-zinc-500 hover:text-red-400' : 'text-zinc-300 hover:text-red-500'}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active shadow controls */}
          {active && (
            <div className="flex-1 px-4 py-4 sm:px-5 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Layer Controls</p>

              <div className="space-y-3.5">
                <Slider label="X Offset" value={active.x} min={-150} max={150} onChange={v => updateActive({ x: v })} />
                <Slider label="Y Offset" value={active.y} min={-150} max={150} onChange={v => updateActive({ y: v })} />
                <Slider label="Blur" value={active.blur} min={0} max={250} onChange={v => updateActive({ blur: v })} />
                <Slider label="Spread" value={active.spread} min={-80} max={120} onChange={v => updateActive({ spread: v })} />
                <Slider label="Opacity" value={active.alpha} min={0} max={100} unit="%" onChange={v => updateActive({ alpha: v })} />
              </div>

              {/* Color + inset row */}
              <div className="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3">
                {/* Color */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-semibold text-zinc-500">Color</span>
                  <label className="relative flex cursor-pointer items-center gap-2 group">
                    <div
                      className="h-8 w-8 rounded-xl border-2 border-zinc-200 shadow-sm group-hover:border-zinc-400 transition"
                      style={{ background: active.color }}
                    />
                    <input
                      type="color"
                      value={active.color}
                      onChange={e => updateActive({ color: e.target.value })}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="font-mono text-[12px] text-zinc-600">{active.color.toUpperCase()}</span>
                  </label>
                </div>

                {/* Inset toggle */}
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={active.inset}
                    onClick={() => updateActive({ inset: !active.inset })}
                    className={`relative h-5 w-9 rounded-full transition-colors focus:outline-none ${active.inset ? 'bg-amber-500' : 'bg-zinc-300'}`}
                  >
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-150 ${active.inset ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                  <span className={`text-[12px] font-semibold ${active.inset ? 'text-amber-600' : 'text-zinc-500'}`}>
                    {active.inset ? 'Inset ✓' : 'Inset'}
                  </span>
                </label>
              </div>

              {/* Shadow preview swatch */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">This layer</p>
                <div className="flex items-center justify-center h-14 rounded-lg bg-white border border-zinc-100">
                  <div
                    className="h-8 w-24 rounded-lg bg-white border border-zinc-100"
                    style={{ boxShadow: shadowToCss(active) }}
                  />
                </div>
                <p className="mt-1.5 text-center font-mono text-[10px] text-zinc-400 break-all">{shadowToCss(active)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CssBoxShadowClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="CSS Box Shadow Generator"
      subtitle="Build beautiful multi-layer box shadows for any shape — cards, buttons, circles, pills, inputs, images, and FABs. 12 presets, live preview, syntax-highlighted CSS output. 100% in-browser."
      toolName="css_box_shadow"
      icon="🟦"
      features={['10 shapes', '12 presets', 'Multi-layer', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<CssBoxShadowTool />}
    />
  );
}
