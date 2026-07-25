import { redirect } from 'next/navigation';
import { getStore, isActive } from '@/lib/store';
import { G1_MATH_TOPICS, G1_ONA_TOPICS, G1_ALIFBE_TOPICS, G1_INGLIZ_LESSONS, G1_TABIIY_TOPICS } from '@/content';
import { G1_OQISH_LESSONS } from '@/content/g1-oqish/structure';
import { G1_INFORMATIKA_TOPICS } from '@/content/g1-informatika/topics';
import { G1_TARBIYA_TOPICS } from '@/content/g1-tarbiya/topics';
import { G1_ART_TOPICS } from '@/content/g1-art/topics';
import { G1_TEX_TOPICS } from '@/content/g1-tex/topics';

/**
 * Paywall (FR-PAY): guests and expired subscribers may browse the dashboards
 * freely, but only the FIRST lesson of each subject is playable. Everything
 * else — later lessons, review/game lessons and all practice exams — requires
 * an active subscription (`paidUntil` in the future). Progress, scores and
 * profile data are never touched by expiry; only access is gated.
 */

/** The first lesson of every subject — always free to play. */
export const FREE_LESSON_KEYS: ReadonlySet<string> = new Set(
  [
    G1_MATH_TOPICS,
    G1_ONA_TOPICS,
    G1_ALIFBE_TOPICS,
    G1_INGLIZ_LESSONS,
    G1_TABIIY_TOPICS,
    G1_OQISH_LESSONS,
    G1_INFORMATIKA_TOPICS,
    G1_TARBIYA_TOPICS,
    G1_ART_TOPICS,
    G1_TEX_TOPICS
  ]
    .map((list) => (list[0] as { key?: string } | undefined)?.key)
    .filter((k): k is string => !!k)
);

export function isFreeLessonKey(topicKey: string): boolean {
  return FREE_LESSON_KEYS.has(topicKey);
}

/** True when the current user has an active subscription and is not disabled. */
export async function hasActiveSubscription(): Promise<boolean> {
  const user = await getStore().getCurrent();
  return isActive(user);
}

/** Server-side gate for paid-only pages (practice exams etc.). */
export async function requirePaid(): Promise<void> {
  if (!(await hasActiveSubscription())) redirect('/upgrade');
}

/** Server-side gate for a lesson: the subject's first lesson is free, the rest
 *  require an active subscription. */
export async function requireLessonAccess(topicKey: string): Promise<void> {
  if (isFreeLessonKey(topicKey)) return;
  await requirePaid();
}
