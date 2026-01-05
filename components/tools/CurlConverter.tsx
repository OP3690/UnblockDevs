'use client';

import { useState } from 'react';
import { Code, Copy, Check, Download, Sparkles, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CurlConverter() {
  const [curlCommand, setCurlCommand] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const parseCurl = (curl: string) => {
    // Remove line breaks and normalize spaces
    const normalized = curl.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Extract URL (handles both quoted and unquoted)
    const urlMatch = normalized.match(/curl\s+(?:-X\s+\w+\s+)?['"]?([^\s'"]+)['"]?/);
    
    // Extract method
    const methodMatch = normalized.match(/-X\s+(\w+)/i);
    
    // Extract headers (handles both -H and --header)
    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
    const headers: { [key: string]: string } = {};
    let headerMatch;
    while ((headerMatch = headerRegex.exec(normalized)) !== null) {
      const [key, value] = headerMatch[1].split(':').map((s) => s.trim());
      if (key && value) headers[key] = value;
    }
    
    // Extract data (handles -d, --data, --data-raw, --data-binary)
    const dataRegex = /(?:-d|--data|--data-raw|--data-binary)\s+['"]([^'"]+)['"]/;
    const dataMatch = normalized.match(dataRegex);
    const data = dataMatch ? dataMatch[1] : '';
    
    // Extract Basic Auth (handles -u and --user)
    const authMatch = normalized.match(/(?:-u|--user)\s+['"]?([^'"]+)['"]?/);
    let auth = null;
    if (authMatch) {
      const authStr = authMatch[1];
      if (authStr.includes(':')) {
        const [username, password] = authStr.split(':');
        auth = { type: 'basic', username, password };
      }
    }
    
    // Extract Bearer token from Authorization header
    if (headers['Authorization'] && headers['Authorization'].startsWith('Bearer ')) {
      auth = { type: 'bearer', token: headers['Authorization'].replace('Bearer ', '') };
    }
    
    // Extract multipart form data
    const isMultipart = normalized.includes('--form') || normalized.includes('-F');
    
    const url = urlMatch ? urlMatch[1] : '';
    const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';

    return { url, method, headers, data, auth, isMultipart };
  };

  const convert = () => {
    try {
      const { url, method, headers, data, auth, isMultipart } = parseCurl(curlCommand);
      
      if (!url) {
        toast.error('Could not parse URL from curl command');
        return;
      }

      let code = '';
      const headersStr = JSON.stringify(headers, null, 2);
      const headersIndented = headersStr.replace(/\n/g, targetLanguage === 'javascript' ? '\n  ' : '\n    ');
      
      // Helper to escape strings for different languages
      const escapeString = (str: string, lang: string): string => {
        if (lang === 'javascript' || lang === 'python') {
          return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
        }
        return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      };

      switch (targetLanguage) {
        case 'javascript': {
          let bodyLine = '';
          if (data) {
            const isJson = data.trim().startsWith('{') || data.trim().startsWith('[');
            if (isJson) {
              bodyLine = `body: JSON.stringify(${data}),`;
            } else {
              bodyLine = `body: '${escapeString(data, 'javascript')}',`;
            }
          }
          
          let authHeader = '';
          if (auth?.type === 'basic') {
            // Base64 encode username:password
            const credentials = typeof window !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
            authHeader = `  headers: {\n    ...headers,\n    'Authorization': 'Basic ${credentials}',\n  },`;
          } else if (auth?.type === 'bearer') {
            authHeader = `  headers: {\n    ...headers,\n    'Authorization': 'Bearer ${auth.token}',\n  },`;
          }
          
          code = `fetch('${url}', {
  method: '${method}',
  headers: ${authHeader ? `{\n    ${Object.entries(headers).map(([k, v]) => `'${k}': '${v}'`).join(',\n    ')},\n    ${authHeader.includes('Basic') ? authHeader.split('\n')[2] : authHeader.split('\n')[2] || ''}\n  }` : headersIndented},
${bodyLine ? `  ${bodyLine}` : ''}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
          break;
        }

        case 'python': {
          let jsonLine = '';
          if (data) {
            const isJson = data.trim().startsWith('{') || data.trim().startsWith('[');
            if (isJson) {
              jsonLine = `json=${data},`;
            } else {
              jsonLine = `data='${escapeString(data, 'python')}',`;
            }
          }
          
          let authLine = '';
          if (auth?.type === 'basic') {
            authLine = `    auth=('${auth.username}', '${auth.password}'),\n`;
          } else if (auth?.type === 'bearer') {
            authLine = `    headers={**headers, 'Authorization': 'Bearer ${auth.token}'},\n`;
          }
          
          code = `import requests

response = requests.${method.toLowerCase()}(
    '${url}',
    headers=${headersIndented},
${authLine}${jsonLine ? `    ${jsonLine}\n` : ''})
print(response.json())`;
          break;
        }

        case 'php': {
          let bodyLine = '';
          if (data) {
            bodyLine = `$data = ${data.includes('{') ? data : `'${escapeString(data, 'php')}'`};\n  `;
          }
          
          let authLine = '';
          if (auth?.type === 'basic') {
            authLine = `  'Authorization: Basic ' . base64_encode('${auth.username}:${auth.password}'),\n`;
          } else if (auth?.type === 'bearer') {
            authLine = `  'Authorization: Bearer ${auth.token}',\n`;
          }
          
          const headerLines = Object.entries(headers).map(([k, v]) => `  '${k}: ${v}',`).join('\n');
          
          code = `<?php
$ch = curl_init('${url}');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
${headerLines}${authLine}]);
${bodyLine ? `${bodyLine}curl_setopt($ch, CURLOPT_POSTFIELDS, $data);\n` : ''}
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>`;
          break;
        }

        case 'ruby': {
          let bodyLine = '';
          if (data) {
            const isJson = data.trim().startsWith('{') || data.trim().startsWith('[');
            bodyLine = isJson ? `body: ${data}.to_json,` : `body: '${escapeString(data, 'ruby')}',`;
          }
          
          let authLine = '';
          if (auth?.type === 'basic') {
            authLine = `  basic_auth: { username: '${auth.username}', password: '${auth.password}' },\n`;
          } else if (auth?.type === 'bearer') {
            authLine = `  headers: { ...headers, 'Authorization' => 'Bearer ${auth.token}' },\n`;
          }
          
          code = `require 'net/http'
require 'json'

uri = URI('${url}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true if uri.scheme == 'https'

request = Net::HTTP::${method === 'GET' ? 'Get' : method === 'POST' ? 'Post' : method === 'PUT' ? 'Put' : method === 'DELETE' ? 'Delete' : 'Get'}.new(uri)
${Object.entries(headers).map(([k, v]) => `request['${k}'] = '${v}'`).join('\n')}
${authLine}${bodyLine ? `request.body = ${bodyLine.includes('to_json') ? bodyLine.replace('.to_json', '') : bodyLine.replace('body: ', '').replace(',', '')}\n` : ''}
response = http.request(request)
puts JSON.parse(response.body)`;
          break;
        }

        case 'java': {
          const headerLines = Object.entries(headers).map(([k, v]) => 
            `    .header("${k}", "${v}")`
          ).join('\n');
          
          let authHeader = '';
          if (auth?.type === 'basic') {
            const credentials = typeof window !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
            authHeader = `\n    .header("Authorization", "Basic ${credentials}")`;
          } else if (auth?.type === 'bearer') {
            authHeader = `\n    .header("Authorization", "Bearer ${auth.token}")`;
          }
          
          const bodyPublisher = data 
            ? `HttpRequest.BodyPublishers.ofString("${data}")` 
            : 'HttpRequest.BodyPublishers.noBody()';
          code = `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .method("${method}", ${bodyPublisher})${headerLines}${authHeader}
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;
          break;
        }

        case 'go': {
          let bodyParam = 'nil';
          if (data) {
            const escapedData = data.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
            bodyParam = `bytes.NewBuffer([]byte(\`${escapedData}\`))`;
          }
          
          const headerLines = Object.entries(headers).map(([k, v]) => 
            `    req.Header.Set("${k}", "${v}")`
          ).join('\n');
          
          let authHeader = '';
          if (auth?.type === 'basic') {
            const credentials = typeof window !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
            authHeader = `\n    req.Header.Set("Authorization", "Basic ${credentials}")`;
          } else if (auth?.type === 'bearer') {
            authHeader = `\n    req.Header.Set("Authorization", "Bearer ${auth.token}")`;
          }
          
          code = `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "io/ioutil"
)

func main() {
    client := &http.Client{}
    req, _ := http.NewRequest("${method}", "${url}", ${bodyParam})
${headerLines}${authHeader}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := ioutil.ReadAll(resp.Body)
    var result map[string]interface{}
    json.Unmarshal(body, &result)
    fmt.Println(result)
}`;
          break;
        }

        case 'csharp': {
          const headerLines = Object.entries(headers).map(([k, v]) => 
            `    request.Headers.Add("${k}", "${v}");`
          ).join('\n');
          
          let authLine = '';
          if (auth?.type === 'basic') {
            const credentials = typeof window !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
            authLine = `    request.Headers.Add("Authorization", "Basic ${credentials}");\n`;
          } else if (auth?.type === 'bearer') {
            authLine = `    request.Headers.Add("Authorization", "Bearer ${auth.token}");\n`;
          }
          
          const bodyLine = data ? `    var content = new StringContent("${escapeString(data, 'csharp')}", System.Text.Encoding.UTF8, "application/json");\n    request.Content = content;\n` : '';
          
          code = `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");
${headerLines}${authLine}${bodyLine}
        var response = await client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
    }
}`;
          break;
        }

        case 'nodejs': {
          const headerLines = Object.entries(headers).map(([k, v]) => 
            `    '${k}': '${v}'`
          ).join(',\n');
          
          let authHeader = '';
          if (auth?.type === 'basic') {
            const credentials = typeof window !== 'undefined' ? btoa(`${auth.username}:${auth.password}`) : Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
            authHeader = `,\n    'Authorization': 'Basic ${credentials}'`;
          } else if (auth?.type === 'bearer') {
            authHeader = `,\n    'Authorization': 'Bearer ${auth.token}'`;
          }
          
          let bodyLine = '';
          if (data) {
            const isJson = data.trim().startsWith('{') || data.trim().startsWith('[');
            if (isJson) {
              bodyLine = `,\n  body: JSON.stringify(${data})`;
            } else {
              bodyLine = `,\n  body: '${escapeString(data, 'nodejs')}'`;
            }
          }
          
          code = `const request = require('request');

const options = {
  method: '${method}',
  url: '${url}',
  headers: {
${headerLines}${authHeader}
  }${bodyLine}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(JSON.parse(body));
});`;
          break;
        }
      }

      setConvertedCode(code);
      toast.success('Converted successfully!');
    } catch (err: any) {
      toast.error('Failed to parse curl command: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension = targetLanguage === 'javascript' ? 'js' : 
                     targetLanguage === 'python' ? 'py' :
                     targetLanguage === 'nodejs' ? 'js' :
                     targetLanguage === 'php' ? 'php' :
                     targetLanguage === 'ruby' ? 'rb' :
                     targetLanguage === 'java' ? 'java' :
                     targetLanguage === 'go' ? 'go' :
                     targetLanguage === 'csharp' ? 'cs' : 'txt';
    
    const blob = new Blob([convertedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `request.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  const exampleCurls = [
    {
      name: 'Simple GET Request',
      command: 'curl https://api.example.com/users'
    },
    {
      name: 'POST with JSON',
      command: 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d \'{"name":"John","age":30}\''
    },
    {
      name: 'With Basic Auth',
      command: 'curl -u username:password https://api.example.com/protected'
    },
    {
      name: 'With Bearer Token',
      command: 'curl -X GET https://api.example.com/data -H "Authorization: Bearer your-token-here"'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary-600" />
              Curl to Code Converter
            </h2>
            <p className="text-gray-600 text-sm">Convert curl commands to code in 8+ languages. Supports authentication, headers, and all HTTP methods.</p>
          </div>
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Examples
          </button>
        </div>

        {showExamples && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Example cURL Commands:</h3>
            <div className="space-y-2">
              {exampleCurls.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurlCommand(example.command);
                    setShowExamples(false);
                  }}
                  className="block w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm"
                >
                  <span className="font-medium text-gray-700">{example.name}:</span>
                  <code className="block text-xs text-gray-600 mt-1">{example.command}</code>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">cURL Command</label>
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
            <option value="javascript">JavaScript (Fetch API)</option>
            <option value="python">Python (Requests)</option>
            <option value="nodejs">Node.js (Request/Axios)</option>
            <option value="php">PHP (cURL)</option>
            <option value="ruby">Ruby (Net::HTTP)</option>
            <option value="java">Java (HttpClient)</option>
            <option value="go">Go (net/http)</option>
            <option value="csharp">C# (HttpClient)</option>
          </select>
        </div>

        <button
          onClick={convert}
          disabled={!curlCommand.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Convert cURL to Code
        </button>
      </div>

      {convertedCode && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Converted Code ({targetLanguage})</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto scrollbar-thin text-sm">
            <code>{convertedCode}</code>
          </pre>
        </div>
      )}

      {/* Blog Links Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About cURL Conversion</h2>
        <div className="space-y-3">
          <Link
            href="/blog/curl-to-python-requests-complete-guide"
            className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Convert cURL to Python Requests: Complete Guide</h3>
            <p className="text-sm text-gray-600 mb-2">Step-by-step guide with real examples, authentication, headers, JSON data, and error handling.</p>
            <span className="text-blue-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/curl-vs-python-requests-comparison"
            className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">cURL vs Python Requests: Complete Comparison</h3>
            <p className="text-sm text-gray-600 mb-2">Compare cURL vs Python Requests: when to use each, pros and cons, and real-world examples.</p>
            <span className="text-green-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/how-to-get-curl-from-chrome"
            className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Get cURL from Chrome: Copy Request as cURL</h3>
            <p className="text-sm text-gray-600 mb-2">Learn how to copy network requests from Chrome DevTools as cURL commands.</p>
            <span className="text-purple-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
          <Link
            href="/blog/curl-to-code-converter-2026"
            className="block p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">How to Convert cURL Commands to Code in 2026</h3>
            <p className="text-sm text-gray-600 mb-2">Step-by-step guide with real examples for JavaScript, Python, Go, PHP, and more languages.</p>
            <span className="text-orange-600 text-sm font-medium hover:underline">Read Guide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
