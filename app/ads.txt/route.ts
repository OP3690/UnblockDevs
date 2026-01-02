import { NextResponse } from 'next/server';

// Google AdSense ads.txt content
// Format: <DOMAIN>, <PUBLISHER_ID>, <RELATIONSHIP>, <CERTIFICATION_AUTHORITY_ID>
const ADS_TXT_CONTENT = `google.com, pub-6349841658473646, DIRECT, f08c47fec0942fa0
# Ezoic ads.txt (if using Ezoic)
# Uncomment the line below if you want to include Ezoic
# ezoic.com, 19390, RESELLER, e1ed5c632a6fc570`;

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Return ads.txt content directly (not a redirect)
  // Google AdSense requires the file to be accessible at /ads.txt
  return new NextResponse(ADS_TXT_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

