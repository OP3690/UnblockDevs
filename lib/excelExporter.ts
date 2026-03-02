import * as XLSX from 'xlsx';
import { FlattenedRow } from './jsonParser';

export interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

export interface ExportOptions {
  sections?: Section[];
  singleSheet?: boolean;
  fileName?: string;
}

/** Excel sheet names: max 31 chars, no \ / * ? : [ ] */
function sanitizeSheetName(name: string): string {
  const sanitized = name.replace(/[\\/*?:\[\]]/g, '').slice(0, 31);
  return sanitized || 'Sheet';
}

/** Trigger browser download via Blob + anchor (more reliable than XLSX.writeFile) */
function downloadWorkbook(wb: XLSX.WorkBook, fileName: string): void {
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports data to Excel file
 */
export function exportToExcel(
  rows: FlattenedRow[],
  columns: string[],
  options: ExportOptions = {}
): void {
  const { sections = [], singleSheet = true, fileName = 'export.xlsx' } = options;

  // Ensure we have at least one column to export
  const cols = columns.length > 0 ? columns : (rows[0] ? Object.keys(rows[0]) : []);
  if (cols.length === 0) return;

  if (singleSheet || sections.length === 0) {
    const ws = createWorksheet(rows, cols);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName('Data'));
    downloadWorkbook(wb, fileName);
  } else {
    const wb = XLSX.utils.book_new();
    let sheetIndex = 0;
    sections.forEach((section) => {
      const sectionColumns = section.columnIds.filter((id) => columns.includes(id));
      if (sectionColumns.length > 0) {
        const ws = createWorksheet(rows, sectionColumns, section.name);
        const name = sanitizeSheetName(section.name || `Sheet${sheetIndex + 1}`);
        XLSX.utils.book_append_sheet(wb, ws, name);
        sheetIndex++;
      }
    });
    if (sheetIndex > 0) {
      downloadWorkbook(wb, fileName);
    } else {
      // No sections had columns; fall back to single sheet
      const ws = createWorksheet(rows, cols);
      XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName('Data'));
      downloadWorkbook(wb, fileName);
    }
  }
}

/**
 * Creates a worksheet from rows and columns
 */
function createWorksheet(
  rows: FlattenedRow[],
  columns: string[],
  sectionName?: string
): XLSX.WorkSheet {
  // Prepare data array
  const data: any[][] = [];
  
  // Add header row
  data.push(columns);
  
  // Add data rows
  rows.forEach((row) => {
    const rowData = columns.map((col) => {
      const value = row[col];
      // Convert undefined/null to empty string
      if (value === undefined || value === null) {
        return '';
      }
      // Convert objects/arrays to JSON string
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value;
    });
    data.push(rowData);
  });
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Auto-size columns
  const colWidths = columns.map((col, idx) => {
    const maxLength = Math.max(
      col.length,
      ...rows.map((row) => {
        const val = row[col];
        return val ? String(val).length : 0;
      })
    );
    return { wch: Math.min(Math.max(maxLength + 2, 10), 50) };
  });
  
  ws['!cols'] = colWidths;
  
  return ws;
}

