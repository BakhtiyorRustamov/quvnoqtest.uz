import MultilevelExamPlayer from '@/components/exam/MultilevelExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Milliy Sertifikat Multilevelga tayyorlanish" — grade-1 English practice
 *  exam in the four-section CEFR Multilevel / IELTS shape (Listening, Reading,
 *  Writing, ungraded Speaking), drawn fresh from each section's pool on every
 *  attempt. */
export const dynamic = 'force-dynamic';

export default async function G1InglizMultilevelExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <MultilevelExamPlayer />;
}
