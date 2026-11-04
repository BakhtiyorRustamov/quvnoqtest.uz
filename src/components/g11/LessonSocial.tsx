'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/client';

type C = { id: number; author: string; body: string; at: string; mine: boolean };

const T = {
  share: 'Ulashish',
  copied: 'Havola nusxalandi!',
  comments: 'Izohlar',
  placeholder: 'Savolingiz yoki fikringizni yozing…',
  send: 'Yuborish',
  none: 'Hozircha izoh yoʻq. Birinchi boʻlib yozing!',
  anon: 'Oʻquvchi',
  del: 'Oʻchirish',
  links: 'Izohda havola yoki @username boʻlmasin.',
  limit: 'Juda koʻp izoh. Birozdan keyin urinib koʻring.',
  error: 'Yuborilmadi. Qayta urinib koʻring.'
};

const when = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

/** Share button + comments under a lesson. */
export default function LessonSocial({ page, title }: { page: string; title: string }) {
  const [list, setList] = useState<C[] | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    api<{ comments: C[] }>(`/api/comments?page=${encodeURIComponent(page)}`).then(({ data }) => setList(data?.comments ?? []));
  }, [page]);

  async function share() {
    const url = window.location.href;
    const data = { title: `${title} — MoviyDaftar`, text: title, url };
    try {
      if (navigator.share) return await navigator.share(data);
    } catch {
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote(T.copied);
      setTimeout(() => setNote(null), 2000);
    } catch {
      /* ignore */
    }
  }

  async function send() {
    const body = text.trim();
    if (body.length < 2 || busy) return;
    setBusy(true);
    setNote(null);
    const { data, ok } = await api<{ comment?: C; error?: string }>('/api/comments', { method: 'POST', json: { page, body } });
    setBusy(false);
    if (ok && data?.comment) {
      setList((l) => [data.comment!, ...(l ?? [])]);
      setText('');
    } else setNote(data?.error === 'links' ? T.links : data?.error === 'rate_limited' ? T.limit : T.error);
  }

  async function remove(id: number) {
    setList((l) => (l ?? []).filter((c) => c.id !== id));
    await api(`/api/comments?id=${id}`, { method: 'DELETE' });
  }

  const tg = typeof window !== 'undefined' ? `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}` : '#';

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue bg-white px-4 py-2 font-black text-brand-blue active:translate-y-px">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          {T.share}
        </button>
        <a href={tg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-4 py-2 font-black text-white active:translate-y-px">
          Telegram
        </a>
        {note && <span className="text-sm font-bold text-ink/60">{note}</span>}
      </div>

      <h2 className="mt-8 text-xl font-black text-ink">💬 {T.comments}{list && list.length > 0 ? ` (${list.length})` : ''}</h2>
      <div className="mt-3 rounded-2xl border border-ink/10 bg-white p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 1000))}
          placeholder={T.placeholder}
          rows={3}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-ink/10 px-3 py-2 text-[15px] font-semibold text-ink outline-none focus:border-brand-blue"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-bold text-ink/40">{text.length}/1000</span>
          <button type="button" onClick={send} disabled={busy || text.trim().length < 2} className="rounded-full bg-brand-blue px-5 py-2 font-black text-white disabled:opacity-40">
            {T.send}
          </button>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {list === null ? null : list.length === 0 ? (
          <li className="px-1 text-sm font-semibold text-ink/50">{T.none}</li>
        ) : (
          list.map((c) => (
            <li key={c.id} className="rounded-2xl bg-white px-3.5 py-2.5 shadow-card">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-ink/45">
                <span className="truncate text-ink/70">{c.author || T.anon}</span>
                <span className="shrink-0">
                  {when(c.at)}
                  {c.mine && (
                    <button type="button" onClick={() => remove(c.id)} className="ml-2 text-error/70 hover:text-error">
                      {T.del}
                    </button>
                  )}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap break-words text-[15px] font-semibold text-ink">{c.body}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
