import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin';
import { getDashboard, listAudit, listPayments, listPromoCodes, listUsers } from '@/lib/adminData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Everything the admin panel reads, behind one authenticated endpoint. */
export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });

  const url = new URL(req.url);
  const view = url.searchParams.get('view') ?? 'dashboard';
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit')) || 50));
  const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);

  try {
    switch (view) {
      case 'dashboard':
        return NextResponse.json({ dashboard: await getDashboard() });
      case 'payments':
        return NextResponse.json({
          payments: await listPayments({
            status: url.searchParams.get('status') ?? 'all',
            limit,
            offset
          })
        });
      case 'users':
        return NextResponse.json({
          users: await listUsers({ search: url.searchParams.get('q') ?? '', limit, offset })
        });
      case 'promos':
        return NextResponse.json({ promos: await listPromoCodes() });
      case 'audit':
        return NextResponse.json({ audit: await listAudit(limit) });
      default:
        return NextResponse.json({ error: 'unknown_view' }, { status: 400 });
    }
  } catch (err) {
    console.error('[admin/data]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
