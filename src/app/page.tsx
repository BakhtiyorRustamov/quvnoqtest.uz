import { redirect } from 'next/navigation';
import { getStore } from '@/lib/store';
import Landing from '@/components/landing/Landing';

export const dynamic = 'force-dynamic';

/**
 * Landing page. Returning visitors who already went through the demo lesson
 * (g1-math-01) skip the marketing landing and go straight to the subject-picker
 * dashboard.
 */
export default async function Home() {
  const store = getStore();
  const user = await store.getCurrent();
  if (user) {
    const progress = await store.listProgress();
    const didDemo = progress.some((p) => p.topicKey === 'g1-math-01');
    if (didDemo) redirect('/dashboard');
  }
  return <Landing />;
}
