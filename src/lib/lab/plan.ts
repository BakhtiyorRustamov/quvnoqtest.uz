/**
 * "Board lesson" plan format for the /lab explainer experiment.
 *
 * The AI never draws pixels — it returns this small JSON script: steps, each
 * with a narration line ("say") and a few drawing operations on a 100 × 70
 * board (origin top-left). Geometry is referenced by ids so the board engine
 * (not the model) does the maths, e.g. a point ON a circle at an angle.
 */

export type LabColor = 'ink' | 'blue' | 'red' | 'green' | 'orange' | 'purple';

export type DrawOp =
  | { t: 'title'; text: string }
  | { t: 'point'; id: string; x: number; y: number; label?: string }
  | { t: 'pointOn'; id: string; circle: string; angle: number; label?: string }
  | { t: 'circle'; id: string; center: string; r: number; color?: LabColor }
  | { t: 'line'; from: string; to: string; color?: LabColor; dashed?: boolean; label?: string; arrow?: boolean }
  | { t: 'text'; x: number; y: number; text: string; color?: LabColor; size?: 's' | 'm' | 'l' }
  | { t: 'formula'; x: number; y: number; text: string };

export type LabStep = { say: string; draw: DrawOp[] };
export type LabPlan = { title: string; steps: LabStep[] };

export const LAB_LANG: Record<string, string> = {
  uz: 'Uzbek (Latin script, use the letters oʻ gʻ and the apostrophe ʼ correctly)',
  ru: 'Russian',
  en: 'English'
};

