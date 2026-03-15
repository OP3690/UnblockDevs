'use client';

import { useEffect, useRef, useState } from 'react';

const MAX_SPEED = 1000;

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
  const percentage = Math.min(value / MAX_SPEED, 1);
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

  const phaseLabel =
    phase === 'idle'
      ? 'Ready'
      : phase === 'complete'
        ? 'Complete'
        : phase === 'ping'
          ? 'Testing ping…'
          : phase === 'download'
            ? 'Download…'
            : 'Upload…';

  const scaleMarks = [0, 250, 500, 750, 1000];
  const cx = 100;
  const cy = 100;
  const r = 98;

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80">
      {/* Outer glow when testing — subtle pulse */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-speed-gauge-pulse"
          style={{
            boxShadow: '0 0 56px 16px rgba(34, 197, 94, 0.22)',
          }}
          aria-hidden
        />
      )}
      <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-2xl" aria-hidden>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="40%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="gaugeHub" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
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
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.6" />
          </filter>
        </defs>
        {/* Background arc — track */}
        <path
          d="M 30 150 A 85 85 0 1 1 170 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          className="text-gray-800/90"
        />
        {/* Progress arc */}
        <path
          d="M 30 150 A 85 85 0 1 1 170 150"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-500 ease-out ${isActive ? 'opacity-100' : 'opacity-95'}`}
          style={isActive ? { filter: 'url(#gaugeGlow)' } : undefined}
        />
        {/* Scale labels: 0, 250, 500, 750, 1000 */}
        {scaleMarks.map((mark) => {
          const angle = -135 + (mark / MAX_SPEED) * 270;
          const pos = polarToCartesian(cx, cy, r, angle);
          return (
            <text
              key={mark}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              className="fill-gray-500 font-semibold tabular-nums"
              style={{ fontSize: 10 }}
            >
              {mark === 1000 ? '1G' : mark}
            </text>
          );
        })}
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="26"
          stroke="url(#needleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${-135 + percentage * 270} 100 100)`}
          className="transition-all duration-500 ease-out"
          style={{ filter: 'url(#needleShadow)' }}
        />
        <circle cx="100" cy="100" r="10" fill="url(#gaugeHub)" stroke="#22c55e" strokeWidth="2.5" className="drop-shadow-md" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
        <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight drop-shadow-md">
          {showValue > 0 ? Math.round(showValue) : '—'}
        </span>
        <span className="text-emerald-400/90 text-sm font-semibold mt-1">Mbps</span>
        <span className="text-gray-500 text-xs mt-2.5 font-medium max-w-[140px] text-center">
          {phaseLabel}
        </span>
      </div>
    </div>
  );
}
