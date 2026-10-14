'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import PressButton3D from './PressButton3D';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11ExamHref, g11ReviewsHref } from '@/content/g11/subjects';
import { getFlags, useG11StoreVersion } from '@/lib/g11Store';
import { useSound } from '@/components/providers/SoundProvider';
import { G11_DIAG_TITLE } from '@/content/g11/diagnostic';
import { G11_LESSONS, g11LessonHref } from '@/content/g11/lessons';

const LESSONS_TITLE: Record<string, string> = { uz: 'Mavzular boʻyicha', ru: 'По темам', en: 'By topic' };
const REVISIT: Record<string, string> = { uz: 'Qayta koʻrib chiqish kerak', ru: 'Нужно повторить', en: 'Needs another look' };
const HISTORY: Record<string, string> = { uz: 'Oldingi test tahlillari', ru: 'Прошлые разборы тестов', en: 'Past test reviews' };

/** Minimal grade-11 subject page: subject name, the glowing pulsing
 *  "Testni boshlash" button right under it, then the lesson list. Lessons with
 *  content are links; the rest are title-only placeholders (not clickable yet). */
export default function G11SubjectView({ slug }: { slug: string }) {
  const locale = useLocale();
  const s = getG11Subject(slug);
  const { play } = useSound();
  const v = useG11StoreVersion();
  const flagged = new Set(v ? getFlags(slug) : []); // lessons to revisit after a test
  if (!s) return null;
  const revisit = REVISIT[locale] ?? REVISIT.uz;

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard/g11" showLang title={pick(s.name, locale)} />
      <div className="max-w-2xl mx-auto px-4">
        <div className="mt-8 flex justify-center">
          <PressButton3D href={g11ExamHref(slug)} color={s.color} onClick={() => play('win')}>
            {pick(G11_DIAG_TITLE, locale)}
          </PressButton3D>
        </div>

        <div className="mt-12 mb-3 flex items-center justify-between gap-3">
          <h2 className="font-black text-ink/70 text-lg">📚 {LESSONS_TITLE[locale] ?? LESSONS_TITLE.uz}</h2>
          <Link
            href={g11ReviewsHref(slug)}
            onClick={() => play('pop')}
            aria-label={HISTORY[locale] ?? HISTORY.uz}
            title={HISTORY[locale] ?? HISTORY.uz}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-card border border-ink/10 transition-transform hover:-translate-y-0.5"
          >
            🗓️
          </Link>
        </div>
        <ol className="grid gap-2.5">
          {G11_LESSONS.map((l) => {
            const inner = (
              <>
                <span
                  className="grid h-9 min-w-9 shrink-0 place-items-center rounded-xl px-2 text-sm font-black text-white"
                  style={{ background: s.color }}
                >
                  {l.n}
                </span>
                <span className="min-w-0 truncate font-extrabold text-ink">{pick(l.title, locale)}</span>
                {flagged.has(l.n) && (
                  <span
                    title={revisit}
                    aria-label={revisit}
                    role="img"
                    className="shrink-0 text-2xl font-black leading-none text-error"
                  >
                    !
                  </span>
                )}
              </>
            );
            const cls = 'card flex items-center gap-3 rounded-2xl px-3.5 py-3';
            return (
              <li key={l.n}>
                {l.body.length > 0 ? (
                  <Link
                    href={g11LessonHref(slug, l.n)}
                    onClick={() => play('pop')}
                    className={`${cls} transition-transform hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    {inner}
                  </Link>
                ) : (
                  // placeholder — looks like a button, does nothing yet
                  <div className={`${cls} cursor-default select-none`} aria-disabled="true">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
