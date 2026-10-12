"use client";
import React, { useMemo, useState } from "react";

/**
 * OrderLine — put the tiles in the correct left-to-right order by tapping them
 * in sequence. The child taps the tile that belongs in the next empty slot; a
 * correct tap locks it into place, a wrong tap shakes. Great for ordering the
 * seasons, the days of the week, past → present → future, or growth stages.
 *
 * Props: { items: [{ id?, emoji?, label }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - items MUST be given in the correct order; the component shuffles the tray.
 *   - onAttempt(ok) fires per tap; onCorrect() when every slot is filled.
 */
const STR = {
  uz: { instr: "Toʻgʻri tartibda joyla — birinchisidan boshla!", done: "Barakalla! Tartib toʻgʻri!", retry: "Bu hozircha emas", next: "Yana" },
  ru: { instr: "Расставь по порядку — начни с первого!", done: "Молодец! Порядок верный!", retry: "Пока не этот", next: "Ещё" },
  en: { instr: "Put them in order — start with the first!", done: "Great! Correct order!", retry: "Not that one yet", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  // guard against the (rare) already-sorted shuffle giving the answer away
  if (x.length > 1 && x.every((v, i) => v._i === i)) return shuffle(a);
  return x;
}

export default function OrderLine({ items = [], vertical = false, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const ordered = items.map((it, i) => ({ ...it, _i: i, _id: it.id ?? i }));
  const tray = useMemo(() => shuffle(ordered), [items.length]);
  const [placed, setPlaced] = useState([]); // array of _i in tap order (correct only)
  const [shakeId, setShakeId] = useState(null);
  const nextIdx = placed.length; // the _i we expect next
  const won = ordered.length > 0 && placed.length === ordered.length;

  function tap(tile) {
    if (won) return;
    const ok = tile._i === nextIdx;
    if (typeof onAttempt === "function") onAttempt(ok, { picked: tile._i, expected: nextIdx });
    if (ok) {
      const np = [...placed, tile._i];
      setPlaced(np);
      if (np.length === ordered.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShakeId(tile._id);
      setTimeout(() => setShakeId(null), 460);
    }
  }

  const isPlaced = (i) => placed.includes(i);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      {/* ordered slots */}
      <div style={{ ...S.slots, ...(vertical ? { flexDirection: "column", alignItems: "center" } : {}) }}>
        {ordered.map((it, pos) => {
          const filledI = placed[pos];
          const filled = filledI != null ? ordered[filledI] : null;
          return (
            <div key={pos} style={{ ...S.slot, ...(filled ? S.slotOn : {}) }}>
              <span style={S.slotNum}>{pos + 1}</span>
              {filled ? (
                <span style={S.slotBody}>
                  {filled.emoji && <span style={S.slotEmoji} aria-hidden>{filled.emoji}</span>}
                  <span style={S.slotLabel}>{L(filled.label, lang)}</span>
                </span>
              ) : (
                <span style={S.slotGhost} aria-hidden>{pos === nextIdx ? "◔" : ""}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* tray of tiles */}
      <div style={S.tray}>
        {tray.map((tile) =>
          isPlaced(tile._i) ? null : (
            <button
              key={tile._id}
              onClick={() => tap(tile)}
              aria-label={L(tile.label, lang)}
              className={shakeId === tile._id ? "olShake" : ""}
              style={S.tile}
            >
              {tile.emoji && <span style={S.tileEmoji} aria-hidden>{tile.emoji}</span>}
              <span style={S.tileLabel}>{L(tile.label, lang)}</span>
            </button>
          )
        )}
        {won && <span style={{ fontSize: 28 }} aria-hidden>🎉</span>}
      </div>

      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : shakeId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes olShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.olShake{animation:olShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 580, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  slots: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 16 },
  slot: { position: "relative", minWidth: 84, minHeight: 84, borderRadius: 18, border: "3px dashed #cdd9be", background: "#f7fbef", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 8px" },
  slotOn: { border: "3px solid #46c06a", background: "#eefcf2" },
  slotNum: { position: "absolute", top: 4, left: 7, fontSize: 12, fontWeight: 900, color: "#8aa06a" },
  slotBody: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  slotEmoji: { fontSize: 32, lineHeight: 1 },
  slotLabel: { fontSize: 12.5, fontWeight: 800, color: "#3c5a1e", textAlign: "center" },
  slotGhost: { fontSize: 22, color: "#c3d1ac" },
  tray: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, minHeight: 84 },
  tile: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, minWidth: 84, minHeight: 84, padding: "8px 10px", borderRadius: 18, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  tileEmoji: { fontSize: 34, lineHeight: 1 },
  tileLabel: { fontSize: 13, fontWeight: 800, color: "#33302b", textAlign: "center" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
