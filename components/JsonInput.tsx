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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">JSON Input</h2>
        <div className="flex items-center gap-3">
          {fileName && (
            <span className="text-sm text-gray-600 flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4" />
              <span className="max-w-[120px] truncate">{fileName}</span>
            </span>
          )}
          <button
            onClick={handleClear}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Clear input"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload JSON File
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <label className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md border border-blue-100">
            <Upload className="w-5 h-5" />
            <span className="text-sm font-semibold">Choose File</span>
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

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          JSON Text
        </label>
        <div className="relative">
          <textarea
            value={jsonText}
            onChange={handleTextChange}
            placeholder='Paste your JSON here, e.g., {"name": "John", "age": 30}'
            className={`w-full h-64 sm:h-80 p-4 sm:p-5 border-2 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-thin transition-all ${
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {error && (
            <div className="absolute bottom-3 left-3 right-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5 shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!jsonText.trim()}
        className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none text-base"
      >
        Parse JSON
      </button>
    </div>
  );
}

