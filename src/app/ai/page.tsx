import { redirect } from 'next/navigation';
import { getStore, isPaid } from '@/lib/store';
import { AI_LIMITS, FREE_AI_KEY } from '@/lib/ai';
import AiChat from '@/components/ai/AiChat';

export const dynamic = 'force-dynamic';

/**
 * AI tutor. Paid users always have access. Free users get one free-trial
 * session; once that allowance is spent they're sent to Upgrade.
 */
export default async function AiPage() {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) redirect('/dashboard');
  if (!isPaid(user)) {
    const usage = await store.getAiUsage(FREE_AI_KEY);
    if (usage.messages >= AI_LIMITS.messages || usage.tokens >= AI_LIMITS.tokens) redirect('/upgrade');
  }
  return <AiChat />;
}
