'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Copy, RefreshCw, Code, Info, TrendingUp, Lightbulb, XCircle, Shield, Clock, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface RootCause {
  cause: string;
  confidence: number;
  fix: string;
  correctedCurl?: string;
  explanation: string;
}

interface AnalysisResult {
  rootCauses: RootCause[];
  statusCode: number;
  statusText: string;
  detectedIssues: string[];
}

export default function CurlFailureRootCause() {
  const [curlCommand, setCurlCommand] = useState('');
  const [responseBody, setResponseBody] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const parseCurlCommand = (curl: string) => {
    const parsed: {
      method: string;
      url: string;
      headers: Record<string, string>;
      body?: string;
      hasAuth: boolean;
      contentType?: string;
    } = {
      method: 'GET',
      url: '',
      headers: {},
      hasAuth: false,
    };

    // Extract method
    const methodMatch = curl.match(/-X\s+(\w+)/i);
    if (methodMatch) {
      parsed.method = methodMatch[1].toUpperCase();
    }

    // Extract URL (last quoted string or unquoted string at end)
    const urlMatch = curl.match(/["']([^"']+)["']\s*$|["']([^"']+)["']/);
    if (urlMatch) {
      parsed.url = urlMatch[1] || urlMatch[2] || '';
    }

    // Extract headers
    const headerMatches = curl.matchAll(/-H\s+["']([^"']+):\s*([^"']+)["']/gi);
    for (const match of headerMatches) {
      const headerName = match[1].toLowerCase();
      const headerValue = match[2];
      parsed.headers[headerName] = headerValue;
      
      if (headerName === 'authorization' || headerName === 'x-api-key' || headerName === 'api-key') {
        parsed.hasAuth = true;
      }
      if (headerName === 'content-type') {
        parsed.contentType = headerValue.toLowerCase();
      }
    }

    // Extract body
    const dataMatch = curl.match(/-d\s+["']([^"']+)["']|--data-raw\s+["']([^"']+)["']/i);
    if (dataMatch) {
      parsed.body = dataMatch[1] || dataMatch[2] || '';
    }

    return parsed;
  };

  const analyzeFailure = (): AnalysisResult => {
    const parsed = parseCurlCommand(curlCommand);
    const status = parseInt(statusCode) || 0;
    const issues: string[] = [];
    const causes: RootCause[] = [];

    // 401 Unauthorized
    if (status === 401) {
      if (!parsed.hasAuth) {
        causes.push({
          cause: 'Missing Authorization Header',
          confidence: 95,
          fix: 'Add authentication header: -H "Authorization: Bearer <token>" or -H "X-API-Key: <key>"',
          correctedCurl: curlCommand.replace(
            /(-X\s+\w+\s+)/i,
            `$1-H "Authorization: Bearer YOUR_TOKEN" \\\n  `
          ),
          explanation: 'The API requires authentication but no Authorization header was found in your cURL command.',
        });
        issues.push('Missing authentication');
      } else {
        causes.push({
          cause: 'Invalid or Expired Token',
          confidence: 85,
          fix: 'Verify your token is valid and not expired. Regenerate the token if necessary.',
          explanation: 'Authentication header is present but the token may be invalid, expired, or revoked.',
        });
        issues.push('Invalid authentication');
      }
    }

    // 403 Forbidden
    if (status === 403) {
      causes.push({
        cause: 'Insufficient Permissions',
        confidence: 90,
        fix: 'Check that your API key or token has the required permissions for this endpoint.',
        explanation: 'Your authentication is valid but you don\'t have permission to access this resource.',
      });
      issues.push('Permission denied');
    }

    // 400 Bad Request
    if (status === 400) {
      // Check for JSON syntax errors
      if (parsed.body) {
        try {
          JSON.parse(parsed.body);
        } catch {
          causes.push({
            cause: 'Invalid JSON in Request Body',
            confidence: 95,
            fix: 'Fix JSON syntax errors. Ensure proper quotes, commas, and brackets.',
            correctedCurl: curlCommand.replace(
              /-d\s+["']([^"']+)["']/i,
              (match, body) => {
                try {
                  const fixed = JSON.stringify(JSON.parse(body));
                  return `-d '${fixed}'`;
                } catch {
                  return match;
                }
              }
            ),
            explanation: 'The request body contains invalid JSON syntax.',
          });
          issues.push('Invalid JSON');
        }
      }

      // Check for missing Content-Type
      if (parsed.method !== 'GET' && parsed.body && !parsed.contentType) {
        causes.push({
          cause: 'Missing Content-Type Header',
          confidence: 90,
          fix: 'Add Content-Type header: -H "Content-Type: application/json"',
          correctedCurl: curlCommand.replace(
            /(-X\s+\w+\s+)/i,
            `$1-H "Content-Type: application/json" \\\n  `
          ),
          explanation: 'POST/PUT/PATCH requests with a body typically require a Content-Type header.',
        });
        issues.push('Missing Content-Type');
      }

      // Check for method/body mismatch
      if (parsed.method === 'GET' && parsed.body) {
        causes.push({
          cause: 'GET Request with Body',
          confidence: 85,
          fix: 'Remove -d flag or change method to POST/PUT/PATCH',
          correctedCurl: curlCommand.replace(/\s+-d\s+["'][^"']+["']/i, ''),
          explanation: 'GET requests should not have a request body. Use POST, PUT, or PATCH for requests with data.',
        });
        issues.push('Method mismatch');
      }
    }

    // 404 Not Found
    if (status === 404) {
      causes.push({
        cause: 'Invalid Endpoint URL',
        confidence: 90,
        fix: 'Verify the URL is correct. Check API documentation for the correct endpoint path.',
        explanation: 'The requested resource was not found. The URL may be incorrect or the endpoint may have changed.',
      });
      issues.push('Invalid URL');
    }

    // 405 Method Not Allowed
    if (status === 405) {
      causes.push({
        cause: 'HTTP Method Not Supported',
        confidence: 95,
        fix: `Change method to one supported by the endpoint. Try POST, GET, PUT, or DELETE.`,
        explanation: `The endpoint does not support ${parsed.method} method. Check API documentation for allowed methods.`,
      });
      issues.push('Method not allowed');
    }

    // 429 Too Many Requests
    if (status === 429) {
      causes.push({
        cause: 'Rate Limit Exceeded',
        confidence: 95,
        fix: 'Wait before retrying. Implement exponential backoff. Check rate limit headers in response.',
        explanation: 'You have exceeded the API rate limit. Wait before making another request.',
      });
      issues.push('Rate limit exceeded');
    }

    // 500/502/503 Server Errors
    if (status >= 500) {
      causes.push({
        cause: 'Server Error',
        confidence: 80,
        fix: 'This is a server-side issue. Retry the request. If it persists, contact API support.',
        explanation: 'The API server encountered an error. This is typically not a problem with your request.',
      });
      issues.push('Server error');
    }

    // Check response body for error messages
    if (responseBody) {
      try {
        const body = JSON.parse(responseBody);
        if (body.error || body.message) {
          const errorMsg = body.error || body.message || '';
          if (errorMsg.toLowerCase().includes('token') || errorMsg.toLowerCase().includes('auth')) {
            causes.push({
              cause: 'Authentication Error (from response)',
              confidence: 85,
              fix: 'Check your authentication credentials. Token may be invalid or expired.',
              explanation: `Server response indicates: ${errorMsg}`,
            });
          }
          if (errorMsg.toLowerCase().includes('validation') || errorMsg.toLowerCase().includes('invalid')) {
            causes.push({
              cause: 'Validation Error',
              confidence: 90,
              fix: 'Check request body format and required fields. Review API documentation.',
              explanation: `Server response indicates: ${errorMsg}`,
            });
          }
        }
      } catch {
        // Not JSON, check for HTML (common in 404/500 errors)
        if (responseBody.trim().startsWith('<')) {
          causes.push({
            cause: 'Received HTML Instead of JSON',
            confidence: 95,
            fix: 'Verify the URL is correct. You may be hitting a web page instead of an API endpoint.',
            explanation: 'The server returned HTML instead of JSON. This usually means the URL is incorrect.',
          });
        }
      }
    }

    // If no specific causes found, provide generic analysis
    if (causes.length === 0) {
      causes.push({
        cause: 'General Request Error',
        confidence: 60,
        fix: 'Review your cURL command, check API documentation, verify endpoint URL and method.',
        explanation: 'Unable to determine specific cause. Review all aspects of your request.',
      });
    }

    // Sort by confidence
    causes.sort((a, b) => b.confidence - a.confidence);

    return {
      rootCauses: causes,
      statusCode: status,
      statusText: getStatusText(status),
      detectedIssues: issues,
    };
  };

  const getStatusText = (code: number): string => {
    const statusTexts: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    };
    return statusTexts[code] || 'Unknown';
  };

  const handleAnalyze = () => {
    if (!curlCommand.trim()) {
      toast.error('Please enter a cURL command');
      return;
    }
    if (!statusCode.trim()) {
      toast.error('Please enter the HTTP status code');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      try {
        const result = analyzeFailure();
        setAnalysisResult(result);
        toast.success('Analysis complete!');
      } catch (error) {
        toast.error('Failed to analyze. Please check your inputs.');
        console.error(error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCurlCommand('');
    setResponseBody('');
    setStatusCode('');
    setExpectedBehavior('');
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          cURL Failure Root-Cause Engine
        </h1>
        <p className="text-lg text-gray-600">
          Diagnose why your API call is failing. Get ranked root causes, confidence scores, and fix suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            Input
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                cURL Command *
              </label>
              <textarea
                value={curlCommand}
                onChange={(e) => setCurlCommand(e.target.value)}
                placeholder='curl -X POST -H "Content-Type: application/json" -d data "https://api.example.com/endpoint"'
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                HTTP Status Code *
              </label>
              <input
                type="text"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
                placeholder="401, 400, 404, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Response Body (Optional)
              </label>
              <textarea
                value={responseBody}
                onChange={(e) => setResponseBody(e.target.value)}
                placeholder='{"error": "Unauthorized"}'
                className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Behavior (Optional)
              </label>
              <textarea
                value={expectedBehavior}
                onChange={(e) => setExpectedBehavior(e.target.value)}
                placeholder="What should have happened?"
                className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    Analyze Failure
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Analysis Results
          </h2>

          {!analysisResult ? (
            <div className="text-center py-12 text-gray-500">
              <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Enter your cURL command and status code, then click "Analyze Failure"</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900">
                    {analysisResult.statusCode} {analysisResult.statusText}
                  </span>
                </div>
                {analysisResult.detectedIssues.length > 0 && (
                  <p className="text-sm text-red-800">
                    Detected: {analysisResult.detectedIssues.join(', ')}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {analysisResult.rootCauses.map((cause, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900">{cause.cause}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">
                          {cause.confidence}%
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{cause.explanation}</p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-900 font-medium">{cause.fix}</p>
                      </div>
                    </div>

                    {cause.correctedCurl && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-600">Corrected cURL:</span>
                          <button
                            onClick={() => handleCopy(cause.correctedCurl!)}
                            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            {copied ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto border border-gray-200">
                          <code>{cause.correctedCurl}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          How It Works
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Step 1:</strong> Parses your cURL command to extract method, headers, body, and URL.
          </p>
          <p>
            <strong>Step 2:</strong> Analyzes the HTTP status code and response body to classify the failure type.
          </p>
          <p>
            <strong>Step 3:</strong> Applies rule-based analysis to identify common issues (auth, validation, format errors).
          </p>
          <p>
            <strong>Step 4:</strong> Ranks root causes by confidence score and provides fix suggestions with corrected cURL commands.
          </p>
        </div>
      </div>
    </div>
  );
}
