'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function ClaudeAiCollaborativeWorkCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Claude AI for Collaborative Work — Complete Guide: Teams, Projects, and Workflows</h1>
      <p className="lead">
        Claude is built for serious work — long documents, careful analysis, and complex reasoning.
        This guide shows how teams use Claude for research, writing, code review, and collaborative
        projects, with prompts, workflows, and best practices for getting the most out of Claude's
        unique strengths including its 200K token context window.
      </p>

      <StatGrid stats={[
        { value: '200K', label: 'token context window (Claude 3.5 Sonnet)', color: 'blue' },
        { value: '~150K', label: 'words of text in a single conversation', color: 'green' },
        { value: 'API', label: 'available via Anthropic API for custom integrations', color: 'purple' },
        { value: 'Nuanced', label: 'best in class for careful, thoughtful analysis', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Claude Does Better Than Other AI" />
      <QuickFact color="blue" label="Claude's key differentiators">
        Claude's key advantages: very large context window (you can upload entire codebases or
        long documents), nuanced reasoning with honest acknowledgment of uncertainty, careful
        instruction following even for complex multi-step tasks, and strong performance on
        analysis that requires weighing competing considerations.
      </QuickFact>

      <CompareTable
        leftLabel="Task"
        rightLabel="Claude's Strength"
        rows={[
          { label: 'Long documents', left: 'Analyze entire books, codebases, reports in one pass', right: 'Industry-leading 200K token context — 150K words at once' },
          { label: 'Code review', left: 'Review large PRs with full multi-file context', right: 'Understands cross-file relationships and architecture' },
          { label: 'Research analysis', left: 'Synthesize multiple complex sources', right: 'Careful reasoning, explicitly notes uncertainty' },
          { label: 'Writing', left: 'Nuanced, sophisticated long-form prose', right: 'Better calibration of tone, voice, and audience' },
          { label: 'Instruction following', left: 'Complex multi-step instructions', right: 'Follows detailed formatting and structure requirements' },
          { label: 'Safety', left: 'Refuses harmful requests with clear explanation', right: 'Constitutional AI training, less likely to hallucinate confidently' },
        ]}
      />

      <SectionHeader number={2} title="Claude for Research and Analysis" />
      <CodeBlock language="text" filename="Research Prompt Template">
{`System: You are a research analyst. Be precise, cite uncertainty when present,
and structure your analysis clearly. When you don't know something, say so.

User:
I'm attaching [document/report/data]. Please:

1. Executive Summary (3-4 bullets, max 100 words)
2. Key findings with supporting evidence from the document
3. Gaps or limitations in the data or analysis
4. Implications for [your specific context/decision]
5. Questions I should investigate further

Focus specifically on [aspect]. Note any assumptions you're making.
Avoid hedging everything — be direct about what the data shows.

[Paste document content]`}
      </CodeBlock>

      <AlertBox type="tip" title="Use Claude's 200K context for competitive research">
        Upload 10 competitor websites, product docs, or earnings calls in a single conversation and
        ask: "Across all these documents, what are the common themes, key differentiators, and gaps
        no one is addressing?" Claude maintains the full context and synthesizes across all sources —
        something that would take a team of analysts days to do manually.
      </AlertBox>

      <SectionHeader number={3} title="Claude for Code Review and Development" />
      <CodeBlock language="text" filename="Code Review Prompt">
{`Review this code for the following, in order of priority:

1. Security vulnerabilities (SQL injection, XSS, insecure direct object reference, auth bypass)
2. Performance issues (N+1 queries, missing indexes, blocking operations)
3. Error handling gaps (unhandled exceptions, missing validation, silent failures)
4. Code quality and maintainability (clarity, duplication, overly complex logic)
5. Test coverage suggestions

For each issue found, provide:
- Severity: Critical / High / Medium / Low
- Location: file:line
- Issue: clear description of the problem
- Risk: what could go wrong if not fixed
- Suggested fix: working code example

Flag anything that looks like a potential race condition or concurrency issue.

[Paste code]`}
      </CodeBlock>

      <CodeBlock language="python" filename="Automated Code Review with Claude API">
{`import anthropic
from pathlib import Path

client = anthropic.Anthropic()

def review_pull_request(changed_files: list[dict]) -> str:
    """
    Review a set of changed files from a pull request.
    changed_files: [{"filename": "...", "patch": "...", "content": "..."}]
    """
    files_text = "\n\n".join(
        f"### {f['filename']}\n\`\`\`\n{f['content']}\n\`\`\`"
        for f in changed_files
    )

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4096,
        system=(
            "You are a senior engineer conducting a thorough code review. "
            "Be specific and actionable. Provide code examples for all suggestions."
        ),
        messages=[{
            "role": "user",
            "content": f"Review these changed files:\\n\\n{files_text}"
        }]
    )
    return message.content[0].text

# Use in a GitHub Actions workflow
# result = review_pull_request(get_pr_files(pr_number))
# post_pr_comment(pr_number, result)`}
      </CodeBlock>

      <SectionHeader number={4} title="Claude for Writing and Editing" />
      <KeyPointsGrid columns={2} items={[
        { title: 'First Draft Generation', description: 'Provide an outline, key points, and target audience. Claude generates a full structured draft you edit from. Dramatically faster than starting from a blank page, especially for technical content.' },
        { title: 'Tone Refinement', description: '"Make this more formal," "Make this warmer," "This sounds robotic — rewrite conversationally while keeping all the technical details." Claude handles voice and tone adjustments with precision.' },
        { title: 'Technical Documentation', description: 'Feed Claude your code and ask for: README, API documentation, usage examples, getting-started guide, and inline comments. Produces consistent, professional documentation quickly.' },
        { title: 'Translation and Localization', description: 'Claude translates with cultural context, not just literal word swap. Specify: "Translate to Brazilian Portuguese for a business audience. Use formal register." Handles 30+ languages well.' },
        { title: 'Email and Communication', description: 'Paste a long email thread and ask Claude to: draft a reply, summarize the key decisions, or identify the action items. Saves hours in email-heavy workflows.' },
        { title: 'Legal Document Review', description: 'Upload contracts and ask Claude to identify: unusual clauses, missing standard protections, key terms summary, and potential risks. Not a legal replacement, but excellent for initial screening before lawyer review.' },
      ]} />

      <SectionHeader number={5} title="Team Workflows with Claude" />
      <VerticalSteps steps={[
        { title: 'Meeting Summaries', desc: 'Paste transcript or notes → Claude generates: key decisions, action items with owners, open questions, and a concise summary for stakeholders. Use Otter.ai transcript → Claude prompt → Notion update. Saves 30+ minutes per meeting.' },
        { title: 'RFP and Proposal Writing', desc: 'Share the RFP document and your company capabilities. Claude drafts responses addressing each requirement with evidence from your materials. Reduces proposal writing time from days to hours.' },
        { title: 'Onboarding Documentation', desc: 'Share your codebase, architecture docs, and runbooks. Ask Claude to generate: new hire onboarding guide, architecture overview, and common task how-tos. Self-updating documentation that reflects reality.' },
        { title: 'Performance Reviews', desc: 'Share weekly updates, project outcomes, and peer feedback. Claude synthesizes into structured review drafts that managers can edit. Reduces review writing time from 2-4 hours to 30 minutes.' },
        { title: 'Technical Specification Writing', desc: 'Describe a feature in plain language. Claude generates: technical spec with edge cases, API design, data model, and implementation considerations. Review and refine rather than write from scratch.' },
        { title: 'Customer Support Escalation Analysis', desc: 'Upload support tickets and Claude identifies: patterns, root causes, priority ranking, and draft responses for each ticket category. Build a knowledge base from resolved escalations automatically.' },
      ]} />

      <SectionHeader number={6} title="Claude API — Building Custom Integrations" />
      <CodeBlock language="python" filename="Claude API — document analysis integration">
{`import anthropic

client = anthropic.Anthropic()

def analyze_document(document_text: str, analysis_type: str) -> str:
    """Analyze a document using Claude's 200K context window."""
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4096,
        system="You are a business analyst. Provide structured, actionable analysis.",
        messages=[
            {
                "role": "user",
                "content": f"Analyze this {analysis_type}:\\n\\n{document_text}"
            }
        ]
    )
    return message.content[0].text


def batch_analyze(documents: list[tuple[str, str]]) -> list[dict]:
    """
    Analyze multiple documents.
    documents: [(content, type), ...]
    """
    results = []
    for content, doc_type in documents:
        analysis = analyze_document(content, doc_type)
        results.append({"type": doc_type, "analysis": analysis})
    return results


# Use in a Slack bot, web app, or internal tool
# result = analyze_document(contract_text, "vendor contract for SaaS tool")
# post_to_slack(result)

# Streaming for long documents:
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Analyze this 100-page report: ..."}],
) as stream:
    for text_chunk in stream.text_stream:
        print(text_chunk, end="", flush=True)  # stream to frontend in real-time`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is Claude\'s context window and why does it matter?',
          answer: 'Claude 3.5 Sonnet has a 200,000 token context window — roughly 150,000 words or 500 pages of text. This means you can upload entire codebases, long reports, or full books and ask questions about them in a single conversation. GPT-4o has a 128K token context window. The larger context enables qualitatively different tasks — reviewing a whole 50-file codebase vs. individual files, or synthesizing 20 competitor reports at once.',
        },
        {
          question: 'How is Claude different from ChatGPT for work tasks?',
          answer: 'Claude is generally stronger at: following complex multi-step instructions precisely, analyzing very long documents, acknowledging uncertainty rather than hallucinating confidently, and nuanced long-form writing. ChatGPT (GPT-4o) is generally stronger at: math and coding benchmarks, multimodal image understanding, real-time web search (with browsing enabled), and has a larger plugin/tool ecosystem. For most text-heavy work tasks the quality difference is minor — workflow fit matters more than model benchmarks.',
        },
        {
          question: 'Can I use Claude securely for confidential documents?',
          answer: 'Claude.ai Pro and Claude for Teams include data privacy commitments — your conversations are not used for training by default. For enterprise use with strict compliance requirements (HIPAA, SOC2, GDPR), the Anthropic API with enterprise agreements provides the strongest data handling protections. Never paste confidential information (passwords, PII, trade secrets) into any AI without verifying the privacy policy. For maximum security, deploy Claude via the API in your own infrastructure.',
        },
        {
          question: 'What are Claude\'s limitations for collaborative work?',
          answer: 'Claude has a knowledge cutoff date (no real-time information without tools), cannot browse the web by default, lacks persistent memory between separate conversations, and occasionally makes confident-sounding errors on specific factual questions. Always verify factual claims in research work, treat Claude as a first-draft assistant rather than a primary source, and check numerical data independently. The model is excellent at reasoning but not infallible.',
        },
        {
          question: 'How should I write system prompts for Claude for team use?',
          answer: 'Effective system prompts for team deployments: (1) Define the role: "You are a senior legal analyst specializing in SaaS contracts." (2) Set output format: "Structure responses with: Summary, Key Risks, Action Items, Open Questions." (3) Set calibration: "When uncertain, say so explicitly rather than speculating." (4) Set scope: "Focus only on the documents provided — don\'t use general knowledge." (5) Set communication style: "Write for a non-technical business audience." Test the system prompt with representative tasks before deploying.',
        },
        {
          question: 'Can Claude work with files and attachments?',
          answer: 'Yes — Claude.ai supports file uploads (PDFs, Word docs, code files, images) directly in the chat interface. Via the API, you can send text content, base64-encoded images, and PDFs using the document content type. For very large documents (over 100K tokens), consider chunking strategically — send the most relevant sections first and use follow-up messages to drill into specific parts. Claude maintains context across the full conversation, so you can ask follow-up questions about earlier uploads.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
