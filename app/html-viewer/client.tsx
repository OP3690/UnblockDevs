'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, RefreshCw, Maximize2, Monitor, Smartphone, Moon, Sun, Download, Play } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ─────────────────────────────────────────────────────────────────────

type ViewportSize = 'desktop' | 'tablet' | 'mobile';
type Theme = 'light' | 'dark';

// ── Sample templates ──────────────────────────────────────────────────────────

const TEMPLATES: { label: string; code: string }[] = [
  {
    label: 'Blank',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; color: #111; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Start building your HTML here.</p>
</body>
</html>`,
  },
  {
    label: 'Card UI',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Card UI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; }
    .card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2rem; max-width: 380px; width: 100%; }
    .avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
    h2 { font-size: 1.25rem; font-weight: 700; color: #111; }
    p { color: #666; margin: 0.5rem 0 1.5rem; font-size: 0.9rem; line-height: 1.6; }
    .btn { display: inline-block; background: #6366f1; color: white; padding: 0.6rem 1.4rem; border-radius: 8px; text-decoration: none; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; }
    .btn:hover { background: #4f46e5; }
    .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .tag { background: #f0f0ff; color: #6366f1; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar">JS</div>
    <h2>Jane Smith</h2>
    <div class="tags">
      <span class="tag">Frontend</span>
      <span class="tag">React</span>
      <span class="tag">TypeScript</span>
    </div>
    <p>Senior developer passionate about building fast, accessible, and beautiful web experiences. Open to new opportunities.</p>
    <button class="btn">View Profile →</button>
  </div>
</body>
</html>`,
  },
  {
    label: 'Login Form',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .form-wrap { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); width: 100%; max-width: 400px; margin: 1rem; }
    h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
    .subtitle { color: #888; font-size: 0.875rem; margin-bottom: 2rem; }
    label { display: block; font-size: 0.8rem; font-weight: 600; color: #333; margin-bottom: 0.4rem; }
    input { width: 100%; border: 1.5px solid #e4e4e7; border-radius: 8px; padding: 0.65rem 0.9rem; font-size: 0.9rem; margin-bottom: 1.25rem; outline: none; transition: border-color 0.15s; }
    input:focus { border-color: #6366f1; }
    .btn { width: 100%; background: #6366f1; color: white; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
    .btn:hover { background: #4f46e5; }
    .link { text-align: center; margin-top: 1.25rem; font-size: 0.8rem; color: #888; }
    .link a { color: #6366f1; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="form-wrap">
    <h1>Welcome back</h1>
    <p class="subtitle">Sign in to your account</p>
    <label>Email address</label>
    <input type="email" placeholder="you@example.com">
    <label>Password</label>
    <input type="password" placeholder="••••••••">
    <button class="btn">Sign in</button>
    <p class="link">No account? <a href="#">Create one</a></p>
  </div>
</body>
</html>`,
  },
  {
    label: 'Gradient Hero',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hero Section</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; }
    .hero { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
    .hero-content { color: white; max-width: 600px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 20px; padding: 0.35rem 1rem; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 1.5rem; backdrop-filter: blur(4px); }
    h1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem; }
    p { font-size: 1.1rem; opacity: 0.85; line-height: 1.7; margin-bottom: 2rem; }
    .cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary { background: white; color: #6366f1; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 0.95rem; }
    .btn-secondary { background: transparent; color: white; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 0.95rem; border: 2px solid rgba(255,255,255,0.4); }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <div class="badge">✨ Now in public beta</div>
      <h1>Build faster,<br>ship with confidence</h1>
      <p>The developer platform that makes building and deploying modern web apps effortless. Zero config, instant deployments.</p>
      <div class="cta">
        <a href="#" class="btn-primary">Get started free</a>
        <a href="#" class="btn-secondary">See the docs →</a>
      </div>
    </div>
  </section>
</body>
</html>`,
  },
  {
    label: 'CSS Animation',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Animations</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0f0f11; display: flex; align-items: center; justify-content: center; min-height: 100vh; gap: 3rem; flex-wrap: wrap; padding: 2rem; }
    .box { width: 80px; height: 80px; border-radius: 16px; }
    .spin { background: linear-gradient(135deg, #6366f1, #ec4899); animation: spin 2s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .pulse { background: #10b981; animation: pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
    .bounce { background: #f59e0b; border-radius: 50%; animation: bounce 1s ease infinite; }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
    .morph { background: #3b82f6; animation: morph 3s ease-in-out infinite; }
    @keyframes morph { 0%, 100% { border-radius: 16px; } 33% { border-radius: 50%; } 66% { border-radius: 0; } }
    .shimmer { background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }
    @keyframes shimmer { to { background-position: -200% 0; } }
  </style>
</head>
<body>
  <div class="box spin"></div>
  <div class="box pulse"></div>
  <div class="box bounce"></div>
  <div class="box morph"></div>
  <div class="box shimmer"></div>
</body>
</html>`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={handle} title="Copy HTML"
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition ${ok ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
      {ok ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {ok ? 'Copied!' : 'Copy'}
    </button>
  );
}

const VIEWPORT_WIDTHS: Record<ViewportSize, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

// ── Main Tool ─────────────────────────────────────────────────────────────────

function HtmlViewerTool() {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [autoRun, setAutoRun] = useState(true);
  const [renderedCode, setRenderedCode] = useState(TEMPLATES[0].code);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [theme, setTheme] = useState<Theme>('light');
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-run with debounce
  useEffect(() => {
    if (!autoRun) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setRenderedCode(code), 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, autoRun]);

  const runNow = useCallback(() => setRenderedCode(code), [code]);

  const downloadHtml = useCallback(() => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'index.html'; a.click();
    URL.revokeObjectURL(url);
  }, [code]);

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 bg-zinc-950 flex flex-col' : 'flex flex-col'}>
      {/* Toolbar */}
      <div className={`flex flex-wrap items-center gap-2 px-4 py-2.5 border-b ${fullscreen ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-100 bg-zinc-50'}`}>
        {/* Templates */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Templates:</span>
          {TEMPLATES.map(t => (
            <button key={t.label} onClick={() => { setCode(t.code); setRenderedCode(t.code); }}
              className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm">
              {t.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* Viewport */}
          <div className="flex rounded-lg border border-zinc-200 bg-white overflow-hidden text-[11px]">
            {([['desktop', Monitor], ['mobile', Smartphone]] as const).map(([v, Icon]) => (
              <button key={v} onClick={() => setViewport(v as ViewportSize)}
                className={`flex items-center gap-1 px-2.5 py-1.5 transition ${viewport === v ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>
          {/* Theme */}
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-500 hover:bg-zinc-50 transition">
            {theme === 'light' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
          </button>
          {/* Run */}
          {!autoRun && (
            <button onClick={runNow}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700 transition">
              <Play className="h-3 w-3" /> Run
            </button>
          )}
          {/* Auto-run toggle */}
          <button onClick={() => setAutoRun(v => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${autoRun ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-zinc-200 bg-white text-zinc-500'}`}>
            <RefreshCw className="h-3 w-3" /> Auto
          </button>
          <CopyBtn text={code} />
          <button onClick={downloadHtml} title="Download HTML"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-600 hover:bg-zinc-50 transition">
            <Download className="h-3 w-3" /> Save
          </button>
          <button onClick={() => setFullscreen(v => !v)} title="Toggle fullscreen"
            className="flex items-center rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-zinc-500 hover:bg-zinc-50 transition">
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${fullscreen ? 'flex-1 min-h-0' : 'min-h-[520px]'} divide-y lg:divide-y-0 lg:divide-x divide-zinc-800`}>
        {/* Editor */}
        <div className="relative flex flex-col bg-zinc-950">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">HTML Editor</span>
            <span className="text-[10px] text-zinc-600 tabular-nums">{lineCount} lines · {charCount.toLocaleString()} chars</span>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-zinc-950 p-4 font-mono text-[12.5px] text-emerald-300 leading-relaxed focus:outline-none"
            style={{ minHeight: fullscreen ? '100%' : '460px', tabSize: 2 }}
            onKeyDown={e => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const el = e.currentTarget;
                const start = el.selectionStart;
                const end = el.selectionEnd;
                const newVal = code.substring(0, start) + '  ' + code.substring(end);
                setCode(newVal);
                requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
              }
            }}
          />
        </div>

        {/* Preview */}
        <div className={`flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 bg-white">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Live Preview</span>
            <span className={`text-[10px] font-medium ${autoRun ? 'text-emerald-600' : 'text-zinc-400'}`}>
              {autoRun ? '● Live' : '○ Manual'}
            </span>
          </div>
          <div className="flex flex-1 items-start justify-center p-4 overflow-auto">
            <div
              className="w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300"
              style={{
                maxWidth: VIEWPORT_WIDTHS[viewport],
                background: theme === 'dark' ? '#111' : '#fff',
              }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={renderedCode}
                sandbox="allow-scripts allow-forms allow-modals"
                title="HTML Preview"
                className="w-full border-0"
                style={{ minHeight: fullscreen ? 'calc(100vh - 120px)' : '460px', display: 'block' }}
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
      subtitle="Write HTML, CSS and JavaScript — see it render instantly in a safe sandboxed preview"
      toolName="html_viewer"
      icon="🖥️"
      features={['Live preview', 'CSS & JS support', '5 templates', 'Download HTML']}
      tool={<HtmlViewerTool />}
    />
  );
}
