'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, FlowDiagram,
} from '@/components/blog/BlogVisuals';

export default function MultiagentSystemsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Multi-Agent AI Systems — Complete Guide: Patterns, Frameworks, and Production Deployment</h1>
      <p className="lead">
        Multi-agent AI systems use multiple AI models working together — each with specialized
        roles, tools, and capabilities — to accomplish complex tasks that a single LLM cannot
        handle alone. This guide covers architectures, frameworks, and real-world patterns.
      </p>

      <StatGrid stats={[
        { value: 'Orchestrator', label: 'agent that coordinates other agents', color: 'blue' },
        { value: 'Tool use', label: 'agents call APIs, databases, code executors', color: 'green' },
        { value: 'AutoGen', label: 'Microsoft\'s multi-agent framework', color: 'purple' },
        { value: 'CrewAI', label: 'role-based multi-agent framework', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What is a Multi-Agent System?" />
      <QuickFact>
        A multi-agent system is a network of AI agents, each with a specific role, set of tools,
        and memory. Agents communicate through messages. An orchestrator agent breaks down complex
        tasks and delegates to specialist agents (researcher, writer, code executor, reviewer).
        The result is greater capability than any single agent.
      </QuickFact>

      <FlowDiagram
        title="Multi-Agent Architecture"
        steps={[
          { label: 'User Request', description: 'Complex task: "Research X, write a report, review it, and publish"' },
          { label: 'Orchestrator Agent', description: 'Breaks task into subtasks, assigns to specialist agents' },
          { label: 'Research Agent', description: 'Uses web search tools to gather information' },
          { label: 'Writer Agent', description: 'Composes content from research results' },
          { label: 'Reviewer Agent', description: 'Checks quality, accuracy, style' },
          { label: 'Publisher Agent', description: 'Formats and publishes final output' },
        ]}
      />

      <SectionHeader number={2} title="Agent Architecture Patterns" />
      <CompareTable
        leftLabel="Pattern"
        rightLabel="Use Case"
        rows={[
          { label: 'Pipeline', left: 'Sequential chain: A → B → C → D', right: 'Document processing, content pipeline, ETL workflows' },
          { label: 'Supervisor', left: 'Orchestrator delegates to specialist agents', right: 'Research + writing + coding tasks, complex workflows' },
          { label: 'Peer-to-peer', left: 'Agents discuss and vote on decisions', right: 'Code review, fact-checking, consensus tasks' },
          { label: 'Hierarchical', left: 'Tree of orchestrators and sub-agents', right: 'Enterprise-scale tasks with departments of agents' },
        ]}
      />

      <SectionHeader number={3} title="Building a Multi-Agent System with LangGraph" />
      <CodeBlock language="python" filename="LangGraph multi-agent workflow">
{`from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# Define shared state
class AgentState(TypedDict):
    task: str
    research: str
    draft: str
    review: str
    final: str
    messages: Annotated[list, operator.add]

llm = ChatAnthropic(model="claude-sonnet-4-6")

def research_agent(state: AgentState):
    """Agent 1: Research the topic"""
    response = llm.invoke([
        {"role": "system", "content": "You are a research expert. Gather key facts."},
        {"role": "user", "content": f"Research this topic thoroughly: {state['task']}"}
    ])
    return {"research": response.content, "messages": [response]}

def writer_agent(state: AgentState):
    """Agent 2: Write based on research"""
    response = llm.invoke([
        {"role": "system", "content": "You are a professional writer."},
        {"role": "user", "content": f"Write a comprehensive piece about: {state['task']}\\n\\nResearch: {state['research']}"}
    ])
    return {"draft": response.content}

def reviewer_agent(state: AgentState):
    """Agent 3: Review and provide feedback"""
    response = llm.invoke([
        {"role": "system", "content": "You are a critical editor. Review for accuracy and quality."},
        {"role": "user", "content": f"Review this draft:\\n\\n{state['draft']}\\n\\nProvide specific improvements."}
    ])
    return {"review": response.content}

def finalize_agent(state: AgentState):
    """Agent 4: Incorporate review feedback"""
    response = llm.invoke([
        {"role": "user", "content": f"Revise this draft based on the review:\\n\\nDraft: {state['draft']}\\n\\nReview: {state['review']}"}
    ])
    return {"final": response.content}

# Build the graph
workflow = StateGraph(AgentState)
workflow.add_node("research", research_agent)
workflow.add_node("writer", writer_agent)
workflow.add_node("reviewer", reviewer_agent)
workflow.add_node("finalize", finalize_agent)

# Linear pipeline
workflow.set_entry_point("research")
workflow.add_edge("research", "writer")
workflow.add_edge("writer", "reviewer")
workflow.add_edge("reviewer", "finalize")
workflow.add_edge("finalize", END)

app = workflow.compile()
result = app.invoke({"task": "Explain quantum computing for developers", "messages": []})
print(result["final"])`}
      </CodeBlock>

      <SectionHeader number={4} title="Key Frameworks Comparison" />
      <KeyPointsGrid columns={2} items={[
        { title: 'LangGraph (LangChain)', description: 'Graph-based workflow with state management. Best for complex conditional flows, human-in-the-loop, long-running agents. Production-ready with LangSmith observability.' },
        { title: 'AutoGen (Microsoft)', description: 'Conversational agent framework. Agents talk to each other. Best for research tasks, code generation with execution. Easy to prototype, built-in code execution.' },
        { title: 'CrewAI', description: 'Role-based agents with crews and tasks. High-level abstraction — define agents, tasks, and process (sequential or hierarchical). Best for structured team-like workflows.' },
        { title: 'Claude Agent SDK (Anthropic)', description: 'Native Anthropic SDK for building agents. Tool use, computer use, multi-turn conversations. Best when building production agents specifically with Claude.' },
      ]} />

      <AlertBox type="tip" title="Start with a single agent, not multi-agent">
        Multi-agent systems are complex to debug and monitor. Start with a single capable agent
        with good tool use. Add additional agents only when you hit specific bottlenecks —
        context limits, parallelism needs, or conflicting objectives. Most tasks don't need
        more than 2-3 agents.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between tool use and multi-agent systems?',
          answer: 'A single agent with tools calls external functions (search, calculator, database). Multi-agent systems have multiple AI models, each potentially with their own tools, memory, and personas. Use tool use for extending a single agent\'s capabilities. Use multi-agent for tasks requiring different specialized knowledge, parallel processing, or adversarial review (one agent checks another\'s work).',
        },
        {
          question: 'How do I handle failures in multi-agent workflows?',
          answer: 'Each agent call can fail independently. Best practices: implement retry logic at the orchestrator level, add timeout limits per agent step, log all intermediate state so failed workflows can be resumed, use conditional routing to handle failure states gracefully, and implement circuit breakers for external tool calls.',
        },
        {
          question: 'How expensive is running multi-agent systems?',
          answer: 'Costs multiply with agents. A 5-agent pipeline processing each step with Claude Sonnet: roughly 5× the single-agent cost. Cache prompts (Anthropic prompt caching) for shared context. Use lighter models (Claude Haiku) for simpler agent steps. Set max_tokens carefully per agent. Monitor with LangSmith or similar to identify inefficient agents.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
