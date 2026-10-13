'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import ArrowBack from './ArrowBack';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';
import { getG11Lesson, type G11LessonQuiz } from '@/content/g11/lessons';

const S: Record<string, Record<string, string>> = {
  uz: { lesson: '-dars', back: 'Mavzularga qaytish', quiz: 'Oʻzingizni tekshiring', check: 'Tekshirish', right: 'Toʻgʻri!', wrong: 'Notoʻgʻri', correct: 'Toʻgʻri javob', retry: 'Qayta urinish', score: 'Natija' },
  ru: { lesson: '', back: 'Назад к темам', quiz: 'Проверь себя', check: 'Проверить', right: 'Верно!', wrong: 'Неверно', correct: 'Верный ответ', retry: 'Ещё раз', score: 'Результат' },
  en: { lesson: '', back: 'Back to topics', quiz: 'Check yourself', check: 'Check', right: 'Correct!', wrong: 'Not quite', correct: 'Correct answer', retry: 'Try again', score: 'Score' }
};

/** Grade 11 lesson reader (dummy Lorem Ipsum content) with an end-of-lesson
 *  quiz and a visible in-page back button (Telegram hides the top bar one). */
export default function G11LessonView({ slug, n }: { slug: string; n: number }) {
  const locale = useLocale();
  const t = S[locale] ?? S.uz;
  const s = getG11Subject(slug);
  const lesson = getG11Lesson(n);
  if (!s || !lesson) return null;
  const backHref = g11SubjectHref(slug);

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={backHref} showLang />
      <article className="max-w-2xl mx-auto px-4">
        <ArrowBack href={backHref} label={t.back} className="mt-2" />
        <div className="mt-4 inline-block rounded-full px-3.5 py-1 text-sm font-extrabold text-white" style={{ background: s.color }}>
          {pick(s.name, locale)}
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

        {lesson.quiz.length > 0 && <LessonQuiz quiz={lesson.quiz} locale={locale} color={s.color} t={t} />}

        <div className="mt-10 flex justify-center">
          <ArrowBack href={backHref} label={t.back} />
        </div>
      </article>
    </main>
  );
}

function LessonQuiz({ quiz, locale, color, t }: { quiz: G11LessonQuiz[]; locale: string; color: string; t: Record<string, string> }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => quiz.map(() => null));
  const [checked, setChecked] = useState(false);
  const score = quiz.filter((q, i) => picked[i] === q.answerIndex).length;
  const allPicked = picked.every((p) => p !== null);

  return (
    <section className="mt-10">
      <h2 className="font-black text-ink text-2xl mb-3">✍️ {t.quiz}</h2>
      <ol className="space-y-4">
        {quiz.map((q, qi) => {
          const ok = picked[qi] === q.answerIndex;
          return (
            <li key={qi} className="card p-4 sm:p-5">
              <p className="font-black text-ink text-lg leading-snug">
                <span style={{ color }}>{qi + 1}.</span> {pick(q.prompt, locale)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {q.choices.map((c, ci) => {
                  const sel = picked[qi] === ci;
                  const isAns = ci === q.answerIndex;
                  const tone = !checked
                    ? sel ? 'ring-4 ring-brand-blue bg-brand-blue/10' : ''
                    : isAns ? 'ring-4 ring-brand-green bg-brand-green/10' : sel ? 'ring-4 ring-error bg-error/10' : 'opacity-60';
                  return (
                    <button
                      key={ci}
                      disabled={checked}
                      onClick={() => setPicked((p) => p.map((v, i) => (i === qi ? ci : v)))}
                      className={`rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left font-extrabold text-ink transition ${tone}`}
                    >
                      <span className="mr-1.5 font-black text-ink/50">{String.fromCharCode(65 + ci)})</span>
                      {pick(c, locale)}
                    </button>
                  );
                })}
              </div>
              {checked && (
                <div className={`mt-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold ${ok ? 'bg-brand-green/10 text-ink' : 'bg-error/10 text-ink'}`}>
                  <span className={`font-black ${ok ? 'text-brand-green' : 'text-error'}`}>{ok ? t.right : t.wrong}</span>{' '}
                  {!ok && (
                    <>
                      {t.correct}: <b>{pick(q.choices[q.answerIndex], locale)}</b>.{' '}
                    </>
                  )}
                  {pick(q.explanation, locale)}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {!checked ? (
          <button onClick={() => setChecked(true)} disabled={!allPicked} className="btn-primary px-10 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
            ✓ {t.check}
          </button>
        ) : (
          <>
            <span className="rounded-full bg-white px-5 py-2.5 font-black text-ink shadow-card border border-ink/10">
              {t.score}: <span className="text-brand-orange">{score}/{quiz.length}</span>
            </span>
            <button
              onClick={() => {
                setPicked(quiz.map(() => null));
                setChecked(false);
              }}
              className="btn-ghost px-6 py-2.5"
            >
              🔄 {t.retry}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
