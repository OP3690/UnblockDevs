'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Shuffle, Pipette, ChevronRight } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Color math ─────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
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

function hslToRgb(h: number, s: number, l: number) {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255); return { r: v, g: v, b: v }; }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p)*6*t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p)*(2/3-t)*6;
    return p;
  };
  return { r: Math.round(hue2rgb(hn+1/3)*255), g: Math.round(hue2rgb(hn)*255), b: Math.round(hue2rgb(hn-1/3)*255) };
}

function rgbToHsv(r: number, g: number, b: number) {
  const rn=r/255, gn=g/255, bn=b/255;
  const max=Math.max(rn,gn,bn), min=Math.min(rn,gn,bn), d=max-min;
  const s = max===0?0:d/max;
  let h = 0;
  if (d!==0) {
    if (max===rn) h=((gn-bn)/d+(gn<bn?6:0))/6;
    else if (max===gn) h=((bn-rn)/d+2)/6;
    else h=((rn-gn)/d+4)/6;
  }
  return { h: Math.round(h*360), s: Math.round(s*100), v: Math.round(max*100) };
}

function rgbToCmyk(r: number, g: number, b: number) {
  const rn=r/255, gn=g/255, bn=b/255;
  const k = 1-Math.max(rn,gn,bn);
  if (k===1) return { c:0, m:0, y:0, k:100 };
  return {
    c: Math.round((1-rn-k)/(1-k)*100),
    m: Math.round((1-gn-k)/(1-k)*100),
    y: Math.round((1-bn-k)/(1-k)*100),
    k: Math.round(k*100),
  };
}

function getLuminance(r: number, g: number, b: number) {
  const tl = (c: number) => { const n=c/255; return n<=0.03928?n/12.92:Math.pow((n+0.055)/1.055,2.4); };
  return 0.2126*tl(r)+0.7152*tl(g)+0.0722*tl(b);
}

function contrastRatio(r1:number,g1:number,b1:number,r2:number,g2:number,b2:number) {
  const l1=getLuminance(r1,g1,b1), l2=getLuminance(r2,g2,b2);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
}

function shades(r: number, g: number, b: number) {
  const { h, s } = rgbToHsl(r, g, b);
  return [
    {l:95,n:'50'},{l:85,n:'100'},{l:75,n:'200'},{l:62,n:'300'},{l:48,n:'400'},
    {l:rgbToHsl(r,g,b).l,n:'500',base:true},{l:35,n:'600'},{l:25,n:'700'},{l:17,n:'800'},{l:10,n:'900'},
  ].map(({l,n,base}) => ({ hex: rgbToHex(...Object.values(hslToRgb(h,s,l)) as [number,number,number]), n, base }));
}

function harmony(r: number, g: number, b: number) {
  const { h, s, l } = rgbToHsl(r, g, b);
  const mk = (deg: number) => { const rgb=hslToRgb(((h+deg)%360+360)%360,s,l); return rgbToHex(rgb.r,rgb.g,rgb.b); };
  const base = rgbToHex(r,g,b);
  return [
    { name:'Complementary', swatches:[{hex:base,label:'Base'},{hex:mk(180),label:'Complement'}] },
    { name:'Analogous', swatches:[{hex:mk(-30),label:'-30°'},{hex:base,label:'Base'},{hex:mk(30),label:'+30°'}] },
    { name:'Triadic', swatches:[{hex:base,label:'Base'},{hex:mk(120),label:'+120°'},{hex:mk(240),label:'+240°'}] },
    { name:'Split-comp', swatches:[{hex:base,label:'Base'},{hex:mk(150),label:'+150°'},{hex:mk(210),label:'+210°'}] },
  ];
}

function randomHex() { return '#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0').toUpperCase(); }

// ── Copy button ────────────────────────────────────────────────────────────

