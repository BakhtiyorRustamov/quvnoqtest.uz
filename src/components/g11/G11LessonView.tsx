'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import LessonSocial from './LessonSocial';
import QuestionSketchpad from './QuestionSketchpad';
import ScratchNotebook from './ScratchNotebook';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticNotify, hapticSelect } from '@/lib/tg';
import { clearFlag } from '@/lib/g11Store';
import ArrowBack from './ArrowBack';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref, g10InformatikaHref } from '@/content/g11/subjects';
import { getBoardLesson, getG11Lesson, g11LessonLabel, type G11LessonQuiz } from '@/content/g11/lessons';
import G11BoardPlayer from './G11BoardPlayer';
import G11Practice from './G11Practice';
import { lessonUi } from '@/content/g11/lessonUi';

const S: Record<string, Record<string, string>> = {
  uz: { lesson: '-dars', geo: 'Geometriya', practice: 'Masalalar', revisionNote: 'Bu dars — mavzular boʻyicha aralash mashqlar. Bilganlaringizni sinab koʻring!', back: 'Mavzularga qaytish', quiz: 'Oʻzingizni tekshiring', check: 'Tekshirish', right: 'Toʻgʻri!', wrong: 'Notoʻgʻri', correct: 'Toʻgʻri javob', retry: 'Qayta urinish', score: 'Natija' },
  ru: { lesson: '', geo: 'Геометрия', practice: 'Задачи', revisionNote: 'Этот урок — смешанные задачи по темам. Проверьте себя!', back: 'Назад к темам', quiz: 'Проверь себя', check: 'Проверить', right: 'Верно!', wrong: 'Неверно', correct: 'Верный ответ', retry: 'Ещё раз', score: 'Результат' },
  en: { lesson: '', geo: 'Geometry', practice: 'Practice', revisionNote: 'This lesson is mixed practice across the topics. Test yourself!', back: 'Back to topics', quiz: 'Check yourself', check: 'Check', right: 'Correct!', wrong: 'Not quite', correct: 'Correct answer', retry: 'Try again', score: 'Score' }
};

/** Grade 11 lesson reader (dummy Lorem Ipsum content) with an end-of-lesson
 *  quiz and a visible in-page back button (Telegram hides the top bar one). */
