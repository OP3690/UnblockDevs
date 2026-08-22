'use client';

import { useState, useEffect, useRef } from 'react';

const DATA = [
  { deg: 0,  lbs: 12,  kg: 5.4,  context: 'Looking straight ahead',    compare: 'a large laptop',         color: '#16a34a', colorLight: '#bbf7d0', colorBg: '#f0fdf4' },
  { deg: 15, lbs: 27,  kg: 12.2, context: 'Reading at your desk',      compare: 'a small dog (12 kg)',     color: '#ca8a04', colorLight: '#fef08a', colorBg: '#fefce8' },
  { deg: 30, lbs: 40,  kg: 18.1, context: 'Phone held on your lap',    compare: 'a full hiking backpack',  color: '#ea580c', colorLight: '#fed7aa', colorBg: '#fff7ed' },
  { deg: 45, lbs: 49,  kg: 22.2, context: 'Scrolling on the sofa',     compare: 'a 3-year-old child',      color: '#dc2626', colorLight: '#fecaca', colorBg: '#fef2f2' },
  { deg: 60, lbs: 60,  kg: 27.2, context: 'Head fully dropped',        compare: 'a large cabin suitcase',  color: '#991b1b', colorLight: '#fca5a5', colorBg: '#fff1f2' },
];

// SVG geometry (viewBox 0 0 200 250)
const PX = 78;    // pivot x (base of skull / C1-C2 junction)
const PY = 140;   // pivot y
const NECK_BASE_Y = 180;
const HEAD_OFFSET = 46; // pivot → head-center distance
const HEAD_R = 28;

function toRad(d: number) { return (d * Math.PI) / 180; }

function headXY(deg: number) {
  const r = toRad(deg);
  return { x: PX + Math.sin(r) * HEAD_OFFSET, y: PY - Math.cos(r) * HEAD_OFFSET };
}

function arcPath(deg: number) {
  const R = 54;
  const ex = PX + Math.sin(toRad(deg)) * R;
  const ey = PY - Math.cos(toRad(deg)) * R;
  return `M ${PX} ${PY - R} A ${R} ${R} 0 0 1 ${ex} ${ey}`;
}

function midAngle(deg: number, R: number) {
  const half = deg / 2;
  return { x: PX + Math.sin(toRad(half)) * R, y: PY - Math.cos(toRad(half)) * R };
}

