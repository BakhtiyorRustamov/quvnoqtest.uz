"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * KaraokeReading — a READING PASSAGE (poem OR prose) for the Oʻqish savodxonligi
 * subject that plays a cached Uzbek read-aloud clip and HIGHLIGHTS each line as
 * it is spoken ("read-along karaoke"). It is the audio-enabled sibling of
 * PoemReading / StoryReading — use it for any Text/Story/Poem the child should
 * follow along with. Not graded (reading always counts as done); it exists to
 * PRESENT the text before the comprehension questions.
 *
 * WHY LINE-LEVEL: Gemini TTS (voice "Charon") reads Uzbek very naturally but
 * returns NO word timings, and its pacing is too variable to estimate. So the
 * seed script (scripts/seed-tts.mjs) synthesizes EACH LINE as its own clip,
 * measures its exact duration, concatenates them into one .wav, and writes a
 * timings sidecar. This component just reads that sidecar — every line boundary
 * is exact, so there is zero drift. Word-level highlight is supported too: if a
 * segment carries a `words` array, the current line is highlighted word-by-word.
 *
 * Props: {
 *   title?, author?, source?,
 *   lines: string[],            // one entry per audio segment (poem line / sentence)
 *   variant?: 'poem' | 'story', // 'poem' = one line per row; 'story' = flowing prose
 *   audio?: string,             // timings key, e.g. "g1-oqish-19-q1" (uz only).
 *                               //   resolves to /audio/tts/passages/<audio>.uz.json
 *   timings?: {                 // OR pass the map inline (skips the fetch)
 *     file: string, dur?: number,
 *     lines: { t:number, d:number, words?: {t:number,d:number}[] }[]
 *   },
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 *
 * Audio is UZBEK ONLY (matches the app's read-aloud policy). In ru/en, or when
 * no clip exists yet, it degrades gracefully to a plain "I have read it" card.
 */
const STR = {
  uz: { listen: "Tinglab, oʻqing", read: "Oʻqib boʻldim ✓", replay: "Boshidan", by: "muallif", next: "Yana", notReady: "Ovoz hali tayyor emas." },
  ru: { listen: "Слушай и читай", read: "Я прочитал(а) ✓", replay: "Сначала", by: "автор", next: "Ещё", notReady: "Аудио ещё не готово." },
  en: { listen: "Listen & read", read: "I have read it ✓", replay: "Restart", by: "author", next: "Again", notReady: "Audio isn't ready yet." }
};
const PASSAGE_BASE = "/audio/tts/passages";

// Shown in the dev gallery (/demo), where widgets are rendered with no props.
const DEMO_LINES = ["Kitob — bilim chirogʻi,", "Har varagʻi bir eshik.", "Oʻqigan bola doim", "Aqlli va keladi shirin."];

export default function KaraokeReading({
  title = "",
  author = "",
  source = "",
  lines = [],
  variant = "poem",
  audio = "",
  timings = null,
  lang = "uz",
  embedded = false,
  hideDone = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const demo = lines.length === 0;
  if (demo) {
    lines = DEMO_LINES;
    if (!title) title = "Kitob";
  }
  const [map, setMap] = useState(timings);
  const [state, setState] = useState("idle"); // idle | loading | playing | paused | ended | error
  const [active, setActive] = useState(-1); // active LINE index
  const [word, setWord] = useState(-1); // active word index within the line (or -1)
  const [done, setDone] = useState(false);

  const audioRef = useRef(null);
  const rafRef = useRef(0);

  // Show the play control whenever this passage has an Uzbek audio track (an
  // `audio` key or inline timings). Word/line highlighting only kicks in once
  // the timings sidecar has loaded; if the clip hasn't been generated yet
  // (before `npm run seed:passages`), pressing play shows a gentle note instead
  // of crashing.
  const hasAudioTrack = lang === "uz" && (!!map || !!audio);

  // Fetch the timings sidecar once (uz only, and only when not passed inline).
  useEffect(() => {
    if (timings || lang !== "uz" || !audio) return;
    let alive = true;
    fetch(`${PASSAGE_BASE}/${audio}.uz.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => alive && j && setMap(j))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [audio, timings, lang]);

  // Drive the highlight from the audio clock.
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.src = "";
      }
    };
  }, []);

  function tick() {
    const a = audioRef.current;
    const segs = map?.lines;
    if (!a || !segs) return;
    const now = a.currentTime;
    let li = segs.findIndex((s) => now >= s.t && now < s.t + s.d);
    if (li === -1 && segs.length && now >= segs[segs.length - 1].t) li = segs.length - 1;
    setActive(li);
    // optional word-level highlight inside the active line
    const seg = segs[li];
    if (seg?.words?.length) {
      const rel = now - seg.t;
      let wi = seg.words.findIndex((w) => rel >= w.t && rel < w.t + w.d);
      if (wi === -1 && rel >= seg.words[seg.words.length - 1].t) wi = seg.words.length - 1;
      setWord(wi);
    } else {
      setWord(-1);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function play() {
    if (!hasAudioTrack) return;
    let a = audioRef.current;
    if (!a) {
      const file = map?.file || `${audio}.uz.wav`;
      a = new Audio(`${PASSAGE_BASE}/${file}`);
      audioRef.current = a;
      a.onended = () => {
        cancelAnimationFrame(rafRef.current);
        setState("ended");
        setActive(-1);
        setWord(-1);
      };
      a.onerror = () => setState("error");
    }
    a.play()
      .then(() => {
        setState("playing");
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => setState("error"));
  }

  function pause() {
    const a = audioRef.current;
    if (a) a.pause();
    cancelAnimationFrame(rafRef.current);
    setState("paused");
  }

  function restart() {
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0;
      play();
    }
  }

  function toggle() {
    if (state === "playing") pause();
    else if (state === "paused") play();
    else if (state === "ended") restart();
    else play();
  }

  function finish() {
    if (done) return;
    setDone(true);
    pause();
    if (typeof onAttempt === "function") onAttempt(true, { read: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  const isStory = variant === "story";

  // Render a line, optionally with per-word spans when it's the active line and
  // word timings exist for it.
  function renderLineContent(text, i) {
    if (i === active && word >= 0) {
      const parts = text.split(/(\s+)/);
      let wIdx = -1;
      return parts.map((p, k) => {
        if (/^\s+$/.test(p)) return <span key={k}>{p}</span>;
        wIdx += 1;
        const on = wIdx === word;
        return (
          <span key={k} style={on ? S.wordOn : undefined}>
            {p}
          </span>
        );
      });
    }
    return text || " ";
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.page}>
        <div style={S.spine} aria-hidden />
        {title && <div style={S.title}>{title}</div>}

        {isStory ? (
          <p style={S.prose}>
            {lines.map((ln, i) => (
              <span
                key={i}
                style={{
                  ...S.sentence,
                  ...(i === active ? S.lineOn : {}),
                  ...(map && i < active ? S.linePast : {})
                }}
              >
                {renderLineContent(ln, i)}{" "}
              </span>
            ))}
          </p>
        ) : (
          <div style={S.poem}>
            {lines.map((ln, i) => (
              <div
                key={i}
                style={{
                  ...S.line,
                  ...(ln === "" ? S.gap : {}),
                  ...(i === active ? S.lineOn : {}),
                  ...(map && i < active ? S.linePast : {})
                }}
              >
                {renderLineContent(ln, i)}
              </div>
            ))}
          </div>
        )}

        {author && <div style={S.author}>✍️ {author}</div>}
        {source && <div style={S.source}>{source}</div>}
      </div>

      {/* play bar — only when an Uzbek clip is available */}
      {hasAudioTrack && (
        <div style={S.bar}>
          <button onClick={toggle} aria-label={t.listen} style={S.playBtn}>
            {state === "playing" ? (
              <span style={S.eq} aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="krBar" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
            ) : (
              <span style={{ marginLeft: 3 }} aria-hidden>▶</span>
            )}
          </button>
          <span style={S.listenLbl}>{t.listen}</span>
          {(state === "paused" || state === "ended") && (
            <button onClick={restart} style={S.replay}>↺ {t.replay}</button>
          )}
        </div>
      )}
      {hasAudioTrack && state === "error" && <div style={S.audioNote}>{t.notReady}</div>}

      {!hideDone && (
        <button onClick={finish} disabled={done} style={{ ...S.btn, ...(done ? S.btnDone : {}) }}>
          {t.read}
        </button>
      )}

      {!embedded && !hideDone && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>
          {t.next} →
        </button>
      )}
    </div>
  );
}

const CSS = `
@keyframes krIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes krEq{0%,100%{height:8px}50%{height:22px}}
.krBar{display:inline-block;width:5px;height:8px;margin:0 2px;border-radius:3px;background:#fff;animation:krEq .7s ease-in-out infinite}
`;
const S = {
  wrap: { maxWidth: 580, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  page: { position: "relative", background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 18, padding: "20px 24px 18px 32px", boxShadow: "0 14px 34px -18px rgba(90,60,20,.55)", textAlign: "left", animation: "krIn .35s ease" },
  spine: { position: "absolute", left: 12, top: 12, bottom: 12, width: 4, borderRadius: 4, background: "repeating-linear-gradient(#e8c98a,#e8c98a 6px,transparent 6px,transparent 12px)" },
  title: { fontSize: 22, fontWeight: 800, color: "#7a3e12", marginBottom: 10, textAlign: "center" },
  poem: { fontSize: 19, fontWeight: 600, lineHeight: 1.85, color: "#33302b", whiteSpace: "pre-wrap" },
  line: { padding: "2px 6px", borderRadius: 8, transition: "background .15s, color .15s" },
  gap: { height: 10, padding: 0 },
  prose: { fontSize: 17.5, fontWeight: 600, lineHeight: 1.9, color: "#33302b", margin: 0 },
  sentence: { borderRadius: 8, padding: "1px 2px", transition: "background .15s, color .15s" },
  lineOn: { background: "#ffe6a1", color: "#7a3e12", boxShadow: "0 0 0 2px #ffd873" },
  linePast: { color: "#9a8f78" },
  wordOn: { background: "#ff9f43", color: "#fff", borderRadius: 6, padding: "0 2px" },
  author: { marginTop: 14, textAlign: "right", fontStyle: "italic", fontWeight: 700, color: "#5a2d82" },
  source: { marginTop: 2, textAlign: "right", fontSize: 12.5, color: "#9aa0a6" },
  bar: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 14 },
  playBtn: { width: 52, height: 52, borderRadius: 999, border: "none", cursor: "pointer", background: "#2f6fed", color: "#fff", fontSize: 20, fontWeight: 900, boxShadow: "0 5px 0 #1f52bf", display: "grid", placeItems: "center" },
  eq: { display: "flex", alignItems: "center", height: 24 },
  listenLbl: { fontSize: 14, fontWeight: 800, color: "#2f6fed" },
  replay: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#7a3e12", background: "#f6e7c4", padding: "7px 14px", borderRadius: 999 },
  audioNote: { textAlign: "center", marginTop: 6, fontSize: 12.5, fontWeight: 700, color: "#b08900" },
  btn: { marginTop: 16, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 17, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "13px 30px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  btnDone: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "10px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
