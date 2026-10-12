'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';

/**
 * In-app messages from the admin — currently only "your receipt was not
 * confirmed". Rendered globally so the user sees it wherever they land, since
 * there is no inbox or email channel to fall back on.
 */
export default function NoticeBanner() {
  const { notices, dismissNotice } = useUser();
  const t = useTranslations('notices');

  if (!notices.length) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pointer-events-none" style={{ paddingTop: 'calc(var(--app-top) + 0.75rem)' }}>
      <AnimatePresence>
        {notices.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto mx-auto max-w-md mb-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 shadow-lg"
          >
            <div className="flex items-start gap-2.5">
              <span aria-hidden className="text-lg leading-none mt-0.5">
                ⚠️
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-amber-900 text-sm">{n.title || t('rejectedTitle')}</div>
                {n.body && <p className="text-[13px] font-bold text-amber-800/80 mt-0.5">{n.body}</p>}
              </div>
              <button
                onClick={() => dismissNotice(n.id)}
                aria-label={t('dismiss')}
                className="shrink-0 text-amber-700/60 hover:text-amber-900 font-black px-1"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
