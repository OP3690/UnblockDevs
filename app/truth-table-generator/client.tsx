'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Play,
  Shield,
  Lock,
  ChevronDown,
  FileCode,
  Download,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy } from '@/lib/analytics';
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
} from '@/lib/truthTableEngine';

const HISTORY_KEY = 'truth-table-history';
const HISTORY_MAX = 8;

export default function TruthTableGeneratorClient() {
  const [expr, setExpr] = useState('(A AND B) OR NOT C');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof generateTable> | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [codeLang, setCodeLang] = useState('js');
  const [codeOpen, setCodeOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (!trimmed) {
      setError('Enter a boolean expression.');
      return;
    }
    try {
      const res = generateTable(trimmed);
      setResult(res);
      setHistory((prev) => [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, HISTORY_MAX));
      try {
        const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
        const next = [trimmed, ...(Array.isArray(stored) ? stored : []).filter((x: string) => x !== trimmed)].slice(0, HISTORY_MAX);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      toast.success('Truth table generated');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      toast.error('Invalid expression');
    }
  }, [expr]);

  const loadExample = (exampleExpr: string) => {
    setExpr(exampleExpr);
    setError(null);
    setResult(null);
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
    navigator.clipboard.writeText(hdr + '\n' + body).then(() => {
      trackCopy('truth_table_generator');
      toast.success('Table copied');
    });
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

  const clearAll = () => {
    setExpr('');
    setError(null);
    setResult(null);
    toast('Cleared');
  };

  const isTaut = result ? result.trueCount === result.numRows : false;
  const isCont = result ? result.trueCount === 0 : false;
  const density = result && result.numRows ? (result.trueCount / result.numRows * 100).toFixed(1) : '0';
  const kmap = result ? getKMapGrid(result.vars, result.rows) : null;
  const sop = result ? getSOPTerms(result.vars, result.minterms, result.numRows) : null;
  const pos = result ? getPOSTerms(result.vars, result.maxterms, result.numRows) : null;

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
              <button type="button" onClick={clearAll} className="rounded-xl px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                Clear
              </button>
            </div>

            {/* Output */}
            {result && (
              <div className="space-y-6 pt-4 border-t border-gray-100">
                {/* Var pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Variables</span>
                  {result.vars.map((v) => (
                    <span key={v} className="rounded-xl bg-sky-50 border border-sky-200 px-2.5 py-1 text-xs font-mono text-sky-800">
                      {v}
                    </span>
                  ))}
                </div>

                {/* Classify */}
                <div>
                  {isTaut && (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                      ⊤ Tautology — always TRUE
                    </div>
                  )}
                  {isCont && (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800">
                      ⊥ Contradiction — always FALSE
                    </div>
                  )}
                  {!isTaut && !isCont && (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
                      ∼ Contingency — depends on inputs
                    </div>
                  )}
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
                          <tr key={ri} className="hover:bg-gray-50/50">
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
                </div>

                {/* SOP / POS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Minterms Σm — Sum of Products (SOP)</div>
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
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Maxterms ΠM — Product of Sums (POS)</div>
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

                {/* K-map */}
                {kmap && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 rounded bg-primary-500" />
                      Karnaugh map
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
                              {row.map((cell, ci) => (
                                <td key={ci} className={`border border-gray-200 px-3 py-2 text-center font-semibold ${cell ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 text-red-600'}`}>
                                  {cell}
                                </td>
                              ))}
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

        {/* SEO: educational content for students and CS audience */}
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
