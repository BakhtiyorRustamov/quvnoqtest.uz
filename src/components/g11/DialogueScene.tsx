'use client';

import { Fragment, useEffect, useRef } from 'react';
import type { CastMember, DialogueScene as Scene } from '@/content/g11/board/types';

/**
 * A dialogue step of a language lesson. The lines appear one by one while
 * they are read aloud; the look changes with the scene style:
 *   chat      — messenger bubbles
 *   phone     — a group chat on a phone screen
 *   stage     — characters face to face with a speech bubble
 *   interview — a radio / podcast transcript
 * On "Tushunmadim" every line shows its Uzbek translation.
 */
export default function DialogueScene({
  scene,
  cast,
  shown,
  active,
  showUz
}: {
  scene: Scene;
  cast: Record<string, CastMember>;
  /** how many lines are visible */
  shown: number;
  /** line being read now (-1 = none) */
  active: number;
  showUz: boolean;
}) {
  const end = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // scroll the transcript box only (never the page)
    const box = end.current?.parentElement;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [shown, showUz]);

  const speakers = [...new Set(scene.lines.map((l) => l.who))];
  const lines = scene.lines.slice(0, shown);
  const typing = shown < scene.lines.length ? scene.lines[shown] : null;
  const who = (id: string) => cast[id] ?? { name: id, emoji: '', color: '#64748b', azure: '' };
  /** a speaker shown as initials in a coloured circle (no cartoon faces) */
  const Avatar = ({ id, size = 32, dim = false }: { id: string; size?: number; dim?: boolean }) => {
    const c = who(id);
    const ini = c.name
      .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '')
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return (
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-full font-black text-white ${dim ? 'opacity-50' : ''}`}
        style={{ width: size, height: size, background: c.color, fontSize: size * 0.4 }}
      >
        {ini}
      </span>
    );
  };

  const mark = (text: string) => {
    if (!scene.words?.length) return text;
    // whole words only ("any" must not light up inside "anything")
    const re = new RegExp(`(?<![\\p{L}’'])(${scene.words.map((w) => w.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}])`, 'giu');
    return text.split(re).map((part, i) =>
      i % 2 ? (
        <mark key={i} className="rounded bg-brand-orange/20 px-0.5 font-black text-ink">
          {part}
        </mark>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
  };

  const words = scene.words?.length ? (
    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink/10 pt-3">
      {scene.words.map((w) => (
        <span key={w.en} className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-[13px] font-bold text-ink">
          {w.en} <span className="text-ink/50">— {w.uz}</span>
        </span>
      ))}
    </div>
  ) : null;

  const Uz = ({ t }: { t: string }) => (showUz ? <span className="mt-1 block text-[13.5px] font-semibold italic leading-snug text-ink/55">{t}</span> : null);

  if (scene.style === 'interview') {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
        <div className="flex items-center gap-2 bg-ink px-4 py-2.5 text-white">
          <span className="text-lg" aria-hidden>
            🎙️
          </span>
          <span className="text-sm font-black tracking-wide">{scene.place}</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-error px-2 py-0.5 text-[11px] font-black">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> ON AIR
          </span>
        </div>
        <div className="max-h-[360px] space-y-2.5 overflow-y-auto px-4 py-3">
          {lines.map((l, i) => (
            <p key={i} className={`text-[16px] leading-relaxed text-ink transition ${i === active ? '' : 'opacity-80'}`}>
              <span className="mr-2 text-[12px] font-black uppercase tracking-wider" style={{ color: who(l.who).color }}>
                {who(l.who).name}
              </span>
              <span className="font-semibold">{mark(l.text)}</span>
              <Uz t={l.uz} />
            </p>
          ))}
          {typing && <p className="text-sm font-bold text-ink/30">…</p>}
          <div ref={end} />
          {words}
        </div>
      </div>
    );
  }

  if (scene.style === 'stage') {
    const cur = scene.lines[Math.max(0, Math.min(active >= 0 ? active : shown - 1, scene.lines.length - 1))];
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
        <div className="bg-gradient-to-b from-brand-blue/15 to-transparent px-4 pb-2 pt-3 text-center text-sm font-black text-ink/60">{scene.place}</div>
        <div className="px-4">
          {shown > 0 && cur && (
            <div className="relative mx-auto max-w-md rounded-2xl border-2 bg-white px-4 py-3 text-center text-[17px] font-bold leading-snug text-ink" style={{ borderColor: who(cur.who).color }}>
              {mark(cur.text)}
              <Uz t={cur.uz} />
            </div>
          )}
          <div className="mt-3 flex items-end justify-center gap-6">
            {speakers.map((id) => {
              const on = cur && cur.who === id && shown > 0;
              return (
                <div key={id} className={`flex flex-col items-center transition ${on ? 'scale-110' : 'opacity-60'}`}>
                  <Avatar id={id} size={52} />
                  <span className="mt-1 text-[13px] font-black" style={{ color: who(id).color }}>
                    {who(id).name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 max-h-[160px] space-y-1 overflow-y-auto border-t border-ink/10 px-4 py-2.5">
          {lines.map((l, i) => (
            <p key={i} className={`text-[14px] leading-snug ${i === active ? 'font-black text-ink' : 'font-semibold text-ink/55'}`}>
              <span style={{ color: who(l.who).color }}>{who(l.who).name}:</span> {l.text}
            </p>
          ))}
          <div ref={end} />
          {words}
        </div>
      </div>
    );
  }

  // chat and phone: bubbles; in a phone the first speaker is "me" (right side)
  const phone = scene.style === 'phone';
  const meId = phone ? speakers[0] : speakers[1];
  const body = (
    <div className={`space-y-2.5 overflow-y-auto ${phone ? 'max-h-[380px] px-3 py-3' : 'max-h-[420px] px-1 py-2'}`}>
      {lines.map((l, i) => {
        const me = l.who === meId;
        const c = who(l.who);
        return (
          <div key={i} className={`flex items-end gap-2 ${me ? 'flex-row-reverse' : ''}`}>
            <span className="mb-0.5">
              <Avatar id={l.who} />
            </span>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[16px] font-semibold leading-snug shadow-sm transition ${me ? 'rounded-br-md text-white' : 'rounded-bl-md bg-white text-ink'} ${
                i === active ? 'ring-2 ring-brand-orange/50' : ''
              }`}
              style={me ? { background: c.color } : { borderLeft: `3px solid ${c.color}` }}
            >
              {!me && <span className="mb-0.5 block text-[12px] font-black" style={{ color: c.color }}>{c.name}</span>}
              {mark(l.text)}
              {showUz && <span className={`mt-1 block text-[13.5px] font-semibold italic leading-snug ${me ? 'text-white/80' : 'text-ink/55'}`}>{l.uz}</span>}
            </div>
          </div>
        );
      })}
      {typing && (
        <div className={`flex items-end gap-2 ${typing.who === meId ? 'flex-row-reverse' : ''}`}>
          <Avatar id={typing.who} dim />
          <span className="rounded-2xl bg-white px-3 py-2 text-ink/40 shadow-sm">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:240ms]" />
            </span>
          </span>
        </div>
      )}
      <div ref={end} />
    </div>
  );

  if (phone) {
    return (
      <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border-[6px] border-ink bg-[#e9eef5] shadow-card">
        <div className="flex items-center gap-2 bg-white px-4 py-2.5">
          <span className="text-xl" aria-hidden>
            💬
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-black text-ink">{scene.place}</p>
            <p className="text-[11px] font-bold text-brand-green">{speakers.length} members · online</p>
          </div>
        </div>
        {body}
        {words && <div className="bg-white px-3 pb-3">{words}</div>}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-3 shadow-card">
      <p className="mb-1 text-center text-sm font-black text-ink/55">{scene.place}</p>
      {body}
      {words}
    </div>
  );
}
