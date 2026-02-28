/* eslint-disable no-restricted-globals */
/**
 * DITE — Deterministic Identifier Transformation Engine
 * Browser-based compiler-level identifier obfuscation engine.
 * Pipeline: Lexer → Contextual Identifier Extraction → Mapping Generation → Transformation → Output
 * Reverse: Re-tokenize → Longest-match reverse mapping.
 * No network, no logging, O(n) streaming-friendly.
 */

const TokenType = {
  KEYWORD: 'KEYWORD',
  IDENTIFIER: 'IDENTIFIER',
  QUOTED_IDENTIFIER: 'QUOTED_IDENTIFIER',
  STRING_LITERAL: 'STRING_LITERAL',
  NUMERIC_LITERAL: 'NUMERIC_LITERAL',
  OPERATOR: 'OPERATOR',
  SYMBOL: 'SYMBOL',
  COMMENT: 'COMMENT',
  WHITESPACE: 'WHITESPACE',
};

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'UPDATE', 'DELETE',
  'LEFT', 'RIGHT', 'INNER', 'OUTER', 'JOIN', 'ON', 'GROUP', 'BY',
  'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT',
  'CREATE', 'TABLE', 'VIEW', 'INDEX', 'CONSTRAINT', 'PRIMARY', 'KEY',
  'FOREIGN', 'REFERENCES', 'ALTER', 'DROP', 'TRUNCATE', 'VALUES',
  'SET', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'WITH', 'OVER', 'PARTITION', 'USING',
]);

const SQL_FUNCTIONS = new Set([
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NVL', 'ROUND',
  'LOWER', 'UPPER', 'NOW', 'CURRENT_TIMESTAMP', 'CAST', 'EXTRACT',
]);

const ParseState = {
  NONE: 'NONE',
  SELECT: 'SELECT',
  FROM: 'FROM',
  JOIN: 'JOIN',
  ON: 'ON',
  INSERT: 'INSERT',
  INTO: 'INTO',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  TABLE: 'TABLE',
  WHERE: 'WHERE',
  SET: 'SET',
  GROUP_BY: 'GROUP_BY',
  ORDER_BY: 'ORDER_BY',
  WITH: 'WITH',
  CTE_AS: 'CTE_AS',
};

function pad6(n) {
  return String(n).padStart(6, '0');
}

// ——— STAGE 1: LEXER (streaming O(n)) ———
function isLikelyJSON(input) {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.startsWith('{') || trimmed.startsWith('[');
}

