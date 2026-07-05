import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getStore } from '@/lib/store';
import { isPaid } from '@/lib/store/types';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { PARENT_COOKIE_NAME, verifyParentSession } from '@/lib/telegram';
import { parentsConfigured, linkChild, unlinkChild, listChildren } from '@/lib/parents';
import type { ChildWithProgress } from '@/lib/parents';

/**
 * Parents' page API.
 *  POST   — look up a child by QT-ID + name (both must match). If the caller
 *           is a signed-in Telegram parent, the child is also linked to them
 *           server-side (for weekly reports & reminders).
 *  GET    — a Telegram parent's linked children with progress.
 *  DELETE — unlink a child from the Telegram parent.
 */

async function parentIdFromCookie(): Promise<string | null> {
  const raw = (await cookies()).get(PARENT_COOKIE_NAME)?.value;
  return verifyParentSession(raw);
}

function childPayload({ user, progress }: ChildWithProgress) {
  return {
    child: {
      publicId: user.publicId,
      name: user.name,
      grade: user.grade,
      paidUntil: user.paidUntil,
      isPaid: isPaid(user)
    },
    progress
  };
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`parent:${clientIp(req)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const publicId = String(body.publicId ?? '').trim().toUpperCase().slice(0, 12);
  const name = String(body.name ?? '').trim().slice(0, 120);
  if (!/^QT-\d{4,6}$/.test(publicId) || name.length < 2) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const store = getStore();
  const found = await store.findChild(publicId, name);
  if (!found) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  // Telegram parent? remember the link server-side for reports & reminders.
  if (parentsConfigured()) {
    const parentId = await parentIdFromCookie();
    if (parentId) await linkChild(parentId, found.user.id).catch(() => {});
  }

  return NextResponse.json(childPayload(found));
}

export async function GET() {
  if (!parentsConfigured()) return NextResponse.json({ children: [], telegram: false });
  const parentId = await parentIdFromCookie();
  if (!parentId) return NextResponse.json({ children: [], telegram: false });
  const children = await listChildren(parentId);
  return NextResponse.json({ telegram: true, children: children.map(childPayload) });
}

export async function DELETE(req: NextRequest) {
  if (!parentsConfigured()) return NextResponse.json({ ok: true });
  const parentId = await parentIdFromCookie();
  if (!parentId) return NextResponse.json({ ok: true });
  const body = await req.json().catch(() => ({}));
  const publicId = String(body.publicId ?? '').trim().toUpperCase().slice(0, 12);
  if (/^QT-\d{4,6}$/.test(publicId)) await unlinkChild(parentId, publicId).catch(() => {});
  return NextResponse.json({ ok: true });
}
