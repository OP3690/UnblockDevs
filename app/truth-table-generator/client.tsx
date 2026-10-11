'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Play,
  Shield,
  Lock,
  ChevronDown,
  ChevronRight,
  FileCode,
  Download,
  AlertCircle,
  Scale,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import {
  OPERATORS,
  EXAMPLES,
  CODE_LANGS,
  generateTable,
  astStr,
  getSOPTerms,
  getPOSTerms,
  getKMapGrid,
  generateCode,
  AST,
  evalAST,
} from '@/lib/truthTableEngine';

// ─── Quine-McCluskey minimization ───────────────────────────────────────────

interface PrimeImplicant {
  pattern: string;
  minterms: number[];
  term: string;
}

const GRAY_INV: Record<number, number> = { 0: 0, 1: 1, 2: 3, 3: 2 };
const PI_COLORS = ['#3b82f6', '#f97316', '#8b5cf6', '#eab308', '#ec4899'];

function mintermToCell(N: number, m: number): [number, number] | null {
  if (N === 2) return [m >> 1, m & 1];
  if (N === 3) return [m >> 2, GRAY_INV[m & 3] as number];
  if (N === 4) return [GRAY_INV[m >> 2] as number, GRAY_INV[m & 3] as number];
  return null;
}

function canMerge(a: string, b: string): number {
  let diffPos = -1, cnt = 0;
  for (let k = 0; k < a.length; k++) {
    if (a[k] !== b[k]) { cnt++; diffPos = k; if (cnt > 1) return -1; }
  }
  return cnt === 1 && diffPos >= 0 && a[diffPos] !== '_' && b[diffPos] !== '_' ? diffPos : -1;
}

function piToTerm(pattern: string, vars: string[]): string {
  const parts: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '1') parts.push(vars[i]!);
    else if (pattern[i] === '0') parts.push('¬' + vars[i]!);
  }
  return parts.length === 0 ? '1' : parts.join('');
}

function quineMcCluskey(minterms: number[], nv: number, vars: string[]): PrimeImplicant[] {
  if (!nv || !minterms.length) return [];
  if (minterms.length === (1 << nv)) {
    return [{ pattern: '_'.repeat(nv), minterms: [...minterms], term: '1' }];
  }

  type Imp = { pattern: string; minterms: number[] };
  let current: Imp[] = minterms.map(m => ({
    pattern: m.toString(2).padStart(nv, '0'),
    minterms: [m],
  }));
  const primes: Imp[] = [];

  while (current.length) {
    const nextMap = new Map<string, Imp>();
    const used = new Set<number>();
    for (let i = 0; i < current.length; i++) {
      for (let j = i + 1; j < current.length; j++) {
        const pos = canMerge(current[i]!.pattern, current[j]!.pattern);
        if (pos === -1) continue;
        const merged = current[i]!.pattern.split('').map((c, k) => k === pos ? '_' : c).join('');
        if (!nextMap.has(merged)) {
          const ms = [...new Set([...current[i]!.minterms, ...current[j]!.minterms])].sort((a, b) => a - b);
          nextMap.set(merged, { pattern: merged, minterms: ms });
        }
        used.add(i); used.add(j);
      }
    }
    for (let i = 0; i < current.length; i++) { if (!used.has(i)) primes.push(current[i]!); }
    current = [...nextMap.values()];
  }

  const seen = new Set<string>();
  const uniq = primes.filter(p => { const ok = !seen.has(p.pattern); seen.add(p.pattern); return ok; });

  // Greedy essential PI selection
  const rem = new Set(minterms);
  const sel: Imp[] = [];
  const pick = (p: Imp) => {
    if (!sel.includes(p)) { sel.push(p); p.minterms.forEach(m => rem.delete(m)); }
  };
  for (const m of minterms) {
    const covers = uniq.filter(p => p.minterms.includes(m));
    if (covers.length === 1) pick(covers[0]!);
  }
  while (rem.size) {
    let best: Imp | null = null, bc = 0;
    for (const p of uniq) {
      if (sel.includes(p)) continue;
      const c = p.minterms.filter(m => rem.has(m)).length;
      if (c > bc) { bc = c; best = p; }
    }
    if (!best) break;
    pick(best);
  }

  return sel.map(p => ({ ...p, term: piToTerm(p.pattern, vars) }));
}

// ─── Evaluation Trace ────────────────────────────────────────────────────────

interface TraceNode { label: string; result: boolean; children: TraceNode[]; }

