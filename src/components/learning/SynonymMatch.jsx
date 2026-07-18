"use client";
import React, { useMemo, useState } from "react";

/**
 * SynonymMatch — link the two words that mean the same thing. Tap a word on the
 * left, then its partner on the right (koinot ↔ fazo, quyosh ↔ oftob, film ↔
 * kino). The Alifbe primer's "juftini toping" task: beyond decoding, the child
 * now thinks about MEANING, which builds vocabulary. Correct pairs lock in with
 * a colour; a wrong tap flashes.
 *
 * Props: { pairs: [{ a, b }], lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - a / b are the two synonym words (plain strings, e.g. "koinot" / "fazo").
 *   - onAttempt(ok) per link try; onCorrect() when every pair is matched.
 */
const STR = {
  uz: { instr: "Bir xil maʼnoli soʻzlarni ula!", done: "Barakalla! Maʼnodosh soʻzlar!", retry: "Maʼnosi boshqa — yana urin", next: "Yana" },
  ru: { instr: "Соедини слова с одинаковым значением!", done: "Молодец! Слова-синонимы!", retry: "Другое значение — ещё раз", next: "Ещё" },
  en: { instr: "Link the words that mean the same!", done: "Great! Synonyms matched!", retry: "Different meaning — try again", next: "Again" },
};
const COLORS = ["#46c06a", "#2f9fe0", "#f39a1f", "#d63384", "#7c5cff", "#e8553e"];

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}

export default function SynonymMatch({ pairs = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const lefts = pairs.map((p, i) => ({ id: i, w: p.a }));
  const rights = useMemo(() => shuffle(pairs.map((p, i) => ({ id: i, w: p.b }))), [pairs]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState({});
  const [bad, setBad] = useState(null);
  const done = Object.keys(matched).length;
  const won = pairs.length > 0 && done === pairs.length;

  function pickLeft(id) { if (matched[id] != null || won) return; setSel(id); setBad(null); }
  function pickRight(rid) {
    if (won || sel === null || matched[rid] != null) return;
    const ok = rid === sel;
    if (typeof onAttempt === "function") onAttempt(ok, { left: sel, right: rid });
    if (ok) {
      const nm = { ...matched, [sel]: COLORS[done % COLORS.length] };
      setMatched(nm); setSel(null);
      if (Object.keys(nm).length === pairs.length && typeof onCorrect === "function") onCorrect();
    } else { setBad(rid); setSel(null); setTimeout(() => setBad(null), 460); }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        <div style={S.col}>
          {lefts.map((l) => {
            const c = matched[l.id]; const isSel = sel === l.id;
            return (
              <button key={l.id} onClick={() => pickLeft(l.id)} disabled={c != null}
                style={{ ...S.tile, ...(c != null ? { ...S.locked, borderColor: c } : {}), ...(isSel ? S.sel : {}) }}>
                {l.w}{c != null && <span style={{ ...S.dot, background: c }} />}
              </button>
            );
          })}
        </div>
        <div style={S.col}>
          {rights.map((r) => {
            const c = matched[r.id]; const isBad = bad === r.id;
            return (
              <button key={r.id} onClick={() => pickRight(r.id)} disabled={c != null}
                className={isBad ? "smShake" : ""}
                style={{ ...S.tile, ...(c != null ? { ...S.locked, borderColor: c } : {}), ...(isBad ? S.badTile : {}) }}>
                {r.w}{c != null && <span style={{ ...S.dot, background: c }} />}
              </button>
            );
          })}
        </div>
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : bad != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes smShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.smShake{animation:smShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 500, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  col: { display: "grid", gap: 10 },
  tile: { position: "relative", minHeight: 54, padding: "12px 10px", borderRadius: 14, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", color: "#33302b", fontFamily: "inherit", fontSize: 18, fontWeight: 800, boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  sel: { borderColor: "#2f9fe0", boxShadow: "0 0 0 3px rgba(47,159,224,.25), 0 4px 0 rgba(47,159,224,.2)", transform: "translateY(-2px)" },
  locked: { cursor: "default", background: "#fbfdf7" },
  badTile: { borderColor: "#e8553e", background: "#fdeceb" },
  dot: { position: "absolute", top: 6, right: 6, width: 12, height: 12, borderRadius: 999 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
