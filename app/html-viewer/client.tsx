'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  Copy, Check, RefreshCw, Maximize2, Minimize2, Monitor, Smartphone, Tablet,
  Moon, Sun, Download, Play, Share2, Trash2, ZoomIn, ZoomOut, Terminal,
  ChevronDown, ChevronUp, X, Code2, FileCode, Braces,
} from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'html' | 'css' | 'js';
type Theme = 'light' | 'dark' | 'transparent';
type ConsoleEntry = { level: 'log' | 'warn' | 'error' | 'info'; msg: string; time: number };

// ── Templates ─────────────────────────────────────────────────────────────────

interface Template { label: string; html: string; css: string; js: string }

const TEMPLATES: Template[] = [
  {
    label: 'Blank',
    html: `<h1>Hello, World!</h1>\n<p>Start building here — edit HTML, CSS, and JS in separate tabs.</p>`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 2rem;\n  color: #111;\n  background: #fff;\n}`,
    js: `// console.log() output appears in the Console panel below\nconsole.log('Ready!');`,
  },
  {
    label: 'Card UI',
    html: `<div class="card">\n  <div class="avatar">JS</div>\n  <h2>Jane Smith</h2>\n  <div class="tags">\n    <span class="tag">Frontend</span>\n    <span class="tag">React</span>\n    <span class="tag">TypeScript</span>\n  </div>\n  <p>Senior developer passionate about building fast, accessible web experiences.</p>\n  <button class="btn" onclick="handleClick()">View Profile →</button>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2rem; max-width: 360px; width: 100%; margin: 1rem; }\n.avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; }\nh2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; }\np { color: #666; font-size: 0.875rem; line-height: 1.6; margin: 0 0 1.25rem; }\n.tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }\n.tag { background: #eef2ff; color: #6366f1; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 20px; }\n.btn { background: #6366f1; color: white; border: none; padding: 0.6rem 1.4rem; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }\n.btn:hover { background: #4f46e5; }`,
    js: `function handleClick() {\n  console.log('Profile clicked!');\n  alert('Opening profile...');\n}`,
  },
  {
    label: 'Login Form',
    html: `<div class="wrap">\n  <h1>Welcome back</h1>\n  <p class="sub">Sign in to your account</p>\n  <form onsubmit="handleSubmit(event)">\n    <label>Email</label>\n    <input type="email" id="email" placeholder="you@example.com" required>\n    <label>Password</label>\n    <input type="password" id="pwd" placeholder="••••••••" required>\n    <button type="submit">Sign in</button>\n  </form>\n  <p class="link">No account? <a href="#">Create one</a></p>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.wrap { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); width: 100%; max-width: 400px; margin: 1rem; }\nh1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }\n.sub { color: #888; font-size: 0.875rem; margin-bottom: 2rem; }\nlabel { display: block; font-size: 0.8rem; font-weight: 600; color: #333; margin-bottom: 0.35rem; }\ninput { width: 100%; border: 1.5px solid #e4e4e7; border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.9rem; margin-bottom: 1.25rem; outline: none; transition: border-color 0.15s; font-family: inherit; }\ninput:focus { border-color: #6366f1; }\nbutton { width: 100%; background: #6366f1; color: white; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; }\nbutton:hover { background: #4f46e5; }\n.link { text-align: center; margin-top: 1.25rem; font-size: 0.8rem; color: #888; }\n.link a { color: #6366f1; text-decoration: none; font-weight: 600; }`,
    js: `function handleSubmit(e) {\n  e.preventDefault();\n  const email = document.getElementById('email').value;\n  console.log('Login attempt:', email);\n  alert('Signed in as ' + email);\n}`,
  },
  {
    label: 'Gradient Hero',
    html: `<section class="hero">\n  <div class="content">\n    <div class="badge">✨ Now in public beta</div>\n    <h1>Build faster,<br>ship with confidence</h1>\n    <p>The developer platform that makes building modern web apps effortless. Zero config, instant deployments.</p>\n    <div class="cta">\n      <a href="#" class="btn-primary" onclick="trackCTA(this)">Get started free</a>\n      <a href="#" class="btn-ghost">See the docs →</a>\n    </div>\n    <div class="stats">\n      <div><span id="users">0</span><small>Active users</small></div>\n      <div><span>99.9%</span><small>Uptime</small></div>\n      <div><span>50ms</span><small>Avg latency</small></div>\n    </div>\n  </div>\n</section>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; }\n.hero { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; }\n.content { color: white; max-width: 580px; text-align: center; }\n.badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 20px; padding: 0.3rem 1rem; font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem; backdrop-filter: blur(4px); }\nh1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem; }\np { font-size: 1rem; opacity: 0.85; line-height: 1.7; margin-bottom: 2rem; }\n.cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }\n.btn-primary { background: white; color: #6366f1; padding: 0.75rem 1.75rem; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.9rem; }\n.btn-ghost { background: transparent; color: white; padding: 0.75rem 1.75rem; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 0.9rem; border: 2px solid rgba(255,255,255,0.35); }\n.stats { display: flex; gap: 2rem; justify-content: center; }\n.stats div { display: flex; flex-direction: column; align-items: center; }\n.stats span { font-size: 1.5rem; font-weight: 700; }\n.stats small { font-size: 0.75rem; opacity: 0.7; margin-top: 0.2rem; }`,
    js: `// Animate user counter\nlet count = 0;\nconst target = 12847;\nconst el = document.getElementById('users');\nconst step = Math.ceil(target / 60);\nconst timer = setInterval(() => {\n  count = Math.min(count + step, target);\n  el.textContent = count.toLocaleString();\n  if (count >= target) clearInterval(timer);\n}, 30);\n\nfunction trackCTA(el) {\n  console.log('CTA clicked:', el.textContent);\n}`,
  },
  {
    label: 'Data Table',
    html: `<div class="wrap">\n  <div class="header">\n    <h2>User Analytics</h2>\n    <input type="text" id="search" placeholder="Search users..." oninput="filterTable()">\n  </div>\n  <table id="table">\n    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead>\n    <tbody id="tbody"></tbody>\n  </table>\n  <div class="footer" id="footer"></div>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; background: #f9fafb; padding: 2rem; }\n.wrap { background: white; border-radius: 12px; box-shadow: 0 1px 8px rgba(0,0,0,0.08); overflow: hidden; }\n.header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0f0f0; }\nh2 { font-size: 1rem; font-weight: 700; }\ninput { border: 1.5px solid #e4e4e7; border-radius: 8px; padding: 0.4rem 0.75rem; font-size: 0.8rem; outline: none; width: 200px; }\ninput:focus { border-color: #6366f1; }\ntable { width: 100%; border-collapse: collapse; }\nth { background: #f9fafb; padding: 0.75rem 1.5rem; text-align: left; font-size: 0.7rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f0f0f0; }\ntd { padding: 0.75rem 1.5rem; font-size: 0.825rem; color: #333; border-bottom: 1px solid #f9fafb; }\ntr:hover td { background: #f9fafb; }\n.badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }\n.active { background: #d1fae5; color: #065f46; }\n.inactive { background: #fee2e2; color: #991b1b; }\n.admin { background: #ede9fe; color: #5b21b6; }\n.user { background: #e0f2fe; color: #0369a1; }\n.footer { padding: 0.75rem 1.5rem; font-size: 0.75rem; color: #888; border-top: 1px solid #f0f0f0; }`,
    js: `const data = [\n  { name: 'Alice Chen', email: 'alice@co.com', role: 'admin', status: 'active', joined: 'Jan 2024' },\n  { name: 'Bob Smith', email: 'bob@co.com', role: 'user', status: 'active', joined: 'Feb 2024' },\n  { name: 'Carol White', email: 'carol@co.com', role: 'user', status: 'inactive', joined: 'Mar 2024' },\n  { name: 'Dan Brown', email: 'dan@co.com', role: 'admin', status: 'active', joined: 'Jan 2024' },\n  { name: 'Eve Davis', email: 'eve@co.com', role: 'user', status: 'active', joined: 'Apr 2024' },\n];\n\nfunction render(rows) {\n  const tbody = document.getElementById('tbody');\n  tbody.innerHTML = rows.map(r => \`<tr><td>\${r.name}</td><td>\${r.email}</td><td><span class="badge \${r.role}">\${r.role}</span></td><td><span class="badge \${r.status}">\${r.status}</span></td><td>\${r.joined}</td></tr>\`).join('');\n  document.getElementById('footer').textContent = \`Showing \${rows.length} of \${data.length} users\`;\n}\n\nfunction filterTable() {\n  const q = document.getElementById('search').value.toLowerCase();\n  render(data.filter(r => JSON.stringify(r).toLowerCase().includes(q)));\n}\n\nrender(data);\nconsole.log('Table loaded with', data.length, 'rows');`,
  },
  {
    label: 'CSS Animations',
    html: `<div class="scene">\n  <div class="label">CSS Animations Playground</div>\n  <div class="row">\n    <div class="box spin"><span>Spin</span></div>\n    <div class="box pulse"><span>Pulse</span></div>\n    <div class="box bounce"><span>Bounce</span></div>\n    <div class="box morph"><span>Morph</span></div>\n  </div>\n  <div class="row">\n    <div class="box wave"><span>Wave</span></div>\n    <div class="box flip"><span>Flip</span></div>\n    <div class="box shake" id="shakeBox"><span>Shake</span></div>\n    <div class="box shimmer"><span>Shimmer</span></div>\n  </div>\n  <button onclick="document.getElementById('shakeBox').style.animationPlayState='running'">Trigger Shake</button>\n</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #0f0f11; display: flex; align-items: center; justify-content: center; min-height: 100vh; }\n.scene { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 2rem; }\n.label { color: #888; font-family: system-ui; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }\n.row { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }\n.box { width: 80px; height: 80px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }\n.box span { font-family: system-ui; font-size: 0.6rem; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em; }\n.spin { background: linear-gradient(135deg, #6366f1, #ec4899); animation: spin 2s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n.pulse { background: #10b981; animation: pulse 1.5s ease-in-out infinite; }\n@keyframes pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { transform: scale(1.1); box-shadow: 0 0 0 12px rgba(16,185,129,0); } }\n.bounce { background: #f59e0b; border-radius: 50%; animation: bounce 1s ease infinite; }\n@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }\n.morph { background: #3b82f6; animation: morph 3s ease-in-out infinite; }\n@keyframes morph { 0%,100% { border-radius: 14px; } 33% { border-radius: 50%; } 66% { border-radius: 0; transform: rotate(45deg); } }\n.wave { background: #8b5cf6; animation: wave 2s ease-in-out infinite; }\n@keyframes wave { 0%,100% { transform: skewX(0deg); } 25% { transform: skewX(-10deg); } 75% { transform: skewX(10deg); } }\n.flip { background: #ef4444; animation: flip 2s ease-in-out infinite; }\n@keyframes flip { 0%,100% { transform: perspective(200px) rotateY(0); } 50% { transform: perspective(200px) rotateY(180deg); } }\n.shake { background: #f97316; animation: shake 0.5s ease-in-out; animation-play-state: paused; }\n@keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }\n.shimmer { background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }\n@keyframes shimmer { to { background-position: -200% 0; } }\nbutton { background: #333; color: #fff; border: none; padding: 0.5rem 1.25rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; font-family: system-ui; }\nbutton:hover { background: #444; }`,
    js: `console.log('Animation playground ready!');\nconsole.log('Click "Trigger Shake" to activate the shake animation.');`,
  },
];

