'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  measureDownloadSpeed,
  measureUploadSpeed,
  measurePing,
  getSpeedRating,
  getSpeedGrade,
  getSpeedScore,
  getPercentileRank,
  getCapabilities,
  getConnectionSummary,
} from '@/lib/speedTest';
import { SpeedGauge } from '@/components/SpeedGauge';
import { ArrowLeft, ChevronDown, Copy, Check, Shield, Zap, Lock, AlertCircle, X, History } from 'lucide-react';

type Phase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

const HISTORY_KEY = 'speed-test-history';
const HISTORY_MAX = 5;

type HistoryEntry = { download: number; upload: number; ping: number; jitter: number; at: number };

function formatTimeAgo(ms: number): string {
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} day${hr >= 48 ? 's' : ''} ago`;
}

function LiveSparkline({ samples, max = 200 }: { samples: number[]; max?: number }) {
  if (samples.length < 2) return null;
  const w = 120;
  const h = 28;
  const pad = 2;
  const range = max;
  const points = samples.map((v, i) => {
    const x = pad + (i / (samples.length - 1)) * (w - pad * 2);
    const y = h - pad - (Math.min(v, range) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="rounded overflow-hidden bg-gray-800/50" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
        points={points}
      />
    </svg>
  );
}

const FAQ_ITEMS = [
  {
    question: 'How accurate is this speed test?',
    answer:
      "This speed test measures your connection speed to our servers (same origin). Results reflect real-world performance for typical web traffic to this site. Results may differ from other speed tests depending on which server location they use.",
  },
  {
    question: 'Why is my speed test result lower than my plan speed?',
    answer:
      'Several factors affect speed test results: WiFi signal strength, router performance, number of devices on your network, time of day (peak hours), and distance from the test server. Connect via ethernet cable for the most accurate result.',
  },
  {
    question: 'What is a good internet speed?',
    answer:
      'For general browsing: 25 Mbps. For HD streaming: 25 Mbps. For 4K streaming: 50 Mbps. For video calls: 10 Mbps. For online gaming: 25 Mbps with low ping under 50ms. For remote work and cloud development: 100 Mbps recommended.',
  },
  {
    question: 'What is ping and jitter?',
    answer:
      'Ping (latency) is the time in milliseconds for data to travel to a server and back. Lower is better — under 20ms is excellent, under 50ms is good, over 100ms causes noticeable lag. Jitter is the variation in ping over time — low jitter means a stable connection, important for video calls and gaming.',
  },
  {
    question: 'Does this speed test store my data?',
    answer:
      'No. This speed test runs entirely in your browser. Your IP address, speed results, and location are not stored on any server. Test history is saved locally in your browser only and never transmitted anywhere.',
  },
  {
    question: 'WiFi vs ethernet — which gives better speed?',
    answer:
      'Ethernet almost always gives faster and more stable results than WiFi. WiFi speed is affected by distance from router, interference from other devices, and walls. For the most accurate speed test, connect your device directly to your router via ethernet cable.',
  },
];

const CARD_ACCENTS = {
  download: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/5', text: 'text-emerald-400' },
  upload: { border: 'border-blue-500/40', bg: 'bg-blue-500/5', text: 'text-blue-400' },
  ping: { border: 'border-amber-500/40', bg: 'bg-amber-500/5', text: 'text-amber-400' },
  jitter: { border: 'border-violet-500/40', bg: 'bg-violet-500/5', text: 'text-violet-400' },
} as const;

type ResultCardPhase = 'pending' | 'active' | 'done';
type ResultCardAccent = keyof typeof CARD_ACCENTS;

function ResultCard({
  label,
  value,
  unit,
  icon,
  phase,
  accent,
  compact,
}: {
  label: string;
  value: number | null;
  unit: string;
  icon: string;
  phase: ResultCardPhase;
  accent: ResultCardAccent;
  compact?: boolean;
}) {
  const styles = CARD_ACCENTS[accent];
  return (
    <div
      className={`${compact ? 'p-3.5 sm:p-4' : 'p-5'} rounded-2xl border text-center transition-all duration-300 ease-out motion-reduce:transition-none ${
        phase === 'active'
          ? `${styles.border} ${styles.bg} scale-[1.02] shadow-lg ring-1 ring-white/5`
          : phase === 'done'
            ? `border-gray-700/80 bg-gray-900/80 hover:border-gray-600 ${styles.text}`
            : 'border-gray-800 bg-gray-900/40 opacity-60'
      }`}
    >
      <div className={`${compact ? 'text-xl mb-1' : 'text-2xl mb-2'}`} aria-hidden>
        {icon}
      </div>
      <div className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-0.5">{label}</div>
      <div
        className={`font-black tabular-nums ${compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} ${phase === 'done' ? styles.text : 'text-white'}`}
      >
        {value !== null
          ? value < 1
            ? value.toFixed(2)
            : value.toFixed(0)
          : phase === 'active'
            ? '...'
            : '—'}
      </div>
      <div className="text-gray-500 text-xs font-medium">{unit}</div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50 hover:border-gray-700 transition-colors">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-100 pr-4">{question}</span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpeedTestClient() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [download, setDownload] = useState<number | null>(null);
  const [upload, setUpload] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [jitter, setJitter] = useState<number | null>(null);
  const [liveSpeed, setLiveSpeed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [estimatedSecsLeft, setEstimatedSecsLeft] = useState<number | null>(null);
  const [speedSamples, setSpeedSamples] = useState<number[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryEntry[];
        setHistory(Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : []);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const saveToHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev.filter((e) => e.at !== entry.at)].slice(0, HISTORY_MAX);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'idle') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        runTest();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  async function runTest() {
    setError(null);
    setPhase('ping');
    setDownload(null);
    setUpload(null);
    setPing(null);
    setJitter(null);
    setProgress(0);
    setEstimatedSecsLeft(28);
    setSpeedSamples([]);
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    try {
      const pingResult = await measurePing(signal);
      setPing(pingResult.ping);
      setJitter(pingResult.jitter);
      setProgress(20);
      setEstimatedSecsLeft(22);

      setPhase('download');
      const dl = await measureDownloadSpeed(
        (speed) => {
          setLiveSpeed(speed);
          setSpeedSamples((prev) => [...prev.slice(-24), speed].slice(-30));
          setProgress((prev) => Math.min(prev + 15, 65));
          setEstimatedSecsLeft((s) => (s != null ? Math.max(0, s - 2) : null));
        },
        signal
      );
      setDownload(dl);
      setProgress(65);
      setEstimatedSecsLeft(12);

      setPhase('upload');
      const ul = await measureUploadSpeed(
        (speed) => {
          setLiveSpeed(speed);
          setSpeedSamples((prev) => [...prev.slice(-24), speed].slice(-30));
          setProgress((prev) => Math.min(prev + 10, 95));
          setEstimatedSecsLeft((s) => (s != null ? Math.max(0, s - 3) : null));
        },
        signal
      );
      setUpload(ul);
      setProgress(100);
      setEstimatedSecsLeft(null);
      setPhase('complete');
      saveToHistory({
        download: dl,
        upload: ul,
        ping: pingResult.ping,
        jitter: pingResult.jitter,
        at: Date.now(),
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Speed test failed. Try again.');
      setPhase('idle');
      setEstimatedSecsLeft(null);
    } finally {
      abortRef.current = null;
    }
  }

  function cancelTest() {
    if (abortRef.current) {
      abortRef.current.abort();
      setPhase('idle');
      setError(null);
      setEstimatedSecsLeft(null);
      setSpeedSamples([]);
    }
  }

  function copyResults() {
    const text = `My internet speed: ⬇️ ${download?.toFixed(0)} Mbps download, ⬆️ ${upload?.toFixed(0)} Mbps upload, 📡 ${ping}ms ping — tested at unblockdevs.com/speed-test`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function exportHistoryCSV() {
    if (!history.length) return;
    const header = 'date,download_mbps,upload_mbps,ping_ms,jitter_ms';
    const rows = history.map((e) => {
      const d = new Date(e.at);
      return `${d.toISOString()},${e.download.toFixed(1)},${e.upload.toFixed(1)},${e.ping},${e.jitter}`;
    });
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speed-test-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const rating = download ? getSpeedRating(download) : null;
  const capabilities =
    download !== null && ping !== null ? getCapabilities(download, ping) : [];

  const steps = [
    { key: 'ping', label: 'Ping', active: phase === 'ping', done: ping !== null },
    { key: 'download', label: 'Download', active: phase === 'download', done: download !== null },
    { key: 'upload', label: 'Upload', active: phase === 'upload', done: upload !== null },
  ];

  const shell = 'max-w-6xl mx-auto px-4 sm:px-6';

  const sidebarMetrics = [
    {
      label: 'Download',
      value: download,
      unit: 'Mbps',
      icon: '⬇️',
      phase: (phase === 'download' ? 'active' : download !== null ? 'done' : 'pending') as ResultCardPhase,
      accent: 'download' as ResultCardAccent,
    },
    {
      label: 'Upload',
      value: upload,
      unit: 'Mbps',
      icon: '⬆️',
      phase: (phase === 'upload' ? 'active' : upload !== null ? 'done' : 'pending') as ResultCardPhase,
      accent: 'upload',
    },
    {
      label: 'Ping',
      value: ping,
      unit: 'ms',
      icon: '📡',
      phase: (phase === 'ping' ? 'active' : ping !== null ? 'done' : 'pending') as ResultCardPhase,
      accent: 'ping',
    },
    {
      label: 'Jitter',
      value: jitter,
      unit: 'ms',
      icon: '〰️',
      phase: (phase === 'ping' ? 'active' : jitter !== null ? 'done' : 'pending') as ResultCardPhase,
      accent: 'jitter',
    },
  ] as const;

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(ellipse 100% 70% at 15% 0%, rgba(16,185,129,0.22), transparent 55%),
            radial-gradient(ellipse 80% 60% at 95% 20%, rgba(99,102,241,0.18), transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(14,165,233,0.12), transparent 45%)`,
        }}
        aria-hidden
      />

      <header className="relative z-10 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className={`${shell} py-3.5 sm:py-4`}>
          <Link
            href="/tools/json"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
        </div>
      </header>

      <main className={`relative z-[1] ${shell} pb-24`}>
        <section className="pt-8 pb-8 sm:pt-10 sm:pb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Internet Speed Test
            </h1>
            <p className="mt-3 text-base text-zinc-400 sm:text-lg">
              Check download, upload, ping, and jitter. No account, no data stored.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200/90">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                Instant
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                <Lock className="h-3.5 w-3.5 text-emerald-400/90" />
                No data stored
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                <Shield className="h-3.5 w-3.5 text-violet-300/90" />
                In browser
              </span>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Primary: gauge + flow */}
          <div className="lg:col-span-7">
            <section className="animate-speed-scale-in motion-reduce:animate-none overflow-visible rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 shadow-2xl shadow-black/40 ring-1 ring-white/5">
              <div className="relative p-6 sm:p-8 md:p-10">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.07] via-transparent to-violet-500/[0.04]"
                  aria-hidden
                />
                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex w-full justify-center rounded-2xl p-4 transition-all duration-500 sm:p-6 ${
                      phase === 'download' || phase === 'upload'
                        ? 'bg-emerald-500/5 ring-1 ring-emerald-500/30'
                        : 'bg-gray-800/30'
                    }`}
                  >
                    <SpeedGauge
                      value={phase === 'complete' ? download ?? 0 : liveSpeed}
                      phase={phase}
                    />
                  </div>

                  {error && (
                    <div className="mt-4 flex w-full max-w-md items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                      <span>{error}</span>
                    </div>
                  )}

                  {phase === 'idle' && (
                    <div className="mt-6 flex flex-col items-center gap-3">
                      {history.length > 0 && (
                        <div className="flex items-center gap-2 rounded-xl border border-gray-700/50 bg-gray-800/50 px-3 py-2 text-xs text-gray-400">
                          <History className="h-4 w-4 text-emerald-400/80" />
                          <span>
                            Last test:{' '}
                            <strong className="text-gray-300">{Math.round(history[0].download)} Mbps</strong> down ·{' '}
                            {formatTimeAgo(Date.now() - history[0].at)}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={runTest}
                        className="rounded-full border border-emerald-400/20 bg-emerald-500 px-10 py-3.5 text-base font-bold text-gray-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-emerald-500/40 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                      >
                        Start Speed Test
                      </button>
                      <p className="text-xs text-gray-500">One tap · ~30 sec · or press Enter</p>
                    </div>
                  )}

                  {phase === 'complete' && download !== null && (
                    <div className="mt-6 w-full animate-speed-fade-in-up">
                      {rating && (() => {
                        const grade = getSpeedGrade(download);
                        const score = getSpeedScore(download);
                        return (
                          <div className="mb-6 flex flex-col gap-4 border-b border-gray-700/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-14 w-14 items-center justify-center rounded-xl border-2 font-black text-xl"
                                style={{ borderColor: grade.color, color: grade.color }}
                              >
                                {grade.grade}
                              </div>
                              <div>
                                <p className="font-bold text-white">{rating.label}</p>
                                <p className="text-sm text-gray-400">{rating.description}</p>
                              </div>
                            </div>
                            <div className="flex-1 sm:max-w-[180px]">
                              <div className="mb-1 flex justify-between text-xs text-gray-500">
                                <span>Score</span>
                                <span className="text-gray-400">{score}/100</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${score}%`,
                                    background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                      {ping !== null && (
                        <p className="mb-4 text-sm text-gray-400">
                          Latency <span className="font-semibold text-amber-400">{ping} ms</span>
                          {jitter !== null && <span className="text-gray-500"> · Jitter {jitter} ms</span>}
                        </p>
                      )}
                      {rating && download !== null && ping !== null && (
                        <p className="mb-2 text-sm leading-relaxed text-gray-400">{getConnectionSummary(download, ping)}</p>
                      )}
                      {download !== null && (
                        <p className="mb-5 text-sm font-medium text-emerald-400/90">
                          Faster than {getPercentileRank(download)}% of typical home connections
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-center gap-2" aria-live="polite">
                        <button
                          type="button"
                          onClick={runTest}
                          className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-gray-950 transition-all hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                        >
                          Test Again
                        </button>
                        <button
                          type="button"
                          onClick={copyResults}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
                            copied
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                              : 'border-gray-600 bg-gray-800/80 text-gray-300 hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Live metrics + test progress (dashboard column) */}
          <aside className="flex flex-col gap-4 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 shadow-lg shadow-black/20 backdrop-blur-sm ring-1 ring-white/5">
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Live metrics
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {sidebarMetrics.map((card) => (
                  <ResultCard key={card.label} {...card} compact />
                ))}
              </div>
            </div>

            {capabilities.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4 shadow-lg shadow-black/15 ring-1 ring-white/5 backdrop-blur-sm">
                <h2 className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  What you can do
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((cap) => (
                    <div
                      key={cap.activity}
                      className={`rounded-xl border p-2.5 text-center text-[11px] leading-snug ${
                        cap.supported
                          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200'
                          : 'border-zinc-700/60 bg-zinc-900/50 text-zinc-500'
                      }`}
                    >
                      <span className="mr-0.5" aria-hidden>
                        {cap.icon}
                      </span>
                      <span className="font-medium">{cap.activity.replace(/ \d+K| \(.*\)/g, '')}</span>
                      <span className="mt-1 block text-xs font-semibold tabular-nums">
                        {cap.supported ? '✓' : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(phase === 'ping' || phase === 'download' || phase === 'upload') && (
              <div className="animate-speed-fade-in-up rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 ring-1 ring-emerald-500/10 motion-reduce:animate-none">
                <p className="mb-3 text-center text-sm font-semibold text-emerald-300">
                  {phase === 'ping' && 'Measuring latency…'}
                  {phase === 'download' && 'Testing download…'}
                  {phase === 'upload' && 'Testing upload…'}
                </p>
                <div className="mb-4 flex flex-col gap-2">
                  {steps.map((s) => (
                    <div
                      key={s.key}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        s.done
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : s.active
                            ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                            : 'border-zinc-700/80 bg-zinc-900/40 text-zinc-500'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          s.done
                            ? 'border-emerald-500 bg-emerald-500/25'
                            : s.active
                              ? 'motion-safe:animate-pulse border-emerald-400 bg-emerald-500/20'
                              : 'border-zinc-600'
                        }`}
                      >
                        {s.done ? '✓' : s.active ? '●' : '○'}
                      </span>
                      {s.label}
                    </div>
                  ))}
                </div>
                {(phase === 'download' || phase === 'upload') && speedSamples.length > 1 && (
                  <div className="mb-3 flex justify-center">
                    <LiveSparkline samples={speedSamples} max={Math.max(200, Math.max(...speedSamples) * 1.2)} />
                  </div>
                )}
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  {estimatedSecsLeft != null && estimatedSecsLeft > 0 && (
                    <span className="text-xs text-zinc-500">~{estimatedSecsLeft} sec left</span>
                  )}
                  <button
                    type="button"
                    onClick={cancelTest}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>

        {history.length > 1 && (
          <section className="mt-12 sm:mt-14">
            <div
              className="animate-speed-fade-in-up rounded-2xl border border-gray-800 bg-gray-900/40 p-4 opacity-0"
              style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-300">
                  <History className="h-4 w-4" />
                  Recent tests
                </h2>
                <button
                  type="button"
                  onClick={exportHistoryCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700/80 hover:text-white transition-colors"
                >
                  Export CSV
                </button>
              </div>
              <ul className="space-y-2">
                {history.slice(0, 4).map((entry, i) => (
                  <li
                    key={entry.at}
                    className={`flex items-center justify-between rounded-lg py-2 px-3 text-sm ${
                      i === 0 ? 'border border-emerald-500/20 bg-emerald-500/10' : 'bg-gray-800/40'
                    }`}
                  >
                    <span className="text-gray-400">{formatTimeAgo(Date.now() - entry.at)}</span>
                    <span className="font-mono text-emerald-400">{Math.round(entry.download)} ↓</span>
                    <span className="font-mono text-blue-400">{Math.round(entry.upload)} ↑</span>
                    <span className="text-amber-400/90">{entry.ping} ms</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="mt-14 pt-10 border-t border-gray-800">
          <h2 className="text-lg font-bold text-gray-200 mb-6">How it works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: '1', icon: '📡', title: 'Ping', desc: 'Latency & jitter' },
              { step: '2', icon: '⬇️', title: 'Download', desc: 'Median speed' },
              { step: '3', icon: '⬆️', title: 'Upload', desc: 'Median speed' },
              { step: '4', icon: '📊', title: 'Result', desc: 'No data stored' },
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <div className="text-lg mb-1" aria-hidden>{item.icon}</div>
                <div className="font-semibold text-sm text-white">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Speed guide + Ping in one row on desktop */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-200 mb-3">Good speeds</h2>
            <div className="rounded-xl border border-gray-800 overflow-hidden">
              {[
                ['1–10', 'Slow', 'Basic'],
                ['10–25', 'Average', 'HD streaming'],
                ['25–100', 'Good', '4K, gaming'],
                ['100+', 'Great', 'Heavy use'],
              ].map(([speed, rating, use]) => (
                <div key={speed} className="flex items-center gap-3 py-2.5 px-3 border-b border-gray-800/80 last:border-0 text-sm">
                  <span className="font-mono text-emerald-400 w-14">{speed} Mbps</span>
                  <span className="font-medium text-gray-300 w-20">{rating}</span>
                  <span className="text-gray-500 text-xs">{use}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-200 mb-3">Ping</h2>
            <div className="space-y-2">
              {[
                { range: 'Under 20 ms', label: 'Excellent', color: 'text-emerald-400' },
                { range: '20–50 ms', label: 'Good', color: 'text-amber-400' },
                { range: 'Over 100 ms', label: 'High latency', color: 'text-red-400' },
              ].map((item) => (
                <div key={item.range} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-900/60 border border-gray-800 text-sm">
                  <span className={`font-mono font-semibold ${item.color}`}>{item.range}</span>
                  <span className="text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 pt-10 border-t border-gray-800">
          <h2 className="text-lg font-bold text-gray-200 mb-4">FAQ</h2>
          <div className="space-y-2">
            {FAQ_ITEMS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-10 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> This test measures your connection to our servers. Results vary with load and device. We don’t store your IP, location, or results.
          </p>
        </section>
      </main>
    </div>
  );
}
