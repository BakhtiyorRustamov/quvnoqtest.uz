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
import SentenceCloze from './SentenceCloze';
import OddOneOut from './OddOneOut';
import PoemReading from './PoemReading';
import StoryReading from './StoryReading';
import KaraokeReading from './KaraokeReading';
import TrueFalseNotGiven from './TrueFalseNotGiven';
import WhatHappenedNext from './WhatHappenedNext';
import OpenResponse from './OpenResponse';
import LetterSequence from './LetterSequence';
import SizeOrder from './SizeOrder';
import StorySequence from './StorySequence';
import WordForge from './WordForge';
import BookCare from './BookCare';
import FillBlanks from './FillBlanks';
import FirstLetters from './FirstLetters';
import Cinquain from './Cinquain';
import WhoSaid from './WhoSaid';
import RiddleSolve from './RiddleSolve';
import TongueTwister from './TongueTwister';
import HiddenWords from './HiddenWords';
// Text multiple-choice now uses the shadcn/ui-styled card+buttons restyle.
// (The original plain Mcq.jsx is kept for the /shadcn-demo comparison page.)
import Mcq from './McqCard';
// Tasviriy sanʼat (Visual arts) — vector drawing/colouring widgets (no emoji).
import ColorFill from './ColorFill';
import FreeDraw from './FreeDraw';
import ColorPick from './ColorPick';
import ImageColor from './ImageColor';
import PhotoUpload from './PhotoUpload';
import CraftSteps from './CraftSteps';
// Natural science (Tabiiy fanlar) — emoji/SVG picture widgets.
import PickPicture from './PickPicture';
import PickMany from './PickMany';
import SortBins from './SortBins';
import MatchColumns from './MatchColumns';
import LabelDiagram from './LabelDiagram';
import ShadowGuess from './ShadowGuess';
import OrderLine from './OrderLine';
import TrueFalse from './TrueFalse';
import FindPair from './FindPair';
import MemoryMatch from './MemoryMatch';
import HotspotScene from './HotspotScene';
import TrafficLight from './TrafficLight';
import EmergencyDial from './EmergencyDial';
// Alifbe (literacy primer) — sound, syllable & letter widgets.
import SoundPosition from './SoundPosition';
import SyllableClap from './SyllableClap';
import LetterHunt from './LetterHunt';
import SoundScheme from './SoundScheme';
import BuildWord from './BuildWord';
import ReadWord from './ReadWord';
import ReadText from './ReadText';
import MissingLetter from './MissingLetter';
import CapitalPick from './CapitalPick';
import SynonymMatch from './SynonymMatch';
import TutuqPlace from './TutuqPlace';
import VowelSort from './VowelSort';
import SenseMatch from './SenseMatch';
import StatementCheck from './StatementCheck';
import SpotDifference from './SpotDifference';
import ComparePick from './ComparePick';
// Ingliz tili (English) — listening dialogs & CLIL art widgets.
import DialogListen from './DialogListen';
import ColorMix from './ColorMix';

