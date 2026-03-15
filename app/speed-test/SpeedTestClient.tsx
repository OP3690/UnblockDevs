'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  measureDownloadSpeed,
  measureUploadSpeed,
  measurePing,
  getSpeedRating,
  getCapabilities,
} from '@/lib/speedTest';
import { SpeedGauge } from '@/components/SpeedGauge';
import { ArrowLeft, ChevronDown, Copy, Check, Shield, Zap, Lock } from 'lucide-react';

type Phase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

const FAQ_ITEMS = [
  {
    question: 'How accurate is this speed test?',
    answer:
      "This speed test measures your connection speed to Cloudflare's nearest server. Results reflect real-world performance for most internet activities. Results may differ slightly from other speed tests depending on which server location they use.",
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

  async function runTest() {
    setError(null);
    setPhase('ping');
    setDownload(null);
    setUpload(null);
    setPing(null);
    setJitter(null);
    setProgress(0);

    try {
      const pingResult = await measurePing();
      setPing(pingResult.ping);
      setJitter(pingResult.jitter);
      setProgress(20);

      setPhase('download');
      const dl = await measureDownloadSpeed((speed) => {
        setLiveSpeed(speed);
        setProgress((prev) => Math.min(prev + 15, 65));
      });
      setDownload(dl);
      setProgress(65);

      setPhase('upload');
      const ul = await measureUploadSpeed((speed) => {
        setLiveSpeed(speed);
        setProgress((prev) => Math.min(prev + 10, 95));
      });
      setUpload(ul);
      setProgress(100);
      setPhase('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speed test failed. Try again.');
      setPhase('idle');
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-12 sm:pt-16 pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/25 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)] pointer-events-none" aria-hidden />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden />
        <div className="text-center mb-8 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight text-white">
            Internet Speed Test
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Check download, upload, ping, and jitter in seconds. No account, no data stored.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800/90 text-gray-300 text-xs font-medium border border-gray-700/50">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Instant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800/90 text-gray-300 text-xs font-medium border border-gray-700/50">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              No data stored
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800/90 text-gray-300 text-xs font-medium border border-gray-700/50">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              100% in browser
            </span>
          </div>
        </div>

        <div className="relative mb-10 p-2 rounded-full ring-1 ring-gray-800/80 bg-gray-900/30">
          <SpeedGauge
            value={phase === 'complete' ? download ?? 0 : liveSpeed}
            phase={phase}
          />
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center max-w-md">
            {error}
          </div>
        )}

        {phase === 'idle' || phase === 'complete' ? (
          <button
            type="button"
            onClick={runTest}
            className={`px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-lg rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${phase === 'idle' ? 'animate-btn-glow' : ''}`}
          >
            {phase === 'complete' ? 'Test Again' : 'Start Speed Test'}
          </button>
        ) : (
          <div className="text-center w-full max-w-sm">
            <div className="flex justify-center gap-2 mb-3">
              {steps.map((s) => (
                <span
                  key={s.key}
                  className={`h-1.5 flex-1 max-w-16 rounded-full transition-colors ${
                    s.done ? 'bg-emerald-500' : s.active ? 'bg-emerald-500/80' : 'bg-gray-700'
                  }`}
                  title={s.label}
                />
              ))}
            </div>
            <p className="text-emerald-400 text-sm font-medium">
              {phase === 'ping' && 'Measuring latency…'}
              {phase === 'download' && 'Testing download…'}
              {phase === 'upload' && 'Testing upload…'}
            </p>
            <div className="mt-2 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      {(download !== null || upload !== null || ping !== null) && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {([
              { label: 'Download', value: download, unit: 'Mbps', icon: '⬇️', phase: (phase === 'download' ? 'active' : download !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'download' },
              { label: 'Upload', value: upload, unit: 'Mbps', icon: '⬆️', phase: (phase === 'upload' ? 'active' : upload !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'upload' },
              { label: 'Ping', value: ping, unit: 'ms', icon: '📡', phase: (ping !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'ping' },
              { label: 'Jitter', value: jitter, unit: 'ms', icon: '〰️', phase: (jitter !== null ? 'done' : 'pending') as ResultCardPhase, accent: 'jitter' },
            ] as const).map((card, i) => (
              <div
                key={card.label}
                className="animate-speed-fade-in-up opacity-0"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
              >
                <ResultCard {...card} />
              </div>
            ))}
          </div>

          {rating && (
            <div
              className="text-center p-6 rounded-2xl border border-gray-700 bg-gray-900/80 mb-8 animate-speed-scale-in opacity-0"
              style={{ borderLeftWidth: 4, borderLeftColor: rating.color, animationDelay: '240ms', animationFillMode: 'forwards' }}
            >
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: rating.color }}>
                {rating.label}
              </div>
              <div className="text-gray-400 text-sm">{rating.description}</div>
            </div>
          )}

          {capabilities.length > 0 && (
            <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 mb-8 animate-speed-fade-in-up opacity-0" style={{ animationDelay: '320ms', animationFillMode: 'forwards' }}>
              <h2 className="text-xl font-bold mb-4">
                What you can do with this speed
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {capabilities.map((cap, i) => (
                  <div
                    key={cap.activity}
                    className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 animate-speed-fade-in-up opacity-0 ${
                      cap.supported
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-gray-800/80 border border-gray-700'
                    }`}
                    style={{ animationDelay: `${380 + i * 40}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="text-2xl mb-2" aria-hidden>{cap.icon}</div>
                    <div className="text-xs font-medium text-gray-300">{cap.activity}</div>
                    <div
                      className={`text-xs mt-1 font-semibold ${
                        cap.supported ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                    >
                      {cap.supported ? '✓ Yes' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'complete' && (
            <div className="text-center">
              <button
                type="button"
                onClick={copyResults}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
                  copied
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-gray-600 bg-gray-800/80 text-gray-300 hover:text-white hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy results
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-14 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-10 flex flex-col items-center gap-2">
          How this speed test works
          <span className="w-12 h-0.5 rounded-full bg-emerald-500/60" aria-hidden />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', icon: '📡', title: 'Ping', desc: '10 requests to measure latency and jitter.' },
            { step: '02', icon: '⬇️', title: 'Download', desc: 'Downloads data at increasing sizes; we take the median.' },
            { step: '03', icon: '⬆️', title: 'Upload', desc: 'Sends data to the server; median upload speed.' },
            { step: '04', icon: '📊', title: 'Result', desc: 'Download, upload, ping, and jitter — no data stored.' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-200"
            >
              <div className="text-xs text-gray-500 font-mono mb-2">Step {item.step}</div>
              <div className="text-2xl mb-2" aria-hidden>{item.icon}</div>
              <div className="font-bold mb-2">{item.title}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Speed guide */}
      <section className="max-w-4xl mx-auto px-4 py-14 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          What’s a good internet speed?
          <span className="w-8 h-0.5 rounded-full bg-emerald-500/50" aria-hidden />
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-800 shadow-lg shadow-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900/80">
                <th className="text-left py-4 px-4 text-gray-400 font-medium w-10" />
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Speed</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Rating</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1–10 Mbps', 'Slow', 'Basic browsing, email', 'bg-red-500/70'],
                ['10–25 Mbps', 'Average', 'HD streaming, video calls', 'bg-amber-500/70'],
                ['25–100 Mbps', 'Good', '4K, remote work, gaming', 'bg-emerald-500/70'],
                ['100–500 Mbps', 'Very good', 'Multiple devices, cloud dev', 'bg-blue-500/70'],
                ['500+ Mbps', 'Excellent', 'Heavy use, future‑proof', 'bg-emerald-400'],
              ].map(([speed, rating, use, dotClass]) => (
                <tr
                  key={speed}
                  className="border-b border-gray-800/80 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="py-4 pl-4 pr-0">
                    <span className={`inline-block w-2 h-2 rounded-full ${dotClass}`} aria-hidden />
                  </td>
                  <td className="py-4 px-4 font-mono text-emerald-400">{speed}</td>
                  <td className="py-4 px-4 font-medium">{rating}</td>
                  <td className="py-4 px-4 text-gray-400">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ping & jitter */}
      <section className="max-w-4xl mx-auto px-4 py-14 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          Ping and jitter
          <span className="w-8 h-0.5 rounded-full bg-amber-500/50" aria-hidden />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { range: 'Under 20ms', label: 'Excellent', color: 'text-emerald-400', desc: 'Ideal for gaming, trading, real-time apps' },
            { range: '20–50ms', label: 'Good', color: 'text-amber-400', desc: 'Video calls, streaming, casual gaming' },
            { range: 'Over 100ms', label: 'High latency', color: 'text-red-400', desc: 'Noticeable lag in games and calls' },
          ].map((item) => (
            <div
              key={item.range}
              className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className={`text-lg font-mono font-bold mb-1 ${item.color}`}>{item.range}</div>
              <div className="font-bold mb-2">{item.label}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-14 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          Frequently asked questions
          <span className="w-8 h-0.5 rounded-full bg-violet-500/50" aria-hidden />
        </h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 py-10 border-t border-gray-800">
        <p className="text-gray-500 text-xs leading-relaxed text-center max-w-2xl mx-auto">
          <strong className="text-gray-400">Disclaimer:</strong> This test measures your connection to Cloudflare’s nearest server and is for information only. Results can vary with load, congestion, device, and WiFi. We don’t store or transmit your IP, location, or results. UnblockDevs is not affiliated with Cloudflare, Ookla, or any ISP. For official verification, contact your provider.
        </p>
      </section>
    </div>
  );
}
