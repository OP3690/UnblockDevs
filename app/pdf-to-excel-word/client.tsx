'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Upload, FileText, Download, Table2, Type, Loader2,
  CheckCircle2, AlertCircle, X, ChevronDown, ChevronUp,
  FileSpreadsheet, FileType2, LayoutGrid, Settings2, Eye,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
  bold: boolean;
}

interface PageContent {
  pageNum: number;
  items: TextItem[];
  width: number;
  height: number;
}

interface Block {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'table' | 'list';
  content: string | string[][] | string[];
  pageNum: number;
}

interface ParsedDocument {
  blocks: Block[];
  pageCount: number;
  hasTablesDetected: number;
}

interface Options {
  outputExcel: boolean;
  outputWord: boolean;
  pageRange: 'all' | 'custom';
  pageFrom: number;
  pageTo: number;
  separateSheets: boolean;
  tableThreshold: 'low' | 'medium' | 'high';
  mergeHyphens: boolean;
}

// ── PDF Extraction ────────────────────────────────────────────────────────────

async function extractPDFPages(
  file: File,
  onProgress: (pct: number, msg: string) => void,
  options: Options,
): Promise<PageContent[]> {
  const pdfjsLib = await import('pdfjs-dist');
  // Serve worker as a static file from /public to avoid webpack bundling issues
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  onProgress(0.05, 'Loading PDF…');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0 }).promise;

  const totalPages = pdf.numPages;
  const from = options.pageRange === 'custom' ? Math.max(1, options.pageFrom) : 1;
  const to = options.pageRange === 'custom' ? Math.min(totalPages, options.pageTo) : totalPages;

  const pages: PageContent[] = [];

  for (let i = from; i <= to; i++) {
    onProgress(0.05 + (i - from) / (to - from + 1) * 0.55, `Parsing page ${i} of ${to}…`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent({ includeMarkedContent: false });

    const items: TextItem[] = [];
    for (const raw of textContent.items) {
      if (!('str' in raw) || !raw.str.trim()) continue;
      const [scaleX, , , scaleY, x, y] = (raw as { transform: number[] }).transform;
      const fontSize = Math.abs(scaleY);
      items.push({
        text: raw.str,
        x: Math.round(x * 10) / 10,
        y: Math.round((viewport.height - y) * 10) / 10,
        width: Math.round(raw.width * 10) / 10,
        height: Math.round(fontSize * 10) / 10,
        fontSize: Math.round(fontSize * 10) / 10,
        fontName: (raw as { fontName?: string }).fontName ?? '',
        bold: /bold|heavy|black/i.test((raw as { fontName?: string }).fontName ?? ''),
      });
    }

    pages.push({ pageNum: i, items, width: viewport.width, height: viewport.height });
  }

  return pages;
}

// ── Table Detection ───────────────────────────────────────────────────────────

function detectTableRows(items: TextItem[], tolerance: number): TextItem[][] {
  const rows: TextItem[][] = [];
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);

  for (const item of sorted) {
    const existing = rows.find(r => Math.abs(r[0].y - item.y) <= tolerance);
    if (existing) {
      existing.push(item);
    } else {
      rows.push([item]);
    }
  }
  rows.forEach(r => r.sort((a, b) => a.x - b.x));
  return rows;
}

function getColumnPositions(rows: TextItem[][], colTolerance: number): number[] {
  const positions: number[] = [];
  for (const row of rows) {
    for (const item of row) {
      if (!positions.some(p => Math.abs(p - item.x) <= colTolerance)) {
        positions.push(item.x);
      }
    }
  }
  return positions.sort((a, b) => a - b);
}

function rowToTableCells(row: TextItem[], colPositions: number[], colTolerance: number): string[] {
  const cells: string[] = Array(colPositions.length).fill('');
  for (const item of row) {
    const colIdx = colPositions.findIndex(p => Math.abs(p - item.x) <= colTolerance * 2);
    if (colIdx >= 0) {
      cells[colIdx] = (cells[colIdx] ? cells[colIdx] + ' ' : '') + item.text;
    }
  }
  return cells;
}

