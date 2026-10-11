'use client';

import { useState, useCallback } from 'react';
import {
  Copy, Check, Download, Trash2, Plus, ChevronDown, ChevronRight, Code2, FileJson,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type JsonNodeType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

interface JsonField {
  id: string;
  key: string;
  node: JsonNode;
}

type JsonNode =
  | { id: string; type: 'string'; value: string }
  | { id: string; type: 'number'; value: number }
  | { id: string; type: 'boolean'; value: boolean }
  | { id: string; type: 'null' }
  | { id: string; type: 'object'; fields: JsonField[] }
  | { id: string; type: 'array'; items: JsonNode[] };

// ── ID generator ──────────────────────────────────────────────────────────────

let _idSeq = 0;
function gid(): string { return `n${++_idSeq}_${Math.random().toString(36).slice(2, 5)}`; }

// ── Tree ↔ Value ──────────────────────────────────────────────────────────────

function nodeToValue(node: JsonNode): unknown {
  if (node.type === 'string') return node.value;
  if (node.type === 'number') return node.value;
  if (node.type === 'boolean') return node.value;
  if (node.type === 'null') return null;
  if (node.type === 'object') {
    const obj: Record<string, unknown> = {};
    for (const f of node.fields) { if (f.key) obj[f.key] = nodeToValue(f.node); }
    return obj;
  }
  return (node as Extract<JsonNode, { type: 'array' }>).items.map(nodeToValue);
}

function valueToNode(v: unknown): JsonNode {
  if (v === null || v === undefined) return { id: gid(), type: 'null' };
  if (typeof v === 'string') return { id: gid(), type: 'string', value: v };
  if (typeof v === 'number') return { id: gid(), type: 'number', value: v };
  if (typeof v === 'boolean') return { id: gid(), type: 'boolean', value: v };
  if (Array.isArray(v)) return { id: gid(), type: 'array', items: v.map(valueToNode) };
  if (typeof v === 'object') return {
    id: gid(), type: 'object',
    fields: Object.entries(v as Record<string, unknown>).map(([k, val]) => ({ id: gid(), key: k, node: valueToNode(val) })),
  };
  return { id: gid(), type: 'null' };
}

function defaultNode(type: JsonNodeType): JsonNode {
  if (type === 'string') return { id: gid(), type: 'string', value: '' };
  if (type === 'number') return { id: gid(), type: 'number', value: 0 };
  if (type === 'boolean') return { id: gid(), type: 'boolean', value: false };
  if (type === 'null') return { id: gid(), type: 'null' };
  if (type === 'object') return { id: gid(), type: 'object', fields: [] };
  return { id: gid(), type: 'array', items: [] };
}

// ── JSON Schema → sample data ─────────────────────────────────────────────────

function schemaToNode(schema: unknown, depth = 0): JsonNode {
  if (depth > 5 || !schema || typeof schema !== 'object') return { id: gid(), type: 'null' };
  const s = schema as Record<string, unknown>;
  const variants = (s.anyOf || s.oneOf) as unknown[] | undefined;
  if (variants?.length) return schemaToNode(variants[0], depth);
  const t = s.type;
  if (t === 'string') return { id: gid(), type: 'string', value: String(s.example ?? s.default ?? '') };
  if (t === 'number' || t === 'integer') return { id: gid(), type: 'number', value: Number(s.example ?? s.default ?? 0) };
  if (t === 'boolean') return { id: gid(), type: 'boolean', value: Boolean(s.example ?? s.default ?? false) };
  if (t === 'null') return { id: gid(), type: 'null' };
  if (t === 'array') return { id: gid(), type: 'array', items: s.items ? [schemaToNode(s.items, depth + 1)] : [] };
  if (t === 'object' || s.properties) {
    const props = (s.properties as Record<string, unknown>) ?? {};
    return {
      id: gid(), type: 'object',
      fields: Object.entries(props).map(([k, v]) => ({ id: gid(), key: k, node: schemaToNode(v, depth + 1) })),
    };
  }
  return { id: gid(), type: 'null' };
}

// ── Syntax highlight ──────────────────────────────────────────────────────────

function highlightJson(json: string): string {
  const esc = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^".*":\s*$/.test(match) || /^".*":$/.test(match.trim()))
        return `<span style="color:#93c5fd">${match}</span>`;
      if (/^"/.test(match)) return `<span style="color:#fcd34d">${match}</span>`;
      if (match === 'true' || match === 'false') return `<span style="color:#c4b5fd">${match}</span>`;
      if (match === 'null') return `<span style="color:#94a3b8">${match}</span>`;
      return `<span style="color:#86efac">${match}</span>`;
    }
  );
}

