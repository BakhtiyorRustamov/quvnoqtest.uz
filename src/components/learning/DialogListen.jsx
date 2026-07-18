"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * DialogListen — an English mini-dialog the child LISTENS to line by line
 * (Ingliz tili "Talk time" / grammar chants). Speech bubbles pop in one at a
 * time; every bubble has its own speaker button that plays a pre-seeded clip
 * (public/audio/tts/en/<key>.wav, with an en-US browser-voice fallback). After
 * the last line a comprehension question appears — tap the right answer.
 *
 * Props: {
 *   lines: [{ who: emoji, name?: string, text: string,
 *             audio?: { key, text } }],          // shown in given order
 *   question?: { prompt: string|{uz,ru,en},
 *                choices: (string|{uz,ru,en})[], answerIndex: number },
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 * Without `question` the dialog ends with a "Now you say it!" button that
 * completes the item (listen-and-repeat practice).
 */
const STR = {
  uz: { next: "Keyingi gap ▶", listen: "Tinglash", answer: "Endi javob ber!", say: "Endi oʻzing ayt! 🎤", done: "Barakalla! 🎉", retry: "Yana urinib koʻr" },
  ru: { next: "Следующая фраза ▶", listen: "Слушать", answer: "Теперь ответь!", say: "Теперь скажи сам! 🎤", done: "Молодец! 🎉", retry: "Попробуй ещё раз" },
  en: { next: "Next line ▶", listen: "Listen", answer: "Now answer!", say: "Now you say it! 🎤", done: "Great! 🎉", retry: "Try again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function useClip() {
  const elRef = useRef(null);
  const [playingKey, setPlayingKey] = useState(null);
  const stop = useCallback(() => {
    elRef.current?.pause();
    setPlayingKey(null);
  }, []);
  useEffect(() => stop, [stop]);
  const play = useCallback(
    async (audio) => {
      stop();
      if (!audio) return;
      try {
        const el = new Audio(`/audio/tts/en/${audio.key}.wav`);
        elRef.current = el;
        el.onended = () => setPlayingKey(null);
        await el.play();
        setPlayingKey(audio.key);
      } catch {
        // Clip not seeded, or autoplay blocked before a tap — stay silent.
        // Never fall back to the robotic browser voice.
        setPlayingKey(null);
      }
    },
    [stop]
  );
  return { play, stop, playingKey };
}

export default function DialogListen({ lines = [], question, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [shown, setShown] = useState(1); // how many bubbles are visible
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const [picked, setPicked] = useState(null);
  const { play, playingKey } = useClip();
  const allShown = shown >= lines.length;

  function reveal() {
    const n = Math.min(shown + 1, lines.length);
    setShown(n);
    const line = lines[n - 1];
    if (line?.audio) play(line.audio);
  }

  // auto-play the first line once
  const first = useRef(false);
  useEffect(() => {
    if (!first.current && lines[0]?.audio) {
      first.current = true;
      play(lines[0].audio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(i) {
    if (status === "correct") return;
    setPicked(i);
    const ok = i === question.answerIndex;
    if (typeof onAttempt === "function") onAttempt(ok, { chosen: i });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }

  function finishPractice() {
    if (status === "correct") return;
    setStatus("correct");
    if (typeof onAttempt === "function") onAttempt(true, { practice: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.stage}>
        {lines.slice(0, shown).map((line, i) => {
          const rightSide = i % 2 === 1;
          const on = line.audio && playingKey === line.audio.key;
          return (
            <div key={i} className="dlg-pop" style={{ ...S.row, flexDirection: rightSide ? "row-reverse" : "row" }}>
              <span style={S.avatar} aria-hidden>{line.who}</span>
              <button
                type="button"
                onClick={() => line.audio && play(line.audio)}
                style={{
                  ...S.bubble,
                  background: rightSide ? "#fff3e0" : "#e3f2fd",
                  borderColor: on ? "#1fa7e0" : "rgba(0,0,0,0.08)",
                }}
                aria-label={t.listen}
              >
                {line.name && <span style={S.name}>{line.name}</span>}
                <span style={S.text}>{line.text}</span>
                <span style={{ ...S.spk, opacity: line.audio ? 1 : 0 }} aria-hidden>{on ? "🔉" : "🔊"}</span>
              </button>
            </div>
          );
        })}
      </div>

      {!allShown && (
        <button type="button" className="dlg-next" style={S.nextBtn} onClick={reveal}>
          {t.next}
        </button>
      )}

      {allShown && question && status !== "correct" && (
        <div style={S.qBox}>
          <p style={S.qPrompt}>{L(question.prompt, lang) || t.answer}</p>
          <div style={S.choices}>
            {question.choices.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                className={picked === i && status === "wrong" ? "dlg-shake" : ""}
                style={{
                  ...S.choice,
                  borderColor: picked === i && status === "wrong" ? "#e8553e" : "rgba(0,0,0,0.12)",
                }}
              >
                {L(c, lang)}
              </button>
            ))}
          </div>
          {status === "wrong" && <p style={S.retry}>{t.retry}</p>}
        </div>
      )}

      {allShown && !question && status !== "correct" && (
        <button type="button" style={{ ...S.nextBtn, background: "#46c06a" }} onClick={finishPractice}>
          {t.say}
        </button>
      )}

      {status === "correct" && <p style={S.done}>{t.done}</p>}
    </div>
  );
}

const S = {
  wrap: { maxWidth: 560, margin: "14px auto 0", padding: "0 4px", fontFamily: "inherit" },
  stage: { display: "flex", flexDirection: "column", gap: 10 },
  row: { display: "flex", alignItems: "flex-end", gap: 8 },
  avatar: {
    fontSize: 34,
    lineHeight: 1,
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  bubble: {
    position: "relative",
    maxWidth: "78%",
    textAlign: "left",
    border: "2px solid rgba(0,0,0,0.08)",
    borderRadius: 18,
    padding: "10px 38px 10px 14px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  name: { display: "block", fontSize: 12, fontWeight: 800, opacity: 0.55 },
  text: { fontSize: 18, fontWeight: 800, color: "#1c2540", lineHeight: 1.35 },
  spk: { position: "absolute", right: 10, bottom: 8, fontSize: 18 },
  nextBtn: {
    display: "block",
    margin: "14px auto 0",
    background: "#1fa7e0",
    color: "#fff",
    fontWeight: 900,
    fontSize: 16,
    border: "none",
    borderRadius: 999,
    padding: "10px 22px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(31,167,224,0.4)",
  },
  qBox: { marginTop: 16, textAlign: "center" },
  qPrompt: { fontWeight: 900, fontSize: 17, color: "#1c2540", margin: "0 0 10px" },
  choices: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  choice: {
    background: "#fff",
    border: "2px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    padding: "10px 18px",
    fontSize: 17,
    fontWeight: 800,
    color: "#1c2540",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  retry: { marginTop: 10, fontWeight: 800, color: "#e8553e" },
  done: { marginTop: 14, textAlign: "center", fontWeight: 900, fontSize: 20, color: "#2e9e52" },
};

const CSS = `
.dlg-pop { animation: dlgPop .35s ease both; }
@keyframes dlgPop { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: none; } }
.dlg-next:hover { transform: translateY(-1px); }
.dlg-shake { animation: dlgShake .4s ease; }
@keyframes dlgShake { 20% { transform: translateX(-5px);} 40% { transform: translateX(5px);} 60% { transform: translateX(-4px);} 80% { transform: translateX(3px);} }
`;
