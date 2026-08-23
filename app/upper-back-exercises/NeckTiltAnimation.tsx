'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Data (Hansraj 2014) ─────────────────────────────────────────────────────

const STEPS = [
  { deg: 0,  lbs: 12,  kg: 5.4,  context: 'Looking straight ahead',   compare: 'a large laptop',         color: '#22c55e' },
  { deg: 15, lbs: 27,  kg: 12.2, context: 'Reading at a desk',         compare: 'a small dog',            color: '#eab308' },
  { deg: 30, lbs: 40,  kg: 18.1, context: 'Phone held on your lap',    compare: 'a full hiking backpack', color: '#f97316' },
  { deg: 45, lbs: 49,  kg: 22.2, context: 'Scrolling on the sofa',     compare: 'a 3-year-old child',     color: '#ef4444' },
  { deg: 60, lbs: 60,  kg: 27.2, context: 'Head fully dropped',        compare: 'a large cabin suitcase', color: '#dc2626' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function toRad(d: number) { return (d * Math.PI) / 180; }

function lerpColor(c1: string, c2: string, t: number) {
  const p = (s: string, i: number) => parseInt(s.slice(i, i + 2), 16);
  return `rgb(${Math.round(lerp(p(c1,1),p(c2,1),t))},${Math.round(lerp(p(c1,3),p(c2,3),t))},${Math.round(lerp(p(c1,5),p(c2,5),t))})`;
}

function degToColor(deg: number) {
  const t = Math.min(1, deg / 60);
  const cols = STEPS.map(s => s.color);
  const seg = Math.min(Math.floor(t * (cols.length - 1)), cols.length - 2);
  return lerpColor(cols[seg], cols[seg + 1], t * (cols.length - 1) - seg);
}

function degToLbs(deg: number) {
  for (let i = 0; i < STEPS.length - 1; i++) {
    const { deg: d1, lbs: l1 } = STEPS[i], { deg: d2, lbs: l2 } = STEPS[i + 1];
    if (deg <= d2) return lerp(l1, l2, (deg - d1) / (d2 - d1));
  }
  return 60;
}

// ─── SVG layout constants ─────────────────────────────────────────────────────
// The figure faces LEFT.
// Pivot = C7/T1 junction — all head+neck rotation happens around this point.
// Positive SVG rotate = clockwise. For forward tilt (head goes left+down), we use negative angles.

const W = 400, H = 480;
const PX = 200, PY = 300;   // pivot (C7/T1)
// Head centre at 0° tilt (absolute SVG coords):
const HX0 = 175, HY0 = 155;  // relative to pivot: (-25, -145)
const HRX = 36, HRY = 43;    // head ellipse radii

// Arc for angle indicator — starts directly above pivot, sweeps CCW (left) for forward tilt
function arcPath(deg: number) {
  const R = 76;
  const ex = PX - Math.sin(toRad(deg)) * R;
  const ey = PY - Math.cos(toRad(deg)) * R;
  return `M ${PX} ${PY - R} A ${R} ${R} 0 0 0 ${ex} ${ey}`;
}
function arcLabel(deg: number) {
  const R = 94, half = toRad(deg / 2);
  return { x: PX - Math.sin(half) * R, y: PY - Math.cos(half) * R };
}

// ─── Mini comparison figure ───────────────────────────────────────────────────

function MiniFigure({ step, active, onClick }: { step: typeof STEPS[0]; active: boolean; onClick: () => void }) {
  const s = 0.30;  // scale factor
  const pvx = 32, pvy = 60;
  const hx = pvx + (HX0 - PX) * s;
  const hy = pvy + (HY0 - PY) * s;
  const arcR = 22;
  const arcEx = pvx - Math.sin(toRad(step.deg)) * arcR;
  const arcEy = pvy - Math.cos(toRad(step.deg)) * arcR;

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 focus:outline-none">
      <div className="rounded-xl transition-all duration-200" style={{
        padding: 6, border: `2px solid ${active ? step.color : 'transparent'}`,
        background: active ? `${step.color}20` : '#1e293b',
        transform: active ? 'scale(1.1)' : 'scale(1)', opacity: active ? 1 : 0.45,
      }}>
        <svg viewBox="0 0 64 100" width={54} height={84}>
          {/* Plumb line */}
          <line x1={pvx} y1={10} x2={pvx} y2={pvy} stroke="#1e3a5f" strokeWidth={1} strokeDasharray="3 2" />
          {/* Body blob */}
          <path d={`M ${pvx} ${pvy} C ${pvx+8} ${pvy+5} ${pvx+24} ${pvy+4} ${pvx+30} ${pvy+12}
                    L ${pvx+28} ${pvy+38} Q ${pvx+14} ${pvy+44} ${pvx+2} ${pvy+38} Z`}
            fill="#334155" />
          {/* Thoracic spine */}
          <line x1={pvx} y1={pvy} x2={pvx+2} y2={pvy+34} stroke="#475569" strokeWidth={4} strokeLinecap="round" />
          {/* Pivot dot */}
          <circle cx={pvx} cy={pvy} r={3} fill={step.color} opacity={0.7} />
          {/* Arc */}
          {step.deg > 0.5 && (
            <path d={`M ${pvx} ${pvy - arcR} A ${arcR} ${arcR} 0 0 0 ${arcEx} ${arcEy}`}
              fill="none" stroke={step.color} strokeWidth={2} strokeLinecap="round" />
          )}
          {/* Head + neck group */}
          <g transform={`rotate(${-step.deg}, ${pvx}, ${pvy})`}>
            {/* Neck */}
            <rect x={pvx - 5} y={pvy - 32} width={10} height={32} rx={4} fill="#92400e" />
            {/* Head */}
            <ellipse cx={hx} cy={hy} rx={HRX * s} ry={HRY * s} fill={active ? step.color : '#f3c89b'} />
            {/* Nose dot for direction */}
            <circle cx={hx - HRX * s * 0.85} cy={hy + 3} r={2} fill={active ? '#fff' : '#c4846a'} />
          </g>
        </svg>
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color: active ? step.color : '#64748b' }}>{step.deg}°</span>
      <span className="text-xs tabular-nums" style={{ color: active ? step.color : '#475569' }}>{step.lbs} lbs</span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NeckTiltAnimation() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  // rAF-driven smooth interpolation
  const vizAngle = useRef(0);
  const [renderAngle, setRenderAngle] = useState(0);
  const targetAngle = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const tick = () => {
      const diff = targetAngle.current - vizAngle.current;
      if (Math.abs(diff) > 0.06) {
        vizAngle.current += diff * 0.072;
        setRenderAngle(vizAngle.current);
      } else if (vizAngle.current !== targetAngle.current) {
        vizAngle.current = targetAngle.current;
        setRenderAngle(targetAngle.current);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  useEffect(() => { targetAngle.current = STEPS[targetIdx].deg; }, [targetIdx]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setTargetIdx(i => (i + 1) % STEPS.length), 2800);
    return () => clearInterval(t);
  }, [playing]);

  const ang = renderAngle;
  const color = degToColor(ang);
  const lbs = degToLbs(ang);
  const lbsRound = Math.round(lbs);
  const kgVal = (lbs * 0.4536).toFixed(1);
  const loadPct = Math.max(3, ((lbs - 12) / 48) * 100);
  const step = STEPS[targetIdx];
  const arcLbl = ang > 4 ? arcLabel(ang) : null;

  // Force arrow: grows below pivot as load increases
  const arrowLen = 14 + ((lbs - 12) / 48) * 55;

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0b1120', border: '1px solid #1e293b' }}>

      {/* ── Header ── */}
      <div className="px-5 py-4 flex items-start gap-3" style={{ borderBottom: '1px solid #1e293b' }}>
        <span className="text-xl mt-0.5">📱</span>
        <div>
          <h3 className="text-base font-bold text-white">The Hidden Cost of Looking Down</h3>
          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
            How head-tilt angle multiplies the force on your cervical spine — &quot;tech neck&quot; explained
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ── SVG Panel ── */}
        <div className="flex-shrink-0 flex items-center justify-center p-4 md:p-6"
          style={{ background: '#0b1120' }}>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: '100%' }}>

            <defs>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="softglow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="bggrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#111827" />
                <stop offset="100%" stopColor="#0b1120" />
              </radialGradient>
            </defs>

            <rect width={W} height={H} fill="url(#bggrad)" />

            {/* ── Neutral plumb line ── */}
            <line x1={PX} y1={30} x2={PX} y2={PY} stroke="#1e3a5f" strokeWidth={2} strokeDasharray="7 5" />
            <text x={PX + 8} y={52} fontSize={9} fill="#2563eb" fontStyle="italic" fontWeight="600">neutral axis</text>

            {/* ── Ground shadow ── */}
            <ellipse cx={170} cy={446} rx={105} ry={16} fill="#0d1828" />

            {/* ── Legs ── */}
            <rect x={142} y={408} width={28} height={40} rx={10} fill="#1e293b" />
            <rect x={178} y={408} width={28} height={40} rx={10} fill="#1e293b" />

            {/* ────────── FIXED BODY ────────── */}

            {/* Upper back / spine column */}
            <path d={`M ${PX} ${PY} C ${PX+8} ${PY+28} ${PX+12} ${PY+60} ${PX+10} ${PY+100}`}
              fill="none" stroke="#283548" strokeWidth={22} strokeLinecap="round" />

            {/* Shoulder slope (trapezius region) */}
            <path d={`M ${PX+4} ${PY-8}
                      C ${PX+28} ${PY-20} ${PX+62} ${PY-30} ${PX+85} ${PY-26}
                      C ${PX+105} ${PY-22} ${PX+114} ${PY-12} ${PX+110} ${PY+2}
                      C ${PX+104} ${PY+14} ${PX+84} ${PY+20} ${PX+68} ${PY+20}`}
              fill="#233040" stroke="#334155" strokeWidth={1.5} />

            {/* Upper arm */}
            <path d={`M ${PX+76} ${PY+12}
                      C ${PX+92} ${PY+34} ${PX+98} ${PY+70} ${PX+92} ${PY+104}`}
              fill="none" stroke="#1e293b" strokeWidth={22} strokeLinecap="round" />

            {/* Forearm (angled, holding phone) */}
            <path d={`M ${PX+92} ${PY+104}
                      C ${PX+84} ${PY+124} ${PX+60} ${PY+134} ${PX+36} ${PY+136}`}
              fill="none" stroke="#1a2535" strokeWidth={20} strokeLinecap="round" />

            {/* Chest front */}
            <path d={`M ${PX-8} ${PY+6}
                      C ${PX-22} ${PY+26} ${PX-24} ${PY+58} ${PX-20} ${PY+88}`}
              fill="none" stroke="#1e2d3d" strokeWidth={12} strokeLinecap="round" />

            {/* Thoracic spine (T1–T12, below pivot, fixed) */}
            <path d={`M ${PX} ${PY} C ${PX+4} ${PY+32} ${PX+7} ${PY+64} ${PX+6} ${PY+95}`}
              stroke="#334155" strokeWidth={7} fill="none" strokeLinecap="round" />
            {[16, 34, 52, 70, 88].map(off => (
              <rect key={off} x={PX-5} y={PY+off} width={16} height={11} rx={3}
                fill="#2a3d52" />
            ))}

            {/* Phone in hand */}
            {ang > 3 && (
              <g opacity={Math.min(1, ang / 20)}>
                <rect x={PX+18} y={PY+120} width={26} height={46} rx={5}
                  fill="#111827" stroke="#334155" strokeWidth={1} />
                <rect x={PX+21} y={PY+123} width={20} height={40} rx={3} fill="#0ea5e9" opacity={0.7} />
                <rect x={PX+22} y={PY+125} width={18} height={12} rx={2} fill="#38bdf8" opacity={0.5} />
                <circle cx={PX+31} cy={PY+158} r={3} fill="#0f2840" />
              </g>
            )}

            {/* ── Angle arc ── */}
            {ang > 0.5 && (
              <>
                <path d={arcPath(ang)} fill="none" stroke={color} strokeWidth={3}
                  strokeLinecap="round" filter="url(#glow)" />
                {arcLbl && (
                  <text x={arcLbl.x - 4} y={arcLbl.y + 5} fontSize={13} fontWeight="900"
                    fill={color} textAnchor="middle" filter="url(#softglow)">{Math.round(ang)}°</text>
                )}
              </>
            )}
            {ang < 2 && (
              <text x={PX + 10} y={PY - 80} fontSize={13} fontWeight="900" fill={color}>0°</text>
            )}

            {/* ── Downward force arrow ── */}
            {ang > 5 && (() => {
              const ax = PX + 32;
              return (
                <g filter="url(#softglow)">
                  <line x1={ax} y1={PY - 10} x2={ax} y2={PY - 10 + arrowLen}
                    stroke={color} strokeWidth={3} strokeLinecap="round" opacity={0.8} />
                  <polygon
                    points={`${ax},${PY-10+arrowLen+8} ${ax-7},${PY-10+arrowLen} ${ax+7},${PY-10+arrowLen}`}
                    fill={color} opacity={0.8}
                  />
                  <text x={ax+11} y={PY-10+arrowLen*0.5+5} fontSize={8} fill={color}
                    fontWeight="700" opacity={0.7}>gravity</text>
                </g>
              );
            })()}

            {/* ── Pivot marker (C7/T1) ── */}
            <circle cx={PX} cy={PY} r={6} fill={color} filter="url(#glow)" />
            <circle cx={PX} cy={PY} r={3} fill="#0b1120" />
            <text x={PX+14} y={PY+5} fontSize={9} fill="#64748b" fontWeight="600">C7 / T1</text>

            {/* ────────── ROTATING GROUP — head + cervical spine ────────── */}
            {/* rotate(-ang) because forward tilt (facing left) is CCW in SVG */}
            <g transform={`rotate(${-ang}, ${PX}, ${PY})`}>

              {/* Cervical spine (C7→C1) — stressed colour */}
              <path d={`M ${PX} ${PY} C ${PX-4} ${PY-38} ${PX-8} ${PY-76} ${PX-10} ${PY-96}`}
                stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" filter="url(#softglow)" />
              {/* Cervical vertebrae blocks */}
              {[22, 44, 66, 88].map((off, i) => (
                <rect key={off}
                  x={PX - 12 - i*1.5} y={PY - off - 7}
                  width={16} height={12} rx={3}
                  fill={color} opacity={0.55}
                />
              ))}

              {/* Neck skin (over the spine) */}
              <path d={`M ${PX-18} ${PY} C ${PX-20} ${PY-38} ${PX-22} ${PY-72} ${PX-24} ${PY-96}`}
                fill="none" stroke="#92400e" strokeWidth={16} strokeLinecap="round" />
              <path d={`M ${PX+14} ${PY} C ${PX+12} ${PY-34} ${PX+10} ${PY-68} ${PX+8} ${PY-90}`}
                fill="none" stroke="#7a3510" strokeWidth={12} strokeLinecap="round" />
              {/* Adam's apple hint */}
              <ellipse cx={PX-10} cy={PY-46} rx={6} ry={4} fill="#a0521e" opacity={0.45} />

              {/* ── HEAD ── */}
              {/* Drop shadow */}
              <ellipse cx={HX0+8} cy={HY0+HRY-4} rx={HRX*0.6} ry={10}
                fill="#000" opacity={0.35} />
              {/* Skull oval */}
              <ellipse cx={HX0} cy={HY0} rx={HRX} ry={HRY}
                fill="#f3c89b" stroke="#e8a87c" strokeWidth={1.5} />
              {/* Skin highlight */}
              <ellipse cx={HX0+8} cy={HY0-16} rx={14} ry={9}
                fill="#fff" opacity={0.08} />

              {/* Hair (top + back of head) */}
              <path d={`
                M ${HX0 - HRX*0.45} ${HY0 - HRY*0.82}
                C ${HX0 - HRX*0.08} ${HY0 - HRY*1.22}
                  ${HX0 + HRX*0.55} ${HY0 - HRY*1.24}
                  ${HX0 + HRX*0.95} ${HY0 - HRY*0.88}
                C ${HX0 + HRX*1.08} ${HY0 - HRY*0.50}
                  ${HX0 + HRX*1.06} ${HY0 + HRY*0.08}
                  ${HX0 + HRX*0.94} ${HY0 + HRY*0.32}
              `} fill="#451a03" />

              {/* Ear */}
              <ellipse cx={HX0 + HRX*0.86} cy={HY0 + 5} rx={7} ry={11}
                fill="#e8a87c" stroke="#d4946a" strokeWidth={1} />
              <path d={`M ${HX0+HRX*0.80} ${HY0+2} Q ${HX0+HRX*0.96} ${HY0+6} ${HX0+HRX*0.80} ${HY0+12}`}
                fill="none" stroke="#c4845a" strokeWidth={1.5} />

              {/* Eyebrow */}
              <path d={`M ${HX0 - HRX*0.58} ${HY0 - 18}
                        Q ${HX0 - HRX*0.36} ${HY0 - 23}
                          ${HX0 - HRX*0.10} ${HY0 - 18}`}
                fill="none" stroke="#451a03" strokeWidth={2.5} strokeLinecap="round" />

              {/* Eye */}
              <ellipse cx={HX0 - HRX*0.34} cy={HY0 - 9} rx={6} ry={5} fill="#1e1b4b" />
              <ellipse cx={HX0 - HRX*0.34 + 2} cy={HY0 - 10} rx={2.5} ry={2} fill="#fff" opacity={0.65} />
              {/* Eyelid crease */}
              <path d={`M ${HX0-HRX*0.55} ${HY0-11} Q ${HX0-HRX*0.34} ${HY0-16} ${HX0-HRX*0.10} ${HY0-11}`}
                fill="none" stroke="#c4846a" strokeWidth={1} />

              {/* Nose */}
              <path d={`M ${HX0 - HRX*0.28} ${HY0 + 2}
                        L ${HX0 - HRX*0.88} ${HY0 + 16}
                        Q ${HX0 - HRX*0.76} ${HY0 + 22}
                          ${HX0 - HRX*0.60} ${HY0 + 17}`}
                fill="none" stroke="#c4846a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

              {/* Mouth */}
              <path d={`M ${HX0 - HRX*0.30} ${HY0 + 28}
                        Q ${HX0 - HRX*0.58} ${HY0 + 34}
                          ${HX0 - HRX*0.82} ${HY0 + 28}`}
                fill="none" stroke="#b06848" strokeWidth={2} strokeLinecap="round" />

              {/* Chin shadow */}
              <path d={`M ${HX0-HRX*0.62} ${HY0+HRY*0.82}
                        Q ${HX0-HRX*0.40} ${HY0+HRY*1.02}
                          ${HX0-HRX*0.12} ${HY0+HRY*0.96}`}
                fill="none" stroke="#d4946a" strokeWidth={1} opacity={0.4} />
            </g>

            {/* ── Weight callout (world coords, not in rotating group) ── */}
            <circle cx={340} cy={96} r={48} fill={color} opacity={0.12} />
            <circle cx={340} cy={96} r={48} fill="none" stroke={color} strokeWidth={2}
              opacity={0.45} filter="url(#softglow)" />
            <text x={340} y={85} textAnchor="middle" fontSize={28} fontWeight="900" fill={color}
              filter="url(#glow)">{lbsRound}</text>
            <text x={340} y={106} textAnchor="middle" fontSize={11} fontWeight="700" fill={color}>LBS</text>
            <text x={340} y={124} textAnchor="middle" fontSize={9} fill={color} opacity={0.65}>
              {kgVal} kg
            </text>
          </svg>
        </div>

        {/* ── Info panel ── */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-5 justify-center" style={{ background: '#0b1120' }}>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#475569' }}>Cervical spine load</p>
            <div className="flex items-baseline gap-2.5">
              <span className="text-7xl font-black leading-none tabular-nums" style={{ color }}>
                {lbsRound}
              </span>
              <div className="flex flex-col pb-1">
                <span className="text-2xl font-bold" style={{ color: '#334155' }}>lbs</span>
                <span className="text-sm" style={{ color: '#475569' }}>{kgVal} kg</span>
              </div>
            </div>
            <p className="text-sm mt-2 leading-snug" style={{ color: '#94a3b8' }}>
              <span className="font-bold text-white">{Math.round(ang)}°</span> — {step.context}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs" style={{ color: '#475569' }}>Load vs. neutral baseline</span>
              <span className="text-xs font-bold" style={{ color }}>{Math.round(loadPct)}% above</span>
            </div>
            <div className="h-3.5 rounded-full overflow-hidden" style={{ background: '#1e293b' }}>
              <div className="h-full rounded-full"
                style={{ width: `${loadPct}%`, backgroundColor: color }} />
            </div>
            <div className="flex justify-between text-xs mt-1 font-mono" style={{ color: '#334155' }}>
              <span>12 lbs (0°)</span><span>60 lbs (60°)</span>
            </div>
          </div>

          <div className="rounded-xl px-4 py-3 border-2"
            style={{ borderColor: `${color}40`, background: `${color}12` }}>
            <p className="text-xs font-semibold mb-1" style={{ color }}>Equivalent to carrying…</p>
            <p className="text-base font-bold text-white">{step.compare}</p>
          </div>

          <button
            onClick={() => setPlaying(p => !p)}
            className="self-start flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl border-2 transition-all"
            style={playing
              ? { background: color, color: '#000', borderColor: color }
              : { background: 'transparent', color: '#94a3b8', borderColor: '#334155' }}
          >
            {playing ? '⏸' : '▶'} {playing ? 'Pause' : 'Auto-play'}
          </button>
        </div>
      </div>

      {/* ── Comparison strip ── */}
      <div className="px-4 py-5" style={{ borderTop: '1px solid #1e293b', background: '#080e1a' }}>
        <p className="text-xs font-medium mb-3" style={{ color: '#475569' }}>Compare all angles</p>
        <div className="flex justify-around items-end">
          {STEPS.map((s, i) => (
            <MiniFigure
              key={s.deg} step={s} active={targetIdx === i}
              onClick={() => { setTargetIdx(i); setPlaying(false); }}
            />
          ))}
        </div>
      </div>

      {/* ── Citation ── */}
      <div className="px-5 py-2.5" style={{ borderTop: '1px solid #0d1626' }}>
        <p className="text-xs" style={{ color: '#1e3a5f' }}>
          Hansraj KK (2014). &quot;Assessment of stresses in the cervical spine caused by posture and position of the head.&quot;{' '}
          <em>Surgical Technology International</em>, 25, 277–279.
        </p>
      </div>
    </div>
  );
}
