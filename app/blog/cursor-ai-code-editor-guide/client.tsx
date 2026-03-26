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
        with practical examples.
      </p>

      <StatGrid stats={[
        { value: 'VS Code fork', label: 'all VS Code extensions work in Cursor', color: 'blue' },
        { value: 'Composer', label: 'multi-file AI agent mode — most powerful feature', color: 'green' },
        { value: '200K+', label: 'token context with Claude 3.5 Sonnet backend', color: 'purple' },
        { value: '$20/mo', label: 'Pro plan with GPT-4o and Claude access', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Why Cursor Is Different" />
      <QuickFact>
        Cursor's biggest advantage over Copilot is Composer mode — an autonomous agent that reads your
        codebase, creates new files, modifies existing files, and executes multi-step tasks. It doesn't
        just complete the current line — it can implement an entire feature across dozens of files.
      </QuickFact>

      <CompareTable
        leftLabel="GitHub Copilot"
        rightLabel="Cursor"
        rows={[
          { label: 'Architecture', left: 'Plugin for VS Code/JetBrains', right: 'Standalone editor (VS Code fork)' },
          { label: 'Multi-file edits', left: 'Single file focus', right: 'Composer can edit unlimited files' },
          { label: 'Codebase context', left: 'Open files + limited context', right: 'Full codebase index, semantic search' },
          { label: 'AI models', left: 'GPT-4o (Copilot model)', right: 'GPT-4o, Claude 3.5 Sonnet, cursor-small' },
          { label: 'Price', left: '$10/mo individual', right: '$20/mo Pro, free tier available' },
          { label: 'Privacy mode', left: 'Business plan for no training', right: 'Privacy mode on all paid plans' },
        ]}
      />

      <SectionHeader number={2} title="Core Features and Shortcuts" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Cmd+K — Inline Edit', description: 'Select code and press Cmd+K. Describe a change in natural language. "Add error handling to this function" or "Convert to async/await". Instant diff preview.' },
        { title: 'Cmd+L — Chat Panel', description: 'Open chat with full codebase context. Ask questions, get explanations, request code. References the files you have open as context.' },
        { title: 'Cmd+Shift+I — Composer', description: 'The most powerful mode. Describe a multi-file change or new feature. Composer plans and executes across your entire project.' },
        { title: '@-mentions — Context Control', description: 'In chat or Composer, use @filename, @codebase, @docs to explicitly include context. @docs fetches documentation from external URLs.' },
      ]} />

      <SectionHeader number={3} title="Composer Mode — Step by Step" />
      <VerticalSteps steps={[
        { title: 'Open Composer', description: 'Press Cmd+Shift+I (macOS) or Ctrl+Shift+I (Windows/Linux). The Composer panel opens on the right.', code: 'Shortcut: Cmd+Shift+I' },
        { title: 'Describe Your Task', description: 'Write what you want to build or change. Be specific: include the feature, technology, and any constraints.', code: 'Example: "Add user authentication using NextAuth.js with Google OAuth. Create: /app/api/auth/[...nextauth]/route.ts, update middleware.ts, add login button to header component"' },
        { title: 'Review the Plan', description: 'Composer shows which files it plans to create or modify. Review the plan before accepting.' },
        { title: 'Accept or Edit', description: 'Accept all changes, edit individual files, or reject and try a different approach. Each file diff is shown separately.' },
        { title: 'Iterate', description: 'Continue the conversation: "Now add a sign-out button" or "The middleware is blocking /api routes, fix it". Composer maintains context.', code: 'Cursor remembers all changes made in the current Composer session' },
      ]} />

      <SectionHeader number={4} title=".cursorrules — Project-Level AI Instructions" />
      <CodeBlock language="text" filename=".cursorrules (project root)">
{`# .cursorrules — AI follows these for every conversation in this project

## Project
- Next.js 14 App Router project
- TypeScript strict mode
- Tailwind CSS for styling — no inline styles

## Code Style
- Use functional components with hooks
- Prefer server components; use 'use client' only when needed for interactivity
- Async server components for data fetching

## Patterns
- Error boundaries at layout level
- Loading skeletons for async data
- Zod for form validation
- Prisma for database access

## File Structure
- Components in /components/[feature]/ComponentName.tsx
- Server actions in /app/actions/[feature].ts
- API routes only for external integrations, not internal data

## Never
- No any types
- No useEffect for data fetching — use server components or SWR
- No var — use const/let`}
      </CodeBlock>

      <SectionHeader number={5} title="Codebase Context — How to Use It" />
      <AlertBox type="tip" title="@codebase is your most powerful context command">
        In chat, type @codebase to ask questions about your entire project: "Where is user authentication
        implemented?" or "What components use the useCart hook?" Cursor indexes your project semantically,
        not just text-matching — it understands your architecture.
      </AlertBox>

      <CodeBlock language="text" filename="Effective Cursor Chat Prompts">
{`// Architecture questions
"@codebase What's the pattern used for data fetching in this project?"
"@codebase Show me all places where user permissions are checked"

// Bug fixing with context
"@filename.tsx This component crashes when products array is empty.
 Looking at the component, what's the bug and how do I fix it?"

// Code generation with style matching
"@codebase Add a new API endpoint for updating user preferences.
 Follow the same pattern as the existing user endpoints in /app/api/users/"

// Documentation
"@codebase Generate a README for this project explaining the architecture,
 setup steps, and key features"`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Is Cursor worth it over GitHub Copilot?',
          answer: 'For individual developers doing feature work: yes, especially if you want Composer for multi-file changes. For teams or if you prefer staying in JetBrains: Copilot is better integrated. Many developers use both — Cursor as their main editor, Copilot on any JetBrains IDE they occasionally need.',
        },
        {
          question: 'Does Cursor send my code to OpenAI/Anthropic?',
          answer: 'Yes — Cursor sends code context to the AI model APIs (OpenAI, Anthropic) to generate responses. On the Pro plan, Cursor has privacy mode where code is not used for training. For maximum privacy, use Cursor with a local model via Ollama integration (available in Cursor settings).',
        },
        {
          question: 'Can I use my own API keys in Cursor?',
          answer: 'Yes — Cursor allows you to configure your own OpenAI or Anthropic API keys in Settings → AI → Model Settings. This uses your billing instead of Cursor\'s, gives you access to the latest models, and in some jurisdictions provides better data handling guarantees.',
        },
        {
          question: 'What AI model does Cursor use?',
          answer: 'Cursor uses GPT-4o and Claude 3.5 Sonnet as primary models for Composer and chat. cursor-small is available for fast inline completions. You can choose the model per interaction. The free tier uses GPT-3.5-turbo; Pro uses GPT-4o and Claude 3.5 Sonnet.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
