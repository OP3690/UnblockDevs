import type { Metadata } from 'next';
import HomeServerHero from '@/components/home/HomeServerHero';
import HomeClient from './page-client';

export const metadata: Metadata = {
  alternates: { canonical: 'https://unblockdevs.com/' },
};

export default function Home() {
  /* Nav must be first (matches redesign); hero is passed into client shell below header */
  return <HomeClient hero={<HomeServerHero />} />;
}
