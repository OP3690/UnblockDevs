import type { Metadata } from 'next';
import WebsocketSsePollingClient from './client';

export const metadata: Metadata = {
  title: 'WebSocket, SSE, Long Polling: Real-Time JSON Guide | UnblockDevs',
  description: 'Compare WebSocket, Server-Sent Events, and long polling for real-time JSON in 2026. Includes Node.js code, React hooks, performance benchmarks, and a decision framework.',
  keywords: [
    'websocket vs sse',
    'server sent events vs websocket',
    'long polling vs websocket',
    'websocket nodejs tutorial',
    'server sent events react',
    'real-time json streaming',
    'sse vs websocket performance',
    'websocket vs polling',
    'eventsource javascript',
    'websocket json example',
    'real-time api design',
    'which real-time technology to use',
    'websocket sse long polling comparison'
  ],
  openGraph: {
    title: 'WebSocket vs SSE vs Long Polling: Real-Time JSON Guide 2026',
    description: 'Every real-time web technology compared: protocol, direction, browser support, code examples, and a decision chart so you pick the right tool immediately.',
    type: 'article',
    publishedTime: '2026-05-15T15:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/websocket-sse-long-polling-realtime-json-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=WebSocket%20vs%20SSE%20vs%20Long%20Polling%3A%20Real-Time%20JSON%20Guide%202026&emoji=%7B%7D&desc=Every%20real-time%20web%20technology%20compared%3A%20protocol%2C%20direction%2C%20browser%20support%2C', width: 1200, height: 630, alt: 'WebSocket vs SSE vs Long Polling: Real-Time JSON Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebSocket, SSE, Long Polling: Real-Time JSON Guide',
    description: 'WebSocket, SSE, or long polling? Compare protocols, browser support, and performance benchmarks, then pick the right real-time tech for your stack.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/websocket-sse-long-polling-realtime-json-2026' },
};

export default function WebsocketSsePollingPage() {
  return <WebsocketSsePollingClient />;
}
