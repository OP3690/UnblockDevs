'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Shield, RefreshCw, Clipboard, Download, Upload, Lock, Cpu, ShieldCheck } from 'lucide-react';
import { trackCopy } from '@/lib/analytics';

type JsonShieldMapping = {
  version: string;
  createdAt: string;
  maskKeys: boolean;
  maskStrings: boolean;
  maskBooleans: boolean;
  keyMap: Record<string, string>;
  reverseKeyMap: Record<string, string>;
  stringMap: Record<string, string>;
  reverseStringMap: Record<string, string>;
  booleanMap: Record<string, string>;
  reverseBooleanMap: Record<string, string>;
};

const DEFAULT_EXAMPLE = `{
  "data": [
    {
      "indexName": "NIFTY 50",
      "open": 25571.15,
      "high": 25630.35
    }
  ]
}`;

const JSON_SAMPLES: { label: string; value: string }[] = [
  {
    label: '👤 User profile',
    value: JSON.stringify({
      userId: "usr_8f3a9c12",
      email: "alice.johnson@company.com",
      fullName: "Alice Johnson",
      phoneNumber: "+1-415-555-0192",
      role: "admin",
      department: "engineering",
      apiKey: "sk-prod-x9kLmN3pQrSt",
      lastLogin: "2024-03-15T09:23:00Z",
    }, null, 2),
  },
  {
    label: '🛒 Order payload',
    value: JSON.stringify({
      orderId: "ord_20240315_8821",
      customerId: "cust_88f23a",
      customerEmail: "bob.smith@example.org",
      shippingAddress: { street: "123 Main St", city: "San Francisco", zip: "94105" },
      items: [
        { sku: "PRD-001", productName: "Wireless Headphones", quantity: 2, unitPrice: 79.99 },
      ],
      paymentToken: "tok_visa_4242",
      totalAmount: 159.98,
    }, null, 2),
  },
  {
    label: '⚙️ App config',
    value: JSON.stringify({
      appName: "payment-service",
      environment: "production",
      database: { host: "prod-db.internal.company.com", name: "payments_prod", user: "svc_payments" },
      jwt: { secret: "super-secret-jwt-key-abc123", expiresIn: "24h" },
      stripe: { publishableKey: "pk_live_abc123", webhookSecret: "whsec_xyz789" },
    }, null, 2),
  },
];

