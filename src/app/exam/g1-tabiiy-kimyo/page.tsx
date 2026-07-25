import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Milliy sertifikatga tayyorlanish: Kimyo" — grade-1 natural-science
 *  practice exam (30 Q, 45 min); a fresh random subset on every attempt. */
export const dynamic = 'force-dynamic';

export default async function G1TabiiyKimyoExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="kimyo" />;
}
