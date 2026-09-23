import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/** True when both Vite env vars are set (non-empty). */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey)
}

/**
 * Browser Supabase client, or null when env is missing.
 * Wire keys via `.env` / `.env.local` (see `.env.example`).
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null
