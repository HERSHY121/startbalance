import {
  emptyState,
  loadState,
  saveState,
  type AppState,
} from '../data/storage'
import { supabase } from './supabase'

function normalizeState(raw: unknown): AppState {
  if (!raw || typeof raw !== 'object') return emptyState()
  const parsed = raw as AppState
  return {
    remaining: typeof parsed.remaining === 'number' ? parsed.remaining : null,
    lastCheckedAt: parsed.lastCheckedAt ?? null,
    periodStartedAt: parsed.periodStartedAt ?? null,
    entries: Array.isArray(parsed.entries) ? parsed.entries : [],
  }
}

/** Always-available local path (key `startbalance-v1`). */
export function loadLocalLedger(): AppState {
  return loadState()
}

export function saveLocalLedger(data: AppState): void {
  saveState(data)
}

/**
 * Load ledger for a user. Local-only when no client/session.
 * With client+userId: try Supabase `ledgers` table, fall back to local.
 */
export async function loadLedger(userId?: string | null): Promise<AppState> {
  const local = loadLocalLedger()
  if (!userId || !supabase) return local

  try {
    const { data, error } = await supabase
      .from('ledgers')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    if (data?.data != null) {
      const cloud = normalizeState(data.data)
      saveLocalLedger(cloud)
      return cloud
    }
  } catch {
    // Table missing / network / RLS — keep working offline.
  }

  return local
}

/**
 * Persist ledger. Always writes localStorage.
 * With client+userId: stub upsert to `ledgers` (user_id PK, data jsonb, updated_at).
 */
export async function saveLedger(
  userId: string | null | undefined,
  data: AppState,
): Promise<void> {
  saveLocalLedger(data)
  if (!userId || !supabase) return

  try {
    const { error } = await supabase.from('ledgers').upsert(
      {
        user_id: userId,
        data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    )
    if (error) throw error
  } catch {
    // Local already saved; cloud sync will retry on next save once wired.
  }
}
