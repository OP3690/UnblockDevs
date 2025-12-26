export interface ParsedData {
  [key: string]: any;
}

export interface FlattenedRow {
  [key: string]: any;
}

export interface Column {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
}

export interface Section {
  id: string;
  name: string;
  columnIds: string[];
}

/**
 * Converts a string to camelCase
 */
function toCamelCase(str: string): string {
  return str
    .replace(/[_-](.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * Converts a key with underscores to camelCase format
 */
function formatKey(key: string): string {
  // Convert underscore-separated keys to camelCase
  // e.g., "topGainers_symbol" -> "topGainersSymbol"
  // Remove numeric indices first, then convert to camelCase
  return toCamelCase(key.replace(/_\d+_/g, '_').replace(/^\d+_|_\d+$/g, ''));
}

/**
 * Flattens a nested JSON object into a flat structure
 */
export function flattenJson(
  obj: any,
  prefix: string = '',
  delimiter: string = '_'
): ParsedData {
  const flattened: ParsedData = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Keep original key (don't convert to camelCase)
      const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
      const value = obj[key];

      if (value === null || value === undefined) {
        flattened[newKey] = value;
      } else if (Array.isArray(value)) {
        // Handle arrays
        if (value.length === 0) {
          flattened[newKey] = [];
        } else if (typeof value[0] === 'object' && value[0] !== null) {
          // Array of objects - flatten each item with index
          value.forEach((item, index) => {
            const nested = flattenJson(item, `${newKey}${delimiter}${index}`, delimiter);
            Object.assign(flattened, nested);
          });
        } else {
          // Array of primitives
          flattened[newKey] = JSON.stringify(value);
        }
      } else if (typeof value === 'object') {
        // Recursively flatten nested objects
        const nested = flattenJson(value, newKey, delimiter);
        Object.assign(flattened, nested);
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
}

/**
 * Converts nested JSON to rows
 */
export function jsonToRows(
  data: any,
  delimiter: string = '_'
): FlattenedRow[] {
  if (Array.isArray(data)) {
    // Array of objects - create one row per item
    return data.map((item) => flattenJson(item, '', delimiter));
  } else if (typeof data === 'object' && data !== null) {
    // Check if this object contains arrays of objects at the root level
    const arrayKeys: string[] = [];
    const nonArrayData: ParsedData = {};
    
    // Separate array properties from non-array properties
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          arrayKeys.push(key);
        } else {
          nonArrayData[key] = value;
        }
      }
    }
    
    // If we have arrays of objects, expand them into rows
    if (arrayKeys.length > 0) {
      const rows: FlattenedRow[] = [];
      
      // Find the maximum length among all arrays
      const maxLength = Math.max(...arrayKeys.map(key => (data[key] as any[]).length));
      
      // Create rows for each index
      for (let i = 0; i < maxLength; i++) {
        const row: FlattenedRow = {};
        
        // Add non-array properties to each row
        const flattenedNonArray = flattenJson(nonArrayData, '', delimiter);
        Object.assign(row, flattenedNonArray);
        
        // Add array items at this index
        arrayKeys.forEach((arrayKey) => {
          const array = data[arrayKey] as any[];
          if (i < array.length) {
            // Keep original array key name (don't convert to camelCase)
            const flattenedItem = flattenJson(array[i], arrayKey, delimiter);
            Object.assign(row, flattenedItem);
          }
        });
        
        rows.push(row);
      }
      
      return rows.length > 0 ? rows : [flattenJson(data, '', delimiter)];
    }
    
    // Single object - flatten it
    return [flattenJson(data, '', delimiter)];
  } else {
    // Primitive value
    return [{ value: data }];
  }
}

/**
 * Infers the data type of a value
 */
export function inferType(value: any): 'string' | 'number' | 'date' | 'boolean' {
  if (value === null || value === undefined) {
    return 'string';
  }
  
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  
  if (typeof value === 'number') {
    return 'number';
  }
  
  if (typeof value === 'string') {
    // Try to detect dates
    const dateRegex = /^\d{4}-\d{2}-\d{2}/;
    if (dateRegex.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return 'date';
      }
    }
  }
  
  return 'string';
}

/**
 * Extracts all unique columns from rows
 */
export function extractColumns(rows: FlattenedRow[]): Column[] {
  const columnMap = new Map<string, Column>();

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!columnMap.has(key)) {
        const value = row[key];
        // Keep the key as-is with underscores visible
        // Remove array indices like _0, _1 from the end
        const cleanName = key.replace(/_\d+$/g, '');
        columnMap.set(key, {
          id: key,
          name: cleanName,
          type: inferType(value),
        });
      }
    });
  });

  return Array.from(columnMap.values());
}

/**
 * Validates JSON string
 */
export function validateJson(jsonString: string): { valid: boolean; error?: string; data?: any } {
  try {
    const data = JSON.parse(jsonString);
    return { valid: true, data };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Invalid JSON format',
    };
  }
}

