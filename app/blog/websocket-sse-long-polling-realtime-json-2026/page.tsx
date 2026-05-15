import type { Metadata } from 'next';
import WebsocketSsePollingClient from './client';

export const metadata: Metadata = {
  title: 'WebSocket vs SSE vs Long Polling: Real-Time JSON Guide 2026 | UnblockDevs',
  description: 'WebSocket vs Server-Sent Events vs Long Polling — every difference explained with Node.js implementation code, React hooks, performance benchmarks, and a clear decision framework for real-time JSON in 2026.',
  keywords: [
    'websocket vs sse 2026',
    'server sent events vs websocket',
    'real-time javascript',
    'long polling vs websocket',
    'websocket nodejs tutorial',
    'server sent events react',
    'real-time json streaming',
    'sse vs websocket performance',
    'websocket vs polling',
    'real-time data web 2026',
    'eventsource javascript',
    'websocket json example',
    'server sent events nodejs',
    'real-time api design',
    'which real-time technology 2026',
  ],
  openGraph: {
    title: 'WebSocket vs SSE vs Long Polling: Real-Time JSON Guide 2026',
    description: 'Every real-time web technology compared: protocol, direction, browser support, code examples, and a decision chart so you pick the right tool immediately.',
    type: 'article',
    publishedTime: '2026-05-15T15:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/websocket-sse-long-polling-realtime-json-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — WebSocket vs SSE vs Long Polling Guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebSocket vs SSE vs Long Polling: Real-Time JSON 2026',
    description: 'All three compared: protocols, code, performance, decision framework — pick the right one in 5 minutes.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/websocket-sse-long-polling-realtime-json-2026' },
};

export default function WebsocketSsePollingPage() {
  return <WebsocketSsePollingClient />;
}
