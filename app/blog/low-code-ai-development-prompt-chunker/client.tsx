'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable,
} from '@/components/blog/BlogVisuals';

export default function LowCodeAiDevelopmentPromptChunkerClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Low-Code AI Development with Prompt Chunking — Build Smarter AI Workflows</h1>
      <p className="lead">
        Prompt chunking breaks large tasks and documents into manageable pieces for AI processing.
        Combined with low-code tools like n8n, Make, and LangFlow, it lets non-developers build
        sophisticated AI workflows that process large documents, generate structured outputs, and
        chain multiple AI calls together — without writing complex code. This guide covers chunking
        strategies, a working Python implementation, low-code tool comparisons, and how to choose
        the right approach for your use case.
      </p>

      <StatGrid stats={[
        { value: '128K', label: 'typical context window for most production LLMs', color: 'amber' },
        { value: 'Chunking', label: 'split large content to fit within model context limits', color: 'blue' },
        { value: 'Overlap', label: 'preserve context at chunk boundaries with 10–20% overlap', color: 'green' },
        { value: 'Low-code', label: 'n8n, Make, Zapier, LangFlow for visual AI workflow building', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Why Prompt Chunking Matters" />
      <p>
        Every LLM has a context window limit — the maximum amount of text it can process in a single
        API call. Even with models that support 128K or 1M token context windows, there are
        practical limits: larger contexts cost more, process more slowly, and models may lose
        focus on details buried deep in very long contexts. Prompt chunking is the solution.
      </p>
      <QuickFact color="blue" label="The chunking principle">
        LLMs have context window limits (128K–1M tokens depending on model). A large PDF, entire
        codebase, or large database export can exceed these limits — or become too expensive and slow.
        Chunking splits the content into overlapping segments, processes each with AI, then combines results.
        The overlap (100–200 tokens) ensures context isn't lost at chunk boundaries where
        a sentence or paragraph might be split.
      </QuickFact>

      <SectionHeader number={2} title="Four Chunking Strategies Compared" />
      <CompareTable
        leftLabel="Strategy"
        rightLabel="Best For"
        rows={[
          { label: 'Fixed-size chunking', left: 'Split every N tokens, simple to implement, add 10-20% overlap', right: 'Simple document processing, code analysis, batch text classification' },
          { label: 'Semantic chunking', left: 'Split at paragraph/section boundaries for coherent chunks', right: 'Legal documents, reports, articles where paragraphs are semantic units' },
          { label: 'Recursive text splitter', left: 'Try large boundaries first, fall back to smaller ones', right: 'Mixed documents with variable structure (LangChain\'s default approach)' },
          { label: 'Sliding window', left: 'Overlapping windows — each includes end of previous chunk as context', right: 'Summarization, translation, tasks needing strong inter-chunk context' },
        ]}
      />
      <KeyPointsGrid columns={2} items={[
        { title: 'Fixed-size chunking', description: 'Split every N tokens/characters. Fastest to implement. Disadvantage: may split mid-sentence or mid-concept. Always add 10–20% overlap between chunks to preserve context across boundaries. Best for: classification, extraction, simple Q&A.' },
        { title: 'Semantic chunking', description: 'Split at natural boundaries: paragraph breaks (\\n\\n), section headers (# Title), function definitions in code. Produces higher-quality chunks for AI processing. The model gets coherent units to reason about rather than arbitrary cuts.' },
        { title: 'Recursive text splitter', description: 'LangChain\'s RecursiveCharacterTextSplitter. Tries to split at the largest available boundary (sections), falls back to smaller boundaries (paragraphs, sentences, characters) if chunks are still too large. Good default for unknown document structures.' },
        { title: 'Sliding window', description: 'Each chunk contains the last N tokens of the previous chunk. Processes overlapping windows of text. Best when the AI task requires context from both sides of every chunk boundary — like sequential document summarization or translation.' },
      ]} />

      <SectionHeader number={3} title="Prompt Chunker in Python" />
      <CodeBlock lang="python" title="Document chunker for AI processing — full implementation">
{`from langchain.text_splitter import RecursiveCharacterTextSplitter
from anthropic import Anthropic
import time

def process_large_document(document: str, task: str, model: str = "claude-sonnet-4-6") -> str:
    """
    Process a large document by chunking and combining AI results.

    Args:
        document: The full text content to process
        task: Instructions for what the AI should do with each chunk
        model: Claude model to use
    Returns:
        Combined final result from all chunks
    """

    # Split document into chunks with overlap
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=4000,        # ~4000 chars per chunk (roughly 1000-1500 tokens)
        chunk_overlap=400,      # 400-char overlap for context continuity between chunks
        separators=["\n\n", "\n", ". ", " ", ""]  # try largest split first
    )
    chunks = splitter.split_text(document)
    print(f"Split into {len(chunks)} chunks")

    client = Anthropic()
    results = []

    for i, chunk in enumerate(chunks):
        print(f"Processing chunk {i+1}/{len(chunks)}...")

        # Include previous results for context (last 2 only to avoid context overflow)
        context = ""
        if results:
            context = f"\nPrevious chunk results:\n" + "\n".join(results[-2:]) + "\n"

        response = client.messages.create(
            model=model,
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Task: {task}

Document chunk {i+1} of {len(chunks)}:
{chunk}
{context}
Process this chunk according to the task. Be concise."""
            }]
        )
        results.append(response.content[0].text)
        time.sleep(0.5)  # Rate limiting between API calls

    # Final synthesis step — combine all chunk results
    print("Synthesizing final result...")
    synthesis = client.messages.create(
        model=model,
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Combine these chunk-by-chunk analyses into a single comprehensive result.
Remove duplicates. Maintain logical order.

Original task: {task}

Chunk analyses:
{chr(10).join(f'Chunk {i+1}: {r}' for i, r in enumerate(results))}

Provide the final combined result."""
        }]
    )

    return synthesis.content[0].text


# Usage examples:
result = process_large_document(
    document=open("large_report.txt").read(),
    task="Extract all key decisions and action items with responsible parties"
)

result2 = process_large_document(
    document=open("contract.pdf.txt").read(),
    task="Identify all obligations, deadlines, and penalty clauses"
)

print(result)`}
      </CodeBlock>

      <SectionHeader number={4} title="Low-Code AI Workflow Tools" />
      <KeyPointsGrid columns={2} items={[
        { title: 'n8n (self-hosted or cloud)', description: 'Open-source workflow automation. Built-in AI nodes for OpenAI, Anthropic, and more. Can chunk documents, call AI for each chunk, combine results — all visually. Self-host for full data privacy. Best for teams that want control over data and infrastructure.' },
        { title: 'Make (formerly Integromat)', description: 'Visual automation platform. Connect AI APIs via HTTP modules. Build multi-step flows: receive document → split into chunks → process each with AI → aggregate results → store. No coding required. Good pricing for moderate volume.' },
        { title: 'LangFlow / FlowWise', description: 'Visual interfaces specifically for building LangChain pipelines. Drag-and-drop nodes for document loaders, text splitters, LLMs, and vector stores. Ideal for RAG (retrieval-augmented generation) pipelines. LangFlow is open-source; FlowWise is self-hosted.' },
        { title: 'Zapier AI features', description: 'Zapier has native AI Actions (summarize, extract, classify) that handle chunking internally. Easiest to set up but least customizable. Best for simple single-step AI processing tasks where you don\'t need fine-grained control.' },
      ]} />

      <SectionHeader number={5} title="Building a RAG Pipeline with Chunking" />
      <CodeBlock lang="python" title="Simple RAG pipeline using chunking and vector search">
{`from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_anthropic import ChatAnthropic
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

def build_rag_pipeline(documents: list[str]):
    """
    Build a retrieval-augmented generation pipeline.
    Chunks documents, embeds them, stores in vector DB.
    Then answers questions by retrieving relevant chunks.
    """

    # 1. Chunk all documents
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    all_chunks = []
    for doc in documents:
        all_chunks.extend(splitter.split_text(doc))
    print(f"Created {len(all_chunks)} total chunks from {len(documents)} documents")

    # 2. Embed chunks and store in vector database
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Chroma.from_texts(all_chunks, embeddings)
    print("Vector store built")

    return vectorstore

def answer_question(vectorstore, question: str, k: int = 4) -> str:
    """Retrieve relevant chunks and answer the question."""

    # 3. Find most relevant chunks for the question
    relevant_chunks = vectorstore.similarity_search(question, k=k)
    context = "\n\n".join([chunk.page_content for chunk in relevant_chunks])

    # 4. Ask Claude with the retrieved context
    client = Anthropic()
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Answer the question using only the provided context.
If the answer is not in the context, say so.

Context:
{context}

Question: {question}"""
        }]
    )
    return response.content[0].text`}
      </CodeBlock>

      <AlertBox type="tip" title="Our Prompt Chunker tool handles this automatically">
        Paste any large document at the unblockdevs.com Prompt Chunker to instantly split it into
        optimally-sized chunks for your AI model's context window. Configure chunk size,
        overlap amount, and splitting strategy visually — no code required.
        Copy the masked chunks → send to AI → reassemble the responses automatically.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'How do I choose the right chunk size for my use case?',
          answer: 'Rule of thumb: chunks should be 1/4 to 1/3 of your model\'s context window to leave room for the system prompt, task instructions, and the AI response. For Claude Sonnet 4.6 (200K token window): chunks of 5,000–15,000 tokens work well. For GPT-4 (128K): chunks of 4,000–10,000 tokens. Smaller chunks mean more API calls and cost, but better focus per chunk. Larger chunks preserve more context but may exceed limits or cost more. Test both extremes and measure output quality.',
        },
        {
          question: 'What is the best overlap size between chunks?',
          answer: 'Typically 10–20% of chunk size. For 4,000 token chunks: 400–800 token overlap. Too little overlap loses context at boundaries where a sentence is split mid-thought. Too much overlap wastes tokens and increases API costs. For document summarization: 200–400 token overlap is usually sufficient. For question answering over code: larger overlap (500–1000 tokens) helps because code context often spans functions. For classification tasks where each chunk is independent: overlap can be minimal (0–100 tokens).',
        },
        {
          question: 'How do I handle semantic search with chunked documents (RAG)?',
          answer: 'This is Retrieval-Augmented Generation (RAG). Workflow: 1) Chunk the document into ~500–1000 token segments. 2) Embed each chunk using an embedding model (OpenAI text-embedding-3-small or Claude\'s embedding API). 3) Store embeddings in a vector database (Pinecone, Chroma, pgvector, Weaviate). 4) At query time: embed the user question, find the most similar chunks using cosine similarity, send the top K chunks as context to the LLM. This is far more efficient than sending the entire document for every query.',
        },
        {
          question: 'What is the difference between prompt chunking and RAG?',
          answer: 'Prompt chunking: process every chunk of a document sequentially with AI, then combine results. You process everything. Good for: "extract all action items from this entire 200-page report." RAG (retrieval-augmented generation): embed all chunks into a vector database, then retrieve only the relevant chunks at query time. You only process what\'s relevant to the question. Good for: "Q&A system over a documentation library" where you don\'t know in advance which parts are relevant.',
        },
        {
          question: 'How do I preserve context between chunks in sequential processing?',
          answer: 'Two techniques: 1) Overlap: include the last 200–500 tokens of each chunk at the start of the next chunk. Handles cases where context is split at chunk boundaries. 2) Rolling summary: after processing each chunk, generate a brief summary and include it as context in the next prompt ("Previous section summary: ..."). This is especially useful for very long documents where maintaining a rolling context window gives the AI continuity without repeating all previous content.',
        },
        {
          question: 'Which low-code tool should I use for AI workflows?',
          answer: 'n8n: best for teams with some technical ability who need data privacy, custom integrations, and cost control. Self-host on your infrastructure. Make (formerly Integromat): best for business users who need visual automation without coding and don\'t want to manage servers. Good pricing. LangFlow/FlowWise: best for RAG pipelines, vector databases, and complex LangChain-based AI architectures — specifically built for AI workflows. Zapier: best for quick prototypes and simple single-step AI processing where you\'re already using Zapier for other automations.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
