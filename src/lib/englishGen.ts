import 'server-only';
import type { Block, EQ, Seg } from '@/content/g11/english/types';

/**
 * AI-generated English exam parts (Groq via callAi). Each spec = a prompt asking for strict JSON
 * + a validator that turns the JSON into a Block or rejects it (wrong counts, answers missing from
 * the text, bad indices…). The client falls back to the built-in bank when a part is rejected.
 * Question numbers are set by the client; `n` here is only a running index.
 */
type J = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type GenSpec = { prompt: string; maxTokens: number; build: (o: J) => Block | null };

const L = 'ABCDEFGHIJ';
const str = (x: unknown, min = 1) => (typeof x === 'string' && x.trim().length >= min ? x.trim() : null);
const arr = (x: unknown, n?: number) => (Array.isArray(x) && (n === undefined || x.length === n) ? x : null);
const low = (s: string) => s.toLowerCase().replace(/[’']/g, "'");
const voice = (v: unknown): Seg['v'] => (['F', 'M', 'F2', 'M2', 'N'].includes(String(v)) ? (String(v) as Seg['v']) : 'F');
const has = (hay: string, needle: string) => low(hay).includes(low(needle));
function mcqs(list: J[], nOpts: number, start: number): EQ[] | null {
  const out: EQ[] = [];
  for (const [i, x] of list.entries()) {
    const q = str(x?.q);
    const opts = arr(x?.options, nOpts)?.map((o) => str(o));
    const a = Number(x?.answer);
    if (!q || !opts || opts.some((o) => !o) || new Set(opts).size !== nOpts || !(a >= 0 && a < nOpts)) return null;
    // shuffle so the model's habit of putting the answer first does not leak
    const order = opts.map((_, k) => k).sort(() => Math.random() - 0.5);
    out.push({ k: 'mcq', n: start + i, q, opts: order.map((k) => opts[k] as string), a: order.indexOf(a) });
  }
  return out;
}
function gaps(list: J[], start: number, mustAppearIn: string): EQ[] | null {
  const out: EQ[] = [];
  for (const [i, x] of list.entries()) {
    const q = str(x?.q);
    const ans = arr(x?.answers)?.map((a) => str(a)).filter(Boolean) as string[] | undefined;
    if (!q || !q.includes('___') || !ans?.length || ans[0].split(/\s+/).length > 3) return null;
    if (!ans.some((a) => has(mustAppearIn, a))) return null; // the answer must really be in the recording / passage
    out.push({ k: 'gap', n: start + i, q, a: ans });
  }
  return out;
}
const segs = (list: unknown, allowed: Seg['v'][] = ['F', 'M', 'F2', 'M2']): Seg[] | null => {
  const a = arr(list);
  if (!a || !a.length) return null;
  const out = a.map((x: J) => ({ v: allowed.includes(voice(x?.v)) ? voice(x?.v) : allowed[0], t: str(x?.t) ?? '' }));
  return out.every((s) => s.t) ? out : null;
};
const scriptText = (s: Seg[]) => s.map((x) => x.t).join(' ');
const COMMON = `Write ORIGINAL British English material at upper-intermediate (B2) level on a neutral, school-appropriate topic (no politics, religion or violence; no real living people). Vary topics widely: science, nature, daily life, work, travel, history, culture, technology, health, sport. Reply with ONE valid JSON object only — no markdown, no comments.`;

export const SPECS: Record<string, GenSpec> = {
  /* ---------------- Multilevel listening ---------------- */
  'ml-l1': {
    maxTokens: 1500,
    prompt: `${COMMON}
Create 8 items for "choose the correct reply": each item is one short spoken sentence (a question, request, offer, piece of news or apology) and three possible replies; exactly ONE reply is natural, the other two are clearly wrong but use related words.
JSON: {"items":[{"say":"...","v":"F"|"M","options":["...","...","..."],"answer":0}]} (exactly 8 items)`,
    build: (o) => {
      const items = arr(o?.items, 8);
      if (!items) return null;
      const qs = mcqs(items.map((x: J) => ({ q: 'Question', options: x?.options, answer: x?.answer })), 3, 1);
      if (!qs || items.some((x: J) => !str(x?.say))) return null;
      return {
        title: 'Part 1',
        instr: 'You will hear some sentences. You will hear each sentence twice. Choose the correct reply to each sentence (A, B or C).',
        audioPerQ: items.map((x: J) => [{ v: voice(x.v) === 'M' ? 'M' : 'F', t: str(x.say)! }]),
        repeat: 2,
        qs: qs.map((q, i) => ({ ...q, q: `Question ${i + 1}` }))
      };
    }
  },
  'ml-l2': {
    maxTokens: 1600,
    prompt: `${COMMON}
Create a short talk (about 220 words, one speaker, e.g. a guide, organiser or manager giving practical information) and 6 note sentences with a gap "___" each. Each answer is ONE WORD and/or A NUMBER taken exactly from the talk, in the same order as in the talk.
JSON: {"v":"F"|"M","talk":["paragraph","paragraph","paragraph"],"notes":[{"q":"The café is next to the ___ garden.","answers":["rose"]}]} (exactly 6 notes; for numbers give both forms, e.g. ["15","fifteen"])`,
    build: (o) => {
      const talk = arr(o?.talk)?.map((p) => str(p, 20)).filter(Boolean) as string[] | undefined;
      const notes = arr(o?.notes, 6);
      if (!talk?.length || !notes) return null;
      const v = voice(o.v) === 'M' ? 'M' : 'F';
      const audio: Seg[] = talk.map((t) => ({ v, t }));
      const qs = gaps(notes, 1, scriptText(audio));
      return qs && { title: 'Part 2', instr: 'You will hear someone giving a talk. For each question, fill in the missing information. Write ONE WORD and / or A NUMBER for each answer.', audio, repeat: 2, qs };
    }
  },
  'ml-l3': {
    maxTokens: 1400,
    prompt: `${COMMON}
Create a "where is the speaker?" task: 6 places (short phrases like "at a train station") and 4 speakers. Each speaker says 2–3 sentences that clearly show one of the places WITHOUT naming it. The 4 speakers use 4 DIFFERENT places; 2 places are extra.
JSON: {"places":["...",x6],"speakers":[{"v":"F"|"M"|"F2"|"M2","t":"...","place":0}]} (exactly 4 speakers; place = index 0–5)`,
    build: (o) => {
      const places = arr(o?.places, 6)?.map((p) => str(p));
      const sp = arr(o?.speakers, 4);
      if (!places || places.some((p) => !p) || !sp) return null;
      const ans = sp.map((x: J) => Number(x?.place));
      if (ans.some((a: number) => !(a >= 0 && a < 6)) || new Set(ans).size !== 4 || sp.some((x: J) => !str(x?.t, 20))) return null;
      const audio: Seg[] = sp.flatMap((x: J, i: number) => [{ v: 'N' as const, t: `Speaker ${i + 1}.` }, { v: voice(x.v), t: str(x.t)! }]);
      return { title: 'Part 3', instr: 'You will hear people speaking in different situations. Match each speaker to the place where the speaker is (A–F). There are TWO extra places.', options: places as string[], audio, repeat: 2, qs: ans.map((a: number, i: number) => ({ k: 'match', n: i + 1, q: `Speaker ${i + 1}`, a: L[a] })) };
    }
  },
  'ml-l5': {
    maxTokens: 2200,
    prompt: `${COMMON}
Create 3 short extracts (each a natural conversation of 4–6 lines between two people, about 90 words) and 2 multiple-choice questions per extract (3 options each, one correct, testing opinion, reason or detail; the wrong options must be mentioned or plausible but incorrect).
JSON: {"extracts":[{"lines":[{"v":"F"|"M"|"F2"|"M2","t":"..."}],"questions":[{"q":"...","options":["...","...","..."],"answer":0}]}]} (exactly 3 extracts, 2 questions each)`,
    build: (o) => {
      const ex = arr(o?.extracts, 3);
      if (!ex) return null;
      const audio: Seg[] = [];
      const qs: EQ[] = [];
      for (const [k, e] of ex.entries()) {
        const lines = segs(e?.lines);
        const q = arr(e?.questions, 2) && mcqs(e.questions, 3, qs.length + 1);
        if (!lines || !q) return null;
        audio.push({ v: 'N', t: `Extract ${['one', 'two', 'three'][k]}.` }, ...lines);
        qs.push(...q.map((x) => ({ ...x, q: `Extract ${k + 1}. ${(x as { q: string }).q}` })));
      }
      return { title: 'Part 5', instr: 'You will hear three extracts. Choose the correct answer (A, B or C). There are TWO questions for each extract.', audio, repeat: 2, qs };
    }
  },
  'ml-l6': {
    maxTokens: 1600,
    prompt: `${COMMON}
Create part of a lecture (about 250 words, one speaker) with a TITLE, and 6 note sentences with a gap "___". Each answer is ONE WORD taken exactly from the lecture (not a number), in the order it is mentioned.
JSON: {"title":"...","v":"F"|"M","lecture":["paragraph","paragraph","paragraph"],"notes":[{"q":"...___...","answers":["word"]}]} (exactly 6 notes)`,
    build: (o) => {
      const lec = arr(o?.lecture)?.map((p) => str(p, 20)).filter(Boolean) as string[] | undefined;
      const notes = arr(o?.notes, 6);
      const title = str(o?.title);
      if (!lec?.length || !notes || !title) return null;
      const v = voice(o.v) === 'M' ? 'M' : 'F';
      const audio: Seg[] = lec.map((t) => ({ v, t }));
      const qs = gaps(notes, 1, scriptText(audio));
      return qs && { title: 'Part 6', instr: `You will hear a part of a lecture. Fill in the missing information. Write no more than ONE WORD for each answer.\n\n${title.toUpperCase()}`, audio, repeat: 2, qs };
    }
  },
  /* ---------------- Multilevel reading ---------------- */
  'ml-r1': {
    maxTokens: 1600,
    prompt: `${COMMON}
Write an informative text of about 230 words with a title, containing exactly 6 gaps written as (1) ___ … (6) ___. Each missing word must ALSO appear somewhere else in the text (the rule of the task: "use a word which is somewhere in the rest of the text"). Gaps are single words.
JSON: {"title":"...","text":"... (1) ___ ... (6) ___ ...","answers":["word1","word2","word3","word4","word5","word6"]}`,
    build: (o) => {
      const title = str(o?.title);
      const text = str(o?.text, 400);
      const ans = arr(o?.answers, 6)?.map((a) => str(a));
      if (!title || !text || !ans || ans.some((a) => !a || a.includes(' '))) return null;
      for (let i = 1; i <= 6; i++) if (!text.includes(`(${i})`)) return null;
      if (ans.some((a) => !new RegExp(`\\b${a!.replace(/[^a-z']/gi, '')}\\b`, 'i').test(text))) return null;
      return { title: 'Part 1', instr: 'Read the text. Fill in each gap with ONE word. You must use a word which is somewhere in the rest of the text.', text: `${title}\n\n${text}`, qs: ans.map((a, i) => ({ k: 'gap', n: i + 1, q: `Gap ${i + 1}`, a: [a!] })) };
    }
  },
  'ml-r2': {
    maxTokens: 2200,
    prompt: `${COMMON}
Create a matching task: 10 statements describing what a person wants or needs (e.g. "You want to …") and 8 short texts (adverts, notices or descriptions, 35–50 words each, with a short title). Each text matches exactly ONE statement; 2 statements are extra. Avoid copying the statement's words into the text — paraphrase.
JSON: {"statements":["...",x10],"texts":[{"title":"...","body":"...","statement":0}]} (exactly 8 texts; statement = index 0–9, all different)`,
    build: (o) => {
      const st = arr(o?.statements, 10)?.map((s) => str(s));
      const tx = arr(o?.texts, 8);
      if (!st || st.some((s) => !s) || !tx) return null;
      const ans = tx.map((x: J) => Number(x?.statement));
      if (ans.some((a: number) => !(a >= 0 && a < 10)) || new Set(ans).size !== 8 || tx.some((x: J) => !str(x?.title) || !str(x?.body, 60))) return null;
      return {
        title: 'Part 2',
        instr: 'Read the texts and the statements A–J. Decide which text matches the situation described in the statements. There are TWO extra statements.',
        options: st as string[],
        text: tx.map((x: J, i: number) => `${i + 1}. ${str(x.title)}\n${str(x.body)}`).join('\n\n'),
        qs: tx.map((x: J, i: number) => ({ k: 'match', n: i + 1, q: `Text ${i + 1} (${str(x.title)})`, a: L[ans[i]] }))
      };
    }
  },
  'ml-r3': {
    maxTokens: 2200,
    prompt: `${COMMON}
Write an article (title + exactly 6 paragraphs of 50–70 words) and a list of 8 headings. Each paragraph matches one DIFFERENT heading; 2 headings are extra but plausible.
JSON: {"title":"...","headings":["...",x8],"paragraphs":[{"text":"...","heading":0}]} (exactly 6 paragraphs; heading = index 0–7)`,
    build: (o) => {
      const title = str(o?.title);
      const hd = arr(o?.headings, 8)?.map((h) => str(h));
      const ps = arr(o?.paragraphs, 6);
      if (!title || !hd || hd.some((h) => !h) || !ps) return null;
      const ans = ps.map((p: J) => Number(p?.heading));
      if (ans.some((a: number) => !(a >= 0 && a < 8)) || new Set(ans).size !== 6 || ps.some((p: J) => !str(p?.text, 120))) return null;
      const R = ['I', 'II', 'III', 'IV', 'V', 'VI'];
      return { title: 'Part 3', instr: 'Read the text and choose the correct heading for each paragraph. There are more headings than paragraphs.', options: hd as string[], text: `${title.toUpperCase()}\n\n${ps.map((p: J, i: number) => `${R[i]}. ${str(p.text)}`).join('\n\n')}`, qs: ans.map((a: number, i: number) => ({ k: 'match', n: i + 1, q: `Paragraph ${R[i]}`, a: L[a] })) };
    }
  },
  'ml-r4': {
    maxTokens: 2600,
    prompt: `${COMMON}
Write a magazine article (title + about 420 words) and: 4 multiple-choice questions (4 options, one correct) and 5 statements for True / False / No Information (answer 0 = True, 1 = False, 2 = No Information; include at least one of each).
JSON: {"title":"...","text":"...","mcq":[{"q":"...","options":["...","...","...","..."],"answer":0}],"tfn":[{"q":"...","answer":0}]} (exactly 4 mcq, 5 tfn)`,
    build: (o) => {
      const title = str(o?.title);
      const text = str(o?.text, 1200);
      const m = arr(o?.mcq, 4) && mcqs(o.mcq, 4, 1);
      const t = arr(o?.tfn, 5);
      if (!title || !text || !m || !t) return null;
      const tq: EQ[] = [];
      for (const [i, x] of t.entries()) {
        const a = Number(x?.answer);
        if (!str(x?.q) || !(a >= 0 && a <= 2)) return null;
        tq.push({ k: 'mcq', n: 5 + i, q: str(x.q)!, opts: ['True', 'False', 'No Information'], a });
      }
      if (new Set(tq.map((q) => (q as { a: number }).a)).size < 3) return null;
      return { title: 'Part 4', instr: 'Read the text. Choose the correct answer A, B, C or D, then decide if the statements agree with the information in the text.', text: `${title.toUpperCase()}\n\n${text}`, qs: [...m, ...tq] };
    }
  },
  'ml-r5': {
    maxTokens: 2200,
    prompt: `${COMMON}
Write an informative text (title + about 330 words), 4 summary sentences with a gap "___" whose answers are ONE WORD and/or A NUMBER copied exactly from the text, and 2 multiple-choice questions (4 options; the last one asks about the writer's main purpose).
JSON: {"title":"...","text":"...","gaps":[{"q":"...___...","answers":["..."]}],"mcq":[{"q":"...","options":["...","...","...","..."],"answer":0}]} (exactly 4 gaps, 2 mcq)`,
    build: (o) => {
      const title = str(o?.title);
      const text = str(o?.text, 900);
      if (!title || !text) return null;
      const g = arr(o?.gaps, 4) && gaps(o.gaps, 1, text);
      const m = arr(o?.mcq, 2) && mcqs(o.mcq, 4, 5);
      return g && m ? { title: 'Part 5', instr: 'Read the text. Write no more than ONE WORD and / or A NUMBER for the gaps, then choose the correct answer A, B, C or D.', text: `${title.toUpperCase()}\n\n${text}`, qs: [...g, ...m] } : null;
    }
  },
  /* ---------------- IELTS listening ---------------- */
  'ie-l1': {
    maxTokens: 2200,
    prompt: `${COMMON}
Create IELTS Listening Part 1: a phone or desk conversation (16–22 lines) between a female and a male speaker in an everyday situation (booking, registering, enquiring), in which personal and practical details are given (names spelled letter by letter, numbers, dates, prices). Then a form title and 10 form lines with a gap "___"; each answer is ONE WORD AND/OR A NUMBER said in the conversation, in order. Spell names in the dialogue like "H, A, double L".
JSON: {"form":"FORM TITLE","lines":[{"v":"F"|"M","t":"..."}],"gaps":[{"q":"Surname: ___","answers":["..."]}]} (exactly 10 gaps; give numbers in digit and word form)`,
    build: (o) => {
      const lines = segs(o?.lines, ['F', 'M']);
      const form = str(o?.form);
      if (!lines || !form) return null;
      // names are spelled out letter by letter ("H, A, double L, A, M"), so also search the joined spelling
      const raw = scriptText(lines);
      const spelled = raw.replace(/double ([A-Za-z])\b/gi, '$1$1').replace(/\b([A-Za-z]{1,2})((?:,?\s+[A-Za-z]{1,2}\b){2,})/g, (m) => m.replace(/[,\s]/g, ''));
      const g = arr(o?.gaps, 10) && gaps(o.gaps, 1, `${raw} ${spelled}`);
      return g && { title: 'Part 1', instr: `Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.\n\n${form.toUpperCase()}`, audio: lines, repeat: 1, qs: g };
    }
  },
  'ie-l2': {
    maxTokens: 2400,
    prompt: `${COMMON}
Create IELTS Listening Part 2: one speaker (organiser, guide or manager) giving information to the public (about 380 words, 5–7 paragraphs). Then 6 multiple-choice questions (3 options) and a matching task: a list of 7 options and 4 items/places, each matching a DIFFERENT option (3 extra).
JSON: {"v":"F"|"M","talk":["..."],"mcq":[{"q":"...","options":["...","...","..."],"answer":0}],"options":["...",x7],"match":[{"q":"...","answer":0}]} (exactly 6 mcq, 7 options, 4 match)`,
    build: (o) => {
      const talk = arr(o?.talk)?.map((p) => str(p, 20)).filter(Boolean) as string[] | undefined;
      const m = arr(o?.mcq, 6) && mcqs(o.mcq, 3, 1);
      const opts = arr(o?.options, 7)?.map((x) => str(x));
      const mt = arr(o?.match, 4);
      if (!talk?.length || !m || !opts || opts.some((x) => !x) || !mt) return null;
      const ans = mt.map((x: J) => Number(x?.answer));
      if (ans.some((a: number) => !(a >= 0 && a < 7)) || new Set(ans).size !== 4 || mt.some((x: J) => !str(x?.q))) return null;
      const v = voice(o.v) === 'M' ? 'M' : 'F';
      return { title: 'Part 2', instr: 'Choose the correct letter A, B or C. Then choose the correct option from the list for each item.', options: opts as string[], audio: talk.map((t) => ({ v, t })), repeat: 1, qs: [...m, ...mt.map((x: J, i: number) => ({ k: 'match' as const, n: 7 + i, q: str(x.q)!, a: L[ans[i]] }))] };
    }
  },
  'ie-l3': {
    maxTokens: 2400,
    prompt: `${COMMON}
Create IELTS Listening Part 3: a discussion (16–22 lines) between two university students (one female "F2", one male "M2"), sometimes with a tutor, about an assignment, project or research. Then 10 multiple-choice questions (3 options each) about opinions, decisions, reasons and plans, in the order of the conversation.
JSON: {"lines":[{"v":"F2"|"M2"|"F","t":"..."}],"mcq":[{"q":"...","options":["...","...","..."],"answer":0}]} (exactly 10 mcq)`,
    build: (o) => {
      const lines = segs(o?.lines, ['F2', 'M2', 'F']);
      const m = arr(o?.mcq, 10) && mcqs(o.mcq, 3, 1);
      return lines && m ? { title: 'Part 3', instr: 'Choose the correct letter A, B or C.', audio: lines, repeat: 1, qs: m } : null;
    }
  },
  'ie-l4': {
    maxTokens: 2200,
    prompt: `${COMMON}
Create IELTS Listening Part 4: an academic lecture (about 420 words, one speaker, 5–6 paragraphs) on a scientific, historical or social topic, with a TITLE. Then 10 note sentences with a gap "___"; each answer is ONE WORD (or a number) copied exactly from the lecture, in order.
JSON: {"title":"...","v":"F"|"M","lecture":["..."],"notes":[{"q":"...___...","answers":["..."]}]} (exactly 10 notes)`,
    build: (o) => {
      const lec = arr(o?.lecture)?.map((p) => str(p, 20)).filter(Boolean) as string[] | undefined;
      const title = str(o?.title);
      if (!lec?.length || !title) return null;
      const v = voice(o.v) === 'M' ? 'M' : 'F';
      const audio: Seg[] = lec.map((t) => ({ v, t }));
      const g = arr(o?.notes, 10) && gaps(o.notes, 1, scriptText(audio));
      return g && { title: 'Part 4', instr: `Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.\n\n${title.toUpperCase()}`, audio, repeat: 1, qs: g };
    }
  },
  /* ---------------- IELTS reading ---------------- */
  'ie-r1': {
    maxTokens: 3000,
    prompt: `${COMMON}
Create IELTS Academic Reading Passage 1: an academic-style passage (title + about 650 words, paragraphs labelled A–E) on history, science or society. Then 7 statements with answers TRUE(0) / FALSE(1) / NOT GIVEN(2) (at least two of each), and 6 sentence-completion items with a gap "___" whose answers are ONE WORD AND/OR A NUMBER copied exactly from the passage.
JSON: {"title":"...","text":"A. ...\\n\\nB. ...","tfng":[{"q":"...","answer":0}],"gaps":[{"q":"...___...","answers":["..."]}]} (exactly 7 tfng, 6 gaps)`,
    build: (o) => {
      const title = str(o?.title);
      const text = str(o?.text, 2000);
      const t = arr(o?.tfng, 7);
      if (!title || !text || !t) return null;
      const tq: EQ[] = [];
      for (const [i, x] of t.entries()) {
        const a = Number(x?.answer);
        if (!str(x?.q) || !(a >= 0 && a <= 2)) return null;
        tq.push({ k: 'mcq', n: 1 + i, q: str(x.q)!, opts: ['TRUE', 'FALSE', 'NOT GIVEN'], a });
      }
      if (new Set(tq.map((q) => (q as { a: number }).a)).size < 3) return null;
      const g = arr(o?.gaps, 6) && gaps(o.gaps, 8, text);
      return g && { title: 'Reading Passage 1', instr: 'Do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Then complete the sentences with ONE WORD AND/OR A NUMBER from the passage.', text: `${title.toUpperCase()}\n\n${text}`, qs: [...tq, ...g] };
    }
  },
  'ie-r2': {
    maxTokens: 3200,
    prompt: `${COMMON}
Create IELTS Academic Reading Passage 2: a passage (title + exactly 6 paragraphs of 100–130 words) and a list of 8 headings (each paragraph matches a DIFFERENT heading, 2 extra). Then 4 multiple-choice questions (4 options) and 3 sentence-completion items with a gap "___" (ONE WORD copied exactly from the passage).
JSON: {"title":"...","headings":["...",x8],"paragraphs":[{"text":"...","heading":0}],"mcq":[{"q":"...","options":["...","...","...","..."],"answer":0}],"gaps":[{"q":"...___...","answers":["..."]}]} (exactly 6 paragraphs, 4 mcq, 3 gaps)`,
    build: (o) => {
      const title = str(o?.title);
      const hd = arr(o?.headings, 8)?.map((h) => str(h));
      const ps = arr(o?.paragraphs, 6);
      if (!title || !hd || hd.some((h) => !h) || !ps) return null;
      const ans = ps.map((p: J) => Number(p?.heading));
      if (ans.some((a: number) => !(a >= 0 && a < 8)) || new Set(ans).size !== 6 || ps.some((p: J) => !str(p?.text, 300))) return null;
      const R = ['I', 'II', 'III', 'IV', 'V', 'VI'];
      const text = ps.map((p: J, i: number) => `Paragraph ${R[i]}. ${str(p.text)}`).join('\n\n');
      const m = arr(o?.mcq, 4) && mcqs(o.mcq, 4, 7);
      const g = arr(o?.gaps, 3) && gaps(o.gaps, 11, text);
      if (!m || !g) return null;
      return { title: 'Reading Passage 2', instr: 'Choose the correct heading for each paragraph, then answer the questions.', options: hd as string[], text: `${title.toUpperCase()}\n\n${text}`, qs: [...ans.map((a: number, i: number) => ({ k: 'match' as const, n: 1 + i, q: `Paragraph ${R[i]}`, a: L[a] })), ...m, ...g] };
    }
  },
  'ie-r3': {
    maxTokens: 3200,
    prompt: `${COMMON}
Create IELTS Academic Reading Passage 3: an argumentative passage in which the WRITER expresses opinions (title + about 700 words). Then 5 statements about the writer's views with answers YES(0) / NO(1) / NOT GIVEN(2) (at least one of each), 4 multiple-choice questions (4 options), and a 5-gap summary: 5 sentences each with a gap "___" and a list of 8 single words (A–H) from which the 5 answers are chosen (different words; 3 extra).
JSON: {"title":"...","text":"...","yng":[{"q":"...","answer":0}],"mcq":[{"q":"...","options":["...","...","...","..."],"answer":0}],"words":["...",x8],"summary":[{"q":"...___...","answer":0}]} (exactly 5 yng, 4 mcq, 8 words, 5 summary)`,
    build: (o) => {
      const title = str(o?.title);
      const text = str(o?.text, 2200);
      const y = arr(o?.yng, 5);
      const words = arr(o?.words, 8)?.map((w) => str(w));
      const sm = arr(o?.summary, 5);
      const m = arr(o?.mcq, 4) && mcqs(o.mcq, 4, 6);
      if (!title || !text || !y || !words || words.some((w) => !w) || !sm || !m) return null;
      const yq: EQ[] = [];
      for (const [i, x] of y.entries()) {
        const a = Number(x?.answer);
        if (!str(x?.q) || !(a >= 0 && a <= 2)) return null;
        yq.push({ k: 'mcq', n: 1 + i, q: str(x.q)!, opts: ['YES', 'NO', 'NOT GIVEN'], a });
      }
      const sa = sm.map((x: J) => Number(x?.answer));
      if (sa.some((a: number) => !(a >= 0 && a < 8)) || new Set(sa).size !== 5 || sm.some((x: J) => !str(x?.q)?.includes('___'))) return null;
      return { title: 'Reading Passage 3', instr: "Do the statements agree with the writer's views? Choose YES, NO or NOT GIVEN. Then choose the correct letter, and complete the summary using the list of words (A–H).", text: `${title.toUpperCase()}\n\n${text}`, options: words as string[], qs: [...yq, ...m, ...sm.map((x: J, i: number) => ({ k: 'match' as const, n: 10 + i, q: str(x.q)!, a: L[sa[i]] }))] };
    }
  }
};

/* ---------------- writing and speaking prompts (not Blocks) ---------------- */
export type PromptSpec = { prompt: string; build: (o: J) => Record<string, unknown> | null };
export const PROMPTS: Record<string, PromptSpec> = {
  'ml-w': {
    prompt: `${COMMON}
Create a Multilevel (CEFR) writing paper: Task 1 — a realistic situation (2 sentences) asking the candidate to write an email (formal or informal) with exactly 3 bullet points to cover; Task 2 — an essay question (discuss both views / advantages and disadvantages / agree or disagree / problems and solutions).
JSON: {"t1":"situation sentences. Write an email to ... In your email:","bullets":["...","...","..."],"t2":"essay question"}`,
    build: (o) => {
      const t1 = str(o?.t1, 30), t2 = str(o?.t2, 40), b = arr(o?.bullets, 3)?.map((x) => str(x));
      return t1 && t2 && b && b.every(Boolean) ? { t1: `${t1}\n- ${b.join(';\n- ')}.`, t2 } : null;
    }
  },
  'ie-w': {
    prompt: `${COMMON}
Create one IELTS Academic Writing Task 2 question (opinion / discussion / advantages-disadvantages / problem-solution type) on a fresh topic.
JSON: {"t2":"..."}`,
    build: (o) => (str(o?.t2, 40) ? { t2: str(o.t2) } : null)
  },
  'ml-s': {
    prompt: `${COMMON}
Create a Multilevel (CEFR) speaking paper: 3 short personal questions (Part 1.1); a pair of pictures described in words ("Picture A: …; Picture B: …") plus 3 questions starting with "Compare the two pictures." (Part 1.2); a cue card topic "Describe …" with 4 "You should say" points (Part 2); a debate statement with 3 arguments FOR and 3 AGAINST (Part 3).
JSON: {"p11":["?","?","?"],"pics":"Picture A: ... Picture B: ...","p12":["Compare the two pictures.","?","?"],"card":"Describe ...","points":["...","...","...","..."],"topic":"...","for":["...","...","..."],"against":["...","...","..."]}`,
    build: (o) => {
      const p11 = arr(o?.p11, 3)?.map((x) => str(x)), p12 = arr(o?.p12, 3)?.map((x) => str(x)), pts = arr(o?.points, 4)?.map((x) => str(x));
      const fo = arr(o?.for, 3)?.map((x) => str(x)), ag = arr(o?.against, 3)?.map((x) => str(x));
      const pics = str(o?.pics, 30), card = str(o?.card, 10), topic = str(o?.topic, 10);
      if (![p11, p12, pts, fo, ag].every((a) => a && a.every(Boolean)) || !pics || !card || !topic) return null;
      return { p11, pics, p12, card: `${card}\nYou should say:\n- ${pts!.join(';\n- ')}.`, table: `${topic}\n\nFOR:\n- ${fo!.join('\n- ')}\n\nAGAINST:\n- ${ag!.join('\n- ')}` };
    }
  },
  'ie-s': {
    prompt: `${COMMON}
Create an IELTS Speaking test: a familiar Part 1 topic with 4 questions; a Part 2 cue card "Describe …" with 3 "You should say" points and an "and explain …" line; 3 Part 3 discussion questions connected to the cue card topic.
JSON: {"topic":"...","p1":["?","?","?","?"],"card":"Describe ...","points":["...","...","..."],"explain":"and explain ...","p3":["?","?","?"]}`,
    build: (o) => {
      const p1 = arr(o?.p1, 4)?.map((x) => str(x)), p3 = arr(o?.p3, 3)?.map((x) => str(x)), pts = arr(o?.points, 3)?.map((x) => str(x));
      const topic = str(o?.topic), card = str(o?.card, 10), ex = str(o?.explain, 5);
      if (![p1, p3, pts].every((a) => a && a.every(Boolean)) || !topic || !card || !ex) return null;
      return { topic, p1, card: `${card}\nYou should say:\n- ${pts!.join(';\n- ')};\n${ex}`, p3 };
    }
  }
};

/** pull the first JSON object out of a model reply */
export function parseJson(reply: string): J | null {
  const s = reply.replace(/```json|```/g, '');
  const a = s.indexOf('{');
  const b = s.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try {
    return JSON.parse(s.slice(a, b + 1));
  } catch {
    return null;
  }
}
