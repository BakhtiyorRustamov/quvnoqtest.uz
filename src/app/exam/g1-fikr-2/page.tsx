import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Fikrlash qobiliyatini baholash — 2-test" — a second grade-1 thinking-skills
 *  practice test, focused on verbal LOGICAL REASONING (no arithmetic).
 *  Questions are regenerated client-side on every attempt. */
export const dynamic = 'force-dynamic';

export default async function G1Fikr2ExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="fikr2" />;
}
