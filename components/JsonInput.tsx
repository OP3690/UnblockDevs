'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

interface JsonInputProps {
  onJsonSubmit: (data: any) => void;
}

export default function JsonInput({ onJsonSubmit }: JsonInputProps) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonText(value);
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a .json file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        setJsonText(text);
        setError(null);
        toast.success('File loaded successfully');
      } catch (err) {
        toast.error('Failed to read file');
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
    };

    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (!jsonText.trim()) {
      setError('Please enter or upload JSON data');
      return;
    }

    const validation = validateJson(jsonText);
    if (!validation.valid) {
      setError(validation.error || 'Invalid JSON');
      toast.error('Invalid JSON format');
      return;
    }

    setError(null);
    onJsonSubmit(validation.data);
    toast.success('JSON parsed successfully');
  };

  const handleClear = () => {
    setJsonText('');
    setError(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">JSON Input</h2>
        <div className="flex gap-2">
          {fileName && (
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {fileName}
            </span>
          )}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload JSON File
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-100 transition-colors">
            <Upload className="w-5 h-5" />
            <span className="text-sm font-medium">Choose File</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">or paste JSON below</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JSON Text
        </label>
        <div className="relative">
          <textarea
            value={jsonText}
            onChange={handleTextChange}
            placeholder='Paste your JSON here, e.g., {"name": "John", "age": 30}'
            className={`w-full h-64 p-4 border-2 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 scrollbar-thin ${
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary-500'
            }`}
          />
          {error && (
            <div className="absolute bottom-2 left-2 right-2 bg-red-50 border border-red-200 rounded p-2 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!jsonText.trim()}
        className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
      >
        Parse JSON
      </button>
    </div>
  );
}

