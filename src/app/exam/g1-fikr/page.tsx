import ExamPlayer from '@/components/exam/ExamPlayer';

/** "Fikrlash qobiliyati mashqlari" — grade-1 thinking-skills practice test
 *  (10 Q, 20 min), modelled on the Presidential School thinking assessment.
 *  Questions are regenerated client-side on every attempt. */
export default function G1FikrExamPage() {
  return <ExamPlayer variant="fikr" />;
}
