'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import PressButton3D from './PressButton3D';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11ExamHref } from '@/content/g11/subjects';
import { getFlags, useG11StoreVersion } from '@/lib/g11Store';
import { useSound } from '@/components/providers/SoundProvider';
import { G11_DIAG_TITLE } from '@/content/g11/diagnostic';
import { g11LessonsFor, g11LessonHref, g11LessonLabel, hasG11Content, type G11Lesson } from '@/content/g11/lessons';
import { useEffect, useState, type ReactNode } from 'react';

const LESSONS_TITLE: Record<string, string> = { uz: 'Mavzular boʻyicha', ru: 'По темам', en: 'By topic' };
/** Subjects whose lessons come from another grade's textbook: shown after the heading. */
const BOOK_GRADE: Record<string, Record<string, string>> = {
  geografiya: { uz: '10-sinf', ru: '10 класс', en: 'grade 10' }
};
const REVISIT: Record<string, string> = { uz: 'Qayta koʻrib chiqish kerak', ru: 'Нужно повторить', en: 'Needs another look' };
const PARTS: Record<string, Record<string, string>> = {
  algebra: { uz: 'Algebra va analiz asoslari', ru: 'Алгебра и начала анализа', en: 'Algebra and calculus' },
  geometriya: { uz: 'Geometriya', ru: 'Геометрия', en: 'Geometry' }
};
const QISM: Record<string, string> = { uz: '-qism', ru: '-я часть', en: ' · part' };
const HISTORY: Record<string, string> = { uz: 'Oldingi test tahlillari', ru: 'Прошлые разборы тестов', en: 'Past test reviews' };

/** Minimal grade-11 subject page: subject name, the glowing pulsing
 *  "Testni boshlash" button right under it, then the lesson list. Lessons with
 *  content are links; the rest are title-only placeholders (not clickable yet). */
/** note under the start button: every attempt is a freshly generated variant */
const REGEN: Record<string, string> = {
  uz: 'Har safar yangi variant tuziladi',
  ru: 'Каждый раз составляется новый вариант',
  en: 'A new variant is generated every time',
  kaa: 'Hár ret jańa variant dúziledi'
};
const PART: Record<number, Record<string, string>> = {
  10: { uz: '10-sinf qismi', ru: 'Часть 10 класса', en: 'Grade 10 part' },
  11: { uz: '11-sinf qismi', ru: 'Часть 11 класса', en: 'Grade 11 part' }
};

