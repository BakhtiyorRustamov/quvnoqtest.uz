/**
 * "Board lesson" plan format for the /lab explainer experiment.
 *
 * The AI never draws pixels — it returns this small JSON script: steps, each
 * with a narration line ("say") and a few drawing operations on a 100 × 70
 * board (origin top-left). Shapes are referenced by ids so the board engine
 * (not the model) does the maths, e.g. a point ON a circle at an angle, an
 * arrow that stops at a box edge, or a curve mapped onto axes.
 */

export type LabColor = 'ink' | 'blue' | 'red' | 'green' | 'orange' | 'purple';
export type LabSize = 's' | 'm' | 'l';

export type DrawOp =
  // any subject
  | { t: 'title'; text: string }
  | { t: 'text'; x: number; y: number; text: string; color?: LabColor; size?: LabSize }
  | { t: 'formula'; x: number; y: number; text: string }
  | { t: 'box'; id: string; x: number; y: number; w: number; h: number; text: string; color?: LabColor }
  | { t: 'arrow'; from: string; to: string; label?: string; color?: LabColor }
  | { t: 'list'; x: number; y: number; items: string[]; color?: LabColor }
  | { t: 'table'; x: number; y: number; rows: string[][] }
  | { t: 'bars'; x: number; y: number; w: number; h: number; items: { label: string; value: number }[]; color?: LabColor }
  | { t: 'icon'; x: number; y: number; emoji: string; size?: LabSize }
  // geometry
  | { t: 'point'; id: string; x: number; y: number; label?: string }
  | { t: 'pointOn'; id: string; circle: string; angle: number; label?: string }
  | { t: 'circle'; id: string; center: string; r: number; color?: LabColor }
  | { t: 'line'; from: string; to: string; color?: LabColor; dashed?: boolean; label?: string; arrow?: boolean }
  | { t: 'polygon'; points: string[]; color?: LabColor; fill?: boolean }
  // graphs
  | { t: 'axes'; id: string; x: number; y: number; w: number; h: number; xmin: number; xmax: number; ymin: number; ymax: number; xlabel?: string; ylabel?: string }
  | { t: 'curve'; axes: string; points: [number, number][]; color?: LabColor }
  | { t: 'dot'; axes: string; x: number; y: number; id?: string; label?: string };

export type LabStep = { say: string; draw: DrawOp[] };
export type LabPlan = { title: string; steps: LabStep[] };

export const LAB_LANG: Record<string, string> = {
  uz: 'Uzbek (Latin script, use the letters oʻ gʻ and the apostrophe ʼ correctly)',
  ru: 'Russian',
  en: 'English'
};

/** Microsoft neural voices offered in the lab (Azure AI Speech), per language. */
export const AZURE_VOICES: Record<string, string[]> = {
  uz: ['uz-UZ-MadinaNeural', 'uz-UZ-SardorNeural'],
  ru: ['ru-RU-SvetlanaNeural', 'ru-RU-DmitryNeural'],
  en: ['en-US-AvaMultilingualNeural', 'en-US-AndrewMultilingualNeural']
};

