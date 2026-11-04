import { notFound } from 'next/navigation';
import G11ExamPlayer from '@/components/g11/G11ExamPlayer';
import EnglishExam from '@/components/english/EnglishExam';
import { getG11Subject } from '@/content/g11/subjects';
import { examMetadata, examJsonLd, ldJson } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params;
  return examMetadata(subject);
}

/** Grade 11 "Sinov testi" (dummy, 45 Q) for one subject. */
export default async function G11DiagnosticPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  if (!getG11Subject(subject)) notFound();
  // English: Multilevel (CEFR) / IELTS Academic hub with all four sections
  const ld = <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(examJsonLd(subject))} />;
  if (subject === 'ingliz-tili') return <>{ld}<EnglishExam /></>;
  return <>{ld}<G11ExamPlayer slug={subject} /></>;
}
