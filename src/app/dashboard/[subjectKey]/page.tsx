import { notFound } from 'next/navigation';
import SubjectView from '@/components/dashboard/SubjectView';
import OnaSubjectView from '@/components/dashboard/OnaSubjectView';

/** Built subject views in v1.0: g1-math and g1-ona; other subjects route via /subject/… stubs. */
export default async function SubjectViewPage({ params }: { params: Promise<{ subjectKey: string }> }) {
  const { subjectKey } = await params;
  if (subjectKey === 'g1-math') return <SubjectView />;
  if (subjectKey === 'g1-ona') return <OnaSubjectView />;
  notFound();
}
