/**
 * Password Audit & Policy Generator Engine
 * Personal: entropy, crack time, pattern detection (keyboard walks, leet, years), suggestions.
 * Developer: policy → regex + code export (JS, Python, Go, Java, PHP).
 * 100% client-side, math-based. NIST 2024–aligned.
 */

import { entropy, crackTimeSeconds, formatCrackTime, getStrength } from './passwordGeneratorEngine';
import type { StrengthLevel } from './passwordGeneratorEngine';

const CRACK_SPEED = 1e9; // 1B/s for display

// --- Personal audit: inferred charset size from password (no user opts) ---
function inferCharsetSize(password: string): number {
  let n = 0;
  if (/[A-Z]/.test(password)) n += 26;
  if (/[a-z]/.test(password)) n += 26;
  if (/[0-9]/.test(password)) n += 10;
  if (/[^A-Za-z0-9]/.test(password)) n += 32;
  return n || 26;
}

export function auditEntropy(password: string): number {
  return password ? entropy(password, inferCharsetSize(password)) : 0;
}

export function auditCrackTime(password: string): number {
  return password ? crackTimeSeconds(auditEntropy(password), CRACK_SPEED) : 0;
}

export function auditStrength(password: string): StrengthLevel {
  return password ? getStrength(auditEntropy(password)) : 'Very Weak';
}

export { formatCrackTime };

// --- Pattern detection ---
const KEYBOARD_ROWS = [
  'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
  '1234567890', 'qazwsxedcrfvtgbyhnujmikolp',
];
const KEYBOARD_SEQUENCES = [
  'qwerty', 'qwer', 'asdf', 'zxcv', '1234', '12345', '123456', '234567', '345678', '456789',
  'qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'ik', 'ol', 'p',
  'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz',
  'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl', 'xcv', 'cvb', 'vbn', 'bnm',
];

function findKeyboardWalks(password: string): { pattern: string; at: number }[] {
  const lower = password.toLowerCase();
  const found: { pattern: string; at: number }[] = [];
  for (const seq of KEYBOARD_SEQUENCES) {
    let idx = lower.indexOf(seq);
    while (idx !== -1) {
      found.push({ pattern: seq, at: idx });
      idx = lower.indexOf(seq, idx + 1);
    }
  }
  for (const row of KEYBOARD_ROWS) {
    for (let len = 3; len <= row.length; len++) {
      for (let i = 0; i <= row.length - len; i++) {
        const sub = row.slice(i, i + len);
        if (sub.length < 3) continue;
        let idx = lower.indexOf(sub);
        while (idx !== -1) {
          if (!found.some(f => f.at === idx && f.pattern === sub)) {
            found.push({ pattern: sub, at: idx });
          }
          idx = lower.indexOf(sub, idx + 1);
        }
      }
    }
  }
  return found.slice(0, 10); // cap
}

const LEET_MAP: Record<string, string[]> = {
  '0': ['o'], '1': ['i', 'l'], '3': ['e'], '4': ['a'], '5': ['s'], '7': ['t'], '8': ['b'],
  '@': ['a'], '!': ['i'], '$': ['s'], '+': ['t'],
};
function findLeetSpeak(password: string): { original: string; leet: string; at: number }[] {
  const found: { original: string; leet: string; at: number }[] = [];
  for (let i = 0; i < password.length; i++) {
    const c = password[i].toLowerCase();
    for (const [leet, origins] of Object.entries(LEET_MAP)) {
      if (c === leet.toLowerCase()) {
        found.push({ original: origins[0], leet, at: i });
        break;
      }
    }
  }
  return found;
}

const YEAR_PATTERN = /\b(19[5-9]\d|20[0-2]\d|2030)\b/g;
function findYearPatterns(password: string): { year: string; at: number }[] {
  const found: { year: string; at: number }[] = [];
  let m: RegExpExecArray | null;
  YEAR_PATTERN.lastIndex = 0;
  while ((m = YEAR_PATTERN.exec(password)) !== null) {
    found.push({ year: m[0], at: m.index });
  }
  return found;
}

export interface PatternResult {
  keyboardWalks: { pattern: string; at: number }[];
  leetSpeak: { original: string; leet: string; at: number }[];
  yearPatterns: { year: string; at: number }[];
}

export function detectPatterns(password: string): PatternResult {
  if (!password) {
    return { keyboardWalks: [], leetSpeak: [], yearPatterns: [] };
  }
  return {
    keyboardWalks: findKeyboardWalks(password),
    leetSpeak: findLeetSpeak(password),
    yearPatterns: findYearPatterns(password),
  };
}

// --- Improvement suggestions ---
export function getImprovementSuggestions(
  password: string,
  ent: number,
  patterns: PatternResult
): string[] {
  const suggestions: string[] = [];
  if (!password) return suggestions;

  if (password.length < 12) {
    suggestions.push('Use at least 12 characters (NIST 2024 recommends longer passphrases or 8+ with complexity).');
  }
  if (ent < 60) {
    suggestions.push('Increase entropy: add more character types (uppercase, lowercase, numbers, symbols) and length.');
  }
  if (!/[A-Z]/.test(password)) {
    suggestions.push('Add uppercase letters to increase strength.');
  }
  if (!/[a-z]/.test(password)) {
    suggestions.push('Add lowercase letters.');
  }
  if (!/[0-9]/.test(password)) {
    suggestions.push('Add numbers.');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    suggestions.push('Add symbols (!@#$%^&*) to increase entropy.');
  }
  if (patterns.keyboardWalks.length > 0) {
    suggestions.push('Avoid keyboard walks (e.g. qwerty, asdf)—they are easy to guess.');
  }
  if (patterns.yearPatterns.length > 0) {
    suggestions.push('Avoid birth years or common years—use random digits instead.');
  }
  if (patterns.leetSpeak.length > 0) {
    suggestions.push('Leet speak (e.g. 0 for o) is predictable; prefer random characters.');
  }
  const repeated = /(.)\1{2,}/.test(password);
  if (repeated) {
    suggestions.push('Avoid repeating the same character 3+ times.');
  }
  return suggestions;
}

