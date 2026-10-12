import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Fikrlash qobiliyati mashqlari" — grade-1 thinking-skills practice test
 *  (10 Q, 20 min), modelled on the Presidential School thinking assessment.
 *  Questions are regenerated client-side on every attempt. */
export const dynamic = 'force-dynamic';

export default async function G1FikrExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="fikr" />;
}
