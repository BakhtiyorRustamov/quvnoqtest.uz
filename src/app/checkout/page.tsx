'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { useUser } from '@/components/providers/UserProvider';
import { useSound } from '@/components/providers/SoundProvider';
import { bigCelebration } from '@/lib/confetti';
import { CARDS, CARD_HOLDER, MAX_UPLOAD_BYTES } from '@/lib/pricing';
import ContactButton from '@/components/ui/ContactButton';

/**
 * Checkout: manual card transfer + receipt upload (there is no payment gateway).
 *
 * The user transfers 15 000 so'm to one of the cards, uploads the screenshot
 * their banking app produced, and access opens immediately once the automated
 * plausibility check passes. Receipts are reconciled against the card balances
 * later, in the admin panel.
 */

type Step = 'form' | 'sending' | 'done';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { submitReceipt, redeemPromo } = useUser();
  const { play } = useSound();

  const [card, setCard] = useState<string>('humo');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const [promoOpen, setPromoOpen] = useState(false);
  const [promo, setPromo] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoBusy, setPromoBusy] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ''));
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard blocked — the number is visible on screen anyway */
    }
  }

  function pick(f: File | null) {
    setError(null);
    if (!f) return;
    if (!f.type.startsWith('image/')) return setError(t('errNotImage'));
    if (f.size > MAX_UPLOAD_BYTES) return setError(t('errTooLarge'));
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }

  function celebrate() {
    play('win');
    bigCelebration();
    setStep('done');
    setTimeout(() => router.push('/dashboard'), 2600);
  }

  async function send() {
    if (!file || step === 'sending') return;
    setStep('sending');
    setError(null);

    const res = await submitReceipt(file, card, promoCode || undefined);
    if (res.ok) return celebrate();

    setStep('form');
    const map: Record<string, string> = {
      not_a_receipt: t('errNotReceipt'),
      duplicate: t('errDuplicate'),
      rate_limited: t('errTooMany'),
      file_too_large: t('errTooLarge'),
      no_file: t('errNoFile'),
      account_disabled: t('errDisabled'),
      no_user: t('errNoUser'),
      not_configured: t('errServer'),
      server_error: t('errServer')
    };
    setError(map[res.error ?? ''] ?? t('errServer'));
  }

  async function applyPromo() {
    if (!promo.trim() || promoBusy) return;
    setPromoBusy(true);
    setError(null);
    const res = await redeemPromo(promo);
    setPromoBusy(false);
    if (!res.ok) {
      setError(res.error === 'already_redeemed' ? t('errPromoUsed') : t('errPromoInvalid'));
      return;
    }

    setPromoCode(promo.trim().toUpperCase());
    setPromoMessage(res.message ?? t('promoOfferAccepted'));
    setPromo('');
    setPromoOpen(false);
  }

  /* ----------------------------- success screen ---------------------------- */
  if (step === 'done') {
    return (
      <main className="min-h-screen flex flex-col">
        <BackBar backHref="/dashboard" />
        <div className="flex-1 grid place-items-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-md w-full p-8 text-center"
          >
            <div className="text-6xl" aria-hidden>
              🎉
            </div>
            <h1 className="font-black text-ink text-3xl mt-3">{t('successTitle')}</h1>
            <p className="font-bold text-ink/60 mt-2">{t('successBody')}</p>
            <div className="mt-5 rounded-2xl bg-brand-green/10 border border-brand-green/25 px-4 py-3 text-sm font-bold text-ink/70">
              🔎 {t('reviewNote')}
            </div>
            <div className="mt-5 flex justify-center">
              <ContactButton />
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* -------------------------------- main form ------------------------------ */
  return (
    <main className="min-h-screen flex flex-col">
      <BackBar backHref="/upgrade" />
      <div className="flex-1 grid place-items-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full p-6 sm:p-7"
        >
          <h1 className="font-black text-ink text-3xl text-center">💳 {t('title')}</h1>

          {/* price */}
          <div className="mt-5 rounded-2xl border-2 border-ink/10 overflow-hidden">
            <div className="px-4 py-3 font-extrabold text-ink bg-ink/[0.03]">{t('product')}</div>
            <div className="flex items-baseline justify-between px-4 py-3.5">
              <span className="font-bold text-ink/55 text-sm">{t('perMonth')}</span>
              <span className="font-black text-3xl text-brand-purple">15 000 {t('sum')}</span>
            </div>
            <ul className="px-4 pb-4 space-y-1.5 text-[13px] font-bold text-ink/60">
              <li>✓ {t('inc1')}</li>
              <li>✓ {t('inc2')}</li>
              <li>✓ {t('inc3')}</li>
            </ul>
          </div>

          {/* step 1 — transfer */}
          <StepLabel n={1} text={t('step1')} />

          <div className="space-y-2.5">
            {CARDS.map((c) => {
              const active = card === c.key;
              return (
                <div
                  key={c.key}
                  onClick={() => setCard(c.key)}
                  className={`rounded-2xl border-2 p-3.5 cursor-pointer transition ${
                    active ? 'border-brand-purple bg-brand-purple/[0.06]' : 'border-ink/10 hover:border-ink/25'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full border-2 grid place-items-center ${
                        active ? 'border-brand-purple' : 'border-ink/25'
                      }`}
                      aria-hidden
                    >
                      {active && <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />}
                    </span>
                    <span className="font-extrabold text-ink">
                      {c.emoji} {c.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 pl-7">
                    <code className="font-black text-ink tracking-wide text-[15px] sm:text-base">{c.number}</code>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(c.number, c.key);
                      }}
                      className="ml-auto shrink-0 text-xs font-black px-2.5 py-1.5 rounded-lg bg-ink/[0.07] hover:bg-ink/[0.12] transition"
                    >
                      {copied === c.key ? `✓ ${t('copied')}` : t('copy')}
                    </button>
                  </div>
                </div>
              );
            })}
            <p className="text-[13px] font-bold text-ink/50 pl-1">
              {t('holder')}: <span className="text-ink/75">{CARD_HOLDER}</span>
            </p>
          </div>

          {/* step 2 — receipt */}
          <StepLabel n={2} text={t('step2')} />

          {promoMessage && (
            <div className="mb-4 rounded-2xl border border-brand-purple/30 bg-brand-purple/10 px-4 py-3 text-[13px] font-black text-brand-purple">
              {promoMessage}
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />

          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pick(e.dataTransfer.files?.[0] ?? null);
            }}
            className={`rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition ${
              dragging
                ? 'border-brand-purple bg-brand-purple/10'
                : file
                  ? 'border-brand-green bg-brand-green/[0.06]'
                  : 'border-ink/20 hover:border-ink/35'
            }`}
          >
            {preview ? (
              <div className="flex items-center gap-3 text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover border border-ink/10 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-extrabold text-ink truncate">{file?.name}</div>
                  <div className="text-[12px] font-bold text-ink/50">
                    {((file?.size ?? 0) / 1024).toFixed(0)} KB — {t('tapToChange')}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-4xl" aria-hidden>
                  🧾
                </div>
                <div className="font-extrabold text-ink mt-1.5">{t('dropTitle')}</div>
                <div className="text-[13px] font-bold text-ink/50 mt-0.5">{t('dropHint')}</div>
              </>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] font-bold text-red-700"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={send}
            disabled={!file || step === 'sending'}
            whileHover={file ? { scale: 1.02 } : undefined}
            whileTap={file ? { scale: 0.98 } : undefined}
            className="btn-primary w-full text-xl py-4 mt-5 disabled:opacity-45 disabled:cursor-not-allowed"
          >
            {step === 'sending' ? `${t('checking')}…` : t('submit')}
          </motion.button>

          <p className="text-center text-[12.5px] font-bold text-ink/45 mt-3 leading-relaxed">
            {t('afterNote')}
          </p>

          {/* if a transfer or receipt goes wrong, reaching a human must be one tap away */}
          <div className="mt-5">
            <ContactButton variant="card" />
          </div>

          {/* promo code */}
          <div className="mt-5 rounded-2xl border-2 border-brand-purple/25 bg-gradient-to-r from-brand-purple/8 to-brand-purple/14 p-3.5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-purple/80">Promo</div>
                <div className="text-[14px] font-extrabold text-ink">{t('promoOfferTitle')}</div>
              </div>
              {!promoOpen && !promoCode && (
                <button
                  onClick={() => setPromoOpen(true)}
                  className="shrink-0 rounded-xl bg-brand-purple px-3 py-1.5 text-[12px] font-black text-white"
                >
                  {t('promoToggle')}
                </button>
              )}
            </div>

            {promoOpen ? (
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value.toUpperCase())}
                  placeholder={t('promoPlaceholder')}
                  maxLength={32}
                  className="flex-1 min-w-0 rounded-xl border-2 border-ink/15 bg-white px-3 py-2.5 font-black tracking-wider text-ink outline-none focus:border-brand-purple"
                />
                <button
                  onClick={applyPromo}
                  disabled={promoBusy}
                  className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-white font-black disabled:opacity-50"
                >
                  {promoBusy ? '…' : t('promoApply')}
                </button>
              </div>
            ) : promoCode ? (
              <div className="rounded-xl border border-brand-purple/30 bg-white/70 px-3 py-2 text-[12px] font-bold text-ink/80">
                {t('promoApplied')}: <span className="font-black tracking-wider">{promoCode}</span>
              </div>
            ) : (
              <div className="text-[12px] font-bold text-ink/60">{t('promoOfferBody')}</div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-2.5">
      <span className="shrink-0 w-6 h-6 rounded-full bg-ink text-white grid place-items-center text-xs font-black">
        {n}
      </span>
      <span className="font-extrabold text-ink">{text}</span>
    </div>
  );
}
