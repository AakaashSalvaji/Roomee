-- tasks: belongs to one task list
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  task_list_id uuid not null references public.task_lists (id) on delete cascade,
  title text not null,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_tasks_task_list_id on public.tasks (task_list_id);
