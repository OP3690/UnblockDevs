'use client';

import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CurlConverter() {
  const [curlCommand, setCurlCommand] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const parseCurl = (curl: string) => {
    const urlMatch = curl.match(/curl\s+['"]?([^'"]+)['"]?/);
    const methodMatch = curl.match(/-X\s+(\w+)/i);
    const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
    const dataMatch = curl.match(/-d\s+['"]([^'"]+)['"]/);

    const url = urlMatch ? urlMatch[1] : '';
    const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';
    const headers: { [key: string]: string } = {};
    const data = dataMatch ? dataMatch[1] : '';

    let headerMatch;
    while ((headerMatch = headerRegex.exec(curl)) !== null) {
      const [key, value] = headerMatch[1].split(':').map((s) => s.trim());
      if (key && value) headers[key] = value;
    }

    return { url, method, headers, data };
  };

  const convert = () => {
    try {
      const { url, method, headers, data } = parseCurl(curlCommand);

      let code = '';
      const headersStr = JSON.stringify(headers, null, 2);
      const headersIndented = headersStr.replace(/\n/g, targetLanguage === 'javascript' ? '\n  ' : '\n    ');
      const headerLines = Object.entries(headers).map(([k, v]) => 
        targetLanguage === 'java' 
          ? `    .header("${k}", "${v}")`
          : `    req.Header.Set("${k}", "${v}")`
      ).join('\n');

      switch (targetLanguage) {
        case 'javascript': {
          let bodyLine = '';
          if (data) {
            const bodyValue = data.includes('{') ? data : `'${data}'`;
            bodyLine = `body: ${bodyValue},`;
          }
          code = `fetch('${url}', {
  method: '${method}',
  headers: ${headersIndented},
  ${bodyLine}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
          break;
        }

        case 'python': {
          let jsonLine = '';
          if (data) {
            const jsonValue = data.includes('{') ? data : `'${data}'`;
            jsonLine = `json=${jsonValue},`;
          }
          code = `import requests

response = requests.${method.toLowerCase()}(
    '${url}',
    headers=${headersIndented},
    ${jsonLine}
)
print(response.json())`;
          break;
        }

        case 'java': {
          const bodyPublisher = data 
            ? `HttpRequest.BodyPublishers.ofString("${data}")` 
            : 'HttpRequest.BodyPublishers.noBody()';
          code = `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .method("${method}", ${bodyPublisher})
${headerLines}
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`;
          break;
        }

        case 'go': {
          let bodyParam = 'nil';
          if (data) {
            const escapedData = data.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
            bodyParam = 'bytes.NewBuffer([]byte(`' + escapedData + '`))';
          }
          const goCodeParts = [
            'package main',
            '',
            'import (',
            '    "bytes"',
            '    "encoding/json"',
            '    "net/http"',
            ')',
            '',
            'func main() {',
            '    client := &http.Client{}',
            `    req, _ := http.NewRequest("${method}", "${url}", ${bodyParam})`,
            headerLines,
            '    resp, _ := client.Do(req)',
            '    defer resp.Body.Close()',
            '}'
          ];
          code = goCodeParts.join('\n');
          break;
        }
      }

      setConvertedCode(code);
      toast.success('Converted successfully!');
    } catch (err: any) {
      toast.error('Failed to parse curl command');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-primary-600" />
          Curl ↔ Code Converter
        </h2>
        <p className="text-gray-600 mb-4">Convert curl commands to JavaScript, Python, Java, or Go code.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Curl Command</label>
          <textarea
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
            placeholder="curl -X POST https://api.example.com/data -H &quot;Content-Type: application/json&quot; -d '{\&quot;key\&quot;:\&quot;value\&quot;}'"
            className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="javascript">JavaScript (Fetch)</option>
            <option value="python">Python (Requests)</option>
            <option value="java">Java (HttpClient)</option>
            <option value="go">Go (net/http)</option>
          </select>
        </div>

        <button
          onClick={convert}
          disabled={!curlCommand.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Convert
        </button>
      </div>

      {convertedCode && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Converted Code</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
            <code>{convertedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

