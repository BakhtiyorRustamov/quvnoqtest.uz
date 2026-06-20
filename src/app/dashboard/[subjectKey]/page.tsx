import { notFound } from 'next/navigation';
import SubjectView from '@/components/dashboard/SubjectView';

/** Only g1-math has a real subject view in v1.0; other subjects route via /subject/… stubs. */
export default async function SubjectViewPage({ params }: { params: Promise<{ subjectKey: string }> }) {
  const { subjectKey } = await params;
  if (subjectKey !== 'g1-math') notFound();
  return <SubjectView />;
}
