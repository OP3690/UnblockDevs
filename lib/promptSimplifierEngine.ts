/**
 * AI Prompt Simplifier Engine (client-side)
 * Transforms messy prompts into optimized, structured prompts for AI models.
 */

export type Intent =
  | 'explain'
  | 'debug'
  | 'summarize'
  | 'write'
  | 'translate'
  | 'analyze'
  | 'generate'
  | 'refactor'
  | 'compare'
  | 'general';

export type Domain =
  | 'programming'
  | 'education'
  | 'business'
  | 'marketing'
  | 'research'
  | 'writing'
  | 'general';

export type Tone = 'professional' | 'concise' | 'detailed' | 'beginner' | 'technical';

export type ModelStyle = 'chatgpt' | 'claude' | 'gemini' | 'neutral';

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  explain: ['explain', 'understand', 'what is', 'how does', 'meaning of', 'describe'],
  debug: ['fix', 'bug', 'error', 'issue', 'broken', 'not working', 'debug'],
  summarize: ['summarize', 'summary', 'shorten', 'brief', 'tl;dr', 'tl dr'],
  write: ['write', 'generate', 'create', 'draft', 'compose'],
  translate: ['translate', 'convert to', 'in spanish', 'in french', 'language'],
  analyze: ['analyze', 'analysis', 'evaluate', 'review', 'assess'],
  generate: ['generate', 'create', 'make', 'produce'],
  refactor: ['refactor', 'improve', 'optimize', 'clean up', 'rewrite code'],
  compare: ['compare', 'vs', 'versus', 'difference between', 'contrast'],
  general: [],
};

const DOMAIN_KEYWORDS: Record<Domain, string[]> = {
  programming: ['code', 'function', 'api', 'javascript', 'python', 'bug', 'debug', 'variable', 'loop', 'array', 'react', 'node'],
  education: ['explain', 'learn', 'teach', 'student', 'concept', 'understand', 'example'],
  business: ['email', 'report', 'meeting', 'presentation', 'strategy', 'business'],
  marketing: ['copy', 'campaign', 'audience', 'social media', 'content', 'seo'],
  research: ['research', 'analyze', 'data', 'findings', 'study', 'literature'],
  writing: ['blog', 'article', 'story', 'essay', 'content', 'draft'],
  general: [],
};

const SENSITIVE_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /sk-[a-zA-Z0-9]{20,}/g, label: 'API key' },
  { pattern: /AKIA[0-9A-Z]{16}/g, label: 'AWS key' },
  { pattern: /Bearer\s+[A-Za-z0-9\-_.]+/gi, label: 'Bearer token' },
  { pattern: /ghp_[a-zA-Z0-9]{36}/g, label: 'GitHub token' },
  { pattern: /xox[baprs]-[a-zA-Z0-9-]+/g, label: 'Slack token' },
  { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, label: 'Email' },
  { pattern: /(?:password|passwd|secret|api[_-]?key)\s*[:=]\s*['"]?[\w-]+/gi, label: 'Secret' },
];

/** Detect intent from prompt text */
export function detectIntent(prompt: string): Intent {
  const lower = prompt.toLowerCase().trim();
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (intent === 'general') continue;
    for (const word of keywords) {
      if (lower.includes(word)) return intent as Intent;
    }
  }
  return 'general';
}

/** Detect domain from prompt text */
export function detectDomain(prompt: string): Domain {
  const lower = prompt.toLowerCase();
  let best: Domain = 'general';
  let maxMatches = 0;
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (domain === 'general') continue;
    const matches = keywords.filter((k) => lower.includes(k)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      best = domain as Domain;
    }
  }
  return best;
}

/** Build structured prompt from intent and raw text */
export function buildStructuredPrompt(intent: Intent, text: string): string {
  const trimmed = text.trim();
  const templates: Record<Intent, string> = {
    explain: `Task: Explain the following.

Requirements:
- Use clear language
- Provide examples where helpful
- Break down complex ideas

Topic/Content:
${trimmed}`,
    debug: `Task: Debug the following code.

Requirements:
- Identify the issue
- Explain the cause
- Suggest a fix

Code:
${trimmed}`,
    summarize: `Task: Summarize the following.

Requirements:
- Capture key ideas
- Be concise
- Preserve important details

Content:
${trimmed}`,
    write: `Task: Write the following.

Requirements:
- Follow the user's instructions
- Use appropriate tone and format
- Be clear and complete

Instructions:
${trimmed}`,
    translate: `Task: Translate the following.

Requirements:
- Preserve meaning and tone
- Use natural phrasing in the target language

Content:
${trimmed}`,
    analyze: `Task: Analyze the following.

Requirements:
- Provide structured analysis
- Support conclusions with evidence
- Be objective

Content:
${trimmed}`,
    generate: `Task: Generate the following.

Requirements:
- Match the user's request
- Be complete and usable

Instructions:
${trimmed}`,
    refactor: `Task: Refactor or improve the following code.

Requirements:
- Improve readability and structure
- Preserve behavior
- Suggest best practices

Code:
${trimmed}`,
    compare: `Task: Compare the following.

Requirements:
- Identify similarities and differences
- Be balanced and clear
- Use a structured format (e.g. table or bullets)

Content:
${trimmed}`,
    general: `Task: Fulfill the following request.

Requirements:
- Be clear and complete
- Use appropriate format

Request:
${trimmed}`,
  };
  return templates[intent] || templates.general;
}