export default function JsonPromptShieldClient() {
  const [input, setInput] = useState<string>(DEFAULT_EXAMPLE);
  const [maskedOutput, setMaskedOutput] = useState<string>('');
  const [restored, setRestored] = useState<string>('');
  const [mapping, setMapping] = useState<JsonShieldMapping | null>(null);
  const [identifierCount, setIdentifierCount] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [maskKeys, setMaskKeys] = useState<boolean>(true);
  const [maskStrings, setMaskStrings] = useState<boolean>(true);
  const [maskBooleans, setMaskBooleans] = useState<boolean>(false);
  const [ignoreKeysText, setIgnoreKeysText] = useState<string>('');

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (workerRef.current) return;
    try {
      workerRef.current = new Worker('/workers/json-prompt-shield-worker.js');
      workerRef.current.onmessage = (event: MessageEvent) => {
        const msg = event.data;
        if (!msg) return;
        if (msg.type === 'ERROR') {
          setError(msg.error);
          setProcessing(false);
          return;
        }
        if (msg.type === 'MASK_RESULT') {
          setMaskedOutput(msg.payload.masked);
          setMapping(msg.payload.mapping);
          setIdentifierCount(msg.payload.identifierCount);
          setProcessing(false);
        } else if (msg.type === 'UNMASK_RESULT') {
          setRestored(msg.payload.restored);
          setProcessing(false);
        }
      };
    } catch (e) {
      console.error(e);
      setError('Web Worker not supported.');
    }
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // ⌘+Enter / Ctrl+Enter to mask
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleMask();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMask = () => {
    if (!input.trim() || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    const ignoreKeys = ignoreKeysText
      .split(/[\n,]/)
      .map((k) => k.trim())
      .filter(Boolean);
    workerRef.current.postMessage({
      type: 'MASK',
      payload: {
        input: input.trim(),
        options: { maskKeys, maskStrings, maskBooleans, ignoreKeys },
      },
    });
  };

  const handleUnmask = () => {
    if (!restored.trim() || !mapping || !workerRef.current) return;
    setError(null);
    setProcessing(true);
    workerRef.current.postMessage({
      type: 'UNMASK',
      payload: { masked: restored.trim(), mapping },
    });
  };

  const copyMasked = async () => {
    if (!maskedOutput) return;
    try {
      await navigator.clipboard.writeText(maskedOutput);
      trackCopy('json_prompt_shield');
    } catch {}
  };

  const copyRestored = async () => {
    if (!restored) return;
    try {
      await navigator.clipboard.writeText(restored);
      trackCopy('json_prompt_shield');
    } catch {}
  };

  const downloadMapping = () => {
    if (!mapping) return;
    try {
      const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `json-prompt-shield-mapping-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError('Failed to download mapping.');
    }
  };

  const loadMappingFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const loaded = JSON.parse(reader.result as string) as JsonShieldMapping;
        setMapping(loaded);
        setIdentifierCount(
          Object.keys(loaded.keyMap || {}).length +
            Object.keys(loaded.stringMap || {}).length +
            Object.keys(loaded.booleanMap || {}).length
        );
        setError(null);
      } catch {
        setError('Invalid mapping file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700 font-medium">JSON Prompt Shield</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-violet-600 flex-shrink-0" aria-hidden />
                JSON Prompt Shield — Mask JSON Keys &amp; Values Before Sending to ChatGPT
              </h1>
              <p className="mt-1 text-slate-600 text-sm max-w-2xl">
                High-performance JSON payload masking: keys → K_00001, string values → S_00001. Numbers unchanged. Structure preserved. 100% client-side, fully reversible.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-6" role="region" aria-label="Key benefits">
            <div className="flex items-center gap-2 text-violet-700">
              <Lock className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">100% Data Security</span>
              <span className="text-xs text-slate-600 font-normal">—nothing sent to servers</span>
            </div>
            <div className="flex items-center gap-2 text-violet-700">
              <Cpu className="w-4 h-4 flex-shrink-0" aria-hidden />
              <span className="text-sm font-semibold">Client-side only</span>
              <span className="text-xs text-slate-600 font-normal">—runs in your browser</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <section className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50/40 to-white shadow-md overflow-hidden">
          <div className="px-4 py-3 border-b border-violet-100 bg-violet-50/70">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-600" />
              Mask JSON payload
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Paste JSON → mask keys and string values → copy and send to AI → paste AI response below and restore.
            </p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-4 items-start">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskKeys} onChange={(e) => setMaskKeys(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask keys
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskStrings} onChange={(e) => setMaskStrings(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask string values
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={maskBooleans} onChange={(e) => setMaskBooleans(e.target.checked)} className="rounded border-slate-300 text-violet-600" />
                Mask booleans
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Ignore keys (optional, comma or newline)</label>
              <input
                type="text"
                value={ignoreKeysText}
                onChange={(e) => setIgnoreKeysText(e.target.value)}
                placeholder="e.g. data, meta, status"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div id="json-shield-input" className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[220px]">
                <div className="flex flex-wrap items-center justify-between gap-1.5 px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                  <span className="text-sm font-semibold text-slate-900">Original JSON</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {JSON_SAMPLES.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setInput(s.value)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-violet-200 bg-violet-50 text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        if (input.trim()) setInput('');
                        else setInput(DEFAULT_EXAMPLE);
                        document.getElementById('json-shield-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {input.trim() ? 'Clear' : 'Example'}
                    </button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 min-h-[180px] w-full resize-none border-0 p-3 text-sm font-mono bg-white focus:ring-2 focus:ring-violet-500/20"
                  placeholder='Paste JSON (e.g. { "data": [...] })'
                  spellCheck={false}
                />
              </div>
              <div id="json-shield-output" className="rounded-xl border border-violet-100 bg-white shadow-sm overflow-hidden flex flex-col min-h-[220px]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-violet-50 bg-violet-50/50">
                  <span className="text-sm font-semibold text-slate-900">Masked output</span>
                  <div className="flex items-center gap-2">
                    {identifierCount > 0 && (
                      <span className="text-xs text-slate-500">{identifierCount} masked</span>
                    )}
                    <button type="button" onClick={copyMasked} disabled={!maskedOutput} className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-violet-600 hover:bg-violet-50 disabled:opacity-40">
                      <Clipboard className="w-3.5 h-3.5" /> Copy
                    </button>
                    <button
                      type="button"
                      onClick={handleMask}
                      disabled={!input.trim() || processing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 disabled:opacity-50"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Mask
                      <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={maskedOutput}
                  className="flex-1 min-h-[180px] w-full resize-none border-0 p-3 text-sm font-mono bg-slate-50/50"
                  placeholder="Masked JSON appears here (K_00001, S_00001, numbers unchanged)"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border-2 border-violet-200 bg-white overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-violet-100 bg-violet-50/50">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Restore AI response</h3>
              <p className="text-xs text-slate-500 mt-0.5">Paste the AI&apos;s JSON reply (with K_00001, S_00001, etc.) and restore to original keys/values</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleUnmask}
                disabled={!mapping || !restored.trim() || processing}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restore
              </button>
              <button type="button" onClick={copyRestored} disabled={!restored.trim()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 disabled:opacity-40">
                <Clipboard className="w-3.5 h-3.5" />
                Copy
              </button>
              <button type="button" onClick={downloadMapping} disabled={!mapping} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 disabled:opacity-40">
                <Download className="w-3.5 h-3.5" />
                Download mapping
              </button>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-violet-200 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Load mapping
                <input type="file" accept="application/json" className="hidden" onChange={loadMappingFile} />
              </label>
            </div>
          </div>
          <div className="min-h-[200px] flex flex-col">
            <textarea
              value={restored}
              onChange={(e) => setRestored(e.target.value)}
              className="flex-1 min-h-[200px] w-full resize-none border-0 p-4 text-sm font-mono bg-slate-50/80 focus:ring-2 focus:ring-violet-500/20"
              placeholder="Paste AI JSON response (K_00001, S_00001, etc.) here"
              spellCheck={false}
            />
          </div>
          {restored.trim() && mapping && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
              Click Restore to unmask keys and string values using the current mapping.
            </div>
          )}
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <p className="text-center text-slate-500 text-sm">
          Keys → K_00001, string values → S_00001. Numbers and null unchanged. Iterative traversal supports large payloads (MBs). All processing in your browser.
        </p>
      </main>
    </div>
  );
}
