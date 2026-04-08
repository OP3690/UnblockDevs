'use client';

import ToolPageShell from '@/components/tools/ToolPageShell';
import PromptChunker from '@/components/tools/PromptChunker';

export default function PromptChunkerLandingClient() {
  return (
    <ToolPageShell
      showFooterBand={false}
      title="AI Prompt Chunker — Split Long Prompts for ChatGPT, Claude & Gemini"
      subtitle="Chunk by words/characters with overlap + consolidation instructions. 100% browser-based, no signup."
      toolName="prompt_chunker"
      tool={<PromptChunker />}
    />
  );
}
