'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Copy, Check, Trash2, ArrowLeftRight, FileText, AlignLeft, Columns, Share2, Paperclip, ChevronsUpDown } from 'lucide-react';
import ToolPageShell from '@/components/tools/ToolPageShell';

// ── Types ──────────────────────────────────────────────────────────────────

type DiffOp = 'equal' | 'insert' | 'delete';
type DiffPart = { op: DiffOp; text: string };
type Granularity = 'line' | 'word' | 'char';

// ── Diff engine ────────────────────────────────────────────────────────────

function lcsArr(a: string[], b: string[]): DiffPart[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m+1 }, () => new Array(n+1).fill(0));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
  const parts: DiffPart[] = [];
  let i=m, j=n;
  while (i>0||j>0) {
    if (i>0&&j>0&&a[i-1]===b[j-1]) { parts.unshift({op:'equal', text:a[i-1]}); i--;j--; }
    else if (j>0&&(i===0||dp[i][j-1]>=dp[i-1][j])) { parts.unshift({op:'insert', text:b[j-1]}); j--; }
    else { parts.unshift({op:'delete', text:a[i-1]}); i--; }
  }
  return parts;
}

function diffLines(a: string, b: string): DiffPart[] {
  return lcsArr(a.split('\n'), b.split('\n'));
}

function diffChars(a: string, b: string): DiffPart[] {
  const parts = lcsArr(a.split(''), b.split(''));
  const merged: DiffPart[] = [];
  for (const p of parts) {
    if (merged.length && merged[merged.length-1].op===p.op) merged[merged.length-1].text+=p.text;
    else merged.push({...p});
  }
  return merged;
}

function diffWordInline(a: string, b: string): DiffPart[] {
  const tokenize = (s: string) => s.split(/(\s+)/).filter(t => t !== '');
  const parts = lcsArr(tokenize(a), tokenize(b));
  const merged: DiffPart[] = [];
  for (const p of parts) {
    if (merged.length && merged[merged.length-1].op===p.op) merged[merged.length-1].text+=p.text;
    else merged.push({...p});
  }
  return merged;
}

function computeStats(parts: DiffPart[]) {
  let added=0, removed=0, unchanged=0;
  for (const p of parts) {
    if (p.op==='insert') added++;
    else if (p.op==='delete') removed++;
    else unchanged++;
  }
  return {added, removed, unchanged};
}

// ── Inline renderer ────────────────────────────────────────────────────────

function renderInlineParts(aText: string, bText: string, granularity: 'word' | 'char') {
  const parts = granularity==='char' ? diffChars(aText, bText) : diffWordInline(aText, bText);
  return {
    aEl: parts.map((c,ci) =>
      c.op==='delete'
        ? <mark key={ci} className="rounded-sm bg-red-200 text-red-900">{c.text}</mark>
        : c.op==='equal'
        ? <span key={ci}>{c.text}</span>
        : null
    ),
    bEl: parts.map((c,ci) =>
      c.op==='insert'
        ? <mark key={ci} className="rounded-sm bg-emerald-200 text-emerald-900">{c.text}</mark>
        : c.op==='equal'
        ? <span key={ci}>{c.text}</span>
        : null
    ),
  };
}

// ── Copy btn ───────────────────────────────────────────────────────────────

function CopyBtn({text,label='Copy',className=''}:{text:string;label?:string;className?:string}) {
  const [ok,setOk]=useState(false);
  const copy=useCallback(async()=>{
    try{await navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1500);}catch{}
  },[text]);
  return (
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok?<Check className="h-3.5 w-3.5 text-emerald-400"/>:<Copy className="h-3.5 w-3.5"/>}
      <span>{ok?'Copied!':label}</span>
    </button>
  );
}

// ── Share btn ──────────────────────────────────────────────────────────────

