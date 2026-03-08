/**
 * Truth Table Engine — Boolean expression parser, evaluator, K-map, code generation.
 * Supports AND, OR, NOT, XOR, NAND, NOR, XNOR, →, ↔. Up to 8 variables.
 */

export type AST =
  | { t: 'c'; v: boolean }
  | { t: 'v'; n: string }
  | { t: 'un'; op: string; e: AST }
  | { t: 'bin'; op: string; l: AST; r: AST };

export interface TableRow {
  asgn: Record<string, boolean>;
  res: boolean;
  subR: boolean[];
  idx: number;
}

export interface TruthTableResult {
  expr: string;
  ast: AST;
  vars: string[];
  rows: TableRow[];
  minterms: number[];
  maxterms: number[];
  trueCount: number;
  numRows: number;
  subs: AST[];
}

const BIN_OPS: Record<string, { pr: number; as: 'L' | 'R' }> = {
  OR: { pr: 2, as: 'L' },
  AND: { pr: 3, as: 'L' },
  XOR: { pr: 2, as: 'L' },
  NAND: { pr: 3, as: 'L' },
  NOR: { pr: 2, as: 'L' },
  IMP: { pr: 1, as: 'R' },
  IFF: { pr: 1, as: 'L' },
};

export function tokenize(src: string): { t: string; v?: string; pr?: number; as?: 'L' | 'R' }[] {
  let e = src
    .replace(/\bAND\b/gi, '&&')
    .replace(/\bOR\b/gi, '||')
    .replace(/\bNOT\b/gi, '¬')
    .replace(/\bXOR\b/gi, '⊕')
    .replace(/\bNAND\b/gi, '↑')
    .replace(/\bNOR\b/gi, '↓')
    .replace(/\bXNOR\b/gi, '↔')
    .replace(/\bIFF\b/gi, '↔')
    .replace(/\bIMPLIES\b/gi, '→')
    .replace(/\bT\b/gi, '⊤')
    .replace(/\bF\b/gi, '⊥')
    .replace(/!(?!=)/g, '¬')
    .replace(/∧/g, '&&')
    .replace(/∨/g, '||')
    .replace(/¬+/g, '¬')
    .replace(/~+/g, '¬');

  const toks: { t: string; v?: string; pr?: number; as?: 'L' | 'R' }[] = [];
  let i = 0;
  while (i < e.length) {
    if (/\s/.test(e[i]!)) {
      i++;
      continue;
    }
    if (e[i] === '(' || e[i] === ')') {
      toks.push({ t: 'p', v: e[i]! });
      i++;
      continue;
    }
    if (e.slice(i, i + 2) === '&&') {
      toks.push({ t: 'b', v: 'AND', ...BIN_OPS.AND });
      i += 2;
      continue;
    }
    if (e.slice(i, i + 2) === '||') {
      toks.push({ t: 'b', v: 'OR', ...BIN_OPS.OR });
      i += 2;
      continue;
    }
    if (e[i] === '¬') {
      toks.push({ t: 'u', v: 'NOT' });
      i++;
      continue;
    }
    if (e[i] === '⊕') {
      toks.push({ t: 'b', v: 'XOR', ...BIN_OPS.XOR });
      i++;
      continue;
    }
    if (e[i] === '↑') {
      toks.push({ t: 'b', v: 'NAND', ...BIN_OPS.NAND });
      i++;
      continue;
    }
    if (e[i] === '↓') {
      toks.push({ t: 'b', v: 'NOR', ...BIN_OPS.NOR });
      i++;
      continue;
    }
    if (e[i] === '→') {
      toks.push({ t: 'b', v: 'IMP', ...BIN_OPS.IMP });
      i++;
      continue;
    }
    if (e[i] === '↔') {
      toks.push({ t: 'b', v: 'IFF', ...BIN_OPS.IFF });
      i++;
      continue;
    }
    if (e[i] === '⊤' || e[i] === '1') {
      toks.push({ t: 'c', v: 'true' });
      i++;
      continue;
    }
    if (e[i] === '⊥' || e[i] === '0') {
      toks.push({ t: 'c', v: 'false' });
      i++;
      continue;
    }
    if (/[A-Za-z_]/.test(e[i]!)) {
      let nm = '';
      while (i < e.length && /[A-Za-z0-9_']/.test(e[i]!)) nm += e[i++];
      toks.push({ t: 'v', v: nm });
      continue;
    }
    throw new Error(`Unknown character "${e[i]}" at position ${i}`);
  }
  return toks;
}

export function parse(toks: { t: string; v?: string; pr?: number; as?: 'L' | 'R' }[]): AST {
  let pos = 0;
  const peek = () => toks[pos];
  const eat = () => toks[pos++];

  function expr(minP: number): AST {
    let left = unary();
    for (;;) {
      const t = peek();
      if (!t || t.t !== 'b') break;
      const pr = t.pr ?? 0;
      if (pr <= minP) break;
      eat();
      const nextP = t.as === 'L' ? pr : pr - 1;
      const right = expr(nextP);
      left = { t: 'bin', op: t.v!, l: left, r: right };
    }
    return left;
  }

  function unary(): AST {
    const t = peek();
    if (t?.t === 'u') {
      eat();
      return { t: 'un', op: t.v!, e: unary() };
    }
    return primary();
  }

  function primary(): AST {
    const t = peek();
    if (!t) throw new Error('Unexpected end of expression');
    if (t.t === 'c') {
      eat();
      return { t: 'c', v: t.v === 'true' };
    }
    if (t.t === 'v') {
      eat();
      return { t: 'v', n: t.v! };
    }
    if (t.t === 'p' && t.v === '(') {
      eat();
      const e = expr(0);
      const cl = eat();
      if (!cl || cl.v !== ')') throw new Error('Missing closing parenthesis');
      return e;
    }
    throw new Error(`Unexpected token: ${t.v ?? t.t}`);
  }

  const ast = expr(0);
  if (pos < toks.length) throw new Error(`Unexpected token after expression: ${toks[pos]?.v}`);
  return ast;
}

export function evalAST(node: AST, vars: Record<string, boolean>): boolean {
  if (node.t === 'c') return node.v;
  if (node.t === 'v') return vars[node.n] ?? false;
  if (node.t === 'un') {
    const v = evalAST(node.e, vars);
    if (node.op === 'NOT') return !v;
  }
  if (node.t === 'bin') {
    const l = evalAST(node.l, vars);
    const r = evalAST(node.r, vars);
    switch (node.op) {
      case 'AND': return l && r;
      case 'OR': return l || r;
      case 'XOR': return l !== r;
      case 'NAND': return !(l && r);
      case 'NOR': return !(l || r);
      case 'IMP': return !l || r;
      case 'IFF': return l === r;
    }
  }
  throw new Error('Unknown AST node');
}

export function getVars(node: AST, seen = new Set<string>(), ord: string[] = []): string[] {
  if (node.t === 'v' && !seen.has(node.n)) {
    seen.add(node.n);
    ord.push(node.n);
  }
  if ('l' in node && node.l) getVars(node.l, seen, ord);
  if ('r' in node && node.r) getVars(node.r, seen, ord);
  if ('e' in node && node.e) getVars(node.e, seen, ord);
  return ord;
}

export function astStr(node: AST): string {
  if (node.t === 'v') return node.n;
  if (node.t === 'c') return node.v ? 'T' : 'F';
  if (node.t === 'un') return `¬(${astStr(node.e)})`;
  const OP: Record<string, string> = { AND: '∧', OR: '∨', XOR: '⊕', NAND: '↑', NOR: '↓', IMP: '→', IFF: '↔' };
  return `(${astStr(node.l)} ${OP[node.op] ?? node.op} ${astStr(node.r)})`;
}

export function getSubExprs(node: AST, res: AST[] = [], seen = new Set<string>()): AST[] {
  if (node.t === 'bin' || node.t === 'un') {
    const k = astStr(node);
    if (!seen.has(k)) {
      seen.add(k);
      res.push(node);
    }
    if (node.t === 'bin') {
      getSubExprs(node.l, res, seen);
      getSubExprs(node.r, res, seen);
    } else getSubExprs(node.e, res, seen);
  }
  return res;
}

export function generateTable(expr: string): TruthTableResult {
  const toks = tokenize(expr);
  const ast = parse(toks);
  const vars = getVars(ast);
  if (vars.length > 8) {
    throw new Error(`Max 8 variables (${vars.length} found → ${2 ** vars.length} rows). Simplify.`);
  }
  const N = vars.length;
  const numRows = N > 0 ? 1 << N : 1;
  const subs = getSubExprs(ast).slice(1);
  const rows: TableRow[] = [];
  const minterms: number[] = [];
  const maxterms: number[] = [];

  for (let i = 0; i < numRows; i++) {
    const asgn: Record<string, boolean> = {};
    vars.forEach((v, vi) => {
      asgn[v] = !!(i >> (N - 1 - vi) & 1);
    });
    const res = evalAST(ast, asgn);
    const subR = subs.map((s) => evalAST(s, asgn));
    rows.push({ asgn, res, subR, idx: i });
    if (res) minterms.push(i);
    else maxterms.push(i);
  }

  return {
    expr,
    ast,
    vars,
    rows,
    minterms,
    maxterms,
    trueCount: minterms.length,
    numRows,
    subs,
  };
}

export function getSOPTerms(vars: string[], minterms: number[], numRows: number): { type: '0' | '1' | 'terms'; terms?: { literal: string; negated: boolean }[][] } {
  if (!minterms.length) return { type: '0' };
  if (minterms.length === numRows) return { type: '1' };
  const N = vars.length;
  const terms = minterms.map((m) => {
    const bits = vars.map((_, vi) => !!(m >> (N - 1 - vi) & 1));
    return bits.map((b, i) => ({ literal: vars[i]!, negated: !b }));
  });
  return { type: 'terms', terms };
}

export function getPOSTerms(vars: string[], maxterms: number[], numRows: number): { type: '0' | '1' | 'terms'; terms?: { literal: string; negated: boolean }[][] } {
  if (!maxterms.length) return { type: '1' };
  if (maxterms.length === numRows) return { type: '0' };
  const N = vars.length;
  const terms = maxterms.map((m) => {
    const bits = vars.map((_, vi) => !!(m >> (N - 1 - vi) & 1));
    return bits.map((b, i) => ({ literal: vars[i]!, negated: b }));
  });
  return { type: 'terms', terms };
}

const GRAY_2 = [0, 1, 3, 2];

export function getKMapGrid(vars: string[], rows: TableRow[]): { headerRow: number[]; headerCol: number[]; cells: number[][] } | null {
  const N = vars.length;
  if (N < 2 || N > 4) return null;
  const getVal = (...bits: number[]) => rows[parseInt(bits.join(''), 2)]?.res ? 1 : 0;

  if (N === 2) {
    return {
      headerRow: [0, 1],
      headerCol: [0, 1],
      cells: [
        [getVal(0, 0), getVal(0, 1)],
        [getVal(1, 0), getVal(1, 1)],
      ],
    };
  }
  if (N === 3) {
    return {
      headerRow: GRAY_2,
      headerCol: [0, 1],
      cells: [
        GRAY_2.map((g) => getVal(0, g >> 1, g & 1)),
        GRAY_2.map((g) => getVal(1, g >> 1, g & 1)),
      ],
    };
  }
  return {
    headerRow: GRAY_2,
    headerCol: GRAY_2,
    cells: GRAY_2.map((row) => {
      const a = row >> 1;
      const b = row & 1;
      return GRAY_2.map((col) => {
        const c = col >> 1;
        const d = col & 1;
        return getVal(a, b, c, d);
      });
    }),
  };
}

export function astToLang(node: AST, lang: string): string {
  const py = lang === 'py';
  const notOp = py ? 'not ' : '!';
  const andOp = py ? ' and ' : ' && ';
  const orOp = py ? ' or ' : ' || ';
  const trueVal = py ? 'True' : 'true';
  const falseVal = py ? 'False' : 'false';

  function n2s(nd: AST): string {
    if (nd.t === 'c') return nd.v ? trueVal : falseVal;
    if (nd.t === 'v') return nd.n.toLowerCase();
    if (nd.t === 'un') return py ? `(not ${n2s(nd.e)})` : `(!${n2s(nd.e)})`;
    if (nd.t === 'bin') {
      const l = n2s(nd.l);
      const r = n2s(nd.r);
      switch (nd.op) {
        case 'AND': return py ? `(${l} and ${r})` : `(${l} && ${r})`;
        case 'OR': return py ? `(${l} or ${r})` : `(${l} || ${r})`;
        case 'XOR': return `(${l} != ${r})`;
        case 'NAND': return py ? `(not (${l} and ${r}))` : `(!(${l} && ${r}))`;
        case 'NOR': return py ? `(not (${l} or ${r}))` : `(!(${l} || ${r}))`;
        case 'IMP': return py ? `((not ${l}) or ${r})` : `((!${l}) || ${r})`;
        case 'IFF': return `(${l} == ${r})`;
      }
    }
    return '';
  }
  return n2s(node);
}

export const OPERATORS = [
  { lbl: 'AND', ins: ' AND ' },
  { lbl: 'OR', ins: ' OR ' },
  { lbl: 'NOT', ins: 'NOT ' },
  { lbl: 'XOR', ins: ' XOR ' },
  { lbl: 'NAND', ins: ' NAND ' },
  { lbl: 'NOR', ins: ' NOR ' },
  { lbl: '→', ins: ' → ' },
  { lbl: '↔', ins: ' ↔ ' },
  { lbl: '( )', ins: '()' },
  { lbl: 'T', ins: 'T' },
  { lbl: 'F', ins: 'F' },
];

export const EXAMPLES = [
  { lbl: 'A∧B', e: 'A AND B' },
  { lbl: 'A∨¬B', e: 'A OR NOT B' },
  { lbl: 'A→B', e: 'A → B' },
  { lbl: 'A⊕B', e: 'A XOR B' },
  { lbl: 'De Morgan', e: 'NOT(A AND B) ↔ (NOT A OR NOT B)' },
  { lbl: 'Majority', e: '(A AND B) OR (B AND C) OR (A AND C)' },
  { lbl: '4-var', e: '(A AND B) OR (C AND D)' },
];

export const CODE_LANGS = [
  { id: 'js', lbl: 'JavaScript', ext: 'js' },
  { id: 'py', lbl: 'Python', ext: 'py' },
  { id: 'java', lbl: 'Java', ext: 'java' },
  { id: 'go', lbl: 'Go', ext: 'go' },
];

export function generateCode(lang: string, expr: string, vars: string[], ast: AST, result: TruthTableResult): string {
  const cond = astToLang(ast, lang === 'py' ? 'py' : 'js');
  const params = vars.map((v) => v.toLowerCase());
  const N = vars.length;

  switch (lang) {
    case 'js':
      return `/** Truth Table: ${expr} | Variables: ${vars.join(', ')} */
function evaluate(${params.join(', ')}) {
  return ${cond};
}

function truthTable() {
  const n = ${N};
  const rows = [];
  for (let i = 0; i < (1 << n); i++) {
    const assignment = {};
    ${JSON.stringify(vars)}.forEach((v, vi) => {
      assignment[v] = !!((i >> (n - 1 - vi)) & 1);
    });
    rows.push({ ...assignment, result: evaluate(${vars.map((v) => `assignment['${v}']`).join(', ')}) });
  }
  return rows;
}

const table = truthTable();
console.log([...${JSON.stringify(vars)}, 'Result'].join('\\t'));
table.forEach(row => {
  const vals = ${JSON.stringify(vars)}.map(v => row[v] ? '1' : '0');
  console.log([...vals, row.result ? '1' : '0'].join('\\t'));
});
console.log('Minterms:', table.map((r, i) => r.result ? i : -1).filter(i => i >= 0));`;

    case 'py':
      return `# Truth Table: ${expr} | Variables: ${vars.join(', ')}
from itertools import product

def evaluate(${params.map((p) => `${p}: bool`).join(', ')}) -> bool:
    return ${astToLang(ast, 'py')}

def truth_table():
    variables = [${vars.map((v) => `'${v}'`).join(', ')}]
    table = []
    for combo in product([False, True], repeat=len(variables)):
        row = dict(zip(variables, combo))
        row['Result'] = evaluate(*combo)
        table.append(row)
    return table

if __name__ == '__main__':
    table = truth_table()
    print('\\t'.join([${vars.map((v) => `'${v}'`).join(', ')}, 'Result']))
    for row in table:
        vals = ['1' if row[v] else '0' for v in variables]
        print('\\t'.join(vals + ['1' if row['Result'] else '0']))
    minterms = [i for i, r in enumerate(table) if r['Result']]
    print(f"Minterms: {minterms}")`;

    case 'java':
      return `// Truth Table: ${expr} | Variables: ${vars.join(', ')}
public class TruthTable {
    public static boolean evaluate(${params.map((p) => `boolean ${p}`).join(', ')}) {
        return ${cond};
    }
    public static void main(String[] args) {
        String[] vars = { ${vars.map((v) => `"${v}"`).join(', ')} };
        int n = vars.length, numRows = 1 << n;
        for (int i = 0; i < numRows; i++) {
            boolean[] v = new boolean[n];
            for (int k = 0; k < n; k++) v[k] = ((i >> (n - 1 - k)) & 1) == 1;
            boolean res = evaluate(${params.map((_, i) => `v[${i}]`).join(', ')});
            for (boolean b : v) System.out.print(b ? "1" : "0");
            System.out.println(res ? "1" : "0");
        }
    }
}`;

    case 'go':
      return `// Truth Table: ${expr} | Variables: ${vars.join(', ')}
package main

import "fmt"

func Evaluate(${params.map((p) => `${p} bool`).join(', ')}) bool {
\treturn ${cond}
}

func main() {
\tvars := []string{${vars.map((v) => `"${v}"`).join(', ')}}
\tn := len(vars)
\tfor i := 0; i < (1 << n); i++ {
\t\tv := make([]bool, n)
\t\tfor k := 0; k < n; k++ { v[k] = (i>>(n-1-k))&1 == 1 }
\t\tres := Evaluate(${params.map((_, i) => `v[${i}]`).join(', ')})
\t\tfor _, b := range v { if b { fmt.Print("1") } else { fmt.Print("0") } }
\t\tif res { fmt.Println("1") } else { fmt.Println("0") }
\t}
}`;

    default:
      return `// ${expr}`;
  }
}
