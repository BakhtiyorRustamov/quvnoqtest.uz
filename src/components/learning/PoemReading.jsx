"use client";
import React, { useState } from "react";

/**
 * PoemReading — a READING PASSAGE for the Oʻqish savodxonligi (reading literacy)
 * subject. Shows a poem/short text with its title and author in a warm "book
 * page" card, line by line, then a big "I have read it" button that completes
 * the item so the lesson advances to the comprehension questions. It is not
 * graded (reading always counts as done) — it exists so a lesson can PRESENT the
 * text the questions are about. The passage stays in its original language
 * (Uzbek); only the button/label localizes.
 *
 * Props: { title?, author?, lines:[…], source?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - lines: the poem/text split into lines (each rendered on its own row).
 *   - title/author/source: shown above / below the text.
 */
const STR = {
  uz: { instr: "Sheʼrni ifodali oʻqing", read: "Oʻqib boʻldim ✓", by: "muallif", next: "Yana" },
  ru: { instr: "Прочитай выразительно", read: "Я прочитал(а) ✓", by: "автор", next: "Ещё" },
  en: { instr: "Read it aloud", read: "I have read it ✓", by: "author", next: "Again" }
};

export default function PoemReading({
  title = "",
  author = "",
  lines = [],
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
        <div style={S.poem}>
          {lines.map((ln, i) => (
            <div key={i} style={{ ...S.line, ...(ln === "" ? S.gap : {}) }}>{ln || " "}</div>
          ))}
        </div>
        {author && <div style={S.author}>✍️ {author}</div>}
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

const CSS = `@keyframes pmIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  page: { position: "relative", background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 18, padding: "20px 22px 18px 30px", boxShadow: "0 14px 34px -18px rgba(90,60,20,.55)", textAlign: "left", animation: "pmIn .35s ease" },
  spine: { position: "absolute", left: 12, top: 12, bottom: 12, width: 4, borderRadius: 4, background: "repeating-linear-gradient(#e8c98a,#e8c98a 6px,transparent 6px,transparent 12px)" },
  title: { fontSize: 22, fontWeight: 800, color: "#7a3e12", marginBottom: 10, textAlign: "center" },
  poem: { fontSize: 19, fontWeight: 600, lineHeight: 1.7, color: "#33302b", whiteSpace: "pre-wrap" },
  line: { padding: "1px 0" },
  gap: { height: 10 },
  author: { marginTop: 14, textAlign: "right", fontStyle: "italic", fontWeight: 700, color: "#5a2d82" },
  source: { marginTop: 2, textAlign: "right", fontSize: 12.5, color: "#9aa0a6" },
  btn: { marginTop: 16, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 17, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "13px 30px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  btnDone: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "10px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
