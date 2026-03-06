'use client';

import { useState, useRef } from 'react';
import {
  Upload,
  Copy,
  Check,
  Download,
  Code,
  AlertCircle,
  Lock,
  Filter,
  Clock,
  MessageSquare,
  ExternalLink,
  Shield,
  List,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  parseHarFile,
  filterHarEntries,
  getHarTiming,
  decodePayload,
  generateCurlFromHarEntry,
  generateBatchScript,
  generateHarAIDebugPrompt,
  harEntryToParsedCurl,
  harEntryToLanguage,
  harEntryToRuby,
  generatePostmanCollection,
  generateOpenAPISpec,
  type NormalizedHarEntry,
  type HarFilters,
  type HarConvertOptions,
  type CurlTarget,
} from '@/lib/harToCurl';

const LANGUAGE_OPTIONS: { value: CurlTarget | 'ruby'; label: string }[] = [
  { value: 'js_fetch', label: 'JavaScript (Fetch)' },
  { value: 'js_axios', label: 'JavaScript (Axios)' },
  { value: 'python_requests', label: 'Python (requests)' },
  { value: 'python_httpx', label: 'Python (HTTPX)' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'php', label: 'PHP' },
  { value: 'csharp', label: 'C#' },
  { value: 'rust', label: 'Rust' },
  { value: 'node_fetch', label: 'Node (node-fetch)' },
  { value: 'ruby', label: 'Ruby' },
];

