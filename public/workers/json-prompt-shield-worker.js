/**
 * Secure AI JSON Prompt Shield — High-Performance JSON Payload Masking Engine
 * Masks keys (K_00001), string values (S_00001), optional booleans (B_00001).
 * Keeps numbers and null unchanged. Preserves structure. Iterative traversal for large payloads.
 * 100% client-side, fully reversible.
 */

function pad5(n) {
  return String(n).padStart(5, '0');
}

function getOrCreateKeyMask(key, keyMap, reverseKeyMap, keyCounter) {
  if (keyMap.has(key)) return keyMap.get(key);
  const dummy = 'K_' + pad5(keyCounter.current);
  keyMap.set(key, dummy);
  reverseKeyMap.set(dummy, key);
  keyCounter.current += 1;
  return dummy;
}

function getOrCreateStringMask(value, stringMap, reverseStringMap, stringCounter) {
  if (stringMap.has(value)) return stringMap.get(value);
  const dummy = 'S_' + pad5(stringCounter.current);
  stringMap.set(value, dummy);
  reverseStringMap.set(dummy, value);
  stringCounter.current += 1;
  return dummy;
}

function getOrCreateBooleanMask(value, booleanMap, reverseBooleanMap, booleanCounter) {
  const key = value === true ? 'true' : 'false';
  if (booleanMap.has(key)) return booleanMap.get(key);
  const dummy = 'B_' + pad5(booleanCounter.current);
  booleanMap.set(key, dummy);
  reverseBooleanMap.set(dummy, value);
  booleanCounter.current += 1;
  return dummy;
}

/**
 * Iterative (stack-based) mask traversal to avoid stack overflow on large JSON.
 */
function maskObjectIterative(root, options) {
  const maskKeys = options.maskKeys !== false;
  const maskStrings = options.maskStrings !== false;
  const maskBooleans = options.maskBooleans === true;
  const ignoreKeys = options.ignoreKeys && new Set(options.ignoreKeys) || new Set();

  const keyMap = new Map();
  const reverseKeyMap = new Map();
  const stringMap = new Map();
  const reverseStringMap = new Map();
  const booleanMap = new Map();
  const reverseBooleanMap = new Map();

  const keyCounter = { current: 1 };
  const stringCounter = { current: 1 };
  const booleanCounter = { current: 1 };

  const stack = [{ value: root, parent: null, key: null }];
  let result = undefined;

  while (stack.length > 0) {
    const { value, parent, key } = stack.pop();

    if (value === null || typeof value !== 'object') {
      // Primitive: mask or pass through
      let out;
      if (typeof value === 'string') {
        out = maskStrings ? getOrCreateStringMask(value, stringMap, reverseStringMap, stringCounter) : value;
      } else if (typeof value === 'number') {
        out = value;
      } else if (typeof value === 'boolean') {
        out = maskBooleans ? getOrCreateBooleanMask(value, booleanMap, reverseBooleanMap, booleanCounter) : value;
      } else {
        out = null;
      }
      if (parent === null) {
        result = out;
      } else if (Array.isArray(parent)) {
        parent[key] = out;
      } else {
        parent[key] = out;
      }
      continue;
    }

    if (Array.isArray(value)) {
      const newArr = [];
      if (parent === null) {
        result = newArr;
      } else if (Array.isArray(parent)) {
        parent[key] = newArr;
      } else {
        parent[key] = newArr;
      }
      for (let i = value.length - 1; i >= 0; i--) {
        stack.push({ value: value[i], parent: newArr, key: i });
      }
      continue;
    }

    // Object
    const newObj = {};
    if (parent === null) {
      result = newObj;
    } else if (Array.isArray(parent)) {
      parent[key] = newObj;
    } else {
      parent[key] = newObj;
    }
    const keys = Object.keys(value);
    for (let i = keys.length - 1; i >= 0; i--) {
      const k = keys[i];
      const outKey = maskKeys && !ignoreKeys.has(k)
        ? getOrCreateKeyMask(k, keyMap, reverseKeyMap, keyCounter)
        : k;
      stack.push({ value: value[k], parent: newObj, key: outKey });
    }
  }

  return {
    masked: result,
    keyMap,
    reverseKeyMap,
    stringMap,
    reverseStringMap,
    booleanMap,
    reverseBooleanMap,
  };
}

