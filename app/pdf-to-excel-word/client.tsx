'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Upload, FileText, Download, Table2, Type, Loader2,
  CheckCircle2, AlertCircle, X, ChevronDown, ChevronUp,
  FileSpreadsheet, FileType2, LayoutGrid, Settings2, Eye,
  Scan, ZoomIn, Columns, BookOpen,
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
  italic: boolean;
  color?: string;
}

interface PageContent {
  pageNum: number;
  items: TextItem[];
  width: number;
  height: number;
  isOCR?: boolean;
}

interface Block {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'table' | 'list';
  content: string | string[][] | string[];
  pageNum: number;
  bold?: boolean;
  italic?: boolean;
  fontSize?: number;
  colWidths?: number[]; // pixel widths per column for proportional sizing
}

interface ParsedDocument {
  blocks: Block[];
  pageCount: number;
  hasTablesDetected: number;
  hasOCRPages: boolean;
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
  ocrMode: 'auto' | 'always' | 'never';
  ocrLanguage: string;
  excelStyle: boolean;
  wordPreserveLayout: boolean;
}

// ── OCR ───────────────────────────────────────────────────────────────────────

let tesseractWorker: any = null;
let tesseractReady = false;

async function initTesseract(lang: string, onProgress: (msg: string) => void): Promise<any> {
  if (tesseractReady && tesseractWorker) return tesseractWorker;

  onProgress('Loading OCR engine…');
  // Dynamic import to avoid bundling
  const Tesseract = await import('tesseract.js');
  const worker = await Tesseract.createWorker(lang, 1, {
    workerPath: '/tesseract.worker.min.js',
    // langPath: CDN directory with traineddata files (e.g. eng.traineddata.gz)
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    // corePath: CDN directory that contains all 4 WASM builds (Tesseract.js v7 picks best one)
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/',
    logger: (m: any) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onProgress(`OCR: ${Math.round(m.progress * 100)}%`);
      }
    },
  });

  tesseractWorker = worker;
  tesseractReady = true;
  return worker;
}

async function ocrPage(
  page: any,
  scale: number,
  lang: string,
  onProgress: (msg: string) => void,
): Promise<TextItem[]> {
  const worker = await initTesseract(lang, onProgress);

  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx, viewport }).promise;

  const { data } = await worker.recognize(canvas);

  const items: TextItem[] = [];
  for (const word of data.words) {
    if (!word.text.trim()) continue;
    const { x0, y0, x1, y1 } = word.bbox;
    const h = y1 - y0;
    items.push({
      text: word.text,
      x: x0 / scale,
      y: y0 / scale,
      width: (x1 - x0) / scale,
      height: h / scale,
      fontSize: Math.round(h / scale),
      fontName: '',
      bold: false,
      italic: false,
    });
  }

  return items;
}

// ── PDF Extraction ────────────────────────────────────────────────────────────

function isPageScanned(items: TextItem[], pageWidth: number, pageHeight: number): boolean {
  // Fewer than 20 characters per 100 pt² area → likely scanned
  const totalChars = items.reduce((s, i) => s + i.text.length, 0);
  const area = pageWidth * pageHeight;
  return totalChars < (area / 100) * 0.2;
}

async function extractPDFPages(
  file: File,
  onProgress: (pct: number, msg: string) => void,
  options: Options,
): Promise<PageContent[]> {
  // @ts-ignore — webpackIgnore bypasses webpack
  const pdfjsLib = await import(/* webpackIgnore: true */ '/pdf.mjs') as any as typeof import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  onProgress(0.03, 'Loading PDF…');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0 }).promise;

  const totalPages = pdf.numPages;
  const from = options.pageRange === 'custom' ? Math.max(1, options.pageFrom) : 1;
  const to = options.pageRange === 'custom' ? Math.min(totalPages, options.pageTo) : totalPages;

  const pages: PageContent[] = [];

  for (let i = from; i <= to; i++) {
    const pctBase = 0.03 + (i - from) / (to - from + 1) * 0.60;
    onProgress(pctBase, `Parsing page ${i} of ${to}…`);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent({ includeMarkedContent: false });

    let items: TextItem[] = [];

    for (const raw of textContent.items) {
      if (!('str' in raw) || !raw.str.trim()) continue;
      const [scaleX, shearY, shearX, scaleY, x, y] = (raw as any).transform as number[];
      const fontSize = Math.abs(scaleY);
      const fontName: string = (raw as any).fontName ?? '';
      items.push({
        text: (raw as any).str,
        x: Math.round(x * 10) / 10,
        y: Math.round((viewport.height - y) * 10) / 10,
        width: Math.round((raw as any).width * 10) / 10,
        height: Math.round(fontSize * 10) / 10,
        fontSize: Math.round(fontSize * 10) / 10,
        fontName,
        bold: /bold|heavy|black/i.test(fontName),
        italic: /italic|oblique/i.test(fontName),
      });
    }

    // OCR fallback
    let isOCR = false;
    if (
      options.ocrMode === 'always' ||
      (options.ocrMode === 'auto' && isPageScanned(items, viewport.width, viewport.height))
    ) {
      onProgress(pctBase + 0.01, `OCR scanning page ${i}…`);
      try {
        const ocrItems = await ocrPage(page, 2, options.ocrLanguage, (msg) =>
          onProgress(pctBase, msg)
        );
        if (ocrItems.length > items.length || items.length < 5) {
          items = ocrItems;
          isOCR = true;
        }
      } catch (err) {
        console.warn('OCR failed for page', i, err);
      }
    }

    pages.push({ pageNum: i, items, width: viewport.width, height: viewport.height, isOCR });
  }

  return pages;
}

