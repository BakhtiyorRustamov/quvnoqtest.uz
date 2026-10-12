import { notFound } from 'next/navigation';
import G11LessonView from '@/components/g11/G11LessonView';
import { getG11Subject } from '@/content/g11/subjects';
import { getG11Lesson } from '@/content/g11/lessons';

/** Grade 11 dummy lesson page (only lessons that have content exist). */
export default async function G11LessonPage({ params }: { params: Promise<{ subject: string; n: string }> }) {
  const { subject, n } = await params;
  const lesson = getG11Lesson(Number(n));
  if (!getG11Subject(subject) || !lesson || lesson.body.length === 0) notFound();
  return <G11LessonView slug={subject} n={lesson.n} />;
}
