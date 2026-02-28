'use client';

import { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Download, Undo2, Redo2, FileSpreadsheet, Code2, GitCompare, FileCode, FileSearch, BarChart3, Code, Server, Database, Settings, FileText, Bookmark, X, Wrench, TrendingUp, Mail, Scissors, Key, Clock, Network, AlertTriangle, Copy, ChevronDown, ChevronUp, Play, ShieldCheck, Shield, Lock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PersonalizationManager, ToolTab } from '@/lib/personalization';
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget';
import JsonInput from '@/components/JsonInput';
// Below-fold / non-critical: lazy load to reduce initial JS (LCP)
const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'), { ssr: false, loading: () => null });
const FeedbackForm = dynamic(() => import('@/components/FeedbackForm'), { ssr: false, loading: () => null });
const CommissionDisclosure = dynamic(() => import('@/components/CommissionDisclosure'), { ssr: false, loading: () => null });
import DataTable from '@/components/DataTable';
import SectionManager from '@/components/SectionManager';
import JsonBeautifier from '@/components/JsonBeautifier';
import JsonFixer from '@/components/tools/JsonFixer';

// Lazy load tool components for better performance
const ApiComparator = dynamic(() => import('@/components/tools/ApiComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const JsonComparator = dynamic(() => import('@/components/tools/JsonComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const SchemaGenerator = dynamic(() => import('@/components/tools/SchemaGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const LogExplorer = dynamic(() => import('@/components/tools/LogExplorer'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const PayloadAnalyzer = dynamic(() => import('@/components/tools/PayloadAnalyzer'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const CurlConverter = dynamic(() => import('@/components/tools/CurlConverter'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const MockApiGenerator = dynamic(() => import('@/components/tools/MockApiGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const TestDataGenerator = dynamic(() => import('@/components/tools/TestDataGenerator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const ConfigComparator = dynamic(() => import('@/components/tools/ConfigComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const SqlFormatter = dynamic(() => import('@/components/tools/SqlFormatter'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const JsonBuilder = dynamic(() => import('@/components/tools/JsonBuilder'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const DataInsights = dynamic(() => import('@/components/tools/DataInsights'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const PromptChunker = dynamic(() => import('@/components/tools/PromptChunker'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const TokenComparator = dynamic(() => import('@/components/tools/TokenComparator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const TimezoneTranslator = dynamic(() => import('@/components/tools/TimezoneTranslator'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
const HarToCurl = dynamic(() => import('@/components/tools/HarToCurl'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});
import {
  jsonToRows,
  extractColumns,
  FlattenedRow,
  Column,
} from '@/lib/jsonParser';
import { exportToExcel } from '@/lib/excelExporter';
import { exportToCSV } from '@/lib/csvExporter';
import { HistoryManager } from '@/lib/history';

interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

// Mapping of tool tabs to their page URLs (except 'converter' which stays on homepage)
const toolPageUrls: Record<Exclude<ToolTab, 'converter'>, string> = {
  beautifier: '/json-beautifier',
  fixer: '/json-fixer-online',
  comparator: '/api-comparator',
  jsoncompare: '/json-comparator',
  schema: '/json-schema-generation',
  logs: '/log-explorer',
  payload: '/payload-analyzer',
  curl: '/curl-converter',
  mock: '/mock-api-generator',
  testdata: '/test-data-generator',
  config: '/config-comparator',
  sql: '/sql-formatter',
  builder: '/json-builder',
  promptchunk: '/prompt-chunker',
  schemamasker: '/ai-schema-masker',
  jsonpromptshield: '/json-prompt-shield',
  tokencompare: '/token-comparator',
  timezone: '/timezone-translator',
  hartocurl: '/har-to-curl',
  curlfailure: '/curl-failure-root-cause-engine',
};

function HomeClient() {
  const [activeTab, setActiveTab] = useState<ToolTab>('beautifier');
  const [rows, setRows] = useState<FlattenedRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [removedColumns, setRemovedColumns] = useState<Set<string>>(new Set());
  const [historyManager] = useState(() => new HistoryManager(10));
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState<boolean>(false);
  const [samplePanelOpen, setSamplePanelOpen] = useState<boolean>(true);

  // Sample JSON for engagement: live demo snippet and interactive panel
  const SAMPLE_JSON_FORMATTED = `{
  "name": "Live demo",
  "items": [1, 2, 3],
  "nested": {
    "key": "value"
  }
}`;

  const copySampleJson = useCallback(() => {
    navigator.clipboard.writeText(SAMPLE_JSON_FORMATTED).then(() => toast.success('Copied to clipboard')).catch(() => toast.error('Copy failed'));
  }, []);
  const downloadSampleJson = useCallback(() => {
    const blob = new Blob([SAMPLE_JSON_FORMATTED], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sample.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded sample.json');
  }, []);

  // Function to show Buy Me a Coffee message (dismisses previous toast first)
  const showBuyMeACoffeeMessage = useCallback(() => {
    // Dismiss any existing toast first
    toast.dismiss();
    // Show new toast after a small delay to ensure previous one is dismissed
    setTimeout(() => {
      toast.success('You have a wonderful day!!!', {
        duration: 3000,
        icon: '☕',
        id: 'buy-me-coffee-message', // Use same ID so it replaces previous toast
      });
    }, 50);
  }, []);

  // Handle tab change with message - memoized to prevent unnecessary re-renders
  const handleTabChange = useCallback((tab: ToolTab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      showBuyMeACoffeeMessage();
    } else {
      setActiveTab(tab);
    }
  }, [activeTab, showBuyMeACoffeeMessage]);


  // Mark as mounted immediately on client side
  useEffect(() => {
    // Ensure we're on client side
    if (typeof window !== 'undefined') {
      setMounted(true);
      
      // Check for tab parameter in URL (e.g., ?tab=curl or ?tab=schema)
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['converter', 'beautifier', 'fixer', 'comparator', 'jsoncompare', 'schema', 'logs', 'payload', 'curl', 'mock', 'testdata', 'config', 'sql', 'builder', 'promptchunk', 'schemamasker', 'jsonpromptshield', 'tokencompare', 'timezone', 'hartocurl', 'curlfailure'].includes(tabParam)) {
        setActiveTab(tabParam as ToolTab);
        // Scroll to top when tab is set from URL
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Check if bookmark prompt was dismissed
      const dismissed = localStorage.getItem('bookmarkPromptDismissed');
      if (!dismissed) {
        // Show after 10 seconds for better UX
        const timer = setTimeout(() => {
          setShowBookmarkPrompt(true);
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismissBookmarkPrompt = () => {
    setShowBookmarkPrompt(false);
    localStorage.setItem('bookmarkPromptDismissed', 'true');
  };

  // Initialize Google AdSense (script loads deferred after LCP; retry until it's ready)
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const initAdSense = () => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        if ((window as any).adsbygoogle.loaded !== true) {
          ((window as any).adsbygoogle as any[]).push({});
        }
      } catch (_) {}
    };
    initAdSense();
    const t1 = setTimeout(initAdSense, 800);
    const t2 = setTimeout(initAdSense, 2500);
    const t3 = setTimeout(initAdSense, 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mounted]);

  // Initialize Ezoic ads with error handling
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const initEzoicAds = () => {
        try {
          // Check if Ezoic is available and site is approved
          if ((window as any).ezstandalone && (window as any).ezstandalone.cmd) {
            (window as any).ezstandalone.cmd.push(function() {
              try {
                if (typeof (window as any).ezstandalone.showAds === 'function') {
                  (window as any).ezstandalone.showAds();
                }
              } catch (e: any) {
                // Silently handle Ezoic errors (site may not be approved yet)
                const errorMsg = e?.message || String(e);
                if (!errorMsg.includes('Monetization not allowed') && 
                    !errorMsg.includes('visit_uuid')) {
                console.debug('Ezoic ads initialization skipped:', e);
                }
              }
            });
          }
        } catch (e: any) {
          // Silently handle Ezoic errors
          const errorMsg = e?.message || String(e);
          if (!errorMsg.includes('Monetization not allowed') && 
              !errorMsg.includes('visit_uuid')) {
          console.debug('Ezoic ads not available:', e);
          }
        }
      };
      
      // Try after a delay to ensure script is loaded
      const timer = setTimeout(initEzoicAds, 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Refresh Ezoic ads when tab changes (for dynamic content)
  // Refresh ads when user switches tabs (Ezoic + AdSense)
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    try {
      if ((window as any).ezstandalone?.cmd) {
        (window as any).ezstandalone.cmd.push(function() {
          try {
            if (typeof (window as any).ezstandalone.showAds === 'function') {
              (window as any).ezstandalone.showAds();
            }
          } catch (_) {}
        });
      }
      if ((window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (_) {}
  }, [activeTab, mounted]);

  // Track visits and active users using API
  useEffect(() => {
    if (!mounted) return;
    
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setTotalVisits(data.totalVisits || 0);
          setActiveUsers(data.activeUsers || 0);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();

    const heartbeatInterval = setInterval(async () => {
      try {
        await fetch('/api/stats', {
          method: 'POST',
          credentials: 'include',
        });
        fetchStats();
      } catch (error) {
        console.error('Failed to send heartbeat:', error);
      }
    }, 30000);

    const statsInterval = setInterval(fetchStats, 10000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(statsInterval);
    };
  }, [mounted]);

  const saveToHistory = useCallback(() => {
    historyManager.push({
      rows: JSON.parse(JSON.stringify(rows)),
      columns: JSON.parse(JSON.stringify(columns)),
      sections: JSON.parse(JSON.stringify(sections)),
    });
  }, [rows, columns, sections, historyManager]);

  // Memoize visible columns to prevent unnecessary recalculations
  const visibleColumns = useMemo(() => 
    columns.filter((col) => !removedColumns.has(col.id)),
    [columns, removedColumns]
  );

  // Memoize filtered sections to prevent unnecessary recalculations
  const filteredSections = useMemo(() => 
    sections.map((section) => ({
      ...section,
      columnIds: section.columnIds.filter((id) => !removedColumns.has(id)),
    })),
    [sections, removedColumns]
  );

  const handleJsonSubmit = (data: any) => {
    try {
      const flattenedRows = jsonToRows(data);
      const extractedColumns = extractColumns(flattenedRows);
      
      setRows(flattenedRows);
      setColumns(extractedColumns);
      setSections([]);
      setRemovedColumns(new Set());
      historyManager.clear();
      historyManager.push({
        rows: flattenedRows,
        columns: extractedColumns,
        sections: [],
      });
      toast.success('JSON parsed successfully!');
    } catch (error: any) {
      toast.error(`Failed to parse JSON: ${error.message}`);
    }
  };

  const handleSectionsChange = (newSections: Section[]) => {
    setSections(newSections);
    saveToHistory();
  };

  const handleColumnMove = (columnId: string, fromSectionId: string | null, toSectionId: string | null) => {
    const newSections = [...sections];
    
    if (fromSectionId) {
      const fromSection = newSections.find(s => s.id === fromSectionId);
      if (fromSection) {
        fromSection.columnIds = fromSection.columnIds.filter(id => id !== columnId);
      }
    }
    
    if (toSectionId) {
      const toSection = newSections.find(s => s.id === toSectionId);
      if (toSection) {
        toSection.columnIds.push(columnId);
      }
    } else {
      // Moving to unassigned - no action needed as columns are automatically unassigned
    }
    
    setSections(newSections);
    saveToHistory();
  };

  const handleCellEdit = (rowIndex: number, columnId: string, newValue: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [columnId]: newValue };
    setRows(newRows);
    saveToHistory();
  };

  const handleColumnRename = (columnId: string, newName: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, name: newName } : col
    );
    setColumns(newColumns);
    saveToHistory();
    toast.success('Column renamed successfully');
  };

  const handleRowDelete = (rowIndex: number) => {
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
    saveToHistory();
    toast.success('Row deleted successfully');
  };

  const handleUndo = () => {
    const state = historyManager.undo();
    if (state) {
      setRows(state.rows);
      setColumns(state.columns);
      setSections(state.sections);
      toast.success('Undone');
    } else {
      toast.error('Nothing to undo');
    }
  };

  const handleRedo = () => {
    const state = historyManager.redo();
    if (state) {
      setRows(state.rows);
      setColumns(state.columns);
      setSections(state.sections);
      toast.success('Redone');
    } else {
      toast.error('Nothing to redo');
    }
  };

  const handleRemoveColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.add(columnId);
      return newSet;
    });
    saveToHistory();
    toast.success('Column removed from table and export');
  };

  const handleRemoveAllUnassigned = (unassignedColumnIds: string[]) => {
    if (unassignedColumnIds.length === 0) {
      toast.error('No unassigned columns to remove (all columns are in sections)');
      return;
    }

    const safeToRemove = unassignedColumnIds.filter(id => !removedColumns.has(id));

    if (safeToRemove.length === 0) {
      toast.error('No unassigned columns to remove (all columns are in sections)');
      return;
    }

    if (typeof window !== 'undefined' && window.confirm(`Are you sure you want to remove ${safeToRemove.length} unassigned column(s) from the table and export?`)) {
      setRemovedColumns((prev) => {
        const newSet = new Set(prev);
        safeToRemove.forEach(id => newSet.add(id));
        return newSet;
      });
      saveToHistory();
      toast.success(`${safeToRemove.length} unassigned column(s) removed from table and export`);
    }
  };

  const handleRestoreColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.delete(columnId);
      return newSet;
    });
    saveToHistory();
    toast.success('Column restored to table and export');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-slate-50/90 via-white/40 to-slate-100/90">
      <BuyMeACoffeeWidget />
      {/* Skip to main content for keyboard and screen reader users */}
      <a
        href="#main-content"
        className="absolute left-[-9999px] w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:z-[100] focus:w-auto focus:h-auto focus:overflow-visible focus:px-4 focus:py-3 focus:bg-white focus:text-gray-900 focus:font-semibold focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      {/* Bookmark Prompt Banner */}
      {showBookmarkPrompt && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md border-b border-blue-500/30 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                  <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base leading-tight">
                    📌 Bookmark this page for quick access to all developer tools!
                  </p>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
                    Press <kbd className="px-2 py-1 bg-white/20 rounded-md text-xs font-mono font-semibold">Ctrl+D</kbd> (Windows/Linux) or <kbd className="px-2 py-1 bg-white/20 rounded-md text-xs font-mono font-semibold">Cmd+D</kbd> (Mac) to bookmark
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismissBookmarkPrompt}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                aria-label="Dismiss bookmark prompt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Professional layout */}
      <header role="banner" className={`bg-white/95 backdrop-blur-sm border-b border-gray-200/80 ${showBookmarkPrompt ? 'sticky top-[73px]' : 'sticky top-0'} z-40 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar: logo left, nav right */}
          <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group">
              <Link href="/" className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Wrench className="h-5 w-5" aria-hidden />
              </Link>
              <div className="flex flex-col gap-1 min-w-0 justify-center py-0.5">
                <Link href="/" className="min-w-0">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary-700 transition-colors leading-tight" style={{ letterSpacing: '-0.02em' }}>UnblockDevs</span>
                  <p className="hidden sm:block text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Developer tools for daily use</p>
                </Link>
                <div className="hidden sm:flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-sm">🔒 No data stored</span>
                  <span className="text-gray-300 font-medium" aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 border border-blue-200 shadow-sm">💻 100% in-browser</span>
                  <span className="text-gray-300 font-medium" aria-hidden>·</span>
                  <Link href={toolPageUrls.schemamasker} className="inline-flex items-center gap-1 rounded-md bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 border border-violet-200 shadow-sm hover:bg-violet-200/80 transition-colors">🛡️ AI Data Masker</Link>
                  <span className="text-gray-300 font-medium" aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200 shadow-sm">✓ No signup</span>
                  <span className="text-gray-300 font-medium hidden md:inline" aria-hidden>·</span>
                  <Link href={toolPageUrls.schemamasker} className="hidden md:inline-flex items-center rounded-md bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800 border border-primary-200 shadow-sm hover:bg-primary-200/80 transition-colors">Use AI without leaking your data</Link>
                </div>
              </div>
            </div>
            <div id="ezoic-pub-ad-placeholder-100" className="hidden lg:block flex-1 min-w-0" />
            <nav className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0" aria-label="Main navigation">
              <div className="hidden"><ins className="adsbygoogle" style={{ display: 'block', minWidth: '300px', minHeight: '100px' }} data-ad-client="ca-pub-6349841658473646" data-ad-slot="HEADER_AD_SLOT" data-ad-format="auto" data-full-width-responsive="false" /></div>
              <Link href="/blog" className="px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-pro hover:shadow-pro-md transition-all duration-200" aria-label="Developer's Study Materials">
                <FileText className="h-4 w-4 sm:hidden" aria-hidden />
                <span className="hidden sm:inline">Developer's Study Materials 📚</span>
              </Link>
              <Link href="/about" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg border border-transparent hover:border-primary-200/80 transition-all duration-200">About</Link>
            </nav>
          </div>

          {/* Tool tabs — compact grid, clear labels, small badges */}
          <div className="border-t border-gray-200/80 bg-gradient-to-b from-gray-50 to-white/80 px-3 sm:px-4 py-3">
<div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider sm:shrink-0">Developer&apos;s Daily Tools</p>
              <div className="flex justify-center sm:flex-1">
                <p className="text-sm text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/80 rounded-md px-3 py-1.5 inline-flex items-center">
                  <Lock className="w-4 h-4 mr-2 shrink-0" aria-hidden />
                  100% client-side — your data never leaves your device.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 content-stretch">
            <button
              onClick={() => handleTabChange('beautifier')}
              className={`group tab-card w-full px-2.5 py-2 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 min-h-[2.75rem] ${
                activeTab === 'beautifier'
                  ? 'bg-primary-50 border-primary-300 text-primary-800 shadow-sm'
                  : 'bg-white/90 border-gray-200/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Code2 className="w-4 h-4 flex-shrink-0 text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">JSON Beautifier</span>
            </button>
            <Link href={toolPageUrls.sql} className="group tab-card relative w-full px-2.5 py-2 pr-8 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Database className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0 flex-1">SQL Formatter</span>
              <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-100 text-red-600">Hot</span>
            </Link>
            <Link href={toolPageUrls.schemamasker} className="group tab-card relative w-full px-2.5 py-2 pr-8 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0 flex-1">Schema Masker</span>
              <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-600">AI</span>
            </Link>
            <Link href={toolPageUrls.jsonpromptshield} className="group tab-card relative w-full px-2.5 py-2 pr-8 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Shield className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0 flex-1">JSON Shield</span>
              <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-600">AI</span>
            </Link>
            <Link href={toolPageUrls.promptchunk} className="group tab-card relative w-full px-2.5 py-2 pr-8 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Scissors className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0 flex-1">Prompt Chunker</span>
              <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-600">AI</span>
            </Link>
            <Link href={toolPageUrls.tokencompare} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Key className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Token Compare</span>
            </Link>
            <button
              onClick={() => handleTabChange('converter')}
              className={`group tab-card w-full px-2.5 py-2 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 min-h-[2.75rem] ${
                activeTab === 'converter'
                  ? 'bg-primary-50 border-primary-300 text-primary-800 shadow-sm'
                  : 'bg-white/90 border-gray-200/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Json to Excel</span>
            </button>
            <Link href={toolPageUrls.fixer} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Wrench className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">JSON Fixer</span>
            </Link>
            <Link href={toolPageUrls.builder} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <FileSpreadsheet className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">JSON Builder</span>
            </Link>
            <Link href={toolPageUrls.comparator} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <GitCompare className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">API Compare</span>
            </Link>
            <Link href={toolPageUrls.jsoncompare} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <GitCompare className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">JSON Compare</span>
            </Link>
            <Link href={toolPageUrls.schema} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <FileCode className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Schema</span>
            </Link>
            <Link href={toolPageUrls.logs} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <FileSearch className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Logs Analyzer</span>
            </Link>
            <Link href={toolPageUrls.payload} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <BarChart3 className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Payload</span>
            </Link>
            <Link href={toolPageUrls.curl} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Code className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Convert Curl</span>
            </Link>
            <Link href={toolPageUrls.mock} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Server className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Mock API</span>
            </Link>
            <Link href={toolPageUrls.testdata} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Database className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Test Data</span>
            </Link>
            <Link href={toolPageUrls.config} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Settings className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Config</span>
            </Link>
            <Link href={toolPageUrls.timezone} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Clock className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">Timezone</span>
            </Link>
            <Link href={toolPageUrls.hartocurl} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <Network className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">HAR to cURL</span>
            </Link>
            <Link href={toolPageUrls.curlfailure} className="group tab-card w-full px-2.5 py-2 rounded-xl border border-gray-200/90 bg-white/90 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center gap-2 min-h-[2.75rem]">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-primary-600" />
              <span className="text-xs font-medium break-words min-w-0">cURL Analyzer</span>
            </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Ad strip - compact so tool content sits closer to tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-gray-100/80 bg-white/30">
        <div id="ezoic-pub-ad-placeholder-101" className="min-h-[50px] flex items-center justify-center" />
      </div>

      {/* Tab-change ad: remounts when user switches tabs so ads refresh */}
      <div key={activeTab} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-gray-100/80 bg-white/30">
        <div id="ezoic-pub-ad-placeholder-111" className="min-h-[90px] flex items-center justify-center" aria-label="Advertisement" />
      </div>

      {/* Main Content - Professional layout */}
      <main id="main-content" role="main" className={`flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 animate-fade-in ${activeTab === 'beautifier' ? 'pt-0 pb-10 sm:pb-14 lg:pb-16' : 'py-10 sm:py-14 lg:py-16'}`}>
        {activeTab === 'beautifier' && (
          <div className="max-w-4xl mx-auto -mt-6 sm:-mt-8">
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-pro-lg border border-gray-100/90 p-5 sm:p-6 lg:p-8">
              <JsonBeautifier />
            </div>
          </div>
        )}
        {activeTab === 'converter' && (
          rows.length === 0 ? (
            <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
              {/* Hero: title + input */}
              <header className="pt-4 sm:pt-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '-0.02em' }}>JSON Viewer Tools</h1>
                <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed">Free online formatter, parser & viewer. Paste JSON to view, format, or convert to Excel/CSV.</p>
                <div id="json-input-section" className="scroll-mt-6">
                  <JsonInput onJsonSubmit={handleJsonSubmit} />
                </div>
              </header>

              <hr className="border-gray-200" aria-hidden="true" />

              {/* Overview */}
              <section className="text-center" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="text-base font-semibold text-gray-900 mb-2 uppercase tracking-wider text-gray-500">Overview</h2>
                <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">JSON Viewer, Formatter, and Parser in your browser. No signup.</p>
              </section>

              {/* Key Features */}
              <section className="text-center" aria-labelledby="key-features-heading">
                <h2 id="key-features-heading" className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none">
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow duration-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">JSON Viewer Online</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">View and navigate JSON with a tree view.</p>
                  </li>
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow duration-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Formatter & Beautifier</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">Format and prettify JSON.</p>
                  </li>
                  <li className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow transition-shadow duration-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Parser & Validator</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">Parse, validate, fix malformed JSON.</p>
                  </li>
                </ul>
              </section>

              {/* Example JSON */}
              <section className="w-full" aria-label="Example JSON">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSamplePanelOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-left font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <span>Example JSON — try it live</span>
                    {samplePanelOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {samplePanelOpen && (
                    <div className="p-4 space-y-3">
                      <pre className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg overflow-x-auto border border-gray-100 font-mono whitespace-pre-wrap break-words">
                        {SAMPLE_JSON_FORMATTED}
                      </pre>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={copySampleJson}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={downloadSampleJson}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <a
                          href="#json-input-section"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Use in viewer
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Try more tools */}
              <section className="rounded-2xl border border-gray-200/80 bg-white/95 p-6 sm:p-8 text-center shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Try more tools</h2>
                <p className="text-gray-600 text-sm mb-5 max-w-lg mx-auto">Edit, validate, convert JSON. No signup.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link href="#json-input-section" className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                    JSON Viewer
                  </Link>
                  <Link href="/json-beautifier" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Code2 className="w-3.5 h-3.5" />
                    Formatter
                  </Link>
                  <Link href="/json-fixer-online" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Wrench className="w-3.5 h-3.5" />
                    Validator
                  </Link>
                  <Link href="/json-schema-generation" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <FileCode className="w-3.5 h-3.5" />
                    Schema
                  </Link>
                  <Link href="/json-comparator" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <GitCompare className="w-3.5 h-3.5" />
                    Compare
                  </Link>
                </div>
                <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Mini-tour</p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside inline-block text-left">
                    <li>Paste your JSON above (or use the example panel)</li>
                    <li>View, format, validate, or convert to CSV/Excel</li>
                    <li>Download or copy—no signup required</li>
                  </ol>
                </div>
              </section>

              {/* Footer CTA + links */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 text-center shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Free JSON Tools for Developers</h2>
                <p className="text-gray-500 text-xs mb-4 max-w-md mx-auto">Paste JSON to view, format, validate, or convert. No signup—data stays private.</p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                  <a href="#json-input-section" className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Open JSON Viewer
                  </a>
                  <Link href="/json-beautifier" className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Try Formatter
                  </Link>
                </div>
                <nav className="pt-5 border-t border-gray-200" aria-label="JSON tools navigation">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Related tools</p>
                  <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-sm">
                  <li><Link href="/tools/json" className="text-blue-600 hover:underline font-medium">All JSON tools</Link></li>
                  <li><Link href="/#json-input-section" className="text-blue-600 hover:underline">JSON viewer online</Link></li>
                  <li><Link href="/json-beautifier" className="text-blue-600 hover:underline">JSON formatter online</Link></li>
                  <li><Link href="/#json-input-section" className="text-blue-600 hover:underline">JSON parser online</Link></li>
                  <li><Link href="/#json-input-section" className="text-blue-600 hover:underline">JSON to CSV/Excel/Table</Link></li>
                  <li><Link href="/json-fixer-online" className="text-blue-600 hover:underline">JSON validator</Link></li>
                  <li><Link href="/json-beautifier" className="text-blue-600 hover:underline">JSON beautifier</Link></li>
                  <li><Link href="/json-schema-generation" className="text-blue-600 hover:underline">JSON schema generator</Link></li>
                  <li><Link href="/json-comparator" className="text-blue-600 hover:underline">JSON comparator</Link></li>
                  </ul>
                </nav>
              </div>
              <CommissionDisclosure variant="belowInput" />
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <button
                  onClick={() => {
                    setRows([]);
                    setColumns([]);
                    setSections([]);
                    historyManager.clear();
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                >
                  ← Load New JSON
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8">
              <SectionManager
                sections={sections}
                columns={columns}
                removedColumns={removedColumns}
                onSectionsChange={handleSectionsChange}
                onColumnMove={handleColumnMove}
                onRemoveColumn={handleRemoveColumn}
                onRemoveAllUnassigned={handleRemoveAllUnassigned}
                onRestoreColumn={handleRestoreColumn}
              />

              <DataTable
                rows={rows}
                columns={visibleColumns}
                sections={filteredSections}
                removedColumns={removedColumns}
                onCellEdit={handleCellEdit}
                onColumnRename={handleColumnRename}
                onRowDelete={handleRowDelete}
              />
              </div>
            </>
          )
        )}
      </main>

      {/* Services Section - show on home page (Beautifier only) */}
      {activeTab === 'beautifier' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          {/* Hero Section */}
          <div className="text-center mb-14 sm:mb-16 lg:mb-20 bg-gradient-to-br from-emerald-50/90 via-indigo-50/70 to-violet-50/70 rounded-2xl p-8 sm:p-10 lg:p-14 border border-emerald-100/60 shadow-pro-lg">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              AI-Safe Tools — Data Security &amp; Privacy First
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              <strong>UnblockDevs</strong> lets you use <strong>AI</strong> for SQL and JSON without exposing real schemas or sensitive data. <strong>Data masking</strong>, <strong>client-side only</strong>, <strong>no server storage</strong>. Mask before you send to ChatGPT—restore after. Plus JSON, API, and 19+ tools. No signup, no install.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ AI Schema Masker (SQL)</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON Shield (Payload Masking)</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ 100% Data Security</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ No Data Storage</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Client-Side Only</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Compliance-Friendly</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Reversible Masking</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON &amp; API Tools</span>
            </div>
          </div>
          
          {/* AI Safety, Privacy & Secure Masking Tools Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-emerald-50 via-violet-50/50 to-indigo-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-emerald-100 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">AI Safety, Privacy &amp; Secure Data Masking</h2>
              <p className="text-gray-700 text-center text-sm sm:text-base max-w-2xl mx-auto">
                Use <strong>AI</strong> for SQL and JSON without exposing real schemas or sensitive data. Our tools run <strong>100% client-side</strong>—nothing leaves your browser. <strong>AI safety</strong> and <strong>privacy</strong> first: mask before you send, restore after you get AI help.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* JSON Shield */}
                <div className="bg-white rounded-xl p-6 border border-violet-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-violet-600 flex-shrink-0" />
                    JSON Shield
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Mask <strong>JSON payloads</strong> before sending to ChatGPT or any AI. Keys become <strong>K_00001</strong>, string values become <strong>S_00001</strong>; numbers stay unchanged. Preserve structure, restore exactly. Perfect for <strong>API payloads</strong>, logs, and configs—<strong>no data leaves your browser</strong>.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Mask keys &amp; string values; keep numbers</li>
                    <li>• Deterministic, fully reversible mapping</li>
                    <li>• Client-side only; enterprise-safe</li>
                    <li>• Handles large payloads (MBs)</li>
                  </ul>
                  <Link href="/json-prompt-shield" className="mt-3 inline-block text-sm font-semibold text-violet-600 hover:text-violet-700">Try JSON Shield →</Link>
                </div>

                {/* SQL Mask / AI Schema Masker */}
                <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    SQL Mask
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Mask <strong>table and column names</strong> in raw SQL before sending to AI. Tables → <strong>T_00001</strong>, columns → <strong>C_00001</strong>. Compiler-level, token-aware masking—no regex, no broken strings. Send masked SQL to AI, paste the response, <strong>restore</strong> to real names in one click.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Hide database schema from AI</li>
                    <li>• Deterministic reversible mapping</li>
                    <li>• Client-side only; no server, no logging</li>
                    <li>• Handles procedures, CTEs, complex SQL</li>
                  </ul>
                  <Link href="/ai-schema-masker" className="mt-3 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700">Try AI Schema Masker →</Link>
                </div>

                {/* MySQL Mask */}
                <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    MySQL Mask
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Use <strong>AI for MySQL</strong> without exposing your schema. Same engine as SQL Mask: define tables and columns (or paste MySQL), get masked prompts. Build <strong>AI-safe prompts</strong> with optional <strong>JOIN</strong> definitions. Restore AI output to run in your MySQL database—<strong>privacy</strong> and <strong>compliance</strong> preserved.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Anonymize MySQL schema for AI</li>
                    <li>• Prompt compiler with JOIN support</li>
                    <li>• No server storage; no schema logging</li>
                    <li>• FinTech, healthcare, banking friendly</li>
                  </ul>
                  <Link href="/ai-schema-masker" className="mt-3 inline-block text-sm font-semibold text-amber-600 hover:text-amber-700">Try AI Schema Masker →</Link>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-5 border border-emerald-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Why AI safety and privacy matter</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Sending raw <strong>SQL</strong> or <strong>JSON</strong> to AI can leak business logic, table names, and sensitive identifiers. Many policies forbid sharing schema with third parties. Our masking tools let you get <strong>AI help</strong> while keeping data on your device: mask → send only placeholders → restore. <strong>100% data security</strong>, client-side only.
                </p>
              </div>
            </div>
          </div>
          
          {/* AI, JSON, Safety & Client-Side Tools Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI-Safe JSON &amp; SQL Tools — Security First, Client-Side Only</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-6">
                All tools run <strong>100% in your browser</strong>. <strong>No data storage</strong> on our servers—no uploads, no logging. Your <strong>JSON</strong>, SQL, and schemas stay on your device. <strong>AI safety</strong> and <strong>security</strong> by design: mask before AI, format and validate locally.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border border-emerald-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">AI Safety &amp; No Data Storage</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>AI-safe JSON</strong> masking — keys &amp; values masked client-side</li>
                    <li>• <strong>AI-safe SQL</strong> — table &amp; column names masked before AI</li>
                    <li>• <strong>No server storage</strong> — nothing sent, nothing saved</li>
                    <li>• <strong>Client-side only</strong> — all operations in your browser</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-5 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Security &amp; Privacy</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>JSON</strong> and SQL never leave your device</li>
                    <li>• <strong>No logging</strong> of schemas, payloads, or identifiers</li>
                    <li>• <strong>Reversible masking</strong> — restore after AI, run locally</li>
                    <li>• <strong>Enterprise-safe</strong> — FinTech, healthcare, banking friendly</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">JSON Utilities — All Client-Side</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>JSON formatter</strong> &amp; <strong>JSON minifier</strong> — in-browser</li>
                    <li>• <strong>JSON validator</strong> &amp; <strong>JSON viewer</strong> — no upload</li>
                    <li>• <strong>JSON compare</strong> &amp; <strong>JSON diff</strong> — local only</li>
                    <li>• <strong>JSON to CSV/Excel</strong> — conversion in your browser</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">API &amp; Debugging — Zero Server</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>API JSON tester</strong> — validate responses client-side</li>
                    <li>• <strong>JSON pretty print</strong> &amp; structure view — local</li>
                    <li>• <strong>JSON debugging</strong> — no data sent to any server</li>
                    <li>• <strong>REST API tools</strong> — all operations client-side only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* About UnblockDevs Platform Section */}
          <div className="mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-br from-gray-50/90 via-blue-50/80 to-indigo-50/80 rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-200/80 shadow-md">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">About UnblockDevs — AI Safety, Data Security &amp; Compliance-First Tools</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>UnblockDevs</strong> is built for developers who need to use <strong>AI</strong> without risking <strong>data security</strong> or <strong>compliance</strong>. We provide free, client-side tools so your JSON, SQL, and schemas never leave your device. <strong>Data masking for AI</strong> is at the core: mask table names, column names, and JSON keys before sending anything to ChatGPT or other AI—then restore the AI&apos;s output locally. No server storage, no logging, no signups. <strong>Safety</strong> and <strong>privacy</strong> by design.
                </p>
                
                <p>
                  Our mission is to make <strong>AI-safe workflows</strong> accessible: use AI for SQL and JSON while staying within <strong>compliance</strong> (FinTech, healthcare, banking). We believe you shouldn&apos;t have to choose between AI productivity and data security. All processing runs in your browser—<strong>100% client-side</strong>—so your code, API payloads, and database identifiers never touch our servers. No account creation, no data sharing, no storage of your sensitive information.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">19+</div>
                    <div className="text-sm text-gray-700">Tools incl. AI Masking</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                    <div className="text-sm text-gray-700">Client-Side, No Storage</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">Free</div>
                    <div className="text-sm text-gray-700">Forever, No Signup</div>
                  </div>
                </div>
                
                <p className="mt-6">
                  <strong>AI Safety &amp; Data Masking:</strong> Use our <strong>JSON Shield</strong> and <strong>AI Schema Masker</strong> to anonymize payloads and SQL before AI. Deterministic, reversible mapping—restore AI output to real names in one click. <strong>Data Security:</strong> No uploads, no server processing. Your data stays in your browser. <strong>Compliance:</strong> No logging of schemas or identifiers; suitable for regulated industries. <strong>No Barriers:</strong> Start immediately—no accounts, no credit cards.
                </p>
                
                <p>
                  <strong>Tool Suite:</strong> Beyond <strong>data masking for AI</strong>, we offer JSON formatters, validators, API comparators, cURL converters, and more—all client-side. <strong>Educational Content:</strong> 100+ blog posts on JSON, API testing, data engineering, and <strong>how to safely use AI</strong> with MySQL and JSON (masking, privacy, compliance).
                </p>
                
                <p>
                  <strong>Architecture:</strong> Built with Next.js, TypeScript, and Tailwind. Every tool runs in your browser—fast, secure, private. <strong>Community-Driven:</strong> Tools and features (including AI masking) were shaped by developers who need <strong>AI safety</strong> and <strong>data security</strong> without sacrificing productivity.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
                  <p className="font-semibold text-blue-900 mb-2">Why Choose UnblockDevs?</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ <strong>AI safety</strong> — data masking for AI; schema never sent to servers</li>
                    <li>✓ <strong>Data security</strong> — 100% client-side; no storage, no logging</li>
                    <li>✓ <strong>Compliance-friendly</strong> — FinTech, healthcare, banking safe</li>
                    <li>✓ No signup — use tools immediately, no account or email</li>
                    <li>✓ Free forever — no usage limits, no credit cards</li>
                    <li>✓ JSON Shield &amp; SQL/MySQL mask — restore AI output locally</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Ezoic Ad Placement - Middle of Content (Placement ID: 102) */}
          <div id="ezoic-pub-ad-placeholder-102"></div>

          <div className="mt-14 sm:mt-16">
            <div className="text-center mb-8">
              <h3 className="heading-section mb-2">Why Choose UnblockDevs?</h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">We built this for developers who care where their data goes. No upsells, no lock-in—just tools that work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <span className="text-lg font-bold">∞</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5">Always free</h4>
                <p className="text-sm text-gray-600 leading-relaxed">No trials, no “pro” tier, no credit card. Use every tool as much as you need. We don’t gate features behind signup.</p>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-3">
                  <Lock className="w-5 h-5" aria-hidden />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5">Your data stays yours</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Everything runs in your browser. We don’t send your JSON, SQL, or schemas to our servers—there are no servers for your data. No tracking, no logging.</p>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600 mb-3">
                  <Code className="w-5 h-5" aria-hidden />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5">No install, no setup</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Open the page and start. No npm install, no API keys, no config. Works on any device with a modern browser.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feedback Section */}
      <section className="mt-16 sm:mt-20 py-12 sm:py-14 bg-gradient-to-r from-green-50/90 via-blue-50/80 to-indigo-50/90 border-y border-gray-100/80">
        <div className="max-w-4xl mx-auto container-padding">
          <FeedbackForm />
        </div>
      </section>

      {/* Newsletter Signup Section - show on home page (Beautifier only) */}
      {activeTab === 'beautifier' && (
        <section className="mt-10 py-10 sm:py-12 bg-gradient-to-r from-green-50/80 via-blue-50/70 to-indigo-50/80">
          <div className="max-w-4xl mx-auto container-padding">
            <NewsletterSignup />
          </div>
        </section>
      )}

      {/* Ezoic Ad Placement - Before Footer (Placement ID: 103) */}
      <div id="ezoic-pub-ad-placeholder-103"></div>

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-10 sm:pt-20 sm:pb-12 border-t border-gray-200/80 bg-white/90 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto container-padding">
          {/* Stats Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 pb-8 border-b border-gray-200/80">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Active Users:</span>
              <span className="text-lg font-bold text-blue-600">{activeUsers}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
              <span className="text-sm font-semibold text-gray-700">Total Visits:</span>
              <span className="text-lg font-bold text-purple-600">{totalVisits.toLocaleString()}</span>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="text-center space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                <strong className="text-gray-900">UnblockDevs</strong> — Free Online Developer Tools Suite
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                JSON Viewer, Formatter, Parser, Beautifier, Fixer, JSON to Excel/CSV, API testing, schema generation, SQL formatting, log analysis, and more. All tools are free and run in your browser.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-600">
                <Link href="/json-formatter" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Formatter</Link>
                <Link href="/json-validator" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Validator</Link>
                <Link href="/json-beautifier" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Beautifier</Link>
                <Link href="/json-fixer-online" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Fixer</Link>
                <Link href="/json-schema-generation" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Schema Generator</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON to Excel</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Comparator</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ API Comparator</Link>
                <Link href="/har-to-curl" className="text-blue-600 hover:text-blue-700 hover:underline">✓ HAR to cURL</Link>
                <Link href="/curl-to-requests" className="text-blue-600 hover:text-blue-700 hover:underline">✓ cURL to Code</Link>
                <Link href="/curl-to-python-requests" className="text-blue-600 hover:text-blue-700 hover:underline">✓ cURL to Python</Link>
                <Link href="/convert-curl-to-http-request" className="text-blue-600 hover:text-blue-700 hover:underline">✓ cURL to HTTP</Link>
                <Link href="/json-stringify-online" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON.stringify()</Link>
                <Link href="/token-comparator" className="text-blue-600 hover:text-blue-700 hover:underline">✓ Token Comparator</Link>
                <Link href="/prompt-chunker" className="text-blue-600 hover:text-blue-700 hover:underline">✓ Prompt Chunker</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ Log Explorer</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ Payload Analyzer</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ Mock API Generator</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ SQL Formatter</Link>
                <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">✓ JSON Builder</Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 text-center">Learn more about JSON:</p>
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <a
                    href="https://www.json.org/json-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>📘</span>
                    <span>JSON.org</span>
                  </a>
                  <a
                    href="https://en.wikipedia.org/wiki/JSON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>📚</span>
                    <span>JSON on Wikipedia</span>
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Developer's Study Materials 📚
                </Link>
              </div>
            </div>
            
            {/* Popular Blog Posts Section - Internal Links for SEO */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">Popular Developer Guides</h3>
              <div className="flex flex-wrap justify-center gap-3 text-xs">
                <Link href="/blog/chatgpt-real-life-usage-guide" className="text-blue-600 hover:text-blue-700 hover:underline">ChatGPT Usage Guide</Link>
                <Link href="/blog/ai-prompt-engineering-guide" className="text-blue-600 hover:text-blue-700 hover:underline">AI Prompt Engineering</Link>
                <Link href="/blog/blockchain-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Blockchain Guide</Link>
                <Link href="/blog/mysql-10-most-used-functions" className="text-blue-600 hover:text-blue-700 hover:underline">MySQL Functions</Link>
                <Link href="/blog/token-security-privacy-best-practices" className="text-blue-600 hover:text-blue-700 hover:underline">Token Security</Link>
                <Link href="/blog/5g-6g-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">5G & 6G Guide</Link>
                <Link href="/blog/tokens-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Tokens Guide</Link>
                <Link href="/blog/token-technologies-history-evolution" className="text-blue-600 hover:text-blue-700 hover:underline">Token History</Link>
                <Link href="/blog/agentic-ai-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Agentic AI</Link>
                <Link href="/blog/apache-kafka-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Apache Kafka</Link>
                <Link href="/blog/confidential-computing-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Confidential Computing</Link>
                <Link href="/blog/cursor-ai-code-editor-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Cursor AI Editor</Link>
                <Link href="/blog/digital-twins-complete-guide" className="text-blue-600 hover:text-blue-700 hover:underline">Digital Twins</Link>
                <Link href="/blog/apache-kafka-cheat-sheet" className="text-blue-600 hover:text-blue-700 hover:underline">Kafka Cheat Sheet</Link>
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
                <Link
                  href="/about"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  About Us
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Contact
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/blog"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Blog
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Terms & Conditions
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/disclaimer"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                🚀 Built for developers who ship—by developers who get it. No gatekeeping, no compromise.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeClient;