function ShareBtn({className=''}:{className?:string}) {
  const [ok,setOk]=useState(false);
  const share=useCallback(async()=>{
    try{
      await navigator.clipboard.writeText(window.location.href);
      setOk(true);
      setTimeout(()=>setOk(false),1500);
    }catch{}
  },[]);
  return (
    <button onClick={share} className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok?<Check className="h-3.5 w-3.5 text-emerald-400"/>:<Share2 className="h-3.5 w-3.5"/>}
      <span>{ok?'Copied!':'Share'}</span>
    </button>
  );
}

// ── Line number gutter ─────────────────────────────────────────────────────

function LineNum({n,className=''}:{n:number|string;className?:string}) {
  return (
    <span className={`inline-block w-10 shrink-0 select-none text-right pr-3 font-mono text-[11px] leading-6 ${className}`}>
      {n}
    </span>
  );
}

// ── Unified view ───────────────────────────────────────────────────────────

function UnifiedView({
  parts, granularity, contextLines,
}: {
  parts: DiffPart[];
  granularity: Granularity;
  contextLines: number;
}) {
  const [expandedFolds, setExpandedFolds] = useState<Set<string>>(new Set());

  // Reset fold state when content changes
  useEffect(() => {
    setExpandedFolds(new Set());
  }, [parts]);

  type Row =
    | {type:'equal'; text:string; ln:number}
    | {type:'delete'; text:string; aln:number}
    | {type:'insert'; text:string; bln:number}
    | {type:'pair'; aText:string; bText:string; aln:number; bln:number};

  const rows = useMemo((): Row[] => {
    const result: Row[] = [];
    let aln=1, bln=1;
    const inline = granularity !== 'line';

    if (inline) {
      let i=0;
      while (i<parts.length) {
        const p=parts[i];
        if (p.op==='delete' && i+1<parts.length && parts[i+1].op==='insert') {
          result.push({type:'pair', aText:p.text, bText:parts[i+1].text, aln, bln});
          aln++;bln++;i+=2;
        } else if (p.op==='equal') {
          result.push({type:'equal', text:p.text, ln:aln}); aln++;bln++;i++;
        } else if (p.op==='delete') {
          result.push({type:'delete', text:p.text, aln}); aln++;i++;
        } else {
          result.push({type:'insert', text:p.text, bln}); bln++;i++;
        }
      }
    } else {
      for (const p of parts) {
        if (p.op==='equal') { result.push({type:'equal', text:p.text, ln:aln}); aln++;bln++; }
        else if (p.op==='delete') { result.push({type:'delete', text:p.text, aln}); aln++; }
        else { result.push({type:'insert', text:p.text, bln}); bln++; }
      }
    }
    return result;
  }, [parts, granularity]);

  // Mark rows that are "near" a change (within contextLines distance)
  const nearChange = useMemo(() => {
    const near = new Array(rows.length).fill(false);
    for (let i=0; i<rows.length; i++) {
      if (rows[i].type !== 'equal') {
        near[i] = true;
        for (let d=1; d<=contextLines; d++) {
          if (i-d >= 0) near[i-d] = true;
          if (i+d < rows.length) near[i+d] = true;
        }
      }
    }
    return near;
  }, [rows, contextLines]);

  type DisplayItem =
    | {kind:'row'; rowIdx:number}
    | {kind:'fold'; count:number; foldKey:string};

  const displayItems = useMemo((): DisplayItem[] => {
    const items: DisplayItem[] = [];
    let i = 0;
    while (i < rows.length) {
      if (nearChange[i]) {
        items.push({kind:'row', rowIdx:i});
        i++;
      } else {
        const foldKey = String(i);
        const foldStart = i;
        let count = 0;
        while (i < rows.length && !nearChange[i]) { count++; i++; }
        if (expandedFolds.has(foldKey)) {
          for (let j=foldStart; j<foldStart+count; j++) {
            items.push({kind:'row', rowIdx:j});
          }
        } else {
          items.push({kind:'fold', count, foldKey});
        }
      }
    }
    return items;
  }, [rows, nearChange, expandedFolds]);

  const renderRow = (row: Row, key: number) => {
    if (row.type==='equal') return (
      <div key={key} className="flex group hover:bg-zinc-50/80">
        <LineNum n={row.ln} className="text-zinc-300 bg-zinc-50 border-r border-zinc-100 group-hover:text-zinc-400" />
        <span className="flex-1 px-3 text-zinc-500 whitespace-pre-wrap break-all">{row.text||' '}</span>
      </div>
    );
    if (row.type==='delete') return (
      <div key={key} className="flex bg-red-50 border-l-[3px] border-red-400">
        <LineNum n={row.aln} className="text-red-300 bg-red-100/50" />
        <span className="w-5 shrink-0 flex items-center justify-center text-red-400 font-bold text-[13px] select-none">−</span>
        <span className="flex-1 px-2 text-red-800 whitespace-pre-wrap break-all">{row.text||' '}</span>
      </div>
    );
    if (row.type==='insert') return (
      <div key={key} className="flex bg-emerald-50 border-l-[3px] border-emerald-400">
        <LineNum n={row.bln} className="text-emerald-300 bg-emerald-100/40" />
        <span className="w-5 shrink-0 flex items-center justify-center text-emerald-500 font-bold text-[13px] select-none">+</span>
        <span className="flex-1 px-2 text-emerald-900 whitespace-pre-wrap break-all">{row.text||' '}</span>
      </div>
    );
    // pair row — only created when granularity !== 'line'
    const {aEl, bEl} = renderInlineParts(row.aText, row.bText, granularity as 'word'|'char');
    return (
      <div key={key} className="flex flex-col">
        <div className="flex bg-red-50 border-l-[3px] border-red-400">
          <LineNum n={row.aln} className="text-red-300 bg-red-100/50" />
          <span className="w-5 shrink-0 flex items-center justify-center text-red-400 font-bold text-[13px] select-none">−</span>
          <span className="flex-1 px-2 text-red-800 whitespace-pre-wrap break-all">{aEl}{' '}</span>
        </div>
        <div className="flex bg-emerald-50 border-l-[3px] border-emerald-400">
          <LineNum n={row.bln} className="text-emerald-300 bg-emerald-100/40" />
          <span className="w-5 shrink-0 flex items-center justify-center text-emerald-500 font-bold text-[13px] select-none">+</span>
          <span className="flex-1 px-2 text-emerald-900 whitespace-pre-wrap break-all">{bEl}{' '}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="font-mono text-[12.5px] leading-6">
      {displayItems.map((item) => {
        if (item.kind==='fold') {
          return (
            <button
              key={`fold-${item.foldKey}`}
              onClick={() => setExpandedFolds(prev => new Set([...prev, item.foldKey]))}
              className="flex w-full items-center gap-2 bg-zinc-100/80 hover:bg-zinc-200/60 border-y border-zinc-200 px-3 py-1 text-[11px] text-zinc-500 font-medium transition select-none cursor-pointer"
            >
              <ChevronsUpDown className="h-3 w-3 text-zinc-400 shrink-0" />
              <span>↕ {item.count} line{item.count!==1?'s':''} unchanged — click to expand</span>
            </button>
          );
        }
        return renderRow(rows[item.rowIdx], item.rowIdx);
      })}
    </div>
  );
}

// ── Side-by-side view ──────────────────────────────────────────────────────

function SideBySideView({parts}:{parts:DiffPart[]}) {
  const left: {op:DiffOp;text:string;ln:number|''}[] = [];
  const right: {op:DiffOp;text:string;ln:number|''}[] = [];
  let aln=1,bln=1,i=0;
  while (i<parts.length) {
    const p=parts[i];
    if (p.op==='delete'&&i+1<parts.length&&parts[i+1].op==='insert') {
      left.push({op:'delete',text:p.text,ln:aln++});
      right.push({op:'insert',text:parts[i+1].text,ln:bln++});
      i+=2;
    } else if (p.op==='delete') {
      left.push({op:'delete',text:p.text,ln:aln++});
      right.push({op:'equal',text:'',ln:''});i++;
    } else if (p.op==='insert') {
      left.push({op:'equal',text:'',ln:''});
      right.push({op:'insert',text:p.text,ln:bln++});i++;
    } else {
      left.push({op:'equal',text:p.text,ln:aln++});
      right.push({op:'equal',text:p.text,ln:bln++});i++;
    }
  }
  return (
    <div className="grid grid-cols-2 divide-x divide-zinc-200 font-mono text-[12px] leading-6 overflow-x-auto">
      {[
        {label:'A — Original',rows:left},
        {label:'B — Changed',rows:right},
      ].map(({label,rows})=>(
        <div key={label}>
          <div className="sticky top-0 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 z-10">
            {label}
          </div>
          {rows.map((row,idx)=>(
            <div
              key={idx}
              className={`flex items-start ${
                row.op==='delete'?'bg-red-50 border-l-[3px] border-red-400':
                row.op==='insert'?'bg-emerald-50 border-l-[3px] border-emerald-400':
                'hover:bg-zinc-50/80'
              }`}
            >
              <LineNum
                n={row.ln}
                className={
                  row.op==='delete'?'text-red-300 bg-red-100/50':
                  row.op==='insert'?'text-emerald-300 bg-emerald-100/40':
                  'text-zinc-300 bg-zinc-50 border-r border-zinc-100'
                }
              />
              <span className={`flex-1 px-3 whitespace-pre-wrap break-all ${
                row.op==='delete'?'text-red-800':row.op==='insert'?'text-emerald-900':'text-zinc-500'
              }`}>
                {row.text||' '}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Samples ────────────────────────────────────────────────────────────────

const SAMPLE_A = `function fetchUser(id) {
  const url = "/api/users/" + id;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));
}

module.exports = { fetchUser };`;

const SAMPLE_B = `async function fetchUser(id: string) {
  const url = \`/api/v2/users/\${id}\`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json() as User;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
}

export { fetchUser };`;

// ── Accepted file extensions ───────────────────────────────────────────────

const ACCEPTED_EXTS = '.txt,.json,.md,.js,.ts,.jsx,.tsx,.py,.css,.html,.xml,.yaml,.yml,.sql,.sh,.csv,.toml,.env,.gitignore';

// ── Editor panel ───────────────────────────────────────────────────────────

function EditorPanel({
  label, badge, value, onChange, onClear, placeholder,
}: {
  label: string; badge: string; value: string;
  onChange: (v:string)=>void; onClear:()=>void; placeholder:string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lines = value.split('\n').length;
  const chars = value.length;

  const loadFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result;
      if (typeof text === 'string') onChange(text);
    };
    reader.readAsText(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }, [loadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  }, [loadFile]);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
            badge==='A'?'bg-zinc-600 text-zinc-100':'bg-emerald-600 text-white'
          }`}>{badge}</span>
          <span className="text-[12px] font-semibold text-zinc-200">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {value && <span className="text-[10px] text-zinc-500">{lines} lines · {chars} chars</span>}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition"
            title="Load a text file"
          >
            <Paperclip className="h-3 w-3" /> Load file
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTS}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      {/* Textarea with drag-drop */}
      <div
        className="relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-zinc-900/85 border-2 border-dashed border-emerald-500 rounded-b-2xl pointer-events-none">
            <Paperclip className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-[13px]">Drop file to load</span>
          </div>
        )}
        <textarea
          value={value}
          onChange={e=>onChange(e.target.value)}
          placeholder={placeholder}
          rows={14}
          spellCheck={false}
          className="w-full flex-1 resize-y bg-zinc-950 p-4 font-mono text-[12.5px] leading-6 text-zinc-200 outline-none placeholder-zinc-600 focus:bg-zinc-900 transition-colors"
        />
      </div>
    </div>
  );
}

// ── Main tool ──────────────────────────────────────────────────────────────

function TextDiffTool() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [viewMode, setViewMode] = useState<'unified'|'split'>('unified');
  const [granularity, setGranularity] = useState<Granularity>('line');
  const [contextLines, setContextLines] = useState(3);
  const [ignoreWS, setIgnoreWS] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [changesOnly, setChangesOnly] = useState(false);
  const mountedRef = useRef(false);

  // Read URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a');
    const b = params.get('b');
    if (a !== null) setTextA(decodeURIComponent(a));
    if (b !== null) setTextB(decodeURIComponent(b));
    mountedRef.current = true;
  }, []);

  // Debounced URL update (300ms) whenever text changes
  useEffect(() => {
    if (!mountedRef.current) return;
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      if (textA.length + textB.length > 8000) return; // skip if too long
      const params = new URLSearchParams();
      if (textA) params.set('a', encodeURIComponent(textA));
      if (textB) params.set('b', encodeURIComponent(textB));
      const search = params.toString();
      window.history.replaceState(null, '', search ? `?${search}` : window.location.pathname);
    }, 300);
    return () => clearTimeout(timer);
  }, [textA, textB]);

  const normalize = useCallback((t: string) => {
    let s = t;
    if (ignoreCase) s = s.toLowerCase();
    if (ignoreWS) s = s.split('\n').map(l=>l.trim()).join('\n');
    return s;
  }, [ignoreCase, ignoreWS]);

  const parts = useMemo(() => diffLines(normalize(textA), normalize(textB)), [textA, textB, normalize]);
  const filtered = useMemo(() => changesOnly ? parts.filter(p=>p.op!=='equal') : parts, [parts, changesOnly]);
  const {added, removed, unchanged} = useMemo(() => computeStats(parts), [parts]);

  const swap = useCallback(() => { setTextA(textB); setTextB(textA); }, [textA, textB]);
  const loadSample = useCallback(() => { setTextA(SAMPLE_A); setTextB(SAMPLE_B); }, []);

  const hasDiff = textA.trim() || textB.trim();
  const identical = hasDiff && added===0 && removed===0;

  const diffText = parts.map(p=>`${p.op==='insert'?'+':p.op==='delete'?'-':' '} ${p.text}`).join('\n');

  return (
    <div className="divide-y divide-zinc-100">

      {/* ── Inputs ──────────────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <EditorPanel
            label="Original" badge="A"
            value={textA} onChange={setTextA} onClear={()=>setTextA('')}
            placeholder="Paste original text or code here, or drop a file…"
          />
          <EditorPanel
            label="Changed" badge="B"
            value={textB} onChange={setTextB} onClear={()=>setTextB('')}
            placeholder="Paste modified text or code here, or drop a file…"
          />
        </div>
      </div>

      {/* ── Action bar ──────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 bg-zinc-50 px-4 py-3 sm:px-6">
        <button
          onClick={swap}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" /> Swap A ↔ B
        </button>
        <button
          onClick={loadSample}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
        >
          <FileText className="h-3.5 w-3.5" /> Load sample
        </button>

        <div className="h-5 w-px bg-zinc-200 mx-1 hidden sm:block" />

        {/* Checkboxes */}
        {[
          {label:'Ignore whitespace',value:ignoreWS,set:setIgnoreWS},
          {label:'Ignore case',value:ignoreCase,set:setIgnoreCase},
          {label:'Changes only',value:changesOnly,set:setChangesOnly},
        ].map(({label,value,set})=>(
          <label key={label} className="flex cursor-pointer items-center gap-1.5 text-[12px] text-zinc-600 select-none">
            <input type="checkbox" checked={value} onChange={e=>set(e.target.checked)} className="h-3.5 w-3.5 accent-zinc-900 rounded" />
            {label}
          </label>
        ))}
      </div>

      {/* ── Stats bar ───────────────────────────────────────── */}
      {hasDiff && (
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6 bg-white">
          {identical ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700">
              ✓ Files are identical
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                +{added} added
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-semibold text-red-600">
                −{removed} removed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[12px] font-semibold text-zinc-500">
                {unchanged} unchanged
              </span>
            </>
          )}
          <div className="ml-auto flex items-center gap-2">
            <ShareBtn
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600 shadow-sm hover:bg-zinc-50"
            />
            <CopyBtn
              text={diffText}
              label="Copy diff"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-600 shadow-sm hover:bg-zinc-50"
            />
          </div>
        </div>
      )}

      {/* ── Diff output ─────────────────────────────────────── */}
      {hasDiff && (
        <div className="overflow-hidden">
          {/* Diff toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 sm:px-6">
            {/* View mode */}
            <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5 shadow-sm">
              <button
                onClick={()=>setViewMode('unified')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition ${viewMode==='unified'?'bg-zinc-900 text-white shadow-sm':'text-zinc-500 hover:text-zinc-800'}`}
              >
                <AlignLeft className="h-3.5 w-3.5" /> Unified
              </button>
              <button
                onClick={()=>setViewMode('split')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition ${viewMode==='split'?'bg-zinc-900 text-white shadow-sm':'text-zinc-500 hover:text-zinc-800'}`}
              >
                <Columns className="h-3.5 w-3.5" /> Split
              </button>
            </div>

            {/* Granularity + context lines (unified only) */}
            {viewMode==='unified' && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">Granularity</span>
                  <div className="flex rounded-lg border border-zinc-200 bg-white p-0.5 shadow-sm">
                    {(['line','word','char'] as Granularity[]).map(g=>(
                      <button
                        key={g}
                        onClick={()=>setGranularity(g)}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition capitalize ${granularity===g?'bg-zinc-900 text-white shadow-sm':'text-zinc-500 hover:text-zinc-800'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium select-none hidden sm:inline">Context</label>
                  <input
                    type="number"
                    min={0} max={10}
                    value={contextLines}
                    onChange={e => setContextLines(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                    className="w-12 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11.5px] text-zinc-700 text-center shadow-sm outline-none focus:border-zinc-400 transition"
                    title="Context lines around each change (0–10)"
                  />
                  <span className="text-[11px] text-zinc-400 hidden sm:inline">lines</span>
                </div>
              </>
            )}
          </div>

          {/* Output */}
          <div className="max-h-[640px] overflow-y-auto overflow-x-auto bg-white">
            {viewMode==='unified'
              ? <UnifiedView parts={filtered} granularity={granularity} contextLines={contextLines} />
              : <SideBySideView parts={filtered} />
            }
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-400" /> Added</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-400" /> Removed</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm border border-zinc-200 bg-white" /> Unchanged</span>
            {viewMode==='unified' && granularity!=='line' && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block rounded-sm bg-emerald-200 px-1 text-[10px] text-emerald-800">{granularity}</span>
                Inline {granularity} highlight
              </span>
            )}
            {viewMode==='unified' && !changesOnly && (
              <span className="flex items-center gap-1.5">
                <ChevronsUpDown className="h-2.5 w-2.5" /> Collapsed hunks expand on click
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────── */}
      {!hasDiff && (
        <div className="flex flex-col items-center gap-4 bg-zinc-950 px-6 py-16 text-center">
          <div className="flex items-center gap-3 font-mono text-[13px]">
            <span className="rounded-lg bg-zinc-800 px-3 py-1.5 text-zinc-400">A</span>
            <span className="text-zinc-600">————</span>
            <span className="text-zinc-500 text-[18px]">↕</span>
            <span className="text-zinc-600">————</span>
            <span className="rounded-lg bg-emerald-900/60 px-3 py-1.5 text-emerald-400">B</span>
          </div>
          <p className="text-[13px] font-medium text-zinc-500">Paste text in both editors above to see the diff</p>
          <button
            onClick={loadSample}
            className="mt-1 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-[12.5px] font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-700 active:scale-95"
          >
            Try code sample →
          </button>
        </div>
      )}

    </div>
  );
}

export default function TextDiffClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="Text & Code Diff Checker"
      subtitle="Compare two texts or code files instantly. Line, word, and inline character diffs, unified or side-by-side view. Looks and feels like a real code editor — 100% in-browser."
      toolName="text_diff"
      icon="↕️"
      features={['Line, word & char diff', 'Side-by-side', 'No signup']}
      backHref="/tools/json"
      backLabel="All tools"
      tool={<TextDiffTool />}
    />
  );
}
