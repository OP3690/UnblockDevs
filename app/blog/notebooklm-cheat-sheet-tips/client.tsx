'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function NotebooklmCheatSheetTipsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>NotebookLM Cheat Sheet: Tips, Tricks &amp; Complete Quick Reference Guide</h1>
      <p className="lead">
        NotebookLM is Google's AI-powered research assistant that lets you upload documents and ask questions about them. This cheat sheet compiles every proven tip, question template, workflow, and power-user technique to help you get dramatically better results — whether you're analyzing research papers, processing meeting notes, or creating content.
      </p>

      <StatGrid stats={[
        { value: '50', label: 'Sources per notebook', color: 'blue' },
        { value: '25MB', label: 'Max file size per source', color: 'green' },
        { value: '500K', label: 'Words per source', color: 'purple' },
        { value: '10x', label: 'Faster research synthesis', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Getting Started: Setup Fundamentals" />

      <p>
        Before diving into tips and tricks, understanding how NotebookLM processes documents is critical. NotebookLM does not have access to the general web — it only knows what is in your uploaded sources. Every answer it gives is grounded in your specific documents, with citations pointing back to the exact passage used.
      </p>

      <AlertBox type="info" title="How NotebookLM Works">
        NotebookLM reads your uploaded sources and creates an AI model specifically tuned to your content. It cannot hallucinate facts from outside your documents — if the information is not in your sources, it will tell you it cannot find it.
      </AlertBox>

      <VerticalSteps steps={[
        {
          title: 'Create a focused notebook',
          description: 'Name your notebook descriptively: "Research: Climate Policy 2024" or "Analysis: Q3 Earnings Reports". Avoid generic names like "Notebook 1".',
        },
        {
          title: 'Upload 2–5 related documents to start',
          description: 'Start with a small, coherent set of documents. You can always add more. Uploading unrelated documents confuses the context.',
        },
        {
          title: 'Wait for full processing',
          description: 'NotebookLM shows a loading indicator while processing. Do not ask questions until all sources show as ready — partial processing gives incomplete answers.',
        },
        {
          title: 'Begin with broad questions, then narrow',
          description: 'Start with "Summarize the key themes across all sources" before drilling into specifics. This helps you map the terrain before exploring details.',
        },
        {
          title: 'Verify citations on important answers',
          description: 'NotebookLM shows inline citations. Click them to verify the exact passage. Never use AI-generated information without tracing it to the source.',
        },
      ]} />

      <QuickFact>NotebookLM supports PDF, Google Docs, Google Slides, web URLs, YouTube videos, and plain text files as source types.</QuickFact>

      <SectionHeader number={2} title="Question Templates You Can Copy and Use" />

      <p>
        The quality of your output is directly proportional to the quality of your questions. These templates have been tested across hundreds of use cases and consistently produce high-quality, actionable responses.
      </p>

      <h3>Summary Templates</h3>
      <CodeBlock language="text" filename="Summary Prompts">
{`Summarize the main points from [source/topic] in bullet points.
What are the 5 most important takeaways from these documents?
Create a one-paragraph executive summary of [topic].
Summarize [topic] for someone with no technical background.
What are the key findings and what evidence supports them?`}
      </CodeBlock>

      <h3>Analysis Templates</h3>
      <CodeBlock language="text" filename="Analysis Prompts">
{`What are the common themes across all uploaded sources?
Compare and contrast [topic A] and [topic B] from the sources.
What are the strengths and weaknesses of [approach/method]?
What patterns do you see across these documents?
What are the contradictions or disagreements between sources?`}
      </CodeBlock>

      <h3>Content Creation Templates</h3>
      <CodeBlock language="text" filename="Content Creation Prompts">
{`Create a detailed outline for a blog post about [topic].
Write an introduction paragraph about [topic] for a [technical/general] audience.
Generate 10 key questions someone would ask about [topic].
Create a study guide with key concepts, definitions, and examples.
Write a LinkedIn post summarizing the key insight from these sources.`}
      </CodeBlock>

      <h3>Extraction Templates</h3>
      <CodeBlock language="text" filename="Extraction Prompts">
{`What are all the action items and who owns them?
Extract all dates, deadlines, and milestones mentioned.
List all key metrics, numbers, and their context.
What are the main recommendations from [source]?
Extract all technical terms and provide definitions from the text.`}
      </CodeBlock>

      <SectionHeader number={3} title="Power User Techniques" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Multi-Source Synthesis',
          description: 'Upload 5–10 related papers or reports, then ask: "What are the common findings and where do sources disagree?" This compresses hours of reading into minutes.',
        },
        {
          title: 'Progressive Refinement',
          description: 'Never expect a perfect output in one shot. Ask broad, get a draft, then request: "Make this more concise", "Add examples", "Format as a table".',
        },
        {
          title: 'Persona-Based Prompting',
          description: 'Specify your audience: "Explain this to a non-technical executive" or "Write for a first-year medical student." Context dramatically improves relevance.',
        },
        {
          title: 'Structured Output Requests',
          description: 'Explicitly request formats: "Create a comparison table with columns: Feature, Pros, Cons, Best Use Case." Structured requests produce structured, usable outputs.',
        },
        {
          title: 'Citation Verification Workflow',
          description: 'After any important answer, ask: "Which specific sources and page numbers did you use?" Then manually verify those passages before using the information.',
        },
        {
          title: 'Contradiction Mining',
          description: 'Ask: "Where do these sources contradict each other?" This is especially powerful for literature reviews and balanced analysis.',
        },
      ]} />

      <AlertBox type="tip" title="The Iteration Rule">
        Treat every NotebookLM output as a first draft. The best users get 3–5x better results by following up with refinement requests: "Make it shorter", "Add more specific examples", "Convert this to a table", "Rewrite for a business audience".
      </AlertBox>

      <SectionHeader number={4} title="Common Mistakes and How to Fix Them" />

      <ErrorFix
        bad={`Tell me about this document.
What is this about?
Summarize everything.`}
        good={`What are the 3 main findings from Section 2 of this research paper?
What methodology did the authors use and what were its limitations?
Create a bullet-point summary of the key recommendations.`}
        badLabel="Vague questions (bad)"
        goodLabel="Specific questions (good)"
      />

      <ErrorFix
        bad={`Upload: 10-K filing + recipe blog + travel photos description
Ask: "What are the key risks?"
Result: Confused, irrelevant answers`}
        good={`Upload: 10-K filing + analyst report + earnings call transcript
Ask: "What are the key financial risks and how do analysts view them?"
Result: Precise, cross-referenced financial risk analysis`}
        badLabel="Mixing unrelated sources (bad)"
        goodLabel="Grouping related sources (good)"
      />

      <CompareTable
        leftLabel="Mistake"
        rightLabel="Fix"
        rows={[
          { label: 'Vague questions', left: '"Tell me about this"', right: '"What are the 3 main findings from section 2?"' },
          { label: 'Unverified facts', left: 'Using answers without checking citations', right: 'Click citations and verify the source passage' },
          { label: 'Wrong document mix', left: 'Uploading unrelated documents', right: 'One notebook per topic or project' },
          { label: 'One-shot requests', left: 'Accepting first output as final', right: 'Iterate: refine, reformat, expand' },
          { label: 'No format specified', left: '"Explain this topic"', right: '"Create a table with 3 columns: Concept, Definition, Example"' },
        ]}
      />

      <SectionHeader number={5} title="Complete Workflow Examples" />

      <h3>Research Paper Analysis Workflow</h3>
      <VerticalSteps steps={[
        { title: 'Upload the PDF', description: 'Use the PDF directly — not a screenshot. NotebookLM extracts text from actual PDFs.' },
        { title: 'Get the overview', description: 'Ask: "Summarize the main findings, methodology, and limitations of this paper."' },
        { title: 'Drill into methodology', description: 'Ask: "Explain the research methodology in detail. What were its strengths and weaknesses?"' },
        { title: 'Extract key data', description: 'Ask: "List all statistics and data points mentioned, with their context."' },
        { title: 'Generate study material', description: 'Ask: "Create a study guide with key concepts, definitions, and 5 practice questions with answers."' },
      ]} />

      <h3>Meeting Notes Processing Workflow</h3>
      <VerticalSteps steps={[
        { title: 'Upload transcript or notes', description: 'Works with Otter.ai exports, Zoom transcripts, Google Docs meeting notes, or plain text.' },
        { title: 'Extract decisions', description: 'Ask: "What decisions were made in this meeting? List them with context."' },
        { title: 'Get action items', description: 'Ask: "Extract all action items, who owns them, and any deadlines mentioned."' },
        { title: 'Identify blockers', description: 'Ask: "What concerns, blockers, or open questions were raised?"' },
        { title: 'Draft follow-up email', description: 'Ask: "Write a concise follow-up email summarizing the key decisions and action items from this meeting."' },
      ]} />

      <h3>Content Creation Workflow</h3>
      <VerticalSteps steps={[
        { title: 'Upload source material', description: 'Add 3–5 articles, reports, or research papers related to your topic.' },
        { title: 'Find common themes', description: 'Ask: "What are the 5 most important themes across all sources?"' },
        { title: 'Build an outline', description: 'Ask: "Create a detailed blog post outline about [topic] based on these themes."' },
        { title: 'Draft each section', description: 'Ask: "Write the introduction section with a hook and thesis statement."' },
        { title: 'Refine for audience', description: 'Ask: "Rewrite this for a general business audience. Make it engaging and remove jargon."' },
      ]} />

      <SectionHeader number={6} title="Supported File Types and Limits" />

      <CompareTable
        leftLabel="Source Type"
        rightLabel="Best For"
        rows={[
          { label: 'PDF', left: 'Up to 25MB, 500K words', right: 'Research papers, reports, books' },
          { label: 'Google Docs', left: 'Connected via Drive', right: 'Meeting notes, drafts, internal docs' },
          { label: 'Google Slides', left: 'Connected via Drive', right: 'Presentations, pitch decks' },
          { label: 'Web URL', left: 'Public web pages only', right: 'Articles, blog posts, documentation' },
          { label: 'YouTube URL', left: 'Public videos with captions', right: 'Lectures, talks, tutorials' },
          { label: 'Plain text (.txt)', left: 'Up to 500K words', right: 'Code docs, transcripts, notes' },
        ]}
      />

      <AlertBox type="warning" title="File Limitations to Know">
        Scanned PDFs (image-based) may not be processed correctly. NotebookLM needs actual text content, not images of text. Use OCR tools to convert scanned documents before uploading.
      </AlertBox>

      <SectionHeader number={7} title="NotebookLM Use Cases by Profession" />

      <KeyPointsGrid columns={3} items={[
        {
          title: 'Students & Researchers',
          description: 'Analyze papers, create study guides, synthesize literature reviews, generate practice questions, and find contradictions across sources.',
        },
        {
          title: 'Product Managers',
          description: 'Process user research, extract themes from interview transcripts, summarize competitive analysis, and turn meeting notes into action items.',
        },
        {
          title: 'Journalists & Writers',
          description: 'Research topics from multiple sources, find contradictions, extract key quotes, and build article outlines backed by cited sources.',
        },
        {
          title: 'Lawyers & Legal Teams',
          description: 'Analyze contracts, extract key clauses, compare similar documents, and summarize case-relevant content from large document sets.',
        },
        {
          title: 'Executives & Managers',
          description: 'Digest lengthy reports quickly, extract recommendations, compare vendor proposals, and generate executive summaries from technical documents.',
        },
        {
          title: 'Engineers & Developers',
          description: 'Process API documentation, extract technical specifications, compare implementation approaches, and generate code documentation from specs.',
        },
      ]} />

      <SectionHeader number={8} title="Advanced Audio Overview Feature" />

      <p>
        NotebookLM's Audio Overview feature generates a podcast-style conversation between two AI hosts discussing your uploaded sources. This is a breakthrough feature for learning and sharing complex material.
      </p>

      <VerticalSteps steps={[
        { title: 'Click "Generate" in the Audio Overview panel', description: 'Available in the bottom-left of your notebook. Processing takes 1–3 minutes depending on source length.' },
        { title: 'Customize with instructions', description: 'Click the customize button and provide focus instructions: "Focus on the methodology and key findings" or "Keep it under 10 minutes".' },
        { title: 'Download for offline use', description: 'Downloaded audio files can be listened to during commutes, exercise, or any offline context.' },
        { title: 'Share with colleagues', description: 'Audio Overviews are shareable — ideal for teams who need to consume long reports without reading them.' },
      ]} />

      <AlertBox type="success" title="Best Use of Audio Overview">
        Use Audio Overview for dense academic papers or long reports that are hard to read. The conversational format makes complex information more digestible. Create one before a meeting to quickly get up to speed on a topic.
      </AlertBox>

      <SectionHeader number={9} title="Do This, Not That: Quick Reference Checklist" />

      <CompareTable
        leftLabel="Do This"
        rightLabel="Not That"
        rows={[
          { label: 'Questions', left: 'Ask specific, targeted questions with desired output format', right: 'Ask vague questions like "tell me about this"' },
          { label: 'Documents', left: 'Group topically related documents in one notebook', right: 'Mix unrelated topics in a single notebook' },
          { label: 'Citations', left: 'Click and verify every citation on important answers', right: 'Accept answers without checking sources' },
          { label: 'Iteration', left: 'Refine outputs through multiple follow-up requests', right: 'Use first draft output as final' },
          { label: 'Format', left: 'Specify exact output format: table, bullet list, outline', right: 'Let the AI pick its own format' },
          { label: 'Audience', left: 'Specify who the output is for and their technical level', right: 'Leave audience context unspecified' },
          { label: 'Sources', left: 'Upload 3–10 high-quality, relevant sources', right: 'Upload a single document or too many irrelevant ones' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What are the best NotebookLM tips for getting accurate answers?',
          answer: 'The top tips for accuracy are: (1) Ask specific questions with clear scope — "What are the 3 main findings from section 2?" beats "Tell me about this". (2) Always verify citations by clicking them and reading the source passage. (3) Group topically related documents together so context is coherent. (4) Upload high-quality, text-based PDFs rather than scanned images. (5) Ask follow-up questions to drill into details rather than accepting surface-level summaries.',
        },
        {
          question: 'How many sources should I add to a NotebookLM notebook?',
          answer: 'Start with 2–5 closely related sources for your first experiment. The ideal range for most projects is 5–15 sources. You can add up to 50 sources per notebook. The key constraint is coherence: all sources should be related to the same topic or project. Mixing unrelated documents degrades answer quality significantly.',
        },
        {
          question: 'What file types does NotebookLM support?',
          answer: 'NotebookLM supports: PDF files (up to 25MB), Google Docs (via Drive), Google Slides (via Drive), web URLs (public pages only), YouTube video URLs (if the video has captions), and plain text files (.txt). Important: scanned PDFs that are image-based may not be processed correctly — NotebookLM needs actual text content. Use OCR first for scanned documents.',
        },
        {
          question: 'Can NotebookLM hallucinate or make up information?',
          answer: 'NotebookLM is specifically designed to minimize hallucination by grounding every answer in your uploaded sources. It will tell you when it cannot find information in your sources rather than making something up. However, it can still misinterpret passages, draw incorrect inferences, or misattribute information. Always verify important claims by clicking the citation links and reading the original passage.',
        },
        {
          question: 'What is the best way to use NotebookLM for research papers?',
          answer: 'The best research paper workflow: (1) Upload the PDF and any supplementary materials. (2) Start with "Summarize the key findings, methodology, and limitations." (3) Ask "What evidence supports the main claims?" to verify reasoning. (4) Ask "What are the weaknesses or criticisms of this methodology?" (5) Request "Create a structured summary table with: Finding, Evidence, Confidence Level." (6) Generate a study guide for key concepts. (7) Compare with other uploaded papers: "Where does this paper agree or disagree with [other source]?"',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
