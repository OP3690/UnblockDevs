'use client';

import { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Download, Undo2, Redo2, FileSpreadsheet, Code2, GitCompare, FileCode, FileSearch, BarChart3, Code, Server, Database, Settings, FileText, Bookmark, X, Wrench, TrendingUp, Mail, Scissors, Key, Clock, Network, AlertTriangle, Copy, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PersonalizationManager, ToolTab } from '@/lib/personalization';
import SocialShare from '@/components/SocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BuyMeACoffeeWidget from '@/components/BuyMeACoffeeWidget';
import JsonInput from '@/components/JsonInput';
import CommissionDisclosure from '@/components/CommissionDisclosure';
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
  insights: '/data-insights',
  promptchunk: '/prompt-chunker',
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
      if (tabParam && ['converter', 'beautifier', 'fixer', 'comparator', 'jsoncompare', 'schema', 'logs', 'payload', 'curl', 'mock', 'testdata', 'config', 'sql', 'builder', 'insights', 'promptchunk', 'tokencompare', 'timezone', 'hartocurl', 'curlfailure'].includes(tabParam)) {
        setActiveTab(tabParam as ToolTab);
        // Scroll to top when tab is set from URL
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Check if bookmark prompt was dismissed
      const dismissed = localStorage.getItem('bookmarkPromptDismissed');
      if (!dismissed) {
        // Show after a short delay for better UX
        const timer = setTimeout(() => {
          setShowBookmarkPrompt(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismissBookmarkPrompt = () => {
    setShowBookmarkPrompt(false);
    localStorage.setItem('bookmarkPromptDismissed', 'true');
  };

  // Initialize Google AdSense for header ad
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Wait for AdSense script to load
      const initAdSense = () => {
        try {
          if ((window as any).adsbygoogle && (window as any).adsbygoogle.loaded !== true) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          }
        } catch (e) {
          // Silently fail - AdSense may not be configured yet
          console.debug('AdSense not ready:', e);
        }
      };
      
      // Try immediately
      initAdSense();
      
      // Also try after a delay in case script is still loading
      const timer = setTimeout(initAdSense, 1000);
      return () => clearTimeout(timer);
    }
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
  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && (window as any).ezstandalone) {
      try {
        // Refresh ads when content changes (tab switch)
        (window as any).ezstandalone.cmd.push(function() {
          try {
          (window as any).ezstandalone.showAds();
          } catch (e: any) {
            // Silently handle errors (site may not be approved yet)
            const errorMsg = e?.message || String(e);
            if (!errorMsg.includes('Monetization not allowed') && 
                !errorMsg.includes('visit_uuid')) {
              console.debug('Ezoic ads refresh error:', e);
            }
          }
        });
      } catch (e: any) {
        // Silently handle errors
        const errorMsg = e?.message || String(e);
        if (!errorMsg.includes('Monetization not allowed') && 
            !errorMsg.includes('visit_uuid')) {
        console.debug('Ezoic ads refresh error:', e);
        }
      }
    }
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
      <header role="banner" className={`bg-white border-b border-gray-200 ${showBookmarkPrompt ? 'sticky top-[73px]' : 'sticky top-0'} z-40 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar: logo left, nav right */}
          <div className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/25 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-gray-900">UnblockDevs</span>
                <p className="text-xs font-medium text-gray-500 hidden sm:block mt-0.5">Developers tool for Daily Use!!!</p>
              </div>
            </Link>
            <div id="ezoic-pub-ad-placeholder-100" className="hidden lg:block flex-1 min-w-0" />
            <nav className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0" aria-label="Main navigation">
              <div className="hidden"><ins className="adsbygoogle" style={{ display: 'block', minWidth: '300px', minHeight: '100px' }} data-ad-client="ca-pub-6349841658473646" data-ad-slot="HEADER_AD_SLOT" data-ad-format="auto" data-full-width-responsive="false" /></div>
              <Link href="/blog" className="px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md shadow-primary-500/30 hover:shadow-lg transition-all ring-2 ring-primary-200/50" aria-label="Developers Study Materials">
                <FileText className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Developers Study Materials 📚</span>
              </Link>
              <Link href="/about" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">About</Link>
            </nav>
          </div>

          {/* Tool tabs - 3 rows (7 cols on md+) */}
          <div className="bg-gray-50/90 border-t border-gray-100 rounded-b-lg px-1 sm:px-2 py-2.5 pb-3">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1.5 sm:gap-2">
            <button
              onClick={() => handleTabChange('beautifier')}
              className={`w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm transition-all duration-200 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0 ${
                activeTab === 'beautifier'
                  ? 'bg-white text-primary-700 border-2 border-primary-500 shadow-sm ring-2 ring-primary-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">JSON Beautifier</span>
            </button>
            <Link href={toolPageUrls.sql} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">SQL Formatter</span>
              <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded-md text-[10px] font-semibold flex-shrink-0">Hot</span>
            </Link>
            <Link href={toolPageUrls.tokencompare} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Token Compare</span>
            </Link>
            <Link href={toolPageUrls.promptchunk} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Prompt Chunker</span>
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-md text-[10px] font-semibold flex-shrink-0">AI</span>
            </Link>
            <button
              onClick={() => handleTabChange('converter')}
              className={`w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm transition-all duration-200 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0 ${
                activeTab === 'converter'
                  ? 'bg-white text-primary-700 border-2 border-primary-500 shadow-sm ring-2 ring-primary-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Json to Excel</span>
            </button>
            <Link href={toolPageUrls.fixer} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">JSON Fixer</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-semibold flex-shrink-0" title="Popular">★</span>
            </Link>
            <Link href={toolPageUrls.builder} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">JSON Builder</span>
            </Link>
            <Link href={toolPageUrls.comparator} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <GitCompare className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">API Compare</span>
            </Link>
            <Link href={toolPageUrls.jsoncompare} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <GitCompare className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">JSON Compare</span>
            </Link>
            <Link href={toolPageUrls.schema} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <FileCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Schema</span>
            </Link>
            <Link href={toolPageUrls.logs} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <FileSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Logs Analyzer</span>
            </Link>
            <Link href={toolPageUrls.payload} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Payload</span>
            </Link>
            <Link href={toolPageUrls.curl} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Convert Curl</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-semibold flex-shrink-0" title="Popular">★</span>
            </Link>
            <Link href={toolPageUrls.mock} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Mock API</span>
            </Link>
            <Link href={toolPageUrls.testdata} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Test Data</span>
            </Link>
            <Link href={toolPageUrls.config} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Config</span>
            </Link>
            <Link href={toolPageUrls.insights} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Data Insights</span>
            </Link>
            <Link href={toolPageUrls.timezone} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">Timezone</span>
            </Link>
            <Link href={toolPageUrls.hartocurl} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <Network className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">HAR to cURL</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-semibold flex-shrink-0" title="Popular">★</span>
            </Link>
            <Link href={toolPageUrls.curlfailure} className="w-full px-2 sm:px-3 py-2.5 sm:py-2.5 font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg border-2 border-transparent hover:border-gray-200 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-h-[2.75rem] sm:min-h-0">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-center break-words line-clamp-2">cURL Analyzer</span>
            </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Ad strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-100">
        <div id="ezoic-pub-ad-placeholder-101" className="min-h-[90px] flex items-center justify-center" />
      </div>

      {/* Main Content - Professional layout */}
      <main id="main-content" role="main" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in bg-gray-50/40 ${activeTab === 'beautifier' ? 'pt-0 sm:pt-1 pb-8 sm:pb-12 lg:pb-14' : 'py-8 sm:py-12 lg:py-14'}`}>
        {activeTab === 'beautifier' && (
          <div className="max-w-4xl mx-auto -mt-10 sm:-mt-12">
            <JsonBeautifier />
            <p className="mt-6 text-center text-sm text-gray-500">
              <button type="button" onClick={() => handleTabChange('converter')} className="text-blue-600 hover:underline font-medium">Json to Excel</button>
              {' — convert JSON to Excel/CSV'}
            </p>
          </div>
        )}
        {activeTab === 'converter' && (
          rows.length === 0 ? (
            <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
              {/* Hero: title + input */}
              <header className="pt-2 sm:pt-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-1.5">JSON Viewer Tools</h1>
                <p className="text-gray-500 text-sm sm:text-base mb-6">Free online formatter, parser & viewer. Paste JSON to view, format, or convert to Excel/CSV.</p>
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
              <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 text-center shadow-sm">
                <h2 className="text-base font-semibold text-gray-900 mb-2">Try more tools</h2>
                <p className="text-gray-500 text-sm mb-4 max-w-lg mx-auto">Edit, validate, convert JSON. No signup.</p>
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
          {/* Keyword-Rich Hero Section */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-sm">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              JSON Schema Generator, JSON to Excel Converter & Curl to Requests - Free Developer Tools | UnblockDevs.com
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Use <strong>UnblockDevs.com</strong> free online tools for <strong>JSON schema generation</strong>, <strong>JSON schema validation</strong>, <strong>export JSON to Excel</strong>, <strong>convert curl to requests</strong>, and <strong>JSON schema creation</strong>. 
              Generate JSON schema, validate JSON schema, convert JSON to Excel table, convert curl to JavaScript, and create JSON schemas instantly. All tools work entirely in your browser - no installation required.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON Schema Generator</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON Schema Validation</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Export JSON to Excel</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Convert Curl to Requests</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON Schema Creator</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON to Excel Integration</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ Curl to JavaScript</span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-sm font-medium">✓ JSON Schema Generator Online</span>
              </div>
                        </div>
          
          {/* SEO Content Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Powerful JSON & API Development Tools at UnblockDevs.com</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>JSON Schema Generator & Validation:</strong> Our <Link href="/json-schema-generation" className="text-blue-600 hover:underline font-medium">JSON schema generator</Link> helps you create comprehensive JSON schemas from your JSON data. Use our <strong>JSON schema validation</strong> tool to validate JSON against schemas, ensuring data integrity. Whether you&apos;re <strong>creating a JSON schema</strong>, <strong>defining JSON schema</strong>, or <strong>generating JSON schema</strong>, our <strong>schema generator from JSON</strong> makes it easy. Perfect for API documentation and data validation workflows.
                </p>
                
                <p>
                  <strong>Export JSON to Excel:</strong> Need to <strong>convert JSON to Excel</strong>? Our <Link href="/#json-input-section" className="text-blue-600 hover:underline font-medium">JSON to Excel converter</Link> allows you to <strong>export JSON to Excel</strong> with ease. Learn <strong>how to convert JSON to Excel</strong> and transform your JSON data into structured Excel spreadsheets. Our <Link href="/#json-input-section" className="text-blue-600 hover:underline font-medium">JSON Viewer Tools</Link> support <strong>JSON to Excel integration</strong> and <strong>convert JSON to Excel table</strong> formats, making data analysis simple.
                </p>
                
                <p>
                  <strong>Convert Curl to Requests:</strong> Transform your curl commands with our <strong>curl to requests</strong> converter. <strong>Convert curl to JavaScript</strong>, Python, or other languages instantly. Our <strong>convert curl to http request</strong> tool helps developers translate API calls quickly. Whether you need to <strong>convert curl</strong> for testing or integration, our <strong>curl to</strong> converter supports multiple output formats.
                </p>
                
                <p>
                  <strong>JSON Schema Creation & Validation:</strong> Create robust JSON schemas with our <Link href="/json-schema-generation" className="text-blue-600 hover:underline font-medium">JSON schema creator</Link>. Our <strong>JSON schema generation</strong> tool supports <strong>JSON schema for JSON schema</strong> patterns and helps with <strong>schema validation JSON</strong>. Use <strong>validation JSON schema</strong> to ensure your data matches expected structures. Our <Link href="/json-schema-generation" className="text-blue-600 hover:underline font-medium">json-schema-generator</Link> is perfect for <strong>creating a JSON schema</strong> from existing JSON data. Try our <Link href="/json-beautifier" className="text-blue-600 hover:underline font-medium">JSON formatter online</Link> or <Link href="/#json-input-section" className="text-blue-600 hover:underline font-medium">JSON parser online</Link> for viewing and formatting.
                </p>
                      </div>
              </div>
            </div>
          
          {/* Language-Specific JSON Tools Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-indigo-100 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">JSON Tools for Every Programming Language</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* JavaScript Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🌐</span> JavaScript JSON Tools
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Work with <strong>javascript json parse</strong> and <strong>javascript json stringify</strong> seamlessly. Our tools help with <strong>javascript validate json schema</strong>, <strong>javascript json schema validator</strong>, and <strong>javascript json manipulation</strong>. Convert data with <strong>javascript json to csv</strong> and <strong>javascript json to excel</strong>. Handle <strong>javascript nested json</strong> and <strong>javascript flatten json</strong> operations. Perfect for <strong>javascript fetch json api</strong> and <strong>javascript json response handling</strong>.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>javascript json parse</strong> & <strong>javascript json stringify</strong></li>
                    <li>• <strong>javascript json schema generator</strong> with <strong>javascript ajv json schema</strong></li>
                    <li>• <strong>javascript json data analysis</strong> & <strong>javascript json transform</strong></li>
                    <li>• <strong>javascript json error handling</strong> & <strong>javascript convert json</strong></li>
                  </ul>
          </div>
                
                {/* Python Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🐍</span> Python JSON Tools
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Master <strong>python json parsing</strong> with <strong>python json load</strong> and <strong>python json dump</strong>. Use <strong>python json schema validation</strong> and <strong>python validate json schema</strong> for data integrity. Convert between <strong>python json to dict</strong> and <strong>python dict to json</strong>. Handle <strong>python json file read</strong> and <strong>python json file write</strong>. Perfect for <strong>python pandas json analysis</strong> and <strong>python convert json to excel</strong>.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>python json serialization</strong> & <strong>python json deserialization</strong></li>
                    <li>• <strong>python json flatten</strong> & <strong>python nested json handling</strong></li>
                    <li>• <strong>python json normalize</strong> & <strong>python json schema generator</strong></li>
                    <li>• <strong>python json to csv</strong> & <strong>python json validation error</strong> handling</li>
                  </ul>
            </div>
                
                {/* Java Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">☕</span> Java JSON Tools
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Work with <strong>java json parsing</strong> using <strong>java jackson json</strong> and <strong>java gson json</strong>. Convert between <strong>java json to pojo</strong> and <strong>java pojo to json</strong>. Use <strong>java json schema validation</strong> and <strong>java validate json against schema</strong>. Handle <strong>java json serialization</strong> and <strong>java json deserialization</strong>. Perfect for <strong>java read json file</strong> and <strong>java write json file</strong> operations.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>java json object</strong> & <strong>java json array</strong> handling</li>
                    <li>• <strong>java json mapper</strong> & <strong>java convert json to map</strong></li>
                    <li>• <strong>java json to excel</strong> & <strong>java json schema generator</strong></li>
                    <li>• <strong>java json pretty print</strong> & <strong>java json parsing error</strong> handling</li>
                  </ul>
          </div>
          
                {/* MySQL Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🗄️</span> MySQL JSON Tools
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Work with <strong>mysql json column</strong> and <strong>mysql json functions</strong>. Use <strong>mysql json extract</strong> and <strong>mysql json query</strong> for data retrieval. Implement <strong>mysql json validation</strong> and <strong>mysql json schema validation</strong>. Convert with <strong>mysql json to table</strong> and <strong>mysql convert json to rows</strong>. Handle <strong>mysql parse json</strong> and <strong>mysql json array</strong> operations.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>mysql json index</strong> & <strong>mysql json search</strong> optimization</li>
                    <li>• <strong>mysql json path examples</strong> & <strong>mysql json performance issues</strong></li>
                    <li>• <strong>mysql import json data</strong> & <strong>mysql export json</strong></li>
                    <li>• <strong>mysql json errors</strong> & <strong>mysql invalid json error</strong> handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* JSON Data Analysis Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">JSON Data Analysis & Processing Tools</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Perform comprehensive <strong>json data analysis</strong> with our powerful tools. Use <strong>json data visualization</strong> to understand your data structures. Our <strong>json data processing</strong> tools support <strong>json analytics</strong> and <strong>json big data</strong> workflows. Transform data with <strong>json data transformation</strong> and <strong>json data normalization</strong>.
                </p>
                
                <p>
                  Clean and prepare your data with <strong>json data cleaning</strong> tools. Use <strong>json schema for analytics</strong> to ensure data quality. Perform <strong>json exploratory analysis</strong> and <strong>json dataset analysis</strong>. Work with <strong>analyze nested json</strong> structures and extract <strong>json metrics extraction</strong>. Convert data with <strong>json to dataframe</strong> and <strong>json to table conversion</strong>.
                </p>
                
                <p>
                  Advanced features include <strong>json aggregation</strong>, <strong>json statistical analysis</strong>, and <strong>json time series data</strong> handling. Build <strong>json data pipeline</strong> workflows and use <strong>json reporting tools</strong> for insights.
                </p>
              </div>
            </div>
          </div>
          
          {/* Developer Utilities Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Developer JSON Utilities & Conversion Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Database Conversions</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>json to sql</strong> conversion</li>
                    <li>• <strong>json to mysql</strong> integration</li>
                    <li>• <strong>json to postgresql</strong> export</li>
                    <li>• <strong>json to mongodb</strong> import</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">API & Testing Tools</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>json api tester</strong> for REST APIs</li>
                    <li>• <strong>api json validator</strong> for validation</li>
                    <li>• <strong>rest api json tools</strong> suite</li>
                    <li>• <strong>developer json utilities</strong> collection</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Formatting & Editing</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>json formatter online</strong> tool</li>
                    <li>• <strong>json minifier</strong> for optimization</li>
                    <li>• <strong>json editor online</strong> for editing</li>
                    <li>• <strong>json viewer</strong> for visualization</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Comparison & Debugging</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>json diff tool</strong> for comparisons</li>
                    <li>• <strong>json compare tool</strong> for analysis</li>
                    <li>• <strong>json debugging tools</strong> suite</li>
                    <li>• <strong>json pretty print</strong> formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* About UnblockDevs Platform Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">About UnblockDevs - Free Privacy-Focused Developer Tools</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>UnblockDevs</strong> is a comprehensive platform providing free, privacy-focused developer tools designed to help developers work more efficiently without compromising their privacy or requiring signups. Founded with the vision of making professional-grade development tools accessible to everyone, we've built a platform that processes all data locally in your browser, ensuring your code, JSON, API responses, and sensitive information never leave your device.
                </p>
                
                <p>
                  Our mission is to democratize access to high-quality developer tools while maintaining the highest standards of privacy and security. We believe that developers shouldn't have to choose between powerful tools and privacy, and that essential utilities shouldn't require account creation, credit cards, or data sharing. Since our launch, UnblockDevs has served millions of developers worldwide, processing billions of operations entirely in users' browsers.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">19+</div>
                    <div className="text-sm text-gray-700">Professional Tools</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                    <div className="text-sm text-gray-700">Browser-Based Processing</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">Free</div>
                    <div className="text-sm text-gray-700">Forever, No Signup Required</div>
                  </div>
                </div>
                
                <p className="mt-6">
                  <strong>Privacy First:</strong> All processing happens in your browser. Your data never leaves your device, ensuring maximum privacy and security. We don't track, store, or transmit your data. <strong>No Barriers:</strong> Start using tools immediately without creating accounts, providing emails, or dealing with password management. <strong>Quality & Reliability:</strong> Free doesn't mean low quality. We maintain professional-grade standards for all our tools, ensuring accuracy, performance, and reliability.
                </p>
                
                <p>
                  <strong>Comprehensive Tool Suite:</strong> UnblockDevs provides 19+ professional tools covering JSON processing, API testing, code conversion, data analysis, and more. From JSON beautifiers and validators to API comparators and cURL converters, we have the tools you need for modern development workflows. <strong>Educational Content:</strong> Beyond tools, we've created an extensive library of 100+ educational blog posts covering topics from JSON processing and API testing to advanced algorithms, data engineering, and AI development.
                </p>
                
                <p>
                  <strong>Technology & Architecture:</strong> UnblockDevs is built using modern web technologies including Next.js 14+, TypeScript, and Tailwind CSS. All tools are optimized for performance, accessibility, and user experience. Our client-side processing architecture ensures fast, secure, and private operations. <strong>Community-Driven:</strong> Our tools are built for the developer community, and we actively listen to feedback, feature requests, and suggestions. Many of our tools and features were inspired by user requests and community needs.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
                  <p className="font-semibold text-blue-900 mb-2">Why Choose UnblockDevs?</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ All tools process data entirely in your browser - complete privacy</li>
                    <li>✓ No signup required - start using tools immediately</li>
                    <li>✓ 100% free forever - no usage limits or credit cards</li>
                    <li>✓ Professional-grade tools with enterprise-level quality</li>
                    <li>✓ Comprehensive educational content and tutorials</li>
                    <li>✓ Regular updates and new tools based on community feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Developer Tools</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              UnblockDevs provides a comprehensive suite of free online developer tools to streamline your development workflow. All tools work entirely in your browser - no installation required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div
              onClick={() => {
                handleTabChange('converter');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="card card-hover text-left cursor-pointer group relative"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Export JSON to Excel | Convert JSON to Excel Table | JSON to Excel Integration
              </h3>
              <p className="text-gray-600 text-sm">
                <strong>Export JSON to Excel</strong> and <strong>convert JSON to Excel table</strong> with our powerful converter. Learn <strong>how to convert JSON to Excel</strong> and transform nested JSON data into structured Excel spreadsheets. Perfect for <strong>JSON to Excel integration</strong> workflows. Supports CSV and HTML table formats with custom column organization.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try JSON to Excel Converter →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('beautifier');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group relative"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON Viewer | JSON Formatter | JSON Parser | JSON Beautifier
              </h3>
              <p className="text-gray-600 text-sm">
                Free online JSON Viewer, JSON Formatter, JSON Parser, and JSON Beautifier. View, format, parse, and beautify JSON data with customizable indentation. Visualize JSON structure, analyze data types, and get detailed statistics about your JSON files.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try JSON Viewer & Formatter →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('comparator');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group relative"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                API Response Comparator
              </h3>
              <p className="text-gray-600 text-sm">
                Compare two API responses to detect changes, additions, and breaking changes. Identify field-level differences with visual highlighting and detailed change reports.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('jsoncompare');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON Comparator & Diff Tool
              </h3>
              <p className="text-gray-600 text-sm">
                Compare two JSON payloads side-by-side with semantic diff. Visualize additions, deletions, and modifications with color-coded highlighting. Perfect for debugging API responses and config files.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Compare JSON Now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('schema');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group relative"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON Schema Generator | JSON Schema Creator | Generate JSON Schema
              </h3>
              <p className="text-gray-600 text-sm">
                Use our <strong>JSON schema generator</strong> to automatically <strong>generate JSON schema</strong> from your JSON data. Our <strong>JSON schema creator</strong> helps with <strong>JSON schema generation</strong> and <strong>creating a JSON schema</strong>. Perfect for <strong>defining JSON schema</strong> structures and <strong>schema generator from JSON</strong> workflows. Create validation schemas for API documentation and data validation.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('logs');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Logs Analyzer
              </h3>
              <p className="text-gray-600 text-sm">
                Parse, filter, and analyze structured logs in JSON or text format. Filter by log level, search through logs, and identify patterns in your application logs.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('payload');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Payload Analyzer
              </h3>
              <p className="text-gray-600 text-sm">
                Analyze JSON payload sizes, structure, and complexity. Get insights into API request/response payloads to optimize performance.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('curl');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Convert Curl to Requests | Curl to JavaScript | Convert Curl to HTTP Request
              </h3>
              <p className="text-gray-600 text-sm">
                Use our <strong>curl to requests</strong> converter to <strong>convert curl to JavaScript</strong>, Python, Java, and Go. Our <strong>convert curl to http request</strong> tool helps you <strong>convert curl</strong> commands into code instantly. Perfect for API integration and testing workflows.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('mock');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Mock API Generator
              </h3>
              <p className="text-gray-600 text-sm">
                Generate mock API endpoints and responses for testing and development. Create realistic test data and API responses without backend setup.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('testdata');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Test Data Generator
              </h3>
              <p className="text-gray-600 text-sm">
                Generate realistic test data for your applications. Create sample data sets for testing, demos, and development purposes.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('config');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Config Comparator
              </h3>
              <p className="text-gray-600 text-sm">
                Compare environment configurations, identify differences between dev, staging, and production configs. Ensure consistency across environments.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('sql');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                SQL Formatter - Comma Separated ID List for MySQL, PostgreSQL, Oracle, Trino
              </h3>
              <p className="text-gray-600 text-sm">
                Create comma separated ID lists for SQL IN clause. Convert multiple IDs, arrays, or values into properly formatted SQL IN query format for 
                MySQL, PostgreSQL, Oracle, Trino, SQL Server, SQLite, and more. Generate comma separated IDs for MySQL IN clause, PostgreSQL IN clause, 
                Oracle IN clause, Trino IN clause, and other database queries.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('tokencompare');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Token Comparator - Compare Tokens Character by Character
              </h3>
              <p className="text-gray-600 text-sm">
                Compare two tokens (JWT, API keys, authentication tokens) character by character with beautiful mismatch highlighting. 100% client-side - your tokens never leave your device.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </div>
            
            <div
              onClick={() => {
                handleTabChange('timezone');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                showBuyMeACoffeeMessage();
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Timezone Translator for Humans
              </h3>
              <p className="text-gray-600 text-sm">
                Convert times across timezones instantly. Enter "3pm New York" and see the time in all your selected cities. Perfect for scheduling meetings across the globe.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Convert Time Now →
              </span>
            </div>
          </div>
          
          {/* Ezoic Ad Placement - Middle of Content (Placement ID: 102) */}
          <div id="ezoic-pub-ad-placeholder-102"></div>

          {/* Additional SEO Content Section */}
          <div className="mt-12 mb-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Complete Guide: JSON Schema Validation & Generation at UnblockDevs.com</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">JSON Schema Validation</h3>
                  <p>
                    Our <strong>JSON schema validation</strong> tool allows you to <strong>validate JSON schema</strong> and ensure your data structures are correct. Use <strong>validation JSON schema</strong> to check JSON against schemas, and <strong>json validator against schema</strong> for comprehensive validation. Perfect for API testing and data quality assurance at <strong>UnblockDevs.com</strong>.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">JSON Schema Generation & Creation</h3>
                  <p>
                    Need to <strong>generate JSON schema</strong>? Our <strong>json-schema-generator</strong> helps with <strong>JSON schema generation</strong> and <strong>JSON schema creation</strong>. Whether you're <strong>creating a JSON schema</strong>, <strong>defining JSON schema</strong>, or using a <strong>schema generator from JSON</strong>, our tools make it easy. The <strong>schema generator json</strong> supports <strong>JSON schema for JSON schema</strong> patterns.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Convert JSON to Excel - Complete Integration</h3>
                  <p>
                    Our <strong>JSON to Excel converter</strong> enables seamless <strong>JSON to Excel integration</strong>. Learn <strong>how to convert JSON to Excel</strong> and <strong>export JSON to Excel</strong> with our powerful tool. <strong>Convert JSON to Excel table</strong> formats for better data analysis and reporting.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Curl to Requests Converter</h3>
                  <p>
                    Transform API calls with our <strong>curl to requests</strong> converter. <strong>Convert curl to JavaScript</strong>, Python, or other languages. Our <strong>convert curl to http request</strong> tool helps developers quickly <strong>convert curl</strong> commands into working code. Perfect for API integration and testing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose UnblockDevs.com?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">100% Free</h4>
                <p className="text-sm text-gray-600">All tools are completely free to use with no registration required.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Privacy First</h4>
                <p className="text-sm text-gray-600">All processing happens in your browser. Your data never leaves your device.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">No Installation</h4>
                <p className="text-sm text-gray-600">Works entirely in your browser - no downloads or installations needed.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feedback Section */}
      <section className="mt-16 py-12 bg-gradient-to-r from-green-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto container-padding">
          <FeedbackForm />
        </div>
      </section>

      {/* Newsletter Signup Section - show on home page (Beautifier only) */}
      {activeTab === 'beautifier' && (
        <section className="mt-8 py-8 bg-gradient-to-r from-green-50 via-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto container-padding">
            <NewsletterSignup />
          </div>
        </section>
      )}

      {/* Ezoic Ad Placement - Before Footer (Placement ID: 103) */}
      <div id="ezoic-pub-ad-placeholder-103"></div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t-2 border-gray-200/50 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto container-padding">
          {/* Stats Section */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 pb-6 border-b border-gray-200">
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
              <p className="text-gray-600">
                <strong className="text-gray-900">UnblockDevs</strong> • Free Online Developer Tools Suite
              </p>
              <p className="text-xs text-gray-500">
                Free online JSON Viewer, JSON Formatter, JSON Parser, JSON Beautifier, JSON Fixer & Repair Tool, JSON to Excel converter, JSON to CSV converter, JSON to Table converter, API testing, data analysis, schema generation, SQL formatting, log analysis, and more. All tools are free and work entirely in your browser.
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
                  Read Developer Blog
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
                Built by <span className="font-semibold text-gray-900">Developer</span> with <span className="text-red-500">❤️</span> to fellow <span className="font-semibold text-gray-900">Developers</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeClient;

