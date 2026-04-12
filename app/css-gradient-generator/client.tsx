'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { Copy, Check, RotateCcw, Plus, Trash2, Shuffle } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ───────────────────────────────────────────────────────────────────

type GradientType = 'linear' | 'radial' | 'conic';

interface ColorStop {
  id: number;
  color: string;
  position: number; // 0-100
}

// ── Helpers ─────────────────────────────────────────────────────────────────

let _id = 1;
const uid = () => _id++;

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function buildCss(type: GradientType, stops: ColorStop[], angle: number, radialShape: string, conicFrom: number): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
  if (type === 'radial') return `radial-gradient(${radialShape} at center, ${stopsStr})`;
  return `conic-gradient(from ${conicFrom}deg at center, ${stopsStr})`;
}

function buildTailwind(type: GradientType, stops: ColorStop[], angle: number): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (type === 'linear') {
    const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
    return `bg-[linear-gradient(${angle}deg,${stopsStr.replace(/ /g, '_')})]`;
  }
  const css = buildCss(type, stops, angle, 'ellipse', 0);
  return `bg-[${css.replace(/ /g, '_')}]`;
}

// ── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: { name: string; type: GradientType; stops: Omit<ColorStop, 'id'>[]; angle: number }[] = [
  { name: 'Ocean Drift', type: 'linear', angle: 135, stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
  { name: 'Sunset', type: 'linear', angle: 120, stops: [{ color: '#f093fb', position: 0 }, { color: '#f5576c', position: 100 }] },
  { name: 'Emerald Sea', type: 'linear', angle: 90, stops: [{ color: '#4facfe', position: 0 }, { color: '#00f2fe', position: 100 }] },
  { name: 'Candy', type: 'linear', angle: 135, stops: [{ color: '#f43f5e', position: 0 }, { color: '#f59e0b', position: 50 }, { color: '#a855f7', position: 100 }] },
  { name: 'Midnight', type: 'linear', angle: 180, stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }] },
  { name: 'Peach', type: 'linear', angle: 135, stops: [{ color: '#ffecd2', position: 0 }, { color: '#fcb69f', position: 100 }] },
  { name: 'Neon City', type: 'linear', angle: 90, stops: [{ color: '#06b6d4', position: 0 }, { color: '#a855f7', position: 50 }, { color: '#ec4899', position: 100 }] },
  { name: 'Forest', type: 'linear', angle: 135, stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] },
  { name: 'Fire', type: 'linear', angle: 180, stops: [{ color: '#f7971e', position: 0 }, { color: '#ffd200', position: 100 }] },
  { name: 'Silver', type: 'linear', angle: 135, stops: [{ color: '#bdc3c7', position: 0 }, { color: '#2c3e50', position: 100 }] },
  { name: 'Aurora', type: 'radial', angle: 135, stops: [{ color: '#2af598', position: 0 }, { color: '#009efd', position: 50 }, { color: '#7928ca', position: 100 }] },
  { name: 'Soft Dawn', type: 'radial', angle: 0, stops: [{ color: '#f8f9fa', position: 0 }, { color: '#e2d9f3', position: 100 }] },
  { name: 'Conic Rainbow', type: 'conic', angle: 0, stops: [{ color: '#f43f5e', position: 0 }, { color: '#f59e0b', position: 17 }, { color: '#22c55e', position: 33 }, { color: '#06b6d4', position: 50 }, { color: '#6366f1', position: 67 }, { color: '#ec4899', position: 83 }, { color: '#f43f5e', position: 100 }] },
  { name: 'Conic Soft', type: 'conic', angle: 45, stops: [{ color: '#a855f7', position: 0 }, { color: '#ec4899', position: 50 }, { color: '#a855f7', position: 100 }] },
  { name: 'Rose Gold', type: 'linear', angle: 135, stops: [{ color: '#f4a261', position: 0 }, { color: '#e76f51', position: 50 }, { color: '#b5838d', position: 100 }] },
];

