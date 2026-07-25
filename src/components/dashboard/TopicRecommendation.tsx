'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getTopic, isBuiltTopic } from '@/content';
import { pick } from '@/lib/i18n-config';
import type { TopicMeta } from '@/content/types';
import type { ProgressRow } from '@/lib/store/types';

/** Score (out of 10) at or below which a finished topic is suggested for review. */
const REVIEW_THRESHOLD = 6;
const MAX_TOPICS = 4;

/** Orange of the TopicAdvise art's left panel — used for the text scrim so the
 *  overlaid copy always sits on a seamless solid band. */
const PANEL = '#f4a023';

/**
 * Personalized "Focused review" recommendation. Lives inside the subject view,
 * just under the Lessons grid. Greets the child by name and nudges them to
 * practise the topics where they scored low, plus a subscribe CTA. The copy is
 * overlaid on the left side of the TopicAdvise artwork.
 */
export default function TopicRecommendation({
  progress,
  name,
  isPaid,
  locale,
  subjectName = 'Matematika',
  getTopicMeta = getTopic,
  startHref = '/lesson/g1-math-01'
}: {
  progress: ProgressRow[];
  name: string | null;
  isPaid: boolean;
  locale: string;
  /** localized subject name shown in the greeting (e.g. "Matematika"). */
  subjectName?: string;
  /** topic-meta lookup for this subject (defaults to grade-1 maths). */
  getTopicMeta?: (key: string) => TopicMeta | undefined;
  /** where the "start" CTA points when nothing is completed yet. */
  startHref?: string;
}) {
  const t = useTranslations('dashboard.topicReco');
  const displayName = name || t('friend');

  const completed = progress.filter((p) => p.status === 'completed');
  const lowScore = completed
    // Ratio-based threshold so short lessons (e.g. 2 questions) aren't flagged:
    // a perfect 2/2 must not read as a "low" score against an assumed 10.
    .filter((p) => {
      if (typeof p.score !== 'number' || !isBuiltTopic(p.topicKey)) return false;
      const total = p.answers?.length || 10;
      return p.score / total <= REVIEW_THRESHOLD / 10;
    })
    .map((p) => {
      const meta = getTopicMeta(p.topicKey);
      const total = p.answers?.length || 10;
      return meta ? { key: p.topicKey, n: meta.n, title: pick(meta.title, locale), score: p.score ?? 0, total } : null;
    })
    .filter((x): x is { key: string; n: number; title: string; score: number; total: number } => x !== null)
    .sort((a, b) => a.score / a.total - b.score / b.total)
    .slice(0, MAX_TOPICS);

  const hasStarted = completed.length > 0;
  const greeting = !hasStarted
    ? t('greetStart', { name: displayName, subject: subjectName })
    : lowScore.length > 0
      ? t('greetLow', { name: displayName, subject: subjectName })
      : t('greetAllGood', { name: displayName, subject: subjectName });

  return (
    <section className="mt-8">
      <div
        className="relative overflow-hidden rounded-3xl border border-ink/10 shadow-card"
        style={{ backgroundColor: PANEL }}
      >
        {/* artwork (backpack + tools sit on the right; orange panel on the left) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/topic-advise.jpg"
          alt=""
          aria-hidden
          draggable={false}
          loading="lazy"
          className="absolute inset-0 h-full w-full select-none object-cover object-right"
        />
        {/* left scrim → keeps the copy on a seamless orange band at any width */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${PANEL} 0%, ${PANEL} 40%, rgba(244,160,35,0.85) 55%, rgba(244,160,35,0) 74%)`
          }}
        />

        {/* overlaid copy — left side */}
        <div className="relative p-5 sm:p-7 max-w-[80%] sm:max-w-[58%]">
          <h2 className="text-2xl font-black leading-tight text-ink sm:text-3xl">{t('title')}</h2>
          <p className="mt-2 font-bold leading-relaxed text-ink/85">{greeting}</p>

          {lowScore.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {lowScore.map((tp, i) => (
                <motion.div
                  key={tp.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                >
                  <Link
                    href={`/lesson/${tp.key}`}
                    title={t('reviewCta')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-2.5 py-1.5 font-extrabold text-ink shadow-sm ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-orange text-xs font-black text-white">
                      {tp.n}
                    </span>
                    <span className="text-[12.5px] leading-snug">{tp.title}</span>
                    <span className="shrink-0 text-xs font-black text-brand-magenta">⭐{tp.score}/{tp.total}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {!hasStarted && (
              <Link href={startHref} className="rounded-full bg-ink px-5 py-2.5 text-sm font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
                🚀 {t('startCta')}
              </Link>
            )}
            {hasStarted && lowScore.length > 0 && (
              <Link href={`/lesson/${lowScore[0].key}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
                ✏️ {t('startReview')}
              </Link>
            )}
            {!isPaid ? (
              <Link href="/upgrade" className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-ink shadow-md ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5">
                ⭐ {t('subscribeCta')}
              </Link>
            ) : (
              <span className="text-xs font-bold text-ink/70">{t('subscribeNotePaid')}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
