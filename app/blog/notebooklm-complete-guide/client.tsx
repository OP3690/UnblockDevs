'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function NotebooklmCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>NotebookLM Complete Guide: How to Use Google's AI Notebook Effectively</h1>
      <p className="lead">
        NotebookLM is Google's AI-powered research assistant that transforms how you read, analyze, and work with documents. Unlike general-purpose chatbots, NotebookLM is source-grounded — meaning every answer it gives is backed by your uploaded documents, with citations pointing to exact passages. This complete guide covers everything from setup to advanced power-user techniques.
      </p>

      <StatGrid stats={[
        { value: '50', label: 'Max sources per notebook', color: 'blue' },
        { value: '500K', label: 'Words per source (max)', color: 'green' },
        { value: '0%', label: 'Hallucination from outside sources', color: 'purple' },
        { value: '10+', label: 'Supported file types', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is NotebookLM and How Does It Work?" />

      <p>
        NotebookLM is a research and writing assistant built on Google's Gemini AI model. The critical difference between NotebookLM and tools like ChatGPT is that NotebookLM is constrained to your uploaded sources. It cannot draw on outside knowledge, which means every answer it gives is traceable back to something you uploaded.
      </p>

      <ArchDiagram
        boxes={[
          { label: 'Your Documents\n(PDF, Docs, URLs)', color: 'blue' },
          { label: 'NotebookLM\nAI Processing', color: 'purple' },
          { label: 'Grounded Answers\n+ Citations', color: 'green' },
        ]}
        arrows={['→', '→']}
      />

      <AlertBox type="info" title="Key Distinction">
        When you ask NotebookLM a question, it searches your sources for relevant passages, synthesizes them, and returns an answer with inline citations. If the information is not in your sources, it will tell you — it will not invent an answer.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Source Grounding',
          description: 'Answers come only from your uploaded documents. No hallucination from outside knowledge. Every claim is traceable to a source passage.',
        },
        {
          title: 'Multi-Source Synthesis',
          description: 'Upload multiple documents and ask questions that require synthesizing information from all of them. NotebookLM finds connections across sources.',
        },
        {
          title: 'Citation Tracking',
          description: 'Every answer includes inline citations you can click to see the exact passage from the original document that was used.',
        },
        {
          title: 'Content Generation',
          description: 'Generate study guides, outlines, summaries, FAQ documents, timelines, and briefing documents — all based on your sources.',
        },
        {
          title: 'Audio Overview',
          description: 'Generate a podcast-style audio conversation about your sources — ideal for commuting or learning complex material.',
        },
        {
          title: 'Notebook Guides',
          description: 'Auto-generated guides including FAQ, study guide, table of contents, and timeline based on your uploaded content.',
        },
      ]} />

      <SectionHeader number={2} title="Setting Up NotebookLM: Step-by-Step" />

      <VerticalSteps steps={[
        {
          title: 'Go to notebooklm.google.com',
          description: 'NotebookLM requires a Google account. It is free to use with generous limits on notebooks and sources.',
        },
        {
          title: 'Create a new notebook',
          description: 'Click "New notebook". Give it a specific, descriptive name: "Q4 2024 Market Research" or "ML Paper Review: Transformers". Avoid generic names like "Notebook 1".',
        },
        {
          title: 'Add your sources',
          description: 'Click "Add source". Supported types: PDF files, Google Docs, Google Slides, web URLs, YouTube URLs, and plain text. You can add up to 50 sources per notebook.',
        },
        {
          title: 'Wait for processing',
          description: 'Each source shows a loading indicator while being processed. Wait until all sources show as ready before asking questions. Partial processing leads to incomplete answers.',
        },
        {
          title: 'Start with the auto-generated guides',
          description: 'NotebookLM automatically generates an FAQ, study guide, and briefing document from your sources. Read these first to get oriented before asking custom questions.',
        },
        {
          title: 'Ask your first question',
          description: 'Start broad: "What are the main themes across these sources?" Then narrow down based on what you learn.',
        },
      ]} />

      <SectionHeader number={3} title="Supported Source Types and Limits" />

      <CompareTable
        leftLabel="Source Type"
        rightLabel="Notes and Limitations"
        rows={[
          { label: 'PDF', left: 'Up to 25MB, up to 500K words', right: 'Must be text-based PDF, not scanned images' },
          { label: 'Google Docs', left: 'Connected via Google Drive', right: 'Must be accessible from your account' },
          { label: 'Google Slides', left: 'Connected via Google Drive', right: 'Speaker notes are included in processing' },
          { label: 'Web URL', left: 'Public pages only', right: 'Behind-login pages cannot be accessed' },
          { label: 'YouTube URL', left: 'Public videos only', right: 'Video must have auto-captions or manual captions' },
          { label: 'Plain Text (.txt)', left: 'Up to 500K words', right: 'Ideal for transcripts, code docs, raw notes' },
          { label: 'Audio files', left: 'Google Workspace accounts', right: 'Transcribed automatically' },
        ]}
      />

      <AlertBox type="warning" title="Scanned PDF Warning">
        If your PDF is a scanned document (images of text rather than actual text), NotebookLM may not be able to read it correctly. Use an OCR tool like Adobe Acrobat or Google Drive's built-in OCR to convert scanned PDFs to searchable text first.
      </AlertBox>

      <SectionHeader number={4} title="The 5 Core Use Cases" />

      <h3>1. Research Paper Analysis</h3>
      <p>Upload one or multiple research papers and ask NotebookLM to synthesize findings, explain methodology, identify limitations, and compare approaches across papers.</p>

      <CodeBlock language="text" filename="Research Analysis Prompts">
{`What are the main findings of this paper?
What methodology did the authors use? What are its limitations?
Compare the approaches taken in Paper A vs Paper B.
What evidence supports the main claims?
What are the areas for future research mentioned?`}
      </CodeBlock>

      <h3>2. Meeting Notes and Transcript Processing</h3>
      <p>Upload meeting transcripts, Zoom recordings (with captions), or meeting notes to extract decisions, action items, and blockers.</p>

      <CodeBlock language="text" filename="Meeting Processing Prompts">
{`What decisions were made in this meeting?
Extract all action items with owners and deadlines.
What concerns or blockers were raised?
Write a follow-up email summarizing key decisions.
What topics need further discussion in the next meeting?`}
      </CodeBlock>

      <h3>3. Learning and Study</h3>
      <p>Upload textbook chapters, course materials, or lecture slides to create study guides, practice questions, and explanations tailored to your level.</p>

      <CodeBlock language="text" filename="Learning and Study Prompts">
{`Explain [concept] in simple terms for a beginner.
Create a study guide with key concepts and definitions.
Generate 10 practice questions with answers.
What are the most important things to remember about [topic]?
Create flashcards for the key vocabulary in this chapter.`}
      </CodeBlock>

      <h3>4. Document Analysis</h3>
      <p>Upload contracts, reports, legal documents, or technical specifications to extract key information without reading every word.</p>

      <CodeBlock language="text" filename="Document Analysis Prompts">
{`What are the key obligations and requirements in this contract?
Summarize the main risks identified in this report.
What are the acceptance criteria mentioned in this spec?
List all deadlines and milestones with their dates.
What are the key financial terms and their values?`}
      </CodeBlock>

      <h3>5. Content Creation</h3>
      <p>Upload source material and use NotebookLM to help create outlines, drafts, and content grounded in credible sources.</p>

      <CodeBlock language="text" filename="Content Creation Prompts">
{`Create a detailed outline for a blog post about [topic].
Write an introduction paragraph for a [technical/general] audience.
What are the most compelling data points I should highlight?
Generate 5 key talking points for a presentation on [topic].
Write a LinkedIn post summarizing the key insight from these sources.`}
      </CodeBlock>

      <SectionHeader number={5} title="Question Techniques That Get Better Results" />

      <ErrorFix
        bad={`What's in this document?
Tell me about this topic.
Summarize everything.`}
        good={`What are the 3 main findings from Section 3?
What methodology did the researchers use and what were its strengths?
Summarize the key recommendations in bullet points, organized by priority.`}
        badLabel="Vague questions (bad)"
        goodLabel="Specific, structured questions (good)"
      />

      <VerticalSteps steps={[
        {
          title: 'Be specific about scope',
          description: 'Reference specific sections, figures, or topics: "What does Section 4 say about implementation costs?" beats "Tell me about costs."',
        },
        {
          title: 'Specify output format',
          description: 'Tell NotebookLM exactly how to format the answer: "Create a table with columns: Finding, Evidence, Implication" gets a structured result every time.',
        },
        {
          title: 'Define your audience',
          description: '"Explain this for a non-technical executive" vs "Explain this for a senior software engineer" produces completely different outputs — both valid, both useful.',
        },
        {
          title: 'Use progressive refinement',
          description: 'Start with "Summarize the main themes", then drill in: "Tell me more about the methodology mentioned in point 3", then: "What are the limitations of that methodology?"',
        },
        {
          title: 'Ask for cross-source synthesis',
          description: '"Where do these sources agree?" and "Where do they contradict each other?" are powerful multi-source questions that take hours to answer manually.',
        },
      ]} />

      <SectionHeader number={6} title="The Audio Overview Feature" />

      <p>
        Audio Overview is one of NotebookLM's most distinctive features. It generates a 5–15 minute podcast-style conversation between two AI hosts who discuss your uploaded sources in a natural, back-and-forth format. This is not a monotone summary — it is a genuine conversation that covers key points, debates nuances, and adds context.
      </p>

      <FlowDiagram steps={[
        { label: 'Upload Sources', color: 'blue' },
        { label: 'Click Generate Audio', color: 'purple' },
        { label: 'Add Custom Instructions', color: 'amber' },
        { label: '2-3 min Processing', color: 'green' },
        { label: 'Listen & Download', color: 'blue' },
      ]} />

      <AlertBox type="tip" title="When to Use Audio Overview">
        Audio Overview is most valuable for: long dense reports you need to digest quickly, commuting or exercising, sharing complex material with non-readers, and getting a quick overview before diving deeper with questions.
      </AlertBox>

      <SectionHeader number={7} title="Auto-Generated Notebook Guides" />

      <p>
        When you add sources, NotebookLM automatically generates several structured documents in the sidebar. These are often the best starting point before writing custom questions.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'FAQ',
          description: 'Auto-generated frequently asked questions about your sources. Great for quickly understanding what the content covers and what questions it answers.',
        },
        {
          title: 'Study Guide',
          description: 'Key concepts, vocabulary, and practice questions based on your sources. Ideal for exam preparation or onboarding new team members to a topic.',
        },
        {
          title: 'Briefing Document',
          description: 'A structured executive summary of your sources. Perfect for quickly getting leadership or stakeholders up to speed on complex material.',
        },
        {
          title: 'Table of Contents',
          description: 'A hierarchical outline of the topics covered across all your sources. Useful for understanding the scope and structure of large document sets.',
        },
        {
          title: 'Timeline',
          description: 'A chronological view of events, dates, and milestones mentioned across your sources. Great for historical analysis or project retrospectives.',
        },
        {
          title: 'Custom Guide',
          description: 'You can prompt NotebookLM to create any custom structured document: "Create a competitive analysis table", "Build a decision framework", etc.',
        },
      ]} />

      <SectionHeader number={8} title="Organizing Your Notebooks for Maximum Efficiency" />

      <CompareTable
        leftLabel="Good Organization"
        rightLabel="Bad Organization"
        rows={[
          { label: 'Naming', left: '"Research: Climate Policy Q4 2024"', right: '"Notebook 1" or "My Research"' },
          { label: 'Source grouping', left: 'All sources about same topic', right: 'Mixing unrelated documents' },
          { label: 'Notebook count', left: 'One notebook per project/topic', right: 'Everything in one giant notebook' },
          { label: 'Maintenance', left: 'Archive completed notebooks', right: 'Deleting notebooks (losing history)' },
          { label: 'Source quality', left: 'High-quality, text-based PDFs', right: 'Scanned images, low-quality docs' },
        ]}
      />

      <AlertBox type="tip" title="Naming Convention That Works">
        Use this format: [Category]: [Topic] [Date/Version]. Examples: "Research: Transformer Models 2024", "Analysis: Q3 Earnings Report", "Project: Product Launch Brief". This makes notebooks scannable at a glance.
      </AlertBox>

      <SectionHeader number={9} title="NotebookLM vs Other AI Tools" />

      <CompareTable
        leftLabel="NotebookLM"
        rightLabel="General AI Chatbots (ChatGPT etc.)"
        rows={[
          { label: 'Knowledge source', left: 'Your uploaded documents only', right: 'Pre-trained internet knowledge' },
          { label: 'Hallucination risk', left: 'Very low — grounded in your sources', right: 'Moderate — can generate plausible falsehoods' },
          { label: 'Citations', left: 'Inline citations to exact passages', right: 'No citations (typically)' },
          { label: 'Best for', left: 'Analyzing specific documents', right: 'General Q&A, coding, creative writing' },
          { label: 'Fresh content', left: 'Only knows what you upload', right: 'Trained up to knowledge cutoff date' },
          { label: 'Privacy', left: 'Your docs stay in your notebook', right: 'Prompts may train the model' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is NotebookLM and how is it different from ChatGPT?',
          answer: 'NotebookLM is Google\'s AI notebook that only uses information from your uploaded documents — it cannot access outside knowledge or the internet. ChatGPT and similar tools use pre-trained knowledge from the internet, which can lead to hallucinations or outdated information. NotebookLM is specifically designed for document analysis and research, with inline citations pointing to the exact source passages it used. Use NotebookLM when you need accurate, source-grounded analysis of specific documents. Use ChatGPT for general knowledge questions, coding help, or creative writing.',
        },
        {
          question: 'Is NotebookLM free to use?',
          answer: 'Yes, NotebookLM has a free tier that is generous for most individual users. It allows you to create multiple notebooks with up to 50 sources each. Google also offers NotebookLM Plus as a paid upgrade through Google One AI Premium, which provides higher usage limits, more Audio Overview customization, and sharing features for teams. For most personal and research use cases, the free tier is sufficient.',
        },
        {
          question: 'Can NotebookLM hallucinate or make up information?',
          answer: 'NotebookLM is specifically designed to minimize hallucination by constraining its answers to your uploaded sources. If it cannot find information in your documents, it will say so rather than making something up. However, it can still misinterpret passages, draw incorrect inferences, or incorrectly attribute claims. Always verify important information by clicking the inline citations and reading the original source passages. Treat NotebookLM as a very fast reader that points you to the right passages, not as a source of ground truth.',
        },
        {
          question: 'What file types does NotebookLM support?',
          answer: 'NotebookLM supports: PDF (up to 25MB, must be text-based not scanned), Google Docs (via Drive), Google Slides (via Drive), web URLs (public pages only), YouTube video URLs (requires captions), and plain text files (.txt). Audio files are supported for Google Workspace accounts. Scanned PDFs need to be converted with OCR before uploading. Private or login-protected web pages cannot be accessed.',
        },
        {
          question: 'How many sources can I add to a NotebookLM notebook?',
          answer: 'You can add up to 50 sources per notebook. Each source can be up to 25MB (for PDFs) or 500,000 words. For best results, keep all sources topically related — mixing unrelated documents in one notebook degrades the quality of cross-source synthesis. If you have more than 50 sources on a topic, prioritize the most relevant and comprehensive ones, or split into focused sub-notebooks (e.g., separate notebooks for methodology papers vs. review papers on the same topic).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
