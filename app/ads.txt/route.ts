import { NextResponse } from 'next/server';

// Ezoic ads.txt - Fetch and serve content directly
// This ensures Ezoic can properly detect the seller entries
const EZOIC_ADS_TXT_URL = 'https://srv.adstxtmanager.com/19390/unblockdevs.com';

// Force dynamic rendering to avoid caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Fetch the ads.txt content from Ezoic's manager
    const response = await fetch(EZOIC_ADS_TXT_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ads.txt-fetcher)',
        'Accept': 'text/plain',
      },
      cache: 'no-store', // Don't cache the fetch
    });

    if (!response.ok) {
      console.error(`Failed to fetch ads.txt: ${response.status} ${response.statusText}`);
      // Return a minimal ads.txt with Ezoic entry if fetch fails
      const fallbackContent = `#Ads.txt unblockdevs.com
#Ads.txt managed by AdsTxtManager.com
ownerdomain=unblockdevs.com
contact=directsales@ezoic.com
managerdomain=ezoic.ai

ezoic.ai, 8a94bfd532909f493759d3919f3b2b52, DIRECT
`;
      
      return new NextResponse(fallbackContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=300, must-revalidate',
        },
      });
    }

    const adsTxtContent = await response.text();

    // Validate that the content contains Ezoic entries
    if (!adsTxtContent.includes('ezoic.ai') || !adsTxtContent.includes('8a94bfd532909f493759d3919f3b2b52')) {
      console.warn('ads.txt content does not contain expected Ezoic entries');
    }

    // Return the ads.txt content directly with proper headers
    // Ezoic requires exactly 'text/plain' Content-Type header
    return new NextResponse(adsTxtContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (error) {
    // Fallback: Return a basic ads.txt with Ezoic entry
    console.error('Error fetching ads.txt:', error);
    const fallbackContent = `#Ads.txt unblockdevs.com
#Ads.txt managed by AdsTxtManager.com
#Error fetching from manager - using fallback
ownerdomain=unblockdevs.com
contact=directsales@ezoic.com
managerdomain=ezoic.ai

ezoic.ai, 8a94bfd532909f493759d3919f3b2b52, DIRECT
`;
    
    return new NextResponse(fallbackContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=300, must-revalidate',
      },
    });
  }
}

