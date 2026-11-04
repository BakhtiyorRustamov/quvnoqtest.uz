import { notFound } from 'next/navigation';
import G11LessonView from '@/components/g11/G11LessonView';
import { getG11Subject } from '@/content/g11/subjects';
import { getG11Lesson, hasG11Content } from '@/content/g11/lessons';
import { lessonMetadata, lessonJsonLd, ldJson } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ subject: string; n: string }> }): Promise<Metadata> {
  const { subject, n } = await params;
  const lesson = getG11Lesson(Number(n), subject);
  return lesson && getG11Subject(subject) && hasG11Content(lesson) ? lessonMetadata(subject, lesson) : {};
}

/** Grade 11 lesson page (only lessons that have content exist). */
export default async function G11LessonPage({ params, searchParams }: { params: Promise<{ subject: string; n: string }>; searchParams: Promise<{ g?: string }> }) {
  const { subject, n } = await params;
  const { g } = await searchParams;
  const lesson = getG11Lesson(Number(n), subject);
  if (!getG11Subject(subject) || !lesson || !hasG11Content(lesson)) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(lessonJsonLd(subject, lesson))} />
      <G11LessonView slug={subject} n={lesson.n} grade={g === '10' ? 10 : 11} />
    </>
  );
}
