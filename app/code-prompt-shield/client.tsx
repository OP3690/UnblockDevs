'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Shield, Lock, Copy, Download, Upload, RefreshCw,
  Code2, ChevronDown, ChevronUp, AlertTriangle, FileJson,
  Eye, Search, Settings, Zap, CheckCircle2, XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trackCopy, trackCtaClick } from '@/lib/analytics';

// ─── Languages ────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python',     name: 'Python' },
  { id: 'java',       name: 'Java' },
  { id: 'go',         name: 'Go' },
  { id: 'sql',        name: 'SQL' },
  { id: 'json',       name: 'JSON' },
  { id: 'csharp',     name: 'C#' },
  { id: 'php',        name: 'PHP' },
  { id: 'rust',       name: 'Rust' },
  { id: 'ruby',       name: 'Ruby' },
  { id: 'swift',      name: 'Swift' },
  { id: 'kotlin',     name: 'Kotlin' },
  { id: 'bash',       name: 'Bash / Shell' },
  { id: 'yaml',       name: 'YAML' },
  { id: 'toml',       name: 'TOML' },
  { id: 'cpp',        name: 'C / C++' },
  { id: 'xml',        name: 'XML / HTML' },
] as const;

type LangId = (typeof LANGUAGES)[number]['id'];

// ─── Keyword sets ─────────────────────────────────────────────────────────────
const JS_TS_KEYWORDS = new Set([
  'function','const','let','var','if','else','return','for','while','do','switch','case',
  'break','continue','try','catch','finally','throw','new','typeof','instanceof','in','of',
  'async','await','class','extends','import','export','default','from','true','false','null',
  'undefined','this','super','static','get','set','delete','void','yield','interface','type',
  'enum','implements','private','protected','public','abstract','constructor','as','is',
  'keyof','readonly','namespace','declare','module','require','Promise','console','Array',
  'Object','String','Number','Boolean','Map','Set','Error','JSON','Math',
]);

const PYTHON_KEYWORDS = new Set([
  'def','class','if','else','elif','for','while','return','import','from','as','try',
  'except','finally','with','lambda','and','or','not','in','is','None','True','False',
  'pass','break','continue','yield','raise','assert','global','nonlocal','async','await',
  'match','case','print','len','range','type','str','int','float','list','dict','set',
  'tuple','bool','open','self','super',
]);

const SQL_KEYWORDS = new Set([
  'select','from','where','join','inner','left','right','outer','cross','on','and','or','not',
  'in','insert','into','values','update','set','delete','create','table','index','order','group',
  'by','having','limit','offset','as','null','true','false','between','like','exists','union',
  'all','distinct','asc','desc','primary','key','foreign','references','constraint','default',
  'check','unique','drop','alter','add','column','with','recursive','case','when','then','end',
  'count','sum','avg','min','max','coalesce','cast','over','partition','rows','range','preceding',
  'following','current','row','unbounded','truncate','schema','view','trigger','procedure',
  'function','returns','begin','commit','rollback','transaction',
]);

const JAVA_KEYWORDS = new Set([
  'public','private','protected','class','interface','extends','implements','static','final',
  'abstract','void','int','long','double','float','boolean','char','byte','short','String',
  'new','return','if','else','for','while','do','switch','case','break','continue','try',
  'catch','finally','throw','throws','import','package','this','super','null','true','false',
  'instanceof','enum','record','var','sealed','permits','List','Map','Set','Optional',
]);

const GO_KEYWORDS = new Set([
  'func','var','const','type','struct','interface','map','chan','go','defer','select','case',
  'default','break','continue','return','if','else','for','range','import','package','make',
  'new','len','cap','append','copy','delete','close','panic','recover','nil','true','false',
  'string','int','int8','int16','int32','int64','uint','uint8','uint16','uint32','uint64',
  'float32','float64','bool','byte','rune','error',
]);

const RUBY_KEYWORDS = new Set([
  'def','class','module','if','else','elsif','unless','while','until','for','do','end',
  'return','require','require_relative','include','extend','nil','true','false','self',
  'super','begin','rescue','ensure','raise','yield','lambda','proc','puts','print','gets',
  'attr_accessor','attr_reader','attr_writer','new','initialize','public','private',
  'protected','then','and','or','not','in','when','case','each','map','select','reject',
]);

const SWIFT_KEYWORDS = new Set([
  'func','var','let','class','struct','enum','protocol','extension','if','else','guard',
  'switch','case','for','while','return','import','init','deinit','override','super','self',
  'true','false','nil','async','await','throws','do','try','catch','in','is','as','where',
  'typealias','associatedtype','open','public','internal','fileprivate','private','final',
  'mutating','lazy','static','weak','unowned','optional','some','any','print',
]);

const KOTLIN_KEYWORDS = new Set([
  'fun','val','var','class','object','interface','if','else','when','for','while','do',
  'return','import','package','in','out','is','as','null','true','false','this','super',
  'init','constructor','override','private','protected','public','internal','companion',
  'data','sealed','abstract','open','final','suspend','by','get','set','it','lazy',
  'inline','reified','crossinline','noinline','break','continue','throw','try','catch',
  'finally','typealias','object','Unit','String','Int','Long','Double','Float','Boolean',
]);

const BASH_KEYWORDS = new Set([
  'if','then','else','elif','fi','for','while','do','done','case','esac','function',
  'return','in','export','local','read','echo','printf','source','exit','break','continue',
  'shift','set','unset','true','false','test','select','until','declare','readonly',
  'trap','wait','kill','jobs','bg','fg','pwd','cd','ls','mkdir','rm','cp','mv','cat',
  'grep','sed','awk','cut','sort','uniq','wc','head','tail','find','xargs','curl','wget',
]);

