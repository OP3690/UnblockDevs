'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertTriangle, Info, XCircle, Zap, ArrowRight, ChevronDown } from 'lucide-react';

// ── useInView hook for scroll-triggered animations ──────────────────────────
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── AlertBox ─────────────────────────────────────────────────────────────────
// Usage: <AlertBox type="info" title="Key point">...</AlertBox>
// Types: "info" | "warning" | "success" | "error" | "tip"
export function AlertBox({ type = 'info', title, children, filename: _filename }: { type?: 'info'|'warning'|'success'|'error'|'tip'; title?: string; children: React.ReactNode; filename?: string }) {
  const styles = {
    info:    { bg: 'bg-blue-50',   border: 'border-blue-400',   icon: <Info className="h-5 w-5 text-blue-500" />,    text: 'text-blue-900',   title: 'text-blue-800' },
    warning: { bg: 'bg-amber-50',  border: 'border-amber-400',  icon: <AlertTriangle className="h-5 w-5 text-amber-500" />, text: 'text-amber-900',  title: 'text-amber-800' },
    success: { bg: 'bg-emerald-50',border: 'border-emerald-400',icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, text: 'text-emerald-900', title: 'text-emerald-800' },
    error:   { bg: 'bg-red-50',    border: 'border-red-400',    icon: <XCircle className="h-5 w-5 text-red-500" />,   text: 'text-red-900',    title: 'text-red-800' },
    tip:     { bg: 'bg-violet-50', border: 'border-violet-400', icon: <Zap className="h-5 w-5 text-violet-500" />,   text: 'text-violet-900', title: 'text-violet-800' },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border-l-4 ${s.border} rounded-r-xl p-4 my-6`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{s.icon}</span>
        <div>
          {title && <p className={`font-semibold mb-1 ${s.title}`}>{title}</p>}
          <div className={`text-sm leading-relaxed ${s.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── FlowDiagram ───────────────────────────────────────────────────────────────
// Horizontal animated flow with arrows
// Usage: <FlowDiagram steps={[{label:'Step 1', desc:'...', color:'emerald'}]} />
export function FlowDiagram({ steps: stepsRaw, title }: { steps: { label: string; desc?: string; description?: string; icon?: React.ReactNode; color?: string }[]; title?: string }) {
  const steps = stepsRaw.map(s => ({ ...s, desc: s.desc ?? s.description ?? '' }));
  const { ref, inView } = useInView();
  const COLOR_ALIAS: Record<string,string> = { red: 'rose', purple: 'violet', green: 'emerald', gray: 'zinc', grey: 'zinc', teal: 'sky', indigo: 'violet' };
  const COLORS: Record<string, string> = {
    emerald: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    blue: 'bg-blue-100 border-blue-300 text-blue-800',
    violet: 'bg-violet-100 border-violet-300 text-violet-800',
    amber: 'bg-amber-100 border-amber-300 text-amber-800',
    rose: 'bg-rose-100 border-rose-300 text-rose-800',
    zinc: 'bg-zinc-100 border-zinc-300 text-zinc-800',
    sky: 'bg-sky-100 border-sky-300 text-sky-800',
    orange: 'bg-orange-100 border-orange-300 text-orange-800',
  };
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="text-base font-semibold text-zinc-700 mb-4 uppercase tracking-wide text-[11px]">{title}</h3>}
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => {
          const resolvedColor = COLOR_ALIAS[step.color ?? ''] ?? step.color ?? 'blue';
          const c = COLORS[resolvedColor] ?? COLORS.blue;
          return (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`rounded-xl border px-4 py-3 text-center min-w-[110px] transition-all duration-500 ${c} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {step.icon && <div className="flex justify-center mb-1">{step.icon}</div>}
                <p className="font-semibold text-[13px]">{step.label}</p>
                {step.desc && <p className="text-[11px] mt-0.5 opacity-75">{step.desc}</p>}
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className={`h-4 w-4 text-zinc-400 shrink-0 transition-all duration-300 ${inView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${i * 120 + 80}ms` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── VerticalSteps ─────────────────────────────────────────────────────────────
// Numbered vertical steps with connecting line
// Usage: <VerticalSteps steps={[{title:'', desc:'', code:''}]} />
export function VerticalSteps({ steps: stepsRaw, title }: { steps: { title: string; desc?: string; description?: string; code?: string; badge?: string }[]; title?: string }) {
  const steps = stepsRaw.map(s => ({ ...s, desc: s.desc ?? s.description ?? '' }));
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="text-lg font-bold text-zinc-900 mb-5">{title}</h3>}
      <div className="relative pl-8">
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-zinc-200" />
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative mb-6 transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white text-[12px] font-bold">
              {i + 1}
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-zinc-900 text-[15px]">{step.title}</h4>
                {step.badge && <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">{step.badge}</span>}
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-600">{step.desc}</p>
              {step.code && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[12px] text-emerald-300"><code>{step.code}</code></pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CompareTable ──────────────────────────────────────────────────────────────
// Supports three APIs:
//   A: <CompareTable left={{title:'A', items:[...]}} right={{title:'B', items:[...]}} />
//   B: <CompareTable headers={['Col1','Col2',...]} rows={[['a','b'],['c','d']]} />
//   C: <CompareTable leftLabel="X" rightLabel="Y" rows={[{label:'',left:'',right:''}]} />
export function CompareTable({ left, right, headers, rows, leftLabel, rightLabel, title }: {
  left?: { title: string; color?: string; items: string[] };
  right?: { title: string; color?: string; items: string[] };
  headers?: string[];
  rows?: ({ label: string; left: string; right: string } | string[])[];
  leftLabel?: string;
  rightLabel?: string;
  title?: string;
}) {
  const { ref, inView } = useInView();
  // ── API C: leftLabel/rightLabel + rows of {label, left, right} ──
  if ((leftLabel || rightLabel) && rows && rows.length > 0) {
    const objRows = rows as { label: string; left: string; right: string }[];
    return (
      <div ref={ref} className="my-8 overflow-x-auto">
        {title && <h3 className="text-lg font-bold text-zinc-900 mb-4">{title}</h3>}
        <table className={`w-full text-[13px] border-collapse rounded-xl overflow-hidden shadow-sm transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <thead>
            <tr>
              <th className="bg-zinc-800 text-white px-4 py-2.5 text-left font-semibold text-[12px] w-1/4">Item</th>
              <th className="bg-zinc-800 text-white px-4 py-2.5 text-left font-semibold text-[12px]">{leftLabel ?? 'Left'}</th>
              <th className="bg-zinc-800 text-white px-4 py-2.5 text-left font-semibold text-[12px]">{rightLabel ?? 'Right'}</th>
            </tr>
          </thead>
          <tbody>
            {objRows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                <td className="border-b border-zinc-200 px-4 py-2.5 text-zinc-900 font-medium">{row.label}</td>
                <td className="border-b border-zinc-200 px-4 py-2.5 text-zinc-700">{row.left}</td>
                <td className="border-b border-zinc-200 px-4 py-2.5 text-zinc-700">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // ── API B: headers array + rows as string[][] ──
  if (headers && rows) {
    const strRows = rows as string[][];
    return (
      <div ref={ref} className="my-8 overflow-x-auto">
        {title && <h3 className="text-lg font-bold text-zinc-900 mb-4">{title}</h3>}
        <table className={`w-full text-[13px] border-collapse rounded-xl overflow-hidden shadow-sm transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="bg-zinc-800 text-white px-4 py-2.5 text-left font-semibold text-[12px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {strRows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border-b border-zinc-200 px-4 py-2.5 text-zinc-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // ── API A: Two-column left/right rendering ──
  if (!left || !right) return null;
  const lCol = left.color ?? 'rose';
  const rCol = right.color ?? 'emerald';
  const HEADER: Record<string,string> = {
    rose: 'bg-rose-600 text-white', emerald: 'bg-emerald-600 text-white', blue: 'bg-blue-600 text-white',
    violet: 'bg-violet-600 text-white', amber: 'bg-amber-600 text-white', sky: 'bg-sky-600 text-white',
  };
  const ROW: Record<string,string> = {
    rose: 'border-rose-100 odd:bg-rose-50/40', emerald: 'border-emerald-100 odd:bg-emerald-50/40',
    blue: 'border-blue-100 odd:bg-blue-50/40', violet: 'border-violet-100 odd:bg-violet-50/40',
    amber: 'border-amber-100 odd:bg-amber-50/40', sky: 'border-sky-100 odd:bg-sky-50/40',
  };
  const maxLen = Math.max(left.items.length, right.items.length);
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="text-lg font-bold text-zinc-900 mb-4">{title}</h3>}
      <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {[{ col: left, c: lCol }, { col: right, c: rCol }].map(({ col, c }, ci) => (
          <div key={ci} className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
            <div className={`px-4 py-3 text-center font-semibold text-[14px] ${HEADER[c]}`}>{col.title}</div>
            {Array.from({ length: maxLen }, (_, i) => (
              <div key={i} className={`border-b px-4 py-2.5 text-[13px] text-zinc-700 ${ROW[c]}`}>
                {col.items[i] ?? '—'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ArchDiagram ───────────────────────────────────────────────────────────────
// Box-and-arrow architecture diagram
// Usage: <ArchDiagram nodes={[{id:'producer',label:'Producer',color:'blue',...}]} />
// Also supports: <ArchDiagram boxes={[{label:'X',color:'blue'}]} arrows={[...]} />
export function ArchDiagram({ nodes: nodesProp, boxes, arrows: _arrows, layers, title, subtitle }: {
  nodes?: { id: string; label: string; sublabel?: string; color?: string; icon?: React.ReactNode }[];
  boxes?: { label: string; color?: string; sublabel?: string; icon?: React.ReactNode }[];
  arrows?: string[];
  layers?: { name: string; components: string[]; color?: string }[];
  title?: string;
  subtitle?: string;
}) {
  const COLOR_ALIAS: Record<string, string> = { red: 'rose', purple: 'violet', green: 'emerald', gray: 'zinc', grey: 'zinc', teal: 'sky', indigo: 'violet' };
  const { ref, inView } = useInView();
  const COLORS: Record<string,string> = {
    blue: 'bg-blue-600 text-white', emerald: 'bg-emerald-600 text-white', violet: 'bg-violet-600 text-white',
    amber: 'bg-amber-500 text-white', rose: 'bg-rose-600 text-white', zinc: 'bg-zinc-700 text-white',
    sky: 'bg-sky-600 text-white', orange: 'bg-orange-600 text-white',
  };
  const LAYER_COLORS = ['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-amber-500', 'bg-sky-600', 'bg-rose-600'];
  // ── Layers rendering ──
  if (layers && layers.length > 0) {
    return (
      <div ref={ref} className="my-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        {title && <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{title}</p>}
        <div className="flex flex-col gap-2">
          {layers.map((layer, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`shrink-0 rounded-lg px-3 py-2 text-center text-[12px] font-semibold text-white w-36 ${LAYER_COLORS[i % LAYER_COLORS.length]}`}>{layer.name}</div>
              <div className="flex flex-wrap gap-1.5">
                {layer.components.map((c, j) => (
                  <span key={j} className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[12px] text-zinc-700 shadow-sm">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // ── Nodes / boxes rendering ──
  const raw = nodesProp ?? boxes ?? [];
  const nodes = raw.map((n, i) => ({
    id: (n as { id?: string }).id ?? String(i),
    label: n.label,
    sublabel: n.sublabel,
    color: COLOR_ALIAS[n.color ?? ''] ?? n.color,
    icon: n.icon,
  }));
  return (
    <div ref={ref} className="my-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
      {title && <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{title}</p>}
      {subtitle && <p className="mb-5 text-center text-[13px] text-zinc-500">{subtitle}</p>}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((n, i) => (
          <div key={n.id} className="flex items-center gap-2">
            <div
              className={`flex min-w-[110px] flex-col items-center rounded-xl px-4 py-3 text-center shadow-sm transition-all duration-500 ${COLORS[n.color ?? 'blue']} ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {n.icon && <span className="mb-1">{n.icon}</span>}
              <span className="text-[13px] font-semibold">{n.label}</span>
              {n.sublabel && <span className="mt-0.5 text-[10px] opacity-75">{n.sublabel}</span>}
            </div>
            {i < nodes.length - 1 && (
              <ArrowRight className={`h-5 w-5 shrink-0 text-zinc-400 transition-all duration-300 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 100 + 60}ms` }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── StatGrid ──────────────────────────────────────────────────────────────────
// Animated stat highlight cards
// Usage: <StatGrid stats={[{value:'99.9%', label:'Uptime', color:'emerald'}]} />
export function StatGrid({ stats: statsRaw, title }: { stats: { value: string; label?: string; desc?: string; description?: string; color?: string; left?: boolean; right?: boolean; [key: string]: unknown }[]; title?: string }) {
  const stats = statsRaw.map(s => ({ ...s, label: s.label ?? s.description ?? '', desc: s.desc ?? s.description }));
  const { ref, inView } = useInView();
  const COLORS: Record<string,string> = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    violet: 'text-violet-600 bg-violet-50 border-violet-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
    rose: 'text-rose-600 bg-rose-50 border-rose-200',
    zinc: 'text-zinc-700 bg-zinc-50 border-zinc-200',
  };
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="mb-4 text-lg font-bold text-zinc-900">{title}</h3>}
      <div className={`grid gap-3 ${stats.length <= 2 ? 'grid-cols-2' : stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {stats.map((s, i) => {
          const c = COLORS[s.color ?? 'blue'];
          const isLong = s.value.length > 6;
          return (
            <div
              key={i}
              className={`rounded-xl border p-4 text-center transition-all duration-500 overflow-hidden ${c} ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className={`font-black tracking-tight break-words hyphens-auto leading-tight ${isLong ? 'text-lg' : 'text-2xl'}`}>{s.value}</p>
              <p className="mt-1 text-[12px] font-semibold leading-snug">{s.label}</p>
              {s.desc && <p className="mt-0.5 text-[11px] opacity-70">{s.desc}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── KeyPointsGrid ─────────────────────────────────────────────────────────────
// Grid of concept cards with icons
// Usage: <KeyPointsGrid points={[{title:'',desc:''}]} /> OR items/columns aliases
export function KeyPointsGrid({ points: pts, items, title, cols, columns }: {
  points?: { title: string; desc?: string; description?: string; icon?: React.ReactNode; color?: string }[];
  items?: { title: string; desc?: string; description?: string; icon?: React.ReactNode; color?: string }[];
  title?: string;
  cols?: 1|2|3|4;
  columns?: 1|2|3|4;
}) {
  const points = (pts ?? items ?? []).map(p => ({ ...p, desc: p.desc ?? p.description ?? '' }));
  const colCount: 1|2|3|4 = (cols ?? columns ?? 2) as 1|2|3|4;
  const { ref, inView } = useInView();
  const GRID = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
  const COLORS: Record<string,string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
    sky: 'bg-sky-50 border-sky-200 text-sky-700',
    zinc: 'bg-zinc-50 border-zinc-200 text-zinc-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="mb-4 text-lg font-bold text-zinc-900">{title}</h3>}
      <div className={`grid grid-cols-1 gap-3 ${GRID[colCount]}`}>
        {points.map((p, i) => {
          const c = COLORS[p.color ?? 'blue'];
          return (
            <div
              key={i}
              className={`rounded-xl border p-4 transition-all duration-500 ${c} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {p.icon && <div className="mb-2">{p.icon}</div>}
              <h4 className="font-semibold text-[14px]">{p.title}</h4>
              <p className="mt-1 text-[12.5px] leading-relaxed opacity-85">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────
// Dark code block with language label and copy button
// Usage: <CodeBlock lang="javascript" title="Check content-type">{`code here`}</CodeBlock>
export function CodeBlock({ children, lang: langProp, language, title: titleProp, filename, bad, good }: { children: string; lang?: string; language?: string; title?: string; filename?: string; bad?: boolean; good?: boolean }) {
  const lang = langProp ?? language;
  const title = titleProp ?? filename;
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const border = bad ? 'border-rose-500/40' : good ? 'border-emerald-500/40' : 'border-zinc-700';
  const badge = bad ? 'bg-rose-500 text-white' : good ? 'bg-emerald-500 text-white' : 'bg-zinc-700 text-zinc-300';
  const label = bad ? '❌ Bad' : good ? '✅ Good' : (lang ?? 'code');
  return (
    <div className={`my-5 overflow-hidden rounded-xl border ${border} bg-zinc-950`}>
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge}`}>{label}</span>
        {title && <span className="text-[11px] text-zinc-500">{title}</span>}
        <button onClick={copy} className="rounded px-2 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-100"><code>{children.trim()}</code></pre>
    </div>
  );
}

// ── TimelineViz ───────────────────────────────────────────────────────────────
// Vertical or horizontal timeline
// Usage: <TimelineViz items={[{year:'2011', title:'Kafka created', desc:'...'}]} />
export function TimelineViz({ items: itemsProp, events, title }: { items?: { year?: string; title: string; desc?: string; description?: string; color?: string }[]; events?: { year?: string; title: string; desc?: string; description?: string; color?: string }[]; title?: string }) {
  const rawItems = itemsProp ?? events ?? [];
  const items = rawItems.map(i => ({ ...i, desc: i.desc ?? i.description ?? '' }));
  const { ref, inView } = useInView();
  const DOT: Record<string,string> = {
    emerald: 'bg-emerald-500', blue: 'bg-blue-500', violet: 'bg-violet-500',
    amber: 'bg-amber-500', rose: 'bg-rose-500', zinc: 'bg-zinc-500', sky: 'bg-sky-500',
  };
  return (
    <div ref={ref} className="my-8">
      {title && <h3 className="mb-5 text-lg font-bold text-zinc-900">{title}</h3>}
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-zinc-200" />
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative mb-6 transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className={`absolute -left-6 top-1.5 h-4 w-4 rounded-full border-2 border-white shadow-sm ${DOT[item.color ?? 'blue']}`} />
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              {item.year && <span className="mb-1 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600">{item.year}</span>}
              <h4 className="font-semibold text-zinc-900 text-[14px]">{item.title}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QuickFact ─────────────────────────────────────────────────────────────────
// Highlighted callout for a single important fact
// Usage: <QuickFact color="violet">Kafka can handle 1M+ messages/second per broker</QuickFact>
export function QuickFact({ children, color = 'violet', label = 'Quick fact' }: { children: React.ReactNode; color?: string; label?: string }) {
  const COLORS: Record<string,string> = {
    violet: 'from-violet-600 to-purple-600',
    emerald: 'from-emerald-600 to-teal-600',
    blue: 'from-blue-600 to-sky-600',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-600 to-pink-600',
  };
  return (
    <div className={`my-8 overflow-hidden rounded-2xl bg-gradient-to-r ${COLORS[color] ?? COLORS.violet} p-px`}>
      <div className="rounded-[calc(1rem-1px)] bg-white p-5">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{label}</p>
        <p className="text-[15px] font-semibold leading-relaxed text-zinc-900">{children}</p>
      </div>
    </div>
  );
}

// ── ErrorFix ──────────────────────────────────────────────────────────────────
// Side-by-side bad/good code comparison
// Usage: <ErrorFix bad="bad code" good="good code" errorMsg="SyntaxError: ..." />
export function ErrorFix({ bad, good, errorMsg, title, badLabel, goodLabel }: { bad: string; good: string; errorMsg?: string; title?: string; badLabel?: string; goodLabel?: string; [key: string]: unknown }) {
  return (
    <div className="my-8">
      {title && <h4 className="mb-3 font-semibold text-zinc-900">{title}</h4>}
      {errorMsg && (
        <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 font-mono text-[12px] text-rose-700">
          <span className="font-bold">Error: </span>{errorMsg}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          {badLabel && <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-rose-600">{badLabel}</p>}
          <CodeBlock bad>{bad}</CodeBlock>
        </div>
        <div>
          {goodLabel && <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">{goodLabel}</p>}
          <CodeBlock good>{good}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
// Styled H2 section header with number badge
// Usage: <SectionHeader n={1} title="What is Kafka?" icon={<Database />} color="red" />
export function SectionHeader({ n, number: num, title, icon, color = 'blue', subtitle, className: _className }: { n?: number; number?: number; title: string; icon?: React.ReactNode; color?: string; subtitle?: string; className?: string }) {
  n = n ?? num;
  const COLORS: Record<string,string> = {
    blue: 'bg-blue-100 text-blue-700', emerald: 'bg-emerald-100 text-emerald-700',
    violet: 'bg-violet-100 text-violet-700', amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700', red: 'bg-red-100 text-red-700',
    sky: 'bg-sky-100 text-sky-700', zinc: 'bg-zinc-100 text-zinc-700',
    orange: 'bg-orange-100 text-orange-700',
  };
  return (
    <div className="mb-6 mt-12 flex items-start gap-3">
      {(n !== undefined || icon) && (
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${COLORS[color]}`}>
          {icon ?? <span className="font-bold text-[15px]">{n}</span>}
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold leading-snug text-zinc-900 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-[13.5px] text-zinc-500">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── ToolCTA ───────────────────────────────────────────────────────────────────
// Call-to-action box linking to a tool
// Usage: <ToolCTA href="/json-validator" label="Try JSON Validator" desc="Validate your JSON in seconds." />
export function ToolCTA({ href, label: labelProp, title, desc: descProp, description, buttonText, color = 'emerald' }: { href: string; label?: string; title?: string; desc?: string; description?: string; buttonText?: string; color?: string }) {
  const label = labelProp ?? title ?? 'Try it';
  const desc = descProp ?? description;
  const COLORS: Record<string,string> = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700', blue: 'bg-blue-600 hover:bg-blue-700',
    violet: 'bg-violet-600 hover:bg-violet-700', amber: 'bg-amber-500 hover:bg-amber-600',
  };
  return (
    <div className="my-8 flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center">
      {desc && <p className="text-[14px] text-zinc-600">{desc}</p>}
      <a
        href={href}
        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white transition-colors ${COLORS[color] ?? COLORS.emerald}`}
      >
        {buttonText ?? label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

// ── FAQAccordion ──────────────────────────────────────────────────────────────
// Interactive expandable FAQ with smooth animation
// Usage: <FAQAccordion items={[{q:'...', a:'...'}]} />
export function FAQAccordion({ items, title = 'Frequently Asked Questions' }: { items: { q?: string; a?: string; question?: string; answer?: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="my-10">
      <h2 className="mb-5 text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h2>
      <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {items.map((item, i) => {
          const q = item.q ?? item.question ?? '';
          const a = item.a ?? item.answer ?? '';
          return (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-[14.5px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              {q}
              <ChevronDown className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="border-t border-zinc-100 bg-zinc-50 px-5 py-4 text-[13.5px] leading-relaxed text-zinc-600">
                {a}
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}
