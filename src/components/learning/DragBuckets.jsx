"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, DragGhost, FingerCue } from "@/components/lesson/dragEngine";

/**
 * DragBuckets — DRAG number/expression tiles into the bucket of their value
 * (grades 1–4). Built on the shared pointer drag engine so it works with both
 * mouse and touch. Great for "sort these expressions by their result" tasks.
 *
 * Props: { tiles: [{id, label, bin}], bins: [{id, label}], lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - label is a short string shown on the tile / bucket (numbers stay
 *     language-neutral, so one set works for uz/ru/en).
 *   - onAttempt(correct) fires on each drop; onCorrect() when all tiles land
 *     in the right bucket.
 */
const STRINGS = {
  uz: { instr: "Har bir kartani oʻz qutisiga sudrab tashla", done: "Barakalla! Hammasi joyida!", next: "Yana" },
  ru: { instr: "Перетащи каждую карточку в свой ящик", done: "Молодец! Всё на месте!", next: "Ещё" },
  en: { instr: "Drag each card into the right bucket", done: "Great! All sorted!", next: "Again" },
};
const BIN_COLORS = ["#1fa7e0", "#f39a1f", "#46c06a", "#d63384"];

export default function DragBuckets({ tiles = [], bins = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [placed, setPlaced] = useState({}); // tileId -> binId (correct only)
  const [shake, setShake] = useState(null);
  const finished = useRef(false);
  const tray = tiles.filter((x) => !placed[x.id]);
  const solved = tiles.length > 0 && Object.keys(placed).length === tiles.length;

  const { drag, hot, bind } = useDrag((id, zone) => {
    if (finished.current || !zone) return;
    const tile = tiles.find((x) => x.id === id);
    if (!tile) return;
    if (!bins.some((b) => b.id === zone)) return; // dropped outside a bucket
    const ok = zone === tile.bin;
    if (typeof onAttempt === "function") onAttempt(ok, { id, zone });
    if (ok) {
      setPlaced((p) => ({ ...p, [id]: zone }));
    } else {
      setShake(id);
      setTimeout(() => setShake(null), 480);
    }
  });

  useEffect(() => {
    if (!finished.current && solved) {
      finished.current = true;
      if (typeof onCorrect === "function") onCorrect();
    }
  }, [solved, onCorrect]);

  const binColor = (i) => BIN_COLORS[i % BIN_COLORS.length];
  const dragTile = drag ? tiles.find((x) => x.id === drag.id) : null;

  return (
    <div className="select-none py-3" style={{ maxWidth: 560, margin: "0 auto" }}>
      <p className="text-center text-sm font-bold text-ink/55 mb-3">{t.instr}</p>

      {/* tray of draggable tiles */}
      <div className="relative flex flex-wrap items-center justify-center gap-2.5 min-h-[60px]">
        {!drag && tray.length > 0 && <FingerCue className="absolute -top-4 z-10" />}
        {tray.map((tile) => (
          <div
            key={tile.id}
            {...bind(tile.id)}
            role="button"
            aria-label={tile.label}
            className={`draggable cursor-grab rounded-2xl bg-white border-2 border-ink/15 shadow-card px-4 py-2.5 text-lg font-black text-ink ${
              drag?.id === tile.id ? "opacity-30" : ""
            } ${shake === tile.id ? "animate-shake" : ""}`}
          >
            {tile.label}
          </div>
        ))}
        {tray.length === 0 && <div className="text-3xl py-2" aria-hidden>🎉</div>}
      </div>

      {/* buckets (drop zones) */}
      <div className={`grid gap-3 mt-5 ${bins.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {bins.map((b, i) => {
          const color = binColor(i);
          const into = tiles.filter((x) => placed[x.id] === b.id);
          return (
            <div
              key={b.id}
              data-zone={b.id}
              aria-label={b.label}
              className={`relative rounded-2xl border-[3px] border-dashed min-h-[110px] p-2 pt-7 flex flex-wrap content-start justify-center gap-1.5 bg-white/70 transition-transform ${
                hot === b.id ? "scale-[1.03]" : ""
              }`}
              style={{ borderColor: color }}
            >
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-sm font-black shadow"
                style={{ background: color }}
              >
                {b.label}
              </span>
              {into.map((tile) => (
                <span
                  key={tile.id}
                  className="pointer-events-none rounded-xl bg-brand-green/15 border border-brand-green/40 px-2.5 py-1 text-[15px] font-black text-ink"
                >
                  {tile.label}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <div className="min-h-[26px] mt-3 text-center" aria-live="polite">
        {solved && <span className="text-base font-black text-brand-green">🎉 {t.done}</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} className="btn-primary mx-auto block text-sm">
          {t.next} →
        </button>
      )}

      <DragGhost drag={drag}>
        {dragTile && (
          <span className="rounded-2xl bg-white border-2 border-brand-blue px-4 py-2.5 text-lg font-black text-ink">{dragTile.label}</span>
        )}
      </DragGhost>
    </div>
  );
}
