import type { Lesson } from '@/content/types';
import type { L10n } from '@/lib/i18n-config';
import topic01Json from '@/content/g1-math/topic01.json';
import topic02Json from '@/content/g1-math/topic02.json';
import topic03Json from '@/content/g1-math/topic03.json';
import topic04Json from '@/content/g1-math/topic04.json';
import topic05Json from '@/content/g1-math/topic05.json';
import topic06Json from '@/content/g1-math/topic06.json';
import topic07Json from '@/content/g1-math/topic07.json';
import topic08Json from '@/content/g1-math/topic08.json';
import topic09Json from '@/content/g1-math/topic09.json';
import topic10Json from '@/content/g1-math/topic10.json';
import topic11Json from '@/content/g1-math/topic11.json';
import topic12Json from '@/content/g1-math/topic12.json';
import topic13Json from '@/content/g1-math/topic13.json';
import topic14Json from '@/content/g1-math/topic14.json';
import topic15Json from '@/content/g1-math/topic15.json';
import topic16Json from '@/content/g1-math/topic16.json';
import topic17Json from '@/content/g1-math/topic17.json';
import topic18Json from '@/content/g1-math/topic18.json';
import topic19Json from '@/content/g1-math/topic19.json';
import topic20Json from '@/content/g1-math/topic20.json';
import topic21Json from '@/content/g1-math/topic21.json';
import topic22Json from '@/content/g1-math/topic22.json';
import topic23Json from '@/content/g1-math/topic23.json';
import topic24Json from '@/content/g1-math/topic24.json';
import topic25Json from '@/content/g1-math/topic25.json';
import topic26Json from '@/content/g1-math/topic26.json';
import topic27Json from '@/content/g1-math/topic27.json';
import topic28Json from '@/content/g1-math/topic28.json';
import topic29Json from '@/content/g1-math/topic29.json';
import topic30Json from '@/content/g1-math/topic30.json';
import topic31Json from '@/content/g1-math/topic31.json';
import topic32Json from '@/content/g1-math/topic32.json';
import topic33Json from '@/content/g1-math/topic33.json';
import topic34Json from '@/content/g1-math/topic34.json';
import topic35Json from '@/content/g1-math/topic35.json';
import topic36Json from '@/content/g1-math/topic36.json';
import topic37Json from '@/content/g1-math/topic37.json';
import topic38Json from '@/content/g1-math/topic38.json';
import topic39Json from '@/content/g1-math/topic39.json';
import topic40Json from '@/content/g1-math/topic40.json';
import topic41Json from '@/content/g1-math/topic41.json';
import review01Json from '@/content/g1-math/review01.json';
import { G1_MATH_TOPICS, getTopic } from '@/content/g1-math/topics';

export const TOPIC01: Lesson = topic01Json as unknown as Lesson;
export const TOPIC02: Lesson = topic02Json as unknown as Lesson;

export const LESSONS: Record<string, Lesson> = {
  'g1-math-01': TOPIC01,
  'g1-math-02': TOPIC02,
  'g1-math-03': topic03Json as unknown as Lesson,
  'g1-math-04': topic04Json as unknown as Lesson,
  'g1-math-05': topic05Json as unknown as Lesson,
  'g1-math-06': topic06Json as unknown as Lesson,
  'g1-math-07': topic07Json as unknown as Lesson,
  'g1-math-08': topic08Json as unknown as Lesson,
  'g1-math-09': topic09Json as unknown as Lesson,
  'g1-math-10': topic10Json as unknown as Lesson,
  'g1-math-11': topic11Json as unknown as Lesson,
  'g1-math-12': topic12Json as unknown as Lesson,
  'g1-math-13': topic13Json as unknown as Lesson,
  'g1-math-14': topic14Json as unknown as Lesson,
  'g1-math-15': topic15Json as unknown as Lesson,
  'g1-math-16': topic16Json as unknown as Lesson,
  'g1-math-17': topic17Json as unknown as Lesson,
  'g1-math-18': topic18Json as unknown as Lesson,
  'g1-math-19': topic19Json as unknown as Lesson,
  'g1-math-20': topic20Json as unknown as Lesson,
  'g1-math-21': topic21Json as unknown as Lesson,
  'g1-math-22': topic22Json as unknown as Lesson,
  'g1-math-23': topic23Json as unknown as Lesson,
  'g1-math-24': topic24Json as unknown as Lesson,
  'g1-math-25': topic25Json as unknown as Lesson,
  'g1-math-26': topic26Json as unknown as Lesson,
  'g1-math-27': topic27Json as unknown as Lesson,
  'g1-math-28': topic28Json as unknown as Lesson,
  'g1-math-29': topic29Json as unknown as Lesson,
  'g1-math-30': topic30Json as unknown as Lesson,
  'g1-math-31': topic31Json as unknown as Lesson,
  'g1-math-32': topic32Json as unknown as Lesson,
  'g1-math-33': topic33Json as unknown as Lesson,
  'g1-math-34': topic34Json as unknown as Lesson,
  'g1-math-35': topic35Json as unknown as Lesson,
  'g1-math-36': topic36Json as unknown as Lesson,
  'g1-math-37': topic37Json as unknown as Lesson,
  'g1-math-38': topic38Json as unknown as Lesson,
  'g1-math-39': topic39Json as unknown as Lesson,
  'g1-math-40': topic40Json as unknown as Lesson,
  'g1-math-41': topic41Json as unknown as Lesson,
  'g1-math-review-1': review01Json as unknown as Lesson
};

/**
 * Review "game" lessons (e.g. Grand Prix). They live in the Mavzular grid at a
 * fixed position and are intentionally NOT part of G1_MATH_TOPICS, so finishing
 * one never moves it into "Hozircha oʻrganganlarim" — it stays in Mavzular.
 */
export type ReviewLesson = { key: string; after: number; title: L10n; built: boolean };
export const G1_MATH_REVIEWS: ReviewLesson[] = [
  {
    key: 'g1-math-review-1',
    after: 10,
    title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' },
    built: true
  },
  { key: 'g1-math-review-2', after: 20, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: false },
  { key: 'g1-math-review-3', after: 30, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: false },
  { key: 'g1-math-review-4', after: 40, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: false }
];

/** Topic keys that have a fully built, playable lesson (vs. "coming soon"). */
export const BUILT_TOPIC_KEYS = new Set(Object.keys(LESSONS));

export { G1_MATH_TOPICS, getTopic };

export function getLesson(topicKey: string): Lesson | undefined {
  return LESSONS[topicKey];
}

export function isBuiltTopic(topicKey: string): boolean {
  return BUILT_TOPIC_KEYS.has(topicKey);
}
