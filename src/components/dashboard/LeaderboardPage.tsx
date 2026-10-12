'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { LEADERBOARD, PREV_OLYMPIAD, USER_RANK } from '@/lib/leaderboardData';

const MEDAL = ['🥇', '🥈', '🥉'];
const PAGE = 30;

/** Placeholder row — names and scores are dashes until a real leaderboard
 *  backend exists. Ranks/medals still render so the layout reads as a board. */
function Row({ rank, me = false }: { rank: number; me?: boolean }) {
  return (
    <tr className={me ? 'bg-brand-blue/10 ring-2 ring-brand-blue/40' : rank % 2 === 0 ? 'bg-ink/[0.025]' : ''}>
      <td className="w-12 py-2.5 pl-4 text-center font-black text-ink/70">{rank <= 3 ? MEDAL[rank - 1] : rank}</td>
      <td className="py-2.5 px-2 font-extrabold text-ink/40">- - -</td>
      <td className="w-28 py-2.5 pr-4 text-right font-black text-ink/35 tabular-nums">- - -</td>
    </tr>
  );
}

export default function LeaderboardPage() {
  const t = useTranslations('dashboard');
  const [page, setPage] = useState(0); // 0,1,2 → up to 90 rows in 30s
  const shownCount = Math.min((page + 1) * PAGE, LEADERBOARD.length);
  const hasMore = shownCount < LEADERBOARD.length;

  // "your position" window: 5 ahead + you + 5 after (11 rows)
  const meIdx = USER_RANK - 1;
  const aroundStart = Math.max(0, meIdx - 5);
  const aroundCount = Math.min(LEADERBOARD.length, meIdx + 6) - aroundStart;

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="mx-auto max-w-2xl px-3">
        <h1 className="mt-4 text-2xl font-black text-ink sm:text-3xl">{t('leaderboardTitle')}</h1>

        {/* full ranking, paginated in 30s */}
        <div className="mt-4 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-ink/10 text-left text-[11px] font-black uppercase tracking-wide text-ink/45">
                <th className="py-2 pl-4">{t('lbRank')}</th>
                <th className="py-2 px-2">{t('lbStudent')}</th>
                <th className="py-2 pr-4 text-right">{t('lbScore')}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: shownCount }, (_, i) => (
                <Row key={i} rank={i + 1} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          {page > 0 && (
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="btn-ghost px-6 py-2.5">
              ← {t('lbPrev')}
            </button>
          )}
          {hasMore && (
            <button onClick={() => setPage((p) => p + 1)} className="btn-primary px-8 py-2.5">
              {t('lbNext')} →
            </button>
          )}
        </div>

        {/* your position — 5 ahead + you + 5 after */}
        <h2 className="mt-12 mb-3 text-xl font-black text-ink">{t('lbYourPosition')}</h2>
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <tbody>
              {Array.from({ length: aroundCount }, (_, i) => {
                const rank = aroundStart + i + 1;
                return <Row key={i} rank={rank} me={rank === USER_RANK} />;
              })}
            </tbody>
          </table>
        </div>

        {/* previous olympiad — top 10 */}
        <h2 className="mt-12 mb-3 text-xl font-black text-ink">{t('lbPrevOlympiad')}</h2>
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <tbody>
              {Array.from({ length: PREV_OLYMPIAD.length }, (_, i) => (
                <Row key={i} rank={i + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
