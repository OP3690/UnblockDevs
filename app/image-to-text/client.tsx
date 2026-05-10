'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Upload, Download, Copy, Check, X, ChevronDown, ChevronUp,
  Loader2, CheckCircle2, AlertCircle, Scan, ZoomIn, ZoomOut,
  FileText, Settings2, Eye, EyeOff, Languages, BarChart2,
  RefreshCw, Layers, AlignLeft, Table2, Image as ImageIcon,
  Maximize2,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface BBox { x0: number; y0: number; x1: number; y1: number; }

interface OcrWord {
  text: string;
  confidence: number;
  bbox: BBox;
}

interface OcrLine {
  text: string;
  confidence: number;
  bbox: BBox;
  words: OcrWord[];
}

interface OcrParagraph {
  text: string;
  confidence: number;
  bbox: BBox;
  lines: OcrLine[];
}

interface OcrResult {
  id: string;
  fileName: string;
  fileSize: number;
  imageUrl: string;
  naturalWidth: number;
  naturalHeight: number;
  text: string;
  hocr?: string;
  paragraphs: OcrParagraph[];
  words: OcrWord[];
  confidence: number;
  wordCount: number;
  charCount: number;
  processingMs: number;
  language: string;
  psmLabel: string;
  hasTable: boolean;
  tableData?: string[][];
  preprocessApplied: string[];
  garbledRatio: number;          // fraction of words detected as garbled (0–1)
  suggestLang: string | null;    // suggested language switch if garbling detected
  docType: DocType;              // detected document category
  structuredBlocks: StructuredBlock[]; // parsed semantic blocks
  file: File;                    // original File — kept for re-run with new settings
  autoStrategy: string;          // human-readable description of auto-applied OCR strategy
}

interface Options {
  language: string;
  psm: string;
  oem: number;
  multiPass: boolean;       // run PSM 3 + PSM 11 sparse, merge results
  preprocess: {
    grayscale: boolean;
    contrast: boolean;    // enhance contrast
    sharpen: boolean;     // unsharp mask
    upscale: boolean;     // smart upscale for small images
    threshold: boolean;   // binarize (Otsu)
    denoise: boolean;     // 3×3 median blur
  };
  outputMode: 'plain' | 'structured' | 'confidence' | 'table';
  confidenceFilter: number; // hide words below this %
  showBboxOverlay: boolean;
}

// ── Language / PSM maps ───────────────────────────────────────────────────────

export interface LangOption { code: string; label: string; hint?: string; }

const LANGUAGES: LangOption[] = [
  // ── English only ──
  { code: 'eng', label: 'English only' },

  // ── 🇮🇳 Indian languages (bilingual with English) ──────────────────────────
  { code: 'eng+hin',     label: '🇮🇳 English + Hindi',     hint: 'PAN card, Aadhaar, most Indian central govt docs' },
  { code: 'eng+guj',     label: '🇮🇳 English + Gujarati',  hint: 'Gujarat state docs, Gujarati business documents' },
  { code: 'eng+ben',     label: '🇮🇳 English + Bengali',   hint: 'West Bengal / Bangladesh documents' },
  { code: 'eng+tam',     label: '🇮🇳 English + Tamil',     hint: 'Tamil Nadu state documents' },
  { code: 'eng+tel',     label: '🇮🇳 English + Telugu',    hint: 'Andhra Pradesh / Telangana documents' },
  { code: 'eng+kan',     label: '🇮🇳 English + Kannada',   hint: 'Karnataka state documents' },
  { code: 'eng+mal',     label: '🇮🇳 English + Malayalam', hint: 'Kerala state documents' },
  { code: 'eng+mar',     label: '🇮🇳 English + Marathi',   hint: 'Maharashtra documents (uses Devanagari)' },
  { code: 'eng+pan',     label: '🇮🇳 English + Punjabi',   hint: 'Punjab documents (Gurmukhi script)' },
  { code: 'eng+hin+guj', label: '🇮🇳 Hindi + Gujarati + English', hint: 'Documents mixing both scripts' },
  { code: 'eng+urd',     label: '🇮🇳 English + Urdu',      hint: 'Urdu documents (Nastaliq script)' },

  // ── Middle East / Africa ───────────────────────────────────────────────────
  { code: 'eng+ara', label: '🌍 English + Arabic',  hint: 'Arabic-English bilingual documents' },
  { code: 'ara',     label: 'Arabic' },

  // ── Europe ────────────────────────────────────────────────────────────────
  { code: 'eng+rus', label: '🇷🇺 English + Russian', hint: 'Documents with Cyrillic + Latin text' },
  { code: 'fra',     label: 'French' },
  { code: 'deu',     label: 'German' },
  { code: 'spa',     label: 'Spanish' },
  { code: 'por',     label: 'Portuguese' },
  { code: 'ita',     label: 'Italian' },
  { code: 'nld',     label: 'Dutch' },
  { code: 'pol',     label: 'Polish' },
  { code: 'rus',     label: 'Russian only' },
  { code: 'ukr',     label: 'Ukrainian' },
  { code: 'tur',     label: 'Turkish' },

  // ── East Asia ─────────────────────────────────────────────────────────────
  { code: 'eng+chi_sim', label: '🇨🇳 English + Chinese (Simplified)',  hint: 'Chinese-English bilingual' },
  { code: 'eng+chi_tra', label: '🇹🇼 English + Chinese (Traditional)', hint: 'Traditional Chinese + English' },
  { code: 'eng+jpn',     label: '🇯🇵 English + Japanese',              hint: 'Japanese-English documents' },
  { code: 'eng+kor',     label: '🇰🇷 English + Korean',                hint: 'Korean-English documents' },
  { code: 'chi_sim',     label: 'Chinese (Simplified)' },
  { code: 'chi_tra',     label: 'Chinese (Traditional)' },
  { code: 'jpn',         label: 'Japanese' },
  { code: 'kor',         label: 'Korean' },
  { code: 'vie',         label: 'Vietnamese' },

  // ── Indian single-language ────────────────────────────────────────────────
  { code: 'hin', label: 'Hindi only' },
  { code: 'guj', label: 'Gujarati only' },
  { code: 'ben', label: 'Bengali only' },
  { code: 'tam', label: 'Tamil only' },
  { code: 'tel', label: 'Telugu only' },
  { code: 'kan', label: 'Kannada only' },
  { code: 'mal', label: 'Malayalam only' },
  { code: 'mar', label: 'Marathi only' },
  { code: 'pan', label: 'Punjabi only' },
];

const PSM_MODES: { value: string; label: string; desc: string }[] = [
  { value: '3',  label: 'Auto',            desc: 'Best for mixed content (default)' },
  { value: '6',  label: 'Single block',    desc: 'One uniform block of text' },
  { value: '4',  label: 'Single column',   desc: 'Newspaper / magazine column' },
  { value: '11', label: 'Sparse text',     desc: 'Text scattered across image' },
  { value: '7',  label: 'Single line',     desc: 'One line only' },
  { value: '8',  label: 'Single word',     desc: 'One word only' },
  { value: '13', label: 'Raw line',        desc: 'Raw single line, no classification' },
];

// ── Image pre-processing (canvas) ────────────────────────────────────────────

function applyPreprocessing(
  img: HTMLImageElement,
  opts: Options['preprocess'],
): { canvas: HTMLCanvasElement; applied: string[] } {
  const applied: string[] = [];

  // Smart upscale: 3× for tiny (<800px), 2× for small (<1600px), 1× otherwise
  let scale = 1;
  if (opts.upscale) {
    const maxDim = Math.max(img.naturalWidth, img.naturalHeight);
    if (maxDim < 800)       { scale = 3; applied.push('3× upscale'); }
    else if (maxDim < 1600) { scale = 2; applied.push('2× upscale'); }
  }

  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

  // White background (important for transparent PNGs)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  // CSS filter chain
  const filters: string[] = [];
  if (opts.grayscale) {
    // Use saturate(0) for more accurate luminance-based grayscale
    filters.push('saturate(0)');
    applied.push('Grayscale');
  }
  if (opts.contrast) {
    // Stronger contrast helps with coloured / gradient document backgrounds
    filters.push('contrast(1.8) brightness(1.08)');
    applied.push('Contrast+');
  }
  if (opts.sharpen) { applied.push('Sharpen'); }

  if (filters.length) {
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const tmpCtx = tmp.getContext('2d')!;
    tmpCtx.filter = filters.join(' ');
    tmpCtx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(tmp, 0, 0);
  }

  // Denoise: 3×3 median blur (run before sharpen to avoid amplifying noise)
  if (opts.denoise) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const denoised = medianBlur(imageData);
    ctx.putImageData(denoised, 0, 0);
    applied.push('Denoise');
  }

  // Sharpen via unsharp mask convolution
  if (opts.sharpen) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const sharpened = unsharpenMask(imageData, 1.5);
    ctx.putImageData(sharpened, 0, 0);
  }

  // Threshold (binarize using Otsu's method)
  if (opts.threshold) {
    const imageData = ctx.getImageData(0, 0, w, h);
    const binarized = otsuThreshold(imageData);
    ctx.putImageData(binarized, 0, 0);
    applied.push('Binarize');
  }

  return { canvas, applied };
}

// ── 3×3 median blur (noise reduction) ────────────────────────────────────────
function medianBlur(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  const result = new Uint8ClampedArray(data);
  const vals: number[] = new Array(9);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let vi = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++)
            vals[vi++] = data[((y + dy) * width + (x + dx)) * 4 + c];
        vals.sort((a, b) => a - b);
        result[(y * width + x) * 4 + c] = vals[4];
      }
      result[(y * width + x) * 4 + 3] = 255;
    }
  }
  return new ImageData(result, width, height);
}

function unsharpenMask(imageData: ImageData, amount: number): ImageData {
  const { data, width, height } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  // Simple 3×3 sharpening kernel: [0,-1,0,-1,5,-1,0,-1,0]
  const kernel = [0, -amount, 0, -amount, 1 + 4 * amount, -amount, 0, -amount, 0];
  const side = 3, half = 1;
  for (let y = half; y < height - half; y++) {
    for (let x = half; x < width - half; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const ki = (ky + half) * side + (kx + half);
          const pi = ((y + ky) * width + (x + kx)) * 4;
          r += data[pi]     * kernel[ki];
          g += data[pi + 1] * kernel[ki];
          b += data[pi + 2] * kernel[ki];
        }
      }
      const i = (y * width + x) * 4;
      result.data[i]     = Math.max(0, Math.min(255, r));
      result.data[i + 1] = Math.max(0, Math.min(255, g));
      result.data[i + 2] = Math.max(0, Math.min(255, b));
    }
  }
  return result;
}

// Otsu's method: find optimal binarization threshold
function otsuThreshold(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  // Build histogram of gray values
  const hist = new Array(256).fill(0);
  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    hist[gray]++;
  }
  const total = width * height;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  let sumB = 0, wB = 0, wF = 0;
  let maxVar = 0, threshold = 128;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const varBetween = wB * wF * (mB - mF) ** 2;
    if (varBetween > maxVar) { maxVar = varBetween; threshold = t; }
  }
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  for (let i = 0; i < result.data.length; i += 4) {
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    const v = gray > threshold ? 255 : 0;
    result.data[i] = result.data[i + 1] = result.data[i + 2] = v;
    result.data[i + 3] = 255;
  }
  return result;
}

// ── PAN-specific binarization ─────────────────────────────────────────────────
// PAN cards have a golden/dark background. The research-proven threshold of 102
// (any channel < 102 → black, else white) works far better than Otsu for them.
// Source: dilippuri/PAN-Card-OCR pixel-level loop (threshold = 102).
function panBinarize(imageData: ImageData): ImageData {
  const d = imageData.data;
  const result = new Uint8ClampedArray(d);
  for (let i = 0; i < d.length; i += 4) {
    const isDark = d[i] < 102 || d[i + 1] < 102 || d[i + 2] < 102;
    const v = isDark ? 0 : 255;
    result[i] = result[i + 1] = result[i + 2] = v;
    result[i + 3] = 255;
  }
  return new ImageData(result, imageData.width, imageData.height);
}

// ── Word quality gate ─────────────────────────────────────────────────────────
// Returns true only for words that look like real text, not noise/artifacts.
function isUsableWord(w: OcrWord, minConf = 0, minLen = 1): boolean {
  const t = w.text.trim();
  if (!t || t.length < minLen) return false;
  if (w.confidence < minConf) return false;
  // Must start with a letter or digit (filters €&35, ~words, [bracket tokens)
  if (!/^[a-zA-Z0-9]/.test(t)) return false;
  // Must be ≥50% alphanumeric by character count
  const alphaNum = (t.match(/[a-zA-Z0-9]/g) ?? []).length;
  return alphaNum >= 1 && alphaNum / t.length >= 0.5;
}

