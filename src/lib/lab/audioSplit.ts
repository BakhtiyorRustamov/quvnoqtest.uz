/**
 * Split one long narration into per-step clips.
 *
 * The voice does not reliably make the pause between paragraphs longer than
 * the pause between sentences, so "cut at the N − 1 longest silences" puts
 * sentences into the wrong clip. Instead we use the TEXT we sent: every
 * paragraph should take time roughly proportional to how much there is to
 * say. Among all silences we pick the set of cut points whose clip lengths
 * best match the expected lengths, preferring longer silences (dynamic
 * programming over the candidate pauses). A cut is therefore always placed in
 * a real pause, and it is the pause nearest to where the paragraph should end.
 */

export type SplitResult =
  | { ok: true; segments: Int16Array[]; gapsMs: number[]; driftPct: number[]; boundsSec: [number, number][] }
  | { ok: false; error: string; found: number };

const FRAME_MS = 20;

/** Rough "how long does this take to say" weight for a paragraph. */
export function spokenWeight(text: string): number {
  let w = 0;
  // numbers are read as words: "35" → "oʻttiz besh"
  const t = text.replace(/\d+/g, (d) => {
    w += 5 * d.length + 2;
    return ' ';
  });
  w += t.replace(/[^\p{L}]/gu, '').length;
  w += (t.match(/[.!?…:]/g)?.length ?? 0) * 6; // sentence pauses
  w += (t.match(/[,;—–-]/g)?.length ?? 0) * 2; // short pauses
  w += (t.match(/[=+−×:%]/g)?.length ?? 0) * 4; // symbols read as words
  return Math.max(w, 1);
}

/**
 * `hints` (optional, seconds): where speech recognition heard each paragraph
 * start. When present they decide the cut, snapped to the nearest real pause;
 * the text-length estimate only fills in boundaries without a hint.
 */
export function splitByText(pcm: Int16Array, rate: number, texts: string[], hints?: (number | null)[], minGapMs = 200): SplitResult {
  const parts = texts.length;
  if (parts <= 1) return { ok: true, segments: [trim(pcm, rate)], gapsMs: [], driftPct: [], boundsSec: [[0, pcm.length / rate]] };
  const frame = Math.round((rate * FRAME_MS) / 1000);
  const n = Math.floor(pcm.length / frame);
  const rms = new Float64Array(n);
  let peak = 0;
  for (let f = 0; f < n; f++) {
    let s = 0;
    for (let i = f * frame; i < (f + 1) * frame; i++) s += pcm[i] * pcm[i];
    rms[f] = Math.sqrt(s / frame);
    if (rms[f] > peak) peak = rms[f];
  }
  const thr = Math.max(peak * 0.035, 60);

  let firstLoud = 0;
  while (firstLoud < n && rms[firstLoud] < thr) firstLoud++;
  let lastLoud = n - 1;
  while (lastLoud > 0 && rms[lastLoud] < thr) lastLoud--;
  if (lastLoud <= firstLoud) return { ok: false, error: 'no speech found', found: 0 };

  // candidate pauses (frame index of the middle, length in frames)
  const minFrames = Math.round(minGapMs / FRAME_MS);
  const cand: { mid: number; len: number }[] = [];
  for (let f = firstLoud; f <= lastLoud; ) {
    if (rms[f] < thr) {
      const start = f;
      while (f <= lastLoud && rms[f] < thr) f++;
      if (f - start >= minFrames) cand.push({ mid: start + Math.floor((f - start) / 2), len: f - start });
    } else f++;
  }
  const M = cand.length;
  if (M < parts - 1) return { ok: false, error: `found ${M} pauses, need ${parts - 1}`, found: M };

  const weights = texts.map(spokenWeight);
  const total = weights.reduce((a, b) => a + b, 0);
  const span = lastLoud - firstLoud;
  const expected = weights.map((w) => (w / total) * span);
  const longest = Math.max(...cand.map((c) => c.len));

  // positions: 0 = start of speech, 1..M = candidates, M+1 = end of speech
  const pos = [firstLoud, ...cand.map((c) => c.mid), lastLoud];
  const hinted = (hints ?? []).some((h) => h !== null && h !== undefined);
  const segCost = (k: number, a: number, b: number) => {
    const d = (pos[b] - pos[a] - expected[k]) / expected[k];
    return d * d * (hinted ? 0.5 : 4);
  };
  // the k-th cut (1-based) should sit at the recognised paragraph start
  const hintCost = (k: number, i: number) => {
    const h = hints?.[k - 1];
    if (h === null || h === undefined) return 0;
    const d = ((pos[i] * FRAME_MS) / 1000 - h) / 0.35;
    return Math.min(d * d, 60);
  };
  // longer pauses are more likely to be paragraph breaks
  const pauseBonus = (i: number) => (cand[i - 1].len / longest) * 0.6;

  // dp[k][i]: best cost when the k-th cut (1-based) is at candidate i
  const INF = Number.POSITIVE_INFINITY;
  const dp: Float64Array[] = [];
  const from: Int32Array[] = [];
  for (let k = 0; k < parts; k++) {
    dp.push(new Float64Array(M + 2).fill(INF));
    from.push(new Int32Array(M + 2).fill(-1));
  }
  for (let i = 1; i <= M; i++) dp[1][i] = segCost(0, 0, i) + hintCost(1, i) - pauseBonus(i);
  for (let k = 2; k < parts; k++) {
    for (let i = k; i <= M; i++) {
      for (let j = k - 1; j < i; j++) {
        if (dp[k - 1][j] === INF) continue;
        const c = dp[k - 1][j] + segCost(k - 1, j, i) + hintCost(k, i) - pauseBonus(i);
        if (c < dp[k][i]) {
          dp[k][i] = c;
          from[k][i] = j;
        }
      }
    }
  }
  let best = INF;
  let bi = -1;
  for (let i = parts - 1; i <= M; i++) {
    if (dp[parts - 1][i] === INF) continue;
    const c = dp[parts - 1][i] + segCost(parts - 1, i, M + 1);
    if (c < best) {
      best = c;
      bi = i;
    }
  }
  if (bi < 0) return { ok: false, error: 'could not place the cuts', found: M };
  const chosen: number[] = [];
  for (let k = parts - 1, i = bi; k >= 1; i = from[k][i], k--) chosen.unshift(i);

  const cuts = chosen.map((i) => cand[i - 1].mid * frame);
  const bounds = [0, ...cuts, pcm.length];
  const segments = bounds.slice(0, -1).map((s, i) => trim(pcm.subarray(s, bounds[i + 1]), rate));
  const p = [0, ...chosen, M + 1];
  const driftPct = expected.map((e, k) => Math.round(((pos[p[k + 1]] - pos[p[k]] - e) / e) * 100));
  const boundsSec = bounds.slice(0, -1).map((b, i) => [b / rate, bounds[i + 1] / rate] as [number, number]);
  return { ok: true, segments, gapsMs: chosen.map((i) => cand[i - 1].len * FRAME_MS), driftPct, boundsSec };
}

/** Trim silence at both ends, keeping ~150 ms of air. */
function trim(pcm: Int16Array, rate: number): Int16Array {
  const thr = 200;
  let a = 0;
  while (a < pcm.length && Math.abs(pcm[a]) < thr) a++;
  let b = pcm.length - 1;
  while (b > a && Math.abs(pcm[b]) < thr) b--;
  const pad = Math.round(rate * 0.15);
  return pcm.subarray(Math.max(0, a - pad), Math.min(pcm.length, b + pad));
}
