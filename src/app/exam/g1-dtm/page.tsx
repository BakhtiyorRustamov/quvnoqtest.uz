import ExamPlayer from '@/components/exam/ExamPlayer';

/** "DTM ga tayyorgarlik" — grade-1 practice exam in DTM style (30 Q, 60 min).
 *  Values are regenerated client-side on every attempt. */
export default function G1DtmExamPage() {
  return <ExamPlayer variant="dtm" />;
}
