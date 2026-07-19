'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { LEADERBOARD, PREV_OLYMPIAD, TOTAL_LESSONS, USER_RANK } from '@/lib/leaderboardData';

const MEDAL = ['🥇', '🥈', '🥉'];
const PAGE = 30;

function Row({ rank, name, score, denom, me = false }: { rank: number; name: string; score: number; denom?: number; me?: boolean }) {
  return (
    <tr className={me ? 'bg-brand-blue/10 ring-2 ring-brand-blue/40' : rank % 2 === 0 ? 'bg-ink/[0.025]' : ''}>
      <td className="w-12 py-2.5 pl-4 text-center font-black text-ink/70">{rank <= 3 ? MEDAL[rank - 1] : rank}</td>
      <td className="py-2.5 px-2 font-extrabold text-ink">{name}</td>
      <td className="w-28 py-2.5 pr-4 text-right font-black text-brand-green tabular-nums">
        {score}
        {denom != null && <span className="text-ink/35">/{denom}</span>}
      </td>
    </tr>
  );
}

export default function LeaderboardPage() {
  const t = useTranslations('dashboard');
  const [page, setPage] = useState(0); // 0,1,2 → up to 90 rows in 30s
  const shown = LEADERBOARD.slice(0, (page + 1) * PAGE);
  const hasMore = shown.length < LEADERBOARD.length;

  // "your position" window: 5 ahead + you + 5 after (11 rows)
  const meIdx = USER_RANK - 1;
  const around = LEADERBOARD.slice(Math.max(0, meIdx - 5), meIdx + 6);
  const meName = t('lbYou');

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
              {shown.map((r, i) => (
                <Row key={i} rank={i + 1} name={r.name} score={r.score} denom={TOTAL_LESSONS} />
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
              {around.map((r, i) => {
                const rank = Math.max(0, meIdx - 5) + i + 1;
                const isMe = rank === USER_RANK;
                return <Row key={i} rank={rank} name={isMe ? meName : r.name} score={r.score} denom={TOTAL_LESSONS} me={isMe} />;
              })}
            </tbody>
          </table>
        </div>

        {/* previous olympiad — top 10 */}
        <h2 className="mt-12 mb-3 text-xl font-black text-ink">{t('lbPrevOlympiad')}</h2>
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
          <table className="w-full text-[14px]">
            <tbody>
              {PREV_OLYMPIAD.map((r, i) => (
                <Row key={i} rank={i + 1} name={r.name} score={r.score} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