// --- Developer: policy → regex + code export ---
export interface PasswordPolicy {
  minLength: number;
  maxLength: number | null;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSymbol: boolean;
  allowSpaces: boolean;
  allowedSymbols: string; // e.g. "!@#$%^&*"
  maxConsecutiveRepeating: number | null; // e.g. 2 = allow aa but not aaa
}

const DEFAULT_POLICY: PasswordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
  requireSymbol: true,
  allowSpaces: false,
  allowedSymbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  maxConsecutiveRepeating: 2,
};

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function policyToRegex(policy: PasswordPolicy): string {
  const parts: string[] = [];
  if (policy.requireUppercase) parts.push('(?=.*[A-Z])');
  if (policy.requireLowercase) parts.push('(?=.*[a-z])');
  if (policy.requireDigit) parts.push('(?=.*[0-9])');
  if (policy.requireSymbol && policy.allowedSymbols) {
    parts.push('(?=.*[' + escapeForRegex(policy.allowedSymbols) + '])');
  }
  const allowed = '[A-Za-z0-9' + escapeForRegex(policy.allowedSymbols || '') + (policy.allowSpaces ? ' ' : '') + ']';
  const min = policy.minLength;
  const max = policy.maxLength ?? 128;
  const len = max === min ? `{${min}}` : `{${min},${max}}`;
  let repeatPart = '';
  if (policy.maxConsecutiveRepeating != null && policy.maxConsecutiveRepeating >= 1) {
    repeatPart = '(?!.*(.)\\1{' + policy.maxConsecutiveRepeating + '})';
  }
  return '^' + repeatPart + parts.join('') + allowed + len + '$';
}

/** Simpler regex for display (length + lookaheads only; no backref for repeating) */
export function policyToSimpleRegex(policy: PasswordPolicy): string {
  const parts: string[] = [];
  if (policy.requireUppercase) parts.push('(?=.*[A-Z])');
  if (policy.requireLowercase) parts.push('(?=.*[a-z])');
  if (policy.requireDigit) parts.push('(?=.*[0-9])');
  if (policy.requireSymbol && policy.allowedSymbols) {
    parts.push('(?=.*[' + escapeForRegex(policy.allowedSymbols) + '])');
  }
  const min = policy.minLength;
  const max = policy.maxLength ?? 128;
  const len = max === min ? `{${min}}` : `{${min},${max}}`;
  const allowed = '[A-Za-z0-9' + escapeForRegex(policy.allowedSymbols || '') + (policy.allowSpaces ? ' ' : '') + ']';
  return '^' + parts.join('') + allowed + len + '$';
}

export function policyToCode(policy: PasswordPolicy, lang: 'js' | 'python' | 'go' | 'java' | 'php'): string {
  return policyToCodeCorrect(policy, lang);
}

export function policyToCodeCorrect(policy: PasswordPolicy, lang: 'js' | 'python' | 'go' | 'java' | 'php'): string {
  const regex = policyToSimpleRegex(policy);
  const maxStr = policy.maxLength != null ? `, max ${policy.maxLength}` : '';

  switch (lang) {
    case 'js': {
      const re = regex.replace(/\\/g, '\\\\').replace(/\//g, '\\/');
      return `// Password policy: min ${policy.minLength}${maxStr}, required: uppercase, lowercase, digit, symbol
const passwordRegex = /${re}/;
function isValidPassword(password) {
  return typeof password === 'string' && passwordRegex.test(password);
}`;
    }
    case 'python': {
      const pyRe = regex.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `# Password policy: min ${policy.minLength}${maxStr}, required: uppercase, lowercase, digit, symbol
import re
password_regex = re.compile(r'${pyRe}')
def is_valid_password(password: str) -> bool:
    return bool(password and password_regex.fullmatch(password))`;
    }
    case 'go': {
      const goEscaped = regex.split('`').join('` + "`" + "`');
      return `// Password policy: min ${policy.minLength}${maxStr}
package main
import "regexp"
var passwordRegex = regexp.MustCompile(\`${goEscaped}\`)
func isValidPassword(password string) bool {
\treturn passwordRegex.MatchString(password)
}`;
    }
    case 'java': {
      const javaRe = regex.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `// Password policy: min ${policy.minLength}${maxStr}
import java.util.regex.Pattern;
public class PasswordValidator {
    private static final Pattern PASSWORD_REGEX = Pattern.compile("${javaRe}");
    public static boolean isValidPassword(String password) {
        return password != null && PASSWORD_REGEX.matcher(password).matches();
    }
}`;
    }
    case 'php': {
      const phpRe = regex.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `<?php
// Password policy: min ${policy.minLength}${maxStr}
$passwordRegex = '/${phpRe}/';
function isValidPassword(string $password): bool {
    return (bool) preg_match($passwordRegex, $password);
}`;
    }
    default:
      return '';
  }
}

export { DEFAULT_POLICY, type PasswordPolicy };