const CPP_KEYWORDS = new Set([
  'int','void','char','float','double','long','short','unsigned','signed','bool','struct',
  'class','enum','union','typedef','if','else','for','while','do','switch','case','break',
  'continue','return','goto','const','static','extern','inline','virtual','override',
  'public','private','protected','new','delete','nullptr','null','true','false','template',
  'typename','namespace','using','auto','decltype','this','size_t','string','vector','map',
  'set','include','define','pragma','ifdef','ifndef','endif','operator','friend','explicit',
  'constexpr','mutable','volatile','register','try','catch','throw','noexcept',
]);

const CSHARP_KEYWORDS = new Set([
  'public','private','protected','internal','static','class','interface','struct','enum',
  'abstract','virtual','override','sealed','readonly','const','void','int','long','double',
  'float','bool','char','string','object','var','new','return','if','else','for','foreach',
  'while','do','switch','case','break','continue','try','catch','finally','throw','using',
  'namespace','this','base','null','true','false','async','await','yield','delegate','event',
  'get','set','value','in','out','ref','params','List','Dictionary','IEnumerable','Task',
]);

const COMMON_KEYWORDS = new Set([
  'int','string','bool','void','null','true','false','new','return','import','public',
  'private','protected','if','else','for','while','class','function','const','var',
]);

function getKeywords(lang: LangId): Set<string> {
  switch (lang) {
    case 'python':    return PYTHON_KEYWORDS;
    case 'javascript':
    case 'typescript': return JS_TS_KEYWORDS;
    case 'sql':       return SQL_KEYWORDS;
    case 'java':      return JAVA_KEYWORDS;
    case 'go':        return GO_KEYWORDS;
    case 'ruby':      return RUBY_KEYWORDS;
    case 'swift':     return SWIFT_KEYWORDS;
    case 'kotlin':    return KOTLIN_KEYWORDS;
    case 'bash':      return BASH_KEYWORDS;
    case 'cpp':       return CPP_KEYWORDS;
    case 'csharp':    return CSHARP_KEYWORDS;
    case 'json':      return new Set();
    case 'yaml':
    case 'toml':      return new Set(['true','false','null','yes','no','on','off']);
    default:          return COMMON_KEYWORDS;
  }
}