/** System prompt: the JSON format, which tools fit which subject, two worked examples. */
export function planSystemPrompt(lang: string): string {
  return `You are a friendly teacher who explains school topics on a whiteboard while talking.
Reply with ONE JSON object only (no markdown, no comments, nothing after it), in this exact shape:
{ "title": string, "steps": [ { "say": string, "draw": [ DrawOp, ... ] }, ... ] }

BOARD: 100 units wide, 70 tall; x grows right, y grows DOWN. Keep everything inside x 3..97, y 12..67 (the title uses the top).
Text needs about 2 units of width per character (size m), 1.6 (size s), 2.7 (size l). Lay things out so nothing overlaps.

DrawOp — any subject:
  {"t":"title","text":"…"}                                         heading (once, in step 1)
  {"t":"text","x":60,"y":20,"text":"…","color":"purple","size":"m"} handwritten note (x,y = left end of the baseline)
  {"t":"formula","x":30,"y":58,"text":"S = a·b"}                   formula in a box (plain Unicode: · ² √ π ≈ → ×)
  {"t":"box","id":"b1","x":5,"y":20,"w":26,"h":10,"text":"…","color":"blue"}   card with short text (≤ 30 chars), x,y = top-left
  {"t":"arrow","from":"b1","to":"b2","label":"…"}                 arrow between two boxes or points (stops at box edges)
  {"t":"list","x":55,"y":24,"items":["…","…"]}                    bullet list, 2–5 short items, one per line (7 units apart)
  {"t":"table","x":10,"y":24,"rows":[["Year","Money"],["1","110"]]} small table, first row = header, ≤ 5 rows, ≤ 4 columns
  {"t":"bars","x":55,"y":22,"w":38,"h":30,"items":[{"label":"2024","value":12}]}   bar chart, 2–7 bars
  {"t":"icon","x":80,"y":30,"emoji":"🌍","size":"l"}               one emoji picture (x,y = centre)
DrawOp — geometry (only for geometry topics):
  {"t":"point","id":"A","x":20,"y":55,"label":"A"}                 a named point
  {"t":"line","from":"A","to":"B","color":"red","dashed":false,"label":"c","arrow":false}  segment between point ids
  {"t":"polygon","points":["A","B","C"],"color":"blue","fill":true} triangle / quadrilateral through point ids
  {"t":"circle","id":"c1","center":"O","r":18,"color":"blue"}      circle around a point id
  {"t":"pointOn","id":"P","circle":"c1","angle":0,"label":"P"}     point ON a circle; degrees, 0 = right, 90 = up
DrawOp — graphs of functions and data:
  {"t":"axes","id":"a1","x":8,"y":16,"w":46,"h":46,"xmin":-4,"xmax":4,"ymin":-2,"ymax":10,"xlabel":"x","ylabel":"y"}
  {"t":"curve","axes":"a1","points":[[-3,9],[-2,4],[-1,1],[0,0],[1,1],[2,4],[3,9]],"color":"red"}   in axis units, 5–40 points
  {"t":"dot","axes":"a1","x":2,"y":4,"id":"M","label":"(2; 4)"}     marked point on the axes
Colors: ink, blue, red, green, orange, purple.

CHOOSE TOOLS THAT FIT THE SUBJECT:
- Geometry → point, line, polygon, circle (circle ONLY if the topic involves circles).
- Algebra, functions, physics graphs → axes + curve + dot, formula.
- Finance, economics, statistics → table, bars, formula, box.
- History, geography, biology, literature, languages → box + arrow (cause → effect, process, timeline), list, icon, text.
Never draw shapes that are unrelated to the topic.

RULES:
- 4 to 7 steps. Each "say" is 1–2 short, warm, simple sentences for a school student, spoken aloud.
- In "say", write numbers and symbols as words ("o'n foiz", not "10%"), because a voice reads it.
- Each step adds 1–4 draw ops that show exactly what is being said. Define an id before using it.
- Use real, correct facts and correct maths; labels, numbers and the drawing must agree.
- The last step asks the student a small question (also written on the board).
- Write "title", "say" and all board text in ${LAB_LANG[lang] ?? LAB_LANG.uz}.

Example 1 (finance, English):
{"title":"Simple interest","steps":[
 {"say":"You put one hundred dollars in a bank that pays ten percent a year.","draw":[{"t":"title","text":"Simple interest"},{"t":"icon","x":12,"y":30,"emoji":"🏦","size":"l"},{"t":"box","id":"b1","x":22,"y":24,"w":28,"h":11,"text":"$100 at 10%/year","color":"blue"}]},
 {"say":"Each year the bank adds ten percent of one hundred, which is ten dollars.","draw":[{"t":"formula","x":56,"y":31,"text":"100 · 10% = $10"}]},
 {"say":"So the money grows by the same ten dollars every year.","draw":[{"t":"table","x":6,"y":44,"rows":[["Year","Money"],["0","$100"],["1","$110"],["2","$120"]]},{"t":"bars","x":44,"y":42,"w":34,"h":22,"items":[{"label":"0","value":100},{"label":"1","value":110},{"label":"2","value":120}],"color":"green"}]},
 {"say":"Your turn: how much money will there be after three years?","draw":[{"t":"text","x":80,"y":52,"text":"3 → ?","color":"red","size":"l"}]}]}

Example 2 (geometry, English):
{"title":"Area of a triangle","steps":[
 {"say":"Here is a triangle with base A B.","draw":[{"t":"title","text":"Area of a triangle"},{"t":"point","id":"A","x":10,"y":58,"label":"A"},{"t":"point","id":"B","x":50,"y":58,"label":"B"},{"t":"point","id":"C","x":32,"y":24,"label":"C"},{"t":"polygon","points":["A","B","C"],"color":"blue","fill":true}]},
 {"say":"Drop a straight line from C down to the base. This is the height.","draw":[{"t":"point","id":"H","x":32,"y":58,"label":"H"},{"t":"line","from":"C","to":"H","color":"red","dashed":true,"label":"h"}]},
 {"say":"The area is half of the base times the height.","draw":[{"t":"formula","x":60,"y":34,"text":"S = ½ · a · h"}]},
 {"say":"Try it: the base is eight and the height is five. What is the area?","draw":[{"t":"text","x":60,"y":50,"text":"a = 8, h = 5 → S = ?","color":"green","size":"m"}]}]}`;
}

