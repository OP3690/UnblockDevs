import { NextResponse } from 'next/server';

// Ezoic ads.txt redirect - Required by Ezoic to manage ads.txt file
// Redirect /ads.txt to Ezoic's Ads.txt Manager
const EZOIC_ADS_TXT_URL = 'https://srv.adstxtmanager.com/19390/unblockdevs.com';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Permanent redirect (301) to Ezoic's Ads.txt Manager
  // This is the method Ezoic requires for managing ads.txt files
  return NextResponse.redirect(EZOIC_ADS_TXT_URL, {
    status: 301, // Permanent redirect
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache redirect for 1 hour
    },
  });
}

