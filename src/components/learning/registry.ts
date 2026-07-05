// Maps a question "type" (stored with each quiz item) to its component.
// To add a new component: import it, then add one line to WIDGETS.
//
// HOW TO CHOOSE: pick the widget whose visualization fits the CONCEPT the
// question teaches — never by grade (docs/generate-questions-prompt.md).
import type { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import type { L10n } from '@/lib/i18n-config';
import NumberLineAddition from './NumberLineAddition';
import PlaceValueBlocks from './PlaceValueBlocks';
import MultiplicationArray from './MultiplicationArray';
import FractionBar from './FractionBar';
import ClockReader from './ClockReader';
import BalanceScale from './BalanceScale';
import RaceToAnswer from './RaceToAnswer';
import PositionGrid from './PositionGrid';
import StraightCurved from './StraightCurved';
import MatchPairs from './MatchPairs';
import DragBuckets from './DragBuckets';
import RulerMeasure from './RulerMeasure';
import PolygonPerimeter from './PolygonPerimeter';
import AngleFind from './AngleFind';
import SymmetryGrid from './SymmetryGrid';
import EquationSolve from './EquationSolve';
import NumberOrder from './NumberOrder';
import WordScramble from './WordScramble';
import LetterComplete from './LetterComplete';
import SentenceOrder from './SentenceOrder';
import TapMatch from './TapMatch';
import SyllableBuild from './SyllableBuild';
import Mcq from './Mcq';

// Large interactive games — loaded client-only (AudioContext / fullscreen / window).
const GrandPrixAddition = dynamic(() => import('./GrandPrixAddition'), { ssr: false });
const TugOfWarMath = dynamic(() => import('./TugOfWarMath'), { ssr: false });
const TankTargets = dynamic(() => import('./TankTargets'), { ssr: false });
const ScaleCompare = dynamic(() => import('./ScaleCompare'), { ssr: false });

/**
 * Shared contract (every widget):
 *   props      problem data (omit → self-generated) + { lang: 'uz'|'ru'|'en', embedded?: boolean }
 *   callbacks  onAttempt(correct, payload) · onCorrect() · onNext()
 *   embedded   hides internal chrome (grade pill / next buttons) when the
 *              lesson shell provides prompt, hints and flow.
 */
export const WIDGETS: Record<string, ComponentType<any>> = {
  number_line_addition: NumberLineAddition,
  place_value_blocks: PlaceValueBlocks,
  multiplication_array: MultiplicationArray,
  fraction_bar: FractionBar,
  clock_reader: ClockReader,
  balance_scale: BalanceScale,
  race_to_answer: RaceToAnswer,
  position_grid: PositionGrid,
  straight_curved: StraightCurved,
  grand_prix_addition: GrandPrixAddition,
  tug_of_war_math: TugOfWarMath,
  tank_targets: TankTargets,
  scale_compare: ScaleCompare,
  match_pairs: MatchPairs,
  drag_buckets: DragBuckets,
  ruler_measure: RulerMeasure,
  polygon_perimeter: PolygonPerimeter,
  angle_find: AngleFind,
  symmetry_grid: SymmetryGrid,
  equation_solve: EquationSolve,
  number_order: NumberOrder,
  word_scramble: WordScramble,
  letter_complete: LetterComplete,
  sentence_order: SentenceOrder,
  tap_match: TapMatch,
  syllable_build: SyllableBuild,
  mcq: Mcq
};

/** Trilingual labels for menus / the /demo gallery. */
export const WIDGET_LABELS: Record<string, L10n> = {
  number_line_addition: {
    uz: "Sonlar chizig'i — qo'shish",
    ru: 'Числовая прямая — сложение',
    en: 'Number line — addition'
  },
  place_value_blocks: {
    uz: "Razryadlar — son yasash",
    ru: 'Разряды — собери число',
    en: 'Place value — build a number'
  },
  multiplication_array: {
    uz: "Ko'paytirish jadvali",
    ru: 'Умножение — массив точек',
    en: 'Multiplication array'
  },
  fraction_bar: { uz: 'Kasrlar', ru: 'Дроби', en: 'Fractions' },
  clock_reader: { uz: "Soatni o'qish", ru: 'Чтение часов', en: 'Reading the clock' },
  balance_scale: { uz: 'Taqqoslash — tarozi', ru: 'Сравнение — весы', en: 'Comparison — balance scale' },
  race_to_answer: { uz: 'Hisob poygasi', ru: 'Гонка вычислений', en: 'Race to the answer' },
  position_grid: { uz: 'Joylashish — toʻr', ru: 'Расположение — сетка', en: 'Position — grid' },
  straight_curved: { uz: 'Toʻgʻri va egri chiziqlar', ru: 'Прямые и кривые линии', en: 'Straight & curved lines' },
  grand_prix_addition: { uz: 'Qoʻshish poygasi', ru: 'Гонка сложения', en: 'Addition Grand Prix' },
  tug_of_war_math: { uz: 'Kemalar bellashuvi', ru: 'Перетягивание буксиров', en: 'Tugboat tug-of-war' },
  tank_targets: { uz: 'Tank nishoni', ru: 'Танковая цель', en: 'Tank targets' },
  scale_compare: { uz: 'Tarozi oʻyini', ru: 'Игра с весами', en: 'Scale game' },
  match_pairs: { uz: 'Juftlarni ulash', ru: 'Соедини пары', en: 'Match the pairs' },
  drag_buckets: { uz: 'Qutilarga sudrab tashlash', ru: 'Перетащи в ящики', en: 'Drag into buckets' },
  ruler_measure: { uz: 'Chizgʻichda oʻlchash', ru: 'Измерение линейкой', en: 'Measure with a ruler' },
  polygon_perimeter: { uz: 'Perimetr — tomonlarni bosish', ru: 'Периметр — нажми стороны', en: 'Perimeter — tap the sides' },
  angle_find: { uz: 'Burchaklarni topish', ru: 'Найди углы', en: 'Find the angles' },
  symmetry_grid: { uz: 'Simmetriyani toʻldirish', ru: 'Дополни симметрию', en: 'Complete the symmetry' },
  equation_solve: { uz: 'Tenglamani yechish', ru: 'Реши уравнение', en: 'Solve the equation' },
  number_order: { uz: 'Sonlarni tartiblash', ru: 'Расставь числа по порядку', en: 'Order the numbers' },
  word_scramble: { uz: 'Soʻzni yigʻ (harflar)', ru: 'Собери слово из букв', en: 'Build the word from letters' },
  letter_complete: { uz: 'Harfni toʻldir', ru: 'Вставь букву', en: 'Complete the letter' },
  sentence_order: { uz: 'Gap tuz (soʻzlarni tartibla)', ru: 'Составь предложение из слов', en: 'Order words into a sentence' },
  tap_match: { uz: 'Mos keladiganini bos', ru: 'Нажми подходящие', en: 'Tap all that fit' },
  syllable_build: { uz: 'Boʻgʻinlardan soʻz tuz', ru: 'Собери слово из слогов', en: 'Build a word from syllables' },
  mcq: { uz: 'Test savoli (zaxira)', ru: 'Тестовый вопрос (резерв)', en: 'Multiple choice (fallback)' }
};
