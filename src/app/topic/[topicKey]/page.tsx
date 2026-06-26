import { notFound, redirect } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getTopic, isBuiltTopic } from '@/content';
import { getStore, isPaid } from '@/lib/store';
import { pick } from '@/lib/i18n-config';
import BackBar from '@/components/ui/BackBar';
import Mascot from '@/components/ui/Mascot';

export const dynamic = 'force-dynamic';

/**
 * The 40 dummy topic pages (FR-PDSH-3): real topic title + "Coming soon" body.
 * Paid-only — free users are sent to Upgrade (server-side gate).
 */
export default async function DummyTopicPage({ params }: { params: Promise<{ topicKey: string }> }) {
  const { topicKey } = await params;
  const topic = getTopic(topicKey);
  if (!topic) notFound();
  if (isBuiltTopic(topicKey)) redirect(`/lesson/${topicKey}`);

  const user = await getStore().getCurrent();
  if (!isPaid(user)) redirect('/upgrade');

  const t = await getTranslations('common');
  const locale = await getLocale();

  return (
    <main className="min-h-screen flex flex-col">
      <BackBar backHref="/dashboard/g1-math" showLang />
      <div className="flex-1 grid place-items-center px-4 pb-16">
        <div className="card max-w-lg w-full p-7 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-blue" />
          <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-extrabold text-xs">
            Matematika · {t('grade', { n: 1 })}
          </span>
          <h1 className="font-black text-ink text-[clamp(22px,5vw,32px)] mt-3 leading-tight">
            {topic.n}. {pick(topic.title, locale)}
          </h1>
          <div className="text-5xl mt-5" aria-hidden>
            🚧
          </div>
          <h2 className="font-black text-ink/80 text-xl mt-2">{t('comingSoon')}</h2>
          <p className="font-bold text-ink/55 mt-2">{t('comingSoonBody')}</p>
        </div>
      </div>
      <Mascot subjectKey="matematika" corner />
    </main>
  );
}