// Large interactive games — loaded client-only (AudioContext / fullscreen / window).
const GrandPrixAddition = dynamic(() => import('./GrandPrixAddition'), { ssr: false });
const TugOfWarMath = dynamic(() => import('./TugOfWarMath'), { ssr: false });
const TankTargets = dynamic(() => import('./TankTargets'), { ssr: false });
const ScaleCompare = dynamic(() => import('./ScaleCompare'), { ssr: false });
const AnagramGame = dynamic(() => import('./AnagramGame'), { ssr: false });
const ElephantGame = dynamic(() => import('./ElephantGame'), { ssr: false });

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
  anagram_game: AnagramGame,
  elephant_game: ElephantGame,
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
  sentence_cloze: SentenceCloze,
  odd_one_out: OddOneOut,
  poem_reading: PoemReading,
  story_reading: StoryReading,
  karaoke_reading: KaraokeReading,
  true_false_ng: TrueFalseNotGiven,
  what_next: WhatHappenedNext,
  open_response: OpenResponse,
  letter_sequence: LetterSequence,
  size_order: SizeOrder,
  story_sequence: StorySequence,
  word_forge: WordForge,
  book_care: BookCare,
  fill_blanks: FillBlanks,
  first_letters: FirstLetters,
  cinquain: Cinquain,
  who_said: WhoSaid,
  riddle_solve: RiddleSolve,
  tongue_twister: TongueTwister,
  hidden_words: HiddenWords,
  mcq: Mcq,
  color_fill: ColorFill,
  free_draw: FreeDraw,
  color_pick: ColorPick,
  color_sheet: ImageColor,
  photo_upload: PhotoUpload,
  craft_steps: CraftSteps,
  pick_picture: PickPicture,
  pick_many: PickMany,
  sort_bins: SortBins,
  match_columns: MatchColumns,
  label_diagram: LabelDiagram,
  shadow_guess: ShadowGuess,
  order_line: OrderLine,
  true_false: TrueFalse,
  find_pair: FindPair,
  memory_match: MemoryMatch,
  hotspot_scene: HotspotScene,
  traffic_light: TrafficLight,
  emergency_dial: EmergencyDial,
  sound_position: SoundPosition,
  syllable_clap: SyllableClap,
  letter_hunt: LetterHunt,
  sound_scheme: SoundScheme,
  build_word: BuildWord,
  read_word: ReadWord,
  read_text: ReadText,
  missing_letter: MissingLetter,
  capital_pick: CapitalPick,
  synonym_match: SynonymMatch,
  tutuq_place: TutuqPlace,
  vowel_sort: VowelSort,
  sense_match: SenseMatch,
  statement_check: StatementCheck,
  spot_difference: SpotDifference,
  dialog_listen: DialogListen,
  color_mix: ColorMix,
  compare_pick: ComparePick
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
  anagram_game: { uz: 'Anagramma oʻyini', ru: 'Игра «Анаграмма»', en: 'Anagram game' },
  elephant_game: { uz: 'Fillar oʻyini', ru: 'Игра со слонами', en: 'Elephant game' },
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
  sentence_cloze: { uz: 'Gapga mos soʻzni qoʻy', ru: 'Вставь слово в предложение', en: 'Complete the sentence' },
  odd_one_out: { uz: 'Ortiqcha soʻzni top', ru: 'Найди лишнее слово', en: "Tap the odd one out" },
  poem_reading: { uz: 'Sheʼr oʻqish', ru: 'Чтение стиха', en: 'Read a poem' },
  story_reading: { uz: 'Matn (nasr) oʻqish', ru: 'Чтение текста (проза)', en: 'Read a prose text' },
  karaoke_reading: { uz: 'Tinglab oʻqish (karaoke)', ru: 'Чтение с озвучкой (караоке)', en: 'Read-along (karaoke)' },
  true_false_ng: { uz: 'Toʻgʻri / Notoʻgʻri / Matnda yoʻq', ru: 'Верно / Неверно / Не сказано', en: 'True / False / Not given' },
  what_next: { uz: 'Keyin nima boʻldi?', ru: 'Что случилось потом?', en: 'What happened next?' },
  open_response: { uz: 'Ochiq savol (baholanmaydi)', ru: 'Открытый вопрос (без оценки)', en: 'Open-ended (ungraded)' },
  letter_sequence: { uz: 'Harflarni ketma-ket oʻqish', ru: 'Чтение букв по порядку', en: 'Read letters in sequence' },
  size_order: { uz: 'Soʻzlarni kattaligi boʻyicha tartiblash', ru: 'Слова по размеру — собери мудрое слово', en: 'Order words by size' },
  story_sequence: { uz: 'Voqealar ketma-ketligi', ru: 'Порядок событий', en: 'Order the events' },
  word_forge: { uz: 'Harflardan soʻz yasash', ru: 'Составь слова из букв', en: 'Build words from letters' },
  book_care: { uz: 'Kitobga gʻamxoʻrlik', ru: 'Забота о книге', en: 'Book care' },
  fill_blanks: { uz: 'Boʻsh joylarni toʻldirish', ru: 'Заполни пропуски', en: 'Fill in the blanks' },
  first_letters: { uz: 'Birinchi harflardan soʻz', ru: 'Слово из первых букв', en: 'Word from first letters' },
  cinquain: { uz: 'Sinkveyn tuzish', ru: 'Синквейн', en: 'Build a cinquain' },
  who_said: { uz: 'Kim aytdi?', ru: 'Кто это сказал?', en: 'Who said it?' },
  riddle_solve: { uz: 'Topishmoqni yechish', ru: 'Отгадай загадку', en: 'Solve the riddle' },
  tongue_twister: { uz: 'Tez aytish — tovushni top', ru: 'Скороговорка — найди звук', en: 'Tongue-twister — find the sound' },
  hidden_words: { uz: 'Yashiringan soʻzlarni ajrat', ru: 'Раздели спрятанные слова', en: 'Split the hidden words' },
  mcq: { uz: 'Test savoli (zaxira)', ru: 'Тестовый вопрос (резерв)', en: 'Multiple choice (fallback)' },
  color_fill: { uz: 'Rasmni boʻyash', ru: 'Раскрашивание', en: 'Colour the picture' },
  free_draw: { uz: 'Rasm chizish', ru: 'Свободный рисунок', en: 'Free drawing' },
  color_pick: { uz: 'Rang tanlash', ru: 'Выбор цвета', en: 'Pick colours' },
  color_sheet: { uz: 'Rasmni boʻyash (surat)', ru: 'Раскрашивание (картинка)', en: 'Colour the picture (image)' },
  photo_upload: { uz: 'Rasmni suratga olish', ru: 'Фото своей работы', en: 'Upload / photograph your work' },
  craft_steps: { uz: 'Buyum yasash (bosqichlar)', ru: 'Поделка (этапы)', en: 'Make a craft (steps)' },
  pick_picture: { uz: 'Toʻgʻri rasmni bos', ru: 'Нажми верную картинку', en: 'Tap the correct picture' },
  pick_many: { uz: 'Mos rasmlarni belgila', ru: 'Отметь подходящие картинки', en: 'Tap all that fit' },
  sort_bins: { uz: 'Rasmlarni guruhlarga ajrat', ru: 'Разложи картинки по группам', en: 'Sort pictures into groups' },
  match_columns: { uz: 'Juftlarni ulash (rasm)', ru: 'Соедини пары (картинки)', en: 'Match the pairs (pictures)' },
  label_diagram: { uz: 'Oʻsimlik qismlarini nomla', ru: 'Назови части растения', en: 'Label the plant parts' },
  shadow_guess: { uz: 'Soyaga qarab top', ru: 'Угадай по тени', en: 'Guess by the shadow' },
  order_line: { uz: 'Tartib bilan joyla', ru: 'Расставь по порядку', en: 'Put in order' },
  true_false: { uz: 'Toʻgʻri yoki notoʻgʻri', ru: 'Верно или неверно', en: 'True or false' },
  find_pair: { uz: 'Bir xil juftini top', ru: 'Найди одинаковую пару', en: 'Find the identical pair' },
  memory_match: { uz: 'Xotira oʻyini: juftini top', ru: 'Игра на память: найди пару', en: 'Memory match' },
  hotspot_scene: { uz: 'Rasmda xavfni top', ru: 'Найди опасность на картинке', en: 'Find it in the scene' },
  traffic_light: { uz: 'Svetofor — toʻxta yoki yur', ru: 'Светофор — стой или иди', en: 'Traffic light — stop or go' },
  emergency_dial: { uz: 'Favqulodda raqamni ter', ru: 'Набери номер службы', en: 'Dial the emergency number' },
  sound_position: { uz: 'Tovush qaysi katakda?', ru: 'В какой клетке звук?', en: 'Which box has the sound?' },
  syllable_clap: { uz: 'Boʻgʻinlab qarsak chal', ru: 'Хлопай по слогам', en: 'Clap the syllables' },
  letter_hunt: { uz: 'Harfni topib bos', ru: 'Найди букву', en: 'Hunt the letter' },
  sound_scheme: { uz: 'Tovush chizmasini rangla', ru: 'Раскрась схему звуков', en: 'Colour the sound scheme' },
  build_word: { uz: 'Harflardan soʻz tuz', ru: 'Составь слово из букв', en: 'Build the word from letters' },
  read_word: { uz: 'Soʻzni oʻqib top', ru: 'Прочитай и найди слово', en: 'Read and pick the word' },
  read_text: { uz: 'Matnni oʻqib javob ber', ru: 'Прочитай текст и ответь', en: 'Read the text and answer' },
  missing_letter: { uz: 'Yetishmagan harfni qoʻy', ru: 'Вставь недостающую букву', en: 'Fill the missing letter' },
  capital_pick: { uz: 'Bosh harfli soʻzlarni top', ru: 'Найди слова с заглавной', en: 'Pick words needing a capital' },
  synonym_match: { uz: 'Maʼnodosh soʻzlarni ula', ru: 'Соедини синонимы', en: 'Match the synonyms' },
  tutuq_place: { uz: 'Tutuq belgisini joyiga qoʻy', ru: 'Поставь знак ʼ на место', en: 'Place the ʼ sign' },
  vowel_sort: { uz: 'Unli va undoshga ajrat', ru: 'Раздели на гласные и согласные', en: 'Sort vowels and consonants' },
  sense_match: { uz: 'Qaysi sezgi aʼzosi?', ru: 'Какой орган чувств?', en: 'Which sense organ?' },
  statement_check: { uz: 'Rost yoki yolgʻon (roʻyxat)', ru: 'Верно или неверно (список)', en: 'True or false (checklist)' },
  spot_difference: { uz: 'Rasmlardagi farqni top', ru: 'Найди различия картинок', en: 'Spot the differences' },
  dialog_listen: { uz: 'Suhbatni tinglash (inglizcha)', ru: 'Прослушай диалог (английский)', en: 'Listen to the dialog' },
  color_mix: { uz: 'Ranglarni aralashtirish', ru: 'Смешивание красок', en: 'Mix the colors' },
  compare_pick: { uz: 'Taqqosla va tanla', ru: 'Сравни и выбери', en: 'Compare and pick' }
};