/** Optimize prompt with clarity and structure hints */
export function optimizePrompt(text: string, intent: Intent): string {
  let out = buildStructuredPrompt(intent, text);
  if (!out.includes('Output format:') && intent !== 'general') {
    const formatHints: Record<Intent, string> = {
      explain: 'Output format: Clear sections with optional bullet points or numbered steps.',
      debug: 'Output format: 1) Issue 2) Cause 3) Fix with code if applicable.',
      summarize: 'Output format: Brief summary; optional bullet points.',
      write: 'Output format: As requested (paragraph, list, etc.).',
      translate: 'Output format: Translated text only, or side-by-side if requested.',
      analyze: 'Output format: Structured analysis with key findings.',
      generate: 'Output format: Generated content as requested.',
      refactor: 'Output format: Refactored code + short explanation.',
      compare: 'Output format: Comparison table or bullet list.',
      general: '',
    };
    const hint = formatHints[intent];
    if (hint) out = out.replace(/\n(?:Topic|Content|Code|Instructions|Request):/i, `\nOutput format: ${hint}\n\n$&`);
  }
  return out;
}

/** Score prompt quality (0-100) */
export function scorePrompt(prompt: string): { score: number; suggestions: string[] } {
  let score = 0;
  const suggestions: string[] = [];
  const lower = prompt.toLowerCase();

  if (prompt.includes('Task:') || lower.includes('task:')) score += 20;
  else suggestions.push('Add a clear Task or goal');
  if (prompt.includes('Requirements:') || lower.includes('requirements:')) score += 20;
  else suggestions.push('Add Requirements or instructions');
  if (/\b(example|e\.g\.|for example)\b/i.test(prompt)) score += 10;
  if (/\b(output|format|result)\b/i.test(prompt)) score += 15;
  else suggestions.push('Specify output format if relevant');
  if (prompt.length > 50) score += 10;
  if (prompt.length > 150) score += 5;
  if (/^\s*#|^\s*\d+\./m.test(prompt)) score += 10;

  return {
    score: Math.min(100, score + 20),
    suggestions: suggestions.slice(0, 4),
  };
}

/** Suggest what's missing (autocomplete-style) */
export function getSuggestions(prompt: string, intent: Intent): string[] {
  const suggestions: string[] = [];
  const lower = prompt.toLowerCase();
  if (intent === 'debug' && !/\b(code|function|script|snippet)\b/i.test(prompt)) suggestions.push('Paste the code to debug');
  if (intent === 'write' && !/\b(email|blog|letter)\b/i.test(lower)) suggestions.push('Specify: recipient? tone? length?');
  if (intent === 'translate' && !/\b(to |in |language)\b/i.test(lower)) suggestions.push('Specify target language');
  if (intent === 'summarize' && !/\b(length|words|bullet)\b/i.test(lower)) suggestions.push('Specify summary length or format');
  if (!prompt.includes('Requirements') && !prompt.includes('Instructions')) suggestions.push('Add specific requirements');
  return suggestions.length ? suggestions : ['Prompt looks good—add details if you need a more specific output'];
}

/** Safety scan: mask sensitive data */
export function scanSafety(text: string): { text: string; masked: { label: string; count: number }[] } {
  let out = text;
  const masked: { label: string; count: number }[] = [];
  for (const { pattern, label } of SENSITIVE_PATTERNS) {
    const before = out;
    out = out.replace(pattern, '***MASKED***');
    const count = (before.match(pattern) || []).length;
    if (count > 0) masked.push({ label, count });
  }
  return { text: out, masked };
}

/** Rewrite prompt in different tone */
export function rewriterTone(text: string, tone: Tone): string {
  const structured = text.trim();
  const preambles: Record<Tone, string> = {
    professional: 'Please respond in a professional, formal tone.\n\n',
    concise: 'Please be concise and to the point.\n\n',
    detailed: 'Please provide a detailed, thorough response.\n\n',
    beginner: 'Please explain in simple terms suitable for beginners.\n\n',
    technical: 'Please use technical terminology and include relevant technical detail.\n\n',
  };
  return preambles[tone] + structured;
}

/** Model-style wrappers (lightweight structure hints) */
export function applyModelStyle(text: string, style: ModelStyle): string {
  if (style === 'neutral') return text;
  const trimmed = text.trim();
  if (style === 'chatgpt') return `Task and context:\n${trimmed}\n\nInstructions: Follow the task above.`;
  if (style === 'claude') return `Context:\n${trimmed}\n\nExpected output: Please provide a clear, structured response.`;
  if (style === 'gemini') return `Input:\n${trimmed}\n\nInstructions: Process the input and respond accordingly.`;
  return text;
}

/** Suggest output format from intent */
export function suggestOutputFormat(intent: Intent): string {
  const formats: Record<Intent, string> = {
    explain: 'Bullet points or short paragraphs',
    debug: 'Numbered steps + code blocks',
    summarize: 'Bullet list or short paragraph',
    write: 'As requested (paragraph, list, etc.)',
    translate: 'Plain text',
    analyze: 'Structured sections or table',
    generate: 'Depends on content type',
    refactor: 'Code block + brief explanation',
    compare: 'Table or bullet comparison',
    general: 'Structured text',
  };
  return formats[intent];
}

/** Compress prompt (reduce verbosity, keep intent) */
export function compressPrompt(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s*([.,;:])\s*/g, '$1 ')
    .replace(/\b(please|kindly|could you|can you|would you|maybe|perhaps)\s+/gi, '')
    .replace(/\b(just|really|actually|basically)\s+/gi, '')
    .trim();
}

