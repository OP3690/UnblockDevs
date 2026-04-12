'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  Copy, Check, Plus, Trash2, Eye, EyeOff, Code2, RotateCcw,
  Shuffle, Download, Import, Layers, Lightbulb, MousePointer2,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Core types ─────────────────────────────────────────────────────────────

interface Shadow {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  alpha: number;
  inset: boolean;
  enabled: boolean;
}

type ShapeId = 'card' | 'button' | 'circle' | 'pill' | 'avatar' | 'input' | 'badge' | 'image' | 'fab' | 'chip' | 'text' | 'modal';
type ExportFormat = 'css' | 'tailwind' | 'styled' | 'scss' | 'json';
type InputMode = 'xy' | 'angle';

interface ShapeDef {
  id: ShapeId;
  label: string;
  icon: string;
  desc: string;
  style: React.CSSProperties;
  content: React.ReactNode;
  isText?: boolean;
}

let _id = 1;
function makeShadow(p: Partial<Shadow> = {}): Shadow {
  return { id: _id++, x: 0, y: 4, blur: 16, spread: 0, color: '#000000', alpha: 15, inset: false, enabled: true, ...p };
}

// ── Color utils ────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function toRgba(color: string, alpha: number) {
  const [r,g,b] = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${(alpha/100).toFixed(2)})`;
}
function shadowToCss(s: Shadow): string {
  return `${s.inset?'inset ':''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${toRgba(s.color,s.alpha)}`;
}
function shadowsToProperty(shadows: Shadow[]): string {
  const a = shadows.filter(s=>s.enabled);
  return a.length===0?'none':a.map(shadowToCss).join(',\n       ');
}

// ── Parse existing CSS box-shadow ─────────────────────────────────────────

function parseShadowCss(raw: string): Shadow[] | null {
  try {
    // Remove "box-shadow:" prefix if present
    let s = raw.replace(/box-shadow\s*:\s*/i,'').replace(/;.*$/,'').trim();
    // Split by comma but not inside parens
    const parts: string[] = [];
    let depth=0, cur='';
    for (const ch of s) {
      if (ch==='(') depth++;
      if (ch===')') depth--;
      if (ch===',' && depth===0) { parts.push(cur.trim()); cur=''; }
      else cur+=ch;
    }
    if (cur.trim()) parts.push(cur.trim());

    const result: Shadow[] = [];
    for (const part of parts) {
      const inset = /\binset\b/.test(part);
      const clean = part.replace(/\binset\b/,'').trim();
      // extract rgba/rgb/hex color
      const rgbaM = clean.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/);
      const hexM = clean.match(/#([0-9a-fA-F]{3,6})/);
      let color='#000000', alpha=100;
      let rest=clean;
      if (rgbaM) {
        const r=parseInt(rgbaM[1]),g=parseInt(rgbaM[2]),b=parseInt(rgbaM[3]);
        alpha=rgbaM[4]!=null?Math.round(parseFloat(rgbaM[4])*100):100;
        color='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
        rest=clean.replace(rgbaM[0],'').trim();
      } else if (hexM) {
        color='#'+hexM[1].toUpperCase();
        rest=clean.replace(hexM[0],'').trim();
      }
      const nums = rest.match(/-?\d+(?:\.\d+)?(?:px)?/g)?.map(n=>parseFloat(n)) ?? [];
      const [x=0,y=0,blur=0,spread=0] = nums;
      result.push(makeShadow({x,y,blur,spread,color,alpha,inset}));
    }
    return result.length>0?result:null;
  } catch { return null; }
}

// ── Angle/distance → X,Y ─────────────────────────────────────────────────

function angleDistToXY(angleDeg: number, dist: number): {x:number,y:number} {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.round(Math.cos(rad)*dist), y: Math.round(Math.sin(rad)*dist) };
}
function xyToAngleDist(x:number,y:number): {angle:number,dist:number} {
  const dist = Math.round(Math.sqrt(x*x+y*y));
  const rad = Math.atan2(y,x);
  const angle = ((rad*180/Math.PI)+90+360)%360;
  return { angle: Math.round(angle), dist };
}

// ── Export formats ─────────────────────────────────────────────────────────

function buildExport(shadows: Shadow[], hoverShadows: Shadow[], format: ExportFormat, enableHover: boolean): string {
  const prop = shadowsToProperty(shadows);
  const hProp = shadowsToProperty(hoverShadows);

  if (format==='css') {
    let out = `.element {\n  box-shadow: ${prop};\n}`;
    if (enableHover && hoverShadows.length>0)
      out += `\n\n.element:hover {\n  box-shadow: ${hProp};\n  transition: box-shadow 0.25s ease;\n}`;
    return out;
  }
  if (format==='tailwind') {
    const tw = `/** tailwind.config.js */\nmodule.exports = {\n  theme: {\n    extend: {\n      boxShadow: {\n        custom: '${prop.replace(/\n\s+/g,' ')}',${enableHover&&hoverShadows.length>0?`\n        'custom-hover': '${hProp.replace(/\n\s+/g,' ')}',`:''}\n      },\n    },\n  },\n};`;
    return tw;
  }
  if (format==='styled') {
    let out = `import styled from 'styled-components';\n\nconst Element = styled.div\`\n  box-shadow: ${prop};\n`;
    if (enableHover && hoverShadows.length>0)
      out += `  transition: box-shadow 0.25s ease;\n\n  &:hover {\n    box-shadow: ${hProp};\n  }\n`;
    out += '`;\n';
    return out;
  }
  if (format==='scss') {
    let out = `$shadow: ${prop};\n\n.element {\n  box-shadow: $shadow;\n`;
    if (enableHover && hoverShadows.length>0)
      out += `  transition: box-shadow 0.25s ease;\n\n  &:hover {\n    box-shadow: ${hProp};\n  }\n`;
    out += '}';
    return out;
  }
  if (format==='json') {
    return JSON.stringify(shadows.map(s=>({
      x:s.x,y:s.y,blur:s.blur,spread:s.spread,
      color:s.color,alpha:s.alpha,inset:s.inset,enabled:s.enabled
    })),null,2);
  }
  return prop;
}

