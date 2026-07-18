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

/** Ingliz tili voice cast — role → Gemini voice is resolved in seed-tts.mjs
 *  (girl=Leda · boy=Puck · teacher=Kore · man=Charon). */
export type AudioVoice = 'girl' | 'boy' | 'teacher' | 'man';

/**
 * A pre-seeded English audio clip played INSIDE a question (Ingliz tili).
 * `key` names the cached file (public/audio/tts/en/<key>.wav); `text` is what
 * the seed script synthesizes (never shown to the child unless the item also
 * prints it); `voice` picks the cast member; `style` optionally steers the
 * delivery ("Say it slowly, like a teacher"). The app NEVER calls a TTS API at
 * runtime — `npm run seed:tts -- --only ingliz` generates the files once.
 */
export type ItemAudio = {
  key: string;
  text: string;
  voice?: AudioVoice;
  style?: string;
  /** autoplay once when the question appears (default: tap to play) */
  autoplay?: boolean;
};

export type LessonItem = {
  id: string;
  type: ItemType;
  prompt: L10n;
  hint: L10n;
  explanation: L10n;
  visualHint: VisualHint;
  /** optional decorative GIF shown under the prompt */
  media?: ItemMedia;
  /** Ingliz tili: English clip played from a big speaker button under the
   *  prompt — "listen and tap", word pronunciations, mini dialogs. */
  audio?: ItemAudio;
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
  /** Oʻqish: an explicit passage to reopen from this item's "read again" button.
   *  Optional — by default the lesson's reading passage (first poem/story/karaoke
   *  item) is used automatically, so authors usually don't set this. */
  reference?: WidgetSpec;
  /** Oʻqish: an open-ended discussion question shown UNDER the graded item, with
   *  no input — the child just thinks/answers aloud. Ungraded, purely displayed. */
  openEnd?: L10n;
};

export type Lesson = {
  topicId: string;
  subjectKey: string;
  emojis: string;
  title: L10n;
  recall: L10n;
  /** Ingliz tili: the intro screen shows this animated GIF INSTEAD of the
   *  explanatory paragraph (GIF + title replace the topic text). */
  recallMedia?: ItemMedia;
  /** Locale of the intro read-aloud clip. 'en' → an English clip
   *  (<topicId>.en.wav) plays for ALL UI languages (used by Ingliz tili). */
  recallAudioLang?: 'uz' | 'en';
  /** hide the recall read-aloud (speaker) button entirely — subjects with no
   *  seeded audio at all (e.g. Tasviriy sanʼat). */
  hideAudio?: boolean;
  items: LessonItem[];
  /** skip the read-aloud intro screen and launch straight into the first item
   *  (used by review "game" lessons). */
  skipRecall?: boolean;
  /** optional ungraded practice widget shown on the completion screen */
  practice?: WidgetSpec & { title?: L10n };
};

export type TopicMeta = { n: number; key: string; title: L10n };
