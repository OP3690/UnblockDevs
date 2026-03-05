/**
 * SQL IN clause generator — parse any input, clean, chunk, multi-DB and multi-format output.
 */

export type DbFlavor = 'mysql' | 'postgresql' | 'sqlserver' | 'oracle' | 'sqlite';
export type OutputFormatType = 'sql_in' | 'json' | 'csv' | 'graphql' | 'mongodb';
export type ValueMode = 'numeric' | 'string';

const INVALID_ID_REGEX = /[^\w\-.,@:\s]/g;

/** Parse input from CSV, JSON array, newline, tab, or mixed. Returns raw string values. */
export function parseInput(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  // Try JSON array first
  const jsonMatch = trimmed.match(/^\s*\[[\s\S]*\]\s*$/);
  if (jsonMatch) {
    try {
      const arr = JSON.parse(trimmed) as unknown;
      if (Array.isArray(arr)) return arr.map((x) => String(x).trim()).filter(Boolean);
    } catch {
      // fall through to generic split
    }
  }

  // Split by newlines, tabs, commas, semicolons, pipes; trim and filter empty
  const values = trimmed
    .split(/[\n\t,;|]+/)
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
  return values;
}

/** Remove duplicates, trim, strip invalid characters. */
export function cleanIds(values: string[], removeInvalidChars: boolean = true): string[] {
  const seen = new Set<string>();
  return values
    .map((v) => (removeInvalidChars ? v.replace(INVALID_ID_REGEX, '') : v).trim())
    .filter((v) => v.length > 0)
    .filter((v) => {
      if (seen.has(v)) return false;
      seen.add(v);
      return true;
    });
}

/** Detect if values look numeric (for unquoted SQL). */
export function areNumeric(values: string[]): boolean {
  return values.length > 0 && values.every((v) => /^-?\d+(\.\d+)?$/.test(v));
}

/** Chunk array into groups of size. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Format a single value for SQL (quoted or numeric). */
function fmtVal(v: string, mode: ValueMode, quote: "'" | '"'): string {
  if (mode === 'numeric' && /^-?\d+(\.\d+)?$/.test(v)) return v;
  const q = quote === "'" ? "''" : '"';
  return `${quote}${String(v).replace(quote === "'" ? /'/g : /"/g, q)}${quote}`;
}

/** Build IN list string (values only, no "IN ()"). */
function inList(values: string[], mode: ValueMode, quote: "'" | '"'): string {
  return values.map((v) => fmtVal(v, mode, quote)).join(',');
}

/** Parameter placeholders by DB. */
function paramPlaceholders(db: DbFlavor, count: number): string[] {
  switch (db) {
    case 'mysql':
    case 'sqlite':
      return Array.from({ length: count }, (_, i) => '?');
    case 'postgresql':
      return Array.from({ length: count }, (_, i) => `$${i + 1}`);
    case 'sqlserver':
      return Array.from({ length: count }, (_, i) => `@p${i + 1}`);
    case 'oracle':
      return Array.from({ length: count }, (_, i) => `:p${i + 1}`);
    default:
      return Array.from({ length: count }, () => '?');
  }
}

/** SQL IN clause for a given DB (no chunking). */
export function sqlInForDb(
  values: string[],
  db: DbFlavor,
  options: { valueMode: ValueMode; quote: "'" | '"'; parameterized: boolean }
): string {
  const { valueMode, quote, parameterized } = options;
  if (parameterized) {
    const placeholders = paramPlaceholders(db, values.length);
    return `IN (${placeholders.join(', ')})`;
  }
  switch (db) {
    case 'postgresql':
      return `= ANY(ARRAY[${inList(values, valueMode, quote)}])`;
    case 'mysql':
    case 'sqlserver':
    case 'oracle':
    case 'sqlite':
    default:
      return `IN (${inList(values, valueMode, quote)})`;
  }
}

/** Full WHERE clause with optional chunking (OR blocks). */
export function whereInChunked(
  values: string[],
  db: DbFlavor,
  options: {
    valueMode: ValueMode;
    quote: "'" | '"';
    parameterized: boolean;
    chunkSize: number;
    columnName: string;
  }
): string {
  const { chunkSize, columnName, ...opts } = options;
  if (chunkSize <= 0 || values.length <= chunkSize) {
    const inClause = sqlInForDb(values, db, opts);
    return `WHERE ${columnName} ${inClause}`;
  }
  const chunks = chunk(values, chunkSize);
  const parts = chunks.map((c) => {
    const inClause = sqlInForDb(c, db, opts);
    return `${columnName} ${inClause}`;
  });
  return `WHERE ${parts.join('\nOR ')}`;
}