// ── Shapes ─────────────────────────────────────────────────────────────────

const SHAPES: ShapeDef[] = [
  {
    id:'card',label:'Card',icon:'🃏',desc:'Dashboard card or panel',
    style:{width:260,height:150,borderRadius:16,background:'#ffffff',border:'1px solid #e4e4e7',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8},
    content:(
      <div style={{textAlign:'center',pointerEvents:'none'}}>
        <div style={{width:40,height:40,borderRadius:10,background:'#f4f4f5',margin:'0 auto 8px'}}/>
        <div style={{width:80,height:8,borderRadius:4,background:'#e4e4e7',marginBottom:5}}/>
        <div style={{width:120,height:6,borderRadius:4,background:'#f4f4f5'}}/>
      </div>
    ),
  },
  {
    id:'button',label:'Button',icon:'🔘',desc:'Primary CTA button',
    style:{width:170,height:46,borderRadius:12,background:'#18181b',display:'flex',alignItems:'center',justifyContent:'center'},
    content:<span style={{color:'#fff',fontSize:14,fontWeight:600,fontFamily:'system-ui',pointerEvents:'none'}}>Get started →</span>,
  },
  {
    id:'circle',label:'Circle',icon:'⭕',desc:'Icon container',
    style:{width:112,height:112,borderRadius:'50%',background:'#ffffff',border:'1px solid #e4e4e7',display:'flex',alignItems:'center',justifyContent:'center'},
    content:<span style={{fontSize:36,pointerEvents:'none'}}>🦋</span>,
  },
  {
    id:'pill',label:'Pill',icon:'💊',desc:'Status badge / tag',
    style:{width:130,height:42,borderRadius:999,background:'#ffffff',border:'1px solid #e4e4e7',display:'flex',alignItems:'center',justifyContent:'center'}  ,
    content:(<div style={{display:'flex',alignItems:'center',gap:6,pointerEvents:'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:'#22c55e',display:'block',flexShrink:0}}/><span style={{fontSize:13,fontWeight:600,color:'#18181b',fontFamily:'system-ui'}}>Active</span></div>),
  },
  {
    id:'avatar',label:'Avatar',icon:'👤',desc:'User profile image',
    style:{width:88,height:88,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center'},
    content:<span style={{fontSize:34,pointerEvents:'none'}}>👤</span>,
  },
  {
    id:'input',label:'Input',icon:'📝',desc:'Text field or search bar',
    style:{width:270,height:46,borderRadius:10,background:'#ffffff',border:'1px solid #d4d4d8',display:'flex',alignItems:'center',paddingLeft:14,paddingRight:14},
    content:(<div style={{display:'flex',alignItems:'center',gap:8,width:'100%',pointerEvents:'none'}}><div style={{width:14,height:14,borderRadius:3,background:'#d4d4d8',flexShrink:0}}/><div style={{flex:1,height:7,borderRadius:3,background:'#f4f4f5'}}/></div>),
  },
  {
    id:'badge',label:'Badge',icon:'🏷️',desc:'Notification count',
    style:{width:44,height:26,borderRadius:999,background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center'},
    content:<span style={{color:'#fff',fontSize:11,fontWeight:800,fontFamily:'system-ui',pointerEvents:'none'}}>99+</span>,
  },
  {
    id:'image',label:'Image',icon:'🖼️',desc:'Photo / media card',
    style:{width:200,height:140,borderRadius:12,overflow:'hidden',background:'linear-gradient(135deg,#0ea5e9 0%,#8b5cf6 50%,#ec4899 100%)',display:'flex',alignItems:'flex-end'},
    content:(<div style={{width:'100%',padding:'8px 12px',background:'linear-gradient(transparent,rgba(0,0,0,0.5))',pointerEvents:'none'}}><div style={{width:'60%',height:7,borderRadius:3,background:'rgba(255,255,255,0.8)',marginBottom:4}}/><div style={{width:'40%',height:5,borderRadius:3,background:'rgba(255,255,255,0.5))'}}/></div>),
  },
  {
    id:'fab',label:'FAB',icon:'⚡',desc:'Floating action button',
    style:{width:60,height:60,borderRadius:'50%',background:'#6366f1',display:'flex',alignItems:'center',justifyContent:'center'},
    content:<span style={{color:'#fff',fontSize:24,lineHeight:1,pointerEvents:'none'}}>+</span>,
  },
  {
    id:'chip',label:'Chip',icon:'🍪',desc:'Filter / selection chip',
    style:{width:110,height:34,borderRadius:8,background:'#f4f4f5',border:'1px solid #e4e4e7',display:'flex',alignItems:'center',justifyContent:'center',gap:6},
    content:(<div style={{display:'flex',alignItems:'center',gap:6,pointerEvents:'none'}}><span style={{fontSize:13}}>🎨</span><span style={{fontSize:12,fontWeight:600,color:'#52525b',fontFamily:'system-ui'}}>Design</span></div>),
  },
  {
    id:'text',label:'Text',icon:'🔤',desc:'Text / heading shadow',isText:true,
    style:{display:'flex',alignItems:'center',justifyContent:'center',minWidth:280},
    content:<span style={{fontSize:40,fontWeight:900,fontFamily:'system-ui',color:'#18181b',letterSpacing:'-0.03em',pointerEvents:'none'}}>Shadow</span>,
  },
  {
    id:'modal',label:'Modal',icon:'🪟',desc:'Dialog / modal overlay',
    style:{width:280,height:180,borderRadius:16,background:'#ffffff',border:'1px solid #e4e4e7',display:'flex',flexDirection:'column',overflow:'hidden'},
    content:(<div style={{pointerEvents:'none',display:'flex',flexDirection:'column',height:'100%'}}><div style={{padding:'14px 16px',borderBottom:'1px solid #f4f4f5',display:'flex',alignItems:'center',justifyContent:'space-between'}}><div style={{width:60,height:8,borderRadius:4,background:'#e4e4e7'}}/><div style={{width:16,height:16,borderRadius:'50%',background:'#f4f4f5'}}/></div><div style={{flex:1,padding:'14px 16px',display:'flex',flexDirection:'column',gap:6}}><div style={{height:7,borderRadius:3,background:'#f4f4f5'}}/><div style={{height:7,borderRadius:3,background:'#f4f4f5',width:'80%'}}/><div style={{height:7,borderRadius:3,background:'#f4f4f5',width:'90%'}}/></div><div style={{padding:'10px 16px',borderTop:'1px solid #f4f4f5',display:'flex',gap:8,justifyContent:'flex-end'}}><div style={{width:60,height:28,borderRadius:8,background:'#f4f4f5'}}/><div style={{width:60,height:28,borderRadius:8,background:'#18181b'}}/></div></div>),
  },
];

// ── Presets ────────────────────────────────────────────────────────────────

const PRESETS: {label:string;icon:string;tag:string;shadows:Partial<Shadow>[]}[] = [
  {label:'Soft',icon:'☁️',tag:'neutral',shadows:[{x:0,y:2,blur:8,spread:0,color:'#000000',alpha:7},{x:0,y:8,blur:24,spread:-4,color:'#000000',alpha:11}]},
  {label:'Float',icon:'🪁',tag:'elevated',shadows:[{x:0,y:4,blur:12,spread:-4,color:'#000000',alpha:10},{x:0,y:12,blur:40,spread:-8,color:'#000000',alpha:18}]},
  {label:'Deep',icon:'🌊',tag:'dramatic',shadows:[{x:0,y:4,blur:6,spread:-2,color:'#000000',alpha:10},{x:0,y:20,blur:60,spread:-12,color:'#000000',alpha:28}]},
  {label:'Glow',icon:'✨',tag:'color',shadows:[{x:0,y:0,blur:20,spread:2,color:'#6366f1',alpha:55},{x:0,y:0,blur:60,spread:8,color:'#6366f1',alpha:20}]},
  {label:'Neon',icon:'🌈',tag:'color',shadows:[{x:0,y:0,blur:8,spread:0,color:'#22d3ee',alpha:80},{x:0,y:0,blur:30,spread:4,color:'#22d3ee',alpha:40},{x:0,y:0,blur:80,spread:12,color:'#06b6d4',alpha:15}]},
  {label:'Brutal',icon:'🗿',tag:'sharp',shadows:[{x:4,y:4,blur:0,spread:0,color:'#000000',alpha:100}]},
  {label:'Stack',icon:'📚',tag:'sharp',shadows:[{x:2,y:2,blur:0,spread:0,color:'#000000',alpha:30},{x:4,y:4,blur:0,spread:0,color:'#000000',alpha:18},{x:6,y:6,blur:0,spread:0,color:'#000000',alpha:9}]},
  {label:'Pressed',icon:'🖱️',tag:'inset',shadows:[{x:0,y:1,blur:2,spread:0,color:'#000000',alpha:14,inset:true},{x:0,y:3,blur:6,spread:0,color:'#000000',alpha:8,inset:true}]},
  {label:'Glass',icon:'🔮',tag:'inset',shadows:[{x:0,y:1,blur:0,spread:2,color:'#ffffff',alpha:22,inset:true},{x:0,y:-1,blur:0,spread:1,color:'#000000',alpha:14,inset:true},{x:0,y:8,blur:32,spread:-4,color:'#000000',alpha:16}]},
  {label:'Long',icon:'🌒',tag:'dramatic',shadows:[{x:12,y:20,blur:0,spread:0,color:'#000000',alpha:20},{x:6,y:10,blur:0,spread:0,color:'#000000',alpha:12}]},
  {label:'Layered',icon:'🎂',tag:'elevated',shadows:[{x:0,y:1,blur:2,spread:0,color:'#000000',alpha:8},{x:0,y:4,blur:8,spread:-2,color:'#000000',alpha:10},{x:0,y:12,blur:24,spread:-4,color:'#000000',alpha:12},{x:0,y:32,blur:48,spread:-8,color:'#000000',alpha:10}]},
  {label:'Retro',icon:'🕹️',tag:'sharp',shadows:[{x:3,y:3,blur:0,spread:0,color:'#000000',alpha:100},{x:-1,y:-1,blur:0,spread:0,color:'#ffffff',alpha:60,inset:true}]},
];

const TAG_COLORS: Record<string,string> = {
  neutral:'bg-zinc-100 text-zinc-500',elevated:'bg-sky-50 text-sky-600',
  dramatic:'bg-indigo-50 text-indigo-600',color:'bg-violet-50 text-violet-600',
  sharp:'bg-amber-50 text-amber-600',inset:'bg-emerald-50 text-emerald-600',
};

const PREVIEW_BG = [
  {label:'White',value:'#ffffff',dark:false},{label:'Light',value:'#f4f4f5',dark:false},
  {label:'Warm',value:'#fef9ef',dark:false},{label:'Dark',value:'#18181b',dark:true},
  {label:'Navy',value:'#0f172a',dark:true},{label:'Purple',value:'#2e1065',dark:true},
  {label:'Forest',value:'#052e16',dark:true},
];

// ── 2D Light Position Pad ─────────────────────────────────────────────────

function LightPad({x,y,onMove}:{x:number;y:number;onMove:(x:number,y:number)=>void}) {
  const padRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const SIZE = 140;
  const RANGE = 80; // maps half-pad to ±80px

  const clampedX = Math.max(-RANGE, Math.min(RANGE, x));
  const clampedY = Math.max(-RANGE, Math.min(RANGE, y));
  const dotX = ((clampedX / RANGE) * 0.45 + 0.5) * SIZE;
  const dotY = ((clampedY / RANGE) * 0.45 + 0.5) * SIZE;

  const move = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging.current || !padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const nx = ((cx - rect.left) / rect.width - 0.5) * 2 * RANGE;
    const ny = ((cy - rect.top) / rect.height - 0.5) * 2 * RANGE;
    onMove(Math.round(Math.max(-RANGE, Math.min(RANGE, nx))), Math.round(Math.max(-RANGE, Math.min(RANGE, ny))));
  }, [onMove]);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    window.addEventListener('mousemove', move as EventListener);
    window.addEventListener('touchmove', move as EventListener, {passive:true});
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
      window.removeEventListener('mousemove', move as EventListener);
      window.removeEventListener('touchmove', move as EventListener);
    };
  }, [move]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-[9.5px] font-bold uppercase tracking-widest text-zinc-400">Light source</p>
      <div
        ref={padRef}
        className="relative cursor-crosshair rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-50 select-none touch-none"
        style={{ width: SIZE, height: SIZE }}
        onMouseDown={e => { dragging.current=true; move(e.nativeEvent); }}
        onTouchStart={e => { dragging.current=true; }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-px w-full bg-zinc-200/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-zinc-200/70" />
        </div>
        {/* Origin dot */}
        <div className="absolute h-1.5 w-1.5 rounded-full bg-zinc-300 pointer-events-none" style={{left:SIZE/2-3,top:SIZE/2-3}} />
        {/* Line from center to dot */}
        <svg className="absolute inset-0 pointer-events-none" width={SIZE} height={SIZE}>
          <line x1={SIZE/2} y1={SIZE/2} x2={dotX} y2={dotY} stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
        {/* Draggable dot */}
        <div
          className="absolute h-5 w-5 rounded-full border-2 border-white bg-zinc-900 shadow-lg ring-2 ring-zinc-900/20 pointer-events-none"
          style={{ left: dotX-10, top: dotY-10, transition: dragging.current ? 'none' : 'left 0.1s,top 0.1s' }}
        />
        {/* Sun icon at top-left corner */}
        <span className="absolute top-1.5 left-2 text-[10px] opacity-40 pointer-events-none">☀️</span>
      </div>
      <p className="text-[10px] font-mono text-zinc-400">x:{clampedX} y:{clampedY}</p>
    </div>
  );
}

// ── Neumorphism generator ─────────────────────────────────────────────────

function hexToHsl(hex: string): {h:number;s:number;l:number} {
  const [r,g,b] = hexToRgb(hex).map(v=>v/255);
  const max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2;
  if (max===min) return {h:0,s:0,l:Math.round(l*100)};
  const d=max-min,s=l>0.5?d/(2-max-min):d/(max+min);
  let h=0;
  if (max===r) h=((g-b)/d+(g<b?6:0))/6;
  else if (max===g) h=((b-r)/d+2)/6;
  else h=((r-g)/d+4)/6;
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
}
function hslToHex(h:number,s:number,l:number):string {
  const hn=h/360,sn=s/100,ln=l/100;
  if (sn===0){const v=Math.round(ln*255);return'#'+[v,v,v].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();}
  const q=ln<0.5?ln*(1+sn):ln+sn-ln*sn,p=2*ln-q;
  const h2r=(t:number)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};
  return'#'+[h2r(hn+1/3),h2r(hn),h2r(hn-1/3)].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('').toUpperCase();
}

