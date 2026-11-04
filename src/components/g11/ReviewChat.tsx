'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/client';
import { useUser } from '@/components/providers/UserProvider';
import { BOARD_TEXT, BoardMessage, chatTurns, requestBoard, voiceHint, type ChatMsg } from '@/components/ai/BoardExplainer';
import MicButton from '@/components/ai/MicButton';

const S: Record<string, Record<string, string>> = {
  uz: {
    title: 'SI yordamchi',
    hint: 'Hali ham tushunarsiz boʻlsa shu yerda soʻrab javob olishingiz mumkin.',
    placeholder: 'Savolingizni yozing…',
    send: 'Yuborish',
    thinking: 'Oʻylayapman…',
    limit: 'SI yordamchi limiti tugadi. Keyinroq yana urinib koʻring.',
    off: 'SI yordamchi hozircha ulanmagan.',
    error: 'Xatolik yuz berdi. Qaytadan urinib koʻring.'
  },
  ru: {
    title: 'AI-помощник',
    hint: 'Если что-то всё ещё непонятно, спросите здесь и получите ответ.',
    placeholder: 'Напишите вопрос…',
    send: 'Отправить',
    thinking: 'Думаю…',
    limit: 'Лимит AI-помощника исчерпан. Попробуйте позже.',
    off: 'AI-помощник пока не подключён.',
    error: 'Произошла ошибка. Попробуйте ещё раз.'
  },
  en: {
    title: 'AI tutor',
    hint: 'If something is still unclear, ask here and get an answer.',
    placeholder: 'Type your question…',
    send: 'Send',
    thinking: 'Thinking…',
    limit: 'The AI tutor limit is used up. Try again later.',
    off: 'The AI tutor is not connected yet.',
    error: 'Something went wrong. Please try again.'
  }
};

/**
 * Small per-question AI chat in the test review. Uses the existing /api/ai
 * tutor endpoint (same limits as the main AI page); every message carries the
 * question, the options, the student's answer and the explanation as context.
 */