// ── Garbled-word detector ─────────────────────────────────────────────────────
// Detects ASCII noise produced when an English-only OCR engine reads non-Latin
// scripts: Devanagari, Gujarati, Bengali, Arabic, Cyrillic, Tamil, etc.
//
// Two patterns are caught:
//  A) ALL-CAPS consonant clusters  → e.g. "HTH", "FET", "TET", "FH", "FEATET"
//  B) Mixed-case short noise        → e.g. "faa", "lA", "Fas", "dE", "wt"
//     (these come from curves/strokes of Indic scripts read as Latin letters)

const VOWELS_SET = new Set(['A','E','I','O','U','a','e','i','o','u']);

// Whitelisted short tokens that are real English/abbreviations — never garbled
const SAFE_WORDS = new Set([
  // articles / prepositions / conjunctions
  'THE','AND','FOR','ARE','BUT','NOT','YOU','ALL','CAN','HER','WAS','ONE',
  'OUR','OUT','HIS','ITS','NEW','MAY','HIM','SHE','HIM','HAD','HAS','HIM',
  // common 2-letter English
  'IN','OF','TO','BE','IS','IT','ON','AT','AS','BY','DO','GO','NO','UP',
  'OR','AN','AM','US','IF','SO','MY','WE','HI','OK','OH','AH',
  // document / ID abbreviations
  'ID','MR','MS','DR','NA','II','PAN','DOB','UID','DOC','TAX','GST','KYC',
  'PIN','ATM','SIM','OTP','EMI','ETA','PDF','OCR','QR','NO','DIN','TIN',
  'PF','EPF','NPS','UAN','ESIC',
]);

function isGarbledWord(word: string): boolean {
  // Strip everything except letters for analysis
  const t = word.replace(/[^a-zA-Z]/g, '');
  if (t.length < 2 || t.length > 9) return false;
  if (/[0-9]/.test(word)) return false;                        // keep tokens with digits
  if (SAFE_WORDS.has(t.toUpperCase())) return false;           // keep whitelisted words
  if (/^[A-Z][a-z]{2,}$/.test(t)) return false;               // keep Title-case (Name, Father, Date…)

  const vowels = [...t].filter(c => VOWELS_SET.has(c)).length;
  const consonantRatio = (t.length - vowels) / t.length;

  // Pattern A: ALL-CAPS tokens with >60% consonants
  if (t === t.toUpperCase() && consonantRatio > 0.60) return true;

  // Pattern B: mixed-case short tokens (2–5 chars) with >55% consonants
  // These come from curves/strokes of Indic scripts read as random Latin letters.
  // Title-case already excluded above; this catches "faa", "lA", "Fas", "dE", "wt"
  const hasUpper = /[A-Z]/.test(t);
  const hasLower = /[a-z]/.test(t);
  if (t.length <= 5 && hasUpper && hasLower && consonantRatio > 0.55) return true;

  // Pattern C: all-lowercase 2-4 char clusters with >60% consonants and no known vowel pair
  // "wt", "fh", "rn", "kl" etc. — random strokes from non-Latin scripts
  if (t === t.toLowerCase() && t.length <= 4 && consonantRatio > 0.60) return true;

  return false;
}

// ── Line-confidence score (from OcrWords) ────────────────────────────────────
function lineAvgConf(words: OcrWord[]): number {
  if (!words.length) return 0;
  return words.reduce((s, w) => s + w.confidence, 0) / words.length;
}

// ── Build clean text directly from OcrWord array ──────────────────────────────
// Merges reconstruct + clean into one confidence-aware pass:
// 1. Sort words by visual reading order (top→bottom, left→right)
// 2. Group into visual lines
// 3. Drop entire lines whose average confidence < LINE_CONF_THRESHOLD
// 4. Strip per-word garbled tokens from each line
// 5. Drop lines that become empty or are <40% alphanumeric after filtering
// 6. Deduplicate identical lines
function buildCleanText(words: OcrWord[], isMultiLang = false): string {
  if (!words.length) return '';

  // 1. Sort
  const sorted = [...words].sort((a, b) => {
    const yDiff = a.bbox.y0 - b.bbox.y0;
    if (Math.abs(yDiff) > 14) return yDiff;
    return a.bbox.x0 - b.bbox.x0;
  });

  // 2. Group into visual lines (18px Y tolerance)
  const lineGroups: OcrWord[][] = [];
  for (const word of sorted) {
    const last = lineGroups[lineGroups.length - 1];
    if (!last || Math.abs(word.bbox.y0 - last[0].bbox.y0) > 18) lineGroups.push([word]);
    else last.push(word);
  }

  // 3-6. Filter and clean
  // When multi-language model loaded, Tesseract handles non-Latin correctly —
  // we relax garbled-word stripping so native script words aren't wrongly removed.
  const LINE_CONF_MIN = 20; // drop lines below this avg confidence
  const ALPHA_RATIO_MIN = 0.38;
  const seen = new Set<string>();

  return lineGroups
    .filter(lg => lineAvgConf(lg) >= LINE_CONF_MIN)
    .map(lg => {
      const words = isMultiLang
        ? lg.map(w => w.text)                                 // multi-lang: trust Tesseract
        : lg.filter(w => !isGarbledWord(w.text)).map(w => w.text); // english-only: strip garble
      return words.join(' ').trim();
    })
    .filter(l => {
      if (!l) return false;
      const key = l.toLowerCase().replace(/\s+/g, ' ');
      if (seen.has(key)) return false;
      seen.add(key);
      const alphaNum = (l.match(/[a-zA-Z0-9]/g) ?? []).length;
      if (!alphaNum) return false;
      return (alphaNum / l.length) >= ALPHA_RATIO_MIN;
    })
    .join('\n');
}

// ── Garbled-word ratio (for language auto-suggestion) ────────────────────────
function computeGarbledRatio(words: OcrWord[]): number {
  if (!words.length) return 0;
  const garbled = words.filter(w => isGarbledWord(w.text)).length;
  return garbled / words.length;
}

// ── Suggest language from garbled ratio + current lang ────────────────────────
function suggestLanguage(currentLang: string, garbledRatio: number, avgConf: number): string | null {
  if (currentLang !== 'eng') return null;              // only suggest when eng-only is active
  if (garbledRatio < 0.12 && avgConf >= 55) return null; // result looks clean enough
  // Generic suggestion based on degree of garbling
  return 'eng+hin'; // default to most common bilingual Indian combo
}

// reconstructTextFromWords is superseded by buildCleanText above.
// Kept as a simple fallback for internal use only.
function reconstructTextFromWords(words: OcrWord[]): string {
  if (!words.length) return '';
  const sorted = [...words].sort((a, b) => {
    const yDiff = a.bbox.y0 - b.bbox.y0;
    if (Math.abs(yDiff) > 14) return yDiff;
    return a.bbox.x0 - b.bbox.x0;
  });
  const lines: OcrWord[][] = [];
  for (const word of sorted) {
    const last = lines[lines.length - 1];
    if (!last || Math.abs(word.bbox.y0 - last[0].bbox.y0) > 18) lines.push([word]);
    else last.push(word);
  }
  return lines.map(ln => ln.map(w => w.text).join(' ')).join('\n');
}

// ── Merge two word sets, dedup by bbox overlap ────────────────────────────────
// minExtraConf: minimum confidence required for words from the extra set.
// Use a higher value (e.g. 50) for noisy PSM 11 sparse results.
function mergeWordSets(primary: OcrWord[], extra: OcrWord[], minExtraConf = 0): OcrWord[] {
  const merged = [...primary];
  for (const w of extra) {
    if (!isUsableWord(w, minExtraConf, 2)) continue; // quality gate on extra words
    const alreadyCovered = merged.some(existing => {
      const ox = Math.min(w.bbox.x1, existing.bbox.x1) - Math.max(w.bbox.x0, existing.bbox.x0);
      const oy = Math.min(w.bbox.y1, existing.bbox.y1) - Math.max(w.bbox.y0, existing.bbox.y0);
      if (ox <= 0 || oy <= 0) return false;
      const wArea = Math.max(1, (w.bbox.x1 - w.bbox.x0) * (w.bbox.y1 - w.bbox.y0));
      return (ox * oy) / wArea > 0.4; // >40% bbox overlap = same word
    });
    if (!alreadyCovered) merged.push(w);
  }
  return merged;
}

// ── Table detection from OCR words ───────────────────────────────────────────

function detectTableFromWords(words: OcrWord[], imgHeight: number): string[][] | null {
  if (words.length < 6) return null;

  // Cluster words into rows by Y coordinate
  const ROW_TOL = imgHeight * 0.012;
  const rowGroups: OcrWord[][] = [];
  for (const w of [...words].sort((a, b) => a.bbox.y0 - b.bbox.y0)) {
    const existing = rowGroups.find(g => Math.abs(g[0].bbox.y0 - w.bbox.y0) <= ROW_TOL);
    if (existing) existing.push(w);
    else rowGroups.push([w]);
  }
  rowGroups.forEach(g => g.sort((a, b) => a.bbox.x0 - b.bbox.x0));

  if (rowGroups.length < 2) return null;

  // Collect all unique X starts → column positions
  const allX = rowGroups.flatMap(g => g.map(w => w.bbox.x0));
  const COL_TOL = 15;
  const colStarts: number[] = [];
  for (const x of allX.sort((a, b) => a - b)) {
    if (!colStarts.some(c => Math.abs(c - x) <= COL_TOL)) colStarts.push(x);
  }

  // Need ≥2 columns appearing in ≥50% of rows
  const threshold = rowGroups.length * 0.4;
  const validCols = colStarts.filter(c =>
    rowGroups.filter(row => row.some(w => Math.abs(w.bbox.x0 - c) <= COL_TOL)).length >= threshold
  );

  if (validCols.length < 2) return null;

  // Build table grid
  const table: string[][] = rowGroups.map(row => {
    const cells: string[] = Array(validCols.length).fill('');
    for (const w of row) {
      let bestI = 0, bestDist = Infinity;
      for (let i = 0; i < validCols.length; i++) {
        const d = Math.abs(w.bbox.x0 - validCols[i]);
        if (d < bestDist) { bestDist = d; bestI = i; }
      }
      if (bestDist <= COL_TOL * 2) {
        cells[bestI] = cells[bestI] ? `${cells[bestI]} ${w.text}` : w.text;
      }
    }
    return cells;
  });

  return table;
}

// ── Tesseract worker pool ─────────────────────────────────────────────────────

let globalWorker: any = null;
let globalWorkerLang = '';
let workerInitializing = false;
let workerInitQueue: Array<(w: any) => void> = [];

async function getWorker(
  lang: string,
  oem: number,
  onStatus: (msg: string) => void,
): Promise<any> {
  // Reuse worker if same language
  if (globalWorker && globalWorkerLang === lang) return globalWorker;

  // Terminate old worker if language changed
  if (globalWorker) {
    try { await globalWorker.terminate(); } catch {}
    globalWorker = null;
    globalWorkerLang = '';
    tesseractReady = false;
  }

  if (workerInitializing) {
    return new Promise(resolve => workerInitQueue.push(resolve));
  }

  workerInitializing = true;
  onStatus('Initializing OCR engine…');

  const Tesseract = await import('tesseract.js');
  const worker = await Tesseract.createWorker(lang, oem, {
    workerPath: '/tesseract.worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    corePath: '/tesseract-core/',
    logger: (m: any) => {
      if (m.status === 'loading tesseract core') onStatus('Loading OCR core…');
      if (m.status === 'loading language traineddata') onStatus(`Downloading ${lang} language model…`);
      if (m.status === 'initializing tesseract') onStatus('Initializing Tesseract…');
      if (m.status === 'initialized tesseract') onStatus('OCR engine ready');
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onStatus(`Recognizing… ${Math.round(m.progress * 100)}%`);
      }
    },
  });

  globalWorker = worker;
  globalWorkerLang = lang;
  workerInitializing = false;

  // Flush queue
  const queue = [...workerInitQueue];
  workerInitQueue = [];
  for (const resolve of queue) resolve(worker);

  return worker;
}

let tesseractReady = false;

// ── OCR runner ────────────────────────────────────────────────────────────────

/** Extract OcrWord[] from a Tesseract data response */
function extractWords(data: any): OcrWord[] {
  const words: OcrWord[] = [];
  for (const block of data.blocks ?? []) {
    for (const para of block.paragraphs ?? []) {
      for (const line of para.lines ?? []) {
        for (const w of line.words ?? []) {
          const text = (w.text ?? '').trim();
          if (!text) continue;
          words.push({
            text,
            confidence: w.confidence ?? 0,
            bbox: w.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
          });
        }
      }
    }
  }
  return words;
}

/** Extract OcrParagraph[] from a Tesseract data response */
function extractParagraphs(data: any): OcrParagraph[] {
  return (data.blocks ?? []).flatMap((block: any) =>
    (block.paragraphs ?? []).map((para: any) => ({
      text: para.text ?? '',
      confidence: para.confidence ?? 0,
      bbox: para.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
      lines: (para.lines ?? []).map((line: any) => ({
        text: line.text ?? '',
        confidence: line.confidence ?? 0,
        bbox: line.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
        words: (line.words ?? []).map((w: any) => ({
          text: w.text ?? '',
          confidence: w.confidence ?? 0,
          bbox: w.bbox ?? { x0: 0, y0: 0, x1: 0, y1: 0 },
        })),
      })),
    }))
  );
}

