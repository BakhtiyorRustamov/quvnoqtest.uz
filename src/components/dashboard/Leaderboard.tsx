'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

/**
 * Compact top-5 board on the grade dashboard. Names and scores are shown as
 * dash placeholders until a real /api/leaderboard exists. The whole card links
 * to the full /leaderboard page.
 */
const MEDAL = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const t = useTranslations('dashboard');

  return (
    <section className="mx-auto mt-8 max-w-md px-3">
      <div className="mb-1.5 flex items-baseline justify-between">
        <h2 className="text-base font-black text-ink">{t('leaderboardTitle')}</h2>
        <Link href="/leaderboard" className="text-[12px] font-extrabold text-brand-blue hover:underline">
          {t('leaderboardAll')} →
        </Link>
      </div>

      <Link href="/leaderboard" className="block overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-transform hover:-translate-y-0.5">
        <table className="w-full text-[13px]">
          <tbody>
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i} className={i % 2 ? 'bg-ink/[0.025]' : ''}>
                <td className="w-8 py-1.5 pl-3 text-center font-black text-ink/70">{i < 3 ? MEDAL[i] : i + 1}</td>
                <td className="py-1.5 px-2 font-extrabold text-ink/40 truncate">- - -</td>
                <td className="w-24 py-1.5 pr-3 text-right font-black text-ink/35 tabular-nums">- - -</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Link>
    </section>
  );
}