// ── Templates ─────────────────────────────────────────────────────────────────

function templateApiResponse(): JsonNode {
  return valueToNode({ id: 1, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() });
}
function templateConfig(): JsonNode {
  return valueToNode({ env: 'production', debug: false, port: 3000 });
}

// ── FieldEditor ───────────────────────────────────────────────────────────────

interface FieldEditorProps {
  node: JsonNode;
  fieldKey?: string;
  showKey?: boolean;
  showIndex?: number;
  onUpdate: (node: JsonNode) => void;
  onDelete?: () => void;
  onKeyChange?: (key: string) => void;
  depth: number;
}

function FieldEditor({ node, fieldKey, showKey, showIndex, onUpdate, onDelete, onKeyChange, depth }: FieldEditorProps) {
  const [expanded, setExpanded] = useState(true);
  const isContainer = node.type === 'object' || node.type === 'array';
  const MAX_DEPTH = 5;

  return (
    <div className="group/row">
      {/* Row */}
      <div className="flex items-center gap-1 py-1">
        {/* Indent */}
        <div style={{ width: depth * 16 }} className="shrink-0" />

        {/* Expand/collapse toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          className={`shrink-0 p-0.5 transition-colors ${isContainer ? 'text-zinc-400 hover:text-zinc-700' : 'text-transparent pointer-events-none'}`}
          tabIndex={isContainer ? 0 : -1}
          aria-label={isContainer ? (expanded ? 'Collapse' : 'Expand') : undefined}
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>

        {/* Array index label */}
        {showIndex !== undefined && (
          <span className="text-[10px] text-zinc-400 font-mono shrink-0 w-5 text-right">[{showIndex}]</span>
        )}

        {/* Key input */}
        {showKey && (
          <>
            <input
              type="text"
              value={fieldKey ?? ''}
              onChange={e => onKeyChange?.(e.target.value)}
              className="w-24 shrink-0 border border-zinc-200 rounded-md px-2 py-0.5 text-xs font-mono text-zinc-700 bg-white focus:ring-1 focus:ring-blue-400 outline-none"
              placeholder="key"
            />
            <span className="text-zinc-400 text-xs shrink-0">:</span>
          </>
        )}

        {/* Type selector */}
        <select
          value={node.type}
          onChange={e => onUpdate(defaultNode(e.target.value as JsonNodeType))}
          className="shrink-0 border border-zinc-200 rounded-md px-1.5 py-0.5 text-xs bg-white text-zinc-600 focus:ring-1 focus:ring-blue-400 outline-none"
        >
          {(['string', 'number', 'boolean', 'null', 'object', 'array'] as JsonNodeType[]).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Primitive value editor */}
        {node.type === 'string' && (
          <input
            type="text"
            value={node.value}
            onChange={e => onUpdate({ ...node, value: e.target.value })}
            className="flex-1 min-w-0 border border-zinc-200 rounded-md px-2 py-0.5 text-sm text-zinc-800 bg-white focus:ring-1 focus:ring-blue-400 outline-none"
            placeholder="value"
          />
        )}
        {node.type === 'number' && (
          <input
            type="number"
            value={node.value}
            onChange={e => onUpdate({ ...node, value: parseFloat(e.target.value) || 0 })}
            className="flex-1 min-w-0 border border-zinc-200 rounded-md px-2 py-0.5 text-sm text-zinc-800 bg-white focus:ring-1 focus:ring-blue-400 outline-none"
          />
        )}
        {node.type === 'boolean' && (
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={node.value}
              onChange={e => onUpdate({ ...node, value: e.target.checked })}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-zinc-600">{node.value ? 'true' : 'false'}</span>
          </label>
        )}
        {node.type === 'null' && <span className="text-sm text-zinc-400 italic">(null)</span>}
        {isContainer && (
          <span className="text-xs text-zinc-400 shrink-0 select-none ml-1">
            {node.type === 'object'
              ? `{${node.fields.length} field${node.fields.length !== 1 ? 's' : ''}}`
              : `[${node.items.length} item${node.items.length !== 1 ? 's' : ''}]`}
          </span>
        )}

        {/* Delete */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="shrink-0 ml-auto p-1 rounded-md text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover/row:opacity-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Children: object fields */}
      {node.type === 'object' && expanded && (
        <div className="border-l-2 border-zinc-100 ml-5">
          {node.fields.map((field) => (
            <FieldEditor
              key={field.id}
              node={field.node}
              fieldKey={field.key}
              showKey
              onKeyChange={k => onUpdate({ ...node, fields: node.fields.map(f => f.id === field.id ? { ...f, key: k } : f) })}
              onUpdate={updated => onUpdate({ ...node, fields: node.fields.map(f => f.id === field.id ? { ...f, node: updated } : f) })}
              onDelete={() => onUpdate({ ...node, fields: node.fields.filter(f => f.id !== field.id) })}
              depth={depth + 1}
            />
          ))}
          {depth < MAX_DEPTH && (
            <div style={{ paddingLeft: (depth + 1) * 16 + 18 }} className="py-0.5">
              <button
                onClick={() => onUpdate({
                  ...node,
                  fields: [...node.fields, { id: gid(), key: 'newField', node: { id: gid(), type: 'string', value: '' } }],
                })}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add field
              </button>
            </div>
          )}
        </div>
      )}

      {/* Children: array items */}
      {node.type === 'array' && expanded && (
        <div className="border-l-2 border-zinc-100 ml-5">
          {node.items.map((item, idx) => (
            <FieldEditor
              key={item.id}
              node={item}
              showIndex={idx}
              onUpdate={updated => onUpdate({ ...node, items: node.items.map(it => it.id === item.id ? updated : it) })}
              onDelete={() => onUpdate({ ...node, items: node.items.filter(it => it.id !== item.id) })}
              depth={depth + 1}
            />
          ))}
          {depth < MAX_DEPTH && (
            <div style={{ paddingLeft: (depth + 1) * 16 + 18 }} className="py-0.5">
              <button
                onClick={() => onUpdate({
                  ...node,
                  items: [...node.items, { id: gid(), type: 'string', value: '' }],
                })}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add item
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
  }, [text]);
  return (
    <button onClick={copy} className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{ok ? 'Copied!' : label}</span>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function JsonBuilderClient() {
  const [root, setRoot] = useState<JsonNode>({ id: gid(), type: 'object', fields: [] });
  const [minify, setMinify] = useState(false);
  const [importTab, setImportTab] = useState<'json' | 'schema'>('json');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [showImport, setShowImport] = useState(false);

  const jsonOutput = (() => {
    try {
      const val = nodeToValue(root);
      return JSON.stringify(val, null, minify ? 0 : 2);
    } catch {
      return '{}';
    }
  })();

  const handleImport = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importText.trim());
      if (importTab === 'schema') {
        setRoot(schemaToNode(parsed));
      } else {
        setRoot(valueToNode(parsed));
      }
      setImportText('');
      setShowImport(false);
    } catch (e) {
      setImportError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const download = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-[600px] bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-8">

      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center flex-wrap gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">Templates:</span>
        {([
          { label: 'Empty object', fn: (): JsonNode => ({ id: gid(), type: 'object', fields: [] }) },
          { label: 'Empty array',  fn: (): JsonNode => ({ id: gid(), type: 'array', items: [] }) },
          { label: 'API response', fn: templateApiResponse },
          { label: 'Config',       fn: templateConfig },
        ]).map(({ label, fn }) => (
          <button
            key={label}
            onClick={() => setRoot(fn())}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50 transition-colors"
          >
            {label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setRoot({ id: gid(), type: 'object', fields: [] })}
          className="px-3 py-1.5 text-xs font-medium border border-red-200 rounded-lg bg-white text-red-600 hover:bg-red-50 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* ── Two-panel body ───────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

        {/* Left: Visual editor */}
        <div className="flex flex-col">
          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/40 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual Editor</span>
            <button
              onClick={() => {
                if (root.type === 'object') {
                  setRoot({ ...root, fields: [...root.fields, { id: gid(), key: 'newField', node: { id: gid(), type: 'string', value: '' } }] });
                } else if (root.type === 'array') {
                  setRoot({ ...root, items: [...root.items, { id: gid(), type: 'string', value: '' }] });
                }
              }}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
            >
              <Plus className="w-3 h-3" />
              {root.type === 'array' ? 'Add item' : 'Add field'}
            </button>
          </div>
          <div className="overflow-y-auto p-3" style={{ minHeight: 320, maxHeight: 500 }}>
            {root.type === 'object' && root.fields.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <FileJson className="w-10 h-10 text-gray-200" />
                <p className="text-sm text-gray-400">No fields yet.</p>
                <p className="text-xs text-gray-300">Click "Add field" above or choose a template.</p>
              </div>
            )}
            {root.type === 'array' && root.items.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <FileJson className="w-10 h-10 text-gray-200" />
                <p className="text-sm text-gray-400">Empty array.</p>
                <p className="text-xs text-gray-300">Click "Add item" above or choose a template.</p>
              </div>
            )}

            {/* Root object fields */}
            {root.type === 'object' && root.fields.map(field => (
              <FieldEditor
                key={field.id}
                node={field.node}
                fieldKey={field.key}
                showKey
                onKeyChange={k => setRoot({ ...root, fields: root.fields.map(f => f.id === field.id ? { ...f, key: k } : f) })}
                onUpdate={updated => setRoot({ ...root, fields: root.fields.map(f => f.id === field.id ? { ...f, node: updated } : f) })}
                onDelete={() => setRoot({ ...root, fields: root.fields.filter(f => f.id !== field.id) })}
                depth={0}
              />
            ))}

            {/* Root array items */}
            {root.type === 'array' && root.items.map((item, idx) => (
              <FieldEditor
                key={item.id}
                node={item}
                showIndex={idx}
                onUpdate={updated => setRoot({ ...root, items: root.items.map(it => it.id === item.id ? updated : it) })}
                onDelete={() => setRoot({ ...root, items: root.items.filter(it => it.id !== item.id) })}
                depth={0}
              />
            ))}
          </div>
        </div>

        {/* Right: JSON preview */}
        <div className="flex flex-col">
          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/40 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">Preview</span>
            <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 text-xs font-medium">
              <button
                onClick={() => setMinify(false)}
                className={`px-2.5 py-0.5 rounded-md transition-colors ${!minify ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Pretty
              </button>
              <button
                onClick={() => setMinify(true)}
                className={`px-2.5 py-0.5 rounded-md transition-colors ${minify ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Minify
              </button>
            </div>
            <div className="flex-1" />
            <CopyBtn
              text={jsonOutput}
              label="Copy JSON"
              className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            />
            <button
              onClick={download}
              className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              .json
            </button>
          </div>
          <div
            className="overflow-auto bg-zinc-950 p-4"
            style={{ minHeight: 320, maxHeight: 500 }}
          >
            <pre
              className="font-mono text-[12.5px] leading-relaxed whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightJson(jsonOutput) }}
            />
          </div>
        </div>
      </div>

      {/* ── Import section ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowImport(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            Import existing JSON / JSON Schema
          </span>
          {showImport ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        </button>
        {showImport && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            {/* Tab switcher */}
            <div className="flex gap-0.5 p-0.5 bg-gray-100 rounded-lg w-fit">
              {(['json', 'schema'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setImportTab(tab); setImportError(''); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${importTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab === 'json' ? 'Import JSON' : 'Import JSON Schema'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {importTab === 'json'
                ? 'Paste an existing JSON object or array to populate the visual editor.'
                : 'Paste a JSON Schema — the builder will generate sample data matching its structure.'}
            </p>
            <textarea
              value={importText}
              onChange={e => { setImportText(e.target.value); setImportError(''); }}
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-mono text-xs text-gray-800 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none resize-none"
              placeholder={importTab === 'json'
                ? '{ "key": "value" }'
                : '{ "$schema": "…", "type": "object", "properties": { … } }'}
            />
            {importError && (
              <p className="text-xs text-red-600 font-medium">{importError}</p>
            )}
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {importTab === 'json' ? 'Import & build' : 'Generate from schema'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
