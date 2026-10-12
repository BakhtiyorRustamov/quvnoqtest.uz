// Maps a question "type" (stored with each quiz item in Supabase) to its component.
// To add a new component: import it, then add one line to WIDGETS.
import NumberLineAddition from "./NumberLineAddition";
import PlaceValueBlocks from "./PlaceValueBlocks";
import MultiplicationArray from "./MultiplicationArray";
import FractionBar from "./FractionBar";
import ClockReader from "./ClockReader";
import BalanceScale from "./BalanceScale";
import RaceToAnswer from "./RaceToAnswer";

export const WIDGETS = {
  number_line_addition: NumberLineAddition,
  place_value_blocks: PlaceValueBlocks,
  multiplication_array: MultiplicationArray,
  fraction_bar: FractionBar,
  clock_reader: ClockReader,
  balance_scale: BalanceScale,
  race_to_answer: RaceToAnswer,
};

// Human-readable labels (handy for menus / the demo gallery).
export const WIDGET_LABELS = {
  number_line_addition: "Sonlar chizig'i — qo'shish (1–2-sinf)",
  place_value_blocks: "Razryadlar — son yasash (1–3-sinf)",
  multiplication_array: "Ko'paytirish jadvali (2–4-sinf)",
  fraction_bar: "Kasrlar (3–6-sinf)",
  clock_reader: "Soatni o'qish (2–4-sinf)",
  balance_scale: "Taqqoslash — tarozi (1–5-sinf)",
  race_to_answer: "Hisob poygasi (1–3-sinf)",
};
