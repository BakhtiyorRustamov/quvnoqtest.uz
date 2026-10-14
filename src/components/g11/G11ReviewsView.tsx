'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11ExamHref, g11SubjectHref } from '@/content/g11/subjects';
import { buildG11Diagnostic, G11_DIAG_TITLE } from '@/content/g11/diagnostic';
import { getAttempts, useG11StoreVersion } from '@/lib/g11Store';
import { useSound } from '@/components/providers/SoundProvider';
import ReviewList from './ReviewList';
import ArrowBack from './ArrowBack';

const S: Record<string, Record<string, string>> = {
  uz: { title: 'Oldingi test tahlillari', empty: 'Hali test topshirilmagan. Birinchi testni ishlab koʻring!', score: 'Natija', back: 'Fan sahifasi', device: 'Natijalar shu qurilmada saqlanadi.' },
  ru: { title: 'Прошлые разборы тестов', empty: 'Тестов пока нет. Пройдите первый тест!', score: 'Результат', back: 'Страница предмета', device: 'Результаты хранятся на этом устройстве.' },
  en: { title: 'Past test reviews', empty: 'No tests yet. Take your first test!', score: 'Score', back: 'Subject page', device: 'Results are kept on this device.' }
};

function when(at: number) {
  const d = new Date(at);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} · ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** List of finished tests (newest first); tap one to open its full review. */
export default function G11ReviewsView({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = S[locale] ?? S.uz;
  const s = getG11Subject(slug);
  const { play } = useSound();
  const v = useG11StoreVersion();
  const attempts = v ? getAttempts(slug) : [];
  const questions = useMemo(() => buildG11Diagnostic(slug), [slug]);
  const [open, setOpen] = useState<number | null>(null);
  if (!s) return null;
  const subjectName = pick(s.name, locale);

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={g11SubjectHref(slug)} showLang title={subjectName} />
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="mt-5 font-black text-ink text-2xl">🗓️ {t.title}</h2>
        <p className="mt-1 text-[13px] font-bold text-ink/40">{t.device}</p>

        {v > 0 && attempts.length === 0 && (
          <div className="card mt-5 p-6 text-center">
            <p className="font-bold text-ink/60">{t.empty}</p>
            <Link href={g11ExamHref(slug)} onClick={() => play('win')} className="btn-primary mt-4 px-8 py-3">
              {pick(G11_DIAG_TITLE, locale)}
            </Link>
          </div>
        )}

        <ol className="mt-5 space-y-3">
          {attempts.map((a, i) => {
            const isOpen = open === i;
            return (
              <li key={a.at} className="card overflow-hidden">
                <button
                  onClick={() => {
                    play('pop');
                    setOpen(isOpen ? null : i);
                  }}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white font-black" style={{ background: s.color }}>
                    {attempts.length - i}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-extrabold text-ink">{when(a.at)}</span>
                    <span className="block text-[14px] font-bold text-ink/55">
                      {t.score}: <span className="text-brand-orange font-black">{a.score}/{a.total}</span>
                    </span>
                  </span>
                  <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 text-brand-blue transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-ink/10 bg-ink/[0.02] p-3">
                        <ReviewList slug={slug} questions={questions} answers={a.answers} subjectName={subjectName} locale={locale} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex justify-center">
          <ArrowBack href={g11SubjectHref(slug)} label={t.back} />
        </div>
      </div>
    </main>
  );
}
