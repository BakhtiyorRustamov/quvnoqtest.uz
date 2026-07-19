'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { getGrade, GRADES, isUnlockedSubject, unlockedSubjectHref, progressSubjectKey } from '@/content/taxonomy';
import { pick } from '@/lib/i18n-config';
import { G1_MATH_TOPICS, G1_ONA_TOPICS, G1_ALIFBE_TOPICS, G1_INGLIZ_LESSONS } from '@/content';
import { G1_OQISH_LESSONS } from '@/content/g1-oqish/structure';
import { G1_INFORMATIKA_TOPICS } from '@/content/g1-informatika/topics';
import { G1_TARBIYA_TOPICS } from '@/content/g1-tarbiya/topics';
import { G1_ART_TOPICS } from '@/content/g1-art/topics';
import { G1_TEX_TOPICS } from '@/content/g1-tex/topics';
import { G1_TABIIY_TOPICS } from '@/content/g1-tabiiy/topics';
import { api } from '@/lib/client';
import type { ProgressRow } from '@/lib/store/types';
import LangSwitcher from '@/components/ui/LangSwitcher';
import AIMascotButton from '@/components/ui/AIMascotButton';
import AnimatedLogo from '@/components/landing/AnimatedLogo';
import ProfileDrawer from './ProfileDrawer';
import SubjectProgressCard from './SubjectProgressCard';
import DashboardStats from './DashboardStats';
import Leaderboard from './Leaderboard';
import OlympiadSection from './OlympiadSection';

/** Free + paid dashboard (SRS §6.3 / §6.4) — same layout, labels/locks differ. */
export default function Dashboard() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, ensureUser } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    ensureUser(1);
  }, [ensureUser]);

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

  const grade = user?.grade ?? 1;
  const gradeDef = getGrade(grade) ?? GRADES[0];

  return (
    <main className="min-h-screen pb-16">
      {/* collapsed-sidebar frame: a thin hairline down the left edge (hidden while
          the sidebar is open, when the drawer itself provides the edge) */}
      {!profileOpen && <div aria-hidden className="fixed left-0 top-0 bottom-0 z-30 w-[3px] bg-ink/12" />}

      {/* sidebar open/close handle — attached to the edge; slides to the drawer's
          right edge when open. ">" opens, "<" closes. */}
      <button
        onClick={() => setProfileOpen((o) => !o)}
        aria-label={t('dashboard.profile')}
        aria-expanded={profileOpen}
        style={{ left: profileOpen ? 'min(370px, 93vw)' : 0 }}
        className="fixed top-1/2 z-[55] grid h-16 w-7 -translate-y-1/2 place-items-center rounded-r-xl border border-l-0 border-ink/15 bg-white text-ink shadow-card transition-[left] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {profileOpen ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
        </svg>
      </button>

      {/* top bar — logo TRULY centred (absolute), language pinned right so its
          width can never nudge the logo off-centre. */}
      <header className="relative max-w-5xl mx-auto px-3 pt-4 h-14">
        <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
          {/* logo — a plain visual, not a link/button */}
          <div className="select-none" aria-label="QuvnoqTest.uz">
            <AnimatedLogo compact />
          </div>
        </div>
        <div className="absolute right-3 top-4">
          <LangSwitcher />
        </div>
      </header>

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-brand-green text-white font-extrabold shadow-xl">
          {toast}
        </div>
      )}

      {/* headline — hard requirement: 3rem, top-center (FR-DSH-1) */}
      <h1 className="text-center font-black text-ink mt-8 px-3 text-balance" style={{ fontSize: '3rem', lineHeight: 1.12 }}>
        {t('dashboard.headline')}
      </h1>

      {/* subject grid for the user's grade (FR-DSH-2) — glass progress cards */}
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

      {/* progress stats & charts (real /api/progress data) */}
      <DashboardStats progress={progress} grade={grade} subjects={gradeDef.subjects} name={user?.name ?? null} locale={locale} />

      {/* top students on the site — total learned lessons; links to full board */}
      <Leaderboard />

      {/* Quvnoq Olimpiada — big announcement + countdown (dummy, under results) */}
      <OlympiadSection locale={locale} />

      {/* parents' corner — a clear, prominent button */}
      <div className="max-w-4xl mx-auto px-3 mt-8 flex justify-center">
        <Link
          href="/parent"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-lg font-black text-white shadow-lg shadow-brand-blue/30 hover:-translate-y-0.5 active:translate-y-0 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
        >
          {pick(
            { uz: 'Ota-onalar sahifasi', ru: 'Страница для родителей', en: 'Parents’ page' },
            locale
          )}
        </Link>
      </div>

      {/* brand logo (bottom) */}
      <footer className="mt-14 flex flex-col items-center gap-1.5 px-3 pb-4 text-center">
        <Link href="/" aria-label="QuvnoqTest.uz" className="block w-[130px]">
          <AnimatedLogo />
        </Link>
        <span className="text-xs font-bold text-ink/40">© 2026 QuvnoqTest.uz</span>
      </footer>

      {/* AI assistant entry = the book mascot (tap → AI tutor / Upgrade) */}
      <AIMascotButton />

      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </main>
  );
}
