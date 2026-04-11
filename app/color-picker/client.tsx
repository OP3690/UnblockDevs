'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, RefreshCw, Pipette, Shuffle, ChevronDown, ChevronUp } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Helpers ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return {
    r: Math.round(hue2rgb(hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(hn) * 255),
    b: Math.round(hue2rgb(hn - 1 / 3) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round((1 - rn - k) / (1 - k) * 100),
    m: Math.round((1 - gn - k) / (1 - k) * 100),
    y: Math.round((1 - bn - k) / (1 - k) * 100),
    k: Math.round(k * 100),
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generatePalette(r: number, g: number, b: number): { hex: string; label: string }[] {
  const hsl = rgbToHsl(r, g, b);
  const shades = [
    { l: 95, label: '50' }, { l: 85, label: '100' }, { l: 75, label: '200' },
    { l: 60, label: '300' }, { l: 45, label: '400' }, { l: hsl.l, label: '500 ★' },
    { l: 35, label: '600' }, { l: 25, label: '700' }, { l: 18, label: '800' },
    { l: 10, label: '900' },
  ];
  return shades.map(({ l, label }) => {
    const rgb = hslToRgb(hsl.h, hsl.s, l);
    return { hex: rgbToHex(rgb.r, rgb.g, rgb.b), label };
  });
}

function getHarmony(r: number, g: number, b: number): Record<string, { hex: string; label: string }[]> {
  const hsl = rgbToHsl(r, g, b);
  const mkHex = (h: number) => {
    const rgb = hslToRgb(((h % 360) + 360) % 360, hsl.s, hsl.l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };
  return {
    Complementary: [
      { hex: rgbToHex(r, g, b), label: 'Base' },
      { hex: mkHex(hsl.h + 180), label: 'Complement' },
    ],
    Triadic: [
      { hex: rgbToHex(r, g, b), label: 'Base' },
      { hex: mkHex(hsl.h + 120), label: '+120°' },
      { hex: mkHex(hsl.h + 240), label: '+240°' },
    ],
    'Split-comp': [
      { hex: rgbToHex(r, g, b), label: 'Base' },
      { hex: mkHex(hsl.h + 150), label: '+150°' },
      { hex: mkHex(hsl.h + 210), label: '+210°' },
    ],
    Analogous: [
      { hex: mkHex(hsl.h - 30), label: '-30°' },
      { hex: rgbToHex(r, g, b), label: 'Base' },
      { hex: mkHex(hsl.h + 30), label: '+30°' },
    ],
  };
}

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
}

// ── Copy button ─────────────────────────────────────────────────────────────

function CopyBtn({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* blocked */ }
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      title={`Copy ${text}`}
      className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-mono transition-colors ${className}`}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      <span className="truncate max-w-[160px]">{text}</span>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

function ColorPickerTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: '59', g: '130', b: '246' });
  const [hslInput, setHslInput] = useState({ h: '217', s: '91', l: '60' });
  const [showHarmony, setShowHarmony] = useState(false);

  const rgb = hexToRgb(hex) ?? { r: 59, g: 130, b: 246 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const palette = generatePalette(rgb.r, rgb.g, rgb.b);
  const harmony = getHarmony(rgb.r, rgb.g, rgb.b);

  // Contrast vs white and black
  const contrastWhite = getContrastRatio(rgb.r, rgb.g, rgb.b, 255, 255, 255);
  const contrastBlack = getContrastRatio(rgb.r, rgb.g, rgb.b, 0, 0, 0);
  const bestContrast = contrastWhite >= contrastBlack ? 'white' : 'black';
  const bestContrastRatio = Math.max(contrastWhite, contrastBlack);

  const wcagAA = bestContrastRatio >= 4.5;
  const wcagAAA = bestContrastRatio >= 7;
  const wcagAALarge = bestContrastRatio >= 3;

  const applyHex = useCallback((h: string) => {
    const clean = h.trim();
    const withHash = clean.startsWith('#') ? clean : '#' + clean;
    const parsed = hexToRgb(withHash);
    if (parsed) {
      setHex(withHash.toUpperCase());
      setHexInput(withHash.toUpperCase());
      const { h: hh, s, l } = rgbToHsl(parsed.r, parsed.g, parsed.b);
      setRgbInput({ r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) });
      setHslInput({ h: String(hh), s: String(s), l: String(l) });
    }
  }, []);

  const applyRgb = useCallback(() => {
    const r = Math.min(255, Math.max(0, parseInt(rgbInput.r) || 0));
    const g = Math.min(255, Math.max(0, parseInt(rgbInput.g) || 0));
    const b = Math.min(255, Math.max(0, parseInt(rgbInput.b) || 0));
    const h = rgbToHex(r, g, b);
    setHex(h);
    setHexInput(h);
    const hsl2 = rgbToHsl(r, g, b);
    setHslInput({ h: String(hsl2.h), s: String(hsl2.s), l: String(hsl2.l) });
  }, [rgbInput]);

  const applyHsl = useCallback(() => {
    const hv = Math.min(360, Math.max(0, parseInt(hslInput.h) || 0));
    const sv = Math.min(100, Math.max(0, parseInt(hslInput.s) || 0));
    const lv = Math.min(100, Math.max(0, parseInt(hslInput.l) || 0));
    const { r, g, b } = hslToRgb(hv, sv, lv);
    const h = rgbToHex(r, g, b);
    setHex(h);
    setHexInput(h);
    setRgbInput({ r: String(r), g: String(g), b: String(b) });
  }, [hslInput]);

  const handleRandom = useCallback(() => applyHex(randomHex()), [applyHex]);

  // Sync input when hex changes from native picker
  const handleNativePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyHex(e.target.value);
  };

  const textColor = bestContrast === 'white' ? '#FFFFFF' : '#111827';

  return (
    <div className="space-y-6 p-3 sm:p-5">

      {/* ── Top: Picker + Formats ───────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">

        {/* Left: swatch + native input */}
        <div className="flex flex-col gap-3">
          {/* Big swatch */}
          <div
            className="relative flex h-40 sm:h-48 w-full items-center justify-center rounded-2xl border border-zinc-200 shadow-inner transition-colors duration-200"
            style={{ background: hex }}
          >
            <span
              className="select-all rounded-xl px-3 py-1 font-mono text-lg font-bold tracking-widest"
              style={{ color: textColor, background: bestContrast === 'white' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)' }}
            >
              {hex}
            </span>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {/* Native color input */}
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50">
              <Pipette className="h-4 w-4 text-zinc-500" />
              <span>Pick color</span>
              <input
                type="color"
                value={hex}
                onChange={handleNativePicker}
                className="sr-only"
                aria-label="Color picker"
              />
            </label>
            <button
              onClick={handleRandom}
              title="Random color"
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Shuffle className="h-4 w-4 text-zinc-500" />
              <span className="hidden sm:inline">Random</span>
            </button>
          </div>
        </div>

        {/* Right: format inputs */}
        <div className="space-y-3">
          {/* HEX */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={e => setHexInput(e.target.value)}
                onBlur={e => applyHex(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') applyHex(hexInput); }}
                maxLength={7}
                placeholder="#3B82F6"
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
              />
              <CopyBtn text={hex} className="border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100" />
            </div>
          </div>

          {/* RGB */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">RGB</label>
            <div className="flex gap-2">
              {(['r', 'g', 'b'] as const).map(ch => (
                <input
                  key={ch}
                  type="number"
                  min={0}
                  max={255}
                  value={rgbInput[ch]}
                  onChange={e => setRgbInput(prev => ({ ...prev, [ch]: e.target.value }))}
                  onBlur={applyRgb}
                  onKeyDown={e => { if (e.key === 'Enter') applyRgb(); }}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-center font-mono text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
                  placeholder={ch.toUpperCase()}
                />
              ))}
              <CopyBtn
                text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                className="border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 shrink-0"
              />
            </div>
          </div>

          {/* HSL */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">HSL</label>
            <div className="flex gap-2">
              {(['h', 's', 'l'] as const).map(ch => (
                <input
                  key={ch}
                  type="number"
                  min={0}
                  max={ch === 'h' ? 360 : 100}
                  value={hslInput[ch]}
                  onChange={e => setHslInput(prev => ({ ...prev, [ch]: e.target.value }))}
                  onBlur={applyHsl}
                  onKeyDown={e => { if (e.key === 'Enter') applyHsl(); }}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-center font-mono text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
                  placeholder={ch.toUpperCase()}
                />
              ))}
              <CopyBtn
                text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                className="border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 shrink-0"
              />
            </div>
          </div>

          {/* HSV + CMYK read-only */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">HSV</label>
              <CopyBtn
                text={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                className="w-full justify-center border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 py-1.5"
              />
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">CMYK</label>
              <CopyBtn
                text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                className="w-full justify-center border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 py-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── WCAG Contrast ───────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">WCAG Contrast</h3>
        <div className="flex flex-wrap gap-3">
          {/* vs White */}
          <div
            className="flex flex-1 min-w-[160px] items-center justify-between rounded-xl border px-4 py-3"
            style={{ background: hex, borderColor: hex }}
          >
            <span style={{ color: '#ffffff' }} className="text-sm font-semibold">vs White</span>
            <span style={{ color: '#ffffff' }} className="font-mono text-sm font-bold">{contrastWhite.toFixed(2)}:1</span>
          </div>
          {/* vs Black */}
          <div
            className="flex flex-1 min-w-[160px] items-center justify-between rounded-xl border px-4 py-3"
            style={{ background: hex, borderColor: hex }}
          >
            <span style={{ color: '#000000' }} className="text-sm font-semibold">vs Black</span>
            <span style={{ color: '#000000' }} className="font-mono text-sm font-bold">{contrastBlack.toFixed(2)}:1</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'AA Normal (4.5:1)', pass: wcagAA },
            { label: 'AAA Normal (7:1)', pass: wcagAAA },
            { label: 'AA Large (3:1)', pass: wcagAALarge },
          ].map(({ label, pass }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold ${
                pass
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-50 text-red-600'
              }`}
            >
              <span>{pass ? '✓' : '✗'}</span>
              {label}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[12px] text-zinc-400">
          Best text color on this background: <strong style={{ color: hex === '#FFFFFF' ? '#111' : undefined }}>{bestContrast} ({bestContrastRatio.toFixed(2)}:1)</strong>
        </p>
      </div>

      {/* ── Shade palette ───────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">Tailwind-style Shades</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {palette.map(({ hex: sh, label }) => {
            const isBase = label.includes('★');
            const rgb2 = hexToRgb(sh) ?? { r: 0, g: 0, b: 0 };
            const lum = getLuminance(rgb2.r, rgb2.g, rgb2.b);
            const tc = lum > 0.35 ? '#111827' : '#FFFFFF';
            return (
              <button
                key={label}
                onClick={() => applyHex(sh)}
                title={`${sh} — ${label}`}
                className={`group relative flex flex-col items-center justify-end rounded-xl pb-1.5 pt-8 sm:pt-10 transition hover:scale-105 hover:shadow-md ${isBase ? 'ring-2 ring-zinc-900 ring-offset-1' : ''}`}
                style={{ background: sh }}
              >
                <span className="text-[9px] font-bold leading-tight" style={{ color: tc }}>
                  {label.replace(' ★', '')}
                </span>
                <span className="hidden text-[8px] sm:block" style={{ color: tc, opacity: 0.75 }}>
                  {sh}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-zinc-400">Click a shade to select it.</p>
      </div>

      {/* ── Color Harmony ───────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200 bg-white">
        <button
          onClick={() => setShowHarmony(v => !v)}
          className="flex w-full items-center justify-between px-4 py-3 sm:px-5"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Color Harmony</h3>
          {showHarmony
            ? <ChevronUp className="h-4 w-4 text-zinc-400" />
            : <ChevronDown className="h-4 w-4 text-zinc-400" />
          }
        </button>
        {showHarmony && (
          <div className="border-t border-zinc-100 px-4 pb-4 pt-3 sm:px-5 grid gap-4 sm:grid-cols-2">
            {Object.entries(harmony).map(([name, swatches]) => (
              <div key={name}>
                <p className="mb-2 text-[11px] font-semibold text-zinc-500">{name}</p>
                <div className="flex gap-2">
                  {swatches.map(({ hex: sh, label }) => {
                    const rgb2 = hexToRgb(sh) ?? { r: 0, g: 0, b: 0 };
                    const lum = getLuminance(rgb2.r, rgb2.g, rgb2.b);
                    const tc = lum > 0.35 ? '#111827' : '#FFFFFF';
                    return (
                      <button
                        key={label}
                        onClick={() => applyHex(sh)}
                        title={sh}
                        className="flex flex-1 flex-col items-center justify-end rounded-xl pb-2 pt-8 transition hover:scale-105 hover:shadow-md"
                        style={{ background: sh }}
                      >
                        <span className="text-[10px] font-bold" style={{ color: tc }}>{sh}</span>
                        <span className="text-[9px] opacity-70" style={{ color: tc }}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CSS Snippet ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">CSS Variables</h3>
          <CopyBtn
            text={`:root {\n  --color: ${hex};\n  --color-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n  --color-hsl: ${hsl.h}deg ${hsl.s}% ${hsl.l}%;\n}`}
            className="border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
          />
        </div>
        <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-3 text-[12px] leading-relaxed text-zinc-700">
{`:root {
  --color: ${hex};
  --color-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};
  --color-hsl: ${hsl.h}deg ${hsl.s}% ${hsl.l}%;
}`}
        </pre>
      </div>
    </div>
  );
}

export default function ColorPickerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Color Picker & Converter"
      subtitle="Pick any color and instantly convert between HEX, RGB, HSL, HSV, and CMYK. Get WCAG contrast scores, Tailwind-style shades, and color harmony palettes — 100% in-browser."
      toolName="color_picker"
      icon="🎨"
      features={['HEX · RGB · HSL · CMYK', 'WCAG contrast', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<ColorPickerTool />}
    />
  );
}
