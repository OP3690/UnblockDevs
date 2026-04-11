'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
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

let nextId = 1;

function makeShadow(partial: Partial<Shadow> = {}): Shadow {
  return {
    id: nextId++,
    x: 0,
    y: 4,
    blur: 16,
    spread: 0,
    color: '#000000',
    alpha: 15,
    inset: false,
    enabled: true,
    ...partial,
  };
}

function shadowToCss(s: Shadow): string {
  const hex = s.color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const a = (s.alpha / 100).toFixed(2);
  const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
  return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`;
}

function shadowsToProperty(shadows: Shadow[]): string {
  const active = shadows.filter(s => s.enabled);
  if (active.length === 0) return 'none';
  return active.map(shadowToCss).join(',\n  ');
}

// ── Presets ────────────────────────────────────────────────────────────────

const PRESETS: { label: string; icon: string; shadows: Partial<Shadow>[] }[] = [
  {
    label: 'Soft card',
    icon: '🃏',
    shadows: [
      { x: 0, y: 2, blur: 8, spread: 0, color: '#000000', alpha: 8 },
      { x: 0, y: 8, blur: 24, spread: -4, color: '#000000', alpha: 12 },
    ],
  },
  {
    label: 'Float',
    icon: '🪁',
    shadows: [
      { x: 0, y: 12, blur: 40, spread: -8, color: '#000000', alpha: 20 },
      { x: 0, y: 4, blur: 12, spread: -4, color: '#000000', alpha: 10 },
    ],
  },
  {
    label: 'Glow',
    icon: '✨',
    shadows: [
      { x: 0, y: 0, blur: 0, spread: 0, color: '#6366f1', alpha: 0 },
      { x: 0, y: 0, blur: 20, spread: 2, color: '#6366f1', alpha: 50 },
      { x: 0, y: 0, blur: 60, spread: 8, color: '#6366f1', alpha: 20 },
    ],
  },
  {
    label: 'Brutal',
    icon: '🗿',
    shadows: [
      { x: 4, y: 4, blur: 0, spread: 0, color: '#000000', alpha: 100 },
    ],
  },
  {
    label: 'Inner glow',
    icon: '💡',
    shadows: [
      { x: 0, y: 1, blur: 0, spread: 2, color: '#ffffff', alpha: 20, inset: true },
      { x: 0, y: -1, blur: 0, spread: 1, color: '#000000', alpha: 15, inset: true },
    ],
  },
  {
    label: 'Sharp',
    icon: '🔪',
    shadows: [
      { x: 2, y: 2, blur: 0, spread: 0, color: '#000000', alpha: 25 },
      { x: 4, y: 4, blur: 0, spread: 0, color: '#000000', alpha: 15 },
      { x: 6, y: 6, blur: 0, spread: 0, color: '#000000', alpha: 8 },
    ],
  },
  {
    label: 'Pressed',
    icon: '🖱️',
    shadows: [
      { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', alpha: 12, inset: true },
      { x: 0, y: 2, blur: 4, spread: 0, color: '#000000', alpha: 8, inset: true },
    ],
  },
  {
    label: 'Layered',
    icon: '🎂',
    shadows: [
      { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', alpha: 8 },
      { x: 0, y: 4, blur: 8, spread: -2, color: '#000000', alpha: 10 },
      { x: 0, y: 12, blur: 24, spread: -4, color: '#000000', alpha: 12 },
      { x: 0, y: 32, blur: 48, spread: -8, color: '#000000', alpha: 10 },
    ],
  },
];

// ── Slider ─────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, unit = 'px', onChange }: {
  label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-[11px] font-semibold text-zinc-500">{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 cursor-pointer accent-zinc-900 rounded-full"
      />
      <span className="w-14 shrink-0 text-right font-mono text-[12px] text-zinc-600">{value}{unit}</span>
      <input
        type="number" min={min} max={max} value={value}
        onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
        className="w-14 shrink-0 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-center font-mono text-[11.5px] text-zinc-700 outline-none focus:border-zinc-400"
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
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{ok ? 'Copied!' : label}</span>
    </button>
  );
}

// ── Preview backgrounds ────────────────────────────────────────────────────

const PREVIEW_BG = [
  { label: 'White', value: '#ffffff' },
  { label: 'Light', value: '#f4f4f5' },
  { label: 'Dark', value: '#18181b' },
  { label: 'Navy', value: '#0f172a' },
  { label: 'Warm', value: '#fef9ef' },
  { label: 'Purple', value: '#1e1b4b' },
];

// ── Main tool ──────────────────────────────────────────────────────────────

function CssBoxShadowTool() {
  const [shadows, setShadows] = useState<Shadow[]>([makeShadow({ y: 4, blur: 16, alpha: 15 })]);
  const [activeId, setActiveId] = useState(shadows[0].id);
  const [previewBg, setPreviewBg] = useState('#ffffff');
  const [previewRadius, setPreviewRadius] = useState(16);

  const active = shadows.find(s => s.id === activeId) ?? shadows[0];

  const updateActive = useCallback((patch: Partial<Shadow>) => {
    setShadows(prev => prev.map(s => s.id === activeId ? { ...s, ...patch } : s));
  }, [activeId]);

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
    const newShadows = preset.shadows.map(s => makeShadow(s));
    setShadows(newShadows);
    setActiveId(newShadows[0].id);
  }, []);

  const cssProp = useMemo(() => shadowsToProperty(shadows), [shadows]);
  const cssBlock = `box-shadow: ${cssProp};`;

  const isDark = ['#18181b', '#0f172a', '#1e1b4b'].includes(previewBg);
  const previewCardBg = isDark ? '#ffffff10' : '#ffffff';
  const previewCardBorder = isDark ? '#ffffff20' : '#e4e4e7';

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Presets ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Presets:</span>
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => loadPreset(p)}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className="grid gap-0 lg:grid-cols-[1fr_380px] lg:divide-x lg:divide-zinc-100">

        {/* Left: Preview */}
        <div>
          {/* Bg selector */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 sm:px-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Background</span>
            <div className="flex gap-1.5">
              {PREVIEW_BG.map(bg => (
                <button
                  key={bg.value}
                  onClick={() => setPreviewBg(bg.value)}
                  title={bg.label}
                  className={`h-6 w-6 rounded-full border-2 transition ${previewBg === bg.value ? 'border-zinc-900 scale-110 shadow-sm' : 'border-zinc-200 hover:border-zinc-400'}`}
                  style={{ background: bg.value }}
                />
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Radius</span>
              <input
                type="range" min={0} max={48} value={previewRadius}
                onChange={e => setPreviewRadius(Number(e.target.value))}
                className="w-24 accent-zinc-900"
              />
              <span className="font-mono text-[11px] text-zinc-500 w-8">{previewRadius}px</span>
            </div>
          </div>

          {/* Preview canvas */}
          <div
            className="flex items-center justify-center p-8 sm:p-12 min-h-[320px] transition-colors duration-300"
            style={{ background: previewBg }}
          >
            <div
              className="flex h-36 w-64 sm:h-44 sm:w-80 items-center justify-center transition-all duration-200"
              style={{
                background: previewCardBg,
                border: `1px solid ${previewCardBorder}`,
                borderRadius: previewRadius,
                boxShadow: cssProp === 'none' ? 'none' : cssProp,
                backdropFilter: isDark ? 'blur(12px)' : undefined,
              }}
            >
              <span className="text-[13px] font-medium" style={{ color: isDark ? '#ffffff60' : '#71717a' }}>
                Preview Card
              </span>
            </div>
          </div>

          {/* CSS output */}
          <div className="border-t border-zinc-100 bg-zinc-950 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">CSS Output</span>
              <CopyBtn
                text={cssBlock}
                label="Copy CSS"
                className="rounded-lg bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1.5"
              />
            </div>
            <pre className="overflow-x-auto text-[12.5px] leading-6">
              <span className="text-violet-400">box-shadow</span>
              <span className="text-zinc-400">: </span>
              {shadows.filter(s => s.enabled).map((s, i) => (
                <span key={s.id}>
                  <span className="text-emerald-400">{shadowToCss(s)}</span>
                  {i < shadows.filter(x => x.enabled).length - 1 && <span className="text-zinc-500">,{'\n'}  </span>}
                </span>
              ))}
              {shadows.every(s => !s.enabled) && <span className="text-zinc-500">none</span>}
              <span className="text-zinc-400">;</span>
            </pre>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col">

          {/* Shadow layers list */}
          <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Layers</span>
              <button
                onClick={addShadow}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> Add layer
              </button>
            </div>
            <div className="space-y-1.5">
              {shadows.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 transition ${
                    s.id === activeId ? 'border-zinc-300 bg-white shadow-sm' : 'border-zinc-200 bg-white/60 hover:border-zinc-300'
                  }`}
                >
                  {/* Color swatch */}
                  <div
                    className="h-6 w-6 shrink-0 rounded-lg border border-zinc-200 shadow-sm"
                    style={{
                      background: (() => {
                        const hex = s.color.replace('#', '');
                        const r = parseInt(hex.slice(0, 2), 16);
                        const g = parseInt(hex.slice(2, 4), 16);
                        const b = parseInt(hex.slice(4, 6), 16);
                        return `rgba(${r},${g},${b},${s.alpha / 100})`;
                      })(),
                    }}
                  />
                  <span className="flex-1 text-[12px] font-mono text-zinc-600 truncate">
                    {s.inset ? 'inset ' : ''}{s.x}px {s.y}px {s.blur}px {s.spread}px
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); updateActive({ enabled: !s.enabled }); /* Fix: toggle this shadow */ setShadows(prev => prev.map(sh => sh.id === s.id ? { ...sh, enabled: !sh.enabled } : sh)); }}
                    className="rounded p-1 text-zinc-300 hover:text-zinc-600 transition"
                  >
                    {s.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  {shadows.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); removeShadow(s.id); }}
                      className="rounded p-1 text-zinc-300 hover:text-red-500 transition"
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Shadow Controls</p>

              <div className="space-y-3">
                <Slider label="X Offset" value={active.x} min={-100} max={100} onChange={v => updateActive({ x: v })} />
                <Slider label="Y Offset" value={active.y} min={-100} max={100} onChange={v => updateActive({ y: v })} />
                <Slider label="Blur" value={active.blur} min={0} max={200} onChange={v => updateActive({ blur: v })} />
                <Slider label="Spread" value={active.spread} min={-50} max={100} onChange={v => updateActive({ spread: v })} />
                <Slider label="Opacity" value={active.alpha} min={0} max={100} unit="%" onChange={v => updateActive({ alpha: v })} />
              </div>

              {/* Color + inset */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-zinc-500">Color</span>
                  <label className="relative flex cursor-pointer items-center gap-2">
                    <div
                      className="h-8 w-8 rounded-xl border-2 border-zinc-200 shadow-sm"
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

                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <div
                    onClick={() => updateActive({ inset: !active.inset })}
                    className={`relative h-5 w-9 rounded-full transition-colors ${active.inset ? 'bg-zinc-900' : 'bg-zinc-300'}`}
                  >
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${active.inset ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-[12px] text-zinc-600">Inset</span>
                </label>
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
      subtitle="Build beautiful box shadows visually. Multi-layer support, live preview, 8 presets, and instant CSS copy. Design soft cards, glows, brutalist borders, or inner shadows — 100% in-browser."
      toolName="css_box_shadow"
      icon="🟦"
      features={['Multi-layer', '8 presets', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<CssBoxShadowTool />}
    />
  );
}
