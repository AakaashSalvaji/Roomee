-- task_lists: belongs to one household
create table public.task_lists (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create index idx_task_lists_household_id on public.task_lists (household_id);