/** System prompt: describes the JSON format precisely, with one worked example. */
export function planSystemPrompt(lang: string): string {
  return `You are a friendly teacher who explains school topics on a whiteboard while talking.
Reply with ONE JSON object only (no markdown, no comments), in this exact shape:

{ "title": string,
  "steps": [ { "say": string, "draw": [ DrawOp, ... ] }, ... ] }

The board is 100 units wide and 70 units tall; x grows to the right, y grows DOWN. Keep everything inside x 4..96, y 6..66.
DrawOp is one of:
  {"t":"title","text":"…"}                                   – big heading at the top-left (use once, in step 1)
  {"t":"point","id":"O","x":50,"y":36,"label":"O"}           – a dot with an optional label
  {"t":"circle","id":"c1","center":"O","r":18,"color":"blue"} – circle around an existing point id
  {"t":"pointOn","id":"A","circle":"c1","angle":0,"label":"A"} – point ON a circle; angle in degrees, 0 = right, 90 = up
  {"t":"line","from":"O","to":"A","color":"red","dashed":false,"label":"r","arrow":false} – segment between two point ids
  {"t":"text","x":60,"y":20,"text":"…","color":"purple","size":"m"} – handwritten note (size s|m|l)
  {"t":"formula","x":30,"y":58,"text":"d = 2·r"}             – formula in a box (plain text/Unicode: ·, ², √, π, ≈)
Colors: ink, blue, red, green, orange, purple.

Rules:
- 4 to 7 steps. Each "say" is 1–2 short, warm, simple sentences for a school student, spoken aloud.
- In "say", write numbers and symbols as words (e.g. "o'n santimetr", not "10 sm"), because it is read by a voice.
- Every step adds 1–4 draw ops that match what is being said. Reuse ids from earlier steps; define a point before using it.
- Use real, correct facts and correct maths. Labels and formulas must agree with the drawing.
- End with a small question for the student in the last step (also shown on the board as text).
- Write "title", "say", labels and texts in ${LAB_LANG[lang] ?? LAB_LANG.uz}.

Example (for "radius of a circle", English):
{"title":"Circle and radius","steps":[
 {"say":"Let's look at a circle. Every circle has a centre point.","draw":[{"t":"title","text":"Circle and radius"},{"t":"point","id":"O","x":40,"y":38,"label":"O"},{"t":"circle","id":"c1","center":"O","r":20,"color":"blue"}]},
 {"say":"A line from the centre to the edge is called the radius.","draw":[{"t":"pointOn","id":"A","circle":"c1","angle":0,"label":"A"},{"t":"line","from":"O","to":"A","color":"red","label":"r"}]},
 {"say":"Two radii in a straight line make the diameter, so the diameter is two times the radius.","draw":[{"t":"pointOn","id":"D","circle":"c1","angle":180,"label":"D"},{"t":"line","from":"D","to":"O","color":"purple"},{"t":"formula","x":70,"y":30,"text":"d = 2·r"}]},
 {"say":"Now you try: if the diameter is ten centimetres, what is the radius?","draw":[{"t":"text","x":66,"y":56,"text":"d = 10 cm → r = ?","color":"blue","size":"m"}]}]}`;
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
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const color = (v: unknown): LabColor | undefined => (COLORS.includes(v as LabColor) ? (v as LabColor) : undefined);

export type PlanCheck = { plan: LabPlan | null; issues: string[] };

/** Pull the first JSON object out of a model reply (tolerates ```json fences / <think> blocks). */
export function extractJson(raw: string): unknown {
  const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```(?:json)?/g, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('no JSON object in reply');
  return JSON.parse(cleaned.slice(start, end + 1));
}

/** Validate + clean a plan. Unknown ops and references to missing ids are dropped and reported. */
export function checkPlan(input: unknown): PlanCheck {
  const issues: string[] = [];
  const obj = (input ?? {}) as Record<string, unknown>;
  const rawSteps = Array.isArray(obj.steps) ? obj.steps : [];
  if (!rawSteps.length) return { plan: null, issues: ['no steps'] };

  const points = new Set<string>();
  const circles = new Set<string>();
  const steps: LabStep[] = [];

  rawSteps.slice(0, 10).forEach((s, si) => {
    const step = (s ?? {}) as Record<string, unknown>;
    const say = str(step.say, 400);
    if (!say) issues.push(`step ${si + 1}: empty "say"`);
    const draw: DrawOp[] = [];
    (Array.isArray(step.draw) ? step.draw : []).slice(0, 8).forEach((o, oi) => {
      const op = (o ?? {}) as Record<string, unknown>;
      const where = `step ${si + 1} op ${oi + 1} (${String(op.t)})`;
      switch (op.t) {
        case 'title': {
          const text = str(op.text, 80);
          if (text) draw.push({ t: 'title', text });
          break;
        }
        case 'point': {
          const id = str(op.id, 12);
          if (!id) return void issues.push(`${where}: no id`);
          points.add(id);
          draw.push({ t: 'point', id, x: num(op.x, 4, 96, 50), y: num(op.y, 6, 66, 35), label: str(op.label, 12) || undefined });
          break;
        }
        case 'circle': {
          const id = str(op.id, 12) || `c${si}${oi}`;
          const center = str(op.center, 12);
          if (!points.has(center)) return void issues.push(`${where}: unknown center "${center}"`);
          circles.add(id);
          draw.push({ t: 'circle', id, center, r: num(op.r, 2, 32, 15), color: color(op.color) });
          break;
        }
        case 'pointOn': {
          const id = str(op.id, 12);
          const circle = str(op.circle, 12);
          if (!id || !circles.has(circle)) return void issues.push(`${where}: unknown circle "${circle}"`);
          points.add(id);
          draw.push({ t: 'pointOn', id, circle, angle: num(op.angle, -720, 720, 0), label: str(op.label, 12) || undefined });
          break;
        }
        case 'line': {
          const from = str(op.from, 12);
          const to = str(op.to, 12);
          if (!points.has(from) || !points.has(to)) return void issues.push(`${where}: unknown point "${!points.has(from) ? from : to}"`);
          draw.push({ t: 'line', from, to, color: color(op.color), dashed: op.dashed === true, label: str(op.label, 24) || undefined, arrow: op.arrow === true });
          break;
        }
        case 'text': {
          const text = str(op.text, 90);
          if (!text) return;
          const size = op.size === 's' || op.size === 'l' ? op.size : 'm';
          draw.push({ t: 'text', x: num(op.x, 2, 96, 50), y: num(op.y, 6, 68, 50), text, color: color(op.color), size });
          break;
        }
        case 'formula': {
          const text = str(op.text, 60);
          if (text) draw.push({ t: 'formula', x: num(op.x, 2, 90, 50), y: num(op.y, 8, 66, 55), text });
          break;
        }
        default:
          issues.push(`${where}: unknown op`);
      }
    });
    steps.push({ say, draw });
  });

  return { plan: { title: str(obj.title, 80) || 'Mavzu', steps }, issues };
}