export default function ReviewChat({ context, locale }: { context: string; locale: string }) {
  const t = S[locale] ?? S.uz;
  const { ensureUser } = useUser();
  const tb = BOARD_TEXT[locale] ?? BOARD_TEXT.uz;
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  // the text in the box came from the microphone (the tutor reads it charitably)
  const [voice, setVoice] = useState(false);
  const [micStatus, setMicStatus] = useState<string | null>(null);
  // after a board's follow-up question the box is for answering: one send button
  const [replyMode, setReplyMode] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setError(null);
    setInput('');
    const history = chatTurns(msgs).slice(-4);
    const spoken = voice;
    setVoice(false);
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setBusy(true);
    const message = `${context.slice(0, 700)}\n\nOʻquvchining savoli: ${text}`.slice(0, 1000);
    let res = await api<{ reply?: string; error?: string }>('/api/ai', { method: 'POST', json: { message, history, voice: spoken } });
    if (res.status === 401) {
      await ensureUser(11);
      res = await api('/api/ai', { method: 'POST', json: { message, history, voice: spoken } });
    }
    setBusy(false);
    if (res.ok && res.data?.reply) {
      setMsgs((m) => [...m, { role: 'assistant', content: res.data.reply as string }]);
    } else {
      setError(res.status === 429 ? t.limit : res.status === 501 ? t.off : t.error);
    }
    requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
  }

  const hasBoard = msgs.some((m) => m.role === 'board');
  const boardBusy = msgs.some((m) => m.role === 'board' && m.state === 'loading');

  /** "Explain on the board" with this test question as context; the follow-up question continues the chat. */
  async function explain() {
    const text = input.trim();
    if (!text || busy || boardBusy) return;
    setError(null);
    setInput('');
    const spoken = voice;
    setVoice(false);
    const id = Date.now();
    setMsgs((m) => [...m, { role: 'user', content: text }, { role: 'board', id, question: text, state: 'loading' }]);
    let res = await requestBoard(text, context, spoken);
    if (res.status === 401) {
      await ensureUser(11);
      res = await requestBoard(text, context, spoken);
    }
    setMsgs((m) =>
      m.map((x) =>
        x.role === 'board' && x.id === id
          ? res.ok && res.data?.lesson
            ? { ...x, state: 'ready', lesson: res.data.lesson }
            : { ...x, state: 'error', error: res.status === 429 ? tb.limit : res.status === 501 ? tb.off : tb.error }
          : x
      )
    );
  }

  function boardDone(id: number) {
    const b = msgs.find((m) => m.role === 'board' && m.id === id);
    const q = b && b.role === 'board' ? b.lesson?.followUp : '';
    if (q) {
      setReplyMode(true);
      setMsgs((m) => [...m, { role: 'assistant', content: q }]);
      requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
    }
  }

  return (
    <div className="mt-3 rounded-2xl border border-brand-purple/20 bg-brand-purple/[0.04] p-3">
      <div ref={listRef} aria-label={t.title} className={`space-y-2 ${hasBoard ? '' : 'max-h-72 overflow-y-auto'}`}>
        {msgs.length === 0 && <p className="text-[14px] font-semibold text-ink/55">{t.hint}</p>}
        {msgs.map((m, i) =>
          m.role === 'board' ? (
            <div key={m.id} className="py-1">
              <BoardMessage msg={m} locale={locale} onDone={() => boardDone(m.id)} />
            </div>
          ) : (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[14.5px] font-semibold leading-snug ${
                m.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white text-ink border border-ink/10'
              }`}
            >
              {m.content}
            </div>
          </div>
          )
        )}
        {busy && <div className="text-[13px] font-bold text-ink/45">{t.thinking}</div>}
        {error && <div className="text-[13px] font-bold text-error">{error}</div>}
      </div>
      <form
        className="mt-2 flex flex-wrap items-start justify-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <MicButton
          locale={locale}
          size="sm"
          hint={() => voiceHint(msgs, context.slice(0, 600))}
          disabled={busy || boardBusy}
          onText={(text) => {
            setInput((v) => (v.trim() ? `${v.trim()} ${text}` : text));
            setVoice(true);
          }}
          onError={setError}
          onStatus={setMicStatus}
          ensureUser={() => ensureUser(11)}
        />
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (!e.target.value.trim()) setVoice(false);
          }}
          disabled={!!micStatus}
          placeholder={micStatus ?? (replyMode ? tb.reply : t.placeholder)}
          maxLength={300}
          className="min-w-0 flex-[1_1_200px] rounded-full border border-ink/15 bg-white px-4 py-2 text-[15px] font-semibold text-ink outline-none focus:border-brand-blue"
        />
        {replyMode ? (
          <>
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={tb.send}
              title={tb.send}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-blue text-lg font-black text-white disabled:opacity-40"
            >
              ⌲
            </button>
          </>
        ) : (
        <>
        <span className="flex max-w-[9.5rem] flex-col items-center gap-0.5 text-center">
          <button
            type="button"
            onClick={explain}
            disabled={busy || boardBusy || !input.trim()}
            className="rounded-full border-2 border-brand-orange/50 bg-white px-3.5 py-1.5 text-sm font-black text-brand-orange disabled:opacity-40"
          >
            {tb.detailed}
          </button>
          <span className="text-[10px] font-semibold leading-tight text-ink/45">{tb.detailedHint}</span>
        </span>
        <span className="flex max-w-[9.5rem] flex-col items-center gap-0.5 text-center">
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full border-2 border-brand-blue bg-brand-blue px-3.5 py-1.5 text-sm font-black text-white disabled:opacity-40"
          >
            {tb.brief}
          </button>
          <span className="text-[10px] font-semibold leading-tight text-ink/45">{tb.briefHint}</span>
        </span>
        </>
        )}
      </form>
      {replyMode && (
        <div className="mt-2 flex justify-center">
          <button type="button" onClick={() => setReplyMode(false)} className="rounded-full border border-ink/10 bg-white px-3.5 py-1 text-sm font-black text-ink/60 hover:text-ink">
            {tb.newQuestion}
          </button>
        </div>
      )}
    </div>
  );
}
