/**
 * Tool Catalog — single source of truth for every tool on the site.
 *
 * `tags` drive "Related Tools" matching: tools that share the most tags
 * with the active tool are shown as suggestions on that tool's page.
 *
 * Keep tags broad enough to produce 4–8 useful matches per tool.
 */

export interface ToolMeta {
  toolName: string;   // matches the toolName prop in ToolPageShell
  href: string;
  label: string;
  emoji: string;
  shortDesc: string;
  tags: string[];
}

export const TOOL_CATALOG: ToolMeta[] = [
  // ── JSON ────────────────────────────────────────────────────────────────
  {
    toolName: 'json_formatter',
    href: '/json-formatter',
    label: 'JSON Formatter',
    emoji: '✨',
    shortDesc: 'Beautify & format JSON',
    tags: ['json', 'format', 'beautify', 'validate'],
  },
  {
    toolName: 'json_beautifier',
    href: '/json-beautifier',
    label: 'JSON Beautifier',
    emoji: '🎨',
    shortDesc: 'Indent & prettify JSON',
    tags: ['json', 'format', 'beautify', 'validate'],
  },
  {
    toolName: 'json_validator',
    href: '/json-validator',
    label: 'JSON Validator',
    emoji: '✅',
    shortDesc: 'Validate JSON syntax',
    tags: ['json', 'validate', 'format'],
  },
  {
    toolName: 'json_error_explainer',
    href: '/json-error-explainer',
    label: 'AI JSON Fixer',
    emoji: '🤖',
    shortDesc: 'AI-powered JSON error fix',
    tags: ['json', 'ai', 'fix', 'validate', 'error'],
  },
  {
    toolName: 'json_fixer',
    href: '/json-fixer-online',
    label: 'JSON Fixer',
    emoji: '🔧',
    shortDesc: 'Auto-repair broken JSON',
    tags: ['json', 'fix', 'error', 'validate'],
  },
  {
    toolName: 'json_comparator',
    href: '/json-comparator',
    label: 'JSON Comparator',
    emoji: '🔍',
    shortDesc: 'Diff two JSON objects',
    tags: ['json', 'diff', 'compare', 'format'],
  },
  {
    toolName: 'json_builder',
    href: '/json-builder',
    label: 'JSON Builder',
    emoji: '🏗️',
    shortDesc: 'Build JSON visually',
    tags: ['json', 'build', 'format'],
  },
  {
    toolName: 'json_to_typescript',
    href: '/json-to-typescript',
    label: 'JSON → TypeScript',
    emoji: '🔷',
    shortDesc: 'Generate TS types from JSON',
    tags: ['json', 'typescript', 'convert', 'schema'],
  },
  {
    toolName: 'json_schema_generation',
    href: '/json-schema-generation',
    label: 'JSON Schema Gen',
    emoji: '📐',
    shortDesc: 'Generate JSON Schema',
    tags: ['json', 'schema', 'validate', 'typescript'],
  },
  {
    toolName: 'json_stringify_online',
    href: '/json-stringify-online',
    label: 'JSON Stringify',
    emoji: '📝',
    shortDesc: 'Stringify & escape JSON',
    tags: ['json', 'format', 'encode'],
  },
  {
    toolName: 'json_to_excel',
    href: '/json-to-excel',
    label: 'JSON → Excel',
    emoji: '📊',
    shortDesc: 'Export JSON to Excel',
    tags: ['json', 'convert', 'export'],
  },
  {
    toolName: 'json_prompt_shield',
    href: '/json-prompt-shield',
    label: 'JSON Prompt Shield',
    emoji: '🛡️',
    shortDesc: 'Sanitize LLM JSON output',
    tags: ['json', 'ai', 'security', 'fix'],
  },
  {
    toolName: 'fix_expected_comma_or_brace_json',
    href: '/fix-expected-comma-or-brace-json',
    label: 'Fix JSON Comma/Brace',
    emoji: '🩹',
    shortDesc: 'Fix comma/brace JSON errors',
    tags: ['json', 'fix', 'error', 'validate'],
  },
  {
    toolName: 'fix_invalid_control_character_json',
    href: '/fix-invalid-control-character-json',
    label: 'Fix Control Char JSON',
    emoji: '🩹',
    shortDesc: 'Fix invalid control chars',
    tags: ['json', 'fix', 'error'],
  },
  {
    toolName: 'fix_json_parse_error_javascript',
    href: '/fix-json-parse-error-javascript',
    label: 'Fix JSON Parse Error',
    emoji: '🩹',
    shortDesc: 'Fix JS JSON.parse errors',
    tags: ['json', 'fix', 'error', 'javascript'],
  },
  {
    toolName: 'fix_unexpected_end_of_json_input',
    href: '/fix-unexpected-end-of-json-input',
    label: 'Fix Unexpected End JSON',
    emoji: '🩹',
    shortDesc: 'Fix truncated JSON errors',
    tags: ['json', 'fix', 'error'],
  },
  {
    toolName: 'how_to_fix_broken_json',
    href: '/how-to-fix-broken-json-online',
    label: 'Fix Broken JSON',
    emoji: '🔧',
    shortDesc: 'Repair broken JSON online',
    tags: ['json', 'fix', 'error', 'validate'],
  },
  {
    toolName: 'json_escape_characters',
    href: '/json-escape-characters',
    label: 'JSON Escape',
    emoji: '↩️',
    shortDesc: 'Escape/unescape JSON strings',
    tags: ['json', 'encode', 'format'],
  },

  // ── cURL / API ───────────────────────────────────────────────────────────
  {
    toolName: 'curl_converter',
    href: '/curl-converter',
    label: 'cURL Converter',
    emoji: '⚡',
    shortDesc: 'Convert cURL to code',
    tags: ['curl', 'api', 'convert', 'http'],
  },
  {
    toolName: 'har_to_curl',
    href: '/har-to-curl',
    label: 'HAR → cURL',
    emoji: '📡',
    shortDesc: 'Convert HAR files to cURL',
    tags: ['curl', 'api', 'convert', 'http'],
  },
  {
    toolName: 'curl_to_requests',
    href: '/curl-to-requests',
    label: 'cURL → Python',
    emoji: '🐍',
    shortDesc: 'cURL to Python requests',
    tags: ['curl', 'api', 'convert', 'python'],
  },
  {
    toolName: 'convert_curl_to_http',
    href: '/convert-curl-to-http-request',
    label: 'cURL → HTTP',
    emoji: '🌐',
    shortDesc: 'Convert cURL to HTTP request',
    tags: ['curl', 'api', 'convert', 'http'],
  },
  {
    toolName: 'curl_failure_root_cause_engine',
    href: '/curl-failure-root-cause-engine',
    label: 'cURL Error Fixer',
    emoji: '🔍',
    shortDesc: 'AI diagnose cURL failures',
    tags: ['curl', 'api', 'ai', 'error', 'fix'],
  },
  {
    toolName: 'api_comparator',
    href: '/api-comparator',
    label: 'API Comparator',
    emoji: '⚖️',
    shortDesc: 'Compare API responses',
    tags: ['api', 'compare', 'diff', 'http'],
  },
  {
    toolName: 'http_headers_analyzer',
    href: '/http-headers-analyzer',
    label: 'HTTP Headers Analyzer',
    emoji: '📋',
    shortDesc: 'Analyze HTTP response headers',
    tags: ['api', 'http', 'analyze', 'security'],
  },
  {
    toolName: 'cors_tester',
    href: '/cors-tester',
    label: 'CORS Tester',
    emoji: '🌍',
    shortDesc: 'Test CORS configuration',
    tags: ['api', 'http', 'security', 'cors'],
  },
  {
    toolName: 'mock_api_generator',
    href: '/mock-api-generator',
    label: 'Mock API Generator',
    emoji: '🎭',
    shortDesc: 'Generate mock API responses',
    tags: ['api', 'json', 'test', 'build'],
  },
  {
    toolName: 'payload_analyzer',
    href: '/payload-analyzer',
    label: 'Payload Analyzer',
    emoji: '🔬',
    shortDesc: 'Analyze API payloads',
    tags: ['api', 'json', 'analyze', 'http'],
  },
  {
    toolName: 'config_comparator',
    href: '/config-comparator',
    label: 'Config Comparator',
    emoji: '📂',
    shortDesc: 'Diff config files',
    tags: ['compare', 'diff', 'config', 'json'],
  },

  // ── JWT / Auth ───────────────────────────────────────────────────────────
  {
    toolName: 'jwt_decoder',
    href: '/jwt-decoder',
    label: 'JWT Decoder',
    emoji: '🔑',
    shortDesc: 'Decode & inspect JWTs',
    tags: ['jwt', 'auth', 'token', 'decode', 'security'],
  },
  {
    toolName: 'token_comparator',
    href: '/token-comparator',
    label: 'Token Comparator',
    emoji: '🆚',
    shortDesc: 'Compare two tokens',
    tags: ['jwt', 'token', 'auth', 'compare'],
  },
  {
    toolName: 'hash_generator',
    href: '/hash-generator',
    label: 'Hash Generator',
    emoji: '#️⃣',
    shortDesc: 'MD5, SHA-256, bcrypt hashes',
    tags: ['security', 'encode', 'auth', 'hash'],
  },
  {
    toolName: 'password_generator',
    href: '/password-generator',
    label: 'Password Generator',
    emoji: '🔐',
    shortDesc: 'Generate secure passwords',
    tags: ['security', 'auth', 'password'],
  },
  {
    toolName: 'password_audit',
    href: '/password-audit',
    label: 'Password Audit',
    emoji: '🕵️',
    shortDesc: 'Audit password strength',
    tags: ['security', 'auth', 'password'],
  },

  // ── SQL ──────────────────────────────────────────────────────────────────
  {
    toolName: 'sql_formatter',
    href: '/sql-formatter',
    label: 'SQL Formatter',
    emoji: '🗃️',
    shortDesc: 'Beautify SQL queries',
    tags: ['sql', 'format', 'database'],
  },
  {
    toolName: 'sql_in_clause_generator',
    href: '/sql-in-clause-generator',
    label: 'SQL IN Generator',
    emoji: '📋',
    shortDesc: 'Generate SQL IN() lists',
    tags: ['sql', 'database', 'build'],
  },

  // ── Encoding ─────────────────────────────────────────────────────────────
  {
    toolName: 'base64_encoder',
    href: '/base64-encoder',
    label: 'Base64 Encoder',
    emoji: '🔤',
    shortDesc: 'Encode & decode Base64',
    tags: ['encode', 'decode', 'convert'],
  },
  {
    toolName: 'url_encoder',
    href: '/url-encoder',
    label: 'URL Encoder',
    emoji: '🔗',
    shortDesc: 'Encode & decode URLs',
    tags: ['encode', 'decode', 'url', 'convert'],
  },
  {
    toolName: 'image_to_base64',
    href: '/image-to-base64',
    label: 'Image → Base64',
    emoji: '🖼️',
    shortDesc: 'Convert images to Base64',
    tags: ['encode', 'image', 'convert'],
  },

  // ── Dev Utilities ─────────────────────────────────────────────────────────
  {
    toolName: 'regex_tester',
    href: '/regex-tester',
    label: 'Regex Tester',
    emoji: '🎯',
    shortDesc: 'Test & debug regex patterns',
    tags: ['dev', 'text', 'test'],
  },
  {
    toolName: 'timestamp_converter',
    href: '/timestamp-converter',
    label: 'Timestamp Converter',
    emoji: '⏱️',
    shortDesc: 'Convert Unix timestamps',
    tags: ['dev', 'time', 'convert'],
  },
  {
    toolName: 'timezone_translator',
    href: '/timezone-translator',
    label: 'Timezone Translator',
    emoji: '🌏',
    shortDesc: 'Translate between timezones',
    tags: ['dev', 'time', 'convert'],
  },
  {
    toolName: 'uuid_generator',
    href: '/uuid-generator',
    label: 'UUID Generator',
    emoji: '🆔',
    shortDesc: 'Generate v4 UUIDs',
    tags: ['dev', 'generate', 'id'],
  },
  {
    toolName: 'cron_expression',
    href: '/cron-expression',
    label: 'Cron Expression',
    emoji: '⏰',
    shortDesc: 'Build & decode cron jobs',
    tags: ['dev', 'time', 'schedule'],
  },
  {
    toolName: 'text_diff',
    href: '/text-diff',
    label: 'Text Diff',
    emoji: '📄',
    shortDesc: 'Diff two text blocks',
    tags: ['diff', 'compare', 'text', 'dev'],
  },
  {
    toolName: 'markdown_preview',
    href: '/markdown-preview',
    label: 'Markdown Preview',
    emoji: '📝',
    shortDesc: 'Preview Markdown live',
    tags: ['text', 'dev', 'format'],
  },
  {
    toolName: 'string_utilities',
    href: '/string-utilities',
    label: 'String Utilities',
    emoji: '🔠',
    shortDesc: 'Transform & manipulate strings',
    tags: ['text', 'dev', 'convert'],
  },

  // ── HTML / CSS ───────────────────────────────────────────────────────────
  {
    toolName: 'html_formatter',
    href: '/html-formatter',
    label: 'HTML Formatter',
    emoji: '🌐',
    shortDesc: 'Beautify HTML code',
    tags: ['html', 'format', 'css', 'dev'],
  },
  {
    toolName: 'html_viewer',
    href: '/html-viewer',
    label: 'HTML Viewer',
    emoji: '👁️',
    shortDesc: 'Preview HTML in browser',
    tags: ['html', 'preview', 'css', 'dev'],
  },
  {
    toolName: 'css_box_shadow',
    href: '/css-box-shadow',
    label: 'CSS Box Shadow',
    emoji: '🎨',
    shortDesc: 'Generate CSS box shadows',
    tags: ['css', 'design', 'generate', 'html'],
  },
  {
    toolName: 'css_gradient_generator',
    href: '/css-gradient-generator',
    label: 'CSS Gradient',
    emoji: '🌈',
    shortDesc: 'Build CSS gradients visually',
    tags: ['css', 'design', 'generate', 'html'],
  },
  {
    toolName: 'color_picker',
    href: '/color-picker',
    label: 'Color Picker',
    emoji: '🎨',
    shortDesc: 'Pick & convert colors',
    tags: ['css', 'design', 'color', 'convert'],
  },

  // ── AI / Log ─────────────────────────────────────────────────────────────
  {
    toolName: 'data_insights',
    href: '/data-insights',
    label: 'Data Insights',
    emoji: '📊',
    shortDesc: 'AI insights from data',
    tags: ['ai', 'data', 'analyze'],
  },
  {
    toolName: 'ai_schema_masker',
    href: '/ai-schema-masker',
    label: 'AI Schema Masker',
    emoji: '🤖',
    shortDesc: 'Mask sensitive data fields',
    tags: ['ai', 'json', 'security', 'schema'],
  },
  {
    toolName: 'code_prompt_shield',
    href: '/code-prompt-shield',
    label: 'Prompt Shield',
    emoji: '🛡️',
    shortDesc: 'Detect prompt injections',
    tags: ['ai', 'security', 'prompt'],
  },
  {
    toolName: 'log_explorer',
    href: '/log-explorer',
    label: 'Log Explorer',
    emoji: '🔭',
    shortDesc: 'Parse & search logs',
    tags: ['ai', 'log', 'analyze', 'dev'],
  },
  {
    toolName: 'log_unpacker',
    href: '/log-unpacker',
    label: 'Log Unpacker',
    emoji: '📦',
    shortDesc: 'Decompress & decode logs',
    tags: ['log', 'decode', 'dev', 'analyze'],
  },
  {
    toolName: 'prompt_chunker',
    href: '/prompt-chunker',
    label: 'Prompt Chunker',
    emoji: '✂️',
    shortDesc: 'Split prompts by token count',
    tags: ['ai', 'text', 'llm'],
  },
  {
    toolName: 'test_data_generator',
    href: '/test-data-generator',
    label: 'Test Data Generator',
    emoji: '🎲',
    shortDesc: 'Generate realistic test data',
    tags: ['ai', 'json', 'test', 'generate'],
  },
];

/** Build a fast lookup map by toolName */
export const TOOL_MAP = new Map<string, ToolMeta>(
  TOOL_CATALOG.map((t) => [t.toolName, t]),
);

/**
 * Return up to `limit` tools that are "most related" to the given toolName,
 * ranked by number of shared tags, excluding the tool itself.
 */
export function getRelatedTools(toolName: string, limit = 5): ToolMeta[] {
  const active = TOOL_MAP.get(toolName);
  if (!active) return [];

  const activeTags = new Set(active.tags);

  return TOOL_CATALOG
    .filter((t) => t.toolName !== toolName)
    .map((t) => ({
      tool: t,
      score: t.tags.filter((tag) => activeTags.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tool }) => tool);
}
