'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { useUser } from '@/components/providers/UserProvider';
import { useSound } from '@/components/providers/SoundProvider';
import { bigCelebration } from '@/lib/confetti';

/** Dummy checkout (SRS §6.8): no gateway, no card capture — just "I PAID". */
export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { pay } = useUser();
  const { play } = useSound();
  const [busy, setBusy] = useState(false);

  async function paid() {
    setBusy(true);
    const u = await pay(); // sets paid_until = now() + 30 days (FR-CHK-2)
    if (u?.isPaid) {
      play('win');
      bigCelebration();
      setTimeout(() => router.push('/dashboard'), 900);
    } else {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <BackBar backHref="/upgrade" />
      <div className="flex-1 grid place-items-center px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="card max-w-md w-full p-7">
          <h1 className="font-black text-ink text-3xl text-center">💳 {t('title')}</h1>

          <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-[13px] font-bold text-ink/70">
            ⚠️ {t('testNote')}
          </div>

          <div className="mt-5 rounded-2xl border-2 border-ink/10 divide-y divide-ink/10">
            <div className="flex items-center justify-between px-4 py-3.5 font-extrabold text-ink">
              <span>{t('product')}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="font-bold text-ink/60">Σ</span>
              <span className="font-black text-2xl text-brand-purple">{t('price')}</span>
            </div>
          </div>

          <motion.button
            onClick={paid}
            disabled={busy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary w-full text-2xl py-5 mt-6 disabled:opacity-60"
          >
            {busy ? '…' : t('iPaid')}
          </motion.button>
          <p className="text-center text-[13px] font-bold text-ink/45 mt-3">{t('afterNote')}</p>
        </motion.div>
      </div>
    </main>
  );
}
