import type { CastMember } from './types';

/**
 * The people of the grade-11 English course. Malika and Timur are students
 * from Tashkent; Mr Collins is their English teacher (he also narrates).
 * Lessons add their own guests.
 */
export const ENG_CAST: Record<string, CastMember> = {
  narrator: { name: 'Mr Collins', emoji: '', color: '#2B6CB0', azure: 'en-GB-RyanNeural', accent: 'en-GB', gender: 'm' },
  malika: { name: 'Malika', emoji: '', color: '#D53F8C', azure: 'en-US-AvaNeural', accent: 'en-US', gender: 'f' },
  timur: { name: 'Timur', emoji: '', color: '#2F855A', azure: 'en-US-AndrewNeural', accent: 'en-US', gender: 'm' }
};

/** Subject-page groups: the five parts of the Student's Book (each ends with a review). */
export const ENG_G1 = { kicker: 'Units 1–4', title: 'Shopping · Friends · Sport · Weather' };
export const ENG_G2 = { kicker: 'Units 5–8', title: 'Making things · Health · Music · Buildings' };
export const ENG_G3 = { kicker: 'Units 9–12', title: 'Technology · Animals · School · Travel' };
export const ENG_G4 = { kicker: 'Units 13–16', title: 'Social media · Food · City life · Film' };
export const ENG_G5 = { kicker: 'Units 17–20', title: 'Messages · Celebrities · Work · Plans' };
