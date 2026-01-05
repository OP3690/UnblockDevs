import { redirect } from 'next/navigation';

export default function Lander() {
  // Redirect to homepage instead of showing blank page
  redirect('/');
}

