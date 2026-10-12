import type { L10n } from '@/lib/i18n-config';

/**
 * Grade 11 subject list (diagnostic-test track). Order is the dashboard order.
 * `slug` is the URL part: /dashboard/g11-<slug> and /exam/g11/<slug>.
 */
export type G11Subject = { slug: string; name: L10n; color: string };

export const G11_SUBJECTS: G11Subject[] = [
  { slug: 'biologiya', name: { uz: 'Biologiya', ru: 'Биология', en: 'Biology' }, color: '#8DC63F' },
  { slug: 'kimyo', name: { uz: 'Kimyo', ru: 'Химия', en: 'Chemistry' }, color: '#12A6A0' },
  { slug: 'matematika', name: { uz: 'Matematika', ru: 'Математика', en: 'Mathematics' }, color: '#F39A1F' },
  { slug: 'fizika', name: { uz: 'Fizika', ru: 'Физика', en: 'Physics' }, color: '#5A2D82' },
  { slug: 'geografiya', name: { uz: 'Geografiya', ru: 'География', en: 'Geography' }, color: '#1FA7E0' },
  { slug: 'ozbek-tili', name: { uz: 'Oʻzbek tili', ru: 'Узбекский язык', en: 'Uzbek language' }, color: '#C2298A' },
  { slug: 'rus-tili', name: { uz: 'Rus tili', ru: 'Русский язык', en: 'Russian language' }, color: '#E14B4B' },
  { slug: 'qoraqalpoq-tili', name: { uz: 'Qoraqalpoq tili', ru: 'Каракалпакский язык', en: 'Karakalpak language' }, color: '#1E3A5F' },
  { slug: 'tarix', name: { uz: 'Tarix', ru: 'История', en: 'History' }, color: '#B7791F' }
];

export function getG11Subject(slug: string): G11Subject | undefined {
  return G11_SUBJECTS.find((s) => s.slug === slug);
}

export const g11SubjectHref = (slug: string) => `/dashboard/g11-${slug}`;
export const g11ExamHref = (slug: string) => `/exam/g11/${slug}`;
