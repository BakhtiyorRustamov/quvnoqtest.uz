import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Prezident maktabiga tayyorgarlik" — grade-1 practice exam (30 Q, 60 min).
 *  Values are regenerated client-side on every attempt. */
export const dynamic = 'force-dynamic';

export default async function G1MathExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="president" />;
}
