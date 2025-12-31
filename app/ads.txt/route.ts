import { NextResponse } from 'next/server';

// Ezoic ads.txt redirect
// Replace 'unblockdevs.com' with your actual domain if different
const EZOIC_ADS_TXT_URL = 'https://srv.adstxtmanager.com/19390/unblockdevs.com';

export async function GET() {
  // Redirect to Ezoic's ads.txt manager
  return NextResponse.redirect(EZOIC_ADS_TXT_URL, {
    status: 301, // Permanent redirect
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