/**
 * Iterative unmask: same stack-based traversal, reverse lookups.
 */
function unmaskObjectIterative(root, mapping) {
  const reverseKeyMap = new Map(Object.entries(mapping.reverseKeyMap || {}));
  const reverseStringMap = new Map(Object.entries(mapping.reverseStringMap || {}));
  const reverseBooleanMap = new Map(Object.entries(mapping.reverseBooleanMap || {}));

  const stack = [{ value: root, parent: null, key: null }];
  let result = undefined;

  while (stack.length > 0) {
    const { value, parent, key } = stack.pop();

    if (value === null || typeof value !== 'object') {
      let out = value;
      if (typeof value === 'string') {
        if (reverseStringMap.has(value)) out = reverseStringMap.get(value);
        else if (reverseBooleanMap.has(value)) out = reverseBooleanMap.get(value);
      }
      if (parent === null) {
        result = out;
      } else if (Array.isArray(parent)) {
        parent[key] = out;
      } else {
        parent[key] = out;
      }
      continue;
    }

    if (Array.isArray(value)) {
      const newArr = [];
      if (parent === null) {
        result = newArr;
      } else if (Array.isArray(parent)) {
        parent[key] = newArr;
      } else {
        parent[key] = newArr;
      }
      for (let i = value.length - 1; i >= 0; i--) {
        stack.push({ value: value[i], parent: newArr, key: i });
      }
      continue;
    }

    const newObj = {};
    if (parent === null) {
      result = newObj;
    } else if (Array.isArray(parent)) {
      parent[key] = newObj;
    } else {
      parent[key] = newObj;
    }
    const keys = Object.keys(value);
    for (let i = keys.length - 1; i >= 0; i--) {
      const k = keys[i];
      const outKey = reverseKeyMap.has(k) ? reverseKeyMap.get(k) : k;
      stack.push({ value: value[k], parent: newObj, key: outKey });
    }
  }

  return result;
}

function runMask(inputString, options) {
  const opts = options || {};
  let parsed;
  try {
    parsed = JSON.parse(inputString);
  } catch (e) {
    throw new Error('Invalid JSON: ' + (e.message || 'parse error'));
  }
  const { masked, keyMap, reverseKeyMap, stringMap, reverseStringMap, booleanMap, reverseBooleanMap } =
    maskObjectIterative(parsed, opts);
  const maskedString = JSON.stringify(masked, null, 0);
  const identifierCount = keyMap.size + stringMap.size + (opts.maskBooleans ? booleanMap.size : 0);
  const mapping = {
    version: '1.0',
    createdAt: new Date().toISOString(),
    maskKeys: opts.maskKeys !== false,
    maskStrings: opts.maskStrings !== false,
    maskBooleans: opts.maskBooleans === true,
    keyMap: Object.fromEntries(keyMap.entries()),
    reverseKeyMap: Object.fromEntries(reverseKeyMap.entries()),
    stringMap: Object.fromEntries(stringMap.entries()),
    reverseStringMap: Object.fromEntries(reverseStringMap.entries()),
    booleanMap: Object.fromEntries(booleanMap.entries()),
    reverseBooleanMap: Object.fromEntries(reverseBooleanMap.entries()),
  };
  return { maskedString, mapping, identifierCount };
}

function runUnmask(maskedString, mapping) {
  let parsed;
  try {
    parsed = JSON.parse(maskedString);
  } catch (e) {
    throw new Error('Invalid masked JSON: ' + (e.message || 'parse error'));
  }
  const restored = unmaskObjectIterative(parsed, mapping);
  return JSON.stringify(restored, null, 0);
}

self.onmessage = function (e) {
  const data = e.data;
  if (!data || !data.type) return;
  try {
    if (data.type === 'MASK') {
      const { input, options } = data.payload;
      const { maskedString, mapping, identifierCount } = runMask(input, options);
      self.postMessage({ type: 'MASK_RESULT', payload: { masked: maskedString, mapping, identifierCount } });
      return;
    }
    if (data.type === 'UNMASK') {
      const { masked, mapping } = data.payload;
      const restored = runUnmask(masked, mapping);
      self.postMessage({ type: 'UNMASK_RESULT', payload: { restored } });
      return;
    }
  } catch (err) {
    self.postMessage({ type: 'ERROR', error: (err && err.message) ? err.message : 'Unknown error' });
  }
};
