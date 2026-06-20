'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';

/**
 * The corner robot mascot is the AI assistant entry: tapping it opens the AI
 * tutor. Free users get one free-trial session there; the /ai page sends them
 * to Upgrade once it's been used up.
 */
export default function AIMascotButton() {
  const router = useRouter();
  const t = useTranslations('dashboard');
  const { user } = useUser();
  const isPaid = user?.isPaid ?? false;

  return (
    <motion.button
      onClick={() => router.push('/ai')}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.93 }}
      aria-label={t('aiTutor')}
      title={t('aiTutor')}
      className="fixed bottom-3 right-3 z-40 w-[117px] sm:w-[200px] flex flex-col items-center bg-transparent border-none focus-visible:outline-brand-blue"
    >
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-blue text-white text-[11px] sm:text-xs font-black px-2.5 py-1 shadow-lg">
        ✨ {!isPaid && <span aria-hidden>🎁</span>}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ai-mascot.webp"
        alt={t('aiTutor')}
        className="w-full animate-floaty select-none drop-shadow-lg"
        draggable={false}
        style={{ background: 'none' }}
      />
      <span className="mt-0.5 whitespace-nowrap rounded-full bg-white/90 text-brand-blue text-[10px] sm:text-[11px] font-bold px-2 py-0.5 shadow">
        {t('aiTutor')}
      </span>
    </motion.button>
  );
}