// ── Advanced Table Detection ──────────────────────────────────────────────────

function clusterPositions(values: number[], tolerance: number): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const clusters: number[] = [];
  for (const v of sorted) {
    const existing = clusters.find(c => Math.abs(c - v) <= tolerance);
    if (existing === undefined) clusters.push(v);
  }
  return clusters;
}

function detectColumnBoundaries(rows: TextItem[][], pageWidth: number): number[] {
  // Collect all left edges and right edges
  const leftEdges: number[] = [];
  for (const row of rows) for (const item of row) leftEdges.push(item.x);

  // Cluster to find column starts
  const colStarts = clusterPositions(leftEdges, 12);

  // Score each cluster — how many items align to it?
  const scored = colStarts.map(start => ({
    x: start,
    count: rows.reduce((sum, row) => sum + row.filter(i => Math.abs(i.x - start) <= 12).length, 0),
  }));

  // Keep columns that appear in at least 20% of rows
  const threshold = rows.length * 0.2;
  return scored.filter(c => c.count >= threshold).map(c => c.x);
}

function detectTableRows(items: TextItem[], tolerance: number): TextItem[][] {
  const rows: TextItem[][] = [];
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);

  for (const item of sorted) {
    const existing = rows.find(r => Math.abs(r[0].y - item.y) <= tolerance);
    if (existing) existing.push(item);
    else rows.push([item]);
  }
  rows.forEach(r => r.sort((a, b) => a.x - b.x));
  return rows;
}

function rowToTableCells(
  row: TextItem[],
  colPositions: number[],
  colTolerance: number,
): string[] {
  const cells: string[] = Array(colPositions.length).fill('');
  for (const item of row) {
    // Find nearest column — allow 2× tolerance for cells that drift slightly
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < colPositions.length; i++) {
      const dist = Math.abs(item.x - colPositions[i]);
      if (dist < bestDist && dist <= colTolerance * 2.5) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    if (bestIdx >= 0) {
      cells[bestIdx] = cells[bestIdx] ? `${cells[bestIdx]} ${item.text}` : item.text;
    }
  }
  return cells;
}

function scoreRowAsTable(row: TextItem[], colPositions: number[], colTol: number): number {
  if (!row.length || !colPositions.length) return 0;
  const aligned = row.filter(item =>
    colPositions.some(p => Math.abs(item.x - p) <= colTol * 2)
  ).length;
  return aligned / row.length;
}