export default function NeckTiltAnimation() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => setIdx(i => (i + 1) % DATA.length), 2400);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  const d = DATA[idx];
  const hc = headXY(d.deg);
  const loadPct = ((d.lbs - 12) / 48) * 100;
  const arcMid = d.deg > 8 ? midAngle(d.deg, 40) : null;

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-blue-50/60">
        <div className="flex items-start gap-2.5">
          <span className="text-2xl mt-0.5" aria-hidden>📱</span>
          <div>
            <h3 className="text-base font-bold text-gray-900">The Hidden Cost of Looking Down</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              How head-tilt angle multiplies the load on your cervical spine — known as "tech neck"
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row">
        {/* SVG figure */}
        <div
          className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6"
          style={{ background: d.colorBg, transition: 'background 0.5s' }}
        >
          <svg
            viewBox="0 0 200 250"
            width={200}
            height={250}
            aria-label={`Side-view figure with head tilted ${d.deg}° forward. Cervical spine load: ${d.lbs} lbs.`}
          >
            {/* Plumb line (neutral reference) */}
            <line x1={PX} y1={30} x2={PX} y2={PY} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="5 4" />
            <text x={PX + 4} y={38} fontSize={7.5} fill="#94a3b8" fontStyle="italic">neutral</text>

            {/* Torso */}
            <path d="M 28 182 Q 78 168 128 182 L 132 218 Q 78 228 24 218 Z" fill="#d1d5db" />
            <ellipse cx={78} cy={222} rx={56} ry={20} fill="#cbd5e1" />

            {/* Neck */}
            <rect x={PX - 14} y={PY} width={28} height={NECK_BASE_Y - PY} rx={8} fill="#b8c4d0" />

            {/* Angle arc */}
            {d.deg > 0 && (
              <>
                <path d={arcPath(d.deg)} fill="none" stroke={d.color} strokeWidth={2.5} strokeLinecap="round" />
                {arcMid && (
                  <text x={arcMid.x + 8} y={arcMid.y + 4} fontSize={9} fontWeight="700" fill={d.color} textAnchor="middle">
                    {d.deg}°
                  </text>
                )}
              </>
            )}

            {/* 0° label when neutral */}
            {d.deg === 0 && (
              <text x={PX + 6} y={PY - 56} fontSize={9} fontWeight="700" fill={d.color} textAnchor="start">
                0°
              </text>
            )}

            {/* Force arrow (downward, at pivot, grows with load) */}
            {d.deg > 0 && (() => {
              const arrowLen = 8 + (d.lbs / 60) * 28;
              return (
                <g opacity={0.65} style={{ transition: 'opacity 0.4s' }}>
                  <line
                    x1={PX + 20} y1={PY - 4}
                    x2={PX + 20} y2={PY - 4 + arrowLen}
                    stroke={d.color} strokeWidth={2} strokeLinecap="round"
                  />
                  <polygon
                    points={`${PX + 20},${PY - 4 + arrowLen + 5} ${PX + 16},${PY - 4 + arrowLen} ${PX + 24},${PY - 4 + arrowLen}`}
                    fill={d.color}
                  />
                </g>
              );
            })()}

            {/* Head group — CSS transform for smooth animation */}
            <g
              style={{
                transform: `translate(${hc.x}px, ${hc.y}px)`,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Head circle */}
              <circle cx={0} cy={0} r={HEAD_R} fill="#f3c89b" stroke="#e8a87c" strokeWidth={1.5} />
              {/* Hair */}
              <path
                d={`M ${-HEAD_R + 4} -10 Q ${-HEAD_R - 2} ${-HEAD_R + 4} 2 ${-HEAD_R - 3} Q ${HEAD_R * 0.6} ${-HEAD_R - 1} ${HEAD_R - 6} -8`}
                fill="#78350f" stroke="none"
              />
              {/* Face — rotates with head angle */}
              <g style={{ transform: `rotate(${d.deg}deg)`, transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', transformOrigin: '0 0' }}>
                <circle cx={-12} cy={-6} r={3} fill="#1e293b" />
                <circle cx={-12} cy={-6} r={1.2} fill="#fff" />
                <path d="M -14 3 Q -20 7 -15 12" fill="none" stroke="#c4956a" strokeWidth={1.5} strokeLinecap="round" />
                <path d="M -11 16 Q -16 18 -20 16" fill="none" stroke="#c4956a" strokeWidth={1.5} strokeLinecap="round" />
              </g>
            </g>

            {/* Phone in hand */}
            {d.deg > 0 && (
              <g style={{ opacity: Math.min(1, d.deg / 15), transition: 'opacity 0.5s' }}>
                <rect x={125} y={196} width={16} height={26} rx={3} fill="#1e293b" />
                <rect x={127} y={198} width={12} height={22} rx={2} fill="#7dd3fc" />
                <rect x={128} y={200} width={10} height={8} rx={1} fill="#bae6fd" />
                <circle cx={133} cy={217} r={2} fill="#374151" />
              </g>
            )}

            {/* Weight badge */}
            <circle cx={168} cy={68} r={24} fill={d.color} opacity={0.13} style={{ transition: 'fill 0.4s' }} />
            <circle cx={168} cy={68} r={24} fill="none" stroke={d.color} strokeWidth={1.5} opacity={0.45} style={{ transition: 'stroke 0.4s' }} />
            <text x={168} y={63} textAnchor="middle" fontSize={14} fontWeight="800" fill={d.color} style={{ transition: 'fill 0.4s' }}>
              {d.lbs}
            </text>
            <text x={168} y={76} textAnchor="middle" fontSize={7.5} fontWeight="600" fill={d.color} style={{ transition: 'fill 0.4s' }}>
              LBS
            </text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4 justify-center">
          {/* Weight display */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Cervical spine load</p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-6xl font-black leading-none tabular-nums"
                style={{ color: d.color, transition: 'color 0.4s' }}
              >
                {d.lbs}
              </span>
              <div className="flex flex-col pb-1">
                <span className="text-xl font-bold text-gray-300">lbs</span>
                <span className="text-sm text-gray-400">{d.kg} kg</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1.5 font-medium">{d.deg}° — {d.context}</p>
          </div>

          {/* Load bar */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Load relative to neutral (12 lbs)</p>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(8, loadPct)}%`,
                  backgroundColor: d.color,
                  transition: 'width 0.6s ease, background-color 0.4s',
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-300 mt-1 font-mono">
              <span>12 lbs</span>
              <span>60 lbs</span>
            </div>
          </div>

          {/* Comparator */}
          <div
            className="rounded-xl px-3.5 py-2.5 border"
            style={{ backgroundColor: d.colorBg, borderColor: d.colorLight, transition: 'background-color 0.4s, border-color 0.4s' }}
          >
            <p className="text-xs font-medium" style={{ color: d.color }}>That's equivalent to carrying...</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{d.compare}</p>
          </div>

          {/* Angle selector */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Select angle</p>
            <div className="flex flex-wrap gap-1.5">
              {DATA.map((item, i) => (
                <button
                  key={item.deg}
                  onClick={() => { setIdx(i); setPlaying(false); }}
                  className="text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all"
                  style={
                    i === idx
                      ? { backgroundColor: item.color, color: '#fff', borderColor: item.color }
                      : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
                  }
                >
                  {item.deg}°
                </button>
              ))}
              <button
                onClick={() => setPlaying(p => !p)}
                className="text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all"
                style={
                  playing
                    ? { backgroundColor: '#0f172a', color: '#fff', borderColor: '#0f172a' }
                    : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
                }
              >
                {playing ? '⏸ Pause' : '▶ Auto'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Source citation */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Data source: Hansraj KK (2014). &quot;Assessment of stresses in the cervical spine caused by posture and position of the head.&quot;{' '}
          <em>Surgical Technology International</em>, 25, 277–279.
        </p>
      </div>
    </div>
  );
}
