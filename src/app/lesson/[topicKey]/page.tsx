import { notFound } from 'next/navigation';
import { getLesson } from '@/content';
import { requireLessonAccess } from '@/lib/paywall';
import LessonPlayer from '@/components/lesson/LessonPlayer';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }: { params: Promise<{ topicKey: string }> }) {
  const { topicKey } = await params;
  const lesson = getLesson(topicKey);
  if (!lesson) notFound();
  // Paywall: only each subject's first lesson is free (guests & expired subs).
  await requireLessonAccess(topicKey);
  return <LessonPlayer lesson={lesson} />;
}