async function runOCR(
  file: File,
  options: Options,
  onStatus: (msg: string) => void,
): Promise<OcrResult> {
  const t0 = performance.now();
  const imageUrl = URL.createObjectURL(file);

  // Load image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = document.createElement('img');
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = imageUrl;
  });

  // ── Tesseract parameters ─────────────────────────────────────────────────
  // Disable dictionary-based filtering so alphanumeric codes (PAN, IDs,
  // serial numbers) are not silently dropped as "not a real word".
  const baseParams = {
    preserve_interword_spaces: '1',
    tessedit_do_invert:        '0',
    load_system_dawg:          '0',   // no English word list filtering
    load_freq_dawg:            '0',   // no frequency-list filtering
  };

  onStatus('Starting OCR engine…');
  const worker = await getWorker(options.language, options.oem, onStatus);

  // ── Detection pre-pass ───────────────────────────────────────────────────
  // Fast, minimal-preprocessing scan to detect the document type.
  // Result is used ONLY for type detection — not kept in final output.
  onStatus('Detecting document type…');
  const { canvas: detectCanvas } = applyPreprocessing(img, {
    grayscale: true, contrast: false, sharpen: false,
    upscale: true, threshold: false, denoise: false,
  });
  await worker.setParameters({ ...baseParams, tessedit_pageseg_mode: '3' });
  const { data: dDetect } = await worker.recognize(detectCanvas, {}, { text: true });
  const detectedDocType = detectDocumentType((dDetect.text ?? '').trim());

  // ── Apply optimal strategy for detected doc type ─────────────────────────
  // Overrides PSM + preprocess + multiPass. Keeps user's language + confidenceFilter.
  const strategy = DOC_TYPE_OCR_STRATEGY[detectedDocType];
  const effectiveOptions: Options = {
    ...options,
    psm:        strategy.psm,
    multiPass:  strategy.multiPass,
    preprocess: strategy.preprocess,
  };

  onStatus(`Detected: ${DOC_TYPE_META[detectedDocType].label} — applying optimal settings…`);

  // ── Main OCR pass with optimal settings ──────────────────────────────────
  const { canvas, applied: preprocessApplied } = applyPreprocessing(img, effectiveOptions.preprocess);

  // ── PAN-specific binarization override ───────────────────────────────────
  // After standard preprocessing, apply the research-proven 102-threshold
  // binarization on top — eliminates the golden/coloured PAN background.
  // (dilippuri/PAN-Card-OCR uses exactly this pixel-level threshold.)
  if (detectedDocType === 'pan') {
    const panCtx = canvas.getContext('2d', { willReadFrequently: true })!;
    const panData = panCtx.getImageData(0, 0, canvas.width, canvas.height);
    panCtx.putImageData(panBinarize(panData), 0, 0);
  }

  const psmLabel = PSM_MODES.find(p => p.value === effectiveOptions.psm)?.label ?? 'Auto';

  onStatus('Recognizing… pass 1');
  await worker.setParameters({ ...baseParams, tessedit_pageseg_mode: effectiveOptions.psm });
  const { data: d1 } = await worker.recognize(canvas, {}, { text: true, blocks: true });
  // Apply quality gate to primary pass: drop pure-symbol single-char noise
  let allWords = extractWords(d1).filter(w => isUsableWord(w, 0, 1));
  const paragraphs = extractParagraphs(d1);

  // ── Pass 2: PSM 11 sparse text (finds text anywhere, bypasses layout) ────
  // Only merge words that have ≥50% confidence from this pass.
  // PSM 11 is aggressive — it sees decorative borders and QR edges as text.
  // The high confidence threshold keeps genuine missed text (PAN numbers,
  // codes on coloured backgrounds) while rejecting graphic noise.
  if (effectiveOptions.multiPass && effectiveOptions.psm !== '11') {
    onStatus('Recognizing… pass 2 (sparse scan)');
    await worker.setParameters({ ...baseParams, tessedit_pageseg_mode: '11' });
    const { data: d2 } = await worker.recognize(canvas, {}, { text: true, blocks: true });
    const extraWords = extractWords(d2);
    const beforeCount = allWords.length;
    // minExtraConf = 50: only trust new words if Tesseract is ≥50% confident
    allWords = mergeWordSets(allWords, extraWords, 50);
    if (allWords.length > beforeCount) {
      paragraphs.push(...extractParagraphs(d2));
    }
  }

  // ── Passport MRZ-specific pass ───────────────────────────────────────────
  // Runs a dedicated Tesseract pass with:
  //   • PSM 6 (uniform text block — MRZ zone is exactly this)
  //   • Character whitelist: A-Z 0-9 < (eliminates almost all noise)
  // This mirrors the EasyOCR allowlist used in Nihar3453/passport_ocr and
  // tem-ctrl/passport_ocr (both resize to 1110×140 and use the same whitelist).
  let mrzRawText = '';
  if (detectedDocType === 'passport') {
    onStatus('Extracting MRZ zone…');
    await worker.setParameters({
      ...baseParams,
      tessedit_pageseg_mode: '6',
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
    });
    const { data: dMrz } = await worker.recognize(canvas, {}, { text: true });
    mrzRawText = dMrz.text ?? '';
    // Reset whitelist so subsequent calls aren't affected
    await worker.setParameters({ tessedit_char_whitelist: '' });
  }

  // Reset to effective PSM for any future calls
  await worker.setParameters({ tessedit_pageseg_mode: effectiveOptions.psm });

  const t1 = performance.now();

  // ── Build final outputs ──────────────────────────────────────────────────
  const filteredWords = allWords.filter(
    w => w.confidence >= effectiveOptions.confidenceFilter && isUsableWord(w, 0, 1)
  );
  const wordsForText = filteredWords.length ? filteredWords : allWords;

  // Detect if multi-language model is active — if so, trust Tesseract's output
  // for non-Latin scripts rather than stripping "garbled" words.
  const isMultiLang = effectiveOptions.language.includes('+');

  // Build clean text: confidence-aware line filtering + garbled-word stripping
  const text = buildCleanText(wordsForText, isMultiLang);

  const confidence = allWords.length
    ? Math.round(allWords.reduce((s, w) => s + w.confidence, 0) / allWords.length)
    : 0;

  // Garbling analysis — used to show language suggestion in the UI
  const garbledRatio = isMultiLang ? 0 : computeGarbledRatio(allWords);
  const suggestLang = suggestLanguage(effectiveOptions.language, garbledRatio, confidence);

  const tableData = detectTableFromWords(filteredWords, img.naturalHeight);
  const hasTable = tableData !== null && tableData.length >= 3;

  const cleanedText = text.trim();
  const docType = detectDocumentType(cleanedText);

  // Smart field extraction: regex-based document fields + generic OCR KV blocks
  const docFields    = extractDocumentFields(cleanedText, docType, mrzRawText);
  const genericBlocks = parseStructuredBlocks(cleanedText);
  // Deduplicate: drop generic KVs whose key already captured by doc-specific extraction
  const docFieldKeys = new Set(docFields.map(f => f.key?.toLowerCase().replace(/\s+/g, '')));
  const filteredGeneric = genericBlocks.filter(b =>
    b.type !== 'kv' || !docFieldKeys.has(b.key?.toLowerCase().replace(/\s+/g, ''))
  );
  // Place docFields after the first heading block (if present) to preserve doc title
  const firstHeadIdx = filteredGeneric.findIndex(b => b.type === 'heading');
  const structuredBlocks: StructuredBlock[] = docFields.length
    ? (firstHeadIdx >= 0
      ? [...filteredGeneric.slice(0, firstHeadIdx + 1), ...docFields, ...filteredGeneric.slice(firstHeadIdx + 1)]
      : [...docFields, ...filteredGeneric])
    : filteredGeneric;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fileName: file.name,
    fileSize: file.size,
    imageUrl,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    text: cleanedText,
    paragraphs,
    words: filteredWords,
    confidence,
    wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
    charCount: cleanedText.replace(/\s/g, '').length,
    processingMs: Math.round(t1 - t0),
    language: effectiveOptions.language,
    psmLabel,
    autoStrategy: `${DOC_TYPE_META[detectedDocType].icon} ${DOC_TYPE_META[detectedDocType].label} — ${strategy.label}`,
    hasTable,
    tableData: hasTable ? tableData! : undefined,
    preprocessApplied,
    garbledRatio,
    suggestLang,
    docType,
    structuredBlocks,
    file,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(b: number) {
  return b < 1024 ? `${b}B` : b < 1048576 ? `${(b / 1024).toFixed(1)}KB` : `${(b / 1048576).toFixed(1)}MB`;
}

function confidenceColor(conf: number): string {
  if (conf >= 90) return 'text-emerald-700 bg-emerald-50';
  if (conf >= 70) return 'text-yellow-700 bg-yellow-50';
  if (conf >= 50) return 'text-orange-700 bg-orange-50';
  return 'text-red-700 bg-red-50';
}

function confidenceBg(conf: number): string {
  if (conf >= 90) return 'rgba(16,185,129,0.15)';
  if (conf >= 70) return 'rgba(245,158,11,0.18)';
  if (conf >= 50) return 'rgba(249,115,22,0.18)';
  return 'rgba(239,68,68,0.18)';
}

function copyToClipboard(text: string, onDone: () => void) {
  navigator.clipboard.writeText(text).then(onDone).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    onDone();
  });
}

function downloadText(text: string, fileName: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.replace(/\.[^.]+$/, '') + '_ocr.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJson(result: OcrResult) {
  const payload = {
    fileName: result.fileName,
    language: result.language,
    confidence: result.confidence,
    wordCount: result.wordCount,
    charCount: result.charCount,
    processingMs: result.processingMs,
    text: result.text,
    paragraphs: result.paragraphs.map(p => ({
      text: p.text,
      confidence: p.confidence,
      lines: p.lines.map(l => ({
        text: l.text,
        confidence: l.confidence,
        words: l.words.map(w => ({ text: w.text, confidence: w.confidence, bbox: w.bbox })),
      })),
    })),
    ...(result.hasTable ? { table: result.tableData } : {}),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = result.fileName.replace(/\.[^.]+$/, '') + '_ocr.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Document type detection ───────────────────────────────────────────────────

type DocType =
  | 'aadhaar' | 'pan' | 'passport' | 'driving_license' | 'voter_id'
  | 'invoice' | 'receipt' | 'medical' | 'insurance' | 'book' | 'general';

function detectDocumentType(text: string): DocType {
  const t = text.toLowerCase();

  // ── Identity documents — most specific first ───────────────────────────────
  if (/\b(aadhaar|aadhar|uidai|unique\s+identification\s+authority)\b/i.test(text)) return 'aadhaar';
  // Aadhaar number: 12 digits in 3 groups of 4
  if (/\b\d{4}\s\d{4}\s\d{4}\b/.test(text)) return 'aadhaar';

  if (/\b(permanent\s+account\s+number|income[\s-]tax\s+department)\b/i.test(text)) return 'pan';
  // PAN number pattern: ABCDE1234F, but only if accompanied by PAN context
  if (/\b[A-Z]{5}\d{4}[A-Z]\b/.test(text) && /\b(income|tax|pan|assessment)\b/i.test(text)) return 'pan';

  if (/\b(passport|republic\s+of\s+india|place\s+of\s+birth|place\s+of\s+issue|nationality)\b/i.test(text)) return 'passport';
  // MRZ line pattern — two 44-char machine-readable zone lines
  if (/[A-Z0-9<]{40,}/.test(text)) return 'passport';

  if (/\b(driving\s+licen|dl\s*no\.?|transport\s+dept|motor\s+vehicle|rto\b)\b/i.test(text)) return 'driving_license';

  if (/\b(election\s+commission|elector|epic\s+no|voter\s+id)\b/i.test(text)) return 'voter_id';

  // ── Financial documents ────────────────────────────────────────────────────
  if (/\b(invoice\b|bill\s+to|ship\s+to|gstin|gst\s*no\.?|invoice\s*no\.?|proforma)\b/i.test(text)) return 'invoice';
  if (/\b(receipt\b|subtotal|cgst|sgst|igst|qty\b|quantity\b|upi\b|amount\s+due|thank\s+you\s+for)\b/i.test(text)) return 'receipt';
  if (/\b(total\b|bill\s*no|item\b)\b/i.test(text) && /\b(price\b|rate\b|amount)\b/i.test(text)) return 'receipt';

  // ── Other categories ───────────────────────────────────────────────────────
  if (/\b(diagnosis|prescription|rx\b|patient\b|doctor\b|hospital|clinic|medicine|tablet|capsule|dosage|mg\b|discharge|laboratory|lab\s+report)\b/i.test(text)) return 'medical';
  if (/\b(policy\s*no|policy\s*number|insured\b|premium\b|sum\s+assured|nominee\b|coverage|irda|endorsement)\b/i.test(text)) return 'insurance';
  if (/\b(chapter\b|isbn|edition|publisher|bibliography|references)\b/i.test(text)) return 'book';

  return 'general';
}

// ── Document-specific field extraction ───────────────────────────────────────
// Extracts known fields using regex patterns for each document type.
// These supplement (and take precedence over) generic colon/pipe KV detection.

const DATE_PATTERNS = [
  /\b(\d{2}[\/\-.]\d{2}[\/\-.]\d{4})\b/,
  /\b(\d{4}[\/\-.]\d{2}[\/\-.]\d{2})\b/,
  /\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4})\b/i,
  /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4})\b/i,
  /\b(\d{2}[\/\-.]\d{2}[\/\-.]\d{2})\b/,
];

