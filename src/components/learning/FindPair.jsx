"use client";
import React, { useMemo, useState } from "react";

/**
 * FindPair — spot the TWO identical pictures in a grid and tap them both. The
 * matching two share a `key`; every other tile is unique. Recreates the
 * textbook's "find two identical snowflakes" game. Tapping a matching pair wins;
 * tapping two that don't match shakes and clears.
 *
 * Props: { tiles: [{ id?, emoji, key }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - exactly one `key` appears on two tiles (the pair); the rest are unique.
 *   - onAttempt(ok) fires when two tiles have been tapped; onCorrect() when the
 *     matching pair is found.
 */
const STR = {
  uz: { instr: "Ikkita bir xil rasmni topib, ikkalasini ham bos!", done: "Barakalla! Juftini topding!", retry: "Bular boshqa — yana qara", next: "Yana" },
  ru: { instr: "Найди две одинаковые картинки и нажми обе!", done: "Молодец! Пара найдена!", retry: "Разные — посмотри ещё", next: "Ещё" },
  en: { instr: "Find the two identical pictures and tap them both!", done: "Great! You found the pair!", retry: "Different — look again", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function FindPair({ tiles = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const grid = useMemo(() => shuffle(tiles), [tiles]);
  const [sel, setSel] = useState(null); // first tapped tile _id
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState([]); // _ids briefly shaking

  function keyOf(id) {
    return grid.find((g) => g._id === id)?.key;
  }

  function tap(tile) {
    if (won) return;
    if (sel === null) {
      setSel(tile._id);
      return;
    }
    if (sel === tile._id) {
      setSel(null); // tapped same tile → deselect
      return;
    }
    const ok = keyOf(sel) === tile.key;
    if (typeof onAttempt === "function") onAttempt(ok, { a: sel, b: tile._id });
    if (ok) {
      setWon(true);
      setSel(null);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      const bad = [sel, tile._id];
      setShake(bad);
      setSel(null);
      setTimeout(() => setShake([]), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {grid.map((tile) => {
          const isSel = sel === tile._id;
          const isWinTile = won && grid.filter((g) => g.key === tile.key).length === 2;
          return (
            <button
              key={tile._id}
              onClick={() => tap(tile)}
              disabled={won}
              aria-pressed={isSel}
              className={shake.includes(tile._id) ? "fpShake" : ""}
              style={{ ...S.tile, ...(isSel ? S.sel : {}), ...(isWinTile ? S.win : {}) }}
            >
              <span aria-hidden>{tile.emoji}</span>
              {isWinTile && <span style={S.tick} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : shake.length ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes fpShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.fpShake{animation:fpShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, justifyItems: "center" },
  tile: { position: "relative", width: "100%", maxWidth: 84, aspectRatio: "1 / 1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, borderRadius: 18, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", boxShadow: "0 4px 0 rgba(80,90,40,.10)", transition: "transform .12s, border-color .15s" },
  sel: { borderColor: "#2f9fe0", background: "#eef7fd", boxShadow: "0 0 0 3px rgba(47,159,224,.22), 0 4px 0 rgba(47,159,224,.25)", transform: "translateY(-2px)" },
  win: { borderColor: "#46c06a", background: "#eefcf2", boxShadow: "0 4px 0 rgba(70,192,106,.28)" },
  tick: { position: "absolute", top: 3, right: 5, fontSize: 15, fontWeight: 900, color: "#2f9e54" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
