"use client";
import React, { useMemo, useState } from "react";

/**
 * WordScramble — rebuild a jumbled word (Ona tili, grades 1–2). Shows the
 * letters of a word shuffled as tiles; the child taps them one at a time in the
 * correct order to spell the word. Each correct tap slides the letter into the
 * answer row; a wrong tap shakes. Solved when every letter is placed.
 *
 * Props: { word, letters?, clue?, emoji?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - word:    the target word (e.g. "maktab").
 *   - letters: optional explicit letter array (use when a word contains
 *              multi-codepoint Uzbek letters like "oʻ"/"gʻ"); defaults to
 *              word.split("").
 *   - clue:    optional {uz,ru,en} hint shown above the tiles.
 *   - emoji:   optional decorative emoji shown with the clue.
 */
const STR = {
  uz: { instr: "Harflarni tartibla — soʻzni yigʻ!", done: "Barakalla! Soʻz tayyor!", retry: "Bu harf hali emas", next: "Yana" },
  ru: { instr: "Расставь буквы — собери слово!", done: "Молодец! Слово готово!", retry: "Эта буква пока не та", next: "Ещё" },
  en: { instr: "Order the letters — build the word!", done: "Great! The word is ready!", retry: "Not this letter yet", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  // guard against the shuffle landing back on the original order
  if (x.every((t, i) => t.id === i) && x.length > 1) return shuffle(a);
  return x;
}

export default function WordScramble({
  word = "maktab",
  letters,
  clue,
  emoji = "🔤",
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STR[lang] || STR.uz;
  const target = useMemo(() => (letters && letters.length ? letters : String(word).split("")), [word, letters]);
  const tiles = useMemo(() => shuffle(target), [target]);
  const [placed, setPlaced] = useState([]); // tile ids in chosen order
  const [shake, setShake] = useState(null);
  const solved = placed.length === target.length && target.length > 0;
  const clueText = clue ? clue[lang] ?? clue.uz : null;

  function tap(tile) {
    if (solved || placed.includes(tile.id)) return;
    const expected = target[placed.length];
    const ok = tile.v === expected;
    if (typeof onAttempt === "function") onAttempt(ok, { letter: tile.v });
    if (ok) {
      const np = [...placed, tile.id];
      setPlaced(np);
      if (np.length === target.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  const placedVals = placed.map((id) => tiles.find((x) => x.id === id).v);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 30 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}
      <p style={S.instr}>{t.instr}</p>
      <div style={S.row}>
        {placedVals.map((v, i) => (
          <div key={i} style={{ ...S.tile, ...S.tileOk }}>{v}</div>
        ))}
        {Array.from({ length: target.length - placedVals.length }, (_, i) => (
          <div key={"e" + i} style={{ ...S.tile, ...S.slot }} />
        ))}
      </div>
      <div style={S.pool}>
        {tiles.filter((x) => !placed.includes(x.id)).map((tile) => (
          <button
            key={tile.id}
            onClick={() => tap(tile)}
            disabled={solved}
            className={shake === tile.id ? "noShakeW" : ""}
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

const CSS = `@keyframes noShakeW{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.noShakeW{animation:noShakeW .42s}`;
const S = {
  wrap: { maxWidth: 500, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, minHeight: 56 },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 18 },
  tile: { minWidth: 46, height: 56, padding: "0 6px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 14, fontFamily: "inherit", fontSize: 24, fontWeight: 800, textTransform: "lowercase" },
  pick: { border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  tileOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  slot: { border: "2px dashed #e4dcc4", background: "#faf7ef", color: "transparent" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
