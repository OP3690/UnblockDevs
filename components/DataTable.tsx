'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Edit2, X, Download, FileSpreadsheet } from 'lucide-react';
import { FlattenedRow, Column } from '@/lib/jsonParser';
import { exportToExcel } from '@/lib/excelExporter';
import { exportToCSV } from '@/lib/csvExporter';
import toast from 'react-hot-toast';

interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

interface DataTableProps {
  rows: FlattenedRow[];
  columns: Column[];
  sections: Section[];
  removedColumns: Set<string>;
  onCellEdit: (rowIndex: number, columnId: string, value: any) => void;
  onColumnRename: (columnId: string, newName: string) => void;
  onRowDelete: (rowIndex: number) => void;
}

export default function DataTable({
  rows,
  columns,
  sections,
  removedColumns,
  onCellEdit,
  onColumnRename,
  onRowDelete,
}: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});

  // Get columns organized by sections
  const columnsBySection = useMemo(() => {
    const sectionMap = new Map<string, Column[]>();
    const unassignedColumns: Column[] = [];

    sections.forEach((section) => {
      sectionMap.set(section.id, []);
    });

    columns.forEach((col) => {
      let assigned = false;
      sections.forEach((section) => {
        if (section.columnIds.includes(col.id)) {
          sectionMap.get(section.id)?.push(col);
          assigned = true;
        }
      });
      if (!assigned) {
        unassignedColumns.push(col);
      }
    });

    return { sectionMap, unassignedColumns };
  }, [columns, sections]);

  // Filter and sort rows
  const processedRows = useMemo(() => {
    let filtered = rows.filter((row) => {
      return Object.entries(filters).every(([columnId, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[columnId] || '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });

    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison =
          typeof aVal === 'string'
            ? aVal.localeCompare(String(bVal))
            : Number(aVal) - Number(bVal);

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [rows, filters, sortConfig]);

  const handleSort = (columnId: string) => {
    setSortConfig((current) => {
      if (current?.key === columnId) {
        if (current.direction === 'asc') {
          return { key: columnId, direction: 'desc' };
        }
        return null;
      }
      return { key: columnId, direction: 'asc' };
    });
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((current) => ({
      ...current,
      [columnId]: value,
    }));
  };

  const handleCellClick = (rowIndex: number, columnId: string) => {
    setEditingCell({ rowIndex, columnId });
  };

  const handleCellBlur = (
    rowIndex: number,
    columnId: string,
    value: any
  ) => {
    onCellEdit(rowIndex, columnId, value);
    setEditingCell(null);
  };

  const handleColumnNameClick = (columnId: string) => {
    setEditingColumn(columnId);
  };

  const handleColumnNameSubmit = (columnId: string, newName: string) => {
    if (newName.trim()) {
      onColumnRename(columnId, newName.trim());
    }
    setEditingColumn(null);
  };

  const getSortIcon = (columnId: string) => {
    if (sortConfig?.key !== columnId) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Table</h2>
            <p className="text-sm text-gray-600 mt-1">
              {processedRows.length} row{processedRows.length !== 1 ? 's' : ''} • {columns.length} column{columns.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const visibleColumns = columns.filter(col => !removedColumns.has(col.id));
                const columnIds = sections.length > 0
                  ? sections.flatMap(s => s.columnIds.filter(id => !removedColumns.has(id)))
                  : visibleColumns.map(col => col.id);
                
                const fileName = `json-export-${new Date().toISOString().split('T')[0]}.csv`;
                exportToCSV(rows, columnIds, fileName);
                toast.success('CSV file downloaded successfully!');
                
                // Trigger Buy Me a Coffee widget
                setTimeout(() => {
                  const bmcButton = document.querySelector('#bmc-wbtn') as HTMLElement;
                  if (bmcButton) {
                    bmcButton.click();
                  }
                }, 500);
              }}
              disabled={rows.length === 0}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
            <button
              onClick={() => {
                const visibleColumns = columns.filter(col => !removedColumns.has(col.id));
                const columnIds = sections.length > 0
                  ? sections.flatMap(s => s.columnIds.filter(id => !removedColumns.has(id)))
                  : visibleColumns.map(col => col.id);
                
                const sectionsToExport = sections.length > 0 ? sections : [];
                const fileName = `json-export-${new Date().toISOString().split('T')[0]}.xlsx`;
                
                exportToExcel(rows, columnIds, {
                  sections: sectionsToExport,
                  singleSheet: true,
                  fileName,
                });
                toast.success('Excel file downloaded successfully!');
                
                // Trigger Buy Me a Coffee widget
                setTimeout(() => {
                  const bmcButton = document.querySelector('#bmc-wbtn') as HTMLElement;
                  if (bmcButton) {
                    bmcButton.click();
                  }
                }, 500);
              }}
              disabled={rows.length === 0}
              className="btn-primary flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Download Excel
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            {sections.length > 0 ? (
              // Render with sections
              <>
                <tr>
                  <th className="p-2 border border-gray-200 bg-gray-100 sticky left-0 z-20 min-w-[60px]">
                    #
                  </th>
                  {sections.map((section) => (
                    <th
                      key={section.id}
                      colSpan={section.columnIds.length}
                      className="p-3 border border-gray-200 bg-primary-100 text-primary-800 font-semibold text-center"
                    >
                      {section.name}
                    </th>
                  ))}
                  {columnsBySection.unassignedColumns.length > 0 && (
                    <th
                      colSpan={columnsBySection.unassignedColumns.length}
                      className="p-3 border border-gray-200 bg-gray-200 text-gray-700 font-semibold text-center"
                    >
                      Unassigned
                    </th>
                  )}
                </tr>
                <tr>
                  <th className="p-2 border border-gray-200 bg-gray-100 sticky left-0 z-20"></th>
                  {sections.map((section) =>
                    section.columnIds
                      .map((colId) => columns.find((c) => c.id === colId))
                      .filter(Boolean)
                      .map((col) => (
                        <th
                          key={col!.id}
                          className="p-2 border border-gray-200 bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            {editingColumn === col!.id ? (
                              <input
                                type="text"
                                defaultValue={col!.name}
                                onBlur={(e) =>
                                  handleColumnNameSubmit(col!.id, e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleColumnNameSubmit(
                                      col!.id,
                                      e.currentTarget.value
                                    );
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingColumn(null);
                                  }
                                }}
                                className="flex-1 px-2 py-1 border border-primary-500 rounded text-sm"
                                autoFocus
                              />
                            ) : (
                              <>
                                <span
                                  className="flex-1 cursor-pointer hover:text-primary-600 flex items-center gap-1"
                                  onClick={() => handleColumnNameClick(col!.id)}
                                >
                                  {col!.name}
                                  <Edit2 className="w-3 h-3 opacity-50" />
                                </span>
                                <button
                                  onClick={() => handleSort(col!.id)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  {getSortIcon(col!.id)}
                                </button>
                              </>
                            )}
                          </div>
                          <div className="mt-1 relative">
                            <Search className="w-3 h-3 absolute left-2 top-1.5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Filter..."
                              value={filters[col!.id] || ''}
                              onChange={(e) =>
                                handleFilterChange(col!.id, e.target.value)
                              }
                              className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                          </div>
                        </th>
                      ))
                  )}
                  {columnsBySection.unassignedColumns.map((col) => (
                    <th key={col.id} className="p-2 border border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        {editingColumn === col.id ? (
                          <input
                            type="text"
                            defaultValue={col.name}
                            onBlur={(e) =>
                              handleColumnNameSubmit(col.id, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleColumnNameSubmit(col.id, e.currentTarget.value);
                              }
                              if (e.key === 'Escape') {
                                setEditingColumn(null);
                              }
                            }}
                            className="flex-1 px-2 py-1 border border-primary-500 rounded text-sm"
                            autoFocus
                          />
                        ) : (
                          <>
                            <span
                              className="flex-1 cursor-pointer hover:text-primary-600 flex items-center gap-1"
                              onClick={() => handleColumnNameClick(col.id)}
                            >
                              {col.name}
                              <Edit2 className="w-3 h-3 opacity-50" />
                            </span>
                            <button
                              onClick={() => handleSort(col.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              {getSortIcon(col.id)}
                            </button>
                          </>
                        )}
                      </div>
                      <div className="mt-1 relative">
                        <Search className="w-3 h-3 absolute left-2 top-1.5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Filter..."
                          value={filters[col.id] || ''}
                          onChange={(e) => handleFilterChange(col.id, e.target.value)}
                          className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </>
            ) : (
              // Render without sections
              <tr>
                <th className="p-2 border border-gray-200 bg-gray-100 sticky left-0 z-20 min-w-[60px]">
                  #
                </th>
                {columns.map((col) => (
                  <th key={col.id} className="p-2 border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                      {editingColumn === col.id ? (
                        <input
                          type="text"
                          defaultValue={col.name}
                          onBlur={(e) => handleColumnNameSubmit(col.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleColumnNameSubmit(col.id, e.currentTarget.value);
                            }
                            if (e.key === 'Escape') {
                              setEditingColumn(null);
                            }
                          }}
                          className="flex-1 px-2 py-1 border border-primary-500 rounded text-sm"
                          autoFocus
                        />
                      ) : (
                        <>
                          <span
                            className="flex-1 cursor-pointer hover:text-primary-600 flex items-center gap-1"
                            onClick={() => handleColumnNameClick(col.id)}
                          >
                            {col.name}
                            <Edit2 className="w-3 h-3 opacity-50" />
                          </span>
                          <button
                            onClick={() => handleSort(col.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            {getSortIcon(col.id)}
                          </button>
                        </>
                      )}
                    </div>
                    <div className="mt-1 relative">
                      <Search className="w-3 h-3 absolute left-2 top-1.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filters[col.id] || ''}
                        onChange={(e) => handleFilterChange(col.id, e.target.value)}
                        className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </th>
                ))}
                <th className="p-2 border border-gray-200 bg-gray-50 min-w-[60px]">
                  Actions
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            {processedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-2 border border-gray-200 bg-gray-50 sticky left-0 z-10 text-center font-medium">
                  {rowIndex + 1}
                </td>
                {sections.length > 0
                  ? sections.map((section) =>
                      section.columnIds
                        .map((colId) => columns.find((c) => c.id === colId))
                        .filter(Boolean)
                        .map((col) => (
                          <td
                            key={col!.id}
                            className="p-2 border border-gray-200"
                            onClick={() => handleCellClick(rowIndex, col!.id)}
                          >
                            {editingCell?.rowIndex === rowIndex &&
                            editingCell?.columnId === col!.id ? (
                              <input
                                type="text"
                                defaultValue={String(row[col!.id] || '')}
                                onBlur={(e) =>
                                  handleCellBlur(rowIndex, col!.id, e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleCellBlur(
                                      rowIndex,
                                      col!.id,
                                      e.currentTarget.value
                                    );
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingCell(null);
                                  }
                                }}
                                className="w-full px-2 py-1 border border-primary-500 rounded text-sm"
                                autoFocus
                              />
                            ) : (
                              <div className="min-h-[24px] cursor-text">
                                {row[col!.id] !== null && row[col!.id] !== undefined
                                  ? String(row[col!.id])
                                  : ''}
                              </div>
                            )}
                          </td>
                        ))
                    )
                  : columns.map((col) => (
                      <td
                        key={col.id}
                        className="p-2 border border-gray-200"
                        onClick={() => handleCellClick(rowIndex, col.id)}
                      >
                        {editingCell?.rowIndex === rowIndex &&
                        editingCell?.columnId === col.id ? (
                          <input
                            type="text"
                            defaultValue={String(row[col.id] || '')}
                            onBlur={(e) =>
                              handleCellBlur(rowIndex, col.id, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCellBlur(rowIndex, col.id, e.currentTarget.value);
                              }
                              if (e.key === 'Escape') {
                                setEditingCell(null);
                              }
                            }}
                            className="w-full px-2 py-1 border border-primary-500 rounded text-sm"
                            autoFocus
                          />
                        ) : (
                          <div className="min-h-[24px] cursor-text">
                            {row[col.id] !== null && row[col.id] !== undefined
                              ? String(row[col.id])
                              : ''}
                          </div>
                        )}
                      </td>
                    ))}
                {sections.length === 0 && (
                  <td className="p-2 border border-gray-200">
                    <button
                      onClick={() => onRowDelete(rowIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete row"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