function generateNeumorphism(bgHex: string, distance=12, blur=24, intensity=20): {shadows:Partial<Shadow>[];elementBg:string} {
  const {h,s,l}=hexToHsl(bgHex);
  const light=hslToHex(h,s,Math.min(100,l+intensity));
  const dark=hslToHex(h,s,Math.max(0,l-intensity));
  return {
    shadows:[
      {x:-distance,y:-distance,blur,spread:0,color:light,alpha:100,inset:false},
      {x:distance,y:distance,blur,spread:0,color:dark,alpha:100,inset:false},
    ],
    elementBg:bgHex,
  };
}

// ── Slider ─────────────────────────────────────────────────────────────────

function Slider({label,value,min,max,unit='px',onChange}:{label:string;value:number;min:number;max:number;unit?:string;onChange:(v:number)=>void}) {
  return (
    <div className="grid grid-cols-[68px_1fr_48px_50px] items-center gap-2">
      <span className="text-[11px] font-semibold text-zinc-500 truncate">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))} className="h-1.5 w-full cursor-pointer accent-zinc-900 rounded-full" />
      <span className="text-right font-mono text-[11px] text-zinc-500 tabular-nums">{value}{unit}</span>
      <input type="number" min={min} max={max} value={value} onChange={e=>onChange(Math.min(max,Math.max(min,Number(e.target.value)||min)))} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-1.5 py-1 text-center font-mono text-[11px] text-zinc-700 outline-none focus:border-zinc-400" />
    </div>
  );
}

