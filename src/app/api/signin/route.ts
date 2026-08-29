export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';

const MAX_AGE = 60 * 60 * 24 * 365;

function sb() {
return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
auth: { persistSession: false }
});
}

function normalizePhoneDigits(s: string) {
return (s || '').replace(/\D/g, '');
}

async function setDeviceCookie(token: string) {
const cookieStore = await cookies();
cookieStore.set({
  name: 'qt_device',
  value: token,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE,
});
}

export async function POST(req: NextRequest) {
const body = await req.json().catch(() => ({}));
const identifier = (body.identifier || '').toString().trim();
if (!identifier) return NextResponse.json({ ok: false, error: 'missing_identifier' }, { status: 400 });

const client = sb();

// 1) Try public ID matching (QT-12345 or 12345)
const up = identifier.toUpperCase();
if (/^QT-?\d+$/i.test(identifier) || /^\d+$/.test(identifier)) {
const digits = identifier.replace(/[^0-9]/g, '');
const tryIds = [up, `QT-${digits}`].filter(Boolean);
for (const cand of tryIds) {
const { data } = await client.from('users').select('*').eq('public_id', cand).maybeSingle();
if (data) {
const token = randomBytes(24).toString('base64url');
await client.from('users').update({ device_token: token }).eq('id', data.id);
await setDeviceCookie(token);
return NextResponse.json({ ok: true, user: { publicId: data.public_id, name: data.name, email: data.email, phone: data.phone } });
}
}
}

// 2) Try email
if (identifier.includes('@')) {
const email = identifier.toLowerCase();
const { data } = await client.from('users').select('*').eq('email', email).maybeSingle();
if (data) {
const token = randomBytes(24).toString('base64url');
await client.from('users').update({ device_token: token }).eq('id', data.id);
await setDeviceCookie(token);
return NextResponse.json({ ok: true, user: { publicId: data.public_id, name: data.name, email: data.email, phone: data.phone } });
}
}

// 3) Try phone: fetch candidates whose phone contains digits and filter by normalized digits
const digits = normalizePhoneDigits(identifier);
if (digits) {
const { data: candidates } = await client.from('users').select('*').not('phone', 'is', null).ilike('phone', `%${digits}%`).limit(20);
const matched = (candidates || []).filter((r: any) => normalizePhoneDigits(r.phone) === digits);
if (matched.length === 1) {
const data = matched[0];
const token = randomBytes(24).toString('base64url');
await client.from('users').update({ device_token: token }).eq('id', data.id);
await setDeviceCookie(token);
return NextResponse.json({ ok: true, user: { publicId: data.public_id, name: data.name, email: data.email, phone: data.phone } });
} else if (matched.length > 1) {
const list = matched.map((r: any) => ({ publicId: r.public_id, name: r.name, email: r.email, phone: r.phone }));
return NextResponse.json({ ok: true, candidates: list });
}
}

return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
}