/** Range compression: detect consecutive runs and use BETWEEN. */
export function rangeCompress(values: string[]): { type: 'between'; start: string; end: string }[] | null {
  const nums = values
    .map((v) => (/-?\d+/.test(v) ? parseInt(v, 10) : NaN))
    .filter((n) => !Number.isNaN(n));
  if (nums.length !== values.length) return null;
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const runs: { start: number; end: number }[] = [];
  let start = sorted[0],
    end = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) end = sorted[i];
    else {
      runs.push({ start, end });
      start = end = sorted[i];
    }
  }
  runs.push({ start, end });
  return runs.map((r) => ({ type: 'between' as const, start: String(r.start), end: String(r.end) }));
}

/** Hybrid: BETWEEN for runs of 3+, IN for rest. */
export function hybridWhere(
  values: string[],
  db: DbFlavor,
  options: { valueMode: ValueMode; quote: "'" | '"'; parameterized: boolean; columnName: string }
): string {
  const runs = rangeCompress(values);
  if (!runs) return whereInChunked(values, db, { ...options, chunkSize: 0 });
  const betweenParts: string[] = [];
  const inValues: string[] = [];
  for (const r of runs) {
    const len = Number(r.end) - Number(r.start) + 1;
    if (len >= 3) betweenParts.push(`${options.columnName} BETWEEN ${r.start} AND ${r.end}`);
    else for (let i = Number(r.start); i <= Number(r.end); i++) inValues.push(String(i));
  }
  const parts = [...betweenParts];
  if (inValues.length > 0) {
    const inClause = sqlInForDb(inValues, db, options);
    parts.push(`${options.columnName} ${inClause}`);
  }
  return parts.length ? `WHERE ${parts.join('\nOR ')}` : '';
}

/** SQL INSERT generator. */
export function sqlInsertValues(
  values: string[],
  options: { valueMode: ValueMode; quote: "'" | '"'; tableName: string; columnName: string }
): string {
  const { valueMode, quote, tableName, columnName } = options;
  const rows = values.map((v) => {
    const val = valueMode === 'numeric' && /^-?\d+(\.\d+)?$/.test(v) ? v : `'${String(v).replace(/'/g, "''")}'`;
    return `(${val})`;
  });
  return `INSERT INTO ${tableName} (${columnName})\nVALUES\n${rows.join(',\n')};`;
}

/** Output by format type (no DB-specific; for JSON/CSV/GraphQL/MongoDB). */
export function formatOutput(
  values: string[],
  format: OutputFormatType,
  options: { valueMode: ValueMode; quote: "'" | '"' }
): string {
  const { valueMode, quote } = options;
  const fmt = (v: string) =>
    valueMode === 'numeric' && /^-?\d+(\.\d+)?$/.test(v) ? v : `${quote}${v}${quote}`;
  switch (format) {
    case 'json':
      return JSON.stringify(values.map((v) => (valueMode === 'numeric' && /^-?\d+\.?\d*$/.test(v) ? Number(v) : v)));
    case 'csv':
      return values.map((v) => (valueMode === 'string' ? `"${String(v).replace(/"/g, '""')}"` : v)).join(',');
    case 'graphql':
      return JSON.stringify(values.map((v) => (valueMode === 'numeric' && /^-?\d+\.?\d*$/.test(v) ? Number(v) : v)));
    case 'mongodb':
      return `{ $in: [${values.map((v) => (valueMode === 'numeric' && /^-?\d+\.?\d*$/.test(v) ? v : JSON.stringify(v))).join(', ')}] }`;
    case 'sql_in':
    default:
      return `(${values.map((v) => fmtVal(v, valueMode, quote)).join(',')})`;
  }
}

/** Build full SQL statement for preview (MySQL-style SELECT). */
export function previewSelect(
  values: string[],
  db: DbFlavor,
  options: {
    valueMode: ValueMode;
    quote: "'" | '"';
    parameterized: boolean;
    chunkSize: number;
    columnName: string;
    useRangeCompression: boolean;
  }
): string {
  const col = options.columnName || 'id';
  if (options.useRangeCompression && values.length > 0) {
    const hybrid = hybridWhere(values, db, { ...options, columnName: col });
    return `SELECT * FROM table_name ${hybrid};`;
  }
  const where = whereInChunked(values, db, { ...options, columnName: col });
  return `SELECT * FROM table_name ${where};`;
}