// ── Copy btn ───────────────────────────────────────────────────────────────

function CopyBtn({text,label='Copy',className=''}:{text:string;label?:string;className?:string}) {
  const [ok,setOk]=useState(false);
  const copy=useCallback(async()=>{try{await navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1500);}catch{}},[text]);
  return (
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all active:scale-95 ${className}`}>
      {ok?<Check className="h-3.5 w-3.5 text-emerald-500 shrink-0"/>:<Copy className="h-3.5 w-3.5 shrink-0"/>}
      <span>{ok?'Copied!':label}</span>
    </button>
  );
}

// ── Main Tool ──────────────────────────────────────────────────────────────

function CssBoxShadowTool() {
  const [shadows, setShadows] = useState<Shadow[]>([makeShadow({y:8,blur:24,spread:-4,alpha:14})]);
  const [hoverShadows, setHoverShadows] = useState<Shadow[]>([makeShadow({y:16,blur:40,spread:-8,alpha:22})]);
  const [activeId, setActiveId] = useState<number>(shadows[0].id);
  const [hoverActiveId, setHoverActiveId] = useState<number>(hoverShadows[0].id);
  const [editingHover, setEditingHover] = useState(false);
  const [enableHover, setEnableHover] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [shapeId, setShapeId] = useState<ShapeId>('card');
  const [previewBg, setPreviewBg] = useState('#ffffff');
  const [shapeOverrideBg, setShapeOverrideBg] = useState('#ffffff');
  const [useShapeOverride, setUseShapeOverride] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('xy');
  const [angleVal, setAngleVal] = useState(135);
  const [distVal, setDistVal] = useState(10);

  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  // Neumorphism state
  const [neuBg, setNeuBg] = useState('#e0e5ec');
  const [neuDist, setNeuDist] = useState(12);
  const [neuBlur, setNeuBlur] = useState(24);
  const [neuIntensity, setNeuIntensity] = useState(20);

  const shape = SHAPES.find(s=>s.id===shapeId)!;
  const bgMeta = PREVIEW_BG.find(b=>b.value===previewBg)??PREVIEW_BG[0];

  // Which set we're editing
  const activeShadows = editingHover ? hoverShadows : shadows;
  const setActiveShadows = editingHover ? setHoverShadows : setShadows;
  const currentActiveId = editingHover ? hoverActiveId : activeId;
  const setCurrentActiveId = editingHover ? setHoverActiveId : setActiveId;

  const active = activeShadows.find(s=>s.id===currentActiveId) ?? activeShadows[0];

  const update = useCallback((id:number, patch:Partial<Shadow>) => {
    setActiveShadows(prev=>prev.map(s=>s.id===id?{...s,...patch}:s));
  }, [setActiveShadows]);

  const updateActive = useCallback((patch:Partial<Shadow>) => {
    if (!active) return;
    update(active.id, patch);
    // Sync angle/dist when X/Y change
    if (patch.x !== undefined || patch.y !== undefined) {
      const nx = patch.x ?? active.x;
      const ny = patch.y ?? active.y;
      const {angle, dist} = xyToAngleDist(nx, ny);
      setAngleVal(angle); setDistVal(dist);
    }
  }, [active, update]);

  // Light pad move
  const handleLightMove = useCallback((x:number,y:number) => {
    updateActive({x,y});
  }, [updateActive]);

  // Angle/dist sync
  const applyAngleDist = useCallback((a:number,d:number) => {
    const {x,y}=angleDistToXY(a,d);
    setAngleVal(a); setDistVal(d);
    update(currentActiveId, {x,y});
  }, [currentActiveId, update]);

  // Sync angle/dist when active changes
  useEffect(() => {
    if (!active) return;
    const {angle,dist}=xyToAngleDist(active.x,active.y);
    setAngleVal(angle); setDistVal(dist);
  }, [active?.id]);

  const addShadow = useCallback(() => {
    const s=makeShadow({y:8,blur:24,alpha:12});
    setActiveShadows(prev=>[...prev,s]);
    setCurrentActiveId(s.id);
  }, [setActiveShadows, setCurrentActiveId]);

  const removeShadow = useCallback((id:number) => {
    setActiveShadows(prev=>{
      const next=prev.filter(s=>s.id!==id);
      if (id===currentActiveId&&next.length>0) setCurrentActiveId(next[0].id);
      return next;
    });
  }, [currentActiveId, setActiveShadows, setCurrentActiveId]);

  const loadPreset = useCallback((preset:typeof PRESETS[0]) => {
    const ns=preset.shadows.map(s=>makeShadow(s));
    setShadows(ns); setActiveId(ns[0].id); setEditingHover(false);
  }, []);

  const applyNeu = useCallback(() => {
    const {shadows:ns,elementBg}=generateNeumorphism(neuBg,neuDist,neuBlur,neuIntensity);
    const built=ns.map(s=>makeShadow(s));
    setShadows(built); setActiveId(built[0].id);
    setUseShapeOverride(true); setShapeOverrideBg(elementBg);
    setPreviewBg(neuBg); setEditingHover(false);
  }, [neuBg,neuDist,neuBlur,neuIntensity]);

  const randomShadow = useCallback(() => {
    const rnd=(min:number,max:number)=>Math.round(min+Math.random()*(max-min));
    const hue=rnd(0,360);
    const ns=[makeShadow({
      x:rnd(-20,20),y:rnd(4,30),blur:rnd(10,80),spread:rnd(-8,8),
      color:hslToHex(hue,rnd(40,100),rnd(30,60)),alpha:rnd(20,60),
    })];
    if (Math.random()>0.5) ns.push(makeShadow({x:rnd(-10,10),y:rnd(2,15),blur:rnd(5,30),spread:rnd(-4,0),color:'#000000',alpha:rnd(5,15)}));
    setShadows(ns); setActiveId(ns[0].id); setEditingHover(false);
  }, []);

  const handleImport = useCallback(() => {
    const parsed=parseShadowCss(importText);
    if (!parsed) { setImportError('Could not parse — check the format'); return; }
    setShadows(parsed); setActiveId(parsed[0].id);
    setImportError(''); setShowImport(false); setImportText('');
  }, [importText]);

  const cssProp = useMemo(()=>shadowsToProperty(shadows),[shadows]);
  const hProp = useMemo(()=>shadowsToProperty(hoverShadows),[hoverShadows]);
  const exportCode = useMemo(()=>buildExport(shadows,hoverShadows,exportFormat,enableHover),[shadows,hoverShadows,exportFormat,enableHover]);

  const displayShadow = (isHovering && enableHover) ? hProp : cssProp;

  const effectiveStyle: React.CSSProperties = {
    ...shape.style,
    boxShadow: displayShadow==='none'?'none':displayShadow,
    transition: enableHover ? 'box-shadow 0.25s ease, transform 0.2s ease' : 'box-shadow 0.15s ease',
    ...(isHovering&&enableHover?{transform:'translateY(-2px)'}:{}),
    ...(useShapeOverride ? {background: shapeOverrideBg} : {}),
    ...(shape.isText ? {textShadow: displayShadow==='none'?'none':displayShadow, boxShadow:'none'} : {}),
  };

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Presets ──────────────────────────────────────────── */}
      <div className="bg-zinc-50 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Presets</span>
          {PRESETS.map(p=>(
            <button key={p.label} onClick={()=>loadPreset(p)}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:shadow-md active:scale-95">
              {p.icon} {p.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${TAG_COLORS[p.tag]??''}`}>{p.tag}</span>
            </button>
          ))}
          <button onClick={randomShadow} className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-500 shadow-sm transition hover:border-violet-300 hover:text-violet-600 active:scale-95">
            <Shuffle className="h-3 w-3"/> Inspire
          </button>
          <button onClick={()=>setShadows([makeShadow({y:8,blur:24,spread:-4,alpha:14})])} className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-400 shadow-sm transition hover:border-zinc-300 active:scale-95">
            <RotateCcw className="h-3 w-3"/> Reset
          </button>
        </div>
      </div>

      {/* ── Shape selector ───────────────────────────────────── */}
      <div className="bg-white px-4 py-3 sm:px-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Preview Shape</p>
        <div className="flex flex-wrap gap-1.5">
          {SHAPES.map(s=>(
            <button key={s.id} onClick={()=>setShapeId(s.id)} title={s.desc}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11.5px] font-semibold transition active:scale-95 ${shapeId===s.id?'border-zinc-900 bg-zinc-900 text-white shadow-sm':'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100'}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className="grid lg:grid-cols-[1fr_380px] lg:divide-x lg:divide-zinc-100">

        {/* ── Left: Preview ─────────────────────────────────── */}
        <div className="flex flex-col">

          {/* Preview toolbar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Canvas</span>
              {PREVIEW_BG.map(bg=>(
                <button key={bg.value} onClick={()=>setPreviewBg(bg.value)} title={bg.label}
                  className={`h-5 w-5 rounded-full border-2 transition ${previewBg===bg.value?'border-zinc-900 scale-110 shadow-sm':'border-zinc-200 hover:border-zinc-400'}`}
                  style={{background:bg.value}}/>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-1.5 select-none text-[11px] text-zinc-500">
                <input type="checkbox" checked={useShapeOverride} onChange={e=>setUseShapeOverride(e.target.checked)} className="h-3 w-3 accent-zinc-900 rounded"/>
                Shape bg
              </label>
              {useShapeOverride&&(
                <label className="relative cursor-pointer">
                  <div className="h-5 w-5 rounded-md border border-zinc-200 shadow-sm" style={{background:shapeOverrideBg}}/>
                  <input type="color" value={shapeOverrideBg} onChange={e=>setShapeOverrideBg(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer"/>
                </label>
              )}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              {enableHover && (
                <span className="text-[10px] font-semibold text-zinc-400">
                  {isHovering ? '🖱️ hover state' : 'base state'}
                </span>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div
            className="flex flex-1 items-center justify-center p-10 sm:p-16 min-h-[260px] transition-colors duration-300"
            style={{background:previewBg}}
          >
            <div
              style={effectiveStyle}
              onMouseEnter={()=>setIsHovering(true)}
              onMouseLeave={()=>setIsHovering(false)}
            >
              {shape.content}
            </div>
          </div>

          {/* Hover state toggle bar */}
          <div className="border-t border-zinc-100 bg-zinc-50 px-4 py-3 sm:px-5 flex flex-wrap items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <button type="button" role="switch" aria-checked={enableHover} onClick={()=>setEnableHover(v=>!v)}
                className={`relative h-5 w-9 rounded-full transition-colors ${enableHover?'bg-zinc-900':'bg-zinc-300'}`}>
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-150 ${enableHover?'translate-x-4':'translate-x-0.5'}`}/>
              </button>
              <span className="text-[12px] font-semibold text-zinc-600">Hover shadow</span>
            </label>
            {enableHover && (
              <>
                <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5">
                  {([false,true] as const).map(h=>(
                    <button key={String(h)} onClick={()=>setEditingHover(h)}
                      className={`rounded-md px-3 py-1 text-[11px] font-semibold transition ${editingHover===h?'bg-zinc-900 text-white shadow-sm':'text-zinc-500 hover:text-zinc-800'}`}>
                      {h?'Hover':'Base'}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-zinc-400">Hover the preview card to see transition →</span>
              </>
            )}
          </div>

          {/* Export code panel */}
          <div className="border-t border-zinc-200 bg-zinc-950">
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 sm:px-5">
              {/* Format tabs */}
              <div className="flex rounded-lg border border-zinc-700 bg-zinc-800 p-0.5">
                {(['css','tailwind','styled','scss','json'] as ExportFormat[]).map(f=>(
                  <button key={f} onClick={()=>setExportFormat(f)}
                    className={`rounded-md px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide transition ${exportFormat===f?'bg-zinc-100 text-zinc-900 shadow-sm':'text-zinc-400 hover:text-zinc-200'}`}>
                    {f==='tailwind'?'TW':f==='styled'?'SC':f.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                <CopyBtn text={exportCode} label="Copy" className="rounded-lg bg-zinc-700 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-zinc-600"/>
                <CopyBtn text={`box-shadow: ${cssProp};`} label="Value" className="rounded-lg bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-400 hover:bg-zinc-700"/>
              </div>
            </div>
            <pre className="overflow-x-auto px-5 pb-4 text-[12px] leading-[1.9] text-zinc-300 max-h-48">{exportCode}</pre>
          </div>
        </div>

        {/* ── Right: Controls ───────────────────────────────── */}
        <div className="flex flex-col divide-y divide-zinc-100">

          {/* Advanced input mode + 2D pad + Neumorphism + Import */}
          <div className="px-4 py-3 sm:px-5 space-y-3">

            {/* Mode tabs */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Input mode</span>
              <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
                {([['xy','X / Y'],['angle','Angle / Dist']] as [InputMode,string][]).map(([m,l])=>(
                  <button key={m} onClick={()=>setInputMode(m)}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${inputMode===m?'bg-zinc-900 text-white shadow-sm':'text-zinc-500 hover:text-zinc-700'}`}>
                    {m==='xy'?<MousePointer2 className="h-3 w-3"/>:<Lightbulb className="h-3 w-3"/>}{l}
                  </button>
                ))}
              </div>
            </div>

            {/* 2D light pad + angle/dist */}
            <div className="flex flex-wrap gap-4 items-start">
              {active && (
                <LightPad x={active.x} y={active.y} onMove={handleLightMove}/>
              )}
              {inputMode==='angle' && active && (
                <div className="flex-1 space-y-3">
                  <Slider label="Angle" value={angleVal} min={0} max={360} unit="°" onChange={a=>applyAngleDist(a,distVal)}/>
                  <Slider label="Distance" value={distVal} min={0} max={150} onChange={d=>applyAngleDist(angleVal,d)}/>
                  <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-2.5 text-center">
                    <p className="font-mono text-[11px] text-zinc-500">→ x:{active.x}px y:{active.y}px</p>
                  </div>
                </div>
              )}
            </div>

            {/* Utility buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={()=>setShowImport(v=>!v)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold transition active:scale-95 ${showImport?'border-zinc-900 bg-zinc-900 text-white':'border-zinc-200 bg-white text-zinc-600 shadow-sm hover:border-zinc-300'}`}>
                <Download className="h-3.5 w-3.5"/> Import CSS
              </button>
            </div>

            {/* Import panel */}
            {showImport && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Paste existing box-shadow CSS</p>
                <textarea value={importText} onChange={e=>setImportText(e.target.value)} rows={3}
                  placeholder="0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-white p-2.5 font-mono text-[11.5px] text-zinc-700 outline-none focus:border-zinc-400 placeholder-zinc-300"/>
                {importError && <p className="text-[11px] text-red-500">{importError}</p>}
                <button onClick={handleImport} className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-zinc-700 active:scale-95">
                  Parse & Load
                </button>
              </div>
            )}
          </div>

          {/* Neumorphism generator */}
          <div className="px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Neumorphism Generator</p>
              <button onClick={applyNeu} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-zinc-700 active:scale-95">
                <Layers className="h-3.5 w-3.5"/> Apply
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-zinc-500 w-16 shrink-0">Base color</span>
                <label className="relative flex cursor-pointer items-center gap-2">
                  <div className="h-7 w-7 rounded-xl border-2 border-zinc-200 shadow-sm" style={{background:neuBg}}/>
                  <input type="color" value={neuBg} onChange={e=>setNeuBg(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer"/>
                  <span className="font-mono text-[11.5px] text-zinc-600">{neuBg.toUpperCase()}</span>
                </label>
                {/* Preview swatch */}
                <div className="ml-auto h-10 w-10 rounded-xl transition-all"
                  style={{background:neuBg, boxShadow:`-${neuDist}px -${neuDist}px ${neuBlur}px ${hslToHex(hexToHsl(neuBg).h,hexToHsl(neuBg).s,Math.min(100,hexToHsl(neuBg).l+neuIntensity))}, ${neuDist}px ${neuDist}px ${neuBlur}px ${hslToHex(hexToHsl(neuBg).h,hexToHsl(neuBg).s,Math.max(0,hexToHsl(neuBg).l-neuIntensity))}`}}/>
              </div>
              <Slider label="Distance" value={neuDist} min={2} max={40} onChange={setNeuDist}/>
              <Slider label="Blur" value={neuBlur} min={4} max={80} onChange={setNeuBlur}/>
              <Slider label="Intensity" value={neuIntensity} min={5} max={40} unit="%" onChange={setNeuIntensity}/>
            </div>
          </div>

          {/* Shadow layers */}
          <div className="px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {editingHover?'Hover':'Base'} Layers
                </span>
                <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500">{activeShadows.length}</span>
              </div>
              <button onClick={addShadow} className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-zinc-600 shadow-sm transition hover:border-zinc-300 active:scale-95">
                <Plus className="h-3.5 w-3.5"/> Add
              </button>
            </div>
            <div className="space-y-1.5">
              {activeShadows.map(s=>(
                <div key={s.id} onClick={()=>setCurrentActiveId(s.id)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 transition-all ${s.id===currentActiveId?'border-zinc-900 bg-zinc-900 shadow-sm':'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm'}`}>
                  <div className="h-7 w-7 shrink-0 rounded-lg border border-white/20 shadow-sm" style={{background:toRgba(s.color,s.alpha)}}/>
                  <div className="flex-1 min-w-0">
                    <p className={`font-mono text-[11px] truncate ${s.id===currentActiveId?'text-zinc-200':'text-zinc-600'}`}>
                      {s.inset&&<span className={s.id===currentActiveId?'text-amber-400':'text-amber-600'}>inset </span>}
                      {s.x}px {s.y}px {s.blur}px {s.spread}px
                    </p>
                    <p className={`text-[10px] ${s.id===currentActiveId?'text-zinc-500':'text-zinc-400'}`}>{s.color.toUpperCase()} · {s.alpha}%</p>
                  </div>
                  <button onClick={e=>{e.stopPropagation();update(s.id,{enabled:!s.enabled});}} className={`rounded p-1 transition ${s.id===currentActiveId?'text-zinc-500 hover:text-zinc-200':'text-zinc-300 hover:text-zinc-600'}`}>
                    {s.enabled?<Eye className="h-3.5 w-3.5"/>:<EyeOff className="h-3.5 w-3.5"/>}
                  </button>
                  {activeShadows.length>1&&(
                    <button onClick={e=>{e.stopPropagation();removeShadow(s.id);}} className={`rounded p-1 transition ${s.id===currentActiveId?'text-zinc-500 hover:text-red-400':'text-zinc-300 hover:text-red-500'}`}>
                      <Trash2 className="h-3.5 w-3.5"/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active layer controls */}
          {active && (
            <div className="px-4 py-4 sm:px-5 space-y-3.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Layer Controls{editingHover?' — Hover':''}</p>
              <div className="space-y-3.5">
                <Slider label="X Offset" value={active.x} min={-200} max={200} onChange={v=>updateActive({x:v})}/>
                <Slider label="Y Offset" value={active.y} min={-200} max={200} onChange={v=>updateActive({y:v})}/>
                <Slider label="Blur" value={active.blur} min={0} max={300} onChange={v=>updateActive({blur:v})}/>
                <Slider label="Spread" value={active.spread} min={-100} max={150} onChange={v=>updateActive({spread:v})}/>
                <Slider label="Opacity" value={active.alpha} min={0} max={100} unit="%" onChange={v=>updateActive({alpha:v})}/>
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-zinc-500">Color</span>
                  <label className="relative flex cursor-pointer items-center gap-2 group">
                    <div className="h-8 w-8 rounded-xl border-2 border-zinc-200 shadow-sm group-hover:border-zinc-400 transition" style={{background:active.color}}/>
                    <input type="color" value={active.color} onChange={e=>updateActive({color:e.target.value})} className="absolute inset-0 cursor-pointer opacity-0"/>
                    <span className="font-mono text-[11.5px] text-zinc-600">{active.color.toUpperCase()}</span>
                  </label>
                </div>
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <button type="button" role="switch" aria-checked={active.inset} onClick={()=>updateActive({inset:!active.inset})}
                    className={`relative h-5 w-9 rounded-full transition-colors ${active.inset?'bg-amber-500':'bg-zinc-300'}`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-150 ${active.inset?'translate-x-4':'translate-x-0.5'}`}/>
                  </button>
                  <span className={`text-[12px] font-semibold ${active.inset?'text-amber-600':'text-zinc-500'}`}>{active.inset?'Inset ✓':'Inset'}</span>
                </label>
              </div>

              {/* Isolated layer preview */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">This layer only</p>
                <div className="flex items-center justify-center h-14 rounded-lg bg-white border border-zinc-100">
                  <div className="h-8 w-28 rounded-xl bg-white border border-zinc-100" style={{boxShadow:shadowToCss(active)}}/>
                </div>
                <p className="mt-1.5 text-center font-mono text-[9.5px] text-zinc-400 break-all leading-relaxed">{shadowToCss(active)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CssBoxShadowClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="CSS Box Shadow Generator"
      subtitle="Advanced multi-layer shadow builder for any shape. 2D light pad, angle/distance mode, neumorphism generator, hover states, CSS/Tailwind/styled-components export, and CSS import. 100% in-browser."
      toolName="css_box_shadow"
      icon="🟦"
      features={['12 shapes', '12 presets', 'Neumorphism', 'Hover state', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<CssBoxShadowTool />}
    />
  );
}
