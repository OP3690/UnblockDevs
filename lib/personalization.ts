// Personalization utilities for tracking user preferences

export type ToolTab = 'converter' | 'beautifier' | 'fixer' | 'comparator' | 'jsoncompare' | 'schema' | 'logs' | 'payload' | 'curl' | 'mock' | 'testdata' | 'config' | 'sql' | 'builder' | 'promptchunk' | 'schemamasker' | 'jsonpromptshield' | 'codemasker' | 'regextester' | 'tokencompare' | 'timezone' | 'hartocurl' | 'curlfailure';

export interface ToolInfo {
  id: ToolTab;
  name: string;
  description: string;
}

const MAX_RECENT_TOOLS = 5;
const MAX_FAVORITES = 10;

export class PersonalizationManager {
  // Get recent tools
  static getRecentTools(): ToolTab[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const recent = localStorage.getItem('recent_tools');
      return recent ? JSON.parse(recent) : [];
    } catch {
      return [];
    }
  }

  // Add tool to recent
  static addRecentTool(toolId: ToolTab) {
    if (typeof window === 'undefined') return;
    
    try {
      const recent = this.getRecentTools();
      // Remove if already exists
      const filtered = recent.filter((id: ToolTab) => id !== toolId);
      // Add to beginning
      const updated = [toolId, ...filtered].slice(0, MAX_RECENT_TOOLS);
      localStorage.setItem('recent_tools', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent tool:', error);
    }
  }

  // Get favorites
  static getFavorites(): ToolTab[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const favorites = localStorage.getItem('favorite_tools');
      return favorites ? JSON.parse(favorites) : [];
    } catch {
      return [];
    }
  }

  // Toggle favorite
  static toggleFavorite(toolId: ToolTab): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const favorites = this.getFavorites();
      const isFavorite = favorites.includes(toolId);
      
      if (isFavorite) {
        // Remove from favorites
        const updated = favorites.filter((id: ToolTab) => id !== toolId);
        localStorage.setItem('favorite_tools', JSON.stringify(updated));
        return false;
      } else {
        // Add to favorites (limit to MAX_FAVORITES)
        const updated = [...favorites, toolId].slice(0, MAX_FAVORITES);
        localStorage.setItem('favorite_tools', JSON.stringify(updated));
        return true;
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      return false;
    }
  }

  // Check if tool is favorite
  static isFavorite(toolId: ToolTab): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const favorites = this.getFavorites();
      return favorites.includes(toolId);
    } catch {
      return false;
    }
  }

  // Get tool info mapping
  static getToolInfo(): Record<ToolTab, ToolInfo> {
    return {
      converter: { id: 'converter', name: 'JSON to Excel/CSV', description: 'Convert JSON to Excel or CSV format' },
      beautifier: { id: 'beautifier', name: 'JSON Beautifier', description: 'Format and beautify JSON data' },
      fixer: { id: 'fixer', name: 'JSON Fixer', description: 'Fix and repair broken JSON' },
      comparator: { id: 'comparator', name: 'API Comparator', description: 'Compare API responses' },
      jsoncompare: { id: 'jsoncompare', name: 'JSON Comparator', description: 'Compare two JSON objects' },
      schema: { id: 'schema', name: 'Schema Generator', description: 'Generate JSON schemas' },
      logs: { id: 'logs', name: 'Log Explorer', description: 'Explore and analyze logs' },
      payload: { id: 'payload', name: 'Payload Analyzer', description: 'Analyze API payloads' },
      curl: { id: 'curl', name: 'cURL Converter', description: 'Convert cURL commands to code' },
      mock: { id: 'mock', name: 'Mock API Generator', description: 'Generate mock API responses' },
      testdata: { id: 'testdata', name: 'Test Data Generator', description: 'Generate test data' },
      config: { id: 'config', name: 'Config Comparator', description: 'Compare configurations' },
      sql: { id: 'sql', name: 'SQL Formatter', description: 'Format SQL queries' },
      builder: { id: 'builder', name: 'JSON Builder', description: 'Build JSON interactively' },
      promptchunk: { id: 'promptchunk', name: 'Prompt Chunker', description: 'Split AI prompts into chunks' },
      schemamasker: { id: 'schemamasker', name: 'AI Schema Masker', description: 'Mask SQL identifiers for AI-safe prompts (client-side)' },
      jsonpromptshield: { id: 'jsonpromptshield', name: 'JSON Shield', description: 'Mask JSON keys & values for AI, 100% client-side' },
      codemasker: { id: 'codemasker', name: 'Code Prompt Shield', description: 'Reversible code masking: variables, secrets, PII—safe for AI, multi-language' },
      regextester: { id: 'regextester', name: 'Regex Tester', description: 'Test and debug regular expressions with live matches, groups, and replace' },
      tokencompare: { id: 'tokencompare', name: 'Token Comparator', description: 'Compare tokens character by character' },
      timezone: { id: 'timezone', name: 'Timezone Translator', description: 'Convert times across timezones' },
      hartocurl: { id: 'hartocurl', name: 'HAR to cURL', description: 'Convert HAR files and network requests to cURL commands' },
      curlfailure: { id: 'curlfailure', name: 'cURL Failure Root-Cause Engine', description: 'Diagnose why your API call is failing with ranked root causes and fix suggestions' },
    };
  }
}

