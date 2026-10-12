"use client";
import React, { useMemo, useState } from "react";

/**
 * LetterHunt — find every copy of one letter hidden in a grid of letters. The
 * child taps each cell that shows the target letter (both its capital and small
 * form count); a correct tap locks green, a wrong tap shakes. This is the Alifbe
 * "harfni tanib ol" drill from the primer's letter-reading grid (O o O / o O o):
 * before a first-grader can read, they must spot a letter instantly among lookalikes.
 *
 * Props: { target, grid, matchCase=false, cols?, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - target: the letter to hunt, e.g. "O".
 *   - grid: array of single letters to lay out (mix of the target + distractors).
 *   - matchCase: if true, only the exact case counts (default: O and o both count).
 *   - onAttempt(ok) per tap; onCorrect() when every target cell is found.
 */
const STR = {
  uz: { instr: (x) => `«${x}» harfini top va hammasini bos!`, done: "Barakalla! Hammasini topding!", retry: "Bu boshqa harf", next: "Yana" },
  ru: { instr: (x) => `Найди букву «${x}» и нажми на все!`, done: "Молодец! Все найдены!", retry: "Это другая буква", next: "Ещё" },
  en: { instr: (x) => `Find the letter “${x}” and tap them all!`, done: "Great! You found them all!", retry: "That's a different letter", next: "Again" },
};

export default function LetterHunt({
  target = "O",
  grid = [],
  matchCase = false,
  cols,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STR[lang] || STR.uz;
  const norm = (s) => (matchCase ? String(s) : String(s).toLocaleLowerCase("en"));
  const cells = useMemo(() => grid.map((ch, i) => ({ ch, i, hit: norm(ch) === norm(target) })), [grid, target, matchCase]);
  const totalHits = cells.filter((c) => c.hit).length;
  const [found, setFound] = useState({}); // i -> true
  const [shakeI, setShakeI] = useState(null);
  const foundCount = Object.keys(found).length;
  const solved = totalHits > 0 && foundCount === totalHits;
  const nCols = cols || Math.min(6, Math.max(3, Math.ceil(Math.sqrt(grid.length))));

  function tap(c) {
    if (solved || found[c.i]) return;
    if (typeof onAttempt === "function") onAttempt(c.hit, { index: c.i, ch: c.ch });
    if (c.hit) {
      const nf = { ...found, [c.i]: true };
      setFound(nf);
      if (Object.keys(nf).length === totalHits && typeof onCorrect === "function") onCorrect();
    } else {
      setShakeI(c.i);
      setTimeout(() => setShakeI(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr(target)}</p>
      <div style={{ ...S.grid, gridTemplateColumns: `repeat(${nCols}, 1fr)` }}>
        {cells.map((c) => {
          const on = !!found[c.i];
          return (
            <button
              key={c.i}
              onClick={() => tap(c)}
              disabled={on || solved}
              className={shakeI === c.i ? "lhShake" : ""}
              style={{ ...S.cell, ...(on ? S.cellOn : {}), cursor: on || solved ? "default" : "pointer" }}
            >
              <span style={{ ...S.letter, ...(on ? { color: "#fff" } : {}) }}>{c.ch}</span>
              {on && <span style={S.tick} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.progress} aria-hidden>{foundCount} / {totalHits}</div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shakeI != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes lhShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.lhShake{animation:lhShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gap: 8, justifyContent: "center", maxWidth: 380, margin: "0 auto" },
  cell: { position: "relative", aspectRatio: "1 / 1", minWidth: 48, borderRadius: 14, border: "3px solid #f2c6b6", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 4px 0 rgba(180,90,60,.14)", transition: "transform .1s, background .15s, border-color .15s" },
  cellOn: { border: "3px solid #46c06a", background: "#46c06a", boxShadow: "0 4px 0 #2f9b50", transform: "translateY(-2px)" },
  letter: { fontSize: 24, fontWeight: 900, color: "#5a4030" },
  tick: { position: "absolute", top: 3, right: 5, fontSize: 12, fontWeight: 900, color: "#fff" },
  progress: { marginTop: 12, fontSize: 14, fontWeight: 800, color: "#f4693b" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
