'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { pick } from '@/lib/i18n-config';
import MuteToggle from './MuteToggle';
import LangSwitcher from './LangSwitcher';

const LABEL = {
  open: { uz: 'Menyuni ochish', ru: 'Открыть меню', en: 'Open menu' },
  close: { uz: 'Menyuni yopish', ru: 'Закрыть меню', en: 'Close menu' },
  profile: { uz: 'Profil', ru: 'Профиль', en: 'Profile' },
  home: { uz: 'Fanlar', ru: 'Предметы', en: 'Subjects' },
  sound: { uz: 'Ovoz', ru: 'Звук', en: 'Sound' },
  lang: { uz: 'Til', ru: 'Язык', en: 'Language' }
};

/** panel-with-chevron icon (sidebar toggle) */
function PanelIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="25" height="22" rx="5" />
      <path d="M12.5 5v22" />
      {open ? <path d="M22.5 12.5 19 16l3.5 3.5" /> : <path d="M19 12.5 22.5 16 19 19.5" />}
    </svg>
  );
}

/**
 * App-wide side rail (every page except the admin area): profile page, sound and
 * language. The language switch is hidden for the senior track (Yuqori sinf),
 * whose content is Uzbek-only; the primary track is trilingual.
 */
export default function AppSidebar() {
  const locale = useLocale();
  const path = usePathname() ?? '';
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  if (path.startsWith('/admin') || path.startsWith('/record')) return null;
  const senior = /g11|g10/.test(path) || (user?.grade === 11 && (path.startsWith('/dashboard') || path.startsWith('/profile')));

  return (
    <>
      {/* collapsed handle: half-tucked behind the left edge, vertically centred */}
      <button
        onClick={() => setOpen(true)}
        aria-label={pick(LABEL.open, locale)}
        aria-expanded={open}
        className={`fixed left-0 top-1/2 z-[60] -translate-y-1/2 rounded-r-2xl border-2 border-l-0 border-[#2BC4D6]/70 bg-[#141a2e] py-3 pl-1.5 pr-2 text-[#38D6E6] shadow-[0_6px_20px_rgba(20,26,46,0.35)] transition-transform hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38D6E6]/40 ${open ? 'pointer-events-none opacity-0' : ''}`}
      >
        <PanelIcon open={false} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <div className="pointer-events-none fixed inset-y-0 left-0 z-[61] flex items-center">
            <motion.nav
              aria-label="Menu"
              className="pointer-events-auto flex flex-col items-center gap-3 rounded-r-3xl border-2 border-l-0 border-[#2BC4D6]/50 bg-[#141a2e] px-3 py-4 text-white shadow-2xl"
              initial={{ x: -120 }}
              animate={{ x: 0 }}
              exit={{ x: -120 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <button onClick={() => setOpen(false)} aria-label={pick(LABEL.close, locale)} className="rounded-xl p-1 text-[#38D6E6] hover:bg-white/10">
                <PanelIcon open />
              </button>
              <div className="h-px w-10 bg-white/15" />
              <Link href="/profile" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5 hover:bg-white/10">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#38D6E6] to-[#2B6CB0] text-xl font-black">
                  {user?.name?.trim() ? (
                    user.name.trim()[0].toUpperCase()
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                      <circle cx="12" cy="8.5" r="3.8" />
                      <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
                    </svg>
                  )}
                </span>
                <span className="text-[11px] font-black text-white/80">{pick(LABEL.profile, locale)}</span>
              </Link>
              <Link href="/dashboard" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5 hover:bg-white/10">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl">📚</span>
                <span className="text-[11px] font-black text-white/80">{pick(LABEL.home, locale)}</span>
              </Link>
              <div className="flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 hover:bg-white/10">
                <MuteToggle bright />
                <span className="text-[11px] font-black text-white/80">{pick(LABEL.sound, locale)}</span>
              </div>
              {!senior && (
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/95 px-1.5 py-1.5">
                  <LangSwitcher align="left" imgClassName="h-8" />
                  <span className="text-[11px] font-black text-ink/70">{pick(LABEL.lang, locale)}</span>
                </div>
              )}
            </motion.nav>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
