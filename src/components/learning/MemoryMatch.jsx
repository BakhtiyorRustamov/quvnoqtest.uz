"use client";
import React, { useMemo, useRef, useState } from "react";

/**
 * MemoryMatch — a flip-card concentration game. Cards start face-down; the child
 * flips two, and if they belong to the same pair they stay open, otherwise they
 * flip back. Each pair is two faces that go together (e.g. a jug and "clay", or a
 * grain and its bread). Wins when every pair is found.
 *
 * Props: { pairs: [{ a: {emoji?, label?}, b: {emoji?, label?} }], lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - 3–4 pairs recommended (6–8 cards).
 *   - onAttempt(ok) fires when a second card is flipped; onCorrect() when all
 *     pairs are matched.
 */
const STR = {
  uz: { instr: "Kartalarni ochib, juftini top!", done: "Barakalla! Hammasini topding!", next: "Yana" },
  ru: { instr: "Открывай карточки и находи пары!", done: "Молодец! Все пары найдены!", next: "Ещё" },
  en: { instr: "Flip the cards and find the pairs!", done: "Great! You found them all!", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function MemoryMatch({ pairs = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => {
    const list = [];
    pairs.forEach((p, i) => {
      list.push({ cid: `${i}a`, pid: i, face: p.a });
      list.push({ cid: `${i}b`, pid: i, face: p.b });
    });
    return shuffle(list);
  }, [pairs]);

  const [open, setOpen] = useState([]); // cids currently face-up (not yet matched), max 2
  const [matched, setMatched] = useState({}); // pid -> true
  const busy = useRef(false);
  const won = pairs.length > 0 && Object.keys(matched).length === pairs.length;

  function flip(card) {
    if (busy.current || won) return;
    if (matched[card.pid] || open.includes(card.cid)) return;
    const next = [...open, card.cid];
    setOpen(next);
    if (next.length === 2) {
      const [c1, c2] = next.map((cid) => cards.find((c) => c.cid === cid));
      const ok = c1.pid === c2.pid;
      if (typeof onAttempt === "function") onAttempt(ok, { a: c1.cid, b: c2.cid });
      if (ok) {
        setMatched((m) => {
          const nm = { ...m, [c1.pid]: true };
          if (Object.keys(nm).length === pairs.length && typeof onCorrect === "function") onCorrect();
          return nm;
        });
        setOpen([]);
      } else {
        busy.current = true;
        setTimeout(() => {
          setOpen([]);
          busy.current = false;
        }, 800);
      }
    }
  }

  const cols = cards.length <= 6 ? 3 : 4;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={{ ...S.grid, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cards.map((card) => {
          const isOpen = open.includes(card.cid) || matched[card.pid];
          const isDone = matched[card.pid];
          const cap = L(card.face?.label, lang);
          return (
            <button
              key={card.cid}
              onClick={() => flip(card)}
              disabled={won}
              aria-label={isOpen ? cap || "karta" : "yopiq karta"}
              style={{ ...S.card, ...(isOpen ? S.faceUp : {}), ...(isDone ? S.done : {}) }}
            >
              {isOpen ? (
                <span style={S.faceInner}>
                  {card.face?.emoji && <span style={S.emoji} aria-hidden>{card.face.emoji}</span>}
                  {cap && <span style={S.cap}>{cap}</span>}
                </span>
              ) : (
                <span style={S.back} aria-hidden>❓</span>
              )}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gap: 10, justifyItems: "stretch" },
  card: { position: "relative", aspectRatio: "3 / 4", minHeight: 82, borderRadius: 16, border: "3px solid #d9e6c4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4, background: "#eef2f7", boxShadow: "0 4px 0 rgba(80,90,40,.12)", transition: "background .15s, border-color .15s" },
  faceUp: { background: "#fff", borderColor: "#2f9fe0" },
  done: { background: "#eefcf2", borderColor: "#46c06a" },
  faceInner: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 },
  emoji: { fontSize: 34, lineHeight: 1 },
  cap: { fontSize: 12.5, fontWeight: 800, color: "#3c5a1e", textAlign: "center", lineHeight: 1.1 },
  back: { fontSize: 30, opacity: 0.55 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
