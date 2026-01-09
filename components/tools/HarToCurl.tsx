'use client';

import { useState } from 'react';
import { Upload, Copy, Check, Download, FileText, Code, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

interface HarEntry {
  request: {
    method: string;
    url: string;
    headers?: Array<{ name: string; value: string }>;
    postData?: {
      mimeType?: string;
      text?: string;
    };
  };
}

interface HarFile {
  log: {
    entries: HarEntry[];
  };
}

export default function HarToCurl() {
  const [harContent, setHarContent] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(null);
  const [harEntries, setHarEntries] = useState<HarEntry[]>([]);
  
  // Basic cURL generator state
  const [basicUrl, setBasicUrl] = useState('');
  const [basicMethod, setBasicMethod] = useState('GET');
  const [basicCurl, setBasicCurl] = useState('');
  const [basicCopied, setBasicCopied] = useState(false);

  const convertHarToCurl = (har: HarFile, entryIndex: number = 0): string => {
    if (!har.log?.entries || har.log.entries.length === 0) {
      throw new Error('No entries found in HAR file');
    }

    const entry = har.log.entries[entryIndex];
    if (!entry) {
      throw new Error('Entry not found');
    }

    const request = entry.request;
    const method = request.method || 'GET';
    const url = request.url || '';
    
    let curl = `curl -X ${method}`;
    
    // Add headers
    if (request.headers && request.headers.length > 0) {
      request.headers.forEach((header) => {
        // Skip certain headers that curl handles automatically
        if (!['host', 'connection', 'content-length'].includes(header.name.toLowerCase())) {
          curl += ` \\\n  -H "${header.name}: ${header.value}"`;
        }
      });
    }
    
    // Add data for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && request.postData) {
      const data = request.postData.text || '';
      if (data) {
        curl += ` \\\n  -d '${data.replace(/'/g, "'\\''")}'`;
      }
    }
    
    curl += ` \\\n  "${url}"`;
    
    return curl;
  };

  const handleHarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.har')) {
      toast.error('Please upload a .har file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setHarContent(content);
        const har: HarFile = JSON.parse(content);
        
        if (!har.log?.entries || har.log.entries.length === 0) {
          toast.error('HAR file contains no entries');
          return;
        }
        
        setHarEntries(har.log.entries);
        setSelectedEntryIndex(0);
        const curl = convertHarToCurl(har, 0);
        setCurlCommand(curl);
        toast.success(`Found ${har.log.entries.length} request(s) in HAR file`);
      } catch (error: any) {
        toast.error(`Failed to parse HAR file: ${error.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleHarTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setHarContent(content);
    
    if (!content.trim()) {
      setHarEntries([]);
      setCurlCommand('');
      setSelectedEntryIndex(null);
      return;
    }
    
    try {
      const har: HarFile = JSON.parse(content);
      if (!har.log?.entries || har.log.entries.length === 0) {
        toast.error('HAR file contains no entries');
        return;
      }
      
      setHarEntries(har.log.entries);
      setSelectedEntryIndex(0);
      const curl = convertHarToCurl(har, 0);
      setCurlCommand(curl);
    } catch (error) {
      // Don't show error while typing
    }
  };

  const handleEntrySelect = (index: number) => {
    try {
      const har: HarFile = JSON.parse(harContent);
      setSelectedEntryIndex(index);
      const curl = convertHarToCurl(har, index);
      setCurlCommand(curl);
    } catch (error: any) {
      toast.error(`Failed to convert entry: ${error.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    toast.success('cURL command copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([curlCommand], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curl-command.sh';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('cURL command downloaded!');
  };

  // Basic cURL generator
  const generateBasicCurl = () => {
    if (!basicUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    let curl = `curl -X ${basicMethod}`;
    curl += ` "${basicUrl}"`;
    
    setBasicCurl(curl);
  };

  const handleBasicCopy = () => {
    if (!basicCurl) {
      toast.error('Please generate a cURL command first');
      return;
    }
    navigator.clipboard.writeText(basicCurl);
    setBasicCopied(true);
    toast.success('cURL command copied to clipboard!');
    setTimeout(() => setBasicCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Network Request to cURL Converter | HAR to cURL Generator
        </h1>
        <p className="text-lg text-gray-600">
          Convert HAR files, browser network requests, and HTTP archives to cURL commands instantly. 
          Perfect for <strong>copy as curl online</strong>, <strong>har to curl</strong>, and <strong>curl from browser request</strong> workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* HAR to cURL Converter */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">HAR to cURL Converter</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload HAR File or Paste HAR JSON
            </label>
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-sm font-medium">Choose HAR File</span>
                <input
                  type="file"
                  accept=".har"
                  onChange={handleHarFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">or paste HAR JSON below</span>
            </div>
            
            <textarea
              value={harContent}
              onChange={handleHarTextChange}
              placeholder='Paste your HAR file content here (JSON format)'
              className="w-full h-48 p-4 border-2 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          {harEntries.length > 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Request ({harEntries.length} found)
              </label>
              <select
                value={selectedEntryIndex ?? ''}
                onChange={(e) => handleEntrySelect(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {harEntries.map((entry, index) => {
                  try {
                    const url = new URL(entry.request.url);
                    return (
                      <option key={index} value={index}>
                        {entry.request.method} {url.pathname}
                      </option>
                    );
                  } catch {
                    return (
                      <option key={index} value={index}>
                        {entry.request.method} {entry.request.url.substring(0, 50)}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          )}

          {curlCommand && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated cURL Command
              </label>
              <div className="relative">
                <pre className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-sm overflow-x-auto">
                  {curlCommand}
                </pre>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Basic cURL Generator */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Basic cURL Generator</h2>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Generates a basic curl command. Auth & headers not included.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTTP Method
              </label>
              <select
                value={basicMethod}
                onChange={(e) => setBasicMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={basicUrl}
                onChange={(e) => setBasicUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={generateBasicCurl}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Generate cURL
            </button>

            {basicCurl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated cURL Command
                </label>
                <div className="relative">
                  <pre className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-sm overflow-x-auto">
                    {basicCurl}
                  </pre>
                  <button
                    onClick={handleBasicCopy}
                    className="absolute top-2 right-2 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Copy"
                  >
                    {basicCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          How to Use
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>HAR to cURL:</strong> Export network requests from Chrome DevTools (Network tab → Right-click → Save all as HAR) 
            or Firefox (Network tab → Right-click → Save All As HAR). Upload the HAR file or paste its JSON content to convert to cURL.
          </p>
          <p>
            <strong>Basic cURL Generator:</strong> Enter a URL and select HTTP method to generate a simple cURL command. 
            This is a quick helper for basic requests without authentication or custom headers.
          </p>
        </div>
      </div>
    </div>
  );
}
