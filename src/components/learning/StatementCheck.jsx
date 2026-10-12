"use client";
import React, { useMemo, useState } from "react";

/**
 * StatementCheck — a checklist of claims about a picture or topic; the child
 * marks each one "Rost" (true) or "Yolgʻon" (false). This is the Informatika
 * "rost va yolgʻon" task and, in computing terms, the child evaluates a list
 * of boolean conditions against evidence — like checking `if` conditions or
 * verifying facts one row at a time.
 *
 * Props: { scene?, title?, statements, trueLabel?, falseLabel?, lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - statements: [{ text: L10n, value: true|false }]
 *   - onAttempt(ok) fires once, when every row first has a choice; onCorrect()
 *     when every row is answered correctly.
 */
const STR = {
  uz: { instr: "Har bir gapni oʻqib, «Rost» yoki «Yolgʻon» ni tanla!", t: "Rost", f: "Yolgʻon", done: "Barakalla! Hammasi toʻgʻri!", retry: "Baʼzilari notoʻgʻri — qizil gaplarni tuzat", next: "Yana" },
  ru: { instr: "Прочитай каждое предложение и выбери «Верно» или «Неверно»!", t: "Верно", f: "Неверно", done: "Молодец! Всё верно!", retry: "Есть ошибки — исправь красные", next: "Ещё" },
  en: { instr: "Read each sentence, then choose 'True' or 'False'!", t: "True", f: "False", done: "Great! All correct!", retry: "Some are wrong — fix the red ones", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function StatementCheck({ scene, title, statements = [], trueLabel, falseLabel, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const tLab = trueLabel ? L(trueLabel, lang) : t.t;
  const fLab = falseLabel ? L(falseLabel, lang) : t.f;
  const [picks, setPicks] = useState(() => statements.map(() => null));
  const [scored, setScored] = useState(false);
  const [solved, setSolved] = useState(false);

  const allPicked = picks.every((p) => p !== null);
  const allCorrect = useMemo(
    () => statements.every((s, i) => picks[i] !== null && !!picks[i].v === !!s.value),
    [picks, statements]
  );

  function choose(i, val) {
    if (solved) return;
    setPicks((prev) => {
      const next = prev.slice();
      next[i] = { v: val };
      const filled = next.every((p) => p !== null);
      const ok = statements.every((s, k) => next[k] !== null && !!next[k].v === !!s.value);
      if (filled && !scored) {
        setScored(true);
        if (typeof onAttempt === "function") onAttempt(ok, { picks: next.map((p) => p && p.v) });
      }
      if (filled && ok) {
        setSolved(true);
        if (typeof onCorrect === "function") onCorrect();
      }
      return next;
    });
  }

  function rowState(i) {
    const p = picks[i];
    if (!p) return "idle";
    return !!p.v === !!statements[i].value ? "ok" : "bad";
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      {scene && <div style={S.scene} aria-hidden>{scene}</div>}
      {title && <div style={S.title}>{L(title, lang)}</div>}
      <div style={S.list}>
        {statements.map((s, i) => {
          const st = rowState(i);
          const p = picks[i];
          return (
            <div key={i} className={st === "bad" ? "scShake" : ""} style={{ ...S.row, ...(st === "ok" ? S.rowOk : st === "bad" ? S.rowBad : {}) }}>
              <span style={S.text}>{L(s.text, lang)}</span>
              <span style={S.btns}>
                <button onClick={() => choose(i, true)} disabled={solved}
                  style={{ ...S.tf, ...(p && p.v === true ? S.tfTrue : {}), cursor: solved ? "default" : "pointer" }}>
                  {tLab}
                </button>
                <button onClick={() => choose(i, false)} disabled={solved}
                  style={{ ...S.tf, ...(p && p.v === false ? S.tfFalse : {}), cursor: solved ? "default" : "pointer" }}>
                  {fLab}
                </button>
              </span>
            </div>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span>
          : allPicked && !allCorrect ? <span style={S.retry}>{t.retry}</span>
          : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes scShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.scShake{animation:scShake .44s}
button:focus-visible{outline:3px solid #12a6a0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#243b3a", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#7a9a98" },
  scene: { fontSize: 52, lineHeight: 1, marginBottom: 6 },
  title: { fontSize: 15, fontWeight: 800, color: "#0d8f89", marginBottom: 8 },
  list: { display: "flex", flexDirection: "column", gap: 8 },
  row: { display: "flex", alignItems: "center", gap: 8, textAlign: "left", background: "#f2fbfa", border: "2.5px solid #d3efec", borderRadius: 14, padding: "8px 10px" },
  rowOk: { background: "#eafcf1", border: "2.5px solid #46c06a" },
  rowBad: { background: "#fdeeea", border: "2.5px solid #e8553e" },
  text: { flex: 1, fontSize: 14.5, fontWeight: 700, color: "#243b3a", lineHeight: 1.25 },
  btns: { display: "flex", gap: 6, flexShrink: 0 },
  tf: { minWidth: 62, padding: "8px 10px", borderRadius: 10, border: "2.5px solid #cfe7e5", background: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#5b7877" },
  tfTrue: { background: "#12a6a0", borderColor: "#0d8f89", color: "#fff" },
  tfFalse: { background: "#e8734e", borderColor: "#cf5a37", color: "#fff" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#12a6a0", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #0d8f89" },
};
