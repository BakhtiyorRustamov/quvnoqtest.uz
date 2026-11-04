import type { Metadata } from 'next';
import RecordPlayer from '@/components/video/RecordPlayer';

export const metadata: Metadata = { title: 'Record', robots: { index: false, follow: false } };

/** Stage for the video recorder script (scripts/video/make-video.mjs). */
export default function RecordPage() {
  return <RecordPlayer />;
}
