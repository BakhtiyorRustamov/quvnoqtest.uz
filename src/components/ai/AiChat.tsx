'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { api } from '@/lib/client';

type Msg = { role: 'user' | 'assistant'; content: string };
type Usage = { messages: number; tokens: number };
const LIMITS = { messages: 100, tokens: 100000 };

/** AI tutor chat (SRS §6.9): usage display, pre-send limit gating UI, friendly errors. */
export default function AiChat() {
  const t = useTranslations('ai');
  const tc = useTranslations('common');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [usage, setUsage] = useState<Usage>({ messages: 0, tokens: 0 });
  const [limits, setLimits] = useState(LIMITS);
  const [configured, setConfigured] = useState(true);
  const [limitHit, setLimitHit] = useState(false);
  const [freeTrial, setFreeTrial] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api('/api/ai').then(({ data }) => {
      if (!data) return;
      setConfigured(data.configured);
      setFreeTrial(!!data.freeTrial);
      setUsage(data.usage ?? { messages: 0, tokens: 0 });
      setLimits(data.limits ?? LIMITS);
      if ((data.usage?.messages ?? 0) >= (data.limits?.messages ?? 5)) setLimitHit(true);
      if ((data.usage?.tokens ?? 0) >= (data.limits?.tokens ?? 1000)) setLimitHit(true);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy || limitHit || !configured) return;
    setError(null);
    setInput('');
    const history = msgs.slice(-4);
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setBusy(true);
    const { ok, status, data } = await api('/api/ai', { method: 'POST', json: { message: text, history } });
    setBusy(false);
    if (ok && data?.reply) {
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply }]);
      setUsage(data.usage);
      if (data.usage.messages >= limits.messages || data.usage.tokens >= limits.tokens - 60) setLimitHit(true);
    } else if (status === 429) {
      setLimitHit(true);
      if (data?.usage) setUsage(data.usage);
    } else if (status === 501) {
      setConfigured(false);
    } else {
      setError(t('error'));
    }
  }

  const pct = (a: number, b: number) => Math.min(100, Math.round((a / b) * 100));

  return (
    <main className="min-h-screen flex flex-col">
      <BackBar />
      <div className="flex-1 w-full max-w-2xl mx-auto px-3 flex flex-col pb-4">
        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
          <h1 className="font-black text-ink text-2xl">🤖 {t('title')}</h1>
          {/* usage vs limits (FR-AI-6) */}
          <div className="card px-3.5 py-2 text-[13px] font-extrabold text-ink/70">
            {t('usage', { m: usage.messages, mMax: limits.messages, t: usage.tokens, tMax: limits.tokens })}
            <div className="flex gap-2 mt-1.5" aria-hidden>
              <span className="h-1.5 w-20 rounded-full bg-ink/10 overflow-hidden">
                <span className="block h-full bg-brand-blue" style={{ width: `${pct(usage.messages, limits.messages)}%` }} />
              </span>
              <span className="h-1.5 w-20 rounded-full bg-ink/10 overflow-hidden">
                <span className="block h-full bg-brand-orange" style={{ width: `${pct(usage.tokens, limits.tokens)}%` }} />
              </span>
            </div>
          </div>
        </div>

        {/* chat area */}
        <div className="card flex-1 mt-3 p-3.5 overflow-y-auto min-h-[300px] max-h-[58vh]">
          <Bubble role="assistant">{t('greeting')}</Bubble>
          {msgs.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.content}
            </Bubble>
          ))}
          {busy && (
            <Bubble role="assistant">
              <span className="inline-flex gap-1 items-center">
                {t('thinking')}
                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }}>
                  …
                </motion.span>
              </span>
            </Bubble>
          )}
          {error && <p className="text-center text-sm font-bold text-error mt-2">{error}</p>}
          <div ref={bottomRef} />
        </div>

        {/* free-trial banner — shown while the one free session is still active */}
        {freeTrial && configured && !limitHit && (
          <div className="mt-3 rounded-2xl bg-brand-green/10 border border-brand-green/30 px-4 py-2.5 font-bold text-ink/70 text-sm">
            {t('freeNote')}
          </div>
        )}

        {/* limit-reached / not-configured notices (FR-AI-7, NFR-6) */}
        {!configured && (
          <div className="mt-3 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 font-bold text-ink/70 text-sm">
            ⚙️ {t('notConfigured')}
          </div>
        )}
        {limitHit && configured && (
          <div className="mt-3 rounded-2xl bg-brand-magenta/10 border border-brand-magenta/30 px-4 py-3">
            <div className="font-black text-brand-magenta">
              ⏳ {freeTrial ? t('freeEndedTitle') : t('limitTitle')}
            </div>
            <div className="font-bold text-ink/60 text-sm mt-0.5">
              {freeTrial ? t('freeEndedBody') : t('limitBody')}
            </div>
            {freeTrial && (
              <Link href="/upgrade" className="btn-primary mt-3 inline-flex text-sm px-5">
                {tc('upgradeNow')}
              </Link>
            )}
          </div>
        )}

        {/* input */}
        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={t('placeholder')}
            disabled={busy || limitHit || !configured}
            className="flex-1 rounded-full border-2 border-ink/15 bg-white px-5 py-3 font-semibold text-ink focus:border-brand-blue outline-none disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={busy || limitHit || !configured || !input.trim()}
            className="btn-primary px-6 disabled:opacity-40"
            aria-label={t('send')}
          >
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <img src="/logo-mark.svg" alt="" className="w-8 h-8 shrink-0" aria-hidden />}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl font-semibold leading-relaxed text-[15px] ${
          isUser ? 'bg-brand-blue text-white rounded-br-md' : 'bg-ink/5 text-ink rounded-bl-md'
        }`}
      >
        {children}
      </div>
      {isUser && (
        <span className="w-8 h-8 shrink-0 rounded-full bg-brand-orange/20 grid place-items-center" aria-hidden>
          🙂
        </span>
      )}
    </div>
  );
}
