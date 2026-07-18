"use client";
import React, { useMemo, useState } from "react";

/**
 * ReadWord — read and tap the word that names the picture. A big emoji is the
 * clue; below it are 3–4 written words (one correct), and the child reads each
 * and taps the right spelling. This is the Alifbe reading check and the primer's
 * "soʻzdagi xatoni top" (spot the misspelling) task: the distractors are close
 * misspellings (oʻrdak / urdak / oʻrdaq), so the child must actually decode.
 *
 * Props: { emoji, options: [{ id?, word, correct? }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - options: 2–4 word tiles; EXACTLY ONE has correct:true.
 *   - onAttempt(ok) per tap; onCorrect() when the right word is tapped.
 */
const STR = {
  uz: { instr: "Rasmga mos toʻgʻri soʻzni oʻqib bos!", done: "Barakalla! Toʻgʻri oʻqiding!", retry: "Diqqat bilan qayta oʻqi", next: "Yana" },
  ru: { instr: "Прочитай и нажми верное слово к картинке!", done: "Молодец! Верно прочитал!", retry: "Прочитай внимательно ещё раз", next: "Ещё" },
  en: { instr: "Read and tap the correct word for the picture!", done: "Great! You read it right!", retry: "Read carefully again", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function ReadWord({ emoji, options = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(options), [options]);
  const [solvedId, setSolvedId] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const solved = solvedId !== null;

  function tap(card) {
    if (solved) return;
    const ok = !!card.correct;
    if (typeof onAttempt === "function") onAttempt(ok, { word: card.word });
    if (ok) {
      setSolvedId(card._id);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShakeId(card._id);
      setTimeout(() => setShakeId(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {emoji && <div style={S.emoji} aria-hidden>{emoji}</div>}
      <p style={S.instr}>{t.instr}</p>
      <div style={S.row}>
        {cards.map((c) => {
          const on = solvedId === c._id;
          return (
            <button
              key={c._id}
              onClick={() => tap(c)}
              disabled={solved}
              className={shakeId === c._id ? "rwShake" : ""}
              style={{ ...S.tile, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer" }}
            >
              {c.word}
              {on && <span style={S.tick} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shakeId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes rwShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.rwShake{animation:rwShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  emoji: { fontSize: 68, lineHeight: 1, margin: "2px 0 8px" },
  instr: { margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  tile: { position: "relative", minWidth: 110, padding: "14px 20px", borderRadius: 16, border: "3px solid #d9e6c4", background: "#fff", fontFamily: "inherit", fontSize: 22, fontWeight: 900, letterSpacing: 0.5, color: "#33302b", boxShadow: "0 5px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  on: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)", transform: "translateY(-2px)" },
  tick: { position: "absolute", top: 4, right: 8, fontSize: 16, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
