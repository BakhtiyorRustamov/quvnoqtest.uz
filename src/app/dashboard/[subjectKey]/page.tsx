import { notFound } from 'next/navigation';
import SubjectView from '@/components/dashboard/SubjectView';
import OnaSubjectView from '@/components/dashboard/OnaSubjectView';
import FikrSubjectView from '@/components/dashboard/FikrSubjectView';
import OqishSubjectView from '@/components/dashboard/OqishSubjectView';
import TabiiySubjectView from '@/components/dashboard/TabiiySubjectView';
import AlifbeSubjectView from '@/components/dashboard/AlifbeSubjectView';
import InformatikaSubjectView from '@/components/dashboard/InformatikaSubjectView';
import TarbiyaSubjectView from '@/components/dashboard/TarbiyaSubjectView';
import ArtSubjectView from '@/components/dashboard/ArtSubjectView';
import TexnologiyaSubjectView from '@/components/dashboard/TexnologiyaSubjectView';
import InglizSubjectView from '@/components/dashboard/InglizSubjectView';
import Dashboard from '@/components/dashboard/Dashboard';
import G11SubjectView from '@/components/g11/G11SubjectView';
import { getG11Subject } from '@/content/g11/subjects';

/** Built grade-1 subject views. Subjects without a view are simply not linked
 *  from the dashboard or landing page (no "coming soon" stub route). */
export default async function SubjectViewPage({ params }: { params: Promise<{ subjectKey: string }> }) {
  const { subjectKey } = await params;
  // Grade 11: /dashboard/g11 = grade-11 dashboard, /dashboard/g11-<slug> = subject page
  if (subjectKey === 'g11') return <Dashboard forceGrade={11} />;
  if (subjectKey.startsWith('g11-')) {
    const slug = subjectKey.slice(4);
    if (getG11Subject(slug)) return <G11SubjectView slug={slug} />;
  }
  if (subjectKey === 'g1-alifbe') return <AlifbeSubjectView />;
  if (subjectKey === 'g1-informatika') return <InformatikaSubjectView />;
  if (subjectKey === 'g1-tarbiya') return <TarbiyaSubjectView />;
  if (subjectKey === 'g1-art') return <ArtSubjectView />;
  if (subjectKey === 'g1-tex') return <TexnologiyaSubjectView />;
  if (subjectKey === 'g1-ingliz') return <InglizSubjectView />;
  if (subjectKey === 'g1-math') return <SubjectView />;
  if (subjectKey === 'g1-ona') return <OnaSubjectView />;
  if (subjectKey === 'g1-fikr') return <FikrSubjectView />;
  if (subjectKey === 'g1-oqish') return <OqishSubjectView />;
  if (subjectKey === 'g1-tabiiy') return <TabiiySubjectView />;
  notFound();
}
