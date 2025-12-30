import { NextResponse } from 'next/server';

// Ezoic ads.txt - Fetch and serve content directly
// This ensures Ezoic can properly detect the seller entries
const EZOIC_ADS_TXT_URL = 'https://srv.adstxtmanager.com/19390/unblockdevs.com';

export async function GET() {
  try {
    // Fetch the ads.txt content from Ezoic's manager
    const response = await fetch(EZOIC_ADS_TXT_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ads.txt-fetcher)',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      // If fetch fails, return a basic ads.txt with Ezoic entry
      return new NextResponse(
        `# Ezoic ads.txt\n# If you see this, the Ezoic manager is not accessible\n# Please check: ${EZOIC_ADS_TXT_URL}\n`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }
      );
    }

    const adsTxtContent = await response.text();

    // Return the ads.txt content directly
    return new NextResponse(adsTxtContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    // Fallback: Return a basic ads.txt with Ezoic entry
    console.error('Error fetching ads.txt:', error);
    return new NextResponse(
      `# Ezoic ads.txt\n# Error fetching from manager\n# Please verify: ${EZOIC_ADS_TXT_URL}\n`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes on error
        },
      }
    );
  }
}

