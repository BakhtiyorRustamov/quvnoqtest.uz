"use client";
import React, { useMemo, useState } from "react";

/**
 * OddOneOut — tap the single word that does NOT belong (Ona tili, grades 1–2).
 * Shows a small row of word tiles that share a category, plus exactly one that
 * breaks it (e.g. "mushuk, it, tarvuz, toychoq" → tarvuz is not an animal).
 * Tapping the odd tile turns it green and solves the item; tapping a belonging
 * tile shakes. This is the interactive form of the textbook's "ortiqcha soʻzni
 * top" exercise — use it instead of a plain mcq for odd-one-out tasks.
 *
 * Props: { tiles: [{text, odd?}], clue?, emoji?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - tiles: 3–5 tiles; EXACTLY ONE has odd:true (the word that doesn't belong).
 *   - clue:  optional {uz,ru,en} line naming the shared category.
 */
const STR = {
  uz: { instr: "Ortiqcha soʻzni bos!", done: "Barakalla! Toping!", retry: "Bu mos keladi", next: "Yana" },
  ru: { instr: "Нажми лишнее слово!", done: "Молодец! Верно!", retry: "Это подходит", next: "Ещё" },
  en: { instr: "Tap the word that doesn't belong!", done: "Great! You found it!", retry: "That one fits", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function OddOneOut({ tiles = [], clue, emoji, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const shown = useMemo(() => shuffle(tiles), [tiles]);
  const [solvedId, setSolvedId] = useState(null);
  const [shake, setShake] = useState(null);
  const solved = solvedId !== null;
  const clueText = clue ? clue[lang] ?? clue.uz : null;

  function tap(tile) {
    if (solved) return;
    const ok = !!tile.odd;
    if (typeof onAttempt === "function") onAttempt(ok, { text: tile.text });
    if (ok) {
      setSolvedId(tile.id);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 28 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {shown.map((tile) => {
          const on = solvedId === tile.id;
          return (
            <button
              key={tile.id}
              onClick={() => tap(tile)}
              disabled={solved}
              className={shake === tile.id ? "oooShake" : ""}
              style={{ ...S.tile, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer" }}
            >
              {tile.text}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes oooShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.oooShake{animation:oooShake .42s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  tile: { position: "relative", minWidth: 64, padding: "12px 16px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 19, fontWeight: 800, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  on: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 rgba(70,192,106,.25)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
