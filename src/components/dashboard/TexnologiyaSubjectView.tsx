'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import CollapsibleGrid from './CollapsibleGrid';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { isBuiltTopic } from '@/content';
import { G1_TEX_TOPICS } from '@/content/g1-tex/topics';
import { pick } from '@/lib/i18n-config';
import VideoLightbox from '@/components/ui/VideoLightbox';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Texnologiya" (Technology / hands-on crafts) subject view. Navy theme.
 * Each lesson shows materials + steps for a craft, and the child marks it done
 * (optionally with a photo). NO audio, NO emojis — accents are inline SVG/glyphs.
 */
const NAVY = '#1E3A5F';

const IconTools = ({ c = NAVY }: { c?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5Z" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export default function TexnologiyaSubjectView() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, ensureUser } = useUser();
  const isPaid = user?.isPaid ?? false;
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => { ensureUser(1); }, [ensureUser]);
  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  // Real question count of a completed lesson (from stored answers) — short
  // lessons (e.g. 2 questions) must not display as x/10.
  const totalOf = (key: string) => progress.find((p) => p.topicKey === key)?.answers?.length || 10;
  const learned = G1_TEX_TOPICS.filter((tp) => completedKeys.has(tp.key));

  const renderEntry = (tp: (typeof G1_TEX_TOPICS)[number], i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    const built = isBuiltTopic(tp.key);
    const done = completedKeys.has(tp.key);
    if (built) {
      return (
        <motion.div key={tp.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
          <Link href={isPaid || tp.n === 1 ? `/lesson/${tp.key}` : '/upgrade'} className={`card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform${!isPaid && tp.n === 1 ? ' free-ring' : ''}`}>
            <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm" style={{ background: done ? 'var(--brand-green)' : NAVY }}>
              {done ? '✓' : tp.n}
            </span>
            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
            <span className="shrink-0 font-black" style={{ color: NAVY }} aria-hidden>{isPaid || tp.n === 1 ? '▶' : '🔒'}</span>
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.div
        key={tp.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        title={t('common.comingSoon')}
        aria-label={t('common.comingSoon')}
        className="card h-full flex items-center gap-2 px-3 py-2.5 opacity-70 cursor-default"
      >
        <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-ink/30">{tp.n}</span>
        <span className="flex-1 font-extrabold text-ink/70 text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
        <span className="shrink-0" aria-hidden><IconLock /></span>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS.texnologiya.name, locale)}
          </h1>
        </div>

        {/* learned list */}
        {learned.length > 0 && (
          <section className="mt-6">
            <h2 className="font-black text-ink/70 text-lg mb-2 flex items-center gap-2"><IconTools /> {t('dashboard.learnedTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {learned.map((tp) => (
                <Link
                  key={tp.key}
                  href={isPaid || tp.n === 1 ? `/lesson/${tp.key}` : '/upgrade'}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-extrabold text-ink transition-colors"
                  style={{ background: 'rgba(30,58,95,0.12)', border: '2px solid rgba(30,58,95,0.5)' }}
                  title={t('dashboard.replay')}
                >
                  <span aria-hidden style={{ color: '#2f9e54' }}>✓</span> {tp.n}. {pick(tp.title, locale)}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white border" style={{ color: NAVY, borderColor: 'rgba(30,58,95,0.3)' }}>
                    <span aria-hidden>★</span> {scoreOf(tp.key) ?? 0}/{totalOf(tp.key)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ------- Darslar ------- */}
        <section className="mt-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h2 className="font-black text-ink/70 text-lg">{t('dashboard.topicsTitle')}</h2>
            <VideoLightbox src="/videos/tex.mp4" poster="/videos/tex.jpg" label="" title={pick(SUBJECTS.texnologiya.name, locale)} />
          </div>
          <CollapsibleGrid>{G1_TEX_TOPICS.map((tp, i) => renderEntry(tp, i))}</CollapsibleGrid>
        </section>

      

      </div>

      <AIMascotButton />
    </main>
  );
}