export function planUserPrompt(topic: string): string {
  return `Topic / question: ${topic.trim().slice(0, 300)}`;
}

/* ------------------------------ validation ------------------------------ */

const COLORS: LabColor[] = ['ink', 'blue', 'red', 'green', 'orange', 'purple'];
const num = (v: unknown, lo: number, hi: number, d: number) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;
};
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : typeof v === 'number' ? String(v) : '');
const color = (v: unknown): LabColor | undefined => (COLORS.includes(v as LabColor) ? (v as LabColor) : undefined);
const size = (v: unknown): LabSize => (v === 's' || v === 'l' ? v : 'm');

export type PlanCheck = { plan: LabPlan | null; issues: string[] };

/**
 * Pull the first complete JSON object out of a model reply. Tolerates
 * ```json fences, <think> blocks and anything the model writes after the
 * object (gpt-oss sometimes appends a second object or a note).
 */
export function extractJson(raw: string): unknown {
  const s = raw.replace(/<think>[\s\S]*?<\/think>/g, '');
  const start = s.indexOf('{');
  if (start < 0) throw new Error('no JSON object in reply');
  let depth = 0;
  let inStr = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') i++;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return JSON.parse(s.slice(start, i + 1));
  }
  throw new Error('JSON object is cut off (reply too long?)');
}