/** `grade={10}`: the grade-10 page of a two-grade textbook (Informatika) — only its part, no diagnostic test. */
export default function G11SubjectView({ slug, grade = 11 }: { slug: string; grade?: 10 | 11 }) {
  const locale = useLocale();
  const s = getG11Subject(slug);
  const { play } = useSound();
  const v = useG11StoreVersion();
  const flagged = new Set(v ? getFlags(slug) : []); // lessons to revisit after a test
  if (!s) return null;
  const revisit = REVISIT[locale] ?? REVISIT.uz;
  const lessons = g11LessonsFor(slug).filter((l) => grade === 11 || l.part === 10);

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={grade === 10 ? '/dashboard' : '/dashboard/g11'} showLang title={pick(s.name, locale)} />
      <div className="max-w-2xl mx-auto px-4">
        {grade === 11 && (
          <div className="mt-8 flex flex-col items-center">
            <PressButton3D href={g11ExamHref(slug)} color={s.color} onClick={() => play('win')}>
              {slug === 'qoraqalpoq-tili' ? 'Testti baslaw' : pick(G11_DIAG_TITLE, locale)}
            </PressButton3D>
            <p className="mt-3 text-center text-xs font-bold text-ink/50">
              {slug === 'qoraqalpoq-tili' ? REGEN.kaa : (REGEN[locale] ?? REGEN.uz)}
            </p>
          </div>
        )}

        <div className={`${grade === 11 ? 'mt-12' : 'mt-8'} mb-3 flex items-center justify-between gap-3`}>
          <h2 className="font-black text-ink/70 text-lg">📚 {LESSONS_TITLE[locale] ?? LESSONS_TITLE.uz}
            {BOOK_GRADE[slug] && <> ({BOOK_GRADE[slug][locale] ?? BOOK_GRADE[slug].uz})</>}
          </h2>
        </div>
        {groupLessons(lessons).map((g, gi) => {
          const items = g.lessons.map((l) => {
            const inner = (
              <>
                <span
                  className="grid h-9 min-w-9 shrink-0 place-items-center rounded-xl px-2 text-sm font-black text-white"
                  style={{ background: s.color }}
                >
                  {g11LessonLabel(l)}
                </span>
                <span className="min-w-0 flex-1 break-words font-extrabold leading-snug text-ink">{pick(l.title, locale)}</span>
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
              <li key={l.n} className="min-w-0">
                {hasG11Content(l) ? (
                  <Link
                    href={g11LessonHref(slug, l.n) + (grade === 10 ? '?g=10' : '')}
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
          });
          // subjects without textbook parts: a plain list
          if (!g.key) return <ol key="all" className="grid grid-cols-[minmax(0,1fr)] gap-2.5">{items}</ol>;
          const flaggedHere = g.lessons.some((l) => flagged.has(l.n));
          return (
            <PartDisclosure key={g.key} id={`${slug}:${g.key}`} defaultOpen={gi === 0}>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-black uppercase tracking-wide text-ink/45">
                  {g.group ? g.group.kicker : typeof g.part === 'number' ? pick(s.name, locale) : `${g.qism}${QISM[locale] ?? QISM.uz}`}
                </span>
                <span className="block font-black text-ink">
                  {g.group ? g.group.title : typeof g.part === 'number' ? (PART[g.part][locale] ?? PART[g.part].uz) : (PARTS[g.part!][locale] ?? PARTS[g.part!].uz)}
                </span>
              </span>
              {flaggedHere && <span className="text-2xl font-black leading-none text-error" title={revisit}>!</span>}
              <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-xs font-black text-ink/60">{g.lessons.length}</span>
              <ol className="grid grid-cols-[minmax(0,1fr)] gap-2.5 px-1 pb-1 pt-3">{items}</ol>
            </PartDisclosure>
          );
        })}
      </div>
    </main>
  );
}

type LessonGroup = {
  key: string;
  qism?: number;
  part?: 'algebra' | 'geometriya' | 10 | 11;
  group?: { kicker: string; title: string };
  lessons: G11Lesson[];
};

/** Consecutive lessons of the same chapter (fizika) or textbook volume + part (matematika) form one group. */
function groupLessons(list: G11Lesson[]): LessonGroup[] {
  const out: LessonGroup[] = [];
  for (const l of list) {
    const key = l.group ? `bob-${l.group.kicker}` : l.part ? `${l.qism ?? 1}-${l.part}` : '';
    const last = out[out.length - 1];
    if (last && last.key === key) last.lessons.push(l);
    else out.push({ key, qism: l.qism ?? 1, part: l.part, group: l.group, lessons: [l] });
  }
  return out;
}

/**
 * A collapsible textbook part ("1-qism · Algebra va analiz asoslari"). The first
 * child is the header row, the last one the lesson list. Open/closed is
 * remembered per browser (best effort).
 */
function PartDisclosure({ id, defaultOpen, children }: { id: string; defaultOpen: boolean; children: ReactNode[] }) {
  const storeKey = `g11-part-open:${id}`;
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    try {
      const v = localStorage.getItem(storeKey);
      if (v !== null) setOpen(v === '1');
    } catch {
      /* storage unavailable */
    }
  }, [storeKey]);
  const toggle = () => {
    setOpen((o) => {
      try {
        localStorage.setItem(storeKey, o ? '0' : '1');
      } catch {
        /* storage unavailable */
      }
      return !o;
    });
  };
  const list = children[children.length - 1];
  const head = children.slice(0, -1);
  return (
    <section className="mb-3 rounded-3xl border border-ink/10 bg-white/60 p-2 shadow-card">
      <button type="button" onClick={toggle} aria-expanded={open} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left">
        {head}
        <span className={`shrink-0 text-xl font-black text-ink/50 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
          ⌄
        </span>
      </button>
      {open && list}
    </section>
  );
}
