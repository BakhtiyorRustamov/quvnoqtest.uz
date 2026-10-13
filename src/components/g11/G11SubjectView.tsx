'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import ArrowBack from './ArrowBack';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11ExamHref } from '@/content/g11/subjects';
import { G11_DIAG_TITLE } from '@/content/g11/diagnostic';
import { G11_LESSONS, g11LessonHref } from '@/content/g11/lessons';

const LESSONS_TITLE: Record<string, string> = { uz: 'Mavzular boʻyicha', ru: 'По темам', en: 'By topic' };
const BACK: Record<string, string> = { uz: '11-sinf', ru: '11 класс', en: 'Grade 11' };

/** Minimal grade-11 subject page: subject name, the glowing pulsing
 *  "Testni boshlash" button right under it, then the lesson list. Lessons with
 *  content are links; the rest are title-only placeholders (not clickable yet). */
export default function G11SubjectView({ slug }: { slug: string }) {
  const locale = useLocale();
  const s = getG11Subject(slug);
  if (!s) return null;

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard/g11" showLang />
      <div className="max-w-2xl mx-auto px-4">
        <div className="mt-3 grid grid-cols-[48px_1fr_48px] items-center gap-2">
          <ArrowBack href="/dashboard/g11" label={BACK[locale] ?? BACK.uz} />
          <h1 className="text-center font-black text-ink text-[clamp(28px,8vw,48px)] leading-tight">{pick(s.name, locale)}</h1>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href={g11ExamHref(slug)}
            className="diag-btn rounded-full px-10 py-5 text-[clamp(22px,6vw,30px)] font-black text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
            style={{ ['--glow' as string]: s.color, background: `linear-gradient(180deg, ${s.color}, color-mix(in srgb, ${s.color} 78%, #000))` }}
          >
            {pick(G11_DIAG_TITLE, locale)}
          </Link>
        </div>

        <h2 className="font-black text-ink/70 text-lg mt-12 mb-3">📚 {LESSONS_TITLE[locale] ?? LESSONS_TITLE.uz}</h2>
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
              </>
            );
            const cls = 'card flex items-center gap-3 rounded-2xl px-3.5 py-3';
            return (
              <li key={l.n}>
                {l.body.length > 0 ? (
                  <Link
                    href={g11LessonHref(slug, l.n)}
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
