import { NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { BOOKS } from '@/lib/lab/textbook';

export const dynamic = 'force-dynamic';

/** Textbooks loaded into the lab (titles only; the text stays on the server). */
export async function GET() {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({ books: BOOKS });
}
