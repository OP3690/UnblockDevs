'use client';

import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle,
  Download,
  Shield,
  BarChart3,
  Key,
  Link2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  parseLogs,
  detectFormat,
  getTimelineCounts,
  applySearch,
  applyFilters,
  getTopErrors,
  cleanStackTrace,
  extractFields,
  detectJwtsInLogs,
  epochToUtc,
  groupByRequestId,
  detectRepeatedPatterns,
  getLatencyStats,
  removeNoise,
  getLogSummary,
  sanitizeForAI,
  exportAsJson,
  exportAsCsv,
  type LogEntry,
  type TimelineCounts,
} from '@/lib/logExplorer';

function getLevel(entry: LogEntry): string {
  const v = entry.level ?? entry.severity ?? entry.lvl ?? entry.log_level;
  if (typeof v === 'string') return v.toUpperCase();
  const raw = (entry.raw || entry.message || '') as string;
  const m = raw.match(/\b(ERROR|WARN|INFO|DEBUG|TRACE)\b/i);
  return m ? m[1].toUpperCase() : 'OTHER';
}

function getMessage(entry: LogEntry): string {
  const v = entry.message ?? entry.msg ?? entry.text;
  if (typeof v === 'string') return v;
  return (entry.raw as string) || '';
}

const SAMPLE_LOGS = `2026-03-05 23:12:45.678 [main] INFO  o.s.b.c.c.AnnotationConfigServletWebServerApplicationContext - Refreshing ApplicationContext
2026-03-05 23:12:48.901 [main] INFO  o.s.b.w.e.tomcat.TomcatWebServer - Tomcat started on port(s): 8080 (http) with context path ''
2026-03-05 23:12:49.234 [main] INFO  c.e.OrderServiceApplication - Application started successfully in 11.456s

2026-03-05 23:13:22.145 [http-nio-8080-exec-5] INFO  c.e.a.JwtAuthenticationFilter - Attempting JWT auth → token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..., ip=103.21.59.142
2026-03-05 23:13:22.189 [http-nio-8080-exec-5] ERROR c.e.s.JwtTokenValidator - JWT signature verification failed → InvalidSignatureException: Signature does not match
2026-03-05 23:13:22.201 [http-nio-8080-exec-5] WARN  c.e.a.JwtAuthenticationFilter - Invalid token → 401 Unauthorized returned

2026-03-05 23:14:03.567 [http-nio-8080-exec-11] INFO  c.e.c.v2.OrderController - POST /api/v3/orders → user=usr_4839201 (after retry auth), items=4, total=₹22,450
2026-03-05 23:14:03.612 [http-nio-8080-exec-11] DEBUG c.e.r.RedisLockService - Lock acquire failed → key=order:lock:4839201, already held by lk_old_abcdef123
2026-03-05 23:14:03.645 [http-nio-8080-exec-11] WARN  c.e.r.RedisLockService - Retrying lock after 500ms (attempt 1/3)
2026-03-05 23:14:04.189 [http-nio-8080-exec-11] ERROR c.e.r.RedisLockService - Lock acquire still failed after 3 attempts → LockAcquisitionTimeoutException
2026-03-05 23:14:04.201 [http-nio-8080-exec-11] ERROR c.e.c.v2.OrderController - Order creation aborted → 503 Service Unavailable (lock contention), traceId=abc123xyz789

2026-03-05 23:14:55.334 [kafka-consumer-2] ERROR c.e.p.RazorpayWebhookConsumer - Webhook signature verification failed → pay_id=pay_RC999999999, computed=HmacSha256(...), received=HmacSha256(different)
2026-03-05 23:14:55.389 [kafka-consumer-2] WARN  c.e.p.RazorpayWebhookConsumer - Possible replay attack or misconfigured secret → discarding event

2026-03-05 23:15:12.890 [http-nio-8080-exec-19] INFO  c.e.c.v3.CartController - Adding item to cart → sku=PROD-999999, qty=5, user=4839201
2026-03-05 23:15:12.945 [http-nio-8080-exec-19] ERROR c.e.i.InventoryGrpcClient - gRPC call failed → Status.UNAVAILABLE: unable to resolve host inventory-service.internal: NameResolutionError after 10s timeout
2026-03-05 23:15:12.967 [http-nio-8080-exec-19] WARN  c.e.c.v3.CartController - Stock check skipped due to inventory timeout → proceeding with optimistic add
2026-03-05 23:15:13.012 [http-nio-8080-exec-19] INFO  c.e.c.v3.CartController - Item added (optimistic) → cartId=cart_temp_987654

2026-03-05 23:15:45.678 [circuit-breaker-monitor] WARN  c.e.i.InventoryCircuitBreaker - Circuit opened → failures=12/20 (60%), lastError=UNAVAILABLE: inventory-service down
2026-03-05 23:15:45.701 [circuit-breaker-monitor] INFO  c.e.i.InventoryCircuitBreaker - Half-open state entered, next test call in 30s

2026-03-05 23:16:02.123 [task-exec-4] ERROR c.e.s.OrderFulfillmentWorker - Failed to reserve stock for ORD-20260305-999888 → ReservationConflictException: already reserved by ORD-20260305-777666
2026-03-05 23:16:02.189 [task-exec-4] INFO  c.e.s.OrderFulfillmentWorker - Rolling back cart reservation → calling inventory rollback gRPC
2026-03-05 23:16:02.456 [task-exec-4] ERROR c.e.i.InventoryGrpcClient - Rollback failed → DEADLINE_EXCEEDED after 15s
2026-03-05 23:16:02.489 [task-exec-4] ERROR c.e.s.OrderFulfillmentWorker - Compensation failed → order stuck in PARTIALLY_RESERVED state, manual intervention required

2026-03-05 23:16:45.901 [http-nio-8080-exec-28] INFO  c.e.c.v3.PaymentController - Initiating refund → orderId=ORD-20260305-555444, reason=customer_requested, amount=₹8,999
2026-03-05 23:16:46.012 [http-nio-8080-exec-28] ERROR c.e.g.RazorpayRefundClient - Refund creation failed → 400 Bad Request: amount exceeds captured amount
2026-03-05 23:16:46.045 [http-nio-8080-exec-28] WARN  c.e.s.RefundService - Partial refund attempted → only 6,500 available to refund
2026-03-05 23:16:46.089 [http-nio-8080-exec-28] INFO  c.e.g.RazorpayRefundClient - Partial refund succeeded → refund_id=rfnd_RC_partial_12345, amount=650000

2026-03-05 23:17:22.334 [kafka-consumer-5] ERROR c.e.o.OrderPaidEventConsumer - Deserialization failed → Invalid JSON in event payload, offset=145678 → skipping message (dead-letter topic enqueued)
2026-03-05 23:17:22.389 [kafka-consumer-5] WARN  c.e.o.OrderPaidEventConsumer - Message moved to dlq.orders.paid.v1-invalid

2026-03-05 23:18:01.567 [http-nio-8080-exec-37] INFO  c.e.c.v3.ProfileController - GET /api/v3/profile/4839201 → starting
2026-03-05 23:18:01.612 [http-nio-8080-exec-37] ERROR c.e.d.UserProfileRepository - Database query timeout → SELECT * FROM user_profiles WHERE user_id = 4839201 (query took > 30s)
2026-03-05 23:18:01.645 [http-nio-8080-exec-37] WARN  c.e.c.v3.ProfileController - Fallback to cache → redis get user:profile:4839201
2026-03-05 23:18:01.678 [http-nio-8080-exec-37] ERROR c.e.c.RedisCacheClient - Cache miss + redis connection refused → Connection refused: localhost:6379
2026-03-05 23:18:01.701 [http-nio-8080-exec-37] ERROR c.e.c.v3.ProfileController - All fallbacks failed → 503 Service Unavailable, traceId=def456ghi789

2026-03-05 23:19:15.890 [scheduled-task-1] WARN  c.e.m.MetricsPusher - Failed to push metrics to Prometheus → java.net.ConnectException: Connection timed out (prometheus.internal:9091)
2026-03-05 23:19:15.923 [scheduled-task-1] INFO  c.e.m.MetricsPusher - Retrying in 60s (attempt 1/5)

2026-03-05 23:20:33.456 [http-nio-8080-exec-52] ERROR c.e.s.EmailNotificationService - Failed to send order confirmation email → to=omprakash@example.com, SMTP 554 5.7.1 Relay access denied
2026-03-05 23:20:33.489 [http-nio-8080-exec-52] WARN  c.e.q.NotificationRetryQueue - Email enqueued for retry → attempt 1/10, delay=300s

2026-03-05 23:21:08.123 [http-nio-8080-exec-59] INFO  c.e.c.v3.SearchController - Search query → "iphone 16 pro max", user=4839201
2026-03-05 23:21:08.189 [http-nio-8080-exec-59] ERROR c.e.s.ElasticSearchClient - Search request failed → cluster_block_exception: blocked by: [FORBIDDEN/12/index read-only / allow delete (api)]
2026-03-05 23:21:08.234 [http-nio-8080-exec-59] WARN  c.e.c.v3.SearchController - Elasticsearch read-only → falling back to DB fallback search (slow)
2026-03-05 23:21:12.567 [http-nio-8080-exec-59] WARN  c.e.c.v3.SearchController - DB fallback took 4.3s → response 200 but degraded performance

2026-03-05 23:22:44.901 [cleanup-thread-3] ERROR c.e.t.ExpiredTokenCleanup - Batch delete failed → org.postgresql.util.PSQLException: An I/O error occurred while sending to the backend.
2026-03-05 23:22:44.945 [cleanup-thread-3] WARN  c.e.t.ExpiredTokenCleanup - Partial cleanup completed (14567/50000 tokens deleted), retry scheduled in 5min
`;