function extractFirstDate(str: string): string | null {
  for (const p of DATE_PATTERNS) { const m = str.match(p); if (m) return m[1]; }
  return null;
}

function extractFirstAmount(str: string): string | null {
  const m = str.match(/(?:₹|Rs\.?\s*|INR\s*|USD\s*|\$\s*|€\s*|£\s*)[\d,]+(?:\.\d{1,2})?/i)
          ?? str.match(/\b[\d,]+(?:\.\d{1,2})?\s*(?:₹|Rs\.?|INR)\b/i);
  return m ? m[0].trim() : null;
}

function extractDocumentFields(
  text: string,
  docType: DocType,
  mrzRawText = '',   // optional: output of whitelist-restricted MRZ OCR pass
): StructuredBlock[] {
  const fields: StructuredBlock[] = [];

  // Strip non-ASCII (garbled bytes confuse date/name parsing — per PAN-Card-OCR)
  const cleanText  = text.replace(/[^\x00-\x7F]/g, ' ');
  const lines      = cleanText.split('\n').map(l => l.trim()).filter(Boolean);

  const add = (key: string, value: string) => {
    const v = value.trim().replace(/^[:\-|]+\s*/, '').trim();
    if (v && v.length > 0) fields.push({ type: 'kv', content: `${key}: ${v}`, key, value: v });
  };

  const addUnique = (key: string, value: string) => {
    if (!fields.find(f => f.key === key)) add(key, value);
  };

  /* ── Shared date extractor ─────────────────────────────────────────────── */
  const extractFirstDate = (str: string): string | null => {
    for (const p of DATE_PATTERNS) { const m = str.match(p); if (m) return m[1]; }
    return null;
  };

  /* ── Shared amount extractor ────────────────────────────────────────────── */
  const extractFirstAmount = (str: string): string | null => {
    const m = str.match(/(?:₹|Rs\.?\s*|INR\s*|USD\s*|\$\s*|€\s*|£\s*)[\d,]+(?:\.\d{1,2})?/i)
            ?? str.match(/\b[\d,]+(?:\.\d{1,2})?\s*(?:₹|Rs\.?|INR)\b/i);
    return m ? m[0].trim() : null;
  };

  /* ── MRZ helpers (passport) ─────────────────────────────────────────────── */
  // Character corrections proven in Nihar3453/passport_ocr and tem-ctrl/passport_ocr
  const fixPassportNum = (s: string): string => {
    const firstCharFix: Record<string, string> = { '2':'Z', '5':'S', '0':'O', '1':'I', '8':'B' };
    return (firstCharFix[s[0]] ?? s[0]) + s.slice(1);
  };
  const fixCountryCode = (s: string): string => s.replace(/1/g, 'I').replace(/</g, '');
  const fixGender      = (c: string): string => {
    if (c === '0') return 'Male';
    if (c === 'M' || c === 'm') return 'Male';
    if (c === 'F' || c === 'f') return 'Female';
    return 'Unknown';
  };
  const parseMRZDate = (yymmdd: string, isBirth: boolean): string | null => {
    if (!/^\d{6}$/.test(yymmdd)) return null;
    const yy = parseInt(yymmdd.slice(0, 2));
    const currentYY = new Date().getFullYear() % 100;
    // Birth dates with yy > current 2-digit year → must be in 1900s
    const fullYear = isBirth
      ? (yy > currentYY ? 1900 + yy : 2000 + yy)
      : (yy < 30        ? 2000 + yy : 1900 + yy); // expiry unlikely to be past 2030
    return `${yymmdd.slice(4, 6)}/${yymmdd.slice(2, 4)}/${fullYear}`;
  };
  const cleanMRZName = (s: string): string =>
    s.replace(/</g, ' ').replace(/K{2,}/g, '').replace(/\d+/g, '').trim();

  // Parse one MRZ line pair and inject fields
  const parseMRZLines = (line1Raw: string, line2Raw: string) => {
    // Pad to 44 chars (as required — offsets depend on fixed width)
    const l1 = line1Raw.padEnd(44, '<').toUpperCase();
    const l2 = line2Raw.padEnd(44, '<').toUpperCase();

    // Line 1: doc-type(1) + subtype(1) + country(3) + surname<<givennames
    const nameField = l1.slice(5, 44);
    const parts     = nameField.split('<<', 2);
    const surname   = cleanMRZName(parts[0] ?? '');
    let   given     = cleanMRZName(parts[1] ?? '');
    // If given is empty, split surname (single-name holders)
    if (!given) {
      const ws = surname.split(/\s+/);
      if (ws.length >= 2) { given = ws.slice(1).join(' '); }
    }
    if (surname) addUnique('Surname (MRZ)', surname);
    if (given)   addUnique('Given Name (MRZ)', given);

    // Line 2 field offsets — TD3 passport (verified against both Nihar3453 and tem-ctrl repos)
    const passNum  = l2.slice(0, 9).replace(/</g, '');
    const nat      = l2.slice(10, 13);
    const dob6     = l2.slice(13, 19);
    const sex      = l2[20] ?? '';
    const expiry6  = l2.slice(21, 27);
    const personal = l2.slice(28, 42).replace(/</g, '');

    const fixedPass = passNum ? fixPassportNum(passNum) : '';
    if (fixedPass) addUnique('Passport No. (MRZ)', fixedPass);
    if (nat)       addUnique('Nationality (MRZ)', fixCountryCode(nat));
    const dobStr = parseMRZDate(dob6, true);
    if (dobStr)    addUnique('DOB (MRZ)', dobStr);
    const gender = sex ? fixGender(sex) : '';
    if (gender && gender !== 'Unknown') addUnique('Sex (MRZ)', gender);
    const expStr = parseMRZDate(expiry6, false);
    if (expStr)    addUnique('Expiry (MRZ)', expStr);
    if (personal && personal.length > 2) addUnique('Personal No.', personal);
  };

  // Find MRZ lines: 30+ chars of A-Z, 0-9, <
  const findMRZLines = (rawText: string): string[] =>
    rawText.split('\n')
      .map(l => l.trim())
      .filter(l => l.length >= 30 && /^[A-Z0-9<]+$/.test(l.replace(/\s/g, '')));

  /* ──────────────────────────────────────────────────────────────────────── */
  /* ── Aadhaar ─────────────────────────────────────────────────────────── */
  if (docType === 'aadhaar') {
    // Exact 4-space-4-space-4 format (wasdac9/aadhaar-ocr uses this exact regex)
    const uidMatch = cleanText.match(/\b(\d{4} \d{4} \d{4})\b/)
                  ?? cleanText.match(/\b(\d{4}[\s\-]\d{4}[\s\-]\d{4})\b/);
    if (uidMatch) add('Aadhaar No.', uidMatch[1].replace(/[\s\-]+/g, ' '));

    // VID (16-digit Virtual ID)
    const vidMatch = cleanText.match(/\bVID\s*:?\s*(\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4})\b/i);
    if (vidMatch) add('VID', vidMatch[1].replace(/\s/g, ' '));

    // Date of Birth (exact wasdac9 pattern: DD/MM/YYYY)
    const dobExact = cleanText.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
    if (dobExact) add('Date of Birth', dobExact[1]);
    else {
      const dobLine = lines.find(l => /\b(dob|date\s+of\s+birth|birth\s+date)\b/i.test(l));
      if (dobLine) { const d = extractFirstDate(dobLine); if (d) add('Date of Birth', d); }
    }

    // Gender (case-insensitive, wasdac9 pattern)
    const gLine = lines.find(l => /\b(male|female|third\s+gender)\b/i.test(l));
    if (gLine) { const g = gLine.match(/\b(male|female|third\s+gender)\b/i); if (g) add('Gender', g[0]); }

    // Mobile: 10-digit number that is NOT the UID
    const uid12 = uidMatch ? uidMatch[1].replace(/\D/g, '') : '';
    const mobMatch = cleanText.match(/\b(\d{10})\b/g);
    const mobile = (mobMatch ?? []).find(m => m !== uid12);
    if (mobile) add('Mobile', mobile);

    // Name: title-case 2-4 word run, not a keyword
    // wasdac9 uses NER → fallback: first group of [A-Z][a-z]+ tokens
    const SKIP = new Set(['Date','Birth','Year','Government','India','Male','Female','Address',
      'Aadhaar','Village','Post','District','State','Pin','Number','Issued']);
    const titleTokens = (cleanText.match(/\b[A-Z][a-z]{1,}\b/g) ?? [])
      .filter(t => !SKIP.has(t) && t.length > 1);
    if (titleTokens.length >= 2) add('Name', titleTokens.slice(0, 3).join(' '));

    return fields;
  }

  /* ── PAN Card ────────────────────────────────────────────────────────────── */
  if (docType === 'pan') {
    // PAN number: AAAAA1234A format
    const panMatch = cleanText.match(/\b([A-Z]{5}\d{4}[A-Z])\b/);
    if (panMatch) add('PAN Number', panMatch[1]);

    // Strip non-ASCII before line-based analysis (dilippuri/PAN-Card-OCR does this)
    // Header detection: look for govt/income-tax header line
    const govRe = /GOVERNMENT|OVERNMENT|VERNMENT|DEPARTMENT|EPARTMENT|INDIA|NDIA/;
    const numRe = /Number|umber|Account|ccount|Permanent|ermanent/;
    const headerIdx = lines.findIndex(l => govRe.test(l) || numRe.test(l));
    const postHeader = headerIdx >= 0 ? lines.slice(headerIdx + 1) : lines;

    // Name and Father's Name: first two title-case-starting lines after header
    // (dilippuri logic: nameline[0] = name, nameline[1] = father's name)
    const nameLines = postHeader
      .filter(l => /^[A-Z][a-z]/.test(l) && l.length > 2 && !/^\d/.test(l));
    if (nameLines[0]) add('Name', nameLines[0]);
    if (nameLines[1]) add("Father's Name", nameLines[1]);

    // DOB — date pattern anywhere in text
    const dobLine = lines.find(l => /\b(dob|date\s+of\s+birth)\b/i.test(l) && extractFirstDate(l));
    const dob = dobLine
      ? extractFirstDate(dobLine)
      : lines.map(extractFirstDate).find(Boolean);
    if (dob) add('Date of Birth', dob!);

    return fields;
  }

  /* ── Passport ────────────────────────────────────────────────────────────── */
  if (docType === 'passport') {
    // Visual-layer fields first (parsed from main OCR text)
    const pnoMatch = cleanText.match(/\b([A-Z]\d{7})\b/);
    if (pnoMatch) add('Passport No.', fixPassportNum(pnoMatch[1]));

    const natLine  = lines.find(l => /nationality/i.test(l));
    if (natLine) {
      const v = natLine.replace(/nationality/i, '').replace(/[:\/]/g, '').trim();
      if (v) add('Nationality', v);
    }

    const dobLine  = lines.find(l => /date.*birth|dob/i.test(l));
    if (dobLine) { const d = extractFirstDate(dobLine); if (d) add('Date of Birth', d); }

    const expLine  = lines.find(l => /expir|valid\s+until|date\s+of\s+expiry/i.test(l));
    if (expLine)  { const d = extractFirstDate(expLine); if (d) add('Date of Expiry', d); }

    const issLine  = lines.find(l => /date\s+of\s+issue|issued/i.test(l));
    if (issLine)  { const d = extractFirstDate(issLine); if (d) add('Date of Issue', d); }

    // Date of Issue by elimination: 3rd date found ≠ DOB and ≠ Expiry
    // (Nihar3453/passport_ocr: date_strings = findall, remove dob + expiry → issue)
    if (!fields.find(f => f.key === 'Date of Issue')) {
      const knownDOB    = fields.find(f => f.key === 'Date of Birth')?.value;
      const knownExpiry = fields.find(f => f.key === 'Date of Expiry')?.value;
      const allDates    = lines.flatMap(l => {
        const m: string[] = [];
        for (const p of DATE_PATTERNS) { const r = l.match(p); if (r) m.push(r[1]); }
        return m;
      });
      const issueDate = allDates.find(d => d !== knownDOB && d !== knownExpiry);
      if (issueDate) add('Date of Issue', issueDate);
    }

    const pobLine  = lines.find(l => /place.*birth/i.test(l));
    if (pobLine)  {
      const v = pobLine.replace(/place\s+of\s+birth/i, '').replace(/[:\/]/g, '').trim();
      if (v) add('Place of Birth', v);
    }

    const poiLine  = lines.find(l => /place.*issue/i.test(l));
    if (poiLine)  {
      const v = poiLine.replace(/place\s+of\s+issue/i, '').replace(/[:\/]/g, '').trim();
      if (v) add('Place of Issue', v);
    }

    const sexLine  = lines.find(l => /\b(sex|gender)\b/i.test(l));
    if (sexLine) {
      const g = sexLine.match(/\b(male|female|m\b|f\b)/i);
      if (g) add('Sex', fixGender(g[0].toUpperCase()));
    }

    // MRZ parsing — prefer the dedicated whitelist pass (mrzRawText)
    // if not available fall back to main OCR text
    const mrzSource = mrzRawText.length > 10 ? mrzRawText : cleanText;
    const mrzLines  = findMRZLines(mrzSource);
    if (mrzLines.length >= 2) {
      parseMRZLines(mrzLines[0], mrzLines[1]);
    } else if (mrzLines.length === 1 && mrzRawText.length > 10) {
      // Sometimes the two MRZ lines appear on the same text line separated by space
      const single = mrzLines[0];
      if (single.length >= 80) parseMRZLines(single.slice(0, 44), single.slice(44));
    }

    return fields;
  }

  /* ── Driving License ─────────────────────────────────────────────────────── */
  if (docType === 'driving_license') {
    const dlMatch = cleanText.match(/\b((?:DL|[A-Z]{2})[\s\-]?\d{2}[\s\-]?\d{4,11})\b/i)
                 ?? cleanText.match(/\b([A-Z]{2}\d{2}[\s\-]?\d{4,11})\b/);
    if (dlMatch) add('DL Number', dlMatch[1].replace(/\s+/g, ' '));

    const dobLine = lines.find(l => /\b(dob|date\s+of\s+birth)\b/i.test(l));
    if (dobLine) { const d = extractFirstDate(dobLine); if (d) add('Date of Birth', d); }

    const validLine = lines.find(l => /valid\s*(till|until|upto)/i.test(l));
    if (validLine) { const d = extractFirstDate(validLine); if (d) add('Valid Till', d); }

    const bgMatch = cleanText.match(/\b(A|B|AB|O)[+\-]\b/);
    if (bgMatch) add('Blood Group', bgMatch[0]);

    const classLine = lines.find(l => /class\s+of\s+vehicle|vehicle\s+class/i.test(l));
    if (classLine) add('Vehicle Class', classLine.replace(/class\s+of\s+vehicle/i, '').replace(/[:\/]/g, '').trim());

    return fields;
  }

  /* ── Voter ID ──────────────────────────────────────────────────────────────── */
  if (docType === 'voter_id') {
    const epicMatch = cleanText.match(/\b(?:EPIC|Voter\s*ID)[\s:]*([A-Z]{3}\d{7})\b/i)
                   ?? cleanText.match(/\b([A-Z]{3}\d{7})\b/);
    if (epicMatch) add('EPIC No.', epicMatch[1]);

    const dobLine = lines.find(l => /\b(dob|date\s+of\s+birth)\b/i.test(l));
    if (dobLine) { const d = extractFirstDate(dobLine); if (d) add('Date of Birth', d); }

    const gLine = lines.find(l => /\b(male|female)\b/i.test(l));
    if (gLine) { const g = gLine.match(/\b(male|female)\b/i); if (g) add('Gender', g[0]); }

    return fields;
  }

  /* ── Invoice / Receipt ─────────────────────────────────────────────────────── */
  if (docType === 'invoice' || docType === 'receipt') {
    const invMatch = cleanText.match(/(?:invoice|bill|receipt|order|ref)[\s.]*(?:no\.?|number|#|id)\s*:?\s*([A-Z0-9\/\-]+)/i)
                  ?? cleanText.match(/^(?:no\.?|#)\s*:?\s*([A-Z0-9\/\-]{3,})/im);
    if (invMatch) add(docType === 'invoice' ? 'Invoice No.' : 'Receipt No.', invMatch[1]);

    const dateLine = lines.find(l => /\bdate\b/i.test(l) && extractFirstDate(l));
    if (dateLine) { const d = extractFirstDate(dateLine); if (d) add('Date', d); }

    const dueLine = lines.find(l => /due\s+date|payment\s+due/i.test(l));
    if (dueLine) { const d = extractFirstDate(dueLine); if (d) add('Due Date', d); }

    // GSTIN: 15-char Indian GST number
    const gstMatch = cleanText.match(/\b(?:GSTIN|GST\s*No\.?)\s*:?\s*(\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z])\b/i)
                  ?? cleanText.match(/\b(\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z])\b/);
    if (gstMatch) add('GSTIN', gstMatch[1]);

    const panMatch2 = cleanText.match(/\b(?:PAN\s*(?:no\.?)?)?\s*:?\s*([A-Z]{5}\d{4}[A-Z])\b/i);
    if (panMatch2) add('PAN', panMatch2[1]);

    // Grand total — highest priority
    const totalLine = lines.find(l => /(?:grand\s+)?total\b/i.test(l) && extractFirstAmount(l));
    if (totalLine) { const a = extractFirstAmount(totalLine); if (a) add('Grand Total', a); }

    const subLine = lines.find(l => /sub[\s\-]?total/i.test(l) && extractFirstAmount(l));
    if (subLine) { const a = extractFirstAmount(subLine); if (a) add('Subtotal', a); }

    for (const taxKey of ['CGST', 'SGST', 'IGST', 'GST', 'VAT', 'Tax']) {
      const taxLine = lines.find(l =>
        new RegExp('\\b' + taxKey + '\\b', 'i').test(l) &&
        extractFirstAmount(l) && !/grand|total|subtotal/i.test(l)
      );
      if (taxLine) { const a = extractFirstAmount(taxLine); if (a) add(taxKey.toUpperCase(), a); }
    }

    const discLine = lines.find(l => /discount\b/i.test(l) && extractFirstAmount(l));
    if (discLine) { const a = extractFirstAmount(discLine); if (a) add('Discount', a); }

    const payLine = lines.find(l => /\b(cash|card|upi|neft|rtgs|cheque|online)\b/i.test(l));
    if (payLine) { const m = payLine.match(/\b(cash|card|upi|neft|rtgs|cheque|online)\b/i); if (m) add('Payment Mode', m[0]); }

    return fields;
  }

  /* ── Medical ───────────────────────────────────────────────────────────────── */
  if (docType === 'medical') {
    // Patient name
    const patLine = lines.find(l => /patient[\s.]*(?:name)?/i.test(l));
    if (patLine) {
      const v = patLine.replace(/patient[\s.]*(?:name)?/i, '').replace(/[:|]/g, '').trim();
      if (v && v.length > 2) add('Patient Name', v);
    }

    // Age
    const ageLine = lines.find(l => /\bage\s*[:\/]?\s*\d+/i.test(l));
    if (ageLine) {
      const m = ageLine.match(/\bage\s*[:\/]?\s*(\d+\s*(?:yrs?\.?|years?)?)/i);
      if (m) add('Age', m[1].trim());
    }

    // Doctor — "Dr. Firstname Lastname" pattern (JonSnow1807 uses this exact regex)
    const DOCTOR_RE = /\bDr\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g;
    const drMatches = cleanText.match(DOCTOR_RE);
    if (drMatches) add('Doctor', drMatches[0]);
    else {
      const drLine = lines.find(l => /doctor[\s.]*(?:name)?/i.test(l));
      if (drLine) {
        const v = drLine.replace(/doctor[\s.]*(?:name)?/i, '').replace(/[:|]/g, '').trim();
        if (v && v.length > 2) add('Doctor', v);
      }
    }

    // Date
    const dateLine = lines.find(l => /\bdate\b/i.test(l) && extractFirstDate(l));
    if (dateLine) { const d = extractFirstDate(dateLine); if (d) add('Date', d); }

    // Hospital / Clinic name
    const hospLine = lines.find(l => /hospital|clinic|medical\s+cent(?:re|er)|health\s+care/i.test(l));
    if (hospLine) add('Hospital / Clinic', hospLine);

    // Prescription Rx number
    const rxMatch = cleanText.match(/\bRx\s*(?:no\.?|#)?\s*:?\s*([A-Z0-9\-\/]+)/i);
    if (rxMatch) add('Rx No.', rxMatch[1]);

    // Dosage: e.g. "500mg", "10ml", "2 tablets" (JonSnow1807 DOSAGE_RE)
    const DOSAGE_RE = /\d+\s*(?:mg|ml|mcg|g\b|iu|units?|tablets?|caps?|capsules?|drops?)/gi;
    const dosages = cleanText.match(DOSAGE_RE);
    if (dosages && dosages.length > 0) add('Dosage(s) Found', dosages.slice(0, 4).join(' · '));

    // Frequency: "once daily", "twice a day", "3 times daily"
    const FREQ_RE = /(?:once|twice|thrice|\d+\s*times?)\s*(?:daily|a\s*day|per\s*day)/gi;
    const freqs = cleanText.match(FREQ_RE);
    if (freqs && freqs.length > 0) add('Frequency', freqs[0]);

    // Medical keyword confidence score (document classification check)
    const MEDICAL_KEYWORDS = ['prescribed','take','mg','ml','capsule','dosage','tablet',
      'pharmacy','clinic','medicine','drug','syrup','once daily','twice daily'];
    const kwHits = MEDICAL_KEYWORDS.filter(kw => cleanText.toLowerCase().includes(kw)).length;
    if (kwHits >= 3) add('Document Type', 'Medical Prescription');

    return fields;
  }

  /* ── Insurance ─────────────────────────────────────────────────────────────── */
  if (docType === 'insurance') {
    const polMatch = cleanText.match(/policy\s*(?:no\.?|number)\s*:?\s*([A-Z0-9\-\/]+)/i);
    if (polMatch) add('Policy No.', polMatch[1]);

    const insuredLine = lines.find(l => /insured[\s.]*(?:name)?/i.test(l));
    if (insuredLine) {
      const v = insuredLine.replace(/insured[\s.]*(?:name)?/i, '').replace(/[:|]/g, '').trim();
      if (v && v.length > 2) add('Insured Name', v);
    }

    const premLine = lines.find(l => /premium\b/i.test(l) && extractFirstAmount(l));
    if (premLine) { const a = extractFirstAmount(premLine); if (a) add('Premium', a); }

    const sumLine = lines.find(l => /sum\s*(?:assured|insured)\b/i.test(l) && extractFirstAmount(l));
    if (sumLine) { const a = extractFirstAmount(sumLine); if (a) add('Sum Assured', a); }

    const vfLine = lines.find(l => /valid\s*from|inception|commencement/i.test(l));
    if (vfLine) { const d = extractFirstDate(vfLine); if (d) add('Valid From', d); }

    const vtLine = lines.find(l => /valid\s*(?:till|to|until)|expiry/i.test(l));
    if (vtLine) { const d = extractFirstDate(vtLine); if (d) add('Valid Till', d); }

    const nomLine = lines.find(l => /nominee/i.test(l));
    if (nomLine) {
      const v = nomLine.replace(/nominee/i, '').replace(/[:|]/g, '').trim();
      if (v && v.length > 2) add('Nominee', v);
    }

    return fields;
  }

  return fields; // no-op for 'book' and 'general'
}

// ── Structured block types & parser ──────────────────────────────────────────

interface StructuredBlock {
  type: 'heading' | 'subheading' | 'kv' | 'paragraph' | 'listItem' | 'divider' | 'highlight';
  content: string;
  key?: string;
  value?: string;
}

/** Returns true if a line looks like a field label (short, no terminal punctuation, no long numbers) */
function parseStructuredBlocks(text: string): StructuredBlock[] {
  const rawLines = text.split('\n').map(l => l.trim()).filter(l => l.length > 1);
  const blocks: StructuredBlock[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i];

    // ── Dividers ──────────────────────────────────────────────────────────────
    if (/^[-=_*~]{3,}$/.test(line)) {
      blocks.push({ type: 'divider', content: line });
      i++; continue;
    }

    // ── Explicit KV: "Key: Value" or "Key | Value"
    // Key must be short (≤35 chars), no sentence punctuation, not ALL-CAPS prose
    const kvMatch = line.match(/^([^:|]{2,35}?)\s*[:|]\s*(.{1,120})$/);
    if (kvMatch) {
      const rawKey = kvMatch[1].trim();
      const rawVal = kvMatch[2].trim();
      const keyLetters = rawKey.replace(/[^a-zA-Z]/g, '');
      const isAllCaps = keyLetters.length >= 2 && keyLetters === keyLetters.toUpperCase();
      const hasSentencePunct = /[.,;!?]/.test(rawKey);
      const wordCount = rawKey.split(/\s+/).length;
      // Accept as KV only if it looks like a form label (short, no sentence punct, ≤5 words)
      if (!hasSentencePunct && wordCount <= 5 && !isAllCaps) {
        blocks.push({ type: 'kv', content: line, key: rawKey, value: rawVal });
        i++; continue;
      }
    }

    // ── Heading: short ALL-CAPS title lines (≤8 words, ≤60 chars)
    const lettersOnly = line.replace(/[^a-zA-Z]/g, '');
    const wordCount   = line.split(/\s+/).length;
    if (lettersOnly.length >= 2 && lettersOnly === lettersOnly.toUpperCase() &&
        line.length <= 60 && wordCount <= 8) {
      blocks.push({ type: 'heading', content: line });
      i++; continue;
    }

    // ── List items ────────────────────────────────────────────────────────────
    if (/^[•\-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
      const content = line.replace(/^[•\-*\d.)\s]+/, '').trim();
      blocks.push({ type: 'listItem', content });
      i++; continue;
    }

    // ── Highlight: total / amount lines ───────────────────────────────────────
    if (line.length <= 60 &&
        /\b(total|grand\s*total|net\s*amount|amount\s*due|rs\.?|inr\b|₹|\$|€|£)/i.test(line)) {
      blocks.push({ type: 'highlight', content: line });
      i++; continue;
    }

    // ── Paragraph: everything else ────────────────────────────────────────────
    blocks.push({ type: 'paragraph', content: line });
    i++;
  }

  return blocks;
}

/** Serialize structured blocks to Markdown */
function blocksToMarkdown(blocks: StructuredBlock[]): string {
  return blocks.map(b => {
    if (b.type === 'heading')    return `# ${b.content}`;
    if (b.type === 'subheading') return `## ${b.content}`;
    if (b.type === 'kv')         return `**${b.key}**: ${b.value}`;
    if (b.type === 'paragraph')  return b.content;
    if (b.type === 'listItem')   return `- ${b.content}`;
    if (b.type === 'divider')    return '---';
    if (b.type === 'highlight')  return `> **${b.content}**`;
    return b.content;
  }).join('\n\n');
}

// ── Document-type metadata (icon, label, badge colours) ──────────────────────
const DOC_TYPE_META: Record<DocType, { icon: string; label: string; cls: string }> = {
  aadhaar:         { icon: '🪪', label: 'Aadhaar Card',     cls: 'text-blue-700 bg-blue-50 border-blue-200' },
  pan:             { icon: '💳', label: 'PAN Card',          cls: 'text-orange-700 bg-orange-50 border-orange-200' },
  passport:        { icon: '📘', label: 'Passport',          cls: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  driving_license: { icon: '🚗', label: 'Driving License',   cls: 'text-teal-700 bg-teal-50 border-teal-200' },
  voter_id:        { icon: '🗳️', label: 'Voter ID',           cls: 'text-purple-700 bg-purple-50 border-purple-200' },
  invoice:         { icon: '🧾', label: 'Invoice',           cls: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  receipt:         { icon: '🧾', label: 'Receipt',           cls: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  medical:         { icon: '🏥', label: 'Medical',           cls: 'text-red-700 bg-red-50 border-red-200' },
  insurance:       { icon: '📋', label: 'Insurance',         cls: 'text-violet-700 bg-violet-50 border-violet-200' },
  book:            { icon: '📖', label: 'Book / Article',    cls: 'text-amber-700 bg-amber-50 border-amber-200' },
  general:         { icon: '📄', label: 'Document',          cls: 'text-zinc-600 bg-zinc-50 border-zinc-200' },
};

// ── Per-document optimal OCR strategy ────────────────────────────────────────
// Auto-applied after a fast detection pre-pass identifies the document type.
// Language and confidenceFilter come from user options and are never overridden.
const DOC_TYPE_OCR_STRATEGY: Record<DocType, {
  psm: string;
  multiPass: boolean;
  preprocess: Options['preprocess'];
  label: string;
}> = {
  // PSM 4 (single column) for Aadhaar/PAN — proven better for name extraction in
  // wasdac9/aadhaar-ocr and dilippuri/PAN-Card-OCR.
  // PAN uses threshold:true → triggers the 102-channel binarize in runOCR (golden bg).
  aadhaar:         { psm: '4', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: false, denoise: false }, label: 'Aadhaar — PSM 4 single-column + upscale + multi-pass' },
  pan:             { psm: '4', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: true,  denoise: false }, label: 'PAN Card — PSM 4 + 102-threshold binarize'            },
  // Passport: PSM 3 main + dedicated MRZ pass (PSM 6 + char whitelist) in runOCR
  passport:        { psm: '3', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: false, upscale: true,  threshold: false, denoise: false }, label: 'Passport — auto-layout + MRZ zone pass'              },
  driving_license: { psm: '4', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: false, denoise: false }, label: 'DL — PSM 4 single-column + upscale'                 },
  voter_id:        { psm: '4', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: false, denoise: false }, label: 'Voter ID — PSM 4 single-column + upscale'           },
  invoice:         { psm: '3', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: false, upscale: true,  threshold: false, denoise: false }, label: 'Invoice — table-aware auto layout + multi-pass'      },
  receipt:         { psm: '4', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: false, upscale: true,  threshold: false, denoise: false }, label: 'Receipt — single-column layout + multi-pass'         },
  medical:         { psm: '3', multiPass: true,  preprocess: { grayscale: true,  contrast: false, sharpen: false, upscale: true,  threshold: false, denoise: true  }, label: 'Medical — gentle + denoise (preserve handwriting)'   },
  insurance:       { psm: '3', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: false, denoise: false }, label: 'Document — upscale + contrast + multi-pass'         },
  book:            { psm: '6', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: true,  upscale: true,  threshold: false, denoise: true  }, label: 'Book — uniform-block PSM + denoise + multi-pass'     },
  general:         { psm: '3', multiPass: true,  preprocess: { grayscale: true,  contrast: true,  sharpen: false, upscale: false, threshold: false, denoise: false }, label: 'Auto — balanced defaults'                           },
};