/** Validate + clean a plan. Unknown ops and references to missing ids are dropped and reported. */
export function checkPlan(input: unknown): PlanCheck {
  const issues: string[] = [];
  const obj = (input ?? {}) as Record<string, unknown>;
  const rawSteps = Array.isArray(obj.steps) ? obj.steps : [];
  if (!rawSteps.length) return { plan: null, issues: ['no steps'] };

  const points = new Set<string>();
  const circles = new Set<string>();
  const boxes = new Set<string>();
  const axes = new Set<string>();
  const steps: LabStep[] = [];
  let auto = 0;

  rawSteps.slice(0, 10).forEach((s, si) => {
    const step = (s ?? {}) as Record<string, unknown>;
    const say = str(step.say, 400);
    if (!say) issues.push(`step ${si + 1}: empty "say"`);
    const draw: DrawOp[] = [];
    (Array.isArray(step.draw) ? step.draw : []).slice(0, 8).forEach((o, oi) => {
      const op = (o ?? {}) as Record<string, unknown>;
      const where = `step ${si + 1} op ${oi + 1} (${String(op.t)})`;
      const drop = (why: string) => void issues.push(`${where}: ${why}`);
      switch (op.t) {
        case 'title': {
          const text = str(op.text, 80);
          if (text) draw.push({ t: 'title', text });
          break;
        }
        case 'text': {
          const text = str(op.text, 90);
          if (!text) return;
          draw.push({ t: 'text', x: num(op.x, 2, 96, 50), y: num(op.y, 8, 68, 50), text, color: color(op.color), size: size(op.size) });
          break;
        }
        case 'formula': {
          const text = str(op.text, 60);
          if (text) draw.push({ t: 'formula', x: num(op.x, 3, 90, 50), y: num(op.y, 12, 66, 55), text });
          break;
        }
        case 'box': {
          const id = str(op.id, 12) || `box${++auto}`;
          const w = num(op.w, 8, 60, 24);
          const h = num(op.h, 5, 30, 10);
          const x = num(op.x, 2, 98 - w, 10);
          const y = num(op.y, 11, 68 - h, 20);
          boxes.add(id);
          draw.push({ t: 'box', id, x, y, w, h, text: str(op.text, 60), color: color(op.color) });
          break;
        }
        case 'arrow': {
          const from = str(op.from, 12);
          const to = str(op.to, 12);
          const known = (id: string) => boxes.has(id) || points.has(id);
          if (!known(from) || !known(to)) return drop(`unknown id "${!known(from) ? from : to}"`);
          draw.push({ t: 'arrow', from, to, label: str(op.label, 24) || undefined, color: color(op.color) });
          break;
        }
        case 'list': {
          const items = (Array.isArray(op.items) ? op.items : []).map((i) => str(i, 60)).filter(Boolean).slice(0, 6);
          if (!items.length) return drop('no items');
          draw.push({ t: 'list', x: num(op.x, 2, 90, 50), y: num(op.y, 12, 64, 24), items, color: color(op.color) });
          break;
        }
        case 'table': {
          const rows = (Array.isArray(op.rows) ? op.rows : [])
            .filter(Array.isArray)
            .slice(0, 6)
            .map((r) => (r as unknown[]).slice(0, 4).map((c) => str(c, 24)));
          if (!rows.length) return drop('no rows');
          draw.push({ t: 'table', x: num(op.x, 2, 90, 10), y: num(op.y, 11, 62, 24), rows });
          break;
        }
        case 'bars': {
          const items = (Array.isArray(op.items) ? op.items : [])
            .map((i) => {
              const it = (i ?? {}) as Record<string, unknown>;
              const value = Number(it.value);
              return Number.isFinite(value) ? { label: str(it.label, 14), value } : null;
            })
            .filter((i): i is { label: string; value: number } => !!i)
            .slice(0, 8);
          if (!items.length) return drop('no numeric items');
          const w = num(op.w, 15, 90, 36);
          const h = num(op.h, 10, 50, 26);
          draw.push({ t: 'bars', x: num(op.x, 2, 98 - w, 55), y: num(op.y, 11, 66 - h, 22), w, h, items, color: color(op.color) });
          break;
        }
        case 'icon': {
          const emoji = str(op.emoji, 8);
          if (!emoji) return drop('no emoji');
          draw.push({ t: 'icon', x: num(op.x, 4, 96, 50), y: num(op.y, 12, 66, 35), emoji, size: size(op.size) });
          break;
        }
        case 'point': {
          const id = str(op.id, 12);
          if (!id) return drop('no id');
          points.add(id);
          draw.push({ t: 'point', id, x: num(op.x, 3, 97, 50), y: num(op.y, 12, 67, 35), label: str(op.label, 12) || undefined });
          break;
        }
        case 'circle': {
          const id = str(op.id, 12) || `c${++auto}`;
          const center = str(op.center, 12);
          if (!points.has(center)) return drop(`unknown center "${center}"`);
          circles.add(id);
          draw.push({ t: 'circle', id, center, r: num(op.r, 2, 30, 15), color: color(op.color) });
          break;
        }
        case 'pointOn': {
          const id = str(op.id, 12);
          const circle = str(op.circle, 12);
          if (!id || !circles.has(circle)) return drop(`unknown circle "${circle}"`);
          points.add(id);
          draw.push({ t: 'pointOn', id, circle, angle: num(op.angle, -720, 720, 0), label: str(op.label, 12) || undefined });
          break;
        }
        case 'line': {
          const from = str(op.from, 12);
          const to = str(op.to, 12);
          if (!points.has(from) || !points.has(to)) return drop(`unknown point "${!points.has(from) ? from : to}"`);
          draw.push({ t: 'line', from, to, color: color(op.color), dashed: op.dashed === true, label: str(op.label, 24) || undefined, arrow: op.arrow === true });
          break;
        }
        case 'polygon': {
          const ids = (Array.isArray(op.points) ? op.points : []).map((p) => str(p, 12)).slice(0, 8);
          const missing = ids.find((p) => !points.has(p));
          if (ids.length < 3 || missing !== undefined) return drop(missing !== undefined ? `unknown point "${missing}"` : 'needs 3+ points');
          draw.push({ t: 'polygon', points: ids, color: color(op.color), fill: op.fill === true });
          break;
        }
        case 'axes': {
          const id = str(op.id, 12) || `a${++auto}`;
          const w = num(op.w, 15, 94, 46);
          const h = num(op.h, 15, 56, 46);
          let xmin = num(op.xmin, -1e6, 1e6, -5);
          let xmax = num(op.xmax, -1e6, 1e6, 5);
          let ymin = num(op.ymin, -1e6, 1e6, -5);
          let ymax = num(op.ymax, -1e6, 1e6, 5);
          if (xmax <= xmin) [xmin, xmax] = [-5, 5];
          if (ymax <= ymin) [ymin, ymax] = [-5, 5];
          axes.add(id);
          draw.push({
            t: 'axes', id, x: num(op.x, 3, 97 - w, 8), y: num(op.y, 11, 67 - h, 16), w, h, xmin, xmax, ymin, ymax,
            xlabel: str(op.xlabel, 12) || undefined, ylabel: str(op.ylabel, 12) || undefined
          });
          break;
        }
        case 'curve': {
          const ax = str(op.axes, 12);
          if (!axes.has(ax)) return drop(`unknown axes "${ax}"`);
          const pts = (Array.isArray(op.points) ? op.points : [])
            .filter((p): p is [number, number] => Array.isArray(p) && Number.isFinite(Number(p[0])) && Number.isFinite(Number(p[1])))
            .map((p) => [Number(p[0]), Number(p[1])] as [number, number])
            .slice(0, 80);
          if (pts.length < 2) return drop('needs 2+ points');
          draw.push({ t: 'curve', axes: ax, points: pts, color: color(op.color) });
          break;
        }
        case 'dot': {
          const ax = str(op.axes, 12);
          if (!axes.has(ax)) return drop(`unknown axes "${ax}"`);
          const id = str(op.id, 12) || undefined;
          if (id) points.add(id);
          draw.push({ t: 'dot', axes: ax, x: num(op.x, -1e6, 1e6, 0), y: num(op.y, -1e6, 1e6, 0), id, label: str(op.label, 16) || undefined });
          break;
        }
        default:
          drop('unknown op');
      }
    });
    steps.push({ say, draw });
  });

  return { plan: { title: str(obj.title, 80) || 'Mavzu', steps }, issues };
}
