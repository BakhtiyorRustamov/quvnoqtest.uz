import { NextRequest, NextResponse } from 'next/server';
import { searchLessons } from '@/lib/lessonSearch';

export const dynamic = 'force-dynamic';

/** Lessons on the site that match a question (used under every AI answer). */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').slice(0, 300);
  return NextResponse.json({ lessons: searchLessons(q) });
}
