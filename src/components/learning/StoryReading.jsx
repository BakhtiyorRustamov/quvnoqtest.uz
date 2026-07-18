"use client";
import React, { useState } from "react";

/**
 * StoryReading — a PROSE reading passage for the Oʻqish savodxonligi subject
 * (sibling of PoemReading, which is for poems). Shows a short text with a title
 * and one or more paragraphs in a warm "book page" card, then a big
 * "I have read it" button that completes the item so the lesson advances to the
 * comprehension questions. Not graded — it exists to PRESENT the text. The
 * passage stays in its original language; only the button label localizes.
 *
 * Props: { title?, paragraphs:[…], source?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - paragraphs: array of paragraph strings (rendered with normal wrapping).
 */
const STR = {
  uz: { read: "Oʻqib boʻldim ✓", next: "Yana" },
  ru: { read: "Я прочитал(а) ✓", next: "Ещё" },
  en: { read: "I have read it ✓", next: "Again" }
};

export default function StoryReading({
  title = "",
  paragraphs = [],
  source = "",
  lang = "uz",
  embedded = false,
  hideDone = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const [done, setDone] = useState(false);

  function finish() {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, { read: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.page}>
        <div style={S.spine} aria-hidden />
        {title && <div style={S.title}>{title}</div>}
        {paragraphs.map((p, i) => (
          <p key={i} style={S.para}>{p}</p>
        ))}
        {source && <div style={S.source}>{source}</div>}
      </div>

      {!hideDone && (
        <button onClick={finish} disabled={done} style={{ ...S.btn, ...(done ? S.btnDone : {}) }}>
          {t.read}
        </button>
      )}

      {!embedded && !hideDone && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes stIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`;
const S = {
  wrap: { maxWidth: 580, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  page: { position: "relative", background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 18, padding: "20px 24px 18px 32px", boxShadow: "0 14px 34px -18px rgba(90,60,20,.55)", textAlign: "left", animation: "stIn .35s ease" },
  spine: { position: "absolute", left: 12, top: 12, bottom: 12, width: 4, borderRadius: 4, background: "repeating-linear-gradient(#e8c98a,#e8c98a 6px,transparent 6px,transparent 12px)" },
  title: { fontSize: 22, fontWeight: 800, color: "#7a3e12", marginBottom: 10, textAlign: "center" },
  para: { fontSize: 17.5, fontWeight: 600, lineHeight: 1.7, color: "#33302b", margin: "0 0 12px", textIndent: "1.2em" },
  source: { marginTop: 2, textAlign: "right", fontSize: 12.5, color: "#9aa0a6", fontStyle: "italic" },
  btn: { marginTop: 16, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 17, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "13px 30px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  btnDone: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "10px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