/** Estimate token count (~4 chars per token for English) */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/** Full simplify pipeline */
export function simplifyPrompt(
  raw: string,
  options: { modelStyle?: ModelStyle; tone?: Tone; scanSafety?: boolean } = {}
): {
  optimized: string;
  intent: Intent;
  domain: Domain;
  score: number;
  scoreSuggestions: string[];
  suggestions: string[];
  outputFormat: string;
  masked: { label: string; count: number }[];
  tokenEstimate: number;
} {
  const scan = options.scanSafety !== false ? scanSafety(raw) : { text: raw, masked: [] };
  const intent = detectIntent(scan.text);
  const domain = detectDomain(scan.text);
  let optimized = optimizePrompt(scan.text, intent);
  if (options.tone) optimized = rewriterTone(optimized, options.tone);
  if (options.modelStyle) optimized = applyModelStyle(optimized, options.modelStyle);
  const { score, suggestions: scoreSuggestions } = scorePrompt(optimized);
  const suggestions = getSuggestions(scan.text, intent);
  const outputFormat = suggestOutputFormat(intent);

  return {
    optimized,
    intent,
    domain,
    score,
    scoreSuggestions,
    suggestions,
    outputFormat,
    masked: scan.masked,
    tokenEstimate: estimateTokens(optimized),
  };
}

/** Pre-built template library */
export const PROMPT_TEMPLATES: { id: string; name: string; intent: Intent; template: string }[] = [
  { id: 'debug-code', name: 'Debug code', intent: 'debug', template: 'Task: Debug the following code.\n\nRequirements:\n- Identify the issue\n- Explain the cause\n- Suggest a fix\n\nCode:\n' },
  { id: 'explain-concept', name: 'Explain concept', intent: 'explain', template: 'Task: Explain the following in clear terms.\n\nRequirements:\n- Use simple language\n- Provide an example\n- Keep it under 200 words\n\nTopic:\n' },
  { id: 'write-email', name: 'Write email', intent: 'write', template: 'Task: Write an email.\n\nRequirements:\n- Specify recipient and purpose\n- Choose tone (formal/casual)\n- Include key points\n\nDetails:\n' },
  { id: 'summarize', name: 'Summarize article', intent: 'summarize', template: 'Task: Summarize the following.\n\nRequirements:\n- Capture key ideas\n- Limit to 5 bullet points\n- Avoid unnecessary detail\n\nArticle:\n' },
  { id: 'generate-notes', name: 'Generate study notes', intent: 'generate', template: 'Task: Generate study notes from the following.\n\nRequirements:\n- Key concepts and definitions\n- Bullet points or outline\n- Examples if relevant\n\nContent:\n' },
  { id: 'refactor-code', name: 'Refactor code', intent: 'refactor', template: 'Task: Refactor the following code.\n\nRequirements:\n- Improve readability\n- Preserve behavior\n- Follow best practices\n\nCode:\n' },
];
