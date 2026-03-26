'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function LowCodeAiDevelopmentPromptChunkerClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Low-Code AI Development with Prompt Chunking — Build Smarter AI Workflows</h1>
      <p className="lead">
        Prompt chunking breaks large tasks and documents into manageable pieces for AI processing.
        Combined with low-code tools, it lets non-developers build sophisticated AI workflows
        that process large documents, generate structured outputs, and chain multiple AI calls.
      </p>

      <StatGrid stats={[
        { value: '128K', label: 'typical context window limit for most LLMs', color: 'amber' },
        { value: 'Chunking', label: 'split content to fit within context limits', color: 'blue' },
        { value: 'Overlap', label: 'preserve context between chunks with overlap', color: 'green' },
        { value: 'Low-code', label: 'n8n, Make, Zapier for visual AI workflow building', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Prompt Chunking Matters" />
      <QuickFact>
        LLMs have context window limits (128K-1M tokens depending on model). A large PDF, codebase,
        or database can exceed these limits. Chunking splits the content into overlapping segments,
        processes each with AI, then combines results. The overlap (100-200 tokens) ensures context
        isn't lost at chunk boundaries.
      </QuickFact>

      <SectionHeader number={2} title="Chunking Strategies" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Fixed-size chunking', description: 'Split every N tokens/characters. Fastest to implement. Disadvantage: may split mid-sentence or mid-concept. Add 10-20% overlap between chunks to preserve context.' },
        { title: 'Semantic chunking', description: 'Split at natural boundaries: paragraphs, sections, code functions. Produces higher-quality chunks for AI processing. Slower to compute but better AI results.' },
        { title: 'Recursive text splitter', description: 'Try to split at larger boundaries first (sections), fall back to smaller (paragraphs, sentences) if chunks are still too large. LangChain\'s RecursiveCharacterTextSplitter uses this approach.' },
        { title: 'Sliding window', description: 'Process overlapping windows of text. Each chunk contains the end of the previous chunk as context. Best for tasks requiring strong inter-chunk context like summarization.' },
      ]} />

      <SectionHeader number={3} title="Prompt Chunker in Python" />
      <CodeBlock language="python" filename="Document chunker for AI processing">
{`from langchain.text_splitter import RecursiveCharacterTextSplitter
from anthropic import Anthropic

def process_large_document(document: str, task: str) -> str:
    """Process a large document by chunking and combining AI results"""

    # Split document into chunks with overlap
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=4000,        # ~4000 tokens per chunk
        chunk_overlap=400,      # 400-token overlap for context continuity
        separators=["\n\n", "\n", ". ", " ", ""]  # try largest split first
    )
    chunks = splitter.split_text(document)
    print(f"Split into {len(chunks)} chunks")

    client = Anthropic()
    results = []

    for i, chunk in enumerate(chunks):
        print(f"Processing chunk {i+1}/{len(chunks)}...")

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Task: {task}

Document chunk {i+1} of {len(chunks)}:
{chunk}

{'Previous results so far: ' + chr(10).join(results[-2:]) if results else ''}

Please process this chunk and provide your analysis."""
            }]
        )
        results.append(response.content[0].text)

    # Final synthesis
    synthesis = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Combine these chunk analyses into a final comprehensive result:

{chr(10).join(f'Chunk {i+1}: {r}' for i, r in enumerate(results))}

Task was: {task}

Provide the final combined result."""
        }]
    )

    return synthesis.content[0].text

# Usage
result = process_large_document(
    document=open("large_report.txt").read(),
    task="Extract all key decisions and action items"
)
print(result)`}
      </CodeBlock>

      <SectionHeader number={4} title="Low-Code AI Workflow Tools" />
      <KeyPointsGrid columns={2} items={[
        { title: 'n8n (self-hosted)', description: 'Open-source workflow automation. Has built-in AI nodes for OpenAI, Anthropic. Can chunk documents, call AI, process results — all visually. Self-host for data privacy.' },
        { title: 'Make (formerly Integromat)', description: 'Visual automation platform. Connect AI APIs via HTTP modules. Build multi-step flows: receive document → chunk → process with AI → store results. No coding required.' },
        { title: 'LangFlow / FlowWise', description: 'Visual interfaces specifically for building LangChain pipelines. Drag-and-drop nodes for document loaders, text splitters, LLMs, and vector stores. Ideal for RAG pipelines.' },
        { title: 'Zapier AI features', description: 'Zapier has native AI actions (summarize, extract, classify) that handle chunking internally. Easy to use but less customizable than n8n or Make.' },
      ]} />

      <AlertBox type="tip" title="Use our Prompt Chunker tool">
        Paste any large document at unblockdevs.com/prompt-chunker to instantly split it into
        optimally-sized chunks for your AI model's context window. Configure chunk size,
        overlap, and splitting strategy visually.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I choose the right chunk size?',
          answer: 'Rule of thumb: chunks should be 1/4 to 1/3 of your model\'s context window to leave room for the system prompt, instructions, and AI response. For Claude 3.5 Sonnet (200K tokens): chunks of 5,000-10,000 tokens are safe. Smaller chunks mean more API calls but better focus per chunk. Larger chunks preserve more context.',
        },
        {
          question: 'What is the best overlap size?',
          answer: 'Typically 10-20% of chunk size. For 4,000 token chunks: 400-800 token overlap. Too little overlap loses context at boundaries. Too much overlap wastes tokens and increases API costs. For document summarization, 200-400 tokens is usually sufficient. For question answering over code, larger overlap (500-1000 tokens) helps.',
        },
        {
          question: 'How do I handle semantic search with chunked documents?',
          answer: 'Use a vector database (Pinecone, Chroma, Weaviate, pgvector). Chunk the document, embed each chunk with an embedding model (text-embedding-3-large), store in vector DB. At query time: embed the question, find similar chunks by cosine similarity, send top-K chunks to LLM as context. This is Retrieval Augmented Generation (RAG).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