export default function G11LessonView({ slug, n, grade = 11 }: { slug: string; n: number; grade?: 10 | 11 }) {
  const locale = useLocale();
  const t = S[locale] ?? S.uz;
  const s = getG11Subject(slug);
  const lesson = getG11Lesson(n, slug);
  const board = getBoardLesson(slug, n);
  // the practice questions open only after the lesson's final picture
  const [quizOpen, setQuizOpen] = useState(false);
  const quizRef = useRef<HTMLElement | null>(null);
  const pageRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (quizOpen) quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [quizOpen]);
  // opening the lesson counts as reviewing it: its "!" mark goes away
  useEffect(() => {
    clearFlag(slug, n);
  }, [slug, n]);
  if (!s || !lesson) return null;
  const backHref = grade === 10 && slug === 'informatika' ? g10InformatikaHref : g11SubjectHref(slug);

  if (board) {
    const lui = board.lang && board.lang !== 'uz' ? lessonUi(board.lang) : null;
    const head = lui ? lui.lessonN(g11LessonLabel(board)) : `${board.part === 'geometriya' ? `${t.geo} · ` : ''}${g11LessonLabel(board)}${t.lesson}`;
    const quizTitle = lui ? lui.quiz : t.quiz;
    const backLabel = lui ? lui.backToTopics : t.back;
    // revision lessons: the questions straight away, no board
    if (board.revision || !board.steps.length) {
      return (
        <main ref={pageRef} className="relative min-h-screen pb-16">
          <BackBar backHref={backHref} subtle title={pick(s.name, locale)} />
          <article className="mx-auto max-w-3xl px-4">
            <p className="mt-4 text-[12px] font-extrabold uppercase tracking-wide text-ink/40">{head}</p>
            <h2 className="font-black leading-tight text-ink text-[clamp(22px,6vw,34px)]">{board.title}</h2>
            <p className="mt-2 font-semibold text-ink/60">{board.lang === 'kaa' ? 'Bul sabaq — temalar boyınsha aralas shınıǵıwlar. Bilimińizdi sınap kóriń!' : t.revisionNote}</p>
            <section className="mt-6">
              <G11Practice questions={board.questions} color={s.color} locale={locale} lang={board.lang} />
              <ScratchNotebook />
            </section>
            <LessonSocial page={`g11/${slug}/${n}`} title={board.title} />
            <div className="mt-10 flex justify-center">
              <ArrowBack href={backHref} label={backLabel} />
            </div>
          </article>
          <QuestionSketchpad containerRef={pageRef} pageKey={`${slug}-${n}`} locale={locale} />
      </main>
      );
    }
    return (
      <main ref={pageRef} className="relative min-h-screen pb-16">
        <BackBar backHref={backHref} subtle title={pick(s.name, locale)} />
        <article className="mx-auto max-w-3xl px-4">
          <p className="mt-4 text-[12px] font-extrabold uppercase tracking-wide text-ink/40">{head}</p>
          <h2 className="font-black leading-tight text-ink text-[clamp(22px,6vw,34px)]">{board.title}</h2>
          <G11BoardPlayer
            lesson={board}
            slug={slug}
            color={s.color}
            onQuiz={() => {
              if (quizOpen) quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setQuizOpen(true);
            }}
          />
          {quizOpen && (
            <section ref={quizRef} className="mt-10 scroll-mt-4">
              <h2 className="mb-3 text-2xl font-black text-ink">✍️ {quizTitle}</h2>
              <G11Practice questions={board.questions} color={s.color} locale={locale} lang={board.lang} />
              <ScratchNotebook />
            </section>
          )}
          <LessonSocial page={`g11/${slug}/${n}`} title={board.title} />
          <div className="mt-10 flex justify-center">
            <ArrowBack href={backHref} label={backLabel} />
          </div>
        </article>
        <QuestionSketchpad containerRef={pageRef} pageKey={`${slug}-${n}`} locale={locale} />
      </main>
    );
  }

  return (
    <main ref={pageRef} className="relative min-h-screen pb-16">
      <BackBar backHref={backHref} subtle title={pick(s.name, locale)} />
      <article className="max-w-2xl mx-auto px-4">
        <h2 className="mt-5 font-black text-ink text-[clamp(26px,7vw,40px)] leading-tight">{pick(lesson.title, locale)}</h2>
        <div className="card mt-6 p-5 sm:p-6 space-y-5">
          {lesson.body.map((p, i) => (
            <section key={i}>
              {p.heading && <h2 className="font-black text-ink text-xl mb-1.5">{pick(p.heading, locale)}</h2>}
              <p className="text-[16.5px] leading-relaxed font-semibold text-ink/80">{pick(p.text, locale)}</p>
            </section>
          ))}
        </div>

        {lesson.quiz.length > 0 && <LessonQuiz quiz={lesson.quiz} locale={locale} color={s.color} t={t} />}
        {lesson.quiz.length > 0 && <ScratchNotebook />}

        <LessonSocial page={`g11/${slug}/${n}`} title={pick(lesson.title, locale)} />
        <div className="mt-10 flex justify-center">
          <ArrowBack href={backHref} label={t.back} />
        </div>
      </article>
      <QuestionSketchpad containerRef={pageRef} pageKey={`${slug}-${n}`} locale={locale} />
    </main>
  );
}

function LessonQuiz({ quiz, locale, color, t }: { quiz: G11LessonQuiz[]; locale: string; color: string; t: Record<string, string> }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => quiz.map(() => null));
  const [checked, setChecked] = useState(false);
  const { play } = useSound();
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
                      onClick={() => {
                        play('click');
                        hapticSelect();
                        setPicked((p) => p.map((v, i) => (i === qi ? ci : v)));
                      }}
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
          <button
            onClick={() => {
              setChecked(true);
              const good = score === quiz.length;
              play(good ? 'win' : score >= quiz.length / 2 ? 'correct' : 'wrong');
              hapticNotify(good || score >= quiz.length / 2 ? 'success' : 'error');
            }}
            disabled={!allPicked} className="btn-primary px-10 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
            ✓ {t.check}
          </button>
        ) : (
          <>
            <span className="rounded-full bg-white px-5 py-2.5 font-black text-ink shadow-card border border-ink/10">
              {t.score}: <span className="text-brand-orange">{score}/{quiz.length}</span>
            </span>
            <button
              onClick={() => {
                play('pop');
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
