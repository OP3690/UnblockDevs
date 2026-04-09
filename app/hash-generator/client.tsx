'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Shield,
  Lock,
  FileUp,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Key,
  Hash,
  Code2,
  FileCode2,
  ScanSearch,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';
import ToolPageShell from '@/components/tools/ToolPageShell';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import {
  ALL_HASH_ALGORITHMS,
  CLASSIC_ALGORITHMS,
  MODERN_ALGORITHMS,
  type HashAlgId,
  type OutputEncoding,
  hashText,
  hashFile,
  hmacHash,
  constantTimeCompare,
  compareTwoHashes,
  generateSalt,
  bcryptHash,
  pbkdf2Hash,
  scryptHash,
  argon2Hash,
  SECURITY_ANALYSIS,
  hashChunks,
  buildRequestString,
  hashBytes,
  buildHashReport,
  buildHashCsv,
  estimateCrackTime,
  CHARSET_SIZES,
  CODE_EXAMPLES,
} from '@/lib/hashGeneratorEngine';

const HISTORY_KEY = 'hash-generator-history';
const HISTORY_MAX = 20;
const DEBOUNCE_MS = 150;
const ENCODINGS: { value: OutputEncoding; label: string }[] = [
  { value: 'hex', label: 'Hex (lowercase)' },
  { value: 'hex-upper', label: 'Hex (uppercase)' },
  { value: 'base64', label: 'Base64' },
];

type TabId = 'hash' | 'file' | 'verify' | 'compare' | 'password' | 'hmac' | 'tools';

