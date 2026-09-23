# StartBalance — Healthy Start companion tracker (trial)

A **local-only companion app** for parents and carers on UK Healthy Start.  
Check the real balance by phone (**0118 338 5810**) or cashpoint, enter it here, then log spends. **No live card API.**

> Trial app · not affiliated with NHS

## For trial testers

1. Check your balance by phone or ATM.
2. Open the app → **Enter balance** and type that amount.
3. After shopping, tap **Log a spend** so remaining stays useful.
4. Optional: Add to Home Screen from your phone browser for app-like use.

By default data stays in this browser (`localStorage` key `startbalance-v1`). Optional Supabase sync (when configured) stores the same JSON under your account. Nothing is sent to the NHS.

## Public trial URL

**https://startbalance.github.io/startbalance/**

## Balance math

1. **Enter / update balance** — you set `remaining` to the amount you just checked (phone/ATM).
2. **Log a spend** — `remaining -= amount`; a `spend` entry is stored.
3. **Delete a spend** — `remaining += amount`; entry removed.
4. **New period** — optional “clear old spends” when updating balance.

## Run locally

```bash
cd healthy-start-balance-mock
npm install
npm run dev
npm run build && npm run preview -- --host 0.0.0.0 --port 4173
```

## Stack

Vite + React + TypeScript. Local storage by default; optional Supabase auth/sync.

## Optional cloud sync (Supabase)

1. Copy `.env.example` → `.env` and set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
2. Create table `ledgers` (`user_id` uuid PK → auth.users, `data` jsonb, `updated_at` timestamptz) with RLS for the owner.
3. Enable Email auth in Supabase.
4. Rebuild / redeploy. Without env vars the trial keeps working locally (“Sync not configured”).

