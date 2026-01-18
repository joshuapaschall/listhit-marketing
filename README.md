# listhit-marketing

ListHit marketing site built with Next.js App Router.

## Environment variables

Copy `.env.example` to `.env.local` and provide the required values:

- `NEXT_PUBLIC_APP_URL` – Base URL for the ListHit app (used to link the signup flow).
- `SUPABASE_URL` – Supabase project URL (server-side only).
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (server-side only, never expose to the client).

## Database updates

Apply the following SQL to support verification email resend tracking:

```sql
create table if not exists marketing.verification_email_resends (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  ip text,
  success boolean not null default false,
  error_message text
);
create index if not exists verification_email_resends_email_idx
  on marketing.verification_email_resends (email);
alter table marketing.verification_email_resends enable row level security;
-- no public policies
```
