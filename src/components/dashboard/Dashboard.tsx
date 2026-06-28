'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { getGrade, GRADES, isUnlockedSubject, progressSubjectKey } from '@/content/taxonomy';
import { G1_MATH_TOPICS } from '@/content';
import { api } from '@/lib/client';
import type { ProgressRow } from '@/lib/store/types';
import LangSwitcher from '@/components/ui/LangSwitcher';
import MuteToggle from '@/components/ui/MuteToggle';
import AIMascotButton from '@/components/ui/AIMascotButton';
import AnimatedLogo from '@/components/landing/AnimatedLogo';
import ProfileDrawer from './ProfileDrawer';
import SubjectProgressCard from './SubjectProgressCard';
import DashboardStats from './DashboardStats';

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
      {/* brand logo (top) */}
      <div className="flex justify-center pt-4">
        <Link href="/" aria-label="QuvnoqTest.uz" className="block w-[140px] sm:w-[160px]">
          <AnimatedLogo />
        </Link>
      </div>

      {/* top bar: profile (left) · language (right); AI entry lives on the mascot */}
      <header className="flex items-center justify-between gap-2 max-w-5xl mx-auto px-3 pt-3 flex-wrap">
        <button
          onClick={() => setProfileOpen(true)}
          className="rounded-2xl bg-white/90 border-2 border-ink/15 shadow-card px-4 py-1.5 flex flex-col items-center leading-tight"
          aria-label={t('dashboard.profile')}
        >
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-ink/55">
            {t('dashboard.profile')}
          </span>
          <span className="font-medium text-base text-ink">{user?.publicId ?? '…'}</span>
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <LangSwitcher />
          <MuteToggle />
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
          const href = unlocked ? '/dashboard/g1-math' : `/subject/${grade}/${s.key}`;
          const pk = progressSubjectKey(grade, s.key);
          const total = pk === 'g1-math' ? G1_MATH_TOPICS.length : 0;
          const learned = progress.filter((p) => p.subjectKey === pk && p.status === 'completed').length;
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
