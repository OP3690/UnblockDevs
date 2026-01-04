import type { Metadata } from 'next';
import HowToGetCurlFromChromeClient from './client';

export const metadata: Metadata = {
  title: 'How to Get cURL from Chrome: Copy Request as cURL | UnblockDevs',
  description: 'Learn how to copy HTTP requests as cURL commands from Chrome DevTools. Step-by-step guide to export network requests as cURL for testing and debugging.',
  keywords: [
    'how to get curl from chrome',
    'copy as curl chrome',
    'chrome devtools curl',
    'export request as curl',
    'chrome network tab curl',
    'copy request curl chrome',
    'chrome curl command'
  ],
};

export default function HowToGetCurlFromChrome() {
  return <HowToGetCurlFromChromeClient />;
}

