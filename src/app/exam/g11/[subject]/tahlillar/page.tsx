import { notFound } from 'next/navigation';
import G11ReviewsView from '@/components/g11/G11ReviewsView';
import { getG11Subject } from '@/content/g11/subjects';

/** Grade 11: past test attempts + their reviews for one subject (🗓️). */
export default async function G11ReviewsPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  if (!getG11Subject(subject)) notFound();
  return <G11ReviewsView slug={subject} />;
}
