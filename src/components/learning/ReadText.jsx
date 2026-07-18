"use client";
import React, { useMemo, useState } from "react";

/**
 * ReadText — read a short passage, then answer a comprehension question. The
 * Alifbe primer moves from single words to connected text ("Guruch — donli
 * ekin…", "Qish…", "Sehrli soʻzlar"); this widget shows the passage on a ruled
 * reading card, then a question with 2–4 written answers. The child reads and
 * taps the right one. First real reading comprehension.
 *
 * Props: { text, question, options: [{ id?, label, correct? }], emoji?,
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - text: the passage — a string or { uz, ru, en }. Use \n for line breaks.
 *   - options: 2–4 answers; EXACTLY ONE has correct:true. label may be a string
 *     or { uz, ru, en }.
 *   - onAttempt(ok) per tap; onCorrect() when the right answer is tapped.
 */
const STR = {
  uz: { read: "Matnni oʻqi, soʻng savolga javob ber.", done: "Barakalla! Toʻgʻri javob!", retry: "Matnni yana oʻqi", next: "Yana" },
  ru: { read: "Прочитай текст и ответь на вопрос.", done: "Молодец! Верный ответ!", retry: "Прочитай текст ещё раз", next: "Ещё" },
  en: { read: "Read the text, then answer the question.", done: "Great! Correct answer!", retry: "Read the text again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}

export default function ReadText({ text, question, options = [], emoji, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(options), [options]);
  const [solvedId, setSolvedId] = useState(null);
  const [badId, setBadId] = useState(null);
  const solved = solvedId !== null;
  const lines = String(L(text, lang)).split("\n");

  function tap(c) {
    if (solved) return;
    const ok = !!c.correct;
    if (typeof onAttempt === "function") onAttempt(ok, { id: c._id });
    if (ok) { setSolvedId(c._id); if (typeof onCorrect === "function") onCorrect(); }
    else { setBadId(c._id); setTimeout(() => setBadId(null), 460); }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.read}</p>
      <div style={S.card}>
        {emoji && <span style={S.emoji} aria-hidden>{emoji}</span>}
        <div style={S.text}>{lines.map((ln, i) => <span key={i} style={S.line}>{ln}</span>)}</div>
      </div>
      <p style={S.q}>{L(question, lang)}</p>
      <div style={S.opts}>
        {cards.map((c) => {
          const on = solvedId === c._id;
          return (
            <button key={c._id} onClick={() => tap(c)} disabled={solved}
              className={badId === c._id ? "rtShake" : ""}
              style={{ ...S.opt, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer" }}>
              {L(c.label, lang)}{on && <span style={S.tick} aria-hidden> ✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : badId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes rtShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.rtShake{animation:rtShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  card: { position: "relative", display: "flex", alignItems: "center", gap: 12, textAlign: "left", background: "#fffef7", border: "2px solid #f2c6b6", borderRadius: 18, padding: "16px 18px", boxShadow: "0 5px 0 rgba(180,90,60,.10)", backgroundImage: "linear-gradient(to bottom, transparent 33px, #f2ddd2 33px, #f2ddd2 34px, transparent 34px)", backgroundSize: "100% 34px" },
  emoji: { fontSize: 48, lineHeight: 1, flexShrink: 0 },
  text: { display: "flex", flexDirection: "column", gap: 2 },
  line: { fontSize: 19, fontWeight: 800, lineHeight: "34px", color: "#33302b" },
  q: { margin: "16px 0 12px", fontSize: 17, fontWeight: 900, color: "#33302b" },
  opts: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  opt: { minWidth: 92, padding: "12px 18px", borderRadius: 14, border: "3px solid #d9e6c4", background: "#fff", fontFamily: "inherit", fontSize: 18, fontWeight: 800, color: "#33302b", boxShadow: "0 5px 0 rgba(80,90,40,.10)" },
  on: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)", transform: "translateY(-2px)" },
  tick: { color: "#2f9e54", fontWeight: 900 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
