-- household_members: join table for users <-> households (many-to-many)
create table public.household_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check ("role" in ('admin', 'member')),
  created_at timestamptz not null default now(),
  unique (household_id, user_id)
);

create index idx_household_members_household_id on public.household_members (household_id);
create index idx_household_members_user_id on public.household_members (user_id);
