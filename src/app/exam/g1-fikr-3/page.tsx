import ExamPlayer from '@/components/exam/ExamPlayer';
import { requirePaid } from '@/lib/paywall';

/** "Fikrlash qobiliyatini baholash — 3-test" — a third grade-1 thinking-skills
 *  practice test: drawn figure-logic questions (analogy, odd colour, balance,
 *  counting) plus GENERATIVE value questions whose numbers change every attempt. */
export const dynamic = 'force-dynamic';

export default async function G1Fikr3ExamPage() {
  // Paywall: practice exams require an active subscription.
  await requirePaid();
  return <ExamPlayer variant="fikr3" />;
}
