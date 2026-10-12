"use client";
import React, { useState } from "react";

/**
 * OpenResponse — an OPEN-ENDED reflection question (Tarbiya / Oʻqish). It is
 * deliberately UNGRADED and has NO text box: the child reads the question and
 * answers OUT LOUD (or thinks it through), can optionally reveal a sample answer
 * to compare against, then taps "Done" to continue. It never affects the score.
 *
 * Props: {
 *   sample?: string | {uz,ru,en},   // a model answer to reveal (optional)
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 * (placeholder / starters from earlier authoring are accepted but ignored now
 * that there is no input box.)
 */
const STR = {
  uz: { note: "Bu savol baholanmaydi — javobingni ovoz chiqarib ayt yoki oʻylab koʻr.", show: "Namuna javobni koʻrish", hide: "Namunani yashirish", sample: "Namuna javob", done: "Javob berdim ✓", next: "Yana" },
  ru: { note: "Этот вопрос не оценивается — ответь вслух или обдумай про себя.", show: "Показать образец ответа", hide: "Скрыть образец", sample: "Образец ответа", done: "Я ответил ✓", next: "Ещё" },
  en: { note: "This question isn't graded — answer out loud or think it through.", show: "Show a sample answer", hide: "Hide the sample", sample: "Sample answer", done: "I answered ✓", next: "Again" }
};
function pickL(v, lang) {
  if (v == null) return "";
  return typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

export default function OpenResponse({ sample, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [showSample, setShowSample] = useState(false);
  const [done, setDone] = useState(false);

  function finish() {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, { open: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <div style={S.note}>
        <span style={{ fontSize: 18 }}>💬</span>
        <span>{t.note}</span>
      </div>

      <div style={S.actions}>
        {sample != null && (
          <button onClick={() => setShowSample((v) => !v)} style={S.sampleBtn}>
            {showSample ? t.hide : t.show}
          </button>
        )}
        <button onClick={finish} disabled={done} style={{ ...S.done, ...(done ? S.doneOn : {}), marginLeft: "auto" }}>
          {t.done}
        </button>
      </div>

      {showSample && sample != null && (
        <div style={S.sampleBox}>
          <div style={S.sampleLbl}>⭐ {t.sample}</div>
          <div style={S.sampleTxt}>{pickL(sample, lang)}</div>
        </div>
      )}

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  note: { display: "flex", alignItems: "flex-start", gap: 8, background: "#f3f0ff", border: "1px solid #e0d7ff", borderRadius: 12, padding: "11px 14px", fontSize: 14.5, fontWeight: 700, color: "#5a2d82" },
  actions: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 14 },
  sampleBtn: { border: "2px solid #ffd873", background: "#fff8e6", color: "#7a3e12", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 800, padding: "11px 18px", borderRadius: 999 },
  done: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "11px 26px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  doneOn: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  sampleBox: { marginTop: 12, background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 14, padding: "12px 16px" },
  sampleLbl: { fontSize: 13, fontWeight: 800, color: "#b9821f", marginBottom: 4 },
  sampleTxt: { fontSize: 16.5, fontWeight: 700, lineHeight: 1.5, color: "#33302b" },
  next: { display: "block", margin: "12px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
