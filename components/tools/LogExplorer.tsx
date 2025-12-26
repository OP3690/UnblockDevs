'use client';

import { useState, useMemo } from 'react';
import { FileSearch, Filter, AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface LogEntry {
  level?: string;
  message?: string;
  timestamp?: string;
  [key: string]: any;
}

export default function LogExplorer() {
  const [logText, setLogText] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [parsedLogs, setParsedLogs] = useState<LogEntry[]>([]);

  const parseLogs = () => {
    try {
      const lines = logText.split('\n').filter((line) => line.trim());
      const logs: LogEntry[] = [];

      lines.forEach((line) => {
        try {
          // Try to parse as JSON
          const parsed = JSON.parse(line);
          logs.push(parsed);
        } catch {
          // If not JSON, try to extract structured info
          const logEntry: LogEntry = { raw: line };
          
          // Try to extract level
          const levelMatch = line.match(/\b(ERROR|WARN|INFO|DEBUG|TRACE|error|warn|info|debug|trace)\b/i);
          if (levelMatch) {
            logEntry.level = levelMatch[1].toUpperCase();
          }

          // Try to extract timestamp
          const timestampMatch = line.match(/\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}/);
          if (timestampMatch) {
            logEntry.timestamp = timestampMatch[0];
          }

          // Extract message (rest of the line)
          logEntry.message = line;
          logs.push(logEntry);
        }
      });

      setParsedLogs(logs);
      toast.success(`Parsed ${logs.length} log entries`);
    } catch (err: any) {
      toast.error('Failed to parse logs');
    }
  };

  const filteredLogs = useMemo(() => {
    return parsedLogs.filter((log) => {
      const matchesLevel = filterLevel === 'all' || log.level?.toUpperCase() === filterLevel.toUpperCase();
      const matchesSearch = !searchTerm || 
        JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [parsedLogs, filterLevel, searchTerm]);

  const getLevelIcon = (level?: string) => {
    const upperLevel = level?.toUpperCase() || '';
    if (upperLevel.includes('ERROR')) return <XCircle className="w-4 h-4 text-red-600" />;
    if (upperLevel.includes('WARN')) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    if (upperLevel.includes('INFO')) return <Info className="w-4 h-4 text-blue-600" />;
    return <CheckCircle className="w-4 h-4 text-gray-400" />;
  };

  const getLevelColor = (level?: string) => {
    const upperLevel = level?.toUpperCase() || '';
    if (upperLevel.includes('ERROR')) return 'bg-red-50 border-red-200';
    if (upperLevel.includes('WARN')) return 'bg-yellow-50 border-yellow-200';
    if (upperLevel.includes('INFO')) return 'bg-blue-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };

  const errorCount = parsedLogs.filter((log) => log.level?.toUpperCase().includes('ERROR')).length;
  const warnCount = parsedLogs.filter((log) => log.level?.toUpperCase().includes('WARN')).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileSearch className="w-6 h-6 text-primary-600" />
          Logs Analyzer
        </h2>
        <p className="text-gray-600 mb-4">Parse, filter, and analyze structured logs (JSON or text format).</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Logs</label>
          <textarea
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            placeholder="Paste your logs here (JSON or text format)"
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          onClick={parseLogs}
          disabled={!logText.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Parse Logs
        </button>
      </div>

      {parsedLogs.length > 0 && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Log Statistics</h3>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{warnCount}</div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{parsedLogs.length}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
              {filteredLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${getLevelColor(log.level)}`}
                >
                  <div className="flex items-start gap-3">
                    {getLevelIcon(log.level)}
                    <div className="flex-1">
                      {log.timestamp && (
                        <div className="text-xs text-gray-500 mb-1">{log.timestamp}</div>
                      )}
                      {log.level && (
                        <span className="inline-block px-2 py-1 bg-white rounded text-xs font-semibold mb-2">
                          {log.level}
                        </span>
                      )}
                      {log.message && (
                        <div className="text-gray-800 mb-2">{log.message}</div>
                      )}
                      {Object.keys(log).filter((k) => !['level', 'message', 'timestamp', 'raw'].includes(k)).length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                            View Details
                          </summary>
                          <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                            {JSON.stringify(
                              Object.fromEntries(
                                Object.entries(log).filter(([k]) => !['level', 'message', 'timestamp', 'raw'].includes(k))
                              ),
                              null,
                              2
                            )}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

