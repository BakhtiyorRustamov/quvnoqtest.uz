/** English exam data model (Multilevel CEFR and IELTS Academic). All texts are original. */

/** one spoken line: N = narrator/examiner, F = female voice, M = male voice, F2/M2 = second female/male */
export type Voice = 'N' | 'F' | 'M' | 'F2' | 'M2';
export type Seg = { v: Voice; t: string };

export type EQ =
  | { k: 'mcq'; n: number; q: string; opts: string[]; a: number }
  /** typed answer; `a` lists accepted answers (case/space-insensitive) */
  | { k: 'gap'; n: number; q: string; a: string[] }
  /** pick a letter from the block's shared `options` (or map letters) */
  | { k: 'match'; n: number; q: string; a: string };

export type MapSpot = { label: string; x: number; y: number };
export type MapSpec = { title: string; spots: MapSpot[]; landmarks: { label: string; x: number; y: number; w: number; h: number }[] };

export type Block = {
  title: string;
  instr: string;
  /** reading passage / notes with gaps / statements text shown above questions */
  text?: string;
  /** shared lettered options (A, B, C …) for match questions */
  options?: string[];
  map?: MapSpec;
  /** one recording for the whole block */
  audio?: Seg[];
  /** one recording per question (Multilevel listening part 1) */
  audioPerQ?: Seg[][];
  /** how many times the recording is played */
  repeat?: 1 | 2;
  qs: EQ[];
};

export type ExamKind = 'multilevel' | 'ielts';
export type SectionKind = 'listening' | 'reading' | 'writing' | 'speaking';

export type ObjectiveSection = { kind: 'listening' | 'reading'; minutes: number; blocks: Block[] };

export type Chart = {
  type: 'bar' | 'line' | 'pie';
  title: string;
  unit: string;
  categories: string[];
  series: { name: string; values: number[] }[];
};
export type WritingTask = { id: string; title: string; prompt: string; minWords: number; maxWords?: number; chart?: Chart; weight: number };
export type WritingSection = { kind: 'writing'; minutes: number; tasks: WritingTask[] };

export type SpeakingPart = {
  title: string;
  instr: string;
  /** extra material shown on screen: picture descriptions, a cue card, an arguments table */
  card?: string;
  questions: string[];
  prepSec: number;
  speakSec: number;
};
export type SpeakingSection = { kind: 'speaking'; parts: SpeakingPart[] };

export type AnySection = ObjectiveSection | WritingSection | SpeakingSection;
