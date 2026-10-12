'use client';

import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';
import { getG11Lesson } from '@/content/g11/lessons';

const LESSON_N: Record<string, (n: number) => string> = {
  uz: (n) => `${n}-dars`,
  ru: (n) => `Урок ${n}`,
  en: (n) => `Lesson ${n}`
};

/** Grade 11 lesson reader (dummy Lorem Ipsum content for now). */
export default function G11LessonView({ slug, n }: { slug: string; n: number }) {
  const locale = useLocale();
  const s = getG11Subject(slug);
  const lesson = getG11Lesson(n);
  if (!s || !lesson) return null;
  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={g11SubjectHref(slug)} showLang />
      <article className="max-w-2xl mx-auto px-4">
        <div className="mt-4 inline-block rounded-full px-3.5 py-1 text-sm font-extrabold text-white" style={{ background: s.color }}>
          {pick(s.name, locale)} · {(LESSON_N[locale] ?? LESSON_N.uz)(n)}
        </div>
        <h1 className="mt-3 font-black text-ink text-[clamp(26px,7vw,40px)] leading-tight">{pick(lesson.title, locale)}</h1>
        <div className="card mt-6 p-5 sm:p-6 space-y-5">
          {lesson.body.map((p, i) => (
            <section key={i}>
              {p.heading && <h2 className="font-black text-ink text-xl mb-1.5">{pick(p.heading, locale)}</h2>}
              <p className="text-[16.5px] leading-relaxed font-semibold text-ink/80">{pick(p.text, locale)}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
