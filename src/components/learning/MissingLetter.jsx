"use client";
import React, { useMemo, useState } from "react";

/**
 * MissingLetter — a word is shown with one letter missing (o_ma); the child taps
 * the letter tile that fills the gap. This is the Alifbe "harfni toʻldir" (fill
 * the letter) task — it checks that the child links a sound to its letter inside
 * a real word, which is a step beyond reading a whole spelling. Works with
 * digraphs (oʻ, gʻ, sh) too, since the word is given as an array of letters.
 *
 * Props: { emoji?, label?, letters, blank, choices, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - letters: the full word as an array, e.g. ["o","l","m","a"] or ["gʻ","o","z"].
 *   - blank: index of the missing letter; the correct answer is letters[blank].
 *   - choices: 3–4 letter strings to choose from (one equals letters[blank]).
 *   - onAttempt(ok) per tap; onCorrect() when the gap is filled correctly.
 */
const STR = {
  uz: { instr: "Yetishmayotgan harfni top va boʻsh katakka qoʻy!", done: "Barakalla! Soʻz toʻldi!", retry: "Bu harf emas — yana oʻyla", next: "Yana" },
  ru: { instr: "Найди недостающую букву и заполни пропуск!", done: "Молодец! Слово готово!", retry: "Не та буква — подумай ещё", next: "Ещё" },
  en: { instr: "Find the missing letter and fill the gap!", done: "Great! The word is complete!", retry: "Not that letter — think again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ch: v, _id: i }));
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}

export default function MissingLetter({ emoji, label, letters = [], blank = 0, choices = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const answer = String(letters[blank] ?? "");
  const tiles = useMemo(() => shuffle(choices), [choices]);
  const [solved, setSolved] = useState(false);
  const [shakeId, setShakeId] = useState(null);

  function tap(tile) {
    if (solved) return;
    const ok = String(tile.ch) === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { ch: tile.ch });
    if (ok) { setSolved(true); if (typeof onCorrect === "function") onCorrect(); }
    else { setShakeId(tile._id); setTimeout(() => setShakeId(null), 460); }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      {emoji && <div style={S.emoji} aria-hidden>{emoji}</div>}
      {label && <div style={S.label}>{L(label, lang)}</div>}
      <div style={S.word}>
        {letters.map((ch, i) => (
          i === blank
            ? <span key={i} style={{ ...S.slot, ...(solved ? S.slotOn : {}) }}>{solved ? answer : "_"}</span>
            : <span key={i} style={S.fixed}>{ch}</span>
        ))}
      </div>
      <div style={S.row}>
        {tiles.map((tile) => (
          <button key={tile._id} onClick={() => tap(tile)} disabled={solved}
            className={shakeId === tile._id ? "mlShake" : ""}
            style={{ ...S.tile, cursor: solved ? "default" : "pointer" }}>
            {tile.ch}
          </button>
        ))}
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

const CSS = `@keyframes mlShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.mlShake{animation:mlShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  emoji: { fontSize: 56, lineHeight: 1, marginBottom: 4 },
  label: { fontSize: 14, fontWeight: 800, color: "#6b7280", marginBottom: 8 },
  word: { display: "flex", justifyContent: "center", gap: 6, marginBottom: 18 },
  fixed: { minWidth: 44, height: 58, borderRadius: 12, border: "3px solid #eadfd0", background: "#fff", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900, color: "#33302b", padding: "0 4px" },
  slot: { minWidth: 44, height: 58, borderRadius: 12, border: "3px dashed #f4693b", background: "#fff8f4", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900, color: "#c9c9c9", padding: "0 4px", boxShadow: "0 0 0 3px rgba(244,105,59,.15)" },
  slotOn: { border: "3px solid #46c06a", background: "#eefcf2", color: "#33302b", boxShadow: "none" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  tile: { minWidth: 52, height: 58, padding: "0 8px", borderRadius: 12, border: "3px solid #d9e6c4", background: "#fff", fontFamily: "inherit", fontSize: 26, fontWeight: 900, color: "#33302b", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