function parsePageBlocks(page: PageContent, thresholdKey: Options['tableThreshold']): Block[] {
  const { items, pageNum, width: pageWidth } = page;
  if (!items.length) return [];

  const rowTol = thresholdKey === 'low' ? 6 : thresholdKey === 'medium' ? 3.5 : 2;
  const colTol = thresholdKey === 'low' ? 22 : thresholdKey === 'medium' ? 14 : 7;
  const minTableCols = 2;
  const minTableRows = thresholdKey === 'low' ? 2 : 3;
  const tableScoreThreshold = thresholdKey === 'low' ? 0.5 : thresholdKey === 'medium' ? 0.65 : 0.8;

  const rows = detectTableRows(items, rowTol);
  const blocks: Block[] = [];

  // Compute average font size and median for heading detection
  const fontSizes = items.map(i => i.fontSize).filter(s => s > 0).sort((a, b) => a - b);
  const medianFontSize = fontSizes[Math.floor(fontSizes.length / 2)] || 12;
  const avgFontSize = fontSizes.reduce((s, v) => s + v, 0) / (fontSizes.length || 1);

  // Detect candidate column positions across all rows
  const allColPositions = detectColumnBoundaries(rows, pageWidth);

  let tableBuffer: TextItem[][] = [];
  let tableColPositions: number[] = [];

  const flushTable = () => {
    if (tableBuffer.length < minTableRows) {
      for (const r of tableBuffer) {
        const text = r.map(i => i.text).join(' ');
        if (text.trim()) blocks.push({ type: 'paragraph', content: text, pageNum });
      }
      tableBuffer = [];
      tableColPositions = [];
      return;
    }

    const colPositions = tableColPositions.length >= minTableCols
      ? tableColPositions
      : detectColumnBoundaries(tableBuffer, pageWidth);

    if (colPositions.length < minTableCols) {
      for (const r of tableBuffer) {
        const text = r.map(i => i.text).join(' ');
        if (text.trim()) blocks.push({ type: 'paragraph', content: text, pageNum });
      }
      tableBuffer = [];
      tableColPositions = [];
      return;
    }

    // Calculate column pixel widths for proportional Word/Excel sizing
    const colWidths: number[] = [];
    for (let c = 0; c < colPositions.length; c++) {
      const next = colPositions[c + 1] ?? pageWidth;
      colWidths.push(next - colPositions[c]);
    }

    const tableData = tableBuffer.map(r => rowToTableCells(r, colPositions, colTol));
    blocks.push({ type: 'table', content: tableData, pageNum, colWidths });
    tableBuffer = [];
    tableColPositions = [];
  };

  for (const row of rows) {
    // Score this row against global column positions
    const tableScore = allColPositions.length >= minTableCols
      ? scoreRowAsTable(row, allColPositions, colTol)
      : 0;
    const isTableRow = row.length >= minTableCols && tableScore >= tableScoreThreshold;

    if (isTableRow) {
      if (tableBuffer.length === 0) {
        // Start new table: use column positions from this row
        tableColPositions = detectColumnBoundaries([row], pageWidth).filter(p =>
          allColPositions.some(ap => Math.abs(ap - p) <= colTol * 2)
        );
        if (tableColPositions.length < minTableCols) tableColPositions = allColPositions;
      }
      tableBuffer.push(row);
    } else {
      flushTable();
      const text = row.map(i => i.text).join(' ').trim();
      if (!text) continue;

      const rowFontSize = row.reduce((mx, i) => Math.max(mx, i.fontSize), 0) || medianFontSize;
      const isBold = row.some(i => i.bold);
      const isItalic = row.every(i => i.italic);
      const ratio = rowFontSize / medianFontSize;

      let type: Block['type'] = 'paragraph';
      if (ratio >= 1.7 || (ratio >= 1.3 && isBold)) type = 'heading1';
      else if (ratio >= 1.25 || (ratio >= 1.1 && isBold)) type = 'heading2';
      else if (ratio >= 1.08 && isBold) type = 'heading3';
      else if (/^[•‣◦⁃–\-\*•]\s/.test(text)) type = 'list';

      blocks.push({ type, content: text, pageNum, bold: isBold, italic: isItalic, fontSize: rowFontSize });
    }
  }
  flushTable();
  return blocks;
}

function parseDocument(pages: PageContent[], options: Options): ParsedDocument {
  const blocks: Block[] = [];
  let hasOCRPages = false;

  for (const page of pages) {
    if (page.isOCR) hasOCRPages = true;
    blocks.push(...parsePageBlocks(page, options.tableThreshold));
  }

  // Merge hyphenated words across blocks if enabled
  if (options.mergeHyphens) {
    for (let i = 0; i < blocks.length - 1; i++) {
      const curr = blocks[i];
      const next = blocks[i + 1];
      if (
        curr.type === 'paragraph' &&
        next.type === 'paragraph' &&
        typeof curr.content === 'string' &&
        typeof next.content === 'string' &&
        /\w-$/.test(curr.content)
      ) {
        const firstWordOfNext = (next.content as string).split(' ')[0];
        curr.content = (curr.content as string).slice(0, -1) + firstWordOfNext;
        next.content = (next.content as string).slice(firstWordOfNext.length).trimStart();
        if (!next.content) blocks.splice(i + 1, 1);
      }
    }
  }

  const tablesCount = blocks.filter(b => b.type === 'table').length;
  return { blocks, pageCount: pages.length, hasTablesDetected: tablesCount, hasOCRPages };
}

