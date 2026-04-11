'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Copy, Scissors, Download, Settings, Info, ChevronDown, ChevronUp, CheckCircle2, Sparkles, BarChart3, Shield, FileText } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { trackCopy } from '@/lib/analytics';
import {
  simplifyPrompt,
  detectIntent,
  detectDomain,
  scorePrompt,
  PROMPT_TEMPLATES,
  type Intent,
  type Tone,
  type ModelStyle,
} from '@/lib/promptSimplifierEngine';

interface Chunk {
  id: number;
  content: string;
  wordCount: number;
  charCount: number;
  isFirst: boolean;
  isLast: boolean;
}

type TabMode = 'chunk' | 'simplify';

export default function PromptChunker() {
  const [tabMode, setTabMode] = useState<TabMode>('chunk');
  const [prompt, setPrompt] = useState('');
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [chunkSize, setChunkSize] = useState<number>(500);
  const [chunkType, setChunkType] = useState<'words' | 'chars'>('words');
  const [overlap, setOverlap] = useState<number>(50);
  const [showSettings, setShowSettings] = useState(true);
  const [expandedChunks, setExpandedChunks] = useState<Set<number>>(new Set());
  const [copiedChunks, setCopiedChunks] = useState<Set<number>>(new Set());
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  // Simplifier state
  const [simplifiedResult, setSimplifiedResult] = useState<ReturnType<typeof simplifyPrompt> | null>(null);
  const [simplifierTone, setSimplifierTone] = useState<Tone>('professional');
  const [simplifierModel, setSimplifierModel] = useState<ModelStyle>('neutral');
  const [simplifierSafety, setSimplifierSafety] = useState(true);
  const [simplifiedCopied, setSimplifiedCopied] = useState(false);

  // ⌘+Enter / Ctrl+Enter to split or simplify
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (tabMode === 'chunk') splitIntoChunks();
        else runSimplify();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabMode]);

  const splitIntoChunks = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to chunk');
      return;
    }

    const newChunks: Chunk[] = [];
    const rawChunks: string[] = [];
    
    if (chunkType === 'words') {
      const words = prompt.split(/\s+/);
      const wordsPerChunk = chunkSize;
      const overlapWords = Math.floor((overlap / 100) * wordsPerChunk);
      
      for (let i = 0; i < words.length; i += wordsPerChunk - overlapWords) {
        const chunkWords = words.slice(i, i + wordsPerChunk);
        const chunkContent = chunkWords.join(' ');
        
        if (chunkContent.trim()) {
          rawChunks.push(chunkContent);
        }
        
        // Stop if we've reached the end
        if (i + wordsPerChunk >= words.length) break;
      }
    } else {
      // Character-based chunking
      const charsPerChunk = chunkSize;
      const overlapChars = Math.floor((overlap / 100) * charsPerChunk);
      
      for (let i = 0; i < prompt.length; i += charsPerChunk - overlapChars) {
        const chunkContent = prompt.slice(i, i + charsPerChunk);
        
        if (chunkContent.trim()) {
          rawChunks.push(chunkContent);
        }
        
        // Stop if we've reached the end
        if (i + charsPerChunk >= prompt.length) break;
      }
    }

    // Add instructions to chunks
    rawChunks.forEach((rawContent, index) => {
      const isFirst = index === 0;
      const isLast = index === rawChunks.length - 1;
      let finalContent = rawContent;

      if (isFirst && rawChunks.length > 1) {
        // Add instruction for first chunk - store in memory
        finalContent = `[IMPORTANT INSTRUCTIONS: This prompt is being sent in multiple chunks. Please store this chunk and all upcoming chunks in your memory. Do NOT generate any output yet. Just acknowledge that you understand and are ready to receive the remaining chunks. Wait for all chunks before responding.]\n\n${rawContent}`;
      } else if (isLast && rawChunks.length > 1) {
        // Add instruction for final chunk - just instructions, no full text
        finalContent = `${rawContent}\n\n[FINAL CHUNK - This is the last chunk. You have now received all chunks. Please consolidate all the chunks you have stored in memory and use the complete consolidated prompt to generate your final output. Process all the chunks together as one complete prompt and provide your response.]`;
      }

      const words = finalContent.split(/\s+/).filter(w => w.length > 0).length;
      newChunks.push({
        id: index + 1,
        content: finalContent,
        wordCount: words,
        charCount: finalContent.length,
        isFirst,
        isLast,
      });
    });

    setChunks(newChunks);
    setExpandedChunks(new Set());
    setCopiedChunks(new Set());
    toast.success(`Split into ${newChunks.length} chunks`);
    setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const copyChunk = (chunk: Chunk) => {
    navigator.clipboard.writeText(chunk.content);
    trackCopy('prompt_chunker');
    setCopiedChunks(prev => new Set(prev).add(chunk.id));
    toast.success(`Chunk ${chunk.id} copied to clipboard!`);
  };

  const toggleChunkExpansion = (chunkId: number) => {
    setExpandedChunks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chunkId)) {
        newSet.delete(chunkId);
      } else {
        newSet.add(chunkId);
      }
      return newSet;
    });
  };

  const copyAllChunks = () => {
    const allChunks = chunks.map((chunk, idx) => 
      `--- Chunk ${chunk.id} (${chunk.wordCount} words, ${chunk.charCount} chars) ---\n${chunk.content}\n`
    ).join('\n');
    
    navigator.clipboard.writeText(allChunks);
    trackCopy('prompt_chunker');
    setCopiedChunks(new Set(chunks.map(c => c.id)));
    toast.success('All chunks copied to clipboard!');
  };

  const downloadChunks = () => {
    const content = chunks.map((chunk, idx) => 
      `=== Chunk ${chunk.id} ===\nWords: ${chunk.wordCount} | Characters: ${chunk.charCount}\n\n${chunk.content}\n\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-chunks-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Chunks downloaded!');
  };

  const clearAll = () => {
    setPrompt('');
    setChunks([]);
    setExpandedChunks(new Set());
    setCopiedChunks(new Set());
    setSimplifiedResult(null);
    toast.success('Cleared');
  };

  const copyChunksAsJson = () => {
    const arr = chunks.map((c) => c.content);
    navigator.clipboard.writeText(JSON.stringify(arr, null, 2));
    trackCopy('prompt_chunker');
    toast.success('Chunks copied as JSON array');
  };

  const downloadChunksMarkdown = () => {
    const md = chunks
      .map((c, i) => `## Chunk ${i + 1}/${chunks.length} (${c.wordCount} words)\n\n${c.content}`)
      .join('\n\n---\n\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `chunks-${Date.now()}.md`;
    a.click();
    toast.success('Chunks downloaded as Markdown');
  };

  // Live estimated chunk count
  const liveEstimate = useMemo(() => {
    if (!prompt.trim()) return null;
    const words = prompt.trim().split(/\s+/).length;
    const chars = prompt.length;
    const effectiveSize = chunkSize * (1 - overlap / 100);
    const estChunks = chunkType === 'words'
      ? Math.max(1, Math.ceil(words / effectiveSize))
      : Math.max(1, Math.ceil(chars / effectiveSize));
    return { words, chars, estChunks };
  }, [prompt, chunkSize, chunkType, overlap]);

  const runSimplify = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to simplify');
      return;
    }
    const result = simplifyPrompt(prompt, {
      tone: simplifierTone,
      modelStyle: simplifierModel,
      scanSafety: simplifierSafety,
    });
    setSimplifiedResult(result);
    toast.success('Prompt simplified');
    resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copySimplified = () => {
    if (simplifiedResult?.optimized) {
      navigator.clipboard.writeText(simplifiedResult.optimized);
      trackCopy('prompt_chunker');
      setSimplifiedCopied(true);
      toast.success('Optimized prompt copied');
      setTimeout(() => setSimplifiedCopied(false), 2000);
    }
  };

  const applyTemplate = (templateId: string) => {
    const t = PROMPT_TEMPLATES.find((x) => x.id === templateId);
    if (t) {
      setPrompt(t.template);
      setTabMode('simplify');
      toast.success(`Template "${t.name}" applied`);
    }
  };

  const totalWords = prompt.split(/\s+/).filter(w => w.length > 0).length;
  const totalChars = prompt.length;

  return (
    <div className="space-y-4">

      {/* ── Mode selector header ────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pb-1 border-b border-zinc-200">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 border border-zinc-200">
          <button
            type="button"
            onClick={() => setTabMode('chunk')}
            className={`cta-tab-chunk inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tabMode === 'chunk'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/70'
            }`}
            aria-pressed={tabMode === 'chunk'}
          >
            <Scissors className="w-4 h-4 shrink-0" />
            Split into Chunks
          </button>
          <button
            type="button"
            onClick={() => setTabMode('simplify')}
            className={`cta-tab-simplify inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tabMode === 'simplify'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/70'
            }`}
            aria-pressed={tabMode === 'simplify'}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            Simplify Prompt
          </button>
        </div>

        {/* Live word count */}
        {prompt.trim() && (
          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span>{totalWords} words</span>
            <span>·</span>
            <span>{totalChars} chars</span>
            {liveEstimate && tabMode === 'chunk' && (
              <>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">~{liveEstimate.estChunks} chunk{liveEstimate.estChunks !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Samples & templates ────────────────────────────────── */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50/60 rounded-t-xl">
          <FileText className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-semibold text-zinc-800">Prompt templates</span>
          <span className="text-xs text-zinc-400 ml-1">— click to load</span>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex flex-wrap gap-2">
            {PROMPT_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyTemplate(t.id)}
                className="cta-template px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Long text samples:</span>
            {[
              {
                label: '📖 Research article',
                text: `Artificial intelligence and machine learning have fundamentally transformed the way we approach problem-solving across industries. From healthcare to finance, from education to manufacturing, AI systems are now capable of performing tasks that once required human expertise and judgment. Deep learning models, trained on vast datasets, can now diagnose diseases from medical images, predict stock market movements, translate languages in real-time, and generate creative content. The rapid advancement of large language models (LLMs) has opened new frontiers in natural language processing, enabling machines to understand and generate human-like text with remarkable accuracy. These models, trained on billions of parameters and petabytes of data, can write code, summarize documents, answer complex questions, and even engage in philosophical discussions. However, this progress comes with significant challenges. The computational resources required to train and run these models are enormous, leading to concerns about energy consumption and environmental impact. Questions about bias, fairness, and transparency in AI decision-making are increasingly important as these systems influence critical decisions in hiring, lending, criminal justice, and healthcare. Researchers and policymakers are working together to develop frameworks for responsible AI development, including techniques for explaining AI decisions, methods for detecting and mitigating bias, and regulatory guidelines for high-stakes applications. The future of AI depends not just on technical innovation but also on thoughtful governance and ethical considerations.`,
              },
              {
                label: '📋 Technical spec',
                text: `System Architecture Overview: The microservices architecture consists of twelve independent services communicating via REST APIs and message queues. Each service is containerized using Docker and orchestrated through Kubernetes clusters deployed across three availability zones. The API Gateway handles authentication, rate limiting, and request routing. The User Service manages registration, authentication, and profile management using JWT tokens with a 24-hour expiry and refresh token rotation. The Order Service processes transactions with idempotency keys to prevent duplicate charges, integrating with the Payment Service via Stripe webhooks. The Inventory Service maintains real-time stock levels with optimistic locking to handle concurrent updates. The Notification Service sends emails via SendGrid and push notifications through Firebase. All services write logs to a centralized ELK stack (Elasticsearch, Logstash, Kibana) for monitoring and debugging. Service discovery is handled by Consul, and inter-service communication uses gRPC for internal calls. The database layer uses PostgreSQL for transactional data with read replicas for reporting queries, Redis for caching and session storage, and Elasticsearch for full-text search functionality. Circuit breakers are implemented using Resilience4j to prevent cascade failures. Deployment follows a blue-green strategy with automated rollback triggers based on error rate thresholds.`,
              },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => { setPrompt(s.text); setTabMode('chunk'); }}
                className="px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Settings panel (Chunk mode) ─────────────────────────── */}
      {tabMode === 'chunk' && (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="cta-chunking-settings inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:text-zinc-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-500" />
              Chunking Settings
              {showSettings ? <ChevronUp className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />}
            </button>
            <button
              type="button"
              onClick={() => { setChunkSize(500); setChunkType('words'); setOverlap(50); toast.success('Reset to default settings'); }}
              className="px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-100 border border-zinc-200 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Reset to default
            </button>
          </div>
          {showSettings && (
            <div className="grid sm:grid-cols-3 gap-5 p-5 bg-zinc-50/40">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2 uppercase tracking-wide">Chunk Type</label>
                <select
                  value={chunkType}
                  onChange={(e) => setChunkType(e.target.value as 'words' | 'chars')}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-colors"
                >
                  <option value="words">Words</option>
                  <option value="chars">Characters</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2 uppercase tracking-wide">
                  Chunk Size — <span className="text-zinc-900 font-bold">{chunkSize} {chunkType === 'words' ? 'words' : 'chars'}</span>
                </label>
                <input type="range" min="100" max={chunkType === 'words' ? '2000' : '5000'} step="50"
                  value={chunkSize} onChange={(e) => setChunkSize(Number(e.target.value))}
                  className="w-full accent-zinc-900" />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>100</span><span>{chunkType === 'words' ? '2000' : '5000'}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2 uppercase tracking-wide">
                  Overlap — <span className="text-zinc-900 font-bold">{overlap}%</span>
                </label>
                <input type="range" min="0" max="50" step="5"
                  value={overlap} onChange={(e) => setOverlap(Number(e.target.value))}
                  className="w-full accent-zinc-900" />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>0%</span><span>50%</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">Preserves context between chunks</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Simplify options ────────────────────────────────────── */}
      {tabMode === 'simplify' && (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
            <span className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-500" />Simplify options
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 p-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2 uppercase tracking-wide">Tone</label>
              <select value={simplifierTone} onChange={(e) => setSimplifierTone(e.target.value as Tone)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400">
                <option value="professional">Professional</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="beginner">Beginner friendly</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2 uppercase tracking-wide">Target model</label>
              <select value={simplifierModel} onChange={(e) => setSimplifierModel(e.target.value as ModelStyle)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400">
                <option value="neutral">Neutral</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
            <div className="flex items-end pb-0.5">
              <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" id="simplifier-safety" checked={simplifierSafety}
                  onChange={(e) => setSimplifierSafety(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
                <span className="text-sm text-zinc-700 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  Mask secrets (API keys, tokens)
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ── Prompt textarea + primary action ───────────────────── */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
          <h3 className="text-sm font-semibold text-zinc-800">Your prompt</h3>
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span>{totalWords} words</span>
            <span>·</span>
            <span>{totalChars} chars</span>
            {liveEstimate && tabMode === 'chunk' && (
              <>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">~{liveEstimate.estChunks} chunk{liveEstimate.estChunks !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={tabMode === 'chunk'
            ? 'Paste your long AI prompt here to split it into chunks…'
            : 'Paste your messy or informal prompt here to optimize it…'}
          className="w-full h-56 px-4 py-3 text-sm font-mono text-zinc-800 placeholder:text-zinc-400 border-0 resize-y focus:ring-2 focus:ring-inset focus:ring-zinc-900/10 bg-white"
          spellCheck={false}
        />
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-zinc-100 bg-zinc-50/40">
          {tabMode === 'chunk' ? (
            <button type="button" onClick={splitIntoChunks}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
              <Scissors className="w-4 h-4" />
              Split into Chunks
              <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
            </button>
          ) : (
            <button type="button" onClick={runSimplify}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
              <Sparkles className="w-4 h-4" />
              Simplify prompt
              <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
            </button>
          )}
          <button type="button" onClick={clearAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
            Clear
          </button>

          {/* How-to hint — only when empty */}
          {!prompt.trim() && (
            <p className="text-xs text-zinc-400 ml-1 hidden sm:block">
              {tabMode === 'chunk'
                ? 'Tip: set overlap to preserve context between chunks'
                : 'Tip: choose a tone + model before simplifying'}
            </p>
          )}
        </div>
      </div>

      {/* ── Simplifier result ───────────────────────────────────── */}
      {tabMode === 'simplify' && simplifiedResult && (
        <div ref={resultsSectionRef} className="space-y-3">
          {/* Analysis */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
              <BarChart3 className="w-4 h-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-zinc-800">Analysis</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Intent', value: simplifiedResult.intent },
                  { label: 'Domain', value: simplifiedResult.domain },
                  { label: 'Quality score', value: `${simplifiedResult.score}/100` },
                  { label: 'Token estimate', value: `~${simplifiedResult.tokenEstimate}` },
                ].map(({ label, value }) => (
                  <div key={label} className="px-3 py-2.5 rounded-lg border border-zinc-100 bg-zinc-50">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block">{label}</span>
                    <span className="text-sm font-bold text-zinc-800 capitalize">{value}</span>
                  </div>
                ))}
              </div>
              {simplifiedResult.masked.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-amber-200 bg-amber-50">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs text-amber-800">
                    Masked: {simplifiedResult.masked.map((m) => `${m.label} (${m.count})`).join(', ')}
                  </span>
                </div>
              )}
              {simplifiedResult.suggestions.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">Suggestions</span>
                  <ul className="text-sm text-zinc-700 list-disc list-inside mt-1.5 space-y-0.5">
                    {simplifiedResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Optimized output */}
          <div className="rounded-xl border border-emerald-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-100 bg-emerald-50/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-zinc-800">Optimized prompt</h3>
                <span className="text-[11px] text-zinc-400 font-mono">~{simplifiedResult.tokenEstimate} tokens</span>
              </div>
              <button type="button" onClick={copySimplified}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  simplifiedCopied ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}>
                {simplifiedCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {simplifiedCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-zinc-50/50">
              <pre className="whitespace-pre-wrap text-sm text-zinc-800 font-mono leading-relaxed">{simplifiedResult.optimized}</pre>
            </div>
          </div>

          {/* Diff */}
          <details className="rounded-xl border border-zinc-200 bg-white overflow-hidden group">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors list-none">
              <span>View diff — original vs optimized</span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="grid md:grid-cols-2 border-t border-zinc-100">
              <div className="p-4 bg-red-50/40 border-b md:border-b-0 md:border-r border-zinc-100">
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">Original</p>
                <pre className="whitespace-pre-wrap text-xs text-zinc-700 font-mono">{prompt}</pre>
              </div>
              <div className="p-4 bg-emerald-50/40">
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Optimized</p>
                <pre className="whitespace-pre-wrap text-xs text-zinc-700 font-mono">{simplifiedResult.optimized}</pre>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* ── Chunks output ───────────────────────────────────────── */}
      {tabMode === 'chunk' && chunks.length > 0 && (
        <div ref={resultsSectionRef} className="space-y-3 scroll-mt-4">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50">
            <h3 className="text-sm font-semibold text-zinc-900">
              {chunks.length} chunk{chunks.length !== 1 ? 's' : ''} generated
            </h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={copyAllChunks}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors">
                <Copy className="w-3.5 h-3.5" />Copy all
              </button>
              <button type="button" onClick={copyChunksAsJson} title="Copy all chunks as a JSON array"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                <Copy className="w-3.5 h-3.5" />JSON
              </button>
              <button type="button" onClick={downloadChunks}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                <Download className="w-3.5 h-3.5" />.txt
              </button>
              <button type="button" onClick={downloadChunksMarkdown} title="Download as Markdown"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                <Download className="w-3.5 h-3.5" />.md
              </button>
            </div>
          </div>

          {/* Chunk cards */}
          <div className="space-y-3">
            {chunks.map((chunk) => {
              const isExpanded = expandedChunks.has(chunk.id);
              const isCopied = copiedChunks.has(chunk.id);
              const previewLength = 200;
              const canExpand = chunk.content.length > previewLength;
              const displayContent = !isExpanded && canExpand
                ? chunk.content.substring(0, previewLength) + '…'
                : chunk.content;

              return (
                <div key={chunk.id}
                  className={`rounded-xl border bg-white overflow-hidden transition-colors ${
                    chunk.isFirst ? 'border-sky-200' : chunk.isLast ? 'border-emerald-200' : 'border-zinc-200'
                  }`}>
                  {/* Chunk header */}
                  <div className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b ${
                    chunk.isFirst ? 'bg-sky-50/60 border-sky-100' : chunk.isLast ? 'bg-emerald-50/60 border-emerald-100' : 'bg-zinc-50/60 border-zinc-100'
                  }`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        chunk.isFirst ? 'bg-sky-100 text-sky-700'
                          : chunk.isLast ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {chunk.isFirst ? '🚀 Chunk 1 — Start' : chunk.isLast ? '✅ Final chunk' : `Chunk ${chunk.id}`}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">{chunk.wordCount} words · {chunk.charCount} chars</span>
                      {chunk.isFirst && chunks.length > 1 && (
                        <span className="text-[10px] text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">Wait instruction included</span>
                      )}
                      {chunk.isLast && chunks.length > 1 && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Final instruction included</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {canExpand && (
                        <button type="button" onClick={() => toggleChunkExpansion(chunk.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                          {isExpanded ? <><ChevronUp className="w-3.5 h-3.5" />Less</> : <><ChevronDown className="w-3.5 h-3.5" />More</>}
                        </button>
                      )}
                      <button type="button" onClick={() => copyChunk(chunk)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isCopied ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                        }`}>
                        {isCopied ? <><CheckCircle2 className="w-3.5 h-3.5" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                      </button>
                    </div>
                  </div>
                  {/* Chunk content */}
                  <div className="p-4 bg-zinc-50/30">
                    <pre className="whitespace-pre-wrap text-xs text-zinc-700 font-mono leading-relaxed">{displayContent}</pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Empty state hints ───────────────────────────────────── */}
      {tabMode === 'chunk' && chunks.length === 0 && (
        <div className="flex items-start gap-3 px-4 py-4 rounded-xl border border-zinc-200 bg-zinc-50/60">
          <Info className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
          <div className="text-sm text-zinc-600 space-y-1">
            <p className="font-semibold text-zinc-800">How chunking works</p>
            <ul className="list-disc list-inside space-y-0.5 text-[13px]">
              <li>Paste your long prompt — set chunk size and overlap above</li>
              <li>Click <span className="font-semibold">Split into Chunks</span> to generate pieces</li>
              <li>First chunk tells the AI to wait; last chunk triggers the final response</li>
              <li>Copy individual chunks or download as .txt / .md / JSON</li>
            </ul>
          </div>
        </div>
      )}
      {tabMode === 'simplify' && !simplifiedResult && (
        <div className="flex items-start gap-3 px-4 py-4 rounded-xl border border-zinc-200 bg-zinc-50/60">
          <Sparkles className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
          <div className="text-sm text-zinc-600 space-y-1">
            <p className="font-semibold text-zinc-800">How simplification works</p>
            <ul className="list-disc list-inside space-y-0.5 text-[13px]">
              <li>Paste an informal prompt — e.g. "hey can you explain this code and find bugs"</li>
              <li>Choose tone and target model above, then click <span className="font-semibold">Simplify prompt</span></li>
              <li>Get a structured, optimized prompt with analysis and a quality score</li>
              <li>Use the diff view to see exactly what changed</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── Related blog posts ──────────────────────────────────── */}
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
          <h3 className="text-sm font-semibold text-zinc-800">Learn more about prompt engineering</h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {[
            { href: '/blog/ai-prompt-engineering-guide', title: 'AI Prompt Engineering Guide', desc: 'Write effective prompts, best practices, techniques, and templates.' },
            { href: '/blog/chatgpt-real-life-usage-guide', title: 'ChatGPT Real-Life Usage Guide', desc: 'Practical use cases, best prompts, and how to get great results.' },
            { href: '/blog/ai-tools-developers-guide', title: 'AI Tools for Developers', desc: 'Cursor, GitHub Copilot, ChatGPT, and more — when and how to use each.' },
          ].map(({ href, title, desc }) => (
            <Link key={href} href={href}
              className="flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-zinc-50 transition-colors group">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">{title}</p>
                <p className="text-[12px] text-zinc-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <span className="text-zinc-300 group-hover:text-emerald-500 shrink-0 text-lg transition-colors mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