function CopyBtn({ value, label, mono = true, className = '' }: { value: string; label?: string; mono?: boolean; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(()=>setOk(false),1500); } catch {}
  }, [value]);
  return (
    <button onClick={copy} title="Copy" className={`group inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-400 group-hover:text-zinc-600" />}
      {label && <span className={`${mono?'font-mono':''} truncate`}>{ok?'Copied!':label}</span>}
    </button>
  );
}

// ── Slider with colored track ──────────────────────────────────────────────

function ColorSlider({
  label, value, max, onChange, trackStyle, unit = '',
}: { label: string; value: number; max: number; onChange: (v: number)=>void; trackStyle: string; unit?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 shrink-0 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
      <div className="relative flex-1">
        <div className="h-2 w-full rounded-full" style={{ background: trackStyle }} />
        <input
          type="range" min={0} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
          style={{ WebkitAppearance:'slider-horizontal' }}
        />
        {/* Thumb indicator */}
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md ring-1 ring-zinc-300 transition-all"
          style={{ left: `calc(${(value/max)*100}% - 8px)` }}
        />
      </div>
      <span className="w-9 shrink-0 text-right font-mono text-[11.5px] text-zinc-600">{value}{unit}</span>
    </div>
  );
}

// ── Format row ─────────────────────────────────────────────────────────────

function FormatRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-2.5 shadow-sm hover:border-zinc-200 transition-colors">
      <span className={`w-14 shrink-0 text-[10px] font-bold uppercase tracking-widest ${accent}`}>{label}</span>
      <span className="flex-1 truncate font-mono text-[12.5px] text-zinc-700">{value}</span>
      <CopyBtn value={value} className="text-[11px] text-zinc-400" />
    </div>
  );
}

// ── Main Tool ──────────────────────────────────────────────────────────────

function ColorPickerTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');

  const rgb = hexToRgb(hex) ?? { r: 59, g: 130, b: 246 };
  const { r, g, b } = rgb;
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const palette = shades(r, g, b);
  const harmonies = harmony(r, g, b);

  const cw = contrastRatio(r, g, b, 255, 255, 255);
  const cb = contrastRatio(r, g, b, 0, 0, 0);
  const onWhite = cw > cb;
  const bestRatio = Math.max(cw, cb);
  const wcagAA = bestRatio >= 4.5;
  const wcagAAA = bestRatio >= 7;
  const wcagAALg = bestRatio >= 3;
  const lum = getLuminance(r, g, b);
  const textOnColor = lum > 0.35 ? '#111827' : '#FFFFFF';

  const apply = useCallback((v: string) => {
    const h = v.startsWith('#') ? v : '#' + v;
    const parsed = hexToRgb(h);
    if (parsed) { setHex(h.toUpperCase()); setHexInput(h.toUpperCase()); }
  }, []);

  const setR = useCallback((v: number) => { apply(rgbToHex(v, g, b)); }, [g, b, apply]);
  const setG = useCallback((v: number) => { apply(rgbToHex(r, v, b)); }, [r, b, apply]);
  const setB2 = useCallback((v: number) => { apply(rgbToHex(r, g, v)); }, [r, g, apply]);
  const setH = useCallback((v: number) => { const {r:rr,g:gg,b:bb}=hslToRgb(v,hsl.s,hsl.l); apply(rgbToHex(rr,gg,bb)); }, [hsl.s, hsl.l, apply]);
  const setS = useCallback((v: number) => { const {r:rr,g:gg,b:bb}=hslToRgb(hsl.h,v,hsl.l); apply(rgbToHex(rr,gg,bb)); }, [hsl.h, hsl.l, apply]);
  const setL = useCallback((v: number) => { const {r:rr,g:gg,b:bb}=hslToRgb(hsl.h,hsl.s,v); apply(rgbToHex(rr,gg,bb)); }, [hsl.h, hsl.s, apply]);

  const cssVars = `:root {\n  --color: ${hex};\n  --color-rgb: ${r}, ${g}, ${b};\n  --color-hsl: ${hsl.h}deg ${hsl.s}% ${hsl.l}%;\n}`;

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── HERO: Big Swatch + Sliders ──────────────────────── */}
      <div className="p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">

          {/* Swatch */}
          <div className="flex flex-col gap-3">
            <div
              className="relative flex h-44 sm:h-52 w-full items-end justify-between overflow-hidden rounded-2xl p-4 shadow-lg transition-colors duration-200"
              style={{ background: hex }}
            >
              {/* Bottom gradient scrim */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="relative z-10 font-mono text-[22px] font-black tracking-wider drop-shadow" style={{ color: textOnColor }}>
                {hex}
              </span>
              <div className="relative z-10 flex gap-1.5">
                {/* Native picker button */}
                <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm hover:bg-white/30 transition" style={{ color: textOnColor }}>
                  <Pipette className="h-3.5 w-3.5" />
                  <span>Pick</span>
                  <input type="color" value={hex} onChange={e=>apply(e.target.value)} className="sr-only" />
                </label>
                <button
                  onClick={() => apply(randomHex())}
                  className="flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm hover:bg-white/30 transition"
                  style={{ color: textOnColor }}
                >
                  <Shuffle className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* HEX input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={e => setHexInput(e.target.value)}
                onBlur={() => apply(hexInput)}
                onKeyDown={e => { if (e.key==='Enter') apply(hexInput); }}
                maxLength={7}
                placeholder="#3B82F6"
                className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-mono text-[14px] font-semibold tracking-widest text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <CopyBtn value={hex} className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 hover:bg-zinc-100 text-zinc-500" />
            </div>
          </div>

          {/* Right: Sliders */}
          <div className="space-y-5">
            {/* RGB Sliders */}
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">RGB Channels</p>
                <CopyBtn value={`rgb(${r}, ${g}, ${b})`} label={`rgb(${r}, ${g}, ${b})`} className="text-[11px] text-zinc-400 hover:text-zinc-600" />
              </div>
              <div className="space-y-3">
                <ColorSlider label="R" value={r} max={255} onChange={setR}
                  trackStyle={`linear-gradient(to right, rgb(0,${g},${b}), rgb(255,${g},${b}))`} />
                <ColorSlider label="G" value={g} max={255} onChange={setG}
                  trackStyle={`linear-gradient(to right, rgb(${r},0,${b}), rgb(${r},255,${b}))`} />
                <ColorSlider label="B" value={b} max={255} onChange={setB2}
                  trackStyle={`linear-gradient(to right, rgb(${r},${g},0), rgb(${r},${g},255))`} />
              </div>
            </div>

            {/* HSL Sliders */}
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">HSL</p>
                <CopyBtn value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} className="text-[11px] text-zinc-400 hover:text-zinc-600" />
              </div>
              <div className="space-y-3">
                <ColorSlider label="H" value={hsl.h} max={360} onChange={setH} unit="°"
                  trackStyle="linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" />
                <ColorSlider label="S" value={hsl.s} max={100} onChange={setS} unit="%"
                  trackStyle={`linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))`} />
                <ColorSlider label="L" value={hsl.l} max={100} onChange={setL} unit="%"
                  trackStyle={`linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── All Formats ─────────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">All Formats</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <FormatRow label="HEX" value={hex} accent="text-zinc-500" />
          <FormatRow label="RGB" value={`rgb(${r}, ${g}, ${b})`} accent="text-blue-500" />
          <FormatRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} accent="text-violet-500" />
          <FormatRow label="HSV" value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`} accent="text-indigo-500" />
          <FormatRow label="CMYK" value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} accent="text-amber-600" />
          <FormatRow label="CSS oklch" value={`oklch(${(Math.cbrt(getLuminance(r,g,b))*100).toFixed(1)}% 0.2 ${hsl.h})`} accent="text-emerald-600" />
        </div>
      </div>

      {/* ── WCAG Contrast ───────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">WCAG Accessibility</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Live preview vs white */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-2">
              <span className="text-[11px] font-semibold text-zinc-500">On white bg</span>
              <span className="font-mono text-[11px] font-bold text-zinc-700">{cw.toFixed(2)}:1</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-4">
              <span className="text-[15px] font-semibold" style={{ color: hex }}>Aa Sample text</span>
              <span className="ml-auto flex gap-1.5">
                {[{l:'AA',p:cw>=4.5},{l:'AAA',p:cw>=7},{l:'Large',p:cw>=3}].map(({l,p})=>(
                  <span key={l} className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${p?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-600'}`}>{l}</span>
                ))}
              </span>
            </div>
          </div>
          {/* Live preview vs black */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-900 px-4 py-2">
              <span className="text-[11px] font-semibold text-zinc-400">On dark bg</span>
              <span className="font-mono text-[11px] font-bold text-zinc-300">{cb.toFixed(2)}:1</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-900 p-4">
              <span className="text-[15px] font-semibold" style={{ color: hex }}>Aa Sample text</span>
              <span className="ml-auto flex gap-1.5">
                {[{l:'AA',p:cb>=4.5},{l:'AAA',p:cb>=7},{l:'Large',p:cb>=3}].map(({l,p})=>(
                  <span key={l} className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${p?'bg-emerald-900 text-emerald-400':'bg-red-900 text-red-400'}`}>{l}</span>
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* Color on itself preview */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: hex }}
          >
            <span className="text-[15px] font-semibold" style={{ color: textOnColor }}>Text on this background</span>
            <span
              className="rounded-lg px-3 py-1.5 text-[12px] font-bold"
              style={{ background: textOnColor==='#FFFFFF'?'rgba(255,255,255,0.15)':'rgba(0,0,0,0.12)', color: textOnColor }}
            >
              Best text: {textOnColor==='#FFFFFF'?'White':'Black'} — {bestRatio.toFixed(2)}:1
            </span>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-zinc-100 bg-white px-4 py-3">
            {[
              { label: 'AA Normal (4.5:1)', pass: wcagAA },
              { label: 'AAA Normal (7:1)', pass: wcagAAA },
              { label: 'AA Large Text (3:1)', pass: wcagAALg },
            ].map(({ label, pass }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  pass ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-600'
                }`}
              >
                {pass ? '✓' : '✗'} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Shade Palette ───────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tailwind-style Shade Scale</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {palette.map(({ hex: sh, n, base }) => {
            const rgb2 = hexToRgb(sh) ?? { r:0,g:0,b:0 };
            const tc = getLuminance(rgb2.r, rgb2.g, rgb2.b) > 0.35 ? '#111827' : '#FFFFFF';
            return (
              <button
                key={n}
                onClick={() => apply(sh)}
                title={`${sh} — ${n}`}
                className={`group flex min-w-[52px] flex-1 flex-col items-center gap-1 rounded-xl py-5 transition-all hover:scale-[1.06] hover:shadow-lg active:scale-100 ${base?'ring-2 ring-offset-1 ring-zinc-900 shadow-md':''}`}
                style={{ background: sh }}
              >
                <span className="text-[10px] font-black" style={{ color: tc }}>{n}</span>
                <span className="hidden text-[8.5px] opacity-70 sm:block" style={{ color: tc }}>{sh}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-zinc-400">Click any shade to make it active</p>
      </div>

      {/* ── Color Harmony ───────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Color Harmony</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {harmonies.map(({ name, swatches }) => (
            <div key={name} className="overflow-hidden rounded-2xl border border-zinc-100 shadow-sm">
              <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-2">
                <p className="text-[11px] font-semibold text-zinc-500">{name}</p>
              </div>
              <div className="flex h-20 divide-x divide-white/40">
                {swatches.map(({ hex: sh, label }) => {
                  const rgb2=hexToRgb(sh)??{r:0,g:0,b:0};
                  const tc=getLuminance(rgb2.r,rgb2.g,rgb2.b)>0.35?'#111827':'#FFFFFF';
                  return (
                    <button
                      key={label}
                      onClick={() => apply(sh)}
                      title={sh}
                      className="group flex flex-1 flex-col items-center justify-end pb-2.5 transition hover:brightness-95"
                      style={{ background: sh }}
                    >
                      <span className="text-[10px] font-bold drop-shadow-sm" style={{ color: tc }}>{sh}</span>
                      <span className="text-[9px] opacity-60" style={{ color: tc }}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CSS Variables Snippet ────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-2 text-[11px] font-medium text-zinc-400">styles.css</span>
            </div>
            <CopyBtn value={cssVars} label="Copy" className="rounded-lg bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600 gap-1.5" mono={false} />
          </div>
          {/* Code */}
          <pre className="overflow-x-auto bg-zinc-950 px-5 py-4 text-[13px] leading-7">
            <span className="text-violet-400">:root</span>
            <span className="text-zinc-300"> {'{'}</span>{'\n'}
            <span className="text-zinc-500">{'  '}--color</span>
            <span className="text-zinc-300">: </span>
            <span className="text-emerald-400">{hex}</span>
            <span className="text-zinc-300">;</span>{'\n'}
            <span className="text-zinc-500">{'  '}--color-rgb</span>
            <span className="text-zinc-300">: </span>
            <span className="text-sky-400">{r}, {g}, {b}</span>
            <span className="text-zinc-300">;</span>{'\n'}
            <span className="text-zinc-500">{'  '}--color-hsl</span>
            <span className="text-zinc-300">: </span>
            <span className="text-amber-400">{hsl.h}deg {hsl.s}% {hsl.l}%</span>
            <span className="text-zinc-300">;</span>{'\n'}
            <span className="text-zinc-300">{'}'}</span>
          </pre>
        </div>
      </div>

    </div>
  );
}

export default function ColorPickerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Color Picker & Converter"
      subtitle="Pick any color — instantly convert HEX, RGB, HSL, HSV, CMYK. Visual sliders, WCAG contrast checker, Tailwind shade scale, and color harmony. 100% in-browser."
      toolName="color_picker"
      icon="🎨"
      features={['HEX · RGB · HSL · CMYK', 'WCAG AA/AAA', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<ColorPickerTool />}
    />
  );
}
