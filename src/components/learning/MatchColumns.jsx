"use client";
import React, { useMemo, useState } from "react";

/**
 * MatchColumns — tap a card on the left, then its partner on the right. Each
 * side can be an emoji, a caption, or both, so it matches natural-science pairs:
 * sense organ ↔ what it does, object ↔ its material, animal ↔ its group. Correct
 * pairs lock in with a colour; wrong taps flash.
 *
 * Props: { pairs: [{ left: {emoji?, label?}, right: {emoji?, label?} }],
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - onAttempt(ok) fires per connection try; onCorrect() when all pairs match.
 */
const STR = {
  uz: { instr: "Chapdagini bos, keyin oʻngdagi mos juftini bos!", done: "Barakalla! Hammasi mos!", retry: "Mos kelmadi — yana urin", next: "Yana" },
  ru: { instr: "Нажми слева, потом пару справа!", done: "Молодец! Все пары верны!", retry: "Не подходит — ещё раз", next: "Ещё" },
  en: { instr: "Tap on the left, then its match on the right!", done: "Great! All matched!", retry: "Not a match — try again", next: "Again" },
};
const COLORS = ["#46c06a", "#2f9fe0", "#f39a1f", "#d63384", "#7c5cff", "#e8553e"];
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

function Face({ side, lang }) {
  const cap = L(side?.label, lang);
  return (
    <>
      {side?.emoji && <span style={{ fontSize: 34, lineHeight: 1 }} aria-hidden>{side.emoji}</span>}
      {cap && <span style={{ fontSize: 15, fontWeight: 800 }}>{cap}</span>}
    </>
  );
}

export default function MatchColumns({ pairs = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const lefts = pairs.map((p, i) => ({ id: i, side: p.left }));
  const rights = useMemo(() => shuffle(pairs.map((p, i) => ({ id: i, side: p.right }))), [pairs]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState({}); // id -> color
  const [badRight, setBadRight] = useState(null);
  const done = Object.keys(matched).length;
  const won = pairs.length > 0 && done === pairs.length;

  function pickLeft(id) {
    if (matched[id] != null || won) return;
    setSel(id);
    setBadRight(null);
  }
  function pickRight(rid) {
    if (won || sel === null || matched[rid] != null) return;
    const ok = rid === sel;
    if (typeof onAttempt === "function") onAttempt(ok, { left: sel, right: rid });
    if (ok) {
      const color = COLORS[done % COLORS.length];
      const nm = { ...matched, [sel]: color };
      setMatched(nm);
      setSel(null);
      if (Object.keys(nm).length === pairs.length && typeof onCorrect === "function") onCorrect();
    } else {
      setBadRight(rid);
      setSel(null);
      setTimeout(() => setBadRight(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        <div style={S.col}>
          {lefts.map((l) => {
            const c = matched[l.id];
            const isSel = sel === l.id;
            return (
              <button
                key={l.id}
                onClick={() => pickLeft(l.id)}
                disabled={c != null}
                style={{ ...S.card, ...(c != null ? { ...S.locked, borderColor: c } : {}), ...(isSel ? S.sel : {}) }}
              >
                <Face side={l.side} lang={lang} />
                {c != null && <span style={{ ...S.dot, background: c }} />}
              </button>
            );
          })}
        </div>
        <div style={S.col}>
          {rights.map((r) => {
            const c = matched[r.id];
            const isBad = badRight === r.id;
            return (
              <button
                key={r.id}
                onClick={() => pickRight(r.id)}
                disabled={c != null}
                className={isBad ? "mcShake" : ""}
                style={{ ...S.card, ...(c != null ? { ...S.locked, borderColor: c } : {}), ...(isBad ? S.bad : {}) }}
              >
                <Face side={r.side} lang={lang} />
                {c != null && <span style={{ ...S.dot, background: c }} />}
              </button>
            );
          })}
        </div>
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : badRight != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes mcShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.mcShake{animation:mcShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 540, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  col: { display: "grid", gap: 10 },
  card: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 60, padding: "10px 8px", borderRadius: 16, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", color: "#33302b", fontFamily: "inherit", boxShadow: "0 4px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  sel: { borderColor: "#2f9fe0", boxShadow: "0 0 0 3px rgba(47,159,224,.25), 0 4px 0 rgba(47,159,224,.2)", transform: "translateY(-2px)" },
  locked: { cursor: "default", background: "#fbfdf7" },
  bad: { borderColor: "#e8553e", background: "#fdeceb" },
  dot: { position: "absolute", top: 6, right: 6, width: 12, height: 12, borderRadius: 999 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
