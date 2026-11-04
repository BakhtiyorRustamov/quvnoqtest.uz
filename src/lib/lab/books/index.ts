import 'server-only';
import type { BookPassage } from '../textbook';
import { MATH11_1 } from './math11-1';

/** Book id → passages (server only; the text never ships to the browser bundle). */
export const BOOK_TEXT: Record<string, BookPassage[]> = {
  'math11-1': MATH11_1
};
