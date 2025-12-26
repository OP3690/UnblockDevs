'use client';

import { useState } from 'react';
import { Settings, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateJson } from '@/lib/jsonParser';

interface DiffItem {
  key: string;
  status: 'added' | 'removed' | 'changed' | 'unchanged';
  env1Value?: any;
  env2Value?: any;
  isSecret?: boolean;
}

export default function ConfigComparator() {
  const [config1, setConfig1] = useState('');
  const [config2, setConfig2] = useState('');
  const [diffResults, setDiffResults] = useState<DiffItem[]>([]);
  const [maskSecrets, setMaskSecrets] = useState(true);
  const [secretKeys, setSecretKeys] = useState(['password', 'secret', 'key', 'token', 'api_key']);

  const isSecretKey = (key: string): boolean => {
    return secretKeys.some((secret) => key.toLowerCase().includes(secret.toLowerCase()));
  };

  const maskValue = (value: any): string => {
    if (typeof value === 'string') {
      return '***MASKED***';
    }
    return '***MASKED***';
  };

  const flattenObject = (obj: any, prefix: string = '', result: Map<string, any> = new Map()): Map<string, any> => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, result);
        } else {
          result.set(newKey, obj[key]);
        }
      }
    }
    return result;
  };

  const compareConfigs = () => {
    try {
      const validation1 = validateJson(config1);
      const validation2 = validateJson(config2);

      if (!validation1.valid || !validation2.valid) {
        toast.error('Both configs must be valid JSON');
        return;
      }

      const flat1 = flattenObject(validation1.data);
      const flat2 = flattenObject(validation2.data);
      const allKeys = new Set<string>();
      flat1.keys().forEach(key => allKeys.add(key));
      flat2.keys().forEach(key => allKeys.add(key));

      const results: DiffItem[] = [];

      allKeys.forEach((key) => {
        const val1 = flat1.get(key);
        const val2 = flat2.get(key);
        const isSecret = isSecretKey(key);

        if (val1 === undefined) {
          results.push({
            key,
            status: 'added',
            env2Value: maskSecrets && isSecret ? maskValue(val2) : val2,
            isSecret,
          });
        } else if (val2 === undefined) {
          results.push({
            key,
            status: 'removed',
            env1Value: maskSecrets && isSecret ? maskValue(val1) : val1,
            isSecret,
          });
        } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          results.push({
            key,
            status: 'changed',
            env1Value: maskSecrets && isSecret ? maskValue(val1) : val1,
            env2Value: maskSecrets && isSecret ? maskValue(val2) : val2,
            isSecret,
          });
        } else {
          results.push({
            key,
            status: 'unchanged',
            env1Value: maskSecrets && isSecret ? maskValue(val1) : val1,
            env2Value: maskSecrets && isSecret ? maskValue(val2) : val2,
            isSecret,
          });
        }
      });

      setDiffResults(results);
      toast.success(`Comparison complete: ${results.length} keys analyzed`);
    } catch (err: any) {
      toast.error('Failed to compare configs');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added':
        return 'bg-green-50 border-green-200';
      case 'removed':
        return 'bg-red-50 border-red-200';
      case 'changed':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary-600" />
          Environment Config Comparator
        </h2>
        <p className="text-gray-600 mb-4">Compare environment configurations and detect mismatches.</p>

        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => setMaskSecrets(!maskSecrets)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {maskSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {maskSecrets ? 'Show Secrets' : 'Mask Secrets'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Config 1 (e.g., Staging)</label>
            <textarea
              value={config1}
              onChange={(e) => setConfig1(e.target.value)}
              placeholder='{"api_url": "https://staging.api.com", "db_host": "localhost"}'
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Config 2 (e.g., Production)</label>
            <textarea
              value={config2}
              onChange={(e) => setConfig2(e.target.value)}
              placeholder='{"api_url": "https://api.com", "db_host": "prod.db.com"}'
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          onClick={compareConfigs}
          disabled={!config1.trim() || !config2.trim()}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Compare Configs
        </button>
      </div>

      {diffResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Comparison Results ({diffResults.length} keys)
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
            {diffResults.map((result, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">
                      {result.key}
                      {result.isSecret && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          SECRET
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {result.status === 'added' && (
                        <div>
                          <span className="font-medium text-green-600">Added:</span>{' '}
                          <code className="bg-white px-2 py-1 rounded">
                            {JSON.stringify(result.env2Value)}
                          </code>
                        </div>
                      )}
                      {result.status === 'removed' && (
                        <div>
                          <span className="font-medium text-red-600">Removed:</span>{' '}
                          <code className="bg-white px-2 py-1 rounded">
                            {JSON.stringify(result.env1Value)}
                          </code>
                        </div>
                      )}
                      {result.status === 'changed' && (
                        <div className="space-y-1">
                          <div>
                            <span className="font-medium text-red-600">Config 1:</span>{' '}
                            <code className="bg-white px-2 py-1 rounded">
                              {JSON.stringify(result.env1Value)}
                            </code>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Config 2:</span>{' '}
                            <code className="bg-white px-2 py-1 rounded">
                              {JSON.stringify(result.env2Value)}
                            </code>
                          </div>
                        </div>
                      )}
                      {result.status === 'unchanged' && (
                        <div className="text-gray-500">No changes</div>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    result.status === 'added' ? 'bg-green-200 text-green-800' :
                    result.status === 'removed' ? 'bg-red-200 text-red-800' :
                    result.status === 'changed' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