function buildTrace(node: AST, asgn: Record<string, boolean>): TraceNode {
  if (node.t === 'c') return { label: node.v ? 'T' : 'F', result: node.v, children: [] };
  if (node.t === 'v') {
    const v = asgn[node.n] ?? false;
    return { label: `${node.n} = ${v ? 1 : 0}`, result: v, children: [] };
  }
  const result = evalAST(node, asgn);
  if (node.t === 'un') {
    return { label: `NOT (${astStr(node.e)})`, result, children: [buildTrace(node.e, asgn)] };
  }
  if (node.t === 'bin') {
    const OPS: Record<string, string> = { AND: 'AND', OR: 'OR', XOR: 'XOR', NAND: 'NAND', NOR: 'NOR', IMP: '→', IFF: '↔' };
    return {
      label: `(${astStr(node.l)}) ${OPS[node.op] ?? node.op} (${astStr(node.r)})`,
      result,
      children: [buildTrace(node.l, asgn), buildTrace(node.r, asgn)],
    };
  }
  throw new Error('Unreachable');
}

function TraceTree({ node }: { node: TraceNode }) {
  return (
    <li className="mt-0.5">
      <span className={`font-mono text-xs ${node.result ? 'text-emerald-600' : 'text-red-500'}`}>
        {node.result ? '✓' : '✗'}
      </span>
      <span className="font-mono text-xs text-gray-700 ml-1.5">{node.label}</span>
      <span className={`ml-2 font-mono text-xs font-bold ${node.result ? 'text-emerald-700' : 'text-red-700'}`}>
        → {node.result ? 'TRUE' : 'FALSE'}
      </span>
      {node.children.length > 0 && (
        <ul className="pl-5 border-l-2 border-gray-200 ml-2 mt-0.5">
          {node.children.map((c, i) => <TraceTree key={i} node={c} />)}
        </ul>
      )}
    </li>
  );
}

// ─── Extra examples ──────────────────────────────────────────────────────────

const EXTRA_EXAMPLES = [
  { lbl: 'NAND', e: 'NOT(A AND B)' },
  { lbl: 'NOR', e: 'NOT(A OR B)' },
  { lbl: 'XNOR', e: 'NOT(A XOR B)' },
  { lbl: 'Half adder sum', e: 'A XOR B' },
  { lbl: 'Half adder carry', e: 'A AND B' },
  { lbl: '3-var majority', e: '(A AND B) OR (B AND C) OR (A AND C)' },
  { lbl: 'Mux(A,B,S)', e: '(A AND NOT S) OR (B AND S)' },
];

const HISTORY_KEY = 'truth-table-history';
const HISTORY_MAX = 8;

// ─── Main component ──────────────────────────────────────────────────────────

