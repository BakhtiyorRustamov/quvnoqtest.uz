import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getSubject } from '@/content/taxonomy';
import { pick } from '@/lib/i18n-config';
import BackBar from '@/components/ui/BackBar';

/** 🚧 stub subject page (SRS §7.3): mascot + localized "Coming soon" + Back/Dashboard. */
export default async function StubSubjectPage({
  params
}: {
  params: Promise<{ grade: string; subjectKey: string }>;
}) {
  const { grade, subjectKey } = await params;
  const gradeNum = Number(grade);
  const subject = getSubject(gradeNum, subjectKey);
  if (!subject) notFound();

  const t = await getTranslations('common');
  const locale = await getLocale();

  return (
    <main className="min-h-screen flex flex-col">
      <BackBar />
      <div className="flex-1 grid place-items-center px-4 pb-16">
        <div className="text-center max-w-md">
          <img
            src={`/mascots/${subject.key}.svg`}
            alt=""
            aria-hidden
            className="w-[170px] mx-auto animate-floaty"
            draggable={false}
          />
          <div
            className="inline-block mt-4 px-4 py-1.5 rounded-full text-white font-extrabold text-sm"
            style={{ background: subject.color }}
          >
            {t('grade', { n: gradeNum })} · {pick(subject.name, locale)}
          </div>
          <h1 className="font-black text-ink text-[clamp(26px,6vw,40px)] mt-3">{t('comingSoon')}</h1>
          <p className="font-bold text-ink/55 mt-2 leading-relaxed">{t('comingSoonBody')}</p>
        </div>
      </div>
    </main>
  );
}
