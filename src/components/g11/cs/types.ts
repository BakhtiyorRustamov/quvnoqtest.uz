/**
 * Animated computer-science visuals for Informatika lessons (instead of the
 * pen board). Each step of a lesson may carry one `CsAnim`; it plays when the
 * step opens and ends in a still picture that sums the idea up.
 */

/** an item moving through stations, changing its text at each one (data → information → knowledge, input → process → output…) */
export type FlowAnim = {
  type: 'flow';
  stations: { icon: string; label: string }[];
  items: { texts: string[] }[];
  /** caption under the last station when everything has arrived */
  result?: string;
};

/** a character or number turning into bits (ASCII / binary) */
export type BitsAnim = { type: 'bits'; text?: string; number?: number };

/** run-length encoding: rows of pixels squeezed into counts. Letters: W white, B black, R red, G green, Y yellow, U blue */
export type RleAnim = { type: 'rle'; rows: string[] };

/** Caesar cipher letter by letter, or how keys travel in symmetric / asymmetric encryption */
export type CipherAnim =
  | { type: 'cipher'; mode: 'caesar'; plain: string; shift: number }
  | { type: 'cipher'; mode: 'symmetric' | 'asymmetric'; message: string; secret: string };

/** a form whose fields are checked one by one */
export type FormAnim = {
  type: 'form';
  title: string;
  fields: { label: string; value: string; check: string; ok: boolean; note: string }[];
};

/** key-point cards appearing one by one */
export type CardsAnim = { type: 'cards'; items: { icon: string; title: string; text: string }[]; cols?: 1 | 2 | 3 };

/** two columns compared side by side */
export type CompareAnim = {
  type: 'compare';
  left: { icon: string; title: string; items: string[] };
  right: { icon: string; title: string; items: string[] };
};

/** sensor → computer → actuator feedback loop with a live chart */
export type LoopAnim = {
  type: 'loop';
  sensor: string;
  actuator: string;
  unit: string;
  setpoint: number;
  start: number;
  /** what the actuator does to the value per tick when on / off */
  up: number;
  down: number;
  /** monitoring only (no actuator) */
  monitorOnly?: boolean;
};

/** a network: nodes, links and packets travelling along paths */
export type NetAnim = {
  type: 'net';
  nodes: { id: string; x: number; y: number; icon: string; label: string }[];
  links: [string, string][];
  packets: { path: string[]; label: string; color?: string }[];
  /** send all packets at the same time (broadcast / hub) */
  together?: boolean;
};

/** a small spreadsheet; cells light up as formulas are evaluated */
export type SheetAnim = {
  type: 'sheet';
  cols: string[];
  rows: (string | number)[][];
  steps: { cell: string; formula: string; refs: string[]; result: string | number }[];
};

/** database tables; links between keys; a query keeps some rows */
export type DbAnim = {
  type: 'db';
  tables: { name: string; cols: string[]; rows: (string | number)[][]; key?: string }[];
  links?: { from: [string, string]; to: [string, string] }[];
  query?: { table: string; label: string; keep: number[] };
};

/** a decision tree; the path lights up question by question */
export type TreeAnim = {
  type: 'tree';
  nodes: { id: string; label: string; parent?: string; edge?: string }[];
  path: string[];
};

/** a Gantt chart building bar by bar; the critical path turns red */
export type GanttAnim = {
  type: 'gantt';
  unit: string;
  tasks: { id: string; label: string; start: number; dur: number; critical?: boolean }[];
};

/** code running line by line with the variables and the output */
export type CodeAnim = {
  type: 'code';
  lang: 'js' | 'html' | 'pseudo';
  lines: string[];
  trace: { line: number; vars?: Record<string, string | number>; out?: string; page?: string }[];
};

/** stages in a cycle; the highlight goes around */
export type CycleAnim = { type: 'cycle'; stages: { icon: string; label: string }[]; center?: string };

/** raster vs vector zoom, or keyframes and tweening */
export type PictureAnim = { type: 'picture'; mode: 'raster-vector' | 'tween' | 'layers' | 'morph' | 'mask' | 'flipbook'; fps?: number };

/** mail merge: a master letter with «fields» is filled from each (kept) row of the data source */
export type MergeAnim = { type: 'merge'; template: string; cols: string[]; rows: string[][]; keep?: number[]; filter?: string };

/** disk defragmentation: file pieces (letters, '.' = free) are swapped until each file is in one piece */
export type DefragAnim = { type: 'defrag'; blocks: string; files?: Record<string, string> };

/** a chart drawn bar by bar / point by point / slice by slice */
export type ChartAnim = { type: 'chart'; kind: 'bar' | 'line' | 'pie'; labels: string[]; values: number[]; unit?: string; title?: string };

/** table rows reordering themselves by one column */
export type SortAnim = { type: 'sort'; cols: string[]; rows: (string | number)[][]; by: number; desc?: boolean };

/** entity-relationship diagram: entity boxes and 1–1 / 1–M / M–M links */
export type ErdAnim = {
  type: 'erd';
  entities: { id: string; name: string; fields: string[]; key?: string; fk?: string[]; x: number; y: number }[];
  rels: { from: string; to: string; kind: '1-1' | '1-M' | 'M-M' }[];
};

/** finding a record: sequential (one by one), direct (hash ➜ address) or indexed (index ➜ block) */
export type AccessAnim = { type: 'access'; mode: 'sequential' | 'direct' | 'indexed'; keys: string[]; target: string };

/** a video / audio editing timeline: tracks with clips appearing one by one, then a playhead runs */
export type TimelineAnim = {
  type: 'timeline';
  total: number;
  /** axis unit (default 's') */
  unit?: string;
  /** caption after the playhead finishes (default: export message) */
  done?: string;
  tracks: { label: string; icon: string; clips: { start: number; dur: number; label: string; color?: string; fadeIn?: boolean; fadeOut?: boolean }[] }[];
};

export type CsAnim = MergeAnim | TimelineAnim | ErdAnim | AccessAnim | ChartAnim | SortAnim | DefragAnim | FlowAnim | BitsAnim | RleAnim | CipherAnim | FormAnim | CardsAnim | CompareAnim | LoopAnim | NetAnim | SheetAnim | DbAnim | TreeAnim | GanttAnim | CodeAnim | CycleAnim | PictureAnim;
