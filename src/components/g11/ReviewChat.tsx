'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/client';
import { useUser } from '@/components/providers/UserProvider';

type Msg = { role: 'user' | 'assistant'; content: string };

const S: Record<string, Record<string, string>> = {
  uz: {
    title: 'AI yordamchi',
    hint: 'Hali tushunarsiz joyi qoldimi? Shu savol haqida soʻrang.',
    placeholder: 'Savolingizni yozing…',
    send: 'Yuborish',
    thinking: 'Oʻylayapman…',
    limit: 'AI yordamchi limiti tugadi. Keyinroq yana urinib koʻring.',
    off: 'AI yordamchi hozircha ulanmagan.',
    error: 'Xatolik yuz berdi. Qaytadan urinib koʻring.'
  },
  ru: {
    title: 'AI-помощник',
    hint: 'Остались вопросы? Спросите об этом задании.',
    placeholder: 'Напишите вопрос…',
    send: 'Отправить',
    thinking: 'Думаю…',
    limit: 'Лимит AI-помощника исчерпан. Попробуйте позже.',
    off: 'AI-помощник пока не подключён.',
    error: 'Произошла ошибка. Попробуйте ещё раз.'
  },
  en: {
    title: 'AI tutor',
    hint: 'Still unclear? Ask about this question.',
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
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setError(null);
    setInput('');
    const history = msgs.slice(-4);
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setBusy(true);
    const message = `${context.slice(0, 700)}\n\nOʻquvchining savoli: ${text}`.slice(0, 1000);
    let res = await api<{ reply?: string; error?: string }>('/api/ai', { method: 'POST', json: { message, history } });
    if (res.status === 401) {
      await ensureUser(11);
      res = await api('/api/ai', { method: 'POST', json: { message, history } });
    }
    setBusy(false);
    if (res.ok && res.data?.reply) {
      setMsgs((m) => [...m, { role: 'assistant', content: res.data.reply as string }]);
    } else {
      setError(res.status === 429 ? t.limit : res.status === 501 ? t.off : t.error);
    }
    requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
  }

  return (
    <div className="mt-3 rounded-2xl border border-brand-purple/20 bg-brand-purple/[0.04] p-3">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-purple text-xs font-black text-white">AI</span>
        <span className="font-black text-ink">{t.title}</span>
      </div>
      <div ref={listRef} className="mt-2 max-h-72 space-y-2 overflow-y-auto">
        {msgs.length === 0 && <p className="text-[14px] font-semibold text-ink/55">{t.hint}</p>}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[14.5px] font-semibold leading-snug ${
                m.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white text-ink border border-ink/10'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="text-[13px] font-bold text-ink/45">{t.thinking}</div>}
        {error && <div className="text-[13px] font-bold text-error">{error}</div>}
      </div>
      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          maxLength={300}
          className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 text-[15px] font-semibold text-ink outline-none focus:border-brand-blue"
        />
        <button type="submit" disabled={busy || !input.trim()} className="btn-blue px-4 py-2 text-sm disabled:opacity-50">
          {t.send}
        </button>
      </form>
    </div>
  );
}
