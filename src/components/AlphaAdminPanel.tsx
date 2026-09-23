import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type AdminUser = {
  id: string
  email: string | null
  created_at: string
  last_sign_in_at: string | null
}

type Props = {
  selfUserId: string | null
}

function formatWhen(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function AlphaAdminPanel({ selfUserId }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    if (!supabase) {
      setError('Sync is not configured.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    const { data, error: rpcError } = await supabase.rpc('admin_list_users')
    if (rpcError) {
      setError(rpcError.message)
      setUsers([])
    } else {
      setUsers((data as AdminUser[]) ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  const handleDelete = async (target: AdminUser) => {
    if (!supabase || !target.id) return
    if (selfUserId && target.id === selfUserId) {
      setError('You cannot delete your own account from here.')
      return
    }
    const label = target.email ?? target.id
    if (
      !window.confirm(
        `Delete tester account ${label}? Their ledger and auth user will be removed.`,
      )
    ) {
      return
    }

    setBusyId(target.id)
    setError('')
    const { error: rpcError } = await supabase.rpc('admin_delete_user', {
      target: target.id,
    })
    setBusyId(null)

    if (rpcError) {
      setError(rpcError.message)
      return
    }
    await loadUsers()
  }

  return (
    <section className="info-panel admin-panel" aria-label="Admin">
      <h2 className="panel-title">Admin — delete tester accounts</h2>
      <p className="panel-text">
        Friends &amp; family testers only. Deleting removes their cloud ledger and
        auth account.
      </p>

      {loading && <p className="muted-note">Loading testers…</p>}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {!loading && users.length === 0 && !error && (
        <p className="muted-note">No tester accounts yet.</p>
      )}

      {users.length > 0 && (
        <ul className="admin-user-list">
          {users.map((u) => {
            const isSelf = Boolean(selfUserId && u.id === selfUserId)
            return (
              <li key={u.id} className="admin-user-row">
                <div className="admin-user-meta">
                  <span className="admin-user-email">{u.email ?? u.id}</span>
                  <span className="admin-user-dates">
                    Joined {formatWhen(u.created_at)}
                    {isSelf ? ' · you' : ''}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost admin-delete-btn"
                  disabled={isSelf || busyId === u.id}
                  onClick={() => {
                    void handleDelete(u)
                  }}
                >
                  {busyId === u.id ? 'Deleting…' : 'Delete'}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => {
          void loadUsers()
        }}
        disabled={loading}
      >
        Refresh list
      </button>
    </section>
  )
}
