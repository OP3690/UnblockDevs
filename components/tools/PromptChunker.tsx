'use client';

import { useState, useRef } from 'react';
import { Copy, Scissors, Download, Settings, Info, ChevronDown, ChevronUp, CheckCircle2, Sparkles, BarChart3, Shield, FileText } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Scissors className="w-6 h-6" />
          <h2 className="text-2xl font-bold">AI Prompt Chunker & Simplifier</h2>
        </div>
        <p className="text-purple-100 mb-4">
          Split long prompts into chunks with overlap, or simplify messy prompts into optimized, structured prompts for AI models.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTabMode('chunk')}
            className={`cta-tab-chunk px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${tabMode === 'chunk'
              ? 'bg-cyan-400 text-slate-900 shadow-lg ring-2 ring-white/50'
              : 'bg-white/20 text-white hover:bg-white/30'}`}
            aria-pressed={tabMode === 'chunk'}
            aria-label="Chunk mode"
          >
            <Scissors className="w-4 h-4 flex-shrink-0" />
            Chunk
          </button>
          <button
            type="button"
            onClick={() => setTabMode('simplify')}
            className={`cta-tab-simplify px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${tabMode === 'simplify'
              ? 'bg-amber-400 text-slate-900 shadow-lg ring-2 ring-white/50'
              : 'bg-white/20 text-white hover:bg-white/30'}`}
            aria-pressed={tabMode === 'simplify'}
            aria-label="Simplify mode"
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            Simplify
          </button>
        </div>
      </div>

      {/* Template library */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          Prompt templates
        </h3>
        <div className="flex flex-wrap gap-2">
          {PROMPT_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t.id)}
              className="cta-template px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chunk settings (only when Chunk tab) */}
      {tabMode === 'chunk' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="cta-chunking-settings flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Chunking Settings</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setChunkSize(500);
                setChunkType('words');
                setOverlap(50);
                toast.success('Reset to default settings');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
            >
              Default
            </button>
          </div>
          {showSettings && (
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Chunk Type</label>
                <select
                  value={chunkType}
                  onChange={(e) => setChunkType(e.target.value as 'words' | 'chars')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="words">Words</option>
                  <option value="chars">Characters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chunk Size: {chunkSize} {chunkType === 'words' ? 'words' : 'characters'}
                </label>
                <input
                  type="range"
                  min="100"
                  max={chunkType === 'words' ? '2000' : '5000'}
                  step="50"
                  value={chunkSize}
                  onChange={(e) => setChunkSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>{chunkType === 'words' ? '2000' : '5000'}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Overlap: {overlap}%</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={overlap}
                  onChange={(e) => setOverlap(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Overlap helps preserve context between chunks</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simplifier options (only when Simplify tab) */}
      {tabMode === 'simplify' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Simplify options</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select
                value={simplifierTone}
                onChange={(e) => setSimplifierTone(e.target.value as Tone)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="professional">Professional</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="beginner">Beginner friendly</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model style</label>
              <select
                value={simplifierModel}
                onChange={(e) => setSimplifierModel(e.target.value as ModelStyle)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="neutral">Neutral</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input
                type="checkbox"
                id="simplifier-safety"
                checked={simplifierSafety}
                onChange={(e) => setSimplifierSafety(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="simplifier-safety" className="text-sm text-gray-700 flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                Scan & mask secrets (API keys, tokens)
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Prompt</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{totalWords} words</span>
            <span>•</span>
            <span>{totalChars} characters</span>
          </div>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your long AI prompt here...&#10;&#10;Example:&#10;You are an expert developer. Create a REST API with the following requirements: [detailed requirements]..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-y"
        />
        
        <div className="flex gap-3 mt-4">
          {tabMode === 'chunk' ? (
            <button
              type="button"
              onClick={splitIntoChunks}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Scissors className="w-5 h-5" />
              Split into Chunks
            </button>
          ) : (
            <button
              type="button"
              onClick={runSimplify}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Simplify prompt
            </button>
          )}
          <button
            type="button"
            onClick={clearAll}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Simplifier result: analysis + optimized output + diff */}
      {tabMode === 'simplify' && simplifiedResult && (
        <div ref={resultsSectionRef} className="space-y-4">
          <div className="bg-white rounded-lg border-2 border-purple-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase">Intent</span>
                <p className="font-semibold text-gray-800 capitalize">{simplifiedResult.intent}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase">Domain</span>
                <p className="font-semibold text-gray-800 capitalize">{simplifiedResult.domain}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase">Prompt quality score</span>
                <p className="font-semibold text-gray-800">{simplifiedResult.score}/100</p>
                {simplifiedResult.scoreSuggestions.length > 0 && (
                  <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                    {simplifiedResult.scoreSuggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase">Suggested output format</span>
                <p className="text-sm text-gray-700">{simplifiedResult.outputFormat}</p>
              </div>
            </div>
            {simplifiedResult.masked.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-800">
                  Masked: {simplifiedResult.masked.map((m) => `${m.label} (${m.count})`).join(', ')}
                </span>
              </div>
            )}
            {simplifiedResult.suggestions.length > 0 && (
              <div className="mt-3">
                <span className="text-xs font-medium text-gray-500 uppercase">Suggestions</span>
                <ul className="text-sm text-gray-700 list-disc list-inside mt-1">
                  {simplifiedResult.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg border-2 border-green-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Optimized prompt</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">~{simplifiedResult.tokenEstimate} tokens</span>
                <button
                  type="button"
                  onClick={copySimplified}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    simplifiedCopied ? 'bg-green-100 text-green-700' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {simplifiedCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {simplifiedCopied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{simplifiedResult.optimized}</pre>
            </div>
          </div>

          <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <summary className="p-4 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50">
              View diff (original vs optimized)
            </summary>
            <div className="grid md:grid-cols-2 gap-0 border-t border-gray-200">
              <div className="p-4 bg-red-50/50 border-r border-gray-200">
                <p className="text-xs font-semibold text-red-700 uppercase mb-2">Original</p>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{prompt}</pre>
              </div>
              <div className="p-4 bg-green-50/50">
                <p className="text-xs font-semibold text-green-700 uppercase mb-2">Optimized</p>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{simplifiedResult.optimized}</pre>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Chunks Display (only when Chunk tab) */}
      {tabMode === 'chunk' && chunks.length > 0 && (
        <div ref={resultsSectionRef} className="space-y-4 scroll-mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Chunks ({chunks.length})
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyAllChunks}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                <Copy className="w-4 h-4" />
                Copy All
              </button>
              <button
                type="button"
                onClick={downloadChunks}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {chunks.map((chunk) => {
              const isExpanded = expandedChunks.has(chunk.id);
              const isCopied = copiedChunks.has(chunk.id);
              const previewLength = 200;
              const canExpand = chunk.content.length > previewLength;
              const showPreview = !isExpanded && canExpand;
              const displayContent = showPreview 
                ? chunk.content.substring(0, previewLength) + '...' 
                : chunk.content;

              return (
                <div
                  key={chunk.id}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        chunk.isFirst 
                          ? 'bg-blue-100 text-blue-700' 
                          : chunk.isLast 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {chunk.isFirst ? '🚀 Chunk 1 (Start)' : chunk.isLast ? '✅ Final Chunk' : `Chunk ${chunk.id}`}
                      </span>
                      <span className="text-sm text-gray-600">
                        {chunk.wordCount} words • {chunk.charCount} chars
                      </span>
                      {chunk.isFirst && chunks.length > 1 && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          Wait instruction included
                        </span>
                      )}
                      {chunk.isLast && chunks.length > 1 && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Final instruction included
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {canExpand && (
                        <button
                          type="button"
                          onClick={() => toggleChunkExpansion(chunk.id)}
                          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              View Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View More
                            </>
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => copyChunk(chunk)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
                          isCopied
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {isExpanded ? (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {chunk.content}
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {displayContent}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Section */}
      {tabMode === 'chunk' && chunks.length === 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">How to use (Chunk):</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Paste your long AI prompt in the text area above</li>
                <li>Configure chunk size and overlap in settings</li>
                <li>Click &quot;Split into Chunks&quot; to generate manageable pieces</li>
                <li>Copy individual chunks or download all chunks as a file</li>
                <li>Overlap helps preserve context between chunks for better AI understanding</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {tabMode === 'simplify' && !simplifiedResult && (
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">How to use (Simplify):</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Paste a messy or informal prompt (e.g. &quot;hey can you explain this code and find bugs&quot;)</li>
                <li>Choose tone and model style if desired</li>
                <li>Click &quot;Simplify prompt&quot; to get a structured, optimized prompt</li>
                <li>Copy the optimized prompt and use it in ChatGPT, Claude, or Gemini</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About AI & Prompt Engineering</h2>
        <div className="space-y-3">
          <Link
            href="/blog/ai-prompt-engineering-guide"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">AI Prompt Engineering Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to AI prompt engineering: how to write effective prompts, best practices, techniques, and templates.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/chatgpt-real-life-usage-guide"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">ChatGPT Real-Life Usage Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to using ChatGPT in real life: practical use cases, best prompts, when to use it, and how to get great results.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/ai-tools-developers-guide"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">AI Tools for Developers: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Complete guide to AI tools for developers: Cursor, GitHub Copilot, ChatGPT, and more. Learn how, what, when to use each tool.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

