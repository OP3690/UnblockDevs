import type { Metadata } from 'next';
import HomeClient from './page-client';

export const metadata: Metadata = {
  alternates: { canonical: 'https://unblockdevs.com/' },
};

export default function Home() {
  return <HomeClient />;
}
