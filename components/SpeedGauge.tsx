'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Radio } from 'lucide-react';

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

export function SpeedGauge({
  value,
  phase,
}: {
  value: number;
  phase: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevPhaseRef = useRef(phase);
  const scaleMax = getScaleMax(phase === 'download' || phase === 'upload' ? value : Math.max(value, displayValue));
  const percentage = Math.min((phase === 'download' || phase === 'upload' ? value : displayValue) / scaleMax, 1);
  const arcLength = Math.PI * 85;
  const strokeDashoffset = arcLength - arcLength * percentage;

  useEffect(() => {
    if (phase === 'download' || phase === 'upload' || phase === 'ping') {
      setDisplayValue(value);
    }
  }, [phase, value]);

  useEffect(() => {
    if (prevPhaseRef.current === 'upload' && phase === 'complete' && value > 0) {
      const duration = 700;
      const steps = 28;
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
    if (phase === 'idle') setDisplayValue(0);
    prevPhaseRef.current = phase;
  }, [phase, value]);

  const showValue =
    phase === 'download' || phase === 'upload' ? value : displayValue;
  const isActive = phase === 'download' || phase === 'upload' || phase === 'ping';
  const showMbpsSubtitle = showValue > 0 && (phase === 'download' || phase === 'upload' || phase === 'complete');

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

  const scaleMarks = [0, scaleMax / 4, scaleMax / 2, (3 * scaleMax) / 4, scaleMax].map((n) => Math.round(n));
  const minorTicks = [scaleMax / 8, (3 * scaleMax) / 8, (5 * scaleMax) / 8, (7 * scaleMax) / 8];
  const cx = 100;
  const cy = 100;
  const r = 98;
  const needleAngle = -135 + percentage * 270;

  return (
    <div className="relative w-72 h-72 sm:w-[22rem] sm:h-[22rem]">
      {isActive && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-speed-gauge-pulse"
          style={{
            boxShadow: '0 0 64px 20px rgba(34, 197, 94, 0.18)',
          }}
          aria-hidden
        />
      )}
      <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-2xl" aria-hidden>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="40%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          {/* Progress arc: red (slow) → amber → green (fast) by position */}
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
        {/* Track with subtle gradient */}
        {/* Track */}
        <path
          d="M 30 150 A 85 85 0 1 1 170 150"
          fill="none"
          stroke="url(#trackGradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {percentage > 0 && (
          <path
            d="M 30 150 A 85 85 0 1 1 170 150"
            fill="none"
            stroke="url(#speedZoneGradient)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'opacity-100' : 'opacity-95'}`}
            style={isActive ? { filter: 'url(#gaugeGlow)' } : undefined}
          />
        )}
        {/* Minor ticks */}
        {minorTicks.map((mark) => {
          const angle = -135 + (mark / scaleMax) * 270;
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
        {scaleMarks.map((mark) => {
          const angle = -135 + (mark / scaleMax) * 270;
          const pos = polarToCartesian(cx, cy, r + 2, angle);
          const label = mark >= 1000 ? '1G' : String(mark);
          return (
            <text
              key={mark}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              className="fill-gray-400 font-semibold tabular-nums"
              style={{ fontSize: mark === scaleMax || mark === 0 ? 11 : 10 }}
            >
              {label}
            </text>
          );
        })}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="24"
          stroke="url(#needleGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${needleAngle} 100 100)`}
          className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ filter: 'url(#needleShadow)' }}
        />
        <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
        <circle cx="100" cy="100" r="11" fill="url(#gaugeHub)" stroke="#22c55e" strokeWidth="2.5" className="drop-shadow-lg" />
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-14 pointer-events-none">
        <div className="rounded-2xl bg-gray-900/50 backdrop-blur-md px-6 py-4 border border-gray-600/40 shadow-2xl shadow-black/40 min-w-[140px]">
          <span className="text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight drop-shadow-lg min-h-[3rem] flex items-center justify-center">
            {showValue > 0
              ? showValue < 100
                ? showValue.toFixed(1)
                : Math.round(showValue)
              : phase === 'idle'
                ? '0'
                : '—'}
          </span>
          <span className="text-emerald-400 text-sm font-semibold mt-1.5 block text-center">
            {showMbpsSubtitle ? 'Megabits per second' : 'Mbps'}
          </span>
          <div className="flex items-center justify-center gap-2 mt-3 max-w-[160px]">
            {PhaseIcon && <PhaseIcon className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden />}
            <span className="text-gray-400 text-xs font-medium text-center leading-tight">
              {phaseLabel}
            </span>
          </div>
          <p className="text-gray-600 text-[10px] font-medium mt-2 text-center">
            Scale 0–{scaleMax >= 1000 ? '1G' : scaleMax} Mbps
          </p>
        </div>
      </div>
    </div>
  );
}
