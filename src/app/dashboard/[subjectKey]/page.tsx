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
import { subjectMetadata, subjectJsonLd, breadcrumb, ldJson } from '@/lib/seo';
import type { Metadata } from 'next';

const G1_TITLES: Record<string, string> = {
  'g1-math': 'Matematika — 1-sinf onlayn darslari', 'g1-ona': 'Ona tili — 1-sinf onlayn darslari', 'g1-alifbe': 'Alifbe — 1-sinf harflar va oʻqish',
  'g1-oqish': 'Oʻqish savodxonligi — 1-sinf', 'g1-fikr': 'Fikrlash qobiliyati mashqlari — 1-sinf', 'g1-tabiiy': 'Tabiiy fanlar — 1-sinf',
  'g1-ingliz': 'Ingliz tili — 1-sinf', 'g1-informatika': 'Informatika — 1-sinf', 'g1-tarbiya': 'Tarbiya — 1-sinf', 'g1-art': 'Tasviriy sanʼat — 1-sinf',
  'g1-tex': 'Texnologiya — 1-sinf', 'g10-informatika': 'Informatika va AT — 10-sinf onlayn darslari', g11: 'Yuqori sinf (11-sinf) — barcha fanlar va Milliy sertifikat testlari'
};

export async function generateMetadata({ params }: { params: Promise<{ subjectKey: string }> }): Promise<Metadata> {
  const { subjectKey } = await params;
  if (subjectKey.startsWith('g11-')) return subjectMetadata(subjectKey.slice(4));
  const t = G1_TITLES[subjectKey];
  if (!t) return {};
  return {
    title: t,
    description: `${t}: qiziqarli test-darslar, oʻyinlar va mashqlar. MoviyDaftar.uz — Oʻzbekiston maktab oʻquvchilari uchun bepul onlayn darslar.`,
    alternates: { canonical: `/dashboard/${subjectKey}` }
  };
}

/** Built grade-1 subject views. Subjects without a view are simply not linked
 *  from the dashboard or landing page (no "coming soon" stub route). */
export default async function SubjectViewPage({ params }: { params: Promise<{ subjectKey: string }> }) {
  const { subjectKey } = await params;
  // Grade 11: /dashboard/g11 = grade-11 dashboard, /dashboard/g11-<slug> = subject page
  if (subjectKey === 'g11') return <Dashboard forceGrade={11} />;
  if (subjectKey.startsWith('g11-')) {
    const slug = subjectKey.slice(4);
    const s = getG11Subject(slug);
    if (s)
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={ldJson([subjectJsonLd(slug), breadcrumb([['Yuqori sinf', '/dashboard/g11'], [s.name.uz, `/dashboard/g11-${slug}`]])])} />
          <G11SubjectView slug={slug} />
        </>
      );
  }
  if (subjectKey === 'g10-informatika') return <G11SubjectView slug="informatika" grade={10} />;
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
