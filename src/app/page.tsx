import { redirect } from 'next/navigation';
import { getStore } from '@/lib/store';
import Landing from '@/components/landing/Landing';

export const dynamic = 'force-dynamic';

/**
 * Landing page. Returning visitors — anyone who already has an account (a user
 * record is created the moment they start any lesson) — skip the marketing
 * landing and go straight to the subject-picker dashboard. Brand-new, anonymous
 * visitors still see the landing page.
 */
export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ home?: string }>;
}) {
  // A returning visitor who deliberately opens the landing page from the
  // dashboard ("Ilk sahifa") passes ?home=1 and is NOT bounced back.
  const { home } = await searchParams;
  if (home === '1') return <Landing />;

  const store = getStore();
  const user = await store.getCurrent();
  if (user) redirect('/dashboard');
  return <Landing />;
}
