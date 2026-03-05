/**
 * Log Explorer – parse, detect format, filter, search, error analysis, export.
 * 100% client-side log analysis workbench.
 */

export interface LogEntry {
  level?: string;
  message?: string;
  timestamp?: string;
  raw?: string;
  [key: string]: unknown;
}

export interface LogFormatDetection {
  format: 'json' | 'text';
  pattern?: string;
  fields: string[];
}

export interface TimelineCounts {
  ERROR: number;
  WARN: number;
  INFO: number;
  DEBUG: number;
  OTHER: number;
}

export interface TopError {
  message: string;
  fingerprint: string;
  count: number;
}

export interface ExtractedField {
  name: string;
  value: string;
  count: number;
}

export interface JwtInLog {
  raw: string;
  decoded: { header: unknown; payload: unknown };
  exp?: number;
}

export interface RequestFlow {
  requestId: string;
  entries: LogEntry[];
}

export interface RepeatedPattern {
  pattern: string;
  count: number;
}

export interface LatencyStats {
  field: string;
  avg: number;
  max: number;
  min: number;
  count: number;
}

export interface LogSummary {
  total: number;
  errors: number;
  warnings: number;
  mostCommonError: string | null;
  slowestRequestMs: number | null;
}

const LEVEL_KEYS = ['level', 'severity', 'lvl', 'log_level', 'logLevel'];
const MESSAGE_KEYS = ['message', 'msg', 'text', 'log'];
const TIMESTAMP_KEYS = ['timestamp', 'time', '@timestamp', 'ts', 'date'];

function getLevel(entry: LogEntry): string {
  for (const k of LEVEL_KEYS) {
    const v = entry[k];
    if (typeof v === 'string') return v.toUpperCase();
  }
  const raw = (entry.raw || entry.message || '') as string;
  const m = raw.match(/\b(ERROR|WARN|INFO|DEBUG|TRACE|error|warn|info|debug|trace)\b/i);
  return m ? m[1].toUpperCase() : 'OTHER';
}

function getMessage(entry: LogEntry): string {
  for (const k of MESSAGE_KEYS) {
    const v = entry[k];
    if (typeof v === 'string') return v;
  }
  return (entry.raw as string) || (entry.message as string) || '';
}

/** Parse log text into entries (JSON per line or text with extracted level/timestamp). */
export function parseLogs(text: string): LogEntry[] {
  const lines = text.split('\n').filter((line) => line.trim());
  const entries: LogEntry[] = [];
  let jsonCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>;
      const entry: LogEntry = { ...parsed, raw: line };
      if (!entry.message && typeof parsed.msg === 'string') entry.message = parsed.msg;
      if (!entry.level && typeof parsed.level === 'string') entry.level = parsed.level;
      if (!entry.timestamp && parsed['@timestamp']) entry.timestamp = String(parsed['@timestamp']);
      entries.push(entry);
      jsonCount++;
    } catch {
      const entry: LogEntry = { raw: line, message: line };
      const levelMatch = trimmed.match(/\b(ERROR|WARN|INFO|DEBUG|TRACE)\b/i);
      if (levelMatch) entry.level = levelMatch[1].toUpperCase();
      const tsMatch = trimmed.match(/\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})?/);
      if (tsMatch) entry.timestamp = tsMatch[0];
      const tsEpoch = trimmed.match(/\b(1[0-9]{12})(?:\d{3})?\b/);
      if (tsEpoch) entry.timestamp = tsEpoch[1];
      entries.push(entry);
    }
  }

  return entries;
}

/** Detect log format and list of fields. */
export function detectFormat(entries: LogEntry[]): LogFormatDetection {
  if (!entries.length) return { format: 'text', fields: [] };
  const first = entries[0];
  const keys = Object.keys(first).filter((k) => !['raw'].includes(k));
  const hasStructured = keys.some((k) => LEVEL_KEYS.includes(k) || MESSAGE_KEYS.includes(k) || TIMESTAMP_KEYS.includes(k));
  if (keys.length >= 2 && (hasStructured || typeof first.message === 'string')) {
    const allKeys = new Set<string>();
    entries.slice(0, 100).forEach((e) => Object.keys(e).filter((k) => k !== 'raw').forEach((k) => allKeys.add(k)));
    return { format: 'json', fields: Array.from(allKeys).sort() };
  }
  return {
    format: 'text',
    pattern: '[TIMESTAMP] [LEVEL] [SERVICE] MESSAGE',
    fields: ['level', 'timestamp', 'message'],
  };
}