export default function LogExplorer() {
  const [logText, setLogText] = useState('');
  const [parsedLogs, setParsedLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterService, setFilterService] = useState('');
  const [filterTraceId, setFilterTraceId] = useState('');
  const [filterRequestId, setFilterRequestId] = useState('');
  const [errorsOnly, setErrorsOnly] = useState(false);
  const [warningsOnly, setWarningsOnly] = useState(false);
  const [hideDebug, setHideDebug] = useState(false);
  const [noiseDebug, setNoiseDebug] = useState(false);
  const [noiseHealth, setNoiseHealth] = useState(false);
  const [noiseStatic, setNoiseStatic] = useState(false);
  const [sortKey, setSortKey] = useState<string>('timestamp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [stackCleanerInput, setStackCleanerInput] = useState('');

  const formatDetection = useMemo(() => (parsedLogs.length ? detectFormat(parsedLogs) : null), [parsedLogs]);
  const afterNoise = useMemo(
    () => removeNoise(parsedLogs, { removeDebug: noiseDebug, removeHealthChecks: noiseHealth, removeStaticAssets: noiseStatic }),
    [parsedLogs, noiseDebug, noiseHealth, noiseStatic]
  );
  const afterSearch = useMemo(() => applySearch(afterNoise, searchTerm), [afterNoise, searchTerm]);
  const filteredLogs = useMemo(
    () =>
      applyFilters(afterSearch, {
        level: filterLevel,
        service: filterService || undefined,
        traceId: filterTraceId || undefined,
        requestId: filterRequestId || undefined,
        errorsOnly,
        warningsOnly,
        hideDebug,
      }),
    [afterSearch, filterLevel, filterService, filterTraceId, filterRequestId, errorsOnly, warningsOnly, hideDebug]
  );
  const sortedLogs = useMemo(() => {
    const arr = [...filteredLogs];
    arr.sort((a, b) => {
      const va = a[sortKey] as string | number | undefined;
      const vb = b[sortKey] as string | number | undefined;
      const aVal = va != null ? String(va) : '';
      const bVal = vb != null ? String(vb) : '';
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [filteredLogs, sortKey, sortDir]);

  const timeline = useMemo(() => getTimelineCounts(filteredLogs), [filteredLogs]);
  const topErrors = useMemo(() => getTopErrors(filteredLogs, 10), [filteredLogs]);
  const extractedFieldsList = useMemo(() => extractFields(filteredLogs), [filteredLogs]);
  const jwtsInLogs = useMemo(() => detectJwtsInLogs(filteredLogs), [filteredLogs]);
  const requestFlows = useMemo(() => groupByRequestId(filteredLogs), [filteredLogs]);
  const repeatedPatterns = useMemo(() => detectRepeatedPatterns(filteredLogs, 2), [filteredLogs]);
  const latencyStats = useMemo(() => getLatencyStats(filteredLogs), [filteredLogs]);
  const summary = useMemo(() => getLogSummary(filteredLogs), [filteredLogs]);

  const parseLogsHandler = () => {
    if (!logText.trim()) {
      toast.error('Paste logs first');
      return;
    }
    const entries = parseLogs(logText);
    setParsedLogs(entries);
    toast.success(`Parsed ${entries.length} log entries`);
  };

  const setLevelFilter = (level: string) => {
    setFilterLevel(level === filterLevel ? 'all' : level);
  };

  const copySanitized = () => {
    const sanitized = filteredLogs.map((e) => sanitizeForAI((e.raw as string) || JSON.stringify(e))).join('\n');
    navigator.clipboard.writeText(sanitized);
    toast.success('Sanitized logs copied (safe for AI/Stack Overflow)');
  };

  const downloadFiltered = (format: 'json' | 'csv') => {
    const blob = new Blob([format === 'json' ? exportAsJson(filteredLogs) : exportAsCsv(filteredLogs)], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded logs.${format}`);
  };

  const getLevelIcon = (level?: string) => {
    const u = (level || '').toUpperCase();
    if (u.includes('ERROR')) return <XCircle className="w-4 h-4 text-red-600" />;
    if (u.includes('WARN')) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    if (u.includes('INFO')) return <Info className="w-4 h-4 text-blue-600" />;
    return <CheckCircle className="w-4 h-4 text-gray-400" />;
  };

  const getLevelColor = (level?: string) => {
    const u = (level || '').toUpperCase();
    if (u.includes('ERROR')) return 'bg-red-50 border-red-200';
    if (u.includes('WARN')) return 'bg-yellow-50 border-yellow-200';
    if (u.includes('INFO')) return 'bg-blue-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getLevelBadgeClass = (level?: string) => {
    const u = (level || '').toUpperCase();
    if (u.includes('ERROR')) return 'bg-red-100 text-red-800 border-red-200';
    if (u.includes('WARN')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (u.includes('INFO')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Paste logs</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              JSON lines, plain text, stack traces. Docker, Kubernetes, CloudWatch — one entry per line.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setLogText(SAMPLE_LOGS);
              toast.success('Sample logs loaded');
            }}
            className="px-4 py-2 border border-primary-200 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 shrink-0"
          >
            Try sample logs
          </button>
        </div>
        <div className="p-6">
          <textarea
            id="log-explorer-paste"
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            placeholder="Paste your logs here..."
            className="w-full min-h-[220px] p-4 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-400"
            aria-label="Paste logs to analyze"
          />
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <button
              onClick={parseLogsHandler}
              disabled={!logText.trim()}
              className="min-w-[200px] px-10 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Parse logs
            </button>
            <button
              type="button"
              onClick={() => {
                setLogText('');
                setParsedLogs([]);
                toast.success('Cleared');
              }}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {parsedLogs.length > 0 && (
        <>
          {/* Format detection */}
          {formatDetection && (
            <div className="log-explorer-format bg-white rounded-xl shadow border border-gray-200 p-4">
              <h3 className="log-explorer-format-title text-sm font-bold text-gray-900 mb-2">Log format detected</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="log-explorer-format-badge px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                  {formatDetection.format === 'json' ? 'JSON structured logs' : 'Text logs'}
                </span>
                {formatDetection.fields.length > 0 && (
                  <span className="log-explorer-format-fields text-sm text-gray-600">
                    Fields: {formatDetection.fields.slice(0, 12).join(', ')}
                    {formatDetection.fields.length > 12 ? '…' : ''}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Insights */}
          {(() => {
            const totalForPct = summary.total;
            const errorPct = totalForPct ? Math.round((summary.errors / totalForPct) * 100) : 0;
            return (
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary-600" />
                  Insights
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-xl font-bold text-gray-900">{summary.total}</div>
                    <div className="text-xs text-gray-500">Total logs</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-100 shadow-sm">
                    <div className="text-xl font-bold text-red-700">{summary.errors}</div>
                    <div className="text-xs text-gray-500">Errors</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-sm">
                    <div className="text-xl font-bold text-amber-700">{summary.warnings}</div>
                    <div className="text-xs text-gray-500">Warnings</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-xl font-bold text-gray-900">{errorPct}%</div>
                    <div className="text-xs text-gray-500">Error rate</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-xl font-bold text-gray-900">{summary.slowestRequestMs != null ? `${summary.slowestRequestMs} ms` : '—'}</div>
                    <div className="text-xs text-gray-500">Slowest</div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Top error</div>
                  <div className="text-sm font-medium text-gray-900 break-words whitespace-pre-wrap">
                    {summary.mostCommonError ?? '—'}
                  </div>
                </div>
                {summary.errors > 0 && (
                  <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{summary.errors} error{summary.errors !== 1 ? 's' : ''} need attention. Use Top errors below to search or filter.</span>
                  </p>
                )}
              </div>
            );
          })()}

          {/* Timeline */}
          {(() => {
            const total = (timeline.ERROR || 0) + (timeline.WARN || 0) + (timeline.INFO || 0) + (timeline.DEBUG || 0) || 1;
            const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'] as const;
            return (
              <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Timeline — click a segment or row to filter by level</h3>
                <div className="h-10 flex rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 shadow-inner">
                  {levels.map((level) => {
                    const count = timeline[level] || 0;
                    const pct = total ? (count / total) * 100 : 0;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLevelFilter(level)}
                        className={`h-full transition-all min-w-0 ${
                          level === 'ERROR' ? 'bg-red-500 hover:bg-red-600' : level === 'WARN' ? 'bg-amber-500 hover:bg-amber-600' : level === 'INFO' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
                        } ${filterLevel === level ? 'ring-2 ring-offset-2 ring-primary-500 ring-inset' : ''}`}
                        style={{ width: `${Math.max(pct, count ? 2 : 0)}%` }}
                        title={`${level}: ${count} (${Math.round(pct)}%)`}
                      />
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  {levels.map((level) => {
                    const count = timeline[level] || 0;
                    const pct = total ? Math.round((count / total) * 100) : 0;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLevelFilter(level)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 border transition-colors ${
                          filterLevel === level ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-semibold text-gray-900">{level}</span>
                        <span className="tabular-nums text-gray-600">{count}</span>
                        <span className="text-gray-400 text-xs ml-auto">{pct}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Search & filters */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 sticky top-2 z-10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">Search & filters</h3>
              <span className="text-xs text-gray-500 flex items-center gap-1" title="Examples: level:ERROR · service:auth · level:ERROR AND service:auth · /regex/">
                <Info className="w-3.5 h-3.5" /> Syntax
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <input
                id="log-explorer-search"
                type="text"
                placeholder="Search... level:ERROR, service:auth, /regex/"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-400"
                aria-label="Search logs"
              />
              <select
                id="log-explorer-level"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                aria-label="Filter by log level"
              >
                <option value="all">All levels</option>
                <option value="ERROR">Error</option>
                <option value="WARN">Warn</option>
                <option value="INFO">Info</option>
                <option value="DEBUG">Debug</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <label htmlFor="log-explorer-errors-only" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-errors-only" type="checkbox" checked={errorsOnly} onChange={(e) => setErrorsOnly(e.target.checked)} className="rounded" />
                Errors only
              </label>
              <label htmlFor="log-explorer-warnings" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-warnings" type="checkbox" checked={warningsOnly} onChange={(e) => setWarningsOnly(e.target.checked)} className="rounded" />
                Warnings
              </label>
              <label htmlFor="log-explorer-hide-debug" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-hide-debug" type="checkbox" checked={hideDebug} onChange={(e) => setHideDebug(e.target.checked)} className="rounded" />
                Hide debug
              </label>
              <input
                id="log-explorer-service"
                type="text"
                placeholder="Service"
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                aria-label="Filter by service"
              />
              <input
                id="log-explorer-trace-id"
                type="text"
                placeholder="Trace ID"
                value={filterTraceId}
                onChange={(e) => setFilterTraceId(e.target.value)}
                className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                aria-label="Filter by Trace ID"
              />
              <input
                id="log-explorer-request-id"
                type="text"
                placeholder="Request ID"
                value={filterRequestId}
                onChange={(e) => setFilterRequestId(e.target.value)}
                className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                aria-label="Filter by Request ID"
              />
            </div>
          </div>

          {/* Error analyzer */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Top errors
            </h3>
            {topErrors.length > 0 ? (
              <ul className="space-y-3">
                {topErrors.slice(0, 5).map((err, i) => (
                  <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <span className="flex-1 min-w-0 text-gray-800 break-words whitespace-pre-wrap">{err.message}</span>
                    <span className="text-red-600 font-semibold shrink-0 tabular-nums">{err.count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No errors in this set. Adjust filters or paste more logs.</p>
            )}
          </div>

          {/* Extracted IDs */}
          {extractedFieldsList.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Detected IDs (click to filter)</h3>
              <div className="flex flex-wrap gap-2">
                {extractedFieldsList.slice(0, 15).map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (f.name === 'trace_id') setFilterTraceId(f.value);
                      if (f.name === 'request_id') setFilterRequestId(f.value);
                    }}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-mono"
                  >
                    {f.name}: {f.value.slice(0, 16)}{f.value.length > 16 ? '…' : ''} ({f.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* JWT detection */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              JWT in logs
            </h3>
            {jwtsInLogs.length > 0 ? (
              <>
                <p className="text-xs text-gray-500 mb-2">{jwtsInLogs.length} token(s) found. Decode in Token Comparator.</p>
                <div className="flex flex-wrap gap-2">
                  {jwtsInLogs.slice(0, 3).map((j, i) => (
                    <span key={i} className="text-xs font-mono text-gray-600 truncate max-w-[200px]" title={j.raw}>
                      {j.raw}
                      {j.exp != null && <span className="text-gray-400"> exp: {epochToUtc(j.exp * 1000)}</span>}
                    </span>
                  ))}
                </div>
                <Link href="/token-comparator" className="text-xs text-primary-600 hover:underline mt-2 inline-block">
                  Decode in Token Comparator →
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-500">No JWTs detected in this log set.</p>
            )}
          </div>

          {/* Request flow */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Request flow (by request_id)
            </h3>
            {requestFlows.length > 0 && requestFlows.length <= 20 ? (
              <div className="space-y-1">
                {requestFlows.slice(0, 10).map((rf) => (
                  <div key={rf.requestId} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedRequestId(expandedRequestId === rf.requestId ? null : rf.requestId)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {expandedRequestId === rf.requestId ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <span className="font-mono truncate flex-1 mx-2">{rf.requestId}</span>
                      <span className="text-gray-500">{rf.entries.length} entries</span>
                    </button>
                    {expandedRequestId === rf.requestId && (
                      <div className="px-3 pb-2 text-xs space-y-1 max-h-40 overflow-y-auto">
                        {rf.entries.slice(0, 8).map((e, i) => (
                          <div key={i} className="truncate text-gray-600">
                            {getLevel(e)} — {getMessage(e).slice(0, 60)}…
                          </div>
                        ))}
                        {rf.entries.length > 8 && <div className="text-gray-400">+{rf.entries.length - 8} more</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : requestFlows.length > 20 ? (
              <p className="text-sm text-gray-500">Too many request IDs ({requestFlows.length}). Filter by request_id to see flows.</p>
            ) : (
              <p className="text-sm text-gray-500">No request_id grouping in this log set.</p>
            )}
          </div>

          {/* Repeated patterns */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Repeated patterns</h3>
            {repeatedPatterns.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {repeatedPatterns.slice(0, 5).map((p, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 group">
                    <span className="truncate text-gray-700 flex-1" title={p.pattern}>{p.pattern}</span>
                    <span className="text-amber-600 font-medium shrink-0 tabular-nums">{p.count}</span>
                    <button
                      type="button"
                      onClick={() => setSearchTerm(p.pattern.slice(0, 80))}
                      className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 text-primary-600 hover:bg-primary-50 rounded border border-primary-200 shrink-0 transition-opacity"
                    >
                      Search
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No repeated patterns detected.</p>
            )}
          </div>

          {/* Latency stats */}
          {latencyStats.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Performance
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {latencyStats.map((l, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-mono text-xs text-gray-500 mb-1">{l.field}</div>
                    <div>Avg: {l.avg} ms · Max: {l.max} · Min: {l.min} (n={l.count})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Noise cleaner */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Log noise cleaner</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <label htmlFor="log-explorer-noise-debug" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-noise-debug" type="checkbox" checked={noiseDebug} onChange={(e) => setNoiseDebug(e.target.checked)} className="rounded" />
                Remove debug
              </label>
              <label htmlFor="log-explorer-noise-health" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-noise-health" type="checkbox" checked={noiseHealth} onChange={(e) => setNoiseHealth(e.target.checked)} className="rounded" />
                Remove health checks
              </label>
              <label htmlFor="log-explorer-noise-static" className="flex items-center gap-2 cursor-pointer">
                <input id="log-explorer-noise-static" type="checkbox" checked={noiseStatic} onChange={(e) => setNoiseStatic(e.target.checked)} className="rounded" />
                Remove static asset logs
              </label>
            </div>
          </div>

          {/* Stack trace cleaner */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Stack trace cleaner</h3>
            <p className="text-xs text-gray-500 mb-2">Paste a stack trace to remove local paths and usernames.</p>
            <textarea
              id="log-explorer-stack-cleaner"
              value={stackCleanerInput}
              onChange={(e) => setStackCleanerInput(e.target.value)}
              placeholder="Paste stack trace..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg font-mono text-xs resize-none"
              aria-label="Paste stack trace to clean"
            />
            {stackCleanerInput && (
              <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                {cleanStackTrace(stackCleanerInput)}
              </pre>
            )}
          </div>

          {/* Log table */}
          <div className="log-explorer-table bg-white rounded-xl shadow border border-gray-200 p-4 overflow-x-auto">
            <h3 className="log-explorer-table-title text-sm font-bold text-gray-900 mb-3">Logs ({sortedLogs.length})</h3>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="log-explorer-thead bg-gray-50 sticky top-0">
                  <tr>
                    {['timestamp', 'level', 'message'].map((k) => (
                      <th
                        key={k}
                        className="log-explorer-th text-left py-2 px-2 font-medium text-slate-800 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSortKey(k);
                          setSortDir(sortKey === k && sortDir === 'desc' ? 'asc' : 'desc');
                        }}
                      >
                        {k} {sortKey === k && (sortDir === 'asc' ? '↑' : '↓')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="log-explorer-tbody">
                  {sortedLogs.slice(0, 200).map((log, idx) => {
                    const level = getLevel(log);
                    return (
                      <tr
                        key={idx}
                        className={`log-explorer-row border-t border-gray-100 ${getLevelColor(level)} hover:brightness-[0.97] ${idx % 2 === 1 ? 'bg-black/[0.02]' : ''}`}
                      >
                        <td className="log-explorer-cell-timestamp py-2 px-3 text-slate-700 whitespace-nowrap text-xs font-medium">{(log.timestamp ?? log['@timestamp'] ?? '') as string}</td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${getLevelBadgeClass(level)}`}>
                            {getLevelIcon(getLevel(log))}
                            {level}
                          </span>
                        </td>
                        <td className="log-explorer-cell-message py-2 px-3 text-slate-900 text-sm break-words whitespace-pre-wrap min-w-[24ch] max-w-[75ch] font-medium">{getMessage(log)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {sortedLogs.length > 200 && <p className="text-xs text-gray-500 mt-2">Showing first 200. Export for full set.</p>}
          </div>

          {/* Export & Sanitizer */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Export & copy</h3>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => downloadFiltered('json')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                <Download className="w-4 h-4" /> Download JSON
              </button>
              <button
                type="button"
                onClick={() => downloadFiltered('csv')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button
                type="button"
                onClick={copySanitized}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-sm font-medium"
              >
                <Shield className="w-4 h-4" /> Copy sanitized (AI-safe)
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Sanitized logs replace emails, IPs, paths, and tokens with placeholders — safe for ChatGPT, Stack Overflow, GitHub.
            </p>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/json-prompt-shield" className="text-primary-600 hover:underline flex items-center gap-1">
              JSON Prompt Shield <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/ai-schema-masker" className="text-primary-600 hover:underline flex items-center gap-1">
              AI Schema Masker <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/code-prompt-shield" className="text-primary-600 hover:underline flex items-center gap-1">
              Code Prompt Shield <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/json-comparator" className="text-primary-600 hover:underline flex items-center gap-1">
              JSON Comparator <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Never paste production secrets into unknown tools</h3>
            <p className="text-sm text-amber-800">
              This tool runs 100% in your browser. For maximum safety, use in a trusted environment only.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Learn more</h2>
        <Link
          href="/blog/structured-log-analysis-tools"
          className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all"
        >
          <h3 className="font-semibold text-gray-900 mb-1">Structured log analysis</h3>
          <p className="text-sm text-gray-600">Tools and techniques for parsing and analyzing logs.</p>
          <span className="text-blue-600 text-sm font-medium hover:underline">Read →</span>
        </Link>
      </div>
    </div>
  );
}
