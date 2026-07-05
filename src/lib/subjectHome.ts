import type { L10n } from '@/lib/i18n-config';

/**
 * Home button target + label per subject, shown inside a lesson and on the
 * completion screen in place of the generic "Bosh sahifa" / dashboard button.
 * Returns the subject's own page (e.g. Matematika 1 / Ona tili 1).
 */
export const SUBJECT_HOME: Record<string, { href: string; label: L10n }> = {
  'g1-math': { href: '/dashboard/g1-math', label: { uz: 'Matematika 1', ru: 'Математика 1', en: 'Mathematics 1' } },
  'g1-ona': { href: '/dashboard/g1-ona', label: { uz: 'Ona tili 1', ru: 'Родной язык 1', en: 'Native language 1' } }
};

export function subjectHome(subjectKey: string): { href: string; label: L10n } | undefined {
  return SUBJECT_HOME[subjectKey];
}
