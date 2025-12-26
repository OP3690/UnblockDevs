'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  Trash2,
  GripVertical,
  Merge,
  X,
  Edit2,
  Check,
  EyeOff,
  RotateCcw,
} from 'lucide-react';
import { Column } from '@/lib/jsonParser';

interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

interface SectionManagerProps {
  sections: Section[];
  columns: Column[];
  removedColumns: Set<string>;
  onSectionsChange: (sections: Section[]) => void;
  onColumnMove: (columnId: string, fromSectionId: string | null, toSectionId: string | null) => void;
  onRemoveColumn: (columnId: string) => void;
  onRemoveAllUnassigned: (columnIds: string[]) => void;
  onRestoreColumn: (columnId: string) => void;
}

function SortableSection({
  section,
  columns,
  sections,
  removedColumns,
  onSectionsChange,
  onColumnMove,
  editingSection,
  setEditingSection,
  mergeSource,
  setMergeSource,
  handleDeleteSection,
  handleMergeSection,
  removeColumnFromSection,
  onRemoveColumn,
}: {
  section: Section;
  columns: Column[];
  sections: Section[];
  removedColumns: Set<string>;
  onSectionsChange: (sections: Section[]) => void;
  onColumnMove: (columnId: string, fromSectionId: string | null, toSectionId: string | null) => void;
  editingSection: string | null;
  setEditingSection: (id: string | null) => void;
  mergeSource: string | null;
  setMergeSource: (id: string | null) => void;
  handleDeleteSection: (id: string) => void;
  handleMergeSection: (targetId: string) => void;
  removeColumnFromSection: (sectionId: string, columnId: string) => void;
  onRemoveColumn: (columnId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sectionColumns = section.columnIds
    .map((id) => columns.find((c) => c.id === id))
    .filter(Boolean) as Column[];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 p-4 border-2 rounded-lg ${
        isDragging
          ? 'border-primary-500 bg-primary-50 shadow-lg'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="w-5 h-5" />
          </div>
          {editingSection === section.id ? (
            <input
              type="text"
              defaultValue={section.name}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  onSectionsChange(
                    sections.map((s) =>
                      s.id === section.id
                        ? { ...s, name: e.target.value.trim() }
                        : s
                    )
                  );
                }
                setEditingSection(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.currentTarget.value.trim()) {
                    onSectionsChange(
                      sections.map((s) =>
                        s.id === section.id
                          ? { ...s, name: e.currentTarget.value.trim() }
                          : s
                      )
                    );
                  }
                  setEditingSection(null);
                }
                if (e.key === 'Escape') {
                  setEditingSection(null);
                }
              }}
              className="flex-1 px-3 py-1 border border-primary-500 rounded font-semibold"
              autoFocus
            />
          ) : (
            <h3
              className="text-lg font-semibold text-gray-800 flex items-center gap-2 cursor-pointer hover:text-primary-600"
              onClick={() => setEditingSection(section.id)}
            >
              {section.name}
              <Edit2 className="w-4 h-4 opacity-50" />
            </h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          {mergeSource ? (
            mergeSource === section.id ? (
              <button
                onClick={() => setMergeSource(null)}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => handleMergeSection(section.id)}
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Merge Here
              </button>
            )
          ) : (
            <>
              <button
                onClick={() => setMergeSource(section.id)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                title="Merge section"
              >
                <Merge className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <SectionDroppable sectionId={section.id}>
        <SortableContext
          items={section.columnIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="min-h-[60px] p-2 rounded bg-white border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {sectionColumns
                .filter((col) => !removedColumns.has(col.id))
                .map((column) => (
                  <SortableColumn
                    key={column.id}
                    column={column}
                    onRemove={() => removeColumnFromSection(section.id, column.id)}
                    onRemoveFromTable={() => onRemoveColumn(column.id)}
                  />
                ))}
            </div>
          </div>
        </SortableContext>
      </SectionDroppable>
    </div>
  );
}

function SortableColumn({
  column,
  onRemove,
  onRemoveFromTable,
}: {
  column: Column;
  onRemove: () => void;
  onRemoveFromTable?: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`px-3 py-1.5 bg-primary-100 text-primary-800 rounded-lg text-sm font-medium flex items-center gap-2 ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-3 h-3 text-primary-600" />
      </div>
      {column.name}
      <div className="flex items-center gap-1">
        {onRemoveFromTable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromTable();
            }}
            className="text-red-600 hover:text-red-800"
            title="Remove from table and export"
          >
            <EyeOff className="w-3 h-3" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-primary-600 hover:text-primary-800"
          title="Remove from section"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function SectionDroppable({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: sectionId,
  });

  return (
    <div
      ref={setNodeRef}
      className={isOver ? 'bg-primary-50 border-2 border-dashed border-primary-400 rounded' : ''}
    >
      {children}
    </div>
  );
}

function UnassignedDroppable({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'unassigned',
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[60px] p-2 rounded flex flex-wrap gap-2 ${
        isOver ? 'bg-gray-100' : 'bg-gray-50'
      }`}
    >
      {children}
    </div>
  );
}

function SortableUnassignedColumn({
  column,
  onRemove,
}: {
  column: Column;
  onRemove?: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-3 h-3 text-gray-500" />
      </div>
      {column.name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 text-red-600 hover:text-red-800 p-0.5"
          title="Remove from table and export"
        >
          <EyeOff className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export default function SectionManager({
  sections,
  columns,
  removedColumns,
  onSectionsChange,
  onColumnMove,
  onRemoveColumn,
  onRemoveAllUnassigned,
  onRestoreColumn,
}: SectionManagerProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [mergeSource, setMergeSource] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const unassignedColumns = columns.filter(
    (col) => !sections.some((section) => section.columnIds.includes(col.id)) && !removedColumns.has(col.id)
  );

  const removedUnassignedColumns = columns.filter(
    (col) => !sections.some((section) => section.columnIds.includes(col.id)) && removedColumns.has(col.id)
  );

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      name: newSectionName.trim(),
      columnIds: [],
    };

    onSectionsChange([...sections, newSection]);
    setNewSectionName('');
    setShowAddSection(false);
  };

  const handleDeleteSection = (sectionId: string) => {
    onSectionsChange(sections.filter((s) => s.id !== sectionId));
  };

  const handleMergeSection = (targetSectionId: string) => {
    if (!mergeSource) return;

    const sourceSection = sections.find((s) => s.id === mergeSource);
    const targetSection = sections.find((s) => s.id === targetSectionId);

    if (!sourceSection || !targetSection) return;

    const mergedColumnIds = [
      ...new Set([...targetSection.columnIds, ...sourceSection.columnIds]),
    ];

    onSectionsChange(
      sections
        .map((s) =>
          s.id === targetSectionId
            ? { ...s, columnIds: mergedColumnIds }
            : s
        )
        .filter((s) => s.id !== mergeSource)
    );

    setMergeSource(null);
  };

  const removeColumnFromSection = (sectionId: string, columnId: string) => {
    onSectionsChange(
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, columnIds: s.columnIds.filter((id) => id !== columnId) }
          : s
      )
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    // Handle section reordering
    if (active.id.toString().startsWith('section-')) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        onSectionsChange(arrayMove(sections, oldIndex, newIndex));
      }
      return;
    }

    // Handle column movement
    const columnId = active.id.toString();
    const sourceSection = sections.find((s) => s.columnIds.includes(columnId));
    const sourceSectionId = sourceSection?.id || null;
    
    let destSectionId: string | null = null;
    if (over.id.toString().startsWith('section-')) {
      destSectionId = over.id.toString();
    } else if (over.id.toString() !== 'unassigned') {
      const destSection = sections.find((s) => s.columnIds.includes(over.id.toString()));
      destSectionId = destSection?.id || null;
    }

    if (over.id.toString() === 'unassigned') {
      destSectionId = null;
    }

    onColumnMove(columnId, sourceSectionId, destSectionId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Section Management</h2>
        <div className="flex items-center gap-2">
          {unassignedColumns.length > 0 && (
            <button
              onClick={() => onRemoveAllUnassigned(unassignedColumns.map((c) => c.id))}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title={`Remove ${unassignedColumns.length} unassigned column(s) from table and export`}
            >
              <EyeOff className="w-4 h-4" />
              Remove All Unassigned ({unassignedColumns.length})
            </button>
          )}
          <button
            onClick={() => setShowAddSection(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Section
          </button>
        </div>
      </div>

      {showAddSection && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center gap-2">
          <input
            type="text"
            placeholder="Section name..."
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSection();
              }
              if (e.key === 'Escape') {
                setShowAddSection(false);
                setNewSectionName('');
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <button
            onClick={handleAddSection}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setShowAddSection(false);
              setNewSectionName('');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              columns={columns}
              sections={sections}
              removedColumns={removedColumns}
              onSectionsChange={onSectionsChange}
              onColumnMove={onColumnMove}
              editingSection={editingSection}
              setEditingSection={setEditingSection}
              mergeSource={mergeSource}
              setMergeSource={setMergeSource}
              handleDeleteSection={handleDeleteSection}
              handleMergeSection={handleMergeSection}
              removeColumnFromSection={removeColumnFromSection}
              onRemoveColumn={onRemoveColumn}
            />
          ))}
        </SortableContext>

        {unassignedColumns.length > 0 && (
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Unassigned Columns
            </h3>
            <UnassignedDroppable>
              <SortableContext
                items={unassignedColumns.map((c) => c.id)}
                strategy={horizontalListSortingStrategy}
              >
                {unassignedColumns.map((column) => (
                  <SortableUnassignedColumn
                    key={column.id}
                    column={column}
                    onRemove={() => onRemoveColumn(column.id)}
                  />
                ))}
              </SortableContext>
            </UnassignedDroppable>
          </div>
        )}

        {removedUnassignedColumns.length > 0 && (
          <div className="mt-4 p-4 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-red-700">
                Removed Columns ({removedUnassignedColumns.length})
              </h3>
              <span className="text-xs text-red-600">
                These columns are hidden from table and export
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {removedUnassignedColumns.map((column) => (
                <div
                  key={column.id}
                  className="px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-sm font-medium flex items-center gap-2 opacity-75"
                >
                  {column.name}
                  <button
                    onClick={() => onRestoreColumn(column.id)}
                    className="ml-1 text-red-600 hover:text-red-800"
                    title="Restore column"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? (
            <div className="px-3 py-1.5 bg-primary-200 text-primary-900 rounded-lg text-sm font-medium opacity-90">
              {columns.find((c) => c.id === activeId)?.name ||
                sections.find((s) => s.id === activeId)?.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
