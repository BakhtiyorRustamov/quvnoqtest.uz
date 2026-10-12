"use client";
import React, { useMemo, useState } from "react";

/**
 * WhatHappenedNext — "Keyin nima roʻy berdi?" (What happened next?). A sequence
 * check for the Oʻqish savodxonligi subject that forces the child to track the
 * ORDER of events in the story, not just recognise words. It pins one anchor
 * event ("first this happened") and asks the child to tap the event that comes
 * NEXT. Distractors are real story events placed out of order, so guessing from
 * keywords fails — the child has to remember what actually followed. Self-grading.
 *
 * Props: {
 *   before: string | {uz,ru,en},                 // the anchor event
 *   options: [{ text: string|{uz,ru,en}, next?: boolean }],  // EXACTLY ONE next:true
 *   clue?: {uz,ru,en}, emoji?,
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { anchor: "Avval shunday boʻldi", ask: "Keyin nima roʻy berdi?", done: "Toʻgʻri! 🎉", retry: "Yoʻq — matnni diqqat bilan oʻqi", next: "Yana" },
  ru: { anchor: "Сначала произошло так", ask: "Что случилось потом?", done: "Верно! 🎉", retry: "Нет — перечитай внимательно", next: "Ещё" },
  en: { anchor: "First this happened", ask: "What happened next?", done: "Correct! 🎉", retry: "No — read the text carefully", next: "Again" }
};

const DEMO = {
  before: { uz: "Bolalar oʻyinchoqlarni oʻynab, zerikishdi.", ru: "Дети поиграли игрушками и заскучали.", en: "The children played with the toys and got bored." },
  options: [
    { text: { uz: "Bir bolaning koʻzi kitobchaga tushdi.", ru: "Один ребёнок заметил книжку.", en: "One child noticed the little book." }, next: true },
    { text: { uz: "Mehmonlar endi kelishdi.", ru: "Гости только пришли.", en: "The guests had just arrived." } },
    { text: { uz: "Doniyor tort kesdi.", ru: "Данияр разрезал торт.", en: "Doniyor cut the cake." } }
  ]
};

function pickL(v, lang) {
  if (v == null) return "";
  return typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function WhatHappenedNext({
  before,
  options,
  clue,
  emoji,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  if (before == null || !options) {
    before = DEMO.before;
    options = DEMO.options;
  }
  const shown = useMemo(() => shuffle(options), [options]);
  const [solvedId, setSolvedId] = useState(null);
  const [shake, setShake] = useState(null);
  const solved = solvedId !== null;
  const clueText = pickL(clue, lang);

  function tap(o) {
    if (solved) return;
    const ok = !!o.next;
    if (typeof onAttempt === "function") onAttempt(ok, { text: pickL(o.text, lang) });
    if (ok) {
      setSolvedId(o.id);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(o.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 26 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}

      {/* anchor event */}
      <div style={S.anchorLbl}>{t.anchor}</div>
      <div style={S.anchor}>
        <span style={S.badge}>1</span>
        <span>{pickL(before, lang)}</span>
      </div>

      <div style={S.arrow} aria-hidden>⬇︎</div>
      <div style={S.ask}>
        <span style={S.qmark}>?</span> {t.ask}
      </div>

      <div style={S.grid}>
        {shown.map((o) => {
          const on = solvedId === o.id;
          return (
            <button
              key={o.id}
              onClick={() => tap(o)}
              disabled={solved}
              className={shake === o.id ? "wnShake" : ""}
              style={{ ...S.opt, ...(on ? S.on : {}), cursor: solved ? "default" : "pointer", opacity: solved && !on ? 0.5 : 1 }}
            >
              {pickL(o.text, lang)}
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes wnShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.wnShake{animation:wnShake .42s}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  anchorLbl: { textAlign: "center", fontSize: 12.5, fontWeight: 800, letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a6", marginBottom: 6 },
  anchor: { display: "flex", alignItems: "center", gap: 10, background: "#eef4ff", border: "2px solid #cfe0ff", borderRadius: 14, padding: "12px 14px", fontSize: 16.5, fontWeight: 700, color: "#1f3a5f" },
  badge: { flexShrink: 0, width: 26, height: 26, borderRadius: 999, background: "#2f6fed", color: "#fff", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 900 },
  arrow: { textAlign: "center", fontSize: 20, color: "#b6aa8e", margin: "4px 0 0", opacity: 0.7 },
  ask: { textAlign: "center", fontSize: 17, fontWeight: 800, color: "#7a3e12", margin: "2px 0 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  qmark: { display: "inline-grid", placeItems: "center", width: 26, height: 26, borderRadius: 999, background: "#ffd873", color: "#7a3e12", fontWeight: 900 },
  grid: { display: "flex", flexDirection: "column", gap: 10 },
  opt: { textAlign: "left", padding: "13px 16px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 16, fontWeight: 700, boxShadow: "0 4px 0 rgba(0,0,0,.06)", lineHeight: 1.4 },
  on: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 rgba(70,192,106,.25)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