function parsePageBlocks(page: PageContent, thresholdKey: Options['tableThreshold']): Block[] {
  const { items, pageNum } = page;
  if (!items.length) return [];

  const rowTol = thresholdKey === 'low' ? 5 : thresholdKey === 'medium' ? 3 : 1.5;
  const colTol = thresholdKey === 'low' ? 20 : thresholdKey === 'medium' ? 12 : 6;
  const minTableCols = thresholdKey === 'low' ? 2 : thresholdKey === 'medium' ? 2 : 3;
  const minTableRows = thresholdKey === 'low' ? 2 : thresholdKey === 'medium' ? 3 : 3;

  const rows = detectTableRows(items, rowTol);
  const blocks: Block[] = [];

  // Compute average font size for heading detection
  const avgFontSize = items.reduce((s, i) => s + i.fontSize, 0) / (items.length || 1);

  // Group consecutive rows into table/text blocks
  let tableBuffer: TextItem[][] = [];

  const flushTable = () => {
    if (tableBuffer.length < minTableRows) {
      for (const r of tableBuffer) {
        const text = r.map(i => i.text).join(' ');
        if (text.trim()) blocks.push({ type: 'paragraph', content: text, pageNum });
      }
      tableBuffer = [];
      return;
    }
    const colPositions = getColumnPositions(tableBuffer, colTol);
    if (colPositions.length < minTableCols) {
      for (const r of tableBuffer) {
        const text = r.map(i => i.text).join(' ');
        if (text.trim()) blocks.push({ type: 'paragraph', content: text, pageNum });
      }
      tableBuffer = [];
      return;
    }
    const tableData = tableBuffer.map(r => rowToTableCells(r, colPositions, colTol));
    blocks.push({ type: 'table', content: tableData, pageNum });
    tableBuffer = [];
  };

  for (const row of rows) {
    const colPositions = getColumnPositions([row], colTol);
    const isTableRow = row.length >= minTableCols && colPositions.length >= minTableCols;

    if (isTableRow) {
      tableBuffer.push(row);
    } else {
      flushTable();
      const text = row.map(i => i.text).join(' ').trim();
      if (!text) continue;

      const rowFontSize = row[0]?.fontSize ?? avgFontSize;
      const isBold = row.some(i => i.bold);
      const ratio = rowFontSize / avgFontSize;

      let type: Block['type'] = 'paragraph';
      if (ratio >= 1.6 || (ratio >= 1.3 && isBold)) type = 'heading1';
      else if (ratio >= 1.25 || (ratio >= 1.1 && isBold)) type = 'heading2';
      else if (ratio >= 1.1 && isBold) type = 'heading3';
      else if (/^[\u2022\u2023\u25E6\u2043\-\*]\s/.test(text)) type = 'list';

      blocks.push({ type, content: text, pageNum });
    }
  }
  flushTable();
  return blocks;
}

function parseDocument(pages: PageContent[], options: Options): ParsedDocument {
  const blocks: Block[] = [];
  for (const page of pages) {
    blocks.push(...parsePageBlocks(page, options.tableThreshold));
  }
  const tablesCount = blocks.filter(b => b.type === 'table').length;
  return { blocks, pageCount: pages.length, hasTablesDetected: tablesCount };
}

// ── Excel Export ──────────────────────────────────────────────────────────────

