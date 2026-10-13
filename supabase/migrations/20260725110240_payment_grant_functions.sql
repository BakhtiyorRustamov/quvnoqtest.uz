-- Atomic subscription grants. Doing "read paid_until, add 30 days, write back"
-- in application code loses updates when two requests overlap; a single UPDATE
-- statement computed in SQL cannot.

create or replace function grant_days(p_user uuid, p_days int)
returns timestamptz
language plpgsql
security invoker
set search_path = public
as $$
declare v_new timestamptz;
begin
  if p_days is null or p_days <= 0 or p_days > 3650 then
    raise exception 'invalid days';
  end if;

  update users
     set paid_until = greatest(coalesce(paid_until, now()), now())
                      + make_interval(days => p_days)
   where id = p_user
   returning paid_until into v_new;

  return v_new;
end;
$$;

-- Sets paid_until to an absolute value (admin "set expiry" / rollback).
create or replace function set_paid_until(p_user uuid, p_until timestamptz)
returns timestamptz
language plpgsql
security invoker
set search_path = public
as $$
declare v_new timestamptz;
begin
  update users set paid_until = p_until where id = p_user returning paid_until into v_new;
  return v_new;
end;
$$;

-- Promo redemption: validity, single-use-per-user, max_uses and the grant all
-- happen in one statement group so a code cannot be over-redeemed by racing.
create or replace function redeem_promo(p_code text, p_user uuid)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_days int;
  v_until timestamptz;
begin
  -- Lock the code row for the duration of the transaction.
  select days into v_days
    from promo_codes
   where code = p_code
     and disabled_at is null
     and (expires_at is null or expires_at > now())
     and used_count < max_uses
   for update;

  if v_days is null then
    return jsonb_build_object('ok', false, 'error', 'invalid_code');
  end if;

  if exists (select 1 from promo_redemptions where code = p_code and user_id = p_user) then
    return jsonb_build_object('ok', false, 'error', 'already_redeemed');
  end if;

  insert into promo_redemptions (code, user_id, days) values (p_code, p_user, v_days);
  update promo_codes set used_count = used_count + 1 where code = p_code;

  v_until := grant_days(p_user, v_days);

  return jsonb_build_object('ok', true, 'days', v_days, 'paid_until', v_until);
end;
$$;

revoke execute on function grant_days(uuid, int) from anon, authenticated;
revoke execute on function set_paid_until(uuid, timestamptz) from anon, authenticated;
revoke execute on function redeem_promo(text, uuid) from anon, authenticated;
