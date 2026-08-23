'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const STEPS = [
  { deg: 0,  lbs: 12,  kg: 5.4,  context: 'Looking straight ahead',  compare: 'a large laptop',         color: '#16a34a' },
  { deg: 15, lbs: 27,  kg: 12.2, context: 'Glancing at a desk',       compare: 'a small dog',            color: '#ca8a04' },
  { deg: 30, lbs: 40,  kg: 18.1, context: 'Phone held on your lap',   compare: 'a full hiking backpack', color: '#ea580c' },
  { deg: 45, lbs: 49,  kg: 22.2, context: 'Scrolling on the sofa',    compare: 'a 3-year-old child',     color: '#dc2626' },
  { deg: 60, lbs: 60,  kg: 27.2, context: 'Head fully dropped',       compare: 'a large cabin suitcase', color: '#991b1b' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function toRad(d: number) { return (d * Math.PI) / 180; }

function lerpColor(c1: string, c2: string, t: number) {
  const p = (s: string, i: number) => parseInt(s.slice(i, i + 2), 16);
  const r = Math.round(lerp(p(c1, 1), p(c2, 1), t));
  const g = Math.round(lerp(p(c1, 3), p(c2, 3), t));
  const b = Math.round(lerp(p(c1, 5), p(c2, 5), t));
  return `rgb(${r},${g},${b})`;
}

function degToColor(deg: number) {
  const t = Math.min(1, deg / 60);
  const palette = STEPS.map(s => s.color);
  const seg = Math.min(Math.floor(t * (palette.length - 1)), palette.length - 2);
  return lerpColor(palette[seg], palette[seg + 1], t * (palette.length - 1) - seg);
}

function degToLbs(deg: number) {
  for (let i = 0; i < STEPS.length - 1; i++) {
    const s = STEPS[i], n = STEPS[i + 1];
    if (deg <= n.deg) return lerp(s.lbs, n.lbs, (deg - s.deg) / (n.deg - s.deg));
  }
  return 60;
}

// ─── SVG geometry ────────────────────────────────────────────────────────────

const W = 300, H = 350;
const PX = 130, PY = 165;     // pivot: base-of-skull / C1 junction
const NY = 215;                // neck base y
const HOFF = 58;               // pivot → head-centre distance
const HR = 40;                 // head radius

function headXY(deg: number) {
  const r = toRad(deg);
  return { x: PX + Math.sin(r) * HOFF, y: PY - Math.cos(r) * HOFF };
}

function arcD(deg: number) {
  if (deg < 0.5) return '';
  const R = 70, ex = PX + Math.sin(toRad(deg)) * R, ey = PY - Math.cos(toRad(deg)) * R;
  return `M ${PX} ${PY - R} A ${R} ${R} 0 0 1 ${ex} ${ey}`;
}

// ─── Mini figure (comparison strip) ─────────────────────────────────────────

function MiniFigure({ deg, lbs, color, active, onClick }: {
  deg: number; lbs: number; color: string; active: boolean; onClick: () => void;
}) {
  const px = 32, py = 48, hoff = 16;
  const hx = px + Math.sin(toRad(deg)) * hoff;
  const hy = py - Math.cos(toRad(deg)) * hoff;
  const arcR = 22;
  const ex = px + Math.sin(toRad(deg)) * arcR, ey = py - Math.cos(toRad(deg)) * arcR;

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 focus:outline-none group">
      <div
        className="rounded-xl transition-all duration-200"
        style={{
          padding: 6,
          border: `2px solid ${active ? color : 'transparent'}`,
          background: active ? `${color}15` : 'transparent',
          transform: active ? 'scale(1.08)' : 'scale(1)',
          opacity: active ? 1 : 0.55,
        }}
      >
        <svg viewBox="0 0 64 96" width={56} height={80}>
          {/* plumb line */}
          <line x1={px} y1={10} x2={px} y2={py} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="3 2" />
          {/* torso */}
          <path d={`M 8 ${py+14} Q ${px} ${py+6} ${px*2-8} ${py+14} L ${px*2-6} ${py+38} Q ${px} ${py+46} 6 ${py+38} Z`}
            fill={active ? color : '#d1d5db'} opacity={0.75} />
          {/* cervical spine */}
          <line x1={px} y1={py} x2={px} y2={py+14} stroke={active ? color : '#94a3b8'} strokeWidth={4} strokeLinecap="round" />
          {/* neck flesh */}
          <rect x={px-7} y={py} width={14} height={14} rx={5} fill="#f3c89b" />
          {/* head */}
          <circle cx={hx} cy={hy} r={13} fill={active ? color : '#f3c89b'}
            stroke={active ? color : '#e8a87c'} strokeWidth={1.5} />
          {/* face direction dot */}
          <circle cx={hx - 5 * Math.cos(toRad(deg - 90))} cy={hy - 5 * Math.sin(toRad(deg - 90))}
            r={2} fill={active ? '#fff' : '#94a3b8'} />
          {/* arc */}
          {deg > 0.5 && (
            <path d={`M ${px} ${py - arcR} A ${arcR} ${arcR} 0 0 1 ${ex} ${ey}`}
              fill="none" stroke={active ? color : '#94a3b8'} strokeWidth={1.5} strokeLinecap="round" />
          )}
        </svg>
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color: active ? color : '#9ca3af' }}>
        {deg}°
      </span>
      <span className="text-xs tabular-nums" style={{ color: active ? color : '#c0c8d4' }}>
        {lbs} lbs
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NeckTiltAnimation() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Smooth angle via rAF (no CSS transition, fully interpolated in JS)
  const vizAngle = useRef(0);
  const [renderAngle, setRenderAngle] = useState(0);
  const targetAngle = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const tick = () => {
      const diff = targetAngle.current - vizAngle.current;
      if (Math.abs(diff) > 0.08) {
        vizAngle.current += diff * 0.075;
        setRenderAngle(vizAngle.current);
      } else if (diff !== 0) {
        vizAngle.current = targetAngle.current;
        setRenderAngle(targetAngle.current);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  useEffect(() => {
    targetAngle.current = STEPS[targetIdx].deg;
  }, [targetIdx]);

  // Auto-play
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setTargetIdx(i => (i + 1) % STEPS.length), 2800);
    return () => clearInterval(t);
  }, [playing]);

  // Derived display values
  const ang = renderAngle;
  const color = degToColor(ang);
  const lbs = degToLbs(ang);
  const lbsRound = Math.round(lbs);
  const kgVal = (lbs * 0.4536).toFixed(1);
  const hc = headXY(ang);
  const loadPct = Math.max(3, ((lbs - 12) / 48) * 100);
  const step = STEPS[targetIdx];

  // Force arrow length (grows with load)
  const arrowLen = 12 + (lbs / 60) * 50;

  return (
    <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden bg-white">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-blue-50/40">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5" aria-hidden>📱</span>
          <div>
            <h3 className="text-base font-bold text-gray-900">The Hidden Cost of Looking Down</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              How head-tilt angle multiplies the force on your cervical spine (source: Hansraj 2014)
            </p>
          </div>
        </div>
      </div>

      {/* ── Figure + Panel ── */}
      <div className="flex flex-col sm:flex-row">

        {/* Large SVG */}
        <div
          className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6 transition-colors duration-500"
          style={{ background: `${color}0d` }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            style={{ maxWidth: '100%' }}
            aria-label={`Head tilted ${lbsRound}° — ${lbsRound} lbs on cervical spine`}
          >
            {/* Subtle grid */}
            <defs>
              <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="#f1f5f9" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#g)" />

            {/* Plumb / neutral reference */}
            <line x1={PX} y1={30} x2={PX} y2={PY} stroke="#cbd5e1" strokeWidth={2} strokeDasharray="7 5" />
            <text x={PX + 6} y={46} fontSize={9.5} fill="#94a3b8" fontStyle="italic">neutral</text>

            {/* Ground */}
            <ellipse cx={110} cy={322} rx={78} ry={14} fill="#e2e8f0" opacity={0.45} />
            <line x1={32} y1={322} x2={188} y2={322} stroke="#e2e8f0" strokeWidth={1} />

            {/* Legs hint */}
            <rect x={76} y={290} width={28} height={32} rx={8} fill="#d1d5db" opacity={0.6} />
            <rect x={112} y={290} width={28} height={32} rx={8} fill="#d1d5db" opacity={0.6} />

            {/* Torso */}
            <path
              d={`M 44 ${NY+10} Q ${PX} ${NY-2} ${PX*2-44} ${NY+10}
                  L ${PX*2-40} ${NY+78} Q ${PX} ${NY+90} 40 ${NY+78} Z`}
              fill="#d1d5db"
            />

            {/* Arms */}
            <path d={`M 44 ${NY+18} Q 18 ${NY+38} 22 ${NY+70}`}
              fill="none" stroke="#bec9d4" strokeWidth={16} strokeLinecap="round" />
            <path d={`M ${PX*2-44} ${NY+18} Q ${PX*2-14} ${NY+38} ${PX*2-18} ${NY+72}`}
              fill="none" stroke="#b4c0cc" strokeWidth={16} strokeLinecap="round" />

            {/* Phone in right hand */}
            {ang > 2 && (
              <g opacity={Math.min(1, ang / 15)}>
                <rect x={PX*2-34} y={NY+52} width={24} height={40} rx={4} fill="#1e293b" />
                <rect x={PX*2-31} y={NY+55} width={18} height={34} rx={2} fill="#7dd3fc" />
                <rect x={PX*2-30} y={NY+57} width={16} height={12} rx={2} fill="#bae6fd" />
                <circle cx={PX*2-22} cy={NY+84} r={3} fill="#374151" />
              </g>
            )}

            {/* Thoracic spine (less stressed) */}
            <line x1={PX} y1={NY} x2={PX} y2={NY+70} stroke="#cbd5e1" strokeWidth={7} strokeLinecap="round" />
            {/* Cervical spine (stress-coloured) */}
            <line x1={PX} y1={PY} x2={PX} y2={NY} stroke={color} strokeWidth={7} strokeLinecap="round" />

            {/* Neck (flesh) */}
            <rect x={PX-17} y={PY} width={34} height={NY-PY} rx={12} fill="#f3c89b" stroke="#e8a87c" strokeWidth={1.5} />

            {/* Angle arc */}
            {ang > 0.5 && (
              <>
                <path d={arcD(ang)} fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" />
                {(() => {
                  const half = toRad(ang / 2), R = 84;
                  const mx = PX + Math.sin(half) * R, my = PY - Math.cos(half) * R;
                  return (
                    <text x={mx + 7} y={my + 5} fontSize={12} fontWeight="800" fill={color}
                      textAnchor="start">
                      {Math.round(ang)}°
                    </text>
                  );
                })()}
              </>
            )}

            {/* 0° label */}
            {ang < 3 && (
              <text x={PX + 10} y={PY - 74} fontSize={12} fontWeight="800" fill={color}>0°</text>
            )}

            {/* Downward force arrow */}
            {ang > 4 && (() => {
              const ax = PX + 36;
              return (
                <g opacity={0.75}>
                  <line x1={ax} y1={PY - 10} x2={ax} y2={PY - 10 + arrowLen}
                    stroke={color} strokeWidth={3.5} strokeLinecap="round" />
                  <polygon
                    points={`${ax},${PY-10+arrowLen+9} ${ax-7},${PY-10+arrowLen} ${ax+7},${PY-10+arrowLen}`}
                    fill={color}
                  />
                  <text x={ax + 10} y={PY - 10 + arrowLen * 0.5 + 4} fontSize={8.5}
                    fill={color} fontWeight="700">gravity</text>
                </g>
              );
            })()}

            {/* ── Head ── */}
            {/* Drop shadow */}
            <ellipse cx={hc.x + 6} cy={hc.y + HR - 6} rx={HR * 0.55} ry={9}
              fill="#000" opacity={0.06 + (ang / 60) * 0.06} />
            {/* Head circle */}
            <circle cx={hc.x} cy={hc.y} r={HR} fill="#f3c89b" stroke="#e8a87c" strokeWidth={2} />
            {/* Hair */}
            <path
              d={`M ${hc.x-HR*0.75} ${hc.y-HR*0.45}
                  Q ${hc.x-HR*0.9} ${hc.y-HR*1.12}
                  ${hc.x} ${hc.y-HR*1.18}
                  Q ${hc.x+HR*0.5} ${hc.y-HR*1.1}
                  ${hc.x+HR*0.65} ${hc.y-HR*0.55}`}
              fill="#78350f"
            />
            {/* Face — SVG rotate so it tracks the head perfectly */}
            <g transform={`rotate(${ang} ${hc.x} ${hc.y})`}>
              <circle cx={hc.x - 15} cy={hc.y - 9} r={4.5} fill="#1e293b" />
              <circle cx={hc.x - 14} cy={hc.y - 10} r={1.8} fill="#fff" />
              <path d={`M ${hc.x-19} ${hc.y+4} Q ${hc.x-26} ${hc.y+11} ${hc.x-20} ${hc.y+18}`}
                fill="none" stroke="#c4956a" strokeWidth={2} strokeLinecap="round" />
              <path d={`M ${hc.x-13} ${hc.y+23} Q ${hc.x-20} ${hc.y+27} ${hc.x-26} ${hc.y+22}`}
                fill="none" stroke="#c4956a" strokeWidth={2} strokeLinecap="round" />
            </g>

            {/* Weight callout */}
            <circle cx={256} cy={88} r={40} fill={color} opacity={0.13} />
            <circle cx={256} cy={88} r={40} fill="none" stroke={color} strokeWidth={2} opacity={0.4} />
            <text x={256} y={80} textAnchor="middle" fontSize={22} fontWeight="900" fill={color}>
              {lbsRound}
            </text>
            <text x={256} y={98} textAnchor="middle" fontSize={10} fontWeight="700" fill={color}>
              LBS
            </text>
            <text x={256} y={115} textAnchor="middle" fontSize={9} fill={color} opacity={0.75}>
              {kgVal} kg
            </text>
          </svg>
        </div>

        {/* ── Info panel ── */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-5 justify-center">
          {/* Big weight */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Cervical spine load
            </p>
            <div className="flex items-baseline gap-2.5">
              <span className="text-7xl font-black leading-none tabular-nums" style={{ color }}>
                {lbsRound}
              </span>
              <div className="flex flex-col pb-1">
                <span className="text-2xl font-bold text-gray-300">lbs</span>
                <span className="text-sm text-gray-400">{kgVal} kg</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-snug">
              <span className="font-bold">{Math.round(ang)}°</span> — {step.context}
            </p>
          </div>

          {/* Load bar */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-gray-400">Load vs. neutral baseline</span>
              <span className="text-xs font-bold" style={{ color }}>
                {Math.round(loadPct)}% above
              </span>
            </div>
            <div className="h-3.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${loadPct}%`, backgroundColor: color, transition: 'none' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-300 mt-1 font-mono">
              <span>12 lbs (0°)</span>
              <span>60 lbs (60°)</span>
            </div>
          </div>

          {/* Comparator */}
          <div
            className="rounded-xl px-4 py-3 border-2"
            style={{ borderColor: `${color}50`, backgroundColor: `${color}10` }}
          >
            <p className="text-xs font-semibold mb-0.5" style={{ color }}>
              That's like carrying…
            </p>
            <p className="text-base font-bold text-gray-800">{step.compare}</p>
          </div>

          {/* Play button */}
          <button
            onClick={() => setPlaying(p => !p)}
            className="self-start flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl border-2 transition-all"
            style={
              playing
                ? { background: '#0f172a', color: '#fff', borderColor: '#0f172a' }
                : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
            }
          >
            {playing ? '⏸' : '▶'}&nbsp;{playing ? 'Pause animation' : 'Auto-play'}
          </button>
        </div>
      </div>

      {/* ── Comparison strip ── */}
      <div className="px-4 py-5 border-t border-gray-100 bg-gray-50/60">
        <p className="text-xs text-gray-400 mb-3 font-medium">Compare all angles</p>
        <div className="flex justify-around items-end">
          {STEPS.map((s, i) => (
            <MiniFigure
              key={s.deg}
              deg={s.deg}
              lbs={s.lbs}
              color={s.color}
              active={targetIdx === i}
              onClick={() => { setTargetIdx(i); setPlaying(false); }}
            />
          ))}
        </div>
      </div>

      {/* ── Citation ── */}
      <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400">
          Data: Hansraj KK (2014). &quot;Assessment of stresses in the cervical spine caused by posture
          and position of the head.&quot; <em>Surgical Technology International</em>, 25, 277–279.
        </p>
      </div>
    </div>
  );
}
