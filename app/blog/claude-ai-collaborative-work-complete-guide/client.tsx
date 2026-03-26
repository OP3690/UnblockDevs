'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function ClaudeAiCollaborativeWorkCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Claude AI for Collaborative Work — Complete Guide: Teams, Projects, and Workflows</h1>
      <p className="lead">
        Claude is built for serious work — long documents, careful analysis, and complex reasoning.
        This guide shows how teams use Claude for research, writing, code review, and collaborative
        projects, with prompts, workflows, and best practices for getting the most out of Claude's
        unique strengths.
      </p>

      <StatGrid stats={[
        { value: '200K', label: 'token context window (Claude 3.5 Sonnet)', color: 'blue' },
        { value: '~150K', label: 'words of text in a single conversation', color: 'green' },
        { value: 'API', label: 'available via Anthropic API for custom integrations', color: 'purple' },
        { value: 'Nuanced', label: 'best in class for careful, thoughtful analysis', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Claude Does Better Than Other AI" />
      <QuickFact>
        Claude's key advantages: very large context window (you can upload entire codebases or
        long documents), nuanced reasoning with acknowledgment of uncertainty, careful instruction
        following, and strong performance on complex multi-step analysis tasks.
      </QuickFact>

      <CompareTable
        leftLabel="Task"
        rightLabel="Claude's Strength"
        rows={[
          { label: 'Long documents', left: 'Analyze entire books, codebases, reports', right: 'Industry-leading 200K token context' },
          { label: 'Code review', left: 'Review large PRs with context', right: 'Understands multi-file relationships' },
          { label: 'Research analysis', left: 'Synthesize multiple sources', right: 'Careful reasoning, notes uncertainty' },
          { label: 'Writing', left: 'Nuanced, sophisticated prose', right: 'Better calibration of tone and voice' },
          { label: 'Safety', left: 'Refuses harmful requests cleanly', right: 'Constitutional AI training' },
        ]}
      />

      <SectionHeader number={2} title="Claude for Research and Analysis" />
      <CodeBlock language="text" filename="Research Prompt Template">
{`System: You are a research analyst. Be precise, cite uncertainty when present,
and structure your analysis clearly.

User:
I'm attaching [document/report/data]. Please:

1. Executive Summary (3-4 bullets)
2. Key findings with supporting evidence
3. Gaps or limitations in the data
4. Implications for [your context]
5. Questions I should investigate further

Focus on [specific aspect]. Note any assumptions you're making.

[Paste document content]`}
      </CodeBlock>

      <SectionHeader number={3} title="Claude for Code Review and Development" />
      <CodeBlock language="text" filename="Code Review Prompt">
{`Review this code for:
1. Security vulnerabilities (SQL injection, XSS, auth issues)
2. Performance issues
3. Error handling gaps
4. Code quality and maintainability
5. Test coverage suggestions

For each issue found:
- Severity: [Critical/High/Medium/Low]
- Location: [file:line]
- Issue: [description]
- Suggested fix: [code example]

[Paste code]`}
      </CodeBlock>

      <AlertBox type="tip" title="Use Claude for architecture discussions">
        Claude excels at discussing trade-offs in system design. Share your requirements and ask:
        "I'm building X. The constraints are Y. Compare these three approaches: A, B, C. What are
        the trade-offs for my specific context?" The nuanced analysis is often better than generic
        Stack Overflow answers.
      </AlertBox>

      <SectionHeader number={4} title="Claude for Writing and Editing" />
      <KeyPointsGrid columns={2} items={[
        { title: 'First Draft Generation', description: 'Provide an outline, key points, and target audience. Claude generates a full draft you can edit. Much faster than starting from blank page.' },
        { title: 'Tone Refinement', description: '"Make this more formal," "Make this warmer," "This sounds robotic — rewrite conversationally." Claude handles voice and tone adjustments precisely.' },
        { title: 'Technical Documentation', description: 'Feed Claude your code and ask for: README, API documentation, usage examples, and getting-started guide. Consistent quality documentation fast.' },
        { title: 'Translation and Localization', description: 'Claude translates with cultural context, not just literal word swap. Specify the target audience and regional variant (Brazilian Portuguese vs. European Portuguese).' },
      ]} />

      <SectionHeader number={5} title="Team Workflows with Claude" />
      <KeyPointsGrid columns={1} items={[
        { title: 'Meeting Summaries', description: 'Paste transcript or notes → Claude generates: key decisions, action items, open questions, and a concise summary for stakeholders. Saves 30 min per meeting.' },
        { title: 'RFP and Proposal Writing', description: 'Share the RFP document and your company\'s capabilities. Claude drafts responses addressing each requirement. Dramatically faster than manual writing.' },
        { title: 'Legal Document Review', description: 'Upload contracts and ask Claude to identify: unusual clauses, missing protections, potential risks, and summary of key terms. Not a replacement for legal review, but great for initial screening.' },
      ]} />

      <SectionHeader number={6} title="Claude API — Building Custom Integrations" />
      <CodeBlock language="python" filename="Claude API Integration">
{`import anthropic

client = anthropic.Anthropic()

def analyze_document(document_text: str, analysis_type: str) -> str:
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

# Use in a Slack bot, web app, or internal tool
result = analyze_document(contract_text, "vendor contract")
post_to_slack(result)`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is Claude\'s context window and why does it matter?',
          answer: 'Claude 3.5 Sonnet has a 200,000 token context window — roughly 150,000 words or 500 pages of text. This means you can upload entire codebases, long reports, or full books and ask questions about them. GPT-4o has a 128K token context window. The larger context enables qualitatively different tasks — reviewing a whole codebase vs. individual files.',
        },
        {
          question: 'How is Claude different from ChatGPT for work tasks?',
          answer: 'Claude is generally considered stronger at: following complex instructions precisely, analyzing long documents, acknowledging uncertainty, and nuanced writing. ChatGPT (GPT-4o) is generally stronger at: math/coding benchmarks, image understanding, real-time web search (with browsing enabled), and has a larger plugin ecosystem. For most text-heavy work tasks, the differences are minor.',
        },
        {
          question: 'Can I use Claude securely for confidential documents?',
          answer: 'Claude.ai Pro and Claude for Teams include data privacy commitments — your conversations are not used for training by default. For enterprise use with strict compliance requirements (HIPAA, SOC2), the Anthropic API with enterprise agreements provides the strongest protections. Don\'t paste confidential information into any AI without checking the privacy policy.',
        },
        {
          question: 'What are Claude\'s limitations for collaborative work?',
          answer: 'Claude has a knowledge cutoff date (no real-time information), cannot browse the web by default, lacks memory between separate conversations, and occasionally makes confident-sounding errors on factual questions. Always verify factual claims in research work and treat Claude as a first-draft assistant rather than a primary source.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
