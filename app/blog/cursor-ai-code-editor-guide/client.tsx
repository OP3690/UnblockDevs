'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function CursorAiCodeEditorGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Cursor AI Code Editor — Complete Guide: Features, Tips, and How to Use It Effectively</h1>
      <p className="lead">
        Cursor is an AI-first code editor built on VS Code that gives you a deeply context-aware AI
        pair programmer. Unlike GitHub Copilot as a plugin, Cursor integrates AI at every level —
        inline edits, multi-file Composer mode, and full codebase chat. This guide covers every feature
        with practical examples, keyboard shortcuts, .cursorrules configuration, and real workflows.
      </p>

      <StatGrid stats={[
        { value: 'VS Code fork', label: 'all VS Code extensions work in Cursor', color: 'blue' },
        { value: 'Composer', label: 'multi-file AI agent mode — most powerful feature', color: 'green' },
        { value: '200K+', label: 'token context with Claude 3.5 Sonnet backend', color: 'purple' },
        { value: '$20/mo', label: 'Pro plan with GPT-4o and Claude access', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Cursor Is Different" />
      <QuickFact color="green" label="Cursor's key advantage">
        Cursor's biggest advantage over Copilot is Composer mode — an autonomous agent that reads your
        codebase, creates new files, modifies existing files, and executes multi-step tasks. It doesn't
        just complete the current line — it can implement an entire feature across dozens of files with
        a single prompt. This is the feature that converts Copilot users to Cursor users.
      </QuickFact>

      <CompareTable
        leftLabel="GitHub Copilot"
        rightLabel="Cursor"
        rows={[
          { label: 'Architecture', left: 'Plugin for VS Code/JetBrains', right: 'Standalone editor (VS Code fork) — all VS Code extensions work' },
          { label: 'Multi-file edits', left: 'Single file focus', right: 'Composer can create and edit unlimited files in one session' },
          { label: 'Codebase context', left: 'Open files + limited retrieval', right: 'Full codebase index, semantic search, @codebase queries' },
          { label: 'AI models', left: 'GPT-4o (Copilot model)', right: 'GPT-4o, Claude 3.5 Sonnet, Claude 3 Opus, cursor-small' },
          { label: 'Price', left: '$10/mo individual, free for students', right: '$20/mo Pro, free tier (2000 completions + 50 requests/mo)' },
          { label: 'Privacy mode', left: 'Copilot Business for no training', right: 'Privacy mode on all paid plans, local model support via Ollama' },
          { label: '.cursorrules', left: 'No project-level AI instructions', right: '.cursorrules file sets persistent AI behavior for the project' },
        ]}
      />

      <SectionHeader number={2} title="Core Features and Shortcuts" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Cmd+K — Inline Edit', description: 'Select code and press Cmd+K. Describe a change in natural language. "Add error handling to this function" or "Convert to async/await". Shows a diff preview before applying — accept, reject, or iterate.' },
        { title: 'Cmd+L — Chat Panel', description: 'Open chat with full codebase context. Ask questions, get explanations, request code. References the files you have open and the full indexed codebase as context.' },
        { title: 'Cmd+Shift+I — Composer', description: 'The most powerful mode. Describe a multi-file change or new feature. Composer plans and executes across your entire project, creating and modifying files autonomously.' },
        { title: '@-mentions — Context Control', description: 'In chat or Composer, use @filename, @codebase, @docs, @web to explicitly control context. @docs fetches documentation from external URLs and uses it as context.' },
        { title: 'Tab — AI Autocomplete', description: 'Like Copilot, Cursor shows inline suggestions as you type. Press Tab to accept. The suggestions are context-aware — they understand your codebase patterns, not just the current file.' },
        { title: 'Cmd+Shift+L — Add to Chat', description: 'Select code and add it to the current chat conversation without opening a new session. Great for iterating on a specific function within a larger chat thread.' },
      ]} />

      <SectionHeader number={3} title="Composer Mode — Step by Step" />
      <VerticalSteps steps={[
        { title: 'Open Composer', desc: 'Press Cmd+Shift+I (macOS) or Ctrl+Shift+I (Windows/Linux). The Composer panel opens on the right side of the editor. This is your autonomous coding agent.' },
        { title: 'Describe your task with specificity', desc: 'Be specific: include the feature, technology stack, and any constraints. Vague: "Add auth." Specific: "Add user authentication using NextAuth.js v5 with Google OAuth. Create /app/api/auth/[...nextauth]/route.ts, update middleware.ts to protect /dashboard routes, and add sign-in/out buttons to the header component."' },
        { title: 'Review the plan', desc: 'Composer shows which files it plans to create or modify before executing. Read the plan and check it makes sense. If not, refine the prompt before accepting.' },
        { title: 'Accept, edit, or reject', desc: 'Accept all changes with one click, or review each file individually. Each file shows a diff — green for additions, red for deletions. Edit any file manually before finalizing.' },
        { title: 'Iterate in the same session', desc: 'Continue the conversation: "Now add a sign-out button to the mobile nav" or "The middleware is blocking /api routes, fix it." Composer maintains full context of all changes made in the session.' },
        { title: 'Use checkpoints', desc: 'Cursor creates checkpoints before each Composer action. If a change breaks something, you can restore to a previous checkpoint without losing other work.' },
      ]} />

      <SectionHeader number={4} title=".cursorrules — Project-Level AI Instructions" />
      <CodeBlock language="text" filename=".cursorrules (project root)">
{`# .cursorrules — AI follows these for every conversation in this project
# Place this file in the root of your project

## Project
- Next.js 14 App Router project with TypeScript strict mode
- Tailwind CSS for styling — no inline styles, no CSS modules
- Prisma + PostgreSQL for database access
- NextAuth.js v5 for authentication

## Code Style
- Use functional components with hooks
- Prefer React Server Components — use 'use client' only for interactivity
- Async server components for data fetching, not useEffect
- Named exports for components, default export only for pages

## Patterns
- Error boundaries at layout level, not individual components
- Loading.tsx files for suspense boundaries
- Zod for all form and API input validation
- Server actions for mutations, API routes only for external integrations

## File Structure
- Components: /components/[feature]/ComponentName.tsx
- Server actions: /app/actions/[feature].ts
- Utilities: /lib/[feature].ts
- Types: /types/[feature].ts

## Never
- No any types — use unknown and type guards
- No useEffect for data fetching
- No var — use const/let
- No hardcoded strings that should be environment variables`}
      </CodeBlock>

      <SectionHeader number={5} title="Codebase Context — How to Use It" />
      <AlertBox type="tip" title="@codebase is your most powerful context command">
        In chat, type @codebase to ask questions about your entire project: "Where is user authentication
        implemented?" or "What components use the useCart hook?" Cursor indexes your project semantically,
        not just text-matching — it understands architecture, not just keywords. Use it to navigate unfamiliar
        codebases and to ensure generated code follows existing patterns.
      </AlertBox>

      <CodeBlock language="text" filename="Effective Cursor Chat Prompts">
{`// Architecture questions — understand before editing
"@codebase What's the pattern used for data fetching in this project?"
"@codebase Show me all places where user permissions are checked"
"@codebase How does the cart system work end-to-end?"

// Bug fixing with full context
"@filename.tsx This component crashes when the products array is empty.
 Looking at the component, what's the bug and how do I fix it?"

// Code generation that follows existing patterns
"@codebase Add a new API endpoint for updating user preferences.
 Follow the same pattern as the existing user endpoints in /app/api/users/"

// Refactoring with safety
"@codebase I want to rename UserCard to ProfileCard everywhere.
 Show me all affected files first, then make the changes."

// Documentation generation
"@codebase Generate a CLAUDE.md for this project explaining the architecture,
 setup steps, key patterns, and common gotchas"

// External docs
"@docs https://tanstack.com/query/latest Show me how to use
 optimistic updates with the pattern we use in this project"`}
      </CodeBlock>

      <SectionHeader number={6} title="Privacy and Security Settings" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Privacy Mode (Pro)', description: 'On Pro plan, enable Privacy Mode in Settings → Privacy. This prevents your code from being stored or used for model training. Enabled per-project or globally.' },
        { title: 'Local Models via Ollama', description: 'Use Cursor with a local LLM via Ollama for maximum privacy. Settings → AI → Model → Add Ollama. Code never leaves your machine. Slower but completely private.' },
        { title: 'Custom API Keys', description: 'Configure your own OpenAI or Anthropic API keys in Settings → AI → Model Settings. Your billing, your data handling terms. Better for teams with data compliance requirements.' },
        { title: '.cursorignore', description: 'Create a .cursorignore file (same syntax as .gitignore) to exclude sensitive files — .env, secrets/, credentials/ — from being indexed and included in AI context.' },
      ]} />

      <SectionHeader number={7} title="Advanced Techniques" />
      <CodeBlock language="text" filename="Advanced Cursor workflows">
{`// Multi-file refactoring with Composer
Cmd+Shift+I → "Migrate all class components in /components/ to
functional components with hooks. Preserve all existing props and behavior."

// Test generation
Select a function → Cmd+K → "Write comprehensive unit tests for
this function including edge cases and error scenarios. Use Vitest."

// Code review simulation
Cmd+L → "Review this PR diff for: security issues, performance problems,
missing error handling, and code style consistency. Be specific."

// Debugging with context
Add breakpoint → Cmd+L → "I'm getting a TypeError on line 45.
@file Here is the component. What could cause this and how do I debug it?"

// Documentation from code
Select entire module → Cmd+K → "Add JSDoc comments to all exported
functions. Include @param, @returns, and @example for each."

// Migration assistance
Cmd+Shift+I → "Migrate this Express.js app from CommonJS (require)
to ES Modules (import/export). Update package.json type field too."`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Is Cursor worth it over GitHub Copilot?',
          answer: 'For individual developers doing feature work: yes, especially Composer for multi-file changes. The key differentiator is that Cursor understands your full codebase, not just the current file. For teams using JetBrains IDEs: Copilot is better integrated. Many developers use both — Cursor as their primary editor, Copilot for any JetBrains IDE they need. The $20/month Pro plan is worth it if you use Composer for 2+ hours per week.',
        },
        {
          question: 'Does Cursor send my code to OpenAI/Anthropic?',
          answer: 'Yes — Cursor sends relevant code context to the AI model APIs (OpenAI, Anthropic) to generate responses. On the Pro plan, enable Privacy Mode (Settings → Privacy) — code is not stored or used for training. For maximum privacy: use Cursor with local models via Ollama (Settings → AI → Model → Ollama), or add your own API keys with custom data handling agreements. Create a .cursorignore file to exclude sensitive files from the index.',
        },
        {
          question: 'Can I use my own API keys in Cursor?',
          answer: 'Yes — Cursor allows you to configure your own OpenAI or Anthropic API keys in Settings → AI → Model Settings → Add Model. This uses your billing account instead of Cursor\'s credits, gives you access to the latest models immediately after release, and may provide better data handling terms for compliance. Many enterprise teams use custom keys with Azure OpenAI for data residency requirements.',
        },
        {
          question: 'What AI model does Cursor use?',
          answer: 'Cursor uses GPT-4o and Claude 3.5 Sonnet as primary models for Composer and chat (Pro plan). cursor-small is available for fast inline completions with lower latency. You can choose the model per interaction. The free tier uses slower models with a 2,000 completion and 50 premium request monthly limit. Claude 3.5 Sonnet is generally best for complex multi-file tasks; GPT-4o is better for quick code explanations.',
        },
        {
          question: 'How do I get the most out of .cursorrules?',
          answer: 'Write .cursorrules to capture the decisions your team makes over and over: which libraries to use, which patterns to follow, which antipatterns to avoid. Include: tech stack and versions, code style rules, file structure conventions, patterns for common operations (auth, data fetching, error handling), and explicit "never do X" rules. The AI will follow these instructions for every chat and Composer session in the project — eliminating the need to repeat context in every prompt.',
        },
        {
          question: 'Can Cursor work on very large codebases?',
          answer: 'Yes — Cursor indexes large codebases using semantic chunking and vector search. It doesn\'t load the entire codebase into context; it retrieves the most relevant code for each query. For very large repos (100K+ files), add irrelevant directories to .cursorignore (node_modules, .git, build outputs) to improve indexing speed. The @codebase context command uses the index for semantic retrieval, not full-text inclusion, so it scales well.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
