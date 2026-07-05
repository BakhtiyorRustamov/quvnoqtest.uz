"use client";
import React, { useMemo, useState } from "react";

/**
 * SentenceOrder — build a sentence from shuffled WORD tiles (Ona tili, grades 1–2).
 * Shows the words of a sentence jumbled as tiles; the child taps them one at a
 * time in the correct order. Each correct tap slides the word into the sentence
 * row; a wrong tap shakes. Solved when every word is placed. This is the
 * word-level sibling of WordScramble (which orders letters) and fills the
 * "gap / matn / nutq" concepts that need ordering words into a thought.
 *
 * Props: { words:[…], clue?, emoji?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - words: the sentence split into tokens IN CORRECT ORDER
 *            (e.g. ["Men", "kitob", "oʻqiyman."]).
 *   - clue:  optional {uz,ru,en} line shown above the tiles.
 *   - emoji: optional decorative emoji shown with the clue.
 */
const STR = {
  uz: { instr: "Soʻzlarni tartibla va gap tuz!", done: "Barakalla! Toʻgʻri gap!", retry: "Avval boshqa soʻz keladi", next: "Yana" },
  ru: { instr: "Расставь слова и составь предложение!", done: "Молодец! Верное предложение!", retry: "Сначала идёт другое слово", next: "Ещё" },
  en: { instr: "Order the words to make a sentence!", done: "Great! Correct sentence!", retry: "A different word comes first", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  // guard against the identity shuffle for short sentences
  if (x.length > 1 && x.every((it, i) => it.id === i)) [x[0], x[1]] = [x[1], x[0]];
  return x;
}

export default function SentenceOrder({ words = [], clue, emoji, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const tiles = useMemo(() => shuffle(words), [words]);
  const [placed, setPlaced] = useState([]); // tile ids in chosen order
  const [shake, setShake] = useState(null);
  const solved = placed.length === words.length && words.length > 0;

  function tap(tile) {
    if (solved || placed.includes(tile.id)) return;
    const expected = words[placed.length];
    const ok = tile.v === expected;
    if (typeof onAttempt === "function") onAttempt(ok, { word: tile.v });
    if (ok) {
      const np = [...placed, tile.id];
      setPlaced(np);
      if (np.length === words.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  const placedVals = placed.map((id) => tiles.find((x) => x.id === id).v);
  const clueText = clue ? clue[lang] || clue.uz : null;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {clueText && (
        <p style={S.clue}>{emoji ? emoji + " " : ""}{clueText}</p>
      )}
      <p style={S.instr}>{t.instr}</p>
      <div style={S.row}>
        {placedVals.map((v, i) => (
          <div key={i} style={{ ...S.tile, ...S.tileOk }}>{v}</div>
        ))}
        {Array.from({ length: words.length - placedVals.length }, (_, i) => (
          <div key={"e" + i} style={{ ...S.tile, ...S.slot }}>·</div>
        ))}
      </div>
      <div style={S.pool}>
        {tiles.filter((x) => !placed.includes(x.id)).map((tile) => (
          <button
            key={tile.id}
            onClick={() => tap(tile)}
            disabled={solved}
            className={shake === tile.id ? "soShake" : ""}
            style={{ ...S.tile, ...S.pick, cursor: solved ? "default" : "pointer" }}
          >
            {tile.v}
          </button>
        ))}
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

const CSS = `@keyframes soShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.soShake{animation:soShake .42s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { textAlign: "center", margin: "0 0 8px", fontSize: 15, fontWeight: 800, color: "#1f3a5f" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 8, minHeight: 52 },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 18 },
  tile: { minWidth: 44, height: 48, padding: "0 14px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 14, fontFamily: "inherit", fontSize: 18, fontWeight: 800 },
  pick: { border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  tileOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  slot: { border: "2px dashed #e4dcc4", background: "#faf7ef", color: "#cfc7b2" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
