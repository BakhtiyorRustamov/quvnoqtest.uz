'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { getGrade, GRADES, isUnlockedSubject, unlockedSubjectHref, progressSubjectKey } from '@/content/taxonomy';
import { G1_MATH_TOPICS, G1_ONA_TOPICS, G1_ALIFBE_TOPICS, G1_INGLIZ_LESSONS } from '@/content';
import { G1_OQISH_LESSONS } from '@/content/g1-oqish/structure';
import { G1_INFORMATIKA_TOPICS } from '@/content/g1-informatika/topics';
import { G1_TARBIYA_TOPICS } from '@/content/g1-tarbiya/topics';
import { G1_ART_TOPICS } from '@/content/g1-art/topics';
import { G1_TEX_TOPICS } from '@/content/g1-tex/topics';
import { G1_TABIIY_TOPICS } from '@/content/g1-tabiiy/topics';
import { api } from '@/lib/client';
import type { ProgressRow } from '@/lib/store/types';
import AIMascotButton from '@/components/ui/AIMascotButton';
import MoviyDaftarLogo from '@/components/brand/MoviyDaftarLogo';
import SubjectProgressCard from './SubjectProgressCard';
import G11SubjectTile from './G11SubjectTile';
import { G11_SUBJECTS } from '@/content/g11/subjects';

/** Free + paid dashboard (SRS §6.3 / §6.4) — same layout, labels/locks differ. */
export default function Dashboard({ forceGrade }: { forceGrade?: number } = {}) {
  const t = useTranslations();
  const locale = useLocale();
  const { user, loading, ensureUser } = useUser();
  const [toast, setToast] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    ensureUser(forceGrade ?? 1);
  }, [ensureUser, forceGrade]);

  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  // magic-link claim toast
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('claimed') === '1') {
      setToast(t('dashboard.claimed'));
      window.history.replaceState(null, '', '/dashboard');
      const id = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(id);
    }
  }, [t]);

  const grade = forceGrade ?? user?.grade ?? 1;

  // hidden: 5 quick taps on the logo open the Telegram / haptics test panel
  const taps = useRef<number[]>([]);
  function logoTap() {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 3000), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      window.dispatchEvent(new Event('qt-tgdiag'));
    }
  }
  const gradeDef = getGrade(grade) ?? GRADES[0];

  return (
    <main className="min-h-screen pb-16">
      {/* top bar — logo TRULY centred (absolute), language pinned right so its
          width can never nudge the logo off-centre. */}
      <header className="relative max-w-5xl mx-auto px-3 pt-4 h-14">
        <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
          {/* logo — a plain visual, not a link/button */}
          <div className="pointer-events-auto select-none" aria-label="MoviyDaftar.uz" onClick={logoTap}>
            <MoviyDaftarLogo size="sm" />
          </div>
        </div>
      </header>

      {toast && (
        <div style={{ top: 'calc(var(--app-top) + 1rem)' }} className="fixed left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-brand-green text-white font-extrabold shadow-xl">
          {toast}
        </div>
      )}

      {/* headline — hard requirement: 3rem, top-center (FR-DSH-1) */}
      <h1 className="text-center font-black text-ink mt-8 px-3 text-balance" style={{ fontSize: '3rem', lineHeight: 1.12 }}>
        {t('dashboard.headline')}
      </h1>

      {/* until the account is loaded we don't know the grade — show neutral
          placeholders instead of flashing the grade-1 subjects */}
      {!forceGrade && loading && !user ? (
        <section aria-hidden className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 px-3">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="h-[96px] animate-pulse rounded-2xl bg-ink/[0.06]" />
          ))}
        </section>
      ) : grade === 11 ? (
        <section className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 px-3">
          {G11_SUBJECTS.map((s, i) => (
            <G11SubjectTile key={s.slug} s={s} locale={locale} index={i} />
          ))}
        </section>
      ) : (
      /* subject grid for the user's grade (FR-DSH-2) — glass progress cards */
      <section className="max-w-4xl mx-auto px-3 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {gradeDef.subjects.map((s, i) => {
          const unlocked = isUnlockedSubject(grade, s.key);
          // locked subjects have no page yet — the card renders unclickable
          const href = (unlocked && unlockedSubjectHref(grade, s.key)) || '';
          const pk = progressSubjectKey(grade, s.key);
          // Fikrlash is a practice area: the card shows best test score out of 10
          // instead of learned/total lessons.
          const total =
            pk === 'g1-alifbe' ? G1_ALIFBE_TOPICS.length
            : pk === 'g1-math' ? G1_MATH_TOPICS.length
            : pk === 'g1-ona' ? G1_ONA_TOPICS.length
            : pk === 'g1-oqish' ? G1_OQISH_LESSONS.length
            : pk === 'g1-ingliz' ? G1_INGLIZ_LESSONS.length
            : pk === 'g1-informatika' ? G1_INFORMATIKA_TOPICS.length
            : pk === 'g1-tarbiya' ? G1_TARBIYA_TOPICS.length
            : pk === 'g1-art' ? G1_ART_TOPICS.length
            : pk === 'g1-tex' ? G1_TEX_TOPICS.length
            : pk === 'g1-tabiiy' ? G1_TABIIY_TOPICS.length
            : pk === 'g1-fikr' ? 10
            : 0;
          const learned =
            pk === 'g1-fikr'
              ? progress.filter((p) => p.subjectKey === pk).reduce((m, p) => Math.max(m, p.score ?? 0), 0)
              : progress.filter((p) => p.subjectKey === pk && p.status === 'completed').length;
          return (
            <SubjectProgressCard
              key={s.key}
              s={s}
              locale={locale}
              href={href}
              learned={learned}
              total={total}
              unlocked={unlocked}
              index={i}
              soonLabel={t('dashboard.stats.soon')}
            />
          );
        })}
      </section>
      )}

      {/* brand logo (bottom) */}
      <footer className="mt-14 flex flex-col items-center gap-1.5 px-3 pb-4 text-center">
        <Link href="/" aria-label="MoviyDaftar.uz" className="block opacity-80 hover:opacity-100">
          <MoviyDaftarLogo size="sm" />
        </Link>
        <span className="text-[11px] font-bold text-ink/35">© 2026 MoviyDaftar.uz</span>
      </footer>

      {/* AI assistant entry = the book mascot (tap → AI tutor / Upgrade) */}
      <AIMascotButton />

    </main>
  );
}
