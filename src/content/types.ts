import type { L10n } from '@/lib/i18n-config';

export type ArtColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'magenta'
  | 'purple'
  | 'gray';

export type ArtKind =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'rect'
  | 'rhombus'
  | 'star'
  | 'ball'
  | 'apple'
  | 'clock'
  | 'window'
  | 'kite'
  | 'roof'
  | 'fish'
  | 'sun'
  // 3D / solid shapes (rendered with shading + a drop shadow so they read as solid)
  | 'sphere'
  | 'cube'
  | 'cone'
  | 'cylinder';

export type Art = { kind: ArtKind; color?: ArtColor; scale?: number };

export type VisualHint =
  | 'tap_finger'
  | 'arrow_to_dropzone'
  | 'pulse_target'
  | 'example_pair'
  | 'none';

export type ItemType =
  | 'click_correct'
  | 'multi_select'
  | 'drag_sort'
  | 'match_line'
  | 'sequence'
  | 'drag_order'
  | 'build'
  | 'widget';

/**
 * A reusable learning widget from src/components/learning (registry key +
 * props). Widgets are chosen by the CONCEPT they visualize, never by grade.
 */
export type WidgetSpec = {
  type: string;
  props?: Record<string, unknown>;
  /** 'finish' = a self-contained game; the lesson does not auto-advance on a
   *  single correct answer — the widget manages its own end (default 'correct'). */
  completeOn?: 'correct' | 'finish';
};

export type Option = { id: string; art: Art };
export type DragItem = Option & { bin?: string };
export type Bin = { id: string; label: L10n; color?: ArtColor };
export type Slot = { id: string; accept: string; ghost: Art; label?: L10n };
export type MatchSide = { id: string; art: Art; match?: string };

/** Optional decorative animated GIF shown under the prompt to add delight
 *  (e.g. a "tens & ones" or celebratory clip). Purely cosmetic — never graded. */
export type ItemMedia = { gif: string; alt?: L10n; maxWidth?: number };

export type LessonItem = {
  id: string;
  type: ItemType;
  prompt: L10n;
  hint: L10n;
  explanation: L10n;
  visualHint: VisualHint;
  /** optional decorative GIF shown under the prompt */
  media?: ItemMedia;
  /** click_correct / multi_select / sequence answer options */
  options?: Option[];
  /** ids of correct option(s) */
  answer?: string[];
  /** drag_sort */
  items?: DragItem[];
  bins?: Bin[];
  /** match_line */
  left?: MatchSide[];
  right?: MatchSide[];
  /** sequence — the visible pattern row (last element is the "?") */
  sequence?: Art[];
  /** drag_order / build */
  slots?: Slot[];
  /** widget — interactive learning component (registry key + props) */
  widget?: WidgetSpec;
};

export type Lesson = {
  topicId: string;
  subjectKey: string;
  emojis: string;
  title: L10n;
  recall: L10n;
  items: LessonItem[];
  /** skip the read-aloud intro screen and launch straight into the first item
   *  (used by review "game" lessons). */
  skipRecall?: boolean;
  /** optional ungraded practice widget shown on the completion screen */
  practice?: WidgetSpec & { title?: L10n };
};

export type TopicMeta = { n: number; key: string; title: L10n };