// ── Console injection script ──────────────────────────────────────────────────

const CONSOLE_INJECTOR = `<script>
(function(){
  function send(level, args) {
    try {
      var msg = args.map(function(a){
        if(a===null) return 'null';
        if(a===undefined) return 'undefined';
        return typeof a==='object' ? JSON.stringify(a,null,2) : String(a);
      }).join(' ');
      window.parent.postMessage({__htmlviewer:true,level:level,msg:msg},'*');
    } catch(e){}
  }
  ['log','info','warn','error'].forEach(function(m){
    var orig=console[m];
    console[m]=function(){var a=Array.prototype.slice.call(arguments);orig.apply(console,a);send(m,a);};
  });
  window.addEventListener('error',function(e){send('error',[e.message+' (line '+e.lineno+')']);});
  window.addEventListener('unhandledrejection',function(e){send('error',['Unhandled promise: '+e.reason]);});
})();
<\/script>`;

// ── Build document ────────────────────────────────────────────────────────────

function buildDoc(html: string, css: string, js: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${CONSOLE_INJECTOR}
<style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={handle}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition ${ok ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
      {ok ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {ok ? 'Copied!' : label}
    </button>
  );
}

const CONSOLE_COLORS: Record<string, string> = {
  log: 'text-zinc-300',
  info: 'text-blue-400',
  warn: 'text-amber-400',
  error: 'text-red-400',
};

const TAB_ICONS = { html: FileCode, css: Braces, js: Code2 };

// ── Main Tool ─────────────────────────────────────────────────────────────────

function HtmlViewerTool() {
  const [activeTab, setActiveTab] = useState<Tab>('html');
  const [html, setHtml] = useState(TEMPLATES[0].html);
  const [css, setCss] = useState(TEMPLATES[0].css);
  const [js, setJs] = useState(TEMPLATES[0].js);
  const [renderedDoc, setRenderedDoc] = useState(() => buildDoc(TEMPLATES[0].html, TEMPLATES[0].css, TEMPLATES[0].js));
  const [autoRun, setAutoRun] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<Theme>('light');
  const [zoom, setZoom] = useState(100);
  const [viewportW, setViewportW] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [editorSize, setEditorSize] = useState(45); // % width for editor panel
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dragRef = useRef<{ dragging: boolean; startX: number; startSize: number }>({ dragging: false, startX: 0, startSize: 45 });

  const currentCode = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
  const setCurrentCode = activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : setJs;

  // Auto-run debounce
  useEffect(() => {
    if (!autoRun) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setConsoleLogs([]);
      setRenderedDoc(buildDoc(html, css, js));
    }, 700);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [html, css, js, autoRun]);

  // Console message listener
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.__htmlviewer) {
        setConsoleLogs(prev => [...prev.slice(-199), { level: e.data.level, msg: e.data.msg, time: Date.now() }]);
        if (!consoleOpen) setConsoleOpen(true);
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [consoleOpen]);

  // Fullscreen keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && fullscreen) setFullscreen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runNow(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const runNow = useCallback(() => {
    setConsoleLogs([]);
    setRenderedDoc(buildDoc(html, css, js));
  }, [html, css, js]);

  const loadTemplate = useCallback((t: Template) => {
    setHtml(t.html); setCss(t.css); setJs(t.js);
    setConsoleLogs([]);
    setRenderedDoc(buildDoc(t.html, t.css, t.js));
  }, []);

  const downloadHtml = useCallback(() => {
    const full = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n<\/script>\n</body>\n</html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'index.html'; a.click();
    URL.revokeObjectURL(url);
  }, [html, css, js]);

  const shareUrl = useCallback(() => {
    try {
      const payload = JSON.stringify({ html, css, js });
      const encoded = btoa(encodeURIComponent(payload));
      const url = `${window.location.origin}/html-viewer#code=${encoded}`;
      navigator.clipboard.writeText(url);
      alert('Share URL copied to clipboard!');
    } catch {}
  }, [html, css, js]);

  // Load from URL hash on mount
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#code=')) {
        const decoded = JSON.parse(decodeURIComponent(atob(hash.slice(6))));
        if (decoded.html !== undefined) {
          setHtml(decoded.html); setCss(decoded.css); setJs(decoded.js);
          setRenderedDoc(buildDoc(decoded.html, decoded.css, decoded.js));
        }
      }
    } catch {}
  }, []);

  // Drag to resize
  const startDrag = useCallback((e: React.MouseEvent) => {
    dragRef.current = { dragging: true, startX: e.clientX, startSize: editorSize };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  }, [editorSize]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragRef.current.dragging) return;
      const container = document.getElementById('html-viewer-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newSize = Math.max(20, Math.min(80, ((e.clientX - rect.left) / rect.width) * 100));
      setEditorSize(newSize);
    }
    function onMouseUp() {
      dragRef.current.dragging = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
  }, []);

  const errorCount = consoleLogs.filter(l => l.level === 'error').length;
  const warnCount = consoleLogs.filter(l => l.level === 'warn').length;

  const VIEWPORT_PRESETS = [
    { label: 'Full', icon: Monitor, w: null },
    { label: '1024', icon: Monitor, w: 1024 },
    { label: '768', icon: Tablet, w: 768 },
    { label: '375', icon: Smartphone, w: 375 },
  ];

  const wrapCls = fullscreen
    ? 'fixed inset-0 z-[9999] bg-zinc-950 flex flex-col'
    : 'flex flex-col bg-zinc-950 rounded-b-2xl overflow-hidden';

  const editorHeight = consoleOpen ? 'calc(100% - 160px)' : '100%';

  return (
    <div className={wrapCls}>
      {/* ── Top Toolbar ────────────────────────────────────────────── */}
      <div className={`flex flex-wrap items-center gap-2 px-3 py-2 border-b border-zinc-800 bg-zinc-900 ${fullscreen ? '' : 'sticky top-[60px] z-20'}`}>
        {/* Templates */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mr-0.5">Templates</span>
          {TEMPLATES.map(t => (
            <button key={t.label} onClick={() => loadTemplate(t)}
              className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 transition">
              {t.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 flex-wrap">
          {/* Viewport presets */}
          <div className="flex rounded-md border border-zinc-700 overflow-hidden">
            {VIEWPORT_PRESETS.map(({ label, icon: Icon, w }) => (
              <button key={label} onClick={() => setViewportW(w)}
                title={w ? `${w}px` : 'Full width'}
                className={`flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium transition ${viewportW === w ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">
            <button onClick={() => setZoom(z => Math.max(25, z - 25))} className="text-zinc-400 hover:text-white transition"><ZoomOut className="h-3 w-3" /></button>
            <span className="text-[10px] text-zinc-300 w-8 text-center tabular-nums">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 25))} className="text-zinc-400 hover:text-white transition"><ZoomIn className="h-3 w-3" /></button>
          </div>

          {/* Preview theme */}
          <div className="flex rounded-md border border-zinc-700 overflow-hidden">
            {(['light', 'dark', 'transparent'] as Theme[]).map(t => (
              <button key={t} onClick={() => setPreviewTheme(t)}
                className={`px-2 py-1.5 text-[10px] capitalize transition ${previewTheme === t ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                {t === 'light' ? <Sun className="h-3 w-3" /> : t === 'dark' ? <Moon className="h-3 w-3" /> : <span className="font-mono">░</span>}
              </button>
            ))}
          </div>

          {/* Auto/Run */}
          <button onClick={() => setAutoRun(v => !v)}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-medium transition ${autoRun ? 'border-emerald-600 bg-emerald-900/40 text-emerald-400' : 'border-zinc-700 bg-zinc-800 text-zinc-400'}`}>
            <RefreshCw className="h-3 w-3" /> {autoRun ? 'Auto' : 'Manual'}
          </button>
          {!autoRun && (
            <button onClick={runNow}
              className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-emerald-700 transition">
              <Play className="h-3 w-3" /> Run <kbd className="ml-0.5 text-[8px] opacity-60">⌘↵</kbd>
            </button>
          )}

          <CopyBtn text={`<!DOCTYPE html>\n<html>\n<head>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n<\/script>\n</body>\n</html>`} label="Copy HTML" />

          <button onClick={shareUrl} title="Copy share link"
            className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition">
            <Share2 className="h-3 w-3" /> Share
          </button>

          <button onClick={downloadHtml}
            className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition">
            <Download className="h-3 w-3" /> Save
          </button>

          <button onClick={() => setFullscreen(v => !v)}
            className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 p-1.5 text-zinc-400 hover:bg-zinc-700 transition">
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* ── Editor + Preview ────────────────────────────────────────── */}
      <div id="html-viewer-container" className="flex flex-1 min-h-0 overflow-hidden" style={{ height: fullscreen ? 'calc(100vh - 44px)' : '580px' }}>

        {/* ── Editor Panel ── */}
        <div className="flex flex-col min-w-0" style={{ width: `${editorSize}%`, minWidth: '20%' }}>
          {/* Tab bar */}
          <div className="flex items-center border-b border-zinc-800 bg-zinc-900">
            {(['html', 'css', 'js'] as Tab[]).map(tab => {
              const Icon = TAB_ICONS[tab];
              const lineCount = (tab === 'html' ? html : tab === 'css' ? css : js).split('\n').length;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold border-b-2 transition ${activeTab === tab ? 'border-emerald-500 text-emerald-400 bg-zinc-950' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'}`}>
                  <Icon className="h-3 w-3" />
                  {tab.toUpperCase()}
                  <span className={`text-[9px] tabular-nums ${activeTab === tab ? 'text-zinc-500' : 'text-zinc-700'}`}>{lineCount}L</span>
                </button>
              );
            })}
            <div className="ml-auto px-3">
              <button onClick={() => setCurrentCode('')} title="Clear"
                className="text-zinc-600 hover:text-zinc-400 transition">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Code editor */}
          <textarea
            value={currentCode}
            onChange={e => setCurrentCode(e.target.value)}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            className="flex-1 resize-none bg-zinc-950 p-4 font-mono text-[12.5px] leading-relaxed focus:outline-none"
            style={{
              color: activeTab === 'html' ? '#86efac' : activeTab === 'css' ? '#93c5fd' : '#fde68a',
              height: editorHeight,
              tabSize: 2,
            }}
            onKeyDown={e => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const el = e.currentTarget;
                const s = el.selectionStart, end = el.selectionEnd;
                const v = currentCode.substring(0, s) + '  ' + currentCode.substring(end);
                setCurrentCode(v);
                requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
              }
            }}
          />

          {/* Console panel */}
          <div className={`flex flex-col border-t border-zinc-800 transition-all ${consoleOpen ? 'h-40' : 'h-8'}`}>
            <button
              onClick={() => setConsoleOpen(v => !v)}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 transition w-full text-left"
            >
              <Terminal className="h-3 w-3 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Console</span>
              {errorCount > 0 && <span className="text-[9px] rounded-full bg-red-500 text-white px-1.5 py-0.5 font-bold">{errorCount}</span>}
              {warnCount > 0 && <span className="text-[9px] rounded-full bg-amber-500 text-white px-1.5 py-0.5 font-bold">{warnCount}</span>}
              {consoleLogs.length > 0 && <span className="text-[9px] text-zinc-600 ml-auto">{consoleLogs.length} messages</span>}
              <button onClick={e => { e.stopPropagation(); setConsoleLogs([]); }}
                className="text-zinc-700 hover:text-zinc-400 transition ml-1" title="Clear console">
                <X className="h-2.5 w-2.5" />
              </button>
              {consoleOpen ? <ChevronDown className="h-3 w-3 text-zinc-600 ml-auto" /> : <ChevronUp className="h-3 w-3 text-zinc-600 ml-auto" />}
            </button>
            {consoleOpen && (
              <div className="flex-1 overflow-y-auto bg-zinc-950 px-3 py-1">
                {consoleLogs.length === 0 ? (
                  <p className="text-[10px] text-zinc-700 py-1 italic">No output yet. Use console.log() in your JS.</p>
                ) : (
                  consoleLogs.map((log, i) => (
                    <div key={i} className={`flex gap-2 py-0.5 font-mono text-[11px] border-b border-zinc-900 ${CONSOLE_COLORS[log.level] ?? 'text-zinc-300'}`}>
                      <span className="shrink-0 text-zinc-700 tabular-nums text-[9px] mt-0.5">
                        {log.level === 'error' ? '✖' : log.level === 'warn' ? '⚠' : log.level === 'info' ? 'ℹ' : '›'}
                      </span>
                      <pre className="whitespace-pre-wrap break-all flex-1">{log.msg}</pre>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Drag Handle ── */}
        <div
          onMouseDown={startDrag}
          className="w-1 cursor-col-resize bg-zinc-800 hover:bg-emerald-600 transition-colors flex-shrink-0"
          title="Drag to resize"
        />

        {/* ── Preview Panel ── */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Live Preview</span>
            <div className="flex items-center gap-2">
              {viewportW && <span className="text-[10px] text-zinc-600 tabular-nums">{viewportW}px</span>}
              <span className={`flex items-center gap-1 text-[10px] font-medium ${autoRun ? 'text-emerald-500' : 'text-zinc-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${autoRun ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                {autoRun ? 'Live' : 'Manual'}
              </span>
              {zoom !== 100 && (
                <button onClick={() => setZoom(100)} className="text-[10px] text-zinc-500 hover:text-zinc-300">Reset zoom</button>
              )}
            </div>
          </div>

          <div className={`flex-1 overflow-auto flex items-start justify-center p-3 ${previewTheme === 'dark' ? 'bg-zinc-900' : previewTheme === 'transparent' ? 'bg-[repeating-conic-gradient(#ccc_0%_25%,white_0%_50%)] bg-[length:16px_16px]' : 'bg-zinc-200'}`}>
            <div
              className="overflow-hidden rounded-lg shadow-xl bg-white transition-all duration-200"
              style={{
                width: viewportW ? `${viewportW}px` : '100%',
                maxWidth: '100%',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={renderedDoc}
                sandbox="allow-scripts allow-forms allow-modals allow-popups"
                title="HTML Preview"
                className="w-full border-0 block"
                style={{ minHeight: '530px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

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
