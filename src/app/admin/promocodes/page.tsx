import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAdminConfigured, requireAdminAuth } from '@/lib/admin';
import PromoAdminClient from './PromoAdminClient';

export default async function PromoAdminPage() {
  const cookieStore = await cookies();
  if (!isAdminConfigured()) {
    redirect('/admin/login');
  }
  if (!(await requireAdminAuth(cookieStore))) {
    redirect('/admin/login');
  }
  return <PromoAdminClient />;
}