export default function HarToCurl() {
  const [harContent, setHarContent] = useState('');
  const [normalizedEntries, setNormalizedEntries] = useState<NormalizedHarEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [convertOptions, setConvertOptions] = useState<HarConvertOptions>({
    cleanHeaders: true,
    maskSecrets: true,
    maskData: false,
  });
  const [beautify, setBeautify] = useState(true);
  const [filters, setFilters] = useState<HarFilters>({ resourceType: 'api' });
  const [outputLang, setOutputLang] = useState<CurlTarget | 'ruby' | 'curl'>('curl');
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEntries = filterHarEntries(normalizedEntries, filters);
  const selectedEntry =
    selectedIndex != null && filteredEntries.some((e) => e.index === selectedIndex)
      ? filteredEntries.find((e) => e.index === selectedIndex)!
      : filteredEntries[0] ?? null;

  const scrollToResults = () => {
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const parseHar = (content: string) => {
    if (!content.trim()) {
      setNormalizedEntries([]);
      setSelectedIndex(null);
      return;
    }
    try {
      const entries = parseHarFile(content);
      setNormalizedEntries(entries);
      setSelectedIndex(entries[0]?.index ?? null);
      toast.success(`Parsed ${entries.length} request(s)`);
      scrollToResults();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid HAR file';
      toast.error(msg);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.har')) {
      toast.error('Please upload a .har file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = (ev.target?.result as string) ?? '';
      setHarContent(content);
      parseHar(content);
    };
    reader.readAsText(file);
  };

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setHarContent(content);
    if (!content.trim()) {
      setNormalizedEntries([]);
      setSelectedIndex(null);
    }
  };

  const handleConvert = () => {
    parseHar(harContent);
  };

  const handleClear = () => {
    setHarContent('');
    setNormalizedEntries([]);
    setSelectedIndex(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('HAR input cleared');
  };

  const options: HarConvertOptions & { beautify?: boolean } = {
    ...convertOptions,
    beautify,
  };

  const generatedCurl = selectedEntry
    ? generateCurlFromHarEntry(selectedEntry, options)
    : '';
  const outputText = !selectedEntry
    ? ''
    : outputLang === 'curl'
      ? generatedCurl
      : outputLang === 'ruby'
        ? harEntryToRuby(selectedEntry, convertOptions)
        : harEntryToLanguage(selectedEntry, outputLang as CurlTarget, convertOptions);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const ext = outputLang === 'curl' ? 'sh' : outputLang === 'python_requests' || outputLang === 'python_httpx' ? 'py' : outputLang === 'go' ? 'go' : outputLang === 'java' ? 'java' : outputLang === 'php' ? 'php' : outputLang === 'csharp' ? 'cs' : outputLang === 'rust' ? 'rs' : outputLang === 'ruby' ? 'rb' : 'js';
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `request.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  };

  const handleBatchDownload = () => {
    if (!filteredEntries.length) return;
    const script = generateBatchScript(filteredEntries, convertOptions);
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curl_requests.sh';
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filteredEntries.length} requests as curl_requests.sh`);
  };

  const handleCopyAIPrompt = () => {
    if (!selectedEntry) return;
    const prompt = generateHarAIDebugPrompt(selectedEntry, convertOptions);
    navigator.clipboard.writeText(prompt);
    toast.success('AI debug prompt copied');
  };

  const timing = selectedEntry ? getHarTiming(selectedEntry.entry) : null;
  const payloadDecoded = selectedEntry?.entry.request?.postData?.text
    ? decodePayload(
        selectedEntry.entry.request.postData.text,
        selectedEntry.entry.request.postData.mimeType
      )
    : null;

  const uniqueDomains = Array.from(new Set(normalizedEntries.map((e) => e.domain))).filter(Boolean).sort();
  const uniqueMethods = Array.from(new Set(normalizedEntries.map((e) => e.method))).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          HAR to cURL Converter
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Convert network HAR files into reproducible API requests. Paste or upload a HAR file; get clean cURL, multi-language code, timeline, and AI-ready debug prompts. Everything runs 100% client-side.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-emerald-700 bg-emerald-50/80 border border-emerald-200 rounded-lg px-4 py-3">
          <Lock className="w-4 h-4 shrink-0" />
          <span>All processing happens locally. Your HAR file never leaves your device.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">HAR input</h2>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors text-sm font-medium">
              <Upload className="w-4 h-4" />
              Upload .har
              <input
                ref={fileInputRef}
                type="file"
                accept=".har,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500">or paste JSON below</span>
          </div>
          <textarea
            value={harContent}
            onChange={handlePaste}
            placeholder='Paste HAR JSON (from DevTools → Save all as HAR)'
            className="w-full min-h-[320px] h-[360px] p-4 border border-gray-300 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleConvert}
              disabled={!harContent.trim()}
              className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5" />
              Convert HAR to cURL
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!harContent.trim()}
              className="py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              title="Clear HAR input"
            >
              <Trash2 className="w-5 h-5" />
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Options</h2>
          </div>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={convertOptions.cleanHeaders ?? true}
                onChange={(e) => setConvertOptions((o) => ({ ...o, cleanHeaders: e.target.checked }))}
                className="rounded border-gray-300"
              />
              Clean headers (remove sec-ch-ua, sec-fetch-*, accept-language, etc.)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={convertOptions.maskSecrets ?? true}
                onChange={(e) => setConvertOptions((o) => ({ ...o, maskSecrets: e.target.checked }))}
                className="rounded border-gray-300"
              />
              Mask secrets (Bearer, API keys, cookies → placeholders)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={convertOptions.maskData ?? false}
                onChange={(e) => setConvertOptions((o) => ({ ...o, maskData: e.target.checked }))}
                className="rounded border-gray-300"
              />
              Mask data (email, phone, UUID → placeholders)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={beautify}
                onChange={(e) => setBeautify(e.target.checked)}
                className="rounded border-gray-300"
              />
              Beautify cURL
            </label>
          </div>

          {normalizedEntries.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4" />
                Filters
              </div>
              <div className="p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Domain</span>
                  <select
                    value={filters.domain ?? ''}
                    onChange={(e) => setFilters((f) => ({ ...f, domain: e.target.value || undefined }))}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">All</option>
                    {uniqueDomains.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-gray-600">Method</span>
                  <select
                    value={filters.method ?? ''}
                    onChange={(e) => setFilters((f) => ({ ...f, method: e.target.value || undefined }))}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">All</option>
                    {uniqueMethods.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-gray-600">Type</span>
                  <select
                    value={filters.resourceType ?? 'all'}
                    onChange={(e) => setFilters((f) => ({ ...f, resourceType: e.target.value as HarFilters['resourceType'] }))}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="all">All</option>
                    <option value="api">API (XHR/fetch)</option>
                    <option value="xhr">XHR only</option>
                  </select>
                </div>
                  <div>
                    <span className="text-gray-600">Status ≥</span>
                    <input
                      type="number"
                      min={0}
                      max={599}
                      value={filters.statusMin ?? ''}
                      onChange={(e) => setFilters((f) => ({ ...f, statusMin: e.target.value ? Number(e.target.value) : undefined }))}
                      placeholder="e.g. 400"
                      className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <span className="text-gray-600">Min time (ms)</span>
                    <input
                      type="number"
                      min={0}
                      value={filters.minTime ?? ''}
                      onChange={(e) => setFilters((f) => ({ ...f, minTime: e.target.value ? Number(e.target.value) : undefined }))}
                      placeholder="e.g. 1000"
                      className="ml-2 w-24 px-2 py-1 border border-gray-300 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {normalizedEntries.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <List className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Requests ({filteredEntries.length})
              </h2>
            </div>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Method</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Path</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((e) => (
                    <tr
                      key={e.index}
                      onClick={() => {
                        setSelectedIndex(e.index);
                        scrollToResults();
                      }}
                      className={`border-t border-gray-100 cursor-pointer hover:bg-blue-50/50 ${
                        selectedEntry?.index === e.index ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-mono text-xs">{e.method}</td>
                      <td className="py-2 px-3 truncate max-w-[200px]" title={e.pathname}>{e.pathname || '/'}</td>
                      <td className="py-2 px-3">{e.status}</td>
                      <td className="py-2 px-3">{Number(e.time).toFixed(2)}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedEntry && (
            <div ref={resultsRef} className="space-y-6 scroll-mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Timeline
                  </h3>
                  {timing && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 rounded px-3 py-2">
                        <span className="text-gray-500">Total</span>
                        <div className="font-semibold">{timing.total}ms</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2">
                        <span className="text-gray-500">DNS</span>
                        <div className="font-semibold">{timing.dns}ms</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2">
                        <span className="text-gray-500">Connect</span>
                        <div className="font-semibold">{timing.connect}ms</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2">
                        <span className="text-gray-500">TTFB</span>
                        <div className="font-semibold">{timing.ttfb}ms</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2">
                        <span className="text-gray-500">Download</span>
                        <div className="font-semibold">{timing.download}ms</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Payload inspector</h3>
                  {payloadDecoded && payloadDecoded.decoded ? (
                    <div className="text-sm">
                      <span className="text-gray-500 text-xs">{payloadDecoded.type}</span>
                      <pre className="mt-1 p-3 bg-gray-50 rounded border border-gray-200 overflow-x-auto max-h-40 overflow-y-auto font-mono text-xs whitespace-pre-wrap break-all">
                        {payloadDecoded.decoded.slice(0, 2000)}
                        {payloadDecoded.decoded.length > 2000 ? '…' : ''}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No request body</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="text-sm font-medium text-gray-700">Output</label>
                    <select
                      value={outputLang}
                      onChange={(e) => setOutputLang(e.target.value as CurlTarget | 'ruby' | 'curl')}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="curl">cURL</option>
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Copy"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyAIPrompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-300 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 text-sm font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      AI debug prompt
                    </button>
                  </div>
                </div>
                <pre className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
                  {outputText}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleBatchDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download all as .sh ({filteredEntries.length} requests)
                </button>
                {selectedEntry && (() => {
                  const parsed = harEntryToParsedCurl(selectedEntry, convertOptions);
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const json = generatePostmanCollection(parsed);
                          const blob = new Blob([json], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'postman-collection.json';
                          a.click();
                          URL.revokeObjectURL(url);
                          toast.success('Postman collection downloaded');
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 text-sm font-medium"
                      >
                        Export Postman
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const json = generateOpenAPISpec(parsed);
                          const blob = new Blob([json], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'openapi-snippet.json';
                          a.click();
                          URL.revokeObjectURL(url);
                          toast.success('OpenAPI snippet downloaded');
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 text-sm font-medium"
                      >
                        Export OpenAPI
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          How to use
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Chrome/Edge: DevTools → Network → Right-click → Save all as HAR with content</li>
          <li>Firefox: Network tab → Right-click → Save All As HAR</li>
          <li>Upload the .har file or paste its JSON above. Filter by domain/method/type, then select a request to get cURL or code in Python, Go, Java, PHP, Ruby, and more.</li>
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href="/curl-converter" className="text-blue-600 hover:underline flex items-center gap-1">
          cURL to Code <ExternalLink className="w-3 h-3" />
        </a>
        <a href="/json-beautifier" className="text-blue-600 hover:underline flex items-center gap-1">
          JSON Beautifier <ExternalLink className="w-3 h-3" />
        </a>
        <a href="/code-prompt-shield" className="text-blue-600 hover:underline flex items-center gap-1">
          Code Prompt Shield <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