/** Get timeline counts by level. */
export function getTimelineCounts(entries: LogEntry[]): TimelineCounts {
  const counts: TimelineCounts = { ERROR: 0, WARN: 0, INFO: 0, DEBUG: 0, OTHER: 0 };
  entries.forEach((e) => {
    const level = getLevel(e);
    if (level.includes('ERROR')) counts.ERROR++;
    else if (level.includes('WARN')) counts.WARN++;
    else if (level.includes('INFO')) counts.INFO++;
    else if (level.includes('DEBUG') || level.includes('TRACE')) counts.DEBUG++;
    else counts.OTHER++;
  });
  return counts;
}

/** Apply search query: "level:ERROR", "service:billing", "message:timeout", "level:ERROR AND service:auth", or regex /pattern/. */
export function applySearch(entries: LogEntry[], query: string): LogEntry[] {
  const q = query.trim();
  if (!q) return entries;

  const regexMatch = q.match(/^\/(.+)\/(i?)$/);
  if (regexMatch) {
    const pattern = regexMatch[1];
    const flags = regexMatch[2] || '';
    try {
      const re = new RegExp(pattern, flags);
      return entries.filter((e) => re.test(JSON.stringify(e)) || re.test((e.raw as string) || ''));
    } catch {
      return entries;
    }
  }

  const andParts = q.split(/\s+AND\s+/i).map((p) => p.trim());
  return entries.filter((entry) => {
    const str = JSON.stringify(entry) + ((entry.raw as string) || '');
    return andParts.every((part) => {
      const colon = part.indexOf(':');
      if (colon > 0) {
        const field = part.slice(0, colon).trim().toLowerCase();
        const value = part.slice(colon + 1).trim().toLowerCase();
        const entryVal = (entry[field] ?? entry[field.replace(/_/g, '.')] ?? (entry as Record<string, unknown>)[field]) as string | undefined;
        if (entryVal != null && String(entryVal).toLowerCase().includes(value)) return true;
        return str.toLowerCase().includes(value);
      }
      return str.toLowerCase().includes(part.toLowerCase());
    });
  });
}

/** Filter by level, service, host, request_id, trace_id. */
export function applyFilters(
  entries: LogEntry[],
  filters: {
    level?: string;
    service?: string;
    host?: string;
    requestId?: string;
    traceId?: string;
    errorsOnly?: boolean;
    warningsOnly?: boolean;
    hideDebug?: boolean;
  }
): LogEntry[] {
  return entries.filter((e) => {
    if (filters.errorsOnly && !getLevel(e).includes('ERROR')) return false;
    if (filters.warningsOnly && !getLevel(e).includes('WARN')) return false;
    if (filters.hideDebug && (getLevel(e).includes('DEBUG') || getLevel(e).includes('TRACE'))) return false;
    if (filters.level && filters.level !== 'all' && getLevel(e) !== filters.level) return false;
    if (filters.service) {
      const svc = (e.service ?? e.serviceName ?? e['service.name']) as string | undefined;
      if (!svc || !String(svc).toLowerCase().includes(filters.service.toLowerCase())) return false;
    }
    if (filters.host) {
      const host = (e.host ?? e.hostname ?? e.hostName) as string | undefined;
      if (!host || !String(host).toLowerCase().includes(filters.host.toLowerCase())) return false;
    }
    if (filters.requestId) {
      const rid = (e.request_id ?? e.requestId ?? e['request.id']) as string | undefined;
      if (!rid || !String(rid).includes(filters.requestId)) return false;
    }
    if (filters.traceId) {
      const tid = (e.trace_id ?? e.traceId ?? e['trace.id']) as string | undefined;
      if (!tid || !String(tid).includes(filters.traceId)) return false;
    }
    return true;
  });
}

