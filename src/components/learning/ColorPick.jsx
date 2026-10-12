"use client";
import React, { useState } from "react";

/**
 * ColorPick — choose colour(s) from labelled swatches (Tasviriy sanʼat), e.g.
 * "tap the rainbow colours" or "which colour is warm?". Real colour swatches,
 * NO emojis. GRADED: single-select grades on tap; multi-select grades on
 * "Check" (all correct chosen, none wrong).
 *
 * Props: {
 *   options: [{ id, color, label?: {uz,ru,en}, correct?: boolean }],
 *   multi?: boolean,
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { one: "Rangni tanla", many: "Toʻgʻri ranglarni tanla", check: "Tekshirish", correct: "Barakalla!", retry: "Yana urinib koʻr", next: "Keyingisi" },
  ru: { one: "Выбери цвет", many: "Выбери правильные цвета", check: "Проверить", correct: "Молодец!", retry: "Попробуй ещё", next: "Дальше" },
  en: { one: "Pick the colour", many: "Pick the correct colours", check: "Check", correct: "Well done!", retry: "Try again", next: "Next" }
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function ColorPick({
  options = [],
  multi = false,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const [sel, setSel] = useState(() => new Set());
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const first = React.useRef(null);

  const solved = status === "correct";

  function toggle(id, correct) {
    if (solved) return;
    if (multi) {
      setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
      setStatus("idle");
    } else {
      // single-select grades immediately
      const ok = !!correct;
      if (first.current === null) first.current = ok;
      setSel(new Set([id]));
      if (typeof onAttempt === "function") onAttempt(ok, { id });
      if (ok) { setStatus("correct"); if (typeof onCorrect === "function") onCorrect(); }
      else setStatus("wrong");
    }
  }

  function check() {
    if (solved) return;
    const ok = options.every((o) => (!!o.correct) === sel.has(o.id));
    if (first.current === null) first.current = ok;
    if (typeof onAttempt === "function") onAttempt(ok, { chosen: [...sel] });
    if (ok) { setStatus("correct"); if (typeof onCorrect === "function") onCorrect(); }
    else setStatus("wrong");
  }

  return (
    <div style={S.wrap}>
      <div style={S.lbl}>{multi ? t.many : t.one}</div>
      <div style={S.grid}>
        {options.map((o) => {
          const on = sel.has(o.id);
          const reveal = solved && o.correct;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id, o.correct)}
              aria-pressed={on}
              style={{ ...S.item, borderColor: reveal ? "#2f9e54" : on ? "#111" : "rgba(0,0,0,0.14)", background: on || reveal ? "#fff" : "#fbf7ef" }}
            >
              <span style={{ ...S.swatch, background: o.color, outline: on ? "3px solid rgba(0,0,0,0.12)" : "none" }} />
              {o.label && <span style={S.cap}>{L(o.label, lang)}</span>}
              {reveal && <span style={S.tick} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>

      {multi && !solved && (
        <button type="button" onClick={check} style={S.check}>{t.check}</button>
      )}

      <div style={S.status} aria-live="polite">
        {status === "correct" && <span style={S.ok}>{t.correct}</span>}
        {status === "wrong" && <span style={S.bad}>{t.retry}</span>}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const S = {
  wrap: { maxWidth: 440, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  lbl: { textAlign: "center", fontWeight: 800, fontSize: 15, color: "#6b6157", marginBottom: 12 },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  item: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, border: "2px solid", borderRadius: 16, padding: "12px 14px", cursor: "pointer", minWidth: 78, fontFamily: "inherit" },
  swatch: { width: 44, height: 44, borderRadius: "50%", border: "2px solid rgba(0,0,0,0.15)" },
  cap: { fontSize: 13.5, fontWeight: 800, color: "#33302b" },
  tick: { position: "absolute", top: 4, right: 6, color: "#2f9e54", fontWeight: 900, fontSize: 15 },
  check: { display: "block", margin: "16px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15.5, fontWeight: 800, color: "#fff", background: "#1fa7e0", padding: "10px 26px", borderRadius: 999, boxShadow: "0 5px 0 #1a86b4" },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 },
  ok: { fontSize: 18, fontWeight: 800, color: "#2f9e54" },
  bad: { fontSize: 15, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