// ─── Hashing ──────────────────────────────────────────────────────────────────
function deterministicHash(str: string, prefix: string): string {
  let h = 0;
  const s = prefix + str;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  const hex = Math.abs(h).toString(36).slice(0, 4);
  return hex.toUpperCase().replace(/\d/g, (d) => String.fromCharCode(65 + parseInt(d, 10)));
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CodeShieldMapping {
  version: string;
  language: LangId;
  createdAt: string;
  maskIdentifiers: boolean;
  maskSecrets: boolean;
  maskPII: boolean;
  map: Record<string, string>;
  reverseMap: Record<string, string>;
}

export type ScanItem = {
  category: 'secret' | 'pii' | 'schema' | 'identifier';
  label: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  count: number;
};

export type RiskItem = { type: string; label: string };

// ─── Strip comments ───────────────────────────────────────────────────────────
function stripCodeComments(source: string, language: LangId): string {
  let result = source;
  const cStyleLangs: LangId[] = ['javascript','typescript','java','csharp','php','rust','go','cpp','kotlin','swift'];
  const hashLangs: LangId[] = ['python','ruby','bash','yaml'];

  if (cStyleLangs.includes(language)) {
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    result = result.replace(/\/\/[^\n]*/g, '');
  } else if (hashLangs.includes(language)) {
    result = result.replace(/#[^\n]*/g, '');
  } else if (language === 'sql') {
    result = result.replace(/--[^\n]*/g, '');
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  return result.replace(/^\s*\n/gm, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ─── Ensurer ──────────────────────────────────────────────────────────────────
function ensureMask(
  original: string,
  prefix: string,
  map: Record<string, string>,
  reverseMap: Record<string, string>,
  counterByPrefix: Record<string, number>,
): string {
  if (reverseMap[original]) return reverseMap[original];
  const n = (counterByPrefix[prefix] ?? 0) + 1;
  counterByPrefix[prefix] = n;
  const suffix = deterministicHash(original, prefix) + (n > 1 ? String(n) : '');
  const masked = `${prefix}_${suffix}`;
  map[masked] = original;
  reverseMap[original] = masked;
  return masked;
}

// ─── Core mask function ───────────────────────────────────────────────────────
function maskCode(
  source: string,
  language: LangId,
  options: {
    maskIdentifiers: boolean;
    maskSecrets: boolean;
    maskPII: boolean;
    stripComments: boolean;
    customPatterns: string;
  },
): { masked: string; mapping: CodeShieldMapping } {
  const keywords = getKeywords(language);
  const map: Record<string, string> = {};
  const reverseMap: Record<string, string> = {};
  const counterByPrefix: Record<string, number> = {};
  const ensure = (original: string, prefix: string) =>
    ensureMask(original, prefix, map, reverseMap, counterByPrefix);

  let result = options.stripComments ? stripCodeComments(source, language) : source;

  // Build custom regex list
  const customRegexes: RegExp[] = [];
  if (options.customPatterns.trim()) {
    for (const line of options.customPatterns.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        customRegexes.push(new RegExp(trimmed, 'gi'));
      } catch {
        // Invalid regex — skip
      }
    }
  }

  const stringLiteralRegex = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;

  const secretPatterns: RegExp[] = [
    /api[_-]?key|secret|password|token|bearer|auth[_-]?token|credential|private[_-]?key|connection[_-]?string|access[_-]?key|client[_-]?secret|webhook[_-]?secret/i,
    /postgres:\/\//i,
    /mysql:\/\//i,
    /mongodb(\+srv)?:\/\//i,
    /redis:\/\//i,
    /amqp:\/\//i,
    /sk-[a-zA-Z0-9]{20,}|pk_[a-zA-Z0-9]+/i,
    /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/i,
    /AKIA[0-9A-Z]{16}/i,
    /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i,
    /ghp_[a-zA-Z0-9]{36}/i,          // GitHub PAT
    /gho_[a-zA-Z0-9]{36}/i,          // GitHub OAuth token
    /glpat-[a-zA-Z0-9_-]{20}/i,      // GitLab PAT
    /npm_[a-zA-Z0-9]{36}/i,          // npm token
    /xox[baprs]-[a-zA-Z0-9-]+/i,     // Slack token
    /sq0atp-[a-zA-Z0-9_-]{22}/i,     // Square OAuth token
    /AIza[0-9A-Za-z_-]{35}/i,        // Google API key
    /[0-9a-f]{32}-us[0-9]{1,2}/i,    // Mailchimp API key
    ...customRegexes,
  ];

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const piiPhone   = /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g;
  const ipRegex    = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
  const creditCard = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b/g;

  // ── Stage 1: mask string literals (secrets + PII) ──
  if (options.maskSecrets || options.maskPII) {
    stringLiteralRegex.lastIndex = 0;
    result = result.replace(stringLiteralRegex, (match) => {
      const quote = match[0];
      const inner = match.slice(1, -1);
      const unescaped = inner.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`');

      if (options.maskPII) {
        emailRegex.lastIndex = 0;
        piiPhone.lastIndex = 0;
        ipRegex.lastIndex = 0;
        creditCard.lastIndex = 0;
        if (emailRegex.test(unescaped))  return quote + ensure(unescaped, 'PII') + quote;
        if (piiPhone.test(unescaped))    return quote + ensure(unescaped, 'PII') + quote;
        if (creditCard.test(unescaped))  return quote + ensure(unescaped, 'PII') + quote;
      }
      if (options.maskPII && ipRegex.test(unescaped)) {
        return quote + ensure(unescaped, 'PII') + quote;
      }
      if (options.maskSecrets && secretPatterns.some((p) => { p.lastIndex = 0; return p.test(inner) || p.test(match); })) {
        return quote + ensure(unescaped, 'SECRET') + quote;
      }
      return match;
    });
  }

  // ── Stage 2: mask inline secret variable assignments ──
  if (options.maskSecrets) {
    // e.g. const API_KEY = "abc123" — mask the value even if it's not in quotes
    result = result.replace(
      /\b(api[_-]?key|secret|password|token|bearer|credential|private[_-]?key)\s*(?:=|:)\s*([a-zA-Z0-9_\-./+]{16,})/gi,
      (_, varname, value) => `${varname} = ${ensure(value, 'SECRET')}`,
    );
  }

  // ── Stage 3: language-specific identifier masking ──
  if (language === 'sql' && options.maskIdentifiers) {
    result = result.replace(/\b(FROM|JOIN|INTO|UPDATE|TABLE)\s+([a-zA-Z_][a-zA-Z0-9_.]*)/gi, (_, kw, id) => {
      if (SQL_KEYWORDS.has(id.toLowerCase())) return _;
      if (id.includes('.')) {
        const parts = id.split('.');
        return kw + ' ' + parts.map((p: string) => SQL_KEYWORDS.has(p.toLowerCase()) ? p : ensure(p, 'TABLE')).join('.');
      }
      return kw + ' ' + ensure(id, 'TABLE');
    });
    result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (word) => {
      if (reverseMap[word]) return reverseMap[word];
      if (SQL_KEYWORDS.has(word.toLowerCase())) return word;
      if (/^\d+$/.test(word)) return word;
      return ensure(word, 'COL');
    });

  } else if (language === 'json' && options.maskIdentifiers) {
    result = result.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"\s*:/g, (match, key) => {
      const unescaped = key.replace(/\\"/g, '"');
      if (/^\s*$/.test(unescaped)) return match;
      return `"${ensure(unescaped, 'KEY')}" :`;
    });

  } else if (language === 'yaml' && options.maskIdentifiers) {
    const yamlSpecial = new Set(['true','false','null','yes','no','on','off']);
    result = result.replace(/^(\s*)([a-zA-Z_][a-zA-Z0-9_-]*)(\s*:)/gm, (match, indent, key, colon) => {
      if (yamlSpecial.has(key.toLowerCase())) return match;
      return indent + ensure(key, 'KEY') + colon;
    });

  } else if (language === 'toml' && options.maskIdentifiers) {
    result = result.replace(/^(\s*)([a-zA-Z_][a-zA-Z0-9_.-]*)(\s*=)/gm, (_, indent, key, eq) => {
      return indent + ensure(key, 'KEY') + eq;
    });
    result = result.replace(/^\[([a-zA-Z_][a-zA-Z0-9_.]*)\]/gm, (_, section) => {
      return '[' + ensure(section, 'SEC') + ']';
    });

  } else if (language === 'xml' && options.maskIdentifiers) {
    const commonHtmlTags = new Set([
      'html','head','body','div','span','p','a','img','input','button','form','table','tr','td',
      'th','ul','ol','li','h1','h2','h3','h4','h5','h6','section','article','header','footer',
      'nav','main','aside','script','style','link','meta','title','br','hr','em','strong','b',
      'i','u','code','pre','select','option','textarea','label','svg','path','rect','circle',
      'g','defs','use','figure','figcaption','blockquote','cite','mark','small','sub','sup',
    ]);
    result = result.replace(/<\/?([a-zA-Z][a-zA-Z0-9_:-]*)/g, (match, tag) => {
      if (commonHtmlTags.has(tag.toLowerCase())) return match;
      const isClosing = match.startsWith('</');
      const masked = ensure(tag, 'TAG');
      return (isClosing ? '</' : '<') + masked;
    });
    // Mask attribute names
    result = result.replace(/\s([a-zA-Z_][a-zA-Z0-9_:-]*)(?=\s*=)/g, (match, attr) => {
      const commonAttrs = new Set(['class','id','style','href','src','alt','type','name','value',
        'placeholder','disabled','checked','selected','required','readonly','data','action',
        'method','target','rel','xmlns','version','encoding','lang','dir']);
      if (commonAttrs.has(attr.toLowerCase())) return match;
      return ' ' + ensure(attr, 'ATTR');
    });

  } else if (language === 'bash' && options.maskIdentifiers) {
    // Mask variable assignments: MY_VAR="value" or MY_VAR=value
    result = result.replace(/\b([A-Z_][A-Z0-9_]{2,})\s*=/g, (match, varname) => {
      if (BASH_KEYWORDS.has(varname.toLowerCase())) return match;
      return ensure(varname, 'VAR') + '=';
    });
    // Mask function names: function myfunc() or myfunc()
    result = result.replace(/\bfunction\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, fname) => {
      return 'function ' + ensure(fname, 'FN');
    });
    result = result.replace(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*\)/gm, (_, fname) => {
      if (BASH_KEYWORDS.has(fname.toLowerCase())) return _;
      return ensure(fname, 'FN') + '()';
    });

  } else if (options.maskIdentifiers) {
    const identifierRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    result = result.replace(identifierRegex, (word) => {
      if (keywords.has(word)) return word;
      if (keywords.has(word.toLowerCase())) return word;
      if (reverseMap[word]) return reverseMap[word];
      if (/^\d+$/.test(word)) return word;
      return ensure(word, 'VAR');
    });
  }

  const mapping: CodeShieldMapping = {
    version: '2.1',
    language,
    createdAt: new Date().toISOString(),
    maskIdentifiers: options.maskIdentifiers,
    maskSecrets: options.maskSecrets,
    maskPII: options.maskPII,
    map,
    reverseMap,
  };

  return { masked: result, mapping };
}

// ─── Quick scan (pre-mask analysis) ──────────────────────────────────────────
export function quickScan(source: string, customRegexes: RegExp[] = []): ScanItem[] {
  const items: ScanItem[] = [];

  const checks: Array<{ regex: RegExp; category: ScanItem['category']; label: string; severity: ScanItem['severity'] }> = [
    { regex: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/gi,                        category: 'secret', label: 'JWT tokens',               severity: 'critical' },
    { regex: /AKIA[0-9A-Z]{16}/gi,                                                              category: 'secret', label: 'AWS access keys',           severity: 'critical' },
    { regex: /sk-[a-zA-Z0-9]{20,}/gi,                                                           category: 'secret', label: 'OpenAI / Stripe secret keys',severity: 'critical' },
    { regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/gi,                               category: 'secret', label: 'Private key block',          severity: 'critical' },
    { regex: /ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}/gi,                                      category: 'secret', label: 'GitHub tokens',              severity: 'critical' },
    { regex: /(postgres|mysql|mongodb|redis|amqp)(\+srv)?:\/\/[^\s'"]+/gi,                      category: 'secret', label: 'Database connection strings', severity: 'critical' },
    { regex: /(?:api[_-]?key|secret|password|token|bearer)\s*[:=]\s*["']?[a-zA-Z0-9_\-]{16,}/gi, category: 'secret', label: 'API keys / secrets',       severity: 'high' },
    { regex: /AIza[0-9A-Za-z_-]{35}/gi,                                                         category: 'secret', label: 'Google API keys',            severity: 'high' },
    { regex: /xox[baprs]-[a-zA-Z0-9-]+/gi,                                                      category: 'secret', label: 'Slack tokens',               severity: 'high' },
    { regex: /pk_[a-zA-Z0-9]+/gi,                                                               category: 'secret', label: 'Stripe public keys',         severity: 'medium' },
    { regex: /glpat-[a-zA-Z0-9_-]{20}/gi,                                                       category: 'secret', label: 'GitLab personal access tokens', severity: 'high' },
    { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,                                category: 'pii',    label: 'Email addresses',            severity: 'high' },
    { regex: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g,                         category: 'pii',    label: 'Phone numbers',              severity: 'high' },
    { regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,                                        category: 'pii',    label: 'IP addresses',               severity: 'medium' },
    { regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b/g,               category: 'pii',    label: 'Credit card numbers',        severity: 'critical' },
    { regex: /\b\d{3}-\d{2}-\d{4}\b/g,                                                          category: 'pii',    label: 'SSN patterns',               severity: 'critical' },
  ];

  // SQL schema detection
  if (/\b(FROM|JOIN|INTO|UPDATE)\s+[a-zA-Z_][a-zA-Z0-9_.]*/i.test(source) &&
      /\b(SELECT|WHERE|SET)\b/i.test(source)) {
    items.push({ category: 'schema', label: 'Database table/schema names', severity: 'high', count: 1 });
  }

  for (const check of checks) {
    const matches = source.match(check.regex) ?? [];
    if (matches.length > 0) {
      items.push({ category: check.category, label: check.label, severity: check.severity, count: matches.length });
    }
  }

  for (const re of customRegexes) {
    re.lastIndex = 0;
    const matches = source.match(re) ?? [];
    if (matches.length > 0) {
      items.push({ category: 'secret', label: 'Custom pattern match', severity: 'high', count: matches.length });
    }
  }

  return items;
}

// ─── Risk analysis ────────────────────────────────────────────────────────────
export function analyzePromptRisk(source: string): { score: number; risks: RiskItem[] } {
  const risks: RiskItem[] = [];
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g.test(source))             risks.push({ type: 'pii',    label: 'Email addresses detected' });
  if (/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g.test(source))      risks.push({ type: 'pii',    label: 'Phone numbers detected' });
  if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g.test(source))                     risks.push({ type: 'pii',    label: 'IP addresses detected' });
  if (/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/gi.test(source))     risks.push({ type: 'secret', label: 'JWT tokens detected' });
  if (/(?:api[_-]?key|secret|password|token|bearer)\s*[:=]\s*["']?[a-zA-Z0-9_\-]{16,}/gi.test(source)) risks.push({ type: 'secret', label: 'API keys / secrets detected' });
  if (/(postgres|mysql|mongodb|redis)(\+srv)?:\/\/[^\s'"]+/gi.test(source))        risks.push({ type: 'secret', label: 'Database connection strings detected' });
  if (/sk-[a-zA-Z0-9]{20,}|pk_[a-zA-Z0-9]+/gi.test(source))                       risks.push({ type: 'secret', label: 'Stripe / OpenAI keys detected' });
  if (/AKIA[0-9A-Z]{16}/gi.test(source))                                            risks.push({ type: 'secret', label: 'AWS access keys detected' });
  if (/ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}/gi.test(source))                   risks.push({ type: 'secret', label: 'GitHub tokens detected' });
  if (/\b(FROM|JOIN|INTO|UPDATE)\s+[a-zA-Z_][a-zA-Z0-9_.]*/i.test(source) &&
      /\b(SELECT|WHERE|SET)\b/i.test(source))                                       risks.push({ type: 'schema', label: 'Database schema (tables/columns) detected' });
  const score = Math.max(0, 100 - risks.length * 15);
  return { score, risks };
}

export function detectSensitiveFile(source: string): boolean {
  const lines = source.split(/\r?\n/).slice(0, 20);
  const envLike = lines.filter((l) =>
    /^\s*[A-Z_][A-Z0-9_]*\s*=\s*.+/.test(l) ||
    /^\s*["']?[a-z_]+["']?\s*:\s*["']?.+["']?\s*,?\s*$/.test(l)
  ).length;
  return envLike >= 2 || /\b(api_key|secret|password|token)\s*[:=]/i.test(source.slice(0, 500));
}

// ─── Restore ──────────────────────────────────────────────────────────────────
function restoreCode(maskedCode: string, mapping: CodeShieldMapping): string {
  const sorted = Object.entries(mapping.map).sort((a, b) => b[0].length - a[0].length);
  let result = maskedCode;
  for (const [masked, original] of sorted) {
    const re = new RegExp(escapeRegex(masked), 'g');
    result = result.replace(re, original);
  }
  return result;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function getMaskStats(mapping: CodeShieldMapping): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const masked of Object.keys(mapping.map)) {
    const prefix = masked.split('_')[0];
    stats[prefix] = (stats[prefix] ?? 0) + 1;
  }
  return stats;
}

// ─── AI Templates ─────────────────────────────────────────────────────────────
const AI_TEMPLATES = [
  { id: 'none',        label: 'No template',           prompt: '' },
  { id: 'codereview',  label: '🔍 Code review',        prompt: 'Please review this masked code for quality, correctness, and best practices. Use the exact same placeholder names (VAR_XXXX, SECRET_XXXX, etc.) in your response so I can restore original names afterward.\n\n' },
  { id: 'bugreport',   label: '🐛 Bug report',         prompt: 'I found a bug in this masked code. Please help me identify and fix it. Use the exact same placeholder names in your response.\n\n' },
  { id: 'security',    label: '🛡️ Security audit',    prompt: 'Please audit this masked code for security vulnerabilities, injection risks, and insecure practices. Use the exact same placeholder names in your response.\n\n' },
  { id: 'performance', label: '⚡ Performance',         prompt: 'Please suggest performance improvements, identify bottlenecks, and optimize this masked code. Use the exact same placeholder names in your response.\n\n' },
  { id: 'docs',        label: '📝 Documentation',      prompt: 'Please write clear documentation, docstrings, and inline comments for this masked code. Use the exact same placeholder names in your response.\n\n' },
  { id: 'refactor',    label: '🔧 Refactor',            prompt: 'Please refactor this masked code to improve structure, readability, and maintainability. Use the exact same placeholder names in your response.\n\n' },
  { id: 'tests',       label: '🧪 Write tests',         prompt: 'Please write comprehensive unit tests for this masked code. Use the exact same placeholder names in your response.\n\n' },
  { id: 'explain',     label: '📖 Explain code',        prompt: 'Please explain what this masked code does, how it works, and any potential issues. Reference the placeholder names as-is in your explanation.\n\n' },
];

// ─── Code samples ──────────────────────────────────────────────────────────────
const CODE_SAMPLES: { label: string; lang: LangId; code: string }[] = [
  {
    label: '🐍 Python DB',
    lang: 'python',
    code: `import psycopg2

def get_user_orders(user_email: str):
    conn = psycopg2.connect(
        host="prod-db.internal.company.com",
        database="ecommerce_prod",
        user="app_service",
        password="Sup3r$ecretPw!"
    )
    cursor = conn.cursor()
    cursor.execute(
        "SELECT order_id, total_amount FROM orders WHERE customer_email = %s",
        (user_email,)
    )
    return cursor.fetchall()`,
  },
  {
    label: '🔷 TypeScript API',
    lang: 'typescript',
    code: `import axios from 'axios';

const OPENAI_API_KEY = 'sk-proj-abc123xyz456secret789';
const STRIPE_SECRET  = 'sk_live_[EXAMPLE_REPLACE_WITH_REAL]';

export async function analyzeCustomerSentiment(customerId: string): Promise<string> {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'gpt-4',
    prompt: \`Analyze sentiment for customer \${customerId}\`,
  }, {
    headers: { Authorization: \`Bearer \${OPENAI_API_KEY}\` }
  });
  return response.data.choices[0].text;
}`,
  },
  {
    label: '🗄️ SQL query',
    lang: 'sql',
    code: `SELECT
  u.user_id, u.email, u.full_name,
  COUNT(o.order_id) AS total_orders,
  SUM(o.amount) AS lifetime_value
FROM production.users u
LEFT JOIN production.orders o ON o.user_id = u.user_id
WHERE u.signup_date >= '2024-01-01'
  AND u.account_status = 'ACTIVE'
GROUP BY u.user_id, u.email, u.full_name
HAVING SUM(o.amount) > 1000
ORDER BY lifetime_value DESC;`,
  },
  {
    label: '💎 Ruby API',
    lang: 'ruby',
    code: `require 'stripe'
require 'sendgrid-ruby'

STRIPE_SECRET_KEY  = 'sk_live_[EXAMPLE_STRIPE_KEY_HERE]'
SENDGRID_API_KEY   = 'SG.abc123.xyz456sendgrid_secret_key'
DATABASE_URL       = 'postgres://app_user:db_password@prod-host:5432/production_db'

def charge_customer(customer_email, amount_cents)
  Stripe.api_key = STRIPE_SECRET_KEY
  customer = Stripe::Customer.retrieve_by_email(customer_email)
  Stripe::PaymentIntent.create(
    amount: amount_cents,
    currency: 'usd',
    customer: customer.id
  )
end`,
  },
  {
    label: '⚙️ .env file',
    lang: 'bash',
    code: `# Production environment config
DATABASE_URL=postgres://admin:S3cr3tP4ss@prod-db.company.com:5432/app_prod
REDIS_URL=redis://:redis_password@cache.company.com:6379/0
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
STRIPE_SECRET_KEY=sk_live_[EXAMPLE_REPLACE_IN_REAL_USAGE]
OPENAI_API_KEY=sk-proj-abc123xyz456secretopenaikey789
SENDGRID_API_KEY=SG.abc123.xyz456
JWT_SECRET=my_super_secret_jwt_signing_key_do_not_share`,
  },
];

// ─── Severity badge ────────────────────────────────────────────────────────────
const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 text-red-800 ring-red-600/20',
  high:     'bg-orange-100 text-orange-800 ring-orange-600/20',
  medium:   'bg-amber-100 text-amber-800 ring-amber-600/20',
  low:      'bg-slate-100 text-slate-700 ring-slate-600/20',
};
const CATEGORY_ICON: Record<string, string> = {
  secret: '🔑',
  pii:    '👤',
  schema: '🗄️',
  identifier: '📝',
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function CodePromptShieldClient() {
  const [sourceCode, setSourceCode]           = useState(CODE_SAMPLES[0].code);
  const [language, setLanguage]               = useState<LangId>('python');
  const [maskIdentifiers, setMaskIdentifiers] = useState(true);
  const [maskSecrets, setMaskSecrets]         = useState(true);
  const [maskPII, setMaskPII]                 = useState(true);
  const [doStripComments, setDoStripComments] = useState(false);
  const [customPatterns, setCustomPatterns]   = useState('');
  const [showAdvanced, setShowAdvanced]       = useState(false);

  const [maskedCode, setMaskedCode]           = useState('');
  const [mapping, setMapping]                 = useState<CodeShieldMapping | null>(null);
  const [maskStats, setMaskStats]             = useState<Record<string, number>>({});
  const [riskResult, setRiskResult]           = useState<{ score: number; risks: RiskItem[] } | null>(null);

  const [scanResults, setScanResults]         = useState<ScanItem[] | null>(null);
  const [showScan, setShowScan]               = useState(false);

  const [aiResponse, setAiResponse]           = useState('');
  const [restoredCode, setRestoredCode]       = useState('');
  const [showMapping, setShowMapping]         = useState(false);
  const [diffView, setDiffView]               = useState<'original' | 'masked'>('masked');
  const [selectedTemplate, setSelectedTemplate] = useState('none');

  const sensitiveWarning = detectSensitiveFile(sourceCode);

  // ⌘/Ctrl+Enter → mask
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleMask();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScan = useCallback(() => {
    trackCtaClick('code_prompt_shield', 'scan');
    if (!sourceCode.trim()) { toast.error('Paste or enter code first'); return; }
    const customRegexes: RegExp[] = customPatterns.trim()
      ? customPatterns.split('\n').flatMap((l) => { try { return [new RegExp(l.trim(), 'gi')]; } catch { return []; } })
      : [];
    const results = quickScan(sourceCode, customRegexes);
    setScanResults(results);
    setShowScan(true);
    if (results.length === 0) {
      toast.success('No sensitive content detected');
    } else {
      toast(`${results.length} risk${results.length !== 1 ? 's' : ''} detected`, { icon: '⚠️' });
    }
  }, [sourceCode, customPatterns]);

  const handleMask = useCallback(() => {
    trackCtaClick('code_prompt_shield', 'mask');
    if (!sourceCode.trim()) { toast.error('Paste or enter code first'); return; }
    const { masked, mapping: m } = maskCode(sourceCode, language, {
      maskIdentifiers,
      maskSecrets,
      maskPII,
      stripComments: doStripComments,
      customPatterns,
    });
    setMaskedCode(masked);
    setMapping(m);
    setMaskStats(getMaskStats(m));
    setRiskResult(analyzePromptRisk(sourceCode));
    setShowMapping(true);
    toast.success(`Masked ${Object.keys(m.map).length} tokens`);
  }, [sourceCode, language, maskIdentifiers, maskSecrets, maskPII, doStripComments, customPatterns]);

  const handleRestore = useCallback(() => {
    trackCtaClick('code_prompt_shield', 'restore');
    if (!mapping || !aiResponse.trim()) { toast.error('Load a mapping and paste AI response first'); return; }
    const restored = restoreCode(aiResponse.trim(), mapping);
    setRestoredCode(restored);
    toast.success('Code restored with original identifiers');
  }, [mapping, aiResponse]);

  const getPromptText = (): string => {
    const template = AI_TEMPLATES.find((t) => t.id === selectedTemplate);
    const prefix = template?.prompt ?? '';
    return prefix + maskedCode;
  };

  const copyMasked = async () => {
    if (!maskedCode) return;
    try {
      await navigator.clipboard.writeText(getPromptText());
      trackCopy('code_prompt_shield');
      toast.success('Copied');
    } catch { toast.error('Copy failed'); }
  };

  const copyForAI = async (tool: 'chatgpt' | 'claude' | 'copilot' | 'gemini') => {
    if (!maskedCode) return;
    try {
      await navigator.clipboard.writeText(getPromptText());
      trackCopy('code_prompt_shield');
      const names = { chatgpt: 'ChatGPT', claude: 'Claude', copilot: 'Copilot', gemini: 'Gemini' };
      toast.success(`Copied for ${names[tool]}`);
    } catch { toast.error('Copy failed'); }
  };

  const downloadMapping = (ext: 'json' | 'maskmap' = 'json') => {
    if (!mapping) return;
    try {
      const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ext === 'maskmap' ? 'code-shield.maskmap' : `code-shield-mapping-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(ext === 'maskmap' ? 'Downloaded .maskmap' : 'Mapping downloaded');
    } catch { toast.error('Download failed'); }
  };

  const loadMappingFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const loaded = JSON.parse(reader.result as string) as CodeShieldMapping;
        setMapping(loaded);
        setMaskStats(getMaskStats(loaded));
        toast.success('Mapping loaded — ready to restore');
      } catch { toast.error('Invalid mapping file'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const mapCount = mapping ? Object.keys(mapping.map).length : 0;
  const lineCount = sourceCode.split('\n').length;
  const charCount = sourceCode.length;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors mb-4 rounded-lg px-2 py-1 -ml-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Back to Tools
          </Link>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary-600" aria-hidden />
              Code Prompt Shield
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
              <Lock className="w-3 h-3" aria-hidden />
              Client-side only
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
              18 languages
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Mask API keys, secrets, variables, and PII before sharing code with ChatGPT, Claude, Copilot, or Gemini.
            Fully reversible. Nothing leaves your browser.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Sensitive file warning */}
        {sensitiveWarning && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-amber-900">Sensitive config detected</p>
              <p className="text-sm text-amber-800 mt-0.5">
                This looks like a .env or config file containing secrets. Enable &quot;Secrets&quot; masking and click Mask before sending to any AI.
              </p>
            </div>
          </div>
        )}

        {/* ── Input section ─────────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-slate-500" aria-hidden />
            Source code
          </h2>

          {/* Language + Options row */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label htmlFor="code-shield-language" className="block text-sm font-medium text-slate-700 mb-1">Language</label>
              <select
                id="code-shield-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LangId)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={maskIdentifiers} onChange={(e) => setMaskIdentifiers(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Identifiers
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={maskSecrets} onChange={(e) => setMaskSecrets(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Secrets &amp; API keys
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={maskPII} onChange={(e) => setMaskPII(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                PII (emails, phones, IPs)
              </label>
            </div>
          </div>

          {/* Advanced options */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4" aria-hidden />
              Advanced options
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showAdvanced && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={doStripComments} onChange={(e) => setDoStripComments(e.target.checked)}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                  Strip comments before masking (removes <code className="text-xs bg-slate-200 px-1 rounded">// …</code>, <code className="text-xs bg-slate-200 px-1 rounded"># …</code>, <code className="text-xs bg-slate-200 px-1 rounded">/* … */</code>)
                </label>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Custom secret patterns <span className="font-normal text-slate-500">(one regex per line — matched values masked as SECRET_XXXX)</span>
                  </label>
                  <textarea
                    value={customPatterns}
                    onChange={(e) => setCustomPatterns(e.target.value)}
                    placeholder={"e.g. mycompany-[a-zA-Z0-9]{32}\nor: [A-Z]{4}-[0-9]{4}-[A-Z]{4}"}
                    rows={3}
                    className="w-full p-3 font-mono text-sm text-slate-800 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Textarea with stats */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">{lineCount} lines · {charCount.toLocaleString()} chars</span>
            </div>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="Paste your code here…"
              className="w-full h-52 p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y"
              spellCheck={false}
              aria-label="Source code"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={handleMask}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Shield className="w-4 h-4" aria-hidden />
              Mask code
              <kbd className="hidden sm:inline-flex items-center rounded border border-white/30 bg-white/20 px-1 py-0.5 font-mono text-[10px]">⌘↵</kbd>
            </button>
            <button
              type="button"
              onClick={handleScan}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
            >
              <Search className="w-4 h-4" aria-hidden />
              Scan first
            </button>
            <div className="h-px w-px" />
            {CODE_SAMPLES.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  trackCtaClick('code_prompt_shield', 'try_example');
                  setSourceCode(s.code);
                  setLanguage(s.lang);
                  setScanResults(null);
                  setMaskedCode('');
                  setMapping(null);
                  setRestoredCode('');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Scan results ──────────────────────────────────────────────────── */}
        {showScan && scanResults !== null && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-5 h-5 text-slate-500" aria-hidden />
                Pre-mask scan results
              </h2>
              <button type="button" onClick={() => setShowScan(false)} className="text-slate-400 hover:text-slate-600 text-sm">Hide</button>
            </div>
            {scanResults.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden />
                <p className="text-sm font-medium text-emerald-800">No sensitive content detected. Safe to share — or mask anyway for extra privacy.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 mb-3">
                  The following sensitive content was detected. Masking will replace these with safe placeholders.
                </p>
                {scanResults.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{CATEGORY_ICON[item.category] ?? '⚠️'}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 capitalize">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{item.count} occurrence{item.count !== 1 ? 's' : ''}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${SEVERITY_STYLES[item.severity]}`}>
                        {item.severity}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => { handleMask(); setShowScan(false); }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-colors"
                >
                  <Shield className="w-4 h-4" aria-hidden />
                  Mask all detected issues
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── Output section ────────────────────────────────────────────────── */}
        {maskedCode && (
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">

            {/* Risk score */}
            {riskResult && (
              <div className={`mb-4 p-4 rounded-xl border ${riskResult.risks.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="flex items-center gap-3">
                  {riskResult.risks.length > 0
                    ? <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden />
                    : <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden />}
                  <p className="text-sm font-semibold text-slate-800">
                    Pre-mask safety score:{' '}
                    <span className={riskResult.risks.length > 0 ? 'text-amber-700' : 'text-emerald-700'}>
                      {riskResult.score}%
                    </span>
                    {riskResult.risks.length > 0 && <span className="font-normal text-slate-600"> — risks detected in original (masked version is safe)</span>}
                  </p>
                </div>
                {riskResult.risks.length > 0 && (
                  <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-0.5">
                    {riskResult.risks.map((r) => <li key={r.label}>{r.label}</li>)}
                  </ul>
                )}
              </div>
            )}

            {/* Stats breakdown */}
            {Object.keys(maskStats).length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(maskStats).map(([prefix, count]) => {
                  const colors: Record<string, string> = {
                    VAR: 'bg-blue-50 text-blue-700 ring-blue-600/20',
                    SECRET: 'bg-red-50 text-red-700 ring-red-600/20',
                    PII: 'bg-pink-50 text-pink-700 ring-pink-600/20',
                    TABLE: 'bg-purple-50 text-purple-700 ring-purple-600/20',
                    COL: 'bg-violet-50 text-violet-700 ring-violet-600/20',
                    KEY: 'bg-amber-50 text-amber-700 ring-amber-600/20',
                    FN: 'bg-green-50 text-green-700 ring-green-600/20',
                    TAG: 'bg-orange-50 text-orange-700 ring-orange-600/20',
                    ATTR: 'bg-teal-50 text-teal-700 ring-teal-600/20',
                    SEC: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
                  };
                  return (
                    <span key={prefix} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${colors[prefix] ?? 'bg-slate-50 text-slate-700 ring-slate-600/20'}`}>
                      <Zap className="w-3 h-3" aria-hidden />
                      {prefix}: {count}
                    </span>
                  );
                })}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-white">
                  Total: {mapCount}
                </span>
              </div>
            )}

            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-lg font-semibold text-slate-800">What AI sees</h2>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-1">
                  {(['chatgpt','claude','copilot','gemini'] as const).map((tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => copyForAI(tool)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg capitalize transition-colors"
                    >
                      {tool.charAt(0).toUpperCase() + tool.slice(1)}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={copyMasked} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" aria-hidden /> Copy
                </button>
                <button type="button" onClick={() => downloadMapping('maskmap')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors" title="Download .maskmap">
                  <FileJson className="w-4 h-4" aria-hidden /> .maskmap
                </button>
                <button type="button" onClick={() => downloadMapping('json')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" aria-hidden /> Mapping
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" aria-hidden /> Load mapping
                  <input type="file" accept=".json,.maskmap" onChange={loadMappingFile} className="sr-only" />
                </label>
              </div>
            </div>

            {/* AI template selector */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <label className="text-sm font-medium text-slate-700 shrink-0">AI prompt template:</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                {AI_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              {selectedTemplate !== 'none' && (
                <span className="text-xs text-slate-500">Template prepended when you copy for AI</span>
              )}
            </div>

            {/* Tab view */}
            <div className="mb-3 flex gap-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setDiffView('original')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 -mb-px ${diffView === 'original' ? 'bg-emerald-50 text-emerald-800 border-emerald-500' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Original code
              </button>
              <button
                type="button"
                onClick={() => setDiffView('masked')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 -mb-px ${diffView === 'masked' ? 'bg-violet-50 text-violet-800 border-violet-500' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Masked (what AI sees)
              </button>
            </div>
            <textarea
              readOnly
              value={diffView === 'original' ? sourceCode : maskedCode}
              className="w-full h-48 p-4 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl resize-y"
              aria-label={diffView === 'original' ? 'Original code' : 'Masked code'}
            />

            {/* Mapping table */}
            {mapping && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowMapping(!showMapping)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg border-2 border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 hover:border-indigo-300 transition-colors"
                >
                  {showMapping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Mapping table ({mapCount} entries)
                </button>
                {showMapping && (
                  <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-56 overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-500 border-b border-slate-200">
                          <th className="py-2 pr-4">Masked token</th>
                          <th className="py-2">Original</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(mapping.map).map(([masked, original]) => (
                          <tr key={masked} className="border-b border-slate-100 last:border-0">
                            <td className="py-1.5 pr-4 font-mono text-slate-600">{masked}</td>
                            <td className="py-1.5 font-mono text-slate-800 break-all">{original}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ── Restore section ───────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 ring-1 ring-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-3">
            <RefreshCw className="w-5 h-5 text-slate-500" aria-hidden />
            Restore from AI response
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Paste the AI-generated code (with masked tokens). Click <strong>Restore</strong> to replace all placeholders back to your original identifiers.
          </p>

          {!mapping && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden />
              <p className="text-xs text-amber-800">
                No mapping loaded. Mask code above first, or{' '}
                <label className="font-medium underline cursor-pointer">
                  load a saved mapping file
                  <input type="file" accept=".json,.maskmap" onChange={loadMappingFile} className="sr-only" />
                </label>
                .
              </p>
            </div>
          )}

          <textarea
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
            placeholder="Paste AI response here (with VAR_XXXX, SECRET_XXXX placeholders)…"
            className="w-full h-44 p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-y mb-3"
            spellCheck={false}
            aria-label="AI response code"
          />
          <button
            type="button"
            onClick={handleRestore}
            disabled={!mapping || !aiResponse.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-4 h-4" aria-hidden />
            Restore code
          </button>

          {restoredCode && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden />
                  <label className="block text-sm font-medium text-slate-700">Restored code</label>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(restoredCode);
                      trackCopy('code_prompt_shield');
                      toast.success('Restored code copied');
                    } catch { toast.error('Copy failed'); }
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" aria-hidden /> Copy
                </button>
              </div>
              <textarea
                readOnly
                value={restoredCode}
                className="w-full h-52 p-4 font-mono text-sm text-slate-800 bg-emerald-50/50 border border-emerald-200 rounded-xl resize-y"
                aria-label="Restored code"
              />
            </div>
          )}
        </section>

        <p className="text-center text-sm text-slate-500 flex items-center justify-center gap-2 flex-wrap">
          <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden />
          All masking, scanning, and restoration runs entirely in your browser. Your code and mapping never leave your device.
          <XCircle className="w-3.5 h-3.5 text-slate-400" aria-hidden />
          No server. No logs. No tracking of your code.
        </p>
      </main>
    </div>
  );
}
