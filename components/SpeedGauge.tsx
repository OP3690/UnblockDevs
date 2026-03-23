'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Radio } from 'lucide-react';

const ARC_PATH_D = 'M 30 150 A 85 85 0 1 1 170 150';

/** Scale max so the needle sits in a meaningful range (not 0–1G for 100 Mbps). */
function getScaleMax(value: number): number {
  if (value <= 0) return 100;
  const nice = [50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 1000];
  for (const n of nice) {
    if (value <= n) return n;
  }
  return 1000;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

/** Angle (deg) for SVG rotate: default needle points up (to 12 o'clock); rotate so tip aims at (px,py). */
function needleRotateDeg(cx: number, cy: number, px: number, py: number): number {
  const dx = px - cx;
  const dy = py - cy;
  return (Math.atan2(dx, -(dy)) * 180) / Math.PI;
}

type ArcLayout = {
  totalLen: number;
  majors: { t: number; lx: number; ly: number; tx: number; ty: number; label: string }[];
  minors: { i1x: number; i1y: number; o1x: number; o1y: number }[];
};

function buildArcLayout(scaleMax: number): ArcLayout | null {
  if (typeof document === 'undefined') return null;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ARC_PATH_D);
  const totalLen = path.getTotalLength();
  if (!totalLen || !Number.isFinite(totalLen)) return null;

  const cx = 100;
  const cy = 100;
  const labelOutset = 14;
  const tickLen = 8;
  /** Drop scale numbers that would sit under the center readout (e.g. “50” behind a big “0”) */
  const MIN_LABEL_DIST_FROM_CENTER = 76;
  /** Top-center tick labels sit above the big digit but still bleed subpixels into the readout */
  const TOP_READOUT_EXCLUSION = (lx: number, ly: number) =>
    Math.abs(lx - cx) < 44 && ly < cy - 34;

  const markVals = [0, scaleMax / 4, scaleMax / 2, (3 * scaleMax) / 4, scaleMax].map((n) => Math.round(n));
  const majors = [0, 0.25, 0.5, 0.75, 1]
    .map((t, i) => {
      const pt = path.getPointAtLength(t * totalLen);
      const dx = pt.x - cx;
      const dy = pt.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      const lx = pt.x + nx * labelOutset;
      const ly = pt.y + ny * labelOutset;
      const v = markVals[i]!;
      const label = v >= 1000 ? '1G' : String(v);
      return { t, lx, ly, tx: pt.x, ty: pt.y, label };
    })
    .filter(
      (m) =>
        Math.hypot(m.lx - cx, m.ly - cy) >= MIN_LABEL_DIST_FROM_CENTER && !TOP_READOUT_EXCLUSION(m.lx, m.ly)
    );

  const minorFracs = [1, 3, 5, 7].map((k) => k / 8);
  const minors = minorFracs
    .map((f) => {
      const pt = path.getPointAtLength(f * totalLen);
      const dx = pt.x - cx;
      const dy = pt.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      const o1x = pt.x + nx * 2;
      const o1y = pt.y + ny * 2;
      const i1x = pt.x - nx * tickLen;
      const i1y = pt.y - ny * tickLen;
      return { i1x, i1y, o1x, o1y };
    })
    .filter((m) => Math.hypot((m.i1x + m.o1x) / 2 - cx, (m.i1y + m.o1y) / 2 - cy) >= 58);

  return { totalLen, majors, minors };
}

/** True geometric length of ARC_PATH_D (large-arc SVG ≠ π·r; stroke-dash must match or fill caps early). */
function measureArcPathLength(): number {
  if (typeof document === 'undefined') return Math.PI * 85;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ARC_PATH_D);
  const len = path.getTotalLength();
  return len > 0 && Number.isFinite(len) ? len : Math.PI * 85;
}

