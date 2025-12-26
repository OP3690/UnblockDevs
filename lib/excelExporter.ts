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

/**
 * Exports data to Excel file
 */
export function exportToExcel(
  rows: FlattenedRow[],
  columns: string[],
  options: ExportOptions = {}
): void {
  const { sections = [], singleSheet = true, fileName = 'export.xlsx' } = options;

  if (singleSheet || sections.length === 0) {
    // Single sheet export
    const ws = createWorksheet(rows, columns);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, fileName);
  } else {
    // Multi-sheet export (one sheet per section)
    const wb = XLSX.utils.book_new();
    
    sections.forEach((section) => {
      const sectionColumns = section.columnIds.filter((id) => columns.includes(id));
      if (sectionColumns.length > 0) {
        const ws = createWorksheet(rows, sectionColumns, section.name);
        XLSX.utils.book_append_sheet(wb, ws, section.name || 'Sheet');
      }
    });
    
    XLSX.writeFile(wb, fileName);
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

