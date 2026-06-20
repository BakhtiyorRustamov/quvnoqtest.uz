import { notFound } from 'next/navigation';
import { getLesson } from '@/content';
import LessonPlayer from '@/components/lesson/LessonPlayer';

export default async function LessonPage({ params }: { params: Promise<{ topicKey: string }> }) {
  const { topicKey } = await params;
  const lesson = getLesson(topicKey);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}
