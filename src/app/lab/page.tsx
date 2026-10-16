import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { labAllowed } from '@/lib/lab/server';
import LabClient from '@/components/lab/LabClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Lab', robots: { index: false, follow: false } };

/** Test bench for the board-explainer idea. Admin session (or local dev) only. */
export default async function LabPage() {
  if (!(await labAllowed())) notFound();
  return <LabClient />;
}
