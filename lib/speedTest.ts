export interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  timestamp: Date;
}

// Use same-origin API routes to avoid CORS (Cloudflare speed endpoints block cross-origin from other domains).
const getBase = () => (typeof window !== 'undefined' ? '' : 'https://unblockdevs.com');

export async function measureDownloadSpeed(
  onProgress: (speed: number) => void,
  signal?: AbortSignal
): Promise<number> {
  const base = getBase();
  const testSizes = [
    { bytes: 1_000_000, label: '1MB' },
    { bytes: 5_000_000, label: '5MB' },
    { bytes: 10_000_000, label: '10MB' },
    { bytes: 25_000_000, label: '25MB' },
  ];

  const speeds: number[] = [];

  for (const test of testSizes) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const url = `${base}/api/speed-test/download?bytes=${test.bytes}&_=${Date.now()}`;
    const start = performance.now();

    const response = await fetch(url, { cache: 'no-store', signal });
    await response.arrayBuffer();

    const duration = (performance.now() - start) / 1000;
    const speedMbps = (test.bytes * 8) / duration / 1_000_000;
    speeds.push(speedMbps);
    onProgress(speedMbps);
  }

  speeds.sort((a, b) => a - b);
  return speeds[Math.floor(speeds.length / 2)];
}

/** Browser Crypto API allows max 65536 bytes per getRandomValues call. Fill in chunks. */
function fillRandom(buffer: Uint8Array): void {
  const chunk = 65536;
  for (let i = 0; i < buffer.length; i += chunk) {
    const slice = buffer.subarray(i, Math.min(i + chunk, buffer.length));
    crypto.getRandomValues(slice);
  }
}

export async function measureUploadSpeed(
  onProgress: (speed: number) => void,
  signal?: AbortSignal
): Promise<number> {
  const base = getBase();
  const testSizes = [1_000_000, 5_000_000, 10_000_000];

  const speeds: number[] = [];

  for (const bytes of testSizes) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const data = new Uint8Array(bytes);
    fillRandom(data);

    const start = performance.now();

    await fetch(`${base}/api/speed-test/upload`, {
      method: 'POST',
      body: data,
      cache: 'no-store',
      signal,
    });

    const duration = (performance.now() - start) / 1000;
    const speedMbps = (bytes * 8) / duration / 1_000_000;
    speeds.push(speedMbps);
    onProgress(speedMbps);
  }

  speeds.sort((a, b) => a - b);
  return speeds[Math.floor(speeds.length / 2)];
}

export async function measurePing(signal?: AbortSignal): Promise<{
  ping: number;
  jitter: number;
}> {
  const base = getBase();
  const pings: number[] = [];

  for (let i = 0; i < 10; i++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const start = performance.now();
    await fetch(`${base}/api/speed-test/ping?_=${Date.now()}`, { cache: 'no-store', signal });
    pings.push(performance.now() - start);
    await new Promise((r) => setTimeout(r, 100));
  }

  pings.sort((a, b) => a - b);
  const trimmed = pings.slice(1, -1);

  const avg = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
  const jitter = Math.max(...trimmed) - Math.min(...trimmed);

  return {
    ping: Math.round(avg),
    jitter: Math.round(jitter),
  };
}

export function getSpeedRating(mbps: number): {
  label: string;
  color: string;
  description: string;
} {
  if (mbps >= 500)
    return {
      label: 'Blazing Fast',
      color: '#00ff88',
      description: 'Exceptional speed — handles everything',
    };
  if (mbps >= 200)
    return {
      label: 'Excellent',
      color: '#00cc66',
      description: 'More than enough for any task',
    };
  if (mbps >= 100)
    return {
      label: 'Very Good',
      color: '#66ff66',
      description: 'Great for all streaming and work',
    };
  if (mbps >= 50)
    return {
      label: 'Good',
      color: '#ffcc00',
      description: 'Handles most tasks comfortably',
    };
  if (mbps >= 25)
    return {
      label: 'Average',
      color: '#ff9900',
      description: 'OK for basic use and HD streaming',
    };
  if (mbps >= 10)
    return {
      label: 'Below Average',
      color: '#ff6600',
      description: 'May struggle with 4K or large files',
    };
  return {
    label: 'Slow',
    color: '#ff3300',
    description: 'Basic browsing only',
  };
}

export function getCapabilities(
  downloadMbps: number,
  ping: number
): Array<{
  activity: string;
  icon: string;
  supported: boolean;
  requirement: string;
}> {
  return [
    {
      activity: '4K Netflix Streaming',
      icon: '📺',
      supported: downloadMbps >= 25,
      requirement: '25 Mbps',
    },
    {
      activity: 'HD Video Calls (Zoom)',
      icon: '📹',
      supported: downloadMbps >= 10 && ping < 150,
      requirement: '10 Mbps + low ping',
    },
    {
      activity: 'Online Gaming',
      icon: '🎮',
      supported: downloadMbps >= 25 && ping < 50,
      requirement: '25 Mbps + <50ms ping',
    },
    {
      activity: 'Remote Work',
      icon: '💼',
      supported: downloadMbps >= 50,
      requirement: '50 Mbps',
    },
    {
      activity: 'Cloud Development',
      icon: '☁️',
      supported: downloadMbps >= 100,
      requirement: '100 Mbps',
    },
    {
      activity: 'Large File Uploads',
      icon: '📤',
      supported: downloadMbps >= 50,
      requirement: '50 Mbps',
    },
    {
      activity: '8K Streaming',
      icon: '🖥️',
      supported: downloadMbps >= 100,
      requirement: '100 Mbps',
    },
    {
      activity: 'Multiple 4K Devices',
      icon: '📡',
      supported: downloadMbps >= 100,
      requirement: '100 Mbps+',
    },
  ];
}

/** Short sentence for hero: "Your connection should handle …" */
export function getConnectionSummary(
  downloadMbps: number,
  ping: number
): string {
  const caps = getCapabilities(downloadMbps, ping);
  const supported = caps.filter((c) => c.supported);
  if (supported.length >= 4)
    return 'Your connection should handle multiple devices streaming HD, video calls, and gaming at the same time.';
  if (supported.length >= 2) {
    const names = supported.slice(0, 3).map((c) => c.activity.replace(/ \d+K| \(.*\)/g, '').toLowerCase());
    return `Your connection can handle ${names.join(', ')}.`;
  }
  if (supported.length === 1)
    return `Suitable for ${supported[0].activity.toLowerCase()}.`;
  return 'Best for basic browsing and email.';
}