// ── Copy button ──────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy', small = false }: { text: string; label?: string; small?: boolean }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  const base = small
    ? 'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition'
    : 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition';
  return (
    <button onClick={handle} className={`${base} ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
      {ok ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

// ── Slider ───────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, unit = '', onChange }: { label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">{label}</span>
        <span className="text-[12px] font-bold text-zinc-700 tabular-nums">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
    </div>
  );
}

// ── Main Tool ────────────────────────────────────────────────────────────────

function GradientTool() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [radialShape, setRadialShape] = useState<'ellipse' | 'circle'>('ellipse');
  const [conicFrom, setConicFrom] = useState(0);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: uid(), color: '#667eea', position: 0 },
    { id: uid(), color: '#764ba2', position: 100 },
  ]);
  const [previewShape, setPreviewShape] = useState<'rect' | 'circle' | 'text' | 'card'>('rect');
  const [activePreset, setActivePreset] = useState<string | null>('Ocean Drift');

  const css = useMemo(() => buildCss(type, stops, angle, radialShape, conicFrom), [type, stops, angle, radialShape, conicFrom]);
  const tailwindClass = useMemo(() => buildTailwind(type, stops, angle), [type, stops, angle]);
  const fullCss = `background: ${css};`;

  const applyPreset = useCallback((p: typeof PRESETS[0]) => {
    setType(p.type);
    setAngle(p.angle);
    setStops(p.stops.map(s => ({ ...s, id: uid() })));
    setActivePreset(p.name);
  }, []);

  const addStop = useCallback(() => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const mid = sorted.length > 1
      ? Math.round((sorted[0].position + sorted[sorted.length - 1].position) / 2)
      : 50;
    setStops(prev => [...prev, { id: uid(), color: randomHex(), position: mid }]);
    setActivePreset(null);
  }, [stops]);

  const removeStop = useCallback((id: number) => {
    setStops(prev => prev.length > 2 ? prev.filter(s => s.id !== id) : prev);
  }, []);

  const updateStop = useCallback((id: number, patch: Partial<ColorStop>) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
    setActivePreset(null);
  }, []);

  const randomize = useCallback(() => {
    setStops(prev => prev.map(s => ({ ...s, color: randomHex() })));
    setActivePreset(null);
  }, []);

  const reverse = useCallback(() => {
    setStops(prev => {
      const sorted = [...prev].sort((a, b) => a.position - b.position);
      return sorted.map((s, i) => ({ ...s, position: sorted[sorted.length - 1 - i].position }));
    });
    setActivePreset(null);
  }, []);

  const SHAPES = [
    { id: 'rect' as const, label: 'Rectangle', icon: '▬' },
    { id: 'circle' as const, label: 'Circle', icon: '●' },
    { id: 'card' as const, label: 'Card UI', icon: '🃏' },
    { id: 'text' as const, label: 'Text', icon: 'A' },
  ];

  return (
    <div className="divide-y divide-zinc-100">
      {/* Presets row */}
      <div className="bg-zinc-50 px-4 py-3 sm:px-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              title={p.name}
              className={`h-6 w-6 rounded-md border-2 transition hover:scale-110 active:scale-95 ${activePreset === p.name ? 'border-blue-500 scale-110' : 'border-white shadow-sm'}`}
              style={{ background: buildCss(p.type, p.stops.map((s, i) => ({ ...s, id: i })), p.angle, 'ellipse', 0) }}
            />
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="grid lg:grid-cols-[1fr_320px] lg:divide-x lg:divide-zinc-100">

        {/* Left — preview */}
        <div className="flex flex-col gap-0 divide-y divide-zinc-100">
          {/* Preview canvas */}
          <div className="flex items-center justify-center bg-[#f8f8f8] p-6 min-h-[280px]" style={{ backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            {previewShape === 'rect' && (
              <div className="w-full max-w-sm h-44 rounded-2xl shadow-xl transition-all duration-300" style={{ background: css }} />
            )}
            {previewShape === 'circle' && (
              <div className="h-44 w-44 rounded-full shadow-xl transition-all duration-300" style={{ background: css }} />
            )}
            {previewShape === 'text' && (
              <div className="text-5xl font-black tracking-tight select-none" style={{ background: css, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Hello World
              </div>
            )}
            {previewShape === 'card' && (
              <div className="w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-24 transition-all duration-300" style={{ background: css }} />
                <div className="bg-white p-4">
                  <div className="h-3 w-24 rounded-full bg-zinc-200 mb-2" />
                  <div className="h-2 w-40 rounded-full bg-zinc-100 mb-1" />
                  <div className="h-2 w-32 rounded-full bg-zinc-100" />
                  <div className="mt-3 h-7 w-20 rounded-lg" style={{ background: css }} />
                </div>
              </div>
            )}
          </div>

          {/* Preview shape selector */}
          <div className="flex gap-1 p-3 bg-white">
            {SHAPES.map(s => (
              <button key={s.id} onClick={() => setPreviewShape(s.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${previewShape === s.id ? 'bg-blue-50 text-blue-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right — controls */}
        <div className="flex flex-col divide-y divide-zinc-100 overflow-y-auto" style={{ maxHeight: '520px' }}>

          {/* Type selector */}
          <div className="p-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Type</p>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-zinc-100 p-1">
              {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`rounded-lg py-1.5 text-[11px] font-semibold capitalize transition ${type === t ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Angle / shape controls */}
            {type === 'linear' && <Slider label="Angle" value={angle} min={0} max={360} unit="°" onChange={v => { setAngle(v); setActivePreset(null); }} />}
            {type === 'radial' && (
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Shape</p>
                <div className="flex gap-2">
                  {(['ellipse', 'circle'] as const).map(s => (
                    <button key={s} onClick={() => setRadialShape(s)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold capitalize transition ${radialShape === s ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {type === 'conic' && <Slider label="From angle" value={conicFrom} min={0} max={360} unit="°" onChange={v => { setConicFrom(v); setActivePreset(null); }} />}
          </div>

          {/* Color stops */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Color Stops</p>
              <div className="flex gap-1">
                <button onClick={randomize} title="Randomize colors"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-violet-100 hover:text-violet-600 transition">
                  <Shuffle className="h-3 w-3" />
                </button>
                <button onClick={reverse} title="Reverse order"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 hover:bg-amber-100 hover:text-amber-600 transition">
                  <RotateCcw className="h-3 w-3" />
                </button>
                <button onClick={addStop} title="Add stop"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {[...stops].sort((a, b) => a.position - b.position).map(stop => (
                <div key={stop.id} className="flex items-center gap-2">
                  <input type="color" value={stop.color}
                    onChange={e => updateStop(stop.id, { color: e.target.value })}
                    className="h-7 w-7 cursor-pointer rounded-md border border-zinc-200 p-0.5" />
                  <span className="w-16 text-[11px] font-mono text-zinc-600">{stop.color}</span>
                  <div className="flex-1">
                    <input type="range" min={0} max={100} value={stop.position}
                      onChange={e => updateStop(stop.id, { position: Number(e.target.value) })}
                      className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer" />
                  </div>
                  <span className="w-7 text-[11px] text-zinc-400 tabular-nums">{stop.position}%</span>
                  <button onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="flex h-5 w-5 items-center justify-center rounded text-zinc-300 hover:text-red-500 disabled:opacity-30 transition">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="p-4 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">CSS Output</p>

            {/* Gradient preview bar */}
            <div className="h-5 w-full rounded-full" style={{ background: css }} />

            <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 leading-relaxed break-all">
              background: {css};
            </div>
            <div className="flex gap-2">
              <CopyBtn text={fullCss} label="Copy CSS" />
              <CopyBtn text={tailwindClass} label="Copy Tailwind" />
            </div>

            <div className="pt-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Tailwind</p>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-sky-400 leading-relaxed break-all">
                {tailwindClass}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shell wrapper ────────────────────────────────────────────────────────────

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
      subtitle="Build linear, radial & conic gradients visually — copy CSS or Tailwind code instantly"
      toolName="css_gradient_generator"
      icon="🎨"
      features={['Linear · Radial · Conic', '15 presets', 'Tailwind output', 'Free forever']}
      tool={<GradientTool />}
    />
  );
}
