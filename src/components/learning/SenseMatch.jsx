"use client";
import React, { useState } from "react";

/**
 * SenseMatch — the signature task of the grade-1 Informatika unit "How do we
 * perceive the world?". A stimulus card is shown (a rainbow, a bell, a lemon…)
 * and the child taps the sense ORGAN used to perceive it: eyes, ears, nose,
 * tongue or skin. Rounds advance one by one; a wrong tap shakes. Self-grading.
 *
 * Props: { rounds: [{ emoji, label?, organ }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - organ ∈ 'eye' | 'ear' | 'nose' | 'tongue' | 'hand'.
 *   - onAttempt(ok) per tap; onCorrect() after the last round is right.
 */
const ORGANS = [
  { id: "eye", emoji: "👀", label: { uz: "Koʻz", ru: "Глаза", en: "Eyes" } },
  { id: "ear", emoji: "👂", label: { uz: "Quloq", ru: "Уши", en: "Ears" } },
  { id: "nose", emoji: "👃", label: { uz: "Burun", ru: "Нос", en: "Nose" } },
  { id: "tongue", emoji: "👅", label: { uz: "Til", ru: "Язык", en: "Tongue" } },
  { id: "hand", emoji: "✋", label: { uz: "Teri", ru: "Кожа", en: "Skin" } },
];
const STR = {
  uz: { instr: "Buni qaysi sezgi aʼzosi bilan bilamiz?", done: "Barakalla! Hammasini topding!", retry: "Boshqa aʼzo — yana urin", next: "Yana" },
  ru: { instr: "Каким органом чувств мы это узнаём?", done: "Молодец! Всё верно!", retry: "Другой орган — ещё раз", next: "Ещё" },
  en: { instr: "Which sense organ do we use for this?", done: "Great! You got them all!", retry: "Wrong organ — try again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function SenseMatch({ rounds = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [idx, setIdx] = useState(0);
  const [shake, setShake] = useState(null);
  const [done, setDone] = useState(false);
  const cur = rounds[idx] || {};

  function tap(organId) {
    if (done) return;
    const ok = organId === cur.organ;
    if (typeof onAttempt === "function") onAttempt(ok, { round: idx, organ: organId });
    if (ok) {
      if (idx + 1 >= rounds.length) { setDone(true); if (typeof onCorrect === "function") onCorrect(); }
      else setIdx(idx + 1);
      setShake(null);
    } else { setShake(organId); setTimeout(() => setShake(null), 460); }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.dots}>
        {rounds.map((_, i) => (
          <span key={i} style={{ ...S.dot, background: i < idx || done ? "#12a6a0" : i === idx ? "#7fd3ce" : "#e4eceb" }} />
        ))}
      </div>
      <div style={S.card}>
        <div style={S.stim} aria-hidden>{done ? "🎉" : cur.emoji}</div>
        {!done && cur.label && <div style={S.stimLabel}>{L(cur.label, lang)}</div>}
      </div>
      <div style={S.row}>
        {ORGANS.map((o) => (
          <button key={o.id} onClick={() => tap(o.id)} disabled={done}
            className={shake === o.id ? "smoShake" : ""}
            style={{ ...S.organ, ...(shake === o.id ? S.organBad : {}) }}>
            <span style={S.organEmoji} aria-hidden>{o.emoji}</span>
            <span style={S.organLabel}>{L(o.label, lang)}</span>
          </button>
        ))}
      </div>
      <div style={S.status} aria-live="polite">
        {done ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes smoShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.smoShake{animation:smoShake .44s}
button:focus-visible{outline:3px solid #12a6a0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 500, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  dots: { display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 },
  dot: { width: 9, height: 9, borderRadius: 999, background: "#e4eceb" },
  card: { background: "#eefbfa", border: "3px solid #bce7e3", borderRadius: 18, padding: "14px 10px", marginBottom: 14 },
  stim: { fontSize: 64, lineHeight: 1 },
  stimLabel: { marginTop: 4, fontSize: 15, fontWeight: 800, color: "#0d8f89" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  organ: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 64, padding: "8px 6px", borderRadius: 14, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  organBad: { borderColor: "#e8553e", background: "#fdeceb" },
  organEmoji: { fontSize: 30, lineHeight: 1 },
  organLabel: { fontSize: 12.5, fontWeight: 800, color: "#33302b" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#0d8f89", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #0a726d" },
};
