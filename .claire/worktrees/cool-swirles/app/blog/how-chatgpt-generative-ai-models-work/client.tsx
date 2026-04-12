'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowChatGPTWorksClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How ChatGPT and Generative AI Models Work (Behind the Scenes)</h1>
      <p className="lead">
        ChatGPT can write code, explain quantum mechanics, and hold a coherent hour-long conversation —
        but what is actually happening inside the model? This guide explains the complete pipeline:
        tokenisation, transformer attention, pre-training, fine-tuning with human feedback, and why
        AI sometimes confidently makes things up.
      </p>

      <StatGrid stats={[
        { value: '175B', label: 'GPT-3 parameters (2020)', color: 'blue' },
        { value: 'Token', label: 'The basic unit ChatGPT thinks in', color: 'purple' },
        { value: 'RLHF', label: 'Technique that made ChatGPT helpful', color: 'green' },
        { value: 'Next token', label: 'What the model actually predicts', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Large Language Model (LLM)?" />

      <p>
        A <strong>Large Language Model (LLM)</strong> is a neural network trained on enormous amounts
        of text to predict the next token in a sequence. That's the core of it. Everything else —
        answering questions, writing code, summarising documents — emerges from doing this one task
        extremely well, at extreme scale.
      </p>

      <QuickFact>ChatGPT does not "understand" text the way humans do. It predicts the most statistically likely next word given everything that came before. The emergent result is surprisingly useful.</QuickFact>

      <SectionHeader number={2} title="Step 1 — Tokenisation: How Text Becomes Numbers" />

      <p>
        Computers work with numbers, not text. Before a language model can process your prompt,
        it is converted to <strong>tokens</strong> — small chunks of text mapped to integers.
      </p>

      <CodeBlock language="python" filename="tokenisation-example.py">
{`# Using OpenAI's tiktoken library
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokeniser

text = "Hello, how are you today?"
tokens = enc.encode(text)
print(tokens)
# → [9906, 11, 1268, 527, 499, 3432, 30]
# 7 tokens for 6 words + punctuation

# Reconstruct from tokens
print([enc.decode([t]) for t in tokens])
# → ['Hello', ',', ' how', ' are', ' you', ' today', '?']

# Unusual fact: "ChatGPT" is 1 token, but "Gpt4" might be 2
# Token count affects cost and context window usage`}
      </CodeBlock>

      <AlertBox type="info" title="Why tokens matter">
        API pricing is per token. Context windows are measured in tokens. GPT-4 Turbo has a 128K token
        context window — roughly 96,000 words. 1 token ≈ 0.75 words in English.
      </AlertBox>

      <SectionHeader number={3} title="Step 2 — The Transformer Architecture" />

      <p>
        The transformer architecture (introduced in the 2017 paper "Attention Is All You Need") is
        the engine inside every modern LLM. Its key innovation is <strong>self-attention</strong>:
        the ability to relate any word in a sequence to any other word, regardless of distance.
      </p>

      <ArchDiagram
        boxes={[
          { label: 'Input tokens', color: 'blue' },
          { label: 'Embedding layer (token → vector)', color: 'blue' },
          { label: 'Self-attention layers (N×)', color: 'purple' },
          { label: 'Feed-forward layers (N×)', color: 'purple' },
          { label: 'Output probabilities (next token)', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→']}
      />

      <CodeBlock language="python" filename="attention-concept.py">
{`# Self-attention concept (simplified)
# Each token asks: "Which other tokens should I pay attention to?"

# Example: "The bank by the river"
# When processing "bank", attention scores might look like:
attention_weights = {
    "The": 0.05,
    "bank": 0.30,   # focuses on itself
    "by":  0.10,
    "the": 0.05,
    "river": 0.50,  # "river" helps disambiguate "bank" (financial vs river bank)
}
# High attention to "river" shifts interpretation from financial bank to river bank
# This is why transformers understand context so well`}
      </CodeBlock>

      <SectionHeader number={4} title="Step 3 — Pre-Training on Massive Text Data" />

      <VerticalSteps steps={[
        {
          title: 'Assemble training corpus',
          description: 'GPT-3 trained on ~570GB of text: web pages (Common Crawl), books (BookCorpus), Wikipedia, code (GitHub). GPT-4 uses a similar but larger, curated dataset.',
        },
        {
          title: 'Train to predict next token',
          description: 'The model sees a sequence of tokens and must predict the next one. "The Eiffel Tower is in ___" → "Paris". This objective teaches grammar, facts, reasoning, and style.',
        },
        {
          title: 'Trillion-token scale training',
          description: 'GPT-3 trained on ~300B tokens. Modern models use 1-2 trillion tokens. More data = better generalisation, fewer hallucinations.',
        },
        {
          title: 'Compute cost',
          description: 'Training GPT-4 cost an estimated $50-100M in compute. Training runs for weeks on thousands of A100/H100 GPUs in parallel.',
        },
      ]} />

      <SectionHeader number={5} title="Step 4 — Fine-Tuning with RLHF" />

      <p>
        A pre-trained model can complete sentences — but it can also complete harmful requests.
        <strong>RLHF (Reinforcement Learning from Human Feedback)</strong> turns a raw language model
        into a helpful, safe assistant.
      </p>

      <FlowDiagram steps={[
        { label: 'Pre-trained base model', color: 'blue' },
        { label: 'Supervised fine-tuning (SFT)', color: 'amber' },
        { label: 'Human raters score responses', color: 'purple' },
        { label: 'Reward model trained', color: 'purple' },
        { label: 'RL optimises for reward', color: 'green' },
        { label: 'ChatGPT', color: 'green' },
      ]} />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Supervised Fine-Tuning (SFT)',
          description: 'Human labellers write ideal responses to thousands of prompts. The model is fine-tuned to mimic these responses.',
        },
        {
          title: 'Reward Model',
          description: 'Humans rank multiple model responses from best to worst. A separate "reward model" learns to predict human preferences.',
        },
        {
          title: 'Proximal Policy Optimisation (PPO)',
          description: 'The language model is updated via reinforcement learning to maximise the reward model\'s score, producing more helpful responses.',
        },
        {
          title: 'Constitutional AI (Anthropic)',
          description: 'Alternative to RLHF: the model critiques and revises its own responses using a set of principles, reducing reliance on human labellers.',
        },
      ]} />

      <SectionHeader number={6} title="How ChatGPT Generates a Response" />

      <VerticalSteps steps={[
        {
          title: 'Your prompt is tokenised',
          description: 'Your message is converted to token IDs and prepended with a system prompt that configures ChatGPT\'s behaviour.',
        },
        {
          title: 'The full context window is processed',
          description: 'All previous conversation turns plus your new message are fed through all transformer layers simultaneously.',
        },
        {
          title: 'Output probability distribution',
          description: 'The model outputs a probability for every token in its vocabulary (~100K tokens) for what comes next.',
        },
        {
          title: 'Sampling selects the next token',
          description: 'Temperature controls randomness. Temperature=0 always picks the highest probability token (deterministic). Temperature=1 samples from the distribution (creative).',
        },
        {
          title: 'Autoregressive generation',
          description: 'The selected token is appended to the context and the process repeats — one token at a time — until the model generates a stop token.',
        },
      ]} />

      <SectionHeader number={7} title="Why ChatGPT Hallucinates" />

      <AlertBox type="error" title="AI hallucination is a fundamental property, not a bug">
        LLMs generate statistically plausible text. They have no internal fact-checking mechanism.
        When asked about something outside their training data, they generate a plausible-sounding
        answer rather than saying "I don't know." Always verify important claims.
      </AlertBox>

      <CompareTable
        leftLabel="Why hallucinations happen"
        rightLabel="How to reduce them"
        rows={[
          { label: 'No knowledge cutoff awareness', left: 'Model predicts confident text about post-cutoff events', right: 'Use models with web search (GPT-4o, Perplexity)' },
          { label: 'Plausibility bias', left: 'Generates the most statistically likely answer, not the true one', right: 'Ask model to cite sources; verify externally' },
          { label: 'Context window limits', left: 'Very long documents can push earlier context "out of focus"', right: 'Keep relevant context near the beginning and end of prompt' },
          { label: 'Specificity gap', left: 'Obscure topics are underrepresented in training data', right: 'Don\'t rely on LLMs for niche historical facts or novel research' },
        ]}
      />

      <SectionHeader number={8} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What is a token in ChatGPT?',
          answer: 'A token is the basic unit of text that ChatGPT processes — roughly 0.75 words or 4 characters on average in English. The word "tokenization" might be split into ["token", "ization"]. Token counts determine API costs and how much text fits in the context window. GPT-4 Turbo can process up to 128K tokens (roughly a 100,000-word book) at once.',
        },
        {
          question: 'How does ChatGPT "know" so much?',
          answer: 'ChatGPT was pre-trained on a massive text dataset — billions of web pages, books, and code. Through next-token prediction training, it absorbed patterns in language, facts, reasoning styles, and domain knowledge. It doesn\'t store a database of facts; it stores distributed knowledge in billions of weight parameters that get activated by relevant prompts.',
        },
        {
          question: 'What is temperature in language models?',
          answer: 'Temperature controls how random the model\'s token selection is. At temperature=0, the model always picks the most probable next token — producing deterministic, conservative output. At temperature=1, it samples from the probability distribution — producing more varied and creative output. At temperature>1, output becomes more random and chaotic. Most chat interfaces use temperature 0.7-1.0 for balanced responses.',
        },
        {
          question: 'What is the context window and why does it matter?',
          answer: 'The context window is the maximum number of tokens the model can "see" at once — including your prompt, conversation history, and system instructions. If a conversation exceeds the context window, earlier messages are dropped. GPT-4 Turbo has a 128K token context window. Gemini 1.5 Pro supports 1 million tokens. Longer context windows let the model reference more history and work with longer documents.',
        },
        {
          question: 'Why does ChatGPT sometimes refuse to answer?',
          answer: 'ChatGPT has a safety layer from RLHF fine-tuning that steers the model away from responses that human raters classified as harmful, dangerous, or policy-violating. This "alignment tax" occasionally produces over-refusals — refusing benign requests because they superficially resemble problematic ones. Rephrasing your prompt or using system prompts to clarify context often resolves false refusals.',
        },
        {
          question: 'What is the difference between GPT-4 and GPT-4o?',
          answer: 'GPT-4 is a text-in, text-out model. GPT-4o ("omni") is a natively multimodal model that can process text, images, and audio in a single unified model — rather than using separate specialist models for each modality. GPT-4o is also faster and cheaper than GPT-4 Turbo. It can describe images, read charts, and respond to voice with lower latency than GPT-4 with a separate speech model.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
