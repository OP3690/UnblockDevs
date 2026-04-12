'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Copy, Check, RefreshCw, Maximize2, Minimize2, Monitor, Smartphone, Tablet,
  Moon, Sun, Download, Play, Share2, Trash2, ZoomIn, ZoomOut, Terminal,
  ChevronDown, X, Code2, FileCode, Braces, RotateCcw, Layers,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'html' | 'css' | 'js';
type PreviewBg = 'white' | 'dark' | 'checker';
type ConsoleEntry = { level: 'log' | 'warn' | 'error' | 'info'; msg: string; id: number };

// ── Console injector (injected into every preview) ────────────────────────────

const CONSOLE_BRIDGE = `<script>(function(){var id=0;function s(l,a){try{window.parent.postMessage({__hv:1,l:l,m:Array.prototype.slice.call(a).map(function(x){return x===null?'null':x===undefined?'undefined':typeof x==='object'?JSON.stringify(x,null,2):String(x)}).join(' '),i:++id},'*')}catch(e){}}['log','info','warn','error'].forEach(function(m){var o=console[m];console[m]=function(){s(m,arguments);o&&o.apply(console,arguments)};});window.addEventListener('error',function(e){s('error',[e.message+' (line '+(e.lineno||'?')+')'])});window.addEventListener('unhandledrejection',function(e){s('error',['Uncaught promise: '+String(e.reason)])});})()</s`+'cript>';

