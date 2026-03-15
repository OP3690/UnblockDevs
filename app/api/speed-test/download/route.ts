import { NextRequest, NextResponse } from 'next/server';

const MAX_BYTES = 25_000_000; // 25 MB cap

/** GET ?bytes=N: return N bytes of zero-filled body for download speed test. */
export async function GET(request: NextRequest) {
  const bytes = Math.min(
    Math.max(1, Number(request.nextUrl.searchParams.get('bytes')) || 1_000_000),
    MAX_BYTES
  );
  const body = new Uint8Array(bytes);
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Content-Length': String(bytes),
    },
  });
}