function tokenize(input) {
  const tokens = [];
  let i = 0;
  const n = input.length;
  const jsonMode = isLikelyJSON(input);

  while (i < n) {
    const start = i;
    const ch = input[i];
    const next = input[i + 1];

    // —— JSON: treat [ ] as single symbols so array/object structure is preserved
    if (jsonMode && (ch === '[' || ch === ']')) {
      tokens.push({ type: TokenType.SYMBOL, value: ch, raw: ch });
      i += 1;
      continue;
    }

    // —— String literals (do not touch)
    if (ch === "'") {
      let raw = ch;
      i += 1;
      while (i < n) {
        raw += input[i];
        if (input[i] === "'" && (i + 1 >= n || input[i + 1] !== "'")) break;
        if (input[i] === "'" && input[i + 1] === "'") i += 1;
        i += 1;
      }
      tokens.push({ type: TokenType.STRING_LITERAL, value: raw, raw });
      i += 1;
      continue;
    }
    if (ch === '"') {
      let raw = '"';
      i += 1;
      while (i < n) {
        if (input[i] === '"' && (i > 0 && input[i - 1] === '\\')) {
          raw += input[i++];
          continue;
        }
        if (input[i] === '"') {
          raw += '"';
          i += 1;
          break;
        }
        raw += input[i++];
      }
      const value = raw.slice(1, -1).replace(/\\"/g, '"');
      tokens.push({ type: TokenType.QUOTED_IDENTIFIER, value, raw });
      continue;
    }
    if (ch === '`') {
      let raw = ch;
      i += 1;
      while (i < n && input[i] !== '`') {
        raw += input[i];
        i += 1;
      }
      if (i < n) raw += input[i++];
      const value = raw.slice(1, -1);
      tokens.push({ type: TokenType.QUOTED_IDENTIFIER, value, raw });
      continue;
    }
    if (ch === '[') {
      // SQL-style [identifier] (only when not JSON)
      let raw = ch;
      i += 1;
      while (i < n && input[i] !== ']') {
        raw += input[i];
        i += 1;
      }
      if (i < n) raw += input[i++];
      const value = raw.slice(1, -1);
      tokens.push({ type: TokenType.QUOTED_IDENTIFIER, value, raw });
      continue;
    }

    // —— Comments (do not touch)
    if (ch === '-' && next === '-') {
      let raw = '';
      while (i < n && input[i] !== '\n') raw += input[i++];
      tokens.push({ type: TokenType.COMMENT, value: raw, raw });
      continue;
    }
    if (ch === '/' && next === '*') {
      let raw = '/*';
      i += 2;
      while (i < n - 1) {
        raw += input[i];
        if (input[i] === '*' && input[i + 1] === '/') {
          raw += '*/';
          i += 2;
          break;
        }
        i += 1;
      }
      tokens.push({ type: TokenType.COMMENT, value: raw, raw });
      continue;
    }

    // —— Whitespace
    if (/\s/.test(ch)) {
      let raw = '';
      while (i < n && /\s/.test(input[i])) raw += input[i++];
      tokens.push({ type: TokenType.WHITESPACE, value: raw, raw });
      continue;
    }

    // —— Numeric literal
    if (/[0-9.]/.test(ch)) {
      let raw = '';
      while (i < n && /[0-9.eE+-]/.test(input[i])) raw += input[i++];
      tokens.push({ type: TokenType.NUMERIC_LITERAL, value: raw, raw });
      continue;
    }

    // —— Word (keyword or identifier) — no dot inside, so a.b is two tokens
    if (/[A-Za-z_]/.test(ch)) {
      let raw = '';
      while (i < n && /[A-Za-z0-9_$#]/.test(input[i])) raw += input[i++];
      const upper = raw.toUpperCase();
      if (SQL_KEYWORDS.has(upper)) {
        tokens.push({ type: TokenType.KEYWORD, value: upper, raw });
      } else if (SQL_FUNCTIONS.has(upper)) {
        tokens.push({ type: TokenType.IDENTIFIER, value: raw, raw }); // keep functions as identifier, don't mask
      } else {
        tokens.push({ type: TokenType.IDENTIFIER, value: raw, raw });
      }
      continue;
    }

    // —— Operators / symbols
    const op = ch + (next && /[=<>!]/.test(ch) && /[=<>]/.test(next) ? input[++i] : '');
    if (op) {
      tokens.push({ type: TokenType.OPERATOR, value: op, raw: op });
      i += op.length;
    } else {
      tokens.push({ type: TokenType.SYMBOL, value: ch, raw: ch });
      i += 1;
    }
  }

  return tokens;
}

// ——— STAGE 2 & 3: Context-state identifier extraction + collection ———
function extractIdentifiers(tokens) {
  const tableSet = new Set();
  const columnSet = new Set();
  const aliasSet = new Set();
  const schemaSet = new Set();
  const cteSet = new Set();

  let state = ParseState.NONE;
  let prevKeyword = null;
  let i = 0;

  const getValue = (t) => (t && (t.value != null) ? t.value : (t && t.raw) || '');

  while (i < tokens.length) {
    const t = tokens[i];
    const next = tokens[i + 1];
    const next2 = tokens[i + 2];
    const val = getValue(t);

    if (t.type === TokenType.KEYWORD) {
      prevKeyword = val;
      if (val === 'SELECT') state = ParseState.SELECT;
      else if (val === 'FROM') state = ParseState.FROM;
      else if (val === 'JOIN' || val === 'LEFT' || val === 'RIGHT' || val === 'INNER' || val === 'OUTER') state = ParseState.JOIN;
      else if (val === 'ON') state = ParseState.ON;
      else if (val === 'INSERT') state = ParseState.INSERT;
      else if (val === 'INTO') state = ParseState.INTO;
      else if (val === 'UPDATE') state = ParseState.UPDATE;
      else if (val === 'CREATE') state = ParseState.CREATE;
      else if (val === 'TABLE') state = ParseState.TABLE;
      else if (val === 'WHERE' || val === 'HAVING') state = ParseState.WHERE;
      else if (val === 'SET') state = ParseState.SET;
      else if (val === 'GROUP') state = ParseState.GROUP_BY;
      else if (val === 'ORDER') state = ParseState.ORDER_BY;
      else if (val === 'WITH') state = ParseState.WITH;
      else if (val === 'AS' && state === ParseState.WITH) state = ParseState.CTE_AS;
      else if (val === 'AS' && (state === ParseState.FROM || state === ParseState.JOIN || state === ParseState.SELECT)) {
        // alias: ... AS foo — next identifier is alias
        state = ParseState.NONE;
      }
      i += 1;
      continue;
    }

    if (t.type === TokenType.IDENTIFIER || t.type === TokenType.QUOTED_IDENTIFIER) {
      if (SQL_FUNCTIONS.has(val.toUpperCase())) {
        i += 1;
        continue;
      }
      const nextVal = next && getValue(next);
      const next2Val = next2 && getValue(next2);
      const isQualified = next && next.type === TokenType.SYMBOL && nextVal === '.' && next2 && (next2.type === TokenType.IDENTIFIER || next2.type === TokenType.QUOTED_IDENTIFIER);

      const leftPart = val;
      const rightPart = isQualified ? next2Val : '';

      if (state === ParseState.FROM || state === ParseState.JOIN || state === ParseState.INTO) {
        if (rightPart) {
          schemaSet.add(leftPart);
          tableSet.add(rightPart);
        } else {
          tableSet.add(val);
        }
        state = ParseState.NONE;
      } else if (state === ParseState.ON || state === ParseState.WHERE || state === ParseState.SET || state === ParseState.GROUP_BY || state === ParseState.ORDER_BY || state === ParseState.HAVING) {
        if (rightPart) {
          tableSet.add(leftPart);
          columnSet.add(rightPart);
        } else {
          columnSet.add(val);
        }
      } else if (state === ParseState.SELECT) {
        if (rightPart) {
          tableSet.add(leftPart);
          columnSet.add(rightPart);
        } else {
          columnSet.add(val);
        }
      } else if (state === ParseState.CREATE || state === ParseState.TABLE) {
        if (rightPart) {
          schemaSet.add(leftPart);
          tableSet.add(rightPart);
        } else {
          tableSet.add(val);
        }
        state = ParseState.NONE;
      } else if (state === ParseState.WITH) {
        cteSet.add(val);
        state = ParseState.NONE;
      } else if (state === ParseState.CTE_AS) {
        cteSet.add(val);
        state = ParseState.NONE;
      } else if (prevKeyword === 'AS') {
        aliasSet.add(val);
      } else if ((prevKeyword === 'FROM' || prevKeyword === 'JOIN') && !isQualified) {
        aliasSet.add(val);
      }

      if (isQualified) i += 2;
      i += 1;
      continue;
    }

    i += 1;
  }

  return { tableSet, columnSet, aliasSet, schemaSet, cteSet };
}

// ——— STAGE 4: Deterministic mapping generation ———
function buildMapping(tableSet, columnSet, aliasSet, schemaSet, cteSet) {
  const originalToDummy = new Map();
  const dummyToOriginal = new Map();
  const tableMap = new Map();
  const columnMap = new Map();
  const schemaMap = new Map();
  const aliasMap = new Map();

  let tCnt = 1, cCnt = 1, sCnt = 1, aCnt = 1;

  function add(kind, name) {
    if (!name || originalToDummy.has(name)) return;
    let dummy;
    if (kind === 'table' || kind === 'cte') {
      dummy = 'T_' + pad6(tCnt++);
      tableMap.set(name, dummy);
    } else if (kind === 'column') {
      dummy = 'C_' + pad6(cCnt++);
      columnMap.set(name, dummy);
    } else if (kind === 'schema') {
      dummy = 'S_' + pad6(sCnt++);
      schemaMap.set(name, dummy);
    } else {
      dummy = 'A_' + pad6(aCnt++);
      aliasMap.set(name, dummy);
    }
    originalToDummy.set(name, dummy);
    dummyToOriginal.set(dummy, name);
  }

  schemaSet.forEach((n) => add('schema', n));
  tableSet.forEach((n) => add('table', n));
  cteSet.forEach((n) => add('cte', n));
  columnSet.forEach((n) => add('column', n));
  aliasSet.forEach((n) => add('alias', n));

  return {
    originalToDummy,
    dummyToOriginal,
    tableMap,
    columnMap,
    schemaMap,
    aliasMap,
  };
}

function resolveQualified(originalToDummy, name) {
  const dot = name.indexOf('.');
  if (dot < 0) {
    return originalToDummy.get(name) || name;
  }
  const left = name.slice(0, dot);
  const right = name.slice(dot + 1);
  const dLeft = originalToDummy.get(left) || left;
  const dRight = originalToDummy.get(right) || right;
  return dLeft + '.' + dRight;
}

// ——— STAGE 5: Transformation engine (rebuild from tokens, no replaceAll) ———
function transform(tokens, originalToDummy) {
  const out = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (t.type === TokenType.IDENTIFIER || t.type === TokenType.QUOTED_IDENTIFIER) {
      const replacement = resolveQualified(originalToDummy, t.value);
      out.push(replacement);
    } else {
      out.push(t.raw);
    }
  }
  return out.join('');
}

// ——— STAGE 8: Reverse engine (token-based, longest-match safe) ———
function reverseTransform(tokens, dummyToOriginal) {
  const out = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (t.type === TokenType.IDENTIFIER || t.type === TokenType.QUOTED_IDENTIFIER) {
      const replacement = dummyToOriginal.get(t.value) || t.value;
      out.push(replacement);
    } else {
      out.push(t.raw);
    }
  }
  return out.join('');
}

// Restore: re-tokenize masked output (dummy names are plain identifiers), then reverse map.
// Sort keys by length descending so T_000011 is matched before T_00001.
function restore(maskedText, reverseMap) {
  if (!maskedText || !reverseMap) return maskedText;
  const tokens = tokenize(maskedText);
  const dummyToOriginal = new Map(Object.entries(reverseMap));
  return reverseTransform(tokens, dummyToOriginal);
}

// ——— Main MASK pipeline ———
function runMaskPipeline(input) {
  const tokens = tokenize(input);
  const { tableSet, columnSet, aliasSet, schemaSet, cteSet } = extractIdentifiers(tokens);
  const mapping = buildMapping(tableSet, columnSet, aliasSet, schemaSet, cteSet);
  const maskedQuery = transform(tokens, mapping.originalToDummy);

  const mappingExport = {
    version: '1.0',
    createdAt: new Date().toISOString(),
    tableMap: Object.fromEntries(mapping.tableMap.entries()),
    columnMap: Object.fromEntries(mapping.columnMap.entries()),
    schemaMap: Object.fromEntries(mapping.schemaMap.entries()),
    aliasMap: Object.fromEntries(mapping.aliasMap.entries()),
    globalMap: Object.fromEntries(mapping.originalToDummy.entries()),
    reverseMap: Object.fromEntries(mapping.dummyToOriginal.entries()),
  };

  const counts = {
    tables: mapping.tableMap.size,
    columns: mapping.columnMap.size,
    schemas: mapping.schemaMap.size,
    aliases: mapping.aliasMap.size,
    total: mapping.originalToDummy.size,
  };

  return {
    maskedQuery,
    mapping: mappingExport,
    counts,
  };
}

// ——— MODULE: Secure AI Prompt Compiler (structured schema → masked prompt) ———
// Input: { tables: [{ name, columns: [] }], instruction }
// Build registry → mapping → compile prompt template + mask instruction (word-boundary).

function buildMappingFromRegistry(tableSet, columnSet) {
  const aliasSet = new Set();
  const schemaSet = new Set();
  const cteSet = new Set();
  return buildMapping(tableSet, columnSet, aliasSet, schemaSet, cteSet);
}

function replaceIdentifiersInText(text, originalToDummy) {
  if (!text || !originalToDummy.size) return text;
  const keyByLower = new Map();
  originalToDummy.forEach(function (v, k) {
    keyByLower.set(k.toLowerCase(), v);
  });
  const words = text.split(/\b/g);
  const out = [];
  for (let i = 0; i < words.length; i += 1) {
    const w = words[i];
    const replacement = originalToDummy.get(w) ?? keyByLower.get(w.toLowerCase());
    out.push(replacement != null ? replacement : w);
  }
  return out.join('');
}

function runPromptCompiler(inputSchema) {
  const tableSet = new Set();
  const columnSet = new Set();
  if (!inputSchema.tables || !Array.isArray(inputSchema.tables)) {
    throw new Error('Invalid schema: tables array required');
  }
  for (const table of inputSchema.tables) {
    const tName = table.name && String(table.name).trim();
    if (tName) tableSet.add(tName);
    if (table.columns && Array.isArray(table.columns)) {
      for (const col of table.columns) {
        const c = col && String(col).trim();
        if (c) columnSet.add(c);
      }
    }
  }
  const mapping = buildMappingFromRegistry(tableSet, columnSet);
  const o2d = mapping.originalToDummy;

  const maskedTables = [];
  for (const table of inputSchema.tables) {
    const tName = table.name && String(table.name).trim();
    if (!tName) continue;
    const dummyTable = o2d.get(tName) || tName;
    const maskedCols = [];
    if (table.columns && Array.isArray(table.columns)) {
      for (const col of table.columns) {
        const c = col && String(col).trim();
        maskedCols.push(c ? (o2d.get(c) || c) : '');
      }
    }
    maskedTables.push({ table: dummyTable, columns: maskedCols });
  }

  const instruction = inputSchema.instruction ? String(inputSchema.instruction).trim() : '';
  const maskedInstruction = replaceIdentifiersInText(instruction, o2d);

  const joins = inputSchema.joins && Array.isArray(inputSchema.joins) ? inputSchema.joins : [];

  let prompt = 'You are an expert SQL developer.\n\nUse the following tables:\n\n';
  for (const { table, columns } of maskedTables) {
    prompt += `Table ${table}\nColumns:\n`;
    for (const c of columns) {
      if (c) prompt += `- ${c}\n`;
    }
    prompt += '\n';
  }
  if (joins.length > 0) {
    prompt += 'Joins (use these to connect tables in your query; use the specified join type):\n';
    for (const j of joins) {
      const joinType = (j.joinType && String(j.joinType).toUpperCase()) || 'LEFT';
      const leftT = o2d.get(j.leftTable) || j.leftTable;
      const leftC = o2d.get(j.leftColumn) || j.leftColumn;
      const rightT = o2d.get(j.rightTable) || j.rightTable;
      const rightC = o2d.get(j.rightColumn) || j.rightColumn;
      prompt += `- ${joinType} JOIN: ${leftT}.${leftC} = ${rightT}.${rightC}\n`;
    }
    prompt += '\n';
  }
  prompt += 'Instruction:\n';
  prompt += maskedInstruction || '(No instruction provided.)';
  prompt += '\n\nReturn SQL query only.';

  const mappingExport = {
    version: '1.0',
    createdAt: new Date().toISOString(),
    tableMap: Object.fromEntries(mapping.tableMap.entries()),
    columnMap: Object.fromEntries(mapping.columnMap.entries()),
    schemaMap: Object.fromEntries(mapping.schemaMap.entries()),
    aliasMap: Object.fromEntries(mapping.aliasMap.entries()),
    globalMap: Object.fromEntries(mapping.originalToDummy.entries()),
    reverseMap: Object.fromEntries(mapping.dummyToOriginal.entries()),
  };

  return {
    maskedPrompt: prompt,
    mapping: mappingExport,
    identifierCount: mapping.originalToDummy.size,
  };
}

// ——— Worker message handler ———
self.onmessage = function (e) {
  const data = e.data;
  if (!data || !data.type) return;

  try {
    if (data.type === 'MASK') {
      const { input } = data.payload;
      const { maskedQuery, mapping, counts } = runMaskPipeline(input);
      self.postMessage({
        type: 'MASK_RESULT',
        payload: {
          masked: maskedQuery,
          mapping,
          identifierCount: counts.total,
        },
      });
      return;
    }
    if (data.type === 'GENERATE_PROMPT') {
      const { tables, instruction, joins } = data.payload;
      const { maskedPrompt, mapping, identifierCount } = runPromptCompiler({ tables, instruction, joins });
      self.postMessage({
        type: 'PROMPT_RESULT',
        payload: {
          masked: maskedPrompt,
          mapping,
          identifierCount,
        },
      });
      return;
    }
    if (data.type === 'RESTORE') {
      const { masked, reverseMap } = data.payload;
      const restored = restore(masked, reverseMap);
      self.postMessage({
        type: 'RESTORE_RESULT',
        payload: { restored },
      });
      return;
    }
  } catch (err) {
    self.postMessage({
      type: 'ERROR',
      error: (err && err.message) ? err.message : 'Unknown error',
    });
  }
};
