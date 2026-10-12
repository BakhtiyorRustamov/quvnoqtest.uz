import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "DTM ga tayyorgarlik (Ona tili)" — grade-1 native-language practice exam in
 *  DTM style (20 Q, 30 min). Words/items and question order are re-randomized on
 *  every attempt, so retakes give a different test. */
export const dynamic = 'force-dynamic';

export default async function G1OnaDtmExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="ona" />;
}