/** Top errors by normalized message (fingerprint). */
export function getTopErrors(entries: LogEntry[], limit = 10): TopError[] {
  const errorEntries = entries.filter((e) => getLevel(e).includes('ERROR'));
  const fingerprint = (msg: string) =>
    msg
      .replace(/\d+/g, 'N')
      .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, 'UUID')
      .replace(/[A-Za-z0-9_-]{20,}/g, 'ID')
      .slice(0, 200);
  const map = new Map<string, { message: string; count: number }>();
  errorEntries.forEach((e) => {
    const msg = getMessage(e);
    const fp = fingerprint(msg);
    const existing = map.get(fp);
    if (existing) existing.count++;
    else map.set(fp, { message: msg.slice(0, 120), count: 1 });
  });
  return Array.from(map.entries())
    .map(([fp, { message, count }]) => ({ message, fingerprint: fp, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Clean stack trace: remove local paths, usernames. */
export function cleanStackTrace(text: string): string {
  return text
    .replace(/\/Users\/[^/]+/g, '~')
    .replace(/\/home\/[^/]+/g, '~')
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/g, '[EMAIL]')
    .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, '[IP]');
}

/** Extract common IDs from all entries. */
export function extractFields(entries: LogEntry[]): ExtractedField[] {
  const keyAliases: Record<string, string[]> = {
    trace_id: ['trace_id', 'traceId', 'trace.id'],
    request_id: ['request_id', 'requestId', 'request.id'],
    user_id: ['user_id', 'userId', 'user.id'],
    session_id: ['session_id', 'sessionId', 'session.id'],
    order_id: ['order_id', 'orderId', 'order.id'],
    span_id: ['span_id', 'spanId'],
  };
  const counts = new Map<string, Map<string, number>>();
  entries.forEach((e) => {
    for (const [name, keys] of Object.entries(keyAliases)) {
      for (const k of keys) {
        const v = e[k];
        if (v != null && String(v).trim()) {
          const val = String(v).trim();
          if (!counts.has(name)) counts.set(name, new Map());
          const m = counts.get(name)!;
          m.set(val, (m.get(val) || 0) + 1);
        }
      }
    }
  });
  const out: ExtractedField[] = [];
  counts.forEach((valueCounts, name) => {
    Array.from(valueCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([value, count]) => out.push({ name, value, count }));
  });
  return out;
}

function base64UrlDecode(str: string): string {
  let b = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b.length % 4;
  if (pad) b += '===='.slice(0, 4 - pad);
  try {
    return atob(b);
  } catch {
    return '';
  }
}

/** Detect and decode JWTs in log entries. */
export function detectJwtsInLogs(entries: LogEntry[]): JwtInLog[] {
  const jwtRe = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
  const seen = new Set<string>();
  const result: JwtInLog[] = [];
  entries.forEach((e) => {
    const str = JSON.stringify(e) + ((e.raw as string) || '');
    let m: RegExpExecArray | null;
    jwtRe.lastIndex = 0;
    while ((m = jwtRe.exec(str)) !== null) {
      const raw = m[0];
      if (seen.has(raw)) continue;
      seen.add(raw);
      try {
        const parts = raw.split('.');
        const payload = JSON.parse(base64UrlDecode(parts[1]) || '{}') as Record<string, unknown>;
        result.push({
          raw: raw.slice(0, 50) + '...',
          decoded: {
            header: JSON.parse(base64UrlDecode(parts[0]) || '{}'),
            payload,
          },
          exp: payload.exp as number | undefined,
        });
      } catch {
        // skip invalid
      }
    }
  });
  return result.slice(0, 20);
}

/** Epoch ms to UTC string. */
export function epochToUtc(ts: number): string {
  const d = new Date(typeof ts === 'string' ? parseInt(ts, 10) : ts);
  return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

/** Group entries by request_id. */
export function groupByRequestId(entries: LogEntry[]): RequestFlow[] {
  const keyAliases = ['request_id', 'requestId', 'request.id'];
  const map = new Map<string, LogEntry[]>();
  entries.forEach((e) => {
    let id: string | undefined;
    for (const k of keyAliases) {
      const v = e[k];
      if (v != null && String(v).trim()) {
        id = String(v).trim();
        break;
      }
    }
    if (!id) id = '_no_id_';
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(e);
  });
  return Array.from(map.entries())
    .filter(([id]) => id !== '_no_id_')
    .map(([requestId, ent]) => ({ requestId, entries: ent }));
}

/** Detect repeated message patterns. */
export function detectRepeatedPatterns(entries: LogEntry[], minCount = 2): RepeatedPattern[] {
  const norm = (msg: string) =>
    msg
      .replace(/\d+/g, 'N')
      .replace(/[0-9a-f-]{36}/gi, 'UUID')
      .trim()
      .slice(0, 150);
  const map = new Map<string, number>();
  entries.forEach((e) => {
    const msg = getMessage(e);
    const n = norm(msg);
    if (n) map.set(n, (map.get(n) || 0) + 1);
  });
  return Array.from(map.entries())
    .filter(([, count]) => count >= minCount)
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}

/** Latency stats from numeric fields (latency_ms, query_time, duration_ms, etc.). */
export function getLatencyStats(entries: LogEntry[]): LatencyStats[] {
  const candidates = ['latency_ms', 'latency', 'query_time', 'duration_ms', 'duration', 'response_time', 'responseTime', 'time_ms'];
  const result: LatencyStats[] = [];
  candidates.forEach((field) => {
    const values: number[] = [];
    entries.forEach((e) => {
      const v = e[field];
      if (typeof v === 'number' && isFinite(v)) values.push(v);
      else if (typeof v === 'string' && /^\d+(\.\d+)?$/.test(v)) values.push(parseFloat(v));
    });
    if (values.length >= 1) {
      const sum = values.reduce((a, b) => a + b, 0);
      result.push({
        field,
        avg: Math.round((sum / values.length) * 100) / 100,
        max: Math.max(...values),
        min: Math.min(...values),
        count: values.length,
      });
    }
  });
  return result;
}

/** Sanitize log text for AI/share: email, phone, IP, paths, tokens. */
export function sanitizeForAI(text: string): string {
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/g, '[EMAIL]')
    .replace(/\b\+?\d{10,15}\b/g, '[PHONE]')
    .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[IP]')
    .replace(/\/Users\/[^\s'"]+/g, '~/')
    .replace(/\/home\/[^\s'"]+/g, '~/')
    .replace(/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[JWT]')
    .replace(/(?:api[_-]?key|apikey|x-api-key)\s*[:=]\s*['"]?[^\s'"]+/gi, (m) => m.replace(/[^\s=:]+$/, '[API_KEY]'));
}

/** Remove noise: debug logs, health checks, static asset requests. */
export function removeNoise(
  entries: LogEntry[],
  options: { removeDebug?: boolean; removeHealthChecks?: boolean; removeStaticAssets?: boolean }
): LogEntry[] {
  return entries.filter((e) => {
    if (options.removeDebug && (getLevel(e).includes('DEBUG') || getLevel(e).includes('TRACE'))) return false;
    const msg = getMessage(e).toLowerCase();
    if (options.removeHealthChecks && (msg.includes('health') || msg.includes('/health') || msg.includes('ping'))) return false;
    if (options.removeStaticAssets && (msg.includes('.js') || msg.includes('.css') || msg.includes('.ico') || msg.includes('/static/'))) return false;
    return true;
  });
}

/** Generate log summary. */
export function getLogSummary(entries: LogEntry[]): LogSummary {
  const errors = entries.filter((e) => getLevel(e).includes('ERROR'));
  const warnings = entries.filter((e) => getLevel(e).includes('WARN'));
  const topErrors = getTopErrors(entries, 1);
  const latencies = getLatencyStats(entries);
  const slowest = latencies.length ? Math.max(...latencies.map((l) => l.max)) : null;
  return {
    total: entries.length,
    errors: errors.length,
    warnings: warnings.length,
    mostCommonError: topErrors[0]?.message ?? null,
    slowestRequestMs: slowest,
  };
}

/** Export entries as JSON string. */
export function exportAsJson(entries: LogEntry[]): string {
  return JSON.stringify(entries.map((e) => {
    const { raw, ...rest } = e;
    return rest;
  }), null, 2);
}

/** Export entries as CSV (timestamp, level, message + top keys). */
export function exportAsCsv(entries: LogEntry[]): string {
  const keys = new Set<string>(['timestamp', 'level', 'message']);
  entries.forEach((e) => Object.keys(e).filter((k) => k !== 'raw').forEach((k) => keys.add(k)));
  const header = Array.from(keys).join(',');
  const escape = (v: unknown) => {
    const s = String(v ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const rows = entries.map((e) => Array.from(keys).map((k) => escape(e[k])).join(','));
  return [header, ...rows].join('\n');
}
