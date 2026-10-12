import type { L10n } from '@/lib/i18n-config';

/**
 * Home button target + label per subject, shown inside a lesson and on the
 * completion screen in place of the generic "Bosh sahifa" / dashboard button.
 * Returns the subject's own page (e.g. Matematika 1 / Ona tili 1).
 */
export const SUBJECT_HOME: Record<string, { href: string; label: L10n }> = {
  'g1-alifbe': { href: '/dashboard/g1-alifbe', label: { uz: 'Alifbe 1', ru: 'Алифбе 1', en: 'Alphabet primer 1' } },
  'g1-informatika': { href: '/dashboard/g1-informatika', label: { uz: 'Informatika 1', ru: 'Информатика 1', en: 'Informatics 1' } },
  'g1-tarbiya': { href: '/dashboard/g1-tarbiya', label: { uz: 'Tarbiya 1', ru: 'Воспитание 1', en: 'Character education 1' } },
  'g1-art': { href: '/dashboard/g1-art', label: { uz: 'Tasviriy sanʼat 1', ru: 'Изобразительное искусство 1', en: 'Visual arts 1' } },
  'g1-tex': { href: '/dashboard/g1-tex', label: { uz: 'Texnologiya 1', ru: 'Технология 1', en: 'Technology 1' } },
  'g1-math': { href: '/dashboard/g1-math', label: { uz: 'Matematika 1', ru: 'Математика 1', en: 'Mathematics 1' } },
  'g1-ona': { href: '/dashboard/g1-ona', label: { uz: 'Ona tili 1', ru: 'Родной язык 1', en: 'Native language 1' } },
  'g1-tabiiy': { href: '/dashboard/g1-tabiiy', label: { uz: 'Tabiiy fanlar 1', ru: 'Естественные науки 1', en: 'Natural science 1' } },
  'g1-ingliz': { href: '/dashboard/g1-ingliz', label: { uz: 'Ingliz tili 1', ru: 'Английский 1', en: 'English 1' } }
};

export function subjectHome(subjectKey: string): { href: string; label: L10n } | undefined {
  return SUBJECT_HOME[subjectKey];
}
