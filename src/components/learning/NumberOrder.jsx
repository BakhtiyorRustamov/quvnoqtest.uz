"use client";
import React, { useMemo, useState } from "react";

/**
 * NumberOrder — put numbers in order (grades 1–4). Shows shuffled number tiles;
 * the child taps them one at a time in ascending (or descending) order. Each
 * correct tap moves the tile into the ordered row; a wrong tap shakes. Done
 * when every number is placed.
 *
 * Props: { numbers:[…], direction:'asc'|'desc', lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 */
const STR = {
  uz: { asc: "Sonlarni kichikdan kattaga tartibla!", desc: "Sonlarni kattadan kichikka tartibla!", done: "Barakalla! Toʻgʻri tartib!", retry: "Avval boshqa son keladi", next: "Yana" },
  ru: { asc: "Расставь числа от меньшего к большему!", desc: "Расставь числа от большего к меньшему!", done: "Молодец! Порядок верный!", retry: "Сначала идёт другое число", next: "Ещё" },
  en: { asc: "Put the numbers from smallest to largest!", desc: "Put the numbers from largest to smallest!", done: "Great! Correct order!", retry: "A different number comes first", next: "Again" },
};

function shuffle(a) {
  const x = a.map((v, i) => ({ v, id: i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function NumberOrder({ numbers = [], direction = "asc", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const target = useMemo(() => [...numbers].sort((a, b) => (direction === "desc" ? b - a : a - b)), [numbers, direction]);
  const tiles = useMemo(() => shuffle(numbers), [numbers]);
  const [placed, setPlaced] = useState([]); // tile ids in chosen order
  const [shake, setShake] = useState(null);
  const solved = placed.length === numbers.length && numbers.length > 0;

  function tap(tile) {
    if (solved || placed.includes(tile.id)) return;
    const expected = target[placed.length];
    const ok = tile.v === expected;
    if (typeof onAttempt === "function") onAttempt(ok, { value: tile.v });
    if (ok) {
      const np = [...placed, tile.id];
      setPlaced(np);
      if (np.length === numbers.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(tile.id);
      setTimeout(() => setShake(null), 440);
    }
  }

  const placedVals = placed.map((id) => tiles.find((x) => x.id === id).v);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t[direction === "desc" ? "desc" : "asc"]}</p>
      <div style={S.row}>
        {placedVals.map((v, i) => (
          <div key={i} style={{ ...S.tile, ...S.tileOk }}>{v}</div>
        ))}
        {Array.from({ length: numbers.length - placedVals.length }, (_, i) => (
          <div key={"e" + i} style={{ ...S.tile, ...S.slot }} />
        ))}
      </div>
      <div style={S.pool}>
        {tiles.filter((x) => !placed.includes(x.id)).map((tile) => (
          <button
            key={tile.id}
            onClick={() => tap(tile)}
            disabled={solved}
            className={shake === tile.id ? "noShake" : ""}
            style={{ ...S.tile, ...S.pick, cursor: solved ? "default" : "pointer" }}
          >
            {tile.v}
          </button>
        ))}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes noShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.noShake{animation:noShake .42s}`;
const S = {
  wrap: { maxWidth: 500, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  row: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, minHeight: 56 },
  pool: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 18 },
  tile: { minWidth: 56, height: 56, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 14, fontFamily: "inherit", fontSize: 22, fontWeight: 800 },
  pick: { border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  tileOk: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54" },
  slot: { border: "2px dashed #e4dcc4", background: "#faf7ef", color: "transparent" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
