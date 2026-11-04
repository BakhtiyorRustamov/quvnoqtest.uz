'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { api } from '@/lib/client';
import { MdMark } from '@/components/brand/MoviyDaftarLogo';
import { BOARD_TEXT, BoardMessage, chatTurns, requestBoard, voiceHint, type ChatMsg } from './BoardExplainer';
import MicButton from './MicButton';
import { useUser } from '@/components/providers/UserProvider';

type Usage = { messages: number; tokens: number };
const LIMITS = { messages: 100, tokens: 100000 };

/** AI tutor chat (SRS §6.9): usage display, pre-send limit gating UI, friendly errors. */
export default function AiChat() {
  const t = useTranslations('ai');
  const tc = useTranslations('common');
  const locale = useLocale();
  const tb = BOARD_TEXT[locale] ?? BOARD_TEXT.uz;
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const { user } = useUser();
  // the text in the box came from the microphone (the tutor reads it charitably)
  const [voice, setVoice] = useState(false);
  const [micStatus, setMicStatus] = useState<string | null>(null);
  // after a board's follow-up question the box is for answering: one send button
  const [replyMode, setReplyMode] = useState(false);
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

  // a new board scrolls itself into view; everything else scrolls to the bottom
  const last = msgs[msgs.length - 1];
  useEffect(() => {
    if (last?.role === 'board') return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [msgs.length, busy]); // eslint-disable-line react-hooks/exhaustive-deps
  // site lessons that match each question, shown under the answer (both brief and detailed modes)
  const [related, setRelated] = useState<{ after: number; items: { title: string; subject: string; label: string; href: string }[] }[]>([]);
  const findLessons = (q: string, after: number) =>
    api<{ lessons: { title: string; subject: string; label: string; href: string }[] }>(`/api/ai/lessons?q=${encodeURIComponent(q)}`).then(({ data }) => {
      if (data?.lessons?.length) setRelated((r) => [...r, { after, items: data.lessons }]);
    });
  const hasBoard = msgs.some((m) => m.role === 'board');
  const boardBusy = msgs.some((m) => m.role === 'board' && m.state === 'loading');

  /** "Explain on the board": a short board lesson inside the chat; its follow-up question continues the chat. */
  async function explain() {
    const text = input.trim();
    if (!text || busy || boardBusy || limitHit || !configured) return;
    setError(null);
    setInput('');
    const spoken = voice;
    setVoice(false);
    const id = Date.now();
    setMsgs((m) => [...m, { role: 'user', content: text }, { role: 'board', id, question: text, state: 'loading' }]);
    void findLessons(text, msgs.length + 1);
    const { ok, status, data } = await requestBoard(text, undefined, spoken);
    const update = (patch: Partial<Extract<ChatMsg, { role: 'board' }>>) =>
      setMsgs((m) => m.map((x) => (x.role === 'board' && x.id === id ? { ...x, ...patch } : x)));
    if (ok && data?.lesson) {
      update({ state: 'ready', lesson: data.lesson });
      if (data.usage) {
        setUsage(data.usage);
        if (data.usage.messages >= limits.messages || data.usage.tokens >= limits.tokens - 60) setLimitHit(true);
      }
    } else {
      update({ state: 'error', error: status === 429 ? tb.limit : status === 501 ? tb.off : tb.error });
      if (status === 429) setLimitHit(true);
    }
  }

  function boardDone(id: number) {
    const b = msgs.find((m) => m.role === 'board' && m.id === id);
    const q = b && b.role === 'board' ? b.lesson?.followUp : '';
    if (q) {
      setMsgs((m) => [...m, { role: 'assistant', content: q }]);
      setReplyMode(true);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || busy || limitHit || !configured) return;
    setError(null);
    setInput('');
    const history = chatTurns(msgs).slice(-4);
    const spoken = voice;
    setVoice(false);
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setBusy(true);
    const { ok, status, data } = await api('/api/ai', { method: 'POST', json: { message: text, history, voice: spoken } });
    setBusy(false);
    if (ok && data?.reply) {
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply }]);
      void findLessons(text, msgs.length + 1);
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
        {/* with a board in the conversation the page scrolls instead of the box, so the board has room */}
        <div className={`card flex-1 mt-3 p-3.5 min-h-[300px] ${hasBoard ? '' : 'overflow-y-auto max-h-[58vh]'}`}>
          <Bubble role="assistant">{t('greeting')}</Bubble>
          {msgs.map((m, i) =>
            m.role === 'board' ? (
              <div key={m.id} className="my-3">
                <BoardMessage msg={m} locale={locale} onDone={() => boardDone(m.id)} />
              </div>
            ) : (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            )
          )}
          {related.length > 0 && (
            <div className="my-3 space-y-2">
              {related.slice(-1).map((r, k) => (
                <div key={k} className="rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.06] px-3.5 py-2.5">
                  <div className="text-xs font-black uppercase tracking-wide text-brand-blue">📖 {tb.lessons}</div>
                  {r.items.map((it) => (
                    <a key={it.href} href={it.href} className="mt-1 block text-[15px] font-bold text-ink underline decoration-brand-blue/30 hover:decoration-brand-blue">
                      {it.subject} · {it.label}. {it.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
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
        <div className="flex flex-wrap justify-end gap-2 mt-3">
          <MicButton
            locale={locale}
            hint={() => voiceHint(msgs, `QuvnoqTest. ${user?.grade ?? ''}-sinf maktab darsi.`)}
            disabled={busy || limitHit || !configured}
            onText={(text) => {
              setInput((v) => (v.trim() ? `${v.trim()} ${text}` : text));
              setVoice(true);
            }}
            onError={setError}
            onStatus={setMicStatus}
          />
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (!e.target.value.trim()) setVoice(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={micStatus ?? (replyMode ? tb.reply : t('placeholder'))}
            disabled={busy || limitHit || !configured || !!micStatus}
            className="min-w-0 flex-[1_1_240px] rounded-full border-2 border-ink/15 bg-white px-5 py-3 font-semibold text-ink focus:border-brand-blue outline-none disabled:opacity-50"
          />
          {replyMode ? (
            <>
              <button
                onClick={send}
                disabled={busy || limitHit || !configured || !input.trim()}
                aria-label={tb.send}
                title={tb.send}
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-brand-blue text-[22px] font-black text-white shadow-[0_3px_0_rgba(0,0,0,.15)] active:translate-y-px disabled:opacity-40"
              >
                ⌲
              </button>
            </>
          ) : (
          <>
          <div className="flex w-36 flex-col items-center">
            <button
              onClick={explain}
              disabled={busy || boardBusy || limitHit || !configured || !input.trim()}
              className="w-full rounded-full border-2 border-brand-orange/50 bg-white px-4 py-2.5 font-black text-brand-orange shadow-[0_3px_0_rgba(0,0,0,.08)] active:translate-y-px disabled:opacity-40"
            >
              {tb.detailed}
            </button>
            <span className="mt-1 text-center text-[10.5px] font-bold leading-tight text-ink/50">{tb.detailedHint}</span>
          </div>
          <div className="flex w-36 flex-col items-center">
            <button
              onClick={send}
              disabled={busy || limitHit || !configured || !input.trim()}
              className="w-full rounded-full border-2 border-brand-blue bg-brand-blue px-4 py-2.5 font-black text-white shadow-[0_3px_0_rgba(0,0,0,.15)] active:translate-y-px disabled:opacity-40"
            >
              {tb.brief}
            </button>
            <span className="mt-1 text-center text-[10.5px] font-bold leading-tight text-ink/50">{tb.briefHint}</span>
          </div>
          </>
          )}
        </div>
        {replyMode && (
          <div className="mt-2 flex justify-center">
            <button onClick={() => setReplyMode(false)} className="rounded-full border border-ink/10 bg-white px-4 py-1.5 text-sm font-black text-ink/60 hover:text-ink">
              {tb.newQuestion}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <MdMark className="h-8 w-8 shrink-0" />}
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