function formatBytes(n: number): string {
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function HashGeneratorClient() {
  const [activeTab, setActiveTab] = useState<TabId>('hash');
  const [input, setInput] = useState('');
  const [selectedAlgs, setSelectedAlgs] = useState<Set<HashAlgId>>(new Set(['sha256', 'md5']));
  const [encoding, setEncoding] = useState<OutputEncoding>('hex');
  const [liveHashes, setLiveHashes] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileHashes, setFileHashes] = useState<Record<string, string>>({});
  const [fileProgress, setFileProgress] = useState<number | null>(null);
  const [verifyExpected, setVerifyExpected] = useState('');
  const [verifyAlg, setVerifyAlg] = useState<HashAlgId>('sha256');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');
  const [compareResult, setCompareResult] = useState<{ match: boolean; diffIndices: number[] } | null>(null);
  const [password, setPassword] = useState('');
  const [pwMethod, setPwMethod] = useState<'bcrypt' | 'pbkdf2' | 'scrypt' | 'argon2'>('bcrypt');
  const [pwSalt, setPwSalt] = useState('');
  const [pwRounds, setPwRounds] = useState(10);
  const [pwIterations, setPwIterations] = useState(100000);
  const [pwHash, setPwHash] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [saltBytes, setSaltBytes] = useState(16);
  const [generatedSalt, setGeneratedSalt] = useState('');
  const [hmacKey, setHmacKey] = useState('');
  const [hmacAlg, setHmacAlg] = useState<HashAlgId>('sha256');
  const [hmacOutput, setHmacOutput] = useState('');
  const [batchLines, setBatchLines] = useState('');
  const [batchAlg, setBatchAlg] = useState<HashAlgId>('sha256');
  const [batchResults, setBatchResults] = useState<{ input: string; hash: string }[]>([]);
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiUrl, setApiUrl] = useState('');
  const [apiBody, setApiBody] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [crackLength, setCrackLength] = useState(12);
  const [crackCharset, setCrackCharset] = useState(62);
  const [crackEstimate, setCrackEstimate] = useState<ReturnType<typeof estimateCrackTime> | null>(null);
  const [codeLang, setCodeLang] = useState<'js' | 'py' | 'go'>('js');
  const [history, setHistory] = useState<{ input: string; hashes: Record<string, string>; ts: number }[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [secOpen, setSecOpen] = useState(false);
  const [crackOpen, setCrackOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live text hashing
  useEffect(() => {
    if (activeTab !== 'hash' || !input.trim()) {
      setLiveHashes({});
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const out: Record<string, string> = {};
      selectedAlgs.forEach((algId) => {
        try {
          out[algId] = hashText(algId, input, encoding);
        } catch {
          out[algId] = '—';
        }
      });
      setLiveHashes(out);
      debounceRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, selectedAlgs, encoding, activeTab]);

  // Verify
  useEffect(() => {
    if (activeTab !== 'verify' || !input.trim() || !verifyExpected.trim()) {
      setVerifyResult(null);
      return;
    }
    try {
      const calculated = hashText(verifyAlg, input, encoding);
      const expected = verifyExpected.replace(/\s/g, '').toLowerCase();
      const calcNorm = calculated.replace(/\s/g, '').toLowerCase();
      setVerifyResult(constantTimeCompare(calcNorm, expected));
    } catch {
      setVerifyResult(false);
    }
  }, [activeTab, input, verifyExpected, verifyAlg, encoding]);

  // Compare
  useEffect(() => {
    if (activeTab !== 'compare' || (!compareA.trim() && !compareB.trim())) {
      setCompareResult(null);
      return;
    }
    setCompareResult(compareTwoHashes(compareA, compareB));
  }, [activeTab, compareA, compareB]);

  // Cracking estimator
  useEffect(() => {
    setCrackEstimate(estimateCrackTime(crackLength, crackCharset));
  }, [crackLength, crackCharset]);

  // Load history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleAlg = (algId: HashAlgId) => {
    setSelectedAlgs((prev) => {
      const next = new Set(prev);
      if (next.has(algId)) next.delete(algId);
      else next.add(algId);
      return next;
    });
  };

  const runFileHash = useCallback(async () => {
    if (!file) return;
    setFileProgress(0);
    const out: Record<string, string> = {};
    const algs = Array.from(selectedAlgs);
    for (let i = 0; i < algs.length; i++) {
      try {
        out[algs[i]] = await hashFile(algs[i], file, encoding, (p) => setFileProgress(p));
      } catch {
        out[algs[i]] = '—';
      }
    }
    setFileHashes(out);
    setFileProgress(null);
  }, [file, selectedAlgs, encoding]);

  useEffect(() => {
    if (file && activeTab === 'file') runFileHash();
  }, [file, activeTab, runFileHash]);

  const generatePasswordHash = async () => {
    trackCtaClick('hash_generator', 'generate_hash');
    if (!password) {
      toast.error('Enter a password');
      return;
    }
      const salt = pwSalt.trim() || generateSalt(16);
      if (!pwSalt.trim()) setPwSalt(salt);
    setPwLoading(true);
    try {
      if (pwMethod === 'bcrypt') {
        setPwHash(bcryptHash(password, pwRounds));
      } else if (pwMethod === 'pbkdf2') {
        setPwHash(pbkdf2Hash(password, salt, pwIterations, 32, 'sha256', encoding));
      } else if (pwMethod === 'scrypt') {
        setPwHash(await scryptHash(password, salt, 16384, 8, 1, 32, encoding));
      } else {
        setPwHash(await argon2Hash(password, salt, { m: 65536, t: 3, p: 4 }, encoding));
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setPwLoading(false);
    }
  };

  const runBatch = () => {
    const lines = batchLines.split(/\n/).map((s) => s.trim()).filter(Boolean);
    if (lines.length === 0) {
      setBatchResults([]);
      return;
    }
    const results = lines.map((line) => ({ input: line, hash: hashText(batchAlg, line, encoding) }));
    setBatchResults(results);
  };

  const runApiHash = () => {
    const str = buildRequestString(apiMethod, apiUrl, apiBody);
    setApiHash(hashText('sha256', str, encoding));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        trackCopy('hash_generator');
    setCopiedId(id);
    toast.success('Copied');
    setTimeout(() => setCopiedId(null), 2000);
      },
      () => toast.error('Copy failed')
    );
  };

  const addToHistory = (inputVal: string, hashes: Record<string, string>) => {
    if (!inputVal.trim() && Object.keys(hashes).length === 0) return;
    setHistory((prev) => {
      const next = [{ input: inputVal.slice(0, 200), hashes, ts: Date.now() }, ...prev.slice(0, HISTORY_MAX - 1)];
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const exportJson = () => {
    const hashes = activeTab === 'file' ? fileHashes : liveHashes;
    const report = buildHashReport(input || (file?.name ?? 'file'), hashes, file ? { fileName: file.name, fileSize: file.size } : undefined);
    const blob = new Blob([report], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'hash-report.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('JSON downloaded');
  };

  const exportCsv = () => {
    const hashes = activeTab === 'file' ? fileHashes : liveHashes;
    const rows = Object.entries(hashes).map(([algorithm, hash]) => ({
      input: (input || file?.name) || '',
      algorithm,
      hash,
    }));
    if (rows.length === 0 && batchResults.length > 0) {
      const csv = buildHashCsv(batchResults.map((r) => ({ input: r.input, algorithm: batchAlg, hash: r.hash })));
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'hashes.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    } else if (rows.length > 0) {
      const csv = buildHashCsv(rows);
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'hashes.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    }
    toast.success('CSV downloaded');
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'hash', label: 'Hash Text', icon: <Hash className="w-4 h-4" /> },
    { id: 'file', label: 'File', icon: <FileUp className="w-4 h-4" /> },
    { id: 'verify', label: 'Verify', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare', icon: <XCircle className="w-4 h-4" /> },
    { id: 'password', label: 'Password', icon: <Lock className="w-4 h-4" /> },
    { id: 'hmac', label: 'HMAC', icon: <Key className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Code2 className="w-4 h-4" /> },
  ];

  const hashBreadcrumb: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools/json' },
    { label: 'Hash Generator' },
  ];

  return (
    <ToolPageShell
      embedTool
      showFooterBand={false}
      breadcrumbItems={hashBreadcrumb}
      title="Hash Generator"
      subtitle="MD5, SHA-256, SHA3, BLAKE2, file checksums, HMAC, bcrypt, Argon2, and more — all in your browser. No data leaves your device."
      toolName="hash_generator"
      tool={
        <>
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-lg shadow-zinc-200/40 overflow-hidden">
          {/* Privacy strip — pill style like Base64/JWT */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-b border-gray-100">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              Runs fully in your browser
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              No data leaves your device
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden />
              </span>
              No hashes stored
            </span>
      </div>

          {/* Tabs — pill style with shadow when active */}
          <div className="px-6 md:px-8 pt-4 pb-2">
            <nav className="flex flex-wrap gap-2" aria-label="Hash tool mode">
              {tabs.map((t) => (
          <button
                  key={t.id}
            type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === t.id
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-200/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {t.icon}
                  {t.label}
          </button>
        ))}
            </nav>
      </div>

          {/* Main content */}
          <div className="px-6 md:px-8 py-6 space-y-6">
      {/* Algorithm + Encoding (for hash/file) */}
      {(activeTab === 'hash' || activeTab === 'file') && (
        <div className="space-y-4 pb-2 border-b border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Algorithms</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {CLASSIC_ALGORITHMS.map((a) => (
                <label key={a.id} className="inline-flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50">
                  <input type="checkbox" checked={selectedAlgs.has(a.id)} onChange={() => toggleAlg(a.id)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">{a.name}</span>
          </label>
              ))}
              {MODERN_ALGORITHMS.map((a) => (
                <label key={a.id} className="inline-flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50">
                  <input type="checkbox" checked={selectedAlgs.has(a.id)} onChange={() => toggleAlg(a.id)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">{a.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-600">Output encoding</span>
            <div className="flex flex-wrap gap-3">
              {ENCODINGS.map((e) => (
                <label key={e.value} className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="encoding" checked={encoding === e.value} onChange={() => setEncoding(e.value)} className="text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">{e.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hash Text */}
      {activeTab === 'hash' && (
        <>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm font-semibold text-gray-800">Input — live hashing as you type</label>
              <button
                type="button"
                onClick={() => { trackCtaClick('hash_generator', 'try_example', { tab: 'hash_text' }); setInput('The quick brown fox jumps over the lazy dog'); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Try Example
              </button>
            </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm transition-shadow"
              spellCheck={false}
            />
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-800">Output</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => { const text = Object.entries(liveHashes).map(([alg, h]) => `${alg.toUpperCase()}\n${h}`).join('\n\n'); copyToClipboard(text, 'all'); addToHistory(input, liveHashes); }} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Copy className="w-3.5 h-3.5" /> Copy all
                </button>
                <button type="button" onClick={exportJson} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> JSON
                </button>
                <button type="button" onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> CSV
                </button>
              </div>
            </div>
            {Object.keys(liveHashes).length === 0 ? (
              <p className="text-gray-500 text-sm py-2">Type above to see hashes.</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(liveHashes).map(([alg, hash]) => (
                  <div key={alg} className="flex flex-wrap items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-gray-100 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">{alg}</span>
                    <code className="flex-1 min-w-0 break-all text-sm text-gray-900 font-mono">{hash}</code>
                    <button type="button" onClick={() => copyToClipboard(hash, alg)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Copy">
                      {copiedId === alg ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                ))}
        </div>
            )}
          </div>
        </>
      )}

      {/* File */}
      {activeTab === 'file' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">File — drag & drop or click</label>
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-primary-400', 'bg-primary-50/50'); }}
              onDragLeave={(e) => { e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50/50'); }}
            onDrop={(e) => {
              e.preventDefault();
                e.currentTarget.classList.remove('border-primary-400', 'bg-primary-50/50');
              const f = e.dataTransfer.files[0];
              if (f) setFile(f);
            }}
            >
              <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file ? (
                <div>
                  <FileUp className="w-10 h-10 mx-auto text-primary-500 mb-2" />
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{formatBytes(file.size)}</p>
                  {fileProgress !== null && <p className="text-xs text-primary-600 mt-2 font-medium">Hashing… {fileProgress}%</p>}
                </div>
              ) : (
                <>
                  <FileUp className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500 font-medium">Drop a file or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">Any file size</p>
                </>
            )}
          </div>
          </div>
          {Object.keys(fileHashes).length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 space-y-2">
              {Object.entries(fileHashes).map(([alg, hash]) => (
                <div key={alg} className="flex flex-wrap items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-gray-100 shadow-sm">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">{alg}</span>
                  <code className="flex-1 min-w-0 break-all text-sm font-mono">{hash}</code>
                  <button type="button" onClick={() => copyToClipboard(hash, `file-${alg}`)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {copiedId === `file-${alg}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
                </div>
              ))}
        </div>
          )}
        </>
      )}

      {/* Verify */}
      {activeTab === 'verify' && (
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm font-semibold text-gray-800">Input (content to hash)</label>
              <button
                type="button"
                onClick={() => {
                  trackCtaClick('hash_generator', 'try_example', { tab: 'verify' });
                  setInput('hello');
                  setVerifyAlg('sha256');
                  setVerifyExpected('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Try Example
              </button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste content or text..." className="w-full min-h-[80px] rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Algorithm</label>
              <select value={verifyAlg} onChange={(e) => setVerifyAlg(e.target.value as HashAlgId)} className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              {ALL_HASH_ALGORITHMS.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Expected hash</label>
              <input type="text" value={verifyExpected} onChange={(e) => setVerifyExpected(e.target.value)} placeholder="Paste expected hash..." className="w-full rounded-xl border border-gray-200 px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          </div>
          {verifyResult !== null && (
            <div className={`rounded-xl border-2 p-4 flex items-center gap-3 ${verifyResult ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
              {verifyResult ? <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" /> : <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />}
              <span className={verifyResult ? 'text-emerald-800 font-semibold' : 'text-red-800 font-semibold'}>
                {verifyResult ? 'Hash verified' : 'Hash does not match'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Compare */}
      {activeTab === 'compare' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                const same = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';
                setCompareA(same);
                setCompareB(same);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
            >
              Try Example (match)
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Hash A</label>
              <textarea value={compareA} onChange={(e) => setCompareA(e.target.value)} placeholder="Paste first hash..." className="w-full min-h-[100px] rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Hash B</label>
              <textarea value={compareB} onChange={(e) => setCompareB(e.target.value)} placeholder="Paste second hash..." className="w-full min-h-[100px] rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          </div>
          {compareResult !== null && (
            <div className={`rounded-xl border-2 p-4 ${compareResult.match ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
              <p className={`font-semibold ${compareResult.match ? 'text-emerald-800' : 'text-amber-800'}`}>
                {compareResult.match ? 'Hashes match' : `Hashes differ (${compareResult.diffIndices.length} position(s))`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Password */}
      {activeTab === 'password' && (
        <div className="space-y-4">
            <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <button
                type="button"
                onClick={() => { trackCtaClick('hash_generator', 'try_example', { tab: 'password' }); setPassword('demoPassword123'); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Try Example
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2">
              <span className="text-sm">Method:</span>
              <select value={pwMethod} onChange={(e) => setPwMethod(e.target.value as typeof pwMethod)} className="rounded border border-gray-300 px-2 py-1 text-sm">
                <option value="bcrypt">bcrypt</option>
                <option value="pbkdf2">PBKDF2</option>
                <option value="scrypt">scrypt</option>
                <option value="argon2">Argon2</option>
              </select>
                </label>
            {pwMethod === 'bcrypt' && (
              <label className="inline-flex items-center gap-2">
                <span className="text-sm">Rounds:</span>
                <input type="number" min={10} max={14} value={pwRounds} onChange={(e) => setPwRounds(Number(e.target.value))} className="w-20 rounded border border-gray-300 px-2 py-1 text-sm" />
              </label>
            )}
            {pwMethod === 'pbkdf2' && (
              <label className="inline-flex items-center gap-2">
                <span className="text-sm">Iterations:</span>
                <input type="number" min={10000} value={pwIterations} onChange={(e) => setPwIterations(Number(e.target.value))} className="w-28 rounded border border-gray-300 px-2 py-1 text-sm" />
              </label>
            )}
          </div>
          {(pwMethod === 'pbkdf2' || pwMethod === 'scrypt' || pwMethod === 'argon2') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salt (optional — auto-generated if empty)</label>
              <input
                type="text"
                value={pwSalt}
                onChange={(e) => setPwSalt(e.target.value)}
                placeholder="Leave empty to generate"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm"
              />
            </div>
          )}
              <button
                type="button"
            onClick={generatePasswordHash}
            disabled={pwLoading}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50"
          >
            {pwLoading ? 'Generating…' : 'Generate hash'}
          </button>
          {pwHash && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Hash</p>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="break-all text-sm flex-1">{pwHash}</code>
                <button type="button" onClick={() => copyToClipboard(pwHash, 'pw')} className="p-2 rounded hover:bg-gray-200">
                  {copiedId === 'pw' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HMAC */}
      {activeTab === 'hmac' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                trackCtaClick('hash_generator', 'try_example', { tab: 'hmac' });
                setHmacKey('secret');
                setInput('message');
                setHmacAlg('sha256');
                setHmacOutput(hmacHash('sha256', 'secret', 'message', encoding));
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
            >
              Try Example
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret key</label>
            <input
              type="text"
              value={hmacKey}
              onChange={(e) => setHmacKey(e.target.value)}
              placeholder="Enter secret key..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message to sign..."
              className="w-full min-h-[80px] rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
            <select value={hmacAlg} onChange={(e) => setHmacAlg(e.target.value as HashAlgId)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
              {ALL_HASH_ALGORITHMS.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
                <button
                  type="button"
            onClick={() => { trackCtaClick('hash_generator', 'generate_hmac'); setHmacOutput(hmacKey && input ? hmacHash(hmacAlg, hmacKey, input, encoding) : ''); }}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700"
                >
            Generate HMAC
                </button>
          {hmacOutput && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-center gap-2 flex-wrap">
              <code className="break-all text-sm flex-1">{hmacOutput}</code>
              <button type="button" onClick={() => copyToClipboard(hmacOutput, 'hmac')} className="p-2 rounded hover:bg-gray-200">
                {copiedId === 'hmac' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tools: Salt, Security, Batch, API, Cracking, Code */}
      {activeTab === 'tools' && (
        <div className="space-y-8">
          {/* Salt */}
          <section className="rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Salt generator</h3>
            <p className="text-sm text-gray-600 mb-2">Salt protects against rainbow table attacks. Use with PBKDF2, scrypt, or Argon2.</p>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <label className="text-sm">Bytes:</label>
              <input type="number" min={8} max={64} value={saltBytes} onChange={(e) => setSaltBytes(Number(e.target.value))} className="w-16 rounded border border-gray-300 px-2 py-1 text-sm" />
              <button type="button" onClick={() => { trackCtaClick('hash_generator', 'generate_salt'); setGeneratedSalt(generateSalt(saltBytes)); }} className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                Generate
            </button>
          </div>
            {generatedSalt && (
              <div className="flex items-center gap-2 flex-wrap bg-gray-50 rounded-lg px-3 py-2">
                <code className="break-all text-sm flex-1">{generatedSalt}</code>
                <button type="button" onClick={() => copyToClipboard(generatedSalt, 'salt')} className="p-1.5 rounded hover:bg-gray-200">
                  {copiedId === 'salt' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
        </div>
      )}
          </section>

          {/* Security analyzer */}
          <section className="rounded-xl border border-gray-200 overflow-hidden">
            <button type="button" onClick={() => setSecOpen(!secOpen)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
              Security strength analyzer
              {secOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
            {secOpen && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2">Algorithm</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Note</th>
                      <th className="pb-2">Collision risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_HASH_ALGORITHMS.map((a) => {
                      const s = SECURITY_ANALYSIS[a.id];
              return (
                        <tr key={a.id} className="border-t border-gray-200">
                          <td className="py-2 font-mono">{a.name}</td>
                          <td className="py-2">
                            <span className={s?.status === 'Broken' ? 'text-red-600' : s?.status === 'Weak' ? 'text-amber-600' : 'text-green-600'}>{s?.status ?? '—'}</span>
                          </td>
                          <td className="py-2 text-gray-600">{s?.short ?? '—'}</td>
                          <td className="py-2 text-gray-600">{s?.risk ?? '—'}</td>
                        </tr>
              );
            })}
                  </tbody>
                </table>
        </div>
      )}
          </section>

          {/* Batch */}
          <section className="rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Batch hashing</h3>
            <p className="text-sm text-gray-600 mb-2">One input per line. Algorithm:</p>
            <select value={batchAlg} onChange={(e) => setBatchAlg(e.target.value as HashAlgId)} className="rounded border border-gray-300 px-2 py-1 text-sm mb-2">
              {ALL_HASH_ALGORITHMS.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {[
                { label: 'Fruits', data: 'apple\nbanana\norange\nmango\ngrape' },
                { label: 'Passwords', data: 'password123\nqwerty\nadmin\nletmein\n123456' },
                { label: 'Emails', data: 'alice@example.com\nbob@example.com\ncarol@example.com' },
                { label: 'UUIDs', data: 'f47ac10b-58cc-4372-a567-0e02b2c3d479\na12bc34d-89ef-4567-b890-1f23c4d5e678\n3c4b5a6d-7e8f-9012-ghij-klmnopqrstuv' },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setBatchLines(s.data)}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <textarea
              value={batchLines}
              onChange={(e) => setBatchLines(e.target.value)}
              placeholder="apple&#10;banana&#10;orange"
              className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm mb-2"
            />
            <button type="button" onClick={runBatch} className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 mb-4">
              Hash all
        </button>
            {batchResults.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-2">Input</th>
                      <th className="px-3 py-2">Hash</th>
                  </tr>
                </thead>
                <tbody>
                    {batchResults.map((r, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-3 py-2 font-mono break-all">{r.input}</td>
                        <td className="px-3 py-2 font-mono break-all">{r.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        )}
          </section>

          {/* API request hash */}
          <section className="rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">API request hashing</h3>
            <p className="text-sm text-gray-600 mb-2">Hash method + URL + body for signature systems.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <input type="text" value={apiMethod} onChange={(e) => setApiMethod(e.target.value)} placeholder="GET" className="rounded border border-gray-300 px-3 py-2 text-sm" />
              <input type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} placeholder="https://api.example.com/..." className="rounded border border-gray-300 px-3 py-2 text-sm sm:col-span-2" />
      </div>
            <textarea value={apiBody} onChange={(e) => setApiBody(e.target.value)} placeholder="Request body (optional)" className="w-full min-h-[60px] rounded border border-gray-300 px-3 py-2 text-sm font-mono mb-2" />
            <button type="button" onClick={runApiHash} className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 mb-2">
              Hash request
            </button>
            {apiHash && <code className="block break-all text-sm bg-gray-50 p-2 rounded">{apiHash}</code>}
          </section>

          {/* Cracking estimator */}
          <section className="rounded-xl border border-gray-200 overflow-hidden">
            <button type="button" onClick={() => setCrackOpen(!crackOpen)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
              Hash cracking difficulty estimator
          {crackOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
            {crackOpen && crackEstimate && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2">
                <p className="text-sm text-gray-600">Rough estimate for a GPU cluster (~1e9 hashes/sec). Use strong passwords and slow KDFs (bcrypt, Argon2).</p>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <span className="text-sm">Length:</span>
                    <input type="number" min={1} max={32} value={crackLength} onChange={(e) => setCrackLength(Number(e.target.value))} className="w-16 rounded border border-gray-300 px-2 py-1 text-sm" />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-sm">Charset:</span>
                    <select value={crackCharset} onChange={(e) => setCrackCharset(Number(e.target.value))} className="rounded border border-gray-300 px-2 py-1 text-sm">
                  {CHARSET_SIZES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
                  </label>
              </div>
                <p className="font-medium text-gray-900">Combinations: {crackEstimate.combinations} → ~{crackEstimate.label}</p>
          </div>
        )}
          </section>

      {/* Code examples */}
          <section className="rounded-xl border border-gray-200 overflow-hidden">
            <button type="button" onClick={() => setCodeOpen(!codeOpen)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
            Code examples
          {codeOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        {codeOpen && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                <div className="flex gap-2">
            {(['js', 'py', 'go'] as const).map((lang) => (
                    <button key={lang} type="button" onClick={() => setCodeLang(lang)} className={`px-3 py-1.5 rounded text-sm font-medium ${codeLang === lang ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {lang === 'js' ? 'JavaScript' : lang === 'py' ? 'Python' : 'Go'}
                    </button>
                  ))}
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{CODE_EXAMPLES[codeLang]}</code>
                </pre>
                <button type="button" onClick={() => copyToClipboard(CODE_EXAMPLES[codeLang], 'code')} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
                  {copiedId === 'code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy
                </button>
              </div>
            )}
          </section>
          </div>
        )}

          </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <section className="mt-8 rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent</h3>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 10).map((h, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInput(h.input);
                  setActiveTab('hash');
                  if (Object.keys(h.hashes).length > 0) setLiveHashes(h.hashes);
                }}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-mono truncate max-w-[200px]"
              >
                {h.input || '(file)'}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Related tools */}
      <section className="mt-10 pt-8 border-t border-gray-200">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/base64-encoder"
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
              <FileCode2 className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">Base64 Encoder</span>
              <span className="text-sm text-gray-500 mt-0.5 block">Encode and decode Base64 text or files. MIME, URL-safe, image preview.</span>
            </div>
          </Link>
          <Link
            href="/jwt-decoder"
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
              <ScanSearch className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">JWT Decoder</span>
              <span className="text-sm text-gray-500 mt-0.5 block">Decode, verify, and inspect JSON Web Tokens. See payload and headers.</span>
            </div>
          </Link>
          <Link
            href="/password-generator"
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md hover:bg-primary-50/30 transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600">
              <Lock className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <span className="font-semibold text-gray-900 group-hover:text-primary-700 block">Password Generator</span>
              <span className="text-sm text-gray-500 mt-0.5 block">Create secure passwords and passphrases. Entropy, strength meter, breach check.</span>
            </div>
          </Link>
        </div>
      </section>
        </>
      }
    />
  );
}
