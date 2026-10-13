-- `rls_auto_enable()` is an event-trigger function (it auto-enables RLS on any
-- new public table). EXECUTE was granted to PUBLIC, which the Supabase linter
-- flags because a SECURITY DEFINER function reachable from anon is a privilege
-- escalation surface. Event triggers fire through the event-trigger mechanism
-- and do not consult EXECUTE privileges, so removing the PUBLIC grant keeps the
-- safety net working while closing the RPC surface.
revoke execute on function public.rls_auto_enable() from public;
revoke execute on function public.rls_auto_enable() from anon, authenticated;