function buildDoc(html: string, css: string, js: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${CONSOLE_BRIDGE}<style>${css}</style></head><body>${html}<scr`+`ipt>${js}</scr`+`ipt></body></html>`;
}

// ── Templates ─────────────────────────────────────────────────────────────────

interface Template { label: string; emoji: string; html: string; css: string; js: string }

const TEMPLATES: Template[] = [
  {
    label: 'Starter', emoji: '⚡',
    html: `<div class="hero">\n  <h1>Hello, World! 👋</h1>\n  <p>Edit HTML, CSS, and JS in the tabs above.</p>\n  <button onclick="greet()">Say Hello</button>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody {\n  font-family: system-ui, sans-serif;\n  background: linear-gradient(135deg, #f0f4ff, #fafafa);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  padding: 2rem;\n}\n.hero {\n  text-align: center;\n  max-width: 420px;\n}\nh1 { font-size: 2.5rem; font-weight: 800; color: #111; margin-bottom: 0.75rem; }\np { color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem; }\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 0.7rem 2rem;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.1s, background 0.15s;\n}\nbutton:hover { background: #4f46e5; }\nbutton:active { transform: scale(0.97); }`,
    js: `function greet() {\n  const names = ['World', 'Developer', 'Friend', 'Hacker'];\n  const name = names[Math.floor(Math.random() * names.length)];\n  document.querySelector('h1').textContent = \`Hello, \${name}! 👋\`;\n  console.log('Greeted:', name);\n}`,
  },
  {
    label: 'Card', emoji: '🃏',
    html: `<div class="card">\n  <div class="avatar">JD</div>\n  <h2>Jane Doe</h2>\n  <p class="role">Senior Frontend Engineer</p>\n  <div class="tags">\n    <span>React</span><span>TypeScript</span><span>CSS</span>\n  </div>\n  <p class="bio">Building fast, accessible interfaces. Open to new opportunities.</p>\n  <div class="actions">\n    <button class="btn-primary" onclick="follow(this)">Follow</button>\n    <button class="btn-ghost">Message</button>\n  </div>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.card { background: white; border-radius: 20px; padding: 2rem; max-width: 340px; width: 100%; margin: 1rem; box-shadow: 0 8px 40px rgba(0,0,0,0.08); text-align: center; }\n.avatar { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }\nh2 { font-size: 1.25rem; font-weight: 700; color: #0f172a; }\n.role { color: #6366f1; font-size: 0.8rem; font-weight: 600; margin: 0.3rem 0 1rem; }\n.tags { display: flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }\n.tags span { background: #eef2ff; color: #6366f1; font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.7rem; border-radius: 20px; }\n.bio { color: #64748b; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1.5rem; }\n.actions { display: flex; gap: 0.75rem; }\n.btn-primary, .btn-ghost { flex: 1; padding: 0.6rem; border-radius: 10px; font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; }\n.btn-primary { background: #6366f1; color: white; }\n.btn-primary:hover { background: #4f46e5; }\n.btn-ghost { background: #f8fafc; color: #334155; border: 1.5px solid #e2e8f0; }\n.btn-ghost:hover { border-color: #6366f1; color: #6366f1; }`,
    js: `function follow(btn) {\n  const following = btn.textContent === 'Following';\n  btn.textContent = following ? 'Follow' : 'Following';\n  btn.style.background = following ? '#6366f1' : '#10b981';\n  console.log(following ? 'Unfollowed' : 'Now following Jane');\n}`,
  },
  {
    label: 'Login', emoji: '🔐',
    html: `<div class="wrap">\n  <div class="logo">⚡</div>\n  <h1>Welcome back</h1>\n  <p class="sub">Sign in to continue</p>\n  <form onsubmit="login(event)">\n    <div class="field">\n      <label>Email</label>\n      <input type="email" id="email" placeholder="you@example.com" required>\n    </div>\n    <div class="field">\n      <label>Password</label>\n      <input type="password" id="pwd" placeholder="••••••••" required>\n    </div>\n    <div class="row">\n      <label class="check"><input type="checkbox"> Remember me</label>\n      <a href="#" class="link">Forgot password?</a>\n    </div>\n    <button type="submit" class="btn">Sign in →</button>\n  </form>\n  <p class="footer">No account? <a href="#" class="link">Create one free</a></p>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.wrap { background: white; padding: 2.5rem; border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); width: 100%; max-width: 400px; margin: 1rem; }\n.logo { font-size: 2rem; text-align: center; margin-bottom: 1rem; }\nh1 { font-size: 1.5rem; font-weight: 800; text-align: center; color: #0f172a; }\n.sub { text-align: center; color: #94a3b8; font-size: 0.875rem; margin: 0.4rem 0 1.75rem; }\n.field { margin-bottom: 1.1rem; }\nlabel { display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 0.35rem; }\ninput[type=email], input[type=password] { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 0.65rem 0.9rem; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.15s; color: #0f172a; }\ninput:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }\n.row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; font-size: 0.8rem; color: #64748b; }\n.check { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }\n.link { color: #6366f1; text-decoration: none; font-weight: 600; }\n.link:hover { text-decoration: underline; }\n.btn { width: 100%; background: #6366f1; color: white; border: none; padding: 0.75rem; border-radius: 10px; font-size: 0.9rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: background 0.15s; }\n.btn:hover { background: #4f46e5; }\n.footer { text-align: center; margin-top: 1.25rem; font-size: 0.8rem; color: #94a3b8; }`,
    js: `function login(e) {\n  e.preventDefault();\n  const email = document.getElementById('email').value;\n  console.log('Login:', email);\n  document.querySelector('.btn').textContent = '✓ Signed in!';\n  document.querySelector('.btn').style.background = '#10b981';\n}`,
  },
  {
    label: 'Dashboard', emoji: '📊',
    html: `<div class="dash">\n  <header>\n    <h1>Dashboard</h1>\n    <span class="badge" id="status">● Live</span>\n  </header>\n  <div class="stats" id="stats"></div>\n  <div class="chart-wrap">\n    <div class="chart-header"><span>Revenue (7 days)</span><span id="total"></span></div>\n    <div class="chart" id="chart"></div>\n  </div>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 1.5rem; min-height: 100vh; }\nheader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }\nh1 { font-size: 1.25rem; font-weight: 700; }\n.badge { font-size: 0.7rem; font-weight: 600; color: #4ade80; background: rgba(74,222,128,0.1); padding: 0.3rem 0.8rem; border-radius: 20px; border: 1px solid rgba(74,222,128,0.2); }\n.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem; }\n.stat { background: #1e293b; border-radius: 12px; padding: 1rem; border: 1px solid #334155; }\n.stat-label { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }\n.stat-value { font-size: 1.5rem; font-weight: 800; }\n.stat-delta { font-size: 0.7rem; margin-top: 0.3rem; }\n.up { color: #4ade80; } .down { color: #f87171; }\n.chart-wrap { background: #1e293b; border-radius: 12px; padding: 1.25rem; border: 1px solid #334155; }\n.chart-header { display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; }\n.chart-header span:last-child { color: #e2e8f0; font-weight: 700; }\n.chart { display: flex; align-items: flex-end; gap: 6px; height: 80px; }\n.bar { flex: 1; background: #6366f1; border-radius: 4px 4px 0 0; transition: height 0.6s cubic-bezier(0.4,0,0.2,1); min-height: 4px; cursor: pointer; }\n.bar:hover { background: #818cf8; }`,
    js: `const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];\nconst values = [4200, 6800, 5100, 9400, 7200, 11300, 8600];\nconst total = values.reduce((a,b) => a+b, 0);\n\n// Stats\nconst statsData = [\n  { label: 'Revenue', value: '$'+total.toLocaleString(), delta: '+12.4%', up: true },\n  { label: 'Orders', value: '1,284', delta: '+8.1%', up: true },\n  { label: 'Users', value: '3,921', delta: '+24.7%', up: true },\n  { label: 'Churn', value: '2.3%', delta: '-0.4%', up: false },\n];\ndocument.getElementById('stats').innerHTML = statsData.map(s =>\n  \`<div class="stat"><div class="stat-label">\${s.label}</div><div class="stat-value">\${s.value}</div><div class="stat-delta \${s.up?'up':'down'}">\${s.delta} vs last week</div></div>\`\n).join('');\n\n// Chart\ndocument.getElementById('total').textContent = '$'+total.toLocaleString();\nconst max = Math.max(...values);\ndocument.getElementById('chart').innerHTML = values.map((v,i) =>\n  \`<div class="bar" style="height:\${(v/max*100)}%" title="\${days[i]}: $\${v.toLocaleString()}"></div>\`\n).join('');\n\nconsole.log('Dashboard loaded, total revenue: $'+total.toLocaleString());`,
  },
  {
    label: 'Animation', emoji: '🎨',
    html: `<div class="scene">\n  <h2>CSS Animations</h2>\n  <div class="grid">\n    <div class="box spin"><span>Spin</span></div>\n    <div class="box pulse"><span>Pulse</span></div>\n    <div class="box bounce"><span>Bounce</span></div>\n    <div class="box morph"><span>Morph</span></div>\n    <div class="box wave"><span>Wave</span></div>\n    <div class="box flip"><span>Flip</span></div>\n  </div>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #0a0a0f; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.scene { text-align: center; padding: 2rem; }\nh2 { font-family: system-ui, sans-serif; color: #888; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; }\n.grid { display: grid; grid-template-columns: repeat(3, 80px); gap: 1.5rem; }\n.box { width: 80px; height: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }\n.box span { font-family: system-ui; font-size: 0.55rem; font-weight: 700; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 0.08em; }\n.spin { background: linear-gradient(135deg,#6366f1,#ec4899); animation: spin 2.5s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n.pulse { background: #10b981; animation: pulse 1.8s ease-in-out infinite; }\n@keyframes pulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(16,185,129,.5)} 50%{transform:scale(1.12);box-shadow:0 0 0 16px rgba(16,185,129,0)} }\n.bounce { background: #f59e0b; border-radius: 50%; animation: bnc 1.1s ease infinite; }\n@keyframes bnc { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-26px)} }\n.morph { background: #3b82f6; animation: mrph 3s ease-in-out infinite; }\n@keyframes mrph { 0%,100%{border-radius:16px;transform:rotate(0)} 33%{border-radius:50%} 66%{border-radius:0;transform:rotate(90deg)} }\n.wave { background: #8b5cf6; animation: wave 2.2s ease-in-out infinite; }\n@keyframes wave { 0%,100%{transform:skewX(0)} 30%{transform:skewX(-12deg)} 60%{transform:skewX(12deg)} }\n.flip { background: #ef4444; animation: flip 2s ease-in-out infinite; }\n@keyframes flip { 0%,100%{transform:perspective(160px) rotateY(0)} 50%{transform:perspective(160px) rotateY(180deg)} }`,
    js: `console.log('6 CSS animations running!');`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const CONSOLE_LEVEL_STYLE: Record<string, string> = {
  log:   'text-zinc-300 border-zinc-800',
  info:  'text-sky-400 border-zinc-800',
  warn:  'text-amber-400 border-amber-900/40',
  error: 'text-red-400 border-red-900/40',
};
const CONSOLE_ICON: Record<string, string> = { log: '›', info: 'ℹ', warn: '⚠', error: '✖' };

const TAB_META: Record<Tab, { label: string; Icon: typeof FileCode; activeColor: string; textColor: string }> = {
  html: { label: 'HTML', Icon: FileCode,  activeColor: 'border-orange-400',  textColor: 'text-orange-400' },
  css:  { label: 'CSS',  Icon: Braces,    activeColor: 'border-sky-400',     textColor: 'text-sky-400' },
  js:   { label: 'JS',   Icon: Code2,     activeColor: 'border-yellow-400',  textColor: 'text-yellow-400' },
};

const EDITOR_TEXT: Record<Tab, string> = {
  html: 'text-orange-300',
  css:  'text-sky-300',
  js:   'text-yellow-300',
};

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} }}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all ${ok ? 'bg-emerald-500 text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/15'}`}>
      {ok ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

// ── Main tool ─────────────────────────────────────────────────────────────────

function HtmlViewerTool() {
  const [tab, setTab] = useState<Tab>('html');
  const [html, setHtml] = useState(TEMPLATES[0].html);
  const [css, setCss]   = useState(TEMPLATES[0].css);
  const [js, setJs]     = useState(TEMPLATES[0].js);
  const [doc, setDoc]   = useState(() => buildDoc(TEMPLATES[0].html, TEMPLATES[0].css, TEMPLATES[0].js));
  const [autoRun, setAutoRun]       = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [previewBg, setPreviewBg]   = useState<PreviewBg>('white');
  const [zoom, setZoom]             = useState(100);
  const [vpWidth, setVpWidth]       = useState<number | null>(null);
  const [logs, setLogs]             = useState<ConsoleEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [splitPos, setSplitPos]     = useState(42); // editor % of total width
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef(false);

  const code = tab === 'html' ? html : tab === 'css' ? css : js;
  const setCode = tab === 'html' ? setHtml : tab === 'css' ? setCss : setJs;
  const lineCounts = { html: html.split('\n').length, css: css.split('\n').length, js: js.split('\n').length };

  // Auto-run
  useEffect(() => {
    if (!autoRun) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { setLogs([]); setDoc(buildDoc(html, css, js)); }, 650);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [html, css, js, autoRun]);

  // Console bridge
  useEffect(() => {
    function h(e: MessageEvent) {
      if (!e.data?.__hv) return;
      const entry: ConsoleEntry = { level: e.data.l, msg: e.data.m, id: e.data.i };
      setLogs(prev => [...prev.slice(-299), entry]);
      if (e.data.l === 'error' || e.data.l === 'warn') setConsoleOpen(true);
    }
    window.addEventListener('message', h);
    return () => window.removeEventListener('message', h);
  }, []);

  // Keyboard
  useEffect(() => {
    function h(e: KeyboardEvent) {
      if (e.key === 'Escape' && fullscreen) { setFullscreen(false); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    }
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [fullscreen, html, css, js]);

  const run = useCallback(() => { setLogs([]); setDoc(buildDoc(html, css, js)); }, [html, css, js]);

  const loadTemplate = useCallback((t: Template) => {
    setHtml(t.html); setCss(t.css); setJs(t.js);
    setLogs([]); setDoc(buildDoc(t.html, t.css, t.js));
  }, []);

  const download = useCallback(() => {
    const out = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n<\/script>\n</body>\n</html>`;
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([out], { type: 'text/html' })), download: 'index.html' });
    a.click(); URL.revokeObjectURL(a.href);
  }, [html, css, js]);

  const share = useCallback(() => {
    try {
      const enc = btoa(encodeURIComponent(JSON.stringify({ html, css, js })));
      navigator.clipboard.writeText(`${location.origin}/html-viewer#c=${enc}`);
      alert('Share URL copied!');
    } catch {}
  }, [html, css, js]);

  // URL load
  useEffect(() => {
    try {
      const h = location.hash;
      if (!h.startsWith('#c=')) return;
      const d = JSON.parse(decodeURIComponent(atob(h.slice(3))));
      if (d.html !== undefined) { setHtml(d.html); setCss(d.css); setJs(d.js); setDoc(buildDoc(d.html, d.css, d.js)); }
    } catch {}
  }, []);

  // Drag resize
  useEffect(() => {
    function move(e: MouseEvent) {
      if (!dragRef.current) return;
      const ct = document.getElementById('hv-split');
      if (!ct) return;
      const r = ct.getBoundingClientRect();
      setSplitPos(Math.max(20, Math.min(75, ((e.clientX - r.left) / r.width) * 100)));
    }
    function up() { dragRef.current = false; document.body.style.cursor = ''; document.body.style.userSelect = ''; }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const errorCount = logs.filter(l => l.level === 'error').length;
  const warnCount  = logs.filter(l => l.level === 'warn').length;

  const consoleHeight = consoleOpen ? 160 : 36;
  const editorBodyHeight = `calc(100% - 40px - ${consoleHeight}px)`; // 40px = tab bar

  const outerCls = fullscreen
    ? 'fixed inset-0 z-[9999] flex flex-col bg-[#0d0d12]'
    : 'flex flex-col bg-[#0d0d12] rounded-b-2xl overflow-hidden';

  const PREVIEW_BG_STYLE: Record<PreviewBg, string> = {
    white: '#ffffff',
    dark: '#0f172a',
    checker: 'repeating-conic-gradient(#d1d5db 0% 25%, #f9fafb 0% 50%) 0 0 / 16px 16px',
  };

  return (
    <div className={outerCls}>

      {/* ══════════════ TOP TOOLBAR ══════════════ */}
      <div className={`flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#161620] ${fullscreen ? '' : 'sticky top-[60px] z-20'}`}>

        {/* Templates */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <Layers className="h-3 w-3 text-zinc-600 shrink-0" />
          {TEMPLATES.map(t => (
            <button key={t.label} onClick={() => loadTemplate(t)}
              className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white transition">
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-1.5 flex-wrap">
          {/* Viewport */}
          <div className="flex items-center rounded-md border border-white/10 overflow-hidden text-[10px]">
            {([['Full', Monitor, null], ['1024', Tablet, 1024], ['768', Tablet, 768], ['375', Smartphone, 375]] as const).map(([l, Icon, w]) => (
              <button key={l} onClick={() => setVpWidth(w ?? null)}
                className={`flex items-center gap-1 px-2 py-1.5 transition ${vpWidth === (w ?? null) ? 'bg-indigo-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>
                <Icon className="h-3 w-3" /> <span className="hidden sm:inline">{l}</span>
              </button>
            ))}
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-0.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-1">
            <button onClick={() => setZoom(z => Math.max(25, z - 25))} className="text-zinc-500 hover:text-white transition p-0.5"><ZoomOut className="h-3 w-3" /></button>
            <span className="text-[10px] text-zinc-300 w-8 text-center tabular-nums">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 25))} className="text-zinc-500 hover:text-white transition p-0.5"><ZoomIn className="h-3 w-3" /></button>
          </div>

          {/* Preview BG */}
          <div className="flex items-center rounded-md border border-white/10 overflow-hidden">
            {(['white', 'dark', 'checker'] as PreviewBg[]).map(bg => (
              <button key={bg} onClick={() => setPreviewBg(bg)} title={bg}
                className={`px-2 py-1.5 transition ${previewBg === bg ? 'bg-indigo-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>
                {bg === 'white' ? <Sun className="h-3 w-3" /> : bg === 'dark' ? <Moon className="h-3 w-3" /> : <span className="font-mono text-[9px]">░</span>}
              </button>
            ))}
          </div>

          {/* Auto / Run */}
          <button onClick={() => setAutoRun(v => !v)}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-semibold transition ${autoRun ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'}`}>
            <RefreshCw className="h-3 w-3" /> {autoRun ? 'Auto' : 'Manual'}
          </button>
          {!autoRun && (
            <button onClick={run}
              className="flex items-center gap-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1.5 text-[10px] font-bold text-white transition">
              <Play className="h-3 w-3" /> Run <span className="opacity-50 text-[8px] ml-0.5">⌘↵</span>
            </button>
          )}

          <CopyBtn text={`<!DOCTYPE html>\n<html>\n<head>\n<style>${css}</style>\n</head>\n<body>${html}\n<script>${js}<\/script>\n</body>\n</html>`} label="Copy" />
          <button onClick={share} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-300 hover:bg-white/10 transition">
            <Share2 className="h-3 w-3" /> Share
          </button>
          <button onClick={download} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-300 hover:bg-white/10 transition">
            <Download className="h-3 w-3" /> Save
          </button>
          <button onClick={() => setFullscreen(v => !v)}
            className="flex items-center rounded-md border border-white/10 bg-white/5 p-1.5 text-zinc-400 hover:bg-white/10 transition">
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* ══════════════ EDITOR + PREVIEW ══════════════ */}
      <div id="hv-split" className="flex flex-1 min-h-0" style={{ height: fullscreen ? 'calc(100vh - 48px)' : '600px' }}>

        {/* ─── Editor column ─── */}
        <div className="flex flex-col min-w-0 border-r border-white/5" style={{ width: `${splitPos}%` }}>

          {/* Tab bar */}
          <div className="flex items-center bg-[#161620] border-b border-white/5 shrink-0">
            {(Object.entries(TAB_META) as [Tab, typeof TAB_META[Tab]][]).map(([t, meta]) => {
              const active = tab === t;
              return (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold border-b-2 transition-all ${active ? `${meta.activeColor} ${meta.textColor} bg-[#0d0d12]` : 'border-transparent text-zinc-600 hover:text-zinc-400 hover:bg-white/5'}`}>
                  <meta.Icon className="h-3 w-3" />
                  {meta.label}
                  <span className={`text-[9px] tabular-nums ${active ? 'text-zinc-500' : 'text-zinc-700'}`}>{lineCounts[t]}L</span>
                </button>
              );
            })}
            <div className="ml-auto flex items-center gap-2 pr-3">
              <span className="text-[9px] text-zinc-700 tabular-nums">{code.length.toLocaleString()} chars</span>
              <button onClick={() => setCode('')} title="Clear" className="text-zinc-700 hover:text-zinc-400 transition">
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Code textarea */}
          <textarea
            key={tab}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            className={`flex-1 resize-none bg-[#0d0d12] px-4 py-3 font-mono text-[12.5px] leading-[1.7] focus:outline-none ${EDITOR_TEXT[tab]}`}
            style={{ height: editorBodyHeight, tabSize: 2 }}
            onKeyDown={e => {
              if (e.key !== 'Tab') return;
              e.preventDefault();
              const el = e.currentTarget, s = el.selectionStart;
              const v = code.slice(0, s) + '  ' + code.slice(el.selectionEnd);
              setCode(v);
              requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
            }}
          />

          {/* Console */}
          <div className="border-t border-white/5 shrink-0 bg-[#0d0d12]" style={{ height: `${consoleHeight}px` }}>
            <button onClick={() => setConsoleOpen(v => !v)}
              className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/3 transition">
              <Terminal className="h-3 w-3 text-zinc-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Console</span>
              {errorCount > 0 && <span className="rounded-full bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5">{errorCount} err</span>}
              {warnCount  > 0 && <span className="rounded-full bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5">{warnCount} warn</span>}
              {logs.length > 0 && !errorCount && !warnCount && <span className="text-[9px] text-zinc-700">{logs.length}</span>}
              {logs.length > 0 && (
                <button onClick={e => { e.stopPropagation(); setLogs([]); }} className="ml-auto text-zinc-700 hover:text-zinc-400 transition">
                  <X className="h-2.5 w-2.5" />
                </button>
              )}
              <ChevronDown className={`h-3 w-3 text-zinc-700 ${logs.length === 0 ? 'ml-auto' : ''} transition-transform ${consoleOpen ? '' : '-rotate-90'}`} />
            </button>
            {consoleOpen && (
              <div className="overflow-y-auto px-2" style={{ height: `${consoleHeight - 36}px` }}>
                {logs.length === 0
                  ? <p className="text-[10px] text-zinc-700 px-2 pb-2 italic">No output. Use console.log() in JS.</p>
                  : logs.map(l => (
                    <div key={l.id} className={`flex gap-2 border-b py-0.5 font-mono text-[11px] ${CONSOLE_LEVEL_STYLE[l.level] ?? 'text-zinc-300 border-zinc-800'}`}>
                      <span className="shrink-0 w-3 text-center mt-0.5">{CONSOLE_ICON[l.level]}</span>
                      <pre className="whitespace-pre-wrap break-all flex-1 leading-snug">{l.msg}</pre>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>

        {/* ─── Drag handle ─── */}
        <div
          onMouseDown={() => { dragRef.current = true; document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none'; }}
          className="w-1 shrink-0 cursor-col-resize bg-white/5 hover:bg-indigo-500/60 transition-colors"
        />

        {/* ─── Preview column ─── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Preview bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#161620] border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="flex h-2.5 w-2.5 rounded-full bg-green-500/60" />
              {vpWidth && <span className="ml-2 text-[10px] text-zinc-600 tabular-nums">{vpWidth}px</span>}
            </div>
            <div className="flex items-center gap-2">
              {zoom !== 100 && <button onClick={() => setZoom(100)} className="text-[10px] text-zinc-600 hover:text-zinc-400">Reset zoom</button>}
              <span className={`flex items-center gap-1 text-[10px] font-semibold ${autoRun ? 'text-emerald-500' : 'text-zinc-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${autoRun ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                {autoRun ? 'Live' : 'Manual'}
              </span>
            </div>
          </div>

          {/* Preview viewport */}
          <div className="flex-1 overflow-auto flex items-start justify-center p-4"
            style={{ background: typeof PREVIEW_BG_STYLE[previewBg] === 'string' && previewBg !== 'checker' ? PREVIEW_BG_STYLE[previewBg] : undefined,
                     backgroundImage: previewBg === 'checker' ? 'repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%)' : undefined,
                     backgroundSize: previewBg === 'checker' ? '20px 20px' : undefined }}>
            <div
              className="overflow-hidden rounded-lg shadow-2xl bg-white w-full transition-all duration-300"
              style={{
                maxWidth: vpWidth ? `${vpWidth}px` : '100%',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <iframe
                srcDoc={doc}
                sandbox="allow-scripts allow-forms allow-modals allow-popups"
                title="HTML Preview"
                className="w-full border-0 block"
                style={{ minHeight: fullscreen ? 'calc(100vh - 100px)' : '560px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Dev Utilities', href: '/tools/json' },
  { label: 'HTML Viewer' },
];

export default function HtmlViewerClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      breadcrumbItems={BREADCRUMB}
      title="HTML Viewer & Live Editor"
      subtitle="Write HTML, CSS and JavaScript in separate tabs — live preview, built-in console, resizable panes"
      toolName="html_viewer"
      icon="🖥️"
      features={['HTML · CSS · JS tabs', 'Built-in console', 'Zoom & viewport', 'Share via URL']}
      tool={<HtmlViewerTool />}
    />
  );
}
