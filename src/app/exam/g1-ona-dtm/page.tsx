import ExamPlayer from '@/components/exam/ExamPlayer';

/** "DTM ga tayyorgarlik (Ona tili)" — grade-1 native-language practice exam in
 *  DTM style (20 Q, 30 min). Words/items and question order are re-randomized on
 *  every attempt, so retakes give a different test. */
export default function G1OnaDtmExamPage() {
  return <ExamPlayer variant="ona" />;
}