async function exportExcel(doc: ParsedDocument, fileName: string, options: Options) {
  const XLSX = await import('xlsx');
  const wb = XLSX.utils.book_new();

  if (options.separateSheets) {
    const pageNums = [...new Set(doc.blocks.map(b => b.pageNum))];
    for (const pageNum of pageNums) {
      const pageBlocks = doc.blocks.filter(b => b.pageNum === pageNum);
      const rows: string[][] = [];
      for (const block of pageBlocks) {
        if (block.type === 'table') {
          for (const row of block.content as string[][]) rows.push(row);
          rows.push([]);
        } else if (Array.isArray(block.content)) {
          rows.push(block.content as string[]);
        } else {
          rows.push([block.content as string]);
          if (block.type.startsWith('heading')) rows.push([]);
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(rows);
      // Bold headings
      let rowIdx = 0;
      for (const block of pageBlocks) {
        if (block.type.startsWith('heading')) {
          const cellRef = XLSX.utils.encode_cell({ r: rowIdx, c: 0 });
          if (ws[cellRef]) ws[cellRef].s = { font: { bold: true, sz: block.type === 'heading1' ? 16 : 14 } };
        }
        if (block.type === 'table') rowIdx += (block.content as string[][]).length + 1;
        else rowIdx += block.type.startsWith('heading') ? 2 : 1;
      }
      XLSX.utils.book_append_sheet(wb, ws, `Page ${pageNum}`);
    }
  } else {
    const allRows: string[][] = [];
    let tableCount = 0;
    for (const block of doc.blocks) {
      if (block.type === 'table') {
        tableCount++;
        if (tableCount > 1) allRows.push([]);
        allRows.push([`── Table ${tableCount} ──`]);
        for (const row of block.content as string[][]) allRows.push(row);
        allRows.push([]);
      } else if (Array.isArray(block.content)) {
        allRows.push(block.content as string[]);
      } else {
        allRows.push([block.content as string]);
        if (block.type.startsWith('heading')) allRows.push([]);
      }
    }
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    ws['!cols'] = [{ wch: 60 }, ...Array(10).fill({ wch: 20 })];
    XLSX.utils.book_append_sheet(wb, ws, 'Content');

    // Tables on a separate sheet
    const tableBlocks = doc.blocks.filter(b => b.type === 'table');
    if (tableBlocks.length > 1) {
      const tableRows: string[][] = [];
      tableBlocks.forEach((tb, idx) => {
        if (idx > 0) tableRows.push([]);
        tableRows.push([`Table ${idx + 1} (Page ${tb.pageNum})`]);
        for (const row of tb.content as string[][]) tableRows.push(row);
      });
      const tws = XLSX.utils.aoa_to_sheet(tableRows);
      XLSX.utils.book_append_sheet(wb, tws, 'Tables');
    }
  }

  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  downloadBlob(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${fileName}.xlsx`);
}

// ── Word Export ───────────────────────────────────────────────────────────────

async function exportWord(doc: ParsedDocument, fileName: string) {
  const { Document, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, Packer,
    WidthType, BorderStyle, AlignmentType, ShadingType } = await import('docx');

  const children: (typeof Paragraph.prototype | typeof Table.prototype)[] = [];

  for (const block of doc.blocks) {
    switch (block.type) {
      case 'heading1':
        children.push(new Paragraph({ text: block.content as string, heading: HeadingLevel.HEADING_1 }));
        break;
      case 'heading2':
        children.push(new Paragraph({ text: block.content as string, heading: HeadingLevel.HEADING_2 }));
        break;
      case 'heading3':
        children.push(new Paragraph({ text: block.content as string, heading: HeadingLevel.HEADING_3 }));
        break;
      case 'list':
        children.push(new Paragraph({
          children: [new TextRun({ text: (block.content as string).replace(/^[\u2022\u2023\u25E6\u2043\-\*]\s*/, ''), size: 24 })],
          bullet: { level: 0 },
        }));
        break;
      case 'paragraph':
        children.push(new Paragraph({ children: [new TextRun({ text: block.content as string, size: 24 })] }));
        break;
      case 'table': {
        const tableData = block.content as string[][];
        if (!tableData.length) break;
        const colCount = Math.max(...tableData.map(r => r.length));
        const colWidth = Math.floor(9000 / colCount);

        const tableRows = tableData.map((row, rowIdx) =>
          new TableRow({
            children: Array(colCount).fill(null).map((_, ci) =>
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({
                    text: row[ci] ?? '',
                    bold: rowIdx === 0,
                    size: rowIdx === 0 ? 22 : 20,
                  })],
                })],
                width: { size: colWidth, type: WidthType.DXA },
                shading: rowIdx === 0 ? { type: ShadingType.CLEAR, fill: 'E8F5E9', color: 'auto' } : undefined,
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
                },
              })
            ),
          })
        );

        children.push(new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
        children.push(new Paragraph({ text: '' }));
        break;
      }
    }
  }

  const docx = new Document({
    sections: [{ children }],
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 24 }, paragraph: { spacing: { line: 276 } } },
      },
    },
  });

  const blob = await Packer.toBlob(docx);
  downloadBlob(blob, `${fileName}.docx`);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PdfConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [error, setError] = useState('');
  const [parsedDoc, setParsedDoc] = useState<ParsedDocument | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [downloading, setDownloading] = useState<'excel' | 'word' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<Options>({
    outputExcel: true,
    outputWord: true,
    pageRange: 'all',
    pageFrom: 1,
    pageTo: 99,
    separateSheets: false,
    tableThreshold: 'medium',
    mergeHyphens: true,
  });

  const processFile = useCallback(async (f: File) => {
    setFile(f);
    setStage('processing');
    setProgress(0);
    setError('');
    setParsedDoc(null);

    try {
      const onProgress = (pct: number, msg: string) => {
        setProgress(Math.round(pct * 100));
        setProgressMsg(msg);
      };

      const pages = await extractPDFPages(f, onProgress, options);
      onProgress(0.65, 'Detecting tables and structure…');
      const doc = parseDocument(pages, options);
      onProgress(1, 'Done!');
      setParsedDoc(doc);
      setStage('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to process PDF');
      setStage('error');
    }
  }, [options]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') processFile(f);
    else setError('Please drop a PDF file.');
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleDownload = async (type: 'excel' | 'word') => {
    if (!parsedDoc || !file) return;
    setDownloading(type);
    const baseName = file.name.replace(/\.pdf$/i, '');
    try {
      if (type === 'excel') await exportExcel(parsedDoc, baseName, options);
      else await exportWord(parsedDoc, baseName);
    } finally {
      setDownloading(null);
    }
  };

  const reset = () => {
    setFile(null);
    setStage('idle');
    setProgress(0);
    setParsedDoc(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const blockCounts = parsedDoc ? {
    tables: parsedDoc.blocks.filter(b => b.type === 'table').length,
    headings: parsedDoc.blocks.filter(b => b.type.startsWith('heading')).length,
    paragraphs: parsedDoc.blocks.filter(b => b.type === 'paragraph').length,
    lists: parsedDoc.blocks.filter(b => b.type === 'list').length,
  } : null;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" />
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl shadow-lg">
              📄
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                PDF to Excel &amp; Word Converter
              </h1>
              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                Advanced parser — smart table detection, heading recognition, multi-page support.
                100% in-browser, no upload.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['100% in-browser', 'No upload', 'Smart tables', 'Free forever'].map(f => (
                  <span key={f} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-5">

        {/* Upload zone */}
        {stage === 'idle' && (
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 transition-all duration-200 ${
              dragging
                ? 'border-emerald-400 bg-emerald-50/80 scale-[1.01]'
                : 'border-zinc-300 bg-white hover:border-emerald-400 hover:bg-emerald-50/40'
            }`}
          >
            <input ref={inputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFileInput} />
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${dragging ? 'bg-emerald-100' : 'bg-zinc-100'}`}>
              <Upload className={`h-8 w-8 transition-colors ${dragging ? 'text-emerald-600' : 'text-zinc-400'}`} />
            </div>
            <p className="mt-4 text-lg font-semibold text-zinc-700">Drop your PDF here</p>
            <p className="mt-1 text-sm text-zinc-400">or click to browse • any PDF supported</p>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" /> Excel (.xlsx)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <FileType2 className="h-3.5 w-3.5 text-blue-500" /> Word (.docx)
              </span>
            </div>
          </div>
        )}

        {/* Options panel */}
        {stage === 'idle' && (
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            <button
              onClick={() => setShowOptions(o => !o)}
              className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-700"
            >
              <span className="flex items-center gap-2"><Settings2 className="h-4 w-4 text-zinc-400" /> Advanced Options</span>
              {showOptions ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
            </button>
            {showOptions && (
              <div className="border-t border-zinc-100 px-5 py-4 grid gap-5 sm:grid-cols-2">

                {/* Output format */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Output Format</p>
                  <div className="flex gap-2">
                    {(['excel', 'word'] as const).map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setOptions(o => ({ ...o, [`output${fmt === 'excel' ? 'Excel' : 'Word'}` as keyof Options]: !o[`output${fmt === 'excel' ? 'Excel' : 'Word'}` as keyof Options] }))}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                          options[fmt === 'excel' ? 'outputExcel' : 'outputWord']
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-zinc-200 bg-white text-zinc-500'
                        }`}
                      >
                        {fmt === 'excel' ? <FileSpreadsheet className="h-3.5 w-3.5" /> : <FileType2 className="h-3.5 w-3.5" />}
                        {fmt === 'excel' ? 'Excel' : 'Word'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table sensitivity */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Table Detection</p>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map(t => (
                      <button key={t} onClick={() => setOptions(o => ({ ...o, tableThreshold: t }))}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                          options.tableThreshold === t
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400">Low = detect more tables. High = only strict grids.</p>
                </div>

                {/* Page range */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Page Range</p>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => setOptions(o => ({ ...o, pageRange: 'all' }))}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${options.pageRange === 'all' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-zinc-200 bg-white text-zinc-500'}`}>
                      All pages
                    </button>
                    <button onClick={() => setOptions(o => ({ ...o, pageRange: 'custom' }))}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${options.pageRange === 'custom' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-zinc-200 bg-white text-zinc-500'}`}>
                      Custom range
                    </button>
                    {options.pageRange === 'custom' && (
                      <div className="flex items-center gap-1.5">
                        <input type="number" min={1} value={options.pageFrom} onChange={e => setOptions(o => ({ ...o, pageFrom: +e.target.value }))}
                          className="w-14 rounded border border-zinc-200 px-2 py-1 text-xs text-center" />
                        <span className="text-xs text-zinc-400">to</span>
                        <input type="number" min={1} value={options.pageTo} onChange={e => setOptions(o => ({ ...o, pageTo: +e.target.value }))}
                          className="w-14 rounded border border-zinc-200 px-2 py-1 text-xs text-center" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Separate sheets */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Excel Sheets</p>
                  <div className="flex gap-2">
                    {[false, true].map(v => (
                      <button key={String(v)} onClick={() => setOptions(o => ({ ...o, separateSheets: v }))}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${options.separateSheets === v ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-zinc-200 bg-white text-zinc-500'}`}>
                        {v ? 'One sheet per page' : 'Single sheet'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processing */}
        {stage === 'processing' && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-800">{progressMsg || 'Processing…'}</p>
                <p className="text-xs text-zinc-400">{file?.name} · {formatBytes(file?.size ?? 0)}</p>
              </div>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-zinc-400">{progress}%</p>
          </div>
        )}

        {/* Error */}
        {stage === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Processing failed</p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
            <button onClick={reset} className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
              Try again
            </button>
          </div>
        )}

        {/* Results */}
        {stage === 'done' && parsedDoc && file && (
          <>
            {/* Stats bar */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-emerald-900">Parsed successfully</span>
                <span className="text-sm text-emerald-700">· {file.name}</span>
              </div>
              <button onClick={reset} className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 flex items-center gap-1.5">
                <X className="h-3.5 w-3.5" /> New file
              </button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Pages', value: parsedDoc.pageCount, icon: '📄' },
                { label: 'Tables found', value: blockCounts?.tables ?? 0, icon: '📊', highlight: (blockCounts?.tables ?? 0) > 0 },
                { label: 'Headings', value: blockCounts?.headings ?? 0, icon: '📝' },
                { label: 'Paragraphs', value: blockCounts?.paragraphs ?? 0, icon: '💬' },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 ${s.highlight ? 'border-emerald-200 bg-emerald-50' : 'border-zinc-200 bg-white'}`}>
                  <div className="text-2xl">{s.icon}</div>
                  <div className="mt-1 text-2xl font-bold text-zinc-900">{s.value}</div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="mb-4 font-semibold text-zinc-800">Download</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleDownload('excel')}
                  disabled={!!downloading}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-60"
                >
                  {downloading === 'excel'
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <FileSpreadsheet className="h-4 w-4" />}
                  Download Excel (.xlsx)
                </button>
                <button
                  onClick={() => handleDownload('word')}
                  disabled={!!downloading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-60"
                >
                  {downloading === 'word'
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <FileType2 className="h-4 w-4" />}
                  Download Word (.docx)
                </button>
              </div>
              <p className="mt-3 text-xs text-zinc-400">Files are generated entirely in your browser. Nothing is uploaded.</p>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => setShowPreview(o => !o)}
                className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <span className="flex items-center gap-2"><Eye className="h-4 w-4 text-zinc-400" /> Content Preview</span>
                {showPreview ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
              </button>
              {showPreview && (
                <div className="border-t border-zinc-100 max-h-[520px] overflow-y-auto p-5 space-y-3">
                  {parsedDoc.blocks.slice(0, 80).map((block, idx) => {
                    if (block.type === 'table') {
                      const rows = block.content as string[][];
                      return (
                        <div key={idx}>
                          <div className="mb-1 flex items-center gap-1.5">
                            <Table2 className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                              Table · {rows.length} rows × {Math.max(...rows.map(r => r.length))} cols · p.{block.pageNum}
                            </span>
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="w-full text-xs border-collapse">
                              <tbody>
                                {rows.slice(0, 12).map((row, ri) => (
                                  <tr key={ri} className={ri === 0 ? 'bg-emerald-50 font-semibold' : ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="border border-zinc-200 px-2.5 py-1.5 text-zinc-700 max-w-[200px] truncate">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                                {rows.length > 12 && (
                                  <tr>
                                    <td colSpan={99} className="border border-zinc-200 px-2.5 py-1.5 text-center text-zinc-400 text-[11px]">
                                      +{rows.length - 12} more rows in export
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    }

                    if (block.type === 'heading1') return (
                      <p key={idx} className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-1">{block.content as string}</p>
                    );
                    if (block.type === 'heading2') return (
                      <p key={idx} className="text-base font-semibold text-zinc-800">{block.content as string}</p>
                    );
                    if (block.type === 'heading3') return (
                      <p key={idx} className="text-sm font-semibold text-zinc-700">{block.content as string}</p>
                    );
                    if (block.type === 'list') return (
                      <p key={idx} className="text-sm text-zinc-600 pl-4">• {(block.content as string).replace(/^[\u2022\-\*]\s*/, '')}</p>
                    );
                    return (
                      <p key={idx} className="text-sm text-zinc-600 leading-relaxed">{block.content as string}</p>
                    );
                  })}
                  {parsedDoc.blocks.length > 80 && (
                    <p className="text-center text-xs text-zinc-400 pt-2">
                      Showing 80 of {parsedDoc.blocks.length} blocks. Full content in exported files.
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* How it works */}
        {stage === 'idle' && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-zinc-400" /> How it works
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: '1', title: 'Upload PDF', desc: 'Drag and drop any PDF — text-based, scanned, form, or report.', icon: '📤' },
                { step: '2', title: 'Smart parsing', desc: 'AI-powered table detection using text position analysis. Identifies headings, paragraphs, lists, and multi-column tables.', icon: '🔍' },
                { step: '3', title: 'Download', desc: 'Get a structured Excel file with table sheets, or a formatted Word doc with preserved hierarchy.', icon: '⬇️' },
              ].map(s => (
                <div key={s.step} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-600">{s.step}</div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{s.icon} {s.title}</p>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
