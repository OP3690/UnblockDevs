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
}: {
  label: string;
  value: number | null;
  unit: string;
  icon: string;
  phase: ResultCardPhase;
  accent: ResultCardAccent;
}) {
  const styles = CARD_ACCENTS[accent];
  return (
    <div
      className={`p-5 rounded-2xl border text-center transition-all duration-300 ease-out ${
        phase === 'active'
          ? `${styles.border} ${styles.bg} scale-[1.02] shadow-lg`
          : phase === 'done'
            ? `border-gray-700/80 bg-gray-900/80 hover:border-gray-600 ${styles.text}`
            : 'border-gray-800 bg-gray-900/40 opacity-60'
      }`}
    >
      <div className="text-2xl mb-2" aria-hidden>{icon}</div>
      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl sm:text-3xl font-black tabular-nums ${phase === 'done' ? styles.text : 'text-white'}`}>
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

  const rating = download ? getSpeedRating(download) : null;
  const capabilities =
    download !== null && ping !== null ? getCapabilities(download, ping) : [];

  const steps = [
    { key: 'ping', label: 'Ping', active: phase === 'ping', done: ping !== null },
    { key: 'download', label: 'Download', active: phase === 'download', done: download !== null },
    { key: 'upload', label: 'Upload', active: phase === 'upload', done: upload !== null },
  ];

  const contentWidth = 'max-w-3xl mx-auto';

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/80">
        <div className={`${contentWidth} px-4 sm:px-6 py-4`}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </header>

      <main className={`${contentWidth} px-4 sm:px-6 pb-20`}>
        {/* Hero: title + badges */}
        <section className="pt-10 sm:pt-14 pb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Internet Speed Test
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto mb-6">
              Check download, upload, ping, and jitter. No account, no data stored.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-400 text-xs font-medium border border-gray-700/50">
                <Zap className="w-3 h-3 text-emerald-400" />
                Instant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-400 text-xs font-medium border border-gray-700/50">
                <Lock className="w-3 h-3 text-emerald-400" />
                No data stored
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-400 text-xs font-medium border border-gray-700/50">
                <Shield className="w-3 h-3 text-emerald-400" />
                In browser
              </span>
            </div>
          </div>
        </section>

        {/* Test area: one card for gauge + controls + result */}
        <section className="rounded-3xl border border-gray-800 bg-gray-900/50 overflow-hidden shadow-2xl shadow-black/30">
          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" aria-hidden />
            <div className="relative flex flex-col items-center">
              <div
                className={`w-full flex justify-center p-4 sm:p-6 rounded-2xl transition-all duration-500 ${
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
                <div className="mt-4 w-full max-w-md px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
                  <span>{error}</span>
                </div>
              )}

              {phase === 'idle' && (
                <div className="mt-6 flex flex-col items-center gap-3">
                  {history.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 text-xs">
                      <History className="w-4 h-4 text-emerald-400/80" />
                      <span>
                        Last test: <strong className="text-gray-300">{Math.round(history[0].download)} Mbps</strong> down · {formatTimeAgo(Date.now() - history[0].at)}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={runTest}
                    className="px-10 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-base rounded-full transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 border border-emerald-400/20"
                  >
                    Start Speed Test
                  </button>
                  <p className="text-gray-500 text-xs">One tap · ~30 sec · or press Enter</p>
                </div>
              )}

              {(phase === 'ping' || phase === 'download' || phase === 'upload') && (
                <div className="mt-6 w-full max-w-sm">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {steps.map((s) => (
                      <span
                        key={s.key}
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          s.done ? 'text-emerald-400' : s.active ? 'text-emerald-300' : 'text-gray-500'
                        }`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                            s.done ? 'border-emerald-500 bg-emerald-500/20' : s.active ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-600'
                          }`}
                        >
                          {s.done ? '✓' : s.active ? '●' : '○'}
                        </span>
                        {s.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-emerald-400 text-sm font-medium mb-2">
                    {phase === 'ping' && 'Measuring latency…'}
                    {phase === 'download' && 'Testing download…'}
                    {phase === 'upload' && 'Testing upload…'}
                  </p>
                  {(phase === 'download' || phase === 'upload') && speedSamples.length > 1 && (
                    <div className="flex justify-center mb-2">
                      <LiveSparkline samples={speedSamples} max={Math.max(200, Math.max(...speedSamples) * 1.2)} />
                    </div>
                  )}
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    {estimatedSecsLeft != null && estimatedSecsLeft > 0 && (
                      <span className="text-gray-500 text-xs">~{estimatedSecsLeft} sec left</span>
                    )}
                    <button
                      type="button"
                      onClick={cancelTest}
                      className="text-gray-400 hover:text-white text-sm font-medium inline-flex items-center gap-1.5"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {phase === 'complete' && download !== null && (
                <div className="mt-6 w-full animate-speed-fade-in-up">
                  {rating && (() => {
                    const grade = getSpeedGrade(download);
                    const score = getSpeedScore(download);
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-700/80">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-xl border-2 font-black text-xl"
                            style={{ borderColor: grade.color, color: grade.color }}
                          >
                            {grade.grade}
                          </div>
                          <div>
                            <p className="font-bold text-white">{rating.label}</p>
                            <p className="text-gray-400 text-sm">{rating.description}</p>
                          </div>
                        </div>
                        <div className="flex-1 sm:max-w-[180px]">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Score</span>
                            <span className="text-gray-400">{score}/100</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
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
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center py-4 rounded-xl bg-gray-800/50">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">{download.toFixed(1)}</div>
                      <div className="text-gray-400 text-xs font-medium mt-0.5">Mbps download</div>
                    </div>
                    <div className="text-center py-4 rounded-xl bg-gray-800/50 border-l border-gray-700/50">
                      <div className="text-2xl sm:text-3xl font-black text-blue-400 tabular-nums">{upload !== null ? upload.toFixed(1) : '—'}</div>
                      <div className="text-gray-400 text-xs font-medium mt-0.5">Mbps upload</div>
                    </div>
                  </div>
                  {ping !== null && (
                    <p className="text-gray-400 text-sm mb-4">
                      Latency <span className="text-amber-400 font-semibold">{ping} ms</span>
                      {jitter !== null && <span className="text-gray-500"> · Jitter {jitter} ms</span>}
                    </p>
                  )}
                  {rating && download !== null && ping !== null && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                      {getConnectionSummary(download, ping)}
                    </p>
                  )}
                  {download !== null && (
                    <p className="text-emerald-400/90 text-sm font-medium mb-5">
                      Faster than {getPercentileRank(download)}% of typical home connections
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-center gap-2" aria-live="polite">
                    <button
                      type="button"
                      onClick={runTest}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-sm rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                    >
                      Test Again
                    </button>
                    <button
                      type="button"
                      onClick={copyResults}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
                        copied ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-gray-600 bg-gray-800/80 text-gray-300 hover:text-white hover:border-gray-500'
                      }`}
                    >
                      {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results grid (when we have results) */}
        {(download !== null || upload !== null || ping !== null) && (
          <section className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {([
                { label: 'Download', value: download, unit: 'Mbps', icon: '⬇️', phase: (phase === 'download' ? 'active' : download !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'download' },
                { label: 'Upload', value: upload, unit: 'Mbps', icon: '⬆️', phase: (phase === 'upload' ? 'active' : upload !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'upload' },
                { label: 'Ping', value: ping, unit: 'ms', icon: '📡', phase: (ping !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'ping' },
                { label: 'Jitter', value: jitter, unit: 'ms', icon: '〰️', phase: (jitter !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'jitter' },
              ] as const).map((card, i) => (
                <div key={card.label} className="animate-speed-fade-in-up opacity-0" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}>
                  <ResultCard {...card} />
                </div>
              ))}
            </div>

            {capabilities.length > 0 && (
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 mb-6 animate-speed-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">What you can do</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {capabilities.map((cap, i) => (
                    <div
                      key={cap.activity}
                      className={`p-3 rounded-xl text-center text-xs animate-speed-fade-in-up opacity-0 ${
                        cap.supported ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-gray-800/60 border border-gray-700/50 text-gray-500'
                      }`}
                      style={{ animationDelay: `${260 + i * 30}ms`, animationFillMode: 'forwards' }}
                    >
                      <span className="mr-1" aria-hidden>{cap.icon}</span>
                      {cap.activity.replace(/ \d+K| \(.*\)/g, '')}
                      <span className="block mt-0.5 font-semibold">{cap.supported ? '✓' : '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {history.length > 1 && (
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 animate-speed-fade-in-up opacity-0" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Recent tests
                </h2>
                <ul className="space-y-2">
                  {history.slice(0, 4).map((entry, i) => (
                    <li
                      key={entry.at}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm ${i === 0 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-gray-800/40'}`}
                    >
                      <span className="text-gray-400">{formatTimeAgo(Date.now() - entry.at)}</span>
                      <span className="font-mono text-emerald-400">{Math.round(entry.download)} ↓</span>
                      <span className="font-mono text-blue-400">{Math.round(entry.upload)} ↑</span>
                      <span className="text-amber-400/90">{entry.ping} ms</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