export function SpeedGauge({
  value,
  phase,
}: {
  value: number;
  phase: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [smoothPct, setSmoothPct] = useState(0);
  const prevPhaseRef = useRef(phase);
  const valueRef = useRef(value);
  const phaseRef = useRef(phase);
  const scaleMaxRef = useRef(100);
  const [arcLayout, setArcLayout] = useState<ArcLayout | null>(null);

  valueRef.current = value;
  phaseRef.current = phase;

  const scaleMax = getScaleMax(
    phase === 'download' || phase === 'upload' ? value : Math.max(value, displayValue)
  );
  scaleMaxRef.current = scaleMax;

  useLayoutEffect(() => {
    setArcLayout(buildArcLayout(scaleMax));
  }, [scaleMax]);

  /** Smooth needle & arc during live sampling — single RAF loop per phase */
  useEffect(() => {
    if (phase !== 'download' && phase !== 'upload') {
      return;
    }

    let raf = 0;
    const tick = () => {
      const ph = phaseRef.current;
      if (ph !== 'download' && ph !== 'upload') return;
      const sm = scaleMaxRef.current;
      const v = valueRef.current;
      const tgt = Math.min(v / sm, 1);
      setSmoothPct((prev) => {
        const diff = tgt - prev;
        if (Math.abs(diff) < 0.002) return tgt;
        return prev + diff * 0.22;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase === 'download' || phase === 'upload' || phase === 'ping') {
      setDisplayValue(value);
    }
  }, [phase, value]);

  useEffect(() => {
    if (prevPhaseRef.current === 'upload' && phase === 'complete' && value > 0) {
      const duration = 900;
      const steps = 36;
      const stepMs = duration / steps;
      const increment = value / steps;
      let current = 0;
      const id = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(id);
        } else {
          setDisplayValue(Math.round(current * 10) / 10);
        }
      }, stepMs);
      return () => clearInterval(id);
    }
    if (phase === 'idle') {
      setDisplayValue(0);
      setSmoothPct(0);
    }
    prevPhaseRef.current = phase;
  }, [phase, value]);

  const percentage =
    phase === 'download' || phase === 'upload' ? smoothPct : Math.min(displayValue / scaleMax, 1);
  /** Must equal SVG path length — was π·85 but path uses large-arc (longer); wrong length capped bar ~70% of arc. */
  const arcRenderLength = useMemo(() => {
    if (arcLayout?.totalLen && arcLayout.totalLen > 0) return arcLayout.totalLen;
    return measureArcPathLength();
  }, [arcLayout?.totalLen]);
  const strokeDashoffset = arcRenderLength - arcRenderLength * percentage;

  const cx = 100;
  const cy = 100;
  const needleLen = 76;

  const needleAngle = useMemo(() => {
    if (typeof document === 'undefined' || !arcLayout || arcLayout.totalLen <= 0) {
      return -135 + percentage * 270;
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', ARC_PATH_D);
    const pt = path.getPointAtLength(Math.min(percentage, 1) * arcLayout.totalLen);
    return needleRotateDeg(cx, cy, pt.x, pt.y);
  }, [arcLayout, percentage]);

  const showValue =
    phase === 'download' || phase === 'upload' ? value : displayValue;
  const isActive = phase === 'download' || phase === 'upload' || phase === 'ping';
  const showMbpsSubtitle = showValue > 0 && (phase === 'download' || phase === 'upload' || phase === 'complete');
  const isIdle = phase === 'idle';
  const isComplete = phase === 'complete';

  const phaseLabel =
    phase === 'idle'
      ? 'Ready'
      : phase === 'complete'
        ? 'Complete'
        : phase === 'ping'
          ? 'Measuring latency…'
          : phase === 'download'
            ? 'Testing download…'
            : 'Testing upload…';

  const PhaseIcon =
    phase === 'download' ? ArrowDown : phase === 'upload' ? ArrowUp : phase === 'ping' ? Radio : null;

  const needleTransition =
    phase === 'download' || phase === 'upload'
      ? 'none'
      : 'transform 0.65s cubic-bezier(0.34, 1.2, 0.64, 1)';

  /** Fallback ticks when layout not ready (SSR / first paint) */
  const r = 96;
  const scaleMaxForTicks = scaleMax;
  const minorTicksFallback = [1, 3, 5, 7].map((k) => (k / 8) * scaleMaxForTicks);
  const scaleMarksFallback = [0, scaleMaxForTicks / 4, scaleMaxForTicks / 2, (3 * scaleMaxForTicks) / 4, scaleMaxForTicks].map(
    (n) => Math.round(n)
  );

  return (
    <div className="relative h-72 w-72 overflow-visible sm:h-[22rem] sm:w-[22rem]">
      {isActive && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full animate-speed-gauge-pulse motion-reduce:animate-none"
          style={{
            boxShadow: '0 0 64px 20px rgba(34, 197, 94, 0.18)',
          }}
          aria-hidden
        />
      )}
      <svg
        viewBox="-28 -22 256 244"
        className="relative h-full w-full overflow-visible drop-shadow-2xl"
        aria-hidden
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="40%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="speedZoneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="gaugeHub" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.5" />
          </filter>
        </defs>
        <path
          d={ARC_PATH_D}
          fill="none"
          stroke="url(#trackGradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {isIdle && (
          <path
            d={ARC_PATH_D}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 14"
            className="animate-speed-track-shimmer motion-reduce:animate-none opacity-40"
          />
        )}
        {percentage > 0 && (
          <path
            d={ARC_PATH_D}
            fill="none"
            stroke="url(#speedZoneGradient)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={arcRenderLength}
            strokeDashoffset={strokeDashoffset}
            className={`${isActive ? 'opacity-100' : 'opacity-95'} ${isActive ? '' : 'transition-[stroke-dashoffset] duration-500 ease-out'}`}
            style={isActive ? { filter: 'url(#gaugeGlow)' } : undefined}
          />
        )}

        {arcLayout
          ? arcLayout.minors.map((m, idx) => (
              <line
                key={`m-${idx}`}
                x1={m.i1x}
                y1={m.i1y}
                x2={m.o1x}
                y2={m.o1y}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-gray-700"
              />
            ))
          : minorTicksFallback.map((mark) => {
              const angle = -135 + (mark / scaleMaxForTicks) * 270;
              const inner = polarToCartesian(cx, cy, r - 6, angle);
              const outer = polarToCartesian(cx, cy, r, angle);
              return (
                <line
                  key={mark}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-gray-700"
                />
              );
            })}

        {arcLayout
          ? arcLayout.majors.map((m) => (
              <text
                key={m.label + m.t}
                x={m.lx}
                y={m.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-zinc-400 font-semibold tabular-nums"
                style={{ fontSize: scaleMax >= 400 ? 9.25 : 10 }}
              >
                {m.label}
              </text>
            ))
          : scaleMarksFallback.map((mark) => {
              const angle = -135 + (mark / scaleMaxForTicks) * 270;
              const pos = polarToCartesian(cx, cy, 102, angle);
              if (Math.hypot(pos.x - cx, pos.y - cy) < 76) return null;
              if (Math.abs(pos.x - cx) < 44 && pos.y < cy - 34) return null;
              const label = mark >= 1000 ? '1G' : String(mark);
              return (
                <text
                  key={mark}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-zinc-400 font-semibold tabular-nums"
                  style={{ fontSize: scaleMax >= 400 ? 9.25 : 10 }}
                >
                  {label}
                </text>
              );
            })}

        {/* Opaque disc: hides any arc/tick bleed-through behind the HTML readout */}
        <circle cx="100" cy="100" r="72" fill="#09090b" className="gauge-center-disc" aria-hidden />

        <line
          x1="100"
          y1="100"
          x2="100"
          y2={100 - needleLen}
          stroke="url(#needleGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${needleAngle} 100 100)`}
          style={{
            filter: 'url(#needleShadow)',
            transition: needleTransition,
          }}
        />
        {!isComplete && (
          <>
            <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
            <circle
              cx="100"
              cy="100"
              r="11"
              fill="url(#gaugeHub)"
              stroke="#22c55e"
              strokeWidth="2.5"
              className={`drop-shadow-lg ${isIdle ? 'animate-speed-gauge-idle-glow motion-reduce:animate-none' : ''}`}
            />
          </>
        )}
      </svg>

      {/* Center readout — solid chip behind digit blocks SVG/subpixel bleed (e.g. “50” ghosting as “5”) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center pt-12 sm:pt-14">
        <span
          className={`relative z-10 flex min-h-[3rem] min-w-[3.25ch] items-center justify-center rounded-xl bg-zinc-950 px-2 text-5xl font-black tabular-nums tracking-tight text-white transition-transform duration-300 sm:text-6xl ${
            isActive ? 'motion-safe:scale-[1.02]' : ''
          }`}
          style={{
            textShadow: '0 1px 2px rgb(0 0 0 / 0.5)',
          }}
        >
          {showValue > 0
            ? showValue < 100
              ? showValue.toFixed(1)
              : Math.round(showValue)
            : phase === 'idle'
              ? '0'
              : '—'}
        </span>
        <span
          className="relative z-10 mt-1 block text-center text-sm font-semibold text-emerald-400"
          style={{ textShadow: '0 1px 14px rgb(0 0 0 / 0.95)' }}
        >
          {showMbpsSubtitle ? 'Megabits per second' : 'Mbps'}
        </span>
        <div className="relative z-10 mt-2 flex max-w-[220px] items-center justify-center gap-2">
          {PhaseIcon && !isComplete ? (
            <PhaseIcon
              className={`h-4 w-4 shrink-0 text-emerald-400 ${phase === 'ping' ? 'motion-safe:animate-pulse' : ''}`}
              style={{ filter: 'drop-shadow(0 1px 6px rgb(0 0 0 / 0.85))' }}
              aria-hidden
            />
          ) : null}
          <span
            className="text-center text-xs font-medium leading-tight text-zinc-300"
            style={{ textShadow: '0 1px 10px rgb(0 0 0 / 0.95)' }}
          >
            {phaseLabel}
          </span>
        </div>
        <p
          className="relative z-10 mt-2 text-center text-[10px] font-medium text-zinc-500"
          style={{ textShadow: '0 1px 8px rgb(0 0 0 / 0.9)' }}
        >
          Scale 0–{scaleMax >= 1000 ? '1G' : scaleMax} Mbps
        </p>
      </div>
    </div>
  );
}
