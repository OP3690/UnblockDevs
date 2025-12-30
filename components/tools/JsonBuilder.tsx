'use client';

import { useState, useCallback, useEffect } from 'react';
import { Plus, Trash2, Edit2, Copy, Download, RefreshCw, ChevronRight, ChevronDown, FileJson, Folder, List, Key, Sparkles, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface JsonNode {
  id: string;
  key: string;
  type: 'object' | 'array' | 'value';
  valueType?: 'string' | 'number' | 'boolean' | 'null';
  value?: any;
  children: JsonNode[];
  expanded?: boolean;
}

type ValueType = 'string' | 'number' | 'boolean' | 'null';

export default function JsonBuilder() {
  const [rootNode, setRootNode] = useState<JsonNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [editorType, setEditorType] = useState<'object' | 'array' | 'value'>('value');
  const [editorValueType, setEditorValueType] = useState<ValueType>('string');
  const [jsonOutput, setJsonOutput] = useState('{}');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jsonBuilderState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRootNode(parsed);
        generateJson(parsed);
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save to localStorage whenever rootNode changes
  useEffect(() => {
    if (rootNode) {
      localStorage.setItem('jsonBuilderState', JSON.stringify(rootNode));
      generateJson(rootNode);
    }
  }, [rootNode]);

  const generateId = () => {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const generateJson = useCallback((node: JsonNode | null): any => {
    if (!node) return {};

    if (node.type === 'value') {
      if (node.valueType === 'number') {
        return node.value === '' ? null : Number(node.value);
      }
      if (node.valueType === 'boolean') {
        return node.value === 'true';
      }
      if (node.valueType === 'null') {
        return null;
      }
      return node.value || '';
    }

    if (node.type === 'array') {
      return node.children.map(child => generateJson(child));
    }

    if (node.type === 'object') {
      const obj: any = {};
      node.children.forEach(child => {
        obj[child.key] = generateJson(child);
      });
      return obj;
    }

    return {};
  }, []);

  const updateJsonOutput = useCallback((node: JsonNode | null) => {
    try {
      const jsonObj = generateJson(node);
      const jsonString = JSON.stringify(jsonObj, null, 2);
      setJsonOutput(jsonString);
    } catch (error) {
      setJsonOutput('{}');
    }
  }, [generateJson]);

  useEffect(() => {
    updateJsonOutput(rootNode);
  }, [rootNode, updateJsonOutput]);

  const createRoot = () => {
    if (rootNode) {
      toast.error('Root already exists. Please delete it first to create a new one.');
      return;
    }

    const newRoot: JsonNode = {
      id: generateId(),
      key: 'root',
      type: 'object',
      children: [],
      expanded: true,
    };
    setRootNode(newRoot);
    setSelectedNodeId(newRoot.id);
    toast.success('Root object created!');
  };

  const loadExample = (exampleName: string) => {
    const examples: { [key: string]: JsonNode } = {
      userProfile: {
        id: generateId(),
        key: 'root',
        type: 'object',
        children: [
          {
            id: generateId(),
            key: 'name',
            type: 'value',
            valueType: 'string',
            value: 'John Doe',
            children: [],
          },
          {
            id: generateId(),
            key: 'email',
            type: 'value',
            valueType: 'string',
            value: 'john@example.com',
            children: [],
          },
          {
            id: generateId(),
            key: 'age',
            type: 'value',
            valueType: 'number',
            value: '30',
            children: [],
          },
          {
            id: generateId(),
            key: 'address',
            type: 'object',
            children: [
              {
                id: generateId(),
                key: 'street',
                type: 'value',
                valueType: 'string',
                value: '123 Main St',
                children: [],
              },
              {
                id: generateId(),
                key: 'city',
                type: 'value',
                valueType: 'string',
                value: 'New York',
                children: [],
              },
              {
                id: generateId(),
                key: 'zipCode',
                type: 'value',
                valueType: 'string',
                value: '10001',
                children: [],
              },
            ],
            expanded: true,
          },
          {
            id: generateId(),
            key: 'hobbies',
            type: 'array',
            children: [
              {
                id: generateId(),
                key: 'item_1',
                type: 'value',
                valueType: 'string',
                value: 'Reading',
                children: [],
              },
              {
                id: generateId(),
                key: 'item_2',
                type: 'value',
                valueType: 'string',
                value: 'Coding',
                children: [],
              },
            ],
            expanded: true,
          },
        ],
        expanded: true,
      },
      apiResponse: {
        id: generateId(),
        key: 'root',
        type: 'object',
        children: [
          {
            id: generateId(),
            key: 'status',
            type: 'value',
            valueType: 'string',
            value: 'success',
            children: [],
          },
          {
            id: generateId(),
            key: 'code',
            type: 'value',
            valueType: 'number',
            value: '200',
            children: [],
          },
          {
            id: generateId(),
            key: 'data',
            type: 'object',
            children: [
              {
                id: generateId(),
                key: 'users',
                type: 'array',
                children: [
                  {
                    id: generateId(),
                    key: 'item_1',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'id',
                        type: 'value',
                        valueType: 'number',
                        value: '1',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'name',
                        type: 'value',
                        valueType: 'string',
                        value: 'Alice',
                        children: [],
                      },
                    ],
                    expanded: true,
                  },
                ],
                expanded: true,
              },
            ],
            expanded: true,
          },
        ],
        expanded: true,
      },
      config: {
        id: generateId(),
        key: 'root',
        type: 'object',
        children: [
          {
            id: generateId(),
            key: 'appName',
            type: 'value',
            valueType: 'string',
            value: 'MyApp',
            children: [],
          },
          {
            id: generateId(),
            key: 'version',
            type: 'value',
            valueType: 'string',
            value: '1.0.0',
            children: [],
          },
          {
            id: generateId(),
            key: 'debug',
            type: 'value',
            valueType: 'boolean',
            value: 'true',
            children: [],
          },
          {
            id: generateId(),
            key: 'settings',
            type: 'object',
            children: [
              {
                id: generateId(),
                key: 'theme',
                type: 'value',
                valueType: 'string',
                value: 'dark',
                children: [],
              },
              {
                id: generateId(),
                key: 'language',
                type: 'value',
                valueType: 'string',
                value: 'en',
                children: [],
              },
            ],
            expanded: true,
          },
        ],
        expanded: true,
      },
    };

    if (examples[exampleName]) {
      setRootNode(examples[exampleName]);
      setSelectedNodeId(null);
      resetEditor();
      setShowExamples(false);
      toast.success('Example loaded successfully!');
    }
  };

  const findNode = (node: JsonNode, id: string): JsonNode | null => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  };

  const findParent = (node: JsonNode, targetId: string, parent: JsonNode | null = null): JsonNode | null => {
    if (node.id === targetId) return parent;
    for (const child of node.children) {
      const found = findParent(child, targetId, node);
      if (found !== null) return found;
    }
    return null;
  };

  const validateKey = (node: JsonNode, key: string, excludeId?: string): boolean => {
    if (!key || key.trim() === '') {
      toast.error('Key cannot be empty');
      return false;
    }

    // Check for duplicate keys at the same level
    const siblings = node.children.filter(child => child.id !== excludeId);
    if (siblings.some(child => child.key === key)) {
      toast.error(`Key "${key}" already exists at this level`);
      return false;
    }

    return true;
  };

  const addNode = () => {
    if (!rootNode) {
      toast.error('Please create a root object first');
      return;
    }

    const parentId = selectedNodeId || rootNode.id;
    const parent = findNode(rootNode, parentId);

    if (!parent) {
      toast.error('Parent node not found');
      return;
    }

    if (parent.type === 'value') {
      toast.error('Cannot add children to a value node');
      return;
    }

    if (editorType === 'value' && parent.type === 'array') {
      // For arrays, we can add values directly
      const key = editorKey.trim() || `item_${parent.children.length + 1}`;
      if (!validateKey(parent, key)) return;

      const newNode: JsonNode = {
        id: generateId(),
        key,
        type: 'value',
        valueType: editorValueType,
        value: editorValue,
        children: [],
      };

      const updatedRoot = { ...rootNode };
      const parentNode = findNode(updatedRoot, parentId);
      if (parentNode) {
        parentNode.children = [...parentNode.children, newNode];
        setRootNode(updatedRoot);
        resetEditor();
        toast.success('Value added successfully!');
      }
      return;
    }

    if (editorType !== 'value' && !editorKey.trim()) {
      toast.error('Key is required for objects and arrays');
      return;
    }

    if (!validateKey(parent, editorKey)) return;

    const newNode: JsonNode = {
      id: generateId(),
      key: editorKey.trim(),
      type: editorType,
      valueType: editorType === 'value' ? editorValueType : undefined,
      value: editorType === 'value' ? editorValue : undefined,
      children: [],
      expanded: true,
    };

    const updatedRoot = { ...rootNode };
    const parentNode = findNode(updatedRoot, parentId);
    if (parentNode) {
      parentNode.children = [...parentNode.children, newNode];
      setRootNode(updatedRoot);
      setSelectedNodeId(newNode.id);
      resetEditor();
      toast.success(`${editorType === 'object' ? 'Object' : editorType === 'array' ? 'Array' : 'Value'} added successfully!`);
    }
  };

  const deleteNode = (nodeId: string) => {
    if (!rootNode) return;

    if (nodeId === rootNode.id) {
      if (window.confirm('Are you sure you want to delete the root? This will reset the entire builder.')) {
        setRootNode(null);
        setSelectedNodeId(null);
        resetEditor();
        localStorage.removeItem('jsonBuilderState');
        toast.success('Root deleted. Builder reset.');
      }
      return;
    }

    if (window.confirm('Are you sure you want to delete this node and all its children?')) {
      const updatedRoot = { ...rootNode };
      const parent = findParent(updatedRoot, nodeId);

      if (parent) {
        parent.children = parent.children.filter(child => child.id !== nodeId);
        setRootNode(updatedRoot);
        if (selectedNodeId === nodeId) {
          setSelectedNodeId(null);
          resetEditor();
        }
        toast.success('Node deleted successfully!');
      }
    }
  };

  const toggleExpand = (nodeId: string) => {
    if (!rootNode) return;
    const updatedRoot = { ...rootNode };
    const node = findNode(updatedRoot, nodeId);
    if (node) {
      node.expanded = !node.expanded;
      setRootNode(updatedRoot);
    }
  };

  const selectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    if (!rootNode) return;
    const node = findNode(rootNode, nodeId);
    if (node) {
      setEditorKey(node.key);
      setEditorType(node.type);
      if (node.type === 'value') {
        setEditorValueType(node.valueType || 'string');
        setEditorValue(node.value || '');
      } else {
        setEditorValue('');
      }
    }
  };

  const resetEditor = () => {
    setEditorKey('');
    setEditorValue('');
    setEditorType('value');
    setEditorValueType('string');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    toast.success('JSON copied to clipboard!');
  };

  const handleDownload = (format: 'json' | 'txt') => {
    const blob = new Blob([jsonOutput], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `json-builder-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`File downloaded as .${format}!`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the builder? All data will be lost.')) {
      setRootNode(null);
      setSelectedNodeId(null);
      resetEditor();
      localStorage.removeItem('jsonBuilderState');
      setJsonOutput('{}');
      toast.success('Builder reset successfully!');
    }
  };

  const renderTree = (node: JsonNode, depth: number = 0): JSX.Element => {
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children.length > 0;
    const canExpand = node.type !== 'value' && hasChildren;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-100 border border-blue-300' : 'hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
          onClick={() => selectNode(node.id)}
        >
          {canExpand ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              {node.expanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {node.type === 'object' && <Folder className="w-4 h-4 text-blue-500" />}
          {node.type === 'array' && <List className="w-4 h-4 text-green-500" />}
          {node.type === 'value' && <Key className="w-4 h-4 text-purple-500" />}

          <span className="font-medium text-gray-800">{node.key}</span>
          {node.type === 'value' && (
            <span className="text-xs text-gray-500 ml-2">
              ({node.valueType}: {String(node.value).substring(0, 30)})
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="ml-auto p-1 hover:bg-red-100 rounded text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {canExpand && node.expanded && (
          <div className="ml-4">
            {node.children.map(child => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const canAddToSelected = () => {
    if (!rootNode) return false;
    if (!selectedNodeId) return true; // Can add to root
    const node = findNode(rootNode, selectedNodeId);
    if (!node) return false;
    return node.type !== 'value';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                <FileJson className="w-6 h-6 text-white" />
              </div>
              JSON Builder
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Build nested JSON structures visually. Create objects, arrays, and key-value pairs step by step with real-time preview.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy JSON
            </button>
            <button
              onClick={() => handleDownload('json')}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download .json
            </button>
            <button
              onClick={() => handleDownload('txt')}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download .txt
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {!rootNode && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FileJson className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No JSON Structure Yet</h3>
            <p className="text-gray-600 mb-4">Create a root object to start building your JSON</p>
            <button
              onClick={createRoot}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Root Object
            </button>
          </div>
        )}

        {rootNode && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Structure Panel */}
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-600" />
                  Structure Tree
                </h3>
                {rootNode && rootNode.children.length > 0 && (
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    {rootNode.children.length} item{rootNode.children.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {renderTree(rootNode)}
              </div>
            </div>

            {/* Editor Panel */}
            <div className="lg:col-span-1 bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-600" />
                Add Element
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Element Type
                  </label>
                  <select
                    value={editorType}
                    onChange={(e) => {
                      setEditorType(e.target.value as 'object' | 'array' | 'value');
                      if (e.target.value !== 'value') {
                        setEditorValue('');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                    <option value="value">Key-Value Pair</option>
                  </select>
                </div>

                {editorType !== 'value' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editorKey}
                      onChange={(e) => setEditorKey(e.target.value)}
                      placeholder="Enter key name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {editorType === 'value' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Key Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editorKey}
                        onChange={(e) => setEditorKey(e.target.value)}
                        placeholder="Enter key name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value Type
                      </label>
                      <select
                        value={editorValueType}
                        onChange={(e) => setEditorValueType(e.target.value as ValueType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="null">Null</option>
                      </select>
                    </div>
                    {editorValueType !== 'null' && editorValueType !== 'boolean' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Value
                        </label>
                        <input
                          type={editorValueType === 'number' ? 'number' : 'text'}
                          value={editorValue}
                          onChange={(e) => setEditorValue(e.target.value)}
                          placeholder={`Enter ${editorValueType} value`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    {editorValueType === 'boolean' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Value
                        </label>
                        <select
                          value={editorValue}
                          onChange={(e) => setEditorValue(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    )}
                  </>
                )}

                <button
                  onClick={addNode}
                  disabled={!canAddToSelected() || (editorType !== 'value' && !editorKey.trim()) || (editorType === 'value' && !editorKey.trim())}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  <Plus className="w-5 h-5" />
                  Add {editorType === 'object' ? 'Object' : editorType === 'array' ? 'Array' : 'Value'}
                </button>

                {selectedNodeId && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-sm">
                    <p className="text-sm font-semibold text-blue-800 mb-1">
                      ✓ Selected: <span className="text-blue-600">{findNode(rootNode, selectedNodeId)?.key || 'None'}</span>
                    </p>
                    <p className="text-xs text-blue-600">
                      New element will be added as a child of this node
                    </p>
                  </div>
                )}
                {!selectedNodeId && rootNode && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      💡 Tip: Select a node in the tree to add children to it
                    </p>
                    <p className="text-xs text-gray-600">
                      Click on any node in the Structure Tree to select it
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* JSON Preview Panel */}
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-4 border-2 border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-100 flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-blue-400" />
                  JSON Preview
                </h3>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                  {jsonOutput.length} chars
                </span>
              </div>
              <pre className="text-sm text-gray-100 overflow-auto max-h-[600px] font-mono bg-transparent custom-scrollbar-dark">
                <code className="text-gray-100">{jsonOutput}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

