'use client';

import { useState, useCallback, useEffect } from 'react';
import { Plus, Trash2, Edit2, Copy, Download, RefreshCw, ChevronRight, ChevronDown, FileJson, Folder, List, Key, Sparkles, Zap, BarChart3, AlertTriangle, X } from 'lucide-react';
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
  const [showExamples, setShowExamples] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

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
      equityResponse: {
        id: generateId(),
        key: 'root',
        type: 'object',
        children: [
          {
            id: generateId(),
            key: 'equityResponse',
            type: 'array',
            children: [
              {
                id: generateId(),
                key: 'item_1',
                type: 'object',
                children: [
                  {
                    id: generateId(),
                    key: 'orderBook',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'buyPrice1',
                        type: 'value',
                        valueType: 'number',
                        value: '0',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'buyQuantity1',
                        type: 'value',
                        valueType: 'number',
                        value: '0',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'lastPrice',
                        type: 'value',
                        valueType: 'number',
                        value: '234.5',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'totalBuyQuantity',
                        type: 'value',
                        valueType: 'number',
                        value: '0',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'totalSellQuantity',
                        type: 'value',
                        valueType: 'number',
                        value: '0',
                        children: [],
                      },
                    ],
                    expanded: true,
                  },
                  {
                    id: generateId(),
                    key: 'metaData',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'identifier',
                        type: 'value',
                        valueType: 'string',
                        value: 'ONGCEQN',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'companyName',
                        type: 'value',
                        valueType: 'string',
                        value: 'Oil & Natural Gas Corporation Limited',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'symbol',
                        type: 'value',
                        valueType: 'string',
                        value: 'ONGC',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'open',
                        type: 'value',
                        valueType: 'number',
                        value: '234.95',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'dayHigh',
                        type: 'value',
                        valueType: 'number',
                        value: '235.6',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'dayLow',
                        type: 'value',
                        valueType: 'number',
                        value: '233.31',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'change',
                        type: 'value',
                        valueType: 'number',
                        value: '-0.32',
                        children: [],
                      },
                    ],
                    expanded: true,
                  },
                  {
                    id: generateId(),
                    key: 'tradeInfo',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'totalTradedVolume',
                        type: 'value',
                        valueType: 'number',
                        value: '6236729',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'totalTradedValue',
                        type: 'value',
                        valueType: 'number',
                        value: '1462263481.34',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'lastPrice',
                        type: 'value',
                        valueType: 'number',
                        value: '234.5',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'faceValue',
                        type: 'value',
                        valueType: 'number',
                        value: '5',
                        children: [],
                      },
                    ],
                    expanded: true,
                  },
                  {
                    id: generateId(),
                    key: 'priceInfo',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'yearHigh',
                        type: 'value',
                        valueType: 'number',
                        value: '273.5',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'yearLow',
                        type: 'value',
                        valueType: 'number',
                        value: '205',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'priceBand',
                        type: 'value',
                        valueType: 'string',
                        value: '211.22-258.14',
                        children: [],
                      },
                    ],
                    expanded: true,
                  },
                  {
                    id: generateId(),
                    key: 'secInfo',
                    type: 'object',
                    children: [
                      {
                        id: generateId(),
                        key: 'secStatus',
                        type: 'value',
                        valueType: 'string',
                        value: 'Listed',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'basicIndustry',
                        type: 'value',
                        valueType: 'string',
                        value: 'Oil Exploration & Production',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'index',
                        type: 'value',
                        valueType: 'string',
                        value: 'Nifty 50',
                        children: [],
                      },
                      {
                        id: generateId(),
                        key: 'indexList',
                        type: 'array',
                        children: [
                          {
                            id: generateId(),
                            key: 'item_1',
                            type: 'value',
                            valueType: 'string',
                            value: 'NIFTY 50',
                            children: [],
                          },
                          {
                            id: generateId(),
                            key: 'item_2',
                            type: 'value',
                            valueType: 'string',
                            value: 'NIFTY 100',
                            children: [],
                          },
                          {
                            id: generateId(),
                            key: 'item_3',
                            type: 'value',
                            valueType: 'string',
                            value: 'NIFTY 200',
                            children: [],
                          },
                        ],
                        expanded: true,
                      },
                    ],
                    expanded: true,
                  },
                  {
                    id: generateId(),
                    key: 'lastUpdateTime',
                    type: 'value',
                    valueType: 'string',
                    value: '30-Dec-2025 16:00:00',
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
    if (!rootNode) return;
    const node = findNode(rootNode, nodeId);
    
    // If clicking on a value node, automatically select its parent instead
    // (since value nodes can't have children)
    if (node && node.type === 'value') {
      const parent = findParent(rootNode, nodeId);
      if (parent) {
        // Select the parent instead
        setSelectedNodeId(parent.id);
        setEditorKey(''); // Clear key so user can enter new one
        toast(`Selected parent "${parent.key}" - value nodes cannot have children`, { icon: 'ℹ️' });
        return;
      } else {
        // If no parent (shouldn't happen for value nodes), select root
        setSelectedNodeId(rootNode.id);
        setEditorKey('');
        return;
      }
    }
    
    // For objects/arrays, select normally
    setSelectedNodeId(nodeId);
    if (node) {
      setEditorKey(''); // Clear key so user can enter new one
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
    setShowResetModal(true);
  };

  const confirmReset = () => {
    setRootNode(null);
    setSelectedNodeId(null);
    resetEditor();
    localStorage.removeItem('jsonBuilderState');
    setJsonOutput('{}');
    setShowResetModal(false);
    toast.success('Builder reset successfully!');
  };

  const renderTree = (node: JsonNode, depth: number = 0): JSX.Element => {
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children.length > 0;
    const canExpand = node.type !== 'value' && hasChildren;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`group flex items-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
            isSelected 
              ? 'bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 border-2 border-blue-400 shadow-lg transform scale-[1.02]' 
              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md border-2 border-transparent hover:border-gray-200'
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
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200"
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

          <div className="flex items-center gap-2">
            {node.type === 'object' && <Folder className="w-5 h-5 text-blue-600" />}
            {node.type === 'array' && <List className="w-5 h-5 text-green-600" />}
            {node.type === 'value' && <Key className="w-5 h-5 text-purple-600" />}
            <span className="font-semibold text-gray-800">{node.key}</span>
            {node.type === 'value' && (
              <span className="text-xs text-gray-600 ml-1 bg-gray-100 px-2 py-1 rounded-md font-medium border border-gray-200">
                {node.valueType}: {String(node.value).substring(0, 25)}
                {String(node.value).length > 25 && '...'}
              </span>
            )}
            {node.type === 'object' && node.children.length > 0 && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-medium border border-blue-200">
                {node.children.length} {node.children.length === 1 ? 'item' : 'items'}
              </span>
            )}
            {node.type === 'array' && node.children.length > 0 && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-md font-medium border border-green-200">
                {node.children.length} {node.children.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="ml-auto p-2 hover:bg-red-100 rounded-lg text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
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
        <div className="flex items-start justify-between mb-8 gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                <FileJson className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                JSON Builder
              </h2>
            </div>
            <p className="text-base text-gray-600 ml-[68px] leading-relaxed">
              Build nested JSON structures visually. Create objects, arrays, and key-value pairs step by step with real-time preview.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={handleCopy}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Copy className="w-5 h-5" />
              Copy JSON
            </button>
            <button
              onClick={() => handleDownload('json')}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download .json
            </button>
            <button
              onClick={() => handleDownload('txt')}
              disabled={!jsonOutput || jsonOutput === '{}'}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download .txt
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white border-2 border-red-300 text-red-600 font-bold rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:border-red-400 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {!rootNode && (
          <div className="text-center py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-blue-300 shadow-inner">
            <div className="max-w-4xl mx-auto px-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <FileJson className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Start Building Your JSON
              </h3>
              <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto">
                Create a root object or load an example to get started. Build complex nested structures with ease.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <button
                  onClick={createRoot}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3 transform hover:scale-105 active:scale-95"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create Empty Root</span>
                </button>
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>{showExamples ? 'Hide' : 'Show'} Examples</span>
                </button>
              </div>

              {showExamples && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                  <button
                    onClick={() => loadExample('userProfile')}
                    className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-left group transform hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-md">
                        <Folder className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">User Profile</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Complete user profile with nested address and hobbies array</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Folder className="w-3.5 h-3.5" />
                        Object
                      </span>
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Key className="w-3.5 h-3.5" />
                        Key-Value
                      </span>
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <List className="w-3.5 h-3.5" />
                        Array
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      <Zap className="w-4 h-4" />
                      <span>Click to load</span>
                    </div>
                  </button>

                  <button
                    onClick={() => loadExample('apiResponse')}
                    className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 text-left group transform hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300 shadow-md">
                        <List className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">API Response</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Typical API response structure with status, code, and data</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Folder className="w-3.5 h-3.5" />
                        Object
                      </span>
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <List className="w-3.5 h-3.5" />
                        Array
                      </span>
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Key className="w-3.5 h-3.5" />
                        Key-Value
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 group-hover:text-green-700">
                      <Zap className="w-4 h-4" />
                      <span>Click to load</span>
                    </div>
                  </button>

                  <button
                    onClick={() => loadExample('config')}
                    className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 text-left group transform hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300 shadow-md">
                        <Key className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">App Config</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Application configuration with nested settings object</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Folder className="w-3.5 h-3.5" />
                        Object
                      </span>
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Key className="w-3.5 h-3.5" />
                        Key-Value
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-700">
                      <Zap className="w-4 h-4" />
                      <span>Click to load</span>
                    </div>
                  </button>

                  <button
                    onClick={() => loadExample('equityResponse')}
                    className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 text-left group transform hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 shadow-md">
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">Equity Response</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">Stock market equity response with order book, metadata, trade info, and security details</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Folder className="w-3.5 h-3.5" />
                        Object
                      </span>
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <List className="w-3.5 h-3.5" />
                        Array
                      </span>
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Key className="w-3.5 h-3.5" />
                        Key-Value
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-orange-600 group-hover:text-orange-700">
                      <Zap className="w-4 h-4" />
                      <span>Click to load</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {rootNode && (
          <div className="space-y-6">
            {/* Top Row: Structure and Editor Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Structure Panel */}
              <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl p-5 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Folder className="w-5 h-5 text-blue-600" />
                  </div>
                  Structure Tree
                </h3>
                {rootNode && rootNode.children.length > 0 && (
                  <span className="text-xs font-semibold text-gray-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full shadow-sm">
                    {rootNode.children.length} item{rootNode.children.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {rootNode && rootNode.children.length === 0 && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">💡 Empty Root Object</p>
                  <p className="text-xs text-blue-700">Click on "root" to select it, then add elements using the form on the right</p>
                </div>
              )}
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar bg-white rounded-lg p-3 border border-gray-100">
                {renderTree(rootNode)}
              </div>
            </div>

              {/* Editor Panel */}
              <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                  <Edit2 className="w-5 h-5 text-indigo-600" />
                </div>
                Add Element
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span>Element Type</span>
                    <span className="text-xs font-normal text-gray-500">(What do you want to add?)</span>
                  </label>
                  <select
                    value={editorType}
                    onChange={(e) => {
                      setEditorType(e.target.value as 'object' | 'array' | 'value');
                      if (e.target.value !== 'value') {
                        setEditorValue('');
                      }
                    }}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="object">📁 Object (nested structure)</option>
                    <option value="array">📋 Array (list of items)</option>
                    <option value="value">🔑 Key-Value Pair (single value)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1.5 ml-1">
                    {editorType === 'object' && 'Creates a nested object: {"key": {}}'}
                    {editorType === 'array' && 'Creates an array: {"key": []}'}
                    {editorType === 'value' && 'Creates a simple key-value: {"key": "value"}'}
                  </p>
                </div>

                {editorType !== 'value' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Key Name <span className="text-red-500">*</span>
                      <span className="text-xs font-normal text-gray-500 ml-2">(Name for this {editorType})</span>
                    </label>
                    <input
                      type="text"
                      value={editorKey}
                      onChange={(e) => setEditorKey(e.target.value)}
                      placeholder={editorType === 'object' ? 'e.g., userProfile, address, settings' : editorType === 'array' ? 'e.g., items, tags, hobbies' : 'Enter key name'}
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-500 mt-1.5 ml-1">
                      {editorType === 'object' && '💡 Tip: Use camelCase (e.g., userProfile, orderBook)'}
                      {editorType === 'array' && '💡 Tip: Use plural names (e.g., items, users, tags)'}
                    </p>
                  </div>
                )}

                {editorType === 'value' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        Key Name <span className="text-red-500">*</span>
                        <span className="text-xs font-normal text-gray-500 ml-2">(Property name)</span>
                      </label>
                      <input
                        type="text"
                        value={editorKey}
                        onChange={(e) => setEditorKey(e.target.value)}
                        placeholder="e.g., firstName, age, isActive, email"
                        className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500 mt-1.5 ml-1">💡 Tip: Use descriptive names (e.g., firstName, totalAmount)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span>Value Type</span>
                        <span className="text-xs font-normal text-gray-500">(What type of data?)</span>
                      </label>
                      <select
                        value={editorValueType}
                        onChange={(e) => setEditorValueType(e.target.value as ValueType)}
                        className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium text-gray-800 cursor-pointer"
                      >
                        <option value="string">📝 String (text)</option>
                        <option value="number">🔢 Number (numeric)</option>
                        <option value="boolean">✅ Boolean (true/false)</option>
                        <option value="null">⚪ Null (empty)</option>
                      </select>
                    </div>
                    {editorValueType !== 'null' && editorValueType !== 'boolean' && (
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                          Value
                          <span className="text-xs font-normal text-gray-500 ml-2">({editorValueType === 'number' ? 'Enter a number' : 'Enter text'})</span>
                        </label>
                        <input
                          type={editorValueType === 'number' ? 'number' : 'text'}
                          value={editorValue}
                          onChange={(e) => setEditorValue(e.target.value)}
                          placeholder={editorValueType === 'number' ? 'e.g., 100, 3.14, -5' : 'e.g., "John Doe", "example@email.com"'}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium placeholder:text-gray-400"
                        />
                        {editorValueType === 'string' && (
                          <p className="text-xs text-gray-500 mt-1.5 ml-1">💡 Tip: Quotes are added automatically</p>
                        )}
                      </div>
                    )}
                    {editorValueType === 'boolean' && (
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                          Value
                          <span className="text-xs font-normal text-gray-500 ml-2">(Select true or false)</span>
                        </label>
                        <select
                          value={editorValue}
                          onChange={(e) => setEditorValue(e.target.value)}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 font-medium text-gray-800 cursor-pointer"
                        >
                          <option value="true">✅ True</option>
                          <option value="false">❌ False</option>
                        </select>
                      </div>
                    )}
                    {editorValueType === 'null' && (
                      <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
                        <p className="text-sm text-gray-600 font-medium">⚪ Null value will be set automatically</p>
                        <p className="text-xs text-gray-500 mt-1">No input needed - the value will be null</p>
                      </div>
                    )}
                  </>
                )}

                <button
                  onClick={addNode}
                  disabled={!canAddToSelected() || (editorType !== 'value' && !editorKey.trim()) || (editorType === 'value' && !editorKey.trim())}
                  className="w-full px-5 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
                >
                  <Plus className="w-6 h-6" />
                  <span>Add {editorType === 'object' ? 'Object' : editorType === 'array' ? 'Array' : 'Value'}</span>
                </button>

                {selectedNodeId && (
                  <div className="mt-5 p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl border-2 border-blue-400 shadow-lg">
                    {selectedNodeId && (() => {
                      const selectedNode = findNode(rootNode, selectedNodeId);
                      const isValueNode = selectedNode?.type === 'value';
                      const canAdd = canAddToSelected();
                      
                      if (isValueNode) {
                        // Find parent node
                        const parent = findParent(rootNode, selectedNodeId);
                        return (
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mt-1"></div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-yellow-900 mb-1 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Selected: <span className="text-yellow-700">{selectedNode?.key || 'None'}</span> (Value Node)
                              </p>
                              <p className="text-xs text-yellow-700 leading-relaxed">
                                Value nodes cannot have children. {parent ? `Select "${parent.key}" or another object/array to add elements.` : 'Select the root or an object/array to add elements.'}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse mt-1"></div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-blue-900 mb-1">
                              ✓ Selected Node: <span className="text-blue-700">{selectedNode?.key || 'None'}</span>
                            </p>
                            <p className="text-xs text-blue-700 leading-relaxed">
                              {canAdd ? 'New element will be added as a child of this node' : 'Cannot add children to this node type'}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    {findNode(rootNode, selectedNodeId)?.type === 'object' && (
                      <div className="mt-3 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-xs text-blue-900 font-semibold">
                          💡 You can add multiple objects, arrays, or values to this object
                        </p>
                      </div>
                    )}
                    {findNode(rootNode, selectedNodeId)?.type === 'array' && (
                      <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-xs text-green-900 font-semibold">
                          📋 You can add values or objects to this array
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {!selectedNodeId && rootNode && (
                  <div className="mt-5 p-5 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 rounded-xl border-2 border-amber-300 shadow-md">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">👆</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-amber-900 mb-1">
                          Quick Start Guide
                        </p>
                        <ol className="text-xs text-amber-800 space-y-1.5 list-decimal list-inside leading-relaxed">
                          <li>Click on any node in the Structure Tree (left panel) to select it</li>
                          <li>Choose the element type you want to add (Object, Array, or Key-Value)</li>
                          <li>Fill in the key name and value (if needed)</li>
                          <li>Click "Add" button to insert the element</li>
                        </ol>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-amber-100 border border-amber-300 rounded-lg">
                      <p className="text-xs text-amber-900 font-semibold">
                        💡 Tip: Select "root" to add top-level elements, or select any nested node to add children
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            </div>

            {/* JSON Preview Panel - Below the other panels */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-5 border-2 border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-100 flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-blue-900/50 rounded-lg">
                    <FileJson className="w-5 h-5 text-blue-400" />
                  </div>
                  JSON Preview
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-300 bg-gray-700/80 border border-gray-600 px-3 py-1.5 rounded-full shadow-sm">
                    {jsonOutput.length} chars
                  </span>
                  <button
                    onClick={() => {
                      if (jsonOutput && jsonOutput.trim() !== '{}') {
                        navigator.clipboard.writeText(jsonOutput);
                        toast.success('JSON copied to clipboard!');
                      } else {
                        toast.error('No JSON to copy');
                      }
                    }}
                    disabled={!jsonOutput || jsonOutput.trim() === '{}'}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Copy JSON to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy JSON</span>
                  </button>
                </div>
              </div>
              <pre className="text-sm text-gray-100 overflow-auto max-h-[500px] font-mono bg-gray-950/50 rounded-lg p-4 border border-gray-700 custom-scrollbar-dark">
                <code className="text-gray-100">{jsonOutput}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowResetModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Reset JSON Builder?</h3>
                  <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ All your JSON structure data will be permanently deleted, including:
                </p>
                <ul className="text-sm text-red-700 mt-2 ml-4 list-disc space-y-1">
                  <li>All objects, arrays, and key-value pairs</li>
                  <li>All nested structures</li>
                  <li>Saved state in browser storage</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Builder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

