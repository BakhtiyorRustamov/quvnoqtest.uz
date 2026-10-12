import { notFound } from 'next/navigation';
import G11ExamPlayer from '@/components/g11/G11ExamPlayer';
import { getG11Subject } from '@/content/g11/subjects';

/** Grade 11 "Sinov testi" (dummy, 45 Q) for one subject. */
export default async function G11DiagnosticPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  if (!getG11Subject(subject)) notFound();
  return <G11ExamPlayer slug={subject} />;
}