// ── Structured renderer ───────────────────────────────────────────────────────
//
// Sections pipeline:
//  • 'fields'  – consecutive explicit KV pairs  → card grid
//  • 'prose'   – consecutive paragraphs          → merged flowing text
//  • 'list'    – consecutive listItems           → bullet list
//  • Single blocks: heading, subheading, highlight, divider

type StructSection =
  | { kind: 'fields';    items: StructuredBlock[] }
  | { kind: 'prose';     paras: string[]           }
  | { kind: 'list';      items: string[]           }
  | { kind: 'heading';   text: string              }
  | { kind: 'subheading'; text: string             }
  | { kind: 'highlight'; text: string              }
  | { kind: 'divider'                              };

function toSections(blocks: StructuredBlock[]): StructSection[] {
  const out: StructSection[] = [];
  let proseRun: string[]         = [];
  let fieldRun: StructuredBlock[] = [];
  let listRun:  string[]         = [];

  /* Join consecutive OCR line-fragments into readable paragraphs */
  const flushProse = () => {
    if (!proseRun.length) return;
    const paras: string[] = [];
    let cur = '';
    for (const line of proseRun) {
      if (!cur) { cur = line; }
      else if (/[.!?]$/.test(cur)) { paras.push(cur); cur = line; }
      else { cur += ' ' + line; }
    }
    if (cur) paras.push(cur);
    out.push({ kind: 'prose', paras });
    proseRun = [];
  };
  const flushFields = () => {
    if (fieldRun.length) { out.push({ kind: 'fields', items: [...fieldRun] }); fieldRun = []; }
  };
  const flushList = () => {
    if (listRun.length) { out.push({ kind: 'list', items: [...listRun] }); listRun = []; }
  };
  const flush = () => { flushProse(); flushFields(); flushList(); };

  for (const b of blocks) {
    switch (b.type) {
      case 'paragraph':  flushFields(); flushList();  proseRun.push(b.content);  break;
      case 'kv':         flushProse();  flushList();  fieldRun.push(b);           break;
      case 'listItem':   flushProse();  flushFields(); listRun.push(b.content);  break;
      default:
        flush();
        if (b.type === 'heading')    out.push({ kind: 'heading',    text: b.content });
        if (b.type === 'subheading') out.push({ kind: 'subheading', text: b.content });
        if (b.type === 'highlight')  out.push({ kind: 'highlight',  text: b.content });
        if (b.type === 'divider')    out.push({ kind: 'divider' });
    }
  }
  flush();
  return out;
}

