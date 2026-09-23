import { useState, type FormEvent } from 'react'
import { DisclaimerBadge } from '../components/DisclaimerBadge'
import { appMeta } from '../data/helpContent'
import { useAuth } from '../hooks/useAuth'

type Mode = 'signin' | 'signup'

export function AuthScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [info, setInfo] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setInfo('')
    const trimmed = email.trim()
    if (!trimmed || !password) {
      setError('Enter email and password.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setBusy(true)
    const result =
      mode === 'signin'
        ? await signIn(trimmed, password)
        : await signUp(trimmed, password)
    setBusy(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (mode === 'signup') {
      setInfo(
        'Account created. If email confirmation is enabled in Supabase, check your inbox; otherwise you are signed in.',
      )
    }
  }

  return (
    <div className="screen auth-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">{appMeta.name}</p>
          <h1 className="screen-title">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h1>
        </div>
        <DisclaimerBadge />
      </header>

      <p className="panel-text intro-text">
        Sync your ledger across devices. Your card still has no live link —
        balance checks stay phone / ATM.
      </p>

      <form className="link-form" onSubmit={(e) => void handleSubmit(e)}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            disabled={busy}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            disabled={busy}
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {info && (
          <p className="form-info" role="status">
            {info}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy
            ? 'Please wait…'
            : mode === 'signin'
              ? 'Sign in'
              : 'Sign up'}
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'signin' ? (
          <>
            No account?{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setMode('signup')
                setError('')
                setInfo('')
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setMode('signin')
                setError('')
                setInfo('')
              }}
            >
              Sign in
            </button>
          </>
        )}
      </p>

      <p className="muted-note" style={{ marginTop: 16 }}>
        {appMeta.disclaimer}
      </p>
    </div>
  )
}
