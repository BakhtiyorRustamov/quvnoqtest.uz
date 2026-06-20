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
import Mcq from './Mcq';

// Large interactive game — loaded client-only (uses AudioContext / window).
const GrandPrixAddition = dynamic(() => import('./GrandPrixAddition'), { ssr: false });

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
  mcq: { uz: 'Test savoli (zaxira)', ru: 'Тестовый вопрос (резерв)', en: 'Multiple choice (fallback)' }
};
