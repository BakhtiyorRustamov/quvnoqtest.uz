'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { useUser } from '@/components/providers/UserProvider';

/** Upgrade Now page (SRS §6.7): full content + AI for 15 000 UZS/month. */
export default function UpgradePage() {
  const t = useTranslations('upgrade');
  const { user } = useUser();

  const features = [t('f1'), t('f2'), t('f3'), t('f4')];

  return (
    <main className="min-h-screen flex flex-col">
      <BackBar />
      <div className="flex-1 grid place-items-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="card max-w-md w-full p-7 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple" />
          <div className="text-5xl mt-1" aria-hidden>
            🎁
          </div>
          <h1 className="font-black text-ink text-3xl mt-2">{t('title')}</h1>
          <p className="font-bold text-ink/60 mt-1">{t('subtitle')}</p>

          <div className="my-5 inline-block px-7 py-3 rounded-2xl bg-brand-purple text-white">
            <span className="font-black text-2xl">{t('price')}</span>
          </div>

          <ul className="text-left space-y-2.5 mb-6">
            {features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-2.5 font-bold text-ink"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-green text-white grid place-items-center text-sm font-black">
                  ✓
                </span>
                {f}
              </motion.li>
            ))}
          </ul>

          {user?.isPaid ? (
            <div className="font-extrabold text-brand-green bg-brand-green/10 rounded-2xl px-4 py-3">
              ✅ {user.paidUntil ? new Date(user.paidUntil).toLocaleDateString() : ''}
            </div>
          ) : (
            <Link href="/checkout" className="btn-primary w-full text-xl">
              {t('cta')} →
            </Link>
          )}
          <p className="text-[13px] font-bold text-ink/45 mt-4">💚 {t('note')}</p>
        </motion.div>
      </div>
    </main>
  );
}
