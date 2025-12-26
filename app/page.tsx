'use client';

import { useState, useCallback, useEffect } from 'react';
import { Download, Undo2, Redo2, FileSpreadsheet, Code2, GitCompare, FileCode, FileSearch, BarChart3, Code, Server, Database, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import JsonInput from '@/components/JsonInput';
import DataTable from '@/components/DataTable';
import SectionManager from '@/components/SectionManager';
import JsonBeautifier from '@/components/JsonBeautifier';
import ApiComparator from '@/components/tools/ApiComparator';
import SchemaGenerator from '@/components/tools/SchemaGenerator';
import LogExplorer from '@/components/tools/LogExplorer';
import PayloadAnalyzer from '@/components/tools/PayloadAnalyzer';
import CurlConverter from '@/components/tools/CurlConverter';
import MockApiGenerator from '@/components/tools/MockApiGenerator';
import TestDataGenerator from '@/components/tools/TestDataGenerator';
import ConfigComparator from '@/components/tools/ConfigComparator';
import SqlFormatter from '@/components/tools/SqlFormatter';
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

type ToolTab = 'converter' | 'beautifier' | 'comparator' | 'schema' | 'logs' | 'payload' | 'curl' | 'mock' | 'testdata' | 'config' | 'sql';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ToolTab>('converter');

  // Function to trigger Buy Me a Coffee widget
  const triggerBuyMeACoffee = () => {
    // Wait for widget to load, then trigger it
    setTimeout(() => {
      const bmcButton = document.querySelector('#bmc-wbtn') as HTMLElement;
      if (bmcButton) {
        bmcButton.click();
      }
    }, 500);
  };

  // Handle tab change with widget trigger
  const handleTabChange = (tab: ToolTab) => {
    // Only trigger widget if switching to a different tab
    if (tab !== activeTab) {
      setActiveTab(tab);
      triggerBuyMeACoffee();
    } else {
      setActiveTab(tab);
    }
  };
  const [rows, setRows] = useState<FlattenedRow[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [removedColumns, setRemovedColumns] = useState<Set<string>>(new Set());
  const [historyManager] = useState(() => new HistoryManager(10));
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);

  // Track visits and active users using API
  useEffect(() => {
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

    // Fetch stats on mount
    fetchStats();

    // Send heartbeat every 30 seconds to keep session alive
    const heartbeatInterval = setInterval(async () => {
      try {
        await fetch('/api/stats', {
          method: 'POST',
          credentials: 'include',
        });
        // Refresh stats after heartbeat
        fetchStats();
      } catch (error) {
        console.error('Failed to send heartbeat:', error);
      }
    }, 30000); // Every 30 seconds

    // Update stats every 10 seconds
    const statsInterval = setInterval(fetchStats, 10000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const saveToHistory = useCallback(() => {
    historyManager.push({
      rows: JSON.parse(JSON.stringify(rows)),
      columns: JSON.parse(JSON.stringify(columns)),
      sections: JSON.parse(JSON.stringify(sections)),
    });
  }, [rows, columns, sections, historyManager]);

  // Get visible columns (excluding removed ones)
  const visibleColumns = columns.filter((col) => !removedColumns.has(col.id));

  const handleJsonSubmit = (data: any) => {
    try {
      const parsedRows = jsonToRows(data);
      const parsedColumns = extractColumns(parsedRows);

      setRows(parsedRows);
      setColumns(parsedColumns);
      setSections([]);
      setRemovedColumns(new Set());

      // Save initial state to history
      historyManager.clear();
      historyManager.push({
        rows: JSON.parse(JSON.stringify(parsedRows)),
        columns: JSON.parse(JSON.stringify(parsedColumns)),
        sections: [],
      });

      toast.success(`Parsed ${parsedRows.length} row(s) with ${parsedColumns.length} column(s)`);
    } catch (error: any) {
      toast.error(`Failed to parse JSON: ${error.message}`);
    }
  };

  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [columnId]: value };
    setRows(newRows);
    saveToHistory();
  };

  const handleColumnRename = (columnId: string, newName: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, name: newName } : col))
    );
    saveToHistory();
  };

  const handleRowDelete = (rowIndex: number) => {
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
    saveToHistory();
    toast.success('Row deleted');
  };

  const handleSectionsChange = (newSections: Section[]) => {
    setSections(newSections);
    saveToHistory();
  };

  const handleColumnMove = (
    columnId: string,
    fromSectionId: string | null,
    toSectionId: string | null
  ) => {
    let newSections = [...sections];

    // Remove from source section
    if (fromSectionId) {
      newSections = newSections.map((s) =>
        s.id === fromSectionId
          ? { ...s, columnIds: s.columnIds.filter((id) => id !== columnId) }
          : s
      );
    }

    // Add to destination section
    if (toSectionId) {
      newSections = newSections.map((s) =>
        s.id === toSectionId
          ? { ...s, columnIds: [...s.columnIds, columnId] }
          : s
      );
    }

    setSections(newSections);
    saveToHistory();
  };

  const handleExport = () => {
    if (rows.length === 0) {
      toast.error('No data to export');
      return;
    }

    try {
      // If sections exist, only export columns in sections
      // Otherwise, export all visible columns
      let columnIdsToExport: string[];
      let sectionsToExport: Section[];

      if (sections.length > 0) {
        // Only export columns that are in sections (excluding removed ones)
        const sectionColumnIds = new Set<string>();
        sections.forEach((section) => {
          section.columnIds
            .filter((id) => !removedColumns.has(id))
            .forEach((id) => sectionColumnIds.add(id));
        });
        
        columnIdsToExport = Array.from(sectionColumnIds);
        sectionsToExport = sections.map((section) => ({
          ...section,
          columnIds: section.columnIds.filter((id) => !removedColumns.has(id)),
        }));

        if (columnIdsToExport.length === 0) {
          toast.error('No columns in sections to export. Please add columns to sections first.');
          return;
        }
      } else {
        // No sections - export all visible columns
        columnIdsToExport = visibleColumns.map((col) => col.id);
        sectionsToExport = [];
      }

      const fileName = `json-export-${new Date().toISOString().split('T')[0]}.xlsx`;

      exportToExcel(rows, columnIdsToExport, {
        sections: sectionsToExport,
        singleSheet: true,
        fileName,
      });

      const sectionInfo = sections.length > 0 
        ? ` (${columnIdsToExport.length} column(s) from ${sections.length} section(s))`
        : '';
      toast.success(`Excel file downloaded successfully!${sectionInfo}`);
    } catch (error: any) {
      toast.error(`Export failed: ${error.message}`);
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
      toast.error('No unassigned columns to remove');
      return;
    }

    // Double-check: ensure none of these columns are in sections (safety check)
    const columnsInSections = new Set<string>();
    sections.forEach((section) => {
      section.columnIds.forEach((id) => columnsInSections.add(id));
    });

    const safeToRemove = unassignedColumnIds.filter((id) => !columnsInSections.has(id));
    
    if (safeToRemove.length !== unassignedColumnIds.length) {
      console.warn('Some columns were in sections and were not removed');
    }

    if (safeToRemove.length === 0) {
      toast.error('No unassigned columns to remove (all columns are in sections)');
      return;
    }

    // Confirm before removing
    if (window.confirm(`Are you sure you want to remove ${safeToRemove.length} unassigned column(s) from the table and export?`)) {
      setRemovedColumns((prev) => {
        const newSet = new Set(prev);
        safeToRemove.forEach((id) => newSet.add(id));
        return newSet;
      });
      saveToHistory();
      toast.success(`Removed ${safeToRemove.length} unassigned column(s)`);
    }
  };

  const handleRestoreColumn = (columnId: string) => {
    setRemovedColumns((prev) => {
      const newSet = new Set(prev);
      newSet.delete(columnId);
      return newSet;
    });
    saveToHistory();
    toast.success('Column restored');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto container-padding py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-1">
                  UnblockDevs
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Free Developer Tools Suite - Unblock Your Development Workflow
                  <br />
                  JSON Converter, API Testing, Data Analysis & More
                </p>
              </div>
            </div>
            {activeTab === 'converter' && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUndo}
                  disabled={!historyManager.canUndo()}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                  title="Undo"
                >
                  <Undo2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={!historyManager.canRedo()}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                  title="Redo"
                >
                  <Redo2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b-2 border-gray-200/50 pb-0">
            <button
              onClick={() => setActiveTab('converter')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'converter'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span className="text-sm">Json to Excel</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('beautifier')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'beautifier'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span className="text-sm">Beautifier</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('comparator')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'comparator'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                <span className="text-sm">API Compare</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('schema')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'schema'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                <span className="text-sm">Schema</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('logs')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'logs'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4" />
                <span className="text-sm">Logs Analyzer</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('payload')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'payload'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Payload</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('curl')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'curl'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="text-sm">Curl</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('mock')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'mock'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span className="text-sm">Mock API</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('testdata')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'testdata'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="text-sm">Test Data</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('config')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'config'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Config</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('sql')}
              className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                activeTab === 'sql'
                  ? 'tab-active bg-blue-50'
                  : 'tab-inactive'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="text-sm">SQL Formatter</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto container-padding py-8 animate-fade-in">
        {activeTab === 'converter' && (
          rows.length === 0 ? (
            <JsonInput onJsonSubmit={handleJsonSubmit} />
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={() => {
                    setRows([]);
                    setColumns([]);
                    setSections([]);
                    historyManager.clear();
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
                >
                  ← Load New JSON
                </button>
              </div>

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
                sections={sections.map((section) => ({
                  ...section,
                  columnIds: section.columnIds.filter((id) => !removedColumns.has(id)),
                }))}
                removedColumns={removedColumns}
                onCellEdit={handleCellEdit}
                onColumnRename={handleColumnRename}
                onRowDelete={handleRowDelete}
              />
            </>
          )
        )}
        {activeTab === 'beautifier' && <JsonBeautifier />}
        {activeTab === 'comparator' && <ApiComparator />}
        {activeTab === 'schema' && <SchemaGenerator />}
        {activeTab === 'logs' && <LogExplorer />}
        {activeTab === 'payload' && <PayloadAnalyzer />}
        {activeTab === 'curl' && <CurlConverter />}
        {activeTab === 'mock' && <MockApiGenerator />}
        {activeTab === 'testdata' && <TestDataGenerator />}
        {activeTab === 'config' && <ConfigComparator />}
        {activeTab === 'sql' && <SqlFormatter />}
      </main>

      {/* Services Section for SEO */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Developer Tools & Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              UnblockDevs provides a comprehensive suite of free online developer tools to streamline your development workflow. All tools work entirely in your browser - no installation required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => {
                handleTabChange('converter');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON to Excel Converter
              </h3>
              <p className="text-gray-600 text-sm">
                Convert nested JSON data to structured Excel spreadsheets. Supports complex nested objects, arrays, and custom column organization. Export to CSV or Excel format with section management.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </button>
            
            <button
              onClick={() => {
                handleTabChange('beautifier');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON Beautifier & Minifier
              </h3>
              <p className="text-gray-600 text-sm">
                Format and minify JSON data with customizable indentation. Visualize JSON structure, analyze data types, and get detailed statistics about your JSON files.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </button>
            
            <button
              onClick={() => {
                handleTabChange('comparator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('schema');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                JSON Schema Generator
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically generate JSON Schema from your JSON data. Create validation schemas for API documentation and data validation.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </button>
            
            <button
              onClick={() => {
                handleTabChange('logs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('payload');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('curl');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Curl to Code Converter
              </h3>
              <p className="text-gray-600 text-sm">
                Convert curl commands to code in multiple languages: JavaScript (Fetch), Python (Requests), Java (HttpClient), and Go (net/http). Perfect for API integration.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </button>
            
            <button
              onClick={() => {
                handleTabChange('mock');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('testdata');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('config');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
            </button>
            
            <button
              onClick={() => {
                handleTabChange('sql');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="card card-hover text-left cursor-pointer group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                SQL Formatter
              </h3>
              <p className="text-gray-600 text-sm">
                Format SQL IN clauses and queries. Convert lists of IDs or values into SQL-friendly format with proper quoting and comma separation.
              </p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:underline">
                Try it now →
              </span>
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose UnblockDevs?</h3>
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
        </div>
      </section>

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
                Professional developer tools: JSON to Excel converter, API testing, data analysis, schema generation, SQL formatting, log analysis, and more. All tools are free and work entirely in your browser.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-600">
                <span>✓ JSON to Excel Converter</span>
                <span>✓ API Response Comparator</span>
                <span>✓ JSON Beautifier</span>
                <span>✓ Schema Generator</span>
                <span>✓ SQL Formatter</span>
                <span>✓ Log Analyzer</span>
                <span>✓ Payload Analyzer</span>
                <span>✓ Mock API Generator</span>
              </div>
            </div>
            
            {/* Built with Love */}
            <div className="pt-4 border-t border-gray-200">
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

