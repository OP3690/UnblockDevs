'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz,
} from '@/components/blog/BlogVisuals';

export default function AiPromptEngineeringGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>AI Prompt Engineering Guide — 6 Techniques That Actually Work</h1>
      <p className="lead">
        Most people use AI like a search engine — type a vague question, get a vague answer. Prompt engineering is the
        skill of writing instructions that consistently produce high-quality, accurate, and useful responses.
        This guide covers 6 practical techniques with real before/after examples.
      </p>

      <StatGrid
        stats={[
          { value: '6', label: 'battle-tested techniques', color: 'purple' },
          { value: '10x', label: 'better output with good prompts', color: 'green' },
          { value: '0', label: 'cost — just better wording', color: 'blue' },
          { value: '2026', label: 'updated for GPT-4o & Claude 3.5', color: 'amber' },
        ]}
      />

      <SectionHeader number={1} title="Why Prompts Matter More Than You Think" />
      <p>
        The same AI model will give wildly different outputs depending on how you phrase your request. This isn't
        a quirk — it's by design. Language models predict the most likely continuation of your text. A precise,
        context-rich prompt narrows down the probability space and guides the model toward exactly what you need.
      </p>

      <CompareTable
        leftLabel="Weak Prompt"
        rightLabel="Strong Prompt"
        rows={[
          { label: 'Specificity', left: 'Fix this code', right: 'Fix the null pointer exception in this TypeScript function. Explain what caused it.' },
          { label: 'Context', left: 'Write a function', right: 'Write a TypeScript function that validates an email address using regex. Return a boolean.' },
          { label: 'Format', left: 'Explain CORS', right: 'Explain CORS in 3 bullet points suitable for a junior developer with no HTTP background.' },
          { label: 'Constraints', left: 'Summarize this', right: 'Summarize this in 2 sentences. Focus on the key business impact, not technical details.' },
        ]}
      />

      <SectionHeader number={2} title="Technique 1 — Role-Based Prompting" />
      <p>
        Assigning a role or persona to the AI dramatically improves the tone, depth, and relevance of responses.
        The model uses the role as a filter for what vocabulary, assumptions, and perspective to apply.
      </p>

      <ErrorFix
        bad={`How do I optimize React performance?`}
        good={`You are a senior React engineer who has worked on large-scale SPAs with 1M+ users.

I have a dashboard that re-renders every second due to real-time data. The FPS is dropping to 20 on low-end devices.

What are the top 3 React-specific optimizations I should apply first?`}
        badLabel="Vague question"
        goodLabel="Role + context + specific ask"
      />

      <KeyPointsGrid
        columns={3}
        items={[
          { title: 'Domain Expert', description: '"You are a senior DevOps engineer specializing in Kubernetes..."' },
          { title: 'Audience Adapter', description: '"Explain this to a non-technical product manager..."' },
          { title: 'Style Guide', description: '"You write in the style of the React docs — precise, minimal, no hype..."' },
        ]}
      />

      <SectionHeader number={3} title="Technique 2 — Chain-of-Thought (CoT)" />
      <p>
        Telling the model to "think step by step" before giving an answer significantly improves accuracy on
        reasoning tasks, math, logic, and debugging. It forces the model to work through intermediate steps
        rather than jumping to a conclusion.
      </p>

      <ErrorFix
        bad={`Is this SQL query efficient? SELECT * FROM orders WHERE customer_id = 123 ORDER BY created_at DESC;`}
        good={`Analyze this SQL query step by step:
SELECT * FROM orders WHERE customer_id = 123 ORDER BY created_at DESC;

1. First, identify what indexes would help
2. Then check for any N+1 or full-table scan issues
3. Finally, suggest the optimized version with explanation

Table: orders (500,000 rows). customer_id and created_at both have individual indexes.`}
        badLabel="Direct question"
        goodLabel="Step-by-step analysis prompt"
      />

      <AlertBox type="tip" title="When to use Chain-of-Thought">
        CoT is most powerful for: debugging code, math/logic problems, multi-step planning, comparing trade-offs,
        and any task where "show your work" would help a human too.
      </AlertBox>

      <SectionHeader number={4} title="Technique 3 — Few-Shot Prompting" />
      <p>
        Provide 2-3 examples of the exact input→output format you want. The model uses these as a pattern
        to follow rather than guessing your intent. This is especially powerful for formatting, classification,
        and code generation tasks.
      </p>

      <CodeBlock language="text" filename="Few-Shot Example: Commit Message Generator">
{`Convert these git diffs into conventional commit messages.

EXAMPLE 1:
Diff: Added user.email validation in signup form
Output: feat(auth): add email validation to signup form

EXAMPLE 2:
Diff: Fixed null check in getUserById causing crash
Output: fix(users): handle null return from getUserById

EXAMPLE 3:
Diff: Removed unused imports from dashboard.tsx
Output: chore(dashboard): remove unused imports

NOW DO THIS:
Diff: Added Redis caching for product listings API endpoint
Output:`}
      </CodeBlock>

      <QuickFact>
        Three examples is the sweet spot for most tasks. More than 5 examples rarely adds value and uses up
        context window space.
      </QuickFact>

      <SectionHeader number={5} title="Technique 4 — Constraint & Format Specification" />
      <p>
        Tell the model exactly what format you want the output in. This prevents verbose, padded responses
        and makes the output immediately usable in your workflow.
      </p>

      <CodeBlock language="text" filename="Format Specification Examples">
{`# Response as JSON
Extract the key info from this job posting as JSON:
{ "title": "...", "company": "...", "salary": "...", "remote": true/false, "stack": ["..."] }

Job posting: [paste here]

---

# Response as Markdown table
Compare these 3 state management libraries (Redux, Zustand, Jotai) in a markdown table.
Columns: Library | Bundle Size | Learning Curve | Best For | Verdict

---

# Response as numbered list, max 5 items
List the top 5 reasons Next.js apps are slow in production.
Each item: one sentence, developer-focused, actionable.`}
      </CodeBlock>

      <CompareTable
        leftLabel="Without Format Spec"
        rightLabel="With Format Spec"
        rows={[
          { label: 'Length', left: 'Unpredictable — often too long', right: 'Controlled — exactly what you asked' },
          { label: 'Structure', left: 'Paragraphs you need to parse', right: 'JSON / table / list ready to use' },
          { label: 'Copy-paste ready?', left: 'Usually needs editing', right: 'Often paste-and-go' },
          { label: 'Hallucination risk', left: 'Higher (more room to fill)', right: 'Lower (constrained output)' },
        ]}
      />

      <SectionHeader number={6} title="Technique 5 — Context Injection" />
      <p>
        Language models have no memory between conversations and no access to your codebase, docs, or data.
        Context injection means pasting the relevant information directly into the prompt so the model works
        with your actual situation rather than a generic one.
      </p>

      <ErrorFix
        bad={`Why is my Next.js app slow?`}
        good={`Here is my Next.js app's Lighthouse report (score: 34):
- LCP: 8.2s (image hero, no priority attribute)
- TBT: 1,200ms (two 400KB client-side JS bundles)
- CLS: 0.42 (dynamic content inserted above the fold)

My stack: Next.js 14 App Router, Tailwind, no image optimization configured.

Based on this specific data, what are the top 3 changes that will have the most impact?`}
        badLabel="No context"
        goodLabel="Real data injected"
      />

      <AlertBox type="warning" title="Sensitive data warning">
        Never paste real user data, API keys, passwords, database contents, or HIPAA/PII data into AI prompts.
        Use placeholders like [REDACTED], [USER_EMAIL], or masked values.
        See our <a href="/blog/hipaa-compliant-ai-development" className="underline">HIPAA-compliant AI guide</a> for masking workflows.
      </AlertBox>

      <SectionHeader number={7} title="Technique 6 — Iterative Refinement" />
      <p>
        Treat AI conversations as a dialogue, not a one-shot query. Start broad, then narrow down with follow-up
        instructions. This is faster than trying to write the perfect prompt on the first attempt.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Send the initial prompt',
            description: 'Get a baseline response. Don\'t overthink the first message.',
            code: 'Write a function to validate a credit card number.',
          },
          {
            title: 'Refine with constraints',
            description: 'Add the specifics you want changed or added.',
            code: 'Make it TypeScript. Use the Luhn algorithm. Return { valid: boolean, error?: string }.',
          },
          {
            title: 'Add edge cases',
            description: 'Ask the model to test its own output.',
            code: 'Now write 5 unit tests covering: valid card, expired, wrong length, non-numeric, Amex 15-digit.',
          },
          {
            title: 'Request the final version',
            description: 'Have the model produce a clean, combined final version.',
            code: 'Output the final function + tests as a single TypeScript file.',
          },
        ]}
      />

      <SectionHeader number={8} title="Prompt Template Library" />
      <p>Save these reusable templates for common developer tasks:</p>

      <CodeBlock language="text" filename="Code Review Template">
{`Review this [LANGUAGE] code for:
1. Correctness — logic errors or edge cases
2. Security — any injection, auth, or data exposure risks
3. Performance — unnecessary loops, missing indexes, N+1 queries
4. Readability — naming, comments, structure

Rate each category 1-5 and explain the top issue in each.

\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\``}
      </CodeBlock>

      <CodeBlock language="text" filename="Documentation Generator">
{`Generate JSDoc comments for this TypeScript function.

Include:
- @description: one sentence, plain English
- @param: for each parameter with type and purpose
- @returns: what the function returns and when
- @throws: any errors this can throw
- @example: one realistic usage example

\`\`\`typescript
[PASTE FUNCTION HERE]
\`\`\``}
      </CodeBlock>

      <CodeBlock language="text" filename="Bug Explanation Template">
{`I have a bug. Here is everything I know:

ERROR MESSAGE:
[paste error]

CODE WHERE IT HAPPENS:
\`\`\`[language]
[paste code]
\`\`\`

WHAT I EXPECTED:
[expected behavior]

WHAT ACTUALLY HAPPENED:
[actual behavior]

WHAT I'VE TRIED:
[list attempted fixes]

Please: (1) explain the root cause, (2) give the fix, (3) explain why the fix works.`}
      </CodeBlock>

      <SectionHeader number={9} title="Model-Specific Tips" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'GPT-4o',
            description: 'Excellent at following format specs. Use JSON output mode for structured data. Handles very long context well.',
          },
          {
            title: 'Claude 3.5 Sonnet',
            description: 'Strong reasoning and nuanced writing. Responds well to "think step by step." Great for code review and analysis.',
          },
          {
            title: 'Gemini 1.5 Pro',
            description: 'Long context champion (1M tokens). Best for analyzing large codebases or long documents.',
          },
          {
            title: 'Local Models (Llama, Mistral)',
            description: 'Good for sensitive data — nothing leaves your machine. Simpler prompts work better. Less instruction-following.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'How long should a prompt be?',
            answer: 'As long as necessary, no longer. Include all the context the model needs but cut padding. A well-structured 200-word prompt often outperforms a vague 20-word one — but 2000 words of filler is worse than 50 words of clarity.',
          },
          {
            question: 'What is the difference between a system prompt and a user prompt?',
            answer: 'System prompts set persistent instructions (role, tone, format rules) that apply to the whole conversation. User prompts are individual messages. Most API-based applications use system prompts to set behavior; chat UIs just have user messages.',
          },
          {
            question: 'Why does the same prompt give different results each time?',
            answer: 'Temperature controls randomness. Most chat interfaces use temperature ~0.7-1.0 for variety. For consistent outputs (code, JSON, data extraction), use temperature=0 via the API. For creative tasks, higher temperature produces more variety.',
          },
          {
            question: 'What is prompt injection and should I worry about it?',
            answer: 'Prompt injection is when malicious user input overrides your system instructions. If you\'re building an AI app where users can provide input that gets included in prompts, yes — you should sanitize that input and test for injection. For personal use, it\'s not a concern.',
          },
          {
            question: 'Do I need to use the word "please" with AI?',
            answer: 'No effect on output quality. Use whatever feels natural. The model doesn\'t have feelings — but it also doesn\'t penalize polite language.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
