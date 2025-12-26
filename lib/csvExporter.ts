import { FlattenedRow } from './jsonParser';

/**
 * Exports data to CSV file
 */
export function exportToCSV(
  rows: FlattenedRow[],
  columns: string[],
  fileName: string = 'export.csv'
): void {
  // Create CSV header
  const header = columns.join(',');
  
  // Create CSV rows
  const csvRows = rows.map((row) => {
    return columns.map((col) => {
      const value = row[col];
      if (value === undefined || value === null) {
        return '';
      }
      // Convert objects/arrays to JSON string
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // Escape quotes and wrap in quotes if contains comma, newline, or quote
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',');
  });
  
  // Combine header and rows
  const csvContent = [header, ...csvRows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

