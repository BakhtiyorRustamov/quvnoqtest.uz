import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Milliy sertifikatga tayyorgarlik - Adabiyot" — grade-1 literature practice
 *  exam for Oʻqish savodxonligi (20 Q, 30 min). Questions and their order are
 *  re-randomized on every attempt, so retakes give a different test. */
export const dynamic = 'force-dynamic';

export default async function G1OqishDtmExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="adabiyot" />;
}