// ── Excel Export ──────────────────────────────────────────────────────────────

// Column width from content (in characters, for xlsx)
function calcColWidth(cells: string[], headerRow?: string[]): number {
  const allCells = headerRow ? [...cells, ...headerRow] : cells;
  const maxLen = allCells.reduce((mx, c) => Math.max(mx, (c ?? '').length), 0);
  return Math.min(Math.max(maxLen + 2, 8), 60);
}

async function exportExcel(doc: ParsedDocument, fileName: string, options: Options) {
  const XLSX = await import('xlsx');

  // XLSX needs cell styles — use write options bookSST and cellStyles
  const wb = XLSX.utils.book_new();

  // Color palette
  const HEADER_BG = 'C6EFCE';
  const HEADER_FG = '006100';
  const ALT_ROW_BG = 'F2F9F4';
  const TABLE_BORDER = 'BFBFBF';
  const TITLE_BG = '305496';
  const TITLE_FG = 'FFFFFF';

  function makeHeaderStyle(isFirstRow: boolean) {
    return {
      font: { bold: true, color: { rgb: isFirstRow ? HEADER_FG : '000000' }, sz: 11 },
      fill: { fgColor: { rgb: isFirstRow ? HEADER_BG : ALT_ROW_BG }, patternType: 'solid' },
      border: {
        top: { style: 'thin', color: { rgb: TABLE_BORDER } },
        bottom: { style: 'thin', color: { rgb: TABLE_BORDER } },
        left: { style: 'thin', color: { rgb: TABLE_BORDER } },
        right: { style: 'thin', color: { rgb: TABLE_BORDER } },
      },
      alignment: { vertical: 'center', wrapText: true },
    };
  }

  function makeDataStyle(rowIdx: number, isNumber: boolean) {
    return {
      font: { sz: 10 },
      fill: rowIdx % 2 === 0 ? { fgColor: { rgb: ALT_ROW_BG }, patternType: 'solid' } : undefined,
      border: {
        top: { style: 'thin', color: { rgb: TABLE_BORDER } },
        bottom: { style: 'thin', color: { rgb: TABLE_BORDER } },
        left: { style: 'thin', color: { rgb: TABLE_BORDER } },
        right: { style: 'thin', color: { rgb: TABLE_BORDER } },
      },
      alignment: { vertical: 'top', horizontal: isNumber ? 'right' : 'left', wrapText: true },
    };
  }

  function makeTitleStyle() {
    return {
      font: { bold: true, color: { rgb: TITLE_FG }, sz: 12 },
      fill: { fgColor: { rgb: TITLE_BG }, patternType: 'solid' },
      alignment: { vertical: 'center' },
    };
  }

  function makeHeadingStyle(level: number) {
    const sizes: Record<number, number> = { 1: 16, 2: 13, 3: 11 };
    return {
      font: { bold: true, sz: sizes[level] ?? 11 },
      alignment: { vertical: 'top' },
    };
  }

  function applyStylesToSheet(ws: any, rows: any[][], styleMap: Record<string, any>) {
    for (const [ref, style] of Object.entries(styleMap)) {
      if (ws[ref]) ws[ref].s = style;
    }
  }

  function buildSheet(pageBlocks: Block[]): any {
    const rows: any[][] = [];
    const styleMap: Record<string, any> = {};
    let rowIdx = 0;

    for (const block of pageBlocks) {
      if (block.type === 'table') {
        const tableData = block.content as string[][];
        if (!tableData.length) continue;

        for (let ri = 0; ri < tableData.length; ri++) {
          const row = tableData[ri];
          rows.push(row);
          for (let ci = 0; ci < row.length; ci++) {
            const ref = XLSX.utils.encode_cell({ r: rowIdx, c: ci });
            styleMap[ref] = ri === 0 ? makeHeaderStyle(true) : makeDataStyle(ri, /^-?[\d,.]+%?$/.test((row[ci] ?? '').trim()));
          }
          rowIdx++;
        }
        rows.push([]); // spacer
        rowIdx++;
      } else if (block.type === 'heading1' || block.type === 'heading2' || block.type === 'heading3') {
        const level = parseInt(block.type.slice(-1));
        rows.push([block.content as string]);
        const ref = XLSX.utils.encode_cell({ r: rowIdx, c: 0 });
        styleMap[ref] = makeHeadingStyle(level);
        rowIdx++;
        rows.push([]);
        rowIdx++;
      } else if (block.type === 'list') {
        rows.push([`  • ${(block.content as string).replace(/^[•‣◦⁃\-\*•]\s*/, '')}`]);
        rowIdx++;
      } else {
        rows.push([block.content as string]);
        rowIdx++;
      }
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    applyStylesToSheet(ws, rows, styleMap);
    return ws;
  }

  if (options.separateSheets) {
    const pageNums = [...new Set(doc.blocks.map(b => b.pageNum))];
    for (const pageNum of pageNums) {
      const pageBlocks = doc.blocks.filter(b => b.pageNum === pageNum);
      const ws = buildSheet(pageBlocks);

      // Auto column widths
      const colMax: number[] = [];
      for (const block of pageBlocks) {
        if (block.type === 'table') {
          const tableData = block.content as string[][];
          for (const row of tableData) {
            row.forEach((cell, ci) => {
              colMax[ci] = Math.max(colMax[ci] ?? 6, (cell ?? '').length + 2);
            });
          }
        }
      }
      ws['!cols'] = colMax.length
        ? colMax.map(w => ({ wch: Math.min(w, 60) }))
        : [{ wch: 60 }, ...Array(15).fill({ wch: 20 })];

      XLSX.utils.book_append_sheet(wb, ws, `Page ${pageNum}`);
    }
  } else {
    // Single sheet with all content
    const ws = buildSheet(doc.blocks);
    ws['!cols'] = [{ wch: 60 }, ...Array(15).fill({ wch: 22 })];
    XLSX.utils.book_append_sheet(wb, ws, 'Content');

    // Separate "Tables" sheet with just extracted tables, richly formatted
    const tableBlocks = doc.blocks.filter(b => b.type === 'table');
    if (tableBlocks.length) {
      const tableRows: any[][] = [];
      const tableStyleMap: Record<string, any> = {};
      let rowIdx = 0;

      for (let ti = 0; ti < tableBlocks.length; ti++) {
        const tb = tableBlocks[ti];
        const tableData = tb.content as string[][];
        const colCount = Math.max(...tableData.map(r => r.length));

        // Table title row
        tableRows.push([`Table ${ti + 1}  (Page ${tb.pageNum})`]);
        const titleRef = XLSX.utils.encode_cell({ r: rowIdx, c: 0 });
        tableStyleMap[titleRef] = makeTitleStyle();
        rowIdx++;

        for (let ri = 0; ri < tableData.length; ri++) {
          const row = tableData[ri];
          tableRows.push(row);
          for (let ci = 0; ci < row.length; ci++) {
            const ref = XLSX.utils.encode_cell({ r: rowIdx, c: ci });
            tableStyleMap[ref] = ri === 0
              ? makeHeaderStyle(true)
              : makeDataStyle(ri, /^-?[\d,.]+%?$/.test((row[ci] ?? '').trim()));
          }
          rowIdx++;
        }

        tableRows.push([], []); // double spacer
        rowIdx += 2;
      }

      const tws = XLSX.utils.aoa_to_sheet(tableRows);
      applyStylesToSheet(tws, tableRows, tableStyleMap);

      // Auto-fit column widths for tables sheet
      const colMax: number[] = [];
      for (const tb of tableBlocks) {
        for (const row of tb.content as string[][]) {
          row.forEach((cell, ci) => {
            colMax[ci] = Math.max(colMax[ci] ?? 6, (cell ?? '').length + 2);
          });
        }
      }
      tws['!cols'] = colMax.map(w => ({ wch: Math.min(w, 60) }));

      XLSX.utils.book_append_sheet(wb, tws, 'Tables');
    }
  }

  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx', cellStyles: true });
  downloadBlob(
    new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `${fileName}.xlsx`,
  );
}

// ── Word Export ───────────────────────────────────────────────────────────────

async function exportWord(doc: ParsedDocument, fileName: string, options: Options) {
  const {
    Document, Paragraph, TextRun, Table, TableRow, TableCell,
    HeadingLevel, Packer, WidthType, BorderStyle, AlignmentType,
    ShadingType, TableLayoutType,
  } = await import('docx');

  // Compute base font size from median paragraph font size in blocks
  const fontSizes = doc.blocks
    .filter(b => b.type === 'paragraph' && typeof b.fontSize === 'number')
    .map(b => b.fontSize!);
  const sortedFonts = [...fontSizes].sort((a, b) => a - b);
  const baseFontPt = sortedFonts[Math.floor(sortedFonts.length / 2)] || 11;

  // Convert PDF pt to docx half-points (1 pt = 2 half-points)
  const toDocxSize = (pdfPt: number): number => {
    const ratio = pdfPt / baseFontPt;
    const docxPt = Math.round(ratio * 11); // normalize to 11pt base
    return Math.max(16, Math.min(docxPt * 2, 72)); // clamp 8pt–36pt in half-points
  };

  const children: any[] = [];

  for (const block of doc.blocks) {
    switch (block.type) {
      case 'heading1':
        children.push(new Paragraph({
          text: block.content as string,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
        }));
        break;

      case 'heading2':
        children.push(new Paragraph({
          text: block.content as string,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        }));
        break;

      case 'heading3':
        children.push(new Paragraph({
          text: block.content as string,
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 60 },
        }));
        break;

      case 'list':
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: (block.content as string).replace(/^[•‣◦⁃\-\*•]\s*/, ''),
              size: toDocxSize(block.fontSize ?? baseFontPt),
              bold: block.bold,
              italics: block.italic,
            }),
          ],
          bullet: { level: 0 },
          spacing: { before: 40, after: 40 },
        }));
        break;

      case 'paragraph': {
        const text = block.content as string;
        const size = toDocxSize(block.fontSize ?? baseFontPt);
        children.push(new Paragraph({
          children: [
            new TextRun({
              text,
              size,
              bold: block.bold,
              italics: block.italic,
            }),
          ],
          spacing: { before: 60, after: 60, line: 276 },
        }));
        break;
      }

      case 'table': {
        const tableData = block.content as string[][];
        if (!tableData.length) break;
        const colCount = Math.max(...tableData.map(r => r.length));

        // Proportional column widths (total 9000 DXA = ~6.25 inches)
        let colWidths: number[];
        if (block.colWidths && block.colWidths.length === colCount) {
          const totalPdfWidth = block.colWidths.reduce((s, w) => s + w, 0);
          colWidths = block.colWidths.map(w => Math.round((w / totalPdfWidth) * 9000));
        } else {
          colWidths = Array(colCount).fill(Math.floor(9000 / colCount));
        }

        const tableRows = tableData.map((row, rowIdx) =>
          new TableRow({
            tableHeader: rowIdx === 0,
            children: Array(colCount).fill(null).map((_, ci) => {
              const cellText = row[ci] ?? '';
              const isHeader = rowIdx === 0;
              const isAltRow = rowIdx % 2 === 0 && rowIdx > 0;
              return new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: cellText,
                        bold: isHeader,
                        size: isHeader ? 20 : 19,
                        color: isHeader ? '1F4E79' : '000000',
                      }),
                    ],
                    spacing: { before: 40, after: 40 },
                  }),
                ],
                width: { size: colWidths[ci], type: WidthType.DXA },
                shading: isHeader
                  ? { type: ShadingType.CLEAR, fill: 'DDEEFF', color: 'auto' }
                  : isAltRow
                  ? { type: ShadingType.CLEAR, fill: 'F5F9FF', color: 'auto' }
                  : undefined,
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: 'AACCEE' },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: 'AACCEE' },
                  left: { style: BorderStyle.SINGLE, size: 4, color: 'AACCEE' },
                  right: { style: BorderStyle.SINGLE, size: 4, color: 'AACCEE' },
                },
                margins: { top: 40, bottom: 40, left: 80, right: 80 },
              });
            }),
          })
        );

        children.push(
          new Table({
            rows: tableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
            layout: TableLayoutType.FIXED,
          })
        );
        children.push(new Paragraph({ text: '', spacing: { before: 120, after: 60 } }));
        break;
      }
    }
  }

  const wordDoc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
          },
        },
        children,
      },
    ],
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22, color: '000000' },
          paragraph: { spacing: { line: 276 } },
        },
        heading1: {
          run: { font: 'Calibri Light', size: 36, bold: true, color: '2F5496' },
          paragraph: { spacing: { before: 360, after: 120 } },
        },
        heading2: {
          run: { font: 'Calibri Light', size: 28, bold: true, color: '2F5496' },
          paragraph: { spacing: { before: 280, after: 80 } },
        },
        heading3: {
          run: { font: 'Calibri Light', size: 24, bold: true, color: '2F5496' },
          paragraph: { spacing: { before: 200, after: 60 } },
        },
      },
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          run: { font: 'Calibri', size: 22 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      ],
    },
  });

  const blob = await Packer.toBlob(wordDoc);
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
    ocrMode: 'auto',
    ocrLanguage: 'eng',
    excelStyle: true,
    wordPreserveLayout: true,
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
      onProgress(0.70, 'Detecting tables and structure…');
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
      else await exportWord(parsedDoc, baseName, options);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed');
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
                Advanced converter with OCR support — extracts tables, headings, and formatted text.
                Works on text-based and scanned PDFs. 100% in-browser.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['OCR for scanned PDFs', 'Format-preserving', 'Smart table extraction', '100% in-browser', 'Free forever'].map(f => (
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
            <p className="mt-1 text-sm text-zinc-400">or click to browse • text PDFs and scanned docs supported</p>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" /> Excel (.xlsx)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <FileType2 className="h-3.5 w-3.5 text-blue-500" /> Word (.docx)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
                <Scan className="h-3.5 w-3.5 text-violet-500" /> OCR ready
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
              <div className="border-t border-zinc-100 px-5 py-5 grid gap-6 sm:grid-cols-2">

                {/* OCR Mode */}
                <div className="sm:col-span-2">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <Scan className="h-3.5 w-3.5 text-violet-500" /> OCR Mode
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {([
                      { val: 'auto', label: 'Auto-detect', desc: 'Use OCR only for scanned pages' },
                      { val: 'always', label: 'Always OCR', desc: 'Use OCR for all pages (slower)' },
                      { val: 'never', label: 'Text only', desc: 'Skip OCR — text PDFs only' },
                    ] as const).map(({ val, label, desc }) => (
                      <button
                        key={val}
                        onClick={() => setOptions(o => ({ ...o, ocrMode: val }))}
                        className={`flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-colors ${
                          options.ocrMode === val
                            ? 'border-violet-300 bg-violet-50 text-violet-900'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                        }`}
                      >
                        <span className="text-xs font-semibold">{label}</span>
                        <span className="text-[10px] opacity-70">{desc}</span>
                      </button>
                    ))}
                  </div>
                  {options.ocrMode !== 'never' && (
                    <div className="mt-3 flex items-center gap-2">
                      <label className="text-xs text-zinc-500 font-medium">Language:</label>
                      <select
                        value={options.ocrLanguage}
                        onChange={e => setOptions(o => ({ ...o, ocrLanguage: e.target.value }))}
                        className="rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-700 bg-white"
                      >
                        <option value="eng">English</option>
                        <option value="fra">French</option>
                        <option value="deu">German</option>
                        <option value="spa">Spanish</option>
                        <option value="por">Portuguese</option>
                        <option value="ita">Italian</option>
                        <option value="chi_sim">Chinese (Simplified)</option>
                        <option value="jpn">Japanese</option>
                        <option value="kor">Korean</option>
                        <option value="ara">Arabic</option>
                        <option value="rus">Russian</option>
                        <option value="hin">Hindi</option>
                      </select>
                      <p className="text-[10px] text-zinc-400">First OCR scan downloads the language model (~5 MB)</p>
                    </div>
                  )}
                </div>

                {/* Table sensitivity */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <Table2 className="h-3.5 w-3.5 text-emerald-500" /> Table Detection
                  </p>
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
                  <p className="mt-1 text-[11px] text-zinc-400">Low = detect more tables. High = strict grids only.</p>
                </div>

                {/* Page range */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-sky-500" /> Page Range
                  </p>
                  <div className="flex gap-2 items-center flex-wrap">
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

                {/* Excel sheets */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center gap-1.5">
                    <Columns className="h-3.5 w-3.5 text-emerald-500" /> Excel Sheets
                  </p>
                  <div className="flex gap-2">
                    {[false, true].map(v => (
                      <button key={String(v)} onClick={() => setOptions(o => ({ ...o, separateSheets: v }))}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${options.separateSheets === v ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-zinc-200 bg-white text-zinc-500'}`}>
                        {v ? 'One sheet per page' : 'Single sheet'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Merge hyphens */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Text Options</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.mergeHyphens}
                      onChange={e => setOptions(o => ({ ...o, mergeHyphens: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-xs text-zinc-600">Merge hyphenated line breaks</span>
                  </label>
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
            {progress < 30 && options.ocrMode !== 'never' && (
              <p className="mt-2 text-xs text-violet-500 flex items-center gap-1">
                <Scan className="h-3 w-3" /> OCR engine may download language model on first use (~5 MB)
              </p>
            )}
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
              <div className="flex items-center gap-2 flex-wrap">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-900">Parsed successfully</span>
                <span className="text-sm text-emerald-700">· {file.name}</span>
                {parsedDoc.hasOCRPages && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 border border-violet-200 px-2 py-0.5 text-[10px] font-semibold text-violet-800">
                    <Scan className="h-2.5 w-2.5" /> OCR used
                  </span>
                )}
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
              {parsedDoc.hasTablesDetected > 0 && (
                <p className="mt-1 text-xs text-emerald-600">
                  ✓ {parsedDoc.hasTablesDetected} table{parsedDoc.hasTablesDetected !== 1 ? 's' : ''} detected — Excel file includes a dedicated "Tables" sheet with rich formatting.
                </p>
              )}
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
                <div className="border-t border-zinc-100 max-h-[560px] overflow-y-auto p-5 space-y-3">
                  {parsedDoc.blocks.slice(0, 100).map((block, idx) => {
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
                                {rows.slice(0, 15).map((row, ri) => (
                                  <tr key={ri} className={ri === 0 ? 'bg-emerald-50 font-semibold' : ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="border border-zinc-200 px-2.5 py-1.5 text-zinc-700 max-w-[200px] truncate">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                                {rows.length > 15 && (
                                  <tr>
                                    <td colSpan={99} className="border border-zinc-200 px-2.5 py-1.5 text-center text-zinc-400 text-[11px]">
                                      +{rows.length - 15} more rows in export
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
                      <p key={idx} className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-1 mt-3">{block.content as string}</p>
                    );
                    if (block.type === 'heading2') return (
                      <p key={idx} className="text-base font-semibold text-zinc-800 mt-2">{block.content as string}</p>
                    );
                    if (block.type === 'heading3') return (
                      <p key={idx} className="text-sm font-semibold text-zinc-700">{block.content as string}</p>
                    );
                    if (block.type === 'list') return (
                      <p key={idx} className="text-sm text-zinc-600 pl-4">• {(block.content as string).replace(/^[•\-\*•]\s*/, '')}</p>
                    );
                    return (
                      <p key={idx} className={`text-sm leading-relaxed ${block.bold ? 'font-semibold text-zinc-800' : 'text-zinc-600'} ${block.italic ? 'italic' : ''}`}>
                        {block.content as string}
                      </p>
                    );
                  })}
                  {parsedDoc.blocks.length > 100 && (
                    <p className="text-center text-xs text-zinc-400 pt-2">
                      Showing 100 of {parsedDoc.blocks.length} blocks. Full content in exported files.
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
                {
                  step: '1', title: 'Upload PDF', icon: '📤',
                  desc: 'Drop any PDF — text-based reports, scanned documents, forms, or tables. Up to hundreds of pages.',
                },
                {
                  step: '2', title: 'Smart parsing + OCR', icon: '🔍',
                  desc: 'Text PDFs are parsed directly for 100% accuracy. Scanned pages are automatically run through OCR (Tesseract engine) to extract text from images.',
                },
                {
                  step: '3', title: 'Download', icon: '⬇️',
                  desc: 'Excel: tables get their own richly-formatted sheet with bold headers, borders, and auto-fitted columns. Word: headings, paragraphs, and tables with preserved hierarchy.',
                },
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

            {/* Feature highlights */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 border-t border-zinc-100 pt-5">
              {[
                { icon: '🖨️', title: 'OCR for scanned PDFs', desc: 'Automatically detects scanned pages and runs Tesseract OCR — supports 12+ languages.' },
                { icon: '📊', title: 'Advanced table extraction', desc: 'Column alignment scoring identifies complex multi-column tables, not just simple grids.' },
                { icon: '🎨', title: 'Rich Excel formatting', desc: 'Bold headers, alternating row colors, auto column widths, and a dedicated Tables sheet.' },
                { icon: '📝', title: 'Format-preserving Word', desc: 'Font size ratios preserved, bold/italic detected, proportional table column widths.' },
              ].map(f => (
                <div key={f.title} className="flex gap-3 rounded-xl bg-zinc-50 border border-zinc-100 p-3">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900">{f.title}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{f.desc}</p>
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
