"use client";
import React, { useMemo, useState } from "react";

/**
 * PickMany — tap ALL the correct pictures, then press Check. The natural-science
 * counterpart of "multi_select": pick every living thing / every wooden object /
 * every wild plant, etc. Grading fires on Check (so the child can adjust their
 * selection before committing).
 *
 * Props: { options: [{ id?, emoji, label?, correct? }], lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - options: 4–6 cards; ONE OR MORE have correct:true.
 *   - onAttempt(ok) fires on each Check press; onCorrect() when the picked set
 *     exactly matches the correct set.
 */
const STR = {
  uz: { instr: "Mos rasmlarni belgila, soʻng «Tekshirish»ni bos!", check: "Tekshirish", done: "Barakalla! Hammasi toʻgʻri!", retry: "Yana bir bor koʻrib chiq", next: "Yana" },
  ru: { instr: "Отметь подходящие картинки и нажми «Проверить»!", check: "Проверить", done: "Молодец! Всё верно!", retry: "Посмотри ещё раз", next: "Ещё" },
  en: { instr: "Tap all that fit, then press “Check”!", check: "Check", done: "Great! All correct!", retry: "Look once more", next: "Again" },
};

const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function PickMany({ options = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(options), [options]);
  const [picked, setPicked] = useState({}); // _id -> true
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const solved = status === "correct";

  function toggle(id) {
    if (solved) return;
    setStatus("idle");
    setPicked((p) => ({ ...p, [id]: !p[id] }));
  }

  function check() {
    if (solved) return;
    const ok = cards.every((c) => !!picked[c._id] === !!c.correct);
    if (typeof onAttempt === "function") onAttempt(ok, { picked: Object.keys(picked).filter((k) => picked[k]) });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 900);
    }
  }

  const anyPicked = Object.values(picked).some(Boolean);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {cards.map((c) => {
          const on = !!picked[c._id];
          const showRight = solved && c.correct;
          const cap = L(c.label, lang);
          return (
            <button
              key={c._id}
              onClick={() => toggle(c._id)}
              disabled={solved}
              aria-pressed={on}
              aria-label={cap || undefined}
              className={status === "wrong" && on && !c.correct ? "pmShake" : ""}
              style={{ ...S.card, ...(on ? S.sel : {}), ...(showRight ? S.ok : {}), cursor: solved ? "default" : "pointer" }}
            >
              {c.emoji && <span style={S.emoji} aria-hidden>{c.emoji}</span>}
              {cap && <span style={S.cap}>{cap}</span>}
              {on && <span style={S.tick} aria-hidden>{solved ? "✓" : "•"}</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? (
          <span style={S.okMsg}>🎉 {t.done}</span>
        ) : status === "wrong" ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      {!solved && (
        <button onClick={check} disabled={!anyPicked} style={{ ...S.check, ...(anyPicked ? {} : S.checkOff) }}>
          {t.check}
        </button>
      )}
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes pmShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.pmShake{animation:pmShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  card: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minWidth: 100, minHeight: 100, padding: "12px 14px", borderRadius: 20, border: "3px solid #d9e6c4", background: "#fff", boxShadow: "0 5px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  sel: { border: "3px solid #2f9fe0", background: "#eef7fd", boxShadow: "0 5px 0 rgba(47,159,224,.25)", transform: "translateY(-2px)" },
  ok: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)" },
  emoji: { fontSize: 44, lineHeight: 1 },
  cap: { fontSize: 14, fontWeight: 800, color: "#3c5a1e", textAlign: "center" },
  tick: { position: "absolute", top: 6, right: 8, fontSize: 18, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  okMsg: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  check: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9fe0", padding: "11px 26px", borderRadius: 999, boxShadow: "0 5px 0 #2178b0" },
  checkOff: { opacity: 0.5, cursor: "not-allowed", boxShadow: "0 5px 0 rgba(0,0,0,.12)" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
