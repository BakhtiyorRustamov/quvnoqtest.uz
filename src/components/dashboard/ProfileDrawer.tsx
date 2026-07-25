'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { useSound } from '@/components/providers/SoundProvider';
import { api } from '@/lib/client';
import ContactButton from '@/components/ui/ContactButton';

type MagicState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'dev'; link: string }
  | { kind: 'noconfig' }
  | { kind: 'error' };

/** Profile menu (SRS §6.6): visible QT-ID, editable grade, optional name/phone/email + magic link. */
export default function ProfileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('profile');
  const tc = useTranslations('common');
  const td = useTranslations('dashboard');
  const { user, update } = useUser();
  const { muted, toggleMuted } = useSound();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const [magic, setMagic] = useState<MagicState>({ kind: 'idle' });

  useEffect(() => {
    setName(user?.name ?? '');
    setPhone(user?.phone ?? '');
  }, [user?.name, user?.phone, open]);

  async function saveDetails() {
    await update({ name, phone });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }

  async function sendMagic() {
    if (!email.trim()) return;
    setMagic({ kind: 'sending' });
    const { ok, status, data } = await api('/api/magic-link', { method: 'POST', json: { email } });
    if (ok && data?.sent) setMagic({ kind: 'sent' });
    else if (ok && data?.devLink) setMagic({ kind: 'dev', link: data.devLink });
    else if (status === 501) setMagic({ kind: 'noconfig' });
    else setMagic({ kind: 'error' });
  }

  const inputCls =
    'w-full rounded-xl border-2 border-ink/15 bg-white px-3.5 py-2.5 font-semibold text-ink focus:border-brand-blue outline-none';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-label={t('title')}
            className="fixed left-0 top-0 bottom-0 w-[min(370px,93vw)] bg-bg z-50 shadow-2xl p-5 overflow-y-auto"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {/* close via the edge handle "<" — no X button here */}
            <div className="mb-5">
              <h2 className="font-black text-ink text-2xl">{t('title')}</h2>
            </div>

            {/* quick settings: image sound toggle + go to the landing page */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={toggleMuted}
                aria-label={muted ? tc('soundOff') : tc('soundOn')}
                title={muted ? tc('soundOff') : tc('soundOn')}
                className="grid shrink-0 place-items-center rounded-2xl bg-white border-2 border-ink/12 shadow-card px-3 py-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={muted ? '/buttons/soundOFF.png' : '/buttons/soundON.png'}
                  alt=""
                  className="block h-9 w-auto select-none transition duration-150 opacity-50 saturate-[0.25] hover:opacity-100 hover:saturate-100 active:opacity-100 active:saturate-100"
                  draggable={false}
                />
              </button>
              <Link
                href="/?home=1"
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white border-2 border-ink/12 shadow-card px-3 py-2.5 font-extrabold text-ink"
              >
                {td('landingLink')}
              </Link>
            </div>

            {/* visible public ID (FR-PRF-1) */}
            <div className="card p-4 text-center">
              <div className="text-xs font-extrabold text-ink/50 uppercase tracking-wide">{t('idLabel')}</div>
              <div className="font-semibold text-lg text-brand-purple mt-1 tracking-wider">{user?.publicId ?? '…'}</div>
              {user?.email && <div className="mt-1.5 text-sm font-bold text-brand-green">✉️ {user.email}</div>}
            </div>

            {/* grade (FR-PRF-2) */}
            <label className="block mt-5">
              <span className="font-extrabold text-ink/70 text-sm">{t('gradeLabel')}</span>
              <select
                value={user?.grade ?? 1}
                onChange={(e) => update({ grade: Number(e.target.value) })}
                className={`${inputCls} mt-1.5`}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {tc('grade', { n: i + 1 })}
                  </option>
                ))}
              </select>
            </label>

            {/* optional details (FR-PRF-3) */}
            <label className="block mt-4">
              <span className="font-extrabold text-ink/70 text-sm">{t('nameLabel')}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} mt-1.5`} />
            </label>
            <label className="block mt-4">
              <span className="font-extrabold text-ink/70 text-sm">{t('phoneLabel')}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className={`${inputCls} mt-1.5`} placeholder="+998 …" />
            </label>
            <button onClick={saveDetails} className="btn-blue w-full mt-4">
              {savedFlash ? tc('saved') : tc('save')}
            </button>

            {/* claim by email → magic link (FR-PRF-4) */}
            {!user?.email && (
              <div className="card p-4 mt-6">
                <div className="font-extrabold text-ink text-sm">✉️ {t('emailLabel')}</div>
                <p className="text-[13px] font-semibold text-ink/55 mt-1">{t('emailHint')}</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputCls} mt-2.5`}
                  placeholder="aziza@example.uz"
                />
                <button
                  onClick={sendMagic}
                  disabled={magic.kind === 'sending' || !email.includes('@')}
                  className="btn-primary w-full mt-3 text-base disabled:opacity-40"
                >
                  {magic.kind === 'sending' ? tc('loading') : t('sendMagic')}
                </button>
                {magic.kind === 'sent' && <p className="mt-2.5 text-sm font-bold text-brand-green">{t('magicSent')}</p>}
                {magic.kind === 'dev' && (
                  <div className="mt-2.5 text-sm font-semibold text-ink/70 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    {t('magicDevNote')}
                    <a href={magic.link} className="btn-blue w-full mt-2 text-sm">
                      🔗 {t('openLink')}
                    </a>
                  </div>
                )}
                {magic.kind === 'noconfig' && <p className="mt-2.5 text-sm font-bold text-error">{t('magicNotConfigured')}</p>}
                {magic.kind === 'error' && <p className="mt-2.5 text-sm font-bold text-error">⚠️</p>}
              </div>
            )}

            {/* upgrade entry (FR-PRF-5) */}
            <Link href="/upgrade" onClick={onClose} className="btn-primary w-full mt-6">
              {t('upgradeEntry')}
            </Link>
            {user?.isPaid && user.paidUntil && (
              <p className="text-center text-sm font-bold text-brand-green mt-3">
                ✅ {new Date(user.paidUntil).toLocaleDateString()} ⏳
              </p>
            )}

            {/* support contact */}
            <div className="mt-6 pt-5 border-t border-ink/10 flex justify-center">
              <ContactButton />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
