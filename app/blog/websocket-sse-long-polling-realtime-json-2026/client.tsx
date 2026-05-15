'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps, FlowDiagram, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function WebsocketSsePollingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>WebSocket vs SSE vs Long Polling: Real-Time JSON Guide 2026</h1>
      <p className="lead">
        Users expect data to update without refreshing. Stock prices, chat messages, live dashboards,
        sports scores, AI streaming responses &mdash; real-time data is no longer a feature, it is a baseline
        expectation. But the three main approaches to delivering real-time JSON &mdash; WebSocket,
        Server-Sent Events, and Long Polling &mdash; are genuinely different technologies with different
        trade-offs. Picking the wrong one means either over-engineering a simple feed or under-engineering
        a bidirectional system. This guide covers every dimension: protocol, direction, browser support,
        scalability, implementation code, and a decision framework that tells you exactly which to choose.
      </p>

      <StatGrid stats={[
        { value: '3',    label: 'real-time data technologies — WebSocket, SSE, Long Polling — each genuinely different', color: 'blue' },
        { value: '95%',  label: 'global browser support for both WebSocket and SSE in 2026 — no polyfills needed', color: 'green' },
        { value: '50ms', label: 'typical WebSocket message latency vs 100–500ms for long polling round-trips', color: 'amber' },
        { value: '6',    label: 'max concurrent SSE connections per domain in HTTP/1.1 (unlimited in HTTP/2)', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="Definition: What Are WebSocket, SSE, and Long Polling?" />

      <QuickFact color="blue" label="Three different answers to: how does the server push data to the client?">
        Standard HTTP is request-response — the client asks, the server answers, the connection closes.
        All three real-time technologies solve the same problem differently: keeping data flowing from
        server to client without constant client polling. They differ fundamentally in directionality,
        protocol, connection lifecycle, and complexity.
      </QuickFact>

      <KeyPointsGrid columns={1} items={[
        {
          title: 'WebSocket — Full-duplex persistent connection',
          description: 'WebSocket starts as an HTTP request, then upgrades the connection to the WebSocket protocol (ws:// or wss://). After the handshake, a single TCP connection stays open and both sides can send frames at any time — simultaneously, with no request-response overhead. Ideal for chat, multiplayer games, collaborative editing, and any scenario requiring truly bidirectional communication.',
        },
        {
          title: 'Server-Sent Events (SSE) — One-way server push over HTTP',
          description: 'SSE is an HTTP endpoint that never closes — the server keeps the connection open and pushes text/event-stream formatted data whenever new information is available. It is strictly server → client (unidirectional). Built on plain HTTP, so it works through proxies and load balancers without configuration. Browsers implement automatic reconnection with the EventSource API. Ideal for live feeds, notifications, dashboards, and AI streaming responses.',
        },
        {
          title: 'Long Polling — Simulated push using repeated HTTP requests',
          description: 'Long polling is a technique, not a protocol. The client sends an HTTP request, the server holds it open (up to 30 seconds) until new data is available, then responds. The client immediately sends a new request. This simulates server push using standard HTTP. It is the oldest pattern, works everywhere, but adds per-message overhead from repeated connection setup. Use it only for legacy compatibility.',
        },
      ]} />

      <SectionHeader number={2} title="How Each Protocol Works — Connection Flow Diagram" />

      <FlowDiagram title="WebSocket Connection Lifecycle" steps={[
        { label: 'HTTP Upgrade Request',     desc: 'GET /ws  Connection: Upgrade  Upgrade: websocket  Sec-WebSocket-Key: <base64>', color: 'blue' },
        { label: 'Server 101 Switching',     desc: 'HTTP 101 Switching Protocols. TCP connection upgraded — HTTP protocol abandoned.', color: 'violet' },
        { label: 'Persistent WS Connection', desc: 'Both sides can now send binary or text frames at any time. Zero request-response overhead.', color: 'green' },
        { label: 'Message Exchange',         desc: 'Client → Server: {"type":"chat","text":"Hello"} | Server → Client: {"type":"broadcast","from":"Bob","text":"Hi"}', color: 'blue' },
        { label: 'Close Handshake',          desc: 'Either side sends a close frame. Connection tears down gracefully. Client reconnects if needed.', color: 'amber' },
      ]} />

      <FlowDiagram title="SSE (Server-Sent Events) Lifecycle" steps={[
        { label: 'GET /api/events',          desc: 'Standard HTTP GET. Client: Accept: text/event-stream. Server does NOT close the connection.', color: 'blue' },
        { label: 'Headers flushed',          desc: 'Content-Type: text/event-stream | Cache-Control: no-cache | Connection: keep-alive. Body starts streaming.', color: 'violet' },
        { label: 'Events pushed as text',    desc: 'data: {"price":142.50,"symbol":"AAPL"}\\n\\n — double newline terminates each event. Server pushes whenever ready.', color: 'green' },
        { label: 'EventSource auto-reconnects', desc: 'If connection drops, the browser automatically reconnects and sends Last-Event-ID header. No client code needed.', color: 'blue' },
        { label: 'Close when done',          desc: 'Client calls eventSource.close() or navigates away. Server detects closed connection and stops sending.', color: 'amber' },
      ]} />

      <FlowDiagram title="Long Polling Lifecycle" steps={[
        { label: 'Client sends GET /poll',   desc: 'Standard HTTP GET with optional since= timestamp. Server holds the connection open.', color: 'blue' },
        { label: 'Server waits (holds)',     desc: 'Server checks for new data every 500ms for up to 30 seconds. If data arrives, respond immediately.', color: 'violet' },
        { label: 'Response with data',       desc: 'New data found: 200 OK with JSON body. Timeout with no data: 200 OK with empty array. Client processes.', color: 'green' },
        { label: 'Client reconnects',        desc: 'Immediately after receiving a response, client sends a new GET /poll. Cycle repeats forever.', color: 'blue' },
        { label: 'Each message = 2 round-trips', desc: 'Setup + teardown per message adds latency and server connection overhead vs persistent connections.', color: 'amber' },
      ]} />

      <SectionHeader number={3} title="When to Use Each — Full Comparison Chart" />

      <CompareTable
        headers={['Factor', 'WebSocket', 'SSE (Server-Sent Events)', 'Long Polling']}
        rows={[
          ['Direction',          'Bidirectional (full-duplex)',    'Server → Client only',              'Server → Client (simulated)'],
          ['Protocol',           'ws:// or wss:// (RFC 6455)',     'HTTP with text/event-stream',        'Plain HTTP requests'],
          ['Connection',         'Single persistent TCP socket',  'Single persistent HTTP connection',  'Repeated HTTP request-response'],
          ['Latency',            '~50ms — lowest possible',       '~100ms — near real-time',            '~200–500ms — slower per message'],
          ['Auto-reconnect',     '❌ Must implement manually',    '✅ EventSource handles it natively',  '✅ Client loops on response'],
          ['Proxy/firewall',     '⚠️ Some proxies block upgrades', '✅ Plain HTTP — works everywhere',  '✅ Plain HTTP — works everywhere'],
          ['HTTP/2 multiplex',   '❌ Separate WS protocol',       '✅ Multiplexed over H2 streams',    '✅ Benefits from H2 connection reuse'],
          ['Browser support',    '✅ All modern browsers',        '✅ All modern browsers (not IE)',    '✅ Every browser including IE'],
          ['Server load',        'Low — one connection per client', 'Low — one connection per client', 'High — new connection per message'],
          ['Binary data',        '✅ Native binary frames',        '❌ Text only (base64 encode binary)', '❌ Text only'],
          ['Complexity',         'High — need WS server library', 'Low — plain HTTP endpoint',         'Medium — hold + poll logic'],
          ['Best for',           'Chat, games, collaborative edit', 'Feeds, notifications, AI streaming', 'Legacy browsers, simple updates'],
        ]}
      />

      <SectionHeader number={4} title="How to Implement All Three — Production Node.js Code" />

      <CodeBlock language="javascript" filename="WebSocket server — Node.js with ws library">
{`import { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer();
const wss    = new WebSocketServer({ server });

// Track connected clients with metadata
const clients = new Map(); // ws → { userId, roomId }

wss.on('connection', (ws, req) => {
  const userId = extractUserId(req); // parse from query param or cookie
  clients.set(ws, { userId });

  // Send welcome message immediately
  ws.send(JSON.stringify({ type: 'connected', userId, timestamp: new Date().toISOString() }));

  ws.on('message', (rawData) => {
    try {
      const message = JSON.parse(rawData.toString());

      if (message.type === 'chat') {
        // Broadcast to all clients in the same room
        const sender = clients.get(ws);
        const payload = JSON.stringify({
          type:      'chat',
          from:      sender.userId,
          text:      message.text,
          timestamp: new Date().toISOString(),
        });

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1 /* OPEN */) {
            client.send(payload);
          }
        });
      }
    } catch {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON message' }));
    }
  });

  ws.on('close', () => clients.delete(ws));
  ws.on('error', (err) => console.error('WS error:', err));
});

server.listen(3001, () => console.log('WebSocket server on :3001'));`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="WebSocket React client — with reconnection logic">
{`import { useEffect, useRef, useCallback, useState } from 'react';

function useWebSocket(url) {
  const wsRef        = useRef(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus]     = useState('connecting');

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen    = ()   => setStatus('connected');
    ws.onclose   = ()   => {
      setStatus('disconnected');
      setTimeout(connect, 3000); // reconnect after 3s
    };
    ws.onerror   = ()   => setStatus('error');
    ws.onmessage = (e)  => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { messages, status, send };
}`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="SSE server — Express endpoint (simpler than WebSocket)">
{`import express from 'express';
const app = express();

// In-memory pub/sub (use Redis in production for multi-instance)
const subscribers = new Set();

// ── SSE endpoint — one persistent HTTP connection per client ───────────────
app.get('/api/events', (req, res) => {
  // Required headers for SSE
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // disable Nginx buffering
  res.flushHeaders(); // send headers immediately, keep connection open

  // Send a heartbeat every 30s to prevent proxy timeouts
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\\n\\n'); // SSE comment — ignored by EventSource
  }, 30_000);

  // Register this client
  const send = (event, data) => {
    res.write(\`event: \${event}\\n\`);
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  subscribers.add(send);

  // Clean up when client disconnects
  req.on('close', () => {
    clearInterval(heartbeat);
    subscribers.delete(send);
  });
});

// ── Publish — call this whenever you have new data ─────────────────────────
function broadcast(event, data) {
  subscribers.forEach((send) => send(event, data));
}

// Example: push stock price every second
setInterval(() => {
  broadcast('price', { symbol: 'AAPL', price: (140 + Math.random() * 10).toFixed(2) });
}, 1000);

app.listen(3002);`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="SSE React hook — useEventSource with typed events">
{`import { useEffect, useState } from 'react';

interface PriceEvent { symbol: string; price: string; }

function useLivePrices(symbol: string) {
  const [price, setPrice]   = useState<string | null>(null);
  const [status, setStatus] = useState<'connecting' | 'open' | 'error'>('connecting');

  useEffect(() => {
    const es = new EventSource(\`/api/events?symbol=\${symbol}\`);

    es.addEventListener('price', (e: MessageEvent) => {
      const data: PriceEvent = JSON.parse(e.data);
      setPrice(data.price);
      setStatus('open');
    });

    es.onerror = () => {
      setStatus('error');
      // EventSource automatically reconnects — no manual logic needed
    };

    return () => es.close();
  }, [symbol]);

  return { price, status };
}

// Usage:
// const { price, status } = useLivePrices('AAPL');`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Long Polling — server and client (legacy compatibility)">
{`// ── Server ─────────────────────────────────────────────────────────────────
app.get('/api/poll', async (req, res) => {
  const since   = req.query.since ? new Date(req.query.since) : new Date(0);
  const timeout = 28_000; // 28s — leave 2s buffer before proxy/load-balancer timeout
  const interval = 500;   // check every 500ms
  const start   = Date.now();

  while (Date.now() - start < timeout) {
    const updates = await db.query(
      'SELECT * FROM events WHERE created_at > ? ORDER BY created_at ASC LIMIT 50',
      [since]
    );

    if (updates.length > 0) {
      return res.json({
        data:      updates,
        timestamp: new Date().toISOString(),
        hasMore:   updates.length === 50,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  // Timeout — return empty, client reconnects immediately
  res.json({ data: [], timestamp: new Date().toISOString(), hasMore: false });
});

// ── Client ─────────────────────────────────────────────────────────────────
let lastTimestamp = null;

async function longPoll() {
  try {
    const url = lastTimestamp ? \`/api/poll?since=\${lastTimestamp}\` : '/api/poll';
    const res  = await fetch(url, { signal: AbortSignal.timeout(35_000) });
    const body = await res.json();

    if (body.data.length > 0) {
      processUpdates(body.data);
      lastTimestamp = body.timestamp;
    }
  } catch (err) {
    if (err.name !== 'AbortError') await sleep(2000); // wait on error before retry
  }

  longPoll(); // always reconnect, synchronous recursion avoids stack growth
}

longPoll(); // start the loop`}
      </CodeBlock>

      <SectionHeader number={5} title="Why the Right Choice Matters — Performance and Scalability" />

      <p>
        Each technology has a fundamentally different cost model at scale. The wrong choice for your
        use case does not show up in development with 10 concurrent users &mdash; it shows up in production
        with 10,000.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Is communication bidirectional? → WebSocket',
          desc: 'If the client must send data to the server at any time — chat messages, game inputs, collaborative edits, cursor positions — WebSocket is the only technology that handles this without a second HTTP connection for client-to-server messages. SSE is receive-only.',
        },
        {
          title: 'Is it server-to-client only, and you want simplicity? → SSE',
          desc: 'Live dashboards, stock tickers, notification feeds, AI streaming text, live sports scores — all are server-to-client. SSE delivers all of these with less code than WebSocket, better proxy compatibility, and automatic reconnection baked into the browser EventSource API. HTTP/2 allows unlimited concurrent SSE connections (vs the 6-connection limit in HTTP/1.1).',
        },
        {
          title: 'Do you need to support very old browsers or corporate proxies that block WS? → SSE or Long Polling',
          desc: 'Some enterprise networks block WebSocket upgrades at the proxy level. SSE runs over plain HTTP and passes through every proxy. Long polling is the nuclear option: it works in every browser, through every proxy, on every network — at the cost of higher latency and server connection count.',
        },
        {
          title: 'Is this a Next.js or edge-deployed app? → SSE via Route Handlers',
          desc: 'WebSocket servers require a persistent Node.js process — incompatible with serverless and edge deployments. SSE works in Next.js App Router route handlers using ReadableStream. Long polling also works. For Next.js apps, SSE is almost always the right real-time choice.',
        },
        {
          title: 'Are you streaming AI responses? → SSE or NDJSON over fetch',
          desc: 'OpenAI, Anthropic, and Gemini all stream responses as Server-Sent Events or NDJSON over HTTP. For displaying AI responses token-by-token in your UI, SSE on your API proxy endpoint is the exact right tool — simple, compatible, and directly maps to the upstream streaming format.',
        },
      ]} />

      <AlertBox type="tip" title="Quick-pick decision table — 30-second read">
        <strong>Chat app / multiplayer game / collaborative doc editor</strong> → WebSocket (bidirectional required).{' '}
        <strong>Live dashboard / stock ticker / notification feed / AI streaming</strong> → SSE (server-push, simple, works everywhere).{' '}
        <strong>Next.js / Vercel / Edge deployment</strong> → SSE via ReadableStream route handler.{' '}
        <strong>Legacy IE support / extreme corporate firewall</strong> → Long Polling.{' '}
        <strong>Need binary data (audio, video frames)?</strong> → WebSocket (SSE is text-only).
      </AlertBox>

      <ToolCTA
        href="/json-error-explainer"
        title="Debugging Real-Time JSON Parsing Errors?"
        description="Malformed SSE event data, invalid WebSocket JSON frames, or broken long-poll responses — paste any JSON into our AI Error Explainer and get an instant diagnosis with plain-English explanations and auto-fix."
        buttonText="Fix My Real-Time JSON →"
        color="blue"
      />

      <FAQAccordion items={[
        {
          question: 'Can SSE replace WebSocket for a chat application?',
          answer: 'Only partially. SSE handles the server-to-client direction (receiving messages) perfectly. For the client-to-server direction (sending messages), you need a separate standard HTTP POST request for each message. This works but introduces split logic — some real-time data over SSE, some over regular fetch. For true chat at scale, WebSocket is cleaner because one connection handles both directions. For a small chat feature inside a larger app, SSE + fetch for sending is a pragmatic, lower-complexity choice.',
        },
        {
          question: 'What is the SSE 6-connection limit and how do I avoid it?',
          answer: 'HTTP/1.1 limits browsers to 6 concurrent connections per domain. If your app opens multiple SSE connections (for different features), you quickly hit this limit — new connections block. The solution is HTTP/2, which multiplexes unlimited streams over a single TCP connection. In HTTP/2, you can open hundreds of SSE connections without hitting any browser limit. Most modern CDNs and reverse proxies (Nginx, Caddy) support HTTP/2 by default. Verify your server supports it and the limit disappears.',
        },
        {
          question: 'Does WebSocket work through Nginx and load balancers?',
          answer: 'Yes, but it requires explicit configuration. In Nginx, you must add proxy_http_version 1.1 and set the Upgrade and Connection headers to enable WebSocket proxying. AWS ALB supports WebSocket natively. AWS API Gateway v2 supports WebSocket APIs. The most common failure mode is a proxy that does not pass the Upgrade header, causing the WebSocket handshake to fail with a 426 or 400 error. SSE requires no special proxy configuration because it is plain HTTP.',
        },
        {
          question: 'How do I scale WebSocket to multiple server instances?',
          answer: 'A WebSocket connection is tied to a specific server instance — you cannot route a message to a client connected to a different instance without inter-instance communication. The standard pattern is a pub/sub layer (Redis Pub/Sub is the most common) shared across all instances. When server A needs to send a message to a client connected to server B, it publishes to Redis; server B is subscribed and forwards the message to the connected client. Socket.io has a Redis adapter that handles this automatically.',
        },
        {
          question: 'Is long polling a good choice for a new application in 2026?',
          answer: 'Almost never for new applications. Long polling was the best available option before WebSocket (2011) and EventSource became universally supported. Today, SSE gives you the same server-push capability with better performance (no repeated connection setup), less server load, and automatic reconnection — all over plain HTTP that works through every proxy. Use long polling only if you genuinely need to support IE11 or an unusually restrictive network environment that blocks persistent connections.',
        },
        {
          question: 'How do I send JSON efficiently over WebSocket vs SSE?',
          answer: 'WebSocket: use ws.send(JSON.stringify(data)) for text frames, or send binary (Uint8Array) for high-frequency data like game state where msgpack or protobuf is worth the overhead. SSE: format as data: JSON_STRING followed by two newlines. The EventSource API delivers the data field as a string; parse it with JSON.parse(event.data) in your onmessage handler. For both technologies, keep individual messages small — bundle related updates into one message rather than sending many small messages, and consider compression (WebSocket permessage-deflate, or HTTP Accept-Encoding for SSE).',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