export default function TruthTableGeneratorClient() {
  const [expr, setExpr] = useState('(A AND B) OR NOT C');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof generateTable> | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [codeLang, setCodeLang] = useState('js');
  const [codeOpen, setCodeOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Equivalence checker
  const [exprB, setExprB] = useState('');
  const [equivResult, setEquivResult] = useState<{ equivalent: boolean; diffRows: number } | null>(null);
  const [equivError, setEquivError] = useState<string | null>(null);
  const [equivOpen, setEquivOpen] = useState(false);

  // Evaluation trace
  const [traceOpen, setTraceOpen] = useState(false);
  const [traceRow, setTraceRow] = useState(0);

  const insertAt = useCallback((sym: string) => {
    const inp = inputRef.current;
    if (!inp) return;
    const s = inp.selectionStart ?? 0;
    const v = expr;
    if (sym === '()') {
      setExpr(v.slice(0, s) + '()' + v.slice(s));
      setTimeout(() => { inp.focus(); inp.setSelectionRange(s + 1, s + 1); }, 0);
    } else {
      setExpr(v.slice(0, s) + sym + v.slice(s));
      setTimeout(() => { inp.focus(); inp.setSelectionRange(s + sym.length, s + sym.length); }, 0);
    }
  }, [expr]);

  const runGenerate = useCallback(() => {
    const trimmed = expr.trim();
    setError(null);
    setResult(null);
    setTraceRow(0);
    if (!trimmed) { setError('Enter a boolean expression.'); return; }
    trackCtaClick('truth_table_generator', 'generate');
    try {
      const res = generateTable(trimmed);
      setResult(res);
      setHistory((prev) => [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, HISTORY_MAX));
      try {
        const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
        const next = [trimmed, ...(Array.isArray(stored) ? stored : []).filter((x: string) => x !== trimmed)].slice(0, HISTORY_MAX);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      toast.success('Truth table generated');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      toast.error('Invalid expression');
    }
  }, [expr]);

  const loadExample = (exampleExpr: string) => {
    trackCtaClick('truth_table_generator', 'load_example');
    setExpr(exampleExpr);
    setError(null);
    setResult(null);
    setTraceRow(0);
    try {
      const res = generateTable(exampleExpr);
      setResult(res);
      setHistory((prev) => [exampleExpr, ...prev.filter((x) => x !== exampleExpr)].slice(0, HISTORY_MAX));
      toast.success('Truth table generated');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const copyTable = () => {
    if (!result) return;
    const hdr = [...result.vars, 'Result'].join('\t');
    const body = result.rows.map((r) => [...result.vars.map((v) => (r.asgn[v] ? '1' : '0')), r.res ? '1' : '0'].join('\t')).join('\n');
    navigator.clipboard.writeText(hdr + '\n' + body).then(() => { trackCopy('truth_table_generator'); toast.success('Table copied'); });
  };

  const exportCSV = () => {
    if (!result) return;
    const hdr = [...result.vars, 'Result'].join(',');
    const body = result.rows.map((r) => [...result.vars.map((v) => (r.asgn[v] ? '1' : '0')), r.res ? '1' : '0'].join(',')).join('\n');
    const blob = new Blob([hdr + '\n' + body], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'truth-table.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('CSV downloaded');
  };

  const exportJSON = () => {
    if (!result) return;
    const data = {
      expression: result.expr,
      variables: result.vars,
      classification: result.trueCount === result.numRows ? 'tautology' : result.trueCount === 0 ? 'contradiction' : 'contingency',
      minterms: result.minterms,
      maxterms: result.maxterms,
      rows: result.rows.map((r) => ({ ...r.asgn, result: r.res })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'truth-table.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('JSON downloaded');
  };

  const clearAll = () => { setExpr(''); setError(null); setResult(null); toast('Cleared'); };

  const checkEquivalence = useCallback(() => {
    setEquivError(null);
    setEquivResult(null);
    const a = expr.trim(), b = exprB.trim();
    if (!a || !b) { setEquivError('Enter both expressions.'); return; }
    try {
      const ra = generateTable(a), rb = generateTable(b);
      const allVars = Array.from(new Set([...ra.vars, ...rb.vars])).sort();
      if (allVars.some((v) => !ra.vars.includes(v) && !rb.vars.includes(v))) {
        setEquivError('Expressions use incompatible variable sets.');
        return;
      }
      const rowCount = Math.max(ra.numRows, rb.numRows);
      let diffRows = 0;
      for (let i = 0; i < rowCount; i++) {
        const rowA = ra.rows[i], rowB = rb.rows[i];
        if (!rowA || !rowB || rowA.res !== rowB.res) diffRows++;
      }
      setEquivResult({ equivalent: diffRows === 0, diffRows });
      trackCtaClick('truth_table_generator', 'check_equivalence');
    } catch (e) {
      setEquivError(e instanceof Error ? e.message : 'Parse error');
    }
  }, [expr, exprB]);

  const copySOP = () => {
    if (!sop) return;
    let text = '';
    if (sop.type === '0') text = '0';
    else if (sop.type === '1') text = '1';
    else if (sop.type === 'terms') text = sop.terms?.map((term) => term.map((lit) => (lit.negated ? `¬${lit.literal}` : lit.literal)).join('·')).join(' + ') ?? '';
    navigator.clipboard.writeText(text).then(() => { trackCopy('truth_table_generator'); toast.success('SOP copied'); });
  };

  const copyPOS = () => {
    if (!pos) return;
    let text = '';
    if (pos.type === '0') text = '0';
    else if (pos.type === '1') text = '1';
    else if (pos.type === 'terms') text = pos.terms?.map((term) => `(${term.map((lit) => (lit.negated ? `¬${lit.literal}` : lit.literal)).join(' + ')})`).join('·') ?? '';
    navigator.clipboard.writeText(text).then(() => { trackCopy('truth_table_generator'); toast.success('POS copied'); });
  };

  const isTaut = result ? result.trueCount === result.numRows : false;
  const isCont = result ? result.trueCount === 0 : false;
  const density = result && result.numRows ? (result.trueCount / result.numRows * 100).toFixed(1) : '0';
  const kmap = result ? getKMapGrid(result.vars, result.rows) : null;
  const sop = result ? getSOPTerms(result.vars, result.minterms, result.numRows) : null;
  const pos = result ? getPOSTerms(result.vars, result.maxterms, result.numRows) : null;

  // Quine-McCluskey
  const qmResult = useMemo(() => {
    if (!result || !result.vars.length) return null;
    if (!result.minterms.length) return { type: 'zero' as const, pis: [] as PrimeImplicant[] };
    if (result.minterms.length === result.numRows) return { type: 'one' as const, pis: [] as PrimeImplicant[] };
    const pis = quineMcCluskey(result.minterms, result.vars.length, result.vars);
    return { type: 'terms' as const, pis };
  }, [result]);

  // K-map highlights: grid[row][col] = color index or null
  const kmapHighlights = useMemo((): (number | null)[][] | null => {
    if (!qmResult || qmResult.type !== 'terms' || !result) return null;
    const N = result.vars.length;
    if (N < 2 || N > 4) return null;
    const rows = N === 4 ? 4 : 2;
    const cols = N === 2 ? 2 : 4;
    const grid: (number | null)[][] = Array.from({ length: rows }, () => Array<number | null>(cols).fill(null));
    qmResult.pis.forEach((pi, ci) => {
      pi.minterms.forEach(m => {
        const cell = mintermToCell(N, m);
        if (cell && cell[0] < rows && cell[1] < cols) {
          grid[cell[0]]![cell[1]] = ci % PI_COLORS.length;
        }
      });
    });
    return grid;
  }, [qmResult, result]);

  const safeTraceRow = result ? Math.min(traceRow, result.rows.length - 1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3" aria-label="Breadcrumb">
          <Link href="/" className="text-primary-600 hover:text-primary-700 hover:underline">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-gray-700 font-medium" aria-current="page">Truth Table Generator</span>
        </nav>

        <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              Runs in browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              No data sent to server
            </span>
          </div>

          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Operator palette */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Insert</label>
              <div className="flex flex-wrap gap-2">
                {OPERATORS.map((op) => (
                  <button
                    key={op.lbl}
                    type="button"
                    onClick={() => insertAt(op.ins)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-mono text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {op.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Examples</span>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.lbl}
                    type="button"
                    onClick={() => loadExample(ex.e)}
                    className="rounded-xl border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-colors"
                  >
                    {ex.lbl}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gates</span>
                {EXTRA_EXAMPLES.map((ex) => (
                  <button
                    key={ex.lbl}
                    type="button"
                    onClick={() => loadExample(ex.e)}
                    className="rounded-xl border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors"
                  >
                    {ex.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Boolean expression</label>
              <div className={`flex gap-0 rounded-xl border transition-colors ${error ? 'border-red-300 bg-red-50/30' : 'border-gray-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={expr}
                  onChange={(e) => { setExpr(e.target.value); setError(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && runGenerate()}
                  placeholder="e.g. (A AND B) OR NOT C  ·  A → B  ·  A XOR B"
                  className="flex-1 rounded-l-xl border-0 bg-transparent px-4 py-3 font-mono text-sm placeholder:text-gray-400 focus:ring-0"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={runGenerate}
                  className="rounded-r-xl bg-primary-600 text-white px-5 py-3 font-semibold text-sm hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Generate
                </button>
              </div>
              {error && (
                <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={copyTable} disabled={!result} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                <Copy className="w-3.5 h-3.5" /> Copy table
              </button>
              <button type="button" onClick={exportCSV} disabled={!result} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
              <button type="button" onClick={exportJSON} disabled={!result} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                <Download className="w-3.5 h-3.5" /> JSON
              </button>
              <button type="button" onClick={() => setEquivOpen((o) => !o)} className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${equivOpen ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                <Scale className="w-3.5 h-3.5" /> Equivalence check
              </button>
              <button type="button" onClick={clearAll} className="rounded-xl px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                Clear
              </button>
            </div>

            {/* Equivalence checker panel */}
            {equivOpen && (
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-violet-900">Expression Equivalence Checker</span>
                </div>
                <p className="text-xs text-violet-700">Compare two boolean expressions to see if they produce identical truth tables.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-violet-600 mb-1 uppercase tracking-wider">Expression A</label>
                    <input type="text" value={expr} readOnly className="w-full rounded-lg border border-violet-200 bg-white/80 px-3 py-2 font-mono text-sm text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-violet-600 mb-1 uppercase tracking-wider">Expression B</label>
                    <input
                      type="text"
                      value={exprB}
                      onChange={(e) => { setExprB(e.target.value); setEquivResult(null); setEquivError(null); }}
                      onKeyDown={(e) => e.key === 'Enter' && checkEquivalence()}
                      placeholder="e.g. NOT (NOT A OR NOT B)"
                      className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                </div>
                <button type="button" onClick={checkEquivalence} disabled={!exprB.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-40 transition-colors">
                  <Scale className="w-4 h-4" /> Check Equivalence
                </button>
                {equivError && <p className="text-sm text-red-700 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{equivError}</p>}
                {equivResult && (
                  <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${equivResult.equivalent ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-red-300 bg-red-50 text-red-800'}`}>
                    {equivResult.equivalent
                      ? '✓ Equivalent — both expressions produce identical truth tables.'
                      : `✗ Not equivalent — ${equivResult.diffRows} row(s) differ.`}
                  </div>
                )}
              </div>
            )}

            {/* Output */}
            {result && (
              <div className="space-y-6 pt-4 border-t border-gray-100">
                {/* Var pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Variables</span>
                  {result.vars.map((v) => (
                    <span key={v} className="rounded-xl bg-sky-50 border border-sky-200 px-2.5 py-1 text-xs font-mono text-sky-800">{v}</span>
                  ))}
                </div>

                {/* Classify */}
                <div>
                  {isTaut && <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">⊤ Tautology — always TRUE</div>}
                  {isCont && <div className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800">⊥ Contradiction — always FALSE</div>}
                  {!isTaut && !isCont && <div className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">∼ Contingency — depends on inputs</div>}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {[
                    { lbl: 'Variables', val: result.vars.length, cls: 'text-sky-600' },
                    { lbl: 'Rows', val: result.numRows, cls: 'text-sky-600' },
                    { lbl: 'TRUE', val: result.trueCount, cls: 'text-emerald-600' },
                    { lbl: 'FALSE', val: result.numRows - result.trueCount, cls: 'text-red-600' },
                    { lbl: 'Minterms', val: result.minterms.length, cls: 'text-violet-600' },
                    { lbl: 'Maxterms', val: result.maxterms.length, cls: 'text-violet-600' },
                    { lbl: 'Truth %', val: density + '%', cls: 'text-amber-600' },
                  ].map((c) => (
                    <div key={c.lbl} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{c.lbl}</div>
                      <div className={`text-lg font-bold ${c.cls}`}>{c.val}</div>
                    </div>
                  ))}
                </div>

                {/* Truth table */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-1 h-4 rounded bg-primary-500" />
                    Truth table
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full border-collapse text-sm font-mono">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 border-b border-r border-gray-200">#</th>
                          {result.vars.map((v) => (
                            <th key={v} className="px-3 py-2 text-center text-xs font-semibold text-sky-700 border-b border-r border-gray-200">{v}</th>
                          ))}
                          <th className="px-3 py-2 text-center text-xs font-semibold text-primary-700 border-b border-l-2 border-gray-300 bg-primary-50/50">{astStr(result.ast)}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            className={`hover:bg-gray-50/50 cursor-pointer ${ri === safeTraceRow && traceOpen ? 'ring-2 ring-inset ring-amber-400' : ''}`}
                            onClick={() => { setTraceRow(ri); setTraceOpen(true); }}
                          >
                            <td className="px-3 py-1.5 text-gray-400 border-r border-b border-gray-100 text-xs">{ri}</td>
                            {result.vars.map((v) => (
                              <td key={v} className={`px-3 py-1.5 text-center border-r border-b border-gray-100 ${row.asgn[v] ? 'text-emerald-600 font-semibold' : 'text-red-600'}`}>
                                {row.asgn[v] ? '1' : '0'}
                              </td>
                            ))}
                            <td className={`px-3 py-1.5 text-center border-b border-l-2 border-gray-200 font-bold ${row.res ? 'text-emerald-600 bg-emerald-50/50' : 'text-red-600 bg-red-50/30'}`}>
                              {row.res ? '1' : '0'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">Click any row to open its evaluation trace below.</p>
                </div>

                {/* ── Step-by-Step Evaluation Trace ─────────────────────── */}
                <div>
                  <button
                    type="button"
                    onClick={() => setTraceOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    {traceOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                    <span className="text-gray-500 text-sm">⟳</span>
                    Step-by-Step Evaluation Trace
                  </button>
                  {traceOpen && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/30 p-4 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="text-xs font-semibold text-gray-600 whitespace-nowrap">Show trace for row:</label>
                        <select
                          value={safeTraceRow}
                          onChange={(e) => setTraceRow(Number(e.target.value))}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-mono focus:ring-2 focus:ring-amber-400 max-w-xs"
                        >
                          {result.rows.map((row, i) => (
                            <option key={i} value={i}>
                              {i}: {result.vars.map((v) => `${v}=${row.asgn[v] ? 1 : 0}`).join(', ')} → {row.res ? '1' : '0'}
                            </option>
                          ))}
                        </select>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${result.rows[safeTraceRow]?.res ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
                          Output = {result.rows[safeTraceRow]?.res ? '1 (TRUE)' : '0 (FALSE)'}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Expression: <span className="font-mono normal-case text-gray-600">{result.expr}</span>
                      </div>
                      <div className="rounded-lg bg-white border border-gray-100 p-3 overflow-x-auto">
                        <ul className="space-y-0.5">
                          <TraceTree node={buildTrace(result.ast, result.rows[safeTraceRow]!.asgn)} />
                        </ul>
                      </div>
                      <p className="text-[10px] text-gray-400">
                        <span className="text-emerald-600 font-bold">✓</span> = sub-expression is TRUE &nbsp;·&nbsp;
                        <span className="text-red-500 font-bold">✗</span> = FALSE. Tree evaluates innermost sub-expressions first.
                      </p>
                    </div>
                  )}
                </div>

                {/* SOP / POS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Minterms Σm — Sum of Products (SOP)</div>
                      <button type="button" onClick={copySOP} disabled={!sop} className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-30"><Copy className="w-2.5 h-2.5" />Copy</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {result.minterms.length ? result.minterms.map((m) => (
                        <span key={m} className="rounded-lg bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-mono">m{m}</span>
                      )) : <span className="text-gray-400 text-xs">∅</span>}
                    </div>
                    <div className="text-sm font-mono">
                      {sop?.type === '0' && <span className="text-red-600">0</span>}
                      {sop?.type === '1' && <span className="text-emerald-600">1</span>}
                      {sop?.type === 'terms' && sop.terms?.map((term, i) => (
                        <span key={i}>
                          {i > 0 && <span className="text-amber-600 font-bold mx-1">+</span>}
                          {term.map((lit, j) => (
                            <span key={j}>
                              {j > 0 && <span className="text-amber-600 font-bold">·</span>}
                              <span className={lit.negated ? 'text-violet-600' : 'text-sky-600'}>{lit.negated ? '¬' : ''}{lit.literal}</span>
                            </span>
                          ))}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Maxterms ΠM — Product of Sums (POS)</div>
                      <button type="button" onClick={copyPOS} disabled={!pos} className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-30"><Copy className="w-2.5 h-2.5" />Copy</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {result.maxterms.length ? result.maxterms.map((m) => (
                        <span key={m} className="rounded-lg bg-red-100 text-red-800 px-2 py-0.5 text-xs font-mono">M{m}</span>
                      )) : <span className="text-gray-400 text-xs">∅</span>}
                    </div>
                    <div className="text-sm font-mono">
                      {pos?.type === '0' && <span className="text-red-600">0</span>}
                      {pos?.type === '1' && <span className="text-emerald-600">1</span>}
                      {pos?.type === 'terms' && pos.terms?.map((term, i) => (
                        <span key={i}>
                          {i > 0 && <span className="text-amber-600 font-bold mx-1">·</span>}
                          <span className="text-gray-600">(</span>
                          {term.map((lit, j) => (
                            <span key={j}>
                              {j > 0 && <span className="text-amber-600 font-bold">+</span>}
                              <span className={lit.negated ? 'text-violet-600' : 'text-sky-600'}>{lit.negated ? '¬' : ''}{lit.literal}</span>
                            </span>
                          ))}
                          <span className="text-gray-600">)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Simplified Expression (Quine-McCluskey) ──────────────── */}
                {qmResult && (
                  <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-4 rounded bg-violet-500" />
                      <span className="text-sm font-bold text-gray-900">Simplified Expression</span>
                      <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wider bg-violet-100 rounded-full px-2 py-0.5">Quine-McCluskey</span>
                    </div>

                    <div className="rounded-xl bg-white border border-violet-100 px-4 py-3">
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Minimal SOP</div>
                      <div className="font-mono text-base font-bold">
                        {qmResult.type === 'zero' && <span className="text-red-600">0</span>}
                        {qmResult.type === 'one' && <span className="text-emerald-600">1</span>}
                        {qmResult.type === 'terms' && (
                          qmResult.pis.length === 0
                            ? <span className="text-red-600">0</span>
                            : qmResult.pis.map((pi, i) => (
                                <span key={i}>
                                  {i > 0 && <span className="text-amber-600 mx-1.5">+</span>}
                                  <span style={{ color: result.vars.length <= 4 ? PI_COLORS[i % PI_COLORS.length] : '#7c3aed' }}>
                                    {pi.term}
                                  </span>
                                </span>
                              ))
                        )}
                      </div>
                    </div>

                    {qmResult.type === 'terms' && qmResult.pis.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prime Implicants</div>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                {result.vars.length <= 4 && (
                                  <th className="px-2 py-2 text-center text-gray-500 border-b border-r border-gray-200 w-8">Grp</th>
                                )}
                                <th className="px-3 py-2 text-left text-gray-500 font-semibold border-b border-r border-gray-200">Pattern</th>
                                <th className="px-3 py-2 text-left text-gray-500 font-semibold border-b border-r border-gray-200">Minterms</th>
                                <th className="px-3 py-2 text-left text-gray-500 font-semibold border-b border-gray-200">Term</th>
                              </tr>
                            </thead>
                            <tbody>
                              {qmResult.pis.map((pi, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                  {result.vars.length <= 4 && (
                                    <td className="px-2 py-1.5 border-r border-b border-gray-100 text-center">
                                      <span
                                        style={{
                                          background: PI_COLORS[i % PI_COLORS.length],
                                          width: 14, height: 14,
                                          display: 'inline-block',
                                          borderRadius: 3,
                                          verticalAlign: 'middle',
                                        }}
                                      />
                                    </td>
                                  )}
                                  <td className="px-3 py-1.5 border-r border-b border-gray-100 font-mono tracking-widest">
                                    {pi.pattern.split('').map((ch, k) => (
                                      <span
                                        key={k}
                                        className={
                                          ch === '_' ? 'text-gray-300' :
                                          ch === '1' ? 'text-emerald-600 font-bold' :
                                          'text-red-500 font-bold'
                                        }
                                      >
                                        {ch === '_' ? '─' : ch}
                                      </span>
                                    ))}
                                  </td>
                                  <td className="px-3 py-1.5 border-r border-b border-gray-100 font-mono text-gray-600">
                                    {pi.minterms.join(', ')}
                                  </td>
                                  <td
                                    className="px-3 py-1.5 border-b border-gray-100 font-mono font-semibold"
                                    style={{ color: result.vars.length <= 4 ? PI_COLORS[i % PI_COLORS.length] : '#7c3aed' }}
                                  >
                                    {pi.term}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {result.vars.length <= 4 && (
                          <p className="mt-1 text-[10px] text-gray-400">
                            Group colors match the K-map highlights below. Each color covers one prime implicant&apos;s cells.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* K-map */}
                {kmap && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 rounded bg-primary-500" />
                      Karnaugh map
                      {kmapHighlights && qmResult?.type === 'terms' && qmResult.pis.length > 0 && (
                        <span className="text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-2 py-0.5">
                          Prime implicant groups highlighted
                        </span>
                      )}
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 inline-block">
                      <table className="border-collapse text-sm font-mono">
                        <thead>
                          <tr>
                            <th className="border border-gray-200 bg-gray-100 px-2 py-1 text-gray-500 text-xs" />
                            {kmap.headerRow.map((h, i) => (
                              <th key={i} className="border border-gray-200 bg-gray-100 px-3 py-1 text-sky-700 text-xs">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {kmap.cells.map((row, ri) => (
                            <tr key={ri}>
                              <th className="border border-gray-200 bg-gray-100 px-2 py-1 text-sky-700 text-xs">{kmap.headerCol[ri]}</th>
                              {row.map((cell, ci) => {
                                const hIdx = kmapHighlights?.[ri]?.[ci] ?? null;
                                const hlStyle = hIdx !== null
                                  ? { boxShadow: `inset 0 0 0 3px ${PI_COLORS[hIdx]}` }
                                  : undefined;
                                return (
                                  <td
                                    key={ci}
                                    className={`border border-gray-200 px-3 py-2 text-center font-semibold ${cell ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 text-red-600'}`}
                                    style={hlStyle}
                                  >
                                    {cell}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Code export */}
                <div>
                  <button
                    type="button"
                    onClick={() => setCodeOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-lg py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    {codeOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                    <FileCode className="w-4 h-4 text-gray-500" />
                    Code export
                  </button>
                  {codeOpen && (
                    <div className="mt-3 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {CODE_LANGS.map((l) => (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => setCodeLang(l.id)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${codeLang === l.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          >
                            {l.lbl}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
                          <span className="text-xs font-semibold text-gray-600">{CODE_LANGS.find((l) => l.id === codeLang)?.lbl} · .{CODE_LANGS.find((l) => l.id === codeLang)?.ext}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const code = result ? generateCode(codeLang, result.expr, result.vars, result.ast, result) : '';
                              navigator.clipboard.writeText(code).then(() => { trackCopy('truth_table_generator'); setCopied(codeLang); toast.success('Copied'); setTimeout(() => setCopied(null), 2000); });
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                          >
                            {copied === codeLang ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            Copy
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-gray-800 overflow-x-auto max-h-80">
                          {result ? generateCode(codeLang, result.expr, result.vars, result.ast, result) : ''}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO: educational content */}
        <article className="mt-12 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-200/80 overflow-hidden p-8 md:p-10">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Truth Table?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A truth table is a mathematical table used to determine whether a boolean expression is true or false for all possible combinations of its input variables.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For <em>n</em> variables, a truth table has 2<sup>n</sup> rows. A 2-variable expression has 4 rows, a 3-variable expression has 8 rows, and an 8-variable expression has 256 rows. This tool generates the full table for any expression with up to 8 variables.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Boolean Operators Reference</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>AND (∧)</strong> — true only when both inputs are true</li>
              <li><strong>OR (∨)</strong> — true when at least one input is true</li>
              <li><strong>NOT (¬)</strong> — inverts the value (true → false)</li>
              <li><strong>XOR (⊕)</strong> — true when inputs are different</li>
              <li><strong>NAND</strong> — NOT AND (opposite of AND)</li>
              <li><strong>NOR</strong> — NOT OR (opposite of OR)</li>
              <li><strong>→</strong> — implication (if A then B)</li>
              <li><strong>↔</strong> — biconditional (A if and only if B)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Karnaugh Map?</h2>
            <p className="text-gray-700 leading-relaxed">
              A Karnaugh map (K-Map) is a visual method for simplifying boolean expressions. It arranges truth table rows in a grid where adjacent cells differ by only one variable — allowing you to identify and eliminate redundant terms visually. K-Maps are used in digital circuit design to minimize logic gates. This tool generates the K-Map automatically from your expression.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Minterms and Maxterms?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>minterm</strong> is a product (AND) term where the expression equals 1. A <strong>maxterm</strong> is a sum (OR) term where the expression equals 0.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>SOP (Sum of Products)</strong> is the sum of all minterms. <strong>POS (Product of Sums)</strong> is the product of all maxterms. Both are canonical forms that represent any boolean function completely and unambiguously.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              <div>
                <dt className="font-semibold text-gray-900 mb-2">How do I generate a truth table online?</dt>
                <dd className="text-gray-700 pl-4 border-l-2 border-gray-200">
                  Type or paste your boolean expression using the operator buttons — AND (∧), OR (∨), NOT (¬), XOR (⊕), NAND, NOR — then click Generate. The tool produces the complete truth table for all variable combinations, plus Karnaugh map, minterms, maxterms, and SOP/POS forms.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-2">What is the difference between SOP and POS forms?</dt>
                <dd className="text-gray-700 pl-4 border-l-2 border-gray-200">
                  SOP (Sum of Products) expresses a boolean function as an OR of AND terms — one AND term for each row where the output is 1 (minterms). POS (Product of Sums) expresses it as an AND of OR terms — one OR term for each row where the output is 0 (maxterms). Both are complete canonical representations of the same function.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-2">How do I use a Karnaugh map to simplify a boolean expression?</dt>
                <dd className="text-gray-700 pl-4 border-l-2 border-gray-200">
                  The K-Map groups adjacent cells where the output is 1 into rectangles of size 1, 2, 4, or 8. Each group eliminates one variable. The simplified expression is the OR of all group terms. This tool generates the K-Map automatically from your expression.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-2">What is De Morgan&apos;s law?</dt>
                <dd className="text-gray-700 pl-4 border-l-2 border-gray-200">
                  De Morgan&apos;s laws state that NOT(A AND B) equals (NOT A) OR (NOT B), and NOT(A OR B) equals (NOT A) AND (NOT B). They allow conversion between AND and OR forms and are fundamental to digital circuit design and boolean simplification. Try the &quot;De Morgan&quot; example in the tool to see them in action.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-2">How many variables can this truth table generator handle?</dt>
                <dd className="text-gray-700 pl-4 border-l-2 border-gray-200">
                  Up to 8 variables, producing truth tables with up to 256 rows. Most classroom problems use 2–4 variables (4–16 rows). The tool handles everything from simple 2-variable expressions to complex 8-variable digital logic circuits.
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Other developer and CS tools that pair well with boolean logic and truth tables:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/hash-generator" className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:border-primary-300 hover:bg-primary-50/50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Hash Generator</h3>
                <p className="text-sm text-gray-600">Bitwise and hashing utilities — same AND/OR logic mindset</p>
              </Link>
              <Link href="/uuid-generator" className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:border-primary-300 hover:bg-primary-50/50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">UUID Generator</h3>
                <p className="text-sm text-gray-600">Generate unique identifiers — popular with CS and dev audiences</p>
              </Link>
              <Link href="/jwt-decoder" className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:border-primary-300 hover:bg-primary-50/50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JWT Decoder</h3>
                <p className="text-sm text-gray-600">Decode and inspect JWTs — useful for API and security work</p>
              </Link>
            </div>
          </section>
        </article>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <p className="text-center flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden />
            All parsing and generation runs in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