function StructuredBlockView({ blocks }: { blocks: StructuredBlock[] }) {
  if (!blocks.length) {
    return (
      <div className="flex flex-col items-center justify-center h-36 gap-3 text-center">
        <span className="text-5xl opacity-20">📄</span>
        <p className="text-sm font-medium text-zinc-400">No structured content found</p>
        <p className="text-xs text-zinc-300">Switch to Plain to see raw extracted text</p>
      </div>
    );
  }

  const sections = toSections(blocks);

  return (
    <div className="space-y-5 py-0.5">
      {sections.map((sec, si) => {

        /* ── Document fields: beautiful card grid ────────────────────────── */
        if (sec.kind === 'fields') {
          return (
            <div key={si} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sec.items.map((b, bi) => (
                <div
                  key={bi}
                  className="group rounded-xl border border-zinc-150 bg-white px-4 py-3.5
                             hover:border-violet-200 hover:bg-violet-50/30 hover:shadow-sm
                             transition-all duration-150 cursor-default"
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-zinc-350
                                group-hover:text-violet-500 transition-colors mb-1.5 leading-none select-none"
                     style={{ color: 'rgb(161 161 170)' }}>
                    {b.key}
                  </p>
                  <p className="text-[15px] font-semibold text-zinc-900 leading-snug break-words">
                    {b.value}
                  </p>
                </div>
              ))}
            </div>
          );
        }

        /* ── Flowing prose ───────────────────────────────────────────────── */
        if (sec.kind === 'prose') {
          return (
            <div key={si} className="space-y-[1.1em]">
              {sec.paras.map((para, pi) => (
                <p key={pi}
                   className="text-[14.5px] text-zinc-800 leading-[1.85] tracking-[0.005em]
                              [text-rendering:optimizeLegibility]">
                  {para}
                </p>
              ))}
            </div>
          );
        }

        /* ── Bullet list ─────────────────────────────────────────────────── */
        if (sec.kind === 'list') {
          return (
            <ul key={si} className="space-y-2">
              {sec.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-3 text-[14px] text-zinc-700 leading-relaxed">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        /* ── Section heading ─────────────────────────────────────────────── */
        if (sec.kind === 'heading') {
          return (
            <div key={si} className="pt-1">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                {sec.text}
              </h3>
              <div className="mt-1.5 h-[2px] w-8 rounded-full bg-violet-400" />
            </div>
          );
        }

        /* ── Sub-heading ─────────────────────────────────────────────────── */
        if (sec.kind === 'subheading') {
          return (
            <h4 key={si} className="text-sm font-bold text-zinc-800 leading-snug">
              {sec.text}
            </h4>
          );
        }

        /* ── Highlighted total / amount ──────────────────────────────────── */
        if (sec.kind === 'highlight') {
          return (
            <div key={si}
                 className="flex items-center gap-3.5 rounded-2xl
                            bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50
                            border border-emerald-200 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg shadow-sm">
                💰
              </div>
              <span className="text-base font-bold text-emerald-800">{sec.text}</span>
            </div>
          );
        }

        /* ── Divider ─────────────────────────────────────────────────────── */
        if (sec.kind === 'divider') {
          return <hr key={si} className="border-dashed border-zinc-200" />;
        }

        return null;
      })}
    </div>
  );
}

// ── BBox Overlay Canvas ───────────────────────────────────────────────────────

function BBoxOverlay({ result, imgDisplayW, imgDisplayH }: {
  result: OcrResult;
  imgDisplayW: number;
  imgDisplayH: number;
}) {
  const scaleX = imgDisplayW / result.naturalWidth;
  const scaleY = imgDisplayH / result.naturalHeight;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={imgDisplayW}
      height={imgDisplayH}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {result.words.map((w, i) => (
        <g key={i}>
          <rect
            x={w.bbox.x0 * scaleX}
            y={w.bbox.y0 * scaleY}
            width={(w.bbox.x1 - w.bbox.x0) * scaleX}
            height={(w.bbox.y1 - w.bbox.y0) * scaleY}
            fill={confidenceBg(w.confidence)}
            stroke={w.confidence >= 90 ? '#059669' : w.confidence >= 70 ? '#d97706' : '#ef4444'}
            strokeWidth="0.8"
            rx="1"
          />
        </g>
      ))}
    </svg>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────

function ResultCard({
  result,
  outputMode,
  confidenceFilter,
  showBboxOverlay,
  onRemove,
  onSwitchLang,
}: {
  result: OcrResult;
  outputMode: Options['outputMode'];
  confidenceFilter: number;
  showBboxOverlay: boolean;
  onRemove: () => void;
  onSwitchLang?: (lang: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imgDisplaySize, setImgDisplaySize] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [showFullImg, setShowFullImg] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'structured' | 'confidence' | 'table'>(
    outputMode === 'table' && result.hasTable ? 'table' : 'structured'
  );

  useEffect(() => {
    const updateSize = () => {
      if (imgRef.current) {
        setImgDisplaySize({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleCopy = () => {
    copyToClipboard(result.text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyMarkdown = () => {
    copyToClipboard(blocksToMarkdown(result.structuredBlocks), () => {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    });
  };

  const visibleWords = result.words.filter(w => w.confidence >= confidenceFilter);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-md overflow-hidden">

      {/* ── Card header ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100">
            <ImageIcon className="h-4 w-4 text-violet-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 truncate leading-tight">{result.fileName}</p>
            <p className="text-[11px] text-zinc-400 leading-tight">{formatBytes(result.fileSize)} · {result.naturalWidth}×{result.naturalHeight}px</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end ml-3">
          {result.docType !== 'general' && (
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${DOC_TYPE_META[result.docType].cls}`}>
              {DOC_TYPE_META[result.docType].icon} {DOC_TYPE_META[result.docType].label}
            </span>
          )}
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${confidenceColor(result.confidence)}`}>
            {result.confidence}% confidence
          </span>
          <button
            onClick={onRemove}
            className="ml-1 rounded-lg p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Auto-strategy banner ──────────────────────────────────────────────── */}
      <div className="px-4 py-2 border-b border-zinc-100 bg-gradient-to-r from-violet-50/60 to-indigo-50/40 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-violet-500 shrink-0">Auto</span>
        <span className="text-[11px] text-zinc-500 truncate">{result.autoStrategy}</span>
      </div>

      {/* ── Stats strip ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-0 border-b border-zinc-100 divide-x divide-zinc-100 bg-zinc-50/60">
        {[
          { icon: '📝', label: 'Words',    value: result.wordCount },
          { icon: '🔤', label: 'Chars',    value: result.charCount },
          { icon: '⏱️', label: 'Time',     value: `${(result.processingMs / 1000).toFixed(1)}s` },
          { icon: '🌐', label: 'Language', value: result.language },
        ].map(s => (
          <div key={s.label} className="flex-1 px-3 py-2 text-center min-w-0">
            <p className="text-xs font-bold text-zinc-800 truncate">{s.value}</p>
            <p className="text-[10px] text-zinc-400 leading-none mt-0.5">{s.label}</p>
          </div>
        ))}
        {result.preprocessApplied.length > 0 && (
          <div className="px-3 py-2 flex flex-wrap gap-1 items-center">
            {result.preprocessApplied.map(p => (
              <span key={p} className="rounded-full border border-violet-100 bg-violet-50 px-1.5 py-px text-[10px] font-medium text-violet-600">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Two-pane body ─────────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-[5fr_7fr] divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

        {/* ── Left: Image preview ──────────────────────────────────────────────── */}
        <div className="p-5 flex flex-col gap-3">
          {/* Zoom toolbar */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Original</p>
            <div className="flex items-center gap-0.5 bg-zinc-100 rounded-lg p-0.5">
              <button
                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                className="rounded-md p-1 text-zinc-500 hover:bg-white hover:shadow-sm transition-all"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-zinc-600 w-10 text-center select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(3, z + 0.25))}
                className="rounded-md p-1 text-zinc-500 hover:bg-white hover:shadow-sm transition-all"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <div className="w-px h-4 bg-zinc-200 mx-0.5" />
              <button
                onClick={() => setShowFullImg(true)}
                className="rounded-md p-1 text-zinc-500 hover:bg-white hover:shadow-sm transition-all"
                title="Full screen"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            className="relative overflow-auto rounded-xl bg-[#f4f4f5] border border-zinc-200"
            style={{ minHeight: '200px', maxHeight: '400px' }}
          >
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', display: 'inline-block' }}>
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={result.imageUrl}
                  alt={result.fileName}
                  className="block max-w-full"
                  style={{ maxHeight: '380px', objectFit: 'contain' }}
                  onLoad={() => {
                    if (imgRef.current)
                      setImgDisplaySize({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight });
                  }}
                />
                {showBboxOverlay && imgDisplaySize.w > 0 && (
                  <BBoxOverlay
                    result={result}
                    imgDisplayW={imgDisplaySize.w}
                    imgDisplayH={imgDisplaySize.h}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Extracted text ────────────────────────────────────────────── */}
        <div className="p-5 flex flex-col gap-3">

          {/* Tab bar + actions */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl">
              {([
                { id: 'text',       label: 'Plain',       icon: AlignLeft },
                { id: 'structured', label: 'Structured',  icon: Layers },
                { id: 'confidence', label: 'Confidence',  icon: BarChart2 },
                ...(result.hasTable ? [{ id: 'table', label: 'Table', icon: Table2 }] : []),
              ] as { id: string; label: string; icon: any }[]).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === id
                      ? 'bg-white text-violet-700 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  <Icon className="h-3 w-3" /> {label}
                </button>
              ))}
            </div>

            {/* Export actions */}
            <div className="ml-auto flex items-center gap-1.5">
              {activeTab === 'structured' && result.structuredBlocks.length > 0 && (
                <button
                  onClick={handleCopyMarkdown}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all border ${
                    copiedMd
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100'
                  }`}
                >
                  {copiedMd ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedMd ? 'Copied!' : 'Copy MD'}
                </button>
              )}
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all border ${
                  copied
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={() => downloadText(result.text, result.fileName)}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-all"
              >
                <Download className="h-3 w-3" /> TXT
              </button>
              <button
                onClick={() => downloadJson(result)}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-all"
              >
                <Download className="h-3 w-3" /> JSON
              </button>
            </div>
          </div>

          {/* ── Content area ──────────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4" style={{ maxHeight: '440px', minHeight: '220px' }}>

            {activeTab === 'text' && (
              result.text ? (
                <pre className="whitespace-pre-wrap font-mono text-[13px] text-zinc-800 leading-relaxed">
                  {result.text}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
                  <span className="text-3xl">🔍</span>
                  <p className="text-sm text-zinc-400">No text extracted</p>
                </div>
              )
            )}

            {activeTab === 'structured' && (
              <StructuredBlockView blocks={result.structuredBlocks} />
            )}

            {activeTab === 'confidence' && (
              <>
                <div className="flex flex-wrap gap-1.5 leading-loose">
                  {visibleWords.length === 0 ? (
                    <p className="text-zinc-400 italic text-sm">No words above {confidenceFilter}% confidence</p>
                  ) : visibleWords.map((w, i) => (
                    <span
                      key={i}
                      title={`${Math.round(w.confidence)}% confidence`}
                      className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-mono cursor-default ${
                        w.confidence >= 90 ? 'bg-emerald-100 text-emerald-800' :
                        w.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        w.confidence >= 50 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {w.text}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap gap-2">
                  {[
                    { label: '≥ 90% · High',   cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                    { label: '70–89% · Good',   cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                    { label: '50–69% · Fair',   cls: 'bg-orange-100 text-orange-700 border-orange-200' },
                    { label: '< 50% · Low',     cls: 'bg-red-100 text-red-700 border-red-200' },
                  ].map(({ label, cls }) => (
                    <span key={label} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{label}</span>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'table' && result.tableData && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {result.tableData[0]?.map((cell, ci) => (
                        <th key={ci} className="border border-zinc-200 bg-violet-50 px-3 py-2 text-left text-xs font-bold text-violet-800 whitespace-nowrap">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.tableData.slice(1).map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="border border-zinc-200 px-3 py-2 text-zinc-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Fullscreen image modal ─────────────────────────────────────────────── */}
      {showFullImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setShowFullImg(false)}
        >
          <button className="absolute top-5 right-5 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/30 transition-colors">
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.imageUrl}
            alt={result.fileName}
            className="max-w-[92vw] max-h-[92vh] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

// ── Processing card ───────────────────────────────────────────────────────────

function ProcessingCard({ fileName, status }: { fileName: string; status: string }) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-5 flex items-center gap-4 shadow-sm">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
        <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-violet-900 truncate">{fileName}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 flex-1 rounded-full bg-violet-100 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-violet-400 animate-pulse" />
          </div>
          <p className="text-xs text-violet-600 shrink-0">{status}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const ACCEPT = '.jpg,.jpeg,.png,.webp,.bmp,.tiff,.tif,.gif';
const ACCEPT_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff', 'image/gif'];

export default function ImageToTextClient() {
  const [results, setResults] = useState<OcrResult[]>([]);
  const [queue, setQueue] = useState<{ file: File; status: string }[]>([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [appliedOptions, setAppliedOptions] = useState<Options | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<Options>({
    language: 'eng',
    psm: '3',
    oem: 1,
    multiPass: true,           // runs 3 PSM passes and merges — catches codes on coloured backgrounds
    preprocess: {
      grayscale: true,         // converts to B&W — critical for coloured document backgrounds
      contrast: true,
      sharpen: false,
      upscale: true,
      threshold: false,
      denoise: false,
    },
    outputMode: 'structured',
    confidenceFilter: 0,
    showBboxOverlay: false,
  });

  const processFiles = useCallback(async (files: File[], optsOverride?: Options) => {
    const optsToUse = optsOverride ?? options;
    const valid = files.filter(f => ACCEPT_MIME.includes(f.type) || /\.(tiff?|bmp)$/i.test(f.name));
    if (!valid.length) {
      setError('Please select image files (JPEG, PNG, WebP, BMP, TIFF, GIF).');
      return;
    }
    if (valid.length > 10) {
      setError('Maximum 10 images at once.');
      return;
    }
    setError('');
    setAppliedOptions(optsToUse);

    for (const file of valid) {
      setQueue(q => [...q, { file, status: 'Queued…' }]);

      try {
        const updateStatus = (status: string) =>
          setQueue(q => q.map(item => item.file === file ? { ...item, status } : item));

        const result = await runOCR(file, optsToUse, updateStatus);
        setResults(prev => [result, ...prev]);
      } catch (e) {
        setError(`Failed to process "${file.name}": ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setQueue(q => q.filter(item => item.file !== file));
      }
    }
  }, [options]);

  const rerunAll = useCallback(async () => {
    if (results.length === 0) return;
    const files = results.map(r => r.file);
    setResults([]);
    await processFiles(files, options);
  }, [results, options, processFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  }, [processFiles]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFiles(Array.from(e.target.files));
  }, [processFiles]);

  const removeResult = (id: string) => {
    setResults(prev => {
      const r = prev.find(x => x.id === id);
      if (r) URL.revokeObjectURL(r.imageUrl);
      return prev.filter(x => x.id !== id);
    });
  };

  const isProcessing = queue.length > 0;
  const settingsChanged = appliedOptions !== null &&
    JSON.stringify(options) !== JSON.stringify(appliedOptions);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl shadow-lg">
              🔍
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Image to Text — OCR Online
              </h1>
              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                Extract text from photos, scanned documents, and images with advanced OCR.
                Confidence scoring, table detection, 18 languages. 100% in-browser — nothing uploaded.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Smart structured view', '40+ language combos', 'Multi-pass OCR', 'ID · Medical · Receipt · Book', 'Markdown export', '100% in-browser'].map(f => (
                  <span key={f} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-800">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-5">

        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed py-14 transition-all duration-200 ${
            dragging
              ? 'border-violet-400 bg-violet-50/80 scale-[1.01]'
              : 'border-zinc-300 bg-white hover:border-violet-400 hover:bg-violet-50/30'
          }`}
        >
          <input ref={inputRef} type="file" accept={ACCEPT} multiple className="hidden" onChange={handleInput} />
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${dragging ? 'bg-violet-100' : 'bg-zinc-100'}`}>
            <Scan className={`h-8 w-8 transition-colors ${dragging ? 'text-violet-600' : 'text-zinc-400'}`} />
          </div>
          <p className="mt-4 text-lg font-semibold text-zinc-700">Drop images here</p>
          <p className="mt-1 text-sm text-zinc-400">or click to browse • up to 10 images at once</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['JPEG', 'PNG', 'WebP', 'BMP', 'TIFF', 'GIF'].map(f => (
              <span key={f} className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 shadow-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Options panel */}
        <div className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 ${settingsChanged ? 'border-violet-300 ring-2 ring-violet-100' : 'border-zinc-200'}`}>
          {/* Panel header */}
          <button
            data-ocr-settings
            onClick={() => setShowOptions(o => !o)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50/60 rounded-2xl transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${settingsChanged ? 'bg-violet-100' : 'bg-zinc-100'}`}>
                <Settings2 className={`h-3.5 w-3.5 ${settingsChanged ? 'text-violet-600' : 'text-zinc-400'}`} />
              </span>
              <span className="text-zinc-800">OCR Settings</span>
              {settingsChanged && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white tracking-wide">
                  ● CHANGED
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {!showOptions && settingsChanged && results.length > 0 && (
                <span className="text-xs text-violet-600 font-medium">Open to re-run ↓</span>
              )}
              {showOptions
                ? <ChevronUp className="h-4 w-4 text-zinc-400" />
                : <ChevronDown className="h-4 w-4 text-zinc-400" />}
            </div>
          </button>

          {showOptions && (
            <div className="border-t border-zinc-100">

              {/* ── Section 1: Auto-detection info ───────────────────────────── */}
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-start gap-3 rounded-xl bg-violet-50 border border-violet-100 px-4 py-3">
                  <span className="text-lg shrink-0 mt-0.5">✨</span>
                  <div>
                    <p className="text-xs font-semibold text-violet-800 leading-tight">Fully automatic — no preset needed</p>
                    <p className="text-[11px] text-violet-600 mt-0.5 leading-relaxed">
                      On every upload, a fast detection scan identifies the document type (Aadhaar, PAN, Passport, Invoice, Medical, etc.)
                      and automatically applies the optimal PSM mode, preprocessing pipeline, and multi-pass strategy.
                      Just drop your image — it works.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-5 border-t border-zinc-100" />

              {/* ── Section 2: Language & Layout ──────────────────────────────── */}
              <div className="px-5 py-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-1.5">
                    <Languages className="h-3 w-3 text-violet-400" /> Language
                  </p>
                  <select
                    value={options.language}
                    onChange={e => setOptions(o => ({ ...o, language: e.target.value }))}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                  >
                    <option value="eng">English</option>
                    <optgroup label="South Asian">
                      <option value="eng+hin">English + Hindi</option>
                      <option value="eng+guj">English + Gujarati</option>
                      <option value="eng+ben">English + Bengali</option>
                      <option value="eng+tam">English + Tamil</option>
                      <option value="eng+tel">English + Telugu</option>
                      <option value="eng+kan">English + Kannada</option>
                      <option value="eng+mal">English + Malayalam</option>
                      <option value="eng+mar">English + Marathi</option>
                      <option value="eng+pan">English + Punjabi</option>
                      <option value="eng+urd">English + Urdu</option>
                      <option value="hin">Hindi only</option>
                      <option value="guj">Gujarati only</option>
                      <option value="ben">Bengali only</option>
                      <option value="tam">Tamil only</option>
                      <option value="tel">Telugu only</option>
                      <option value="kan">Kannada only</option>
                      <option value="mal">Malayalam only</option>
                      <option value="mar">Marathi only</option>
                      <option value="pan">Punjabi only</option>
                    </optgroup>
                    <optgroup label="Middle East">
                      <option value="eng+ara">English + Arabic</option>
                      <option value="ara">Arabic</option>
                    </optgroup>
                    <optgroup label="Europe">
                      <option value="eng+rus">English + Russian</option>
                      <option value="fra">French</option>
                      <option value="deu">German</option>
                      <option value="spa">Spanish</option>
                      <option value="por">Portuguese</option>
                      <option value="ita">Italian</option>
                      <option value="nld">Dutch</option>
                      <option value="pol">Polish</option>
                      <option value="rus">Russian only</option>
                      <option value="ukr">Ukrainian</option>
                      <option value="tur">Turkish</option>
                    </optgroup>
                    <optgroup label="East Asia">
                      <option value="eng+chi_sim">English + Chinese (Simplified)</option>
                      <option value="eng+chi_tra">English + Chinese (Traditional)</option>
                      <option value="eng+jpn">English + Japanese</option>
                      <option value="eng+kor">English + Korean</option>
                      <option value="chi_sim">Chinese (Simplified)</option>
                      <option value="chi_tra">Chinese (Traditional)</option>
                      <option value="jpn">Japanese</option>
                      <option value="kor">Korean</option>
                      <option value="vie">Vietnamese</option>
                    </optgroup>
                  </select>
                  <p className="mt-1.5 text-[11px] text-zinc-400 leading-relaxed">
                    Use a bilingual mode (e.g. "English + Arabic") for mixed-script documents to avoid garbled characters.
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-1.5">
                    <AlignLeft className="h-3 w-3 text-violet-400" /> Page Layout Mode
                  </p>
                  <select
                    value={options.psm}
                    onChange={e => setOptions(o => ({ ...o, psm: e.target.value }))}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                  >
                    {PSM_MODES.map(m => (
                      <option key={m.value} value={m.value}>{m.label} — {m.desc}</option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-[11px] text-zinc-400 leading-relaxed">
                    Auto-detect works for most documents. Use "Single block" for dense paragraphs, "Sparse" for forms.
                  </p>
                </div>
              </div>

              <div className="mx-5 border-t border-zinc-100" />

              {/* ── Section 3: Processing ──────────────────────────────────────── */}
              <div className="px-5 py-4 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-violet-400" /> Processing
                </p>

                {/* Multi-pass */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setOptions(o => ({ ...o, multiPass: !o.multiPass }))}
                    className={`mt-0.5 flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 ${
                      options.multiPass ? 'border-violet-500 bg-violet-500' : 'border-zinc-300 bg-zinc-200'
                    }`}
                    role="switch"
                    aria-checked={options.multiPass}
                  >
                    <span className={`block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${options.multiPass ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                  </button>
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 leading-none">Multi-pass scan</p>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                      Runs Auto + Sparse passes and merges high-confidence results. Catches IDs, codes, and text that a single pass misses.
                    </p>
                  </div>
                </div>

                {/* Preprocessing toggles */}
                <div>
                  <p className="mb-2 text-[11px] text-zinc-500 font-medium">Image pre-processing</p>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { key: 'grayscale', label: 'Grayscale',     desc: 'Convert to B&W — essential for coloured or gradient backgrounds' },
                      { key: 'contrast',  label: 'Boost contrast', desc: 'Stronger contrast (1.8×) improves text on gradient/coloured backgrounds' },
                      { key: 'sharpen',   label: 'Sharpen',        desc: 'Unsharp mask — helps with slightly blurry or compressed images' },
                      { key: 'upscale',   label: 'Smart upscale',  desc: '3× for tiny images, 2× for small — greatly improves small text accuracy' },
                      { key: 'denoise',   label: 'Denoise',        desc: '3×3 median blur — reduces noise before OCR on grainy scans' },
                      { key: 'threshold', label: 'Binarize',       desc: 'Converts to pure black & white using Otsu thresholding' },
                    ] as { key: keyof Options['preprocess']; label: string; desc: string }[]).map(({ key, label, desc }) => (
                      <button
                        key={key}
                        title={desc}
                        onClick={() => setOptions(o => ({
                          ...o, preprocess: { ...o.preprocess, [key]: !o.preprocess[key] }
                        }))}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                          options.preprocess[key]
                            ? 'border-violet-300 bg-violet-50 text-violet-700 shadow-sm'
                            : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        {options.preprocess[key] && <span className="mr-1 text-violet-500">✓</span>}{label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-5 border-t border-zinc-100" />

              {/* ── Section 4: Output ─────────────────────────────────────────── */}
              <div className="px-5 py-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-1.5">
                    <BarChart2 className="h-3 w-3 text-violet-400" /> Confidence Filter
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={0} max={90} step={5}
                      value={options.confidenceFilter}
                      onChange={e => setOptions(o => ({ ...o, confidenceFilter: +e.target.value }))}
                      className="flex-1 accent-violet-500"
                    />
                    <span className="min-w-[42px] rounded-lg bg-zinc-100 px-2 py-1 text-center text-xs font-bold text-zinc-700">
                      ≥{options.confidenceFilter}%
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400">Hides low-confidence words in the Confidence view</p>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 flex items-center gap-1.5">
                    <Eye className="h-3 w-3 text-violet-400" /> Bounding Boxes
                  </p>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setOptions(o => ({ ...o, showBboxOverlay: !o.showBboxOverlay }))}
                      className={`mt-0.5 flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 ${
                        options.showBboxOverlay ? 'border-violet-500 bg-violet-500' : 'border-zinc-300 bg-zinc-200'
                      }`}
                      role="switch"
                      aria-checked={options.showBboxOverlay}
                    >
                      <span className={`block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${options.showBboxOverlay ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-zinc-700 leading-none">{options.showBboxOverlay ? 'Overlays on' : 'Overlays off'}</p>
                      <p className="mt-1 text-[11px] text-zinc-400">Color-coded word boxes by confidence score</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CTA Footer ────────────────────────────────────────────────── */}
              {results.length > 0 && (
                <div className={`border-t px-5 py-4 flex items-center justify-between gap-4 rounded-b-2xl transition-colors ${settingsChanged ? 'border-violet-100 bg-violet-50/60' : 'border-zinc-100 bg-zinc-50/60'}`}>
                  <div>
                    {settingsChanged ? (
                      <p className="text-sm font-semibold text-violet-800">Settings changed</p>
                    ) : (
                      <p className="text-sm font-semibold text-zinc-600">Settings applied</p>
                    )}
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {settingsChanged
                        ? `Re-run OCR on ${results.length} image${results.length > 1 ? 's' : ''} with the new settings`
                        : 'Current results used these settings'}
                    </p>
                  </div>
                  <button
                    onClick={async () => { setShowOptions(false); await rerunAll(); }}
                    disabled={isProcessing}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-150 ${
                      settingsChanged
                        ? 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md active:scale-95'
                        : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                    {settingsChanged ? 'Apply & Re-run OCR' : 'Re-run OCR'}
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Processing queue */}
        {queue.map(({ file, status }) => (
          <ProcessingCard key={file.name + file.size} fileName={file.name} status={status} />
        ))}

        {/* Results */}
        {results.map(result => (
          <ResultCard
            key={result.id}
            result={result}
            outputMode={options.outputMode}
            confidenceFilter={options.confidenceFilter}
            showBboxOverlay={options.showBboxOverlay}
            onRemove={() => removeResult(result.id)}
            onSwitchLang={(lang) => {
              setOptions(o => ({ ...o, language: lang }));
              // Scroll to settings so user sees the language changed
              document.querySelector('[data-ocr-settings]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        ))}

        {/* Empty state */}
        {!isProcessing && results.length === 0 && !error && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="font-semibold text-zinc-900 mb-5 flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-zinc-400" /> What can this tool do?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: '🪪',
                  title: 'ID Cards & Documents',
                  desc: 'PAN, Aadhaar, Passport, Driving Licence — extracts all fields, auto-detects document type, shows as labelled key-value pairs.',
                },
                {
                  icon: '🏥',
                  title: 'Medical Bills & Reports',
                  desc: 'Prescriptions, lab reports, discharge summaries — fields parsed with totals highlighted in an easily scannable layout.',
                },
                {
                  icon: '🧾',
                  title: 'Receipts & Invoices',
                  desc: 'GST invoices, store receipts, e-bills — itemised data detected, totals and tax rows highlighted automatically.',
                },
                {
                  icon: '📋',
                  title: 'Insurance Copies',
                  desc: 'Policy documents, premium receipts — policy number, insured name, sum assured parsed into a clean structured view.',
                },
                {
                  icon: '📖',
                  title: 'Book Pages & Articles',
                  desc: 'Chapter headings, body paragraphs, footnotes — reconstructed as clean readable text with proper heading hierarchy.',
                },
                {
                  icon: '🌐',
                  title: '40+ Language Combinations',
                  desc: 'English, Hindi, Gujarati, Tamil, Bengali, Arabic, Chinese, Japanese and more. Bilingual combos prevent garbled text from non-Latin scripts.',
                },
                {
                  icon: '✨',
                  title: 'Smart Structured View',
                  desc: 'Auto-parses OCR output into headings, key-value pairs, lists, highlights and paragraphs. Export directly as Markdown.',
                },
                {
                  icon: '⚙️',
                  title: 'Multi-pass + Pre-processing',
                  desc: 'Auto + Sparse OCR passes merged at high confidence. Grayscale, contrast boost, smart upscale, denoise, and Otsu binarization for difficult scans.',
                },
                {
                  icon: '💾',
                  title: 'Export: TXT · JSON · Markdown',
                  desc: 'Plain text, full-detail JSON (word-level bboxes + confidence), or copy as clean Markdown — one click.',
                },
              ].map(f => (
                <div key={f.title} className="flex gap-3 rounded-xl bg-zinc-50 border border-zinc-100 p-4">
                  <span className="text-2xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{f.title}</p>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
              <strong>Privacy note:</strong> All processing happens entirely in your browser using the Tesseract OCR engine.
              No image is ever uploaded to any server. The language model is downloaded once from the Tesseract CDN and cached locally.
            </div>
          </div>
        )}

        {/* Tips */}
        {results.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Tips for better accuracy</p>
            <ul className="grid gap-1.5 sm:grid-cols-2 text-xs text-zinc-600">
              {[
                'Use a document preset (Book Page, Medical Bill, ID Proof, etc.) — each one tunes PSM mode, language, and pre-processing for that document type',
                'For PAN / Aadhaar: use "🪪 ID Proof / Aadhaar" preset — English+Hindi eliminates garbled Devanagari artifacts',
                'For any bilingual document, pick an "English + [Language]" option — it prevents noise from non-Latin scripts',
                'Multi-pass scan (default ON) finds codes, IDs, and fields that single-pass OCR misses on coloured backgrounds',
                '"Structured" tab (default) auto-parses into key-value pairs, headings, totals — use "Copy MD" to export clean Markdown',
                'Always enable Grayscale for coloured backgrounds (PAN cards, ID cards, invoices)',
                'Enable "Boost contrast" for faded, scanned, or low-contrast documents',
                'Use "Smart upscale" for small or low-resolution images (mobile photos)',
                'Try "Binarize (Otsu)" + "Denoise" for very noisy or grainy scanned documents',
                '"Book Page" preset uses Single Block PSM — ideal for full pages of continuous text',
              ].map((tip, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-violet-400 mt-0.5 shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
